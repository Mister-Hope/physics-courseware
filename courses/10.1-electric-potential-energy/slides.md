---
theme: default
title: "电势能和电势"
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
chapter-no: "10.1"
chapter: "第十章 静电场中的能量"
subtitle: "静电力做功的特点 · 电势能 · 电势"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
title: 电场中减少的是什么能量
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">一个正电荷在匀强电场中只受静电力，由 <Latex tex="A" /> 点运动到 <Latex tex="B" /> 点，静电力做正功 <Latex tex="W_{AB}" />。它的动能增加了，是什么能量减少了？</div>
<div v-click="1">由动能定理，动能增加量等于静电力做的功 <Latex tex="W_{AB}" /></div>
<div class="info-hint" v-click="2">物体下落时，重力做正功，动能增加，重力势能减少。</div>
</div>
<div class="figure"><ChargeMoveSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 重力做功的启示
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">同一物体从 <Latex tex="A" /> 点沿两条不同路径运动到 <Latex tex="B" /> 点，重力做功相同吗？为什么？</div>
<div v-click="1">重力的大小、方向都不变，做功只跟竖直方向上的位移有关：<Latex tex="W_G=mgh" />，与路径无关。</div>
<div class="info-hint" v-click="2">匀强电场中的静电力 <Latex tex="F=qE" /> 也是大小、方向都不变的恒力。静电力做功是否也与路径无关？</div>
</div>
<div class="figure"><GravityStairSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 直线与折线两条路径
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">在匀强电场中把试探电荷 <Latex tex="q" /> 从 <Latex tex="A" /> 点移到 <Latex tex="B" /> 点：沿直线 <Latex tex="AB" /> 走，与沿折线 <Latex tex="AMB" /> 走，静电力做的功相同吗？</div>
<div v-click="1">沿直线 <Latex tex="AB" />：<Latex tex="W_{AB}=F|AB|\cos\theta=qE|AM|" />。</div>
<div v-click="2">沿折线 <Latex tex="AMB" />：<Latex tex="AM" /> 段上 <Latex tex="W_{AM}=qE|AM|" />；<Latex tex="MB" /> 段与静电力垂直，<Latex tex="W_{MB}=0" />。所以 <Latex tex="W_{AMB}=qE|AM|" />。</div>
<div class="tip-hint" v-click="3">两种路径静电力做的功相同，都等于 <Latex tex="qE|AM|" />。</div>
</div>
<div class="figure"><WorkPathsSvg :show-angle="$clicks >= 1" :show-dim="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 沿任意曲线做功
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">如果电荷沿任意曲线 <Latex tex="ANB" /> 从 <Latex tex="A" /> 移到 <Latex tex="B" />，静电力做的功还是 <Latex tex="qE|AM|" /> 吗？</div>
<div v-click="1">把曲线分成许多小段，每一小段都看成先沿电场方向、再垂直电场方向移动。</div>
<div v-click="2">垂直电场方向的小段上静电力不做功；各小段沿电场方向的位移之和正好等于 <Latex tex="|AM|" />。</div>
<div class="tip-hint" v-click="3">沿任意曲线静电力做功仍为 <Latex tex="W=qE|AM|" />：静电力做的功只跟始、末位置有关，跟路径无关；这一结论从匀强电场得出，对非匀强电场同样适用。</div>
</div>
<div class="figure"><WorkCurveSvg :step="$clicks" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 电势能
---

<div class="page-grow">
<div class="stack">
<div>静电力做功与路径无关，只由始、末位置决定。</div>
<div class="ask ask-lead">这说明电荷在电场中具有什么？</div>
<div v-click="1">
<DefinitionBox term="电势能" tone="gold">
<div>电荷在电场中具有的势能，用 <Latex tex="E_p" /> 表示。开头问题中减少的能量就是电势能；电势能是相互作用的电荷所共有的，或者说是电荷和电场共同具有的。</div>
</DefinitionBox>
</div>
<div v-click="2">静电力做功等于电势能的减少量：<Latex tex="W_{AB}=E_{pA}-E_{pB}" />。</div>
<div class="tip-hint" v-click="3">静电力做正功，电势能减少；静电力做负功，电势能增加——与重力做功和重力势能变化的关系相同。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
title: 电势能的相对性
---

<div class="page-grow">
<div class="stack">
<div>静电力做的功只能决定电势能的变化量。已知电荷由 <Latex tex="A" /> 点移到 <Latex tex="B" /> 点，静电力做功 <Latex tex="W_{AB}" />。</div>
<div class="ask ask-lead">电荷在电场中某点的电势能究竟是多少，怎样确定？</div>
<div v-click="1">只有先规定电场中某点的电势能为 0，才能确定电荷在其他点的电势能。</div>
<div v-click="2">电荷在某点的电势能，等于把它从这点移动到零势能位置时静电力所做的功。</div>
<div v-click="3">若规定 <Latex tex="B" /> 点电势能为 0，则 <Latex tex="E_{pA}=W_{AB}" />；若规定 <Latex tex="A" /> 点电势能为 0，则 <Latex tex="E_{pB}=-W_{AB}" />。零点不同，同一点电势能的数值不同。</div>
<div class="info-hint" v-click="4">通常取离场源电荷无限远处或大地表面的电势能为 0。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 用什么描述电场某点的性质
---

<div class="page-grow">
<div class="stack">
<div>在 <Latex tex="A" /> 点放电荷量为 <Latex tex="q" /> 的试探电荷，再换成电荷量为 <Latex tex="nq" /> 的试探电荷，都移到零势能点 <Latex tex="O" />。</div>
<div class="ask ask-lead">不同电荷量的试探电荷在 <Latex tex="A" /> 点的电势能不同，用什么量能描述这一点的性质？</div>
<div v-click="1">受力处处是 <Latex tex="q" /> 的 <Latex tex="n" /> 倍，位移相同，做功为 <Latex tex="nW_{AO}" />，电势能也是 <Latex tex="n" /> 倍。</div>
<div v-click="2">电势能与电荷量之比 <Latex tex="\frac{E_p}{q}=\frac{W_{AO}}{q}" /> 与电荷量多少无关，只由电场中该点的性质决定。</div>
<div v-click="3">
<DefinitionBox term="电势" tone="blue">
<div>电荷在电场中某一点的电势能与它的电荷量之比，叫作电场在这一点的<span class="def-term">电势</span>，用 <Latex tex="\varphi" /> 表示：<Latex tex="\varphi=\dfrac{E_p}{q}" />。单位是伏特（<Latex tex="\text{V}" />），<Latex tex="1\ \text{V}=1\ \text{J/C}" />。</div>
</DefinitionBox>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 换一个试探电荷，电势会变吗
---

<div class="page-grow page-around">
<div class="ask">把电荷量不同的试探电荷放到同一个 <Latex tex="A" /> 点：电势能会变，<Latex tex="A" /> 点的电势会跟着变吗？</div>
<ProbePotentialLab :show-potential="$clicks >= 1" />
<div class="tip-hint" v-click="2">电势能随电荷量成正比变化，它们的比值始终是 <Latex tex="100\ \text{V}" />——电势由电场本身决定，与试探电荷无关。</div>
</div>

---
layout: base-flex
clicks: 4
class: title-ask
title: 沿电场线方向电势怎样变化
---

# 沿电场线方向，电势怎样变化？

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div v-click="1">正的试探电荷沿电场线方向由 <Latex tex="A" /> 移向 <Latex tex="O" />：静电力方向与位移方向相同，静电力做正功。</div>
<div v-click="2">静电力做正功，电势能减少：<Latex tex="E_{pA}\gt E_{pO}" />。</div>
<div v-click="3">由 <Latex tex="\varphi=\frac{E_p}{q}" />，且 <Latex tex="q\gt 0" />，得 <Latex tex="\varphi_A\gt\varphi_O" />：沿电场线方向，电势逐渐降低。</div>
<div class="warn-hint" v-click="4">换成负电荷沿电场线方向移动：静电力做负功、电势能增加，但 <Latex tex="q<0" />，电势仍然降低。</div>
</div>
<div class="figure"><FieldLinePotentialSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 电势的零点与正负
---

<div class="page-grow">
<div class="stack">
<div class="ask ask-lead">电势也有零点问题吗？电势的数值能是负的吗？它是矢量还是标量？</div>
<div v-click="1">与电势能相似，先规定电场中某处的电势为 0，才能确定其他各点的电势；通常取大地或无限远处的电势为 0。</div>
<div v-click="2">规定了零电势点以后，电场中各点的电势可以是正值，也可以是负值：比零电势点高为正值，比零电势点低为负值。</div>
<div class="tip-hint" v-click="3">电势只有大小、没有方向，是标量；正负只表示比零电势点高还是低。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 电势与电势能
---

<div class="page-grow">
<div class="stack">
<div class="ask ask-lead">电势和电势能都描述电场，它们有什么区别与联系？</div>
<div class="half-grid">
<div class="stack-tight">
<div class="mini-title">电势 <Latex tex="\varphi" /></div>
<div v-click="1">描述电场本身的性质，由电场决定，与试探电荷无关。</div>
<div v-click="1">单位 <Latex tex="\text{V}" />；标量，有正负。</div>
</div>
<div class="stack-tight divider-l">
<div class="mini-title">电势能 <Latex tex="E_p" /></div>
<div v-click="1">描述电荷与电场共有的能量，随试探电荷的电荷量而变。</div>
<div v-click="1">单位 <Latex tex="\text{J}" />；标量，有正负，零点可规定。</div>
</div>
</div>
<div class="tip-hint" v-click="2">两者的联系：<Latex tex="E_p=q\varphi" />，<Latex tex="\varphi=\frac{E_p}{q}" />。</div>
</div>
</div>

---
layout: exercise-split
clicks: 3
title: 练习一 电势与电势能的计算
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　电荷量 <Latex tex="q_1=4\times10^{-9}\ \text{C}" /> 的试探电荷放在电场中的 <Latex tex="A" /> 点，具有 <Latex tex="6\times10^{-8}\ \text{J}" /> 的电势能。</div>
<div>（1）<Latex tex="A" /> 点的电势是多少？</div>
<div>（2）若把 <Latex tex="q_2=-2\times10^{-10}\ \text{C}" /> 的试探电荷放在 <Latex tex="A" /> 点，它具有的电势能是多少？</div>

</template>

<div v-click="1">（1）<Latex tex="\varphi_A=\dfrac{E_{pA}}{q_1}=\dfrac{6\times10^{-8}}{4\times10^{-9}}\ \text{V}=15\ \text{V}" /></div>
<div v-click="2">（2）<Latex tex="E_{p2}=q_2\varphi_A=-2\times10^{-10}\times15\ \text{J}=-3\times10^{-9}\ \text{J}" /></div>
<div class="tip-hint" v-click="3">电势由电场决定，换不同试探电荷，电势不变；电势能随电荷量而变，负电荷的电势能可以是负值。</div>

---
layout: exercise-split
clicks: 3
title: 练习二 三条路径上的静电力做功
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　在电场强度为 <Latex tex="60\ \text{N/C}" /> 的匀强电场中有 <Latex tex="A" />、<Latex tex="B" />、<Latex tex="C" /> 三个点，<Latex tex="AB" /> 为 <Latex tex="5\ \text{cm}" />，<Latex tex="BC" /> 为 <Latex tex="12\ \text{cm}" />，其中 <Latex tex="AB" /> 沿电场方向，<Latex tex="BC" /> 和电场方向的夹角为 <Latex tex="60^\circ" />。</div>
<div>将电荷量为 <Latex tex="4\times10^{-8}\ \text{C}" /> 的正电荷从 <Latex tex="A" /> 点移到 <Latex tex="B" /> 点，再从 <Latex tex="B" /> 点移到 <Latex tex="C" /> 点，静电力做了多少功？若将该电荷沿直线由 <Latex tex="A" /> 点移到 <Latex tex="C" /> 点，静电力做的功又是多少？</div>

</template>

<template v-slot:fig>

<WorkAbcSvg :show-decomp="$clicks >= 2" />

</template>

<div class="stack-tight">
<div v-click="1">沿 <Latex tex="AB" />：<Latex tex="W_{AB}=qE|AB|=4\times10^{-8}\times60\times0.05\ \text{J}=1.2\times10^{-7}\ \text{J}" /></div>
<div v-click="2">沿 <Latex tex="BC" />：<Latex tex="W_{BC}=qE|BC|\cos60^\circ=1.44\times10^{-7}\ \text{J}" />，所以 <Latex tex="W_{ABC}=W_{AB}+W_{BC}=2.64\times10^{-7}\ \text{J}" /></div>
<div v-click="3">沿直线 <Latex tex="AC" />：<Latex tex="W_{AC}=qE(|AB|+|BC|\cos60^\circ)=2.64\times10^{-7}\ \text{J}" />，与沿折线做的功相同。</div>
</div>

---
layout: base-flex
clicks: 4
title: 由电势能判断电势高低
---

<div class="page-grow">
<div class="stack stack-tight">
<div class="ask">如何根据试探电荷的电势能判断电场中两点电势的高低？</div>
<div>（1）<Latex tex="q" /> 在 <Latex tex="A" /> 点的电势能比在 <Latex tex="B" /> 点大，<Latex tex="A" />、<Latex tex="B" /> 哪点电势高？</div>
<div v-click="1">由 <Latex tex="\varphi=\frac{E_p}{q}" />：<Latex tex="\varphi_A=\frac{E_{pA}}{q}\gt\frac{E_{pB}}{q}=\varphi_B" />，所以 <Latex tex="A" /> 点电势高。</div>
<div>（2）<Latex tex="-q" /> 在 <Latex tex="C" /> 点的电势能比在 <Latex tex="D" /> 点大，<Latex tex="C" />、<Latex tex="D" /> 哪点电势高？</div>
<div v-click="2">由 <Latex tex="\varphi=\frac{E_p}{q}" />：<Latex tex="\varphi_C=\frac{E_{pC}}{-q}<\frac{E_{pD}}{-q}=\varphi_D" />，所以 <Latex tex="D" /> 点电势高。</div>
<div>（3）<Latex tex="q" /> 在 <Latex tex="E" /> 点的电势能为负值，<Latex tex="-q" /> 在 <Latex tex="F" /> 点的电势能也是负值，<Latex tex="E" />、<Latex tex="F" /> 哪点电势高？</div>
<div v-click="3"><Latex tex="q" />：<Latex tex="\varphi_E<0" />；<Latex tex="-q" />：<Latex tex="\varphi_F=\frac{E_{pF}}{-q}\gt 0" />。所以 <Latex tex="F" /> 点电势高。</div>
<div class="tip-hint" v-click="4">不能只看电势能的大小：正电荷电势能大处电势高，负电荷电势能大处电势低。比较时始终用 <Latex tex="\varphi=\frac{E_p}{q}" />，连同 <Latex tex="q" /> 的正负一起算。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 由电场线判断电势高低
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">匀强电场中，<Latex tex="M" />、<Latex tex="N" /> 在同一条电场线上，<Latex tex="P" /> 在过 <Latex tex="M" /> 且与电场线垂直的直线上。（1）<Latex tex="M" />、<Latex tex="N" /> 哪点电势高？（2）<Latex tex="M" />、<Latex tex="P" /> 哪点电势高？</div>
<div v-click="1">（1）沿电场线方向电势降低，所以 <Latex tex="\varphi_M\gt\varphi_N" />。</div>
<div v-click="2">（2）把正电荷从 <Latex tex="M" /> 移到 <Latex tex="P" />：静电力与位移垂直、不做功，电势能不变，所以 <Latex tex="\varphi_M=\varphi_P" />。</div>
<div class="tip-hint" v-click="3">判断电势高低：沿电场线方向越来越低；与电场线垂直的方向上，电势相等。</div>
</div>
<div class="figure"><FieldLineJudgeSvg :step="$clicks" /></div>
</div>
</div>

---
layout: base-flex
title: 本课小结
---

# 本课小结

<div class="page-grow page-around">
<div class="summary-line">静电力做功与路径无关，只由始、末位置决定。</div>
<div class="summary-line">电势能：<Latex tex="W_{AB}=E_{pA}-E_{pB}" />；静电力做正功，电势能减少。</div>
<div class="summary-line">电势能具有相对性：先规定零势能点，通常取无穷远处或大地。</div>
<div class="summary-line">电势 <Latex tex="\varphi=\frac{E_p}{q}" />：由电场决定，与试探电荷无关；单位 <Latex tex="\text{V}" />，是标量。</div>
<div class="summary-line">沿电场线方向电势逐渐降低。</div>
</div>
