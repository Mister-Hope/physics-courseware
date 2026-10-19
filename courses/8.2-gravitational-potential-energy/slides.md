---
theme: default
title: "重力势能"
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
chapter-no: "8.2"
chapter: "第八章 机械能守恒定律"
subtitle: "重力做功与重力势能"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
title: 引课 竖直下落与竖直抬升时重力做的功
---

<div class="page-grow">
<div class="ask">物体竖直下落（或竖直抬升）一段高度，重力做的功是多少？</div>

<div class="figure"><VerticalRiseFallSvg :show-forces="$clicks >= 1" /></div>

<div v-click="2"><div class="summary-line">下落时 <Latex tex="h_1 > h_2" />、<Latex tex="W_G > 0" />，重力做正功；抬升时 <Latex tex="h_1 < h_2" />、<Latex tex="W_G < 0" />，重力做负功。</div></div>

<div v-click="2"><Latex tex="W_G = mg\Delta h = mgh_1 - mgh_2" display /></div>
</div>

---
layout: base-flex
clicks: 3
title: 任意路径上重力做的功 微元法
---

<div class="page-grow">
<div class="ask">沿任意路径从高 <Latex tex="h_1" /> 降到 <Latex tex="h_2" />：把路径分成许多段很短的间隔，每一段都近似看作一段倾斜的直线——重力做的功还是 <Latex tex="mg\Delta h" /> 吗？</div>

<div class="figure"><CurvePathMicroSvg :step="$clicks" /></div>

<div v-click="2"><div class="summary-line">看其中一小段：位移 <Latex tex="l_i" /> 与重力方向成 <Latex tex="\theta_i" /> 角，<Latex tex="W_i = (mg\cos\theta_i)l_i" />；又 <Latex tex="l_i\cos\theta_i = \Delta h_i" />，得 <Latex tex="W_i = mg\Delta h_i" />。</div></div>

<div v-click="3"><Latex tex="W_G = mg\Delta h_1 + mg\Delta h_2 + mg\Delta h_3 + \cdots = mg\Delta h = mgh_1 - mgh_2" display /></div>
</div>

---
layout: base-flex
clicks: 3
title: 重力做功的特点
---

<div class="page-grow">
<div class="figure"><PathCompareSvg /></div>

<div v-click="1"><div class="summary-line">竖直 <Latex tex="mg\Delta h" />｜斜面 <Latex tex="(mg\cos\theta)l = mg\Delta h" />｜曲面 <Latex tex="mg\Delta h_1 + mg\Delta h_2 + \cdots = mg\Delta h" /></div></div>

<div class="tip-hint" v-click="3">物体运动时，重力对它做的功只跟它的起点和终点的位置有关，而跟物体运动的路径无关——斜面的倾角、长度、光滑与否都不影响它。</div>

<div class="summary-line" v-click="2">三条路径上都是 <Latex tex="W_G = mgh_1 - mgh_2" />。</div>
</div>

---
layout: base-flex
clicks: 2
title: 重力势能
---

<div class="page-grow">
<div class="ask">所有路径上重力做的功都是 <Latex tex="mgh_1 - mgh_2" />。<Latex tex="mgh" /> 到底是一个什么量？</div>

<div v-click="1">
<DefinitionBox term="重力势能" tone="gold">
<div>物体在两个位置上的 <Latex tex="mgh" /> 之差等于重力做的功，且只由初、末位置决定——<Latex tex="mgh" /> 叫作物体的<span class="def-term">重力势能</span> <Latex tex="E_p" />，是标量，单位焦耳 <Latex tex="\text{J}" />。</div>
<Latex tex="E_p = mgh" display />
</DefinitionBox>
</div>

<div class="warn-hint" v-click="2"><Latex tex="E_p = mgh" /> 是<b>某一个位置</b>的重力势能；<Latex tex="W_G = mgh_1 - mgh_2" /> 是<b>两个位置势能之差</b>——不要把高度差 <Latex tex="\Delta h" /> 当成重力势能。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 势能

<div class="page-grow">
<div class="ask">若重力做的功与路径有关，我们还能把 <Latex tex="mgh" /> 叫作物体的重力势能吗？为什么？</div>

<div class="tip-hint" v-click="1">不能。只有做功<b>与路径无关</b>的力，才能为它定义势能：两点之间的势能之差被这个力做的功唯一确定。势能也叫位能，它由相互作用物体的相对位置决定，并属于它们组成的系统。</div>

<div class="stack" v-click="2">
<div class="summary-line">能定义势能：重力、弹力、万有引力——它们的功只由初、末位置决定。</div>
<div class="summary-line">不能定义势能：摩擦力做的功与路径有关，没有对应的势能。</div>
</div>

<div class="info-hint" v-click="3">重力势能属于地球与物体组成的系统；它只由两者的相对位置决定。</div>
</div>

---
layout: base-flex
clicks: 2
title: 万有引力势能
---

<div class="page-grow">
<div class="ask">万有引力也是只由位置决定的力——它的势能是什么样？</div>

<div class="figure"><GravitationalFieldSvg /></div>

<div v-click="1"><Latex tex="E_p = -\dfrac{GMm}{r}" display /></div>

<div v-click="1"><div class="summary-line"><Latex tex="G" /> 万有引力常量、<Latex tex="M" /> 地球质量、<Latex tex="m" /> 物体质量、<Latex tex="r" /> 到地心距离。</div></div>

<div class="summary-line" v-click="2">它与重力势能是同一类：只由相对位置决定，而且零势能面取在无穷远，所以地球附近 <Latex tex="E_p" /> 总是负值；在近地表 <Latex tex="g" /> 可看作常量，就得到 <Latex tex="E_p = mgh" />。</div>
</div>

---
layout: base-flex
clicks: 2
title: 重力做的功与重力势能的关系
---

<div class="page-grow">
<div class="ask">重力做的功，跟重力势能的变化是什么关系？</div>

<div class="figure"><VerticalRiseFallSvg :show-forces="true" :show-energy="$clicks >= 2" /></div>

<div v-click="1"><Latex tex="W_G = E_{p1} - E_{p2}" display /></div>

<div v-click="2"><div class="summary-line">高 → 低：<Latex tex="W_G > 0" />、<Latex tex="E_{p1} > E_{p2}" />，势能减少；低 → 高：<Latex tex="W_G < 0" />、<Latex tex="E_{p1} < E_{p2}" />，势能增加，即 <Latex tex="W_G = -\Delta E_p" />。</div></div>
</div>

---
layout: exercise-split
clicks: 3
title: 练习一 足球上升与下落
---

<template v-slot:stem>

<div><b class="ex-no">练习一</b>　质量为 <Latex tex="m" /> 的足球在地面 1 的位置被踢出后落到地面 3 的位置，在空中达到的最高点 2 的高度为 <Latex tex="h" />。重力加速度为 <Latex tex="g" />。（1）足球由位置 1 运动到位置 2 时，重力做了多少功？足球的重力势能增加了多少？（2）足球由位置 2 运动到位置 3 时，重力做了多少功？足球的重力势能减少了多少？</div>

</template>

<template v-slot:fig>

<FootballPathSvg :show-forces="$clicks >= 1" />

</template>

<div v-click="1">（1）<Latex tex="W_G = -mgh" />，重力做负功，重力势能增加 <Latex tex="mgh" />。</div>

<div v-click="2">（2）<Latex tex="W_G = +mgh" />，重力势能减少 <Latex tex="mgh" />。</div>

<div class="tip-hint" v-click="3">两段 <Latex tex="W_G" />：大小相等、符号相反。</div>

---
layout: base-flex
clicks: 2
title: 参考平面
---

<div class="page-grow">
<div class="ask">说物体在 <Latex tex="4\ \text{m}" /> 高处的重力势能是 <Latex tex="40\ \text{J}" />，这个高度是从哪儿量起的？</div>

<div class="figure"><ReferencePlaneSvg :show-signs="$clicks >= 2" /></div>

<div v-click="1">
<DefinitionBox term="参考平面" tone="blue">
<div>重力势能总是相对于某一水平面来说的，这个水平面叫作<span class="def-term">参考平面</span>（零势能面）。</div>
<div v-click="2">在参考平面上 <Latex tex="E_p" /> 取为 <Latex tex="0" />（通常选地面）；上方 <Latex tex="h > 0" />、<Latex tex="E_p > 0" />，下方 <Latex tex="h < 0" />、<Latex tex="E_p < 0" />——负值表示比在参考平面上具有的小。</div>
</DefinitionBox>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 只关心重力势能的差值
---

<div class="page-grow">
<div class="ask">取 <Latex tex="m = 1.0\ \text{kg}" />、<Latex tex="g = 10\ \text{m/s}^2" />，物体 A 在 <Latex tex="4.0\ \text{m}" /> 高处、落到地面上的 B 点。零势能面可以随便取、数值可以随便变——那我们到底该关心什么？</div>

<table class="data-table">
<thead>
<tr><th>零势能面（参考平面）</th><th><Latex tex="E_{pA}" /></th><th><Latex tex="E_{pB}" /></th><th>整个下落过程 <Latex tex="W_G" /></th><th><Latex tex="\Delta E_p" /></th></tr>
</thead>
<tbody>
<tr><td>地面（<Latex tex="0\ \text{m}" />）</td><td><Latex tex="+40\ \text{J}" /></td><td><Latex tex="0\ \text{J}" /></td><td><Latex tex="40\ \text{J}" /></td><td><Latex tex="-40\ \text{J}" /></td></tr>
<tr><td>珠穆朗玛峰峰顶（<Latex tex="+8848.86\ \text{m}" />）</td><td><Latex tex="-88\ 448.6\ \text{J}" /></td><td><Latex tex="-88\ 488.6\ \text{J}" /></td><td><Latex tex="40\ \text{J}" /></td><td><Latex tex="-40\ \text{J}" /></td></tr>
<tr><td>马里亚纳海沟底（<Latex tex="-11\ 034\ \text{m}" />）</td><td><Latex tex="+110\ 380\ \text{J}" /></td><td><Latex tex="+110\ 340\ \text{J}" /></td><td><Latex tex="40\ \text{J}" /></td><td><Latex tex="-40\ \text{J}" /></td></tr>
</tbody>
</table>

<div class="tip-hint" v-click="1">三行里 <Latex tex="W_G" /> 与 <Latex tex="\Delta E_p" /> 完全相同——它们只由起点、终点的高度差决定：数值本身没有意义，有价值的是<b>差值</b>。要把这份能量用出来，物体必须落到某个位置，起作用的正是两点的落差。</div>
</div>

---
layout: base-flex
clicks: 1
title: 换一个零势能面，哪些量会变
---

<div class="page-grow">
<div class="ask">把零势能面从地面改到别的位置，哪些量变了、哪些量没变？</div>

<ReferencePlaneLab />

<div class="tip-hint" v-click="1"><Latex tex="E_{pA}" />、<Latex tex="E_{pB}" /> 的读数随零势能面改变，<Latex tex="W_G" /> 与 <Latex tex="\Delta E_p" /> 始终不变。</div>
</div>

---
layout: base-flex
clicks: 3
title: 例题 小球下落：两种参考平面的数据
---

<div class="page-grow">
<div><b class="ex-no">例题</b>　质量为 <Latex tex="0.5\ \text{kg}" /> 的小球从桌面以上高 <Latex tex="h_1 = 1.2\ \text{m}" /> 的 A 点下落到地面上的 B 点，桌面高 <Latex tex="h_2 = 0.8\ \text{m}" />，<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />。（1）在表格的空白处按要求填入数据。（2）如果下落时有空气阻力，表格中的数据是否会改变？</div>

<div class="ep-table-grid">
<div class="figure"><FallingBallSvg /></div>
<div>
<table class="data-table">
<thead>
<tr><th>参考平面</th><th>小球在 A 点的重力势能</th><th>小球在 B 点的重力势能</th><th>整个下落过程中重力做的功</th><th>重力势能的变化量</th></tr>
</thead>
<tbody>
<tr v-click="1"><td>桌面</td><td><Latex tex="6\ \text{J}" /></td><td><Latex tex="-4\ \text{J}" /></td><td><Latex tex="10\ \text{J}" /></td><td><Latex tex="-10\ \text{J}" /></td></tr>
<tr v-click="2"><td>地面</td><td><Latex tex="10\ \text{J}" /></td><td><Latex tex="0\ \text{J}" /></td><td><Latex tex="10\ \text{J}" /></td><td><Latex tex="-10\ \text{J}" /></td></tr>
</tbody>
</table>
</div>
</div>

<div class="tip-hint" v-click="3">两行的 <Latex tex="W_G" />、<Latex tex="\Delta E_p" /> 相同；有阻力时数据也不变。</div>
</div>

---
layout: exercise-split
clicks: 2
title: 练习二 说法 1、2
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　以下说法是否正确？如果正确，说出一种可能的实际情况；如果不正确，说明这种说法为什么错误。</div>

<div>（1）物体受拉力作用向上运动，拉力做的功是 <Latex tex="1\ \text{J}" />，但物体重力势能的增加量不是 <Latex tex="1\ \text{J}" />。</div>

<div>（2）物体受拉力作用向上匀速运动，拉力做的功是 <Latex tex="1\ \text{J}" />，但物体重力势能的增加量不是 <Latex tex="1\ \text{J}" />。</div>

</template>

<div v-click="1">（1）<b class="ok">正确</b>。物体可以加速上升（<Latex tex="F > mg" />），此时 <Latex tex="mgh < Fl = 1\ \text{J}" />，重力势能增加量小于 <Latex tex="1\ \text{J}" />。</div>

<div v-click="2">（2）<b class="bad">错误</b>。匀速上升时 <Latex tex="F = mg" />，<Latex tex="mgh = Fl = 1\ \text{J}" />，重力势能增加量正好是 <Latex tex="1\ \text{J}" />。</div>

---
layout: exercise-split
clicks: 2
title: 练习二 说法 3、4
---

<template v-slot:stem>

<div><b class="ex-no">练习二</b>　（3）物体运动，重力做的功是 <Latex tex="-1\ \text{J}" />，但物体重力势能的增加量不是 <Latex tex="1\ \text{J}" />。</div>

<div>（4）没有摩擦时物体由 A 沿直线运动到 B，重力做的功是 <Latex tex="-1\ \text{J}" />；有摩擦时物体由 A 沿曲线运动到 B，重力做的功大于 <Latex tex="-1\ \text{J}" />。</div>

</template>

<div v-click="1">（3）<b class="bad">错误</b>。由 <Latex tex="W_G = E_{p1} - E_{p2} = -1\ \text{J}" /> 得 <Latex tex="E_{p2} - E_{p1} = 1\ \text{J}" />，重力势能增加量就是 <Latex tex="1\ \text{J}" />。</div>

<div v-click="2">（4）<b class="bad">错误</b>。重力做功与路径无关：有没有摩擦、沿直线还是沿曲线，重力做的功都是 <Latex tex="-1\ \text{J}" />，不会大于 <Latex tex="-1\ \text{J}" />。</div>

---
layout: base-flex
clicks: 4
title: 提塑料袋：手做的功与重心
---

<div class="page-grow">
<div class="ask">装了水的塑料袋放在桌面上。从侧边往上提、捏住底部的角往上拉——两种提法里，手对袋子做的是正功还是负功？</div>

<div v-click="1"><div class="summary-line">手往上提，手抓的那一处跟着上移：两种提法里，手对袋子的力都向上、那一处的位移也向上，夹角小于 <Latex tex="90^\circ" />——手对袋子都做正功。</div></div>

<div v-click="2"><div class="summary-line">两种提法都使袋子的重心升高，重力势能增大。</div></div>

<div v-click="3"><div class="summary-line">袋子静止时的姿态，就是它重力势能最低的状态。</div></div>

<div class="tip-hint" v-click="4">做功的正负只看力与位移的夹角，不看手抓在哪里；重心升高（<Latex tex="E_p = mgh" /> 中的 <Latex tex="h" /> 变大），重力势能就增大。</div>
</div>

---
layout: base-flex
clicks: 2
title: 弹性势能
---

<div class="page-grow">
<div class="ask">拉长的弓、压缩的弹簧、弯曲的撑竿有什么共同点？它们储存的能量由什么决定？</div>

<div class="figure"><ElasticEnergySvg /></div>

<div v-click="1">
<DefinitionBox term="弹性势能" tone="gold">
<div>发生弹性形变的物体的各部分之间，由于有弹力的相互作用，也具有势能。</div>
</DefinitionBox>
</div>

<div class="summary-line" v-click="2">弹性限度内，形变量越大、劲度系数越大，弹性势能越大。</div>
</div>

---
layout: base-flex
clicks: 3
title: 弹簧弹性势能的表达式
---

<div class="page-grow">
<div class="figure"><SpringStretchSvg /></div>

<div v-click="1"><div class="summary-line">弹力是变力，<Latex tex="W = Fl" /> 不能直接用——弹力与形变量成正比 <Latex tex="F = kx" />，力与位移成正比，可以用平均力求功。</div></div>

<div v-click="2"><Latex tex="E_p = W = \bar F x = \dfrac{0 + kx}{2}\,x = \dfrac{1}{2}kx^2" display /></div>

<div class="warn-hint" v-click="3">课本上没有这个公式：做题时必须先写出用平均力求功这一步——<Latex tex="F = kx" />，<Latex tex="\bar F = \dfrac{0 + kx}{2}" />，再得 <Latex tex="E_p = \dfrac{1}{2}kx^2" />。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 课堂小结

<div class="page-grow">
<div v-click="1"><div class="summary-line">重力做的功只跟起点和终点的位置有关，跟路径无关：<Latex tex="W_G = mgh_1 - mgh_2" />。</div></div>
<div v-click="2"><div class="summary-line">重力势能 <Latex tex="E_p = mgh" />，是标量，单位是焦耳 <Latex tex="\text{J}" />。</div></div>
<div v-click="2"><div class="summary-line">只有做功与路径无关的力，才能为它定义势能。</div></div>
<div v-click="3"><div class="summary-line"><Latex tex="W_G = E_{p1} - E_{p2}" />：重力做正功，重力势能减少；重力做负功，重力势能增加。</div></div>
<div v-click="4"><div class="summary-line">重力势能的数值取决于零势能面的选择，本身没有意义；有意义的只是它的差值。</div></div>
</div>
