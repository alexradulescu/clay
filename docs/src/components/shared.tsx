import { clay } from "@alexradulescu/clay";

// Shared styled components with Greek-inspired design
export const Section = clay.section`
  background: #ffffff;
  border: 2px solid #e8e8e8;
  border-top: 4px solid #2c3e50;
  padding: 3rem;
  margin-bottom: 3rem;
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
    padding: 2rem 1.5rem;
  }
`;

export const SectionTitle = clay.h2`
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-family: 'Cinzel', serif;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 1rem;
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
    font-size: 2rem;
  }
`;

export const CodeBlock = clay.pre`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 2rem;
  border-left: 4px solid #8b7355;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const InlineCode = clay.code`
  background: #f8f9fa;
  padding: 0.2em 0.5em;
  border: 1px solid #e0e0e0;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  color: #8b7355;
`;

export const Link = clay.a`
  color: #2c3e50;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid #8b7355;
  transition: all 0.2s ease;

  &:hover {
    color: #8b7355;
    border-bottom-color: #2c3e50;
  }
`;
