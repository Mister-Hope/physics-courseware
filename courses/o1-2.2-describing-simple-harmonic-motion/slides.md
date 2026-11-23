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
