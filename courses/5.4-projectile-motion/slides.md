---
theme: default
title: "抛体运动的规律"
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

<div class="cover-chapter"><span class="cover-section">§</span> 5.4 · 第一课时</div>

<h1 class="cover-title">抛体运动的规律</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 2
---

# 上节课的实验结论

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">上节课的频闪照片说明，平抛运动可以看成哪两个运动？</div>
<div v-click="1">水平方向：相邻闪光点的间距相等 → 物体以抛出速度 <Latex tex="v_0" /> 做匀速直线运动。</div>
<div v-click="1">竖直方向：间距按 <Latex tex="1:3:5:\cdots" /> 增大 → 物体做自由落体运动。</div>
<div class="key" v-click="2">于是两个方向分别研究：以抛出点为原点 <Latex tex="O" />，<Latex tex="x" /> 轴沿 <Latex tex="v_0" /> 的方向，<Latex tex="y" /> 轴竖直向下。</div>
</div>

<div class="figure" v-click="1"><StrobeDropSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 速度从受力开始算

<div class="page-grow">
<div class="stack">
<div class="ask">物体在水平方向和竖直方向各受什么力？两个方向的加速度分别是多大？</div>
<div class="grid-2">
<div v-click="1">
<div class="mini-title">水平方向</div>
<div>不受力 → <Latex tex="a_x = 0" /></div>
<div><Latex tex="v_x = v_0" />，与时间无关</div>
</div>
<div v-click="2">
<div class="mini-title">竖直方向</div>
<div>只受重力 → <Latex tex="a_y = g" /></div>
<div><Latex tex="v_y = gt" />，初速度为 <Latex tex="0" /></div>
</div>
</div>
<div class="key" v-click="3">水平方向做匀速直线运动，竖直方向做自由落体运动。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 两个分速度合成实际速度

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">已知 <Latex tex="v_x" /> 与 <Latex tex="v_y" />，物体此刻的实际速度多大、朝哪个方向？</div>
<div v-click="1"><Latex tex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{v_0^2 + g^2t^2}" display /><Latex tex="\tan\theta = \frac{v_y}{v_x} = \frac{gt}{v_0}" display /></div>
<div class="key" v-click="2">随着下落，速度越来越大，方向越来越接近竖直向下。</div>
</div>

<div class="figure" v-click="1"><ProjectilePlayground mode="velocity" :v0="5" :h="5" :start="55" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 位移：两个方向的分位移

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">经过时间 <Latex tex="t" />，物体相对抛出点的位置在哪里？</div>
<div>水平方向：<Latex tex="x = v_0t" display />竖直方向：<Latex tex="y = \frac{1}{2}gt^2" display /></div>
<div class="key" v-click="2">合位移 <Latex tex="s = \sqrt{x^2 + y^2}" />，方向用 <Latex tex="\tan\alpha = \frac{y}{x}" /> 表示。</div>
</div>

<div class="figure" v-click="1"><ProjectilePlayground mode="displacement" :v0="4" :h="5" :start="70" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 位移偏角与速度偏角

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>位移偏角：<Latex tex="\tan\alpha = \frac{y}{x} = \frac{gt}{2v_0}" />；速度偏角：<Latex tex="\tan\theta = \frac{v_y}{v_x} = \frac{gt}{v_0}" />。</div>
<div v-click="2">几何上还有一条：把速度反向延长，它与 <Latex tex="x" /> 轴的交点正好在落点横坐标的一半处——也就是落点到 <Latex tex="x" /> 轴那条垂线段的中点。</div>
<div class="key" v-click="3"><Latex tex="\tan\theta = 2\tan\alpha" /></div>
</div>

<div class="figure" v-click="1"><AngleGeometrySvg :show-reverse="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 为什么说它是匀变速曲线运动

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">速度的大小和方向都在变，这种运动还能叫"匀变速"吗？</div>
<div v-click="1">每隔相同的时间 <Latex tex="\Delta t" />，速度的变化量都是 <Latex tex="\Delta v = g\Delta t" />：大小相同，方向都竖直向下。</div>
<div class="key" v-click="2">加速度恒为 <Latex tex="g" />，所以它是匀变速曲线运动——"匀变速"指速度均匀变化，不是速率均匀变化。</div>
</div>

<div class="figure" v-click="1"><DeltaVSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 轨迹是什么形状

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>由 <Latex tex="x = v_0t" /> 解出 <Latex tex="t = \frac{x}{v_0}" />，代入 <Latex tex="y = \frac{1}{2}gt^2" />：</div>
<div><Latex tex="y = \frac{g}{2v_0^2}x^2" display /></div>
<div v-click="1">式中 <Latex tex="\frac{g}{2v_0^2}" /> 是常量，与 <Latex tex="x" />、<Latex tex="y" /> 都无关。</div>
<div class="key" v-click="2">轨迹是抛物线：初速度越大，开口越宽、落点越远。（图中三条轨迹的初速度自上而下依次是 <Latex tex="5" />、<Latex tex="4" />、<Latex tex="3" /> <Latex tex="\text{m/s}" />。）</div>
</div>

<div class="figure" v-click="1">
<CoordAxes
  :x-range="[0, 7.2]"
  :y-range="[-5.6, 0]"
  :x-axis="{ quantity: 'x', unit: 'm' }"
  :y-axis="{ quantity: 'y', unit: 'm', dx: 12, dy: 26 }"
  :ticks="{ x: [], y: [], labels: false, arrows: false }"
  :curves="[
    {
      points: [
        { x: 0, y: 0 },
        { x: 0.5, y: -0.139 },
        { x: 1, y: -0.556 },
        { x: 1.5, y: -1.25 },
        { x: 2, y: -2.222 },
        { x: 2.5, y: -3.472 },
        { x: 3, y: -5 },
        { x: 3.17, y: -5.58 },
      ],
      stroke: 'var(--c-danger)',
      width: 2.8,
      dashed: true,
    },
    {
      points: [
        { x: 0, y: 0 },
        { x: 0.6, y: -0.113 },
        { x: 1.2, y: -0.45 },
        { x: 1.8, y: -1.013 },
        { x: 2.4, y: -1.8 },
        { x: 3, y: -2.813 },
        { x: 3.6, y: -4.05 },
        { x: 4.23, y: -5.59 },
      ],
      stroke: 'var(--c-accent-2)',
      width: 2.8,
      dashed: true,
    },
    {
      points: [
        { x: 0, y: 0 },
        { x: 0.75, y: -0.113 },
        { x: 1.5, y: -0.45 },
        { x: 2.25, y: -1.013 },
        { x: 3, y: -1.8 },
        { x: 3.75, y: -2.813 },
        { x: 4.5, y: -4.05 },
        { x: 5.29, y: -5.6 },
      ],
      stroke: 'var(--c-accent)',
      width: 3.6,
    },
  ]"
  :view="{ width: 600, height: 380 }"
/>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：落地时的速度方向

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="problem">将一个物体以 <Latex tex="10\ \text{m/s}" /> 的速度从 <Latex tex="10\ \text{m}" /> 的高度水平抛出，求落地时它的速度方向与水平地面的夹角 <Latex tex="\theta" />。<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />，不计空气阻力。</div>
<div v-click="1">先分解落地速度：水平分量仍是 <Latex tex="v_x = v_0" />，竖直分量由自由落体求出。</div>
<div v-click="2"><Latex tex="v_y^2 = 2gh" />，得 <Latex tex="v_y = \sqrt{2 \times 10 \times 10}\ \text{m/s} = 14.1\ \text{m/s}" /></div>
<div v-click="3"><Latex tex="\tan\theta = \frac{v_y}{v_x} = \frac{14.1}{10} = 1.41" />，即 <Latex tex="\theta = 55^\circ" /></div>
</div>

<div class="figure"><Example1Svg :show-decomp="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：无人机投弹

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="problem">无人机以 <Latex tex="v_0 = 2\ \text{m/s}" /> 的速度水平向右匀速飞行，某时刻释放一个小球，此时无人机到水平地面的距离 <Latex tex="h = 20\ \text{m}" />。求小球下落的时间，以及释放点与落地点之间的水平距离。<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />，不计空气阻力。</div>
<div v-click="1">小球离开无人机后做平抛运动：竖直方向是自由落体，水平方向是匀速直线运动。</div>
<div v-click="2">竖直方向：<Latex tex="h = \frac{1}{2}gt^2" />，得 <Latex tex="t = \sqrt{\frac{2 \times 20}{10}}\ \text{s} = 2\ \text{s}" /></div>
<div v-click="3">水平方向：<Latex tex="l = v_0t = 2 \times 2\ \text{m} = 4\ \text{m}" /></div>
</div>

<div class="figure"><DroneDropSvg :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 落地量由谁决定

<div class="page-grow">
<div class="stack">
<div class="ask">用 <Latex tex="m" />、<Latex tex="v_0" />、<Latex tex="h" /> 分别表示物体的质量、初速度和抛出点离地高度——下面这些量各由谁决定？</div>
<DropFactorsTable :step="$clicks" />
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 斜抛和平抛，差别在哪里

<div class="page-grow">
<div class="stack page-loose">
<div class="ask">斜向上抛出的球，受力情况和平抛运动有什么不同？</div>
<div v-click="1">完全相同：仍然只受重力，水平方向不受力、加速度为 <Latex tex="0" />，竖直方向加速度为 <Latex tex="g" />。</div>
<div class="key" v-click="2">唯一的差别在初速度方向——斜抛的初速度既有水平分量、也有竖直分量。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 把初速度分解到两个方向

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">初速度 <Latex tex="v_0" /> 与水平方向成角 <Latex tex="\theta" />，两个方向上的初速度各是多少？</div>
<div v-click="1"><Latex tex="v_{0x} = v_0\cos\theta" display /><Latex tex="v_{0y} = v_0\sin\theta" display /></div>
<div class="key" v-click="2">分解之后，斜抛就变成"水平匀速＋竖直上抛"，和平抛用同一套方法处理。</div>
</div>

<div class="figure"><ObliqueDecomposeSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 两个方向各写一套式子

<div class="page-grow">
<div class="stack">
<div class="grid-2">
<div>
<div class="mini-title">水平方向：匀速直线运动</div>
<div><Latex tex="v_x = v_0\cos\theta" /></div>
<div><Latex tex="x = v_0\cos\theta \cdot t" /></div>
</div>
<div>
<div class="mini-title">竖直方向：竖直上抛</div>
<div><Latex tex="v_y = v_0\sin\theta - gt" /></div>
<div><Latex tex="y = v_0\sin\theta \cdot t - \frac{1}{2}gt^2" /></div>
</div>
</div>
<div v-click="1">竖直方向先上升、后下降：最高点处 <Latex tex="v_y = 0" />，上升时间 <Latex tex="t_1 = \frac{v_0\sin\theta}{g}" />。</div>
<div v-click="2">回到抛出点所在高度时 <Latex tex="y = 0" />，总飞行时间 <Latex tex="T = \frac{2v_0\sin\theta}{g}" />。</div>
<div class="key" v-click="3">两个方向共用同一个时间 <Latex tex="t" />，这是把运动"拆开再合上"的桥梁。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 斜抛的轨迹方程

<div class="page-grow">
<div class="stack">
<div>由水平方向的式子解出 <Latex tex="t = \frac{x}{v_0\cos\theta}" />，代入竖直方向的式子：</div>
<div><Latex tex="y = x\tan\theta - \frac{g}{2v_0^2\cos^2\theta}x^2" display /></div>
<div v-click="1">与平抛的轨迹方程相比，多了一项一次项 <Latex tex="x\tan\theta" />——它让抛物线整体"抬起来"，不再经过原点下方。</div>
<div class="key" v-click="2">斜抛的轨迹同样是抛物线，只是顶点不在抛出点。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 射高与射程

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>把 <Latex tex="t_1 = \frac{v_0\sin\theta}{g}" /> 代入竖直方向，得射高：</div>
<div><Latex tex="H = \frac{v_0^2\sin^2\theta}{2g}" display /></div>
<div v-click="1">把总时间 <Latex tex="T" /> 代入水平方向，得射程：<Latex tex="X = v_0\cos\theta \cdot \frac{2v_0\sin\theta}{g} = \frac{2v_0^2}{g}\sin\theta\cos\theta" display /></div>
<div class="key" v-click="2">射程只与 <Latex tex="v_0" /> 和 <Latex tex="\theta" /> 有关，<Latex tex="m" /> 不出现在任何式子里。</div>
</div>

<div class="figure">
<CoordAxes
  :x-range="[0, 44]"
  :y-range="[0, 13]"
  :x-axis="{ quantity: 'x', unit: 'm' }"
  :y-axis="{ quantity: 'y', unit: 'm' }"
  :ticks="{ x: [], y: [], labels: false, arrows: false }"
  :curves="[{ formula: (x) => x - (x * x) / 40, samples: 64, stroke: 'var(--c-accent)', width: 3.4 }]"
  :labels="[
    { x: 20, y: 10, tex: 'H', anchor: 'top-right', color: 'var(--c-physics)', halo: true, size: 17 },
    { x: 40, y: 0, tex: 'X', anchor: 'bottom-right', color: 'var(--c-accent)', halo: true, size: 17 },
  ]"
  :view="{ width: 540, height: 340 }"
/>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 多大的抛射角射得最远

<div class="page-grow page-dense">
<div class="stack stack-tight">
<div class="ask">初速度大小一定时，往哪个方向抛射得最远？</div>
<div class="grid-side">
<div class="stack stack-tight">
<div v-click="1">把 <Latex tex="T = \frac{2v_0\sin\theta}{g}" /> 代入水平方向：<Latex tex="X = v_0\cos\theta \cdot T = \frac{2v_0^2}{g}\,\sin\theta\cos\theta" /></div>
<div v-click="1">由 <Latex tex="\sin^2\theta + \cos^2\theta = 1" /> 与 <Latex tex="(\sin\theta - \cos\theta)^2 \ge 0" /> 得 <Latex tex="\sin\theta\cos\theta \le \frac{1}{2}" />，<Latex tex="\theta = 45^\circ" /> 时取等号。</div>
<div class="key" v-click="2"><Latex tex="\theta = 45^\circ" /> 时射程最大：<Latex tex="X_{\max} = \frac{v_0^2}{g}" />。</div>
</div>

<div class="figure"><ObliqueProjectileDemo :v0="20" /></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 互补的两个抛射角

<div class="page-grow page-dense">
<div class="stack stack-tight">
<div class="ask">抛射角取 <Latex tex="30^\circ" /> 和 <Latex tex="60^\circ" />（或 <Latex tex="15^\circ" /> 和 <Latex tex="75^\circ" />），射程一样吗？</div>
<div class="grid-side">
<div class="stack stack-tight">
<div v-click="1">对比出来：<Latex tex="30^\circ" /> 与 <Latex tex="60^\circ" /> 的射程都是 <Latex tex="34.6\ \text{m}" />，<Latex tex="15^\circ" /> 与 <Latex tex="75^\circ" /> 都是 <Latex tex="20.0\ \text{m}" />。</div>
<div v-click="1">射程 <Latex tex="X = \frac{2v_0^2}{g}\,\sin\theta\cos\theta" />；互补角满足 <Latex tex="\sin(90^\circ - \theta) = \cos\theta" />、<Latex tex="\cos(90^\circ - \theta) = \sin\theta" />，两个数只是交换位置，乘积不变。</div>
<div class="key" v-click="2">射程只由 <Latex tex="\sin\theta\cos\theta" /> 决定：互补角射程相同；<Latex tex="45^\circ" /> 与它自己互补，乘积在这里最大。</div>
</div>

<div class="figure"><ObliqueProjectileDemo :v0="20" :initial-angle="30" :show-complement="$clicks >= 1" /></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：投篮

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="problem">篮球以与水平面成 <Latex tex="45^\circ" /> 的倾角准确落入篮筐，投球点与篮筐恰在同一水平面上、相距 <Latex tex="9.8\ \text{m}" />。不计空气阻力，<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />，求进筐时的速度大小和最高点相对篮筐的高度。</div>
<div v-click="1">投球点与篮筐等高，所以水平位移就是射程：<Latex tex="X = \frac{2v_0^2}{g}\sin\theta\cos\theta" />。</div>
<div v-click="2"><Latex tex="9.8 = \frac{v_0^2 \times 1}{10}" />，得 <Latex tex="v_0^2 = 98\ \text{m}^2/\text{s}^2" />，<Latex tex="v_0 = 9.9\ \text{m/s}" />。</div>
<div v-click="3">最高点高度 <Latex tex="H = \frac{v_0^2\sin^2\theta}{2g} = \frac{98 \times 0.5}{20}\ \text{m} = 2.45\ \text{m}" />。</div>
</div>

<div class="figure">
<CoordAxes
  :x-range="[0, 11]"
  :y-range="[0, 3.2]"
  :x-axis="{ quantity: 'x', unit: 'm' }"
  :y-axis="{ quantity: 'y', unit: 'm' }"
  :ticks="{ x: [], y: [], labels: false, arrows: false }"
  :curves="[{ formula: (x) => x - (10 * x * x) / 196, samples: 64, stroke: 'var(--c-accent)', width: 3.4 }]"
  :labels="[
    { x: 9.8, y: 0, tex: 'P', anchor: 'bottom-right', color: 'var(--c-danger)', dot: 6 },
    { x: 4.9, y: 2.45, tex: 'H', anchor: 'top-right', color: 'var(--c-physics)', halo: true, size: 17 },
  ]"
  :view="{ width: 540, height: 340 }"
/>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 空气阻力不能忽略的时候

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">炮弹实际飞出的轨迹，还是一条抛物线吗？</div>
<div v-click="1">先看理想情形：不计阻力时，轨迹是一条对称的抛物线。</div>
<div v-click="2">速度越大，空气阻力越大。阻力一直在"拖后腿"，实际轨迹不再左右对称。</div>
<div class="key" v-click="3">实际轨迹落得更近、落地更陡——前面所有结论都有前提：不计空气阻力。</div>
</div>

<div class="figure" v-click="1"><AirDragCompareSvg :show-real="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 0
---

# 平抛与斜抛对照

<div class="page-grow">
<div class="stack">
<table class="cmp-table">
<thead>
<tr><th>对比项</th><th>平抛运动</th><th>斜抛运动</th></tr>
</thead>
<tbody>
<tr><td>受力</td><td>只受重力</td><td>只受重力</td></tr>
<tr><td>初速度</td><td>水平，<Latex tex="v_{0x} = v_0" />、<Latex tex="v_{0y} = 0" /></td><td>斜向，<Latex tex="v_{0x} = v_0\cos\theta" />、<Latex tex="v_{0y} = v_0\sin\theta" /></td></tr>
<tr><td>水平方向</td><td>匀速，<Latex tex="x = v_0t" /></td><td>匀速，<Latex tex="x = v_0\cos\theta \cdot t" /></td></tr>
<tr><td>竖直方向</td><td>自由落体，<Latex tex="y = \frac{1}{2}gt^2" /></td><td>竖直上抛，<Latex tex="y = v_0\sin\theta \cdot t - \frac{1}{2}gt^2" /></td></tr>
<tr><td>轨迹</td><td>抛物线，顶点在抛出点</td><td>抛物线，顶点在最高点</td></tr>
</tbody>
</table>
<div class="key">抛体运动的共同点：两个方向独立计算，再用同一个时间把它们合起来。</div>
</div>
</div>

---
layout: base-flex
clicks: 0
---

# 本课时小结

<div class="page-grow">
<div class="stack">
<div class="grid-2">
<div>
<div class="mini-title">平抛运动</div>
<div><Latex tex="v_x = v_0" />，<Latex tex="v_y = gt" />，<Latex tex="x = v_0t" />，<Latex tex="y = \frac{1}{2}gt^2" /></div>
<div><Latex tex="v = \sqrt{v_0^2 + g^2t^2}" />，<Latex tex="\tan\theta = \frac{gt}{v_0}" />，<Latex tex="\tan\theta = 2\tan\alpha" /></div>
<div><Latex tex="y = \frac{g}{2v_0^2}x^2" />；<Latex tex="\Delta v = g\Delta t" />，匀变速曲线运动</div>
</div>
<div>
<div class="mini-title">斜抛运动</div>
<div><Latex tex="v_{0x} = v_0\cos\theta" />，<Latex tex="v_{0y} = v_0\sin\theta" /></div>
<div><Latex tex="T = \frac{2v_0\sin\theta}{g}" />，<Latex tex="H = \frac{v_0^2\sin^2\theta}{2g}" />，<Latex tex="X = \frac{2v_0^2}{g}\sin\theta\cos\theta" /></div>
<div><Latex tex="\theta = 45^\circ" /> 时射程最大，<Latex tex="X_{\max} = \frac{v_0^2}{g}" /></div>
</div>
</div>
<div>作业：教材 5.4 练习与应用第 2 题（用一把刻度尺测出钢球离开水平桌面时的速度）。</div>
<div class="key">先分解到两个方向，再用同一个时间 <Latex tex="t" /> 把位移和速度合回来。</div>
</div>
</div>

---
layout: cover
---

<div class="cover-chapter"><span class="cover-section">§</span> 5.4 · 第二课时</div>

<h1 class="cover-title">平抛运动与各种"面"</h1>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 2
---

# 检验一：落到水平面上

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">同一高度、初速度分别为 <Latex tex="v_0" /> 与 <Latex tex="2v_0" /> 平抛两个小球，落到水平面上：飞行时间相同吗？水平距离相同吗？</div>
<div v-click="1">竖直方向都是自由落体：<Latex tex="h = \frac{1}{2}gt^2" />，<Latex tex="t = \sqrt{\frac{2h}{g}}" />，与初速度无关。</div>
<div class="key" v-click="2">落地时间相同（下落高度被"锁死"）；初速度 2 倍，落点的水平距离也是 2 倍。</div>
</div>

<div class="figure"><GroundHitCompareSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 检验二：打在竖直墙面上

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">同样两个小球，前方有一堵竖直墙面：它们撞墙的时间相同吗？撞墙时的竖直分速度呢？</div>
<div v-click="1">水平方向都是匀速直线运动：<Latex tex="L = v_0t" />，<Latex tex="t = \frac{L}{v_0}" />，初速度越大越早到墙。</div>
<div class="key" v-click="2">到墙时间由初速度决定（水平距离被"锁死"）；初速度 2 倍，撞墙时 <Latex tex="v_y = \frac{gL}{v_0}" /> 减半、撞得更高。</div>
</div>

<div class="figure"><WallHitCompareSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 楼梯上的平抛

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="problem">在楼梯底端上方一定高度处沿水平方向抛出一个小球。楼梯越往远处台阶越高。小球落在<b>更远、更高</b>的台阶上，与落在<b>更近、更低</b>的台阶上相比，飞行时间、水平距离和初速度分别哪个更大？</div>
<div v-click="1">更远、更高的台阶离抛出点更近：下落高度更小，飞行时间更短。</div>
<div v-click="2">但它同时又更远：水平距离更大。</div>
<div class="key" v-click="3">由 <Latex tex="v_0 = \frac{x}{t}" />，分子更大、分母更小，所以落到更高台阶的初速度一定更大。</div>
</div>

<div class="figure"><StaircaseSvg :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 平抛与斜面（一）：垂直落在斜面上

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">小球垂直落到倾角为 <Latex tex="\theta" /> 的斜面上，速度方向要满足什么条件？</div>
<div v-click="1">速度与斜面垂直 ⇒ 速度与水平方向的夹角为 <Latex tex="90^\circ - \theta" />，即 <Latex tex="\frac{v_x}{v_y} = \tan\theta" /></div>
<div class="key" v-click="2">若抛出点就在斜面顶端，再叠加"落点在斜面上"（<Latex tex="\frac{y}{x} = \tan\theta" />），可得 <Latex tex="\tan^2\theta = \frac{1}{2}" />，即 <Latex tex="\theta \approx 35.3^\circ" />，飞行时间 <Latex tex="t = \frac{2v_0\tan\theta}{g}" />。</div>
</div>

<div class="figure"><InclineCasesSvg :variant="1" :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 平抛与斜面（二）：落回斜面

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">从斜面顶端沿水平方向抛出，又落回斜面上，位移和速度各有什么固定之处？</div>
<div v-click="1">位移方向沿斜面：<Latex tex="\tan\theta = \frac{y}{x} = \frac{gt}{2v_0}" />，所以 <Latex tex="t = \frac{2v_0\tan\theta}{g}" />，飞行时间与 <Latex tex="v_0" /> 成正比。</div>
<div class="key" v-click="2">落点速度方向也固定：<Latex tex="\tan\varphi = \frac{v_y}{v_x} = \frac{gt}{v_0} = 2\tan\theta" />，与 <Latex tex="v_0" /> 无关。</div>
</div>

<div class="figure"><InclineCasesSvg :variant="2" :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 平抛与斜面（三）：位移垂直于斜面

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">落在斜面上时，位移正好与斜面垂直——这时又该从哪里下手？</div>
<div v-click="1">位移与斜面垂直 ⇒ 位移与水平方向的夹角为 <Latex tex="90^\circ - \theta" />，即 <Latex tex="\frac{y}{x} = \cot\theta" />。</div>
<div class="key" v-click="2">代入 <Latex tex="\frac{gt}{2v_0} = \cot\theta" />，得 <Latex tex="t = \frac{2v_0\cot\theta}{g}" />；落点速度方向 <Latex tex="\tan\varphi = \frac{gt}{v_0} = 2\cot\theta" />。</div>
</div>

<div class="figure"><InclineCasesSvg :variant="3" :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 0
---

# 三种斜面情形的对照

<div class="page-grow">
<div class="stack">
<table class="cmp-table">
<thead>
<tr><th>情形</th><th>突破口</th><th>得到的关系</th></tr>
</thead>
<tbody>
<tr><td>垂直落在斜面上</td><td>速度与斜面垂直</td><td><Latex tex="\frac{v_x}{v_y} = \tan\theta" /></td></tr>
<tr><td>从顶端抛出又落回斜面</td><td>位移方向沿斜面</td><td><Latex tex="t = \frac{2v_0\tan\theta}{g}" />，<Latex tex="\tan\varphi = 2\tan\theta" /></td></tr>
<tr><td>落在斜面上时位移垂直于斜面</td><td>位移与斜面垂直</td><td><Latex tex="t = \frac{2v_0\cot\theta}{g}" />，<Latex tex="\tan\varphi = 2\cot\theta" /></td></tr>
</tbody>
</table>
<div class="key">斜面题只有两条路：要么锁定<b>速度方向</b>，要么锁定<b>位移方向</b>，再联立两个方向的公式。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 平抛与圆弧（一）：沿切线进入

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">小球恰好沿切线进入圆弧轨道，"恰好"两个字怎么翻译成等式？</div>
<div v-click="1">落点处速度方向与该点的轨道切线方向相同；而半径与切线垂直，所以切线方向由圆心和落点一起确定。</div>
<div class="key" v-click="2">用两条关系联立：速度方向给出 <Latex tex="\tan\varphi = \frac{v_y}{v_x}" />，几何关系给出落点坐标的约束，即可解出 <Latex tex="v_0" />。</div>
</div>

<div class="figure"><ArcCasesSvg :variant="1" :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 平抛与圆弧（二）：从圆心抛向圆弧

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">从圆心水平抛出，落在四分之一圆弧上。半径 <Latex tex="R" />、初速度 <Latex tex="v_0" /> 和落点半径的偏角 <Latex tex="\theta" /> 之间是什么关系？</div>
<div v-click="1">水平方向 <Latex tex="v_0t = R\cos\theta" />，竖直方向 <Latex tex="\frac{1}{2}gt^2 = R\sin\theta" />。</div>
<div v-click="2">两式消去 <Latex tex="t" />：<Latex tex="v_0^2 = \frac{gR\cos^2\theta}{2\sin\theta}" /></div>
<div class="key" v-click="3">落点速度方向同样由 <Latex tex="\tan\varphi = 2\tan\theta" /> 给出——和斜面题是同一个关系。</div>
</div>

<div class="figure"><ArcCasesSvg :variant="2" :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 平抛与圆弧（三）：速度不可能指向圆心

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">从半圆轨道的同一端水平抛入，有没有可能让小球的速度方向恰好指向圆心？</div>
<div v-click="1">速度的反向延长线交抛出高度线于水平位移的一半：速度越小、交点越靠左；速度很大时交点才逼近圆心，但始终在<b>圆心左侧</b>。</div>
<div class="key" v-click="2">要指向圆心，水平位移必须等于 <Latex tex="2R" />——那要求落点与抛出点等高，可平抛一定要下落，所以任何落点的速度方向都不可能过圆心。</div>
</div>

<div class="figure"><ArcCasesSvg :variant="3" :show-analysis="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 临界问题：既过网又不出界

<div class="page-grow">
<div class="stack">
<div class="problem">从高出地面 <Latex tex="h_1" /> 处水平击出，网顶高出地面 <Latex tex="h_2" />、距击球点水平距离 <Latex tex="L_1" />，边界距击球点水平距离 <Latex tex="L_2" />。求初速度 <Latex tex="v_0" /> 的范围。</div>
<div class="grid-side">
<div class="stack">
<div v-click="1">恰好过网：<Latex tex="t_1 = \sqrt{\frac{2(h_1 - h_2)}{g}}" />，要求 <Latex tex="v_0 \ge \frac{L_1}{t_1}" /></div>
<div v-click="2">恰好不出界：<Latex tex="t_2 = \sqrt{\frac{2h_1}{g}}" />，要求 <Latex tex="v_0 \le \frac{L_2}{t_2}" /></div>
<div v-click="3">例如 <Latex tex="h_1 = 2.5\ \text{m}" />、<Latex tex="h_2 = 1.5\ \text{m}" />、<Latex tex="L_1 = 3\ \text{m}" />、<Latex tex="L_2 = 9\ \text{m}" />：<Latex tex="6.7\ \text{m/s} \le v_0 \le 12.7\ \text{m/s}" /></div>
<div class="key" v-click="4">临界问题的套路：把"恰好"写成等号，下限由过网给出、上限由不出界给出。</div>
</div>

<div class="figure"><SmashCourtSvg :show-analysis="$clicks >= 2" /></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 拓展：平抛运动中的"极值"问题

<div class="page-grow">
<div class="stack">
<div class="ask">同样的抛出高度，初速度、落点位置和落点速度之间还有最优解吗？</div>
<div v-click="1">从圆心水平抛出、落到半径为 <Latex tex="R" /> 的圆周上：落点速度最小时 <Latex tex="\sin\theta = \frac{1}{\sqrt{3}}" />（<Latex tex="\theta" /> 为落点半径与水平方向的夹角），此时 <Latex tex="v_{\min} = \sqrt{3gR}" />、<Latex tex="v_0 = \sqrt{\frac{gR}{\sqrt{3}}}" />。</div>
<div v-click="2">同类问题还有：斜面底端正上方 <Latex tex="h" /> 处平抛落到斜面上、高度 <Latex tex="h" /> 处平抛落到抛物面 <Latex tex="y = ax^2" /> 上，都用<b>基本不等式</b>或<b>判别式</b>求极值。</div>
<div class="key">这一类问题属于课后拓展，正式课不作要求；完整推导见 <a href="https://mister-hope.com/physics/high-school/3.html" target="_blank" rel="noopener">平抛运动中的"极值"问题</a>。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 拓展：斜抛的最远距离

<div class="page-grow">
<div class="stack">
<div class="ask">抛出高度不为零时，最远射程对应的抛射角还是 <Latex tex="45^\circ" /> 吗？</div>
<div v-click="1">从高 <Latex tex="h" /> 的平台边缘以 <Latex tex="v_0" /> 抛出，最远水平距离 <Latex tex="x_{\max} = \frac{v_0}{g}\sqrt{v_0^2 + 2gh}" />，此时 <Latex tex="\tan\theta = \frac{v_0}{\sqrt{v_0^2 + 2gh}}" />——比 <Latex tex="45^\circ" /> 更平。</div>
<div v-click="2">从倾角为 <Latex tex="\theta" /> 的斜面顶端抛出：<Latex tex="L_{\max} = \frac{v_0^2}{g(1 - \sin\theta)}" />，出手方向 <Latex tex="\alpha = 45^\circ - \frac{\theta}{2}" />；从斜面底端抛出则是 <Latex tex="\alpha = 45^\circ + \frac{\theta}{2}" />。</div>
<div class="key">统一方法：把落点条件代入轨迹方程，得到关于 <Latex tex="\tan\theta" /> 的二次方程，用判别式 <Latex tex="\Delta \ge 0" /> 求极值。完整推导见 <a href="https://mister-hope.com/physics/high-school/2.html" target="_blank" rel="noopener">斜抛最远距离问题</a>。</div>
</div>
</div>

---
layout: base-flex
clicks: 0
---

# 全课小结

<div class="page-grow">
<div class="stack">
<div class="grid-2">
<div>
<div class="mini-title">平抛运动</div>
<div><Latex tex="v_x = v_0" />，<Latex tex="v_y = gt" />，<Latex tex="x = v_0t" />，<Latex tex="y = \frac{1}{2}gt^2" /></div>
<div><Latex tex="y = \frac{g}{2v_0^2}x^2" />，<Latex tex="\Delta v = g\Delta t" /></div>
</div>
<div>
<div class="mini-title">斜抛运动</div>
<div><Latex tex="v_{0x} = v_0\cos\theta" />，<Latex tex="v_{0y} = v_0\sin\theta" /></div>
<div><Latex tex="T = \frac{2v_0\sin\theta}{g}" />，<Latex tex="H = \frac{v_0^2\sin^2\theta}{2g}" />，<Latex tex="X = \frac{2v_0^2}{g}\sin\theta\cos\theta" /></div>
</div>
</div>
<div class="divider-l"></div>
<div class="grid-2">
<div>
<div class="mini-title">遇到"面"</div>
<div>墙面 / 水平面：先看哪个量被锁死</div>
<div>斜面：锁定速度方向或位移方向，再联立</div>
</div>
<div>
<div class="mini-title">遇到圆弧</div>
<div>切线进入：速度方向＝切线方向</div>
<div>圆心抛出：<Latex tex="v_0^2 = \frac{gR\cos^2\theta}{2\sin\theta}" /></div>
<div>速度反向延长线交水平位移的中点</div>
</div>
</div>
<div class="key">一条主线：先分解到两个方向，用同一个时间 <Latex tex="t" /> 把位移和速度合回来。</div>
</div>
</div>
