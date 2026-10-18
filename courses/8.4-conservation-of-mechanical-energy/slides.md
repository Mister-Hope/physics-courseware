---
theme: default
title: "机械能守恒定律"
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
chapter-no: "8.4"
chapter: "第八章 机械能守恒定律"
subtitle: "机械能 · 守恒条件 · 能量的耗散"
---

<div class="fig-ph" style="max-width: 560px; margin: 0 auto;">

【图占位】封面装饰：单摆三个位置 + 动能/势能两条能量条。

</div>

---
title: 追寻守恒量
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="ask">

小球从斜面 A 释放、沿斜面 B 上升，能升到多高？

</div>

<div class="fig-ph" v-click="1">

【图占位】伽利略斜面：A 面释放，B 面陡、缓两条轨迹，过出发点画水平虚线。

</div>

<div class="text-center" v-click="2">

斜面 B 陡些或缓些，小球总回到<b>出发点的高度</b>。

</div>

<div class="text-center" v-click="3">

速度、高度都在变，可<b>有某个量始终不变</b>。

</div>

</div>

---
title: 两种描述
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="ask">

用「力与运动」的语言，能说清这个事实吗？

</div>

<div v-click="1">

重力使小球滚下斜面 A，惯性使它滚上斜面 B——这个描述说不到那个不变的事实。

</div>

<div v-click="2">

如果阻力和摩擦力小到可以忽略，小球<b>必将准确地终止于它开始运动时的高度</b>。

</div>

<div class="tip-hint" v-click="3">

伽利略已经走到机械能守恒的大门口，只是当时还没有「能量」的概念。

</div>

</div>

---
title: 动能与重力势能的相互转化
clicks: 4
---

<div class="page-grow flex flex-col">

<div class="ask">

减少的重力势能到哪里去了？

</div>

<div class="fig-ph" v-click="1">

【交互占位】自由落体能量演示：拖动改变高度与质量，显示势能、动能与两者之和。

</div>

<div v-click="2">

重力做正功：重力势能减少、动能增加——重力势能<b>转化成了动能</b>。

</div>

<div v-click="3">

沿光滑斜面上升时相反：重力做负功，动能<b>转化成了重力势能</b>。

</div>

<div class="tip-hint" v-click="4">

两者可以相互转化。

</div>

</div>

---
title: 弹性势能与动能 · 机械能
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="fig-ph" v-click="1">

【图占位】弹簧把物体弹出；运动员从跳板上弹起。

</div>

<div v-click="2">

弹力做正功：弹性势能减少、动能增加——弹性势能<b>转化成了动能</b>。

</div>

<div v-click="3">

<DefinitionBox term="机械能">

重力势能、弹性势能与动能都是机械运动中的能量形式，统称为机械能。

<Latex tex="E = E_k + E_p" display />

</DefinitionBox>

</div>

</div>

---
title: 两种下落
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="ask">

真空中的下落，和空气中有阻力的下落，有什么不同？

</div>

<div class="fig-ph">

【图占位】两个小球从 h1 落到 h2：左侧真空只画重力，右侧画出重力与阻力。

</div>

<div v-click="1">

重力做的功 <Latex tex="W_G = mgh_1 - mgh_2" /> 与重力势能的变化<b>都相等</b>——只由高度差决定。

</div>

<div v-click="2">

动能的变化<b>不相等</b>：空气中阻力做负功，只有<b>一部分</b>势能转化为动能。

</div>

<div class="tip-hint" v-click="3">

真空中重力势能全部转化为动能；有阻力时只有一部分。

</div>

</div>

---
title: 现实中的机械能损失
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="ask">

在现实中，机械能守恒吗？

</div>

<div v-click="1">

只要物体在地面上运动，空气阻力、摩擦力就不可避免。它们做负功，机械能被<b>耗散</b>。

</div>

<div class="fig-ph" v-click="2">

【图占位】滑雪者沿斜面下滑：重力、支持力、阻力；对比阻力可忽略/较大两种。

</div>

<div v-click="3">

阻力可忽略 → 只有重力做功；阻力较大 → 机械能不守恒。

</div>

<div class="warn-hint" v-click="3">

只有天体之间那种近似真空的情形，机械能才严格守恒。

</div>

</div>

---
title: 只有重力做功时的定量关系
clicks: 4
---

<div class="page-grow flex flex-col">

<div class="fig-ph">

【图占位】光滑曲面：A 点标 h1、v1，B 点标 h2、v2，并画出重力与支持力。

</div>

<div v-click="1">

支持力方向与运动方向垂直、不做功，所以<b>只有重力做功</b>。

</div>

<div v-click="2">

动能定理：<Latex tex="W = \dfrac{1}{2}mv_2^2 - \dfrac{1}{2}mv_1^2" />

</div>

<div v-click="3">

重力做的功等于重力势能的减少：<Latex tex="W = mgh_1 - mgh_2" />

</div>

<div v-click="4">

移项得 <Latex tex="\dfrac{1}{2}mv_2^2 + mgh_2 = \dfrac{1}{2}mv_1^2 + mgh_1" />

</div>

</div>

---
title: 讨论：上升过程
clicks: 2
---

<div class="page-grow flex flex-col">

<div class="ask">

从 B 上升到 A、重力做负功，关系式还成立吗？

</div>

<div class="fig-ph" v-click="1">

【图占位】同一曲面改为 B 到 A：速度沿曲面向上，重力方向不变。

</div>

<div class="tip-hint" v-click="2">

<Latex tex="W" /> 为负只说明势能增加、动能减少，移项后的等式<b>形式完全相同</b>。

</div>

</div>

---
title: 机械能守恒定律
clicks: 4
---

<div class="page-grow flex flex-col">

<div v-click="1">

在只有弹力做功的系统内，动能与弹性势能互相转化时总的机械能也保持不变。

</div>

<div v-click="2">

<DefinitionBox term="机械能守恒定律">

在只有重力或弹力做功的物体系统内，动能与势能可以互相转化，而总的机械能保持不变。

</DefinitionBox>

</div>

<div class="half-grid" v-click="3">

<div class="text-center">

<Latex tex="\dfrac{1}{2}mv_2^2 + mgh_2 = \dfrac{1}{2}mv_1^2 + mgh_1" />

</div>

<div class="text-center">

<Latex tex="\Delta E_k = -\Delta E_p" />

</div>

</div>

<div class="warn-hint" v-click="4">

前提是<b>只有重力（或系统内弹力）做功</b>，条件不满足等式就不成立。

</div>

</div>

---
title: 守恒条件的判断
clicks: 2
---

<div class="page-grow flex flex-col">

<div class="ask">

下面两个过程中，机械能守恒的是哪些？

</div>

<div class="fig-ph">

【图占位】A 跳伞运动员匀速下落；B 抛出的标枪。

</div>

<div v-click="1">

A：受重力与空气阻力，阻力与运动方向相反、做负功。

</div>

<div v-click="2">

B：不计空气阻力，只受重力，只有重力做功。

</div>

</div>

---
title: 守恒条件的判断
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="ask">

再看两个过程，机械能守恒的是哪些？

</div>

<div class="fig-ph">

【图占位】C 沿光滑斜面匀速上升的金属块；D 光滑水平面上压缩弹簧的小球。

</div>

<div v-click="1">

C：受重力、支持力与拉力，拉力沿运动方向<b>做正功</b>。

</div>

<div v-click="2">

D：小球与弹簧组成系统，只有弹力做功。

</div>

<div class="tip-hint" v-click="3">

看的是<b>有没有其他力做功</b>，不是受力个数。

</div>

</div>

---
title: 例题 单摆
clicks: 3
layout: exercise-split
---

<template v-slot:stem>

摆长为 <Latex tex="l" />、最大偏角为 <Latex tex="\theta" />。阻力可以忽略，求小球运动到最低点时的速度大小。

</template>

<template v-slot:fig>

<div class="fig-ph" style="width: 260px;">

【图占位】单摆：悬点、细线、小球在最高点、偏角、摆长。

</div>

</template>

<div v-click="1">

细线拉力与运动方向垂直、不做功，所以<b>只有重力做功，机械能守恒</b>。

</div>

<div v-click="2">

取最低点势能为 0：<Latex tex="E_{k1} = 0" />，<Latex tex="E_{p1} = mg(l - l\cos\theta)" />。

</div>

<div v-click="3">

由 <Latex tex="\dfrac{1}{2}mv^2 = mg(l - l\cos\theta)" /> 得 <Latex tex="v = \sqrt{2gl(1 - \cos\theta)}" />。

</div>

---
title: 练习 光滑曲面
clicks: 2
layout: exercise-split
---

<template v-slot:stem>

小球从光滑曲面上的 A（<Latex tex="h_1" />、<Latex tex="v_1" />）滑到 B（<Latex tex="h_2" />、<Latex tex="v_2" />），重力做的功为 <Latex tex="W" />。（1）用动能定理列式；（2）变形以反映机械能守恒。

</template>

<template v-slot:fig>

<div class="fig-ph" style="width: 260px;">

【图占位】光滑曲面：A 标 h1、v1，B 标 h2、v2。

</div>

</template>

<div v-click="1">

（1）<Latex tex="W = \dfrac{1}{2}mv_2^2 - \dfrac{1}{2}mv_1^2" />

</div>

<div v-click="2">

（2）代入 <Latex tex="W = mgh_1 - mgh_2" /> 并移项，得 <Latex tex="\dfrac{1}{2}mv_2^2 + mgh_2 = \dfrac{1}{2}mv_1^2 + mgh_1" />。

</div>

---
title: 练习 斜向上抛出的石块
clicks: 2
layout: exercise-split
---

<template v-slot:stem>

<Latex tex="m = 0.5\ \text{kg}" /> 的石块从 <Latex tex="h = 10\ \text{m}" /> 高处以 <Latex tex="30^\circ" /> 角斜向上抛出，<Latex tex="v_0 = 5\ \text{m/s}" />，不计空气阻力。（1）落地速度多大？（2）与哪些量有关？ A 质量 B 初速度 C 仰角 D 抛出高度

</template>

<template v-slot:fig>

<div class="fig-ph" style="width: 260px;">

【图占位】斜抛石块：抛出点、初速度方向与仰角、抛出高度、落地点。

</div>

</template>

<div v-click="1">

（1）机械能守恒：<Latex tex="\dfrac{1}{2}mv_0^2 + mgh = \dfrac{1}{2}mv^2" />，解得 <Latex tex="v = \sqrt{v_0^2 + 2gh} = 15\ \text{m/s}" />。

</div>

<div v-click="2">

（2）与 <Latex tex="v_0" />、<Latex tex="h" /> 有关（B、D），与 <Latex tex="m" />、仰角无关（A、C）。

</div>

---
title: 练习 弹簧弹起的小球
clicks: 3
layout: exercise-split
---

<template v-slot:stem>

小球压在弹簧上至 A，松手后经 B（原长）升至最高点 C，阻力可忽略。<Latex tex="m = 0.2\ \text{kg}" />、<Latex tex="h_{AB} = 0.1\ \text{m}" />、<Latex tex="h_{BC} = 0.2\ \text{m}" />、<Latex tex="g = 10\ \text{m/s}^2" />。求能量转化、A 处弹性势能、C 处动能。

</template>

<template v-slot:fig>

<div class="fig-ph" style="width: 130px;">

【图占位】竖直弹簧弹起小球：A 压缩、B 原长、C 最高点。

</div>

</template>

<div v-click="1">

（1）A 至 B：弹性势能 → 动能 + 重力势能；B 至 C：动能 → 重力势能。

</div>

<div v-click="2">

（2）A 至 C 全程只有重力与弹力做功（阻力可忽略），机械能守恒。

</div>

<div v-click="3">

A 处 <Latex tex="E_p = mg(h_{AB} + h_{BC}) = 0.6\ \text{J}" />，C 处 <Latex tex="E_k = 0" />。

</div>

---
title: 两个易错点
clicks: 3
---

<div class="page-grow flex flex-col justify-center">

<div class="warn-hint" v-click="1">

守恒不等于各量都不变：变的是势能与动能，不变的是它们的<b>总和</b>。

</div>

<div class="warn-hint" v-click="2">

守恒看的是<b>做功</b>，不是受力个数。

</div>

<div class="important-hint" v-click="3">

列式前问两句：哪个系统？除重力（弹力）外还有谁做了功？

</div>

</div>

---
title: 小结
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="fig-ph">

【图占位】动能与势能的双向转化示意，箭头上标「重力或弹力做功」。

</div>

<div class="grid" style="grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem;" v-click="1">

<div>

<b>一个条件</b>

只有重力（或系统内弹力）做功。

</div>

<div>

<b>一个等式</b>

<Latex tex="E_{k2} + E_{p2} = E_{k1} + E_{p1}" />

</div>

<div>

<b>一种视角</b>

只看初状态和末状态。

</div>

</div>

<div v-click="2">

不必考虑两个状态之间过程的细节——这比直接用牛顿定律方便。

</div>

<div class="important-hint" v-click="3">

下一节用打点计时器和气垫导轨，亲手验证机械能守恒定律。

</div>

</div>
