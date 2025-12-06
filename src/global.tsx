/** A component that renders nothing but applies global styles */
export type GlobalStyleComponent = () => null;

/**
 * Creates global (unscoped) CSS styles.
 * Transformed at build time by vite-plugin-clay.
 *
 * @example
 * const GlobalStyle = createGlobalStyle`
 *   * { box-sizing: border-box; }
 *   body { margin: 0; font-family: sans-serif; }
 * `;
 *
 * In your app:
 * <GlobalStyle />
 */
export function createGlobalStyle(
  _strings: TemplateStringsArray,
  ..._interpolations: never[]
): GlobalStyleComponent {
  throw new Error(
    "createGlobalStyle should be transformed by vite-plugin-clay. " +
      "Make sure the plugin is configured in your vite.config.ts."
  );
}
