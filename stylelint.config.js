import { defineHopeConfig } from "stylelint-config-hope";

export default defineHopeConfig({
  ignoreFiles: ["**/dist/**", ".e2e/", "**/.temp/**"],
  rules: {
    // Vue 的 :deep() 是合法写法，但 stylelint 需要显式放行；
    // 注意 ignorePseudoClasses 写不带冒号的名字，且 severity 不能塞进选项数组（stylelint 17 会直接判为 Invalid Option）
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["deep"] }],
  },
  vue: true,
});
