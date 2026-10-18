---
theme: default
title: "实验：导体电阻率的测量"
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
chapter-no: "11.3"
chapter: "第十一章 电路及其应用"
subtitle: 游标卡尺 · 螺旋测微器 · 伏安法
---

<CoverDecorationSvg />

---
clicks: 3
---

<div class="page-grow">
<div class="ask">要算出电阻率 <Latex tex="\rho" />，需要测出哪几个物理量？</div>

<div v-click="1">
<Latex tex="\rho = \frac{SR}{l} = \frac{\pi d^2 R}{4l}" display />
</div>

<div v-click="2" class="stack">
<div><Latex tex="l" /> —— 电阻丝接入电路的<b>有效长度</b>，用刻度尺测量；</div>
<div><Latex tex="d" /> —— 电阻丝很细，用游标卡尺或螺旋测微器测量；</div>
<div><Latex tex="R" /> —— 用伏安法：测出多组 <Latex tex="U" />、<Latex tex="I" /> 后由图像求得。</div>
</div>

<div v-click="3" class="tip-hint"><Latex tex="d" /> 出现在<b>平方</b>里，直径的测量精度对结果影响最大。</div>
</div>

---
clicks: 2
---

# 游标卡尺

<div class="page-grow">
<div class="ask">刻度尺的最小分度是 <Latex tex="1\ \text{mm}" />，怎样把长度测准到 <Latex tex="0.1\ \text{mm}" />？</div>

<div class="split-wide">
<div class="figure">
<VernierCaliperSvg />
</div>
<div class="stack">
<div v-click="1">游标尺上 10 个分度总长 <Latex tex="9\ \text{mm}" />，每格 <Latex tex="0.9\ \text{mm}" />，与主尺的 <Latex tex="1\ \text{mm}" /> 相差 <Latex tex="0.1\ \text{mm}" />。</div>
<div v-click="2">被测长度每多 <Latex tex="0.1\ \text{mm}" />，游标尺就右移 <Latex tex="0.1\ \text{mm}" />，第一条刻度线恰好与主尺刻度线对齐——把"估读"变成了"找哪条线对齐"。</div>
</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">这把 10 分度游标卡尺的读数是多少？</div>

<VernierCaliperSvg :step="$clicks" />

<div class="stack-tight">
<div v-click="1">① 游标零线在主尺 <Latex tex="21\ \text{mm}" /> 与 <Latex tex="22\ \text{mm}" /> 之间 → 主尺读数 <Latex tex="21\ \text{mm}" />；</div>
<div v-click="2">② 游标第 7 条刻度线与主尺刻度线对齐 → 游标读数 <Latex tex="7 \times 0.1\ \text{mm} = 0.7\ \text{mm}" />；</div>
<div v-click="3">③ 两者相加：<Latex tex="l = 21\ \text{mm} + 0.7\ \text{mm} = 21.7\ \text{mm}" />。</div>
</div>

<div v-click="3" class="tip-hint">20 分度、50 分度游标卡尺的精度分别是 <Latex tex="0.05\ \text{mm}" />、<Latex tex="0.02\ \text{mm}" />，读数方法相同。</div>
</div>

---
clicks: 2
---

# 螺旋测微器

<div class="page-grow">
<div class="ask">精度要达到 <Latex tex="0.01\ \text{mm}" />，刻度该怎么做出来？</div>

<div class="split-wide">
<div class="figure">
<MicrometerSvg />
</div>
<div class="stack">
<div v-click="1">螺距是 <Latex tex="0.5\ \text{mm}" />：旋钮每转一周，测微螺杆前进或后退 <Latex tex="0.5\ \text{mm}" />。</div>
<div v-click="2">圆周上的可动刻度有 50 个等分：每转一格，螺杆移动 <Latex tex="\frac{0.5}{50}\ \text{mm} = 0.01\ \text{mm}" />。</div>
</div>
</div>
</div>

---
clicks: 4
---

<div class="page-grow">
<div class="ask">这个螺旋测微器的读数是多少？</div>

<MicrometerSvg :step="$clicks" />

<div class="stack-tight">
<div v-click="1">① 固定刻度：整毫米刻度线露出 <Latex tex="6\ \text{mm}" />；</div>
<div v-click="2">② 半毫米刻度线已露出，再加 <Latex tex="0.5\ \text{mm}" />；</div>
<div v-click="3">③ 可动刻度第 22.5 格与基准线对齐：<Latex tex="22.5 \times 0.01\ \text{mm} = 0.225\ \text{mm}" />（格间要估读一位）；</div>
<div v-click="4">④ 相加：<Latex tex="l = 6.5\ \text{mm} + 0.225\ \text{mm} = 6.725\ \text{mm}" />。</div>
</div>
</div>

---
clicks: 2
---

# 实验电路

<div class="page-grow">
<div class="ask">电阻 <Latex tex="R" /> 用伏安法测量，电路怎么接？</div>

<ResistivityCircuitSvg />

<div v-click="1" class="stack-tight">
<div>电压表并联在金属丝两端、电流表串在干路——金属丝电阻只有几欧，<b>电流表外接</b>时电压表分流的影响可以忽略。</div>
<div v-click="2">移动滑动变阻器的滑片，读取<b>多组</b> <Latex tex="U" />、<Latex tex="I" />，为图像法求 <Latex tex="R" /> 做准备。</div>
</div>
</div>

---
clicks: 2
---

# 长度的测量

<div class="page-grow">
<div class="ask">测的是电阻丝的总长度吗？</div>

<div v-click="1" class="stack">
<div>测量的是<b>接入电路的有效长度</b> <Latex tex="l" />——接入点之间的长度，不是整段电阻丝的长度。换几个位置反复测量，取平均值。</div>
</div>

<div v-click="2" class="tip-hint">有效长度偏大、偏小都会直接进入 <Latex tex="\rho = \dfrac{\pi d^2 R}{4l}" />，量取时要看清两根接线柱之间的那一段。</div>
</div>

---
clicks: 3
---

# 直径的测量

<div class="page-grow">
<div class="ask">电阻丝很细，怎样减小直径测量的误差？</div>

<div v-click="1" class="stack">
<div><b>方案一</b>：在电阻丝的不同位置，用螺旋测微器（或游标卡尺）测 3 次，取平均值；</div>
<div v-click="2"><b>方案二（累积法）</b>：把电阻丝在圆柱形物体上紧密缠绕 <Latex tex="n" /> 圈，测出总宽度 <Latex tex="w" />，则 <Latex tex="d = \dfrac{w}{n}" />。</div>
</div>

<div v-click="3" class="tip-hint">一次测量只有 <Latex tex="0.01\ \text{mm}" /> 的精度；密绕几十圈再量总宽，相对误差缩小到几十分之一。</div>
</div>

---
clicks: 2
---

# 数据处理

<div class="page-grow">
<div class="ask">多组 <Latex tex="U" />、<Latex tex="I" /> 怎么处理成电阻 <Latex tex="R" />？</div>

<div class="half-grid">
<div>
<CoordAxes
  :x-range="[0, 0.4]"
  :y-range="[0, 0.8]"
  :x-axis="{ quantity: 'I', unit: 'A' }"
  :y-axis="{ quantity: 'U', unit: 'V' }"
  :ticks="{ x: [0.1, 0.2, 0.3], y: [0.2, 0.4, 0.6] }"
  :view="{ width: 560, height: 400 }"
  :curves="[{ points: [{ x: 0, y: 0 }, { x: 0.36, y: 0.72 }], stroke: 'var(--c-accent)', width: 3, showAt: 2 }]"
  :labels="[
    { x: 0.1, y: 0.21, dot: 5, showAt: 1 },
    { x: 0.15, y: 0.29, dot: 5, showAt: 1 },
    { x: 0.2, y: 0.41, dot: 5, showAt: 1 },
    { x: 0.25, y: 0.5, dot: 5, showAt: 1 },
    { x: 0.3, y: 0.61, dot: 5, showAt: 1 },
    { x: 0.35, y: 0.69, dot: 5, showAt: 1 },
    { x: 0.28, y: 0.44, tex: 'R = \\dfrac{U}{I}', anchor: 'top-right', size: 18, halo: true, showAt: 2 },
  ]"
  :step="$clicks"
/>
</div>
<div class="stack">
<div v-click="1">以 <Latex tex="I" /> 为横轴、<Latex tex="U" /> 为纵轴描点；点本身有误差，不会严格落在一条直线上。</div>
<div v-click="2">过原点作一条直线，使点均衡分布在直线两侧——这条直线的<b>斜率</b>就是 <Latex tex="R" />。</div>
</div>
</div>

<div v-click="2" class="tip-hint">图像法把全部数据都用上了，个别读数的偶然误差在拟合中被平均掉。</div>
</div>

---
clicks: 3
---

# 误差分析

<div class="page-grow">
<div class="ask">与手册中的电阻率相比，测得的 <Latex tex="\rho" /> 可能偏大，也可能偏小——各是什么原因？</div>

<div v-click="1" class="stack">
<div><b>可能偏小</b>：电流表外接时电压表分走了一部分电流，算出的 <Latex tex="R" /> 比真实值小，<Latex tex="\rho" /> 随之偏小。</div>
<div v-click="2"><b>可能偏大</b>：金属丝通电时间过长会发热，金属的电阻率随温度升高而增大。</div>
</div>

<div v-click="3" class="tip-hint">读数、作图、计算每一步都有误差——与已知材料的电阻率对比数量级，就能判断自己的测量是否可靠。</div>
</div>

---
layout: exercise-split
clicks: 3
---

<template v-slot:stem>

用螺旋测微器测得金属丝的直径 <Latex tex="d = 0.635\ \text{mm}" />，用刻度尺测得接入电路的有效长度 <Latex tex="l = 60.0\ \text{cm}" />。由多组 <Latex tex="U" />、<Latex tex="I" /> 数据作出的 <Latex tex="U-I" /> 图线斜率为 <Latex tex="2.0\ \Omega" />。求该金属丝的电阻率。

</template>

由 <Latex tex="R = \dfrac{U}{I}" /> 知，图线的斜率就是金属丝的电阻：<Latex tex="R = 2.0\ \Omega" />。

<div v-click="1">
横截面积 <Latex tex="S = \frac{\pi d^2}{4} = \frac{\pi \times (0.635 \times 10^{-3})^2}{4}\ \text{m}^2 \approx 3.16 \times 10^{-7}\ \text{m}^2" />
</div>

<div v-click="2">
代入 <Latex tex="\rho = \dfrac{SR}{l}" />：
</div>

<div v-click="2">
<Latex tex="\rho = \frac{3.16 \times 10^{-7} \times 2.0}{0.600}\ \Omega \cdot \text{m} \approx 1.05 \times 10^{-6}\ \Omega \cdot \text{m}" display />
</div>

<div v-click="3" class="tip-hint">这个数量级与镍铬合金的电阻率相当——若相差好几个数量级，先检查直径是否用了 <Latex tex="\text{mm}" /> 而长度用了 <Latex tex="\text{m}" />。</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">这节课的测量链条，从头到尾是怎么串起来的？</div>

<div v-click="1" class="stack">
<div><span class="text-accent"><Latex tex="\rho = \dfrac{\pi d^2 R}{4l}" /></span> —— <Latex tex="l" /> 用刻度尺（有效长度）、<Latex tex="d" /> 用螺旋测微器、<Latex tex="R" /> 用伏安法图像求得；</div>
<div v-click="2"><b>游标卡尺</b>：主尺读数 + 对齐格数 × 精度（<Latex tex="0.1\ \text{mm}" /> / <Latex tex="0.05\ \text{mm}" /> / <Latex tex="0.02\ \text{mm}" />），不用估读；</div>
<div v-click="3"><b>螺旋测微器</b>：固定刻度 + 可动刻度 × <Latex tex="0.01\ \text{mm}" />，可动刻度要<b>估读一位</b>。</div>
</div>
</div>
