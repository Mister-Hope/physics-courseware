---
theme: default
title: "气体的等温变化"
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
chapter-no: "2.2"
chapter: "第二章 气体、固体和液体"
subtitle: "温度不变时，压强怎样随体积变化"
---

<CoverDecorationSvg />

---
clicks: 2
clickAnimation: none
---

<div class="page-grow page-around">
<div class="stack" style="width:100%;max-width:820px;margin:0 auto">
<div class="ask ask-lead">庆典上放飞的气球，升到高空后<br />里面的气体发生了哪些变化？</div>
<div v-click="1" class="stack-tight">
<div class="step-line">大气压在减小。</div>
<div class="step-line">温度在降低。</div>
<div class="step-line">气球在膨胀，体积在增大。</div>
</div>
<div v-click="2" class="mini-title" style="text-align:center">一定质量的气体的 <Latex tex="p" />、<Latex tex="V" />、<Latex tex="T" /> 之间是有联系的。</div>
</div>
</div>

---
---

# 描述气体的三个状态参量

<div class="page-grow page-around">
<div class="three-col">
<div class="stack-tight">
<div class="mini-title">压强 <Latex tex="p" /></div>
<div class="step-line">大量分子不断撞击容器壁，产生压强。</div>
<div class="mini-note">单位：<Latex tex="\text{Pa}" /></div>
</div>
<div class="stack-tight">
<div class="mini-title">体积 <Latex tex="V" /></div>
<div class="step-line">气体总是充满整个容器，体积就是容器的容积。</div>
<div class="mini-note">单位：<Latex tex="\text{m}^{3}" />、<Latex tex="\text{L}" /></div>
</div>
<div class="stack-tight">
<div class="mini-title">温度 <Latex tex="T" /></div>
<div class="step-line">描述气体的冷热程度，决定分子热运动的剧烈程度。</div>
<div class="mini-note">单位：<Latex tex="\text{K}" /></div>
</div>
</div>
</div>

---
clicks: 1
---

<div class="page-grow page-around">
<div class="stack" style="width:100%;max-width:840px;margin:0 auto">
<div class="ask ask-lead">先研究一种特殊情况：<br />温度不变时，气体的压强怎样随体积变化？</div>
<div v-click="1" class="tip-hint"><span class="def-term">等温变化</span>：一定质量的气体，在温度不变的条件下，压强与体积变化的过程。</div>
<div class="step-line" style="text-align:center">控制变量：质量一定、温度不变，只改变体积，测量对应的压强。</div>
</div>
</div>

---
clicks: 3
---

# 用什么装置研究等温变化

<div class="page-grow">
<div class="half-grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1.08fr);align-items:start">
<div style="width:100%"><SyringeSvg :volume="$clicks >= 2 ? 0.42 : 0.62" :show-labels="$clicks >= 1" /></div>
<div class="stack-tight">
<div v-click="1" class="step-line">研究对象：柱塞和橡胶套封闭的一段空气柱。</div>
<div v-click="2" class="step-line">缓慢向下压柱塞，空气柱的体积变小。</div>
<div v-click="3" class="step-line">再缓慢向上拉，体积变大，读出对应的压强。</div>
<div v-click="3" class="step-line">手不要握住筒身：让气体与外界充分交换热量，温度才能保持不变。</div>
</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1.08fr);align-items:start">
<div style="width:100%"><SyringeSvg :volume="0.55" show-length /></div>
<div class="stack-tight">
<div v-click="1" class="step-line">用刻度尺读出空气柱的长度 <Latex tex="l" />，横截面积 <Latex tex="S" /> 已知：<Latex tex="V = lS" />。</div>
<div v-click="2" class="step-line">压强 <Latex tex="p" /> 从与空气柱相连的压力表读出。</div>
<div v-click="3" class="step-line">缓慢推拉柱塞，读出多组 <Latex tex="V" /> 与 <Latex tex="p" /> 的数据。</div>
</div>
</div>
</div>

---
clicks: 6
---

# 多组数据说明了什么

<div class="page-grow page-around">
<table class="data-table">
<thead>
<tr><th>组次</th><th><Latex tex="V/\text{mL}" /></th><th><Latex tex="p/\text{kPa}" /></th><th><Latex tex="pV/(\text{kPa}\cdot\text{mL})" /></th><th><Latex tex="\left(\dfrac{1}{V}\right)/\text{mL}^{-1}" /></th></tr>
</thead>
<tbody>
<tr v-click="1"><td>1</td><td>20</td><td>100</td><td>2 000</td><td>0.050</td></tr>
<tr v-click="2"><td>2</td><td>16</td><td>125</td><td>2 000</td><td>0.063</td></tr>
<tr v-click="3"><td>3</td><td>12</td><td>167</td><td>2 004</td><td>0.083</td></tr>
<tr v-click="4"><td>4</td><td>10</td><td>200</td><td>2 000</td><td>0.100</td></tr>
<tr v-click="5"><td>5</td><td>8</td><td>250</td><td>2 000</td><td>0.125</td></tr>
</tbody>
</table>
<div v-click="6" class="mini-title" style="text-align:center"><Latex tex="pV" /> 几乎不变：体积减半，压强约变为二倍——<Latex tex="p" /> 与 <Latex tex="V" /> 可能成反比。</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:start">
<div style="width:100%"><IsothermGraphs mode="pv" :show-points="$clicks >= 1" :show-fit="$clicks >= 2" /></div>
<div class="stack-tight">
<div class="ask">描出的图线是什么形状？</div>
<div v-click="1" class="step-line">五个数据点连成的曲线像双曲线。</div>
<div v-click="2" class="step-line">但“像”双曲线，不能确定 <Latex tex="p" /> 与 <Latex tex="V" /> 成反比。</div>
<div v-click="3" class="step-line">换一种坐标：把横坐标改成 <Latex tex="\dfrac{1}{V}" />。</div>
</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:start">
<div style="width:100%"><IsothermGraphs mode="pinv" :show-points="$clicks >= 1" :show-fit="$clicks >= 2" /></div>
<div class="stack-tight">
<div class="ask">这些点落在哪里？</div>
<div v-click="1" class="step-line"><Latex tex="\dfrac{1}{V}" /> 作横坐标，各点几乎在一条直线上。</div>
<div v-click="2" class="step-line">直线过原点：<Latex tex="p \propto \dfrac{1}{V}" />，即 <Latex tex="p" /> 与 <Latex tex="V" /> 成反比。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 玻意耳定律

<div class="page-grow">
<div class="stack">
<div v-click="1"><DefinitionBox term="玻意耳定律">一定质量的某种气体，在温度不变的情况下，压强与体积成反比，即 <span class="def-term"><Latex tex="p \propto \dfrac{1}{V}" /></span>。</DefinitionBox></div>
<div v-click="2" class="half-grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem;justify-items:center">
<div><Latex tex="pV = C" display /></div>
<div><Latex tex="p_1 V_1 = p_2 V_2" display /></div>
</div>
<div v-click="3" class="step-line"><Latex tex="C" /> 是常量：温度不同、质量不同、气体种类不同时，<Latex tex="C" /> 一般不相等。</div>
</div>
</div>

---
clicks: 2
---

# 定律的适用条件

<div class="page-grow">
<div class="half-grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);align-items:start">
<div class="stack-tight">
<div v-click="1" class="step-line">① 气体的质量一定：不能有漏气、打气。</div>
<div v-click="1" class="step-line">② 气体的温度不变：变化要缓慢，让它与外界充分交换热量。</div>
<div v-click="2" class="step-line">温度越高，<Latex tex="pV" /> 越大，等温线离原点越远。</div>
</div>
<div style="width:100%"><IsothermGraphs mode="pv" :show-points="false" show-higher /></div>
</div>
</div>

---
---

# 在等温线上移动状态点

<div class="page-grow">
<BoyleLab />
</div>

---
layout: exercise-split
title: 例题：给足球打气
clicks: 4
---

<template v-slot:stem>

一个足球的容积是 $2.5\ \text{L}$，打气前内部压强与大气压相同。用打气筒给足球打气，每打一次都把体积为 $125\ \text{mL}$、压强与大气压相同的气体打进足球内。打了 20 次后，足球内部空气的压强是大气压的多少倍？

</template>

<div v-click="1" class="step-line">把足球内原有的气体和 20 次打入的气体作为研究对象，总质量一定。</div>
<div v-click="2" class="step-line">这些气体在大气压 <Latex tex="p_0" /> 下的总体积 <Latex tex="V_1 = 2.5\ \text{L} + 20 \times 0.125\ \text{L} = 5.0\ \text{L}" />。</div>
<div v-click="3" class="step-line">温度不变，压入容积 <Latex tex="2.5\ \text{L}" /> 的足球内：<Latex tex="p_0 V_1 = p_2 V_2" />，得 <Latex tex="p_2 = \dfrac{p_0 V_1}{V_2} = 2p_0" />。</div>
<div v-click="4" class="key-lead">压强是大气压的 2 倍。前提：温度不变、容积不变、不漏气。</div>

---
layout: exercise-split
title: 例题：水银气压计中的气泡
clicks: 4
---

<template v-slot:stem>

水银气压计中混入的气泡升到水银柱上方，使上方不再是真空。实际大气压为 $768\ \text{mm}$ 水银柱时，气压计示数为 $750\ \text{mm}$，此时水银面到管顶的距离为 $80\ \text{mm}$。示数为 $740\ \text{mm}$ 时，实际大气压相当于多高水银柱产生的压强？（温度不变）

</template>

<div v-click="1" class="step-line">气泡质量一定、温度不变，做等温变化。</div>
<div v-click="2" class="step-line">初态：<Latex tex="p_1 = 768 - 750 = 18\ \text{mmHg}" />，体积与 <Latex tex="80\ \text{mm}" /> 成正比。</div>
<div v-click="3" class="step-line">末态：示数 <Latex tex="740\ \text{mm}" />，水银面上升 <Latex tex="10\ \text{mm}" />，气泡长度 <Latex tex="70\ \text{mm}" />。</div>
<div v-click="4" class="step-line">由 <Latex tex="p_1 V_1 = p_2 V_2" />：<Latex tex="p_2 = 18 \times \dfrac{80}{70}\ \text{mmHg} \approx 20.6\ \text{mmHg}" />，实际大气压 <Latex tex="\approx 740 + 20.6 \approx 761\ \text{mmHg}" />。</div>

---
clicks: 2
---

<div class="page-grow page-around">
<div class="stack" style="width:100%;max-width:860px;margin:0 auto">
<div class="ask">两组数据 <Latex tex="pV" /> 几乎相等，能说明 <Latex tex="p" /> 与 <Latex tex="V" /> 成反比吗？</div>
<div v-click="1" class="step-line">不能。两组数据太少：读数误差、温度是否真的不变，都会让乘积“几乎相等”。</div>
<div v-click="1" class="step-line">只在 <Latex tex="p\text{-}\dfrac{1}{V}" /> 图中各点都落在过原点的同一条直线上，才能说明成反比。</div>
<div v-click="2" class="tip-hint">判断两个物理量是否成反比，靠的不是一两个乘积，而是多组数据画出的整条图线。</div>
</div>
</div>

---
---

<div class="page-grow page-around">
<div class="stack" style="width:100%;max-width:880px;margin:0 auto">
<div class="summary-line"><strong>等温变化</strong>　一定质量的气体，温度不变时压强与体积变化的过程。</div>
<div class="summary-line"><strong>实验方法</strong>　用注射器封闭一段空气柱，缓慢推拉，测出多组 <Latex tex="V" /> 与 <Latex tex="p" />。</div>
<div class="summary-line"><strong>玻意耳定律</strong>　<Latex tex="p \propto \dfrac{1}{V}" />，<Latex tex="pV = C" />，<Latex tex="p_1 V_1 = p_2 V_2" />。</div>
<div class="summary-line"><strong>图像</strong>　<Latex tex="p\text{-}V" /> 图是双曲线；<Latex tex="p\text{-}\dfrac{1}{V}" /> 图是过原点的直线。</div>
<div class="summary-line"><strong>适用条件</strong>　质量一定、温度不变；<Latex tex="C" /> 随温度、质量、气体种类而变。</div>
</div>
</div>

---
clicks: 2
clickAnimation: none
---

<div class="page-grow page-around">
<div class="stack" style="width:100%;max-width:820px;margin:0 auto;align-items:center;text-align:center">
<div class="ask ask-lead">如果保持压强不变，让气体的温度变化，<br />它的体积会怎样变？</div>
<div v-click="1" class="step-line">下一节研究气体的等压变化和等容变化。</div>
<div v-click="2" class="tip-hint">2.3 气体的等压变化和等容变化</div>
</div>
</div>
