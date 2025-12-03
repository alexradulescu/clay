import { Section, SectionTitle, CodeBlock } from "./shared";

export function GlobalStylesSection() {
  return (
    <Section>
      <SectionTitle>Global Styles</SectionTitle>
      <p>Use <code>createGlobalStyle</code> to apply global CSS styles to your app:</p>
      <CodeBlock>{`import { createGlobalStyle } from "@alexradulescu/clay";

const GlobalStyle = createGlobalStyle\`
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
\`;

// Usage in your app
function App() {
  return (
    <>
      <GlobalStyle />
      <YourApp />
    </>
  );
}`}</CodeBlock>

      <p>Create theme variables and dark mode support:</p>
      <CodeBlock>{`const GlobalStyle = createGlobalStyle\`
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
\`;`}</CodeBlock>
    </Section>
  );
}
