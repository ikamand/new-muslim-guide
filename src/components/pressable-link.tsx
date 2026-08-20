import { Link, type Href } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

/**
 * A link you can put a card inside.
 *
 * ## Why this exists
 *
 * `<Link asChild>` silently destroys a `style` **function**. expo-router clones
 * the child through `@radix-ui/react-slot`, whose `mergeProps` handles style
 * with an object spread:
 *
 * ```js
 * overrideProps.style = { ...slotPropValue, ...childPropValue };
 * ```
 *
 * Spreading a function gives `{}`. So the ordinary React Native idiom —
 * `style={({ pressed }) => [styles.card, { opacity: pressed ? 0.6 : 1 }]}` —
 * arrives at `Pressable` as an empty object, and every rule on the card is
 * dropped: background, border, radius, padding, `flex: 1`. On the web the
 * result is an unstyled `<a>` that collapses to a line of bare text; the same
 * merge runs on iOS and Android, because `BaseExpoRouterLink` has no platform
 * branch around `asChild ? Slot : Text`.
 *
 * An array style is no better — it spreads to `{0: …, 1: …}`, and expo-router's
 * own shim throws on it in development.
 *
 * ## The fix
 *
 * Hand `Pressable` a single flattened object and track the press here. Every
 * link that wraps more than a word goes through this component, so the trap is
 * in one place instead of at thirteen call sites — and a new screen cannot
 * reintroduce it by writing the idiom that looks correct everywhere else.
 */
export type PressableLinkProps = {
  href: Href;
  children: ReactNode;
  /** Applied always. Flattened before it reaches `Pressable`. */
  style?: StyleProp<ViewStyle>;
  /** Merged over `style` while the element is held down. */
  pressedStyle?: StyleProp<ViewStyle>;
  /**
   * The whole announcement, composed by the caller — title and description in
   * one string.
   *
   * There is deliberately no `accessibilityHint`. react-native-web has nothing
   * to map it to, and an `aria-label` on the anchor *replaces* its text content
   * for a screen reader — so a row labelled with its title alone and described
   * by a hint announces the title and silently drops the description that is
   * sitting there on screen. This is the same class of bug as `ChoiceCard`'s
   * missing `aria-checked`: a native-only prop that reads as fine until you
   * look at the rendered attributes.
   */
  accessibilityLabel?: string;
};

export function PressableLink({
  href,
  children,
  style,
  pressedStyle,
  accessibilityLabel,
}: PressableLinkProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={accessibilityLabel}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        // A plain object, never a function and never an array. See above.
        style={StyleSheet.flatten([style, pressed ? pressedStyle : null])}>
        {children}
      </Pressable>
    </Link>
  );
}
