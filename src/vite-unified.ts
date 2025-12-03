import type { Plugin } from "vite";
import { clayPlugin } from "./vite-plugin-clay";
import { ecsstatic } from "@acab/ecsstatic/vite";

/**
 * Unified Clay Vite plugin that handles both transformation and CSS extraction.
 *
 * This plugin combines clayPlugin (which transforms clay syntax) and ecsstatic
 * (which extracts CSS to static files) into a single, easy-to-use plugin.
 *
 * This is the recommended way to use Clay. The plugin order is guaranteed to be
 * correct, and you only need one import statement.
 *
 * @returns An array of Vite plugins configured in the correct order
 *
 * @example
 * // Recommended usage (new unified plugin)
 * import { defineConfig } from "vite";
 * import { clay } from "@alexradulescu/clay/vite";
 * import react from "@vitejs/plugin-react";
 *
 * export default defineConfig({
 *   plugins: [
 *     clay(),   // Handles everything: transformation + CSS extraction
 *     react(),
 *   ],
 * });
 *
 * @example
 * // Legacy usage (still supported for advanced use cases)
 * import { defineConfig } from "vite";
 * import { clayPlugin } from "@alexradulescu/clay/vite";
 * import { ecsstatic } from "@acab/ecsstatic/vite";
 * import react from "@vitejs/plugin-react";
 *
 * export default defineConfig({
 *   plugins: [
 *     clayPlugin(),
 *     ecsstatic(),
 *     react(),
 *   ],
 * });
 */
export function clay(): Plugin[] {
  return [
    clayPlugin(),  // 1. Transform clay.x`` and createGlobalStyle`` to css``
    ecsstatic(),   // 2. Extract css`` to static CSS files
  ];
}
