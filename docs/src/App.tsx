import { clay } from "@alexradulescu/clay";
import { lazy, Suspense } from "react";
import { Section, SectionTitle } from "./components/shared";

// Lazy load sections to demonstrate CSS code splitting
const FeaturesSection = lazy(() => import("./components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const UsageSection = lazy(() => import("./components/UsageSection").then(m => ({ default: m.UsageSection })));
const LiveDemoSection = lazy(() => import("./components/LiveDemoSection").then(m => ({ default: m.LiveDemoSection })));
const GlobalStylesSection = lazy(() => import("./components/GlobalStylesSection").then(m => ({ default: m.GlobalStylesSection })));
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
  padding: 1rem;
`;

const Hero = clay.header`
  text-align: center;
  padding: 2.5rem 1rem 1.5rem;
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
    padding: 2rem 1rem 1.5rem;
  }
`;

const Title = clay.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  color: #09090b;
  font-family: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = clay.p`
  font-size: 1.125rem;
  margin: 0;
  font-weight: 400;
  color: #71717a;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InstallCommand = clay.div`
  background: #f4f4f5;
  color: #18181b;
  padding: 0.75rem 1rem;
  border: 1px solid #e4e4e7;
  border-left: 4px solid #8b7355;
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  margin: 1rem 0;
  display: inline-block;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const LoadingPlaceholder = clay.div`
  background: #fafafa;
  border: 1px solid #e4e4e7;
  padding: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
`;

const InlineCode = clay.code`
  background: #f4f4f5;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875em;
  color: #18181b;
  font-weight: 500;
`;

const CodeBlock = clay.pre`
  background: #09090b;
  color: #fafafa;
  padding: 1rem;
  border-left: 4px solid #8b7355;
  overflow-x: auto;
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  margin: 1rem 0;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
          <InstallCommand>npm install @alexradulescu/clay</InstallCommand>
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

        <Suspense fallback={<LoadingPlaceholder>Loading Global Styles...</LoadingPlaceholder>}>
          <GlobalStylesSection />
        </Suspense>

        <Section>
          <SectionTitle>Configuration</SectionTitle>
          <p>Add Clay to your Vite project:</p>
          <CodeBlock>{`// vite.config.ts
import { defineConfig } from "vite";
import { clay } from "@alexradulescu/clay/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    clay(),    // Handles transformation + CSS extraction
    react(),   // React handles JSX
  ],
});`}</CodeBlock>
          <p>
            <strong>That's it!</strong> The <InlineCode>clay()</InlineCode> plugin handles everything automatically.
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
