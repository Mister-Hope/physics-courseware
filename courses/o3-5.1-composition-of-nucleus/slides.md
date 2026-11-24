---
theme: default
title: "原子核的组成"
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
chapter-no: "5.1"
chapter: "第五章 原子核"
subtitle: "射线从哪里来？原子核里有什么？"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 3
title: 原子核内部的最早线索
---

<div class="page-grow">
<div class="stack">
<div class="ask-lead">
原子核的直径只有 <Latex tex="10^{-15}\ \text{m}" /> 量级，用显微镜看不见。人类最早是从什么现象中察觉到原子核内部有结构的？
</div>
<div v-click="1">
1896 年，贝克勒尔把铀和含铀矿物放在用黑纸包好的照相底片旁，发现底片被感光了。
</div>
<div v-click="2">
这种射线与阳光无关，也不是某种化合物特有的：只要物质含铀，底片就会感光。
</div>
<div class="tip-hint" v-click="3">
天然放射现象，是人类最早获得的原子核内部信息。
</div>
</div>
</div>

---
clicks: 3
---

# 天然放射现象

<div class="page-grow">
<div class="stack-dense">
<div class="ask">哪些元素能发出射线？这种现象叫什么？</div>
<DefinitionBox term="放射性">
物质发出射线的性质叫放射性；具有放射性的元素叫放射性元素。
</DefinitionBox>
<div v-click="1">
<DefinitionBox term="天然放射现象">
放射性元素自发地发出射线的现象，叫天然放射现象。
</DefinitionBox>
</div>
<div v-click="2">
居里夫妇：沥青铀矿的射线比按含铀量估算的强得多，由此发现了钋（Po）和镭（Ra）。
</div>
<div v-click="3">
原子序数大于 83 的元素都能自发发出射线，小于 83 的元素有的也能。
</div>
</div>
</div>

---
clicks: 3
---

# 射线是什么？

<div class="page-grow">
<div style="width:100%">
<ThreeRaysMagneticFieldSvg :step="$clicks" />
</div>
<div class="stack-tight" style="min-height:5.9em">
<div v-click="1">射线在磁场中分成三束。</div>
<div v-click="2">两束偏转方向相反，是带电粒子流；中间一束不偏转，不带电。</div>
<div v-click="3">它们依次叫做 α 射线、β 射线和 γ 射线。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 怎样判断射线的电性
---

<div class="page-grow">
<div class="stack">
<div class="ask">
在磁场垂直纸面向里的实验中，α 射线向上偏、β 射线向下偏（上一页）。它们各带什么电？
</div>
<div v-click="1">由左手定则判断：α 射线带正电，β 射线带负电。</div>
<div class="ask">
如果改用电场，两电极怎样放置，才能使三种射线大致沿上一页图中的方向偏转？
</div>
<div v-click="2">
上极板接负极、下极板接正极。电场方向向上：α 射线受向上的力，β 射线受向下的力，γ 射线不带电、不偏转。
</div>
<div class="mini-note">
左手定则：让磁感线穿入掌心，四指指向正电荷的运动方向，拇指所指就是洛伦兹力的方向。
</div>
</div>
</div>

---
clicks: 3
---

# 三种射线的本质

<div class="page-grow">
<div class="stack">
<div class="ask">三种射线的本质分别是什么？</div>
<table class="data-table">
<thead>
<tr><th>射线</th><th>本质</th><th>电荷</th><th>速度</th></tr>
</thead>
<tbody>
<tr v-click="1"><td>α 射线</td><td>氦核流（2 个质子 + 2 个中子）</td><td><Latex tex="+2e" /></td><td>可达 <Latex tex="0.1c" /></td></tr>
<tr v-click="2"><td>β 射线</td><td>电子流</td><td><Latex tex="-e" /></td><td>接近 <Latex tex="c" /></td></tr>
<tr v-click="3"><td>γ 射线</td><td>光子（波长极短的电磁波）</td><td><Latex tex="0" /></td><td><Latex tex="c" /></td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="3">三种射线都来自原子核，但本质不同：α、β 是粒子流，γ 是光子。</div>
</div>
</div>

---
clicks: 2
---

# 三种射线的性质

<div class="page-grow">
<div class="stack">
<div class="ask">三种射线电离空气、穿透物质的本领有什么不同？</div>
<table class="data-table" v-click="1">
<thead>
<tr><th>射线</th><th>电离作用</th><th>穿透能力</th><th>阻挡物</th></tr>
</thead>
<tbody>
<tr><td>α</td><td>强</td><td>弱</td><td>一张纸、几厘米空气</td></tr>
<tr><td>β</td><td>较弱</td><td>较强</td><td>几毫米铝板</td></tr>
<tr><td>γ</td><td>更弱</td><td>更强</td><td>几厘米铅板、几十厘米混凝土</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="2">电离作用越强的射线，能量损失得越快，穿透能力就越弱。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
title: 射线来自哪里
---

<div class="page-grow">
<div class="stack">
<div class="ask-lead">射线是核外电子发出的，还是原子核发出的？</div>
<div v-click="1">铀单质、铀的化合物都能发出射线——射线与物质的化学状态无关。</div>
<div v-click="2">温度、压强改变时，射线的强弱不变——射线与外界条件无关。</div>
<div v-click="3">化学性质由核外电子决定，而射线不随化学状态改变。</div>
<div class="tip-hint" v-click="4">射线与核外电子无关，只能来自原子核：原子核内部还有结构。</div>
</div>
</div>

---
clicks: 2
---

# 质子

<div class="page-grow">
<div class="stack">
<div class="ask">怎样把原子核内部的粒子打出来？</div>
<div v-click="1">1919 年，卢瑟福用镭放出的 α 粒子轰击氮原子核，从中打出了一个新的粒子。</div>
<div v-click="2">让这个新粒子通过电场和磁场，测出它的质量与电荷量，正好等于氢原子核。</div>
<div v-click="2">这就是质子，符号 p。</div>
<div class="tip-hint" v-click="2">
质子带正电，电荷量与电子相等，质量 <Latex tex="m_p = 1.672\,621\,898 \times 10^{-27}\ \text{kg}" />。后来从氟、钠、铝等原子核中也打出了质子。
</div>
</div>
</div>

---
layout: base-flex
class: title-ask
clicks: 3
---

# 原子核里只有质子吗？

<div class="page-grow">
<div class="stack">
<div class="ask">如果核里只有质子，核的质量与电荷量之比应该等于多少？</div>
<div v-click="1">事实是：绝大多数核的质量与电荷量之比都大于质子。</div>
<div v-click="2">卢瑟福猜想：核内还有一种质量与质子相同、不带电的粒子。</div>
<div v-click="3">1932 年，查德威克证实了这种粒子的存在——中子，符号 n。</div>
<div class="tip-hint" v-click="3">
中子不带电，质量 <Latex tex="m_n = 1.674\,927\,471 \times 10^{-27}\ \text{kg}" />，比质子约大千分之一。
</div>
</div>
</div>

---
clicks: 2
---

# 核子、电荷数与质量数

<div class="page-grow">
<div class="half-grid">
<div class="stack-dense">
<DefinitionBox term="核子">质子与中子统称为核子。</DefinitionBox>
<div v-click="1">
<div class="mini-title">电荷数 <Latex tex="Z" /></div>
<div class="stack-tight">
<div>原子核电荷是质子电荷的整数倍。</div>
<div><Latex tex="Z" /> = 质子数 = 原子序数。</div>
</div>
</div>
<div v-click="2">
<div class="mini-title">质量数 <Latex tex="A" /></div>
<div><Latex tex="A" /> = 核子数 = 质子数 + 中子数。</div>
</div>
<div class="mini-note">注意：电荷数不是电荷量，质量数也不是质量。</div>
</div>
<div style="width:100%">
<HeliumNucleusSvg />
<div class="fig-cap">氦核 <Latex tex="{}^{4}_{2}\mathrm{He}" />：2 个质子、2 个中子</div>
</div>
</div>
</div>

---
clicks: 2
---

# 原子核的符号

<div class="page-grow">
<div class="stack">
<div class="text-center text-4xl leading-normal"><Latex tex="{}^{A}_{Z}\mathrm{X}" /></div>
<div class="three-col" v-click="1">
<div><div class="mini-title"><Latex tex="A" /> 质量数</div><div>核子数 = 质子数 + 中子数</div></div>
<div><div class="mini-title"><Latex tex="Z" /> 电荷数</div><div>质子数 = 原子序数</div></div>
<div><div class="mini-title"><Latex tex="X" /> 元素符号</div><div>表示元素种类</div></div>
</div>
<div class="stack-tight" v-click="2">
<div><Latex tex="{}^{4}_{2}\mathrm{He}" />：2 个质子、2 个中子</div>
<div><Latex tex="{}^{238}_{92}\mathrm{U}" />：92 个质子、146 个中子</div>
<div><Latex tex="{}^{1}_{1}\mathrm{H}" />：也可以表示质子</div>
</div>
</div>
</div>

---
clicks: 1
---

# 同位素

<div class="page-grow">
<div class="half-grid">
<div class="stack-dense">
<div class="ask">质子数相同、中子数不同的原子，是什么关系？</div>
<DefinitionBox term="同位素">
质子数相同而中子数不同的原子，互称同位素。
</DefinitionBox>
<div class="mini-note">它们在元素周期表中占据同一位置。</div>
<div class="stack-tight" v-click="1">
<div class="text-lg leading-normal">氕 <Latex tex="{}^{1}_{1}\mathrm{H}" /></div>
<div class="text-lg leading-normal">氘 <Latex tex="{}^{2}_{1}\mathrm{H}" />（重氢）</div>
<div class="text-lg leading-normal">氚 <Latex tex="{}^{3}_{1}\mathrm{H}" />（超重氢）</div>
</div>
</div>
<div>
<HydrogenIsotopes />
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
title: 用符号表示原子核
---

<div class="page-grow">
<div class="stack">
<div class="ask">用核符号表示下列粒子，并写出质子数和中子数。</div>
<table class="data-table">
<thead>
<tr><th>题目</th><th>核符号</th><th>质子数</th><th>中子数</th></tr>
</thead>
<tbody>
<tr>
<td>（1）α 粒子</td>
<td><span v-click="1"><Latex tex="{}^{4}_{2}\mathrm{He}" /></span></td>
<td><span v-click="1">2</span></td>
<td><span v-click="1">2</span></td>
</tr>
<tr>
<td>（2）质量数 14 的碳</td>
<td><span v-click="2"><Latex tex="{}^{14}_{6}\mathrm{C}" /></span></td>
<td><span v-click="2">6</span></td>
<td><span v-click="2">8</span></td>
</tr>
<tr>
<td>（3）电荷数 8、质量数 17 的氧</td>
<td><span v-click="3"><Latex tex="{}^{17}_{8}\mathrm{O}" /></span></td>
<td><span v-click="3">8</span></td>
<td><span v-click="3">9</span></td>
</tr>
<tr>
<td>（4）质量数 40 的钾</td>
<td><span v-click="4"><Latex tex="{}^{40}_{19}\mathrm{K}" /></span></td>
<td><span v-click="4">19</span></td>
<td><span v-click="4">21</span></td>
</tr>
<tr>
<td>（5）电荷数 86、核子数 222 的氡</td>
<td><span v-click="5"><Latex tex="{}^{222}_{86}\mathrm{Rn}" /></span></td>
<td><span v-click="5">86</span></td>
<td><span v-click="5">136</span></td>
</tr>
</tbody>
</table>
<div class="mini-note">元素符号和原子序数可以查元素周期表；中子数 = 质量数 − 质子数。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 验电器与 α 射线
---

<div class="page-grow">
<div class="stack">
<div class="ask-lead">
用带正电的验电器做实验：把 α 射线射向验电器的金属球，金属箔的张角会怎样变化？
</div>
<div v-click="1">现象：张角减小，直至金属箔闭合。</div>
<div v-click="2">原因：α 射线使空气电离，空气变成了导体。</div>
<div v-click="3">金属球上的正电荷与空气中的负离子中和，验电器重新恢复不带电。</div>
<div class="tip-hint" v-click="3">
α 射线电离空气、使空气导电，球上的正电荷才得以中和——这正是 α 射线电离本领强的表现。
</div>
</div>
</div>

---
clicks: 4
---

# 从射线到原子核的组成

<div class="page-grow">
<div class="half-grid" style="align-items:start">
<div class="stack" v-click="1">
<div class="mini-title">天然放射现象</div>
<div>放射性元素自发发出射线，射线来自原子核。</div>
</div>
<div class="stack" v-click="2">
<div class="mini-title">三种射线</div>
<div>α 氦核流（<Latex tex="+2e" />）、β 电子流（<Latex tex="-e" />）、γ 光子（不带电）。</div>
</div>
<div class="stack" v-click="3">
<div class="mini-title">原子核的组成</div>
<div>核子 = 质子 + 中子；<br /><Latex tex="Z" /> = 质子数，<Latex tex="A" /> = 核子数。</div>
</div>
<div class="stack" v-click="4">
<div class="mini-title">符号与同位素</div>
<div><Latex tex="{}^{A}_{Z}\mathrm{X}" />；质子数相同、中子数不同的是同位素。</div>
</div>
</div>
</div>
