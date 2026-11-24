---
theme: default
title: "原子的核式结构模型"
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
chapter-no: "4.3"
chapter: "第四章 原子结构和波粒二象性"
subtitle: "α 粒子散射实验 · 原子的核式结构模型"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 原子里面有什么？
clicks: 2
clickAnimation: none
---

<div class="page-grow page-around">
<div class="ask-lead">1897 年，汤姆孙根据阴极射线在电场、磁场中的偏转断定：它是带负电的粒子流 —— 电子；它的质量比氢离子小得多。</div>
<div class="ask">原子是电中性的，电子却带负电、质量又很小。原子中带正电的部分在哪里？它和电子是怎样分布的？</div>
<div class="info-hint" v-click="1">原子中一定还有带正电的部分，而且它具有大部分的原子质量。</div>
<div class="tip-hint" v-click="2">正电荷和电子究竟怎样分布，只能由实验来判断。</div>
</div>

---
layout: base-flex
title: 汤姆孙的枣糕模型
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="nu-split">
<div class="nu-fig">
<AtomModelSvg type="thomson" :step="$clicks" />
<div class="fig-cap">汤姆孙设想的原子（示意图）</div>
</div>
<div class="stack">
<div class="ask">正电荷和电子在原子内部怎样分布？</div>
<div class="nu-point" v-click="1">1898 年，汤姆孙提出：原子是一个球体，正电荷弥漫性地均匀分布在整个球体内，电子镶嵌其中 —— 有人称之为“枣糕模型”。</div>
<div class="warn-hint" v-click="2">1903 年，勒纳德发现较高速度的电子很容易穿透原子 —— 原子不是实心球体，这个模型可能不正确。</div>
</div>
</div>
</div>

---
layout: base-flex
title: α 粒子散射的装置
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="nu-split">
<div class="nu-fig">
<AlphaScatteringSetupSvg :step="$clicks" />
<div class="fig-cap">α 粒子散射实验装置（示意图）</div>
</div>
<div class="stack">
<div class="ask-lead">1909 年，卢瑟福指导盖革和马斯顿做 α 粒子散射实验。</div>
<div class="ask">怎样观察散射到各个方向的 α 粒子？</div>
<div class="nu-point" v-click="1">α 粒子源 R 被铅块包围，它发射的 α 粒子经一条细通道形成一束射线，打在金箔 F 上。</div>
<div class="nu-point" v-click="2">显微镜 M 带有荧光屏 S，可转到不同方向；α 粒子打在荧光屏上产生微弱闪光，记录某段时间内向该方向散射的粒子数。</div>
<div class="mini-note">从放射源到荧光屏这段路程处于真空中。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 散射实验看到了什么
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="nu-split">
<div class="nu-fig">
<AlphaScatteringTracksSvg mode="foil" :step="$clicks" />
<div class="fig-cap">α 粒子穿过金箔后的三种去向（示意图）</div>
</div>
<div class="stack">
<div class="ask">把显微镜转到不同方向，记录的 α 粒子数有什么差别？</div>
<div class="nu-point" v-click="1">绝大多数 α 粒子穿过金箔后基本上仍沿原来的方向前进。</div>
<div class="nu-point" v-click="2">少数 α 粒子发生大角度偏转，约占全部入射粒子的 <Latex tex="1/8000" />。</div>
<div class="nu-point" v-click="3">极少数 α 粒子的偏转角甚至大于 <Latex tex="90^\circ" />，几乎被“撞了回来”。</div>
<div class="mini-note">统计散射到各个方向的粒子比例，可以推知原子中电荷的分布。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 大角度偏转是谁造成的？
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask-lead">大角度偏转不可能是电子造成的。为什么？又是谁造成的？</div>
<div class="step-list">
<div class="step-item" v-click="1"><div class="step-no">1</div><div class="nu-point">电子质量只有 α 粒子的 <Latex tex="1/7300" />，它对 α 粒子速度的大小和方向的影响，像灰尘对枪弹一样，完全可以忽略。</div></div>
<div class="step-item" v-click="2"><div class="step-no">2</div><div class="nu-point">所以，使 α 粒子发生大角度偏转的，只能是原子中具有大部分质量的那个带正电的部分。</div></div>
<div class="step-item" v-click="3"><div class="step-no">3</div><div class="nu-point">可是按汤姆孙模型，正电荷均匀分布在整个原子内，α 粒子穿过时受到各个方向正电荷的斥力基本上相互平衡，影响不会很大。</div></div>
</div>
<div class="danger-hint" v-click="3">汤姆孙的模型无法解释大角度散射的实验结果。</div>
</div>

---
layout: base-flex
title: 正电荷集中在哪里？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="nu-split">
<div class="nu-fig">
<AlphaScatteringTracksSvg mode="nucleus" :step="$clicks" />
<div class="fig-cap">正电荷集中到很小的空间后（示意图）</div>
</div>
<div class="stack">
<div class="ask">要能把 α 粒子“撞回来”，正电荷必须怎样分布？</div>
<div class="nu-point" v-click="1">只有把几乎全部质量和正电荷集中到很小的空间，α 粒子靠近时才会受到很强的库仑斥力。</div>
<div class="nu-point" v-click="2">这样，大部分 α 粒子离它很远、几乎不改变方向；只有极少数离它很近，发生大角度散射。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 原子的核式结构模型
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="nu-split">
<div class="nu-fig">
<AtomModelSvg type="rutherford" />
<div class="fig-cap">核式结构模型（示意图）</div>
</div>
<div class="stack">
<div class="ask">正电体集中在原子中心的一小块空间里。电子在哪里运动？</div>
<div class="card" v-click="1">
<div class="mini-title">核式结构模型</div>
<div class="nu-point">原子中心有一个带正电的核，电荷量为 <Latex tex="+Ze" />，几乎占有原子的全部质量；电子在核外运动。</div>
<div class="nu-point">这个核叫作<strong>原子核</strong>，这个模型叫作<strong>核式结构模型</strong>。</div>
</div>
<div class="nu-point" v-click="2">卢瑟福用经典力学计算向各方向散射的 α 粒子比例，与实验数据符合得很好。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 核式模型怎样解释三种结果
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask">按核式结构模型，α 粒子散射的偏转角大小由什么决定？</div>
<div class="nu-three">
<div class="nu-explain" v-click="1">
<div class="nu-explain-title">离核很远</div>
<div class="nu-point">受到的库仑斥力很小</div>
<div class="nu-point">几乎沿原来的方向前进</div>
<div class="nu-tag mini-note">绝大多数</div>
</div>
<div class="nu-explain" v-click="2">
<div class="nu-explain-title">离核较近</div>
<div class="nu-point">受到的库仑斥力较大</div>
<div class="nu-point">发生大角度偏转</div>
<div class="nu-tag mini-note">少数</div>
</div>
<div class="nu-explain" v-click="3">
<div class="nu-explain-title">几乎正对核</div>
<div class="nu-point">受到的库仑斥力最强</div>
<div class="nu-point">偏转角大于 <Latex tex="90^\circ" />，几乎被撞回来</div>
<div class="nu-tag mini-note">极少数</div>
</div>
</div>
<div class="tip-hint" v-click="3">偏转角的大小，取决于 α 粒子与原子核的最近距离。</div>
</div>

---
layout: base-flex
title: 原子核带多少电荷
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask">由 α 粒子散射的数据可以确定原子核的电荷量 <Latex tex="Q" />。知道 <Latex tex="Q" />，还能推出什么？</div>
<div class="step-list">
<div class="step-item" v-click="1"><div class="step-no">1</div><div class="nu-point">原子核的电荷量为 <Latex tex="+Ze" />：<Latex tex="Z" /> 是核电荷量与一个电子电荷（绝对值）的比值，没有单位。</div></div>
<div class="step-item" v-click="2"><div class="step-no">2</div><div class="nu-point">原子整体是电中性的，所以核外有 <Latex tex="Z" /> 个电子；各种元素的核电荷数非常接近原子序数 —— 元素周期表就是按原子中的电子数排列的。</div></div>
<div class="step-item" v-click="3"><div class="step-no">3</div><div class="nu-point">原子核由质子和中子组成，核电荷数就是质子数。</div></div>
</div>
<div class="tip-hint" v-click="3">核电荷数 = 质子数 = <Latex tex="Z" />，核外电子数也是 <Latex tex="Z" />。</div>
</div>

---
layout: base-flex
title: 原子核有多大
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="nu-split">
<div class="nu-fig">
<AtomScaleSvg />
<div class="fig-cap">原子与原子核的大小对比（示意图，不按比例）</div>
</div>
<div class="stack">
<div class="ask">原子核的半径与原子半径，数量级相差多少？</div>
<div class="nu-point" v-click="1">原子核半径的数量级约为 <Latex tex="10^{-15}\ \text{m}" />；原子半径的数量级约为 <Latex tex="10^{-10}\ \text{m}" />。</div>
<div class="nu-point" v-click="2">两者相差 <Latex tex="10^5" /> 倍（十万倍）—— 原子内部十分“空旷”。</div>
</div>
</div>
</div>

---
layout: exercise-split
title: 练习 4：核式结构模型的依据
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

**4.** 卢瑟福提出的原子结构的模型是怎样的？他提出这种模型的依据是什么？

</template>

<div class="nu-line" v-click="1"><strong>模型：</strong>原子中心有一个带正电的核，电荷量为 <Latex tex="+Ze" />，它几乎占有原子的全部质量；电子在核外运动。</div>

<div class="nu-line" v-click="2"><strong>现象依据：</strong>α 粒子散射实验中，绝大多数 α 粒子几乎沿原来的方向前进，少数发生大角度偏转，极少数偏转角大于 <Latex tex="90^\circ" />。</div>

<div class="nu-line" v-click="3"><strong>推理依据：</strong>电子质量太小，不可能使 α 粒子大角度偏转；正电荷若均匀分布，各方向的斥力相互平衡，也解释不了。所以几乎全部质量和正电荷只能集中在很小的核上。</div>

---
layout: exercise-split
title: 练习 5：原子有多大
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

**5.** 按照原子的核式结构模型的比例，假如原子核有绿豆那么大（直径约 <Latex tex="5\ \text{mm}" />），那么整个原子有多大？

</template>

<div class="nu-line" v-click="1">原子核半径与原子半径的数量级之比为 <Latex tex="10^{-15} : 10^{-10} = 1 : 10^5" />，两者相差十万倍。</div>

<div class="nu-line" v-click="2">原子直径约为 <Latex tex="5\ \text{mm} \times 10^5 = 5 \times 10^5\ \text{mm} = 500\ \text{m}" />。</div>

<div class="tip-hint" v-click="3">原子核若有绿豆那么大，整个原子就要有 <Latex tex="500\ \text{m}" /> 的直径 —— 原子内部十分“空旷”。</div>

---
layout: exercise-split
title: 练习 6：为什么用金箔
clicks: 2
clickAnimation: none
---

<template v-slot:stem>

**6.** α 粒子散射实验用的是金箔等重金属箔，而没有用轻金属箔，例如铝箔。除了金的延展性好、可以把金箔做得非常薄这个原因以外，你认为还有什么原因？

</template>

<div class="nu-line" v-click="1">重元素的核电荷数大（金 <Latex tex="Z = 79" />，铝 <Latex tex="Z = 13" />），α 粒子靠近原子核时受到的库仑斥力更强，大角度偏转更明显，现象更容易观察到。</div>

<div class="nu-line" v-click="2">重元素原子核的质量大，碰撞时几乎不动，可以看作固定的散射中心，散射角的分布才好分析。</div>

---
layout: base-flex
title: 本节的线索
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask">我们是怎样一步步认识原子内部结构的？</div>
<div class="nu-timeline">
<div class="nu-tl-row" v-click="1"><div class="nu-tl-year">1897</div><div class="nu-tl-text">汤姆孙发现电子：原子中一定还有带正电的部分。</div></div>
<div class="nu-tl-row" v-click="1"><div class="nu-tl-year">1898</div><div class="nu-tl-text">汤姆孙提出“枣糕模型”：正电荷均匀分布，电子镶嵌其中。</div></div>
<div class="nu-tl-row" v-click="2"><div class="nu-tl-year">1909</div><div class="nu-tl-text">α 粒子散射实验：绝大多数不偏转，少数大角度偏转，极少数被“撞回来”。</div></div>
<div class="nu-tl-row" v-click="2"><div class="nu-tl-year">1911</div><div class="nu-tl-text">卢瑟福提出核式结构模型：正电荷和几乎全部质量集中在原子核上。</div></div>
</div>
<div class="tip-hint" v-click="2">核电荷为 <Latex tex="+Ze" />；核半径约 <Latex tex="10^{-15}\ \text{m}" />，原子半径约 <Latex tex="10^{-10}\ \text{m}" />，相差十万倍。</div>
</div>

---
layout: base-flex
title: 下一节：电子在核外怎样运动？
clicks: 1
clickAnimation: none
---

<div class="page-grow page-around">
<div class="ask-lead">α 粒子散射实验让我们知道：原子具有核式结构。</div>
<div class="ask">电子在原子核的周围怎样运动？</div>
<div class="summary-line" v-click="1">下一节：氢原子光谱和玻尔的原子模型。</div>
</div>
