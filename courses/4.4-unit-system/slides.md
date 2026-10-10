---
theme: default
title: "力学单位制"
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
chapter-no: "4.4"
chapter: 第四章 运动和力的关系
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">英制长度至今仍在部分地区使用，它的四个常用单位是这么换算的：</div>

<div class="imperial-chain" v-click="1">
<div class="imp-node"><Latex tex="1\ \text{in}" /><small>英寸</small></div>
<div class="imp-link"><span>×12</span><mdi-arrow-right /></div>
<div class="imp-node"><Latex tex="1\ \text{ft}" /><small>英尺</small></div>
<div class="imp-link"><span>×3</span><mdi-arrow-right /></div>
<div class="imp-node"><Latex tex="1\ \text{yd}" /><small>码</small></div>
<div class="imp-link"><span>×5280</span><mdi-arrow-right /></div>
<div class="imp-node"><Latex tex="1\ \text{mile}" /><small>英里</small></div>
</div>

<div class="mini-note" v-click="1" style="text-align: center">1959 年后，<Latex tex="1\ \text{in} \equiv 2.54\ \text{cm}" /> 是严格精确的定义值。</div>

<div class="ask" v-click="2">英寸到英尺记 12，英尺到码记 3，码到英里记 5280 —— 三套互不相干的进率，用起来是什么感受？</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">计量大象的质量用吨（<Latex tex="\text{t}" />），计量人的质量用千克（<Latex tex="\text{kg}" />）；自由落体加速度 <Latex tex="g" /> 的单位写成 <Latex tex="\text{m/s}^2" />，初中又写作 <Latex tex="\text{N/kg}" /> —— 这些单位的使用，有什么规则吗？</div>

<div class="stack" style="align-items: center" v-click="1">
<div><Latex tex="v = \frac{\Delta x}{\Delta t}" /> &nbsp;&nbsp;→&nbsp;&nbsp; <Latex tex="1\ \text{m/s} = 1\ \text{m}\cdot\text{s}^{-1}" /></div>
<div><Latex tex="a = \frac{\Delta v}{\Delta t}" /> &nbsp;&nbsp;→&nbsp;&nbsp; <Latex tex="1\ \text{m/s}^{2} = 1\ \text{m}\cdot\text{s}^{-2}" /></div>
</div>

<div class="key" v-click="2">物理关系式在确定物理量之间关系的同时，也确定了它们的<b>单位之间的关系</b>。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 基本量与基本单位

<div class="page-grow">
<div class="card">只要选定几个物理量的单位，其他物理量的单位就能由物理关系式推导出来。这些被选定的物理量叫作<b>基本量</b>，它们的单位叫作<b>基本单位</b>。</div>

<div class="ask">为什么选定的偏偏是长度、质量、时间？</div>

<div class="three-col">
<div class="stack" v-click="1">
<div class="text-accent-2 text-lg">相互独立</div>
<div class="mini-note">一个量不能由另外两个推导出来</div>
</div>
<div class="stack" v-click="2">
<div class="text-accent-2 text-lg">常见常用</div>
<div class="mini-note">描述物体的运动离不开它们</div>
</div>
<div class="stack" v-click="3">
<div class="text-accent-2 text-lg">易于测量</div>
<div class="mini-note">都能方便地定出标准</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 导出量与单位制

<div class="page-grow">
<div class="card">由基本量根据物理关系推导出来的其他物理量，叫作<b>导出量</b>；推导出来的单位，叫作<b>导出单位</b>。</div>

<div class="unit-flow">
<div class="unit-flow-row">
<span class="unit-chip">基本量</span>
<span class="unit-op"><mdi-arrow-right /> 物理关系式</span>
<span class="unit-chip">导出量</span>
</div>
<div class="unit-flow-row">
<span class="unit-chip unit-chip-blue">基本单位</span>
<span class="unit-op">＋</span>
<span class="unit-chip unit-chip-blue">导出单位</span>
<span class="unit-op">＝</span>
<span class="unit-chip unit-chip-accent">单位制</span>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 国际单位制（SI）

<div class="page-grow">
<table class="si-table">
<thead>
<tr><th>物理量</th><th>符号</th><th>单位名称</th><th>单位符号</th></tr>
</thead>
<tbody>
<tr><td><b>长度</b></td><td><Latex tex="l" /></td><td><b>米</b></td><td><b><Latex tex="\text{m}" /></b></td></tr>
<tr><td><b>质量</b></td><td><Latex tex="m" /></td><td><b>千克</b></td><td><b><Latex tex="\text{kg}" /></b></td></tr>
<tr><td><b>时间</b></td><td><Latex tex="t" /></td><td><b>秒</b></td><td><b><Latex tex="\text{s}" /></b></td></tr>
<tr><td>电流</td><td><Latex tex="I" /></td><td>安培</td><td><Latex tex="\text{A}" /></td></tr>
<tr><td>热力学温度</td><td><Latex tex="T" /></td><td>开尔文</td><td><Latex tex="\text{K}" /></td></tr>
<tr><td>物质的量</td><td><Latex tex="n" /></td><td>摩尔</td><td><Latex tex="\text{mol}" /></td></tr>
<tr><td>发光强度</td><td><Latex tex="I" /></td><td>坎德拉</td><td><Latex tex="\text{cd}" /></td></tr>
</tbody>
</table>

<div class="key" v-click="1">各用各的单位制就没法交流 —— 1960 年第 11 届国际计量大会制订了国际通用的<b>国际单位制</b>（SI）：力学只用到长度、质量、时间三个基本量。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 一次单位换算的代价

<div class="page-grow">
<div class="ask">1999 年 9 月 23 日，"火星气候探测者号"在进入火星轨道时失联焚毁，任务损失约 <span class="text-accent">1.25 亿美元</span>。</div>

<div class="half-grid">
<div class="stack">
<div class="mini-title">地面导航软件</div>
<div>推力数据用磅力（<Latex tex="\text{lbf}" />）计算</div>
</div>
<div class="stack divider-l">
<div class="mini-title">探测器飞行控制系统</div>
<div>把同一串数据当作牛顿（<Latex tex="\text{N}" />）使用</div>
</div>
</div>

<div class="key" v-click="1">调查结论只有一行：<b>一处单位换算错误</b>（<Latex tex="1\ \text{lbf} \approx 4.45\ \text{N}" />）。如果两边都用国际单位制，这场事故根本不会发生。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 基本单位的标准，一直在变

<div class="page-grow">
<div class="history-stage" v-click="1">
<div class="history-stage-title">实物</div>
<div class="history-stage-body">米最初由地球子午线的弧长定义，后来制成米原器、千克原器，以实物为标准。</div>
</div>

<div class="history-stage" v-click="2">
<div class="history-stage-title">自然现象</div>
<div class="history-stage-body">改用容易复现的原子过程：铯-133 原子的跃迁周期定义秒，氪-86 光谱线的波长定义米。</div>
</div>

<div class="history-stage" v-click="3">
<div class="history-stage-title">基本常数</div>
<div class="history-stage-body">米定义为光在真空中 <Latex tex="\frac{1}{299\,792\,458}\ \text{s}" /> 内经过的路程；2019 年起，千克由普朗克常量定义。</div>
</div>

<div class="key" v-click="4">七个基本单位现在全部建立在不变的物理常数上，标准不会因为"原件"本身的变化而改变。</div>
</div>

---
layout: base-flex
clicks: 6
---

# 用基本单位表示导出单位

<div class="page-grow">
<div class="derive-row">
<Latex tex="v = \frac{\Delta x}{\Delta t}" />
<div class="derive-op">→</div>
<div v-click="1"><Latex tex="1\ \text{m/s} = 1\ \text{m}\cdot\text{s}^{-1}" /></div>
</div>

<div class="derive-row">
<Latex tex="a = \frac{\Delta v}{\Delta t}" />
<div class="derive-op">→</div>
<div v-click="2"><Latex tex="1\ \text{m/s}^{2} = 1\ \text{m}\cdot\text{s}^{-2}" /></div>
</div>

<div class="derive-row">
<Latex tex="F = ma" />
<div class="derive-op">→</div>
<div v-click="3"><Latex tex="1\ \text{N} = 1\ \text{kg}\cdot\text{m}\cdot\text{s}^{-2}" /></div>
</div>

<div class="derive-row">
<Latex tex="W = Fl" />
<div class="derive-op">→</div>
<div v-click="4"><Latex tex="1\ \text{J} = 1\ \text{N}\cdot\text{m} = 1\ \text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-2}" /></div>
</div>

<div class="derive-row">
<Latex tex="P = \frac{W}{t}" />
<div class="derive-op">→</div>
<div v-click="5"><Latex tex="1\ \text{W} = 1\ \text{J/s} = 1\ \text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-3}" /></div>
</div>

<div class="key" v-click="6"><Latex tex="1\ \text{N/kg} = 1\ \text{kg}\cdot\text{m}\cdot\text{s}^{-2}/\text{kg} = 1\ \text{m/s}^{2}" /> —— 初中学过的两个单位，本来就是同一个。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 电学导出单位的推导

<div class="page-grow">
<div class="ask">初中学过的电压与电阻，它们的单位也是导出单位；推导它们时，还要用到电流的单位 <Latex tex="\text{A}" />。</div>

<div class="derive-row">
<Latex tex="U = \frac{P}{I}" />
<div class="derive-op">→</div>
<div v-click="1"><Latex tex="1\ \text{V} = 1\ \text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-3}\cdot\text{A}^{-1}" /></div>
</div>

<div class="derive-row">
<Latex tex="R = \frac{U}{I}" />
<div class="derive-op">→</div>
<div v-click="2"><Latex tex="1\ \Omega = 1\ \text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-3}\cdot\text{A}^{-2}" /></div>
</div>

<div class="key" v-click="3">方法完全一样：把物理关系式里的量换成它的单位，做乘除。</div>
</div>

---
layout: base-flex
---

# 导出单位推导表

<div class="page-grow">
<table class="derive-table">
<thead>
<tr><th>物理量符号</th><th>导出公式 / 基础关系</th><th>用基本单位表示</th><th>常用单位符号</th></tr>
</thead>
<tbody>
<tr><td><Latex tex="x" /></td><td>—</td><td><Latex tex="\text{m}" /></td><td>—</td></tr>
<tr><td><Latex tex="v" /></td><td><Latex tex="v = \frac{\Delta x}{\Delta t}" /></td><td><Latex tex="\text{m}\cdot\text{s}^{-1}" /></td><td>—</td></tr>
<tr><td><Latex tex="a" /></td><td><Latex tex="a = \frac{\Delta v}{\Delta t}" /></td><td><Latex tex="\text{m}\cdot\text{s}^{-2}" /></td><td>—</td></tr>
<tr><td><Latex tex="F" /></td><td><Latex tex="F = ma" /></td><td><Latex tex="\text{kg}\cdot\text{m}\cdot\text{s}^{-2}" /></td><td><Latex tex="\text{N}" /></td></tr>
<tr><td><Latex tex="W,\ Q" /></td><td><Latex tex="W = Fl" /></td><td><Latex tex="\text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-2}" /></td><td><Latex tex="\text{J}" /></td></tr>
<tr><td><Latex tex="P" /></td><td><Latex tex="P = \frac{W}{t}" /></td><td><Latex tex="\text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-3}" /></td><td><Latex tex="\text{W}" /></td></tr>
<tr><td><Latex tex="U" /></td><td><Latex tex="U = \frac{P}{I}" /></td><td><Latex tex="\text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-3}\cdot\text{A}^{-1}" /></td><td><Latex tex="\text{V}" /></td></tr>
<tr><td><Latex tex="R" /></td><td><Latex tex="R = \frac{U}{I}" /></td><td><Latex tex="\text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-3}\cdot\text{A}^{-2}" /></td><td><Latex tex="\Omega" /></td></tr>
</tbody>
</table>
</div>

---
layout: base-flex
clicks: 3
---

# 计算时注意单位

<div class="page-grow">
<div class="ask">光滑水平桌面上，质量 <Latex tex="700\ \text{g}" /> 的物体在 <Latex tex="1.4\ \text{N}" /> 恒力作用下由静止运动，求 <Latex tex="5\ \text{s}" /> 末的速度和位移。</div>

<div class="stack calc-stack" style="align-items: center" v-click="1">
<div><Latex tex="m = 700\ \text{g} = 0.7\ \text{kg}" /></div>
<div><Latex tex="a = \frac{F}{m} = \frac{1.4}{0.7}\ \text{m/s}^{2} = 2\ \text{m/s}^{2}" /></div>
<div><Latex tex="v = at = 2 \times 5\ \text{m/s} = 10\ \text{m/s}" /></div>
<div><Latex tex="x = \frac{1}{2}at^{2} = \frac{1}{2} \times 2 \times 25\ \text{m} = 25\ \text{m}" /></div>
</div>

<div class="summary-line" v-click="2">统一到国际单位制后，计算中不必逐项写单位，只在结果后面写单位。</div>

<div class="key" v-click="3">牛顿第二定律严格写是 <Latex tex="F = kma" />，<Latex tex="k" /> 由单位的选择决定；只有都用国际单位制，才有 <Latex tex="k = 1" />，公式才写成 <Latex tex="F = ma" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 国际单位制的应用

<div class="page-grow">
<div class="ask">圆锥的体积公式 <Latex tex="V = \frac{1}{3}\pi R^{3}h" />，从单位上看，对吗？</div>

<div class="stack" style="align-items: center" v-click="1">
<div>左边（体积）：<Latex tex="\text{m}^{3}" /></div>
<div>右边：<Latex tex="\text{m}^{3} \times \text{m} \to \text{m}^{4}" /></div>
</div>

<div class="key key-danger" v-click="2"><span class="text-wrong">两边单位不同，这个公式一定错</span>—— 正确的应该是 <Latex tex="V = \frac{1}{3}\pi R^{2}h" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 国际单位制的应用

<div class="page-grow">
<div class="problem">某同学解得物体的位移 <Latex tex="x = \frac{F}{2m}(t_{1} + t_{2})" />，这个结果可能正确吗？</div>

<div class="stack" style="align-items: center" v-click="1">
<div>右边单位：<Latex tex="\frac{\text{N}}{\text{kg}} \cdot \text{s} \to \frac{\text{kg}\cdot\text{m}\cdot\text{s}^{-2}}{\text{kg}} \cdot \text{s} \to \text{m}\cdot\text{s}^{-1}" /></div>
<div>左边单位：<Latex tex="\text{m}" /></div>
</div>

<div class="key key-danger text-wrong" v-click="2">单位不一致 —— 这个结果不可能正确。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 国际单位制的应用

<div class="page-grow">
<div class="ask">只看单位，判断下面三个式子能否成立：</div>

<div class="three-col">
<div class="stack judge-col" v-click="1">
<div><Latex tex="a = \frac{v^{2}}{x}" /></div>
<div class="mini-note"><Latex tex="\text{m}^{2}\cdot\text{s}^{-2} \div \text{m} \to \text{m}\cdot\text{s}^{-2}" /></div>
<div class="text-correct">与加速度的单位一致 ✓</div>
</div>
<div class="stack judge-col" v-click="2">
<div><Latex tex="F = \frac{mv}{t}" /></div>
<div class="mini-note"><Latex tex="\text{kg}\cdot\text{m}\cdot\text{s}^{-1} \div \text{s} \to \text{kg}\cdot\text{m}\cdot\text{s}^{-2}" /></div>
<div class="text-correct">就是 <Latex tex="\text{N}" /> ✓</div>
</div>
<div class="stack judge-col" v-click="3">
<div><Latex tex="W = Fv" /></div>
<div class="mini-note"><Latex tex="\text{kg}\cdot\text{m}\cdot\text{s}^{-2} \times \text{m}\cdot\text{s}^{-1} \to \text{kg}\cdot\text{m}^{2}\cdot\text{s}^{-3}" /></div>
<div class="text-wrong">量纲是功率，不是功 ✗</div>
</div>
</div>

<div class="key" v-click="3">单位对了，公式不一定对；单位不对，公式一定错。</div>
</div>

---
layout: base-flex
---

# 单位制的构成

<div class="page-grow">
<div class="three-col">
<div class="stack">
<div class="mini-title">基本量 · 基本单位</div>
<div>选定后不再由其他量推导；力学范围内是 <Latex tex="\text{m}" />、<Latex tex="\text{kg}" />、<Latex tex="\text{s}" />。</div>
</div>
<div class="stack">
<div class="mini-title">导出量 · 导出单位</div>
<div>由基本量按物理关系式推导出来，例如 <Latex tex="\text{N}" />、<Latex tex="\text{J}" />、<Latex tex="\text{W}" />、<Latex tex="\text{V}" />、<Latex tex="\Omega" />。</div>
</div>
<div class="stack">
<div class="mini-title">单位制</div>
<div>基本单位和导出单位组成的完整体系，国际上统一采用 SI。</div>
</div>
</div>

<div class="key">先定下基本单位，其余单位都能由物理关系式推出来 —— 这就是单位制的全部逻辑。</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><b>基本量</b>——相互独立、常见常用、易于测量；它们的单位是<b>基本单位</b>。</div>
<div class="summary-line"><b>导出量</b>——由基本量按物理关系式推出；它们的单位是<b>导出单位</b>，例如 <Latex tex="\text{N}" />、<Latex tex="\text{J}" />、<Latex tex="\text{W}" />、<Latex tex="\text{V}" />、<Latex tex="\Omega" />。</div>
<div class="summary-line"><b>单位制</b>——基本单位 ＋ 导出单位；国际通用的是国际单位制 SI。</div>
<div class="summary-line"><b>用单位检查结果</b>——两边都还原成基本单位，不一致就一定错；一致也未必对，但能先排除错的。</div>
</div>

<div class="key">把已知量统一到国际单位制，数值和单位才不会各说各话 —— 1999 年那 1.25 亿美元，就是少做了这一步。</div>
</div>
