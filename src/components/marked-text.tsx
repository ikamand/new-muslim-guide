import { Text, type TextStyle } from 'react-native';

/**
 * Text with the words the book had in square brackets picked out.
 *
 * Hisn al-Muslim brackets a wording that some narrations of a hadith carry and
 * the base one does not — `[بِسْمِ اللَّهِ]` opening the duʿa for the bathroom,
 * `[ثلاثاً]` after a dhikr. Those brackets are stripped from the text on
 * Iyad's instruction, and a colour takes over the job they were
 * doing: without it the app would fold an optional addition silently into the
 * duʿa, which is a change to what the text says rather than to how it looks.
 *
 * The colour is gold, since 5 Sep 2026. It was lapis — the app's one pressable
 * colour — and bold lapis in the middle of an English sentence read as a link
 * that did nothing. Gold is illumination and never a control, and a wording
 * some narrations carry is closer to a rubric than to a door.
 *
 * ⚠️ A bare `Text`, never a `ThemedText`, for the marked run. React Native
 * nests text styles, but `ThemedText` always applies a `type`, defaulting to a
 * Latin rung — so nesting one inside an Arabic line reset the marked words to
 * 17px Latin metrics and rendered them a third of the size of the duʿa around
 * them. Only colour and weight belong here; the rest must be inherited.
 *
 * ⚠️ Arabic is coloured but not bolded. `_layout.tsx` loads Amiri-Regular
 * alone, so `fontWeight` would synthesise a faux-bold, which on a naskh whose
 * vowel marks stack above and below the line smears rather than strengthens.
 * Real bold needs Amiri-Bold.ttf added as an asset. Latin bolds properly, so
 * callers pass `bold` for the translation and not for the Arabic.
 */
export function MarkedText({
  text,
  spans,
  colour,
  bold,
}: {
  text: string;
  spans?: readonly string[];
  colour: string;
  bold?: boolean;
}) {
  if (!spans || spans.length === 0) return <>{text}</>;

  /*
    Longest span first, so one span sitting inside another is matched whole
    rather than being cut in half by the shorter one.
  */
  const ordered = [...spans].sort((a, b) => b.length - a.length);
  let parts: { text: string; marked: boolean }[] = [{ text, marked: false }];

  for (const span of ordered) {
    const next: typeof parts = [];
    for (const part of parts) {
      if (part.marked || !part.text.includes(span)) {
        next.push(part);
        continue;
      }
      const pieces = part.text.split(span);
      pieces.forEach((piece, index) => {
        if (piece) next.push({ text: piece, marked: false });
        if (index < pieces.length - 1) next.push({ text: span, marked: true });
      });
    }
    parts = next;
  }

  const markedStyle: TextStyle = bold ? { color: colour, fontWeight: '700' } : { color: colour };

  return (
    <>
      {parts.map((part, index) =>
        part.marked ? (
          <Text key={index} style={markedStyle}>
            {part.text}
          </Text>
        ) : (
          part.text
        ),
      )}
    </>
  );
}
