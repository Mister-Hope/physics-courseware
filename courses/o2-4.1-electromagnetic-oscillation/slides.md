---
theme: default
title: "电磁振荡"
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
chapter-no: "4.1"
chapter: "第四章 电磁振荡与电磁波"
---

<CoverDecorationSvg />

---
title: 怎样得到持续变化的电流？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div class="stack">
<div class="ask ask-lead">要向外发射电磁波，<br />电路里需要什么样的电流？</div>
<div v-click="1" class="mini-title">大小和方向都随时间迅速变化的电流</div>
<div v-click="2" class="step-line">电容器不断充电、放电，电路里就有变化的电流。</div>
</div>
<div style="width: 100%">
<LcCircuitSvg :quarter="0" :switch-closed="false" />
</div>
</div>
</div>

---
title: 观察电容器两端的电压
clicks: 2
clickAnimation: none
---

# 观察电容器两端的电压

<div class="page-grow">
<div class="half-grid" style="align-items: center">
<div style="max-width: 400px; margin: 0 auto">
<LcCircuitSvg :quarter="$clicks * 0.5" :switch-closed="$clicks >= 1" />
<div class="mini-note" style="text-align: center">电容器两端接电压传感器，示波器显示 <Latex tex="u" />–<Latex tex="t" /> 图像</div>
</div>
<div class="stack">
<div class="step-line">① 先给电容器充电，开关保持断开</div>
<div v-click="1" class="step-line">② 闭合开关，电容器通过线圈放电</div>
<div v-click="2" class="step-line">③ 放电完毕时，极板电荷为零、电流最大</div>
</div>
</div>
</div>

---
title: 示波器记录到的电压图像
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 3.15]
y-range: [-1.15, 1.15]
x-axis: { quantity: t, side: below }
y-axis: { quantity: u }
view: { width: 470, height: 320 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.cos(2 * Math.PI * t) * Math.exp(-0.5 * t)
    samples: 180
    color: var(--c-accent)
    width: 2.8
```
</div>
<div class="stack">
<div class="ask">示波器记录到的 <Latex tex="u" />–<Latex tex="t" /> 图像<br />说明了什么？</div>
<div v-click="1" class="step-line">电压时正时负：极板电荷的极性在反复改变。</div>
<div v-click="2" class="step-line">电压大小不断变化：电路中的电流也在不断变化。</div>
<div v-click="3" class="step-line">振幅逐渐减小：能量在不断损耗。</div>
</div>
</div>
</div>

---
title: 振荡电流与振荡电路
---

# 振荡电流与振荡电路

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); align-items: center">
<div class="stack">
<DefinitionBox term="振荡电流"><div>大小和方向都做<span class="def-term">周期性迅速变化</span>的电流。</div></DefinitionBox>
<DefinitionBox term="振荡电路" tone="blue"><div>能够产生<span class="def-term">振荡电流</span>的电路。</div></DefinitionBox>
</div>
<div style="width: 100%">
<LcCircuitSvg :quarter="0" :switch-closed="false" />
<div class="mini-note" style="text-align: center">由线圈 <Latex tex="L" /> 和电容器 <Latex tex="C" /> 组成，是最简单的振荡电路</div>
</div>
</div>
</div>

---
title: 闭合开关的瞬间
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<LcCircuitSvg :quarter="Math.max(0, $clicks - 1) * 0.5" :switch-closed="$clicks >= 1" />
</div>
<div class="stack">
<div class="ask">闭合开关的瞬间，电流有多大？</div>
<div v-click="1" class="step-line">电流为零：自感电动势阻碍电流增大。</div>
<div v-click="2" class="step-line">电流逐渐增大，极板电荷减少。</div>
<div v-click="3" class="step-line">放电完毕：电荷为零，电流最大。</div>
</div>
</div>
</div>

---
title: 反向充电
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<LcCircuitSvg :quarter="1 + Math.max(0, $clicks - 1) * 0.5" :switch-closed="true" />
</div>
<div class="stack">
<div class="ask">放电完毕，电流会立刻消失吗？</div>
<div v-click="1" class="step-line">不会：自感使电流沿原方向继续流动。</div>
<div v-click="2" class="step-line">电容器被反向充电，极板带异种电荷。</div>
<div v-click="3" class="step-line">充电完毕：电流为零，电荷最多。</div>
</div>
</div>
</div>

---
title: 电磁振荡
clicks: 4
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); align-items: center">
<div style="width: 100%">
<LcCircuitSvg :quarter="[2, 2.5, 3, 4, 4][$clicks]" :switch-closed="true" />
</div>
<div class="stack">
<div class="ask">此后会发生什么？</div>
<div v-click="1" class="step-line">电容器再放电，电流反向增大。</div>
<div v-click="2" class="step-line">放电完毕：电荷为零，电流反向最大。</div>
<div v-click="3" class="step-line">再充电完毕，又回到最初的状态。</div>
<div v-click="4"><DefinitionBox term="电磁振荡"><div>振荡电流、极板上的电荷量、电容器里的电场、线圈里的磁场都发生<span class="def-term">周期性变化</span>的现象。</div></DefinitionBox></div>
</div>
</div>
</div>

---
title: 电荷量与电流随时间的变化
clicks: 4
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 4.3]
y-range: [-1.2, 1.2]
x-axis: { quantity: t, side: below }
view: { width: 480, height: 330 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.cos(Math.PI / 2 * t)
    samples: 240
    color: var(--c-accent)
    width: 2.8
  - formula: t => Math.sin(Math.PI / 2 * t)
    samples: 240
    color: var(--c-accent-2)
    width: 2.8
```
</div>
<div class="stack">
<div class="curve-legend">
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent)"></span>电荷量 <Latex tex="q" /></span>
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent-2)"></span>电流 <Latex tex="i" /></span>
</div>
<div class="ask"><Latex tex="q" /> 和 <Latex tex="i" /> 随时间怎样变化？</div>
<div v-click="1" class="step-line">不计能量损耗时，二者都按正弦规律变化，周期相同。</div>
<div v-click="2" class="step-line"><Latex tex="q" /> 最大时，<Latex tex="i" /> 为零。</div>
<div v-click="3" class="step-line"><Latex tex="q" /> 为零时，<Latex tex="i" /> 最大。</div>
<div v-click="4" class="step-line"><Latex tex="u" />–<Latex tex="t" /> 图像与 <Latex tex="q" />–<Latex tex="t" /> 图像形状相同。</div>
</div>
</div>
</div>

---
title: 电场能与磁场能
clicks: 4
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 4.3]
y-range: [0, 1.12]
x-axis: { quantity: t, side: below }
y-axis: { quantity: E }
view: { width: 480, height: 330 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.cos(Math.PI / 2 * t) ** 2
    samples: 240
    color: var(--c-accent)
    width: 2.8
  - formula: t => Math.sin(Math.PI / 2 * t) ** 2
    samples: 240
    color: var(--c-accent-2)
    width: 2.8
  - formula: t => 1
    samples: 2
    color: var(--c-text-dim)
    width: 1.6
    dashed: true
```
</div>
<div class="stack">
<div class="curve-legend">
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent)"></span>电场能</span>
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent-2)"></span>磁场能</span>
<span class="legend-item"><span class="legend-swatch" style="background: repeating-linear-gradient(90deg, var(--c-text-dim) 0 7px, transparent 7px 12px)"></span>总能量</span>
</div>
<div class="ask ask-lead">电场能和磁场能怎样转化？</div>
<div v-click="1" class="step-line">电场能与磁场能此消彼长。</div>
<div v-click="2" class="step-line">无能量损耗时，两者之和保持不变。</div>
<div v-click="3" class="step-line">电场能最大时，<Latex tex="q" /> 最大、<Latex tex="i" /> 为零。</div>
<div v-click="4" class="step-line">磁场能最大时，<Latex tex="i" /> 最大、<Latex tex="q" /> 为零。</div>
</div>
</div>
</div>

---
title: 阻尼振荡与等幅振荡
clicks: 4
clickAnimation: none
---

# 阻尼振荡与等幅振荡

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 9.2]
y-range: [-1.15, 1.15]
x-axis: { quantity: t, side: below }
y-axis: { quantity: u }
view: { width: 480, height: 330 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.cos(Math.PI / 2 * t) * Math.exp(-0.22 * t)
    samples: 400
    color: var(--c-accent)
    width: 2.8
  - formula: t => Math.cos(Math.PI / 2 * t)
    samples: 240
    color: var(--c-accent-2)
    width: 2
    dashed: true
```
</div>
<div class="stack">
<div class="curve-legend">
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent)"></span>实际电路</span>
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent-2)"></span>无能量损耗</span>
</div>
<div class="ask">实际的 LC 回路能一直振荡吗？</div>
<div v-click="1" class="step-line">不能，电阻会把能量变成内能。</div>
<div v-click="2" class="step-line">振荡电路还会辐射电磁波。</div>
<div v-click="3" class="step-line">振幅逐渐减小——阻尼振荡。</div>
<div v-click="4" class="step-line">补充能量可得到等幅振荡。</div>
</div>
</div>
</div>

---
title: 周期与频率
clicks: 3
clickAnimation: none
---

# 周期与频率

<div class="page-grow">
<div class="half-grid" style="align-items: center">
<DefinitionBox term="周期 T"><div>完成一次<span class="def-term">周期性变化</span>所需的时间。</div></DefinitionBox>
<DefinitionBox term="频率 f" tone="blue"><div>单位时间内完成<span class="def-term">周期性变化</span>的次数。</div></DefinitionBox>
</div>
<div class="ask" style="text-align: center">周期和频率有什么关系？</div>
<div v-click="1" style="display: flex; justify-content: center; padding: 0.2rem 0">
<Latex tex="f = \dfrac{1}{T}" display />
</div>
<div v-click="2" class="step-line" style="text-align: center">周期单位是秒（<Latex tex="\text{s}" />），频率单位是赫兹（<Latex tex="\text{Hz}" />）。</div>
<div v-click="3" class="tip-hint">由电路自身决定的周期和频率，叫固有周期和固有频率。</div>
</div>

---
title: 固有周期由什么决定
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask ask-lead">LC 回路的固有周期由什么决定？</div>
<div class="half-grid" style="align-items: start">
<div class="stack-tight">
<div class="mini-title">电容 <Latex tex="C" /> 越大</div>
<div v-click="1" class="step-line">充电、放电所需的时间越长。</div>
</div>
<div class="stack-tight">
<div class="mini-title">电感 <Latex tex="L" /> 越大</div>
<div v-click="2" class="step-line">自感作用越强，电流变化越慢。</div>
</div>
</div>
<div v-click="3" class="half-grid" style="align-items: center; justify-items: center">
<Latex tex="T = 2\pi\sqrt{LC}" display />
<Latex tex="f = \dfrac{1}{2\pi\sqrt{LC}}" display />
</div>
</div>

---
title: 改变电感或电容
clicks: 0
clickAnimation: none
---

# 改变电感或电容

<div class="page-grow">
<LcPeriodLab />
</div>

---
layout: exercise-split
title: 例题：LC 电路的频率范围
clicks: 4
---

<template v-slot:stem>

线圈的自感系数为 $30\ \mu\text{H}$，可调电容器的电容范围为 $1.2 \sim 270\ \text{pF}$。求振荡电路的频率范围。

</template>

<div v-click="1" class="step-line">由 <Latex tex="f = \dfrac{1}{2\pi\sqrt{LC}}" /> 可知：<Latex tex="C" /> 越小，<Latex tex="f" /> 越大。</div>
<div v-click="2" class="step-line"><Latex tex="C_1 = 1.2\ \text{pF}" /> 时，<Latex tex="f_1 = \dfrac{1}{2\pi\sqrt{30 \times 10^{-6} \times 1.2 \times 10^{-12}}}\ \text{Hz} = 2.65 \times 10^{7}\ \text{Hz}" /></div>
<div v-click="3" class="step-line"><Latex tex="C_2 = 270\ \text{pF}" /> 时，<Latex tex="f_2 = \dfrac{1}{2\pi\sqrt{30 \times 10^{-6} \times 270 \times 10^{-12}}}\ \text{Hz} = 1.77 \times 10^{6}\ \text{Hz}" /></div>
<div v-click="4" class="key-lead" style="text-align: center">频率范围：<Latex tex="1.77 \times 10^{6} \sim 2.65 \times 10^{7}\ \text{Hz}" /></div>

---
layout: exercise-split
title: 练习：可调电容器的选台范围
clicks: 3
---

<template v-slot:stem>

某收音机中的 LC 电路，由固定线圈和可调电容器组成，能够产生 $535\ \text{kHz}$ 到 $1\ 605\ \text{kHz}$ 的电磁振荡。可调电容器的最大电容和最小电容之比是多少？

</template>

<div v-click="1" class="step-line">由 <Latex tex="f = \dfrac{1}{2\pi\sqrt{LC}}" /> 得 <Latex tex="C = \dfrac{1}{4\pi^{2} L f^{2}}" />：<Latex tex="L" /> 不变时，<Latex tex="C" /> 与 <Latex tex="f^{2}" /> 成反比。</div>
<div v-click="2" class="step-line"><Latex tex="\dfrac{C_{\text{max}}}{C_{\text{min}}} = \left( \dfrac{f_{\text{max}}}{f_{\text{min}}} \right)^{2} = \left( \dfrac{1.605 \times 10^{6}}{5.35 \times 10^{5}} \right)^{2} = 9" /></div>
<div v-click="3" class="key-lead" style="text-align: center">最大电容是最小电容的 9 倍。</div>

---
title: 电磁振荡的规律
clicks: 0
---

<div class="page-grow">
<div class="stack">
<div class="summary-line"><span class="key-lead">振荡电流</span>　大小和方向都做周期性迅速变化的电流。</div>
<div class="summary-line"><span class="key-lead">电荷量与电流</span>　<Latex tex="q" />、<Latex tex="u" />、<Latex tex="i" /> 都按正弦规律变化，<Latex tex="q" /> 最大时 <Latex tex="i" /> 为零。</div>
<div class="summary-line"><span class="key-lead">能量转化</span>　电场能与磁场能相互转化，无能量损耗时两者的总和不变。</div>
<div class="summary-line"><span class="key-lead">阻尼振荡</span>　实际电路有电阻和电磁波辐射，振幅逐渐减小；补充能量可得等幅振荡。</div>
<div class="summary-line"><span class="key-lead">固有周期与频率</span>　<Latex tex="T = 2\pi\sqrt{LC}" />，<Latex tex="f = \dfrac{1}{2\pi\sqrt{LC}}" />，由 <Latex tex="L" />、<Latex tex="C" /> 决定。</div>
</div>
</div>

---
title: 电磁振荡与电磁波
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="stack" style="max-width: 780px; margin: 0 auto; text-align: center; align-items: center">
<div class="ask ask-lead">电路里的振荡电流，会在周围空间激起怎样的电场和磁场？</div>
<div v-click="1" class="mini-title">变化的电场和磁场会向外传播——下一节研究电磁波。</div>
<div v-click="2" class="tip-hint">4.2 电磁场与电磁波</div>
</div>
</div>
