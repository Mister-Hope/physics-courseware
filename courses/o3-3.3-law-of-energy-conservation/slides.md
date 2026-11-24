---
theme: default
title: "能量守恒定律"
titleTemplate: "%s"
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
chapter-no: "3.3"
chapter: "第三章 热力学定律"
subtitle: "不同形式的能量之间怎样转化"
---

<CoverDecorationSvg />

---
title: 饮水小鸭是永动机吗
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div class="stack">
<div class="ask ask-lead">“饮水小鸭”喝一口水就直立，<br />过一会儿又俯下身去喝水。</div>
<div class="mini-title" v-click="1">它是一架永动机吗？</div>
<div class="step-line" v-click="1">不是。它靠周围环境提供的热量工作。</div>
<div class="step-line" v-click="2">头部毛毡吸水后蒸发，从空气中吸热，乙醚汽化、液柱上升，重心上移，小鸭倾倒。</div>
<div class="step-line" v-click="3">倒地后气体相通，乙醚流回，重心下移，小鸭重新站起。</div>
</div>
<div style="width:100%">
<DuckSvg :show-labels="$clicks >= 1" />
</div>
</div>
</div>

---
title: 探索能量守恒的足迹
clicks: 3
---

## 探索能量守恒的足迹

<table class="data-table">
<thead>
<tr><th style="width: 6.5rem">年份</th><th>科学发现</th></tr>
</thead>
<tbody>
<tr><td>1798</td><td>伦福德的实验表明热的本质是运动</td></tr>
<tr><td>1820</td><td>奥斯特发现电流的磁效应</td></tr>
<tr><td>1821</td><td>塞贝克发现温差电现象</td></tr>
<tr v-click="1"><td>1831</td><td>法拉第发现电磁感应现象</td></tr>
<tr v-click="1"><td>1836</td><td>盖斯发现化学反应放出的热量与反应步骤无关</td></tr>
<tr v-click="1"><td>1840</td><td>焦耳发现电流的热效应</td></tr>
<tr v-click="2"><td>1842</td><td>迈尔表述了能量守恒定律</td></tr>
<tr v-click="2"><td>1843</td><td>焦耳测定做功与传热的关系</td></tr>
<tr v-click="2"><td>1847</td><td>亥姆霍兹在理论上概括和总结能量守恒定律</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="3">不同领域接连发现联系，建立统一规律的时机成熟了。</div>

---
title: 不同领域的科学家
clicks: 3
---

## 不同领域的科学家

<div class="ask">为什么不同领域的科学家，会得到同一个结论？</div>
<div class="four-col">
<div class="card">
<div class="mini-title">盖斯</div>
<div class="step-line">化学家，1836 年：反应放出的热量与反应步骤无关。</div>
</div>
<div class="card">
<div class="mini-title">焦耳</div>
<div class="step-line">物理学家，1843 年：精确测定做功与传热的关系。</div>
</div>
<div class="card">
<div class="mini-title">迈尔</div>
<div class="step-line">医生，1842 年：从人体和海水现象提出能量守恒。</div>
</div>
<div class="card">
<div class="mini-title">亥姆霍兹</div>
<div class="step-line">物理学家，1847 年：从理论上概括和总结。</div>
</div>
</div>
<div class="step-line" v-click="1">迈尔是公认的第一个提出能量守恒思想的人。</div>
<div class="step-line" v-click="2">亥姆霍兹从永动机不可能制成这一事实出发，考察了各种能量之间的关系。</div>
<div class="tip-hint" v-click="3">分立的领域连成一体，能量守恒定律建立起来了。</div>

---
title: 能量守恒定律
clicks: 3
---

## 能量守恒定律

<DefinitionBox term="能量守恒定律">
能量既不会凭空产生，也不会凭空消失，它只能从一种形式转化为其他形式，或者从一个物体转移到别的物体，在转化或转移的过程中，能量的总量保持不变。
</DefinitionBox>
<div class="step-line" v-click="1">不可能凭空产生，也不可能凭空消失。</div>
<div class="step-line" v-click="2">两种方式：<span class="def-term">转化</span>——从一种形式变为另一种形式；<span class="def-term">转移</span>——从这一个物体到另一个物体。</div>
<div class="tip-hint" v-click="3">守恒的是能量的总量，不是某一种形式的能量。</div>

---
title: 它统一了哪些规律
clicks: 3
---

## 能量守恒与已有的规律

<div class="half-grid" style="align-items: stretch">
<div class="card stack-tight">
<div class="mini-title">机械能守恒定律</div>
<div class="step-line">系统只有重力和弹力做功时，动能与势能相互转化，总量保持不变。</div>
<div class="formula-center"><Latex tex="E_{\text{k}} + E_{\text{p}} = \text{常量}" display /></div>
</div>
<div class="card stack-tight">
<div class="mini-title">热力学第一定律</div>
<div class="step-line">做功和传热改变系统的内能，内能与外界能量的转化中总量保持不变。</div>
<div class="formula-center"><Latex tex="\Delta U = W + Q" display /></div>
</div>
</div>
<div class="step-line" v-click="1">它们都是能量守恒定律的具体表现。</div>
<div class="tip-hint" v-click="2">能量守恒把力学、热学、电磁学、光学、化学、生命科学连成一个整体。</div>

---
title: 能量的转化与转移
clicks: 3
---

## 能量的转化与转移

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: center">
<div style="width:100%">
<EnergyChainSvg :step="$clicks + 1" />
</div>
<div class="stack-tight side-note">
<div class="ask">这些过程中，能量怎样转化或转移？</div>
<div class="step-line" v-click="1">转化：能量从一种形式变成另一种形式。</div>
<div class="step-line" v-click="2">转移：同种能量从一个物体传到另一个物体。</div>
<div class="tip-hint" v-click="3">改变的只是形式或归属，总量始终不变。</div>
</div>
</div>
</div>

---
title: 第一类永动机
clicks: 2
---

## 第一类永动机

<div class="page-grow">
<div class="half-grid" style="align-items: center">
<div class="stack">
<div class="ask">不消耗燃料、不接电源，机器能一直对外做功吗？</div>
<DefinitionBox term="第一类永动机">
不需要任何动力或燃料，却能不断对外做功的机器。
</DefinitionBox>
<div class="step-line" v-click="1">历史上人们设计过许多这样的机器，图中是其中一种。</div>
<div class="tip-hint" v-click="2">为此目的的任何尝试都失败了。</div>
</div>
<div style="width:100%">
<PerpetualMotionSvg :stage="0" />
</div>
</div>
</div>

---
title: 永动机为什么不可能制成
clicks: 4
---

## 永动机为什么不可能制成

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); align-items: center">
<div style="width:100%">
<PerpetualMotionSvg :stage="$clicks" />
</div>
<div class="stack">
<div class="ask">这些机器为什么全都失败了？</div>
<div class="step-line" v-click="1">轮子转动要克服摩擦，机械能不断变成内能。</div>
<div class="step-line" v-click="2">没有燃料或动力输入，就没有能量补充。</div>
<div class="step-line" v-click="3">总能量只会减少，不会增加。</div>
<div class="line-judge" v-click="4">违背能量守恒定律，所以永远不可能制成。</div>
</div>
</div>
</div>

---
title: 失败的探索也有价值
clicks: 2
---

## 失败的探索也有价值

<div class="page-grow page-around">
<div class="stack">
<div class="quote-line">1775 年，法国科学院宣布“不再审查有关永动机的一切设计”。</div>
<div class="quote-line" v-click="1">冯端：应建立一个无名英雄纪念碑，铭文写“纪念为实现永动机奋斗而失败的人们”。</div>
<div class="step-line" v-click="1">失败让人们走出迷梦，转去研究各种能量形式相互转化的规律。</div>
<div class="tip-hint" v-click="2">正是这些失败，促成了能量守恒定律的建立。</div>
</div>
</div>

---
title: 能量守恒经受住了检验
clicks: 3
---

## 能量守恒经受住了检验

<div class="page-grow page-around">
<div class="stack">
<div class="ask">能量守恒定律会不会有例外？</div>
<div class="step-line" v-click="1">20 世纪 30 年代初，有些实验测到的能量似乎“少了一点”。</div>
<div class="step-line" v-click="2">泡利根据能量守恒定律，预言存在一种尚未被发现的中性粒子——中微子。</div>
<div class="step-line" v-click="3">中微子后来得到证实，原来“漏掉”的能量补上了，总能量依然守恒。</div>
<div class="tip-hint" v-click="3">相对论建立后人们又认识到，能量与质量相关联。</div>
</div>
</div>

---
title: 19 世纪的三大发现
clicks: 2
---

## 19 世纪的三大发现

<div class="three-col">
<div class="card">
<div class="mini-title">细胞学说</div>
<div class="step-line">生物都由细胞构成。</div>
</div>
<div class="card">
<div class="mini-title">生物进化论</div>
<div class="step-line">物种在自然选择中演化。</div>
</div>
<div class="card card-accent">
<div class="mini-title">能量守恒定律</div>
<div class="step-line">一切过程中能量的总量不变。</div>
</div>
</div>
<div class="step-line" v-click="1">恩格斯把能量守恒定律与另外两项发现并列为 19 世纪的三大发现。</div>
<div class="tip-hint" v-click="2">它是自然界最普遍、最重要的基本定律之一，适用于力、热、电、光、化学、生命等一切领域。</div>

---
title: 例题：饮料的能量
layout: exercise-split
clicks: 4
---

<template v-slot:stem>

一罐 $500\ \text{mL}$ 的饮料，标签上注有“$180\ \text{kJ}/100\ \text{mL}$”的能量参考值。这瓶饮料的能量相当于一个成年人爬多少层楼所做的功？

</template>

<div class="step-line" v-click="1">饮料的能量 <Latex tex="E = 180\ \text{kJ}/100\ \text{mL} \times 5 = 9.0 \times 10^{5}\ \text{J}" />。</div>
<div class="step-line" v-click="2">设成年人质量 <Latex tex="m = 60\ \text{kg}" />，每层楼高 <Latex tex="h = 3\ \text{m}" />，<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^{2}" />：每层做功 <Latex tex="W_0 = mgh = 1.8 \times 10^{3}\ \text{J}" />。</div>
<div class="step-line" v-click="3">层数 <Latex tex="n = \dfrac{E}{W_0} = \dfrac{9.0 \times 10^{5}}{1.8 \times 10^{3}} = 500" />。</div>
<div class="key-lead" v-click="4">约相当于爬 500 层楼（估算值与所取质量和层高有关）。</div>

---
title: 例题：太阳辐射能
layout: exercise-split
clicks: 4
---

<template v-slot:stem>

一个横截面积是 $300\ \text{cm}^{2}$ 的矮圆筒，内壁涂黑、外壁保温，内装水 $0.6\ \text{kg}$。阳光垂直圆筒口照射 $2\ \text{min}$ 后，水温升高 $1\ \text{℃}$。估算阳光直射时地面上每平方米每分钟接收的太阳能量。水的比热容 $c = 4.2 \times 10^{3}\ \text{J/(kg}\cdot\text{℃)}$。

</template>

<div class="step-line" v-click="1">水吸收的热量 <Latex tex="Q = cm\Delta t = 4.2 \times 10^{3} \times 0.6 \times 1\ \text{J} = 2.52 \times 10^{3}\ \text{J}" />。</div>
<div class="step-line" v-click="2">圆筒口面积 <Latex tex="S = 300\ \text{cm}^{2} = 3.0 \times 10^{-2}\ \text{m}^{2}" />，照射时间 <Latex tex="t = 2\ \text{min}" />。</div>
<div class="step-line" v-click="3">每平方米每分钟接收的能量 <Latex tex="\dfrac{Q}{St} = \dfrac{2.52 \times 10^{3}}{3.0 \times 10^{-2} \times 2}" /></div>
<div class="key-lead" v-click="4">约 <Latex tex="4.2 \times 10^{4}\ \text{J/(m}^{2}\text{·min)}" />，即每平方米每分钟约 <Latex tex="4.2 \times 10^{4}\ \text{J}" />。</div>

---
title: 练习：这些设想符合能量守恒吗
layout: exercise-split
clicks: 3
---

<template v-slot:stem>

下面的设想符合能量守恒定律吗？请简述理由。

（1）利用永久磁铁间的作用力，造一台永远转动的机械。

（2）造一条没有动力系统的船在水面上行驶。

（3）通过太阳照射飞机，使飞机不带燃料也能飞行。

</template>

<div class="step-line" v-click="1">（1）不符合。永久磁铁的磁场不能提供新的能量，转动的机械能只会因摩擦而减少。</div>
<div class="step-line" v-click="2">（2）不符合。船行驶要克服水的阻力，没有动力就没有能量补充。</div>
<div class="step-line" v-click="3">（3）符合。太阳辐射的能量可以转化为飞机的机械能。</div>

---
title: 本节的规律
---

## 本节的规律

<div class="stack">
<div class="summary-line"><strong>能量守恒定律</strong>　能量不会凭空产生，也不会凭空消失，转化或转移中总量保持不变。</div>
<div class="summary-line"><strong>两种方式</strong>　转化改变能量的形式，转移改变能量所属的物体。</div>
<div class="summary-line"><strong>第一类永动机</strong>　不需要动力或燃料却不断对外做功，违背能量守恒。</div>
<div class="summary-line"><strong>普适性</strong>　从力学、热学到电磁、化学、生命与核过程，能量守恒都成立。</div>
<div class="tip-hint">能量守恒定律是自然界最普遍、最重要的基本定律之一。</div>
</div>

---
title: 下一节：过程的方向
clicks: 2
clickAnimation: none
---

<div class="page-grow page-around">
<div class="stack" style="max-width: 800px; margin: 0 auto; text-align: center; align-items: center">
<div class="ask ask-lead">能量守恒只说明总量不变。<br />它能告诉我们某个过程能不能自发发生吗？</div>
<div class="mini-title" v-click="1">不能。这是过程的方向问题。</div>
<div class="step-line" v-click="1">热量总是自发地从高温物体传到低温物体，反过来却不会自发发生。</div>
<div class="tip-hint" v-click="2">3.4 热力学第二定律</div>
</div>
</div>
