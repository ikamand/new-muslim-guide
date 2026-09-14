import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { WakeTime } from '@/lib/reminders';

/** What every platform's wake-up time picker takes. */
export type WakeTimePickerProps = {
  visible: boolean;
  title: string;
  /** Where the picker opens: the time the alarm is at now. */
  initial: Date;
  onConfirm: (time: WakeTime) => void;
  onClose: () => void;
};

/**
 * The sheet a wake-up time is set in, on iOS and the web. Android opens its
 * own clock dialog instead (`wake-time-picker.android.tsx`), because that dial
 * is the alarm clock its owner already knows.
 *
 * The evidence sheet's grammar (`source-list.tsx`): a detour that returns you,
 * from the bottom, over a scrim that closes it.
 */
export function WakeTimeSheet({
  visible,
  title,
  onClose,
  onDone,
  children,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  onDone: () => void;
  children: ReactNode;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.scrim }]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('wake.picker.cancel')}
        />
        <View style={[styles.sheet, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <View style={[styles.grabber, { backgroundColor: theme.border }]} />
          <ThemedText type="caption" themeColor="gold" style={styles.title}>
            {title}
          </ThemedText>
          <View style={styles.picker}>{children}</View>
          <Pressable
            onPress={onDone}
            accessibilityRole="button"
            accessibilityLabel={t('wake.picker.done')}
            style={({ pressed }) => [
              styles.done,
              { backgroundColor: theme.action, borderColor: theme.actionRule, opacity: pressed ? 0.85 : 1 },
            ]}>
            <ThemedText type="smallBold" themeColor="onAction">
              {t('wake.picker.done')}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Radius.medium,
    borderTopRightRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingTop: Spacing.two,
  },
  picker: {
    alignItems: 'center',
  },
  /* Jadwal's `Action`, as a button rather than a link. */
  done: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.rule,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
