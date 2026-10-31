---
theme: default
title: "电场 电场强度"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: course-cover
colorSchema: dark
clickAnimation: card
addons:
  - ../workspace/shared
# 页面外壳用共享 addon 的 base-flex 布局（flex 列；正文 .page-grow 靠它撑满）
defaults:
  layout: base-flex
  transition: fade
chapter-no: "9.3"
chapter: "第九章 静电场及其应用"
subtitle: "电场的描述与电场强度"
---

<CoverDecorationSvg />

---
clicks: 1
title: 头发为什么会张开
---

<div class="page-grow">

<div class="half-grid">

<HairChargeSvg />

<div class="stack">

<div class="ask text-2xl">用起电机使人体带电，人的头发会竖起散开。为什么会出现这样的现象？</div>

<div v-click="1" class="tip-hint">每根头发都带上了同种电荷，同种电荷相互排斥，于是彼此散开。</div>

</div>

</div>

</div>

---
clicks: 3
title: 不接触，力从哪里来
---

<div class="page-grow">

<div class="half-grid">

<FieldMediationSvg :show-field-a="$clicks >= 1" :show-field-b="$clicks >= 3" />

<div class="stack">

<div class="ask text-2xl">A、B 没有接触，B 却受到了指向 A 的吸引力。A 是通过什么对 B 施加力的作用的？</div>

<div v-click="2" class="tip-hint">电荷 A 的周围存在由它产生的电场，B 处在这个电场中，受到的静电力就是这个电场给予的。</div>

<div v-click="3" class="info-hint">同样，B 的电场对 A 也有力的作用。</div>

</div>

</div>

</div>

---
clicks: 3
title: 电场
---

# 电场

<div class="page-grow stack">

<DefinitionBox term="电场">

在电荷的周围存在着由它产生的电场。处在电场中的其他电荷受到的作用力，就是这个电场给予的。

</DefinitionBox>

<div v-click="1" class="info-hint">19 世纪 30 年代，法拉第提出这一观点。电场看不见、摸不着，但人们却可以根据它所表现出的性质来认识它、研究它。</div>

<div v-click="2" class="info-hint">场像分子、原子等实物粒子一样具有能量，因而场也是物质存在的一种形式。</div>

<div v-click="3" class="info-hint">本章只讨论静止电荷产生的电场，这种场叫作静电场。</div>

</div>

---
clicks: 3
title: 试探电荷
---

# 试探电荷

<div class="page-grow">

<div class="half-grid">

<ProbeChargeIntroSvg />

<div class="stack">

<div class="ask">要用电荷去研究电场的性质，这个电荷应该满足什么条件？</div>

<div v-click="1" class="info-hint">电荷量很小：使它放入后不影响原来要研究的电场。</div>

<div v-click="2" class="info-hint">体积很小：便于用它来研究电场各点的性质。</div>

<div v-click="3" class="tip-hint">这样的电荷常常叫作<strong>试探电荷</strong>；激发电场的带电体所带的电荷叫作<strong>场源电荷</strong>，或源电荷。</div>

</div>

</div>

</div>

---
clicks: 2
title: 用什么描述电场的强弱
---

<div class="page-grow">

<div class="half-grid">

<ProbeChargeCompareSvg :show-second="$clicks >= 1" />

<div class="stack">

<div class="ask">把试探电荷放在电场中的同一点，能不能直接用它所受到的静电力 <Latex tex="F" /> 来表示电场的强弱？</div>

<div v-click="1" class="warn-hint">在电场的同一点，电荷量不同的试探电荷所受的静电力不相同——<Latex tex="F" /> 不能直接表示电场的强弱。</div>

<div v-click="2" class="ask">那么，用什么物理量能够描述电场的强弱？</div>

</div>

</div>

</div>

---
clicks: 2
class: title-ask
title: 静电力与电荷量之比会变吗
---

# $F$ 与 $q$ 成正比吗？

<div class="page-grow stack-tight">

<ProbeFieldLab :show-ratio="$clicks >= 1" />

<div v-click="1" class="tip-hint"><Latex tex="F" /> 与 <Latex tex="q" /> 成正比，比值 <Latex tex="\dfrac{F}{q}" /> 保持不变。</div>

<div v-click="2" class="warn-hint">这只是猜想与假设，有待检验。用点电荷的电场检验得 <Latex tex="\dfrac{F_1}{q_1} = \dfrac{F_2}{q_2} = k\dfrac{Q}{r^2}" />——比值只与场源电荷的电荷量 <Latex tex="Q" /> 和距离 <Latex tex="r" /> 有关，在电场的不同位置它一般说来是不一样的。</div>

</div>

---
clicks: 2
title: 电场强度
---

# 电场强度

<div class="page-grow stack-tight">

<DefinitionBox term="电场强度">

放入电场中某点的电荷所受的静电力 <Latex tex="F" /> 与它的电荷量 <Latex tex="q" /> 之比，叫作该点的电场强度，常用 <Latex tex="E" /> 表示。

<div class="mt-2 text-center"><span class="text-[1.4rem]"><Latex tex="E = \dfrac{F}{q}" /></span><span class="ml-4 text-[0.9rem]">单位 <Latex tex="\text{N/C}" />（牛每库）：<Latex tex="1\ \text{C}" /> 的电荷在该点受力 <Latex tex="1\ \text{N}" /> 时，场强为 <Latex tex="1\ \text{N/C}" /></span></div>

</DefinitionBox>

<div v-click="1" class="info-hint">电场强度是矢量：方向与<strong>正电荷</strong>在该点所受静电力的方向相同；负电荷所受静电力方向与场强方向相反。</div>

<div v-click="2" class="warn-hint"><Latex tex="E" /> 由电场本身决定，与试探电荷的电荷量无关；它与场源电荷的电荷量 <Latex tex="Q" /> 和距离 <Latex tex="r" /> 有关。</div>

</div>

---
layout: exercise-split
clicks: 2
title: 练习与应用 2
---

<template v-slot:stem>

把试探电荷 $q$ 放到电场中的 A 点，测得它所受的静电力为 $F$；再把它放到 B 点，测得它所受的静电力为 $nF$。A 点和 B 点的电场强度之比 $\frac{E_{\text{A}}}{E_{\text{B}}}$ 是多少？

再把另一个电荷量为 $nq$ 的试探电荷放到另一点 C，测得它所受的静电力也是 $F$。A 点和 C 点的电场强度之比 $\frac{E_{\text{A}}}{E_{\text{C}}}$ 是多少？

</template>

<v-click>
<div><Latex tex="E_{\text{A}} = \dfrac{F}{q}" />，<Latex tex="E_{\text{B}} = \dfrac{nF}{q}" />，所以 <Latex tex="\dfrac{E_{\text{A}}}{E_{\text{B}}} = \dfrac{1}{n}" />。</div>
</v-click>

<v-click>
<div><Latex tex="E_{\text{C}} = \dfrac{F}{nq} = \dfrac{1}{n}\cdot\dfrac{F}{q} = \dfrac{E_{\text{A}}}{n}" />，所以 <Latex tex="\dfrac{E_{\text{A}}}{E_{\text{C}}} = n" />。</div>
</v-click>

---
clicks: 2
title: 点电荷的电场
---

# 点电荷的电场

<div class="page-grow stack-tight">

<div>与电荷量为 <Latex tex="Q" /> 的点电荷相距 <Latex tex="r" /> 处的电场强度 <span class="text-[1.3rem]"><Latex tex="E = k\dfrac{Q}{r^2}" /></span></div>

<PointChargeFieldLab :show-sphere="$clicks >= 1" :show-ratio="$clicks >= 2" />

<div v-click="1" class="tip-hint">以点电荷为中心作一个球面，球面上各点的电场强度大小相等。</div>

<div v-click="2" class="tip-hint"><Latex tex="r" /> 加倍，<Latex tex="E" /> 减为原来的 <Latex tex="\dfrac{1}{4}" />；<Latex tex="Q" /> 为正电荷时 <Latex tex="E" /> 沿半径向外，为负电荷时沿半径向内。</div>

</div>

---
clicks: 4
title: 电场的叠加
---

# 电场的叠加

<div class="page-grow stack-tight" style="--hint-pad-y: .45rem">

<SuperpositionLab :show-e1="$clicks >= 1" :show-e2="$clicks >= 2" :show-resultant="$clicks >= 3" />

<div v-click="3" class="tip-hint">电场中某点的电场强度，等于各个点电荷单独在该点产生的电场强度的<strong>矢量和</strong>。</div>

<div v-click="4">

<div class="half-grid" style="grid-template-columns: minmax(0, 260px) minmax(0, 1fr); gap: 1.2rem">

<ChargedSphereSvg />

<div class="info-hint">把带电体分成许多小块、每块看成点电荷再叠加，可以证明：均匀带电球体（或球壳）在球的外部产生的电场，与位于球心、电荷量相等的点电荷在该点产生的电场相同——<Latex tex="E = k\dfrac{Q}{r^2}" />（<Latex tex="r > R" />）。</div>

</div>

</div>

</div>

---
clicks: 3
title: 电场线
---

# 电场线

<div class="page-grow stack-tight">

<FieldLineTangentLab :show-arrows="$clicks >= 1" :show-tangent="$clicks >= 2" :show-density="$clicks >= 3" />

<div v-click="1" class="tip-hint">电场线是画在电场中的一条条<strong>有方向</strong>的曲线。</div>

<div v-click="2" class="tip-hint">曲线上每一点的<strong>切线方向</strong>表示该点的电场强度方向。</div>

<div v-click="3" class="tip-hint">同一幅图中，电场线较密的地方电场强度较大，较疏的地方较小。</div>

</div>

---
clicks: 1
title: 电场线的立体分布
---

# 电场线的立体分布

<div class="page-grow stack">

<div class="ask">两个点电荷周围的电场线，在空间中是怎样分布的？</div>

<FieldLines3D :show-arrows="$clicks >= 1" />

<div v-click="1" class="tip-hint">电场线上每一点的<strong>切线方向</strong>，就是该点的电场强度方向。</div>

</div>

---
clicks: 2
title: 电场线的特点
---

# 电场线的特点

<div class="page-grow stack">

<FieldLinePatternsSvg />

<div class="grid grid-cols-3 gap-4 text-center text-[15px] text-[var(--c-text-mute)]">
<div>正电荷</div>
<div>负电荷</div>
<div>等量异种电荷</div>
</div>

<div v-click="1" class="tip-hint">电场线从正电荷或无限远出发，终止于无限远或负电荷。</div>

<div v-click="2" class="tip-hint">电场线在电场中不相交，这是因为在电场中任意一点的电场强度不可能有两个方向。</div>

</div>

---
clicks: 1
title: 模拟电场线
---

# 模拟电场线

<div class="page-grow">

<div class="half-grid">

<OilChaffSvg />

<div class="stack">

<div class="fig-cap">把头发碎屑悬浮在蓖麻油里，加上电场，碎屑就按电场强度的方向排列起来，显示出电场线的分布。</div>

<div v-click="1" class="warn-hint">电场线不是实际存在的线，而是为了形象地描述电场而<strong>假想</strong>的线。这个实验只是用来<strong>模拟</strong>电场线的分布。</div>

</div>

</div>

</div>

---
clicks: 2
title: 匀强电场
---

# 匀强电场

<div class="page-grow stack">

<div>如果电场中各点电场强度的大小相等、方向相同，这个电场就叫作<strong>匀强电场</strong>。</div>

<UniformPlatesSvg />

<div v-click="1" class="tip-hint">方向相同 <Latex tex="\Rightarrow" /> 电场线平行；电场强度大小相等 <Latex tex="\Rightarrow" /> 电场线的疏密程度相同。所以匀强电场的电场线可以用间隔相等的平行线来表示。</div>

<div v-click="2" class="info-hint">相距很近的一对带等量异种电荷的平行金属板，它们之间的电场除边缘外，可以看作匀强电场。</div>

</div>

---
clicks: 2
title: 用物理量之比定义新物理量
---

# 用物理量之比定义新物理量

<div class="page-grow stack">

<div class="text-[1.2rem] leading-loose">
<Latex tex="\rho = \dfrac{m}{V}" />（密度）<span class="mx-6"></span><Latex tex="v = \dfrac{l}{t}" />（速度）<span class="mx-6"></span><Latex tex="E = \dfrac{F}{q}" />（电场强度）
</div>

<div v-click="1" class="tip-hint">这样定义一个新的物理量的同时，也就确定了这个新的物理量与原有物理量之间的关系。</div>

<div v-click="2" class="tip-hint">比值定义包含"比较"的思想：在电场强度概念建立的过程中，比较的是相同电荷量的试探电荷所受静电力的大小。</div>

</div>

---
clicks: 4
title: 小结
---

# 小结

<div class="page-grow stack">

<div class="summary-line">电场：电荷周围客观存在的物质，处在其中的电荷受到的作用力就是这个电场给予的。</div>

<div v-click="1" class="summary-line">电场强度 <Latex tex="E = \dfrac{F}{q}" />（定义式）：矢量，方向与正电荷在该点所受静电力的方向相同，单位 <Latex tex="\text{N/C}" />，由电场本身决定、与试探电荷无关。</div>

<div v-click="2" class="summary-line">点电荷的电场 <Latex tex="E = k\dfrac{Q}{r^2}" />；多个场源在某点产生的场强按矢量和叠加。</div>

<div v-click="3" class="summary-line">电场线：有方向的曲线，切线方向表示场强方向，疏密表示场强大小，在电场中不相交；它是假想的线。</div>

<div v-click="4" class="summary-line">匀强电场：各点场强大小相等、方向相同，电场线是间隔相等的平行线。</div>

</div>

---
layout: exercise-split
clicks: 3
title: 练习与应用 5
---

<template v-slot:stem>

某一区域的电场线分布中，A、B、C 是电场中的三个点。

- （1）哪一点的电场强度最强？哪一点的电场强度最弱？
- （2）画出各点电场强度的方向。
- （3）把负的点电荷分别放在这三个点，画出它所受静电力的方向。

</template>

<!-- 题目图（图 9.3-11）待老师提供原图或确认重画口径后再放 FieldPointsSvg；
     老师本轮口径：例题示意图可先用文字占位，因此此处暂不配图，#fig 空 slot 由布局自动退化 -->
<template v-slot:fig>

</template>

<v-click>
<div>（1）A 处电场线最密，电场强度最强；B 处电场线最疏，电场强度最弱。</div>
</v-click>

<v-click>
<div>（2）各点电场强度的方向沿该点电场线的切线方向。</div>
</v-click>

<v-click>
<div>（3）负电荷所受静电力的方向与该点电场强度的方向相反。</div>
</v-click>
