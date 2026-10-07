---
theme: default
title: "牛顿第三定律"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: cover
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
---

<div class="cover-chapter"><span class="cover-section">§</span> 3.3 · 第三章 相互作用——力</div>

<h1 class="cover-title">牛顿第三定律</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="half-grid">
<div class="fig-host">
<ArmWrestlingSvg />
</div>
<div class="stack">
<div class="ask ask-lead">大人跟小孩掰手腕，很容易就把小孩的手压在桌面上。他们施加给对方的力，大小相等吗？</div>
<div class="trait" v-click="1">换个熟悉的场景：用手压桌面，手有什么感觉？</div>
</div>
</div>
</div>

---
clicks: 4
---

# 力的作用是相互的

<div class="page-grow">
<div class="three-col">
<div class="fig-col" v-click="1">
<SpringPullSvg />
<div class="fig-cap">手拉弹簧，弹簧也拉手</div>
</div>
<div class="fig-col" v-click="2">
<TablePushSvg />
<div class="fig-cap">推桌子，桌子也推我们</div>
</div>
<div class="fig-col" v-click="3">
<GravityMutualSvg />
<div class="fig-cap">地球吸引物体，物体也吸引地球</div>
</div>
</div>
<div class="key" v-click="4">两个物体之间的作用总是相互的：一个物体对另一个物体施加了力，后一个物体一定同时对它施加力——施力物体同时也是受力物体。</div>
</div>

---
clicks: 2
---

# 作用力与反作用力

<div class="page-grow">
<div class="ask">这一对相互的力，怎么称呼？它们之间有什么关系？</div>
<div class="half-grid">
<div class="card" v-click="1">物体间相互作用的这一对力，叫作<span class="text-accent">作用力</span>和<span class="text-accent">反作用力</span>。它们互相依赖、同时存在——可以把其中任何一个叫作作用力，另一个叫作反作用力。</div>
<div class="stack" v-click="2">
<div class="mini-title">作用力与反作用力的性质</div>
<ul class="trait-list">
<li>同种性质：都是弹力，或都是摩擦力……</li>
<li>同时产生、同时消失、同时变化</li>
<li>分别作用在两个物体上</li>
</ul>
</div>
</div>
</div>

---
clicks: 1
---

# 用弹簧测力计探究

<div class="page-grow">
<div class="ask">要研究这两个力的大小关系，必须同时测出它们——你会怎么测？</div>
<div class="fig-host">
<SpringScalePairSvg />
</div>
<div class="three-col" v-click="1">
<div class="trait">两个测力计的指针同时移动</div>
<div class="trait">两个示数总是相等</div>
<div class="trait">两个力的方向相反</div>
</div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="ask">手拉的力时刻在变，两个力还总是相等吗？</div>
<SensorPullDemo />
<div class="key" v-click="1">两条图线始终关于 <Latex tex="t" /> 轴对称：任何时刻大小相等、方向相反、同时变化。</div>
</div>

---
clicks: 2
---

# 牛顿第三定律

<div class="page-grow">
<div class="ask">弹簧测力计测的是弹力。摩擦力、不接触的力呢？</div>
<div class="card" v-click="1">两个物体之间的作用力和反作用力总是<span class="text-accent">大小相等</span>，<span class="text-accent">方向相反</span>，作用在<span class="text-accent">同一条直线</span>上。</div>
<div class="key key-lead" v-click="2"><Latex tex="F' = -F" />　负号表示方向相反——任何两个相互作用的物体之间都成立。</div>
</div>

---
clicks: 4
---

# 定律对什么成立

<div class="page-grow">
<div class="ask">两个物体不接触时呢？正在加速运动时呢？</div>
<div class="three-col">
<div class="trait" v-click="1">不接触的力同样成立：磁铁与铁钉隔着一段距离，吸引仍是相互的。</div>
<div class="trait" v-click="2">与运动状态无关：静止、匀速、加速运动中，两个力都同时等大反向。</div>
<div class="trait" v-click="3">与力的性质无关：弹力、摩擦力、引力、磁力都一样。</div>
</div>
<div class="key" v-click="4">定律里的<span class="text-accent">"总是"</span>，对任何两个相互作用的物体都成立。</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">物体静止在台秤上，秤的示数是哪个力？</div>
<div class="half-grid">
<div class="fig-host" v-click="1">
<ScaleReadingForcesSvg />
</div>
<div class="stack">
<div class="trait" v-click="1">秤的示数来自<span class="text-accent">物体对秤面的压力</span>。</div>
<div class="trait" v-click="2">压力与秤面对物体的支持力是一对作用力与反作用力，所以两者大小相等。</div>
<div class="key" v-click="3">物体静止，支持力与重力二力平衡，于是示数等于重力；但<span class="text-accent">压力不是重力</span>——性质不同（弹力 / 重力），受力物体也不同（秤面 / 物体）。</div>
</div>
</div>
</div>

---
clicks: 4
---

# 一对作用力与反作用力 · 一对平衡力

<div class="page-grow">
<div class="pair-grid">
<div class="fig-host">
<HangingBallForcesSvg />
</div>
<div class="stack">
<div class="pair-head"><span></span><span>作用力与反作用力</span><span>一对平衡力</span></div>
<div class="pair-row" v-click="1"><span class="pair-k">作用对象</span><span class="pair-a">两个物体</span><span class="pair-b">同一个物体</span></div>
<div class="pair-row" v-click="2"><span class="pair-k">力的性质</span><span class="pair-a">一定相同</span><span class="pair-b">不一定相同</span></div>
<div class="pair-row" v-click="3"><span class="pair-k">变化关系</span><span class="pair-a">同时产生、同时消失</span><span class="pair-b">撤去一个，另一个仍在</span></div>
<div class="pair-row" v-click="4"><span class="pair-k">作用效果</span><span class="pair-a">不能抵消</span><span class="pair-b">可以抵消，合力为零</span></div>
</div>
</div>
</div>

---

# 判断：这是哪一对力？

<div class="page-grow">
<PairVsBalanceQuiz />
</div>

---
clicks: 3
---

# 分析物体受力的顺序

<div class="page-grow">
<div class="ask">面对一个情景，从哪里下手？先找哪个力？</div>
<div class="trait" v-click="1">先明确对象：分析的是<span class="text-accent">哪个物体</span>受到的力。</div>
<div class="order-line" v-click="2"><span class="order-step">重力</span><span class="order-arrow">→</span><span class="order-step">弹力</span><span class="order-arrow">→</span><span class="order-step">摩擦力</span><span class="order-arrow">→</span><span class="order-step">其他力</span></div>
<div class="key" v-click="3">按顺序走一遍，不多画一个，也不漏画一个。</div>
</div>

---
clicks: 3
---

# 例：静止在粗糙斜面上的木块

<div class="page-grow">
<div class="half-grid">
<div class="fig-host">
<InclinedBlockForcesSvg />
</div>
<div class="stack">
<div class="ask">木块受到哪几个力？</div>
<div class="trait" v-click="1">重力 <Latex tex="G" />：竖直向下。</div>
<div class="trait" v-click="2">弹力 <Latex tex="F_{\text{N}}" />：垂直于斜面向上的支持力。</div>
<div class="trait" v-click="3">静摩擦力 <Latex tex="F_f" />：假设没有摩擦，木块会向下滑动，所以木块相对斜面有向下滑动的趋势，摩擦力沿斜面向上。</div>
</div>
</div>
</div>

---
clicks: 2
---

# 木块、斜面与地球之间的三对力

<div class="page-grow">
<div class="ask">木块受到的三个力，分别与哪个力互为作用力与反作用力？</div>
<div class="stack" v-click="1">
<div class="trait">重力 <Latex tex="G" /> ↔ 木块对地球的引力</div>
<div class="trait">支持力 <Latex tex="F_{\text{N}}" /> ↔ 木块对斜面的压力</div>
<div class="trait">静摩擦力 <Latex tex="F_f" /> ↔ 木块对斜面的静摩擦力</div>
</div>
<div class="key" v-click="2">六个力里我们只画木块受到的三个——<span class="text-accent">分析哪个物体，就只画哪个物体受到的力</span>，不要把它的反作用力也画上去。</div>
</div>

---
class: p15-tight
---

<div class="page-grow">
<div class="ask">点出下面每个情景中<span class="text-accent">指定物体受到的力</span>——漏选、多选都算错</div>
<ForcePickQuiz />
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">小强说："两个力大小相等、方向相反，就会互相平衡。作用力和反作用力也是这样，它们也应该互相平衡呀！"你怎样解答他的疑问？</div>
<div class="fig-host" v-click="1">
<TwoBlocksInteractionSvg />
</div>
<div class="key key-lead" v-click="2">一对平衡力作用在<span class="text-accent">同一个物体</span>上，效果互相抵消；作用力与反作用力分别作用在<span class="text-accent">两个物体</span>上，各自改变各自物体的运动状态，<span class="text-accent">不能抵消</span>，也就谈不上"平衡"。</div>
</div>

---

# 课堂小结

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">相互作用</div>
<div class="trait">力的作用是相互的，施力物体同时也是受力物体</div>
<div class="trait">作用力与反作用力：同种性质、同时存在、分别作用在两个物体上</div>
<div class="mini-title">定量关系</div>
<div class="trait"><Latex tex="F' = -F" />：大小相等、方向相反、作用在同一条直线上</div>
</div>
<div class="stack">
<div class="mini-title">与平衡力的区别</div>
<div class="trait">异体 与 同体</div>
<div class="trait">一定同性质 与 不一定同性质</div>
<div class="trait">同时变化 与 不一定同时变化</div>
<div class="mini-title">受力分析</div>
<div class="trait">先明确对象，再按 重力 → 弹力 → 摩擦力 → 其他力 的顺序找</div>
</div>
</div>
</div>
