---
theme: default
title: "圆周运动"
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
chapter-no: "6.1"
chapter: "第六章 圆周运动"
subtitle: 线速度 · 角速度 · 周期与转速 · 传动问题
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask ask-lead">把自行车后轮架起、转动脚踏板：大、小两个齿轮边缘上的点，哪个运动得更快？同一个齿轮上到转轴距离不同的点，哪个更快？</div>
<div class="text-xl leading-relaxed" v-click="1">有人说大齿轮边缘快，有人说小齿轮边缘快，也有人说到转轴越远的点越快……</div>
<div class="key key-lead" v-click="2">意见不一 —— 因为圆周运动的快慢，还没有大家都认可的描述方法。</div>
</div>

<div class="figure"><BikeGearSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 线速度

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">物体沿圆弧由 <Latex tex="M" /> 向 <Latex tex="N" /> 运动，怎样描述它经过 <Latex tex="A" /> 点附近运动的快慢？</div>
<div v-click="1">取一段很短的时间 <Latex tex="\Delta t" />，通过的弧长为 <Latex tex="\Delta s" />，用弧长与时间之比来描述：</div>
<div v-click="1"><Latex tex="v = \frac{\Delta s}{\Delta t}" display /></div>
<div class="key" v-click="2">线速度的方向沿该点的<strong>切线方向</strong>；<Latex tex="\Delta t" /> 足够小时，它就是学过的<strong>瞬时速度</strong>。</div>
</div>

<div class="figure"><ArcVelocitySvg :show-solved="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 匀速圆周运动

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">如果物体沿圆周运动、线速度的大小处处相等，这种运动能叫“匀速运动”吗？</div>
<div v-click="1">线速度的大小不变，但<strong>方向时刻改变</strong>，所以它是一种<strong>变速运动</strong>。</div>
<div class="key" v-click="2">这里的“匀速”指的是<strong>速率不变</strong>；匀速圆周运动是角速度不变的圆周运动。</div>
</div>

<div class="figure"><TangentDirectionSvg :show-velocity="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 角速度

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">链条不可伸长、也不打滑，所以两齿轮边缘在相等时间内通过的弧长相同。那为什么它们转过的角度不同？</div>
<div v-click="1">需要一个新的物理量，描述物体绕圆心转动的快慢 —— 半径转过的角 <Latex tex="\Delta\theta" /> 与所用时间 <Latex tex="\Delta t" /> 之比：</div>
<div v-click="1"><Latex tex="\omega = \frac{\Delta\theta}{\Delta t}" display /></div>
<div class="key" v-click="2">单位是<strong>弧度每秒</strong>（<Latex tex="\text{rad/s}" />）；运算中常略去弧度，写成 <Latex tex="\text{s}^{-1}" />。</div>
</div>

<div class="figure"><AngleSweepSvg :show-solved="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 线速度与角速度的关系

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">在 <Latex tex="\Delta t" /> 内，物体通过的弧长 <Latex tex="\Delta s" /> 与半径扫过的圆心角 <Latex tex="\Delta\theta" /> 有什么关系？</div>
<div v-click="1">以弧度为单位时，<Latex tex="\Delta\theta = \frac{\Delta s}{r}" />。把它代入 <Latex tex="v = \frac{\Delta s}{\Delta t}" />：</div>
<div v-click="1"><Latex tex="v = \frac{r\,\Delta\theta}{\Delta t} = r\cdot\frac{\Delta\theta}{\Delta t}" display /></div>
<div class="text-3xl text-center" v-click="2"><Latex tex="v = \omega r" display /></div>
</div>

<div class="figure"><OmegaRelSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 周期与转速

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">圆周运动周而复始，怎样描述它转动的快慢？</div>
<div v-click="1"><mdi-clock-outline class="text-xl" /> 运动一周所用的时间叫<strong>周期</strong> <Latex tex="T" />。一周通过的弧长是 <Latex tex="2\pi r" />，于是 <Latex tex="T = \frac{2\pi r}{v} = \frac{2\pi}{\omega}" />。</div>
<div v-click="1"><mdi-autorenew class="text-xl" /> <strong>转速</strong> <Latex tex="n" /> 是转过的圈数与所用时间之比，单位是 <Latex tex="\text{r/s}" /> 或 <Latex tex="\text{r/min}" />；以 <Latex tex="\text{r/s}" /> 为单位时 <Latex tex="n = \frac{1}{T}" />。</div>
<div class="key" v-click="2">三个量由 <Latex tex="T = \frac{2\pi}{\omega}" /> 打通：<Latex tex="\omega = 2\pi n" />（<Latex tex="n" /> 须以 <Latex tex="\text{r/s}" /> 为单位）。</div>
</div>

<div class="figure"><PeriodSpeedSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 同轴传动

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">同一个转轴上的两个轮一起转动，它们的角速度、线速度各有什么关系？</div>
<div v-click="1">经过相同的时间，两轮转过的角度总相同，所以 <Latex tex="\omega" /> 相同。</div>
<div v-click="1">由 <Latex tex="v = \omega r" /> 可知，离轴越远的点线速度越大，<Latex tex="v \propto r" />。</div>
<div class="key" v-click="1">同轴传动：<Latex tex="\omega" /> 相同，线速度与半径成正比。</div>
</div>

<div class="figure"><TransmissionSvg mode="coaxial" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 皮带传动与链条传动

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">靠皮带或链条连接的两个轮，接触处不打滑，两轮边缘的线速度、角速度各有什么关系？</div>
<div v-click="1">皮带（链条）不可伸长、也不打滑，相等时间内从接触处通过的弧长相同，所以边缘的 <Latex tex="v" /> 相同。</div>
<div v-click="1">由 <Latex tex="v = \omega r" /> 可知，轮半径越大，角速度越小，<Latex tex="\omega \propto \frac{1}{r}" />。</div>
<div class="key" v-click="1">皮带 / 链条传动：<Latex tex="v" /> 相同，两轮转向相同。</div>
</div>

<div class="figure"><TransmissionSvg mode="belt" :show-rotation="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 齿轮传动

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">两个齿轮直接啮合，接触处不打滑，它们的线速度、角速度和转向有什么关系？</div>
<div v-click="1">啮合处不打滑，所以两齿轮边缘的 <Latex tex="v" /> 相同；由 <Latex tex="v = \omega r" /> 可知，齿轮半径越大，角速度越小。</div>
<div v-click="1">两轮在啮合点的齿面贴在一起运动，啮合点的运动方向只有一个 —— 同一个运动方向，对两个转轴来说旋向正好相反。</div>
<div class="key" v-click="1">齿轮传动：<Latex tex="v" /> 相同，两轮转向<strong>相反</strong>。</div>
</div>

<div class="figure"><TransmissionSvg mode="gear" :show-rotation="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 三种传动对比

<div class="page-grow">
<table>
<thead>
<tr><th>传动方式</th><th>相同的量</th><th>由 <Latex tex="v = \omega r" /> 推出的关系</th><th>转向</th></tr>
</thead>
<tbody>
<tr><td><mdi-axis-arrow class="text-xl" /> 同轴传动</td><td>角速度 <Latex tex="\omega" /></td><td><Latex tex="v \propto r" /></td><td>相同</td></tr>
<tr><td><mdi-link-variant class="text-xl" /> 皮带 / 链条</td><td>线速度 <Latex tex="v" /></td><td><Latex tex="\omega \propto \frac{1}{r}" /></td><td>相同</td></tr>
<tr><td><mdi-cog class="text-xl" /> 齿轮传动</td><td>线速度 <Latex tex="v" /></td><td><Latex tex="\omega \propto \frac{1}{r}" /></td><td>相反</td></tr>
</tbody>
</table>
<div class="key" v-click="1">先判断“谁跟谁相同”，另一个量再由 <Latex tex="v = \omega r" /> 推出。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 例题

<div class="page-grow">
<div class="stack text-xl leading-relaxed">
<div>一个小孩坐在游乐场的旋转木马上，绕中心轴在水平面内做匀速圆周运动，圆周的半径是 <Latex tex="4.0\ \text{m}" />。当他的线速度为 <Latex tex="2.0\ \text{m/s}" /> 时，他做匀速圆周运动的角速度是多少？周期是多少？</div>
<div v-click="1">由 <Latex tex="v = \omega r" />，角速度 <Latex tex="\omega = \frac{v}{r} = \frac{2.0}{4.0}\ \text{rad/s} = 0.5\ \text{rad/s}" />。</div>
<div v-click="1">周期 <Latex tex="T = \frac{2\pi r}{v} = \frac{2\pi \times 4.0}{2.0}\ \text{s} \approx 12.6\ \text{s}" />。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 练习与应用

<div class="page-grow">
<div class="split-wide">
<div class="stack text-lg">
<div>某个走时准确的时钟，分针与时针由转动轴到针尖的长度之比是 <Latex tex="1.4 : 1" />。<br />（1）分针与时针的角速度之比是多少？<br />（2）分针针尖与时针针尖的线速度之比是多少？</div>
<div v-click="1">（1）分针、时针的周期分别是 <Latex tex="1\ \text{h}" /> 与 <Latex tex="12\ \text{h}" />，由 <Latex tex="\omega = \frac{2\pi}{T}" /> 得 <Latex tex="\omega_{\text{分}} : \omega_{\text{时}} = 12 : 1" />。</div>
<div v-click="2">（2）由 <Latex tex="v = \omega r" />，<Latex tex="v_{\text{分}} : v_{\text{时}} = \omega_{\text{分}} r_{\text{分}} : \omega_{\text{时}} r_{\text{时}} = 12 \times 1.4 : 1 = 16.8 : 1" />。</div>
</div>

<div class="figure"><ClockHandsSvg /></div>
</div>
</div>
