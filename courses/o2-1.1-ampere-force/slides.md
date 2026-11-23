---
theme: default
title: "磁场对通电导线的作用力"
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
chapter-no: "1.1"
chapter: "第一章 安培力与洛伦兹力"
---

<CoverDecorationSvg />

---
clicks: 1
title: 通电导线在磁场中
---

<div class="half-grid page-grow items-center">
<div class="stack">
<div class="ask">把一段通电导线放进磁场，会发生什么？</div>
<div class="tip-hint" v-click="1">导线受到磁场的作用力，这个力叫安培力。</div>
</div>
<AmpereRailDemo :step="$clicks" />
</div>

---
clicks: 3
title: 改变电流或磁场的方向
---

<script setup>
import { ref } from "vue";

const iUp = ref(true);
const bIn = ref(true);
</script>

<div class="half-grid page-grow items-center">
<AmpereRailDemo :i-up="iUp" :b-in="bIn" :show-force="true" />
<div class="stack">
<div class="ask">只改变 <Latex tex="I" /> 或 <Latex tex="B" /> 的方向，安培力怎样变？</div>
<div class="btn-row">
<button type="button" class="toggle-btn" @click.stop="iUp = !iUp">电流向{{ iUp ? '上' : '下' }}</button>
<button type="button" class="toggle-btn" @click.stop="bIn = !bIn">磁场向{{ bIn ? '里' : '外' }}</button>
</div>
<div class="tip-hint" v-click="1">只改变电流方向，安培力方向反向。</div>
<div class="tip-hint" v-click="2">只改变磁场方向，安培力方向也反向。</div>
<div class="tip-hint" v-click="3">电流、磁场同时反向，安培力方向不变。</div>
</div>
</div>

---
clicks: 3
---

# 安培力的方向

<div class="half-grid page-grow items-center">
<div class="stack">
<div class="ask">安培力 <Latex tex="F" /> 与电流 <Latex tex="I" />、磁场 <Latex tex="B" /> 在方向上是什么关系？</div>
<div class="tip-hint" v-click="1">安培力 <Latex tex="F" /> 与电流 <Latex tex="I" /> 垂直，也与磁场 <Latex tex="B" /> 垂直。</div>
<div class="tip-hint" v-click="2">安培力垂直于 <Latex tex="I" /> 和 <Latex tex="B" /> 所决定的平面。</div>
<div class="tip-hint" v-click="3"><Latex tex="I" /> 与 <Latex tex="B" /> 不一定垂直；只要它们不平行，就共同决定一个平面。</div>
</div>
<TriadSvg :show-f="$clicks >= 1" />
</div>

---
clicks: 1
title: 左手定则
---

<div class="half-grid page-grow items-center">
<div class="stack">
<div class="ask ask-lead">怎样用一个动作判断 <Latex tex="F" /> 的方向？</div>
<DefinitionBox term="左手定则" v-click="1">
<div>伸开左手，使拇指与四指垂直，且都与手掌在同一平面内。</div>
<div>让磁感线垂直穿入掌心，四指指向电流的方向。</div>
<div>拇指所指的方向就是安培力的方向。</div>
</DefinitionBox>
</div>
<div v-click="1">
<LeftHandRuleSvg />
</div>
</div>

---
clicks: 3
title: 练习：补全方向
---

<div class="page-grow">
<div class="ask">根据左手定则，补全每个图中第三个量的方向。</div>
<DirectionQuiz :step="$clicks" />
</div>

---
layout: exercise-split
title: 练习：斜向磁场中的安培力
clicks: 1
---

<template v-slot:stem>
一根导线 <Latex tex="ab" /> 水平放置在匀强磁场中，导线中的电流由 <Latex tex="a" /> 到 <Latex tex="b" />；磁场方向在纸面内，与导线成 <Latex tex="30^\circ" /> 角。画出导线所受安培力的方向。
</template>

<template v-slot:fig>
<ObliqueForce :show-f="$clicks >= 1" />
</template>

<div v-click="1">由左手定则，安培力 <Latex tex="F" /> 同时垂直于 <Latex tex="I" /> 和 <Latex tex="B" />，即垂直于纸面向外。</div>

---
clicks: 1
---

# 安培力的大小

<div class="half-grid page-grow items-center">
<div class="stack">
<div class="ask">导线与磁场垂直时，安培力多大？</div>
<div class="tip-hint" v-click="1"><Latex tex="F = IlB" />。式中 <Latex tex="F" /> 用 <Latex tex="\text{N}" />、<Latex tex="I" /> 用 <Latex tex="\text{A}" />、<Latex tex="l" /> 用 <Latex tex="\text{m}" />、<Latex tex="B" /> 用 <Latex tex="\text{T}" />。</div>
</div>
<AmperePerpSvg />
</div>

---
clicks: 1
---

# 安培力的大小

<div class="stack page-grow">
<div class="ask">改变 <Latex tex="I" />、<Latex tex="l" />、<Latex tex="B" />，安培力怎样变？</div>
<AmpereMagnitude />
<div class="tip-hint" v-click="1"><Latex tex="F" /> 与 <Latex tex="I" />、<Latex tex="l" />、<Latex tex="B" /> 都成正比：<Latex tex="F = IlB" />。</div>
</div>

---
clicks: 2
---

<div class="stack page-grow">
<div class="ask">导线与磁场不垂直时，安培力多大？</div>
<AmpereAngleLab :step="$clicks" />
<div class="tip-hint" v-click="1">把 <Latex tex="B" /> 分解：<Latex tex="B_{\parallel} = B\cos\theta" /> 不产生安培力，<Latex tex="B_{\perp} = B\sin\theta" /> 产生安培力。</div>
<div class="tip-hint" v-click="2"><Latex tex="F = IlB\sin\theta" />；<Latex tex="\theta = 90^\circ" /> 时 <Latex tex="F = IlB" />，<Latex tex="\theta = 0" /> 时 <Latex tex="F = 0" />。</div>
</div>

---
clicks: 2
---

# 安培力的大小

<div class="stack page-grow">
<div class="ask">弯成 V 形的导线，安培力多大？</div>
<EffectiveLengthSvg :step="$clicks" />
<div class="tip-hint" v-click="1">有效长度：从起点到终点的有向线段，长度等于两端点间的距离。</div>
<div class="tip-hint" v-click="2"><Latex tex="F = BIl" />，方向由左手定则判断。</div>
</div>
