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

---
layout: base-flex
title: 人们已观测的温度
---

# 人们已观测的温度

<div class="page-grow">
<div class="summary-line">温度可以很高，也可以很低。下表是教材中给出的一些温度。</div>
<div class="temp-table">
<div class="temp-row temp-head"><span>对象</span><span>温度</span></div>
<div class="temp-row"><span>实验室获得的最高温度</span><span><Latex tex="10^7 \sim 10^8\ \text{K}" /></span></div>
<div class="temp-row"><span>太阳中心</span><span><Latex tex="1.6 \times 10^7\ \text{K}" /></span></div>
<div class="temp-row"><span>乙炔火焰</span><span><Latex tex="3.5 \times 10^3\ \text{K}" /></span></div>
<div class="temp-row"><span>南极最低气温</span><span><Latex tex="184\ \text{K}" />（<Latex tex="-89.2\ \text{°C}" />）</span></div>
<div class="temp-row"><span>汞的超导转变温度</span><span><Latex tex="4.2\ \text{K}" /></span></div>
<div class="temp-row"><span>实验室获得的最低温度</span><span><Latex tex="10^{-9}\ \text{K}" /></span></div>
</div>
</div>

---
layout: base-flex
title: 温标
clicks: 1
clickAnimation: none
---

# 温标

<div class="page-grow">
<div class="ask">要定量地表示温度，需要先做什么？</div>
<div class="temp-scale-list">
<div class="temp-scale-item"><span class="temp-scale-no">1</span><span class="temp-scale-text">选择测温物质和测温属性，例如水银的热膨胀、气体的压强。</span></div>
<div class="temp-scale-item"><span class="temp-scale-no">2</span><span class="temp-scale-text">规定温度的零点和分度方法。</span></div>
<div class="temp-scale-item"><span class="temp-scale-no">3</span><span class="temp-scale-text">用数值表示温度——这就是温标。</span></div>
</div>
<div v-click="1" class="tip-hint">摄氏温标：标准大气压下冰的熔点定为 <Latex tex="0\ \text{°C}" />，水的沸点定为 <Latex tex="100\ \text{°C}" />。<br />中间 100 等份，每份 <Latex tex="1\ \text{°C}" />。</div>
</div>

---
layout: base-flex
title: 摄氏温标与热力学温标
clicks: 1
clickAnimation: none
---

# 摄氏温标与热力学温标

<div class="page-grow">
<div class="ask">摄氏温度和热力学温度之间有什么关系？</div>
<div class="temp-scale-cards">
<div class="temp-scale-card"><div class="temp-scale-card-title">摄氏温标</div><div class="temp-scale-card-body">用 <Latex tex="t" /> 表示，单位摄氏度（<Latex tex="\text{°C}" />）；冰的熔点 <Latex tex="0\ \text{°C}" />，水的沸点 <Latex tex="100\ \text{°C}" />。</div></div>
<div class="temp-scale-card"><div class="temp-scale-card-title">热力学温标</div><div class="temp-scale-card-body">用 <Latex tex="T" /> 表示，单位开尔文（<Latex tex="\text{K}" />）；是国际单位制七个基本物理量之一，<Latex tex="0\ \text{K}" /> 为绝对零度。</div></div>
</div>
<div class="temp-formula"><Latex tex="T = t + 273.15\ \text{K}" /></div>
<div v-click="1" class="tip-hint">表示温度差时，<Latex tex="1\ \text{°C} = 1\ \text{K}" />；两种温标的零点不同。</div>
</div>

---
layout: base-flex
title: 温度换算
---

# 温度换算

<div class="page-grow">
<div class="ask">摄氏温度和热力学温度怎样换算？</div>
<TemperatureConverter />
<div class="summary-line">表示温度差时，<Latex tex="1\ \text{°C} = 1\ \text{K}" />。</div>
</div>

---
layout: base-flex
title: 温度计的测温物质与测温属性
clicks: 1
clickAnimation: none
---

# 温度计的测温物质与测温属性

<div class="page-grow">
<div class="ask">温度计为什么能测量温度？</div>
<div class="temp-thermo-grid">
<div class="temp-thermo-card"><mdi-thermometer class="icon-lg" /><div><div class="temp-thermo-card-title">水银温度计</div><div class="temp-thermo-card-text">利用水银的热膨胀：温度升高，水银柱变长；水银柱的高度随温度线性变化。</div></div></div>
<div class="temp-thermo-card"><mdi-gauge class="icon-lg" /><div><div class="temp-thermo-card-title">气体温度计</div><div class="temp-thermo-card-text">利用气体的压强随温度变化：用气体的压强表示温度。</div></div></div>
</div>
<div v-click="1" class="tip-hint">温度计都要先标定：把测温属性与已知温度对应起来，才能读出温度。</div>
</div>

---
layout: base-flex
title: 形形色色的温度计
clicks: 1
clickAnimation: none
---

# 形形色色的温度计

<div class="page-grow">
<div class="ask">除了水银温度计，还有哪些温度计？它们各利用什么测温属性？</div>
<div class="temp-thermo-grid">
<div class="temp-thermo-card"><mdi-thermometer-lines class="icon-lg" /><div><div class="temp-thermo-card-title">双金属温度计</div><div class="temp-thermo-card-text">两种金属的线膨胀不同，温度变化时双金属片弯曲。</div></div></div>
<div class="temp-thermo-card"><mdi-pulse class="icon-lg" /><div><div class="temp-thermo-card-title">热电偶</div><div class="temp-thermo-card-text">不同导体组成回路，温度差产生电动势；可测 <Latex tex="3000\ \text{°C}" /> 至接近绝对零度。</div></div></div>
<div class="temp-thermo-card"><mdi-gauge class="icon-lg" /><div><div class="temp-thermo-card-title">电阻温度计</div><div class="temp-thermo-card-text">利用金属电阻随温度变化；铂电阻温度计最精确。</div></div></div>
<div class="temp-thermo-card"><mdi-waveform class="icon-lg" /><div><div class="temp-thermo-card-title">热敏电阻</div><div class="temp-thermo-card-text">半导体电阻随温度变化；稳定性较差，精度较低。</div></div></div>
</div>
<div v-click="1" class="tip-hint">不同的温度计利用不同的测温属性，测量范围和精度也不同。</div>
</div>
