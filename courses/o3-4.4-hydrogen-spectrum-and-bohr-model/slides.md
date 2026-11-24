---
theme: default
title: 氢原子光谱和玻尔的原子模型
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
chapter-no: '4.4'
chapter: 第四章 原子结构和波粒二象性
subtitle: 线状谱 · 玻尔的原子模型
---

<CoverDecorationSvg />

---
layout: focus-question
title: 食盐灼烧为什么发黄光？
clicks: 2
clickAnimation: none
---

<template v-slot:icon>
<mdi-fire />
</template>
把食盐放在火中灼烧，会发出黄色的光。为什么只发黄光，而不发其他颜色的光？
<template v-slot:hint>
原子的发光，与原子的内部结构有关。
</template>
<template v-slot:answer>
食盐中的钠原子受热被激发，跃迁时只发出几种特定频率的光，其中黄光最明显。这正是<strong>原子光谱</strong>要研究的问题。
</template>

---
layout: base-flex
title: 连续谱和线状谱，区别在哪里？
clicks: 2
clickAnimation: none
---

# 连续谱和线状谱，区别在哪里？

<div class="page-grow">
<div class="figure">
<SpectrumTypesSvg />
</div>
<div class="hs-point" v-click="1">白炽灯发出<strong>连续谱</strong>：各种波长的光都有，谱带上没有暗缝。</div>
<div class="hs-point" v-click="2">氢、钠这类气体原子只发出几条特定波长的光，在谱带上留下分立的亮线——<strong>线状谱</strong>。不同原子的亮线位置不同。</div>
</div>

---
layout: base-flex
title: 氢原子光谱在可见光区是什么样子？
clicks: 1
clickAnimation: none
---

# 氢原子光谱在可见光区是什么样子？

<div class="page-grow">
<div class="ask">这四条谱线的位置，为什么与氢气怎样被激发无关？</div>
<BalmerSpectrum />
<div class="hs-point" v-click="1">无论用哪种方式让氢气发光，四条谱线的位置都不变——它们由<strong>氢原子本身</strong>决定。</div>
</div>

---
layout: base-flex
title: 四条谱线的波长有什么规律？
clicks: 3
clickAnimation: none
---

# 四条谱线的波长有什么规律？

<div class="page-grow">
<div v-click="1">
<table class="data-table hs-table">
<thead><tr><th>谱线</th><th><Latex tex="n" /></th><th><Latex tex="\lambda/\text{nm}" /></th><th><Latex tex="(1/\lambda)/(10^{6}\ \text{m}^{-1})" /></th></tr></thead>
<tbody>
<tr class="hl"><td>Hα</td><td>3</td><td>656.3</td><td>1.524</td></tr>
<tr><td>Hβ</td><td>4</td><td>486.1</td><td>2.057</td></tr>
<tr><td>Hγ</td><td>5</td><td>434.0</td><td>2.304</td></tr>
<tr><td>Hδ</td><td>6</td><td>410.2</td><td>2.438</td></tr>
</tbody>
</table>
</div>
<div class="hs-formula text-2xl" v-click="2"><Latex tex="\frac{1}{\lambda}=R_\infty\left(\frac{1}{2^2}-\frac{1}{n^2}\right),\quad n=3,4,5,\ldots" display /></div>
<div class="hs-point" v-click="3">1885 年，巴耳末从这四条谱线里找到了这个关系式，<Latex tex="R_\infty=1.10\times10^{7}\ \text{m}^{-1}" /> 由实验测定；它确定的这组谱线叫<strong>巴耳末系</strong>。</div>
</div>

---
layout: base-flex
title: 经典理论能解释原子光谱吗？
clicks: 3
clickAnimation: none
---

# 经典理论能解释原子光谱吗？

<div class="page-grow page-grow-tight">
<div class="half-grid hs-grid-top">
<div class="stack">
<div class="mini-title"><mdi-atom /> 按经典理论推算</div>
<div class="hs-point">电子绕核转动是加速运动，应当不断向外辐射电磁波。</div>
<div class="hs-point">辐射带走能量，轨道半径不断减小，电子最后<strong>坠落到核上</strong>。</div>
<div class="hs-point">辐射频率等于电子的转动频率；半径连续变化，频率也连续变化。</div>
</div>
<div class="stack" v-click="1">
<div class="mini-title"><mdi-telescope /> 实验看到的事实</div>
<div class="hs-point">原子很<strong>稳定</strong>，电子并没有坠入核内。</div>
<div class="hs-point">原子光谱是<strong>分立的线状谱</strong>，不是连续谱。</div>
</div>
</div>
<div class="warn-hint" v-click="2">两条预言都与事实矛盾：原子应当不稳定，光谱应当是连续谱。</div>
<div class="summary-line" v-click="3">经典电磁理论解释不了原子世界，需要新的观念。</div>
</div>

---
layout: base-flex
title: 玻尔怎样处理“原子不稳定”这个矛盾？
clicks: 3
clickAnimation: none
---

# 玻尔怎样处理“原子不稳定”这个矛盾？

<div class="page-grow page-grow-tight">
<div class="tip-hint" v-click="1">电子的轨道半径<strong>不能取任意值</strong>，只有满足一定条件的轨道才可能存在；在这些轨道上运动时，原子稳定，<strong>不辐射电磁波</strong>。</div>
<div class="hs-orbits" v-click="2">
<div class="hs-orbit"><span class="mini-note">n = 1</span><span class="hs-orbit-r">0.053 nm</span></div>
<div class="hs-orbit"><span class="mini-note">n = 2</span><span class="hs-orbit-r">0.212 nm</span></div>
<div class="hs-orbit"><span class="mini-note">n = 3</span><span class="hs-orbit-r">0.477 nm</span></div>
</div>
<div class="hs-point" v-click="2">可能的半径是 <Latex tex="n^2\times0.053\ \text{nm}" />，不能取中间值——<strong>轨道量子化</strong>。</div>
<DefinitionBox term="定态" tone="gold" v-click="3">
<div>具有确定能量的稳定状态。能量最低的定态叫<span class="def-term">基态</span>，其余叫<span class="def-term">激发态</span>；不同定态对应不同的<strong>能级</strong>。</div>
</DefinitionBox>
</div>

---
layout: base-flex
title: 电子跃迁时，光子的能量由什么决定？
clicks: 4
clickAnimation: none
---

# 电子跃迁时，光子的能量由什么决定？

<div class="page-grow">
<div class="ask">电子从高能级跳到低能级，少掉的那部分能量去了哪里？</div>
<div class="hs-formula text-2xl" v-click="1"><Latex tex="h\nu=E_n-E_m\quad(m<n)" display /></div>
<div class="half-grid" v-click="2">
<div class="hs-point">从高能级 <Latex tex="E_n" /> 跃迁到低能级 <Latex tex="E_m" />：<strong>放出</strong>能量为 <Latex tex="h\nu" /> 的光子。</div>
<div class="hs-point">吸收能量为 <Latex tex="h\nu" /> 的光子：电子从低能级<strong>跃迁</strong>到高能级。</div>
</div>
<div class="hs-point" v-click="3">吸收时，光子能量必须<strong>恰好等于</strong>两个能级的能量差，原子才会吸收它。</div>
<div class="tip-hint" v-click="4">光子的频率由两个能级之间的<strong>能量差</strong>决定，与原子怎样被激发无关。</div>
</div>

---
layout: base-flex
title: 氢原子的能级是怎样排列的？
clicks: 4
clickAnimation: none
---

# 氢原子的能级是怎样排列的？

<div class="page-grow">
<div class="ask">把 <Latex tex="n=1,2,3,\ldots" /> 代入公式，氢原子的能量分别是多少？</div>
<div class="hs-formula text-2xl" v-click="1"><Latex tex="E_n=\frac{E_1}{n^2},\quad E_1=-13.6\ \text{eV}" display /></div>
<div class="hs-energies" v-click="2">
<div class="hs-energy"><span class="mini-note">n = 1</span><span>−13.60 eV</span></div>
<div class="hs-energy"><span class="mini-note">n = 2</span><span>−3.40 eV</span></div>
<div class="hs-energy"><span class="mini-note">n = 3</span><span>−1.51 eV</span></div>
<div class="hs-energy"><span class="mini-note">n = 4</span><span>−0.85 eV</span></div>
<div class="hs-energy"><span class="mini-note">n = 5</span><span>−0.54 eV</span></div>
<div class="hs-energy"><span class="mini-note">n = 6</span><span>−0.38 eV</span></div>
</div>
<div class="hs-point" v-click="3">能级越高，相邻能级的间距越小，能级越<strong>密集</strong>；<Latex tex="n\to\infty" /> 时 <Latex tex="E_n\to0" />。</div>
<div class="hs-point" v-click="4">基态能量最低。要使氢原子<strong>电离</strong>（电子脱离原子核），至少给它 <Latex tex="13.6\ \text{eV}" />。</div>
</div>

---
layout: base-flex
title: 巴耳末系对应哪些跃迁？
clicks: 1
clickAnimation: none
---

# 巴耳末系对应哪些跃迁？

<div class="page-grow">
<EnergyLevelSpectrumLink />
<div class="tip-hint" v-click="1">四条可见谱线的<strong>终态都是 <Latex tex="n=2" /> 的能级</strong>——巴耳末公式里的 2，就是终态量子数。</div>
</div>

---
layout: base-flex
title: 电子只能跃迁到 n = 2 吗？
clicks: 3
clickAnimation: none
---

# 电子只能跃迁到 <Latex tex="n=2" /> 吗？

<div class="page-grow">
<div class="ask">终态换成 <Latex tex="n=1" />、<Latex tex="n=3" />，会得到什么样的谱线？</div>
<div class="hs-formula text-2xl" v-click="1"><Latex tex="\frac{1}{\lambda}=R_\infty\left(\frac{1}{m^2}-\frac{1}{n^2}\right),\quad n>m" display /></div>
<div v-click="2">
<table class="data-table hs-table">
<thead><tr><th>谱线系</th><th>终态 <Latex tex="m" /></th><th>区域</th><th>跃迁</th></tr></thead>
<tbody>
<tr><td>赖曼系</td><td>1</td><td>紫外</td><td><Latex tex="n=2,3,4,\ldots\to1" /></td></tr>
<tr class="hl"><td>巴耳末系</td><td>2</td><td>可见光</td><td><Latex tex="n=3,4,5,\ldots\to2" /></td></tr>
<tr><td>帕邢系</td><td>3</td><td>红外</td><td><Latex tex="n=4,5,6,\ldots\to3" /></td></tr>
<tr><td>布喇开系</td><td>4</td><td>红外</td><td><Latex tex="n=5,6,7,\ldots\to4" /></td></tr>
</tbody>
</table>
</div>
<div class="hs-point" v-click="3">光谱里的每一族谱线，都对应电子向<strong>同一能级</strong>的跃迁。</div>
</div>

---
layout: base-flex
title: 原子怎样被激发到高能级？
clicks: 3
clickAnimation: none
---

# 原子怎样被激发到高能级？

<div class="page-grow">
<div class="ask">基态的氢原子，怎样才能让电子跳到 <Latex tex="n=3" />？</div>
<div class="hs-point" v-click="1">气体放电管中，高速电子与原子碰撞，把一部分动能交给原子，原子就跃迁到<strong>激发态</strong>。</div>
<div class="hs-point" v-click="2">激发态不稳定，原子自发跃迁回低能级（最终回基态），同时放出光子；可以一步回到基态，也可以经过中间能级分几步回去。</div>
<div class="tip-hint" v-click="3">霓虹灯、试电笔的氖管发光，都是气体原子被激发后自发跃迁的结果；食盐灼烧发黄光，是钠原子能级跃迁发出的<strong>特征谱线</strong>。</div>
</div>

---
layout: base-flex
title: 为什么光谱能鉴别物质？
clicks: 3
clickAnimation: none
---

# 为什么光谱能鉴别物质？

<div class="page-grow">
<div class="ask">氢和钠的线状谱位置不同，这能用来做什么？</div>
<div class="hs-point" v-click="1">不同元素的原子结构不同，能级差不同，发出的<strong>特征谱线</strong>（位置、条数）也不同。</div>
<div class="hs-point" v-click="2">每种元素都有自己的一组特征谱线——靠它鉴别物质，就是<strong>光谱分析</strong>。灵敏度极高，含量到 <Latex tex="10^{-13}\ \text{kg}" /> 也能检出。</div>
<div class="tip-hint" v-click="3">同一元素的吸收暗线与发射亮线位置一一对应。太阳光谱里的暗线，就是太阳大气中的原子吸收特定波长的光留下的；与已知谱线对照，就知道太阳大气含钠、镁、铜、锌、镍等元素。</div>
<div class="mini-note" v-click="3">我国郭守敬望远镜（LAMOST）已获得上千万条恒星光谱。</div>
</div>

---
layout: exercise-split
title: 例题：大量氢原子处在 n = 3 能级，能发出几种频率的光？
clicks: 5
clickAnimation: none
class: ex-top
analysisLabel: 解答
---

<template v-slot:stem>

大量氢原子处在 <Latex tex="n=3" /> 的激发态。它们能发出几种不同频率的光？其中波长最短的是哪两个能级之间的跃迁？

</template>

<div class="hs-point" v-click="1">所有可能的跃迁：<Latex tex="3\to2" />、<Latex tex="3\to1" />、<Latex tex="2\to1" />。</div>
<div class="hs-point" v-click="2">每一种跃迁对应一种频率，共 <strong>3 种</strong>。</div>
<div class="hs-point" v-click="3">波长最短 ⇔ 光子能量最大 ⇔ 能级差最大，是 <Latex tex="3\to1" /> 的跃迁。</div>
<div class="hs-point" v-click="4"><Latex tex="\Delta E=E_3-E_1=-1.51-\left(-13.60\right)=12.09\ \text{eV}" />，<Latex tex="\lambda=\frac{hc}{\Delta E}=\frac{1240}{12.09}\ \text{nm}\approx103\ \text{nm}" />。</div>
<div class="hs-point" v-click="5">这条谱线属于<strong>赖曼系</strong>，落在紫外区。</div>

---
layout: exercise-split
title: 例题：氢原子电离与巴耳末系
clicks: 3
clickAnimation: none
class: ex-top
analysisLabel: 解答
---

<template v-slot:stem>

处于 <Latex tex="n=2" /> 激发态的氢原子，至少要吸收多少能量才能电离？<br />用玻尔理论说明：巴耳末公式中 <Latex tex="n=5" /> 对应的谱线，是哪两个能级之间的跃迁？

</template>

<div class="hs-point" v-click="1">电离是电子从 <Latex tex="n=2" /> 到 <Latex tex="n\to\infty" />：<Latex tex="\Delta E=E_\infty-E_2=0-\left(-3.40\right)=3.40\ \text{eV}" />。</div>
<div class="hs-point" v-click="2"><Latex tex="n=5" /> 代入巴耳末公式，得到的是 <Latex tex="5\to2" /> 跃迁发出的谱线。</div>
<div class="hs-point" v-click="3"><Latex tex="\Delta E=E_5-E_2=-0.54-\left(-3.40\right)=2.86\ \text{eV}" />，<Latex tex="\lambda=\frac{1240}{2.86}\ \text{nm}\approx434\ \text{nm}" />。</div>

---
layout: base-flex
title: 玻尔理论能解释所有原子吗？
clicks: 2
clickAnimation: none
---

# 玻尔理论能解释所有原子吗？

<div class="page-grow">
<div class="ask">玻尔理论成功解释了氢光谱。换成氦原子，还行吗？</div>
<div class="half-grid">
<div class="stack">
<div class="mini-title">成功</div>
<div class="hs-point">第一次把量子观念引入原子，提出<strong>定态</strong>和<strong>跃迁</strong>，解释了氢原子的线状谱。</div>
</div>
<div class="stack" v-click="1">
<div class="mini-title">局限</div>
<div class="hs-point">氦原子这类稍复杂的原子就解释不了。</div>
<div class="hs-point">仍保留经典粒子观念，把电子看成沿确定轨道运动。</div>
</div>
</div>
<div class="tip-hint" v-click="2">量子力学中，电子没有确定的坐标；只能说某时刻在空间某点附近单位体积内出现的<strong>概率</strong>——这就是<strong>电子云</strong>。</div>
</div>

---
layout: base-flex
title: 这一节：怎样从光谱走到玻尔的原子模型？
clicks: 2
clickAnimation: none
---

# 这一节：怎样从光谱走到玻尔的原子模型？

<div class="page-grow">
<div class="hs-flow">
<div class="hs-flow-node"><b class="mini-note">现象</b>氢原子线状谱</div>
<div class="hs-flow-node"><b class="mini-note">规律</b>巴耳末公式</div>
<div class="hs-flow-node"><b class="mini-note">矛盾</b>经典理论失效</div>
<div class="hs-flow-node"><b class="mini-note">假说</b>定态与跃迁</div>
<div class="hs-flow-node"><b class="mini-note">解释</b>跃迁解释谱线</div>
</div>
<div class="hs-point" v-click="1"><Latex tex="h\nu=E_n-E_m" />：谱线的频率，记录着原子能级之间的能量差。</div>
<div class="summary-line" v-click="2">玻尔把量子观念带进原子世界；更复杂的原子，要等量子力学来解释。</div>
</div>
