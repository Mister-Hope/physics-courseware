---
theme: default
title: "电势差与电场强度的关系"
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
chapter-no: "10.3"
chapter: 第十章 静电场中的能量
subtitle: 匀强电场中电势差与电场强度的定量关系
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
title: 等势线的疏密说明什么
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">图中箭头是电场线、虚线圆是等势线，相邻两条等势线的电势差相等。为什么靠近电荷的地方，两种线都更密？</div>
<div v-click="1">电场线描述电场强度，等势线描述电势——两者的疏密对应，说明电场强度和电势之间存在定量联系。</div>
<div v-click="2">先在匀强电场里把这个关系找出来：电场强度 <Latex tex="E" /> 与两点间电势差 <Latex tex="U" /> 有什么关系？</div>
</div>
<div class="figure">
<PointChargeGridSvg />
<div class="fig-cap">箭头：电场线　虚线圆：等势线（正点电荷的电场）</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 静电力做功的两种算法

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">匀强电场的电场强度为 <Latex tex="E" />，电荷 <Latex tex="q" /> 从 <Latex tex="A" /> 点移到 <Latex tex="B" /> 点，静电力做了多少功？</div>
<div v-click="1">按电势差的定义：<Latex tex="W = qU_{AB}" /></div>
<div v-click="2">按静电力算：恒力 <Latex tex="F = qE" />，沿电场方向的距离是 <Latex tex="d" />，<Latex tex="W = Fd = qEd" /></div>
<div class="tip-hint" v-click="3">两个结果算的是同一个功：<Latex tex="qU_{AB} = qEd" /></div>
</div>
<div class="figure"><FieldWorkSvg :show-analysis="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 匀强电场中的电势差与电场强度

<div class="page-grow">
<div class="stack">
<div class="ask">比较功的两个计算结果，<Latex tex="U_{AB}" /> 与 <Latex tex="E" /> 之间是什么关系？</div>
<div v-click="1"><Latex tex="qU_{AB} = qEd" />，两边约去 <Latex tex="q" />：

<Latex tex="U_{AB} = Ed" display /></div>
<div v-click="2"><Latex tex="E = \frac{U_{AB}}{d}" display />即电场强度的大小等于两点之间的电势差与两点沿电场强度方向的距离之比。</div>
<div class="tip-hint" v-click="3">匀强电场中两点间的电势差，等于电场强度与这两点沿电场方向的距离的乘积。电场强度在数值上等于沿电场方向单位距离上降低的电势，单位是 <Latex tex="\text{V/m}" />，与 <Latex tex="\text{N/C}" /> 相同（<Latex tex="1\ \text{V/m} = 1\ \text{N/C}" />）。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 两点不在同一条电场线上

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">如果 <Latex tex="A" />、<Latex tex="B" /> 两点不在同一条电场线上，还能得出 <Latex tex="U_{AB} = Ed" /> 吗？</div>
<div v-click="1">静电力做功与路径无关。把 <Latex tex="A" /> 到 <Latex tex="B" /> 的位移沿电场方向分解，静电力只在沿电场方向的那部分位移上做功。</div>
<div v-click="2">沿电场方向的分位移就是两点间的距离 <Latex tex="d" />，于是 <Latex tex="W = qEd = qU_{AB}" />，约去 <Latex tex="q" /> 仍得 <Latex tex="U_{AB} = Ed" /></div>
<div class="warn-hint" v-click="3"><Latex tex="d" /> 是两点沿电场方向的距离，不是两点连线的长度；电场线是曲线时各处 <Latex tex="E" /> 不同，这个式子不再适用。</div>
</div>
<div class="figure"><ObliquePointsSvg :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 相邻等势线的间距

<div class="page-grow">
<div class="stack">
<div class="ask">相邻两条等势线的电势差 <Latex tex="\Delta U" /> 相同，为什么电场强度越大的地方等势线越密？</div>
<EquipotentialLab />
<div v-click="1">由 <Latex tex="E = \dfrac{\Delta U}{d}" /> 得 <Latex tex="d = \dfrac{\Delta U}{E}" />：<Latex tex="\Delta U" /> 相同时，<Latex tex="E" /> 越大，间距 <Latex tex="d" /> 越小。</div>
<div class="tip-hint" v-click="2">电场线密的地方电场强度大，相邻等势线的间距就小——所以电场线密的地方等势线也密。</div>
</div>
</div>

---
layout: exercise-split
clicks: 3
title: 例题　静电力与到达另一板的速度
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　真空中平行金属板 <Latex tex="M" />、<Latex tex="N" /> 之间的距离 <Latex tex="d" /> 为 <Latex tex="0.04\ \text{m}" />，有一个 <Latex tex="2\times 10^{-15}\ \text{kg}" /> 的带电粒子位于 <Latex tex="M" /> 板旁，粒子的电荷量为 <Latex tex="8\times 10^{-15}\ \text{C}" />，给两金属板加 <Latex tex="200\ \text{V}" /> 直流电压。</div>
<div>（1）求带电粒子所受静电力的大小。</div>
<div>（2）求带电粒子从 <Latex tex="M" /> 板由静止开始运动到达 <Latex tex="N" /> 板时的速度。</div>

</template>

<template v-slot:fig>

<ExamplePlatesSvg :show-analysis="$clicks >= 1" />

</template>

<div v-click="1">（1）两板间是匀强电场，<Latex tex="E = \dfrac{U}{d}"/>，<Latex tex="F = Eq = \dfrac{Uq}{d} = \dfrac{200 \times 8\times 10^{-15}}{0.04}\ \text{N} = 4\times 10^{-11}\ \text{N}" /></div>

<div v-click="2">静电力 <Latex tex="4\times 10^{-11}\ \text{N}" /> 远大于重力 <Latex tex="2\times 10^{-14}\ \text{N}" />，重力忽略不计。</div>

<div v-click="3">（2）由 <Latex tex="a = \dfrac{F}{m}" /> 与 <Latex tex="v^2 = 2ad" /> 得 <Latex tex="v = \sqrt{\dfrac{2Fd}{m}} = \sqrt{\dfrac{2\times 4\times 10^{-11}\times 0.04}{2\times 10^{-15}}}\ \text{m/s} = 40\ \text{m/s}" /></div>

---
layout: base-flex
clicks: 3
class: title-ask
title: 两板距离加倍，静电力和速度怎么变
---

# 两板距离加倍，静电力和速度怎么变？

<div class="page-grow">
<div class="stack">
<div class="ask">把两金属板距离增大为原来的 2 倍，其他条件不变，（1）（2）的答案又如何？</div>
<div v-click="1"><Latex tex="d' = 2d" /> ⇒ <Latex tex="E' = \dfrac{U}{d'} = \dfrac{E}{2}" /> ⇒ <Latex tex="F' = \dfrac{F}{2} = 2\times 10^{-11}\ \text{N}" />，<Latex tex="a' = \dfrac{a}{2}" /></div>
<div v-click="2"><Latex tex="v' = \sqrt{2a'd'} = \sqrt{2 \cdot \dfrac{a}{2} \cdot 2d} = \sqrt{2ad} = 40\ \text{m/s}" display /></div>
<div class="tip-hint" v-click="3">由 <Latex tex="qU = \dfrac{1}{2}mv^2" />：只要加速电压 <Latex tex="U" /> 一定，带电粒子加速后获得的动能就一定，与板间距无关。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 电场不均匀时还有确定答案吗
---

<div class="page-grow page-around">
<div class="stack">
<div class="ask">例题中 <Latex tex="M" />、<Latex tex="N" /> 是平行金属板，板间是匀强电场。如果 <Latex tex="M" />、<Latex tex="N" /> 是其他形状、中间的电场不再均匀，例题中的三个问题还有确定答案吗？为什么？</div>
<div v-click="1">（1）没有确定答案：电场不均匀，各处 <Latex tex="E" /> 不同，静电力随位置变化，<Latex tex="E = \dfrac{U}{d}" /> 用不上。</div>
<div class="info-hint" v-click="2">（2）（3）仍有确定答案：<Latex tex="qU = \dfrac{1}{2}mv^2" /> 只由两板间的电势差决定，与电场是否均匀无关。</div>
</div>
</div>

---
layout: exercise-split
clicks: 2
title: 练习一　空气被击穿时的电场强度
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　电压为 <Latex tex="4\times 10^{4}\ \text{V}" /> 的直流电源两极连在一对平行金属板上，把两金属板的距离减小到 <Latex tex="1.3\ \text{cm}" />，两板之间就会放电。这次实验中空气被击穿时的电场强度是多少？</div>

</template>

<div v-click="1">板间是匀强电场，<Latex tex="E = \dfrac{U}{d} = \dfrac{4\times 10^{4}}{1.3\times 10^{-2}}\ \text{V/m}" /></div>

<div v-click="2"><Latex tex="E \approx 3.1\times 10^{6}\ \text{V/m}" />——空气在这个场强下被击穿。</div>

---
layout: exercise-split
clicks: 3
title: 练习二　C、D 两点的电势差
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　带有等量异种电荷、相距 <Latex tex="10\ \text{cm}" /> 的平行板 <Latex tex="A" /> 和 <Latex tex="B" /> 之间有匀强电场，电场强度 <Latex tex="E" /> 为 <Latex tex="2\times 10^{4}\ \text{V/m}" />，方向向下。电场中 <Latex tex="C" /> 点距 <Latex tex="B" /> 板 <Latex tex="3\ \text{cm}" />，<Latex tex="D" /> 点距 <Latex tex="A" /> 板 <Latex tex="2\ \text{cm}" />。</div>
<div>（1）<Latex tex="C" />、<Latex tex="D" /> 两点哪点电势高？两点的电势差 <Latex tex="U_{CD}" /> 等于多少？</div>

</template>

<template v-slot:fig>

<PlatePointsSvg :show-analysis="$clicks >= 2" />

</template>

<div v-click="1">电场方向向下，沿电场方向电势降低——靠近 <Latex tex="A" /> 板的 <Latex tex="D" /> 点电势高。</div>

<div v-click="2"><Latex tex="C" /> 点距 <Latex tex="A" /> 板 <Latex tex="7\ \text{cm}" />，<Latex tex="D" /> 点距 <Latex tex="A" /> 板 <Latex tex="2\ \text{cm}" />，两点沿电场方向的距离 <Latex tex="d = 5\ \text{cm} = 0.05\ \text{m}" /></div>

<div v-click="3"><Latex tex="U_{DC} = Ed = 2\times 10^{4}\times 0.05\ \text{V} = 1000\ \text{V}" />，所以 <Latex tex="U_{CD} = -1000\ \text{V}" /></div>

---
layout: base-flex
clicks: 2
---

# 等高线与等势线

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">山坡左边 <Latex tex="a" /> 和右边 <Latex tex="b" />，哪一边地势更陡？把球从两侧滚下（看成斜面、不计摩擦），哪边的加速度更大？</div>
<div v-click="1"><Latex tex="b" /> 一侧等高线密，同样的升高对应的水平距离更短，地势更陡、加速度更大。</div>
<div class="tip-hint" v-click="2">把数字的单位换成伏特，同一张图就是等势线图：<Latex tex="b" /> 一侧电势降落得快，电场强度大。</div>
</div>
<div class="figure">
<ContourSvg />
<div class="fig-cap">小山坡的等高线，数字是海拔高度，单位 <Latex tex="\text{m}" /></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
title: 本课小结
---

<div class="page-grow page-around">
<div class="stack">
<div class="summary-line" v-click="1">匀强电场中 <Latex tex="U_{AB} = Ed" />：<Latex tex="d" /> 是这两点<b>沿电场方向</b>的距离，不是两点连线的长度。</div>
<div class="summary-line" v-click="2"><Latex tex="E = \dfrac{U_{AB}}{d}" />：电场强度在数值上等于沿电场方向单位距离上降低的电势，单位 <Latex tex="\text{V/m}" /> 与 <Latex tex="\text{N/C}" /> 相同。</div>
<div class="summary-line" v-click="3">静电力做功 <Latex tex="W = qU_{AB}" /> 只由初末位置决定，与路径、与电场是否均匀都无关。</div>
<div class="tip-hint" v-click="4">相邻等势线电势差相同时，电场强度越大，间距 <Latex tex="d" /> 越小——这就是电场线密的地方等势线也密的原因。</div>
</div>
</div>
