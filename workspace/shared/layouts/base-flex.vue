<template>
  <div class="slidev-layout base-flex">
    <slot />
  </div>
</template>

<!--
  通用页面外壳（共享 addon，9 个课件共用）：
  - 由 addon 的 layouts/ 目录自动注册，课件里写 `layout: base-flex` 或 `defaults: { layout: base-flex }` 即可；
  - 撑满整页的正文（.page-grow）依赖父级是 flex 列，所以这类页面用本 layout；
  - 具体样式（内边距、标题字号）在 workspace/shared/styles/layout.css，和 .page-grow 等原子放一起。
-->
