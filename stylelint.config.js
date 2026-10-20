import { defineHopeConfig } from "stylelint-config-hope";

export default defineHopeConfig({
  ignoreFiles: ["**/dist/**", ".e2e/", "**/.temp/**"],
  rules: {
    // Vue 的 :deep() 是合法写法，但 stylelint 需要显式放行；
    // 注意 ignorePseudoClasses 写不带冒号的名字，且 severity 不能塞进选项数组（stylelint 17 会直接判为 Invalid Option）
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["deep"] }],
    // 本仓共享原子用 BEM 的 `--` 修饰符（`.ex-body--fig`、`.def-box--gold`、`.cw-table--left`），
    // 预设的 kebab-case 正则不接受双连字符，这里放宽为"kebab-case + 可选 `--修饰符`"。
    "selector-class-pattern": [
      String.raw`^[a-z][\da-z-]*(--[\da-z-]+)?$`,
      {
        message: (s) => `Expected class selector "${s}" to be kebab-case（允许 BEM 的 -- 修饰符）`,
      },
    ],
  },
  // ⚠️ postcss-html **有意**把行内 `style="…"` 也当 CSS 解析（它 README 的 main use case 就是
  // "lint `<style>` tags **and `<div style="*">`**"），于是面向 CSS 块的排版规则会伸手进 HTML 属性：
  // `custom-property-empty-line-before`（`stylelint-config-standard` 带来）在 `--fix` 时要"custom property 前留空行"，
  // 那个空行就插进了属性值 —— `<div class="split-wide" style="--cols: …">` 被拆成三行（值仍生效，但源码被写坏、grep 搜不到）。
  // 它的 `ignore: ["inside-single-line-block"]` 兜不住：postcss-html 给行内样式的容器是 **root**（不是 rule），
  // 该 ignore 只判断"父 rule 是否单行"。实测（全仓 141 个不重复的行内样式值跑一遍 `--fix`）只有
  // "**行内声明了自定义属性**"会中招；而拆完恰好"满足规则"、lint 仍是绿的 ⇒ 静默损坏。
  // 这条是纯排版偏好，`.css` 文件里照旧生效，因此只在 `.vue` 关掉它。
  overrides: [
    {
      files: ["**/*.vue"],
      rules: { "custom-property-empty-line-before": null },
    },
  ],
  vue: true,
});
