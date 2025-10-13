import type { ComponentType } from "react";

type IntrinsicElementsKeys = keyof React.JSX.IntrinsicElements;

// Helper type to extract props from a component or element
type PropsOf<T> = T extends IntrinsicElementsKeys
  ? React.JSX.IntrinsicElements[T]
  : T extends ComponentType<infer P>
    ? P
    : never;

// The return type for clay components
export type ClayComponent<T> = (props: PropsOf<T>) => React.JSX.Element | null;

// Main clay function type
export type ClayFunction = {
  <T extends IntrinsicElementsKeys>(
    tag: T
  ): (
    strings: TemplateStringsArray,
    ...interpolations: never[]
  ) => ClayComponent<T>;
  <P extends { className?: string }>(
    component: ComponentType<P>
  ): (
    strings: TemplateStringsArray,
    ...interpolations: never[]
  ) => ClayComponent<ComponentType<P>>;
};

// This is just for type checking - the actual implementation
// is handled by the vite-plugin-clay at build time
export const clay = new Proxy({} as never, {
  get: () => {
    throw new Error(
      "clay should be transformed by vite-plugin-clay. Make sure the plugin is configured correctly."
    );
  },
  apply: () => {
    throw new Error(
      "clay should be transformed by vite-plugin-clay. Make sure the plugin is configured correctly."
    );
  },
}) as ClayFunction &
  {
    [K in IntrinsicElementsKeys]: (
      strings: TemplateStringsArray,
      ...interpolations: never[]
    ) => ClayComponent<K>;
  };
