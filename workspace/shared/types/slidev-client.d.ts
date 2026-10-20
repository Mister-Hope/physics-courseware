/**
 * 把 Slidev 客户端自带的 `shim-vue.d.ts` 拉进 `vue-tsc` 的程序。
 *
 * `@slidev/client` 53.x 只发布源码，它自带的 `shim-vue.d.ts`（给 `vue-router` 的 `RouteMeta` 补 `slide` /
 * `frontmatter` / `filepath`…，给 `vue` 补 `ComponentCustomProperties`）**没有被包的入口引用** —— 只有
 * Slidev 官方仓库自己的 tsconfig 才包含它。不引它的话，客户端源码里 `route.meta.slide.frontmatter`
 * 这类读取在 `pnpm check` 里会报一片 TS2339 / TS18046。
 *
 * 所以这里引用**上游自己的声明文件**做增强（不自己抄一份 RouteMeta），随 Slidev 升级走。
 * 注：本文件放在 `workspace/shared/`，因为只有 addon / 各课件包才把 `@slidev/client` 装进
 * node_modules，能解析到这个子路径。
 */

import "@slidev/client/shim-vue.d.ts";
