import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlaylist, useAudioPlaylistStatus } from 'expo-audio';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GirihStar } from '@/components/illustrations';
import { MushafRosette } from '@/components/jadwal';
import { ReciteControls, ReciteOpenRow, ReciterTurnPlayer } from '@/components/recite-follow';
import { ThemedText } from '@/components/themed-text';
import { ayahTransliteration, ayahWordTransliterations, getSurah, JUZ30_SOURCE } from '@/content/quran/surahs';
import { ayahSource, keepAyah } from '@/content/quran/ayah-audio';
import { getReciter, reciterCredit } from '@/content/quran/recitation';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useMemorised } from '@/hooks/use-memorised';
import { useReciteClassroom } from '@/hooks/use-recite-classroom';
import { useReciteFollow } from '@/hooks/use-recite-follow';
import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * One surah, to read and then to recite from memory.
 *
 * ## Hide the text
 *
 * The whole screen turns on one control. Reading an ayah over and over does
 * not commit it — covering it and finding out whether it is there does, and
 * that is the drill every hifz teacher runs and no reading app offers.
 *
 * So the Arabic can be hidden per ayah, not all at once: you cover the line
 * you are working on, recite it, and reveal it to check, while the ones you
 * have not reached stay visible. Covering the whole surah would be a test
 * rather than a practice.
 *
 * ## The translation is secondary here, and that is deliberate
 *
 * On a prayer step the meaning is the point. Here the sound and the shape are,
 * so the English is quiet and small and sits under. Someone memorising who
 * reads the English first will memorise the English.
 *
 * ## Audio, and the one promise it does not break
 *
 * Every ayah streams. This is the app's first network request, and it does not
 * touch the offline promise: salah, wudu, prayer times and every bundled
 * recitation still work with the radio off. That promise was about the worship
 * path, and this is a learning surface.
 *
 * Failure is quiet and local. No signal means the controls say so and the text
 * is still there to read, which is most of what this screen is for.
 *
 * ## The surah is one playlist, not a chain of separate players
 *
 * The first version of this screen gave every ayah its own `useAudioPlayer`
 * and had the screen chain them by moving a flag from row to row. Two things
 * were wrong with it, and the second is why this was rewritten:
 *
 * 1. **"Play the surah" produced no sound at all.** The button set the flag
 *    and nothing acted on it — the only `play()` in the file was inside a
 *    row's own press handler, and a row receiving the flag only knew how to
 *    *pause*. The button changed its own icon to "Stop", highlighted the first
 *    ayah, and played silence. The chaining logic underneath it never ran once,
 *    because nothing ever started and so nothing ever finished.
 * 2. **It cost one native player per ayah.** Opening Al-Mursalat built fifty
 *    of them and started fifty downloads before a single tap.
 *
 * `useAudioPlaylist` is the right shape for this and expo-audio documents it as
 * gapless, which is the thing a chain of separate players cannot be — each
 * link had to load after the one before it finished, so a surah played through
 * would have broken between every ayah even once the flag bug was fixed.
 *
 * It also keeps what the chain was reaching for: `currentIndex` says which ayah
 * is sounding, so following along is the same gesture as listening. And it
 * stays one file per ayah, so the single-ayah button and the whole-surah button
 * draw on the same clips — nothing is stored twice when downloads land.
 *
 * `loop` is set as a property rather than passed as an option on purpose: the
 * hook rebuilds the playlist whenever the option changes, so a reader toggling
 * repeat mid-surah would have had the audio stop dead.
 */
/** Slow enough to copy, fast enough to still sound like recitation. The same
 *  rate `practice.tsx` uses, so one surah does not sound like two apps. */
const SLOW_RATE = 0.75;

export default function SurahScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const { transliteration, translation, reciter: reciterId } = useSettings();
  const { number } = useLocalSearchParams<{ number: string }>();
  const { isMemorised, toggle } = useMemorised();
  const { surahDone } = useObservations();

  const surah = getSurah(Number(number));
  const reciter = getReciter(reciterId);

  const [hidden, setHidden] = useState<readonly number[]>([]);
  const [loop, setLoop] = useState(false);
  /**
   * What is running, or nothing.
   *
   * `'ayah'` and `'surah'` are the same playback with different intentions, and
   * the difference is only visible in what repeat means: drill this one line,
   * or listen to the whole thing again. Nothing else in here branches on it.
   */
  const [mode, setMode] = useState<'ayah' | 'surah' | null>(null);
  /*
    Which track we decided was stalled, rather than a boolean reset on every
    change.

    A boolean needed clearing whenever the track moved, which meant calling
    setState synchronously inside an effect — a cascading render, and what
    `react-hooks/set-state-in-effect` was flagging. Storing the track instead
    makes "not stalled" the derived default: a new track simply is not the one
    that stalled, so nothing has to be reset.
  */
  const [stalledTrack, setStalledTrack] = useState<string | null>(null);
  /**
   * Three-quarter speed, the same rate the practice screen uses.
   *
   * The teaching recitation is already slow; this is for the ayah somebody is
   * stuck on, where the join between two words is moving faster than they can
   * copy. It applies to the whole playlist rather than one ayah because it is a
   * mode you are in, like repeat.
   */
  const [slow, setSlow] = useState(false);

  // Stable identity: two memos and the recite hook key off it.
  const ayahs = useMemo(() => surah?.ayahs ?? [], [surah]);

  /*
    A fresh array each render is fine — the hook keys on the stringified
    sources, not on identity. What it does mean is that changing reciter builds
    a new playlist, which is handled below rather than left to stop the audio.

    `ayahSource` decides stream or bundled file per ayah, which is how
    Al-Fatiha plays with the radio off on the default reciter. The screen does
    not need to know which it got.
  */
  const sources = useMemo(
    () => (surah ? surah.ayahs.map((ayah) => ayahSource(reciter, surah.number, ayah.number)) : []),
    [reciter, surah],
  );

  // 250ms rather than the 500ms default: this drives which ayah is highlighted,
  // and half a second of the wrong line lit up is visible when you are reading
  // along with it.
  const playlist = useAudioPlaylist({ sources, updateInterval: 250 });
  const status = useAudioPlaylistStatus(playlist);

  /*
    Listening to Husary and being listened to are the same gesture in two
    directions, and they cannot both hold the audio session — starting one
    stops the other, both ways.
  */
  const stopPlayback = useCallback(() => {
    playlist.pause();
    setMode(null);
  }, [playlist]);

  const followStrings = useMemo(
    () => ({
      downloading: (percent: number) => `${t('recite.downloading.recognition')} ${percent}%`,
      error: t('recite.error'),
    }),
    [t],
  );
  const follow = useReciteFollow(surah?.ayahs ?? [], followStrings, stopPlayback);
  const highlightActive = follow.open && (follow.state === 'listening' || follow.complete);
  /* The classroom (Phase 6): repeat after the reciter, one ayah at a time.
     Shares the bar, the models and the mic machinery with follow; only one
     of the two modes runs at a time. */
  const classroom = useReciteClassroom(ayahs, stopPlayback);

  /* Global word index of each ayah's first word, for the heard-set lookup.
     Written without mutation for the compiler; n is at most forty. */
  const wordOffsets = useMemo(() => {
    const counts = ayahs.map((ayah) => ayah.arabic.trim().split(/\s+/).length);
    return counts.map((_, i) => counts.slice(0, i).reduce((sum, len) => sum + len, 0));
  }, [ayahs]);

  const index = status.currentIndex;
  const running = mode !== null;
  const currentAyah = running ? ayahs[index]?.number : undefined;

  /*
    Keep whatever is playing, for next time.

    After playback has started, never before — the reader is already hearing
    the ayah by the time this fires, so a slow save or a failed one costs them
    nothing. That is what lets the whole feature have no button, no progress
    bar and no failure state anybody has to read: the surahs somebody actually
    listens to are the ones that end up on their phone, and nobody was asked to
    predict which those would be.

    Bundled ayahs return immediately; there is nothing to fetch.
  */
  useEffect(() => {
    if (!running || !surah || currentAyah === undefined) return;
    keepAyah(reciter, surah.number, currentAyah);
  }, [running, surah, currentAyah, reciter]);

  useEffect(() => {
    // Assignment is the documented API — `loop` is a settable property in
    // expo-audio with no setter method. The lint rule reads this as mutating a
    // hook's return value, but `playlist` is a handle to a native object rather
    // than React state, and pushing state out to an external system is what an
    // effect is for.
    // eslint-disable-next-line react-hooks/immutability
    playlist.loop = !loop ? 'none' : mode === 'ayah' ? 'single' : 'all';
  }, [playlist, loop, mode]);

  useEffect(() => {
    // Settable property, same as `loop`, and set the same way and for the same
    // reason — passing it as an option would rebuild the playlist and stop the
    // audio the moment somebody reached for it mid-ayah.
    // eslint-disable-next-line react-hooks/immutability
    playlist.playbackRate = slow ? SLOW_RATE : 1;
  }, [playlist, slow]);

  /*
    Changing reciter mid-listen picks up where the last voice left off.

    The hook hands back a new playlist when the sources change, and a new
    playlist starts silent at track zero. Stopping would be the easy behaviour
    and the wrong one: comparing two reciters on the same ayah is the main
    reason anybody opens that picker, and being thrown back to the top of the
    surah makes the comparison impossible.
  */
  const resumeAt = useRef(0);
  useEffect(() => {
    if (running) resumeAt.current = index;
  }, [running, index]);

  useEffect(() => {
    if (mode === null) return;
    playlist.skipTo(resumeAt.current);
    playlist.play();
    // Deliberately keyed on the playlist alone. Re-running this when `mode`
    // changes would restart the audio every time repeat is toggled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  /*
    The recitation scrolls the page, not the reader.

    Without this the highlight is honest and useless: An-Naba is forty ayahs,
    so by the third one the lit-up line is below the fold and somebody trying
    to read along is chasing it with their thumb — which is the one thing this
    screen is meant to spare them, and it is why the highlight was worth
    building in the first place.

    What it costs is browsing while listening: scroll away to look at a later
    ayah and the next track pulls you back. That is the right trade for a
    screen whose whole job is following along, and stopping playback is one tap
    if you want to read somewhere else.

    Positions are collected from `onLayout` rather than computed, because ayah
    heights are wildly uneven — one line of Arabic or six, with or without a
    translation under it, and a covered ayah is a different height again.
  */
  const scroller = useRef<ScrollView>(null);
  const listTop = useRef(0);
  const rowTops = useRef<Record<number, number>>({});

  useEffect(() => {
    if (mode === null) return;
    const top = rowTops.current[index];
    if (top === undefined) return;
    // A little headroom, so the current ayah reads as the top of what you are
    // looking at rather than jammed against the edge of the screen.
    scroller.current?.scrollTo({ y: Math.max(0, listTop.current + top - Spacing.three), animated: true });
  }, [mode, index]);

  /* The recitation scrolls the page in the speaking direction too — same
     trade as above, same machinery, keyed on the verse the walk is painting. */
  useEffect(() => {
    if (!follow.open || follow.state !== 'listening') return;
    const top = rowTops.current[follow.currentVerse - 1];
    if (top === undefined) return;
    scroller.current?.scrollTo({ y: Math.max(0, listTop.current + top - Spacing.three), animated: true });
  }, [follow.open, follow.state, follow.currentVerse]);

  /* The classroom walks the page ayah by ayah the same way, and keeps each
     ayah it plays for next time — the playlist's keep effect above never
     sees classroom playback, which goes through its own player. */
  useEffect(() => {
    if (!classroom.active) return;
    const top = rowTops.current[classroom.ayahIndex];
    if (top !== undefined) {
      scroller.current?.scrollTo({ y: Math.max(0, listTop.current + top - Spacing.three), animated: true });
    }
    const ayahNumber = ayahs[classroom.ayahIndex]?.number;
    if (surah && ayahNumber !== undefined) keepAyah(reciter, surah.number, ayahNumber);
  }, [classroom.active, classroom.ayahIndex, ayahs, reciter, surah]);

  /*
    Silence that never resolves, said out loud.

    A playlist's status carries no error field the way a single player's does,
    so there is nothing to read — which would leave a reader with no signal
    staring at a button that had visibly accepted their tap and then done
    nothing.

    What it watches is the clock, not `playing`. The first version of this
    checked the flag and never once fired: with the audio host unreachable the
    status still reported `playing: true`, because the flag says a play was
    requested rather than that sound is coming out. `currentTime` cannot lie
    that way — audio that is genuinely running moves it, and audio that is not
    leaves it at zero. Found by cutting the network in a browser and watching
    the message fail to appear.

    Twelve seconds is not a diagnosis. It is long enough to be sure, and saying
    "this isn't loading, the text is still here" is the whole job.
  */
  const progress = useRef(0);
  useEffect(() => {
    progress.current = status.currentTime;
  }, [status.currentTime]);

  const track = mode === null ? null : `${mode}:${index}`;
  const stalled = track !== null && stalledTrack === track;

  useEffect(() => {
    if (track === null) return;
    // Reset rather than remember: a new track starts at zero, and comparing
    // against the previous track's clock would read a fresh start as progress.
    progress.current = 0;
    const timer = setTimeout(() => {
      if (progress.current < 0.25) setStalledTrack(track);
    }, 12000);
    return () => clearTimeout(timer);
  }, [track]);

  if (!surah) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: '' }} />
        <ThemedText type="default" themeColor="textSecondary">
          {t('quran.missing')}
        </ThemedText>
      </View>
    );
  }

  const known = isMemorised(surah.number);

  const stop = () => {
    playlist.pause();
    setMode(null);
  };

  /** From the top, as a run-through. */
  const toggleSurah = () => {
    if (follow.state === 'listening') void follow.stop();
    if (classroom.active) void classroom.stop();
    if (mode === 'surah') return stop();
    setMode('surah');
    resumeAt.current = 0;
    playlist.skipTo(0);
    playlist.play();
  };

  /**
   * One ayah, from a row.
   *
   * With repeat off this carries on into the rest of the surah rather than
   * stopping at the end of the line — "play from here" is what a reader
   * tapping partway down a surah almost always wants, and stopping dead after
   * four seconds is a worse guess. With repeat on it holds on that one ayah,
   * which is the drill: hearing it twenty times without touching the phone is
   * how it goes in, and it is what a paper mushaf cannot do.
   */
  const playFrom = (position: number) => {
    if (follow.state === 'listening') void follow.stop();
    if (classroom.active) void classroom.stop();
    if (mode !== null && index === position && status.playing) return stop();
    setMode('ayah');
    resumeAt.current = position;
    playlist.skipTo(position);
    playlist.play();
  };

  /*
    Covering every ayah is somebody reciting the whole surah from memory.

    That is the one honest signal this screen produces. Marking a surah
    "memorised" is a claim; covering all of it and working through is the act
    itself, and it is what `observations.surahs` needs so the Qur'an tab can
    offer back whichever surah has gone longest without being recited.

    Recorded on the last one to be covered rather than on some later
    completion, because there is no later completion — the reader reveals them
    again as they check, and a moment when all of them were hidden is the only
    moment the whole surah was held at once.
  */
  const cover = (ayah: number) =>
    setHidden((current) => {
      const next = current.includes(ayah)
        ? current.filter((n) => n !== ayah)
        : [...current, ayah];
      if (next.length === surah.ayahs.length) surahDone(surah.number);
      return next;
    });

  return (
    <View style={styles.screen}>
      {/* Pinned above the scroll, per Iyad: the controls must not disappear
          while the page follows the recitation downward. */}
      <ReciteControls follow={follow} classroom={classroom} />
      {/* The reciter's turn, as sound. Mounted only while it IS his turn —
          the key replays the clip on "once more", and unmounting closes his
          voice before the mic ever opens. */}
      {classroom.state === 'running' && classroom.turn === 'reciter' ? (
        <ReciterTurnPlayer
          key={`${classroom.ayahIndex}:${classroom.attempt}`}
          source={sources[classroom.ayahIndex]}
          onFinished={classroom.reciterFinished}
        />
      ) : null}
    <ScrollView ref={scroller} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: surah.name }} />

      {/*
        The surah's cartouche — a mushaf's header band: name, place, size.
        It takes the gilded wash the day the reader marks the surah known,
        because the pages people hold by heart are the illuminated ones.
      */}
      <View
        style={[
          styles.cartouche,
          { borderColor: theme.gold },
          known && { backgroundColor: theme.backgroundSelected },
        ]}>
        <View style={[styles.cartoucheIn, { borderColor: theme.goldSoft }]}>
          <ThemedText type="arabicDisplay" style={styles.centred}>{surah.nameArabic}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
            {t('quran.surahNumber').replace('{n}', String(surah.number))} · {surah.meaning} ·{' '}
            {t(`quran.place.${surah.place}` as UIKey)} · {surah.ayahs.length} {t('count.ayahs')}
          </ThemedText>
        </View>
      </View>
      <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
        {t('quran.tapToHide')}
      </ThemedText>

      {/*
        Repeat is a screen-wide setting rather than per row, because it is a
        mode you are in — you turn it on, then work through the surah one ayah
        at a time without reaching for it again.
      */}
      <View style={styles.controls}>
        {/*
          The whole surah, from the top. Primary, because listening straight
          through is how most people meet a surah before they try to hold any
          of it.
        */}
        <Pressable
          onPress={toggleSurah}
          accessibilityRole="button"
          accessibilityLabel={t(mode === 'surah' ? 'quran.stop' : 'quran.playSurah')}
          style={({ pressed }) => [
            styles.playSurah,
            { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
          ]}>
          <Ionicons
            name={mode === 'surah' ? 'stop' : 'play'}
            size={16}
            color={theme.textOnAccent}
          />
          <ThemedText type="smallBold" themeColor="textOnAccent">
            {t(mode === 'surah' ? 'quran.stop' : 'quran.playSurah')}
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setLoop((was) => !was)}
          accessibilityRole="switch"
          accessibilityState={{ checked: loop }}
          style={[
            styles.loop,
            {
              backgroundColor: loop ? theme.accentMuted : 'transparent',
              borderColor: loop ? theme.accent : theme.border,
            },
          ]}>
          <Ionicons name="repeat" size={16} color={loop ? theme.accent : theme.textSecondary} />
          <ThemedText type="smallBold" themeColor={loop ? 'accent' : 'textSecondary'}>
            {t('practice.repeat')}
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setSlow((was) => !was)}
          accessibilityRole="switch"
          accessibilityState={{ checked: slow }}
          style={[
            styles.loop,
            {
              backgroundColor: slow ? theme.accentMuted : 'transparent',
              borderColor: slow ? theme.accent : theme.border,
            },
          ]}>
          <Ionicons
            name="play-back-outline"
            size={16}
            color={slow ? theme.accent : theme.textSecondary}
          />
          <ThemedText type="smallBold" themeColor={slow ? 'accent' : 'textSecondary'}>
            {t('practice.slower')}
          </ThemedText>
        </Pressable>
      </View>

      {/*
        Whose voice, on the screen where the voice is.

        The setting is global — a reader who has found someone they can follow
        wants them for the whole surah and for the one ayah they are drilling.
        But it is offered here rather than only in Settings, because a reader
        deciding they cannot follow this reciter is having that thought right
        now, with the audio playing, and will not go looking through a settings
        screen for the fix.
      */}
      <Pressable
        onPress={() => router.push('/reciter')}
        accessibilityRole="button"
        accessibilityLabel={`${t('reciter.label')}: ${reciter.name}. ${t('reciter.change')}`}
        style={({ pressed }) => [
          styles.reciter,
          {
            /*
              A ruled row, not a filled card (5 Sep 2026): it is a setting
              shown where the thought happens, and settings are rows. The
              fill it had was the last card on the page.
            */
            borderBottomColor: theme.goldSoft,
            backgroundColor: pressed ? theme.backgroundSelected : 'transparent',
          },
        ]}>
        <Ionicons name="mic-outline" size={18} color={theme.textSecondary} />
        <View style={styles.reciterText}>
          <ThemedText type="caption" themeColor="textSecondary">
            {t('reciter.label')}
          </ThemedText>
          <ThemedText type="smallBold">{reciter.name}</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.gold} />
      </Pressable>

      {/*
        The listening half. Hearing the surah is the row above; being heard
        reciting it is this one — the highlight lives in the ayah cards, and
        this row just opens the pinned controls. Nothing on web.
      */}
      <ReciteOpenRow follow={follow} />

      {stalled && (
        <View style={[styles.stalled, { borderLeftColor: theme.border }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('quran.audioUnavailable')}
          </ThemedText>
        </View>
      )}

      {/*
        The frame that earns its gold. Plain while nothing is held; the
        corner stars arrive when ayahs start being covered from memory; the
        midpoint stars complete it — with the cartouche's wash — when the
        reader marks the surah known. All three states are drawn from state
        the screen already keeps; nothing new is recorded.

        `listTop` is measured here, on the frame wrapper, because the list
        now sits inside the frame and its own layout.y would be relative to
        the frame, not the scroll content. The few pixels of frame border
        and padding are inside the scroll aim's tolerance.
      */}
      <View
        style={styles.frameWrap}
        onLayout={(event) => {
          listTop.current = event.nativeEvent.layout.y;
        }}>
        <View style={[styles.mframe, { borderColor: theme.gold }]}>
          <View style={[styles.mframeIn, { borderColor: theme.goldSoft }]}>
            <View style={styles.list}>
        {surah.ayahs.map((ayah, position) => {
          const isHidden = hidden.includes(ayah.number);
          const transliterated = ayahTransliteration(surah.number, ayah.number);
          const isCurrent = currentAyah === ayah.number;
          const sounding = isCurrent && status.playing;
          /* The recite highlight, when a session is live: green means this
             word was HEARD — passed-over words stay unlit, so a stumble
             shows as a quiet gap, and lights late if said right later. */
          const beingRecited = highlightActive && follow.currentVerse === ayah.number;
          const arabicWords = ayah.arabic.trim().split(/\s+/);
          const translitWords = ayahWordTransliterations(surah.number, ayah.number);
          const offset = wordOffsets[position] ?? 0;
          const wordLit = (w: number) =>
            follow.heard.has(offset + w) && offset + w < follow.displayed;
          /* The classroom paints the same words the opposite way round: the
             selector LEADS (a lapis wash on the word to say), malachite is a
             word the ear confirmed, vermilion a word the reader moved past —
             the register Phase 6 allows this opt-in mode and no more. */
          const classroomAyah = classroom.active && classroom.ayahIndex === position;
          const classroomStyle = (w: number) => {
            const wordState = classroom.wordStates.get(w);
            if (wordState === 'confirmed') return { color: theme.malachite };
            if (wordState === 'conceded') return { color: theme.vermilion };
            if (classroom.turn === 'you' && w === classroom.selected) {
              return { color: theme.accent, backgroundColor: theme.accentMuted };
            }
            return { color: theme.text };
          };

          return (
            /*
              A View, not a Pressable.

              The play control is a button and the cover toggle is a button,
              and the first draft nested one inside the other — which is
              invalid on web and wrong everywhere: tapping play would also
              cover the ayah you were about to listen to. So the card holds
              two separate targets, and the text is the one that covers.
            */
            <View
              key={ayah.number}
              onLayout={(event) => {
                rowTops.current[position] = event.nativeEvent.layout.y;
              }}
              style={[
                styles.ayah,
                {
                  // The live ayah is the lit one — the reading pool, not a
                  // coloured frame. Following along is the same gesture as
                  // listening, which is why the surah plays as one playlist
                  // that reports where it is rather than as one file that
                  // cannot — and the recite session borrows the same light
                  // for the verse being said.
                  backgroundColor:
                    isCurrent || beingRecited || classroomAyah
                      ? theme.backgroundSelected
                      : 'transparent',
                  borderBottomColor: theme.goldSoft,
                },
              ]}>
              <Pressable
                onPress={() => cover(ayah.number)}
                accessibilityRole="button"
                accessibilityLabel={
                  isHidden
                    ? t('quran.reveal').replace('{n}', String(ayah.number))
                    : t('quran.hide').replace('{n}', String(ayah.number))
                }
                style={({ pressed }) => [styles.ayahText, { opacity: pressed ? 0.6 : 1 }]}>
                {isHidden ? (
                  /*
                    Blank ruled paper, the rosette holding the ayah's place —
                    the language Learn speaks for an unwritten lesson, said
                    the other way round: paper where the text lives in you,
                    not on the screen. The rule's length roughly echoes the
                    line's, which is part of what you are learning; covering
                    an ayah still doesn't make everything below it jump.
                  */
                  <View style={styles.coveredLine}>
                    <MushafRosette label={String(ayah.number)} filled size={28} />
                    <View
                      style={[
                        styles.coveredRule,
                        {
                          backgroundColor: theme.goldSoft,
                          width: `${Math.max(28, Math.min(84, Math.round(ayah.arabic.length * 1.4)))}%`,
                        },
                      ]}
                    />
                  </View>
                ) : (
                  /*
                    The marker rides INSIDE the text at the ayah's end, where
                    every printed mushaf has set it — an inline View in Text.
                    ⚠️ Verified on web; the baseline seat against Amiri's tall
                    line box still needs a look on a real device.
                  */
                  <ThemedText type="arabicVerse" style={styles.arabic}>
                    {highlightActive || classroomAyah
                      ? arabicWords.map((word, w) => (
                          <Text
                            key={`${ayah.number}-${w}`}
                            style={
                              classroomAyah
                                ? classroomStyle(w)
                                : { color: wordLit(w) ? theme.accent : theme.text }
                            }
                          >
                            {word}
                            {w < arabicWords.length - 1 ? ' ' : ''}
                          </Text>
                        ))
                      : ayah.arabic}
                    {'\u00A0'}
                    <View style={styles.inlineRosette}>
                      <MushafRosette label={String(ayah.number)} size={28} />
                    </View>
                  </ThemedText>
                )}
              </Pressable>

              {/*
                The Latin lines and the play control share the card's foot —
                the play button is a SIBLING of the cover target, never a
                child, and it stays through a covered state so the reader can
                listen while checking themselves.
              */}
              <View style={styles.ayahFoot}>
                <View style={styles.footLines}>
                  {transliteration && !isHidden && transliterated ? (
                    (highlightActive || classroomAyah) &&
                    translitWords &&
                    translitWords.length === arabicWords.length ? (
                      <ThemedText type="small" themeColor="textSecondary" style={styles.transliteration}>
                        {translitWords.map((word, w) => (
                          <Text
                            key={`${ayah.number}-t${w}`}
                            style={
                              classroomAyah
                                ? { color: classroomStyle(w).color }
                                : wordLit(w)
                                  ? { color: theme.accent }
                                  : undefined
                            }
                          >
                            {word}
                            {w < translitWords.length - 1 ? ' ' : ''}
                          </Text>
                        ))}
                      </ThemedText>
                    ) : (
                      <ThemedText type="small" themeColor="textSecondary" style={styles.transliteration}>
                        {transliterated}
                      </ThemedText>
                    )
                  ) : null}
                  {translation && !isHidden ? (
                    <ThemedText type="small" themeColor="textSecondary">
                      {ayah.translation}
                    </ThemedText>
                  ) : null}
                </View>
                <Pressable
                  onPress={() => playFrom(position)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    sounding
                      ? t('practice.pause')
                      : t('quran.playFrom').replace('{n}', String(ayah.number))
                  }
                  hitSlop={8}
                  style={({ pressed }) => [
                    styles.play,
                    {
                      backgroundColor: sounding ? theme.accent : theme.accentMuted,
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}>
                  {isCurrent && stalled ? (
                    <Ionicons name="cloud-offline-outline" size={16} color={theme.accent} />
                  ) : isCurrent && status.isBuffering && !status.playing ? (
                    <Ionicons name="ellipsis-horizontal" size={16} color={theme.accent} />
                  ) : (
                    <Ionicons
                      name={sounding ? 'pause' : 'play'}
                      size={16}
                      color={sounding ? theme.textOnAccent : theme.accent}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          );
        })}
            </View>
          </View>
        </View>
        {(hidden.length > 0 || known) && (
          <>
            <View style={[styles.corner, styles.cornerTL]}>
              <GirihStar filled size={13} color={theme.gold} trackColor={theme.gold} />
            </View>
            <View style={[styles.corner, styles.cornerTR]}>
              <GirihStar filled size={13} color={theme.gold} trackColor={theme.gold} />
            </View>
            <View style={[styles.corner, styles.cornerBL]}>
              <GirihStar filled size={13} color={theme.gold} trackColor={theme.gold} />
            </View>
            <View style={[styles.corner, styles.cornerBR]}>
              <GirihStar filled size={13} color={theme.gold} trackColor={theme.gold} />
            </View>
          </>
        )}
        {known && (
          <>
            <View style={[styles.corner, styles.edgeL]}>
              <GirihStar filled size={11} color={theme.gold} trackColor={theme.gold} />
            </View>
            <View style={[styles.corner, styles.edgeR]}>
              <GirihStar filled size={11} color={theme.gold} trackColor={theme.gold} />
            </View>
          </>
        )}
      </View>

      {/*
        Marking it known is the reader's call, not the app's. Nothing measures
        whether they are right, because the only person who can know is them
        and being told "not yet" by a phone is the wrong relationship.
      */}
      <Pressable
        onPress={() => toggle(surah.number)}
        accessibilityRole="switch"
        accessibilityState={{ checked: known }}
        style={({ pressed }) => [
          styles.mark,
          {
            backgroundColor: known ? theme.accentMuted : 'transparent',
            borderColor: known ? theme.accent : theme.border,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <ThemedText type="cardTitle" themeColor={known ? 'accent' : 'text'}>
          {known ? t('quran.knowIt') : t('quran.markKnown')}
        </ThemedText>
      </Pressable>

      <ThemedText type="caption" themeColor="textSecondary">
        {JUZ30_SOURCE.arabic} · {JUZ30_SOURCE.translation}
      </ThemedText>
      {/*
        A licence obligation: the credit goes where the audio plays, and it
        follows whoever is actually playing rather than naming one reciter for
        all eight.
      */}
      <ThemedText type="caption" themeColor="textSecondary">
        {reciterCredit(reciter)}
      </ThemedText>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  cartouche: {
    borderWidth: 1,
    padding: Spacing.one,
  },
  cartoucheIn: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: 2,
  },
  centred: {
    textAlign: 'center',
  },
  frameWrap: {
    /* The ornaments hang on the frame's own edges. */
    position: 'relative',
  },
  mframe: {
    borderWidth: 1,
    padding: Spacing.one,
  },
  mframeIn: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.one,
  },
  corner: {
    position: 'absolute',
  },
  cornerTL: { top: -6, left: -6 },
  cornerTR: { top: -6, right: -6 },
  cornerBL: { bottom: -6, left: -6 },
  cornerBR: { bottom: -6, right: -6 },
  edgeL: { left: -5, top: '50%', transform: [{ translateY: -5 }] },
  edgeR: { right: -5, top: '50%', transform: [{ translateY: -5 }] },
  list: {
    gap: Spacing.two,
  },
  ayah: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.rule,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  play: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  /*
    Its own row, with repeat and slower sharing the one below.

    Three controls in a line wrap on a narrow phone, and what wrapped was
    "Slower" — stranded alone under the other two, which read as an
    afterthought rather than a pair of modifiers. Giving the primary action the
    full width says the right thing about it and makes the wrap deliberate
    instead of accidental.
  */
  playSurah: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '100%',
    gap: Spacing.two,
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
  loop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 40,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  reciter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reciterText: {
    flex: 1,
    gap: 1,
  },
  /** The same left rule the app uses when it is talking about itself. */
  stalled: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
  ayahText: {
    gap: Spacing.two,
  },
  ayahFoot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
  },
  footLines: {
    flex: 1,
    gap: Spacing.half,
  },
  /*
    The inline marker's seat. RN puts an inline View's bottom on the text
    baseline; Amiri's line box is tall, so without a nudge the rosette rides
    high. Tuned on web; ⚠️ needs a look on a real device.
  */
  inlineRosette: {
    transform: [{ translateY: 6 }],
  },
  coveredLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    minHeight: 58,
  },
  coveredRule: {
    height: 1,
  },
  /** Latin, so it never takes the Arabic face. */
  transliteration: {
    fontStyle: 'italic',
  },
  arabic: {
    /* size and face: the `arabicVerse` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
 mark: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.medium,
    borderWidth: 1,
    marginTop: Spacing.two,
  },
});
