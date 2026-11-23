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
<div class="tip-hint" v-click="1">B 摆得比 C 释放时更高：碰撞前后，速度之和并不相等。</div>
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

---
clicks: 2
---

# 动量

<div class="page-grow">
<div class="ask">一维运动中，怎样用正负号表示动量的方向？</div>
<div class="half-grid items-center">
<div><MomentumSignSvg :show-p="$clicks >= 1" :show-sign="$clicks >= 2" /></div>
<div class="stack-tight">
<div class="tip-hint" v-click="1">动量的方向与速度方向相同。</div>
<div class="tip-hint" v-click="2">先规定正方向，再用正负号表示方向。</div>
</div>
</div>
</div>

---
layout: exercise-split
title: "例题：钢球撞墙"
clicks: 3
---

<template v-slot:stem>

一个质量为 <Latex tex="0.1\ \text{kg}" /> 的钢球，以 <Latex tex="6\ \text{m/s}" /> 的速度水平向右运动，碰到坚硬墙壁后，以 <Latex tex="6\ \text{m/s}" /> 的速度水平向左反弹。求钢球碰撞前后的动量变化量。

</template>

<template v-slot:fig>

<WallReboundSvg :show-p="$clicks >= 1" :show-p-after="$clicks >= 2" />

</template>

<div class="stack-tight">
<div v-click="1">取水平向右为正方向。</div>
<div v-click="1"><Latex tex="p=mv=0.6\ \text{kg·m/s}" /></div>
<div v-click="2">碰后 <Latex tex="v'=-6\ \text{m/s}" />。</div>
<div v-click="2"><Latex tex="p'=mv'=-0.6\ \text{kg·m/s}" /></div>
<div v-click="3"><Latex tex="\Delta p=p'-p=-1.2\ \text{kg·m/s}" />。</div>
<div v-click="3">负号表示 <Latex tex="\Delta p" /> 的方向水平向左。</div>
</div>

---
clicks: 2
---

# 动量的变化量

<div class="page-grow">
<div class="ask">求动量变化量，一般分几步？</div>
<div class="half-grid">
<div class="stack-tight">
<div class="mini-title" v-click="1">① 规定正方向</div>
<div class="mini-title" v-click="1">② 用带符号的数值表示 <Latex tex="p" /> 和 <Latex tex="p'" /></div>
<div class="mini-title" v-click="1">③ 计算 <Latex tex="\Delta p=p'-p" /></div>
<div class="mini-title" v-click="1">④ 负号表示方向与正方向相反</div>
</div>
<div class="stack-tight">
<div class="tip-hint" v-click="2">同一直线上、方向不变：质量为 <Latex tex="2\ \text{kg}" /> 的物体速度由 <Latex tex="3\ \text{m/s}" /> 增大到 <Latex tex="6\ \text{m/s}" />，<Latex tex="\Delta p=+6\ \text{kg·m/s}" />。</div>
</div>
</div>
</div>

---
clicks: 1
---

# 动量与动能

<div class="page-grow">
<div class="ask">动量 <Latex tex="p=mv" /> 与动能 <Latex tex="E_{\mathrm{k}}=\tfrac12 mv^2" /> 有什么不同？</div>
<div class="half-grid">
<div class="card">
<div class="mini-title">动量 <Latex tex="p=mv" /></div>
<div class="mini-note">矢量，方向与速度方向相同；单位 <Latex tex="\text{kg·m/s}" />。</div>
</div>
<div class="card">
<div class="mini-title">动能 <Latex tex="E_{\mathrm{k}}=\tfrac12 mv^2" /></div>
<div class="mini-note">标量，只有大小；单位 <Latex tex="\text{J}" />。</div>
</div>
</div>
<div class="tip-hint" v-click="1">速度方向改变时，动量改变，动能不变；速度大小改变时，两者都改变。</div>
</div>

---
clicks: 2
---

# 动量与动能

<div class="page-grow">
<div class="ask">已知动量 <Latex tex="p" />，能求动能 <Latex tex="E_{\mathrm{k}}" /> 吗？</div>
<div class="stack">
<div v-click="1" class="card">
<div class="mini-note">由 <Latex tex="p=mv" /> 得 <Latex tex="v=\dfrac{p}{m}" />，代入 <Latex tex="E_{\mathrm{k}}=\tfrac12 mv^2" />：</div>
<div class="mini-title"><Latex tex="E_{\mathrm{k}}=\dfrac{p^2}{2m}" /></div>
</div>
<div v-click="2" class="tip-hint">反过来，<Latex tex="p=\sqrt{2mE_{\mathrm{k}}}" />。质量不同的物体，动量相同时动能不一定相同。</div>
</div>
</div>

---
clicks: 1
---

# 动量与动能

<div class="page-grow">
<div class="ask">改变质量或速度，<Latex tex="p" /> 与 <Latex tex="E_{\mathrm{k}}" /> 各怎样变？</div>
<MomentumSlider />
<div class="tip-hint" v-click="1">速度加倍：<Latex tex="p" /> 加倍，<Latex tex="E_{\mathrm{k}}" /> 变为 4 倍；质量加倍：<Latex tex="p" /> 加倍，<Latex tex="E_{\mathrm{k}}" /> 也加倍。</div>
</div>
