---
theme: default
title: "行星的运动"
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
chapter-no: "7.1"
chapter: "第七章 万有引力与宇宙航行"
subtitle: 开普勒三定律 · 圆轨道近似
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">古人仰望星空，为什么认定天体的运动必然是“最完美、最和谐”的匀速圆周运动？地心说与日心说又各自说了什么？</div>

<div class="half-grid" v-click="1">
<div class="stack">
<div class="mini-title"><mdi-earth />地心说</div>
<div>地球是宇宙的中心，静止不动；太阳、月球以及其他星体都绕地球运动。</div>
<div class="mini-note">它符合人们的直接经验。</div>
</div>
<div class="stack divider-l">
<div class="mini-title"><mdi-white-balance-sunny />日心说</div>
<div>太阳是静止不动的，地球和其他行星都绕太阳运动。</div>
<div class="mini-note">它似乎与人们的生活经验不相符合。</div>
</div>
</div>

<div class="key key-lead" v-click="2">经过长期论争，日心说战胜了地心说，最终被接受。</div>

<div class="ask" v-click="3">但两派都把天体的运动看得很神圣，认为它必然是最完美、最和谐的匀速圆周运动——行星运动果真如此吗？</div>
</div>

---
layout: base-flex
clicks: 3
---

# 开普勒第一定律

<div class="page-grow">
<div class="split-wide pm-split">
<div class="stack">
<div class="ask">开普勒用 20 年时间研究第谷的行星观测记录：按“匀速圆周运动”算出的数据总与观测不符，只有假设轨道是椭圆才能解释这种差别。行星的轨道是什么形状？太阳又在椭圆的哪个位置？</div>
<div class="key" v-click="3">所有行星绕太阳运动的轨道都是<strong>椭圆</strong>，太阳处在椭圆的<strong>一个焦点</strong>上。</div>
<div class="mini-note" v-click="3">行星与太阳的距离随位置不断变化。</div>
</div>
<div class="figure" v-click="1"><EllipseOrbitSvg :show-geometry="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 绘制椭圆

<div class="page-grow">
<div class="split-wide pm-split">
<div class="stack">
<div class="ask">细绳两端系在两枚图钉上，铅笔贴着细绳滑动、并始终保持绳张紧，画出的轨迹就是椭圆，图钉留下的痕迹是椭圆的焦点。保持绳长不变，让两焦点不断靠近：椭圆的形状怎样变化？两焦点重合时，半长轴变成了什么？</div>
<div class="key" v-click="2">两焦点越靠近，椭圆越接近<strong>圆</strong>；两焦点重合时退化为圆，半长轴 <Latex tex="a" /> 变成圆的<strong>半径</strong>。</div>
</div>
<div class="figure" v-click="1"><EllipseFociDemo /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 开普勒第二定律

<div class="page-grow">
<div class="split-wide pm-split">
<div class="stack">
<div class="ask">行星在近日点附近跑得快，在远日点附近跑得慢。那么，它与太阳的连线在相等的时间内扫过的面积有什么关系？</div>
<div class="key" v-click="2">对任意一个行星来说，它与太阳的连线在<strong>相等的时间内扫过的面积相等</strong>。</div>
<div v-click="3">由此可知：行星在近日点的速度最大，在远日点的速度最小。</div>
</div>
<div class="figure" v-click="1"><KeplerSecondLawDemo /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 开普勒第三定律

<div class="page-grow">
<div class="split-wide pm-split">
<div class="stack">
<div class="ask">离太阳越远的行星，公转周期越长。半长轴 <Latex tex="a" /> 与公转周期 <Latex tex="T" /> 之间有没有定量的关系？</div>
<div class="key" v-click="2">所有行星轨道的半长轴的三次方跟它的公转周期的二次方的比都相等：<Latex tex="\dfrac{a^3}{T^2} = k" />。</div>
<div class="mini-note" v-click="3">比值 <Latex tex="k" /> 对所有行星都相同；换用别的单位只会改变 <Latex tex="k" /> 的数值，不会改变“都相同”这一事实。</div>
</div>
<div class="figure" v-click="1"><KeplerThirdLawTable /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 轨道与圆

<div class="page-grow">
<div class="ask">行星的轨道严格来说是椭圆。它离圆到底有多远？</div>
<div class="figure" v-click="1"><OrbitNearCircleSvg /></div>
<div class="key" v-click="2">行星的轨道与圆十分接近——中学阶段的研究中，我们按圆轨道处理。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 按圆轨道处理

<div class="page-grow">
<div class="ask">若把行星的轨道当作圆，开普勒定律会变成什么样子？</div>
<div class="step-list" v-click="1">
<div class="step-item"><span class="step-no">1</span><div>行星绕太阳运动的轨道十分接近圆，太阳处在<strong>圆心</strong>。</div></div>
<div class="step-item"><span class="step-no">2</span><div>对某一行星来说，它绕太阳做圆周运动的角速度（或线速度）大小不变，即行星做<strong>匀速圆周运动</strong>。</div></div>
<div class="step-item"><span class="step-no">3</span><div>所有行星轨道半径的三次方跟它的公转周期的二次方的比值都相等。</div></div>
</div>
<div class="key key-lead" v-click="2"><Latex tex="\dfrac{r^3}{T^2} = k" /></div>
</div>

---
layout: base-flex
clicks: 4
---

# 课堂小结

<div class="page-grow">
<div class="three-col">
<div class="stack" v-click="1">
<div class="mini-title"><mdi-vector-ellipse />第一定律</div>
<div>轨道是椭圆，太阳在一个焦点上。</div>
<div class="mini-note">行星到太阳的距离不断变化</div>
</div>
<div class="stack" v-click="2">
<div class="mini-title"><mdi-chart-timeline-variant />第二定律</div>
<div>连线在相等时间内扫过相等的面积。</div>
<div class="mini-note">近日点快，远日点慢</div>
</div>
<div class="stack" v-click="3">
<div class="mini-title"><mdi-equal />第三定律</div>
<div><Latex tex="\dfrac{a^3}{T^2} = k" />，<Latex tex="k" /> 与行星无关。</div>
<div class="mini-note">按圆轨道处理即 <Latex tex="\dfrac{r^3}{T^2} = k" /></div>
</div>
</div>

<div class="key" v-click="4">前两条定律回答行星“怎样运动”，第三定律给出周期与半长轴之间的定量关系；按圆轨道处理时，半长轴 <Latex tex="a" /> 换成轨道半径 <Latex tex="r" />。</div>
</div>
