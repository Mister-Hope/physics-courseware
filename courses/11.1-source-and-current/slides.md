---
theme: default
title: "电源和电流"
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
chapter-no: "11.1"
chapter: "第十一章 电路及其应用"
subtitle: "电源 · 恒定电流 · 电流的微观解释"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 引课
---

<div class="page-grow">

<div class="ask ask-lead text-5xl leading-normal">电闪雷鸣时，强大的电流只能存在于一瞬间；手电筒中的小灯泡却能持续发光。这是为什么？</div>

</div>

---
layout: base-flex
title: 电源
clicks: 3
---

<div class="page-grow">

<div class="ask">A、B 两个导体分别带正、负电荷，用导线 H 把它们连接起来。H 中的电流能一直流下去吗？</div>

<div class="half-grid">

<div v-click="1"><WireOnlySvg :step="$clicks" /></div>

<div class="stack">

<div v-click="2">导线 H 中的自由电子在静电力的作用下由 B 向 A 定向运动：B 失去电子、A 得到电子，A、B 之间的电势差很快消失。</div>

<div v-click="2">电势差消失后，导线中的电场也消失，自由电子不再定向移动。</div>

</div>

</div>

<div v-click="3" class="tip-hint">两导体成为一个等势体，达到静电平衡——这种情况下，导线 H 中的电流只是瞬间的。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 电源

<div class="page-grow">

<div class="ask">怎样才能使导线 H 中存在持续的电流？</div>

<div class="half-grid">

<div v-click="1"><SourceLoopSvg :step="$clicks" /></div>

<div class="stack">

<div v-click="2">在 A、B 之间接入一个装置 <Latex tex="P" />：在 B 失去电子的过程中，它不断地从 A 取走电子、补充给 B，使 A、B 始终带有一定数量的正、负电荷，两者之间始终存在电势差。</div>

</div>

</div>

<div v-click="3">
<DefinitionBox term="电源">

<div>能把电子从 A 搬运到 B 的装置 <Latex tex="P" /> 就是电源（power source），A 和 B 是电源的两个电极。</div>
<div>电源的作用：移送电荷，维持电源正、负极间有一定的电势差。</div>

</DefinitionBox>
</div>

</div>

---
layout: base-flex
clicks: 2
---

# 恒定电场

<div class="page-grow">

<div class="ask">电源、导线上的电荷也在运动，电路中的电场会不会随时间变化？</div>

<div v-click="1">A、B 周围空间的电场，是由电源、导线等电路元件所积累的电荷共同形成的。这些电荷有的流走了，另外的又来补充——电荷的分布是稳定的，不随时间变化。</div>

<div v-click="2">
<DefinitionBox term="恒定电场">

<div>由稳定分布的电荷所产生的稳定的电场，叫作恒定电场（steady electric field）。</div>

</DefinitionBox>
</div>

</div>

---
layout: base-flex
clicks: 2
---

# 恒定电流

<div class="page-grow">

<div class="ask">在这个电路中串联一个电流表，电流表的示数会怎样变化？</div>

<div class="half-grid">

<div v-click="1"><SteadyLoopSvg /></div>

<div class="stack">

<div v-click="1">电流表的示数保持恒定。自由电荷在恒定电场的作用下定向运动，运动中与导体内不动的粒子不断碰撞——碰撞阻碍了定向运动，结果是大量自由电荷定向运动的平均速率不随时间变化。</div>

</div>

</div>

<div v-click="2">
<DefinitionBox term="恒定电流">

<div>大小、方向都不随时间变化的电流，叫作恒定电流（steady current）。</div>

</DefinitionBox>
</div>

</div>

---
layout: base-flex
clicks: 2
---

# 电流

<div class="page-grow">

<div class="ask">电流的强弱程度用什么表示？</div>

<div class="half-grid">

<div v-click="1"><CrossSectionSvg /></div>

<div class="stack">

<div v-click="1">单位时间内通过导体横截面的电荷量越多，电流就越大。</div>

</div>

</div>

<div v-click="2">
<DefinitionBox term="电流">

<div>用 <Latex tex="I" /> 表示电流、<Latex tex="q" /> 表示在时间 <Latex tex="t" /> 内通过导体横截面的电荷量，则</div>
<div class="text-center text-2xl leading-normal"><Latex tex="I = \dfrac{q}{t}" /></div>
<div>单位是安培（ampere），符号 <Latex tex="\text{A}" />：<Latex tex="1\ \text{C} = 1\ \text{A} \cdot \text{s}" />，<Latex tex="1\ \text{mA} = 10^{-3}\ \text{A}" />，<Latex tex="1\ \mu\text{A} = 10^{-6}\ \text{A}" />。</div>
<div>习惯上规定正电荷定向移动的方向为电流的方向。</div>

</DefinitionBox>
</div>

</div>

---
layout: base-flex
clicks: 2
---

# 电流的计算

<div class="page-grow">

<div class="ask">知道了电流 <Latex tex="I" /> 与通电时间 <Latex tex="t" />，通过横截面的电荷量、电子数各是多少？</div>

<div v-click="1"><CurrentCalc /></div>

<div v-click="2" class="tip-hint">由 <Latex tex="I = \dfrac{q}{t}" /> 得 <Latex tex="q = It" />；通过横截面的电子数 <Latex tex="N = \dfrac{q}{e}" />，其中 <Latex tex="e = 1.6 \times 10^{-19}\ \text{C}" />。</div>

</div>

---
layout: base-flex
title: 电流的微观解释
clicks: 3
---

<div class="page-grow">

<div class="ask">自由电子沿各个方向做无规则热运动，为什么平时导体中没有电流？</div>

<div class="half-grid">

<div v-click="1"><DriftSvg :step="$clicks" /></div>

<div class="stack">

<div v-click="2">自由电子朝任何方向运动的机会都一样，从宏观上看没有电荷的定向移动，因而也没有电流。</div>

<div v-click="3">导体两端有电势差时，导体内部就建立了电场：自由电子在热运动之外，还要在静电力的作用下定向移动，从而形成电流。</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 3
---

# 电流的微观解释

<div class="page-grow">

<div class="ask">电流 <Latex tex="I" /> 与自由电子定向移动的平均速率 <Latex tex="v" /> 有什么关系？</div>

<div class="half-grid">

<div v-click="1"><MicroDeriveSvg :step="$clicks" /></div>

<div class="stack">

<div v-click="1">设导体的横截面积为 <Latex tex="S" />，自由电子数密度（单位体积内的自由电子数）为 <Latex tex="n" />，自由电子定向移动的平均速率为 <Latex tex="v" />。</div>

<div v-click="2">时间 <Latex tex="t" /> 内，横截面左侧长 <Latex tex="vt" /> 的柱体内共有 <Latex tex="nSvt" /> 个自由电子，它们全部通过横截面，通过横截面的电荷量 <Latex tex="q = neSvt" />。</div>

</div>

</div>

<div v-click="3" class="tip-hint">把 <Latex tex="q = neSvt" /> 代入 <Latex tex="I = \dfrac{q}{t}" />，得 <Latex tex="I = neSv" />。</div>

</div>

---
layout: base-flex
title: 定向移动的速率
clicks: 2
---

<div class="page-grow">

<div class="ask">电流 <Latex tex="1\ \text{A}" />、横截面积 <Latex tex="1\ \text{mm}^2" /> 的铜导线中，自由电子定向移动的平均速率有多大？</div>

<div v-click="1"><DriftCalc /></div>

<div v-click="2" class="tip-hint">电流越大、导线越细，<Latex tex="v" /> 越大：本页范围内约 <Latex tex="2 \times 10^{-6} \sim 3 \times 10^{-4}\ \text{m/s}" />，其中 <Latex tex="1\ \text{A}" />、<Latex tex="1\ \text{mm}^2" /> 时约 <Latex tex="7.35 \times 10^{-5}\ \text{m/s}" />。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 定向移动的速率

<div class="page-grow">

<div class="ask">定向移动的平均速率只有 <Latex tex="10^{-4}\ \text{m/s}" /> 量级，为什么一闭合开关，灯立刻就亮？</div>

<div class="three-col">

<div v-click="1" class="stack">

<div class="mini-title">无规则热运动</div>

<div class="text-xl leading-normal"><Latex tex="\approx 10^{5}\ \text{m/s}" /></div>

<div>由温度决定，各方向机会均等，不形成电流。</div>

</div>

<div v-click="1" class="stack">

<div class="mini-title">定向移动的平均速率</div>

<div class="text-xl leading-normal"><Latex tex="\approx 10^{-4}\ \text{m/s}" /></div>

<div>由 <Latex tex="I" />、<Latex tex="n" />、<Latex tex="S" /> 共同决定。</div>

</div>

<div v-click="2" class="stack">

<div class="mini-title">电场建立与传播的速率</div>

<div class="text-xl leading-normal"><Latex tex="\approx 3 \times 10^{8}\ \text{m/s}" /></div>

<div>闭合开关的瞬间，电路各处几乎同时建立电场。</div>

</div>

</div>

<div v-click="3" class="tip-hint">闭合开关的瞬间，电路中各个位置以光速迅速建立电场。随着电场的建立，电路中各处的自由电子几乎同时开始做定向移动，整个电路也就几乎同时形成了电流。</div>

</div>

---
layout: exercise-split
hideQaMark: true
clicks: 3
---

<template v-slot:stem>

一条导线中的电流为 $50\ \mu\text{A}$，在 $3.2\ \text{s}$ 内通过这条导线某一横截面的电荷量是多少库仑？有多少个电子通过该横截面？

</template>

<div v-click="1">由 <Latex tex="I = \dfrac{q}{t}" /> 得 <Latex tex="q = It = 50 \times 10^{-6} \times 3.2\ \text{C} = 1.6 \times 10^{-4}\ \text{C}" />。</div>

<div v-click="2">电子电荷量 <Latex tex="e = 1.6 \times 10^{-19}\ \text{C}" />，通过横截面的电子数 <Latex tex="N = \dfrac{q}{e} = \dfrac{1.6 \times 10^{-4}}{1.6 \times 10^{-19}} = 1.0 \times 10^{15}" />。</div>

<div v-click="3" class="tip-hint">通过横截面的电荷量为 <Latex tex="1.6 \times 10^{-4}\ \text{C}" />，约有 <Latex tex="1.0 \times 10^{15}" /> 个电子。</div>

---
layout: exercise-split
hideQaMark: true
clicks: 3
---

<template v-slot:stem>

某手机的说明书标明该手机电池容量为 $4\ 000\ \text{mA} \cdot \text{h}$，待机时间为 $22\ \text{d}$，请估算该手机的待机电流有多大。说明书还标明，用该手机播放视频的时间是 $17\ \text{h}$，请估算播放视频的电流大约是待机电流的几倍。

</template>

<div v-click="1">电池容量是电荷量：<Latex tex="q = 4\ 000\ \text{mA} \cdot \text{h} = 4\ \text{A} \cdot \text{h}" />。待机：<Latex tex="t_1 = 22\ \text{d} = 528\ \text{h}" />，<Latex tex="I_1 = \dfrac{q}{t_1} = \dfrac{4\ 000\ \text{mA} \cdot \text{h}}{528\ \text{h}} \approx 7.6\ \text{mA}" />。</div>

<div v-click="2">播放视频：<Latex tex="I_2 = \dfrac{q}{t_2} = \dfrac{4\ 000\ \text{mA} \cdot \text{h}}{17\ \text{h}} \approx 235\ \text{mA}" />。</div>

<div v-click="3" class="tip-hint">待机电流约为 <Latex tex="7.6\ \text{mA}" />，播放视频的电流约是待机电流的 <Latex tex="31" /> 倍。</div>

---
layout: base-flex
clicks: 2
---

# 电动汽车中的电池

<div class="page-grow">

<div class="ask">电动汽车充电、放电时，电池里的锂离子分别怎样运动？</div>

<div class="half-grid">

<div v-click="1" class="stack">

<div class="mini-title"><mdi-battery-charging-high class="text-3xl" /> 充电时</div>

<div>锂离子通过电解液运动到负极，嵌入碳材料微孔中。</div>

</div>

<div v-click="2" class="stack divider-l">

<div class="mini-title"><mdi-battery-high class="text-3xl" /> 放电时</div>

<div>锂离子返回正极释放电荷，为汽车提供电能。</div>

</div>

</div>

</div>

---
layout: base-flex
title: 课堂小结
clicks: 6
---

# 课堂小结

<div class="page-grow summary-compact">

<div class="summary-line" v-click="1"><span class="text-accent font-bold">电源</span>：移送电荷，维持电源正、负极间有一定的电势差——电路中的电流才能持续存在</div>

<div class="summary-line" v-click="2"><span class="text-accent font-bold">恒定电场</span>：电荷的分布稳定、不随时间变化，电场也就不随时间变化</div>

<div class="summary-line" v-click="3"><span class="text-accent font-bold">恒定电流</span>：大小、方向都不随时间变化的电流</div>

<div class="summary-line" v-click="4"><span class="text-accent font-bold">电流</span>：<Latex tex="I = \dfrac{q}{t}" />，单位 <Latex tex="\text{A}" />（<Latex tex="1\ \text{mA} = 10^{-3}\ \text{A}" />）；正电荷定向移动的方向规定为电流的方向</div>

<div class="summary-line" v-click="5"><span class="text-accent font-bold">微观表达式</span>：<Latex tex="I = neSv" />，其中 <Latex tex="n" /> 是自由电子数密度、<Latex tex="S" /> 是横截面积、<Latex tex="v" /> 是定向移动的平均速率</div>

<div class="summary-line" v-click="6"><span class="text-accent font-bold">场的建立</span>：闭合开关的瞬间，电路中各处以光速建立电场，自由电子几乎同时开始定向移动</div>

</div>

---
layout: base-flex
title: 课后作业
---

# 课后作业

<div class="page-grow">

<div class="stack">

<div class="mini-title"><mdi-book-open-variant class="text-3xl" /> 必做：教材 11.1 练习与应用</div>

<div><strong>第 1 题</strong>：电流 <Latex tex="50\ \mu\text{A}" />，<Latex tex="3.2\ \text{s}" /> 内通过横截面的电荷量与电子数。</div>

<div><strong>第 2 题</strong>：干电池在 <Latex tex="10\ \text{s}" /> 内通过横截面的电荷量为 <Latex tex="3\ \text{C}" />，求电流。</div>

<div><strong>第 3 题</strong>：由电池容量 <Latex tex="4\ 000\ \text{mA} \cdot \text{h}" /> 估算待机电流与播放视频电流的倍数。</div>

</div>

<div class="stack">

<div class="mini-title"><mdi-lightbulb-on class="text-3xl" /> 选做：复习与提高 B 组第 1 题</div>

<div>一根均匀带电的长直橡胶棒沿轴线方向以速度 <Latex tex="v" /> 做匀速直线运动，棒横截面积为 <Latex tex="S" />，单位长度所带的电荷量为 <Latex tex="-q" />。求棒的运动形成的等效电流的大小和方向。</div>

</div>

</div>
