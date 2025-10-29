import { Section, SectionTitle, CodeBlock } from "./shared";

export function UsageSection() {
  return (
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
  );
}
