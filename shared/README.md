# 东北育才 公开课共享 Addon

跨课件复用的公共资源，基于 Slidev 官方 **addon** 机制。所有课件只需在 `slides.md` 的 headmatter 中引用即可自动获得：

- `CourseTopBar` 组件 — 顶栏（封面章节名 ↔ 内页课题名切换动画 + 学校 logo）
- `CourseBottomBar` 组件 — 底栏装饰线（无页码）
- `Latex` 组件 — 在 Vue 组件内渲染 KaTeX 公式（`<Latex tex="x_1" />`，`display` prop 切块级）
- 通用设计系统 `common.css` — 玻璃态卡片、聊天气泡、动效、封面样式等
- `logo.png` — 学校 logo（组件内自动引入）

> ⚠️ **命名注意**：组件刻意命名为 `CourseTopBar` / `CourseBottomBar` 而非 `GlobalTop` / `GlobalBottom`。后者是 Slidev 保留的全局层组件名，重名会导致循环引用栈溢出。

## 使用方式

在课件的 `slides.md` headmatter 中添加：

```yaml
---
addons:
  - ../shared
---
```

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
shared/
  package.json           # addon 声明（slidev-addon-courseware）
  components/
    CourseTopBar.vue     # 顶栏组件
    CourseBottomBar.vue  # 底栏组件
    Latex.vue            # 组件内 KaTeX 公式渲染（依赖 katex，已在 addon 声明）
  styles/
    index.css            # addon 样式入口（自动注入）
    common.css           # 通用设计系统
  assets/
    logo.png             # 学校 logo
```

## 注意事项

- addon 的 `components/` 会自动注册为全局组件，`styles/` 会自动注入全局样式
- 课件自己的 `style.css` 会在 addon 样式之后加载，可覆盖通用样式
- 新课件无需复制任何组件或图片，直接引用 addon 即可
