import { clay } from "clay";

// Basic clay component
export const Button = clay.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

// Extending an existing clay component
export const PrimaryButton = clay(Button)`
  background: linear-gradient(45deg, #646cff, #bd34fe);
  color: white;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
    border-color: #bd34fe;
  }
`;

const SpecialButton = clay(PrimaryButton)`
    background: linear-gradient(45deg, red, brown);
`;

// More examples
export const Container = clay.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = clay.h1`
  font-size: 3.2em;
  line-height: 1.1;
  background: linear-gradient(45deg, #646cff, #bd34fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// Usage example
export function App() {
  return (
    <Container>
      <Title>Styled Components Example</Title>
      <Button onClick={() => console.log("clicked")}>Click me</Button>
      <PrimaryButton onClick={() => console.log("primary clicked")}>
        Primary Button
      </PrimaryButton>
      <SpecialButton>3rd extension</SpecialButton>
    </Container>
  );
}
