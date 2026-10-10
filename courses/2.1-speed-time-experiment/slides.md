---
theme: default
title: "实验：探究小车速度随时间变化的规律"
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
chapter: 第二章 匀变速直线运动的研究
---

<CoverDecorationSvg />

---
layout: base-flex
---

<div class="page-grow">
<div class="ask">纸带上某一点的速度，怎么求？</div>

<div v-click="1" class="stack">
<div>平均速度的定义式是 <Latex tex="\bar{v} = \dfrac{\Delta x}{\Delta t}" />。某一点的<b>瞬时速度</b>，用<b>该点前后一小段距离</b>的平均速度来代替：</div>
<div><Latex tex="v_{\text{瞬时}} \approx \bar{v}_{\text{该点前后一小段}} = \dfrac{\Delta x}{\Delta t}" display /></div>
<div>这一小段取得越小，段内"快慢的差异"就越小，算出的平均速度就越接近该点的<b>瞬时速度</b>。</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask">既然越小越接近瞬时速度——那就把 <Latex tex="\Delta x" /> 取到最小？</div>

<div v-click="1" class="stack">
<div class="mini-title"><mdi-ruler /> 两个限制</div>
<div>① <b>打出的点是有尺寸、有粗细的</b>，量出来的距离不可能无限精确；</div>
<div>② 用刻度尺测量的<b>有效精度是 <Latex tex="1\ \text{mm}" />，还要估读一位有效数字</b>。</div>
</div>

<div v-click="2" class="key">所以 <Latex tex="\Delta x" /> <b>不能取得太小</b>：否则这点读数误差在结果里就会占较大的比重。取"该点前后的一小段"，是"逼近瞬时速度"和"控制误差比重"之间的折中。</div>
</div>

---
layout: base-flex
---

# 器材安装

<div class="page-grow">
<div class="ask">器材要怎么装，纸带才"能用"？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2" class="op-step">
<div class="op-num">1</div>
<div class="op-body">打点计时器<b>固定在实验台上</b>，连接好电源和导线。</div>
</div>
<div v-click="3" class="op-step">
<div class="op-num">2</div>
<div class="op-body">纸带<b>穿过限位孔</b>、压在<b>墨盘下面</b>，保证纸带能顺畅地移动。</div>
</div>
<div v-click="4" class="op-step">
<div class="op-num">3</div>
<div class="op-body">小车放在<b>纸带的一端</b>，细绳挂在<b>滑轮</b>上，<b>木板放平</b>，尽量减小小车与纸带之间的摩擦力，以减少实验误差。</div>
</div>
</div>
<div v-click="1" class="divider-l stack">
<div class="mini-title"><mdi-cart-outline /> 实验装置</div>
<ExperimentSetupSvg />
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask">如果先放开小车、再接通电源，会怎样？</div>

<div v-click="1" class="stack">
<div class="mini-title"><mdi-close-circle-outline class="ico-bad" /> 顺序反了</div>
<div>小车已经先跑了一段，纸带上<b>最开始运动的那段信息没有被打下来</b>——小车从起点开始运动的信息就丢失了。</div>
</div>

<div v-click="2" class="stack">
<div class="mini-title"><mdi-check-circle-outline class="ico-good" /> 正确做法</div>
<div>先接通电源，<b>等振针振动稳定、打点稳定之后，再释放小车</b>；同时用手挡在滑轮处，防止小车掉落。</div>
<div class="key">电磁式打点计时器使用振针，刚接通电源时，还没有稳定振动起来——这时候放车，纸带开头的几个点打不准。</div>
</div>
</div>

---
layout: base-flex
---

# 实验要点（二）：配重与试运行

<div class="page-grow">
<div class="op-banner"><mdi-play-circle-outline /> 现在请各组动手</div>

<div class="op-list">
<div class="op-step">
<div class="op-num">1</div>
<div class="op-body">先<b>试运行 1～2 次</b>，确认配重与小车车重在<b>合理的范围内</b>。</div>
</div>
<div class="op-step">
<div class="op-num">2</div>
<div class="op-body">实验可以<b>做两次</b>，记录实验数据，并作表格进行处理。</div>
</div>
<div class="op-step">
<div class="op-num">3</div>
<div class="op-body">纸带上取的点数大约 <b>8 个点左右</b>。</div>
</div>
<div class="op-step">
<div class="op-num">4</div>
<div class="op-body">纸带走完<b>立即关闭电源</b>，取下纸带。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 记录表

<div class="page-grow">
<table class="data-table data-table-blank">
<thead>
<tr><th class="lead">位置</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
</thead>
<tbody>
<tr><td class="lead"><Latex tex="x" /></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td class="lead"><Latex tex="\Delta x" /></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td class="lead"><Latex tex="\Delta t" /></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td class="lead"><Latex tex="v" /></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>

<div class="fig-note">位置 0 是有效的第 0 个计数点：时间取 <Latex tex="t_0 = 0\ \text{s}" />，之后每隔 <Latex tex="T = 0.1\ \text{s}" /> 取一点</div>
</div>

---
layout: base-flex
---

# 处理数据

<div class="page-grow">
<div class="ask">纸带拿到手，怎么把它变成数据？</div>

<div class="op-list op-list-tight">
<div class="op-step">
<div class="op-num">1</div>
<div class="op-body">先<b>舍掉开头过于密集的点</b>，从<b>清晰的点</b>开始，<b>每隔 4 个点取 1 个计数点</b>（每 5 个点）。</div>
</div>
<div class="op-step">
<div class="op-num">2</div>
<div class="op-body">用刻度尺从起头<b>一次性读出</b>所有计数点的坐标。</div>
</div>
<div class="op-step">
<div class="op-num">3</div>
<div class="op-body">算各计数点的<b>瞬时速度</b> <Latex tex="v_{\text{瞬时}} \approx \frac{\Delta x}{\Delta t}" />；相邻两个计数点的时间间隔 <Latex tex="T = 0.1\ \text{s}" />，本实验取 2 位有效数字。</div>
</div>
<div class="op-step">
<div class="op-num">4</div>
<div class="op-body"><b>充分利用坐标纸</b>，建立合适的横、纵轴范围，把每个时间点对应的速度画在坐标纸上。</div>
</div>
<div class="op-step">
<div class="op-num">5</div>
<div class="op-body"><b>拟合直线</b>，得到最终的 <Latex tex="v-t" /> 图像。</div>
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask ask-center"><mdi-head-question-outline /> 量纸带上各点到起点的距离，你会怎么量？</div>

<div class="grid grid-cols-2 gap-6">

<div v-click="1" class="text-center">
  <TapeSegmentMeasureSvg />
  <div class="mt-3 text-base leading-snug"><mdi-close-circle-outline class="warn text-lg inline-block align-middle mr-1" /><span class="warn font-semibold">逐段量再相加</span> —— 误差<span class="warn">会累积</span></div>
</div>

<div v-click="2" class="text-center">
  <TapeMeasureFromStartSvg />
  <div class="mt-3 text-base leading-snug"><mdi-check-circle-outline class="good text-lg inline-block align-middle mr-1" /><span class="good font-semibold">一次量到底</span> —— 误差<span class="good">范围一定</span></div>
</div>

</div>

<div v-click="3" class="key">量纸带上的位置，一律<span class="text-accent-2">从起点（第一个点）量起</span>：一次量到要读的那个点，读出的就是它到起点的距离。逐段量时，每一段都要单独读一次数，读数误差会一段一段累加；<span class="text-accent">从起点一次量到底，每个点只和起点比一次，误差范围一定、不会累积</span>。</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask">纵轴从 0 开始画，行不行？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2"><b>计时起点不是释放小车的时刻</b>：纸带开头那些过于密集的点已经舍掉了，第 0 个计数点是小车<b>已经有一定速度</b>时的一个点——<Latex tex="v_0 \neq 0" />。</div>
<div v-click="3" class="key">所以数据的起点在纵轴上方：纵轴若从 0 画，下面一大段坐标纸就白留了，点全挤在上方一条窄带里。要<b>充分利用坐标纸</b>（避免图形退化、拟合变弱）：在纵轴靠近原点处画一道<b>锯齿折断线</b>；时间仍从有效的第 0 个点开始取 <Latex tex="t_0 = 0\ \text{s}" />。</div>
</div>
<div v-click="1" class="divider-l stack">
<div class="mini-title"><mdi-axis-arrow /> 纵轴的折断</div>
<BrokenAxisSvg />
</div>
</div>
</div>

---
layout: base-flex
---

# 有效数字与科学计数法

<div class="page-grow">
<div class="ask">记录和计算时，数字该写几位？</div>

<div v-click="1" class="key key-lead">一个数有几个<b>有效数字</b>？先把它写成科学计数法的形式 <Latex tex="a \times 10^{n}" /> <Latex tex="(1 \le a < 10)" />，再数<b>左侧数字 <Latex tex="a" /></b> 有几位——指数 <Latex tex="10^{n}" /> <b>不计入</b>。例如 <Latex tex="0.080\ \text{m/s} = 8.0 \times 10^{-2}\ \text{m/s}" />，左侧是 <Latex tex="8.0" />，就是 2 位有效数字。</div>

<div class="op-list op-list-tight">
<div v-click="2" class="op-step">
<div class="op-num">1</div>
<div class="op-body">记录并计算 <b>2 位有效数字</b>，用<b>科学计数法</b>书写。</div>
</div>
<div v-click="3" class="op-step">
<div class="op-num">2</div>
<div class="op-body">计算过程中按 <b>3 位有效数字</b>保留。</div>
</div>
<div v-click="4" class="op-step">
<div class="op-num">3</div>
<div class="op-body">结果<b>保留最短的位数</b>。</div>
</div>
<div v-click="5" class="op-step op-step-warn">
<div class="op-num">4</div>
<div class="op-body">中间<b>不能四舍五入</b>：多保留一位，最后再舍。</div>
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask">把数据点描到坐标纸上，图线该怎么画？</div>

<div class="half-grid half-grid-top">
<div class="stack">
<div v-click="2" class="reason">先用<b>十字线</b>画出每一个数据点。</div>
<div v-click="3" class="reason">看这些点：它们大致排在<b>一条直线</b>上——<Latex tex="v" /> 随 <Latex tex="t" /> 均匀增大。</div>
<div v-click="4" class="reason">既然近似是一条直线，就应该用<b>直线拟合</b>，而不是把点连成折线。</div>
<div v-click="5" class="key">直线拟合的要求：让<b>更多的点落在直线上</b>；同时使<b>直线两侧的点数一样</b>。</div>
</div>
<div v-click="1" class="divider-l stack">
<div class="mini-title"><mdi-chart-scatter-plot /> 拟合一条直线</div>
<VtFitScatter />
<div class="fig-note">十字线描点：4 个点在直线上方、4 个在下方</div>
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<FitLine />
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask">这条直线的斜率，代表什么？</div>

<div class="half-grid">
<div v-click="1" class="stack">
<VtSlopeTriangle />
</div>
<div v-click="2" class="divider-l stack">
<div><Latex tex="a = \dfrac{\Delta v}{\Delta t} = \text{直线的斜率}" display /></div>
<div class="mini-note">在<b>直线</b>上取两个相距较远的点（示例数据：<Latex tex="(0.2,\ 0.32)" /> 与 <Latex tex="(0.7,\ 0.72)" />）：<Latex tex="a = \dfrac{0.40\ \text{m/s}}{0.50\ \text{s}} = 0.80\ \text{m/s}^2" />。</div>
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask ask-big">只做一次实验，能看出规律吗？</div>

<div class="err-grid">
<div v-click="1" class="err-card">
<mdi-chart-scatter-plot class="err-ico" />
<div class="err-text">纸带上的点不会正好都落在一条直线上——这就是<b>实验误差</b>。</div>
</div>
<div v-click="2" class="err-card err-card-good">
<mdi-clipboard-check-multiple-outline class="err-ico" />
<div class="err-text"><b>充分复核实验</b>：多做几组、多取几条纸带，同样的规律就会稳定地显现出来。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="mini-title mini-title-lead"><mdi-format-list-numbered /> 三件必须做对的事</div>

<div class="op-list op-list-big">
<div v-click="1" class="op-step">
<div class="op-num">1</div>
<div class="op-body"><b>先接通电源、后放开小车</b>：否则小车最开始运动的信息会丢失。</div>
</div>
<div v-click="2" class="op-step">
<div class="op-num">2</div>
<div class="op-body">刻度尺<b>从起头一次性读出</b>各计数点的坐标：逐段量、误差会累积。</div>
</div>
<div v-click="3" class="op-step">
<div class="op-num">3</div>
<div class="op-body">纵轴<b>折断</b>、用<b>十字线</b>描点，使拟合直线两侧的点数一样。</div>
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="think-lead"><mdi-lightbulb-on-outline /> 思考</div>

<div class="think-body">
<div>这种<b>加速度不变</b>的运动，是什么运动？</div>
<div v-click="1">它在不同时间下的<b>速度</b>和<b>位移</b>，又有什么规律？</div>
</div>

<div class="think-deco abs-br m-8" aria-hidden="true">
<mdi-lightbulb-on-outline />
</div>
</div>
