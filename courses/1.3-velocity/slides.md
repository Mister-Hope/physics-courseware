---
theme: default
title: "位置变化快慢的描述——速度"
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
chapter-no: "1.3"
chapter: 第一章 运动的描述
---

<CoverDecorationSvg />

---
layout: base-flex
---

# 放学后去电影院：导航给了两条路线

<div class="page-grow">

<div class="half-grid">

<div class="route-panel">
<div class="route-head"><mdi-navigation-variant /> 导航 · 前往电影院</div>
<NavRouteMapSvg />
<div class="route-row route-row-red"><span class="route-dot"></span><span class="route-mode">骑行</span><span class="route-metric">3 km · 15 min</span></div>
<div class="route-row route-row-blue"><span class="route-dot"></span><span class="route-mode">网约车</span><span class="tag text-accent">推荐</span><span class="route-metric">4 km · 15 min</span></div>
</div>

<div class="stack">
<div class="ask">同学们很熟悉这种界面。用初中学过的速度概念看：哪条路线更快？</div>
<div class="mini-note">两条路线：距离、时间都写在卡片上。</div>
</div>

</div>

</div>

---
layout: base-flex
---

# 两条路线的速度（初中算法）

<div class="page-grow">

<div class="stack">
<div class="route-row route-row-red text-lg"><span class="route-bar"></span><span>路线 1（骑行）</span><span class="route-result"><Latex tex="\frac{3\ \text{km}}{15\ \text{min}} = 12\ \text{km/h}" /></span></div>
<div class="route-row route-row-blue text-lg"><span class="route-bar"></span><span>路线 2（网约车）</span><span class="route-result"><Latex tex="\frac{4\ \text{km}}{15\ \text{min}} = 16\ \text{km/h}" /></span></div>
</div>

<div class="tip-hint" style="--hint-pad-y:.9rem">按路程 ÷ 时间来比，<span class="text-accent">路线 2 更快</span>——它走的路程更长。我们比的其实是<span class="text-accent">过程</span>的结果。</div>

<div class="mini-note">初中的速度就是路程与时间之比：只看比值大小，不管走的是哪条路。</div>

</div>

---
layout: base-flex
title: 换一个角度：从结果（位移）看
---

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div>两次导航的<span class="text-accent">出发点</span>和<span class="text-accent">终点</span>完全相同。</div>
<div>所以：两次的<span class="text-accent-2">位移相同</span>，<span class="text-accent-2">用时也相同</span>。</div>
</div>

<div class="stack divider-l">
<div class="ask">那么，位置变化的快慢，两次相同吗？</div>
<v-click>
<div class="tip-hint" style="--hint-pad-y:1rem">相同。描述位置变化的是<span class="text-accent-2">位移</span>——既然位移和用时都一样，位置变化的快慢自然一样。</div>
</v-click>
</div>

</div>

</div>

---
layout: base-flex
title: 再看一个例子：方向不能丢
---

<div class="page-grow">

<TwoDirectionsSvg />

<div class="stack">
<div class="ask">路程一样、时间一样，初中算出的速度完全一样——他们的运动相同吗？</div>
<v-click>
<div class="tip-hint" style="--hint-pad-y:1rem">不相同：到达的位置不同，<span class="text-accent">运动的方向不同</span>。</div>
</v-click>
</div>

</div>

---
layout: base-flex
---

# 初中速度的局限

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div class="mini-title"><mdi-map-marker-path /> 初中：速度 = 路程 ÷ 时间</div>
<div class="mini-note">只能比较运动的<span class="text-accent">快慢</span>，<span class="text-accent">不能体现方向</span>。</div>
</div>

<div class="stack divider-l">
<div class="mini-title"><mdi-vector-line /> 高中：我们要的速度</div>
<div class="mini-note">既要反映位置变化的<span class="text-accent-2">快慢</span>，又要体现<span class="text-accent-2">方向</span>。</div>
</div>

</div>

<div class="tip-hint" style="--hint-pad-y:.9rem">和位移一样，我们需要给速度一个<span class="text-accent-2">更严格的定义</span>。</div>

<div class="mini-note">同样 15 min、同样 3 km：向东去电影院、向南去体育馆，是两种不同的运动。</div>

</div>

---
layout: base-flex
---

# 速度

<div class="page-grow">

<DefinitionBox term="速度" tone="gold">

<div class="text-lg leading-relaxed"><span class="def-term">速度</span> = <span class="text-accent">位移</span>与发生这段位移所用<span class="text-accent">时间</span>之比</div>

<div class="mt-2"><Latex tex="v = \frac{\Delta x}{\Delta t}" display /></div>

</DefinitionBox>

<div class="half-grid">

<div class="stack">
<div class="mini-title"><mdi-ruler /> 单位</div>
<div class="mini-note">国际单位制：米每秒（<Latex tex="\text{m/s}" />）；常用还有 <Latex tex="\text{km/h}" />、<Latex tex="\text{cm/s}" />。</div>
</div>

<div class="stack divider-l">
<div class="mini-title"><mdi-vector-line /> 矢量</div>
<div class="mini-note">既有大小又有方向：<span class="text-accent">速度的方向与 Δx 的方向相同</span>。</div>
</div>

</div>

</div>

---
layout: base-flex
---

# 平均速度：这段时间里的平均快慢

<div class="page-grow">

<div class="ask">12 km/h 和 16 km/h，能体现这 15 min 内物体是怎样运动的吗？能反映前后半段各自的快慢吗？</div>

<v-click>
<div class="tip-hint" style="--hint-pad-y:1rem">不能。用<span class="text-accent">总位移 ÷ 总用时</span>得到的只是整段时间内的<span class="text-accent">平均快慢</span>——这就是<span class="text-accent">平均速度</span>。</div>
</v-click>

<v-click>
<div class="ask">那想知道前半程、后半程各自的速度呢？</div>
</v-click>

<v-click>
<div>把运动<span class="text-accent-2">分段</span>：需要<span class="text-accent-2">中间的位置和时间</span>，再各算一次。</div>
</v-click>

</div>

---
layout: base-flex
---

# 瞬时速度：某一时刻的速度

<div class="page-grow">

<div class="ask">塔台要掌握飞机的状态：实时位置、飞行方向、实时快慢——只有平均速度够吗？</div>

<div class="three-col" v-click="1">
<div class="stack stack-tight"><div class="mini-title"><Latex tex="\Delta t = 1\ \text{s}" /></div><div>先取 1 s 求平均</div></div>
<div class="stack stack-tight"><div class="mini-title"><Latex tex="\Delta t = 0.1\ \text{s}" /></div><div>间隔越小，差异越小</div></div>
<div class="stack stack-tight"><div class="mini-title"><Latex tex="\Delta t \to 0" /></div><div>越来越贴近这一时刻</div></div>
</div>

<div class="tip-hint" style="--hint-pad-y:.6rem" v-click="2">当 <Latex tex="\Delta t" /> 非常非常小时，<Latex tex="\frac{\Delta x}{\Delta t}" /> 就可以代表物体在<span class="text-accent">某一时刻（或某一位置）</span>的速度——这就是<span class="text-accent">瞬时速度</span>。</div>

<div v-click="3">这就是<span class="text-accent-2">极限思想</span>：数学和物理中都非常重要。</div>

</div>

---
layout: base-flex
clicks: 2
---

# 四个概念：平均速度、瞬时速度、速率、平均速率

<div class="page-grow">

<div class="ask">它们的算法和物理意义一样吗？</div>

<div class="tbl-concepts data-table" v-click="1">
<div class="tbl-concepts-head"></div>
<div class="tbl-concepts-head">平均速度</div>
<div class="tbl-concepts-head">瞬时速度</div>
<div class="tbl-concepts-head">速率</div>
<div class="tbl-concepts-head">平均速率</div>
<div class="tbl-concepts-row">计算</div>
<div class="tbl-concepts-cell">位移 ÷ 时间<br /><Latex tex="\bar v = \frac{\Delta x}{\Delta t}" /></div>
<div class="tbl-concepts-cell">位移 ÷ 时间，取 <Latex tex="\Delta t \to 0" /><br /><Latex tex="v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t}" /></div>
<div class="tbl-concepts-cell">瞬时速度的大小<br /><Latex tex="|v|" /></div>
<div class="tbl-concepts-cell">路程 ÷ 时间<br /><Latex tex="\frac{s}{t}" /></div>
<div class="tbl-concepts-row">意义</div>
<div class="tbl-concepts-cell">一段时间内位置变化的平均快慢<span class="text-accent">与方向</span>（矢量）</div>
<div class="tbl-concepts-cell">某一时刻运动的快慢<span class="text-accent">与方向</span>（矢量）</div>
<div class="tbl-concepts-cell">某一时刻运动的快慢（标量，无方向）</div>
<div class="tbl-concepts-cell">一段时间内运动的平均快慢（标量，无方向）</div>
</div>

<div class="important-hint" style="--hint-pad-y:.6rem" v-click="2">初中所说的速度是<span class="text-accent">路程 ÷ 时间</span>——它其实是<span class="text-accent">平均速率</span>：只回答平均快慢，不回答方向。赛车计时、导航的预计时速、跑步配速至今都在用它。</div>

</div>

---
layout: base-flex
clicks: 2
title: 例题：匀速圆周运动
---

<div class="page-grow">

<div class="text-base"><b class="ex-no">例题一</b>　质点做匀速圆周运动，从 <Latex tex="A" /> 点沿顺时针方向出发，圆的半径为 <Latex tex="R" />，运动周期为 <Latex tex="4\ \text{s}" />。求：<br />① <Latex tex="4\ \text{s}" /> 内质点的平均速度大小和平均速率；<br />② 第 2 个 <Latex tex="2\ \text{s}" /> 内（即 <Latex tex="t = 2\ \text{s}" /> 至 <Latex tex="t = 4\ \text{s}" />）的平均速度大小和平均速率。</div>

<div style="display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 2rem; align-items: center;">

<div class="stack">

<div v-click="1">① <Latex tex="4\ \text{s}" /> 正好运动一周、回到 <Latex tex="A" />：位移 <Latex tex="\Delta x = 0" /> → 平均速度 <Latex tex="0" />；路程 <Latex tex="2\pi R" /> → 平均速率 <Latex tex="\frac{2\pi R}{4\ \text{s}} = \frac{\pi R}{2}" />。</div>

<div v-click="2">② 第 2 个 <Latex tex="2\ \text{s}" /> 内：<Latex tex="t = 2\ \text{s}" /> 时质点在 <Latex tex="C" /> 点（<Latex tex="A" /> 的对径点），末位置仍是 <Latex tex="A" />。位移 <Latex tex="2R" /> → 平均速度 <Latex tex="\frac{2R}{2\ \text{s}} = R" />；路程是半个圆周 <Latex tex="\pi R" /> → 平均速率 <Latex tex="\frac{\pi R}{2}" />。</div>

</div>

<CircleMotionSvg :step="$clicks" />

</div>

</div>

---
layout: base-flex
clicks: 3
---

# 位移—时间图像：割线 → 切线

<div class="page-grow">

<!-- 图 397px + 结论气泡 105px 合计比 .page-grow（447px）高 72px：气泡横跨整页时首行顶到标题、末行超出画布 14.7px。
     图不能再缩（读数两列 chip 的 nowrap 文字把图栏宽度锁在 ≥387px ⇒ 图高 ≥397px），所以把结论气泡放进右栏、
     并删掉与上一行重复的从句「割线斜率仍算平均速度」（该行第 2 次点击已给出）。 -->
<div class="half-grid">

<div class="fig-host" v-click="1">
<XTSlope />
</div>

<div class="stack">
<div class="ask">过 A、B 两点的这条直线（割线），它的斜率代表什么？</div>
<div v-click="2">割线斜率 <Latex tex="= \frac{\Delta x}{\Delta t} =" /> <span class="text-accent">平均速度</span>。</div>
<div class="tip-hint" style="--hint-pad-y:.5rem" v-click="3">把 B 点拖向 A 点：割线斜率越来越接近 A 点的<span class="text-accent-2">瞬时速度</span>；无限靠近时割线成为<span class="text-accent-2">切线</span>——<span class="text-accent-2">切线斜率 = 该点的瞬时速度</span>。</div>
</div>

</div>

</div>

---
layout: base-flex
clicks: 1
---

# 辨析：400 m 跑道上的 55 秒

<div class="page-grow">

<div class="half-grid">

<TrackRun />

<div class="stack">
<div class="ask">运动员在标准 400 m 跑道上跑了 55 s，回到出发点。他的平均速度是多少？</div>
<div class="tip-hint" style="--hint-pad-y:1rem" v-click="1">先想清楚：<span class="text-accent">位移</span>是多少？（提示：起点与终点是同一个位置）</div>
</div>

</div>

</div>

---
layout: base-flex
---

# 辨析：400 m 跑道上的 55 秒

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div class="tip-hint" style="--hint-pad-y:.65rem">回到出发点 → 位移 <Latex tex="\Delta x = 0" />，所以<span class="text-accent">平均速度 <Latex tex="v = 0" /></span>。</div>
<div>而 <Latex tex="\frac{400\ \text{m}}{55\ \text{s}} \approx 7.3\ \text{m/s}" /> 是<span class="text-accent-2">平均速率</span>（路程 ÷ 时间），不是速度。</div>
</div>

<div class="stack divider-l">
<div class="fun-note mini-note">题目可没说跑了几圈。要是他真跑了两圈：<Latex tex="800\ \text{m} \div 55\ \text{s} \approx 14.5\ \text{m/s}" />，比博尔特百米（约 10.4 m/s）还快——所以他必然只跑了一圈。</div>
<div class="ask">位移为 0，能认为他完全没有运动吗？</div>
<v-click>
<div>不能：位移为零 ≠ 没有运动。</div>
</v-click>
<v-click>
<div>奔跑中他的瞬时速度怎么变？<span class="text-accent-2">方向</span>不断变化（在弯道上）；<span class="text-accent-2">大小</span>直道快、弯道慢。</div>
</v-click>
</div>

</div>

</div>

---
layout: base-flex
---

# 辨析：小球的平均速度

<div class="page-grow">

<div class="half-grid">

<BallDisplacementSvg />

<div class="stack">
<div class="ask">小球从 1 m 高处升到 3 m 高处，用时 2 s。它的平均速度是多少？</div>
<v-click>
<div class="tip-hint" style="--hint-pad-y:.9rem"><Latex tex="\Delta x = 3\ \text{m} - 1\ \text{m} = 2\ \text{m}" />，<Latex tex="v = \frac{\Delta x}{\Delta t} = \frac{2\ \text{m}}{2\ \text{s}} = 1\ \text{m/s}" />。</div>
</v-click>
<v-click>
<div>我们没有规定正方向 → 写成 <Latex tex="+1\ \text{m/s}" /> 或 <Latex tex="-1\ \text{m/s}" /> 都可以。<span class="text-accent-2">速度的方向由我们规定的正方向决定</span>。</div>
</v-click>
</div>

</div>

</div>

---
layout: base-flex
---

# 关键换算：1 m/s = 3.6 km/h

<div class="page-grow page-around">

<div>把 <Latex tex="1\ \text{m/s}" /> 化成 km/h：</div>

$$1\ \text{m/s} = \frac{1\ \text{m}}{1\ \text{s}} = \frac{0.001\ \text{km}}{\frac{1}{3600}\ \text{h}} = 3.6\ \text{km/h}$$

<div class="stack">
<div class="info-hint" style="--hint-pad-y:1rem">对照刚才的导航：12 km/h <Latex tex="\approx 3.3\ \text{m/s}" />，16 km/h <Latex tex="\approx 4.4\ \text{m/s}" />。</div>
<div class="mini-note">记法：把 km/h 除以 3.6 得 m/s；把 m/s 乘以 3.6 得 km/h。</div>
</div>

</div>

---
layout: exercise-split
title: 例题：前半程 v₁、后半程 v₂
---

<template v-slot:stem>

<div><b class="ex-no">例题一</b>　物体从 A 到 B 做单向直线运动，前半程的速度是 <Latex tex="v_1" />，后半程的速度是 <Latex tex="v_2" />。求全程的平均速度。</div>

<div class="ask">先想一想：平均速度能用 <Latex tex="\frac{v_1 + v_2}{2}" /> 算吗？</div>

</template>

<div v-click="1">设全程为 <Latex tex="2s" />：前半程用时 <Latex tex="t_1 = \frac{s}{v_1}" />，后半程用时 <Latex tex="t_2 = \frac{s}{v_2}" />。</div>

<div v-click="2"><Latex tex="\bar{v} = \frac{2s}{t_1 + t_2} = \frac{2s}{\frac{s}{v_1} + \frac{s}{v_2}} = \frac{2v_1v_2}{v_1 + v_2}" display /></div>

<div v-click="3">注意：平均速度<span class="text-accent">不是</span>速度的平均值，不能写成 <Latex tex="\frac{v_1 + v_2}{2}" />。</div>

---
layout: exercise-split
clicks: 4
title: 例题：货船与游船
---

<template v-slot:stem>

<div><b class="ex-no">例题二</b>　货船在静水中的速度是水速的 7 倍；上游、下游按相同时间间隔 <Latex tex="T" /> 各发出一批货船。游船顺流而下时，每 40 min 被一艘同向货船超过，每 20 min 迎面遇到一艘。求 <Latex tex="T" />。</div>

</template>

<div class="half-grid">

<div class="stack">
<div v-click="1">基本关系：<Latex tex="x = vt" />（位移 = 速度 × 时间）</div>
<div v-click="2">设水速 <Latex tex="u" />：货船静水速 <Latex tex="7u" /> → 顺流 <Latex tex="8u" />、逆流 <Latex tex="6u" />；游船顺流 <Latex tex="w+u" />。</div>
<div v-click="3">用 <Latex tex="x = vt" /> 写相邻两船的间距：顺流 <Latex tex="x_1 = 8uT" />，逆流 <Latex tex="x_2 = 6uT" />。</div>
</div>

<div class="stack divider-l">
<div v-click="3">被超过（相对速度 <Latex tex="7u-w" />）：<br /><Latex tex="x_1 = (7u-w)\cdot 40\ \text{min}" /></div>
<div v-click="4">迎面（相对速度 <Latex tex="7u+w" />）：<br /><Latex tex="x_2 = (7u+w)\cdot 20\ \text{min}" /></div>
<div v-click="4">两式相除得 <Latex tex="\frac{w}{u} = \frac{7}{5}" />，代回得 <Latex tex="T = 28\ \text{min}" />。</div>
</div>

</div>

---
layout: base-flex
title: 课堂小结（第一课时）
---

# 课堂小结

<div class="page-grow">

<div><mdi-numeric-1-circle class="icon-md inline-block align-middle mr-1 text-accent" />位置的变化用<span class="text-accent-2">位移</span>描述；位置变化的快慢用<span class="text-accent">速度</span>描述：<Latex tex="v = \frac{\Delta x}{\Delta t}" />，方向与 <Latex tex="\Delta x" /> 相同（矢量）。</div>

<div><mdi-numeric-2-circle class="icon-md inline-block align-middle mr-1 text-accent" />一段时间的平均快慢是<span class="text-accent">平均速度</span>；某一时刻（某一位置）的是<span class="text-accent">瞬时速度</span>——它是 <Latex tex="\Delta t \to 0" /> 时平均速度的极限。</div>

<div><mdi-numeric-3-circle class="icon-md inline-block align-middle mr-1 text-accent" />x-t 图像：<span class="text-accent">割线斜率 = 平均速度</span>，<span class="text-accent-2">切线斜率 = 瞬时速度</span>。</div>

<div><mdi-numeric-4-circle class="icon-md inline-block align-middle mr-1 text-accent" />瞬时速度的大小叫<span class="text-accent-2">速率</span>；路程 ÷ 时间叫<span class="text-accent-2">平均速率</span>（初中所说的速度就是它）；<Latex tex="1\ \text{m/s} = 3.6\ \text{km/h}" />。</div>

</div>

---
layout: course-cover
chapter-no: "1.3"
chapter: 第一章 运动的描述
lesson: 第二课时
title: 位置变化快慢的描述——速度
---

<CoverDecorationCurveSvg />

---
layout: base-flex
clicks: 3
---

# 打点计时器打出的纸带

<div class="page-grow">

<PaperTapeDotsSvg />

<div class="ask">小车做什么运动？</div>

<div class="tip-hint" style="--hint-pad-y:.6rem" v-click="1">点迹越来越疏 → 相同时间内位移越来越大 → 小车在<span class="text-accent">加速</span>。</div>

<div class="ask" v-click="2">这个加速是<span class="text-accent">均匀</span>的吗？光看点迹的疏密，能回答吗？</div>

<div v-click="3">不能。得把每个时刻的<span class="text-accent-2">速度算出来</span>，看它随时间怎样变化——所以要用这条纸带<span class="text-accent-2">把速度算出来</span>。</div>

</div>

---
layout: base-flex
clicks: 2
---

# 从纸带到 v-t 图像

<div class="page-grow">

<div>类比 <Latex tex="x\text{-}t" /> 图像（位置随时间的变化），我们也可以画<span class="text-accent">速度—时间图像（v-t 图像）</span>，研究速度随时间怎样变化。</div>

<div class="ask">纸带上只有位移和时间，速度从哪里来？</div>

<div v-click="1">速度是<span class="text-accent">比值定义</span>出来的：<Latex tex="v = \frac{\Delta x}{\Delta t}" />（位移 ÷ 时间）。</div>

<div class="tip-hint" v-click="2">可我们要的是<span class="text-accent">某一点（某一时刻）</span>的速度——它没法直接测出来，只能用<span class="text-accent-2">包含这一点的一小段时间的平均速度</span>去代替它。</div>

</div>

---
layout: base-flex
clicks: 3
---

# 求某一点的速度：三种方案

<div class="page-grow">

<ThreeSchemesSvg />

<div class="ask">要算 N 点的速度，这一小段时间可以怎么取？哪种取法更好？</div>

<div class="three-col">
<div class="stack stack-tight" v-click="1"><div class="mini-title">方案 ①</div><div><Latex tex="v_N \approx \frac{x_{N+1}-x_N}{\Delta t}" display /></div></div>
<div class="stack stack-tight" v-click="2"><div class="mini-title">方案 ②</div><div><Latex tex="v_N \approx \frac{x_N-x_{N-1}}{\Delta t}" display /></div></div>
<div class="stack stack-tight" v-click="3"><div class="mini-title">方案 ③</div><div><Latex tex="v_N \approx \frac{x_{N+1}-x_{N-1}}{2\Delta t}" display /></div></div>
</div>

</div>

---
layout: base-flex
clicks: 2
class: title-ask
---

# 哪个方案更好？

<div class="page-grow">

<SymmetricIntervalSvg />

<div class="tip-hint" v-click="1">方案 ③：用 <Latex tex="N-1" /> 到 <Latex tex="N+1" /> 的总位移除以 <Latex tex="2\Delta t" />：<Latex tex="v_N \approx \frac{x_{N+1}-x_{N-1}}{2\Delta t}" display /></div>

<div v-click="2">因为它以 <Latex tex="N" /> 点为中心<span class="text-accent-2">对称</span>地取时间间隔——更能反映 <Latex tex="N" /> 点<span class="text-accent-2">附近</span>的快慢变化。方案 ①② 只朝一边取，结果会偏向相邻的那一段。</div>

</div>

---
layout: base-flex
clicks: 3
title: 辨析：$\Delta t$ 越小越好吗？
---

<div class="page-grow">

<div class="ask">既然 <Latex tex="\Delta t" />  越小越接近瞬时速度，那把它取得越小越好？</div>

<div v-click="1">不是。两个绕不开的误差来源：<br />① <span class="text-accent">刻度尺的精度有限</span>——量出的位移本身就有读数误差；<br />② <span class="text-accent">打出的点迹本身有大小</span>——它不是一个数学意义上的点，位移两端各带半个点的宽度。</div>

<div v-click="2"><Latex tex="\Delta t" /> 太小 → 位移太小 → <span class="text-accent-2">误差在结果里占比过高</span>，算出的速度反而更不准。</div>

<div class="tip-hint" style="--hint-pad-y:.6rem" v-click="3">所以 <Latex tex="\Delta t" />  要<span class="text-accent">选得合理</span>：既尽量贴近该点的瞬时速度，又不让误差占比过高。</div>

</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">

<div class="half-grid">

<PhotogateSvg />

<div class="stack stack-tight">

<div class="ask">光电门凭什么能直接测出「瞬时」速度？</div>

<div v-click="1">小车上的<span class="text-accent">遮光板很窄</span>，通过光电门时挡光时间 <Latex tex="\Delta t" /> 只有 <Latex tex="0.01\ \text{s}" /> 量级——这段时间里小车的速度几乎不变。</div>

<div v-click="2">所以 <Latex tex="v = \frac{\Delta x}{\Delta t}" /> 就是小车经过光电门这一瞬间的<span class="text-accent">瞬时速度</span>（<Latex tex="\Delta x" /> 为遮光板宽度）。</div>

<div class="info-hint" style="--hint-pad-y:.6rem" v-click="3">与打点计时器不同：<Latex tex="\Delta x" /> 是遮光板<span class="text-accent-2">已知的宽度</span>、<Latex tex="\Delta t" /> 由电子计时器直接读出，都很准——<Latex tex="\Delta t" /> 取小反而更贴近瞬时速度。</div>

</div>

</div>

</div>

---
layout: base-flex
title: 假设这有一条纸带，你怎么画出它的 v-t 图像？
---

<div class="page-grow">

<div class="mini-note">每 5 个点取一个计数点（相邻计数点之间 <Latex tex="\Delta t = 0.1\ \text{s}" />），量出每个计数点到起点 0 的距离：</div>

<table class="tbl-tape">
<tbody>
<tr><th>计数点</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
<tr><th>位置 <Latex tex="x/\text{m}" /></th><td>0</td><td>0.05</td><td>0.12</td><td>0.25</td><td>0.46</td><td>0.79</td><td>1.26</td></tr>
</tbody>
</table>

<div class="ask">请你先算出各点的速度，再在坐标纸上画出这条纸带的 v-t 图像。</div>

</div>

---
layout: base-flex
---

# 两位同学的画法

<div class="page-grow">

<div class="mini-note" style="text-align: center">同样这 5 个速度数据（速度增加得越来越快），两位同学画出了两种 v-t 图像：</div>

<div class="half-grid">

<div class="stack">
<div style="width: 100%; max-width: 400px; margin: 0 auto">

```comp CoordAxes
x-range: [0, 6.3]
y-range: [0, 4.4]
x-axis: { quantity: t }
y-axis: { quantity: v }
ticks:
  x: [1, 2, 3, 4, 5]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 300, height: 195 }
curves:
  - points: [{ x: 1, y: 0.6 }, { x: 2, y: 1 }, { x: 3, y: 1.7 }, { x: 4, y: 2.7 }, { x: 5, y: 4 }]
    color: var(--c-physics)
    width: 3
labels:
  - x: 1
    y: 0.6
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 2
    y: 1
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 3
    y: 1.7
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 4
    y: 2.7
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 5
    y: 4
    dot: 5
    dotColor: var(--c-accent-2)
```
</div>
<div class="mini-note" style="text-align: center">甲：把点依次用线段连起来（<span class="text-accent-2">折线</span>）</div>
</div>

<div class="stack">
<div style="width: 100%; max-width: 400px; margin: 0 auto">

```comp CoordAxes
x-range: [0, 6.3]
y-range: [0, 4.4]
x-axis: { quantity: t }
y-axis: { quantity: v }
ticks:
  x: [1, 2, 3, 4, 5]
  y: [1, 2, 3, 4]
  labels: false
view: { width: 300, height: 195 }
curves:
  - points: [{ x: 0, y: 0.5 }, { x: 0.5, y: 0.51 }, { x: 1, y: 0.6 }, { x: 1.5, y: 0.76 }, { x: 2, y: 1 }, { x: 2.5, y: 1.31 }, { x: 3, y: 1.7 }, { x: 3.5, y: 2.16 }, { x: 4, y: 2.7 }, { x: 4.5, y: 3.31 }, { x: 5, y: 4 }]
    color: var(--c-accent)
    width: 3
labels:
  - x: 1
    y: 0.6
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 2
    y: 1
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 3
    y: 1.7
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 4
    y: 2.7
    dot: 5
    dotColor: var(--c-accent-2)
  - x: 5
    y: 4
    dot: 5
    dotColor: var(--c-accent-2)
```
</div>
<div class="mini-note" style="text-align: center">乙：画一条<span class="text-accent">平滑的曲线</span>（不追求穿过每个点）</div>
</div>

</div>

<div class="ask">两种画法的差别在哪？哪一种更能真实反映小车的运动？</div>

</div>

---
layout: base-flex
clicks: 2
title: 应该怎样连线？
---

<div class="page-grow">

<div class="ask">折线连法和平滑直线连法，哪一种更能真实反映小车的运动？</div>

<div v-click="1">两条理由：<br />① 物理学家告诉我们，物体的速度通常<span class="text-accent">连续变化，不会突变</span>；<br />② 我们的测量一定<span class="text-accent">带着误差</span>，点不会正好落在真实图线上。</div>

<div class="tip-hint" style="--hint-pad-y:1rem" v-click="2">所以不要让图线穿过每一个点，而应该画一条<span class="text-accent-2">平滑的直线或曲线</span>，让各点尽可能分布在它<span class="text-accent-2">两侧</span>——这在数学上叫<span class="text-accent-2">拟合</span>。这样得到的 v-t 图像才更接近小车真实的运动。</div>

</div>

---
layout: base-flex
clicks: 2
title: v-t 图像还能读出什么？
---

<div class="page-grow">

<div class="ask">v-t 图像除了反映速度随时间怎样变化，还能告诉我们什么？</div>

<div class="half-grid">

<div class="stack">
<div style="width: 100%; max-width: 396px; margin: 0 auto">

```comp CoordAxes
x-range: [0, 6.3]
y-range: [0, 4.1]
x-axis: { quantity: t, side: above }
y-axis: { quantity: v }
ticks:
  x: []
  y: []
view: { width: 300, height: 164 }
curves:
  - points: [{ x: 0.44, y: 0.33 }, { x: 5.72, y: 3.67 }]
    color: var(--c-accent-2)
    width: 3
  - points: [{ x: 0.44, y: 3.2 }, { x: 5.72, y: 0.33 }]
    color: var(--c-physics)
    width: 3
  - points: [{ x: 2.94, y: 1.93 }, { x: 4.5, y: 1.93 }]
    color: var(--c-accent)
    width: 1.4
    dashed: true
labels:
  - x: 2.94
    y: 1.93
    dot: 5
    dotColor: var(--c-accent)
  - x: 4.6
    y: 1.93
    parts:
      - text: 此刻速度相同
    anchor: right
    color: var(--c-accent)
    halo: true
```
</div>
<div v-click="1"><span class="text-accent">图线的交点</span>：两个物体在这时刻<span class="text-accent">速度相同</span>（共速）——注意共速 ≠ 相遇。</div>
</div>

<div class="stack">
<div style="width: 100%; max-width: 396px; margin: 0 auto">

```comp CoordAxes
x-range: [0, 6.3]
y-range: [0, 4.1]
x-axis: { quantity: t, side: above }
y-axis: { quantity: v }
ticks:
  x: []
  y: []
view: { width: 300, height: 164 }
areas:
  - points: [{ x: 0.44, y: 0 }, { x: 4.33, y: 2 }, { x: 4.33, y: 0 }]
    fill: var(--c-accent)
    fillOpacity: 0.18
curves:
  - points: [{ x: 0.44, y: 0 }, { x: 5.17, y: 2.5 }]
    color: var(--c-accent-2)
    width: 3
  - points: [{ x: 4.33, y: 2 }, { x: 4.33, y: 0 }]
    color: var(--c-accent)
    width: 1.4
    dashed: true
labels:
  - x: 4.45
    y: 0.8
    parts:
      - text: 面积 = 位移
    anchor: right
    color: var(--c-accent)
    halo: true
```
</div>
<div class="tip-hint" style="--hint-pad-y:.6rem" v-click="2"><span class="text-accent-2">图线与时间轴包围的面积</span>：表示这段时间内的<span class="text-accent-2">位移</span>。</div>
</div>

</div>

<div class="mini-note" v-click="2">每小段时间内速度近似不变，小矩形面积 <Latex tex="v\Delta t" /> 就是该段位移，累加起来即总面积（后续会进一步理解）。</div>
</div>

---
layout: base-flex
clicks: 5
class: title-ask
---

# v-t 图像能读出什么、读不出什么？

<div class="page-grow">

<div class="half-grid">

<div style="width: 100%; max-width: 400px; margin: 0 auto">

```comp CoordAxes
x-range: [0, 6.4]
y-range: [-3.2, 4.2]
x-axis: { quantity: t, unit: s, side: above }
y-axis: { quantity: v, unit: 'm/s' }
ticks:
  x: []
  y: []
view: { width: 320, height: 220 }
areas:
  - points: [{ x: 0.5, y: 0 }, { x: 3.53, y: 0 }, { x: 0.5, y: 3.2 }]
    fill: var(--c-accent)
    fillOpacity: 0.16
  - points: [{ x: 3.53, y: 0 }, { x: 5.8, y: 0 }, { x: 5.8, y: -2.4 }]
    fill: var(--c-accent-2)
    fillOpacity: 0.16
curves:
  - points: [{ x: 0.5, y: 3.2 }, { x: 5.8, y: -2.4 }]
    color: var(--c-accent)
    width: 3.4
labels:
  - x: 1.2
    y: 2.46
    tex: 'A'
    dot: 5
    dotColor: var(--c-accent)
    anchor: top-right
    color: var(--c-accent)
  - x: 4.6
    y: -1.13
    tex: 'B'
    dot: 5
    dotColor: var(--c-accent-2)
    anchor: bottom-left
    color: var(--c-accent-2)
```

</div>

<div class="stack stack-tight">

<div v-click="1"><span class="text-accent">① 任意时刻的速度</span>：读对应的纵坐标。</div>

<div v-click="2"><span class="text-accent">② 运动方向</span>：<Latex tex="v" /> 为正沿正方向、为负沿反方向。</div>

<div v-click="3"><span class="text-accent">③ 速度的增减与变化</span>：图线上升 <Latex tex="v" /> 增大、下降减小，越陡变化越快。</div>

<div v-click="4"><span class="text-accent">④ 两点间的位置变动（位移）</span>：图线与 <Latex tex="t" /> 轴围成的面积。</div>

<div class="warn-hint" style="--hint-pad-y:.6rem" v-click="5"><span class="text-accent">读不出位置</span>：只知道位置<span class="text-accent">变了多少、往哪变</span>，不知道此刻在哪儿。</div>

</div>

</div>

</div>

---
layout: base-flex
title: 课堂小结（第二课时）
---

# 课堂小结

<div class="page-grow">

<div><mdi-numeric-1-circle class="icon-md inline-block align-middle mr-1 text-accent" />用纸带求速度：在待求点<span class="text-accent">两侧对称</span>取一小段时间，用这一小段的平均速度代替该点的瞬时速度——<Latex tex="v_N \approx \frac{x_{N+1}-x_{N-1}}{2\Delta t}" />。</div>

<div><mdi-numeric-2-circle class="icon-md inline-block align-middle mr-1 text-accent" /><Latex tex="\Delta t" />  <span class="text-accent">不是越小越好</span>：太小会让测量误差占比过高（尺子精度、点迹本身有大小），要选得合理。</div>

<div><mdi-numeric-3-circle class="icon-md inline-block align-middle mr-1 text-accent" />把各点速度画到 <Latex tex="v-t" /> 图上，用<span class="text-accent">平滑的直线或曲线拟合</span>（速度连续变化 / 测量误差）。</div>

<div><mdi-numeric-4-circle class="icon-md inline-block align-middle mr-1 text-accent" /><Latex tex="v-t" /> 图像还能读出：<span class="text-accent-2">交点 → 两物体共速</span>；<span class="text-accent-2">与时间轴包围的面积 → 位移</span>。</div>

</div>

---
layout: base-flex
clicks: 1
title: 思考题
---

<div class="page-grow">

<div class="half-grid">

<div class="stack">
<div style="width: 100%; margin: 0 auto">

```comp CoordAxes
x-range: [0, 10.5]
y-range: [0, 4.3]
x-axis: { quantity: t }
y-axis: { quantity: x }
ticks:
  x: []
  y: []
view: { width: 340, height: 195 }
curves:
  - points: [{ x: 0, y: 0 }, { x: 1, y: 0.04 }, { x: 2, y: 0.153 }, { x: 3, y: 0.347 }, { x: 4, y: 0.617 }, { x: 5, y: 0.963 }, { x: 6, y: 1.387 }, { x: 7, y: 1.89 }, { x: 8, y: 2.467 }, { x: 9, y: 3.123 }, { x: 9.84, y: 3.733 }]
    color: var(--c-physics)
    width: 3
  - points: [{ x: 4.8, y: 0.9 }, { x: 8.8, y: 0.9 }]
    color: var(--c-text-dim)
    width: 1.4
    dashed: true
  - points: [{ x: 8.8, y: 0.9 }, { x: 8.8, y: 3 }]
    color: var(--c-text-dim)
    width: 1.4
    dashed: true
  - points: [{ x: 4.8, y: 0.9 }, { x: 8.8, y: 3 }]
    color: var(--c-accent-2)
    width: 3
labels:
  - x: 4.8
    y: 0.9
    dot: 6
    dotColor: var(--c-accent)
  - x: 8.8
    y: 3
    dot: 6
    dotColor: var(--c-accent-2)
  - x: 4.8
    y: 0.9
    text: A
    anchor: top-left
    color: var(--c-accent)
    halo: true
    size: 18
  - x: 8.8
    y: 3
    text: B
    anchor: top-right
    color: var(--c-accent-2)
    halo: true
    size: 18
  - x: 6.8
    y: 0.45
    tex: '\Delta t'
    anchor: center
    color: var(--c-text)
    halo: true
    size: 18
  - x: 9.2
    y: 1.77
    tex: '\Delta x'
    anchor: right
    color: var(--c-text)
    halo: true
    size: 18
```
</div>
<div class="mini-note" style="text-align: center"><Latex tex="x\text{-}t" /> 图像的斜率 <Latex tex="\frac{\Delta x}{\Delta t}" /> = <span class="text-accent">速度 <Latex tex="v" /></span></div>
</div>

<div class="stack">
<div style="width: 100%; margin: 0 auto">

```comp CoordAxes
x-range: [0, 10.5]
y-range: [0, 4.3]
x-axis: { quantity: t }
y-axis: { quantity: v }
ticks:
  x: []
  y: []
view: { width: 340, height: 195 }
curves:
  - points: [{ x: 0.4, y: 0.2 }, { x: 9.6, y: 3.53 }]
    color: var(--c-accent)
    width: 3
  - points: [{ x: 3.6, y: 1.37 }, { x: 8, y: 1.37 }]
    color: var(--c-text-dim)
    width: 1.4
    dashed: true
  - points: [{ x: 8, y: 1.37 }, { x: 8, y: 2.97 }]
    color: var(--c-text-dim)
    width: 1.4
    dashed: true
labels:
  - x: 3.6
    y: 1.37
    dot: 6
    dotColor: var(--c-accent-2)
  - x: 8
    y: 2.97
    dot: 6
    dotColor: var(--c-physics)
  - x: 3.6
    y: 1.37
    text: E
    anchor: top-left
    color: var(--c-accent-2)
    halo: true
    size: 18
  - x: 8
    y: 2.97
    text: F
    anchor: top-right
    color: var(--c-physics)
    halo: true
    size: 18
  - x: 5.84
    y: 0.63
    tex: '\Delta t'
    anchor: center
    color: var(--c-text)
    halo: true
    size: 18
  - x: 8.4
    y: 1.97
    tex: '\Delta v'
    anchor: right
    color: var(--c-text)
    halo: true
    size: 18
```
</div>
<div class="mini-note" style="text-align: center"><Latex tex="v\text{-}t" /> 图像的斜率 <Latex tex="\frac{\Delta v}{\Delta t}" /> = <span class="text-accent-2">？</span></div>
</div>

</div>

<div class="ask ask-lead">在 <Latex tex="v\text{-}t" /> 图像里，同样取两点作割线——它的斜率代表什么？</div>

<div class="tip-hint" style="--hint-pad-y:.6rem" v-click="1">它描述的是<span class="text-accent-2">速度变化的快慢</span>——下一节 §1.4 我们就从它入手，给它起个名字。</div>

</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow" style="--page-gap:.55rem">

<div class="ask">把时间轴切成很多小段，图线与 <Latex tex="t" /> 轴围成的面积为什么就等于位移？</div>

<VtMicroRects />

<div class="stack stack-tight">

<div v-click="1">① 把整段时间分成很多小段，每小段长 <Latex tex="\Delta t" />。</div>

<div v-click="2">② <Latex tex="\Delta t" /> 足够小时，这一小段内速度几乎不变，可以看作<span class="text-accent">匀速直线运动</span>：这一小段的位移 <Latex tex="= v\Delta t" />，恰好是小矩形的面积。</div>

<div class="tip-hint" style="--hint-pad-y:.6rem" v-click="3">③ 把所有小矩形的面积加起来，就是这段时间内的位移；<Latex tex="\Delta t" /> 越小，小矩形越贴合图线——所以<span class="text-accent-2">图线与 <Latex tex="t" /> 轴包围的面积 = 位移</span>。</div>

</div>

</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">

<div class="ask">图线跑到 <Latex tex="t" /> 轴下面去了——这块面积算正的还是负的？</div>

<div class="half-grid">

<div style="width: 100%; max-width: 420px; margin: 0 auto">

```comp CoordAxes
x-range: [0, 6.4]
y-range: [-3.2, 4.4]
x-axis: { quantity: t, unit: s, side: above }
y-axis: { quantity: v, unit: 'm/s' }
ticks:
  x: []
  y: []
view: { width: 320, height: 220 }
areas:
  - points: [{ x: 0.6, y: 0 }, { x: 3.53, y: 0 }, { x: 0.6, y: 3.4 }]
    fill: var(--c-accent)
    fillOpacity: 0.2
  - points: [{ x: 3.53, y: 0 }, { x: 5.6, y: 0 }, { x: 5.6, y: -2.4 }]
    fill: var(--c-accent-2)
    fillOpacity: 0.2
curves:
  - points: [{ x: 0.6, y: 3.4 }, { x: 5.6, y: -2.4 }]
    color: var(--c-text)
    width: 3
  - points: [{ x: 3.53, y: -2.4 }, { x: 3.53, y: 3.4 }]
    color: var(--c-text-dim)
    width: 1.4
    dashed: true
labels:
  - x: 1.5
    y: 1
    parts: [{ text: '正向位移' }]
    color: var(--c-accent)
    halo: true
  - x: 5
    y: -0.5
    parts: [{ text: '负向位移' }]
    color: var(--c-accent-2)
    halo: true
```

</div>

<div class="stack">

<div v-click="1"><Latex tex="t" /> 轴<span class="text-accent">之上</span>（<Latex tex="v > 0" />）的面积 → <span class="text-accent">正向位移</span>，运动方向始终沿我们规定的正方向。</div>

<div v-click="1"><Latex tex="t" /> 轴<span class="text-accent-2">之下</span>（<Latex tex="v < 0" />）的面积 → <span class="text-accent-2">负向位移</span>，运动方向始终与正方向相反。</div>

<div class="tip-hint" style="--hint-pad-y:.6rem" v-click="2">总位移 = 两块面积的<span class="text-accent-2">代数和</span>（<Latex tex="t" /> 轴下方的面积<span class="text-accent-2">取负号</span>）；路程 = 各段面积<span class="text-accent-2">大小之和</span>。</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 2
title: 例 1：无人机与队伍
---

<div class="page-grow">

<div class="text-base"><b class="ex-no">例 1</b>　一支 <Latex tex="150\ \text{m}" /> 长的队伍匀速前进。队长从队尾放出无人机，飞到出发点前方 <Latex tex="1000\ \text{m}" /> 处侦察，拍照后立即返回；无人机回到队长处时，队伍已经前进了 <Latex tex="200\ \text{m}" />。求全过程中无人机的位移和路程。</div>

<div class="half-grid">

<DroneTeamSvg :step="$clicks" />

<div class="stack stack-tight">

<div v-click="1"><span class="text-accent">位移</span>：无人机从队尾出发、又回到队长处，而队长随队伍前进了 <Latex tex="200\ \text{m}" /> → 位移 <Latex tex="200\ \text{m}" />，方向同队伍前进方向。</div>

<div class="tip-hint" style="--hint-pad-y:.65rem" v-click="2"><span class="text-accent-2">路程</span>：去程 <Latex tex="1000\ \text{m}" />，回程 <Latex tex="1000\ \text{m} - 200\ \text{m} = 800\ \text{m}" /> → 路程 <Latex tex="1800\ \text{m}" />。队伍长 <Latex tex="150\ \text{m}" /> 是干扰条件，位移和路程都与它无关。</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 3
title: 例 2：两车与小鸟
---

<div class="page-grow">

<div class="text-base"><b class="ex-no">例 2</b>　A、B 两车相距 <Latex tex="1000\ \text{m}" />，相向而行，速度分别为 <Latex tex="10\ \text{m/s}" /> 和 <Latex tex="30\ \text{m/s}" />。一只小鸟从 A 车处开始，以 <Latex tex="50\ \text{m/s}" /> 的速度在两车之间往复飞行。求两车相遇时，小鸟的运动路程与位移。</div>

<div class="half-grid">

<BirdCarsSvg :step="$clicks" />

<div class="stack stack-tight">

<div v-click="1">两车相向而行 → 相对速度 <Latex tex="10 + 30 = 40\ \text{m/s}" />，相遇用时 <Latex tex="t = \frac{1000\ \text{m}}{40\ \text{m/s}} = 25\ \text{s}" />。</div>

<div v-click="2"><span class="text-accent">路程</span>：小鸟始终以 <Latex tex="50\ \text{m/s}" /> 飞行（方向来回变、快慢不变）→ <Latex tex="s = 50\ \text{m/s} \times 25\ \text{s} = 1250\ \text{m}" />。</div>

<div class="tip-hint" style="--hint-pad-y:.65rem" v-click="3"><span class="text-accent-2">位移</span>：终点在两车相遇处，即 A 车前进的距离 → <Latex tex="\Delta x = 10\ \text{m/s} \times 25\ \text{s} = 250\ \text{m}" />（由 A 指向 B）。</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 3
title: 例 3：队长往返
---

<div class="page-grow">

<div class="text-base"><b class="ex-no">例 3</b>　长为 <Latex tex="L" /> 的队伍以速度 <Latex tex="v_1" /> 匀速前进。队长从队尾以速度 <Latex tex="v_2" /> 匀速前进至队首后，立即返回队尾。求队长的路程和位移。</div>

<div class="half-grid">

<TeamLeaderSvg />

<div class="stack stack-tight">

<div v-click="1">相对队伍看：去程相对速度 <Latex tex="v_2 - v_1" />，用时 <Latex tex="t_1 = \frac{L}{v_2 - v_1}" />；返程相对速度 <Latex tex="v_2 + v_1" />，用时 <Latex tex="t_2 = \frac{L}{v_2 + v_1}" />。</div>

<div v-click="2"><span class="text-accent">位移</span>：队长最终回到队尾，而队尾在这段时间里随队伍前进了 <Latex tex="v_1(t_1 + t_2)" /> → <Latex tex="\Delta x = v_1(t_1 + t_2) = \frac{2v_1v_2L}{v_2^2 - v_1^2}" />。</div>

<div class="tip-hint" style="--hint-pad-y:.65rem" v-click="3"><span class="text-accent-2">路程</span>：队长全程都以 <Latex tex="v_2" /> 运动 → <Latex tex="s = v_2(t_1 + t_2) = \frac{2v_2^2L}{v_2^2 - v_1^2}" />。</div>

</div>

</div>

</div>

---
layout: exercise-split
clicks: 3
title: 拓展练习 1
---

<template v-slot:stem>

<div><b class="ex-no">拓展练习 1</b>　一支长为 <Latex tex="L" /> 的队伍以速率 <Latex tex="v" /> 匀速前进，传令兵往返的速率恰好是队伍行进速率的 <Latex tex="2" /> 倍。求传令兵从排尾出发、再回到排尾时，走过的总路程。</div>

</template>

<div class="step-list">
<div class="step-item" v-click="1">
<div class="step-no">1</div>
<div>去程（追排头）：相对速度 <Latex tex="2v - v = v" />，用时 <Latex tex="t_1 = \frac{L}{v}" />；返程（回排尾）：相对速度 <Latex tex="2v + v = 3v" />，用时 <Latex tex="t_2 = \frac{L}{3v}" />。</div>
</div>
<div class="step-item" v-click="2">
<div class="step-no">2</div>
<div>往返总时间 <Latex tex="t = t_1 + t_2 = \frac{L}{v} + \frac{L}{3v} = \frac{4L}{3v}" />。</div>
</div>
</div>

<div v-click="3">参考答案：传令兵全程以 <Latex tex="2v" /> 运动 → <Latex tex="s = 2v \cdot t = 2v \times \frac{4L}{3v} = \frac{8}{3}L" />。</div>

---
layout: exercise-split
clicks: 3
title: 拓展练习 2
---

<template v-slot:stem>

<div><b class="ex-no">拓展练习 2</b>　一支长为 <Latex tex="L" /> 的队伍以速率 <Latex tex="v" /> 匀速前进。传令兵从排尾出发，往返一次回到排尾时，整支队伍恰好向前行进了 <Latex tex="L" />。求传令兵全程走过的总路程。</div>

</template>

<div class="step-list">
<div class="step-item" v-click="1">
<div class="step-no">1</div>
<div>设传令兵速率为 <Latex tex="u" />：去程（追排头）相对速度 <Latex tex="u - v" />，用时 <Latex tex="t_1 = \frac{L}{u - v}" />；返程（回排尾）相对速度 <Latex tex="u + v" />，用时 <Latex tex="t_2 = \frac{L}{u + v}" />。</div>
</div>
<div class="step-item" v-click="2">
<div class="step-no">2</div>
<div>队伍前进 <Latex tex="L" /> 用时 <Latex tex="T = \frac{L}{v}" />，它正是往返的总时间：<Latex tex="\frac{L}{u - v} + \frac{L}{u + v} = \frac{L}{v}" /> → <Latex tex="2uv = u^2 - v^2" />，取正根 <Latex tex="u = (1 + \sqrt{2})v" />。</div>
</div>
</div>

<div v-click="3">参考答案：<Latex tex="s = uT = (1 + \sqrt{2})v \cdot \frac{L}{v} = (1 + \sqrt{2})L" />。</div>

