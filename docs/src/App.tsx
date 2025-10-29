import { clay } from "@alexradulescu/clay";
import { lazy, Suspense } from "react";
import { Section, SectionTitle } from "./components/shared";

// Lazy load sections to demonstrate CSS code splitting
const FeaturesSection = lazy(() => import("./components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const UsageSection = lazy(() => import("./components/UsageSection").then(m => ({ default: m.UsageSection })));
const LiveDemoSection = lazy(() => import("./components/LiveDemoSection").then(m => ({ default: m.LiveDemoSection })));
const CSSBundlingSection = lazy(() => import("./components/CSSBundlingSection").then(m => ({ default: m.CSSBundlingSection })));
const ResourcesSection = lazy(() => import("./components/ResourcesSection").then(m => ({ default: m.ResourcesSection })));

// Styled components for the documentation site with Greek-inspired design
const PageContainer = clay.div`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
  position: relative;

  /* Greek key pattern border at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg,
      #2c3e50 0%, #2c3e50 25%,
      transparent 25%, transparent 50%,
      #2c3e50 50%, #2c3e50 75%,
      transparent 75%, transparent 100%);
    background-size: 40px 8px;
  }
`;

const Content = clay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = clay.header`
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(to bottom, #fafafa 0%, #ffffff 100%);
  border-bottom: 3px solid #2c3e50;
  position: relative;

  /* Classical column decorations on sides */
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: #8b7355;
  }

  @media (max-width: 768px) {
    padding: 4rem 2rem 3rem;
  }
`;

const Title = clay.h1`
  font-size: 5rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  color: #2c3e50;
  font-family: 'Cinzel', serif;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = clay.p`
  font-size: 1.4rem;
  margin: 0;
  font-weight: 400;
  color: #5a6c7d;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const InstallCommand = clay.div`
  background: #f8f9fa;
  color: #2c3e50;
  padding: 1rem 2rem;
  border: 2px solid #e0e0e0;
  border-left: 4px solid #8b7355;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin: 1.5rem 0;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const LoadingPlaceholder = clay.div`
  background: #fafafa;
  border: 2px solid #e0e0e0;
  padding: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #5a6c7d;
  font-size: 1.2rem;
  font-family: 'Cormorant Garamond', serif;
`;

const InlineCode = clay.code`
  background: #f8f9fa;
  padding: 0.2em 0.5em;
  border: 1px solid #e0e0e0;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  color: #8b7355;
`;

const CodeBlock = clay.pre`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 2rem;
  border-left: 4px solid #8b7355;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export function App() {

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

        <Suspense fallback={<LoadingPlaceholder>Loading Features...</LoadingPlaceholder>}>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<LoadingPlaceholder>Loading Usage Examples...</LoadingPlaceholder>}>
          <UsageSection />
        </Suspense>

        <Suspense fallback={<LoadingPlaceholder>Loading Demo...</LoadingPlaceholder>}>
          <LiveDemoSection />
        </Suspense>

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

        <Suspense fallback={<LoadingPlaceholder>Loading CSS Bundling Info...</LoadingPlaceholder>}>
          <CSSBundlingSection />
        </Suspense>

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

        <Suspense fallback={<LoadingPlaceholder>Loading Resources...</LoadingPlaceholder>}>
          <ResourcesSection />
        </Suspense>
      </Content>
    </PageContainer>
  );
}
