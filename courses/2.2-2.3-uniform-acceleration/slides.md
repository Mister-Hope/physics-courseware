---
theme: default
title: "匀变速直线运动的速度、位移与时间的关系"
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

<div class="cover-chapter"><span class="cover-section">§</span> 2.2 · 2.3 &nbsp;|&nbsp; 第二章 匀变速直线运动的研究</div>

<h1 class="cover-title">匀变速直线运动的<br />速度、位移与时间的关系</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="tag-icon"><mdi-flask-outline /> 回顾 · 上节课的实验</div>

<div class="ask">上节课量出的 <Latex tex="v" />-<Latex tex="t" /> 图线是一条倾斜的直线：无论 <Latex tex="\Delta t" /> 取在哪一段，<Latex tex="\frac{\Delta v}{\Delta t}" /> 都一样。这说明小车在做什么运动？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2"><b class="text-accent">斜率处处相同 → 加速度保持不变</b>，小车在做匀加速直线运动。</div>

<div v-click="3" class="key">实验只回答了"这一辆小车"。把结论推给<b>一般</b>的匀变速运动：<Latex tex="a" />、<Latex tex="v" />、<Latex tex="x" /> 与 <Latex tex="t" /> 之间的定量关系是什么？<b class="text-accent-2">这就是本课的主线。</b></div>
</div>

<div v-click="1" class="divider-l vt-figure">

```comp CoordAxes
x-range: [0, 6.2]
y-range: [0, 12]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 400, height: 300 }
ticks:
  x: []
  y: []
areas:
  - points: [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 9 }, { x: 0, y: 3 }]
    fill: var(--c-accent)
    fillOpacity: 0.13
curves:
  - points: [{ x: 0, y: 3 }, { x: 5, y: 9 }]
    stroke: var(--c-accent)
    width: 3.5
  - points: [{ x: 0, y: 6 }, { x: 5, y: 6 }]
    stroke: var(--c-accent-2)
    width: 2
    dashed: '7 5'
  - points: [{ x: 2.5, y: 0 }, { x: 2.5, y: 6 }]
    stroke: var(--c-text-dim)
    width: 1.4
    dashed: true
labels:
  - x: 0
    y: 3
    dot: 4
    dotColor: var(--c-accent)
  - x: 5
    y: 9
    dot: 4
    dotColor: var(--c-accent)
  - x: 2.5
    y: 6
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 2.5
    y: 0
    tex: '\frac{t}{2}'
    anchor: center
    dy: 30
    color: var(--c-text-dim)
  - x: 5
    y: 6
    parts:
      - text: 中位线
    anchor: right
    color: var(--c-accent-2)
```
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
---

# 什么样的运动才是直线运动？

<div class="page-grow">
<div class="ask">物体做直线运动，<Latex tex="a" /> 与 <Latex tex="v" /> 之间必须满足什么条件？</div>

<div class="stack">
<div v-click="1">直线运动：物体<b>每时每刻的位置都在同一条直线</b>上。</div>

<div v-click="2">那么每一小段时间内的位移 <Latex tex="\Delta x" /> 也沿这条直线——而 <Latex tex="\Delta x" /> 的方向<b>就是速度的方向</b>，所以速度 <Latex tex="v" /> 时刻都沿这条直线。</div>

<div v-click="3">同理，速度的变化量 <Latex tex="\Delta v" /> 也沿这条直线；由 <Latex tex="a = \frac{\Delta v}{\Delta t}" />，加速度 <Latex tex="a" /> 也时刻沿这条直线。</div>

<div v-click="4" class="key"><Latex tex="a" /> 与 <Latex tex="v" /> <b>共线</b>，是物体做直线运动的首要条件。</div>

<div v-click="5">反过来：<Latex tex="a" /> 与 <Latex tex="v" /> 不共线，速度的方向就会不断改变——那是<b>曲线运动</b>。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow page-grow-tight">
<div class="ask">"运动"这两个字太大。怎么分，才能不重不漏地把常见运动都装进去？</div>

<MotionTree />
</div>

---
layout: base-flex
clicks: 4
---

# 三条判据

<div class="page-grow">
<div class="ask">不看图像，能不能一眼判断"直线还是曲线""是不是匀变速""在加速还是减速"？</div>

<div class="three-col">
<div v-click="1" class="law">
<div class="law-icon"><mdi-ruler /></div>
<div class="law-title">共线 → 直线</div>
<div class="law-note"><Latex tex="a" /> 与 <Latex tex="v" /> 共线：直线运动<br />不共线：曲线运动</div>
</div>

<div v-click="2" class="law">
<div class="law-icon"><mdi-equal /></div>
<div class="law-title">恒定 → 匀变速</div>
<div class="law-note"><Latex tex="a" /> 是常量且不为零 →<br />匀变速直线运动</div>
</div>

<div v-click="3" class="law">
<div class="law-icon"><mdi-swap-horizontal-bold /></div>
<div class="law-title">同号 → 加速</div>
<div class="law-note"><Latex tex="a" /> 与 <Latex tex="v" /> 同号：加速<br />异号：减速</div>
</div>
</div>

<div v-click="4" class="key">"匀变速"三个字，判的就是 <Latex tex="a" /> <b>恒定</b>：加速度不变，速度才"均匀"地变。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 三条线，三种运动

<div class="page-grow">
<div class="ask">同一个坐标系里的三条 <Latex tex="v" />-<Latex tex="t" /> 线，分别描述什么运动？</div>

<div class="half-grid">
<div class="vt-figure">

```comp CoordAxes
x-range: [0, 6.2]
y-range: [0, 13]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 400, height: 300 }
ticks: { x: [], y: [] }
curves:
  - points: [{ x: 0, y: 5 }, { x: 5.5, y: 5 }]
    stroke: var(--c-accent)
    width: 3.5
  - points: [{ x: 0, y: 0.5 }, { x: 5.5, y: 8.5 }]
    stroke: var(--c-accent-2)
    width: 3.5
  - formula: t => 0.5 + 0.35 * t * t
    samples: 40
    stroke: var(--c-physics)
    width: 3.5
```

</div>

<div class="stack">
<div v-click="1" class="vt-note"><span class="vt-chip vt-chip-gold"></span><span>水平线：<Latex tex="v" /> 不随时间变化 → <b>匀速直线运动</b>（<Latex tex="a = 0" />）</span></div>

<div v-click="2" class="vt-note"><span class="vt-chip vt-chip-blue"></span><span>倾斜直线：斜率处处相同 → <b>匀加速直线运动</b></span></div>

<div v-click="3" class="vt-note"><span class="vt-chip vt-chip-teal"></span><span>上凹曲线：斜率越来越大 → 加速度逐渐增大的<b>变加速直线运动</b></span></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 位移藏在面积里

<div class="page-grow">
<div class="ask">匀速运动的位移，初中就会算 <Latex tex="x = vt" />。可再看这幅 <Latex tex="v" />-<Latex tex="t" /> 图——图线下方那块矩形，面积是多少？</div>

<div class="half-grid">
<div class="vt-figure divider-l">
<VtAreaRect />
</div>

<div class="stack">
<div v-click="1">矩形的长是时间 <Latex tex="t" />、宽是速度 <Latex tex="v" />，所以面积 <Latex tex="S = v \cdot t" />。</div>

<div v-click="2" class="key">而 <Latex tex="v \cdot t" /> 恰好就是匀速运动的位移：<b class="text-accent">面积 = 位移</b>。位移"藏"在图线与 <Latex tex="t" /> 轴围成的面积里。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 梯形的面积，凭什么也是位移？

<div class="page-grow page-grow-tight">
<div class="ask">匀速的矩形好办。可匀变速的图线是斜的，图下是一个梯形——凭什么说"面积还是位移"？</div>

<VtAreaRiemann />

<div v-click="4" class="key">把运动分成很多很多小段，每段都当成匀速：<b>小矩形越窄，面积之和越接近位移</b>；分割得非常非常细时，小矩形合起来就是一个梯形，它的面积就是位移。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 梯形的面积，算出来

<div class="page-grow">
<div class="ask">梯形面积怎么算？——把它切成一个矩形加一个三角形。</div>

<VtAreaSplit mode="accel" />

<div v-click="4" class="key">两部分相加，就是匀变速直线运动的<b>位移与时间的关系式</b>。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 减速了，公式还灵吗？

<div class="page-grow">
<div class="ask">刹车时 <Latex tex="a < 0" />，图线向下斜。<Latex tex="x = v_0t + \frac{1}{2}at^2" /> 还能用吗？</div>

<VtAreaSplit mode="decel" />

<div v-click="3" class="key">能用：<b>把 <Latex tex="a" /> 取负值代进去</b>就行。图上就是把外接矩形减去上方缺掉的那个三角形。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 图线穿过时间轴之后

<div class="page-grow page-grow-tight">
<div class="ask">先减速到零、再反向加速，图线会穿过 <Latex tex="t" /> 轴。轴下方那块面积怎么算？</div>

<VtAreaSplit mode="reverse" />

<div v-click="3" class="key">用完整矩形 <Latex tex="v_0t" /> <b>减去</b>大三角形 <Latex tex="\frac{1}{2}at^2" />：轴上方那块把上半梯形<b>剪掉</b>，轴下方那块还要<b>倒扣</b>——这就是"上加下减"。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 速度随时间怎么变？

<div class="page-grow">
<div class="ask">已知初速度 <Latex tex="v_0" /> 和加速度 <Latex tex="a" />，<Latex tex="t" /> 秒后的速度 <Latex tex="v" /> 是多大？</div>

<div class="stack">
<div v-click="1">回到加速度的定义式：<Latex tex="a = \frac{\Delta v}{\Delta t}" /></div>

<div v-click="2">把运动开始时刻取作 0 时刻，则 <Latex tex="\Delta t = t" />；<Latex tex="t" /> 时刻的速度 <Latex tex="v" /> 与初速度 <Latex tex="v_0" /> 之差，就是速度的变化量：<Latex tex="\Delta v = v - v_0" /></div>

<div v-click="3">代入定义式：<Latex tex="a = \frac{v - v_0}{t}" />，整理得 <Latex tex="v = v_0 + at" /></div>

<div v-click="4" class="key">这就是匀变速直线运动的<b>速度与时间的关系式</b>。<Latex tex="at" /> 就是 <Latex tex="t" /> 时间内速度的变化量，再加上初速度，就得到 <Latex tex="t" /> 时刻的速度。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 中间时刻的速度

<div class="page-grow">
<div class="ask">匀加速运动中，中间<b>时刻</b>的速度，和全程的平均速度，哪个大？</div>

<div class="half-grid">
<div class="vt-figure">

```comp CoordAxes
x-range: [0, 6.2]
y-range: [0, 12]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 400, height: 300 }
ticks:
  x: []
  y: []
curves:
  - points: [{ x: 0, y: 2 }, { x: 5.5, y: 10.25 }]
    stroke: var(--c-accent)
    width: 3.5
  - points: [{ x: 3.5, y: 6.5 }, { x: 5.5, y: 6.5 }]
    stroke: var(--c-accent-2)
    width: 1.5
    dashed: true
  - points: [{ x: 5.5, y: 6.5 }, { x: 5.5, y: 10.25 }]
    stroke: var(--c-accent-2)
    width: 1.5
    dashed: true
labels:
  - x: 0
    y: 2
    dot: 4
    dotColor: var(--c-accent)
  - x: 5.5
    y: 10.25
    dot: 4
    dotColor: var(--c-accent)
  - x: 4.3
    y: 6.5
    tex: '\Delta t'
    anchor: bottom-right
    color: var(--c-accent-2)
    halo: true
  - x: 5.5
    y: 8.4
    tex: '\Delta v'
    anchor: right
    color: var(--c-accent-2)
    halo: true
  - x: 1.25
    y: 8.5
    parts:
      - text: 斜率 = 加速度
    anchor: center
    color: var(--c-accent)
    halo: true
```
</div>

<div class="stack">
<div v-click="1">把 <Latex tex="t = \frac{t}{2}" /> 代入速度公式：<Latex tex="v_{\frac{t}{2}} = v_0 + \frac{1}{2}at" /></div>

<div v-click="2">它同时也等于 <Latex tex="v - \frac{1}{2}at" />；两式相加除以 2，正好是首末速度的平均值 <Latex tex="\frac{v_0 + v}{2}" /></div>

<div v-click="3" class="key"><Latex tex="v_{\frac{t}{2}} = \frac{v_0 + v}{2} = \bar{v}" />——在图上，它就是梯形的<b>中位线</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
---

<div class="title-slot">
<div class="ask" v-click.hide="5">有些题只给速度和位移，不问时间——<Latex tex="t" /> 能不能"消掉"？</div>

<div class="slot-title" v-click="5">匀变速直线运动中速度、加速度和位移的关系</div>
</div>

<div class="page-grow">

<div class="stack">
<div v-click="1">位移先用平均速度写：<Latex tex="x = \bar{v}\,t = \frac{v_0 + v}{2}t" />；时间由速度公式反解：<Latex tex="t = \frac{v - v_0}{a}" /></div>

<div v-click="2">把 <Latex tex="t" /> 代入：<Latex tex="x = \frac{v_0 + v}{2} \cdot \frac{v - v_0}{a} = \frac{v^2 - v_0^2}{2a}" /></div>

<div v-click="3">整理得 <Latex tex="v^2 - v_0^2 = 2ax" /></div>

<div v-click="4" class="key">这就是<b>速度与位移的关系式</b>。已知量和未知量都不涉及时间时，用它往往最简便。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 公式总结

<div class="page-grow">
<div class="ask">三个公式长得像，怎么记才不混？——先看每个公式"不含谁"。</div>

<div class="three-col">
<div v-click="1" class="formula-item formula-item-accent">
<div class="formula-name">不含位移 x</div>
<Latex tex="v = v_0 + at" display />
<div class="formula-note">已知 <Latex tex="v_0" />、<Latex tex="a" />、<Latex tex="t" /> 求末速度</div>
</div>

<div v-click="2" class="formula-item">
<div class="formula-name">不含末速度 v</div>
<Latex tex="x = v_0t + \frac{1}{2}at^2" display />
<div class="formula-note">已知 <Latex tex="v_0" />、<Latex tex="a" />、<Latex tex="t" /> 求位移</div>
</div>

<div v-click="3" class="formula-item">
<div class="formula-name">不含时间 t</div>
<Latex tex="v^2 - v_0^2 = 2ax" display />
<div class="formula-note">已知 <Latex tex="v_0" />、<Latex tex="v" />、<Latex tex="x" /> 求 <Latex tex="a" /></div>
</div>
</div>

</div>

---
layout: base-flex
clicks: 6
---

# 卷面上到底写什么？

<div class="page-grow">
<div class="ask">同一道题，为什么有的卷面能拿满分，有的要扣分？</div>

<div class="half-grid">
<div class="stack">
<div class="mini-title"><mdi-pencil-outline /> 规范四步</div>

<div v-click="1" class="step"><span class="step-no">1</span><span>先写"<b>解</b>"</span></div>

<div v-click="2" class="step"><span class="step-no">2</span><span>必要的<b>文字描述</b>：选定正方向、说明是哪一段过程</span></div>

<div v-click="3" class="step"><span class="step-no">3</span><span>写出<b>原始物理公式</b>：用字母，先别代数</span></div>

<div v-click="4" class="step"><span class="step-no">4</span><span><b>代入数据</b>得出结果，单位跟上</span></div>
</div>

<div class="divider-l stack">
<div class="mini-title warn-title"><mdi-alert-circle-outline /> 卷面红线</div>

<div v-click="5" class="warn-text">通分、竖式、试算……这些算术过程<b>一律写在草稿纸上</b>。卷面只留字母公式与代入结果。</div>

<div v-click="6" class="key key-blue">减速问题<b>先建一维坐标系</b>：与正方向一致的量取正号，相反的取负号。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题 1：加速后速度多大？

<div class="page-grow page-grow-tight">
<div class="problem">一辆汽车以 <Latex tex="36 \text{km/h}" /> 的速度在平直公路上匀速行驶。从某时刻起，它以 <Latex tex="0.6 \text{m/s}^2" /> 的加速度加速，<Latex tex="10 \text{s}" /> 末的速度是多少？</div>

<div class="half-grid">
<div class="stack stack-tight">
<div v-click="1">每个数值都要<b>挂到对应的状态上</b>：<Latex tex="v_0 = 36 \text{km/h} = 10 \text{m/s}" /> 是<b>加速开始那一刻</b>的速度；<Latex tex="a = 0.6 \text{m/s}^2" /> 与 <Latex tex="t = 10 \text{s}" /> 是<b>这 10 s 之内</b>的加速度和时长。</div>

<div v-click="2">要求的是<b>这 10 s 结束时</b>的速度，用 <Latex tex="v = v_0 + at" />。</div>

<div v-click="3" class="key">卷面上不写代入算式：交代物理量 → 写原始公式 → 直接给结果。</div>
</div>

<div v-click="4" class="divider-l sheet">
<div class="sheet-title">卷面上这样写</div>

<div>解：汽车做匀加速直线运动。</div>

<div>初速度 <Latex tex="v_0 = 36 \text{km/h} = 10 \text{m/s}" />，加速度 <Latex tex="a = 0.6 \text{m/s}^2" />，时间 <Latex tex="t = 10 \text{s}" />。</div>

<div>由 <Latex tex="v = v_0 + at" /> 得</div>

<div><Latex tex="v = 16 \text{m/s}" /></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
---

# 例题 2

<div class="page-grow">
<div class="problem">某舰载机起飞时，采用弹射装置使飞机获得 <Latex tex="10 \text{m/s}" /> 的速度后，由机上发动机使飞机获得 <Latex tex="25 \text{m/s}^2" /> 的加速度在航母跑道上匀加速前进，<Latex tex="2.4 \text{s}" /> 后离舰升空。飞机匀加速滑行的距离是多少？</div>

<div class="stack">
<div v-click="1">给的是 <Latex tex="v_0" />、<Latex tex="a" />、<Latex tex="t" />，求的是位移 <Latex tex="x" />。已知量与未知量都涉及时间 → 用位移与时间的关系式。</div>

<div v-click="2">由 <Latex tex="x = v_0t + \frac{1}{2}at^2" /> 得</div>

<div v-click="3"><Latex tex="x = 10 \text{m/s} \times 2.4 \text{s} + \frac{1}{2} \times 25 \text{m/s}^2 \times (2.4 \text{s})^2 = 96 \text{m}" /></div>

<div v-click="4" class="key">飞机匀加速滑行的距离是 <Latex tex="96 \text{m}" />。注意 <Latex tex="(2.4 \text{s})^2" /> 要先平方，单位不能丢。</div>

<div v-click="5" class="ask">想一想：如果反过来是<b>着舰</b>——以 <Latex tex="80 \text{m/s}" /> 着舰、<Latex tex="2.5 \text{s}" /> 停下，滑行距离是多少？</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题 3：不给时间

<div class="page-grow">
<div class="problem">动车铁轨旁两相邻里程碑之间的距离是 <Latex tex="1 \text{km}" />。当窗户经过某一里程碑时，屏幕显示的速度是 <Latex tex="126 \text{km/h}" />；动车又前进了 3 个里程碑时，速度变为 <Latex tex="54 \text{km/h}" />。把进站过程视为匀减速直线运动，动车进站的加速度是多少？</div>

<div class="stack">
<div v-click="1" class="ask">全程没有给时间——该用哪个公式？</div>

<div v-click="2">用 <Latex tex="v^2 - v_0^2 = 2ax" />。其中 <Latex tex="v_0 = 126 \text{km/h} = 35 \text{m/s}" />，<Latex tex="v = 54 \text{km/h} = 15 \text{m/s}" />，<Latex tex="x = 3000 \text{m}" />。</div>

<div v-click="3"><Latex tex="a = \frac{v^2 - v_0^2}{2x} = \frac{(15 \text{m/s})^2 - (35 \text{m/s})^2}{2 \times 3000 \text{m}} = -0.167 \text{m/s}^2" /></div>

<div v-click="4" class="key">加速度大小为 <Latex tex="0.167 \text{m/s}^2" />，方向与运动方向<b>相反</b>——负号表示方向，不能丢。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 这节课的收获

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title"><mdi-vector-line /> 一条线段 → 三个公式</div>

<div v-click="1" class="summary-line"><Latex tex="v = v_0 + at" />（不含 <Latex tex="x" />）</div>

<div v-click="2" class="summary-line"><Latex tex="x = v_0t + \frac{1}{2}at^2" />（不含 <Latex tex="v" />）</div>

<div v-click="3" class="summary-line"><Latex tex="v^2 - v_0^2 = 2ax" />（不含 <Latex tex="t" />）</div>
</div>

<div class="divider-l stack">
<div class="mini-title"><mdi-lightbulb-on-outline /> 三个方法</div>

<div v-click="1" class="summary-line">面积法：位移 = <Latex tex="v" />-<Latex tex="t" /> 图线与 <Latex tex="t" /> 轴围成的面积</div>

<div v-click="2" class="summary-line">分割求和：分得越细，小矩形之和越接近位移</div>

<div v-click="3" class="summary-line">规范书写：解 + 文字描述 + 原始公式 + 代入结果</div>
</div>
</div>

</div>

---
layout: cover
---

<div class="cover-chapter"><span class="cover-section">§</span> 2.2 · 2.3 &nbsp;|&nbsp; 第二章 匀变速直线运动的研究 · 第二课时</div>

<h1 class="cover-title">匀变速直线运动的<br />时间、速度、位移扩展</h1>

<div class="cover-subtitle">
  <span>第二课时 · 习题课 · 原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 4
---

# 中间位移的速度

<div class="page-grow">
<div class="ask">中间<b>位移</b>处的速度 <Latex tex="v_{\frac{x}{2}}" /> 是多少？它和平均速度（中间时刻的速度）谁大？</div>

<div class="half-grid">
<div class="vt-figure">

```comp CoordAxes
x-range: [0, 6.2]
y-range: [0, 12]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 400, height: 300 }
ticks:
  x: []
  y: []
areas:
  - points: [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 3.59, y: 7.385 }, { x: 3.59, y: 0 }]
    fill: var(--c-physics)
    fillOpacity: 0.2
    stroke: var(--c-physics)
    width: 1.2
curves:
  - points: [{ x: 0, y: 2 }, { x: 5.5, y: 10.25 }]
    stroke: var(--c-accent)
    width: 3.5
  - points: [{ x: 5.5, y: 0 }, { x: 5.5, y: 10.25 }]
    stroke: var(--c-accent)
    width: 1.5
    dashed: true
  - points: [{ x: 2.75, y: 0 }, { x: 2.75, y: 6.125 }]
    stroke: var(--c-accent-2)
    width: 1.5
    dashed: true
  - points: [{ x: 3.59, y: 0 }, { x: 3.59, y: 7.385 }]
    stroke: var(--c-physics)
    width: 1.5
    dashed: true
labels:
  - x: 5.5
    y: 10.25
    dot: 4
    dotColor: var(--c-accent)
    tex: 'v'
    anchor: left
    color: var(--c-accent)
    halo: true
  - x: 2.75
    y: 6.125
    dot: 3
    dotColor: var(--c-accent-2)
    tex: 'v_{\frac{t}{2}} = \bar{v}'
    anchor: left
    color: var(--c-accent-2)
    halo: true
  - x: 3.59
    y: 7.385
    dot: 3
    dotColor: var(--c-physics)
    tex: 'v_{\frac{x}{2}}'
    anchor: right
    color: var(--c-physics)
    halo: true
  - x: 1.55
    y: 3.4
    parts:
      - text: 面积 =
      - tex: '\frac{x}{2}'
    anchor: center
    color: var(--c-physics)
    halo: true
```
</div>

<div class="stack">
<div v-click="1">前半段：<Latex tex="v_{\frac{x}{2}}^2 - v_0^2 = 2a \cdot \frac{x}{2} = ax" />。</div>

<div v-click="2">全程 <Latex tex="ax = \frac{v^2 - v_0^2}{2}" /> 代入：<Latex tex="v_{\frac{x}{2}} = \sqrt{\frac{v_0^2 + v^2}{2}}" />。</div>

<div v-click="3">作差：<Latex tex="v_{\frac{x}{2}}^2 - \bar{v}^2 = \frac{v_0^2 + v^2}{2} - \left(\frac{v_0 + v}{2}\right)^2 = \frac{(v - v_0)^2}{4} \ge 0" />。</div>

<div v-click="4" class="key"><Latex tex="v_{\frac{x}{2}} > \bar{v} = v_{\frac{t}{2}}" />（匀速时取等号）——平方差 <Latex tex="\frac{(v - v_0)^2}{4}" /> 恒非负，<b>与加速还是减速无关</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 等时间间隔的规律

<div class="page-grow">
<div class="problem">一个物体从静止开始运动，加速度始终不变。</div>

<div class="ask">问题一：这是什么运动？</div>

<div class="ask">问题二：从 <Latex tex="t=0" /> 起，每隔相等时间 <Latex tex="T" /> 取一个时刻，把运动分成第 <Latex tex="1, 2, \dots, n" /> 段，求下面五个量：</div>

<div class="half-grid">
<div class="stack stack-dense">
<div>① 前 <Latex tex="1, 2, \dots, n" /> 段的末速度</div>

<div>② 第 <Latex tex="1, 2, \dots, n" /> 段的平均速度</div>

<div>③ 前 <Latex tex="1, 2, \dots, n" /> 段的位移</div>
</div>

<div class="stack stack-dense">
<div>④ 第 <Latex tex="1, 2, \dots, n" /> 段的位移</div>

<div>⑤ 相邻两段的位移差</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
---

<div class="page-grow">
<div class="stack stack-dense">
<div>由静止、加速度恒定得 <Latex tex="v = at" />、<Latex tex="x = \frac{1}{2}at^2" />——初速度为零的匀加速直线运动。</div>

<div v-click="1">① 前 <Latex tex="n" /> 段的末速度：<Latex tex="v_n = a \cdot nT = naT" />，即 <Latex tex="1 : 2 : \dots : n" />。</div>

<div v-click="2">② 第 <Latex tex="n" /> 段的平均速度：<Latex tex="\bar{v}_n = \frac{v_{n-1} + v_n}{2} = \left(n - \frac{1}{2}\right)aT" />，即 <Latex tex="1 : 3 : \dots : (2n-1)" />。</div>

<div v-click="3">③ 前 <Latex tex="n" /> 段的位移：<Latex tex="x_n = \frac{1}{2}aT^2 n^2" />，即 <Latex tex="1^2 : 2^2 : \dots : n^2" />。</div>

<div v-click="4">④ 第 <Latex tex="n" /> 段的位移：<Latex tex="x_n - x_{n-1} = \frac{1}{2}aT^2(2n-1)" />，即 <Latex tex="1 : 3 : \dots : (2n-1)" />。</div>

<div v-click="5">⑤ 相邻两段的位移差：<Latex tex="\Delta x = \frac{1}{2}aT^2(2n-1) - \frac{1}{2}aT^2(2n-3) = aT^2" />，与 <Latex tex="n" /> 无关。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# $\Delta x = aT^2$ 对任意等时间间隔都成立吗？

<div class="page-grow">
<div class="half-grid">
<div v-click="1" class="stack">
<div class="mini-title"><mdi-ruler /> 方法一：算两段位移</div>

<div>设等时间间隔为 <Latex tex="T" />，连续两段位移为 <Latex tex="x_1" />、<Latex tex="x_2" />，第一段起点的速度为 <Latex tex="v_0" />（<b>不必是全程的初速度</b>）：<Latex tex="x_1 = v_0T + \frac{1}{2}aT^2" />，<Latex tex="x_2 = (v_0 + aT)T + \frac{1}{2}aT^2" />。</div>

<div>相减：<Latex tex="x_2 - x_1 = aT^2" />，与 <Latex tex="v_0" /> 无关。</div>

<div class="key">只要时间间隔相等，<Latex tex="\Delta x = aT^2" /> 就一直成立——与初速度多大、从哪一段开始都无关。</div>
</div>

<div v-click="2" class="divider-l stack">
<div class="mini-title"><mdi-axis-arrow /> 方法二：看面积</div>

```comp CoordAxes
x-range: [0, 3.4]
y-range: [0, 3.4]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 400, height: 235 }
ticks:
  x: []
  y: []
areas:
  - points: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 0 }]
    fill: var(--c-accent-2)
    fillOpacity: 0.18
  - points: [{ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 0 }]
    fill: var(--c-accent)
    fillOpacity: 0.18
  - points: [{ x: 2, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 2 }]
    fill: var(--c-physics)
    fillOpacity: 0.35
    stroke: var(--c-physics)
    width: 1.2
curves:
  - points: [{ x: 0, y: 0 }, { x: 3, y: 3 }]
    stroke: var(--c-accent)
    width: 3.5
  - points: [{ x: 1, y: 0 }, { x: 1, y: 1 }]
    stroke: var(--c-text-dim)
    width: 1.5
    dashed: true
  - points: [{ x: 2, y: 0 }, { x: 2, y: 2 }]
    stroke: var(--c-text-dim)
    width: 1.5
    dashed: true
  - points: [{ x: 3, y: 0 }, { x: 3, y: 3 }]
    stroke: var(--c-text-dim)
    width: 1.5
    dashed: true
  - points: [{ x: 3, y: 2 }, { x: 3, y: 3 }]
    stroke: var(--c-physics)
    width: 3
labels:
  - x: 1.5
    y: 0.3
    tex: 'T'
    color: var(--c-text-dim)
    halo: true
  - x: 2.5
    y: 0.3
    tex: 'T'
    color: var(--c-text-dim)
    halo: true
  - x: 1.5
    y: 0.85
    tex: 'x_1'
    color: var(--c-accent-2)
    halo: true
  - x: 2.5
    y: 0.85
    tex: 'x_2'
    color: var(--c-accent)
    halo: true
  - x: 2.5
    y: 2.05
    tex: '\Delta x = aT^2'
    color: var(--c-physics)
    halo: true
  - x: 3.06
    y: 2.5
    tex: 'aT'
    anchor: right
    color: var(--c-physics)
    halo: true
```

<div>把第 1 段平移过来，多出的那一条是平行四边形：底 <Latex tex="aT" />、高 <Latex tex="T" />，面积就是 <Latex tex="aT^2" />。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 等位移间隔的规律

<div class="page-grow">
<div class="problem">同样是一个从静止开始、加速度不变的物体，这次把运动按<b>相等的位移</b> <Latex tex="s" /> 分成第 <Latex tex="1, 2, \dots, n" /> 段，每一段都是 <Latex tex="s" />。</div>

<div class="vt-figure">

```comp NumberAxis
range: [0, 4.4]
axis: { quantity: x }
ticks: { step: 1, labels: false, origin: true }
view: { width: 700, height: 135 }
callouts:
  - { value: 0.5, text: '第 1 段', color: var(--c-accent) }
  - { value: 1.5, text: '第 2 段', color: var(--c-accent) }
  - { value: 2.5, text: '第 3 段', color: var(--c-accent) }
  - { value: 3.5, text: '第 n 段', color: var(--c-accent) }
  - { value: 1, math: 's', side: 'below', color: var(--c-accent-2) }
  - { value: 2, math: '2s', side: 'below', color: var(--c-accent-2) }
  - { value: 3, math: '3s', side: 'below', color: var(--c-accent-2) }
```
</div>

<div class="half-grid">
<div class="stack stack-dense">
<div>① 前 <Latex tex="1, 2, \dots, n" /> 段的末速度之比</div>

<div>② 第 <Latex tex="1, 2, \dots, n" /> 段的平均速度之比</div>
</div>

<div class="stack stack-dense">
<div>③ 前 <Latex tex="1, 2, \dots, n" /> 段所用时间之比</div>

<div>④ 第 <Latex tex="1, 2, \dots, n" /> 段所用时间之比</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="stack stack-dense">
<div>每段位移都是 <Latex tex="s" />，由 <Latex tex="x = \frac{1}{2}at^2" /> 得 <Latex tex="t = \sqrt{\frac{2x}{a}}" />，由 <Latex tex="v^2 = 2ax" /> 得 <Latex tex="v = \sqrt{2ax}" />。</div>

<div v-click="1">① 前 <Latex tex="n" /> 段的末速度：<Latex tex="v_n = \sqrt{2a \cdot ns} = \sqrt{2as}\sqrt{n}" />，即 <Latex tex="1 : \sqrt{2} : \dots : \sqrt{n}" />。</div>

<div v-click="2">② 第 <Latex tex="n" /> 段的平均速度：<Latex tex="\bar{v}_n = \frac{s}{\Delta t_n} = \sqrt{\frac{as}{2}}\left(\sqrt{n} + \sqrt{n-1}\right)" />，即 <Latex tex="1 : (1+\sqrt{2}) : \dots : (\sqrt{n}+\sqrt{n-1})" />。</div>

<div v-click="3">③ 前 <Latex tex="n" /> 段所用时间：<Latex tex="t_n = \sqrt{\frac{2ns}{a}} = \sqrt{\frac{2s}{a}}\sqrt{n}" />，即 <Latex tex="1 : \sqrt{2} : \dots : \sqrt{n}" />。</div>

<div v-click="4">④ 第 <Latex tex="n" /> 段所用时间：<Latex tex="\Delta t_n = \sqrt{\frac{2s}{a}}\left(\sqrt{n} - \sqrt{n-1}\right)" />，即 <Latex tex="1 : (\sqrt{2}-1) : \dots : (\sqrt{n}-\sqrt{n-1})" />。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题：只知道两段的位移和时间

<div class="page-grow">
<div class="problem">已知物体做匀变速直线运动，在时间 <Latex tex="T_1" /> 内走了 <Latex tex="X_1" />，紧接着在时间 <Latex tex="T_2" /> 内又走了 <Latex tex="X_2" />。求加速度 <Latex tex="a" /> 的大小。</div>

<div class="stack">
<div v-click="1" class="mini-title"><mdi-lightbulb-on-outline /> 解法一：用平均速度</div>

<div v-click="2">第一段中间时刻的速度 <Latex tex="v_1 = \frac{X_1}{T_1}" />，第二段中间时刻的速度 <Latex tex="v_2 = \frac{X_2}{T_2}" />——中间时刻的速度就是这段的平均速度。</div>

<div v-click="3">两个中间时刻相隔 <Latex tex="\frac{T_1 + T_2}{2}" />：<Latex tex="a = \frac{X_2/T_2 - X_1/T_1}{(T_1 + T_2)/2}" />。</div>

<div v-click="4" class="key">题目没说加速还是减速，<Latex tex="a" /> 的符号不确定——问的是「大小」，要取绝对值：<Latex tex="|a| = \frac{2\left|X_2/T_2 - X_1/T_1\right|}{T_1 + T_2}" />。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题：只知道两段的位移和时间

<div class="page-grow">
<div class="stack">
<div v-click="1" class="mini-title"><mdi-source-branch /> 解法二：联立两式</div>

<div v-click="2">设第一段的初速度为 <Latex tex="v_0" />：<Latex tex="X_1 = v_0T_1 + \frac{1}{2}aT_1^2" />；第二段的初速度已是 <Latex tex="v_0 + aT_1" />，<Latex tex="X_2 = (v_0 + aT_1)T_2 + \frac{1}{2}aT_2^2" />。</div>

<div v-click="3">两式消去 <Latex tex="v_0" />，解得 <Latex tex="a = \frac{2(X_2T_1 - X_1T_2)}{T_1T_2(T_1 + T_2)}" />（大小同样取绝对值）。</div>

<div v-click="4" class="key">两种解法算出来完全一样：解法一只用两个平均速度作一次差；解法二要设 <Latex tex="v_0" /> 再消元——<b>解法一明显更省事</b>。</div>
</div>
</div>

