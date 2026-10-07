---
theme: default
title: "共点力的平衡"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: cover
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
---

<div class="cover-chapter"><span class="cover-section">§</span> 3.5 · 第三章 相互作用——力</div>

<h1 class="cover-title">共点力的平衡</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">两幅图中木棒都处于平衡，三个力的作用线有什么不同？</div>

<div class="half-grid">
<div class="stack">
<div class="fe-fig" style="max-width: 13rem; margin: 0 auto">
<RodObliqueForcesSvg />
</div>
<div class="fe-cap">甲</div>
</div>
<div class="stack divider-l">
<div class="fe-fig" style="max-width: 13rem; margin: 0 auto">
<RodParallelForcesSvg />
</div>
<div class="fe-cap">乙</div>
</div>
</div>

<div class="key" v-click="2">甲：三个力的作用线交于一点 <Latex tex="O" /> —— 共点力；乙：三个力互相平行、作用线不相交 —— 非共点力，但同样能平衡。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="card">
几个力都作用在物体的同一点，或者它们的作用线相交于一点，这几个力叫作<b class="text-accent" style="white-space: nowrap">共点力</b>。
</div>

<div class="half-grid">
<div style="max-width: 13rem">
<ConcurrentForcesSvg />
</div>
<div class="stack divider-l">
<div>共点力的特点在<b class="text-accent">作用线</b>：延长各力，看是否交于一点。</div>
<div v-click="1">合力为零不保证物体不转动 —— 它可能同时在匀速转动（如飞轮）。</div>
</div>
</div>

<div class="key" v-click="2">物体受三个力平衡时，三个力不一定是共点力。三个互相平行的力也可以使物体平衡。</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask">物体受三个力平衡，其中 <Latex tex="F_1" />、<Latex tex="F_2" /> 的作用线交于 <Latex tex="O" /> 点 —— 第三个力的作用线在哪里？</div>

<div class="half-grid" v-click="1">
<div class="fe-fig" style="max-width: 14rem">
<ThreeForceConcurrencySvg />
</div>
<div class="stack divider-l">
<div>反设：<Latex tex="F_3" /> 的作用线不过 <Latex tex="O" /> 点。</div>
<div><Latex tex="F_1" />、<Latex tex="F_2" /> 的作用线过 <Latex tex="O" />，力臂为零，不会使物体绕 <Latex tex="O" /> 转动。</div>
<div><Latex tex="F_3" /> 对 <Latex tex="O" /> 有力臂 <Latex tex="l" />：力与力臂的乘积不为零 —— 物体会绕 <Latex tex="O" /> 转起来，与物体平衡矛盾。</div>
</div>
</div>

<div class="key" v-click="1">所以 <Latex tex="F_3" /> 的作用线必过 <Latex tex="O" />：三个力的作用线交于一点 —— 这就是三力汇交原理。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">什么样的物体，可以说它"处于平衡状态"？</div>

<div class="fe-quad" v-click="1">
<div class="fe-quad-item">
<div class="text-center">桌上的书</div>
<div class="fe-cap">保持静止</div>
</div>
<div class="fe-quad-item">
<div class="text-center">屋顶的灯</div>
<div class="fe-cap">保持静止</div>
</div>
<div class="fe-quad-item">
<div class="text-center">传送带上匀速运送的物体</div>
<div class="fe-cap">匀速直线运动</div>
</div>
<div class="fe-quad-item">
<div class="text-center">沿直线公路匀速前进的汽车</div>
<div class="fe-cap">匀速直线运动</div>
</div>
</div>

<div class="key" v-click="2">物体保持<b class="text-accent">静止</b>或<b class="text-accent">匀速直线运动</b>状态，就说它处于平衡状态 —— 速度矢量不变。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">受共点力作用的物体，在什么条件下才能保持平衡？</div>

<div class="half-grid">
<div class="stack">
<div v-click="1">二力平衡：两个力大小相等、方向相反、作用在同一条直线上 —— 合力为 <Latex tex="0" />。</div>
<div v-click="2">多个共点力：逐步合成，最终等效为两个力；这两个力的合力为 <Latex tex="0" />，就意味着<b class="text-accent">所有力的合力为 <Latex tex="0" /></b>。</div>
</div>
<div class="fe-fig" style="max-width: 16rem" v-click="2">
<ClosedForceTriangleSvg />
</div>
</div>

<div class="key" v-click="3">共点力平衡的条件：<Latex tex="\sum \vec{F} = \boldsymbol{0}" /> —— 几个力首尾相接恰好闭合。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">合力为零，把它分解到两个互相垂直的方向上，会得到什么？</div>

<div class="half-grid">
<div class="stack">
<div v-click="1">沿两个互相垂直的方向建立直角坐标系，把不在轴上的力都分解到两个轴上。</div>
<div v-click="2">合力为零 ⇒ 每个方向上的分力之和也分别为零：<Latex tex="\begin{cases} F_x = 0 \\ F_y = 0 \end{cases}" /></div>
</div>
<div class="fe-fig" v-click="1">
<OrthoDecompose :angle="53" tex="F" />
</div>
</div>

<div class="key" v-click="3">正交分解把"矢量平衡"变成了两组<b class="text-accent">代数方程</b>。</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="fe-steps">
<div class="fe-step"><span class="fe-step-no">1</span><div>选择研究对象：<b>整体法</b>（把几个物体看作一个整体）或<b>隔离法</b>（只取其中一个物体）。</div></div>
<div class="fe-step" v-click="1"><span class="fe-step-no">2</span><div>分析受力：重力 → 弹力 → 摩擦力 → 其他力。</div></div>
<div class="fe-step" v-click="2"><span class="fe-step-no">3</span><div>处理力：通常 3 个力用<b>合成（或分解）法</b>；4 个及以上用<b>正交分解</b>。</div></div>
<div class="fe-step" v-click="3"><span class="fe-step-no">4</span><div>列方程、求解。</div></div>
</div>

<div class="key" v-click="4">正交分解的原则：① 少分力；② 避免分解未知力。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="half-grid" style="align-items: start">
<div class="stack">
<div class="mini-title">几何法</div>
<div v-click="1">三个力<b class="text-accent">首尾相接</b>，恰好围成一个闭合的矢量三角形 —— 由三角形的边、角关系直接求出未知力。</div>
<div class="fe-fig" style="max-width: 13rem" v-click="1">
<ComposeForceTriangleSvg />
</div>
</div>
<div class="stack divider-l">
<div class="mini-title">正交分解法</div>
<div v-click="2">把不在轴上的力分解到两个轴上，分别列出 <Latex tex="F_x = 0" />、<Latex tex="F_y = 0" />。</div>
<div class="fe-step-note" v-click="2">4 个及以上通常正交分解。</div>
</div>
</div>

<div class="key" v-click="3">怎么选？回到原则：<b class="text-accent">少分力、避免分解未知力</b>。</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="problem">悬吊重物的细绳，其 <Latex tex="O" /> 点被一水平绳 <Latex tex="BO" /> 牵引，使悬绳 <Latex tex="AO" /> 段与竖直方向成 <Latex tex="\theta" /> 角。若悬吊物所受的重力为 <Latex tex="G" />，悬绳 <Latex tex="AO" /> 和水平绳 <Latex tex="BO" /> 所受的拉力各等于多少？</div>

<div class="half-grid">
<div class="fe-fig" style="max-width: 15rem" v-click="1">
<HangingRopeSvg />
</div>
<div class="fe-fig" style="max-width: 10.5rem" v-click="3">
<ForceTriangleSvg />
</div>
</div>

<div class="key" v-click="4">由直角三角形：<Latex tex="F_1 = G/\cos\theta" />，<Latex tex="F_2 = G\tan\theta" />。</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="ask">同一个平衡问题，换成正交分解，怎么做？</div>

<div class="half-grid">
<div class="fe-fig">
<OrthoDecompose
  :angle="120"
  tex="F_1"
  :extras="[
    { angle: 0, tex: 'F_2', len: 2, color: 'var(--c-accent)' },
    { angle: -90, tex: 'F_3', len: 3.46, color: 'var(--c-danger)' },
  ]"
/>
</div>
<div class="stack">
<div v-click="1">以 <Latex tex="O" /> 为原点，<Latex tex="F_2" /> 的方向为 <Latex tex="x" /> 轴、向上为 <Latex tex="y" /> 轴，把 <Latex tex="F_1" /> 正交分解。</div>
<div v-click="2"><Latex tex="x" /> 方向：<Latex tex="F_2 - F_1\sin\theta = 0" /></div>
<div v-click="3"><Latex tex="y" /> 方向：<Latex tex="F_1\cos\theta - G = 0" /></div>
</div>
</div>

<div class="key" v-click="4">解得 <Latex tex="F_1 = G/\cos\theta" />、<Latex tex="F_2 = G\tan\theta" /> —— 与几何法结果一致。</div>
</div>

---
layout: base-flex
clicks: 5
---

<div class="page-grow">
<div class="problem">滑梯的水平跨度确定为 <Latex tex="b = 6\ \text{m}" />，滑板和儿童裤料之间的动摩擦因数取 <Latex tex="\mu = 0.4" />。为使儿童能在滑板上滑下，滑梯至少要多高？</div>

<div class="half-grid">
<div class="fe-fig" style="max-width: 17rem" v-click="1">
<SlideSlopeSvg />
</div>
<div class="stack">
<div v-click="2">研究对象：正在匀速滑下的小孩，受重力 <Latex tex="G" />、支持力 <Latex tex="F_{\text{N}}" />、摩擦力 <Latex tex="F_f" /> 三个力。</div>
<div v-click="3">沿平行、垂直于斜面建立坐标系，把 <Latex tex="G" /> 正交分解：<Latex tex="G_x = G\sin\theta" />、<Latex tex="G_y = G\cos\theta" />。</div>
<div v-click="4">列方程：<Latex tex="G\sin\theta = F_f" />、<Latex tex="G\cos\theta = F_{\text{N}}" />，又有 <Latex tex="F_f = \mu F_{\text{N}}" />。</div>
</div>
</div>

<div class="key" v-click="5">所以 <Latex tex="\tan\theta = \mu" />，即 <Latex tex="h = \mu b = 0.4 \times 6\ \text{m} = 2.4\ \text{m}" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">前面处理的力，方向都是不变的。如果某个力的方向在缓慢变化，平衡条件还成立吗？</div>

<div v-click="1">成立 —— 缓慢移动的每一时刻都是平衡态，<Latex tex="\sum \vec{F} = 0" /> 每一步都成立。</div>

<div class="key key-lead" v-click="2">于是每一时刻的三个力都能首尾相接成闭合三角形 —— 动态平衡要看的，就是这个三角形<b class="text-accent">怎么变</b>。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="fe-steps">
<div class="fe-step"><span class="fe-step-no">1</span><div><b>动态矢量三角形</b>：一个力大小方向不变、一个力方向不变，第三个力方向变化 —— 画出闭合三角形，看边长随方向怎么变。<span class="fe-step-note">两个力的夹角不变时，第三个顶点始终落在同一段圆弧上（辅助圆）。</span></div></div>
<div class="fe-step" v-click="1"><span class="fe-step-no">2</span><div><b>正弦定理（函数法）</b>：边长不好直接看时，把力写成角度的函数：<Latex tex="\dfrac{F_1}{\sin A} = \dfrac{F_2}{\sin B} = \dfrac{F_3}{\sin C}" />。</div></div>
<div class="fe-step" v-click="2"><span class="fe-step-no">3</span><div><b>相似三角形</b>：力的三角形与几何三角形相似，对应边成比例：<Latex tex="\dfrac{F_1}{L_1} = \dfrac{F_2}{L_2} = \dfrac{F_3}{L_3}" /> —— 纯几何，最简。</div></div>
</div>

<div class="key" v-click="3">先判断"哪个力不变、哪个力方向不变"，再选方法 —— 选错方法会算得很苦。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">光滑球夹在竖直墙与斜劈之间。把斜劈逐渐放平（<Latex tex="\theta" /> 减小），墙和斜面对球的两个弹力怎么变？</div>

<WedgeBallTriangle />

<div class="key" v-click="3">三力作用线都过球心 ⇒ 直角三角形：<Latex tex="F_{N1} = G\tan\theta" />、<Latex tex="F_{N2} = G/\cos\theta" />。<Latex tex="\theta" /> 减小，两个弹力都减小（<Latex tex="\theta \to 0" /> 时 <Latex tex="F_{N1} \to 0" />、<Latex tex="F_{N2} \to G" />）。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">小球位置保持不动（悬线与竖直方向成 <Latex tex="\theta" /> 角），外力 <Latex tex="F" /> 的方向可以随意改变。<Latex tex="F" /> 最小是多少？朝哪个方向？</div>

<MinForceSwing />

<div class="key" v-click="2">几何法：<Latex tex="G" /> 和拉力 <Latex tex="F_T" /> 的方向都确定，力的三角形第三个顶点只能沿一条定直线移动，而 <Latex tex="F" /> 就是这个定点到该直线的连线 —— <b>垂线段最短</b>，所以 <Latex tex="F" /> 垂直于悬线时最小：<Latex tex="F_{\min} = G\sin\theta" />。</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<MinForceDecompose />

<div class="key" v-click="1">绳的拉力大小不定、又不需要求它 ⇒ 沿<b>垂直于悬线</b>的方向分解：这个方向上拉力没有分量，于是 <Latex tex="F\sin\varphi = G\sin\theta" />，即 <Latex tex="F = G\sin\theta/\sin\varphi" />；要让 <Latex tex="F" /> 最小，就要让 <Latex tex="\sin\varphi" /> 最大 ⇒ <Latex tex="\varphi = 90^\circ" />，此时 <Latex tex="F" /> 垂直于悬线、<Latex tex="F_{\min} = G\sin\theta" />。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">两只手各拉一根绳提着水桶，两绳的夹角保持不变。把两只手一起移动（这一对绳整体转动），两根绳的拉力怎么变？</div>

<div class="ac-18">
<AuxiliaryCircle />

<div class="key" v-click="2">转动这一对绳：两绳拉力<b>一个增大、另一个减小</b>（不会先增后减）；夹角大于 <Latex tex="90^\circ" /> 时，某根绳转到水平（在三角形里成为<b class="text-accent">直径</b>）那一刻它最大。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">如果三个力的方向都在变，画不出一个确定的三角形，怎么办？</div>

<div class="half-grid">
<div style="max-width: 18rem">
<SimilarTrianglesSvg />
</div>
<div class="stack">
<div v-click="1">如果力的三角形与某个<b>几何三角形</b>的三边分别平行（对应边方向相同），这两个三角形就相似。</div>
<div v-click="2">相似 ⇒ 对应边成比例：<Latex tex="\dfrac{F_1}{L_1} = \dfrac{F_2}{L_2} = \dfrac{F_3}{L_3}" />。</div>
</div>
</div>

<div class="key" v-click="3">几何三角形的三条边都是<b class="text-accent">已知的几何量</b>，比值一确定，力的变化趋势就出来了。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">光滑半球顶点正上方固定一个小定滑轮，细绳一端系住球面上的小球、跨过滑轮后水平拉出。把小球慢慢拉高，绳的拉力和球面的支持力怎么变？</div>

<HemisphereBallSvg />

<div class="key hb-key" v-click="2">
<div><Latex tex="\triangle_{\text{力}} \sim \triangle_{OPQ}" />：<Latex tex="\dfrac{F_N}{G} = \dfrac{OP}{OQ}" />、<Latex tex="\dfrac{F_T}{G} = \dfrac{PQ}{OQ}" /></div>
<div><Latex tex="OP" />、<Latex tex="OQ" /> 不变 ⇒ <Latex tex="F_N" /> 不变；球升高时 <Latex tex="PQ" /> 变小 ⇒ <Latex tex="F_T" /> 变小</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">悬崖顶端有定滑轮，崖壁下方用铰链固定一根轻杆。人在崖顶收绳把杆缓缓拉起，杆对杆顶的作用力和绳的拉力怎么变？</div>

<HingedRodSvg />

<div class="key hr-key" v-click="2">
<div><Latex tex="\triangle_{\text{力}} \sim \triangle_{AOB}" />：<Latex tex="\dfrac{F_N}{G} = \dfrac{AB}{AO}" />、<Latex tex="\dfrac{F_T}{G} = \dfrac{BO}{AO}" /></div>
<div><Latex tex="AB" />、<Latex tex="AO" /> 不变 ⇒ <Latex tex="F_N" /> 不变；杆被拉起时 <Latex tex="BO" /> 变短 ⇒ <Latex tex="F_T" /> 减小</div>
</div>
</div>
---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="ask">天花板垂下两段长为 <Latex tex="l" /> 的轻绳，下端分别挂物块 <Latex tex="A" />、<Latex tex="B" />。<Latex tex="A" /> 受水平向左的力 <Latex tex="2F" />、<Latex tex="B" /> 受水平向右的力 <Latex tex="F" />。平衡后 <Latex tex="B" /> 在悬挂点的哪一侧？</div>

<div class="half-grid">
<div style="max-width: 15.5rem">
<TwoRopesDeflectionSvg :step="$clicks" />
</div>
<div class="stack">
<div v-click="1">整体法（<Latex tex="A" />、<Latex tex="B" /> 总重 <Latex tex="2mg" />）：<Latex tex="T_1\sin\alpha = 2F - F = F" />、<Latex tex="T_1\cos\alpha = 2mg" /> ⇒ <Latex tex="\tan\alpha = \dfrac{F}{2mg}" />。</div>
<div v-click="2">隔离 <Latex tex="B" />：<Latex tex="\tan\beta = \dfrac{F}{mg}" />。</div>
<div v-click="3"><Latex tex="\tan\alpha < \tan\beta" /> ⇒ <Latex tex="\alpha < \beta" />。</div>
</div>
</div>

<div class="key" v-click="4">取悬挂点为原点：<Latex tex="x_B = l\sin\beta - l\sin\alpha > 0" /> —— <Latex tex="B" /> 在悬挂点的<b class="text-accent">右侧</b>。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">轻绳两端固定在两个高处支点上，中间挂一个轻质动滑轮，下面吊着重物。① 两侧绳与竖直方向的夹角有什么关系？② 把右侧悬挂点从 <Latex tex="A" /> 沿竖直墙移到 <Latex tex="B" />、再沿水平墙移到 <Latex tex="C" />，绳上拉力怎么变？</div>

<div class="half-grid">
<div style="max-width: 15rem">
<MovablePulleySvg />
</div>
<div class="stack fe-dense">
<div v-click="1">同一根绳跨过光滑轻质滑轮 ⇒ 两侧张力相等 <Latex tex="T_1 = T_2 = T" />；水平方向 <Latex tex="T\sin\alpha = T\sin\beta" /> ⇒ <b><Latex tex="\alpha = \beta" /></b>。</div>
<div v-click="2">竖直方向 <Latex tex="2T\cos\alpha = Mg" /> ⇒ <Latex tex="T = Mg/(2\cos\alpha)" />，且 <Latex tex="\sin\alpha = (x_B - x_A)/L" />（绳长 <Latex tex="L" /> 不变）。</div>
<div v-click="3"><Latex tex="A \to B" />（沿竖直墙上下移）：水平跨距不变 ⇒ <Latex tex="\alpha" /> 不变 ⇒ <b>拉力不变</b>；<Latex tex="B \to C" />（沿水平墙外移）：跨距变大 ⇒ <Latex tex="\alpha" /> 变大 ⇒ <b>拉力变大</b>。</div>
</div>
</div>

<div class="key" v-click="3">拉力只由水平跨距和绳长决定：<Latex tex="T = \dfrac{Mg}{2\cos\alpha}" />，<Latex tex="\sin\alpha = \dfrac{x_B - x_A}{L}" />。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">粗糙竖直墙面上贴着质量 <Latex tex="m" /> 的滑块，在右下角施加指向左上方的推力 <Latex tex="F" />（与竖直方向成 <Latex tex="\theta" />）。<Latex tex="F" /> 多大才能让它保持平衡？</div>

<WallPushRange />

<div class="key" v-click="2">平衡条件 <Latex tex="|G - F\cos\theta| \le \mu F\sin\theta" /> ⇒ <Latex tex="G/(\cos\theta + \mu\sin\theta) \le F \le G/(\cos\theta - \mu\sin\theta)" />。</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="ask">直梯斜靠在光滑墙上、下端放在粗糙地面上。梯子缓慢下滑时，墙的支持力和地面摩擦力怎么变？</div>

<div class="half-grid">
<div style="max-width: 15rem">
<LadderOnWallSvg />
</div>
<div class="stack">
<div v-click="1">梯子受三个力：重力 <Latex tex="G" />（过中点）、墙的弹力 <Latex tex="F_{\text{N}}" />（水平）、地面反力 <Latex tex="R" />。</div>
<div v-click="2">三力平衡 ⇒ 作用线必交于一点：<Latex tex="G" /> 与 <Latex tex="F_{\text{N}}" /> 的线交于 <Latex tex="P" /> ⇒ 地面反力必过 <Latex tex="P" />。</div>
<div v-click="3">竖直方向 <Latex tex="N = G" />；由几何得 <Latex tex="F_{\text{N}} = F_f = G/(2\tan\theta)" />。</div>
</div>
</div>

<div class="key" v-click="4"><Latex tex="\theta" /> 减小（梯子下滑）⇒ <Latex tex="\tan\theta" /> 减小 ⇒ 墙的支持力与地面摩擦力<b class="text-accent">都变大</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">换成墙面粗糙、地面光滑：梯子还能平衡吗？</div>

<div class="half-grid">
<div style="max-width: 15rem">
<LadderRoughWallSvg />
</div>
<div class="stack">
<div v-click="1">受力：重力 <Latex tex="G" />（过中点）、墙的弹力 <Latex tex="F_{\text{N}}" />（水平、指向远离墙面）、墙的摩擦力 <Latex tex="f" />（竖直向上）、地面支持力 <Latex tex="N" />（竖直向上）—— 地面光滑 ⇒ 没有摩擦力。</div>
<div v-click="2">水平方向只有 <Latex tex="F_{\text{N}}" /> 一个力，没有任何力与它平衡 ⇒ <b>不能平衡</b>，下端一定向右滑开。</div>
</div>
</div>

<div class="key" v-click="2">所以梯脚必须放在粗糙地面上；地面越光滑越容易打滑。</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="ask">一个人从穹顶底部慢慢爬到顶部。这个过程中穹顶对他的支持力和摩擦力怎么变？</div>

<DomeClimbSvg />

<div class="dc-notes">
<div class="key key-ok" v-click="4"><mdi-check-circle-outline class="ico-ok" />支持力与摩擦力本来就垂直 ⇒ 只能正交分解：<Latex tex="G_2 = G\cos\theta" /> 垂直穹顶、<Latex tex="G_1 = G\sin\theta" /> 沿穹顶向下（<Latex tex="\theta" /> 是半径与竖直方向的夹角）⇒ <Latex tex="F_N = G\cos\theta" />、<Latex tex="F_f = G\sin\theta" />。往上爬 <Latex tex="\theta" /> 变小 ⇒ <b><Latex tex="F_N" /> 变大、<Latex tex="F_f" /> 变小</b>。</div>
<div class="key key-danger" v-click="4"><mdi-close-circle-outline class="ico-bad" />套"相似三角形" ⇒ <Latex tex="F_N" /> 不变、<Latex tex="F_f" /> 减小。这里没有定弦定角，三角形形状一直在变，不能用相似。</div>
</div>
</div>

---

<div class="page-grow">
<div class="problem">重力 <Latex tex="G = 40\ \text{N}" /> 的物体用细绳 <Latex tex="OC" /> 悬于 <Latex tex="O" /> 点，<Latex tex="OC" /> 能承受的最大拉力为 <Latex tex="50\ \text{N}" />。用细绳 <Latex tex="AB" /> 绑住 <Latex tex="OC" /> 上的 <Latex tex="A" /> 点，用缓慢增大的水平力牵引 <Latex tex="A" /> 点。当 <Latex tex="OA" /> 段刚被拉断时，<Latex tex="AB" /> 的拉力为多少？</div>

<div class="half-grid">
<div style="max-width: 13rem">
<RopeBreakingSvg />
</div>
<div class="stack fe-dense">
<div v-click="1">研究对象：<Latex tex="A" /> 点，受三个力 —— <Latex tex="OA" /> 段拉力 <Latex tex="T" />、水平拉力 <Latex tex="F" />、<Latex tex="AC" /> 段拉力（大小等于 <Latex tex="G" />，竖直向下）。</div>
<div v-click="2"><Latex tex="T\cos\theta = G" /> ⇒ <Latex tex="T = G/\cos\theta" />；<Latex tex="F = T\sin\theta = G\tan\theta" />。</div>
<div v-click="3"><Latex tex="F" /> 增大 ⇒ <Latex tex="\theta" /> 增大 ⇒ <Latex tex="T" /> 增大，直到 <Latex tex="T = 50\ \text{N}" /> 时被拉断，此时 <Latex tex="\cos\theta = 40/50 = 0.8" />。</div>
</div>
</div>

<div class="key" v-click="3"><Latex tex="F = G\tan\theta = 40 \times 0.75 = 30\ \text{N}" />。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="problem">用轻质细绳把重力 <Latex tex="10\ \text{N}" /> 的画框对称悬挂在墙上，两挂钉相距 <Latex tex="0.5\ \text{m}" />。绳能承受的最大拉力为 <Latex tex="10\ \text{N}" />，绳最短要多长？</div>

<div class="half-grid">
<div class="fe-fig" style="max-width: 16rem">
<PictureFrameRopeSvg />
</div>
<div class="stack">
<div v-click="1">绳对称，两段张力相等：<Latex tex="2T\cos\theta = G" /> ⇒ <Latex tex="T = G/(2\cos\theta)" /> —— 绳越短，<Latex tex="\theta" /> 越大、<Latex tex="T" /> 越大。</div>
<div v-click="2">不断裂要求 <Latex tex="T \le 10\ \text{N}" /> ⇒ <Latex tex="\cos\theta \ge 10/(2 \times 10) = 0.5" /> ⇒ <Latex tex="\theta \le 60^\circ" />。</div>
<div v-click="3">由几何 <Latex tex="(L/2)\sin\theta = d/2" /> ⇒ <Latex tex="L = d/\sin\theta \ge 0.5\ \text{m}/\sin 60^\circ \approx 0.58\ \text{m}" />。</div>
</div>
</div>

<div class="key" v-click="3">绳最短约 <Latex tex="0.58\ \text{m}" />（此时绳与竖直方向的夹角恰为 <Latex tex="60^\circ" />，拉力刚好达到 <Latex tex="10\ \text{N}" />）。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 课堂小结

<div class="page-grow">
<table class="fe-method">
<tbody>
<tr><th>方法</th><th>什么时候用</th><th>关键式子</th></tr>
<tr><td>几何法（力的三角形）</td><td>3 个力</td><td>三个力首尾相接成闭合三角形，用边、角关系求力</td></tr>
<tr><td>正交分解</td><td>4 个及以上</td><td><Latex tex="F_x = 0" />、<Latex tex="F_y = 0" />（少分力、避免分未知力）</td></tr>
<tr v-click="1"><td>动态矢量三角形</td><td>一力恒定、一力方向不变、第三个力方向变</td><td>看边长随方向的变化</td></tr>
<tr v-click="1"><td>辅助圆</td><td>两个力的夹角不变</td><td>圆周角不变，弦长 ≤ 直径 <Latex tex="2R = \dfrac{G}{\sin\theta}" /></td></tr>
<tr v-click="1"><td>相似三角形</td><td>力的三角形与几何三角形相似</td><td><Latex tex="\dfrac{F_1}{L_1} = \dfrac{F_2}{L_2} = \dfrac{F_3}{L_3}" /></td></tr>
<tr v-click="1"><td>临界与极值</td><td>出现"最大 / 最小 / 刚好"</td><td>找临界条件（如 <Latex tex="F_f = \mu F_{\text{N}}" />）列不等式</td></tr>
</tbody>
</table>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">想一想：物体在五个共点力作用下保持平衡。如果撤去力 <Latex tex="F_1" />，而保持其余四个力不变，这四个力的合力是多大？方向如何？</div>

<div class="key" v-click="1">与 <Latex tex="F_1" /> <b class="text-accent">等大反向</b> —— 原来五个力的合力为零，撤去 <Latex tex="F_1" /> 后，其余四个力必须补上 <Latex tex="F_1" /> 才能继续平衡。</div>

<div class="ask" v-click="2">两人用同样大小的力共提一桶水，手臂间的夹角大些省力，还是小些省力？</div>

<div class="key key-blue" v-click="2"><Latex tex="2T\cos\dfrac{\theta}{2} = G" /> ⇒ <Latex tex="T = \dfrac{G}{2\cos(\theta/2)}" />：夹角越小越省力。</div>
</div>

