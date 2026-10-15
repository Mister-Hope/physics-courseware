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
subtitle: "苹果为什么落向地面 —— 万有引力的发现与检验"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="ask ask-lead">苹果熟了，为什么总是落向地面？</div>
<div v-click="1">牛顿在苹果树下读书时，一个熟透的苹果落下来砸中了他 —— 这个人人见过的现象让他想到：苹果落地，是因为地球在吸引它。</div>
<div v-click="2">可月亮也在天上，它为什么不会落下来？让苹果落地的力，和让月亮绕地球转的力，会不会是同一种力？</div>
</div>
<div class="figure"><AppleStorySvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 行星与太阳间的引力

<div class="page-grow">
<div class="half-grid">
<div class="figure"><OrbitGravitySvg :show-force="$clicks >= 1" /></div>
<div class="stack">
<div class="ask">行星绕太阳做圆周运动，向心力由谁提供？方向如何？</div>
<div v-click="1">行星做匀速圆周运动，必须有一个指向圆心的力充当向心力 —— 这个力就是太阳对行星的引力，方向沿着行星与太阳的连线。</div>
<div v-click="2">由天文观测（开普勒定律）可以推知：这个引力与行星到太阳距离的二次方成反比。</div>
<div v-click="3">牛顿之前，胡克、哈雷等人也猜到了这一点，但当时还缺少“运动与力”的清晰概念。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 万有引力表达式的可能形式

<div class="page-grow">
<div class="ask">太阳对行星的引力，大小该怎样写出来？</div>
<div v-click="1">
引力提供行星做圆周运动的向心力：
<Latex tex="F = m\frac{v^2}{r}" display />
</div>
<div v-click="2">
天文观测给出的是公转周期 <Latex tex="T" />，而 <Latex tex="v = \frac{2\pi r}{T}" />，代入上式得到：
<Latex tex="F = 4\pi^2 \frac{m r}{T^2}" display />
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 万有引力表达式的可能形式

<div class="page-grow">
<div class="ask">式子里还留着公转周期 <Latex tex="T" /> —— 能不能把它换成只与太阳有关的量？</div>
<div v-click="1">由开普勒第三定律 <Latex tex="\frac{r^3}{T^2} = k" /> 得 <Latex tex="T^2 = \frac{r^3}{k}" />，代入上式得到：<Latex tex="F = 4\pi^2 k \frac{m}{r^2}" display /></div>
<div v-click="2"><Latex tex="k" /> 对任何行星都相同，所以太阳对行星的引力 <Latex tex="F \propto \frac{m}{r^2}" />：与行星质量成正比、与距离的二次方成反比。</div>
<div v-click="3">再由相互性：行星对太阳的引力也应与太阳质量 <Latex tex="m_{\text{太}}" /> 成正比 —— 合起来写成 <Latex tex="F = G\frac{m_{\text{太}} m}{r^2}" />（<Latex tex="G" /> 待定）。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 月—地检验

<div class="page-grow">
<div class="ask">怎么检验“地上的力”和“天上的力”是同一种力？</div>
<div class="half-grid">
<div class="stack">
<div v-click="1">假设是同一种力：地球对月球的引力 <Latex tex="F_{\text{月}} = G\frac{m_{\text{月}} m_{\text{地}}}{r^2}" />，对苹果的引力 <Latex tex="F_{\text{苹}} = G\frac{m_{\text{苹}} m_{\text{地}}}{R^2}" />。</div>
<div v-click="2">由牛顿第二定律：<Latex tex="a_{\text{月}} = G\frac{m_{\text{地}}}{r^2}" />，<Latex tex="a_{\text{苹}} = G\frac{m_{\text{地}}}{R^2}" />。</div>
<div v-click="3">两式相比：<Latex tex="\frac{a_{\text{苹}}}{a_{\text{月}}} = \frac{r^2}{R^2}" /> —— <Latex tex="G" /> 与地球质量 <Latex tex="m_{\text{地}}" /> 都被消掉了。</div>
<div v-click="4">所以要用的量当时都能精确测定：地面 <Latex tex="g" />、地球半径 <Latex tex="R" />、月地距离 <Latex tex="r" />、月球公转周期 <Latex tex="T" /> —— 不需要 <Latex tex="G" />，当时也并不知道地球的质量。</div>
</div>
<div class="stack">
<div class="figure"><ParallaxSvg /></div>
<div class="fig-cap">月地距离用视差法测定：两地同时观测月球，由基线 <Latex tex="L" /> 与视差角 <Latex tex="p" /> 算出 <Latex tex="r \approx L/p" /></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 月—地检验

<div class="page-grow">
<div class="ask">把数据代进去，结果对得上吗？</div>
<div v-click="1">
预期：月球到地心的距离约为地球半径的 60 倍，把地面的 <Latex tex="g" /> 按平方反比减弱：
<Latex tex="a_{\text{月}} = \frac{g}{60^2} = \frac{9.8}{3600} \approx 2.7 \times 10^{-3}\ \text{m/s}^2" display />
</div>
<div v-click="2">
实测：天文观测给出 <Latex tex="r = 3.8 \times 10^8\ \text{m}" />、<Latex tex="T = 27.3\ \text{d} \approx 2.36 \times 10^6\ \text{s}" />，由向心加速度公式算得：
<Latex tex="a_{\text{月}} = \frac{4\pi^2 r}{T^2} \approx 2.7 \times 10^{-3}\ \text{m/s}^2" display />
</div>
<div v-click="3" class="key">两个数完全一致 —— 地面物体和月球所受的引力确实是同一种力，我们的猜测被证实了。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 万有引力定律

<div class="page-grow">
<div class="ask">这条规律能推广到任意两个物体吗？</div>
<div class="half-grid">
<div v-click="1" class="card">自然界中任何两个物体都相互吸引，引力的方向在它们的连线上，引力的大小与物体的质量 <Latex tex="m_1" /> 和 <Latex tex="m_2" /> 的乘积成正比、与它们之间距离 <Latex tex="r" /> 的二次方成反比。</div>
<div v-click="1" class="stack">
<div class="figure"><TwoBodyForceSvg /></div>
<Latex tex="F = G\frac{m_1 m_2}{r^2}" display />
<div class="mini-note">质量用 <Latex tex="\text{kg}" />、距离用 <Latex tex="\text{m}" />、力用 <Latex tex="\text{N}" />。</div>
</div>
</div>
<div v-click="2"><mdi-notebook-outline class="icon-md text-accent" /> <b>记笔记</b>：两个质量分布均匀的球体之间的万有引力，可以看成两球心处的两个质点之间的引力，<Latex tex="r" /> 取两球心间的距离（数学上已严格证明，直接用）。</div>
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
<div class="ask">牛顿 1687 年就发表了万有引力定律，为什么他仍然算不出引力的大小？</div>
<div v-click="1">因为式中的比例系数 <Latex tex="G" /> 一直不知道 —— 一般物体之间的引力非常小，极难测量。</div>
<div v-click="2">1798 年，卡文迪什用扭秤测出铅球之间的引力。核心是<b>光路放大法</b>：平面镜转过 <Latex tex="\theta" />，反射光线转过 <Latex tex="2\theta" />，光点在远处刻度尺上明显移动。</div>
<div v-click="3" class="key">由此推算出 <Latex tex="G = 6.67 \times 10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2" /> —— 这就是卡文迪什测出的引力常量。</div>
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
clicks: 2
---

# 重力与万有引力

<div class="page-grow">
<div class="half-grid">
<div class="figure"><GravityEquatorSvg /></div>
<div class="stack">
<div class="ask">在赤道上，我们测得的重力就是万有引力吗？</div>
<div v-click="1">赤道上的物体随地球自转，需要指向地心的向心力，它由万有引力的一部分提供：<Latex tex="F_{\text{引}} = mg + F_{\text{向}}" />。</div>
<div v-click="2" class="key">重力只是万有引力的一个分力，所以赤道上测得的重力略小于万有引力（向心力只占约 0.3%，图中已放大）。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 重力与万有引力

<div class="page-grow">
<div class="half-grid">
<div class="figure"><GravityLatitudeSvg /></div>
<div class="stack">
<div class="ask">在一般纬度上，重力的方向还和万有引力一致吗？</div>
<div v-click="1">物体随地球自转的向心力指向地轴、垂直于地轴；重力是万有引力减去向心力后的结果 —— 三者满足矢量关系 <Latex tex="F_{\text{引}} = mg + F_{\text{向}}" />。</div>
<div v-click="2" class="key">所以一般纬度上重力的方向并不指向地心（只有赤道与两极例外），大小也略小于万有引力。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">

<v-clicks>

<div class="summary-line"><span class="text-accent">方向</span>：引力沿着两个物体的连线；行星做圆周运动的向心力，就是太阳对它的引力。</div>

<div class="summary-line"><span class="text-accent">表达式</span>：由 <Latex tex="F = m\frac{v^2}{r}" />、<Latex tex="v = \frac{2\pi r}{T}" /> 配合开普勒第三定律，得到 <Latex tex="F = G\frac{m_1 m_2}{r^2}" />。</div>

<div class="summary-line"><span class="text-accent">检验</span>：月—地检验中 <Latex tex="\frac{a_{\text{苹}}}{a_{\text{月}}} = \frac{r^2}{R^2}" /> 与实测吻合，证明“天上”和“地上”的力遵从同一规律。</div>

<div class="summary-line"><span class="text-accent">定律</span>：任何两个物体都相互吸引，与 <Latex tex="m_1 m_2" /> 成正比、与 <Latex tex="r^2" /> 成反比；均匀球体可看成球心处的质点。</div>

<div class="summary-line"><span class="text-accent">常量</span>：卡文迪什用扭秤（光路放大法）测出 <Latex tex="G = 6.67 \times 10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2" />。</div>

<div class="summary-line"><span class="text-accent">重力</span>：重力是万有引力的一个分力 —— 赤道上方向相同、略小；一般纬度上方向也不同。</div>

</v-clicks>

</div>
