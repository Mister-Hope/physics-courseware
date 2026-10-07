---
theme: default
title: "速度变化快慢的描述——加速度"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: cover
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
---

<div class="cover-chapter"><span class="cover-section">§</span> 1.4 · 第一章 运动的描述</div>

<h1 class="cover-title">速度变化快慢的描述——加速度</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
---

# 百公里加速的意义

<div class="page-grow">

<div class="wide-grid">

<div class="stack">
<div class="mini-title"><mdi-car-sports /> 0 → 100 km/h 所需时间</div>
<table class="car-table">
<thead>
<tr><th>车型</th><th class="num">百公里加速</th><th>车型</th><th class="num">百公里加速</th></tr>
</thead>
<tbody>
<tr><td>两门跑车</td><td class="num">2.7 s</td><td>家用轿车 A</td><td class="num">11.3 s</td></tr>
<tr><td>四门轿跑</td><td class="num">3.9 s</td><td>家用轿车 B</td><td class="num">13.2 s</td></tr>
<tr><td colspan="2" class="tbl-note">厂家公布约值</td><td>家用轿车 C</td><td class="num">15.5 s</td></tr>
</tbody>
</table>
</div>

<div class="stack divider-l">
<div class="ask">看着这张表，先讨论四个问题——</div>
<div class="q-list">
<div class="q-item"><span class="q-num">1</span><span>屏幕上"百公里加速"这几个字，是什么意思？</span></div>
<div class="q-item"><span class="q-num">2</span><span>这个数值是越小越好，还是越大越好？</span></div>
<div class="q-item"><span class="q-num">3</span><span>为什么时间越短，我们就说这辆车越"猛"？</span></div>
<div class="q-item"><span class="q-num">4</span><span>这个指标衡量的，是车的什么性能？</span></div>
</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 2
---

# 百公里加速的意义

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div class="mini-note">车速表上的数字只回答一个问题：<strong>它现在运动得多快</strong>。</div>
<div class="fun-note">同样是从静止到 100 km/h：2.7 s 和 15.5 s——速度的"结果"一样，"过程"完全不同。</div>
</div>

<div class="stack divider-l">
<div class="ask">那"百公里加速"这个指标，反映的是什么？</div>
<div class="key" v-click="1">反映的是<span class="text-accent">速度变化的快慢</span>——不是速度大，而是速度"变"得快。</div>
<div class="key key-blue" v-click="2">物理学中用来描述"速度变化快慢"的物理量，叫<span class="text-accent-2">加速度</span>。这就是我们这一节课要学的。</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 2
---

# 图像分析

<div class="page-grow">

<div class="graph-grid">

<div class="vt-host">

```comp CoordAxes
x-range: [0, 12.3]
y-range: [0, 110]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 470, height: 280 }
ticks:
  x: [2, 4, 6, 8, 10]
  y: [30, 60, 90]
  labels: false
curves:
  - points: [{ x: 0, y: 0 }, { x: 2.7, y: 100 }]
    stroke: var(--c-accent)
    width: 3
  - points: [{ x: 0, y: 0 }, { x: 11.3, y: 100 }]
    stroke: var(--c-accent-2)
    width: 2.6
  - points: [{ x: 0, y: 100 }, { x: 12.2, y: 100 }]
    stroke: var(--c-text-dim)
    width: 1.4
    dashed: true
    opacity: 0.7
  - points: [{ x: 2.7, y: 0 }, { x: 2.7, y: 100 }]
    stroke: var(--c-accent)
    width: 1.4
    dashed: true
    opacity: 0.5
  - points: [{ x: 11.3, y: 0 }, { x: 11.3, y: 100 }]
    stroke: var(--c-accent-2)
    width: 1.4
    dashed: true
    opacity: 0.5
labels:
  - x: 2.7
    y: 100
    dot: 5
    dotColor: var(--c-accent)
  - x: 11.3
    y: 100
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 3.6
    y: 100
    tex: '100\ \text{km/h}'
    anchor: bottom-right
    color: var(--c-text-dim)
  - x: 2
    y: 74
    tex: a
    anchor: left
    color: var(--c-accent)
  - x: 9.5
    y: 74
    tex: b
    anchor: right
    color: var(--c-accent-2)
  - x: 2.7
    y: 0
    tex: '2.7\ \text{s}'
    anchor: center
    dy: 34
    color: var(--c-accent)
  - x: 11.3
    y: 0
    tex: '11.3\ \text{s}'
    anchor: center
    dy: 34
    color: var(--c-accent-2)
```
</div>

<div class="stack">
<div class="ask">这两条直线是两辆车的 <Latex tex="v\text{-}t" /> 图像：都从静止出发，都加速到 <Latex tex="100\ \text{km/h}" />。线 <Latex tex="a" />、<Latex tex="b" /> 哪一条是跑车的？</div>
<div class="key" v-click="1">比"谁更猛"，要在<span class="text-accent">单位时间内</span>比较<span class="text-accent">速度的变化量</span>。</div>
<div class="key key-blue" v-click="2">按这个比法：单位时间内速度的变化量更大，图线就<strong>更陡</strong>——线 <Latex tex="a" /> 比线 <Latex tex="b" /> 陡。</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 2
---

# 我们在衡量什么？

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div class="block-title">同样从 0 到 100 km/h：<Latex tex="\Delta v = 27.8\ \text{m/s}" /> 相同，<Latex tex="\Delta t" /> 不同</div>
<div class="calc-block">
<div class="calc-head"><span class="calc-label">跑车 <Latex tex="a" /></span><span class="calc-time">用时 2.7 s</span></div>
<div class="calc-line"><Latex tex="\frac{27.8\ \text{m/s}}{2.7\ \text{s}} \approx 10.3" /> <span class="calc-note">每 1 s 速度增加 10.3 m/s</span></div>
</div>
<div class="calc-block calc-block-blue">
<div class="calc-head"><span class="calc-label">家用轿车 <Latex tex="b" /></span><span class="calc-time">用时 11.3 s</span></div>
<div class="calc-line"><Latex tex="\frac{27.8\ \text{m/s}}{11.3\ \text{s}} \approx 2.46" /> <span class="calc-note">每 1 s 速度增加 2.46 m/s</span></div>
</div>
<div class="mini-note">两条线都过原点、都升到同一个高度，只是"爬"上去的快慢不同。</div>
</div>

<div class="stack divider-l">
<div class="ask">线 <Latex tex="a" /> 更陡，说明什么？</div>
<div class="key" v-click="1">相同的时间内（比如 1 s），<span class="text-accent">线 <Latex tex="a" /> 的速度提升得更多</span>——所以 <Latex tex="a" /> 更"猛"，它是跑车。</div>
<div class="key key-blue" v-click="2">"每 1 s 速度增加多少"，说的就是<span class="text-accent-2">速度变化的快慢</span>。这正是下一个物理量要刻画的事情。</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 3
---

# 定义加速度

<div class="page-grow">

<div class="ratio-grid">
<div class="ratio-box">
<div class="ratio-label">速度 —— 描述位置变化的快慢</div>
<div class="ratio-eq"><Latex tex="v = \frac{\Delta x}{\Delta t}" /></div>
<div class="ratio-label">位移 ÷ 时间</div>
</div>
<div class="ratio-arrow" v-click="1"><span>→</span>类比</div>
<div class="ratio-box ratio-box-blue" v-click="1">
<div class="ratio-label">加速度 —— 描述速度变化的快慢</div>
<div class="ratio-eq"><Latex tex="a = \frac{\Delta v}{\Delta t}" /></div>
<div class="ratio-label">速度的变化量 ÷ 时间</div>
</div>
</div>

<div class="key" v-click="2">物理学中把<span class="text-accent">速度的变化量</span>与<span class="text-accent">发生这一变化所用时间</span>之比，叫作<strong>加速度</strong>，通常用 <Latex tex="a" /> 表示。</div>

<div class="mini-note" v-click="3">物理学常用方法：<span class="text-accent-2">比值定义法</span>，即<span class="text-accent-2">用两个物理量之比定义一个新的物理量</span>——速度是这样来的，加速度也是这样来的。</div>

</div>

---
layout: base-flex
clicks: 2
---

# 加速度的单位

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div class="mini-title">单位是怎么来的</div>
<div class="key">速度的单位是 <Latex tex="\text{m/s}" />、时间的单位是 <Latex tex="\text{s}" />，所以按 <Latex tex="a=\frac{\Delta v}{\Delta t}" /> 算出来的单位是 <Latex tex="\frac{\text{m/s}}{\text{s}} = \text{m/s}^2" />（米每二次方秒）。</div>
<div class="key key-blue" v-click="1"><Latex tex="2\ \text{m/s}^2" /> 的意思是：<span class="text-accent-2">每经过 1 s，速度增加 2 m/s</span>。</div>
</div>

<div class="stack divider-l" v-click="2">
<div class="mini-title">一些运动物体的加速度</div>
<table class="data-table">
<tbody>
<tr><td>子弹在枪筒中</td><td class="val">5 × 10⁴</td><td>赛车起步</td><td class="val">4.5</td></tr>
<tr><td>伞兵着陆</td><td class="val val-neg">−25</td><td>汽车起步</td><td class="val">2</td></tr>
<tr><td>汽车急刹车</td><td class="val val-neg">−5</td><td>高速列车起步</td><td class="val">0.35</td></tr>
</tbody>
</table>
<div class="mini-note">单位都是 <Latex tex="m/s²" />。负号表示什么？</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 3
---

# 加速度的方向

<div class="page-grow">

<div class="vec-row">
<div class="stack" v-click="1">
<DeltaVDirectionSvg />
<div class="mini-note">两个箭头起点相同：<Latex tex="\Delta v" /> 就是 <Latex tex="v_2" /> 比 <Latex tex="v_1" /> 多出来的那一段。</div>
</div>

<div class="stack">
<div class="ask">已知原来的速度 <Latex tex="v_1" /> 和后来的速度 <Latex tex="v_2" />，怎样画出速度的变化量 <Latex tex="\Delta v" />？</div>
<div class="key" v-click="2">以 <Latex tex="v_1" /> 的箭头端为起点、<Latex tex="v_2" /> 的箭头端为终点，画出的有向线段就是 <Latex tex="\Delta v = v_2 - v_1" />。</div>
<div class="key key-blue" v-click="3">又因为 <Latex tex="a=\frac{\Delta v}{\Delta t}" />，而 <Latex tex="\Delta t" /> 是正数，所以 <strong><Latex tex="a" /> 的方向与 <Latex tex="\Delta v" /> 的方向相同</strong>。</div>
</div>
</div>

<div class="cmp-bar" v-click="3">
<div class="cmp-cell">速度 <Latex tex="v" /> 的方向：与位置 <Latex tex="x" /> <strong>无关</strong>，与位移 <Latex tex="\Delta x" /> 的方向相同。</div>
<div class="cmp-cell cmp-cell-blue">加速度 <Latex tex="a" /> 的方向：与速度 <Latex tex="v" /> <strong>无关</strong>，与速度变化量 <Latex tex="\Delta v" /> 的方向相同。</div>
</div>

</div>

---
layout: base-flex
clicks: 3
---

# 两种情形：加速与减速

<div class="page-grow">

<div class="half-grid">

<div class="stack" v-click="1">
<div class="mini-title" style="color: #e2a846">加速</div>
<AccelerateDeltaVSvg />
<div class="mini-note">速度越来越大：<Latex tex="\Delta v" /> 与 <Latex tex="v" /> 同向 → <Latex tex="a" /> 与 <Latex tex="v" /> 同向。</div>
</div>

<div class="stack divider-l" v-click="2">
<div class="mini-title" style="color: #60a5fa">减速</div>
<DecelerateDeltaVSvg />
<div class="mini-note">速度越来越小：<Latex tex="\Delta v" /> 与 <Latex tex="v" /> 反向 → <Latex tex="a" /> 与 <Latex tex="v" /> 反向。</div>
</div>

</div>

<div class="key" v-click="3">直线运动中：速度<strong>增大</strong>时 <Latex tex="a" /> 与 <Latex tex="v" /> 同向；速度<strong>减小</strong>时 <Latex tex="a" /> 与 <Latex tex="v" /> 反向。<br />教材表里汽车急刹车的 <Latex tex="-5\ \text{m/s}^2" />，负号就是这个意思：<Latex tex="a" /> 与运动方向相反。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 从 v-t 图像看加速度

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div class="vt-host" v-click="1">

```comp CoordAxes
x-range: [0, 11.5]
y-range: [0, 27]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 400, height: 200 }
ticks:
  x: [2, 4, 6, 8, 10]
  y: []
  labels: false
curves:
  - points: [{ x: 0, y: 0 }, { x: 4, y: 24 }]
    stroke: var(--c-accent)
    width: 3
  - points: [{ x: 0, y: 0 }, { x: 10, y: 20 }]
    stroke: var(--c-accent-2)
    width: 2.6
  - points: [{ x: 0, y: 0 }, { x: 2, y: 0 }]
    stroke: var(--c-accent)
    width: 1.6
    dashed: true
  - points: [{ x: 2, y: 0 }, { x: 2, y: 12 }]
    stroke: var(--c-accent)
    width: 1.6
    dashed: true
  - points: [{ x: 4, y: 0 }, { x: 6, y: 0 }]
    stroke: var(--c-accent-2)
    width: 1.6
    dashed: true
  - points: [{ x: 6, y: 0 }, { x: 6, y: 4 }]
    stroke: var(--c-accent-2)
    width: 1.6
    dashed: true
labels:
  - x: 1
    y: 0
    parts:
      - tex: '\Delta t'
      - text: '= 2 s'
    anchor: center
    dy: 34
    color: var(--c-accent)
  - x: 2
    y: 8
    parts:
      - tex: '\Delta v'
      - text: '= 12 m/s'
    anchor: right
    color: var(--c-accent)
  - x: 5
    y: 0
    parts:
      - tex: '\Delta t'
      - text: '= 2 s'
    anchor: center
    dy: 34
    color: var(--c-accent-2)
  - x: 6
    y: 3
    parts:
      - tex: '\Delta v'
      - text: '= 4 m/s'
    anchor: right
    color: var(--c-accent-2)
  - x: 2
    y: 16
    tex: a
    anchor: left
    color: var(--c-accent)
  - x: 7.9
    y: 20.5
    tex: b
    anchor: center
    color: var(--c-accent-2)
```
</div>
<div class="vt-host" v-click="3">

```comp CoordAxes
x-range: [0, 7]
y-range: [0, 10]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 430, height: 195 }
ticks:
  x: []
  y: []
curves:
  - points: [{ x: 0, y: 1.5 }, { x: 3.5, y: 8.5 }]
    stroke: var(--c-accent)
    width: 3
  - points: [{ x: 0, y: 7 }, { x: 3.5, y: 0 }]
    stroke: var(--c-accent-2)
    width: 3
labels:
  - x: 5.2
    y: 7.6
    parts:
      - text: 斜率为正：
      - tex: a
      - text: 沿正方向
    anchor: center
    color: var(--c-accent)
  - x: 5.2
    y: 2.6
    parts:
      - text: 斜率为负：
      - tex: a
      - text: 沿负方向
    anchor: center
    color: var(--c-accent-2)
```
</div>
</div>

<div class="stack">
<div class="ask">在 v-t 图像里，图线的"倾斜程度"代表什么？</div>
<div class="key" v-click="2">取一小段图线：<Latex tex="\frac{\Delta v}{\Delta t}" /> 正是这条直线的<span class="text-accent">斜率</span>——它就是<strong>加速度</strong>。</div>
<div class="key" v-click="3">同样取 <Latex tex="\Delta t = 2\ \text{s}" />：线 <Latex tex="a" /> 的 <Latex tex="\Delta v" /> 更大、斜率更大，所以它的加速度更大。</div>
<div class="key key-blue" v-click="3">斜率<strong>为正</strong> → a 沿正方向；斜率<strong>为负</strong> → a 沿负方向。</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 4
---

# 一段 v-t 图像，能读出多少信息？

<div class="page-grow">

<div class="half-grid">

<div class="vt-host" v-click="1">
<VTMotion />
</div>

<div class="stack">
<div class="ask">点左边的图，让小球沿图线走一遍——从这条 <Latex tex="v\text{-}t" /> 图线里能读出哪三件事？</div>
<div class="point-list">
<div class="point" v-click="2"><span class="point-idx">1</span><span>图线<strong>斜率越大，加速度越大</strong>：2–3 s 那一段最陡，<Latex tex="a" /> 最大。</span></div>
<div class="point" v-click="3"><span class="point-idx">2</span><span>斜率的<strong>正负</strong>表示 <Latex tex="a" /> 的方向：5–7 s 斜率为负，<Latex tex="a" /> 与正方向相反。</span></div>
<div class="point" v-click="4"><span class="point-idx">3</span><span>7–8 s 速度越过 <Latex tex="t" /> 轴变成负值，斜率仍为负——<strong><Latex tex="a" /> 与 <Latex tex="v" /> 同号，是在加速</strong>（离 <Latex tex="t" /> 轴越来越远）。</span></div>
</div>
</div>

</div>

</div>

---
layout: base-flex
---

# 从 v-t 图像还能读出什么？

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<SlopeIncreasingSvg />
<SlopeDecreasingSvg />
<div class="key">图线的斜率<strong>在变</strong>，说明加速度也在变：<strong>斜率的增减</strong>就是 <Latex tex="a" /> 的增减。</div>
</div>

<div class="stack divider-l">

```comp CoordAxes
x-range: [0, 8]
y-range: [-4.5, 12]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 420, height: 180 }
ticks:
  x: []
  y: []
curves:
  - points: [{ x: 0.35, y: 9 }, { x: 6.9, y: -4.5 }]
    stroke: var(--c-accent)
    width: 3
labels:
  - x: 4.7
    y: 0
    dot: 4.5
    dotColor: var(--c-text)
  - x: 4.7
    y: 0
    parts:
      - tex: v = 0
    anchor: top-right
    dx: 4
    color: var(--c-text)
  - x: 0.4
    y: 2.4
    parts:
      - tex: 'v > 0'
      - text: 减速
    anchor: right
    color: var(--c-accent)
    halo: true
  - x: 5.1
    y: -3.2
    parts:
      - tex: v < 0
      - text: 加速
    anchor: right
    color: var(--c-accent-2)
    halo: true
```
<div class="key key-blue">斜率 <Latex tex="k" /> 与速度 <Latex tex="v" /> <strong>同号</strong> → 加速（<strong>远离</strong> <Latex tex="t" /> 轴）；<strong>异号</strong> → 减速（<strong>靠近</strong> <Latex tex="t" /> 轴）。</div>
<div class="mini-note">这条直线穿过了 <Latex tex="t" /> 轴，但斜率始终不变：<strong><Latex tex="v" /> 从正变负，<Latex tex="a" /> 的方向却没有变</strong>。</div>
</div>

</div>

</div>

---
layout: base-flex
---

# 加速度大，速度就大吗？

<div class="page-grow">

<div class="half-grid">
<div class="ask text-2xl">加速度大，速度一定大吗？</div>
<div class="ask text-2xl divider-l">加速度小，速度一定小吗？</div>
</div>

<div class="key key-blue">先各想一个例子再回答：有没有"加速度很大、速度却很小"的时候？有没有"速度很大、加速度却为零"的时候？</div>

</div>

---
layout: base-flex
clicks: 2
---

# 反例一：高铁高速飞驰

<div class="page-grow">

<div class="half-grid">

<div class="vt-host" v-click="1">
<HighSpeedRailSvg />
</div>

<div class="stack">
<div class="ask" v-click="1">高铁在铁轨上高速飞驰，速度约 300 km/h——它的加速度也很大吗？</div>
<div class="key" v-click="1">高铁的速度<strong>很大</strong>（约 <Latex tex="83\ \text{m/s}" />），但速度<strong>不变化</strong>——匀速直线运动，所以 <Latex tex="a = 0" />。</div>
<div class="key key-blue" v-click="2">"速度大"和"加速度大"是两回事：<strong>速度大，加速度可以为零</strong>。</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 3
---

# 反例二：荡秋千

<div class="page-grow">

<div class="half-grid">

<div class="swing-host" v-click="1">
<SwingDemo />
</div>

<div class="stack">
<div class="ask">秋千荡到两侧最高点时，速度是多大？</div>
<div class="key" v-click="2">最高点 <Latex tex="v = 0" />，但 <Latex tex="a \ne 0" />——如果加速度也是零，它就会永远停在最高点不动了。</div>
<div class="key key-blue" v-click="3">这一刻加速度沿轨迹的切线方向、指向最低点。可见<strong>速度为零，加速度可以不为零</strong>。</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 1
---

# 六个说法，六个物理量

<div class="page-grow">

<div class="chain6">
<div class="chain-cell"><span class="chain-say">位移大</span><span class="chain-arrow">→</span><span class="chain-ans"><Latex tex="x" /> 大</span></div>
<div class="chain-cell"><span class="chain-say">位移变化大</span><span class="chain-arrow">→</span><span class="chain-ans"><Latex tex="\Delta x" /> 大</span></div>
<div class="chain-cell"><span class="chain-say">位移变化快</span><span class="chain-arrow">→</span><span class="chain-ans"><Latex tex="v" /></span></div>
<div class="chain-cell"><span class="chain-say">速度快</span><span class="chain-arrow">→</span><span class="chain-ans"><Latex tex="v" /></span></div>
<div class="chain-cell"><span class="chain-say">速度变化大</span><span class="chain-arrow">→</span><span class="chain-ans"><Latex tex="\Delta v" /> 大</span></div>
<div class="chain-cell" style="border-color: rgba(226,168,70,0.45); background: rgba(226,168,70,0.08)"><span class="chain-say">速度变化快</span><span class="chain-arrow">→</span><span class="chain-ans text-accent"><Latex tex="a" /></span></div>
</div>

<div class="key" v-click="1">"变化<strong>大</strong>"说的是<strong>变化量</strong>（<Latex tex="\Delta x" />、<Latex tex="\Delta v" />）；"变化<strong>快</strong>"说的是<strong>变化率</strong>（<Latex tex="v" />、<Latex tex="a" />）。一字之差，是两个不同的物理量。</div>

</div>

---
layout: base-flex
---

# 课后总结 ①：加速度

<div class="page-grow">

<div class="three-col">
<div class="ratio-box">
<div class="ratio-label">定义式</div>
<div class="ratio-eq"><Latex tex="a = \frac{\Delta v}{\Delta t}" /></div>
<div class="ratio-label">速度的变化量 ÷ 时间</div>
</div>
<div class="ratio-box">
<div class="ratio-label">单位</div>
<div class="ratio-eq"><Latex tex="\text{m/s}^2" /></div>
<div class="ratio-label">米每二次方秒：每 1 s 速度增加 <Latex tex="2\ \text{m/s}" /></div>
</div>
<div class="ratio-box ratio-box-blue">
<div class="ratio-label">方向</div>
<div class="ratio-eq">与 <Latex tex="\Delta v" /> 同向</div>
<div class="ratio-label">与速度 <Latex tex="v" /> 的方向无关</div>
</div>
</div>

<div class="key key-blue">判断加速还是减速，就看 <Latex tex="a" /> 与 <Latex tex="v" /> 的方向关系：<strong>同向加速，反向减速</strong>。</div>

</div>

---
layout: base-flex
---

# 课后总结 ②：$x$-$t$ 图像

<div class="page-grow">

<div class="half-grid">

<div class="vt-host">

```comp CoordAxes
x-range: [0, 8]
y-range: [0, 12]
x-axis: { quantity: t }
y-axis: { quantity: x }
view: { width: 420, height: 280 }
ticks:
  x: []
  y: []
curves:
  - points: [{ x: 0, y: 0.8 }, { x: 5.4, y: 8.6 }]
    stroke: var(--c-accent)
    width: 3
  - points: [{ x: 0, y: 8.1 }, { x: 5.4, y: 0.6 }]
    stroke: var(--c-accent-2)
    width: 3
  - points: [{ x: 2.42, y: 4.7 }, { x: 1.55, y: 9.2 }]
    stroke: var(--c-text-dim)
    width: 1.2
    dashed: '4 4'
labels:
  - x: 2.42
    y: 4.7
    dot: 5.5
    dotColor: var(--c-text)
  - x: 1.5
    y: 9.7
    parts:
      - text: 交点：同一位置
    anchor: center
    color: var(--c-text)
  - x: 5.5
    y: 8.7
    parts:
      - text: 甲
    anchor: right
    color: var(--c-accent)
  - x: 5.5
    y: 0.7
    parts:
      - text: 乙
    anchor: right
    color: var(--c-accent-2)
```
</div>

<div class="sum-list">
<div class="sum-item"><span class="sum-idx">1</span><span>图线表示物体的<strong>位置</strong>：距离和方向。</span></div>
<div class="sum-item"><span class="sum-idx">2</span><span>斜率的<strong>正负</strong>表示速度的方向。</span></div>
<div class="sum-item"><span class="sum-idx">3</span><span>斜率的<strong>大小</strong>表示那一点的瞬时速率。</span></div>
<div class="sum-item"><span class="sum-idx">4</span><span><strong>交点</strong>表示两个物体在同一位置。</span></div>
<div class="sum-item"><span class="sum-idx">5</span><span>图线与 <Latex tex="t" /> 轴围成的<strong>面积</strong>、图线的<strong>形状</strong>：没有意义。</span></div>
</div>

</div>

</div>

---
layout: base-flex
---

# 课后总结 ③：$v$-$t$ 图像

<div class="page-grow">

<div class="half-grid">

<div class="vt-host">

```comp CoordAxes
x-range: [0, 8]
y-range: [0, 12]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 420, height: 280 }
ticks: { x: [], y: [] }
areas:
  - points: [{ x: 0, y: 0 }, { x: 3.4, y: 8.9 }, { x: 3.4, y: 0 }]
    fill: var(--c-physics)
    fillOpacity: 0.12
curves:
  - points: [{ x: 0, y: 0 }, { x: 3.4, y: 8.9 }]
    stroke: var(--c-accent)
    width: 3
  - points: [{ x: 3.4, y: 8.9 }, { x: 6.6, y: 2.9 }]
    stroke: var(--c-accent-2)
    width: 3
labels:
  - x: 2.4
    y: 2.4
    parts: [{ text: '面积 = 位移' }]
    anchor: center
    color: var(--c-physics)
  - x: 0.12
    y: 9.6
    parts: [{ text: '远离 ' }, { tex: t }, { text: ' 轴：加速' }]
    anchor: right
    color: var(--c-accent)
  - x: 5.6
    y: 9.6
    parts: [{ text: '靠近 ' }, { tex: t }, { text: ' 轴：减速' }]
    anchor: center
    color: var(--c-accent-2)
```
</div>

<div class="sum-list">
<div class="sum-item"><span class="sum-idx">1</span><span>图线表示物体的<strong>速度</strong>：大小和方向。</span></div>
<div class="sum-item"><span class="sum-idx">2</span><span><strong>斜率</strong>表示加速度，斜率的正负反映加速度的方向。</span></div>
<div class="sum-item"><span class="sum-idx">3</span><span><strong>交点</strong>表示两个物体共速。</span></div>
<div class="sum-item"><span class="sum-idx">4</span><span>图线与 <Latex tex="t" /> 轴所围的<strong>面积</strong>表示位移。</span></div>
<div class="sum-item"><span class="sum-idx">5</span><span><strong>远离 <Latex tex="t" /> 轴 → 加速，靠近 <Latex tex="t" /> 轴 → 减速</strong>：也就是 <Latex tex="k" /> 与 <Latex tex="v" /> 同号加速、异号减速。</span></div>
</div>

</div>

</div>
