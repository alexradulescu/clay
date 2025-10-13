# Stly - Minimal Styled Components for Vite

A minimal, zero-runtime CSS-in-JS solution for React that extracts styles to CSS modules at build time.

## Features

- ✅ **Zero runtime** - CSS is extracted at build time
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Component composition** - Extend styled components
- ✅ **Minimal dependencies** - Only uses Vite's built-in tools plus magic-string and acorn-walk
- ✅ **No interpolation complexity** - Plain CSS only, no runtime evaluation
- ✅ **CSS Modules** - Uses Vite's native CSS module handling

## Installation

Already installed! Dependencies:
- `magic-string` - Code transformation
- `acorn-walk` - AST traversal
- `@types/estree` - TypeScript types for AST

## Usage

### Basic styled component

```tsx
import { styled } from '../plugin/styled'

const Button = styled.button`
  padding: 0.6em 1.2em;
  border-radius: 8px;
  background-color: #1a1a1a;
  cursor: pointer;

  &:hover {
    border-color: #646cff;
  }
`

export default function App() {
  return <Button>Click me</Button>
}
```

### Extending styled components

```tsx
const Button = styled.button`
  padding: 0.6em 1.2em;
  background: #1a1a1a;
`

const PrimaryButton = styled(Button)`
  background: linear-gradient(45deg, #646cff, #bd34fe);
  font-weight: bold;
`
```

### All HTML elements supported

```tsx
const Container = styled.div`...`
const Title = styled.h1`...`
const Input = styled.input`...`
const Link = styled.a`...`
// ... any HTML element
```

## How it works

### 1. Build-time transformation

The Vite plugin (`plugin/index.ts`) runs during the build process:

1. **AST Parsing** - Scans files for `styled.element\`...\`` and `styled(Component)\`...\`` patterns
2. **CSS Extraction** - Extracts CSS content from template literals
3. **Hash Generation** - Creates stable, content-based class names using MurmurHash
4. **Virtual CSS Modules** - Generates virtual `.module.css` files for Vite to process
5. **Code Generation** - Replaces styled calls with React components

### 2. Example transformation

**Input:**
```tsx
const Button = styled.button`
  color: red;
  padding: 10px;
`
```

**Output:**
```tsx
import __styled_0 from 'virtual:styled:file.tsx-0.module.css';

const Button = ((props) => {
  const { className: propsClassName, ...restProps } = props;
  return React.createElement('button', {
    ...restProps,
    className: [propsClassName, 's_abc123'].filter(Boolean).join(' ')
  });
})
```

**Generated CSS Module:**
```css
.s_abc123 {
  color: red;
  padding: 10px;
}
```

### 3. Component composition

When extending components with `styled(Button)`, the plugin:
1. Generates a new CSS class with additional styles
2. Creates a component that wraps the base component
3. Merges class names properly

## Architecture

```
plugin/
├── index.ts          # Main Vite plugin (transformation logic)
├── hash.ts           # MurmurHash implementation for stable class names
├── styled.ts         # Runtime stub (throws error if plugin not configured)
└── styled.d.ts       # TypeScript definitions
```

### Key files

**plugin/index.ts** (~250 lines)
- `styledPlugin()` - Main Vite plugin export
- `findStyledCalls()` - AST traversal to find styled patterns
- `generateIntrinsicComponent()` - Code generation for `styled.button`
- `generateExtendedComponent()` - Code generation for `styled(Component)`

**plugin/hash.ts** (~40 lines)
- MurmurHash3 implementation copied from ecsstatic
- Generates short, stable hashes from CSS content

**plugin/styled.ts** (~8 lines)
- Runtime stub that throws errors if plugin isn't configured
- Replaced entirely by the plugin at build time

## Plugin options

```ts
styledPlugin({
  classNamePrefix: 's' // default: 's' (e.g., s_abc123)
})
```

## Limitations (by design)

- **No CSS interpolation** - Only plain CSS strings are supported
- **No `css` helper** - Only styled components, no standalone CSS generation
- **No dynamic styles** - All CSS must be static (use CSS variables for dynamic values)

## Comparison with ecsstatic

### Similarities
- Uses Vite plugin architecture
- Extracts CSS at build time
- Hash-based class names
- AST-based transformation

### Differences
- **No expression evaluation** - Simpler, no esbuild bundling for interpolation
- **Component-focused API** - `styled.button` instead of `css\`...\``
- **Component composition** - Built-in support for `styled(Component)`
- **Minimal dependencies** - Only Vite's built-in tools + 2 packages

## Dependencies breakdown

1. **magic-string** - Efficient string manipulation for code transformation
2. **acorn-walk** - AST walking (Vite already includes acorn parser)
3. **@types/estree** - TypeScript types for ESTree AST nodes

Total new dependencies: **2** (3 if you count types)

## Supply chain security

All dependencies are:
- ✅ Well-established in the ecosystem
- ✅ Minimal and focused
- ✅ Used by Vite itself or common in Vite plugins
- ✅ No network requests
- ✅ No filesystem access beyond what Vite provides

## Next steps

1. Visit http://localhost:5174/ to see the demo
2. Edit `src/App.tsx` to try creating styled components
3. Check the browser devtools to see the generated CSS
4. Build for production with `bun run build` to see the extracted CSS files
