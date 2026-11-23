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
<div v-click="1" class="step-line"><span class="key-lead">系统</span>　相互作用的物体组成的整体。</div>
<div v-click="2" class="step-line"><span class="key-lead">内力</span>　系统中物体间的作用力，如 <Latex tex="F_1" />、<Latex tex="F_2" />。</div>
<div v-click="3" class="step-line"><span class="key-lead">外力</span>　系统以外的物体施加的力，如重力。</div>
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
