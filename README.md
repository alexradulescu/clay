# Clay

A minimal, type-safe CSS-in-JS library for React with zero runtime overhead.

Clay provides a familiar `styled-components` API while leveraging [ecsstatic](https://ecsstatic.dev) for compile-time CSS extraction. Write `clay.button` or `clay(Component)`, and your styles are extracted to static CSS files at build time.

```tsx
import { clay } from "@alexradulescu/clay";

const Button = clay.button`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.375rem;

  &:hover {
    background: #2563eb;
  }
`;

// Use it like any React component
<Button onClick={handleClick}>Click me</Button>
```

---

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Examples](#examples)
- [How It Works](#how-it-works)
- [CSS Features](#css-features)
- [TypeScript Support](#typescript-support)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Quick Start

**1. Install:**

```bash
npm install @alexradulescu/clay
```

**2. Configure Vite** (create or update `vite.config.ts`):

```ts
import { defineConfig } from "vite";
import { clay } from "@alexradulescu/clay/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    clay(),    // Handles transformation + CSS extraction
    react(),   // React handles JSX
  ],
});
```

**3. Create a styled component:**

```tsx
import { clay } from "@alexradulescu/clay";

const Card = clay.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export function App() {
  return <Card>Hello, Clay!</Card>;
}
```

**4. Run your app:**

```bash
npm run dev
```

---

## Installation

```bash
# npm
npm install @alexradulescu/clay

# pnpm
pnpm add @alexradulescu/clay

# bun
bun add @alexradulescu/clay
```

### Requirements

| Dependency | Version |
|------------|---------|
| React | 18.0.0+ |
| Vite | 5.0.0+ |
| TypeScript | Optional (recommended) |

> **Note:** Clay includes ecsstatic as a dependency - no need to install it separately!

---

## Configuration

### Vite Configuration

Create or update your `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import { clay } from "@alexradulescu/clay/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    clay(),    // Handles transformation + CSS extraction
    react(),   // Handles JSX
  ],
});
```

That's it! The `clay()` plugin handles everything automatically.

<details>
<summary><b>Advanced:</b> Using individual plugins for fine-grained control</summary>

If you need fine-grained control, you can use the individual plugins:

```ts
import { defineConfig } from "vite";
import { clayPlugin } from "@alexradulescu/clay/vite";
import { ecsstatic } from "@acab/ecsstatic/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    clayPlugin(),   // Transform clay syntax
    ecsstatic(),    // Extract CSS to files
    react(),        // Handle JSX
  ],
});
```

**Important:** If using individual plugins, the order matters:
1. `clayPlugin()` must be first
2. `ecsstatic()` must be second
3. `react()` must be last

</details>

### TypeScript Configuration (Optional)

No special TypeScript configuration is required. Clay exports full type definitions.

If using path aliases, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

---

## API Reference

### `clay.element`

Creates a styled component from any HTML element.

```tsx
clay.tagName`css styles`
```

**Syntax:**
```tsx
const Component = clay.div`
  /* CSS styles */
`;
```

**Parameters:**
- `tagName` - Any valid HTML element (`div`, `button`, `span`, `a`, `input`, etc.)
- Template literal containing CSS styles

**Returns:** A React component with the same props as the HTML element

**Example:**
```tsx
const Container = clay.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Link = clay.a`
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Usage
<Container>
  <Link href="/about">About</Link>
</Container>
```

### `clay(Component)`

Extends an existing Clay component with additional styles.

```tsx
clay(BaseComponent)`additional css styles`
```

**Syntax:**
```tsx
const ExtendedComponent = clay(BaseComponent)`
  /* Additional CSS styles */
`;
```

**Parameters:**
- `BaseComponent` - An existing Clay component to extend
- Template literal containing additional CSS styles

**Returns:** A new React component with combined styles

**Example:**
```tsx
const Button = clay.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
`;

const PrimaryButton = clay(Button)`
  background: #3b82f6;
  color: white;
`;

const DangerButton = clay(Button)`
  background: #ef4444;
  color: white;
`;

// Usage - all buttons share base styles
<Button>Default</Button>
<PrimaryButton>Primary</PrimaryButton>
<DangerButton>Danger</DangerButton>
```

### Props

All Clay components accept the same props as their underlying HTML element:

```tsx
const Button = clay.button`
  padding: 0.5rem 1rem;
`;

// All button props work
<Button
  onClick={handleClick}
  disabled={isLoading}
  type="submit"
  className="extra-class"  // className is merged with generated class
  aria-label="Submit form"
>
  Submit
</Button>
```

**className Merging:**

When you pass a `className` prop, it's automatically merged with the generated class:

```tsx
const Box = clay.div`
  padding: 1rem;
`;

// Both classes are applied
<Box className="mt-4">Content</Box>
// Renders: <div class="generated-abc123 mt-4">Content</div>
```

### `createGlobalStyle`

Creates a component that applies global CSS styles.

```tsx
createGlobalStyle`css styles`
```

**Syntax:**
```tsx
const GlobalStyle = createGlobalStyle`
  /* Global CSS styles */
`;
```

**Parameters:**
- Template literal containing global CSS styles

**Returns:** A React component that renders nothing but applies global styles

**Example:**
```tsx
import { createGlobalStyle } from "@alexradulescu/clay";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

// Usage in your app
function App() {
  return (
    <>
      <GlobalStyle />
      <YourApp />
    </>
  );
}
```

**Theme Variables Example:**
```tsx
const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #667eea;
    --color-secondary: #764ba2;
    --spacing-unit: 0.25rem;
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
  }
`;
```

**Dark Mode Example:**
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

### `css`

For one-off styles without creating a component, use the `css` function:

```tsx
import { css } from "@alexradulescu/clay";

const dynamicClass = css`
  color: red;
  font-weight: bold;
`;

<div className={dynamicClass}>Styled text</div>
```

---

## Examples

### Basic Styled Components

```tsx
import { clay } from "@alexradulescu/clay";

// Styled div
const Card = clay.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Styled button with hover state
const Button = clay.button`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

// Styled input
const Input = clay.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;
```

### Component Extension

```tsx
// Base button
const Button = clay.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
`;

// Variants extending base button
const PrimaryButton = clay(Button)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = clay(Button)`
  background: #f3f4f6;
  color: #374151;

  &:hover {
    background: #e5e7eb;
  }
`;

const DangerButton = clay(Button)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
`;

// You can extend extended components too
const LargePrimaryButton = clay(PrimaryButton)`
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
`;
```

### Responsive Design with Media Queries

```tsx
const Container = clay.div`
  padding: 1rem;
  max-width: 100%;

  @media (min-width: 640px) {
    padding: 1.5rem;
    max-width: 640px;
  }

  @media (min-width: 768px) {
    padding: 2rem;
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }
`;

const Grid = clay.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
```

### CSS Variables for Theming

```tsx
// Define CSS variables in your global CSS or a parent component
const ThemeProvider = clay.div`
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-danger: #ef4444;
  --color-text: #1f2937;
  --color-background: #ffffff;
  --radius: 0.375rem;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Use CSS variables in components
const Button = clay.button`
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius);

  &:hover {
    background: var(--color-primary-hover);
  }
`;

const Card = clay.div`
  background: var(--color-background);
  color: var(--color-text);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`;

// Usage with dark mode
function App() {
  return (
    <ThemeProvider style={{
      '--color-background': isDark ? '#1f2937' : '#ffffff',
      '--color-text': isDark ? '#f9fafb' : '#1f2937',
    }}>
      <Card>Themed content</Card>
    </ThemeProvider>
  );
}
```

### Complex Selectors

```tsx
const Navigation = clay.nav`
  display: flex;
  gap: 1rem;

  /* Direct child selector */
  > a {
    color: #374151;
    text-decoration: none;

    &:hover {
      color: #3b82f6;
    }
  }

  /* Sibling selector */
  > a + a {
    border-left: 1px solid #e5e7eb;
    padding-left: 1rem;
  }
`;

const List = clay.ul`
  list-style: none;
  padding: 0;

  /* Descendant selector */
  li {
    padding: 0.5rem 0;

    &:not(:last-child) {
      border-bottom: 1px solid #e5e7eb;
    }
  }

  /* Nested hover */
  li:hover {
    background: #f9fafb;
  }
`;
```

### Form Layout

```tsx
const Form = clay.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
`;

const FormGroup = clay.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = clay.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = clay.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = clay.button`
  padding: 0.625rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

// Usage
function ContactForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <Input id="message" as="textarea" placeholder="Your message..." />
      </FormGroup>
      <SubmitButton type="submit">Send</SubmitButton>
    </Form>
  );
}
```

### Complete Application Example

```tsx
// App.tsx
import { clay } from "@alexradulescu/clay";

// Layout components
const AppContainer = clay.div`
  min-height: 100vh;
  background: #f9fafb;
`;

const Header = clay.header`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;

  @media (min-width: 768px) {
    padding: 1rem 4rem;
  }
`;

const Main = clay.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

// Typography
const Title = clay.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Text = clay.p`
  color: #4b5563;
  line-height: 1.6;
`;

// Interactive components
const Button = clay.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }
`;

const Card = clay.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Application
export function App() {
  return (
    <AppContainer>
      <Header>
        <Title>My App</Title>
      </Header>
      <Main>
        <Card>
          <Text>Welcome to Clay!</Text>
          <Button onClick={() => alert('Clicked!')}>
            Get Started
          </Button>
        </Card>
      </Main>
    </AppContainer>
  );
}
```

---

## How It Works

### Build-Time Transformation

Clay uses a Vite plugin to transform your code at build time. Here's what happens:

**Your code:**
```tsx
import { clay } from "@alexradulescu/clay";

const Button = clay.button`
  padding: 0.5rem 1rem;
  background: #3b82f6;
`;

const PrimaryButton = clay(Button)`
  font-weight: bold;
`;
```

**After clayPlugin transforms it:**
```tsx
import { css } from "@acab/ecsstatic";

const Button = ((c) => (props) => (
  <button {...props} className={props.className ? props.className + ' ' + c : c} />
))(css`
  padding: 0.5rem 1rem;
  background: #3b82f6;
`);

const PrimaryButton = ((c) => (props) => (
  <Button {...props} className={props.className ? props.className + ' ' + c : c} />
))(css`
  font-weight: bold;
`);
```

**After ecsstatic extracts CSS:**
```tsx
// JavaScript (in your bundle)
const Button = (props) => (
  <button {...props} className={props.className ? props.className + ' ' + '_abc123' : '_abc123'} />
);

const PrimaryButton = (props) => (
  <Button {...props} className={props.className ? props.className + ' ' + '_def456' : '_def456'} />
);
```

```css
/* Extracted CSS file */
._abc123 {
  padding: 0.5rem 1rem;
  background: #3b82f6;
}
._def456 {
  font-weight: bold;
}
```

### CSS Bundling

Clay follows Vite's code-splitting behavior for CSS:

**Single Entry Point → Single CSS File:**
```tsx
// All components imported synchronously
import { Button } from "./Button";
import { Card } from "./Card";
import { Header } from "./Header";

// Build output:
// dist/assets/index.css  ← All CSS combined
```

**Lazy Loading → Multiple CSS Files:**
```tsx
// Route-based code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

// Build output:
// dist/assets/index.css      ← Shared/initial CSS
// dist/assets/Dashboard.css  ← Dashboard-specific CSS
// dist/assets/Settings.css   ← Settings-specific CSS
```

---

## CSS Features

Clay supports all standard CSS features. The CSS is passed directly to ecsstatic with no modifications.

### Supported Features

| Feature | Example |
|---------|---------|
| Pseudo-classes | `&:hover`, `&:focus`, `&:disabled`, `&:first-child` |
| Pseudo-elements | `&::before`, `&::after`, `&::placeholder` |
| Media queries | `@media (min-width: 768px) { ... }` |
| CSS variables | `var(--color-primary)`, `var(--spacing, 1rem)` |
| Nested selectors | `& > div`, `& + span`, `& .child` |
| Keyframe animations | `@keyframes` (define in global CSS) |
| All CSS properties | `grid`, `flex`, `transform`, `filter`, etc. |

### Animation Example

```tsx
// Define keyframes in global CSS
// index.css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

// Use in Clay components
const FadeIn = clay.div`
  animation: fadeIn 0.3s ease-out;
`;

const SlideUp = clay.div`
  animation: slideUp 0.4s ease-out;
`;
```

---

## TypeScript Support

Clay is written in TypeScript and provides full type safety.

### Automatic Props Inference

Clay components automatically inherit props from their HTML element:

```tsx
const Button = clay.button`
  padding: 0.5rem;
`;

// TypeScript knows all button props
<Button
  onClick={(e) => {}}      // MouseEventHandler<HTMLButtonElement>
  disabled={true}          // boolean
  type="submit"            // "button" | "submit" | "reset"
  form="my-form"           // string
  // ... all other button attributes
/>

const Input = clay.input`
  padding: 0.5rem;
`;

// TypeScript knows all input props
<Input
  value={text}             // string | number | readonly string[]
  onChange={(e) => {}}     // ChangeEventHandler<HTMLInputElement>
  type="email"             // HTMLInputTypeAttribute
  placeholder="Email"      // string
  required                 // boolean
/>
```

### Type Exports

```tsx
import { clay, ClayComponent } from "@alexradulescu/clay";

// ClayComponent<T> is the type of a clay component
const Button: ClayComponent<"button"> = clay.button`
  padding: 0.5rem;
`;
```

### No Interpolation (By Design)

Clay intentionally does not support JavaScript interpolation in template literals:

```tsx
// This will cause a TypeScript error
const Button = clay.button`
  padding: ${spacing}rem;  // Error: interpolations are not allowed
`;

// Instead, use CSS variables
const Button = clay.button`
  padding: var(--spacing);
`;
```

This constraint ensures all CSS can be statically extracted at build time.

---

## Limitations

Clay is intentionally minimal. These limitations are by design:

| Limitation | Reason | Alternative |
|------------|--------|-------------|
| No interpolation | Enables static extraction | Use CSS variables |
| No dynamic styles | Zero runtime overhead | Use inline `style` prop or CSS variables |
| No theming API | Keep library minimal | Use CSS variables + context |
| Vite only | Leverages Vite's plugin system | — |
| `const` declarations only | Simplifies transformation | Always use `const` |

### When NOT to Use Clay

- You need runtime-dynamic styles based on props
- You need a full theming system with TypeScript support
- You're not using Vite
- You need SSR with critical CSS extraction (ecsstatic limitation)

### Alternatives

- **Runtime styling needed:** [styled-components](https://styled-components.com), [emotion](https://emotion.sh)
- **Utility-first:** [Tailwind CSS](https://tailwindcss.com)
- **Full theming:** [vanilla-extract](https://vanilla-extract.style), [Panda CSS](https://panda-css.com)

---

## Troubleshooting

### "clay should be transformed by vite-plugin-clay"

**Cause:** The Clay plugin is not configured or not running.

**Solutions:**
1. Ensure `clayPlugin()` is in your `vite.config.ts`
2. Verify plugin order: `clayPlugin()` must be first
3. Restart your dev server after config changes

```ts
// vite.config.ts
import { clayPlugin } from "@alexradulescu/clay/vite";

export default defineConfig({
  plugins: [
    clayPlugin(),   // Must be first!
    ecsstatic(),
    react(),
  ],
});
```

### Styles Not Appearing

**Cause:** Plugin order is wrong or ecsstatic not configured.

**Solutions:**
1. Check plugin order: `clayPlugin` → `ecsstatic` → `react`
2. Ensure `@acab/ecsstatic` is installed
3. Clear Vite cache: `rm -rf node_modules/.vite`

### TypeScript Errors with Props

**Cause:** Usually incorrect element type or missing type inference.

**Solution:** Ensure you're using the correct HTML element:

```tsx
// Wrong: div doesn't have 'href'
const Link = clay.div`...`;
<Link href="/about" />  // Error!

// Correct: use 'a' for links
const Link = clay.a`...`;
<Link href="/about" />  // Works!
```

### Build Errors with Complex CSS

**Cause:** CSS syntax errors or unsupported features.

**Solution:** Validate your CSS:

```tsx
// Wrong: missing semicolon
const Box = clay.div`
  padding: 1rem
  margin: 1rem;
`;

// Correct
const Box = clay.div`
  padding: 1rem;
  margin: 1rem;
`;
```

### Module Not Found: @acab/ecsstatic

**Cause:** Peer dependency not installed.

**Solution:**
```bash
npm install @acab/ecsstatic
```

---

## Contributing

### Development Setup

```bash
# Clone the repository
git clone https://github.com/alexradulescu/clay.git
cd clay

# Install dependencies
bun install

# Build the library
bun run build

# Run tests
bun run test

# Run tests with UI
bun run test:ui
```

### Running the Example

```bash
cd example
bun install
bun run dev
```

### Project Structure

```
clay/
├── src/
│   ├── clay.tsx              # Core types and runtime stub
│   ├── vite-plugin-clay.ts   # Vite plugin implementation
│   ├── index.ts              # Main exports
│   ├── vite.ts               # Plugin export
│   └── __tests__/            # Test files
├── example/                   # Example application
├── docs/                      # Documentation site
└── dist/                      # Built output
```

### Architecture

1. **clay.tsx** - Exports the `clay` proxy object with TypeScript types. At runtime, this throws an error if the plugin didn't transform the code.

2. **vite-plugin-clay.ts** - Transforms `clay.element\`css\`` syntax into `css\`css\`` calls that ecsstatic can process. Runs before ecsstatic in the Vite pipeline.

3. **The transformation:**
   - Input: `const Button = clay.button\`padding: 1rem;\``
   - Output: `const Button = ((c) => (props) => <button {...props} className={...} />)(css\`padding: 1rem;\`)`

---

## License

MIT

---

## Links

- [GitHub Repository](https://github.com/alexradulescu/clay)
- [npm Package](https://www.npmjs.com/package/@alexradulescu/clay)
- [Interactive Documentation](https://alexradulescu.github.io/clay/)
- [ecsstatic](https://ecsstatic.dev) - The CSS extraction library Clay uses
