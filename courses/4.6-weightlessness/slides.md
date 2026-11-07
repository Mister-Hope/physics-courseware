---
theme: default
title: "超重和失重"
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
chapter-no: "4.6"
chapter: 第四章 运动和力的关系
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 3
title: '如何测重力'
---

<div class="page-grow measure-page">
<div class="ask ask-lead">如何测重力？</div>
<div class="measure-grid">
<div class="host" v-click="1">
<SpringScaleHangingSvg :show-forces="$clicks >= 2" />
</div>
<div class="host" v-click="1">
<PersonWeightSvg :show-forces="$clicks >= 2" :show-pressure="$clicks >= 2" :force-len="62" :reading="600" />
</div>
<div class="measure-eq" v-click="2"><Latex tex="F_T = mg" /></div>
<div class="measure-eq" v-click="2">
<div class="stack stack-tight">
<div><Latex tex="F_N = mg" /></div>
<div><Latex tex="F_N' = F_N" /></div>
</div>
</div>
</div>
<div class="tip-hint" v-click="3">静止时二力平衡：拉力 <Latex tex="F_T = mg" />、支持力 <Latex tex="F_N = mg" />、压力 <Latex tex="F_N' = F_N" />。秤读到的这个力叫作<b>视重</b> —— 只有静止或做匀速直线运动时，视重才等于重力。</div>
</div>

---
layout: base-flex
clicks: 3
title: '两个问题'
---

<div class="qa-center">
<mdi-head-question-outline class="icon-2xl qa-icon" />
<div class="qa-q">我们测出的这个力，什么条件下才等于重力？</div>
<div class="qa-a" v-click="1">加速度为零 —— 物体静止或做匀速直线运动时，视重才等于重力。</div>
<div class="qa-q" v-click="2">如果这个条件不满足，可能出现哪些情况？</div>
<div class="qa-a" v-click="3">视重就不等于重力：<b>大于</b>重力叫超重，<b>小于</b>重力叫失重。</div>
</div>

---
layout: base-flex
title: '电梯实测'
---

<div class="page-grow">
<div class="ask ask-lead">电梯启动、匀速运行、制动时，秤的示数怎样变化？</div>
<div class="host">
<VideoSlot />
</div>
</div>

---
layout: base-flex
title: '电梯实测（模拟）'
---

<div class="page-grow">
<ElevatorScaleSim standalone />
</div>

---
layout: base-flex
clicks: 2
title: '超重和失重'
---

# 超重和失重

<div class="page-grow">
<div class="ft-layout">
<div class="stack">
<DefinitionBox term="超重" tone="gold">
<div>物体对支持物的压力（或对悬挂物的拉力，即<span class="def-term">视重</span>）<b>大于</b>物体所受重力的现象，叫作<span class="def-term">超重</span>现象。</div>
</DefinitionBox>
<DefinitionBox term="失重" tone="blue">
<div>物体对支持物的压力（或对悬挂物的拉力，即<span class="def-term">视重</span>）<b>小于</b>物体所受重力的现象，叫作<span class="def-term">失重</span>现象。</div>
</DefinitionBox>
</div>
<div class="ft-right">
<div class="host">
<ElevatorFtGraph />
</div>
<div class="tip-hint">超重和失重，变的只是视重 —— 重力 <Latex tex="mg" /> 始终不变。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: '电梯的运动'
---

<div class="page-grow">
<div class="ask">电梯上升、下降的完整过程中，速度怎样变化？</div>
<ElevatorScaleSim hide-panel>
<div class="vt-col">
<div class="vt-host" v-click="1"><ElevatorVtGraph /></div>
<div class="proc-tree">
<div class="proc" v-click="2">
<div class="proc-name">上升过程</div>
<CurlyBraceSvg />
<div class="proc-items">
<div>加速上升</div>
<div>匀速上升</div>
<div>减速上升</div>
</div>
</div>
<div class="proc" v-click="3">
<div class="proc-name">下降过程</div>
<CurlyBraceSvg />
<div class="proc-items">
<div>加速下降</div>
<div>匀速下降</div>
<div>减速下降</div>
</div>
</div>
</div>
</div>
</ElevatorScaleSim>
</div>

---
layout: base-flex
clicks: 12
title: '示数与重力'
---

<div class="page-grow">
<div class="ask">电梯在不同运动状态下，秤的示数与重力相比是大是小？</div>
<ElevatorScaleSim hide-panel>
<ElevatorStateTable mode="reading" />
</ElevatorScaleSim>
</div>

---
layout: base-flex
clicks: 7
title: '加速度的方向'
---

<div class="page-grow">
<div class="ask">这些状态下，加速度的方向分别是什么？超重、失重的共同点在哪里？</div>
<ElevatorScaleSim hide-panel>
<ElevatorStateTable mode="accel" />
</ElevatorScaleSim>
<div class="tip-hint" v-click="7">只看加速度方向，与运动方向无关。</div>
</div>

---
layout: base-flex
clicks: 3
title: '为什么与加速度有关'
---

<div class="page-grow">
<div class="ask ask-lead">为什么超重和失重，只跟竖直方向的加速度有关？</div>

<div v-click="1">竖直方向上有加速度，合力就不为零：<Latex tex="F_{\text{合}} = ma \ne 0" />，支持力不再与重力平衡。</div>

<div class="half-grid">
<div class="stack" v-click="2">
<div class="mini-title"><mdi-arrow-up-bold-outline class="text-xl" /> 加速度向上</div>
<div class="stack stack-tight">
<div>向上加速、向下减速</div>
<div>取向上为正：<Latex tex="F_N - mg = ma" /></div>
<div><Latex tex="F_N = m(g+a) \gt mg" /> —— 超重</div>
</div>
</div>
<div class="stack divider-l" v-click="2">
<div class="mini-title"><mdi-arrow-down-bold-outline class="text-xl" /> 加速度向下</div>
<div class="stack stack-tight">
<div>向下加速、向上减速</div>
<div>取向下为正：<Latex tex="mg - F_N = ma" /></div>
<div><Latex tex="F_N = m(g-a) \lt mg" /> —— 失重</div>
</div>
</div>
</div>

<div class="tip-hint" v-click="3">只要加速度向上就超重、向下就失重 —— 与电梯向上还是向下运动无关。</div>
</div>

---
layout: base-flex
clicks: 4
title: '人蹲下、站起'
---

<div class="page-grow">
<div class="ask ask-lead">人站在体重计上，先下蹲、再站起。哪些阶段超重，哪些阶段失重？</div>
<div class="host">
<SquatRiseFtGraph mode="both" />
</div>
</div>

---
layout: base-flex
clicks: 3
title: '完全失重'
---

<div class="page-grow">
<div class="ask ask-lead">张老师站在电梯里，电梯以加速度 <Latex tex="g" /> 向下加速下落。<br />此时秤的读数是多少？</div>
<div class="half-grid">
<div class="host">
<PersonWeightSvg
  style="--pw-max: 300px"
  enclosure="elevator"
  :show-forces="$clicks >= 1"
  :show-motion="true"
  speed-dir="down"
  accel-dir="down"
  :fn-ratio="0"
  :reading="$clicks >= 1 ? 0 : null"
/>
</div>
<div class="stack">
<div v-click="1">取向下为正：<Latex tex="mg - F_N = ma = mg" /></div>
<div v-click="2"><Latex tex="F_N = 0" />，秤的读数为 <Latex tex="0" />，脚对电梯地板的压力 <Latex tex="F_N' = 0" />。</div>
<div v-click="3" class="tip-hint">加速度向下且 <Latex tex="a = g" /> 时，视重为 <Latex tex="0" /> —— 这叫作<b>完全失重</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: '水的实验'
---

<div class="page-grow">
<div class="ask ask-lead">瓶侧壁扎个小孔，水会从孔中喷出。若让瓶子自由下落，水还会流出来吗？</div>
<div class="half-grid">
<div class="host">
<WaterBottleSvg style="--wb-max: 235px" :falling="false" label="静止" />
</div>
<div class="host" v-click="1">
<WaterBottleSvg style="--wb-max: 235px" :falling="true" label="自由下落" />
</div>
</div>
<div class="tip-hint" v-click="2">瓶和水都完全失重，水不再挤压瓶壁，故不会流出。</div>
</div>

---
layout: base-flex
clicks: 3
title: '例题 1：超重的代价'
---

<div class="page-grow">
<div><b class="ex-no">例题 1</b>　火箭发射阶段，加速度可达 <Latex tex="3.5g" />。平时重 <Latex tex="10\ \text{N}" /> 的体内脏器，在这个阶段需要的支持力有多大？</div>
<div v-click="1">加速度方向向上，取向上为正：<Latex tex="F_N - mg = ma" /></div>
<div v-click="2"><Latex tex="F_N = mg + ma = mg + 3.5mg = 4.5mg = 4.5 \times 10\ \text{N} = 45\ \text{N}" /></div>
<div v-click="3" class="tip-hint">超重时，一切压在支持物上的东西都要多承受几倍的力。</div>
</div>

---
layout: base-flex
clicks: 4
title: '例题 2：蹦极'
---

<div class="page-grow">
<div><b class="ex-no">例题 2</b>　运动员从高处跳下，弹性绳被拉直前做自由落体运动；弹性绳被拉直后，下降速度先增大、再减小，直到减为 0。下降过程中，运动员在哪些阶段分别处于超重、失重状态？</div>
<div v-click="1">绳被拉直前：<Latex tex="a = g" /> 向下 —— <b>完全失重</b>。</div>
<div v-click="2">绳被拉直后速度仍增大：弹力小于重力，<Latex tex="a" /> 向下 —— <b>失重</b>。</div>
<div v-click="3">速度减小时：绳的拉力 <Latex tex="F_T \gt mg" />（视重大于重力），<Latex tex="a" /> 向上 —— <b>超重</b>。</div>
<div v-click="4" class="tip-hint">全程速度都向下，却既有失重又有超重 —— 判断只看加速度方向。</div>
</div>

---
layout: exercise-split
clicks: 5
hideQaMark: true
title: '例题 3：木球上浮时，秤的示数怎么变？'
---

<template v-slot:stem>

<b class="ex-no">例题 3</b>　烧杯放在秤上，杯中装水，一个木球用细绳拴在杯底、浸没在水中。剪断细绳，木球上浮。在木球上浮的过程中，秤的示数怎样变化？

</template>

<template v-slot:fig>

<BeakerBallRise />

</template>

<div v-click="1" :class="{ 'is-wrong': $clicks >= 2 }">只看木球：它向上加速，似乎该超重、示数变大。<span class="cross-mark" :class="{ 'cross-hidden': $clicks < 2 }">✕</span></div>

<div v-click="3">木球上浮时，上方的水在加速向下流。水的密度更大，故系统的重心在加速下降。</div>

<div v-click="4" class="tip-hint">当烧杯高度足够高时，由于阻力随速度的增大而增大，小球在经过足够时间后会保持匀速运动，不再产生超重、失重现象。</div>

<div v-click="5">所以，秤的示数突然变小，并逐渐向原数值增大。</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><b>视重</b>：物体对秤的压力或拉力；静止或匀速直线运动时等于重力。</div>
<div class="summary-line"><b>超重</b>：<Latex tex="F_N \gt mg" />，加速度方向向上。</div>
<div class="summary-line"><b>失重</b>：<Latex tex="F_N \lt mg" />，加速度方向向下。</div>
<div class="summary-line"><b>完全失重</b>：<Latex tex="a = g" /> 向下，视重为 0。</div>
<div class="tip-hint">重力 <Latex tex="mg" /> 始终不变；超重和失重都是<b>视重相对于重力的变化</b>。</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: '思考题'
---

<div class="page-grow" style="justify-content: center">
<div class="ask ask-lead">如果物体的加速度大于 <Latex tex="g" />，会出现什么现象？</div>
<div class="tip-hint" v-click="1">支持力不可能为负 —— 人会离开地板，被顶棚压住。</div>
</div>
