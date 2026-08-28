import type { Locale } from './locales';

/**
 * Text belonging to the app rather than to the religion — labels, headings,
 * controls.
 *
 * Kept apart from `src/content/` on purpose. This is ordinary interface
 * translation: getting "Repeat" wrong is a bug, where getting a translation of
 * the tashahhud wrong is a different class of mistake entirely. Only the
 * strings under `src/i18n/content/` carry that weight.
 *
 * ⚠️ REVIEW REQUIRED — the French and Spanish below are model-written
 * and need a native speaker's eye. They are not religious text, so this is
 * proofreading rather than scholarly review.
 *
 * The English record defines the keys; every other locale is a Partial of it,
 * so a missing string is a fallback and a misspelled key is a type error.
 */
export const EN = {
  'tab.today': 'Today',
  'home.prayNow': 'Pray',
  'home.notInWudu': 'Not in wudu yet?',
  'home.washFirst': 'Wash first',

  /**
   * The home screen, in the order someone reads down it: who they are, what
   * they were part-way through, what is worth today, and the plain-language
   * way in for a question they cannot name yet.
   */
  /*
    The greeting, not "Welcome". It is the first Arabic most converts learn,
    it is what they will actually be greeted with, and reading it every day in
    the app is how it stops being a foreign phrase. Transliterated rather than
    set in Arabic script: the home screen is not the place to make somebody
    decode before they have had coffee.
  */
  'home.greeting': 'Assalamu alaikum',
  'journey.stageOf': 'stage {n} of {total}',
  'home.continue': 'Carry on',
  'home.start': 'Start here',
  'home.journeyDone': 'You have been through every lesson',
  'home.journeyDone.help':
    'Nothing is locked and nothing expires. Go back over anything you want, or keep these two in your week.',
  /**
   * The ask bar and its sheet.
   *
   * Deliberately not "Search". Someone three weeks into Islam does not know
   * what this app contains, so they cannot search it; they have a question.
   * "Ask" is the gesture they already make at 1am into a browser, and naming
   * it that is the whole reason the field beats a row of icons.
   */
  /**
   * What a search result IS, shown under its title.
   *
   * The sheet returns guides, references, duʿas and phrases side by side, and
   * "10 steps" versus "3 minutes" is a different promise. A reader deciding
   * whether to tap needs to know which kind of thing they are about to open.
   */
  'kind.guide': 'Guide',
  'kind.step': 'Step in',
  'kind.section': 'In',
  'kind.reference': 'Reference',
  'kind.pillar': 'Pillar',
  'kind.article': 'Article',
  'kind.dua': 'Duʿa',
  'kind.phrase': 'Phrase',

  'ask.open': 'Ask a question or scan a label',
  'ask.placeholder': 'Ask or scan…',
  'ask.close': 'Close',
  'ask.scan': 'Scan a label',
  'ask.scanDescription': 'Point the camera at an ingredient list',
  'ask.soon': 'Soon',
  'ask.starters': 'Common questions',
  'ask.results': 'Answers',
  'ask.emptyTitle': 'Nothing here answers that yet',
  'ask.emptyBody':
    'The app can only answer what has been written and checked. This one has not been, so rather than guess it says nothing.',
  'ask.browse': 'Browse everything',
  'home.help': 'Something’s come up',
  'home.helpElse': 'Something else',


  /**
   * The times of year the app has something to say about. Never a single named
   * day — see `src/content/seasons.ts` for why the calculation cannot carry one.
   */
  'season.ramadan': 'Ramadan',
  'season.last-ten-nights': 'The last ten nights',
  'season.before-ramadan': 'Ramadan is close',
  'season.dhul-hijjah': 'Dhul-Hijjah',
  'season.muharram': 'A new Islamic year',

  /**
   * The Islamic months.
   *
   * Transliterated once and left that way in French and Spanish, on the same
   * rule as `Recitation.transliteration`: a Latin-script rendering of an Arabic
   * name is the same rendering whichever European language you read it in.
   * Arabic gets the script itself, because a reader of the Arabic app has no
   * use for a crutch spelling.
   */
  'hijri.month.1': 'Muharram',
  'hijri.month.2': 'Safar',
  'hijri.month.3': 'Rabiʿ al-Awwal',
  'hijri.month.4': 'Rabiʿ al-Thani',
  'hijri.month.5': 'Jumada al-Ula',
  'hijri.month.6': 'Jumada al-Akhirah',
  'hijri.month.7': 'Rajab',
  'hijri.month.8': 'Shaʿban',
  'hijri.month.9': 'Ramadan',
  'hijri.month.10': 'Shawwal',
  'hijri.month.11': 'Dhul-Qaʿdah',
  'hijri.month.12': 'Dhul-Hijjah',

  /**
   * "I need help with…" in the words someone would actually use. None of these
   * is the name of an Islamic discipline, on purpose — a beginner does not know
   * that what they want is filed under purification.
   */
  /*
    Written as the sentence in someone's head, not as a category.
    "When something goes wrong" is a filing label; a person at 1am is thinking
    "I think I got it wrong" and will not recognise themselves in a taxonomy.
    First person where the thought is first person.
  */
  'help.topic.prayer': 'How do I pray?',
  'help.topic.washing': 'Do I need to wash first?',
  'help.topic.mistakes': 'I think I got it wrong',
  'help.topic.quran': 'Where do I start with the Qur’an?',
  'help.topic.words': 'What do I say back?',
  'help.topic.food': 'Can I eat this?',
  'help.topic.clothing': 'What should I wear?',
  'help.topic.people': 'How do I tell people?',
  'help.topic.ramadan': 'What happens in Ramadan?',
  'help.topic.new': 'I’ve just become Muslim',

  /**
   * The prayer times card. These were written into the component in English
   * and stayed English in every language until the home screen was rebuilt
   * around them.
   */
  'times.next': 'Next',
  'times.nextTomorrow': 'Next, tomorrow',
  'times.endsAtSunrise': 'ends at sunrise,',
  'times.needLocation': 'Prayer times need to know where you are',
  'times.needLocation.why':
    'The times are worked out from the position of the sun where you are standing. Your location is used on this device and never sent anywhere. There is no server to send it to.',
  'times.locationOff':
    'Location services are turned off, so the times can’t be worked out. Turn them on in your phone’s settings and come back.',
  'times.useLocation': 'Use my location',
  'times.working': 'Working out today’s times…',
  'times.clockSuspect':
    'Your phone’s clock is set a long way from where you seem to be. These times follow the clock, so check your date and time settings if they look wrong.',
  'times.onThisPhone': 'worked out on this phone',
  // These are astronomical times, not an authority. A mosque timetable is a
  // decision by people and may differ by a few minutes; where they disagree,
  // the mosque is what you follow.
  /*
    Friday. Stated as a condition rather than as a fact about the reader,
    because Jumuah replaces Dhuhr only for somebody who prays it in
    congregation — and the app knows the day, not whether you got to a mosque.
  */
  'times.jumuah': 'It’s Friday',
  'times.jumuah.detail':
    'Today Dhuhr is Jumuah, if you pray it at the mosque with everyone. The khutbah comes first, so arrive before the adhan rather than at it. If you cannot get to a mosque today, you pray Dhuhr as normal.',
  'times.followLocal': 'If your mosque’s timetable differs, follow the mosque.',

  /**
   * Units for the counts on cards. A bare "14" tells a beginner nothing — it
   * could be minutes, pages, or things they are expected to have memorised.
   *
   * ⚠️ Arabic counted nouns inflect with the number (3–10 takes the plural,
   * 11–99 the singular), and `ui()` has no interpolation, so one string per
   * unit cannot be right for both "3 steps" and "37 steps". The plural is used
   * throughout and reads slightly off above ten.
   */
  'count.steps': 'steps',
  'count.sections': 'sections',
  'count.phrases': 'phrases',
  'count.duas': 'duʿas',
  'count.clips': 'clips',
  /** The pieces a long text is learned in — the unit you loop twenty times. */
  'count.parts': 'parts to learn',
  'count.items': 'items',
  /** Reading time, spelled out — a Learn card has room for the word. */
  'count.minutes.long': 'min read',
  'count.articles': 'articles',
  'count.pillars': 'pillars',
  /** Reading or doing time on a lesson. Not a target — see `estimatedMinutes`. */
  'count.minutes': 'min',

  /**
   * The disclosure on a note. A beginner sees one plain sentence; the schools
   * that differ and the narrations behind them open only if they ask for them.
   */
  'note.more': 'Learn more',
  'note.less': 'Show less',
  'note.positions': 'What the schools say',
  'note.sources': 'Where this comes from',
  /**
   * How a scholarly position is attributed. The four schools are proper nouns
   * and stay as they are in every language; these three are descriptions, and
   * were rendering as raw English inside an otherwise Spanish page.
   */
  'attribution.the majority': 'The majority',
  'attribution.a minority': 'A minority',
  'attribution.contemporary scholarship': 'Contemporary scholarship',
  'tab.learn': 'Learn',
  'tab.quran': 'Qur’an',
  'tab.duas': 'Duʿa',
  'adhkar.window.morning': 'Morning adhkār',
  'adhkar.window.evening': 'Evening adhkār',
  'adhkar.window.night': 'Before sleep',
  'adhkar.window.afterPrayer': 'After the prayer',
  'adhkar.justPrayed': 'You have just prayed',
  'adhkar.minutes': 'about {n} minutes',
  /* The half a reader can act on: how long the sitting has left, not when it opened. */
  'adhkar.endsAt': 'ends at {prayer}, {time}',
  /* A count is meaningless without its unit, and these two are different units. */
  'adhkar.toSay': '{n} to say',
  'adhkar.minutesShort': '{n} min',
  'adhkar.occasions': '{n} occasions',
  'adhkar.start': 'Start',
  'adhkar.readAgain': 'Read again',
  'adhkar.pinned': 'Pinned duʿas',
  'card.iftar': 'Breaking your fast soon',
  'card.fasting': 'While you are fasting',
  'card.friday': 'It is Friday',
  'card.hajj': 'The days of Hajj',
  'card.moment': 'For about now',
  'card.always': 'Always worth saying',
  'card.seeWhole': 'See the whole duʿa →',
  'card.times': '× {n}',
  'adhkar.everyday': 'Everyday duʿas',
  'adhkar.pin': 'Pin to the top',
  'adhkar.unpin': 'Unpin',
  'adhkar.pinFull': 'Ten is the most you can pin. Unpin one to add another.',
  'adhkar.tapToCount': 'Tap anywhere to count',
  'adhkar.swipeOn': 'Tap to move on',
  'adhkar.instruction': 'Something to do — tap to continue',
  'adhkar.inTheEvening': 'In the evening, say instead:',
  'adhkar.previous': 'Previous',
  'adhkar.next': 'Next',
  'adhkar.finish': 'Done',
  'adhkar.combined':
    'The book gives one list for both the morning and the evening, and marks the few that belong to only one. Which line belongs where has not been reviewed yet, so all of them are here.',
  'duaBook.title': 'Every occasion',
  'duaBook.intro': 'Hisn al-Muslim, the collection these come from, in the order the book has them. Reach for it when you already know what you are looking for. The day above is for when you do not.',
  'duaBook.open': 'Browse every occasion →',
  'duaBook.moreForThisMoment': 'more for this moment in the book →',
  'duaBook.filtered': 'Occasions for this part of the day',
  'duaBook.showAll': 'Show every occasion',
  'duaBook.missing': 'That occasion is not in the book.',

  /*
    The memorisation tab.

    "Progress" is stated as a count and never as a percentage. "6 of 37" is a
    fact; "16%" is a verdict, and nobody three weeks into a religion needs a
    phone grading them on it.
  */
  'quran.title': 'Learn by heart',
  'quran.intro': 'Al-Fatiha, then the short surahs at the end of the Qur’an, in the order people usually learn them. Start at the top. Al-Fatiha is in every prayer, so it is the one to have first.',
  'quran.progress': '{done} of {total} learned',
  'quran.progress.help': 'You decide when one counts. Nothing here is timed, and nothing is taken away.',
  'quran.playSurah': 'Play the surah',
  'quran.stop': 'Stop',
  'quran.known': 'known',
  'quran.markKnown': 'I know this one',
  'quran.knowIt': 'You know this one',
  'quran.surahNumber': 'Surah {n}',
  'quran.tapToHide': 'Tap any ayah to cover it, then recite it from memory and tap again to check.',
  'quran.covered': 'covered, tap to check',
  'quran.hide': 'Cover ayah {n}',
  'quran.reveal': 'Reveal ayah {n}',
  'quran.missing': 'That surah isn’t here.',
  'quran.playFrom': 'Play from ayah {n}',
  'quran.audioUnavailable': 'The recitation isn’t loading. Check your connection. The text is still here to read.',
  'reciter.title': 'Reciter',
  'reciter.label': 'Reciter',
  'reciter.change': 'Change reciter',
  'reciter.intro': 'Whose recitation plays here. Any of them is correct. They differ in pace and in voice, not in what is said.',
  'reciter.credit': 'All recitations from everyayah.com.',
  'count.ayahs': 'ayahs',
  'tab.settings': 'Settings',

  'learn.title': 'Learn',
  'learn.intro':
    'Start at the top if you are new. Everything below it is background for what you are already doing, and can wait for a quiet minute.',
  /*
    The topic groups. Named for the moment a question arrives rather than for
    the subject — "Out in the world" holds food, clothes, family, work and
    manners because they are one situation, being Muslim among people who are
    not, even though a library would file them five different ways.
  */
  /*
    The prayer chooser.

    "Sunnah" is not used as a column heading on purpose. To a convert it is an
    unglossed Arabic word in a table of numbers, and the thing it needs to
    convey is only *when* — before or after. The word is explained where there
    is room to explain it.
  */
  'pray.title': 'Learn to pray',
  'pray.intro': 'Every prayer is the same movements and the same words. What changes is how many times round, and whether the Qur’an is said aloud.',
  'pray.before': 'before',
  'pray.fard': 'owed',
  'pray.after': 'after',
  'pray.rawatib': 'The numbers either side are the sunnah rakʿahs, prayed by choice, before or after the ones that are owed. Asr has none. Twelve a day, across the five. The four before Dhuhr are two prayers of two, not one of four.',
  'step.openSurah': 'Open this surah to practise →',
  'pray.chosen': 'Prayed by choice',
  'pray.chosen.help': 'None of these is owed. They are the prayer you already know. What differs is why you are standing there.',
  'count.rakahs': 'rakʿahs',
  'count.prayers': 'prayers',
  'learn.toPray.title': 'Learn to pray',
  'learn.toPray.subtitle': 'All five, and how many rakʿahs each one is',
  'learn.group.praying': 'Praying',
  'learn.group.believe': 'What you believe',
  'learn.group.world': 'Out in the world',
  'learn.group.hard': 'When it’s hard',
  'learn.group.year': 'The year',
  'learn.group.reference': 'Keep coming back to',
  'learn.section.startHere': 'Start here',
  'learn.section.everyDay': 'Every day',
  'learn.section.understanding': 'Understanding',
  'learn.shahada.title': 'Becoming Muslim',
  'learn.shahada.subtitle': 'What to say, and what it means',
  'learn.shahada.done.title': 'Your shahada',
  'learn.shahada.done.subtitle': 'The words you said, and what they mean',
  'learn.shahada.readAgain': 'Read it again',
  'phrases.title': 'What people say to you',
  'phrases.intro':
    'The phrases you will hear in your first week, what they mean, and what to say back. You are not expected to know these. Everyone learns them by hearing them.',
  'phrases.youSay': 'You say:',
  'learn.phrases.title': 'What people say to you',
  'learn.phrases.subtitle': 'The phrases you will hear, and how to answer them',
  'duas.title': 'Everyday duʿas',
  /*
    The moments of a day. Named the way a person describes their own morning
    rather than as categories — "Getting up", not "Morning adhkar".
  */
  'duas.moment.waking': 'Getting up',
  'duas.moment.washing': 'Washing',
  'duas.moment.leaving': 'Going out',
  'duas.moment.eating': 'Eating',
  'duas.moment.travel': 'Travelling',
  'duas.moment.night': 'Going to bed',
  /*
    Rewritten for the tab as it is now. The old wording described the retired
    six-moment day screen and was already attached to nothing.
  */
  'duas.intro':
    'Short sets of words said at fixed points in the day — and a duʿa for almost anything else.',
  'learn.duas.title': 'Everyday duʿas',
  'learn.duas.subtitle': 'Waking, eating, leaving the house, sleeping',
  'learn.practice.title': 'Practice the recitations',
  'learn.practice.subtitle': 'Hear them line by line, and repeat until they hold',
  'learn.iman.title': 'The Six Articles of Faith',
  'learn.iman.subtitle': 'What you believe, now that you have said the shahada',
  'learn.pillars.title': 'The Five Pillars of Islam',
  'learn.pillars.subtitle': 'What Islam asks of you, and in what order it arrives',

  'practice.title': 'Practice',
  'practice.intro':
    'Play a line, turn on repeat, and say it with the reciter until it holds. This is for learning beforehand. In prayer you recite yourself, not from a recording.',
  'practice.repeat': 'Repeat',
  'practice.slower': 'Slower',
  'practice.ayah': 'Ayah',
  'practice.play': 'Play',
  /** On the words themselves, so practice is reachable from inside the prayer. */
  'practice.thisOne': 'Practise this',
  'practice.pause': 'Pause',

  'pillars.title': 'The Five Pillars',
  'pillars.intro':
    'The five things Islam is built on. Only the first two ask anything of you today. The rest arrive in their own time, and two of them may never apply to you at all.',
  'iman.intro':
    'The five pillars are what you do. These six are what you believe while doing it. You already accepted them when you said the shahada. This page is only putting names to them, and nothing here is something you need to memorise.',
  'pillars.testimony': 'The testimony',
  'pillars.taughtHere': 'The app teaches this →',
  'iman.title': 'The Six Articles of Faith',

  'qibla.title': 'Qibla',
  'settings.title': 'Settings',
  'settings.intro': 'How the app reads, and how it behaves while you pray.',
  'settings.language': 'Language',
  'settings.display': 'Display',
  'settings.transliteration': 'Transliteration',
  'settings.translation': 'Translation',
  'settings.transliteration.help': 'The Arabic spelled out in English letters',
  'settings.translation.help': 'What the words mean in English',
  'settings.reminders': 'Prayer reminders',
  'settings.reminders.help':
    'A quiet notification before each prayer. Nothing is sent anywhere. Your phone works the times out and sets its own alarms.',
  'settings.reminders.lead': 'How far ahead',
  'settings.reminders.atTime': 'At the time',
  'settings.reminders.minutesBefore': '{n} minutes before',
  'settings.reminders.denied':
    'Notifications are turned off for this app. Turn them on in your phone’s settings, then come back.',
  'reminder.now': 'It is time to pray.',
  'reminder.soon': 'In {n} minutes.',
  'settings.duringPrayer': 'During prayer',
  'settings.keepAwake': 'Keep the screen on',
  'settings.keepAwake.help':
    'Stops the screen going dark while you are part-way through a prayer',

  /**
   * Onboarding. Four screens: a welcome, two questions, and a reassurance.
   *
   * The register is the whole point. Someone opening this may have said the
   * shahada three weeks ago and be frightened of getting something wrong, so
   * nothing here may read as a form, a test, or a thing they are behind on.
   */
  /**
   * The positions of the body, named for a screen reader.
   *
   * These were hardcoded English in `guide/[id].tsx` and printed on every step
   * of every prayer — the one part of the app that was never translatable.
   * They now name the drawing rather than replace it.
   */
  'posture.standing': 'Standing',
  'posture.takbir': 'Hands raised',
  'posture.bowing': 'Bowing',
  'posture.rising': 'Standing again',
  'posture.prostrating': 'Prostrating',
  'posture.sitting': 'Sitting',
  'posture.tashahhud': 'Sitting, finger raised',
  'posture.taslim-right': 'Turning right',
  'posture.taslim-left': 'Turning left',
  'posture.washing': 'At the tap',

  'guide.stepOf': 'Step {n} of {total}',
  'guide.rakahOf': 'Rakʿah {n} of {total}',

  'onboarding.step': 'Step {n} of {total}',
  'onboarding.skip': 'Skip',
  'onboarding.back': 'Back',
  'onboarding.continue': 'Continue',

  /**
   * The language question, asked first.
   *
   * It used to be inferred from the phone and never asked, on the reasoning
   * that someone new has enough to decide already. The guess is wrong often
   * enough to matter — people run a phone in one language and read religious
   * material in another — and it is a one-tap question with an obvious default,
   * which is a different thing from a language picker sprung on a stranger.
   *
   * `translation.partial` is on the two options that are partly done. Saying it
   * here, before the choice, is more honest than letting someone pick French
   * and discover the state of it three screens in.
   */
  'onboarding.language.title': 'What language would you like to read in?',
  'onboarding.language.help': 'You can change this at any time in Settings.',
  'translation.partial': 'Partly translated. The rest is shown in English.',

  /**
   * Shown at the foot of a screen carrying untranslated text.
   *
   * `{language}` is the language in its own name. The other locales say it
   * without the placeholder, because "en Français" reads wrong where "en
   * français" is the sentence — a substitution cannot fix a capital letter.
   */
  'translation.gap': 'Some of this page is not in {language} yet, so it is shown in English.',
  'onboarding.selected': 'Selected',

  'onboarding.welcome.title': 'Welcome',
  'onboarding.welcome.body1': 'Welcome to Islam.',
  'onboarding.welcome.body2': 'You don’t need to learn everything today.',
  'onboarding.welcome.body3': 'We’ll take it one step at a time.',
  'onboarding.welcome.cta': 'Let’s get started',

  'onboarding.stage.title': 'Where are you right now?',
  'onboarding.stage.new-muslim': 'I just became Muslim',
  'onboarding.stage.new-muslim.help': 'I’m new to Islam and want help with the essentials.',
  'onboarding.stage.exploring': 'I’m learning about Islam',
  'onboarding.stage.exploring.help': 'I’m exploring Islam and want to understand the basics.',
  'onboarding.stage.returning': 'I’ve been Muslim for a while, but I’m still learning',
  'onboarding.stage.returning.help': 'I want to strengthen my understanding and practice.',
  'onboarding.stage.helping': 'I’m helping someone learn Islam',
  'onboarding.stage.helping.help': 'I want simple resources I can use to help someone else.',

  'onboarding.interest.title': 'What would you like help with first?',
  'onboarding.interest.prayer': 'Prayer',
  'onboarding.interest.basics': 'Learning the basics',
  'onboarding.interest.daily-life': 'Daily Muslim life',
  'onboarding.interest.understanding': 'Understanding Islam',
  'onboarding.interest.unsure': 'I’m not sure',

  'onboarding.reassure.title': 'Don’t worry about learning everything',
  'onboarding.reassure.body1': 'Islam is a lifelong journey.',
  'onboarding.reassure.body2': 'You are not expected to know everything immediately.',
  'onboarding.reassure.body3':
    'Start with what you need today. We’ll help you with the rest as you go.',
  'onboarding.reassure.cta': 'Let’s begin',

  'settings.storage': 'Saved audio',
  'settings.storage.help': 'Surahs save themselves the first time you play them, so they work without a signal afterwards. Delete a voice here to get the space back, and playing it again saves it again.',
  'settings.storage.files': 'ayahs',
  'settings.storage.delete': 'Delete',
  'settings.onboarding': 'Getting started',
  'settings.onboarding.help':
    'Answer the two questions again to change what the app suggests first.',
  'settings.onboarding.redo': 'Choose again',

  'learn.recommended': 'Where to start',

  /**
   * The beginner journey. Six stages over content that already exists — the
   * titles here are the lesson's name *in the journey*, used only where a step
   * opens a list rather than a single page.
   */
  'journey.title': 'The beginner path',
  'journey.intro':
    'Six stages, in the order most people meet them. Nothing is locked. Go straight to what you need today and come back for the rest.',
  'journey.progress': '{done} of {total}',
  'journey.start': 'Start',
  'journey.continue': 'Continue',
  'journey.finished': 'All done',
  'journey.markDone': 'Mark as done',
  'journey.markNotDone': 'Mark as not done',
  'journey.done': 'Done',
  'journey.lessons': 'lessons',

  'journey.requirement.foundation': 'Foundation',
  'journey.requirement.practice': 'Practice',
  'journey.requirement.learning': 'Worth knowing',
  'journey.requirement.seasonal': 'When it comes round',

  /*
    A word per stage, for under the arches on the Learn tab.
    The full names do not fit six across a phone, and truncating them to
    "Learning to…" would be worse than choosing the short form deliberately.
  */
  'journey.carryOn': 'Carry on where you left off',
  'journey.short.start-here': 'Start',
  'journey.short.first-days': 'First days',
  'journey.short.learning-to-pray': 'Prayer',
  'journey.short.living': 'Living',
  'journey.short.deepening': 'Deeper',
  'journey.short.through-the-year': 'The year',
  'journey.stage.start-here': 'Start here',
  'journey.stage.start-here.help': 'What Islam is, and what you have joined.',
  'journey.stage.first-days': 'Your first days',
  'journey.stage.first-days.help': 'Enough to pray tonight.',
  'journey.stage.learning-to-pray': 'Learning to pray',
  'journey.stage.learning-to-pray.help': 'The prayer properly, one step at a time.',
  'journey.stage.living': 'Living as a Muslim',
  'journey.stage.living.help': 'Food, clothes, work, and the people around you.',
  'journey.stage.deepening': 'Going deeper',
  'journey.stage.deepening.help': 'Islam is not only a list of rules.',
  'journey.stage.through-the-year': 'Through the year',
  'journey.stage.through-the-year.help': 'Ramadan, Hajj, and the two Eids.',

  'journey.lesson.five-pillars': 'The Five Pillars',
  'journey.lesson.six-articles': 'The Six Articles of Faith',
  'journey.lesson.phrases': 'What people say to you',
  'journey.lesson.purification': 'Ghusl and tayammum',
  'journey.lesson.how-to-pray': 'How to pray',
  'journey.lesson.pray-fajr': 'Praying Fajr, step by step',
  'journey.lesson.pray-maghrib': 'Praying Maghrib, step by step',
  'journey.lesson.everyday-duas': 'Everyday duʿas',
  'journey.lesson.hereafter': 'The Hereafter',
  'journey.lesson.fasting': 'Fasting',
  'journey.lesson.zakat': 'Zakat',
  'journey.lesson.hajj': 'Hajj',
  'settings.guidance': 'Prayer guidance for',

  /*
    Settings → Sources.

    Attribution used to sit under each narration on the teaching pages, which
    put a mirror's domain name on screen underneath a hadith. It reads as
    though the app were citing a website rather than Bukhari, so it came off
    and landed here, where somebody looking for it can actually find it.
  */
  'settings.sources': 'Sources',
  'settings.sources.help': 'Where every text and recitation in the app came from',
  'sources.intro':
    'The Qur’an, the narrations and the recitations in this app are published by other people. This is who they are.',
  'sources.quran': 'The Qur’an',
  'sources.quran.arabic': 'The Arabic of every surah you can read and memorise',
  'sources.quran.translation': 'The translation printed under it',
  'sources.texts': 'Quoted in the lessons',
  'sources.voices': 'Recitation',
  'sources.footnote':
    'Nothing here is edited. Where a publisher asks to be named, this is where they are named.',
  'settings.audience.man': 'Men',
  'settings.audience.woman': 'Women',
  'settings.audience.both': 'Show everything',

  'common.back': 'Back',
  'common.next': 'Next',
  'common.finish': 'Finish',
  'common.times': 'times',
} as const;

export type UIKey = keyof typeof EN;

type Overrides = Partial<Record<UIKey, string>>;

const FR: Overrides = {
  'tab.today': 'Aujourd’hui',
  'tab.learn': 'Apprendre',
  'tab.quran': 'Coran',
  'tab.duas': 'Duʿa',
  'quran.title': 'Apprendre par cœur',
  'quran.intro': 'Al-Fatiha, puis les sourates courtes de la fin du Coran, dans l’ordre où on les apprend habituellement. Commencez par le haut — Al-Fatiha est dans chaque prière, c’est donc celle à connaître en premier.',
  'quran.progress': '{done} sur {total} apprises',
  'quran.progress.help': 'C’est vous qui décidez quand une sourate compte. Rien n’est chronométré, et rien ne se perd.',
  'quran.playSurah': 'Écouter la sourate',
  'quran.stop': 'Arrêter',
  'quran.known': 'apprise',
  'quran.markKnown': 'Je la connais',
  'quran.knowIt': 'Vous la connaissez',
  'quran.surahNumber': 'Sourate {n}',
  'quran.tapToHide': 'Touchez un verset pour le masquer, récitez-le de mémoire, puis touchez à nouveau pour vérifier.',
  'quran.covered': 'masqué — touchez pour vérifier',
  'quran.hide': 'Masquer le verset {n}',
  'quran.reveal': 'Afficher le verset {n}',
  'quran.missing': 'Cette sourate n’est pas ici.',
  'quran.playFrom': 'Écouter à partir du verset {n}',
  'quran.audioUnavailable': 'La récitation ne se charge pas. Vérifiez votre connexion — le texte reste là pour être lu.',
  'reciter.title': 'Récitateur',
  'reciter.label': 'Récitateur',
  'reciter.change': 'Changer de récitateur',
  'reciter.intro': 'Qui récite ici. Tous sont corrects — ils diffèrent par le rythme et par la voix, pas par ce qui est dit.',
  'reciter.credit': 'Toutes les récitations proviennent de everyayah.com.',
  'count.ayahs': 'versets',
  'tab.settings': 'Réglages',
  'learn.title': 'Apprendre',
  'pray.title': 'Apprendre à prier',
  'pray.intro': 'Chaque prière comporte les mêmes gestes et les mêmes paroles. Ce qui change, c’est le nombre de cycles, et si le Coran est récité à voix haute.',
  'pray.before': 'avant',
  'pray.fard': 'dû',
  'pray.after': 'après',
  'pray.rawatib': 'Les nombres de part et d’autre sont les rakʿahs surérogatoires — priées par choix, avant ou après celles qui sont dues. Asr n’en a aucune. Douze par jour, réparties sur les cinq.',
  'pray.chosen': 'Priées par choix',
  'pray.chosen.help': 'Deux rakʿahs chacune — la prière que vous connaissez déjà. Ce qui diffère, c’est la raison d’être là.',
  'count.rakahs': 'rakʿahs',
  'count.prayers': 'prières',
  'learn.toPray.title': 'Apprendre à prier',
  'learn.toPray.subtitle': 'Les cinq, et le nombre de rakʿahs de chacune',
  'learn.group.praying': 'La prière',
  'learn.group.believe': 'Ce que vous croyez',
  'learn.group.world': 'Parmi les autres',
  'learn.group.hard': 'Quand c’est difficile',
  'learn.group.year': 'L’année',
  'learn.group.reference': 'À consulter souvent',
  'learn.section.startHere': 'Commencer ici',
  'phrases.title': 'Ce qu’on vous dira',
  'duas.title': 'Invocations du quotidien',
  'duas.moment.waking': 'Au réveil',
  'duas.moment.washing': 'La toilette',
  'duas.moment.leaving': 'En sortant',
  'duas.moment.eating': 'Les repas',
  'duas.moment.travel': 'En voyage',
  'duas.moment.night': 'Au coucher',
  'learn.section.everyDay': 'Chaque jour',
  'learn.section.understanding': 'Comprendre',
  'practice.title': 'Pratiquer',
  'practice.repeat': 'Répéter',
  'practice.slower': 'Plus lent',
  'practice.ayah': 'Verset',
  'practice.play': 'Lire',
  'practice.thisOne': 'S’entraîner sur ce texte',
  'practice.pause': 'Pause',
  'pillars.title': 'Les cinq piliers',
  'pillars.testimony': 'L’attestation de foi',
  'iman.title': 'Les six piliers de la foi',
  'qibla.title': 'Qibla',
  'settings.title': 'Réglages',
  'settings.intro': 'Comment l’application se lit, et comment elle se comporte pendant la prière.',
  'settings.language': 'Langue',
  'settings.display': 'Affichage',
  'settings.transliteration': 'Translittération',
  'settings.translation': 'Traduction',
  'settings.reminders': 'Rappels de prière',
  'reminder.now': 'C’est l’heure de la prière.',
  'settings.duringPrayer': 'Pendant la prière',
  'settings.keepAwake': 'Garder l’écran allumé',
  'posture.standing': 'Debout',
  'posture.takbir': 'Mains levées',
  'posture.bowing': 'Inclinaison',
  'posture.rising': 'De nouveau debout',
  'posture.prostrating': 'Prosternation',
  'posture.sitting': 'Assis',
  'posture.tashahhud': 'Assis, index levé',
  'posture.taslim-right': 'Tourné vers la droite',
  'posture.taslim-left': 'Tourné vers la gauche',
  'posture.washing': 'Au robinet',
  'guide.stepOf': 'Étape {n} sur {total}',
  'guide.rakahOf': 'Rakʿah {n} sur {total}',

  'onboarding.step': 'Étape {n} sur {total}',
  'onboarding.skip': 'Passer',
  'onboarding.back': 'Retour',
  'onboarding.continue': 'Continuer',
  'onboarding.language.title': 'Dans quelle langue souhaitez-vous lire ?',
  'onboarding.language.help': 'Vous pourrez changer cela à tout moment dans les réglages.',
  'translation.partial': 'Traduction partielle — le reste est affiché en anglais.',
  'translation.gap':
    "Une partie de cette page n'est pas encore traduite en français. Elle est affichée en anglais.",
  'onboarding.selected': 'Sélectionné',
  'onboarding.welcome.title': 'Bienvenue',
  'onboarding.welcome.body1': 'Bienvenue en islam.',
  'onboarding.welcome.body2': 'Vous n’avez pas besoin de tout apprendre aujourd’hui.',
  'onboarding.welcome.body3': 'Nous avancerons pas à pas.',
  'onboarding.welcome.cta': 'Commençons',
  'onboarding.stage.title': 'Où en êtes-vous aujourd’hui ?',
  'onboarding.stage.new-muslim': 'Je viens d’embrasser l’islam',
  'onboarding.stage.new-muslim.help': 'Je débute et je veux de l’aide sur l’essentiel.',
  'onboarding.stage.exploring': 'Je découvre l’islam',
  'onboarding.stage.exploring.help': 'J’explore l’islam et je veux en comprendre les bases.',
  'onboarding.stage.returning': 'Je pratique depuis un moment, mais j’apprends encore',
  'onboarding.stage.returning.help': 'Je veux renforcer ma compréhension et ma pratique.',
  'onboarding.stage.helping': 'J’aide quelqu’un à découvrir l’islam',
  'onboarding.stage.helping.help':
    'Je veux des ressources simples pour aider quelqu’un d’autre.',
  'onboarding.interest.title': 'Par quoi souhaitez-vous commencer ?',
  'onboarding.interest.prayer': 'La prière',
  'onboarding.interest.basics': 'Apprendre les bases',
  'onboarding.interest.daily-life': 'La vie musulmane au quotidien',
  'onboarding.interest.understanding': 'Comprendre l’islam',
  'onboarding.interest.unsure': 'Je ne sais pas trop',
  'onboarding.reassure.title': 'Ne vous inquiétez pas de tout apprendre',
  'onboarding.reassure.body1': 'L’islam est le chemin d’une vie.',
  'onboarding.reassure.body2':
    'Personne n’attend de vous que vous sachiez tout immédiatement.',
  'onboarding.reassure.body3':
    'Commencez par ce dont vous avez besoin aujourd’hui. Nous vous aiderons pour le reste au fur et à mesure.',
  'onboarding.reassure.cta': 'Commencer',
  'settings.onboarding': 'Pour commencer',
  'settings.onboarding.help':
    'Répondez à nouveau aux deux questions pour changer ce que l’application propose en premier.',
  'settings.onboarding.redo': 'Choisir à nouveau',
  'learn.intro':
    'Commencez par le haut si vous débutez. Tout ce qui suit est un arrière-plan de ce que vous faites déjà, et peut attendre un moment calme.',
  'learn.recommended': 'Par où commencer',
  'journey.title': 'Le parcours du débutant',
  'journey.intro':
    'Six étapes, dans l’ordre où la plupart des gens les rencontrent. Rien n’est verrouillé — allez directement à ce dont vous avez besoin aujourd’hui et revenez pour le reste.',
  'journey.progress': '{done} sur {total}',
  'journey.start': 'Commencer',
  'journey.continue': 'Continuer',
  'journey.finished': 'Terminé',
  'journey.markDone': 'Marquer comme terminé',
  'journey.markNotDone': 'Marquer comme non terminé',
  'journey.done': 'Terminé',
  'journey.lessons': 'leçons',
  'journey.requirement.foundation': 'Fondations',
  'journey.requirement.practice': 'Pratique',
  'journey.requirement.learning': 'Bon à savoir',
  'journey.requirement.seasonal': 'Le moment venu',
  'journey.carryOn': 'Reprendre où vous en étiez',
  'journey.short.start-here': 'Début',
  'journey.short.first-days': 'Premiers jours',
  'journey.short.learning-to-pray': 'Prière',
  'journey.short.living': 'Vivre',
  'journey.short.deepening': 'Approfondir',
  'journey.short.through-the-year': 'L’année',
  'journey.stage.start-here': 'Commencer ici',
  'journey.stage.start-here.help': 'Ce qu’est l’islam, et ce que vous avez rejoint.',
  'journey.stage.first-days': 'Vos premiers jours',
  'journey.stage.first-days.help': 'De quoi prier ce soir.',
  'journey.stage.learning-to-pray': 'Apprendre à prier',
  'journey.stage.learning-to-pray.help': 'La prière comme il faut, étape par étape.',
  'journey.stage.living': 'Vivre en musulman',
  'journey.stage.living.help': 'La nourriture, les vêtements, le travail, et les gens autour de vous.',
  'journey.stage.deepening': 'Aller plus loin',
  'journey.stage.deepening.help': 'L’islam n’est pas qu’une liste de règles.',
  'journey.stage.through-the-year': 'Au fil de l’année',
  'journey.stage.through-the-year.help': 'Le Ramadan, le Hajj, et les deux Aïds.',
  'journey.lesson.five-pillars': 'Les cinq piliers',
  'journey.lesson.six-articles': 'Les six piliers de la foi',
  'journey.lesson.phrases': 'Ce qu’on vous dira',
  'journey.lesson.purification': 'Ghusl et tayammum',
  'journey.lesson.how-to-pray': 'Comment prier',
  'journey.lesson.pray-fajr': 'Prier le Fajr, étape par étape',
  'journey.lesson.pray-maghrib': 'Prier le Maghrib, étape par étape',
  'journey.lesson.everyday-duas': 'Invocations du quotidien',
  'journey.lesson.hereafter': 'L’au-delà',
  'journey.lesson.fasting': 'Le jeûne',
  'journey.lesson.zakat': 'La zakat',
  'journey.lesson.hajj': 'Le Hajj',
  'home.prayNow': 'Prier',
  'home.notInWudu': 'Pas encore en état de wudu ?',
  'home.washFirst': 'Se laver d’abord',
  'home.greeting': 'Assalamu alaikum',
  'journey.stageOf': 'étape {n} sur {total}',
  'home.continue': 'Reprendre',
  'home.start': 'Commencer',
  'home.journeyDone': 'Vous avez parcouru toutes les leçons',
  'home.journeyDone.help':
    'Rien n’est verrouillé et rien n’expire. Revenez sur ce que vous voulez, ou gardez ces deux-là dans votre semaine.',
  'kind.guide': 'Guide',
  'kind.step': 'Étape de',
  'kind.section': 'Dans',
  'kind.reference': 'Référence',
  'kind.pillar': 'Pilier',
  'kind.article': 'Article',
  'kind.dua': 'Duʿa',
  'kind.phrase': 'Expression',
  'ask.open': 'Poser une question ou scanner une étiquette',
  'ask.placeholder': 'Demander ou scanner…',
  'ask.close': 'Fermer',
  'ask.scan': 'Scanner une étiquette',
  'ask.scanDescription': 'Pointez la caméra vers la liste des ingrédients',
  'ask.soon': 'Bientôt',
  'ask.starters': 'Questions fréquentes',
  'ask.results': 'Réponses',
  'ask.emptyTitle': 'Rien ici ne répond encore à cela',
  'ask.emptyBody':
    'L’application ne répond qu’à ce qui a été rédigé et vérifié. Ce n’est pas le cas ici : plutôt que de deviner, elle se tait.',
  'ask.browse': 'Tout parcourir',
  'home.help': 'Un imprévu ?',
  'home.helpElse': 'Autre chose',
  'season.ramadan': 'Ramadan',
  'season.last-ten-nights': 'Les dix dernières nuits',
  'season.before-ramadan': 'Le Ramadan approche',
  'season.muharram': 'Une nouvelle année musulmane',
  'help.topic.prayer': 'Comment prier ?',
  'help.topic.washing': 'Dois-je me purifier avant ?',
  'help.topic.mistakes': 'Je crois m’être trompé',
  'help.topic.quran': 'Par où commencer le Coran ?',
  'help.topic.words': 'Que dois-je répondre ?',
  'help.topic.food': 'Puis-je manger ça ?',
  'help.topic.clothing': 'Que dois-je porter ?',
  'help.topic.people': 'Comment l’annoncer ?',
  'help.topic.ramadan': 'Que se passe-t-il pendant le Ramadan ?',
  'help.topic.new': 'Je viens d’embrasser l’islam',
  'times.next': 'Prochaine',
  'times.nextTomorrow': 'Prochaine, demain',
  'times.endsAtSunrise': 'se termine au lever du soleil,',
  'times.needLocation': 'Les horaires de prière ont besoin de savoir où vous êtes',
  'times.needLocation.why':
    'Les horaires sont calculés à partir de la position du soleil là où vous vous trouvez. Votre position est utilisée sur cet appareil et n’est jamais envoyée ailleurs — il n’y a aucun serveur où l’envoyer.',
  'times.locationOff':
    'La localisation est désactivée, les horaires ne peuvent donc pas être calculés. Activez-la dans les réglages de votre téléphone et revenez.',
  'times.useLocation': 'Utiliser ma position',
  'times.working': 'Calcul des horaires du jour…',
  'times.clockSuspect':
    'L’horloge de votre téléphone est réglée très loin de l’endroit où vous semblez être. Ces horaires suivent l’horloge : vérifiez la date et l’heure si elles semblent fausses.',
  'times.onThisPhone': 'calculés sur ce téléphone',
  'times.jumuah': 'C’est vendredi',
  'times.jumuah.detail':
    'Aujourd’hui, Dhuhr devient la prière du vendredi — si vous la priez à la mosquée avec les autres. Le sermon vient d’abord : arrivez avant l’appel, pas au moment de l’appel. Si vous ne pouvez pas vous rendre à la mosquée, vous priez Dhuhr normalement.',
  'times.followLocal': 'Si les horaires de votre mosquée diffèrent, suivez la mosquée.',
  'count.minutes': 'min',
  'count.steps': 'étapes',
  'count.sections': 'sections',
  'count.phrases': 'phrases',
  'count.duas': 'invocations',
  'count.clips': 'extraits',
  'count.parts': 'parties à apprendre',
  'count.items': 'éléments',
  'count.minutes.long': 'min de lecture',
  'count.articles': 'piliers',
  'count.pillars': 'piliers',
  'note.more': 'En savoir plus',
  'note.less': 'Réduire',
  'note.positions': 'Ce que disent les écoles',
  'note.sources': 'D’où cela vient',
  'attribution.the majority': 'La majorité',
  'attribution.a minority': 'Une minorité',
  'attribution.contemporary scholarship': 'Les savants contemporains',
  'settings.guidance': 'Conseils de prière pour',
  'settings.sources': 'Sources',
  'settings.sources.help': 'D’où viennent tous les textes et les récitations',
  'sources.intro':
    'Le Coran, les hadiths et les récitations de cette application sont publiés par d’autres. Voici qui ils sont.',
  'sources.quran': 'Le Coran',
  'sources.quran.arabic': 'L’arabe de chaque sourate à lire et à mémoriser',
  'sources.quran.translation': 'La traduction imprimée en dessous',
  'sources.texts': 'Cités dans les leçons',
  'sources.voices': 'Récitation',
  'sources.footnote':
    'Rien ici n’est modifié. Lorsqu’un éditeur demande à être nommé, c’est ici qu’il l’est.',
  'common.back': 'Retour',
  'common.next': 'Suivant',
  'common.finish': 'Terminer',
};

const ES: Overrides = {
  'tab.today': 'Hoy',
  'tab.learn': 'Aprender',
  'tab.quran': 'Corán',
  'tab.duas': 'Duʿa',
  'quran.title': 'Aprender de memoria',
  'quran.intro': 'Al-Fatiha y luego las suras cortas del final del Corán, en el orden en que suelen aprenderse. Empieza por arriba — Al-Fatiha está en cada oración, así que es la primera que conviene saber.',
  'quran.progress': '{done} de {total} aprendidas',
  'quran.progress.help': 'Tú decides cuándo cuenta una. Nada se cronometra y nada se pierde.',
  'quran.playSurah': 'Escuchar la sura',
  'quran.stop': 'Parar',
  'quran.known': 'aprendida',
  'quran.markKnown': 'Me la sé',
  'quran.knowIt': 'Te la sabes',
  'quran.surahNumber': 'Sura {n}',
  'quran.tapToHide': 'Toca una aleya para taparla, recítala de memoria y toca otra vez para comprobar.',
  'quran.covered': 'tapada — toca para comprobar',
  'quran.hide': 'Tapar la aleya {n}',
  'quran.reveal': 'Mostrar la aleya {n}',
  'quran.missing': 'Esa sura no está aquí.',
  'quran.playFrom': 'Escuchar desde la aleya {n}',
  'quran.audioUnavailable': 'La recitación no se está cargando. Comprueba tu conexión — el texto sigue aquí para leerlo.',
  'reciter.title': 'Recitador',
  'reciter.label': 'Recitador',
  'reciter.change': 'Cambiar de recitador',
  'reciter.intro': 'Quién recita aquí. Cualquiera de ellos es correcto — se diferencian en el ritmo y en la voz, no en lo que dicen.',
  'reciter.credit': 'Todas las recitaciones proceden de everyayah.com.',
  'count.ayahs': 'aleyas',
  'tab.settings': 'Ajustes',
  'learn.title': 'Aprender',
  'pray.title': 'Aprender a rezar',
  'pray.intro': 'Todas las oraciones tienen los mismos movimientos y las mismas palabras. Lo que cambia es cuántos ciclos, y si el Corán se recita en voz alta.',
  'pray.before': 'antes',
  'pray.fard': 'debida',
  'pray.after': 'después',
  'pray.rawatib': 'Los números a cada lado son las rakʿahs voluntarias — rezadas por elección, antes o después de las debidas. Asr no tiene ninguna. Doce al día, entre las cinco.',
  'pray.chosen': 'Rezadas por elección',
  'pray.chosen.help': 'Dos rakʿahs cada una — la misma oración que ya conoces. Lo que cambia es por qué estás ahí.',
  'count.rakahs': 'rakʿahs',
  'count.prayers': 'oraciones',
  'learn.toPray.title': 'Aprender a rezar',
  'learn.toPray.subtitle': 'Las cinco, y cuántas rakʿahs tiene cada una',
  'learn.group.praying': 'La oración',
  'learn.group.believe': 'Lo que crees',
  'learn.group.world': 'Entre los demás',
  'learn.group.hard': 'Cuando cuesta',
  'learn.group.year': 'El año',
  'learn.group.reference': 'Para volver a consultar',
  'learn.section.startHere': 'Empieza aquí',
  'phrases.title': 'Lo que te dirán',
  'duas.title': 'Súplicas diarias',
  'duas.moment.waking': 'Al despertar',
  'duas.moment.washing': 'El aseo',
  'duas.moment.leaving': 'Al salir',
  'duas.moment.eating': 'Las comidas',
  'duas.moment.travel': 'De viaje',
  'duas.moment.night': 'Al acostarse',
  'learn.section.everyDay': 'Cada día',
  'learn.section.understanding': 'Comprender',
  'practice.title': 'Practicar',
  'practice.repeat': 'Repetir',
  'practice.slower': 'Más lento',
  'practice.ayah': 'Aleya',
  'practice.play': 'Reproducir',
  'practice.thisOne': 'Practicar este texto',
  'practice.pause': 'Pausa',
  'pillars.title': 'Los cinco pilares',
  'pillars.testimony': 'El testimonio de fe',
  'iman.title': 'Los seis pilares de la fe',
  'qibla.title': 'Alquibla',
  'settings.title': 'Ajustes',
  'settings.intro': 'Cómo se lee la aplicación y cómo se comporta mientras rezas.',
  'settings.language': 'Idioma',
  'settings.display': 'Visualización',
  'settings.transliteration': 'Transliteración',
  'settings.translation': 'Traducción',
  'settings.reminders': 'Recordatorios de oración',
  'reminder.now': 'Es hora de rezar.',
  'settings.duringPrayer': 'Durante la oración',
  'settings.keepAwake': 'Mantener la pantalla encendida',
  'posture.standing': 'De pie',
  'posture.takbir': 'Manos alzadas',
  'posture.bowing': 'Inclinación',
  'posture.prostrating': 'Postración',
  'posture.rising': 'De pie otra vez',
  'posture.sitting': 'Sentado',
  'posture.tashahhud': 'Sentado, índice alzado',
  'posture.taslim-right': 'Girado a la derecha',
  'posture.taslim-left': 'Girado a la izquierda',
  'posture.washing': 'En el grifo',
  'guide.stepOf': 'Paso {n} de {total}',
  'guide.rakahOf': 'Rakʿah {n} de {total}',

  'onboarding.step': 'Paso {n} de {total}',
  'onboarding.skip': 'Omitir',
  'onboarding.back': 'Atrás',
  'onboarding.continue': 'Continuar',
  'onboarding.language.title': '¿En qué idioma quieres leer?',
  'onboarding.language.help': 'Puedes cambiarlo en cualquier momento en Ajustes.',
  'translation.partial': 'Traducción parcial: el resto se muestra en inglés.',
  'translation.gap':
    'Parte de esta página aún no está traducida al español. Se muestra en inglés.',
  'onboarding.selected': 'Seleccionado',
  'onboarding.welcome.title': 'Bienvenida',
  'onboarding.welcome.body1': 'Te damos la bienvenida al islam.',
  'onboarding.welcome.body2': 'No necesitas aprenderlo todo hoy.',
  'onboarding.welcome.body3': 'Iremos paso a paso.',
  'onboarding.welcome.cta': 'Empecemos',
  'onboarding.stage.title': '¿En qué punto estás ahora?',
  'onboarding.stage.new-muslim': 'Acabo de abrazar el islam',
  'onboarding.stage.new-muslim.help': 'Empiezo en el islam y quiero ayuda con lo esencial.',
  'onboarding.stage.exploring': 'Estoy conociendo el islam',
  'onboarding.stage.exploring.help': 'Estoy explorando el islam y quiero entender lo básico.',
  'onboarding.stage.returning': 'Llevo tiempo en el islam, pero sigo aprendiendo',
  'onboarding.stage.returning.help': 'Quiero reforzar mi comprensión y mi práctica.',
  'onboarding.stage.helping': 'Estoy ayudando a alguien a conocer el islam',
  'onboarding.stage.helping.help': 'Quiero recursos sencillos para ayudar a otra persona.',
  'onboarding.interest.title': '¿Con qué te gustaría empezar?',
  'onboarding.interest.prayer': 'La oración',
  'onboarding.interest.basics': 'Aprender lo básico',
  'onboarding.interest.daily-life': 'La vida musulmana diaria',
  'onboarding.interest.understanding': 'Entender el islam',
  'onboarding.interest.unsure': 'No lo tengo claro',
  'onboarding.reassure.title': 'No te preocupes por aprenderlo todo',
  'onboarding.reassure.body1': 'El islam es un camino de toda la vida.',
  'onboarding.reassure.body2': 'Nadie espera que lo sepas todo de inmediato.',
  'onboarding.reassure.body3':
    'Empieza por lo que necesitas hoy. Te ayudaremos con lo demás sobre la marcha.',
  'onboarding.reassure.cta': 'Comenzar',
  'settings.onboarding': 'Primeros pasos',
  'settings.onboarding.help':
    'Responde otra vez las dos preguntas para cambiar lo que la aplicación sugiere primero.',
  'settings.onboarding.redo': 'Elegir de nuevo',
  'learn.intro':
    'Empieza por arriba si eres nuevo. Todo lo que está debajo es contexto de lo que ya haces, y puede esperar a un momento tranquilo.',
  'learn.recommended': 'Por dónde empezar',
  'journey.title': 'El camino del principiante',
  'journey.intro':
    'Seis etapas, en el orden en que la mayoría las encuentra. Nada está bloqueado: ve directo a lo que necesitas hoy y vuelve luego por el resto.',
  'journey.progress': '{done} de {total}',
  'journey.start': 'Empezar',
  'journey.continue': 'Continuar',
  'journey.finished': 'Todo hecho',
  'journey.markDone': 'Marcar como hecho',
  'journey.markNotDone': 'Marcar como no hecho',
  'journey.done': 'Hecho',
  'journey.lessons': 'lecciones',
  'journey.requirement.foundation': 'Base',
  'journey.requirement.practice': 'Práctica',
  'journey.requirement.learning': 'Bueno saberlo',
  'journey.requirement.seasonal': 'Cuando llegue',
  'journey.carryOn': 'Continuar donde lo dejaste',
  'journey.short.start-here': 'Inicio',
  'journey.short.first-days': 'Primeros días',
  'journey.short.learning-to-pray': 'Oración',
  'journey.short.living': 'Vivir',
  'journey.short.deepening': 'Profundizar',
  'journey.short.through-the-year': 'El año',
  'journey.stage.start-here': 'Empieza aquí',
  'journey.stage.start-here.help': 'Qué es el islam y a qué te has unido.',
  'journey.stage.first-days': 'Tus primeros días',
  'journey.stage.first-days.help': 'Lo justo para rezar esta noche.',
  'journey.stage.learning-to-pray': 'Aprender a rezar',
  'journey.stage.learning-to-pray.help': 'La oración bien hecha, paso a paso.',
  'journey.stage.living': 'Vivir como musulmán',
  'journey.stage.living.help': 'La comida, la ropa, el trabajo y la gente a tu alrededor.',
  'journey.stage.deepening': 'Profundizar',
  'journey.stage.deepening.help': 'El islam no es solo una lista de reglas.',
  'journey.stage.through-the-year': 'A lo largo del año',
  'journey.stage.through-the-year.help': 'Ramadán, el Hach y las dos fiestas del Eid.',
  'journey.lesson.five-pillars': 'Los cinco pilares',
  'journey.lesson.six-articles': 'Los seis pilares de la fe',
  'journey.lesson.phrases': 'Lo que te dirán',
  'journey.lesson.purification': 'Ghusl y tayammum',
  'journey.lesson.how-to-pray': 'Cómo rezar',
  'journey.lesson.pray-fajr': 'Rezar el Fajr, paso a paso',
  'journey.lesson.pray-maghrib': 'Rezar el Maghrib, paso a paso',
  'journey.lesson.everyday-duas': 'Súplicas diarias',
  'journey.lesson.hereafter': 'La otra vida',
  'journey.lesson.fasting': 'El ayuno',
  'journey.lesson.zakat': 'El zakat',
  'journey.lesson.hajj': 'El Hach',
  'home.prayNow': 'Rezar',
  'home.notInWudu': '¿Aún sin wudu?',
  'home.washFirst': 'Purifícate primero',
  'kind.guide': 'Guía',
  'kind.step': 'Paso de',
  'kind.section': 'En',
  'kind.reference': 'Referencia',
  'kind.pillar': 'Pilar',
  'kind.article': 'Artículo',
  'kind.dua': 'Duʿa',
  'kind.phrase': 'Expresión',
  'ask.open': 'Haz una pregunta o escanea una etiqueta',
  'ask.placeholder': 'Pregunta o escanea…',
  'ask.close': 'Cerrar',
  'ask.scan': 'Escanear una etiqueta',
  'ask.scanDescription': 'Apunta la cámara a la lista de ingredientes',
  'ask.soon': 'Pronto',
  'ask.starters': 'Preguntas frecuentes',
  'ask.results': 'Respuestas',
  'ask.emptyTitle': 'Todavía no hay nada que responda a eso',
  'ask.emptyBody':
    'La aplicación solo responde lo que se ha escrito y verificado. Esto no lo está, así que en lugar de adivinar, no dice nada.',
  'ask.browse': 'Ver todo',
  'home.greeting': 'Assalamu alaikum',
  'journey.stageOf': 'etapa {n} de {total}',
  'home.continue': 'Continuar',
  'home.start': 'Empezar',
  'home.journeyDone': 'Has pasado por todas las lecciones',
  'home.journeyDone.help':
    'Nada está bloqueado y nada caduca. Vuelve a lo que quieras, o guarda estas dos cosas para tu semana.',
  'home.help': '¿Ha surgido algo?',
  'home.helpElse': 'Otra cosa',
  'season.ramadan': 'Ramadán',
  'season.last-ten-nights': 'Las diez últimas noches',
  'season.before-ramadan': 'Ramadán está cerca',
  'season.muharram': 'Un nuevo año islámico',
  'help.topic.prayer': '¿Cómo se reza?',
  'help.topic.washing': '¿Debo lavarme antes?',
  'help.topic.mistakes': 'Creo que me equivoqué',
  'help.topic.quran': '¿Por dónde empiezo con el Corán?',
  'help.topic.words': '¿Qué respondo?',
  'help.topic.food': '¿Puedo comer esto?',
  'help.topic.clothing': '¿Qué debo ponerme?',
  'help.topic.people': '¿Cómo se lo digo a la gente?',
  'help.topic.ramadan': '¿Qué pasa en Ramadán?',
  'help.topic.new': 'Acabo de abrazar el islam',
  'times.next': 'Siguiente',
  'times.nextTomorrow': 'Siguiente, mañana',
  'times.endsAtSunrise': 'termina al amanecer,',
  'times.needLocation': 'Los horarios de oración necesitan saber dónde estás',
  'times.needLocation.why':
    'Los horarios se calculan a partir de la posición del sol donde estás. Tu ubicación se usa en este dispositivo y nunca se envía a ningún sitio: no hay ningún servidor al que enviarla.',
  'times.locationOff':
    'La ubicación está desactivada, así que no se pueden calcular los horarios. Actívala en los ajustes de tu teléfono y vuelve.',
  'times.useLocation': 'Usar mi ubicación',
  'times.working': 'Calculando los horarios de hoy…',
  'times.clockSuspect':
    'El reloj de tu teléfono está ajustado muy lejos de donde pareces estar. Estos horarios siguen al reloj, así que revisa la fecha y la hora si algo parece mal.',
  'times.onThisPhone': 'calculados en este teléfono',
  'times.jumuah': 'Es viernes',
  'times.jumuah.detail':
    'Hoy Dhuhr es la oración del viernes — si la rezas en la mezquita con los demás. El sermón va primero, así que llega antes del llamado, no durante. Si hoy no puedes ir a una mezquita, rezas Dhuhr como siempre.',
  'times.followLocal': 'Si el horario de tu mezquita es distinto, sigue el de la mezquita.',
  'count.minutes': 'min',
  'count.steps': 'pasos',
  'count.sections': 'secciones',
  'count.phrases': 'frases',
  'count.duas': 'súplicas',
  'count.clips': 'fragmentos',
  'count.parts': 'partes que aprender',
  'count.items': 'elementos',
  'count.minutes.long': 'min de lectura',
  'count.articles': 'pilares',
  'count.pillars': 'pilares',
  'note.more': 'Saber más',
  'note.less': 'Mostrar menos',
  'note.positions': 'Lo que dicen las escuelas',
  'note.sources': 'De dónde viene',
  'attribution.the majority': 'La mayoría',
  'attribution.a minority': 'Una minoría',
  'attribution.contemporary scholarship': 'Los sabios contemporáneos',
  'settings.guidance': 'Guía de oración para',
  'settings.sources': 'Fuentes',
  'settings.sources.help': 'De dónde vienen todos los textos y las recitaciones',
  'sources.intro':
    'El Corán, los hadices y las recitaciones de esta aplicación los publican otras personas. Estas son.',
  'sources.quran': 'El Corán',
  'sources.quran.arabic': 'El árabe de cada sura para leer y memorizar',
  'sources.quran.translation': 'La traducción impresa debajo',
  'sources.texts': 'Citados en las lecciones',
  'sources.voices': 'Recitación',
  'sources.footnote':
    'Nada de esto está modificado. Cuando un editor pide ser nombrado, aquí es donde se le nombra.',
  'common.back': 'Atrás',
  'common.next': 'Siguiente',
  'common.finish': 'Terminar',
};

export const UI: Record<Locale, Overrides> = { en: EN, fr: FR, es: ES };

/** The string for a key, falling back to English whenever a locale lacks it. */
export function ui(locale: Locale, key: UIKey): string {
  return UI[locale][key] ?? EN[key];
}
