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
});
