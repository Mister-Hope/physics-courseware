---
theme: default
title: "导体的电阻"
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
chapter-no: "11.2"
chapter: "第十一章 电路及其应用"
subtitle: "电阻的定义、电阻定律与伏安特性曲线"
---

<!-- 封面装饰：一段导体与它的长度 l、横截面积 S（对应 R = ρl/S） -->
<CoverDecorationSvg />

---
layout: base-flex
clicks: 3
---

# 复习：电阻

<div class="page-grow">

<div class="ask">初中学过电阻：它的物理意义是什么？定义式怎么写？单位是什么？</div>

<div v-click="1">物理意义：电阻反映导体对电流的阻碍作用。</div>

<div v-click="2">定义式：<Latex tex="R = \dfrac{U}{I}" />，其中 <Latex tex="U" /> 是导体两端的电压、<Latex tex="I" /> 是通过导体的电流。</div>

<div v-click="3">单位：欧姆，符号 <Latex tex="\Omega" />；<Latex tex="1\ \text{k}\Omega = 10^{3}\ \Omega" />，<Latex tex="1\ \text{M}\Omega = 10^{6}\ \Omega" />。</div>

</div>

---
layout: base-flex
title: 复习：电阻
clicks: 2
---

<div class="page-grow">

<div class="ask">同一段导体，加在它两端的电压变大时，它的电阻会变大吗？</div>

<div v-click="1">电压变大时，通过它的电流也按同样的比例变大——<Latex tex="\dfrac{U}{I}" /> 这个比值不变，电阻也就没有变。</div>

<div v-click="2" class="warn-hint">电阻是用比值定义的物理量：比值由导体本身决定，与它两端的电压、通过的电流无关。不能说 <Latex tex="R" /> 与 <Latex tex="U" /> 成正比、与 <Latex tex="I" /> 成反比。</div>

</div>

---
layout: base-flex
title: "导线的电阻跟哪些因素有关"
clicks: 2
---

<!-- 引课：教材 §11.2「问题」——输电线做粗，引出电阻与 l、S、材料的关系 -->
<div class="page-grow page-around">

<div class="ask ask-lead">
<mdi-head-question-outline class="text-3xl" />
<span>给空调供电的铜导线，横截面积要用 <Latex tex="4\ \text{mm}^2" />——比它细的导线也能通电，为什么还要做得这么粗？</span>

</div>

<WireCompare />

<div class="stack-tight">

<div v-click="1" class="tip-hint">导体的电阻与它的<strong>长度</strong>、<strong>横截面积</strong>和<strong>材料</strong>有关：同样长的铜导线，越粗电阻越小，电能的损耗也越小。</div>

<div v-click="2" class="info-hint">它们之间的<strong>定量关系</strong>是什么？要回答这个问题，先得能测出一段导体的电阻。</div>

</div>

</div>

---
layout: base-flex
title: "导体 A、B 的 U-I 图像"
clicks: 2
---

# 导体 A、B 的 U-I 图像

<div class="page-grow">

<UIConductorCurve :step="$clicks" />

<div class="stack-tight">

<div v-click="2" class="tip-hint">两条图线都是<strong>过原点的直线</strong>——同一个导体，不管电流、电压怎样变化，<Latex tex="U" /> 与 <Latex tex="I" /> 成正比。两条直线的<strong>倾斜程度不同</strong>，说明两个导体的电阻不同：<Latex tex="U" />-<Latex tex="I" /> 图线的<strong>斜率表示电阻</strong>。</div>

</div>

</div>

---
layout: base-flex
title: "电阻"
clicks: 2
---

# 电阻

<div class="page-grow" style="--def-pad-y:.55rem;--hint-pad-y:.55rem">

<UIChart>

<DefinitionBox v-click="1" term="电阻" tone="gold">

导体两端的电压与通过它的电流之比是一个常量：<Latex tex="R = U/I" />，单位是 <Latex tex="\Omega" />。它反映导体对电流的阻碍作用。

</DefinitionBox>

<div v-click="2" class="warn-hint"><Latex tex="R" /> 只跟导体本身的性质有关：改变工作点，<Latex tex="U" /> 和 <Latex tex="I" /> 都跟着变，比值 <Latex tex="U/I" /> 不变。</div>

</UIChart>

</div>

---
layout: base-flex
title: "两条直线的倾斜程度由什么决定"
clicks: 2
---

<div class="page-grow page-around">

<div class="ask ask-lead">
<mdi-head-question-outline class="text-3xl" />
<span>直线越陡，导体的电阻越大。那么，一段导体的电阻又由什么决定？</span>

</div>

<div v-click="1" class="three-col">

<div>

<div class="mini-title"><mdi-ruler class="icon-md" />长度</div>

<div class="mini-note mt-1">导线越长，电阻越大</div>

</div>

<div>

<div class="mini-title"><mdi-arrow-expand-horizontal class="icon-md" />横截面积</div>

<div class="mini-note mt-1">导线越粗，电阻越小</div>

</div>

<div>

<div class="mini-title"><mdi-atom class="icon-md" />材料</div>

<div class="mini-note mt-1">同样粗细长短，不同材料电阻不同</div>

</div>

</div>

<div v-click="2" class="info-hint">要让结论可靠，就得让导体<strong>只在一个因素上变化</strong>，其余因素保持不变。</div>

</div>

---
layout: base-flex
title: "用串联电路比较四段导体的电阻"
clicks: 4
---

# 用串联电路比较四段导体的电阻

<div class="page-grow">

<SeriesFourConductors :step="$clicks" />

<div v-click="1" class="tip-hint">四段导体<strong>串联</strong>在同一个电路中：通过的电流相同，由 <Latex tex="U = IR" /> 可知 <Latex tex="U \propto R" />——所以<strong>各段两端电压之比，就是它们的电阻之比</strong>。</div>

</div>

---
layout: base-flex
title: "四段导体的电压之比"
clicks: 1
---

# 四段导体的电压之比

<div class="page-grow">

<table class="cw-table mt-1">

<thead>

<tr><th>导体</th><th>长度</th><th>横截面积</th><th>材料</th><th>电压 <Latex tex="U/\text{V}" /></th></tr>

</thead>

<tbody>

<tr><td>a</td><td><Latex tex="l_0" /></td><td><Latex tex="S_0" /></td><td>康铜</td><td>2.0</td></tr>

<tr><td>b</td><td><Latex tex="2l_0" /></td><td><Latex tex="S_0" /></td><td>康铜</td><td>4.0</td></tr>

<tr><td>c</td><td><Latex tex="l_0" /></td><td><Latex tex="2S_0" /></td><td>康铜</td><td>1.0</td></tr>

<tr><td>d</td><td><Latex tex="l_0" /></td><td><Latex tex="S_0" /></td><td>镍铬合金</td><td>4.5</td></tr>

</tbody>

</table>

<div v-click="1" class="tip-hint">四段导体串联，电流都是 <Latex tex="I = 0.5\ \text{A}" />。由 <Latex tex="R = \dfrac{U}{I}" /> 得 <Latex tex="R_a = 4\ \Omega" />、<Latex tex="R_b = 8\ \Omega" />、<Latex tex="R_c = 2\ \Omega" />、<Latex tex="R_d = 9\ \Omega" />。</div>

</div>

---
layout: base-flex
title: "电阻与长度、横截面积、材料的关系"
clicks: 3
---

# 电阻与长度、横截面积、材料的关系

<div class="page-grow" style="--page-gap:.9rem">

<div class="ask">
<mdi-head-question-outline class="text-3xl" />
<span>比较 a 与 b、a 与 c、a 与 d，各能说明什么？</span>
</div>

<div v-click="1" class="conclusion-line">比较 a、b：长度变为 2 倍，电阻也变为 2 倍——同种材料、横截面积相同时，<Latex tex="R \propto l" />。</div>

<div v-click="2" class="conclusion-line">比较 a、c：横截面积变为 2 倍，电阻变为 <Latex tex="1/2" />——同种材料、长度相同时，<Latex tex="R \propto 1/S" />。</div>

<div v-click="3" class="conclusion-line">比较 a、d：长度、横截面积都相同，材料不同，电阻不同——电阻还与材料有关。</div>

</div>

---
layout: base-flex
title: "电阻定律"
clicks: 2
---

# 电阻定律

<div class="page-grow" style="--def-pad-y:.8rem;--hint-pad-y:.62rem">

<div class="def-row">

<DefinitionBox term="电阻定律" tone="gold">

同种材料的导体，其电阻 <Latex tex="R" /> 与它的长度 <Latex tex="l" /> 成正比、与它的横截面积 <Latex tex="S" /> 成反比；导体电阻还与构成它的材料有关。写成公式是 <Latex tex="R = \rho \dfrac{l}{S}" />。

</DefinitionBox>

<DefinitionBox v-click="1" term="电阻率" tone="blue">

式中的 <Latex tex="\rho" /> 叫作这种材料的<strong>电阻率</strong>：同种材料的 <Latex tex="\rho" /> 不变，不同种材料一般不同，它反映了材料的导电性能。单位是 <Latex tex="\Omega \cdot \text{m}" />，通常取 <Latex tex="20\ ^\circ\text{C}" /> 时的数值。

</DefinitionBox>

</div>

<div v-click="2" class="info-hint">长度、横截面积一定时，<Latex tex="\rho" /> 越大电阻越大。例如 <Latex tex="20\ ^\circ\text{C}" /> 时铜的 <Latex tex="\rho = 1.7 \times 10^{-8}\ \Omega \cdot \text{m}" />。</div>

</div>

---
layout: base-flex
title: "两个式子各回答什么问题"
clicks: 2
---

# 两个式子各回答什么问题

<div class="page-grow">

<table class="cw-table cw-table--left mt-2">

<thead>

<tr><th>式子</th><th>它回答的问题</th><th style="width: 32%">电阻由谁决定</th></tr>

</thead>

<tbody>

<tr><td><Latex tex="R = \dfrac{U}{I}" /></td><td>怎样由电压和电流<br />量出一段导体的电阻</td><td rowspan="2">导体本身：<br />材料、长度、横截面积</td></tr>

<tr><td><Latex tex="R = \rho \dfrac{l}{S}" /></td><td>导体的电阻由哪些因素决定</td></tr>

</tbody>

</table>

<div v-click="1" class="warn-hint"><Latex tex="R = \dfrac{U}{I}" /> 是<strong>定义式</strong>：<Latex tex="U" />、<Latex tex="I" /> 只是测量手段——不能说"电压越大，电阻越大"。</div>

<div v-click="2" class="tip-hint"><Latex tex="R = \rho \dfrac{l}{S}" /> 是<strong>决定式</strong>：电阻由材料（<Latex tex="\rho" />）和几何尺寸（<Latex tex="l" />、<Latex tex="S" />）共同决定。</div>

</div>

---
layout: base-flex
title: "材料的导电性能"
---

# 材料的导电性能

<div class="page-grow">

<div class="three-col mt-3">

<div>

<div class="mini-title"><mdi-flash-outline class="icon-md" />导体</div>

<div class="mini-note mt-1">金属中自由电子很多，电阻率 <Latex tex="\rho" /> 很小，如铜、铝、银。</div>

</div>

<div>

<div class="mini-title"><mdi-close-circle-outline class="icon-md" />绝缘体</div>

<div class="mini-note mt-1">几乎不存在能自由移动的电荷，电阻率极大，如橡胶、玻璃、胶木。</div>

</div>

<div>

<div class="mini-title"><mdi-lightbulb-on-outline class="icon-md" />半导体</div>

<div class="mini-note mt-1">导电性能会随温度、光照明显改变（如复印机里的光导体），其 <Latex tex="I" />-<Latex tex="U" /> 图线不是直线。</div>

</div>

</div>

</div>

---
layout: focus-question
title: "烧红的灯丝电阻会变吗"
clicks: 1
---

<!-- 引课 2：先问后答 —— 灯丝加热后电阻怎么变（承接电阻率与温度） -->

<template v-slot:icon>

<mdi-fire />

</template>

同一根灯丝，常温时和烧红时，电阻一样吗？

<template v-slot:hint>
把灯丝与一只小灯泡串联接入电路，小灯泡正常发光后，用酒精灯给灯丝加热——小灯泡的亮度会怎样变化？
</template>

---
layout: base-flex
title: "给灯丝加热"
clicks: 1
---

<div class="page-grow">

<div class="ask">
<mdi-fire class="text-3xl" />
<span>加热灯丝，小灯泡会变亮还是变暗？</span>

</div>

<FilamentHeatingDemo />

<div v-click="1" class="tip-hint">灯丝温度升高，小灯泡<strong>变暗</strong>——灯丝的电阻变大了。</div>

</div>

---
layout: base-flex
title: "金属的电阻率随温度升高而增大"
clicks: 2
---

# 金属的电阻率随温度升高而增大

<div class="page-grow">

<div class="tip-hint">加热使灯丝温度升高：<Latex tex="\rho \uparrow \Rightarrow R \uparrow \Rightarrow I = \dfrac{U}{R + R_L} \downarrow" />，所以小灯泡变暗。</div>

<div v-click="1" class="summary-line">金属的电阻率随温度的升高而增大。利用这一规律制成了<strong>电阻温度计</strong>（如铂电阻温度计）。</div>

<div v-click="2" class="summary-line">温度降低时，导体的电阻率减小。</div>

</div>

---
layout: base-flex
title: "超导现象"
clicks: 1
---

# 超导现象

<div class="page-grow">

<div class="half-grid">

<div>

<SuperconductChart />

</div>

<div>

<div class="summary-line">温度降到 <Latex tex="T_c" /> 以下，某些金属的电阻率降为 0——<strong>超导现象</strong>。</div>

<div v-click="1" class="summary-line">在 <Latex tex="T_c" /> 以上，它与普通金属一样：温度越高，电阻率越大。</div>

</div>

</div>

</div>

---
layout: base-flex
title: "伏安特性曲线"
clicks: 1
---

# 伏安特性曲线

<div class="page-grow">

<div class="half-grid">

<div class="stack">

<DefinitionBox term="伏安特性曲线" tone="gold">

用<strong>横坐标表示电压 <Latex tex="U" />、纵坐标表示电流 <Latex tex="I" /></strong> 画出的 <Latex tex="I" />-<Latex tex="U" /> 图像。

</DefinitionBox>

<div class="axis-note">
<div><strong>伏安特性曲线</strong>：横轴 <Latex tex="U" />、纵轴 <Latex tex="I" /></div>
<div><strong><Latex tex="U" />-<Latex tex="I" /> 图像</strong>：横轴 <Latex tex="I" />、纵轴 <Latex tex="U" /></div>
</div>

<div v-click="1" class="tip-hint">金属导体温度没有明显变化时，图线是一条<strong>过原点的直线</strong>；具有这种伏安特性曲线的电学元件叫作<strong>线性元件</strong>。</div>

</div>

<div>

<SimpleAxis
:x-max="6"
:y-max="6"
:x-axis="{ quantity: 'U', unit: 'V' }"
:y-axis="{ quantity: 'I', unit: 'A' }"
:curves="[{ points: [{ x: 0, y: 0 }, { x: 5.6, y: 4.2 }], color: 'var(--c-accent-2)', width: 3.5 }]"
:ticks="{ labels: false }"
:view="{ width: 480, height: 400 }"
/>

</div>

</div>

</div>
---
layout: base-flex
title: "非线性元件"
clicks: 2
---

# 非线性元件

<div class="page-grow">

<div class="half-grid">

<div>

<SimpleAxis
:x-max="6"
:y-max="6"
:x-axis="{ quantity: 'U', unit: 'V' }"
:y-axis="{ quantity: 'I', unit: 'A' }"
:curves="[{ formula: (u) => 0.75 * u, color: 'var(--c-accent-2)', width: 3.5 }, { formula: (u) => (1.25 * u) / (1 + 0.3 * u), color: 'var(--c-accent)', width: 3.5 }]"
:ticks="{ labels: false }"
:view="{ width: 480, height: 330 }"
/>

</div>

<div class="stack" style="align-self: stretch; justify-content: center">

<div class="summary-line" v-click="1">对气态导体（如日光灯管、霓虹灯管中的气体）和半导体元件，欧姆定律并不适用：电流与电压不成正比。<strong>这类电学元件叫作非线性元件。</strong></div>

<div class="summary-line" v-click="2">除金属外，欧姆定律对电解质溶液也适用。</div>

</div>

</div>

<div class="cv-legend">

<span><i class="cv-swatch" style="background:var(--c-accent-2)" />线性元件：<Latex tex="R" /> 不变</span>

<span><i class="cv-swatch" style="background:var(--c-accent)" />小灯泡：温度升高 <Latex tex="R" /> 变大，<Latex tex="I" /> 先陡后缓</span>

</div>

</div>

---
layout: exercise-split
title: "例题：小灯泡的 I-U 图线"
clicks: 2
---

<template v-slot:stem>

小灯泡通电后，其电流 <Latex tex="I" /> 随所加电压 <Latex tex="U" /> 变化的图线如图所示。<Latex tex="P" /> 为图线上一点，<Latex tex="PN" /> 为过 <Latex tex="P" /> 点的切线，<Latex tex="PQ" />、<Latex tex="PM" /> 分别为 <Latex tex="U" /> 轴、<Latex tex="I" /> 轴的垂线。下列说法中正确的是（　）（多选）

<div class="opts">
<div><strong>A.</strong> 电压增大时，电阻减小</div>
<div><strong>B.</strong> 电压增大时，电阻增大</div>
<div><strong>C.</strong> 对应 <Latex tex="P" /> 点，<Latex tex="R = \tfrac{U_1}{I_2}" /></div>
<div><strong>D.</strong> 对应 <Latex tex="P" /> 点，<Latex tex="R = \tfrac{U_1}{I_2 - I_1}" /></div>
</div>

</template>

<template v-slot:fig>

<BulbTangentFigure />

</template>

<div v-click="1" class="summary-line">曲线越往右越平：<Latex tex="U/I" /> 变大、电阻增大 → <strong>B 正确</strong></div>

<div v-click="2" class="warn-hint"><Latex tex="P" /> 点电阻 <Latex tex="R = \tfrac{U_1}{I_2}" />（<strong>C 正确</strong>）；<Latex tex="\tfrac{\Delta U}{\Delta I}" /> 不是电阻（<strong>D 错误</strong>）</div>
---
layout: exercise-split
title: "练习：串联导体柱的横截面积之比"
clicks: 2
---

<template v-slot:stem>

如图甲，两根材料相同的均匀导体柱 <Latex tex="m" />、<Latex tex="n" />（<Latex tex="m" /> 长 <Latex tex="l" />、<Latex tex="n" /> 长 <Latex tex="2l" />）串联在电路中，沿 <Latex tex="x" /> 轴方向的电势变化如图乙。取 <Latex tex="x = 3l" /> 处电势为零，则导体柱 <Latex tex="m" />、<Latex tex="n" /> 的横截面积之比为（　）

<div class="opts opts--4">
<div><strong>A.</strong> <Latex tex="\tfrac{1}{3}" /></div>
<div><strong>B.</strong> <Latex tex="\tfrac{1}{2}" /></div>
<div><strong>C.</strong> <Latex tex="\tfrac{1}{4}" /></div>
<div><strong>D.</strong> <Latex tex="\tfrac{2}{5}" /></div>
</div>

</template>

<template v-slot:fig>

<SeriesColumnsPotential />

</template>

<div v-click="1" class="summary-line">串联、<Latex tex="I" /> 相同 ⇒ <Latex tex="U \propto R" />；图乙 <Latex tex="U_m = 6\ \text{V}" />、<Latex tex="U_n = 4\ \text{V}" /> ⇒ <Latex tex="R_m : R_n = 3 : 2" />。</div>

<div v-click="2" class="tip-hint"><Latex tex="S \propto \tfrac{l}{R}" /> ⇒ <Latex tex="S_m : S_n = \tfrac{l}{3} : \tfrac{2l}{2} = 1 : 3" /> ⇒ 选 <strong>A</strong>。</div>

---
layout: base-flex
title: "课堂小结"
clicks: 4
---

# 课堂小结

<div class="page-grow">

<div class="summary-line" v-click="1"><span class="text-accent font-bold">电阻</span>：导体两端的电压与通过它的电流之比 <Latex tex="R = \dfrac{U}{I}" />，它反映导体对电流的阻碍作用，只由导体本身决定。</div>

<div class="summary-line" v-click="2"><span class="text-accent font-bold">U-I 图像</span>：同一个导体的 <Latex tex="U" />-<Latex tex="I" /> 图线是一条过原点的直线，直线的斜率表示导体的电阻。</div>

<div class="summary-line" v-click="3"><span class="text-accent font-bold">电阻定律</span>：<Latex tex="R = \rho \dfrac{l}{S}" />（同种材料：<Latex tex="R \propto l" />、<Latex tex="R \propto \dfrac{1}{S}" />）。</div>

<div class="summary-line" v-click="4"><span class="text-accent font-bold">电阻率</span>：<Latex tex="\rho" /> 由材料决定，单位是 <Latex tex="\Omega \cdot \text{m}" />，反映材料的导电性能。</div>

</div>

---
layout: base-flex
title: "课堂小结"
clicks: 4
---

# 课堂小结

<div class="page-grow">

<div class="summary-line" v-click="1"><span class="text-accent font-bold">电阻率与温度</span>：金属的电阻率随温度升高而增大（电阻温度计）；温度降低时电阻率减小，温度特别低时某些金属出现<strong>超导现象</strong>。</div>

<div class="summary-line" v-click="2"><span class="text-accent font-bold">伏安特性曲线</span>：横坐标 <Latex tex="U" />、纵坐标 <Latex tex="I" />。金属导体（温度无显著变化）是过原点的直线，为<strong>线性元件</strong>。</div>

<div class="summary-line" v-click="3"><span class="text-accent font-bold">非线性元件</span>：气态导体、半导体元件的 <Latex tex="I" /> 与 <Latex tex="U" /> 不成正比；欧姆定律对金属导体和电解质溶液适用。</div>

<div class="summary-line" v-click="4"><span class="text-accent font-bold">两个式子</span>：<Latex tex="R = \dfrac{U}{I}" /> 是定义式，<Latex tex="R = \rho \dfrac{l}{S}" /> 是决定式——电阻由导体本身决定。</div>

</div>
