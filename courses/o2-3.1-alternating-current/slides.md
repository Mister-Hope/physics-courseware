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

<div class="ask">大小变化、方向不变的电流，是交变电流吗？</div>
<div class="def-row" v-click="1">
<DefinitionBox term="交变电流" tone="gold"><div>大小和方向都随时间做<span class="def-term">周期性变化</span>的电流。</div></DefinitionBox>
<DefinitionBox term="直流" tone="blue"><div>方向不随时间变化，大小可以变化。</div></DefinitionBox>
</div>
<div class="tip-hint" v-click="2">判断是不是交变电流，看<span class="def-term">方向</span>是否变化；方向不变就是直流。</div>

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
<div class="figure" style="width: 78%; margin-inline: auto"><CurrentSetsSvg /></div>
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
title: "发电机"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">线圈在磁场中转动，为什么能产生电流？</div>
<div class="figure" style="width: 88%; margin-inline: auto"><Generator3D /></div>
<div class="tip-hint" v-click="1">穿过线圈的磁通量不断变化，产生感应电动势；回路闭合，就有感应电流。</div>
</div>

---
layout: base-flex
title: "转一圈，方向变几次"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">线圈转一圈，电流方向变几次？</div>
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
<div class="tip-hint" v-click="2">线圈平面与磁感线平行时 e 最大；与磁感线垂直（中性面）时 e=0。电阻恒定时，i 与 e 同步。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 中性面

<div class="ask">中性面在哪里？</div>
<div class="stack" v-click="1">
<DefinitionBox term="中性面" tone="gold"><div>线圈平面与磁感线<span class="def-term">垂直</span>的位置。此时磁通量最大，感应电动势为零。</div></DefinitionBox>
<div class="figure" style="width: 96%; margin-inline: auto"><FluxTangentGraph /></div>
</div>
<div class="tip-hint" v-click="2">磁通量最大时，图线的切线水平，变化率为零，所以感应电动势为零，电流也为零。</div>

---
layout: base-flex
clicks: 4
---

# 正弦式电动势

<div class="ask">设 <Latex tex="AB=L_1" />、<Latex tex="AD=L_2" />，匝数 <Latex tex="N" />，角速度 <Latex tex="\omega" />，磁感应强度 <Latex tex="B" />。电动势多大？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>从中性面开始计时，<Latex tex="\theta=\omega t" />。设轴过 AD 中点，AB、CD 的速度 <Latex tex="v=\frac{\omega L_2}{2}" />，垂直 B 的分量 <Latex tex="v_\perp=v\sin\theta" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>每条边 <Latex tex="E_1=BL_1v\sin\theta" />；两条边串联：<Latex tex="e=2BL_1\cdot\frac{\omega L_2}{2}\sin\theta=\omega BL_1L_2\sin\theta" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>面积 <Latex tex="S=L_1L_2" />，所以 <Latex tex="e=\omega BS\sin\omega t" />；N 匝时 <Latex tex="e=N\omega BS\sin\omega t" />。</div></div>
</div>
<div class="tip-hint" v-click="4">峰值 <Latex tex="E_m=N\omega BS" />，瞬时值 <Latex tex="e=E_m\sin\omega t" />。</div>

---
layout: base-flex
clicks: 2
---

# 电动势、电流与电压

<div class="ask">发电机有内阻时，路端电压还是电动势吗？</div>
<div class="half-grid">
<div class="stack" v-click="1">
<div class="mini-title">电动势</div>
<div class="summary-line"><Latex tex="e=E_m\sin\omega t" /></div>
<div class="summary-line"><Latex tex="E_m=N\omega BS" /></div>
<div class="mini-title">电流（总电阻 R+r）</div>
<div class="summary-line"><Latex tex="i=I_m\sin\omega t" /></div>
<div class="summary-line"><Latex tex="I_m=\frac{E_m}{R+r}" /></div>
</div>
<div class="divider-l stack" v-click="1">
<div class="mini-title">路端电压</div>
<div class="summary-line"><Latex tex="u=U_m\sin\omega t" /></div>
<div class="summary-line"><Latex tex="U_m=I_mR" /></div>
<div class="mini-note">若内阻 r=0，则 <Latex tex="U_m=E_m" />。</div>
<div class="tip-hint" v-click="2">有内阻时，路端电压峰值 <Latex tex="U_m=I_mR" />，比电动势峰值小。</div>
</div>
</div>

---
layout: base-flex
title: "形状与转轴"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">峰值与线圈形状、转轴位置有关吗？</div>
<div class="figure"><ShapeIndependenceSvg /></div>
<div class="tip-hint" v-click="1">无关。只要轴与 <Latex tex="B" /> 垂直，<Latex tex="E_m=N\omega BS" /> 只由 <Latex tex="N" />、<Latex tex="B" />、<Latex tex="S" />、<Latex tex="\omega" /> 决定，形状和轴的位置都不影响。</div>
</div>

---
layout: base-flex
title: "图像与相位"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead"><Latex tex="e" /> 和 <Latex tex="\Phi" /> 的图像有什么关系？谁超前？</div>
<div class="figure" style="width: 92%; margin-inline: auto"><FluxEmfGraph /></div>
<div class="tip-hint" v-click="1"><Latex tex="\Phi" /> 最大时 <Latex tex="e=0" />，<Latex tex="\Phi" /> 为零时 <Latex tex="e" /> 最大，两者相差 <Latex tex="90^\circ" />。谁超前取决于电流正方向的规定。</div>
</div>

---
layout: base-flex
title: "电流方向"
clicks: 1
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">以 AB 边为例，线圈转到任意位置，电流方向怎么判？</div>
<div class="figure"><RightHandRuleSvg /></div>
<div class="tip-hint" v-click="1">右手定则：拇指指向 <Latex tex="v" />，磁感线穿入掌心，四指指向感应电流 <Latex tex="I" />。AB、CD 两边分别判断，再沿回路合成。</div>
</div>

---
layout: exercise-split
title: "例题"
clicks: 3
---

<template v-slot:stem>
<div class="ask">发电机产生的电动势 <Latex tex="e=400\sin(314t)\ \text{V}" />，总电阻 <Latex tex="R=2\ \text{k}\Omega" />。写出电流的瞬时值表达式，并求电流峰值。</div>
</template>

<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>由表达式读出 <Latex tex="E_m=400\ \text{V}" />，<Latex tex="\omega=314\ \text{rad/s}" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><Latex tex="I_m=\frac{E_m}{R}=\frac{400}{2000}=0.2\ \text{A}" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>电流瞬时值 <Latex tex="i=0.2\sin(314t)\ \text{A}" />。</div></div>
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
</div>
<div class="divider-l stack">
<div class="mini-title">方向与峰值</div>
<div class="summary-line">右手定则：拇指 <Latex tex="v" />，磁感线穿掌心，四指 <Latex tex="I" />。</div>
<div class="summary-line">峰值只由 <Latex tex="N" />、<Latex tex="B" />、<Latex tex="S" />、<Latex tex="\omega" /> 决定（轴与 <Latex tex="B" /> 垂直）。</div>
<div class="summary-line">有内阻时，路端电压峰值 <Latex tex="U_m=I_mR" />。</div>
</div>
</div>
