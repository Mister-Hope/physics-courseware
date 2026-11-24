---
theme: default
title: "动量守恒定律"
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
chapter-no: "1.3"
chapter: "第一章 动量守恒定律"
subtitle: "相互作用的两个物体，总动量怎样变化"
---

<CoverDecorationSvg />

---
title: 两个物体相互作用时
clicks: 2
clickAnimation: none
---

<div class="page-grow page-around">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr); align-items: center">
<div class="stack">
<div class="ask ask-lead">两辆小车碰撞，<br />碰撞前后的总动量会变吗？</div>
<div v-click="1" class="step-line">单个物体的动量变化，由动量定理给出：<Latex tex="F\Delta t = p' - p" /></div>
<div v-click="2" class="step-line">同时研究相互作用的两物体，<br />会得到什么？</div>
</div>
<div style="width: 100%">
<CollisionSvg />
</div>
</div>
</div>

---
title: 碰撞过程中的两个物体
clicks: 3
clickAnimation: none
---

<div class="page-grow page-around">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<CollisionSvg :state="$clicks === 0 ? 'before' : $clicks === 1 ? 'during' : 'after'" />
</div>
<div class="stack">
<div class="step-line">A、B 在同一直线上同向运动，<Latex tex="v_2 > v_1" />，B 追上 A 发生碰撞。</div>
<div v-click="1" class="step-line">碰撞瞬间，A 受 B 的力 <Latex tex="F_1" />，B 受 A 的力 <Latex tex="F_2" />，作用时间 <Latex tex="\Delta t" /> 很短。</div>
<div v-click="2" class="step-line">碰后速度分别为 <Latex tex="v_1'" /> 和 <Latex tex="v_2'" />。</div>
</div>
</div>
</div>

---
title: 用动量定理分别研究两个物体
clicks: 4
clickAnimation: none
---

# 分别对两个物体用动量定理

<div class="page-grow page-around">
<div class="stack">
<div class="step-line">对 A：<Latex tex="F_1\Delta t = m_1 v_1' - m_1 v_1" /></div>
<div v-click="1" class="step-line">对 B：<Latex tex="F_2\Delta t = m_2 v_2' - m_2 v_2" /></div>
<div v-click="2" class="step-line">牛顿第三定律：<Latex tex="F_1 = -F_2" />，作用时间又相同，所以 <Latex tex="\Delta p_1 = -\Delta p_2" />。</div>
<div v-click="3" class="key-lead">移项得 <Latex tex="m_1 v_1' + m_2 v_2' = m_1 v_1 + m_2 v_2" /></div>
</div>
</div>

---
title: 碰撞前后动量之和不变
clicks: 3
clickAnimation: none
---

# 碰撞前后的动量之和

<div class="page-grow page-around">
<div class="stack" style="text-align: center; align-items: center">
<div style="width: 100%">
<Latex tex="m_1 v_1' + m_2 v_2' = m_1 v_1 + m_2 v_2" display />
</div>
<div v-click="1" class="ask">碰撞后两物体的动量之和，等于碰撞前两物体的动量之和。</div>
<div v-click="2" class="step-line">一个物体的动量减少多少，另一个就增加多少：<Latex tex="\Delta p_1 = -\Delta p_2" />。</div>
<div v-click="3" class="tip-hint">这个关系对碰撞过程中的任意两个时刻都成立，不只是碰撞前后。</div>
</div>
</div>

---
title: 系统、内力与外力
clicks: 3
clickAnimation: none
---

<div class="page-grow page-around">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<CollisionSvg state="during" show-system />
</div>
<div class="stack">
<div class="ask">把 A、B 看成一个整体，<br />它的动量怎样变化？</div>
<div v-click="1" class="step-line"><strong>系统</strong>　相互作用的物体组成的整体。</div>
<div v-click="2" class="step-line"><strong>内力</strong>　系统中物体间的作用力，如 <Latex tex="F_1" />、<Latex tex="F_2" />。</div>
<div v-click="3" class="step-line"><strong>外力</strong>　系统以外的物体施加的力，如重力。</div>
</div>
</div>
</div>

---
title: 动量守恒定律
clicks: 3
clickAnimation: none
---

<div class="page-grow page-around">
<div class="stack">
<div class="ask ask-lead">系统在什么情况下总动量保持不变？</div>
<div v-click="1">
<DefinitionBox term="动量守恒定律">如果一个系统不受外力，或者所受外力的矢量和为 0，这个系统的总动量保持不变。</DefinitionBox>
</div>
<div v-click="2" style="text-align: center">
<Latex tex="p' = p" display />
</div>
<div v-click="3" class="tip-hint">守恒的是系统的总动量；系统内每个物体的动量可以变。</div>
</div>
</div>

---
title: 两车之间的弹簧
clicks: 3
clickAnimation: none
---

# 静止的两辆小车

<div class="page-grow page-around">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<SpringCartsSvg :expanded="$clicks >= 2" />
</div>
<div class="stack">
<div class="ask">烧断细线后，两车的总动量增加了吗？</div>
<div v-click="1" class="step-line">系统只受重力和地面的支持力，二者相互平衡。</div>
<div v-click="2" class="step-line">两车的动量大小相等、方向相反，总动量仍为 0。</div>
<div v-click="3" class="tip-hint">系统内物体之间的内力，不会改变系统的总动量。</div>
</div>
</div>
</div>

---
title: 动量守恒的适用条件
clicks: 4
clickAnimation: none
---

# 动量守恒的适用条件

<div class="page-grow page-around">
<div class="stack">
<div class="step-line"><strong>不受外力</strong>　系统与外界没有相互作用。</div>
<div v-click="1" class="step-line"><strong>合外力为零</strong>　所受外力的矢量和为 0，如重力和支持力相互平衡。</div>
<div v-click="2" class="step-line"><strong>近似守恒</strong>　碰撞、爆炸中内力远大于外力，外力可以忽略。</div>
<div v-click="3" class="step-line"><strong>分方向守恒</strong>　外力在某个方向上的合力为零，该方向动量守恒。</div>
<div v-click="4" class="warn-hint">动量守恒是矢量式：列方程前先规定正方向，把速度写成带正负号的量。</div>
</div>
</div>

---
title: 某一方向的动量守恒
clicks: 3
clickAnimation: none
---

# 某一方向的动量守恒

<div class="page-grow page-around">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div style="width: 100%">
<WedgeBallSvg />
</div>
<div class="stack">
<div class="step-line">斜面体放在光滑水平面上，小球沿斜面下滑。</div>
<div v-click="1" class="step-line">水平方向：地面对斜面体没有摩擦力，系统水平方向不受外力。</div>
<div v-click="2" class="step-line">小球向右的动量增加多少，<br />斜面体向左的动量就增加多少。</div>
<div v-click="3" class="step-line">竖直方向：小球受重力，合外力不为零，动量不守恒。</div>
</div>
</div>
</div>

---
title: 用动量守恒定律解题
clicks: 3
clickAnimation: none
---

# 用动量守恒定律解题

<div class="page-grow page-around">
<div class="stack">
<div class="step-line"><strong>①</strong>　明确研究对象：哪些物体组成一个系统。</div>
<div v-click="1" class="step-line"><strong>②</strong>　判断守恒条件：系统所受外力的矢量和是否为零。</div>
<div v-click="2" class="step-line"><strong>③</strong>　规定正方向，把各速度写成带正负号的量。</div>
<div v-click="3" class="step-line"><strong>④</strong>　列动量守恒方程 <Latex tex="p' = p" />，求解并说明方向。</div>
</div>
</div>

---
title: 碰撞前后，动量怎样分配
clickAnimation: none
---

<div class="page-grow page-around">
<div class="stack">
<div class="ask">A（<Latex tex="2\ \text{kg}" />）以 <Latex tex="4\ \text{m/s}" /> 撞上静止的 B（<Latex tex="3\ \text{kg}" />），<br />碰后 A 慢下来，它减少的动量去哪了？</div>
<div style="width: 100%">
<MomentumLab />
</div>
</div>
</div>

---
layout: exercise-split
title: 例题：货车碰撞后连接在一起
clicks: 4
---

<template v-slot:stem>

质量 $m_1 = 1.8 \times 10^{4}\ \text{kg}$ 的货车以 $v_1 = 2\ \text{m/s}$ 的速度在平直轨道上行驶，与前方静止的质量 $m_2 = 2.2 \times 10^{4}\ \text{kg}$ 的货车碰撞后连接在一起。求碰后两车共同的速度。

</template>

<div v-click="1" class="step-line">碰撞时两车之间的内力远大于轨道摩擦力，可近似认为动量守恒。</div>
<div v-click="2" class="step-line">以 <Latex tex="v_1" /> 的方向为正方向，由动量守恒：<Latex tex="m_1 v_1 = (m_1 + m_2) v" /></div>
<div v-click="3" class="step-line"><Latex tex="v = \dfrac{m_1 v_1}{m_1 + m_2} = \dfrac{1.8 \times 10^{4} \times 2}{4.0 \times 10^{4}}\ \text{m/s} = 0.9\ \text{m/s}" /></div>
<div v-click="4" class="key-lead">方向与 <Latex tex="v_1" /> 相同，两车一起向前运动。</div>

---
layout: exercise-split
title: 例题：炸裂后的火箭
clicks: 4
---

<template v-slot:stem>

质量为 $m$ 的火箭以速度 $v$ 沿水平方向飞行，某时刻炸裂成两部分。质量为 $m_1$ 的部分以速度 $v_1$ 沿相反方向运动，求另一部分的速度 $v_2$。

</template>

<template v-slot:fig>

<RocketBurstSvg />

</template>

<div v-click="1" class="step-line">爆炸力是内力，远大于重力，可近似认为动量守恒。</div>
<div v-click="2" class="step-line">以 <Latex tex="v" /> 的方向为正方向：<Latex tex="mv = m_1 v_1 + (m - m_1) v_2" />，其中 <Latex tex="v_1" /> 沿反方向、代入为负值。</div>
<div v-click="3" class="step-line"><Latex tex="v_2 = \dfrac{mv - m_1 v_1}{m - m_1}" /></div>
<div v-click="4" class="key-lead">算得 <Latex tex="v_2 > 0" />，另一部分仍沿原方向飞行。</div>

---
layout: exercise-split
title: 练习：冰面上互推的两人
clicks: 3
---

<template v-slot:stem>

甲、乙两人静止在光滑的冰面上，甲的质量为 $45\ \text{kg}$，乙的质量为 $50\ \text{kg}$。甲推乙后，两人各向相反方向滑动。求甲、乙的速度大小之比。

</template>

<div v-click="1" class="step-line">两人组成的系统所受合外力为零，总动量守恒，仍为 0。</div>
<div v-click="2" class="step-line"><Latex tex="0 = m_{\text{甲}} v_{\text{甲}} - m_{\text{乙}} v_{\text{乙}}" />，即 <Latex tex="m_{\text{甲}} v_{\text{甲}} = m_{\text{乙}} v_{\text{乙}}" /></div>
<div v-click="3" class="key-lead"><Latex tex="\dfrac{v_{\text{甲}}}{v_{\text{乙}}} = \dfrac{m_{\text{乙}}}{m_{\text{甲}}} = \dfrac{50}{45} = \dfrac{10}{9}" />，质量大的乙速度小。</div>

---
layout: exercise-split
title: 练习：相向碰撞后的质量比
clicks: 4
---

<template v-slot:stem>

甲、乙两物体在光滑水平面上相向运动，甲的速度为 $6\ \text{m/s}$，乙的速度为 $2\ \text{m/s}$。碰撞后两物体都反向运动，速度大小都是 $4\ \text{m/s}$。求甲、乙的质量之比。

</template>

<div v-click="1" class="step-line">水平面光滑，系统动量守恒。</div>
<div v-click="2" class="step-line">以甲原来运动的方向为正方向：</div>
<div v-click="3" class="step-line" style="text-align: center"><Latex tex="6 m_{\text{甲}} - 2 m_{\text{乙}} = -4 m_{\text{甲}} + 4 m_{\text{乙}}" /></div>
<div v-click="4" class="key-lead"><Latex tex="10 m_{\text{甲}} = 6 m_{\text{乙}}" />，所以 <Latex tex="m_{\text{甲}} : m_{\text{乙}} = 3 : 5" />。</div>

---
title: 动量守恒定律的意义
clicks: 2
clickAnimation: none
---

# 为什么动量守恒很重要

<div class="page-grow page-around">
<div class="stack">
<div class="step-line">只涉及始末两个状态：不必知道碰撞过程中力怎样变化、作用了多长时间。</div>
<div v-click="1" class="step-line">牛顿运动定律不适用的情形（微观粒子、接近光速的运动），动量守恒仍然成立。</div>
<div v-click="2" class="tip-hint">动量守恒是自然界最基本的规律之一。</div>
</div>
</div>

---
title: 本节的规律
clickAnimation: none
---

# 本节的规律

<div class="page-grow page-around">
<div class="stack">
<div class="summary-line"><strong>定律</strong>　如果一个系统不受外力，或者所受外力的矢量和为 0，这个系统的总动量保持不变。</div>
<div class="summary-line"><strong>表达式</strong>　<Latex tex="p' = p" />，矢量式，列式前先规定正方向。</div>
<div class="summary-line"><strong>条件</strong>　不受外力；合外力为零；内力远大于外力时近似守恒；某方向合外力为零时该方向守恒。</div>
<div class="summary-line"><strong>推导</strong>　对 A、B 分别用动量定理，再由牛顿第三定律得到 <Latex tex="\Delta p_1 = -\Delta p_2" />。</div>
</div>
</div>

---
title: 下一节：验证动量守恒
clicks: 1
clickAnimation: none
---

<div class="page-grow page-around">
<div class="stack" style="max-width: 780px; margin: 0 auto; text-align: center; align-items: center">
<div class="ask ask-lead">动量守恒定律，能用实验检验吗？</div>
<div v-click="1" class="mini-title">用气垫导轨上的滑块碰撞，测出碰前、碰后的质量和速度。</div>
<div v-click="1" class="tip-hint">1.4 实验：验证动量守恒定律</div>
</div>
</div>
