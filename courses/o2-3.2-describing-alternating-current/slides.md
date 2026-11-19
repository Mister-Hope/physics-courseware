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

<div class="ask">交流电重复一次需要多长时间？</div>
<div class="def-row" v-click="1">
<DefinitionBox term="周期" tone="gold"><div>交变电流完成一次<span class="def-term">周期性变化</span>所需的时间，用 <Latex tex="T" /> 表示，单位是 <Latex tex="\text{s}" />。</div></DefinitionBox>
<DefinitionBox term="频率" tone="blue"><div>交变电流在 <Latex tex="1\ \text{s}" /> 内完成周期性变化的次数，用 <Latex tex="f" /> 表示，单位是 <Latex tex="\text{Hz}" />。</div></DefinitionBox>
</div>
<div class="tip-hint" v-click="2">我国电网 <Latex tex="f=50\ \text{Hz}" />，所以 <Latex tex="T=0.02\ \text{s}" />；每周期电流方向变化 2 次，<Latex tex="1\ \text{s}" /> 内变化 100 次。</div>
<div class="summary-line"><Latex tex="f=\frac{1}{T}" />，<Latex tex="\omega=2\pi f=\frac{2\pi}{T}" />。</div>

---
layout: base-flex
title: "从波形图上读什么"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">从这条 <Latex tex="u\text{-}t" /> 图线，能直接读出哪些量？</div>
<WaveReadGraph />
<div class="tip-hint" v-click="1">能直接读出周期 <Latex tex="T" /> 和峰值 <Latex tex="U_m" />；有效值不能直接读，要用热效应计算。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 有效值

<div class="ask">前半个周期 <Latex tex="4\ \text{A}" />、后半个周期 <Latex tex="-2\ \text{A}" />，有效值是多少？</div>
<div class="split-wide">
<div><SquareWaveCurrent /></div>
<div class="stack">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>设周期为 <Latex tex="T" />，电阻为 <Latex tex="R" />。一个周期产生的热量：<br><Latex tex="Q=4^2R\cdot\frac{T}{2}+(-2)^2R\cdot\frac{T}{2}" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>等效恒定电流 <Latex tex="I" /> 满足 <Latex tex="I^2RT=Q" />，所以 <Latex tex="I^2=\frac{16+4}{2}=10" />，<Latex tex="I=\sqrt{10}\approx3.2\ \text{A}" />。</div></div>
<div class="mini-note">电流反向不影响 <Latex tex="I^2R" /> 的发热。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 有效值的定义

<div class="ask">为什么用热效应来定义有效值？</div>
<div class="def-row" v-click="1">
<DefinitionBox term="有效值" tone="gold"><div>让交变电流与恒定电流分别通过<span class="def-term">相同电阻</span>，在一个周期内产生<span class="def-term">相同热量</span>，该恒定电流的数值就是交变电流的有效值；同理定义电压的有效值。</div></DefinitionBox>
</div>
<div class="summary-line"><Latex tex="I^2RT=Q" />，其中 <Latex tex="Q" /> 是交流在一个周期内产生的热量。</div>
<div class="tip-hint" v-click="2">电流做功发热与方向无关，所以可以用恒定电流“等效”交流，不必逐时刻比较瞬时值；热量仍由各时刻 <Latex tex="i^2R" /> 累积。</div>

---
layout: base-flex
clicks: 4
---

# 正弦式的有效值

<div class="ask">正弦式交流的有效值和峰值是什么关系？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>设 <Latex tex="i=I_m\sin\omega t" />，发热功率 <Latex tex="P=I_m^2R\sin^2\omega t" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><Latex tex="\sin^2\omega t" /> 与 <Latex tex="\cos^2\omega t" /> 之和恒为 1，<Latex tex="\cos^2\omega t" /> 是 <Latex tex="\sin^2\omega t" /> 平移 <Latex tex="\frac{T}{4}" />，二者在一个周期内的平均值相同，所以 <Latex tex="\sin^2\omega t" /> 的平均值是 <Latex tex="\frac{1}{2}" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>平均功率 <Latex tex="\bar P=\frac{I_m^2R}{2}" />；令 <Latex tex="I^2R=\bar P" />，得 <Latex tex="I=\frac{I_m}{\sqrt 2}" />；同理 <Latex tex="U=\frac{U_m}{\sqrt 2}" />。</div></div>
</div>
<div class="tip-hint" v-click="4">这两个关系只适用于正弦式交流；非正弦式必须回到热效应定义去算。</div>

---
layout: base-flex
title: "有效值还是峰值"
clicks: 2
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead"><Latex tex="220\ \text{V}" /> 是有效值还是峰值？</div>
<div class="tip-hint" v-click="1"><Latex tex="220\ \text{V}" /> 是有效值，峰值约 <Latex tex="311\ \text{V}" />。</div>
<div class="step-list" v-click="2">
<div class="step-item"><span class="step-no">1</span><div>电网电压、用电器额定值、交流电表读数：用有效值。</div></div>
<div class="step-item"><span class="step-no">2</span><div>电容器耐压：看峰值，耐压必须高于峰值。</div></div>
<div class="step-item"><span class="step-no">3</span><div>保险丝、滑动变阻器的额定电流：用有效值，按发热判断。</div></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 电感与电容

<div class="ask">电感和电容对交流电有什么阻碍作用？</div>
<div class="half-grid">
<div class="stack">
<div class="mini-title">电感</div>
<div class="summary-line">通直流，阻交流。</div>
<div class="summary-line">通低频，阻高频。</div>
<div class="mini-note">自感电动势阻碍电流变化。</div>
</div>
<div class="divider-l stack">
<div class="mini-title">电容</div>
<div class="summary-line">通交流，隔直流。</div>
<div class="summary-line">通高频，阻低频。</div>
<div class="mini-note">电容器交替充放电，让交流“通过”。</div>
</div>
</div>
<div class="tip-hint" v-click="1">电感“通直流、阻交流，通低频、阻高频”；电容“通交流、隔直流，通高频、阻低频”。</div>

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
