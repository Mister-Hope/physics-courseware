import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import type { Plugin } from "vite";

import { generateCoursePages } from "../../scripts/course-pages.ts";

/**
 * Dev / build 启动时自动刷新每课页数（写 src/pages.generated.ts，「我要上课」弹窗要用）。
 *
 * @returns Vite 插件实例
 */
const coursePagesPlugin = (): Plugin => ({
  name: "course-pages",
  buildStart: () => {
    generateCoursePages();
  },
  configureServer(server) {
    server.httpServer?.once("listening", () => {
      generateCoursePages();
    });
  },
});

export default defineConfig({
  plugins: [coursePagesPlugin()],
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
