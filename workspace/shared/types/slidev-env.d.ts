/**
 * Slidev 的**编译期常量**（由 Vite 在 dev/build 时用 `define` 注入，源码里没有声明）。
 *
 * 为什么本仓库需要它：Slidev 53 的 `@slidev/client` **只发布源码**（package.json 的 exports 直接指向
 * `./index.ts`、`./context.ts` …），课件组件 `import { useSlideContext } from "@slidev/client"` 时，
 * 客户端源码会被一并拉进 `vue-tsc` 的程序里做类型检查。那份源码依赖下面这些全局量，
 * 不声明就会报一片 TS2304（`Cannot find name '__DEV__'` 之类），`pnpm check` 永远红。
 *
 * 这里**只补上游缺的那几份声明**，类型本身仍来自 `@slidev/client` 自己的源码，不另抄一份。
 * 取值口径见 `@slidev/cli` 的 `define`：`__DEV__` = 非 build、`__SLIDEV_HAS_SERVER__` = 非 build，
 * `__SLIDEV_FEATURE_*` = frontmatter 里对应的功能开关。
 *
 * ⚠️ 上游新增 `__SLIDEV_*` / `__*_FEATURE_*` 常量时在这里补一条（漏了会报 TS2304，不会静默）。
 */

/** 是否 dev 模式（`slidev build` 时为 false） */
declare const __DEV__: boolean;
/** 是否由 dev server 提供（`slidev build` 时为 false） */
declare const __SLIDEV_HAS_SERVER__: boolean;
/** 是否 hash 路由 */
declare const __SLIDEV_HASH_ROUTE__: boolean;
/** 是否 memory 路由 */
declare const __SLIDEV_MEMORY_ROUTE__: boolean;
/** 各可选功能的开关；关掉时相关代码会被摇掉 */
declare const __SLIDEV_FEATURE_EDITOR__: boolean;
declare const __SLIDEV_FEATURE_DRAWINGS__: boolean;
declare const __SLIDEV_FEATURE_DRAWINGS_PERSIST__: boolean;
declare const __SLIDEV_FEATURE_PRESENTER__: boolean;
declare const __SLIDEV_FEATURE_WAKE_LOCK__: boolean;
declare const __SLIDEV_FEATURE_PWA__: boolean;
declare const __SLIDEV_FEATURE_RECORD__: boolean;
declare const __SLIDEV_FEATURE_BROWSER_EXPORTER__: boolean;
declare const __SLIDEV_FEATURE_PRINT__: boolean;

/**
 * `file-saver` 是 `@slidev/client` 导出 / 录制功能用的可选依赖，上游没带类型声明（本项目自己不用它）。
 *
 * 只在 `@slidev/client/utils.ts` 里被 `await import("file-saver")` 用到，补一个最小声明即可。
 */
declare module "file-saver" {
  export function saveAs(data: Blob | string, filename?: string): void;
}
