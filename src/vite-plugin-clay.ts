import type { Plugin } from "vite";
import MagicString from "magic-string";

// ============================================================================
// Constants
// ============================================================================

/** The name of this Vite plugin, used for identification in Vite's plugin system */
const PLUGIN_NAME = "vite-plugin-clay";

/** The import statement added when css`` calls are introduced */
const ECSSTATIC_IMPORT = 'import { css } from "@acab/ecsstatic";\n';

/** Check for existing ecsstatic import to avoid duplicates */
const ECSSTATIC_IMPORT_CHECK = 'from "@acab/ecsstatic"';

// ============================================================================
// Regex Patterns
// ============================================================================

/**
 * Pattern 1: Matches `const ComponentName = clay.tagName`cssContent``
 *
 * Examples that match:
 * - const Button = clay.button`padding: 1rem;`
 * - export const Button = clay.button`padding: 1rem;`
 * - const Card = clay.div`background: white;`
 *
 * Capture groups:
 * - Group 1: Component name (e.g., "Button", "Card")
 * - Group 2: HTML tag name (e.g., "button", "div")
 * - Group 3: CSS content (e.g., "padding: 1rem;")
 *
 * Note: Only matches `const` declarations, not `let` or `var`.
 * This is intentional to encourage immutable component definitions.
 * The pattern optionally matches export before const to support exported components.
 */
const CLAY_ELEMENT_PATTERN = /(?:export\s+)?const\s+(\w+)\s*=\s*clay\.(\w+)`([^`]*)`/g;

/**
 * Pattern 2: Matches `const ComponentName = clay(BaseComponent)`cssContent``
 *
 * Examples that match:
 * - const PrimaryButton = clay(Button)`background: blue;`
 * - export const PrimaryButton = clay(Button)`background: blue;`
 * - const LargeCard = clay(Card)`padding: 2rem;`
 *
 * Capture groups:
 * - Group 1: New component name (e.g., "PrimaryButton")
 * - Group 2: Base component name (e.g., "Button")
 * - Group 3: CSS content (e.g., "background: blue;")
 *
 * Note: The base component must be a valid JavaScript identifier.
 * The pattern optionally matches export before const to support exported components.
 */
const CLAY_EXTEND_PATTERN = /(?:export\s+)?const\s+(\w+)\s*=\s*clay\((\w+)\)`([^`]*)`/g;

/**
 * Pattern 3: Matches `const GlobalStyle = createGlobalStyle`cssContent``
 *
 * Examples that match:
 * - const GlobalStyle = createGlobalStyle`* { box-sizing: border-box; }`
 * - export const GlobalStyle = createGlobalStyle`body { margin: 0; }`
 * - const CSSReset = createGlobalStyle`body { margin: 0; }`
 *
 * Capture groups:
 * - Group 1: Component name (e.g., "GlobalStyle", "CSSReset")
 * - Group 2: CSS content (e.g., "* { box-sizing: border-box; }")
 *
 * Note: The component name can be anything, but typically GlobalStyle or CSSReset.
 * The pattern optionally matches export before const to support exported global styles.
 */
const CREATE_GLOBAL_STYLE_PATTERN =
  /(?:export\s+)?const\s+(\w+)\s*=\s*createGlobalStyle`([^`]*)`/g;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Checks if a file should be processed by this plugin.
 *
 * @param id - The file path/id from Vite
 * @returns true if the file should be processed
 *
 * Only processes:
 * - .tsx files (TypeScript with JSX)
 * - .jsx files (JavaScript with JSX)
 *
 * Excludes:
 * - node_modules (third-party code)
 * - Non-JSX files (.ts, .js, .css, etc.)
 */
function shouldProcessFile(id: string): boolean {
  // Only process .tsx and .jsx files
  if (!/\.[tj]sx$/.test(id)) {
    return false;
  }

  // Skip node_modules
  if (/node_modules/.test(id)) {
    return false;
  }

  return true;
}

/**
 * Quick check if the file might contain clay usage.
 * This is a performance optimization to avoid running regex on files
 * that definitely don't use clay.
 *
 * @param code - The file's source code
 * @returns true if the file might contain clay usage
 */
function mightContainClay(code: string): boolean {
  return (
    code.includes("clay.") ||
    code.includes("clay(") ||
    code.includes("createGlobalStyle")
  );
}

/**
 * Generates the transformed code for a clay component.
 *
 * The transformation wraps the CSS in an IIFE (Immediately Invoked Function Expression)
 * that receives the css`` result and returns a component function.
 *
 * @param componentName - The name of the component being created
 * @param tagOrComponent - Either an HTML tag name or a base component name
 * @param cssContent - The CSS content from the template literal
 * @returns The transformed code string
 *
 * @example
 * // Input:
 * generateReplacement("Button", "button", "padding: 1rem;")
 *
 * // Output:
 * const Button = ((c) => (props) => <button {...props} className={props.className ? props.className + ' ' + c : c} />)(css`padding: 1rem;`);
 *
 * The IIFE pattern:
 * 1. `((c) => ...)` - Creates a closure that receives the generated class name
 * 2. `(props) => <tag ... />` - The actual component function
 * 3. `(css\`...\`)` - Immediately invokes with the css`` result
 *
 * className merging logic:
 * - If props.className exists: "existingClass generatedClass"
 * - If props.className is falsy: "generatedClass"
 */
function generateReplacement(
  componentName: string,
  tagOrComponent: string,
  cssContent: string
): string {
  // The className merging ensures:
  // 1. User-provided classNames are preserved
  // 2. The generated class is always applied
  // 3. Classes are properly space-separated
  const classNameMerge = "props.className ? props.className + ' ' + c : c";

  return `const ${componentName} = ((c) => (props) => <${tagOrComponent} {...props} className={${classNameMerge}} />)(css\`${cssContent}\`);`;
}

// ============================================================================
// Plugin Export
// ============================================================================

/**
 * Vite plugin that transforms clay syntax into css`` calls for ecsstatic.
 *
 * This plugin must be placed BEFORE ecsstatic in the Vite plugins array.
 * The transformation flow is:
 *
 * 1. Your code: `const Button = clay.button\`padding: 1rem;\``
 * 2. After clayPlugin: `const Button = ((c) => (props) => <button {...props} className={...} />)(css\`padding: 1rem;\`);`
 * 3. After ecsstatic: The css`` call is extracted to a static CSS file
 *
 * @returns A Vite plugin object
 *
 * @example
 * // vite.config.ts
 * import { clayPlugin } from "@alexradulescu/clay/vite";
 * import { ecsstatic } from "@acab/ecsstatic/vite";
 * import react from "@vitejs/plugin-react";
 *
 * export default defineConfig({
 *   plugins: [
 *     clayPlugin(),   // Must be first - transforms clay to css``
 *     ecsstatic(),    // Must be second - extracts css`` to files
 *     react(),        // Must be last - handles JSX
 *   ],
 * });
 */
export function clayPlugin(): Plugin {
  return {
    name: PLUGIN_NAME,

    // Run before other plugins (especially ecsstatic)
    // This ensures clay syntax is transformed before ecsstatic processes css`` calls
    enforce: "pre",

    /**
     * Transform hook - called for each file during the build.
     *
     * @param code - The file's source code
     * @param id - The file's path/identifier
     * @returns Transformed code with source map, or null if no changes
     */
    transform(code: string, id: string) {
      // Skip files that don't need processing
      if (!shouldProcessFile(id)) {
        return null;
      }

      // Quick check to avoid unnecessary regex operations
      if (!mightContainClay(code)) {
        return null;
      }

      // Use MagicString for efficient string manipulation with source maps
      const magicCode = new MagicString(code);
      let hasChanges = false;

      // Check if we need to add the css import
      const needsCssImport = !code.includes(ECSSTATIC_IMPORT_CHECK);

      // ---------------------------------------------------------------------
      // Transform Pattern 1: clay.element`css`
      // ---------------------------------------------------------------------
      let match: RegExpExecArray | null;

      while ((match = CLAY_ELEMENT_PATTERN.exec(code)) !== null) {
        const [fullMatch, componentName, tag, cssContent] = match;

        const replacement = generateReplacement(componentName, tag, cssContent);

        // Replace the matched code in-place
        magicCode.overwrite(
          match.index,
          match.index + fullMatch.length,
          replacement
        );
        hasChanges = true;
      }

      // ---------------------------------------------------------------------
      // Transform Pattern 2: clay(Component)`css`
      // ---------------------------------------------------------------------
      // Reset the regex lastIndex for the second pattern
      CLAY_EXTEND_PATTERN.lastIndex = 0;

      while ((match = CLAY_EXTEND_PATTERN.exec(code)) !== null) {
        const [fullMatch, componentName, baseComponent, cssContent] = match;

        const replacement = generateReplacement(
          componentName,
          baseComponent,
          cssContent
        );

        magicCode.overwrite(
          match.index,
          match.index + fullMatch.length,
          replacement
        );
        hasChanges = true;
      }

      // ---------------------------------------------------------------------
      // Transform Pattern 3: createGlobalStyle`css`
      // ---------------------------------------------------------------------
      // Reset the regex lastIndex for the third pattern
      CREATE_GLOBAL_STYLE_PATTERN.lastIndex = 0;

      while ((match = CREATE_GLOBAL_STYLE_PATTERN.exec(code)) !== null) {
        const [fullMatch, componentName, cssContent] = match;

        // Transform createGlobalStyle to:
        // css`...`; const ComponentName = () => null;
        const replacement = `css\`${cssContent}\`; const ${componentName} = () => null;`;

        magicCode.overwrite(
          match.index,
          match.index + fullMatch.length,
          replacement
        );
        hasChanges = true;
      }

      // If no clay usage was found, return null (no transformation needed)
      if (!hasChanges) {
        return null;
      }

      // Add the css import at the beginning of the file if needed
      if (needsCssImport) {
        magicCode.prepend(ECSSTATIC_IMPORT);
      }

      // Return the transformed code with a high-resolution source map
      // The source map enables accurate error messages and debugging
      return {
        code: magicCode.toString(),
        map: magicCode.generateMap({ hires: true }),
      };
    },
  };
}
