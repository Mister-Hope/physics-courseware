---
theme: default
title: "磁感应强度 磁通量"
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
chapter-no: "13.2"
chapter: "第十三章 电磁感应与电磁波初步"
---

<CoverDecorationSvg />

---
clicks: 1
title: 磁场有强弱
---

<div class="page-grow">

<div class="half-grid">

<div class="figure"><FieldStrengthIntroSvg /></div>

<div class="stack">

<div>巨大的电磁铁能吸起成吨的钢铁，小磁体却只能吸起几枚铁钉。</div>

<div class="ask-lead">磁场有强弱之分。怎样<strong>定量</strong>地描述磁场的强弱？</div>

<div v-click="1" class="info-hint">研究电场时，我们把检验电荷放入电场，用它所受到的静电力引入电场强度，描述电场的强弱和方向。磁场可以沿用同样的思路。</div>

</div>

</div>

</div>

---
clicks: 3
title: 用什么检验磁场
---

<div class="page-grow stack-tight">

<div class="ask">要定量研究磁场中某点的强弱，把什么放进磁场里去检验？</div>

<div class="half-grid">

<div class="stack">

<div class="mini-title">小磁针</div>

<div v-click="1" class="info-hint">能显示该点磁场的方向；但很难对它做进一步的定量分析。</div>

</div>

<div class="stack divider-l">

<div class="mini-title">通电导线</div>

<div v-click="2" class="info-hint">电流 <Latex tex="I" /> 可以由电流表测量，长度 <Latex tex="l" /> 可以量——用它受到的力就能定量研究磁场。</div>

</div>

</div>

<div v-click="3" class="tip-hint">很短一段通电导线中的电流 <Latex tex="I" /> 与长度 <Latex tex="l" /> 的乘积 <Latex tex="Il" /> 叫作<strong>电流元</strong>。孤立的电流元不存在；要研究的磁场各处相同（均匀）时，可以用较长的通电导线，从结果推知电流元的受力。</div>

</div>

---
clicks: 2
title: 探究通电导线受力的因素
---

# 探究通电导线受力的因素

<div class="page-grow">

<div class="half-grid">

<div><WireForceProbe mode="demo" :step="$clicks" /></div>

<div class="stack">

<div class="ask">通电后导线会摆动。怎样用它比较导线所受磁场力的大小？</div>

<div v-click="1" class="info-hint">有电流通过时，导线摆动一定角度。<strong>摆动角度越大，导线所受的力越大</strong>。</div>

<div v-click="2" class="info-hint">电流大小由外部电路控制、用电流表测量；改变接入位置（接通 2、3 与 1、4）可以改变导线通电部分的长度。</div>

</div>

</div>

</div>

---
clicks: 2
title: 探究通电导线受力的因素
zoom: 0.93
---

<div class="page-grow stack-tight">

<div class="ask">改变电流 <Latex tex="I" />、改变通电长度 <Latex tex="l" />，导线受到的力怎样变？</div>

<WireForceProbe mode="lab" :step="$clicks" />

<div v-click="2" class="tip-hint"><Latex tex="F" /> 与 <Latex tex="Il" /> 成正比，即 <Latex tex="F = IlB" />；比值 <Latex tex="B" /> 与 <Latex tex="I" />、<Latex tex="l" /> 都无关。</div>

</div>
---
clicks: 4
title: 导线与磁场不垂直时
zoom: 0.97
---

<div class="page-grow">

<div class="half-grid">

<div><WireAngleProbe :step="$clicks" stacked /></div>

<div class="stack stack-tight">

<div class="ask">导线与磁场不垂直时，磁场力还等于 <Latex tex="IlB" /> 吗？平行时呢？</div>

<div v-click="1" class="info-hint">不管夹角多大，<Latex tex="F" /> <strong>始终同时垂直于 <Latex tex="B" /> 和导线</strong>——垂直于二者决定的平面，所以这里总垂直纸面向外。</div>

<div v-click="3" class="warn-hint">导线与磁场方向<strong>平行</strong>时不受磁场力：<Latex tex="F" /> = 0。</div>

<div v-click="4" class="tip-hint"><Latex tex="F = IlB\sin\theta" />：<Latex tex="\theta = 90^\circ" /> 时最大，<Latex tex="\theta = 0" /> 时为零。所以 <Latex tex="B = \dfrac{F}{Il}" /> 只在垂直时成立。</div>

</div>

</div>

</div>
---
clicks: 2
title: 磁感应强度
---

# 磁感应强度

<div class="page-grow stack-tight">

<div>导线与磁场方向垂直时 <Latex tex="F = IlB" />，式中 <Latex tex="B" /> 与导线的长度、电流的大小都没有关系；不同磁场（或非均匀磁场的不同位置）<Latex tex="B" /> 不同。</div>

<DefinitionBox term="磁感应强度">

<div>导线与磁场方向垂直时，导线所受的磁场力 <Latex tex="F" /> 与 <Latex tex="Il" /> 的比值，叫作该处的<span class="def-term">磁感应强度</span>，用 <Latex tex="B" /> 表示：<Latex tex="B = \dfrac{F}{Il}" />。单位：特斯拉（特），符号 <Latex tex="\text{T}" />，<Latex tex="1\ \text{T} = 1\ \dfrac{\text{N}}{\text{A}\cdot\text{m}}" />。</div>

</DefinitionBox>

<div v-click="1" class="tip-hint"><Latex tex="B" /> 由磁场本身决定：放不放导线、通多大电流，都不影响该点的 <Latex tex="B" />。它和 <Latex tex="E = \dfrac{F}{q}" />、<Latex tex="\rho = \dfrac{m}{V}" /> 一样，是用比值定义的新物理量。</div>

<div v-click="2" class="info-hint">磁感应强度是矢量：方向就是该处小磁针静止时 N 极所指的方向。</div>

</div>

---
clicks: 1
title: 一些磁场的磁感应强度
zoom: 0.90
---

# 一些磁场的磁感应强度

<div class="page-grow stack-tight">

<table class="data-table">
<thead>
<tr><th style="width: 62%">场所 / 现象</th><th>磁感应强度 <Latex tex="/\ \text{T}" /></th></tr>
</thead>
<tbody>
<tr><td>人体器官内的磁场</td><td><Latex tex="10^{-13}\sim10^{-9}" /></td></tr>
<tr><td>地磁场在地面附近的平均值</td><td><Latex tex="5\times10^{-5}" /></td></tr>
<tr><td>大型永磁体中心的磁场</td><td><Latex tex="0.134\ 6" /></td></tr>
<tr><td>电动机或变压器铁芯中的磁场</td><td><Latex tex="0.8\sim1.7" /></td></tr>
<tr><td>核磁共振的磁场</td><td><Latex tex="3" /></td></tr>
<tr><td>中子星表面的磁场</td><td><Latex tex="10^{6}\sim10^{8}" /></td></tr>
<tr><td>原子核表面的磁场</td><td>约 <Latex tex="10^{12}" /></td></tr>
</tbody>
</table>

<div v-click="1" class="warn-hint">地磁场在地面附近只有约 <Latex tex="5\times10^{-5}\ \text{T}" />，比电动机铁芯里的磁场弱四个数量级——指南针却仍能灵敏地指示方向。</div>

</div>

---
layout: exercise-split
clicks: 3
title: 练习 1
---

<template v-slot:stem>

有人根据 $B = \dfrac{F}{Il}$ 提出：磁场中某点的磁感应强度 $B$ 与通电导线在磁场中所受的磁场力 $F$ 成正比，与电流 $I$ 和导线长度 $l$ 的乘积成反比。这种说法有什么问题？

</template>

<div v-click="1">$B$ 由磁场本身决定：同一地点换不同的 <Latex tex="I" />、<Latex tex="l" />，<Latex tex="F" /> 随之变化，<Latex tex="\dfrac{F}{Il}" /> 不变；即使不放入导线，该点的 <Latex tex="B" /> 照样存在。所以不能说 <Latex tex="B" /> 与 <Latex tex="F" /> 成正比、与 <Latex tex="Il" /> 成反比。</div>

<div v-click="2"><Latex tex="B = \dfrac{F}{Il}" /> 是<strong>定义式</strong>：它给出的是测量 <Latex tex="B" /> 的方法，而不是 <Latex tex="B" /> 的大小由这些量决定。</div>

<div v-click="3" class="info-hint"><Latex tex="\rho = \dfrac{m}{V}" />、<Latex tex="E = \dfrac{F}{q}" /> 也是比值定义：<Latex tex="\rho" /> 不随 <Latex tex="m" />、<Latex tex="V" /> 变，<Latex tex="E" /> 不随 <Latex tex="q" /> 变。</div>

---
layout: exercise-split
clicks: 2
title: 练习 2
---

<template v-slot:stem>

在匀强磁场中，一根长 $0.4\ \text{m}$ 的通电导线中的电流为 $20\ \text{A}$，这条导线与磁场方向垂直时，所受的磁场力为 $0.015\ \text{N}$，求磁感应强度的大小。

</template>

<div v-click="1">导线与磁场方向垂直，可以直接用定义式 <Latex tex="B = \dfrac{F}{Il}" />。</div>

<div v-click="2"><Latex tex="B = \dfrac{0.015}{20 \times 0.4}\ \text{T} = 1.875\times10^{-3}\ \text{T} \approx 1.9\times10^{-3}\ \text{T}" />。</div>

---
clicks: 2
title: 匀强磁场
zoom: 0.90
---

# 匀强磁场

<div class="page-grow">

<div class="half-grid">

<div class="figure"><UniformFieldSvg /></div>

<div class="stack stack-tight">

<DefinitionBox term="匀强磁场" tone="blue" style="--def-pad-y: 0.7rem">

<div>磁场中各点的磁感应强度大小相等、方向相同，这个磁场叫作<span class="def-term">匀强磁场</span>。</div>

</DefinitionBox>

<div v-click="1" class="tip-hint">方向相同 <Latex tex="\Rightarrow" /> 磁感线互相平行；大小相等 <Latex tex="\Rightarrow" /> 疏密相同：磁感线是<strong>间隔相等的平行直线</strong>。</div>

<div v-click="2" class="info-hint">相距很近的平行异名磁极之间（除边缘外）是匀强磁场；两个平行放置较近的通电线圈之间也近似为匀强磁场。</div>

</div>

</div>

</div>
---
clicks: 3
title: 磁感线的疏密
---

<div class="page-grow">

<div class="half-grid">

<div><FieldDensityFluxSvg :step="$clicks" /></div>

<div class="stack stack-tight">

<div class="ask">两处磁感线的疏密不同，这怎样体现为磁感应强度的大小？</div>

<div v-click="1" class="info-hint">在 <Latex tex="S_1" /> 处取一个垂直于纸面的面：穿过它的是 3 条。</div>

<div v-click="2" class="info-hint">在 <Latex tex="S_2" /> 处取同样大小的面积：只有 2 条。</div>

<div v-click="3" class="tip-hint">穿过相同面积的条数越多，那处 <Latex tex="B" /> 越大；穿过某个面的条数与磁通量 <Latex tex="\Phi" /> 成正比——<strong>磁通量反映的是穿过面的磁感线条数</strong>。</div>

</div>

</div>

</div>
---
clicks: 2
title: 磁通量
zoom: 0.92
---

# 磁通量

<div class="page-grow">

<div class="half-grid">

<div><SlantedFluxDemo :theta="0" :step="0" /></div>

<div class="stack stack-tight">

<DefinitionBox term="磁通量" style="--def-pad-y: 0.7rem">

<div>匀强磁场中，与磁场方向垂直的平面面积为 <Latex tex="S" />，<Latex tex="B" /> 与 <Latex tex="S" /> 的乘积叫作穿过这个面积的<span class="def-term">磁通量</span>：<Latex tex="\Phi = BS" />。</div>

</DefinitionBox>

<div v-click="1" class="info-hint">单位：韦伯（韦），符号 <Latex tex="\text{Wb}" />，<Latex tex="1\ \text{Wb} = 1\ \text{T}\cdot\text{m}^2" />。</div>

<div v-click="2" class="tip-hint"><Latex tex="B" /> 也是“垂直于磁场方向的单位面积上的磁感线条数”，所以 <Latex tex="\Phi = BS" /> 就是<strong>穿过这个面的条数</strong>；由它得 <Latex tex="B = \dfrac{\Phi}{S}" />。</div>

</div>

</div>

</div>
---
clicks: 3
title: 面与磁场斜交
---

<div class="page-grow">

<div class="half-grid">

<div><SlantedFluxDemo :interactive="true" :step="$clicks" stacked /></div>

<div class="stack stack-tight">

<div class="ask">磁感线与这个面不垂直时，还能用 <Latex tex="\Phi = BS" /> 算吗？</div>

<div v-click="1" class="info-hint">用这个面在垂直于 <Latex tex="B" /> 的方向上的<strong>投影面积</strong> <Latex tex="S'" /> 代替 <Latex tex="S" />。</div>

<div v-click="3" class="warn-hint"><Latex tex="\theta = 0" /> 时 <Latex tex="S' = S" />，磁通量最大；<Latex tex="\theta = 90^\circ" /> 时 <Latex tex="S' = 0" />，磁通量为 0——面与 <Latex tex="B" /> 平行时磁感线不穿过它。</div>

</div>

</div>

</div>
---
layout: exercise-split
clicks: 3
title: 练习 3
zoom: 0.9
---

<template v-slot:stem>

匀强磁场的磁感应强度 $B$ 为 $0.2\ \text{T}$，方向沿 $x$ 轴的正方向，且线段 $MN$、$DC$ 相等，长度为 $0.4\ \text{m}$，线段 $NC$、$EF$、$MD$、$NE$、$CF$ 相等，长度为 $0.3\ \text{m}$，通过面积 $S_{MNCD}$、$S_{NEFC}$、$S_{MEFD}$ 的磁通量 $\Phi_1$、$\Phi_2$、$\Phi_3$ 各是多少？

</template>

<template v-slot:fig>

<FluxBoxSvg :step="$clicks" />

</template>

<div v-click="1">面 <Latex tex="MNCD" /> 与 <Latex tex="B" /> 垂直：<Latex tex="S = 0.4 \times 0.3 = 0.12\ \text{m}^2" />，<Latex tex="\Phi_1 = BS = 2.4\times10^{-2}\ \text{Wb}" />。</div>

<div v-click="2">面 <Latex tex="NEFC" /> 含有 <Latex tex="B" /> 的方向：<Latex tex="\Phi_2 = 0" />。</div>

<div v-click="3">面 <Latex tex="MEFD" /> 与 <Latex tex="B" /> 斜交，它在垂直 <Latex tex="B" /> 方向的投影正是 <Latex tex="MNCD" />：<Latex tex="S' = 0.12\ \text{m}^2" />，<Latex tex="\Phi_3 = BS' = 2.4\times10^{-2}\ \text{Wb}" />。</div>
---
clicks: 2
title: 同一束磁感线穿过不同的面
---

<div class="page-grow">

<div class="half-grid">

<div><FluxTubeSvg :step="$clicks" /></div>

<div class="stack">

<div class="ask">把 <Latex tex="S_2" /> 的面积增大，使穿过 <Latex tex="S_1" /> 的磁感线都穿过 <Latex tex="S_2" />，穿过它们的磁通量有什么关系？</div>

<div v-click="1" class="tip-hint">穿过 <Latex tex="S_1" /> 和 <Latex tex="S_2" /> 的是<strong>同一束</strong>磁感线，条数相同，所以磁通量相等。磁通量与面的大小无关，只由穿过它的磁感线净条数决定。</div>

</div>

</div>

</div>

---
clicks: 2
title: 指南针与郑和下西洋
zoom: 0.93
---

# 指南针与郑和下西洋

<div class="page-grow">

<div class="half-grid">

<div><GeomagneticDeclinationSvg :step="$clicks" /></div>

<div class="stack">

<div>磁针能指向南北，是因为地磁场的存在；地理两极与地磁两极并不重合。</div>

<div v-click="1" class="tip-hint">磁针方向与地理南北方向的交角，就是<strong>地磁偏角</strong>。不同地点、不同时期，地磁偏角的数值不同。</div>

<div v-click="2" class="info-hint">郑和下西洋的船队用罗盘导航，兼用观星，二者互相补充、互相修正；航海图上的航线叫“针路”。使用指南针确定南北方向时，要把磁偏角考虑在内。</div>

</div>

</div>

</div>

---
clicks: 3
title: 磁场力与电流的关系图像
zoom: 0.90
---

<div class="page-grow">

<div class="ask">在磁场中放置一条直导线，导线与磁场方向垂直。先后通入不同的电流，导线所受的力也不同。<Latex tex="F" />–<Latex tex="I" /> 图像应是什么样？</div>

<div class="half-grid">

<div>

<CoordAxes
  :x-range="[0, 2.2]"
  :y-range="[0, 2.2]"
  :x-axis="{ quantity: 'I', unit: 'A' }"
  :y-axis="{ quantity: 'F', unit: 'N' }"
  :ticks="{ x: [], y: [], labels: false }"
  :view="{ width: 620, height: 420 }"
  :curves="[
    { points: [{ x: 0, y: 0 }, { x: 2, y: 1 }], stroke: 'var(--c-accent-2)', width: 3, showAt: 1 },
    { points: [{ x: 0, y: 0 }, { x: 2, y: 2 }], stroke: 'var(--c-accent)', width: 3, showAt: 2 },
  ]"
  :labels="[
    { x: 1.45, y: 0.75, tex: 'A', anchor: 'top-right', size: 19, showAt: 1 },
    { x: 1.15, y: 1.95, tex: 'B', anchor: 'top-right', size: 19, showAt: 2 },
  ]"
  :step="$clicks"
/>

</div>

<div class="stack">

<div v-click="1" class="tip-hint">由 <Latex tex="F = IlB" />，<Latex tex="F" /> 与 <Latex tex="I" /> 成正比——图线是过原点的直线。</div>

<div v-click="2" class="info-hint">两组数据对应不同的磁场（或不同的通电长度）：斜率 <Latex tex="k = Bl" />，<Latex tex="B" /> 越大斜率越大。</div>

<div v-click="3" class="warn-hint">图线必须过原点：<Latex tex="I = 0" /> 时 <Latex tex="F = 0" />；只有磁场或通电长度改变，斜率才会变。</div>

</div>

</div>

</div>

---
clicks: 4
title: 小结
---

# 小结

<div class="page-grow stack">

<div class="summary-line">磁感应强度 <Latex tex="B = \dfrac{F}{Il}" />（导线与 <Latex tex="B" /> 垂直）：矢量，方向为该处小磁针静止时 N 极所指方向，单位 <Latex tex="\text{T}" />，由磁场本身决定。</div>

<div v-click="1" class="summary-line">导线与 <Latex tex="B" /> 斜交时 <Latex tex="F = IlB\sin\theta" />（<Latex tex="F" /> 始终同时垂直于 <Latex tex="B" /> 和导线）；平行时不受磁场力，所以定义 <Latex tex="B" /> 必须让导线与磁场垂直。</div>

<div v-click="2" class="summary-line">匀强磁场：各点磁感应强度大小相等、方向相同，磁感线是间隔相等的平行直线。</div>

<div v-click="3" class="summary-line">磁通量 <Latex tex="\Phi = BS" />（<Latex tex="B \perp S" />）；<Latex tex="B" /> 与面斜交时用投影面积 <Latex tex="S'" />：<Latex tex="\Phi = BS'" />。</div>

<div v-click="4" class="summary-line">磁通量反映的是穿过这个面的磁感线条数：同一束磁感线穿过不同的面，条数相同、磁通量相同。</div>

</div>
