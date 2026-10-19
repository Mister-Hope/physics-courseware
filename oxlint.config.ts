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
  // `CoordAxes` 是共享坐标图的**唯一实现**：坐标轴 / 刻度 / 曲线 / 标注 / 区域填充 / 分步全在一处，
  // 拆开会让 ` ```comp ` 代码块的 props 契约碎成一摊（页面侧体验更差），因此允许它超过 500 行。
  {
    files: ["workspace/shared/components/CoordAxes.vue"],
    rules: { "max-lines": "off" },
  },
  // 共享 addon 的布局同样是**设计系统原语**（封面要接章名 / 编号 / 课时 / 副标题 / 授课信息，外加 Slidev 附带的完整
  // frontmatter），字段天然比业务组件多；与上面两类组件同理放宽 max-props，仍然设上限。
  {
    files: ["workspace/shared/layouts/*.vue"],
    plugins: ["vue"],
    rules: { "vue/max-props": ["warn", { maxProps: 12 }] },
  },
  {
    files: ["courses/*/components/*.vue"],
    plugins: ["vue"],
    rules: {
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "vue/max-props": ["warn", { maxProps: 12 }],
    },
  },
  // `scripts/**` 是**顺序编排**性质的工具脚本，下面两条规则在这里天然不适用（其余规则照常生效）：
  // - `no-await-in-loop`：Playwright 逐页截图 / Slidev 逐课导出必须一页一页**顺序**跑完
  //   （并发会互相抢 GPU 与端口，而且"先回退到 HEAD 再截旧图、再打回补丁截新图"本身就是流程正确性的一部分），
  //   改成 `Promise.all` 会直接改变行为；
  // - `max-statements`：这里的"长函数"就是一条线性编排流水线（起浏览器 → 逐页循环 → 收尾落盘），
  //   拆开只会把流程切碎、凭空多出十几个要往下传的上下文变量，可读性反而更差。
  {
    files: ["scripts/**"],
    rules: {
      "no-await-in-loop": "off",
      "max-statements": "off",
    },
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
