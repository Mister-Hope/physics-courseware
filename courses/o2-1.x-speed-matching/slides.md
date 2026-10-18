---
theme: default
title: "复合场中的配速法与摆线运动"
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
chapter-no: "1.x"
chapter: "第一章 安培力与洛伦兹力"
lesson: "习题课"
---

<CoverDecor />


---
layout: base-flex
---

<div class="qp-page">

<div>

**例 1**（多选）用细线吊一个质量为 <Latex tex="m" /> 的带电绝缘小球，小球处于方向垂直纸面向里的匀强磁场中，空气阻力不计。小球分别从 <Latex tex="A" /> 点和 <Latex tex="B" /> 点向最低点 <Latex tex="O" /> 运动，当小球两次经过 <Latex tex="O" /> 点时（　　）

</div>

<div class="half-grid items-center">

<div>

- A. 小球的动能相同
- B. 线所受的拉力相同
- C. 小球所受的洛伦兹力相同
- D. 小球的向心加速度大小相同

</div>

<div class="divider-l qp-fig">

<SwingInField />

</div>

</div>

</div>

---
clicks: 1
---

<div class="split-wide qp-solve">

<div class="stack stack-tight">

<div><b>例 1</b> 两次经过最低点</div>

<div>洛伦兹力始终垂直于速度、<b>不做功</b>：两次落下高度相同，经过 <Latex tex="O" /> 的动能相同 —— <b>A 对</b>。</div>

<div v-click="1">两次速度方向相反（<Latex tex="v_1" /> 向左、<Latex tex="v_2" /> 向右）⟹ 洛伦兹力也反过来：<Latex tex="F_{\text{洛}1}" /> 向下、<Latex tex="F_{\text{洛}2}" /> 向上 —— <b>C 错</b>。</div>

</div>

<div class="qp-fig qp-fig-corner">

<SwingInField show-analysis />

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve">

<div class="stack stack-tight">

<div><b>例 1</b> 拉力与向心加速度</div>

<div>沿半径方向列式：<Latex tex="F_T - mg \mp qvB = \dfrac{mv^2}{r}" /></div>

<div>两次的洛伦兹力一个向上 <Latex tex="F_{\text{洛}2}" />、一个向下 <Latex tex="F_{\text{洛}1}" /> ⟹ <b>线所受的拉力不同 —— B 错</b>。</div>

<div v-click="1"><Latex tex="a_n = \dfrac{v^2}{r}" /> 只由 <Latex tex="v" />、<Latex tex="r" /> 决定，两次完全相同 —— <b>D 对</b>。</div>

<div v-click="2" class="tip-hint">答案 <b>AD</b>。洛伦兹力<b>不做功 ⟹ 速率不变</b>；但它的方向总在变。</div>

</div>

<div class="qp-fig qp-fig-corner">

<SwingInField show-analysis />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div>

**例 2**（2021·湖北）（多选）如图，在方向垂直纸面向里的匀强磁场中，一个电中性微粒分裂成 <Latex tex="a" />、<Latex tex="b" />、<Latex tex="c" /> 三个微粒，其中 <Latex tex="a" />、<Latex tex="b" /> 的轨迹半径相等（图中箭头表示它们的环绕方向）。下列说法正确的是（　　）

</div>

<div class="half-grid items-center">

<div>

- A. <Latex tex="a" /> 带负电
- B. <Latex tex="b" /> 带正电
- C. <Latex tex="c" /> 带负电
- D. <Latex tex="a" />、<Latex tex="b" /> 的动量大小一定相等

</div>

<div class="divider-l qp-fig">

<SplitParticles />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve">

<div class="stack stack-tight">

<div><b>例 2</b> 先定三个微粒的带电性质</div>

<div>速度沿圆的切线、磁场垂直纸面向里：用左手定则检验，只有带<b>正电</b>时洛伦兹力才指向圆心 ⟹ <Latex tex="a" />、<Latex tex="b" /> 都带正电 —— <b>A 错、B 对</b>。</div>

<div v-click="1">电荷守恒 <Latex tex="q_a + q_b + q_c = 0" />：<Latex tex="a" />、<Latex tex="b" /> 都带正电 ⟹ <Latex tex="c" /> 必然带负电 —— <b>C 对</b>。</div>

<div v-click="2" class="tip-hint">答案 <b>BC</b>。半径 <Latex tex="R = \dfrac{p}{qB}" /> 相等只说明 <Latex tex="\dfrac{p}{q}" /> 相同，电荷量可以不同 —— <b>D 错</b>。</div>

</div>

<div class="qp-fig qp-fig-corner">

<SplitParticles show-analysis />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div>

**例 3** 如图所示（俯视图），光滑水平面上有一根长为 <Latex tex="L" /> 的细绳，一端固定在 <Latex tex="O" /> 点，另一端拴一个带正电的小球。空间存在竖直向下的匀强磁场，小球绕 <Latex tex="O" /> 点沿顺时针方向做匀速圆周运动。某时刻细绳突然断裂，下列说法正确的是（　　）

</div>

<div class="half-grid items-center">

<div>

- A. 细绳断裂后小球做匀速直线运动
- B. 细绳断裂后小球做匀速圆周运动，且速率变小
- C. 细绳断裂后小球做圆周运动的周期与断裂前相同
- D. 细绳断裂后小球做圆周运动的半径可能等于绳长

</div>

<div class="divider-l qp-fig">

<BreakString />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1.4fr) minmax(0, 1fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.3rem">

<div><b>例 3</b> 绳断之后，只剩洛伦兹力</div>

<div>绳断后竖直方向已平衡，水平面上小球<b>只受洛伦兹力</b>：它始终垂直于速度、大小不变 ⟹ 小球做<b>匀速圆周运动</b>，速率不变 —— <b>A、B 都错</b>。</div>

<div v-click="1">洛伦兹力提供向心力 <Latex tex="qvB = \dfrac{mv^2}{r'}" /> ⟹ <Latex tex="r' = \dfrac{mv}{qB}" />。绳断前是绳子的拉力提供向心力，<Latex tex="v" /> 与 <Latex tex="L" /> 之间没有固定关系 ⟹ <Latex tex="r'" /> 与 <Latex tex="L" /> 无必然联系 —— <b>D 对</b>。</div>

<div v-click="2" class="tip-hint">答案 <b>D</b>。周期 <Latex tex="T = \dfrac{2\pi m}{qB}" /> 只由 <Latex tex="m" />、<Latex tex="q" />、<Latex tex="B" /> 决定 —— <b>C 错</b>。</div>

</div>

<div class="qp-fig qp-fig-corner">

<BreakString show-analysis />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div>

**例 4**（2023·山东青岛二中期末）在赤道处，将一小球向东水平抛出，落地点为 <Latex tex="a" />。给小球带上电荷后，仍以原来的速度抛出，考虑地磁场的影响，下列说法正确的是（　　）

</div>

<div class="half-grid items-center">

<div>

- A. 无论小球带何种电荷，小球落地时的速率都不变
- B. 若小球带正电荷，它在空中的运动过程中机械能增加
- C. 若小球带负电荷，则落地点在 <Latex tex="a" /> 点的东侧
- D. 若小球带正电荷，则落地点在 <Latex tex="a" /> 点的西侧

</div>

<div class="divider-l qp-fig">

<EquatorThrow />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve">

<div class="stack stack-tight">

<div><b>例 4</b> 带电之后，落点往哪偏</div>

<div>赤道处地磁场水平向北：洛伦兹力始终垂直于速度、<b>不做功</b> ⟹ 落地时的速率与不带电时相同 —— <b>A 对、B 错</b>。</div>

<div v-click="1">抛出瞬间速度向东 ⟹ 洛伦兹力竖直向上；此后它的方向随速度一起转、<b>始终垂直于速度</b>。正电荷所受的洛伦兹力有竖直向上的分量，空中时间变长，落地点偏东，在 <Latex tex="a" /> 的东侧 —— <b>D 错</b>。</div>

<div v-click="2" class="tip-hint">答案 <b>A</b>。负电荷受力方向相反，落地点在 <Latex tex="a" /> 的西侧 —— <b>C 错</b>。</div>

</div>

<div class="qp-fig qp-fig-corner">

<EquatorThrow show-analysis />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div>

**例 5** 如图，下端封闭、上端开口、内壁光滑的细玻璃管竖直放置，管底有一个带电小球。整个装置以水平速度 <Latex tex="v" /> 垂直进入方向垂直纸面向里的匀强磁场；由于外力的作用，玻璃管在磁场中的速度保持不变，最终小球从上端管口飞出。下列说法正确的是（　　）

</div>

<div class="half-grid items-center">

<div>

- A. 洛伦兹力对小球做正功
- B. 小球在管中做匀速直线运动
- C. 小球的机械能守恒
- D. 小球在竖直方向上做匀加速运动

</div>

<div class="divider-l qp-fig">

<TubeInField />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1.45fr) minmax(0, 1fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.3rem">

<div><b>例 5</b> 管中小球的受力与运动</div>

<div>速度正交分解：随管水平运动的 <Latex tex="v" /> 产生<b>竖直向上</b>的洛伦兹力 <Latex tex="qvB" />，推着小球上升；小球向上有了 <Latex tex="v_y" />，又产生水平向左的 <Latex tex="qv_yB" />，被管壁的弹力平衡掉。</div>

<div v-click="1">竖直方向恒力 <Latex tex="qvB - mg" /> 保持不变 ⟹ 竖直方向<b>匀加速</b>；水平方向匀速 ⟹ 合运动是抛物线 —— <b>B 错、D 对</b>。</div>

<div v-click="2" class="tip-hint">答案 <b>D</b>。洛伦兹力的总功仍为零，只是竖直分量做正功、水平分量做等量负功：机械能的增加来自<b>维持管匀速的外力做功</b> —— <b>A、C 都错</b>。</div>

</div>

<div class="qp-fig qp-fig-corner">

<TubeInField show-analysis />

</div>

</div>

---
clicks: 2
---

<div class="ask text-xl">在方向垂直纸面向里的匀强磁场中，一个质量为 <Latex tex="m" />、电荷量为 <Latex tex="+q" /> 的微粒从静止释放，它会怎样运动？</div>

<div class="qp-page">

<ReleaseInField :reveal="$clicks >= 1" />

<div v-click="2">

静止释放时只有重力、竖直下落；一旦有了速度，洛伦兹力就把轨迹向右侧拉弯；速度方向一变，洛伦兹力的方向又跟着变。

<div class="tip-hint">速度决定力、力又反过来改变速度，方程<b>自相耦合</b>，高中手段解不动。</div>

</div>

</div>

---
clicks: 3
---

# 把速度分解成匀速直线分量与匀速圆周分量

<div class="page-grow">

<ForceSplitDemo :step="$clicks" />

</div>

---
clicks: 2
---

# 用一个恒定分速度抵消重力

<div class="qp-page" style="--page-gap:.5rem;--hint-pad-y:.5rem">

<div>只要取 <Latex tex="f_{\text{平}} = mg" />，也就是 <Latex tex="qv_{\text{平}}B = mg" />：</div>

<Latex tex="v_{\text{平}} = \dfrac{mg}{qB} \quad (\text{方向水平向右})" display />

<div v-click="1">这个速度是<b>恒定</b>的，所以由它产生的洛伦兹力 <Latex tex="f_{\text{平}}" /> 也恒定：<b>永远竖直向上、大小恰好等于 <Latex tex="mg" /></b>。于是</div>

<div v-click="1">

<Latex tex="F_{\text{合}} = \underbrace{mg\downarrow + f_{\text{平}}\uparrow}_{=0} + f_{\text{圆}} = f_{\text{圆}}" display />

</div>

<div v-click="2" class="tip-hint">重力被 <Latex tex="f_{\text{平}}" /> 一分一秒地抵消掉，剩下的合力 <Latex tex="f_{\text{圆}}" /> 永远垂直于 <Latex tex="v_{\text{圆}}" />、大小恒定 ⟹ 这一部分必定是<b>匀速圆周运动</b>。</div>

</div>

---
clicks: 2
---

# 初态怎么匹配

<div class="qp-page">

<div>释放瞬间真实速度为 <Latex tex="0" />，而 <Latex tex="v_{\text{实}} = v_{\text{平}} + v_{\text{圆}0}" />：取一个向右的 <Latex tex="v_{\text{平}}" />，就必须同时取一个<b>等大、水平向左</b>的 <Latex tex="v_{\text{圆}0}" />。</div>

<div v-click="1" class="half-grid">

<div>

<div class="mini-title"><mdi-arrow-right-bold /> 匀速直线分运动</div>

<Latex tex="v_{\text{平}} = \dfrac{mg}{qB}" display />

方向水平向右，决定整体的漂移。

</div>

<div class="divider-l">

<div class="mini-title"><mdi-sync /> 匀速圆周分运动</div>

<Latex tex="v_{\text{圆}0} = v_{\text{平}} = \dfrac{mg}{qB}" display />

初速度水平向左，逆时针转动。

</div>

</div>

<div v-click="2">
半径 <Latex tex="R = \dfrac{mv_{\text{圆}0}}{qB} = \dfrac{m^2 g}{q^2 B^2}" />，周期 <Latex tex="T = \dfrac{2\pi m}{qB}" />（与速度无关）。
</div>

</div>

---
clicks: 3
---

# 两个分运动合成：摆线

<div class="qp-page">

<CycloidRolling :show-initial="$clicks >= 1" :show-extremes="$clicks >= 3" />

<div v-click="1">一边以 <Latex tex="v_{\text{平}}" /> 匀速向右漂移，一边绕圆心以 <Latex tex="v_{\text{圆}}" /> 匀速转圈 —— 两者叠加才是真实速度。</div>

<div v-click="3" class="tip-hint">尖点处两分速度反向 ⟹ <Latex tex="v = 0" />、合力只剩 <Latex tex="mg" />；最低点同向 ⟹ <Latex tex="v_{\max} = 2v_{\text{平}}" />。</div>

</div>

---
clicks: 2
---

# 极值与能量验证

<div class="qp-page">

<div class="half-grid">

<div>

<div class="mini-title"><mdi-arrow-collapse-down /> 下落的最大深度</div>

<Latex tex="h_{\max} = 2R = \dfrac{2m^2 g}{q^2 B^2}" display />

就是圆周运动的<b>直径</b>。

</div>

<div class="divider-l">

<div class="mini-title"><mdi-chart-timeline-variant /> 最低点的最大速度</div>

<Latex tex="v_{\max} = 2v_{\text{平}} = \dfrac{2mg}{qB}" display />

两个分速度在这里<b>同向叠加</b>。

</div>

</div>

<div v-click="1">用动能定理复核一遍：<Latex tex="\Delta E_k = \dfrac{1}{2}m v_{\max}^2 = \dfrac{1}{2}m (2v_{\text{平}})^2 = 2mv_{\text{平}}^2" />；重力做功 <Latex tex="W_G = mgh_{\max} = mg\cdot 2R = 2mv_{\text{平}}^2" />，两者自洽。</div>

<div v-click="2" class="tip-hint">全过程只需 <Latex tex="v_{\text{平}} = \dfrac{mg}{qB}" /> 一个量，深度、最大速度、周期全都由它和 <Latex tex="R" /> 直接读出，不必解方程。</div>

</div>

---
clicks: 1
---

# 什么时候能用，什么时候不能用

<div class="qp-page" style="--page-gap:.5rem;--hint-pad-y:.5rem">

<div class="stack">

<div class="mini-title"><mdi-target /> 判据只有一条</div>

<div>用一个<b>恒定的分速度</b>去抵消外力 —— 只看一件事：<b><Latex tex="F_{\text{外}}" /> 与 <Latex tex="qB" /> 的比值是否恒定</b>。</div>

<Latex tex="v_{\text{平}} = \dfrac{F_{\text{外}}}{qB}" display />

</div>

<div class="stack">

<div>常见模型里 <Latex tex="q" /> 不变 —— 重力 <Latex tex="mg" /> 配匀强磁场 <Latex tex="B" /> 是最典型的一例。</div>

<div class="mini-note">磁场不再匀强时，这个比值随位置改变，无法保持恒定。</div>

</div>

<div v-click="1" class="warn-hint">两分速率各自不变，但夹角在变 ⟹ <b>总动能 ≠ 两分动能之和</b>（差交叉项 <Latex tex="m\,v_{\text{平}}\cdot v_{\text{圆}}" />）。</div>

</div>

---

<div class="qp-page">

<div class="stack">

<div><mdi-numeric-1-circle class="text-xl text-accent inline-block align-middle mr-1" />恒定磁场 <Latex tex="B" /> ＋ 恒定外力 <Latex tex="F_{\text{外}}" />：用一个<b>恒定的分速度</b>造出一个恒定的洛伦兹力去抵消它 —— 能不能抵消，只看 <Latex tex="F_{\text{外}}/qB" /> 是否恒定。</div>

<div><mdi-numeric-2-circle class="text-xl text-accent inline-block align-middle mr-1" />抵消掉之后，把剩下的那一部分单独拿出来看它自己怎么演化（这里就是匀速圆周）。</div>

<div class="tip-hint">处理这类问题的出发点：<b>先把恒力"消掉"，再看剩下的运动</b>。</div>

</div>

</div>

---
layout: focus-question
---

<template v-slot:icon>

<mdi-help-circle-outline class="icon-xl" />

</template>

<div class="text-5xl leading-normal">如果给小球一个初速度，接下来该怎么算？</div>

<template v-slot:hint>

初速度可以是<b>任意方向</b> —— 不只是水平向右或向左，也可能斜向右上、竖直向上……

</template>

---
clicks: 1
---

<div class="page-grow">

<InitialSpeedVariants />

</div>

---
layout: base-flex
---

<div class="qp-page">

<div class="ask text-xl">一束<b>平行</b>带电粒子（同种、同速）水平射入一个<b>圆形匀强磁场区域</b>，出射后会散开，还是可能交于同一点？</div>

<FocusQuestion />

</div>

---
clicks: 3
---

# $r = R$ 时：出射点的位置

<div class="qp-page">

<FocusProof :step="$clicks" />

<div class="stack stack-tight">

<div :style="{ opacity: $clicks >= 1 ? 1 : 0 }">轨迹圆心 <Latex tex="C" /> 在 <Latex tex="A" /> 正下方：<Latex tex="AC = r" />；<Latex tex="P" /> 同时在两个圆上。</div>

<div :style="{ opacity: $clicks >= 2 ? 1 : 0 }">取 <Latex tex="r = R" />：四边 <Latex tex="OA = AC = CP = PO = R" /> ⟹ <Latex tex="OACP" /> 是<b>菱形</b>。</div>

<div :style="{ opacity: $clicks >= 3 ? 1 : 0 }" class="tip-hint">菱形 ⟹ <Latex tex="\overrightarrow{OP} = \overrightarrow{AC}" />：无论从哪儿入射，<Latex tex="P" /> 都落在 <Latex tex="O" /> 正下方 <Latex tex="R" /> 处的最低点。</div>

</div>

</div>

---

<div class="qp-page">

<div class="ask">回旋半径 <Latex tex="r" /> 与磁场半径 <Latex tex="R" /> 满足什么关系时，所有出射粒子才交于同一点？</div>

<FocusConvergeDemo />

</div>

