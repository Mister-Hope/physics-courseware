---
theme: default
title: "牛顿第一定律"
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
chapter-no: "4.1"
chapter: 第四章 运动和力的关系
---

<CoverDecorationSvg />

---
layout: base-flex
---

<div class="page-grow">
<div class="ask ask-hero">滑冰运动员不再用力蹬冰，就会慢慢停下来 —— 没有力，物体就不能运动吗？</div>
</div>

---
layout: base-flex
clicks: 2
---

# 亚里士多德：力是维持物体运动的原因

<div class="page-grow">
<div v-click="1"><ArrowFlightSvg /></div>
<div class="ask" v-click="2">箭离开弓弦后，弓已经不再推箭 —— 它为什么还能继续飞？</div>
</div>

---
layout: base-flex
clicks: 2
---

# 伽利略：力不是维持物体运动的原因

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">他观察到的现象</div>
<div>球沿斜面向下滚，速度增大；向上滚，速度减小。</div>
<div v-click="1">那么在水平面上滚动，速度应该不增不减。</div>
</div>
<div class="stack divider-l" v-click="1">
<div class="mini-title">可球越滚越慢</div>
<div>沿水平面滚动，球最后停了下来。</div>
</div>
</div>
<div class="key" v-click="2">把人们引入歧途的是<b>阻力</b>（摩擦、空气阻力）—— <b>力不是维持物体运动的原因</b>。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 伽利略的理想斜面实验

<div class="page-grow">
<div class="ask">如果阻力可以完全消除，小球的运动会是怎样的？</div>
<div><IdealInclineSvg /></div>
<div class="key" v-click="4">在没有阻力的理想情况下，小球应该会一直运动下去。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 理想实验

<div class="page-grow">
<div>阻力不可能完全消除，第二个斜面也不可能无限长 —— 这个实验做不出来。</div>
<div class="ask" v-click="1">做不出来的实验，凭什么下结论？</div>
<div class="key" v-click="2">它去掉的正是真实实验中无法消除的阻力，抓住事物的本质：<b>力不是维持物体运动的原因</b>。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 牛顿第一定律

<div class="page-grow">
<div class="card">一切物体总保持<b>匀速直线运动状态</b>或<b>静止状态</b>，除非作用在它上面的力迫使它改变这种状态。</div>
<div class="key" v-click="1">力<b>不是</b>维持物体运动状态的原因，而是<b>改变</b>物体运动状态的原因。</div>
<div class="mini-note" v-click="2">不受力作用的物体并不存在 —— 定律描述的是一种理想状态，不能用实验直接验证。</div>
<div class="mini-note" v-click="3">在伽利略和笛卡儿研究的基础上，牛顿提出了这条定律；它也叫<b>惯性定律</b>。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 惯性

<div class="page-grow">
<div class="stack">
<div class="inertia-row" v-click="1"><span class="inertia-label">本领</span><span>物体保持运动状态不变的本领</span></div>
<div class="inertia-row" v-click="2"><span class="inertia-label">能力大小</span><span>抵抗运动状态变化的能力大小</span></div>
<div class="inertia-row" v-click="3"><span class="inertia-label">关系</span><span>质量越大，惯性越大</span></div>
</div>
<div class="textbook-quote" v-click="3">教材原话：描述物体惯性的物理量是它的<b>质量</b>。</div>
<div class="wrong-claim" v-click="4">
<s>克服惯性</s>
<span class="wrong-mark">✗</span>
<span class="mini-note">惯性是物体的固有属性，只能说"利用惯性""克服阻力"</span>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 生活中的现象 —— 出门撞大运

<div class="page-grow">
<div v-click="1"><TruckHitSvg /></div>
<div class="key" v-click="2">质量小的"我"被撞后约以<b>两倍于卡车</b>的速度飞出；质量大的卡车速度几乎不变 —— <b>质量越大，运动状态越难改变</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 惯性现象

<div class="page-grow">
<div v-click="1"><BusInertiaSvg /></div>
<div class="key" v-click="2">车体的运动状态改变了，人还保持原来的运动状态 —— 启动时人向后倾，刹车时人向前倾。</div>
</div>

---
layout: base-flex
clicks: 5
---

# 这些说法对吗

<div class="page-grow">
<div class="judge-row">
<span>汽车速度越大，刹车后越难停下来 —— 速度越大，惯性越大。</span>
<span class="judge-verdict judge-no" v-click="1">✗ 难停是因为速度快、制动距离长，与惯性无关</span>
</div>
<div class="judge-row">
<span>汽车转弯后前进方向改变 —— 速度方向改变，惯性也随之改变。</span>
<span class="judge-verdict judge-no" v-click="2">✗ 惯性由质量决定，与速度方向无关</span>
</div>
<div class="judge-row">
<span>被抛出的小球，速度的大小和方向都改变了，但惯性不变。</span>
<span class="judge-verdict judge-yes" v-click="3">✓ 质量没变，惯性不变</span>
</div>
<div class="judge-row">
<span>使速度相同的沙袋在相同时间内停下来，对大沙袋用力更大 —— 质量大的物体惯性大。</span>
<span class="judge-verdict judge-yes" v-click="4">✓ 质量是惯性大小的量度</span>
</div>
<div class="key" v-click="5">惯性大小只由<b>质量</b>决定，与速度大小、速度方向、是否受力都无关。</div>
</div>

---
layout: base-flex
clicks: 8
---

# 从运动状态到惯性

<div class="page-grow chain">
<div class="chain-top">
<div class="chain-col chain-col-left">
<div class="chain-row"><span class="chain-tag">物体的运动状态</span><span><Latex tex="v" /></span></div>
<div class="chain-row" v-click="1"><span class="chain-tag">物体的运动状态的变化</span><span><Latex tex="\Delta v" /></span></div>
<div class="chain-row" v-click="2"><span class="chain-tag">物体的运动状态变化的快慢</span><span><Latex tex="a = \dfrac{\Delta v}{\Delta t}" /></span></div>
</div>
<div class="chain-col chain-col-right">
<div class="chain-row chain-row-brace" v-click="3">
<span class="chain-tag">惯性</span>
<div class="chain-brace-group">
<svg class="chain-brace" viewBox="0 0 12 40" preserveAspectRatio="none" aria-hidden="true">
<path d="M 10 2 C 4 2 8 18 1 20 C 8 22 4 38 10 38" fill="none" stroke="currentColor" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linecap="round" />
</svg>
<div class="stack chain-sub">
<div>保持运动状态不变的性质</div>
<div>质量越大，惯性越大</div>
<div>是物体的固有属性</div>
</div>
</div>
</div>
<div class="chain-row" v-click="4"><span class="chain-tag">运动状态变化的难易</span><span>由质量决定</span></div>
</div>
</div>
<div class="chain-bottom">
<div class="chain-row" v-click="5"><span class="chain-tag">同 <Latex tex="F" /> 比</span><span><Latex tex="m" /> 越大 <Latex tex="a" /> 越小；<Latex tex="a" /> 越大 <Latex tex="m" /> 越小</span></div>
<div class="chain-row" v-click="6"><span class="chain-tag">同 <Latex tex="a" /> 比</span><span><Latex tex="F" /> 与 <Latex tex="m" /> 正相关</span></div>
<div class="chain-row" v-click="7"><span class="chain-tag">同 <Latex tex="m" /> 比</span><span><Latex tex="a" /> 与合力 <Latex tex="F" /> 正相关</span></div>
</div>
<div class="key" v-click="8">取最简化的关系，可猜想：<Latex tex="m \propto \dfrac{F}{a}" />（即 <Latex tex="a \propto \dfrac{F}{m}" />）</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="three-col">
<div class="stack">
<div class="mini-title">牛顿第一定律</div>
<div>一切物体总保持匀速直线运动状态或静止状态，除非作用在它上面的力迫使它改变这种状态。</div>
</div>
<div class="stack">
<div class="mini-title">力与运动的关系</div>
<div>力不是维持物体运动状态的原因，而是<b>改变</b>物体运动状态的原因。</div>
</div>
<div class="stack">
<div class="mini-title">惯性</div>
<div>物体保持原来运动状态不变的固有性质，一切物体都有惯性；<b>质量越大，惯性越大</b>。</div>
</div>
</div>
<div class="key"><Latex tex="m \propto \dfrac{F}{a}" /> 还只是猜想 —— 下一节用实验探究加速度与力、质量的关系。</div>
</div>
