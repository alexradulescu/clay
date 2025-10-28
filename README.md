# Clay - Minimal Styled Components with ecsstatic

A minimal, type-safe `clay` function for React that uses [ecsstatic](https://ecsstatic.dev) under the hood.

## 📚 [Documentation](https://alexradulescu.github.io/clay/)

Visit our [interactive documentation site](https://alexradulescu.github.io/clay/) for live examples and detailed guides!

## Installation

```bash
npm install @alexradulescu/clay @acab/ecsstatic
# or
bun add @alexradulescu/clay @acab/ecsstatic
# or
pnpm add @alexradulescu/clay @acab/ecsstatic
```

## Features

- ✅ **Minimal API** - Simple `clay.div` syntax like styled-components
- ✅ **Type-safe** - Full TypeScript support with proper types
- ✅ **No interpolation** - Plain CSS only (no JS expressions in template strings)
- ✅ **Static compilation** - Uses ecsstatic for compile-time CSS extraction
- ✅ **Component extension** - Extend existing clay components with `clay(Component)`
- ✅ **Client-side** - Works entirely at build time via Vite plugin

## Usage

### Basic clay components

```tsx
import { clay } from "@alexradulescu/clay";

const Button = clay.button`
  border-radius: 8px;
  padding: 0.6em 1.2em;
  background-color: #1a1a1a;
  cursor: pointer;

  &:hover {
    border-color: #646cff;
  }
`;

export function App() {
  return <Button onClick={() => console.log("clicked")}>Click me</Button>;
}
```

### Extending clay components

```tsx
const Button = clay.button`
  /* button css props */
  padding: 0.6em 1.2em;
  background-color: #1a1a1a;
`;

const PrimaryButton = clay(Button)`
  /* more button css props */
  background: linear-gradient(45deg, #646cff, #bd34fe);
  color: white;
  font-weight: bold;
`;
```

### What it becomes

Under the hood, this is transformed by ecsstatic into:

```tsx
const button = css`
  /* button css props */
  padding: 0.6em 1.2em;
  background-color: #1a1a1a;
`;

export const Button = (props) => {
  return <button {...props} className={button} />;
};

const primaryButton = css`
  /* more button css props */
  background: linear-gradient(45deg, #646cff, #bd34fe);
  color: white;
  font-weight: bold;
`;

export const PrimaryButton = (props) => {
  return <button {...props} className={[button, primaryButton].join(" ")} />;
};
```

## Implementation Details

- **No `any` types** - Fully typed with proper TypeScript generics
- **All HTML elements supported** - Works with `clay.div`, `clay.button`, `clay.span`, etc.
- **Proper className merging** - When extending components, classNames are properly combined
- **Display names** - Components get proper display names for React DevTools
- **No runtime CSS** - All CSS is extracted at build time by ecsstatic

## Requirements

- React 18+
- Vite with ecsstatic plugin configured
- TypeScript (optional but recommended)

## Configuration

Make sure your `vite.config.ts` includes both the clayPlugin and ecsstatic plugin **in this order**:

```ts
import { defineConfig } from "vite";
import { ecsstatic } from "@acab/ecsstatic/vite";
import react from "@vitejs/plugin-react";
import { clayPlugin } from "@alexradulescu/clay/vite";

export default defineConfig({
  plugins: [clayPlugin(), ecsstatic(), react()],
});
```

**Important:** The plugin order matters! `clayPlugin` must come before `ecsstatic`, which must come before `react`.

## Limitations

- **No interpolation** - JavaScript expressions in template strings are not supported (by design)
- **Plain CSS only** - This keeps the implementation minimal and compile-time static
- **No theming** - Use CSS variables instead

## Why?

Clay provides a familiar styled-components API while leveraging ecsstatic's compile-time CSS extraction. The result is:

1. Zero runtime CSS-in-JS overhead
2. Smaller bundle sizes
3. Better performance
4. Full type safety
5. Familiar developer experience

## Publishing

To publish this library to npm:

1. Update the version in `package.json`
2. Build the library:
   ```bash
   bun run build
   ```
3. Publish to npm:
   ```bash
   npm publish
   ```

The `prepublishOnly` script will automatically build the library before publishing.

## Development

### Building the library
```bash
bun run build
```

### Running the example
```bash
cd example
bun install
bun run dev
```

### Working on the documentation site
```bash
cd docs
bun install
bun run dev
```

The documentation site is automatically deployed to GitHub Pages on every push to `main`. See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for setup instructions.

## License

MIT
