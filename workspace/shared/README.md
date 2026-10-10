# 东北育才 公开课共享 Addon

跨课件复用的公共资源，基于 Slidev 官方 **addon** 机制。所有课件只需在 `slides.md` 的 headmatter 中引用即可自动获得：

- `CourseTopBar` 组件 — 顶栏（封面章节名 ↔ 内页课题名切换动画 + 学校 logo）
- `CourseBottomBar` 组件 — 底栏装饰线（无页码）
- `Latex` 组件 — 在 Vue 组件内渲染 KaTeX 公式（`<Latex tex="x_1" />`，`display` prop 切块级）
- 学科图形组件（同样自动注册、课件里不用 import）：`SpringScale` 弹簧测力计、`CourseArrow` 矢量箭头、`SurfaceHatch` 接触面、`Ruler` 刻度尺、`CoordAxes` / `NumberAxis` / `SimpleAxis` 坐标轴、`ChartLabel` 图注
  - **12 个全局组件的用途与 props 全表**：[`.agents/notes/shared-components.md`](../../.agents/notes/shared-components.md)
  - 三个大组件各有专篇：[坐标轴](../../.agents/notes/coordinate-axes.md)、[弹簧测力计](../../.agents/notes/spring-scale.md)、[手部 `GripHand`](../../.agents/notes/grip-hand.md)
- `base-flex` 布局（`layouts/base-flex.vue`）— 通用页面外壳：flex 列 + 收紧内边距；撑满整页的正文（`.page-grow`）依赖它
- `course-cover` 布局（`layouts/course-cover.vue`）— 封面专用：`chapter-no` / `chapter` / `lesson` / `subtitle` / `classroom` / `teacher`（默认张伯望），课题名取本页 `title`，装饰 SVG 走默认插槽；底部固定一行 14px 的「原创：东北育才学校 张伯望」（各课件不要再手写封面 HTML）
- 通用设计系统 `common.css` — 玻璃态卡片、聊天气泡、动效、封面样式等
- 通用版式原子 `layout.css` — `.page-grow` / `.stack` / `.half-grid` / `.three-col` / `.divider-l` / `.ask` / `.key` / `.mini-title` / `.mini-note` 等
- `logo.png` — 学校 logo（组件内自动引入）
- 校徽 favicon（`setup/main.ts` 运行时挂载）— 替换 Slidev 默认的 jsdelivr 图标，dev / build 与任意 `--base` 子路径都生效

> ⚠️ **命名注意**：组件刻意命名为 `CourseTopBar` / `CourseBottomBar` 而非 `GlobalTop` / `GlobalBottom`。后者是 Slidev 保留的全局层组件名，重名会导致循环引用栈溢出。

## 使用方式

在课件的 `slides.md` headmatter 中添加：

```yaml
---
addons:
  - ../workspace/shared
---
```

> ⚠️ addon 相对路径的基准是 `courses/`（课件目录的**父目录**，Slidev 的 userRoot 解析行为），所以从 `courses/<slug>/` 引用要写 `../workspace/shared`，而不是 `../../workspace/shared`。

然后课件的 `global-top.vue` 只需：

```vue
<template>
  <CourseTopBar chapter="第十章 静电场" section="电容器的电容" />
</template>
```

课件的 `global-bottom.vue` 只需：

```vue
<template>
  <CourseBottomBar />
</template>
```

`CourseTopBar` 接收两个必填 props：

| prop      | 说明                        | 示例          |
| --------- | --------------------------- | ------------- |
| `chapter` | 封面（第 1 页）显示的章节名 | 第十章 静电场 |
| `section` | 内页显示的课题名            | 电容器的电容  |

可选 prop：`logoAlt`（默认 `东北育才学校`）。

## 目录结构

```
workspace/shared/
  package.json           # addon 声明（slidev-addon-courseware）
  components/
    CourseTopBar.vue     # 顶栏组件
    CourseBottomBar.vue  # 底栏组件
    Latex.vue            # 组件内 KaTeX 公式渲染（依赖 katex，已在 addon 声明）
    ChartLabel.vue       # 图内标注（HTML 覆盖层，能渲染真 KaTeX）
    CoordAxes.vue / NumberAxis.vue / SimpleAxis.vue   # 坐标图三件套
    CourseArrow.vue      # 矢量箭头（自动 marker + 回退线段）
    SurfaceHatch.vue     # 接触面 + 斜线阴影
    Ruler.vue            # 刻度尺
    SpringScale.vue      # 弹簧测力计
    GripHand.vue         # 手捏住拉环 / 细绳往外拉
    label-text.ts        # ChartLabel / CoordAxes 共用的标注文字拼装
  layouts/
    base-flex.vue        # 通用页面外壳（layout: base-flex）
  setup/
    main.ts              # 客户端 setup：统一挂载校徽 favicon（Slidev 自动加载，#slidev/setups/main）
    comp-block.ts        # `comp` 代码块解析
    transformers.ts      # `comp` 代码块 → 组件标签
  styles/
    index.css            # addon 样式入口（自动注入）
    common.css           # 通用设计系统
    layout.css           # 通用版式原子（.page-grow / .stack / .key / …）
  assets/
    logo.png             # 学校 logo（顶栏 / 封面用）
    favicon.png          # 校徽 favicon：192×192、透明底，只含方形校徽几何体（不含中英文校名）
```

## 注意事项

- addon 的 `components/` 会自动注册为全局组件，`layouts/` 会自动注册为可用 layout（`layout: base-flex`），`styles/` 会自动注入全局样式
- 课件自己的 `style.css` 会在 addon 样式之后加载，可覆盖通用样式
- 通用版式原子的**密度**用两个变量控制：`--page-gap`（`.page-grow` 行间距，默认 `1.05rem`）、`--stack-gap`（`.stack` 行间距，默认 `0.95rem`）；个别课件按内容密度在自己的 `:root` 里覆盖
- 新课件无需复制任何组件或图片，直接引用 addon 即可
