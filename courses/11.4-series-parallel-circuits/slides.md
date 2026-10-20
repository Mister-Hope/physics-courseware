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
clicks: 4
title: 等效电阻与分压分流
---

<div class="page-grow page-grow-tight">
<div class="ask">串、并联之后总电阻怎么变？电压和电流又按什么比例分给各个电阻？</div>

<div v-click="1" class="stack-tight">
<div>通过相同的电流时，串联电路两端的总电压比其中任何一个电阻两端的电压都大，所以总电阻比其中任何一个都大；两端加上相同的电压时，并联电路的干路电流比任何一条支路的电流都大，所以总电阻比其中任何一个都小。</div>
<div><b>越串越大，越并越小。</b></div>
</div>

<div v-click="2">其中任何一个电阻增大（或减小），总电阻也随之增大（或减小）。</div>

<div v-click="3">大电阻与小电阻串联，总电阻接近<b>大电阻</b>；大电阻与小电阻并联，总电阻接近<b>小电阻</b>。</div>

<div v-click="4" class="tip-hint">串联分压与电阻成<b>正比</b>：<Latex tex="U_1 : U_2 = R_1 : R_2" />；并联分流与电阻成<b>反比</b>：<Latex tex="I_1 : I_2 = R_2 : R_1" />。</div>
</div>

---
clicks: 2
title: 串并联电路中电流电压的规律
---

# 串并联电路中电流电压的规律

<div class="page-grow">
<div class="ask">串、并联电路的电流和电压，各有一条什么规律？</div>

<div class="stack summary-line">
<div v-click="1"><b>电流</b>：串联电路中电流处处相等；并联电路的总电流等于各支路电流之和。</div>
<div v-click="2"><b>电压</b>：串联电路两端的总电压等于各部分电压之和；并联电路的总电压与各支路电压相等。</div>
</div>
</div>

---
clicks: 2
title: 表头
---

<div class="page-grow">
<div class="ask">电压表和电流表，为什么都要用一个小量程的表头来改装？</div>

<div v-click="1">表头是一个<b>灵敏电流表</b>：它有一个固定的内阻 <Latex tex="R_g" />，指针偏转的角度与流过它的电流成正比——所以从刻度盘上就能直接读出通过表头的电流。</div>

<div v-click="2">
<DefinitionBox term="表头的两个关键参数" tone="gold">
<div>满偏电流 <Latex tex="I_g" />：指针指到最大刻度时流过表头的电流；表头内阻 <Latex tex="R_g" />。</div>
<div>表头满偏时它两端的电压叫满偏电压，由欧姆定律 <Latex tex="U_g = I_g R_g" />。</div>
<div><Latex tex="I_g" /> 和 <Latex tex="U_g" /> 一般都比较小，所以表头能直接测量的电流、电压都很小。</div>
</DefinitionBox>
</div>
</div>

---
clicks: 3
title: 电表的改装：电压表
---

# 电表的改装：电压表

<div class="page-grow">
<div class="ask">表头只能测 <Latex tex="U_g" /> 这么小的电压，要把它的量程扩大到 <Latex tex="N" /> 倍，怎么办？</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<VoltmeterModSvg :show-share="$clicks >= 2" />
<div v-click="1">串联一个电阻 <Latex tex="R" />，让它分担其余那部分电压。</div>
</div>
<div class="stack" style="min-width: 0">
<div v-click="2">量程扩大 <Latex tex="N" /> 倍，就是满偏时总电压 <Latex tex="U = N U_g" />；而 <Latex tex="U = I_g(R_g + R)" />，把 <Latex tex="U_g = I_g R_g" /> 代进去：</div>
<Latex v-click="2" tex="I_g(R_g + R) = N I_g R_g \Rightarrow R = (N - 1)R_g" display />
<div v-click="3">这个串联电阻叫<b>分压电阻</b>；改装后电压表的内阻 <Latex tex="R_V = R_g + R = N R_g" />，是表头的 <Latex tex="N" /> 倍——电压表就是一个"电压可读的大电阻"。</div>
</div>
</div>
</div>

---
clicks: 3
title: 电表的改装：电流表
---

# 电表的改装：电流表

<div class="page-grow">
<div class="ask">表头只能通过 <Latex tex="I_g" /> 这么小的电流，要把它的量程扩大到 <Latex tex="N" /> 倍，怎么办？</div>

<div class="half-grid">
<div class="stack" style="min-width: 0">
<AmmeterModSvg :show-share="$clicks >= 2" />
<div v-click="1">并联一个电阻 <Latex tex="R" />，让它分走其余那部分电流。</div>
</div>
<div class="stack" style="min-width: 0">
<div v-click="2">量程扩大 <Latex tex="N" /> 倍，就是满偏时干路电流 <Latex tex="I = N I_g" />；分流电阻里流过 <Latex tex="(N - 1)I_g" />，两者的电压相同：</div>
<Latex v-click="2" tex="I_g R_g = (N - 1)I_g R \Rightarrow R = \frac{R_g}{N - 1}" display />
<div v-click="3">这个并联电阻叫<b>分流电阻</b>；改装后电流表的内阻 <Latex tex="R_A = \frac{R_g R}{R_g + R} = \frac{R_g}{N}" />，是表头的 <Latex tex="1/N" />——电流表就是一个"电流可读的小电阻"。</div>
</div>
</div>
</div>

---
layout: exercise-split
clicks: 3
title: 例题　有两个量程的电压表
hideQaMark: true
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　如图所示是有两个量程的电压表。使用 a、b 两个端点时，量程为 <Latex tex="0 \sim 3\ \text{V}" />；使用 a、c 两个端点时，量程为 <Latex tex="0 \sim 15\ \text{V}" />。已知表头的内阻 <Latex tex="R_g" /> 为 <Latex tex="100\ \Omega" />，满偏电流 <Latex tex="I_g" /> 为 <Latex tex="1\ \text{mA}" />，求电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 的阻值。</div>

</template>

<template v-slot:fig>

<TwoRangeVMeterSvg />

</template>

<div v-click="1">a、b 挡（<Latex tex="3\ \text{V}" />）：表头与 <Latex tex="R_1" /> 串联，<Latex tex="R_1 = \dfrac{3\ \text{V}}{I_g} - R_g = 2900\ \Omega" />。</div>

<div v-click="2">a、c 挡（<Latex tex="15\ \text{V}" />）：再串入 <Latex tex="R_2" />，<Latex tex="R_2 = \dfrac{15\ \text{V}}{I_g} - R_g - R_1 = 1.2 \times 10^{4}\ \Omega" />。</div>

<div v-click="3" class="tip-hint">两种量程共用同一个表头：量程越大，串联进去的电阻越大。</div>

---
layout: exercise-split
clicks: 2
title: 例题　有两个量程的电流表
hideQaMark: true
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　实验室常用的双量程电流表（<Latex tex="0 \sim 0.6\ \text{A}" /> 量程和 <Latex tex="0 \sim 3\ \text{A}" /> 量程）的内部构造如图所示。已知表头的内阻 <Latex tex="R_g" /> 为 <Latex tex="200\ \Omega" />，满偏电流 <Latex tex="I_g" /> 为 <Latex tex="100\ \text{mA}" />，则电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 分别为（　　）</div>
<div class="stack-tight">
<div><Latex tex="\text{A．}" /><Latex tex="R_1 = 10\ \Omega" />，<Latex tex="R_2 = 50\ \Omega" />　　<Latex tex="\text{B．}" /><Latex tex="R_1 = 8\ \Omega" />，<Latex tex="R_2 = 32\ \Omega" /></div>
<div><Latex tex="\text{C．}" /><Latex tex="R_1 = 50\ \Omega" />，<Latex tex="R_2 = 8\ \Omega" />　　<Latex tex="\text{D．}" /><Latex tex="R_1 = 32\ \Omega" />，<Latex tex="R_2 = 10\ \Omega" /></div>
</div>

</template>

<template v-slot:fig>

<TwoRangeAMeterSvg />

</template>

<div v-click="1">A、C 挡（<Latex tex="0.6\ \text{A}" />）表头被 <Latex tex="R_1 + R_2" /> 分流：<Latex tex="I_g R_g = (0.6 - I_g)(R_1 + R_2)" />，得 <Latex tex="R_1 + R_2 = 40\ \Omega" />；A、B 挡（<Latex tex="3\ \text{A}" />）表头与 <Latex tex="R_2" /> 串联后又被 <Latex tex="R_1" /> 分流：<Latex tex="I_g(R_g + R_2) = (3 - I_g)R_1" />。</div>

<div v-click="2" class="tip-hint">联立解得 <Latex tex="R_1 = 8\ \Omega" />、<Latex tex="R_2 = 32\ \Omega" />，选 <b>B</b>。</div>

---
clicks: 4
title: 复杂电路的简化
---

# 复杂电路的简化

<div class="page-grow page-grow-tight">
<div class="ask">遇到"奇形怪状"的电路，怎么把它画成串并联一眼能看出来的等效电路？</div>
<div v-click="1" style="display: flex; align-items: center; gap: 0.9rem">
<div style="flex: 1; min-width: 0"><b>① 无电流的支路可以去除。</b>两端由导线直接相连的那条支路，没有电流。</div>
<div style="width: 250px; flex: none"><SimplifySketchSvg variant="branch" /></div>
</div>
<div v-click="2" style="display: flex; align-items: center; gap: 0.9rem">
<div style="flex: 1; min-width: 0"><b>② 等电势点可以合并。</b>用导线直接连起来的点是同一个点。</div>
<div style="width: 250px; flex: none"><SimplifySketchSvg variant="node" /></div>
</div>
<div v-click="3" style="display: flex; align-items: center; gap: 0.9rem">
<div style="flex: 1; min-width: 0"><b>③ 理想电压表可看成断路，理想电流表可看成短路。</b></div>
<div style="width: 250px; flex: none"><SimplifySketchSvg variant="meter" /></div>
</div>
<div v-click="4" style="display: flex; align-items: center; gap: 0.9rem">
<div style="flex: 1; min-width: 0"><b>④ 电容器充电瞬间可视为短路，充电完毕（稳定时）可视为断路。</b></div>
<div style="width: 250px; flex: none"><SimplifySketchSvg variant="cap" /></div>
</div>
</div>

---
clicks: 3
title: 示例　画等效电路（一）
---

# 示例：画等效电路

<div class="page-grow">
<div class="ask">A、E 之间的这段电路，等效成怎样的串并联关系？</div>

<div style="max-width: 580px; margin: 0 auto">
<EquivMorphSvg variant="v1" :step="$clicks" />
</div>

<div v-click="3" class="tip-hint"><Latex tex="R_1" /> 与 <Latex tex="R_2" /> 并联后串一个电流表（它测的是 <Latex tex="I_1 + I_2" />），再与 <Latex tex="R_3" /> 并联，最后串 <Latex tex="R_4" />。</div>
</div>

---
clicks: 3
title: 例题　画等效电路（二）
---

# 例题：画等效电路

<div class="page-grow">
<div class="ask">画出图示电路的等效电路。</div>

<div style="max-width: 580px; margin: 0 auto">
<EquivMorphSvg variant="v2" :step="$clicks" />
</div>

<div v-click="3" class="tip-hint"><Latex tex="R_1" /> 与 <Latex tex="L_1" /> 并联、<Latex tex="R_2" /> 与 <Latex tex="R_3" /> 并联；后一组再与 <Latex tex="R_4" /> 串联，最后整体与 <Latex tex="L_2" /> 并联。</div>
</div>
