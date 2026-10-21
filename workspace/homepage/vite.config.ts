import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
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

/**
 * 分册 slug 列表（与根目录 courses.json 一致，首页 Tab 路径用）。
 *
 * @returns 6 个分册的 slug
 */
const readBookSlugs = (): string[] => {
  const file = readFileSync(fileURLToPath(new URL("../../courses.json", import.meta.url)), "utf8");
  const data = JSON.parse(file) as { textbooks: { slug: string }[] };

  return data.textbooks.map((group) => group.slug);
};

/**
 * 分册路径插件：让 `/bx1/`、`/xx2/` 这类地址直接落到对应分册。
 *
 * - Dev：把分册路径改写到 `/index.html`（地址栏保持原路径，页面自己解析并激活分册）
 * - Build：为每个分册复制一份入口页，静态服务器 / 现有 nginx 规则无需改动即可命中
 *
 * @returns Vite 插件实例
 */
const bookRoutesPlugin = (): Plugin => {
  const bookSlugs = readBookSlugs();
  let outDir = "";
  let isBuild = false;

  return {
    name: "book-routes",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [pathname = "/", search = ""] = (req.url ?? "/").split("?");
        const [, first = ""] = pathname.split("/");

        if (bookSlugs.includes(first) && /^\/[^/]+\/?$/u.test(pathname))
          req.url = `/index.html${search ? `?${search}` : ""}`;

        next();
      });
    },
    closeBundle() {
      if (!isBuild) return;

      const indexHtml = path.join(outDir, "index.html");
      if (!existsSync(indexHtml)) return;

      for (const slug of bookSlugs) {
        mkdirSync(path.join(outDir, slug), { recursive: true });
        copyFileSync(indexHtml, path.join(outDir, slug, "index.html"));
      }
    },
  };
};

export default defineConfig({
  plugins: [coursePagesPlugin(), bookRoutesPlugin()],
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
    rolldownOptions: {
      // 入口主页 + 站点 404 页（404 页在构建期注入课件清单，见 src/not-found.ts）
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
        notFound: fileURLToPath(new URL("404.html", import.meta.url)),
        // 授权协议详情页（/license/，主页的协议说明条与 footer 角标都链到这里）
        license: fileURLToPath(new URL("license/index.html", import.meta.url)),
      },
    },
  },
  server: {
    port: 3030,
    open: true,
  },
});
