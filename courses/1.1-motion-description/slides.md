---
theme: default
title: 质点 参考系
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
<div class="cover-chapter"><span class="cover-section">§</span> 1.1 · 第一章 运动的描述</div>

<h1 class="cover-title">质点 参考系</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
---

## 我们如何描述物体的运动？

<div class="grid grid-cols-3 gap-4 mt-6">

<v-clicks>

<div class="text-center">
  <mdi-car class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">汽车</div>
  <div class="text-sm opacity-60 mt-1">公路上行驶</div>
</div>

<div class="text-center">
  <mdi-bird class="text-3xl text-accent inline-block mb-1" />
  <div class="font-semibold text-lg">雄鹰</div>
  <div class="text-sm opacity-60 mt-1">空中翱翔</div>
</div>

<div class="text-center">
  <mdi-soccer class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">足球</div>
  <div class="text-sm opacity-60 mt-1">草地上滚动</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="ask mt-8 justify-center">
  <mdi-head-question-outline class="text-2xl" />
  <span>要准确描述它们的运动，难在哪里？</span>
</div>

</v-click>

<v-click>

<div class="key key-blue mt-6 mx-auto max-w-3xl">任何物体都有<span class="text-accent">大小和形状</span>，物体各部分的运动情况一般说来<span class="text-accent">并不一样</span></div>

</v-click>
---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 质点 · 物体和质点</div>

## 雄鹰与足球的"麻烦"

<div class="grid grid-cols-2 gap-8 mt-6">

<div>
  <div class="flex items-center gap-2 mb-2"><mdi-bird class="text-accent-2 text-xl" /><span class="font-semibold text-lg">雄鹰翱翔</span></div>
  <v-clicks>
    <div class="mb-2 text-sm">身体在<span class="text-accent">向前</span>运动</div>
    <div class="mb-2 text-sm">翅膀在向前的同时还<span class="text-accent-2">上下</span>运动</div>
  </v-clicks>
</div>

<div class="divider-l">
  <div class="flex items-center gap-2 mb-2"><mdi-soccer class="text-accent-2 text-xl" /><span class="font-semibold text-lg">足球滚动</span></div>
  <v-clicks>
    <div class="mb-2 text-sm">它在<span class="text-accent">向前</span>运动</div>
    <div class="mb-2 text-sm">同时还在<span class="text-accent-2">转动</span></div>
  </v-clicks>
</div>

</div>

<v-click>

<div class="key mt-8 mx-auto max-w-4xl">我们有时关注<span class="text-accent">物体各部分的运动</span>，有时只关注<span class="text-accent-2">物体整体的运动</span>——如何描述，要看我们关注的问题是什么</div>

</v-click>
---
layout: base-flex
---

# 什么时候能把它看成"点"？

<v-click>

<div class="mb-6">
  <div class="flex items-center gap-2 mb-1"><mdi-earth class="text-accent-2 text-xl" /><span class="font-semibold text-lg">地球绕太阳公转</span></div>
  <div class="text-sm opacity-70">地球直径约 <Latex tex="1.3 \times 10^4 \text{ km}" />，不到地日距离（约 <Latex tex="1.5 \times 10^8 \text{ km}" />）的万分之一</div>
  <v-click>
    <div class="mt-2 text-sm">由地球大小引起的运动差异<span class="text-accent">很小，可以忽略</span> → 把它视为点</div>
  </v-click>
</div>

</v-click>

<v-click>

<div class="mb-6">
  <div class="flex items-center gap-2 mb-1"><mdi-train class="text-accent-2 text-xl" /><span class="font-semibold text-lg">列车在平直轨道上行驶</span></div>
  <div class="text-sm opacity-70">传动机构与车轮的运动很复杂</div>
  <v-click>
    <div class="mt-2 text-sm">只关注列车<span class="text-accent">整体的运动</span>，不考虑各部分差异 → 用一个点的运动代替整列列车</div>
  </v-click>
</div>

</v-click>
---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 质点的定义</div>

<v-click>

<div class="card card-highlight">
  <div class="text-2xl font-semibold">
    定义：<span class="text-accent">忽略物体的大小和形状</span>，把它简化为一个<span class="text-accent">具有质量</span>的点，这样的点叫作<span class="text-accent-2">质点</span>（mass point）
  </div>
</div>

</v-click>

<div class="grid grid-cols-2 gap-8 mt-6">

<v-clicks>

<div>
  <div class="flex items-center gap-2 mb-1"><mdi-check-circle-outline class="text-accent text-xl" /><span class="font-semibold text-lg">条件一</span></div>
  <div class="text-sm opacity-70 mt-1">大小和形状可以忽略（相对问题尺度很小）</div>
</div>

<div class="divider-l">
  <div class="flex items-center gap-2 mb-1"><mdi-check-circle-outline class="text-accent text-xl" /><span class="font-semibold text-lg">条件二</span></div>
  <div class="text-sm opacity-70 mt-1">或各点运动完全相同，一点能反映整体运动（物体的尺寸不重要）</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="key mt-7 mx-auto max-w-4xl">质点是一种<span class="text-accent font-semibold">理想化的物理模型</span>——突出问题的主要因素，忽略次要因素</div>

</v-click>
---
layout: base-flex
---

# 思考与讨论：香蕉球

<div class="flex items-start gap-4 mt-4">
  <mdi-soccer class="text-4xl text-accent-2 shrink-0" />
  <div class="text-base leading-relaxed">踢足球的不同部位会使球产生不同运动。"香蕉球"是球在<span class="text-accent">空中旋转</span>、整体运动径迹为类似香蕉形<span class="text-accent">弧线</span>的运动。</div>
</div>

<v-click>

<div class="mt-7">
  <div class="ask">
    <mdi-head-question-outline class="text-xl" />
    <span>研究如何踢出"香蕉球"时，能把足球看作质点吗？</span>
  </div>
  <v-click>
    <div class="mt-3 text-base"><span class="text-danger font-semibold">不能</span>——球的旋转与弧线径迹和它的<span class="text-danger">形状、旋转</span>密切相关</div>
  </v-click>
</div>

</v-click>

<v-click>

<div class="mt-7">
  <div class="ask">
    <mdi-head-question-outline class="text-xl" />
    <span>研究什么样的问题可以把足球看作质点？</span>
  </div>
  <v-click>
    <div class="mt-3 text-base">只关心足球从<span class="text-accent-2">哪里飞到了哪里</span>、不研究旋转时——它的形状就不重要了，可以看作质点</div>
  </v-click>
</div>

</v-click>
---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-head-question-outline /> 你能不能判断？</div>

<ParticleJudge />
---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 小结</div>

<div class="grid grid-cols-2 gap-8 mt-6">

<v-clicks>

<div>
  <div class="flex items-center gap-2 mb-2"><mdi-head-question-outline class="text-accent text-xl" /><span class="font-semibold text-lg">能否看成质点</span></div>
  <div class="text-base leading-relaxed mb-2">由<span class="text-accent">所研究的问题</span>决定。</div>
  <div class="text-base leading-relaxed">同一个物体，研究的问题不同，有时可以，有时不能。</div>
</div>

<div class="divider-l">
  <div class="flex items-center gap-2 mb-2"><mdi-tools class="text-accent text-xl" /><span class="font-semibold text-lg">理想化模型</span></div>
  <div class="text-base leading-relaxed mb-2">突出<span class="text-accent">主要因素</span>、忽略<span class="text-accent-2">次要因素</span>——物理学常用的科学方法。</div>
  <div class="text-base leading-relaxed">质点只保留"<span class="text-accent-2">有质量</span>"，忽略大小与形状；以后还有光滑斜面、轻质弹簧、点电荷……</div>
</div>

</v-clicks>

</div>
---
layout: base-flex
---

# 参考系：为什么看法不一样？

<div class="flex items-center gap-4 mt-4">
  <mdi-train-car class="text-4xl text-accent-2 shrink-0" />
  <div class="text-base leading-relaxed">行驶的列车中，乘务员与旅客正在交流。</div>
</div>

<v-clicks>

<p class="mt-5 text-lg">列车外的人认为，他们<span class="text-accent font-semibold">随列车一起运动</span>。</p>

<p class="mt-3 text-lg">但他们彼此看对方，却是<span class="text-accent-2 font-semibold">静止</span>的。</p>

</v-clicks>

<v-click>

<div class="ask mt-8 justify-center">
  <mdi-head-question-outline class="text-2xl" />
  <span>为什么人们的看法会不一样？</span>
</div>

</v-click>

<v-click>

<p class="mt-5 text-lg">因为描述位置随时间的变化，总是<span class="text-accent font-semibold">相对于其他物体</span>而言的。</p>

</v-click>
---
layout: base-flex
---

<div class="tag-icon mb-4"><mdi-lightbulb-on-outline /> 运动的相对性与参考系</div>

<div class="grid grid-cols-2 gap-8 mt-6">

<div>
  <div class="flex items-center gap-2 mb-2"><mdi-infinity class="text-accent text-xl" /><span class="font-semibold text-lg">运动是绝对的</span></div>
  <v-clicks>
    <div class="mb-1 text-sm">自然界一切物体都处于<span class="text-accent">永恒的运动</span>中</div>
    <div class="mb-1 text-sm">绝对静止的物体不存在</div>
  </v-clicks>
</div>

<div class="divider-l">
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
layout: base-flex
---

<div class="tag-icon mb-3"><mdi-train-car /> 参考系演示：同一辆列车，两种看法</div>

<ReferenceFrameDemo />
---
layout: base-flex
---

<div class="page-grow">
  <div class="text-lg leading-relaxed">
    小船顺流而下。经过石拱桥下时，船上的水杯掉入水中；经过时间 <Latex tex="T_0" /> 后船夫才发现，立即掉头折返（掉头时间不计）。他捡起水杯时，又经过了多久？
  </div>

  <BoatCupDemo :interactive="false" />
</div>
---
layout: base-flex
---

<BoatCupDemo />

<div class="grid grid-cols-2 gap-10 mt-3 text-sm leading-tight">

<div>
  <div class="flex items-center gap-2 mb-1.5"><mdi-earth class="text-accent-2 text-lg" /><span class="font-semibold text-base">以地面为参考系</span><span class="text-xs opacity-55">要设船速 <Latex tex="v" />、水速 <Latex tex="u" /></span></div>
  <div class="opacity-80">掉头时船领先水杯 <Latex tex="(v+u)T_0 - uT_0 = vT_0" /></div>
  <div class="opacity-80">掉头后接近速率 <Latex tex="(v-u) + u = v" /></div>
  <div class="opacity-80">还要 <Latex tex="vT_0 \div v = T_0" /></div>
</div>

<div>
  <div class="flex items-center gap-2 mb-1.5"><mdi-water class="text-accent text-lg" /><span class="font-semibold text-base">以水为参考系</span></div>
  <div class="opacity-80">水不动，水杯停在落水处</div>
  <div class="opacity-80">船去、回相对水都是 <Latex tex="v" />，去回用时相同</div>
  <div class="opacity-80">所以再过 <Latex tex="T_0" /> 回到水杯旁</div>
</div>

</div>

<div class="key mt-2" v-click="1">两条路都得到 <Latex tex="T_0" /> —— 但水系不用设任何一个速度</div>
---
layout: base-flex
---

# 参考系怎么选？

<div class="grid grid-cols-3 gap-4 mt-6">

<v-clicks>

<div class="text-center">
  <mdi-swap-horizontal class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">可以任意选择</div>
  <div class="text-sm opacity-60 mt-1">描述同一运动，参考系不唯一</div>
</div>

<div class="text-center">
  <mdi-tune-variant class="text-3xl text-accent inline-block mb-1" />
  <div class="font-semibold text-lg">选取得当更简洁</div>
  <div class="text-sm opacity-60 mt-1">使研究的问题简洁、方便</div>
</div>

<div class="text-center">
  <mdi-earth class="text-3xl text-accent-2 inline-block mb-1" />
  <div class="font-semibold text-lg">通常选地面</div>
  <div class="text-sm opacity-60 mt-1">讨论地面上物体运动时，以地面为参考系</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="key mt-8 mx-auto max-w-4xl">凡是提到运动，都应该弄清楚是<span class="text-accent font-semibold">相对于哪个参考系</span>而言的</div>

</v-click>
---
layout: base-flex
---

# 课堂小结

<div class="grid grid-cols-2 gap-x-10 gap-y-7 mt-7">

<v-clicks>

<div>
  <div class="flex items-center gap-2 mb-2"><mdi-creation class="text-accent text-xl" /><span class="font-semibold text-lg">质点</span></div>
  <div class="text-sm opacity-75 mb-1">忽略大小形状、有质量的点——理想化模型</div>
  <div class="text-sm opacity-75">能否看成质点由<span class="text-accent">研究的问题</span>决定</div>
</div>

<div>
  <div class="flex items-center gap-2 mb-2"><mdi-source-branch class="text-accent-2 text-xl" /><span class="font-semibold text-lg">参考系</span></div>
  <div class="text-sm opacity-75 mb-1">选作参考的物体</div>
  <div class="text-sm opacity-75">运动是<span class="text-accent">绝对</span>的，描述是<span class="text-accent-2">相对</span>的</div>
</div>

</v-clicks>

</div>
---
layout: base-flex
---

# 课后练习

<div class="ask mt-5">
  <mdi-head-question-outline class="text-xl" />
  <span>1. 下列情况中，可以把物体看成质点的是（&nbsp;&nbsp;&nbsp;&nbsp;）</span>
</div>

<div class="mt-5 text-base leading-relaxed">
  <div>A. 研究地球自转时，把地球看成质点</div>
  <div class="mt-2">B. 研究"香蕉球"的旋转时，把足球看成质点</div>
  <div class="mt-2">C. 研究列车从沈阳到北京的整体运动时，把列车看成质点</div>
  <div class="mt-2">D. 研究列车通过一座桥的时间时，把列车看成质点</div>
</div>

<v-click>

<div class="key key-blue mt-6">答案：<span class="text-accent font-semibold">C</span>——研究整体的远距离运动时，物体的形状可忽略</div>

</v-click>
