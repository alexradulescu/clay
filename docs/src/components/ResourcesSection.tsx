import { Section, SectionTitle, Link } from "./shared";

export function ResourcesSection() {
  return (
    <Section>
      <SectionTitle>Resources</SectionTitle>
      <p>
        <Link href="https://github.com/alexradulescu/clay" target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </Link>
        {" • "}
        <Link href="https://www.npmjs.com/package/@alexradulescu/clay" target="_blank" rel="noopener noreferrer">
          npm Package
        </Link>
        {" • "}
        <Link href="https://ecsstatic.dev" target="_blank" rel="noopener noreferrer">
          ecsstatic Documentation
        </Link>
      </p>
    </Section>
  );
}
