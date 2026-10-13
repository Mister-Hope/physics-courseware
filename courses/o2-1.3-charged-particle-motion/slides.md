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
lesson: "第二课时"
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

<div class="key mt-4 text-xl">不受洛伦兹力 ⟹ 运动状态不改变 ⟹ <strong>匀速直线运动</strong></div>

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

<div class="key text-xl" v-click="1">
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

<table class="w-full overflow-hidden rounded-xl border border-slate-700/60 text-lg">
<thead>
<tr class="bg-slate-800/60">
<th class="px-4 py-2 text-left font-semibold">物理量</th>
<th class="px-4 py-2 font-semibold">大小</th>
<th class="px-4 py-2 font-semibold">方向</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-slate-700/50">
<td class="px-4 py-2"><Latex tex="v" /></td>
<td class="px-4 py-2 text-center">不变</td>
<td class="px-4 py-2 text-center text-accent">改变</td>
</tr>
<tr class="border-t border-slate-700/50">
<td class="px-4 py-2"><Latex tex="F_{\text{洛}}" /></td>
<td class="px-4 py-2 text-center">不变</td>
<td class="px-4 py-2 text-center text-accent">改变</td>
</tr>
</tbody>
</table>

<div class="mt-4 text-base leading-relaxed text-slate-400">
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

<div class="key text-xl" v-click="2">
③ 加速度大小不变、速度方向均匀改变 ⟹ <strong>匀速圆周运动</strong>
</div>

</div>

</div>

</div>

---
clicks: 2
---

# 圆周运动的半径

<div class="page-grow">

<div class="text-xl leading-relaxed" v-click="1">
<Latex tex="qvB = m\dfrac{v^2}{r}" /> ⟹ <span class="text-accent"><Latex tex="r = \dfrac{mv}{qB}" /></span>
</div>

<CircularOrbit :radius="$clicks >= 1" emphasis="r" :hint="false" />

</div>

---
clicks: 2
---

# 圆周运动的周期

<div class="page-grow">

<div class="text-xl leading-relaxed" v-click="1">
<Latex tex="T = \dfrac{2\pi r}{v}" />，代入 <Latex tex="r = \dfrac{mv}{qB}" /> ⟹ <span class="text-accent"><Latex tex="T = \dfrac{2\pi m}{qB}" /></span>
</div>

<CircularOrbit emphasis="T" :hint="false" />

<div class="text-xl text-center" v-click="2">
★ <Latex tex="T" /> 与轨道半径、运动速度<strong>无关</strong>（下一节回旋加速器就靠这条）
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

# 回顾：本课要用的三个式子

<!-- 工具页：把第 6、7 页得到的三个式子收在一起，直接带进"比荷 / 解题思路 / 例题" -->
<div class="page-grow">

<div class="stack">

<div class="flex items-center gap-6 text-xl">
<span class="w-40 shrink-0 text-right text-base text-slate-400">洛伦兹力</span>
<span><Latex tex="F_{\text{洛}} = qvB\sin\theta" />（<Latex tex="v \perp B" /> 时 <Latex tex="F_{\text{洛}} = qvB" />，方向由左手定则判定）</span>
</div>

<div class="flex items-center gap-6 text-xl">
<span class="w-40 shrink-0 text-right text-base text-slate-400">半径</span>
<span><Latex tex="qvB = m\dfrac{v^2}{r}" /> ⟹ <span class="text-accent"><Latex tex="r = \dfrac{mv}{qB}" /></span></span>
</div>

<div class="flex items-center gap-6 text-xl">
<span class="w-40 shrink-0 text-right text-base text-slate-400">周期</span>
<span><Latex tex="T = \dfrac{2\pi r}{v} = \dfrac{2\pi m}{qB}" />（与半径、速度无关）</span>
</div>

</div>

</div>

---

# 比荷

<!-- 比荷：由 r、T 反解；它是粒子自身的固有属性，也是 1.4 质谱仪的原理伏笔 -->
<div class="ask text-xl">这三个式子里，哪一个量最能代表"粒子本身"？</div>

<div class="page-grow">

<div class="half-grid items-center">

<div class="stack text-lg leading-relaxed">

<div><Latex tex="\dfrac{q}{m}" />（电荷量与质量之比）叫<strong>比荷</strong>，也叫荷质比</div>

<div>把 <Latex tex="r = \dfrac{mv}{qB}" />、<Latex tex="T = \dfrac{2\pi m}{qB}" /> 反过来解：</div>

<div class="key"><Latex tex="\dfrac{q}{m} = \dfrac{v}{Br}" />，<Latex tex="\dfrac{q}{m} = \dfrac{2\pi}{BT}" /></div>

<div class="text-base opacity-90">同一个磁场里量出半径或周期，就能算出比荷——这正是质谱仪区分不同粒子的依据。</div>

</div>

<div>

<table class="w-full overflow-hidden rounded-xl border border-slate-700/60 text-lg">
<thead>
<tr class="bg-slate-800/60">
<th class="px-4 py-2 text-left font-semibold">粒子</th>
<th class="px-4 py-2 font-semibold">比荷</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-slate-700/50">
<td class="px-4 py-2">电子</td>
<td class="px-4 py-2 text-center"><Latex tex="1.76\times10^{11}\ \text{C/kg}" /></td>
</tr>
<tr class="border-t border-slate-700/50">
<td class="px-4 py-2">质子</td>
<td class="px-4 py-2 text-center"><Latex tex="9.58\times10^{7}\ \text{C/kg}" /></td>
</tr>
<tr class="border-t border-slate-700/50">
<td class="px-4 py-2"><Latex tex="\alpha" /> 粒子</td>
<td class="px-4 py-2 text-center"><Latex tex="4.79\times10^{7}\ \text{C/kg}" /></td>
</tr>
</tbody>
</table>

<div class="mt-3 text-center text-base opacity-80">比荷由粒子自身决定，与速度、磁场无关</div>

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

<div class="key">所以：带电粒子在<strong>垂直于磁感线</strong>的平面内做匀速圆周运动，这个平面由入射点与 <Latex tex="B" /> 唯一确定</div>

</div>

<PlanePerpB />

</div>

</div>

---

# 解这类题的思路：作三角形

<!-- 方法页：① 找圆心 ② 画轨迹 ③ 求半径 ④ 定圆心角 -->
<div class="ask text-xl">题目几乎都是"已知几何、求半径"——从哪儿下手？</div>

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
clicks: 3
---

# 例 1：求磁感应强度

<div class="ask text-lg mb-1">带负电的粒子（比荷 <Latex tex="\dfrac{q}{m}" />）从原点 <Latex tex="O" /> 沿 <Latex tex="x" /> 轴正半轴以 <Latex tex="v_0" /> 射入，磁场垂直纸面向里；经过第四象限的点 <Latex tex="P" />：<Latex tex="OP = L" />，<Latex tex="OP" /> 与 <Latex tex="y" /> 轴夹角 <Latex tex="\theta" />。求磁感应强度 <Latex tex="B" />。</div>

<div class="page-grow">

<div class="half-grid items-center">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 圆心在 <Latex tex="y" /> 轴上（<Latex tex="v_0 \perp B" />）；负电 + <Latex tex="B" /> 向里 ⟹ 力向下 ⟹ 圆心在 <Latex tex="O" /> 下方</div>

<div v-click="2">② 作三角形：<Latex tex="\cos\theta = \dfrac{L/2}{r}" /> ⟹ <Latex tex="r = \dfrac{L}{2\cos\theta}" /></div>

<div class="key" v-click="3"><Latex tex="B = \dfrac{mv_0}{qr} = \dfrac{2mv_0\cos\theta}{qL}" /></div>

</div>

<Example1Deflect :show-solution="$clicks >= 1" />

</div>

</div>

---
clicks: 3
---

# 例 2：求比荷

<div class="ask text-lg mb-1">第一象限内有垂直纸面向里、大小为 <Latex tex="B" /> 的匀强磁场；粒子从 <Latex tex="(0, a)" /> 沿 <Latex tex="x" /> 轴正半轴以 <Latex tex="v_0" /> 射出，经过 <Latex tex="x" /> 轴正半轴上的 <Latex tex="(b, 0)" />。求粒子的比荷 <Latex tex="\dfrac{q}{m}" />，并判断粒子带什么电。</div>

<div class="page-grow">

<div class="half-grid items-center">

<div class="stack text-lg leading-relaxed">

<div v-click="1">① 判电性：轨迹向下弯 ⟹ 洛伦兹力向下；<Latex tex="v" /> 沿 <Latex tex="+x" />、<Latex tex="B" /> 向里 ⟹ 粒子带<strong>负电</strong></div>

<div v-click="2">② 圆心在 <Latex tex="y" /> 轴上：<Latex tex="b^2 + y_0^2 = r^2" />，且 <Latex tex="r = a - y_0" /> ⟹ <Latex tex="r = \dfrac{a^2 + b^2}{2a}" /></div>

<div class="key" v-click="3"><Latex tex="\dfrac{q}{m} = \dfrac{v_0}{Br} = \dfrac{2av_0}{B\,(a^2 + b^2)}" />，粒子带负电</div>

</div>

<Example2ChargeMass :show-solution="$clicks >= 1" />

</div>

</div>

---

# 课堂小结：

<div class="page-grow">

<table class="w-full overflow-hidden rounded-xl border border-slate-700/60 text-lg">
<thead>
<tr class="bg-slate-800/60">
<th class="px-4 py-2 text-left font-semibold">情形</th>
<th class="px-4 py-2 font-semibold">洛伦兹力</th>
<th class="px-4 py-2 font-semibold">运动</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-slate-700/50">
<td class="px-4 py-2"><Latex tex="v \parallel B" /></td>
<td class="px-4 py-2 text-center"><Latex tex="F_{\text{洛}} = 0" /></td>
<td class="px-4 py-2">匀速直线运动</td>
</tr>
<tr class="border-t border-slate-700/50">
<td class="px-4 py-2"><Latex tex="v \perp B" /></td>
<td class="px-4 py-2 text-center"><Latex tex="F_{\text{洛}} = qvB" />（提供向心力）</td>
<td class="px-4 py-2">匀速圆周运动</td>
</tr>
<tr class="border-t border-slate-700/50">
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
