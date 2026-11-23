---
theme: default
title: "简谐运动的描述"
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
chapter-no: "2.2"
chapter: "第二章 机械振动"
subtitle: "振幅 · 周期 · 相位"
---

<CoverDecorationSvg />

---
title: 怎样描述简谐运动
---

<div class="page-grow shm-intro">
  <p class="shm-intro-q">做简谐运动的物体，不断重复同样的运动。怎样描述这种运动？</p>
  <div class="shm-intro-figure">
    <SpringOscillatorSvg />
  </div>
  <div class="shm-intro-grid">
    <div class="shm-intro-item">
      <mdi-arrow-expand-horizontal class="icon-lg" />
      <span>振动幅度有多大？</span>
    </div>
    <div class="shm-intro-item">
      <mdi-timer-outline class="icon-lg" />
      <span>振动有多快？</span>
    </div>
    <div class="shm-intro-item">
      <mdi-sine-wave class="icon-lg" />
      <span>从哪儿开始、步调怎样？</span>
    </div>
  </div>
</div>

---
title: 振幅
clicks: 1
clickAnimation: none
---

# 振幅

<div class="page-grow">
  <p class="ask">振子离开平衡位置的最大距离是多少？</p>
  <div class="shm-figure">
    <SpringOscillatorSvg :show-amplitude="true" />
  </div>
  <div v-click="1" class="tip-hint">
    振幅是离开平衡位置的最大距离，用 <Latex tex="A" /> 表示；<Latex tex="|x|\le A" />。<br />运动范围是 <Latex tex="2A" />，单位是 <Latex tex="\text{m}" />。
  </div>
</div>

---
title: 振幅与路程
clicks: 2
zoom: 0.8
clickAnimation: none
---

<div class="page-grow">
  <p class="ask">振幅就是路程吗？</p>
  <table class="shm-table">
    <thead>
      <tr><th>物理量</th><th>含义</th><th>正负</th><th>单位</th></tr>
    </thead>
    <tbody>
      <tr><td>振幅 <Latex tex="A" /></td><td>离开平衡位置的最大距离</td><td>总为正</td><td><Latex tex="\text{m}" /></td></tr>
      <tr><td>位移 <Latex tex="x" /></td><td>相对平衡位置的位置变化</td><td>有正负</td><td><Latex tex="\text{m}" /></td></tr>
      <tr><td>路程 <Latex tex="s" /></td><td>实际运动轨迹的长度</td><td>总为正</td><td><Latex tex="\text{m}" /></td></tr>
    </tbody>
  </table>
  <div class="stack-tight">
    <div class="mini-title">算一算</div>
    <div>振幅 <Latex tex="A=2\text{ cm}" /> 的振子，一次全振动通过的路程是多少？</div>
    <div v-click="1" class="summary-line">一次全振动通过 <Latex tex="4A" /> 的路程：<Latex tex="s=4A=8\text{ cm}" />。</div>
  </div>
  <div v-click="2" class="tip-hint">振幅只描述离开平衡位置的最大距离；路程与运动过程有关，一次全振动的路程是 <Latex tex="4A" />。</div>
</div>

---
title: 一次全振动与周期
clicks: 2
zoom: 0.93
clickAnimation: none
---

# 一次全振动与周期

<div class="page-grow page-grow-tight">
  <p class="ask">振子完成一次全振动，经过怎样的路径？用多长时间？</p>
  <div class="half-grid">
    <div class="stack-tight">
      <div class="shm-figure">
        <SpringOscillatorSvg />
      </div>
      <div class="shm-path">O → M → O → M′ → O</div>
    </div>
    <div class="shm-chart">
      <FullVibrationGraph :step="$clicks" />
    </div>
  </div>
  <div v-click="1" class="tip-hint">从 O 出发，经 M 回到 O，再经 M′ 回到 O，这样的一次完整运动叫一次全振动；完成一次全振动的时间叫周期 <Latex tex="T" />。</div>
  <div v-click="2" class="summary-line">不管从哪个位置开始计时，一次全振动的时间都相同。</div>
</div>

---
title: 周期、频率与圆频率
clicks: 1
zoom: 0.94
clickAnimation: none
---

# 周期、频率与圆频率

<div class="page-grow page-grow-tight">
  <p class="ask">振动有多快？周期、频率和圆频率之间有什么关系？</p>
  <div class="half-grid">
    <div class="divider-l stack">
      <div class="mini-title">周期与频率</div>
      <div class="shm-formula"><Latex tex="f=\frac{1}{T}" /></div>
      <div>频率的单位是赫兹（<Latex tex="\text{Hz}" />）。</div>
      <div><Latex tex="1\text{ Hz}=1\text{ s}^{-1}" /></div>
      <div><Latex tex="T" /> 越小，<Latex tex="f" /> 越大，振动越快。</div>
    </div>
    <div class="divider-l stack">
      <div class="mini-title">圆频率</div>
      <div class="shm-formula"><Latex tex="\omega=\frac{2\pi}{T}=2\pi f" /></div>
      <div>圆频率也表示振动的快慢。</div>
      <div>单位是 <Latex tex="\text{rad/s}" />。</div>
      <div>简谐运动的表达式：<Latex tex="x=A\sin(\omega t+\varphi)" />。</div>
    </div>
  </div>
  <div v-click="1" class="tip-hint">测出 <Latex tex="n" /> 次全振动的时间 <Latex tex="t" />，周期 <Latex tex="T=t/n" />；<Latex tex="n" /> 取大一些可以减小测量误差。</div>
</div>

---
title: 周期与振幅
clicks: 2
zoom: 0.85
clickAnimation: none
---

# 周期与振幅

<div class="page-grow page-grow-tight">
  <p class="ask">振幅变小，周期会变吗？</p>

```comp CoordAxes
class: shm-chart
x-range: [0, 2.2]
y-range: [-1.25, 1.25]
x-axis: { quantity: t, unit: s }
y-axis: { quantity: x, unit: m }
view: { width: 900, height: 260 }
ticks: { x: [0, 0.5, 1, 1.5, 2], y: [-1, 0, 1], origin: false, labels: true, arrows: true }
curves:
  - formula: t => Math.sin(2 * Math.PI * t)
    samples: 360
    color: var(--c-accent)
    width: 2.6
  - formula: t => 0.5 * Math.sin(2 * Math.PI * t)
    samples: 360
    color: var(--c-sky)
    width: 2.4
labels:
  - { x: 0.25, y: 1, tex: A, anchor: top, dy: -4, dot: 3, dotColor: var(--c-accent) }
  - { x: 0.25, y: 0.5, tex: '\frac{A}{2}', anchor: top, dy: -4, dot: 3, dotColor: var(--c-sky) }
  - { x: 1.25, y: 0, tex: T, anchor: bottom, dy: 4 }
```

  <div v-click="1" class="tip-hint">两次实验的周期相同：振幅减小，周期不变。</div>
  <div v-click="2" class="summary-line">所有简谐运动的周期都与振幅无关。</div>
</div>

---
title: 相位与初相
clicks: 2
zoom: 0.9
clickAnimation: none
---

# 相位与初相

<div class="page-grow page-grow-tight">
  <p class="ask">三个振子的振幅、周期都相同，振动步调相同吗？</p>
  <div class="shm-chart">
    <PhaseWaves :step="$clicks" />
  </div>
  <div v-click="2" class="tip-hint">相位 <Latex tex="\omega t+\varphi" /> 描述振动在某一时刻的状态；<Latex tex="\varphi" /> 是 <Latex tex="t=0" /> 时的相位，叫初相。</div>
</div>

---
title: 简谐运动的表达式
zoom: 0.95
clickAnimation: none
---

# 简谐运动的表达式

<div class="page-grow page-grow-tight">
  <p class="ask">改变振幅、周期或初相，振动图象怎样变化？</p>
  <ShmExplorer />
  <div class="summary-line"><Latex tex="A" />、<Latex tex="T" />、<Latex tex="\varphi" /> 确定后，简谐运动的表达式和图象就确定了。</div>
</div>

---
title: 相位差
zoom: 0.95
clickAnimation: none
---

# 相位差

<div class="page-grow page-grow-tight">
  <p class="ask">两个同频率的简谐运动，步调相差多少？</p>
  <PhaseComparison />
  <div class="summary-line">同相：<Latex tex="\Delta\varphi=0" />；反相：<Latex tex="\Delta\varphi=\pi" />。</div>
</div>

---
layout: exercise-split
title: 例题：振幅、频率与相位差
clicks: 3
zoom: 0.95
clickAnimation: none
---

<template v-slot:stem>

<div>两个简谐运动的表达式分别为 <Latex tex="x_1=3a\sin(8\pi bt+\pi/4)" />，<Latex tex="x_2=9a\sin(8\pi bt+\pi/2)" />。<br />求它们的振幅之比、频率和相位差。</div>

</template>

<div v-click="1">振幅之比 <Latex tex="A_1:A_2=3a:9a=1:3" />。</div>

<div v-click="2">由 <Latex tex="\omega=8\pi b" /> 得频率 <Latex tex="f=\dfrac{\omega}{2\pi}=4b" />。</div>

<div v-click="3">相位差 <Latex tex="\Delta\varphi=\varphi_2-\varphi_1=\dfrac{\pi}{2}-\dfrac{\pi}{4}=\dfrac{\pi}{4}" />，<Latex tex="x_2" /> 比 <Latex tex="x_1" /> 超前 <Latex tex="\dfrac{\pi}{4}" />。</div>

---
title: 周期性与对称性
clicks: 3
zoom: 0.88
clickAnimation: none
---

# 周期性与对称性

<div class="page-grow page-grow-tight">
  <p class="ask">振子两次经过同一位置，速度相同吗？两次的时间有什么关系？</p>
  <div class="shm-chart">
    <ShmSymmetryGraph :step="$clicks" />
  </div>
  <div v-click="1" class="tip-hint">同一位置 <Latex tex="x_0" /> 对应两个时刻，速度大小相等、方向相反。</div>
  <div v-click="2" class="summary-line">从 <Latex tex="x_0" /> 到最大位移再回到 <Latex tex="x_0" />，两段时间相等。</div></div>

---
layout: exercise-split
title: 例题：可能的周期
clicks: 3
zoom: 0.9
clickAnimation: none
---

<template v-slot:stem>

<div>振子在 <Latex tex="O" /> 点附近做简谐运动。从 <Latex tex="O" /> 点开始计时，<Latex tex="3\ \text{s}" /> 时第一次经过 <Latex tex="M" /> 点，再经过 <Latex tex="2\ \text{s}" /> 第二次经过 <Latex tex="M" /> 点。<br />求振动的周期。</div>

</template>

<div v-click="1">情形一：第一次经过 <Latex tex="M" /> 时向 <Latex tex="M" /> 侧运动。<Latex tex="O\to M" /> 用 <Latex tex="3\ \text{s}" />，<Latex tex="M" /> 到最大位移用 <Latex tex="1\ \text{s}" />，则 <Latex tex="\dfrac{T}{4}=4\ \text{s}" />，<Latex tex="T=16\ \text{s}" />。</div>

<div v-click="2">情形二：第一次经过 <Latex tex="M" /> 时向另一侧运动。<Latex tex="O\to M" /> 的时间为 <Latex tex="3-\dfrac{T}{2}" />；<Latex tex="M" /> 到最大位移用 <Latex tex="1\ \text{s}" />，有 <Latex tex="\dfrac{T}{4}-\left(3-\dfrac{T}{2}\right)=1\ \text{s}" />，解得 <Latex tex="T=\dfrac{16}{3}\ \text{s}" />。</div>

<div v-click="3" class="tip-hint">所以周期可能是 <Latex tex="16\ \text{s}" /> 或 <Latex tex="\dfrac{16}{3}\ \text{s}" />。</div>

---
title: 振动图象的读写
clicks: 3
zoom: 0.95
clickAnimation: none
---

# 振动图象的读写

<div class="page-grow page-grow-tight">
  <p class="ask">从振动图象能读出哪些信息？</p>

```comp CoordAxes
class: shm-chart
x-range: [0, 3]
y-range: [-0.25, 0.25]
x-axis: { quantity: t, unit: s }
y-axis: { quantity: x, unit: m }
view: { width: 900, height: 260 }
ticks: { x: [0, 1, 2, 3], y: [-0.2, 0, 0.2], origin: false, labels: true, arrows: true }
curves:
  - formula: t => 0.2 * Math.sin(Math.PI * t + Math.PI / 3)
    samples: 500
    color: var(--c-accent)
    width: 2.6
```

  <div v-click="1">振幅 <Latex tex="A=0.2\text{ m}" />；周期 <Latex tex="T=2\text{ s}" />，频率 <Latex tex="f=0.5\text{ Hz}" />。</div>
  <div v-click="2">初相 <Latex tex="\varphi=\pi/3" />；表达式 <Latex tex="x=0.2\sin(\pi t+\pi/3)\text{ m}" />。</div>
  <div v-click="3" class="tip-hint">图象不是轨迹：振子沿直线运动，图象描述的是位移随时间的变化。</div>
</div>

---
layout: exercise-split
title: 例题：从振动过程求表达式
clicks: 4
zoom: 0.9
clickAnimation: none
---

<template v-slot:stem>

<div>弹簧振子在 <Latex tex="B" />、<Latex tex="C" /> 之间振动，<Latex tex="O" /> 为平衡位置，<Latex tex="BC" /> 相距 <Latex tex="20\ \text{cm}" />。<br />从 <Latex tex="B" /> 开始计时，<Latex tex="0.5\ \text{s}" /> 时振子首次到达 <Latex tex="C" />。<br />求：(1) 振幅和周期；(2) 振动表达式；(3) <Latex tex="5\ \text{s}" /> 内通过的路程和位移。</div>

</template>

<div v-click="1">振幅 <Latex tex="A=\dfrac{BC}{2}=0.1\ \text{m}" />；从 <Latex tex="B" /> 到 <Latex tex="C" /> 是半个周期，<Latex tex="T=2\times0.5\ \text{s}=1.0\ \text{s}" />。</div>

<div v-click="2"><Latex tex="\omega=\dfrac{2\pi}{T}=2\pi\ \text{rad/s}" />；<Latex tex="t=0" /> 时在 <Latex tex="B" />（正方向最大位移），<Latex tex="\varphi_0=\dfrac{\pi}{2}" />。</div>

<div v-click="2"><Latex tex="x=0.1\sin(2\pi t+\pi/2)\ \text{m}" />。</div>

<div v-click="3"><Latex tex="5\ \text{s}=5T" />；路程 <Latex tex="s=5\times4A=2\ \text{m}" />；回到 <Latex tex="B" />，位移 <Latex tex="x=0.1\ \text{m}" />。</div>

<div v-click="4" class="tip-hint">由振幅、周期和初相可以写出振动表达式，也可以画出 <Latex tex="x\text{-}t" /> 图象。</div>

---
layout: base-flex
title: 例题：两个简谐运动的图象
clicks: 3
zoom: 0.8
clickAnimation: none
---

<div class="page-grow page-grow-tight">
  <div class="ask">甲、乙两个简谐运动的振幅分别为 <Latex tex="2\ \text{cm}" /> 和 <Latex tex="3\ \text{cm}" />，周期都是 <Latex tex="4\ \text{s}" />。<Latex tex="t=0" /> 时，甲在正方向最大位移处，乙的相位比甲落后 <Latex tex="\pi/4" />。求两振动的表达式，并画出它们的振动图象。</div>
  <div v-click="1"><Latex tex="\omega=\dfrac{2\pi}{T}=\dfrac{\pi}{2}\ \text{rad/s}" />；甲：<Latex tex="\varphi_{\text{甲}}=\dfrac{\pi}{2}" />，<Latex tex="x_{\text{甲}}=2\sin\left(\dfrac{\pi}{2}t+\dfrac{\pi}{2}\right)\ \text{cm}" />。</div>
  <div v-click="2">乙：<Latex tex="\varphi_{\text{乙}}=\dfrac{\pi}{4}" />，<Latex tex="x_{\text{乙}}=3\sin\left(\dfrac{\pi}{2}t+\dfrac{\pi}{4}\right)\ \text{cm}" />。</div>
  <div v-click="3" class="tip-hint">两振动频率相同，相位差 <Latex tex="\pi/4" />；图象中乙的曲线比甲落后 <Latex tex="\pi/4" />。</div>
  <div v-click="3" class="shm-chart">
    <ShmTwoCurvesGraph />
  </div>
</div>

---
title: 科学漫步：乐音和音阶
zoom: 0.9
clickAnimation: none
---

# 科学漫步：乐音和音阶

<div class="page-grow page-grow-tight">
  <table class="shm-table shm-music-table">
    <thead>
      <tr><th>音名</th><th>do</th><th>re</th><th>mi</th><th>fa</th><th>sol</th><th>la</th><th>si</th><th>高音 do</th></tr>
    </thead>
    <tbody>
      <tr><td>频率 / <Latex tex="\text{Hz}" /></td><td>264</td><td>297</td><td>330</td><td>352</td><td>396</td><td>440</td><td>495</td><td>528</td></tr>
    </tbody>
  </table>
  <div class="shm-chart">
    <MusicWaves />
  </div>
  <div class="summary-line">在同样时间内，do 完成 2 次全振动，sol 完成 3 次；do 与 sol 的频率比为 3:2。<br />频率越高，音调越高。</div>
</div>

---
title: 小结
clickAnimation: none
---

# 小结

<div class="page-grow page-grow-tight">
  <div class="shm-summary-main"><Latex tex="x=A\sin(\omega t+\varphi)" /></div>
  <div class="shm-summary-grid">
    <div class="shm-summary-card"><b>振幅 <Latex tex="A" /></b><span>离开平衡位置的最大距离</span></div>
    <div class="shm-summary-card"><b>周期 <Latex tex="T" /></b><span>完成一次全振动的时间</span></div>
    <div class="shm-summary-card"><b>频率 <Latex tex="f" /></b><span><Latex tex="f=1/T" />，单位 <Latex tex="\text{Hz}" /></span></div>
    <div class="shm-summary-card"><b>圆频率 <Latex tex="\omega" /></b><span><Latex tex="\omega=2\pi/T=2\pi f" /></span></div>
    <div class="shm-summary-card"><b>初相 <Latex tex="\varphi" /></b><span><Latex tex="t=0" /> 时的相位</span></div>
    <div class="shm-summary-card"><b>相位差 <Latex tex="\Delta\varphi" /></b><span>两同频振动的步调差异</span></div>
  </div>
  <div class="summary-line"><Latex tex="A" />、<Latex tex="T" />、<Latex tex="\varphi" /> 确定后，简谐运动就确定了。</div>
</div>
