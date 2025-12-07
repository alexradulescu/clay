import type { Plugin } from "vite";
import { clayPlugin } from "./vite-plugin-clay";
import { ecsstatic } from "@acab/ecsstatic/vite";

/**
 * Unified Clay plugin - handles both transformation and CSS extraction.
 *
 * @example
 * import { clay } from "@alexradulescu/clay/vite";
 * import react from "@vitejs/plugin-react";
 *
 * export default defineConfig({
 *   plugins: [clay(), react()],
 * });
 */
export function clay(): Plugin[] {
  return [
    clayPlugin(),  // Transform clay syntax to css``
    ecsstatic(),   // Extract css`` to static CSS files
  ];
}
