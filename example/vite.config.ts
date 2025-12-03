import { defineConfig } from "vite";
import { clay } from "@alexradulescu/clay/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [clay(), react()],
});
