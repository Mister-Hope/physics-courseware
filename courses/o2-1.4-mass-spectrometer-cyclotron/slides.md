---
theme: default
title: "质谱仪与回旋加速器"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: course-cover
colorScheme: dark
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
chapter: "第一章 安培力与洛伦兹力"
subtitle: "洛伦兹力与现代科技"
---

<!-- 封面装饰：磁场中的带电粒子轨迹（两条半径不同的半圆 + 电荷） -->
<CoverDecorationSvg />

---
layout: focus-question
clicks: 2
---

<!-- 教材 §1.4「问题」：怎样把电荷量相同、质量不同的粒子分开（先问后答） -->

<template v-slot:icon>

<mdi-help-circle-outline />

</template>

科学研究和工业生产中，常需要把一束电荷量相同、质量不同的粒子分开。用学过的知识，你能设计一个方案吗？

<template v-slot:hint>
电场能使带电粒子加速（<Latex tex="qU = \dfrac{1}{2}mv^2" />）；<br>
磁场能使运动的带电粒子偏转（<Latex tex="qvB = \dfrac{mv^2}{r}" />）。
</template>

<template v-slot:answer>
先加速、再偏转。质量不同的粒子落在不同位置。
</template>

---
clicks: 3
---

<!-- 原理页模板（教师认可）：左文字、右上角装置图，两栏顶对齐 -->

# 质谱仪的结构与工作过程

<div class="page-grow">

<div class="split-wide split-top split-fig-right">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 中性气体分子在电离室 <Latex tex="A" /> 中被电离成离子</div>

<div v-click="2">② 经电压 <Latex tex="U" /> 加速，从 <Latex tex="S_3" /> 垂直进入匀强磁场 <Latex tex="B" /></div>

<div v-click="3">③ 在磁场中做半圆运动，打在照相底片 <Latex tex="D" /> 上</div>

<div class="tip-hint" v-click="3">电荷量相同、质量不同的离子，半径不同、落点不同；测出 <Latex tex="r" /> 可求质量与比荷</div>

</div>

<div class="figure fig-h-md">

<MassSpectrometerFigure :step="$clicks" />

</div>

</div>

</div>

---
clicks: 3
---

<!-- 质谱仪半径公式的推导：动能定理 → 向心力 → 代入 -->

# 质谱仪的半径公式

<div class="page-grow stack text-xl leading-relaxed">

<div v-click="1">① 加速电场中，由动能定理 <Latex tex="qU = \dfrac{1}{2}mv^2" />，得 <Latex tex="v = \sqrt{\dfrac{2qU}{m}}" /></div>

<div v-click="2">② 磁场中，洛伦兹力提供向心力 <Latex tex="qvB = \dfrac{mv^2}{r}" />，得 <Latex tex="r = \dfrac{mv}{qB}" /></div>

<div v-click="3">③ 把 <Latex tex="v" /> 代入：<Latex tex="r = \dfrac{1}{B}\sqrt{\dfrac{2mU}{q}}" /></div>

<div class="tip-hint" v-click="3">同一加速电压、同一磁场下 <Latex tex="r \propto \sqrt{m}" />；由底片上的落点测出 <Latex tex="r" />，就能求出离子的质量和比荷 <Latex tex="q/m" /></div>

</div>

---

<!-- 交互页（无标题、无文字）：整页给实验台，保证后排看得清 -->

<div class="page-grow">

<MassSpectrometerLab />

</div>

---
layout: exercise-split
class: tight-gap
clicks: 3
---

<!-- 例 1（教材 §1.4 练习与应用 1）：由直径比求质量比 -->

<template v-slot:stem>

<div class="mini-title"><mdi-numeric-1-circle class="icon-md" />例 1：测同位素的质量比</div>

<Latex tex="A" />、<Latex tex="B" /> 是两种同位素的原子核，它们具有相同的电荷、不同的质量。为测定它们的质量比，使它们从质谱仪的同一加速电场由静止开始加速，然后沿着与磁场垂直的方向进入同一匀强磁场，打到照相底片上。如果从底片上获知 <Latex tex="A" />、<Latex tex="B" /> 在磁场中运动轨迹的直径之比是 <Latex tex="1.08 : 1" />，求 <Latex tex="A" />、<Latex tex="B" /> 的质量之比。

</template>

<template v-slot:fig>

<!-- 限宽容器：#fig 栏按图的固有宽度收（width: max-content），而 MassSpectrometerFigure 的
     svg 元素只有 viewBox、没有固有尺寸 ⇒ max-content 算成 0、整张图消失（见 exercise-layouts 笔记）。
     这里给一个明确宽度（640×340 的图 ⇒ 300×159），图栏宽度同时决定解析栏还剩多宽。 -->
<div style="width: 300px">

<MassSpectrometerFigure diameters />

</div>

</template>

<div v-click="1">① 由 <Latex tex="r = \dfrac{1}{B}\sqrt{\dfrac{2mU}{q}}" /> 得 <Latex tex="m \propto r^2" /></div>

<div v-click="2">② 直径 <Latex tex="d = 2r \propto \sqrt{m}" />，所以 <Latex tex="\dfrac{m_A}{m_B} = \left(\dfrac{d_A}{d_B}\right)^2 = 1.08^2 \approx 1.17" /></div>

<div class="tip-hint" v-click="3"><Latex tex="m_A : m_B \approx 1.17 : 1" /></div>

---
clicks: 4
---

<!-- 原理页：多级加速的长度困境（沿用第 3 页版式，图右浮动让文字环绕） -->

# 从多级加速到回旋加速

<div class="page-grow">

<div class="float-wrap">

<div class="figure float-fig">

<LinacCompareSvg />

</div>

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 原子核被核力约束，需要用能量极高的粒子轰击才能打开</div>

<div v-click="2">② 电场对粒子做功：<Latex tex="qU = \Delta E_k" />，电压越高，动能越大</div>

<div v-click="3">③ 电压过高难以实现 ⟹ 采用多级加速；但粒子沿直线飞，装置会很长</div>

<div class="ask" v-click="4">能否让粒子反复回到加速区，减小装置长度？</div>

</div>

</div>

</div>

---
clicks: 3
---

<!-- 原理页：回旋加速器的构造与工作过程 -->

# 回旋加速器的结构与工作过程

<div class="page-grow">

<div class="split-wide split-top split-fig-right">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 两盒之间加交变电压 <Latex tex="U" />：粒子每次经过盒缝被电场加速一次，动能增加 <Latex tex="qU" /></div>

<div v-click="2">② 金属盒对电场有屏蔽作用，盒内只有洛伦兹力，粒子做匀速圆周运动</div>

<div v-click="3">③ 粒子每转过半个圆回到盒缝，电源恰好改变正负，于是再次被加速</div>

</div>

<div class="figure fig-h-lg fig-w-sm">

<CyclotronFigure />

</div>

</div>

</div>

---

<!-- 交互页（无标题、无文字）：点一下看粒子一圈圈被加速 -->

<div class="page-grow">

<CyclotronRun />

</div>

---
clicks: 2
---

<!-- 教材「思考与讨论」：每两次过缝的时间间隔是否相同 -->

<div class="ask text-xl">粒子每两次经过盒缝的时间间隔是否相同？电源的正负变换是否需要越来越快？</div>

<div class="page-grow">

<div class="split-wide split-top split-fig-right">

<div class="stack text-lg leading-relaxed">

<div v-click="1"><Latex tex="T = \dfrac{2\pi r}{v}" />，代入 <Latex tex="r = \dfrac{mv}{qB}" />，得 <Latex tex="T = \dfrac{2\pi m}{qB}" /></div>

<div class="tip-hint" v-click="2">周期只由 <Latex tex="m" />、<Latex tex="q" />、<Latex tex="B" /> 决定，与速率和半径无关 ⟹ 电源用恒定频率 <Latex tex="f = \dfrac{qB}{2\pi m}" /> 即可</div>

</div>

<div class="figure fig-h-md" v-click="1">

<CyclotronSyncSvg />

</div>

</div>

</div>

---
clicks: 2
---

<!-- 最大动能：推导 + 易错点（本页不配交互，交互放下一页整页） -->

# 最大动能由什么决定

<div class="page-grow stack text-xl leading-relaxed">

<div v-click="1">① 盒内最大半径就是 D 形盒半径 <Latex tex="R" />，此时 <Latex tex="v_{\max} = \dfrac{qBR}{m}" /></div>

<div v-click="2">② <Latex tex="E_{k\max} = \dfrac{1}{2}mv_{\max}^2 = \dfrac{q^2B^2R^2}{2m}" /></div>

<div class="tip-hint" v-click="2">动能由 <Latex tex="q" />、<Latex tex="m" />、<Latex tex="B" /> 和盒半径 <Latex tex="R" /> 决定，与加速电压 <Latex tex="U" /> 无关；<Latex tex="U" /> 只决定加速次数和总时间</div>

</div>

---

<!-- 交互页（无标题、无文字）：拖 U 看最大动能不变，拖 B 或 R 才变 -->

<div class="page-grow">

<CyclotronEnergy />

</div>

---
layout: exercise-split
class: tight-gap
clicks: 3
---

<!-- 例 2（教材 §1.4 练习与应用 2）：估算离开回旋加速器时的动能 -->

<template v-slot:stem>

<div class="mini-title"><mdi-numeric-2-circle class="icon-md" />例 2：估算最大动能</div>

回旋加速器 D 形盒的半径为 <Latex tex="r" />，匀强磁场的磁感应强度为 <Latex tex="B" />。一个质量为 <Latex tex="m" />、电荷量为 <Latex tex="q" /> 的粒子在加速器的中央从速度为 0 开始加速。根据回旋加速器的这些数据，估算该粒子离开回旋加速器时获得的动能。

</template>

<template v-slot:fig>

<!-- 限宽 300px：CyclotronFigure 的 svg 固有宽 340 ⇒ 高 294，而这一页题干长、
     解析栏只剩 ~269px ⇒ 图栏居中后上下各溢出 13px。收到 300×259 正好落在栏内。 -->
<div style="width: 300px">

<CyclotronFigure />

</div>

</template>

<div class="stack stack-tight" style="gap:.2rem;--hint-pad-y:.5rem">

<div v-click="1">① 粒子离开时轨道半径达到最大，即 D 形盒半径 <Latex tex="r" />：<Latex tex="qvB = \dfrac{mv^2}{r}" />，得 <Latex tex="v = \dfrac{qBr}{m}" /></div>

<div v-click="2">② <Latex tex="E_k = \dfrac{1}{2}mv^2 = \dfrac{q^2B^2r^2}{2m}" /></div>

<div class="tip-hint" v-click="3">动能与加速电压无关，只由 <Latex tex="q" />、<Latex tex="m" />、<Latex tex="B" /> 和盒半径 <Latex tex="r" /> 决定</div>

</div>

---
clicks: 3
---

<!-- 原理页：相对论效应导致失步，回旋加速器能量上限 -->

# 为什么存在能量上限

<div class="page-grow">

<div class="split-wide split-top split-fig-right">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 按照狭义相对论，粒子的质量随速度的增大而增大</div>

<div v-click="2">② 由 <Latex tex="T = \dfrac{2\pi m}{qB}" />，质量增大使回旋周期变长，与电源周期失去同步</div>

<div v-click="3">③ 回旋加速器的能量上限约为 <Latex tex="25 \sim 30\ \text{MeV}" />，更高能量需用同步加速器</div>

</div>

<div class="figure fig-h-md">

<RelativityLimitSvg />

</div>

</div>

</div>

---
layout: course-cover
title: "洛伦兹力与现代科技"
lesson: "第二课时"
subtitle: "四种应用装置"
---

<!-- 第二课时封面：洛伦兹力的四类应用装置 -->
<CoverDecorationSvg />

---
clicks: 1
---

<!-- 第二课时总览：四张卡片点击看一句话原理，最后收束到共同模型 -->

# 洛伦兹力的应用装置

<div class="spread">

<div class="ask text-xl">能否利用带电粒子的偏转，测量磁感应强度、流速或流量？</div>

<DeviceGallery />

<div class="tip-hint" v-click="1">四类装置的共同点：洛伦兹力使电荷向一侧偏转，电荷堆积建立电场，电场力与洛伦兹力平衡 <Latex tex="qvB = qE" /></div>

</div>

---
clicks: 3
---

<!-- 原理页：速度选择器的结构与平衡条件（静态图，不放受力分析） -->

# 速度选择器

<div class="page-grow">

<div class="split-wide split-top split-fig-right">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 两板间有竖直向下的匀强电场 <Latex tex="E" /> 和垂直纸面向里的匀强磁场 <Latex tex="B" /></div>

<div v-click="2">② 射入的粒子受电场力 <Latex tex="qE" /> 与洛伦兹力 <Latex tex="qvB" />，二者方向相反</div>

<div class="tip-hint" v-click="3">沿直线通过 ⟹ <Latex tex="qvB = qE" /> ⟹ <Latex tex="v = \dfrac{E}{B}" />；与电荷正负、电荷量、质量都无关</div>

</div>

<div class="figure fig-h-lg">

<SpeedSelectorDevice mode="figure" />

</div>

</div>

</div>

---
clicks: 1
---

<!-- 交互页（无标题、无文字）：拖 v、切换电荷正负，看粒子怎么偏 -->

<div class="page-grow">

<SpeedSelectorDevice mode="lab" :step="$clicks" />

</div>

---
layout: exercise-split
class: tight-gap
clicks: 4
---

<!-- 例 3（导学案 例 1）：平行板器件中 E 与 B 垂直，判断正误 -->

<template v-slot:stem>

<div class="mini-title"><mdi-numeric-3-circle class="icon-md" />例 3：速度选择器</div>

如图所示的平行板器件中，电场强度 <Latex tex="E" /> 和磁感应强度 <Latex tex="B" /> 相互垂直。一带电粒子（重力不计）从左端以速度 <Latex tex="v" /> 沿虚线射入后做直线运动。下列说法正确的是（ ）

A. 该粒子一定带正电　　B. 该粒子的速度 <Latex tex="v = \frac{E}{B}" />　　C. 若 <Latex tex="v > \frac{E}{B}" />，则该粒子一定不能从板间射出　　D. 该粒子从右端沿虚线进入仍做直线运动

</template>

<template v-slot:fig>

<SpeedSelectorDevice mode="figure" />

</template>

<!-- 四条「选项正误」是并列的一行一条，解析栏默认 0.6rem 的块间距（4 条 = 53px）
     加上题干把解析栏挤到只剩 229px ⇒ 最后一条落到画布外。收紧到 0.3rem。 -->
<div class="stack" style="--stack-gap: 0.3rem">

<div v-click="1">① 沿直线通过 ⟹ 受力平衡 ⟹ <Latex tex="v = \frac{E}{B}" />，B 正确</div>

<div v-click="2">② A 错：正、负电荷只要速度合适都能通过</div>

<div v-click="3">③ C 错：偏转量不大时仍能从板间飞出</div>

<div v-click="4">④ D 错：电场力方向不变、洛伦兹力反向 ⟹ 偏转</div>

</div>

---
clicks: 3
---

<!-- 原理页：磁流体发电机的结构与电动势 -->

# 磁流体发电机

<div class="page-grow">

<div class="split-wide split-top split-fig-right">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 高温下电离的等离子体以速度 <Latex tex="v" /> 垂直磁场方向喷入两板之间</div>

<div v-click="2">② 洛伦兹力把正、负离子推向不同的板，板上堆积等量异号电荷</div>

<div class="tip-hint" v-click="3">③ 稳定时 <Latex tex="qvB = qE = q\dfrac{U}{d}" /> ⟹ <Latex tex="U = Bvd" />，与离子数量无关</div>

</div>

<div class="figure fig-h-lg">

<MHDGeneratorDevice mode="figure" />

</div>

</div>

</div>

---
clicks: 3
---

<!-- 交互页（无标题、无文字）：拖 v、B、d 看电动势与离子偏转 -->

<div class="page-grow">

<MHDGeneratorDevice mode="lab" :step="$clicks" />

</div>

---
layout: exercise-split
class: tight-gap
clicks: 2
---

<!-- 例 4（导学案 例 2 简化）：求电动势、判断正极 -->

<template v-slot:stem>

<div class="mini-title"><mdi-numeric-4-circle class="icon-md" />例 4：发电机的电动势与正极</div>

磁流体发电机的两块平行金属板 <Latex tex="A" />、<Latex tex="B" /> 间距 <Latex tex="d = 0.2\ \text{m}" />，板间有磁感应强度 <Latex tex="B = 0.5\ \text{T}" /> 的匀强磁场（方向垂直纸面向里）。一束等离子体以 <Latex tex="v = 1000\ \text{m/s}" /> 的速度垂直于磁场方向喷入。

（1）求发电机的电动势；（2）判断 <Latex tex="A" />、<Latex tex="B" /> 两板中哪一个是电源的正极。

</template>

<template v-slot:fig>

<MHDGeneratorDevice mode="figure" />

</template>

<div v-click="1">① 稳定时 <Latex tex="qvB = q\dfrac{U}{d}" /> ⟹ <Latex tex="\varepsilon = U = Bvd = 0.5 \times 1000 \times 0.2\ \text{V} = 100\ \text{V}" /></div>

<div class="tip-hint" v-click="2">② 由左手定则，正离子受到的洛伦兹力向上 ⟹ <Latex tex="A" /> 板堆积正电荷，是电源的正极</div>

---
clicks: 3
---

<!-- 原理页：电磁流量计的结构与流量公式 -->

# 电磁流量计

<div class="page-grow">

<div class="split-wide split-top split-fig-right">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 导电液体中的正、负离子随液体一起以速度 <Latex tex="v" /> 向右流动</div>

<div v-click="2">② 洛伦兹力使正、负离子偏向两侧管壁，两壁之间出现电势差</div>

<div class="tip-hint" v-click="3">③ 稳定时 <Latex tex="qvB = q\dfrac{U}{D}" /> ⟹ <Latex tex="v = \dfrac{U}{BD}" />，流量 <Latex tex="Q = \dfrac{\pi DU}{4B}" /></div>

</div>

<div class="figure fig-h-lg">

<FlowmeterDevice mode="figure" />

</div>

</div>

</div>

---
clicks: 2
---

<!-- 交互页（无标题、无文字）：拖 v、B、D 看电压与流量读数 -->

<div class="page-grow">

<FlowmeterDevice mode="lab" :step="$clicks" />

</div>

---
layout: exercise-split
class: p25
clicks: 2
---

<!-- 例 5（导学案 例 3 简化）：由电压求流速与流量（右栏只有两行算式，图栏放宽） -->

<template v-slot:stem>

<div class="mini-title"><mdi-numeric-5-circle class="icon-md" />例 5：流速与流量</div>

某电磁流量计的一段圆形管道直径为 <Latex tex="D = 0.2\ \text{m}" />，管壁上两电极之间的磁场可视为匀强磁场，磁感应强度 <Latex tex="B = 0.5\ \text{T}" />（方向垂直于管道）。导电液体流过时，测得两电极间的电压 <Latex tex="U = 2.0 \times 10^{-3}\ \text{V}" />。求液体的流速 <Latex tex="v" /> 和流量 <Latex tex="Q" />（<Latex tex="\pi" /> 取 3.14）。

</template>

<template v-slot:fig>

<FlowmeterDevice mode="figure" />

</template>

<div v-click="1">① <Latex tex="v = \dfrac{U}{BD} = \dfrac{2.0 \times 10^{-3}}{0.5 \times 0.2}\ \text{m/s} = 0.02\ \text{m/s}" /></div>

<div class="tip-hint" v-click="2">② <Latex tex="Q = \dfrac{\pi D^2}{4}v = 6.28 \times 10^{-4}\ \text{m}^3/\text{s}" /></div>

---
clicks: 4
---

<!-- 原理页：霍尔元件的分阶段过程（剥离 → 堆积 → 电场增强 → 平衡） -->

# 霍尔元件

<div class="page-grow" style="--hint-pad-y:.5rem">

<div class="split-wide split-top split-fig-right" style="--cols: minmax(0, 1.35fr) minmax(0, 1fr)">

<div class="stack text-lg leading-relaxed" style="--stack-gap:.5rem">

<div v-click="1">① 载流子在磁场中受洛伦兹力，向一个侧面偏转、从另一侧面被剥离</div>

<div v-click="2">② 被剥离的载流子在对侧堆积，另一侧面剩下正离子、带上相反电性</div>

<div v-click="3">③ 两侧面上的电荷不断堆积，横向电场也随之不断增强</div>

<div v-click="4">④ 电场足够强时，电场力与洛伦兹力平衡，电压不再增大</div>

<div class="tip-hint" v-click="4">平衡时 <Latex tex="qvB = qE = q\dfrac{U}{a}" /> ⟹ <Latex tex="U = aBv" /></div>

</div>

<div class="figure fig-h-lg">

<HallElementDevice mode="figure" show-carriers />

</div>

</div>

</div>

---
clicks: 3
---

<!-- 交互页（无标题、无文字）：剥离堆积 → 电场建立 → 平衡（可切 N/P 型看极性翻转） -->

<div class="page-grow">

<HallElementDevice mode="lab" :step="$clicks" />

</div>

---
clicks: 4
---

<!-- 推导页（在演示之后）：由平衡条件推出 U = IB/(nqd)，给出 U 对 I、B、d 的依赖（例 6 要考） -->

# 霍尔电压的推导

<div class="page-grow stack text-xl leading-relaxed">

<div v-click="1">① 稳定后载流子沿长度方向匀速运动：<Latex tex="qvB = qE = q\dfrac{U}{a}" />，得 <Latex tex="U = aBv" />（<Latex tex="a" /> 为两侧面间距）</div>

<div v-click="2">② 设载流子数密度为 <Latex tex="n" />、电荷量为 <Latex tex="q" />，则 <Latex tex="I = nqvS" />，横截面积 <Latex tex="S = ad" />，得 <Latex tex="v = \dfrac{I}{nqad}" /></div>

<div v-click="3">③ 代入得 <Latex tex="U = \dfrac{IB}{nqd}" />（<Latex tex="d" /> 为沿磁场方向的厚度）</div>

<div class="tip-hint" v-click="4"><Latex tex="U \propto I" />、<Latex tex="U \propto B" />、<Latex tex="U \propto \dfrac{1}{d}" />，与宽度 <Latex tex="a" /> 无关 —— 霍尔元件能测磁感应强度、也能判断载流子类型的依据</div>

</div>

---
layout: exercise-split
class: tight-gap
clicks: 2
---

<!-- 例 6（导学案 例 4 简化）：霍尔电压与 I、B、d 的关系 -->

<template v-slot:stem>

<div class="mini-title"><mdi-numeric-6-circle class="icon-md" />例 6：霍尔电压</div>

一块厚度为 <Latex tex="d" /> 的半导体霍尔元件，放在与元件表面垂直的匀强磁场 <Latex tex="B" /> 中，元件中通有沿长度方向的电流 <Latex tex="I" />，测得两侧面间的电压为 <Latex tex="U" />。下列说法正确的是（ ）

A. 只增大电流 <Latex tex="I" />，<Latex tex="U" /> 增大　　B. 只增大磁感应强度 <Latex tex="B" />，<Latex tex="U" /> 减小

C. <Latex tex="U" /> 与元件的厚度 <Latex tex="d" /> 无关　　D. 只把电流反向，<Latex tex="U" /> 的方向不变

</template>

<template v-slot:fig>

<HallElementDevice mode="figure" />

</template>

<div class="stack-tight" style="gap:.3rem;--hint-pad-y:.5rem">

<div v-click="1">① 由 <Latex tex="U = \dfrac{IB}{nqd}" />：<Latex tex="U \propto I" />、<Latex tex="U \propto B" />、<Latex tex="U \propto \dfrac{1}{d}" /> ⟹ A 正确，B、C 错误</div>

<div class="warn-hint" v-click="2">② D 错误：电流反向 ⟹ 载流子偏转方向反向 ⟹ 两侧面电势高低也随之反向</div>

</div>

---
title: "小结：洛伦兹力的两类应用"
---

<!-- 全课小结：六类装置一张表 + 共同模型（全部常显，教师按需回看） -->

<div class="page-grow">

<div class="data-table sum-tight">

| 装置         | 关键关系                                          | 用途                 |
| ------------ | ------------------------------------------------- | -------------------- |
| 质谱仪       | $r = \frac{1}{B}\sqrt{\frac{2mU}{q}}$             | 分离同位素、测比荷   |
| 回旋加速器   | $E_{k\max} = \frac{q^2B^2R^2}{2m}$                | 获得高能粒子         |
| 速度选择器   | $v = \frac{E}{B}$                                 | 挑选特定速度的粒子   |
| 磁流体发电机 | $\varepsilon = Bvd$                               | 等离子体发电         |
| 电磁流量计   | $Q = \frac{\pi DU}{4B}$                           | 测导电液体的流量     |
| 霍尔元件     | $U = aBv = \frac{IB}{nqd}$                        | 测磁场、判断载流子类型 |

</div>

<div class="tip-hint">洛伦兹力使电荷向一侧偏转，电荷堆积建立电场，电场力与洛伦兹力平衡 <Latex tex="qvB = qE" /></div>

</div>
