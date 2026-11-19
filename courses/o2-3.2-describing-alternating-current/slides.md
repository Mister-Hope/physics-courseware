---
theme: default
title: "交变电流的描述"
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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "3.2"
chapter: "第三章 交变电流"
subtitle: "周期、频率与有效值"
---

<CoverDecor />

---
layout: base-flex
clicks: 2
---

# 周期与频率

<div class="page-grow page-grow-tight">
<div class="ask">交流电重复一次需要多长时间？1 s 内重复多少次？</div>
<div class="def-row" v-click="1">
<DefinitionBox term="周期" tone="gold"><div>交变电流完成一次<span class="def-term">周期性变化</span>所需的时间，用 <Latex tex="T" /> 表示，单位是 <Latex tex="\text{s}" />。</div></DefinitionBox>
<DefinitionBox term="频率" tone="blue"><div>交变电流在 <Latex tex="1\ \text{s}" /> 内完成周期性变化的次数，用 <Latex tex="f" /> 表示，单位是 <Latex tex="\text{Hz}" />。</div></DefinitionBox>
</div>
<div class="summary-line" v-click="2"><Latex tex="f=\frac{1}{T}" />，<Latex tex="\omega=2\pi f=\frac{2\pi}{T}" />。</div>
<div class="figure" style="width: 66%; margin-inline: auto"><PeriodGraph :cycles="1" /></div>
</div>

---
layout: base-flex
clicks: 4
---

# 周期、频率与角速度

<div class="page-grow page-around">
<div class="ask">我国电网的频率是 <Latex tex="50\ \text{Hz}" />。它的周期是多少？1 s 内电流方向变化几次？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div><Latex tex="T=\frac{1}{f}=\frac{1}{50}\ \text{s}=0.02\ \text{s}" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>角速度 <Latex tex="\omega=2\pi f=100\pi\ \text{rad/s}" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div><Latex tex="1\ \text{s}" /> 内有 <Latex tex="50" /> 个周期；每个周期电流方向变化 <Latex tex="2" /> 次，所以共变化 <Latex tex="100" /> 次。</div></div>
</div>
<div class="tip-hint" v-click="4">频率越高，周期越短，电流变化越快；角速度描述的是线圈转动的快慢。</div>
</div>

---
layout: base-flex
title: "从波形图读 T 和峰值"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">从这条 <Latex tex="u\text{-}t" /> 图线，能直接读出哪些量？</div>
<div class="figure" style="width: 92%; margin-inline: auto"><WaveReadGraph /></div>
<div class="tip-hint" v-click="1">能直接读出周期 <Latex tex="T" /> 和峰值 <Latex tex="U_m" />；有效值不能直接读，要按热效应计算。</div>
</div>

---
layout: base-flex
title: "交流的“大小”怎样表示"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">交流的电流时刻在变，用哪个值表示它的大小？</div>
<div class="split-wide">
<div class="figure"><AcSizeGraph /></div>
<div class="stack">
<div class="mini-title">平均值？</div>
<div>一个周期内正、负半周的面积相等，平均电流为 <Latex tex="0" />，不能表示大小。</div>
<div class="mini-title">峰值？</div>
<div>峰值只出现在一瞬间，不能表示持续的发热效果。</div>
</div>
</div>
<div class="tip-hint" v-click="1">需要一个与它在相同电阻上产生相同热量的恒定电流值。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 有效值的定义

<div class="page-grow page-around">
<div class="ask">怎样用一个恒定电流“等效”这段交流？</div>
<div v-click="1"><DefinitionBox term="有效值" tone="gold"><div>让交变电流与恒定电流分别通过<span class="def-term">相同电阻</span>，在一个周期内产生<span class="def-term">相同热量</span>，该恒定电流的数值就是交变电流的有效值；同理定义电压的有效值。</div></DefinitionBox></div>
<div class="step-list">
<div class="step-item" v-click="2"><span class="step-no">1</span><div>相同的电阻 <Latex tex="R" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">2</span><div>相同的一个周期 <Latex tex="T" />。</div></div>
<div class="step-item" v-click="4"><span class="step-no">3</span><div>产生相同的热量 <Latex tex="Q" />，即 <Latex tex="I^2RT=Q" />。</div></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 为什么用热效应定义有效值

<div class="page-grow page-around">
<div class="ask">为什么不用平均值或峰值来定义？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>交流在一个周期内的平均电流为 <Latex tex="0" />，平均值不能表示电流的大小。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>电流通过电阻时，发热与电流方向无关，一个周期内的总热量可以累加、可以测量。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>用产生相同热量的恒定电流来等效，这个恒定电流的值就是有效值。</div></div>
</div>
<div class="tip-hint" v-click="4">有效值反映的是一个周期内的平均发热效果，不是某一时刻的瞬时值。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 方波电流的有效值

<div class="page-grow page-around">
<div class="ask">前半个周期 <Latex tex="4\ \text{A}" />、后半个周期 <Latex tex="-2\ \text{A}" />，有效值是多少？</div>
<div class="split-wide">
<div class="figure"><SquareWaveCurrent /></div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>设周期为 <Latex tex="T" />、电阻为 <Latex tex="R" />。一个周期产生的热量：<br><Latex tex="Q=4^2R\cdot\frac{T}{2}+(-2)^2R\cdot\frac{T}{2}=10RT" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>等效恒定电流 <Latex tex="I" /> 满足 <Latex tex="I^2RT=Q" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div><Latex tex="I^2=10" />，所以 <Latex tex="I=\sqrt{10}\approx3.2\ \text{A}" />。</div></div>
</div>
</div>
<div class="mini-note">电流反向不影响 <Latex tex="I^2R" /> 的发热。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 正弦式交流的有效值（一）

<div class="page-grow page-around">
<div class="ask">正弦式电流的发热功率时刻在变，怎样求一个周期的平均功率？</div>
<div class="split-wide">
<div class="figure"><SineSquaredGraph /></div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>设 <Latex tex="i=I_m\sin\omega t" />，瞬时功率 <Latex tex="P=i^2R=I_m^2R\sin^2\omega t" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>图线在 <Latex tex="\frac{1}{2}" /> 上下的面积相等，<br>所以 <Latex tex="\sin^2\omega t" /> 在一个周期内的平均值是 <Latex tex="\frac{1}{2}" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>平均功率 <Latex tex="\bar P=\frac{I_m^2R}{2}" />；<br>令 <Latex tex="I^2R=\bar P" />，得 <Latex tex="I=\frac{I_m}{\sqrt 2}" />。</div></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 正弦式交流的有效值（二）

<div class="page-grow page-grow-tight">
<div class="ask">还可以构造两个电流，把“平均值”变成“总和”。</div>
<div class="figure" style="width: 48%; margin-inline: auto"><SinePairGraph /></div>
<div class="step-list" style="font-size: 0.9rem">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>设 <Latex tex="i_1=I_m\sin\omega t" />、<Latex tex="i_2=I_m\cos\omega t" />，两者相位差 <Latex tex="\frac{T}{4}" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><Latex tex="i_1^2+i_2^2=I_m^2" />，所以 <Latex tex="P_1+P_2=(i_1^2+i_2^2)R=I_m^2R" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>设两个电流的有效值分别为 <Latex tex="I_1" />、<Latex tex="I_2" />；按定义 <Latex tex="P_1=I_1^2R" />、<Latex tex="P_2=I_2^2R" />。两电流波形相同，只是相差 <Latex tex="\frac{T}{4}" />，所以 <Latex tex="I_1=I_2=I" />。</div></div>
<div class="step-item" v-click="4"><span class="step-no">4</span><div><Latex tex="2I^2R=I_m^2R" />，所以 <Latex tex="I=\frac{I_m}{\sqrt 2}" />；同理 <Latex tex="U=\frac{U_m}{\sqrt 2}" />。这两个关系只适用于正弦式交流。</div></div>
</div>
</div>

---
layout: base-flex
title: "有效值还是峰值（一）"
clicks: 1
---

<div class="page-grow page-around">
<div class="ask ask-lead"><Latex tex="220\ \text{V}" /> 是有效值还是峰值？</div>
<div class="split-wide">
<div class="stack">
<div class="mini-title">电网与用电器</div>
<div class="summary-line"><Latex tex="220\ \text{V}" /> 是有效值，峰值约 <Latex tex="311\ \text{V}" />。</div>
<div class="mini-note">电表读数、用电器的额定电压和额定电流，都按有效值标。</div>
</div>
<div class="divider-l stack">
<div class="mini-title">为什么用有效值</div>
<div>用电器按长期发热和平均功率设计；有效值直接对应一个周期的平均功率，便于计算和选型。</div>
</div>
</div>
<div class="tip-hint" v-click="1">看到“<Latex tex="220\ \text{V}" />”“<Latex tex="40\ \text{W}" />”这类铭牌数据，先按有效值理解。</div>
</div>

---
layout: base-flex
title: "有效值还是峰值（二）"
clicks: 4
---

<div class="page-grow page-around">
<div class="ask ask-lead">电容器、保险丝、滑动变阻器，各要看哪个值？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>电容器耐压：看<span class="def-term">峰值</span>。电压超过耐压值，介质会被击穿。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>保险丝的额定电流：看<span class="def-term">有效值</span>。发热按一个周期累积，超过额定电流会熔断。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>滑动变阻器的安全电流：看<span class="def-term">有效值</span>。超过安全电流会过热损坏。</div></div>
<div class="step-item" v-click="4"><span class="step-no">4</span><div>例：耐压 <Latex tex="10\ \text{V}" /> 的电容接 <Latex tex="9\ \text{V}" /> 正弦交流，峰值约 <Latex tex="12.7\ \text{V}" />，会击穿。</div></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 电感对交流的阻碍

<div class="page-grow page-around">
<div class="ask">电感为什么“通直流、阻交流”？</div>
<div class="split-wide">
<div class="figure"><ImpedanceGraph mode="inductor" /></div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>电流变化时，电感产生自感电动势，阻碍电流变化。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>频率越高，电流变化越快，阻碍越强，所以“通低频、阻高频”。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>直流电流不变化，感抗为零，所以“通直流”。</div></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 电容对交流的阻碍

<div class="page-grow page-around">
<div class="ask">电容为什么“通交流、隔直流”？</div>
<div class="split-wide">
<div class="figure"><ImpedanceGraph mode="capacitor" /></div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>电容两端电压变化时，电容器交替充放电，回路中有电流。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>频率越高，充放电越快，电流越大，所以“通高频、阻低频”。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>直流电压不变，充电完成后没有电流，所以“隔直流”。</div></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 电感与电容

<div class="page-grow page-around">
<div class="ask">它们在电路中的作用有什么不同？</div>
<div class="half-grid">
<div class="stack">
<div class="mini-title">电感</div>
<div class="summary-line">通直流，阻交流。</div>
<div class="summary-line">通低频，阻高频。</div>
<div class="mini-note">扼流圈、滤波。</div>
</div>
<div class="divider-l stack">
<div class="mini-title">电容</div>
<div class="summary-line">通交流，隔直流。</div>
<div class="summary-line">通高频，阻低频。</div>
<div class="mini-note">隔直电容、高频旁路。</div>
</div>
</div>
<div class="tip-hint" v-click="1">看“变化”：电感阻碍电流变化，电容靠电压变化充放电。</div>
</div>

---
layout: exercise-split
title: "例题"
clicks: 3
---

<template v-slot:stem>
<div class="ask"><Latex tex="50\ \Omega" /> 的电热器接在 <Latex tex="u=311\sin(100\pi t)\ \text{V}" /> 的交流电源上，求电功率。</div>
</template>

<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>峰值 <Latex tex="U_m=311\ \text{V}" />，有效值 <Latex tex="U=\frac{U_m}{\sqrt 2}\approx220\ \text{V}" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><Latex tex="P=\frac{U^2}{R}=\frac{220^2}{50}=968\ \text{W}" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>功率、热量都用有效值；不能用峰值直接算。</div></div>
</div>

---
layout: base-flex
---

# 小结

<div class="half-grid">
<div class="stack">
<div class="mini-title">周期与频率</div>
<div class="summary-line"><Latex tex="f=\frac{1}{T}" />，<Latex tex="\omega=2\pi f" />。</div>
<div class="summary-line">我国电网 <Latex tex="f=50\ \text{Hz}" />，<Latex tex="T=0.02\ \text{s}" />，<Latex tex="1\ \text{s}" /> 内方向变化 100 次。</div>
</div>
<div class="divider-l stack">
<div class="mini-title">有效值与峰值</div>
<div class="summary-line">有效值按一个周期的热效应定义。</div>
<div class="summary-line">正弦式：<Latex tex="I=\frac{I_m}{\sqrt 2}" />，<Latex tex="U=\frac{U_m}{\sqrt 2}" />。</div>
<div class="summary-line"><Latex tex="220\ \text{V}" /> 是有效值，峰值约 <Latex tex="311\ \text{V}" />；耐压看峰值。</div>
</div>
</div>
<div class="tip-hint">电感：通直流、阻交流，通低频、阻高频；电容：通交流、隔直流，通高频、阻低频。</div>
