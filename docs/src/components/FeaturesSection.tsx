import { clay } from "@alexradulescu/clay";
import { Section, SectionTitle, InlineCode } from "./shared";

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

export function FeaturesSection() {
  return (
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
  );
}
