---
theme: default
title: "光的折射"
subtitle: "光从一种介质进入另一种介质"
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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "4.1"
chapter: "第四章 光"
---
<CoverDecorationSvg />
---
layout: base-flex
title: 水中的鱼看到什么
clicks: 1
---
<div class="page-grow pt2">
  <div class="ask ask-lead p2-ask">水中的鱼看到水面上的小昆虫，它在实际位置的上方还是下方？</div>
  <div class="p2-fig"><FishViewSvg :show-answer="$clicks >= 1" /></div>
  <div class="tip-hint" v-click="1">光从空气进入水中时发生折射，鱼逆着折射光线看到的是虚像，位置比实际的高。</div>
</div>
---
layout: base-flex
title: 光的折射现象
clicks: 1
---
# 光的折射
<div class="page-grow pt3">
  <div class="half-grid p3-grid">
    <div class="p3-fig"><ChopstickCupSvg /></div>
    <div class="divider-l p3-side">
      <div class="ask">筷子插入水中，为什么看起来折断了？</div>
      <div class="p3-point"><span class="p3-dot"></span>水面处的筷子看起来错开了</div>
      <div class="p3-point"><span class="p3-dot"></span>水中的物体位置看起来也变了</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">光从一种介质斜射入另一种介质时，传播方向发生改变，这就是光的折射。</div>
</div>
---
layout: base-flex
title: 入射角与折射角
clicks: 1
---
# 入射角与折射角
<div class="page-grow pt4">
  <div class="p4-grid">
    <div class="p4-fig"><RefractionRaySvg /></div>
    <div class="divider-l p4-side">
      <div class="p4-line"><Latex tex="AO" /> 是入射光线，<Latex tex="OB" /> 是折射光线。</div>
      <div class="p4-line">过入射点 <Latex tex="O" /> 作界面的法线。</div>
      <div class="p4-line" v-click="1">入射光线与法线的夹角 <Latex tex="\theta_1" /> 叫入射角。</div>
      <div class="p4-line" v-click="1">折射光线与法线的夹角 <Latex tex="\theta_2" /> 叫折射角。</div>
    </div>
  </div>
</div>
---
layout: base-flex
title: 折射定律
clicks: 2
---
# 折射定律
<div class="page-grow pt5">
  <div class="ask">入射角和折射角之间有什么定量关系？</div>
  <div class="p5-body">
    <div class="p5-text">折射光线、入射光线和法线在同一平面内；折射光线与入射光线分别位于法线两侧。</div>
    <div class="p5-eq" v-click="2"><Latex tex="\dfrac{\sin\theta_1}{\sin\theta_2}=n_{12}" display /></div>
    <div class="p5-note" v-click="2"><Latex tex="n_{12}" /> 只与两种介质的性质有关，与入射角、折射角的大小无关。</div>
  </div>
</div>
---
layout: base-flex
title: 折射率
clicks: 1
---
# 折射率
<div class="page-grow pt6">
  <div class="ask">怎样描述一种介质的光学性质？</div>
  <div class="p6-def">光从真空射入某种介质时，入射角的正弦与折射角的正弦之比，叫这种介质的折射率。</div>
  <div class="p6-eq"><Latex tex="n=\dfrac{\sin\theta_1}{\sin\theta_2}" display /></div>
  <div class="p6-row" v-click="1">真空的折射率为 <Latex tex="1" />，空气的折射率近似为 <Latex tex="1" />；任何介质的折射率都大于 <Latex tex="1" />。</div>
  <div class="p6-row" v-click="1"><Latex tex="n=\dfrac{c}{v}" />，光在介质中的速度 <Latex tex="v" /> 小于真空中的速度 <Latex tex="c" />。</div>
</div>
---
layout: base-flex
title: 几种介质的折射率
clicks: 1
---
# 几种介质的折射率
<div class="page-grow pt7">
  <table class="p7-table">
    <thead><tr><th>介质</th><th>折射率</th><th>介质</th><th>折射率</th></tr></thead>
    <tbody>
      <tr><td>金刚石</td><td>2.42</td><td>氯化钠</td><td>1.54</td></tr>
      <tr><td>二硫化碳</td><td>1.63</td><td>酒精</td><td>1.36</td></tr>
      <tr><td>玻璃</td><td><Latex tex="1.5\sim1.8" /></td><td>水</td><td>1.33</td></tr>
      <tr><td>水晶</td><td>1.55</td><td>空气</td><td>1.000 28</td></tr>
    </tbody>
  </table>
  <div class="mini-note p7-caption">表 几种介质的折射率（<Latex tex="\lambda=589.3\ \text{nm}" />，<Latex tex="t=20\ ^\circ\text{C}" />）</div>
  <div class="tip-hint" v-click="1"><Latex tex="n" /> 越大，光从真空射入时偏折越明显，光在介质中的速度越小。</div>
</div>
---
layout: base-flex
title: 光路可逆
clicks: 1
---
# 光路可逆
<div class="page-grow pt8">
  <div class="ask">光从水中斜射入空气时，折射光线会怎样？</div>
  <div class="p8-grid">
    <div class="p8-fig"><RefractionRaySvg direction="water-to-air" :theta1="35" :n1="1.33" :n2="1" medium-label="水" /></div>
    <div class="divider-l p8-side">
      <div class="p8-line">光从水中射入空气时，折射角大于入射角，折射光线远离法线。</div>
      <div class="p8-line" v-click="1">如果让光沿折射光线反向射入，它会沿原来的入射光线射出。</div>
      <div class="p8-line" v-click="1">在折射现象中，光路也是可逆的。</div>
    </div>
  </div>
</div>
---
layout: base-flex
title: 光疏介质与光密介质
clicks: 1
---
# 光疏介质与光密介质
<div class="page-grow pt9">
  <div class="p9-grid">
    <div class="p9-card">
      <div class="mini-title">光疏介质</div>
      <div class="p9-sub">折射率较小</div>
      <div class="p9-example">空气、水</div>
    </div>
    <div class="p9-card p9-dense">
      <div class="mini-title">光密介质</div>
      <div class="p9-sub">折射率较大</div>
      <div class="p9-example">玻璃、金刚石</div>
    </div>
  </div>
  <div class="p9-rule">光疏 → 光密：折射角小于入射角；光密 → 光疏：折射角大于入射角。</div>
  <div class="tip-hint" v-click="1">光疏与光密是相对的；<Latex tex="n" /> 越大，光速越小，偏折越明显。</div>
</div>
---
layout: base-flex
title: 改变入射角
clicks: 1
---
# 改变入射角
<div class="page-grow pt10">
  <div class="ask">改变入射角，折射角会怎样变化？</div>
  <RefractionDemo />
  <div class="tip-hint" v-click="1">入射角增大，折射角也增大，但 <Latex tex="\theta_2<\theta_1" />。</div>
</div>
---
layout: exercise-split
title: 例题：储油桶
analysisLabel: 解析
clicks: 3
---
<template v-slot:stem>
桶的底面直径与高均为 <Latex tex="d" />。桶内没有油时，从 <Latex tex="A" /> 点恰能看到桶底边缘的 <Latex tex="B" /> 点；桶内油的深度为桶高的一半时，仍沿 <Latex tex="AB" /> 方向看去，恰好看到桶底上的 <Latex tex="C" /> 点，<Latex tex="C" />、<Latex tex="B" /> 相距 <Latex tex="\dfrac{d}{4}" />。求油的折射率和光在油中的速度。
</template>
<template v-slot:fig>
<div class="p11-fig"><OilBarrelSvg :show-analysis="$clicks >= 1" /></div>
</template>
<div class="p11-analysis">
  <div class="p11-line" v-click="1">过 <Latex tex="AB" /> 与油面的交点 <Latex tex="O" /> 作油面的垂线 <Latex tex="NN'" />；由几何关系，<Latex tex="\angle AON=45^\circ" />。</div>
  <div class="p11-line" v-click="2">油面下 <Latex tex="ON'=2CN'" />，所以 <Latex tex="\sin\angle CON'=\dfrac{1}{\sqrt{5}}" />。</div>
  <div class="p11-line" v-click="3"><Latex tex="n=\dfrac{\sin45^\circ}{\sin\angle CON'}=\sqrt{\dfrac{5}{2}}\approx1.58" />；<Latex tex="v=\dfrac{c}{n}\approx1.9\times10^8\ \text{m/s}" />。</div>
</div>
---
layout: base-flex
title: 实验：测量玻璃的折射率
clicks: 2
---
# 实验：测量玻璃的折射率
<div class="page-grow pt12">
  <div class="half-grid p12-grid">
    <div class="p12-fig"><GlassBlockSvg /></div>
    <div class="divider-l p12-steps">
      <div class="p12-step"><span class="step-no">1</span><span class="p12-step-text">在玻璃砖一侧插大头针 <Latex tex="A" />、<Latex tex="B" />，确定入射光线。</span></div>
      <div class="p12-step" v-click="1"><span class="step-no">2</span><span class="p12-step-text">在另一侧插 <Latex tex="C" />、<Latex tex="D" />，确定出射光线，画出玻璃中的折射光线 <Latex tex="OO'" />。</span></div>
      <div class="p12-step" v-click="2"><span class="step-no">3</span><span class="p12-step-text">量出入射角 <Latex tex="\theta_1" /> 和折射角 <Latex tex="\theta_2" />，由 <Latex tex="n=\dfrac{\sin\theta_1}{\sin\theta_2}" /> 求折射率。</span></div>
    </div>
  </div>
</div>
---
layout: exercise-split
title: 例题：光射入玻璃
analysisLabel: 解析
clicks: 3
---
<template v-slot:stem>
光以 <Latex tex="60^\circ" /> 的入射角从空气射入折射率 <Latex tex="n=\sqrt{3}" /> 的玻璃中。折射角是多大？画出光路图。
</template>
<template v-slot:fig>
<div class="p13-fig"><RefractionRaySvg :theta1="60" :n2="1.732" medium-label="玻璃" :show-refracted="$clicks >= 3" /></div>
</template>
<div class="p13-analysis">
  <div class="p13-line" v-click="1">由折射定律 <Latex tex="\dfrac{\sin60^\circ}{\sin\theta_2}=\sqrt{3}" />。</div>
  <div class="p13-line" v-click="2"><Latex tex="\sin\theta_2=\dfrac{\sqrt{3}/2}{\sqrt{3}}=\dfrac{1}{2}" />，所以 <Latex tex="\theta_2=30^\circ" />。</div>
  <div class="p13-line" v-click="3">光路图中，折射光线向法线偏折。</div>
</div>
---
layout: exercise-split
title: 练习：水中的筷子
analysisLabel: 解析
clicks: 2
---
<template v-slot:stem>
将一根筷子竖直插入装有水的玻璃杯中，从水平方向看，浸在水中的那段筷子好像侧移了，而且变粗了。怎样解释？
</template>
<template v-slot:fig>
<ChopstickCupSvg />
</template>
<div class="p14-analysis">
  <div class="p14-line" v-click="1">水中筷子反射的光在水面折射后进入空气，折射光线远离法线；眼睛逆着折射光线看到的是偏折的虚像。</div>
  <div class="p14-line" v-click="2">圆柱形玻璃杯和水相当于柱面透镜，对水中的部分有放大作用，所以看起来变粗。</div>
</div>
---
layout: base-flex
title: 练习：折射率与光速
clicks: 2
---
# 练习：折射率与光速
<div class="page-grow pt15">
  <div class="p15-grid">
    <div class="p15-card">
      <div class="p15-q">玻璃的折射率 <Latex tex="n=1.5" />，光在玻璃中的速度是多少？</div>
      <div class="p15-ans" v-click="1"><Latex tex="v=\dfrac{c}{n}=\dfrac{3.0\times10^8}{1.5}=2.0\times10^8\ \text{m/s}" /></div>
    </div>
    <div class="p15-card">
      <div class="p15-q">金刚石的折射率 <Latex tex="n=2.42" />，光在金刚石中的速度是多少？</div>
      <div class="p15-ans" v-click="1"><Latex tex="v=\dfrac{3.0\times10^8}{2.42}\approx1.2\times10^8\ \text{m/s}" /></div>
    </div>
  </div>
  <div class="tip-hint" v-click="2">折射率越大，光在介质中的速度越小。</div>
</div>
---
layout: base-flex
title: 练习：判断正误
clicks: 3
---
# 练习：判断正误
<div class="page-grow pt16">
  <div class="p16-list">
    <div class="p16-item"><span class="p16-no">1</span><span class="p16-text">光从空气斜射入水中，折射角小于入射角。</span><span class="p16-ans" v-click="1">对</span></div>
    <div class="p16-item"><span class="p16-no">2</span><span class="p16-text">光从水斜射入空气，折射角小于入射角。</span><span class="p16-ans" v-click="2">错，应大于</span></div>
    <div class="p16-item"><span class="p16-no">3</span><span class="p16-text">光垂直射到两种介质的分界面，传播方向不变。</span><span class="p16-ans" v-click="3">对</span></div>
  </div>
</div>
---
layout: base-flex
title: 练习：计算折射角
clicks: 2
---
# 练习：计算折射角
<div class="page-grow pt17">
  <div class="problem">光从空气以 <Latex tex="30^\circ" /> 的入射角射入折射率 <Latex tex="n=1.5" /> 的玻璃。求折射角（<Latex tex="\sin19.5^\circ\approx0.333" />）。</div>
  <div class="p17-steps">
    <div class="p17-line" v-click="1">由 <Latex tex="\dfrac{\sin30^\circ}{\sin\theta_2}=1.5" />，得 <Latex tex="\sin\theta_2=\dfrac{1}{3}" />。</div>
    <div class="p17-line" v-click="2">所以 <Latex tex="\theta_2\approx19.5^\circ" />，折射光线靠近法线。</div>
  </div>
</div>
---
layout: base-flex
title: 课堂小结
clicks: 0
---
# 课堂小结
<div class="page-grow pt18">
  <div class="step-list p18-list">
    <div class="step-item p18-item"><span class="step-no">1</span><div>光从一种介质斜射入另一种介质时，传播方向改变，叫光的折射。</div></div>
    <div class="step-item p18-item"><span class="step-no">2</span><div>折射定律：三线共面、分居法线两侧，<Latex tex="\dfrac{\sin\theta_1}{\sin\theta_2}=n_{12}" />。</div></div>
    <div class="step-item p18-item"><span class="step-no">3</span><div>折射率 <Latex tex="n=\dfrac{\sin\theta_1}{\sin\theta_2}=\dfrac{c}{v}" />，<Latex tex="n>1" />；<Latex tex="n" /> 越大，偏折越明显。</div></div>
    <div class="step-item p18-item"><span class="step-no">4</span><div>折射现象中光路可逆；光疏介质与光密介质是相对的。</div></div>
  </div>
</div>
