---
theme: default
title: "法拉第电磁感应定律"
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
chapter-no: "2.2"
chapter: "第二章 电磁感应"
subtitle: "感应电动势的大小由什么决定"
---

<CoverDecor />

---
clicks: 3
title: 感应电流的大小与什么有关
---

<div class="ask">同一块磁体、同一个线圈：插得快一些，指针偏角一样大吗？</div>

<div class="page-grow">

<SpeedCluesSvg :step="$clicks" />

</div>

<div class="fl-hint-slot">

<div v-click="3" class="tip-hint">磁通量的变化量相同，指针偏角却不同——决定感应电流大小的，是磁通量变化的<b>快慢</b>。</div>

</div>

---
clicks: 1
title: 磁体从不同高度落下穿过线圈
---

<div class="ask">同一块磁体、同一个线圈：从越高处释放，为什么电压峰值越大？</div>

<div class="page-grow">

<DropThroughCoil />

</div>

<div class="fl-hint-slot">

<div v-click="1" class="tip-hint">穿过线圈的磁通量变化量相同；下落越快，穿过线圈所用的时间越短，磁通量变化率越大，电压峰值越高。</div>

</div>

---
clicks: 4
title: 断开回路，还有感应电动势吗
---

<div class="ask">把开关断开，回路里没有感应电流了——棒两端还有电动势吗？</div>

<div class="page-grow">

<div class="half-grid fl-fill fl-split-wide fl-steps items-center">

<div>

<OpenCircuitSvg :step="$clicks" />

</div>

<div class="stack">

<div v-click="1" class="summary-line">闭合：回路中有感应电流。</div>

<div v-click="2" class="summary-line">断开：电流为零。</div>

<div v-click="3" class="summary-line">但棒两端仍有电势差，用电压表可以测出来。</div>

<div v-click="4" class="tip-hint">有电动势。产生感应电动势的这段导体，就相当于电源。</div>

</div>

</div>

</div>

---
clicks: 1
title: 电动势与回路电阻无关
---

<div class="ask">把外电阻换大一些，感应电动势会变吗？感应电流呢？</div>

<div class="page-grow">

<ResistanceDemo />

</div>

<div class="fl-hint-slot">

<div v-click="1" class="tip-hint">电动势只由磁通量变化率（这里是 <Latex tex="Blv" />）决定，与外电阻无关；改变 <Latex tex="R" /> 时，变的是感应电流 <Latex tex="I = \dfrac{E}{R+r}" />。</div>

</div>

---
clicks: 2
title: 磁通量、磁通量变化量与变化率
---

<div class="ask">Φ 越大，感应电动势越大吗？</div>

<div class="page-grow">

<div class="half-grid fl-fill fl-split-wide items-start">

<div>

<CoordAxes
  :x-range="[0, 8]"
  :y-range="[0, 10]"
  :x-axis="{ quantity: 't', unit: 's' }"
  :y-axis="{ quantity: 'Φ', unit: 'Wb' }"
  :curves="[{ points: [{ x: 0, y: 2 }, { x: 2, y: 8 }, { x: 4, y: 8 }, { x: 5, y: 2 }, { x: 8, y: 5 }], color: 'var(--c-accent)', width: 3.4 }]"
  :labels="[{ x: 3, y: 8, text: 'Φ 最大，E = 0', anchor: 'top', size: 15, showAt: 1 }, { x: 4.7, y: 2, text: 'Φ 很小，变化很快', anchor: 'bottom-left', size: 15, showAt: 2 }]"
  :ticks="{ x: [], y: [] }"
  :step="$clicks"
  :view="{ width: 560, height: 400 }"
>
<template #overlay="{ x, y }">
<g v-if="$clicks >= 1" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5">
<line :x1="x(0)" :y1="y(2)" :x2="x(2)" :y2="y(2)" />
<line :x1="x(2)" :y1="y(2)" :x2="x(2)" :y2="y(8)" />
</g>
<g v-if="$clicks >= 1" font-family="KaTeX_Math, serif" font-style="italic" font-size="15" fill="var(--c-text-dim)">
<text :x="x(1)" :y="y(2) + 20" text-anchor="middle">Δt</text>
<text :x="x(2) - 12" :y="y(5)" text-anchor="end">ΔΦ</text>
</g>
</template>
</CoordAxes>

</div>

<div class="stack-dense">

<div class="mini-title">Φ</div>
<div>穿过回路的磁通量</div>

<div class="mini-title">ΔΦ</div>
<div>一段时间内磁通量的变化量</div>

<div class="mini-title">ΔΦ/Δt</div>
<div>磁通量变化的快慢——图线的斜率</div>

<div v-click="2" class="info-hint">感应电动势由 <Latex tex="\dfrac{\Delta\Phi}{\Delta t}" /> 决定，与 <Latex tex="\Phi" /> 本身的大小无关。</div>

</div>

</div>

</div>

---
clicks: 3
title: 法拉第电磁感应定律
---

<div class="ask">这个规律能不能写成一个定量关系？</div>

<div class="page-grow">

<div class="half-grid fl-split-wide">

<div class="stack">

<div v-click="1">

<DefinitionBox term="法拉第电磁感应定律" tone="gold">闭合电路中感应电动势的大小，跟穿过这一电路的磁通量的变化率成正比。</DefinitionBox>

</div>

<div v-click="2" class="text-center"><Latex tex="E = \dfrac{\Delta\Phi}{\Delta t}" display /></div>

<div v-click="3" class="text-center"><Latex tex="E = n\dfrac{\Delta\Phi}{\Delta t}" display /></div>

</div>

<div>

<MultiTurnCoilSvg />

<div v-click="3" class="mini-note">n 匝线圈串联，整个线圈的电动势是单匝的 n 倍。</div>

</div>

</div>

</div>

<div class="fl-hint-slot">

<div v-click="3" class="warn-hint">该式只给出大小；方向仍用楞次定律或右手定则判断。</div>

</div>

---
clicks: 4
title: 导线切割磁感线时的感应电动势
---

<div class="ask">棒在磁场中匀速滑动，产生的感应电动势有多大？</div>

<div class="page-grow">

<div class="half-grid fl-fill fl-split-wide items-center">

<div>

<CuttingRodSvg :step="$clicks" />

</div>

<div class="stack fl-steps">

<div v-click="1" class="summary-line">棒从 MN 移到 M₁N₁，位移 <Latex tex="v\Delta t" /></div>

<div v-click="2" class="summary-line">扫过的面积 <Latex tex="\Delta S = l\,v\Delta t" />。</div>

<div v-click="3" class="summary-line">磁通量变化 <Latex tex="\Delta\Phi = B\Delta S = Blv\Delta t" />。</div>

<div v-click="4" class="text-center"><Latex tex="E = \dfrac{\Delta\Phi}{\Delta t} = Blv" display /></div>

</div>

</div>

</div>

<div class="fl-hint-slot">

<div v-click="4" class="info-hint">适用条件：匀强磁场；<Latex tex="l \perp B" />；<Latex tex="v \perp B" />（三者两两垂直）。</div>

</div>

---
clicks: 1
title: v 与 B 不垂直时
---

<div class="ask">如果 <Latex tex="v" /> 与 <Latex tex="B" /> 不垂直，电动势还是 <Latex tex="Blv" /> 吗？</div>

<div class="page-grow">

<ObliqueCutDemo />

</div>

<div class="fl-hint-slot">

<div v-click="1" class="tip-hint">只有垂直于 <Latex tex="B" /> 的分速度 <Latex tex="v_\perp = v\sin\theta" /> 切割磁感线，<Latex tex="E = Blv\sin\theta" />。</div>

</div>

---
clicks: 4
title: 感应电动势的微观来源
---

<div class="ask">导线切割磁感线时，两端为什么会出现电势差？</div>

<div class="page-grow">

<div class="half-grid fl-fill fl-split-wide items-start">

<div>

<ChargeSeparationSvg :step="$clicks" />

</div>

<div class="stack-dense fl-text">

<div>棒向右运动，棒内自由电荷随之运动。</div>

<div v-click="1">受洛伦兹力：正电荷向上，负电荷向下。</div>

<div v-click="2">电荷在两端堆积，棒内出现由 <span style="color: var(--c-danger)">+</span> 指向 <span style="color: var(--c-velocity)">−</span> 的电场。</div>

<div v-click="3"><Latex tex="qE_{\text{电}} = qvB" />，平衡后两端电势差稳定：<Latex tex="U = E_{\text{电}} l = Blv" />。</div>

<div v-click="4" class="tip-hint">棒相当于电源：上端为正极，非静电力是洛伦兹力沿棒的分力。</div>

</div>

</div>

</div>

---
clicks: 4
title: 洛伦兹力不做功，电能从哪里来
---

<div class="ask">洛伦兹力不做功，感应电流的能量从哪里来？</div>

<div class="page-grow">

<div class="half-grid fl-fill fl-split-wide items-start">

<div>

<LorentzWorkSvg :step="$clicks" />

</div>

<div class="stack-dense fl-text fl-text-dense">

<div>电荷的实际速度是 <Latex tex="w = v + u" />：既随棒向右，又沿棒漂移。</div>

<div v-click="1"><Latex tex="F_{\text{洛}} \perp w" />，所以洛伦兹力不做功。</div>

<div v-click="2">把 <Latex tex="F_{\text{洛}}" /> 分解：<Latex tex="F_1 = qvB" /> 沿棒，做正功；<Latex tex="F_2 = quB" /> 逆着 <Latex tex="v" />，做负功。</div>

<div v-click="3"><Latex tex="F_2" /> 的宏观效果就是安培力。外力推棒克服安培力做功，机械能转化为电能。</div>

<div v-click="4" class="tip-hint">能量账：<Latex tex="P_{\text{外}} = F_{\text{安}} v = BIlv = EI" />。洛伦兹力不创造能量，它把外力做的机械功转化为电能。</div>

</div>

</div>

</div>

---
title: 课堂小结
---

# 课堂小结

<div class="page-grow">

<div class="fl-flow">
<span class="fl-flow-item">磁通量变化</span>
<span class="fl-flow-arrow">→</span>
<span class="fl-flow-item hot">变化率 <Latex tex="\dfrac{\Delta\Phi}{\Delta t}" /></span>
<span class="fl-flow-arrow">→</span>
<span class="fl-flow-item hot">感应电动势 <Latex tex="E" /></span>
<span class="fl-flow-arrow">→</span>
<span class="fl-flow-item">感应电流 <Latex tex="I = \dfrac{E}{R+r}" /></span>
</div>

<div class="half-grid">

<div class="stack">

<div class="mini-title">两个公式</div>

<div><Latex tex="E = n\dfrac{\Delta\Phi}{\Delta t}" />　（普适）</div>

<div><Latex tex="E = Blv\sin\theta" />　（切割）</div>

<div class="mini-note">三者两两垂直时，<Latex tex="E = Blv" />。</div>

</div>

<div class="stack divider-l">

<div class="mini-title">三个辨析</div>

<div><Latex tex="\Phi" /> 大，<Latex tex="E" /> 不一定大——看 <Latex tex="\dfrac{\Delta\Phi}{\Delta t}" />。</div>

<div><Latex tex="E" /> 与 <Latex tex="R" /> 无关；<Latex tex="I" /> 才与 <Latex tex="R" /> 有关。</div>

<div>方向另判：楞次定律或右手定则。</div>

</div>

</div>

<div class="info-hint">电源内部的非静电力：洛伦兹力沿棒方向的分力。</div>

</div>
