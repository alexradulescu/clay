import type { ComponentType } from "react";

/**
 * Union type of all valid HTML element tag names.
 * Includes 'div', 'button', 'span', 'a', 'input', etc.
 */
type IntrinsicElementsKeys = keyof React.JSX.IntrinsicElements;

/**
 * Extracts the props type from an HTML element tag name or React component.
 *
 * @template T - Either an HTML tag name (e.g., 'button') or a React component type
 *
 * @example
 * // For HTML elements:
 * type ButtonProps = PropsOf<'button'>;
 * // Results in: React.ButtonHTMLAttributes<HTMLButtonElement>
 *
 * @example
 * // For components:
 * type MyComponentProps = PropsOf<typeof MyComponent>;
 * // Results in: the props type of MyComponent
 */
type PropsOf<T> = T extends IntrinsicElementsKeys
  ? React.JSX.IntrinsicElements[T]
  : T extends ComponentType<infer P>
    ? P
    : never;

/**
 * The type returned by clay.element`` or clay(Component)``.
 * A React functional component that accepts the same props as the underlying element.
 *
 * @template T - The HTML tag name or component type this clay component wraps
 *
 * @example
 * const Button: ClayComponent<'button'> = clay.button`
 *   padding: 0.5rem 1rem;
 * `;
 *
 * // Button accepts all standard button props:
 * <Button onClick={handleClick} disabled={isLoading} type="submit">
 *   Click me
 * </Button>
 */
export type ClayComponent<T> = (props: PropsOf<T>) => React.JSX.Element;

/**
 * The main clay function type that supports two syntaxes:
 *
 * 1. `clay.element` - Create a styled HTML element
 * 2. `clay(Component)` - Extend an existing clay component with additional styles
 *
 * @example
 * // Syntax 1: Create styled HTML elements
 * const Button = clay.button`
 *   padding: 0.5rem 1rem;
 *   background: blue;
 * `;
 *
 * @example
 * // Syntax 2: Extend existing clay components
 * const PrimaryButton = clay(Button)`
 *   background: linear-gradient(45deg, blue, purple);
 * `;
 */
export type ClayFunction = {
  /**
   * Creates a styled component from an HTML element tag.
   *
   * @template T - The HTML tag name (e.g., 'div', 'button', 'span')
   * @param tag - The HTML element tag name
   * @returns A template literal tag function that creates the styled component
   *
   * @example
   * const Card = clay.div`
   *   padding: 1rem;
   *   border-radius: 0.5rem;
   *   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
   * `;
   */
  <T extends IntrinsicElementsKeys>(
    tag: T
  ): (
    strings: TemplateStringsArray,
    ...interpolations: never[]
  ) => ClayComponent<T>;

  /**
   * Extends an existing clay component with additional styles.
   * The extended component inherits all props from the base component.
   *
   * @template P - The props type of the base component (must include optional className)
   * @param component - The base clay component to extend
   * @returns A template literal tag function that creates the extended component
   *
   * @example
   * const Button = clay.button`
   *   padding: 0.5rem 1rem;
   * `;
   *
   * const PrimaryButton = clay(Button)`
   *   background: blue;
   *   color: white;
   * `;
   *
   * // PrimaryButton has all the styles of Button plus the new styles
   */
  <P extends { className?: string }>(
    component: ComponentType<P>
  ): (
    strings: TemplateStringsArray,
    ...interpolations: never[]
  ) => ClayComponent<ComponentType<P>>;
};

/**
 * Creates styled React components with zero runtime overhead.
 *
 * Clay provides a familiar styled-components API while leveraging ecsstatic
 * for compile-time CSS extraction. All CSS is extracted to static files at
 * build time, resulting in no CSS-in-JS runtime.
 *
 * **Important:** This is a build-time transformation. The actual implementation
 * is handled by `vite-plugin-clay`. At runtime, this proxy throws an error
 * if the plugin was not configured correctly.
 *
 * @example
 * // Basic usage - create a styled button
 * const Button = clay.button`
 *   padding: 0.5rem 1rem;
 *   background: #3b82f6;
 *   color: white;
 *   border: none;
 *   border-radius: 0.375rem;
 *   cursor: pointer;
 *
 *   &:hover {
 *     background: #2563eb;
 *   }
 * `;
 *
 * @example
 * // Extending components
 * const PrimaryButton = clay(Button)`
 *   font-weight: bold;
 * `;
 *
 * @example
 * // Using the component
 * function App() {
 *   return (
 *     <Button onClick={handleClick} disabled={isLoading}>
 *       Click me
 *     </Button>
 *   );
 * }
 *
 * @see {@link https://github.com/alexradulescu/clay} - GitHub repository
 * @see {@link https://ecsstatic.dev} - ecsstatic documentation
 */
export const clay = new Proxy({} as never, {
  /**
   * Handles property access like `clay.button` or `clay.div`.
   * Throws an error at runtime because the plugin should have transformed this.
   */
  get: () => {
    throw new Error(
      "clay should be transformed by vite-plugin-clay. " +
        "Make sure the plugin is configured in your vite.config.ts and appears before ecsstatic."
    );
  },

  /**
   * Handles function calls like `clay(Component)`.
   * Throws an error at runtime because the plugin should have transformed this.
   */
  apply: () => {
    throw new Error(
      "clay should be transformed by vite-plugin-clay. " +
        "Make sure the plugin is configured in your vite.config.ts and appears before ecsstatic."
    );
  },
}) as ClayFunction &
  /**
   * Index signature for all HTML element tags.
   * Enables `clay.div`, `clay.button`, `clay.span`, etc.
   */
  {
    [K in IntrinsicElementsKeys]: (
      strings: TemplateStringsArray,
      ...interpolations: never[]
    ) => ClayComponent<K>;
  };
