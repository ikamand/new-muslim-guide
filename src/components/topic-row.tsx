import Ionicons from '@expo/vector-icons/Ionicons';
import { type Href } from 'expo-router';

import { JadwalRow, Rosette } from '@/components/jadwal';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * One catalogue entry as a ruled row — rosette numeral in the margin, title,
 * a meta line, and the reading bookmark along the foot.
 *
 * Extracted from the Learn tab (where it was `LearnCard`) when the by-moment
 * shelves moved to the library screen: the reference shelf and the library
 * render the identical row, and two hand-kept copies is how nine files once
 * ended up with nine font sizes.
 */
export function TopicRow({
  href,
  title,
  subtitle,
  count,
  unit,
  index,
  progress,
}: {
  href: Href;
  title: string;
  subtitle: string;
  count: number;
  unit: UIKey;
  /** Its place within its shelf, drawn as a rosette in the margin. */
  index: number;
  /** How far through this the reader got before leaving, 0..1. */
  progress?: number;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <JadwalRow
      href={href}
      accessibilityLabel={`${title}. ${subtitle}. ${count} ${t(unit)}`}
      marginal={<Rosette label={String(index)} />}
      title={title}
      meta={`${subtitle} · ${count} ${t(unit)}`}
      progress={progress}
      trailing={<Ionicons name="chevron-forward" size={14} color={theme.gold} />}
    />
  );
}

/** One row's worth of facts, before it is laid out. */
export type TopicSpec = {
  key: string;
  href: Href;
  title: string;
  subtitle: string;
  count: number;
  unit: UIKey;
  progress?: number;
};
