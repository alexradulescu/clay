import type { Plugin } from "vite";
import MagicString from "magic-string";

// Regex patterns for clay syntax
// All patterns: [export] const Name = <syntax>`css`
const PATTERNS = {
  // clay.div`css` -> creates element component
  element: /(export\s+)?const\s+(\w+)\s*=\s*clay\.(\w+)`([^`]*)`/g,
  // clay(Base)`css` -> extends existing component
  extend: /(export\s+)?const\s+(\w+)\s*=\s*clay\((\w+)\)`([^`]*)`/g,
  // createGlobalStyle`css` -> global styles
  global: /(export\s+)?const\s+(\w+)\s*=\s*createGlobalStyle`([^`]*)`/g,
};

/**
 * Vite plugin that transforms Clay's styled-components syntax into ecsstatic css`` calls.
 *
 * Transforms:
 * - `clay.div\`css\`` → component with scoped styles
 * - `clay(Base)\`css\`` → extended component with scoped styles
 * - `createGlobalStyle\`css\`` → global unscoped styles
 */
export function clayPlugin(): Plugin {
  return {
    name: "vite-plugin-clay",
    enforce: "pre",

    transform(code: string, id: string) {
      // Only process .tsx/.jsx files, skip node_modules
      if (!/\.[tj]sx$/.test(id) || /node_modules/.test(id)) {
        return null;
      }

      // Quick check: does file use clay?
      if (!code.includes("clay.") && !code.includes("clay(") && !code.includes("createGlobalStyle")) {
        return null;
      }

      const s = new MagicString(code);
      let transformed = false;
      let needsCss = false;
      let needsGlobal = false;

      // Transform clay.element`css` and clay(Component)`css`
      for (const pattern of [PATTERNS.element, PATTERNS.extend]) {
        pattern.lastIndex = 0;
        let match;
        while ((match = pattern.exec(code)) !== null) {
          const [full, exp, name, tag, css] = match;
          const merge = "props.className ? props.className + ' ' + c : c";
          const replacement = `${exp || ""}const ${name} = ((c) => (props) => <${tag} {...props} className={${merge}} />)(css\`${css}\`);`;
          s.overwrite(match.index, match.index + full.length, replacement);
          transformed = true;
          needsCss = true;
        }
      }

      // Transform createGlobalStyle`css` - use aliased import to avoid conflict with clay stub
      PATTERNS.global.lastIndex = 0;
      let match;
      while ((match = PATTERNS.global.exec(code)) !== null) {
        const [full, exp, name, css] = match;
        const replacement = `__globalStyle\`${css}\`; ${exp || ""}const ${name} = () => null;`;
        s.overwrite(match.index, match.index + full.length, replacement);
        transformed = true;
        needsGlobal = true;
      }

      if (!transformed) {
        return null;
      }

      // Add ecsstatic imports
      const hasEcsstaticImport = code.includes('from "@acab/ecsstatic"');

      // css: always add when needed (not exported from clay)
      if (needsCss && !hasEcsstaticImport) {
        s.prepend('import { css } from "@acab/ecsstatic";\n');
      }
      // createGlobalStyle: always add with alias to avoid conflict with clay stub
      if (needsGlobal) {
        s.prepend('import { createGlobalStyle as __globalStyle } from "@acab/ecsstatic";\n');
      }

      return {
        code: s.toString(),
        map: s.generateMap({ hires: true }),
      };
    },
  };
}
