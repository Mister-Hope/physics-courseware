---
theme: default
title: 质点与参考系·时间与位移
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: cover
colorSchema: dark
clickAnimation: card
addons:
  - ../shared
fonts:
  sans: Nunito Sans
  mono: Fira Code
  provider: none
defaults:
  layout: default
  transition: fade
---

<div class="cover-chapter"><span class="cover-section">§</span> 1.1–1.2 · 第一章 运动的描述</div>

<h1 class="cover-title">质点与参考系<br />时间与位移</h1>

<div class="cover-subtitle">
  <span>授课教师：张伯望</span>
</div>

<div class="cover-school">东北育才学校</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <svg viewBox="0 0 220 150" width="320" xmlns="http://www.w3.org/2000/svg">
    <!-- 纵轴（位置 x）-->
    <line x1="34" y1="118" x2="34" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M 31 25 L 34 18 L 37 25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- 横轴（时间 t）-->
    <line x1="34" y1="118" x2="206" y2="118" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M 201 121 L 208 118 L 201 115" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- 刻度：短线紧贴轴、向图内伸出 -->
    <g stroke="currentColor" stroke-width="1.2" opacity="0.6">
      <line x1="78" y1="118" x2="78" y2="112"/>
      <line x1="118" y1="118" x2="118" y2="112"/>
      <line x1="158" y1="118" x2="158" y2="112"/>
      <line x1="198" y1="118" x2="198" y2="112"/>
      <line x1="34" y1="94" x2="40" y2="94"/>
      <line x1="34" y1="68" x2="40" y2="68"/>
      <line x1="34" y1="42" x2="40" y2="42"/>
    </g>
    <!-- 原点（坐标轴交点，标签在左下方，KaTeX 数学斜体）-->
    <circle cx="34" cy="118" r="3" fill="currentColor" opacity="0.7"/>
    <text x="22" y="136" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size:12px" fill="#94a3b8" opacity="0.85">O</text>
    <!-- 物理量标签（KaTeX 数学斜体；x 与 O 竖向对齐、t 与 O 横向对齐，离轴留间距）-->
    <text x="206" y="136" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size:15px" fill="#94a3b8">t</text>
    <text x="22" y="20" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size:15px" fill="#94a3b8">x</text>
    <!-- 位置—时间图线（贝塞尔曲线：先上 → 再降 → 再扬）-->
    <path d="M 34 118 C 50 86 58 50 80 52 C 96 53 106 92 122 92 C 136 92 152 40 172 34" fill="none" stroke="#e2a846" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="172" cy="34" r="4" fill="#e2a846"/>
    <!-- 图注（底部居中）-->
    <text x="110" y="149" text-anchor="middle" style="font-size:11px" fill="#94a3b8" opacity="0.75">位置随时间的变化</text>
  </svg>
</div>

---
layout: default
---

## 我们如何描述物体的运动？

<div class="grid grid-cols-3 gap-4 mt-4">

<v-clicks>

<div class="card text-center">
  <mdi-car class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">汽车</div>
  <div class="text-sm opacity-60 mt-1">公路上行驶</div>
</div>

<div class="card text-center">
  <mdi-bird class="text-3xl text-accent inline-block mb-1" />
  <div class="font-semibold text-lg">雄鹰</div>
  <div class="text-sm opacity-60 mt-1">空中翱翔</div>
</div>

<div class="card text-center">
  <mdi-soccer class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">足球</div>
  <div class="text-sm opacity-60 mt-1">草地上滚动</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="card card-highlight mt-5 text-center">
  <div class="text-xl font-semibold"><mdi-head-question-outline class="text-accent text-2xl inline-block align-middle mr-3" />要准确描述它们的运动，难在哪里？</div>
</div>

</v-click>

<v-click>

<div class="card mt-3 text-center">
  <div class="text-base">任何物体都有<span class="text-accent">大小和形状</span>，物体各部分的运动情况一般说来<span class="text-accent">并不一样</span></div>
</div>

</v-click>

---
layout: default
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 质点 · 物体和质点</div>

## 雄鹰与足球的"麻烦"

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-bird class="text-accent-2 text-xl" /><span class="font-semibold text-lg">雄鹰翱翔</span></div>
  <v-clicks>
    <div class="mb-2 text-sm">身体在<span class="text-accent">向前</span>运动</div>
    <div class="mb-2 text-sm">翅膀在向前的同时还<span class="text-accent-2">上下</span>运动</div>
  </v-clicks>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-soccer class="text-accent-2 text-xl" /><span class="font-semibold text-lg">足球滚动</span></div>
  <v-clicks>
    <div class="mb-2 text-sm">它在<span class="text-accent">向前</span>运动</div>
    <div class="mb-2 text-sm">同时还在<span class="text-accent-2">转动</span></div>
  </v-clicks>
</div>

</div>

<v-click>

<div class="card card-highlight mt-4 text-center">
  <div class="text-lg">我们有时关注<span class="text-accent">物体各部分的运动</span>，有时只关注<span class="text-accent-2">物体整体的运动</span>——<br />如何描述，要看我们关注的问题是什么</div>
</div>

</v-click>

---
layout: default
---

# 什么时候能把它看成"点"？

<v-click>

<div class="card card-highlight mb-3">
  <div class="flex items-center gap-2 mb-1"><mdi-earth class="text-accent-2 text-xl" /><span class="font-semibold text-lg">地球绕太阳公转</span></div>
  <div class="text-sm opacity-70">地球直径约 <Latex tex="1.3 \times 10^4 \text{ km}" />，不到地日距离（约 <Latex tex="1.5 \times 10^8 \text{ km}" />）的万分之一</div>
  <v-click>
    <div class="mt-2 text-sm">由地球大小引起的运动差异<span class="text-accent">很小，可以忽略</span> → 把它视为点</div>
  </v-click>
</div>

</v-click>

<v-click>

<div class="card card-highlight mb-3">
  <div class="flex items-center gap-2 mb-1"><mdi-train class="text-accent-2 text-xl" /><span class="font-semibold text-lg">列车在平直轨道上行驶</span></div>
  <div class="text-sm opacity-70">传动机构与车轮的运动很复杂</div>
  <v-click>
    <div class="mt-2 text-sm">只关注列车<span class="text-accent">整体的运动</span>，不考虑各部分差异 → 用一个点的运动代替整列列车</div>
  </v-click>
</div>

</v-click>

---
layout: default
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 质点的定义</div>

<v-click>

<div class="card card-highlight">
  <div class="text-2xl font-semibold">
    定义：<span class="text-accent">忽略物体的大小和形状</span>，把它简化为一个<span class="text-accent">具有质量</span>的点，这样的点叫作<span class="text-accent-2">质点</span>（mass point）
  </div>
</div>

</v-click>

<div class="grid grid-cols-2 gap-4 mt-4">

<v-clicks>

<div class="card">
  <div class="flex items-center gap-2 mb-1"><mdi-check-circle-outline class="text-accent text-xl" /><span class="font-semibold text-lg">条件一</span></div>
  <div class="text-sm opacity-70 mt-1">大小和形状可以忽略（相对问题尺度很小）</div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-1"><mdi-check-circle-outline class="text-accent text-xl" /><span class="font-semibold text-lg">条件二</span></div>
  <div class="text-sm opacity-70 mt-1">或各点运动完全相同，一点能反映整体运动</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="card mt-4 text-center">
  <div class="text-base">质点是一种<span class="text-accent font-semibold">理想化的物理模型</span>——突出问题的主要因素，忽略次要因素</div>
</div>

</v-click>

---
layout: default
---

# 思考与讨论：香蕉球

<div class="card card-highlight mt-3">
  <div class="flex items-start gap-3">
    <mdi-soccer class="text-4xl text-accent-2 shrink-0" />
    <div class="text-base leading-relaxed">踢足球的不同部位会使球产生不同运动。"香蕉球"是球在<span class="text-accent">空中旋转</span>、整体运动径迹为类似香蕉形<span class="text-accent">弧线</span>的运动。</div>
  </div>
</div>

<v-click>

<div class="card mt-3">
  <div class="text-lg font-semibold"><mdi-head-question-outline class="text-accent inline-block align-middle mr-2" />研究如何踢出"香蕉球"时，能把足球看作质点吗？</div>
  <v-click>
    <div class="mt-2 text-base"><span class="text-danger font-semibold">不能</span>——球的旋转与弧线径迹和它的<span class="text-danger">形状、旋转</span>密切相关</div>
  </v-click>
</div>

</v-click>

<v-click>

<div class="card mt-3">
  <div class="text-lg font-semibold"><mdi-head-question-outline class="text-accent inline-block align-middle mr-2" />研究什么样的问题可以把足球看作质点？</div>
  <v-click>
    <div class="mt-2 text-base">只关心足球从<span class="text-accent-2">哪里飞到了哪里</span>、不研究旋转时——它的形状就不重要了，可以看作质点</div>
  </v-click>
</div>

</v-click>

---
layout: default
---

<div class="tag-icon mb-4"><mdi-head-question-outline /> 你能不能判断？</div>

<ParticleJudge />

---
layout: default
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 小结</div>

<div class="grid grid-cols-2 gap-4 mt-2">

<v-clicks>

<div class="card card-highlight">
  <div class="flex items-center gap-2 mb-2"><mdi-head-question-outline class="text-accent text-xl" /><span class="font-semibold text-lg">能否看成质点</span></div>
  <div class="text-base leading-relaxed mb-2">由<span class="text-accent">所研究的问题</span>决定。</div>
  <div class="text-base leading-relaxed">同一个物体，研究的问题不同，有时可以，有时不能。</div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-tools class="text-accent text-xl" /><span class="font-semibold text-lg">理想化模型</span></div>
  <div class="text-base leading-relaxed mb-2">突出<span class="text-accent">主要因素</span>、忽略<span class="text-accent-2">次要因素</span>——物理学常用的科学方法。</div>
  <div class="text-base leading-relaxed">质点只保留"<span class="text-accent-2">有质量</span>"，忽略大小与形状；以后还有光滑斜面、轻质弹簧、点电荷……</div>
</div>

</v-clicks>

</div>

---
layout: default
---

# 参考系：为什么看法不一样？

<div class="card card-highlight mt-3">
  <div class="flex items-center gap-3">
    <mdi-train-car class="text-4xl text-accent-2 shrink-0" />
    <div class="text-base leading-relaxed">行驶的列车中，乘务员与旅客正在交流。</div>
  </div>
</div>

<v-clicks>

<p class="mt-5 text-lg">列车外的人认为，他们<span class="text-accent font-semibold">随列车一起运动</span>。</p>

<p class="mt-3 text-lg">但他们彼此看对方，却是<span class="text-accent-2 font-semibold">静止</span>的。</p>

</v-clicks>

<v-click>

<div class="card card-highlight mt-5 text-center">
  <div class="text-xl font-semibold"><mdi-head-question-outline class="text-accent text-2xl inline-block align-middle mr-3" />为什么人们的看法会不一样？</div>
</div>

</v-click>

<v-click>

<p class="mt-5 text-lg">因为描述位置随时间的变化，总是<span class="text-accent font-semibold">相对于其他物体</span>而言的。</p>

</v-click>

---
layout: default
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 运动的相对性与参考系</div>

<div class="grid grid-cols-2 gap-4 mt-2">

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-infinity class="text-accent text-xl" /><span class="font-semibold text-lg">运动是绝对的</span></div>
  <v-clicks>
    <div class="mb-1 text-sm">自然界一切物体都处于<span class="text-accent">永恒的运动</span>中</div>
    <div class="mb-1 text-sm">绝对静止的物体不存在</div>
  </v-clicks>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-source-branch class="text-accent-2 text-xl" /><span class="font-semibold text-lg">运动的相对性</span></div>
  <v-clicks>
    <div class="mb-1 text-sm">描述位置随时间变化，总是<span class="text-accent-2">相对于其他物体</span>而言</div>
    <div class="mb-1 text-sm">房屋树木"静止"其实是相对地面</div>
  </v-clicks>
</div>

</div>

<v-click>

<div class="card card-highlight mt-4 text-center">
  <div class="text-xl font-semibold">定义：用来作为<span class="text-accent">参考</span>的物体，叫作<span class="text-accent-2">参考系</span>（reference frame）</div>
</div>

</v-click>

---
layout: default
---

<div class="tag-icon mb-3"><mdi-train-car /> 参考系演示：同一辆列车，两种看法</div>

<ReferenceFrameDemo />

---
layout: default
---

# 参考系怎么选？

<div class="grid grid-cols-3 gap-3 mt-4">

<v-clicks>

<div class="card text-center">
  <mdi-swap-horizontal class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">可以任意选择</div>
  <div class="text-sm opacity-60 mt-1">描述同一运动，参考系不唯一</div>
</div>

<div class="card text-center">
  <mdi-tune-variant class="text-3xl text-accent inline-block mb-1" />
  <div class="font-semibold text-lg">选取得当更简洁</div>
  <div class="text-sm opacity-60 mt-1">使研究的问题简洁、方便</div>
</div>

<div class="card text-center">
  <mdi-earth class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">通常选地面</div>
  <div class="text-sm opacity-60 mt-1">讨论地面上物体运动时，以地面为参考系</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="card card-highlight mt-4 text-center">
  <div class="text-base">凡是提到运动，都应该弄清楚是<span class="text-accent font-semibold">相对于哪个参考系</span>而言的</div>
</div>

</v-click>

---
layout: default
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 时间 位移 · 引入</div>

<div class="card card-highlight">
  <div class="text-xl font-semibold"><mdi-head-question-outline class="text-accent text-2xl inline-block align-middle mr-3" />要描述物体位置随时间的变化，我们需要哪些概念？</div>
</div>

<v-clicks>

<div class="card mt-3 text-center">
  <div class="text-lg"><mdi-map-marker class="text-accent-2 inline-block align-middle mr-2" />需要确定<span class="text-accent">位置</span>——用什么描述？</div>
</div>

<div class="card mt-3 text-center">
  <div class="text-lg"><mdi-clock-time-eight-outline class="text-accent inline-block align-middle mr-2" />需要明确<span class="text-accent-2">时间</span>——"时间"到底是什么？</div>
</div>

</v-clicks>

---
layout: default
---

# 时刻与时间间隔

<div class="card card-highlight mt-3 text-center">
  <div class="text-xl font-semibold">上午 8 时上课，8 时 45 分下课</div>
</div>

<v-click>

<div class="card mt-3">
  <div class="text-lg font-semibold"><mdi-head-question-outline class="text-accent inline-block align-middle mr-2" />"8 时""8 时 45 分"和"45 min"有什么不同？</div>
</div>

</v-click>

<v-clicks>

<div class="card mt-2 px-3 py-1.5">
  <div class="text-sm"><span class="text-accent-2 font-semibold">时刻</span>："8 时""8 时 45 分"——上课开始和结束的<span class="text-accent-2">瞬间</span></div>
</div>

<div class="card mt-2 px-3 py-1.5">
  <div class="text-sm"><span class="text-accent font-semibold">时间间隔</span>：两个时刻之间的 <Latex tex="45 \text{ min}" />——一段<span class="text-accent">持续</span>的时间</div>
</div>

<div class="card mt-2 px-3 py-1.5">
  <div class="text-sm">平时说的"时间"，有时指<span class="text-accent-2">时刻</span>，有时指<span class="text-accent">时间间隔</span>，要依上下文判断</div>
</div>

</v-clicks>

---
layout: default
---

# 时间轴：时刻是点，时间间隔是线段

<TimeAxis />

---
layout: default
---

# 用坐标描述位置

<div class="card card-highlight">
  <div class="text-xl font-semibold">定量描述位置，需要在参考系上建立<span class="text-accent">坐标系</span>（coordinate system）</div>
</div>

<v-clicks>

<div class="card mt-3">
  <div class="text-base">直线运动 → 建立一维坐标系：在 <Latex tex="x" /> 轴上选<span class="text-accent-2">原点</span>，规定<span class="text-accent-2">正方向</span>和<span class="text-accent-2">单位长度</span></div>
</div>

<div class="card mt-3">
  <div class="text-base">长安街上的汽车：<Latex tex="x" /> 轴正方向指<span class="text-accent">东</span>，以交通岗亭为原点 <Latex tex="O" /></div>
</div>

</v-clicks>

<div class="grid grid-cols-2 gap-3 mt-3">

<v-clicks>

<div class="card text-center">
  <div class="text-2xl font-bold text-accent"><Latex tex="+30 \text{ m}" /></div>
  <div class="text-sm opacity-70 mt-1">在岗亭以东 <Latex tex="30 \text{ m}" /> 处</div>
</div>

<div class="card text-center">
  <div class="text-2xl font-bold text-accent-2"><Latex tex="-20 \text{ m}" /></div>
  <div class="text-sm opacity-70 mt-1">在岗亭以西 <Latex tex="20 \text{ m}" /> 处</div>
</div>

</v-clicks>

</div>

---
layout: default
---

# 位置的变化：北京 → 重庆

<div class="grid grid-cols-3 gap-3 mt-4">

<v-clicks>

<div class="card text-center">
  <mdi-train class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">乘火车</div>
  <div class="text-sm opacity-60 mt-1">线路不同</div>
</div>

<div class="card text-center">
  <mdi-airplane class="text-3xl text-accent inline-block mb-1" />
  <div class="font-semibold text-lg">乘飞机</div>
  <div class="text-sm opacity-60 mt-1">线路不同</div>
</div>

<div class="card text-center">
  <mdi-ferry class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">火车 + 轮船</div>
  <div class="text-sm opacity-60 mt-1">经武汉沿长江而上</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="card mt-4">
  <div class="text-lg font-semibold"><mdi-head-question-outline class="text-accent inline-block align-middle mr-2" />哪种方式位置变化最大？</div>
  <v-click>
    <div class="mt-2 text-base"><span class="text-accent font-semibold">都一样</span>——都从北京到达西南方向、直线距离约 <Latex tex="1300 \text{ km}" /> 的重庆</div>
  </v-click>
</div>

</v-click>

<v-click>

<div class="card mt-2">
  <div class="text-sm opacity-70">路程（path）是运动轨迹的长度——不同路径，路程<span class="text-accent">不同</span>；位置的变化却<span class="text-accent-2">相同</span></div>
</div>

</v-click>

---
layout: default
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 位移的定义</div>

<v-click>

<div class="card card-highlight">
  <div class="text-xl font-semibold">由<span class="text-accent">初位置</span>指向<span class="text-accent">末位置</span>的<span class="text-accent-2">有向线段</span>，能准确地描述位置的变化</div>
</div>

</v-click>

<v-click>

<div class="card mt-3">
  <div class="text-lg font-semibold">物理学中用<span class="text-accent-2">位移</span>（displacement）描述物体位置的变化，用 <Latex tex="l" /> 表示</div>
</div>

</v-click>

<div class="grid grid-cols-2 gap-3 mt-4">

<v-clicks>

<div class="card">
  <div class="flex items-center gap-2 mb-1"><mdi-arrow-right-bold-circle-outline class="text-accent text-xl" /><span class="font-semibold text-lg">矢量</span></div>
  <div class="text-sm opacity-70 mt-1">既有大小又有方向（如位移）</div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-1"><mdi-numeric text-xl text-accent-2 class="text-accent-2" /><span class="font-semibold text-lg">标量</span></div>
  <div class="text-sm opacity-70 mt-1">只有大小没有方向（如路程、温度）</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="card card-highlight mt-4 text-center">
  <div class="text-base">位移只与<span class="text-accent">初、末位置</span>有关，不因路径不同而改变；<span class="text-accent-2">路程</span>却随路径而变</div>
</div>

</v-click>

---
layout: default
---

# 直线运动的位移：算一算

<DisplacementLine />

---
layout: default
---

# 思考与讨论

<div class="card card-highlight mt-3">
  <div class="text-lg font-semibold">某物体从 <Latex tex="A" /> 点运动到 <Latex tex="B" /> 点，坐标 <Latex tex="x_A = 5 \text{ m}" />，<Latex tex="x_B = 2 \text{ m}" /></div>
</div>

<div class="card mt-3">
  <div class="text-lg font-semibold"><mdi-head-question-outline class="text-accent inline-block align-middle mr-2" />物体的位移大小等于多少？方向如何？</div>
  <v-click>
    <div class="mt-2 text-base"><Latex tex="\Delta x = x_B - x_A = 2 - 5 = -3 \text{ m}" /></div>
  </v-click>
  <v-click>
    <div class="mt-2 text-base">位移大小为 <span class="text-accent font-semibold"><Latex tex="3 \text{ m}" /></span>，方向指向 <span class="text-accent font-semibold"><Latex tex="x" /> 轴负方向</span>（由 <Latex tex="A" /> 指向 <Latex tex="B" />）</div>
  </v-click>
</div>

<v-click>

<div class="card mt-3">
  <div class="text-sm opacity-70">若两坐标之差为<span class="text-accent">正</span>，位移指向 <Latex tex="x" /> 轴正方向；为<span class="text-accent-2">负</span>，则指向 <Latex tex="x" /> 轴负方向</div>
</div>

</v-click>

---
layout: default
---

# 起点不同，位移可以相同

<div class="card card-highlight mt-3">
  <div class="text-lg font-semibold"><mdi-head-question-outline class="text-accent inline-block align-middle mr-2" />从 0 走到 2，和从 −2 走到 0，位移一样吗？</div>
</div>

<div class="grid grid-cols-2 gap-4 mt-4">

<v-clicks>

<div class="card text-center">
  <div class="font-semibold text-lg mb-2">从 0 到 2</div>
  <svg viewBox="0 0 220 96" width="250" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="60" x2="200" y2="60" stroke="#64748b" stroke-width="1.5"/>
    <g stroke="#64748b" stroke-width="1.2">
      <line x1="65" y1="55" x2="65" y2="65"/>
      <line x1="110" y1="55" x2="110" y2="65"/>
      <line x1="155" y1="55" x2="155" y2="65"/>
    </g>
    <text x="20" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">−2</text>
    <text x="65" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">−1</text>
    <text x="110" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">0</text>
    <text x="155" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">1</text>
    <text x="200" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">2</text>
    <line x1="110" y1="60" x2="200" y2="60" stroke="#e2a846" stroke-width="3" stroke-linecap="round"/>
    <path d="M 200 60 L 189 54 L 189 66 Z" fill="#e2a846"/>
  </svg>
  <div class="text-base mt-2"><Latex tex="\Delta x = 2 - 0 = +2\ \text{m}" /></div>
</div>

<div class="card text-center">
  <div class="font-semibold text-lg mb-2">从 −2 到 0</div>
  <svg viewBox="0 0 220 96" width="250" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="60" x2="200" y2="60" stroke="#64748b" stroke-width="1.5"/>
    <g stroke="#64748b" stroke-width="1.2">
      <line x1="65" y1="55" x2="65" y2="65"/>
      <line x1="110" y1="55" x2="110" y2="65"/>
      <line x1="155" y1="55" x2="155" y2="65"/>
    </g>
    <text x="20" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">−2</text>
    <text x="65" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">−1</text>
    <text x="110" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">0</text>
    <text x="155" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">1</text>
    <text x="200" y="78" text-anchor="middle" style="font-size:11px" fill="#94a3b8">2</text>
    <line x1="20" y1="60" x2="110" y2="60" stroke="#e2a846" stroke-width="3" stroke-linecap="round"/>
    <path d="M 110 60 L 99 54 L 99 66 Z" fill="#e2a846"/>
  </svg>
  <div class="text-base mt-2"><Latex tex="\Delta x = 0 - (-2) = +2\ \text{m}" /></div>
</div>

</v-clicks>

</div>

<v-clicks>

<div class="card card-highlight mt-4 text-center">
  <div class="text-base">两次位移都是 <Latex tex="+2\ \text{m}" />：<span class="text-accent font-semibold">方向相同、大小相同</span>——位移相等，与起点、终点在哪无关。</div>
</div>

<div class="card mt-3 text-center">
  <div class="text-base">位移是<span class="text-accent-2">矢量</span>：只要两条位移<span class="text-accent">平行、等长、同向</span>，它们就<span class="text-accent">相等</span>。</div>
</div>

</v-clicks>

---
layout: default
---

# 位移—时间图像（$x$-$t$ 图像）

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="flex flex-col gap-3">

<v-clicks>

<div class="card">
  <div class="text-sm leading-relaxed mb-2">以时刻 <Latex tex="t" /> 为<span class="text-accent">横轴</span>、位置 <Latex tex="x" /> 为<span class="text-accent-2">纵轴</span>，图线即位置—时间图像。</div>
  <div class="text-sm leading-relaxed">初始位置为原点时，位置与位移相等，即 <span class="text-accent">x-t 图像</span>。</div>
</div>

<div class="card">
  <div class="text-sm leading-relaxed">从 <span class="text-accent">x-t 图像</span> 可直观看出物体在不同时间内的位移。</div>
</div>

</v-clicks>

</div>

<div class="card text-center">

<svg viewBox="0 0 300 210" width="100%" class="xt-graph" xmlns="http://www.w3.org/2000/svg">
  <!-- 坐标轴（带箭头）-->
  <line x1="36" y1="180" x2="278" y2="180" stroke="#64748b" stroke-width="1.6"/>
  <path d="M 270 175 L 280 180 L 270 185" fill="none" stroke="#64748b" stroke-width="1.5"/>
  <line x1="36" y1="180" x2="36" y2="26" stroke="#64748b" stroke-width="1.6"/>
  <path d="M 31 34 L 36 24 L 41 34" fill="none" stroke="#64748b" stroke-width="1.5"/>
  <!-- 刻度 -->
  <g stroke="#64748b" stroke-width="1.2">
    <line x1="96" y1="176" x2="96" y2="184"/>
    <line x1="156" y1="176" x2="156" y2="184"/>
    <line x1="216" y1="176" x2="216" y2="184"/>
    <line x1="36" y1="140" x2="42" y2="140"/>
    <line x1="36" y1="100" x2="42" y2="100"/>
    <line x1="36" y1="60" x2="42" y2="60"/>
  </g>
  <!-- 原点 -->
  <circle cx="36" cy="180" r="3" fill="#94a3b8"/>
  <text x="30" y="197" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" style="font-size:14px" fill="#94a3b8">O</text>
  <!-- 轴标签（KaTeX 数学斜体，放大）-->
  <text x="286" y="188" text-anchor="start" font-family="KaTeX_Math" font-style="italic" style="font-size:19px" fill="#cbd5e1">t</text>
  <text x="26" y="24" text-anchor="end" font-family="KaTeX_Math" font-style="italic" style="font-size:19px" fill="#cbd5e1">x</text>
  <!-- 图线：从原点出发的匀速直线 -->
  <line x1="36" y1="180" x2="264" y2="46" stroke="#e2a846" stroke-width="3" stroke-linecap="round"/>
  <!-- 某时刻位移投影 -->
  <circle cx="192" cy="90" r="5" fill="#3b82f6"/>
  <line x1="192" y1="90" x2="192" y2="180" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="36" y1="90" x2="192" y2="90" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5 4"/>
</svg>

</div>

</div>

---
layout: default
---

# 位移和时间的测量

<div class="grid grid-cols-2 gap-4 mt-4">

<v-clicks>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-camera class="text-accent-2 text-xl" /><span class="font-semibold text-lg">频闪照相</span></div>
  <div class="text-sm opacity-70">同时记录物体的<span class="text-accent">时刻</span>和<span class="text-accent-2">位置</span></div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-printer-pos class="text-accent text-xl" /><span class="font-semibold text-lg">打点计时器</span></div>
  <div class="text-sm opacity-70">电磁式 <Latex tex="8 \text{ V}" />、电火花式；电源频率 <Latex tex="50 \text{ Hz}" />，<span class="text-accent">每隔 <Latex tex="0.02 \text{ s}" /> 打一个点</span></div>
</div>

</v-clicks>

</div>

<v-click>

<div class="card mt-4">
  <div class="text-sm">纸带与运动物体相连，<span class="text-accent">点与点之间的距离</span> = 相应时间间隔内物体的<span class="text-accent-2">位移大小</span></div>
</div>

</v-click>

---
layout: default
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 科学漫步 · 全球卫星导航系统</div>

<div class="grid grid-cols-2 gap-4 mt-2">

<v-clicks>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-satellite-variant class="text-accent text-xl" /><span class="font-semibold text-lg">北斗 · 中国</span></div>
  <div class="text-sm opacity-70">2012 年北斗二号面向亚太；2020 年北斗三号面向全球</div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-satellite-uplink class="text-accent-2 text-xl" /><span class="font-semibold text-lg">全球四大系统</span></div>
  <div class="text-sm opacity-70">北斗、GPS、格洛纳斯、伽利略</div>
</div>

</v-clicks>

</div>

<v-clicks>

<div class="card mt-3 px-3 py-1.5">
  <div class="text-sm">通过卫星信号，接收机能<span class="text-accent">精确定位、授时和测速</span>——全球任何时刻都有 4 颗以上卫星可见</div>
</div>

<div class="card mt-3 px-3 py-1.5">
  <div class="text-sm">从车载导航、手机定位，到机场调度、海事救援、地质测绘——<span class="text-accent-2">时刻与位置的测量</span>无处不在</div>
</div>

</v-clicks>

---
layout: default
---

# 课堂小结

<div class="grid grid-cols-2 gap-4 mt-4">

<v-clicks>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-creation class="text-accent text-xl" /><span class="font-semibold text-lg">质点</span></div>
  <div class="text-sm opacity-75 mb-1">忽略大小形状、有质量的点——理想化模型</div>
  <div class="text-sm opacity-75">能否看成质点由<span class="text-accent">研究的问题</span>决定</div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-source-branch class="text-accent-2 text-xl" /><span class="font-semibold text-lg">参考系</span></div>
  <div class="text-sm opacity-75 mb-1">选作参考的物体</div>
  <div class="text-sm opacity-75">运动是<span class="text-accent">绝对</span>的，描述是<span class="text-accent-2">相对</span>的</div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-clock-time-eight-outline class="text-accent text-xl" /><span class="font-semibold text-lg">时间</span></div>
  <div class="text-sm opacity-75 mb-1">时刻 = 时间轴上的<span class="text-accent">点</span></div>
  <div class="text-sm opacity-75">时间间隔 = 两点间的<span class="text-accent-2">线段</span></div>
</div>

<div class="card">
  <div class="flex items-center gap-2 mb-2"><mdi-arrow-right-bold-circle-outline class="text-accent-2 text-xl" /><span class="font-semibold text-lg">位移</span></div>
  <div class="text-sm opacity-75 mb-1">初位置指向末位置的有向线段 —— <span class="text-accent">矢量</span></div>
  <div class="text-sm opacity-75">直线运动：<Latex tex="\Delta x = x_2 - x_1" /></div>
</div>

</v-clicks>

</div>

---
layout: default
---

# 课后练习

<div class="card card-highlight mt-3">
  <div class="text-lg font-semibold">1. 下列情况中，可以把物体看成质点的是（&nbsp;&nbsp;&nbsp;&nbsp;）</div>
</div>

<v-clicks>

<div class="card mt-2 px-3 py-1.5 text-sm">A. 研究地球自转时，把地球看成质点</div>
<div class="card mt-2 px-3 py-1.5 text-sm">B. 研究"香蕉球"的旋转时，把足球看成质点</div>
<div class="card mt-2 px-3 py-1.5 text-sm">C. 研究列车从沈阳到北京的整体运动时，把列车看成质点</div>
<div class="card mt-2 px-3 py-1.5 text-sm">D. 研究列车通过一座桥的时间时，把列车看成质点</div>

</v-clicks>

<v-click>

<div class="card card-highlight mt-3 text-center">
  <div class="text-base">答案：<span class="text-accent font-semibold">C</span>——研究整体的远距离运动时，物体的形状可忽略</div>
</div>

</v-click>

<div class="card card-highlight mt-4">
  <div class="text-lg font-semibold">2. 物体沿 <Latex tex="x" /> 轴从 <Latex tex="x_1 = 3 \text{ m}" /> 运动到 <Latex tex="x_2 = -2 \text{ m}" />，它的位移是多少？路程能小于它吗？</div>
  <v-click>
    <div class="mt-2 text-base"><Latex tex="\Delta x = -2 - 3 = -5 \text{ m}" />：位移大小 <span class="text-accent font-semibold"><Latex tex="5 \text{ m}" /></span>，方向沿 <span class="text-accent-2"><Latex tex="x" /> 轴负方向</span></div>
  </v-click>
  <v-click>
    <div class="mt-2 text-base">路程是轨迹长度，只可能<span class="text-accent">大于或等于</span>位移大小，不可能比位移小</div>
  </v-click>
</div>
