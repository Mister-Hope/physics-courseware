---
theme: default
title: "温度和温标"
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
chapter-no: "2.1"
chapter: "第二章 气体、固体和液体"
subtitle: "从热平衡到温标"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 挡板打开之后
clicks: 2
clickAnimation: none
---

<div class="page-grow temp-intro">
<div class="ask">容器被挡板 K 分成 A、B 两部分，气体压强分别为 <Latex tex="p_{\text{A}}" />、<Latex tex="p_{\text{B}}" />，温度分别为 <Latex tex="T_{\text{A}}" />、<Latex tex="T_{\text{B}}" />。打开挡板后，经过一段时间，容器内的气体是什么状态？</div>
<div class="temp-container">
<div class="temp-half hot">
<div class="temp-half-name">A</div>
<div class="temp-half-params"><Latex tex="p_{\text{A}}" /><Latex tex="T_{\text{A}}" /></div>
</div>
<div class="temp-baffle">K</div>
<div class="temp-half cold">
<div class="temp-half-name">B</div>
<div class="temp-half-params"><Latex tex="p_{\text{B}}" /><Latex tex="T_{\text{B}}" /></div>
</div>
</div>
<div v-click="1" class="temp-badge">打开挡板，两部分气体混合、交换热量</div>
<div v-click="2" class="tip-hint">经过一段时间，各部分状态参量不再变化，达到热平衡；温度相同。</div>
</div>

---
layout: base-flex
title: 热力学系统与状态参量
clicks: 1
clickAnimation: none
---

# 热力学系统与状态参量

<div class="page-grow">
<div class="ask">研究容器中的气体，研究对象是什么？需要哪些物理量描述它的状态？</div>
<div class="temp-param-grid">
<div class="temp-param-card"><mdi-cube-outline class="icon-lg" /><div class="temp-param-name"><Latex tex="V" /></div><div class="temp-param-label">体积</div><div class="temp-param-desc">几何参量</div></div>
<div class="temp-param-card"><mdi-gauge class="icon-lg" /><div class="temp-param-name"><Latex tex="p" /></div><div class="temp-param-label">压强</div><div class="temp-param-desc">力学参量</div></div>
<div class="temp-param-card"><mdi-thermometer class="icon-lg" /><div class="temp-param-name"><Latex tex="T" /></div><div class="temp-param-label">温度</div><div class="temp-param-desc">热学参量</div></div>
</div>
<div v-click="1" class="tip-hint">研究对象是大量分子组成的热力学系统，系统之外叫外界；描述它的状态要用状态参量：体积 <Latex tex="V" />、压强 <Latex tex="p" />、温度 <Latex tex="T" />。</div>
</div>

---
layout: base-flex
title: 平衡态
clicks: 1
clickAnimation: none
---

# 平衡态

<div class="page-grow">
<div class="ask">系统的状态参量会随时间变化吗？</div>
<DefinitionBox term="平衡态">
在没有外界影响的情况下，只要经过足够长的时间，系统内各部分的状态参量都不再随时间变化，这种状态叫平衡态。
</DefinitionBox>
<div v-click="1" class="summary-line">否则就是非平衡态。中学阶段主要处理平衡态的问题。</div>
</div>

---
layout: base-flex
title: 热平衡
clicks: 2
clickAnimation: none
---

# 热平衡

<div class="page-grow">
<div class="ask">两个系统接触传热，经过一段时间，它们的状态参量会怎样变化？</div>
<div class="temp-figure"><ThermalEquilibriumSvg :step="$clicks" /></div>
<div v-click="2" class="tip-hint">经过一段时间，状态参量不再变化，达到热平衡；热平衡时温度相同。</div>
</div>

---
layout: base-flex
title: 热平衡定律
clicks: 2
clickAnimation: none
---

# 热平衡定律

<div class="page-grow">
<div class="ask">如果系统 A 与 C 热平衡，系统 B 也与 C 热平衡，A 与 B 之间是什么关系？</div>
<div class="temp-law">
<div class="temp-law-box"><div class="temp-law-name">系统 A</div><div class="temp-law-t"><Latex tex="T_{\text{A}}" /></div></div>
<div class="temp-law-arrow">⇌</div>
<div class="temp-law-box"><div class="temp-law-name">系统 C</div><div class="temp-law-t"><Latex tex="T_{\text{C}}" /></div></div>
<div class="temp-law-arrow">⇌</div>
<div class="temp-law-box"><div class="temp-law-name">系统 B</div><div class="temp-law-t"><Latex tex="T_{\text{B}}" /></div></div>
</div>
<div v-click="1" class="summary-line">热平衡定律：如果两个系统分别与第三个系统达到热平衡，那么这两个系统彼此之间也必定处于热平衡。</div>
<div v-click="2" class="tip-hint">A、B 必定具有共同的热学性质，这个物理量就是温度：<Latex tex="T_{\text{A}} = T_{\text{B}} = T_{\text{C}}" />。</div>
</div>

---
layout: base-flex
title: 温度
clicks: 1
clickAnimation: none
---

# 温度

<div class="page-grow">
<div class="ask">处于热平衡的两个系统，共同具有什么？</div>
<DefinitionBox term="温度">
温度是决定一个系统与另一个系统是否达到热平衡的物理量；达到热平衡的系统具有相同的温度。
</DefinitionBox>
<div v-click="1" class="summary-line">温度是热学参量（状态参量之一），用 <Latex tex="T" /> 表示。</div>
</div>
