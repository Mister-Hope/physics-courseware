---
theme: default
title: "实验：探究平抛运动的特点"
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
chapter-no: "5.3"
chapter: 第五章 抛体运动
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">小球沿水平方向抛出，只受重力 —— 这条弯曲的轨迹，该怎么研究？</div>

<div class="half-grid">
<div class="figure-cell"><ProjectileModelSvg :step="$clicks" /></div>
<div class="stack divider-l">
<div class="card" v-click="1">
<div class="mini-title">平抛运动</div>
<div>忽略空气阻力，物体只受重力、以一定的速度抛出，这样的运动叫作<b>抛体运动</b>；初速度沿水平方向的抛体运动，就是<b>平抛运动</b>。</div>
</div>
<div class="key" v-click="2">把它分解成水平、竖直两个方向的分运动 —— 这是研究曲线运动的基本办法。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 两个方向上的规律

<div class="page-grow">
<div class="ask">两个方向的运动，各是什么规律？</div>

<div class="half-grid" v-click="1">
<div class="stack">
<div class="mini-title">水平方向</div>
<div>有水平方向的初速度 <Latex tex="v_0" />，水平方向不受力。</div>
<div class="eq"><Latex tex="x = v_0 t" /></div>
<div class="mini-note">匀速直线运动</div>
</div>
<div class="stack divider-l">
<div class="mini-title">竖直方向</div>
<div>竖直方向初速度为零，只受重力。</div>
<div class="eq"><Latex tex="y = \frac{1}{2} g t^2" /></div>
<div class="mini-note">自由落体运动</div>
</div>
</div>

<div class="key" v-click="2">以抛出点为原点，<Latex tex="x" /> 轴水平、<Latex tex="y" /> 轴竖直向下：两个方向的运动各自独立、互不影响。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 频闪照相：把位置一个个拍下来

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><FlashPointsSvg /></div>
<div class="stack divider-l">
<div class="ask">怎么才能知道小球在每一时刻走到了哪里？</div>
<div v-click="1">频闪照相（或录像逐帧）<b>每隔相等的时间记录一次位置</b>：照片上的每一个点，都对应一个时刻。</div>
<div class="mini-note" v-click="1">相邻两个点的时间间隔都相同，记作 <Latex tex="T" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 从频闪照片看两个分运动

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><FlashPointsSvg :step="$clicks" /></div>
<div class="stack divider-l">
<div class="ask">照片上这些点，能看出两个方向各是什么运动？</div>
<div v-click="1">水平方向：相邻两点的<b>横坐标变化相同</b>（<Latex tex="\Delta x" /> 相等）⇒ 水平方向做<b>匀速直线运动</b>。</div>
<div v-click="2">竖直方向：相邻两段的位移之差<b>恒定</b>：<Latex tex="\Delta y_2 - \Delta y_1 = gT^2" /> ⇒ 竖直方向做<b>匀加速</b>运动（自由落体）。</div>
<div class="mini-note" v-click="3">这就是 2.3 里 <Latex tex="\Delta x = aT^2" /> 那个结论 —— 换成竖直方向再用一次。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 频闪照片上的三点：求初速度

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><ExamPointsSvg /></div>
<div class="stack divider-l solution-stack">
<div class="ask">照片上取 A、B、C 三点，坐标为 A(0, 0)、B(30, 20)、C(60, 50)，单位 cm，<b>频闪周期并不知道</b>。怎样求平抛的初速度？</div>
<div v-click="1">竖直方向相邻位移之差恒定：<Latex tex="\Delta y_{BC} - \Delta y_{AB} = 0.30 - 0.20 = 0.10\ \text{m} = gT^2" />，先由它解出 <Latex tex="T = \sqrt{\dfrac{0.10}{10}}\ \text{s} = 0.1\ \text{s}" />。</div>
<div v-click="2">水平方向匀速，A、B、C 的横坐标依次相差 <Latex tex="\Delta x = 0.30\ \text{m}" />，于是 <Latex tex="v_0 = \dfrac{\Delta x}{T} = 3\ \text{m/s}" />。</div>
<div class="key" v-click="3">照片里没有时钟 —— 时间只能从竖直方向的 <Latex tex="\Delta y = gT^2" /> 里来。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 抛出点在哪里

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><ExamPointsSvg /></div>
<div class="stack divider-l solution-stack">
<div class="ask">还是这张频闪照片：求抛出点在 A 点的<b>上方多高</b>、<b>左侧多远</b>。</div>
<div v-click="1">竖直方向是自由落体，B 是 A→C 的中间时刻：<Latex tex="v_{By} = \dfrac{y_C - y_A}{2T} = \dfrac{0.50}{0.2}\ \text{m/s} = 2.5\ \text{m/s}" />。</div>
<div v-click="2">由 <Latex tex="v_{By} = g t_B" /> 得 <Latex tex="t_B = 0.25\ \text{s}" /> —— 从抛出点到 B 用了 0.25 s。</div>
<div v-click="3">抛出点到 B：竖直 <Latex tex="\frac{1}{2} g t_B^2 = 0.3125\ \text{m}" />，水平 <Latex tex="v_0 t_B = 0.75\ \text{m}" />。</div>
<div class="key" v-click="4">再减掉 A→B 这一段（竖直 0.20 m、水平 0.30 m）：抛出点在 A 上方 <Latex tex="11.25\ \text{cm}" />、左侧 <Latex tex="45\ \text{cm}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 实验室里的实验装置

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><ChuteDeviceSvg :step="$clicks" /></div>
<div class="stack divider-l">
<div class="ask">这套装置，怎么把小球经过的位置留下来？</div>
<div v-click="1">斜槽 M 的<b>末端水平</b>：小球滚下后沿水平方向飞出，做平抛运动。</div>
<div v-click="2">白纸和复写纸固定在<b>竖直的背板</b>上。</div>
<div v-click="3">小球落到<b>水平放置</b>的挡板 N 上，在纸上挤出一个<b>印迹</b>；上下调节挡板的高低，就得到多个位置。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 先与自由落体比一比

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><TwoBallDrop /></div>
<div class="stack divider-l">
<div class="ask">A 球水平抛出、B 球同时自由落下：谁先落地？</div>
<div v-click="1">无论抛出速度多大、高度多高，两球总是<b>同时落地</b> —— 竖直方向的运动完全相同。</div>
<div class="key" v-click="2">平抛运动在竖直方向的分运动，就是<b>自由落体运动</b>。</div>
<div class="mini-note">点击图片可以重放</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 用竖直方向造出相等的时间间隔

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><BoardStepsSvg :step="$clicks" /></div>
<div class="stack divider-l">
<div class="ask">挡板放在哪些高度，才能让相邻两次记录的时间间隔相等？</div>
<div v-click="1">由 <Latex tex="y = \frac{1}{2} g t^2" /> 可知 <Latex tex="y" /> 与 <Latex tex="t^2" /> 成正比：下落 <b>1 份、4 份、9 份、16 份</b>，对应的时刻正是 <Latex tex="T" />、<Latex tex="2T" />、<Latex tex="3T" />、<Latex tex="4T" />。</div>
<div class="key" v-click="2">人为造出相等的时间间隔之后，接下来只要量<b>水平方向的间隔</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 实验记录表

<div class="page-grow">
<table class="data-table data-table-blank">
<thead>
<tr><th class="lead">位置</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
</thead>
<tbody>
<tr><td class="lead">竖直距离 <Latex tex="y_n" /></td><td></td><td></td><td></td><td></td></tr>
<tr><td class="lead">水平坐标 <Latex tex="x_n" /></td><td></td><td></td><td></td><td></td></tr>
<tr><td class="lead">相邻间隔 <Latex tex="\Delta x_n" /></td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>

<div class="fig-note">竖直距离<b>从抛出点算起</b>，按 1 : 4 : 9 : 16 量取；先量好第一份 <Latex tex="y_1" />，其余三处按它的 4 倍、9 倍、16 倍定出来。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 数据处理

<div class="page-grow">
<div class="half-grid half-grid-text">
<div class="figure-cell"><BoardStepsSvg :step="2" show-horizontal /></div>
<div class="stack divider-l solution-stack">
<div class="ask">水平方向的间隔量出来之后，怎么下结论？</div>
<div v-click="1">四段水平间隔 <b>基本相同</b> ⇒ 水平方向做<b>匀速直线运动</b>。</div>
<div v-click="2">由 <Latex tex="T = \sqrt{2y_1 / g}" /> 得到每次的时间间隔，于是 <Latex tex="v_0 = \dfrac{\Delta x}{T}" />。</div>
<div class="key" v-click="2">结论：平抛运动 = 水平方向的匀速直线运动 + 竖直方向的自由落体运动。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 坐标原点画在哪里

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><OriginOffsetSvg :step="$clicks" /></div>
<div class="stack divider-l">
<div class="ask">白纸上的这些印迹，从哪条线开始量？</div>
<div v-click="1">小球有半径：印迹对应的是<b>球心</b>的高度。把原点画在斜槽末端的高度，整条曲线就整体低了一个 <Latex tex="r" />。</div>
<div class="key" v-click="2">原点要画在<b>斜槽末端上方一个小球半径 <Latex tex="r" /></b> 处 —— 那里才是抛出点。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 注意事项与误差分析

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">实验操作</div>
<div>① 斜槽末端必须<b>水平</b>。</div>
<div>② 背板必须<b>竖直</b>，白纸与复写纸平整贴紧。</div>
<div>③ 小球每次从斜槽上<b>同一位置由静止</b>释放。</div>
<div>④ 挡板的高度按 <b>1 : 4 : 9 : 16</b> 竖直量取。</div>
<div>⑤ 印迹取中心，轨迹用<b>平滑曲线</b>连接。</div>
</div>
<div class="stack divider-l">
<div class="mini-title">误差分析</div>
<div><b>空气阻力</b>会影响小球的运动 ⇒ 用<b>实心钢球</b>，体积小、质量大。</div>
<div>斜槽的<b>摩擦不影响实验</b>：每次都从同一位置释放，飞出的初速度相同。</div>
<div>挡板高度量不准、斜槽末端没有调水平，都会带来误差。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><b>平抛运动</b> —— 水平方向的匀速直线运动 <Latex tex="x = v_0 t" /> ＋ 竖直方向的自由落体运动 <Latex tex="y = \frac{1}{2} g t^2" />。</div>
<div class="summary-line"><b>研究方法</b> —— 把曲线运动分解成两个方向上的直线运动，各自独立研究。</div>
<div class="summary-line"><b>频闪照相</b> —— 水平间隔相等、竖直相邻位移差为 <Latex tex="gT^2" />；<Latex tex="v_0 = \dfrac{\Delta x}{T}" />。</div>
<div class="summary-line"><b>实验要点</b> —— 末端水平、同一位置静止释放、原点取球心、用 1 : 4 : 9 : 16 构造等时间间隔。</div>
</div>
</div>
