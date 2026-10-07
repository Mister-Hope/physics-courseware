---
theme: default
title: "运动的合成与分解"
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
defaults:
  layout: base-flex
  transition: fade
---

<div class="cover-chapter"><span class="cover-section">§</span> 5.2</div>

<h1 class="cover-title">运动的合成与分解</h1>

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

<div class="page-grow">
<div class="ask">无人机、挖掘机、龙门吊——它们的动作凭什么这么"灵活"？</div>

<div class="grid-3">
<div class="scene">
<mdi-excavator class="scene-icon" />
<div class="scene-title">挖掘机</div>
<div class="scene-desc">电机 → 臂 → 挖斗，每个电机只管一个关节</div>
</div>

<div class="scene">
<mdi-crane class="scene-icon" />
<div class="scene-title">龙门吊</div>
<div class="scene-desc">3 个互相垂直方向的电机 → 3 个方向的运动</div>
</div>

<div class="scene">
<mdi-drone class="scene-icon" />
<div class="scene-title">无人机航拍</div>
<div class="scene-desc">不单独控制 4 个风扇，算法把它抽象成 3 个方向的平动 + 水平旋转</div>
</div>
</div>

<div class="key" v-click="1">复杂运动 = 几个简单运动叠加起来；<b>每个电机只负责一个方向</b>。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 把复杂运动拆成简单运动

<div class="page-grow">
<div class="grid-2">
<div class="stack">
<div class="mini-title">平面运动</div>
<div>拆成 <b>2 个</b>互相垂直的方向</div>
</div>

<div class="stack divider-l">
<div class="mini-title">空间运动</div>
<div>拆成 <b>3 个</b>互相垂直的方向</div>
</div>
</div>

<div>分别求出每个方向上的 <Latex tex="a" />、<Latex tex="v" />、<Latex tex="x" />，这个运动就描述清楚了。</div>

<div class="key" v-click="1">替代法：用几个分运动"替代"原来的运动——分运动 <Latex tex="\rightleftharpoons" /> 合运动（分解 / 合成）。</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">抓娃娃机的爪，落下之前怎么找到娃娃的位置？</div>
<div class="key" v-click="1">机箱里有两个电机：<b>1 号管左右</b>（x 坐标），<b>2 号管前后</b>（y 坐标）——对好位置，爪子才落下去。</div>
</div>

<div class="figure"><ClawMachine :show-motors="$clicks >= 1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 一个电机，一个方向

<div class="page-grow">
<div class="grid-2">
<div class="figure"><ClawMachine :vx="1" :vy="0" /></div>

<div class="figure"><ClawMachine :vx="0" :vy="0.6" /></div>
</div>

<div class="key" v-click="1">只管一个方向的运动，叫作<b>分运动</b>。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 两个电机同时开

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">两个电机同时工作，爪沿什么轨迹运动？</div>
<div class="key" v-click="1">斜线不是第三个电机给的——它是两个分运动共同的效果，叫作<b>合运动</b>。</div>
</div>

<div class="figure"><ClawMachine :vx="1" :vy="0.6" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 建立坐标系，写出轨迹方程

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>俯视图里：以爪的起点为原点 <Latex tex="O" />，<Latex tex="x" /> 轴沿左右方向，<Latex tex="y" /> 轴沿前后方向（图上向上）。</div>
<div><Latex tex="x = v_x t" display /></div>
<div><Latex tex="y = v_y t" display /></div>
<div v-click="1">消去 <Latex tex="t" />：<Latex tex="y = \frac{v_y}{v_x}x" /></div>
<div class="key" v-click="2">轨迹是一条过原点的直线——斜线运动，是两个匀速直线运动"合"出来的。</div>
</div>

<div class="figure"><TrajectoryPlot /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 合速度有多大

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div><Latex tex="v = \sqrt{v_x^2 + v_y^2}" display /></div>
<div><Latex tex="\tan\theta = \frac{v_y}{v_x}" display /></div>
<div v-click="1">速度是矢量：和 3.4 节的力一样，按<b>平行四边形定则</b>合成。</div>
</div>

<div class="figure"><VectorComposeSvg /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 分运动与合运动

<div class="page-grow">
<div class="card">
<p><b>分运动</b>：爪只沿水平方向的运动、只沿竖直方向的运动。</p>
<p><b>合运动</b>：爪在机箱里实际的斜线运动。</p>
</div>

<div>由分运动求合运动 → <b>运动的合成</b>；由合运动求分运动 → <b>运动的分解</b>。</div>

<div class="key" v-click="1">运动的合成与分解，遵从矢量运算法则。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 描述运动的三个量，都按矢量合成

<div class="page-grow">
<div class="grid-3">
<div class="stack">
<div><Latex tex="s = \sqrt{x^2 + y^2}" display /></div>
<div>合位移</div>
</div>

<div class="stack">
<div><Latex tex="v = \sqrt{v_x^2 + v_y^2}" display /></div>
<div>合速度</div>
</div>

<div class="stack">
<div><Latex tex="a = \sqrt{a_x^2 + a_y^2}" display /></div>
<div>合加速度</div>
</div>
</div>

<div class="key" v-click="1">位移、速度、加速度都是矢量：先分解到两个方向上，再合成回来。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 分运动都简单，合运动未必简单

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>1 号电机匀加速：<Latex tex="x = \frac{1}{2}at^2" /></div>
<div>2 号电机匀速：<Latex tex="y = v_y t" /></div>
<div v-click="1">两个分运动都是直线运动，合运动的轨迹却是<b>曲线</b>。</div>
<div class="key" v-click="2">把曲线运动拆成两个方向的直线运动来研究——这就是本章的办法。</div>
</div>

<div class="figure"><ClawMachine :vx="0" :vy="0.6" :ax="1" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：乘扶梯和走楼梯，谁先到楼上？

<div class="page-grow">
<div>自动扶梯与水平面的夹角为 <Latex tex="30^\circ" />，前进速度 <Latex tex="0.76\ \text{m/s}" />；步行楼梯每级高 <Latex tex="0.15\ \text{m}" />，乙每秒上两级台阶，甲在扶梯上站立不动。楼层高 <Latex tex="4.56\ \text{m}" />。</div>

<div class="stack" v-click="1">
<div>甲在竖直方向的分速度：<Latex tex="v_{\text{甲}y} = v_{\text{甲}}\sin 30^\circ = 0.76 \times 0.5\ \text{m/s} = 0.38\ \text{m/s}" /></div>

<div>乙在竖直方向的分速度：<Latex tex="v_{\text{乙}y} = 2 \times 0.15\ \text{m/s} = 0.30\ \text{m/s}" /></div>
</div>

<div v-click="2"><Latex tex="v_{\text{甲}y} > v_{\text{乙}y}" />，甲先到楼上：<Latex tex="t_{\text{甲}} = \frac{h}{v_{\text{甲}y}} = \frac{4.56}{0.38}\ \text{s} = 12\ \text{s}" />。</div>

<div class="key" v-click="3">两人在竖直方向的位移相同，谁快谁慢，比的只是<b>竖直方向的分速度</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 例题：把炮弹的速度分解

<div class="page-grow">
<div>炮筒与水平方向成 <Latex tex="30^\circ" /> 角，炮弹从炮口射出时的速度大小是 <Latex tex="800\ \text{m/s}" />。求这个速度在水平方向和竖直方向的分速度。</div>

<div class="grid-2" v-click="1">
<div><Latex tex="v_x = v\cos 30^\circ = 800 \times \frac{\sqrt{3}}{2}\ \text{m/s} = 400\sqrt{3}\ \text{m/s} \approx 693\ \text{m/s}" /></div>

<div><Latex tex="v_y = v\sin 30^\circ = 800 \times \frac{1}{2}\ \text{m/s} = 400\ \text{m/s}" /></div>
</div>

<div class="key" v-click="2">已知合运动求分运动，就是运动的分解。</div>
</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask">站在传送带上一直往前走：传送带上的人看你走多快？站在地面上的人看你走多快？</div>

<div class="figure"><FrameSwitch :show-vectors="$clicks >= 1" :show-panel="false" /></div>

<div class="key" v-click="2">同一个运动，换一个参考系去看，速度就不一样——速度是<b>相对</b>的。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 两个参考系，看同一件事

<div class="page-grow">
<div class="figure"><FrameSwitch /></div>

<div class="key" v-click="1">在 C 参考系里看 A 的运动 = 在 C 参考系里看 B 的运动 <b>+</b> 在 B 参考系里看 A 的运动。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 速度合成：一条普遍的公理

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div><Latex tex="v_{A\text{对}C} = v_{A\text{对}B} + v_{B\text{对}C}" display /></div>
<div>把"对"读出来：<Latex tex="v_{A\text{对}B}" /> 就是<b>在 B 的参考系里看 A 的速度</b>。</div>
<div v-click="1">在 C 系里看 B 的运动，叠加在 B 系里看 A 的运动，就是 C 系里看 A 的运动。</div>
<div class="key" v-click="2">这是<b>普遍规律</b>，不是渡河专用；三个速度都是矢量，按平行四边形定则相加。</div>
</div>

<div class="figure"><VectorComposeSvg a-letter="v" a-sub="A对B" b-letter="v" b-sub="B对C" r-letter="v" r-sub="A对C" :angle="36" :show-resultant="$clicks >= 2" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 把公理用到渡河上

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>船对水的速度、水对岸的速度，合成起来就是<b>船对岸的速度</b>：</div>
<div><Latex tex="v_{\text{船对岸}} = v_{\text{船对水}} + v_{\text{水对岸}}" display /></div>
<div v-click="1">船上的人看到水几乎"静止"，岸上的人看到船一边前进一边被水带偏——两个视角都对，只是参考系不同。</div>
</div>

<div class="figure"><VectorComposeSvg a-sub="水对岸" b-sub="船对水" r-sub="船对岸" :angle="34" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow page-loose">
<div class="ask">人在河中始终保持头朝正前方游向对岸，会在正前方到达，还是偏向上游或下游？</div>

<div v-click="1">会偏到<b>下游</b>去。</div>

<div class="key" v-click="2">因为他同时参与两个运动：自己的游泳 + 随水漂流。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 渡河：船在动，水也在动

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>河宽 <Latex tex="d" />，船在静水中的速度 <Latex tex="v_{\text{船}}" />，水流速度 <Latex tex="v_{\text{水}}" />。</div>
<div v-click="1"><Latex tex="v_{\text{船对岸}} = v_{\text{船对水}} + v_{\text{水对岸}}" display /></div>
<div v-click="2">两个分运动：<b>船对水的运动</b> + <b>水对岸的运动</b>。</div>
</div>

<div class="figure"><RiverCrossing :show-vectors="$clicks >= 1" :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 怎样过河最快

<div class="page-grow">
<div class="grid-side">
<div class="figure"><RiverCrossing mode="time" /></div>

<div class="stack">
<div class="ask">想让渡河时间最短，船头应该朝哪？</div>
<div v-click="1">船头垂直河岸：过河时间只由垂直河岸的分速度 <Latex tex="v_{\text{船}}" /> 决定。</div>
<div v-click="1"><Latex tex="t_{\min} = \frac{d}{v_{\text{船}}}" display /></div>
<div v-click="2">水流只把船往下游冲 <Latex tex="x = v_{\text{水}}t" />：<b>水流再急，也改变不了过河时间</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 怎样过河走的路最短

<div class="page-grow">
<div class="grid-side">
<div class="figure"><RiverCrossing mode="displacement" /></div>

<div class="stack">
<div class="ask">想垂直到达正对岸，船头应该朝哪？</div>
<div v-click="1">让合速度垂直河岸：船头偏向上游，与上游河岸成 <Latex tex="\theta" />，且 <Latex tex="\cos\theta = \frac{v_{\text{水}}}{v_{\text{船}}}" />。</div>
<div v-click="1"><Latex tex="t = \frac{d}{\sqrt{v_{\text{船}}^2 - v_{\text{水}}^2}}" display /></div>
<div class="key" v-click="2">前提是 <Latex tex="v_{\text{船}} > v_{\text{水}}" />——船比水快，才可能"走正"。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 同一条船，两种开法

<div class="page-grow">
<div class="grid-2">
<div class="stack">
<div class="mini-title">要快</div>
<div>船头垂直河岸</div>
<div><Latex tex="t_{\min} = \frac{d}{v_{\text{船}}}" />，与 <Latex tex="v_{\text{水}}" /> 无关</div>
<div>靠岸点偏到下游 <Latex tex="x = v_{\text{水}}t" /></div>
</div>

<div class="stack divider-l">
<div class="mini-title">要正</div>
<div>船头偏向上游，<Latex tex="\cos\theta = \frac{v_{\text{水}}}{v_{\text{船}}}" /></div>
<div><Latex tex="t = \frac{d}{\sqrt{v_{\text{船}}^2 - v_{\text{水}}^2}}" />，位移等于河宽</div>
<div>只有在 <Latex tex="v_{\text{船}} > v_{\text{水}}" /> 时才能做到</div>
</div>
</div>

<div class="key" v-click="1">如果 <Latex tex="v_{\text{水}} > v_{\text{船}}" />：到不了正对岸，最短位移 <Latex tex="s = d\cdot\frac{v_{\text{水}}}{v_{\text{船}}}" />（比河宽大，此时合速度与船头垂直）。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 例题：汽艇渡河

<div class="page-grow">
<div>汽艇以 <Latex tex="18\ \text{km/h}" /> 的速度沿垂直于河岸的方向匀速向对岸行驶，河宽 <Latex tex="500\ \text{m}" />，河水流速 <Latex tex="3.6\ \text{km/h}" />。</div>

<div class="grid-2" v-click="1">
<div class="stack">
<div class="mini-title">渡河时间</div>
<div><Latex tex="18\ \text{km/h} = 5\ \text{m/s}" /></div>
<div><Latex tex="t = \frac{d}{v_{\text{船}}} = \frac{500}{5}\ \text{s} = 100\ \text{s}" /></div>
<div>水流速度不改变渡河时间</div>
</div>

<div class="stack divider-l">
<div class="mini-title">靠岸点</div>
<div><Latex tex="3.6\ \text{km/h} = 1\ \text{m/s}" /></div>
<div><Latex tex="x = v_{\text{水}}t = 1 \times 100\ \text{m} = 100\ \text{m}" /></div>
<div>落在出发点下游 <Latex tex="100\ \text{m}" /> 处</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 练习：有风时怎样着地

<div class="page-grow">
<div>无风时某跳伞员竖直下落，着地速度是 <Latex tex="5\ \text{m/s}" />。现在有风，他在竖直方向的运动情况与无风时相同，风使他以 <Latex tex="4\ \text{m/s}" /> 的速度沿水平方向运动。跳伞员将以多大速度着地？</div>

<div v-click="1">竖直分速度 <Latex tex="v_y = 5\ \text{m/s}" /> 不变，水平分速度 <Latex tex="v_x = 4\ \text{m/s}" />。</div>

<div v-click="2"><Latex tex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{4^2 + 5^2}\ \text{m/s} = \sqrt{41}\ \text{m/s} \approx 6.4\ \text{m/s}" /></div>

<div class="key" v-click="3">两个分运动互不影响，各自按自己的规律进行。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 阶段小结：合成、分解与渡河

<div class="page-grow page-loose">
<div class="stack">
<div>① 一个平面运动，可以拆成两个互相垂直方向上的分运动（<b>正交分解</b>）。</div>
<div>② 分运动与合运动由矢量运算法则联系：<Latex tex="s" />、<Latex tex="v" />、<Latex tex="a" /> 都按平行四边形定则合成。</div>
<div>③ 渡河两类问题：要快——船头垂直河岸；要正——船头偏向上游（须 <Latex tex="v_{\text{船}} > v_{\text{水}}" />）。</div>
</div>

<div class="key" v-click="1">把复杂的运动分解成简单的运动——这就是研究曲线运动的基本工具。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 关联速度

<div class="page-grow">
<div class="ask">绳、杆、接触面——两个物体的速度是怎么互相"牵制"的？</div>

<div class="grid-3">
<div class="scene">
<div class="scene-title">绳</div>
<div class="scene-desc">不可伸长：两端沿绳方向的分量相等</div>
</div>

<div class="scene">
<div class="scene-title">杆</div>
<div class="scene-desc">不能伸缩：两端沿杆方向的分量相等</div>
</div>

<div class="scene">
<div class="scene-title">接触面</div>
<div class="scene-desc">不嵌入、不分离：沿法线方向的分量相等</div>
</div>
</div>

<div class="key" v-click="1">先找"约束方向"——速度在这个方向上的分量，两端必须一样。</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div class="ask">人在岸上收绳把船拉向岸边。人收绳的速度是 <Latex tex="v_0" />，船靠岸的速度也是 <Latex tex="v_0" /> 吗？</div>
<div class="key" v-click="2">不是——<b>船比绳快</b>：船的速度里，只有沿绳的那一部分才等于收绳速度。</div>
</div>

<div class="figure"><RopePull :show-decomp="$clicks >= 1" :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 绳上的速度分量必须相等

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>绳不可伸长：不管两端怎么动，<b>沿绳方向的速度分量必须相等</b>，否则绳就被拉长或压缩了。</div>
<div v-click="1">垂直于绳的分量不传递——它只让绳绕着端点转过去。</div>
<div class="key" v-click="2"><Latex tex="v_{\text{船}}\cos\theta = v_0" />：船速沿绳方向的分量，就是绳缩短的速度。</div>
</div>

<div class="figure"><RopePull :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 关联速度的三步法

<div class="page-grow">
<div class="stack">
<div>① 找<b>合速度</b>：物体实际沿哪个方向运动（一般就是它真实的运动方向）。</div>
<div>② 沿<b>约束方向</b>分解：绳方向、杆方向，或接触面的法线方向。</div>
<div>③ 列式：两端沿约束方向的分量相等。</div>
</div>

<div class="key" v-click="1">"沿约束方向的分量相等"——绳、杆、接触面，都是这一句话。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：收绳拉船

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>人在高于水面的岸边用绳把船拉向岸边，绳与水平方向的夹角为 <Latex tex="\theta" />，人收绳的速度为 <Latex tex="v_0" />。求船靠岸的速度 <Latex tex="v_{\text{船}}" />。</div>
<div v-click="2">船速沿绳方向的分量等于收绳速度：<Latex tex="v_{\text{船}}\cos\theta = v_0" />。</div>
<div class="key" v-click="3"><Latex tex="v_{\text{船}} = \frac{v_0}{\cos\theta}" />，船比绳快。</div>
</div>

<div class="figure"><RopePull :show-decomp="$clicks >= 1" :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# θ 变小时，船会怎样？

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>船越靠岸，绳与水平方向的夹角 <Latex tex="\theta" /> 越大，<Latex tex="\cos\theta" /> 越小。</div>
<div v-click="1">由 <Latex tex="v_{\text{船}} = \frac{v_0}{\cos\theta}" />：<b>同样的收绳速度，越靠岸船冲得越快</b>。</div>
<div class="key" v-click="2">所以拉船靠岸要收得慢；<Latex tex="\theta \to 90^\circ" /> 时 <Latex tex="v_{\text{船}}" /> 会趋于很大——模型在提醒我们"别硬拽"。</div>
</div>

<div class="figure"><RopePull /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：两杆上的环

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>两根互相垂直的杆上各套一个环 A、B，用一根不可伸长的绳相连。A 沿竖直杆以速度 <Latex tex="v_A" /> 下滑，当绳与竖直杆的夹角为 <Latex tex="\theta" /> 时，求 B 的速度 <Latex tex="v_B" />。</div>
<div v-click="2">两端沿绳方向的分量相等：<Latex tex="v_A\cos\theta = v_B\sin\theta" />。</div>
<div class="key" v-click="3"><Latex tex="v_B = v_A\cot\theta" />。</div>
</div>

<div class="figure"><RopeRing :show-decomp="$clicks >= 1" :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# B 什么时候快，什么时候慢？

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div v-click="1">绳越接近竖直（<Latex tex="\theta \to 0" />）：<Latex tex="\cot\theta" /> 很大，B 被拽得飞快。</div>
<div v-click="1">绳越接近水平（<Latex tex="\theta \to 90^\circ" />）：<Latex tex="\cot\theta \to 0" />，B 几乎不动。</div>
<div class="key" v-click="2">式子不用背：把<b>两端的速度都沿绳分解</b>，写"分量相等"，答案自己就出来了。</div>
</div>

<div class="figure"><RopeRing :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题：把斜劈挤开

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>光滑墙角处，斜劈放在光滑水平地面上，球夹在竖直墙与斜劈斜面之间。球沿墙以速度 <Latex tex="v_0" /> 下落，斜面与水平方向的夹角为 <Latex tex="\theta" />，求斜劈向右滑动的速度 <Latex tex="v_{\text{劈}}" />。</div>
<div v-click="2">接触面既不嵌进去也不分开：<b>沿法线方向的分量相等</b>，<Latex tex="v_0\cos\theta = v_{\text{劈}}\sin\theta" />。</div>
<div class="key" v-click="3"><Latex tex="v_{\text{劈}} = v_0\cot\theta" />。</div>
</div>

<div class="figure"><WedgeBall :show-decomp="$clicks >= 1" :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 斜面越平，斜劈跑得越快

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div v-click="1"><Latex tex="\theta" /> 小（斜面接近水平）：<Latex tex="\cot\theta" /> 大——球稍微落一点，斜劈就被推出去很远。</div>
<div v-click="1"><Latex tex="\theta \to 90^\circ" />（斜面接近竖直）：<Latex tex="\cot\theta \to 0" />，斜劈几乎不动。</div>
<div class="key" v-click="2">三种约束，找的都是同一样东西：<b>沿"不能变化"的那个方向的分量</b>。</div>
</div>

<div class="figure"><WedgeBall :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 三类约束，一个方法

<div class="page-grow">
<div class="grid-3">
<div class="stack">
<div class="mini-title">绳</div>
<div>沿绳方向的分量相等</div>
<div><Latex tex="v_1\cos\theta_1 = v_2\cos\theta_2" /></div>
</div>

<div class="stack">
<div class="mini-title">杆</div>
<div>沿杆方向的分量相等</div>
<div>和绳的写法完全一样</div>
</div>

<div class="stack">
<div class="mini-title">接触面</div>
<div>沿法线方向的分量相等</div>
<div>不嵌入、不分离</div>
</div>
</div>

<div class="key" v-click="1">分量必须相等，是因为这个约束在那一瞬间"不允许变化"。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 练习：靠在墙上的杆

<div class="page-grow">
<div class="grid-side">
<div class="stack">
<div>一根长杆斜靠在竖直墙上，下端放在光滑水平地面上。当杆与地面成 <Latex tex="\theta" /> 角时，下端以速度 <Latex tex="v" /> 沿地面远离墙滑动。求上端沿墙下滑的速度 <Latex tex="u" />。</div>
<div v-click="2">两端沿杆方向的分量相等：<Latex tex="v\cos\theta = u\sin\theta" />。</div>
<div class="key" v-click="3"><Latex tex="u = v\cot\theta" />。</div>
</div>

<div class="figure"><RodWall :show-decomp="$clicks >= 1" :show-panel="false" /></div>
</div>
</div>

---
layout: base-flex
clicks: 1
---

# 小结：关联速度

<div class="page-grow">
<div class="stack">
<div>① 先找<b>约束</b>：绳、杆，还是接触面。</div>
<div>② 把两端的<b>实际速度</b>沿约束方向分解。</div>
<div>③ 写"分量相等"，解出待求速度。</div>
<div>④ 常见坑：把合速度当成沿绳速度；不分解就硬套公式。</div>
</div>

<div class="key" v-click="1">三个模型，一句话：沿"不能变化"的方向，两端分量相等。</div>
</div>
