# 笔记：题目页 / 思考页共享布局（exercise-split · focus-question）

> 什么时候读：要写"一道题占一页"的题目页、或"一个大问题长时间讨论"的思考页时。
> 两个布局都由共享 addon（`workspace/shared/layouts/`）自动注册，headmatter 里写 `layout:` 即可用。
>
> **选哪个**：有题干 + 示意图 + 解析 → `exercise-split`；整页只有一个大问题/大操作指引、学生讨论时长时间停留 → `focus-question`。

## 0. ⚠️ 先看这条：具名 slot 的写法（写错整页直接坏）

本仓库的 Slidev（52.x）里，**`<template #stem>` 会被 markdown-it 转义成可见文字**（`#stem` 不是合法 HTML 属性名，
渲染成 `&lt;template #stem&gt;` 摆在屏幕上）。正确写法只有两种：

1. **`<template v-slot:stem>`**（推荐）——标签独占一行，**前后各留一个空行**，slot 内容就是正常 markdown：

   ```md
   <template v-slot:stem>

   题干内容（公式、图、v-click 都照常写）

   </template>
   ```

2. **`::stem::` 语法糖**（Slidev 内置 slot sugar）——行首写 `::stem::`，其后到下一个 `::xxx::` 之前的内容都算这个 slot：

   ```md
   ::stem::

   题干内容
   ```

   注意语法糖会把**第一个标记之前的所有内容**放进默认 slot，所以想让"解析"当默认 slot，
   要么把解析写在所有 `::` 标记之前（不直观），要么干脆用写法 1。

**布局作者视角**：两种写法渲染结果一样，笔记与课件里统一优先用写法 1（`v-slot:` 形式），可读性最好。

---

## 1. `exercise-split`：题目页（题干在上 + 窄图 + 解析）

**给什么页用**：一道题占一页、题干和题目图常显、解析点击分步出的例题/练习页。
题干视觉沿用共享 `.problem`（左侧蓝竖线），不另造样式。

### frontmatter 与 slot

```md
---
layout: exercise-split
---

<template v-slot:stem>

题干（常显；可含公式、图、v-click）。复用 `.problem` 的蓝竖线视觉，不用再包卡片。

</template>

<template v-slot:fig>

<InclineSvg />

</template>

解析正文（默认 slot；点击节奏自己用 v-click 控制）
```

| 位置            | 填什么                                                   | 显示时机                       |
| --------------- | -------------------------------------------------------- | ------------------------------ |
| `#stem`（具名） | 题干：文字 + 公式 + 干净题目图（若有独立图组件也可放这） | **常显**（学生第一眼就要看到） |
| `#fig`（具名）  | 示意图组件（`<XxxSvg />`），宽度自适应、尽可能窄         | **常显**                       |
| 默认 slot       | 解析/推导步骤；用 `v-click` 分步                         | 点击逐条出                     |

### 版面行为（写在布局组件 `<style>` 里，前缀 `ex-`）

- 顶部题干行整宽置顶（`.ex-stem` 直接挂共享 `.problem`，不重写共享选择器）；
- 下方两栏 flex：图栏 `.ex-fig` 用 `width: max-content; max-width: 42%`（图按自身比例收窄，上限 42%），
  解析栏复用 `.page-grow`（`flex:1` + 内容少时垂直居中、多时撑满；e2e 的"正文越界"检查照常生效）；
- **`#fig` 为空时自动退化**：布局用 `hasRealContent($slots.fig)` 判断（注释/纯空白不算内容），
  没图就不渲染图栏，解析栏直接吃掉整行——不会留一个空的窄栏；
- 任何栏都不加背景/圆角/边框，示意图无缝嵌入页面，靠留白与 `.fig-cap` 图注区分。

### 完整示例（可直接抄）

```md
---
layout: exercise-split
---

<template v-slot:stem>

物块以初速度 $v_0 = 4\,\text{m/s}$ 沿粗糙斜面上滑，斜面倾角 $\theta = 30°$，
物块与斜面间动摩擦因数 $\mu = 0.2$。求物块沿斜面上滑的最大距离 $x$。

</template>

<template v-slot:fig>

<UphillBlockSvg />

</template>

先看运动：物块沿斜面向上减速到零，加速度方向沿斜面向下。

该方向受力：重力分量 $mg\sin\theta$ 与滑动摩擦力 $F_f = \mu mg\cos\theta$ 均沿斜面向下。

<Latex tex="a = g(\sin\theta + \mu\cos\theta) = 6.7\,\text{m/s}^2" />

由 $0 - v_0^2 = -2ax$ 得 $x = \dfrac{v_0^2}{2a} \approx 1.2\,\text{m}$。
```

（解析里的三步按需包 `v-click`；题目图里的受力标注按 AGENTS.md「三·题目图与受力分析」用
`:show-forces="$clicks >= 1"` 控制，**点击前图必须是干净的**。）

---

## 2. `focus-question`：思考页（一个大问题占满整页）

**给什么页用**：整页只有一个大问题/大操作指引、学生讨论时**长时间停留**的页面
（反例：把大问题挤在上半屏、下面留一大片空，如 10.4 第 19 页旧版写法）。

### frontmatter 与 slot

```md
---
layout: focus-question
---

<template v-slot:icon>

<mdi-lightbulb-on-outline />

</template>

弹簧测力计的示数，一定等于物体的重力吗？

<template v-slot:hint>

提示：先想想测力计倒过来测自己会怎样。

</template>

<template v-slot:answer>

只有物体静止且只受重力和拉力时，示数才等于重力。加速上升时示数大于重力（超重）。

</template>
```

| 位置                    | 填什么                                                                           | 显示时机                       |
| ----------------------- | -------------------------------------------------------------------------------- | ------------------------------ |
| 默认 slot               | 问题文字本身（默认 `.text-4xl`；整页更空时包一层 `<div class="text-5xl">` 放大） | **常显**（整页的主角）         |
| `#icon`（具名，可选）   | 大号图标 `<mdi-xxx />`（布局里兜底放大到 4rem）                                  | 常显                           |
| `#hint`（具名，可选）   | 讨论提示/操作指引                                                                | **点击后**（布局自带 v-click） |
| `#answer`（具名，可选） | 讨论结束后的解析/答案                                                            | **点击后**（再点一次）         |

### 版面行为（前缀 `fq-`）

- 整页垂直+水平居中（`.slidev-layout.focus-question` 是 flex 列 + `justify-content: center`），"顶天立地"；
- 图标与问题文字**都不加背景容器**；`#hint` 弱化为次级色小字，`#answer` 复用 `.problem` 同款蓝竖线（无卡片）；
- `#hint` / `#answer` 由布局统一包 `v-click`，页面里**不要**再套一层；
- 空 slot（写了 `::` 标记但没内容）自动不渲染，不留空容器。

---

## 3. 两个布局的共同约定

- 根元素保持 `.slidev-layout` + 自己的类名；内边距由 `common.css` 的 `.slidev-layout` 提供，**不要覆盖**；
- 颜色只用 `var(--c-*)`、圆角只用 `var(--radius-*)`（本批两个布局实际没用到圆角）；
- 样式全部写在布局组件自己的 `<style>` 里（自包含），不动 `workspace/shared/styles/index.css`；
- 验证：`pnpm shots <课件> <页号> --clicks=all` 截图自查，`E2E_COURSE=<课件> pnpm exec playwright test e2e/layout-overflow.spec.ts` 逐页量。
