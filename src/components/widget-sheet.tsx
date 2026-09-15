import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { requestWidgetPin, widgetPinSupported, type WidgetKind } from '../../modules/prayer-widget';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

const WIDGETS: { kind: WidgetKind; name: UIKey; about: UIKey }[] = [
  { kind: 'niche', name: 'widget.name.niche', about: 'widget.sheet.niche' },
  { kind: 'row', name: 'widget.name.row', about: 'widget.sheet.row' },
  { kind: 'quiet', name: 'widget.name.quiet', about: 'widget.sheet.quiet' },
];

/**
 * The day page's door to the widgets: the three of them, and how to place one
 * (`docs/widgets.md`). A door rather than a settings page, because there is
 * nothing to set.
 *
 * Android can ask the phone to place a widget, so each row has Add. iPhone
 * gives apps no way to, and some Android launchers refuse, so there the sheet
 * says how in the phone's own words. The wake-up sheet's grammar: from the
 * bottom, over a scrim that closes it.
 */
export function WidgetSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const theme = useTheme();
  const { t } = useLocale();
  const canPlace = widgetPinSupported();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.scrim }]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('common.back')}
        />
        <View style={[styles.sheet, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <View style={[styles.grabber, { backgroundColor: theme.border }]} />
          <ThemedText type="caption" themeColor="gold" style={styles.title}>
            {t('widget.door')}
          </ThemedText>

          {/* One group with no gap: each row's rule meets the next row, the flush-join rule. */}
          <View>
            {WIDGETS.map(({ kind, name, about }) => (
              <View key={kind} style={[styles.row, { borderBottomColor: theme.goldSoft }]}>
                <View style={styles.rowText}>
                  <ThemedText type="smallBold">{t(name)}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {t(about)}
                  </ThemedText>
                </View>
                {canPlace && (
                  <Pressable
                    onPress={() => {
                      if (requestWidgetPin(kind)) onClose();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`${t('widget.sheet.add')}, ${t(name)}`}
                    style={({ pressed }) => [
                      styles.add,
                      { backgroundColor: theme.action, borderColor: theme.actionRule, opacity: pressed ? 0.85 : 1 },
                    ]}>
                    <ThemedText type="smallBold" themeColor="onAction">
                      {t('widget.sheet.add')}
                    </ThemedText>
                  </Pressable>
                )}
              </View>
            ))}
          </View>

          {!canPlace && (
            <ThemedText type="small" themeColor="textSecondary">
              {Platform.OS === 'ios' ? t('widget.sheet.steps.ios') : t('widget.sheet.steps.android')}
            </ThemedText>
          )}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    flex: 1,
    gap: Spacing.half,
  },
  /* Jadwal's `Action`, as a button rather than a link, sized to its word. */
  add: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.rule,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
