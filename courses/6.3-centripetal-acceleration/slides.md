---
theme: default
title: "向心加速度"
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
chapter-no: "6.3"
chapter: "第六章 圆周运动"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask">天宫二号在轨飞行时，线速度大小不变、方向却时刻改变 —— 它运动的加速度是 0 吗？</div>
<OrbitDemo />
<div v-click="1" class="tip-hint">速度的方向不断改变，加速度一定不为 0。这个加速度沿什么方向、有多大？</div>
</div>

---
layout: base-flex
clicks: 3
---

# 加速度的方向

<div class="page-grow">
<div class="ask">加速度的方向与速度变化量 <Latex tex="\Delta v" /> 的方向一致 —— 怎样作出 <Latex tex="\Delta v" />？</div>
<DeltaVSvg :step="$clicks" />
<div v-click="3" class="tip-hint">B 无限靠近 A 时，<Latex tex="\Delta v" /> 与 <Latex tex="v" /> 几乎垂直、沿半径指向圆心 —— 这个加速度叫作<b>向心加速度</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 向心加速度的大小

<div class="page-grow">
<div class="ask">速度三角形与 <Latex tex="\triangle OAB" /> 之间有什么关系？</div>
<SimilarTriangleSvg />
<div v-click="1">两个三角形都是等腰三角形（<Latex tex="OA = OB = r" />，速度三角形两条腰都是 <Latex tex="v" />），顶角又都是 <Latex tex="\theta" /> —— <b>相似</b>，所以 <Latex tex="\frac{\Delta v}{v} = \frac{AB}{r}" />。</div>
<div v-click="2"><Latex tex="\Delta t" /> 极短时弦长与弧长近似相等，<Latex tex="AB \approx v\,\Delta t" />，代入 <Latex tex="\Delta v = \frac{v \cdot AB}{r}" /> 得 <Latex tex="a_n = \frac{\Delta v}{\Delta t} = \frac{v^2}{r}" />。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 向心加速度的两个表达式

<div class="page-grow">
<div class="half-grid">
<div class="formula-lg"><mdi-vector-line class="text-2xl text-accent-2" /><Latex tex="a_n = \frac{v^2}{r}" display /></div>
<div class="divider-l formula-lg"><mdi-rotate-right class="text-2xl text-accent" /><Latex tex="a_n = \omega^2 r" display /></div>
</div>
<div v-click="1">由 <Latex tex="v = \omega r" /> 把两式联系起来：线速度一定时 <Latex tex="a_n" /> 与半径<b>成反比</b>，角速度一定时 <Latex tex="a_n" /> 与半径<b>成正比</b>；把 <Latex tex="v = \omega r" /> 代入 <Latex tex="a_n = \frac{v^2}{r}" /> 还能得到 <Latex tex="a_n = v\omega" />。</div>
</div>

---
layout: base-flex
clicks: 2
title: 思考与讨论：三点加速度的比较
---

<div class="page-grow">
<div class="half-grid">
<BikeGearsSvg />
<div class="stack">
<div class="ask">大齿轮、小齿轮、后轮边缘的 A、B、C 三点，哪两点适用于"<Latex tex="a_n" /> 与半径成正比"？哪两点适用于"成反比"？</div>
<div v-click="1"><mdi-rotate-right class="text-xl text-accent-2 mr-1 align-middle" />B、C 同轴转动，角速度相等，该用 <Latex tex="a_n = \omega^2 r" />：<Latex tex="a_n" /> 与半径成正比。</div>
<div v-click="2"><mdi-link-variant class="text-xl text-accent-2 mr-1 align-middle" />A、B 由链条相连，线速度大小相等，该用 <Latex tex="a_n = \frac{v^2}{r}" />：<Latex tex="a_n" /> 与半径成反比。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="ask">甲、乙两物体都做匀速圆周运动。下列四种情况中，哪个物体的向心加速度大？</div>
<div class="stack stack-dense">
<div v-click="1">A. 线速度大小相等，乙的半径小 —— 用 <Latex tex="a_n = \frac{v^2}{r}" />，<b>乙</b>的向心加速度大。</div>
<div v-click="2">B. 周期相等（角速度相等），甲的半径大 —— 用 <Latex tex="a_n = \omega^2 r" />，<b>甲</b>的向心加速度大。</div>
<div v-click="3">C. 角速度相等，乙的线速度小 —— 用 <Latex tex="a_n = v\omega" />，<b>甲</b>的向心加速度大。</div>
<div v-click="4" class="tip-hint">D. 线速度大小相等，相同时间内甲与圆心的连线扫过的角度大 —— 甲的 <Latex tex="\omega" /> 大，由 <Latex tex="a_n = v\omega" /> 知<b>甲</b>的向心加速度大。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题：圆锥摆

<div class="page-grow page-grow-tight">
<div>长 <Latex tex="l" /> 的细绳下端拴一个质量为 <Latex tex="m" /> 的小球，使小球在水平面内做圆周运动（圆锥摆）。当绳与竖直方向的夹角为 <Latex tex="\theta" /> 时，求小球的向心加速度 <Latex tex="a_n" />，并说明怎样增大 <Latex tex="\theta" />。</div>
<div class="half-grid">
<div class="stack stack-dense">
<div v-click="1">先看运动：小球只在<b>水平面</b>内运动 —— 竖直方向没有速度、也没有加速度，所以竖直方向合力为零。</div>
<div v-click="2">竖直方向 <Latex tex="F_T \cos\theta = mg" />，水平方向 <Latex tex="F_n = F_T \sin\theta = mg\tan\theta" />。</div>
<div v-click="3">所以 <Latex tex="a_n = \frac{F_n}{m} = g\tan\theta" />。</div>
<div v-click="4" class="tip-hint">又 <Latex tex="r = l\sin\theta" />，与 <Latex tex="a_n = \omega^2 r" /> 联立得 <Latex tex="\cos\theta = \frac{g}{l\omega^2}" /> —— <Latex tex="\omega" /> 越大，<Latex tex="\theta" /> 越大。</div>
</div>
<ConicalPendulumSvg :show-forces="$clicks >= 2" :show-radius="$clicks >= 3" />
</div>
</div>

---
layout: base-flex
clicks: 2
title: 练习：比较两艘快艇与月球公转的向心加速度
---

<div class="page-grow">
<div class="stack">
<div><mdi-ferry class="text-xl text-accent-2 mr-1 align-middle" />① A、B 两艘快艇在湖面上做匀速圆周运动，在相同的时间内通过的路程之比是 4 : 3，运动方向改变的角度之比是 3 : 2。求它们的向心加速度之比。</div>
<div v-click="1">路程之比就是线速度之比 <Latex tex="v_1 : v_2 = 4 : 3" />；角度之比就是角速度之比 <Latex tex="\omega_1 : \omega_2 = 3 : 2" />。把 <Latex tex="v = \omega r" /> 代入 <Latex tex="a_n = \frac{v^2}{r}" /> 得 <Latex tex="a_n = v\omega" />，所以 <Latex tex="a_1 : a_2 = 2 : 1" />。</div>
</div>
<div class="stack">
<div><mdi-earth class="text-xl text-accent-2 mr-1 align-middle" />② 月球绕地球公转的轨道接近圆，半径 <Latex tex="r = 3.84 \times 10^5\ \text{km}" />，公转周期 <Latex tex="T = 27.3\ \text{d}" />。求月球公转的向心加速度。</div>
<div v-click="2">统一单位：<Latex tex="T = 27.3 \times 86400\ \text{s} \approx 2.36 \times 10^6\ \text{s}" />，<Latex tex="r = 3.84 \times 10^8\ \text{m}" />。由 <Latex tex="\omega = \frac{2\pi}{T}" /> 与 <Latex tex="a_n = \omega^2 r" /> 得 <Latex tex="a_n \approx 2.7 \times 10^{-3}\ \text{m/s}^2" />。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 练习：皮带传动中各点的向心加速度
---

<div class="page-grow">
<div><mdi-cog-outline class="text-xl text-accent-2 mr-1 align-middle" />一部机器与电动机用皮带连接，机器皮带轮的半径是电动机皮带轮半径的 3 倍，皮带与两轮之间不发生滑动。已知机器皮带轮边缘上一点的向心加速度为 <Latex tex="0.10\ \text{m/s}^2" />。</div>
<div class="stack stack-dense">
<div v-click="1">（1）皮带不打滑，两轮边缘线速度大小相等。由 <Latex tex="v = 2\pi n r" /> 得转速与半径成反比：<Latex tex="n_1 : n_2 = R_2 : R_1 = 3 : 1" />。</div>
<div v-click="2">（2）A 点在机器皮带轮上、到转轴的距离是轮半径的一半；同一轮上各点角速度相等，由 <Latex tex="a_n = \omega^2 r" /> 得 <Latex tex="a_A = 0.05\ \text{m/s}^2" />。</div>
<div v-click="3" class="tip-hint">（3）两轮边缘线速度大小相等，由 <Latex tex="a_n = \frac{v^2}{r}" />：电动机皮带轮半径只有机器皮带轮的 <Latex tex="\frac{1}{3}" />，所以它边缘的 <Latex tex="a = 3 \times 0.10 = 0.30\ \text{m/s}^2" />。</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow page-grow-tight">
<div class="mini-title"><mdi-arrow-right-bold />方向</div>
<div>让 B 无限靠近 A：<Latex tex="\Delta v" /> 与 <Latex tex="v" /> 几乎垂直、沿半径指向圆心 —— 所以匀速圆周运动的加速度总指向圆心，叫作<b>向心加速度</b> <Latex tex="a_n" />。</div>
<div class="mini-title"><mdi-equal />大小</div>
<div>速度三角形与 <Latex tex="\triangle OAB" /> 相似，<Latex tex="\frac{\Delta v}{v} = \frac{AB}{r}" />；又 <Latex tex="AB \approx v\,\Delta t" />，得 <Latex tex="a_n = \frac{v^2}{r} = \omega^2 r" />。</div>
<div class="mini-title"><mdi-alert-circle-outline />两点提醒</div>
<div>同轴转动的各点角速度相等，皮带（链条）相连的两轮边缘线速度大小相等 —— 选对表达式再比较。</div>
</div>
