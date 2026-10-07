---
theme: default
title: "曲线运动"
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

<div class="cover-chapter"><span class="cover-section">§</span> 5.1 · 第五章 抛体运动</div>

<h1 class="cover-title">曲线运动</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
clicks: 1
---

# 曲线运动的定义

<div class="page-grow">
<div class="hero-tag"><mdi-book-open-page-variant-outline /> 定义</div>
<div class="card card-hero">轨迹是<b>曲线</b>的运动，叫作<b>曲线运动</b>。</div>
<div class="stack" v-click="1">
<div>直线运动（匀速、匀变速）的轨迹是直线。</div>
<div>抛出去的篮球、绕太阳公转的地球，轨迹都是曲线。</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask ask-hero">都是抛出去的物体、都只受重力 —— 往哪个方向抛，轨迹才会是曲线？</div>
<ThrowDirectionSvg />
</div>

---
layout: base-flex
clicks: 1
---

# 抛出去之后，轨迹是什么形状

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">轨迹是直线</div>
<div>自由落体（<Latex tex="v_0 = 0" />）</div>
<div>竖直下抛</div>
<div>竖直上抛</div>
</div>
<div class="stack divider-l">
<div class="mini-title">轨迹是曲线</div>
<div>平抛</div>
<div>斜上抛</div>
<div>斜下抛</div>
</div>
</div>
<div class="ask" v-click="1">两组都只受重力 —— 为什么轨迹一个直、一个弯？</div>
</div>

---
layout: base-flex
clicks: 3
---

# 区别在哪儿

<div class="page-grow">
<div class="ask">同样只受重力，为什么轨迹不同？</div>
<div v-click="1">看<b>初速度的方向</b>与<b>重力方向</b>是否在同一条直线上。</div>
<div class="stack">
<div v-click="2">在同一直线上（自由落体、竖直下抛、竖直上抛）→ 速度方向不变，轨迹是<b>直线</b></div>
<div v-click="3">不在同一直线上（平抛、斜上抛、斜下抛）→ 速度方向不断改变，轨迹是<b>曲线</b></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 力改变运动状态，有两种情形

<div class="page-grow">
<div>牛顿第一定律：力是<b>改变</b>物体运动状态的原因。速度是矢量，改变它有两种方式。</div>
<div class="stack">
<div v-click="1">加速度与速度<b>共线</b> → 只改变速度的<b>大小</b>，轨迹是直线</div>
<div v-click="2">加速度与速度<b>不共线</b> → 速度的<b>方向</b>改变，轨迹是曲线</div>
</div>
<div class="key" v-click="3">于是可以推测：做曲线运动的条件，与<b>合力方向跟速度方向的关系</b>有关。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 观察钢球的运动轨迹

<div class="page-grow">
<div class="ask">物体在什么条件下做曲线运动？</div>
<div class="demo-wrap"><SteelBallMagnetDemo /></div>
<div class="key" v-click="1">磁铁在正前方：力与速度共线，轨迹仍是直线；在侧旁或斜后方：力与速度不共线，轨迹变弯。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 物体做曲线运动的条件

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="key">当物体所受<b>合力的方向</b>与它的<b>速度方向</b>不在同一条直线上时，物体做曲线运动。</div>
<div v-click="1">做曲线运动的物体，轨迹总是向<b>合力所指的一侧</b>弯曲 —— 轨迹夹在速度方向与合力方向之间。</div>
</div>
<div><PathBendSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 为什么一定是这样

<div class="page-grow">
<div>牛顿第二定律：<b>加速度的方向总与合力的方向相同</b>。</div>
<div class="stack">
<div v-click="1">合力与速度不共线 → 加速度与速度也不共线 → 速度的方向一定改变 → 物体做曲线运动。</div>
<div v-click="2">反过来：曲线运动中速度方向时刻在改变，所以加速度一定不为 0，物体所受的合力也一定不为 0。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 把加速度沿速度方向、垂直速度方向分解

<div class="page-grow">
<div>牛顿第二定律 <Latex tex="a = \dfrac{F}{m}" />：<b>加速度与合力同向</b> —— 分解 <Latex tex="F" /> 就是分解 <Latex tex="a" />。</div>
<div class="demo-wrap-md"><ForceAngleDemo /></div>
<div v-click="1">垂直速度方向的分量 → 只改变速度的<b>方向</b>，不改变速率。</div>
<div v-click="2">沿速度方向的分量 → 与速度同向则<b>加速</b>，与速度反向则<b>减速</b>。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 合力与速度的夹角

<div class="page-grow">
<div class="stack">
<div v-click="1"><Latex tex="0^\circ < \alpha < 90^\circ" />：<Latex tex="a" /> 沿速度方向的分量与 <Latex tex="v" /> 同向 → 速率变大</div>
<div v-click="2"><Latex tex="\alpha = 90^\circ" />：<Latex tex="a" /> 沿速度方向的分量为零 → 速率不变，但方向时刻改变</div>
<div v-click="3"><Latex tex="90^\circ < \alpha < 180^\circ" />：<Latex tex="a" /> 沿速度方向的分量与 <Latex tex="v" /> 反向 → 速率变小</div>
</div>
<div class="mini-note" v-click="3">三种情形下垂直速度方向的分量都在，所以轨迹都是曲线；<Latex tex="\alpha" /> 是合力方向与速度方向之间的夹角。</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask ask-hero">做曲线运动的物体，某一时刻的速度方向朝哪？</div>
<div v-click="1">直线运动中，速度方向与轨迹一致；曲线运动中，速度方向与轨迹并不重合 —— 它到底沿哪个方向？</div>
</div>

---
layout: base-flex
clicks: 2
---

# 从割线到切线

<div class="page-grow">
<div class="demo-wrap"><SecantToTangentDemo /></div>
<div v-click="1">物体从 B 运动到 A，平均速度的方向由 B 指向 A —— 也就是割线的方向。</div>
<div v-click="2">B 越靠近 A，平均速度的方向就越接近曲线在 A 点的切线方向。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 曲线运动的速度方向

<div class="page-grow">
<div class="hero-tag"><mdi-lightbulb-on-outline /> 结论</div>
<div class="key key-hero">质点在某一点的速度方向，沿曲线在这一点的<b>切线方向</b>。</div>
<div v-click="1">所以做曲线运动的物体，速度方向<b>时刻在改变</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 砂轮打磨时，火星沿什么方向飞出

<div class="page-grow">
<div class="half-grid">
<div><GrindingWheelSvg /></div>
<div class="stack divider-l">
<div class="ask" v-click="1">火星不是沿着砂轮边缘绕出去，而是沿切线直着飞出去 —— 为什么？</div>
<div class="key" v-click="2">火星离开砂轮的那一刻，沿离开点的切线方向做直线运动。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 白纸上的印迹记录了速度方向

<div class="page-grow">
<CurvedTrackExitSvg />
<div v-click="1">印迹的方向，就是曲线在出口处的切线方向。</div>
<div class="key" v-click="2">出口位置不同，钢球飞出的方向就不同 —— 曲线运动的速度方向确实时刻在改变。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 曲线运动是变速运动

<div class="page-grow">
<div class="half-grid">
<div><VelocityChangeCompare /></div>
<div class="stack divider-l">
<div v-click="1">速度是矢量：方向变了，速度就变了。</div>
<div v-click="2">所以曲线运动一定是<b>变速运动</b> —— 即使速率始终不变。</div>
<div v-click="3">速度变了，就一定有加速度；做曲线运动的物体，受到的合力一定不为 0。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 匀变速的含义

<div class="page-grow">
<div><Latex tex="a = \dfrac{\Delta v}{\Delta t}" /> 为定值 —— 这样的运动叫匀变速运动。</div>
<div class="ask" v-click="1">曲线运动也可以是匀变速运动吗？</div>
</div>

---
layout: base-flex
clicks: 3
---

# 匀变速直线运动与匀变速曲线运动

<div class="page-grow">
<div class="stack">
<div v-click="1">加速度与速度<b>共线</b> → 匀变速<b>直线</b>运动：自由落体、竖直下抛、竖直上抛</div>
<div v-click="2">加速度与速度<b>不共线</b> → 匀变速<b>曲线</b>运动：平抛、斜抛</div>
</div>
<div class="mini-note" v-click="3">平抛、斜抛都只受重力，合力恒定 —— 加速度的大小和方向都不变，所以它们是匀变速曲线运动。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：画出物体由 A 到 D 的轨迹

<div class="page-grow">
<div>光滑水平面上，物体在 A 点以速度 <Latex tex="v" /> 沿图中方向运动。从 A 点开始，它受到<b>向前但偏右</b>的合力；到达 B 点时，合力的方向突然变得与前进方向相同；到达 C 点时，合力的方向又突然改为<b>向前但偏左</b>。画出物体由 A 至 D 的大致轨迹。</div>
<div class="half-grid">
<div><CurvedPathForceSvg :step="$clicks" /></div>
<div class="stack divider-l">
<div v-click="1">A→B：合力指向轨迹<b>凹的一侧</b>，轨迹向右弯，且夹在速度方向与合力方向之间。</div>
<div v-click="2">B 点附近：合力与前进方向相同，这一小段沿直线运动。</div>
<div v-click="3">B→D：合力改为偏左，轨迹向左弯，最后到达 D 点。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 例题：跳水运动员头部轨迹上的速度方向

<div class="page-grow">
<div>虚线是跳水运动员头部在空中的运动轨迹，最后运动员沿竖直方向以速度 <Latex tex="v" /> 入水。整个过程中，哪些位置头部的速度方向与入水时的 <Latex tex="v" /> 相同？哪些位置相反？</div>
<div class="half-grid">
<div><DiveTrajectorySvg :step="$clicks" /></div>
<div class="stack divider-l">
<div v-click="1">与入水时速度方向相同：轨迹上<b>向下运动、切线竖直向下</b>的位置。</div>
<div v-click="2">与入水时速度方向相反：轨迹上<b>向上运动、切线竖直向上</b>的位置。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div>定义：轨迹是曲线的运动，叫作曲线运动</div>
<div>速度方向：沿轨迹上该点的<b>切线方向</b> → 速度方向时刻改变 → 曲线运动是<b>变速运动</b></div>
<div>条件：合力方向与速度方向<b>不在同一直线上</b></div>
<div>轨迹：向合力所指的一侧弯曲</div>
<div>匀变速：<Latex tex="a" /> 与 <Latex tex="v" /> 共线 → 匀变速直线运动；不共线 → 匀变速曲线运动（平抛、斜抛）</div>
</div>
</div>
