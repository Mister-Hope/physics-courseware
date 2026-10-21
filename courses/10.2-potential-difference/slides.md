---
theme: default
title: "电势差"
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
chapter-no: "10.2"
chapter: "第十章 静电场中的能量"
subtitle: 电势差、静电力做功与等势面
---

<CoverDecorationSvg />

---
layout: base-flex
title: 引课　楼的高度与电势
---

<div class="page-grow">
<div class="stack">
<div class="ask">从 6 楼走到 8 楼，影响做功多少的是这两层楼的高度差，而不是楼本身的高度。那么在电场中把电荷从 <Latex tex="A" /> 点移到 <Latex tex="B" /> 点，影响静电力做功多少的，是 <Latex tex="A" /> 点或 <Latex tex="B" /> 点的电势，还是两点之间电势的差值？</div>
</div>
<div class="figure">
<IntroAnalogySvg />
</div>
</div>

---
layout: base-flex
clicks: 1
title: 零电势点的选择与电势差
---

<div class="page-grow">
<div class="ask">选择不同的位置作为零电势点，<Latex tex="A" />、<Latex tex="B" /> 两点的电势 <Latex tex="\varphi_A" />、<Latex tex="\varphi_B" /> 会改变，那么 <Latex tex="A" />、<Latex tex="B" /> 之间的电势差 <Latex tex="U_{AB}" /> 会改变吗？</div>
<ZeroPotentialLab />
<div class="tip-hint" v-click="1">电势的数值随零电势点的选择而改变，但两点之间电势的差值 <Latex tex="U_{AB} = \varphi_A - \varphi_B" /> 保持不变。影响静电力做功的正是这个差值。</div>
</div>

---
layout: base-flex
clicks: 3
title: 电势差的定义
---

<div class="page-grow page-grow-tight">
<div class="split-wide">
<div class="stack">
<div class="ask"><Latex tex="A" /> 点电势 <Latex tex="\varphi_A" />、<Latex tex="B" /> 点电势 <Latex tex="\varphi_B" />，两点之间的电势差怎么表示？</div>
<div v-click="1"><DefinitionBox term="电势差（电压）"><div>在电场中，<span class="def-term">两点之间电势的差值</span>叫作电势差，也叫作<span class="def-term">电压</span>。<Latex tex="U_{AB} = \varphi_A - \varphi_B" />。</div><div>单位是伏特<span style="white-space: nowrap">（<Latex tex="\text{V}" />）</span>，<Latex tex="1\ \text{V} = 1\ \text{J/C}" />。</div></DefinitionBox></div>
<div v-click="2">反过来：<Latex tex="U_{BA} = \varphi_B - \varphi_A" />，所以 <Latex tex="U_{AB} = -U_{BA}" />。</div>
<div class="warn-hint" v-click="3"><Latex tex="A" /> 点电势比 <Latex tex="B" /> 点高时 <Latex tex="U_{AB} > 0" />、<Latex tex="U_{BA} < 0" />；电势差的正负只表示两点电势的高低关系。</div>
</div>
<div class="figure">
<PotentialDifferenceSvg :show-uab="$clicks >= 1" :show-uba="$clicks >= 2" />
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 静电力做功与电势差
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">电荷 <Latex tex="q" /> 从 <Latex tex="A" /> 点移到 <Latex tex="B" /> 点，静电力做的功 <Latex tex="W_{AB}" /> 与两点间的电势差 <Latex tex="U_{AB}" /> 有什么关系？</div>
<div v-click="1">由电势能的变化：<Latex tex="W_{AB} = E_{pA} - E_{pB}" />。</div>
<div v-click="2">又 <Latex tex="E_{pA} = q\varphi_A" />、<Latex tex="E_{pB} = q\varphi_B" />，所以 <Latex tex="W_{AB} = q\varphi_A - q\varphi_B = q(\varphi_A - \varphi_B) = qU_{AB}" />。</div>
<div class="tip-hint" v-click="3"><Latex tex="U_{AB} = W_{AB}/q" />。知道两点间的电势差，就能直接算出移动电荷时静电力做的功，不必考虑静电力的大小和电荷移动的路径。</div>
</div>
<div class="figure">
<ChargeMoveWorkSvg :show-energy="$clicks >= 1" />
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 电势差与移动路径
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">同一电荷沿不同路径从 <Latex tex="A" /> 点移到 <Latex tex="B" /> 点，静电力做的功相同吗？两点间的电势差会随路径不同而改变吗？</div>
<div v-click="1">静电力做功与路径无关，只由起点和终点的位置决定，所以沿三条路径的 <Latex tex="W_{AB}" /> 都相同。</div>
<div class="tip-hint" v-click="2">由 <Latex tex="U_{AB} = W_{AB}/q" /> 可知，两点间的电势差也只由 <Latex tex="A" />、<Latex tex="B" /> 两点在电场中的位置决定，与移动路径无关。</div>
</div>
<div class="figure">
<PathIndependenceSvg />
</div>
</div>
</div>

---
layout: exercise-split
clicks: 2
title: 例题　电势高低与电势差
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　在匀强电场中把电荷量为 <Latex tex="2.0\times 10^{-9}\ \text{C}" /> 的点电荷从 <Latex tex="A" /> 点移动到 <Latex tex="B" /> 点，静电力做的功为 <Latex tex="1.6\times 10^{-7}\ \text{J}" />。再把这个电荷从 <Latex tex="B" /> 点移动到 <Latex tex="C" /> 点，静电力做的功为 <Latex tex="-4.0\times 10^{-7}\ \text{J}" />。</div>
<div>（1）<Latex tex="A" />、<Latex tex="B" />、<Latex tex="C" /> 三点中，哪点电势最高？哪点电势最低？</div>
<div>（2）<Latex tex="A" />、<Latex tex="B" /> 间，<Latex tex="B" />、<Latex tex="C" /> 间，<Latex tex="A" />、<Latex tex="C" /> 间的电势差各是多大？</div>
<div>（3）把电荷量为 <Latex tex="-1.5\times 10^{-9}\ \text{C}" /> 的点电荷从 <Latex tex="A" /> 点移动到 <Latex tex="C" /> 点，静电力做的功是多少？</div>
<div>（4）根据以上结果，定性地画出电场分布的示意图，标出 <Latex tex="A" />、<Latex tex="B" />、<Latex tex="C" /> 三点可能的位置。</div>

</template>

<div v-click="1">（1）<Latex tex="W_{AB} > 0" />，说明 <Latex tex="\varphi_A > \varphi_B" />；<Latex tex="W_{BC} < 0" />，说明 <Latex tex="\varphi_C > \varphi_B" />。又 <Latex tex="|U_{BC}| > |U_{AB}|" />，所以 <Latex tex="\varphi_C > \varphi_A > \varphi_B" />：<Latex tex="C" /> 点电势最高，<Latex tex="B" /> 点电势最低。</div>

<div v-click="2">（2）<Latex tex="U_{AB} = W_{AB}/q = 1.6\times 10^{-7}/(2.0\times 10^{-9})\ \text{V} = 80\ \text{V}" />；<Latex tex="U_{BC} = W_{BC}/q = -200\ \text{V}" />；<Latex tex="U_{AC} = U_{AB} + U_{BC} = 80\ \text{V} - 200\ \text{V} = -120\ \text{V}" />。</div>

---
layout: base-flex
clicks: 3
title: 例题　功的计算与电场分布
---

<div class="page-grow page-grow-tight">
<div class="ask">已知 <Latex tex="U_{AB} = 80\ \text{V}" />，<Latex tex="U_{BC} = -200\ \text{V}" />，<Latex tex="U_{AC} = -120\ \text{V}" />。（3）把电荷量为 <Latex tex="-1.5\times 10^{-9}\ \text{C}" /> 的点电荷从 <Latex tex="A" /> 点移到 <Latex tex="C" /> 点，静电力做的功是多少？</div>
<div v-click="1"><Latex tex="W_{AC} = q'U_{AC} = (-1.5\times 10^{-9}\ \text{C}) \times (-120\ \text{V}) = 1.8\times 10^{-7}\ \text{J}" />，静电力做正功。</div>
<div class="ask" v-click="2">（4）根据以上结果，定性地画出电场分布的示意图，标出 <Latex tex="A" />、<Latex tex="B" />、<Latex tex="C" /> 三点可能的位置。</div>
<div class="split-wide" v-click="3">
<div class="stack">
<div>沿电场线方向电势降低，<Latex tex="\varphi_C > \varphi_A > \varphi_B" />，所以电场线由 <Latex tex="C" /> 一侧指向 <Latex tex="B" /> 一侧。</div>
</div>
<div class="figure">
<FieldFromPotentialsSvg />
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 等势面
---

# 等势面

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">地图上用等高线表示地势的高低。电场中怎样表示电势的高低？</div>
<div v-click="1"><DefinitionBox term="等势面"><div>在电场中，<span class="def-term">电势相同的各点构成的面</span>叫作等势面（equipotential surface）。</div></DefinitionBox></div>
<div class="info-hint" v-click="2">同一个等势面上，任何两点的电势都相等。</div>
</div>
<div class="figure">
<ContourAnalogySvg :show-right="$clicks >= 1" />
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 等势面与电场线
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">在同一个等势面上移动电荷，静电力做功吗？这说明等势面与电场线有什么关系？</div>
<div v-click="1">同一等势面上任意两点电势相等，电势差为零，所以移动电荷时静电力不做功。</div>
<div v-click="2">静电力沿电场线方向；沿等势面移动电荷时静电力不做功，说明电场线与等势面内的任意方向都垂直，即等势面与电场线垂直。</div>
<div class="tip-hint" v-click="3">电场线跟等势面垂直，并且由电势高的等势面指向电势低的等势面。</div>
</div>
<div class="figure">
<EquipotentialWorkSvg :show-analysis="$clicks >= 2" />
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 几种电场的等势面
---

<div class="page-grow">
<div class="ask">匀强电场和点电荷的电场中，等势面是什么形状？与电场线有什么关系？</div>
<div class="figure">
<FieldTypesSvg :show-labels="$clicks >= 1" />
</div>
<div class="tip-hint" v-click="1">电场线跟等势面垂直，由电势高的等势面指向电势低的等势面；图中相邻等势面间的电势差是相等的。</div>
</div>

---
layout: base-flex
clicks: 4
class: title-ask
title: 正负电荷在电势高处电势能都大吗
---

# 正负电荷在电势高处，电势能都大吗？

<div class="page-grow page-grow-tight">
<div class="stack">
<div>质量相等的物体，处于较高位置时重力势能较大。电荷有正、负之分，电势能随电势的变化与重力势能随位置的变化不同。</div>
<div v-click="1">某点电势的高低由电场决定，与放在该点的试探电荷无关——就像某处位置的高低，与放在该处的物体质量无关。</div>
<div v-click="2">但电势能是电荷与电场共有的：<Latex tex="E_p = q\varphi" />。电势相同，正电荷与负电荷的电势能符号相反。</div>
<div v-click="3">例如在 <Latex tex="\varphi = 5\ \text{V}" /> 处：<Latex tex="q = 2\times 10^{-9}\ \text{C}" /> 时 <Latex tex="E_p = 1\times 10^{-8}\ \text{J}" />；<Latex tex="q = -2\times 10^{-9}\ \text{C}" /> 时 <Latex tex="E_p = -1\times 10^{-8}\ \text{J}" />。</div>
<div class="tip-hint" v-click="4">电势越高，正电荷的电势能越大，负电荷的电势能越小。电荷量数值相等的正、负电荷，在电势高处并不都具有较大的电势能。</div>
</div>
</div>

---
layout: exercise-split
clicks: 2
title: 练习一　由电势差求静电力做功
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　在某电场中，已知 <Latex tex="A" />、<Latex tex="B" /> 两点之间的电势差 <Latex tex="U_{AB}" /> 为 <Latex tex="20\ \text{V}" />，电荷量 <Latex tex="q = -2\times 10^{-9}\ \text{C}" /> 的电荷由 <Latex tex="A" /> 点移动到 <Latex tex="B" /> 点。静电力做的功是多少？电势能是增加还是减少，增加或减少多少？</div>

</template>

<div v-click="1"><Latex tex="W_{AB} = qU_{AB} = (-2\times 10^{-9}\ \text{C}) \times 20\ \text{V} = -4\times 10^{-8}\ \text{J}" />，静电力做负功。</div>

<div v-click="2">静电力做负功，电势能增加，增加了 <Latex tex="4\times 10^{-8}\ \text{J}" />。</div>

---
layout: exercise-split
clicks: 2
title: 练习二　电子伏
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　在研究微观粒子时常用电子伏（<Latex tex="\text{eV}" />）作为能量的单位。<Latex tex="1\ \text{eV}" /> 等于一个电子经过 <Latex tex="1\ \text{V}" /> 电压加速后所增加的动能。<Latex tex="1\ \text{eV}" /> 等于多少焦耳？</div>

</template>

<div v-click="1">电子的电荷量大小为 <Latex tex="1.6\times 10^{-19}\ \text{C}" />。经过 <Latex tex="1\ \text{V}" /> 电压加速，静电力做功 <Latex tex="W = eU = 1.6\times 10^{-19}\ \text{C} \times 1\ \text{V} = 1.6\times 10^{-19}\ \text{J}" />，电子增加的动能就等于这个功。</div>

<div class="tip-hint" v-click="2"><Latex tex="1\ \text{eV} = 1.6\times 10^{-19}\ \text{J}" />。</div>

---
layout: exercise-split
clicks: 3
class: p15-tight
title: 练习三　电场中的电势差与电势能
---

<template v-slot:stem>

<div><b class="ex-no">练习三</b>　如图，<Latex tex="A" />、<Latex tex="B" /> 是一条电场线上的两点，电场线方向向左。</div>
<div>（1）<Latex tex="A" />、<Latex tex="B" /> 两点哪点电势高？负电荷在哪点电势能大？</div>
<div>（2）负电荷由 <Latex tex="B" /> 点移到 <Latex tex="A" /> 点，静电力做正功还是负功？</div>
<div>（3）<Latex tex="A" />、<Latex tex="B" /> 两点的电势差 <Latex tex="U_{AB}" /> 是正的还是负的？<Latex tex="U_{BA}" /> 呢？</div>

</template>

<template v-slot:fig>

<PracticeSignsSvg />

</template>

<div v-click="1">（1）沿电场线方向电势降低，<Latex tex="\varphi_B > \varphi_A" />，<Latex tex="B" /> 点电势高；<Latex tex="E_p = q\varphi" />，负电荷在电势较低的 <Latex tex="A" /> 点电势能大。</div>

<div v-click="2">（2）<Latex tex="U_{BA} = \varphi_B - \varphi_A > 0" />，<Latex tex="q < 0" />，所以 <Latex tex="W_{BA} = qU_{BA} < 0" />，静电力做负功。</div>

<div v-click="3">（3）<Latex tex="U_{AB} = \varphi_A - \varphi_B < 0" />；<Latex tex="U_{BA} = -U_{AB} > 0" />。</div>

---
layout: base-flex
title: 本课小结
---

<div class="page-grow page-around">
<div class="stack">
<div class="summary-line">电势差（电压）<Latex tex="U_{AB} = \varphi_A - \varphi_B = -U_{BA}" />，它的数值与零电势点的选择无关。</div>
<div class="summary-line">静电力做功 <Latex tex="W_{AB} = qU_{AB}" />，即 <Latex tex="U_{AB} = \dfrac{W_{AB}}{q}" />；只由 <Latex tex="A" />、<Latex tex="B" /> 两点的位置决定，与移动路径无关。</div>
<div class="summary-line">等势面是电势相同的点构成的面。电场线跟等势面垂直，由电势高的等势面指向电势低的等势面；在同一等势面上移动电荷，静电力不做功。</div>
<div class="warn-hint">由 <Latex tex="U_{AB}" /> 求 <Latex tex="W_{AB}" /> 时，要把电荷的正负号和电势差的正负号一起代入 <Latex tex="W_{AB} = qU_{AB}" />。</div>
</div>
</div>
