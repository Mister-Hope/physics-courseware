---
theme: default
title: "动量定理"
subtitle: "从冲量到动量定理"
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
chapter-no: "1.2"
chapter: "第一章 动量守恒定律"
---

<!-- 封面装饰：小球撞墙，呼应冲量与动量变化。 -->
<CoverDecorationSvg />

---
layout: base-flex
title: 先回顾：动量
---

# 先回顾：动量

<div class="page-grow pt2">
  <div class="p2-grid">
    <div class="p2-main">
      <div class="p2-eq"><Latex tex="p=mv" display /></div>
      <div class="p2-row"><span class="p2-tag">单位</span><span><Latex tex="\text{kg}\cdot\text{m/s}" /></span></div>
      <div class="p2-row"><span class="p2-tag">方向</span><span>与速度 <Latex tex="v" /> 的方向相同</span></div>
      <div class="p2-row"><span class="p2-tag">变化量</span><span><Latex tex="\Delta p=p'-p" /></span></div>
    </div>
    <div class="divider-l p2-side">
      <div class="p2-note"><b>状态量</b><br>描述物体某一时刻的运动状态。</div>
      <div class="p2-note"><b>矢量</b><br>一维运动要先规定正方向。</div>
    </div>
  </div>
  <div class="summary-line p2-foot">动量是状态量，动量变化量是过程量。</div>
</div>

---
layout: base-flex
title: 船靠岸时为什么要挂旧轮胎
---

<div class="page-grow pt3">
  <div class="ask ask-lead p3-ask">船靠岸时，码头和船舷上常挂着旧轮胎。这是为什么？</div>
  <div class="p3-fig"><ShipDockSvg /></div>
  <div class="tip-hint p3-hint" v-click="1">轮胎让船与码头的作用时间变长。</div>
</div>

---
layout: base-flex
title: 碰撞中的力
---

# 碰撞中的力

<div class="page-grow pt4">
  <div class="ask p4-ask">碰撞时，力很大、时间很短，而且力还在变化。还能用 <Latex tex="F=ma" /> 直接求吗？</div>
  <div class="p4-grid">
    <div class="p4-item"><mdi-alert-outline class="icon-lg p4-icon" /><div><b>力是变力</b>碰撞过程中，力先急剧增大，再急剧减小。</div></div>
    <div class="p4-item"><mdi-clock-outline class="icon-lg p4-icon" /><div><b>时间很短</b>用瞬时加速度逐点求力，既困难也不必要。</div></div>
  </div>
  <div class="tip-hint" v-click="1">把力和作用时间放在一起考虑：<Latex tex="F\Delta t" />。</div>
</div>

---
layout: base-flex
title: 从牛顿第二定律到动量定理
---

# 从牛顿第二定律到动量定理

<div class="page-grow pt5">
  <div class="ask p5-ask">怎样从牛顿第二定律，得到力与动量变化的关系？</div>
  <div class="half-grid p5-grid">
    <div class="p5-fig">
      <BlockForceSvg />
      <div class="mini-note p5-cap">光滑水平面，恒力 <Latex tex="F" /> 作用时间 <Latex tex="\Delta t" /></div>
    </div>
    <div class="divider-l p5-steps">
      <div class="p5-step"><span class="p5-no">1</span><div><Latex tex="a=\dfrac{v'-v}{\Delta t}" /></div></div>
      <div class="p5-step" v-click="1"><span class="p5-no">2</span><div><Latex tex="F=ma=m\dfrac{v'-v}{\Delta t}=\dfrac{p'-p}{\Delta t}" /></div></div>
      <div class="p5-step" v-click="2"><span class="p5-no">3</span><div><Latex tex="F\Delta t=p'-p" /></div></div>
    </div>
  </div>
  <div class="tip-hint" v-click="3">左边 <Latex tex="F\Delta t" /> 是力对时间的累积，右边是动量的变化。</div>
</div>

---
layout: base-flex
title: 冲量
---

# 冲量

<div class="page-grow pt6">
  <div class="p6-grid">
    <div class="p6-main">
      <div class="p6-eq"><Latex tex="I=F\Delta t" display /></div>
      <div class="p6-row"><span class="p6-tag">单位</span><span><Latex tex="\text{N}\cdot\text{s}" /></span></div>
      <div class="p6-row"><span class="p6-tag">方向</span><span>与力 <Latex tex="F" /> 的方向相同</span></div>
      <div class="p6-row"><span class="p6-tag">性质</span><span>过程量，与一段时间对应</span></div>
    </div>
    <div class="divider-l p6-side">
      <div class="p6-rel"><Latex tex="I=p'-p=\Delta p" /></div>
      <div class="p6-note">冲量反映力对时间的累积效应。</div>
    </div>
  </div>
  <div class="info-hint" v-click="1">冲量是矢量式；一维运算要先规定正方向，再代入正负号。</div>
</div>

---
layout: base-flex
title: 动量定理
---

# 动量定理

<div class="page-grow pt7">
  <div class="p7-statement">物体在一个过程中所受力的冲量，等于它在这个过程始末的动量变化量。</div>
  <div class="p7-eq"><Latex tex="I=p'-p=\Delta p" display /></div>
  <div class="p7-notes">
    <div class="p7-note"><span class="p7-tag">合力</span><Latex tex="I" /> 是合力的冲量，或各力冲量的矢量和。</div>
    <div class="p7-note"><span class="p7-tag">矢量</span>方向相同；一维运动先定正方向。</div>
  </div>
  <div class="tip-hint" v-click="1">与正方向相同的量取正，相反的取负，再代入 <Latex tex="I=\Delta p" />。</div>
</div>

---
layout: base-flex
title: 变力情况下的冲量
---

# 变力情况下的冲量

<div class="page-grow pt8">
  <div class="half-grid p8-grid">
    <div class="p8-chart"><ImpulseAreaChart :step="$clicks" /></div>
    <div class="divider-l p8-side">
      <div class="ask p8-ask">力是变力，动量定理还成立吗？</div>
      <div class="p8-step" v-click="1"><span class="p8-no">1</span><div>把整个过程分成许多小段。</div></div>
      <div class="p8-step" v-click="1"><span class="p8-no">2</span><div>每一小段内，力近似不变。</div></div>
      <div class="p8-step" v-click="2"><span class="p8-no">3</span><div>各段的 <Latex tex="F\Delta t" /> 相加，就是面积。</div></div>
      <div class="tip-hint" v-click="3">变力时，<Latex tex="F" /> 取作用时间内的平均力；面积就是冲量。</div>
    </div>
  </div>
</div>
