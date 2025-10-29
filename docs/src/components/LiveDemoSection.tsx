import { clay } from "@alexradulescu/clay";
import { useState } from "react";
import { Section, SectionTitle } from "./shared";

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

export function LiveDemoSection() {
  const [count, setCount] = useState(0);

  return (
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
  );
}
