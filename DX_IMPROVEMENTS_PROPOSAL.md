# Clay Developer Experience Improvements - Proposal

## Executive Summary

This document outlines proposed improvements to Clay's developer experience, focusing on reducing installation complexity, simplifying configuration, and adding missing features that developers expect from a CSS-in-JS library.

## Current State Analysis

### Pain Points

#### 1. Two-Package Installation
**Current:**
```bash
npm install @alexradulescu/clay @acab/ecsstatic
```

**Problem:**
- Users must remember to install both packages
- Confusing for newcomers who just want "clay"
- Package manager errors if ecsstatic is missing
- Additional cognitive load in documentation

#### 2. Three-Plugin Vite Configuration
**Current:**
```ts
import { defineConfig } from "vite";
import { clayPlugin } from "@alexradulescu/clay/vite";
import { ecsstatic } from "@acab/ecsstatic/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    clayPlugin(),   // 1. Clay transforms clay.x`` to css``
    ecsstatic(),    // 2. ecsstatic extracts css`` to static CSS
    react(),        // 3. React handles JSX
  ],
});
```

**Problems:**
- Three import statements when conceptually it should be one
- Plugin order is critical but not enforced by the API
- Users must understand internal implementation details
- Easy to misconfigure

#### 3. No Global Styles API
**Current:**
```tsx
// Users must create a separate CSS file
// docs/src/global.css
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

// Then import it in main.tsx
import "./global.css";
```

**Problems:**
- Inconsistent with the clay component API
- Can't use the same familiar syntax
- No type safety for global styles
- Mixing paradigms (CSS-in-JS for components, plain CSS for globals)

#### 4. Missing Re-exports
**Current:**
- No direct access to ecsstatic utilities
- No re-export of the `css` function for one-off styles

---

## Proposed Improvements

### 1. Single Package Installation

**Proposed:**
```bash
npm install @alexradulescu/clay
```

**Implementation:**
- Add `@acab/ecsstatic` as a direct dependency (not peer dependency)
- Re-export necessary ecsstatic APIs from clay
- Users only install one package

**Benefits:**
- Simpler onboarding
- Fewer installation errors
- Cleaner package.json
- Better first impression

**Tradeoffs:**
- Slightly larger bundle (but ecsstatic was required anyway)
- Users can't control ecsstatic version separately
- Recommendation: Keep ecsstatic as peerDependency with bundledDependencies as fallback

---

### 2. Unified Vite Plugin

**Proposed:**
```ts
import { defineConfig } from "vite";
import { clay } from "@alexradulescu/clay/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    clay(),   // Handles everything: transformation + CSS extraction
    react(),
  ],
});
```

**Implementation:**
Create a unified plugin that:
1. Runs clayPlugin transformation first
2. Automatically runs ecsstatic transformation second
3. Returns them as a plugin array or composite plugin

**Benefits:**
- One import instead of two
- Plugin order is guaranteed correct
- Simpler mental model
- Less configuration to explain

**Backward Compatibility:**
Keep `clayPlugin` export for advanced users who need fine-grained control

---

### 3. Global Styles API - `createGlobalStyle`

**Proposed API:**
```tsx
import { createGlobalStyle } from "@alexradulescu/clay";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <YourApp />
    </>
  );
}
```

**Alternative API (without component):**
```tsx
import { globalStyle } from "@alexradulescu/clay";

// Define once, auto-applied
globalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: sans-serif;
  }
`;
```

**Benefits:**
- Familiar styled-components API
- Type-safe global styles
- Consistent with component styling
- No CSS file imports needed

**Implementation Notes:**
- Transform to ecsstatic's global CSS feature
- Can be called multiple times (styles accumulate)
- Processed at build time like component styles

---

### 4. Re-export Essential APIs

**Proposed:**
```ts
// Main package exports
export { clay } from "./clay";
export { createGlobalStyle } from "./global";
export { css } from "@acab/ecsstatic";  // For one-off styles
export type { ClayComponent, ClayFunction } from "./clay";

// Vite plugin exports
export { clay as default } from "./vite-unified";
export { clayPlugin } from "./vite-plugin-clay";  // Legacy/advanced
```

**Use Cases:**
```tsx
import { clay, css, createGlobalStyle } from "@alexradulescu/clay";

// Regular component
const Button = clay.button`padding: 1rem;`;

// One-off style (without creating component)
const dynamicClass = css`color: red;`;

// Global styles
const GlobalStyle = createGlobalStyle`
  body { margin: 0; }
`;
```

**Benefits:**
- Everything imported from one place
- Access to lower-level APIs when needed
- Familiar to styled-components users

---

### 5. Enhanced Documentation Examples

**Add examples for:**

#### Global Styles with Theme Variables
```tsx
const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #667eea;
    --color-secondary: #764ba2;
    --spacing-unit: 0.25rem;
    --font-sans: 'Inter', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-sans);
  }
`;
```

#### Dark Mode with Global Styles
```tsx
const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #ffffff;
    --text: #000000;
  }

  [data-theme="dark"] {
    --bg: #1a1a1a;
    --text: #ffffff;
  }

  body {
    background: var(--bg);
    color: var(--text);
    transition: background 0.2s, color 0.2s;
  }
`;
```

#### CSS Reset Example
```tsx
const CSSReset = createGlobalStyle`
  /* Modern CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
`;
```

---

## Implementation Options

Below are detailed implementation options for AI to choose from, ordered by priority.

---

### Option A: Full DX Overhaul (Recommended)

**Implements:** All improvements at once

**Changes:**
1. Move `@acab/ecsstatic` to dependencies
2. Create unified vite plugin
3. Add `createGlobalStyle` API
4. Re-export `css` from ecsstatic
5. Update all documentation and examples

**Timeline:** Medium effort (1-2 days)

**Pros:**
- Complete solution
- Best long-term DX
- Single migration path for users

**Cons:**
- Larger initial change
- Requires comprehensive testing
- May need deprecation warnings

**Files to modify:**
- `package.json` - dependencies
- `src/index.ts` - new exports
- `src/global.tsx` - new file for createGlobalStyle
- `src/vite.ts` - unified plugin
- `src/vite-unified.ts` - new file
- `README.md` - update all examples
- `example/` - update example
- `docs/` - update docs site

---

### Option B: Phased Approach - Phase 1: Package Consolidation

**Implements:** Improvements 1 & 4 only

**Changes:**
1. Move `@acab/ecsstatic` to dependencies
2. Re-export essential APIs
3. Update documentation for single-package install

**Timeline:** Low effort (2-4 hours)

**Pros:**
- Immediate value
- Low risk
- Easy to test
- Can be shipped quickly

**Cons:**
- Still requires multiple plugin imports
- No global styles API yet

**Next Phase:** Would implement unified plugin and createGlobalStyle

---

### Option C: Phased Approach - Phase 2: Unified Plugin

**Implements:** Improvement 2 only (assumes Phase 1 done)

**Changes:**
1. Create unified vite plugin
2. Keep `clayPlugin` for backward compatibility
3. Update documentation

**Timeline:** Low effort (2-3 hours)

**Pros:**
- Simplifies configuration
- Backward compatible
- Clear migration path

**Cons:**
- Doesn't address global styles

---

### Option D: Minimal - Global Styles Only

**Implements:** Improvement 3 only

**Changes:**
1. Add `createGlobalStyle` function
2. Add transformation in vite plugin
3. Add examples to documentation

**Timeline:** Medium effort (4-6 hours)

**Pros:**
- Fills biggest feature gap
- High user value
- Doesn't change existing APIs

**Cons:**
- Doesn't address setup complexity

---

### Option E: Quick Win - Better Defaults

**Implements:** Simple wrapper improvements

**Changes:**
1. Export a "batteries-included" preset:
```ts
// vite.config.ts
import { clayPreset } from "@alexradulescu/clay/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    ...clayPreset(),  // Returns [clayPlugin(), ecsstatic()]
    react(),
  ],
});
```

**Timeline:** Very low effort (1 hour)

**Pros:**
- Minimal code change
- Immediate improvement
- Zero breaking changes

**Cons:**
- Still requires understanding of spread operator
- Not as clean as unified plugin

---

## Recommended Implementation Path

### Immediate (Week 1)
1. **Option B** - Package consolidation
   - Move ecsstatic to dependencies
   - Re-export APIs
   - Update docs

### Short-term (Week 2)
2. **Option C** - Unified plugin
   - Create clay() vite plugin
   - Keep clayPlugin() for compatibility

### Medium-term (Week 3-4)
3. **Option D** - Global styles
   - Implement createGlobalStyle
   - Add comprehensive examples

### Ongoing
4. Enhanced documentation
5. Migration guides
6. Video tutorials

---

## Breaking Changes & Migration

### If implemented as non-breaking (recommended):

**Old way still works:**
```ts
// Still supported
import { clayPlugin } from "@alexradulescu/clay/vite";
import { ecsstatic } from "@acab/ecsstatic/vite";

plugins: [clayPlugin(), ecsstatic(), react()]
```

**New way is simpler:**
```ts
// New, recommended
import { clay } from "@alexradulescu/clay/vite";

plugins: [clay(), react()]
```

### Deprecation Strategy

1. Add deprecation warnings to `clayPlugin` import
2. Update docs to show new way first
3. Keep old way working for 6-12 months
4. Major version bump to remove old APIs

---

## Success Metrics

### Quantitative
- Reduce setup steps from 5 to 2
- Reduce required imports from 3 to 1
- Reduce installation commands from 2 to 1

### Qualitative
- "Just works" experience
- Clearer mental model
- Better first impression
- Familiar API for styled-components users

---

## Questions for Decision

1. **Dependencies:** Should ecsstatic be a dependency or peerDependency?
   - **Recommendation:** dependency (simpler for users)

2. **Plugin naming:** Should unified plugin be `clay()` or `clayVite()`?
   - **Recommendation:** `clay()` (matches package name)

3. **Global styles:** Component-based or function-based API?
   - **Recommendation:** Component-based (matches styled-components)

4. **Breaking changes:** Ship as v2.0.0 or keep backward compatible?
   - **Recommendation:** Keep backward compatible, ship as v0.2.0

---

## Appendix: Code Examples

### A. Unified Plugin Implementation Sketch

```ts
// src/vite-unified.ts
import type { Plugin } from "vite";
import { clayPlugin } from "./vite-plugin-clay";
import { ecsstatic } from "@acab/ecsstatic/vite";

export function clay(): Plugin[] {
  return [
    clayPlugin(),
    ecsstatic(),
  ];
}
```

### B. createGlobalStyle Implementation Sketch

```ts
// src/global.tsx
export type GlobalStyleComponent = () => null;

export function createGlobalStyle(
  strings: TemplateStringsArray,
  ...interpolations: never[]
): GlobalStyleComponent {
  throw new Error(
    "createGlobalStyle should be transformed by vite-plugin-clay"
  );
}

// In vite-plugin-clay.ts, add transformation:
// const GlobalStyle = createGlobalStyle`...`
// becomes:
// css`...`; const GlobalStyle = () => null;
```

### C. Package.json Changes

```json
{
  "dependencies": {
    "magic-string": "^0.30.19",
    "@acab/ecsstatic": "^0.9.0"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "vite": ">=5.0.0"
  }
}
```

---

## Conclusion

These improvements will significantly enhance Clay's developer experience by:

1. **Reducing friction** - Single package, single plugin
2. **Adding expected features** - Global styles API
3. **Improving discoverability** - All APIs from one import
4. **Maintaining simplicity** - Zero runtime overhead preserved

**Recommended next step:** Implement Option B (Package Consolidation) as a quick win, followed by Options C and D in subsequent releases.
