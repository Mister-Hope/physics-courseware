---
theme: default
title: "普朗克黑体辐射理论"
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
chapter-no: "4.1"
chapter: "第四章 原子结构和波粒二象性"
subtitle: "热辐射 · 黑体辐射规律 · 能量子"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 铁块加热后，颜色为什么变了？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask-lead">把铁块放进炉火中加热，它会先变暗红、再变橙黄；<br />温度更高时，甚至发出白光。</div>
<div class="ask">颜色变化的背后，辐射中的什么发生了变化？</div>
<div class="tip-hint" v-click="1">我们看到的颜色，由辐射中较强的波段决定：红光波长较长，蓝紫光波长较短。</div>
<div class="tip-hint" v-click="2">温度越高，辐射较强的部分越向短波方向移动——这正是黑体辐射要研究的问题。</div>
</div>

---
layout: base-flex
title: 一切物体都在向外辐射电磁波
clicks: 2
clickAnimation: none
---

# 一切物体都在向外辐射电磁波

<div class="page-grow">
<div class="ask">冬天靠近火炉，不接触也能感到热，热是怎样传过来的？</div>
<div class="pk-point"><strong>热辐射</strong>：物体中的带电微粒不停运动，向外辐射电磁波。</div>
<div class="pk-point" v-click="1"><strong>温度越高</strong>，热辐射越强。</div>
<div class="pk-point" v-click="2">一般物体辐射电磁波的情况，还与<strong>材料种类、表面状况</strong>有关。</div>
</div>

---
layout: base-flex
title: 什么样的物体可以看作黑体？
clicks: 2
clickAnimation: none
---

# 什么样的物体可以看作黑体？

<div class="page-grow">
<div class="pk-split">
<div class="pk-fig"><BlackbodyCavitySvg :step="$clicks" /></div>
<div class="stack">
<div class="pk-point"><strong>绝对黑体</strong>：能完全吸收入射的各种波长的电磁波，而不发生反射。</div>
<div class="pk-point" v-click="1"><strong>空腔小孔</strong>：电磁波进入小孔后，在腔内多次反射、吸收，几乎不能射出——这个带小孔的空腔可近似为黑体。</div>
<div class="pk-point" v-click="2">黑体不反射，但仍向外辐射，这就是<strong>黑体辐射</strong>；它的强度按波长的分布只与温度有关。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 黑体辐射的强度怎样随波长分布？
clicks: 2
clickAnimation: none
---

# 黑体辐射的强度怎样随波长分布？

<div class="page-grow">
<div class="pk-split">
<div class="pk-fig">
<CoordAxes
  :x-range="[0, 2.2]"
  :y-range="[0, 0.3]"
  :x-axis="{ quantity: 'λ', unit: 'μm' }"
  :y-axis="{ quantity: 'I' }"
  :curves="[{ formula: (x) => x > 0 ? 1 / (x ** 5 * (Math.exp(1.4388e4 / (x * 5000)) - 1)) : 0, color: 'var(--c-accent)', width: 2.8 }]"
  :labels="[{ x: 0.58, y: 0.102, dot: true, dotColor: 'var(--c-accent)', showAt: 1 }, { x: 0.64, y: 0.116, text: '峰值', anchor: 'start', showAt: 1 }]"
  :step="$clicks"
  :view="{ width: 520, height: 340 }"
/>
</div>
<div class="stack">
<div class="pk-point">各波长的辐射强度不同：曲线先升高，后降低。</div>
<div class="pk-point" v-click="1">曲线的<strong>峰值</strong>，对应辐射最强时的波长。</div>
<div class="pk-point" v-click="2">黑体辐射的强度按波长的分布，<strong>只与温度有关</strong>，<br />与材料种类、表面状况无关。</div>
<div class="mini-note">纵轴为辐射强度（相对值）；曲线取 <Latex tex="T=5000\ \text{K}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 温度升高，曲线怎样变化？
clicks: 1
clickAnimation: none
---

# 温度升高，曲线怎样变化？

<div class="page-grow">
<PlanckCurveExplorer />
<div class="summary-line" v-click="1">温度升高：各波长的辐射强度都增大，峰值向短波方向移动。</div>
</div>

---
layout: base-flex
title: 经典理论能解释这些曲线吗？
clicks: 2
clickAnimation: none
---

# 经典理论能解释这些曲线吗？

<div class="page-grow">
<div class="pk-cards pk-two">
<div class="pk-card">
<div class="pk-card-title">维恩公式（1896）</div>
<p>短波区与实验非常接近，长波区与实验偏离较大。</p>
</div>
<div class="pk-card">
<div class="pk-card-title">瑞利公式（1900）</div>
<p>长波区与实验基本一致，短波区与实验严重不符。</p>
</div>
</div>
<div class="mini-note">维恩公式是经验公式；瑞利公式从经典电磁理论推出。</div>
<div class="pk-point" v-click="1">两个公式都只能解释一部分实验现象，<br />没有一个能从经典理论完整推出实验曲线。</div>
<div class="tip-hint" v-click="2">问题集中出现在短波区——这里成了经典理论的“灾难”。</div>
</div>

---
layout: base-flex
title: 短波区为什么成了经典理论的“灾难”？
clicks: 2
clickAnimation: none
---

# 短波区为什么成了经典理论的“灾难”？

<div class="page-grow">
<div class="pk-split">
<div class="pk-fig">
<CoordAxes
  :x-range="[0, 2.2]"
  :y-range="[0, 0.3]"
  :x-axis="{ quantity: 'λ', unit: 'μm' }"
  :y-axis="{ quantity: 'I' }"
  :curves="[{ formula: (x) => x > 0 ? 1 / (x ** 5 * (Math.exp(1.4388e4 / (x * 5000)) - 1)) : 0, color: 'var(--c-accent)', width: 2.6 }, { formula: (x) => x > 0 ? Math.min(0.1555 / x ** 4, 0.32) : 0, color: 'var(--c-velocity)', width: 2.2, dashed: true, showAt: 1 }]"
  :labels="[{ x: 2.05, y: 0.05, text: '实验曲线', anchor: 'end' }, { x: 0.98, y: 0.25, text: '经典理论（瑞利）', anchor: 'start', color: 'var(--c-velocity)', showAt: 1 }]"
  :step="$clicks"
  :view="{ width: 520, height: 340 }"
/>
</div>
<div class="stack">
<div class="pk-point">按经典理论，短波区的辐射强度<br />会<strong>趋于无穷大</strong>。</div>
<div class="pk-point" v-click="1">实验曲线却在短波区趋于 0，<br />二者严重不符。</div>
<div class="tip-hint" v-click="2">经典理论在短波区失效，这一困难被称为“紫外灾难”。</div>
<div class="mini-note">两条曲线在长波端取相同值，便于比较；<br />实验曲线取 <Latex tex="T=5000\ \text{K}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 普朗克提出了什么假设？
clicks: 2
clickAnimation: none
---

# 普朗克提出了什么假设？

<div class="page-grow">
<div class="ask">1900 年底，普朗克怎样才能推出与实验完全吻合的公式？</div>
<div class="pk-point">必须假定：组成黑体的振动着的带电微粒，能量只能是某一最小能量值 <Latex tex="\varepsilon" /> 的整数倍。</div>
<div class="pk-point" v-click="1">例如：<Latex tex="\varepsilon" />、<Latex tex="2\varepsilon" />、<Latex tex="3\varepsilon" />……这个不可再分的最小能量值 <Latex tex="\varepsilon" />，叫作<strong>能量子</strong>。</div>
<div class="tip-hint" v-click="2">按这个假设推出的公式，与实验曲线吻合得非常完美。</div>
</div>

---
layout: base-flex
title: 能量子的能量由什么决定？
clicks: 2
clickAnimation: none
---

# 能量子的能量由什么决定？

<div class="page-grow">
<div class="pk-formula-big"><Latex tex="\varepsilon=h\nu" display /></div>
<div class="pk-point"><Latex tex="\nu" /> 是带电微粒的振动频率，也是它吸收或辐射电磁波的频率。</div>
<div class="pk-point" v-click="1"><Latex tex="h" /> 是普朗克常量：<Latex tex="h=6.626\ 070\ 15\times10^{-34}\ \text{J}\cdot\text{s}" />。</div>
<div class="pk-point" v-click="2">因为 <Latex tex="h" /> 很小，宏观物体一份一份的能量差别小到无法察觉。</div>
</div>

---
layout: base-flex
title: 微观能量是分立的，宏观为什么感觉不到？
clicks: 2
clickAnimation: none
---

# 微观能量是分立的，宏观为什么感觉不到？

<div class="page-grow">
<div class="pk-split">
<div class="pk-fig"><EnergyLevelsSvg /></div>
<div class="stack">
<div class="pk-point">微观：振动带电微粒的能量<br />只能取 <Latex tex="\varepsilon" /> 的整数倍，是<strong>分立</strong>的。</div>
<div class="pk-point" v-click="1">宏观：弹簧振子的能量可以连续改变，取任意值。</div>
<div class="pk-point" v-click="2">普朗克常量 <Latex tex="h" /> 极小，宏观世界里的“一份”小到无法分辨。</div>
</div>
</div>
</div>

---
layout: exercise-split
title: 例题：可见光的能量子有多大？
clicks: 3
clickAnimation: none
class: ex-top
analysisLabel: 解答
---

<template v-slot:stem>

可见光波长的大致范围是 <Latex tex="400\sim 760\ \text{nm}" />。<br />求 <Latex tex="400\ \text{nm}" /> 和 <Latex tex="760\ \text{nm}" /> 的电磁辐射的能量子 <Latex tex="\varepsilon" />。

</template>

<div class="pk-point">由 <Latex tex="\varepsilon=h\nu=\frac{hc}{\lambda}" /> 计算，取 <Latex tex="h=6.63\times10^{-34}\ \text{J}\cdot\text{s}" />，<Latex tex="c=3.00\times10^{8}\ \text{m/s}" />。</div>
<div class="pk-point" v-click="1"><Latex tex="400\ \text{nm}" />：<Latex tex="\varepsilon=\frac{6.63\times10^{-34}\times3.00\times10^{8}}{400\times10^{-9}}\ \text{J}\approx4.97\times10^{-19}\ \text{J}" />，约 <Latex tex="3.1\ \text{eV}" />。</div>
<div class="pk-point" v-click="2"><Latex tex="760\ \text{nm}" />：<Latex tex="\varepsilon=\frac{6.63\times10^{-34}\times3.00\times10^{8}}{760\times10^{-9}}\ \text{J}\approx2.62\times10^{-19}\ \text{J}" />，约 <Latex tex="1.6\ \text{eV}" />。</div>
<div class="summary-line" v-click="3">波长越短，能量子的能量越大。</div>

---
layout: exercise-split
title: 练习：开水的温度为什么连续降低？
clicks: 2
clickAnimation: none
class: ex-top
analysisLabel: 解答
---

<template v-slot:stem>

一杯开水的温度会逐渐降低。根据能量量子化理论，开水的能量是一份一份向外辐射的，为什么它的温度不是一段一段地降低？

</template>

<div class="pk-point">一杯水由大量分子组成，每个能量子 <Latex tex="\varepsilon=h\nu" /> 都极小（红外辐射约 <Latex tex="10^{-20}\ \text{J}" /> 量级）。</div>
<div class="pk-point" v-click="1">向外辐射的份数极大，每份又极小，宏观上温度的变化就是连续的。</div>
<div class="summary-line" v-click="2">量子化是微观规律；宏观现象中，能量子的“台阶”小到可以看成连续。</div>

---
layout: base-flex
title: 这一节：普朗克怎样迈出量子论的第一步？
clicks: 1
clickAnimation: none
---

# 这一节：普朗克怎样迈出量子论的第一步？

<div class="page-grow">
<div class="pk-flow">
<div class="pk-flow-node"><b>现象</b>热辐射</div>
<div class="pk-flow-node"><b>模型</b>黑体</div>
<div class="pk-flow-node"><b>规律</b>强度分布</div>
<div class="pk-flow-node"><b>困难</b>经典理论失效</div>
<div class="pk-flow-node"><b>突破</b>能量子 <Latex tex="\varepsilon=h\nu" /></div>
</div>
<div class="summary-line" v-click="1">能量量子化第一次揭开了微观世界与宏观世界不同的一角。</div>
</div>

---
layout: base-flex
title: 科学漫步：普朗克
clicks: 1
clickAnimation: none
---

# 科学漫步：普朗克

<div class="page-grow">
<div class="pk-timeline">
<div class="pk-timeline-item">
<span class="pk-timeline-year">1858</span>
<span class="pk-timeline-text">生于德国基尔，大学时选择物理作为专业。</span>
</div>
<div class="pk-timeline-item">
<span class="pk-timeline-year">1900</span>
<span class="pk-timeline-text">提出能量子假说，创立黑体辐射理论。</span>
</div>
<div class="pk-timeline-item">
<span class="pk-timeline-year">1918</span>
<span class="pk-timeline-text">因能量量子化的工作获诺贝尔物理学奖。</span>
</div>
</div>
<div class="tip-hint" v-click="1">普朗克常量 <Latex tex="h" /> 以他的名字命名；他迈出的这一步，开启了量子论。</div>
</div>

---
layout: base-flex
title: 下一节：光电效应
clicks: 0
clickAnimation: none
---

# 下一节：光电效应

<div class="page-grow">
<div class="ask-lead">如果能量是一份一份的，那么光本身是不是也一份一份的？</div>
<div class="pk-point">下一节将从光电效应实验出发，研究光的粒子性。</div>
</div>
