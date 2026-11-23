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
<div class="ask ask-lead">要向外发射电磁波，电路里需要什么样的电流？</div>
<div v-click="1" class="mini-title">大小和方向都随时间迅速变化的电流</div>
<div v-click="2" class="half-grid" style="align-items: center">
<div class="stack-dense">
<div>电容器不断充电、放电，电路里就有变化的电流。</div>
<div>把电容器和线圈接成回路，充放电就能自动往复——<span class="key-lead">LC 回路</span>。</div>
</div>
<div style="max-width: 340px; margin: 0 auto">
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
