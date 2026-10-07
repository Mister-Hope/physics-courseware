import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
  server: {
    port: 3030,
    open: true,
  },
});
