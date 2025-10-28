import { clay } from "@alexradulescu/clay";
import { useState } from "react";

// Styled components for the documentation site
const PageContainer = clay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Content = clay.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = clay.header`
  text-align: center;
  padding: 4rem 2rem;
  color: white;
`;

const Title = clay.h1`
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = clay.p`
  font-size: 1.5rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Section = clay.section`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = clay.h2`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
`;

const CodeBlock = clay.pre`
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 1rem 0;
`;

const InlineCode = clay.code`
  background: #f4f4f4;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  color: #e83e8c;
`;

const FeatureGrid = clay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const FeatureCard = clay.div`
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const FeatureTitle = clay.h3`
  margin-top: 0;
  color: #667eea;
  font-size: 1.2rem;
`;

const Button = clay.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-right: 0.5rem;

  &:hover {
    background: #5568d3;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = clay(Button)`
  background: #764ba2;

  &:hover {
    background: #653a8b;
  }
`;

const DemoContainer = clay.div`
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
`;

const Counter = clay.div`
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
  margin: 1rem 0;
`;

const InstallCommand = clay.div`
  background: #2d2d2d;
  color: #4ec9b0;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin: 1rem 0;
  display: inline-block;
`;

const Link = clay.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export function App() {
  const [count, setCount] = useState(0);

  return (
    <PageContainer>
      <Content>
        <Hero>
          <Title>🏺 Clay</Title>
          <Subtitle>
            Minimal, type-safe styled components for React
          </Subtitle>
        </Hero>

        <Section>
          <SectionTitle>Installation</SectionTitle>
          <p>Get started with Clay in seconds:</p>
          <InstallCommand>npm install @alexradulescu/clay @acab/ecsstatic</InstallCommand>
        </Section>

        <Section>
          <SectionTitle>Features</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureTitle>⚡️ Zero Runtime</FeatureTitle>
              <p>All CSS is extracted at build time using ecsstatic. No runtime CSS-in-JS overhead.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>🎯 Type-Safe</FeatureTitle>
              <p>Full TypeScript support with proper types. No <InlineCode>any</InlineCode> types anywhere.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>🎨 Familiar API</FeatureTitle>
              <p>Simple <InlineCode>clay.button</InlineCode> syntax similar to styled-components.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>🔥 Component Extension</FeatureTitle>
              <p>Extend existing components with <InlineCode>clay(Component)</InlineCode> syntax.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>📦 Tiny Bundle</FeatureTitle>
              <p>Minimal footprint - the library compiles away, leaving only CSS classes.</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>⚙️ Build-Time Magic</FeatureTitle>
              <p>Everything happens at build time via Vite plugins. Pure static CSS output.</p>
            </FeatureCard>
          </FeatureGrid>
        </Section>

        <Section>
          <SectionTitle>Usage</SectionTitle>
          <p>Create styled components with a simple, intuitive API:</p>
          <CodeBlock>{`import { clay } from "@alexradulescu/clay";

const Button = clay.button\`
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #5568d3;
  }
\`;

function App() {
  return <Button>Click me!</Button>;
}`}</CodeBlock>

          <p>Extend existing components:</p>
          <CodeBlock>{`const PrimaryButton = clay(Button)\`
  background: #764ba2;
  font-weight: bold;

  &:hover {
    background: #653a8b;
  }
\`;`}</CodeBlock>
        </Section>

        <Section>
          <SectionTitle>Live Demo</SectionTitle>
          <p>Try it out! These buttons are styled with Clay:</p>
          <DemoContainer>
            <Counter>{count}</Counter>
            <div>
              <Button onClick={() => setCount(count + 1)}>Increment</Button>
              <SecondaryButton onClick={() => setCount(0)}>Reset</SecondaryButton>
            </div>
          </DemoContainer>
        </Section>

        <Section>
          <SectionTitle>Configuration</SectionTitle>
          <p>Add Clay to your Vite project:</p>
          <CodeBlock>{`// vite.config.ts
import { defineConfig } from "vite";
import { ecsstatic } from "@acab/ecsstatic/vite";
import react from "@vitejs/plugin-react";
import { clayPlugin } from "@alexradulescu/clay/vite";

export default defineConfig({
  plugins: [clayPlugin(), ecsstatic(), react()],
});`}</CodeBlock>
          <p>
            <strong>Important:</strong> Plugin order matters! <InlineCode>clayPlugin()</InlineCode> must come before{" "}
            <InlineCode>ecsstatic()</InlineCode>, which must come before <InlineCode>react()</InlineCode>.
          </p>
        </Section>

        <Section>
          <SectionTitle>CSS Bundling</SectionTitle>
          <p>
            Clay extracts CSS at build time and lets Vite handle the bundling. The number of CSS files depends on your application structure:
          </p>

          <h3 style={{ fontSize: "1.2rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Single CSS File (Default)</h3>
          <p>
            With a standard SPA entry point, <strong>all CSS from all components</strong> is bundled into <strong>one CSS file</strong>:
          </p>
          <CodeBlock>{`// App.tsx
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
// ... 100 more components

// Build output:
// dist/assets/index.css  ← ALL CSS in one file`}</CodeBlock>

          <h3 style={{ fontSize: "1.2rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Multiple CSS Files (Code Splitting)</h3>
          <p>
            When using lazy loading / dynamic imports, Vite creates <strong>separate CSS chunks</strong> for each route:
          </p>
          <CodeBlock>{`// App.tsx with route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

// Build output:
// dist/assets/index.css      ← Shared CSS
// dist/assets/dashboard.css  ← Dashboard route CSS
// dist/assets/settings.css   ← Settings route CSS
// dist/assets/profile.css    ← Profile route CSS`}</CodeBlock>

          <p><strong>Key points:</strong></p>
          <ul>
            <li>Components in the same chunk share a CSS file</li>
            <li>CSS is automatically deduplicated and minified</li>
            <li>Works exactly like regular CSS imports in Vite</li>
            <li>No configuration needed - follows your code splitting strategy</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>Why Clay?</SectionTitle>
          <p>
            Clay provides a familiar styled-components API while leveraging ecsstatic's compile-time CSS extraction.
            The result is:
          </p>
          <ul>
            <li>Zero runtime CSS-in-JS overhead</li>
            <li>Smaller bundle sizes</li>
            <li>Better performance</li>
            <li>Full type safety</li>
            <li>Familiar developer experience</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>Resources</SectionTitle>
          <p>
            <Link href="https://github.com/alexradulescu/clay" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </Link>
            {" • "}
            <Link href="https://www.npmjs.com/package/@alexradulescu/clay" target="_blank" rel="noopener noreferrer">
              npm Package
            </Link>
            {" • "}
            <Link href="https://ecsstatic.dev" target="_blank" rel="noopener noreferrer">
              ecsstatic Documentation
            </Link>
          </p>
        </Section>
      </Content>
    </PageContainer>
  );
}
