---
theme: default
title: "实验：验证机械能守恒定律"
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
chapter-no: "8.5"
chapter: "第八章 机械能守恒定律"
subtitle: "实验思路 · 纸带测量 · 数据与误差"
---

<div class="fig-ph" style="max-width: 620px; margin: 0 auto;">

【图占位】封面装饰：一条下落纸带（点距渐增）与两个能量标注。

</div>

---
title: 定律凭什么可信
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="ask">

上一节推出的机械能守恒定律，凭什么断定它在真实世界里成立？

</div>

<div v-click="1">

让定律接受实验的检验，用测量结果说话。

</div>

<div style="font-size: 1.3rem;" v-click="2">

一个重物自由下落，它减小的重力势能与增加的动能，测出来真的相等吗？

</div>

<div class="tip-hint" v-click="3">

这一节把这条定律变成一组可以核对的测量数据。

</div>

</div>

---
title: 一次必然成功的验证
clicks: 3
---

<div class="page-grow flex flex-col">

<div class="ask">

由公式算出速度再作比较，验证就完成了——这条捷径走得通吗？

</div>

<div v-click="1">

由 <Latex tex="h = \frac{1}{2}gt^2" /> 与 <Latex tex="v = gt" /> 消去 <Latex tex="t" />，立刻得到 <Latex tex="\frac{1}{2}mv^2 = mgh" />。

</div>

<div v-click="2">

用理论算出的速度，去验证理论导出的结论——两边一定相等，得不到任何新信息。

</div>

<div class="warn-hint" v-click="3">

要让实验说话，<Latex tex="v" /> 必须来自纸带测量，而不是任何公式。

</div>

</div>

---
title: 哪些过程满足守恒的前提
clicks: 4
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="ask">

要验证机械能守恒，先得挑一个满足条件的过程。条件是什么？

</div>

<div v-click="1">

自由下落的物体只受重力，满足。

</div>

<div v-click="2">

沿光滑斜面下滑：支持力与位移垂直，不做功。

</div>

<div v-click="3">

细线悬挂的小球摆动：拉力与运动方向垂直，不做功。

</div>

<div class="tip-hint" v-click="4">

这三种情形的共同点：只有重力或弹力做功。

</div>

</div>

---
title: 器材
clicks: 4
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="ask">

已有重物、纸带、铁架台（含铁夹）、打点计时器、导线及开关，还必须增加哪几项？<br>A 交流电源　B 刻度尺　C 天平（含砝码）

</div>

<div v-click="1">

<b>A 必须</b>——打点计时器要交流电源才能工作。

</div>

<div v-click="2">

<b>B 必须</b>——纸带上各点到起始点的距离要用它量。

</div>

<div v-click="3">

<b>C 不必</b>。

</div>

<div class="tip-hint" v-click="4">

要增加的是 A、B。天平为什么用不上，看两边的式子。

</div>

</div>

---
title: 为什么可以不测质量
class: title-ask
clicks: 3
---

# 为什么可以不测质量？

<div class="page-grow flex flex-col">

<div v-click="1">

从静止开始，比较 O 到 B：<Latex tex="\frac{1}{2}mv_B^2 = mgh_B" />。

</div>

<div v-click="2">

两边同时约去 <Latex tex="m" />：<Latex tex="\frac{1}{2}v_B^2 = gh_B" />。

</div>

<div class="tip-hint" v-click="3">

判据里根本没有 <Latex tex="m" />——天平用不上。

</div>

</div>

---
title: 打出一条合格纸带
clicks: 4
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="ask">

怎样才能得到一条能用来验证的纸带？

</div>

<div v-click="1">

先接通电源，等打点稳定后再释放重物。

</div>

<div v-click="2">

重物选质量大、体积小的；纸带竖直穿过限位孔。

</div>

<div v-click="3">

挑第 1、2 点间距接近 <Latex tex="2\ \text{mm}" /> 的一条——说明重物确是从静止开始下落。

</div>

<div class="warn-hint" v-click="4">

先释放、后通电，开头一段点迹又浅又乱，不能取点。

</div>

</div>

---
title: h 从哪里来
clicks: 3
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="fig-ph">

【图占位】纸带：O、A、B、C、D 与到 O 的 <Latex tex="h_A" />、<Latex tex="h_B" />、<Latex tex="h_C" /> 尺寸线。

</div>

<div class="ask">

<Latex tex="h_A" />、<Latex tex="h_B" />、<Latex tex="h_C" /> 怎么量？起始点 O 取哪一个点？

</div>

<div v-click="1">

用刻度尺量出各点到 O 的距离，就是 <Latex tex="h_A" />、<Latex tex="h_B" />、<Latex tex="h_C" />。

</div>

<div v-click="2">

O 取重物刚开始下落时打下的点：第 1、2 点间距约 <Latex tex="2\ \text{mm}" />，<Latex tex="v_O = 0" />。

</div>

<div class="info-hint" v-click="3">

两点间的距离就是下落高度差 <Latex tex="\Delta h" />：两个 <Latex tex="h" /> 相减。

</div>

</div>

---
title: B 点的瞬时速度怎么求
clicks: 3
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="fig-ph">

【图占位】纸带：A、B、C 三点、A 到 C 的距离 <Latex tex="h_C - h_A" /> 与历时 <Latex tex="2T" />。

</div>

<div class="ask">

纸带只能读到位置。<Latex tex="v_B" /> 从哪里来？

</div>

<div v-click="1">

匀变速直线运动中，中间时刻的瞬时速度等于这段时间的平均速度。

</div>

<div class="text-center" style="font-size: 1.5rem;" v-click="2">

<Latex tex="v_B = \dfrac{h_C - h_A}{2T}" />

</div>

<div v-click="3">

A、B、C 连续打出，从 A 到 C 历时 <Latex tex="2T" />；打点周期 <Latex tex="T = 0.02\ \text{s}" />（每 5 个间隔取一个计数点则 <Latex tex="T = 0.1\ \text{s}" />）。

</div>

</div>

---
title: 例题 处理一条纸带
clicks: 4
layout: exercise-split
---

<template v-slot:stem>

<div>A、B、C 是连续打出的三点，<Latex tex="h_A = 6.84\ \text{cm}" />、<Latex tex="h_B = 9.31\ \text{cm}" />、<Latex tex="h_C = 12.16\ \text{cm}" />；<Latex tex="T = 0.02\ \text{s}" />，<Latex tex="g = 9.8\ \text{m/s}^2" />。求 <Latex tex="v_B" />，并比较 O 到 B 的重力势能减少量与动能增加量。</div>

</template>

<div v-click="1">

<Latex tex="v_B = \dfrac{h_C - h_A}{2T} = \dfrac{5.32 \times 10^{-2}\ \text{m}}{0.04\ \text{s}} = 1.33\ \text{m/s}" />

</div>

<div v-click="2">

<Latex tex="mgh_B = m \times 9.8 \times 0.0931 = 0.912m\ \text{J}" />；<Latex tex="\frac{1}{2}mv_B^2 = 0.884m\ \text{J}" />。

</div>

<div v-click="3">

两个数相差约 <Latex tex="3\%" />，势能的减少量略大。

</div>

<div class="tip-hint" v-click="4">

误差范围内 <Latex tex="mgh_B = \frac{1}{2}mv_B^2" />——差的 <Latex tex="3\%" /> 来自阻力。

</div>

---
title: 记录数据并比较
clicks: 2
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="ask">

把两次过程的测量与计算放进一张表，能看出什么？

</div>

| 过程   | $h$                | $v$                | $\frac{1}{2}v^2$     | $gh$                 | 相对偏差 |
| ------ | ------------------ | ------------------ | -------------------- | -------------------- | -------- |
| O 到 B | $9.31\ \text{cm}$  | $1.33\ \text{m/s}$ | $0.884\ \text{J/kg}$ | $0.912\ \text{J/kg}$ | $3.1\%$  |
| O 到 C | $12.16\ \text{cm}$ | $1.52\ \text{m/s}$ | $1.155\ \text{J/kg}$ | $1.192\ \text{J/kg}$ | $3.1\%$  |

<div v-click="1">

两列都已除以 <Latex tex="m" />，单位是 <Latex tex="\text{J/kg}" />；同乘回 <Latex tex="m" /> 就是教材里的变化式。

</div>

<div class="tip-hint" v-click="2">

两次过程都在 <Latex tex="3\%" /> 以内相等，且势能减少量总是略大。

</div>

</div>

---
title: 为什么势能的减少量略大于动能的增加量
class: title-ask
clicks: 3
---

# 为什么势能的减少量略大于动能的增加量？

<div class="page-grow page-grow-tight flex flex-col">

<div v-click="1">

除重力外，还有纸带与限位孔的摩擦、振针与纸带的摩擦和空气阻力。

</div>

<div class="text-center" style="font-size: 1.35rem;" v-click="2">

<Latex tex="mgh_B - \frac{1}{2}mv_B^2 = |W_{\text{阻}}|" />

</div>

<div class="tip-hint" v-click="3">

阻力做负功，跑掉的机械能变成了内能。若动能反而更大，说明起点不是静止释放。

</div>

</div>

---
title: 从一条纸带上取哪两点
clicks: 3
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="ask">

重物下落时，最好选哪两个位置作为开始和结束？

</div>

<div v-click="1">

开始点取刚下落时打下的点：第 1、2 点间距约 <Latex tex="2\ \text{mm}" />，<Latex tex="v_O = 0" />。

</div>

<div v-click="2">

结束点尽量靠下、点迹清晰——间距大，相对误差小。

</div>

<div class="tip-hint" v-click="3">

第 1、2 点间距明显大于 <Latex tex="2\ \text{mm}" /> 的纸带不能用：O 点不能当零速度起点。

</div>

</div>

---
title: 气垫导轨与光电门
clicks: 3
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="fig-ph">

【图占位】倾斜气垫导轨：滑块、遮光条、光电门。

</div>

<div class="ask">

纸带与限位孔的摩擦很难再减小，有没有更好的办法？

</div>

<div v-click="1">

气垫导轨：压缩空气形成空气层，滑块不接触导轨，阻力很小。

</div>

<div v-click="2">

光电门：遮光条挡光时间 <Latex tex="\Delta t" />，<Latex tex="v = \dfrac{d}{\Delta t}" />。

</div>

<div v-click="3">

把导轨调成倾斜，测下降高度 <Latex tex="\Delta h" /> 与初、末速度 <Latex tex="v_1" />、<Latex tex="v_2" /> 再比较。

</div>

</div>

---
title: 练习 气垫导轨
clicks: 3
layout: exercise-split
---

<template v-slot:stem>

<div>导轨调至水平；滑块（含遮光条）质量 <Latex tex="M" />，托盘和砝码质量 <Latex tex="m" />，遮光条宽 <Latex tex="d" />，到光电门距离 <Latex tex="l" />，遮光时间 <Latex tex="t" />。求（1）势能减少量（2）还需测的量（3）应满足的关系。</div>

</template>

<div v-click="1">

（1）只有托盘和砝码下降，高度差是 <Latex tex="l" />，减少量是 <Latex tex="mgl" />。

</div>

<div v-click="2">

（2）还需测滑块（含遮光条）的质量 <Latex tex="M" />。

</div>

<div v-click="3">

（3）<Latex tex="v = \dfrac{d}{t}" />，所以 <Latex tex="mgl = \frac{1}{2}(M + m)\left(\dfrac{d}{t}\right)^2" />。

</div>

---
title: 小结
clicks: 3
---

<div class="page-grow page-grow-tight flex flex-col">

<div class="ask">

这一节把一个从理论推出的定律，变成了什么？

</div>

<div class="grid mt-2" style="grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem;" v-click="1">

<div>

<b>一条判据</b>

<Latex tex="\frac{1}{2}v_B^2" /> 与 <Latex tex="gh_B" /> 误差内相等。

</div>

<div>

<b>一个方向</b>

<Latex tex="mgh" /> 略大于 <Latex tex="\frac{1}{2}mv^2" />（阻力做负功）。

</div>

<div>

<b>一条操作</b>

先接通电源，再释放重物。

</div>

</div>

<div v-click="2">

这次的速度来自纸带测量、不是来自公式，所以结论是测量给出的。

</div>

<div class="tip-hint" v-click="3">

机械能守恒定律不只是算得对，测出来也对。

</div>

</div>
