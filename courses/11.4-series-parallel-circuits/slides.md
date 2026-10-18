---
theme: default
title: "串联电路和并联电路"
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
chapter-no: "11.4"
chapter: "第十一章 电路及其应用"
subtitle: 串并联规律 · 电表改装
---

<CoverDecorationSvg />

---
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">如果把两个电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 串联或并联后看成一个电阻，你认为这个电阻跟 <Latex tex="R_1" />、<Latex tex="R_2" /> 应该是怎样的关系？</div>

<div v-click="1">
把两个电阻组成的整体看成一个<b>等效电阻</b> <Latex tex="R" />：用它取代原来的两个电阻后，电路中的电流和两端的电压完全相同。下面从电流、电压、电阻三方面找关系。
</div>
</div>

---
clicks: 2
---

# 串、并联电路中的电流

<div class="page-grow">
<div class="ask">串联时电流有什么规律？并联时干路与支路的电流又是什么关系？</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<SeriesCircuitSvg :step="$clicks" style="max-width: 460px; margin: 0 auto" />
<div v-click="1" class="stack-tight">
<div>电路各处电荷分布保持不变，相同时间内通过 0、1、2、3 各点的电荷量必然相等：</div>
<Latex tex="I_0 = I_1 = I_2 = I_3" />
<div><b>串联电路中的电流处处相等。</b></div>
</div>
</div>
<div class="stack" style="min-width: 0">
<ParallelCircuitSvg :step="$clicks - 1" style="max-width: 460px; margin: 0 auto" />
<div v-click="2" class="stack-tight">
<div>干路 0 点的电荷量必须等于进入各支路电荷量之和：</div>
<Latex tex="I = I_1 + I_2" />
<div><b>并联电路的总电流等于各支路电流之和。</b></div>
</div>
</div>
</div>
</div>

---
clicks: 2
---

# 串、并联电路中的电压

<div class="page-grow">
<div class="ask">串联电路两端的总电压与各部分电压是什么关系？并联电路呢？</div>

<div v-click="1" class="stack">
<div>串联电路中，用 <Latex tex="\varphi_0" />、<Latex tex="\varphi_1" />、<Latex tex="\varphi_2" />、<Latex tex="\varphi_3" /> 表示各点电势：</div>
<Latex tex="U_{01} = \varphi_0 - \varphi_1,\ U_{12} = \varphi_1 - \varphi_2,\ U_{23} = \varphi_2 - \varphi_3" display />
<div>三式相加，中间电势全部抵消：</div>
<Latex tex="U_{01} + U_{12} + U_{23} = \varphi_0 - \varphi_3 = U_{03}" display />
</div>

<div v-click="2" class="stack">
<div><b>串联电路两端的总电压等于各部分电路两端电压之和。</b></div>
<div>并联电路中，各支路两端都接在同一对节点之间，电势差相同——<b>并联电路的总电压与各支路电压相等</b>：<Latex tex="U = U_1 = U_2" />。</div>
</div>
</div>

---
clicks: 3
---

# 串联电路的电阻

<div class="page-grow">
<div class="ask">两个电阻串联后的等效电阻 <Latex tex="R" />，与 <Latex tex="R_1" />、<Latex tex="R_2" /> 是什么关系？</div>

<div v-click="1" class="stack">
<div>串联电流相同，由 <Latex tex="U = U_1 + U_2" />，等式两边同除以电流 <Latex tex="I" />：</div>
<Latex tex="\frac{U}{I} = \frac{U_1}{I} + \frac{U_2}{I}" display />
<Latex tex="R = R_1 + R_2" display />
</div>

<div v-click="2">
n 个电阻串联：<Latex tex="R = R_1 + R_2 + \dots + R_n" />——<b>串联电路的总电阻等于各部分电路电阻之和</b>。
</div>

<div v-click="3" class="tip-hint">电阻一个接一个地"排队"，电流要通过的路更长：串联总电阻比其中<b>任何一个</b>都大。</div>
</div>

---
clicks: 3
---

# 并联电路的电阻

<div class="page-grow">
<div class="ask">两个电阻并联后的等效电阻 <Latex tex="R" />，与 <Latex tex="R_1" />、<Latex tex="R_2" /> 是什么关系？</div>

<div v-click="1" class="stack">
<div>并联电压相同，由 <Latex tex="I = I_1 + I_2" />，等式两边同除以电压 <Latex tex="U" />：</div>
<Latex tex="\frac{I}{U} = \frac{I_1}{U} + \frac{I_2}{U}" display />
<Latex tex="\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}" display />
</div>

<div v-click="2">
n 个电阻并联：<Latex tex="\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} + \dots + \frac{1}{R_n}" />——<b>并联电路总电阻的倒数等于各支路电阻的倒数之和</b>。
</div>

<div v-click="3" class="tip-hint">并联相当于给电流多开了几条路：并联总电阻比其中<b>任何一个</b>支路电阻都小。</div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="ask">两个电阻并联后的总电阻，一定比其中任何一个都小吗？</div>

<div class="half-grid">
<div>
<SeriesParallelLab />
</div>
<div class="stack">
<div>把 <Latex tex="R_1" />、<Latex tex="R_2" /> 在 <Latex tex="1\ \Omega" /> 到 <Latex tex="20\ \Omega" /> 之间任意组合，两条结论始终成立：</div>
<div class="mini-note">串联：总电阻等于两电阻之和；并联：总电阻等于两电阻之积除以两电阻之和。</div>
</div>
</div>

<div v-click="1" class="tip-hint">串联相当于增加了导体的长度，总电阻增大；并联相当于增加了导体的横截面积，总电阻减小——与 <Latex tex="R = \rho \dfrac{l}{S}" /> 的判断一致。</div>
</div>

---
clicks: 2
---

# 电表的改装：电压表

<div class="page-grow">
<div class="ask">表头的满偏电压只有零点几伏，怎样用它测出几伏、几十伏的电压？</div>

<div v-click="1">
<DefinitionBox term="表头" tone="blue">
表头从电路角度看就是一个电阻，同样遵从欧姆定律：内阻 <Latex tex="R_g" />，指针偏到最大刻度时的电流——满偏电流 <Latex tex="I_g" />，对应的电压——满偏电压 <Latex tex="U_g = I_g R_g" />。
</DefinitionBox>
</div>

<div v-click="2" class="half-grid">
<div class="figure">
<VoltmeterModSvg />
</div>
<div class="stack">
<div>串联一个电阻 <Latex tex="R" />，让它替表头分担大部分电压：</div>
<Latex tex="U = I_g(R_g + R) \Rightarrow R = \frac{U}{I_g} - R_g" display />
<div>串联电阻叫<b>分压电阻</b>——电压表就是一个"电压可读的大电阻"。</div>
</div>
</div>
</div>

---
clicks: 2
---

# 电表的改装：电流表

<div class="page-grow">
<div class="ask">表头只能通过毫安级的电流，怎样用它测出几安的电流？</div>

<div class="half-grid">
<div class="figure">
<AmmeterModSvg />
</div>
<div class="stack">
<div v-click="1">并联一个电阻 <Latex tex="R" />，让大部分电流从它那里"抄近道"：</div>
<Latex v-click="1" tex="I = I_g + \frac{I_g R_g}{R} \Rightarrow R = \frac{I_g R_g}{I - I_g}" display />
<div v-click="2">并联电阻叫<b>分流电阻</b>——电流表就是一个"电流可读的小电阻"，改装后的内阻 <Latex tex="R_A = \dfrac{R_g R}{R_g + R}" /> 很小。</div>
</div>
</div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="ask">给定一个表头，要改装成指定量程的电表，分压（分流）电阻该取多大？</div>

<MeterConvertLab />

<div v-click="1" class="tip-hint">表头参数和量程一旦确定，电阻值就被公式唯一确定：量程越大，串联的<b>分压电阻越大</b>、并联的<b>分流电阻越小</b>。</div>
</div>

---
layout: exercise-split
clicks: 3
---

<template v-slot:stem>

一个表头的内阻 <Latex tex="R_g" /> 为 <Latex tex="30\ \Omega" />，满偏电流 <Latex tex="I_g" /> 为 <Latex tex="1\ \text{mA}" />。要把它改装为量程 <Latex tex="0 \sim 0.6\ \text{A}" /> 的电流表，需要并联多大的电阻？改装后电流表的内阻是多少？

</template>

电流表由表头和电阻 <Latex tex="R" /> 并联组成。量程 <Latex tex="0 \sim 0.6\ \text{A}" /> 是指通过电流表的电流为 <Latex tex="0.6\ \text{A}" /> 时，表头的指针恰好指在最大刻度，即通过表头的电流等于 <Latex tex="I_g" />。

<div v-click="1">
通过电阻 <Latex tex="R" /> 的电流：
<Latex tex="I_R = I - I_g = 0.6\ \text{A} - 1 \times 10^{-3}\ \text{A} = 0.599\ \text{A}" />
</div>

<div v-click="2">
并联电路电压相同，由欧姆定律得分流电阻：
<Latex tex="R = \frac{I_g R_g}{I_R} = \frac{1 \times 10^{-3} \times 30}{0.599}\ \Omega \approx 5 \times 10^{-2}\ \Omega" />
</div>

<div v-click="3">
改装后电流表的内阻是 <Latex tex="R_g" /> 与 <Latex tex="R" /> 的并联值：
<Latex tex="R_A = \frac{R_g R}{R_g + R} \approx 5 \times 10^{-2}\ \Omega" />
</div>

---
layout: exercise-split
clicks: 3
---

<template v-slot:stem>

有两个量程的电压表如图：使用 A、B 两个端点时，量程为 <Latex tex="0 \sim 10\ \text{V}" />；使用 A、C 两个端点时，量程为 <Latex tex="0 \sim 100\ \text{V}" />。已知表头内阻 <Latex tex="R_g" /> 为 <Latex tex="500\ \Omega" />，满偏电流 <Latex tex="I_g" /> 为 <Latex tex="1\ \text{mA}" />，求电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 的值。

</template>

<template v-slot:fig>

<TwoRangeVMeterSvg />

</template>

使用 A、B 两个端点时，表头与 <Latex tex="R_1" /> 串联，指针满偏时总电压为 <Latex tex="10\ \text{V}" />。

<div v-click="1">
<Latex tex="I_g (R_g + R_1) = 10\ \text{V} \Rightarrow R_1 = \frac{10}{1 \times 10^{-3}}\ \Omega - 500\ \Omega = 9500\ \Omega" display />
</div>

使用 A、C 两个端点时，<Latex tex="R_1" />、<Latex tex="R_2" /> 都串联在表头上，满偏总电压为 <Latex tex="100\ \text{V}" />。

<div v-click="2">
<Latex tex="R_g + R_1 + R_2 = \frac{100}{1 \times 10^{-3}}\ \Omega = 1 \times 10^{5}\ \Omega \Rightarrow R_2 = 9.0 \times 10^{4}\ \Omega" display />
</div>

<div v-click="3" class="tip-hint">同一个表头配不同的串联电阻，就得到不同的量程：量程越大，串联进去的电阻越大。</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">这节课的规律，可以分成哪三组？</div>

<div class="stack">
<div v-click="1"><b>电流</b>：串联电路中电流处处相等；并联电路的总电流等于各支路电流之和。</div>
<div v-click="2"><b>电压与电阻</b>：串联 <Latex tex="U = U_1 + U_2" />、<Latex tex="R = R_1 + R_2" />；并联 <Latex tex="U = U_1 = U_2" />、<Latex tex="\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2}" />。</div>
<div v-click="3"><b>电表改装</b>：表头串联<b>分压电阻</b>改装成电压表，并联<b>分流电阻</b>改装成电流表；电阻值由 <Latex tex="U_g = I_g R_g" /> 和量程唯一确定。</div>
</div>
</div>
