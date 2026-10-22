---
theme: default
title: "互感和自感"
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
chapter-no: "2.4"
chapter: "第二章 电磁感应"
subtitle: 变化的电流，隔空传能
---

<CoverDecorationSvg />

---
layout: focus-question
title: 引课（隔空点灯）
---

<template v-slot:icon>

<mdi-lightbulb-on-outline />

</template>

<div>两个线圈之间没有导线。<br />合上开关，右边的灯会亮吗？</div>

<template v-slot:hint>

灯闪了一下，随即熄灭；断开开关时，它又闪了一下。

</template>

<template v-slot:answer>

灯的能量，是左边线圈的磁场"隔空"送过去的。

</template>

---
title: 隔空点灯
---

<div class="page-grow">
<div class="split-wide">
<div><AirGapLampDemo /></div>
<div class="stack">
<div class="ask">合上开关，灯会一直亮着吗？</div>
<div v-click="1"><b>闭合瞬间</b>：灯亮一下。</div>
<div v-click="2"><b>保持闭合</b>：灯熄灭。</div>
<div v-click="3"><b>断开瞬间</b>：灯又亮一下。</div>
<div v-click="4" class="tip-hint">只有 A 中的电流在变化时，B 中才有电。</div>
</div>
</div>
</div>

---
title: 互感
---

<div class="page-grow">
<div class="ask">A 中的电流变化，为什么能在 B 中"点"出电？</div>
<div class="split-wide">
<div><MutualLinkSvg /></div>
<div class="stack">
<div v-click="1"><DefinitionBox term="互感"><div>当一个线圈中的<span class="def-term">电流变化</span>时，它产生的变化磁场会在<span class="def-term">另一个线圈</span>中引起感应电动势。这种现象叫作互感，这个电动势叫作<span class="def-term">互感电动势</span>。</div></DefinitionBox></div>
<div v-click="2" class="tip-hint">电流稳定 → 磁场稳定 → 穿过 B 的磁通量不变，就没有互感电动势。</div>
</div>
</div>
</div>

---
title: 互感的应用
---

<div class="page-grow">
<div class="three-col app-row">
<div class="app-item">
<div class="app-figure"><TransformerSvg /></div>
<div class="app-name">变压器</div>
<div class="mini-note">原、副线圈绕在同一铁芯上。</div>
</div>
<div class="app-item">
<div class="app-figure"><WirelessChargeSvg /></div>
<div class="app-name">无线充电</div>
<div class="mini-note">充电板与手机线圈隔空传能。</div>
</div>
<div class="app-item">
<div class="app-figure"><WirelessPowerSvg /></div>
<div class="app-name">无线输电</div>
<div class="mini-note">把电送到没有导线的地方。</div>
</div>
</div>
<div v-click="1" class="tip-hint">这些装置传的都是"变化"的电——所以变压器用交流，不用直流。</div>
</div>

---
title: 互感也会"串门"
---

<div class="page-grow">
<div class="split-wide">
<div><InterferenceSvg /></div>
<div class="stack">
<div class="ask">两条靠得很近的导线，为什么可能互相干扰？</div>
<div v-click="1">一根导线中变化的电流，会在另一根里激起感应电动势。</div>
<div v-click="2">收音机旁的电源线、电路板上并排的走线，都可能这样"串"进噪声。</div>
<div v-click="3" class="tip-hint">对策：拉开距离、互相垂直、加屏蔽层、用双绞线。</div>
</div>
</div>
</div>

---
title: 自感
---

<div class="page-grow">
<div class="ask">只有一个线圈，它自己的电流在变，会在自己身上激起电动势吗？</div>
<div class="split-wide">
<div><SelfFieldSvg /></div>
<div class="stack">
<div v-click="1"><DefinitionBox term="自感"><div>当一个线圈中的<span class="def-term">电流变化</span>时，它产生的变化磁场会在<span class="def-term">线圈本身</span>激起感应电动势。这种现象叫作自感，这个电动势叫作<span class="def-term">自感电动势</span>。</div></DefinitionBox></div>
<div v-click="2">自感电动势同样遵从楞次定律：它总要<span class="text-accent">阻碍电流的变化</span>。</div>
</div>
</div>
</div>

---
title: 自感电动势的方向
---

<div class="page-grow">
<div class="ask">线圈中的电流增大或减小时，自感电动势分别朝哪边？</div>
<SelfEmfDirectionSvg :step="$clicks" />
<div v-click="3" class="tip-hint">增反减同：电流增大时反向阻碍，电流减小时同向"挽留"。</div>
</div>

---
title: 通电自感
---

<div class="page-grow">
<div class="split-wide">
<SelfInductionOnDemo />
<div class="stack">
<div class="ask">闭合开关，两只相同的灯谁先亮？</div>
<div v-click="1">A₂ 立即亮；A₁ 慢慢变亮，最后两灯一样亮。</div>
<div v-click="2">L 中电流增大 → 自感电动势阻碍增大 → A₁ 的电流被"拖住"。</div>
<div v-click="3" class="tip-hint">L 越大（有铁芯、匝数多），A₁ 亮得越慢。</div>
</div>
</div>
</div>

---
title: 断电自感
---

<div class="page-grow">
<div class="split-wide">
<SelfInductionOffDemo />
<div class="stack">
<div class="ask">断开开关，灯泡会立刻熄灭吗？</div>
<div v-click="1">灯先闪亮一下，再慢慢熄灭。</div>
<div v-click="2">L 中的电流不能突变：线圈相当于电源，经灯泡继续放电。</div>
<div v-click="3" class="tip-hint">通过灯泡的电流方向，与原来相反。</div>
</div>
</div>
</div>

---
title: 自感电动势的大小
---

<div class="page-grow">
<div class="ask">电流变化得越快、线圈的"惯性"越大，自感电动势就越大——写成式子？</div>
<div class="text-center formula-lg"><Latex tex="E = L\dfrac{\Delta I}{\Delta t}" display /></div>
<div v-click="1"><b>L</b> 叫自感系数（电感），由线圈的大小、形状、匝数、有无铁芯决定。</div>
<div v-click="2"><b>单位</b>：亨利（<Latex tex="\text{H}" />），<Latex tex="1\ \text{H} = 1\ \text{V}\cdot\text{s/A}" />；常用 <Latex tex="\text{mH}" />、<Latex tex="\mu\text{H}" />。</div>
<div v-click="3" class="tip-hint"><Latex tex="\dfrac{\Delta I}{\Delta t}" /> 越大，自感电动势越大——所以断开电路的瞬间最危险。</div>
</div>

---
title: 磁场的能量
---

<div class="page-grow">
<div class="stack">
<div class="ask">开关早已断开，灯还能亮一会儿——能量从哪来？</div>
<div v-click="1">电流在周围建立磁场，能量就储存在磁场里。</div>
<EnergyFlowSvg :step="$clicks" />
<div v-click="2" class="tip-hint">L 越大，储存的磁场能量越多，断电时"还"得越久、越亮。</div>
</div>
</div>

---
title: 自感的用与防
---

<div class="page-grow">
<div class="stack">
<div class="ask">自感能点亮灯管，也能在断电时打火——怎么用、怎么防？</div>
<div class="fig-wide"><InductorApplicationsSvg /></div>
<div class="half-grid">
<div v-click="1"><b class="text-accent">用：日光灯镇流器</b><br />启动时产生很高的自感电动势，帮助点亮灯管。</div>
<div v-click="2" class="divider-l"><b class="text-accent">防：断开大电感</b><br />电流骤减 → 自感电动势很大 → 触点间打出电火花；要用安全开关。</div>
</div>
</div>
</div>

---
title: 小结
---

<div class="page-grow">
<div class="stack">
<div class="ask">互感与自感，差在哪一步？</div>
<table class="data-table summary-table">
<thead>
<tr><th>比较</th><th>互感</th><th>自感</th></tr>
</thead>
<tbody>
<tr><td>磁场由谁产生</td><td>另一个线圈</td><td>线圈自身</td></tr>
<tr><td>感应电动势出现在</td><td>另一个线圈</td><td>线圈自身</td></tr>
<tr><td>电动势的方向</td><td>阻碍磁通量的变化</td><td>阻碍自身电流的变化</td></tr>
<tr><td>典型应用</td><td>变压器、无线充电</td><td>日光灯镇流器</td></tr>
</tbody>
</table>
<div v-click="1" class="tip-hint">共同点：磁通量变化才有感应电动势；自感还会"阻碍电流的变化"。</div>
</div>
</div>
