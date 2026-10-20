---
name: courseware-page
description: 在本仓高中物理课件里新增或改写一页 slides.md 的标准流程：先定"这页要学生看清什么" → 标题三选一 → 选布局 → 排点击节奏（先问后答、分析类标注点击后才出）→ 选原子 → 上屏信息量与物理正确性自检。Use when 要写/改一页课件、或不知道该用什么布局、原子、点击顺序。
---

# 写一页课件

一页 = 一个问题。写之前先能用一句话回答：**这页要学生"看着想"或"看清"什么？** 答不出来 → 该拆页、该并页、或这页根本不该存在。

## 五步

1. **标题三选一**（`# 标题` 只点主题，**不给答案**）：
   - **不写**：提问页 / 引课页 / 练习页 / 纯叙述页 —— 原话写进 frontmatter `title:`（保住目录），页面不必再写 `#`；
   - **小档**：主题名（如"长度的测量方式"）；
   - **大档**：整页就是在回答这个问题 → headmatter/frontmatter 写 `class: title-ask`。
   ⛔ 不写与封面重复的课题名、不写只复述阶段名的空标题。
2. **选布局**：默认 `base-flex`（headmatter 里 `defaults: { layout: base-flex }`）；封面 `course-cover`；
   一道题占一页 → `exercise-split`、一个大问题长时间讨论 → `focus-question`（读 [exercise-layouts.md](../../notes/exercise-layouts.md) ⭐，
   具名 slot **不能**写 `<template #stem>`）；正文包 `.page-grow` 才会撑满。
3. **排点击**（先问后答）：问题 → 演示 → 结论，顺序不能倒。硬规则：
   - 题目页第一眼只能有**干净题干 + 干净题目图**，受力分析/分解/答案一律 `:show-forces="$clicks >= 1"` 点击后才出；
   - **只许出现新元素，不许把已有元素顶跑**；分步隐藏用 `visibility: hidden` 占位，**不要用 `v-if`**；
   - 见 [slidev-interactions.md](../../notes/slidev-interactions.md)。
4. **选原子**（都在共享 addon 里，**本课 `style.css` 不要复制**）：提问 `.ask`；结论/提示 hint 气泡（`tip-hint` / `info-hint` / `warn-hint` / `danger-hint`）；
   定义 `<DefinitionBox>`；双栏 `.half-grid` + `.divider-l`；题目页题干 `.ask`、选项普通行、答案 `tip-hint`，**整题不用卡片**。
   写法与密度正本：[style-guide.md](../../notes/style-guide.md)、[courseware-style-pass.md](../../notes/courseware-style-pass.md)（§1 标题 / §5 气泡 / §8 练习页）。
5. **自检**（跑，不靠感觉）：

```bash
pnpm slide <slug> <页号>       # 读回源码，确认结构/缩进/组件
pnpm shots <slug> <页号>       # 未点击状态截图：是不是干净题干+干净题图
pnpm shots <slug> <页号> --clicks=each
E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts
```

## 上屏内容才算数（教师反复强调）

上屏只留"要学生**看着想 / 需要看清**"的：① 提问；② 核心结论；③ 复杂推导的中间步骤；④ 要演示的动态交互。
一律不上屏：教师口头一句能带过的过渡句、注释性小字、对图对表的赘述、"以后再讲"、**口诀腔与打比方**、用引号做强调。
判据一句话：**"这句话不写在屏幕上，学生就听不懂了吗？"** 不是 → 删。

## 物理正确性（写页时同时检查）

- **符号与单位一律走 LaTeX**：`<Latex tex="v_0" />`、`<Latex tex="\text{m/s}^2" />`，⛔ 不写 `v₀` / `θ` / `m/s²`。
- **定性页不出现数值**：v-t / a-x 这类只作定性判断的图，轴上不标刻度数字，该用符号就用符号（纵轴标 $g$）。
- **高一不引入微积分**：面积/累积结论走**微元法**（分小段 → 每段不变 → 求和 → 取极限），⛔ 屏幕上不出现 $\mathrm{d}x$、积分号。
- **受力从几何中心出发**；速度/加速度画**旁侧**、略小一号不与力重叠；力只用 $F$ + 角标（⛔ 裸写 `N`/`f`/`T`）。
- 例题推导顺序：**先看运动 → 该方向合力为零 → 得 $F_N=mg\cos\theta$ 这类关系 → 再对运动方向列 $F=ma$**。
- 一切物理内容以 `resources/textbooks/` 教材为准；拿不准查教材，**禁止凭记忆编造**。

## 汇报口径

改完说清：**页码 + 改了什么 + 为什么**（对应教师哪条意见）；上屏信息量与物理表述怎么自检的；
`pnpm slide` / `shots` 的结果。**截图验收由 Lead 把关**，不要把"我看过了"当结论。
