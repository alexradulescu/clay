import { Section, SectionTitle, CodeBlock } from "./shared";

export function UsageSection() {
  return (
    <Section>
      <SectionTitle>Usage</SectionTitle>
      <p>Create styled components with a simple, intuitive API:</p>
      <CodeBlock>{`import { clay } from "@alexradulescu/clay";

const Button = clay.button\`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.375rem;

  &:hover {
    background: #2563eb;
  }
\`;

// Use it like any React component
<Button onClick={handleClick}>Click me</Button>`}</CodeBlock>

      <p>Extend existing components:</p>
      <CodeBlock>{`const PrimaryButton = clay(Button)\`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
\`;

const DangerButton = clay(Button)\`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
\`;`}</CodeBlock>
    </Section>
  );
}
