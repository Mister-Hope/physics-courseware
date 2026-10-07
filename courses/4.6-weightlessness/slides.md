---
theme: default
title: "超重和失重"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: cover
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
---

<div class="cover-chapter"><span class="cover-section">§</span> 4.6 · 第四章 运动和力的关系</div>

<h1 class="cover-title">超重和失重</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">人站在体重计上，缓慢下蹲。下蹲的过程中，体重计的示数会怎样变化？</div>

<div class="squat-flow" v-click="1">
<span class="sf-step">先变小</span><mdi-arrow-right />
<span class="sf-step">后变大</span><mdi-arrow-right />
<span class="sf-step">再变小</span><mdi-arrow-right />
<span class="sf-step sf-end">静止后不变</span>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">力传感器把示数的变化完整地记录了下来。示数为什么会先变小、再变大？</div>

<div class="graph-host">
<SquatRiseFtGraph mode="squat" :step="$clicks" />
</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">示数变小，是人变轻了吗？示数变大，是人变重了吗？</div>

<div class="key key-lead" v-click="1">人还是那个人，受到的引力也没有变 —— 变的只能是秤读到的那个力。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 重力的测量

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">由 <Latex tex="mg" /> 算</div>
<div>用天平测出质量 <Latex tex="m" />，再测出自由落体加速度 <Latex tex="g" />，由 <Latex tex="G = mg" /> 算出重力。</div>
</div>
<div class="stack divider-l">
<div class="mini-title">用平衡条件读</div>
<div>把物体静止地放在测力计上，示数反映的正是物体所受的重力 —— 这是最常用的测重力方法。</div>
</div>
</div>

<div class="key" v-click="1">前提是<b>静止</b>：只有静止时，示数才等于重力。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 体重计的读数是什么力

<div class="page-grow">
<div class="half-grid">
<div class="figure-host">
<PersonWeightSvg :show-forces="true" :reading="600" />
</div>
<div class="stack">
<div class="ask">秤读到的这个数，是人的重力吗？</div>
<div v-click="1">秤受到的是人向下的<b>压力</b> <Latex tex="F_N'" />，读数就是它。</div>
<div v-click="2">由牛顿第三定律 <Latex tex="F_N' = F_N" />，<Latex tex="F_N" /> 是秤对人的支持力。</div>
<div v-click="3">这个读数叫作<b>视重</b> —— 秤“感到”的力。</div>
</div>
</div>

<div class="key key-lead" v-click="4">超重、失重说的是<b>视重相对于重力的变化</b>；重力 <Latex tex="mg" /> 本身始终不变。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 下蹲的三个阶段

<div class="page-grow">
<div class="half-grid">
<div class="figure-host">
<PersonWeightSvg :show-motion="true" speed-dir="down" />
</div>
<div class="stack">
<div class="ask">人向下蹲，速度始终向下。全过程分成哪几个阶段？</div>
<div class="stack stack-tight" v-click="1">
<div>先向下<b>加速</b>，再向下<b>减速</b>，最后静止。</div>
<div>约定：竖直向下为正方向。</div>
</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 加速下降：示数为什么变小

<div class="page-grow">
<div class="half-grid">
<div class="figure-host">
<PersonWeightSvg
  :show-forces="$clicks >= 1"
  :show-motion="true"
  speed-dir="down"
  accel-dir="down"
  :fn-ratio="0.8"
  :reading="$clicks >= 1 ? 480 : null"
/>
</div>
<div class="stack">
<div class="ask">加速下降时，加速度朝哪？牛顿第二定律怎么写？</div>
<div v-click="1">取向下为正：<Latex tex="mg - F_N = ma" /></div>
<div v-click="2"><Latex tex="F_N = m(g-a) \lt mg" /></div>
<div v-click="3" class="key">视重小于重力 —— 这就是<b>失重</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 减速下降：示数为什么变大

<div class="page-grow">
<div class="half-grid">
<div class="figure-host">
<PersonWeightSvg
  :show-forces="$clicks >= 1"
  :show-motion="true"
  speed-dir="down"
  accel-dir="up"
  :fn-ratio="1.2"
  :reading="$clicks >= 1 ? 720 : null"
/>
</div>
<div class="stack">
<div class="ask">减速下降时，加速度朝哪？牛顿第二定律怎么写？</div>
<div v-click="1">取向下为正：<Latex tex="mg - F_N = -ma" /></div>
<div v-click="2"><Latex tex="F_N = m(g+a) \gt mg" /></div>
<div v-click="3" class="key">视重大于重力 —— 这就是<b>超重</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 静止：视重回到重力

<div class="page-grow">
<div class="half-grid">
<div class="figure-host">
<PersonWeightSvg :show-forces="$clicks >= 1" :reading="$clicks >= 1 ? 600 : null" />
</div>
<div class="stack">
<div class="ask">静止时，支持力和重力是什么关系？</div>
<div v-click="1"><Latex tex="F_N = mg" /></div>
<div v-click="2" class="key">二力平衡，视重回到重力大小，示数不再变化。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 只看加速度的方向

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">超重：<Latex tex="F_N \gt mg" /></div>
<div class="stack stack-tight" v-click="1">
<div>向上加速</div>
<div>向下减速</div>
<div>共同点：加速度方向<b>向上</b></div>
</div>
</div>
<div class="stack divider-l">
<div class="mini-title">失重：<Latex tex="F_N \lt mg" /></div>
<div class="stack stack-tight" v-click="2">
<div>向下加速</div>
<div>向上减速</div>
<div>共同点：加速度方向<b>向下</b></div>
</div>
</div>
</div>

<div class="key key-lead" v-click="3">视重变大还是变小，只由<b>加速度方向</b>决定，与速度方向无关。</div>
</div>

---
layout: base-flex
---

# 电梯里的体重计

<div class="page-grow">
<div class="ew-hint">点一个运动状态，看看示数和箭头怎么变。</div>

<ElevatorWeightSim />
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">人由蹲姿站起，示数又会怎样变？</div>

<div class="graph-host">
<SquatRiseFtGraph mode="rise" :step="$clicks" />
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 完全失重

<div class="page-grow">
<div class="ask">如果向下加速，而且加速度大到等于 <Latex tex="g" />，示数会是多少？</div>

<div v-click="1" class="lead-formula"><Latex tex="F_N = m(g-a) = m(g-g) = 0" /></div>

<div v-click="2">重力 <Latex tex="mg" /> 仍然存在，只是全部用来产生加速度了。</div>

<div class="key key-lead" v-click="3">人对秤完全没有作用力 —— 这是<b>完全失重</b>状态。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">塑料瓶侧壁扎个小孔，水会从孔里喷出。如果让瓶子自由下落，水还会流出来吗？</div>

<div class="half-grid">
<div class="figure-host"><WaterBottleSvg :falling="false" label="静止" /></div>
<div class="figure-host" v-click="1"><WaterBottleSvg :falling="true" label="自由下落" /></div>
</div>

<div v-click="2">航天器绕地球运行时，舱内物体同样在完全失重：液滴呈球形，气泡不再上浮。</div>

<div class="key" v-click="3">水对瓶壁没有压力，瓶对水也没有支持力 —— 水不再从孔中流出。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 超重的代价

<div class="page-grow">
<div class="problem">火箭发射阶段，加速度可达 <Latex tex="3.5g" />。平时重 <Latex tex="10\ \text{N}" /> 的体内脏器，在这个阶段需要的支持力有多大？</div>

<div v-click="1">加速度方向向上，取向上为正：<Latex tex="F_N - mg = ma" /></div>
<div v-click="2"><Latex tex="F_N = mg + ma = mg + 3.5mg = 4.5mg = 4.5 \times 10\ \text{N} = 45\ \text{N}" /></div>
<div v-click="3" class="key">超重时，一切压在支持物上的东西都要多承受几倍的力。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 例题：电梯加速上升

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div>质量 <Latex tex="60\ \text{kg}" /> 的人站在电梯内的水平地板上，电梯以 <Latex tex="0.25\ \text{m/s}^2" /> 的加速度匀加速上升。求人对电梯地板的压力。（<Latex tex="g" /> 取 <Latex tex="9.8\ \text{m/s}^2" />）</div>
</div>
<div class="figure-host">
<PersonWeightSvg
  enclosure="elevator"
  :show-forces="$clicks >= 1"
  :show-motion="true"
  speed-dir="up"
  accel-dir="up"
  :fn-ratio="1.15"
/>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div v-click="1">取竖直向上为正方向，由牛顿第二定律：<Latex tex="F_N - mg = ma" /></div>
<div v-click="2"><Latex tex="F_N = m(g+a) = 60 \times (9.8+0.25)\ \text{N} = 603\ \text{N}" /></div>
<div v-click="2">由牛顿第三定律，人对地板的压力 <Latex tex="F_N' = 603\ \text{N}" />，方向竖直向下。</div>
<div v-click="3" class="key">向上加速（或向下减速）时，<Latex tex="F_N \gt mg" />，出现超重。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 例题：示数变大了

<div class="page-grow">
<div class="problem">某人站在电梯里的体重计上，发现示数是其体重的 <Latex tex="1.2" /> 倍。电梯可能在做什么运动？</div>

<div v-click="1">示数大于体重，即 <Latex tex="F_N \gt mg" />，所以加速度方向<b>向上</b>，<Latex tex="a = 0.2g" />。</div>
<div v-click="2" class="key">可能是<b>向上加速</b>，也可能是<b>向下减速</b> —— 运动方向无法唯一确定。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 蹦极中的超重与失重

<div class="page-grow">
<div class="problem">运动员从高处跳下，弹性绳被拉直前做自由落体运动；弹性绳被拉直后，下降速度先增大、再减小，直到减为 0。下降过程中，运动员在哪些阶段分别处于超重、失重状态？</div>

<div v-click="1">绳被拉直前：<Latex tex="a = g" /> 向下 —— <b>完全失重</b>。</div>
<div v-click="2">绳被拉直后速度仍增大：弹力小于重力，<Latex tex="a" /> 向下 —— <b>失重</b>。</div>
<div v-click="3">速度减小时：弹力大于重力，<Latex tex="a" /> 向上，<Latex tex="F_N \gt mg" />。</div>
<div v-click="4" class="key">全程速度都向下，却既有失重又有超重 —— 判断只看加速度方向。</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><b>视重</b>：秤感受到的压力，大小等于秤对物体的支持力；只有静止时才等于重力。</div>
<div class="summary-line"><b>超重</b>：<Latex tex="F_N \gt mg" />，加速度方向向上（向上加速、向下减速）。</div>
<div class="summary-line"><b>失重</b>：<Latex tex="F_N \lt mg" />，加速度方向向下（向下加速、向上减速）。</div>
<div class="summary-line"><b>完全失重</b>：<Latex tex="a = g" /> 向下，视重为 0。</div>
<div class="key">重力 <Latex tex="mg" /> 始终不变；超重和失重都是<b>视重相对于重力的变化</b>。</div>
</div>
</div>
