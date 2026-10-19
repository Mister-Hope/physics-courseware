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
  vue: true,
});
