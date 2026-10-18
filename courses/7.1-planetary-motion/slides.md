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
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">古人仰望星空，为什么认定天体的运动必然是“最完美、最和谐”的匀速圆周运动？</div>

<div class="split-wide pm-split-text" v-click="1">
<div class="stack">
<div>中国古代的“<strong class="text-accent">天圆地方</strong>”：天圆如张盖，地方如棋局。</div>
<div>日月星辰都挂在这层圆形的“天”上运行——<strong>圆</strong>是最完美的图形，天体的运动当然也该沿圆进行。</div>
</div>
<div class="figure"><TianYuanDiFangSvg /></div>
</div>

<div class="key" v-click="2">于是古人相信：天体的运动必然是最完美、最和谐的<strong>匀速圆周运动</strong>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 地心说与日心说

<div class="page-grow">
<div class="split-wide pm-split-text">
<div class="stack">
<div class="stack" v-click="1">
<div class="mini-title"><mdi-earth />托勒密 · 地心说</div>
<div>地球是宇宙的中心，静止不动；太阳、月球以及其他星体都绕地球运动。</div>
<div class="mini-note">古希腊，约 2 世纪；它符合人们的直接经验。</div>
</div>
<div class="stack" v-click="2">
<div class="mini-title"><mdi-white-balance-sunny />哥白尼 · 日心说</div>
<div>太阳是静止不动的，地球和其他行星都绕太阳运动。</div>
<div class="mini-note">波兰，1543 年发表《天体运行论》。</div>
</div>
</div>
<div class="figure" v-click="1"><GeoHelioSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 第谷与开普勒

<div class="page-grow">
<div class="figure" v-click="1"><HistoryTimelineSvg /></div>

<div class="key key-lead" v-click="2">开普勒在<strong class="text-accent">第谷的观测数据</strong>的基础上<strong class="text-accent">归纳总结</strong>出了行星运动的三条定律——不是“发现”，也不是“发明”。</div>

<div class="mini-note" v-click="2">第谷（丹麦）对火星等行星做了 20 余年的精密观测；开普勒（德国）是他的助手，又用 20 年研究这些观测记录。</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask">行星绕太阳运动的轨道是什么形状？太阳在轨道的什么位置？</div>

<div class="split-wide pm-split-text" v-click="1">
<div class="stack">
<div class="card">
<div class="mini-title"><mdi-vector-ellipse />开普勒第一定律</div>
<div class="text-xl">所有行星绕太阳运动的轨道都是<strong class="text-accent">椭圆</strong>，太阳处在椭圆的<strong class="text-accent">一个焦点</strong>上。</div>
</div>
<div>行星绕太阳运行的轨道严格来说不是圆，而是椭圆。</div>
<div>太阳不在椭圆的<strong>中心</strong>，而在<strong>其中一个焦点</strong>上。</div>
<div>行星与太阳间的距离<strong>不断变化</strong>。</div>
</div>
<div class="figure"><EllipseOrbitSvg :show-geometry="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 认识椭圆

<div class="page-grow">
<div class="split-wide pm-split-text">
<div class="stack">
<div class="ask">把一张画着圆的纸沿一个方向均匀压扁，圆就变成了椭圆。椭圆到底“扁”在哪里？</div>
<div v-click="1">沿一个方向均匀压扁：长轴方向的长度<strong>不变</strong>，短轴方向被压短（<Latex tex="b < a" />）。</div>
<div v-click="1">椭圆上任意一点到<strong>两个焦点</strong>的距离之和等于定长（等于长轴长 <Latex tex="2a" />）——用细绳和铅笔能画出椭圆，靠的就是这个性质。</div>
<div class="mini-note" v-click="2">这个性质的证明在数学课上给出，这里我们直接用。</div>
</div>
<div class="figure" v-click="1"><CircleToEllipseDemo /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 椭圆的几何量

<div class="page-grow">
<div class="split-wide pm-split-text">
<div class="stack">
<div v-click="1">长轴 <Latex tex="2a" />、短轴 <Latex tex="2b" />；它们的一半叫<strong>半长轴 <Latex tex="a" /></strong>与<strong>半短轴 <Latex tex="b" /></strong>（习惯上就用 <Latex tex="a" />、<Latex tex="b" /> 表示）。</div>
<div v-click="1">两个焦点关于中心对称；焦点到中心的距离叫<strong>半焦距 <Latex tex="c" /></strong>，两个焦点之间的距离是<strong>焦距 <Latex tex="2c" /></strong>。</div>
<div class="key" v-click="2"><Latex tex="c^2 + b^2 = a^2" />（直接给出，数学课后会证明）</div>
<div class="mini-note" v-click="2">近日点到太阳的距离是 <Latex tex="a - c" />，远日点到太阳的距离是 <Latex tex="a + c" />。</div>
</div>
<div class="figure" v-click="1"><EllipseGeometrySvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 离心率

<div class="page-grow">
<div class="split-wide pm-split">
<div class="stack">
<div class="ask">离心率 <Latex tex="e = \dfrac{c}{a}" /> 为什么能反映椭圆“扁”的程度？</div>
<div v-click="1"><Latex tex="e = 0" />：两焦点重合，<Latex tex="b = a" />，椭圆退化为<strong>圆</strong>。</div>
<div v-click="1"><Latex tex="e" /> 越大，椭圆越扁；<Latex tex="e" /> 趋近 <Latex tex="1" /> 时，椭圆趋近一条<strong>线段</strong>。</div>
<div class="mini-note" v-click="2">行星轨道的 <Latex tex="e" /> 都很小（地球约 <Latex tex="0.017" />），所以看起来几乎是圆。</div>
</div>
<div class="figure" v-click="1"><EllipseFociDemo /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">行星在近日点附近跑得快，在远日点附近跑得慢。它与太阳的连线在相等的时间内扫过的面积有什么关系？</div>

<div class="split-wide pm-split" v-click="1">
<div class="stack">
<div class="card">
<div class="mini-title"><mdi-chart-timeline-variant />开普勒第二定律</div>
<div class="text-xl">对任意一个行星来说，它与太阳的连线在<strong class="text-accent">相等的时间内扫过的面积相等</strong>。</div>
</div>
<div v-click="2">由此可知：行星在<strong>近日点</strong>的速度最大，在<strong>远日点</strong>的速度最小；图上的每一块扇形都对应相等的时间，面积自然相等。</div>
</div>
<div class="figure"><KeplerSecondLawDemo /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">近日点到太阳的距离最小、远日点最大，而两处的速度不同。这两个速度之间有什么关系？</div>

<div class="split-wide pm-split-text" v-click="1">
<div class="stack">
<div>在极短的时间 <Latex tex="\Delta t" /> 内，行星与太阳的连线扫过的面积可看成三角形：<Latex tex="\Delta A \approx \frac{1}{2}\, r\, v_\perp \Delta t" />（<Latex tex="v_\perp" /> 是速度垂直于连线的分量）。</div>
<div v-click="2">开普勒第二定律说 <Latex tex="\Delta A / \Delta t" /> 不变，所以 <Latex tex="r\, v_\perp" /> 不变；近日点、远日点处的速度都与连线垂直（<Latex tex="v_\perp = v" />），于是：</div>
<div class="key key-lead" v-click="3"><Latex tex="R_1V_1 = R_2V_2" /></div>
<div class="mini-note" v-click="3">月球绕地球的轨道也是椭圆：近地点、远地点同样满足这个关系——离得近时跑得快。</div>
</div>
<div class="figure"><PerihelionSpeedSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="split-wide pm-split">
<div class="stack">
<div class="ask">离太阳越远的行星，公转周期越长。半长轴 <Latex tex="a" /> 与公转周期 <Latex tex="T" /> 之间有没有定量关系？</div>
<div class="card" v-click="2">
<div class="mini-title"><mdi-equal />开普勒第三定律</div>
<div class="text-xl">所有行星轨道的半长轴的<strong class="text-accent">三次方</strong>跟它的公转周期的<strong class="text-accent">二次方</strong>的比都相等：<Latex tex="\dfrac{a^3}{T^2} = k" />。</div>
</div>
<div class="mini-note" v-click="3">比值 <Latex tex="k" /> 对所有行星都相同；换用别的单位只会改变 <Latex tex="k" /> 的数值，不会改变“都相同”。</div>
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
<div class="step-item"><span class="step-no">3</span><div>所有行星轨道半径 <Latex tex="r" /> 的三次方跟它的公转周期 <Latex tex="T" /> 的二次方的比值都相等。</div></div>
</div>
<div class="key key-lead" v-click="2"><Latex tex="\dfrac{r^3}{T^2} = k" /></div>
</div>

---
layout: base-flex
clicks: 4
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line" v-click="1"><b class="text-accent">开普勒第一定律</b>　所有行星绕太阳运动的轨道都是椭圆，太阳处在椭圆的一个焦点上。</div>
<div class="summary-line" v-click="2"><b class="text-accent">开普勒第二定律</b>　对任意一个行星来说，它与太阳的连线在相等的时间内扫过的面积相等（近日点快、远日点慢，<Latex tex="R_1V_1 = R_2V_2" />）。</div>
<div class="summary-line" v-click="3"><b class="text-accent">开普勒第三定律</b>　所有行星轨道的半长轴的三次方跟它的公转周期的二次方的比都相等：<Latex tex="\dfrac{a^3}{T^2} = k" />。</div>
<div class="summary-line" v-click="4">中学阶段把轨道当作<strong>圆</strong>处理：太阳在圆心、行星做匀速圆周运动，<Latex tex="\dfrac{r^3}{T^2} = k" />。</div>
</div>
<div class="key" v-click="4">三条定律都是开普勒在<strong>第谷的观测数据</strong>上<strong>归纳总结</strong>出来的。</div>
</div>

---
layout: exercise-split
clicks: 2
title: 练习一 火星绕日椭圆轨道
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　如图所示为火星绕太阳运动的椭圆轨道，<Latex tex="M" />、<Latex tex="N" />、<Latex tex="P" /> 是火星依次经过的三个位置，<Latex tex="F_1" />、<Latex tex="F_2" /> 为椭圆的两个焦点。火星由 <Latex tex="M" /> 到 <Latex tex="N" /> 和由 <Latex tex="N" /> 到 <Latex tex="P" /> 的过程中，通过的路程相等，火星与太阳中心的连线扫过的面积分别为 <Latex tex="S_1" /> 和 <Latex tex="S_2" />。已知由 <Latex tex="M \to N \to P" /> 过程中，火星速率逐渐减小。下列判断正确的是（　　）</div>

<div class="ex-options">
<div><b>A.</b> 太阳位于焦点 <Latex tex="F_2" /> 处</div>
<div><b>B.</b> <Latex tex="S_1 < S_2" /></div>
<div><b>C.</b> <Latex tex="S_1 = S_2" /></div>
<div><b>D.</b> <Latex tex="S_1 > S_2" /></div>
</div>

</template>

<template v-slot:fig>

<MarsOrbitMNPSvg :show-analysis="$clicks >= 1" />

</template>

<div v-click="1">速率逐渐减小 ⇒ 火星离太阳越来越远 ⇒ 太阳在<strong>左侧焦点 <Latex tex="F_1" /></strong> 上（A 错）。</div>

<div v-click="2"><Latex tex="MN = NP" /> 但 <Latex tex="MN" /> 段速率大 ⇒ 用时短 ⇒ <Latex tex="S_1 < S_2" />（C、D 错）——选 <b class="text-accent">B</b>。</div>

---
layout: exercise-split
clicks: 2
title: 练习二 二十四节气与地球公转
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　二十四节气代表着地球在公转轨道上的二十四个不同位置。如图所示，地球沿椭圆轨道绕太阳运动的四个位置分别对应我国的四个节气，以下说法正确的是（　　）</div>

<div class="ex-options">
<div><b>A.</b> 地球绕太阳做匀速率椭圆轨道运动</div>
<div><b>B.</b> 地球从冬至到春分的时间小于公转周期的四分之一</div>
<div><b>C.</b> 地球绕太阳运行方向（正对纸面）是顺时针</div>
<div><b>D.</b> 秋分时地球公转速度最大</div>
</div>

</template>

<template v-slot:fig>

<SolsticeOrbitSvg :show-analysis="$clicks >= 1" />

</template>

<div v-click="1">地球沿椭圆轨道运行，速度大小不断变化（A 错）；公转方向（正对纸面）是<strong>逆时针</strong>（C 错）。</div>

<div v-click="2">冬至在<strong>近日点</strong>附近、速率较大，从冬至到春分扫过的面积小于四分之一椭圆，用时小于 <Latex tex="\dfrac{T}{4}" />（B 对）；速度最大在近日点附近，不是秋分（D 错）——选 <b class="text-accent">B</b>。</div>

---
layout: exercise-split
clicks: 2
title: 练习三 两颗类地行星的距离之比
---

<template v-slot:stem>

<div><b class="ex-no">练习三</b>　2023 年，天文学家利用凌日系外行星巡天卫星（TESS）的数据找到了恒星 TOI700 系统的第二颗类地行星 TOI700e，其表面可能存有液态水，公转周期为 <Latex tex="28" /> 天；该系统第一颗被发现的类地行星 TOI700d 的公转周期为 <Latex tex="37" /> 天。若两颗行星的轨道均视为圆形，由以上数据可知，TOI700e 与 TOI700d 到其恒星的距离之比约为（　　）</div>

<div class="ex-options">
<div><b>A.</b> <Latex tex="0.3" /></div>
<div><b>B.</b> <Latex tex="0.5" /></div>
<div><b>C.</b> <Latex tex="0.8" /></div>
<div><b>D.</b> <Latex tex="0.9" /></div>
</div>

</template>

<div v-click="1">两颗行星绕同一颗恒星运行，由开普勒第三定律 <Latex tex="\dfrac{r^3}{T^2} = k" /> 可知 <Latex tex="r \propto T^{2/3}" />。</div>

<div v-click="2"><Latex tex="\dfrac{r_{\text{e}}}{r_{\text{d}}} = \left(\dfrac{28}{37}\right)^{2/3} \approx 0.8" />——选 <b class="text-accent">C</b>。</div>

---
layout: exercise-split
clicks: 3
title: 练习四 月球探测器的两种轨道
---

<template v-slot:stem>

<div><b class="ex-no">练习四</b>　月球的半径为 <Latex tex="R" />，甲、乙两种探测器分别绕月球做匀速圆周运动与椭圆运动，两种轨道相切于椭圆轨道的近月点 <Latex tex="A" />。圆轨道距月球表面的高度为 <Latex tex="\dfrac{R}{2}" />，椭圆轨道的远月点 <Latex tex="B" /> 与近月点 <Latex tex="A" /> 之间的距离为 <Latex tex="6R" />。若甲的运动周期为 <Latex tex="T" />，则乙的运动周期为（　　）</div>

<div class="ex-options">
<div><b>A.</b> <Latex tex="3\sqrt{2}T" /></div>
<div><b>B.</b> <Latex tex="3T" /></div>
<div><b>C.</b> <Latex tex="2\sqrt{2}T" /></div>
<div><b>D.</b> <Latex tex="2T" /></div>
</div>

</template>

<template v-slot:fig>

<MoonOrbitCompareSvg :show-analysis="$clicks >= 1" />

</template>

<div v-click="1">甲的圆轨道半径 <Latex tex="r = R + \dfrac{R}{2} = 1.5R" />；乙的椭圆轨道半长轴 <Latex tex="a = \dfrac{AB}{2} = 3R" />。</div>

<div v-click="2">由开普勒第三定律 <Latex tex="\dfrac{r^3}{T^2} = k" />：<Latex tex="\left(\dfrac{a}{r}\right)^3 = \left(\dfrac{T'}{T}\right)^2" />。</div>

<div v-click="3"><Latex tex="T' = \left(\dfrac{3R}{1.5R}\right)^{3/2} T = 2\sqrt{2}\,T" />——选 <b class="text-accent">C</b>。</div>

---
layout: exercise-split
clicks: 2
title: 练习五 地心说与日心说
---

<template v-slot:stem>

<div><b class="ex-no">练习五</b>　探索宇宙的奥秘一直是人类孜孜不倦的追求。下列关于宇宙及星体运动的说法正确的是（　　）</div>

<div class="ex-options">
<div><b>A.</b> 地球是宇宙的中心，太阳、月亮及其他行星都绕地球运动</div>
<div><b>B.</b> 太阳是静止不动的，地球和其他行星都绕太阳运动</div>
<div><b>C.</b> 地球是绕太阳运动的一颗行星</div>
<div><b>D.</b> 日心说是正确的，地心说是错误的</div>
</div>

</template>

<div v-click="1">A 是地心说的内容；B 里“太阳静止不动”也不符合事实——太阳同样在运动；日心说也有它自己的局限（D 错）。</div>

<div v-click="2">地心说与日心说都只是当时对宇宙的认识；地球确实是一颗绕太阳运动的行星——选 <b class="text-accent">C</b>。</div>
