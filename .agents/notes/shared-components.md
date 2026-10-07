# 共享组件总览：12 个全局组件（干什么 + props 正本）

> 什么时候读：**页面上要用任何共享组件时**——先看这一篇 §1 的总表选组件，再看对应小节拿 props。
> 这些组件由共享 addon（`workspace/shared/`）**全局注册**：直接写标签，**不用 import、不要重画**；
> **props 全在这份笔记与下面的专篇里，不用去读 `.vue` 源码**（源码注释只是实现说明）。
> 三个大组件各有专篇，本篇只给指路：坐标轴三件套 → [`coordinate-axes.md`](./coordinate-axes.md)；弹簧测力计 → [`spring-scale.md`](./spring-scale.md)；手部 → [`grip-hand.md`](./grip-hand.md)。

## 1. 总表（选组件用）

| 组件              | 干什么                                                         | 写在哪                                          | props                                  |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------- |
| `SimpleAxis`      | 讲台演示图：只第一象限 + 一两条曲线 + 标一个点                 | markdown 顶层（自己带 `<svg>`）                 | 见坐标轴专篇                           |
| `NumberAxis`      | 一维数轴（时间轴 / 位置轴 / 纸带打点）                         | 同上                                            | 见坐标轴专篇                           |
| `CoordAxes`       | 完整坐标图：多曲线 / 多标注 / 网格 / 区域填充 / 分步           | 同上                                            | 见坐标轴专篇                           |
| `SpringScale`     | 弹簧测力计（悬挂测力、两台对拉、装置示数）                     | **只能在 `<svg>` 里**                           | [`spring-scale.md`](./spring-scale.md) |
| `GripHand`        | 侧视图里"手捏住拉环 / 吊环 / 细绳往外拉"                       | **只能在 `<svg>` 里**                           | [`grip-hand.md`](./grip-hand.md)       |
| `CourseArrow`     | 矢量箭头（自带三角形 marker + 自动回退线段，尖端必落在终点上） | **只能在 `<svg>` 里**                           | 本篇 §4                                |
| `SurfaceHatch`    | 接触面：地面 / 桌面 / 墙面 / 斜面 / 天花板 + 单侧斜线阴影      | **只能在 `<svg>` 里**                           | 本篇 §5                                |
| `Ruler`           | 刻度尺（精确毫米刻度，或只画个尺子形状的示意图）               | 任意：可嵌在别的 `<svg>` 里，也可单独当 HTML 用 | 本篇 §6                                |
| `Latex`           | HTML 里的 KaTeX 公式（Markdown 段落里的 `$…$` 仍照用）         | markdown / HTML 层                              | 本篇 §3                                |
| `ChartLabel`      | 图内标注（画在 SVG 上层的 HTML，**能渲染真 KaTeX 与分式**）    | HTML 层，盖在 SVG 上                            | 本篇 §3                                |
| `CourseTopBar`    | 顶栏：封面显示章节名、内页显示课题名，右侧校徽                 | 课件的 `global-top.vue` 薄壳                    | 本篇 §2                                |
| `CourseBottomBar` | 底栏两侧渐隐装饰线（**不显示页码**）                           | 课件的 `global-bottom.vue` 薄壳                 | 本篇 §2                                |

## 2. 页面外壳：`CourseTopBar` / `CourseBottomBar`

课件里**只需在现成的两个薄壳里传参**，不要自己写顶底栏（`GlobalTop` / `GlobalBottom` 是 Slidev 保留名，重名会栈溢出）：

```vue
<!-- courses/<slug>/global-top.vue -->
<template>
  <CourseTopBar chapter="第十章 静电场" section="电容器的电容" />
</template>
```

```vue
<!-- courses/<slug>/global-bottom.vue -->
<template>
  <CourseBottomBar />
</template>
```

| 组件              | prop      | 必填 | 默认           | 说明                                             |
| ----------------- | --------- | ---- | -------------- | ------------------------------------------------ |
| `CourseTopBar`    | `chapter` | ✅   | —              | 封面（第 1 页）显示的章节名，如「第十章 静电场」 |
|                   | `section` | ✅   | —              | 内页显示的课题名，如「电容器的电容」             |
|                   | `logoAlt` |      | `东北育才学校` | 顶栏 logo 的 alt 文本                            |
| `CourseBottomBar` | —         | —    | —              | 无 props；只有装饰线                             |

## 3. HTML 层的公式与标注：`Latex` / `ChartLabel`

**什么时候用哪个**：整段公式、行内公式 → `Latex`；图上一个点旁边的小标注（`v_0`、`\frac{1}{2}at^2`、点名"小明"）→ `ChartLabel`（或直接写坐标组件的 `labels`，内部就是它）。

```html
<Latex tex="\vec{a} + \vec{b} = (x_1 + x_2,\ y_1 + y_2)" />
<Latex tex="\vec{s} = (6,\ 0)" display />
```

| `Latex`   | 类型      | 必填 | 默认    | 说明                                         |
| --------- | --------- | ---- | ------- | -------------------------------------------- |
| `tex`     | `string`  | ✅   | —       | KaTeX 源码，如 `v_0`、`\Delta x = x_2 - x_1` |
| `display` | `boolean` |      | `false` | 块级公式（居中、独立成行）                   |

`ChartLabel` 把标注**按容器百分比**定位、画在 SVG 上层——因为 SVG 的 `<text>` 里嵌不了 KaTeX，`\frac{1}{2}` 这类分式只能靠它。用法：外层容器 `position: relative`，SVG 与标注都放进去，组件按 `xPercent = 标注点屏幕 x ÷ 容器宽 × 100` 摆放（`CoordAxes` 内部就是这么做的）。

| `ChartLabel` | 类型               | 必填 | 默认            | 说明                                                                                                      |
| ------------ | ------------------ | ---- | --------------- | --------------------------------------------------------------------------------------------------------- |
| `xPercent`   | `number`           | ✅   | —               | 标注点横向位置（相对容器的百分比，0–100）                                                                 |
| `yPercent`   | `number`           | ✅   | —               | 标注点纵向位置（相对容器的百分比，0–100）                                                                 |
| `parts`      | `ChartLabelPart[]` | ✅   | —               | 内容片段，`{ tex: "v_0" }` 与 `{ text: "小明" }` 可任意顺序混排                                           |
| `anchor`     | `ChartLabelAnchor` |      | `center`        | 文字在点的哪一侧：`center` / `left` / `right` / `top-left` / `top-right` / `bottom-left` / `bottom-right` |
| `dx` / `dy`  | `number`           |      | `0` / `0`       | 方位之外再偏移（屏幕 px 口径）                                                                            |
| `size`       | `number`           |      | `17`            | 字号（屏幕 px 口径，不受 viewBox 缩放影响）                                                               |
| `color`      | `string`           |      | `var(--c-text)` | 文字色                                                                                                    |
| `halo`       | `boolean`          |      | `false`         | 加深色描边光晕（标注压在曲线上也读得清）                                                                  |
| `visible`    | `boolean`          |      | `true`          | 分步用：`false` 只隐藏、不删不插（不会顶跑已可见元素）                                                    |

> 组件里的 `$…$` 不生效、HTML 块内的 `$…$` 会显示成字面 `$x$`——**一律改用 `<Latex>`**；轴标签与 `labels` 的简写字段（`math` / `sub` / `unit` / `sup`）见 [`coordinate-axes-api.md`](./coordinate-axes-api.md)。

## 4. `CourseArrow`（矢量箭头，只能在 `<svg>` 里）

它替你守住两条铁律：**三角形 marker 自动生成**（不会出现"三角形后面挂个长方形"）、**线段自动回退半个箭头长**（尖端正好落在 `to` 上，别再自己算 `shaftEnd`）。

```html
<CourseArrow :from="{ x: OX, y: OY }" :to="tip" stroke="#e2a846" stroke-width="3.2" label="a" />
<CourseArrow
  :from="A"
  :to="B"
  stroke="#60a5fa"
  stroke-width="2.6"
  stroke-dasharray="8 5"
  :label-dx="10"
  :label-dy="-8"
/>
```

| prop                  | 类型     | 必填 | 默认        | 说明                                                                  |
| --------------------- | -------- | ---- | ----------- | --------------------------------------------------------------------- |
| `from` / `to`         | `Point`  | ✅   | —           | 起点 / 终点（**viewBox 用户单位**）；尖端落在 `to`                    |
| `headSize`            | `number` |      | `0`         | 箭头三角形长度；`0` = 按线宽自动（≤2 → 9、≤4 → 12、更粗 → 3×线宽）    |
| `label`               | `string` |      | `""`        | 标签，画在两点中点附近，自带深色描边光晕（数学标记用斜体 KaTeX 字体） |
| `labelDx` / `labelDy` | `number` |      | `8` / `-10` | 标签相对中点的横向 / 纵向偏移                                         |

- 其余属性**原样透传给内部 `<line>`**：`stroke`（不写则跟随 `currentColor`）、`stroke-width`（默认 3）、`stroke-dasharray`、`opacity`、`stroke-linecap`、`class`…；
- 只会画单头直线箭头；**曲线（`<path>` 贝塞尔）与双头箭头仍要手写**，手写时守 [slidev-svg.md](./slidev-svg.md) 的两条铁律。

## 5. `SurfaceHatch`（接触面阴影，只能在 `<svg>` 里）

**推荐写法：给起点和终点 + 用 `side` 说清阴影在线的哪一侧**（屏幕方向）：

```html
<!-- 地面：阴影在线的下方 -->
<SurfaceHatch :from="{ x: 20, y: 180 }" :to="{ x: 320, y: 180 }" side="below" />
<!-- 天花板：阴影在线的上方 -->
<SurfaceHatch :from="{ x: 20, y: 40 }" :to="{ x: 320, y: 40 }" side="above" />
<!-- 左墙：阴影在线的左边 -->
<SurfaceHatch :from="{ x: 24, y: 24 }" :to="{ x: 24, y: 200 }" side="left" />
<!-- 斜面：从 (250,170) 到 (410,106)，阴影在线的下方 -->
<SurfaceHatch :from="{ x: 250, y: 170 }" :to="{ x: 410, y: 106 }" side="below" />
```

| prop          | 类型                                      | 必填 | 默认                | 说明                                      |
| ------------- | ----------------------------------------- | ---- | ------------------- | ----------------------------------------- |
| `from` / `to` | `{x, y}`                                  | 推荐 | `null`              | 表面线两端点（viewBox 用户单位）          |
| `side`        | `"below" \| "above" \| "left" \| "right"` |      | `below`             | 斜线阴影在**屏幕上**哪一侧（地面= below） |
| `thickness`   | `number`                                  |      | `16`                | 阴影带深度（垂直表面方向）                |
| `gap`         | `number`                                  |      | `24`                | 相邻斜线间距（越小越密）                  |
| `color`       | `string`                                  |      | `var(--c-text-dim)` | 表面线与斜线颜色                          |
| `lineWidth`   | `number`                                  |      | `2.4`               | 表面线线宽                                |
| `hatchWidth`  | `number`                                  |      | `1.2`               | 斜线线宽                                  |

- 斜线统一朝"表面方向的反方向"倾斜，没有额外旋钮；
- **兼容旧写法**：只给 `x` / `y` / `length` / `orientation`（`horizontal` = 地面、`vertical` = 墙面）时按老规则画，旧课件不用改。

## 6. `Ruler`（刻度尺）

横着量线段、竖着量弹簧伸长都行；既可直接当 HTML 元素用，也可嵌进别的 `<svg>`（传 `x` / `y` / `width` / `height`）。

```html
<Ruler :length="200" orientation="vertical" />
<Ruler :length="120" orientation="horizontal" :show-millimeter="true" />
<!-- 示意图模式：只画个尺子形状，不标数值 -->
<Ruler :length="150" schematic />
```

| prop               | 类型                         | 默认         | 说明                                                               |
| ------------------ | ---------------------------- | ------------ | ------------------------------------------------------------------ |
| `length`           | `number`                     | `200`        | 量程，**单位 mm**（`200` = 20 cm）                                 |
| `showNumbers`      | `boolean`                    | `true`       | 每 10 mm 标一个数值                                                |
| `showMillimeter`   | `boolean`                    | `false`      | 是否画 1 mm 细刻度                                                 |
| `unit`             | `"cm" \| "mm"`               | `"cm"`       | 数值单位                                                           |
| `orientation`      | `"vertical" \| "horizontal"` | `"vertical"` | 朝向                                                               |
| `schematic`        | `boolean`                    | `false`      | 示意图模式：只画尺子形状与稀疏刻度、**不标数值**（不给出精确读数） |
| `color`            | `string`                     | `#cbd5e1`    | 刻度与文字颜色                                                     |
| `thickness`        | `number`                     | `26`         | 尺身厚度（用户单位）；字号与刻度随它缩放                           |
| `x` / `y`          | `number`                     | `0` / `0`    | 嵌进父级 SVG 时的位置（用户单位）                                  |
| `width` / `height` | `number`                     | `0` / `0`    | 画出来的宽高；`0` = 用组件自己的 viewBox 尺寸                      |

## 7. 所有组件共同的规则

1. **全局注册**：直接写标签，不 import；共享代码改动（`workspace/shared/`）会影响**全部课件**，改前评估影响面。
2. **`只能在 <svg> 里`** 的组件：`CourseArrow`、`SurfaceHatch`、`SpringScale`、`GripHand`——它们画的是 `<g>`，写成 HTML 元素页面上什么都不显示，也不能用 ` ```comp ` 代码块。
3. **`v-click` 写在组件里照样生效**（Slidev 的 `v-click` 是全局指令，跨组件仍绑当前页）；也可以由页面传 `:step="$clicks"`。
4. **颜色的属性值不要带空格**：SVG 属性里写 `rgba(226,168,70,0.15)`，**不要写** `rgb(226 168 70 / 15%)`——UnoCSS attributify 会把 `226`/`168` 当成工具类，把描边撑成几百 px（dev 下还看不出来，只有 build 产物中招）。
5. **props 一多就用 ` ```comp ` 代码块**（围栏前必须留空行），写法见 [`coordinate-axes-comp-block.md`](./coordinate-axes-comp-block.md)。
6. 分步显示用 `visible` / `v-if` 时记住：**真删真插会把已可见元素顶跑**，优先用组件提供的 `visible` 这类"只隐藏不删除"的开关。
