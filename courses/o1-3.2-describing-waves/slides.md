---
theme: default
title: "波的描述"
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
chapter-no: "3.2"
chapter: "第三章 机械波"
subtitle: "用图象、波长、周期和波速描述一列波"
---

<CoverDecorationSvg />

---
title: 怎样描述一列波？
clickAnimation: none
---

<div class="page-grow">
<div class="intro-grid">
<div class="intro-figure">
<WaveIntroSvg />
</div>
<div class="intro-ask">
<div class="ask ask-lead">波在空间和时间上都有周期性。怎样用图像描述一列波？</div>
<div class="ask-sub">横轴、纵轴各表示什么？</div>
</div>
</div>
</div>

---
title: 波的图像
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="mini-title">波的图像</div>

```comp CoordAxes
class: wave-figure
x-range: [0, 4.4]
y-range: [-1.35, 1.35]
x-axis: { quantity: x, unit: 'm' }
y-axis: { quantity: y, unit: 'cm' }
view: { width: 900, height: 350 }
font-scale: 1.1
ticks: { x: [1, 2, 3, 4], y: [-1, 1] }
curves:
  - formula: x => Math.sin(Math.PI * x)
    samples: 300
    color: var(--c-accent)
    width: 3.2
labels:
  - x: 0.5
    y: 1
    text: 波峰
    anchor: top-right
    dot: 4
    color: var(--c-accent)
  - x: 0.75
    y: 0.707
    tex: 'P'
    anchor: top-right
    dot: 5
    color: var(--c-accent-2)
  - x: 1.5
    y: -1
    text: 波谷
    anchor: bottom-right
    dot: 4
    color: var(--c-accent)
```

<div class="hint-slot">
<div class="tip-hint" v-click="1">横轴 <Latex tex="x" /> 表示各质点沿传播方向的平衡位置，纵轴 <Latex tex="y" /> 表示某一时刻各质点偏离平衡位置的位移。</div>
</div>
</div>

---
title: 波形图与振动图像
---

# 波形图与振动图像

<div class="page-grow">
<WaveCompareFigure />
<table class="compare-table">
<thead>
<tr><th></th><th>波形图</th><th>振动图像</th></tr>
</thead>
<tbody>
<tr><td>横轴</td><td>位置 <Latex tex="x" /></td><td>时间 <Latex tex="t" /></td></tr>
<tr><td>研究对象</td><td>各个质点</td><td>某一质点</td></tr>
<tr><td>对应时刻</td><td>某一时刻</td><td>各个时刻</td></tr>
</tbody>
</table>
</div>

---
title: 简谐波
---

# 简谐波

<div class="page-grow">
<div class="wave-split">

```comp CoordAxes
class: wave-figure
x-range: [0, 4.4]
y-range: [-1.35, 1.35]
x-axis: { quantity: x, unit: 'm' }
y-axis: { quantity: y, unit: 'cm' }
view: { width: 640, height: 360 }
font-scale: 1.4
ticks: { x: [1, 2, 3, 4], y: [-1, 1] }
curves:
  - formula: x => Math.sin(Math.PI * x)
    samples: 300
    color: var(--c-accent)
    width: 3.2
labels:
  - x: 0.5
    y: 1
    text: 正弦曲线
    anchor: top-right
    color: var(--c-accent)
    size: 15
```

<div class="wave-text">
<div class="wave-def">如果波的图像是正弦曲线，这样的波叫作<span class="nowrap">简谐波</span>。</div>
<div class="wave-def">介质中有正弦波传播时，介质中的质点在做简谐运动。</div>
</div>
</div>
</div>

---
title: 波长
---

# 波长

<div class="page-grow">
<div class="wave-split">
<div class="wave-figure"><WaveMeasureFigure kind="lambda" /></div>
<div class="wave-text">
<div class="wave-def">在波的传播方向上，振动相位总是相同的两个相邻质点间的距离，叫作波长，用 <Latex tex="\lambda" /> <span class="nowrap">表示</span>。</div>
<div class="info-hint">横波中，两个相邻波峰（或波谷）之间的距离等于波长；纵波中，两个相邻密部（或疏部）之间的距离等于波长。</div>
</div>
</div>
</div>

---
title: 周期与频率
---

# 周期与频率

<div class="page-grow">
<div class="wave-split">
<div class="wave-figure"><WaveMeasureFigure kind="period" /></div>
<div class="wave-text">
<div class="wave-def">波动中各个质点的振动周期（或频率）相同，都等于波源的振动周期（或频率），这个周期（或频率）也叫波的周期（或频率）。</div>
<div class="wave-eq"><Latex tex="f = \dfrac{1}{T}" /></div>
<div class="tip-hint">经过一个周期 <Latex tex="T" />，振动在介质中传播的距离等于一个波长 <Latex tex="\lambda" />。</div>
</div>
</div>
</div>

---
title: 波速
---

# 波速

<div class="page-grow">
<div class="wave-split">
<div class="wave-text">
<div class="wave-def">机械波在介质中的传播速度由介质本身的性质决定，不同介质中波速不同；声速还与温度有关。</div>
<div class="wave-eq"><Latex tex="v = \dfrac{\lambda}{T} = \lambda f" /></div>
<div class="info-hint">波从一种介质进入另一种介质时，频率不变，波速和波长会改变。</div>
</div>
<table class="speed-table">
<caption><Latex tex="0\ \text{°C}" /> 时几种介质中的声速</caption>
<thead>
<tr><th>介质</th><th>声速 <Latex tex="\text{m/s}" /></th></tr>
</thead>
<tbody>
<tr><td>空气</td><td>332</td></tr>
<tr><td>水</td><td>1450</td></tr>
<tr><td>铜</td><td>3800</td></tr>
<tr><td>铁</td><td>4900</td></tr>
<tr><td>玻璃</td><td>5000~6000</td></tr>
<tr><td>松木</td><td>约 3320</td></tr>
<tr><td>软木</td><td>430~530</td></tr>
<tr><td>橡胶</td><td>30~50</td></tr>
</tbody>
</table>
</div>
</div>


---
title: 波速、波长和频率的关系
---

<div class="page-grow">
<div class="mini-title">波速、波长和频率的关系</div>
<WaveRelation />
</div>

---
title: 三个量由谁决定？
---

# 三个量由谁决定？

<div class="page-grow">
<div class="decide-grid">
<div class="decide-card">
<mdi-speedometer class="icon-xl decide-icon" />
<div class="decide-name">波速 <Latex tex="v" /></div>
<div class="decide-text">由介质的性质决定。<span class="nowrap">同一介质中</span> <Latex tex="v" /> 不变，<span class="nowrap">不同介质中</span> <Latex tex="v" /> 不同。</div>
</div>
<div class="decide-card">
<mdi-sine-wave class="icon-xl decide-icon" />
<div class="decide-name">频率 <Latex tex="f" /></div>
<div class="decide-text">由波源决定。波从<span class="nowrap">一种介质</span>进入<span class="nowrap">另一种介质</span>时，频率不变。</div>
</div>
<div class="decide-card">
<mdi-ruler class="icon-xl decide-icon" />
<div class="decide-name">波长 <Latex tex="\lambda" /></div>
<div class="decide-text">由波速和频率共同决定：<Latex tex="\lambda = \dfrac{v}{f}" />。</div>
</div>
</div>
<div class="tip-hint">波从一种介质进入另一种介质时，频率不变，波速和波长改变。</div>
</div>

---
title: 波向右传播，P 点向哪运动？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="wave-split">
<div class="wave-figure"><WaveShiftFigure :step="$clicks" /></div>
<div class="wave-text">
<div class="ask">波向右传播，P 点向哪运动？</div>
<div class="wave-step" v-click="1"><span class="wave-step-key">微移法</span>把波形沿传播方向平移一小段，P 到达 P′，P 向下运动。</div>
<div class="wave-step" v-click="2"><span class="wave-step-key">上下坡法</span>沿传播方向看，P 位于上坡段，向下运动。</div>
</div>
</div>
</div>

---
title: 练习：判断振动方向
clicks: 2
clickAnimation: none
---

# 练习：判断振动方向

<div class="page-grow">
<div class="ex-split">
<div class="ex-figure"><WaveExerciseFigure :show-answers="$clicks >= 1" /></div>
<div class="ex-side">
<div class="ex-stem">波沿 <Latex tex="+x" /> 方向传播，判断 A、B、C、D 四个质点的振动方向，并说明它们的速度大小如何变化。</div>
<div class="ex-answer" v-click="1"><span class="ex-key">方向</span>A、D 向下；B、C 向上。</div>
<div class="ex-answer" v-click="2"><span class="ex-key">速度</span>A、C 速度增大；B、D 速度减小。</div>
</div>
</div>
</div>

---
title: 两个时刻的波形能确定传播方向吗？
clicks: 2
---

<div class="page-grow">
<div class="wave-split">
<div class="wave-figure"><WaveAmbiguousFigure /></div>
<div class="wave-text">
<div class="wave-def">实线是 <Latex tex="t = 0" /> 时的波形，虚线是 <Latex tex="t = 0.1\ \text{s}" /> 后的波形。</div>
<div class="ask">能判定这列波向哪个方向传播吗？</div>
<div class="warn-hint" v-click="1">不能。</div>
<div class="wave-step" v-click="2">若向右传播，波形移动 <Latex tex="0.3\ \text{m}" />；若向左传播，波形移动 <Latex tex="1.7\ \text{m}" />，两种情况都可能。</div>
</div>
</div>
</div>

---
title: 例题：波速和周期的计算
clicks: 3
---

# 例题：波速和周期的计算

<div class="page-grow">
<div class="ex-split">
<div class="ex-figure"><WaveExampleFigure /></div>
<div class="ex-side">
<div class="ex-stem">一列简谐波沿 <Latex tex="x" /> 轴传播，波长 <span class="nowrap"><Latex tex="\lambda = 0.24\ \text{m}" />。</span>实线是某时刻的波形，虚线是 <Latex tex="0.5\ \text{s}" /> 后的波形。已知周期 <Latex tex="T > 0.5\ \text{s}" />，求波速和周期。</div>
<div class="ex-step" v-click="1"><span class="ex-step-no">1</span><div>因为 <Latex tex="T > 0.5\ \text{s}" />，所以 <Latex tex="0.5\ \text{s}" /> 内波传播的距离小于一个波长。</div></div>
<div class="ex-step" v-click="2"><span class="ex-step-no">2</span><div>若波向左传播：<Latex tex="\Delta x = 0.06\ \text{m} = \dfrac{\lambda}{4}" />，<br /><Latex tex="v = \dfrac{\Delta x}{\Delta t} = 0.12\ \text{m/s}" />，<Latex tex="T = \dfrac{\lambda}{v} = 2.0\ \text{s}" />。</div></div>
<div class="ex-step" v-click="3"><span class="ex-step-no">3</span><div>若波向右传播：<Latex tex="\Delta x = 0.18\ \text{m} = \dfrac{3\lambda}{4}" />，<br /><Latex tex="v = \dfrac{\Delta x}{\Delta t} = 0.36\ \text{m/s}" />，<Latex tex="T = \dfrac{\lambda}{v} \approx 0.67\ \text{s}" />。</div></div>
</div>
</div>
</div>

---
title: 练习：质点 P 的振动
clicks: 3
clickAnimation: none
---

# 练习：质点 P 的振动

<div class="page-grow">
<div class="ex-split">
<div class="ex-figure"><WaveParticleFigure :step="$clicks" /></div>
<div class="ex-side">
<div class="ex-stem">一列简谐横波沿 <Latex tex="x" /> 轴正方向传播，<Latex tex="P" /> 是介质中的一个质点。</div>
<div class="ex-answer" v-click="1"><span class="ex-key">此时刻</span><Latex tex="P" /> 的速度向上，加速度向下。</div>
<div class="ex-answer" v-click="2"><span class="ex-key">经过 <Latex tex="\dfrac{T}{4}" /></span><Latex tex="P" /> 的速度向下，加速度向下。</div>
<div class="ex-answer" v-click="3"><span class="ex-key">一个周期</span>路程为 <Latex tex="4A_0" />；<Latex tex="\dfrac{T}{4}" /> 内的路程一般<br /><span class="nowrap">不是</span> <Latex tex="A_0" />。</div>
</div>
</div>
</div>

---
title: 练习：声波从空气进入水中
clicks: 3
---

# 练习：声波从空气进入水中

<div class="page-grow">
<div class="ex-stem">在空气中波长为 <Latex tex="1\ \text{m}" /> 的声波，由空气传入水中，声波在水中的频率和波长各是多少？（此时温度为 <Latex tex="0\ \text{°C}" />）</div>
<div class="info-hint"><Latex tex="0\ \text{°C}" /> 时，空气中声速 <Latex tex="332\ \text{m/s}" />，水中声速 <Latex tex="1450\ \text{m/s}" />。</div>
<div class="ex-steps">
<div class="ex-step" v-click="1"><span class="ex-step-no">1</span><div>频率由波源决定，传入水中不变：<Latex tex="f = \dfrac{v_{\text{空气}}}{\lambda_{\text{空气}}} = \dfrac{332}{1} = 332\ \text{Hz}" />。</div></div>
<div class="ex-step" v-click="2"><span class="ex-step-no">2</span><div>水中的波速 <Latex tex="v_{\text{水}} = 1450\ \text{m/s}" />。</div></div>
<div class="ex-step" v-click="3"><span class="ex-step-no">3</span><div>水中的波长 <Latex tex="\lambda_{\text{水}} = \dfrac{v_{\text{水}}}{f} = \dfrac{1450}{332} \approx 4.37\ \text{m}" />。</div></div>
</div>
</div>

---
title: 一列波的描述
---

<div class="page-grow">
<div class="mini-title">一列波的描述</div>
<div class="sum-chain">
<div class="sum-node">波形图</div>
<span class="sum-arrow">→</span>
<div class="sum-node">波长、周期、频率</div>
<span class="sum-arrow">→</span>
<div class="sum-node sum-node-main"><Latex tex="v = \lambda f" /></div>
<span class="sum-arrow">→</span>
<div class="sum-node">方向判断</div>
</div>
<div class="sum-list">
<div class="sum-row"><span class="sum-key">波形图</span><span>某一时刻各个质点的位移，横轴是位置 <Latex tex="x" />。</span></div>
<div class="sum-row"><span class="sum-key">三个量</span><span>波长 <Latex tex="\lambda" />、周期 <Latex tex="T" />、频率 <Latex tex="f" /> 的关系：<Latex tex="v = \lambda f" />。</span></div>
<div class="sum-row"><span class="sum-key">方向</span><span>波的传播方向与质点振动方向可以互相判断。</span></div>
</div>
</div>

---
title: 下一节：波的反射、折射和衍射
---

<div class="page-grow">
<div class="next-kicker">下一节 · 3.3</div>
<div class="next-title">波的反射、折射和衍射</div>
<div class="next-grid">
<div class="next-card"><mdi-swap-horizontal class="icon-xl next-icon" /><div class="next-name">反射</div></div>
<div class="next-card"><mdi-arrow-right-bold class="icon-xl next-icon" /><div class="next-name">折射</div></div>
<div class="next-card"><mdi-waves class="icon-xl next-icon" /><div class="next-name">衍射</div></div>
</div>
</div>
