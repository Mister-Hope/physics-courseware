---
theme: default
title: "功、热和内能的改变"
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
chapter-no: "3.1"
chapter: "第三章 热力学定律"
subtitle: "做功 · 传热 · 内能"
---

<CoverDecorationSvg />

---
title: "迅速压下活塞，硝化棉为什么燃烧？"
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="wr-split wr-text">
<div class="wr-fig">
<FirePistonSvg :pressed="$clicks >= 1" />
</div>
<div class="stack">
<div class="ask">迅速压下活塞，硝化棉为什么会燃烧？</div>
<div class="wr-point" v-click="1">活塞下压，筒内气体体积变小，外界对气体做功。</div>
<div class="wr-point" v-click="2">气体内能增加、温度升高，达到硝化棉的燃点。</div>
</div>
</div>
</div>

---
title: "内能是什么？"
clicks: 2
clickAnimation: none
---

# 内能是什么？

<div class="page-grow">
<div class="stack">
<div class="wr-point" v-click="1"><strong>内能</strong>：物体内所有分子的热运动动能与分子间相互作用势能的总和。</div>
<div class="wr-point" v-click="1">内能由物体的<strong>温度</strong>、<strong>体积</strong>和分子数共同决定。</div>
<div class="tip-hint" v-click="2">内能是状态量：状态确定，内能就确定。</div>
</div>
</div>

---
title: "焦耳怎样用不同方式使水温升高？"
clicks: 3
clickAnimation: none
---

# 焦耳怎样用不同方式使水温升高？

<div class="page-grow">
<div class="wr-split">
<div class="wr-fig">
<JouleExperimentsSvg />
</div>
<div class="stack">
<div class="mini-note">两次实验，水温都升高了，但做功的形式不同。</div>
<div class="wr-point" v-click="1"><strong>实验 1</strong>：重物下落，带动叶片搅水，水温升高。</div>
<div class="wr-point" v-click="2"><strong>实验 2</strong>：电流通过电阻丝，水温升高。</div>
<div class="wr-point" v-click="3">只要做功相同，水温上升的数值就相同。</div>
</div>
</div>
</div>

---
title: "为什么说系统存在内能？"
clicks: 3
clickAnimation: none
---

# 为什么说系统存在内能？

<div class="page-grow">
<div class="stack">
<div class="wr-point" v-click="1">各种绝热过程，只要始、末状态相同，外界做的功都相同。</div>
<div class="wr-point" v-click="2">这个功只由始、末状态决定，与做功的具体方式无关。</div>
<div class="wr-point" v-click="3">就像重力势能一样，系统必定存在一个只由状态决定的物理量——<strong>内能</strong>。</div>
</div>
</div>

---
title: "绝热过程中，功怎样改变内能？"
clicks: 2
clickAnimation: none
---

# 绝热过程中，功怎样改变内能？

<div class="page-grow">
<div class="ask">系统与外界没有热交换，外界对系统做功，内能怎样变？</div>
<div class="wr-formula-big" v-click="1"><Latex tex="\Delta U=U_2-U_1=W" display /></div>
<div class="stack">
<div class="wr-point" v-click="1"><strong>外界对系统做功</strong>：<Latex tex="W>0" />，内能增加。</div>
<div class="wr-point" v-click="2"><strong>系统对外做功</strong>：<Latex tex="W<0" />，内能减少。</div>
</div>
<div class="tip-hint" v-click="2">过程进行得很快、来不及交换热量时，可以看成绝热过程。</div>
</div>

---
title: "瓶塞跳出时，瓶内为什么出现白雾？"
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="wr-split wr-text">
<div class="wr-fig">
<BottleFogSvg :popped="$clicks >= 1" />
</div>
<div class="stack">
<div class="ask">塞子跳出后，瓶内为什么出现白雾？</div>
<div class="wr-point" v-click="1">气体迅速膨胀，对外做功，内能减少。</div>
<div class="wr-point" v-click="2">温度迅速降低，水蒸气液化，形成白雾。</div>
</div>
</div>
</div>

---
title: "只靠传热，能不能改变内能？"
clicks: 2
clickAnimation: none
---

# 只靠传热，能不能改变内能？

<div class="page-grow">
<div class="mini-note">热传递的方向：从高温物体到低温物体。</div>
<div class="wr-formula-big" v-click="1"><Latex tex="\Delta U=U_2-U_1=Q" display /></div>
<div class="stack">
<div class="wr-point" v-click="1"><strong>吸热</strong>：<Latex tex="Q>0" />，内能增加。</div>
<div class="wr-point" v-click="2"><strong>放热</strong>：<Latex tex="Q<0" />，内能减少。</div>
</div>
</div>

---
title: "热量是物体含有的能量吗？"
clicks: 2
clickAnimation: none
---

# 热量是物体“含有”的能量吗？

<div class="page-grow">
<div class="stack">
<div class="wr-point" v-click="1">热量只在<strong>能量转移</strong>的过程中才有意义。</div>
<div class="wr-point" v-click="1">不能说物体含有多少热量，只能说某过程中吸收或放出了多少热量。</div>
<div class="tip-hint" v-click="2">内能是状态量，热量是过程量。</div>
</div>
</div>

---
title: "做功和传热，改变内能的方式有什么不同？"
clicks: 1
clickAnimation: none
---

# 做功和传热，改变内能的方式有什么不同？

<div class="page-grow">
<table class="wr-table">
<thead>
<tr><th>方式</th><th>能量怎样变化</th><th>例子</th></tr>
</thead>
<tbody>
<tr><td>做功</td><td>内能与其他形式的能相互<strong>转化</strong></td><td>压缩气体、搅拌液体</td></tr>
<tr><td>传热</td><td>内能从高温物体<strong>转移</strong>到低温物体</td><td>火炉烤手、冰袋降温</td></tr>
</tbody>
</table>
<div class="summary-line" v-click="1">做功和传热都能改变内能，但一个是转化，一个是转移。</div>
</div>

---
title: "做功和传热的效果可以等效吗？"
clicks: 3
clickAnimation: none
---

# 做功和传热的效果可以等效吗？

<div class="page-grow">
<div class="mini-note">同样从初态到末态，可以只做功，也可以只传热。</div>
<div class="stack">
<div class="wr-point" v-click="1">使系统从同一初态到同一末态，做功和传热可以有不同的组合，但内能的变化相同。</div>
<div class="wr-point" v-click="2">内能的变化 <Latex tex="\Delta U" /> 只由初、末状态决定。</div>
<div class="wr-point" v-click="3"><Latex tex="W" /> 和 <Latex tex="Q" /> 是过程量，数值随过程不同而不同。</div>
</div>
</div>

---
layout: exercise-split
class: ex-top
title: "例题：铅弹射入木块后温度升高多少？"
analysisLabel: 解答
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

一质量为 $m$ 的铅弹以速度 $v=200\ \text{m/s}$ 水平射入木块后停在木块中，木块固定不动。若铅弹增加的内能有 $80\%$ 用来使铅弹升温，铅弹的温度升高多少？（不计铅弹熔化）

已知铅的比热容 $c=1.3\times10^{2}\ \text{J/(kg·℃)}$。

</template>

<div class="wr-point">铅弹克服阻力做功，动能转化为内能：<Latex tex="\Delta U=\frac12 mv^2" />。</div>
<div class="wr-point" v-click="1">其中 80% 用来升温：<Latex tex="0.8\times\frac12 mv^2=mc\Delta T" />。</div>
<div class="wr-point" v-click="2">解得 <Latex tex="\Delta T=\frac{0.4v^2}{c}=\frac{0.4\times(200)^2}{1.3\times10^2}\approx1.2\times10^2\ ^{\circ}\mathrm{C}" />。</div>
<div class="summary-line" v-click="3">铅弹的温度约升高 <Latex tex="1.2\times10^2\ ^{\circ}\mathrm{C}" />。</div>

---
layout: exercise-split
class: ex-top
title: "练习：两个焦耳实验中能量怎样转化？"
clicks: 2
clickAnimation: none
---

<template v-slot:stem>

上页两个焦耳实验中，各是什么形式的能转化为系统的内能？

</template>

<div class="wr-point" v-click="1">左图（重物搅水）：重物的重力势能转化为水的内能。</div>
<div class="wr-point" v-click="2">右图（电流加热）：电能转化为水的内能。</div>
<div class="summary-line" v-click="2">两个实验都说明：做功可以改变系统的内能。</div>

---
layout: exercise-split
class: ex-top
title: "练习：这些过程中内能怎样改变？"
clicks: 2
clickAnimation: none
---

<template v-slot:stem>

下列事件中，物体的内能怎样改变？

（1）壶里的水被加热升温；

（2）烧红的铁棒逐渐冷却。

</template>

<div class="wr-point" v-click="1">（1）水吸收热量，内能增加。</div>
<div class="wr-point" v-click="2">（2）铁棒放出热量，内能减少。</div>

---
layout: exercise-split
class: ex-top
title: "练习：绝热膨胀和绝热压缩"
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

气体绝热膨胀或绝热压缩时，温度怎样变化？为什么？各举一个实例。

</template>

<div class="wr-point" v-click="1"><strong>绝热膨胀</strong>：气体对外做功，<Latex tex="W<0" />，内能减少，温度降低。实例：瓶塞跳出时瓶内出现白雾。</div>
<div class="wr-point" v-click="2"><strong>绝热压缩</strong>：外界对气体做功，<Latex tex="W>0" />，内能增加，温度升高。实例：压缩引火仪点燃硝化棉、柴油机压缩空气点火。</div>
<div class="tip-hint" v-click="3">判断依据：绝热过程中 <Latex tex="\Delta U=W" />。</div>

---
title: "这一节：功、热和内能怎样联系？"
clicks: 1
clickAnimation: none
---

# 这一节：功、热和内能怎样联系？

<div class="page-grow">
<div class="wr-split">
<div class="stack">
<div class="wr-point"><strong>绝热过程</strong>：<Latex tex="\Delta U=W" /></div>
<div class="wr-point"><strong>单纯传热</strong>：<Latex tex="\Delta U=Q" /></div>
<div class="wr-point">做功与传热都能改变内能，效果可以等效。</div>
</div>
<div class="stack">
<div class="mini-title">两种方式的区别</div>
<div>做功：其他形式的能与内能相互转化</div>
<div>传热：内能从一个物体转移到另一个物体</div>
</div>
</div>
<div class="ask" v-click="1">如果同时做功和传热，内能的变化又该怎样计算？</div>
</div>

---
title: "下一节：如果同时做功和传热呢？"
clickAnimation: none
---

# 下一节：如果同时做功和传热呢？

<div class="page-grow">
<div class="wr-split">
<div class="stack">
<div class="mini-title">这一节的两条路径</div>
<div>绝热过程：<Latex tex="\Delta U=W" /></div>
<div>单纯传热：<Latex tex="\Delta U=Q" /></div>
</div>
<div class="stack">
<div class="mini-title">下一节要研究</div>
<div>做功和传热同时发生时，内能的变化与 <Latex tex="W" />、<Latex tex="Q" /> 的关系。</div>
<div class="tip-hint">这就是热力学第一定律。</div>
</div>
</div>
</div>
