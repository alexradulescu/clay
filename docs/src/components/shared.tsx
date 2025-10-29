import { clay } from "@alexradulescu/clay";

// Shared styled components used across the documentation site
export const Section = clay.section`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const SectionTitle = clay.h2`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const CodeBlock = clay.pre`
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

export const InlineCode = clay.code`
  background: #f4f4f4;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  color: #e83e8c;
`;

export const Link = clay.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
