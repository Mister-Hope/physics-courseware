---
theme: default
title: "波的反射、折射和衍射"
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
subtitle: "波遇到界面和障碍物时"
# 页面外壳用共享 addon 的 base-flex 布局（flex 列；正文 .page-grow 靠它撑满）
defaults:
  layout: base-flex
  transition: fade
chapter-no: "3.3"
chapter: "第三章 机械波"
---
<CoverDecorationSvg />

---
layout: base-flex
title: 回声与水波
clicks: 1
---
<div class="page-grow pt2">
<div class="ask ask-lead p2-ask">
<div>对着远处的峭壁喊一声，会听到回声。</div>
<div>水波遇到挡板，传播方向也会改变。</div>
<div>波遇到障碍物或界面，会怎样传播？</div>
</div>
<div class="p2-cases">
<div class="p2-case">
<mdi-bullhorn class="icon-xl p2-icon" />
<div class="p2-case-title">声波的反射</div>
<div class="p2-case-text">声音碰到峭壁反射回来，形成回声。</div>
</div>
<div class="p2-case">
<mdi-waves class="icon-xl p2-icon" />
<div class="p2-case-title">水波的反射</div>
<div class="p2-case-text">水波遇到挡板，传播方向发生改变。</div>
</div>
</div>
<div class="tip-hint" v-click="1">波遇到障碍物或界面时，传播方向会发生改变。</div>
</div>

---
layout: base-flex
title: 波的反射
clicks: 3
---
# 波的反射

<div class="page-grow pt3">
<div class="ask">水波遇到挡板后，反射线与入射线有什么关系？</div>
<div class="p3-fig"><ReflectionWavefrontSvg /></div>
<div class="p3-laws">
<div class="p3-law" v-click="1"><span class="p3-no">1</span><span>反射线、法线与入射线在同一平面内。</span></div>
<div class="p3-law" v-click="2"><span class="p3-no">2</span><span>反射线与入射线分居法线两侧。</span></div>
<div class="p3-law" v-click="3"><span class="p3-no">3</span><span>反射角等于入射角。</span></div>
</div>
<div class="tip-hint" v-click="3">这就是波的反射定律，与光的反射规律相同。</div>
</div>

---
layout: base-flex
title: 回声与反射应用
clicks: 1
---
# 回声与反射

<div class="page-grow pt4">
<div class="ask">为什么在空旷的山谷里能听到回声？</div>
<div class="half-grid p4-grid">
<div class="p4-card">
<mdi-bullhorn class="icon-xl p4-icon" />
<div class="p4-title">回声</div>
<div class="p4-text" v-click="1">声波遇到峭壁等障碍物反射回来，形成回声。</div>
</div>
<div class="p4-card">
<mdi-bat class="icon-xl p4-icon" />
<div class="p4-title">回声定位</div>
<div class="p4-text" v-click="1">蝙蝠发出超声波，靠反射波判断前方障碍物。</div>
</div>
</div>
<div class="tip-hint" v-click="1">反射是波遇到障碍物时改变传播方向的现象。</div>
</div>

---
layout: base-flex
title: 波的折射
clicks: 2
---
# 波的折射

<div class="page-grow pt5">
<div class="ask">水波从深水区进入浅水区，传播方向为什么会改变？</div>
<div class="p5-fig"><RefractionWavefrontSvg /></div>
<div class="p5-notes">
<div class="p5-item" v-click="1"><span class="p5-no">1</span><div>波线在两种介质的分界面处发生偏折。</div></div>
<div class="p5-item" v-click="2"><span class="p5-no">2</span><div>深水区波速大，浅水区波速小。</div></div>
</div>
<div class="info-hint">一切波都会发生折射。</div>
</div>

---
layout: base-flex
title: 折射中什么变、什么不变
clicks: 3
---
# 折射中什么变、什么不变

<div class="page-grow pt6">
<div class="ask">波从一种介质进入另一种介质，频率、波速、波长中哪些会改变？</div>
<div class="three-col p6-cards">
<div class="p6-card">
<div class="p6-tag">频率</div>
<div class="p6-prompt">判断：</div>
<div class="p6-value" v-click="1">不变</div>
<div class="p6-text" v-click="1">由波源决定，进入另一种介质后频率不变。</div>
</div>
<div class="p6-card">
<div class="p6-tag">波速</div>
<div class="p6-prompt">判断：</div>
<div class="p6-value" v-click="2">改变</div>
<div class="p6-text" v-click="2">波速由介质本身的性质决定。</div>
</div>
<div class="p6-card">
<div class="p6-tag">波长</div>
<div class="p6-prompt">判断：</div>
<div class="p6-value" v-click="3">改变</div>
<div class="p6-text" v-click="3">由 <Latex tex="v=\lambda f" /> 得 <Latex tex="\lambda=v/f" />。</div>
</div>
</div>
<div class="summary-line" v-click="3">频率不变，波速改变，所以波长一定改变。</div>
</div>

---
layout: base-flex
title: 折射的定性规律
clicks: 2
---
# 折射的定性规律

<div class="page-grow pt7">
<div class="ask">图中入射角 <Latex tex="\theta_1" /> 和折射角 <Latex tex="\theta_2" />，哪个大？为什么？</div>
<div class="p7-fig"><RefractionWavefrontSvg /></div>
<div class="p7-rules">
<div class="p7-rule"><span class="p7-no">1</span><span>从深水进入浅水，波速变小，折射角变小，即 <Latex tex="\theta_2<\theta_1" />。</span></div>
<div class="p7-rule" v-click="1"><span class="p7-no">2</span><span>从浅水进入深水，波速变大，折射角变大，即 <Latex tex="\theta_2>\theta_1" />。</span></div>
<div class="p7-rule" v-click="2"><span class="p7-no">3</span><span>垂直界面入射时，传播方向不变。</span></div>
</div>
<div class="tip-hint" v-click="2">折射角的大小由两种介质的波速和入射角共同决定。</div>
</div>

---
layout: base-flex
title: 波的衍射
clicks: 2
---
# 波的衍射

<div class="page-grow pt8">
<div class="ask">波遇到障碍物或小孔后，会怎样传播？</div>
<div class="p8-fig"><DiffractionSvg /></div>
<div class="p8-notes">
<div class="p8-note" v-click="1"><span class="p8-no">1</span><span>波绕过障碍物继续传播，叫波的衍射。</span></div>
<div class="p8-note" v-click="2"><span class="p8-no">2</span><span>波通过小孔后，会向各个方向传播。</span></div>
</div>
<div class="info-hint">衍射是波特有的现象，一切波都能发生衍射。</div>
</div>

---
layout: base-flex
title: 明显衍射的条件
clicks: 3
---
# 明显衍射的条件

<div class="page-grow pt9">
<div class="ask">三幅图中缝宽 <Latex tex="d" /> 相同，波长依次减小。缝宽和波长满足什么关系时，衍射才明显？</div>
<div class="p9-fig"><DiffractionConditionSvg /></div>
<div class="p9-notes">
<div class="p9-item" v-click="1"><span class="p9-no">1</span><div>缝宽与波长相差不多时，衍射明显，波能绕到障碍物后面。</div></div>
<div class="p9-item" v-click="2"><span class="p9-no">2</span><div>波长比缝宽小得多时，波近似沿直线传播，衍射不明显。</div></div>
</div>
<div class="tip-hint" v-click="3">缝、孔或障碍物的尺寸跟波长相差不多，或比波长小时，衍射才明显。</div>
</div>

---
layout: base-flex
title: 缝宽与波长
clicks: 1
---
# 缝宽与波长

<div class="page-grow pt10">
<div class="ask">改变缝宽与波长的比值，衍射的明显程度会怎样变化？</div>
<DiffractionDemo />
<div class="tip-hint" v-click="1">比值越小，衍射越明显；缝宽比波长大得多时，衍射不明显。</div>
</div>

---
layout: base-flex
title: 声波的衍射
clicks: 1
---
# 声波的衍射

<div class="page-grow pt11">
<div class="ask">为什么隔着墙能听到声音，却看不到说话的人？</div>
<div class="p11-grid">
<div class="p11-card p11-sound">
<div class="p11-title"><mdi-ear-hearing /> 声波</div>
<div class="p11-text">波长约 <Latex tex="1.7\ \text{cm}\sim17\ \text{m}" />，与门窗、墙壁的尺寸可比，衍射明显，能绕过障碍物。</div>
</div>
<div class="p11-card p11-light">
<div class="p11-title"><mdi-lightbulb-on-outline /> 光波</div>
<div class="p11-text">波长极短，一般障碍物的尺寸远大于光波长，衍射不明显，光近似沿直线传播。</div>
</div>
</div>
<div class="tip-hint" v-click="1">“闻其声而不见其人”，是声波和光波波长不同造成的。</div>
</div>

---
layout: base-flex
title: 三种现象对比
---
# 三种现象对比

<div class="page-grow pt12">
<div class="p12-table">
<div class="p12-row p12-head"><span>现象</span><span>传播方向</span><span>频率</span><span>发生条件</span><span>实例</span></div>
<div class="p12-row"><span>反射</span><span>返回原介质</span><span>不变</span><span>遇到界面</span><span>回声、水波遇挡板</span></div>
<div class="p12-row"><span>折射</span><span>进入另一种介质，方向偏折</span><span>不变</span><span>斜射入不同介质</span><span>深水→浅水、光入水</span></div>
<div class="p12-row"><span>衍射</span><span>绕过障碍物，过孔扩散</span><span>不变</span><span>尺寸与波长相差不多或更小</span><span>闻其声不见其人</span></div>
</div>
<div class="mini-note">反射和折射中频率都不变；衍射是波特有的现象。</div>
</div>

---
layout: exercise-split
title: 例题：蝙蝠的回声定位
analysisLabel: 解析
clicks: 3
---
<template v-slot:stem>
蝙蝠在夜间飞行，靠什么发现前方的障碍物？科学家把系有铜铃的绳索横跨在蝙蝠飞行的空间里，蝙蝠能在黑暗中避开绳索而不碰响铜铃。这说明蝙蝠发出的声波频率应有什么特点？试估算。
</template>

<div class="p13-analysis">
<div class="p13-line" v-click="1">蝙蝠靠回声定位：发出声波，遇到障碍物反射回来。</div>
<div class="p13-line" v-click="2">要分辨细绳和铜铃，声波波长应与它们的尺寸（约毫米级）相差不多或更小。</div>
<div class="p13-line" v-click="3">取 <Latex tex="\lambda\sim1\ \text{mm}" />，<Latex tex="v\approx340\ \text{m/s}" />，则 <Latex tex="f=v/\lambda\sim3.4\times10^5\ \text{Hz}" />，属于超声波。</div>
</div>

---
layout: exercise-split
title: 例题：大楼后的音乐
analysisLabel: 解析
clicks: 3
---
<template v-slot:stem>
操场上的喇叭同时播放高音和低音。走到教学楼后，听到的音乐声减弱。高音还是低音减弱更明显？为什么？
</template>

<div class="p14-analysis">
<div class="p14-line" v-click="1">声波遇到教学楼，部分被挡住，部分绕过教学楼继续传播，这是衍射。</div>
<div class="p14-line" v-click="2">低音频率低，由 <Latex tex="\lambda=v/f" /> 可知波长长，衍射更明显，更容易绕过教学楼。</div>
<div class="p14-line" v-click="3">高音频率高、波长短，衍射不明显，被教学楼挡住，所以高音减弱更明显。</div>
</div>

---
layout: exercise-split
title: 例题：挡板小孔
analysisLabel: 解析
clicks: 3
---
<template v-slot:stem>
如图，挡板 M 固定，N 可上下移动，M、N 间的空隙当作“小孔”做水波衍射实验。P 点的水没有振动起来。怎样使挡板左边的振动传到 P 点？
</template>

<template v-slot:fig>
<SlitBaffleSvg class="p15-fig" />
</template>

<div class="p15-analysis">
<div class="p15-line" v-click="1">P 点没有振动，说明衍射不明显：缝宽比波长大得多，波主要沿直线传播。</div>
<div class="p15-line" v-click="2">把 N 向上移动，减小缝宽，使缝宽与波长相差不多或更小。</div>
<div class="p15-line" v-click="3">也可以增大波长（降低波源频率），使衍射更明显。</div>
</div>

---
layout: exercise-split
title: 练习：人耳能听到的波长
analysisLabel: 解析
clicks: 2
---
<template v-slot:stem>
假想人耳可听的声波波长在毫米数量级。从波的衍射角度思考，这对我们的生活会产生什么影响？
</template>

<div class="p16-analysis">
<div class="p16-line" v-click="1">一般障碍物、门窗的尺寸远大于毫米级波长，衍射不明显，声音近似沿直线传播。</div>
<div class="p16-line" v-click="2">障碍物后会出现明显的“声影”，隔着墙或拐角听不到声音；听声更定向，但不利于察觉背后的声源。</div>
</div>

---
layout: base-flex
title: 课堂小结
clicks: 4
---
# 课堂小结

<div class="page-grow pt17">
<div class="step-list p17-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>反射：反射角等于入射角；反射线、入射线、法线共面，分居法线两侧。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>折射：频率不变；波速由介质决定；波长随波速改变，<Latex tex="v=\lambda f" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>衍射：波绕过障碍物、过孔扩散；孔、缝或障碍物尺寸与波长相差不多或更小时明显；一切波都能衍射。</div></div>
<div class="step-item" v-click="4"><span class="step-no">4</span><div>声波波长约 <Latex tex="1.7\ \text{cm}\sim17\ \text{m}" />，能绕过一般障碍物；光波波长极短，衍射不明显。</div></div>
</div>
</div>

---
layout: exercise-split
title: 练习：判断现象
analysisLabel: 解析
clicks: 3
---
<template v-slot:stem>
判断下列现象主要体现波的什么现象：<br>（1）山谷中的回声；<br>（2）水波通过小孔后向四周扩散；<br>（3）水波从深水区进入浅水区后传播方向改变。
</template>

<div class="p18-analysis">
<div class="p18-line" v-click="1"><span class="p18-tag">反射</span>声波遇到山体界面返回。</div>
<div class="p18-line" v-click="2"><span class="p18-tag">衍射</span>波通过小孔后向各个方向传播。</div>
<div class="p18-line" v-click="3"><span class="p18-tag">折射</span>波进入不同介质，波速改变，传播方向偏折。</div>
</div>
