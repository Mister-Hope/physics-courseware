---
theme: default
title: "单摆"
subtitle: "回复力 · 周期 · 用单摆测 g"
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
chapter: "第二章 机械振动"
---

<CoverDecorationSvg />

---
layout: focus-question
title: "摆动的物体，运动是简谐运动吗？"
clicks: 1
clickAnimation: none
---

<template v-slot:icon>

<mdi-sine-wave />

</template>

<template v-slot:hint>

判断方法一：分析回复力是否与位移成正比、方向相反；方法二：看位移—时间图像是否为正弦曲线。

</template>

悬挂的小球被拉开后释放，它的运动是简谐运动吗？

---
title: "什么样的摆可以看作单摆？"
clicks: 2
clickAnimation: none
---

# 什么样的摆可以看作单摆？

<div class="page-grow">
<div class="sp-split">
<div class="figure sp-fig"><SimplePendulumSvg /></div>
<div class="stack">
<div class="mini-title">可以看作单摆的条件</div>
<div class="mini-note">实际的摆有细线质量、摆球大小、空气阻力……哪些可以忽略？</div>
<div class="sp-cond" v-click="1">
<div class="sp-cond-row"><span class="sp-no">1</span>细线的长度不可改变</div>
<div class="sp-cond-row"><span class="sp-no">2</span>细线的质量比摆球小得多</div>
<div class="sp-cond-row"><span class="sp-no">3</span>摆球的直径比细线长度小得多</div>
</div>
<div class="tip-hint" v-click="2">摆长 <Latex tex="l" /> 是悬点到摆球球心的距离，不是细线的长度。</div>
</div>
</div>
</div>

---
title: "是什么力使摆球回到平衡位置？"
clicks: 2
clickAnimation: none
---

# 是什么力使摆球回到平衡位置？

<div class="page-grow">
<div class="sp-split">
<div class="figure sp-fig"><PendulumForceSvg :step="$clicks" /></div>
<div class="stack">
<div class="sp-point"><span class="sp-key">重力 <Latex tex="G" /> 与拉力 <Latex tex="F_T" /></span>摆球受这两个力作用。</div>
<div class="sp-point" v-click="1"><span class="sp-key">切向分力 <Latex tex="F=mg\sin\theta" /></span>沿圆弧切线方向、指向平衡位置，它就是回复力。</div>
<div class="sp-point" v-click="2"><span class="sp-key">径向分力 <Latex tex="mg\cos\theta" /></span>与拉力一起提供向心力，只改变速度方向。</div>
</div>
</div>
</div>

---
title: "摆角很小时，单摆为什么做简谐运动？"
clicks: 4
clickAnimation: none
---

# 摆角很小时，单摆为什么做简谐运动？

<div class="page-grow">
<div class="sp-split">
<div class="figure sp-fig"><SmallAngleSvg /></div>
<div class="sp-derive">
<div class="mini-note">要判断是否做简谐运动，就看回复力能不能写成 <Latex tex="F=-kx" /> 的形式。</div>
<div class="sp-derive-row" v-click="1"><span class="sp-no">1</span><span><Latex tex="\theta" /> 很小时，<Latex tex="\sin\theta\approx\theta" />（弧度）。</span></div>
<div class="sp-derive-row" v-click="2"><span class="sp-no">2</span><span>弧长 <Latex tex="\approx x" />，所以 <Latex tex="\theta=\frac{x}{l}" />。</span></div>
<div class="sp-derive-row" v-click="3"><span class="sp-no">3</span><span><Latex tex="F=mg\sin\theta\approx\frac{mg}{l}x" />，方向与 <Latex tex="x" /> 相反。</span></div>
<div class="sp-derive-row" v-click="4"><span class="sp-no">4</span><span><Latex tex="F=-\frac{mg}{l}x=-kx" />，所以单摆做简谐运动。</span></div>
<div class="tip-hint" v-click="4">摆角一般不超过 <Latex tex="5^{\circ}" /><br />才能用 <Latex tex="\sin\theta\approx\theta" />。</div>
</div>
</div>
</div>

---
title: "墨汁留下的图样说明了什么？"
clicks: 2
clickAnimation: none
---

# 墨汁留下的图样说明了什么？

<div class="page-grow">
<div class="sp-split">
<div class="figure sp-fig"><InkTraceSvg /></div>
<div class="stack">
<div class="mini-note">注射器随摆球一起摆动，同时沿垂直于摆动的方向匀速拖动木板。</div>
<div class="sp-point" v-click="1"><span class="sp-key">匀速拖动</span>把时间转换成沿木板方向的距离。</div>
<div class="sp-point" v-click="2"><span class="sp-key">墨迹是正弦曲线</span>说明摆球的位移随时间按正弦规律变化，单摆做简谐运动。</div>
<div class="summary-line" v-click="2">位移—时间图像是正弦曲线，是简谐运动的判据之一。</div>
</div>
</div>
</div>

---
title: "单摆的周期与哪些因素有关？"
clicks: 3
clickAnimation: none
---

# 单摆的周期与哪些因素有关？

<div class="page-grow">
<div class="sp-rows">
<div class="sp-row">
<div class="sp-row-text"><span class="sp-no">1</span>只改变振幅（摆长、质量相同）</div>
<div class="sp-row-ans" v-click="1">周期不变 —— 与振幅无关</div>
</div>
<div class="sp-row">
<div class="sp-row-text"><span class="sp-no">2</span>只改变摆球质量（摆长、振幅相同）</div>
<div class="sp-row-ans" v-click="2">周期不变 —— 与质量无关</div>
</div>
<div class="sp-row">
<div class="sp-row-text"><span class="sp-no">3</span>只改变摆长（质量、振幅相同）</div>
<div class="sp-row-ans" v-click="3">周期改变 —— 摆长越长，周期越大</div>
</div>
</div>
<div class="tip-hint">三次实验都只改变一个量，其余量保持不变 —— 控制变量法。</div>
</div>

---
title: "单摆的周期与摆长有什么定量关系？"
clicks: 2
clickAnimation: none
---

# 单摆的周期与摆长有什么定量关系？

<div class="page-grow">
<div class="split-wide">
<div>
<div class="figure">
<CoordAxes
:x-range="[0, 1.15]"
:y-range="[0, 4.5]"
:x-axis="{ quantity: 'l', unit: 'm' }"
:y-axis="{ quantity: 'T', sup: '2' }"
:step="$clicks"
:curves="[{ formula: (l) => 4.03 * l, color: 'var(--c-accent-2)', width: 3, showAt: 1 }]"
:labels="[
{ x: 0.2, y: 0.81, dot: true, dotColor: 'var(--c-accent)' },
{ x: 0.4, y: 1.61, dot: true, dotColor: 'var(--c-accent)' },
{ x: 0.6, y: 2.4, dot: true, dotColor: 'var(--c-accent)' },
{ x: 0.8, y: 3.24, dot: true, dotColor: 'var(--c-accent)' },
{ x: 1.0, y: 4.03, dot: true, dotColor: 'var(--c-accent)' }
]"
/>
</div>
<div class="fig-cap">纵轴 <Latex tex="T^2" /> 的单位是 <Latex tex="\text{s}^2" />。</div>
</div>
<div class="stack stack-tight">
<table class="data-table p8-table">
<thead><tr><th><Latex tex="l/\text{m}" /></th><th><Latex tex="T/\text{s}" /></th><th><Latex tex="T^2/\text{s}^2" /></th></tr></thead>
<tbody>
<tr><td>0.20</td><td>0.90</td><td>0.81</td></tr>
<tr><td>0.40</td><td>1.27</td><td>1.61</td></tr>
<tr><td>0.60</td><td>1.55</td><td>2.40</td></tr>
<tr><td>0.80</td><td>1.80</td><td>3.24</td></tr>
<tr><td>1.00</td><td>2.01</td><td>4.03</td></tr>
</tbody>
</table>
<div class="mini-note">某次实验数据，摆角小于 <Latex tex="5^{\circ}" />。</div>
<div class="sp-point" v-click="1"><span class="sp-key">近似共线</span>五个数据点几乎落在一条过原点的直线上。</div>
<div class="sp-point" v-click="2"><span class="sp-key">成正比</span><Latex tex="T^2\propto l" />，所以 <Latex tex="T\propto\sqrt{l}" />。</div>
</div>
</div>
</div>

---
title: "单摆的周期公式是什么？"
clicks: 2
clickAnimation: none
---

# 单摆的周期公式是什么？

<div class="page-grow">
<div class="sp-split">
<div class="stack">
<div class="sp-formula-big"><Latex tex="T=2\pi\sqrt{\frac{l}{g}}" display /></div>
<div class="mini-note">实验表明：<Latex tex="T\propto\sqrt{l}" />，<Latex tex="T" /> 与 <Latex tex="\sqrt{g}" /> 成反比，与振幅、摆球质量无关。</div>
</div>
<div class="stack stack-tight">
<div class="sp-point"><span class="sp-key">平方根关系</span>摆长变为原来的 <Latex tex="4" /> 倍，周期变为原来的 <Latex tex="2" /> 倍。</div>
<div class="sp-point" v-click="1"><span class="sp-key">重力加速度</span>同一个摆拿到月球上，<Latex tex="g" /> 变小，周期变大。</div>
<div class="sp-point" v-click="2"><span class="sp-key">适用条件</span>摆角很小（一般不超过 <Latex tex="5^{\circ}" />），细线质量、摆球大小可忽略。</div>
<div class="tip-hint" v-click="2">惠更斯发现周期与 <Latex tex="\sqrt{l}" /> 成正比、与 <Latex tex="\sqrt{g}" /> 成反比，得到了这个公式。</div>
</div>
</div>
</div>

---
title: "摆长或重力加速度改变，周期怎样变？"
clicks: 1
clickAnimation: none
---

# 摆长或重力加速度改变，周期怎样变？

<div class="page-grow">
<PendulumLab />
<div class="summary-line" v-click="1">摆长越长、重力加速度越小，周期越大；反之周期越小。</div>
</div>

---
title: "摆钟为什么能计时？"
clicks: 2
clickAnimation: none
---

# 摆钟为什么能计时？

<div class="page-grow">
<div class="sp-split">
<div class="sp-fig"><ClockPendulumSvg /></div>
<div class="stack stack-tight">
<div class="sp-clock-lead"><mdi-clock-outline class="icon-md text-accent" /><div>摆钟把单摆的<strong>等时性</strong>变成了走时。</div></div>
<div class="sp-point" v-click="1"><span class="sp-key">计数</span>摆每完成一次全振动，擒纵机构就让齿轮转过一齿，指针随之前进。</div>
<div class="sp-point" v-click="2"><span class="sp-key">校准</span>走时不准时调节摆锤位置：摆长变长，<Latex tex="T" /> 变大，钟走慢；摆长变短则走快。</div>
<div class="tip-hint" v-click="2">惠更斯在 1656 年制成了第一座摆钟，靠的就是 <Latex tex="T=2\pi\sqrt{l/g}" />。</div>
</div>
</div>
</div>

---
title: "怎样用单摆测重力加速度？"
clicks: 3
clickAnimation: none
---

# 怎样用单摆测重力加速度？

<div class="page-grow">
<div class="sp-split">
<div class="stack">
<div class="sp-formula-big"><Latex tex="g=\frac{4\pi^2 l}{T^2}" display /></div>
<div class="mini-note">由 <Latex tex="T=2\pi\sqrt{l/g}" /> 解出。</div>
<div class="sp-example" v-click="2"><span class="sp-key">示例</span><Latex tex="l=1.00\ \text{m}" />，50 次全振动用时 <Latex tex="100.5\ \text{s}" />，<Latex tex="T=2.01\ \text{s}" />，得 <Latex tex="g\approx 9.77\ \text{m/s}^2" />。</div>
</div>
<div class="stack stack-tight">
<div class="sp-derive-row"><span class="sp-no">1</span><span>测摆长：<Latex tex="l" /> 等于细线长加摆球半径。</span></div>
<div class="sp-derive-row"><span class="sp-no">2</span><span>测周期：数 <Latex tex="30\sim 50" /> 次全振动，<br />用总时间 <Latex tex="t" /> 求 <Latex tex="T=t/n" />。</span></div>
<div class="sp-derive-row"><span class="sp-no">3</span><span>代入公式求 <Latex tex="g" />，多次测量取平均值。</span></div>
<div class="tip-hint" v-click="1">摆角小于 <Latex tex="5^{\circ}" />，摆长量到球心。</div>
<div class="sp-point" v-click="3"><span class="sp-key">为什么测多次</span>全振动次数越多，计时的相对误差越小。</div>
</div>
</div>
</div>

---
layout: exercise-split
title: "例题：秒摆的摆长是多少？"
clicks: 2
clickAnimation: none
analysisLabel: 解答
class: ex-top
---

<template v-slot:stem>

周期为 **2 s** 的单摆叫做秒摆。求秒摆的摆长（<Latex tex="g" /> 取 <Latex tex="9.8\ \text{m/s}^2" />，结果保留两位有效数字）。

</template>

<div class="sp-point" v-click="1"><span class="sp-key">由周期公式变形</span>由 <Latex tex="T=2\pi\sqrt{l/g}" /> 得 <Latex tex="l=\frac{gT^2}{4\pi^2}" />。</div>
<div class="sp-point" v-click="2"><span class="sp-key">代入数据</span><Latex tex="l=\frac{9.8\times 2.0^2}{4\times 3.14^2}\approx 0.99\ \text{m}" />。</div>
<div class="summary-line" v-click="2">秒摆的摆长约为 <Latex tex="0.99\ \text{m}" />（接近 <Latex tex="1\ \text{m}" />）。</div>

---
title: "练习：重力加速度减半，周期怎样变？"
layout: exercise-split
clicks: 2
clickAnimation: none
class: ex-top
---

<template v-slot:stem>

一个理想单摆的周期为 <Latex tex="T" />。如果它所在处的重力加速度变为原来的 <Latex tex="1/2" />，周期变为原来的多少倍？

</template>

<div class="sp-point" v-click="1"><span class="sp-key">写出周期公式</span><Latex tex="T=2\pi\sqrt{l/g}" />，周期由摆长和重力加速度共同决定。</div>
<div class="sp-point" v-click="2"><span class="sp-key">代入变化后的 g</span><Latex tex="T'=2\pi\sqrt{\frac{l}{g/2}}=2\pi\sqrt{\frac{2l}{g}}=\sqrt{2}\,T" />。</div>
<div class="summary-line" v-click="2">周期变为原来的 <Latex tex="\sqrt{2}" /> 倍，约为 <Latex tex="1.41" /> 倍。</div>

---
title: "练习：秒摆拿到月球上"
layout: exercise-split
clicks: 3
clickAnimation: none
class: ex-top
---

<template v-slot:stem>

周期为 <Latex tex="2\ \text{s}" /> 的单摆叫秒摆。取 <Latex tex="g=9.8\ \text{m/s}^2" />，月球表面的 <Latex tex="g_{\text{月}}=1.6\ \text{m/s}^2" />。
（1）求秒摆的摆长；<br />（2）把这个秒摆拿到月球上，做 <Latex tex="50" /> 次全振动需要多长时间？

</template>

<div class="sp-derive-row" v-click="1"><span class="sp-no">1</span><span>由 <Latex tex="T=2\pi\sqrt{l/g}" /> 得<br /><Latex tex="l=\frac{gT^2}{4\pi^2}\approx\frac{9.8\times 2.0^2}{4\times 3.14^2}\approx 0.99\ \text{m}" />。</span></div>
<div class="sp-derive-row" v-click="2"><span class="sp-no">2</span><span>月球上周期 <Latex tex="T_{\text{月}}=2\pi\sqrt{\frac{l}{g_{\text{月}}}}\approx 2\pi\sqrt{\frac{0.99}{1.6}}\approx 4.95\ \text{s}" />。</span></div>
<div class="sp-derive-row" v-click="3"><span class="sp-no">3</span><span><Latex tex="50" /> 次全振动用时 <Latex tex="t=50T_{\text{月}}\approx 248\ \text{s}\approx 4.1\ \text{min}" />。</span></div>
<div class="summary-line" v-click="3">秒摆的摆长约为 <Latex tex="1\ \text{m}" />；同一摆拿到月球上，周期变长，计时变慢。</div>

---
title: "练习：从振动图像比较两个单摆"
layout: exercise-split
clicks: 2
clickAnimation: none
class: ex-top
---

<template v-slot:stem>

图 2.4-7（改编示意）是两个单摆的振动图像。
（1）甲、乙的摆长之比是多少？
（2）以向右为位移正方向，从 <Latex tex="t=0" /> 起，乙第一次到达右方最大位移时，甲在什么位置、向什么方向运动？

</template>

<template v-slot:fig>

<div class="p16-fig">
<CoordAxes
:x-range="[0, 4.4]"
:y-range="[-6, 6]"
:x-axis="{ quantity: 't', unit: 's' }"
:y-axis="{ quantity: 'x', unit: 'cm' }"
:curves="[
{ formula: (t) => 5 * Math.sin(Math.PI * t), color: 'var(--c-accent-2)', width: 2.4 },
{ formula: (t) => 5 * Math.sin((Math.PI * t) / 2), color: 'var(--c-accent)', width: 2.4 }
]"
/>
<div class="fig-cap"><span class="p16-a">甲：<Latex tex="T=2\ \text{s}" /></span>　<span class="p16-b">乙：<Latex tex="T=4\ \text{s}" /></span></div>
</div>

</template>

<div class="sp-point" v-click="1"><span class="sp-key">（1）摆长之比</span>由 <Latex tex="T=2\pi\sqrt{l/g}" /> 得 <Latex tex="l\propto T^2" />，所以 <Latex tex="l_{\text{甲}}:l_{\text{乙}}=T_{\text{甲}}^2:T_{\text{乙}}^2=1:4" />。</div>
<div class="sp-point" v-click="2"><span class="sp-key">（2）位置与方向</span>乙在 <Latex tex="t=1\ \text{s}" /> 第一次到达右方最大位移；此时甲正好回到平衡位置，向负方向（左）运动。</div>

---
title: "这一节：单摆为什么能做简谐运动？"
clicks: 0
clickAnimation: none
---

# 这一节：单摆为什么能做简谐运动？

<div class="page-grow">
<div class="sp-split">
<div class="stack">
<div class="sp-point"><span class="sp-key">模型</span>细线 + 小球，摆长是悬点到球心的距离，摆角要小。</div>
<div class="sp-point"><span class="sp-key">回复力</span>重力沿圆弧切向的分力；摆角很小时 <Latex tex="F=-\frac{mg}{l}x=-kx" />。</div>
<div class="sp-point"><span class="sp-key">周期</span><Latex tex="T=2\pi\sqrt{l/g}" />，只与摆长、重力加速度有关。</div>
</div>
<div class="stack">
<div class="sp-formula-big"><Latex tex="T=2\pi\sqrt{\frac{l}{g}}" display /></div>
<div class="mini-note">用单摆测重力加速度：<Latex tex="g=\frac{4\pi^2 l}{T^2}" />。</div>
</div>
</div>
</div>

---
title: "从日晷到原子钟"
clicks: 0
clickAnimation: none
---

# 从日晷到原子钟

<div class="page-grow">
<div class="sp-clock-lead"><mdi-history class="icon-md text-accent" /><div>计时工具的每一次进步，都来自更稳定的周期。</div></div>
<div class="sp-timeline">
<div class="sp-timeline-item"><mdi-weather-sunny class="sp-timeline-icon" /><span class="sp-timeline-name">日晷</span><span class="sp-timeline-desc">影子随太阳转动</span></div>
<div class="sp-timeline-arrow">→</div>
<div class="sp-timeline-item"><mdi-water-outline class="sp-timeline-icon" /><span class="sp-timeline-name">水钟 · 沙漏</span><span class="sp-timeline-desc">流水、流沙速率稳定</span></div>
<div class="sp-timeline-arrow">→</div>
<div class="sp-timeline-item"><mdi-clock-outline class="sp-timeline-icon" /><span class="sp-timeline-name">摆钟</span><span class="sp-timeline-desc">1656 年，惠更斯制成</span></div>
<div class="sp-timeline-arrow">→</div>
<div class="sp-timeline-item"><mdi-watch class="sp-timeline-icon" /><span class="sp-timeline-name">石英钟</span><span class="sp-timeline-desc">石英晶体稳定振动</span></div>
<div class="sp-timeline-arrow">→</div>
<div class="sp-timeline-item"><mdi-atom class="sp-timeline-icon" /><span class="sp-timeline-name">原子钟</span><span class="sp-timeline-desc">原子跃迁频率极稳定</span></div>
</div>
<div class="mini-note">冷原子钟的误差可以做到 3 亿年不到 1 s。</div>
<div class="summary-line">摆钟把等时性变成走时；原子钟把稳定频率变成更精确的时间。</div>
</div>

---
title: "下一节：到实验室用单摆测 g"
clicks: 0
clickAnimation: none
---

# 下一节：到实验室用单摆测 $g$

<div class="page-grow">
<div class="sp-split">
<div class="stack">
<div class="sp-point"><span class="sp-key">测摆长</span>细线长加摆球半径，量到球心。</div>
<div class="sp-point"><span class="sp-key">测周期</span>摆角小于 <Latex tex="5^{\circ}" />，测 <Latex tex="30\sim 50" /> 次全振动的总时间。</div>
<div class="sp-point"><span class="sp-key">处理数据</span>用公式求 <Latex tex="g" />，多次测量取平均值。</div>
</div>
<div class="stack">
<div class="sp-formula-big"><Latex tex="g=\frac{4\pi^2 l}{T^2}" display /></div>
<div class="mini-note">作 <Latex tex="T^2-l" /> 图线，<br />斜率 <Latex tex="k=\frac{4\pi^2}{g}" />，由斜率求 <Latex tex="g" />。</div>
</div>
</div>
<div class="tip-hint">换不同摆长多测几组，数据更可靠。</div>
</div>
