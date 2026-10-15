---
theme: default
title: "实验：电池电动势和内阻的测量"
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
chapter-no: "12.3"
chapter: "第十二章 电能 能量守恒定律"
subtitle: 伏安法 · 伏阻法 · 安阻法
---

<CoverDecorationSvg />

---
clicks: 3
---

<div class="page-grow">
<div class="ask">上一节已经画过 <Latex tex="U = E - Ir" /> 的 <Latex tex="U-I" /> 图像——它与两坐标轴的交点各代表什么？</div>

<div class="half-grid">
<div class="stack">
<div v-click="1"><b>纵截距</b>：<Latex tex="I = 0" />（断路）时 <Latex tex="U = E" />——直线在纵轴上的截距就是电动势。</div>
<div v-click="2"><b>斜率</b>：<Latex tex="k = -r" />，取绝对值就是内阻 <Latex tex="r = \dfrac{\Delta U}{\Delta I}" />。</div>
<div v-click="2"><b>横截距</b>：<Latex tex="U = 0" />（短路）时的电流 <Latex tex="I_{\text{短}} = \dfrac{E}{r}" />，于是也能由 <Latex tex="r = \dfrac{E}{I_{\text{短}}}" /> 求内阻。</div>
</div>
<div>
<CoordAxes
  :x-range="[0, 1.7]"
  :y-range="[0, 1.7]"
  :x-axis="{ quantity: 'I', unit: 'A' }"
  :y-axis="{ quantity: 'U', unit: 'V' }"
  :ticks="{ x: [0.5, 1, 1.5], y: [0.5, 1, 1.5] }"
  :view="{ width: 640, height: 420 }"
  :curves="[{ points: [{ x: 0, y: 1.5 }, { x: 1.5, y: 0 }], stroke: 'var(--c-accent-2)', width: 3 }]"
  :labels="[
    { x: 0, y: 1.5, tex: 'E', anchor: 'top-right', size: 19, halo: true, dot: 5, dy: 20, showAt: 1 },
    { x: 0.75, y: 0.75, tex: 'k = -r', anchor: 'top-right', size: 18, halo: true, showAt: 2 },
    { x: 1.5, y: 0, tex: 'I_{\\text{短}}', anchor: 'top-left', size: 19, halo: true, dot: 5, showAt: 2 },
  ]"
  :step="$clicks"
/>
</div>
</div>

<div v-click="3" class="key">反过来，测出多组 <Latex tex="U" />、<Latex tex="I" /> 作出这条直线，从纵截距和斜率就能读出电池的 <Latex tex="E" /> 和 <Latex tex="r" />。</div>
</div>

---
clicks: 2
---
<div class="page-grow">
<div class="ask ask-lead">电池用久了灯会变暗——是电动势变小了，还是内阻变大了？</div>

<div v-click="1" class="stack">
<div>要回答这个问题，得先把电池的 <Latex tex="E" /> 和 <Latex tex="r" /> 测出来。由闭合电路欧姆定律 <Latex tex="U = E - Ir" /> 出发，测出两组路端电压 <Latex tex="U" /> 和电流 <Latex tex="I" />，就是两个方程、两个未知数：</div>
<Latex tex="\begin{cases} U_1 = E - I_1 r \\ U_2 = E - I_2 r \end{cases}" display />
</div>

<div v-click="2" class="stack">
<div>解得：</div>
<Latex tex="E = \dfrac{U_1 I_2 - U_2 I_1}{I_2 - I_1}, \qquad r = \dfrac{U_1 - U_2}{I_2 - I_1}" display />
</div>
</div>
---
clicks: 2
---

<div class="page-grow">
<div class="ask">电压表、电流表各接在哪里？两种接法测出的结果一样吗？</div>

<div class="half-grid">
<div class="stack">
<VoltAmpOuter :step="$clicks" />
<div v-click="1" class="stack-tight">
<div class="mini-title"><mdi-swap-horizontal class="icon-md" />电流表外接法</div>
<div>电流表只串在外电路（变阻器）这一支路上。</div>
</div>
</div>
<div class="stack">
<VoltAmpInner :step="$clicks" />
<div v-click="2" class="stack-tight">
<div class="mini-title"><mdi-vector-polyline class="icon-md" />电流表内接法</div>
<div>电流表与电源同在干路上，测的就是干路电流。</div>
</div>
</div>
</div>

<div class="mini-note">两图都把开关接在电源负极一侧：断开开关，电压表示数归零。</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">只用两组数据解方程，可靠吗？</div>

<div v-click="1">
两组读数各有误差，解出的 <Latex tex="E" />、<Latex tex="r" /> 可能差很多——所以要改变外电阻、多测几组。
</div>

<div v-click="2" class="stack">
<div class="mini-title"><mdi-format-list-numbered class="icon-md" />多组数据的两种处理方式</div>
<div>① 任取两组列方程，求出多组 <Latex tex="E" />、<Latex tex="r" />，再取平均值；</div>
<div>② 作 <Latex tex="U-I" /> 图像，用一条直线拟合所有数据点——更简便、更直观。</div>
</div>
</div>

---
clicks: 2
---

# 操作与记录

<div class="page-grow">
<div class="stack">
<div v-click="1">① 滑动变阻器先调到较大阻值，再逐次减小，让电流由小到大，取 6～8 组 <Latex tex="(U,\ I)" />；</div>
<div v-click="1">② 每次同时记下 <Latex tex="U" />、<Latex tex="I" />；断开开关后再改接线。</div>
</div>

<div v-click="2" class="key">选旧的干电池：内阻较大，电流变化时路端电压变化明显，更容易测准。</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">五组数据里 <Latex tex="U" /> 只变了 <Latex tex="0.11\ \text{V}" />——纵轴从 0 画会怎样？</div>

<div v-click="1" class="stack">
<div>点会挤成一条水平线，斜率和截距都读不准。</div>
<div>纵轴起点按数据选（比如从 <Latex tex="1.86\ \text{V}" /> 起），用锯齿折断线表示省略；截距仍由直线延长到 <Latex tex="I = 0" /> 读出。</div>
</div>

<div v-click="2">
描点用十字叉——点本身有粗细，圆点会盖住直线；拟合时让直线两侧的数据点均衡分布。
</div>
</div>

---
---

<div class="page-grow">
<div class="ask">这五组数据对应的直线，截距和斜率各是多少？</div>

<EmfFitLine />
</div>

---
clicks: 2
---

# 外接法：电压表的分流

<div class="page-grow">
<div class="tag-icon"><mdi-calculator />分析方法 1 · 计算法</div>

<div class="ask">电压表也要分走电流——电流表读数偏小，会让 <Latex tex="E" />、<Latex tex="r" /> 偏大还是偏小？</div>

<div v-click="1">电压表也有电流流过：<Latex tex="I_V = \dfrac{U}{R_V}" />。这部分电流不经过电流表、却来自电源，所以流过电源的真实电流是 <Latex tex="I_0 = I + \dfrac{U}{R_V}" />——电流表读数 <Latex tex="I" /> 偏小。用真实电流列方程（修正）：</div>

<div v-click="2">
<Latex tex="\begin{cases} E_0 = U_1 + \left(I_1 + \dfrac{U_1}{R_V}\right) r_0 \\ E_0 = U_2 + \left(I_2 + \dfrac{U_2}{R_V}\right) r_0 \end{cases}" display />
</div>
</div>

---
clicks: 2
---

# 外接法：真值与测量值

<div class="page-grow">
<div>由修正方程解得真值——两个式子的分母都比测量值的小：</div>

<Latex tex="E_0 = \dfrac{U_1 I_2 - U_2 I_1}{I_2 - I_1 - \frac{U_1 - U_2}{R_V}} > E_{\text{测}}" display />

<Latex tex="r_0 = \dfrac{U_1 - U_2}{I_2 - I_1 - \frac{U_1 - U_2}{R_V}} > r_{\text{测}}" display />

<div v-click="1" class="key">外接法：<Latex tex="E_{\text{测}} < E_{\text{真}}" />，<Latex tex="r_{\text{测}} < r_{\text{真}}" />（都偏小）。</div>

<div v-click="2" class="mini-note">因为 <Latex tex="U_1 > U_2" />，分母 <Latex tex="I_2 - I_1 - \frac{U_1 - U_2}{R_V}" /> 比 <Latex tex="I_2 - I_1" /> 小，所以解出的 <Latex tex="E_0" />、<Latex tex="r_0" /> 都比测量值大。</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">外接法的数据描出的直线，与真实直线差在哪里？</div>

<div class="half-grid">
<div class="stack">
<div class="tag-icon"><mdi-chart-line />分析方法 2 · 图像法</div>
<div v-click="1">测量线（蓝）：纵截距 <Latex tex="E_{\text{测}} < E_0" />，斜率绝对值 <Latex tex="r_{\text{测}} < r_0" />。</div>
<div v-click="2">真实线（红）：电压表分流后的真实关系——截距更大、直线更陡。</div>
<div v-click="3" class="key">两条线在横轴上交于同一点：<Latex tex="U = 0" /> 时电压表不分流，电流表读数就是真实的短路电流。</div>
</div>
<div>
<UIErrorOuter :step="$clicks" />
</div>
</div>
</div>

---
clicks: 3
---

# 外接法：把电压表"并进"电源

<div class="page-grow">
<div class="tag-icon"><mdi-swap-horizontal />分析方法 3 · 等效法</div>

<div class="ask">电压表并联在电源两端——能不能把"电压表 + 电源"看成一个新电源？</div>

<div v-click="1">等效电源的电动势＝开路时电压表两端的电压（<Latex tex="r_0" /> 与 <Latex tex="R_V" /> 分压）：<Latex tex="E_{\text{等}} = \dfrac{R_V}{r_0 + R_V} E_0 < E_0" /></div>

<div v-click="2">等效电源的内阻＝<Latex tex="r_0" /> 与 <Latex tex="R_V" /> 并联：<Latex tex="r_{\text{等}} = \dfrac{r_0 R_V}{r_0 + R_V} < r_0" /></div>

<div v-click="3" class="key">实验测到的就是这个等效电源：<Latex tex="E_{\text{测}} < E_{\text{真}}" />、<Latex tex="r_{\text{测}} < r_{\text{真}}" />；只要 <Latex tex="R_V \gg r_0" />（干电池内阻很小，常满足），偏差就很小。</div>
</div>

---
clicks: 3
---

# 内接法：电流表的分压

<div class="page-grow">
<div class="tag-icon"><mdi-calculator />分析方法 1 · 计算法</div>

<div v-click="1" class="stack">
<div>电流表有内阻 <Latex tex="R_A" />，它分走电压 <Latex tex="I R_A" />。</div>
<div>电压表读数 <Latex tex="U" /> 比真实路端电压小：<Latex tex="U = U_0 - I R_A" />。</div>
</div>

<div v-click="2" class="stack">
<div>把 <Latex tex="R_A" /> 与 <Latex tex="r_0" /> 合在一起列方程：</div>
<Latex tex="\begin{cases} E_0 = U_1 + I_1 (r_0 + R_A) \\ E_0 = U_2 + I_2 (r_0 + R_A) \end{cases}" display />
</div>

<div v-click="3" class="key">电动势的测量值不受影响：<Latex tex="E_{\text{测}} = E_0" />；内阻却把电流表内阻算了进去：<Latex tex="r_{\text{测}} = r_0 + R_A > r_0" />。</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask">内接法的两条直线，交点又在哪条轴上？</div>

<div class="half-grid">
<div class="stack">
<div class="tag-icon"><mdi-chart-line />分析方法 2 · 图像法</div>
<div v-click="1">测量线（蓝）：斜率绝对值是 <Latex tex="r_0 + R_A" />，比真实线更陡。</div>
<div v-click="2">真实线（红）：斜率绝对值只是 <Latex tex="r_0" />。</div>
<div v-click="3" class="key">两条线在纵轴上交于同一点：<Latex tex="I = 0" /> 时电流表不分压，纵截距就是真实的电动势 <Latex tex="E_{\text{测}} = E_0" />。</div>
</div>
<div>
<UIErrorInner :step="$clicks" />
</div>
</div>
</div>

---
clicks: 2
---

# 内接法：把电流表"串进"电源

<div class="page-grow">
<div class="tag-icon"><mdi-swap-horizontal />分析方法 3 · 等效法</div>

<div class="ask">把"电流表 + 电源"看成一个新电源，它的 <Latex tex="E" /> 和 <Latex tex="r" /> 是多少？</div>

<div v-click="1">串联后电动势不变 <Latex tex="E_{\text{等}} = E_0" />，内阻直接相加 <Latex tex="r_{\text{等}} = r_0 + R_A" />。</div>

<div v-click="2" class="key">要减小误差需 <Latex tex="r_0 \gg R_A" />；实验室电池内阻通常很小，这一条很难满足——所以测小内阻电池一般不用内接法。</div>
</div>

---
clicks: 2
---

# 两种接法，怎么选？

<div class="page-grow">
<div class="ask">测干电池（内阻很小），该选哪种接法？</div>

<div v-click="1" class="stack">
<div class="mini-title"><mdi-battery class="icon-md" />测干电池（内阻很小）</div>
<div>用<b>外接法</b>：只要 <Latex tex="R_V \gg r_0" />，<Latex tex="E" />、<Latex tex="r" /> 的偏差都很小——教材的参考案例 1 就用它。</div>
</div>

<div v-click="2" class="stack">
<div class="mini-title"><mdi-fruit-citrus class="icon-md" />测内阻大的电源</div>
<div>内接法把电流表内阻计进内阻，只有 <Latex tex="r_0 \gg R_A" /> 时误差才小（如内阻上千欧的水果电池）。</div>
</div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">没有电流表，只有电压表和电阻箱，还能测吗？</div>

<div v-click="1" class="stack">
<div>能。电压表测路端电压 <Latex tex="U" />，电阻箱给出已知的外电阻 <Latex tex="R" />。</div>
<div>由 <Latex tex="E = U + Ir" /> 和 <Latex tex="I = \dfrac{U}{R}" /> 得 <Latex tex="E = U + \dfrac{U}{R} r" />——电流不用测，算出来就行。</div>
<div>测两组 <Latex tex="(U,\ R)" />，同样解出 <Latex tex="E" />、<Latex tex="r" />。</div>
</div>
</div>

---
clicks: 1
---

# 伏阻法：用 $R$ 算出 $I$

<div class="page-grow">
<div class="split-wide split-narrow">
<div class="stack">
<VoltResCircuit :step="$clicks" />
<Latex tex="E = U + \dfrac{U}{R} r" display />
</div>
<div class="stack">
<div>两组数据：</div>
<Latex tex="\begin{cases} E = U_1 + \dfrac{U_1}{R_1} r \\ E = U_2 + \dfrac{U_2}{R_2} r \end{cases}" display />
<div v-click="1">解得：</div>
<Latex v-click="1" tex="E = \dfrac{U_1 U_2 (R_1 - R_2)}{U_2 R_1 - U_1 R_2}, \qquad r = \dfrac{(U_1 - U_2) R_1 R_2}{U_2 R_1 - U_1 R_2}" display />
</div>
</div>
</div>

---
clicks: 3
---

# 伏阻法：化成直线

<div class="page-grow">
<div class="ask">把 <Latex tex="E = U + \dfrac{U}{R} r" /> 化成直线——该以什么为坐标轴？</div>

<div class="half-grid">
<div class="stack">
<Latex v-click="1" tex="\dfrac{1}{U} = \dfrac{1}{E} + \dfrac{r}{E} \cdot \dfrac{1}{R}" display />
<div v-click="2">纵轴截距 <Latex tex="a = \dfrac{1}{E} \Rightarrow E = \dfrac{1}{a}" />；斜率 <Latex tex="k = \dfrac{r}{E} \Rightarrow r = \dfrac{k}{a} = kE" />。</div>
<div v-click="3">外推到 <Latex tex="\dfrac{1}{U} = 0" />：横轴截距为 <Latex tex="-\dfrac{1}{r}" />，所以 <Latex tex="r = \dfrac{1}{b}" />（<Latex tex="b" /> 是横截距的绝对值）。</div>
</div>
<div>
<InverseURGraph :step="$clicks" />
</div>
</div>
</div>

---
clicks: 2
---

# 伏阻法：误差从哪里来

<div class="page-grow">
<div class="ask">电压表分走的电流，会让 <Latex tex="E" />、<Latex tex="r" /> 偏大还是偏小？</div>

<div v-click="1" class="stack">
<div>电压表并联在电阻箱两端，也分走一部分电流，这部分电流没有经过电阻箱。</div>
<div>所以用 <Latex tex="\dfrac{U}{R}" /> 算出的电流，比流过电源的真实电流小。</div>
</div>

<div v-click="2" class="key">这与<b>电流表外接法</b>同源：<Latex tex="E_{\text{测}} < E_{\text{真}}" />，<Latex tex="r_{\text{测}} < r_{\text{真}}" />（都偏小）。</div>
</div>

---
clicks: 2
---

# 参考案例：水果电池

<div class="page-grow">
<div class="half-grid">
<div>
<FruitBatterySvg />
</div>
<div class="stack">
<div>用电压表 + 电阻箱，按伏阻法测它的 <Latex tex="E" /> 和 <Latex tex="r" />。</div>
<div v-click="1">内阻可达上千欧，电流变化时电压变化明显，容易测——正适合伏阻法。</div>
<div v-click="2" class="key">但它的内阻会明显改变：测量要迅速，在内阻变化不大之前测完。</div>
</div>
</div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">反过来：只有电流表和电阻箱，没有电压表呢？</div>

<div v-click="1" class="stack">
<div class="key key-lead">没有电压表，就用<b>电流表 + 电阻箱</b>：电流表测干路电流 <Latex tex="I" />，电阻箱给出已知的外电阻 <Latex tex="R" />，由 <Latex tex="E = I(R + r)" /> 直接列方程。</div>
<div>测两组 <Latex tex="(I,\ R)" />，就能解出 <Latex tex="E" />、<Latex tex="r" />。</div>
</div>
</div>

---
clicks: 1
---

# 安阻法：电压不用测

<div class="page-grow">
<div class="split-wide split-narrow">
<div class="stack">
<AmpResCircuit :step="$clicks" />
<Latex tex="E = I(R + r)" display />
</div>
<div class="stack">
<div>两组数据：</div>
<Latex tex="\begin{cases} E = I_1 (R_1 + r) \\ E = I_2 (R_2 + r) \end{cases}" display />
<div v-click="1">解得：</div>
<Latex v-click="1" tex="E = \dfrac{I_1 I_2 (R_1 - R_2)}{I_2 - I_1}, \qquad r = \dfrac{I_1 R_1 - I_2 R_2}{I_2 - I_1}" display />
</div>
</div>
</div>

---
clicks: 2
---

# 安阻法：$\dfrac{1}{I}$ 与 $R$ 成直线

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<Latex tex="\dfrac{1}{I} = \dfrac{1}{E} R + \dfrac{r}{E}" display />
<div v-click="1">斜率 <Latex tex="k = \dfrac{1}{E} \Rightarrow E = \dfrac{1}{k}" />；纵截距 <Latex tex="a = \dfrac{r}{E} \Rightarrow r = \dfrac{a}{k}" />。</div>
<div v-click="2" class="mini-note">外推到 <Latex tex="\dfrac{1}{I} = 0" />：横截距为 <Latex tex="-r" />，取绝对值就是内阻。</div>
</div>
<div>
<InverseIRGraph :step="$clicks" />
</div>
</div>
</div>

---
clicks: 2
---

# 安阻法：换轴再画

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<Latex tex="R = E \cdot \dfrac{1}{I} - r" display />
<div v-click="2">斜率就是 <Latex tex="E" />，纵轴截距为 <Latex tex="-r" />（取绝对值即内阻）。</div>
</div>
<div>
<ResistanceVsInverseI :step="$clicks" />
</div>
</div>
</div>

---
clicks: 2
---

# 安阻法：误差从哪里来

<div class="page-grow">
<div class="ask">电流表分走的电压，会让 <Latex tex="E" />、<Latex tex="r" /> 偏大还是偏小？</div>

<div v-click="1" class="stack">
<div>电流表串在干路上，它的内阻 <Latex tex="R_A" /> 也分走电压 <Latex tex="I R_A" />。</div>
<div>所以用 <Latex tex="I R" /> 算出的"电压"，比真实路端电压小。</div>
</div>

<div v-click="2" class="key">这与<b>电流表内接法</b>同源：<Latex tex="E_{\text{测}} = E_{\text{真}}" />，<Latex tex="r_{\text{测}} = r_0 + R_A > r_{\text{真}}" />；若 <Latex tex="R_A" /> 已知，可从测量内阻里减去它。</div>
</div>

---
layout: exercise-split
clicks: 3
---

<template v-slot:stem>

<div class="mini-title"><mdi-table class="icon-md" />练习：橙汁电池</div>

电流表内阻 <Latex tex="100\ \Omega" />、量程 <Latex tex="0 \sim 300\ \mu\text{A}" />；电阻箱 <Latex tex="0 \sim 9\,999\ \Omega" />。调节电阻箱，测得：

| $R/\text{k}\Omega$ | 9   | 8   | 7   | 6   | 5   | 4   | 3   |
| ------------------ | --- | --- | --- | --- | --- | --- | --- |
| $I/\mu\text{A}$    | 92  | 102 | 115 | 131 | 152 | 180 | 220 |

</template>

<div v-click="1">由 <Latex tex="U = IR" /> 算出电阻箱两端电压，依次为 <Latex tex="0.83" />、<Latex tex="0.82" />、<Latex tex="0.81" />、<Latex tex="0.79" />、<Latex tex="0.76" />、<Latex tex="0.72" />、<Latex tex="0.66" /> <Latex tex="\text{V}" />。</div>

<div v-click="2">作 <Latex tex="U-I" /> 图像，直线在 <Latex tex="U" /> 轴上的截距就是电动势：<Latex tex="E \approx 0.95\ \text{V}" />。</div>

<div v-click="3" class="key">斜率的绝对值是 <Latex tex="r + R_A \approx 1.3\ \text{k}\Omega" />；减去电流表内阻 <Latex tex="100\ \Omega" />，得电池内阻 <Latex tex="r \approx 1.2\ \text{k}\Omega" />。</div>

---
clicks: 2
---

# 四种方法，误差往哪偏

<div class="page-grow">

| 方法               | 电路特征               | 等效为     | $E_{\text{测}}$ | $r_{\text{测}}$ |
| ------------------ | ---------------------- | ---------- | --------------- | --------------- |
| 伏安法外接 · 伏阻法 | 电压表并接，分走电流   | 电流表外接 | 偏小            | 偏小            |
| 伏安法内接 · 安阻法 | 电流表串入，分走电压   | 电流表内接 | 等于真值        | 偏大            |

<div v-click="1">测干电池（内阻小）用<b>外接法 / 伏阻法</b>；内接法、安阻法要求 <Latex tex="r_0 \gg R_A" />，否则测出的内阻里混进了电流表内阻（<Latex tex="R_A" /> 已知时可以减去）。</div>

<div v-click="2" class="key"><b>将分流、分压的元件并进等效电源</b>：电压表分流，<Latex tex="E" />、<Latex tex="r" /> 都偏小；电流表分压，<Latex tex="E" /> 不变、<Latex tex="r" /> 偏大。</div>
</div>
