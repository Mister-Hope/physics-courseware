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
lesson: 第一课时
subtitle: 长度的测量：游标卡尺 · 螺旋测微器
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
<div><Latex tex="R" /> —— 用伏安法：测出多组 <Latex tex="U" />、<Latex tex="I" />，由 <Latex tex="U-I" /> 图线求得。</div>
</div>

<div v-click="3" class="tip-hint"><Latex tex="d" /> 在公式里是<b>平方</b>，它的测量精度对结果影响最大。</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask">这根金属丝的直径约 <Latex tex="0.6\ \text{mm}" />——用最小分度 <Latex tex="1\ \text{mm}" /> 的刻度尺测，结果会怎样？</div>

<div v-click="1" class="stack">
<div>刻度尺读数要估读到分度值的下一位，也就是 <Latex tex="0.1\ \text{mm}" />：<Latex tex="\dfrac{0.1\ \text{mm}}{0.6\ \text{mm}} \approx 17\%" />；</div>
<div><Latex tex="d" /> 在 <Latex tex="\rho = \dfrac{\pi d^2 R}{4l}" /> 里是平方，<Latex tex="\rho" /> 的相对误差还要翻倍——<b>约 <Latex tex="33\%" /></b>，测量结果几乎全由直径决定。</div>
</div>

<div v-click="2" class="tip-hint">要测准，就换<b>游标卡尺</b>（精度最小到 <Latex tex="0.02\ \text{mm}" />）或<b>螺旋测微器</b>（<Latex tex="0.01\ \text{mm}" />）。</div>
</div>

---
clicks: 2
---

# 游标卡尺

<div class="page-grow">
<div class="ask">主尺的最小分度是 <Latex tex="1\ \text{mm}" />，游标尺怎样"造出" <Latex tex="0.1\ \text{mm}" /> 的精度？</div>

<div class="split-wide">
<div class="figure">
<VernierCaliperSvg :divisions="10" :reading="0.1" :step="$clicks" />
</div>
<div class="stack">
<div v-click="1">游标尺上 10 个等分刻度总长 <Latex tex="9\ \text{mm}" />，每格 <Latex tex="0.9\ \text{mm}" />，比主尺的一格少 <Latex tex="0.1\ \text{mm}" />——这个差值就是它的精度。</div>
<div v-click="2">量爪每多张开 <Latex tex="0.1\ \text{mm}" />，游标尺就右移 <Latex tex="0.1\ \text{mm}" />，总有一条刻度线恰好与主尺刻度线对齐——把"估读"换成了"<b>找哪条线对齐</b>"。</div>
</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">这把 10 分度游标卡尺的读数是多少？</div>

<div class="split-wide">
<div class="figure">
<VernierCaliperSvg :divisions="10" :reading="21.7" :step="$clicks" />
</div>
<div class="stack-tight">
<div v-click="1">① 游标零线在 <Latex tex="21\ \text{mm}" /> 与 <Latex tex="22\ \text{mm}" /> 之间 → 主尺读数 <Latex tex="21\ \text{mm}" />；</div>
<div v-click="2">② 第 7 条刻度线与主尺 <Latex tex="28\ \text{mm}" /> 刻度线对齐 → 游标读数 <Latex tex="7 \times 0.1\ \text{mm} = 0.7\ \text{mm}" />；</div>
<div v-click="3">③ <Latex tex="l = 21\ \text{mm} + 0.7\ \text{mm} = 21.7\ \text{mm}" />，末位就是精度位，<b>不需要再估读</b>。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 20 分度与 50 分度

<div class="page-grow">
<div class="ask">把游标尺分成 20 格、50 格，精度各是多少？</div>

<div class="split-wide">
<div class="figure">
<VernierCaliperSvg :divisions="20" :reading="21.65" :step="$clicks" />
</div>
<div class="stack">
<div v-click="1">20 分度：游标尺 20 格总长 <Latex tex="19\ \text{mm}" />，每格 <Latex tex="0.95\ \text{mm}" />，精度 <Latex tex="0.05\ \text{mm}" />。</div>
<div v-click="2">50 分度：游标尺 50 格总长 <Latex tex="49\ \text{mm}" />，每格 <Latex tex="0.98\ \text{mm}" />，精度 <Latex tex="0.02\ \text{mm}" />。</div>
<div v-click="3">读数方法完全一样：主尺读数 + 对齐格数 × 精度。三种卡尺都<b>不估读</b>。<br />左图：第 13 条线对齐主尺 <Latex tex="34\ \text{mm}" />，读数 <Latex tex="21.65\ \text{mm}" />。</div>
</div>
</div>
</div>

---
clicks: 2
---

# 螺旋测微器

<div class="page-grow">
<div class="ask">要把精度做到 <Latex tex="0.01\ \text{mm}" />，刻度该怎么设计？</div>

<div class="split-wide">
<div class="figure">
<MicrometerSvg :reading="6.725" />
</div>
<div class="stack">
<div v-click="1">旋钮每转一周，测微螺杆前进或后退一个<b>螺距</b>：<Latex tex="0.5\ \text{mm}" />——<Latex tex="0.5\ \text{mm}" /> 的直线位移被"摊"到了一整圈上。</div>
<div v-click="2">可动刻度把这一圈 50 等分，每转一格螺杆移动 <Latex tex="\dfrac{0.5}{50}\ \text{mm} = 0.01\ \text{mm}" />，所以读数能准确到 <Latex tex="0.01\ \text{mm}" />。</div>
</div>
</div>
</div>

---
clicks: 0
---

<div class="page-grow">
<div class="ask">转动微分筒，套筒上的刻度是怎么一点点露出来的？</div>

<Micrometer3D />
</div>

---
clicks: 4
---

<div class="page-grow">
<div class="ask">这个螺旋测微器的读数是多少？</div>

<div class="split-wide">
<div class="figure">
<MicrometerSvg :reading="6.725" :step="$clicks" />
</div>
<div class="stack-tight">
<div v-click="1">① 固定刻度：露出的整毫米刻度线到 <Latex tex="6\ \text{mm}" />；</div>
<div v-click="2">② 半毫米刻度线也露出来了，再加 <Latex tex="0.5\ \text{mm}" />，固定刻度读数 <Latex tex="6.5\ \text{mm}" />；</div>
<div v-click="3">③ 可动刻度第 <Latex tex="22.5" /> 格与基准线对齐：<Latex tex="22.5 \times 0.01\ \text{mm} = 0.225\ \text{mm}" />（格间要估读一位）；</div>
<div v-click="4">④ <Latex tex="l = 6.5\ \text{mm} + 0.225\ \text{mm} = 6.725\ \text{mm}" />。</div>
</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">这次半毫米刻度线露出来了吗？读数是多少？</div>

<div class="split-wide">
<div class="figure">
<MicrometerSvg :reading="5.48" :step="$clicks" />
</div>
<div class="stack-tight">
<div v-click="1">① 固定刻度只露出到 <Latex tex="5\ \text{mm}" />——<Latex tex="5.5\ \text{mm}" /> 的半毫米线还藏在微分筒里，<b>没有露出来</b>；</div>
<div v-click="2">② 可动刻度第 <Latex tex="48.0" /> 格与基准线对齐：<Latex tex="48.0 \times 0.01\ \text{mm} = 0.480\ \text{mm}" />；</div>
<div v-click="3">③ <Latex tex="l = 5\ \text{mm} + 0.480\ \text{mm} = 5.480\ \text{mm}" />（漏看半毫米线会读成 <Latex tex="5.980\ \text{mm}" />）。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 读数规则

<div class="page-grow">
<div class="stack">
<div v-click="1"><b>游标卡尺</b>：读数 = 主尺读数 + 对齐格数 × 精度；精度由分度数决定（10 分度 <Latex tex="0.1\ \text{mm}" />、20 分度 <Latex tex="0.05\ \text{mm}" />、50 分度 <Latex tex="0.02\ \text{mm}" />），末位就是精度位，<b>不估读</b>；</div>
<div v-click="2"><b>螺旋测微器</b>：读数 = 固定刻度（整毫米 + 半毫米线是否露出 <Latex tex="0.5\ \text{mm}" />）+ 可动刻度格数 × <Latex tex="0.01\ \text{mm}" />，末位要<b>估读一位</b>，读到 <Latex tex="0.001\ \text{mm}" />；</div>
<div v-click="3"><b>使用</b>：卡尺把物体夹在量爪之间即可读数；螺旋测微器快靠近物体时改用微调旋钮，听到"喀喀"声就停下。</div>
</div>

<div v-click="3" class="tip-hint">两种工具最容易错的地方：卡尺忘了"对齐格数 × 精度"，测微器漏看半毫米线。</div>
</div>

---
layout: course-cover
chapter-no: "11.3"
chapter: 第十一章 电路及其应用
lesson: 第二课时
title: 实验：导体电阻率的测量
subtitle: 金属丝电阻率的测量：电路 · 数据 · 误差
---

<CoverDecorationSvg />

---
clicks: 3
---

# 实验思路与器材

<div class="page-grow">
<div class="ask">要把 <Latex tex="\rho = \dfrac{\pi d^2 R}{4l}" /> 测出来，需要哪些器材？</div>

<div v-click="1" class="stack-tight">
<div>电源、开关、滑动变阻器（<Latex tex="20\ \Omega" />）、电流表（<Latex tex="0\sim0.6\ \text{A}" />）、电压表（<Latex tex="0\sim3\ \text{V}" />）、</div>
<div>金属丝（约 <Latex tex="60\ \text{cm}" />）、刻度尺、螺旋测微器、导线若干。</div>
</div>

<div v-click="2" class="stack">
<div><Latex tex="R" />：伏安法——改变滑片位置，读多组 <Latex tex="U" />、<Latex tex="I" />，用 <Latex tex="U-I" /> 图线求；</div>
<div><Latex tex="l" />：刻度尺测<b>接入电路的有效长度</b>；</div>
<div><Latex tex="d" />：螺旋测微器在不同位置测 3 次取平均。</div>
</div>

<div v-click="3" class="tip-hint">金属丝的电阻只有几欧，电流表、电压表都选小量程——量程选大了，指针偏转小、读数的相对误差大。</div>
</div>

---
clicks: 2
---

# 实验电路

<div class="page-grow">
<div class="ask">金属丝的电阻只有几欧：电压表并联在哪里？滑动变阻器怎么接进电路？</div>

<div class="half-grid">
<div>
<ResistivityCircuitDemo :step="$clicks" />
</div>
<div class="stack">
<div v-click="1"><b>电流表外接</b>：电压表直接并联在金属丝两端。金属丝的电阻远小于电压表内阻，电压表分走的那一点点电流可以忽略；接成内接时，电流表的分压带来的误差要大得多。</div>
<div v-click="2"><b>限流接法</b>：变阻器用线圈的一端和滑片接入电路，电流从一端进、从滑片出，滑片移动时接入的线圈长度就变了。闭合开关前，先把阻值调到最大。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 操作与记录

<div class="page-grow">
<div class="stack">
<div v-click="1">① 断开开关，按电路图连接实物；滑动变阻器的滑片先调到<b>阻值最大</b>的一端；</div>
<div v-click="2">② 闭合开关，逐次移动滑片，读取 <Latex tex="6\sim8" /> 组 <Latex tex="U" />、<Latex tex="I" />（电流由小到大），每次同时读两个表；要改接线，先断开开关；</div>
<div v-click="2">③ 断开开关，用刻度尺测接入电路的有效长度 <Latex tex="l" />，反复测 3 次取平均；</div>
<div v-click="2">④ 用螺旋测微器在金属丝的不同位置测直径 <Latex tex="d" /> 3 次，取平均。</div>
</div>

<div v-click="3" class="warn-hint">通电时间不要太长、电流不要太大：金属丝发热后，金属的电阻率随温度升高而增大，测出的 <Latex tex="\rho" /> 会偏大。</div>
</div>

---
clicks: 2
---

# 有效长度的测量

<div class="page-grow">
<div class="ask">测的是整段电阻丝的总长度吗？</div>

<div v-click="1" class="stack">
<div>不是。电流只在<b>接入电路的那一段</b>上流过，所以要量的是两个接线柱之间的<b>有效长度</b> <Latex tex="l" />。</div>
<div>换几个位置反复测量，取平均值。</div>
</div>

<div v-click="2" class="tip-hint"><Latex tex="l" /> 在 <Latex tex="\rho = \dfrac{\pi d^2 R}{4l}" /> 的分母上：量长了，算出的 <Latex tex="\rho" /> 偏小；量短了，偏大。</div>
</div>

---
clicks: 3
---

# 直径的测量

<div class="page-grow">
<div class="ask">电阻丝这么细，怎样减小直径测量的误差？</div>

<div v-click="1" class="stack">
<div><b>方法一</b>：在电阻丝的不同位置，用螺旋测微器测 3 次，取平均值；</div>
<div v-click="2"><b>方法二（累积法）</b>：把电阻丝在圆柱形物体上紧密缠绕 <Latex tex="n" /> 圈，测出总宽度 <Latex tex="w" />，则 <Latex tex="d = \dfrac{w}{n}" />——把 <Latex tex="n" /> 段的测量误差摊到一段上。</div>
</div>

<div v-click="3" class="tip-hint"><Latex tex="d" /> 在公式里是平方，相对误差翻倍：<Latex tex="\dfrac{\Delta \rho}{\rho} = 2\dfrac{\Delta d}{d} + \dfrac{\Delta l}{l} + \dfrac{\Delta R}{R}" />。直径的测量是本实验最主要的误差来源。</div>
</div>

---
clicks: 3
---

# 数据处理：图线的斜率

<div class="page-grow">
<div class="ask">多组 <Latex tex="U" />、<Latex tex="I" /> 怎么处理成电阻 <Latex tex="R" />？</div>

<div class="half-grid">
<div>
<ResistivityChart :step="$clicks" />
</div>
<div class="stack">
<div v-click="1">以 <Latex tex="I" /> 为横轴、<Latex tex="U" /> 为纵轴描点：每组读数都有误差，点不会严格落在一条直线上。</div>
<div v-click="2">过原点作一条直线，让点均衡分布在直线两侧——这条直线的<b>斜率</b>就是金属丝的电阻 <Latex tex="R" />。</div>
<div v-click="3" class="tip-hint">图像法把全部数据都用上了，个别读数的偶然误差在拟合中被平均掉。</div>
</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">三个测量值都到手了，电阻率怎么算？</div>

<div class="stack-tight">
<div>已测得：<Latex tex="d = 0.635\ \text{mm}" />（螺旋测微器）、<Latex tex="l = 0.600\ \text{m}" />（刻度尺）、<Latex tex="R" /> 由 <Latex tex="U-I" /> 图线求得。</div>
</div>

<DataProcessing :step="$clicks" />

<div v-click="3" class="tip-hint">把算出的 <Latex tex="\rho" /> 与手册中该材料的电阻率比一比：数量级相符，测量就可信；差出好几个数量级，先检查直径是不是用了 <Latex tex="\text{mm}" /> 而长度用了 <Latex tex="\text{m}" />。</div>
</div>

---
clicks: 3
---

# 误差分析

<div class="page-grow">
<div class="ask">测出的 <Latex tex="\rho" /> 与手册值相比，可能偏大也可能偏小——各是什么原因？</div>

<div class="stack">
<div v-click="1"><b>偏小</b>：电流表外接，电压表分走了一小部分电流，电流表的读数比流过金属丝的电流大，算出的 <Latex tex="R = \dfrac{U}{I}" /> 偏小，<Latex tex="\rho" /> 随之偏小（金属丝只有几欧，这一项很小）；</div>
<div v-click="2"><b>偏大</b>：通电时间过长，金属丝发热——金属的电阻率随温度升高而增大；</div>
<div v-click="3"><b>读数误差</b>：直径 <Latex tex="d" /> 的测量误差在 <Latex tex="\rho = \dfrac{\pi d^2 R}{4l}" /> 里翻倍，是主要的误差来源。</div>
</div>
</div>

---
layout: exercise-split
hideQaMark: true
clicks: 2
---

<template v-slot:stem>

用螺旋测微器测得金属丝的直径 <Latex tex="d = 0.500\ \text{mm}" />，用刻度尺测得接入电路的有效长度 <Latex tex="l = 80.0\ \text{cm}" />；改变滑片位置测得多组 <Latex tex="U" />、<Latex tex="I" />，作出的 <Latex tex="U-I" /> 图线斜率为 <Latex tex="2.0\ \Omega" />。求这种金属丝的电阻率。

</template>

由 <Latex tex="R = \dfrac{U}{I}" /> 知，图线的斜率就是电阻：<Latex tex="R = 2.0\ \Omega" />。

<div v-click="1">
横截面积 <Latex tex="S = \dfrac{\pi d^2}{4} \approx 1.96 \times 10^{-7}\ \text{m}^2" />（<Latex tex="\text{mm}" /> 已换成 <Latex tex="\text{m}" />）
</div>

<div v-click="2">
<Latex tex="\rho = \dfrac{SR}{l} = \dfrac{1.96 \times 10^{-7} \times 2.0}{0.800}\ \Omega\cdot\text{m} \approx 4.9 \times 10^{-7}\ \Omega\cdot\text{m}" display />
</div>

---
clicks: 3
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div v-click="1"><b>测量链条</b>：<Latex tex="\rho = \dfrac{\pi d^2 R}{4l}" />——<Latex tex="R" /> 由 <Latex tex="U-I" /> 图线的斜率求得，<Latex tex="l" /> 用刻度尺量接入电路的有效长度，<Latex tex="d" /> 用螺旋测微器在不同位置测 3 次取平均；</div>
<div v-click="2"><b>游标卡尺</b>：主尺读数 + 对齐格数 × 精度（<Latex tex="0.1\ \text{mm}" /> / <Latex tex="0.05\ \text{mm}" /> / <Latex tex="0.02\ \text{mm}" />），不估读；</div>
<div v-click="3"><b>螺旋测微器</b>：固定刻度（看半毫米线是否露出）+ 可动刻度格数 × <Latex tex="0.01\ \text{mm}" />，估读到 <Latex tex="0.001\ \text{mm}" />；<Latex tex="d" /> 的误差在结果里翻倍。</div>
</div>
</div>

---
layout: base-flex
---

# 课后作业

<div class="page-grow">

<div class="mini-title"><mdi-book-open-variant class="text-3xl" /> 教材 11.3 练习与应用</div>

<div><strong>第 1 题</strong>：读出图 11.3-11 游标卡尺与图 11.3-12 螺旋测微器的读数。</div>

<div><strong>第 2 题</strong>：不合格纯净水的电导率是偏大还是偏小？并把测量水样电阻的电路连接完整（注意电表量程）。</div>

<div><strong>第 3 题</strong>：由 <Latex tex="d = 0.635\ \text{mm}" />、<Latex tex="l = 60\ \text{cm}" /> 和图 11.3-14 的电表示数，计算该金属丝的电阻率。</div>

</div>
