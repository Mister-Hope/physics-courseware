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

<div class="q-page">

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

<div class="divider-l q-fig-aside">

<SwingInField />

</div>

</div>

</div>

---
clicks: 1
---

<div class="half-grid">

<div>

**例 1** 两次经过最低点，逐个判断

</div>

<div class="q-fig-aside q-fig-corner">

<SwingInField show-analysis />

</div>

</div>

<div class="page-grow">

<div>洛伦兹力始终垂直于速度、<b>不做功</b>：从 <Latex tex="A" />、<Latex tex="B" /> 落到最低点的高度相同，机械能守恒，两次经过 <Latex tex="O" /> 的动能相同 —— <b>A 对</b>。</div>

<div v-click="1">两次经过 <Latex tex="O" /> 的速度方向相反（<Latex tex="v_1" /> 向左、<Latex tex="v_2" /> 向右），洛伦兹力的方向也跟着反了过来：<Latex tex="v_1" /> 配向下的 <Latex tex="F_{\text{洛}1}" />、<Latex tex="v_2" /> 配向上的 <Latex tex="F_{\text{洛}2}" /> —— <b>C 错</b>。</div>

</div>

---
clicks: 2
---

<div class="half-grid">

<div>

**例 1** 拉力与向心加速度

</div>

<div class="q-fig-aside q-fig-corner">

<SwingInField show-analysis />

</div>

</div>

<div class="page-grow">

<div>沿半径方向列式：<Latex tex="F_T - mg \mp qvB = \dfrac{mv^2}{r}" />。两次的洛伦兹力一个向上 <Latex tex="F_{\text{洛}2}" />、一个向下 <Latex tex="F_{\text{洛}1}" />，所以<b>线所受的拉力不同 —— B 错</b>。</div>

<div v-click="1">而 <Latex tex="a_n = \dfrac{v^2}{r}" /> 只由 <Latex tex="v" />、<Latex tex="r" /> 决定，两次完全相同 —— <b>D 对</b>。</div>

<div v-click="2" class="key">答案 <b>AD</b>。洛伦兹力<b>不做功 ⟹ 速率不变</b>；但它方向总在变，凡涉及"拉力、洛伦兹力"这类矢量，都要重新判断一次。</div>

</div>

---
layout: base-flex
---

<div class="q-page">

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

<div class="divider-l q-fig-aside">

<SplitParticles />

</div>

</div>

</div>

---
clicks: 2
---

<div class="half-grid">

<div>

**例 2** 先定三个微粒的带电性质

</div>

<div class="q-fig-aside q-fig-corner">

<SplitParticles show-analysis />

</div>

</div>

<div class="page-grow">

<div>洛伦兹力指向圆心。在 <Latex tex="a" />、<Latex tex="b" /> 的圆轨迹上各取一点：速度沿圆的切线，磁场垂直纸面向里 —— 用左手定则检验，只有带<b>正电</b>时洛伦兹力才指向圆心，所以两者都是正的 —— <b>A 错、B 对</b>。</div>

<div v-click="1">微粒原来电中性，分裂前后电荷守恒：<Latex tex="q_a + q_b + q_c = 0" />。<Latex tex="a" />、<Latex tex="b" /> 都带正电，<Latex tex="c" /> 必然带负电 —— <b>C 对</b>。</div>

<div v-click="2" class="key">答案 <b>BC</b>。半径 <Latex tex="R = \dfrac{p}{qB}" /> 相等只说明 <Latex tex="\dfrac{p}{q}" /> 相同，电荷量可以不同 —— <b>D 错</b>。</div>

</div>

---
layout: base-flex
---

<div class="q-page">

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

<div class="divider-l q-fig-aside">

<BreakString />

</div>

</div>

</div>

---
clicks: 2
---

<div class="half-grid">

<div>

**例 3** 绳断之后，只剩洛伦兹力

</div>

<div class="q-fig-aside q-fig-corner">

<BreakString show-analysis />

</div>

</div>

<div class="page-grow">

<div>绳断后竖直方向已平衡，水平面上小球<b>只受洛伦兹力</b>：它始终垂直于速度、大小不变，于是小球做<b>匀速圆周运动</b>，速率不变 —— <b>A、B 都错</b>。</div>

<div v-click="1">洛伦兹力提供向心力 <Latex tex="qvB = \dfrac{mv^2}{r'}" />，得 <Latex tex="r' = \dfrac{mv}{qB}" />。断裂前绳子也在提供向心力，<Latex tex="v" /> 与 <Latex tex="L" /> 没有固定关系，所以 <Latex tex="r'" /> 与 <Latex tex="L" /> 无必然联系 —— <b>D 对</b>。</div>

<div v-click="2" class="key">答案 <b>D</b>。周期 <Latex tex="T = \dfrac{2\pi m}{qB}" /> 只由 <Latex tex="m" />、<Latex tex="q" />、<Latex tex="B" /> 决定，与绳断前的受力无关，不能拿两个"周期"直接比 —— <b>C 错</b>。</div>

</div>

---
layout: base-flex
---

<div class="q-page">

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

<div class="divider-l q-fig-aside">

<EquatorThrow />

</div>

</div>

</div>

---
clicks: 2
---

<div class="half-grid">

<div>

**例 4** 带电之后，落点往哪偏

</div>

<div class="q-fig-aside q-fig-corner">

<EquatorThrow show-analysis />

</div>

</div>

<div class="page-grow">

<div>赤道处地磁场水平向北，与向东的抛出速度垂直。洛伦兹力始终垂直于速度、<b>不做功</b>：落地时的速率与不带电时相同，机械能也守恒 —— <b>A 对、B 错</b>。</div>

<div v-click="1">正电荷：速度向东、磁场向北，洛伦兹力<b>竖直向上</b>，小球在空中停留的时间变长，落地点偏东，在 <Latex tex="a" /> 的东侧 —— <b>D 错</b>。</div>

<div v-click="2" class="key">答案 <b>A</b>。负电荷受到的洛伦兹力竖直向下，空中时间变短，落地点在 <Latex tex="a" /> 的西侧 —— <b>C 错</b>。洛伦兹力只改变落地速度的方向，不改变它的大小。</div>

</div>

---
layout: base-flex
---

<div class="q-page">

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

<div class="divider-l q-fig-aside">

<TubeInField />

</div>

</div>

</div>

---
clicks: 2
---

<div class="half-grid">

<div>

**例 5** 管中小球的受力与运动

</div>

<div class="divider-l q-fig-aside">

<TubeInField show-analysis />

</div>

</div>

<div class="stack stack-tight">

<div>把小球的速度正交分解：随管一起水平运动的速度 <Latex tex="v" /> 产生<b>竖直向上</b>的洛伦兹力 <Latex tex="qvB" />，推着小球上升；小球一旦向上有了速度 <Latex tex="v_y" />，又会产生水平向左的洛伦兹力 <Latex tex="qv_yB" />，被管壁的弹力平衡掉。</div>

<div v-click="1">竖直方向：恒力 <Latex tex="qvB - mg" /> 保持不变 ⟹ 竖直方向<b>匀加速</b>，水平方向匀速，两者合起来是抛物线 —— <b>B 错、D 对</b>。</div>

<div v-click="2" class="key">答案 <b>D</b>。洛伦兹力的总功仍为零，只是竖直分量做正功、水平分量做等量负功：机械能的增加来自<b>维持管匀速的外力做功</b> —— <b>A、C 都错</b>。</div>

</div>

---
clicks: 2
---

<div class="ask text-xl">在方向垂直纸面向里的匀强磁场中，一个质量为 <Latex tex="m" />、电荷量为 <Latex tex="+q" /> 的微粒从静止释放，它会怎样运动？</div>

<div class="q-page">

<ReleaseInField :reveal="$clicks >= 1" />

<div v-click="2">

静止释放时只有重力、竖直下落；一旦有了速度，洛伦兹力就把轨迹向右侧拉弯；轨迹一弯，速度方向就变，洛伦兹力的大小与方向又跟着变 —— 如此往复。

<div class="key">速度决定力、力又反过来改变速度：牛顿第二定律在这里变成一个<b>自相耦合</b>的方程，高中手段直接解不动。</div>

</div>

</div>

---
clicks: 3
---

# 把速度记成两笔账

<div class="page-grow">

<ForceSplitDemo :step="$clicks" />

</div>

---
clicks: 2
---

# 让重力全程消失

<div class="q-page">

<div>只要取 <Latex tex="f_{\text{平}} = mg" />，也就是 <Latex tex="qv_{\text{平}}B = mg" />：</div>

<Latex tex="v_{\text{平}} = \dfrac{mg}{qB} \quad (\text{方向水平向右})" display />

<div v-click="1">这个速度是<b>恒定</b>的，所以由它产生的洛伦兹力 <Latex tex="f_{\text{平}}" /> 也恒定：<b>永远竖直向上、大小恰好等于 <Latex tex="mg" /></b>。于是</div>

<div v-click="1">

<Latex tex="F_{\text{合}} = \underbrace{mg\downarrow + f_{\text{平}}\uparrow}_{=0} + f_{\text{圆}} = f_{\text{圆}}" display />

</div>

<div v-click="2" class="key">重力被 <Latex tex="f_{\text{平}}" /> 一分一秒地抵消掉，剩下的合力 <Latex tex="f_{\text{圆}}" /> 永远垂直于 <Latex tex="v_{\text{圆}}" />、大小恒定 ⟹ 这一部分必定是<b>匀速圆周运动</b>。</div>

</div>

---
clicks: 2
---

# 初态怎么匹配

<div class="q-page">

<div>释放瞬间真实速度为 <Latex tex="0" />，而 <Latex tex="v_{\text{实}} = v_{\text{平}} + v_{\text{圆}0}" />：借了一个向右的 <Latex tex="v_{\text{平}}" />，就必须还一个<b>等大、水平向左</b>的 <Latex tex="v_{\text{圆}0}" />。</div>

<div v-click="1" class="half-grid">

<div>

<div class="mini-title"><mdi-arrow-right-bold /> 匀速直线分运动</div>

<Latex tex="v_{\text{平}} = \dfrac{mg}{qB}" display />

方向水平向右，决定整体的"漂移"。

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

<div class="q-page">

<CycloidRolling :show-initial="$clicks >= 1" :show-extremes="$clicks >= 3" />

<div v-click="1">一边以 <Latex tex="v_{\text{平}}" /> 匀速向右漂移，一边绕圆心以 <Latex tex="v_{\text{圆}}" /> 匀速转圈 —— 红点处那条切向的 <Latex tex="v_{\text{圆}}" /> 与圆心的 <Latex tex="v_{\text{平}}" /> 叠加，才是小球的真实速度。</div>

<div v-click="3" class="key">尖点处两个分速度反向，<Latex tex="v = 0" />，合力只剩竖直向下的 <Latex tex="mg" />；最低点两者同向，<Latex tex="v_{\max} = 2v_{\text{平}}" />。</div>

</div>

---
clicks: 2
---

# 极值与能量验证

<div class="q-page">

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

<div v-click="2" class="key">全过程只需 <Latex tex="v_{\text{平}} = \dfrac{mg}{qB}" /> 一个量，深度、最大速度、周期全都由它和 <Latex tex="R" /> 直接读出，不必解方程。</div>

</div>

---
clicks: 1
---

# 什么时候能用，什么时候不能用

<div class="q-page">

<div class="stack">

<div class="mini-title"><mdi-target /> 判据只有一条</div>

<div>用一个<b>恒定的分速度</b>去抵消外力 —— 只看一件事：<b><Latex tex="F_{\text{外}}" /> 与 <Latex tex="qB" /> 的比值是否恒定</b>。</div>

<Latex tex="v_{\text{平}} = \dfrac{F_{\text{外}}}{qB}" display />

</div>

<div class="stack">

<div>只要这个比值不变，这个分速度就一直是它、抵消就一直是有效的。粒子的电荷量 <Latex tex="q" /> 基本不变化，常见模型里这个比值都是恒定的 —— 重力 <Latex tex="mg" /> 配匀强磁场 <Latex tex="B" /> 是最典型的一例。</div>

<div class="text-sm opacity-80">（高中能见到的情形：恒定的重力场 / 匀强电场 ＋ 匀强磁场 —— 比值恒定，恒定分速度一路有效；一旦磁场不再匀强，这个比值就跟着位置变，"恒定"这一条也就不成立了。）</div>

</div>

<div v-click="1" class="key">还有一条最容易错：分运动的速率各自不变，但两速度夹角在周期性变化，<b>总动能不等于两个分动能之和</b>（差一个交叉项 <Latex tex="m\,v_{\text{平}}\cdot v_{\text{圆}}" />）。</div>

</div>

---

<div class="q-page">

<div class="stack">

<div class="stack">

<div>恒定磁场 <Latex tex="B" /> ＋ 恒定外力 <Latex tex="F_{\text{外}}" />：用一个<b>恒定的分速度</b>造出一个恒定的洛伦兹力去抵消它 —— 能不能抵消，只看 <Latex tex="F_{\text{外}}/qB" /> 是否恒定。</div>

<div>抵消掉之后，把剩下的那一部分单独拿出来看它自己怎么演化（这里就是匀速圆周）。</div>

<div class="key">处理这类问题的出发点：<b>先把恒力"消掉"，再看剩下的运动</b>。</div>

</div>

</div>

</div>

---
layout: focus-question
---

<template v-slot:icon>

<mdi-help-circle-outline class="icon-xl" />

</template>

<div class="text-5xl">如果给小球一个初速度，接下来该怎么算？</div>

<template v-slot:hint>

初速度可以是<b>任意方向</b> —— 不只是水平向右或向左，也可能斜向右上、竖直向上……

</template>

---
clicks: 1
---

<div class="page-grow">

<div class="isv-standalone">

<InitialSpeedVariants />

</div>

</div>
