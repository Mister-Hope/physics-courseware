---
theme: default
title: "磁场对运动电荷的作用力"
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
chapter-no: "1.2"
chapter: "第一章 安培力与洛伦兹力"
---

<CoverDecor />

---

<!-- 引课：安培力回顾 + 追问电流本质（先问后答，点击后出微观图） -->
<div class="text-lg opacity-90">磁场对通电导线有力的作用——安培力
<Latex tex="F_{\text{安}} = BIL\sin\theta" />，方向由左手定则判定</div>

<div class="ask text-xl mt-4">导线里的电流，本质是什么？</div>

<div class="page-grow">

<div class="text-center text-xl leading-relaxed" v-click="1">电荷的<span class="text-accent font-semibold">定向移动</span></div>

<div v-click="1">

<WireCurrent />

</div>

</div>

---
clicks: 2
---

<!-- 推理链（板书"一、安培力再认识"）：①② 已知 → ③ 理论推导假说 → ④ 怎么验证（下一页进入阴极射线管） -->
<div class="ask text-xl">磁场对电流有力的作用，而电流就是电荷的定向移动——那么，磁场对运动电荷有力的作用吗？</div>

<div class="page-grow">

<div class="flex items-stretch justify-center gap-2">

<div class="w-44 min-h-[150px] flex flex-col justify-center rounded-xl border border-teal-300/45 bg-teal-400/10 p-2 text-center">
<div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-teal-300/70 text-[17px] font-bold text-teal-200">1<span class="ml-px text-teal-300">✓</span></div>
<div class="text-[1rem] leading-snug font-semibold">电流是电荷的<br>定向移动</div>
</div>

<div class="self-center text-xl text-slate-500">→</div>

<div class="w-44 min-h-[150px] flex flex-col justify-center rounded-xl border border-teal-300/45 bg-teal-400/10 p-2 text-center">
<div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-teal-300/70 text-[17px] font-bold text-teal-200">2<span class="ml-px text-teal-300">✓</span></div>
<div class="text-[1rem] leading-snug font-semibold">磁场对电流<br>有力的作用</div>
</div>

<div class="self-center text-xl text-slate-500">→</div>

<div class="w-44 min-h-[150px] flex flex-col justify-center rounded-xl border border-dashed border-amber-300/70 bg-amber-400/10 p-2 text-center" v-click="1">
<div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/80 text-[17px] font-bold text-amber-300">3<span class="ml-px text-amber-200">?</span></div>
<div class="text-[1rem] leading-snug font-semibold">磁场对运动电荷<br>有力的作用？</div>
<div class="mt-1.5 text-xs text-amber-200/80">理论推导的猜想</div>
</div>

<div class="self-center text-xl text-slate-500" v-click="1">→</div>

<div class="w-44 min-h-[150px] flex flex-col justify-center rounded-xl border border-sky-300/55 bg-sky-400/10 p-2 text-center" v-click="2">
<div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/75 text-[17px] font-bold text-sky-200">4</div>
<div class="text-[1rem] leading-snug font-semibold">设计实验验证</div>
<div class="mt-1.5 text-xs text-sky-200/80">怎么看见电荷？</div>
</div>

</div>

</div>

---
clicks: 3
---

# 设计实验：看见运动电荷

<!-- 阴极射线管结构：为什么能"看见"电子？分步高亮各部件 -->
<div class="page-grow">

<div class="half-grid items-center">

<div>

<div class="font-semibold text-lg mt-1">阴极发射电子</div>

<div class="text-base opacity-90 mt-1" v-click="1">高压电场使电子加速飞向阳极</div>

<div class="font-semibold text-lg mt-6">挡板上的狭缝</div>

<div class="text-base opacity-90 mt-1" v-click="2">只让一扁平的电子束通过</div>

<div class="font-semibold text-lg mt-6">荧光板</div>

<div class="text-base opacity-90 mt-1" v-click="3">电子束掠射荧光板，显示出径迹</div>

</div>

<div>

<CathodeRayTube :step="$clicks" />

</div>

</div>

</div>

---

# 演示：观察电子束在磁场中的偏转

<!-- 3D 演示实验：three.js 懒加载；按钮切换磁场方向，电子束在 3D 空间内偏转；
     偏转方向与受力说明由组件内的"观察记录"实时给出，这里不再重复一遍文字 -->
<div class="page-grow">

<BeamDeflect3D />

</div>

---
clicks: 1
---

# 洛伦兹力

<!-- 命名 + 核心总结（主落点）：实验验证后，给出定义与微观/宏观的关系 -->
<div class="ask text-xl">实验表明：磁场对运动电荷有力的作用。这个力叫什么？</div>

<div class="page-grow">

<div class="half-grid items-center" v-click="1">

<div>

<div class="key">

<strong>洛伦兹力</strong>：磁场对运动电荷的作用力。

</div>

<div class="mt-4 text-lg leading-relaxed">

<div class="py-1"><Latex tex="F_{\text{洛}}" /> 是 <Latex tex="F_{\text{安}}" /> 的<strong>微观本质</strong></div>

<div class="py-1"><Latex tex="F_{\text{安}}" /> 是 <Latex tex="F_{\text{洛}}" /> 的<strong>宏观表现</strong></div>

</div>

</div>

<div>

<OrthoArrows3D />

</div>

</div>

</div>

---
clicks: 3
---

# 用左手定则判定 $F_{\text{洛}}$ 的方向

<!-- 左手定则：先找等效电流方向，再比左手（含真实叉积计算的方向箭头） -->
<div class="ask text-xl mb-2">电子向右运动，磁场垂直纸面向外——<Latex tex="F_{\text{洛}}" /> 朝哪？</div>

<div class="page-grow">

<LeftHandRule :step="$clicks" />

</div>

---
clicks: 4
---

# 这四种情况，$F_{\text{洛}}$ 朝哪？

<!-- 判定练习：4 个场景（正负电荷 × B 方向），题干常显，点击逐题出答案 -->
<div class="page-grow">

<DirectionQuiz :step="$clicks" />

</div>

---
clicks: 3
---

# 由安培力推导 $F_{\text{洛}}$ 的大小

<!-- 推导思路：F_安 = BIL、F_安 = N·F_洛 → 还缺 N 与电流的微观构成 -->
<div class="ask text-xl">安培力是宏观表现——每个运动电荷受的力有多大？</div>

<div class="page-grow">

<div class="mt-5 text-lg leading-relaxed" v-click="1">
一段垂直磁场放置的导线：<Latex tex="F_{\text{安}} = BIL" />，且 <Latex tex="F_{\text{安}} = N F_{\text{洛}}" />（<Latex tex="N" />：这段导线中运动电荷的总数）
</div>

<div class="mt-4 text-lg" v-click="2">
要算出 <Latex tex="F_{\text{洛}}" />，还缺什么？——需要知道 <Latex tex="N" />，以及电流 <Latex tex="I" /> 的"微观构成"。
</div>

<div class="grid grid-cols-2 gap-8 mt-8" v-click="3">
<div class="text-center font-semibold text-lg">微观电流公式 <Latex tex="I = nqvS" /></div>
<div class="text-center font-semibold text-lg">电流的定义式 <Latex tex="I = \dfrac{Q}{t}" /></div>
</div>

</div>

---
clicks: 4
---

# 推导一：微观电流公式 $I = nqvS$

<!-- 推导法一：I = nqvS 与 N = nSL 代入约去（板书三③，仔细讲） -->
<div class="page-grow">

<div class="text-base opacity-90 mb-3">
设：一段长 <Latex tex="L" /> 的导线，横截面积 <Latex tex="S" />，单位体积内自由电荷数为 <Latex tex="n" />，每个电荷量 <Latex tex="q" />，定向移动速度 <Latex tex="v" />（<Latex tex="v \perp B" />）。
</div>

<div class="text-xl leading-relaxed" v-click="1">电流（微观）：<Latex tex="I = nqvS" /></div>

<div class="text-xl leading-relaxed mt-3" v-click="2">这段导线中的电荷总数：<Latex tex="N = nSL" /></div>

<div class="text-xl leading-relaxed mt-3" v-click="3">安培力：<Latex tex="F_{\text{安}} = BIL = B(nqvS)L" /></div>

<div class="mt-5 text-xl leading-relaxed" v-click="4">
<Latex tex="F_{\text{洛}} = \dfrac{F_{\text{安}}}{N} = \dfrac{B\,nqvS\,L}{nSL} = qvB" />
</div>

</div>

---
clicks: 3
---

# 推导二：电流的定义式 $I = \dfrac{Q}{t}$

<!-- 推导法二：I = Q/t，Q = Nq，t = L/v，殊途同归（板书三④，仔细讲） -->
<div class="page-grow">

<div class="text-base opacity-90 mb-3">
换一条路：时间 <Latex tex="t" /> 内通过横截面的总电荷 <Latex tex="Q = Nq" />（这段电荷全部通过所需时间 <Latex tex="t = \dfrac{L}{v}" />）。
</div>

<div class="text-xl leading-relaxed" v-click="1">
<Latex tex="I = \dfrac{Q}{t} = \dfrac{Nq}{L/v}" />
</div>

<div class="text-xl leading-relaxed mt-3" v-click="2">
<Latex tex="F_{\text{洛}} = \dfrac{BL}{N}\,I = \dfrac{BL}{N}\cdot\dfrac{Q}{t}" />
</div>

<div class="mt-5 text-xl leading-relaxed" v-click="3">
<Latex tex="F_{\text{洛}} = \dfrac{BL}{N}\cdot\dfrac{Nq}{L/v} = qvB" />　
</div>

</div>

---
clicks: 1
---

<!-- 一般式：分解 B，只有垂直分量产生力（提问页不写标题，问题本身就是内容）；★ v 是相对磁场的速度 -->
<div class="ask text-xl">速度与磁场成夹角 <Latex tex="\theta" /> 时，<Latex tex="F_{\text{洛}}" /> 多大？</div>

<div class="page-grow">

<div class="half-grid items-center" v-click="1">

<div>

<div class="text-lg leading-relaxed">
分解 <Latex tex="B" />：只有垂直于 <Latex tex="v" /> 的分量 <Latex tex="B_{\perp} = B\sin\theta" /> 产生力
</div>

<div class="key mt-5">

<Latex tex="F = qvB\sin\theta" />（<Latex tex="\theta" /> 为 <Latex tex="v" /> 与 <Latex tex="B" /> 的夹角）

</div>

<div class="mt-4 text-lg" style="color: var(--c-danger); font-weight: 600">★ <Latex tex="v" /> 是电荷相对磁场的速度</div>

</div>

<div>

<AngleDecompose />

</div>

</div>

</div>

---
clicks: 3
---

# 应用：显像管里的磁偏转

<!-- 显像管：无磁场打 O；偏转磁场使光点移动；扫描动画（教材"电子束的磁偏转"） -->
<div class="ask text-xl mb-2">想让光点打到屏上方 A 点，偏转磁场该朝哪个方向？</div>

<div class="page-grow">

<CRTScan :step="$clicks" />

</div>

---
clicks: 3
---

# 电子的洛伦兹力有多大？

<!-- 例题：教材 1.2 练习 1，分步代入计算 -->
<div class="ask text-xl">
电子以 <Latex tex="v = 3.0\times10^6\ \text{m/s}" /> 的速度，沿着与磁场垂直的方向射入 <Latex tex="B = 0.10\ \text{T}" /> 的匀强磁场。它受到的洛伦兹力是多大？
</div>

<div class="page-grow">

<div class="mt-5 text-lg leading-relaxed" v-click="1">
<Latex tex="v \perp B" />，用 <Latex tex="F = qvB" />；电子的电荷量 <Latex tex="q = e = 1.6\times10^{-19}\ \text{C}" />
</div>

<div class="mt-4 text-lg leading-relaxed" v-click="2">
<Latex tex="F = 1.6\times10^{-19} \times 3.0\times10^6 \times 0.10\ \text{N}" />
</div>

<div class="key mt-5 text-xl" v-click="3">
<Latex tex="F = 4.8\times10^{-14}\ \text{N}" />
</div>

</div>

---

<!-- 第一课时课堂小结：把推理链的每一步连"角色"一起交代清楚（条件→推理→验证→结论） -->
# 课堂小结

<div class="page-grow">

<div class="mx-auto w-[720px]">

<div class="flex items-center gap-4 py-1.5 text-lg">
<span class="w-16 shrink-0 text-right text-base text-slate-500">条件</span>
<span class="font-bold text-teal-300">①</span>
<span>电流是电荷的定向移动</span>
</div>

<div class="flex items-center gap-4 py-1.5 text-lg">
<span class="w-16 shrink-0 text-right text-base text-slate-500">条件</span>
<span class="font-bold text-teal-300">②</span>
<span>磁场对电流有力的作用</span>
</div>

<div class="flex items-center gap-4 py-1.5 text-lg">
<span class="w-16 shrink-0 text-right text-base text-slate-500">理论推导</span>
<span class="font-bold text-amber-300">③</span>
<span>磁场对运动电荷有力的作用</span>
</div>

<div class="flex items-center gap-4 py-1.5 text-lg">
<span class="w-16 shrink-0 text-right text-base text-slate-500">实验验证</span>
<span class="font-bold text-teal-300">④ ✓</span>
<span>阴极射线管实验证实</span>
</div>

<div class="key mt-5 text-lg">
⑤ <strong>洛伦兹力</strong>：<Latex tex="F_{\text{洛}}" /> 是 <Latex tex="F_{\text{安}}" /> 的微观本质，<Latex tex="F_{\text{安}}" /> 是 <Latex tex="F_{\text{洛}}" /> 的宏观表现
</div>

<div class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-xl">
<span>方向：<strong>左手定则</strong>（<Latex tex="F_{\text{洛}} \perp v" />、<Latex tex="F_{\text{洛}} \perp B" />）</span>
<span>大小：<Latex tex="F_{\text{洛}} = qvB\sin\theta" /></span>
</div>

</div>

</div>

---
clicks: 1
---

<!-- 思考题（第一课时收尾 / 第二课时引课）：三个候选轨迹常显，点一下才判对错 -->
<div class="ask text-xl mb-3">洛伦兹力只改变速度的方向、不改变速度的大小——电子束会走出什么轨迹？</div>

<div class="page-grow">

<TrajectoryPredict :step="$clicks" />

</div>

---
layout: course-cover
title: "带电粒子在匀强磁场中的运动"
chapter-no: "1.3"
chapter: "第一章 安培力与洛伦兹力"
lesson: "第二课时"
subtitle: "洛伦兹力理解"
---

<CoverDecor />

---
clicks: 1
---

# v 与 B 平行时

<div class="ask text-xl">电子沿着磁感线方向射入（<Latex tex="v \parallel B" />），它还受洛伦兹力吗？</div>

<div class="page-grow">

<div class="half-grid items-center gap-6">

<div>

<VDivideB :initial-theta="0" :hint="$clicks >= 1" />

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

# v 与 B 垂直时

<div class="ask text-xl">用洛伦兹力演示仪垂直射入电子束，径迹是什么形状？</div>

<div class="page-grow">

<CircularOrbit :force="$clicks >= 1" :radius="$clicks >= 1" />

</div>

---
clicks: 2
---

# 为什么是匀速圆周运动？

<div class="page-grow">

<div class="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-8">

<div>

<table class="w-full overflow-hidden rounded-xl border border-slate-700/60 text-lg">
<tr class="bg-slate-800/60">
<th class="px-4 py-2 text-left font-semibold">物理量</th>
<th class="px-4 py-2 font-semibold">大小</th>
<th class="px-4 py-2 font-semibold">方向</th>
</tr>
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

# v 与 B 成夹角 θ 时

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
clicks: 3
---

# 从 O 到 A 要多久？

<div class="ask text-xl">A 点恰好在沿 <Latex tex="B" /> 方向一个螺距之外——这段路要走多久？</div>

<div class="page-grow">

<div class="stack">

<div class="text-xl leading-relaxed" v-click="1">
① 沿 <Latex tex="B" /> 方向（匀速直线）：<Latex tex="t_{OA} = \dfrac{x_{OA}}{v_\parallel}" />
</div>

<div class="text-xl leading-relaxed" v-click="2">
② 垂直纸面方向（匀速圆周）：<Latex tex="t_{OA} = T = \dfrac{2\pi m}{qB}" />
</div>

<div class="text-xl leading-relaxed" v-click="3">
③ 看合运动（<Latex tex="F_{\text{洛}}" /> 不做功、速率 <Latex tex="v" /> 始终不变）：<Latex tex="t_{OA} = \dfrac{l_{OA}}{v}" />，<Latex tex="l_{OA}" /> 是路程
</div>

<div class="key text-xl" v-click="3">
三种算法结果相同：<Latex tex="x_{OA} = v\cos\theta \cdot T" />，所以 <Latex tex="t_{OA} = \dfrac{x_{OA}}{v\cos\theta} = T" />
</div>

</div>

</div>

---

# 小结：三种情形

<div class="page-grow">

<table class="w-full overflow-hidden rounded-xl border border-slate-700/60 text-lg">
<tr class="bg-slate-800/60">
<th class="px-4 py-2 text-left font-semibold">情形</th>
<th class="px-4 py-2 font-semibold">洛伦兹力</th>
<th class="px-4 py-2 font-semibold">运动</th>
</tr>
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
</table>

<div class="grid grid-cols-2 gap-8">
<div class="text-center text-2xl"><Latex tex="r = \dfrac{mv}{qB}" /></div>
<div class="text-center text-2xl"><Latex tex="T = \dfrac{2\pi m}{qB}" /></div>
</div>

</div>
