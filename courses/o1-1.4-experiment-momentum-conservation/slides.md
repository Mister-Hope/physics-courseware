---
theme: default
title: "实验：验证动量守恒定律"
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
chapter-no: "1.4"
chapter: "第一章 动量守恒定律"
subtitle: 两个方案：气垫导轨 · 斜槽末端小球
---

<CoverDecorationSvg />

---
title: 碰撞中的动量守恒条件
---

<div class="page-grow">
<div class="ask-lead">碰撞只持续几毫秒，动量为什么还能守恒？</div>
<div class="half-grid">
<div class="card">
<div class="mini-title">碰撞时间</div>
<div class="eq-line"><Latex tex="\Delta t \approx 10^{-3}\ \text{s}" /></div>
<div class="mini-note">只有几毫秒</div>
</div>
<div class="card">
<div class="mini-title">相互作用力</div>
<div class="eq-line"><Latex tex="F_{\text{内}} \approx 10^{3}\ \text{N}" /></div>
<div class="mini-note">远大于重力、摩擦力</div>
</div>
</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><strong>外力</strong>：重力、摩擦力的冲量只有 <Latex tex="mg\Delta t \approx 5\times 10^{-3}\ \text{N}\cdot\text{s}" /></div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div><strong>内力</strong>：冲量 <Latex tex="F_{\text{内}}\Delta t \approx 1\ \text{N}\cdot\text{s}" />，比外力冲量大两个数量级</div></div>
<div class="tip-hint" v-click="2">碰撞过程中外力的冲量可以忽略，系统的总动量近似守恒。</div>
</div>

---
title: 实验思路：先回答三个问题
clicks: 4
---

<div class="page-grow">
<div class="ask">设计实验之前，先把这三个问题想清楚。</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><div><div class="mini-title">系统包括哪些物体？</div><div>滑块 A、B，或者小球 1、2 —— 只看这两个物体组成的系统。</div></div></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><div><div class="mini-title">怎样让外力近似为 0？</div><div>气垫导轨把摩擦减到极小；斜槽方案里两球都沿水平方向运动。</div></div></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><div><div class="mini-title">需要测量哪些物理量？</div><div>两个质量 <Latex tex="m_1" />、<Latex tex="m_2" />，以及碰撞前后的四个速度。</div></div></div>
<div class="step-item" v-click="4"><span class="step-no">4</span><div><div class="mini-title">数据怎样处理？</div><div>分别算出碰前、碰后的总动量，再比较。</div></div></div>
</div>
</div>

---
title: 方案一：气垫导轨
clicks: 3
---

<div class="page-grow-tight">
<div class="ask">导轨上的碰撞，怎样做到“几乎没有摩擦”？</div>
<div class="figure fig-mid">
<AirTrackSetup :step="$clicks" />
</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>先<strong>调平</strong>：滑块放在导轨上能静止不动</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>光电门测挡光时间，用 <Latex tex="v = \dfrac{d}{\Delta t}" /> 算速度</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>碰前、碰后<strong>各测一次</strong>，两次速度要带方向</div></div>
</div>

---
title: 一个装置，做出三种碰撞
clicks: 3
---

<div class="page-grow-tight">
<div class="ask">同一个气垫导轨上，三种碰撞分别改变了什么？</div>
<div class="figure fig-mid">
<CollisionCases :step="$clicks" />
</div>
<div class="tip-hint" v-click="3">碰后分开、碰后粘连、由静止反向分开 —— 三种情形都满足守恒，结论才可靠。</div>
</div>

---
title: 方案二：斜槽末端的小球碰撞
clicks: 2
---

<div class="page-grow-tight">
<div class="ask">斜槽末端为什么要水平？铅垂线又有什么用？</div>
<div class="figure fig-sm">
<InclineSetup :step="$clicks" />
</div>
<div class="flow-line" v-click="1"><span class="flow-dot is-blue"></span><div><strong>末端水平</strong>：两球碰前、碰后都只做平抛运动</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div><strong>铅垂线</strong>：把槽口投影到地面，作为量水平距离的起点</div></div>
</div>

---
title: 速度测量（一）：光电门
clicks: 3
---

<div class="page-grow">
<div class="ask">挡光片只有 1 cm 宽，测出的速度为什么能代表滑块？</div>
<div class="eq-line"><Latex tex="v = \dfrac{d}{\Delta t}" /></div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><Latex tex="d" /> 是挡光片的宽度，<Latex tex="\Delta t" /> 是计时器记下的遮光时间</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>挡光片很窄、遮光时间极短，这段平均速度就接近瞬时速度</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>例：<Latex tex="d = 1.0\,\text{cm}" />、<Latex tex="\Delta t = 8.3\,\text{ms}" /> → <Latex tex="v \approx 1.2\,\text{m/s}" /></div></div>
</div>

---
title: 速度测量（二）：平抛法
clicks: 3
---

<div class="page-grow">
<div class="ask">小球飞出去以后没有仪器测速，速度怎么得到？</div>
<div class="eq-line"><Latex tex="v = \dfrac{x}{t},\qquad t = \sqrt{\dfrac{2h}{g}} \ \text{相同}" /></div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>同一装置、同一高度：下落时间 <Latex tex="t" /> 相同，速度与水平距离成正比</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>于是只要量距离：<Latex tex="m_1 x_1 = m_1 x_1' + m_2 x_2'" /></div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>不必测出速度的数值，也能检验动量是否守恒</div></div>
</div>

---
title: 速度测量（三）：纸带
clicks: 3
---

<div class="page-grow">
<div class="ask">一条纸带上几十个点，该取哪一段算速度？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>取<strong>点距均匀</strong>的一段：小车在这段时间里做匀速运动</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>碰前、碰后各取一段，用 <Latex tex="v = \dfrac{x}{T}" /> 分别算出两个速度</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>碰撞发生的那一小段点距会突然变化，<strong>不能</strong>用来算速度</div></div>
<div class="tip-hint" v-click="3"><Latex tex="T" /> 是相邻两个计数点之间的时间间隔，通常取 0.1 s。</div>
</div>

---
title: 碰后反弹，速度怎么记？
clicks: 2
---

<div class="page-grow">
<div class="ask">碰后 A 的速度方向反了，式子里的速度该怎么写？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>先规定<strong>正方向</strong>：以碰前 A 的运动方向为正</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>反向的速度写<strong>负值</strong>，代入公式时负号一起参与运算</div></div>
<div class="eq-line" v-click="2"><Latex tex="p' = 0.200 \times (-0.082) + 0.300 \times 0.320 = 0.0796\ \text{kg}\cdot\text{m/s}" /></div>
<div class="bad-line" v-click="2">漏掉负号会算成 0.112，相对误差一下子变成 40%</div>
</div>

---
title: 数据记录表怎么设计
clicks: 4
---

<div class="page-grow">
<div class="ask">表格里至少要放哪几列，才能一次把结论算出来？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>每个物体占一行：质量 <Latex tex="m" />、碰前速度 <Latex tex="v" />、碰后速度 <Latex tex="v'" /></div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>速度要带正负号，方向反了就写负值</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>多留两列 <Latex tex="mv" />、<Latex tex="mv'" />：比较总动量时不用心算</div></div>
<div class="flow-line" v-click="4"><span class="flow-dot is-blue"></span><div>最后一行写合计，碰前、碰后各一个总数</div></div>
</div>

---
title: 某次实验的数据
clicks: 3
---

<div class="page-grow-tight">
<div class="ask">把这些数代进去，碰前、碰后的总动量相等吗？</div>
<MomentumDataTable :step="$clicks" />
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>碰前总动量 <Latex tex="p = 0.0800\ \text{kg}\cdot\text{m/s}" /></div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>碰后总动量 <Latex tex="p' = 0.0796\ \text{kg}\cdot\text{m/s}" /></div></div>
<div class="tip-hint" v-click="3">相对误差 <Latex tex="\dfrac{|p' - p|}{p} = 0.5\%" />，在误差范围内相等。</div>
</div>

---
title: 差 0.0004 算“相等”吗？
clicks: 3
---

<div class="page-grow">
<div class="ask">两次总动量差了 0.0004，这能算“相等”吗？</div>
<div class="eq-line"><Latex tex="\dfrac{|p' - p|}{p} \times 100\% = \dfrac{|0.0796 - 0.0800|}{0.0800} \times 100\% = 0.5\%" /></div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>测量总有误差：仪器精度、计时、落点判断都不可能完美</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>相对误差在 5% 以内，就认为碰前、碰后总动量相等</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>误差明显超标时，先查操作，不能改数据去凑结果</div></div>
</div>

---
title: 误差从哪里来
clicks: 4
---

<div class="page-grow">
<div class="ask">哪些操作会让碰前、碰后的总动量对不上？</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div><strong>导轨没调平</strong>：重力沿导轨的分量一直做冲量，小车自己在加速</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div><strong>挡光片太宽</strong>：测到的是平均速度，不是碰撞前后的瞬时速度</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div><strong>碰撞不是一维的</strong>：滑块有侧向速度，动量还分散在别的方向</div></div>
<div class="flow-line" v-click="4"><span class="flow-dot is-blue"></span><div><strong>气垫不足</strong>：摩擦不能忽略，外力的冲量不再为零</div></div>
</div>

---
title: 偏差的方向能说明什么？
clicks: 2
---

<div class="page-grow">
<div class="ask">两次实验的条件没对齐，结果会偏向哪边？</div>
<div class="half-grid">
<div>
<div class="mini-title">① 第二次释放位置偏低</div>
<div v-click="1"><Latex tex="v_1" /> 比应有的小，碰后两个速度都偏小 ⇒ 碰后总动量<strong>偏小</strong>（<Latex tex="p' < p" />）</div>
</div>
<div class="divider-l">
<div class="mini-title">② 第一次槽末端略微上倾</div>
<div v-click="2">第一次测得的 <Latex tex="v_1" /> 偏小 ⇒ 碰后总动量<strong>偏大</strong>（<Latex tex="p' > p" />）</div>
</div>
</div>
<div class="tip-hint" v-click="2">偏差的方向，就是操作问题的线索。</div>
</div>

---
title: 从纸带读出碰前、碰后的速度
clicks: 3
---

<div class="page-grow-tight">
<div class="ask">这条纸带上，碰前、碰后各该取哪一段？</div>
<div class="figure fig-fit"><TapeStrip :step="$clicks" /></div>
<div class="flow-line" v-click="1"><span class="flow-dot is-blue"></span><div>碰前：<Latex tex="v = 5.00\ \text{cm} / 0.1\ \text{s} = 0.50\ \text{m/s}" />，<Latex tex="p = 0.40 \times 0.50 = 0.200\ \text{kg}\cdot\text{m/s}" /></div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div>碰后：<Latex tex="v' = 3.35\ \text{cm} / 0.1\ \text{s} = 0.335\ \text{m/s}" /></div></div>
<div class="flow-line" v-click="3"><span class="flow-dot is-blue"></span><div><Latex tex="p' = (0.40 + 0.20) \times 0.335 = 0.201\ \text{kg}\cdot\text{m/s}" />，与 <Latex tex="p" /> 相差 0.5%</div></div>
</div>

---
title: 两个方案，各自的取舍
clicks: 1
---

<div class="page-grow">
<div class="ask">同样是验证动量守恒，为什么要准备两套装置？</div>
<table class="data-table">
<thead>
<tr><th>方案</th><th>速度怎么得到</th><th>优点</th><th>局限</th></tr>
</thead>
<tbody>
<tr><td>气垫导轨</td><td>光电门测挡光时间</td><td>摩擦极小，可以反复测</td><td>要调平，导轨占地方</td></tr>
<tr><td>斜槽末端</td><td>平抛的水平距离</td><td>器材简单，一把米尺就够</td><td>落点分散，要多测几次</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="1">两个方案都在做同一件事：让外力可以忽略，把速度变成能测的量。</div>
</div>

---
title: 实验结论
clicks: 3
---

<div class="page-grow">
<div class="ask-lead">在误差范围内，碰前、碰后的总动量相等。</div>
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>碰撞过程中系统的总动量守恒，与两物体质量是否相同无关</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot is-blue"></span><div>实验“验证”的是：在测量精度内，理论经得起检验</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>定律的普适性来自大量实验，不靠某一次实验“证明”</div></div>
</div>

---
layout: focus-question
title: 思考
---

<div class="stack" style="gap: 2.6rem">
<div class="ask-lead">两车碰撞后粘在一起，纸带上的点距会怎么变？</div>
<div class="ask-lead">斜槽方案里，为什么可以不测出速度的数值？</div>
<div class="ask-lead">如果换成温度、压力这些量，这套思路还成立吗？</div>
</div>
