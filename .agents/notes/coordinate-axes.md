# 坐标轴组件：怎么用（读这一篇就能上手，**不用看组件源码**）

> 要画坐标图（v-t、x-t、h-t、时间轴、位置轴、纸带打点），**一律用共享 addon 里的三个组件**，
> 不要手写 `<svg>` 坐标轴、不要自己画刻度与箭头——坐标轴/刻度/箭头/字号体系/范围留白组件都已经处理好了。
> 这一篇是**正门**：选哪个、最短怎么写、哪些坑不能踩；`props` 全表与完整示例见
> [`coordinate-axes-api.md`](./coordinate-axes-api.md)，**组件源码里没有文档之外可用的开关**。

## 1. 选型（先看这张表）

| 你要画的东西                                                                   | 用哪个组件                               | 为什么                                                                                   |
| ------------------------------------------------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| 讲台演示：**只第一象限** + 一两条曲线 + **标一个点**（可带标号、可作虚线垂线） | **`SimpleAxis`**                         | 只有 10 个 props，一眼看懂；`h-t`、`v-t` 演示图就是它                                    |
| 一般坐标图：**四象限**、**x/y 范围不对称**、多曲线/区域填充/多标注/点击分步    | **`CoordAxes`**                          | 通用版，范围 `xRange`/`yRange` 各自独立                                                  |
| **一维数轴**：时间轴、位置轴、纸带打点（一条横轴 + 刻度 + 上方 callout）       | **`NumberAxis`**                         | 只有一条轴，不需要纵轴                                                                   |
| 矢量箭头图、受力示意图、电路图、几何示意图                                     | ❌ 都不用，继续手写 SVG                  | 那些不是坐标图；箭头用共享 `CourseArrow`                                                 |
| 拖拽 / rAF 动画 / 滑块实时重算的图                                             | 组件画轴与静态部分，**交互留在业务组件** | 三个组件都不含拖拽与动画（要分步用 `CoordAxes`，要轴外装饰/坐标映射用各自的 `#overlay`） |
| 一维数轴但需要"锯齿折断"或自定义零点                                           | ❌ 目前不支持                            | 属课件特殊画法，仍在业务组件里手写                                                       |

**四个组件的边界（别硬塞）**：`SimpleAxis` 不做填充/多标注/网格/分步；`CoordAxes` 不画一维数轴；`NumberAxis` 没有纵轴、没有曲线；三者都不含拖拽、动画、锯齿轴、反向下为正的纵轴。

---

## 2. 最短可用写法（props 一多就用代码块，见下）

````markdown
<div class="vt-host">

```comp CoordAxes
x-range: [0, 6.2]
y-range: [0, 13]
x-axis: { quantity: t, unit: "s", side: above }
y-axis: { quantity: v }
view: { width: 400, height: 300 }
ticks: { x: [], y: [], labels: false }
curves:
  - points: [{ x: 0, y: 5 }, { x: 5.5, y: 5 }]
    stroke: var(--c-accent)
    width: 3.5
  - formula: t => 0.5 + 0.35 * t * t
    samples: 40
    stroke: var(--c-physics)
labels:
  - x: 0
    y: 5
    tex: 'v_0'
    anchor: bottom-right
```
````

几条最短的写法约定（完整规则见 [`coordinate-axes-comp-block.md`](./coordinate-axes-comp-block.md)）：

| 想要              | 怎么写                                                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 组件名            | 代码块 info 写 `comp <组件名>`（`comp SimpleAxis`、`comp NumberAxis`、课件自己的组件也行）                                                                           |
| 字符串 / LaTeX    | 单引号即可，**LaTeX 只写一个反斜杠**：`tex: '\frac{1}{2}at^2'`                                                                                                       |
| 函数曲线          | `formula: t => 0.5 + 0.35 * t * t`（识别到 `=>` 就原样输出成箭头函数）                                                                                               |
| 图上的点          | **必须 `{ x, y }` 对象**：`points: [{ x: 0, y: 5 }]`，不是 `[[0, 5]]`                                                                                                |
| 外容器 / 点击分步 | 两个特殊键：`class: vt-host`、`click: 1`                                                                                                                             |
| **轴的单位**      | ⛔ **只写单位本身、不带斜杠**：`unit: 'm'` → 渲染成 `x/m`；复合单位自带括号：`unit: '(m/s)'` → `v/(m/s)`（旧写法 `'/m'`、`' / m'` 仍兼容，组件会先去掉再补一个 `/`） |

⛔ **` ```comp ` 围栏前必须留一个空行**，否则整块被 markdown-it 的 HTML 块吞掉、**渲染成纯文本且不报错**（踩过 6 个块）。
组件内部要用（`components/*.vue`）时就用普通属性 + `#overlay` 插槽，不写代码块。

## 3. 写之前扫一眼这三篇

| 什么时候读                                 | 读哪篇                                                               |
| ------------------------------------------ | -------------------------------------------------------------------- |
| 要查 props / 插槽参数 / 每个组件的完整示例 | [`coordinate-axes-api.md`](./coordinate-axes-api.md)                 |
| 要用代码块写法（props 多）                 | [`coordinate-axes-comp-block.md`](./coordinate-axes-comp-block.md)   |
| 写之前过一遍约定与反例（**推荐**）         | [`coordinate-axes-conventions.md`](./coordinate-axes-conventions.md) |

## 4. 组件清单与自查

| 组件         | 文件                                                                 | props 数 | 屏幕目标字号                |
| ------------ | -------------------------------------------------------------------- | -------- | --------------------------- |
| `SimpleAxis` | [`SimpleAxis.vue`](../../workspace/shared/components/SimpleAxis.vue) | 10       | 轴量 21 / 刻度 15 / 标注 17 |
| `CoordAxes`  | [`CoordAxes.vue`](../../workspace/shared/components/CoordAxes.vue)   | 11       | 同上                        |
| `NumberAxis` | [`NumberAxis.vue`](../../workspace/shared/components/NumberAxis.vue) | 6        | 同上                        |

自查（改完组件必跑，浏览器验收由 Lead 统一做）：

```bash
pnpm exec oxlint workspace/shared      # 必须 0 warnings 0 errors
```
