---
theme: default
title: "电磁波的发现及应用"
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
chapter-no: "13.4"
chapter: "第十三章 电磁感应与电磁波初步"
subtitle: 从麦克斯韦的预见到赫兹的实验
---

<CoverDecorationSvg />

---
layout: focus-question
title: 引课
---

<template v-slot:icon>

<mdi-broadcast />

</template>

广播、电视、移动通信都靠电磁波——<br />电磁波是怎样被发现的？

---
clicks: 3
title: 变化的磁场产生电场
---

<div class="page-grow">
<div class="ask">法拉第：变化的磁场能在闭合电路中产生感应电流。<b>如果没有闭合电路，变化的磁场还会在空间产生什么？</b></div>

<div v-click="1" class="figure"><ChangingBToESvg :step="$clicks" /></div>

<div v-click="3" class="tip-hint">这个现象的实质是<b>变化的磁场产生电场</b>——跟有没有闭合电路无关。</div>
</div>

---
clicks: 3
title: 变化的电场产生磁场
---

<div class="page-grow">
<div class="ask">既然变化的磁场能产生电场，那么<b>变化的电场能产生磁场吗？</b></div>

<div v-click="1">麦克斯韦确信自然规律的统一性与和谐性，大胆假设：<b>变化的电场就像导线中的电流一样，会在空间产生磁场</b>。</div>

<div v-click="2" class="figure"><EmFieldRelationSvg /></div>

<div v-click="3">
<DefinitionBox term="电磁场">
变化的电场和磁场总是相互联系的，形成一个不可分割的统一的电磁场。
</DefinitionBox>
</div>
</div>

---
clicks: 4
title: 电磁波
---

# 电磁波

<div class="page-grow" style="--page-gap: .8rem">
<div class="ask">周期性变化的电场在空间激起周期性变化的磁场，这个变化的磁场又激起新的变化的电场——<b>这样下去会怎样？</b></div>

<div v-click="1" class="figure"><EmWaveChain :step="$clicks" /></div>

<div v-click="4" class="tip-hint">变化的电场和磁场交替产生，由近及远地向周围传播——空间可能存在<b>电磁波</b>。</div>
</div>

---
clicks: 2
title: 电磁波不需要介质
---

<div class="page-grow">
<div class="ask">声波靠空气、水波靠水，<b>电磁波靠什么传播？</b></div>

<div v-click="1" class="figure"><SunEarthBeamSvg /></div>

<div v-click="2" class="tip-hint">电磁波可以在真空中传播——它靠的是电场和磁场相互激发，不需要介质。</div>
</div>

---
clicks: 2
title: 电磁波的速度
---

<div class="page-grow">
<div class="ask">麦克斯韦推算电磁波传播的速度，得到了一个出人意料的答案——<b>是多少？</b></div>

<div v-click="1" class="stack">
<Latex tex="c = 3\times10^{8}\ \text{m/s}" display />
<div><b>电磁波的速度等于光速。</b></div>
</div>

<div v-click="2" class="tip-hint">麦克斯韦由此提出光的电磁理论：<b>光是以波动形式传播的一种电磁振动</b>。</div>
</div>

---
clicks: 3
title: 捕捉电磁波
---

# 捕捉电磁波

<div class="page-grow" style="--page-gap: .7rem">
<div class="ask">麦克斯韦预言了电磁波——<b>怎样才能用实验捕捉到它？</b></div>

<div class="figure"><HertzExperimentSvg :step="$clicks" /></div>

<div class="mini-note">让接收天线与发射天线平行，改变两者距离，观察电流表示数。</div>

<div v-click="3" class="tip-hint">接收天线中感应出了电流——赫兹用实验捕捉到了电磁波，证实了麦克斯韦的电磁场理论。</div>
</div>

---
clicks: 3
title: 波长、频率与波速
---

<div class="page-grow">
<div class="ask"><b>怎样描述一列波？</b></div>

<div class="figure"><WavePeakSvg :step="$clicks" /></div>

<div v-click="3" class="stack">
<div>在 <Latex tex="1\ \text{s}" /> 内有多少次波峰（或波谷）通过，频率就是多少。</div>
<div class="tip-hint"><Latex tex="v = \lambda f" />（波速 = 波长 × 频率）。</div>
</div>
</div>

---
clicks: 3
title: 电磁波的波速、波长与频率
---

<div class="page-grow page-grow-tight">
<div class="ask"><b>对电磁波，波长、频率、波速也满足同样的关系吗？</b></div>

<div v-click="1">
<Latex tex="c = \lambda f" display />
<div class="mini-note">电磁波在真空中的速度 <Latex tex="c = 3\times10^{8}\ \text{m/s}" />。</div>
</div>

<div v-click="2"><WaveCalc /></div>

<div v-click="3" class="tip-hint"><b>频率越高，波长越短</b>——这正是电磁波谱按波长（频率）排列的依据。</div>
</div>

---
clicks: 2
title: 电磁波谱
---

# 电磁波谱

<div class="page-grow">
<div class="ask">无线电波、红外线、可见光、紫外线、X 射线、γ 射线——<b>按什么顺序排列？</b></div>

<div v-click="1" class="figure"><EmSpectrum /></div>

<div v-click="2" class="stack">
<DefinitionBox term="电磁波谱">
按电磁波的波长或频率大小的顺序把它们排列起来，就是电磁波谱。
</DefinitionBox>
<div>可见光只是电磁波中的一小部分。</div>
</div>
</div>

---
clicks: 6
title: 各波段的特性与应用
---

<div class="page-grow page-grow-tight">
<div class="ask"><b>为什么不同波段的电磁波，用途不同？</b></div>

<div class="figure"><EmSpectrum :step="$clicks" /></div>

<div v-click="1" class="emw-lead">波长（频率）不同，特性不同。</div>

<div class="emw-rows">
<div v-click="1" class="emw-row"><b>无线电波（含微波）</b><span><Latex tex="\lambda > 0.1\ \text{mm}" /></span><span>广播、电视、卫星通信等信号的传输</span></div>
<div v-click="2" class="emw-row"><b>红外线</b><span><Latex tex="760\ \text{nm}\sim0.1\ \text{mm}" /></span><span>加热理疗</span></div>
<div v-click="3" class="emw-row"><b>可见光</b><span><Latex tex="400\sim760\ \text{nm}" /></span><span>让我们看见世界，也可用于通信</span></div>
<div v-click="4" class="emw-row"><b>紫外线</b><span><Latex tex="10\sim400\ \text{nm}" /></span><span>消毒</span></div>
<div v-click="5" class="emw-row"><b>X 射线</b><span>比紫外线更短</span><span>X 射线片诊断病情</span></div>
<div v-click="6" class="emw-row"><b>γ 射线</b><span>更短</span><span>摧毁病变的细胞</span></div>
</div>
</div>

---
clicks: 3
title: 电磁波的能量
---

# 电磁波的能量

<div class="page-grow" style="--page-gap: .8rem">
<div class="ask"><b>微波炉不用火、也不接触食物，为什么能把食物加热？</b></div>

<div v-click="1" class="figure"><MicrowaveOvenSvg :step="$clicks" /></div>

<div v-click="2">食物中的水分子在微波的作用下<b>热运动加剧，内能增加，温度升高</b>。</div>

<div v-click="3" class="tip-hint">食物增加的能量是微波给它的——<b>电磁波具有能量</b>；光也是一种电磁波，光具有能量。</div>
</div>

---
layout: focus-question
title: 电磁波是一种物质
---

<template v-slot:icon>

<mdi-lightbulb-on-outline />

</template>

赫兹实验之前，人们只把电磁场看作描述电磁现象的一种方法。<br />赫兹实验之后，它的意义变了吗？

<template v-slot:hint>

如果电磁场只是一种描述方式，它为什么能在接收天线里激起电流？

</template>

<template v-slot:answer>

赫兹实验证实了电磁波的存在——电磁场不只是描述方式，而是<b>真正的物质存在</b>；电磁波具有能量，<b>电磁波是一种物质</b>。

</template>

---
clicks: 2
title: 电磁波通信
---

# 电磁波通信

<div class="page-grow">
<div class="ask"><b>手机、电视、卫星宽带的信息，是怎样传到我们身边的？</b></div>

<div class="split-wide emw-comm">
<div class="stack">
<div v-click="1">电信网、广播电视网和互联网逐步整合成为统一的信息通信网络。</div>
<div v-click="1">电磁波携带的信息，既可以有线传播，也可以无线传播。</div>
<div v-click="2">卫星宽带通信网络让万米高空的飞机、茫茫大海的轮船、没有人烟的荒漠都能上网。</div>
</div>
<div v-click="2" class="figure"><SatCommSvg /></div>
</div>
</div>

---
layout: exercise-split
clicks: 2
title: 练习：微波炉的波长
---

<template v-slot:stem>

<div class="ask">家用微波炉的微波频率为 <Latex tex="2\ 450\ \text{MHz}" />，它的波长是多少？</div>

</template>

<div v-click="1">由 <Latex tex="c = \lambda f" /> 得 <Latex tex="\lambda = \dfrac{c}{f}" />。</div>

<div v-click="2"><Latex tex="\lambda = \dfrac{3\times10^{8}}{2.45\times10^{9}}\ \text{m} \approx 0.12\ \text{m}" />（约 <Latex tex="12\ \text{cm}" />）。</div>

---
layout: exercise-split
clicks: 2
title: 练习：电磁波的传播
---

<template v-slot:stem>

<div class="ask">变化的磁场和变化的电场形成不可分割的统一体——电磁场，它会由近及远地向外传播。它的传播需要介质吗？它传播的速度是多少？</div>

</template>

<div v-click="1">不需要介质（在真空中也能传播）。</div>

<div v-click="2">速度等于光速，<Latex tex="c = 3\times10^{8}\ \text{m/s}" />。</div>

---
layout: exercise-split
clicks: 2
title: 练习：天宫一号
---

<template v-slot:stem>

<div class="ask">中国航天员在天宫一号目标飞行器上成功进行了太空授课。已知天宫一号目标飞行器轨道半径为 <Latex tex="6\ 740\ \text{km}" />，地球半径为 <Latex tex="6\ 400\ \text{km}" />，试计算航天员讲课的实时画面从天宫一号目标飞行器发至地面接收站，最少需要多少时间？</div>

</template>

<template v-slot:fig>

<TiangongSvg :step="$clicks" />

</template>

<div v-click="1">电磁波沿直线传播；接收站位于天宫正下方时路程最短：</div>

<div v-click="1"><Latex tex="s = r - R = 6\ 740\ \text{km} - 6\ 400\ \text{km} = 340\ \text{km}" />。</div>

<div v-click="2"><Latex tex="t = \dfrac{s}{c} = \dfrac{3.4\times10^{5}}{3\times10^{8}}\ \text{s} \approx 1.1\times10^{-3}\ \text{s}" />。</div>

---
layout: exercise-split
clicks: 3
title: 练习：电焊弧光
---

<template v-slot:stem>

<div class="ask">电焊作业时，焊接电弧温度在 <Latex tex="3\ 000\ {}^\circ\text{C}" /> 时，辐射出大量频率为 <Latex tex="1.0\times10^{15}\ \text{Hz}" /> 的电磁波。根据波长判断，它属于哪种电磁波？电焊工人作业时，需要佩戴专业的防护头盔，这是为什么？</div>

</template>

<div v-click="1"><Latex tex="\lambda = \dfrac{c}{f} = \dfrac{3\times10^{8}}{1.0\times10^{15}}\ \text{m} = 3\times10^{-7}\ \text{m} = 300\ \text{nm}" />。</div>

<div v-click="2"><Latex tex="300\ \text{nm}" /> 在紫外线的波长范围 <Latex tex="10\sim400\ \text{nm}" /> 内，属于<b>紫外线</b>。</div>

<div v-click="3" class="tip-hint">紫外线会伤害眼睛和皮肤，所以电焊工人要戴防护头盔。</div>

---
clicks: 6
title: 课堂小结
---

# 课堂小结

<div class="page-grow">
<div v-click="1" class="summary-line"><b>电磁场</b>：变化的磁场产生电场；变化的电场产生磁场——统一的电磁场。</div>
<div v-click="2" class="summary-line"><b>电磁波</b>：变化的电场和磁场交替产生，由近及远地向周围传播。</div>
<div v-click="3" class="summary-line"><b>传播</b>：不需要介质；真空中 <Latex tex="c = 3\times10^{8}\ \text{m/s}" />，等于光速。</div>
<div v-click="4" class="summary-line"><b>证实</b>：光是波动形式传播的电磁振动；1886 年赫兹用实验捕捉到电磁波。</div>
<div v-click="5" class="summary-line"><b>描述</b>：<Latex tex="c = \lambda f" />；电磁波谱：无线电波、红外线、可见光、紫外线、X 射线、γ 射线。</div>
<div v-click="6" class="summary-line"><b>能量与通信</b>：电磁波具有能量、是一种物质；通信有有线、无线两种方式，卫星宽带是典型应用。</div>
</div>
