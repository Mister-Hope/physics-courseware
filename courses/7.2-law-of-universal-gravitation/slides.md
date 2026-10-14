---
theme: default
title: "万有引力定律"
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
chapter-no: "7.2"
chapter: "第七章 万有引力与宇宙航行"
subtitle: "行星为什么绕太阳运动 —— 推导、月—地检验与引力常量"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">是什么原因使行星绕太阳运动？</div>
<div v-click="1">伽利略、开普勒、笛卡儿都提出过自己的解释；胡克、哈雷等人已经猜到：行星受到太阳的引力，而且如果行星的轨道是圆形的，这个引力的大小跟行星到太阳距离的二次方成反比。</div>
<div v-click="2">但他们无法再往前走一步 —— 当时还没有关于运动和力的清晰概念：不知道改变速度（包括改变速度的方向）都需要力，也就无法把行星的运动跟它所受的力联系起来。</div>
<div v-click="3">牛顿的思考从这里开始：<b>物体怎样才会不沿直线运动？</b>以任何方式改变速度都需要力 —— 所以使行星做圆周运动，需要一个指向圆心的力，这个力就是太阳对行星的引力。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 行星与太阳间的引力

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="ask">向心力由什么力提供？它在什么方向上？</div>
<div v-click="1">行星做匀速圆周运动，受到一个指向圆心（太阳）的引力，正是这个引力提供了向心力 —— 所以引力的方向沿着行星与太阳的连线。</div>
<div v-click="2">设行星质量为 <Latex tex="m" />、速度为 <Latex tex="v" />、到太阳的距离为 <Latex tex="r" />，由向心力公式得 <Latex tex="F = m\dfrac{v^2}{r}" />。</div>
<div v-click="3">天文观测可以测出行星的公转周期 <Latex tex="T" />，于是 <Latex tex="v = \dfrac{2\pi r}{T}" />，代入上式得 <Latex tex="F = \dfrac{4\pi^2 m r}{T^2}" />。</div>
</div>
<div class="figure"><OrbitGravitySvg :show-force="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 用周期表示引力

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="ask">式子里还留着行星自己的质量 <Latex tex="m" /> —— 怎样把它也换成与行星无关的量？</div>
<div v-click="1">由开普勒第三定律 <Latex tex="\frac{r^3}{T^2} = k" /> 得 <Latex tex="T^2 = \frac{r^3}{k}" />，代入 <Latex tex="F = \frac{4\pi^2 m r}{T^2}" />，得到 <Latex tex="F = 4\pi^2 k \frac{m}{r^2}" />。</div>
<div v-click="2">等式右边除了 <Latex tex="m" />、<Latex tex="r" />，其余都是常量，对任何行星都相同 —— 太阳对行星的引力 <Latex tex="F \propto \frac{m}{r^2}" />：与行星质量成正比、与距离的二次方成反比。</div>
<div v-click="3" class="key">引力的大小只由行星的质量和它到太阳的距离决定，与行星是哪一颗天体无关。</div>
</div>
<div class="stack">
<div class="mini-title"><mdi-table /> 各行星的 <Latex tex="r^3/T^2" /></div>
<table class="data-table">
<thead>
<tr><th>行星</th><th><Latex tex="r\ (\text{AU})" /></th><th><Latex tex="T\ (\text{年})" /></th><th><Latex tex="r^3/T^2" /></th></tr>
</thead>
<tbody>
<tr><td>水星</td><td>0.387</td><td>0.241</td><td>1.00</td></tr>
<tr><td>金星</td><td>0.723</td><td>0.615</td><td>1.00</td></tr>
<tr><td>地球</td><td>1.000</td><td>1.000</td><td>1.00</td></tr>
<tr><td>火星</td><td>1.524</td><td>1.881</td><td>1.00</td></tr>
</tbody>
</table>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 引力是相互的

<div class="page-grow">
<div class="half-grid">
<div class="figure"><OrbitGravitySvg :show-force="true" :mutual="$clicks >= 1" /></div>
<div class="stack">
<div class="ask">太阳吸引行星，行星也吸引太阳 —— 这两个引力有什么关系？</div>
<div v-click="1">力的作用是相互的：太阳受到的引力与行星受到的引力等大反向；在引力的存在与性质上，行星和太阳的地位完全相当。</div>
<div v-click="2">太阳对行星的引力与行星的质量 <Latex tex="m" /> 成正比；行星对太阳的引力，也应该与太阳的质量 <Latex tex="m_{\text{太}}" /> 成正比。</div>
<div v-click="3" class="key">两者结合起来：<Latex tex="F = G\dfrac{m_{\text{太}} m}{r^2}" />，式中的 <Latex tex="G" /> 与太阳、行星都没有关系。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 月—地检验

<div class="page-grow">
<div class="ask">地球对月球的引力、地球对苹果的引力，与太阳对行星的引力是同一种力吗？</div>
<MoonEarthTest />
<div v-click="1" class="key">取真实数据（<Latex tex="r = 60R" />、<Latex tex="T = 27.3\ \text{d}" />）时，两种算法给出的向心加速度一致 —— 月球与地面物体所受的引力是同一种力。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 万有引力定律

<div class="page-grow">
<div class="ask">这条规律能不能从太阳与行星、地球与月球，推广到<b>任意两个物体</b>之间？</div>
<div class="half-grid">
<div v-click="1" class="card">自然界中任何两个物体都相互吸引，引力的方向在它们的连线上，引力的大小与物体的质量 <Latex tex="m_1" /> 和 <Latex tex="m_2" /> 的乘积成正比、与它们之间距离 <Latex tex="r" /> 的二次方成反比。</div>
<div v-click="1" class="stack">
<div class="figure"><TwoBodyForceSvg /></div>
<Latex tex="F = G\dfrac{m_1 m_2}{r^2}" display />
<div class="mini-note">质量用 <Latex tex="\text{kg}" />、距离用 <Latex tex="\text{m}" />、力用 <Latex tex="\text{N}" />。</div>
</div>
</div>
<div v-click="2" class="key">这一规律于 1687 年发表在牛顿的《自然哲学的数学原理》中。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 引力常量

<div class="page-grow">
<div class="half-grid">
<div class="figure"><CavendishBalanceSvg :step="$clicks" /></div>
<div class="stack">
<div class="ask">牛顿给出了引力与质量、距离的关系 —— 为什么他仍然算不出引力的大小？</div>
<div v-click="1">因为比例系数 <Latex tex="G" /> 的值还不知道 —— 一般物体之间的引力非常小，很难测出来。</div>
<div v-click="2">1798 年，卡文迪什用扭秤测出铅球之间的引力：大球吸引小球使 T 形架扭转，扭转角由平面镜反射的光点在刻度尺上移动的距离反映。</div>
<div v-click="3" class="key"><Latex tex="G = 6.67 \times 10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2" /> —— 这就是卡文迪什测出的引力常量。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">一个篮球的质量为 <Latex tex="0.6\ \text{kg}" />，操场上相距 <Latex tex="0.5\ \text{m}" /> 的两个篮球之间的万有引力有多大？</div>
<DailyGravityCompare />
<div v-click="1" class="key">两球之间的万有引力只有篮球重力的 <Latex tex="10^{-11}" /> 量级 —— 身边物体的质量太小，引力根本察觉不到；天体的质量巨大，万有引力才成为支配它们运动的力。</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">

<v-clicks>

<div class="summary-line"><span class="text-accent">方向</span>：引力沿着两个物体的连线；行星绕太阳运动的向心力，就是这个引力。</div>

<div class="summary-line"><span class="text-accent">推导</span>：由 <Latex tex="F = m\dfrac{v^2}{r}" /> 与 <Latex tex="v = \dfrac{2\pi r}{T}" />，配合开普勒第三定律 <Latex tex="\dfrac{r^3}{T^2} = k" />，得到 <Latex tex="F \propto \dfrac{m}{r^2}" />。</div>

<div class="summary-line"><span class="text-accent">定律</span>：<Latex tex="F = G\dfrac{m_1 m_2}{r^2}" /> —— 任何两个物体都相互吸引，引力与 <Latex tex="m_1 m_2" /> 成正比、与 <Latex tex="r^2" /> 成反比，方向在它们的连线上。</div>

<div class="summary-line"><span class="text-accent">检验</span>：月—地检验表明，地面物体、月球与行星所受的引力遵从相同的规律。</div>

<div class="summary-line"><span class="text-accent">常量</span>：卡文迪什用扭秤测出 <Latex tex="G = 6.67 \times 10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2" />，<Latex tex="G" /> 适用于任何两个物体。</div>

</v-clicks>

</div>
