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
<div class="critical-figure"><CriticalAngleSvg :step="$clicks" /></div>
<div class="critical-grid">
<div class="critical-text">
<div class="body-def">折射角等于 <Latex tex="90^\circ" /> 时的入射角，叫临界角，<span class="nowrap">用 <Latex tex="C" /> 表示</span>。</div>
<div v-click="1" class="formula"><Latex tex="\sin C = \dfrac{1}{n}" display /></div>
<div v-click="1" class="info-hint"><Latex tex="n" /> 越大，临界角越小。</div>
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
