import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
    rolldownOptions: {
      // 入口主页 + 站点 404 页（404 页在构建期注入课件清单，见 src/not-found.ts）
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
        notFound: fileURLToPath(new URL("404.html", import.meta.url)),
      },
    },
  },
  server: {
    port: 3030,
    open: true,
  },
});
