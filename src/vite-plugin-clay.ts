import type { Plugin } from "vite";
import MagicString from "magic-string";

/**
 * Vite plugin that transforms clay.button`` syntax into css`` calls
 * that ecsstatic can then process.
 */
export function clayPlugin(): Plugin {
  return {
    name: "vite-plugin-clay",
    enforce: "pre", // Run before ecsstatic

    transform(code: string, id: string) {
      // Only process .tsx and .jsx files, skip node_modules
      if (!/\.[tj]sx$/.test(id) || /node_modules/.test(id)) {
        return null;
      }

      // Quick check if file might contain clay usage
      if (!code.includes("clay.") && !code.includes("clay(")) {
        return null;
      }

      const magicCode = new MagicString(code);
      let hasChanges = false;

      // Add css import if not present and we make changes
      const needsCssImport = !code.includes('from "@acab/ecsstatic"');

      // Pattern 1: const Component = clay.tag`css`
      // We match the whole declaration including the template literal
      const clayDotPattern =
        /const\s+(\w+)\s*=\s*clay\.(\w+)`([^`]*)`/g;

      let match: RegExpExecArray | null;
      while ((match = clayDotPattern.exec(code)) !== null) {
        const [fullMatch, componentName, tag, cssContent] = match;

        const replacement = `const ${componentName} = ((c) => (props) => <${tag} {...props} className={props.className ? props.className + ' ' + c : c} />)(css\`${cssContent}\`);`;

        magicCode.overwrite(match.index, match.index + fullMatch.length, replacement);
        hasChanges = true;
      }

      // Pattern 2: const Component = clay(BaseComponent)`css`
      const clayCallPattern =
        /const\s+(\w+)\s*=\s*clay\((\w+)\)`([^`]*)`/g;

      while ((match = clayCallPattern.exec(code)) !== null) {
        const [fullMatch, componentName, baseComponent, cssContent] = match;

        const replacement = `const ${componentName} = ((c) => (props) => <${baseComponent} {...props} className={props.className ? props.className + ' ' + c : c} />)(css\`${cssContent}\`);`;

        magicCode.overwrite(match.index, match.index + fullMatch.length, replacement);
        hasChanges = true;
      }

      if (!hasChanges) {
        return null;
      }

      // Add css import at the beginning if needed
      if (needsCssImport) {
        magicCode.prepend('import { css } from "@acab/ecsstatic";\n');
      }

      return {
        code: magicCode.toString(),
        map: magicCode.generateMap({ hires: true }),
      };
    },
  };
}
