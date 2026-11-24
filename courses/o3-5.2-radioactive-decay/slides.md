---
theme: default
title: "放射性元素的衰变"
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
chapter-no: "5.2"
chapter: "第五章 原子核"
subtitle: "原子核为什么会变，变多快"
---

<CoverDecorationSvg />

---
layout: focus-question
title: 一种元素能变成另一种元素吗
clicks: 2
---

<template v-slot:icon>
<mdi-atom class="icon-2xl" />
</template>
炼金术士想把普通矿石变成黄金，没有成功。那么，一种元素能变成另一种元素吗？
<template v-slot:hint>
天然放射现象中，原子核会自发地放出某种粒子。
</template>
<template v-slot:answer>
放出 <Latex tex="\alpha" /> 粒子或 <Latex tex="\beta" /> 粒子后，原子核的电荷数改变，变成另一种原子核——这种变化叫<b>衰变</b>。
</template>

---
title: α 衰变
clicks: 3
---

# $\alpha$ 衰变

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<DecayEquationFigure mode="alpha" :show-result="$clicks >= 1" />
</div>
<div class="stack">
<div class="ask">铀 238 放出一个 <Latex tex="\alpha" /> 粒子后，变成了什么？</div>
<div class="formula-center" v-click="1"><Latex tex="{}_{92}^{238}\text{U} \rightarrow {}_{90}^{234}\text{Th} + {}_{2}^{4}\text{He}" display /></div>
<div class="step-line" v-click="2">质量数减少 4，电荷数减少 2。</div>
<div class="step-line" v-click="3">新核是钍 234，在周期表中位于铀的前两位。</div>
</div>
</div>
</div>

---
title: β 衰变
clicks: 3
---

# $\beta$ 衰变

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<DecayEquationFigure mode="beta" :show-result="$clicks >= 1" />
</div>
<div class="stack">
<div class="ask">钍 234 放出一个 <Latex tex="\beta" /> 粒子后，质量数和电荷数如何变化？</div>
<div class="formula-center" v-click="1"><Latex tex="{}_{90}^{234}\text{Th} \rightarrow {}_{91}^{234}\text{Pa} + {}_{-1}^{\phantom{-}0}\text{e}" display /></div>
<div class="step-line" v-click="2"><Latex tex="\beta" /> 粒子是电子，质量数为 0、电荷数为 <Latex tex="-1" />。</div>
<div class="step-line" v-click="3">质量数不变，电荷数加 1，新核在周期表中后移一位。</div>
</div>
</div>
</div>

---
layout: base-flex
class: title-ask
title: β 粒子从哪里来
clicks: 3
---

# $\beta$ 粒子从哪里来

<div class="page-grow page-around">
<div class="ask ask-lead">原子核里没有电子，<Latex tex="\beta" /> 粒子是从哪里来的？</div>
<div class="formula-center" v-click="1"><Latex tex="{}_{0}^{1}\text{n} \rightarrow {}_{1}^{1}\text{H} + {}_{-1}^{\phantom{-}0}\text{e}" display /></div>
<div class="stack" v-click="2">
<div class="step-line">核内的中子转化成质子，同时放出一个电子。</div>
<div class="step-line">电子发射到核外，就是 <Latex tex="\beta" /> 粒子；质子留在核内，电荷数加 1。</div>
</div>
<div class="step-line" v-click="3"><Latex tex="\alpha" /> 衰变的实质：核中的两个中子和两个质子结合成一个 <Latex tex="\alpha" /> 粒子放出。</div>
</div>

---
title: 两种衰变的对比
clicks: 2
---

# 两种衰变的对比

<div class="page-grow page-around">
<div class="ask">两种衰变的质量数、电荷数变化，共同依据是什么？</div>
<table class="data-table">
<thead>
<tr><th>衰变</th><th>放出的粒子</th><th>质量数</th><th>电荷数</th><th>周期表位置</th></tr>
</thead>
<tbody>
<tr><td><Latex tex="\alpha" /> 衰变</td><td><Latex tex="{}_{2}^{4}\text{He}" /></td><td>减 4</td><td>减 2</td><td>前移两位</td></tr>
<tr><td><Latex tex="\beta" /> 衰变</td><td><Latex tex="{}_{-1}^{\phantom{-}0}\text{e}" /></td><td>不变</td><td>加 1</td><td>后移一位</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="1">原子核衰变时，质量数和电荷数都守恒，这是配平衰变方程的依据。</div>
<div class="warn-hint" v-click="2"><Latex tex="\beta" /> 衰变的质量数不变，不要误写成减 1。</div>
</div>

---
title: γ 辐射
clicks: 3
---

# $\gamma$ 辐射

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<GammaDecaySvg :show-transition="$clicks >= 2" />
</div>
<div class="stack">
<div class="ask">为什么 <Latex tex="\gamma" /> 射线总伴随 <Latex tex="\alpha" />、<Latex tex="\beta" /> 射线出现？</div>
<div class="step-line" v-click="1"><Latex tex="\alpha" />、<Latex tex="\beta" /> 衰变产生的新核往往处于高能级。</div>
<div class="step-line" v-click="2">新核向低能级跃迁，放出的光子就是 <Latex tex="\gamma" /> 光子。</div>
<div class="step-line" v-click="3"><Latex tex="\gamma" /> 射线常伴随 <Latex tex="\alpha" />、<Latex tex="\beta" /> 射线产生；连续衰变时，三种射线同时存在。</div>
</div>
</div>
</div>

---
title: 半衰期
clicks: 3
---

# 半衰期

<div class="page-grow page-around">
<div class="ask ask-lead">氡 222 每过 3.8 天，剩下的原子核数有什么变化？</div>
<DefinitionBox v-click="1" term="半衰期" tone="gold"><div>放射性元素的原子核有半数发生衰变所需的时间，叫作这种元素的<span class="def-term">半衰期</span>。</div></DefinitionBox>
<div class="stack" v-click="2">
<div class="step-line">氡 222 的半衰期是 <Latex tex="3.8\ \text{d}" />：每经过 <Latex tex="3.8\ \text{d}" />，剩余的原子核数变为原来的一半。</div>
<div class="step-line">第一个 <Latex tex="3.8\ \text{d}" /> 后剩 <Latex tex="\frac{1}{2}" />，第二个后剩 <Latex tex="\frac{1}{4}" />，第三个后剩 <Latex tex="\frac{1}{8}" />。</div>
</div>
<div class="step-line" v-click="3">单个原子核只能知道衰变的概率，无法预测它何时衰变；半衰期描述的是大量原子核的统计规律。</div>
</div>

---
title: 半衰期的定量规律
clicks: 3
---

# 半衰期的定量规律

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<HalfLifeChart />
</div>
<div class="stack">
<div class="ask">经过 <Latex tex="n" /> 个半衰期，剩下的原子核数是原来的多少？</div>
<div class="step-line" v-click="1">每经过一个半衰期，剩余原子核数减为原来的一半。</div>
<div class="step-line" v-click="2">经过 <Latex tex="n" /> 个半衰期：<Latex tex="N = N_0 \left(\frac{1}{2}\right)^n" />。</div>
<div class="step-line" v-click="3">半衰期为 <Latex tex="T" />，经过时间 <Latex tex="t" />：<Latex tex="N = N_0 \left(\frac{1}{2}\right)^{t/T}" />，<Latex tex="m = m_0 \left(\frac{1}{2}\right)^{t/T}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
class: title-ask
title: 半衰期由什么决定
clicks: 2
---

# 半衰期由什么决定

<div class="page-grow page-around">
<div class="ask ask-lead">改变温度、压强，或把镭做成化合物，镭的半衰期会变吗？</div>
<table class="data-table">
<thead>
<tr><th>元素</th><th>衰变</th><th>半衰期</th></tr>
</thead>
<tbody>
<tr><td>氡 222</td><td><Latex tex="\alpha" /> 衰变</td><td><Latex tex="3.8\ \text{d}" /></td></tr>
<tr><td>镭 226</td><td><Latex tex="\alpha" /> 衰变</td><td>1 620 年</td></tr>
<tr><td>铀 238</td><td><Latex tex="\alpha" /> 衰变</td><td><Latex tex="4.5 \times 10^{9}" /> 年</td></tr>
</tbody>
</table>
<div class="step-line" v-click="1">不会。半衰期由原子核内部自身的因素决定，与化学状态和外部条件无关。</div>
<div class="step-line" v-click="2">压力、温度或与其他元素化合，都不会影响原子核的结构。</div>
</div>

---
title: 核反应
clicks: 5
---

# 核反应

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div class="stack">
<div class="ask">用 <Latex tex="\alpha" /> 粒子轰击氮核，会发生什么？</div>
<div class="step-line" v-click="1">1919 年，卢瑟福用 <Latex tex="\alpha" /> 粒子轰击氮核，产生了氧 17 和一个质子。</div>
<div class="formula-center" v-click="2"><Latex tex="{}_{7}^{14}\text{N} + {}_{2}^{4}\text{He} \rightarrow {}_{8}^{17}\text{O} + {}_{1}^{1}\text{H}" display /></div>
</div>
<div class="stack">
<DefinitionBox v-click="3" term="核反应" tone="blue"><div>原子核在其他粒子的轰击下产生新原子核，或发生状态变化，叫作<span class="def-term">核反应</span>。</div></DefinitionBox>
<div class="step-line" v-click="4">核反应同样遵守质量数守恒和电荷数守恒。</div>
<div class="step-line" v-click="5">衰变是原子核自发进行的；核反应需要其他粒子轰击。</div>
</div>
</div>
</div>

---
title: 放射性同位素及其应用
clicks: 2
---

# 放射性同位素及其应用

<div class="page-grow page-around">
<div class="ask">这些应用分别利用了射线的什么性质？</div>
<div class="step-line">天然放射性同位素只有 40 多种，人工制造的已达 3 000 多种。</div>
<div class="app-grid">
<div class="app-cell">
<mdi-factory class="icon-lg" />
<div><b>射线测厚仪</b><div class="mini-note" v-click="1"><Latex tex="\gamma" /> 射线穿过钢板，钢板越厚，透过的射线越弱，可自动控制钢板厚度。</div></div>
</div>
<div class="app-cell">
<mdi-hospital-building class="icon-lg" />
<div><b>放射治疗</b><div class="mini-note" v-click="1">细胞分裂越快的组织对射线越不耐受，癌细胞被破坏得比健康细胞快。</div></div>
</div>
<div class="app-cell">
<mdi-sprout class="icon-lg" />
<div><b>培优、保鲜</b><div class="mini-note" v-click="2"><Latex tex="\gamma" /> 射线照射种子可诱发遗传变异，培育新品种；照射食品可杀菌、抑制发芽。</div></div>
</div>
<div class="app-cell">
<mdi-magnify-scan class="icon-lg" />
<div><b>示踪原子</b><div class="mini-note" v-click="2">用放射性同位素标记，可探测棉花吸收磷肥的路径；碘 131 可用于诊断甲状腺。</div></div>
</div>
</div>
</div>

---
title: 辐射与安全
clicks: 3
---

# 辐射与安全

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); align-items: center">
<div class="stack">
<div class="ask">生活中到处都有放射性吗？受到射线照射一定有害吗？</div>
<div class="step-line" v-click="1">人类一直生活在放射性环境中：宇宙射线、岩石中的放射性元素、食盐中的钾 40 等，剂量都在安全范围内。</div>
<div class="step-line" v-click="2">过量的射线会破坏人体组织，损伤往往发生在细胞核，有时不会马上察觉。</div>
<div class="step-line" v-click="3">遵守操作规程、注意防护、防止放射性污染；有射线危险的地方设有警告标志。</div>
</div>
<div class="rad-warning">
<mdi-radiation class="icon-2xl" />
<div class="mini-note">当心电离辐射</div>
</div>
</div>
</div>

---
title: 碳 14 测年
clicks: 3
---

# 碳 14 测年

<div class="page-grow page-around">
<div class="ask ask-lead">一块远古木炭，怎样估算它大约是多少年前的？</div>
<div class="stack" v-click="1">
<div class="step-line">大气中的碳 14 由宇宙射线中的中子与氮 14 反应产生：<Latex tex="{}_{7}^{14}\text{N} + {}_{0}^{1}\text{n} \rightarrow {}_{6}^{14}\text{C} + {}_{1}^{1}\text{H}" />。</div>
<div class="step-line">碳 14 又会发生 <Latex tex="\beta" /> 衰变：<Latex tex="{}_{6}^{14}\text{C} \rightarrow {}_{7}^{14}\text{N} + {}_{-1}^{\phantom{-}0}\text{e}" />。</div>
</div>
<div class="step-line" v-click="2">活体生物不断与大气交换碳，体内碳 14 的比例与大气相同；死后交换停止，碳 14 按半衰期减少。</div>
<div class="step-line" v-click="3">碳 14 的半衰期是 5 730 年。含量剩 <Latex tex="\frac{1}{2}" /> 约为 5 730 年，剩 <Latex tex="\frac{1}{4}" /> 约为 11 460 年。</div>
</div>

---
layout: exercise-split
title: 练习一 衰变方程与半衰期
clicks: 4
---

<template v-slot:stem>

<b class="ex-no">练习一</b>　（1）$\beta$ 射线是电子流，原子核中没有电子，为什么有些放射性元素的原子核会放出 $\beta$ 粒子？写出 ${}_{84}^{210}\text{Po}$ 的 $\beta$ 衰变方程。

（2）钍 234 的半衰期是 $24\ \text{d}$，$1\ \text{g}$ 钍 234 经过 $120\ \text{d}$ 还剩多少？铋 210 的半衰期是 $5\ \text{d}$，$20\ \text{g}$ 铋 210 经过多少天还剩 $1.25\ \text{g}$？

</template>

<div class="step-line" v-click="1">（1）核内的中子转化为质子和电子：<Latex tex="{}_{0}^{1}\text{n} \rightarrow {}_{1}^{1}\text{H} + {}_{-1}^{\phantom{-}0}\text{e}" />，电子发射到核外就是 <Latex tex="\beta" /> 粒子。</div>
<div class="step-line" v-click="2">所以 <Latex tex="{}_{84}^{210}\text{Po} \rightarrow {}_{85}^{210}\text{At} + {}_{-1}^{\phantom{-}0}\text{e}" />。</div>
<div class="step-line" v-click="3">（2）<Latex tex="120\ \text{d}" /> 是 5 个半衰期，剩余质量 <Latex tex="1\ \text{g} \times \left(\frac{1}{2}\right)^5 = \frac{1}{32}\ \text{g}" />。</div>
<div class="step-line" v-click="4"><Latex tex="20\ \text{g}" /> 剩 <Latex tex="1.25\ \text{g}" />，是原来的 <Latex tex="\frac{1}{16} = \left(\frac{1}{2}\right)^4" />，经过 4 个半衰期：<Latex tex="4 \times 5\ \text{d} = 20\ \text{d}" />。</div>

---
layout: exercise-split
title: 练习二 衰变次数与核反应
clicks: 3
---

<template v-slot:stem>

<b class="ex-no">练习二</b>　（2）${}_{92}^{238}\text{U}$ 衰变为 ${}_{86}^{222}\text{Rn}$，要经过几次 $\alpha$ 衰变和几次 $\beta$ 衰变？

（4）原子核的人工转变与放射性元素的衰变有什么区别？

</template>

<div class="step-line" v-click="1">质量数减少 <Latex tex="238 - 222 = 16" />。每次 <Latex tex="\alpha" /> 衰变质量数减 4，所以 <Latex tex="\alpha" /> 衰变 <Latex tex="16 \div 4 = 4" /> 次。</div>
<div class="step-line" v-click="2">4 次 <Latex tex="\alpha" /> 衰变使电荷数减少 <Latex tex="4 \times 2 = 8" />。设 <Latex tex="\beta" /> 衰变 <Latex tex="n" /> 次，则 <Latex tex="92 - 8 + n = 86" />，得 <Latex tex="n = 2" />。所以经过 4 次 <Latex tex="\alpha" /> 衰变、2 次 <Latex tex="\beta" /> 衰变。</div>
<div class="step-line" v-click="3">衰变是原子核自发进行的；人工转变需要用其他粒子轰击原子核。</div>

---
title: 本节的规律
---

# 本节的规律

<div class="page-grow">
<div class="summary-line"><Latex tex="\alpha" /> 衰变：放出 <Latex tex="{}_{2}^{4}\text{He}" />，质量数减 4、电荷数减 2。</div>
<div class="summary-line"><Latex tex="\beta" /> 衰变：放出电子，质量数不变、电荷数加 1；实质是中子转化为质子。</div>
<div class="summary-line"><Latex tex="\gamma" /> 辐射：新核从高能级跃迁到低能级，放出 <Latex tex="\gamma" /> 光子。</div>
<div class="summary-line">半衰期：<Latex tex="N = N_0 \left(\frac{1}{2}\right)^{t/T}" />，由核自身决定，是统计规律。</div>
<div class="summary-line">核反应：人工转变，质量数守恒、电荷数守恒。</div>
<div class="summary-line">应用：测厚、治疗、培优保鲜、示踪；注意辐射防护。</div>
</div>
