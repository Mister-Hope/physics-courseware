---
theme: default
title: "反冲现象 火箭"
subtitle: "从反冲现象到火箭"
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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "1.6"
chapter: "第一章 动量守恒定律"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 章鱼和乌贼怎样游动
---

<div class="page-grow pt2">
  <div class="ask-lead p2-ask">章鱼、乌贼先把水吸入体腔，再用力把水喷出。<br>它们为什么要喷水？</div>
  <div class="p2-fig"><SquidJetSvg /></div>
  <div class="tip-hint" v-click="1">喷水方向与身体运动方向相反。</div>
</div>

---
---

# 反冲现象

<div class="page-grow pt3">
  <div class="ask p3-ask">发射炮弹、步枪射击时，为什么炮身或枪身会向后退？</div>
  <div class="half-grid p3-grid">
    <div class="p3-case">
      <mdi-fire class="icon-xl p3-icon" />
      <div class="p3-title">发射炮弹</div>
      <div class="p3-text">炮弹向前飞出，炮身向后退。</div>
    </div>
    <div class="p3-case">
      <mdi-pistol class="icon-xl p3-icon" />
      <div class="p3-title">步枪射击</div>
      <div class="p3-text">子弹向前飞出，枪身向后运动。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">一个物体分成两部分，一部分向前运动，另一部分向相反方向运动。</div>
</div>

---
---

# 反冲的动量解释

<div class="page-grow pt4">
  <div class="half-grid p4-grid">
    <div class="p4-fig"><RecoilCannonSvg :show-arrows="$clicks >= 2" /></div>
    <div class="divider-l p4-side">
      <div class="ask p4-ask">炮弹射出后，炮身为什么向后退？</div>
      <div class="p4-line" v-click="1">射击前，炮弹和炮身都静止，总动量为 0。</div>
      <div class="p4-line" v-click="2">射击时，内力远大于外力，系统动量守恒。</div>
      <div class="p4-line" v-click="3">炮弹向前，炮身向后，总动量仍为 0。</div>
    </div>
  </div>
</div>

---
---

# 反冲速度

<div class="page-grow pt5">
  <div class="ask p5-ask">炮弹和炮身的速度大小有什么关系？</div>
  <div class="p5-grid">
    <div class="p5-derive">
      <div class="p5-line"><Latex tex="m v + M V = 0" display /></div>
      <div class="p5-line" v-click="1"><Latex tex="V = -\frac{m}{M}v" display /></div>
      <div class="p5-line" v-click="2"><Latex tex="\frac{v}{V} = \frac{M}{m}" display /></div>
    </div>
    <div class="divider-l p5-example">
      <div class="p5-ex-title" v-click="3">炮身 <Latex tex="M=1000\ \text{kg}" />，炮弹 <Latex tex="m=10\ \text{kg}" />。<br>炮弹速度 <Latex tex="v=800\ \text{m/s}" />。</div>
      <div class="p5-ex-line" v-click="3"><Latex tex="V=\frac{m}{M}v=8\ \text{m/s}" /></div>
      <div class="p5-note" v-click="3">方向与炮弹相反。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="4">质量越大，反冲速度越小；速度大小与质量成反比。</div>
</div>

---
---

# 反冲速度与质量

<div class="page-grow pt6">
  <div class="ask p6-ask">炮弹速度不变，改变炮弹和炮身的质量，反冲速度怎样变？</div>
  <RecoilDemo />
  <div class="tip-hint" v-click="1"><Latex tex="V=\frac{m}{M}v" />：炮弹质量越大、炮身质量越小，反冲速度越大。</div>
</div>

---
---

# 做一做：气球与旋转容器

<div class="page-grow pt7">
  <div class="ask p7-ask">放开气球口、让水从弯管流出，会发生什么？</div>
  <div class="half-grid p7-grid">
    <div class="p7-case">
      <mdi-balloon class="icon-xl p7-icon" />
      <div class="p7-title">气球</div>
      <div class="p7-text">松开通气口，气体喷出，气球向相反方向运动。</div>
    </div>
    <div class="p7-case">
      <mdi-rotate-right class="icon-xl p7-icon" />
      <div class="p7-title">旋转容器</div>
      <div class="p7-text">水从弯管流出，容器向水流喷出的反方向旋转。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">它们都靠反冲：喷出气体或水，容器获得相反方向的动量。</div>
</div>

---
---

# 反冲的利用与防止

<div class="page-grow pt8">
  <div class="ask p8-ask">反冲有哪些应用？又要注意什么？</div>
  <div class="half-grid p8-grid">
    <div class="p8-col">
      <div class="mini-title p8-heading"><mdi-check-circle-outline class="p8-icon" />利用</div>
      <div class="p8-item"><mdi-sprinkler class="p8-item-icon" /><div><b>喷灌装置</b><span>喷口偏斜，喷管因反冲自动旋转。</span></div></div>
      <div class="p8-item"><mdi-rocket-launch class="p8-item-icon" /><div><b>火箭</b><span>燃气向后喷出，箭体向前飞行。</span></div></div>
    </div>
    <div class="divider-l p8-col">
      <div class="mini-title p8-heading"><mdi-alert-outline class="p8-icon p8-warn" />防止</div>
      <div class="p8-item"><mdi-pistol class="p8-item-icon" /><div><b>步枪后坐</b><span>枪身反冲影响瞄准，射击时抵肩。</span></div></div>
      <div class="p8-note">反冲既可以利用，也要注意减小它的影响。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">利用反冲时，让喷出物获得动量；防止反冲时，设法减小反冲速度或吸收冲击。</div>
</div>
