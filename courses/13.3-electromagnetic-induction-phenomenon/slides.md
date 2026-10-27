---
theme: default
title: "电磁感应现象及应用"
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
chapter-no: "13.3"
chapter: "第十三章 电磁感应与电磁波初步"
subtitle: 从磁生电到电气化时代
---

<CoverDecorationSvg />

---
layout: focus-question
title: 引课（磁能不能生电）
---

<template v-slot:icon>

<mdi-head-question-outline />

</template>

<div>电流能产生磁。<br />反过来，磁能不能产生电？</div>

<template v-slot:hint>

1820 年，奥斯特发现通电导线周围存在磁场——电与磁之间是有联系的。

</template>

<template v-slot:answer>

法拉第由这种联系想到：磁也应该能产生电。1822 年，他在日记中写下"由磁产生电"。

</template>

---
title: 法拉第的十年探索
---

<div class="page-grow">
<div class="ask">1822 年就提出了"由磁产生电"，为什么十年都没有成功？</div>
<div class="split-wide">
<div><OerstedSymmetrySvg /></div>
<div class="stack">
<div v-click="1">法拉第试过很强的磁体、很强的电流——都没有在导线中产生电流。</div>
<div v-click="2">十年间，他的日记里反复出现这些词：未显示作用、毫无反应、不行。</div>
<div v-click="3">1822 年的设想，直到 1831 年才有了第一次成功。</div>
</div>
</div>
</div>

---
title: 法拉第的铁环实验
clicks: 3
---

<div class="page-grow">
<div class="ask">把两个线圈绕在同一个铁环上：A 接电源，B 接电流表。给 A 通电或断电，B 中有电流吗？</div>
<div class="split-wide ei-split">
<div><FaradayRingDemo /></div>
<div class="stack">
<div v-click="1"><b>接通瞬间</b>：电流表指针偏转——B 中出现了感应电流。</div>
<div v-click="2"><b>保持接通</b>：指针回到零——B 中没有电流。</div>
<div v-click="3"><b>断开瞬间</b>：指针反向偏转——B 中又有感应电流。</div>
</div>
</div>
</div>

---
title: 电磁感应
---

# 电磁感应

<div class="page-grow">
<div class="ask">通电和断电这两个瞬间，有什么共同点？</div>
<div v-click="1">都是"变化"发生的瞬间：线圈 A 中的电流在变化。</div>
<div v-click="2">法拉第的领悟：磁生电是一种在变化、运动的过程中才能出现的效应。</div>
<div v-click="3"><DefinitionBox term="电磁感应">由磁产生电的现象叫作<b>电磁感应</b>（electromagnetic induction），产生的电流叫作<b>感应电流</b>（induction current）。</DefinitionBox></div>
</div>

---
layout: center
title: 划时代的意义
---

<div class="text-center">
<div class="text-xl leading-normal">法拉第评价奥斯特的发现："它突然打开了科学中一个黑暗领域的大门，使其充满光明。"</div>
<div class="mini-note mt-2">——法拉第</div>
<div v-click="1" class="mt-8 text-lg leading-normal">电磁感应的发现使人们对电与磁内在联系的认识更加深入，宣告了电磁学作为一门统一学科的诞生。</div>
<div v-click="2" class="mt-4 text-lg leading-normal">公正地说，法拉第与奥斯特应该共享这样的荣誉。</div>
</div>

---
title: 三种运动
clicks: 4
---

<div class="page-grow">
<div class="ask">闭合电路的一部分导体在磁场中运动。下面三种运动，哪些能产生感应电流？</div>
<CuttingCasesSvg :step="$clicks" />
<div v-click="4" class="tip-hint">只有切割磁感线时才产生感应电流。</div>
</div>

---
title: 变化的物理量
clicks: 3
---

<div class="page-grow">
<div class="ask">AB 沿导轨滑动时同样在切割磁感线，但磁场没有变化——变化的是什么？</div>
<div class="split-wide ei-split">
<div><RailLoopDemo /></div>
<div class="stack">
<div v-click="1">滑动时，电路 ABCD 的面积 <Latex tex="S" /> 在变化。</div>
<div v-click="2">面积变，穿过电路的磁通量 <Latex tex="\Phi = BS" /> 也跟着变。</div>
<div v-click="3" class="ask-lead">感应电流的产生，是否与磁通量的变化有关？</div>
</div>
</div>
</div>

---
title: 实验：探究感应电流产生的条件
zoom: 0.92
---

# 实验：探究感应电流产生的条件

<div class="page-grow">
<div class="ask">线圈 A 接电源，线圈 B 接电流表，A 套在 B 里。四种情况下，B 中有电流吗？</div>
<div class="half-grid">
<div><CoilInductionDemo /></div>
<div>
<table class="data-table">
<thead>
<tr><th>开关和变阻器的状态</th><th>线圈 B 中<br />是否有电流</th></tr>
</thead>
<tbody>
<tr><td>开关闭合瞬间</td><td><span v-click="1">有</span></td></tr>
<tr><td>开关断开瞬间</td><td><span v-click="2">有</span></td></tr>
<tr><td>开关闭合时，滑动变阻器不动</td><td><span v-click="3">无</span></td></tr>
<tr><td>开关闭合时，<br />迅速移动变阻器的滑片</td><td><span v-click="4">有</span></td></tr>
</tbody>
</table>
<div v-click="5" class="tip-hint">有电流的三种情形，共同点是：穿过线圈 B 的磁通量发生了变化。</div>
</div>
</div>
</div>

---
title: 磁通量是怎样变化的
---

<div class="page-grow">
<div class="ask">线圈 A 中的电流变化，为什么会让穿过线圈 B 的磁通量变化？</div>
<div class="split-wide ei-split">
<div><CoilFluxSvg /></div>
<div class="stack">
<div v-click="1">A 中电流变化 → A 产生的磁场强弱变化。</div>
<div v-click="2">两个线圈套在一起，B 内的磁场也随之变化 → 穿过 B 的磁通量变化。</div>
<div v-click="3" class="tip-hint">四种情形中有电流的，都是穿过线圈 B 的磁通量发生了变化。</div>
</div>
</div>
</div>

---
title: 产生感应电流的条件
---

# 产生感应电流的条件

<div class="page-grow">
<div class="ask">由这些实验，产生感应电流的条件是什么？</div>
<div v-click="1"><DefinitionBox term="产生感应电流的条件" tone="gold">当穿过闭合导体回路的磁通量发生变化时，闭合导体回路中就产生感应电流。</DefinitionBox></div>
<div v-click="2" class="warn-hint">两个要点：回路必须闭合；磁通量必须发生变化。</div>
</div>

---
title: 磁通量变化的三种情形
---

# 磁通量变化的三种情形

<div class="page-grow">
<div class="ask">穿过闭合回路的磁通量，什么时候会变化？</div>
<div class="text-center"><Latex tex="\Phi = BS" display /></div>
<div class="three-col">
<div v-click="1">
<div class="mini-title">磁感应强度变化</div>
<div><Latex tex="B" /> 变化——如线圈 A 中电流变化、在不均匀磁场中移动。</div>
</div>
<div v-click="2">
<div class="mini-title">回路面积变化</div>
<div><Latex tex="S" /> 变化——如导体棒在导轨上滑动、弹簧线圈收缩。</div>
</div>
<div v-click="3">
<div class="mini-title">夹角变化</div>
<div>回路平面与磁场的夹角变化——如线框绕轴转动（垂直于 <Latex tex="B" /> 方向的投影面积变化）。</div>
</div>
</div>
</div>

---
title: 法拉第圆盘发电机
clicks: 2
---

# 法拉第圆盘发电机

<div class="page-grow">
<div class="ask">铜盘的轴和边缘分别接电流表，摇动手柄让铜盘在磁极之间旋转。指针会怎样？</div>
<div class="split-wide ei-split">
<div><FaradayDiskDemo /></div>
<div class="stack">
<div v-click="1">指针摆动——铜盘在磁场中转动，回路中产生了感应电流。</div>
<div v-click="2" class="tip-hint">这是最早的发电机。</div>
</div>
</div>
</div>

---
title: 电磁感应现象的应用
---

# 电磁感应现象的应用

<div class="page-grow">
<div class="three-col">
<div>
<div class="mini-title"><mdi-flash />发电机</div>
<div>根据电磁感应制造的最早的发电机，后来成长为电厂里巨大的发电机，开辟了人类社会的电气化时代。</div>
</div>
<div>
<div class="mini-title"><mdi-transmission-tower />变压器</div>
<div>根据电磁感应制造，<br />用于输电。</div>
</div>
<div>
<div class="mini-title"><mdi-stove />电磁炉</div>
<div>根据电磁感应制造。</div>
</div>
</div>
<div class="mini-note text-center">面对"这有什么用"的取笑，法拉第回答："夫人，新生的婴儿又有什么用呢？"</div>
</div>

---
title: 法拉第与电气化时代
---

# 法拉第与电气化时代

<div class="page-grow">
<div class="step-list">
<div class="step-item"><span class="step-no">1</span><div>铁匠家庭、书店学徒 → 1813 年毛遂自荐，成为戴维的助理实验员。</div></div>
<div class="step-item"><span class="step-no">2</span><div>十年探索，日记里写着"未显示作用""毫无反应""不行"；晚年感叹：得以实现的猜想不到十分之一。</div></div>
<div class="step-item"><span class="step-no">3</span><div>他坚信各种自然现象相互关联、自然力统一可转化；提出"场"，并用"力线"描绘场的图景。</div></div>
<div class="step-item"><span class="step-no">4</span><div>他谢绝皇家学会会长等头衔；1867 年去世——生活在电气化时代的我们，应该永远缅怀法拉第。</div></div>
</div>
</div>

---
title: 小结
---

# 小结

<div class="page-grow">
<div class="stack">
<div><b>现象</b>：电磁感应——由磁产生电的现象；产生的电流叫作感应电流。</div>
<div v-click="2"><b>条件</b>：穿过闭合导体回路的磁通量发生变化。</div>
<div v-click="3"><b>判断</b>：① 回路是否闭合？② 穿过回路的磁通量是否变化？</div>
<div v-click="4"><b>应用</b>：发电机、变压器、电磁炉——电气化时代。</div>
</div>
</div>

---
layout: exercise-split
title: 练习（线框的三种运动）
clicks: 3
zoom: 0.92
---

<template v-slot:stem>

<div><b class="ex-no">练习 1</b>图 13.3-7 所示的匀强磁场中有一个矩形闭合导线框，保持线框平面始终与磁感线垂直。下列情况中，线框中是否产生感应电流？① 上下运动 ② 左右运动 ③ 绕轴转动。</div>

<RectFrameMotionsSvg :step="$clicks" />

</template>

<div class="stack">
<div v-click="1">甲 上下运动：<Latex tex="B" /> 和 <Latex tex="S" /> 都不变，<Latex tex="\Phi" /> 不变 → 无感应电流。</div>
<div v-click="2">乙 左右运动：同样 <Latex tex="\Phi" /> 不变 → 无感应电流。</div>
<div v-click="3">丙 绕轴转动：回路与磁场夹角变化，<Latex tex="\Phi" /> 变化 → 有感应电流。</div>
</div>

---
layout: exercise-split
title: 练习（线框穿过有限磁场）
clicks: 3
zoom: 0.92
---

<template v-slot:stem>

<div><b class="ex-no">练习 3</b>垂直于纸面的匀强磁场局限在虚线框内，闭合线圈由位置 1 穿过虚线框运动到位置 2。线圈在运动过程中什么时候有感应电流，什么时候没有？</div>

<FrameThroughFieldSvg :step="$clicks" />

</template>

<div class="stack">
<div v-click="1">进入磁场：线圈与磁场的重叠面积增大，<Latex tex="\Phi" /> 增大 → 有感应电流。</div>
<div v-click="2">完全在磁场区域内：<Latex tex="\Phi = BS" /> 不变 → 无感应电流。</div>
<div v-click="3">离开磁场：重叠面积减小，<Latex tex="\Phi" /> 减小 → 有感应电流。</div>
</div>

---
title: 练习（铜环在磁场中移动）
clicks: 3
---

<div class="page-grow">
<div class="ask">把一个铜环放在匀强磁场中，使铜环的平面跟磁场方向垂直。① 使铜环沿着磁场的方向移动，环中有感应电流吗？② 如果磁场是不均匀的，沿磁场方向移动时呢？</div>
<div v-click="1">① 匀强磁场：<Latex tex="B" /> 不变、<Latex tex="S" /> 不变，<Latex tex="\Phi" /> 不变 → 没有感应电流。</div>
<div v-click="2">② 不均匀磁场：移动时 <Latex tex="B" /> 变化 → <Latex tex="\Phi" /> 变化 → 有感应电流。</div>
<div v-click="3" class="tip-hint">判断的关键：穿过闭合回路的磁通量是否变化。</div>
</div>
