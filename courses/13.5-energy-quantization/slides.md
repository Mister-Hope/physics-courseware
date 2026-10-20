---
theme: default
title: "能量量子化"
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
chapter-no: "13.5"
chapter: "第十三章 电磁感应与电磁波初步"
subtitle: "从热辐射到能量子：能量是一份一份的"
---

<CoverDecorationSvg />

---
layout: base-flex
title: "铁块为什么由暗红变到黄白"
clicks: 2
---

<div class="page-grow">

<div class="ask">把铁块投进火炉：刚开始只是发热，并不发光；温度升高后，铁块慢慢变红、开始发光，依次呈现暗红、赤红、橘红，直至黄白色。为什么会有这样的变化？</div>

<div class="figure" v-click="1"><IronColorSwatches /></div>

<div class="info-hint" v-click="2">发热与发光是两个阶段：温度不够高时，热辐射里几乎没有可见光。</div>

</div>

---
layout: base-flex
clicks: 2
---

# 热辐射

<div class="page-grow">

<div class="ask">一切物体都在向外辐射电磁波，为什么我们平时看不见？</div>

<DefinitionBox v-click="1" term="热辐射" tone="gold">我们周围的一切物体都在辐射电磁波，这种辐射与物体的温度有关，叫作<span class="def-term">热辐射</span>。物体在室温时，热辐射的主要成分是波长较长的电磁波，不能引起人的视觉。</DefinitionBox>

<div class="tip-hint" v-click="2">温度升高时，热辐射中波长较短的成分越来越强。铁块温度足够高时才有可见光，于是我们看到它发光。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 黑体

<div class="page-grow">

<div class="ask">一切物体都在辐射，也都在反射外界的电磁波——研究热辐射时，为什么要挑黑体？</div>

<div v-click="1">物体表面还会吸收和反射外界射来的电磁波。常温下我们看到的不发光物体的颜色，就是反射光所致。</div>

<DefinitionBox v-click="2" term="黑体" tone="blue">如果某种物体能够完全吸收入射的各种波长的电磁波而不发生反射，这种物体就叫作<span class="def-term">黑体</span>。黑体虽然不反射电磁波，但是却可以向外辐射电磁波。</DefinitionBox>

<div class="tip-hint" v-click="3">黑体辐射电磁波的强度按波长的分布只与它的温度有关——所以研究热辐射的规律时，人们特别注意对黑体辐射的研究。</div>

</div>

---
layout: base-flex
clicks: 4
---

# 黑体辐射的强度分布

<div class="page-grow">

<div class="ask">黑体辐射的强度怎样按波长分布？温度改变时，这条分布曲线怎样变？</div>

<div class="figure" v-click="1" style="max-width: 820px; margin-inline: auto"><BlackbodySpectrum :step="$clicks" /></div>

<div class="tip-hint" v-click="4">温度升高，各波长的辐射强度都增大，峰值向短波一侧移动——短波成分越来越强。同样的道理，铁块温度越高，发出的光里短波成分越多，颜色就由暗红变到黄白。</div>

</div>

---
layout: focus-question
title: "经典理论遇到的困难"
clicks: 2
---

<template v-slot:icon>

<mdi-help-circle-outline />

</template>

用经典的电磁理论，能解释黑体辐射的实验规律吗？

<template v-slot:hint>

经典理论的思路：物体中的带电微粒不停振动，产生变化的电磁场，从而发出电磁辐射。

</template>

<template v-slot:answer>

按这套经典理论算出的结果，与实验规律严重不符——微观世界的某些规律，在我们宏观世界看来可能非常奇怪。

</template>

---
layout: base-flex
clicks: 3
---

# 能量子

<div class="page-grow">

<div class="ask">要得到与实验相符的黑体辐射公式，普朗克作出了什么假设？</div>

<DefinitionBox v-click="1" term="能量子" tone="gold">1900 年底，普朗克作出大胆假设：振动着的带电微粒的能量只能是某一最小能量值 <Latex tex="\varepsilon" /> 的整数倍——可能是 <Latex tex="\varepsilon" />、<Latex tex="2\varepsilon" />、<Latex tex="3\varepsilon" />…… 这个不可再分的最小能量值叫作<span class="def-term">能量子</span>。</DefinitionBox>

<div v-click="2">借助于能量子的假说，普朗克得出了黑体辐射的强度按波长分布的公式，与实验符合得非常好。</div>

<div class="info-hint" v-click="3">这个假设与经典物理的观念冲突太大——连普朗克本人都很犹豫，当时的多数物理学家更难接受。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 能量子的大小

<div class="page-grow">

<div class="ask">这份最小的能量有多大？由什么决定？</div>

<div v-click="1"><Latex tex="\varepsilon = h\nu" display /><div><Latex tex="\nu" /> 是电磁波的频率。</div></div>

<div v-click="2"><Latex tex="h" /> 是一个常量，后人称之为普朗克常量：<Latex tex="h = 6.626\ 070\ 15 \times 10^{-34}\ \text{J}\cdot\text{s}" />。</div>

<div class="tip-hint" v-click="3">频率越高，能量子越大。</div>

</div>

---
layout: base-flex
clicks: 2
---

# 不同频率的光的能量子

<div class="page-grow">

<div class="ask">红光和紫光的能量子，哪个大？</div>

<div class="figure" v-click="1" style="max-width: 840px; margin-inline: auto"><PhotonEnergyLab /></div>

<div class="tip-hint" v-click="2">频率越高（波长越短），能量子 <Latex tex="h\nu" /> 越大——紫光的一份比红光的大。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 连续与分立

<div class="page-grow">

<div class="ask">能量的变化是连续的——这句话对微观粒子还成立吗？</div>

<div class="figure"><EnergyContinuumSvg :step="$clicks" /></div>

<div class="tip-hint" v-click="3">普朗克的假设认为微观粒子的能量是量子化的：不连续、分立。</div>

</div>

---
layout: base-flex
clicks: 2
---

# 光子

<div class="page-grow">

<div class="ask">普朗克说的是振动着的带电微粒的能量——那光本身呢？</div>

<DefinitionBox v-click="1" term="光子" tone="blue">爱因斯坦把能量子假设进行了推广：电磁场本身就是不连续的，光本身就是由一个个不可分割的能量子组成的；频率为 <Latex tex="\nu" /> 的光的能量子为 <Latex tex="h\nu" />。这些能量子后来被叫作<span class="def-term">光子</span>。</DefinitionBox>

<div v-click="2">一束光的能量是一份一份累加的：<Latex tex="E = N h\nu" />（<Latex tex="N" /> 为光子数）。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 能级

<div class="page-grow">

<div class="ask">原子由带电微粒组成——它的能量也是分立的吗？</div>

<div class="split-wide">

<div class="figure" v-click="2"><EnergyLevelDiagram :step="$clicks - 1" /></div>

<div class="stack">

<DefinitionBox v-click="1" term="能级" tone="gold">微观世界中能量取分立值的观念也适用于原子系统：原子的能量是量子化的，这些量子化的能量值叫作<span class="def-term">能级</span>。</DefinitionBox>

<div v-click="3">通常情况下，原子处于能量最低的状态，这是最稳定的。</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 3
---

# 能级跃迁

<div class="page-grow">

<div class="ask">原子怎样到较高的能量状态，又怎样回到低能级？</div>

<div class="split-wide">

<div class="figure" v-click="1"><EnergyLevelDiagram :step="$clicks + 2" /></div>

<div class="stack">

<div v-click="1">原子受到高速运动的电子撞击，跃迁到较高的能量状态。</div>

<div v-click="2">这些状态的原子不稳定，会自发地向能量较低的能级跃迁，放出光子。</div>

<div v-click="3"><Latex tex="h\nu = E_{\text{高}} - E_{\text{低}}" display /><div class="tip-hint">放出的光子的能量，等于前后两个能级之差。</div></div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 3
---

# 发射光谱

<div class="page-grow">

<div class="ask">能级是分立的，原子发出的光在光谱上会是什么样子？</div>

<div class="figure" v-click="1"><EmissionSpectrumSvg :step="$clicks" /></div>

<div class="tip-hint" v-click="3">由于原子的能级是分立的，放出的光子的能量也是分立的，因此原子的发射光谱只有一些分立的亮线。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 科学漫步：「聆听」宇宙

<div class="page-grow">

<div class="ask">只用可见光看宇宙，够不够？</div>

<div class="split-wide" style="--cols: minmax(0, 1.05fr) minmax(0, 1fr)">

<div class="figure" v-click="2"><SpaceRadioSvg /></div>

<div class="stack">

<div v-click="1">可见光观测有局限：天体的辐射覆盖整个电磁波段。</div>

<div v-click="2">无线电波能穿透星际尘埃，射电望远镜因此能观测更遥远的宇宙。</div>

<div v-click="3" class="stack stack-tight" style="font-size: 0.92rem">

<div><mdi-radio class="text-lg" /> 宇宙微波背景辐射（<Latex tex="2.725\ \text{K}" /> 的黑体辐射）</div>

<div><mdi-sine-wave class="text-lg" /> 中性氢的 <Latex tex="21\ \text{cm}" /> 谱线</div>

<div><mdi-pulse class="text-lg" /> 脉冲星：高速旋转的中子星</div>

</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 4
---

# 中国天眼：FAST

<div class="page-grow">

<div class="split-wide">

<div class="figure"><FastDishSvg :step="$clicks" /></div>

<div class="stack stack-tight">

<div v-click="1">射电望远镜没有镜筒，也没有物镜、目镜——它由天线和接收系统组成。</div>

<div v-click="2">口径 <Latex tex="500\ \text{m}" />，世界最大的单口径球面射电望远镜，2016 年 9 月 25 日在贵州落成启用。</div>

<div v-click="3">与德国波恩 <Latex tex="100\ \text{m}" /> 望远镜相比，灵敏度提高约 10 倍；与 Arecibo <Latex tex="300\ \text{m}" /> 望远镜相比，综合性能提高约 10 倍。</div>

<div v-click="4">把中性氢观测延伸到宇宙边缘，发现更多脉冲星，提高深空通信速率，搜寻地外文明信号。</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 5
---

# 课堂小结

<div class="page-grow">

<v-clicks>

<div class="summary-line"><span class="text-accent">热辐射</span>：一切物体都在辐射电磁波，与温度有关；温度升高，短波成分越来越强。</div>

<div class="summary-line"><span class="text-accent">黑体</span>：完全吸收入射电磁波而不反射，但仍向外辐射；黑体辐射的强度分布只与温度有关。</div>

<div class="summary-line"><span class="text-accent">能量子</span>：<Latex tex="\varepsilon = h\nu" />，<Latex tex="h = 6.626\ 070\ 15\times 10^{-34}\ \text{J}\cdot\text{s}" />；微观粒子的能量是量子化的（不连续、分立）。</div>

<div class="summary-line"><span class="text-accent">光子与能级</span>：光由光子组成，每个光子能量 <Latex tex="h\nu" />；原子能级分立，跃迁时 <span style="white-space: nowrap"><Latex tex="h\nu = E_{\text{高}} - E_{\text{低}}" /></span>，发射光谱只有分立亮线。</div>

<div class="summary-line"><span class="text-accent">量子力学</span>：核能、计算机与智能手机的制造、激光技术都离不开它。</div>

</v-clicks>

</div>

---
layout: base-flex
title: "练习：能量子的频率与波长"
clicks: 3
---

<div class="page-grow page-around">

<div>对应于 <Latex tex="7.4\times 10^{-19}\ \text{J}" /> 的能量子，其电磁辐射的频率和波长各是多少？</div>

<div v-click="1"><Latex tex="\nu = \dfrac{\varepsilon}{h} = \dfrac{7.4\times 10^{-19}}{6.626\times 10^{-34}}\ \text{Hz} \approx 1.1\times 10^{15}\ \text{Hz}" display /></div>

<div v-click="2"><Latex tex="\lambda = \dfrac{c}{\nu} = \dfrac{3.0\times 10^{8}}{1.1\times 10^{15}}\ \text{m} \approx 2.7\times 10^{-7}\ \text{m}" display /></div>

<div class="tip-hint" v-click="3">波长约 <Latex tex="270\ \text{nm}" />，小于可见光短波端，属于紫外线。</div>

</div>

---
layout: exercise-split
title: "练习：哪种恒星表面温度更高"
clicks: 2
---

<template v-slot:stem>

晴朗的夜空繁星闪烁，有的恒星颜色偏红，有的恒星颜色偏蓝。对于红星和蓝星，你能判断出哪种恒星的表面温度更高吗？说出你的道理。

</template>

<template v-slot:fig>

<StarPairSvg />

</template>

<div v-click="1">恒星越热，热辐射中短波成分越强，颜色越偏蓝——所以蓝星的表面温度更高。</div>

<div class="tip-hint" v-click="2">这与黑体辐射的规律一致：温度升高，辐射中短波成分越来越强。</div>
