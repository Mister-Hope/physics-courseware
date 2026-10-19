---
theme: default
title: "带电粒子在匀强磁场中的运动"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: course-cover
colorScheme: dark
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
chapter-no: "1.3"
chapter: "第一章 安培力与洛伦兹力"
---

<CoverDecor />

---
clicks: 1
---

<!-- 思考题（第一课时收尾 / 第二课时引课）：三个候选轨迹常显，点一下才判对错 -->
<div class="ask text-xl mb-3">电子束在磁场中会形成什么轨迹？</div>

<div class="page-grow">

<TrajectoryPredict :step="$clicks" />

</div>

---
clicks: 1
---

# $v$ 与 $B$ 平行时

<div class="ask text-xl">电子沿着磁感线方向射入（<Latex tex="v \parallel B" />），它还受洛伦兹力吗？</div>

<div class="page-grow">

<div class="half-grid items-center gap-6">

<div>

<VDivideB :initial-theta="0" :picker="false" :hint="$clicks >= 1" />

</div>

<div v-click="1">

<div class="text-xl leading-relaxed"><Latex tex="F = qvB\sin\theta" />，这里 <Latex tex="\theta = 0" /> ⟹ <Latex tex="F_{\text{洛}} = 0" /></div>

<div class="tip-hint mt-4">不受洛伦兹力 ⟹ 运动状态不改变 ⟹ <strong>匀速直线运动</strong></div>

</div>

</div>

</div>

---
clicks: 1
---

# $v$ 与 $B$ 垂直时

<div class="ask text-xl">用洛伦兹力演示仪垂直射入电子束，径迹是什么形状？</div>

<div class="page-grow">

<CircularOrbit :force="$clicks >= 1" :radius="$clicks >= 1" :hint="false" :readout="false" />

<div class="tip-hint" v-click="1">
磁感应强度 <Latex tex="B" /> 越大 → 半径越小、转得越快；改变速率 <Latex tex="v" /> → 圆的大小变了，但转的快慢不变
</div>

</div>

---
clicks: 2
---

# 为什么是匀速圆周运动？

<div class="page-grow">

<div class="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-8">

<div>

<table class="w-full overflow-hidden rounded-xl border text-lg" style="border-color: color-mix(in srgb, var(--c-neutral-700) 60%, transparent)">
<thead>
<tr style="background-color: color-mix(in srgb, var(--c-surface-solid) 60%, transparent)">
<th class="px-4 py-2 text-left font-semibold">物理量</th>
<th class="px-4 py-2 font-semibold">大小</th>
<th class="px-4 py-2 font-semibold">方向</th>
</tr>
</thead>
<tbody>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td class="px-4 py-2"><Latex tex="v" /></td>
<td class="px-4 py-2 text-center">不变</td>
<td class="px-4 py-2 text-center text-accent">改变</td>
</tr>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td class="px-4 py-2"><Latex tex="F_{\text{洛}}" /></td>
<td class="px-4 py-2 text-center">不变</td>
<td class="px-4 py-2 text-center text-accent">改变</td>
</tr>
</tbody>
</table>

<div class="mt-4 text-base leading-relaxed text-dim">
依据：<Latex tex="F_{\text{洛}} \perp v" /> ⟹ 只改方向、不改大小；<Latex tex="v" /> 大小不变 ⟹ <Latex tex="F_{\text{洛}} = qvB" /> 大小也不变。
</div>

</div>

<div class="stack">

<div class="text-xl leading-relaxed" v-click="1">
① <Latex tex="a = \dfrac{F_{\text{洛}}}{m}" />，<Latex tex="F_{\text{洛}}" /> 大小不变 ⟹ <Latex tex="a" /> 大小不变
</div>

<div class="text-xl leading-relaxed" v-click="1">
② <Latex tex="F_{\text{洛}}" /> 始终垂直于 <Latex tex="v" /> ⟹ <Latex tex="v" /> 的方向均匀改变
</div>

<div class="tip-hint" v-click="2">
③ 加速度大小不变、速度方向均匀改变 ⟹ <strong>匀速圆周运动</strong>
</div>

</div>

</div>

</div>


---

# 为什么一定在垂直于磁感线的平面内运动？

<!-- 结论页：把"平面 ⊥ B"讲成一条推理链 -->
<div class="page-grow">

<div class="half-grid items-center">

<div class="stack text-lg leading-relaxed">

<div>① <Latex tex="F_{\text{洛}} \perp v" /> 且 <Latex tex="F_{\text{洛}} \perp B" /> ⟹ 洛伦兹力始终落在<strong>垂直于 <Latex tex="B" /></strong> 的那个平面内</div>

<div>② 只要射入时 <Latex tex="v \perp B" />，速度就始终留在这个平面内</div>

<div class="tip-hint">所以：带电粒子在<strong>垂直于磁感线</strong>的平面内做匀速圆周运动，这个平面由入射点与 <Latex tex="B" /> 唯一确定</div>

</div>

<PlanePerpB />

</div>

</div>

---
clicks: 2
---

# 圆周运动的半径

<div class="page-grow">

<div class="text-xl leading-relaxed" v-click="1">
<Latex tex="F_{\text{洛}} = qvB = F_{\text{向}} = m\dfrac{v^2}{r}" /> ⟹ <span class="text-accent"><Latex tex="r = \dfrac{mv}{qB}" /></span>
</div>

<CircularOrbit :radius="$clicks >= 1" emphasis="r" :hint="false" readout-only="r" />

</div>

---
clicks: 2
---

# 圆周运动的周期

<div class="page-grow">

<div class="text-xl leading-relaxed" v-click="1">
<Latex tex="T = \dfrac{2\pi r}{v}" />，代入 <Latex tex="r = \dfrac{mv}{qB}" /> ⟹ <span class="text-accent"><Latex tex="T = \dfrac{2\pi m}{qB}" /></span>
</div>

<CircularOrbit emphasis="T" :hint="false" readout-only="T" />

<div class="text-xl text-center" v-click="2">
<Latex tex="T" /> 与轨道半径、运动速度<strong class="text-danger">无关</strong>
</div>

</div>

---
clicks: 2
---

# $v$ 与 $B$ 成夹角 $\theta$ 时

<div class="ask text-xl">速度方向与磁场成夹角 <Latex tex="\theta" />，运动该怎么拆？</div>

<div class="page-grow">

<VDivideB :hint="false" />

<div class="grid grid-cols-2 gap-8">
<div class="text-lg leading-relaxed" v-click="1">
<Latex tex="v_\parallel = v\cos\theta" />：沿 <Latex tex="B" />，<strong>不受洛伦兹力</strong> ⟹ 匀速直线运动
</div>
<div class="text-lg leading-relaxed" v-click="2">
<Latex tex="v_\perp = v\sin\theta" />：垂直 <Latex tex="B" />，受 <Latex tex="F = qBv_\perp" /> ⟹ 匀速圆周运动
</div>
</div>

</div>

---
clicks: 2
---

# 合运动：螺旋线

<div class="page-grow">

<div class="grid grid-cols-2 gap-x-10 gap-y-1 text-lg">
<div><Latex tex="v_\parallel = v\cos\theta" />：沿 <Latex tex="B" />，不受力 ⟹ 匀速直线运动</div>
<div><Latex tex="v_\perp = v\sin\theta" />：垂直 <Latex tex="B" />，受 <Latex tex="F = qBv_\perp" /> ⟹ 匀速圆周运动</div>
</div>

<HelixPath />

<div class="text-center text-lg" v-click="1">
合运动：<strong class="text-accent">螺旋线</strong>，螺距 <Latex tex="d = v_\parallel T = v\cos\theta \cdot \dfrac{2\pi m}{qB}" />
</div>

</div>

---

# 比荷

<!-- 比荷：由 r、T 反解；它是粒子自身的固有属性，也是 1.4 质谱仪的原理伏笔 -->
<div class="ask text-xl">这三个式子里，哪一个量最能代表粒子本身？</div>

<div class="page-grow">

<div class="grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] items-center gap-8">

<div class="stack text-lg leading-relaxed">

<div><Latex tex="q/m" />（电荷量与质量之比）叫<strong>比荷</strong>，也叫荷质比</div>

<div>电荷量 <Latex tex="q" /> 越大 → 洛伦兹力越大；由 <Latex tex="F = ma" /> 得 <Latex tex="a = \dfrac{q}{m}vB" />，加速度正比于电荷量、反比于质量</div>

<div class="tip-hint">
<div class="opacity-80">把 <Latex tex="r = \dfrac{mv}{qB}" />、<Latex tex="T = \dfrac{2\pi m}{qB}" /> 反过来解：</div>
<div class="mt-1"><Latex tex="\dfrac{q}{m} = \dfrac{v}{Br}" />，<Latex tex="\dfrac{q}{m} = \dfrac{2\pi}{BT}" /></div>
</div>

<div class="text-base opacity-90">同一个磁场里量出半径或周期，就能算出比荷。</div>

</div>

<div>

<table class="charge-ratio-table w-full overflow-hidden rounded-xl border" style="border-color: color-mix(in srgb, var(--c-neutral-700) 60%, transparent)">
<thead>
<tr style="background-color: color-mix(in srgb, var(--c-surface-solid) 60%, transparent)">
<th class="text-left font-semibold">粒子</th>
<th class="text-left font-semibold">比荷</th>
</tr>
</thead>
<tbody>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td>电子</td>
<td><Latex tex="1.76\times10^{11}\ \text{C/kg}" /></td>
</tr>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td>质子</td>
<td><Latex tex="9.58\times10^{7}\ \text{C/kg}" /></td>
</tr>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td><Latex tex="\alpha" /> 粒子</td>
<td><Latex tex="4.79\times10^{7}\ \text{C/kg}" /></td>
</tr>
</tbody>
</table>

<div class="mt-2 text-center text-base opacity-80">比荷由粒子自身决定</div>

</div>

</div>

</div>


---

# 解这类题的思路：作三角形

<!-- 方法页：① 找圆心 ② 画轨迹 ③ 求半径 ④ 定圆心角 -->
<div class="ask text-xl">题目几乎都是已知几何、求半径这一类——从哪儿下手？</div>

<div class="page-grow">

<div class="half-grid items-center">

<div class="stack text-lg leading-relaxed">

<div>① <strong>找圆心</strong>：圆心在过入射点、垂直于 <Latex tex="v" /> 的直线上</div>

<div>② <strong>画轨迹</strong>：把圆弧画出来</div>

<div>③ <strong>求半径</strong>：弦、半径、圆心角放进三角形（勾股 + 三角函数）</div>

<div>④ <strong>定圆心角</strong>：<Latex tex="t = \dfrac{\alpha}{2\pi}T" />（<Latex tex="\alpha" /> 为圆心角）</div>

</div>

<TriangleMethod />

</div>

</div>


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

<div class="ask text-xl">一束<b>平行</b>带电粒子（同种、同速）水平射入一个<b>圆形匀强磁场区域</b>，出射后会散开，还是可能交于同一点？</div>

<FocusQuestion />

</div>

---
clicks: 3
---

# $r = R$ 时：出射点的位置

<div class="qp-page" style="--page-gap:.4rem;--hint-pad-y:.35rem">

<FocusProof :step="$clicks" />

<div class="stack stack-tight" style="gap:.35rem;font-size:.94em">

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

---
clicks: 4
---

# 例 5：求磁感应强度

<div class="ask text-lg mb-1">带负电的粒子（比荷 <Latex tex="\dfrac{q}{m}" />）从原点 <Latex tex="O" /> 沿 <Latex tex="x" /> 轴正半轴以 <Latex tex="v_0" /> 射入，磁场垂直纸面向里；经过第四象限的点 <Latex tex="P" />：<Latex tex="OP = L" />，<Latex tex="OP" /> 与 <Latex tex="y" /> 轴夹角 <Latex tex="\theta" />。求磁感应强度 <Latex tex="B" />。</div>

<div class="page-grow">

<div class="half-grid items-center">

<div class="stack text-lg leading-relaxed">

<div v-click="2">① 圆心在 <Latex tex="y" /> 轴上（<Latex tex="v_0 \perp B" />）；负电 + <Latex tex="B" /> 向里 ⟹ 力向下 ⟹ 圆心在 <Latex tex="O" /> 下方</div>

<div v-click="3">② 作三角形：<Latex tex="\cos\theta = \dfrac{L/2}{r}" /> ⟹ <Latex tex="r = \dfrac{L}{2\cos\theta}" /></div>

<div class="tip-hint" v-click="4"><Latex tex="B = \dfrac{mv_0}{qr} = \dfrac{2mv_0\cos\theta}{qL}" /></div>

</div>

<Example1Deflect :show-path="$clicks >= 1" :show-solution="$clicks >= 2" />

</div>

</div>

---
clicks: 4
---

# 例 6：求比荷

<div class="ask text-lg mb-1">第一象限内有垂直纸面向里、大小为 <Latex tex="B" /> 的匀强磁场；粒子从 <Latex tex="(0, a)" /> 沿 <Latex tex="x" /> 轴正半轴以 <Latex tex="v_0" /> 射出，经过 <Latex tex="x" /> 轴正半轴上的 <Latex tex="(b, 0)" />。求粒子的比荷 <Latex tex="\dfrac{q}{m}" />，并判断粒子带什么电。</div>

<div class="page-grow">

<div class="half-grid items-center">

<div class="stack text-lg leading-relaxed">

<div v-click="2">① 判电性：轨迹向下弯 ⟹ 洛伦兹力向下；<Latex tex="v" /> 沿 <Latex tex="+x" />、<Latex tex="B" /> 向里 ⟹ 粒子带<strong>负电</strong></div>

<div v-click="3">② 圆心在 <Latex tex="y" /> 轴上：<Latex tex="b^2 + y_0^2 = r^2" />，且 <Latex tex="r = a - y_0" /> ⟹ <Latex tex="r = \dfrac{a^2 + b^2}{2a}" /></div>

<div class="tip-hint" v-click="4"><Latex tex="\dfrac{q}{m} = \dfrac{v_0}{Br} = \dfrac{2av_0}{B\,(a^2 + b^2)}" />，粒子带负电</div>

</div>

<Example2ChargeMass :show-path="$clicks >= 1" :show-solution="$clicks >= 2" />

</div>

</div>

---
clicks: 3
---

# 例 7：沿半径射入，会沿什么方向射出？

<div class="ask text-lg mb-1">圆形匀强磁场区域，半径 <Latex tex="R" />、磁感应强度 <Latex tex="B" /> 垂直纸面向里。粒子从边界上的 <Latex tex="A" /> 点沿半径方向（指向圆心 <Latex tex="O" />）射入。证明：出射方向的反向延长线一定过圆心 <Latex tex="O" />。</div>

<div class="page-grow">

<div class="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] items-center gap-8">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 在 <Latex tex="A" /> 点：速度沿 <Latex tex="AO" />，而洛伦兹力既垂直于速度、又指向轨迹圆心 <Latex tex="C" /> ⟹ <Latex tex="AC \perp AO" />，即 <Latex tex="\angle OAC = 90^\circ" /></div>

<div v-click="2">② <Latex tex="OA = OM = R" />、<Latex tex="CA = CM = r" /> ⟹ 四边形 <Latex tex="OACM" /> 关于 <Latex tex="OC" /> 对称 ⟹ <Latex tex="\angle OMC = \angle OAC = 90^\circ" />，即 <Latex tex="OM \perp CM" /></div>

<div class="tip-hint" v-click="3">③ 出射速度 <Latex tex="v' \perp CM" /> ⟹ <Latex tex="v'" /> 沿 <Latex tex="OM" /> 方向 ⟹ <strong>反向延长线必过圆心 <Latex tex="O" /></strong></div>

</div>

<Example3RadialIn :show-path="$clicks >= 1" :show-aux="$clicks >= 2" :show-out="$clicks >= 3" />

</div>

</div>

---
clicks: 3
---

# 例 8：圆外换成方向相反的磁场

<div class="ask text-lg mb-1">接例 7：磁场区域外也是匀强磁场——方向与圆内相反（<strong>大小可以不同</strong>）。粒子射出后沿着怎样的轨迹走？它还会再次沿半径方向射回圆心吗？</div>

<div class="page-grow" style="--hint-pad-y:.5rem">

<div class="grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] items-center gap-8">

<div class="stack text-lg leading-relaxed" style="--stack-gap:.5rem">

<div v-click="1">① 粒子在 <Latex tex="M" /> 点射出时，速度沿半径向外</div>

<div v-click="2">② 出射速度 <Latex tex="v'" /> 垂直于圆内的半径 <Latex tex="CM" />、又沿 <Latex tex="OM" /> ⟹ 圆外轨迹的圆心 <Latex tex="C'" /> 也落在过 <Latex tex="M" />、垂直于 <Latex tex="OM" /> 的直线上——<strong>与圆外磁场多大无关</strong></div>

<div class="tip-hint" v-click="3">③ 把 <Latex tex="M" /> 关于直线 <Latex tex="OC'" /> 镜像得 <Latex tex="N" />：<Latex tex="O" /> 在镜像轴上 ⟹ <Latex tex="ON = OM = R" />（<Latex tex="N" /> 在边界上）、<Latex tex="\angle ONC' = \angle OMC' = 90^\circ" /> ⟹ 速度沿 <Latex tex="ON" />、<strong>指着圆心 <Latex tex="O" /></strong></div>

</div>

<Example4MirrorField :show-inner="$clicks >= 1" :show-outer="$clicks >= 2" :show-back="$clicks >= 3" />

</div>

</div>

---
clicks: 2
---

# 例 9：粒子能一直在磁场里吗？

<div class="ask text-lg mb-1">圆形匀强磁场区域，半径 <Latex tex="R" />、磁感应强度 <Latex tex="B" />。在边界上的 <Latex tex="P" /> 点以速率 <Latex tex="v_0" /> 向区域内发射粒子（方向可以任选）。问：比荷满足什么条件时，粒子无法保持在磁场中运动？</div>

<div class="page-grow">

<div class="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center gap-8">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 要一直留在磁场里，轨迹圆必须整个位于磁场区域内。沿与半径垂直的方向（切线方向）射入时，轨迹圆占用的区域最小：轨迹圆与边界在 <Latex tex="P" /> 点内切。此时只要 <Latex tex="r \le R" />，粒子就能一直留在磁场里做圆周运动</div>

<div class="tip-hint" v-click="2">② 一旦 <Latex tex="r > R" />，轨迹圆就无论如何都装不进去（它必须过边界上的 <Latex tex="P" /> 点），粒子一定会穿出磁场 ⟹ <Latex tex="\dfrac{q}{m} < \dfrac{v_0}{BR}" /></div>

</div>

<Example5Confine :show-small="$clicks >= 1" :show-big="$clicks >= 2" />

</div>

</div>

---
clicks: 3
---

# 例 9：怎样射入，能待得最久？

<div class="ask text-lg mb-1">圆形匀强磁场区域，半径 <Latex tex="R" />、磁感应强度 <Latex tex="B" />。比荷 <Latex tex="q/m" />、初速率 <Latex tex="v_0" /> 已知，轨迹半径 <Latex tex="r = \frac{mv_0}{qB} > R" />。从边界上的 <Latex tex="P" /> 点向区域内发射，方向任选。问：沿哪个方向射入，运动时间最长？这个方向满足什么关系？</div>

<div class="page-grow">

<div class="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] items-center gap-8">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① <Latex tex="t = \frac{\theta}{2\pi}T" />，而 <Latex tex="T = \frac{2\pi m}{qB}" /> 与方向无关 ⟹ <strong><Latex tex="\theta" /> 越大，待得越久</strong>；<Latex tex="r > R" /> 时场内那段弧必是劣弧，故 <Latex tex="\theta = 2\arcsin\frac{PQ}{2r}" /> 随弦 <Latex tex="PQ" /> 变长而变大</div>

<div v-click="2">② 区域里最长的弦就是直径 <Latex tex="2R" /> ⟹ 让<strong>入射点、出射点关于圆心 <Latex tex="O" /> 对称</strong>（弦过 <Latex tex="O" />）时 <Latex tex="\theta" /> 最大，且 <Latex tex="OP \perp OC" /></div>

<div v-click="3">③ 入射速度 <Latex tex="v_0" /> 与弦 <Latex tex="PQ" /> 的夹角 <Latex tex="\gamma" />：<Latex tex="\sin\gamma = \frac{R}{r} = \frac{qBR}{mv_0}" /></div>

</div>

<Example5MaxAngle :show-arc="$clicks >= 1" :show-angle="$clicks >= 3" />

</div>

</div>

---
clicks: 2
---

# 例 9：最长能待多久？

<div class="ask text-lg mb-1">沿这个方向射入，粒子在磁场中运动的时间是多少？</div>

<div class="page-grow">

<div class="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] items-center gap-8">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 把 <Latex tex="\theta_{\max} = 2\arcsin\dfrac{R}{r}" /> 代回 <Latex tex="t = \dfrac{\theta}{2\pi}T" />，并代入 <Latex tex="T = \dfrac{2\pi m}{qB}" /> 与 <Latex tex="r = \dfrac{mv_0}{qB}" /></div>

<div class="tip-hint" v-click="2">② <Latex tex="t_{\max} = \dfrac{m}{qB}\,\theta_{\max} = \dfrac{2m}{qB}\arcsin\dfrac{qBR}{mv_0}" />——<strong>它同时与比荷、入射速率有关</strong>，不再是单纯的 <Latex tex="\dfrac{\pi m}{qB}" /></div>

<div v-click="2">③ 两个极限：<Latex tex="r = R" />（轨迹圆恰好与边界内切）时 <Latex tex="t_{\max} = \dfrac{\pi m}{qB} = \dfrac{T}{2}" />；<Latex tex="r \to \infty" />（轨迹几乎成直线）时 <Latex tex="t_{\max} \to \dfrac{2R}{v_0}" /></div>

</div>

<Example5MaxAngle :show-arc="true" :show-angle="true" />

</div>

</div>

---
title: 课堂小结
---

<div class="page-grow">

<table class="w-full overflow-hidden rounded-xl border text-lg" style="border-color: color-mix(in srgb, var(--c-neutral-700) 60%, transparent)">
<thead>
<tr style="background-color: color-mix(in srgb, var(--c-surface-solid) 60%, transparent)">
<th class="px-4 py-2 text-left font-semibold">情形</th>
<th class="px-4 py-2 font-semibold">洛伦兹力</th>
<th class="px-4 py-2 font-semibold">运动</th>
</tr>
</thead>
<tbody>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td class="px-4 py-2"><Latex tex="v \parallel B" /></td>
<td class="px-4 py-2 text-center"><Latex tex="F_{\text{洛}} = 0" /></td>
<td class="px-4 py-2">匀速直线运动</td>
</tr>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td class="px-4 py-2"><Latex tex="v \perp B" /></td>
<td class="px-4 py-2 text-center"><Latex tex="F_{\text{洛}} = qvB" />（提供向心力）</td>
<td class="px-4 py-2">匀速圆周运动</td>
</tr>
<tr class="border-t" style="border-color: color-mix(in srgb, var(--c-neutral-700) 50%, transparent)">
<td class="px-4 py-2"><Latex tex="v" /> 与 <Latex tex="B" /> 成 <Latex tex="\theta" /></td>
<td class="px-4 py-2 text-center"><Latex tex="F_{\text{洛}} = qvB\sin\theta = qBv_\perp" /></td>
<td class="px-4 py-2">螺旋线，螺距 <Latex tex="d = v_\parallel T" /></td>
</tr>
</tbody>
</table>

<div class="grid grid-cols-2 gap-8">
<div class="text-center text-2xl"><Latex tex="r = \dfrac{mv}{qB}" /></div>
<div class="text-center text-2xl"><Latex tex="T = \dfrac{2\pi m}{qB}" /></div>
</div>

</div>
