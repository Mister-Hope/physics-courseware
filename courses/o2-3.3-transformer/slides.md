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
title: 变压器对电流有什么要求？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="qa-stage qa-stage-single">
<section class="qa-panel">
<div class="qa-question">变压器对电流有什么要求？</div>
<div v-click="1" class="qa-answer">
<div class="qa-answer-head">
<span class="qa-answer-icon"><mdi-check-circle-outline /></span>
<span class="qa-answer-lead">只能用于交流电</span>
</div>
<p class="qa-answer-note">原线圈中的电流必须变化，才能在副线圈中产生感应电动势。</p>
<div v-click="2" class="qa-key">变压器利用互感现象工作。</div>
</div>
</section>
</div>
</div>

---
title: 变压器是怎样改变电压的？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="qa-stage qa-stage-single">
<section class="qa-panel qa-dialogue">
<div class="qa-dialogue-row">
<span class="qa-dialogue-icon qa-dialogue-icon-q"><mdi-help-circle-outline /></span>
<div class="qa-bubble">变压器是怎样改变电压的？</div>
</div>
<div class="qa-connector"></div>
<div v-click="1" class="qa-dialogue-row">
<span class="qa-dialogue-icon qa-dialogue-icon-a"><mdi-check-circle-outline /></span>
<div class="qa-answer qa-answer-dialogue">
<div class="qa-answer-head">
<span class="qa-answer-lead">可能与<strong>原线圈、副线圈的匝数</strong>有关。</span>
</div>
<p class="qa-answer-note">先比较不同匝数下的输入、输出电压。</p>
</div>
</div>
<div v-click="2" class="qa-connector"></div>
<div v-click="2" class="qa-dialogue-row">
<span class="qa-dialogue-icon qa-dialogue-icon-q"><mdi-help-circle-outline /></span>
<div class="qa-bubble">怎样设计一个实验方案来探究它们的关系？</div>
</div>
</section>
</div>
</div>

---
title: 实验装置与步骤
---

# 实验装置与步骤

<div class="page-grow page-grow-tight">
<div class="split-wide p7-split">
<div class="p7-left">
<div class="figure"><ExperimentSetupSvg /></div>
<div class="p7-param-title">J2423 可拆变压器参数</div>
<ul class="p7-params">
<li><b>输入：</b><Latex tex="12\ \text{V}" /> 交流（低压交流电源）</li>
<li><b>原线圈：</b>1400 匝</li>
<li><b>副线圈：</b>100 或 400 匝</li>
</ul>
</div>
<div class="stack stack-tight">
<div class="p7-step-title">实验步骤</div>
<ol class="p7-steps">
<li>按图连接电路：原线圈接 <Latex tex="12\ \text{V}" /> 低压交流电源，副线圈接 100 匝抽头；两只交流电压表（多用电表用交流电压挡 <Latex tex="\text{V}\sim" />，量程先选 <Latex tex="20\ \text{V}" />）并联在原、副线圈两端。</li>
<li>检查电路连接无误后，闭合开关，读出输入、输出电压，记入表格。</li>
<li>断开开关，副线圈改接 400 匝抽头；闭合开关，读出输入、输出电压，记入表格。</li>
<li>断开开关，整理器材；计算 <Latex tex="U_1/U_2" />、<Latex tex="n_1/n_2" /> 及相对误差，比较并得出结论。</li>
</ol>
</div>
</div>
</div>

---
title: 实验数据
---

# 实验数据

<div class="page-grow page-grow-tight">
<ExperimentDataTable />
<div class="mini-note"><Latex tex="U_1" />、<Latex tex="U_2" /> 都用交流电压挡（多用电表 <Latex tex="\text{V}\sim" /> 挡）测，读数为有效值。</div>
<div class="mini-note">相对误差 = <Latex tex="\left|\dfrac{U_1/U_2-n_1/n_2}{n_1/n_2}\right|\times 100\%" /></div>
</div>

---
title: 从实验数据到电压比
clicks: 2
---

# 从实验数据到电压比

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
<div v-click="1" class="p9-table-wrap">
<table class="data-table p9-table">
<thead><tr><th>组</th><th><Latex tex="n_1" /></th><th><Latex tex="n_2" /></th><th><Latex tex="\dfrac{n_1}{n_2}" /></th><th><Latex tex="\dfrac{U_1}{U_2}" /></th></tr></thead>
<tbody>
<tr><td>①</td><td>1400</td><td>100</td><td>14.00</td><td>15.6</td></tr>
<tr><td>②</td><td>1400</td><td>400</td><td>3.50</td><td>3.79</td></tr>
</tbody>
</table>
</div>
<div v-click="2" class="p9-conclusion">
<div class="p9-conclusion-lead">两组数据的 <Latex tex="\dfrac{U_1}{U_2}" /> 都近似等于 <Latex tex="\dfrac{n_1}{n_2}" /></div>
<div class="p9-question">为什么？</div>
</div>
</div>
</div>
</div>
---
title: 实际变压器的能量损耗
clicks: 3
clickAnimation: none
---

# 实际变压器的能量损耗

<div class="page-grow p10-loss">
<div class="p10-grid">
  <div v-click="1" class="p10-card p10-copper">
    <div class="p10-kicker">铜损</div>
    <div class="p10-formula"><Latex tex="P_{\text{铜}}=I_1^2r_1+I_2^2r_2" /></div>
    <div class="p10-note">线圈有电阻，通电发热。原、副线圈都有。</div>
    <div class="p10-effect">使 <Latex tex="U_2" /> 比理想值低。</div>
  </div>
  <div v-click="2" class="p10-card p10-iron">
    <div class="p10-kicker">铁损</div>
    <div class="p10-formula"><Latex tex="P_{\text{铁}}=P_{\text{涡流}}+P_{\text{磁滞}}" /></div>
    <div class="p10-note">交变磁场在铁芯中激起涡流，并反复磁化铁芯。</div>
    <div class="p10-effect">主要降低效率 <Latex tex="P_2<P_1" />，不直接改变电压比。</div>
  </div>
  <div v-click="3" class="p10-card p10-leak">
    <div class="p10-kicker">漏磁</div>
    <div class="p10-formula"><Latex tex="\Phi_2<\Phi_1" /></div>
    <div class="p10-note">少量磁感线散出铁芯，没有同时穿过两线圈。</div>
    <div class="p10-effect">副线圈磁通变化率变小，<Latex tex="U_2" /> 偏低。</div>
  </div>
</div>

</div>

---
title: 理想变压器
clicks: 2
clickAnimation: none
---

<div class="page-grow p11-ideal">
<div class="p11-ask">实际变压器 → 理想变压器，忽略了什么？</div>
<div v-click="1" class="p11-grid">
  <div class="p11-card"><div class="p11-card-title">无漏磁</div><div class="p11-card-note">磁通全部穿过副线圈</div></div>
  <div class="p11-card"><div class="p11-card-title">无损耗</div><div class="p11-card-note">无铜损、无铁损</div></div>
  <div class="p11-card"><div class="p11-card-title">无内阻</div><div class="p11-card-note">原、副线圈电阻为零</div></div>
</div>
<div v-click="2" class="p11-formula-box">
  <div class="p11-formula"><Latex tex="P_1=P_2" /></div>
  <div class="p11-formula"><Latex tex="\dfrac{U_1}{U_2}=\dfrac{n_1}{n_2}" /></div>
  <div class="p11-formula"><Latex tex="\dfrac{I_1}{I_2}=\dfrac{n_2}{n_1}" /></div>
</div>
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
layout: exercise-split
title: 例 1：手机充电器中的降压变压器
clicks: 2
hideQaMark: true
---

<template v-slot:stem>

<div><b class="ex-no">例 1</b>　某手机充电器里的变压器，原线圈 <Latex tex="n_1 = 1100" /> 匝，接 <Latex tex="U_1 = 220\ \text{V}" /> 交流电；副线圈 <Latex tex="n_2 = 25" /> 匝，给一个 <Latex tex="R = 5\ \Omega" /> 的负载供电。求副线圈电压 <Latex tex="U_2" />、副线圈电流 <Latex tex="I_2" />、输出功率 <Latex tex="P_2" /> 和原线圈电流 <Latex tex="I_1" />（按理想变压器）。</div>

</template>

<template v-slot:fig>

<ExerciseOneSvg />

</template>

<div v-click="1"><div class="qa-mark">解析</div><b>（1）由电压与匝数关系求副线圈电压：</b><br /><Latex tex="U_2 = U_1 \dfrac{n_2}{n_1} = 220 \times \dfrac{25}{1100}\ \text{V} = 5\ \text{V}" /></div>

<div v-click="2"><b>（2）由负载求输出电流、功率及原线圈电流：</b><br /><Latex tex="I_2 = \dfrac{U_2}{R} = \dfrac{5}{5}\ \text{A} = 1\ \text{A}" />，<Latex tex="P_2 = U_2 I_2 = 5\ \text{W}" />；理想变压器 <Latex tex="P_1 = P_2" />，故 <Latex tex="I_1 = \dfrac{P_1}{U_1} = \dfrac{5}{220}\ \text{A} \approx 0.023\ \text{A}" />。</div>

---
layout: exercise-split
title: 例 2：一原两副理想变压器
clicks: 2
hideQaMark: true
---

<template v-slot:stem>

<div><b class="ex-no">例 2</b>　一个理想变压器原线圈 <Latex tex="n_1 = 1100" /> 匝，接 <Latex tex="U_1 = 220\ \text{V}" /> 交流电；两个副线圈分别为 <Latex tex="n_{2a} = 100" /> 匝和 <Latex tex="n_{2b} = 200" /> 匝。求两个副线圈的电压之比；若分别接 <Latex tex="R_a = 10\ \Omega" /> 和 <Latex tex="R_b = 20\ \Omega" /> 的电阻，求两个副线圈的电流、输出功率和原线圈电流。</div>

</template>

<template v-slot:fig>

<ExerciseTwoSvg />

</template>

<div v-click="1"><div class="qa-mark">解析</div><b>（1）各副线圈按各自的匝数算电压：</b><Latex tex="U_{2a} = 220 \times \tfrac{100}{1100}\ \text{V} = 20\ \text{V}" />，<Latex tex="U_{2b} = 220 \times \tfrac{200}{1100}\ \text{V} = 40\ \text{V}" />，<Latex tex="U_{2a} : U_{2b} = 1 : 2" />。</div>

<div v-click="2"><b>（2）两个副线圈共同承担功率：</b><Latex tex="I_{2a} = \tfrac{20}{10}\ \text{A} = 2\ \text{A}" />（<Latex tex="P_{2a} = 40\ \text{W}" />），<Latex tex="I_{2b} = \tfrac{40}{20}\ \text{A} = 2\ \text{A}" />（<Latex tex="P_{2b} = 80\ \text{W}" />）；由 <Latex tex="P_1 = P_{2a} + P_{2b} = 120\ \text{W}" />，得 <Latex tex="I_1 = \tfrac{P_1}{U_1} = \tfrac{120}{220}\ \text{A} \approx 0.545\ \text{A}" />。<span class="text-accent">（各算各的电压，功率共同承担）</span></div>

---
title: 课堂小结
clicks: 4
clickAnimation: none
---

# 课堂小结

<div class="page-grow">
<div class="step-list p13-summary">
<div class="step-item p13-item" v-click="1">
<span class="step-no">1</span>
<div class="p13-text">
<b>工作原理是互感</b>：原线圈中变化的电流产生变化的磁通量，铁芯把磁通量约束在闭合磁路中，副线圈中产生感应电动势。
</div>
</div>
<div class="step-item p13-item" v-click="2">
<span class="step-no">2</span>
<div class="p13-text">
<b>电动势比与电压比</b>：<Latex tex="\dfrac{E_1}{E_2} = \dfrac{n_1}{n_2}" /> 只需要<b>无漏磁</b>；<Latex tex="\dfrac{U_1}{U_2} = \dfrac{n_1}{n_2}" /> 还需要原、副线圈<b>无内阻</b>（<Latex tex="r_1=r_2=0" />）。
</div>
</div>
<div class="step-item p13-item" v-click="3">
<span class="step-no">3</span>
<div class="p13-text">
<b>功率与电流</b>：理想变压器无能量损耗，由 <Latex tex="P_1 = P_2" /> 得 <Latex tex="\dfrac{I_1}{I_2} = \dfrac{n_2}{n_1}" />（单副线圈）。
</div>
</div>
<div class="step-item p13-item" v-click="4">
<span class="step-no">4</span>
<div class="p13-text">
<b>实际变压器不是理想模型</b>：铜损、铁损使效率低于 1；原、副线圈的内阻压降与漏磁使实测 <Latex tex="U_2" /> 偏低。
</div>
</div>
</div>
</div>

---
title: 无线充电为什么充电效率较低？
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<CallbackWireless3D :step="$clicks" />
</div>

---
layout: focus-question
title: 思考与下节预告
---

<div class="p15-stack">
<div class="p15-main">为什么最终是交流电赢了直流电？</div>
<div class="p15-sub text-2xl leading-normal">变压器在国家电网中起什么作用？为什么要用超高压输电？</div>
<div class="p15-preview text-lg leading-normal">下节预告：§ 3.4 电能的输送</div>
</div>
