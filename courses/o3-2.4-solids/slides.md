---
theme: default
title: "固体"
subtitle: 晶体 · 非晶体 · 微观结构
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
chapter: "第二章 气体、固体和液体"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 食盐和松香
---

<div class="page-grow solid-intro">
<div class="solid-intro-q">食盐颗粒和松香，外形有什么不同？</div>
<CrystalShapesSvg class="solid-figure solid-figure-sm" />
<div class="solid-intro-grid">
<div class="solid-intro-item"><mdi-cube-outline class="text-3xl" /><span>外形为什么不同？</span></div>
<div class="solid-intro-item"><mdi-thermometer class="text-3xl" /><span>性质有什么不同？</span></div>
<div class="solid-intro-item"><mdi-atom class="text-3xl" /><span>微观上有什么不同？</span></div>
</div>
</div>

---
layout: base-flex
---

# 晶体与非晶体

<div class="page-grow">
<div class="ask">哪些固体是晶体？它们和非晶体有什么不同？</div>
<div class="solid-cols">
<div>
<div class="mini-title">晶体</div>
<div class="solid-list">石英、云母、明矾、食盐、硫酸铜、味精……</div>
<div class="mini-note">有天然的、规则的几何形状</div>
</div>
<div>
<div class="mini-title">非晶体</div>
<div class="solid-list">玻璃、蜂蜡、松香、沥青、橡胶……</div>
<div class="mini-note">没有规则的外形</div>
</div>
</div>
<div v-click="1" class="tip-hint">晶体有规则的外形；非晶体没有规则的外形。</div>
</div>

---
layout: base-flex
---

# 晶体的外形

<div class="page-grow">
<div class="ask">晶体有哪些规则的外形？</div>
<CrystalShapesSvg class="solid-figure" :parts="['salt', 'alum', 'quartz', 'snowflake']" />
<div v-click="1" class="summary-line">晶体有天然的、规则的几何形状；非晶体没有规则的外形。</div>
</div>

---
layout: base-flex
---

# 熔点

<div class="page-grow">
<div class="ask">晶体和非晶体熔化时有什么不同？</div>
<div class="half-grid">
<div class="solid-card"><div class="mini-title">晶体</div><div>有确定的熔点，熔化过程中温度不变。</div></div>
<div class="solid-card"><div class="mini-title">非晶体</div><div>没有确定的熔化温度，<br />熔化时逐渐变软。</div></div>
</div>
<div v-click="1" class="tip-hint">金属没有规则的外形，却有确定的熔点——它是晶体吗？</div>
</div>

---
layout: base-flex
---

# 各向异性与各向同性

<div class="page-grow">
<div class="ask">玻璃片和云母片上的石蜡熔化区域，为什么形状不同？</div>
<WaxMeltSvg class="solid-figure" />
<div v-click="1" class="half-grid">
<div><b>各向同性</b>：玻璃沿各个方向的导热性能相同。</div>
<div><b>各向异性</b>：云母沿不同方向的导热性能不同。</div>
</div>
<div v-click="1" class="tip-hint">晶体可以表现出各向异性；非晶体沿各个方向的物理性质都相同。</div>
</div>

---
layout: base-flex
---

# 单晶体与多晶体

<div class="page-grow">
<div class="ask">金属没有规则的外形，为什么也有确定的熔点？</div>
<div class="half-grid">
<LatticeSvg class="solid-fig" mode="grains" />
<div>
<div><b>单晶体</b>：有规则的几何形状，<br />物理性质各向异性。</div>
<div><b>多晶体</b>：由许多晶粒组成；<br />整体没有规则外形，各向同性，<br />但有确定的熔点。</div>
<div class="mini-note">每个晶粒都是单晶体，晶粒取向杂乱。</div>
</div>
</div>
<div v-click="1" class="tip-hint">蔗糖块是多晶体，单个蔗糖颗粒是单晶体；金属也是多晶体。</div>
</div>

---
layout: base-flex
---

# 晶体的微观结构

<div class="page-grow">
<div class="ask">晶体中的原子、分子或离子是怎样排列的？</div>
<LatticeSvg class="solid-figure" mode="nacl" />
<div v-click="1" class="tip-hint">20 世纪初，X 射线衍射证实了晶体中粒子的规则排列；70 年代电子显微镜、1982 年扫描隧道显微镜让人类直接看到原子。</div>
</div>

---
layout: base-flex
---

# 石墨与金刚石

<div class="page-grow">
<div class="ask">同样由碳原子组成，为什么石墨很软，金刚石很硬？</div>
<CarbonAllotropesSvg class="solid-figure" />
<div class="stack">
<div><b>石墨</b>：层状结构，层间距离大、作用力弱，质地松软，可作润滑剂。</div>
<div><b>金刚石</b>：碳原子间作用力强，硬度大，可切割玻璃。</div>
</div>
</div>

---
layout: base-flex
---

# 非晶体的微观结构

<div class="page-grow">
<div class="ask">非晶体中的粒子是怎样排列的？</div>
<LatticeSvg class="solid-figure" mode="amorphous" />
<div v-click="1" class="tip-hint">非晶体中粒子的排列没有空间周期性；沿各个方向的物理性质相同，表现为各向同性。</div>
</div>

---
layout: base-flex
---

# 晶体与非晶体的转化

<div class="page-grow">
<div class="ask">同一种物质，可以既是晶体又是非晶体吗？</div>
<div class="solid-flow">
<span class="solid-flow-node">天然石英晶体</span>
<mdi-arrow-right class="text-3xl" />
<span class="solid-flow-node">熔化</span>
<mdi-arrow-right class="text-3xl" />
<span class="solid-flow-node">再凝固</span>
<mdi-arrow-right class="text-3xl" />
<span class="solid-flow-node">石英玻璃（非晶体）</span>
</div>
<div v-click="1" class="tip-hint">同种物质可以以晶体或非晶体形态存在；有些非晶体在一定条件下也能转化为晶体。</div>
</div>

---
layout: base-flex
---

# 晶体与非晶体的比较

<div class="page-grow">
<div class="ask">怎样从外形、熔点、各向异性和微观结构区分它们？</div>
<table class="solid-table">
<thead>
<tr><th>项目</th><th>单晶体</th><th>多晶体</th><th>非晶体</th></tr>
</thead>
<tbody>
<tr><td>外形</td><td>有规则</td><td>无规则（晶粒）</td><td>无规则</td></tr>
<tr><td>熔点</td><td>确定</td><td>确定</td><td>不确定</td></tr>
<tr><td>各向异性</td><td>有</td><td>无（各向同性）</td><td>无（各向同性）</td></tr>
<tr><td>微观结构</td><td>规则、有周期性</td><td>晶粒内规则，整体无序</td><td>无序</td></tr>
</tbody>
</table>
<div v-click="1" class="tip-hint">单晶体和多晶体都是晶体，都有确定的熔点。</div>
</div>

---
layout: base-flex
zoom: 0.92
---

# 科学漫步：石墨烯

<div class="page-grow">
<div class="ask">把石墨一层一层剥开，会得到什么？</div>
<LatticeSvg class="solid-figure" mode="graphene" />
<div class="stack">
<div>石墨烯是单层石墨，碳原子排成六边形晶格，厚度只有 <Latex tex="0.335\ \text{nm}" />。</div>
<div>2010 年诺贝尔物理学奖授予安德烈·盖姆和康斯坦丁·诺沃肖洛夫：<br />他们用透明胶带反复粘黏石墨，得到单层石墨。</div>
<div>石墨烯强度高、韧性好，电子运动得快。</div>
</div>
</div>

---
layout: exercise-split
clicks: 3
title: 例题：薄片是晶体吗
---

<template v-slot:stem>

在薄片中央 <Latex tex="O" /> 点放一个针状热源，在 <Latex tex="x" /> 轴、<Latex tex="y" /> 轴上到 <Latex tex="O" /> 点距离相等的 <Latex tex="x_1" />、<Latex tex="y_1" /> 两点各放一个测温元件。发现两点温度缓慢升高，但没有差异，于是得出“薄片是非晶体”的结论。这个结论科学吗？为什么？

</template>

<div v-click="1">两个方向导热相同，只能说明这两个方向的性质相同。</div>
<div v-click="2">晶体沿这两个方向的性质可能恰好相同；薄片也可能是多晶体，整体表现为各向同性。</div>
<div v-click="3" class="tip-hint">只测两个方向，不能说明所有方向都相同，不能排除它是晶体。结论不科学。</div>

---
layout: exercise-split
clicks: 4
hideQaMark: true
zoom: 0.94
title: 例题：食盐晶体中的离子间距
---

<template v-slot:stem>

食盐晶体中，相邻钠离子和氯离子中心连线组成大小相等的立方体。已知食盐密度 <Latex tex="\rho = 2.17 \times 10^3\ \text{kg/m}^3" />，还要知道哪些数据，才能求出相邻两个钠离子中心的距离？用字母表示并推导。

</template>

<template v-slot:fig>

<div class="solid-fig">
<LatticeSvg mode="nacl" show-cell />
</div>

</template>

<div v-click="1">还需要食盐的摩尔质量 <Latex tex="M" /> 和阿伏加德罗常数 <Latex tex="N_A" />。</div>
<div v-click="2">每个小立方体平均有 1 个离子，质量 <Latex tex="m = \frac{M}{2N_A}" />，体积 <Latex tex="\left(\frac{a}{2}\right)^3" />。</div>
<div v-click="3">由 <Latex tex="\rho = \frac{m}{(a/2)^3}" /> 得 <Latex tex="\frac{a}{2} = \left(\frac{M}{2\rho N_A}\right)^{1/3}" />；相邻两个钠离子中心的距离 <Latex tex="d = \sqrt{2}\cdot\frac{a}{2}" />。</div>
<div v-click="4" class="tip-hint">代入 <Latex tex="M = 5.85 \times 10^{-2}\ \text{kg/mol}" />、<Latex tex="N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}" />，得 <Latex tex="d \approx 4.0 \times 10^{-10}\ \text{m}" />。</div>

---
layout: base-flex
title: 小结
---

<div class="page-grow solid-summary">
<div class="solid-summary-main">固体</div>
<div class="solid-summary-grid">
<div class="solid-summary-card"><b>晶体</b><span>有规则外形、确定熔点<br />单晶体各向异性</span></div>
<div class="solid-summary-card"><b>多晶体</b><span>由晶粒组成；各向同性，<br />有确定熔点</span></div>
<div class="solid-summary-card"><b>非晶体</b><span>无规则外形、无确定熔点；<br />各向同性</span></div>
<div class="solid-summary-card"><b>微观结构</b><span>晶体粒子规则排列、<br />有空间周期性</span></div>
<div class="solid-summary-card"><b>各向异性</b><span>沿不同方向物理性质不同</span></div>
<div class="solid-summary-card"><b>同种物质</b><span>可呈晶体或非晶体形态</span></div>
</div>
<div class="summary-line">晶体与非晶体的区别，根源于微观粒子是否具有空间周期性排列。</div>
</div>
