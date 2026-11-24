---
theme: default
title: "粒子的波动性和量子力学的建立"
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
# 页面外壳统一用共享 addon 的 base-flex 布局；正文包 .page-grow 才能撑满
defaults:
  layout: base-flex
  transition: fade
chapter-no: "4.5"
chapter: "第四章 原子结构和波粒二象性"
subtitle: "电子这样的实物粒子，也有波吗"
---

<!-- 封面装饰：电子波穿过晶体，在屏上形成衍射圆环 -->
<CoverDecorationSvg />

---
layout: base-flex
title: 回顾：光的波粒二象性
clicks: 3
---

<div class="page-grow page-around">
<div class="ask ask-lead">光既有波动性，又有粒子性。<br />这两方面的证据分别是什么？</div>
<div class="half-grid">
<div class="stack" v-click="1">
<div class="mini-title"><mdi-waves /> 波动性</div>
<div class="step-line">干涉、衍射。</div>
</div>
<div class="stack divider-l" v-click="2">
<div class="mini-title"><mdi-lightning-bolt /> 粒子性</div>
<div class="step-line">光电效应、康普顿效应。</div>
</div>
</div>
<div class="tip-hint" v-click="3">光既具有波动性，又具有粒子性，即光具有波粒二象性。</div>
</div>

---
layout: base-flex
title: 德布罗意的假设
clicks: 3
---

## 德布罗意的假设

<div class="page-grow">
<div class="stack">
<div class="ask">既然光有波粒二象性，实物粒子会不会也对应一种波？</div>
<div class="step-line" v-click="1">1924 年，德布罗意把波粒二象性推广到电子、质子等实物粒子。</div>
<div v-click="2"><DefinitionBox term="德布罗意波（物质波）">每一个运动的粒子都与一个对应的波相联系。</DefinitionBox></div>
<div class="step-line" v-click="3">粒子的能量 <Latex tex="\varepsilon" /> 和动量 <Latex tex="p" />，与对应波的频率 <Latex tex="\nu" />、波长 <Latex tex="\lambda" /> 满足：</div>
<div class="formula-center" v-click="3"><Latex tex="\nu = \dfrac{\varepsilon}{h},\qquad \lambda = \dfrac{h}{p}" display /></div>
</div>
</div>

---
layout: base-flex
title: 德布罗意波长由什么决定
clicks: 3
---

## 德布罗意波长由什么决定

<div class="page-grow">
<div class="stack stack-dense">
<div class="step-line">粒子的动量 <Latex tex="p = mv" />，代入 <Latex tex="\lambda = h/p" />，得 <Latex tex="\lambda = h/(mv)" />。</div>
<div class="step-line" v-click="1">电子经电压 <Latex tex="U" /> 加速，电场力做的功等于动能的增加：<Latex tex="eU = p^2/(2m_{\text{e}})" />。</div>
<div class="step-line" v-click="2">解出电子的动量 <Latex tex="p = \sqrt{2m_{\text{e}}eU}" />，再代入 <Latex tex="\lambda = h/p" />：</div>
<div class="formula-center" v-click="3"><Latex tex="\lambda = \dfrac{h}{\sqrt{2m_{\text{e}}eU}}" display /></div>
<div class="tip-hint" v-click="3"><Latex tex="\lambda" /> 与 <Latex tex="\sqrt{U}" /> 成反比：加速电压越高，电子的波长越短。</div>
</div>
</div>

---
layout: base-flex
title: 电子与子弹的波长
clicks: 3
---

<div class="page-grow">
<div class="ask">电子加速到 100 V，波长有多大？为什么生活中的物体看不出波动性？</div>
<table class="data-table">
<thead>
<tr><th>对象</th><th>动量 <Latex tex="p" /></th><th>德布罗意波长 <Latex tex="\lambda" /></th></tr>
</thead>
<tbody>
<tr><td>子弹（<Latex tex="m = 10\ \text{g}" />，<Latex tex="v = 300\ \text{m/s}" />）</td><td><Latex tex="3.0\ \text{kg}\cdot\text{m/s}" /></td><td><Latex tex="2.2\times10^{-34}\ \text{m}" /></td></tr>
<tr><td>电子（经 <Latex tex="U = 100\ \text{V}" /> 加速）</td><td><Latex tex="5.4\times10^{-24}\ \text{kg}\cdot\text{m/s}" /></td><td><Latex tex="1.2\times10^{-10}\ \text{m}" /></td></tr>
</tbody>
</table>
<div class="step-line" v-click="1">子弹的波长比原子核的尺度还小得多，它通过任何障碍都不会产生可观察的衍射。</div>
<div class="step-line" v-click="2">电子的波长与原子尺度、X 射线的波长同数量级，可以用晶体观察它的衍射。</div>
<div class="tip-hint" v-click="3">波长由动量决定：<Latex tex="\lambda = h/p" />，动量越大，波长越短。宏观物体的波动性无法观察。</div>
</div>

---
layout: base-flex
title: 怎样验证物质波
clicks: 3
---

## 怎样验证物质波

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr)">
<div class="stack">
<div class="step-line">干涉和衍射是波的特征。如果电子也是波，它就应该能干涉、衍射。</div>
<div class="step-line" v-click="1">电子的德布罗意波长与 X 射线同数量级，而 X 射线通过晶体时有明显的衍射现象。</div>
<div class="step-line" v-click="2">于是，可以让电子束穿过晶体，看它是否发生衍射。</div>
<div class="tip-hint" v-click="3">用晶体作为「光栅」，把电子的波动性显现出来。</div>
</div>
<div class="figure">
<CrystalLatticeSvg />
<div class="fig-cap">晶体中的原子按周期排列，原子间距 <Latex tex="d" /> 约为 <Latex tex="10^{-10}\ \text{m}" /></div>
</div>
</div>
</div>

---
layout: base-flex
title: 电子衍射实验
clicks: 3
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr)">
<div class="stack">
<div class="ask">1927 年，戴维森和 G. P. 汤姆孙分别用单晶和多晶做电子衍射实验。屏幕上出现了什么？</div>
<div class="step-line" v-click="1">和 X 射线衍射一样，屏上出现同心圆环（多晶）或对称斑点（单晶）。</div>
<div class="step-line" v-click="2">电子束发生了衍射——电子具有波动性。</div>
<div class="step-line" v-click="3">1929 年德布罗意、1937 年戴维森与 G. P. 汤姆孙，先后获得诺贝尔物理学奖。</div>
</div>
<div class="figure">
<DiffractionPatternSvg />
<div class="fig-cap">电子束穿过多晶薄膜，在荧光屏上形成的衍射图样（示意）</div>
</div>
</div>
</div>

---
layout: base-flex
title: 电子的干涉
clicks: 3
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr)">
<div class="stack">
<div class="ask">让电子束通过双缝，屏上会出现什么？</div>
<div class="step-line" v-click="1">明暗相间的干涉条纹。</div>
<div class="step-line" v-click="2">干涉是波的特征，电子确实具有波动性。</div>
<div class="tip-hint" v-click="3">不仅电子，中子、质子、原子、分子也都具有波动性。实物粒子和光一样，具有波粒二象性。</div>
</div>
<div class="figure">
<InterferencePatternSvg />
<div class="fig-cap">电子双缝干涉的屏上条纹（示意）</div>
</div>
</div>
</div>

---
layout: base-flex
title: 加速电压与电子波长
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="ask">把加速电压从 <Latex tex="100\ \text{V}" /> 调到 <Latex tex="1000\ \text{V}" />，电子的德布罗意波长会怎样变化？</div>
<DeBroglieLab />
<div class="tip-hint" v-click="1">电压越高，电子动量越大，波长越短：<Latex tex="\lambda" /> 与 <Latex tex="\sqrt{U}" /> 成反比，衍射环也随之变小。</div>
</div>

---
layout: base-flex
title: 电子显微镜
clicks: 3
---

## 电子显微镜

<div class="page-grow page-around">
<div class="ask">光学显微镜看不清比可见光波长更小的细节。用什么办法提高分辨本领？</div>
<div class="half-grid microscope-cols">
<div class="stack" v-click="1">
<div class="mini-title"><mdi-lightbulb-on /> 光学显微镜</div>
<div class="step-line">受波长限制，只能分辨到约 <Latex tex="0.2\ \mu\text{m}" />。</div>
</div>
<div class="stack divider-l" v-click="2">
<div class="mini-title"><mdi-microscope /> 电子显微镜</div>
<div class="step-line">电子经 <Latex tex="50\ \text{kV}" /> 加速，波长约 <span class="math-nowrap"><Latex tex="5.5\times10^{-12}\ \text{m}" /></span>。<br />比可见光短约 5 个数量级。</div>
</div>
</div>
<div class="step-line" v-click="3">波长越短，能分辨的细节越小。1931 年，第一台电子显微镜问世。</div>
</div>

---
layout: base-flex
title: 为什么还要建立量子力学
clicks: 4
---

## 为什么还要建立量子力学

<div class="page-grow page-around">
<div class="ask">普朗克、爱因斯坦、玻尔的理论都成功解释了各自的实验，为什么还要建立量子力学？</div>
<div class="stack">
<div class="step-line" v-click="1">这些理论各自只针对一个具体问题：黑体辐射、光电效应、氢原子光谱……</div>
<div class="step-line" v-click="2">它们都不是统一描述微观世界的普遍理论。</div>
<div class="step-line" v-click="3">但在这些成功的理论中，普朗克常量 <Latex tex="h" /> 都扮演了关键角色。</div>
</div>
<div class="tip-hint" v-click="4">这说明它们背后存在统一的规律，需要一门新的力学。</div>
</div>

---
layout: base-flex
title: 量子力学的建立
clicks: 4
---

## 量子力学的建立

<div class="page-grow">
<div class="stack">
<div class="step-line"><span class="text-accent">1925 年</span>　海森堡和玻恩等建立矩阵力学。</div>
<div class="step-line" v-click="1"><span class="text-accent">1926 年</span>　薛定谔提出薛定谔方程，建立波动力学；得到氢原子光谱公式。</div>
<div class="step-line" v-click="2">同年，薛定谔和埃卡特证明：波动力学与矩阵力学在数学上等价。</div>
<div class="step-line" v-click="3">此后，玻恩、海森堡、薛定谔、狄拉克、泡利等逐步完善，量子力学取代了早期量子论。</div>
<div class="tip-hint" v-click="4">1927 年第五届索尔维会议：29 位参会者中，有 17 人后来获得诺贝尔奖。</div>
</div>
</div>

---
layout: base-flex
title: 量子力学改变了什么
clicks: 4
---

## 量子力学改变了什么

<div class="page-grow page-around">
<div class="ask">量子力学听起来很抽象，它和现实世界有什么关系？</div>
<div class="three-col">
<div class="stack" v-click="1">
<div class="mini-title"><mdi-atom /> 核物理与粒子物理</div>
<div class="step-line">认识原子、原子核和基本粒子的结构；核能的利用。</div>
</div>
<div class="stack" v-click="2">
<div class="mini-title"><mdi-laser-pointer /> 原子分子物理与光学</div>
<div class="step-line">激光——光纤通信；核磁共振——化学、生物与医学诊断；原子钟——卫星定位。</div>
</div>
<div class="stack" v-click="3">
<div class="mini-title"><mdi-memory /> 固体物理</div>
<div class="step-line">晶体管、集成电路（芯片）<br />半导体发光、超导。</div>
</div>
</div>
<div class="tip-hint" v-click="4">量子力学和相对论的创立，是 20 世纪物理学的两个主要进展。</div>
</div>

---
layout: exercise-split
title: 例题：谁的物质波更长
clicks: 3
---

<template v-slot:stem>

一个电子和一个质子具有同样的动能时，它们的德布罗意波长哪个大？

</template>

<div class="step-line">由 <Latex tex="\lambda = h/p" /> 和 <Latex tex="E_{\text{k}} = p^2/(2m)" />，得 <Latex tex="\lambda = h/\sqrt{2mE_{\text{k}}}" />。</div>
<div class="step-line" v-click="1">动能相同时，<Latex tex="\lambda" /> 与 <Latex tex="\sqrt{m}" /> 成反比。电子质量小，波长更长。</div>
<div class="step-line" v-click="2"><Latex tex="\lambda_{\text{e}}/\lambda_{\text{p}} = \sqrt{m_{\text{p}}/m_{\text{e}}} = \sqrt{1836} \approx 43" />。</div>
<div class="tip-hint" v-click="3">电子波长约为质子的 43 倍，电子的波动性更容易观察。</div>

---
layout: exercise-split
title: 练习：子弹会因波动性「失准」吗
clicks: 3
---

<template v-slot:stem>

射击运动员射击时，会因为子弹的波动性而「失准」吗？为什么？请根据子弹质量、速度大小所对应的德布罗意波长作定性说明。

</template>

<div class="step-line"><Latex tex="p = mv = 0.010 \times 300\ \text{kg}\cdot\text{m/s} = 3.0\ \text{kg}\cdot\text{m/s}" /></div>
<div class="step-line" v-click="1"><Latex tex="\lambda = \dfrac{h}{p} = \dfrac{6.63\times10^{-34}}{3.0}\ \text{m} \approx 2.2\times10^{-34}\ \text{m}" /></div>
<div class="step-line" v-click="2">这个波长比原子核的尺度还小得多，子弹通过障碍时不会产生可观测的衍射。</div>
<div class="tip-hint" v-click="3">子弹的波动性完全可以忽略，射击不必考虑它。</div>

---
layout: base-flex
title: 从物质波到量子力学
clicks: 1
---

## 从物质波到量子力学

<div class="page-grow page-around">
<div class="stack">
<div class="summary-line"><strong>德布罗意假设</strong>　每个运动的粒子都对应一个波，<Latex tex="\lambda = h/p" />。</div>
<div class="summary-line"><strong>实验证实</strong>　电子衍射、电子干涉；中子、质子、原子、分子也具有波动性。</div>
<div class="summary-line"><strong>波粒二象性</strong>　光与实物粒子都具有波粒二象性；宏观物体的波动性无法观察。</div>
<div class="summary-line"><strong>量子力学</strong>　矩阵力学与波动力学统一为量子力学，催生核能、激光、芯片等技术。</div>
<div class="tip-hint" v-click="1">波粒二象性从光推广到所有实物粒子，量子力学随之建立。</div>
</div>
</div>
