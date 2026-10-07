# 坐标轴组件 · props 与完整示例（查表用）

> 这一篇是**参考手册**：三个组件各自有哪些 props、`#overlay` 插槽怎么用、每个组件一段完整示例。
> **不用去读组件的 `.vue` 源码**——这里就是全部契约；组件实现里没有文档之外可用的开关。
> 想先知道"我该用哪个、怎么写最快" → 看 [`coordinate-axes.md`](./coordinate-axes.md)；
> props 一多建议用代码块写法 → 看 [`coordinate-axes-comp-block.md`](./coordinate-axes-comp-block.md)；
> 写之前请扫一眼 [`coordinate-axes-conventions.md`](./coordinate-axes-conventions.md)（写错的都集中在那几条）。

## 1. `SimpleAxis` —— 讲台演示版（只第一象限）

**什么时候用**：一节课的演示图——一条/两条曲线（比如 $h$ 与 $t$ 的关系）、标出一个点、从点向两轴作虚线垂线、给轴标量与单位。**不要**用它做多标注、区域填充、网格、分步——那些用 `CoordAxes`。

### props（10 个）

| prop            | 类型                                    | 默认           | 说明                                                                                                                        |
| --------------- | --------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `xAxis`         | `{ quantity?, sub?, unit?, sup? }`      | `{}`           | 横轴的量与单位；量标签画在轴下方右端。**`unit` 只写单位本身（`'m'`），斜杠由组件补** → `x/m`；旧写法 `'/m'`、`' / m'` 兼容  |
| `yAxis`         | 同上                                    | `{}`           | 纵轴的量与单位；量标签画在轴左上方                                                                                          |
| `xMax` / `yMax` | `number`                                | `5` / `5`      | 第一象限的正向最大刻度（从 0 起算）                                                                                         |
| `curves`        | `SimpleCurve[]`                         | `[]`           | 曲线，见下表；不写 `color` 就按调色板顺序取色                                                                               |
| `point`         | `SimplePoint \| null`                   | `null`         | 要标出的**一个点**（含标号），见下表                                                                                        |
| `guides`        | `boolean \| { color?, dashed? }`        | `false`        | 从这个点向 x 轴、y 轴各作一条虚线垂线                                                                                       |
| `ticks`         | `{ x?, y?, labels?, arrows?, origin? }` | `{}`           | 刻度值（不传自动取整步长、正半轴最多 5 格、不含 0）；`labels: false` 关数字；`arrows: false` 关箭头；`origin: false` 关 `O` |
| `view`          | `{ width?, height? }`                   | `{ 640, 340 }` | 只决定比例（见 [`coordinate-axes-conventions.md`](./coordinate-axes-conventions.md) §1.3/§1.4）                             |
| `fontScale`     | `number`                                | `1`            | 字号/线宽倍率                                                                                                               |
| —               | —                                       | —              | 无网格、无填充、无多标注、无分步                                                                                            |

**`SimpleCurve`**

| 字段      | 类型                | 默认       | 说明                                               |
| --------- | ------------------- | ---------- | -------------------------------------------------- |
| `points`  | `{ x, y }[]`        | —          | 折线/直线（两点就是直线）                          |
| `formula` | `(x) => number`     | —          | 函数曲线，在 `0~xMax` 内采样（与 `points` 二选一） |
| `samples` | `number`            | `96`       | 采样段数                                           |
| `color`   | `string`            | 调色板顺序 | 线色                                               |
| `dashed`  | `boolean \| string` | `false`    | `true` 用默认虚线，或写 `"8 5"`                    |
| `width`   | `number`            | `3`        | 线宽（屏幕 px 口径）                               |

**`SimplePoint`**

| 字段           | 类型                                                           | 默认              | 说明                                                                       |
| -------------- | -------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------- |
| `x` / `y`      | `number`                                                       | 必填              | 点的数据坐标（超出 0~max 会被夹到边上）                                    |
| `text`         | `string`                                                       | —                 | 标号文字（系统字体）：点名、中文                                           |
| `math` / `sub` | `string`                                                       | —                 | 物理量符号（`KaTeX_Math` 斜体）与下标（禁止 Unicode）                      |
| `unit` / `sup` | `string`                                                       | —                 | 单位（`KaTeX_Main`，与前面文字之间自动留小间隙）与单位上标（禁止 Unicode） |
| `labelAt`      | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"top-right"`     | **标号画在点的哪个方位**（自动留一点间距，不压住圆点）                     |
| `dx` / `dy`    | `number`                                                       | `0`               | 方位之外再偏移（屏幕 px 口径）                                             |
| `color`        | `string`                                                       | `var(--c-accent)` | 标号与圆点颜色                                                             |
| `dot`          | `boolean \| number`                                            | `true`            | 画圆点；也可给具体半径（屏幕 px 口径）；`false` 不画                       |
| `halo`         | `boolean`                                                      | `true`            | 标号加深色描边光晕（压在曲线上也读得清）                                   |

### 最小示例（自由落体 $h$–$t$ 演示）

```vue
<SimpleAxis
  :x-max="4"
  :y-max="80"
  :x-axis="{ quantity: 't', unit: 's' }"
  :y-axis="{ quantity: 'h', unit: 'm' }"
  :curves="[
    { formula: (t) => 5 * t * t, color: 'var(--c-physics)' },
    { formula: (t) => 20 * t, dashed: true },
  ]"
  :point="{ x: 3, y: 45, math: 'P', labelAt: 'top-right' }"
  :guides="{ color: 'var(--c-accent-2)' }"
  :view="{ width: 640, height: 340 }"
/>
```

---

## 2. `CoordAxes` —— 四象限通用版

**什么时候用**：范围不对称的图像（x: −2…8、y: −5…12 这种）、要画 v<0 的 v-t、要区域填充（v-t 面积）、要多个点标注、要点击分步。**象限靠范围自己表达**（没有单独的"象限"开关）：

| 想要的可见区域                | 写法                                                           |
| ----------------------------- | -------------------------------------------------------------- |
| 只第一象限                    | `:x-range="[0, 6]" :y-range="[0, 12]"`                         |
| 上半平面（1–2）               | `:x-range="[-6, 6]" :y-range="[0, 12]"`                        |
| 右半平面（1–4，v-t 含负速度） | `:x-range="[0, 6]" :y-range="[-12, 12]"`                       |
| 全平面                        | `:x-range="[-6, 6]" :y-range="[-12, 12]"`                      |
| **不对称（常用）**            | `:x-range="[-2, 8]" :y-range="[-5, 12]"`                       |
| 非相邻象限（1+3 对角）        | ❌ 不支持（可见区域只能是矩形）→ 拆成两张图，或用 `areas` 表达 |

### props（11 个）

| prop        | 类型                                                         | 默认           | 说明                                                                                                                                                             |
| ----------- | ------------------------------------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `xRange`    | `[number, number]`                                           | `[0, 6]`       | 横轴范围 `[最小, 最大]`；`min ≥ max` 时自动改成 `min+1`                                                                                                          |
| `yRange`    | `[number, number]`                                           | `[0, 10]`      | 纵轴范围，与横轴完全独立                                                                                                                                         |
| `xAxis`     | `{ quantity?, sub?, unit?, sup?, side?, dx?, dy? }`          | `{}`           | 横轴量与单位；`side: "below"`（默认）/ `"above"`；`dx/dy` 微调（屏幕 px 口径）                                                                                   |
| `yAxis`     | 同上（`side: "left"`/`"right"`）                             | `{}`           | 纵轴量与单位；轴贴左边缘时左侧标签自动改左对齐                                                                                                                   |
| `curves`    | `Curve[]`                                                    | `[]`           | 见下表                                                                                                                                                           |
| `areas`     | `Area[]`                                                     | `[]`           | 多边形/梯形填充，见下表                                                                                                                                          |
| `labels`    | `PointLabel[]`                                               | `[]`           | 点标注，见下表                                                                                                                                                   |
| `ticks`     | `{ x?, y?, grid?, gridStep?, arrows?, origin?, direction? }` | `{}`           | 刻度值（不传自动取、最多 5 个、不含 0）；`grid: true` 画网格（`gridStep: 1` 得细网格）；`direction: "in"`（默认）/ `"out"` / `"cross"`；`origin: false` 不画 `O` |
| `view`      | `{ width?, height? }`                                        | `{ 640, 380 }` | 只决定比例                                                                                                                                                       |
| `fontScale` | `number`                                                     | `1`            | 倍率                                                                                                                                                             |
| `step`      | `number`                                                     | `+∞`           | 传 `$clicks`，配元素 `showAt` 分步（`visibility` 占位）                                                                                                          |

**`Curve`**：`points?` / `formula?`（在 `xRange` 内采样）/ `samples?`(96) / `stroke?`(`var(--c-accent)`) / `width?`(3，屏幕 px) / `dashed?` / `opacity?` / `showAt?`

**`Area`**：`points`（必填，顶点序错会自交）/ `fill?`(`var(--c-accent)`) / `fillOpacity?`(0.22) / `stroke?`（不传不描边）/ `width?`(1.8，屏幕 px) / `dashed?` / `opacity?` / `showAt?`

**`PointLabel`**：`x`/`y`（必填，数据坐标）/ **`tex?`（KaTeX 源码，首选）** / **`parts?`**（`{ tex }` / `{ text }` 任意顺序混排）/ `math?` / `sub?` / `text?` / `unit?` / `sup?`（老写法）/ `anchor?`（`center`（默认，压在点上）/ `left`（正左）/ `right`（正右）/ `top-left` / `top-right` / `bottom-left` / `bottom-right`，都是"**文字画在点的哪个方位**"，角方位自动留半个字）/ `dx?`/`dy?`（屏幕 px）/ `size?`(17，屏幕 px) / `color?` / `halo?`(false) / `dot?`(false 或半径，屏幕 px) / `dotColor?` / `showAt?`

### 轴外装饰：`#overlay` 插槽（尺寸线 / 括号 / 轴上的有向线段）

曲线与填充会被**裁剪在绘图区内**（防止误画到轴外）。要在轴外补几何装饰（矩形底边的"时间"尺寸线、
轴上两点的粗线段 + 端点圆点、拖拽件的坐标映射），用**三个组件都有的**具名插槽 `#overlay`——它**不裁剪**，
按 viewBox 用户单位作图：

| 组件         | 插槽参数                                                         |
| ------------ | ---------------------------------------------------------------- |
| `CoordAxes`  | `{ x(v), y(v), plot, px2user, width, height }`（`plot` 四边）    |
| `SimpleAxis` | `{ x(v), y(v), plot, px2user, width, height }`（`plot` 四边）    |
| `NumberAxis` | `{ x(v), axisY, plot: { left, right }, px2user, width, height }` |

- `x()` / `y()`：数据坐标 → viewBox 用户单位；`px2user`：1 屏幕 px = 多少用户单位（写"离轴 20px"就乘它）；
- 渲染层次：**轴线/刻度之上、文字标注（`labels` / `callout`）之下**；不参与组件布局，别把影响页高的东西塞进来；
- 例（`CoordAxes`，其余两个同理）：

```vue
<CoordAxes :x-range="[0, 6.2]" :y-range="[0, 12]" ...>
  <template #overlay="{ x, y, px2user }">
    <g stroke="var(--c-text-dim)" stroke-width="1.2">
      <line :x1="x(0)" :y1="y(0) + 20 * px2user" :x2="x(5)" :y2="y(0) + 20 * px2user" />
      <line :x1="x(5)" :y1="y(0) + 14 * px2user" :x2="x(5)" :y2="y(0) + 26 * px2user" />
    </g>
  </template>
</CoordAxes>
```

- 轴外的**文字**不用它：`labels` 本来就是 HTML 覆盖层、不裁剪（`t/2`、`中位线` 直接写 `labels` 即可）；
- 一般由**课件自己的薄壳组件**使用（`slides.md` 里写多行 `<template #overlay>` 太长、易错），例：
  `2.2-2.3-uniform-acceleration` 的 `components/VtAreaRect.vue`、`1.2-time-displacement` 的 `components/TimeAxis.vue`、
  `1.3-velocity` 的 `components/XTSlope.vue`（拖拽类的坐标映射也走它）。

### 最小示例

**① v-t 面积拆分（不对称 + 填充 + 分步）**

```vue
<CoordAxes
  :x-range="[0, 6]"
  :y-range="[-2, 12.5]"
  :x-axis="{ quantity: 't', unit: 's' }"
  :y-axis="{ quantity: 'v', unit: 'm/s' }"
  :areas="[
    {
      points: [
        { x: 0, y: 2 },
        { x: 6, y: 2 },
        { x: 6, y: 11 },
      ],
      fill: 'var(--c-accent-2)',
      showAt: 2,
    },
    {
      points: [
        { x: 0, y: 0 },
        { x: 6, y: 0 },
        { x: 6, y: 11 },
        { x: 0, y: 2 },
      ],
      stroke: 'var(--c-accent)',
    },
  ]"
  :curves="[
    {
      points: [
        { x: 0, y: 2 },
        { x: 6, y: 11 },
      ],
    },
  ]"
  :labels="[{ x: 0, y: 2, math: 'v', sub: '0', anchor: 'top-left', dot: 5 }]"
  :ticks="{ x: [2, 4, 6], y: [5, 10] }"
  :step="$clicks"
/>
```

**② 四象限矢量底图（细网格 + 骑轴刻度）**

```vue
<CoordAxes
  :x-range="[-5, 5]"
  :y-range="[-3.5, 3.5]"
  :x-axis="{ quantity: 'x', unit: 'm' }"
  :y-axis="{ quantity: 'y', unit: 'm' }"
  :ticks="{ grid: true, gridStep: 1, direction: 'cross' }"
  :curves="[
    {
      points: [
        { x: -2, y: 2 },
        { x: 2.5, y: 1.5 },
      ],
      stroke: 'var(--c-physics)',
      dashed: true,
    },
  ]"
  :labels="[{ x: -2, y: 2, math: 'a', dot: 5, anchor: 'top-right' }]"
  :view="{ width: 520, height: 400 }"
/>
```

**③ 函数曲线 + 横轴标签放上侧（省一行竖向空间）**

```vue
<CoordAxes
  :x-range="[0, 6]"
  :y-range="[-4, 8]"
  :x-axis="{ quantity: 't', unit: 's', side: 'above' }"
  :y-axis="{ quantity: 'v', unit: 'm/s' }"
  :curves="[{ formula: (t) => 8 - 2 * t, stroke: 'var(--c-danger)' }]"
  :view="{ width: 600, height: 300 }"
/>
```

---

## 3. `NumberAxis` —— 一维数轴 / 时间轴

**什么时候用**：时间轴（0–40 min）、一维位置轴（−10…10 m）、纸带打点的时间标记。只有一条横轴，没有纵轴。

### props（6 个）

| prop        | 类型                                                   | 默认           | 说明                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `axis`      | `{ quantity?, sub?, unit?, sup?, side? }`              | `{}`           | 轴的量与单位；`side: "right"`（默认，画在轴右端右侧）/ `"above"`（画在右端上方，省宽度）                                                                                                                                       |
| `range`     | `[number, number]`                                     | `[0, 10]`      | 轴的范围 `[最小, 最大]`，可含负数                                                                                                                                                                                              |
| `ticks`     | `{ step?, values?, labels?, dots?, arrows?, origin? }` | `{}`           | `step` 步长（不传自动取、最多 6 个刻度）；`values` 直接给刻度值（优先于 step）；`labels: false` 关数字；`dots: true` 每个刻度画圆点（纸带风格）；`arrows: false` 关箭头；`origin: true` 在 0 处画 `O`（同时把 0 从数字里删掉） |
| `callouts`  | `Callout[]`                                            | `[]`           | 从轴上某个点连一条虚线到文字，见下表                                                                                                                                                                                           |
| `view`      | `{ width?, height? }`                                  | `{ 640, 140 }` | 只决定比例；有 callout 时高度给足                                                                                                                                                                                              |
| `fontScale` | `number`                                               | `1`            | 倍率                                                                                                                                                                                                                           |

**`Callout`**

| 字段                                     | 类型                 | 默认            | 说明                                                                                      |
| ---------------------------------------- | -------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| `value`                                  | `number`             | 必填            | 挂在轴上的位置（数据坐标，超出范围会被夹住）                                              |
| `text` / `math` / `sub` / `unit` / `sup` | `string`             | —               | 文字内容（中文用 `text`，量与单位用 `math`/`unit`，下标/上标用 `sub`/`sup`，见约定 §1.5） |
| `side`                                   | `"above" \| "below"` | `"above"`       | 虚线往哪边连                                                                              |
| `color`                                  | `string`             | `var(--c-text)` | 文字与圆点颜色（虚线用同色 90% 透明）                                                     |
| `dx` / `dy`                              | `number`             | `0`             | 文字微调（屏幕 px 口径）                                                                  |
| `dashed`                                 | `boolean \| string`  | 默认虚线        | `false` 改实线，或写 `"7 5"`                                                              |

### 最小示例

**① 时间轴（上课/下课两个 callout）**

```vue
<NumberAxis
  :range="[0, 40]"
  :axis="{ quantity: 't', unit: 'min' }"
  :ticks="{ step: 5 }"
  :callouts="[
    { value: 0, text: '上课', color: 'var(--c-accent)' },
    { value: 40, text: '下课', color: 'var(--c-accent)' },
  ]"
/>
```

**② 一维位置轴（带负范围 + 原点 O + 下方 callout）**

```vue
<NumberAxis
  :range="[-10, 10]"
  :axis="{ quantity: 'x', unit: 'm' }"
  :ticks="{ step: 2, origin: true }"
  :callouts="[{ value: -5, math: 'x', sub: '1', side: 'below', color: 'var(--c-accent-2)' }]"
  :view="{ width: 640, height: 160 }"
/>
```

**③ 纸带打点（密集刻度 + 圆点 + 无箭头）**

```vue
<NumberAxis
  :range="[0, 0.5]"
  :axis="{ quantity: 't', unit: 's' }"
  :ticks="{ step: 0.1, dots: true, arrows: false }"
  :callouts="[
    { value: 0.1, text: 'A' },
    { value: 0.2, text: 'B' },
    { value: 0.3, text: 'C' },
  ]"
/>
```

---
