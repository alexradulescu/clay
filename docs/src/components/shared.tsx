import { clay } from "@alexradulescu/clay";

// Shared styled components with Greek-inspired design
export const Section = clay.section`
  background: #ffffff;
  border: 2px solid #e8e8e8;
  border-top: 4px solid #2c3e50;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: relative;

  /* Classical corner accents */
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 0;
    width: 60px;
    height: 4px;
    background: #8b7355;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }
`;

export const SectionTitle = clay.h2`
  font-size: 1.875rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #09090b;
  font-family: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;
  font-weight: 600;
  letter-spacing: -0.02em;
  border-bottom: 2px solid #e4e4e7;
  padding-bottom: 0.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background: #8b7355;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const CodeBlock = clay.pre`
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

export const InlineCode = clay.code`
  background: #f4f4f5;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875em;
  color: #18181b;
  font-weight: 500;
`;

export const Link = clay.a`
  color: #18181b;
  text-decoration: underline;
  text-decoration-color: #8b7355;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #8b7355;
    text-decoration-color: #18181b;
  }
`;
