---
theme: default
title: "牛顿第二定律"
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
chapter: 第四章 运动和力的关系
---

<CoverDecorationSvg />

---
clicks: 6
---

<h1 v-click="3">牛顿第二定律</h1>

<div class="page-grow">
<div class="ask ask-lead" v-click="1">上节课的实验得到 <Latex tex="a \propto F" />、<Latex tex="a \propto \frac{1}{m}" />。怎么把它们合成一条定量关系？</div>

<div class="lead-formula" v-click="2"><Latex tex="a \propto \frac{F}{m} \quad \Longrightarrow \quad F \propto ma" /></div>

<div class="card" v-click="4">物体加速度的大小跟它受到的<b>作用力成正比</b>，跟它的<b>质量成反比</b>，加速度的方向跟作用力的方向<b>相同</b>。</div>

<div class="ask" v-click="5">式中的 <Latex tex="F" /> 指的是某一个力，还是物体受到的合力？</div>

<div class="key" v-click="6">牛顿第二定律里的 <Latex tex="F" /> 指物体所受的<b>合力</b>：合力决定加速度，加速度的方向始终与合力方向相同。</div>
</div>

---
clicks: 3
---

# 力的单位

<div class="page-grow">
<div class="ask"><Latex tex="F \propto ma" /> 写成等式是 <Latex tex="F = kma" />，<Latex tex="k" /> 的数值取决于什么？</div>

<div v-click="1">取决于 <Latex tex="F" />、<Latex tex="m" />、<Latex tex="a" /> 的单位怎么选。</div>

<div class="stack" v-click="2">
<div>国际单位制下取 <Latex tex="m" /> 的单位为 <Latex tex="\text{kg}" />、<Latex tex="a" /> 的单位为 <Latex tex="\text{m/s}^2" />，规定 <Latex tex="k = 1" />。</div>
<div>这时把「使 <Latex tex="1\ \text{kg}" /> 的物体产生 <Latex tex="1\ \text{m/s}^2" /> 加速度的力」定为力的单位，记作 <Latex tex="1\ \text{N}" />：<Latex tex="1\ \text{N} = 1\ \text{kg}\cdot\text{m}\cdot\text{s}^{-2}" />。</div>
</div>

<div class="key" v-click="3">力的单位这样定下来之后，比例系数 <Latex tex="k = 1" />，牛顿第二定律就写成 <Latex tex="F = ma" />。</div>
</div>

---
clicks: 3
---

# 正交分解

<div class="page-grow">
<div class="ask"><Latex tex="F = ma" /> 是矢量式 —— 要判断哪个方向上有加速度，先看哪个方向上有没有合力？</div>

<div class="half-grid" v-click="1">
<div class="cases-swap">
<div class="stack" style="align-items: center" v-click.hide="2">
<div class="mini-title">平面内：两个方向</div>
<div class="cases-formula"><Latex tex="\begin{cases} \sum F_x = m a_x \\ \sum F_y = m a_y \end{cases}" display /></div>
</div>
<div class="stack" style="align-items: center" v-click="2">
<div class="mini-title">空间里：三个方向</div>
<div class="cases-formula"><Latex tex="\begin{cases} \sum F_x = m a_x \\ \sum F_y = m a_y \\ \sum F_z = m a_z \end{cases}" display /></div>
</div>
</div>
<div class="stack divider-l">
<div>哪个方向有合力，那个方向就有加速度；</div>
<div>哪个方向合力为零，那个方向的加速度就为零。</div>
<div class="mini-note">高中绝大多数问题只在平面内运动，两个方向就够了。</div>
</div>
</div>

<div class="key" v-click="3">先把物体受到的力正交分解，再在每个方向上分别列 <Latex tex="F = ma" /> —— 这是用牛顿第二定律解题的通用方法。</div>
</div>

---
clicks: 3
---

# 合力的方向就是加速度的方向

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><ForceDecompSvg :show-decomp="$clicks >= 1" /></div>
<div class="stack stack-dense divider-l">
<div class="ask">物块受到一支斜向右下方的合力 <Latex tex="F" />，它的加速度朝哪个方向？两个方向上各自会怎样？</div>
<div v-click="1">加速度与合力<b>共线同向</b>；把 <Latex tex="F" /> 分解到水平、竖直两个方向，就得到两个方向的分加速度。</div>
<div v-click="2">沿水平方向 <Latex tex="F_1 = m a_1" />；沿竖直方向 <Latex tex="F_2 = m a_2" />。</div>
<div class="key" v-click="3">分力与分加速度一一对应：在哪个方向上分解力，就在哪个方向上得到加速度。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 自由落体

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><FreeFallSvg :show-forces="$clicks >= 1" /></div>
<div class="stack divider-l">
<div class="ask">小球只受重力、由静止下落，它的加速度是多大？</div>
<div v-click="1">受力分析：小球只受重力 <Latex tex="G = mg" />，方向竖直向下，所以合力 <Latex tex="F_{\text{合}} = mg" />。</div>
<div v-click="2">由 <Latex tex="F = ma" /> 得 <Latex tex="mg = ma" />，所以 <Latex tex="a = g" />。</div>
<div class="key" v-click="3">自由落体的加速度恒为 <Latex tex="g" />，与小球质量无关。</div>
</div>
</div>
</div>

---
clicks: 5
---

# 水平面滑动摩擦

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><FrictionSlideSvg :show-forces="$clicks >= 1" /></div>
<div class="stack stack-condensed divider-l">
<div class="ask">物块以速度 <Latex tex="v" /> 在水平面上向右滑动，撤去动力后只受滑动摩擦力，加速度多大？</div>
<div v-click="1">先看<b>运动</b>：物块不会飞离地面，也不会嵌入地面，只能沿水平面运动 —— 竖直方向<b>始终没有速度，也就没有加速度</b>。</div>
<div v-click="2">由 <Latex tex="F = ma" />：竖直方向加速度为零 <Latex tex="\Rightarrow" /> 合力为零 <Latex tex="\Rightarrow" /> <Latex tex="F_N = G = mg" />。</div>
<div v-click="3">水平方向只有滑动摩擦力，大小 <Latex tex="F_f = \mu F_N = \mu mg" />，方向与 <Latex tex="v" /> 相反。</div>
<div v-click="4">对这个方向列 <Latex tex="F = ma" />：<Latex tex="\mu mg = ma \Rightarrow a = \mu g" />。</div>
<div class="key" v-click="5"><Latex tex="a" /> 只由 <Latex tex="\mu" /> 和 <Latex tex="g" /> 决定，与质量无关。</div>
</div>
</div>
</div>

---
clicks: 5
---

# 光滑斜面下滑

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><SmoothInclineSvg :show-forces="$clicks >= 1" /></div>
<div class="stack stack-condensed divider-l">
<div class="ask">光滑斜面上的物块由静止下滑，沿斜面的加速度是多大？</div>
<div v-click="1">先看<b>运动</b>：物块不会脱离斜面，也不会嵌入斜面，只能沿斜面下滑 —— 垂直斜面方向<b>没有速度，也没有加速度</b>。</div>
<div v-click="2">垂直斜面方向合力为零，而重力在该方向的分力是 <Latex tex="mg\cos\theta" />，所以 <Latex tex="F_N = mg\cos\theta" />。</div>
<div v-click="3">沿斜面方向：让它下滑的只有重力的分力 <Latex tex="mg\sin\theta" />。</div>
<div v-click="4">由 <Latex tex="F = ma" /> 得 <Latex tex="mg\sin\theta = ma \Rightarrow a = g\sin\theta" />。</div>
<div class="key" v-click="5">下滑加速度只由倾角 <Latex tex="\theta" /> 决定：<Latex tex="\theta" /> 越大，下滑越快。</div>
</div>
</div>
</div>

---
clicks: 4
---

# 斜面连体：绳上有拉力吗

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><ConnectedNoForceSvg :show-forces="$clicks >= 1" /></div>
<div class="stack stack-dense divider-l">
<div class="ask">光滑斜面上，<Latex tex="m_1" />、<Latex tex="m_2" /> 用轻绳相连一起下滑。绳的拉力 <Latex tex="F_T" /> 是多大？</div>
<div v-click="1">两物块由绳相连，沿斜面的加速度相同。</div>
<div v-click="2">整体：(<Latex tex="m_1 + m_2)g\sin\theta = (m_1 + m_2)a" />，得 <Latex tex="a = g\sin\theta" />。</div>
<div v-click="3">隔离 <Latex tex="m_2" />：<Latex tex="m_2 g\sin\theta - F_T = m_2 a" />，代入 <Latex tex="a" /> 得 <Latex tex="F_T = 0" />。</div>
<div class="key" v-click="4">没有外力时，两个物块各自的加速度都正好是 <Latex tex="g\sin\theta" /> —— 绳根本不需要出力。</div>
</div>
</div>
</div>

---
clicks: 4
---

# 斜面连体：加上拉力

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><PulledInclineSvg :show-forces="$clicks >= 1" /></div>
<div class="stack stack-dense divider-l">
<div class="ask">若对下方的 <Latex tex="m_1" /> 再加一个沿斜面向下的拉力 <Latex tex="F" />，绳上还有拉力吗？</div>
<div v-click="1">两物块仍由绳相连，沿斜面的加速度相同。</div>
<div v-click="2">整体：<Latex tex="F + (m_1 + m_2)g\sin\theta = (m_1 + m_2)a" />。</div>
<div v-click="3">隔离 <Latex tex="m_2" />：<Latex tex="m_2 g\sin\theta + F_T = m_2 a" />，联立解得 <Latex tex="F_T = \frac{m_2}{m_1 + m_2}F" />。</div>
<div class="key" v-click="4">拉力只由 <Latex tex="F" /> 和两物块的质量分配决定，与倾角 <Latex tex="\theta" />、<Latex tex="g" /> 都无关。</div>
</div>
</div>
</div>

---
clicks: 1
---

# 粗糙斜面

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><RoughInclineProblemSvg /></div>
<div class="stack divider-l">
<div class="ask">物块在粗糙斜面上，可能上滑，也可能下滑。两种情况下，它的加速度各是多大？</div>
<div v-click="1">题目给了哪个方向的运动，滑动摩擦力就<b>与这个方向相反</b> —— 先把运动方向定下来，再谈受力。</div>
</div>
</div>
</div>

---
clicks: 4
---

# 粗糙斜面：向下滑

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><RoughInclineDownSvg :show-forces="$clicks >= 1" /></div>
<div class="stack stack-condensed divider-l">
<div class="ask">物块沿粗糙斜面<b>下滑</b>，加速度多大？</div>
<div v-click="1">受力分析：重力 <Latex tex="G = mg" /> 竖直向下，支持力 <Latex tex="F_N" /> 垂直斜面向上，滑动摩擦力 <Latex tex="F_f" /> 沿斜面<b>向上</b>（与下滑方向相反）。</div>
<div v-click="2">正交分解 —— 垂直斜面方向：<Latex tex="F_N = mg\cos\theta" />。</div>
<div v-click="3">沿斜面方向：<Latex tex="mg\sin\theta - F_f = ma" />。</div>
<div v-click="4">代入 <Latex tex="F_f = \mu F_N = \mu mg\cos\theta" />，得 <Latex tex="a = g\sin\theta - \mu g\cos\theta" />，方向沿斜面向下。</div>
</div>
</div>
</div>

---
clicks: 5
---

# 粗糙斜面：向上滑

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><RoughInclineUpSvg :show-forces="$clicks >= 1" /></div>
<div class="stack stack-condensed divider-l">
<div class="ask">物块沿粗糙斜面<b>上滑</b>，加速度多大？</div>
<div v-click="1">受力分析：重力 <Latex tex="G = mg" /> 竖直向下，支持力 <Latex tex="F_N" /> 垂直斜面向上，滑动摩擦力 <Latex tex="F_f" /> 沿斜面<b>向下</b>（与上滑方向相反）。</div>
<div v-click="2">正交分解 —— 垂直斜面方向：<Latex tex="F_N = mg\cos\theta" />。</div>
<div v-click="3">沿斜面方向：<Latex tex="mg\sin\theta + F_f = ma" />。</div>
<div v-click="4">代入 <Latex tex="F_f = \mu mg\cos\theta" />，得 <Latex tex="a = g\sin\theta + \mu g\cos\theta" />，方向沿斜面向下。</div>
<div class="key" v-click="5">两次只差摩擦力的方向：合成 <Latex tex="a = g\sin\theta \pm \mu g\cos\theta" />，上滑取「<Latex tex="+" />」、下滑取「<Latex tex="-" />」，由<b>滑动方向</b>决定。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 力变，加速度随之而变

<div class="page-grow">
<div class="ask"><Latex tex="F = ma" /> 中的 <Latex tex="F" />，是某一瞬间的合力，还是全过程平均下来的合力？</div>

<div class="stack" v-click="1">
<div class="mini-title">瞬时性</div>
<div>某一瞬间的合力，决定的就是那一瞬间的加速度；合力变了，加速度立刻跟着变。</div>
</div>

<div class="two-cases" v-click="2">
<div class="case-item">
<div class="case-name">阻滞下落</div>
<div><Latex tex="F_f = kv" /></div>
<div class="mini-note">阻力随速度变化</div>
</div>
<div class="case-item">
<div class="case-name">弹簧</div>
<div><Latex tex="F = k\Delta x" /></div>
<div class="mini-note">弹力随形变量变化</div>
</div>
</div>

<div class="key" v-click="3">力与加速度<b>同时产生、同时变化、同时消失</b>，中间没有滞后。</div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><SpringBallSetupSvg :show-forces="$clicks >= 1" /></div>
<div class="stack divider-l">
<div class="mini-title">轻质托盘弹簧小球下落模型</div>
<div>地面上竖直固定一根轻弹簧，顶端连着轻质托盘。小球从托盘正上方由静止落下，落入托盘后与弹簧一起运动。</div>
<div v-click="1">小球只受重力 <Latex tex="G = mg" /> 和托盘的支持力；接触托盘之后，弹簧的形变开始变化。</div>
<div class="ask">从静止下落开始，到落至最低点，再到被弹回原高度 —— 它的 <Latex tex="v" /> 和 <Latex tex="a" /> 会怎样变化？</div>
</div>
</div>
</div>

---
---

<div class="page-grow">
<SpringBallSim />
</div>

---
clicks: 5
---

# 全过程的速度图像

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell figure-cell-plot"><SpringBallVtGraph :step="$clicks" /></div>
<div class="stack stack-dense divider-l phase-list">
<div v-click="1"><b>自由落体段</b>：只受重力，图线是斜率不变的直线。</div>
<div v-click="2"><b>压缩加速段</b>：<Latex tex="mg > kx" />，合力仍向下但在减小，图线向上鼓起、斜率越来越小；到 <Latex tex="mg = kx" /> 处速度达到最大。</div>
<div v-click="3"><b>压缩减速段</b>：<Latex tex="kx > mg" />，合力向上，图线弯过 <Latex tex="t" /> 轴，速度减小到零（最低点）。</div>
<div v-click="4"><b>向上反弹段</b>：速度转为向上，先加速后减速，回到接触点。</div>
<div v-click="5"><b>脱离上抛段</b>：离开托盘后只受重力，图线恢复成直线，到最高点速度为零。</div>
</div>
</div>
</div>

---
clicks: 2
---

# 全过程的加速度—位移图像

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell figure-cell-plot" v-click="1"><SpringBallAxGraph /></div>
<div class="stack divider-l">
<div class="ask">以释放点为位移原点，加速度 <Latex tex="a" /> 随下落位移 <Latex tex="x" /> 怎样变化？</div>
<div v-click="2">接触托盘前：只受重力，<Latex tex="a = g" />，图线是<b>水平直线</b>。</div>
<div v-click="2">接触托盘后：<Latex tex="F_{\text{合}} = mg - kx" />，得 <Latex tex="a = g - \frac{k}{m}x" />，图线是<b>向右下方倾斜的直线</b>。</div>
<div v-click="2">图线穿过 <Latex tex="x" /> 轴处 <Latex tex="a = 0" />，正是平衡位置；再往下加速度反向增大，直到最低点。</div>
</div>
</div>
</div>

---
clicks: 5
---

# 面积的物理意义

<div class="page-grow">
<div class="ask"><Latex tex="a\text{-}x" /> 图线与横轴围成的面积，代表什么？</div>

<div v-click="1">回忆匀变速直线运动的推论：<Latex tex="v^2 - v_0^2 = 2ax" />，也就是 <Latex tex="2ax = \Delta(v^2)" />。</div>

<div v-click="2">这里 <Latex tex="a" /> 会变，上面的式子不能直接用。<b>把位移切成很多小段 <Latex tex="\Delta x" />：每段足够短时，段内的 <Latex tex="a" /> 就可以看成不变</b> —— 这一小段对速度平方的贡献就是 <Latex tex="2a\Delta x" />。</div>

<div v-click="3">把所有小段加起来：<Latex tex="2\sum a\Delta x = v^2 - v_0^2" />，即 <Latex tex="\sum a\Delta x = \frac{\Delta(v^2)}{2}" />。</div>

<div v-click="4">小段分得越细，每一段里"<Latex tex="a" /> 不变"的假设就越接近真实。<b>取极限</b>：这些小矩形之和 <Latex tex="\sum a\Delta x" /> 就是 <Latex tex="a\text{-}x" /> 图线与横轴围成的面积。</div>

<div class="key" v-click="5">所以 <Latex tex="a\text{-}x" /> 图线的面积＝速度平方变化量的一半，它既不是时间、也不是位移。</div>
</div>

---
clicks: 3
---

# 正面积等于负面积

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell figure-cell-plot" v-click="1"><SpringBallAxGraph :show-areas="true" /></div>
<div class="stack divider-l">
<div class="ask">小球从释放点由静止下落，到最低点速度又减为零。全程 <Latex tex="\int a\,\mathrm{d}x" /> 等于多少？</div>
<div v-click="2"><Latex tex="v_{\text{初}} = 0" />、<Latex tex="v_{\text{末}} = 0" />，所以 <Latex tex="\int a\,\mathrm{d}x = 0" />。</div>
<div v-click="3">横轴上方围出的正面积 <Latex tex="S_1" /> 与横轴下方围出的负面积 <Latex tex="S_2" /> 大小相等：<Latex tex="S_1 = S_2" />。</div>
</div>
</div>

<div class="key" v-click="3">加速度—位移图上的两块面积严格相等，这就是「动能变化为零」在图上读出来的样子。</div>
</div>

---
clicks: 3
---

# 剪断的一瞬间

<div class="page-grow">
<div class="ask">剪断一根绳的瞬间，物体受到的力会立刻改变吗？</div>

<div class="two-cases" v-click="1">
<div class="case-item">
<div class="case-name">弹簧</div>
<div>形变来不及改变，<b>弹力不突变</b>。</div>
</div>
<div class="case-item" v-click="2">
<div class="case-name">绳、杆、接触面弹力</div>
<div>可以突变 —— 突然消失，或者突然改变大小和方向。</div>
</div>
</div>

<div class="key" v-click="3">解题先分清：哪些力会突变、哪些不会，再对每个物体单独列剪断瞬间的 <Latex tex="F = ma" />。</div>
</div>

---
clicks: 3
---

# 模型一：两根绳串联

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><CutDoubleRopeSvg /></div>
<div class="stack divider-l">
<div class="ask">天花板挂绳系球 A（<Latex tex="m" />），A 下方用绳系球 B（<Latex tex="2m" />）。剪断上端绳的瞬间，A、B 的加速度各是多大？</div>
<div v-click="1">剪断后 A、B 一起下落，绳无法再绷紧，绳的拉力突变为 <Latex tex="F_T = 0" />。</div>
<div v-click="2">A：<Latex tex="a_A = g" />；　B：<Latex tex="a_B = g" />。</div>
<div class="key" v-click="3">绳上的拉力可以突变：瞬间消失，A、B 一起自由落体。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 模型二：上绳下弹簧

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><CutRopeSpringSvg /></div>
<div class="stack divider-l">
<div class="ask">天花板挂绳系球 A（<Latex tex="m" />），A 下方用轻弹簧系球 B（<Latex tex="2m" />）。剪断上端绳的瞬间，A、B 的加速度各是多大？</div>
<div v-click="1">弹簧形变不突变 —— 剪断瞬间弹力仍是 <Latex tex="2mg" />：向上拉 B，向下拉 A。</div>
<div v-click="2">A：<Latex tex="mg + 2mg = 3mg = m a_A" />，得 <Latex tex="a_A = 3g" />（向下）；<br />B：<Latex tex="2mg - 2mg = 0" />，得 <Latex tex="a_B = 0" />。</div>
<div class="key" v-click="3">弹簧弹力不突变，A 被弹簧拉得更快、B 反而瞬间平衡 —— 两个球的加速度完全不同。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 模型三：斜绳加水平绳

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><CutHorizontalRopeSvg /></div>
<div class="stack divider-l">
<div class="ask">小球被一根与竖直方向成 <Latex tex="\theta" /> 角的轻绳吊住，左侧再用水平轻绳拉住。剪断水平绳的瞬间，球的加速度多大？</div>
<div v-click="1">剪断瞬间球的速度为零，只能沿圆弧切向运动 —— 因此沿绳方向的加速度为零。</div>
<div v-click="2">沿绳：<Latex tex="F_T - mg\cos\theta = 0" />；<br />垂直于绳：<Latex tex="mg\sin\theta = ma" />。</div>
<div class="key" v-click="3">得 <Latex tex="a = g\sin\theta" />，方向垂直于绳、斜向下。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 模型四：斜弹簧加水平绳

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><CutHorizontalSpringSvg /></div>
<div class="stack divider-l">
<div class="ask">把斜绳换成轻弹簧，同样剪断水平绳的瞬间，球的加速度多大？</div>
<div v-click="1">弹簧形变不突变，弹力保持原值 <Latex tex="F_T = \frac{mg}{\cos\theta}" />（方向仍沿弹簧）。</div>
<div v-click="2">正交分解：<br />竖直：<Latex tex="F_T\cos\theta - mg = 0" />；<br />水平：<Latex tex="F_T\sin\theta = ma" />。</div>
<div class="key" v-click="3">得 <Latex tex="a = g\tan\theta" />，方向水平。</div>
</div>
</div>
</div>

---
clicks: 2
---

# 杆的弹力一定沿杆吗

<div class="page-grow">
<div class="ask">轻杆的弹力，一定沿杆的方向吗？</div>

<div class="half-grid" v-click="1">
<div class="stack" style="align-items: center">
<TwoForceRodSvg />
<div class="fig-cap">两端都是铰链、只受两端的拉压 —— <b>二力杆</b></div>
</div>
<div class="stack divider-l" style="align-items: center">
<WallFixedRodSvg />
<div class="fig-cap">一端被固定死、不能转动 —— <b>多力杆</b></div>
</div>
</div>

<div class="key" v-click="2">只有<b>二力杆</b>的弹力一定沿杆；一端固定的<b>多力杆</b>，弹力方向由受力情况决定。杆不可伸长：沿杆方向，两端的 <Latex tex="x" />、<Latex tex="v" />、<Latex tex="a" /> 都相同。</div>
</div>

---
clicks: 3
---

# 绳的约束

<div class="page-grow">
<div class="ask">绳上的拉力，什么时候有、什么时候没有？</div>

<div class="stack" v-click="1">
<div>绳只能拉、不能推，所以绳的拉力 <Latex tex="F_T \ge 0" />。</div>
<div>绳绷紧时，两端沿绳方向的速度相同、绳提供拉力；</div>
<div>若前端的速度小于后端（绳会被"追上"、松弛下去），绳就使不上力：<Latex tex="F_T = 0" />。</div>
</div>

<div class="key" v-click="2">判断绳是否绷紧，就看两端沿绳方向是否需要绳来「拉住」—— 需要就绷紧，不需要就松弛。</div>

<div class="summary-line" v-click="3">弹簧、绳、杆的突变规律不同，正是下一类问题的解题入口。</div>
</div>

---
clicks: 3
---

# 撤去挡板

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><BaffleInclineSvg /></div>
<div class="stack divider-l">
<div class="ask">光滑斜面上放着一个圆球，左侧被竖直挡板挡住。撤去挡板的瞬间，球的加速度多大？</div>
<div v-click="1">撤去前：球静止，合力为零。</div>
<div v-click="2">撤去后：挡板的支持力消失，球沿斜面下滑，合力为 <Latex tex="mg\sin\theta" />。</div>
<div class="key" v-click="3">得 <Latex tex="a = g\sin\theta" />，方向沿斜面向下。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 剪断斜绳

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><SlantRopeCutSvg /></div>
<div class="stack divider-l">
<div class="ask">小球被一根与竖直方向成 <Latex tex="\theta" /> 角的轻绳吊住，左侧还受水平拉力 <Latex tex="F_T" /> 保持静止。剪断这根斜绳的瞬间，球的加速度多大？</div>
<div v-click="1">静止时水平方向平衡：<Latex tex="F_T = mg\tan\theta" />。</div>
<div v-click="2">剪断瞬间绳的拉力消失，只剩重力 <Latex tex="mg" /> 与水平拉力 <Latex tex="F_T" />：<br /><Latex tex="F_{\text{合}} = \sqrt{(mg)^2 + (mg\tan\theta)^2} = \frac{mg}{\cos\theta}" />。</div>
<div class="key" v-click="3">得 <Latex tex="a = \frac{g}{\cos\theta}" />，方向与竖直方向成 <Latex tex="\theta" /> 角斜向右下。</div>
</div>
</div>
</div>

---
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><b>内容</b>——加速度跟作用力成正比、跟质量成反比，方向跟作用力方向相同；式中的 <Latex tex="F" /> 是合力。</div>
<div class="summary-line"><b>单位</b>——国际单位制下规定 <Latex tex="1\ \text{N} = 1\ \text{kg}\cdot\text{m}\cdot\text{s}^{-2}" />，<Latex tex="k = 1" />，定律写成 <Latex tex="F = ma" />。</div>
<div class="summary-line"><b>应用</b>——正交分解，各方向分别列 <Latex tex="F = ma" />；先做受力分析，再求加速度。</div>
<div class="summary-line"><b>瞬时性</b>——力变，加速度立刻变；弹簧不突变，绳、杆、接触面弹力可以突变。</div>
<div class="summary-line"><b>图像</b>——<Latex tex="a\text{-}x" /> 图的面积给出 <Latex tex="\frac{\Delta(v^2)}{2}" />，正负面积相等即速度回到原值。</div>
</div>

<div class="key">无论题目怎么变，落脚点只有一句：先找合力，再由 <Latex tex="F = ma" /> 求加速度。</div>
</div>
