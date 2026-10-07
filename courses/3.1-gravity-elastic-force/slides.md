---
theme: default
title: "重力与弹力"
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

<div class="cover-chapter"><span class="cover-section">§</span> 3.1 · 第三章 相互作用——力</div>

<h1 class="cover-title">重力与弹力</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">力的三要素是什么？</div>

<div class="three-col" v-click="1">
<div class="text-center">
<div class="mini-title" style="justify-content: center">大小</div>
<div class="line">用多少牛顿量度</div>
</div>
<div class="text-center">
<div class="mini-title" style="justify-content: center">方向</div>
<div class="line">沿哪条直线、朝哪一边</div>
</div>
<div class="text-center">
<div class="mini-title" style="justify-content: center">作用点</div>
<div class="line">作用在物体的哪一点</div>
</div>
</div>

<div class="half-grid" v-click="2">
<div class="stack">
<ForceSketchSvg />
<div class="fig-cap">力的示意图：只画作用点与方向</div>
</div>
<div class="stack divider-l">
<ForceDiagramSvg />
<div class="fig-cap">力的图示：先定标度，再按标度画有向线段</div>
</div>
</div>

<div class="key" v-click="3">力既有大小、又有方向——它是一个<b class="text-accent">矢量</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 力的分类

<div class="page-grow">
<div class="ask">物理学中有很多力，这些力可以按照哪些标准分类？</div>

<div class="half-grid" v-click="1">
<div class="stack">
<div class="mini-title">按效果</div>
<div class="line">支持力、拉力、浮力……</div>
<div class="mini-title">按作用范围</div>
<div class="line">内力、外力</div>
</div>
<div class="stack divider-l">
<div class="mini-title">按作用对象</div>
<div class="line">作用力、反作用力</div>
<div class="mini-title">按性质</div>
<div class="line">重力、弹力、摩擦力、电磁力等</div>
</div>
</div>

<div class="key" v-click="2">本章研究最常见的三种力：<b class="text-accent">重力、弹力、摩擦力</b>——它们都能按"性质"归入不同的类别。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 重力

<div class="page-grow">
<div class="ask">空中下落的人、斜面上静止的物块、飞行中的足球——它们受的重力方向都一样吗？</div>

<div v-click="1">
<GravityDirectionSvg />
</div>

<div class="card" v-click="2">
<div class="define-line">由于<b class="text-accent">地球的吸引</b>而使物体受到的力叫作<b>重力</b>：方向<b class="text-accent">竖直向下</b>，施力物体是地球。</div>
</div>

<div v-click="3">
<div class="summary-line"><Latex tex="G = mg" />：<Latex tex="g" /> 是重力加速度，<Latex tex="g" /> 的单位既可以是 <Latex tex="\text{N/kg}" />，也可以是 <Latex tex="\text{m/s}^2" />（<Latex tex="1\ \text{N/kg} = 1\ \text{m/s}^2" />）。</div>
<div class="key">重力的方向始终<b class="text-accent">竖直向下</b>——与物体怎么运动无关。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 重心

<div class="page-grow">
<div class="ask">物体的每一部分都受重力，画受力图时这个力该画在哪一点？</div>

<div class="card" v-click="1">
<div class="define-line">从效果上看，各部分受到的重力可以<b class="text-accent">集中于一点</b>，这一点叫作物体的<b>重心</b>：它就是重力的作用点，有且只有一个。</div>
</div>

<div v-click="2">
<CenterOfGravitySvg />
</div>

<div class="key" v-click="3">质量均匀的物体，重心只跟<b class="text-accent">形状</b>有关（规则形状 → 几何中心）；质量分布不均匀时，还要看<b class="text-accent">质量分布</b>。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 悬挂法确定重心

<div class="page-grow">
<div class="ask">形状不规则的薄板，怎么把它的重心找出来？</div>

<div class="half-grid">
<div v-click="1">
<HangingBoard />
</div>
<div class="stack divider-l">
<div class="summary-line" v-click="2">二力平衡：悬线的拉力与重力等大、反向、共线——重心一定在<b class="text-accent">悬线的延长线</b>上。</div>
<div class="key" v-click="3">换一个孔再挂一次，两条竖直线的交点 <Latex tex="O" /> 就是薄板的重心；把薄板支在指尖上使它平衡，支点也就是重心（支撑法）。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 重心变化的最大幅度

<div class="page-grow">
<div class="ask">正方体在平面内滚动，重心变化的最大幅度是多少？</div>

<div class="half-grid" v-click="1">
<div class="stack">
<CubeFlatCenterSvg />
<div class="summary-line">一面着地：重心最低 <Latex tex="\frac{a}{2}" /></div>
</div>
<div class="stack divider-l">
<CubeVertexCenterSvg />
<div class="summary-line">顶点着地：重心最高 <Latex tex="\frac{\sqrt{3}}{2}a" /></div>
</div>
</div>

<div class="key" v-click="2">重心变化的最大幅度 <Latex tex="\Delta h = \frac{\sqrt{3}}{2}a - \frac{a}{2} = \frac{\sqrt{3}-1}{2}a \approx 0.37a" />。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 椰子里的水

<div class="page-grow">
<div class="ask">椰子里的水不断流走，椰子的重心是降低还是升高？</div>

<div class="half-grid">
<div v-click="1">
<CoconutWater />
</div>
<div class="stack divider-l">
<div class="summary-line" v-click="2">水集中在球的下半部、重心比球壳的球心低：水一开始减少，"配重"变少，重心<b class="text-accent">先降</b>；水快流光时又回到球壳的球心，重心<b class="text-accent">后升</b>。</div>
<div class="key" v-click="3">重心最低时，重心恰好与<b class="text-accent">液面</b>相重合——此时再放掉一点水，重心反而会升高。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">铁链两端固定、自然下垂成悬链线；抓住最低点往下拽，重心会怎么变？</div>

<div class="half-grid">
<div v-click="1">
<ChainPull />
</div>
<div class="stack divider-l">
<div class="summary-line" v-click="2">链长与两个固定点都不变：自然情况下，物体的重心总要去找最低的位置——松垮的链条自然下垂，就是重心最低的样子。</div>
<div class="key" v-click="3">拽的那个点下降了，但两侧弯曲的链条被拉直后<b class="text-accent">往上走</b>了——两侧上升抬升重心的影响更大，所以重心升高。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="summary-line">力是物体对物体的作用，有大小、有方向，是<b class="text-accent">矢量</b>；描述一个力离不开大小、方向、作用点三要素。</div>
<div class="summary-line">重力 <Latex tex="G = mg" />，方向<b class="text-accent">竖直向下</b>，作用点叫重心；重心的位置由形状与质量分布决定，形状不规则、质量分布不均匀的物体可用<b class="text-accent">悬挂法</b>测定。</div>
<div class="summary-line">重心高度会随位形改变：平放时最低、滚动中升高，沿体对角线立起来时最高。</div>
<div class="key">把松垮的铁链拽紧，最低点下降了，重心反而升高——重心的高度要按具体情况分析。</div>
</div>

---
layout: cover
---

<div class="cover-chapter"><span class="cover-section">§</span> 3.1 · 第 2 课时</div>

<h1 class="cover-title">重力与弹力</h1>

<div class="cover-subtitle">
  <span>弹力 · 胡克定律 · 绳、弹簧与轻杆</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSpringSvg />
</div>

---
layout: base-flex
clicks: 2
---

# 形变

<div class="page-grow">
<div class="ask">力作用在物体上，除了改变运动状态，还能产生什么效果？</div>

<div v-click="1">
<DeformationTypesSvg />
</div>

<div class="summary-line" v-click="2">物体在力的作用下，形状或体积会发生改变，这种改变叫作<b class="text-accent">形变</b>——拉伸、压缩、扭转、弯曲都是形变。</div>
</div>

---
layout: base-flex
clicks: 4
---

<div class="page-grow">
<div class="ask ask-lead">撤去作用力后，物体能恢复原状吗？</div>

<h1 class="p13-title" v-click="1">弹性形变与塑性形变</h1>

<div class="p13-defs">
<div class="p13-def" v-click="1"><span class="p13-num">1</span><span>撤去作用力后能<b class="text-accent">完全恢复</b>原状的，叫<b class="text-accent whitespace-nowrap">弹性形变</b>。</span></div>
<div class="p13-def" v-click="1"><span class="p13-num">2</span><span>不能完全恢复的，叫<b class="text-accent-2 whitespace-nowrap">塑性形变</b>。</span></div>
</div>

<div class="summary-line" v-click="2">只恢复了一部分，也属于塑性形变——分界看的是<b class="text-accent">能否完全恢复</b>。</div>

<div class="key key-lead" v-click="3">弹性形变与塑性形变的分界点，叫作<b class="text-accent">弹性限度</b>。</div>

<div class="card" v-click="4">
<div class="mini-title"><mdi-lightbulb-on-outline />刚体</div>
<div class="define-line">不发生任何形变，是一个<b class="text-accent-2">理想化模型</b>。</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 如何验证坚硬物体因弹力产生的微小形变？

<div class="page-grow">
<div class="md-grid">
<div class="md-figure">
<MirrorDeformation />
</div>

<div class="key divider-l" v-click="1"><b class="text-accent">光路放大法</b>：每反射一次光线偏转 <Latex tex="2\theta" />，两次共偏转 <Latex tex="4\theta" />——微小的镜面转角被“偏转角 × 到墙的距离”放大成墙上光点肉眼可见的移动。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 弹力

<div class="page-grow">
<div class="ask">被拉长的弹簧为什么能把小车拉回来？被压弯的跳板为什么能把人弹起？</div>

<div class="summary-line" v-click="1">被拉长的弹簧要恢复原状，对相连的小车产生拉力；被压弯的跳板要恢复原状，对上面的人产生支持力。</div>

<div class="card" v-click="2">
<div class="define-line">发生形变的物体，要恢复原状，对与它接触的物体会产生力的作用，这种力叫作<b>弹力</b>。</div>
</div>

<div class="key" v-click="3">产生弹力的条件：① 两物体<b class="text-accent">直接接触</b>；② 发生<b class="text-accent">弹性形变</b>（彼此挤压或拉伸）。压力、支持力、绳的拉力，本质上都是弹力。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 探究弹簧弹力与形变量的关系

<div class="page-grow">
<div class="ask">把不同质量的钩码挂在弹簧下端，弹力与伸长量是什么关系？</div>

<div v-click="1">
<HookeLawLab />
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 处理数据：算出劲度系数

<div class="page-grow">
<div class="ask">用教材上这组数据，能算出这根弹簧的劲度系数吗？</div>

<div class="half-grid" v-click="1" style="align-items: start">
<div class="stack">
<div class="summary-line">弹簧原长 <Latex tex="l_0 = 6.0\ \text{cm}" />，伸长量 <Latex tex="x = l - l_0" />；<Latex tex="g" /> 取 <Latex tex="10\ \text{N/kg}" />，弹力 <Latex tex="F = mg" />。</div>
<table>
<thead>
<tr><th><Latex tex="m/\text{g}" /></th><th>0</th><th>30</th><th>60</th><th>90</th><th>120</th><th>150</th></tr>
</thead>
<tbody>
<tr><td><Latex tex="F/\text{N}" /></td><td>0</td><td>0.3</td><td>0.6</td><td>0.9</td><td>1.2</td><td>1.5</td></tr>
<tr><td><Latex tex="x/\text{cm}" /></td><td>0</td><td>1.2</td><td>2.3</td><td>3.5</td><td>4.6</td><td>5.8</td></tr>
</tbody>
</table>
</div>
<div class="stack" style="min-width: 0">

```comp CoordAxes
x-range: [0, 6.4]
y-range: [0, 1.7]
x-axis: { quantity: x, unit: cm }
y-axis: { quantity: F, unit: N }
ticks: { x: [2, 4, 6], y: [0.5, 1, 1.5] }
labels:
  - { x: 1.2, y: 0.3, dot: 5, dotColor: var(--c-text) }
  - { x: 2.3, y: 0.6, dot: 5, dotColor: var(--c-text) }
  - { x: 3.5, y: 0.9, dot: 5, dotColor: var(--c-text) }
  - { x: 4.6, y: 1.2, dot: 5, dotColor: var(--c-text) }
  - { x: 5.8, y: 1.5, dot: 6, dotColor: var(--c-danger) }
curves:
  - points: [{ x: 0, y: 0 }, { x: 6.2, y: 1.6 }]
    stroke: var(--c-accent)
    width: 3.4
view: { width: 480, height: 300 }
```

</div>
</div>

<div class="key" v-click="3">直线斜率就是劲度系数：<Latex tex="k = \dfrac{\Delta F}{\Delta x} = \dfrac{1.5\ \text{N}}{0.058\ \text{m}} \approx 26\ \text{N/m}" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 胡克定律

<div class="page-grow">
<div class="ask">同样拉长 <Latex tex="1\ \text{cm}" />，有的弹簧用力小、有的用力大——差在哪里？</div>

<div class="card" v-click="1">
<div class="define-line">在弹性限度内，弹簧发生弹性形变时，弹力 <Latex tex="F" /> 的大小跟弹簧伸长（或缩短）的长度 <Latex tex="x" /> 成正比，即 <Latex tex="F = kx" />——这个规律叫作<b>胡克定律</b>；<Latex tex="k" /> 叫弹簧的<b>劲度系数</b>，单位是 <Latex tex="\text{N/m}" />。</div>
</div>

<div class="key" v-click="2"><Latex tex="k" /> 越大，同样的形变需要越大的力，弹簧就越"硬"；<Latex tex="F = kx" /> 只在<b class="text-accent">弹性限度内</b>成立。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 弹力的方向：垂直于接触面

<div class="page-grow">
<div class="ask">支持力、压力一定沿哪个方向？</div>

<div v-click="1">
<ContactNormalForceSvg />
</div>

<div class="key" v-click="3">找弹力方向两步：先找<b class="text-accent">接触点</b>，再作接触处的<b class="text-accent">公切面</b>——弹力沿公法线方向：点、线压在面上时垂直于面，杆搭在棱上时垂直于杆。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 判断弹力方向

<div class="page-grow">
<div class="half-grid p20-grid" v-click="1">
<div class="stack">
<div class="ask">① 右侧球受到左侧球的弹力，方向向哪？</div>
<SpheresContactSvg :show-forces="$clicks >= 2" />
</div>
<div class="stack">
<div class="ask">② 杆上 A 点和 B 点受到的弹力，方向向哪？</div>
<BowlRodSvg :show-forces="$clicks >= 2" />
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 判断弹力方向

<div class="page-grow">
<div class="ask" v-click="1">③ 左边这块砖受到右边这块砖的弹力，方向向哪？</div>

<div v-click="1">
<BrickContactSvg :show-forces="$clicks >= 2" />
</div>

<div class="key" v-click="2">线与线接触时，法线方向不能由接触形状确定——整个图形左右对称，两砖互相给的弹力只能是<b class="text-accent">水平方向</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 接触了，就一定有弹力吗？

<div class="page-grow">
<div class="ask">下面四种情况，你能判对吗？</div>

<div v-click="1">
<ElasticForceJudge />
</div>

<div class="key" v-click="2">接触只是条件之一：还要发生弹性形变。常用<b class="text-accent">假设法</b>——假设撤去那个接触面，看物体的运动状态会不会改变；不变就说明这里没有弹力。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 理想弹簧与实际弹簧

<div class="page-grow">
<div class="ask">题目里的"弹簧"，和真实的弹簧一样吗？</div>

<div class="card" v-click="1">
<div class="define-line"><b>理想弹簧</b>：自身质量不计（<Latex tex="m = 0" />）、劲度系数 <Latex tex="k" /> 是<b class="text-accent">有限值</b>，而且有<b class="text-accent">弹性限度</b>——伸长量必须保持在限度以内，<Latex tex="F = kx" /> 才成立。</div>
</div>

<div class="summary-line" v-click="2">轻弹簧<b class="text-accent">两端受到的拉力总相等</b>；弹簧既能提供<b class="text-accent">拉力</b>（被拉长时），也能提供<b class="text-accent">压力</b>（被压缩时）。</div>

<div class="key" v-click="3">实际弹簧有质量、也有内摩擦，超过弹性限度就不再服从 <Latex tex="F = kx" />。题目里说的"弹簧"，默认都是理想弹簧。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 弹簧的串并联

<div class="page-grow">
<div class="ask">两根弹簧串起来、并起来，整体相当于一根什么样的弹簧？</div>

<div class="half-grid">
<div class="stack">
<SpringsParallelSvg />
<div class="line" v-click="1"><Latex tex="F = F_1 + F_2" />，<Latex tex="x = x_1 = x_2" /> → <Latex tex="k = k_1 + k_2" />：整体更硬。</div>
</div>
<div class="stack divider-l">
<SpringsSeriesSvg />
<div class="line" v-click="2"><Latex tex="F = F_1 = F_2" />，<Latex tex="x = x_1 + x_2" /> → <Latex tex="\dfrac{1}{k} = \dfrac{1}{k_1} + \dfrac{1}{k_2}" />：整体更软。</div>
</div>
</div>

<div class="key" v-click="3">并联相当于更硬的弹簧（<Latex tex="k" /> 变大），串联相当于更软的弹簧（<Latex tex="k" /> 变小）。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 弹簧的模型

<div class="page-grow">
<div class="ask">下面四种情况里，同一根弹簧的伸长量一样吗？</div>

<div v-click="1">
<SpringModel />
</div>

<div class="line" v-click="2">轻弹簧 <Latex tex="m = 0" />：整根弹簧的拉力处处相等——一端受到的力总等于另一端受到的力。所以只要知道<b class="text-accent">一端</b>的受力，就能用 <Latex tex="F = kx" /> 算伸长量。</div>

<div class="key" v-click="3">四幅图里<b class="text-accent">弹簧左端受到的力都是同一个 <Latex tex="F" /></b>，由 <Latex tex="F = kx" /> 得 <Latex tex="\Delta l_1 = \Delta l_2 = \Delta l_3 = \Delta l_4" />——形变量只由弹力决定，与物体怎么运动、面粗糙与否都无关。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 绳上的弹力：张力

<div class="page-grow">
<div class="ask">绳被拉紧时，它对物体的作用力是什么？</div>

<div v-click="1">
<RopeTensionSvg />
</div>

<div class="summary-line" v-click="2">绳的弹力实质上就是<b class="text-accent">张力</b>，符号 <Latex tex="F_T" />：绳把两端的物体都往<b class="text-accent">中间</b>拉。</div>

<div class="key" v-click="3">绳只能提供<b class="text-accent">拉力</b>，不能提供反向的压力；两端物体一旦靠得比绳长更近，绳就<b class="text-accent">松弛</b>了，张力立刻变成 <Latex tex="0" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 绳上弹力的方向：沿绳

<div class="page-grow">
<div class="ask">绳对物体的拉力，沿什么方向？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<RopeDirectionSvg />
</div>
<div class="key divider-l" v-click="2">绳只能被<b class="text-accent">拉长</b>、不能被压缩，所以它的弹力一定<b class="text-accent">沿着绳</b>，指向绳<b class="text-accent">收缩</b>的方向——也就是把两端物体往中间拉的方向。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 理想绳

<div class="page-grow">
<div class="ask">为什么题目里的绳"拉不断、也压不弯"？</div>

<div class="card" v-click="1">
<div class="define-line"><b>理想绳</b>：质量不计（<Latex tex="m \to 0" />）的"刚体"——<b class="text-accent">完全非弹性、不可伸长</b>，相当于劲度系数 <Latex tex="k \to +\infty" />。</div>
</div>

<div class="key" v-click="2"><Latex tex="m \to 0" />：绳的重力可以忽略；<Latex tex="k \to +\infty" />：不管拉多大力，绳的长度都不变。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 轻绳：一段绳的拉力处处相等

<div class="page-grow">
<div class="ask">同一根轻绳，中间和两端的拉力一样大吗？</div>

<div class="summary-line" v-click="1">题目里的"轻绳"就是<b class="text-accent">质量不计</b>的绳：绳本身没有重力要"承担"，所以<b class="text-accent">同一段绳上拉力处处相等</b>。</div>

<div class="half-grid" v-click="2">
<div class="stack">
<PulleyTensionSvg />
</div>
<div class="stack divider-l">
<div class="line">绳上任意一处两侧的拉力大小都相同，方向都沿绳。</div>
<div class="line">重绳、皮带则不同：它们本身有质量，上端还要"提起"下面的部分，所以上端拉力大、下端拉力小。</div>
</div>
</div>

<div class="key" v-click="3">轻绳的张力处处相等，方向总沿绳、指向绳收缩的方向。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题：粗绳悬挂在天花板上

<div class="page-grow">
<div class="problem">一条<b class="text-accent">质量不可忽略</b>的粗绳悬挂在天花板上，下端自由。绳上各处的拉力一样大吗？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<ThickRopeSvg />
</div>
<div class="stack divider-l">
<div class="line" v-click="2">绳的<b class="text-accent">自由端</b>下面再没有东西可提，<Latex tex="T = 0" />。</div>
<div class="line" v-click="2">绳的<b class="text-accent">上端</b>要把整根绳都提起来，拉力等于绳的重力 <Latex tex="T = G" />。</div>
<div class="line" v-click="3">从自由端往上数 <Latex tex="x" />，这个截面承担的是下面 <Latex tex="\dfrac{x}{L}" /> 的绳重：<Latex tex="T = \dfrac{x}{L}G" />——与 <Latex tex="x" /> 成正比，拉力从下往上<b class="text-accent">均匀增大</b>。</div>
<div class="key" v-click="4">例：<Latex tex="G = 6\ \text{N}" />、<Latex tex="L = 60\ \text{cm}" /> 时，距自由端 <Latex tex="20\ \text{cm}" /> 处 <Latex tex="T = 2\ \text{N}" />、<Latex tex="40\ \text{cm}" /> 处 <Latex tex="T = 4\ \text{N}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：三个小孩拔河

<div class="page-grow">
<div class="problem">甲、乙在左，丙在右，三人拉同一根轻绳，绳保持静止。<Latex tex="F_1" />、<Latex tex="F_2" />、<Latex tex="F_3" /> 之间有什么关系？绳上各处的拉力又是多少？</div>

<div v-click="1">
<TugOfWarSvg :step="$clicks" />
</div>

<div class="stack-dense" v-click="3">
<div class="line">绳的<b class="text-accent">两个自由端</b>没有受力点，拉力是 <Latex tex="0" />；甲、乙之间那一段只被甲从外面拉着，拉力是 <Latex tex="F_1" />。</div>
<div class="line">乙、丙之间那一段要同时拉住甲、乙两个人，拉力是 <Latex tex="F_1 + F_2" />——绳上每经过一个受力点拉力就变一次，"一段绳"指的就是中间没有新的沿绳受力点的那一段。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 轻杆的模型

<div class="page-grow">
<div class="ask">轻杆的弹力，一定沿杆的方向吗？</div>

<div class="line" v-click="1"><b>理想杆</b>和弹簧一样：<b class="text-accent">完全不形变</b>、自身质量不计，既能提供<b class="text-accent">拉力</b>、也能提供<b class="text-accent">压力</b>——但它的弹力方向不一定沿杆。</div>

<div class="half-grid" v-click="2">
<div class="stack">
<TwoForceRodSvg />
</div>
<div class="stack divider-l">
<WallFixedRodSvg />
</div>
</div>

<div class="key" v-click="3">只有两端都是铰链、且只受两端拉压的<b class="text-accent">二力杆</b>才一定沿杆；一端固定的杆，弹力方向可以是任意的。</div>
</div>

<div class="rod-hint" v-click="4">用手握住笔的一端，用另一只手多角度掰笔的另一端——体会"二力杆"。</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="summary-line">弹力是发生形变的物体要恢复原状、对与它接触的物体产生的作用；产生条件是<b class="text-accent">直接接触</b>且发生<b class="text-accent">弹性形变</b>——接触不一定有弹力。</div>
<div class="summary-line">方向垂直于接触处的<b class="text-accent">公切面</b>：绳沿绳、球面沿半径；杆只有两端铰链的<b class="text-accent">二力杆</b>才一定沿杆。</div>
<div class="summary-line">胡克定律：弹性限度内 <Latex tex="F = kx" />，<Latex tex="k" /> 是劲度系数，单位 <Latex tex="\text{N/m}" />。</div>
<div class="key">三个理想模型：弹簧（<Latex tex="k" /> 有限、有弹性限度，两端受到的拉力相等）；绳（弹力是张力，<b class="text-accent">同一段绳</b>上处处相等，只能拉不能压）；杆（拉力和压力都能提供，方向不一定沿杆）。并联的弹簧变硬、串联的弹簧变软。</div>
</div>
