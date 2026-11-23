---
theme: default
title: "分子动理论的基本内容"
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
chapter-no: "1.1"
chapter: "第一章 分子动理论"
subtitle: "从分子到热运动"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 分子有多小
clicks: 1
---

<div class="page-grow pt2">
<div class="ask-lead p2-ask">把地球缩成一个苹果，分子有多大？</div>
<div class="p2-compare">
<div class="p2-card">
<div class="p2-row"><mdi-earth class="icon-lg p2-icon" /><span>地球</span><mdi-arrow-right class="p2-arrow" /><mdi-apple class="icon-lg p2-icon" /><span>苹果</span></div>
<div class="p2-note">大小之比约为 <Latex tex="10^{9}" /></div>
</div>
<div class="p2-card">
<div class="p2-row"><span class="p2-ball"></span><span>直径 1 cm 的球</span><mdi-arrow-right class="p2-arrow" /><mdi-molecule class="icon-lg p2-icon" /><span>分子</span></div>
<div class="p2-note">分子直径约 <Latex tex="10^{-10}\ \text{m}" /></div>
</div>
</div>
<div class="tip-hint" v-click="1">1 亿个分子排起来，大约只有 1 cm 长。</div>
</div>

---
layout: base-flex
title: 物体由大量分子组成
---

# 物体由大量分子组成

<div class="page-grow pt3">
<div class="ask">1 mol 水里有多少个水分子？</div>
<div class="p3-stats">
<div class="p3-stat"><div class="p3-value"><Latex tex="6.02\times10^{23}" /></div><div class="p3-label"><Latex tex="1\ \text{mol}" /> 水中的水分子数</div></div>
<div class="p3-stat"><div class="p3-value"><Latex tex="18\ \text{g}" /></div><div class="p3-label"><Latex tex="1\ \text{mol}" /> 水的质量，约 <Latex tex="18\ \text{cm}^3" /></div></div>
<div class="p3-stat"><div class="p3-value"><Latex tex="10^{-10}\ \text{m}" /></div><div class="p3-label">多数分子直径的数量级</div></div>
</div>
<div class="summary-line p3-bottom">1 cm³ 水中约含 <Latex tex="3.3\times10^{22}" /> 个水分子。</div>
</div>

---
layout: base-flex
title: 怎样估测分子的大小
clicks: 2
---

# 怎样估测分子的大小

<div class="page-grow pt4">
<div class="ask">怎样用宏观量估测分子的大小？</div>
<div class="half-grid p4-grid">
<div class="p4-fig"><OilFilmSvg /></div>
<div class="divider-l p4-side">
<div class="p4-step">一滴油酸在水面铺成单分子层。</div>
<div class="p4-step" v-click="1">测出油膜面积 <Latex tex="S" />，一滴油酸的体积 <Latex tex="V" /> 已知。</div>
<div class="p4-formula" v-click="2"><Latex tex="d=\frac{V}{S}" display /></div>
<div class="tip-hint" v-click="2">分子直径的数量级约为 <Latex tex="10^{-10}\ \text{m}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 扩散现象
clicks: 2
---

# 扩散现象

<div class="page-grow pt5">
<div class="ask">酱油滴入鸡蛋清，为什么整块会慢慢变色？</div>
<div class="half-grid p5-grid">
<div class="p5-fig"><DiffusionSvg /></div>
<div class="divider-l p5-notes">
<div class="p5-note">不同种物质彼此进入对方，叫<strong>扩散</strong>。</div>
<div class="p5-note" v-click="1">扩散不是外界作用，也不是化学反应，是分子无规则运动的结果。</div>
<div class="mini-note" v-click="2">温度越高，扩散越快；半导体掺杂也利用它。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 布朗运动
clicks: 2
---

# 布朗运动

<div class="page-grow pt6">
<div class="ask">悬浮在水中的小炭粒，为什么会不停地运动？</div>
<div class="half-grid p6-grid">
<div class="p6-fig"><BrownianPathSvg /></div>
<div class="divider-l p6-notes">
<div class="p6-note"><strong>布朗运动</strong>：悬浮微粒的无规则运动。1827 年，布朗首先在显微镜下研究了它。</div>
<div class="p6-note" v-click="1">微粒越小、温度越高，运动越明显。</div>
<div class="p6-note" v-click="2">布朗运动不是分子的运动，而是分子无规则运动的间接证据。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 布朗运动的原因
clicks: 3
---

# 布朗运动的原因

<div class="page-grow pt7">
<div class="ask">液体分子看不见，怎样解释小炭粒的运动？</div>
<div class="half-grid p7-grid">
<div class="p7-fig"><BrownianCollisionSvg /></div>
<div class="divider-l p7-notes">
<div class="p7-note">液体分子不停地运动，从各方向撞击微粒。</div>
<div class="p7-note" v-click="1">某一瞬间，某个方向的撞击更强，微粒就向那个方向运动。</div>
<div class="p7-note" v-click="2">微粒越小，同时撞它的分子越少，撞击越不平衡，运动越明显。</div>
<div class="tip-hint" v-click="3">布朗运动间接说明：液体分子在永不停息地做无规则运动。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 热运动
clicks: 1
---

# 热运动

<div class="page-grow pt8">
<div class="ask">扩散和布朗运动都与温度有关，说明什么？</div>
<div class="p8-grid">
<div class="p8-card"><mdi-thermometer class="icon-xl p8-icon" /><div class="p8-title">扩散</div><div class="p8-text">温度越高，扩散越快。</div></div>
<div class="p8-card"><mdi-run-fast class="icon-xl p8-icon" /><div class="p8-title">布朗运动</div><div class="p8-text">温度越高，悬浮微粒的运动越明显。</div></div>
</div>
<div class="p8-def" v-click="1">分子永不停息的无规则运动叫<strong>热运动</strong>；温度是分子热运动剧烈程度的标志。</div>
</div>

---
layout: base-flex
title: 分子间有空隙
clicks: 2
---

# 分子间有空隙

<div class="page-grow pt9">
<div class="ask">50 mL 水加 50 mL 酒精，混合后为什么小于 100 mL？</div>
<div class="half-grid p9-grid">
<div class="p9-fig"><LiquidMixSvg /></div>
<div class="divider-l p9-notes">
<div class="p9-note">分子间存在空隙，水和酒精分子彼此进入对方的空隙。</div>
<div class="p9-note" v-click="1">气体容易被压缩、金和铅压在一起会互相扩散，也说明分子间有空隙。</div>
<div class="p9-note" v-click="2">分子间有空隙，大量分子却能聚在一起，说明分子之间还有相互作用力。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 分子间的作用力
clicks: 2
---

# 分子间的作用力

<div class="page-grow pt10">
<div class="ask">分子间有空隙，为什么固体、液体还能聚在一起？</div>
<div class="half-grid p10-grid">
<div class="p10-fig"><MoleculePairSvg /></div>
<div class="divider-l p10-notes">
<div class="p10-note">分子间同时存在引力和斥力。</div>
<div class="p10-note" v-click="1">拉伸时表现为引力，压缩时表现为斥力。</div>
<div class="p10-note" v-click="2">两种力随距离变化，合力决定表现。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 分子力与距离
clicks: 3
---

# 分子力与距离

<div class="page-grow pt11">
<div class="ask">分子力随距离怎样变化？</div>
<div class="p11-grid">
<div class="p11-chart"><MolecularForceChart :step="$clicks" /></div>
<div class="divider-l p11-notes">
<div class="p11-note"><Latex tex="r=r_0" /> 时 <Latex tex="F=0" />，这个位置叫<strong>平衡位置</strong>。</div>
<div class="p11-note" v-click="1"><Latex tex="r<r_0" /> 时，斥力为主。</div>
<div class="p11-note" v-click="2"><Latex tex="r>r_0" /> 时，引力为主。</div>
<div class="p11-note" v-click="3">距离很大时，分子力趋于 0。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 分子动理论
---

# 分子动理论

<div class="page-grow pt12">
<div class="ask">分子动理论的基本内容是什么？</div>
<div class="p12-grid">
<div class="p12-card"><mdi-atom class="icon-xl p12-icon" /><div class="p12-title">大量分子</div><div class="p12-text">物体是由大量分子组成的。</div></div>
<div class="p12-card"><mdi-run-fast class="icon-xl p12-icon" /><div class="p12-title">无规则运动</div><div class="p12-text">分子在永不停息地做无规则运动。</div></div>
<div class="p12-card"><mdi-arrow-left-right class="icon-xl p12-icon" /><div class="p12-title">相互作用</div><div class="p12-text">分子之间存在着相互作用力。</div></div>
</div>
<div class="summary-line">从分子动理论出发，把宏观热现象看作大量分子热运动的统计表现。</div>
</div>

---
layout: base-flex
title: 统计规律
clicks: 1
---

# 统计规律

<div class="page-grow pt13">
<div class="ask">单个分子的运动有规律吗？</div>
<div class="p13-grid">
<div class="p13-card"><div class="p13-title">单个分子</div><div class="p13-text">某一时刻沿什么方向运动、速率多大，具有偶然性。</div></div>
<div class="p13-card"><div class="p13-title">大量分子</div><div class="p13-text">整体运动有规律，可用统计方法研究。</div></div>
</div>
<div class="tip-hint" v-click="1">温度越高，分子的热运动越剧烈；温度是分子热运动剧烈程度的标志。</div>
</div>

---
layout: exercise-split
title: 例题：估测铜分子的直径
analysisLabel: 解析
clicks: 3
---

<template v-slot:stem>
把铜分子看成球形，且它们紧密排列，试估算铜分子的直径。铜的密度为 <Latex tex="8.9\times10^3\ \text{kg/m}^3" />，铜的摩尔质量为 <Latex tex="6.4\times10^{-2}\ \text{kg/mol}" />。
</template>

<div class="p14-analysis">
<div class="p14-line" v-click="1">1 mol 铜的体积 <Latex tex="V_m=\frac{M}{\rho}\approx7.2\times10^{-6}\ \text{m}^3" />。</div>
<div class="p14-line" v-click="2">每个铜分子占有的体积 <Latex tex="V_0=\frac{V_m}{N_{\text{A}}}\approx1.2\times10^{-29}\ \text{m}^3" />。</div>
<div class="p14-line" v-click="3">由 <Latex tex="V_0=\frac{\pi d^3}{6}" />，得 <Latex tex="d\approx2.8\times10^{-10}\ \text{m}" />。</div>
</div>

---
layout: exercise-split
title: 例题：估测氧气分子间的平均距离
analysisLabel: 解析
clicks: 3
---

<template v-slot:stem>
标准状态下，氧气的摩尔质量为 <Latex tex="3.2\times10^{-2}\ \text{kg/mol}" />，<Latex tex="1\ \text{mol}" /> 氧气在该状态下的体积为 <Latex tex="2.24\times10^{-2}\ \text{m}^3" />。试估算氧气分子间的平均距离。
</template>

<div class="p15-analysis">
<div class="p15-line" v-click="1">每个氧气分子平均占有的体积 <Latex tex="V_0=\frac{V_m}{N_{\text{A}}}\approx3.7\times10^{-26}\ \text{m}^3" />。</div>
<div class="p15-line" v-click="2">把每个分子看成一个立方体的中心，立方体的边长就是分子间的平均距离。</div>
<div class="p15-line" v-click="3">平均距离 <Latex tex="d=\sqrt[3]{V_0}\approx3.3\times10^{-9}\ \text{m}" />。</div>
</div>

---
layout: exercise-split
title: 练习：布朗运动辨析
analysisLabel: 判断
clicks: 2
---

<template v-slot:stem>
以下关于布朗运动的说法是否正确？说明理由。<br>
（1）布朗运动就是分子的无规则运动。<br>
（2）布朗运动证明，组成固体小颗粒的分子在做无规则运动。<br>
（3）向一锅水中撒一点胡椒粉，加热时发现水中的胡椒粉在翻滚，这说明温度越高布朗运动越剧烈。<br>
（4）在显微镜下可以观察到煤油中小粒灰尘的布朗运动，这说明煤油分子在做无规则运动。
</template>

<div class="p16-analysis">
<div class="p16-line" v-click="1">（1）错。布朗运动是悬浮微粒的运动，不是分子的运动。</div>
<div class="p16-line" v-click="1">（2）错。它说明液体分子在做无规则运动，不是固体微粒分子的运动。</div>
<div class="p16-line" v-click="2">（3）错。胡椒粉翻滚是水的流动（对流），不是布朗运动。</div>
<div class="p16-line" v-click="2">（4）对。煤油分子从各方向撞击灰尘，说明煤油分子在无规则运动。</div>
</div>

---
layout: exercise-split
title: 练习：小张与小李的争论
analysisLabel: 解析
clicks: 2
---

<template v-slot:stem>
小张在显微镜下观察水中悬浮的细微粉笔末，把每隔一定时间记录的位置依次连成折线，认为折线说明固体小颗粒的无规则运动。小李说：“小颗粒沿着笔直的折线运动，说明水分子在短时间内的运动是规则的。”你同意谁？为什么？
</template>

<div class="p17-analysis">
<div class="p17-line" v-click="1">折线只是每隔一段时间记录的位置连线，不是微粒的真实路径；两次记录之间，微粒仍在做无规则运动。</div>
<div class="p17-line" v-click="2">直线段不能说明水分子在短时间内的运动是规则的；微粒仍受到液体分子不平衡的撞击。</div>
<div class="p17-note" v-click="2">布朗运动本身是无规则的，它间接说明水分子在永不停息地做无规则运动。</div>
</div>

---
layout: exercise-split
title: 练习：分子力随距离的变化
analysisLabel: 解析
clicks: 2
---

<template v-slot:stem>
当两个分子间的距离由 <Latex tex="r_0" /> 逐渐增大，直至远大于 <Latex tex="r_0" /> 时，分子间的作用力表现为引力还是斥力？当距离由 <Latex tex="r_0" /> 逐渐减小时呢？
</template>

<div class="p18-analysis">
<div class="p18-line" v-click="1">距离由 <Latex tex="r_0" /> 增大：表现为引力；引力先增大，后减小，距离很大时趋于 0。</div>
<div class="p18-line" v-click="2">距离由 <Latex tex="r_0" /> 减小：表现为斥力；距离越小，斥力越大。</div>
<div class="p18-note" v-click="2">归纳：<Latex tex="r<r_0" /> 时斥力为主，<Latex tex="r=r_0" /> 时分子力为零，<Latex tex="r>r_0" /> 时引力为主。</div>
</div>

---
layout: base-flex
title: 课堂小结
---

# 课堂小结

<div class="page-grow pt19">
<div class="step-list p19-list">
<div class="step-item p19-item"><span class="step-no">1</span><div>物体由大量分子组成；分子直径的数量级约为 <Latex tex="10^{-10}\ \text{m}" />。</div></div>
<div class="step-item p19-item"><span class="step-no">2</span><div>分子永不停息地做无规则运动；扩散和布朗运动是它的证据，温度越高运动越剧烈。</div></div>
<div class="step-item p19-item"><span class="step-no">3</span><div>分子间存在空隙，同时存在引力和斥力；<Latex tex="r=r_0" /> 时分子力为零。</div></div>
<div class="step-item p19-item"><span class="step-no">4</span><div>分子动理论把宏观热现象看作大量分子热运动的统计表现。</div></div>
</div>
</div>
