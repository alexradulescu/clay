import { useState } from "react";
import { clay, createGlobalStyle } from "@alexradulescu/clay";

// ============================================================================
// Global Styles
// ============================================================================

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
`;

// ============================================================================
// Layout Components
// ============================================================================

/**
 * Main container with responsive padding using media queries.
 */
export const Container = clay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

/**
 * Responsive grid that changes columns based on viewport width.
 */
export const Grid = clay.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ============================================================================
// Typography Components
// ============================================================================

/**
 * Gradient title with responsive font size.
 */
export const Title = clay.h1`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (min-width: 640px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

/**
 * Section heading.
 */
export const Heading = clay.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
`;

/**
 * Body text with comfortable line height.
 */
export const Text = clay.p`
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
`;

// ============================================================================
// Button Components - Demonstrating Component Extension
// ============================================================================

/**
 * Base button with common styles.
 * All button variants extend from this.
 */
export const Button = clay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * Primary button - extends Button with primary colors.
 */
export const PrimaryButton = clay(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

/**
 * Secondary button - extends Button with subtle colors.
 */
export const SecondaryButton = clay(Button)`
  background: #f3f4f6;
  color: #374151;

  &:hover:not(:disabled) {
    background: #e5e7eb;
  }
`;

/**
 * Danger button - extends Button with danger colors.
 */
export const DangerButton = clay(Button)`
  background: #ef4444;
  color: white;

  &:hover:not(:disabled) {
    background: #dc2626;
  }
`;

/**
 * Ghost button - extends Button with transparent background.
 */
export const GhostButton = clay(Button)`
  background: transparent;
  color: #667eea;

  &:hover:not(:disabled) {
    background: rgba(102, 126, 234, 0.1);
  }
`;

/**
 * Large primary button - extends PrimaryButton (demonstrates nested extension).
 */
export const LargePrimaryButton = clay(PrimaryButton)`
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
`;

// ============================================================================
// Card Components
// ============================================================================

/**
 * Card container with shadow and hover effect.
 */
export const Card = clay.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

/**
 * Card with nested styling for children.
 */
export const FeatureCard = clay(Card)`
  /* Style direct children */
  > h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
  }

  > p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
  }
`;

// ============================================================================
// Form Components
// ============================================================================

/**
 * Form container with flex layout.
 */
export const Form = clay.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/**
 * Form group for label + input pairs.
 */
export const FormGroup = clay.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

/**
 * Form label.
 */
export const Label = clay.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

/**
 * Text input with focus styles.
 */
export const Input = clay.input`
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  font-family: inherit;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

// ============================================================================
// CSS Variables Example - Theming
// ============================================================================

/**
 * Theme provider that sets CSS variables.
 * Children can use var(--color-*) to access theme colors.
 */
export const ThemeProvider = clay.div`
  --color-primary: #667eea;
  --color-primary-hover: #5a67d8;
  --color-secondary: #764ba2;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-background: #f9fafb;
  --color-surface: #ffffff;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-text);
`;

/**
 * Badge using CSS variables from theme.
 */
export const Badge = clay.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
`;

// ============================================================================
// Interactive Demo Components
// ============================================================================

/**
 * Counter display with large text.
 */
export const CounterDisplay = clay.div`
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  color: #667eea;
  font-variant-numeric: tabular-nums;
`;

/**
 * Button group with flex layout.
 */
export const ButtonGroup = clay.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

// ============================================================================
// Navigation Example
// ============================================================================

/**
 * Navigation with styled links.
 */
export const Nav = clay.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);

  > a {
    color: var(--color-text-muted);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: var(--color-primary);
    }
  }
`;

// ============================================================================
// Application
// ============================================================================

/**
 * Interactive counter component demonstrating className merging.
 */
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <Heading>Interactive Counter</Heading>
      <Text>Demonstrates state management with Clay components.</Text>
      <CounterDisplay>{count}</CounterDisplay>
      <ButtonGroup>
        <SecondaryButton onClick={() => setCount((c) => c - 1)}>
          Decrease
        </SecondaryButton>
        <DangerButton onClick={() => setCount(0)}>Reset</DangerButton>
        <PrimaryButton onClick={() => setCount((c) => c + 1)}>
          Increase
        </PrimaryButton>
      </ButtonGroup>
    </Card>
  );
}

/**
 * Form demo component.
 */
function FormDemo() {
  return (
    <Card>
      <Heading>Form Example</Heading>
      <Text>Demonstrates form components with focus states.</Text>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted!");
        }}
      >
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Enter your name" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </FormGroup>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>
    </Card>
  );
}

/**
 * Button variants showcase.
 */
function ButtonShowcase() {
  return (
    <Card>
      <Heading>Button Variants</Heading>
      <Text>Demonstrates component extension with different button styles.</Text>
      <ButtonGroup>
        <PrimaryButton>Primary</PrimaryButton>
        <SecondaryButton>Secondary</SecondaryButton>
        <DangerButton>Danger</DangerButton>
        <GhostButton>Ghost</GhostButton>
      </ButtonGroup>
      <ButtonGroup>
        <LargePrimaryButton>Large Primary (Nested Extension)</LargePrimaryButton>
      </ButtonGroup>
      <ButtonGroup>
        {/* Demonstrates className merging - custom class is preserved */}
        <PrimaryButton className="custom-tracking-class">
          With Custom Class
        </PrimaryButton>
      </ButtonGroup>
    </Card>
  );
}

/**
 * Main application component.
 */
export function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        <Container>
        <Title>Clay Examples</Title>
        <Text>
          A showcase of Clay components demonstrating various CSS features
          including media queries, CSS variables, pseudo-classes, component
          extension, and className merging.
        </Text>

        <Nav>
          <a href="#buttons">Buttons</a>
          <a href="#forms">Forms</a>
          <a href="#interactive">Interactive</a>
        </Nav>

        <Grid>
          <ButtonShowcase />
          <FormDemo />
          <Counter />

          <FeatureCard>
            <h3>Zero Runtime</h3>
            <p>All CSS is extracted at build time. No CSS-in-JS overhead.</p>
          </FeatureCard>

          <FeatureCard>
            <h3>Type Safe</h3>
            <p>Full TypeScript support with proper props inference.</p>
          </FeatureCard>

          <FeatureCard>
            <h3>
              Familiar API <Badge>New</Badge>
            </h3>
            <p>
              Works just like styled-components but with static extraction.
            </p>
          </FeatureCard>
        </Grid>
      </Container>
    </ThemeProvider>
    </>
  );
}
