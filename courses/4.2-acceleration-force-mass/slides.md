---
theme: default
title: "实验：探究加速度与力、质量的关系"
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

<div class="cover-chapter"><span class="cover-section">§</span> 4.2 · 第四章 运动和力的关系</div>

<h1 class="cover-title">实验：探究加速度与力、质量的关系</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverPlot />
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask ask-hero">上一节课的最后，我们只得到一个<b>猜想</b>：<Latex tex="a \propto \dfrac{F}{M}" />。<br>怎样用实验<b>验证</b>它是否成立？</div>
</div>

---
layout: base-flex
clicks: 3
---

# 实验思路：控制变量

<div class="page-grow">
<div class="ask">三个量缠在一起，怎么研究它们的关系？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<div class="mini-title">小车质量 <Latex tex="M" /> 一定</div>
<div>改变槽码个数来改变拉力 <Latex tex="F" />，看 <Latex tex="a" /> 与 <Latex tex="F" /> 的关系。</div>
</div>
<div class="divider-l stack" v-click="2">
<div class="mini-title">拉力 <Latex tex="F" /> 一定</div>
<div>在小车上增减钩码来改变 <Latex tex="M" />，看 <Latex tex="a" /> 与 <Latex tex="M" /> 的关系。</div>
</div>
</div>

<div v-click="3" class="mini-note">每换一组配置，木板的倾角、纸带、计时器的位置都要保持原样。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 绳的拉力等于槽码的重力吗？

<div class="page-grow">
<div class="ask ask-lead">绳子对小车施加的拉力，真等于槽码的重力吗？</div>

<div v-click="1">对小车：<Latex tex="F_T = Ma" />；对槽码：<Latex tex="mg - F_T = ma" />。</div>

<div v-click="2">两式联立消去 <Latex tex="a" />：<Latex tex="mg = (M + m)a" />，得 <Latex tex="a = \frac{mg}{M + m}" />。</div>

<div v-click="3">代回小车：<Latex tex="F_T = Ma = \frac{Mmg}{M + m} = \frac{mg}{1 + \frac{m}{M}}" />。</div>

<div v-click="4" class="key">可见 <Latex tex="F_T" /> 总比 <Latex tex="mg" /> 小一点。只有当槽码质量 <Latex tex="m" /> 远小于小车质量 <Latex tex="M" />（即 <Latex tex="m \ll M" />）时，<Latex tex="\frac{m}{M} \to 0" />，才有 <Latex tex="F_T \approx mg" />。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 平衡摩擦力

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="ask"><Latex tex="m \ll M" /> 只是前提之一。木板放平，小车还要受摩擦阻力 —— 这时的 <Latex tex="F" /> 还是合力吗？</div>
<div v-click="1" class="step-row"><span class="step-num">1</span><span>把<b>打点计时器那一端垫高</b>，用重力沿斜面的分力抵消阻力。</span></div>
<div v-click="2" class="step-row"><span class="step-num">2</span><span>判断标准：<b>不挂槽码</b>、<b>带上纸带</b>，轻推小车，纸带打点均匀（小车匀速）。</span></div>
<div v-click="3" class="key">改变小车上钩码的质量后，<b>不需要重新平衡</b>。</div>
</div>
<div class="divider-l stack">
<ExperimentSetupSvg :tilted="$clicks >= 1" />
<div class="fig-note">点击「垫高」：木板抬起，底下加垫高块</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 测量与操作

<div class="page-grow">
<div class="stack">
<div class="mini-title">加速度怎么测</div>
<div>用打点计时器和纸带，方法与第二章的实验相同；纸带先带回去，下一课时再算 <Latex tex="a" />。</div>
</div>

<div class="stack">
<div class="mini-title">操作顺序</div>
<div class="step-row"><span class="step-num">1</span><span>纸带穿过限位孔，小车停在<b>靠近打点计时器</b>的一端。</span></div>
<div class="step-row"><span class="step-num">2</span><span>先接通电源，等打点稳定后，再释放小车。</span></div>
<div class="step-row"><span class="step-num">3</span><span>小车到达滑轮前及时断开电源，防止撞上滑轮。</span></div>
</div>

<div class="key">顺序记牢：<b>先接通电源，后释放小车</b>。</div>
</div>

---
layout: base-flex
---

# 实验任务与记录

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">任务 A：小车质量 <Latex tex="M" /> 一定</div>
<div>只改变槽码个数（1 → 4 个），每挡做一条纸带。</div>
<div class="mini-title">任务 B：槽码个数一定</div>
<div>只在小车上增减钩码改变 <Latex tex="M" />，每挡做一条纸带。</div>
</div>

<div class="divider-l stack">
<div class="mini-title">记录卡</div>
<table class="record-table">
<thead>
<tr><th>编号</th><th>小车总质量 <Latex tex="M" /> /kg</th><th>槽码总质量 <Latex tex="m" /> /kg</th></tr>
</thead>
<tbody>
<tr><td class="lead">A1</td><td></td><td></td></tr>
<tr><td class="lead">A2</td><td></td><td></td></tr>
<tr><td class="lead">B1</td><td></td><td></td></tr>
<tr><td class="lead">B2</td><td></td><td></td></tr>
</tbody>
</table>
</div>
</div>

<div class="mini-note">纸带一离手就对不上配置：每做一条，立刻在纸带一端写好编号与两个质量。当场自查：点迹清晰不丢点 ｜ 相邻计数点间距均匀增大 ｜ 槽码越多，间距增大越快。</div>
</div>

---
layout: cover
---

<div class="cover-chapter"><span class="cover-section">§</span> 4.2 · 第四章 运动和力的关系 · 第二课时</div>

<h1 class="cover-title">实验：探究加速度与力、质量的关系</h1>

<div class="cover-subtitle">
  <span>第二课时 · 原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverPlot />
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask ask-hero">纸带已经在手上了：怎么把它变成 <Latex tex="a" />？<br>又怎么从 <Latex tex="a" /> 看出它与 <Latex tex="F" />、<Latex tex="M" /> 的关系？</div>
</div>

---
layout: base-flex
clicks: 3
---

# 用纸带求加速度（逐差法）

<div class="page-grow">
<div class="ask">纸带上量出连续 6 段位移，每段对应的时间都是 <Latex tex="T" />。怎么一次求出 <Latex tex="a" />？</div>

<div class="tape-figure">
<TapeSixIntervalsSvg />
</div>

<div v-click="1">相邻两段相减：<Latex tex="x_2 - x_1 = aT^2" />……但只用两段数据，误差大。</div>

<div v-click="2">把数据<b>前后两半分组相减</b>：<Latex tex="a = \frac{(x_4 + x_5 + x_6) - (x_1 + x_2 + x_3)}{(3T)^2}" /></div>

<div v-click="3" class="key">6 段数据全部用上，误差被摊平。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 量出的是奇数段怎么办

<div class="page-grow">
<div class="ask">段数是奇数，前后分不成两半，怎么办？</div>

<div class="tape-figure">
<TapeSevenIntervalsSvg />
</div>

<div v-click="1"><b>舍去第 1 段</b>：它点迹最密，相对误差最大。</div>

<div v-click="2">剩下 6 段，就变回上一页的情形：<Latex tex="a = \frac{(x_5 + x_6 + x_7) - (x_2 + x_3 + x_4)}{(3T)^2}" /></div>

<div v-click="3" class="key">另有一条路：先作出 <Latex tex="v" />-<Latex tex="t" /> 图像，再由图像的<b>斜率</b>求加速度。</div>
</div>

---
layout: base-flex
---

# 填表

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">表 1：小车质量 <Latex tex="M" /> 一定</div>
<table class="record-table">
<thead>
<tr><th class="lead">序号</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
</thead>
<tbody>
<tr><td class="lead"><Latex tex="F/\text{N}" /></td><td></td><td></td><td></td><td></td></tr>
<tr><td class="lead"><Latex tex="a/(\text{m/s}^2)" /></td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="divider-l stack">
<div class="mini-title">表 2：拉力 <Latex tex="F" /> 一定</div>
<table class="record-table">
<thead>
<tr><th class="lead">序号</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
</thead>
<tbody>
<tr><td class="lead"><Latex tex="M/\text{kg}" /></td><td></td><td></td><td></td><td></td></tr>
<tr><td class="lead"><Latex tex="a/(\text{m/s}^2)" /></td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>
</div>
</div>

<div class="mini-note">纸带上的编号对上了，两个质量也对上了 —— 现在可以把算出的 <Latex tex="a" /> 填进表里。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 先看加速度与拉力的关系

<div class="page-grow">
<div class="ask">把表 1 的数据画成 <Latex tex="a" />-<Latex tex="F" /> 图像（<Latex tex="a" /> 作纵轴），这些点说明了什么？</div>

<div class="graph-box">

```comp CoordAxes
x-range: [-0.5, 6.4]
y-range: [-0.6, 5.2]
x-axis: { quantity: F, side: above }
y-axis: { quantity: a }
ticks:
  x: [1, 2, 3, 4, 5]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 420, height: 300 }
curves:
  - points: [{ x: 0, y: 0 }, { x: 5.2, y: 4.55 }]
    stroke: var(--c-accent)
    width: 3
labels:
  - x: 1
    y: 0.88
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 2
    y: 1.78
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 3
    y: 2.55
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 4
    y: 3.6
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 5
    y: 4.35
    dot: 5
    dotColor: var(--c-accent-2)
```

</div>

<div v-click="1" class="key">各点落在一条<b>过原点的直线</b>附近 —— 质量一定时，<Latex tex="a \propto F" />。</div>
</div>

---
layout: base-flex
---

# 再画加速度与质量的关系

<div class="page-grow">
<div class="ask">同样把表 2 的数据画成 <Latex tex="a" />-<Latex tex="M" /> 图像（<Latex tex="a" /> 仍作纵轴），能直接看出关系吗？</div>

<div class="graph-box">

```comp CoordAxes
x-range: [-0.5, 6.4]
y-range: [-0.6, 5.2]
x-axis: { quantity: M, side: above }
y-axis: { quantity: a }
ticks:
  x: [1, 2, 3, 4, 5]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 420, height: 300 }
curves:
  - points: [{ x: 1, y: 4.7 }, { x: 1.5, y: 3.13 }, { x: 2, y: 2.35 }, { x: 3, y: 1.57 }, { x: 4, y: 1.18 }, { x: 5, y: 0.94 }]
    stroke: var(--c-accent)
    width: 3
labels:
  - x: 1
    y: 4.7
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 1.5
    y: 3.13
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 2
    y: 2.35
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 3
    y: 1.57
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 4
    y: 1.18
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 5
    y: 0.94
    dot: 5
    dotColor: var(--c-accent-2)
```

</div>

<div class="key">图线是一条<b>弯曲的曲线</b>：可能是 <Latex tex="a \propto \frac{1}{M}" />，也可能是 <Latex tex="a \propto \frac{1}{M^2}" /> —— 双曲线很难分辨。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 换一个坐标，把曲线拉直

<div class="page-grow">
<div class="ask">如果 <Latex tex="a" /> 与 <Latex tex="M" /> 成反比，那么 <Latex tex="a" /> 就应该与 <Latex tex="\frac{1}{M}" /> 成正比。把横轴换成 <Latex tex="\frac{1}{M}" /> 再画一次：</div>

<div class="graph-box">

```comp CoordAxes
x-range: [-0.1, 1.2]
y-range: [-0.6, 5.2]
x-axis: { quantity: 1/M, side: above }
y-axis: { quantity: a }
ticks:
  x: [0.25, 0.5, 0.75, 1]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 420, height: 300 }
curves:
  - points: [{ x: 0, y: 0 }, { x: 1.15, y: 5.1 }]
    stroke: var(--c-accent)
    width: 3
labels:
  - x: 1
    y: 4.44
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 0.667
    y: 2.96
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 0.5
    y: 2.22
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 0.333
    y: 1.48
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 0.25
    y: 1.11
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 0.2
    y: 0.89
    dot: 5
    dotColor: var(--c-accent-2)
```

</div>

<div v-click="1" class="key">过原点的直线 —— 拉力一定时 <Latex tex="a \propto \frac{1}{M}" />。合起来：<Latex tex="a \propto \frac{F}{M}" />。</div>
</div>

---
layout: base-flex
---

# 另一种版本：只测位移，不算加速度

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="ask">每做一组都要先算一次 <Latex tex="a" />，有没有办法连 <Latex tex="a" /> 都不用算？</div>
<div class="step-row"><span class="step-num">1</span><span>两辆<b>相同</b>小车，前端系细线跨过滑轮挂小盘，先平衡阻力。</span></div>
<div class="step-row"><span class="step-num">2</span><span>后端两条细线，用<b>黑板擦</b>同时按压在木板上。</span></div>
<div class="step-row"><span class="step-num">3</span><span>抬起黑板擦两车<b>同时启动</b>，按下时<b>同时停下</b>。</span></div>
<div class="step-row"><span class="step-num">4</span><span>量出两车移动的位移 <Latex tex="x_1" />、<Latex tex="x_2" />。</span></div>
</div>

<div class="divider-l stack">
<DisplacementRatioSvg />
<div class="fig-note">两车同时启动、同时停下</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 为什么可以只量位移

<div class="page-grow">
<div class="ask">两车的运动时间相同，位移之比能代替加速度之比吗？</div>

<div v-click="1">两车都做初速度为 0 的匀加速直线运动：<Latex tex="x = \frac{1}{2}at^2" /></div>

<div v-click="2"><Latex tex="t" /> 相同，所以 <Latex tex="x \propto a" />，即 <Latex tex="\frac{x_1}{x_2} = \frac{a_1}{a_2}" /></div>

<div v-click="3" class="key">测出位移之比，就得到了加速度之比 —— 连 <Latex tex="a" /> 都不必算。</div>
</div>

---
layout: base-flex
---

# 误差分析（一）：没有平衡摩擦力

<div class="page-grow">
<div class="ask">木板没有垫高，小车要先克服阻力才能动起来 —— 图线会变成什么样？</div>

<div class="half-grid">
<div class="stack">
<div class="mini-title"><Latex tex="a" />-<Latex tex="F" /> 图像</div>

```comp CoordAxes
x-range: [-0.5, 6.4]
y-range: [-2.6, 5.2]
x-axis: { quantity: F, side: above }
y-axis: { quantity: a }
ticks:
  x: [1, 2, 3, 4, 5]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 340, height: 185 }
curves:
  - points: [{ x: -0.5, y: -1.65 }, { x: 6, y: 4.0 }]
    stroke: var(--c-accent)
    width: 3
```

</div>

<div class="divider-l stack">
<div class="mini-title"><Latex tex="a" />-<Latex tex="\frac{1}{M}" /> 图像</div>

```comp CoordAxes
x-range: [-0.05, 1.2]
y-range: [-2.6, 5.2]
x-axis: { quantity: 1/M, side: above }
y-axis: { quantity: a }
ticks:
  x: [0.25, 0.5, 0.75, 1]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 340, height: 185 }
curves:
  - points: [{ x: -0.05, y: -1.22 }, { x: 1.15, y: 4.2 }]
    stroke: var(--c-accent)
    width: 3
```

</div>
</div>

<div class="key">两条图线都<b>不过原点</b>：在<b>横轴</b>上有正截距，向左延长还与 <Latex tex="a" /> 轴<b>负半轴</b>相交。</div>
</div>

---
layout: base-flex
---

# 误差分析（二）：平衡摩擦力时做大了

<div class="page-grow">
<div class="ask">木板垫得过高，小车不挂槽码也会自己加速下滑 —— 图线又会变成什么样？</div>

<div class="half-grid">
<div class="stack">
<div class="mini-title"><Latex tex="a" />-<Latex tex="F" /> 图像</div>

```comp CoordAxes
x-range: [-0.5, 6.4]
y-range: [-1, 5.2]
x-axis: { quantity: F, side: above }
y-axis: { quantity: a }
ticks:
  x: [1, 2, 3, 4, 5]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 340, height: 185 }
curves:
  - points: [{ x: 0, y: 1.2 }, { x: 6, y: 4.8 }]
    stroke: var(--c-accent)
    width: 3
```

</div>

<div class="divider-l stack">
<div class="mini-title"><Latex tex="a" />-<Latex tex="\frac{1}{M}" /> 图像</div>

```comp CoordAxes
x-range: [-0.05, 1.2]
y-range: [-1, 5.2]
x-axis: { quantity: 1/M, side: above }
y-axis: { quantity: a }
ticks:
  x: [0.25, 0.5, 0.75, 1]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 340, height: 185 }
curves:
  - points: [{ x: 0, y: 1.2 }, { x: 1.15, y: 4.8 }]
    stroke: var(--c-accent)
    width: 3
```

</div>
</div>

<div class="key">两条图线都不过原点：在<b>纵轴 <Latex tex="a" /> </b>上有正截距 —— 没有拉力，小车也有加速度。</div>
</div>

---
layout: base-flex
---

# 误差分析（三）：槽码不够轻

<div class="page-grow">
<div class="ask"><Latex tex="m \ll M" /> 不成立时，还能用 <Latex tex="mg" /> 代替拉力吗？图线会怎么变？</div>

<div class="half-grid">
<div class="stack">
<div class="mini-title"><Latex tex="a" />-<Latex tex="F" /> 图像</div>

```comp CoordAxes
x-range: [-0.4, 6.4]
y-range: [-0.4, 5.2]
x-axis: { quantity: F, side: above }
y-axis: { quantity: a }
ticks:
  x: [1, 2, 3, 4, 5]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 340, height: 185 }
curves:
  - formula: F => 4 * F / (1.6 + F)
    samples: 80
    stroke: var(--c-accent)
    width: 3
  - points: [{ x: 0, y: 4 }, { x: 6.3, y: 4 }]
    stroke: var(--c-text-dim)
    width: 1.5
    dashed: true
labels:
  - x: 0.25
    y: 4
    tex: g
    anchor: top-left
```

</div>

<div class="divider-l stack">
<div class="mini-title"><Latex tex="a" />-<Latex tex="\frac{1}{M}" /> 图像</div>

```comp CoordAxes
x-range: [-0.05, 1.25]
y-range: [-0.4, 5.2]
x-axis: { quantity: 1/M, side: above }
y-axis: { quantity: a }
ticks:
  x: [0.25, 0.5, 0.75, 1]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 340, height: 185 }
curves:
  - formula: u => 4 * u / (0.31 + u)
    samples: 80
    stroke: var(--c-accent)
    width: 3
  - points: [{ x: 0, y: 4 }, { x: 1.25, y: 4 }]
    stroke: var(--c-text-dim)
    width: 1.5
    dashed: true
labels:
  - x: 0.1
    y: 4
    tex: g
    anchor: top-left
```

</div>
</div>

<div class="mini-note">两条图线的斜率都越来越小，最后一起趋近同一条水平虚线 <Latex tex="g" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 为什么会有 g 这条渐近线

<div class="page-grow">
<div class="ask">槽码很重时，小车的加速度最大能到多少？</div>

<div v-click="1">槽码和小车一起加速，整体：<Latex tex="mg = (M + m)a" /></div>

<div v-click="1"><Latex tex="a = \frac{m}{M + m}g = \frac{1}{\frac{M}{m} + 1}g" />，绳的拉力 <Latex tex="F_T = Ma = \frac{Mm}{M + m}g < mg" />。</div>

<div v-click="2" class="key">槽码不再远小于小车时，<Latex tex="\frac{M}{m} \to 0" />，于是 <Latex tex="a \to g" /> —— 这就是那条水平渐近线。</div>

<div v-click="2" class="mini-note">所以实验必须挑「小车重、槽码轻」的组合：<Latex tex="m \ll M" /> 不是可有可无的条件。</div>
</div>

---
layout: base-flex
---

# 实验改进：改用气垫导轨

<div class="page-grow">
<div class="ask">平衡摩擦力总要反复调 —— 有没有办法让摩擦力根本不存在？</div>

<div class="half-grid">
<div class="stack">
<AirTrackSideSvg />
<div class="fig-note">侧视图：气泵把压缩空气送进导轨</div>
</div>
<div class="divider-l stack">
<AirTrackSectionSvg />
<div class="fig-note">截面图：滑块与导轨不接触</div>
</div>
</div>

<div class="key">压缩空气从导轨上的小孔喷出，在滑块与导轨之间形成一层<b>气膜</b>，摩擦力几乎为零 —— <b>不必垫高木板平衡摩擦力</b>，也不用担心倾角调不准。</div>
</div>

---
layout: base-flex
---

# 其他误差来源

<div class="page-grow">
<div class="three-col">
<div class="stack">
<div class="mini-title">倾角不对</div>
<div>垫高得不够或过头，图线就不过原点；每次都按「轻推小车、打点均匀」重新判断。</div>
</div>
<div class="stack">
<div class="mini-title">读数不准</div>
<div>刻度尺量纸带、天平称质量，都有读数误差；多测几次取平均。</div>
</div>
<div class="stack">
<div class="mini-title">纸带与限位孔</div>
<div>纸带和限位孔之间也有摩擦，所以平衡摩擦力时必须把纸带一起带上。</div>
</div>
</div>

<div class="mini-note">只要拉力还靠槽码提供，<Latex tex="m \ll M" /> 这条前提就换不掉。</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="three-col">
<div class="stack">
<div class="mini-title">控制变量</div>
<div><Latex tex="M" /> 一定：作 <Latex tex="a" />-<Latex tex="F" /> 图像；<Latex tex="F" /> 一定：作 <Latex tex="a" />-<Latex tex="\frac{1}{M}" /> 图像。</div>
</div>
<div class="stack">
<div class="mini-title">两个前提</div>
<div>槽码 <Latex tex="m \ll M" />；用重力分力平衡摩擦力。</div>
</div>
<div class="stack">
<div class="mini-title">结论</div>
<div>质量一定时 <Latex tex="a \propto F" />，拉力一定时 <Latex tex="a \propto \frac{1}{M}" />。</div>
</div>
</div>

<div class="key">合起来：<Latex tex="a \propto \frac{F}{M}" /> —— 下一节把它写成等式，就是牛顿第二定律。</div>
</div>
