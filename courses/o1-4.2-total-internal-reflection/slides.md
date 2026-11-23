---
theme: default
title: "全反射"
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
chapter-no: "4.2"
chapter: "第四章 光"
subtitle: "从水中气泡到光导纤维：全反射的条件与应用"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 水中的气泡为什么特别明亮？
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="intro-grid">
<div class="intro-figure"><BubbleSvg /></div>
<div class="intro-ask">
<div class="ask ask-lead">水中的气泡，为什么特别明亮？</div>
<div class="ask-sub">光从水射向气泡，会在界面处发生什么？</div>
<div class="tip-hint" v-click="1">一部分光在气泡表面发生全反射，回到水中，气泡看起来就特别明亮。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 光疏介质与光密介质

<div class="page-grow">
<div class="medium-grid">
<div class="medium-figure"><MediumCompareSvg /></div>
<div class="medium-text">
<DefinitionBox term="光疏介质与光密介质" tone="gold">
两种介质相比，折射率较小的叫<span class="nowrap">光疏介质</span>，折射率较大的叫<span class="nowrap">光密介质</span>。
</DefinitionBox>
<div class="info-hint">光疏和光密是相对的：水相对空气是光密介质，相对水晶却是光疏介质。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 光从光密介质射向光疏介质

<div class="page-grow">
<div class="ray-grid">
<div class="ray-figure"><RayIncidenceSvg :angle="40" :n="1.5" /></div>
<div class="ray-text">
<div class="ask">光从玻璃射向空气，折射角比入射角大还是小？</div>
<div class="ray-fact" v-click="1">折射角大于入射角，折射光偏离法线更远。</div>
<div class="ray-fact" v-click="2">入射角增大时，折射光越来越弱，反射光越来越强。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
clickAnimation: none
---

# 全反射现象

<div class="page-grow">
<div class="critical-wrap">
<DefinitionBox term="全反射" tone="gold">
当光从<span class="nowrap">光密介质</span>射向<span class="nowrap">光疏介质</span>时，如果入射角增大到某一角度，使折射角达到 <Latex tex="90^\circ" />，<span class="nowrap">折射光</span>完全消失，只剩下<span class="nowrap">反射光</span>，这种现象叫全反射。
</DefinitionBox>
<div class="critical-figure"><RayCriticalSvg :step="$clicks" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
clickAnimation: none
---

# 临界角

<div class="page-grow">
<div class="critical-wrap">
<div class="critical-grid">
<div class="critical-figure"><CriticalAngleSvg :step="$clicks" /></div>
<div class="critical-side">
<div class="critical-text">
<div class="body-def">折射角等于 <Latex tex="90^\circ" /> 时的入射角，叫临界角，<span class="nowrap">用 <Latex tex="C" /> 表示</span>。</div>
<div v-click="1" class="formula"><Latex tex="\sin C = \dfrac{1}{n}" display /></div>
<div v-click="1" class="info-hint"><Latex tex="n" /> 越大，<Latex tex="C" /> 越小。</div>
</div>
<div v-click="2" class="ca-table">
<div class="ca-row ca-head"><span>介质</span><span>折射率 <Latex tex="n" /></span><span>临界角 <Latex tex="C" /></span></div>
<div class="ca-row"><span>水</span><span>1.33</span><span><Latex tex="48.8^\circ" /></span></div>
<div class="ca-row"><span>玻璃</span><span>1.5</span><span><Latex tex="41.8^\circ" /></span></div>
<div class="ca-row"><span>金刚石</span><span>2.42</span><span><Latex tex="24.4^\circ" /></span></div>
</div>
</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 发生全反射的条件

<div class="page-grow">
<div class="cond-grid">
<div class="cond-card">
<mdi-swap-vertical class="cond-icon icon-lg" />
<div class="cond-name">光从光密介质射向光疏介质</div>
<div class="cond-text">从空气射向水或玻璃，不会发生全反射。</div>
</div>
<div class="cond-card">
<mdi-angle-acute class="cond-icon icon-lg" />
<div class="cond-name">入射角大于或等于临界角</div>
<div class="cond-text">即 <Latex tex="\theta_1 \ge C" />，折射光才会消失。</div>
</div>
</div>
<div class="warn-hint" v-click="1">两个条件必须同时满足。</div>
</div>

---
layout: base-flex
title: 增大入射角，会发生什么？
clicks: 0
clickAnimation: none
---

<div class="page-grow">
<div class="mini-title">改变入射角，观察折射光的变化</div>
<TotalReflectionDemo />
<div class="tip-hint">入射角增大到临界角时，折射光消失，发生全反射。</div>
</div>

---
layout: base-flex
clicks: 2
clickAnimation: none
---

# 全反射棱镜

<div class="page-grow">
<div class="prism-grid">
<div class="prism-figure"><PrismSvg :step="$clicks" /></div>
<div class="prism-facts">
<div class="prism-fact">光垂直射入棱镜，方向不变。</div>
<div class="prism-fact" v-click="1">在斜边处，入射角 <Latex tex="45^\circ" /> 大于临界角，发生全反射。</div>
<div class="prism-fact" v-click="2">反射率接近 100%，光的传播方向改变 <Latex tex="90^\circ" />。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 全反射棱镜的应用

<div class="page-grow">
<div class="app-grid">
<div class="app-card">
<mdi-binoculars class="app-icon icon-lg" />
<div class="app-name">双筒望远镜</div>
<div class="app-text">棱镜把光路折转，<span class="nowrap">镜筒更短</span>。</div>
</div>
<div class="app-card">
<mdi-periscope class="app-icon icon-lg" />
<div class="app-name">潜望镜</div>
<div class="app-text">棱镜改变光路，看到<span class="nowrap">障碍物</span>后面。</div>
</div>
<div class="app-card">
<mdi-bicycle class="app-icon icon-lg" />
<div class="app-name">自行车尾灯</div>
<div class="app-text">把后方射来的光<span class="nowrap">反射回去</span>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
clickAnimation: none
---

# 光导纤维

<div class="page-grow">
<div class="fiber-grid">
<div class="fiber-figure"><FiberSvg :step="$clicks" /></div>
<div class="fiber-facts">
<div class="fiber-fact">内芯的折射率大于外套的折射率。</div>
<div class="fiber-fact" v-click="1">光在内芯与外套的界面上发生全反射。</div>
<div class="fiber-fact" v-click="2">光可以沿着弯曲的纤维传播。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 光导纤维的应用

<div class="page-grow">
<div class="app-grid">
<div class="app-card">
<mdi-medical-bag class="app-icon icon-lg" />
<div class="app-name">内窥镜</div>
<div class="app-text">光纤束把体内图像<span class="nowrap">传出来</span>。</div>
</div>
<div class="app-card">
<mdi-access-point class="app-icon icon-lg" />
<div class="app-name">光纤通信</div>
<div class="app-text">激光沿光纤传输，容量大、衰减小。</div>
</div>
<div class="app-card">
<mdi-router-network class="app-icon icon-lg" />
<div class="app-name">光纤宽带</div>
<div class="app-text">光纤把网络信号送进<span class="nowrap">千家万户</span>。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 自然界中的全反射

<div class="page-grow">
<div class="app-grid">
<div class="app-card">
<mdi-water class="app-icon icon-lg" />
<div class="app-name">水中的气泡</div>
<div class="app-text">光从水射向气泡，部分光<span class="nowrap">全反射</span>，气泡显得明亮。</div>
</div>
<div class="app-card">
<mdi-cube-outline class="app-icon icon-lg" />
<div class="app-name">玻璃中的气泡</div>
<div class="app-text">光从玻璃射向气泡，气泡<span class="nowrap">边缘</span>出现亮光。</div>
</div>
<div class="app-card">
<mdi-diamond-stone class="app-icon icon-lg" />
<div class="app-name">金刚石的光彩</div>
<div class="app-text">临界角只有 <Latex tex="24.4^\circ" />，光在<span class="nowrap">内部</span>多次全反射。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
clickAnimation: none
---

# 例题：潜水员看到的范围

<div class="page-grow">
<div class="ex-grid">
<div class="ex-figure"><DiverConeSvg :step="$clicks" /></div>
<div class="ex-side">
<div class="ex-stem">水的折射率 <Latex tex="n = 1.33" />。潜水员在水下看水面，他看到的范围是怎样的？</div>
<div class="ex-step" v-click="1"><span class="ex-step-no">1</span>水面上的光射入水中，折射角最大为临界角 <Latex tex="C" />。</div>
<div class="ex-step" v-click="1"><span class="ex-step-no">2</span><Latex tex="\sin C = \dfrac{1}{1.33}" />，得 <Latex tex="C \approx 48.8^\circ" />。</div>
<div class="ex-step" v-click="2"><span class="ex-step-no">3</span>水面景物发出的光，进入水中后折射角都不超过 <Latex tex="C" />。</div>
<div class="ex-step" v-click="3"><span class="ex-step-no">4</span>潜水员看到的水面景物集中在一个倒立圆锥内，圆锥顶角 <Latex tex="2C \approx 97.6^\circ" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 练习：求临界角

<div class="page-grow">
<div class="ex-side">
<div class="ex-stem">玻璃的折射率 <Latex tex="n = 1.5" />，金刚石的折射率 <Latex tex="n = 2.42" />。光从它们射向空气时，临界角各是多少？</div>
<div class="ex-steps">
<div class="ex-step" v-click="1"><span class="ex-step-no">1</span>玻璃：<Latex tex="\sin C = \dfrac{1}{1.5}" />，<Latex tex="C \approx 41.8^\circ" />。</div>
<div class="ex-step" v-click="2"><span class="ex-step-no">2</span>金刚石：<Latex tex="\sin C = \dfrac{1}{2.42}" />，<Latex tex="C \approx 24.4^\circ" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 练习：能否发生全反射

<div class="page-grow">
<div class="ex-grid">
<div class="ex-figure"><RayIncidenceSvg :angle="40" :n="1.414" :show-critical="true" /></div>
<div class="ex-side">
<div class="ex-stem">某种介质的折射率 <Latex tex="n = \sqrt{2}" />。光从该介质射向空气，入射角为 <Latex tex="40^\circ" />，能否发生全反射？</div>
<div class="ex-step" v-click="1"><span class="ex-step-no">1</span><Latex tex="\sin C = \dfrac{1}{\sqrt{2}}" />，临界角 <Latex tex="C = 45^\circ" />。</div>
<div class="ex-step" v-click="2"><span class="ex-step-no">2</span><Latex tex="40^\circ < 45^\circ" />，不能发生全反射，仍有折射光。</div>
<div class="ex-step" v-click="2"><span class="ex-step-no">3</span><Latex tex="\sin\theta_2 = \sqrt{2}\sin 40^\circ \approx 0.909" />，<Latex tex="\theta_2 \approx 65.4^\circ" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
clickAnimation: none
---

# 练习：光纤端面的入射条件

<div class="page-grow">
<div class="ex-grid">
<div class="ex-figure"><FiberExerciseSvg :step="$clicks" /></div>
<div class="ex-side">
<div class="ex-stem">一段长为 <Latex tex="l" />、折射率为 <Latex tex="n" /> 的玻璃丝，<Latex tex="n < \sqrt{2}" />。光从空气射入端面 <Latex tex="AB" />，要使光传播到另一端，入射角 <Latex tex="i" /> 应满足什么条件？</div>
<div class="ex-step" v-click="1"><span class="ex-step-no">1</span>端面折射：<Latex tex="\sin i = n \sin r" />。</div>
<div class="ex-step" v-click="2"><span class="ex-step-no">2</span>侧面入射角 <Latex tex="\theta_2 = 90^\circ - r" />，全反射要求 <Latex tex="\theta_2 \ge C" />。</div>
<div class="ex-step" v-click="3"><span class="ex-step-no">3</span>由 <Latex tex="\sin C = \dfrac{1}{n}" /> 得 <Latex tex="\sin i \le \sqrt{n^2 - 1}" />，即 <Latex tex="i \le \arcsin\sqrt{n^2 - 1}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="mini-title">全反射</div>
<div class="sum-chain">
<span class="sum-node">光疏、光密</span>
<span class="sum-arrow">→</span>
<span class="sum-node">全反射的条件</span>
<span class="sum-arrow">→</span>
<span class="sum-node sum-node-main"><Latex tex="\sin C = \dfrac{1}{n}" /></span>
<span class="sum-arrow">→</span>
<span class="sum-node">棱镜、光纤</span>
</div>
<div class="sum-list">
<div class="sum-row"><span class="sum-key">条件</span><span>光从光密介质射向光疏介质，入射角不小于临界角。</span></div>
<div class="sum-row"><span class="sum-key">临界角</span><span><Latex tex="\sin C = \dfrac{1}{n}" />，折射率越大，临界角越小。</span></div>
<div class="sum-row"><span class="sum-key">应用</span><span>全反射棱镜改变光路，光导纤维传递光和图像。</span></div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="next-kicker">下一节 · 4.3</div>
<div class="next-title">光的干涉</div>
<div class="next-grid">
<div class="next-card">
<mdi-waves class="next-icon icon-lg" />
<div class="next-name">双缝干涉</div>
<div class="next-text">相干光叠加，出现明暗条纹。</div>
</div>
<div class="next-card">
<mdi-ruler class="next-icon icon-lg" />
<div class="next-name">测光的波长</div>
<div class="next-text">用干涉条纹间距测波长。</div>
</div>
<div class="next-card">
<mdi-lightbulb-on-outline class="next-icon icon-lg" />
<div class="next-name">薄膜干涉</div>
<div class="next-text">肥皂膜、油膜上的彩色条纹。</div>
</div>
</div>
</div>
