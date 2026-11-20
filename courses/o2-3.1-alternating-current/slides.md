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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "3.1"
chapter: "第三章 交变电流"
subtitle: "从交流与直流到正弦式交变电流"
---

<CoverDecor />

---
layout: base-flex
title: "两种波形"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">甲、乙是两种电源的电压波形。哪一条是电池的？</div>
<WaveCompare />
<div class="tip-hint" v-click="1">甲平直、方向不变，是电池的直流；乙的大小和方向都随时间周期性变化，是交变电流。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 交流与直流

<div class="page-grow page-around">
<div class="ask">大小变化、方向不变的电流，是交变电流吗？</div>
<div class="def-row" v-click="1">
<DefinitionBox term="交变电流" tone="gold"><div>大小和方向都随时间做<span class="def-term">周期性变化</span>的电流。</div></DefinitionBox>
<DefinitionBox term="直流" tone="blue"><div>方向不随时间变化，大小可以变化。</div></DefinitionBox>
</div>
<div class="tip-hint" v-click="2">判断是不是交变电流，看<span class="def-term">方向</span>是否做周期性变化；方向不变就是直流。</div>
</div>

---
layout: base-flex
title: "平移后的波形"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">把正弦交流整体平移到正半轴，它还是交流吗？</div>
<ShiftedSineDc />
<div class="tip-hint" v-click="1">不是。电流始终为正，<span class="def-term">方向没有变化</span>，只是大小在变，所以是直流。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 恒定电流

<div class="ask">恒定电流与直流是什么关系？</div>
<div class="stack" v-click="1">
<DefinitionBox term="恒定电流" tone="gold"><div>大小和方向都<span class="def-term">不随时间变化</span>的电流。</div></DefinitionBox>
<div class="figure" style="width: 64%; margin-inline: auto"><CurrentSetsSvg /></div>
</div>
<div class="tip-hint" v-click="2">直流只要求方向不变；恒定电流还要求大小不变。所以恒定电流一定是直流，直流不一定是恒定电流。</div>

---
layout: base-flex
clicks: 2
---

# 电流之战

<div class="ask">为什么交流最终胜出？</div>
<div class="step-list" v-click="1">
<div class="step-item"><span class="step-no">1</span><div>1882 年，爱迪生在纽约珍珠街建成直流电站。</div></div>
<div class="step-item"><span class="step-no">2</span><div>1888 年，特斯拉展示交流电动机，西屋公司推广交流输电。</div></div>
<div class="step-item"><span class="step-no">3</span><div>1893 年，芝加哥世博会大规模采用交流供电。</div></div>
<div class="step-item"><span class="step-no">4</span><div>1896 年，尼亚加拉水电站向 42 km 外的布法罗输电。</div></div>
</div>
<div class="tip-hint" v-click="2">交流可以方便地升降压，远距离输电损耗小，因此逐渐取代直流。</div>

---
layout: base-flex
title: "发电机的构造"
clicks: 3
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">发电机由哪些部分组成？</div>
<div class="figure" style="width: 56%; margin-inline: auto"><Generator3D :animated="false" :angle="34" /></div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>N、S 两个磁极之间形成匀强磁场。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>线圈放在磁场中，可以绕轴转动；AB、CD 两边切割磁感线。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>滑环 K、L 随线圈一起转，电刷 E、F 把电流引到外电路。</div></div>
</div>
</div>

---
layout: base-flex
title: "发电机怎样产生电流"
clicks: 3
---

<div class="page-grow page-around">
<div class="ask ask-lead">线圈转动时，为什么外电路中有电流？</div>
<div class="split-wide">
<div class="figure"><Generator3D :animated="true" :show-labels="true" :show-current="true" /></div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>线圈转动，穿过它的磁通量不断变化。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>AB、CD 两边切割磁感线，产生感应电动势。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>滑环、电刷和外电路把回路闭合，就有感应电流。</div></div>
</div>
</div>
</div>

---
layout: base-flex
title: "转一圈，方向变几次"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">线圈连续转动时，电流方向怎样变化？</div>
<CurrentGraph />
<div class="tip-hint" v-click="1">每经过中性面一次，电流方向改变一次；转一圈经过中性面两次，方向改变两次。中性面前后磁通量的增减相反，电动势反号，电流随之反向。</div>
</div>

---
layout: base-flex
title: "电流最大与最小的位置"
clicks: 2
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">线圈转到哪些位置，电流最大？哪些位置电流为零？</div>
<div class="figure" style="width: 96%; margin-inline: auto"><CoilPositionsSvg :step="$clicks" /></div>
<div class="tip-hint" v-click="2">线圈平面与磁感线平行时 <Latex tex="e" /> 最大；与磁感线垂直（中性面）时 <Latex tex="e=0" />。电阻恒定时，电流与电动势同步。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 中性面

<div class="ask">中性面在哪里？</div>
<div class="page-grow page-grow-tight">
<div class="split-wide" style="--cols: 1.15fr 1fr; align-items: center">
<div class="figure" style="width: 100%"><FluxTangentGraph /></div>
<div class="stack">
<div v-click="1"><DefinitionBox term="中性面" tone="gold"><div>线圈平面与磁感线<span class="def-term">垂直</span>的位置。此时磁通量最大，感应电动势为零。</div></DefinitionBox></div>
<div class="tip-hint" v-click="2">磁通量最大时，图线的切线水平，变化率为零，所以感应电动势为零，电流也为零。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 正弦式电动势

<div class="page-grow page-around">
<div class="ask">设 <Latex tex="AB=L_1" />、<Latex tex="AD=L_2" />，匝数 <Latex tex="N" />，角速度 <Latex tex="\omega" />，磁感应强度 <Latex tex="B" />。电动势多大？</div>
<div class="split-wide" style="--cols: 1.6fr 1fr">
<div class="step-list" style="font-size: 0.92rem">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>从中性面计时，<Latex tex="\theta=\omega t" />。<br>轴与 AB 平行、过 AD、BC 中点；<br>AB、CD 速度 <Latex tex="v=\frac{\omega L_2}{2}" />，垂直分量 <Latex tex="v_\perp=v\sin\theta" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>每条边 <Latex tex="E_1=BL_1v\sin\theta" />；两边串联：<br><Latex tex="e=2BL_1\cdot\left(\frac{\omega L_2}{2}\right)\sin\theta" /><br><Latex tex="=\omega BL_1L_2\sin\theta" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>面积 <Latex tex="S=L_1L_2" />，所以 <Latex tex="e=\omega BS\sin\omega t" />；<br>N 匝时 <Latex tex="e=N\omega BS\sin\omega t" />。</div></div>
</div>
<div class="figure" style="max-width: 340px; margin-inline: auto"><CoilVelocitySvg /></div>
</div>
<div class="tip-hint" v-click="4">峰值 <Latex tex="E_m=N\omega BS" />，瞬时值 <Latex tex="e=E_m\sin\omega t" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 电动势、电流与电压

<div class="ask">发电机有内阻、外电路为纯电阻 <Latex tex="R" /> 时，路端电压还是电动势吗？</div>
<div class="half-grid">
<div class="stack" v-click="1">
<div class="mini-title">电动势</div>
<div class="summary-line"><Latex tex="e=E_m\sin\omega t" /></div>
<div class="summary-line"><Latex tex="E_m=N\omega BS" /></div>
<div class="mini-title">电流（总电阻 <Latex tex="R+r" />）</div>
<div class="summary-line"><Latex tex="i=I_m\sin\omega t" /></div>
<div class="summary-line"><Latex tex="I_m=\frac{E_m}{R+r}" /></div>
</div>
<div class="divider-l stack" v-click="1">
<div class="mini-title">路端电压</div>
<div class="summary-line"><Latex tex="u=U_m\sin\omega t" /></div>
<div class="summary-line"><Latex tex="U_m=I_mR" /></div>
<div class="mini-note">若内阻 <Latex tex="r=0" />，则 <Latex tex="U_m=E_m" />。</div>
<div class="tip-hint" v-click="2">外电路为纯电阻时，路端电压峰值 <Latex tex="U_m=I_mR" />，比电动势峰值小。</div>
</div>
</div>

---
layout: base-flex
title: "沿磁场方向看投影"
clicks: 3
---

<div class="page-grow page-grow-tight">
<div class="ask">为什么线圈的形状、转轴位置不影响峰值？</div>
<div class="figure" style="width: 80%; margin-inline: auto"><ProjectionProofSvg :step="$clicks" /></div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>沿磁场方向看，把线圈分成许多与转轴垂直的细条，每条宽度 <Latex tex="\Delta x" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>线圈转过 <Latex tex="\theta" />，每条细条的投影高度都变为原来的 <Latex tex="\cos\theta" />，投影面积也乘 <Latex tex="\cos\theta" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>所有细条相加：<Latex tex="S_\perp=S\cos\theta" />。无论线圈是什么形状、轴平移到哪里，每条细条都乘同一个 <Latex tex="\cos\theta" />，所以峰值不变。</div></div>
</div>
</div>

---
layout: base-flex
title: "从投影面积到电动势"
clicks: 4
---

<div class="page-grow page-around">
<div class="ask">投影面积知道了，磁通量和感应电动势怎样算？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>穿过线圈的磁通量 <Latex tex="\Phi=BS_\perp=BS\cos\theta" />。设 <Latex tex="\theta=\omega t" />，则 <Latex tex="\Phi=BS\cos\omega t" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>磁通量变化率的最大值是 <Latex tex="BS\omega" />；所以 <Latex tex="e=BS\omega\sin\omega t" />，<Latex tex="N" /> 匝时 <Latex tex="e=NBS\omega\sin\omega t" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>峰值 <Latex tex="E_m=NBS\omega" /> 中只出现 <Latex tex="S" />；线圈是什么形状、轴放在哪里，都没有出现在结果里。前提是轴在线圈平面内且与 <Latex tex="B" /> 垂直。</div></div>
</div>
<div class="tip-hint" v-click="4">这就是“形状、轴位置无关”的证明：不是直接下结论，而是先证明投影面积只与 <Latex tex="S" /> 和 <Latex tex="\theta" /> 有关。</div>
</div>

---
layout: base-flex
title: "图像与相位"
clicks: 2
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead"><Latex tex="e" /> 和 <Latex tex="\Phi" /> 的图像有什么关系？谁超前？</div>
<div class="split-wide" style="--cols: 2fr 1fr; align-items: center">
<div class="figure"><FluxEmfGraph /></div>
<div class="stack">
<div class="tip-hint" v-click="1" style="font-size: 0.84rem"><Latex tex="\Phi" /> 最大时 <Latex tex="e=0" />；<br><Latex tex="\Phi" /> 为零时 <Latex tex="e" /> 最大。<br>两者在时间上相差 <Latex tex="\frac{T}{4}" />，<br>即 1/4 个周期。</div>
<div class="tip-hint" v-click="2" style="font-size: 0.84rem">图中 <Latex tex="\Phi" /> 比 <Latex tex="e" /> 早 <Latex tex="\frac{T}{4}" />。<br>若把正方向反过来，<br><Latex tex="e" /> 图上下翻转，<br>看起来 <Latex tex="e" /> 超前；<br>所以超前还是落后没有固定结论。</div>
</div>
</div>
</div>

---
layout: exercise-split
title: "例题"
clicks: 3
---

<template v-slot:stem>
<div class="ask">发电机产生的电动势 <Latex tex="e=400\sin(100\pi t)\ \text{V}" />，总电阻 <Latex tex="R=2\ \text{k}\Omega" />。写出电流的瞬时值表达式，并求电流峰值。</div>
</template>

<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>由表达式读出 <Latex tex="E_m=400\ \text{V}" />，<Latex tex="\omega=100\pi\ \text{rad/s}" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><Latex tex="I_m=\frac{E_m}{R}=\frac{400}{2000}=0.2\ \text{A}" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>电流瞬时值 <Latex tex="i=0.2\sin(100\pi t)\ \text{A}" />。</div></div>
</div>

---
layout: base-flex
---

# 小结

<div class="half-grid">
<div class="stack">
<div class="mini-title">产生</div>
<div class="summary-line">线圈在匀强磁场中匀速转动，磁通量周期性变化。</div>
<div class="summary-line">中性面：磁通量最大、电动势为零；每经过中性面一次，电流方向改变。</div>
<div class="summary-line"><Latex tex="e=E_m\sin\omega t" />，<Latex tex="E_m=N\omega BS" />。</div>
<div class="summary-line"><Latex tex="i=I_m\sin\omega t" />，<Latex tex="I_m=\frac{E_m}{R+r}" />。</div>
</div>
<div class="divider-l stack">
<div class="mini-title">峰值与电压</div>
<div class="summary-line">峰值只由 <Latex tex="N" />、<Latex tex="B" />、<Latex tex="S" />、<Latex tex="\omega" /> 决定（轴在线圈平面内且与 <Latex tex="B" /> 垂直）。</div>
<div class="summary-line">外电路为纯电阻时，路端电压峰值 <Latex tex="U_m=I_mR" />。</div>
</div>
</div>
