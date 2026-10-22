---
theme: default
title: "涡流、电磁阻尼和电磁驱动"
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
chapter-no: "2.3"
chapter: "第二章 电磁感应"
lesson: "第一课时"
subtitle: "整块导体中的感应电流"
---

<CoverDecor />

---
title: 引课：一只不烫的炉盘
clicks: 1
---

<div class="ask text-xl">炉盘摸上去并不烫，锅底却很快烧热——热是从哪里来的？</div>

<div class="page-grow">

<InductionCooker :step="$clicks >= 1 ? 1 : 0" />

</div>

---
title: 回路在哪里
clicks: 2
---

# 回路在哪里

<div class="page-grow">

<div class="ask">感应电流要"闭合回路"和"磁通量变化"。铁锅底是一整块金属，回路在哪里？</div>

<div class="text-lg" v-click="1">整块金属可以看作由许多闭合回路组成——回路不一定由导线画出。</div>

<div class="tip-hint" v-click="2">但还有一步没有解决：变化的磁场，凭什么推动金属中的自由电荷？</div>

</div>

---
title: 感生电场
clicks: 1
---

# 感生电场

<div class="page-grow">

<div class="half-grid items-center gap-6">

<div>

<div class="text-lg leading-relaxed">静止的电荷周围有静电场。那么，<strong>变化的磁场</strong>周围呢？</div>

<div class="mt-3 text-lg leading-relaxed">麦克斯韦指出：变化的磁场会在空间激发一种电场，叫作<strong>感生电场</strong>。它和静电场不同——不由电荷产生。</div>

<div class="tip-hint mt-4" v-click="1">导体中的自由电荷在感生电场的作用下定向移动，形成感应电流。</div>

</div>

<InducedFieldOne mode="up" />

</div>

</div>

---
title: 感生电场的方向
clicks: 1
---

<div class="ask">磁场垂直纸面向里。它增强、减弱时，感生电场分别朝哪个方向？</div>

<div class="page-grow">

<div class="half-grid gap-6">

<div class="fig-cap-sm"><InducedFieldOne mode="up" /></div>

<div class="fig-cap-sm"><InducedFieldOne mode="down" /></div>

</div>

<div class="text-lg mt-2" v-click="1">判据还是楞次定律：感生电场产生的"感应电流的磁场"，总要阻碍原磁通量的变化。</div>

</div>

---
title: 电子感应加速器
clicks: 4
---

# 电子感应加速器

<div class="page-grow">

<div class="half-grid items-center gap-6">

<BetatronSvg />

<div class="stack text-lg">

<div class="mini-note">线圈中的电流由小变大</div>

<div v-click="1">磁场由弱变强</div>

<div v-click="2">真空室中产生顺时针方向的感生电场</div>

<div class="tip-hint" v-click="3">电子带负电，受力方向与电场相反，所以沿逆时针方向不断被加速</div>

</div>

</div>

</div>

---
title: 涡流
clicks: 1
---

# 涡流

<div class="page-grow">

<div class="half-grid items-center gap-6">

<EddyCurrentBlock />

<div class="stack text-lg">

<div>当导体中的磁通量发生变化时，<strong>整块导体</strong>内部也会产生感应电流。</div>

<div>回路不必由导线画出——整块金属里到处都有闭合路径。</div>

<div class="tip-hint" v-click="1">这些电流在导体内部一圈圈闭合，像水中的漩涡，所以叫<strong>涡流</strong>。</div>

</div>

</div>

</div>

---
title: 涡流的热效应
clicks: 2
---

<div class="ask text-xl">回到电磁炉：热到底是怎么产生的？</div>

<div class="page-grow">

<div class="fig-cap-xs"><InductionCooker :step="4" /></div>

<div class="mt-1 text-lg" v-click="1">线圈中的交变电流 → 交变磁场 → 锅底涡流 → 焦耳热</div>

<div class="tip-hint" v-click="2">整块金属电阻很小，涡流可以很大，热量足以把锅烧热；陶瓷是绝缘体，不会产生涡流。</div>

</div>

---
title: 涡流的利用
clicks: 1
---

<div class="page-grow">

<div class="ask">同一种涡流，有些地方要靠它发热、靠它起作用。看两处例子。</div>

<div class="fig-cap-lg"><EddyUses /></div>

<div class="text-lg" v-click="1">真空冶炼炉在真空中熔化金属，避免杂质进入；探雷器和安检门靠涡流的磁场反过来影响线圈中的电流。</div>

</div>

---
title: 怎样减小有害的涡流
clicks: 2
---

<div class="page-grow">

<div class="ask">电动机、变压器的铁芯里也有涡流。它让铁芯发热、浪费能量，还可能损坏电器。</div>

<div class="fig-cap-tight"><LaminatedCore /></div>

<div class="text-base mt-1" v-click="1">① 增大电阻率：用电阻率较大的硅钢代替普通钢</div>

<div class="text-base mt-1" v-click="2">② 用互相绝缘的硅钢片叠成铁芯：涡流只能在每一薄片内闭合，回路短、电阻大、电流小</div>

</div>

---
title: 第一课时小结
---

# 第一课时小结

<div class="page-grow">

<div class="stack text-lg">

<div><strong>变化的磁场</strong> → 感生电场 → 导体中的感应电流</div>

<div>整块导体中的感应电流 → <strong>涡流</strong> → 热效应</div>

<div>涡流可以<strong>利用</strong>（冶炼、电磁炉、探雷器），也可以<strong>减小</strong>（硅钢、叠片）</div>

</div>

</div>

---
layout: course-cover
title: "涡流、电磁阻尼和电磁驱动"
lesson: "第二课时"
subtitle: "电磁阻尼与电磁驱动"
---

<CoverDecor />

---
title: 引课：谁在给它刹车
clicks: 1
---

<div class="ask text-xl">两个完全相同的金属摆。右边的摆锤在两磁极之间摆动，为什么它很快就停了？</div>

<div class="page-grow">

<SwingDamper :step="$clicks" />

</div>

---
title: 线圈落入磁场
clicks: 2
---

# 线圈落入磁场

<div class="page-grow">

<div class="grid gap-6 items-center grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">

<LoopInField :show-forces="$clicks >= 1" />

<div class="stack text-lg">

<div class="ask">线圈落入磁场，会怎样？</div>

<div v-click="1">下落 → 穿过线圈的磁通量增加</div>

<div v-click="1">感应电流逆时针（从上往下看）</div>

<div v-click="2">下边电流向右，安培力向上</div>

<div class="tip-hint" v-click="2">安培力阻碍线圈下落</div>

</div>

</div>

</div>

---
title: 电磁阻尼
clicks: 1
---

# 电磁阻尼

<div class="page-grow">

<DefinitionBox term="电磁阻尼">

<div>导体在磁场中运动时，感应电流使导体受到安培力，安培力总是<strong>阻碍导体的运动</strong>。</div>

</DefinitionBox>

<div class="mt-4 text-lg">能量：机械能 → 电能 → 焦耳热</div>

<div class="tip-hint" v-click="1">让摆很快停下的不是"磁场的吸力"，而是摆锤中感应电流受到的安培力。</div>

</div>

---
title: 磁电式仪表的铝框
clicks: 2
---

<div class="ask">微安表的线圈绕在铝框上。用导线把两个接线柱短接，再晃动表壳，指针会怎样？</div>

<div class="page-grow">

<div class="fig-cap-tight"><MeterDamper :step="$clicks" /></div>

<div class="mt-1 text-lg" v-click="1">铝框随指针转动 → 框中产生感应电流 → 安培力阻碍转动，指针很快稳定</div>

<div class="text-lg" v-click="2">短接后回路闭合，感应电流更大，阻尼更强——运输时就靠它保护表针</div>

</div>

---
title: 电磁驱动
clicks: 2
---

# 电磁驱动

<div class="page-grow">

<div class="half-grid items-center gap-6">

<FrameDrive :step="$clicks" />

<div class="stack text-lg">

<div class="ask">磁体转起来，铝框会跟着转吗？</div>

<div v-click="1">磁体转动，磁场跟着转</div>

<div v-click="1">铝框与磁场之间出现相对运动 → 框中产生感应电流</div>

<div v-click="2">感应电流受安培力，铝框跟着磁场转起来</div>

<div class="tip-hint" v-click="2">铝框的转速总比磁体慢——没有相对运动，就没有感应电流</div>

</div>

</div>

</div>

---
title: 铝框为什么总是慢半拍
clicks: 3
---

# 铝框为什么总是慢半拍

<div class="page-grow">

<div class="ask">如果铝框和磁场转得一样快，会怎样？</div>

<div class="stack text-lg">

<div v-click="1">穿过铝框的磁通量不再变化 → 没有感应电流 → 没有安培力</div>

<div v-click="2">铝框失去动力，速度必然慢下来，于是又出现相对运动</div>

<div class="tip-hint" v-click="3">所以铝框只能"追着"磁场转，永远慢一点。</div>

</div>

</div>

---
title: 交流感应电动机
---

# 交流感应电动机

<div class="page-grow">

<div class="half-grid items-center gap-6">

<InductionMotor />

<div class="stack text-lg">

<div>三个绕组接三相电源，在空间中产生旋转磁场</div>

<div class="tip-hint">转子是闭合导体，磁场相对它转动时，转子中产生感应电流，安培力带动转子转动</div>

<div>电能 → 机械能</div>

</div>

</div>

</div>

---
title: 阻尼与驱动，是同一条规律
clicks: 1
---

# 阻尼与驱动，是同一条规律

<div class="page-grow">

<div class="half-grid gap-6">

<div class="card">

<div class="mini-title">电磁阻尼</div>

<div>导体动、磁场不动</div>

<div>安培力阻碍导体的运动</div>

<div class="mt-2 text-base" style="color:var(--c-text-dim)">机械能 → 电能 → 焦耳热</div>

</div>

<div class="card">

<div class="mini-title">电磁驱动</div>

<div>磁场动、导体跟着动</div>

<div>安培力推动导体跟随磁场</div>

<div class="mt-2 text-base" style="color:var(--c-text-dim)">电能 → 机械能</div>

</div>

</div>

<div class="tip-hint" v-click="1">两种情况下，安培力都在阻碍导体与磁场之间的<strong>相对运动</strong>。</div>

</div>

---
title: 课堂小结
---

# 课堂小结

<div class="page-grow">

<div class="stack text-lg">

<div><strong>一条主线</strong>：变化的磁场 → 感生电场 → 感应电流</div>

<div>整块导体中的感应电流 → <strong>涡流</strong> → 热效应（利用 / 防止）</div>

<div>导体与磁场有相对运动 → 安培力阻碍相对运动 → <strong>电磁阻尼</strong> / <strong>电磁驱动</strong></div>

</div>

</div>
