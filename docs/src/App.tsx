import { clay } from "@alexradulescu/clay";
import { lazy, Suspense } from "react";
import { Section, SectionTitle } from "./components/shared";

// Lazy load sections to demonstrate CSS code splitting
const FeaturesSection = lazy(() => import("./components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const UsageSection = lazy(() => import("./components/UsageSection").then(m => ({ default: m.UsageSection })));
const LiveDemoSection = lazy(() => import("./components/LiveDemoSection").then(m => ({ default: m.LiveDemoSection })));
const CSSBundlingSection = lazy(() => import("./components/CSSBundlingSection").then(m => ({ default: m.CSSBundlingSection })));
const ResourcesSection = lazy(() => import("./components/ResourcesSection").then(m => ({ default: m.ResourcesSection })));

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

const InstallCommand = clay.div`
  background: #2d2d2d;
  color: #4ec9b0;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin: 1rem 0;
  display: inline-block;
`;

const LoadingPlaceholder = clay.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #667eea;
  font-size: 1.2rem;
`;

const InlineCode = clay.code`
  background: #f4f4f4;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  color: #e83e8c;
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
