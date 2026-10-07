---
theme: default
title: "矢量与向量"
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

<div class="cover-chapter">数学扩展 · 第一章 运动的描述</div>

<h1 class="cover-title">矢量与向量</h1>

<div class="cover-subtitle">
  <span>原创：东北育才学校 张伯望</span>
</div>

<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <CoverDecorationSvg />
</div>

---
layout: base-flex
---

# 从位移说起

<div class="page-grow">
<div class="tag-icon"><mdi-history /> 回顾 · 必修一 §1.2 位移</div>

<div class="ask">从北京到重庆：火车、飞机、轮船，路程一样吗？"位置的变化"一样吗？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2"><b class="text-accent-2">路程不同</b>：路线不同，轨迹的<b class="text-accent-2">长度</b>就不同</div>

<div v-click="3"><b class="text-accent">位置的变化相同</b>：都从北京到了重庆，只跟起点、终点有关</div>

<div v-click="4" class="key">位移 = 由初位置指向末位置的<b class="text-accent">有向线段</b>，用 <Latex tex="x" /> 表示</div>
</div>
<div v-click="1" class="divider-l">
<PathVsDisplacementSvg />
</div>
</div>
</div>

---
layout: base-flex
---

# 一个有方向的量

<div class="page-grow">
<div class="ask">讲台上的直尺：横着放、斜着放，长度一样吗？这是"同一个量"吗？</div>

<div class="half-grid">
<div v-click="1" class="stack">
<div class="mini-title"><mdi-ruler /> 尺子：长度一样，指向不同</div>
<RulerDirectionSvg />
<div class="mini-note">只说"5 cm"，说不出它<b class="text-accent-2">指向哪儿</b></div>
</div>
<div v-click="2" class="divider-l stack">
<div class="mini-title"><mdi-sword /> 宝剑：只能握剑柄</div>
<SwordGripSvg />
<div class="sword-warn"><mdi-skull-outline /> 不能握着剑尖反过来用</div>
</div>
</div>

<div v-click="3" class="key">位移描述的不是"位置"，而是<b class="text-accent">位置的变化量</b>；起点与终点一旦对调，就是另一个位移</div>
</div>

---
layout: base-flex
clicks: 3
---

# 平行且等长的位移，是同一个位移

<div class="page-grow">
<div class="ask">从 A 到 B、从 C 到 D 的两条位移平行且等长 —— 是同一个位移吗？</div>

<VectorPlayground />
</div>

---
layout: base-flex
clicks: 6
---

# 物理的矢量、标量，数学的向量、数

<div class="page-grow">
<div class="ask">物理的"矢量、标量"，和数学的"向量、数"，是同一批东西吗？</div>

<div class="cmp-stack">
<div v-click="1" class="cmp">
<div class="cmp-head"></div>
<div class="cmp-head">物理世界</div>
<div class="cmp-head">数学世界</div>
</div>

<div v-click="2" class="cmp">
<div class="cmp-row">有方向</div>
<div class="cmp-cell"><b class="text-accent">矢量</b>：位移、力、速度</div>
<div class="cmp-cell"><b class="text-accent-2">向量</b> <Latex tex="\vec{a},\ \vec{b}" />：抽象的有向线段</div>
</div>

<div v-click="3" class="cmp">
<div class="cmp-row">没有方向</div>
<div class="cmp-cell"><b class="text-accent">标量</b>：路程、温度、质量</div>
<div class="cmp-cell"><b class="text-accent-2">数</b> <Latex tex="3,\ -2" />：抽象的数值</div>
</div>

<div v-click="4" class="cmp">
<div class="cmp-row">单位</div>
<div class="cmp-cell">有实际意义，<b>必须带单位</b>（m、N）</div>
<div class="cmp-cell">纯粹的数学对象，<b>没有单位</b></div>
</div>

<div v-click="5" class="cmp">
<div class="cmp-row">运算</div>
<div class="cmp-cell">矢量有自己特殊的运算法则</div>
<div class="cmp-cell">向量有自己特殊的运算法则</div>
</div>
</div>

<div v-click="6" class="key">矢量和标量是<b class="text-accent">有实际意义的物理量</b>；向量和数是<b class="text-accent-2">抽象的数学对象</b> —— 但加减规律完全一致</div>
</div>

---
layout: base-flex
clicks: 3
---

# 让所有矢量"站到同一起跑线"

<div class="page-grow">
<div class="ask">地面上的位移千千万、起点各不同 —— 怎么统一处理？</div>

<div class="half-grid">
<div v-click="1">
<ScatteredVectorsSvg />
</div>
<div v-click="2" class="divider-l">
<VectorsAtOriginSvg />
</div>
</div>

<div v-click="3" class="stack">
<div>建<b class="text-accent-2">平面直角坐标系</b>：每个点 <Latex tex="P(x,\ y)" /> 唯一对应一条向量 <Latex tex="\overrightarrow{OP}" /></div>

<div>于是"研究矢量"变成了"研究点的坐标"</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 位移怎么相加？

<div class="page-grow">
<div class="ask">先向东走 3 m，再向北走 4 m，合位移是多大？方向呢？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2"><b class="text-accent">规矩</b>：把后一个位移的起点，移到前一个位移的终点（首尾相接）</div>

<div v-click="3"><b class="text-accent">结果</b>：从第一个位移的起点，指向最后一个位移的终点（<b class="text-accent-2">三角形法则</b>）</div>

<div v-click="4" class="key"><Latex tex="|x| = \sqrt{3^2 + 4^2} = 5\ \text{m}" />，方向与正东方向成 <Latex tex="53.1^\circ" />（偏北）</div>
</div>
<div v-click="1" class="divider-l">
<DisplacementTriangleSvg />
</div>
</div>
</div>

---
layout: base-flex
clicks: 4
---

# 坐标系里做加法：平行四边形法则

<div class="page-grow">
<div class="ask">已知 <Latex tex="A(x_1,\ y_1)" />、<Latex tex="B(x_2,\ y_2)" />，<Latex tex="\vec{a} + \vec{b}" /> 是多少？</div>

<ParallelogramAddition />
</div>

---
layout: base-flex
clicks: 5
---

# 减法：先找"相反的矢量"

<div class="page-grow">
<div class="ask"><Latex tex="\vec{a} - \vec{b}" /> 怎么算？能不能也变成加法？</div>

<div class="half-grid">
<div v-click="1">
<VectorSubtraction />
</div>
<div class="divider-l stack">
<div v-click="2"><b class="text-accent">负矢量</b> <Latex tex="-\vec{b}" />：大小不变、方向相反，即 <Latex tex="(-x_2,\ -y_2)" /></div>

<div v-click="3">于是 <Latex tex="\vec{a} - \vec{b} = \vec{a} + (-\vec{b})" />，坐标按分量相减：<Latex tex="(x_1 - x_2,\ y_1 - y_2)" /></div>

<div v-click="4">几何意义：<Latex tex="\vec{a} - \vec{b} = \overrightarrow{BA}" /></div>

<div v-click="5">注意 <Latex tex="\vec{a} - \vec{b} \ne \vec{b} - \vec{a}" />，两者互为相反矢量</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
---

# 运算律：和数一样好用吗？

<div class="page-grow">
<div class="ask">矢量的加减，能像数一样<b>交换</b>、<b>结合</b>吗？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2"><b class="text-accent"><mdi-swap-horizontal class="inline-block align-middle mr-1" />交换律</b>：<Latex tex="\vec{a} + \vec{b} = \vec{b} + \vec{a}" /></div>

<div v-click="3" class="mini-note">两种画法补出同一个平行四边形、同一条对角线</div>

<div v-click="4"><b class="text-accent"><mdi-set-merge class="inline-block align-middle mr-1" />结合律</b>：<Latex tex="(\vec{a} + \vec{b}) + \vec{c} = \vec{a} + (\vec{b} + \vec{c})" /></div>

<div v-click="5" class="mini-note">三个矢量首尾相接，先拼哪两个都一样</div>

<div v-click="5" class="key">所以矢量加减可以像数一样<b class="text-accent-2">自由地交换、结合</b></div>
</div>
<div v-click="1" class="divider-l stack">
<ParallelogramSumSvg />
<div class="mini-note" style="text-align: center">a + b 与 b + a 是同一条对角线</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
---

# 把矢量写成 (4, 3)，默认了什么？

<div class="page-grow">
<div class="ask">写 <Latex tex="\vec{a} = (4,\ 3)" /> 的时候，隐藏了哪些前提？</div>

<div v-click="1">默认 x 轴、y 轴各有单位长度：单位向量 <Latex tex="\vec{i} = (1,\ 0)" />、<Latex tex="\vec{j} = (0,\ 1)" /></div>

<div v-click="2">4 表示沿 x 轴 <b class="text-accent-2">4 个 <Latex tex="\vec{i}" /> 首尾相接</b>；3 表示沿 y 轴 <b class="text-accent-2">3 个 <Latex tex="\vec{j}" /> 首尾相接</b></div>

<div v-click="3">两组"单位向量之和"再相加，就拼回原来那条矢量，而且<b class="text-accent">只有一种拼法</b></div>

<div v-click="4" class="key"><Latex tex="\vec{a} = (4,\ 3) = 4\vec{i} + 3\vec{j}" />：用"点对"代替箭头，靠的就是<b class="text-accent">先沿轴分解、再唯一地拼回去</b></div>

<div v-click="5" class="mini-note">这就是用坐标表示矢量的<b class="text-accent-2">科学简化</b>：把二维的箭头问题，化成两条一维直线上的问题</div>
</div>

---
layout: base-flex
---

# 正交分解：沿两条轴分别算

<div class="page-grow">
<div class="ask">坐标能直接相加减，凭什么？</div>

<OrthogonalDecomposition />
</div>

---
layout: base-flex
clicks: 2
---

# 矢量的加法：三个法则

<div class="page-grow">
<div class="ask">矢量的加法有哪些"法则"？</div>

<div v-click="1" class="three-col">
<div class="law">
<ParallelogramLawSvg />
<div class="law-title">平行四边形法则</div>
<div class="law-note">同起点出发，补出平行四边形，对角线就是和</div>
</div>
<div class="law">
<TriangleLawSvg />
<div class="law-title">三角形法则</div>
<div class="law-note">首尾相接，从第一个的起点指向最后一个的终点</div>
</div>
<div class="law">
<PolygonLawSvg />
<div class="law-title">多边形法则</div>
<div class="law-note">多个矢量依次首尾相接，起点直连最后一个终点</div>
</div>
</div>

<div v-click="2" class="key">三个法则说的是同一件事：<b class="text-accent">首尾相接，首指向尾</b></div>
</div>

---
layout: base-flex
---

# 什么时候"加起来等于 0"？

<div class="page-grow">
<div class="mini-title"><mdi-vector-polyline /> 首尾相接的"链"</div>

<ClosedPolygonSum />
</div>

---
layout: base-flex
---

# 例题：正六边形的合位移

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="problem">
正六边形 <Latex tex="OABCDE" />（顶点依次为 <Latex tex="O,\ A,\ B,\ C,\ D,\ E" />，顺时针），边长 <Latex tex="1\ \text{m}" />。求合位移
<Latex tex="\overrightarrow{OA} + \overrightarrow{OB} + \overrightarrow{OC} + \overrightarrow{OD} + \overrightarrow{OE}" /> 的大小和方向。
</div>

<div class="ask">五个矢量加起来，等于多少？</div>
</div>
<div class="divider-l" style="display: flex; justify-content: center">
<HexagonVectorsSvg />
</div>
</div>
</div>

---
layout: base-flex
clicks: 5
---

# 例题解法一：把矢量"搬"到一起

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div v-click="2"><Latex tex="\overrightarrow{OB} = \overrightarrow{EC}" />：把 <Latex tex="\overrightarrow{OB}" /> 平移到 <Latex tex="E" /> 点起，终点落在 <Latex tex="C" />，于是 <Latex tex="\overrightarrow{OE} + \overrightarrow{OB} = \overrightarrow{OC}" /></div>

<div v-click="3"><Latex tex="\overrightarrow{OD} = \overrightarrow{AC}" />：把 <Latex tex="\overrightarrow{OD}" /> 平移到 <Latex tex="A" /> 点起，终点也落在 <Latex tex="C" />，于是 <Latex tex="\overrightarrow{OA} + \overrightarrow{OD} = \overrightarrow{OC}" /></div>

<div v-click="4">剩下一个 <Latex tex="\overrightarrow{OC}" /> 没人配 —— 总和 = 三个 <Latex tex="\overrightarrow{OC}" /></div>

<div v-click="5" class="key"><Latex tex="\vec{s} = 3\,\overrightarrow{OC}" />，<Latex tex="|\overrightarrow{OC}| = 2\ \text{m}" /> → 合位移 <b class="text-accent">6 m</b>，方向沿 <Latex tex="\overrightarrow{OC}" /></div>
</div>
<div v-click="1" class="divider-l" style="display: flex; justify-content: center">
<HexagonMoveVectorsSvg />
</div>
</div>
</div>

---
layout: base-flex
---

# 例题解法二：正交分解，一列一列加

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div>以 <Latex tex="O" /> 为原点、<Latex tex="\overrightarrow{OC}" /> 方向为 <Latex tex="x" /> 轴正方向建系（外接圆半径 <Latex tex="1\ \text{m}" />）：</div>

<table class="coord-table">
<thead>
<tr><th>矢量</th><th><Latex tex="x" /> 分量 / m</th><th><Latex tex="y" /> 分量 / m</th></tr>
</thead>
<tbody>
<tr><td><Latex tex="\overrightarrow{OA}" /></td><td>0.5</td><td><Latex tex="+\frac{\sqrt3}{2}" /></td></tr>
<tr><td><Latex tex="\overrightarrow{OB}" /></td><td>1.5</td><td><Latex tex="+\frac{\sqrt3}{2}" /></td></tr>
<tr><td><Latex tex="\overrightarrow{OC}" /></td><td>2</td><td>0</td></tr>
<tr><td><Latex tex="\overrightarrow{OD}" /></td><td>1.5</td><td><Latex tex="-\frac{\sqrt3}{2}" /></td></tr>
<tr><td><Latex tex="\overrightarrow{OE}" /></td><td>0.5</td><td><Latex tex="-\frac{\sqrt3}{2}" /></td></tr>
<tr class="sum-row"><td>合矢量</td><td>6</td><td>0</td></tr>
</tbody>
</table>
</div>
<div class="divider-l stack">
<div><b class="text-accent-2">一列一列加</b>：x 分量 <Latex tex="0.5 + 1.5 + 2 + 1.5 + 0.5 = 6" /></div>

<div>y 分量<b class="text-accent">两两抵消</b>：<Latex tex="\frac{\sqrt3}{2}" /> 与 <Latex tex="-\frac{\sqrt3}{2}" /> 各出现两次，和为 0</div>

<div class="key">合矢量 <Latex tex="\vec{s} = (6,\ 0)" /> → 大小 <b class="text-accent">6 m</b>，方向沿 <Latex tex="\overrightarrow{OC}" /></div>

<div class="mini-note">两种解法结果相同：几何拼合看方向，正交分解算数值</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结：四类对象与坐标

<div class="page-grow">
<div class="stack stack-dense">
<div class="mini-title"><mdi-compare /> 矢量、标量、向量、数，不是一回事</div>
<table class="coord-table coord-table-dense">
<thead>
<tr><th>对象</th><th>方向</th><th>单位</th><th>例子</th><th>怎么算</th></tr>
</thead>
<tbody>
<tr><td>矢量（物理）</td><td>有</td><td>有（m、N）</td><td>位移、力、速度</td><td>首尾相接；<b class="text-accent">不能只按大小算</b></td></tr>
<tr><td>标量（物理）</td><td>无</td><td>有（m、℃）</td><td>路程、温度、质量</td><td>就是数，照常加减乘除</td></tr>
<tr><td>向量（数学）</td><td>有</td><td>无</td><td><Latex tex="\vec{a},\ \vec{b}" />：抽象的有向线段</td><td>与矢量<b class="text-accent-2">同一套加减规则</b></td></tr>
<tr><td>数（数学）</td><td>无</td><td>无</td><td><Latex tex="3,\ -2" /></td><td>照常加减乘除</td></tr>
</tbody>
</table>
</div>

<div class="stack stack-dense">
<div class="mini-title"><mdi-vector-point /> 凭什么能用坐标表示向量</div>
<div>定两个<b class="text-accent-2">单位向量</b> <Latex tex="\vec{i} = (1,\ 0)" />、<Latex tex="\vec{j} = (0,\ 1)" />：各代表"沿坐标轴 1 个单位长度"</div>
<div>任何向量都能<b class="text-accent">唯一</b>写成 <Latex tex="\vec{a} = x\vec{i} + y\vec{j}" />，于是记作 <Latex tex="\vec{a} = (x,\ y)" /></div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结：运算规则

<div class="page-grow">
<div class="stack stack-dense">
<div class="mini-title"><mdi-vector-combine /> 加减法：几何一套、坐标一套</div>
<div><b class="text-accent">几何</b>：首尾相接，从第一个的起点指向最后一个的终点（三角形、平行四边形、多边形是同一件事）</div>
<div><b class="text-accent">坐标</b>：<Latex tex="\vec{a} \pm \vec{b} = (x_1 \pm x_2,\ y_1 \pm y_2)" />，即<b class="text-accent-2">对应分量相加减</b>；减法 <Latex tex="\vec{a} - \vec{b} = \vec{a} + (-\vec{b})" /></div>
<div><Latex tex="\vec{a} - \vec{b}" /> 几何上从 <Latex tex="\vec{b}" /> 的终点指向 <Latex tex="\vec{a}" /> 的终点；交换律、结合律都成立</div>
</div>

<div class="stack stack-dense">
<div class="mini-title"><mdi-axis-arrow /> 正交分解：拆开算，再拼回</div>
<div><Latex tex="\vec{a} = x\vec{i} + y\vec{j}" />，两个分量<b class="text-accent-2">互相垂直</b>；多个矢量相加时 x 归 x 一列、y 归 y 一列</div>
<div class="key">合矢量 <Latex tex="(\sum x,\ \sum y)" />：模长 <Latex tex="|\vec{a}| = \sqrt{x^2 + y^2}" />，方向由两个分量确定</div>
</div>
</div>

---
layout: base-flex
---

# 想一想

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title"><mdi-lightbulb-on-outline /> 课后三问</div>
<div class="ask">1. 三个矢量首尾相接恰好闭合，它们的和是多少？一定要两两成 <Latex tex="120^\circ" /> 吗？</div>
<div class="ask">2. <Latex tex="\vec{a} + \vec{b} = \vec{0}" /> 说明了什么？</div>
<div class="ask">3. 矢量 <Latex tex="(-3,\ 4)" /> 的模长是多少？方向怎么描述？</div>
</div>
<div class="divider-l stack">
<div class="mini-title"><mdi-sigma /> 带走一句话</div>
<div class="takeaway">数学上的向量，是物理上矢量的"通用语言"：把方向交给坐标，把计算交给最熟悉的加减法</div>
</div>
</div>
</div>