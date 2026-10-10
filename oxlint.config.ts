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
      "id-length": [
        "warn",
        {
          min: 3,
          exceptions: [
            // default
            "a",
            "b",
            "d", // svg
            "i",
            "j",
            "k",
            "x",
            "y",
            "z",
            "T",
            "_",

            // 单词
            "id", // identifier
            "el", // element
            "to", // from / to 配对的终点

            // 尺寸
            "w", // 宽度 width
            "h", // 高度 height
            "sm", // small size
            "md", // medium size
            "lg", // large size

            // 颜色分量
            "r", // 红色 red
            "g", // 绿色 green
            "b", // 蓝色 blue

            // 坐标（SVG 用户单位 / 画布像素坐标）
            "OX", // 原点 x 屏幕坐标
            "OY", // 原点 y 屏幕坐标

            // 物理记号 / 受力图上的几何点
            "m", // 质量
            "S", // 面积
            "U", // 电压 voltage
            "R", // 半径 radius
            "h", // 高度 height
            "r", // 半径 radius
            "C", // 电容 capacity
            "Q", // 电量
            "v", // 速度 velocity
            "E", // 电场强度 electric field
            "t", // 时间 time（物理课件的横轴量，几乎每张图都有）
            "dt", // 时间微元 (delta time)
            "e", // 电子 electron
          ],
          exceptionPatterns: [
            "^[A-Z][A-Z]$", // 线段
            "^[a-z]x$", // ax, bx, cx, ...
            "^[a-z]y$", // ay, by, cy, ...
            "^[a-z]z$", // az, bz, cz, ...
            String.raw`^x\d$`, // x0, x1, x2, ...
            String.raw`^y\d$`, // y0, y1, y2, ...
            String.raw`^z\d$`, // z0, z1, z2, ...
            String.raw`^r\d`, // r0, r1, r2, ...
            String.raw`^v\d$`, // v0, v1, v2, ...
            String.raw`^v[A-Z]$`, // vA, vB, ...
            String.raw`^F\d$`, // F0, F1, F2, ...
            String.raw`^F[A-Z]$`, // FA, FB, ...
            String.raw`^f\d$`, // f1, f2, ...
            String.raw`^k\d$`, // k1, k2, k3 ...
          ],
        },
      ],
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
);
