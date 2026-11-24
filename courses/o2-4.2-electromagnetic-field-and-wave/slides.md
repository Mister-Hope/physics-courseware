---
theme: default
title: "电磁场与电磁波"
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
chapter-no: "4.2"
chapter: "第四章 电磁振荡与电磁波"
---

<!-- 封面装饰：E 在竖直平面内振动、B 在水平面内振动，二者都与传播方向垂直 -->
<CoverDecorationSvg />

---
title: 电磁波是怎样产生的？
clicks: 2
---

<div class="page-grow">
<div class="em-hook">电磁振荡电路中的能量，有一部分以电磁波的形式辐射到周围空间。这些电磁波是怎样产生的？</div>
<div class="em-hook" v-click="1">振荡电路中，电容器极板间的电场、线圈中的磁场都在周期性变化——这些变化只发生在电路内部吗？</div>
<div class="info-hint" v-click="2">麦克斯韦从“场”的观点出发：电磁场可以脱离导线，在空间中传播出去。</div>
</div>

---
title: 变化的磁场产生电场
clicks: 3
---

<div class="page-grow">
<div class="ask">闭合电路中的感应电流，是什么力推动自由电荷定向移动的？</div>
<div class="half-grid em-row-fig">
<div class="em-fig-fill"><EmFieldInductionSvg :step="$clicks" /></div>
<div class="stack">
<div v-click="1">麦克斯韦从场的观点看：<span class="em-b">变化的磁场</span>在空间产生了<span class="em-e">电场</span>，正是这个电场推动自由电荷，形成感应电流。</div>
<div v-click="2">把这一结论推广到<span class="em-b">不存在闭合电路</span>的情形：即使没有导线，变化磁场周围的电场同样存在。</div>
<div v-click="3" class="tip-hint">变化的磁场产生电场——这是普遍规律，与闭合电路是否存在无关。</div>
</div>
</div>
</div>

---
title: 变化的电场产生磁场
clicks: 3
---

<div class="page-grow">
<div class="ask">电容器充电、放电时，两极板之间没有导线。极板间变化的电场也会产生磁场吗？</div>
<div class="half-grid">
<div class="em-fig-fill"><ChargingCapacitorFieldSvg :step="$clicks" /></div>
<div class="stack">
<div v-click="1">麦克斯韦假设：<span class="em-e">变化的电场</span>就像运动的电荷，也会在空间产生<span class="em-b">磁场</span>。</div>
<div v-click="2">电容器充、放电时，不仅导线中的电流产生磁场，极板间周期性变化的电场也在产生磁场。</div>
<div v-click="3" class="warn-hint">这个假设当时没有直接的实验基础，却更具创造性——正是这两条观点，使麦克斯韦预见了电磁波。</div>
</div>
</div>
</div>

---
title: 电磁场
clicks: 1
---

# 电磁场

<div class="page-grow">
<div class="em-laws">
<div class="em-law-row"><span class="em-b">变化的磁场</span><span class="em-produce">产生</span><span class="em-e">电场</span></div>
<div class="em-law-row"><span class="em-e">变化的电场</span><span class="em-produce">产生</span><span class="em-b">磁场</span></div>
</div>
<DefinitionBox term="电磁场" v-click="1">
<div>变化的电场和磁场总是<span class="def-term">相互联系</span>的，形成一个不可分割的、<span class="def-term">统一的电磁场</span>。</div>
<div>如果在空间某区域有周期性变化的电场，就会在周围引起变化的磁场；变化的电场和磁场又会在较远的空间引起新的变化的电场和磁场。</div>
</DefinitionBox>
</div>

---
title: 电磁波的形成
clicks: 3
---

<div class="page-grow">
<div class="ask">如果在空间某区域有周期性变化的电场，它周围的空间会发生什么？</div>
<div class="em-fig-fill"><EmWaveFormationSvg :step="$clicks" /></div>
<div class="tip-hint" v-click="3">变化的电场和磁场相互激发、由近及远地传播，形成电磁波。</div>
</div>

---
title: 电磁波是横波
clicks: 1
---

# 电磁波是横波

<div class="page-grow">
<div class="em-fig-fill"><EmWaveTransverseSvg /></div>
<div class="info-hint" v-click="1">真空中传播时，电场 <Latex tex="E" /> 与磁场 <Latex tex="B" /> 互相垂直，而且二者均与传播方向垂直。</div>
</div>

---
title: 某一时刻的波形
clicks: 1
---

<div class="page-grow">
<div class="ask">某一时刻，电场沿传播方向是怎样分布的？</div>
<div class="em-fig-fill"><EmWaveSnapshotAxes :step="$clicks" /></div>
<div class="info-hint" v-click="1">相邻两个波峰（或相邻两个波谷）之间的距离叫作波长，用 <Latex tex="\lambda" /> 表示。</div>
</div>

---
title: 电磁波不需要介质
clicks: 2
---

<div class="page-grow">
<div class="ask">宇航员舱外对话靠无线电。声音传不了，电磁波为什么能？</div>
<div class="em-compare" v-click="1">
<div class="em-compare-row em-sound"><span class="em-compare-icon"><mdi-waveform /></span><span class="em-compare-tag em-sound">声波</span><span>靠介质的振动传递，没有介质就不能传播。</span></div>
<div class="em-compare-row em-wave"><span class="em-compare-icon"><mdi-access-point /></span><span class="em-compare-tag em-wave">电磁波</span><span>不需要任何介质，在真空中也能传播。</span></div>
</div>
<div class="info-hint" v-click="2">电磁波的传播靠变化的电场和磁场相互感应，不是靠介质把振动传下去。</div>
</div>

---
title: 光是电磁波
clicks: 2
---

<div class="page-grow">
<div class="ask">麦克斯韦算出：电磁波在真空中的速度等于光速 <Latex tex="c" />。这说明了什么？</div>
<div class="em-quote" v-click="1">“我们有充分的理由断定，光本身是……<br>按电磁波规律传播的一种电磁振动。”<span class="em-quote-src">——麦克斯韦</span></div>
<div class="tip-hint" v-click="2">光是一种电磁波。这个预言，后来被赫兹的实验证实。</div>
</div>

---
title: 波速、波长与频率
clicks: 3
---

# 波速、波长与频率

<div class="page-grow em-derive">
<div v-click="1">波在一个周期 <Latex tex="T" /> 内传播的距离，正好是一个波长 <Latex tex="\lambda" />。</div>
<div v-click="2">所以波速 <Latex tex="c = \dfrac{\lambda}{T}" />，而频率 <Latex tex="f = \dfrac{1}{T}" />。</div>
<div class="em-formula" v-click="3"><Latex tex="c = \lambda f" /></div>
<div class="mini-note" v-click="3">真空中 <Latex tex="c = 3.0 \times 10^{8}\ \text{m/s}" /></div>
</div>

---
title: 算一算：频率与波长
clicks: 1
---

<div class="page-grow">
<div class="ask">频率越高，波长越短还是越长？</div>
<WavelengthExplorer />
<div class="tip-hint" v-click="1">频率越高，波长越短；真空中它们的乘积总等于 <Latex tex="c" />。</div>
</div>

---
title: 赫兹实验
clicks: 2
---

<div class="page-grow">
<div class="ask">1886 年，赫兹用什么装置把电磁波发射出去？</div>
<div class="em-fig-fill"><HertzExperimentSvg :step="$clicks" /></div>
<div class="stack-tight">
<div v-click="1">感应圈使两球之间的电压迅速升高，空气间隙被击穿，跳出火花。</div>
<div v-click="2">火花放电时，周围空间的电场和磁场迅速变化，电磁波向外传播出去。</div>
</div>
</div>

---
title: 赫兹实验
clicks: 2
---

<div class="page-grow">
<div class="ask">导线环离发射器还有一段距离，它上面的小球为什么也会跳火花？</div>
<div class="figure em-fig-sm"><HertzExperimentSvg :step="2" /></div>
<div v-click="1">电磁波到达导线环，在环中激发出感应电动势，小球之间的空气间隙也被击穿。</div>
<div class="tip-hint" v-click="2">赫兹的实验证实了麦克斯韦的预言：电磁波确实存在。</div>
</div>

---
title: 电磁波携带能量
clicks: 2
---

<div class="page-grow">
<div class="ask">电磁波看不见、摸不着。凭什么说它真实存在？</div>
<div class="stack" v-click="1">
<div>电磁波发射的过程，就是辐射能量的过程；传播的过程，就是能量传播的过程。</div>
<div>太阳光带来光和热，收音机、手机靠电磁波传递信号——它们都在传递能量。</div>
</div>
<div class="tip-hint" v-click="2">能量是电磁场的物质性最有说服力的证据。场和实物，是物质存在的两种形式。</div>
</div>

---
title: 麦克斯韦的电磁场理论
clicks: 2
---

<div class="page-grow">
<MaxwellTimeline />
<div class="em-quote" v-click="1">“你不应该停留在用数学解释我的观点，而应该突破它。”<span class="em-quote-src em-quote-src--inline">——法拉第</span></div>
<div class="tip-hint" v-click="2">此后历时十年，麦克斯韦建立电磁场理论，总结出麦克斯韦方程组；它的意义，可与牛顿力学体系媲美。</div>
</div>

---
layout: exercise-split
title: 例题：调频广播的波长
---

<template v-slot:stem>

某调频广播电台发射的电磁波频率为 $100\ \text{MHz}$，求它在真空中的波长。

</template>

解：真空中 $c = 3.0 \times 10^{8}\ \text{m/s}$，由 $c = \lambda f$ 得

<div v-click="1"><Latex tex="\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{100 \times 10^{6}}\ \text{m} = 3.0\ \text{m}" /></div>

<div v-click="2">频率变为 <Latex tex="200\ \text{MHz}" /> 时，波长变为 <Latex tex="1.5\ \text{m}" />——频率加倍，波长减半。</div>

---
title: 声波与电磁波
clicks: 2
---

<div class="page-grow">
<div class="ask">声波和电磁波都能传递信息。它们的相同点和不同点各是什么？</div>
<div class="em-table" v-click="1">
<div class="em-table-head"><span></span><span class="em-sound">声波</span><span class="em-wave">电磁波</span></div>
<div class="em-table-row"><span class="em-table-key">本质</span><span>机械振动在介质中的传播</span><span>变化的电场和磁场相互激发</span></div>
<div class="em-table-row"><span class="em-table-key">介质</span><span>必须有介质</span><span>不需要介质，真空中也能传播</span></div>
<div class="em-table-row"><span class="em-table-key">真空中的速度</span><span>不能传播</span><span><Latex tex="c = 3.0 \times 10^{8}\ \text{m/s}" /></span></div>
</div>
<div class="tip-hint" v-click="2">两者都是波，都能传递信息和能量，都满足 <Latex tex="v = \lambda f" />。</div>
</div>

---
title: 小结
clicks: 4
---

# 小结

<div class="page-grow em-summary">
<div v-click="1"><span class="em-b">变化的磁场</span>产生电场，<span class="em-e">变化的电场</span>产生磁场——二者形成统一的电磁场。</div>
<div v-click="2">变化的电场和磁场相互激发、由近及远地传播，形成电磁波。</div>
<div v-click="3">电磁波是横波，不需要介质；真空中 <Latex tex="c = 3.0 \times 10^{8}\ \text{m/s}" />，<Latex tex="c = \lambda f" />。</div>
<div v-click="4">麦克斯韦预言、赫兹证实：光是电磁波，电磁波携带能量。</div>
</div>
