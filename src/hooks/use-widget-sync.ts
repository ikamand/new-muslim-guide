import { useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';

import { setWidgetSchedule } from '../../modules/prayer-widget';
import { Colors } from '@/constants/theme';
import { useAwqatProfile } from '@/hooks/use-awqat-profile';
import { usePrayerConfidence } from '@/hooks/use-competence';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { useSettings } from '@/hooks/use-settings';
import { buildWidgetPayload, emptyWidgetPayload, type WidgetPalette } from '@/lib/widget-schedule';

const palette = (scheme: 'light' | 'dark'): WidgetPalette => {
  const colors = Colors[scheme];
  return {
    ground: colors.background,
    text: colors.text,
    textSecondary: colors.textSecondary,
    gold: colors.gold,
    goldSoft: colors.goldSoft,
    selected: colors.backgroundSelected,
    accent: colors.accent,
  };
};

/**
 * Keeps the widgets' twelve days current (`docs/widgets.md`).
 *
 * Mounted beside `useReminderSync` and run on the same things: the place, the
 * profile through `useAwqatProfile` (the one place that decides whose times
 * these are), the language, and every return to the foreground, which is what
 * rolls the twelve days on. Also on confidence, because it decides where a tap
 * on a widget goes. The schedule is built after the frame that mounted this,
 * so the first screen draws before the arithmetic.
 */
export function useWidgetSync(): void {
  const { coords } = useLocation();
  const { loaded, awqatMethod, awqatHanafiAsr, awqatMosque } = useSettings();
  const profileFor = useAwqatProfile();
  const { locale, t } = useLocale();
  const fluent = usePrayerConfidence() === 'on-my-own';
  const lastKey = useRef('');

  useEffect(() => {
    if (Platform.OS === 'web' || !loaded) return;
    let active = true;
    const colors = { light: palette('light'), dark: palette('dark') };

    const run = (force: boolean) => {
      const key = JSON.stringify({
        place: coords ? [coords.latitude, coords.longitude] : null,
        awqatMethod,
        awqatHanafiAsr,
        awqatMosque,
        locale,
        fluent,
      });
      if (!force && key === lastKey.current) return;
      lastKey.current = key;
      setTimeout(() => {
        if (!active) return;
        const payload = coords
          ? buildWidgetPayload({ coords, profile: profileFor(coords), now: new Date(), fluent, t, colors })
          : emptyWidgetPayload(t, colors);
        setWidgetSchedule(JSON.stringify(payload));
      }, 0);
    };

    run(false);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') run(true);
    });
    return () => {
      active = false;
      subscription.remove();
    };
  }, [loaded, coords, awqatMethod, awqatHanafiAsr, awqatMosque, locale, fluent, profileFor, t]);
}
