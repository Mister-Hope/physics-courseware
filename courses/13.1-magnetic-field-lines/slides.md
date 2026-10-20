---
theme: default
title: "磁场 磁感线"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: course-cover
colorSchema: dark
clickAnimation: card
addons:
  - ../workspace/shared
defaults:
  layout: base-flex
  transition: fade
chapter-no: "13.1"
chapter: "第十三章 电磁感应与电磁波初步"
subtitle: "从奥斯特实验到安培定则"
---

<CoverDecorationSvg />

---
clicks: 2
title: 电和磁有联系吗
layout: focus-question
---

<template v-slot:icon>

<mdi-magnet class="icon-2xl" />

</template>

同名磁极相斥、异名磁极相吸——与电荷之间的相互作用具有相同的特征。电和磁有联系吗？

<template v-slot:hint>

凡是使用电的地方，几乎都有磁现象相伴随：电动机、电磁炉、耳机、扬声器。

</template>

<template v-slot:answer>

19 世纪初，库仑、英国物理学家杨和法国物理学家安培都认为电与磁是互不相关的两回事；奥斯特相信两者之间存在某种联系。

</template>

---
clicks: 3
title: 奥斯特实验
---

<div class="page-grow">
<div class="split-wide mf-split">
<div class="stack">
<div class="ask">导线沿南北方向架在小磁针上方。给导线通电，磁针会怎样？</div>
<div v-click="1" class="tip-hint">磁针偏转：通电导线周围存在磁场。</div>
<div v-click="2" class="info-hint">电流反向，磁针反向偏转。</div>
<div v-click="3" class="info-hint">1820 年奥斯特首次揭示电与磁的联系。</div>
</div>
<OerstedDemo :show-b="$clicks >= 1" />
</div>
</div>

---
clicks: 2
title: 磁场
---


<div class="page-grow stack">
<div class="ask">两个物体并没有接触，它们之间的作用力是怎样发生的？</div>
<div class="figure mf-fill-fig">
<ThreeInteractionsSvg :show-field="$clicks >= 1" />
</div>
<div v-click="1">

<DefinitionBox term="磁场">

磁体与磁体之间、磁体与通电导体之间，以及通电导体与通电导体之间的相互作用，都是通过磁场发生的。

</DefinitionBox>

</div>
<div v-click="2" class="info-hint">磁场与电场类似，是不依赖于我们的感觉而客观存在的物质。</div>
</div>

---
clicks: 4
title: 磁场的方向
---

<div class="page-grow stack">
<div class="ask">把小磁针放在磁场中的不同位置，它静止时的指向都不同。怎样表示某一点的磁场方向？</div>
<div class="figure mf-fill-fig">
<BarMagnetFieldSvg variant="needles" :step="$clicks" />
</div>
<div v-click="4" class="tip-hint">把小磁针静止时 N 极所指的方向规定为该点磁场的方向，也就是该点磁感应强度 <Latex tex="\vec{B}" /> 的方向。</div>
</div>

---
clicks: 3
title: 铁屑的排列
---

<div class="page-grow stack">
<div class="ask">在磁场中撒下铁屑、轻敲玻璃板，铁屑为什么会排成一条条曲线？</div>
<div class="figure mf-fill-fig">
<BarMagnetBoardSvg :step="$clicks" />
</div>
<div v-click="3" class="tip-hint">铁屑在磁场中被磁化，每一粒都相当于一个小磁针，于是沿磁场方向排列起来。</div>
</div>

---
clicks: 2
title: 磁感线
---


<div class="page-grow stack-tight">
<div class="figure mf-fill-fig">
<BarMagnetFieldSvg variant="lines" :step="$clicks" />
</div>
<div class="ask">沿铁屑的排列画出曲线后，怎样把方向标在曲线上？</div>
<div v-click="1" class="tip-hint">在磁体外部，磁感线从 N 极出发，回到 S 极。</div>
<div v-click="2" class="tip-hint">曲线上每一点的切线方向，都跟这点磁场的方向一致。</div>
</div>

---
clicks: 1
title: 磁感线的定义
---

<div class="page-grow stack">

<DefinitionBox term="磁感线">

沿磁场中的细铁屑画出一些曲线，使曲线上每一点的切线方向都跟这点磁场的方向一致，这样的曲线就叫作磁感线。

</DefinitionBox>

<div v-click="1" class="info-hint">磁感线是为了形象描述磁场而假想的曲线，实际并不存在。</div>
</div>

---
clicks: 2
title: 磁感线的疏密
---

# 磁感线的疏密

<div class="page-grow stack-tight">
<div class="figure mf-fill-fig">
<BarMagnetFieldSvg variant="lines" :step="1" :show-density="$clicks >= 1" />
</div>
<div class="ask">条形磁体的两极附近和中间，磁感线的疏密有什么不同？这说明了什么？</div>
<div v-click="2" class="tip-hint">磁感线较密的地方磁场较强，较疏的地方较弱。</div>
</div>

---
clicks: 2
title: 磁感线的特点
---


<div class="page-grow stack-tight">
<div class="ask">磁体内部有没有磁感线？两条磁感线会不会相交？</div>
<div class="figure mf-fill-fig">
<ClosedFieldLinesSvg :step="$clicks" />
</div>
<div v-click="1" class="tip-hint">磁体内部由 S 指向 N，内外一起构成闭合曲线。</div>
<div v-click="2" class="tip-hint">磁感线不相交：同一时刻一点的磁场方向只有一个。</div>
</div>

---
clicks: 2
title: 电场线与磁感线
---


<div class="page-grow stack-tight">
<div class="ask">电场线和磁感线，哪些性质相同，哪些性质不同？</div>
<div class="figure mf-fill-fig">
<FieldLinesCompareSvg />
</div>
<div v-click="1" class="tip-hint">相同：切线表示方向、疏密表示强弱、不相交。</div>
<div v-click="2" class="tip-hint">不同：电场线不闭合；磁感线闭合。</div>
</div>

---
clicks: 3
title: 两条形磁铁靠近的磁感线
---


<div class="page-grow stack-tight">
<div class="ask">两个条形磁铁靠近时，空间中的磁感线分别是什么样子？</div>
<div class="figure mf-fill-fig">
<TwoBarMagnetsSvg :step="$clicks" />
</div>
<div v-click="1" class="tip-hint">同名磁极相对：两 N 极之间磁感线最疏。</div>
<div v-click="2" class="tip-hint">异名磁极相对：两磁铁之间有磁感线穿过。</div>
<div v-click="3" class="tip-hint">中间穿过、外侧绕回、内部 S→N：每条线都闭合。</div>
</div>

---
clicks: 2
title: 磁场的叠加
---


<div class="page-grow stack-tight">
<div class="ask">为什么异名磁极之间磁感线更密，同名磁极之间反而更疏？</div>
<div class="figure mf-fill-fig">
<SuperpositionSvg :step="$clicks" />
</div>
<div class="fig-cap">蓝、青：两个磁体各自在 <Latex tex="P" /> 点产生的磁场；金色：合磁场</div>
<div v-click="1" class="tip-hint">磁感应强度是矢量：异名之间两个磁场同向叠加，更强。</div>
<div v-click="2" class="tip-hint">同名之间两个磁场反向叠加，更弱。</div>
</div>

---
clicks: 3
title: 直线电流的磁感线
---

# 直线电流的磁感线

<div class="page-grow">
<div class="split-wide mf-split-text">
<StraightWireFieldSvg :step="$clicks" />
<div class="stack">
<div class="ask">通电直导线周围的磁感线是什么形状？</div>
<div v-click="1" class="tip-hint">磁感线是一圈圈的同心圆。</div>
<div v-click="2" class="tip-hint">都在跟导线垂直的平面上。</div>
<div v-click="3" class="tip-hint">电流方向反了，各点磁场方向也反。</div>
</div>
</div>
</div>

---
clicks: 3
title: 安培定则
---

# 安培定则

<div class="page-grow">
<div class="split-wide mf-split">
<div class="stack">
<div class="ask">电流方向和磁感线的环绕方向之间，有没有一个可以操作的关系？</div>
<div v-click="3" class="tip-hint">用右手握住导线，伸直的拇指指向电流方向，弯曲的四指指向磁感线环绕的方向。</div>
</div>
<AmpereGripRule :step="$clicks" />
</div>
</div>

---
clicks: 3
title: 环形电流的磁场
---

# 环形电流的磁场

<div class="page-grow">
<div class="split-wide mf-split-text">
<RingCurrentFieldSvg :step="$clicks" />
<div class="stack">
<div class="ask">环形电流的磁感线是什么样子？轴线上的磁场方向怎样判断？</div>
<div v-click="1" class="tip-hint">磁感线穿过环的内部，方向沿轴线。</div>
<div v-click="3" class="tip-hint">四指沿电流环绕方向，拇指指向轴线上磁场的方向。</div>
</div>
</div>
</div>

---
clicks: 4
title: 通电螺线管
---


<div class="page-grow">
<div class="split-wide mf-split-text">
<SolenoidFieldSvg :step="$clicks" />
<div class="stack">
<div class="ask">外部磁场像哪种磁体？</div>
<div v-click="1" class="tip-hint">与条形磁体十分相似。</div>
<div v-click="2" class="tip-hint">四指沿电流，拇指指向 N 极。</div>
<div v-click="3" class="ask">内部与管口外，哪里的磁场更强？</div>
<div v-click="4" class="tip-hint">内部磁感线更密，磁场更强。</div>
</div>
</div>
</div>

---
clicks: 2
title: 两种安培定则
---

# 两种安培定则

<div class="page-grow stack">
<div class="ask">两种情形下，右手的拇指和四指各指什么？</div>
<table class="data-table">
<thead>
<tr><th style="width: 34%">情形</th><th style="width: 33%">拇指</th><th style="width: 33%">四指</th></tr>
</thead>
<tbody>
<tr v-click="1"><td>直线电流</td><td>沿电流方向</td><td>磁感线环绕方向</td></tr>
<tr v-click="2"><td>环形电流 / 通电螺线管</td><td>轴线上磁场方向（N 极）</td><td>沿电流环绕方向</td></tr>
</tbody>
</table>
<div v-click="2" class="info-hint">两种形式的拇指与四指分工正好互换，这是最容易记乱的地方。</div>
</div>

---
clicks: 1
title: 电流磁场的应用
---

<div class="page-grow stack">
<div class="ask">电磁起重机、电动机、电磁继电器、磁浮列车、电磁弹射——它们为什么都用电磁铁，而不用永磁体？</div>
<div class="three-col text-center">
<div>电磁起重机</div>
<div>电动机 · 电磁继电器</div>
<div>磁浮列车 · 电磁弹射</div>
</div>
<div v-click="1" class="tip-hint">与天然磁体的磁场相比，电流磁场的强弱容易控制（改变电流的大小、通断即可），因此在实际中有很多重要的应用。</div>
</div>

---
clicks: 2
title: 安培分子电流假说
---


<div class="page-grow stack-tight">
<div class="ask">通电螺线管外部的磁场与条形磁体的磁场十分相似。这说明磁体的磁场是从哪里来的？</div>
<div class="figure mf-fill-fig">
<MolecularCurrentSvg :step="$clicks" />
</div>
<div v-click="1" class="tip-hint">安培假说：物质内部的环形电流使每个微粒成为小磁体。</div>
<div v-click="2" class="info-hint">原子内带电粒子的运动对应所说的分子电流。</div>
</div>

---
clicks: 3
title: 磁化与去磁
---

<div class="page-grow stack-tight">
<div class="ask">铁棒靠近磁体后两端显出磁极，高温或撞击后磁性又消失，为什么？</div>
<div class="figure mf-fill-fig">
<MagnetizationSvg :step="$clicks" />
</div>
<div v-click="1" class="tip-hint">未被磁化：分子电流取向杂乱，磁场互相抵消。</div>
<div v-click="2" class="tip-hint">受到外界磁场作用，取向大致相同，铁棒被磁化。</div>
<div v-click="3" class="tip-hint">高温或猛烈撞击：取向又杂乱，磁性消失。</div>
</div>

---
clicks: 2
title: 练习：标出电流方向
layout: exercise-split
---

<template v-slot:stem>

通电直导线附近的小磁针如图所示，标出导线中的电流方向。

</template>

<template v-slot:fig>

<StraightWireCompassQ :show-field="$clicks >= 1" :show-current="$clicks >= 2" />

</template>

<div v-click="1" class="stack">
<div>N 极指向就是该点磁场方向；过该点作环绕导线的磁感线圆，该点切线向西。</div>
</div>

<div v-click="2" class="tip-hint">由安培定则：四指沿磁感线环绕方向（逆时针），拇指指向纸外——导线中的电流方向垂直纸面向外。</div>

---
clicks: 2
title: 练习：小磁针的指向
layout: exercise-split
---

<template v-slot:stem>

圆形导线环中沿逆时针方向通过电流，环心处小磁针最后静止时 N 极指向哪里？

</template>

<template v-slot:fig>

<RingCompassQ :show-field="$clicks >= 1" :show-answer="$clicks >= 2" />

</template>

<div v-click="1" class="stack">
<div>四指沿电流环绕方向（逆时针），拇指指向纸外。</div>
</div>

<div v-click="2" class="tip-hint">小磁针静止时 N 极指向纸外（垂直纸面向外）。</div>

---
clicks: 4
title: 小结
---

<div class="page-grow stack">
<div class="half-grid">
<div v-click="1" class="stack">
<div class="mini-title">磁场与磁感应强度</div>
<div>磁体和电流的周围都存在磁场；磁感应强度 <Latex tex="\vec{B}" /> 是矢量，方向就是该点磁场的方向，空间某点的磁场是各磁场的矢量和。</div>
</div>
<div v-click="2" class="stack">
<div class="mini-title">磁感线</div>
<div>切线方向 = 该点磁场方向；疏密表示强弱；磁感线是闭合曲线、不相交；外部由 N 到 S、内部由 S 到 N。</div>
</div>
<div v-click="3" class="stack">
<div class="mini-title">安培定则</div>
<div>直线电流：拇指沿电流，四指指向磁感线环绕方向；环形电流与螺线管：四指沿电流，拇指指向轴线上磁场的方向。</div>
</div>
<div v-click="4" class="stack">
<div class="mini-title">分子电流假说</div>
<div>物质内部的分子电流使每个微粒成为小磁体；取向一致时显磁性，杂乱时磁性抵消。</div>
</div>
</div>
<div class="mini-note">作业：教材 13.1 练习与应用 第 1、2、3、7 题。</div>
</div>

---
clicks: 3
title: 拓展：磁感线为什么闭合
---

# 拓展：磁感线为什么是闭合的

<div class="page-grow stack">
<div class="ask">把一根条形磁体从中间切开，会得到只有一个磁极的磁体吗？</div>
<div v-click="1" class="info-hint">切开以后，每一半仍然是完整的磁体，各有 N 极和 S 极。</div>
<div v-click="2" class="info-hint">继续切下去，仍然找不到只有一个磁极的「磁单极子」。</div>
<div v-click="3" class="tip-hint">所以磁感线没有起点、也没有终点——它总是闭合的。</div>
</div>
