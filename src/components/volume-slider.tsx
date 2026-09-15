import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const MIN = 0.1;
const STEP = 0.05;
const HIT = 44;
const THUMB = 20;

const snap = (value: number) => Math.min(1, Math.max(MIN, Math.round(value / STEP) * STEP));

/**
 * How loud the adhan plays, from a tenth of the phone's media range to all
 * of it, in twentieths.
 *
 * Drawn here rather than taken from a library: a slider package is a native
 * module, and this one is a line, a lit length of lapis and a thumb, which the
 * responder props of a plain View can move on every platform, the web preview
 * included. The value follows the finger and is saved once, when the finger
 * lifts, so a drag does not rewrite the settings sixty times a second.
 */
export function VolumeSlider({
  value,
  onChange,
  onLive,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  /** Every step the finger crosses, before it lifts: for a preview that follows the bar. */
  onLive?: (next: number) => void;
  /** What it sets, for a screen reader. */
  label: string;
}) {
  const theme = useTheme();
  const track = useRef<View>(null);
  const [geometry, setGeometry] = useState({ left: 0, width: 1 });
  const [live, setLive] = useState<number | null>(null);

  const measure = () =>
    track.current?.measure((_x, _y, width, _height, pageX) => setGeometry({ left: pageX, width: Math.max(1, width) }));

  const at = (event: GestureResponderEvent) => snap((event.nativeEvent.pageX - geometry.left) / geometry.width);

  const follow = (event: GestureResponderEvent) => {
    const next = at(event);
    if (next !== live) onLive?.(next);
    setLive(next);
  };

  const percent = Math.round((live ?? value) * 100);

  return (
    <View style={styles.row}>
      <Ionicons name="volume-low-outline" size={18} color={theme.textSecondary} />
      <View
        ref={track}
        onLayout={measure}
        style={styles.hit}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={follow}
        onResponderMove={follow}
        onResponderRelease={(event) => {
          setLive(null);
          onChange(at(event));
        }}
        onResponderTerminate={() => {
          // Taken away mid-drag, nothing is saved, so whatever follows the bar goes back to the saved level.
          setLive(null);
          onLive?.(value);
        }}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min: 10, max: 100, now: percent, text: `${percent}%` }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(event) =>
          onChange(snap(value + (event.nativeEvent.actionName === 'increment' ? 0.1 : -0.1)))
        }>
        <View style={[styles.line, { backgroundColor: theme.border }]}>
          <View style={[styles.lit, { width: `${percent}%`, backgroundColor: theme.accent }]} />
        </View>
        <View
          pointerEvents="none"
          style={[styles.thumb, { left: `${percent}%`, backgroundColor: theme.accent, borderColor: theme.background }]}
        />
      </View>
      <Ionicons name="volume-high-outline" size={18} color={theme.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  hit: {
    flex: 1,
    height: HIT,
    justifyContent: 'center',
  },
  line: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  lit: {
    height: '100%',
  },
  thumb: {
    position: 'absolute',
    top: (HIT - THUMB) / 2,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: 2,
    transform: [{ translateX: -THUMB / 2 }],
  },
});
