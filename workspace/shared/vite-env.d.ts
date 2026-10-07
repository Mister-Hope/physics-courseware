/// <reference types="vite/client" />

/** A：静态公式的编译期预渲染映射（由共享 addon 的 vite.config.ts 生成） */
declare module "virtual:courseware-katex-html" {
  /** 行内公式：tex → KaTeX HTML */
  export const KATEX_INLINE: Record<string, string>;
  /** 块级公式：tex → KaTeX HTML */
  export const KATEX_DISPLAY: Record<string, string>;
}
