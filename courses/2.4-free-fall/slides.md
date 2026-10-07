---
theme: default
title: "自由落体运动"
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

<div class="cover-chapter"><span class="cover-section">§</span> 2.4 · 第二章 匀变速直线运动的研究</div>

<h1 class="cover-title">自由落体运动</h1>

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
<div class="ask">苹果从树上掉下来、雨滴从空中落下、石块从高处坠落——轻重不同的物体，下落的快慢一样吗？</div>

<div class="chat-stack">
<div class="chat-msg chat-left" v-click="1">看这两个：一块石头、一片树叶，同时松手，谁先落地？</div>

<div class="chat-msg chat-right" v-click="2">当然是石头！重的落得快。</div>
</div>

<div class="key" v-click="3">从亚里士多德开始，这个直觉被当成常识用了<b class="text-accent">两千多年</b>。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 伽利略的反问

<div class="page-grow">
<div class="ask">大石块"落得快"、小石块"落得慢"——把两块石头<strong>捆在一起</strong>，会更快还是更慢？</div>

<AristotleRebuttal />
</div>

---
layout: base-flex
clicks: 4
---

# 真实的下落运动

<div class="page-grow">
<div class="ask">同样大小的两张纸：一张平铺、一张揉成紧实的小纸团，让它们和铁球从同一高度同时落下——谁先着地？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<PaperVsIronFallSvg />
</div>
<div class="stack">
<div class="line" v-click="2">平铺的纸片飘得最慢，铁球最快。</div>

<div class="line" v-click="3">把同一张纸揉成紧实的小纸团，它和铁球的快慢差别<b class="text-accent-2">急剧减小</b>。</div>

<div class="key" v-click="4">纸片和纸团质量一样，快慢却不同——决定快慢的是<b class="text-accent">空气阻力</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 排除空气影响的下落运动

<div class="page-grow">
<div class="ask">牛顿管里抽出空气后，羽毛和小铁片谁先落到管底？</div>

<NewtonTube />
</div>

---
layout: base-flex
clicks: 6
---

# 伽利略怎么"看见"自由落体

<div class="page-grow">
<div class="ask">落体下落得太快、当时只能靠滴水计时——怎么才能测得准？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<GalileoInclineDemo />
</div>
<div class="stack">
<div class="line" v-click="2">让铜球沿<b class="text-accent">涂了油的光滑斜面</b>从静止滚下：加速度比竖直下落小得多、时间长得多，<b>测得准</b>。</div>

<div class="line" v-click="3">测出位移与时间的关系：<Latex tex="x \propto t^2" />。</div>

<div class="line" v-click="4">由 <Latex tex="x \propto t^2" /> 且 <Latex tex="v_0 = 0" />，就能推出 <Latex tex="v \propto t" />。</div>

<div class="line" v-click="5">倾角增大到 <Latex tex="90^\circ" />，斜面"立"成竖直——物体只受重力，就是自由落体。</div>

<div class="key" v-click="6">所以自由落体是 <Latex tex="v \propto t" /> 的运动：<b class="text-accent">初速度为 0 的匀加速直线运动</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 什么才算"自由落体"？

<div class="page-grow">
<div class="ask">要让"下落一样快"成立，必须满足什么条件？</div>

<div class="card card-highlight" v-click="1">
<div class="define-line">物体<strong class="text-accent">只在重力作用下</strong>从<strong class="text-accent">静止开始</strong>下落的运动，叫作<b>自由落体运动</b>。</div>
</div>

<div class="half-grid">
<div class="line" v-click="2">条件一：<b class="text-accent">只受重力</b>（空气阻力等忽略不计）</div>

<div class="line divider-l" v-click="3">条件二：<b class="text-accent-2">从静止开始</b>（<Latex tex="v_0 = 0" />）</div>
</div>

<div class="key" v-click="4">它只在<b>真空</b>中才能发生；阻力小到可以忽略时才<b class="text-accent">近似</b>看成自由落体——这是一个<b class="text-accent">理想化模型</b>。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 测出下落加速度

<div class="page-grow">
<div class="ask">不同物体自由下落的加速度，真的完全一样吗？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<TickerTapeFallSvg />
</div>
<div class="stack">
<div class="line" v-click="2">仿照"研究小车速度随时间变化的规律"，用打点计时器测出重物下落的加速度。</div>

<div class="line" v-click="3">换用不同质量的重物重复实验：测出的加速度<b class="text-accent-2">完全相同</b>。</div>

<div class="key" v-click="4">同一地点，一切物体自由下落的加速度都相同——<b class="text-accent">与物体无关，只与地点有关</b>。这个确定的加速度叫<b class="text-accent">自由落体加速度</b>（重力加速度），用 <Latex tex="g" /> 表示，方向竖直向下。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# <Latex tex="g" /> 在各地一样吗？

<div class="page-grow">
<div class="ask">同一个人在赤道和北极做同一个实验，测出的 <Latex tex="g" /> 会一样大吗？</div>

<div class="half-grid">
<table class="gtab" v-click="1">
<thead>
<tr><th>地点</th><th>纬度</th><th><Latex tex="g/(\text{m}\cdot\text{s}^{-2})" /></th></tr>
</thead>
<tbody>
<tr><td>赤道海平面</td><td><Latex tex="0^\circ" /></td><td>9.780</td></tr>
<tr><td>广州</td><td><Latex tex="23^\circ 06'" /></td><td>9.788</td></tr>
<tr><td>北京</td><td><Latex tex="39^\circ 56'" /></td><td>9.801</td></tr>
<tr><td>莫斯科</td><td><Latex tex="55^\circ 45'" /></td><td>9.816</td></tr>
<tr class="gtab-hot"><td>北极</td><td><Latex tex="90^\circ" /></td><td>9.832</td></tr>
</tbody>
</table>

<div class="stack">
<div class="key" v-click="2">同一地点，一切物体自由下落的 <Latex tex="g" /> <b class="text-accent">都相同</b>；换个地方就不一样：<b class="text-accent">赤道最小、两极最大</b>，离地面越高 <Latex tex="g" /> 越小。</div>

<div class="line" v-click="3">一般计算取 <Latex tex="g = 9.8\ \text{m/s}^2" />，粗略估算取 <Latex tex="g = 10\ \text{m/s}^2" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 公式：把 <Latex tex="a" /> 换成 <Latex tex="g" />

<div class="page-grow">
<div class="ask">自由落体是初速度为 0 的匀加速直线运动——匀变速的三个公式该怎么写？</div>

<div class="map" v-click="1">
<div class="map-col">
<div class="map-head">一般匀变速（<Latex tex="v_0 = 0" />）</div>
<div class="map-item"><Latex tex="v = at" display /></div>
<div class="map-item"><Latex tex="x = \frac{1}{2}at^2" display /></div>
<div class="map-item"><Latex tex="v^2 = 2ax" display /></div>
</div>
<div class="map-arrow">
<FormulaMapArrowSvg />
<div class="map-sub"><Latex tex="a \to g" />　<Latex tex="x \to h" /></div>
</div>
<div class="map-col">
<div class="map-head">自由落体</div>
<div class="map-item map-item-hot"><Latex tex="v = gt" display /></div>
<div class="map-item map-item-hot"><Latex tex="h = \frac{1}{2}gt^2" display /></div>
<div class="map-item map-item-hot"><Latex tex="v^2 = 2gh" display /></div>
</div>
</div>

<div class="key" v-click="2">三个式子里都没有质量——这正是"轻重物体下落一样快"在公式上的体现。</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="ask">请你在纸上画出自由落体运动的这五幅图：<Latex tex="a-t" />、<Latex tex="v-t" />、<Latex tex="v^2-h" />、<Latex tex="h-t" />、<Latex tex="v-h" />。</div>

<FiveGraphAxesSvg />
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="graph-grid">
<div class="graph-box" v-click="1"><FreeFallGraphs chart="a-t" /></div>

<div class="stack">
<div class="ask">自由落体下落过程中，加速度随时间怎么变？</div>

<div class="key" v-click="2">加速度恒为 <Latex tex="g" />：图像是一条<b>水平线</b>，<Latex tex="a = g" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="graph-grid">
<div class="graph-box" v-click="1"><FreeFallGraphs chart="v-t" /></div>

<div class="stack">
<div class="ask">速度随时间怎么变？图线的斜率代表什么？</div>

<div class="key" v-click="2">过原点的直线：<Latex tex="v = gt" />，<b>斜率就是 <Latex tex="g" /></b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="graph-grid">
<div class="graph-box" v-click="1"><FreeFallGraphs chart="v²-h" /></div>

<div class="stack">
<div class="ask"><Latex tex="v^2" /> 与下落高度 <Latex tex="h" /> 是什么关系？</div>

<div class="key" v-click="2"><Latex tex="v^2 = 2gh" />：过原点的直线，<b>斜率是 <Latex tex="2g" /></b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="graph-grid">
<div class="graph-box" v-click="1"><FreeFallGraphs chart="h-t" /></div>

<div class="stack">
<div class="ask">下落高度随时间怎么变？图线为什么越走越陡？</div>

<div class="key" v-click="2"><Latex tex="h = \frac{1}{2}gt^2" />：<b>抛物线</b>；切线斜率就是该时刻的速度。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="graph-grid">
<div class="graph-box" v-click="1"><FreeFallGraphs chart="v-h" /></div>

<div class="stack">
<div class="ask">速度与下落高度成正比吗？</div>

<div class="key" v-click="2"><Latex tex="v = \sqrt{2gh}" />：是<b>曲线</b>不是直线——<Latex tex="h" /> 越大，<Latex tex="v" /> 增长越慢。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="line">自由落体：<b class="text-accent">只受重力</b>、<b class="text-accent">从静止开始</b>（<Latex tex="v_0 = 0" />）。</div>

<div class="line">同一地点，一切物体的加速度都相同：<Latex tex="g" />，方向竖直向下。</div>

<div class="line">三公式：<Latex tex="v = gt" />、<Latex tex="h = \frac{1}{2}gt^2" />、<Latex tex="v^2 = 2gh" />。</div>

<div class="key">图像：<Latex tex="v-t" /> 是过原点的直线，<Latex tex="h-t" /> 是抛物线，<Latex tex="v^2-h" /> 是直线，<Latex tex="v-h" /> 是曲线。</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 竖直上抛

<div class="page-grow">
<div class="ask">小球先上升、在最高点停住、再落下来——这是两段运动吗？加速度变过吗？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<VerticalThrowMotionSvg />
</div>
<div class="stack">
<div class="line" v-click="2">除了最高点那一瞬间，小球<b class="text-accent">始终只受重力</b>：加速度一直是 <Latex tex="g" />、方向竖直向下——上升和下落是<b>同一段</b>匀变速直线运动。</div>

<div class="line" v-click="3">取<b class="text-accent-2">竖直向下为正方向</b>：抛出的初速度是 <Latex tex="-v_0" />，加速度是 <Latex tex="+g" />。</div>

<div class="key" v-click="4"><Latex tex="v = -v_0 + gt" />：<Latex tex="v = 0" /> 的时刻是<b>最高点</b>；<Latex tex="v = +v_0" /> 表示它<b>落回抛出点</b>，速度大小与抛出时相同、方向相反。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 竖直上抛：定义与公式

<div class="page-grow">
<div class="ask">把它竖直向上抛出后，物体只受重力——这种运动怎么定义？规律怎么写？</div>

<div class="card card-highlight" v-click="1">
<div class="define-line">将物体以一定的<b>初速度</b>竖直向上抛出，物体<b>只在重力作用</b>下所做的运动，叫作<b>竖直上抛运动</b>。</div>
</div>

<div class="stack stack-dense" v-click="2">
<div class="line">取<b class="text-accent-2">竖直向上为正方向</b>（<Latex tex="v_0 > 0" />、<Latex tex="a = -g" />）：</div>

<div class="line"><Latex tex="v = v_0 - gt" />　　<Latex tex="h = v_0t - \frac{1}{2}gt^2" />　　<Latex tex="v^2 = v_0^2 - 2gh" /></div>
</div>

<div class="stack stack-dense">
<div class="line" v-click="3">上升时间 <Latex tex="t_1 = \frac{v_0}{g}" />；最大高度 <Latex tex="H = \frac{v_0^2}{2g}" />；回到抛出点用时 <Latex tex="t = \frac{2v_0}{g}" />，速度大小仍为 <Latex tex="v_0" />、方向向下。</div>

<div class="line" v-click="4">若改取<b class="text-accent-2">竖直向下为正</b>，同一套式子写成 <Latex tex="v = -v_0 + gt" />、<Latex tex="x = -v_0t + \frac{1}{2}gt^2" />——后面四幅图用的就是这个约定。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">上抛全过程中，加速度随时间怎么变？</div>

<div class="fig-full" v-click="1"><VerticalThrowGraphs chart="a-t" /></div>

<div class="key" v-click="2">以竖直向下为正，加速度恒为 <Latex tex="+g" />：一条水平线——抛出点可以很高，小球落到抛出点以下，也还是这条线。</div>

<div class="line" v-click="3">若改取<b>竖直向上为正</b>：<Latex tex="a = -g" />，<Latex tex="v = v_0 - gt" />、<Latex tex="h = v_0t - \frac{1}{2}gt^2" />、<Latex tex="v^2 = v_0^2 - 2gh" />。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">为什么 <Latex tex="v-t" /> 图从<b>负半轴</b>出发？回到抛出点之后呢？</div>

<div class="fig-full" v-click="1"><VerticalThrowGraphs chart="v-t" /></div>

<div class="key" v-click="2">抛出时速度向上、而正方向向下，所以初速度是负的；图线过零点（<Latex tex="t = \frac{v_0}{g}" />）就是<b>最高点</b>，斜率恒为 <Latex tex="+g" />。<Latex tex="t = \frac{2v_0}{g}" /> 回到抛出点时速度是 <Latex tex="+v_0" />，但图线没有结束——它继续向下落到抛出点以下，速度继续增大。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">位移随时间怎么变？顶点在哪里？落到抛出点以下以后呢？</div>

<div class="fig-full" v-click="1"><VerticalThrowGraphs chart="x-t" /></div>

<div class="key" v-click="2">抛物线顶点 <Latex tex="\left(\frac{v_0}{g},\ -\frac{v_0^2}{2g}\right)" /> 就是<b>最高点</b>；<Latex tex="t = \frac{2v_0}{g}" /> 时回到抛出点，图线并不停止：位移继续变大，小球落到抛出点以下。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">速度与位移是什么关系？</div>

<div class="fig-full" v-click="1"><VerticalThrowGraphs chart="v-x" /></div>

<div class="key" v-click="2"><Latex tex="v^2 = v_0^2 + 2gx" />：顶点在 <Latex tex="\left(-\frac{v_0^2}{2g},\ 0\right)" />、开口向右的曲线；<Latex tex="x = 0" /> 处速度是 <Latex tex="\pm v_0" />，位移为正（抛出点以下）时速度继续增大。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题：最后一段不是从静止开始

<div class="page-grow">
<div class="ask">物体自由下落，在 <Latex tex="A" />、<Latex tex="B" /> 两点之间下落的高度是 <Latex tex="h_0" />、所用时间是 <Latex tex="t_0" />。求起点距离 <Latex tex="A" /> 点的高度 <Latex tex="H" />。</div>

<div class="split-fig">
<div class="stack">
<div class="line" v-click="1">设从起点落到 <Latex tex="A" /> 点用时 <Latex tex="t_A" />：<Latex tex="H = \frac{1}{2}gt_A^2" />，而 <Latex tex="H + h_0 = \frac{1}{2}g(t_A + t_0)^2" />。</div>

<div class="key" v-click="2">两式相减得 <Latex tex="h_0 = gt_0t_A + \frac{1}{2}gt_0^2" />，于是 <Latex tex="t_A = \frac{h_0}{gt_0} - \frac{t_0}{2}" />，代回即得 <Latex tex="H = \frac{1}{2}gt_A^2" />。</div>

<div class="line" v-click="3">另一条路：<Latex tex="A" /> 点的速度就是最后一段的初速度 <Latex tex="v_A = \frac{h_0}{t_0} - \frac{1}{2}gt_0" />，再由 <Latex tex="H = \frac{v_A^2}{2g}" /> 得到同一个结果。</div>

<div class="line" v-click="4">检验：<Latex tex="h_0 = 2\ \text{m}" />、<Latex tex="t_0 = 0.2\ \text{s}" />、<Latex tex="g = 10\ \text{m/s}^2" /> ⇒ <Latex tex="t_A = 1 - 0.1 = 0.9\ \text{s}" />、<Latex tex="H = 5 \times 0.9^2 = 4.05\ \text{m}" />（<Latex tex="A" />、<Latex tex="B" /> 之间恰好 <Latex tex="2\ \text{m}" />）。</div>
</div>
<div class="fig-side"><FreeFallSegmentSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：绳断瞬间，小球速度是 0 吗？

<div class="page-grow">
<div class="ask">直升机以 <Latex tex="10\ \text{m/s}" /> 匀速上升，小球绳断后经 <Latex tex="3\ \text{s}" /> 落地（<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />）。求：① 小球最高点离地多高 ② 落地速度多大 ③ 球落地时直升机离地多高</div>

<div class="half-grid">
<div class="stack" v-click="1">
<HelicopterRopeBreakSvg />
</div>
<div class="stack">
<div class="line" v-click="2">惯性：小球保留着<b class="text-accent">向上 <Latex tex="10\ \text{m/s}" /></b> 的速度，先继续上升一小段，再落下来。</div>

<div class="line" v-click="3">取向上为正：<Latex tex="v_0 = 10\ \text{m/s}" />、<Latex tex="a = -g" />，落地时相对断裂点的位移 <Latex tex="-h = v_0t - \frac{1}{2}gt^2 = 30 - 45 = -15\ \text{m}" /> ⇒ 绳断时小球离地 <Latex tex="15\ \text{m}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题：绳断瞬间，小球速度是 0 吗？

<div class="page-grow">
<div class="stack stack-dense">
<div class="line" v-click="1">① 最高点：在断裂点上方 <Latex tex="\frac{v_0^2}{2g} = 5\ \text{m}" /> 处，即离地 <b class="text-accent"><Latex tex="20\ \text{m}" /></b>。</div>

<div class="line" v-click="2">② 落地速度：<Latex tex="v = v_0 - gt = -20\ \text{m/s}" />，大小 <Latex tex="20\ \text{m/s}" />、方向向下。</div>

<div class="line" v-click="3">③ 这 <Latex tex="3\ \text{s}" /> 里直升机又匀速上升了 <Latex tex="10 \times 3 = 30\ \text{m}" />。</div>

<div class="key" v-click="4">所以球落地时直升机在 <b class="text-accent"><Latex tex="45\ \text{m}" /></b> 高处（绳断时是 <Latex tex="15\ \text{m}" />）——"此时"指哪一刻，一定要看清。</div>
</div>
</div>

---
layout: base-flex
clicks: 6
---

# 例题：相遇时速度大小相同

<div class="page-grow">
<div class="ask">A 从高处自由下落，同时 B 从地面竖直上抛。已知它们在空中相遇时<b>速度大小恰好相同、都是 <Latex tex="v" /></b>。请求出下面五个量。</div>

<div class="qa-split">
<div class="qa" v-click="1">① B 的初速度 <Latex tex="v_{B0}" /> 是多少？</div>
<div class="qa-a" v-click="2">相遇时 <Latex tex="v_{B0} = gt + v" />，而 <Latex tex="t = \frac{v}{g}" /> ⇒ <Latex tex="v_{B0} = 2v" />（向上）</div>

<div class="qa" v-click="1">② A 的末速度是多少？</div>
<div class="qa-a" v-click="3"><Latex tex="v_A = gt = v" />（向下）</div>

<div class="qa" v-click="1">③ B 的最大高度是多少？</div>
<div class="qa-a" v-click="4"><Latex tex="H_{B\max} = \frac{v_{B0}^2}{2g} = \frac{(2v)^2}{2g} = \frac{2v^2}{g}" /></div>

<div class="qa" v-click="1">④ A 的释放高度是多少？</div>
<div class="qa-a" v-click="5"><Latex tex="H_A = h + \frac{v^2}{2g} = \frac{3v^2}{2g} + \frac{v^2}{2g} = \frac{2v^2}{g}" />，与 ③ <b class="text-accent">恰好相等</b></div>

<div class="qa" v-click="1">⑤ 相遇前 A、B 通过的路程之比是多少？</div>
<div class="qa-a" v-click="6"><Latex tex="s_A : s_B = \frac{v^2}{2g} : \frac{3v^2}{2g} = 1 : 3" /></div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 例题：什么时候离抛出点 15 m？

<div class="page-grow">
<div class="ask">一个人在阳台上以 <Latex tex="20\ \text{m/s}" /> 竖直向上抛出一个实心球（<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />）。求实心球距离抛出点 <Latex tex="15\ \text{m}" /> 的时刻。</div>

<div class="split-fig">
<div class="stack">
<div class="line" v-click="1">取向上为正：<Latex tex="v_0 = 20\ \text{m/s}" />、<Latex tex="a = -g" />，球相对抛出点的位置 <Latex tex="h = v_0t - \frac{1}{2}gt^2 = 20t - 5t^2" />。</div>

<div class="line" v-click="2">在抛出点<b class="text-accent">上方</b> <Latex tex="15\ \text{m}" />：<Latex tex="20t - 5t^2 = 15" /> ⇒ <Latex tex="t^2 - 4t + 3 = 0" /> ⇒ <Latex tex="t = 1\ \text{s}" />（上升途中）或 <Latex tex="t = 3\ \text{s}" />（下落途中）。</div>

<div class="line" v-click="3">在抛出点<b class="text-accent-2">下方</b> <Latex tex="15\ \text{m}" />：<Latex tex="20t - 5t^2 = -15" /> ⇒ <Latex tex="t^2 - 4t - 3 = 0" /> ⇒ <Latex tex="t = 2 + \sqrt{7} \approx 4.65\ \text{s}" />（另一个根 <Latex tex="2 - \sqrt{7} < 0" /> 舍去）。</div>

<div class="key" v-click="4">"距离抛出点 <Latex tex="15\ \text{m}" />"没有说明在<b>上方还是下方</b>，所以答案是三个时刻：<b class="text-accent"><Latex tex="1\ \text{s}" />、<Latex tex="3\ \text{s}" />、<Latex tex="2 + \sqrt{7}\ \text{s}" /></b>。</div>
</div>
<div class="fig-side"><ThrowDistanceSvg /></div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack stack-dense">
<div class="line"><b class="text-accent">自由落体运动</b>：只在重力作用下、从<b>静止</b>开始下落的运动（<Latex tex="v_0 = 0" />）。<Latex tex="v = gt" />、<Latex tex="h = \frac{1}{2}gt^2" />、<Latex tex="v^2 = 2gh" />；同一地点一切物体的 <Latex tex="g" /> 都相同、方向竖直向下。</div>

<div class="line"><b class="text-accent-2">竖直上抛运动</b>：以一定的初速度竖直向上抛出、只在重力作用下的运动。取向上为正：<Latex tex="v = v_0 - gt" />、<Latex tex="h = v_0t - \frac{1}{2}gt^2" />、<Latex tex="v^2 = v_0^2 - 2gh" />；上升时间 <Latex tex="\frac{v_0}{g}" />、最大高度 <Latex tex="\frac{v_0^2}{2g}" />。</div>

<div class="line">两类运动都是<b>初速度与重力共线</b>的匀变速直线运动，全程只有<b>一个 <Latex tex="g" /></b>——解题第一步永远是<b class="text-accent-2">先定正方向</b>，把初速度的符号写对。</div>

<div class="key">图像：<Latex tex="v-t" /> 是过原点的直线（斜率 <Latex tex="g" />）、<Latex tex="h-t" /> 是抛物线、<Latex tex="v^2-h" /> 是直线、<Latex tex="v-h" /> 是曲线。</div>
</div>
</div>
