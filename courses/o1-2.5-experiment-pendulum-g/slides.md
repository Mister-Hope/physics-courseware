---
theme: default
title: "实验：用单摆测量重力加速度"
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
chapter-no: "2.5"
chapter: "第二章 机械振动"
subtitle: 摆一摆，把当地的重力加速度量出来
---

<CoverDecorationSvg />

---
title: 用一把尺和一块停表，能量出 g 吗
clicks: 2
---

<div class="page-grow">
<div class="ask-lead">用一把米尺和一块停表，能测出当地的重力加速度吗？</div>
<div class="eq-line" v-click="1"><Latex tex="T = 2\pi\sqrt{\dfrac{l}{g}}" /></div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>摆长 <Latex tex="l" /> 用米尺量，周期 <Latex tex="T" /> 用停表测——两个量都能直接测出来。</div></div>
<div class="eq-line" v-click="2"><Latex tex="g = \dfrac{4\pi^2 l}{T^2}" /></div>
<div class="tip-hint" v-click="2">惠更斯就是用一只单摆，量出了巴黎的重力加速度。</div>
</div>

---
title: 这个公式在什么条件下才成立
clicks: 2
---

<div class="page-grow">
<div class="ask">摆角大一点，测出的周期会不一样吗？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><strong>单摆做简谐运动，前提是摆角很小</strong>：一般要求 <Latex tex="\theta < 5^\circ" />，此时 <Latex tex="\sin\theta \approx \theta" />，回复力才与位移成正比。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>摆角大了，周期会变长、不再严格满足 <Latex tex="T = 2\pi\sqrt{l/g}" />，算出的 <Latex tex="g" /> 会<strong>偏小</strong>。</div></div>
<div class="tip-hint" v-click="2">所以只要"拉开一点、轻轻放手"，不要甩起来做圆锥摆。</div>
</div>

---
title: 实验装置
clicks: 3
---

<div class="page-grow">
<div class="ask">铁夹为什么要伸到桌面以外？</div>
<div class="figure fig-sm"><PendulumSetup :step="$clicks" /></div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>铁夹伸出桌外：换摆长时，摆线不会蹭到桌面，摆球也不会碰到桌子。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>细线穿过摆球的小孔、上端打一个比孔大的结；悬点夹紧后就不再动。</div></div>
</div>

---
title: 摆线和摆球怎么选
clicks: 3
---

<div class="page-grow">
<div class="ask">摆线和摆球，该怎么挑？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><strong>线</strong>：细、伸缩性小、适当长一些（约 <Latex tex="1\ \text{m}" />）。线要轻，长度不能变——橡皮筋会伸长、粗棉线会打卷，都不行。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div><strong>球</strong>：质量大、体积小。空气阻力影响小，球心的位置也容易确定——乒乓球太轻，不行。</div></div>
<div class="tip-hint" v-click="3">两条要求其实是一件事：让摆长稳定、让阻力可忽略，周期才只由 <Latex tex="l" /> 和 <Latex tex="g" /> 决定。</div>
</div>

---
title: 细线上端怎么固定
clicks: 1
---

<div class="page-grow">
<div class="ask">细线的上端，怎样固定更合适？</div>
<div class="half-grid">
<div class="card">
<div class="mini-title">绕在横杆上</div>
<div class="bad-line">摆动时线会在杆上滑动、缠绕</div>
<div class="bad-line">摆长一直在变，测出的周期不可靠</div>
</div>
<div class="card">
<div class="mini-title">用夹子夹住</div>
<div class="ok-line">悬点固定，摆长保持不变</div>
<div class="ok-line">松开夹子就能换摆长，方便重复测量</div>
</div>
</div>
<div class="tip-hint" v-click="1">悬点固定，是"同一个摆"能被反复测量的前提。</div>
</div>

---
title: 摆长的量法
clicks: 2
---

<div class="page-grow">
<div class="ask">摆长是从哪儿量到哪儿？</div>
<div class="figure fig-sm"><PendulumLengthSvg /></div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>摆长 = 悬点到<strong>球心</strong>的距离 = 线长 + 半径，不是只量线长。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>也可以先用游标卡尺量直径 <Latex tex="d" />，再量悬点到球顶的距离，加上 <Latex tex="d/2" />。</div></div>
</div>

---
title: 周期的测法
clicks: 2
---

<div class="page-grow">
<div class="ask">测一次全振动，还是测几十次？</div>
<table class="data-table">
<thead>
<tr><th>测法</th><th>计时误差</th><th>停表读数</th><th>算出的周期</th><th>相对误差</th></tr>
</thead>
<tbody>
<tr><td>测 1 次全振动</td><td><Latex tex="0.1\sim0.2\ \text{s}" /></td><td><Latex tex="1.6\ \text{s}" /></td><td><Latex tex="1.6\ \text{s}" /></td><td><Latex tex="10\%" /></td></tr>
<tr><td>测 30 次全振动</td><td><Latex tex="0.1\sim0.2\ \text{s}" /></td><td><Latex tex="48\ \text{s}" /></td><td><Latex tex="1.6\ \text{s}" /></td><td><Latex tex="0.3\%" /></td></tr>
</tbody>
</table>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><strong>累积法</strong>：测 <Latex tex="n = 30\sim50" /> 次全振动的总时间 <Latex tex="t" />，再用 <Latex tex="T = t/n" /> 求周期。</div></div>
<div class="tip-hint" v-click="2">同样的反应误差，被分到 <Latex tex="n" /> 个周期上，就摊薄到了 <Latex tex="1/n" />。</div>
</div>

---
title: 从哪儿开始计时
clicks: 3
---

<div class="page-grow">
<div class="ask">一次全振动，是从哪儿算到哪儿？</div>
<div class="split-wide">
<div class="figure"><FullOscillationSvg /></div>
<div class="stack">
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>从 <Latex tex="O" /> 向右到 <Latex tex="B" />，再回到 <Latex tex="O" />——半个振动。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div>再向左到 <Latex tex="A" />，又回到 <Latex tex="O" />——又半个，方向与出发时相同。</div></div>
<div class="tip-hint" v-click="3">两段合起来才是<strong>一次全振动</strong>；计时就选摆球经过平衡位置的那一刻。</div>
</div>
</div>
</div>

---
title: 数据表怎么设计
clicks: 4
---

<div class="page-grow">
<div class="ask">一张表，要装下哪些量？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>先写<strong>直接测量</strong>的量：摆长 <Latex tex="l" />、全振动次数 <Latex tex="n" />、总时间 <Latex tex="t" />。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>再写<strong>算出来</strong>的量：周期 <Latex tex="T = t/n" />、周期的平方 <Latex tex="T^2" />。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>最后留一列 <Latex tex="g = 4\pi^2 l/T^2" />，每一组都能单独算出一个值。</div></div>
</div>
<div class="tip-hint" v-click="4"><Latex tex="l" /> 要量到球心；<Latex tex="t" /> 是 <Latex tex="n" /> 次全振动的总时间，不是一次。</div>
</div>

---
title: 某次实验的数据
clicks: 3
---

<div class="page-grow page-grow-tight">
<div class="ask">这些数据能直接看出 <Latex tex="g" /> 吗？</div>
<PendulumDataTable :step="$clicks" />
<div class="table-note">表中是某次实验数据：<Latex tex="n = 30" />，摆长量到球心。</div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>五个 <Latex tex="g" /> 值落在 <Latex tex="9.76\sim9.83" /> 之间，平均值 <Latex tex="9.79\ \text{m/s}^2" />。</div></div>
</div>

---
title: 为什么把 T² 和 l 画在一起
clicks: 3
---

<div class="page-grow">
<div class="ask">为什么要把 <Latex tex="T^2" /> 和 <Latex tex="l" /> 画成图？</div>
<div class="eq-line"><Latex tex="T = 2\pi\sqrt{\dfrac{l}{g}} \;\Longrightarrow\; T^2 = \dfrac{4\pi^2}{g}\,l" /></div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>右边是 <Latex tex="l" /> 的一次式：<Latex tex="T^2" />—<Latex tex="l" /> 图线是一条<strong>过原点的直线</strong>。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>直线的斜率 <Latex tex="k = 4\pi^2/g" />，量出斜率就能算出 <Latex tex="g" />。</div></div>
<div class="tip-hint" v-click="3">这就是“化曲为直”：把不好判断的曲线，换成一条斜率有物理意义的直线。</div>
</div>

---
title: 从直线的斜率读出 g
clicks: 2
---

<div class="page-grow page-grow-tight">
<div class="ask">这条直线的斜率，能告诉我们什么？</div>
<div class="figure" style="width: 62%; margin-inline: auto">
<CoordAxes
  :x-range="[0, 1.35]"
  :y-range="[0, 5.5]"
  :x-axis="{ quantity: 'l', unit: 'm' }"
  :y-axis="{ quantity: 'T', unit: 's', sup: '2' }"
  :ticks="{ x: [0.3, 0.6, 0.9, 1.2], y: [1, 2, 3, 4, 5] }"
  :view="{ width: 620, height: 330 }"
  :curves="[{ points: [{ x: 0, y: 0 }, { x: 1.25, y: 5.04 }], color: 'var(--c-accent)', width: 3 }]"
  :labels="[
    { x: 0.6, y: 2.425, dot: 5 },
    { x: 0.75, y: 3.014, dot: 5 },
    { x: 0.9, y: 3.641, dot: 5 },
    { x: 1.05, y: 4.219, dot: 5 },
    { x: 1.2, y: 4.844, dot: 5 },
    { x: 0.98, y: 4.55, tex: 'k = \\dfrac{4\\pi^2}{g}', anchor: 'top-left', size: 18, halo: true, showAt: 1 }
  ]"
  :step="$clicks"
/>
</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>在直线上取两点算斜率：<Latex tex="k \approx 4.03\ \text{s}^2/\text{m}" />。</div></div>
<div class="tip-hint" v-click="2"><Latex tex="g = 4\pi^2/k = 4\pi^2/4.03 \approx 9.80\ \text{m/s}^2" />，与本地值只差约 <Latex tex="0.1\%" />。</div>
</div>

---
title: 平均法还是图象法
clicks: 1
---

<div class="page-grow">
<div class="ask">算五次平均，还是画一条直线？</div>
<table class="data-table">
<thead>
<tr><th>做法</th><th>优点</th><th>不足</th></tr>
</thead>
<tbody>
<tr><td>逐组算 <Latex tex="g" /> 再平均</td><td>直接，每组都能算出一个值</td><td>误差全混进来，看不出整体趋势</td></tr>
<tr><td>作 <Latex tex="T^2" />—<Latex tex="l" /> 图求斜率</td><td>一条直线用上全部数据，个别偏差点被摊平</td><td>要作图，多了作图与读数误差</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="1">两种方法都做一遍、结果互相印证，比只做一种更可靠。</div>
</div>

---
title: 误差从哪里来
clicks: 4
---

<div class="page-grow">
<div class="ask">测出来的 <Latex tex="g" /> 总是偏小，问题可能出在哪？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><strong>摆长量短了</strong>：只量到球的顶端，<Latex tex="l" /> 偏小 ⇒ <Latex tex="g" /> 偏小。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div><strong>周期测长了</strong>：数错次数、或按表偏慢 ⇒ <Latex tex="T" /> 偏大 ⇒ <Latex tex="g" /> 偏小。</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot is-blue"></span><div><strong>摆角太大</strong>：<Latex tex="T" /> 比小角时略大 ⇒ <Latex tex="g" /> 也偏小。</div></div>
<div class="tip-hint" v-click="4">前两条每次都朝同一方向偏，是<strong>系统误差</strong>；摆角、读数则兼有操作与<strong>偶然误差</strong>。</div>
</div>

---
title: 做这个实验，注意什么
clicks: 4
---

<div class="page-grow">
<div class="ask">动手之前，哪几件事必须先定下来？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div>摆角小于 <Latex tex="5^\circ" />：偏角小，<Latex tex="\sin\theta \approx \theta" /> 才成立。</div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div>让摆球在同一竖直平面内摆动，不要转圈、不要打旋。</div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div>每换一次摆长，都重新量 <Latex tex="l" />、重新计 <Latex tex="n" /> 次全振动。</div></div>
<div class="step-item" v-click="4"><span class="step-no">4</span><div>计时起、止都取摆球经过平衡位置的时刻。</div></div>
</div>
</div>

---
title: 算一算：g 是多少
clicks: 3
---

<div class="page-grow">
<div class="ask">摆长 <Latex tex="l = 1.000\ \text{m}" />，50 次全振动用 <Latex tex="100.5\ \text{s}" />，<Latex tex="g" /> 是多少？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><Latex tex="T = \dfrac{t}{n} = \dfrac{100.5}{50} = 2.010\ \text{s}" /></div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div><Latex tex="g = \dfrac{4\pi^2 l}{T^2} = \dfrac{4\pi^2 \times 1.000}{2.010^2} \approx 9.77\ \text{m/s}^2" /></div></div>
<div class="tip-hint" v-click="3">与当地 <Latex tex="9.80\ \text{m/s}^2" /> 相比偏小约 <Latex tex="0.3\%" />，在实验误差允许的范围内。</div>
</div>

---
title: 判断：这些做法对不对
clicks: 2
---

<div class="page-grow">
<div class="ask">下面五种说法，哪些正确？</div>
<div class="flow-line"><div>A. 摆线选细、伸缩性小、适当长的</div><span class="ok" v-click="1">✓</span></div>
<div class="flow-line"><div>B. 摆球选质量大、体积小的</div><span class="ok" v-click="1">✓</span></div>
<div class="flow-line"><div>C. 为了好观察，把摆角拉到 <Latex tex="30^\circ" /></div><span class="bad" v-click="2">✗</span></div>
<div class="flow-line"><div>D. 用刻度尺量出线长，就是摆长</div><span class="bad" v-click="2">✗</span></div>
<div class="flow-line"><div>E. 从平衡位置开始计时，测 50 次总时间 <Latex tex="t" />，用 <Latex tex="T = t/50" /></div><span class="ok" v-click="1">✓</span></div>
<div class="tip-hint" v-click="2">C 错在摆角太大，<Latex tex="\sin\theta \approx \theta" /> 不再成立；D 错在漏了球的半径。</div>
</div>

---
title: 换个量，再找一次关系
clicks: 3
---

<div class="page-grow">
<div class="ask">下面是 <Latex tex="b" /> 随 <Latex tex="a" /> 变化的六组数据，它们是什么关系？</div>
<table class="data-table">
<thead>
<tr><th><Latex tex="a" /></th><th>0.5</th><th>0.8</th><th>0.9</th><th>1.0</th><th>1.2</th><th>1.5</th></tr>
</thead>
<tbody>
<tr><td><Latex tex="b" /></td><td>1.42</td><td>1.79</td><td>1.90</td><td>2.00</td><td>2.20</td><td>2.45</td></tr>
</tbody>
</table>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><Latex tex="a" /> 每增大一点，<Latex tex="b" /> 增加得越来越少——不是正比关系。</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div>换个坐标：以 <Latex tex="\sqrt{a}" /> 为横轴，六个点几乎落在一条过原点的直线上。</div></div>
<div class="tip-hint" v-click="3">直线的斜率约为 <Latex tex="2" />，所以 <Latex tex="b = 2\sqrt{a}" />。</div>
</div>

---
layout: focus-question
title: 思考
---

<div class="stack" style="gap: 2.6rem">
<div class="ask-lead">摆球的质量大一些，测出的 <Latex tex="g" /> 会变吗？</div>
<div class="ask-lead">如果只量到摆球的顶端，算出的 <Latex tex="g" /> 偏大还是偏小？</div>
<div class="ask-lead">和自由落体测 <Latex tex="g" /> 相比，单摆法为什么更容易做准？</div>
</div>
