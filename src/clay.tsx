import type { ComponentType } from "react";

type HTMLTag = keyof React.JSX.IntrinsicElements;

type PropsOf<T> = T extends HTMLTag
  ? React.JSX.IntrinsicElements[T]
  : T extends ComponentType<infer P>
    ? P
    : never;

/** A styled React component created by clay */
export type ClayComponent<T> = (props: PropsOf<T>) => React.JSX.Element;

/** The clay function type supporting both `clay.div` and `clay(Component)` syntax */
export type ClayFunction = {
  // clay.element`css` - style HTML elements
  <T extends HTMLTag>(tag: T): (
    strings: TemplateStringsArray,
    ...interpolations: never[]
  ) => ClayComponent<T>;

  // clay(Component)`css` - extend existing components
  <P extends { className?: string }>(component: ComponentType<P>): (
    strings: TemplateStringsArray,
    ...interpolations: never[]
  ) => ClayComponent<ComponentType<P>>;
};

/**
 * Creates styled React components with zero runtime overhead.
 * CSS is extracted to static files at build time by vite-plugin-clay.
 *
 * @example
 * const Button = clay.button`
 *   padding: 0.5rem 1rem;
 *   background: blue;
 * `;
 *
 * const PrimaryButton = clay(Button)`
 *   font-weight: bold;
 * `;
 */
export const clay = new Proxy({} as never, {
  get: () => {
    throw new Error(
      "clay should be transformed by vite-plugin-clay. " +
        "Make sure the plugin is configured in your vite.config.ts."
    );
  },
  apply: () => {
    throw new Error(
      "clay should be transformed by vite-plugin-clay. " +
        "Make sure the plugin is configured in your vite.config.ts."
    );
  },
}) as ClayFunction & {
  [K in HTMLTag]: (
    strings: TemplateStringsArray,
    ...interpolations: never[]
  ) => ClayComponent<K>;
};
