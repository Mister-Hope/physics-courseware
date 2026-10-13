import { defineHopeConfig } from "oxc-config-hope/oxlint";

export default defineHopeConfig(
  {
    // e2e/ 是 Playwright 端到端测试（Node 脚本 + 浏览器注入函数）：
    // oxc-config-hope 预设面向 Vue 应用，其中的 vitest 插件会把 Playwright 的
    // `test` / `expect` 当成 vitest 全局，`pnpm lint` 的 `oxlint --fix` 会往测试文件里
    // 插入错误的 `import { expect, test } from "vitest"` 直接把测试写坏，因此整个目录不参与 lint。
    // 代码风格仍由 oxfmt 统一（见 package.json 的 lint 脚本）。
    ignore: [".claude", "e2e"],
    vue: true,
    rules: {
      "id-length": "off",
    },
  },
  // 共享 addon 的组件是**设计系统原语**（如箭头：起点 / 终点 / 箭头长 / 标签 + 标签偏移），
  // 参数天然比业务组件多；预设已经为 `**/components/**` 放宽了 max-lines-per-function，这里同理。
  // 仍然设上限，避免真出现一个"万能组件"。
  {
    files: ["workspace/shared/components/*.vue"],
    plugins: ["vue"],
    rules: { "vue/max-props": ["warn", { maxProps: 12 }] },
  },
  // 共享 addon 的布局同样是**设计系统原语**（封面要接章名 / 编号 / 课时 / 副标题 / 授课信息，外加 Slidev 附带的完整
  // frontmatter），字段天然比业务组件多；与上面两类组件同理放宽 max-props，仍然设上限。
  {
    files: ["workspace/shared/layouts/*.vue"],
    plugins: ["vue"],
    rules: { "vue/max-props": ["warn", { maxProps: 12 }] },
  },
  // 课件里的交互图组件同样带多个互相独立的"显示开关"（`showForces` / `showMotion` / `speedDir` /
  // `accelDir` / `fnRatio` …），扁平 props 是本仓库"题目图"约定的写法（见 AGENTS.md），
  // 因此与共享原语同理放宽 max-props；仍然设上限，避免真出现一个"万能组件"。
  {
    files: ["courses/*/components/*.vue"],
    plugins: ["vue"],
    rules: { "vue/max-props": ["warn", { maxProps: 12 }] },
  },
  // Vue 单文件组件由 SFC 编译器统一按 ES module 处理；组件里可以只有模板 + `defineProps`、
  // 一个 import/export 都没有，会被 `import/unambiguous` 误判成脚本（预设已对 `*.d.ts` 关掉同一规则）。
  {
    files: ["**/*.vue"],
    rules: { "import/unambiguous": "off" },
  },
  // 3D three.js components could be huge
  {
    files: ["**/*3D.vue"],
    rules: { "max-lines": "off" },
  },
);
