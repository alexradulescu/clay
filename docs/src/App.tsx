import { clay } from "@alexradulescu/clay";
import { useState } from "react";

// Layout
const Page = clay.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Hero = clay.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = clay.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
`;

const Tagline = clay.p`
  color: #666;
  font-size: 1.125rem;
  margin: 0;
`;

const Section = clay.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = clay.h2`
  font-size: 1.5rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
`;

const Code = clay.pre`
  background: #1a1a1a;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 1rem 0;
`;

const InlineCode = clay.code`
  background: #f4f4f5;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
`;

const Step = clay.div`
  margin: 1.5rem 0;
`;

const StepNumber = clay.span`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const Grid = clay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const Card = clay.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const CardTitle = clay.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem;
`;

const CardText = clay.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

// Demo components
const DemoButton = clay.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 0.5rem;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = clay(DemoButton)`
  background: #6b7280;

  &:hover {
    background: #4b5563;
  }
`;

const DemoBox = clay.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  margin: 1rem 0;
`;

const Counter = clay.div`
  font-size: 3rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const Link = clay.a`
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = clay.footer`
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 0.875rem;
`;

export function App() {
  const [count, setCount] = useState(0);

  return (
    <Page>
      <Hero>
        <Title>🏺 Clay</Title>
        <Tagline>Minimal, type-safe styled components for React with zero runtime</Tagline>
      </Hero>

      {/* Quick Start */}
      <Section>
        <SectionTitle>Quick Start</SectionTitle>

        <Step>
          <StepNumber>1</StepNumber>
          <strong>Install</strong>
          <Code>npm install @alexradulescu/clay</Code>
        </Step>

        <Step>
          <StepNumber>2</StepNumber>
          <strong>Configure Vite</strong>
          <Code>{`// vite.config.ts
import { defineConfig } from "vite";
import { clay } from "@alexradulescu/clay/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [clay(), react()],
});`}</Code>
        </Step>

        <Step>
          <StepNumber>3</StepNumber>
          <strong>Create styled components</strong>
          <Code>{`import { clay } from "@alexradulescu/clay";

const Button = clay.button\`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 6px;

  &:hover {
    background: #2563eb;
  }
\`;

<Button onClick={handleClick}>Click me</Button>`}</Code>
        </Step>
      </Section>

      {/* Live Demo */}
      <Section>
        <SectionTitle>Try It</SectionTitle>
        <p>These buttons are styled with Clay:</p>
        <DemoBox>
          <Counter>{count}</Counter>
          <DemoButton onClick={() => setCount(c => c + 1)}>Increment</DemoButton>
          <SecondaryButton onClick={() => setCount(0)}>Reset</SecondaryButton>
        </DemoBox>
      </Section>

      {/* API */}
      <Section>
        <SectionTitle>API</SectionTitle>

        <h3>clay.element</h3>
        <p>Style any HTML element:</p>
        <Code>{`const Card = clay.div\`
  padding: 1rem;
  border-radius: 8px;
\`;

const Input = clay.input\`
  padding: 0.5rem;
  border: 1px solid #ccc;
\`;`}</Code>

        <h3>clay(Component)</h3>
        <p>Extend existing components:</p>
        <Code>{`const Button = clay.button\`
  padding: 0.5rem 1rem;
\`;

const PrimaryButton = clay(Button)\`
  background: #3b82f6;
  color: white;
\`;`}</Code>

        <h3>createGlobalStyle</h3>
        <p>Apply global styles:</p>
        <Code>{`import { createGlobalStyle } from "@alexradulescu/clay";

const GlobalStyle = createGlobalStyle\`
  * { box-sizing: border-box; }
  body { margin: 0; font-family: sans-serif; }
\`;

// In your app
<GlobalStyle />
<App />`}</Code>
      </Section>

      {/* Features */}
      <Section>
        <SectionTitle>Features</SectionTitle>
        <Grid>
          <Card>
            <CardTitle>⚡ Zero Runtime</CardTitle>
            <CardText>CSS extracted at build time. No runtime overhead.</CardText>
          </Card>
          <Card>
            <CardTitle>🎯 Type-Safe</CardTitle>
            <CardText>Full TypeScript support. Components inherit HTML props.</CardText>
          </Card>
          <Card>
            <CardTitle>🎨 Familiar API</CardTitle>
            <CardText>styled-components syntax you already know.</CardText>
          </Card>
          <Card>
            <CardTitle>📦 Tiny</CardTitle>
            <CardText>The library compiles away. Only CSS remains.</CardText>
          </Card>
        </Grid>
      </Section>

      {/* How It Works */}
      <Section>
        <SectionTitle>How It Works</SectionTitle>
        <p>Clay transforms your code at build time:</p>
        <Code>{`// You write:
const Button = clay.button\`padding: 1rem;\`;

// Becomes:
const Button = (props) => <button {...props} className="abc123" />;

// CSS extracted to static file:
.abc123 { padding: 1rem; }`}</Code>
        <p>
          Built on <Link href="https://ecsstatic.dev" target="_blank">ecsstatic</Link> for CSS extraction.
        </p>
      </Section>

      {/* Resources */}
      <Section>
        <SectionTitle>Resources</SectionTitle>
        <p>
          <Link href="https://github.com/alexradulescu/clay" target="_blank">GitHub</Link>
          {" · "}
          <Link href="https://www.npmjs.com/package/@alexradulescu/clay" target="_blank">npm</Link>
          {" · "}
          <Link href="https://github.com/alexradulescu/clay#readme" target="_blank">Full Documentation</Link>
        </p>
      </Section>

      <Footer>
        Made with Clay · <Link href="https://github.com/alexradulescu/clay">View on GitHub</Link>
      </Footer>
    </Page>
  );
}
