---
theme: default
title: "弹性碰撞和非弹性碰撞"
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
chapter-no: "1.5"
chapter: "第一章 动量守恒定律"
---

<CoverDecorationSvg />

---
title: 碰撞中的动能
clicks: 1
---

<div class="page-grow">
<div class="ask-lead">碰撞前后，动量守恒。<br>那总动能也一定守恒吗？</div>
<div class="stack" v-click="1">
<div>陨石撞击地球，在地表砸出深坑；网球被球拍击出，速度由零变得很大。</div>
<div class="ask">这些碰撞中，系统的总动能怎样变化？</div>
</div>
</div>

---
clicks: 2
---

# 实验数据里的动能

<div class="page-grow">
<div class="ask">第一章第 1 节测过两辆小车的碰撞。碰撞前后的总动能相等吗？</div>
<div v-click="1"><CollisionDataTable /></div>
<div class="tip-hint" v-click="2">三组数据的动量都守恒，总动能却都减少了近一半。</div>
</div>

---
clicks: 1
---

# 怎样减少动能损失

<div class="page-grow">
<div class="ask">两辆小车相撞，怎样让碰撞前后的动能几乎不变？</div>
<div class="figure" style="max-width: 780px; margin-inline: auto;"><CartsCollisionSvg /></div>
<div class="info-hint" v-click="1">在车上装弹性碰撞架：碰撞时弹簧先被压缩，再把两车推开，动能几乎都还了回来。</div>
</div>

---
clicks: 2
---

# 碰撞的分类

<div class="page-grow">
<DefinitionBox term="弹性碰撞" tone="gold" v-click="1">碰撞前后系统的总动能不变。</DefinitionBox>
<DefinitionBox term="非弹性碰撞" tone="blue" v-click="2">碰撞后系统的总动能减少。</DefinitionBox>
<div v-click="2">橡皮泥球相撞后粘在一起，就是非弹性碰撞。</div>
</div>

---
clicks: 2
---

# 碰后粘在一起

<div class="page-grow">
<div class="ask">两物体碰后粘在一起，以共同速度运动。这种碰撞有什么特点？</div>
<DefinitionBox term="完全非弹性碰撞" tone="blue" v-click="1">碰后两物体粘在一起、以共同速度运动，是非弹性碰撞中动能损失最大的情形。</DefinitionBox>
<div v-click="2">碰后速度相同，这是判断完全非弹性碰撞的标志。</div>
<div v-click="2">共同速度由动量守恒求出：<Latex tex="v' = \dfrac{m_1 v_1 + m_2 v_2}{m_1 + m_2}" /></div>
</div>

---
title: 粘在一起的碰撞
clicks: 3
---

# 粘在一起的碰撞

<div class="page-grow">
<div class="ask">光滑水平面上，两个质量都是 <Latex tex="m" /> 的物体正碰，碰后粘在一起。总动能损失了多少？</div>
<div class="half-grid coll-grid-eq">
<div class="figure"><CollisionBeforeAfterSvg :v1="1" :v2="0" :v1p="0.5" :v2p="0" stuck stuck-tex="2m" /></div>
<div class="stack">
<div v-click="1">动量守恒：<Latex tex="mv = 2mv'" />，得 <Latex tex="v' = \dfrac{v}{2}" />。</div>
<div v-click="2">碰前 <Latex tex="E_{\text{k}} = \tfrac{1}{2}mv^2" />。</div>
<div v-click="2">碰后 <Latex tex="E_{\text{k}}' = \tfrac{1}{2}(2m)\left(\tfrac{v}{2}\right)^2 = \tfrac{1}{2}E_{\text{k}}" />。</div>
<div class="tip-hint" v-click="3">总动能损失 50%。</div>
</div>
</div>
</div>

---
clicks: 1
---

# 正碰

<div class="page-grow">
<div class="ask">两球相碰时，速度一定沿着两球心的连线吗？</div>
<div class="figure" style="max-width: 720px; margin-inline: auto;"><CollisionBeforeAfterSvg :v1="1" :v2="0" :v1p="0.3" :v2p="0.7" /></div>
<div class="info-hint" v-click="1">碰前、碰后的速度都沿两球心的连线，这样的碰撞叫作正碰（对心碰撞）。本节只讨论正碰，方向用正负号表示。</div>
</div>

---
clicks: 2
---

# 弹性碰撞的方程

<div class="page-grow">
<div class="ask">质量 <Latex tex="m_1" /> 的球以 <Latex tex="v_1" /> 与静止的 <Latex tex="m_2" /> 正碰，是弹性碰撞。碰后两球速度各是多大？</div>
<div class="stack">
<div v-click="1">动量守恒：<Latex tex="m_1 v_1 = m_1 v_1' + m_2 v_2'" /></div>
<div v-click="1">动能守恒：<Latex tex="\tfrac{1}{2}m_1 v_1^2 = \tfrac{1}{2}m_1 {v_1'}^2 + \tfrac{1}{2}m_2 {v_2'}^2" /></div>
<div class="info-hint" v-click="2">两个方程、两个未知数，可以解。但把式子平方再相减，运算很繁。</div>
</div>
</div>

---
clicks: 3
---

# 解这两个方程

<div class="page-grow">
<div class="ask">动量式移项，动能式乘 2 后移项，再把两式相除——能得到什么？</div>
<div class="stack">
<div v-click="1">动量：<Latex tex="m_1(v_1 - v_1') = m_2 v_2'" /></div>
<div v-click="1">动能：<Latex tex="m_1(v_1^2 - {v_1'}^2) = m_2 {v_2'}^2" /></div>
<div v-click="2">两式相除：<Latex tex="v_1 + v_1' = v_2'" />，即 <Latex tex="v_1 = v_2' - v_1'" />。</div>
<div class="tip-hint" v-click="3">碰后两球分离的速度，与碰前接近的速度大小相等、方向相反。</div>
</div>
</div>

---
clicks: 3
---

# 特例：两球质量相等

<div class="page-grow">
<div class="ask">如果 <Latex tex="m_1 = m_2" />，碰后两球速度各是多大？</div>
<div class="half-grid">
<div class="figure"><CollisionBeforeAfterSvg :v1="1" :v2="0" :v1p="0" :v2p="1" /></div>
<div class="stack">
<div v-click="1">代入公式：<Latex tex="v_1' = 0" />，<Latex tex="v_2' = v_1" />。</div>
<div v-click="2">碰后 <Latex tex="m_1" /> 停下，<Latex tex="m_2" /> 以 <Latex tex="m_1" /> 原来的速度前进——两球交换了速度。</div>
<div class="tip-hint" v-click="3">冰壶比赛里质量相同的冰壶正碰，就是这个情形。</div>
</div>
</div>
</div>

---
clicks: 4
---

# 特例：质量相差很大

<div class="page-grow">
<div class="stack">
<div v-click="1"><Latex tex="m_1 \gg m_2" />：<Latex tex="v_1' \approx v_1" />，<Latex tex="v_2' \approx 2v_1" />。</div>
<div v-click="1"><Latex tex="m_1 \ll m_2" />：<Latex tex="v_1' \approx -v_1" />，<Latex tex="v_2' \approx 0" />。</div>
<div v-click="2">系数 <Latex tex="\dfrac{m_1 - m_2}{m_1 + m_2}" /> 在 <Latex tex="m_2" /> 远小于 <Latex tex="m_1" /> 时接近 <Latex tex="1" />，在 <Latex tex="m_2" /> 远大于 <Latex tex="m_1" /> 时接近 <Latex tex="-1" />。</div>
<div class="tip-hint" v-click="3">乒乓球撞上保龄球：球被原速弹回，保龄球几乎不动。</div>
</div>
</div>

---
clicks: 1
---

# 算一算：质量比

<div class="page-grow">
<div class="ask">质量比不同，碰后两球的速度怎样变化？</div>
<MassRatioExplorer />
<div class="tip-hint" v-click="1">质量相等时 <Latex tex="m_1" /> 停下；<Latex tex="m_1" /> 越轻，碰后越容易被弹回。</div>
</div>

---
clicks: 4
---

# 碰撞的合理性

<div class="page-grow coll-top">
<div class="ask">碰后两球的速度，只要动量守恒就可以任意取吗？</div>
<div class="stack coll-checks">
<div class="coll-check" v-click="1"><div class="coll-check-title">动量守恒</div><div class="coll-check-body">碰前碰后的总动量不变：<Latex tex="m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'" /></div></div>
<div class="coll-check" v-click="2"><div class="coll-check-title">动能不增</div><div class="coll-check-body">碰后的总动能不增加：<Latex tex="E_k' \le E_k" />，弹性碰撞取等号。</div></div>
<div class="coll-check" v-click="3"><div class="coll-check-title">不能穿越</div><div class="coll-check-body">后球不能超过前球：<Latex tex="v_1' \le v_2'" /></div></div>
</div>
<div class="tip-hint" v-click="4">三个条件同时满足，碰后的速度才可能实现。</div>
</div>

---
layout: exercise-split
title: 碰后速度可能是多少？
clicks: 2
---

<template v-slot:stem>

质量 $m$ 的 A 球以速度 $v$ 与静止的、质量 $3m$ 的 B 球正碰。碰后 B 球的速度可能是 $0.6v$ 吗？可能是 $0.4v$ 吗？

</template>

<div class="stack coll-cases">
<div v-click="1">
<div class="coll-case-title">若 <Latex tex="v_2' = 0.6v" /></div>
<div>由动量守恒得 <Latex tex="v_1' = -0.8v" />，碰后 <Latex tex="E_k' = \dfrac{1}{2}m(0.8v)^2 + \dfrac{1}{2} \cdot 3m(0.6v)^2 = 1.72 E_k > E_k" />：动能反而增大，<span class="coll-no">不可能</span>。</div>
</div>
<div v-click="2">
<div class="coll-case-title">若 <Latex tex="v_2' = 0.4v" /></div>
<div>由动量守恒得 <Latex tex="v_1' = -0.2v" />，碰后 <Latex tex="E_k' = \dfrac{1}{2}m(0.2v)^2 + \dfrac{1}{2} \cdot 3m(0.4v)^2 = 0.52 E_k < E_k" />：动能没增加，两球也没穿越，<span class="coll-yes">可能</span>。</div>
</div>
</div>

---
layout: exercise-split
title: 气垫导轨上的碰撞
clicks: 2
---

<template v-slot:stem>

气垫导轨上，质量 $400\ \text{g}$ 的滑块以 $15\ \text{cm/s}$ 的速度向右运动，与迎面而来、质量 $200\ \text{g}$、速度 $10\ \text{cm/s}$ 的滑块相碰，碰后粘在一起。求碰后速度的大小和方向，以及系统损失的机械能。

</template>

<div v-click="1">规定向右为正，<Latex tex="v_1 = 0.15\ \text{m/s}" />，<Latex tex="v_2 = -0.10\ \text{m/s}" />。</div>

<div v-click="1"><Latex tex="v' = \dfrac{m_1v_1 + m_2v_2}{m_1 + m_2} = \dfrac{0.40 \times 0.15 - 0.20 \times 0.10}{0.40 + 0.20}\ \text{m/s} \approx 0.067\ \text{m/s}" /></div>

<div v-click="1">方向向右，与 <Latex tex="400\ \text{g}" /> 滑块的初速度方向相同。</div>

<div v-click="2"><Latex tex="E_k \approx 5.5 \times 10^{-3}\ \text{J},\quad E_k' \approx 1.3 \times 10^{-3}\ \text{J},\quad \Delta E_k \approx 4.2 \times 10^{-3}\ \text{J}" /></div>

---
layout: exercise-split
title: 弹性正碰
clicks: 1
---

<template v-slot:stem>

质量 $m$ 的塑料球以 $10\ \text{m/s}$ 的速度与静止的钢球发生弹性正碰，钢球的质量是塑料球的 $4$ 倍。求碰后两球的速度。

</template>

<div v-click="1"><Latex tex="v_1' = \dfrac{m - 4m}{m + 4m} \times 10\ \text{m/s} = -6\ \text{m/s}" /></div>

<div v-click="1"><Latex tex="v_2' = \dfrac{2m}{m + 4m} \times 10\ \text{m/s} = 4\ \text{m/s}" /></div>

<div v-click="1">塑料球被弹回，速度大小 <Latex tex="6\ \text{m/s}" />；钢球沿原方向运动，速度 <Latex tex="4\ \text{m/s}" />。</div>

---
clicks: 3
---

# 为什么要用轻核给中子减速？

<div class="page-grow coll-top">
<div class="ask">中子与静止的原子核弹性正碰后，速度变成多大？</div>
<div class="stack coll-neutron">
<div v-click="1">设中子质量 <Latex tex="m" />、原子核质量 <Latex tex="M" />，由动量守恒和动能守恒得 <Latex tex="v' = \dfrac{m - M}{m + M}\,v" />。</div>
<div v-click="2">原子核很重（<Latex tex="M \gg m" />）时，<Latex tex="v' \approx -v" />：中子几乎原速弹回，动能损失很少。</div>
<div v-click="3">原子核与中子质量相近（<Latex tex="M \approx m" />）时，<Latex tex="v' \approx 0" />：动能几乎全部传给对方。</div>
<div class="tip-hint" v-click="3">所以反应堆用水、石蜡等含氢材料给中子减速；查德威克也用这种碰撞测出了中子的质量。</div>
</div>
</div>

---
clicks: 4
---

# 小结

<div class="page-grow coll-top">
<div class="stack coll-summary">
<div v-click="1"><span class="coll-num">1</span>按动能是否变化分类：<Latex tex="E_k' = E_k" /> 是弹性碰撞，<Latex tex="E_k' < E_k" /> 是非弹性碰撞；碰后粘在一起是完全非弹性碰撞。</div>
<div v-click="2"><span class="coll-num">2</span>完全非弹性碰撞：<Latex tex="v' = \dfrac{m_1v_1 + m_2v_2}{m_1 + m_2}" />，损失的动能最多。</div>
<div v-click="3"><span class="coll-num">3</span>弹性正碰（<Latex tex="m_2" /> 静止）：<Latex tex="v_1' = \dfrac{m_1 - m_2}{m_1 + m_2}v_1" />，<Latex tex="v_2' = \dfrac{2m_1}{m_1 + m_2}v_1" />；两球质量相等时交换速度。</div>
<div v-click="4"><span class="coll-num">4</span>一个碰撞结果要成立，必须同时满足：动量守恒、动能不增、两球不能穿越。</div>
</div>
</div>
