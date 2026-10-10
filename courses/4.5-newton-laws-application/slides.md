---
theme: default
title: "牛顿运动定律的应用"
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
chapter-no: "4.5"
chapter: 第四章 运动和力的关系
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">列车进站时，怎样才能准确停在站台上标注的车门位置？</div>

<div class="stack" v-click="1">
<div>要让列车在<b>规定的距离内</b>刚好停下，车载系统先得算出这段减速的加速度是多少。</div>
<div v-click="2">而加速度由制动力决定 —— 运动学先提出要求，力学再给出答案。</div>
</div>

<div class="key key-lead" v-click="3">把运动情况和受力情况连起来，正是牛顿第二定律的用武之地。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 解题的两条路径

<div class="page-grow">
<div class="ask">已知受力求运动、已知运动求力，分别走这条链上的哪一段？</div>

<BridgeChain :step="$clicks" />

<div class="key" v-click="3">两条路都绕不开同一个中间站：<b>加速度</b>。求运动要先求 <Latex tex="a" />，求力也要先求 <Latex tex="a" />。</div>
</div>

---
layout: base-flex
---

# 两类问题的解题步骤

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title"><mdi-arrow-right /> 从受力求运动</div>
<div>① 选定研究对象，做受力分析</div>
<div>② 求合力：定正方向，正交分解</div>
<div>③ 由 <Latex tex="F = ma" /> 求出加速度 <Latex tex="a" /></div>
<div>④ 用运动学公式求 <Latex tex="v" />、<Latex tex="x" />、<Latex tex="t" /></div>
</div>
<div class="stack divider-l">
<div class="mini-title"><mdi-arrow-left /> 从运动求受力</div>
<div>① 选定研究对象，分析它的运动</div>
<div>② 用运动学公式求出加速度 <Latex tex="a" /></div>
<div>③ 做受力分析：定正方向，正交分解</div>
<div>④ 由 <Latex tex="F = ma" /> 求出未知力</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 整体法与隔离法

<div class="page-grow">
<div class="ask">什么时候能把几个物体当成一个整体？什么时候必须把它们拆开？</div>

<div class="two-cases" v-click="1">
<div class="case-item">
<div class="case-name">整体法</div>
<div>系统内各物体的<b>加速度相同</b>（大小、方向都相同）时，把系统当成一个物体列 <Latex tex="F_{\text{合}} = ma" />。</div>
<div class="mini-note">方程里只有外力，不出现物体间的内力</div>
</div>
<div class="case-item">
<div class="case-name">隔离法</div>
<div>要求物体之间的作用力，或各物体<b>加速度不同</b>（大小不同，或方向不同）时，逐个拆开列方程。</div>
<div class="mini-note">内力这时才出现在方程里</div>
</div>
</div>

<div class="key" v-click="2">先用整体法求出共同的加速度，再隔离求出内力，是最省力的顺序；加速度方向不同时，只能隔离。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题一：跨过定滑轮的连接体

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><PulleyConnectedSvg :show-forces="$clicks >= 1" /></div>
<div class="stack divider-l solution-stack">
<div class="ask">定滑轮跨着轻绳，两端分别挂质量 <Latex tex="m" /> 和 <Latex tex="3m" /> 的物块。绳不可伸长、与滑轮无摩擦，求两物块的加速度和绳的张力。</div>
<div v-click="1">绳不可伸长，两物块的加速度<b>大小相同、方向相反</b>（<Latex tex="3m" /> 向下、<Latex tex="m" /> 向上）：不同向，只能隔离。</div>
<div v-click="2">绳上张力处处相等，设为 <Latex tex="F_T" />。隔离 <Latex tex="3m" />：<Latex tex="3mg - F_T = 3ma" />；隔离 <Latex tex="m" />：<Latex tex="F_T - mg = ma" />。</div>
<div v-click="3">两式联立解得 <Latex tex="a = \frac{g}{2}" />，<Latex tex="F_T = \frac{3}{2}mg" />。</div>
<div class="key" v-click="4">先看加速度方向决定用整体还是隔离；绳的张力，就是把两边连起来的那个量。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 例题二：剪断最上端的绳

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><CutThreeBallSvg :step="$clicks" /></div>
<div class="stack divider-l solution-stack">
<div class="ask">绳系甲（<Latex tex="2m" />），甲下用绳系乙（<Latex tex="2m" />），乙下用弹簧系丙（<Latex tex="m" />），系统静止。剪断最上端绳的瞬间，三个球的加速度各是多大？</div>
<div v-click="1">弹簧的形变来不及改变，弹力仍是 <Latex tex="mg" />：向上拉丙、向下拉甲。丙的合外力为零，<Latex tex="a_{\text{丙}} = 0" />。</div>
<div v-click="2">绳的张力可以突变 —— 那甲、乙之间那根绳，此刻还绷得紧吗？</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题二：剪断最上端的绳

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><CutThreeBallSvg :step="$clicks >= 1 ? 3 : 1" /></div>
<div class="stack divider-l solution-stack">
<div class="ask">假设甲、乙之间的绳仍然绷紧，它们一起向下加速，加速度设为 <Latex tex="a" />。</div>
<div v-click="1">对甲、乙整体：<Latex tex="4mg + mg = 4ma" />，得 <Latex tex="a = \frac{5}{4}g = 1.25g" />，方向向下。</div>
<div v-click="2">回验假设：对乙列式 <Latex tex="2mg + F_T = 2m \cdot \frac{5}{4}g" />，得 <Latex tex="F_T = 0.5mg > 0" /> —— 绳确实绷紧。</div>
<div class="key" v-click="3">先分清哪些力会突变、哪些不突变，再逐个列 <Latex tex="F = ma" />；算完还要回头检验自己设的"绳还绷着"。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题三：小车里的单摆

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><CartPendulumSvg :show-forces="$clicks >= 1" /></div>
<div class="stack divider-l solution-stack">
<div class="ask">小车上固定倒 L 形支架，顶端用轻绳悬挂小球。车沿水平方向运动时，悬线偏离竖直方向，偏角为 <Latex tex="\theta" />。求小车的加速度，并判断它的运动。</div>
<div v-click="1">小球只受重力 <Latex tex="mg" /> 与沿绳的拉力 <Latex tex="F_T" />；它的加速度沿水平方向，所以合力水平向左。</div>
<div v-click="2">竖直方向 <Latex tex="F_T\cos\theta = mg" />，水平方向 <Latex tex="F_T\sin\theta = ma" />，两式相除得 <Latex tex="a = g\tan\theta" />。</div>
<div v-click="3">合力向左 ⇒ 小车可能向左匀加速，也可能向右匀减速（刹车）。</div>
<div class="key" v-click="4">合力方向就是加速度方向：由它定方向，再由偏角 <Latex tex="\theta" /> 读出加速度的大小。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 临界态：恰好开始相对滑动

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><BoardBlockSvg :show-forces="$clicks >= 1" /></div>
<div class="stack divider-l solution-stack">
<div class="ask">光滑水平面上放一块长木板 <Latex tex="M" />，板上放物块 <Latex tex="m" />，两者间的最大静摩擦力为 <Latex tex="F_{\max}" />。水平恒力 <Latex tex="F" /> 拉木板，<Latex tex="F" /> 多大时物块恰好开始相对滑动？</div>
<div v-click="1">一起加速时，物块靠静摩擦力获得加速度：<Latex tex="a = \frac{F}{M + m}" />，需要的静摩擦力 <Latex tex="F_f = ma" />。</div>
<div v-click="2">静摩擦力有上限 <Latex tex="F_f \le F_{\max}" />，物块的加速度最大只能到 <Latex tex="a_{\max} = \frac{F_{\max}}{m}" />。</div>
<div v-click="3">令 <Latex tex="a = a_{\max}" />，得 <Latex tex="F = \frac{(M + m)F_{\max}}{m}" />。超过这个值，物块就跟不上木板。</div>
<div class="key" v-click="4">"恰好"意味着某个力到了极值：先找<b>谁的加速度有上限</b>、上限由哪个力决定。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><b>两条路</b>——受力 ⇌ <Latex tex="a" /> ⇌ 运动：一段用 <Latex tex="F = ma" />，一段用运动学公式，中间站都是加速度。</div>
<div class="summary-line"><b>整体法与隔离法</b>——加速度相同的系统用整体法；求内力、或加速度方向不同时用隔离法。</div>
<div class="summary-line"><b>瞬时性</b>——弹簧（弹性形变）的弹力不突变，绳、杆、接触面的弹力可以突变。</div>
<div class="summary-line"><b>临界态</b>——"恰好"意味着某个力达到了极值，把它翻译成加速度的边界。</div>
</div>

<div class="key">先看清已知的是受力还是运动，再顺着那条路走到 <Latex tex="a" />。</div>
</div>
