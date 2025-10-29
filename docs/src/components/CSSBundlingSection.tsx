import { Section, SectionTitle, CodeBlock } from "./shared";

export function CSSBundlingSection() {
  return (
    <Section>
      <SectionTitle>CSS Bundling</SectionTitle>
      <p>
        Clay extracts CSS at build time and lets Vite handle the bundling. The number of CSS files depends on your application structure:
      </p>

      <h3 style={{ fontSize: "1.2rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>Single CSS File (Default)</h3>
      <p>
        With a standard SPA entry point, <strong>all CSS from all components</strong> is bundled into <strong>one CSS file</strong>:
      </p>
      <CodeBlock>{`// App.tsx
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
// ... 100 more components

// Build output:
// dist/assets/index.css  ← ALL CSS in one file`}</CodeBlock>

      <h3 style={{ fontSize: "1.2rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>Multiple CSS Files (Code Splitting)</h3>
      <p>
        When using lazy loading / dynamic imports, Vite creates <strong>separate CSS chunks</strong> for each route:
      </p>
      <CodeBlock>{`// App.tsx with route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

// Build output:
// dist/assets/index.css      ← Shared CSS
// dist/assets/dashboard.css  ← Dashboard route CSS
// dist/assets/settings.css   ← Settings route CSS
// dist/assets/profile.css    ← Profile route CSS`}</CodeBlock>

      <p><strong>Key points:</strong></p>
      <ul>
        <li>Components in the same chunk share a CSS file</li>
        <li>CSS is automatically deduplicated and minified</li>
        <li>Works exactly like regular CSS imports in Vite</li>
        <li>No configuration needed - follows your code splitting strategy</li>
      </ul>

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: "#f0f7ff",
        borderLeft: "4px solid #667eea",
        borderRadius: "4px"
      }}>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          <strong>💡 This docs site demonstrates code splitting!</strong> Each section below is lazy-loaded,
          so when you build this site, you'll see multiple CSS files in the output - one for each section.
        </p>
      </div>
    </Section>
  );
}
