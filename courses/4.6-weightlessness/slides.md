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
clicks: 2
title: '秤的读数'
---

<div class="page-grow">
<div class="ask ask-lead">重力无法直接测量。为什么挂在测力计下的物体，示数就反映了它的重力？</div>

<div class="half-grid">
<div class="host">
<SpringScaleHangingSvg :show-forces="$clicks >= 1" />
</div>
<div class="stack divider-l" style="align-items: center">
<div style="width: 200px">
<PersonWeightSvg :show-forces="$clicks >= 1" :force-len="62" :reading="600" />
</div>
</div>
</div>

<div class="tip-hint" v-click="2">静止时二力平衡：拉力 <Latex tex="F_T = mg" />，支持力 <Latex tex="F_N = mg" />，压力 <Latex tex="F_N' = F_N" />。秤读到的这个力叫作<b>视重</b>——只有静止或做匀速直线运动时，视重才等于重力。</div>
</div>

---
layout: base-flex
title: '电梯实测'
---

<div class="page-grow">
<div class="ask ask-lead">电梯启动、匀速运行、制动时，秤的示数怎样变化？</div>

<div class="host">
<!-- 老师拍好的电梯实测视频放进 images/ 后，把下面一行改成 <VideoSlot src="images/elevator.mp4" /> 即可播放 -->
<VideoSlot />
</div>
</div>

---
layout: base-flex
clicks: 1
title: '超重和失重'
---

<div class="page-grow">
<div class="def-row">
<DefinitionBox term="超重" tone="gold">
<div>物体对支持物的压力（或对悬挂物的拉力，即<span class="def-term">视重</span>）<b>大于</b>物体所受重力的现象，叫作<span class="def-term">超重</span>现象。</div>
</DefinitionBox>
<DefinitionBox term="失重" tone="blue">
<div>物体对支持物的压力（或对悬挂物的拉力，即<span class="def-term">视重</span>）<b>小于</b>物体所受重力的现象，叫作<span class="def-term">失重</span>现象。</div>
</DefinitionBox>
</div>

<div class="tip-hint" v-click="1">重力 <Latex tex="mg" /> 始终不变，变的只是视重。</div>
</div>

---
layout: base-flex
clicks: 2
title: '电梯的运动'
---

<div class="page-grow">
<div class="ask">电梯上升、下降的完整过程中，速度怎样变化？</div>

<ElevatorWeightSim>
<div class="proc-tree">
<div class="proc" v-click>
<div class="proc-name">上升过程</div>
<CurlyBraceSvg />
<div class="proc-items">
<div>加速上升</div>
<div>匀速上升</div>
<div>减速上升</div>
</div>
</div>
<div class="proc" v-click>
<div class="proc-name">下降过程</div>
<CurlyBraceSvg />
<div class="proc-items">
<div>加速下降</div>
<div>匀速下降</div>
<div>减速下降</div>
</div>
</div>
</div>
</ElevatorWeightSim>
</div>

---
layout: base-flex
clicks: 2
title: '示数与重力'
---

<div class="page-grow">
<div class="ask">电梯不同运动状态下，秤的示数与重力是什么关系？</div>

<ElevatorWeightSim>
<ElevatorStateTable mode="reading" />
</ElevatorWeightSim>
</div>

---
layout: base-flex
clicks: 2
title: '加速度的方向'
---

<div class="page-grow">
<div class="ask ask-lead">这些状态的加速度方向分别是什么？超重、失重的共同点在哪里？</div>

<ElevatorStateTable mode="compare" />

<div class="tip-hint" v-click="2">超重：加速度向上；失重：加速度向下 —— 与电梯向上还是向下运动无关。</div>
</div>

---
layout: base-flex
clicks: 3
title: '为什么超重、失重'
---

<div class="page-grow">
<div class="ask ask-lead">为什么加速度向上就超重，向下就失重？</div>

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

<div class="tip-hint" v-click="3">电梯里向上加速、向下减速都超重——只看加速度方向，与速度方向无关。</div>
</div>

---
layout: base-flex
clicks: 3
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
<div class="ask ask-lead">张老师站在电梯里，电梯以加速度 <Latex tex="g" /> 向下加速下落。<br />他的脚对电梯地板还有压力吗？</div>

<div class="half-grid">
<div class="host">
<PersonWeightSvg
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
<div v-click="2"><Latex tex="F_N = 0" />，脚对电梯地板的压力 <Latex tex="F_N' = 0" />。</div>
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
<WaterBottleSvg :falling="false" label="静止" />
</div>
<div class="host" v-click="1">
<WaterBottleSvg :falling="true" label="自由下落" />
</div>
</div>

<div class="tip-hint" v-click="2">瓶和水一起以 <Latex tex="a = g" /> 向下加速，都处于完全失重：水不再挤压瓶壁，也就不会从小孔流出。航天器舱内液滴呈球形、气泡不上浮，也是同样的原因。</div>
</div>

---
layout: base-flex
clicks: 3
title: '超重的代价'
---

<div class="page-grow">
<div><b class="ex-no">例题</b>　火箭发射阶段，加速度可达 <Latex tex="3.5g" />。平时重 <Latex tex="10\ \text{N}" /> 的体内脏器，在这个阶段需要的支持力有多大？</div>

<div v-click="1">加速度方向向上，取向上为正：<Latex tex="F_N - mg = ma" /></div>
<div v-click="2"><Latex tex="F_N = mg + ma = mg + 3.5mg = 4.5mg = 4.5 \times 10\ \text{N} = 45\ \text{N}" /></div>
<div v-click="3" class="tip-hint">超重时，一切压在支持物上的东西都要多承受几倍的力。</div>
</div>

---
layout: base-flex
clicks: 1
title: '例题：电梯加速上升'
---

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div><b class="ex-no">例题</b>　质量 <Latex tex="60\ \text{kg}" /> 的人站在电梯内的水平地板上，电梯以 <Latex tex="0.25\ \text{m/s}^2" /> 的加速度匀加速上升。求人对电梯地板的压力。<br />（<Latex tex="g" /> 取 <Latex tex="9.8\ \text{m/s}^2" />）</div>
</div>
<div class="host">
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
title: '例题：电梯加速上升（解）'
---

<div class="page-grow">
<div>解：取竖直向上为正方向，由牛顿第二定律：<Latex tex="F_N - mg = ma" /></div>
<div v-click="1"><Latex tex="F_N = m(g+a) = 60 \times (9.8+0.25)\ \text{N} = 603\ \text{N}" /></div>
<div v-click="2">由牛顿第三定律，人对地板的压力 <Latex tex="F_N' = 603\ \text{N}" />，方向竖直向下。</div>
<div v-click="3" class="tip-hint">向上加速（或向下减速）时，<Latex tex="F_N \gt mg" />，出现超重。</div>
</div>

---
layout: base-flex
clicks: 2
title: '例题：示数变大了'
---

<div class="page-grow">
<div><b class="ex-no">例题</b>　某人站在电梯里的体重计上，发现示数是其体重的 <Latex tex="1.2" /> 倍。电梯可能在做什么运动？</div>

<div v-click="1">示数大于体重，即 <Latex tex="F_N \gt mg" />，所以加速度方向<b>向上</b>，<Latex tex="a = 0.2g" />。</div>
<div v-click="2" class="tip-hint">可能是<b>向上加速</b>，也可能是<b>向下减速</b> —— 运动方向无法唯一确定。</div>
</div>

---
layout: base-flex
clicks: 4
title: '蹦极中的超重与失重'
---

<div class="page-grow">
<div><b class="ex-no">例题</b>　运动员从高处跳下，弹性绳被拉直前做自由落体运动；弹性绳被拉直后，下降速度先增大、再减小，直到减为 0。下降过程中，运动员在哪些阶段分别处于超重、失重状态？</div>

<div v-click="1">绳被拉直前：<Latex tex="a = g" /> 向下 —— <b>完全失重</b>。</div>
<div v-click="2">绳被拉直后速度仍增大：弹力小于重力，<Latex tex="a" /> 向下 —— <b>失重</b>。</div>
<div v-click="3">速度减小时：绳的拉力 <Latex tex="F_T \gt mg" />（视重大于重力），<Latex tex="a" /> 向上 —— <b>超重</b>。</div>
<div v-click="4" class="tip-hint">全程速度都向下，却既有失重又有超重 —— 判断只看加速度方向。</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><mdi-scale-balance class="text-lg inline-block align-middle mr-1" /><b>视重</b>：物体对秤的压力或拉力；静止或匀速直线运动时等于重力。</div>
<div class="summary-line"><mdi-arrow-up-bold-outline class="text-lg inline-block align-middle mr-1" /><b>超重</b>：<Latex tex="F_N \gt mg" />，加速度方向向上（向上加速、向下减速）。</div>
<div class="summary-line"><mdi-arrow-down-bold-outline class="text-lg inline-block align-middle mr-1" /><b>失重</b>：<Latex tex="F_N \lt mg" />，加速度方向向下（向下加速、向上减速）。</div>
<div class="summary-line"><mdi-scale-off class="text-lg inline-block align-middle mr-1" /><b>完全失重</b>：<Latex tex="a = g" /> 向下，视重为 0。</div>
<div class="tip-hint">重力 <Latex tex="mg" /> 始终不变；超重和失重都是<b>视重相对于重力的变化</b>。</div>
</div>
</div>
