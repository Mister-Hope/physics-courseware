---
theme: default
title: "光电效应"
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
chapter: "第四章 原子结构和波粒二象性"
subtitle: "光照射金属，为什么能打出电子"
---

<!-- 封面装饰：光子射到金属表面，光电子逸出 -->
<CoverDecorationSvg />


---
layout: base-flex
title: 锌板与验电器
clicks: 4
clickAnimation: none
---

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center">
<div class="stack">
<div class="ask ask-lead">把锌板接在验电器上，使它带负电，<br />指针张开。用紫外线照射，会发生什么？</div>
<div class="step-line" v-click="1">指针张开的夹角变小——锌板带的负电荷减少了。</div>
<div class="step-line" v-click="2">紫外线使电子从锌板表面逸出。</div>
<div class="step-line" v-click="3">光照射金属表面，能使金属中的电子逸出。</div>
</div>
<div style="width:100%">
<ZincPlateSvg :show-arc="$clicks >= 1" />
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

## 光电效应

<div class="page-grow page-around">
<div class="stack">
<DefinitionBox term="光电效应">照射到金属表面的光，能使金属中的电子从表面逸出。</DefinitionBox>
<div class="step-line" v-click="1">这些逸出的电子，叫作<span class="def-term">光电子</span>。</div>
<div class="step-line" v-click="2">1887 年，赫兹在研究电磁波时偶然发现：接收电路的间隙受到光照，更容易产生电火花。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

## 怎样研究光电效应

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: center">
<div style="width:100%">
<PhototubeSvg :show-electrons="$clicks >= 1" :show-current="$clicks >= 2" />
</div>
<div class="stack">
<div class="step-line">阴极 K 受光照时发射光电子，阳极 A 吸收光电子。</div>
<div class="step-line" v-click="1">光电子到达阳极，电路中形成<span class="def-term">光电流</span>。</div>
<div class="step-line" v-click="2">电压 U 的大小可以调整，电源的正负极也可以对调。</div>
<div class="step-line" v-click="3">电压为 0 时，光电流并不为 0。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

## 规律一：存在截止频率

<div class="page-grow page-around">
<div class="stack">
<div class="step-line">逐渐降低入射光的频率，光电流随之减小；频率降到某一数值 <Latex tex="\nu_{\text{c}}" /> 时，光电流消失。</div>
<div class="step-line" v-click="1"><Latex tex="\nu_{\text{c}}" /> 叫作<strong>截止频率</strong>（也叫极限频率）：频率低于它时，不发生光电效应。</div>
<div class="step-line" v-click="2">不同金属的截止频率不同——它由金属自身的性质决定。</div>
<div class="tip-hint" v-click="3">频率决定“能不能打出电子”，光的强弱只决定“打出多少电子”。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

## 规律二：饱和电流

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div style="width:100%">

```comp CoordAxes
x-range: [-2, 4]
y-range: [0, 1.15]
x-axis:
  quantity: U
  unit: V
y-axis:
  quantity: I
view:
  width: 460
  height: 320
ticks:
  x: []
  y: []
  labels: false
curves:
  - formula: t => (t <= -0.9 ? 0 : 0.5 * (1 - Math.exp(-(t + 0.9) / 0.45)))
    color: var(--c-accent)
    width: 2.4
  - formula: t => (t <= -0.9 ? 0 : 1 * (1 - Math.exp(-(t + 0.9) / 0.45)))
    color: var(--c-accent-2)
    width: 2.4
labels:
  - x: 2.6
    y: 1.06
    tex: 强光
  - x: 2.6
    y: 0.42
    tex: 弱光
```

</div>
<div class="stack">
<div class="step-line">电压增大，光电流趋于一个饱和值。</div>
<div class="step-line" v-click="1">电压足够大时，所有光电子都被阳极吸收，电流不再增大。</div>
<div class="step-line" v-click="2">频率不变时，光越强，饱和电流越大。</div>
<div class="step-line" v-click="3">这说明：光越强，单位时间内发射的光电子数越多。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

## 规律三：存在遏止电压

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div style="width:100%">

```comp CoordAxes
x-range: [-2, 4]
y-range: [0, 1.15]
x-axis:
  quantity: U
  unit: V
y-axis:
  quantity: I
view:
  width: 460
  height: 320
ticks:
  x: []
  y: []
  labels: false
curves:
  - formula: t => (t <= -1.5 ? 0 : 1 * (1 - Math.exp(-(t + 1.5) / 0.45)))
    color: var(--c-accent)
    width: 2.4
  - formula: t => (t <= -0.6 ? 0 : 1 * (1 - Math.exp(-(t + 0.6) / 0.45)))
    color: var(--c-accent-2)
    width: 2.4
labels:
  - x: -1.62
    y: 0.18
    tex: \nu_1
  - x: -0.62
    y: 0.18
    tex: \nu_2
```

</div>
<div class="stack">
<div class="step-line">加反向电压，使电子减速；电流减小到 0 时的反向电压 <Latex tex="U_{\text{c}}" />，叫作<strong>遏止电压</strong>。</div>
<div class="step-line" v-click="1">光电子具有初速度，初速度的上限满足 <Latex tex="\frac{1}{2}m_{\text{e}}v_{\text{c}}^2 = eU_{\text{c}}" />。</div>
<div class="step-line" v-click="2">同一频率的光，无论强弱，遏止电压都一样。</div>
<div class="step-line" v-click="3">频率改变，遏止电压也随之改变：光电子的能量只与频率有关。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

## 规律四：光电效应是瞬时的

<div class="page-grow page-around">
<div class="stack">
<div class="step-line">只要频率超过截止频率，无论光多弱，照到金属上立刻就有光电流。</div>
<div class="step-line" v-click="1">精确测量表明：从光照到光电子逸出，几乎不需要时间。</div>
<div class="tip-hint" v-click="2">光的强弱只影响电子数，不影响每个电子的能量，也不影响“要不要等”。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

## 经典理论解释不了

<div class="page-grow">
<div class="step-line">按光的电磁理论，光是连续的波，电子在光波中逐渐积累能量。于是应当得出：</div>
<div class="three-col" style="align-items: stretch">
<div class="card" v-click="1">
<div class="mini-title">不应有截止频率</div>
<div class="step-line">只要光足够强，电子总能积累到足够能量逸出。</div>
</div>
<div class="card" v-click="2">
<div class="mini-title">遏止电压应随光强变化</div>
<div class="step-line">光越强，电子获得的能量越多，初动能应越大。</div>
</div>
<div class="card" v-click="3">
<div class="mini-title">弱光需要等待</div>
<div class="step-line">估算表明，弱光下电子要几分钟到十几分钟才能积累够能量。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

## 电子逸出金属要克服什么

<div class="page-grow">
<div class="step-line">金属表面层内存在一种力，阻碍电子逃逸。</div>
<div class="step-line" v-click="1">要使电子脱离金属，至少需要外界做功 <Latex tex="W_0" />，这个最小功叫作<strong>逸出功</strong>。</div>
<div class="step-line" v-click="2">不同金属的逸出功不同，截止频率也不同。</div>
<div v-click="3">
<table class="data-table">
<thead>
<tr><th>金属</th><th>钨</th><th>钙</th><th>钠</th><th>钾</th><th>铷</th></tr>
</thead>
<tbody>
<tr><td>截止频率 <Latex tex="\nu_{\text{c}}/(10^{14}\ \text{Hz})" /></td><td>10.95</td><td>7.73</td><td>5.53</td><td>5.44</td><td>5.15</td></tr>
<tr><td>逸出功 <Latex tex="W_0/\text{eV}" /></td><td>4.54</td><td>3.20</td><td>2.29</td><td>2.25</td><td>2.13</td></tr>
</tbody>
</table>
</div>
</div>

---
layout: base-flex
clicks: 2
---

## 爱因斯坦：光是一份一份的

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); align-items: center">
<div class="stack">
<div class="step-line">1905 年，爱因斯坦提出：光的能量是不连续的，由一个个不可分割的能量子组成。</div>
<div class="step-line" v-click="1">频率为 <Latex tex="\nu" /> 的光，一个能量子的能量为 <Latex tex="\varepsilon = h\nu" />，<Latex tex="h" /> 是普朗克常量。</div>
<div class="step-line" v-click="2">这些能量子后来被称为<strong>光子</strong>。</div>
</div>
<div style="width:100%">
<PhotonEscapeSvg />
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

## 爱因斯坦光电效应方程

<div class="page-grow page-around">
<div class="stack">
<div class="step-line">电子吸收一个光子，一次获得 <Latex tex="h\nu" /> 的能量。</div>
<div class="step-line" v-click="1">其中一部分用来克服逸出功 <Latex tex="W_0" />，剩下的成为光电子的最大初动能 <Latex tex="E_{\text{k}}" />。</div>
<div class="formula-center" v-click="2"><Latex tex="h\nu = E_{\text{k}} + W_0" display /></div>
<div class="formula-center" v-click="3"><Latex tex="E_{\text{k}} = h\nu - W_0" display /></div>
<div class="formula-center" v-click="4"><Latex tex="E_{\text{k}} = \frac{1}{2}m_{\text{e}}v_{\text{c}}^2" display /></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

## 方程解释了实验规律

<div class="page-grow">
<div class="stack">
<div class="step-line" v-click="1">只有 <Latex tex="h\nu > W_0" /> 时电子才能逸出，所以存在截止频率 <Latex tex="\nu_{\text{c}} = \dfrac{W_0}{h}" />。</div>
<div class="step-line" v-click="2"><Latex tex="E_{\text{k}}" /> 只与频率有关、与光强无关，所以遏止电压与光强无关。</div>
<div class="step-line" v-click="3">电子一次吸收一个光子的全部能量，不需要积累时间，所以光电效应是瞬时的。</div>
<div class="step-line" v-click="4">光越强，单位时间内照到金属表面的光子越多，光电子越多，饱和电流越大。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

## 遏止电压与频率的关系

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center">
<div style="width:100%">

```comp CoordAxes
x-range: [0, 1.2e15]
y-range: [0, 3.2]
x-axis:
  quantity: \nu
  unit: Hz
y-axis:
  quantity: U
  sub: c
  unit: V
view:
  width: 460
  height: 320
ticks:
  x: []
  y: []
  labels: false
curves:
  - points:
      - x: 5.53e14
        y: 0
      - x: 1.2e15
        y: 2.68
    color: var(--c-accent)
    width: 2.6
labels:
  - x: 5.53e14
    y: 0
    tex: \nu_{\text{c}}
    anchor: top
  - x: 8.6e14
    y: 1.7
    tex: \text{斜率} = \frac{h}{e}
```

</div>
<div class="stack">
<div class="step-line">由 <Latex tex="eU_{\text{c}} = E_{\text{k}}" /> 和 <Latex tex="E_{\text{k}} = h\nu - W_0" /> 消去 <Latex tex="E_{\text{k}}" />，得 <Latex tex="U_{\text{c}} = \dfrac{h}{e}\nu - \dfrac{W_0}{e}" />。</div>
<div class="step-line" v-click="1"><Latex tex="U_{\text{c}}" /> 与 <Latex tex="\nu" /> 是线性关系，直线的斜率是 <Latex tex="\dfrac{h}{e}" />。</div>
<div class="step-line" v-click="2">1907 年起，密立根测量多种金属的 <Latex tex="U_{\text{c}}" /> 与 <Latex tex="\nu" />，由此算出的 <Latex tex="h" /> 与黑体辐射的结果在 <Latex tex="0.5\%" /> 的误差内一致。</div>
</div>
</div>
</div>

---
layout: base-flex
title: 光电效应实验室
---

## 改变频率，能打出电子吗

<div class="page-grow">
<PhotoelectricLab />
</div>

---
layout: exercise-split
title: 例题：铝的光电效应
clicks: 4
---

<template v-slot:stem>

铝的逸出功是 $4.2\ \text{eV}$，现将波长为 $200\ \text{nm}$ 的光照射铝的表面。

（1）求光电子的最大初动能；（2）求遏止电压；（3）求铝的截止频率。

</template>

<div class="step-line">取 <Latex tex="h = 6.63 \times 10^{-34}\ \text{J}\cdot\text{s}" />，<Latex tex="c = 3.0 \times 10^{8}\ \text{m/s}" />：<Latex tex="h\nu = \dfrac{hc}{\lambda} = 9.9 \times 10^{-19}\ \text{J} \approx 6.2\ \text{eV}" /></div>
<div class="step-line" v-click="1">（1）<Latex tex="E_{\text{k}} = h\nu - W_0 = 6.2\ \text{eV} - 4.2\ \text{eV} = 2.0\ \text{eV} = 3.2 \times 10^{-19}\ \text{J}" /></div>
<div class="step-line" v-click="2">（2）遏止电压 <Latex tex="U_{\text{c}} = \dfrac{E_{\text{k}}}{e}" />，<Latex tex="E_{\text{k}} = 2.0\ \text{eV}" />，得 <Latex tex="U_{\text{c}} = 2.0\ \text{V}" /></div>
<div class="step-line" v-click="3">（3）<Latex tex="\nu_{\text{c}} = \dfrac{W_0}{h} \approx \dfrac{4.2 \times 1.6 \times 10^{-19}}{6.63 \times 10^{-34}}\ \text{Hz} \approx 1.0 \times 10^{15}\ \text{Hz}" /></div>

---
layout: exercise-split
title: 练习：光强与频率的影响
clicks: 3
---

<template v-slot:stem>

（1）在光电效应实验中，如果入射光的波长确定而强度增加，将产生什么结果？如果入射光的频率增加，将产生什么结果？

（2）金属 A 在一束绿光照射下恰能发生光电效应。用紫光或红光照射时，能否发生光电效应？

</template>

<div class="step-line">（1）波长确定，频率就不变：最大初动能、遏止电压都不变。</div>
<div class="step-line" v-click="1">强度增加：单位时间的光子数增多，光电子数增多，饱和电流增大。</div>
<div class="step-line" v-click="2">频率增加：每个光子的能量增大，最大初动能、遏止电压都增大。</div>
<div class="step-line" v-click="3">（2）绿光恰能发生，说明绿光频率等于截止频率：紫光频率更高，能发生；红光频率更低，不能发生。</div>

---
layout: base-flex
clicks: 4
---

## 本节的规律

<div class="page-grow">
<div class="stack">
<div class="summary-line"><span class="key-lead">光电效应</span>　光照射金属表面，使电子逸出；逸出的电子叫光电子。</div>
<div class="summary-line"><span class="key-lead">实验规律</span>　存在截止频率；存在饱和电流；存在遏止电压；几乎是瞬时的。</div>
<div class="summary-line"><span class="key-lead">光电效应方程</span>　<Latex tex="E_{\text{k}} = h\nu - W_0" />，只有 <Latex tex="h\nu > W_0" /> 时才能逸出。</div>
<div class="summary-line"><span class="key-lead">遏止电压</span>　<Latex tex="eU_{\text{c}} = E_{\text{k}}" />，<Latex tex="U_{\text{c}} = \dfrac{h}{e}\nu - \dfrac{W_0}{e}" />。</div>
<div class="tip-hint" v-click="4">下一节：原子的核式结构模型——用粒子去“看”原子内部。</div>
</div>
</div>
