import faviconUrl from "../assets/favicon.png";

/**
 * 共享 addon 的客户端 setup：给所有引用了本 addon 的课件统一挂上东北育才校徽 favicon。
 *
 * 为什么走这里：Slidev 会把每个 root（课件目录 + 各 addon 目录）的 `setup/main.ts` 收进 虚拟模块
 * `#slidev/setups/main`，在客户端挂载前依次执行 —— 所以只写这一个文件， 全部课件（headmatter 里 `addons:
 * [../workspace/shared]`）都会生效，**不需要动任何 `courses/**`**。
 *
 * 为什么不用静态 `<link>`：Slidev 的 index.html 由 `config.favicon`（默认指向 jsdelivr 上的 Slidev
 * logo，国内常被墙）在启动时生成一次，addon 改不到它； 这里用「运行时替换 + Vite 打包资源」的方式，dev / build、任意 `--base` 子路径都正确。
 */

/** Slidev 默认 favicon（`@slidev/parser` 里 config.favicon 的默认值）：命中即视为「课件没自己指定」 */
const SLIDEV_DEFAULT_ICON = "cdn.jsdelivr.net/gh/slidevjs/slidev/assets/favicon.png";

/**
 * 挂载 favicon：替换 Slidev 的默认图标；课件若在 headmatter 里显式指定了 favicon，则让位给课件。
 *
 * @returns 无
 */
export default function setupFavicon(): void {
  if (typeof document === "undefined") return;

  const existing = document.head.querySelector<HTMLLinkElement>('link[rel~="icon"]');

  if (existing && !existing.href.includes(SLIDEV_DEFAULT_ICON)) return;

  const link = existing ?? document.createElement("link");

  link.rel = "icon";
  link.type = "image/png";
  link.href = faviconUrl;

  if (!existing) document.head.append(link);
}
