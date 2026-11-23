---
theme: default
title: "波的形成"
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
chapter-no: "3.1"
chapter: "第三章 机械波"
---

<CoverDecorationSvg />

---
title: 彩带上的波浪
clicks: 1
---

<div class="page-grow">
<div class="wv-quote">水波离开了它产生的地方，而那里的水并不离开，就像风在田野里掀起的麦浪。我们看到，麦浪滚滚地在田野里奔去，但是麦子却仍旧留在原来的地方。</div>
<div class="wv-quote-src">——达·芬奇</div>
<div class="ask-lead">艺术体操的彩带波浪向前传播时，彩带上的每个点也在向前运动吗？</div>
<div class="info-hint" v-click="1">彩带上的波浪翻卷，是振动在彩带上传播的结果——振动的传播称为波动，简称波。</div>
</div>

---
clicks: 2
---

# 绳波的产生与传播

<div class="page-grow">
<div class="ask">手握绳的一端向上抖一下，绳上会出现什么？</div>
<div class="figure" style="max-width: 780px; margin-inline: auto;"><RopeWaveSvg :step="$clicks" /></div>
<div class="info-hint" v-click="2">红标记只在平衡位置附近上下振动，并没有随波向前移动。</div>
</div>

---
clicks: 4
---

# 波是怎样形成的

<div class="page-grow">
<div class="ask">绳端的振动，是怎样传到绳的另一端的？</div>
<div class="figure" style="max-width: 800px; margin-inline: auto;"><WavePointsSvg :step="$clicks" /></div>
<div class="stack-tight">
<div v-click="1">绳端带动相邻的质点，相邻质点又带动更远的质点——后面的质点总比前面的质点迟一些开始振动。</div>
<div class="tip-hint" v-click="4">各质点只在各自的平衡位置附近振动，振动这种形式却沿绳传了出去。</div>
</div>
</div>

---
clicks: 1
---

# 振动的传播

<div class="page-grow">
<DefinitionBox term="波（波动）" tone="blue">
<div>振动的传播称为<span class="def-term">波动</span>，简称<span class="def-term">波</span>（wave）。</div>
</DefinitionBox>
<div class="info-hint" v-click="1">一组同学手挽手排成一行，从第一位开始依次下蹲、起立：凹凸相间的波沿着队伍传播，而每个同学的位置并没有移动。</div>
</div>

---
clicks: 2
---

# 横波：波峰与波谷

<div class="page-grow">
<div class="ask">绳上的质点上下振动，波却向右传播——这两个方向是什么关系？</div>
<div class="figure"><TransverseWaveSvg /></div>
<div class="stack-tight">
<div v-click="1">质点的振动方向与波的传播方向相互垂直，这样的波叫作<span class="wv-key">横波</span>。</div>
<div v-click="2">横波中，凸起的最高处叫作<span class="wv-key">波峰</span>，凹下的最低处叫作<span class="wv-key">波谷</span>。</div>
</div>
</div>
