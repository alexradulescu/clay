import { defineConfig } from "vite";
import { ecsstatic } from "@acab/ecsstatic/vite";
import react from "@vitejs/plugin-react";
import { clayPlugin } from "clay/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/clay/", // GitHub Pages base URL
  plugins: [clayPlugin(), ecsstatic(), react()],
});
