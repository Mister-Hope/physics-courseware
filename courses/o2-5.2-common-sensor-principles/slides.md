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

# 光敏电阻由什么组成？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><LightSensorSvg show-badges /></div>
<div class="stack">
<div class="cs-point"><span class="cs-no">1</span><div class="cs-point-body"><strong>硫化镉</strong>（半导体）涂在绝缘板上，是对光敏感的材料。</div></div>
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

---
title: 热敏电阻的阻值随温度怎样变化？
clicks: 3
clickAnimation: none
---

# 热敏电阻的阻值随温度怎样变化？

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="mini-title">某型号 NTC 热敏电阻</div>
<table class="data-table p8-table">
<thead>
<tr><th><Latex tex="T\ /\ ^{\circ}\mathrm{C}" /></th><th><Latex tex="20" /></th><th><Latex tex="40" /></th><th><Latex tex="60" /></th><th><Latex tex="80" /></th></tr>
</thead>
<tbody>
<tr><td><Latex tex="R\ /\ \mathrm{k}\Omega" /></td><td><Latex tex="12.2" /></td><td><Latex tex="5.8" /></td><td><Latex tex="3.0" /></td><td><Latex tex="1.7" /></td></tr>
</tbody>
</table>
<div class="mini-note"><Latex tex="25\ ^{\circ}\mathrm{C}" /> 时约 <Latex tex="10\ \mathrm{k}\Omega" />；示意数据，不同型号有差异。</div>
</div>
<div class="stack">
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body">温度每升高 <Latex tex="20\ ^{\circ}\mathrm{C}" />，阻值大约减小一半。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body"><strong>铂热电阻 Pt100</strong><br /><Latex tex="0\to 100\ ^{\circ}\mathrm{C}" /> 时，<Latex tex="100\to 138.5\ \Omega" /><br />只增大到约 <Latex tex="1.4" /> 倍。</div></div>
<div class="tip-hint" v-click="3">半导体热敏电阻对温度变化灵敏得多；金属热电阻化学稳定性好、测温范围大，但灵敏度较低。</div>
</div>
</div>
</div>

---
title: 液面低到一定程度，灯为什么会亮？
clicks: 3
clickAnimation: none
---

# 液面低到一定程度，灯为什么会亮？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><OilLevelAlarmSvg :low="$clicks >= 2" /></div>
<div class="stack">
<div class="mini-note">热敏电阻通电后自身会发热。</div>
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body"><strong>液面高</strong>：油把热量带走，探头温度基本不变，<Latex tex="R" /> 较大，电流小，灯不亮。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body"><strong>液面低</strong>：探头露出，散热变差，温度升高，<Latex tex="R" /> 明显减小，电流增大，灯亮。</div></div>
<div class="summary-line" v-click="3">热敏电阻把液面高低<br />转换成电流大小</div>
</div>
</div>
</div>

---
title: 拉伸或压缩，为什么能改变电阻？
clicks: 3
clickAnimation: none
---

# 拉伸或压缩，为什么能改变电阻？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><StrainGaugeSvg :step="$clicks" /></div>
<div class="stack">
<div class="cs-formula"><Latex tex="R=\rho\frac{L}{S}" display /></div>
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body"><strong>拉伸</strong>：金属丝变长、变细，<Latex tex="R" /> 变大。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body"><strong>压缩</strong>：金属丝变短、变粗，<Latex tex="R" /> 变小。</div></div>
<div class="tip-hint" v-click="3">金属丝应变片利用金属电阻应变效应；半导体应变片利用压阻效应，灵敏度更高。</div>
</div>
</div>
</div>

---
title: 电子秤怎样把重力变成电信号？
clicks: 3
clickAnimation: none
---

# 电子秤怎样把重力变成电信号？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><ForceSensorSvg :bent="$clicks >= 1" /></div>
<div class="stack">
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body">力 <Latex tex="F" /> 使梁弯曲：上表面被拉伸，下表面被压缩。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body">上应变片 <Latex tex="R" /> 变大，下应变片 <Latex tex="R" /> 变小。</div></div>
<div class="cs-point" v-click="3"><span class="cs-no">3</span><div class="cs-point-body">电流恒定时，上片电压变大、下片电压变小，输出两电压之差 <Latex tex="\Delta U" />。</div></div>
<div class="tip-hint" v-click="3"><Latex tex="F" /> 越大，<Latex tex="\Delta U" /> 越大；电子秤、测牵引力都用到力传感器。</div>
</div>
</div>
</div>

---
title: 怎样把位移变成电信号？
clicks: 3
clickAnimation: none
---

# 怎样把位移变成电信号？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><CapacitiveSensorSvg :shift="$clicks >= 1 ? 60 : 0" /></div>
<div class="stack">
<div class="cs-formula"><Latex tex="C=\frac{\varepsilon_r S}{4\pi k d}" display /></div>
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body">物体位移，电介质板在极板间移动，<Latex tex="C" /> 随之改变。</div></div>
<div class="ask" v-click="2">用什么方法可以检测电容的变化？</div>
<div class="cs-point" v-click="3"><span class="cs-no">2</span><div class="cs-point-body">用多用电表的电容挡直接测量；或把电容接入交流电路，由电流、电压的变化来检测。</div></div>
</div>
</div>
</div>

---
title: 磁场中的通电导体，两侧为什么会有电压？
clicks: 3
clickAnimation: none
---

# 磁场中的通电导体，两侧为什么会有电压？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><HallEffectSvg :step="$clicks" /></div>
<div class="stack">
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body">载流子随电流定向移动，在磁场中受洛伦兹力，向导体的一侧偏转。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body">一侧积累电荷、另一侧带异种电荷，两侧面之间出现电势差 <Latex tex="U_H" />。</div></div>
<div class="cs-point" v-click="3"><span class="cs-no">3</span><div class="cs-point-body">这个现象叫作<strong>霍尔效应</strong>，<Latex tex="U_H" /> 叫作霍尔电压。</div></div>
</div>
</div>
</div>

---
title: 霍尔元件为什么能测磁感应强度？
clicks: 3
clickAnimation: none
---

# 霍尔元件为什么能测磁感应强度？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><HallElementSvg /></div>
<div class="stack">
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body">E、F 间通恒定电流 <Latex tex="I" />，磁场 <Latex tex="B" /> 垂直穿过半导体薄片。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body">M、N 之间出现霍尔电压 <Latex tex="U_H" />。</div></div>
<div class="cs-point" v-click="3"><span class="cs-no">3</span><div class="cs-point-body"><Latex tex="U_H" /> 与 <Latex tex="B" /> 成正比：由 <Latex tex="U_H" /> 就能读出 <Latex tex="B" /> 的大小和方向。</div></div>
<div class="tip-hint" v-click="3">半导体薄片的霍尔效应更强</div>
</div>
</div>
</div>

---
title: 怎样用霍尔元件测量微小位移？
clicks: 3
clickAnimation: none
---

# 怎样用霍尔元件测量微小位移？

<div class="page-grow">
<div class="cs-split">
<div class="cs-split-fig"><HallDisplacementSvg /></div>
<div class="stack">
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body">两块磁感应强度相同的磁体同极相对，中间位置 <Latex tex="B=0" />。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body">元件沿 <Latex tex="z" /> 轴移动，所在处的 <Latex tex="B" /> 与位移成正比。</div></div>
<div class="cs-point" v-click="3"><span class="cs-no">3</span><div class="cs-point-body"><Latex tex="U_H" /> 与位移成正比：测出 <Latex tex="U_H" /> 就知道微小位移。</div></div>
<div class="tip-hint" v-click="3">测转速、测磁场方向，也用到霍尔元件。</div>
</div>
</div>
</div>

---
title: 课堂练习：它们各把什么量变成什么量？
clicks: 5
clickAnimation: none
---

# 课堂练习：它们各把什么量变成什么量？

<div class="page-grow">
<div class="mini-note">补全表中各传感器的输入、输出物理量。</div>
<table class="data-table p16-table">
<thead>
<tr><th>传感器</th><th>输入物理量</th><th>输出物理量</th></tr>
</thead>
<tbody>
<tr><td>光敏电阻</td><td><span v-click="1">光照强弱</span></td><td><span v-click="1">电阻</span></td></tr>
<tr><td>热敏电阻</td><td><span v-click="2">温度</span></td><td><span v-click="2">电阻</span></td></tr>
<tr><td>金属热电阻</td><td><span v-click="3">温度</span></td><td><span v-click="3">电阻</span></td></tr>
<tr><td>电阻应变片</td><td><span v-click="4">形变</span></td><td><span v-click="4">电阻</span></td></tr>
<tr><td>电容式位移传感器</td><td><span v-click="5">位移</span></td><td><span v-click="5">电容</span></td></tr>
</tbody>
</table>
</div>

---
layout: exercise-split
title: 练习：电感式微小位移传感器
clicks: 3
clickAnimation: none
---

<template v-slot:stem>
图 5.2-14 是一种电感式微小位移传感器的原理图。1 是待测位移的物体，3 是空心线圈，软铁芯 2 插在线圈中，并随物体左右平移。
（1）说明这种传感器的工作原理。
（2）设计一个与线圈 3 相连的电路，使物体的位移能反映为电学量的变化。
</template>

<template v-slot:fig>
<div class="p17-fig"><InductorSensorSvg /></div>
</template>

<div class="stack">
<div class="cs-point" v-click="1"><span class="cs-no">1</span><div class="cs-point-body">物体左右移动，软铁芯插入深度改变，<br />线圈的自感系数 <Latex tex="L" /> 随之改变。</div></div>
<div class="cs-point" v-click="2"><span class="cs-no">2</span><div class="cs-point-body">把线圈与交流电源、电流表串联：<Latex tex="L" /> 越大，感抗 <Latex tex="X_L=2\pi fL" /> 越大，电流越小。</div></div>
<div class="cs-point" v-click="3"><span class="cs-no">3</span><div class="cs-point-body">电流表示数随位移变化，<br />就能测出位移。</div></div>
</div>

---
layout: exercise-split
analysisLabel: 答案
title: 练习：电饭锅的自动断电
clicks: 4
clickAnimation: none
---

<template v-slot:stem>
电饭锅中的感温铁氧体在常温下具有铁磁性，能被磁体吸引；温度升高到约 <Latex tex="103\ ^{\circ}\mathrm{C}" />（居里点）时，铁磁性消失，不能被磁体吸引。
（1）开始煮饭时，为什么要按下开关按钮？松手后按钮为什么能保持？
（2）水沸腾后，只要锅内有水，锅底温度为什么不会升高？
（3）饭熟后水被吸收，锅底温度怎样变化？电饭锅会自动发生哪些动作？
（4）用电饭锅烧水，水沸腾后能自动断电吗？
</template>

<div class="stack stack-tight">
<div class="p18-ans" v-click="1"><span class="p18-no">（1）</span>按下按钮时磁体吸住铁氧体，电路接通；常温下铁氧体有铁磁性，松手后靠磁力保持。</div>
<div class="p18-ans" v-click="2"><span class="p18-no">（2）</span>水沸腾时温度保持 <Latex tex="100\ ^{\circ}\mathrm{C}" />，锅底温度低于居里点。</div>
<div class="p18-ans" v-click="3"><span class="p18-no">（3）</span>水被吸收后锅底温度升到约 <Latex tex="103\ ^{\circ}\mathrm{C}" />，铁氧体失去铁磁性，磁体脱离、触点断开，自动断电。</div>
<div class="p18-ans" v-click="4"><span class="p18-no">（4）</span>不能。水沸腾时温度保持 <Latex tex="100\ ^{\circ}\mathrm{C}" />，达不到 <Latex tex="103\ ^{\circ}\mathrm{C}" />。</div>
</div>

---
title: 这一节：传感器怎样把非电学量变成电信号？
clickAnimation: none
---

# 这一节：传感器怎样把非电学量变成电信号？

<div class="page-grow">
<div class="cs-chain">
<div class="cs-chain-node"><strong>被测量</strong><span>光照 · 温度 · 形变 · 磁场</span></div>
<span class="cs-chain-arrow">→</span>
<div class="cs-chain-node"><strong>敏感元件</strong><span>电阻 · 电容 · 霍尔电压</span></div>
<span class="cs-chain-arrow">→</span>
<div class="cs-chain-node"><strong>转换电路</strong><span>电流 · 电压</span></div>
<span class="cs-chain-arrow">→</span>
<div class="cs-chain-node"><strong>可用电信号</strong><span>测量 · 控制</span></div>
</div>
<div class="p19-devices">
<div class="p19-chip"><mdi-weather-sunny class="icon-md" /><div><strong>光敏电阻</strong><br />光照 → 电阻</div></div>
<div class="p19-chip"><mdi-thermometer class="icon-md" /><div><strong>热敏电阻</strong><br />温度 → 电阻</div></div>
<div class="p19-chip"><mdi-weight class="icon-md" /><div><strong>电阻应变片</strong><br />形变 → 电阻</div></div>
<div class="p19-chip"><mdi-magnet class="icon-md" /><div><strong>霍尔元件</strong><br />磁场 → 电压</div></div>
</div>
<div class="summary-line">四种敏感元件分别把光照、温度、形变、磁场转换成电阻或电压，<br />再由转换电路变成可用的电信号。</div>
</div>

---
title: 传感器怎样让设备自动动作？
clicks: 1
clickAnimation: none
---

# 传感器怎样让设备自动动作？

<div class="page-grow">
<div class="cs-chain">
<div class="cs-chain-node"><strong>传感器</strong><span>非电学量 → 电学量</span></div>
<span class="cs-chain-arrow">→</span>
<div class="cs-chain-node"><strong>控制器</strong><span>比较 · 放大</span></div>
<span class="cs-chain-arrow">→</span>
<div class="cs-chain-node"><strong>执行器</strong><span>继电器 · 电动机</span></div>
<span class="cs-chain-arrow">→</span>
<div class="cs-chain-node"><strong>被控对象</strong><span>灯 · 加热器</span></div>
</div>
<div class="tip-hint" v-click="1">光控路灯：光敏电阻感知天黑，控制电路使继电器闭合，路灯自动点亮。</div>
<div class="summary-line" v-click="1">自动控制装置 = 传感器 + 控制器 + 执行器</div>
</div>
