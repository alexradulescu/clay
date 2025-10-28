import { defineConfig } from "vite";
import { ecsstatic } from "@acab/ecsstatic/vite";
import react from "@vitejs/plugin-react";
import { clayPlugin } from "@alexradulescu/clay/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [clayPlugin(), ecsstatic(), react()],
});
