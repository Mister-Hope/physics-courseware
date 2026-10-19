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
title: 两个电阻看成一个电阻
---

<div class="page-grow">
<div class="ask ask-lead">如果把两个电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 串联或并联后看成一个电阻，你认为这个电阻跟 <Latex tex="R_1" />、<Latex tex="R_2" /> 应该是怎样的关系？</div>

<div v-click="1">
把两个电阻组成的整体看成一个<b>等效电阻</b> <Latex tex="R" />：用它取代原来的两个电阻后，电路中的电流和两端的电压完全相同。下面从电流、电压、电阻三方面找关系。
</div>
</div>

---
clicks: 2
title: 串、并联电路中的电流
---

# 串、并联电路中的电流

<div class="page-grow page-grow-tight">
<div class="ask">串联时电流有什么规律？并联时干路与支路的电流又是什么关系？</div>

<div>恒定电流电路中各处电荷的分布是稳定的：任何位置的电荷都不可能越来越多或越来越少。</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<SeriesCircuitSvg :step="$clicks" />
<div v-click="1" class="stack-tight">
<div>所以相同时间内通过 0、1、2、3 各点的电荷量必然相等：</div>
<Latex tex="I_0 = I_1 = I_2 = I_3" display />
<div><b>串联电路中的电流处处相等。</b></div>
</div>
</div>
<div class="stack" style="min-width: 0">
<ParallelCircuitSvg :step="$clicks - 1" />
<div v-click="2" class="stack-tight">
<div>流过干路 0 点的电荷量，必须等于进入各支路 1、2、3 各点的电荷量之和：</div>
<Latex tex="I = I_1 + I_2 + I_3" display />
<div><b>并联电路的总电流等于各支路电流之和。</b></div>
</div>
</div>
</div>
</div>

---
clicks: 2
title: 串联电路的电压
---

# 串联电路的电压

<div class="page-grow">
<div class="ask">串联电路两端的总电压，与各部分电路两端的电压是什么关系？</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<SeriesCircuitSvg mode="voltage" :step="$clicks" />
</div>
<div class="stack" style="min-width: 0">
<div v-click="1"><Latex tex="U_{01} = \varphi_0 - \varphi_1" />，<Latex tex="U_{12} = \varphi_1 - \varphi_2" />，<Latex tex="U_{23} = \varphi_2 - \varphi_3" />——各段电压就是它两端点的电势差。</div>
<div v-click="2">三式相加，中间的电势全部抵消：</div>
<Latex v-click="2" tex="U_{01} + U_{12} + U_{23} = \varphi_0 - \varphi_3 = U_{03}" display />
<div v-click="2"><b>串联电路两端的总电压等于各部分电路两端电压之和。</b></div>
</div>
</div>
</div>

---
clicks: 1
title: 并联电路的电压
---

# 并联电路的电压

<div class="page-grow">
<div class="ask">并联电路中，总电压与各支路电压是什么关系？</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<ParallelCircuitSvg mode="voltage" :step="$clicks" />
</div>
<div class="stack" style="min-width: 0">
<div v-click="1">不考虑导线的电阻，0、1、2、3 各点之间没有电势差，各电阻右侧的电势也相同——各支路两端都接在同一对节点之间，电势差相同：</div>
<Latex v-click="1" tex="U = U_1 = U_2 = U_3" display />
<div v-click="1"><b>并联电路的总电压与各支路电压相等。</b></div>
</div>
</div>
</div>

---
clicks: 3
title: 串联电路的电阻
---

# 串联电路的电阻

<div class="page-grow">
<div class="ask">两个电阻串联后的等效电阻 <Latex tex="R" />，与 <Latex tex="R_1" />、<Latex tex="R_2" /> 是什么关系？</div>

<div v-click="1" class="stack">
<div>串联时通过两个电阻的电流相同，由 <Latex tex="U = U_1 + U_2" />，两边同除以电流 <Latex tex="I" />：</div>
<Latex tex="\frac{U}{I} = \frac{U_1}{I} + \frac{U_2}{I} \quad\Longrightarrow\quad R = R_1 + R_2" display />
</div>

<div v-click="2">
n 个电阻串联：<Latex tex="R = R_1 + R_2 + \dots + R_n" />——<b>串联电路的总电阻等于各部分电路电阻之和</b>。
</div>

<div v-click="3" class="tip-hint">串联电路的总电阻大于其中任何一个电阻。</div>
</div>

---
clicks: 3
title: 并联电路的电阻
---

# 并联电路的电阻

<div class="page-grow">
<div class="ask">两个电阻并联后的等效电阻 <Latex tex="R" />，与 <Latex tex="R_1" />、<Latex tex="R_2" /> 是什么关系？</div>

<div v-click="1" class="stack">
<div>并联时两个电阻上的电压相同，由 <Latex tex="I = I_1 + I_2" />，两边同除以电压 <Latex tex="U" />：</div>
<Latex tex="\frac{I}{U} = \frac{I_1}{U} + \frac{I_2}{U} \quad\Longrightarrow\quad \frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}" display />
</div>

<div v-click="2">
n 个电阻并联：<Latex tex="\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} + \dots + \frac{1}{R_n}" />——<b>并联电路总电阻的倒数等于各支路电阻的倒数之和</b>。
</div>

<div v-click="3" class="tip-hint">两个电阻并联，通分后也常写成 <Latex tex="R = \dfrac{R_1 R_2}{R_1 + R_2}" />；并联总电阻小于其中任何一个支路电阻。</div>
</div>

---
clicks: 1
title: 等效电阻实验台
---

<div class="page-grow">
<div class="ask">两个电阻并联后的总电阻，一定比其中任何一个都小吗？</div>

<SeriesParallelLab />

<div v-click="1" class="tip-hint">串联相当于导体变长、并联相当于横截面积变大，与 <Latex tex="R = \rho \dfrac{l}{S}" /> 一致：串联总电阻增大，并联总电阻减小。</div>
</div>

---
clicks: 1
title: 串联分压与并联分流
---

<div class="page-grow">
<div class="ask">串联时电压按什么比例分？并联时电流按什么比例分？</div>

<DividerLab />

<div v-click="1" class="tip-hint">串联分压与电阻成<b>正比</b>：<Latex tex="U_1 : U_2 = R_1 : R_2" />；并联分流与电阻成<b>反比</b>：<Latex tex="I_1 : I_2 = R_2 : R_1" />。</div>
</div>

---
clicks: 3
title: 串并联规律小结
---

<div class="page-grow">
<div class="ask">串、并联电路的电流、电压、电阻，各有一条什么规律？</div>

<div class="stack summary-line">
<div v-click="1"><b>电流</b>：串联电路中电流处处相等；并联电路的总电流等于各支路电流之和。</div>
<div v-click="2"><b>电压</b>：串联电路两端的总电压等于各部分电压之和；并联电路的总电压与各支路电压相等。</div>
<div v-click="3"><b>电阻</b>：串联 <Latex tex="R = R_1 + R_2" />；并联 <Latex tex="\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2}" />。串联分压与电阻成正比，并联分流与电阻成反比。</div>
</div>
</div>

---
clicks: 1
title: 表头
---

<div class="page-grow">
<div class="ask">表头从电路角度看是什么？电压表和电流表为什么都用它来改装？</div>

<div v-click="1">
<DefinitionBox term="表头" tone="gold">
<div>常用的电压表和电流表都是由小量程的电流表（表头）改装而成的。从电路的角度看，表头就是一个电阻，同样遵从欧姆定律，它与其他电阻的不同在于：通过表头的电流可以从刻度盘上读出来。</div>
<div>表头的电阻 <Latex tex="R_g" /> 叫作电流表的内阻；指针偏转到最大刻度时的电流 <Latex tex="I_g" /> 叫作满偏电流；表头通过满偏电流时加在它两端的电压 <Latex tex="U_g" /> 叫作满偏电压，由欧姆定律 <Latex tex="U_g = I_g R_g" />。</div>
<div>表头的满偏电压 <Latex tex="U_g" /> 和满偏电流 <Latex tex="I_g" /> 一般都比较小。</div>
</DefinitionBox>
</div>
</div>

---
clicks: 3
title: 电表的改装：电压表
---

# 电表的改装：电压表

<div class="page-grow">
<div class="ask">表头的满偏电压只有零点几伏，怎样用它测出几伏、几十伏的电压？</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<VoltmeterModSvg :show-share="$clicks >= 2" />
<div v-click="1">测量较大的电压时，串联一个电阻 <Latex tex="R" />，让它分担一部分电压。</div>
</div>
<div class="stack" style="min-width: 0">
<div v-click="2">表头满偏时，串联电阻分到的是其余那部分电压：</div>
<Latex v-click="2" tex="U = I_g(R_g + R) \Rightarrow R = \frac{U}{I_g} - R_g" display />
<div v-click="3">串联的这个电阻叫<b>分压电阻</b>；改装后电压表的内阻 <Latex tex="R_V = R_g + R = \dfrac{U}{I_g}" />——电压表就是一个"电压可读的大电阻"。</div>
</div>
</div>
</div>

---
clicks: 3
title: 电表的改装：电流表
---

# 电表的改装：电流表

<div class="page-grow">
<div class="ask">表头只能通过毫安级的电流，怎样用它测出几安的电流？</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<AmmeterModSvg :show-share="$clicks >= 2" />
<div v-click="1">测量较大的电流时，并联一个电阻 <Latex tex="R" />，让大部分电流从它那里分走。</div>
</div>
<div class="stack" style="min-width: 0">
<div v-click="2">表头满偏时通过表头的电流是 <Latex tex="I_g" />，并联电阻分走 <Latex tex="I - I_g" />，两者的电压相同：</div>
<Latex v-click="2" tex="I_g R_g = (I - I_g)R \Rightarrow R = \frac{I_g R_g}{I - I_g}" display />
<div v-click="3">并联的这个电阻叫<b>分流电阻</b>；改装后电流表的内阻 <Latex tex="R_A = \dfrac{R_g R}{R_g + R}" /> 很小——电流表就是一个"电流可读的小电阻"。</div>
</div>
</div>
</div>

---
clicks: 1
title: 电表改装计算台
---

<div class="page-grow page-grow-tight">
<div class="ask">给定一个表头，要改装成指定量程的电表，分压（分流）电阻该取多大？</div>

<MeterConvertLab />

<div v-click="1" class="tip-hint">表头参数和量程一旦确定，电阻值就被公式唯一确定：量程越大，串联的分压电阻越大、并联的分流电阻越小。</div>
</div>

---
layout: exercise-split
clicks: 3
title: 例题　把表头改装成电流表
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　一个表头的内阻 <Latex tex="R_g" /> 为 <Latex tex="30\ \Omega" />，满偏电流 <Latex tex="I_g" /> 为 <Latex tex="1\ \text{mA}" />。要把它改装为量程 <Latex tex="0 \sim 0.6\ \text{A}" /> 的电流表，需要并联多大的电阻？改装后电流表的内阻是多少？
<div class="fig-placeholder" style="min-height: 0; padding: 0.5rem">电流表改装电路图（待替换）</div>
</div>

</template>

<div>量程 <Latex tex="0 \sim 0.6\ \text{A}" /> 是指通过电流表的电流为 <Latex tex="0.6\ \text{A}" /> 时，表头恰好满偏。</div>

<div v-click="1">通过并联电阻的电流 <Latex tex="I_R = I - I_g = 0.6\ \text{A} - 1 \times 10^{-3}\ \text{A} = 0.599\ \text{A}" />。</div>

<div v-click="2">并联电压相同，由欧姆定律得分流电阻 <Latex tex="R = \dfrac{I_g R_g}{I_R} = \dfrac{1 \times 10^{-3} \times 30}{0.599}\ \Omega \approx 5 \times 10^{-2}\ \Omega" />。</div>

<div v-click="3">改装后电流表的内阻 <Latex tex="R_A = \dfrac{R_g R}{R_g + R} \approx 5 \times 10^{-2}\ \Omega" />。</div>

---
layout: exercise-split
clicks: 3
title: 练习　有两个量程的电压表
---

<template v-slot:stem>

<div><b class="ex-no">练习</b>　有两个量程的电压表如图。使用 A、B 两个端点时，量程为 <Latex tex="0 \sim 10\ \text{V}" />；使用 A、C 两个端点时，量程为 <Latex tex="0 \sim 100\ \text{V}" />。已知表头的内阻 <Latex tex="R_g" /> 为 <Latex tex="500\ \Omega" />，满偏电流 <Latex tex="I_g" /> 为 <Latex tex="1\ \text{mA}" />，求电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 的值。
<div class="fig-placeholder" style="min-height: 0; padding: 0.5rem">双量程电压表电路图（待替换）</div>
</div>

</template>

<div v-click="1">使用 A、B 时，表头与 <Latex tex="R_1" /> 串联：<Latex tex="R_1 = \dfrac{10\ \text{V}}{I_g} - R_g = 9500\ \Omega" />。</div>

<div v-click="2">使用 A、C 时两者都串联：<Latex tex="R_2 = \dfrac{100\ \text{V}}{I_g} - R_g - R_1 = 9.0 \times 10^{4}\ \Omega" />。</div>

<div v-click="3" class="tip-hint">同一个表头配不同的电阻，量程就不同。</div>

---
layout: exercise-split
clicks: 3
title: 练习　有两个量程的电流表
---

<template v-slot:stem>

<div><b class="ex-no">练习</b>　有两个量程的电流表如图。使用 A、B 两个端点时，量程为 <Latex tex="0 \sim 1\ \text{A}" />；使用 A、C 两个端点时，量程为 <Latex tex="0 \sim 0.1\ \text{A}" />。已知表头的内阻 <Latex tex="R_g" /> 为 <Latex tex="200\ \Omega" />，满偏电流 <Latex tex="I_g" /> 为 <Latex tex="2\ \text{mA}" />，求电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 的值。
<div class="fig-placeholder" style="min-height: 0; padding: 0.5rem">双量程电流表电路图（待替换）</div>
</div>

</template>

<div v-click="1">使用 A、B 时，表头与 <Latex tex="R_2" /> 串联后被 <Latex tex="R_1" /> 分流：<Latex tex="I_g(R_g + R_2) = (I_1 - I_g)R_1" />。</div>

<div v-click="2">使用 A、C 时，表头被 <Latex tex="R_1 + R_2" /> 分流：<Latex tex="R_1 + R_2 = \dfrac{I_g R_g}{I_2 - I_g} \approx 4.08\ \Omega" />。</div>

<div v-click="3">由这两式解得 <Latex tex="R_2 \approx 3.67\ \Omega" />、<Latex tex="R_1 \approx 0.41\ \Omega" />。</div>

---
clicks: 3
title: 电表的改装小结
---

<div class="page-grow">
<div class="ask">同一个表头，怎样改装成量程不同的电压表和电流表？</div>

<div class="stack summary-line">
<div v-click="1"><b>电压表</b>：串联一个分压电阻 <Latex tex="R = \dfrac{U}{I_g} - R_g" />，改装后内阻 <Latex tex="R_V = R_g + R" /> 很大。</div>
<div v-click="2"><b>电流表</b>：并联一个分流电阻 <Latex tex="R = \dfrac{I_g R_g}{I - I_g}" />，改装后内阻 <Latex tex="R_A = \dfrac{R_g R}{R_g + R}" /> 很小。</div>
<div v-click="3" class="tip-hint">作业：教材第十一章第 4 节「练习与应用」第 4、5 题。</div>
</div>
</div>
