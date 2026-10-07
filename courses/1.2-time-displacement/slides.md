---
theme: default
title: 时间 位移
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

<div class="cover-chapter"><span class="cover-section">§</span> 1.2 · 第一章 运动的描述</div>

<h1 class="cover-title">时间 位移</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 时间 位移 · 引入</div>

<div class="ask mt-4 justify-center">
  <mdi-head-question-outline class="text-2xl" />
  <span>要描述物体位置随时间的变化，我们需要哪些概念？</span>
</div>

<v-clicks>

<div class="mt-7 text-lg"><mdi-map-marker class="text-accent-2 inline-block align-middle mr-2" />需要确定<span class="text-accent">位置</span>——用什么描述？</div>

<div class="mt-4 text-lg"><mdi-clock-time-eight-outline class="text-accent inline-block align-middle mr-2" />需要明确<span class="text-accent-2">时间</span>——"时间"到底是什么？</div>

</v-clicks>
---
layout: base-flex
---

# 时刻与时间间隔

<div class="key key-blue mt-4 text-xl">上午 7 时 40 分上课，8 时 20 分下课</div>

<v-click>

<div class="ask mt-7">
  <mdi-head-question-outline class="text-xl" />
  <span>"7 时 40 分""8 时 20 分"和"40 min"有什么不同？</span>
</div>

</v-click>

<v-clicks>

<div class="mt-5 text-base"><span class="text-accent-2 font-semibold">时刻</span>："7 时 40 分""8 时 20 分"——上课开始和结束的<span class="text-accent-2">瞬间</span></div>

<div class="mt-4 text-base"><span class="text-accent font-semibold">时间间隔</span>：两个时刻之间的 <Latex tex="40 \text{ min}" />——一段<span class="text-accent">持续</span>的时间</div>

<div class="mt-4 text-base">平时说的"时间"，有时指<span class="text-accent-2">时刻</span>，有时指<span class="text-accent">时间间隔</span>，要依上下文判断</div>

</v-clicks>
---
layout: base-flex
---

# 时间轴

<TimeAxis />
---
layout: base-flex
---

# 用坐标描述位置

<div class="key mt-4 text-xl">定量描述位置，需要在参考系上建立<span class="text-accent">坐标系</span>（coordinate system）</div>

<v-clicks>

<div class="mt-6 text-base">直线运动 → 建立一维坐标系：在 <Latex tex="x" /> 轴上选<span class="text-accent-2">原点</span>，规定<span class="text-accent-2">正方向</span>和<span class="text-accent-2">单位长度</span></div>

<div class="mt-4 text-base">长安街上的汽车：<Latex tex="x" /> 轴正方向指<span class="text-accent">东</span>，以交通岗亭为原点 <Latex tex="O" /></div>

</v-clicks>

<div class="grid grid-cols-2 gap-6 mt-6">

<v-clicks>

<div class="text-center">
  <div class="text-2xl font-bold text-accent"><Latex tex="+30 \text{ m}" /></div>
  <div class="text-sm opacity-70 mt-1">在岗亭以东 <Latex tex="30 \text{ m}" /> 处</div>
</div>

<div class="text-center">
  <div class="text-2xl font-bold text-accent-2"><Latex tex="-20 \text{ m}" /></div>
  <div class="text-sm opacity-70 mt-1">在岗亭以西 <Latex tex="20 \text{ m}" /> 处</div>
</div>

</v-clicks>

</div>
---
layout: base-flex
---

# 位置的变化：选哪条路？

<div class="ask mt-3">
  <mdi-head-question-outline class="text-xl" />
  <span>要去 12 km 外的公园，导航给出两条骑行路线：15 km 和 18 km——你会选哪条？</span>
</div>

<div class="grid grid-cols-2 gap-8 mt-4 items-center">

<div class="flex flex-col gap-4">

<div v-click="2" class="text-base leading-relaxed">选 <span class="text-accent-2 font-semibold">15 km</span> 的那条——更短、更省力。<Latex tex="15\ \text{km}" />、<Latex tex="18\ \text{km}" /> 是两条路线的<span class="text-accent">路程</span>。</div>

<div v-click="3" class="text-base leading-relaxed">那 <Latex tex="12\ \text{km}" /> 呢？它是起点到终点的<span class="text-accent">直线距离</span>——所有走法里<span class="text-accent-2">最短的那条路径</span>。</div>

</div>

<div v-click="1" class="text-center">
  <RouteMapSvg />
</div>

</div>

<div v-click="4" class="key mt-3">不管骑哪条路线、用了多长时间，位置的变化都只有一件事：<span class="text-accent-2">从学校到公园</span>——可以用一条<span class="text-accent">由初位置指向末位置的有向线段</span>表示</div>
---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 位移的定义</div>

<v-click>

<div class="card card-highlight">
  <div class="text-xl font-semibold">由<span class="text-accent">初位置</span>指向<span class="text-accent">末位置</span>的<span class="text-accent-2">有向线段</span>，能准确地描述位置的变化</div>
</div>

</v-click>

<v-click>

<div class="mt-5 text-lg font-semibold">物理学中用<span class="text-accent-2">位移</span>（displacement）描述物体位置的变化，用 <Latex tex="l" /> 表示</div>

</v-click>

<div class="grid grid-cols-2 gap-8 mt-6">

<v-clicks>

<div>
  <div class="flex items-center gap-2 mb-1"><mdi-arrow-right-bold-circle-outline class="text-accent text-xl" /><span class="font-semibold text-lg">矢量</span></div>
  <div class="text-sm opacity-70 mt-1">既有大小又有方向（如位移）</div>
</div>

<div class="divider-l">
  <div class="flex items-center gap-2 mb-1"><mdi-numeric text-xl text-accent-2 class="text-accent-2" /><span class="font-semibold text-lg">标量</span></div>
  <div class="text-sm opacity-70 mt-1">只有大小没有方向（如路程、温度）</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="key mt-7 mx-auto max-w-4xl">位移只与<span class="text-accent">初、末位置</span>有关，不因路径不同而改变；<span class="text-accent-2">路程</span>却随路径而变</div>

</v-click>
---
layout: base-flex
---

# 直线运动的位移：算一算

<DisplacementLine />
---
layout: base-flex
---

# 思考与讨论

<div class="key key-blue mt-4 text-lg">某物体从 <Latex tex="A" /> 点运动到 <Latex tex="B" /> 点，坐标 <Latex tex="x_A = 5 \text{ m}" />，<Latex tex="x_B = 2 \text{ m}" /></div>

<div class="ask mt-7">
  <mdi-head-question-outline class="text-xl" />
  <span>物体的位移大小等于多少？方向如何？</span>
</div>

<v-click>
  <div class="mt-3 text-base"><Latex tex="\Delta x = x_B - x_A = 2 - 5 = -3 \text{ m}" /></div>
</v-click>
<v-click>
  <div class="mt-2 text-base">位移大小为 <span class="text-accent font-semibold"><Latex tex="3 \text{ m}" /></span>，方向指向 <span class="text-accent font-semibold"><Latex tex="x" /> 轴负方向</span>（由 <Latex tex="A" /> 指向 <Latex tex="B" />）</div>
</v-click>

<v-click>

<div class="key mt-7">若两坐标之差为<span class="text-accent">正</span>，位移指向 <Latex tex="x" /> 轴正方向；为<span class="text-accent-2">负</span>，则指向 <Latex tex="x" /> 轴负方向</div>

</v-click>
---
layout: base-flex
---

# 再看两条位移

<div class="ask mt-4">
  <mdi-head-question-outline class="text-xl" />
  <span>从 0 走到 2，和从 −2 走到 0，位移一样吗？</span>
</div>

<div class="grid grid-cols-2 gap-8 mt-5">

<v-clicks>

<div class="text-center">
  <div class="font-semibold text-base mb-1">从 0 到 2</div>
  <DisplacementArrowSvg :from="0" :to="2" />
  <div class="text-base mt-1"><Latex tex="\Delta x = 2 - 0 = +2\ \text{m}" /></div>
</div>

<div class="text-center">
  <div class="font-semibold text-base mb-1">从 −2 到 0</div>
  <DisplacementArrowSvg :from="-2" :to="0" />
  <div class="text-base mt-1"><Latex tex="\Delta x = 0 - (-2) = +2\ \text{m}" /></div>
</div>

</v-clicks>

</div>

<v-click>

<div class="key mt-6 mx-auto max-w-4xl">
  两次位移都是 <Latex tex="+2\ \text{m}" />：<span class="text-accent font-semibold">方向相同、大小相同</span>——位移相等，与起点、终点在哪无关。
  <v-click>
    <div class="mt-1">位移是<span class="text-accent-2">矢量</span>：只要两条位移<span class="text-accent">平行、等长、同向</span>，它们就<span class="text-accent">相等</span>。</div>
  </v-click>
</div>

</v-click>
---
layout: base-flex
---

<div class="tag-icon mb-6"><mdi-lightbulb-on-outline /> 引课</div>

<div class="text-lg">已经学会了两件事：用<span class="text-accent-2">坐标</span>记录位置，用<span class="text-accent">位移</span>描述位置的变化。</div>

<div class="ask mt-6 justify-center" style="font-size: 1.7rem">
  <mdi-head-question-outline class="text-3xl" />
  <span>那"位置随时间的变化"本身，怎么反映出来？</span>
</div>

<div class="mt-6 text-center text-xl" v-click>钟表能记时刻、坐标能记位置——把两者<span class="text-accent">配成一对对数据</span>，再<span class="text-accent-2">画成图</span></div>

<div class="mt-5 flex justify-center gap-6 text-lg" v-click>
  <span class="tag">横轴：时间 <Latex tex="t" /></span>
  <span class="tag">纵轴：位置 <Latex tex="x" /></span>
</div>

<div class="key mt-6 mx-auto max-w-3xl text-center" v-click>横轴取 <Latex tex="t" />、纵轴取 <Latex tex="x" />——图线就把"位置随时间的变化"画出来了</div>
---
layout: base-flex
---

# 位移—时间图像（$x$-$t$ 图像）

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="flex flex-col gap-3">

<v-clicks>

<div class="text-sm leading-relaxed">
  以时刻 <Latex tex="t" /> 为<span class="text-accent">横轴</span>、位置 <Latex tex="x" /> 为<span class="text-accent-2">纵轴</span>，图线即位置—时间图像。
  <br />初始位置为原点时，位置与位移相等，即 <span class="text-accent"><Latex tex="x\text{-}t" /> 图像</span>。
</div>

<div class="text-sm leading-relaxed">从 <span class="text-accent"><Latex tex="x\text{-}t" /> 图像</span> 可直观看出物体在不同时间内的位移。</div>

</v-clicks>

</div>

<div class="text-center">

```comp SimpleAxis
x-max: 4
y-max: 4
x-axis: { quantity: t }
y-axis: { quantity: x }
curves:
  - points: [{ x: 0, y: 0 }, { x: 3.8, y: 3.35 }]
    color: var(--c-accent)
    width: 3.5
point: { x: 2.6, y: 2.25, color: var(--c-accent-2), dot: 6 }
guides: { color: var(--c-accent-2) }
ticks:
  x: [1, 2, 3]
  y: [1, 2, 3]
  labels: false
view: { width: 320, height: 240 }
```

</div>

</div>
---
layout: base-flex
---

# $x$-$t$ 图像能读出什么？

<div class="grid grid-cols-2 gap-8 mt-4 items-center">

<div class="flex flex-col gap-4">

<div v-click="2" class="text-base leading-relaxed">① <span class="text-accent font-semibold">截距</span>：图线与纵轴的交点，就是 <Latex tex="t = 0" /> 时刻的位置——即<span class="text-accent">初始位置（初始位移）</span></div>

<div v-click="3" class="text-base leading-relaxed">② <span class="text-accent font-semibold">斜率的正负</span>：为正 → 沿 <Latex tex="x" /> 轴<span class="text-accent">正方向</span>运动；为负 → 沿<span class="text-accent-2">负方向</span>运动</div>

<div v-click="4" class="text-base leading-relaxed">③ <span class="text-accent font-semibold">水平线</span>：位置坐标不变 → 这段时间物体<span class="text-accent-2">静止</span></div>

<div v-click="5" class="text-base leading-relaxed">④ <span class="text-accent font-semibold">两条图线相交</span>：交点对应的时刻，两个物体<span class="text-accent-2">相遇</span></div>

</div>

```comp CoordAxes
click: 1
class: xt-read
x-range: [0, 4.5]
y-range: [0, 6]
x-axis: { quantity: 't' }
y-axis: { quantity: 'x' }
view: { width: 640, height: 500 }
ticks: { x: [1, 2, 3, 4], y: [1, 2, 3, 4, 5], labels: false }
curves: 
  - { points: [{ x: 0, y: 1 }, { x: 2.5, y: 4 }, { x: 4, y: 4 }], stroke: 'var(--c-accent)', width: 4.5 }
  - { points: [{ x: 0, y: 5.5 }, { x: 4, y: 1 }], stroke: 'var(--c-accent-2)', width: 4.5 }
  - { points: [{ x: 1.94, y: 0 }, { x: 1.94, y: 3.24 }], stroke: 'var(--c-accent-2)', width: 1.8, dashed: '7 5' }
labels: 
  - { x: 0, y: 1, dot: 7, dotColor: 'var(--c-accent)', parts: [{ text: '截距 = 初始位置' }], anchor: 'right', dy: 18, color: 'var(--c-accent)', halo: true }
  - { x: 1.94, y: 3.24, dot: 8, dotColor: 'var(--c-accent-2)', parts: [{ text: '相遇' }], anchor: 'right', dy: 18, color: 'var(--c-accent-2)', halo: true }
  - { x: 3.2, y: 4.33, parts: [{ text: '静止（水平线）' }], anchor: 'center', dy: -14, color: 'var(--c-text)', halo: true }
  - { x: 4.06, y: 4.35, parts: [{ text: '甲' }], anchor: 'right', size: 20, color: 'var(--c-accent)' }
  - { x: 3.94, y: 0.59, parts: [{ text: '乙' }], anchor: 'left', size: 20, color: 'var(--c-accent-2)' }
```

</div>
---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 引课</div>

<div class="text-lg">图像上的每一个点，都来自<span class="text-accent">真实测出来的数据</span>——先有测量，才有图像。</div>

<div class="ask mt-5 justify-center" style="font-size: 1.5rem">
  <mdi-head-question-outline class="text-3xl" />
  <span>高中实验室里，怎样记录物体的位置随时间的变化？</span>
</div>

<div class="grid grid-cols-2 gap-8 mt-6" v-click="1">

<div>
  <div class="flex items-center gap-3 mb-2"><mdi-camera class="text-accent-2 text-3xl" /><span class="font-semibold text-xl">频闪照相</span></div>
  <div class="text-base leading-relaxed opacity-70">每隔相同的时间（如 <Latex tex="0.1\ \text{s}" />）拍一次，一张照片上留下物体在一串时刻的位置——<span class="text-accent">时刻和位置同时记录</span></div>
</div>

<div class="divider-l">
  <div class="flex items-center gap-3 mb-2"><mdi-printer-pos class="text-accent text-3xl" /><span class="font-semibold text-xl">打点计时器</span></div>
  <div class="text-base leading-relaxed opacity-70">纸带被运动物体拖着经过计时器，计时器每隔 <Latex tex="0.02\ \text{s}" /> 打一个点——<span class="text-accent-2">点迹就是物体在各时刻的位置</span></div>
</div>

</div>

<div class="mt-6 text-lg" v-click="2">两者的共同点是<span class="text-accent-2">等时间间隔取样</span>——时间由"打点（拍照）的节拍"给出，位置由"点在纸带上的位置"给出</div>
---
layout: base-flex
---

# 两种打点计时器

<div class="mt-5 text-lg">打点计时器有两种：<span class="text-accent font-semibold">电磁打点计时器</span>与<span class="text-accent-2 font-semibold">电火花计时器</span>——它们的区别，是考试常考点</div>

<div class="mt-4">

<table class="cmp-table">
  <thead>
    <tr>
      <th>对比项</th>
      <th><span class="text-accent">电磁打点计时器</span></th>
      <th><span class="text-accent-2">电火花计时器</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>工作电压</td>
      <td>约 <Latex tex="8\ \text{V}" /> 交流</td>
      <td><Latex tex="220\ \text{V}" /> 交流</td>
    </tr>
    <tr>
      <td>打点元件</td>
      <td>振针 + 复写纸</td>
      <td>放电针 + 墨粉纸盘</td>
    </tr>
    <tr>
      <td>摩擦阻力</td>
      <td>较大（振针压在纸带上）</td>
      <td>较小（放电针不接触纸带）</td>
    </tr>
  </tbody>
</table>

</div>

<div class="mt-3 text-base" v-click="1">计时原理相同：电源频率 <Latex tex="50\ \text{Hz}" /> 时，每隔 <Latex tex="0.02\ \text{s}" /> 打一个点</div>

<div class="key mt-3" v-click="2">电磁式的<span class="text-accent">振针压在纸带上</span>，阻力较大；电火花式的<span class="text-accent-2">放电针不接触纸带</span>，阻力较小——电火花计时器测出的结果误差更小</div>
---
layout: base-flex
---

# 使用打点计时器的注意事项

<div class="flex flex-col gap-2 mt-6 text-base leading-snug">

<div v-click="1">① <span class="text-accent font-semibold">电源</span>：电磁式绝不能接到 <span class="text-accent">220 V 交流电</span>上，也不能接<span class="text-accent">直流电源</span>——否则振针不会振动，打不出点</div>

<div v-click="2">② <span class="text-accent font-semibold">固定</span>：用夹子把计时器固定在实验桌边缘，防止拉纸带时移动、晃动</div>

<div v-click="3">③ <span class="text-accent font-semibold">安装</span>：纸带必须穿过<span class="text-accent-2">限位孔</span>，并压在<span class="text-accent-2">复写纸（墨粉纸盘）下面</span>——这样纸带才不会脱落、才能正确打点</div>

<div v-click="4">④ <span class="text-accent font-semibold">操作顺序</span>：先接通电源，后拉纸带</div>

<div v-click="5" class="ask ml-8 mt-1 text-base">
  <mdi-head-question-outline class="text-lg" />
  <span>为什么要"先通电、后拉纸带"？</span>
</div>

<div v-click="6" class="ml-8">因为电源先接通，纸带一运动就被打点——才能把物体的<span class="text-accent">完整运动过程</span>都记录下来</div>

<div v-click="7" class="mt-1">⑤ <span class="text-accent font-semibold">及时断电</span>：电磁式不适合长期工作，线圈发热容易损毁</div>

</div>
---
layout: base-flex
---

# 纸带上的点

<div class="ask mt-2">
  <mdi-head-question-outline class="text-xl" />
  <span>这条纸带上，第 5 个点打在什么时刻？位移是多大？</span>
</div>

<div class="mt-2" v-click="1">
  <TapeDotsSvg />
</div>

<div class="grid grid-cols-2 gap-8 mt-2 items-center">

<div class="flex flex-col gap-3">

<div v-click="2" class="text-base leading-snug">① <span class="text-accent-2 font-semibold">数点</span> → 时刻：第 <Latex tex="n" /> 个点对应 <Latex tex="t = 0.02(n-1)\ \text{s}" />，第 5 个点是 <Latex tex="0.08\ \text{s}" /></div>

<div v-click="3" class="text-base leading-snug">② <span class="text-accent font-semibold">量距</span> → 位置：第 5 个点到起点的距离，就是 <Latex tex="0.08\ \text{s}" /> 时的坐标 <Latex tex="x" /></div>

</div>

```comp CoordAxes
click: 4
class: plot-svg
x-range: [0, 0.088]
y-range: [0, 7.5]
x-axis: { quantity: 't', unit: 's', side: 'above' }
y-axis: { quantity: 'x', unit: 'm' }
view: { width: 640, height: 220 }
font-scale: 0.8
ticks: { x: [], y: [], labels: false }
curves: 
  - { points: [{ x: 0, y: 0 }, { x: 0.02, y: 1.4 }, { x: 0.04, y: 3 }, { x: 0.06, y: 4.8 }, { x: 0.08, y: 6.8 }], stroke: 'var(--c-accent)', width: 2.5 }
labels: 
  - { x: 0, y: 0, dot: 5, dotColor: 'var(--c-accent)' }
  - { x: 0.02, y: 1.4, dot: 5, dotColor: 'var(--c-accent)' }
  - { x: 0.04, y: 3, dot: 5, dotColor: 'var(--c-accent)' }
  - { x: 0.06, y: 4.8, dot: 5, dotColor: 'var(--c-accent)' }
  - { x: 0.08, y: 6.8, dot: 5, dotColor: 'var(--c-accent)' }
```

</div>

<div v-click="5" class="key mt-2">纸带同时记录了<span class="text-accent">时间和位置</span>——描出每个点的 <Latex tex="(t,\ x)" />，就是 <span class="text-accent-2"><Latex tex="x\text{-}t" /> 图像</span>；相邻两点的距离 = 这段时间内的位移大小</div>
---
layout: base-flex
---

<div class="ask mt-6 mb-2 justify-center" style="font-size: 1.6rem">
  <mdi-head-question-outline class="text-3xl" />
  <span>量纸带上各点到起点的距离，你会怎么量？</span>
</div>

<div class="grid grid-cols-2 gap-6 mt-4">

<div v-click="1" class="text-center">
  <TapeSegmentMeasureSvg />
  <div class="mt-3 text-base leading-snug"><mdi-close-circle-outline class="warn text-lg inline-block align-middle mr-1" /><span class="warn font-semibold">逐段量再相加</span> —— 误差<span class="warn">会累积</span></div>
</div>

<div v-click="2" class="text-center">
  <TapeMeasureFromStartSvg />
  <div class="mt-3 text-base leading-snug"><mdi-check-circle-outline class="good text-lg inline-block align-middle mr-1" /><span class="good font-semibold">一次量到底</span> —— 误差<span class="good">范围一定</span></div>
</div>

</div>

<div v-click="3" class="key mt-5">量纸带上的位置，一律<span class="text-accent-2">从起点（第一个点）量起</span>：一次量到要读的那个点，读出的就是它到起点的距离——<span class="text-accent">误差范围一定，不会累积</span></div>
---
layout: base-flex
---

# 课堂小结

<div class="grid grid-cols-2 gap-x-10 gap-y-6 mt-6">

<v-clicks>

<div>
  <div class="flex items-center gap-2 mb-2"><mdi-clock-time-eight-outline class="text-accent text-xl" /><span class="font-semibold text-lg">时间</span></div>
  <div class="text-sm opacity-75 mb-1">时刻 = 时间轴上的<span class="text-accent">点</span></div>
  <div class="text-sm opacity-75">时间间隔 = 两点间的<span class="text-accent-2">线段</span></div>
</div>

<div>
  <div class="flex items-center gap-2 mb-2"><mdi-arrow-right-bold-circle-outline class="text-accent-2 text-xl" /><span class="font-semibold text-lg">位移</span></div>
  <div class="text-sm opacity-75 mb-1">初位置指向末位置的有向线段 —— <span class="text-accent">矢量</span></div>
  <div class="text-sm opacity-75">直线运动：<Latex tex="\Delta x = x_2 - x_1" /></div>
</div>

<div class="col-span-2">
  <div class="flex items-center gap-2 mb-2">
    <mdi-printer-pos class="text-accent text-xl" /><span class="font-semibold text-lg">打点计时器</span>
    <span class="text-sm opacity-60">电源频率 <Latex tex="50\ \text{Hz}" />，每隔 <Latex tex="0.02\ \text{s}" /> 打一个点</span>
  </div>
  <div class="grid grid-cols-2 gap-x-8">
    <div class="text-sm opacity-75 mb-1"><span class="text-accent font-semibold">电磁式</span>：约 <Latex tex="8\ \text{V}" /> 交流 · 振针 + 复写纸</div>
    <div class="text-sm opacity-75 mb-1"><span class="text-accent-2 font-semibold">电火花式</span>：<Latex tex="220\ \text{V}" /> 交流 · 放电针 + 墨粉纸盘</div>
  </div>
  <div class="text-sm opacity-75 mt-1">摩擦阻力：电磁式<span class="text-accent">较大</span>（振针压在纸带上），电火花式<span class="text-accent-2">较小</span>（不接触纸带）</div>
  <div class="text-sm opacity-75 mt-1">纸带同时记录了<span class="text-accent">时间</span>（数点）与<span class="text-accent-2">位置</span>（量距）——描出每个点的 <Latex tex="(t,\ x)" /> 就是 <span class="text-accent"><Latex tex="x\text{-}t" /> 图像</span>，相邻两点的距离 = 位移大小</div>
</div>

</v-clicks>

</div>
---
layout: base-flex
---

# 课后练习

<div class="ask mt-5">
  <mdi-head-question-outline class="text-xl" />
  <span>1. 物体沿 <Latex tex="x" /> 轴从 <Latex tex="x_1 = 3 \text{ m}" /> 运动到 <Latex tex="x_2 = -2 \text{ m}" />，它的位移是多少？路程能小于它吗？</span>
</div>

<v-click>

<div class="mt-5 text-base"><Latex tex="\Delta x = -2 - 3 = -5 \text{ m}" />：位移大小 <span class="text-accent font-semibold"><Latex tex="5 \text{ m}" /></span>，方向沿 <span class="text-accent-2"><Latex tex="x" /> 轴负方向</span></div>

</v-click>

<v-click>

<div class="key mt-5">路程是轨迹长度，只可能<span class="text-accent">大于或等于</span>位移大小，不可能比位移小</div>

</v-click>
