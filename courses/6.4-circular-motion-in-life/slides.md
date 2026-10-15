---
theme: default
title: "生活中的圆周运动"
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
chapter-no: "6.4"
chapter: "第六章 圆周运动"
---

<CoverDecorationSvg />

---
layout: base-flex
---

<div class="page-grow">
<div class="ask text-3xl leading-normal">在铁路弯道处，稍微留意一下，就能发现内、外轨道的高度略有不同。你能解释其中的原因吗？</div>
</div>

---
layout: base-flex
clicks: 2
---

# 内外轨等高时，谁来提供向心力？

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 1fr)">
<div class="stack">
<div class="ask">火车转弯时做圆周运动，需要指向圆心的力。两轨在同一水平面上，谁出这个力？</div>
<div v-click="1">外侧车轮的轮缘挤压外轨，外轨发生弹性形变，它对轮缘的<b>弹力</b>指向圆心——这是火车转弯向心力的主要来源。</div>
<div class="key key-danger" v-click="2">火车质量太大，靠这种方式得到向心力，轮缘与外轨之间的作用力会很大：铁轨和车轮极易受损，还可能使火车侧翻。</div>
</div>
<div class="figure" v-click="1"><WheelFlangeSvg :show-forces="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 外轨略高于内轨，向心力从哪来？

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 1fr)">
<div class="figure" v-click="1"><BankedTrackSvg :show-forces="$clicks >= 2" /></div>
<div class="stack">
<div class="ask">路基倾斜以后，铁轨对火车的支持力还竖直吗？重力与支持力的合力指向哪里？</div>
<div v-click="1">支持力 <Latex tex="F_N" /> 垂直于路面，不再竖直，而是斜向弯道内侧。</div>
<div v-click="2">它与重力 <Latex tex="G" /> 的合力指向圆心，为火车转弯提供了一部分向心力。</div>
<div class="key" v-click="3">按弯道半径和规定的行驶速度选择内、外轨的高度差，就能让转弯所需的向心力几乎完全由 <Latex tex="G" /> 与 <Latex tex="F_N" /> 的合力提供。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 高度差是按什么定的？

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 1fr)">
<div class="stack">
<div class="ask">要让向心力完全由 <Latex tex="G" /> 与 <Latex tex="F_N" /> 的合力提供，这个合力有多大？车速该是多少？</div>
<div class="step-item" v-click="1"><span class="text-accent">①</span><span>由几何关系，合力沿水平方向指向圆心：<Latex tex="F_{\text{合}} = mg\tan\theta" /></span></div>
<div class="step-item" v-click="2"><span class="text-accent">②</span><span>由牛顿第二定律：<Latex tex="F_{\text{合}} = m\frac{v^2}{r}" /></span></div>
<div class="key" v-click="3">两式联立得 <Latex tex="v = \sqrt{gr\tan\theta}" />：半径越大、倾角越大，允许的规定速度就越大。</div>
</div>
<div class="figure" v-click="1"><BankedTrackSvg :show-forces="true" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 向心力的来源

<div class="page-grow">
<div class="stack">
<div v-click="1">做匀速圆周运动的物体，并不是"除了受到其他物体的作用，还要再受一个向心力"。</div>
<div class="key" v-click="2">任何一个力，或者几个力的合力，只要它的作用效果是使物体产生向心加速度，它就是物体的<b>向心力</b>。</div>
<div class="ask" v-click="1">思考与讨论：高速公路的转弯处、场地自行车比赛的赛道，路面往往有一定的倾斜度。这样设计的原因是什么？</div>
<div v-click="2">路面倾斜后，重力与支持力的合力指向圆心，可以承担一部分（甚至全部）向心力，减少对轮胎侧向摩擦的依赖，过弯更安全。</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 汽车通过桥的最高点

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 1fr)">
<div class="stack">
<div class="ask">质量为 <Latex tex="m" /> 的汽车在拱形桥上以速度 <Latex tex="v" /> 前进，桥面的圆弧半径为 <Latex tex="r" />。分析汽车通过桥的最高点时对桥的压力。</div>
<div v-click="1">先确定向心加速度的方向：桥顶处它<b>竖直向下</b>，指向圆弧的圆心。所以竖直方向上，合力就是这个向心力。</div>
</div>
<div class="figure"><ArchBridgeSvg :show-forces="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 桥顶处，压力有多大？

<div class="page-grow">
<div class="stack">
<div class="step-item" v-click="1"><span class="text-accent">①</span><span>汽车在竖直方向受重力 <Latex tex="G" /> 与支持力 <Latex tex="F_N" />，合力竖直向下：<Latex tex="F = G - F_N" /></span></div>
<div class="step-item" v-click="2"><span class="text-accent">②</span><span>由牛顿第二定律 <Latex tex="F = ma = m\frac{v^2}{r}" />，得 <Latex tex="G - F_N = m\frac{v^2}{r}" />，解出 <Latex tex="F_N = G - m\frac{v^2}{r}" /></span></div>
<div class="step-item" v-click="3"><span class="text-accent">③</span><span>车对桥的压力与桥对车的支持力是一对作用力和反作用力，大小相等：<Latex tex="F_N' = G - m\frac{v^2}{r}" /></span></div>
<div class="key" v-click="3">汽车对桥的压力 <Latex tex="F_N'" /> <b>小于</b>它受到的重力 <Latex tex="G" />，而且速度越大，压力越小。</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="stack gap-6">
<div class="ask">汽车的速度越来越大，桥顶处对桥的压力会怎样变化？大到什么程度就会出问题？</div>
<div v-click="1">从 <Latex tex="F_N = G - m\frac{v^2}{r}" /> 看，<Latex tex="v" /> 越大 <Latex tex="F_N" /> 越小；当 <Latex tex="v = \sqrt{gr}" /> 时 <Latex tex="F_N = 0" />，汽车将腾空，对桥没有压力。</div>
<div class="ask" v-click="2">思考与讨论：把地球看作一个巨大的拱形桥，桥面半径就是地球半径 <Latex tex="R" />。速度大到一定程度时，地面对汽车的支持力为 0，这时驾驶员会有什么感觉？</div>
<div class="key" v-click="3">这正是航天器中的情形——此时驾驶员处于完全失重状态，与座椅之间没有压力。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 凹形路面的最低点

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 1fr)">
<div class="figure"><ConcaveRoadSvg :show-forces="$clicks >= 2" /></div>
<div class="stack">
<div class="ask">（仿照拱形桥自己分析）汽车通过凹形路面最低点时，对地面的压力比它受到的重力大些还是小些？</div>
<div class="step-item" v-click="1"><span class="text-accent">①</span><span>最低点处向心加速度<b>竖直向上</b>，指向圆心，所以合力必须向上：<Latex tex="F_{\text{合}} = F_N - G" /></span></div>
<div class="key" v-click="2">由 <Latex tex="F_{\text{合}} = m\frac{v^2}{r}" /> 得 <Latex tex="F_N = G + m\frac{v^2}{r} > G" />：压力<b>大于</b>重力，且速度越大压力越大——与拱形桥恰好相反。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 航天器中的失重现象

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 1fr)">
<div class="stack">
<div class="ask">航天员在飞船里飘起来，是因为飞船离地球太远、不再受地球引力了吗？</div>
<div v-click="1">不是。恰恰是地球引力的存在，才使航天器连同其中的乘员能做环绕地球的圆周运动。</div>
<div v-click="2">除了引力，航天员还受到座舱对他的支持力 <Latex tex="F_N" />。这两个力的合力提供向心力：<Latex tex="mg - F_N = m\frac{v^2}{R}" /></div>
</div>
<div class="figure" v-click="1"><SpacecraftSvg :show-forces="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="stack gap-6">
<div class="ask">座舱对航天员的支持力 <Latex tex="F_N" /> 与速度 <Latex tex="v" /> 有什么关系？什么条件下他会完全失重？</div>
<div class="step-item" v-click="1"><span class="text-accent">①</span><span>由 <Latex tex="mg - F_N = m\frac{v^2}{R}" /> 解出 <Latex tex="F_N = m\left(g - \frac{v^2}{R}\right)" /></span></div>
<div class="key" v-click="2">当 <Latex tex="v = \sqrt{gR}" /> 时 <Latex tex="F_N = 0" />，航天员处于<b>完全失重</b>状态。</div>
<div v-click="2">任何关闭了发动机、又不受阻力的飞行器内部，都是一个完全失重的环境——例如向空中任意方向抛出的容器，其中的物体都处于完全失重状态。</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 1fr)">
<div class="stack">
<div class="ask">做圆周运动的物体，由于惯性总有沿切线方向飞出去的倾向。它为什么没有飞出去？</div>
<div v-click="1">因为向心力在拉着它，使它与圆心的距离保持不变。</div>
<div class="key" v-click="2">一旦向心力突然消失，物体就会沿切线方向飞出去。</div>
</div>
<div class="figure"><TangentEscapeSvg :show-escape="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.02fr) minmax(0, 1fr)">
<div class="figure" v-click="1"><CentrifugalCompareSvg /></div>
<div class="stack">
<div class="ask">物体实际受到的、指向圆心的力，与需要的向心力 <Latex tex="m\frac{v^2}{r}" /> 一定相等吗？不等会怎样？</div>
<div class="step-item" v-click="1"><span class="text-accent">①</span><span><mdi-orbit class="text-xl mr-2" />相等：恰好提供，做<b>圆周运动</b>。</span></div>
<div class="step-item" v-click="2"><span class="text-accent">②</span><span><mdi-arrow-expand class="text-xl mr-2" />偏小：力"拉不住"，<b>逐渐远离圆心</b>（离心运动）。</span></div>
<div class="step-item" v-click="3"><span class="text-accent">③</span><span><mdi-arrow-collapse class="text-xl mr-2" />偏大：力"拉过头"，<b>逐渐靠近圆心</b>。</span></div>
<div class="key" v-click="3">做圆周运动还是逐渐远离、靠近圆心，取决于<b>实际受力</b>与<b>所需向心力</b>的大小关系。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 改变实际受力的大小，看轨迹怎么变

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 0.8fr) minmax(0, 1fr)">
<div class="figure"><CentrifugalDemo /></div>
<div class="stack">
<div class="mini-note">同一起点、同一初速度（都沿切线方向），只改变指向圆心的实际受力。</div>
<div class="ask">实际受力与所需向心力 <Latex tex="m\frac{v^2}{r}" /> 相比，谁大谁小？轨迹随之向哪边偏？</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 离心运动的应用

<div class="page-grow">
<div class="centri-apps">
<div class="centri-app" v-click="1"><mdi-washing-machine class="icon-md" /><span><span class="centri-app-title">洗衣机脱水</span>　<span class="centri-app-desc">把附着在湿衣服上的水甩出去</span></span></div>
<div class="centri-app" v-click="2"><mdi-weather-windy class="icon-md" /><span><span class="centri-app-title">干燥棉纱毛线</span>　<span class="centri-app-desc">纺织厂用同样的办法脱水</span></span></div>
<div class="centri-app" v-click="2"><mdi-pipe class="icon-md" /><span><span class="centri-app-title">离心制管</span>　<span class="centri-app-desc">钢水在离心作用下贴向周壁、冷却成管（水泥管同此原理）</span></span></div>
<div class="centri-app" v-click="2"><mdi-blood-bag class="icon-md" /><span><span class="centri-app-title">分离血液</span>　<span class="centri-app-desc">离心机把血浆与红细胞分开</span></span></div>
</div>
<div class="key" v-click="2">这些应用的共同点：让物体做圆周运动，再<b>撤掉</b>或<b>减弱</b>指向圆心的力，物体就沿切线飞出或逐渐远离圆心。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 离心运动的危害

<div class="page-grow">
<div class="centri-apps centri-apps-single">
<div class="centri-app" v-click="1"><mdi-car class="icon-md" /><span><span class="centri-app-title">汽车转弯超速</span>　<span class="centri-app-desc">转弯所需的向心力 <Latex tex="F = m\frac{v^2}{r}" /> 一旦大于最大静摩擦力 <Latex tex="F_{\max}" />，汽车就会做离心运动而侧滑</span></span></div>
<div class="centri-app" v-click="1"><mdi-cog class="icon-md" /><span><span class="centri-app-title">砂轮、飞轮超转速</span>　<span class="centri-app-desc">转速过高时，内部分子间的相互作用力不足以提供所需向心力，会破裂</span></span></div>
</div>
<div class="key key-danger" v-click="2">所以公路弯道都规定车辆不得超过某个速度；高速转动的砂轮、飞轮也不得超过允许的最大转速。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="step-item" v-click="1"><span class="text-accent">①</span><span><mdi-train class="text-xl mr-2" /><b>火车转弯</b>：外轨垫高，让 <Latex tex="G" /> 与 <Latex tex="F_N" /> 的合力提供向心力，<Latex tex="v = \sqrt{gr\tan\theta}" /></span></div>
<div class="step-item" v-click="2"><span class="text-accent">②</span><span><mdi-bridge class="text-xl mr-2" /><b>汽车过桥</b>：拱形桥顶 <Latex tex="F_N < G" />；凹形路面最低点 <Latex tex="F_N > G" /></span></div>
<div class="step-item" v-click="3"><span class="text-accent">③</span><span><mdi-rocket-launch-outline class="text-xl mr-2" /><b>航天器失重</b>：<Latex tex="v = \sqrt{gR}" /> 时 <Latex tex="F_N = 0" />，完全失重</span></div>
<div class="step-item" v-click="4"><span class="text-accent">④</span><span><mdi-arrow-expand class="text-xl mr-2" /><b>离心运动</b>：向心力突然消失就沿切线飞出；<Latex tex="F_{\text{实}} < m\frac{v^2}{r}" /> 时逐渐远离圆心，反之逐渐靠近圆心</span></div>
<div class="key" v-click="4">贯穿全课的一条线：向心力不是新的力，而是物体<b>实际受力</b>在指向圆心方向上的效果。</div>
</div>
</div>
