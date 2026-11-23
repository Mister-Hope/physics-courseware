---
theme: default
title: "常见传感器的工作原理及应用"
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
chapter-no: "5.2"
chapter: "第五章 传感器"
---

<CoverDecorationSvg />

---
title: 这些器件把什么量变成什么电学量？
clicks: 5
clickAnimation: none
---

<div class="page-grow">
<div class="ask ask-lead"><mdi-help-circle-outline class="icon-md" /> 光、温度、力、磁场——这些器件分别把哪一个量，变成了什么电学量？</div>
<div class="cs-intro-grid">
<div class="cs-device">
<div class="cs-device-icon"><mdi-weather-sunny class="icon-lg" /></div>
<div class="cs-device-name">光敏电阻</div>
<div class="cs-device-io"><span>光强</span><span>→</span><span class="cs-io-out" v-click="1">电阻</span></div>
</div>
<div class="cs-device">
<div class="cs-device-icon"><mdi-thermometer class="icon-lg" /></div>
<div class="cs-device-name">热敏电阻</div>
<div class="cs-device-io"><span>温度</span><span>→</span><span class="cs-io-out" v-click="2">电阻</span></div>
</div>
<div class="cs-device">
<div class="cs-device-icon"><mdi-weight class="icon-lg" /></div>
<div class="cs-device-name">电阻应变片</div>
<div class="cs-device-io"><span>形变</span><span>→</span><span class="cs-io-out" v-click="3">电阻</span></div>
</div>
<div class="cs-device">
<div class="cs-device-icon"><mdi-magnet class="icon-lg" /></div>
<div class="cs-device-name">霍尔元件</div>
<div class="cs-device-io"><span>磁场</span><span>→</span><span class="cs-io-out" v-click="4">电压</span></div>
</div>
</div>
<div class="tip-hint" v-click="5">三个器件把非电学量转换成电阻，霍尔元件把磁感应强度转换成电压。</div>
</div>

---
title: 光敏电阻由什么组成？
clicks: 1
clickAnimation: none
---

# 光敏电阻

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><LightSensorSvg show-badges /></div>
<div class="stack">
<div class="ask">它由哪几部分组成？两条电极为什么做成梳状、又互不相连？</div>
<div class="cs-point"><span class="cs-no">1</span><div class="cs-point-body"><strong>硫化镉</strong>（半导体）涂在绝缘板上，这是对光敏感的材料。</div></div>
<div class="cs-point"><span class="cs-no">2</span><div class="cs-point-body">表面有两条互不相连的<strong>梳状银电极</strong>，电流只能从一条电极穿过硫化镉到另一条。</div></div>
<div class="cs-point"><span class="cs-no">3</span><div class="cs-point-body">整片器件固定在<strong>绝缘基板</strong>上，两端引出接线。</div></div>
<div class="tip-hint" v-click="1">光敏电阻把光照的强弱转换成电阻的大小。</div>
</div>
</div>
</div>

---
title: 光照为什么能让电阻变小？
clicks: 3
clickAnimation: none
---

# 光照为什么能让电阻变小？

<div class="page-grow">
<div class="cs-two-figs">
<div class="cs-state">
<div class="cs-state-title">无光照</div>
<div class="figure cs-fig-narrow"><LightSensorSvg :show-light="false" :carriers="3" /></div>
<div class="cs-state-note" v-click="1">半导体中的载流子极少，几乎不导电，电阻很大（暗电阻）。</div>
</div>
<div class="cs-state">
<div class="cs-state-title">光照增强</div>
<div class="figure cs-fig-narrow"><LightSensorSvg :carriers="14" /></div>
<div class="cs-state-note" v-click="2">光子把更多电子激发成载流子，导电能力变强，电阻变小（亮电阻）。</div>
</div>
</div>
<div class="tip-hint" v-click="3">光越强，载流子越多，导电能力越强，电阻越小。</div>
</div>

---
title: 怎样测量光敏电阻的阻值？
clicks: 1
clickAnimation: none
---

# 实验：观察光敏电阻的特性

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="step-list">
<div class="step-item"><span class="step-no">1</span><div>多用电表选 <Latex tex="\times 100" /> 电阻挡。</div></div>
<div class="step-item"><span class="step-no">2</span><div>红、黑表笔分别接光敏电阻的两端，读出指针示数。</div></div>
<div class="step-item"><span class="step-no">3</span><div>依次测量阳光直射、室内自然光、手掌遮光三种情况。</div></div>
</div>
<div class="mini-note">电阻挡内部接有电池，表笔两端给光敏电阻加上电压，表头测出通过它的电流、换算成阻值。</div>
<div class="mini-note">对照：刮去漆层的普通电阻在阳光下阻值几乎不变——对光敏感的是硫化镉这种半导体材料。</div>
</div>
<div class="stack stack-tight">
<table class="data-table p5-table">
<thead>
<tr><th>光照条件</th><th>阻值 <Latex tex="R" />（约）</th></tr>
</thead>
<tbody>
<tr><td>阳光直射</td><td><Latex tex="1\ \text{k}\Omega" /></td></tr>
<tr><td>室内自然光</td><td><Latex tex="20\ \text{k}\Omega" /></td></tr>
<tr><td>手掌遮光</td><td><Latex tex="1\ \text{M}\Omega" /></td></tr>
</tbody>
</table>
<div class="mini-note">某型号光敏电阻的示意数据。</div>
<div class="tip-hint" v-click="1">光强越强，阻值越小；暗电阻比亮电阻大得多。</div>
</div>
</div>
</div>

---
title: 流水线上的物品怎样被计数？
clicks: 3
clickAnimation: none
---

# 流水线上的物品怎样被计数？

<div class="page-grow">
<div class="cs-two-figs">
<div class="cs-state">
<div class="cs-state-title">没有物品挡光</div>
<div class="figure cs-fig-narrow"><ConveyorCounterSvg /></div>
<div class="cs-state-note" v-click="1">光照强 → 光敏电阻 <Latex tex="R" /> 小 → 信号处理系统电压低。</div>
</div>
<div class="cs-state">
<div class="cs-state-title">物品挡住光束</div>
<div class="figure cs-fig-narrow"><ConveyorCounterSvg blocked /></div>
<div class="cs-state-note" v-click="2">光照弱 → <Latex tex="R" /> 大 → 信号处理系统电压高。</div>
</div>
</div>
<div class="tip-hint" v-click="3">光束被挡一次，电压就由低变高一次；数出高电平的次数，就数出了物品的个数。</div>
</div>

---
title: 温度会怎样改变电阻？
clicks: 3
clickAnimation: none
---

# 温度会怎样改变电阻？

<div class="page-grow">
<div class="split-wide">
<div class="p7-graph">
<CoordAxes
  :x-range="[0, 10]"
  :y-range="[0, 12]"
  :x-axis="{ quantity: 'T', unit: '℃' }"
  :y-axis="{ quantity: 'R' }"
  :ticks="{ labels: false }"
  :step="$clicks"
  :curves="[
    { formula: (t) => 2.3 + 0.46 * t, color: 'var(--c-accent-2)', width: 3, showAt: 1 },
    { formula: (t) => 11.6 * Math.exp(-0.215 * t), color: 'var(--c-accent)', width: 3, showAt: 2 }
  ]"
  :labels="[
    { x: 7.2, y: 6.4, tex: '\\text{金属}', color: 'var(--c-accent-2)', anchor: 'left', showAt: 1 },
    { x: 7.2, y: 2.6, tex: '\\text{半导体热敏电阻}', color: 'var(--c-accent)', anchor: 'left', showAt: 2 }
  ]"
/>
</div>
<div class="stack">
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body"><strong>金属热电阻</strong>：电阻率随温度升高而增大，<Latex tex="R" /> 变大。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body"><strong>半导体热敏电阻</strong>：温度升高，导电能力增强，<Latex tex="R" /> 明显变小。</div></div>
<div class="tip-hint" v-click="3">热敏电阻按温度系数分两类：负温度系数 NTC（本节重点）与正温度系数 PTC。</div>
</div>
</div>
</div>
