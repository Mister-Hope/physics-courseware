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
title: 实验装置
---

<div class="page-grow">
<div class="ask text-center">两个线圈套在一起，两个回路之间没有导线相连。</div>
<AirGapLampDemo :controls="false" />
</div>

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
<div class="ask">A 中的电流变化，为什么会让 B 中也有电流？</div>
<div class="split-wide">
<div><MutualLinkSvg /></div>
<div class="stack">
<div v-click="1"><DefinitionBox term="互感"><div>当一个线圈中的<span class="def-term">电流变化</span>时，它的变化磁场会在<span class="def-term">另一个线圈</span>中激起感应电动势，这就是互感。</div><div>这个电动势叫作<span class="def-term">互感电动势</span>。</div></DefinitionBox></div>
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
<div v-click="1" class="tip-hint">这些装置都要靠不断变化的电流工作——所以变压器用交流，不用直流。</div>
</div>

---
title: 互感带来的干扰
---

<div class="page-grow">
<div class="split-wide">
<div><InterferenceSvg /></div>
<div class="stack">
<div class="ask">两条靠得很近的导线，为什么可能互相干扰？</div>
<div v-click="1">一根导线中变化的电流，会在另一根里激起感应电动势。</div>
<div v-click="2">收音机旁的电源线、电路板上并排的走线，都可能这样引进噪声。</div>
<div v-click="3" class="tip-hint">对策：拉开距离、互相垂直、加屏蔽层、用双绞线。</div>
</div>
</div>
</div>

---
layout: exercise-split
title: 互感（练习）
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　某餐厅的送餐机器人停在充电板上，不插线就能给电池充电。关于这个过程，下列说法正确的是（　　）</div>

<div class="ex-options">
<div><b>A.</b> 利用了电磁感应原理</div>
<div><b>B.</b> 送电线圈中通入的是恒定电流</div>
<div><b>C.</b> 送电线圈在周围产生变化的磁场</div>
<div><b>D.</b> 受电线圈中的磁通量保持不变</div>
</div>

</template>

<div v-click="1">选 <b class="text-accent">A、C</b>。送电线圈中的电流必须不断变化，才能在受电线圈中激起感应电动势。</div>

<div v-click="2">B、D 错：恒定电流产生恒定磁场，受电线圈中的磁通量不变，不会有感应电动势。</div>

<div v-click="3" class="tip-hint">无线充电的送电、受电线圈，就是一对相互靠近、互相感应的线圈。</div>

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
<div v-click="3" class="tip-hint">增反减同：电流增大时反向阻碍，电流减小时同向阻碍。</div>
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
<div v-click="2">L 中电流增大 → 自感电动势阻碍增大 → A₁ 的电流只能慢慢变大。</div>
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
layout: exercise-split
title: 自感（练习）
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　如图，<Latex tex="L" /> 是自感系数很大的线圈，其自身的直流电阻几乎为 <Latex tex="0" />。<Latex tex="A" />、<Latex tex="B" /> 是两个相同的小灯泡。闭合开关 <Latex tex="S" /> 后，<Latex tex="A" />、<Latex tex="B" /> 两灯的亮度怎样变化？断开 <Latex tex="S" /> 后呢？</div>

</template>

<template v-slot:fig>

<SelfInductionExerciseSvg />

</template>

<div v-click="1"><b>闭合 <Latex tex="S" /> 瞬间</b>：<Latex tex="L" /> 中电流不能突变，电流从 <Latex tex="B" /> 支路通过，<Latex tex="A" />、<Latex tex="B" /> 同时变亮。</div>

<div v-click="2">随后 <Latex tex="L" /> 中电流逐渐增大，把 <Latex tex="B" /> 短路：<Latex tex="B" /> 逐渐变暗直至熄灭，<Latex tex="A" /> 变得更亮。</div>

<div v-click="3"><b>断开 <Latex tex="S" /> 瞬间</b>：<Latex tex="A" /> 立即熄灭；<Latex tex="L" /> 中的电流经 <Latex tex="B" /> 形成回路，<Latex tex="B" /> 闪亮一下后逐渐熄灭。</div>

---
title: 自感电动势的大小
---

<div class="page-grow">
<div class="ask">自感电动势跟哪些因素有关？怎么写成一个式子？</div>
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
<div v-click="2" class="tip-hint">L 越大，储存的磁场能量越多，断电后灯亮得越久、也可能越亮。</div>
</div>
</div>

---
title: 自感的利用与防治
---

# 自感的利用与防治

<div class="page-grow">
<div class="use-grid">
<div class="mini-title">利用</div>
<div class="mini-title">防治</div>
<div class="use-item">
<div class="use-figure"><BallastCircuitSvg /></div>
<div class="use-name">日光灯镇流器</div>
<div class="mini-note">断电瞬间产生很高的自感电动势，把灯管点亮。</div>
</div>
<div class="use-item">
<div class="use-figure"><SafetySwitchSvg /></div>
<div class="use-name">安全开关</div>
<div class="mini-note">变压器、电动机断电时触点会打火，要用特制安全开关。</div>
</div>
<div class="use-item">
<div class="use-figure"><ChokeCoilSvg /></div>
<div class="use-name">扼流圈</div>
<div class="mini-note">通直流、阻交流，用来滤掉电流中的交流成分。</div>
</div>
<div class="use-item">
<div class="use-figure"><BifilarWindingSvg /></div>
<div class="use-name">双线绕法</div>
<div class="mini-note">两根导线电流反向、磁场抵消，自感大大减小。</div>
</div>
</div>
</div>

---
title: 小结
---

<div class="page-grow">
<div class="stack">
<div class="ask">互感与自感，差在哪一步？</div>
<table class="data-table summary-table text-lg">
<thead>
<tr><th>比较</th><th>互感</th><th>自感</th></tr>
</thead>
<tbody>
<tr><td>磁场由谁产生</td><td>另一个线圈</td><td>线圈自身</td></tr>
<tr><td>感应电动势出现在</td><td>另一个线圈</td><td>线圈自身</td></tr>
<tr><td>电动势的方向</td><td>阻碍磁通量的变化</td><td>阻碍自身电流的变化</td></tr>
<tr><td>典型应用</td><td>变压器、无线充电</td><td>日光灯镇流器、扼流圈</td></tr>
</tbody>
</table>
<div v-click="1" class="tip-hint">共同点：磁通量变化才有感应电动势；自感还会"阻碍电流的变化"。</div>
</div>
</div>
