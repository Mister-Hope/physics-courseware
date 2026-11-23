---
theme: default
title: "实验：用双缝干涉测量光的波长"
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
chapter: "第四章 光"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 用双缝干涉测波长
clicks: 1
---

<div class="page-grow">
<div class="ask-lead">上一节得到：<Latex tex="\Delta x = \dfrac{l}{d}\lambda" />。</div>
<div class="ask-lead">反过来，测出 <Latex tex="\Delta x" />、<Latex tex="l" />，用已知的 <Latex tex="d" />，就能求出光的波长。</div>
<div class="ask">光的波长只有几百纳米，怎样才能测准？</div>
<div v-click="1" class="info-hint">这一节我们动手做实验：用双缝干涉测出光的波长。</div>
</div>

---
clicks: 2
---

# 实验思路

<div class="page-grow">
<div class="ask">上一节的关系式，能不能反过来用？</div>
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">①</span><span>双缝干涉相邻亮条纹的间距：<Latex tex="\Delta x = \dfrac{l}{d}\lambda" /></span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">②</span><span>反解出波长：<Latex tex="\lambda = \dfrac{d}{l}\Delta x" /></span></div>
</div>
<div v-click="2" class="tip-hint"><Latex tex="d" /> 已知，只要测出 <Latex tex="l" /> 和 <Latex tex="\Delta x" />，就能算出波长。</div>
</div>

---
clicks: 3
---

# 装置与光路

<div class="page-grow">
<div class="figure ds-fig-setup"><DoubleSlitSetupSvg :step="$clicks" /></div>
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">1</span><span>滤光片让光成为单色光，照亮单缝；单缝相当于一个线光源，再把双缝照亮。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">2</span><span>来自双缝的两列光在右边空间发生干涉，遮光筒端的毛玻璃屏上出现干涉条纹。</span></div>
<div class="ds-step" v-click="3"><span class="ds-step-no">3</span><span>透镜使射向单缝的光更集中。</span></div>
</div>
</div>

---
clicks: 2
---

# 测量头

<div class="page-grow">
<div class="figure ds-fig-head"><MeasuringHeadSvg :step="$clicks" /></div>
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">1</span><span>转动手轮，分划板左右移动。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">2</span><span>使分划板中心刻线与亮条纹中心对齐，记下手轮读数；移到另一条亮纹再读一次，两次读数之差就是 <Latex tex="\Delta x" />。</span></div>
</div>
</div>

---
clicks: 1
---

# 双缝到屏的距离

<div class="page-grow">
<div class="figure ds-fig-l"><LMeasureSvg /></div>
<div class="ask">双缝到毛玻璃屏的距离 <Latex tex="l" /> 怎么测？</div>
<div class="ds-lead" v-click="1">用刻度尺直接量出双缝到屏的距离。</div>
<div class="tip-hint" v-click="1">量的是双缝到屏的距离 <Latex tex="l" />，不是遮光筒的长度。</div>
</div>

---
clicks: 3
---

# 相邻亮条纹的间距

<div class="page-grow">
<div class="ask">条纹很密，单条间距怎么测才准？</div>
<div class="figure ds-fig-reading"><FringeReadingSvg :step="$clicks" /></div>
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">①</span><span>把分划板中心刻线对准第 1 条亮纹，记下读数。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">②</span><span>再对准第 <Latex tex="n" /> 条亮纹，记下读数，两次读数之差为 <Latex tex="a" />。</span></div>
<div class="ds-step" v-click="3"><span class="ds-step-no">③</span><span><Latex tex="\Delta x = \dfrac{a}{n - 1}" /></span></div>
</div>
</div>

---
clicks: 2
---

# 为什么要测几条条纹

<div class="page-grow">
<div class="ask">只测相邻两条，误差有多大？</div>
<div class="ds-compare">
<div class="ds-compare-row" v-click="1"><span class="ds-compare-tag">单条间距</span><span><Latex tex="\Delta x \approx 2.18\ \text{mm}" />，对准误差约 <Latex tex="0.01\ \text{mm}" /> → 约 <Latex tex="0.5\%" /></span><span class="ds-key">误差大</span></div>
<div class="ds-compare-row" v-click="2"><span class="ds-compare-tag">6 条间距</span><span><Latex tex="a \approx 10.90\ \text{mm}" />，同样的对准误差 → 约 <Latex tex="0.1\%" /></span><span class="ds-key">误差小</span></div>
</div>
<div class="tip-hint" v-click="2">测 <Latex tex="n" /> 条亮纹的总间距 <Latex tex="a" />，再用 <Latex tex="\Delta x = a/(n-1)" />，误差被分摊到每个间隔上。</div>
</div>

---
clicks: 4
---

# 进行实验

<div class="page-grow">
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">1</span><span>取下双缝，打开光源，调节光源的高度和角度，使光束沿遮光筒的轴线把屏照亮。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">2</span><span>放好单缝和双缝：两者相互平行，缝的中点尽量在遮光筒的轴线上。</span></div>
<div class="ds-step" v-click="3"><span class="ds-step-no">3</span><span>在单缝与光源之间放上滤光片，屏上出现单色光的双缝干涉图样。</span></div>
<div class="ds-step" v-click="4"><span class="ds-step-no">4</span><span>测出 <Latex tex="l" /> 和 <Latex tex="\Delta x" />；换滤光片、改变双缝间距，观察条纹的变化并求相应的波长。</span></div>
</div>
</div>

---
clicks: 2
---

# 注意事项

<div class="page-grow">
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">1</span><span>单缝与双缝要平行、共轴，否则条纹模糊，甚至看不到。</span></div>
<div class="ds-step" v-click="1"><span class="ds-step-no">2</span><span>不要直视光源；滤光片装在单缝前面。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">3</span><span>测 <Latex tex="l" /> 时从双缝量到屏；读手轮时刻度要与视线垂直。</span></div>
</div>
</div>

---
clicks: 3
---

# 某次实验的数据

<div class="page-grow">
<div class="ask">已知 <Latex tex="d = 0.30\ \text{mm}" />、<Latex tex="l = 1.20\ \text{m}" />、<Latex tex="n = 6" />，怎样算出波长？</div>
<FringeDataTable :step="$clicks" />
<div class="tip-hint" v-click="3">三次结果很接近，取平均值：<Latex tex="\lambda \approx 5.5 \times 10^{-7}\ \text{m}" />，属于绿光。</div>
</div>

---
clicks: 1
---

# 算一算：反求波长

<div class="page-grow">
<div class="ask">测出 6 条亮纹的间距 <Latex tex="a" />，波长是多少？</div>
<WavelengthExplorer />
<div class="tip-hint" v-click="1"><Latex tex="a" /> 变大时条纹变宽、波长变长；<Latex tex="a = 10.90\ \text{mm}" /> 时 <Latex tex="\lambda \approx 545\ \text{nm}" />，是绿光。</div>
</div>

---
clicks: 2
---

# 换滤光片、改双缝

<div class="page-grow">
<div class="ask">同一装置，条纹间距为什么会变？</div>
<div class="ds-compare">
<div class="ds-compare-row" v-click="1"><span class="ds-compare-tag">绿光 545 nm</span><span><Latex tex="\Delta x = 2.18\ \text{mm}" /></span><span class="ds-key">基准</span></div>
<div class="ds-compare-row" v-click="1"><span class="ds-compare-tag">红光 650 nm</span><span><Latex tex="\Delta x = 2.60\ \text{mm}" /></span><span class="ds-key">变宽</span></div>
<div class="ds-compare-row" v-click="2"><span class="ds-compare-tag"><Latex tex="d = 0.20\ \text{mm}" /></span><span><Latex tex="\Delta x = 3.27\ \text{mm}" /></span><span class="ds-key">变宽</span></div>
</div>
<div class="info-hint" v-click="2"><Latex tex="\Delta x \propto \lambda" />，<Latex tex="\Delta x \propto \dfrac{1}{d}" />：波长越长、缝距越小，条纹越宽。</div>
</div>

---
clicks: 3
---

# 误差从哪里来

<div class="page-grow">
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">①</span><span>对准误差：分划板刻线与人眼判断亮纹中心，本节约 <Latex tex="0.01\ \text{mm}" />。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">②</span><span>长度测量：<Latex tex="l" /> 用刻度尺，误差在毫米量级；<Latex tex="d" /> 由双缝规格给出，也有制造误差。</span></div>
<div class="ds-step" v-click="3"><span class="ds-step-no">③</span><span>环境：振动、温度变化会让条纹轻微移动。</span></div>
</div>
<div class="tip-hint" v-click="3">多测几条条纹、多次测量取平均，可以减小偶然误差。</div>
</div>

---
clicks: 2
title: 例题：测某种单色光的波长
---

# 测某种单色光的波长

<div class="page-grow">
<div class="problem">某次实验：<Latex tex="d = 0.30\ \text{mm}" />，<Latex tex="l = 1.20\ \text{m}" />。第 1 条亮纹读数 <Latex tex="x_1 = 12.60\ \text{mm}" />，第 6 条亮纹读数 <Latex tex="x_2 = 23.50\ \text{mm}" />。求这种光的波长。</div>
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">①</span><span><Latex tex="a = x_2 - x_1 = 10.90\ \text{mm}" />，<Latex tex="\Delta x = \dfrac{a}{5} = 2.180\ \text{mm}" /></span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">②</span><span><Latex tex="\lambda = \dfrac{d}{l}\Delta x = \dfrac{0.30 \times 10^{-3} \times 2.180 \times 10^{-3}}{1.20}\ \text{m} \approx 5.45 \times 10^{-7}\ \text{m}" /></span></div>
</div>
<div class="tip-hint" v-click="2">约 545 nm，与绿光的波长相符。</div>
</div>

---
clicks: 3
title: 例题：条件改变，条纹怎样变
---

# 条件改变，条纹怎样变

<div class="page-grow">
<div class="problem">双缝间距 <Latex tex="d = 0.20\ \text{mm}" />，用绿色滤光片，屏上看到绿色干涉条纹。</div>
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">(1)</span><span>屏远离双缝：<Latex tex="l" /> 变大，由 <Latex tex="\Delta x = \dfrac{l}{d}\lambda" /> 知条纹变宽。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">(2)</span><span>换红色滤光片，条纹间距增大：<Latex tex="\Delta x \propto \lambda" />，红光的波长较长。</span></div>
<div class="ds-step" v-click="3"><span class="ds-step-no">(3)</span><span>改用 <Latex tex="d = 0.30\ \text{mm}" /> 的双缝：<Latex tex="d" /> 变大，<Latex tex="\Delta x" /> 变小，条纹变密。</span></div>
</div>
</div>

---
clicks: 2
title: 为什么不直接测 Δx
layout: base-flex
---

<div class="page-grow">
<div class="ask">为什么不直接测相邻两条亮纹的间距 <Latex tex="\Delta x" />？</div>
<div class="ds-lead" v-click="1">条纹很密，<Latex tex="\Delta x" /> 只有 2 mm 左右；两条刻线各要对准一次，每次都有误差。</div>
<div class="ds-lead" v-click="2">测 <Latex tex="n" /> 条条纹的总间距 <Latex tex="a" />，误差只出现在首尾两次对准上；再除以 <Latex tex="n - 1" />，单个间隔的误差就被摊小了。</div>
</div>

---
clicks: 3
---

# 小结

<div class="page-grow">
<div class="ds-steps">
<div class="ds-step" v-click="1"><span class="ds-step-no">1</span><span>原理：<Latex tex="\lambda = \dfrac{d}{l}\Delta x" />。</span></div>
<div class="ds-step" v-click="2"><span class="ds-step-no">2</span><span>要测：<Latex tex="l" />（刻度尺）、<Latex tex="a" />（测量头），再算 <Latex tex="\Delta x = a/(n-1)" />；<Latex tex="d" /> 已知。</span></div>
<div class="ds-step" v-click="3"><span class="ds-step-no">3</span><span>关键：单缝双缝平行共轴、刻线对准亮纹中心；多测几条、多次测量取平均。</span></div>
<div class="ds-step" v-click="3"><span class="ds-step-no">4</span><span>本实验测得的光波长约 <Latex tex="5.5 \times 10^{-7}\ \text{m}" />。</span></div>
</div>
</div>
