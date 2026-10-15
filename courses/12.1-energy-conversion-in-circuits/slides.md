---
theme: default
title: "电路中的能量转化"
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
chapter-no: "12.1"
chapter: "第十二章 电能 能量守恒定律"
subtitle: "电功与电功率 · 焦耳定律 · 电路中的能量转化"
---

<CoverDecorationSvg />

---
layout: base-flex
---

<div class="page-grow">

<div class="ask ask-lead">这些用电器工作时，电能分别转化成了什么能？</div>

<div v-click="1" class="grid grid-cols-4 gap-3">

<div class="card text-center">
  <mdi-kettle class="text-accent text-4xl" />
  <div class="font-semibold text-lg mt-2">电热水壶</div>
  <div class="text-sm opacity-70 mt-1">电能 → 内能</div>
</div>

<div class="card text-center">
  <mdi-fan class="text-accent-2 text-4xl" />
  <div class="font-semibold text-lg mt-2">电风扇</div>
  <div class="text-sm opacity-70 mt-1">电能 → 机械能</div>
</div>

<div class="card text-center">
  <mdi-cellphone-charging class="text-accent text-4xl" />
  <div class="font-semibold text-lg mt-2">给手机充电</div>
  <div class="text-sm opacity-70 mt-1">电能 → 化学能</div>
</div>

<div class="card text-center">
  <mdi-lightbulb-on-outline class="text-accent-2 text-4xl" />
  <div class="font-semibold text-lg mt-2">电灯</div>
  <div class="text-sm opacity-70 mt-1">电能 → 内能 + 光能</div>
</div>

</div>

<div v-click="2" class="key key-lead">
  电能转化为其他形式的能，都是通过<strong>电流做功</strong>来实现的。
</div>

</div>

---
layout: base-flex
---

# 电功与电功率

<div class="page-grow">

<div class="ask">电流做功的多少、做功的快慢，分别用什么描述？</div>

<div class="half-grid">

<div v-click="1" class="stack">
  <div class="mini-title"><mdi-flash class="text-3xl" /> 电功</div>
  <div class="text-2xl"><Latex tex="W = UIt" /></div>
  <div class="mini-note">电流在一段电路中所做的功。单位：焦耳（<Latex tex="\text{J}" />）；生活中常用“度”，<Latex tex="1\ \text{kW·h} = 3.6 \times 10^6\ \text{J}" />。</div>
</div>

<div v-click="2" class="stack divider-l">
  <div class="mini-title"><mdi-clock-outline class="text-3xl" /> 电功率</div>
  <div class="text-2xl"><Latex tex="P = \dfrac{W}{t} = UI" /></div>
  <div class="mini-note">电流做功的快慢。单位：瓦特（<Latex tex="\text{W}" />）。</div>
</div>

</div>

<div v-click="3" class="key">
  电功 <Latex tex="W = UIt" />、电功率 <Latex tex="P = UI" /> 都是初中已学的结论——这节课要把它们<strong>从能量的角度</strong>重新讲清楚。
</div>

</div>

---
layout: base-flex
---

# 电流做功的实质

<div class="page-grow">

<div class="ask">电流通过导体时，究竟是谁在做功？</div>

<div class="half-grid">

<div v-click="1" class="figure">
  <WorkConductionSvg />
</div>

<div class="stack">

<div v-click="2"><Latex tex="q = It" /> —— 时间 <Latex tex="t" /> 内通过导体任一截面的电荷量</div>

<div v-click="3"><Latex tex="W = Uq = UIt" /> —— 静电力做功，电荷的电势能减少、其他形式的能增加</div>

<div v-click="4"><Latex tex="P = \dfrac{W}{t} = UI" /> —— 电流做功的功率</div>

</div>

</div>

<div v-click="5" class="key">
  电流做功的实质：导体中的恒定电场对自由电荷的<strong>静电力</strong>在做功；<Latex tex="P = UI" /> 的推导没有限制电路性质，对一切电路成立。
</div>

</div>

---
layout: base-flex
---

# 串联电路的功率分配

<div class="page-grow">

<div class="ask">两个电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 串联，它们消耗的功率与电阻是什么关系？</div>

<div class="half-grid">

<div v-click="1" class="figure">
  <SeriesPowerSvg />
</div>

<div class="stack">

<div v-click="2">串联电路各电阻<strong>电流相同</strong>：<Latex tex="I_1 = I_2 = I" />，因此 <Latex tex="P_1 = I^2R_1" />、<Latex tex="P_2 = I^2R_2" />。</div>

<div v-click="3"><Latex tex="\dfrac{P_1}{P_2} = \dfrac{I^2R_1}{I^2R_2} = \dfrac{R_1}{R_2}" /></div>

<div v-click="3" class="text-xl"><Latex tex="P_1 : P_2 = R_1 : R_2" /></div>

</div>

</div>

<div v-click="4" class="key">
  串联电路中，电阻越大分得的功率越多：功率与电阻<strong>成正比</strong>。
</div>

</div>

---
layout: base-flex
---

# 并联电路的功率分配

<div class="page-grow">

<div class="ask">两个电阻 <Latex tex="R_1" />、<Latex tex="R_2" /> 并联，它们消耗的功率与电阻又是什么关系？</div>

<div class="half-grid">

<div v-click="1" class="figure">
  <ParallelPowerSvg />
</div>

<div class="stack">

<div v-click="2">并联电路各电阻<strong>电压相同</strong>：<Latex tex="U_1 = U_2 = U" />，因此 <Latex tex="P_1 = \dfrac{U^2}{R_1}" />、<Latex tex="P_2 = \dfrac{U^2}{R_2}" />。</div>

<div v-click="3"><Latex tex="\dfrac{P_1}{P_2} = \dfrac{U^2/R_1}{U^2/R_2} = \dfrac{R_2}{R_1}" /></div>

<div v-click="3" class="text-xl"><Latex tex="P_1 : P_2 = R_2 : R_1" /></div>

</div>

</div>

<div v-click="4" class="key">
  并联电路中，电阻越大分得的功率越少：功率与电阻<strong>成反比</strong>。
</div>

</div>

---
layout: base-flex
---

# 串、并联电路的总功率

<div class="page-grow">

<div class="ask">电源提供的总功率，与各用电器的功率是什么关系？</div>

<div v-click="1" class="stack-tight">
  <div class="mini-title"><mdi-vector-line class="text-3xl" /> 串联</div>
  <div class="text-xl"><Latex tex="P = P_1 + P_2 = I^2R_1 + I^2R_2 = I^2(R_1 + R_2)" /></div>
</div>

<div v-click="2" class="stack-tight">
  <div class="mini-title"><mdi-call-split class="text-3xl" /> 并联</div>
  <div class="text-xl"><Latex tex="P = P_1 + P_2 = \dfrac{U^2}{R_1} + \dfrac{U^2}{R_2}" /></div>
</div>

<div v-click="3" class="key key-lead">
  无论串联还是并联，电路的总功率都等于各用电器功率之和——这正是<strong>能量守恒</strong>的体现。
</div>

</div>

---
layout: base-flex
---

# 焦耳定律与热功率

<div class="page-grow">

<div class="ask">电流通过电热水器中的电热元件时，电能全部转化成了什么能？</div>

<div v-click="1">电能全部转化为内能：<Latex tex="Q = W = UIt" /></div>

<div v-click="2">由欧姆定律 <Latex tex="U = IR" /> 得 <Latex tex="Q = I^2Rt" /> —— 这就是<strong>焦耳定律</strong>。</div>

<div v-click="3">热功率（发热的快慢）：<Latex tex="P_{\text{热}} = \dfrac{Q}{t} = I^2R" /></div>

<div v-click="4" class="key">
  电流通过导体产生的热量跟电流的二次方成正比，跟导体的电阻、通电时间成正比。
</div>

</div>

---
layout: base-flex
---

# 纯电阻电路 与 非纯电阻电路

<div class="page-grow">

<div class="ask">所有用电器都满足 <Latex tex="W = Q" /> 吗？</div>

<div class="stack-tight">

<div class="cmp-row cmp-head">
  <div>比较项目</div>
  <div><mdi-resistor class="icon-md" /> 纯电阻电路</div>
  <div><mdi-engine-outline class="icon-md" /> 非纯电阻电路</div>
</div>

<div v-click="1" class="cmp-row">
  <div class="cmp-item">典型用电器</div>
  <div>电炉、白炽灯、电烙铁</div>
  <div>电动机、电解槽</div>
</div>

<div v-click="1" class="cmp-row">
  <div class="cmp-item">能量转化</div>
  <div>电能全部转化为内能：<Latex tex="W = Q" /></div>
  <div>电能除转化为内能外，还转化为机械能、化学能等：<Latex tex="W = Q + E_{\text{其他}}" /></div>
</div>

<div v-click="2" class="cmp-row">
  <div class="cmp-item">电功与电热</div>
  <div><Latex tex="W = Q" />，即 <Latex tex="UIt = I^2Rt = \dfrac{U^2}{R}t" /></div>
  <div><Latex tex="W = Q + E_{\text{其他}}" />，即 <Latex tex="UIt = I^2Rt + E_{\text{其他}}" /></div>
</div>

<div v-click="2" class="cmp-row">
  <div class="cmp-item">电功率与热功率</div>
  <div><Latex tex="P = P_{\text{热}}" />，即 <Latex tex="UI = I^2R = \dfrac{U^2}{R}" /></div>
  <div><Latex tex="P = P_{\text{热}} + P_{\text{其他}}" />，即 <Latex tex="UI = I^2R + P_{\text{其他}}" /></div>
</div>

<div v-click="2" class="cmp-row">
  <div class="cmp-item">欧姆定律</div>
  <div>成立：<Latex tex="U = IR" />（<Latex tex="I = \dfrac{U}{R}" />）</div>
  <div>不成立：<Latex tex="U > IR" />（<Latex tex="I < \dfrac{U}{R}" />）</div>
</div>

</div>

<div v-click="3" class="key">
  判断依据：电能是否<strong>全部</strong>转化为内能——只有全部转化为内能时，<Latex tex="U = IR" /> 与 <Latex tex="\dfrac{U^2}{R}" /> 才成立。
</div>

</div>

---
layout: base-flex
---

# 电动机：电能去哪了？

<div class="page-grow page-grow-tight">

<div class="ask">电动机消耗的电功率，全部变成了机械功率吗？</div>

<div v-click="1"><MotorPower /></div>

<div v-click="2" class="key">
  输入功率 <Latex tex="P_{\text{入}} = UI" />，热损耗 <Latex tex="P_{\text{热}} = I^2R" />，输出功率 <Latex tex="P_{\text{出}} = P_{\text{入}} - P_{\text{热}} = UI - I^2R" />。
</div>

</div>

---
layout: base-flex
---

# 例题：电动机的功率

<div class="page-grow">

<div class="half-grid fig-square">

<div>
  一台电动机，线圈的电阻是 <Latex tex="6\ \Omega" />，当它两端所加的电压为 <Latex tex="220\ \text{V}" /> 时，通过的电流是 <Latex tex="5\ \text{A}" />。这台电动机发热的功率与对外做功的功率各是多少？
</div>

<div class="figure">
  <MotorSchematicSvg />
</div>

</div>

<div class="stack-tight">

<div v-click="1">电动机是<strong>非纯电阻电路</strong>：只能用 <Latex tex="P = UI" /> 和 <Latex tex="P_{\text{热}} = I^2R" /> 求功率，不能用 <Latex tex="\dfrac{U^2}{R}" />。</div>

<div v-click="2"><Latex tex="P_{\text{热}} = I^2R = 5^2 \times 6\ \text{W} = 150\ \text{W}" /></div>

<div v-click="3"><Latex tex="P_{\text{电}} = UI = 220 \times 5\ \text{W} = 1100\ \text{W}" /></div>

<div v-click="4"><Latex tex="P_{\text{机}} = P_{\text{电}} - P_{\text{热}} = 1100\ \text{W} - 150\ \text{W} = 950\ \text{W}" /></div>

</div>

<div v-click="5" class="key">
  这台电动机发热的功率为 <Latex tex="150\ \text{W}" />，对外做功的功率为 <Latex tex="950\ \text{W}" />。
</div>

</div>

---
layout: base-flex
---

# 例题：先测内阻，再算输出功率与效率

<div class="page-grow">

<div class="half-grid fig-square">

<div>
  一小型电动机，加 <Latex tex="0.2\ \text{V}" /> 电压时不转，电流 <Latex tex="0.4\ \text{A}" />；加 <Latex tex="2.0\ \text{V}" /> 电压时正常转动，电流 <Latex tex="1.0\ \text{A}" />。求线圈电阻及转动时的输入功率、发热功率、输出功率与效率。
</div>

<div class="figure">
  <MotorSchematicSvg />
</div>

</div>

<div class="stack-tight">

<div v-click="1">不转时不对外做功，相当于纯电阻：<Latex tex="R = \dfrac{U_1}{I_1} = \dfrac{0.2}{0.4}\ \Omega = 0.5\ \Omega" /></div>

<div v-click="2">转动时输入功率：<Latex tex="P_{\text{入}} = U_2I_2 = 2.0 \times 1.0\ \text{W} = 2.0\ \text{W}" /></div>

<div v-click="3">发热功率：<Latex tex="P_{\text{热}} = I_2^2R = 1.0^2 \times 0.5\ \text{W} = 0.5\ \text{W}" /></div>

<div v-click="4">输出功率：<Latex tex="P_{\text{出}} = P_{\text{入}} - P_{\text{热}} = 1.5\ \text{W}" />，效率 <Latex tex="\eta = \dfrac{P_{\text{出}}}{P_{\text{入}}} = 75\%" /></div>

</div>

<div v-click="5" class="key">
  线圈电阻 <Latex tex="0.5\ \Omega" />；转动时输入 <Latex tex="2.0\ \text{W}" />、发热 <Latex tex="0.5\ \text{W}" />、输出 <Latex tex="1.5\ \text{W}" />，效率 <Latex tex="75\%" />。
</div>

</div>

---
layout: base-flex
---

# 电池里存了多少能量？

<div class="page-grow">

<div class="ask">充电宝铭牌上的「<Latex tex="10\,000\ \text{mAh}" />、<Latex tex="3.7\ \text{V}" />」——它储存了多少能量？</div>

<div v-click="1">
  电池把其他形式的能转化为电能，做的功 <Latex tex="W = EQ" />，其中 <Latex tex="Q = It" /> 是放电的电荷量。
</div>

<div v-click="2"><PowerBank /></div>

<div v-click="3" class="key">
  毫安时（<Latex tex="\text{mAh}" />）是电荷量、不是能量；<strong>电容量 <Latex tex="\times" /> 电动势 = 储存的能量</strong>（<Latex tex="\text{Wh}" />）。
</div>

</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">

<div class="summary-line" v-click="1"><span class="text-accent font-bold">电功与电功率</span>：<Latex tex="W = UIt" />，<Latex tex="P = UI" />（对一切电路成立）</div>

<div class="summary-line" v-click="2"><span class="text-accent font-bold">串、并联的功率分配</span>：串联 <Latex tex="P_1 : P_2 = R_1 : R_2" />（成正比）；并联 <Latex tex="P_1 : P_2 = R_2 : R_1" />（成反比）；总功率等于各用电器功率之和</div>

<div class="summary-line" v-click="3"><span class="text-accent font-bold">焦耳定律与热功率</span>：<Latex tex="Q = I^2Rt" />，<Latex tex="P_{\text{热}} = I^2R" /></div>

<div class="summary-line" v-click="4"><span class="text-accent font-bold">纯电阻与非纯电阻</span>：纯电阻 <Latex tex="W = Q" />；电动机 <Latex tex="P_{\text{入}} = UI" />、<Latex tex="P_{\text{出}} = UI - I^2R" />、效率 <Latex tex="\eta = \dfrac{P_{\text{出}}}{P_{\text{入}}}" /></div>

<div class="summary-line" v-click="5"><span class="text-accent font-bold">电池的能量</span>：<Latex tex="W = EQ" />；充电宝「<Latex tex="\text{mAh}" /> <Latex tex="\times" /> <Latex tex="\text{V}" />」得到 <Latex tex="\text{Wh}" /></div>

<div v-click="6" class="key key-lead">
  一条主线：电能与其他形式的能之间的转化，处处服从<strong>能量守恒</strong>。
</div>

</div>

---
layout: base-flex
---

# 课后作业

<div class="page-grow">

<div class="stack">

<div class="mini-title"><mdi-book-open-variant class="text-3xl" /> 教材 12.1 练习与应用</div>

<div>
  <strong>第 2 题</strong>（电饭锅）：<Latex tex="R_1" /> 是电阻，<Latex tex="R_2" /> 是加热用的电阻丝。判断自动开关 <Latex tex="\text{S}" /> 接通、断开时电饭锅分别处于哪种状态；若保温功率是加热功率的一半，求 <Latex tex="R_1 : R_2" />。
</div>

<div>
  <strong>第 3 题</strong>（四个定值电阻）：<Latex tex="R_A" />、<Latex tex="R_C" /> 规格为「<Latex tex="10\ \text{V}\ 4\ \text{W}" />」，<Latex tex="R_B" />、<Latex tex="R_D" /> 规格为「<Latex tex="10\ \text{V}\ 2\ \text{W}" />」，按消耗功率大小的顺序排列这四个电阻，并说明理由。
</div>

</div>

</div>
