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

---
layout: base-flex
title: 一维运动中的正负
---

# 一维运动中的正负

<div class="page-grow pt9">
  <div class="ask p9-ask">钢球撞墙后反向弹回，动量变化怎样表示方向？</div>
  <div class="p9-fig"><BallBounceSvg /></div>
  <div class="p9-calc">
    <div class="p9-line">取向右为正：<Latex tex="p=mv=0.1\times6=0.6\ \text{kg}\cdot\text{m/s}" /></div>
    <div class="p9-line" v-click="1"><Latex tex="p'=mv'=0.1\times(-6)=-0.6\ \text{kg}\cdot\text{m/s}" /></div>
    <div class="p9-line" v-click="2"><Latex tex="\Delta p=p'-p=-0.6-0.6=-1.2\ \text{kg}\cdot\text{m/s}" /></div>
    <div class="tip-hint" v-click="3">负号表示动量变化的方向与正方向相反，即向左。</div>
  </div>
</div>

---
layout: exercise-split
title: 例题：击球时的平均力
analysisLabel: 解析
---

<template v-slot:stem>
  质量 <Latex tex="0.18\ \text{kg}" /> 的垒球以 <Latex tex="25\ \text{m/s}" /> 的速度飞来，被击后沿相反方向以 <Latex tex="45\ \text{m/s}" /> 飞出，作用时间 <Latex tex="0.002\ \text{s}" />，求平均作用力。
</template>

<template v-slot:fig>
  <BaseballHitSvg />
</template>

<div class="p10-analysis">
  <div class="p10-line">取飞来方向为正。</div>
  <div class="p10-line" v-click="1"><Latex tex="p=mv=0.18\times25=4.5\ \text{kg}\cdot\text{m/s}" /></div>
  <div class="p10-line" v-click="1"><Latex tex="p'=mv'=0.18\times(-45)=-8.1\ \text{kg}\cdot\text{m/s}" /></div>
  <div class="p10-line" v-click="2"><Latex tex="\Delta p=p'-p=-8.1-4.5=-12.6\ \text{kg}\cdot\text{m/s}" /></div>
  <div class="p10-line" v-click="3"><Latex tex="F=\dfrac{\Delta p}{\Delta t}=\dfrac{-12.6}{0.002}=-6300\ \text{N}" />，负号表示力与飞来方向相反。</div>
</div>

---
layout: base-flex
title: 缓冲
---

# 缓冲

<div class="page-grow pt11">
  <div class="ask p11-ask">玻璃杯落在硬地上会碎，落在地毯上却不容易碎。为什么？</div>
  <div class="p11-grid">
    <div class="p11-case">
      <mdi-alert-outline class="icon-lg p11-icon p11-hard" />
      <div><b>硬地</b><br>作用时间短，作用力大。</div>
    </div>
    <div class="p11-case">
      <mdi-check-circle-outline class="icon-lg p11-icon p11-soft" />
      <div><b>地毯</b><br>作用时间长，作用力小。</div>
    </div>
  </div>
  <div class="p11-eq"><Latex tex="F=\dfrac{\Delta p}{\Delta t}" display /></div>
  <div class="tip-hint" v-click="1">动量变化相同时，延长作用时间可以减小作用力。</div>
  <div class="mini-note p11-note">柔软包装、跳高垫、船轮胎都是同样的道理。</div>
</div>

---
layout: base-flex
title: 缓冲时间与平均力
---

# 缓冲时间与平均力

<div class="page-grow pt12">
  <div class="ask p12-ask">垒球的动量变化相同，只改变作用时间，平均力会怎样变？</div>
  <BufferForceDemo />
  <div class="tip-hint" v-click="1">作用时间变为 10 倍，平均力变为 <Latex tex="1/10" />；<Latex tex="\Delta p" /> 不变。</div>
</div>

---
layout: base-flex
title: 安全气囊与碰撞试验
---

# 安全气囊与碰撞试验

<div class="page-grow pt13">
  <div class="ask p13-ask">汽车碰撞时，为什么需要安全气囊和安全带？</div>
  <div class="p13-grid">
    <div class="p13-data">
      <div class="p13-row"><span>质量</span><Latex tex="m=60\ \text{kg}" /></div>
      <div class="p13-row"><span>速度</span><Latex tex="v=15\ \text{m/s}" /></div>
      <div class="p13-row"><span>动量变化</span><Latex tex="\Delta p=900\ \text{kg}\cdot\text{m/s}" /></div>
      <div class="p13-note">撞后停止，动量瞬间变为零。</div>
    </div>
    <div class="p13-bars">
      <div class="p13-bar-row">
        <div class="p13-bar-label">无气囊 · <Latex tex="\Delta t\approx0.05\ \text{s}" /></div>
        <div class="p13-bar"><div class="p13-fill p13-fill-hard" style="width: 100%"></div></div>
        <div class="p13-bar-value"><Latex tex="1.8\times10^4\ \text{N}" /></div>
      </div>
      <div class="p13-bar-row">
        <div class="p13-bar-label">有气囊 · <Latex tex="\Delta t\approx0.2\ \text{s}" /></div>
        <div class="p13-bar"><div class="p13-fill p13-fill-soft" style="width: 25%"></div></div>
        <div class="p13-bar-value"><Latex tex="4.5\times10^3\ \text{N}" /></div>
      </div>
    </div>
  </div>
  <div class="mini-note p13-stse">1998 年 6 月 18 日，中国轿车第一次碰撞试验在天津完成；试验速度为 50 km/h。</div>
  <div class="tip-hint" v-click="1">气囊把碰撞时间延长到约 0.2 s，平均力降为约 1/4。</div>
</div>
