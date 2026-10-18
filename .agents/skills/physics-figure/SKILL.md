---
name: physics-figure
description: 在高中物理课件里画或改物理图（受力与运动、坐标图、电路、磁场、带电粒子、天体、弹簧测力计、手部）的标准流程：选共享组件 → 禁止手画清单 → 16px 体系 → 画完自检 → "图不对"症状定位。Use when 要在本仓课件里新增/修改图或图组件，或图上元素看不见、变形、位置不对。
---

# 物理图元作图

本仓课件的图**一律由共享组件画**（`workspace/shared/components/`，25 个，全局注册，**不用 import、不要重画**）。
本 skill 只给**流程**；组件的 props 正本在笔记里（`.agents/notes/`），**用到再去读**。

## 四步流程

1. **选组件** → 查总表 [`.agents/notes/shared-components.md`](../../notes/shared-components.md) §1。
   总表里没有 → 本仓还没这个图元：按"手绘 SVG 超过 5 行就抽成组件"自己写 `courses/<slug>/components/XxxSvg.vue`。
2. **写在对的位置**：
   - **markdown 顶层**（组件自己带 `<svg>`）：`SimpleAxis` / `NumberAxis` / `CoordAxes`
   - **只能在 `<svg>` 里写**（写成 HTML 页面上什么都没有）：`CourseArrow` / `SurfaceHatch` / `SpringScale` / `GripHand` / `Ruler` /
     `Celestial*` / `Circuit*` / `FieldDots` / `FieldMark`
   - **HTML 层**：`Latex` / `ChartLabel` / `CourseSlider` / `DefinitionBox`
3. **画之前读对应专篇**（见下表）；用 ` ```comp ` 代码块时**围栏前必须留一个空行**。
4. **画完自检**（跑，不靠肉眼）：

```bash
grep -c "<svg" courses/<slug>/slides.md    # 期望 0：图都在 components/ 里
pnpm slide <slug> <页号>                    # 确认组件名与 props 写对
pnpm shots <slug> <页号>                    # 未点击状态截图
E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts
```

## 禁止手画（各课自己画 ⇒ 全仓视觉对不上，教师点名）

| 要画的东西                       | 用哪个组件                                | 读哪篇                                                            |
| -------------------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| 坐标图 / v-t / x-t / 纸带打点    | `CoordAxes` / `SimpleAxis` / `NumberAxis` | [coordinate-axes.md](../../notes/coordinate-axes.md) ⭐           |
| 矢量箭头                         | `CourseArrow`（自动 marker）              | [slidev-svg.md](../../notes/slidev-svg.md)                        |
| 地面 / 桌面 / 墙 / 斜面 / 天花板  | `SurfaceHatch`                            | [shared-components.md](../../notes/shared-components.md) §5       |
| 弹簧测力计                       | `SpringScale`                             | [spring-scale.md](../../notes/spring-scale.md) ⭐                 |
| 手捏住拉环 / 吊环 / 细绳         | `GripHand`                                | [grip-hand.md](../../notes/grip-hand.md) ⭐                       |
| 电路元件 / 磁场叉点阵            | `Circuit*` / `FieldDots` / `FieldMark`    | [electronic-symbols.md](../../notes/electronic-symbols.md) ⭐     |
| 太阳 / 地球 / 月球 / 星球        | `Celestial*`                              | [shared-components.md](../../notes/shared-components.md) §9       |
| 刻度尺                           | `Ruler`                                   | [shared-components.md](../../notes/shared-components.md) §6       |

## 硬约束（违反＝图坏或构建挂）

- **SVG 内不能有空行**：空行之后的元素丢 SVG 命名空间，**不报错**，图只剩空框。
- **16px 体系**：`font-size="11"`（**不带单位**；`"15px"` 会解析失败退化成 16），不要用 `rem`。
- **HTML 块内缩进 4 空格＝代码块** → 渲染失败。
- **颜色带不带空格都行**：`uno.config.ts` 的 blocklist 已从源头挡住 attributify 鬼规则；新增**会落到 DOM 的数值属性/prop** 要补进该文件 `NUMERIC_ATTRS`。
- **箭头尖端必须落在目标点**：用 `CourseArrow`；手写 `<marker>` 会画出"箭头后面挂个长方形"。
- **物理正确性**：受力一律从**几何中心**出发；速度 / 加速度画**旁侧**、略小一号；题目页的**分析类标注点击后才出**（`:show-forces="$clicks >= 1"`）。

## 症状 → 病因（先查表，别乱试）

| 症状                                                       | 先看                                                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| 图元看不见 / `opacity` 变 0.9% / 线宽爆炸 / 位置莫名        | [svg-attributify-trap.md](../../notes/svg-attributify-trap.md) ⭐⭐（含诊断脚本） |
| SVG 只剩空框、控制台不报错                                | SVG 里有空行 → [slidev-layout.md](../../notes/slidev-layout.md)   |
| 箭头后面挂长方形 / 尖端不到点                              | [slidev-svg.md](../../notes/slidev-svg.md)                        |
| 坐标轴末端箭头顶在刻度上                                   | [coordinate-axes-conventions.md](../../notes/coordinate-axes-conventions.md) |
| 元素越出画布 / 图被裁 / 页面顶出                           | 跑 e2e 看报告，别肉眼猜 → [e2e-checks.md](../../notes/e2e-checks.md) |

## 汇报口径

改完说清：改了哪些文件、用了哪个组件、`grep -c "<svg"` 结果、截图路径、e2e 结论。
截图验收由 **Lead** 把关，不是执行者的硬条。
