---
theme: default
title: "库仑定律"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: course-cover
colorSchema: dark
clickAnimation: card
addons:
  - ../workspace/shared
# 只用系统字体：不从 Google Fonts 拉取（provider: none），因此不写 fonts.sans / fonts.mono
fonts:
  provider: none
# 页面外壳用共享 addon 的 base-flex 布局（flex 列；正文 .page-grow 靠它撑满）
defaults:
  layout: base-flex
  transition: fade
chapter-no: "9.2"
chapter: "第九章 静电场及其应用"
subtitle: 电荷之间的相互作用遵从什么规律
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
title: 电荷之间的作用力与哪些因素有关
---

<div class="page-grow">

<div class="ask">带正电的带电体 C 与丝线悬挂的带正电小球之间的作用力，随距离怎样改变？在同一位置增大或减小小球所带的电荷量，作用力又会怎样变化？</div>

<div class="half-grid">
<div class="figure"><ChargeDistanceExperimentSvg :show-marks="$clicks >= 1" /></div>
<div class="divider-l stack">
<div>小球偏离竖直方向的角度越大，说明作用力越大。</div>
<div v-click="1" class="tip-hint">电荷之间的作用力随着电荷量的增大而增大，随着距离的增大而减小。</div>
<div v-click="2">电荷之间的作用力会不会与万有引力具有相似的形式——与电荷量的乘积成正比、与距离的二次方成反比？</div>
</div>
</div>

</div>

---
layout: base-flex
clicks: 3
class: title-ask
title: 库仑定律
---

<div class="page-grow">

# 电荷之间的作用力遵从什么规律？

<div v-click="1">
<DefinitionBox term="库仑定律" tone="gold">
<div>真空中两个静止点电荷之间的相互作用力，与它们的电荷量的乘积成正比，与它们的距离的二次方成反比，作用力的方向在它们的连线上。这种电荷之间的相互作用力叫作<span class="def-term">静电力</span>（或库仑力）。</div>
</DefinitionBox>
</div>

<div v-click="2" class="text-center"><Latex tex="F = k\dfrac{q_1 q_2}{r^2}" display /></div>

<div v-click="3" class="tip-hint">同种电荷之间的作用力为斥力，异种电荷之间的作用力为引力；作用力的方向在它们的连线上。</div>

</div>

---
layout: base-flex
clicks: 3
title: 点电荷
---

<div class="page-grow">

<div class="ask">任何带电体都有形状和大小，什么情况下可以把它看成一个带电的点？</div>

<div class="half-grid">
<div class="figure" v-click="2"><PointChargeConditionSvg /></div>
<div class="divider-l stack">
<div v-click="1">
<DefinitionBox term="点电荷" tone="blue">
<div>带电体之间的距离比它们自身的大小大得多、以致形状、大小及电荷分布状况对作用力的影响可以忽略时，这样的带电体可以看作带电的点。</div>
</DefinitionBox>
</div>
<div v-click="3" class="tip-hint">点电荷类似于力学中的质点，是一种理想化的物理模型。</div>
</div>
</div>

</div>

---
layout: base-flex
clicks: 3
title: 库仑的实验
---

<div class="page-grow">

<div class="ask">两个带电小球之间的作用力很小，库仑怎么把它测出来，又怎么找到力与距离的关系？</div>

<div class="half-grid">
<div class="figure" v-click="1">
<TorsionBalanceSvg :show-force="$clicks >= 1" :show-twist-angle="$clicks >= 2" />
</div>
<div class="divider-l stack">
<div v-click="1">细银丝的下端悬挂一根绝缘棒，一端是小球 <Latex tex="A" />、另一端通过物体 <Latex tex="B" /> 使棒平衡。带电的小球 <Latex tex="C" /> 与 <Latex tex="A" /> 带同种电荷，<Latex tex="C" /> 靠近 <Latex tex="A" /> 时，<Latex tex="A" /> 因斥力远离。</div>
<div v-click="2">扭转悬丝，使 <Latex tex="A" /> 回到初始位置并静止——扭转的角度可以比较力的大小。</div>
<div v-click="3" class="important-hint">改变 <Latex tex="A" /> 与 <Latex tex="C" /> 之间的距离 <Latex tex="r" />，记录每次悬丝扭转的角度，得到 <Latex tex="F \propto \dfrac{1}{r^2}" />。</div>
</div>
</div>

</div>

---
layout: base-flex
clicks: 3
title: 库仑的实验
---

<div class="page-grow">

<div class="ask">库仑那个年代还不知道怎样测量电荷量，他怎么研究力与电荷量的关系？</div>

<div class="half-grid">
<div class="figure"><ChargeSharingSvg /></div>
<div class="divider-l stack">
<div v-click="1">两个完全相同的金属小球，一个带电、一个不带电，互相接触后，它们对相隔同样距离的第三个带电小球的作用力相等——可以断定这两个小球接触后所带的电荷量相等。</div>
<div v-click="2">多次重复，可以把带电小球的电荷量 <Latex tex="q" /> 分为 <Latex tex="\dfrac{q}{2},\ \dfrac{q}{4},\ \dfrac{q}{8},\ \dots" />。</div>
<div v-click="3" class="important-hint">电荷之间的作用力与电荷量的乘积成正比：<Latex tex="F \propto q_1 q_2" /></div>
</div>
</div>

</div>

---
layout: base-flex
clicks: 3
title: 公式与静电力常量
---

<div class="page-grow">

<div class="text-center"><Latex tex="F = k\dfrac{q_1 q_2}{r^2}" display /></div>

<div>在国际单位制中，电荷量的单位是库仑（<Latex tex="\text{C}" />），力的单位是牛顿（<Latex tex="\text{N}" />），距离的单位是米（<Latex tex="\text{m}" />）。<Latex tex="k" /> 是比例系数，叫作静电力常量。</div>

<div v-click="1" class="tip-hint"><Latex tex="k = 9.0 \times 10^9\ \text{N}\cdot\text{m}^2/\text{C}^2" /></div>

<div v-click="2" class="important-hint">两个电荷量均为 <Latex tex="1\ \text{C}" /> 的点电荷在真空中相距 <Latex tex="1\ \text{m}" /> 时，相互作用力是 <Latex tex="9.0 \times 10^9\ \text{N}" />——差不多相当于一百万吨的物体所受的重力。</div>

<div v-click="3">通常，一把梳子和衣袖摩擦后所带的电荷量不到百万分之一库仑；天空中发生闪电之前，巨大的云层中积累的电荷量可达几百库仑。</div>

</div>

---
layout: base-flex
clicks: 3
title: 库仑定律实验室
---

<div class="page-grow">

<div class="ask">把 <Latex tex="q_1" />、<Latex tex="q_2" />、<Latex tex="r" /> 调一调，<Latex tex="F" /> 会怎么变？</div>

<CoulombForceLab :show-force="$clicks >= 1" :show-readout="$clicks >= 1" :show-compare="$clicks >= 2" />

<div v-click="3" class="tip-hint">电荷之间的作用力与 <Latex tex="q_1 q_2" /> 成正比、与 <Latex tex="r^2" /> 成反比；同种电荷相斥、异种电荷相吸。</div>

</div>

---
layout: exercise-split
clicks: 3
title: 例题 1：静电力与万有引力
---

<template v-slot:stem>

<div><b class="ex-no">例题 1</b>　在氢原子内，氢原子核与电子之间的最短距离为 <Latex tex="5.3 \times 10^{-11}\ \text{m}" />。试比较氢原子核与电子之间的静电力和万有引力。</div>

</template>

<div v-click="1">氢原子核与质子所带的电荷量相同，都是 <Latex tex="1.6 \times 10^{-19}\ \text{C}" />；电子所带的电荷量也是 <Latex tex="1.6 \times 10^{-19}\ \text{C}" />。质子质量为 <Latex tex="1.67 \times 10^{-27}\ \text{kg}" />，电子质量为 <Latex tex="9.1 \times 10^{-31}\ \text{kg}" />。</div>

<div v-click="2"><Latex tex="F_{\text{库}} = k\dfrac{q_1 q_2}{r^2} = 9.0 \times 10^9 \times \dfrac{(1.6 \times 10^{-19})^2}{(5.3 \times 10^{-11})^2}\ \text{N} = 8.2 \times 10^{-8}\ \text{N}" display /></div>

<div v-click="3"><Latex tex="F_{\text{引}} = G\dfrac{m_1 m_2}{r^2} = 3.6 \times 10^{-47}\ \text{N}" />，<Latex tex="\dfrac{F_{\text{库}}}{F_{\text{引}}} = 2.3 \times 10^{39}" />——研究微观带电粒子的相互作用时，可以把万有引力忽略。</div>

---
layout: base-flex
clicks: 3
title: 静电力的叠加
---

<div class="page-grow">

<div class="ask">如果有三个以上的点电荷，其中某一个受到的合力怎么求？</div>

<div class="half-grid">
<div class="figure">
<ForceAdditionSvg :show-forces="$clicks >= 1" :show-parallelogram="$clicks >= 2" :show-resultant="$clicks >= 2" />
</div>
<div class="divider-l stack">
<div v-click="2" class="tip-hint">静电力的叠加遵循平行四边形定则。</div>
<div v-click="3"><b>两个或两个以上点电荷对某一个点电荷的作用力，等于各点电荷单独对这个点电荷的作用力的矢量和。</b></div>
</div>
</div>

</div>

---
layout: exercise-split
clicks: 3
title: 例题 2：等边三角形上的三个点电荷
---

<template v-slot:stem>

<div><b class="ex-no">例题 2</b>　真空中有三个带正电的点电荷，它们固定在边长为 <Latex tex="50\ \text{cm}" /> 的等边三角形的三个顶点上，每个点电荷的电荷量都是 <Latex tex="2.0 \times 10^{-6}\ \text{C}" />，求它们各自所受的静电力。</div>

</template>

<div v-click="1"><Latex tex="q_3" /> 受到 <Latex tex="q_1" />、<Latex tex="q_2" /> 的两个斥力 <Latex tex="F_1" />、<Latex tex="F_2" />，两个力的夹角是 <Latex tex="60^\circ" />（每个力与垂直平分线成 <Latex tex="30^\circ" />）。<Latex tex="q_1 = q_2 = q_3 = q" />，每两个点电荷之间的距离 <Latex tex="r" /> 都相同。</div>

<div v-click="2"><Latex tex="F_1 = F_2 = k\dfrac{q^2}{r^2} = 0.144\ \text{N}" display /></div>

<div v-click="3"><Latex tex="F = 2F_1\cos 30^\circ = 0.25\ \text{N}" />，方向沿 <Latex tex="q_1" /> 与 <Latex tex="q_2" /> 连线的垂直平分线向外；每个点电荷所受的静电力大小相等，均为 <Latex tex="0.25\ \text{N}" />。</div>

---
layout: exercise-split
clicks: 4
title: 练习：悬挂的两球求电荷量
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　两个分别用长 <Latex tex="13\ \text{cm}" /> 的绝缘细线悬挂于同一点的相同小球（可看作质点），带有同种等量电荷。由于静电力 <Latex tex="F" /> 的作用，它们之间的距离为 <Latex tex="10\ \text{cm}" />。已测得每个小球的质量是 <Latex tex="0.6\ \text{g}" />，求它们各自所带的电荷量。<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />。</div>

</template>

<div v-click="1">对其中一个小球受力分析：重力 <Latex tex="mg" />（竖直向下）、细线拉力 <Latex tex="F_T" />（沿细线指向悬点）、库仑力 <Latex tex="F" />（水平向外，两球带同种电荷）。</div>

<div v-click="2">悬点到球心的竖直距离 <Latex tex="h = \sqrt{(13\ \text{cm})^2 - (5\ \text{cm})^2} = 12\ \text{cm}" />，由三力平衡得 <Latex tex="\tan\theta = \dfrac{F}{mg} = \dfrac{5}{12}" />。</div>

<div v-click="3">由 <Latex tex="F = mg\tan\theta" /> 得 <Latex tex="F = mg \cdot \dfrac{5}{12} = 2.5 \times 10^{-3}\ \text{N}" />。</div>

<div v-click="4">再由 <Latex tex="F = k\dfrac{q^2}{d^2}" /> 得 <Latex tex="q = \sqrt{\dfrac{Fd^2}{k}} \approx 5.3 \times 10^{-8}\ \text{C}" />。</div>

---
layout: exercise-split
clicks: 3
title: 练习：球心相距 3r 的两球
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　半径为 <Latex tex="r" /> 的两个金属球，其球心相距 <Latex tex="3r" />，现使两球带上等量的同种电荷 <Latex tex="Q" />，两球之间的静电力 <Latex tex="F = k\dfrac{Q^2}{9r^2}" /> 吗？说明道理。</div>

</template>

<div v-click="1">两球表面之间的距离只有 <Latex tex="r" />，与球的半径 <Latex tex="r" /> 属于同一量级，不满足"带电体之间的距离比它们自身的大小大得多"——两球不能看作点电荷。</div>

<div v-click="2">不能直接用 <Latex tex="F = k\dfrac{Q^2}{9r^2}" /> 计算。作用力还与两球的形状、大小以及电荷分布状况有关：两球带同种电荷互相排斥，电荷分布在远离对方的一侧，等效电荷间距大于 <Latex tex="3r" />，实际静电力小于 <Latex tex="k\dfrac{Q^2}{9r^2}" />。</div>

<div v-click="3">只有满足点电荷的条件，才能用库仑定律计算两个带电体之间的静电力。</div>

---
layout: exercise-split
clicks: 3
title: 练习：正方形四个顶点上的点电荷
---

<template v-slot:stem>

<div><b class="ex-no">练习三</b>　在边长为 <Latex tex="a" /> 的正方形的每个顶点都放置一个电荷量为 <Latex tex="q" /> 的同种点电荷。如果保持它们的位置不变，每个电荷受到其他三个电荷的静电力的合力是多少？</div>

</template>

<div v-click="1">相邻两个电荷对它的力 <Latex tex="F_1 = F_2 = k\dfrac{q^2}{a^2}" />（两个力互相垂直）；对角电荷对它的力 <Latex tex="F_3 = k\dfrac{q^2}{(\sqrt{2}a)^2} = \dfrac{kq^2}{2a^2}" />（沿对角线向外）。</div>

<div v-click="2"><Latex tex="F_1" />、<Latex tex="F_2" /> 的合力为 <Latex tex="\sqrt{2}\,k\dfrac{q^2}{a^2}" />，方向沿对角线向外，与 <Latex tex="F_3" /> 同向。</div>

<div v-click="3"><Latex tex="F = \sqrt{2}\,k\dfrac{q^2}{a^2} + \dfrac{kq^2}{2a^2} = \dfrac{(2\sqrt{2}+1)kq^2}{2a^2}" />，方向沿对角线向外。</div>

---
layout: base-flex
clicks: 3
title: 课堂小结
---

<div class="page-grow">

<div class="ask">这节课我们得到了哪几条结论？</div>

<div v-click="1" class="tip-hint">库仑定律：真空中两个静止点电荷之间的作用力 <Latex tex="F = k\dfrac{q_1 q_2}{r^2}" />，方向在它们的连线上；同种电荷互相排斥，异种电荷互相吸引。</div>

<div v-click="2" class="tip-hint">点电荷：带电体之间的距离比它们自身的大小大得多时，可以看作点电荷（理想化的物理模型）。</div>

<div v-click="3" class="tip-hint">叠加：多个点电荷对某一个点电荷的作用力，等于各点电荷单独对它作用力的矢量和（遵循平行四边形定则）。</div>

</div>
