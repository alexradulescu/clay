import { describe, it, expect } from "vitest";
import { clayPlugin } from "../vite-plugin-clay";

describe("clayPlugin", () => {
  it("should create a vite plugin with correct name", () => {
    const plugin = clayPlugin();
    expect(plugin.name).toBe("vite-plugin-clay");
    expect(plugin.enforce).toBe("pre");
  });

  it("should skip non-tsx/jsx files", () => {
    const plugin = clayPlugin();
    const result = plugin.transform?.("const x = 1;", "/test.ts");
    expect(result).toBeNull();
  });

  it("should skip node_modules", () => {
    const plugin = clayPlugin();
    const result = plugin.transform?.(
      'import { clay } from "clay";',
      "/node_modules/clay/index.tsx"
    );
    expect(result).toBeNull();
  });

  it("should skip files without clay usage", () => {
    const plugin = clayPlugin();
    const result = plugin.transform?.(
      "const x = 1;",
      "/test.tsx"
    );
    expect(result).toBeNull();
  });

  it("should transform clay.button syntax", () => {
    const plugin = clayPlugin();
    const code = `const Button = clay.button\`
  padding: 1rem;
  color: red;
\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    expect(result?.code).toContain('import { css } from "@acab/ecsstatic"');
    expect(result?.code).toContain("const Button = ((c) => (props) => <button");
    expect(result?.code).toContain("css`");
    expect(result?.code).toContain("padding: 1rem");
    expect(result?.code).toContain("color: red");
  });

  it("should transform clay.div syntax", () => {
    const plugin = clayPlugin();
    const code = `const Container = clay.div\`
  max-width: 1280px;
  margin: 0 auto;
\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    expect(result?.code).toContain("const Container = ((c) => (props) => <div");
    expect(result?.code).toContain("max-width: 1280px");
  });

  it("should transform clay(Component) extension syntax", () => {
    const plugin = clayPlugin();
    const code = `const PrimaryButton = clay(Button)\`
  background: blue;
  font-weight: bold;
\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    expect(result?.code).toContain("const PrimaryButton = ((c) => (props) => <Button");
    expect(result?.code).toContain("background: blue");
    expect(result?.code).toContain("font-weight: bold");
  });

  it("should handle multiple clay definitions", () => {
    const plugin = clayPlugin();
    const code = `const Button = clay.button\`
  padding: 1rem;
\`;

const Container = clay.div\`
  margin: 0;
\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    expect(result?.code).toContain("const Button = ((c) => (props) => <button");
    expect(result?.code).toContain("const Container = ((c) => (props) => <div");
  });

  it("should properly merge classNames", () => {
    const plugin = clayPlugin();
    const code = `const Button = clay.button\`padding: 1rem;\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    // Should check if props.className exists and merge it
    expect(result?.code).toContain("props.className ? props.className + ' ' + c : c");
  });

  it("should not add css import if already present", () => {
    const plugin = clayPlugin();
    const code = `import { css } from "@acab/ecsstatic";

const Button = clay.button\`padding: 1rem;\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    // Should only have one css import
    const cssImportCount = (result?.code.match(/import \{ css \} from "@acab\/ecsstatic"/g) || []).length;
    expect(cssImportCount).toBe(1);
  });

  it("should preserve CSS content exactly", () => {
    const plugin = clayPlugin();
    const code = `const Button = clay.button\`
  padding: 1rem 2rem;
  margin: 0.5em 1em;
  background: linear-gradient(45deg, #646cff, #bd34fe);

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    expect(result?.code).toContain("padding: 1rem 2rem");
    expect(result?.code).toContain("margin: 0.5em 1em");
    expect(result?.code).toContain("background: linear-gradient(45deg, #646cff, #bd34fe)");
    expect(result?.code).toContain("&:hover");
    expect(result?.code).toContain("opacity: 0.9");
    expect(result?.code).toContain("@media (max-width: 768px)");
    expect(result?.code).toContain("padding: 0.5rem 1rem");
  });

  it("should generate source maps", () => {
    const plugin = clayPlugin();
    const code = `const Button = clay.button\`padding: 1rem;\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    expect(result?.map).toBeTruthy();
  });

  it("should handle nested component extension", () => {
    const plugin = clayPlugin();
    const code = `const Button = clay.button\`padding: 1rem;\`;
const PrimaryButton = clay(Button)\`background: blue;\`;
const SpecialButton = clay(PrimaryButton)\`color: white;\`;`;
    const result = plugin.transform?.(code, "/test.tsx");

    expect(result).toBeTruthy();
    expect(result?.code).toContain("<button");
    expect(result?.code).toContain("<Button");
    expect(result?.code).toContain("<PrimaryButton");
  });

  // =========================================================================
  // Edge Case Tests
  // =========================================================================

  describe("edge cases", () => {
    it("should handle CSS with special characters", () => {
      const plugin = clayPlugin();
      const code = `const Box = clay.div\`
  content: "Hello";
  background: url('image.png');
  font-family: 'Helvetica Neue', sans-serif;
\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain('content: "Hello"');
      expect(result?.code).toContain("url('image.png')");
      expect(result?.code).toContain("'Helvetica Neue'");
    });

    it("should handle CSS with CSS variables", () => {
      const plugin = clayPlugin();
      const code = `const Box = clay.div\`
  --custom-color: #3b82f6;
  color: var(--custom-color);
  padding: var(--spacing, 1rem);
\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("--custom-color: #3b82f6");
      expect(result?.code).toContain("var(--custom-color)");
      expect(result?.code).toContain("var(--spacing, 1rem)");
    });

    it("should handle CSS with complex selectors", () => {
      const plugin = clayPlugin();
      const code = `const List = clay.ul\`
  & > li {
    padding: 0.5rem;
  }

  & > li:first-child {
    border-top: none;
  }

  & > li:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  &[data-active="true"] {
    background: blue;
  }
\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("& > li");
      expect(result?.code).toContain("& > li:first-child");
      expect(result?.code).toContain("& > li:not(:last-child)");
      expect(result?.code).toContain('&[data-active="true"]');
    });

    it("should handle CSS with multiple media queries", () => {
      const plugin = clayPlugin();
      const code = `const Container = clay.div\`
  padding: 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
  }
\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("@media (min-width: 640px)");
      expect(result?.code).toContain("@media (min-width: 768px)");
      expect(result?.code).toContain("@media (prefers-color-scheme: dark)");
    });

    it("should handle empty CSS content", () => {
      const plugin = clayPlugin();
      const code = `const Empty = clay.div\`\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("const Empty = ((c) => (props) => <div");
      expect(result?.code).toContain("css``");
    });

    it("should handle whitespace-only CSS content", () => {
      const plugin = clayPlugin();
      const code = `const Whitespace = clay.div\`   \`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("const Whitespace = ((c) => (props) => <div");
    });

    it("should handle various HTML elements", () => {
      const plugin = clayPlugin();
      const code = `const Link = clay.a\`color: blue;\`;
const Input = clay.input\`padding: 0.5rem;\`;
const Span = clay.span\`font-weight: bold;\`;
const Section = clay.section\`margin: 1rem;\`;
const Article = clay.article\`padding: 2rem;\`;
const Header = clay.header\`background: white;\`;
const Footer = clay.footer\`border-top: 1px solid;\`;
const Main = clay.main\`flex: 1;\`;
const Nav = clay.nav\`display: flex;\`;
const Form = clay.form\`gap: 1rem;\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("<a");
      expect(result?.code).toContain("<input");
      expect(result?.code).toContain("<span");
      expect(result?.code).toContain("<section");
      expect(result?.code).toContain("<article");
      expect(result?.code).toContain("<header");
      expect(result?.code).toContain("<footer");
      expect(result?.code).toContain("<main");
      expect(result?.code).toContain("<nav");
      expect(result?.code).toContain("<form");
    });

    it("should handle component names with numbers", () => {
      const plugin = clayPlugin();
      const code = `const Button2 = clay.button\`padding: 1rem;\`;
const Card3D = clay.div\`transform: perspective(500px);\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("const Button2 = ((c) => (props) => <button");
      expect(result?.code).toContain("const Card3D = ((c) => (props) => <div");
    });

    it("should handle underscore in component names", () => {
      const plugin = clayPlugin();
      const code = `const Primary_Button = clay.button\`background: blue;\`;
const _PrivateCard = clay.div\`padding: 1rem;\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("const Primary_Button = ((c) => (props) => <button");
      expect(result?.code).toContain("const _PrivateCard = ((c) => (props) => <div");
    });

    it("should not transform let declarations", () => {
      const plugin = clayPlugin();
      const code = `let Button = clay.button\`padding: 1rem;\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      // let declarations should not be transformed
      expect(result).toBeNull();
    });

    it("should not transform var declarations", () => {
      const plugin = clayPlugin();
      const code = `var Button = clay.button\`padding: 1rem;\`;`;
      const result = plugin.transform?.(code, "/test.tsx");

      // var declarations should not be transformed
      expect(result).toBeNull();
    });

    it("should handle .jsx files", () => {
      const plugin = clayPlugin();
      const code = `const Button = clay.button\`padding: 1rem;\`;`;
      const result = plugin.transform?.(code, "/test.jsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("const Button = ((c) => (props) => <button");
    });

    it("should handle files with mixed content", () => {
      const plugin = clayPlugin();
      const code = `import React from 'react';

// Some regular code
const regularVar = 'test';
const num = 42;

// Clay component
const Button = clay.button\`
  padding: 1rem;
\`;

// More regular code
function helper() {
  return 'helper';
}

// Another clay component
const Card = clay.div\`
  margin: 1rem;
\`;

export { Button, Card, helper };`;
      const result = plugin.transform?.(code, "/test.tsx");

      expect(result).toBeTruthy();
      expect(result?.code).toContain("import React from 'react'");
      expect(result?.code).toContain("const regularVar = 'test'");
      expect(result?.code).toContain("const num = 42");
      expect(result?.code).toContain("function helper()");
      expect(result?.code).toContain("const Button = ((c) => (props) => <button");
      expect(result?.code).toContain("const Card = ((c) => (props) => <div");
    });

    it("should preserve code that looks like clay but isn't", () => {
      const plugin = clayPlugin();
      const code = `// Comment mentioning clay.button
const clayConfig = { clay: { button: true } };
const text = "clay.button is great";`;
      const result = plugin.transform?.(code, "/test.tsx");

      // Should not transform because there's no actual clay.element`` syntax
      expect(result).toBeNull();
    });
  });
});
