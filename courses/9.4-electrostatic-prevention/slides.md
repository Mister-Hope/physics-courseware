---
theme: default
title: "静电的防止与利用"
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
chapter-no: "9.4"
chapter: "第九章 静电场及其应用"
subtitle: "从静电平衡到尖端放电、静电屏蔽与静电吸附"
---

<CoverDecorationSvg />

---
clicks: 1
title: "加油前为什么要摸静电释放器"
---

<div class="page-grow">

<div class="half-grid">

<ChargingStationSvg :show-grounding="$clicks >= 1" />

<div class="stack">

<div class="ask text-2xl">在加油站给车加油前，为什么要触摸一下静电释放器？</div>

<div class="info-hint" v-click="1">静电释放器用导线与大地相连。</div>

</div>

</div>

</div>

---
clicks: 2
title: "导体进入电场"
---

<div class="page-grow">

<div class="half-grid">

<ConductorInFieldSvg :show-charges="$clicks >= 1" :show-induced-field="$clicks >= 2" />

<div class="stack">

<div class="ask text-2xl">把一个不带电的金属导体放进匀强电场，导体中的自由电子会怎样运动？</div>

<div class="info-hint" v-click="1">自由电子受静电力向左移动，<Latex tex="AB" /> 侧带负电，<Latex tex="CD" /> 侧带正电。</div>

<div class="tip-hint" v-click="2">感应电荷在导体内部产生与 <Latex tex="E_0" /> 方向相反的电场 <Latex tex="E'" />。</div>

</div>

</div>

</div>

---
clicks: 2
title: "自由电子什么时候停下来"
---

<div class="page-grow">

<div class="half-grid">

<ConductorEquilibriumDemo :step="$clicks" />

<div class="stack">

<div class="ask">自由电子什么时候停止定向移动？</div>

<div class="info-hint" v-click="1"><Latex tex="E'" /> 与 <Latex tex="E_0" /> 反向，导体内合场强 <Latex tex="E_{\text{内}}=E_0-E'" /> 随 <Latex tex="E'" /> 增大而减小。</div>

<div class="stack" v-click="2">

<DefinitionBox term="静电平衡">处于静电平衡状态的导体，其内部的电场强度处处为 <Latex tex="0" />。</DefinitionBox>

<div class="tip-hint">外电场换成更强的一档，平衡时仍然是 <Latex tex="E'=E_0" />、<Latex tex="E_{\text{内}}=0" />；自由电子不再发生定向移动。</div>

</div>

</div>

</div>

</div>

---
clicks: 3
title: "电荷分布在哪里"
---

<div class="page-grow">

<div class="half-grid">

<SurfaceChargeSvg :step="$clicks" />

<div class="stack">

<div class="ask">静电平衡时，电荷分布在导体的什么位置？表面各处一样密吗？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">导体内部没有净电荷，电荷只分布在导体的外表面。</div>

<div class="warn-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">内部仍有自由电子和正离子，只是净电荷为零。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">越尖锐的位置，电荷的密度（单位面积的电荷量）越大。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="3">尖端周围的电场强度更大。</div>

</div>

</div>

</div>

---
clicks: 3
title: "尖端放电"
---

<div class="page-grow">

<div class="half-grid">

<TipDischargeDemo :step="$clicks" />

<div class="stack">

<div class="ask">尖端周围的强电场会对空气做什么？尖端上的电荷最后去了哪里？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">强电场使空气分子中的正负电荷分离，这叫空气的电离。</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">带电粒子被加速、撞击更多分子，进一步电离。</div>

<div style="font-size: 0.95rem; line-height: 1.55" v-click="3">

<DefinitionBox term="尖端放电">与尖端电荷异号的粒子奔向尖端中和，相当于导体从尖端失去电荷。</DefinitionBox>

</div>

</div>

</div>

</div>

---
clicks: 2
title: "尖端放电的利用与防止"
---

<div class="page-grow">

<div class="half-grid">

<TipApplicationsSvg :step="$clicks" />

<div class="stack">

<div class="ask">避雷针为什么能避雷？高压设备为什么要把表面做得尽量光滑？</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">雷雨云接近时，金属棒静电感应出与云层相反的电荷；尖端放电把这些电荷释放到大气中，避免雷击。</div>

<div class="warn-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">尖端放电会造成高压设备电能损失，所以导体表面应尽量光滑；夜间高压线周围的绿色光晕是电晕。</div>

</div>

</div>

</div>

---
layout: exercise-split
clicks: 2
title: "点火器与验电器"
---

<template v-slot:stem>

在燃气灶和燃气热水器中，常常安装电子点火器，接通电子线路时产生高电压，通过高压放电的电火花来点燃气体。点火器的放电电极是钉尖形。这是为什么？与此相反，验电器的金属杆上端却固定一个金属球而不做成针尖状，这又是为什么？

</template>

<template v-slot:fig>

<div class="warn-hint" style="font-size: 0.9rem; line-height: 1.5">例题配图待补（本题大概率会换）：点火器钉尖电极 / 验电器金属球</div>

</template>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">钉尖：电荷密度大 → 场强大 → 空气电离 → 产生电火花。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">金属球：电荷密度小、场强弱，不易放电。所以点火器用钉尖产生电火花，验电器用金属球避免电荷流失。</div>

---
clicks: 3
title: "空腔导体"
---

<div class="page-grow">

<div class="half-grid">

<CavityConductorSvg :step="$clicks" />

<div class="stack">

<div class="ask">把一个空腔导体放进电场，空腔内部有电场吗？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">静电平衡时，外表面出现感应电荷；外部电场线不能进入导体。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">内表面没有电荷，导体壳壁 <Latex tex="W" /> 内的电场强度为 <Latex tex="0" />。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="3">所以空腔内的电场强度处处为 <Latex tex="0" />；无论外部电场如何，导体内部都没有电场。</div>

</div>

</div>

</div>

---
clicks: 3
title: "金属网也能屏蔽吗"
---

<div class="page-grow">

<div class="half-grid">

<ShieldingDemo :mode="$clicks <= 1 ? 0 : $clicks - 1" />

<div class="stack">

<div class="ask">带电球靠近验电器，箔片会张开吗？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">静电感应使箔片带同种电荷而张开。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">金属网罩住后，网内场强为 <Latex tex="0" />，箔片不张开。</div>

<div style="font-size: 0.95rem; line-height: 1.55" v-click="3">

<DefinitionBox term="静电屏蔽">导体壳（或金属网）内部场强为 <Latex tex="0" />，不影响壳内仪器。</DefinitionBox>

<div class="info-hint">金属网也能屏蔽，不必密封。</div>

</div>

</div>

</div>

</div>

---
clicks: 3
title: "静电屏蔽的应用"
---

<div class="page-grow">

<div class="half-grid">

<ShieldApplicationsSvg :step="$clicks" />

<div class="stack">

<div class="ask">这三处分别屏蔽了什么？它们的共同点是什么？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">两条屏蔽线与大地相连，形成金属网，把高压线屏蔽起来。</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">金属丝织物形成导体壳，人体内部场强为 <Latex tex="0" />。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="3">金属屏蔽层挡住干扰电场；共同点：用导体包围要保护的区域，使内部 <Latex tex="E=0" />。</div>

</div>

</div>

</div>

---
clicks: 1
title: "静电的危害"
---

<div class="page-grow stack">

<div class="ask text-2xl">静电火花为什么必须警惕？</div>

<div class="half-grid">

<div class="stack items-center">

<mdi-hospital-building class="icon-lg text-accent" />

<div>医院手术台：麻醉剂</div>

</div>

<div class="stack items-center">

<mdi-mine class="icon-lg text-accent" />

<div>煤矿：瓦斯</div>

</div>

</div>

<div class="warn-hint" v-click="1">医院手术台上，静电火花可能引起麻醉剂爆炸；煤矿里，静电火花会引起瓦斯爆炸。</div>

</div>

---
clicks: 3
title: "雷火炼殿"
---

<div class="page-grow">

<div class="half-grid">

<LeihuoHallSvg :step="$clicks" />

<div class="stack">

<div class="ask">金殿是优良导体，为什么雷雨天屋顶会出现“火球”？为什么后来装了避雷设施，奇观就消失了？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">云层与金殿顶部形成巨大电压，空气电离产生电弧（闪电），电弧使空气剧烈膨胀，看似火球。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">金殿顶部少尖，不易尖端放电，电压升得更高。</div>

<div class="warn-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="3">金殿安装避雷设施、免遭雷击后，奇观消失了。</div>

</div>

</div>

</div>

---
clicks: 3
title: "静电除尘"
---

<div class="page-grow">

<div class="half-grid">

<ElectrostaticPrecipitatorDemo :step="$clicks" />

<div class="stack">

<div class="ask">烟气中的粉尘为什么会自己跑到正极板上？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1"><Latex tex="B" /> 附近电场最强，空气分子被电离成正离子和电子。</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">电子在向正极 <Latex tex="A" /> 运动的过程中，遇到烟气中的粉尘，使粉尘带负电。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="3">带负电的粉尘受静电力 <Latex tex="F=qE" /> 向正极 <Latex tex="A" /> 运动，吸附在 <Latex tex="A" /> 上，最后落入漏斗。</div>

</div>

</div>

</div>

---
clicks: 2
title: "静电喷漆与静电复印"
---

<div class="page-grow">

<div class="half-grid">

<StaticAdsorptionApplicationsSvg :step="$clicks" />

<div class="stack">

<div class="ask">喷漆和复印分别利用了静电吸附的什么特点？</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">接负高压的雾化器喷出的油漆微粒带负电，受静电力向正极工件运动并沉积。</div>

<div class="info-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">有机光导体鼓（OPC）无光照时是绝缘体，受光照时变成导体；复印机利用静电吸附完成复印。</div>

</div>

</div>

</div>

---
clicks: 4
title: "四个判断"
---

<div class="page-grow stack">

<div class="ask">下面四种说法，哪些正确？</div>

<div class="half-grid">

<div class="stack">

<div>1. 静电平衡时，导体内部没有电荷。</div>

<div class="danger-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">错：导体内部没有<strong>净</strong>电荷，自由电子和正离子仍在；净电荷只分布在外表面。</div>

<div>2. 导体表面越尖锐处，电荷越多。</div>

<div class="danger-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">错：不是电荷总数更多，而是电荷密度（单位面积电荷量）更大。</div>

</div>

<div class="stack">

<div>3. 静电屏蔽必须用密封金属壳，金属网不行。</div>

<div class="danger-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="3">错：金属网也能屏蔽。</div>

<div>4. 静电平衡时，导体内部的合场强处处为零。</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="4">对：这是静电平衡的定义；它只说“内部”，导体表面附近场强不为 <Latex tex="0" />。四条中只有这条正确——其余盯住“净”“密度”“必须”。</div>

</div>

</div>

</div>

---
clicks: 2
title: "回到加油站"
---

<div class="page-grow">

<div class="half-grid">

<ChargingStationSvg :show-grounding="true" :show-charge-flow="$clicks >= 1" :show-spark="$clicks >= 2" />

<div class="stack">

<div class="ask">现在能回答开头的问题了吗？触摸静电释放器，人体上的电荷去了哪里？</div>

<div class="tip-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="1">人体与衣服摩擦带电；触摸与大地相连的静电释放器时，人体上的电荷经释放器转移，人体不再带电。</div>

<div class="warn-hint" style="font-size: 0.95rem; line-height: 1.55" v-click="2">若人体带电，加油时可能产生放电火花；在汽油蒸气环境中，这可能引发危险。</div>

</div>

</div>

</div>

---
layout: exercise-split
clicks: 2
title: "塑料瓶里的烟雾为什么消失"
---

<template v-slot:stem>

一个没有底的空塑料瓶上固定着一根铁锯条和一块易拉罐（金属）片，把它们分别跟静电起电机的两极相连。在塑料瓶里放一盘点燃的蚊香，很快就看见整个透明塑料瓶里烟雾缭绕。摇动起电机，顿时塑料瓶清澈透明；停止摇动，又是烟雾缭绕。起电机摇动时，塑料瓶内哪里电场强度最大？是锯条附近还是金属片附近？若锯条接电源负极，金属片接正极，这些烟尘最终到哪里去了？

</template>

<template v-slot:fig>

<div class="warn-hint" style="font-size: 0.9rem; line-height: 1.5">例题配图待补（本题大概率会换）：塑料瓶 + 铁锯条 + 易拉罐金属片 + 静电起电机</div>

</template>

<div class="info-hint" style="font-size: 0.92rem; line-height: 1.42" v-click="1">锯条有尖端，电荷密度大，附近场强最大，空气被电离。</div>

<div class="tip-hint" style="font-size: 0.92rem; line-height: 1.42" v-click="2">电子使烟尘带负电，负电烟尘受静电力吸附到金属片上。</div>

---
clicks: 4
title: "两条线索"
---

<div class="page-grow stack">

<div class="ask">今天的内容可以分成哪两条线索？</div>

<SummaryMapSvg :step="$clicks" />

<div class="tip-hint" v-click="4">导体的电荷分布由静电平衡决定；带电微粒的运动由静电力 <Latex tex="F=qE" /> 决定。</div>

</div>
