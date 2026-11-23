---
theme: default
title: "实验：验证动量守恒定律"
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
chapter-no: "1.4"
chapter: "第一章 动量守恒定律"
subtitle: 两个方案：气垫导轨 · 斜槽末端小球
---

<CoverDecorationSvg />

---
title: 碰撞中的动量守恒条件
---

<div class="page-grow">
<div class="ask-lead">碰撞只持续几毫秒，动量为什么还能守恒？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><strong>时间极短</strong>：重力、摩擦力的冲量 <Latex tex="F\Delta t" /> 小到可以忽略</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div><strong>内力极大</strong>：碰撞瞬间两物体之间的作用力远大于外力</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div><strong>条件满足</strong>：系统所受外力的矢量和为 0，或远小于内力</div></div>
<div class="tip-hint" v-click="3">要验证的就是：<Latex tex="m_1 v_1' + m_2 v_2' = m_1 v_1 + m_2 v_2" /> 在误差范围内成立。</div>
</div>

---
title: 实验思路：先回答三个问题
clicks: 4
---

<div class="page-grow">
<div class="ask">设计实验之前，先把这三个问题想清楚。</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div><div class="mini-title">系统包括哪些物体？</div><div>滑块 A、B，或者小球 1、2 —— 只看这两个物体组成的系统。</div></div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><div class="mini-title">怎样让外力近似为 0？</div><div>气垫导轨把摩擦减到极小；斜槽方案里两球都沿水平方向运动。</div></div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div><div class="mini-title">需要测量哪些物理量？</div><div>两个质量 <Latex tex="m_1" />、<Latex tex="m_2" />，以及碰撞前后的四个速度。</div></div></div>
<div class="step-item" v-click="4"><span class="step-no">4</span><div><div class="mini-title">数据怎样处理？</div><div>分别算出碰前、碰后的总动量，再比较。</div></div></div>
</div>
</div>

---
title: 方案一：气垫导轨
clicks: 3
---

<div class="page-grow-tight">
<div class="ask">导轨上的碰撞，怎样做到“几乎没有摩擦”？</div>
<div class="figure fig-mid">
<AirTrackSetup :step="$clicks" />
</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>先<strong>调平</strong>：滑块放在导轨上能静止不动</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>光电门测挡光时间，用 <Latex tex="v = \dfrac{d}{\Delta t}" /> 算速度</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>碰前、碰后<strong>各测一次</strong>，两次速度要带方向</div></div>
</div>

---
title: 一个装置，做出三种碰撞
clicks: 3
---

<div class="page-grow-tight">
<div class="ask">同一个气垫导轨上，三种碰撞分别改变了什么？</div>
<div class="figure fig-mid">
<CollisionCases :step="$clicks" />
</div>
<div class="tip-hint" v-click="3">碰后分开、碰后粘连、由静止反向分开 —— 三种情形都满足守恒，结论才可靠。</div>
</div>

---
title: 方案二：斜槽末端的小球碰撞
clicks: 2
---

<div class="page-grow-tight">
<div class="ask">斜槽末端为什么要水平？铅垂线又有什么用？</div>
<div class="figure fig-sm">
<InclineSetup :step="$clicks" />
</div>
<div class="flow-line" v-click="1"><span class="flow-dot is-blue"></span><div><strong>末端水平</strong>：两球碰前、碰后都只做平抛运动</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div><strong>铅垂线</strong>：把槽口投影到地面，作为量水平距离的起点</div></div>
</div>
