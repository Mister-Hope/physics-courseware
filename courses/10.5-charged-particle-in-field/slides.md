---
theme: default
title: "带电粒子在电场中的运动"
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
chapter-no: "10.5"
chapter: "第十章 静电场中的能量"
subtitle: 电场中的加速与偏转
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
title: 电子在加速器中受到什么力
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask ask-lead">医用电子直线加速器把电子加速后轰击重金属靶，产生射线用于放射治疗。电子在加速器中受到什么力而加速？</div>
<div v-click="1">电子带负电，在电场中受到与电场方向相反的<b>静电力</b>，这个力使电子加速。</div>
<div class="tip-hint" v-click="2">静电力做正功，电子的动能增加。</div>
</div>
<div class="figure"><LinacDeviceSvg :show-force="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 带电粒子在电场中的加速

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">电子（质量 <Latex tex="m" />、电荷量 <Latex tex="e" />）从负极板旁由静止释放，两板间电压为 <Latex tex="U" />。电子到达正极板时的速度多大？</div>
<div v-click="1"><b>思路一</b>：牛顿第二定律 + 匀变速直线运动公式——先求加速度 <Latex tex="a = \frac{eU}{md}" />，再由 <Latex tex="v^2 = 2ad" /> 求速度。</div>
<div v-click="2"><b>思路二</b>：静电力做功 + 动能定理——由 <Latex tex="W = eU" /> 直接求速度。</div>
<div class="info-hint" v-click="3">匀强电场、且要分析运动时间等过程量 → 思路一；只涉及位移、速率，或电场不均匀 → 思路二。</div>
</div>
<div class="figure"><AccelerateSvg :show-force="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 用动能定理求加速后的速度

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">用动能定理求加速后的速度，要分哪几步？</div>
<div v-click="1">① 静电力做正功：<Latex tex="W = eEd = eU" />（静电力与位移同向）。</div>
<div v-click="2">② 初动能为零，由动能定理：<Latex tex="W = \dfrac{1}{2}mv^2 - 0" />。</div>
<div v-click="3"><Latex tex="eU = \dfrac{1}{2}mv^2" />，得 <Latex tex="v = \sqrt{\dfrac{2eU}{m}}" />。</div>
<div class="tip-hint" v-click="4">加速后的动能等于静电力做的功，只由电荷量与电势差 <Latex tex="U" /> 决定。</div>
</div>
<div class="figure"><AccelerateSvg :show-force="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
class: title-ask
---

# 两板距离改变，末速度变吗？

<div class="page-grow page-around">
<div class="stack">
<div class="ask">保持加速电压 <Latex tex="U" /> 不变，把两金属板的距离增大为原来的 2 倍。电子到达另一板时的速度怎样变化？到达的时间怎样变化？</div>
<div v-click="1">末速度不变：<Latex tex="eU = \dfrac{1}{2}mv^2" /> 中只有 <Latex tex="U" />，与板间距离 <Latex tex="d" /> 无关。</div>
<div v-click="2">加速度 <Latex tex="a = \dfrac{eU}{md}" /> 变为原来的一半，加速时间 <Latex tex="t = \dfrac{v}{a}" /> 变为原来的 2 倍。</div>
<div class="info-hint" v-click="3">若板间电场不均匀，只要初、末位置的电势差仍为 <Latex tex="U" />，静电力做的功仍是 <Latex tex="eU" />，末速度仍由 <Latex tex="eU = \dfrac{1}{2}mv^2" /> 决定。</div>
</div>
</div>

---
layout: exercise-split
clicks: 2
class: tight-gap
title: 例题一　直线加速器中的圆筒
---

<template v-slot:stem>

<div><b class="ex-no">例题一</b>　多个横截面积相同的金属圆筒依次排列，中心轴线在同一直线上。奇数圆筒与交流电源的一极相连，偶数圆筒与另一极相连。电子（质量 <Latex tex="m" />、电荷量 <Latex tex="e" />）从序号为 0 的金属圆板中央由静止出发，沿轴线冲进圆筒 1。交流电压的绝对值为 <Latex tex="u" />、周期为 <Latex tex="T" />，电子通过圆筒间隙的时间忽略不计。</div>
<div>为使电子在每个间隙中都恰好被加速，圆筒的长度必须遵照什么规律？第 <Latex tex="n" /> 个圆筒的长度是多少？</div>

</template>

<template v-slot:fig>

<LinacCylindersSvg :show-analysis="$clicks >= 1" />

</template>

<div v-click="1">圆筒是金属导体，内部电场强度为零：电子在圆筒内做匀速直线运动，只在相邻圆筒的间隙中被加速。</div>
<div v-click="2">每经过一个间隙，动能增加 <Latex tex="eu" />：进入第 <Latex tex="n" /> 个圆筒时 <Latex tex="E_{\text{k}} = neu" />，速度 <Latex tex="v = \sqrt{\dfrac{2neu}{m}}" />。</div>

---
layout: base-flex
clicks: 3
---

# 第 $n$ 个圆筒的长度

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">要让电子在每个间隙都被加速，它穿过每个圆筒的时间应该是多少？</div>
<div v-click="1">交流电压每 <Latex tex="\dfrac{T}{2}" /> 反向一次：电子穿过一个圆筒用 <Latex tex="t = \dfrac{T}{2}" />，到达下一个间隙时，电场恰好又把它向前加速。</div>
<div v-click="2">第 <Latex tex="n" /> 个圆筒内的速度 <Latex tex="v = \sqrt{\dfrac{2neu}{m}}" />，圆筒长度 <Latex tex="l = vt = \dfrac{T}{2m}\sqrt{2neum}" />。</div>
<div class="tip-hint" v-click="3">圆筒长度与序号的平方根 <Latex tex="\sqrt{n}" /> 成正比：越往后电子越快，圆筒越长。</div>
</div>
<div class="figure">
<LinacVoltageGraph />
<div class="fig-cap">相邻两圆筒间电势差随时间的变化</div>
</div>
</div>
</div>
---
layout: base-flex
clicks: 2
---

# 带电粒子在电场中的偏转

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">电子以初速度 <Latex tex="v_0" /> 沿平行于板面的方向射入匀强电场，初速度方向与电场方向垂直。电子在板间做什么运动？</div>
<div v-click="1">沿初速度方向不受力，做匀速直线运动；垂直板面方向初速度为零、静电力恒定，做匀加速直线运动。</div>
<div v-click="2">合运动是<b>类平抛运动</b>，轨迹是一条抛物线。分析思路与平抛运动相同，只是把重力换成了静电力。</div>
<div class="info-hint" v-click="2">沿板方向 <Latex tex="l = v_0t" />，垂直板方向 <Latex tex="y = \frac{1}{2}at^2" /></div>
</div>
<div class="figure"><DeflectSvg :show-path="$clicks >= 1" :show-force="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 偏转距离的推导

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">电子在板间运动的时间 <Latex tex="t" /> 和垂直板面方向的偏移 <Latex tex="y" /> 各是多少？</div>
<div v-click="1">沿板方向做匀速运动：<Latex tex="l = v_0t" />，得 <Latex tex="t = \dfrac{l}{v_0}" />。</div>
<div v-click="2">垂直板方向做匀加速运动：<Latex tex="a = \dfrac{F}{m} = \dfrac{eE}{m} = \dfrac{eU}{md}" />。</div>
<div v-click="3">代入 <Latex tex="y = \dfrac{1}{2}at^2" />，得 <Latex tex="y = \dfrac{eUl^2}{2mdv_0^2}" />。</div>
<div class="tip-hint" v-click="4"><Latex tex="y" /> 与 <Latex tex="U" />、<Latex tex="l^2" /> 成正比，与 <Latex tex="d" />、<Latex tex="v_0^2" /> 成反比。</div>
</div>
<div class="figure"><DeflectSvg show-path :show-force="$clicks >= 2" :show-y="$clicks >= 3" /></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 偏转角与出射后的运动

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask">电子离开电场时，速度方向偏转了多少？离开电场后又怎样运动？</div>
<div v-click="1">沿板方向的分速度不变：<Latex tex="v_x = v_0" />（该方向始终不受力）。</div>
<div v-click="2">垂直板方向的分速度：<Latex tex="v_\perp = at = \dfrac{eUl}{mdv_0}" />。</div>
<div v-click="3"><Latex tex="\tan\theta = \dfrac{v_\perp}{v_0} = \dfrac{eUl}{mdv_0^2}" />。</div>
<div class="tip-hint" v-click="4">离开电场后不再受静电力，电子沿出射方向做匀速直线运动。</div>
</div>
<div class="figure"><DeflectSvg show-path :show-vperp="$clicks >= 2" :show-resultant="$clicks >= 3" :show-exit="$clicks >= 4" /></div>
</div>
</div>

---
layout: exercise-split
clicks: 4
class: tight-gap
title: 例题二　电子在偏转电场中的偏移与偏角
---

<template v-slot:stem>

<div><b class="ex-no">例题二</b>　两相同极板 <Latex tex="A" /> 与 <Latex tex="B" /> 的长度 <Latex tex="l" /> 为 <Latex tex="6.0\ \text{cm}" />，相距 <Latex tex="d" /> 为 <Latex tex="2.0\ \text{cm}" />，极板间的电压 <Latex tex="U" /> 为 <Latex tex="200\ \text{V}" />。一个电子沿平行于板面的方向射入电场中，射入时的速度 <Latex tex="v_0" /> 为 <Latex tex="3.0\times10^7\ \text{m/s}" />。把两板间的电场看作匀强电场，不计电子所受重力，求电子射出电场时沿垂直于板面方向偏移的距离 <Latex tex="y" /> 和偏转的角度 <Latex tex="\theta" />。</div>

</template>

<template v-slot:fig>

<DeflectSvg values :show-path="$clicks >= 1" :show-y="$clicks >= 3" :show-vperp="$clicks >= 4" :show-resultant="$clicks >= 4" />

</template>

<div v-click="1">加速度：<Latex tex="a = \dfrac{eU}{md} \approx 1.8\times10^{15}\ \text{m/s}^2" /></div>
<div v-click="2">飞行时间：<Latex tex="t = \dfrac{l}{v_0} = 2.0\times10^{-9}\ \text{s}" /></div>
<div v-click="3">偏移距离：<Latex tex="y = \dfrac{1}{2}at^2 = 0.35\ \text{cm}" /></div>
<div v-click="4">偏转角：<Latex tex="\tan\theta = \dfrac{v_\perp}{v_0} \approx 0.12" />，<Latex tex="\theta \approx 6.7^\circ" /></div>

---
layout: base-flex
clicks: 2
class: title-ask
---

# 怎样让电子偏得更多？

<div class="page-grow">
<div class="stack stack-dense">
<DeflectionLab />
<div v-click="1">由 <Latex tex="y = \dfrac{eUl^2}{2mdv_0^2}" />：<Latex tex="U" /> 越大、<Latex tex="l" /> 越大，<Latex tex="y" /> 越大；<Latex tex="d" />、<Latex tex="v_0" /> 越大，<Latex tex="y" /> 越小。</div>
<div class="summary-line" v-click="2">示波管中 <Latex tex="l" />、<Latex tex="d" />、<Latex tex="v_0" /> 由结构决定，改变偏转电压 <Latex tex="U" /> 就能控制电子打在荧光屏上的位置。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 示波管的结构

<div class="page-grow">
<div class="split-wide fig-wide">
<div class="stack">
<div class="ask">示波器的核心部件是示波管。它由哪几部分组成？各部分起什么作用？</div>
<div v-click="1"><b>电子枪</b>：产生高速飞行的一束电子。</div>
<div v-click="2"><b>偏转电极 <Latex tex="\text{YY}'" />、<Latex tex="\text{XX}'" /></b>：使电子束发生偏转。</div>
<div v-click="3"><b>荧光屏</b>：电子打在屏上，产生亮斑。</div>
<div class="info-hint" v-click="4">管内抽成真空。偏转电极都不加电压时，电子束沿直线运动，打在荧光屏中心。</div>
</div>
<div class="figure"><OscilloscopeSvg :step="$clicks" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 示波管怎样显示信号波形
---

<div class="page-grow">
<div class="stack">
<div class="ask">在 <Latex tex="\text{YY}'" /> 上加待测信号电压，在 <Latex tex="\text{XX}'" /> 上加锯齿形扫描电压，荧光屏上会看到什么？</div>
<div class="figure"><OscilloscopeTrace :step="$clicks" /></div>
<div class="three-col">
<div v-click="1"><b class="text-accent">① <Latex tex="\text{YY}'" /> 加信号电压</b><br />亮斑沿竖直方向随信号电压变化，屏上只得到一条竖线。</div>
<div v-click="2"><b class="text-accent">② <Latex tex="\text{XX}'" /> 加扫描电压</b><br />亮斑沿水平方向匀速移动，屏上只得到一条横线。</div>
<div v-click="3"><b class="text-accent">③ 两者同时、周期相同</b><br />亮斑在屏上描出信号电压随时间变化的稳定波形。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 本课小结

<div class="page-grow page-around">
<div class="stack">
<div class="summary-line">加速：<Latex tex="qU = \dfrac{1}{2}mv^2" />，<Latex tex="v = \sqrt{\dfrac{2qU}{m}}" />——末速度只由电荷量 <Latex tex="q" />、电势差 <Latex tex="U" /> 决定。</div>
<div class="summary-line">偏转（类平抛）：<Latex tex="t = \dfrac{l}{v_0}" />，<Latex tex="a = \dfrac{qU}{md}" />，<Latex tex="y = \dfrac{qUl^2}{2mdv_0^2}" />，<Latex tex="\tan\theta = \dfrac{qUl}{mdv_0^2}" />。</div>
<div class="summary-line">射出电场后不受静电力，做匀速直线运动；示波管通过改变偏转电压控制亮斑的位置。</div>
<div class="tip-hint">示波管 <Latex tex="\text{YY}'" /> 加信号电压、<Latex tex="\text{XX}'" /> 加扫描电压，两者周期相同时，荧光屏上显示稳定的信号波形。</div>
</div>
</div>

---
layout: exercise-split
clicks: 4
class: tight-gap
title: 练习　三种离子会分离吗
---

<template v-slot:stem>

<div><b class="ex-no">练习</b>　让一价氢离子、一价氦离子和二价氦离子的混合物由静止开始经过同一加速电场加速，然后进入同一偏转电场偏转。它们是否会分离为三股粒子束？请通过计算说明。</div>

</template>

<div v-click="1">加速电场：<Latex tex="qU_1 = \dfrac{1}{2}mv_0^2" />，得 <Latex tex="v_0^2 = \dfrac{2qU_1}{m}" />。</div>
<div v-click="2">偏转电场：<Latex tex="y = \dfrac{qU_2l^2}{2mdv_0^2}" />，代入 <Latex tex="v_0^2" /> 得 <Latex tex="y = \dfrac{U_2l^2}{4dU_1}" />。</div>
<div v-click="3">偏移 <Latex tex="y" /> 与 <Latex tex="q" />、<Latex tex="m" /> 无关，三种离子的偏移相同；由 <Latex tex="\tan\theta = \dfrac{qU_2l}{mdv_0^2} = \dfrac{U_2l}{2dU_1}" />，偏转角也相同。</div>
<div class="tip-hint" v-click="4">三种离子不会分离为三股粒子束，它们沿同一条路径射出偏转电场。</div>

---
layout: exercise-split
clicks: 3
class: tight-gap
title: 练习　质子治疗中的加速电场
---

<template v-slot:stem>

<div><b class="ex-no">练习</b>　质子疗法中，质子先被加速到具有较高的能量，再被引向轰击肿瘤。若质子的加速长度为 <Latex tex="4.0\ \text{m}" />，要使质子由静止被加速到 <Latex tex="1.0\times10^{7}\ \text{m/s}" />，加速匀强电场的电场强度应是多少？（质子质量 <Latex tex="1.67\times10^{-27}\ \text{kg}" />，电荷量 <Latex tex="1.6\times10^{-19}\ \text{C}" />）</div>

</template>

<div v-click="1">由 <Latex tex="v^2 = 2ad" /> 得 <Latex tex="a = \dfrac{v^2}{2d} = \dfrac{(1.0\times10^7)^2}{2\times4.0}\ \text{m/s}^2 = 1.25\times10^{13}\ \text{m/s}^2" />。</div>
<div v-click="2">由 <Latex tex="qE = ma" /> 得 <Latex tex="E = \dfrac{ma}{q} = \dfrac{1.67\times10^{-27}\times1.25\times10^{13}}{1.6\times10^{-19}}\ \text{V/m} \approx 1.3\times10^{5}\ \text{V/m}" />。</div>
<div class="tip-hint" v-click="3">用动能定理一步得到同一个结果：<Latex tex="qEd = \dfrac{1}{2}mv^2" />，<Latex tex="E = \dfrac{mv^2}{2qd}" />。</div>
