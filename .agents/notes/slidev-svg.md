# 笔记：SVG 绘制（坐标轴、矢量箭头、字体）

> 什么时候读：课件里**要画 SVG**（坐标轴、矢量图、示意图）时。
> 出处：这些坑都是在真实课件里踩出来的，别凭直觉画。

## 1. SVG 自成 16px 体系（最容易算错尺寸）

`html` 基准字号是 22px，但**SVG 子树按 16px 算**——写 SVG 时按 16px 思考，画出来就是你要的大小。
共享 `workspace/shared/styles/common.css` 已实现（新课件通过 addon 自动获得）：

```css
svg {
  font-size: 16px;
} /* SVG 根字号固定 16，不继承 html 的 22px */
@supports (font-size: attr(font-size px, 16px)) {
  svg [font-size] {
    font-size: attr(font-size px, 16px) !important;
  }
} /* 让 font-size="11" 按 11（viewBox 用户单位）生效 */
@supports not (font-size: attr(font-size px, 16px)) {
  svg [font-size] {
    font-size: unset !important;
  }
} /* 旧浏览器兜底：退化成统一 16 */
```

**为什么必须这样**：UnoCSS 的 attributify 把 `font-size="11"` 误当工具类，生成
`[font-size~="11"] { font-size: 3rem }`（3rem × 22px = 66px），会把 SVG 文字撑爆；早先写法用 `unset !important`
压回去，副作用是**属性值被吃掉、所有 SVG 文字都变 16**（作者写的 11/13 全失效，一次波及 60 多处）。
现在用 `attr()` 读回属性值，语义与原生 SVG 一致。实测只有 `font-size` 会被误匹配
（`fill`/`stroke`/`opacity`/`letter-spacing` 正常，`stroke-width="3"` 结果与原生一致）。

- 写 `font-size="11"`（**不带单位**）；带单位的 `font-size="15px"` 会解析失败退化成 16。要绝对控制就用内联 `style="font-size:13px"`（内联 style 一直有效）
- **SVG 内不要用 `rem`**（`rem` 永远跟 html 的 22px）；要相对大小用 `em` 或直接写 viewBox 用户单位
- **canvas**：绘制坐标与 CSS 字号无关（`ctx.font = "16px …"` 就是 16 设备像素）；CSS 尺寸必须与 `canvas.width/height` 一致（别用 rem 定 CSS 尺寸 + 固定缓冲区，会被拉伸），推荐 `aspect-ratio` + DPR 缩放
- **回归守卫**：`e2e/design-tokens.spec.ts` 会注入探针 SVG，断言「html 22px / SVG 根 16px / 属性与内联样式都按书写值生效」。改这段 CSS 后必须跑 `pnpm test:e2e` 复验

## 1.5 字号会随缩放缩水（轴字母、图内标注必看）

SVG 里的 `font-size` 是 **viewBox 用户单位**，渲染后要乘缩放比：

```
屏幕上的实际字号 ≈ 字号 × (渲染宽度 ÷ viewBox 宽度)
```

例：半栏约 412px 宽，`viewBox="0 0 640 420"` 的图，缩放 ≈ 0.64——写 `font-size="17"` 实际只有 ~11px，**后排根本看不清**。
半栏 640 宽的图里，**轴字母给 28–34、图内标注给 17 以上**才算够（`1.2-time-displacement` 第 13 页的实测可用值：轴字母 30、标注 17、线名 20、线宽 4.5）。
全宽（约 868px）的图缩放 ≈ 1.36，`font-size="12"` 就够了 —— **同一份代码换个栏位就得重算**。

## 2. 坐标轴与标签（物理图统一长相）

- 原点 `O`：画在轴交点，标签放交点**左下方**、贴近交点，用斜体（`font-family="KaTeX_Math" font-style="italic"`）
- 物理量标签：横轴 `t` 放轴**下方**、纵轴 `x` 放轴**上方**，都贴着箭头附近（既别压轴、也别飘太远）
- **对齐**：`x` 与 `O` 竖向对齐（同一竖直线）、`O` 与 `t` 横向对齐（同一水平线）
- 刻度：短线**紧贴轴、向图内伸出**；图注（如"位置随时间的变化"）放 SVG 底部**居中**（`text-anchor="middle"`）
- 数学标签压在箭头/线上会看不清 → 加描边光晕：`stroke="#0f1425" stroke-width="3" paint-order="stroke"`

## 3. 矢量箭头

**先用共享组件 `<CourseArrow>`，别再抄 `shaftEnd`/手写 `<marker>`。** props 与用法见 [`shared-components.md` §4](./shared-components.md)——
通过 addon 全局注册，课件**组件里**和 **`slides.md` 的静态 SVG 里**都能直接用（不用 import）：

```html
<!-- 最常用：起点 → 终点，尖端一定正好落在终点上 -->
<CourseArrow :from="{ x: OX, y: OY }" :to="tip" stroke="#e2a846" stroke-width="3.2" label="a" />

<!-- 平移/辅助箭头：虚线 + 半透明 -->
<CourseArrow
  :from="A"
  :to="B"
  stroke="#60a5fa"
  stroke-width="2.6"
  stroke-dasharray="8 5"
  label="b"
  :label-dx="10"
  :label-dy="-8"
/>
```

- `from` / `to` 是 **viewBox 用户单位**（不是屏幕 px）；`to` 就是箭头尖端要落在的点——**不要再自己回退终点坐标**；
- 除 `from`/`to`/`label`/`label-dx`/`label-dy` 外的属性一律**原样透传给内部 `<line>`**：`stroke`、`stroke-width`、`stroke-dasharray`、`opacity`、`stroke-linecap`、`class`…；`stroke` 不写就跟随 `currentColor`；
- 箭头三角形长度按线宽自动取：`≤2 → 9`、`≤4 → 12`、更粗 → `3×线宽`（就是下面铁律一的规矩）；
- `label` 画在两点中点附近，自带深色描边光晕（省掉 `stroke="#0f1425" stroke-width="3" paint-order="stroke"`）；
- **只能在 `<svg>` 里用**；曲线箭头（`<path>` 贝塞尔）、双头箭头仍要手写，手写时按下面两条来。

**铁律一：三角形要"前移"，把粗线头整个盖住。** `marker-end` 的 `refX/refY` 放在**三角形中心**，
三角形长 ≈ 3×线宽、底边宽 ≥ 2×线宽。若按常见默认把 `refX` 放到**尖端**，粗线的方头会从三角形两侧露出来，
看起来像"三角形后面挂了个长方形"，非常丑（老师一眼就能看出来）。

线宽 ≤4 用长 12 的、线宽 ≤2 用长 9 的，`markerUnits="userSpaceOnUse"` 固定尺寸不随线宽缩放：

```html
<marker
  id="p7-arrow"
  markerWidth="12"
  markerHeight="12"
  refX="6"
  refY="6"
  orient="auto"
  markerUnits="userSpaceOnUse"
  viewBox="0 0 12 12"
>
  <path d="M 0 0 L 12 6 L 0 12 z" fill="#e2a846" />
</marker>
```

**铁律二：三角形尖端必须落在目标点上。** `refX` 放到中心后，**尖端 = 线段终点 + 半个箭头长**——
线段不回头收，尖端就越过目标点；收多了又差一截。做法：把线段终点沿方向回退 `三角形长/2`
（用 `sqrt(dx²+dy²)` 归一化）。静态 SVG 逐条算坐标，组件里写小工具函数：

```ts
/** marker 三角形长度（与 markerWidth 一致）：线段回退半个箭头，尖端才正好落在目标点上 */
const ARROW = 12;
const shaftEnd = (x1: number, y1: number, x2: number, y2: number, size = ARROW) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const back = size / 2 / (Math.hypot(dx, dy) || 1);

  return { x: x2 - dx * back, y: y2 - dy * back };
};
```

（只有**手写**静态 SVG 时才需要这个 `shaftEnd`；用 `<CourseArrow>` 就不用管它。）

**验收标准：尖端与目标圆点的视觉中心重合——拿截图看，别只看代码。**
批量截图：`pnpm shots <课件> <页号> --clicks=each`，然后肉眼（或 `read_image`）核对。
