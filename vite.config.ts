import { defineConfig } from "vite";

export default defineConfig({
  root: "workspace/homepage",
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
  server: {
    port: 3030,
    open: true,
  },
});
