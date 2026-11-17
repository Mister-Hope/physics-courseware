---
theme: default
title: "交变电流"
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
chapter-no: "3.1·3.2"
chapter: "第三章 交变电流"
subtitle: "3.1 交变电流 · 3.2 交变电流的描述"
---

<CoverDecor />

---
layout: base-flex
title: 两种波形
clicks: 1
---

<div class="page-grow page-grow-tight">

<div class="ask ask-lead">甲、乙是两种电源的电压波形。哪一条是电池的？</div>

<WaveCompare />

<div class="tip-hint" v-click="1">甲平直、方向不变，是电池的直流；乙的大小和方向都按正弦规律周期变化，是交变电流。</div>

</div>

---
layout: base-flex
title: 交变电流与直流
clicks: 2
---

# 交变电流与直流

<div class="page-grow">

<div class="ask">大小变化、方向不变的电流，是交变电流吗？</div>

<div class="def-row" v-click="1">

<DefinitionBox term="交变电流" tone="gold">
<div>大小和方向都随时间做<span class="def-term">周期性变化</span>的电流。</div>
</DefinitionBox>

<DefinitionBox term="直流" tone="blue">
<div>方向不随时间变化，大小<span class="def-term">可以变化</span>。</div>
</DefinitionBox>

</div>

<div class="tip-hint" v-click="2">判断是不是交变电流，看方向是否变化，不看大小是否变化。</div>

</div>

---
layout: base-flex
title: 发电机
clicks: 1
---

<div class="page-grow page-grow-tight">

<div class="ask">线圈在磁场中匀速转动，为什么能产生电流？</div>

<div class="figure"><GeneratorSvg /></div>

<div class="tip-hint" v-click="1">穿过线圈的磁通量不断变化，产生感应电动势和感应电流。</div>

</div>

---
layout: base-flex
title: 电流为零的位置
clicks: 2
---

<div class="page-grow page-grow-tight">

<div class="ask">线圈转到哪些位置时电流为零？哪些位置电流最大？</div>

<div class="figure"><CoilPositionsSvg :step="$clicks" /></div>

<div class="tip-hint" v-click="2">线圈平面与磁感线垂直（中性面）时，<Latex tex="\Phi" /> 最大、<Latex tex="e=0" />；线圈平面与磁感线平行时，<Latex tex="\Phi=0" />、<Latex tex="e" /> 最大。</div>

</div>

---
layout: base-flex
title: 磁通量与电动势
clicks: 1
---

<div class="page-grow page-grow-tight">

<div class="ask">磁通量最大时，感应电动势也最大吗？</div>

<FluxEmfGraph />

<div class="tip-hint" v-click="1"><Latex tex="e" /> 由 <Latex tex="\Phi" /> 的变化率决定：中性面处 <Latex tex="\Phi" /> 最大，但变化率为零，所以 <Latex tex="e=0" />。</div>

</div>

---
layout: base-flex
title: 正弦式交变电流
clicks: 4
---

# 正弦式交变电流

<div class="page-grow">

<div class="ask">从中性面开始计时，感应电动势随时间怎样变化？</div>

<div class="step-list">

<div class="step-item" v-click="1">
<div class="step-no">1</div>
<div><Latex tex="t=0" /> 时线圈处于中性面，<Latex tex="\theta=\omega t" />。设 <Latex tex="AB=l" />、<Latex tex="AD=d" />，则 <Latex tex="v=\frac{\omega d}{2}" />。<br>分速度 <Latex tex="v_\perp=v\sin\theta" />。</div>
</div>

<div class="step-item" v-click="2">
<div class="step-no">2</div>
<div>两条边串联：<Latex tex="e=2Blv\sin\theta=2Bl\cdot\frac{\omega d}{2}\sin\theta=\omega BS\sin\omega t" />。</div>
</div>

<div class="step-item" v-click="3">
<div class="step-no">3</div>
<div><Latex tex="N" /> 匝线圈：<Latex tex="E_m=N\omega BS" />，<Latex tex="e=E_m\sin\omega t" />。</div>
</div>

</div>

<div class="tip-hint" v-click="4">在纯电阻电路中，<Latex tex="u=U_m\sin\omega t" />，<Latex tex="i=I_m\sin\omega t" />。</div>

</div>

---
layout: base-flex
title: 周期与频率
clicks: 1
---

# 周期与频率

<div class="page-grow">

<div class="split-wide">

<div class="stack">

<DefinitionBox term="周期" tone="gold">
<div>交变电流完成一次<span class="def-term">周期性变化</span>所需的时间，<br>单位 <Latex tex="\text{s}" />。</div>
</DefinitionBox>

<DefinitionBox term="频率" tone="blue">
<div>交变电流在 <Latex tex="1\ \text{s}" /> 内完成周期性变化的<span class="def-term">次数</span>，<br>单位 <Latex tex="\text{Hz}" />。</div>
</DefinitionBox>

</div>

<div class="divider-l stack">

<div><Latex tex="f=\frac{1}{T}" />，<Latex tex="\omega=2\pi f=\frac{2\pi}{T}" />。</div>

<div class="ask">我国电网 <Latex tex="f=50\ \text{Hz}" />，<br><Latex tex="T" /> 是多少？<br><Latex tex="1\ \text{s}" /> 内方向变化几次？</div>

<div class="tip-hint" v-click="1"><Latex tex="T=0.02\ \text{s}" />；<br>每周期方向变化 <Latex tex="2" /> 次，<br><Latex tex="1\ \text{s}" /> 内变化 <Latex tex="100" /> 次。</div>

</div>

</div>

</div>

---
layout: base-flex
title: 峰值与有效值
clicks: 2
---

# 峰值与有效值

<div class="page-grow">

<div class="ask">交流电的电压时刻在变，怎样描述它的大小？</div>

<div class="def-row" v-click="1">

<DefinitionBox term="峰值" tone="blue">
<div>交变电流在一个周期内所能达到的<span class="def-term">最大数值</span>。</div>
</DefinitionBox>

<DefinitionBox term="有效值" tone="gold">
<div>让交变电流与恒定电流分别通过相同电阻，在一个周期内产生<span class="def-term">相同热量</span>，该恒定电流的数值就是有效值。</div>
</DefinitionBox>

</div>

<div class="half-grid" v-click="2" style="align-items: start">

<div class="important-hint">正弦式：<Latex tex="I=\frac{I_m}{\sqrt{2}}" />，<Latex tex="U=\frac{U_m}{\sqrt{2}}" />。</div>

<div class="warn-hint">只适用于正弦式交变电流。</div>

</div>

</div>

---
layout: base-flex
title: 有效值与电容器
clicks: 3
---

<div class="page-grow">

<div class="half-grid">

<div class="stack">

<div class="ask">我国电网 <Latex tex="220\ \text{V}" /> 是峰值还是有效值？</div>

<div class="info-hint" v-click="1"><Latex tex="f=50\ \text{Hz}" />，<Latex tex="T=0.02\ \text{s}" />。<br><Latex tex="\omega=100\pi\ \text{rad/s}" />。</div>

<div class="tip-hint" v-click="2"><Latex tex="220\ \text{V}" /> 是有效值，<br>峰值 <Latex tex="220\sqrt{2}\approx311\ \text{V}" />；<br>电表读数、额定值都是有效值。</div>

</div>

<div class="divider-l stack">

<div class="mini-title">电容器耐压</div>

<div class="ask">耐压 <Latex tex="10\ \text{V}" /> 的电容器，<br>能接 <Latex tex="9\ \text{V}" /> 的正弦交流吗？</div>

<div class="warn-hint" v-click="3">不能。<Latex tex="9\ \text{V}" /> 是有效值，<br>峰值 <Latex tex="9\sqrt{2}\approx12.7\ \text{V}" />，<br>超过耐压值。</div>

</div>

</div>

</div>

---
layout: exercise-split
title: 例题
clicks: 3
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　一个阻值 <Latex tex="R=50\ \Omega" /> 的电热器接到 <Latex tex="u=311\sin(100\pi t)\ \text{V}" /> 的交流电源上。求电功率。</div>

</template>

<div class="step-list">

<div class="step-item" v-click="1">
<div class="step-no">1</div>
<div>电压有效值 <Latex tex="U=\frac{U_m}{\sqrt{2}}=\frac{311}{\sqrt{2}}\approx220\ \text{V}" />。</div>
</div>

<div class="step-item" v-click="2">
<div class="step-no">2</div>
<div>电功率 <Latex tex="P=\frac{U^2}{R}=\frac{220^2}{50}=968\ \text{W}" />。</div>
</div>

</div>

<div class="tip-hint" v-click="3">功率、热量用有效值；电容器耐压、击穿电压看峰值。</div>

---
layout: base-flex
title: 小结
---

# 小结

<div class="page-grow">

<div class="half-grid">

<div class="stack">

<div class="mini-title">产生与变化</div>

<div>线圈在匀强磁场中匀速转动，磁通量周期性变化。</div>

<div>中性面：<Latex tex="\Phi" /> 最大、<Latex tex="e=0" />；每经过中性面一次，电流方向改变一次。</div>

<div><Latex tex="e=E_m\sin\omega t" />，<Latex tex="E_m=N\omega BS" />。</div>

</div>

<div class="divider-l stack">

<div class="mini-title">描述与有效值</div>

<div><Latex tex="\omega=2\pi f=\frac{2\pi}{T}" />；我国电网 <Latex tex="f=50\ \text{Hz}" />，<Latex tex="T=0.02\ \text{s}" />。</div>

<div>正弦式：<Latex tex="I=\frac{I_m}{\sqrt{2}}" />，<Latex tex="U=\frac{U_m}{\sqrt{2}}" />。</div>

<div><Latex tex="220\ \text{V}" /> 是有效值，峰值约 <Latex tex="311\ \text{V}" />；耐压看峰值。</div>

</div>

</div>

</div>
