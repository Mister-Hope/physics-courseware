---
theme: default
title: "热力学第一定律"
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
chapter-no: "3.2"
chapter: "第三章 热力学定律"
subtitle: "内能变化 · 四种过程 · 能量守恒"
---

<CoverDecorationSvg />

---
title: "压缩的同时加热，内能变化为什么更明显？"
clicks: 3
clickAnimation: none
---

<div class="page-grow fl-split">
<div class="fl-fig"><CylinderEnergySvg :step="$clicks" /></div>
<div class="stack">
<div class="ask">压缩气体的同时给汽缸加热，内能的变化为什么会更明显？</div>
<div class="fl-point" v-click="1">活塞压缩气体：外界对气体做功，<br /><Latex tex="W>0" />，内能增加。</div>
<div class="fl-point" v-click="2">火焰给气体传热：气体吸热，<br /><Latex tex="Q>0" />，内能增加。</div>
<div class="summary-line" v-click="3">两种方式都使内能增加，<br />合起来变化更明显。</div>
</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 上一节的两个结论，能合成一个式子吗？

<div class="page-grow">
<div class="fl-known">
<div class="fl-box">
<div class="fl-box-title">绝热过程：只有做功</div>
<div class="fl-formula-big"><Latex tex="\Delta U=W" display /></div>
</div>
<div class="fl-box">
<div class="fl-box-title">单纯传热：没有做功</div>
<div class="fl-formula-big"><Latex tex="\Delta U=Q" display /></div>
</div>
</div>
<div class="fl-point" v-click="1">做功和传热是等价的：两者同时发生时，内能的变化等于两者之和。</div>
<div class="fl-formula-big" v-click="1"><Latex tex="\Delta U=Q+W" display /></div>
<div class="summary-line" v-click="2">这就是热力学第一定律。</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 把做功和传热合起来：$\Delta U=Q+W$

<div class="page-grow">
<div class="fl-formula-big"><Latex tex="\Delta U=Q+W" display /></div>
<div class="ask">一个热力学系统的内能变化量，等于外界向它传递的热量与外界对它所做的功的和。</div>
<div class="fl-known">
<div class="fl-box">
<div class="fl-box-title">研究对象</div>
<div class="mini-note">一定质量的气体（热力学系统）</div>
</div>
<div class="fl-box">
<div class="fl-box-title">符号</div>
<div class="mini-note"><Latex tex="Q" />：外界传给系统的热量；<Latex tex="W" />：外界对系统做的功。</div>
</div>
</div>
<div class="mini-note" v-click="1">回到汽缸：<Latex tex="\Delta U=W" />（活塞做功）<Latex tex="+Q" />（火焰传热）。</div>
</div>

---
clicks: 3
clickAnimation: none
---

# W 和 Q 什么时候取正、什么时候取负？

<div class="page-grow">
<table class="data-table fl-table" v-click="1">
<thead><tr><th>量</th><th>正值</th><th>负值</th></tr></thead>
<tbody>
<tr><td><Latex tex="W" /></td><td>外界对系统做功</td><td>系统对外界做功</td></tr>
<tr><td><Latex tex="Q" /></td><td>系统从外界吸热</td><td>系统向外界放热</td></tr>
<tr><td><Latex tex="\Delta U" /></td><td>内能增加</td><td>内能减少</td></tr>
</tbody>
</table>
<div class="fl-point" v-click="2">先判断方向，再代入正负号：<Latex tex="W>0" /> 表示外界做功，<Latex tex="Q<0" /> 表示系统放热。</div>
<div class="mini-note" v-click="3">压缩气体（<Latex tex="W>0" />）的同时汽缸散热（<Latex tex="Q<0" />），内能的变化是两者之和。</div>
</div>

---
clicks: 0
clickAnimation: none
---

# Q 和 W 取不同值，内能怎样变？

<div class="page-grow">
<div class="fl-explorer"><FirstLawExplorer /></div>
<div class="mini-note">先判断 Q、W 的正负，再看 <Latex tex="\Delta U" /> 的符号。</div>
</div>

---
clicks: 3
clickAnimation: none
---

# 气体膨胀对外做功，又向外放热，内能怎样变？

<div class="page-grow">
<div class="ask">一定质量的气体膨胀，是外界对气体做功，还是气体对外界做功？</div>
<div class="mini-note">若气体对外做功 <Latex tex="135\ \text{J}" />，同时向外放热 <Latex tex="85\ \text{J}" />，求内能的变化。</div>
<div class="fl-point" v-click="1">气体膨胀，气体对外界做功：<Latex tex="W=-135\ \text{J}" />。</div>
<div class="fl-point" v-click="2">气体向外放热：<Latex tex="Q=-85\ \text{J}" />。</div>
<div class="fl-point" v-click="3"><Latex tex="\Delta U=Q+W=-85\ \text{J}-135\ \text{J}=-220\ \text{J}" />，内能减少 <Latex tex="220\ \text{J}" />。</div>
<div class="summary-line" v-click="3">W、Q 的正负，先看能量的流向。</div>
</div>

---
layout: exercise-split
class: ex-top
title: "例题：内燃机的压缩与膨胀"
analysisLabel: 解答
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

压缩冲程中活塞移动 $0.1\ \text{m}$，活塞对气体做的功相当于 $2\times10^{3}\ \text{N}$ 的恒力移动相同距离的功；气体放热 $25\ \text{J}$。求内能变化量。

高压气体推动活塞移动 $0.1\ \text{m}$，做功相当于 $9\times10^{3}\ \text{N}$ 的恒力移动相同距离的功；气体放热 $30\ \text{J}$。求内能变化量。

</template>

<div class="fl-point">第（1）问：活塞压缩气体，外界对气体做功，<Latex tex="W_1=F_1l_1=2\times10^{3}\times0.1\ \text{J}=200\ \text{J}" />。</div>
<div class="fl-point" v-click="1"><Latex tex="\Delta U_1=Q_1+W_1=-25\ \text{J}+200\ \text{J}=175\ \text{J}" />，内能增加。</div>
<div class="fl-point" v-click="2">第（2）问：气体推动活塞，气体对外界做功，<Latex tex="W_2=-F_2l_2=-9\times10^{3}\times0.1\ \text{J}=-900\ \text{J}" />。</div>
<div class="fl-point" v-click="3"><Latex tex="\Delta U_2=Q_2+W_2=-30\ \text{J}-900\ \text{J}=-930\ \text{J}" />，内能减少。</div>

---
clicks: 2
clickAnimation: none
---

# 等温和等容过程，哪一项为零？

<div class="page-grow">
<div class="fl-cards">
<div class="fl-card">
<div class="fl-card-title">等温过程</div>
<div class="mini-note">温度不变</div>
<div v-click="1"><Latex tex="\Delta U=0" />，由 <Latex tex="\Delta U=Q+W" /><br />得 <Latex tex="Q=-W" />。</div>
<div class="mini-note" v-click="1">等温压缩：外界做功 <Latex tex="100\ \text{J}" />，气体放热 <Latex tex="100\ \text{J}" />。</div>
</div>
<div class="fl-card">
<div class="fl-card-title">等容过程</div>
<div class="mini-note">体积不变</div>
<div v-click="2"><Latex tex="W=0" />，<br />所以 <Latex tex="\Delta U=Q" />。</div>
<div class="mini-note" v-click="2">等容加热：吸热 <Latex tex="100\ \text{J}" />，内能增加 <Latex tex="100\ \text{J}" />。</div>
</div>
</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 等压和绝热过程，功和热怎样算？

<div class="page-grow">
<div class="fl-cards">
<div class="fl-card">
<div class="fl-card-title">等压过程</div>
<div class="mini-note">压强不变</div>
<div v-click="1">气体对外做功 <Latex tex="W=-p\Delta V" />；<br />膨胀时 <Latex tex="W<0" />，<Latex tex="\Delta U=Q+W" />。</div>
<div class="mini-note" v-click="1">等压膨胀：吸收的热量，<br />一部分对外做功，一部分增加内能。</div>
</div>
<div class="fl-card">
<div class="fl-card-title">绝热过程</div>
<div class="mini-note">来不及与外界交换热量</div>
<div v-click="2"><Latex tex="Q=0" />，所以 <Latex tex="\Delta U=W" />。</div>
<div class="mini-note" v-click="2">绝热压缩升温，绝热膨胀降温。</div>
</div>
</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 四种过程，第一定律怎样简化？

<div class="page-grow">
<table class="data-table fl-table">
<thead><tr><th>过程</th><th>条件</th><th>第一定律简化成</th><th>吸放热与做功</th></tr></thead>
<tbody>
<tr><td>等温</td><td>温度不变</td><td><Latex tex="\Delta U=0" />，<Latex tex="Q=-W" /></td><td>压缩时放热，膨胀时吸热</td></tr>
<tr><td>等容</td><td>体积不变</td><td><Latex tex="W=0" />，<Latex tex="\Delta U=Q" /></td><td>吸热内能增，放热内能减</td></tr>
<tr><td>等压</td><td>压强不变</td><td><Latex tex="W=-p\Delta V" /></td><td>膨胀时对外做功并吸热</td></tr>
<tr><td>绝热</td><td>不交换热量</td><td><Latex tex="Q=0" />，<Latex tex="\Delta U=W" /></td><td>压缩升温，膨胀降温</td></tr>
</tbody>
</table>
<div class="fl-point" v-click="1">等温过程中 <Latex tex="\Delta U=0" />，但 <Latex tex="Q" /> 和 <Latex tex="W" /> 都不为零。</div>
<div class="fl-point" v-click="2">绝热过程中 <Latex tex="Q=0" />，内能的变化完全由做功决定。</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 第一定律和能量守恒定律是什么关系？

<div class="page-grow">
<div class="fl-box">
<div class="fl-box-title">能量守恒定律</div>
<div>能量既不会凭空产生，也不会凭空消失，它只能从一种形式转化为另一种形式，或者从一个物体转移到别的物体；在转化或转移的过程中，能量的总量保持不变。</div>
</div>
<div class="fl-point" v-click="1">热力学第一定律，就是能量守恒定律在热现象中的具体表现。</div>
<div class="fl-point" v-click="2">不消耗能量却能不断对外做功的机器叫第一类永动机，它不可能制成。</div>
</div>

---
layout: exercise-split
class: ex-top
title: "练习：压缩并散热，内能改变多少？"
analysisLabel: 解答
clicks: 2
clickAnimation: none
---

<template v-slot:stem>

用活塞压缩汽缸里的空气，对空气做了 $900\ \text{J}$ 的功，同时汽缸向外散热 $210\ \text{J}$。

汽缸里空气的内能改变了多少？是增加还是减少？

</template>

<div class="fl-point">外界对空气做功：<Latex tex="W=900\ \text{J}" />。</div>
<div class="fl-point" v-click="1">汽缸向外散热：<Latex tex="Q=-210\ \text{J}" />。</div>
<div class="fl-point" v-click="2"><Latex tex="\Delta U=Q+W=-210\ \text{J}+900\ \text{J}=690\ \text{J}" />，内能增加 <Latex tex="690\ \text{J}" />。</div>

---
layout: exercise-split
class: ex-top
title: "练习：定容与定压，哪个吸热多？"
analysisLabel: 解答
clicks: 2
clickAnimation: none
---

<template v-slot:stem>

在汽缸内活塞左边封闭着一定量的空气，压强与大气压相同。<br />
把汽缸和活塞固定，使空气升高一定的温度，空气吸收的热量为 $Q_1$。<br />
让活塞自由滑动（无摩擦、不漏气），使空气升高相同温度，吸收的热量为 $Q_2$。<br />
（1）$Q_1$ 和 $Q_2$ 哪个大？<br />
（2）气体在定容下的比热容与在定压下的比热容为什么不同？

</template>

<div class="fl-point">定容时体积不变：<Latex tex="W=0" />，<Latex tex="Q_1=\Delta U" />。</div>
<div class="fl-point" v-click="1">定压时气体膨胀、对外做功：<Latex tex="W<0" />，<Latex tex="Q_2=\Delta U-W=\Delta U+p\Delta V" />。</div>
<div class="fl-point" v-click="2">所以 <Latex tex="Q_2>Q_1" />，定压比热容大于定容比热容。</div>

---
layout: exercise-split
class: ex-top
title: "练习：瀑布的水温升高多少？"
analysisLabel: 解答
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

某风景区有一处约 20 层楼高的瀑布。请估计：瀑布上、下水潭的水温因机械能转化成内能而相差多少？（每层楼约 $3\ \text{m}$，水的比热容 $c=4.2\times10^{3}\ \text{J/(kg·℃)}$。）

</template>

<div class="fl-point" v-click="1">落差约 <Latex tex="h=20\times3\ \text{m}=60\ \text{m}" />，重力势能转化为内能：<Latex tex="mgh=mc\Delta T" />。</div>
<div class="fl-point" v-click="2"><Latex tex="\Delta T=\frac{gh}{c}=\frac{9.8\times60}{4.2\times10^{3}}\ \text{℃}" />，即约 <Latex tex="0.14\ \text{℃}" />。</div>
<div class="summary-line" v-click="3">机械能完全转化为内能时，水温只升高约 <Latex tex="0.14\ \text{℃}" />。</div>

---
layout: exercise-split
class: ex-top
title: "练习：奶牛每天要补充多少热量？"
analysisLabel: 解答
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

奶牛心脏停止跳动后，约 $1\ \text{h}$ 内体温由 $37.0\ \text{℃}$ 降到 $33.5\ \text{℃}$。要维持体重 $400\ \text{kg}$ 的奶牛内能不变，每天食物至少要提供多少热量？可认为体内绝大部分是水。

</template>

<div class="fl-point" v-click="1">每小时散失的热量：<Latex tex="Q=mc\Delta T=400\times4.2\times10^{3}\times3.5\ \text{J}\approx5.9\times10^{6}\ \text{J}" />。</div>
<div class="fl-point" v-click="2">每天（约 <Latex tex="24\ \text{h}" />）需要补充：<Latex tex="24\times5.9\times10^{6}\ \text{J}\approx1.4\times10^{8}\ \text{J}" />。</div>
<div class="summary-line" v-click="3">这些热量最终来自食物，内能的维持需要能量输入。</div>

---
clicks: 1
clickAnimation: none
---

# 这一节：$\Delta U=Q+W$ 怎样用？

<div class="page-grow">
<div class="fl-formula-big"><Latex tex="\Delta U=Q+W" display /></div>
<div class="fl-known">
<div class="fl-box">
<div class="fl-box-title">先看符号</div>
<div class="mini-note"><Latex tex="W>0" /> 外界做功；<br /><Latex tex="Q>0" /> 系统吸热。</div>
</div>
<div class="fl-box">
<div class="fl-box-title">再看过程</div>
<div class="mini-note">等温、等容、等压、绝热——<br />先找哪一项为零或不变。</div>
</div>
</div>
<div class="summary-line" v-click="1">第一定律是能量守恒定律在热现象中的具体表现。</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 下一节：能量守恒定律

<div class="page-grow">
<div class="ask">摩擦生热、电流发热、燃料燃烧……这些过程中能量还守恒吗？</div>
<div class="fl-point" v-click="1">把这些过程都算进来，能量的总量仍然保持不变。</div>
<div class="mini-note">下一节：能量守恒定律的发现过程，以及为什么第一类永动机不可能制成。</div>
</div>
