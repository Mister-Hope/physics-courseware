---
theme: default
title: "分子动能和分子势能"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: course-cover
colorSchema: dark
clickAnimation: card
addons:
  - ../workspace/shared
fonts:
  sans: Nunito Sans
  mono: Fira Code
  provider: none
# 页面外壳用共享 addon 的 base-flex 布局（flex 列；正文 .page-grow 靠它撑满）
defaults:
  layout: base-flex
  transition: fade
chapter-no: "1.4"
chapter: "第一章 分子动理论"
subtitle: "温度、势能与内能"
---
<CoverDecorationSvg />

---
layout: base-flex
title: 分子也在运动
clicks: 1
---

<div class="page-grow pt2">
<div class="ask ask-lead">物体运动时具有动能。<br>分子在不停地运动，它们有能量吗？</div>
<div class="p2-fig"><MolecularMotionSvg /></div>
<div class="tip-hint" v-click="1">分子具有动能；单个分子的速率不同，动能也不相同。</div>
</div>

---
layout: base-flex
title: 分子动能
clicks: 3
---

# 分子动能

<div class="page-grow pt3">
<div class="ask">分子都在运动，单个分子的动能怎样描述？</div>
<div class="half-grid p3-grid">
<div class="p3-fig"><MolecularMotionSvg /></div>
<div class="divider-l p3-notes">
<div class="p3-note" v-click="1">每个分子都在运动，都具有动能。</div>
<div class="p3-note" v-click="2">分子速率大小不一，动能也不断改变。</div>
<div class="p3-note" v-click="3">热现象研究大量分子，重要的是<strong>平均动能</strong>。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 温度与平均动能
clicks: 2
---

# 温度与平均动能

<div class="page-grow pt4">
<div class="ask">温度升高时，分子的平均动能怎样变化？</div>
<div class="p4-grid">
<div class="p4-card">
  <div class="p4-label">温度较低</div>
  <div class="p4-speed">分子运动较慢</div>
</div>
<div class="p4-card p4-hot">
  <div class="p4-label">温度较高</div>
  <div class="p4-speed">分子运动较剧烈</div>
</div>
</div>
<div class="p4-line" v-click="1">温度升高，分子热运动加剧，平均动能增大。</div>
<div class="tip-hint" v-click="2">温度是分子热运动<strong>平均动能</strong>的标志。</div>
</div>

---
layout: base-flex
title: 分子势能
clicks: 2
---

# 分子势能

<div class="page-grow pt5">
<div class="ask">分子间存在相互作用力，那么分子间是否存在势能？</div>
<div class="p5-def">分子间的作用力做功与路径无关，分子组成的系统具有<strong>分子势能</strong>。</div>
<div class="p5-line" v-click="1">规定两个分子相距无穷远时，分子势能为 0。</div>
<div class="p5-line" v-click="2">分子势能的大小由分子间的相对位置决定。</div>
</div>

---
layout: base-flex
title: 分子势能与距离
clicks: 2
---

# 分子势能与距离

<div class="page-grow pt6">
<div class="ask">分子势能 <Latex tex="E_{\mathrm{p}}" /> 随分子间距离 <Latex tex="r" /> 怎样变化？</div>
<div class="half-grid p6-grid">
<div class="p6-fig"><PotentialEnergyChart :step="$clicks" /></div>
<div class="divider-l p6-notes">
<div class="p6-note" v-click="1">当 <Latex tex="r=r_0" /> 时，分子势能达到最小值。</div>
<div class="p6-note" v-click="2">越过 <Latex tex="r_0" /> 继续靠近，分子势能迅速增大。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 为什么 r₀ 处势能最小
clicks: 3
---

# 为什么 <Latex tex="r_0" /> 处势能最小

<div class="page-grow pt7">
<div class="ask">从一个分子靠近另一个分子的过程看，分子力做功怎样改变势能？</div>
<div class="step-list p7-steps">
<div class="step-item" v-click="1"><span class="step-no">1</span><div><Latex tex="r>r_0" /> 时，分子力表现为引力；靠近时引力做正功，分子势能减小。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><Latex tex="r=r_0" /> 时，分子力为 0，分子势能减到最小。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div><Latex tex="r<r_0" /> 时，分子力表现为斥力；继续靠近时斥力做负功，分子势能增大。</div></div>
</div>
<div class="tip-hint" v-click="3">分子势能由分子间的相对位置决定，在 <Latex tex="r_0" /> 处最小。</div>
</div>

---
layout: base-flex
title: 分子势能与体积
clicks: 1
---

# 分子势能与体积

<div class="page-grow pt8">
<div class="ask">为什么说分子势能与物体的体积有关？</div>
<div class="half-grid p8-grid">
<div class="p8-card">
  <div class="p8-title">体积减小</div>
  <div class="p8-text">分子间距离减小，分子势能改变。</div>
</div>
<div class="p8-card">
  <div class="p8-title">体积增大</div>
  <div class="p8-text">分子间距离增大，分子势能改变。</div>
</div>
</div>
<div class="p8-line" v-click="1">体积变化 → 分子间距离变化 → 分子势能变化；固体、液体表现较明显。</div>
</div>

---
layout: base-flex
title: 物体的内能
clicks: 1
---

# 物体的内能

<div class="page-grow pt9">
<div class="ask">静止的物体有内能吗？</div>
<div class="p9-def">物体中<strong>所有分子的热运动动能</strong>与<strong>分子势能</strong>的总和，叫作物体的内能。</div>
<div class="p9-rows">
<div class="p9-row">分子永不停息地运动，所以任何物体都具有内能。</div>
<div class="p9-row">内能与温度、体积、物质的量都有关。</div>
</div>
<div class="tip-hint" v-click="1">静止只说明物体没有整体运动的机械能，分子仍在运动，内能不为 0。</div>
</div>

---
layout: base-flex
title: 内能与机械能
clicks: 2
---

# 内能与机械能

<div class="page-grow pt10">
<div class="ask">列车高速行驶时，车厢内物体的内能会变大吗？</div>
<div class="p10-grid">
<div class="p10-col p10-inner">
  <div class="p10-title">内能</div>
  <div class="p10-text">分子热运动动能 + 分子势能</div>
  <div class="p10-text">与温度、体积、物质的量有关</div>
  <div class="p10-text">任何物体都有</div>
</div>
<div class="p10-col p10-mech">
  <div class="p10-title">机械能</div>
  <div class="p10-text">物体整体运动的动能 + 重力势能等</div>
  <div class="p10-text">与速度、高度、形变有关</div>
  <div class="p10-text">可以为零</div>
</div>
</div>
<div class="p10-line" v-click="1">列车速度变大，增大的是机械能，不是分子热运动的能量。</div>
<div class="tip-hint" v-click="2">温度是分子平均动能的标志，与物体整体的运动速度无关。</div>
</div>

---
layout: base-flex
title: 内能的影响因素
clicks: 0
---

# 内能的影响因素

<div class="page-grow pt11">
<div class="ask">哪些因素会改变物体的内能？</div>
<div class="three-col p11-cards">
<div class="p11-card">
  <div class="p11-title">温度</div>
  <div class="p11-text">温度变化，分子平均动能变化。</div>
</div>
<div class="p11-card">
  <div class="p11-title">体积</div>
  <div class="p11-text">体积变化，分子间距离变化，分子势能变化。</div>
</div>
<div class="p11-card">
  <div class="p11-title">物质的量</div>
  <div class="p11-text">分子数越多，内能通常越大。</div>
</div>
</div>
<div class="tip-hint">内能由多个因素共同决定，不能只看温度。</div>
</div>

---
layout: exercise-split
title: 例题：水蒸发时内能变吗
clicks: 3
analysisLabel: 解析
---

<template v-slot:stem>
密闭容器中有一滴 15 ℃ 的水，过一段时间后蒸发成 15 ℃ 的水蒸气。它的内能是否发生变化？为什么？
</template>

<div class="p12-analysis">
<div class="p12-line" v-click="1">温度不变，分子热运动的平均动能不变。</div>
<div class="p12-line" v-click="2">水变成水蒸气，体积增大，分子间距离增大；分子势能增大。</div>
<div class="p12-line" v-click="3">所以内能增大；蒸发过程从周围吸收热量。</div>
</div>

---
layout: exercise-split
title: 例题：铁块降温时内能变吗
clicks: 3
analysisLabel: 解析
---

<template v-slot:stem>
真空钟罩中，用不导热的细线悬吊一个铁块。中午铁块温度为 28 ℃，晚上为 23 ℃。铁块的内能是否发生变化？为什么？
</template>

<div class="p13-analysis">
<div class="p13-line" v-click="1">温度降低，分子热运动的平均动能减小。</div>
<div class="p13-line" v-click="2">铁块体积变化很小，分子势能变化可忽略。</div>
<div class="p13-line" v-click="3">所以内能减少；铁块向周围放出热量。</div>
</div>

---
layout: exercise-split
title: 例题：列车提速时温度升高吗
clicks: 3
analysisLabel: 解析
---

<template v-slot:stem>
有人说：列车速度由小变大的过程中，组成列车上物体的分子平均动能也增大，所以列车上的物体温度升高了。你说对吗？为什么？
</template>

<div class="p14-analysis">
<div class="p14-line" v-click="1">列车速度变大，是物体整体的机械运动，增大的是机械能。</div>
<div class="p14-line" v-click="2">温度是分子热运动平均动能的标志，与列车整体速度无关。</div>
<div class="p14-line" v-click="3">所以说法错误；列车提速不会使物体温度升高。</div>
</div>

---
layout: exercise-split
title: 例题：举高物体内能增加吗
clicks: 3
analysisLabel: 解析
---

<template v-slot:stem>
有人说：把一个物体举高时，组成物体的每个分子都克服重力做功，所以分子势能增大，物体的内能也增大。你说对吗？为什么？
</template>

<div class="p15-analysis">
<div class="p15-line" v-click="1">重力势能是物体整体具有的机械能，不是分子势能。</div>
<div class="p15-line" v-click="2">举高物体增加的是重力势能，内能不变（不计热传递）。</div>
<div class="p15-line" v-click="3">所以说法错误；分子势能由分子间的相对位置决定。</div>
</div>

---
layout: base-flex
title: 练习：判断与解释
clicks: 4
---

# 练习：判断与解释

<div class="page-grow pt16">
<div class="p16-row">1. 温度是分子热运动平均动能的标志。<span class="p16-ans" v-click="1">√</span></div>
<div class="p16-row">2. 温度高的物体内能一定大。<span class="p16-ans" v-click="2">× 内能还与分子数、体积有关</span></div>
<div class="p16-row">3. 0 ℃ 的物体没有内能。<span class="p16-ans" v-click="3">× 任何物体都有内能</span></div>
<div class="p16-row">4. 物体被举高，内能增大。<span class="p16-ans" v-click="4">× 增加的是重力势能</span></div>
</div>

---
layout: base-flex
title: 课堂小结
clicks: 0
---

# 课堂小结

<div class="page-grow pt17">
<div class="step-list">
<div class="step-item"><span class="step-no">1</span><div><strong>分子动能</strong>：分子永不停息地运动，平均动能与温度有关。</div></div>
<div class="step-item"><span class="step-no">2</span><div><strong>分子势能</strong>：由分子间距离决定，在 <Latex tex="r_0" /> 处最小；与体积有关。</div></div>
<div class="step-item"><span class="step-no">3</span><div><strong>内能</strong>：所有分子动能与势能的总和；与温度、体积、物质的量有关。</div></div>
<div class="step-item"><span class="step-no">4</span><div><strong>内能≠机械能</strong>：整体运动或高度变化不改变分子热运动的能量。</div></div>
</div>
</div>

---
layout: exercise-split
title: 练习：分子势能随距离的变化
clicks: 3
analysisLabel: 解析
---

<template v-slot:stem>
当分子间距离为 <Latex tex="r_0" /> 时，分子间的作用力为 0。分析分子间距离从 <Latex tex="0.9r_0" /> 增大到 <Latex tex="10r_0" /> 的过程中，分子间作用力及分子势能的大小如何变化。
</template>

<div class="p18-analysis">
<div class="p18-line" v-click="1"><Latex tex="0.9r_0 \to r_0" />：分子力表现为斥力，逐渐减小到 0；分子势能减小到最小。</div>
<div class="p18-line" v-click="2"><Latex tex="r_0 \to 10r_0" />：分子力表现为引力，先增大后减小；分子势能从最小增大，趋于 0。</div>
<div class="p18-line" v-click="3">结论：分子势能先减小后增大，在 <Latex tex="r_0" /> 处最小。</div>
</div>
