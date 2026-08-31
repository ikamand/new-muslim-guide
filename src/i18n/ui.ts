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
  'kind.collection': 'Collection',

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
  /*
    The Ramadan arc — the season broken into moments. Kickers for
    `src/content/ramadan-arc.ts`; the zakat row reuses `today.zakat`.
  */
  'arc.before': 'Ramadan is close',
  'arc.early': 'Ramadan — the first days',
  'arc.tarawih': 'Tonight, at the mosque',
  'arc.eid': 'Eid is close',
  /*
    The fast line on Today, month 9 and late Shaʿban only. Times, never day
    numbers — the sighting humility in `seasons.ts` applies to every word.
  */
  'fast.suhoor': 'Suhoor ends at Fajr — {time}',
  'fast.iftar': 'Iftar at Maghrib — {time}',
  'ramadan.wake': 'Wake me for suhoor, about 45 minutes before Fajr',
  'ramadan.wake.help':
    'Ramadan is close. The app can wake you before Fajr for suhoor — change it any time, here or in Settings.',
  'suhoor.notification.title': 'Suhoor',
  'suhoor.notification.body': 'Fajr is at {time}. Time to eat something.',
  'adhkar.notification.title': 'Morning adhkār',
  'adhkar.notification.body': 'The window is open until sunrise.',
  'jumuah.notification.title': 'Jumuʿah tomorrow',
  'jumuah.notification.body':
    'The Friday prayer replaces Ḏuhr, prayed in congregation around midday.',
  /*
    Why the one card on Today is there, in a few words.

    Each is a reason, not a category: "It is Friday" and "You seem to be away
    from home" tell a reader why the app is showing them this now. A card that
    silently swaps its contents reads as random; the same card with a reason
    on it reads as the app paying attention — and if the reason is wrong, it is
    visibly wrong rather than quietly wrong.
  */
  /*
    The firsts. Each is a thing that happens once in a life, named plainly.

    No numbers anywhere in this block, and none may be added: the ledger shows
    what HAS happened and never what is left, so there is nothing here for a
    count to attach itself to.
  */
  /*
    The two onboarding questions. Facts, not identities — see `lib/onboarding.ts`.

    Each answer is written the way somebody would say it to a friend, because
    the alternative is asking a person in their first thirty seconds to pick
    which category of convert they are.
  */
  'onboarding.said.title': 'Have you said the shahada?',
  'onboarding.said.not-yet': 'Not yet',
  'onboarding.said.not-yet.help': 'That is completely fine. Nothing here assumes you have.',
  'onboarding.said.exploring': 'I am still finding out',
  'onboarding.said.exploring.help': 'Read anything you like. Nobody is counting.',
  'onboarding.said.recently': 'Yes, recently',
  'onboarding.said.a-while': 'Yes, a while ago',
  'onboarding.prays.title': 'Can you pray on your own yet?',
  'onboarding.prays.teach-me': 'No — teach me',
  'onboarding.prays.teach-me.help': 'Every step, with the words written out.',
  'onboarding.prays.need-words': 'I need the words in front of me',
  'onboarding.prays.need-words.help': 'You know the shape of it and want the text there.',
  'onboarding.prays.on-my-own': 'Yes',
  'onboarding.prays.on-my-own.help': 'The time and the direction, and out of your way.',
  /*
    Zakat. Every string here is written to describe a WORKING-OUT rather than
    a ruling — see `lib/zakat.ts`. Nothing in this block says "you owe".
  */
  /*
    Review. Every string here is about a SURAH, never about the reader — see
    `lib/review.ts`. There is no count, no "due", and nothing that could be
    read as the app noticing you had been away.
  */
  'quran.review.kicker': 'Worth reciting again',
  'quran.review.stale': 'It has been a while since you recited this one.',
  'quran.review.never': 'You have marked this one, but not recited it here yet.',
  'zakat.title': 'Working out zakat',
  'zakat.intro': 'Zakat is 2.5% of the wealth you have held for a lunar year, once it passes a threshold. This works out the sum for the three things nobody disputes. It is not a ruling on what you owe.',
  'zakat.currency': 'Currency',
  'zakat.cash': 'Cash — in hand, in accounts, saved',
  'zakat.gold': 'Gold you hold, in grams',
  'zakat.silver': 'Silver you hold, in grams',
  'zakat.total': 'That comes to',
  'zakat.rate': '2.5% of it is',
  'zakat.thresholds': 'The thresholds',
  'zakat.reached': 'your total is above this',
  'zakat.below': 'your total is below this',
  'zakat.whole': 'Above a threshold, zakat is due on the whole amount — not only the part above the line.',
  'zakat.silverFirst': 'Silver is listed first because it is the lower threshold, so more people give and more reaches those entitled to it. That is a position, and some follow the gold threshold instead.',
  'zakat.priced': 'Gold and silver priced {date} · {source}',
  'zakat.stale': 'This price ships with the app and does not update on its own. Check it against a dealer before acting on a close call.',
  'zakat.hawl': 'Zakat falls due when a lunar year has passed on wealth that stayed above the threshold — on your own date, whichever month that is. Many people pay during Ramadan by choice, for the extra reward, and that is not the same as it being due then.',
  'zakat.notCounted': 'What this has not counted',
  'zakat.notCounted.body': 'Debts you owe · money owed to you · business stock · shares and pensions · crypto · property beyond your home · jewellery you wear. Each of these is answered differently by different scholars, and some are modern questions with no settled answer. If any is a large part of your wealth, this sum is not your zakat and you need a person.',
  'zakat.noCurrency': 'This app does not carry a price in that currency. Rather than convert through a rate it does not have, it stops.',
  'zakat.open': 'Cash, gold and silver — and what it does not count',
  'zakat.currencies': 'currencies',
  'firsts.title': 'Your firsts',
  'firsts.intro': 'Things that happen once. Nothing here is a target, and nothing counts down — this is a record of what has already happened, in the order it did.',
  'firsts.none': 'Nothing yet. The app marks some of these itself when it sees them.',
  'firsts.notYet': 'Not yet',
  'firsts.mark': 'This has happened',
  /*
    The private line. An offer in the quiet colour, never a prompt — an
    entry without one is complete. Stored on the device with everything
    else, shown only on the ledger, read by nothing.
  */
  'firsts.note.add': 'Add a line about it, if you want one',
  'firsts.note.placeholder': 'How it was',
  'firsts.note.keep': 'Keep',
  /* No arrow in the string — the row draws its own, and it drew both. */
  'firsts.open': 'Your firsts',
  'firsts.ask': 'Was that your first?',
  'firsts.askNo': 'Not yet',
  'first.prayer-alone': 'Prayed on your own',
  'first.wudu-alone': 'Made wudu on your own',
  'first.adhkar': 'Sat with the morning adhkār',
  'first.surah-memorised': 'Held a surah from memory',
  'first.jumuah': 'Prayed your first Jumuʿah',
  'first.mosque': 'Walked into a mosque',
  'first.full-day': 'Prayed all five in one day',
  'first.fast': 'Fasted a day',
  'first.ramadan': 'Been through a Ramadan',
  'first.eid': 'Been to an Eid',
  'first.prayed-in-public': 'Prayed somewhere public',
  'first.explained-islam': 'Explained Islam to someone who asked',
  'first.janazah': 'Been to a janāzah',
  'first.zakat': 'Given zakat',
  'learn.where.kicker': 'Where you are',
  'learn.where.left': 'Left in this chapter',
  'learn.where.done': 'You have been through the whole path.',
  'learn.shahada.line': 'The shahada · read the words again',
  'today.firstAsk': 'It is Friday tomorrow',
  'today.zakat': 'It is Ramadan',
  'today.zakat.why': 'Many people work theirs out this month. It is not due now — it is due when a year has passed on your own wealth.',
  'today.away': 'You seem to be away from home',
  'today.lastThird': 'The last third of the night',
  'today.continue': 'Carry on where you were',
  'today.reading': 'You were reading',

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
  /* Three states nobody had translated, found by `npm run nav:check`. */
  'settings.footnote': 'The Arabic always stays — it is what you actually say. Everything on this device stays on this device.',
  'guide.missing': 'That guide doesn’t exist.',
  'reference.missing': 'That page has moved.',


  /*
    The qibla screen. Every sentence on it used to be an English literal in the
    component, which is why a French reader got an English page with nothing
    saying so.

    `qibla.unverified` is the one that matters. The bearing is exact arithmetic
    and the screen said so with total confidence, from coordinates that could be
    a week old and a country away — the prayer times refuse to draw in that
    state and the qibla drew anyway.
  */
  'qibla.bearing': '{deg}° from north',
  'qibla.where': 'The Kaʿbah is {point} of you. If the arrow is jumping about, face that way using anything you trust — a map, the sun, a neighbour.',
  'qibla.needLocation': 'The qibla is worked out from where you are, so it needs your location. It is used on this device and never sent anywhere.',
  'qibla.locating': 'Finding your location…',
  'qibla.noCompass': 'This phone isn’t reporting a compass heading, so the arrow is pointing at the raw bearing rather than at the Kaʿbah. Use the number above.',
  'qibla.unsure': 'The compass isn’t confident right now. Move away from anything metal or electrical and turn the phone in a figure of eight to settle it.',
  'qibla.unverified.title': 'This is worked out from an older position',
  'qibla.unverified.body': 'The app last knew where you were {when}, and cannot check now. If you have travelled since, this direction is wrong. Turn location back on, or find the qibla another way.',
  'qibla.unverified.fix': 'Use my location',
  'qibla.when.today': 'earlier today',
  'qibla.when.yesterday': 'yesterday',
  'qibla.when.days': '{n} days ago',
  'qibla.when.unknown': 'at some point',
  'qibla.point.north': 'north',
  'qibla.point.north-east': 'north-east',
  'qibla.point.east': 'east',
  'qibla.point.south-east': 'south-east',
  'qibla.point.south': 'south',
  'qibla.point.south-west': 'south-west',
  'qibla.point.west': 'west',
  'qibla.point.north-west': 'north-west',

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

  /*
    The windows sheet, opened by tapping the Awqat arch on Today.

    ⚠️ REVIEW REQUIRED — these are rulings, not chrome, and they follow the
    precedent `times.endsAtSunrise` set for a ruling that must live beside
    the times it describes. Fajr→sunrise and Dhuhr→ʿAsr are settled;
    ʿAsr→Maghrib is taught as the one clear way, leaving the preferred-time
    detail to a lesson; ʿIshāʾ ends at the middle of the night in the fiqh
    sense (halfway from sunset to Fajr), which is the preferred position —
    schools differ on the permissible end, and a qualified reviewer decides
    whether that sentence needs saying here.
  */
  'windows.open': 'When each prayer can be prayed',
  'windows.close': 'Close',
  'windows.title': 'The five windows',
  'windows.intro':
    'Each prayer has a span, not a moment. Anywhere inside its window counts.',
  'windows.fajr': 'until sunrise',
  'windows.dhuhr': 'until ʿAsr begins',
  'windows.asr': 'until Maghrib',
  'windows.maghrib': 'until ʿIshāʾ begins',
  'windows.isha': 'until the middle of the night',
  'windows.note':
    'Praying early in the window is better. If one closes before you have prayed, see “I missed a prayer” under help.',

  /*
    The monthly jadwal.

    Weekday column heads are the prayers' own names shortened to fit five
    across a phone; `awqat.projected` is the one sentence of honesty the
    whole table needs, and it is deliberately consistent with
    `learn/voluntary-fasting.ts`, which promises the app will not date
    ʿĀshūrāʾ or ʿArafah.
  */
  'awqat.title': 'Awqat',
  'awqat.previous': 'Previous month',
  'awqat.next': 'Next month',
  'awqat.col.fajr': 'Fajr',
  'awqat.col.dhuhr': 'Dhuhr',
  'awqat.col.asr': 'ʿAsr',
  'awqat.col.maghrib': 'Maghrib',
  'awqat.col.isha': 'ʿIshāʾ',
  'awqat.col.hijri': 'Hijri',
  'awqat.whiteDays': 'The white days',
  'awqat.whiteDays.detail': 'Three sunnah fasting days mid-month',
  'awqat.projected':
    'The Hijri column follows the Umm al-Qura projection. The sacred dates — Ramadan, the Eids, ʿĀshūrāʾ, ʿArafah — are settled by the moon being sighted, so they are not printed here. Your mosque will know them in the week beforehand.',

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
  /* Counted rather than bare — "32" alone in a column beside "132 occasions"
     says nothing about what it counts. */
  'count.items.long': '{n} to read',
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
  'adhkar.window.morning': 'Morning adhkar',
  'adhkar.window.evening': 'Evening adhkar',
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
  'collection.missing': 'That collection is not in the app.',

  /*
    The memorisation tab.

    "Progress" is stated as a count and never as a percentage. "6 of 37" is a
    fact; "16%" is a verdict, and nobody three weeks into a religion needs a
    phone grading them on it.
  */
  'quran.title': 'Learn by heart',
  'quran.intro': 'Al-Fatihah, then the short surahs at the end of the Qur’an, in the order people usually learn them. Start at the top. Al-Fatihah is in every prayer, so it is the one to have first.',
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

  /*
    Recite with me. The explain line is a promise the code keeps —
    `lib/recite-session.ts` cannot write audio and never sends any.
  */
  'recite.title': 'Recite with me',
  'recite.explain':
    'Recite out loud and the words light up as you are heard. The listening happens entirely on this phone — nothing you say is recorded, saved, or sent anywhere.',
  'recite.download': 'Get the listening models ({mb} MB, once)',
  'recite.downloading.recognition': 'Fetching the recognition model — best on wifi…',
  'recite.start': 'Start listening',
  'recite.starting': 'Getting ready…',
  'recite.stop': 'Stop',
  'recite.ayahOf': 'Ayah {a} of {total}',
  'recite.permission':
    'The microphone is off for this app, and recitation can only be followed if it can be heard. You can allow it in your phone’s settings.',
  'recite.listening': '● Listening — recite at your own pace',
  'recite.listeningHint':
    'Recite out loud — each word lights up as it is heard.',
  'recite.error': 'Listening stopped. Try again.',
  'recite.complete': 'You recited it all the way through.',
  'settings.storage.recite': 'Recite with me — the listening models',


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
  /* The aloud/silent column — a fact `buildPrayer` already encodes per
     prayer, said in words because a comparison column teaches it best. */
  'pray.aloud': 'Qur’an aloud',
  'pray.silent': 'Qur’an silently',
  'pray.aloudTwo': 'first two rakʿahs aloud',
  'pray.week': 'The week and the year',
  'pray.different': 'When it’s different',
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
  'settings.times': 'Prayer times',
  'settings.times.open': 'Method, ʿAsr, and your mosque',
  'settings.method': 'Calculation method',
  'settings.method.suggested': 'Suggested for your location',
  /*
    ⚠️ REVIEW — the ʿAsr wordings state a fiqh difference in one plain
    sentence each; the shadow-length framing is the standard way both schools
    describe their own position.
  */
  'settings.asr': 'ʿAsr time',
  'settings.asr.help':
    'The schools differ on when ʿAsr begins: when a shadow equals its object, or twice it. Your mosque’s timetable follows one — match it.',
  'settings.asr.standard': 'Standard — shadow equals its object',
  'settings.asr.hanafi': 'Later — twice its object (Hanafi)',
  /*
    Match your mosque. `mosque.iqamah` is the two-column trap named at the
    moment it matters; `mosque.drift` is the season caveat — a fit that is
    right today can drift if the method is wrong, and honesty beats
    certainty.
  */
  'mosque.title': 'Match your mosque',
  'mosque.intro': 'Copy today’s times from your mosque’s board or website, and the app works out the rest.',
  'mosque.iqamah':
    'Boards often print two columns. Enter the first — the adhan, when the prayer comes in. The second, iqamah, is when the congregation stands, usually 10–30 minutes later.',
  'mosque.matched': 'Matched',
  'mosque.hanafi': 'Hanafi ʿAsr',
  'mosque.use': 'Use these times',
  'mosque.incomplete': 'Enter all five times from the board and the match appears here.',
  'mosque.noMatch':
    'These times don’t line up with any calculation the app knows. The usual reason is the iqamah column — check the board for an adhan column and try those times instead.',
  'mosque.drift':
    'A match made today can drift with the seasons if the mosque follows something unusual. If the app and the board disagree next month, match again — it takes a minute.',
  'mosque.active': 'Matched to your mosque',
  'mosque.clear': 'Back to this phone’s own times',
  'settings.reminders': 'Prayer reminders',
  'settings.reminders.help':
    'A quiet notification before each prayer. Nothing is sent anywhere. Your phone works the times out and sets its own alarms.',
  'settings.reminders.lead': 'How far ahead',
  'settings.reminders.atTime': 'At the time',
  'settings.reminders.minutesBefore': '{n} minutes before',
  'settings.reminders.denied':
    'Notifications are turned off for this app. Turn them on in your phone’s settings, then come back.',
  /*
    The windows. Each is an offer at a moment opening — none of them can
    express an absence, because none of them knows one.
  */
  'settings.suhoor': 'During Ramadan: wake me before Fajr for suhoor',
  'settings.adhkarNote': 'Morning adhkār — a note when the window opens',
  'settings.jumuahNote': 'Jumuʿah — a note on Thursday evening',
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
  /*
    Not "Welcome to Islam" under a title that already says Welcome — and the
    greeting is the better first sentence anyway: it is the first thing anyone
    will actually say to them, taught by being said.
  */
  'onboarding.welcome.body1': 'Assalamu alaikum — peace be upon you.',
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

  /*
    The progress screen — where somebody corrects the app's picture of them.
    The two questions reuse the onboarding strings above, so the wording
    cannot drift between the first asking and every asking after it.
  */
  'learn.progress': 'What you already know',
  'progress.intro':
    'Tell the app what you can already do. It stays on this phone, and nothing is ever locked either way.',
  'progress.units': 'The path, unit by unit',
  'progress.units.help':
    'Tick off whole units you already know. Each one opens for lesson-by-lesson marks.',
  'progress.markUnit': 'Mark every lesson in this unit as done',
  'progress.unmarkUnit': 'Mark every lesson in this unit as not done',

  /*
    The end of a lesson. This block held four more strings — "Done — next",
    "Mark as read", "Read", "Mark as not read" — until 29 Aug, when marking
    moved from a tap to the scroll itself (see `lesson-scroll.tsx`) and the
    end of a lesson became one button: the next one.
  */
  'lesson.next': 'Next',

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
  /*
    Not "Start" any more: since the stages sort by the reader's priorities,
    this one can sit third, and a stage called Start in the middle of the row
    is a contradiction drawn on screen. "Basics" is true in any position.
    ("Foundations" was considered and does not fit under a 30px arch.)
  */
  'journey.short.start-here': 'Basics',
  'journey.short.first-days': 'First days',
  'journey.short.learning-to-pray': 'Prayer',
  'journey.short.living': 'Living',
  'journey.short.deepening': 'Deeper',
  'journey.short.through-the-year': 'The year',
  'journey.stage.start-here': 'The basics',
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

  /**
   * The curriculum — tiers and units (docs/learn-redesign-plan.md).
   *
   * A tier is named for a time of life, never a rank: "Beginner" grades the
   * person, and a convert's jagged knowledge means the grade would be wrong
   * as often as right. Each name carries a one-line purpose underneath, which
   * is how a tier says what it offers without saying what you are.
   */
  'curriculum.tier.first-weeks': 'Your first weeks',
  'curriculum.tier.first-weeks.purpose': 'Until you can pray on your own.',
  'curriculum.tier.life-follows': 'The life that follows',
  'curriculum.tier.life-follows.purpose': 'For the questions life brings.',
  'curriculum.tier.deeper': 'Going deeper',
  'curriculum.tier.deeper.purpose': 'Depth in what you already do.',

  /* "Becoming Muslim" collided with the shahada guide's title — the unit and
     its first lesson shared a name, visible three times at once on the tab
     when the shahada was unsaid. Renamed by Iyad, 31 Aug. */
  'curriculum.unit.becoming-muslim': 'Where you begin',
  'curriculum.unit.becoming-muslim.purpose': 'What you said, and what you joined.',
  'curriculum.unit.who-you-follow': 'Who you follow',
  'curriculum.unit.who-you-follow.purpose':
    'Allah, His Messenger, and where the religion comes from.',
  'curriculum.unit.how-to-pray': 'How to pray',
  'curriculum.unit.how-to-pray.purpose':
    'One rakʿah, learned once — every prayer is built from it.',
  'curriculum.unit.when-it-goes-wrong': 'When it goes wrong',
  'curriculum.unit.when-it-goes-wrong.purpose':
    'Losing count, breaking wudu, missing a prayer — all recoverable.',
  'curriculum.unit.praying-with-others': 'Praying with others',
  'curriculum.unit.praying-with-others.purpose':
    'The call, the mosque, the imam, and Friday.',
  'curriculum.unit.everyday-words': 'Everyday words',
  'curriculum.unit.everyday-words.purpose':
    'What people say to you, and what you say back.',
  'curriculum.unit.eating-wearing-earning': 'Eating, wearing, earning',
  'curriculum.unit.eating-wearing-earning.purpose':
    'Halal and haram where you actually meet them.',
  'curriculum.unit.people': 'People',
  'curriculum.unit.people.purpose':
    'Family, manners, marriage — and the day someone dies.',
  'curriculum.unit.meeting-muslims': 'Meeting other Muslims',
  'curriculum.unit.meeting-muslims.purpose':
    'Why confident people tell you opposite things.',
  'curriculum.unit.the-year': 'The year',
  'curriculum.unit.the-year.purpose':
    'Ramadan, the Eids, zakat, and the calendar they follow.',
  'curriculum.unit.when-its-hard': 'When it’s hard',
  'curriculum.unit.when-its-hard.purpose': 'Coming back is part of the path.',
  'curriculum.unit.prayers-you-choose': 'Prayers you choose',
  'curriculum.unit.prayers-you-choose.purpose':
    'The night prayers, and the ones for a moment.',
  'curriculum.unit.interior-life': 'The interior life',
  'curriculum.unit.interior-life.purpose':
    'Anger, envy, showing off, arrogance — and their cures.',
  'curriculum.unit.practices': 'Practices to take on',
  'curriculum.unit.practices.purpose':
    'Small sunnahs that become yours over the years.',

  /* One word per unit, for the arch strip — a 30px arch fits nothing longer. */
  'curriculum.short.becoming-muslim': 'Begin',
  'curriculum.short.who-you-follow': 'Belief',
  'curriculum.short.how-to-pray': 'Prayer',
  'curriculum.short.when-it-goes-wrong': 'Mistakes',
  'curriculum.short.praying-with-others': 'Together',
  'curriculum.short.everyday-words': 'Words',
  'curriculum.short.eating-wearing-earning': 'Halal',
  'curriculum.short.people': 'People',
  'curriculum.short.meeting-muslims': 'Muslims',
  'curriculum.short.the-year': 'The year',
  'curriculum.short.when-its-hard': 'Hard days',
  'curriculum.short.prayers-you-choose': 'Chosen',
  'curriculum.short.interior-life': 'The heart',
  'curriculum.short.practices': 'Practices',

  'learn.browse': 'Browse by situation',
  'learn.browse.subtitle': 'The same pages, grouped by the moment they answer',
  'library.title': 'By situation',
  'library.intro':
    'The same pages as the path, grouped by the moment they answer — for when life produces the question.',
  'learn.everyPrayer.title': 'Every prayer',
  'learn.everyPrayer.subtitle': 'All of them side by side — rakʿahs, sunnah, and when',
  'count.lessons': 'lessons',

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

/**
 * What a translated language supplies: any subset of the English keys.
 *
 * Nothing implements this today — see the note in `locales.ts` on why French
 * and Spanish were removed. Kept because it is the shape a new locale plugs
 * into, and because `ui()` below still resolves through it, so adding one back
 * is a table and a line in `LOCALES` rather than a rewrite.
 */
type Overrides = Partial<Record<UIKey, string>>;

export const UI: Record<Locale, Overrides> = { en: EN };

/** The string for a key, falling back to English whenever a locale lacks it. */
export function ui(locale: Locale, key: UIKey): string {
  return UI[locale][key] ?? EN[key];
}
