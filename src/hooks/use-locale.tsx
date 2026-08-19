import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { isLocale, isRTL, resolveLocale, SOURCE_LOCALE, type Locale } from '@/i18n/locales';
import { ui, type UIKey } from '@/i18n/ui';

/**
 * The language the app is read in.
 *
 * Defaults to the phone's language rather than asking — someone who has just
 * become Muslim has enough to decide without being handed a language picker on
 * first launch. The setting exists for the case the guess is wrong, which is
 * common enough: people often run a phone in one language and read religious
 * material in another.
 */

const STORAGE_KEY = 'locale';

function deviceLocale(): Locale {
  try {
    return resolveLocale(getLocales()[0]?.languageTag);
  } catch {
    // Static web rendering has no device to ask.
    return SOURCE_LOCALE;
  }
}

type LocaleContext = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translated UI string, falling back to English. */
  t: (key: UIKey) => string;
  rtl: boolean;
  /** False until the stored choice has been read. */
  loaded: boolean;
};

const Context = createContext<LocaleContext | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(SOURCE_LOCALE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!active) return;
        setLocaleState(isLocale(stored) ? stored : deviceLocale());
      })
      .catch(() => {
        if (active) setLocaleState(deviceLocale());
      })
      .finally(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
      // A language that doesn't survive a restart still beats a crash.
    });
  }, []);

  const value = useMemo<LocaleContext>(
    () => ({
      locale,
      setLocale,
      t: (key: UIKey) => ui(locale, key),
      rtl: isRTL(locale),
      loaded,
    }),
    [locale, setLocale, loaded],
  );

  return <Context value={value}>{children}</Context>;
}

export function useLocale(): LocaleContext {
  const context = use(Context);
  if (!context) throw new Error('useLocale must be used inside a LocaleProvider');
  return context;
}
