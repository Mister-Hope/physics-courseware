---
theme: default
title: "动量"
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
chapter-no: "1.1"
chapter: "第一章 动量守恒定律"
subtitle: "第一课时"
---

<CoverDecorationSvg />

---
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">把 A 拉起到某一高度后释放，A 与 B 碰撞后，B 能摆到多高？</div>
<div class="half-grid items-center">
<div><PendulumDemo :step="$clicks" /></div>
<div class="stack-tight">
<div class="tip-hint" v-click="1">A 停下，B 摆到与 A 释放时相同的高度。</div>
</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">换用质量更大的 C，仍从同一高度释放，B 能摆到多高？</div>
<div class="half-grid items-center">
<div><PendulumDemo heavy :step="$clicks >= 1 ? 1 : 0" /></div>
<div class="stack-tight">
<div class="tip-hint" v-click="1">B 摆得比 C 释放时更高：碰撞前后，速度之和并不保持不变。</div>
<div class="tip-hint" v-click="2">碰撞前后什么量可能不变？动能之和？质量与速度的乘积之和？</div>
</div>
</div>
</div>

---
clicks: 1
---

# 碰撞中的不变量

<div class="page-grow">
<div class="ask">运动的小车碰静止的小车，碰后粘在一起。碰撞前后，哪个量保持不变？</div>
<div class="half-grid items-center">
<div><CartCollisionSvg :step="$clicks" /></div>
<div class="stack-tight"><CartDataTable mode="raw" /></div>
</div>
<div class="tip-hint" v-click="1">分别算一算：动能之和变了吗？质量与速度的乘积之和变了吗？</div>
</div>

---
clicks: 2
---

# 碰撞中的不变量

<div class="page-grow">
<div class="ask">先算“质量与速度的乘积”之和。</div>
<CartDataTable mode="mv" :step="$clicks" />
<div class="tip-hint" v-click="2">在误差范围内，碰撞前后 <Latex tex="mv" /> 之和基本不变。</div>
</div>

---
clicks: 2
---

# 碰撞中的不变量

<div class="page-grow">
<div class="ask">再算动能之和，和上一页比较。</div>
<CartDataTable mode="ek" :step="$clicks" />
<div class="tip-hint" v-click="2">动能之和明显减小；碰撞前后保持不变的，是 <Latex tex="mv" /> 之和。</div>
</div>

---
clicks: 2
---

# 动量

<div class="page-grow">
<div class="ask">这个在碰撞中保持不变的 <Latex tex="mv" />，该怎样定义？</div>
<div class="half-grid items-center">
<div><MomentumVectorSvg :show-p="$clicks >= 1" /></div>
<div class="stack">
<DefinitionBox term="动量" v-click="1">
物体的质量 <Latex tex="m" /> 与速度 <Latex tex="v" /> 的乘积，叫作物体的动量，用 <Latex tex="p" /> 表示：<Latex tex="p=mv" />。
</DefinitionBox>
<div class="tip-hint" v-click="2">动量是矢量，方向与速度方向相同；单位是 <Latex tex="\text{kg·m/s}" />。</div>
</div>
</div>
</div>
