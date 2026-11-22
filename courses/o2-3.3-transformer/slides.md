---
theme: default
title: "变压器"
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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "3.3"
chapter: "第三章 交变电流"
---

<CoverDecorationSvg />

---
title: 手表的电能从哪里来？
clicks: 6
clickAnimation: none
---

<div class="page-grow">
<WatchIntro3D :step="$clicks" />
</div>

---
title: 从手表到插座：供电链路拆解
clicks: 7
clickAnimation: none
---

<div class="page-grow">
<PowerChainStepSvg :step="$clicks" />
</div>

---
title: 变压器的结构与作用
clicks: 3
clickAnimation: none
---

# 变压器的结构与作用

<div class="page-grow">
<TransformerStructureSvg :step="$clicks" />
</div>

---
title: 变压器的工作原理
clicks: 3
clickAnimation: none
---

# 变压器的工作原理

<div class="page-grow">
<TransformerPrinciple3D :step="$clicks" />
</div>

---
layout: focus-question
title: 原、副线圈的电压与匝数有什么关系？
---

<template v-slot:icon>

<mdi-help-circle-outline />

</template>

变压器原、副线圈两端的电压与线圈匝数之间有什么关系？

<template v-slot:hint>

怎样设计一个实验方案来探究它们之间的关系？

</template>

---
title: 实验：探究变压器原、副线圈电压与匝数的关系
---

# 实验：探究原、副线圈电压与匝数的关系

<div class="page-grow page-grow-tight">
<div class="split-wide p7-split">
<div class="figure"><ExperimentSetupSvg /></div>
<div class="stack stack-tight">
<div class="p7-meta">
<span><b>J2423 可拆变压器</b></span>
<span>· 原线圈 <Latex tex="0\sim 1400" /> 匝</span>
<span>· 副线圈 <Latex tex="0\sim 400 / 100" /> 匝</span>
<span>· <Latex tex="U_1 = 12\ \text{V}" /> 交流</span>
</div>
<table class="data-table p7-table">
<thead>
<tr>
<th style="width: 16%"><Latex tex="n_1" /></th>
<th style="width: 16%"><Latex tex="n_2" /></th>
<th style="width: 16%"><Latex tex="U_1" /></th>
<th style="width: 24%">理想 <Latex tex="U_2" /></th>
<th style="width: 28%">实测 <Latex tex="U_2" /></th>
</tr>
</thead>
<tbody>
<tr>
<td><Latex tex="1400" /></td>
<td><Latex tex="400" /></td>
<td><Latex tex="12\ \text{V}" /></td>
<td><Latex tex="3.43\ \text{V}" /></td>
<td class="text-dim">（课上填）</td>
</tr>
<tr>
<td><Latex tex="1400" /></td>
<td><Latex tex="100" /></td>
<td><Latex tex="12\ \text{V}" /></td>
<td><Latex tex="0.86\ \text{V}" /></td>
<td class="text-dim">（课上填）</td>
</tr>
</tbody>
</table>
</div>
</div>
<div class="warn-hint" style="--hint-pad-y: 0.42rem"><Latex tex="\le 12\ \text{V}" /> 交流；先接线、再检查、后通电；表先最大量程；断电改线</div>
</div>

---
title: 变压器的电压与电流关系
clicks: 6
clickAnimation: none
---

<div class="page-grow">
<CoreMasterScene :step="$clicks" />
</div>

---
title: 实际变压器的能量损耗
clicks: 2
---

# 实际变压器的能量损耗

<div class="page-grow">
<TransformerLossSvg :step="$clicks" />
</div>

---
title: 理想与实测对比
clicks: 1
---

# 理想模型与实验实测对比

<div class="page-grow">
<div class="split-wide">
<div class="figure">
<CoordAxes
  :x-range="[0, 0.36]"
  :y-range="[0, 0.36]"
  :ticks="{ x: [0.1, 0.2, 0.3], y: [0.1, 0.2, 0.3], grid: true }"
  :curves="[
    {
      points: [
        { x: 0, y: 0 },
        { x: 0.33, y: 0.33 },
      ],
      color: 'var(--c-accent)',
      width: 3.2,
    },
  ]"
  :labels="[
    {
      x: 0.355,
      y: 0,
      tex: 'n_2 / n_1',
      anchor: 'top-left',
      dy: -4,
    },
    {
      x: 0,
      y: 0.355,
      tex: 'U_2 / U_1',
      anchor: 'bottom-right',
      dx: 6,
    },
    {
      x: 0.24,
      y: 0.27,
      tex: '\\text{理想：}\\dfrac{U_2}{U_1} = \\dfrac{n_2}{n_1}',
      color: 'var(--c-accent)',
      anchor: 'top-left',
    },
    {
      x: 0.071,
      y: 0.064,
      text: '①',
      color: 'var(--c-physics)',
      dot: 5.5,
      dotColor: 'var(--c-physics)',
      anchor: 'bottom-right',
      showAt: 1,
    },
    {
      x: 0.286,
      y: 0.264,
      text: '②',
      color: 'var(--c-physics)',
      dot: 5.5,
      dotColor: 'var(--c-physics)',
      anchor: 'bottom-right',
      showAt: 1,
    },
  ]"
  :view="{ width: 520, height: 340 }"
  :step="$clicks"
/>
</div>
<div class="stack">
<div class="p10-box">
<div class="p10-lead text-accent">理想变压器：<Latex tex="\dfrac{U_2}{U_1} = \dfrac{n_2}{n_1}" /></div>
<div class="mini-note">无铜损（<Latex tex="r_1 = r_2 = 0" />）、无漏磁、无铁损</div>
</div>
<div v-click="1" class="tip-hint">
<b>实测点落在理想直线下方一点</b>：线圈电阻分压（铜损）与少量漏磁，使实测 <Latex tex="U_2" /> 略低于理想值。
</div>
</div>
</div>
</div>

---
layout: exercise-split
title: 例 1：手机充电器中的降压变压器
clicks: 2
---

<template v-slot:stem>

<div><b class="ex-no">例 1</b>　某手机充电器里的变压器，原线圈 <Latex tex="n_1 = 1100" /> 匝，接 <Latex tex="U_1 = 220\ \text{V}" /> 交流电；副线圈 <Latex tex="n_2 = 25" /> 匝，给一个 <Latex tex="R = 5\ \Omega" /> 的负载供电。求副线圈电压 <Latex tex="U_2" />、副线圈电流 <Latex tex="I_2" />、输出功率 <Latex tex="P_2" /> 和原线圈电流 <Latex tex="I_1" />（按理想变压器）。</div>

</template>

<template v-slot:fig>

<ExerciseOneSvg />

</template>

<div v-click="1"><b>（1）由电压与匝数关系求副线圈电压：</b><br /><Latex tex="U_2 = U_1 \dfrac{n_2}{n_1} = 220 \times \dfrac{25}{1100}\ \text{V} = 5\ \text{V}" /></div>

<div v-click="2"><b>（2）由负载求输出电流、功率及原线圈电流：</b><br /><Latex tex="I_2 = \dfrac{U_2}{R} = \dfrac{5}{5}\ \text{A} = 1\ \text{A}" />，<Latex tex="P_2 = U_2 I_2 = 5\ \text{W}" />；理想变压器 <Latex tex="P_1 = P_2" />，故 <Latex tex="I_1 = \dfrac{P_1}{U_1} = \dfrac{5}{220}\ \text{A} \approx 0.023\ \text{A}" />。</div>

---
layout: exercise-split
title: 例 2：一原两副理想变压器
clicks: 2
---

<template v-slot:stem>

<div><b class="ex-no">例 2</b>　一个理想变压器原线圈 <Latex tex="n_1 = 1100" /> 匝，接 <Latex tex="U_1 = 220\ \text{V}" /> 交流电；两个副线圈分别为 <Latex tex="n_{2a} = 100" /> 匝和 <Latex tex="n_{2b} = 200" /> 匝。求两个副线圈的电压之比；若分别接 <Latex tex="R_a = 10\ \Omega" /> 和 <Latex tex="R_b = 20\ \Omega" /> 的电阻，求两个副线圈的电流、输出功率和原线圈电流。</div>

</template>

<template v-slot:fig>

<ExerciseTwoSvg />

</template>

<div v-click="1"><b>（1）各副线圈按各自的匝数算电压：</b><Latex tex="U_{2a} = 220 \times \tfrac{100}{1100}\ \text{V} = 20\ \text{V}" />，<Latex tex="U_{2b} = 220 \times \tfrac{200}{1100}\ \text{V} = 40\ \text{V}" />，<Latex tex="U_{2a} : U_{2b} = 1 : 2" />。</div>

<div v-click="2"><b>（2）两个副线圈共同承担功率：</b><Latex tex="I_{2a} = \tfrac{20}{10}\ \text{A} = 2\ \text{A}" />（<Latex tex="P_{2a} = 40\ \text{W}" />），<Latex tex="I_{2b} = \tfrac{40}{20}\ \text{A} = 2\ \text{A}" />（<Latex tex="P_{2b} = 80\ \text{W}" />）；由 <Latex tex="P_1 = P_{2a} + P_{2b} = 120\ \text{W}" />，得 <Latex tex="I_1 = \tfrac{P_1}{U_1} = \tfrac{120}{220}\ \text{A} \approx 0.545\ \text{A}" />。<span class="text-accent">（各算各的电压，功率共同承担）</span></div>

---
title: 课堂小结
---

# 课堂小结

<div class="page-grow">
<div class="step-list p13-summary">
<div class="step-item p13-item">
<span class="step-no">1</span>
<div class="p13-text">
<b>互感是基础</b>：原线圈中变化的电流产生变化的磁通量，铁芯把磁通量约束在闭合磁路中，副线圈中产生感应电动势。
</div>
</div>
<div class="step-item p13-item">
<span class="step-no">2</span>
<div class="p13-text">
<b>电动势比与电压比</b>：<Latex tex="\dfrac{E_1}{E_2} = \dfrac{n_1}{n_2}" /> 只需要<b>无漏磁</b>；<Latex tex="\dfrac{U_1}{U_2} = \dfrac{n_1}{n_2}" /> 才需要<b>理想条件</b>（无内阻、无漏磁、无铁损）。
</div>
</div>
<div class="step-item p13-item">
<span class="step-no">3</span>
<div class="p13-text">
<b>功率与实际损耗</b>：理想单副线圈由 <Latex tex="P_1 = P_2" /> 得 <Latex tex="\dfrac{I_1}{I_2} = \dfrac{n_2}{n_1}" />；实际变压器存在铜损、涡流和漏磁，使实测 <Latex tex="U_2" /> 偏低。
</div>
</div>
</div>
</div>

---
title: 回扣无线充电：Apple Watch 到底如何充上电？
clicks: 2
---

<div class="page-grow">
<CallbackWirelessSvg :step="$clicks" />
</div>

---
layout: focus-question
title: 思考与下节预告
---

<div class="p15-stack">
<div class="p15-main">为什么最终是交流电赢了直流电？</div>
<div class="p15-sub text-2xl leading-normal">变压器在国家电网中起什么作用？为什么要用超高压输电？</div>
<div class="p15-preview text-lg leading-normal">下节预告 · § 3.4 电能的输送</div>
</div>
