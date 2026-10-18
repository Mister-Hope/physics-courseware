---
theme: default
title: "电荷"
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
chapter-no: "9.1"
chapter: "第九章 静电场及其应用"
subtitle: 摩擦起电 · 接触带电 · 静电感应 · 电荷守恒
---

<CoverDecorationSvg />

---
clicks: 2
title: 物体带电的表现
---

<div class="page-grow">

<div class="ask">摩擦过的琥珀能够吸引轻小物体——这就是物体带电的表现。「电」这个字是怎么来的？</div>

<div class="half-grid">
<div class="figure"><AmberFlecksSvg /></div>
<div class="divider-l stack">

<div v-click="1">公元前 600 年左右，古希腊学者泰勒斯就发现摩擦过的琥珀吸引轻小物体的现象；公元 1 世纪，我国学者王充在《论衡》中写下"顿牟掇芥"。16 世纪，英国科学家吉尔伯特根据希腊文的琥珀创造了英语中的 <span class="text-accent">electricity</span>（电）这个词，认为摩擦过的琥珀带有电荷。</div>

<div v-click="2">人们发现，很多物体都会由于摩擦而带电，并称这种方式为<b class="text-accent">摩擦起电</b>。</div>

</div>
</div>

</div>

---
clicks: 3
title: 两种电荷
---

# 两种电荷

<div class="page-grow">

<div class="ask">两种物体摩擦后各带什么电？正电荷、负电荷是怎么定的？</div>

<div class="half-grid">
<div class="figure"><TwoChargeInteractionSvg /></div>
<div class="divider-l stack">

<div v-click="1">玻璃棒与丝绸摩擦，玻璃棒带<b class="text-accent">正电</b>、丝绸带<b class="text-accent-2">负电</b>；橡胶棒与毛皮摩擦，橡胶棒带<b class="text-accent-2">负电</b>、毛皮带<b class="text-accent">正电</b>。摩擦并没有"产生"正电：两个物体带的是<b>等量异种电荷</b>，发生转移的只是电子。</div>

<div v-click="2">正、负电荷的<b class="text-accent">名称</b>是富兰克林人为规定的（命名是一种约定）；而<b>自然界只有两种电荷是客观事实</b>——迄今为止，人们没有发现对这两种电荷都排斥或都吸引的电荷。</div>

<div v-click="3"><b class="text-accent">同种电荷相互排斥，异种电荷相互吸引。</b></div>

</div>
</div>

</div>

---
clicks: 1
title: 电荷量
---

# 电荷量

<div class="page-grow">

<div class="ask">带电的多少用什么量表示？</div>

<div v-click="1">
<DefinitionBox term="电荷量" tone="gold">
<div>电荷的多少叫作<span class="def-term">电荷量</span>（electric quantity），用 <Latex tex="Q" /> 表示，有时也可以用 <Latex tex="q" /> 来表示。在国际单位制中，它的单位是库仑（coulomb），简称库，符号是 <Latex tex="\text{C}" />。正电荷的电荷量为正值，负电荷的电荷量为负值。</div>
</DefinitionBox>
</div>

</div>

---
clicks: 3
title: 检验物体是否带电
---

<div class="page-grow">

<div class="ask">不接触物体，怎样判断它是否带电、带的是哪种电荷？</div>

<div class="half-grid">
<div class="figure"><ElectroscopeLab /></div>
<div class="divider-l stack">

<div v-click="1">玻璃瓶内有两片金属箔，用金属丝挂在一根导体棒的下端，棒的上端穿过绝缘的瓶塞从瓶口伸出。<b>当带电体靠近导体棒的上端时，金属箔片就会张开</b>。</div>

<div v-click="2">用验电器可以检验物体是否带电，以及所带电荷的<b>种类和相对数量</b>；把金属箔换成指针、并用金属制作外壳，这样的验电器又叫作<b class="text-accent-2">静电计</b>。</div>

<div v-click="3" class="info-hint"><b class="text-accent">验电羽</b>是一束金属箔条，带电后因同种电荷相互排斥而张开。</div>

</div>
</div>

</div>

---
clicks: 2
title: 原子为什么显电中性
---

# 原子为什么显电中性

<div class="page-grow">

<div class="ask">正常的原子为什么不显电性？等量的正、负电荷放在一起会怎样？</div>

<div class="half-grid">
<div class="figure"><AtomStructureSvg /></div>
<div class="divider-l stack">

<div v-click="1">每个原子中质子的正电荷数量与电子的负电荷数量<b class="text-accent">一样多</b>，所以整个原子对外界表现为<b>电中性</b>。</div>

<div v-click="2"><b class="text-accent-2">电中和</b>：等量的正、负电荷相遇会相互抵消，对外不显电性。<b>不是电荷消失了</b>——电荷只是转移或重新分布，等量异种电荷合在一起时电荷的<b>代数和仍为零</b>。</div>

</div>
</div>

</div>

---
clicks: 3
title: 三种带电方式
---

# 三种带电方式

<div class="page-grow">

<div class="ask">使物体带电有哪几种方式？</div>

<div class="stack">

<div v-click="1"><b class="text-accent">摩擦起电</b>：两种物质组成的物体互相摩擦，束缚较弱的电子转移到另一个物体。</div>

<div v-click="2"><b class="text-accent-2">接触带电</b>：让带电体与导体接触，电荷就会转移到它上面。</div>

<div v-click="3"><b class="text-physics">感应起电</b>：利用静电感应使金属导体带电。</div>

</div>

</div>

---
clicks: 3
title: 摩擦起电的原因
---

# 摩擦起电的原因

<div class="page-grow">

<div class="ask">摩擦为什么能使原来电中性的物体带电？</div>

<div class="half-grid">
<div class="figure"><FrictionChargeLab /></div>
<div class="divider-l stack">

<div v-click="1">原子核的结构一般很稳定；通常离原子核较远的电子受到的束缚较弱，容易受到外界的作用而脱离原子。</div>

<div v-click="2"><b>接触</b>为电子转移提供了条件；摩擦使分子热运动加剧，促进电子转移。至于谁得到电子、谁失去电子，取决于<b>哪个物体对电子的束缚作用更强</b>。</div>

<div v-click="3" class="tip-hint">原来电中性的物体由于<b class="text-accent-2">得到电子而带负电</b>，失去电子的物体则<b class="text-accent">带正电</b>。</div>

</div>
</div>

</div>

---
clicks: 3
title: 接触带电与平分电荷
---

# 接触带电与平分电荷

<div class="page-grow">

<div class="ask">两个小球接触后再分开，电荷怎么分？</div>

<div class="half-grid">
<div class="figure"><ContactChargingLab /></div>
<div class="divider-l stack">

<div v-click="1">让带电体与导体接触，电荷就会转移到它上面，这就是<b class="text-accent-2">接触带电</b>。</div>

<div v-click="2">两个<b>完全相同的金属球</b>接触后分开，所带电荷量相等：一个带 <Latex tex="+Q" />、另一个不带电，各带 <Latex tex="+\dfrac{Q}{2}" />。</div>

<div v-click="3">一个带 <Latex tex="+Q" />、另一个带 <Latex tex="-3Q" />，接触后分开，各带 <Latex tex="-Q" />。</div>

</div>
</div>

</div>

---
clicks: 3
title: 导体与绝缘体
---

# 导体与绝缘体

<div class="page-grow">

<div class="ask">为什么金属容易导电，而绝缘体几乎不导电？</div>

<div class="half-grid">
<div class="figure"><MetalStructureSvg mode="conductor" :show-electron-flow="$clicks >= 2" :show-insulator="$clicks >= 3" /></div>
<div class="divider-l stack">

<div v-click="1">金属中原子的外层电子往往会脱离原子核的束缚而在金属中自由运动，这种电子叫作<b class="text-accent">自由电子</b>（free electron）。</div>

<div v-click="2">失去自由电子的原子便成为带正电的<b>离子</b>，它们在金属内部排列起来，每个正离子都在自己的平衡位置附近振动而不移动，只有自由电子穿梭其中，这就使金属成为导体。</div>

<div v-click="3">绝缘体中几乎不存在能自由移动的电荷——导体与绝缘体的本质区别，就是<b>是否存在大量自由电荷</b>。</div>

</div>
</div>

</div>

---
clicks: 4
title: 观察静电感应现象
---

<div class="page-grow">

<div class="ask">摩擦可以使物体带电，那么，还有其他方法可以使物体带电吗？</div>

<div class="split-wide" style="--stack-gap:.6rem">
<div class="stack">

<div>取一对用绝缘柱支持的导体 <Latex tex="A" /> 和 <Latex tex="B" />，使它们彼此接触。起初它们不带电，贴在下部的两片金属箔是闭合的。</div>

<div v-click="1">手握绝缘棒，把带正电荷的带电体 <Latex tex="C" /> 移近导体 <Latex tex="A" />——金属箔有什么变化？<b class="text-accent">箔片张开</b></div>

<div v-click="2">这时手持绝缘柱把导体 <Latex tex="A" /> 和 <Latex tex="B" /> 分开，然后移开 <Latex tex="C" />——金属箔又有什么变化？<b class="text-accent">箔片仍张开，两块导体各自带电</b></div>

<div v-click="3">再让导体 <Latex tex="A" /> 和 <Latex tex="B" /> 接触——又会看到什么现象？<b class="text-accent">电荷中和，箔片闭合</b></div>

</div>
<div class="stack">
<div class="figure"><InductionLab /></div>

<div v-click="4" class="tip-hint">利用金属的微观结构模型，解释看到的现象。</div>

</div>
</div>

</div>

---
clicks: 2
title: 静电感应与感应起电
---
<div class="page-grow">

<div class="ask"><Latex tex="C" /> 靠近时，金属里的自由电子到底发生了什么？</div>

<div v-click="1">
<DefinitionBox term="静电感应" tone="gold">
<div>当一个带电体靠近导体时，由于电荷间相互吸引或排斥，导体中的自由电荷便会趋向或远离带电体，使导体靠近带电体的一端带<span class="def-term">异种电荷</span>，远离带电体的一端带<span class="def-term">同种电荷</span>。这种现象叫作<span class="def-term">静电感应</span>（electrostatic induction）。</div>
</DefinitionBox>
</div>

<div v-click="2" class="half-grid">
<div class="figure"><div class="svg-sm"><MetalStructureSvg mode="induction" :show-induced-charges="$clicks >= 2" /></div></div>
<div class="divider-l stack">

<DefinitionBox term="感应起电" tone="blue">
<div>利用静电感应使金属导体带电的过程叫作<span class="def-term">感应起电</span>。</div>
</DefinitionBox>

<div class="info-hint">静电感应过程中，导体中的自由电荷只是从导体的一部分转移到另一部分。</div>

</div>
</div>

</div>
---
clicks: 2
title: 为什么带电体能吸引轻小物体
---

# 带电体为什么能吸引轻小物体

<div class="page-grow">

<div class="ask">带电体为什么能把纸屑吸起来？</div>

<div class="half-grid">
<div class="figure"><MetalVsPaperSvg /></div>
<div class="divider-l stack">

<div v-click="1">带电体靠近轻小物体时，轻小物体因静电感应带电，受到静电力；当<b class="text-accent">静电力大于重力</b>时，它就被吸起来。</div>

<div v-click="2"><b class="text-accent">金属屑</b>被吸起后与带电体接触，因接触带电带上同种电荷，随即被排斥；<b class="text-accent-2">纸屑</b>几乎不导电，感应出的电荷难以重新分布，于是被吸住不放。</div>

</div>
</div>

</div>

---
clicks: 3
title: 元电荷
---

# 元电荷

<div class="page-grow">

<div class="ask">实验发现的最小电荷量是多少？</div>

<div v-click="1">
<DefinitionBox term="元电荷" tone="gold">
<div>迄今为止，实验发现的最小电荷量就是电子所带的电荷量；质子、正电子所带电荷量与它相同，电性相反。人们把这个最小的电荷量叫作<span class="def-term">元电荷</span>（elementary charge），用 <Latex tex="e" /> 表示。</div>
</DefinitionBox>
</div>

<div v-click="2">元电荷 <Latex tex="e" /> 的数值最早是由美国物理学家<b>密立根</b>测得的（油滴实验）。现在公认的 <Latex tex="e = 1.602\ 176\ 634 \times 10^{-19}\ \text{C}" />，在计算中可取 <Latex tex="e = 1.60 \times 10^{-19}\ \text{C}" />。</div>

<div v-click="3" class="tip-hint">实验还发现，所有带电体的电荷量都是 <Latex tex="e" /> 的<b class="text-accent">整数倍</b>——这就是说，电荷量是不能连续变化的物理量。</div>

</div>

---
clicks: 2
title: 电荷量是 e 的整数倍
---

<div class="page-grow">

<div class="ask">一个物体带了电，它的电荷量能取任意值吗？</div>

<ChargeQuantizationLab />

<div class="stack">

<div v-click="1" class="tip-hint"><Latex tex="Q = ne" />（<Latex tex="n" /> 取整数）：电荷量只能一份一份地变化，没有中间值。</div>

<div v-click="2" class="info-hint">电子的电荷量 <Latex tex="e" /> 与电子的质量 <Latex tex="m_e" /> 之比，叫作电子的<b>比荷</b>：<Latex tex="\dfrac{e}{m_e} = 1.76 \times 10^{11}\ \text{C/kg}" />（<Latex tex="m_e = 9.11 \times 10^{-31}\ \text{kg}" />）。</div>

</div>

</div>

---
clicks: 3
title: 电荷守恒定律
---
<div class="page-grow">

<div class="ask">摩擦起电、接触带电、感应起电——创造了电荷吗？</div>

<div v-click="1">无论是摩擦起电还是感应起电，都<b>没有创造电荷</b>，只是电荷的分布发生了变化。
<DefinitionBox term="电荷守恒定律" tone="gold">
<div>电荷既不会创生，也不会消灭，它只能从一个物体转移到另一个物体，或者从物体的一部分转移到另一部分；在转移过程中，电荷的<b>总量保持不变</b>。这个结论叫作<span class="def-term">电荷守恒定律</span>（law of conservation of charge）。</div>
</DefinitionBox>
</div>

<div v-click="2" class="info-hint">更普遍的表述是：一个与外界没有电荷交换的系统，电荷的<b class="text-accent">代数和</b>保持不变。</div>

<div v-click="3" class="half-grid" style="grid-template-columns: minmax(0,.62fr) minmax(0,1.38fr)">
<div class="figure"><div class="svg-sm"><ElectronsPairSvg /></div></div>
<div class="divider-l stack">

<div>一个高能光子在一定条件下可以产生一个正电子和一个负电子；一对正、负电子可以同时湮没，转化为光子。带电粒子总是<b>成对</b>产生或湮没的，两个粒子带电数量相等但<b>电性相反</b>，而光子又不带电，所以<b>电荷的代数和仍然不变</b>。</div>

</div>
</div>

</div>
---
clicks: 5
title: 课堂小结
---

# 课堂小结

<div class="page-grow">

<div class="ask">这节课我们建立了哪几个概念？</div>

<div class="stack">

<div v-click="1">三种带电方式：<b class="text-accent">摩擦起电</b>（电子转移）、<b class="text-accent-2">接触带电</b>（电荷转移，相同的金属球接触后平分）、<b class="text-physics">感应起电</b>（自由电荷重新分布）。</div>

<div v-click="2"><b>静电感应</b>：带电体靠近导体，导体靠近带电体的一端带异种电荷，远离的一端带同种电荷。</div>

<div v-click="3"><b>电中和</b>与<b>电荷守恒定律</b>：等量异种电荷的代数和为零；电荷不创生、不消灭，转移过程中电荷的<b>代数和</b>不变。</div>

<div v-click="4"><b class="text-accent">元电荷</b> <Latex tex="e = 1.60 \times 10^{-19}\ \text{C}" /> 是最小的电荷量；所有带电体的电荷量 <Latex tex="Q = ne" />（<Latex tex="n" /> 为整数）。</div>

<div v-click="5" class="tip-hint"><b class="text-accent">导体</b>中有大量自由电子，<b class="text-accent-2">绝缘体</b>中几乎不存在能自由移动的电荷。</div>

</div>

</div>

---
layout: exercise-split
clicks: 2
title: 练习：干燥季节摸金属门把手
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　在天气干燥的季节，脱掉外衣后再去摸金属门把手时，常常会被电一下。这是为什么？</div>

</template>

<div v-click="1">脱掉外衣时，外衣与身体摩擦，身体和衣服分别带上了<b>异种电荷</b>；干燥的季节电荷不容易泄漏，电荷积累在身上。</div>

<div v-click="2">金属门把手是导体，且通过墙体与大地相连。手摸门把手时，身上积累的电荷瞬间转移到大地（放电）——这就是被电一下的感觉。</div>

---
layout: exercise-split
clicks: 3
title: 练习：导体分开后 A 带负电
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　在图 9.1-3 所示的实验中，导体分开后，<Latex tex="A" /> 带上了 <Latex tex="-1.0 \times 10^{-8}\ \text{C}" /> 的电荷。实验过程中，是电子由 <Latex tex="A" /> 转移到 <Latex tex="B" />，还是由 <Latex tex="B" /> 转移到 <Latex tex="A" />？<Latex tex="A" />、<Latex tex="B" /> 得到或失去的电子数各是多少？</div>

</template>

<template v-slot:fig>

<InductionExerciseSvg :show-analysis="$clicks >= 1" />

</template>

<div v-click="1"><Latex tex="A" /> 带负电，是<b>得到电子</b>的结果：电子由 <Latex tex="B" /> 转移到 <Latex tex="A" />，<Latex tex="B" /> 因失去电子而带正电。</div>

<div v-click="2"><Latex tex="n = \frac{Q}{e} = \frac{1.0 \times 10^{-8}}{1.60 \times 10^{-19}} \approx 6.25 \times 10^{10}" display /></div>

<div v-click="3"><Latex tex="A" /> 得到、<Latex tex="B" /> 失去的电子数都约为 <Latex tex="6.25 \times 10^{10}" /> 个。</div>

---
layout: exercise-split
clicks: 2
title: 练习：导体分成两部分的电荷
---

<template v-slot:stem>

<div><b class="ex-no">练习三</b>　如图 9.1-5，将带正电荷 <Latex tex="Q" /> 的导体球 <Latex tex="C" /> 靠近不带电的导体。若沿虚线 1 将导体分成 <Latex tex="A" />、<Latex tex="B" /> 两部分，这两部分所带电荷量分别为 <Latex tex="Q_A" />、<Latex tex="Q_B" />；若沿虚线 2 将导体分成两部分，这两部分所带电荷量分别为 <Latex tex="Q_A'" /> 和 <Latex tex="Q_B'" />。</div>

<div class="ex-options">
<div><b>（1）</b>请分别说出以上四个部分电荷量的正负，并简述理由。</div>
<div><b>（2）</b>请列出以上四个部分电荷量（绝对值）之间存在的一些等量关系，并简述理由。</div>
</div>

</template>

<template v-slot:fig>

<InductionSplitSvg :show-charge-signs="$clicks >= 1" />

</template>

<div v-click="1">近 <Latex tex="C" /> 的一侧（<Latex tex="A" />、<Latex tex="A'" />）带<b class="text-accent-2">负电</b>，远侧（<Latex tex="B" />、<Latex tex="B'" />）带<b class="text-accent">正电</b>：<Latex tex="C" /> 带正电，导体中的自由电子受吸引向近端移动。</div>

<div v-click="2"><Latex tex="|Q_A| = |Q_B|" />、<Latex tex="|Q_{A'}| = |Q_{B'}|" />，且 <Latex tex="Q_A + Q_B = 0" />、<Latex tex="Q_{A'} + Q_{B'} = 0" />：导体原来不带电，感应起电只是电荷的重新分布，电荷的代数和不变。</div>

---
layout: exercise-split
clicks: 2
title: 练习：小明对电荷的认识
---

<template v-slot:stem>

<div><b class="ex-no">练习四</b>　关于电荷，小明有以下认识：</div>

<div class="ex-options">
<div><b>A.</b> 电荷量很小的电荷就是元电荷。</div>
<div><b>B.</b> 物体所带的电荷量可以是任意的。</div>
</div>

<div>你认为他的看法正确吗？请简述你的理由。</div>

</template>

<div v-click="1">两种看法都不正确。元电荷是最小的<b>电荷量</b> <Latex tex="e = 1.60 \times 10^{-19}\ \text{C}" />，是一个数值，不是带电的物体——电子是带元电荷的<b>粒子</b>。</div>

<div v-click="2">所有带电体的电荷量都是 <Latex tex="e" /> 的整数倍，<Latex tex="Q = ne" />（<Latex tex="n" /> 取整数），不能是任意值。</div>
