import { parseCompBlock, renderCompBlock } from "./comp-block";

/**
 * Slidev 代码块转换器：把 ` ```comp <组件名> ` 代码块变成 Vue 组件标签。
 *
 * 为什么值得加：坐标组件的 props 是嵌套数组/对象，写成 HTML 属性时既长又难读，还容易踩两个坑 （属性里的 `"` 要转义、LaTeX 反斜杠要写成 `\\`）。改成代码块后可以写成：
 *
 * ```text
 * ```comp CoordAxes
 * x-range: [0, 6.4]
 * curves:
 *   - points: [[0, 5], [6, 15]]
 *     stroke: var(--c-accent)
 * ```
 *
 *     用法与限制见 `.agents/notes/coordinate-axes-comp-block.md`。
 *     ⚠️ 这个文件属于 `FILES_CHANGE_RESTART`：**改完必须重启 dev server**（`pnpm shots` / E2E 会自己起新进程，不受影响）。
 */

/** 代码块上下文（只用得到 `info` 与 `code`，不引 `@slidev/types`，避免 addon 里多一个依赖） */
interface CodeblockContext {
  info: string;
  code: string;
}

/**
 * `comp` 代码块 → 组件标签
 *
 * @param ctx 代码块上下文
 * @returns HTML 字符串；不是 `comp` 代码块时返回 `undefined`（交回默认渲染）
 */
const compBlock = (ctx: CodeblockContext): string | null => {
  const spec = parseCompBlock(ctx.info, ctx.code);

  return spec ? renderCompBlock(spec) : null;
};

const transformersSetup = (): { codeblocks: ((ctx: CodeblockContext) => string | null)[] } => ({
  codeblocks: [compBlock],
});

export default transformersSetup;
