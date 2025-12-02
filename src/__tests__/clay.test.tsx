import { describe, it, expect } from "vitest";
import { clay } from "../clay";

describe("clay", () => {
  it("should throw an error when used without transformation", () => {
    expect(() => {
      // @ts-expect-error - testing runtime behavior
      void clay.button`padding: 1rem;`;
    }).toThrow("clay should be transformed by vite-plugin-clay");
  });

  it("should throw an error when called as a function without transformation", () => {
    const Button = () => null;
    expect(() => {
      // @ts-expect-error - testing runtime behavior
      void clay(Button)`padding: 1rem;`;
    }).toThrow();
  });

  it("should have proper type exports", () => {
    // This test verifies the module exports are correct
    expect(clay).toBeDefined();
    expect(typeof clay).toBe("object");
  });

  it("should be a Proxy object", () => {
    // Verify clay is implemented as a Proxy
    expect(clay).toBeDefined();
    // Try to access a property - should throw since not transformed
    expect(() => {
      // @ts-expect-error - testing runtime behavior
      void clay.div;
    }).toThrow();
  });
});
