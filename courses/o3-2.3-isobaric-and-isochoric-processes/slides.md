---
theme: default
title: "气体的等压变化和等容变化"
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
chapter-no: "2.3"
chapter: "第二章 气体、固体和液体"
subtitle: "盖-吕萨克定律 · 查理定律 · 理想气体状态方程"
---

<CoverDecorationSvg />

---
title: "问题：手捂烧瓶，水柱为什么向外移动？"
clicks: 2
clickAnimation: none
---

<div class="page-grow page-grow-tight">
<div class="gp-split">
<div class="gp-fig"><FlaskTubeSvg :heated="$clicks >= 1" /></div>
<div class="stack">
<div class="ask">用手捂住烧瓶，<br />玻璃管中的水柱为什么会向外移动？</div>
<div class="gp-point" v-click="1">温度升高，瓶内气体的<strong>体积增大</strong>。</div>
<div class="gp-point" v-click="2">水柱向外移动时，瓶内气体的<strong>压强保持不变</strong>；这就是<strong>等压变化</strong>。</div>
</div>
</div>
</div>

---
title: "压强不变时，体积与温度有什么关系？"
clicks: 1
clickAnimation: none
---

# 压强不变时，体积与温度有什么关系？

<div class="page-grow page-grow-tight">
<div class="gp-split">
<div class="stack">
<div class="mini-title">等压变化</div>
<div>一定质量的某种气体，在<strong>压强不变</strong>时，体积随温度变化的过程。</div>
<div class="gp-point">实验表明：在 <Latex tex="V" />-<Latex tex="T" /> 图像中，等压线是一条<strong>过原点的直线</strong>。</div>
</div>
<div class="stack">
<div class="gp-formula-big"><Latex tex="V=CT" display /></div>
<div class="gp-formula-big" v-click="1"><Latex tex="\frac{V_1}{T_1}=\frac{V_2}{T_2}" display /></div>
<div class="mini-note" v-click="1">盖-吕萨克定律：<Latex tex="C" /> 是常量，与气体质量、种类有关。</div>
</div>
</div>
</div>

---
title: "V-T 图像为什么是一条过原点的直线？"
clicks: 1
clickAnimation: none
---

# V-T 图像为什么是一条过原点的直线？

<div class="page-grow page-grow-tight">
<IsobaricExplorer />
<div class="summary-line" v-click="1">同一条等压线上，<Latex tex="\frac{V}{T}" /> 的比值不变，所以图线过原点。</div>
</div>

---
title: "体积不变时，压强与摄氏温度成正比吗？"
clicks: 2
clickAnimation: none
---

# 体积不变时，压强与摄氏温度成正比吗？

<div class="page-grow page-grow-tight">
<div class="gp-split">
<div class="figure gp-fig">
<CoordAxes
  :x-range="[-150, 250]"
  :y-range="[0, 2e5]"
  :x-axis="{ quantity: 't', unit: '℃' }"
  :y-axis="{ quantity: 'p', unit: 'Pa' }"
  :ticks="{ labels: false }"
  :curves="[{ formula: (t) => (t + 273.15) * 1e5 / 273.15, color: 'var(--c-accent)', width: 3 }]"
/>
<div class="fig-cap">一定质量气体等容变化（示意）</div>
</div>
<div class="stack">
<div class="gp-point">等容变化：体积不变，压强随温度变化。</div>
<div class="gp-point" v-click="1"><Latex tex="p" /> 与 <Latex tex="t" /> 是<strong>一次函数</strong>关系，图线是一条直线。</div>
<div class="gp-point" v-click="2">但直线<strong>不过原点</strong>，<Latex tex="p" /> 与 <Latex tex="t" /> 不成正比。</div>
</div>
</div>
</div>

---
title: "把直线延长，交点告诉了我们什么？"
clicks: 2
clickAnimation: none
---

# 把直线延长，交点告诉了我们什么？

<div class="page-grow page-grow-tight">
<div class="gp-split">
<div class="figure gp-fig">
<CoordAxes
  :x-range="[-300, 250]"
  :y-range="[0, 2e5]"
  :x-axis="{ quantity: 't', unit: '℃' }"
  :y-axis="{ quantity: 'p', unit: 'Pa' }"
  :ticks="{ labels: false }"
  :curves="[{ formula: (t) => (t + 273.15) * 1e5 / 273.15, color: 'var(--c-accent)', width: 3 }]"
  :labels="[{ x: -273.15, y: 0, dot: true, dotColor: 'var(--c-accent)' }]"
/>
<div class="fig-cap">等容线与横轴的交点约为 <Latex tex="-273.15\ ^{\circ}\mathrm{C}" />（示意）</div>
</div>
<div class="stack">
<div class="gp-point" v-click="1">交点温度约 <Latex tex="-273.15\ ^{\circ}\mathrm{C}" />，叫<strong>绝对零度</strong>。</div>
<div class="gp-point" v-click="1">它是热力学温度的 <Latex tex="0\ \text{K}" />。</div>
<div class="gp-point" v-click="2">热力学温度：<Latex tex="T=t+273.15" />。</div>
<div class="gp-point" v-click="2">改用 <Latex tex="T" /> 作横轴，等容线就<strong>过原点</strong>了。</div>
</div>
</div>
</div>

---
title: "查理定律告诉我们什么？"
clicks: 1
clickAnimation: none
---

# 查理定律告诉我们什么？

<div class="page-grow page-grow-tight">
<div class="gp-split">
<div class="stack">
<div class="mini-title">等容变化</div>
<div>一定质量的某种气体，在<strong>体积不变</strong>时，压强随温度变化的过程。</div>
<div class="gp-formula-big"><Latex tex="p=CT" display /></div>
</div>
<div class="stack">
<div class="gp-formula-big" v-click="1"><Latex tex="\frac{p_1}{T_1}=\frac{p_2}{T_2}" display /></div>
<div class="mini-note" v-click="1">查理定律：<Latex tex="C" /> 是常量，与气体质量、种类有关。</div>
<div class="gp-point" v-click="1">在 <Latex tex="p" />-<Latex tex="T" /> 图像中，等容线是一条<strong>过原点的直线</strong>。</div>
</div>
</div>
</div>

---
title: "p-T 图像上的点怎样随温度移动？"
clicks: 1
clickAnimation: none
---

# p-T 图像上的点怎样随温度移动？

<div class="page-grow page-grow-tight">
<IsochoricExplorer />
<div class="summary-line" v-click="1">同一条等容线上，<Latex tex="\frac{p}{T}" /> 的比值不变，所以图线过原点。</div>
</div>

---
title: "两个定律有什么相同和不同？"
clicks: 2
clickAnimation: none
---

# 两个定律有什么相同和不同？

<div class="page-grow page-grow-tight">
<table class="data-table gp-table">
<thead>
<tr><th>不变量</th><th>规律</th><th>公式</th><th>图像</th></tr>
</thead>
<tbody>
<tr><td>压强 <Latex tex="p" /></td><td>盖-吕萨克定律</td><td><Latex tex="\frac{V}{T}=C" /></td><td><Latex tex="V" />-<Latex tex="T" /> 过原点直线</td></tr>
<tr><td>体积 <Latex tex="V" /></td><td>查理定律</td><td><Latex tex="\frac{p}{T}=C" /></td><td><Latex tex="p" />-<Latex tex="T" /> 过原点直线</td></tr>
</tbody>
</table>
<div class="gp-point" v-click="1"><strong>相同</strong>：一个量不变，另外两个量成正比；图线都过原点。</div>
<div class="gp-point" v-click="2"><strong>不同</strong>：等压看 <Latex tex="V" />-<Latex tex="T" />，等容看 <Latex tex="p" />-<Latex tex="T" />；常量 <Latex tex="C" /> 的意义不同。</div>
</div>

---
title: "这些定律在什么条件下才成立？"
clicks: 3
clickAnimation: none
---

# 这些定律在什么条件下才成立？

<div class="page-grow page-grow-tight">
<div class="gp-split">
<div class="stack">
<div class="gp-point">一定质量、一定种类的气体。</div>
<div class="gp-point" v-click="1">压强不太大、温度不太低。</div>
<div class="gp-point" v-click="2">温度必须用<strong>热力学温度</strong> <Latex tex="T" />。</div>
</div>
<div class="gp-card" v-click="3">
<div class="gp-card-title">理想气体</div>
<div>分子大小、分子间作用力可以忽略，碰撞不损失动能。</div>
<div class="mini-note">常温常压下，实际气体可近似当作理想气体。</div>
</div>
</div>
</div>

---
title: "从分子动理论看，三个定律为什么成立？"
clicks: 3
clickAnimation: none
---

# 从分子动理论看，三个定律为什么成立？

<div class="page-grow page-grow-tight">
<div class="gp-lead">温度反映分子平均动能；压强由分子碰撞器壁产生。</div>
<div class="gp-three">
<div class="gp-card" v-click="1">
<div class="gp-card-title">等温（玻意耳定律）</div>
<div><Latex tex="T" /> 不变，平均动能不变；<br /><Latex tex="V" /> 减小，数密度增大，<br />单位时间碰撞次数增多，<br /><Latex tex="p" /> 增大。</div>
</div>
<div class="gp-card" v-click="2">
<div class="gp-card-title">等压（盖-吕萨克定律）</div>
<div><Latex tex="T" /> 升高，平均动能增大；<br />只有 <Latex tex="V" /> 同时增大、<br />数密度减小，<br />才能保持 <Latex tex="p" /> 不变。</div>
</div>
<div class="gp-card" v-click="3">
<div class="gp-card-title">等容（查理定律）</div>
<div><Latex tex="V" /> 不变，数密度不变；<br /><Latex tex="T" /> 升高，平均动能增大，<br /><Latex tex="p" /> 增大。</div>
</div>
</div>
</div>

---
title: "三个定律能合成一个式子吗？"
clicks: 3
clickAnimation: none
---

# 三个定律能合成一个式子吗？

<div class="page-grow page-grow-tight">
<div class="gp-split">
<div class="stack">
<div class="ask">一定质量的气体，从状态 1 到状态 2，<br /><Latex tex="p" />、<Latex tex="V" />、<Latex tex="T" /> 都改变，<br />还能找到不变的关系吗？</div>
<div class="gp-formula-big" v-click="3"><Latex tex="\frac{p_1V_1}{T_1}=\frac{p_2V_2}{T_2}" display /></div>
</div>
<div class="stack">
<div class="gp-point" v-click="1">先等温：<Latex tex="p_1V_1=pV" />。</div>
<div class="gp-point" v-click="2">再等容：<Latex tex="\frac{p}{T_1}=\frac{p_2}{T_2}" />。</div>
<div class="gp-point" v-click="3">消去中间状态，得 <Latex tex="\frac{pV}{T}=C" />。</div>
<div class="mini-note" v-click="3">常量 <Latex tex="C" /> 与气体质量、种类有关；这就是<strong>理想气体状态方程</strong>。</div>
</div>
</div>
</div>

---
layout: exercise-split
title: "例题：连续两次状态变化，怎样求压强？"
clicks: 3
clickAnimation: none
class: ex-top
analysisLabel: 解析
---

<template v-slot:stem>

某种气体的压强为 <Latex tex="2\times10^5\ \text{Pa}" />，体积为 <Latex tex="1\ \text{m}^3" />，温度为 <Latex tex="200\ \text{K}" />。它先经过等温过程，体积变为 <Latex tex="2\ \text{m}^3" />；随后又经过等容过程，温度变为 <Latex tex="300\ \text{K}" />。求这时气体的压强。

</template>

<div class="gp-step" v-click="1"><strong>等温过程</strong>：<Latex tex="p_1V_1=pV" />，得 <Latex tex="p=1\times10^5\ \text{Pa}" />。</div>
<div class="gp-step" v-click="2"><strong>等容过程</strong>：<Latex tex="\frac{p}{T_1}=\frac{p_2}{T_2}" />，得 <Latex tex="p_2=1.5\times10^5\ \text{Pa}" />。</div>
<div class="gp-step" v-click="3">也可直接用 <Latex tex="\frac{p_1V_1}{T_1}=\frac{p_2V_2}{T_2}" /> 一步算出同样的结果。</div>
<div class="summary-line" v-click="3">答案：<Latex tex="1.5\times10^5\ \text{Pa}" /></div>

---
layout: exercise-split
title: "练习：钢瓶漏气了吗？"
clicks: 3
clickAnimation: none
class: ex-top
---

<template v-slot:stem>

钢瓶内装有氧气。在 <Latex tex="17\ ^{\circ}\mathrm{C}" /> 的室内测得瓶内压强为 <Latex tex="9.31\times10^6\ \text{Pa}" />；在 <Latex tex="-13\ ^{\circ}\mathrm{C}" /> 的工地上测得压强为 <Latex tex="8.15\times10^6\ \text{Pa}" />。试判断钢瓶是否漏气，并说明理由。

</template>

<div class="gp-step" v-click="1">温度：<Latex tex="T_1=290\ \text{K}" />，<Latex tex="T_2=260\ \text{K}" />。若钢瓶不漏气，气体质量与体积都不变，可视为<strong>等容变化</strong>。</div>
<div class="gp-step" v-click="2">由 <Latex tex="\frac{p_1}{T_1}=\frac{p_2'}{T_2}" />，若不漏气应有 <Latex tex="p_2'=\frac{p_1T_2}{T_1}\approx8.35\times10^6\ \text{Pa}" />。</div>
<div class="gp-step" v-click="3">实测 <Latex tex="8.15\times10^6\ \text{Pa}" /> 小于 <Latex tex="8.35\times10^6\ \text{Pa}" />，说明气体质量减少，所以<strong>钢瓶漏气</strong>。</div>

---
layout: exercise-split
title: "练习：拔火罐为什么能吸住皮肤？"
clicks: 3
clickAnimation: none
class: ex-top
---

<template v-slot:stem>

“拔火罐”时，医生用点燃的酒精棉球加热小罐内的空气，随后迅速把小罐倒扣在皮肤上冷却。设加热后罐内空气温度为 <Latex tex="80\ ^{\circ}\mathrm{C}" />，室温为 <Latex tex="20\ ^{\circ}\mathrm{C}" />，大气压为标准大气压。当罐内空气变为室温时，空气对皮肤的压力大概有多大？（罐口直径约 <Latex tex="5\ \text{cm}" />，不计皮肤的体积变化。）

</template>

<div class="gp-step" v-click="1">加热后 <Latex tex="T_1=353\ \text{K}" />，冷却后 <Latex tex="T_2=293\ \text{K}" />；体积不变：<Latex tex="\frac{p_1}{T_1}=\frac{p_2}{T_2}" />。</div>
<div class="gp-step" v-click="2">以 <Latex tex="p_1=p_0=1.013\times10^5\ \text{Pa}" />，得 <Latex tex="p_2=\frac{p_0T_2}{T_1}\approx8.4\times10^4\ \text{Pa}" />，<br />内外压强差 <Latex tex="\Delta p\approx1.7\times10^4\ \text{Pa}" />。</div>
<div class="gp-step" v-click="3">罐口面积 <Latex tex="S=\frac{\pi d^2}{4}\approx2.0\times10^{-3}\ \text{m}^2" />，压力 <Latex tex="F=\Delta pS\approx34\ \text{N}" />。</div>

---
layout: exercise-split
title: "练习：这个简易气温计的刻度均匀吗？"
clicks: 4
clickAnimation: none
class: ex-top
---

<template v-slot:stem>

向一个空铝罐中插入一根透明吸管，接口用蜡密封，吸管内引入一小段油柱。罐的容积为 <Latex tex="360\ \text{cm}^3" />，吸管横截面积为 <Latex tex="0.2\ \text{cm}^2" />，有效长度为 <Latex tex="20\ \text{cm}" />。温度为 <Latex tex="25\ ^{\circ}\mathrm{C}" /> 时，油柱离管口 <span class="gp-nw"><Latex tex="10\ \text{cm}" />。</span>若在吸管上标刻温度值，刻度是否均匀？试估算这个气温计的测量范围。

</template>

<div class="gp-step" v-click="1"><Latex tex="T_1=298\ \text{K}" /> 时，封闭气体体积 <Latex tex="V_1=360+(20-10)\times0.2=362\ \text{cm}^3" />。</div>
<div class="gp-step" v-click="2">等压变化：<Latex tex="V\propto T" />；油柱移动距离 <Latex tex="\Delta h=\frac{\Delta V}{S}\propto\Delta T" />，所以刻度<strong>均匀</strong>。</div>
<div class="gp-step" v-click="3">油柱到管口：<Latex tex="V_2=360+20\times0.2=364\ \text{cm}^3" />，<Latex tex="T_2=298\times\frac{364}{362}\approx299.6\ \text{K}\approx26.5\ ^{\circ}\mathrm{C}" />。</div>
<div class="gp-step" v-click="4">油柱到罐口：<Latex tex="V_3=360\ \text{cm}^3" />，<Latex tex="T_3=298\times\frac{360}{362}\approx296.4\ \text{K}\approx23.2\ ^{\circ}\mathrm{C}" />。测量范围约 <Latex tex="23.2\sim26.5\ ^{\circ}\mathrm{C}" />。</div>

---
layout: exercise-split
title: "练习：怎样测不规则容器的容积？"
clicks: 3
clickAnimation: none
class: ex-top
---

<template v-slot:stem>

一个容器内部形状不规则。在容器上插入一根两端开口的玻璃管，接口用蜡密封；管内一段静止的水银柱封闭着长度为 <Latex tex="l_1" /> 的空气柱，此时外界温度为 <Latex tex="T_1" />。把容器浸入温度为 <Latex tex="T_2" /> 的热水中，水银柱静止时下方空气柱长度变为 <Latex tex="l_2" />。大气压不变，求容器的容积 <Latex tex="V_0" />。

</template>

<div class="gp-step" v-click="1">水银柱静止，封闭气体压强等于大气压，是<strong>等压变化</strong>；<Latex tex="V_1=V_0+l_1S" />，<Latex tex="V_2=V_0+l_2S" />。</div>
<div class="gp-step" v-click="2">由 <Latex tex="\frac{V_1}{T_1}=\frac{V_2}{T_2}" />，得 <Latex tex="\frac{V_0+l_1S}{T_1}=\frac{V_0+l_2S}{T_2}" />。</div>
<div class="gp-step" v-click="3">解得 <Latex tex="V_0=\frac{S(T_1l_2-T_2l_1)}{T_2-T_1}" />。</div>

---
title: "这一节：哪些量不变，另外两个量怎样变？"
clicks: 1
clickAnimation: none
---

# 这一节：哪些量不变，另外两个量怎样变？

<div class="page-grow page-grow-tight">
<table class="data-table gp-table">
<thead>
<tr><th>过程</th><th>不变量</th><th>规律</th><th>公式</th><th>图像</th></tr>
</thead>
<tbody>
<tr><td>等温变化</td><td>温度 <Latex tex="T" /></td><td>玻意耳定律</td><td><Latex tex="pV=C" /></td><td><Latex tex="p" />-<Latex tex="V" /> 双曲线</td></tr>
<tr><td>等压变化</td><td>压强 <Latex tex="p" /></td><td>盖-吕萨克定律</td><td><Latex tex="\frac{V}{T}=C" /></td><td><Latex tex="V" />-<Latex tex="T" /> 过原点直线</td></tr>
<tr><td>等容变化</td><td>体积 <Latex tex="V" /></td><td>查理定律</td><td><Latex tex="\frac{p}{T}=C" /></td><td><Latex tex="p" />-<Latex tex="T" /> 过原点直线</td></tr>
<tr><td>状态变化</td><td>—</td><td>理想气体状态方程</td><td><Latex tex="\frac{pV}{T}=C" /></td><td>—</td></tr>
</tbody>
</table>
<div class="summary-line" v-click="1">三个实验定律都是状态方程在某个量不变时的特例。</div>
<div class="mini-note" v-click="1">下一节：<strong>2.4 固体</strong>——晶体与非晶体。</div>
</div>
