/**
 * Global styles component for Clay.
 *
 * This provides a styled-components-like API for defining global CSS.
 * The actual implementation is handled by vite-plugin-clay at build time.
 */

/**
 * The type returned by createGlobalStyle.
 * A React component that renders nothing but applies global styles.
 */
export type GlobalStyleComponent = () => null;

/**
 * Creates a component that applies global CSS styles.
 *
 * This function follows the styled-components API pattern, allowing you to
 * define global styles using template literals. The styles are extracted to
 * static CSS files at build time by vite-plugin-clay.
 *
 * **Important:** This is a build-time transformation. The actual implementation
 * is handled by vite-plugin-clay. At runtime, this function throws an error
 * if the plugin was not configured correctly.
 *
 * @param strings - Template literal strings containing CSS
 * @param interpolations - No interpolations allowed (enforced by TypeScript)
 * @returns A React component that applies the global styles
 *
 * @example
 * // Define global styles
 * const GlobalStyle = createGlobalStyle`
 *   * {
 *     box-sizing: border-box;
 *   }
 *
 *   body {
 *     margin: 0;
 *     padding: 0;
 *     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
 *     -webkit-font-smoothing: antialiased;
 *   }
 *
 *   h1, h2, h3, h4, h5, h6 {
 *     margin: 0;
 *   }
 * `;
 *
 * @example
 * // Use in your app
 * function App() {
 *   return (
 *     <>
 *       <GlobalStyle />
 *       <YourApp />
 *     </>
 *   );
 * }
 *
 * @example
 * // CSS variables for theming
 * const GlobalStyle = createGlobalStyle`
 *   :root {
 *     --color-primary: #667eea;
 *     --color-secondary: #764ba2;
 *     --spacing-unit: 0.25rem;
 *   }
 *
 *   body {
 *     background: var(--color-background);
 *     color: var(--color-text);
 *   }
 * `;
 *
 * @example
 * // Dark mode with global styles
 * const GlobalStyle = createGlobalStyle`
 *   :root {
 *     --bg: #ffffff;
 *     --text: #000000;
 *   }
 *
 *   [data-theme="dark"] {
 *     --bg: #1a1a1a;
 *     --text: #ffffff;
 *   }
 *
 *   body {
 *     background: var(--bg);
 *     color: var(--text);
 *     transition: background 0.2s, color 0.2s;
 *   }
 * `;
 *
 * @see {@link https://github.com/alexradulescu/clay} - GitHub repository
 */
export function createGlobalStyle(
  _strings: TemplateStringsArray,
  ..._interpolations: never[]
): GlobalStyleComponent {
  throw new Error(
    "createGlobalStyle should be transformed by vite-plugin-clay. " +
      "Make sure the plugin is configured in your vite.config.ts and appears before ecsstatic."
  );
}
