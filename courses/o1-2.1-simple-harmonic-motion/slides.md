---
theme: default
title: "简谐运动"
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
chapter: "第二章 机械振动"
subtitle: "弹簧振子的位移随时间怎样变化"
---

<CoverDecorationSvg />

---
clicks: 2
---

<div class="page-grow page-around">
<div class="ask ask-lead">钟摆的来回摆动、浮标的上下浮动、<br />扁担下物体的颤动、树梢在微风中的摇摆……<br />这些运动有什么共同点？</div>
<div v-click="1" class="mini-title">物体都在某一位置附近做往复运动</div>
<div v-click="2" class="tip-hint">物体或物体的一部分在某一位置附近的往复运动，叫<span class="def-term">机械振动</span>，简称振动。</div>
</div>

---
clicks: 3
title: 弹簧振子
---

<div class="page-grow">
<div class="ask">把小球拉向右方后放开，它会怎样运动？</div>
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); align-items: center">
<div class="stack">
<div class="step-line" v-click="1">小球套在光滑杆上，弹簧的质量、空气阻力都可以忽略。</div>
<div class="step-line" v-click="2">弹簧未形变时，小球所受合力为 <Latex tex="0" />，这个位置叫<span class="def-term">平衡位置</span>。</div>
<div class="step-line" v-click="3">放开后，小球就在平衡位置附近往复运动。</div>
</div>
<div style="width: 100%"><SpringOscillatorSvg :x="$clicks === 3 ? 0.72 : 0" /></div>
</div>
<div v-click="3" class="step-line">小球和弹簧组成的系统，叫<span class="def-term">弹簧振子</span>，是最简单的振动模型。</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">怎样才能记录下小球在不同时刻的位置？</div>
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.02fr); align-items: center">
<div class="stack">
<div class="step-line" v-click="1">频闪照相：每隔相等的时间照亮小球一次，底片上就留下它的一系列位置。</div>
<div class="step-line" v-click="2">铅笔沿振动方向来回画，白纸同时被匀速拖动，纸上留下一条曲线。</div>
<div class="step-line" v-click="3">描点连线，就得到位移随时间变化的图像。</div>
</div>
<div style="width: 100%"><PaperTraceSvg /></div>
</div>
</div>

---
clicks: 2
title: 位移—时间图像
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 2.2]
y-range: [-1.25, 1.25]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x }
view: { width: 470, height: 320 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.sin(Math.PI * t)
    samples: 300
    color: var(--c-accent)
    width: 2.8
```

</div>
<div class="stack">
<div class="ask">这条曲线告诉我们什么？</div>
<div v-click="1" class="step-line">小球的位置随时间周期性变化，曲线是一条正弦曲线。</div>
<div v-click="2" class="step-line">计时开始时位移为 <Latex tex="0" />，随后位移向正方向增大。</div>
</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow page-around">
<div class="ask ask-lead">位移与时间的关系遵从正弦函数规律、<br />振动图像是一条正弦曲线的振动，叫什么？</div>
<div v-click="1">

<DefinitionBox term="简谐运动">如果物体的位移与时间的关系遵从正弦函数的规律，即它的振动图像是一条正弦曲线，这样的振动叫简谐运动。</DefinitionBox>

</div>
<div v-click="2" class="mini-title">简谐运动是最基本的振动</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">振动图像就是小球的运动轨迹吗？</div>
<div class="half-grid" style="grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 2.2]
y-range: [-1.25, 1.25]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x }
view: { width: 440, height: 300 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.sin(Math.PI * t)
    samples: 300
    color: var(--c-accent)
    width: 2.6
```

</div>
<div class="stack">
<div v-click="1" class="step-line">不是。图像描述的是位移怎样随时间变化，横轴是时间。</div>
<div v-click="2" class="step-line">小球实际沿一条直线在平衡位置两侧往复运动。</div>
<div v-click="3" class="step-line">图上任一点的纵坐标是位移，不是小球所在的位置。</div>
</div>
</div>
</div>

---
clicks: 2
title: 竖直方向的弹簧振子
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%"><VerticalOscillatorSvg :displacement="$clicks === 2 ? -0.55 : 0" /></div>
<div class="stack">
<div class="step-line" v-click="1">轻质弹簧上端固定、下端悬挂钢球，组成竖直弹簧振子。</div>
<div class="step-line" v-click="2">钢球原来静止时的位置就是平衡位置；向上托起后释放，它上下振动。</div>
<div class="step-line" v-click="2">用相机每隔相等时间连拍，同样能画出 <Latex tex="x" />–<Latex tex="t" /> 图像。</div>
</div>
</div>
</div>

---
clicks: 4
title: 振幅
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.06fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 2.2]
y-range: [-1.3, 1.3]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x }
view: { width: 450, height: 300 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.sin(Math.PI * t)
    samples: 300
    color: var(--c-accent)
    width: 2.6
labels:
  - { x: 0.5, y: 1, tex: A, dot: true, halo: true }
  - { x: 1.5, y: -1, tex: "-A", dot: true, halo: true }
```

</div>
<div class="stack">
<div class="ask">振子离开平衡位置的最大距离，叫什么？</div>
<div v-click="1" class="mini-title">振幅 <Latex tex="A" /></div>
<div v-click="2" class="step-line">振幅是标量，表示振动的强弱。</div>
<div v-click="3" class="step-line">在 <Latex tex="x" />–<Latex tex="t" /> 图像上，振幅就是曲线偏离平衡位置的最大距离。</div>
<div v-click="4" class="step-line">振幅越大，振动越强。</div>
</div>
</div>
</div>

---
clicks: 4
title: 周期与频率
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.06fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 2.2]
y-range: [-1.45, 1.5]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x }
view: { width: 450, height: 320 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.sin(Math.PI * t)
    samples: 300
    color: var(--c-accent)
    width: 2.6
  - points: [{ x: 0, y: 0 }, { x: 0, y: 1.18 }, { x: 2, y: 1.18 }, { x: 2, y: 0 }]
    color: var(--c-text-dim)
    width: 1.5
    dashed: "7 5"
labels:
  - { x: 1, y: 1.36, tex: T, halo: true }
```

</div>
<div class="stack">
<div class="ask">振子完成一次完整振动，需要多长时间？</div>
<div v-click="1" class="step-line">完成一次完整振动所用的时间，叫<span class="def-term">周期</span> <Latex tex="T" />。</div>
<div v-click="2" class="step-line">单位时间内完成振动的次数，叫<span class="def-term">频率</span> <Latex tex="f" />。</div>
<div class="center" v-click="3"><Latex tex="f = \dfrac{1}{T}" display /></div>
<div v-click="4" class="step-line">周期用秒（<Latex tex="\text{s}" />），频率用赫兹（<Latex tex="\text{Hz}" />）。</div>
</div>
</div>
</div>

---
clicks: 4
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.04fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 2.2]
y-range: [-1.3, 1.3]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x }
view: { width: 440, height: 300 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.sin(Math.PI * t)
    samples: 300
    color: var(--c-accent)
    width: 2.6
```

</div>
<div class="stack">
<div class="ask">怎样从振动图像上读出位移和速度？</div>
<div v-click="1" class="step-line">纵坐标就是该时刻的位移：由平衡位置指向振子所在位置。</div>
<div v-click="2" class="step-line">曲线向上走，振子沿正方向运动；曲线向下走，沿负方向运动。</div>
<div v-click="3" class="step-line">平衡位置处速度最大，最大位移处速度为零。</div>
<div v-click="4" class="step-line">位移为正时，振子在平衡位置的正方向一侧。</div>
</div>
</div>
</div>

---
clicks: 4
title: 简谐运动的回复力
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%"><RestoringForceSvg /></div>
<div class="stack">
<div class="ask">振子为什么总会回到平衡位置？</div>
<div v-click="1" class="step-line">弹簧形变产生的力，总是指向平衡位置——叫<span class="def-term">回复力</span>。</div>
<div v-click="2" class="step-line">位移越大，回复力越大；方向总与位移相反。</div>
<div v-click="3" class="center"><Latex tex="F = -kx" display /></div>
<div v-click="4" class="step-line">这个力随位移变化，所以简谐运动是变加速运动。</div>
</div>
</div>
</div>

---
clicks: 4
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 2.2]
y-range: [0, 1.15]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: E }
view: { width: 450, height: 300 }
ticks: { x: [], y: [], labels: false }
curves:
  - formula: t => Math.cos(Math.PI * t) ** 2
    samples: 300
    color: var(--c-accent)
    width: 2.6
  - formula: t => Math.sin(Math.PI * t) ** 2
    samples: 300
    color: var(--c-accent-2)
    width: 2.6
  - points: [{ x: 0, y: 1 }, { x: 2.2, y: 1 }]
    color: var(--c-text-dim)
    width: 1.6
    dashed: "7 5"
```

</div>
<div class="stack">
<div class="ask">振子的能量怎样转化？</div>
<div v-click="1" class="curve-legend">
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent)"></span>动能</span>
<span class="legend-item"><span class="legend-swatch" style="background: var(--c-accent-2)"></span>弹性势能</span>
<span class="legend-item"><span class="legend-swatch dash"></span>机械能</span>
</div>
<div v-click="2" class="step-line">平衡位置：动能最大，弹性势能为零。</div>
<div v-click="3" class="step-line">最大位移处：动能为零，弹性势能最大。</div>
<div v-click="4" class="step-line">不计阻力时，机械能守恒，振幅保持不变。</div>
</div>
</div>
</div>

---
clicks: 1
title: 改变振子的参数
---

<div class="page-grow page-around">
<SpringLab />
<div v-click="1" class="tip-hint">改变振幅 <Latex tex="A" /> 只改变图像的高低；改变 <Latex tex="k" /> 或 <Latex tex="m" /> 才改变周期 <Latex tex="T" />。</div>
</div>

---
clicks: 4
title: 例题：由振动图像求振幅、周期和路程
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 4.7]
y-range: [-6, 6]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x, unit: cm }
view: { width: 430, height: 300 }
ticks: { x: [1, 2, 3, 4], y: [5, -5] }
curves:
  - formula: t => 5 * Math.sin(Math.PI * t / 2)
    samples: 300
    color: var(--c-accent)
    width: 2.6
```

</div>
<div class="stack">
<div class="ask">某质点简谐运动的图像如图所示，求振幅、周期和频率。</div>
<div v-click="1" class="step-line">振幅 <Latex tex="A = 5\ \text{cm}" />。</div>
<div v-click="2" class="step-line">周期 <Latex tex="T = 4\ \text{s}" />。</div>
<div v-click="3" class="step-line">频率 <Latex tex="f = \dfrac{1}{T} = 0.25\ \text{Hz}" />。</div>
<div v-click="4" class="step-line"><Latex tex="t = 2\ \text{s}" /> 时位移为零、速度最大；前 <Latex tex="2\ \text{s}" /> 内路程为 <Latex tex="2A = 10\ \text{cm}" />。</div>
</div>
</div>
</div>

---
clicks: 3
title: 读振动图像（1）
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.06fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 4.7]
y-range: [-5, 5]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x, unit: cm }
view: { width: 420, height: 300 }
ticks: { x: [1, 2, 3, 4], y: [4, -4] }
curves:
  - formula: t => 4 * Math.sin(Math.PI * t / 2)
    samples: 300
    color: var(--c-accent)
    width: 2.6
```

</div>
<div class="stack">
<div class="ask" style="font-size: 1rem">（1）质点离开平衡位置的最大距离？</div>
<div v-click="1" class="step-line">最大距离是 <Latex tex="4\ \text{cm}" />。</div>
<div class="ask" style="font-size: 1rem">（2）<Latex tex="1.5\ \text{s}" /> 和 <Latex tex="2.5\ \text{s}" /> 时质点在什么位置？向哪个方向运动？</div>
<div v-click="2" class="step-line"><Latex tex="1.5\ \text{s}" />：在平衡位置右侧，向负方向运动。</div>
<div v-click="2" class="step-line"><Latex tex="2.5\ \text{s}" />：在平衡位置左侧，向负方向运动。</div>
<div class="ask" style="font-size: 1rem">（4）第 <Latex tex="2\ \text{s}" /> 末的位移是多少？</div>
<div v-click="3" class="step-line">第 <Latex tex="2\ \text{s}" /> 末质点回到平衡位置，位移为零。</div>
</div>
</div>
</div>

---
clicks: 2
title: 读振动图像（2）
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.06fr); align-items: center">
<div style="width: 100%">

```comp CoordAxes
x-range: [0, 4.7]
y-range: [-5, 5]
x-axis: { quantity: t, unit: s, side: below }
y-axis: { quantity: x, unit: cm }
view: { width: 420, height: 300 }
ticks: { x: [1, 2, 3, 4], y: [4, -4] }
curves:
  - formula: t => 4 * Math.sin(Math.PI * t / 2)
    samples: 300
    color: var(--c-accent)
    width: 2.6
```

</div>
<div class="stack">
<div class="ask" style="font-size: 1rem">（3）哪些时间段内位移方向与速度方向相同？</div>
<div v-click="1" class="step-line"><Latex tex="0 \sim 1\ \text{s}" /> 和 <Latex tex="2 \sim 3\ \text{s}" />：振子正在远离平衡位置。</div>
<div class="ask" style="font-size: 1rem">（5）前 <Latex tex="2\ \text{s}" /> 内运动的路程是多少？</div>
<div v-click="2" class="step-line"><Latex tex="0 \sim 1\ \text{s}" /> 走过 <Latex tex="A" />，<Latex tex="1 \sim 2\ \text{s}" /> 又走过 <Latex tex="A" />，路程共 <Latex tex="2A = 8\ \text{cm}" />。</div>
</div>
</div>
</div>

---
title: 本节的规律
---

<div class="page-grow page-around">
<div class="stack">
<div class="summary-line"><strong>机械振动</strong>　物体在某一位置附近的往复运动。</div>
<div class="summary-line"><strong>弹簧振子</strong>　忽略弹簧质量和阻力的理想模型，平衡位置处合力为零。</div>
<div class="summary-line"><strong>简谐运动</strong>　<Latex tex="x" />–<Latex tex="t" /> 图像是正弦曲线，它是最基本的振动。</div>
<div class="summary-line"><strong>三个描述量</strong>　振幅 <Latex tex="A" />、周期 <Latex tex="T" />、频率 <Latex tex="f = \dfrac{1}{T}" />。</div>
<div class="summary-line"><strong>回复力与能量</strong>　<Latex tex="F = -kx" />；动能与弹性势能相互转化。</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow page-around">
<div class="ask ask-lead">振幅、周期、频率只描述了振动的“大”和“快”，<br />振子在某一时刻处在什么状态？</div>
<div v-click="1" class="mini-title">下一节用相位描述振动的状态</div>
<div v-click="2" class="tip-hint">2.2 简谐运动的描述</div>
</div>
