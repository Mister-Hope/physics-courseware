---
theme: default
title: "波的干涉"
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
chapter-no: "3.4"
chapter: "第三章 机械波"
---

<!-- 封面装饰：两个波源发出的圆形波前相遇，叠加出稳定的干涉图样 -->
<CoverDecorationSvg />

---
title: 雨滴激起的涟漪
clicks: 1
---

<div class="page-grow">
<div class="ask-lead">平静的水面上，雨滴激起层层涟漪，<br>形成复杂而美丽的图案。</div>
<div class="figure wi-fig-ripple"><RipplesSvg /></div>
<div class="info-hint" v-click="1">为什么有的地方剧烈振动、有的地方几乎平静，而且这些位置始终不变？</div>
</div>

---
title: 两列波相遇
clicks: 3
---

# 波的叠加

<div class="page-grow">
<div class="figure wi-fig-rope"><RopeSuperposeSvg :step="$clicks" /></div>
<div class="stack-tight wi-text">
<div v-click="1">两列波各自保持原来的波形，向对方传播。</div>
<div v-click="2">重叠区域里，质点同时参与两列波引起的振动，位移相加。</div>
<div class="tip-hint" v-click="3">相遇并穿过后，形状和传播情形都跟相遇前一样——几列波相遇时，能够保持各自的运动特征、继续传播。</div>
</div>
</div>

---
title: 位移的矢量和
clicks: 1
---

# 位移的矢量和

<div class="page-grow">
<div class="ask">重叠处，质点的位移是多少？</div>
<div class="figure wi-fig-arrows"><SuperposeArrowsSvg /></div>
<div class="wi-text" v-click="1">合位移等于各列波单独传播时引起的位移的<span class="wi-key">矢量和</span>：波峰与波峰相遇加强，波峰与波谷相遇削弱。</div>
</div>

---
title: 水波的干涉
clicks: 1
---

# 水波的干涉

<div class="page-grow">
<div class="ask">两个波源发出的波相遇，水面上会出现什么？</div>
<div class="figure wi-fig-tank"><WaterTankSvg /></div>
<div class="wi-text" v-click="1">水面上出现一条条相对平静的区域和激烈振动的区域，<span class="wi-key">位置稳定不变</span>；两根细杆由同一个振动片带动，频率相同、相位差恒定。</div>
</div>

---
title: 为什么位置稳定
clicks: 3
---

# 为什么位置稳定？

<div class="page-grow">
<div class="half-grid wi-row">
<div class="figure"><InterferenceCirclesSvg :step="$clicks" /></div>
<div class="stack">
<div class="ask">M 点总是加强、N 点总是减弱，为什么？</div>
<div v-click="1"><span class="wi-strong">M 点</span>：波峰与波峰相遇（相位相同）→ 半个周期后波谷与波谷相遇 → 总是加强，振幅为两者之和。</div>
<div v-click="2"><span class="wi-weak">N 点</span>：波峰与波谷相遇（相位相反）→ 半个周期后波谷与波峰相遇 → 总是减弱；振幅相同时，合位移总为 <Latex tex="0" />。</div>
<div class="tip-hint" v-click="3">相位差保持不变，这些点就固定在同一位置。</div>
</div>
</div>
</div>

---
title: 干涉图样
clicks: 2
---

# 干涉图样

<div class="page-grow">
<div class="half-grid wi-row">
<div class="figure"><InterferenceLobesSvg /></div>
<div class="stack">
<div class="ask">把加强点和减弱点分别连起来，会看到什么？</div>
<div class="wi-legend">
<span class="wi-legend-item wi-legend-strong">加强区</span>
<span class="wi-legend-item wi-legend-weak">减弱区</span>
</div>
<div v-click="1">加强点连成曲线，减弱点也连成曲线——两类区域相间排列，位置固定。</div>
<div class="tip-hint" v-click="2">这样的稳定图样，叫作<span class="wi-key">干涉图样</span>。</div>
</div>
</div>
</div>

---
title: 干涉与它的条件
clicks: 2
---

# 干涉与它的条件

<div class="page-grow">
<DefinitionBox term="波的干涉" tone="gold">
<div>频率相同、相位差恒定、振动方向相同的两列波叠加时，某些区域总是加强、某些区域总是减弱，这种现象叫作波的干涉，形成的稳定图样叫<strong>干涉图样</strong>。</div>
</DefinitionBox>
<div class="wi-conds" v-click="1">
<div class="wi-cond"><span class="wi-cond-tag">频率相同</span><span>周期相同，才能始终步调一致。</span></div>
<div class="wi-cond"><span class="wi-cond-tag">相位差恒定</span><span>相位差不变，加强、减弱的位置才固定。</span></div>
<div class="wi-cond"><span class="wi-cond-tag">振动方向相同</span><span>在同一方向引起振动，位移才能相加。</span></div>
</div>
<div class="info-hint" v-click="2">频率不同或相位差随时间变化时，各点的振幅随时间变化，不会出现稳定的加强区与减弱区。</div>
</div>

---
title: 路程差
clicks: 3
---

# 路程差

<div class="page-grow wi-derive">
<div class="ask">不比较相位，只量一量到两个波源的距离，能判断吗？</div>
<div v-click="1">设某点到两个波源的距离分别为 <Latex tex="r_1" />、<Latex tex="r_2" />，路程差 <Latex tex="\Delta r = |r_1 - r_2|" />。</div>
<div v-click="2">两波源同相时：<Latex tex="\Delta r = n\lambda" />（<Latex tex="n = 0, 1, 2, \dots" />）→ 波峰与波峰相遇 → <span class="wi-strong">加强</span>。</div>
<div v-click="3"><Latex tex="\Delta r = (2n+1)\dfrac{\lambda}{2}" /> → 波峰与波谷相遇 → <span class="wi-weak">减弱</span>。</div>
<div class="tip-hint" v-click="3">路程差是半波长的偶数倍，振动加强；是半波长的奇数倍，振动减弱。</div>
</div>

---
title: 算一算路程差
clicks: 0
---

# 算一算：路程差

<div class="page-grow">
<div class="ask">拖动 P 点，看路程差怎样变化。</div>
<PathDifferenceExplorer />
</div>

---
title: A、B 之间的减弱点
clicks: 3
---

# 例题：A、B 之间的减弱点

<div class="page-grow wi-exercise">
<div class="problem"><Latex tex="S_1" />、<Latex tex="S_2" /> 分别放在 A、B 两点，振动方向相同，频率都是 4 Hz，波速 4 m/s，初相位相同。求 A、B 之间合振动振幅最小的点的位置。</div>
<div v-click="1">波长：<Latex tex="\lambda = \dfrac{v}{f} = \dfrac{4}{4}\ \text{m} = 1\ \text{m}" />。设 P 到 A 的距离为 <Latex tex="x" />，则路程差 <Latex tex="\Delta r = |1.2 - 2x|" />。</div>
<div v-click="2">振幅最小处：<Latex tex="\Delta r = (2n+1)\dfrac{\lambda}{2} = 0.5\ \text{m},\ 1.5\ \text{m},\ \dots" />，解得 <Latex tex="x = 0.35\ \text{m}" /> 与 <Latex tex="x = 0.85\ \text{m}" />。</div>
<div class="figure" v-click="3">
<NumberAxis
  :range="[-0.06, 1.3]"
  :axis="{ quantity: 'x', unit: 'm' }"
  :ticks="{ step: 0.2 }"
  :callouts="[
    { value: 0, text: 'A', side: 'above' },
    { value: 1.2, text: 'B', side: 'above' },
    { value: 0.35, text: '减弱', side: 'above', color: 'var(--c-velocity)' },
    { value: 0.85, text: '减弱', side: 'below', color: 'var(--c-velocity)' }
  ]"
  :view="{ width: 900, height: 200 }"
/>
</div>
</div>

---
title: M 点在一个周期内的运动
clicks: 3
---

# 例题：M 点怎样运动？

<div class="page-grow">
<div class="problem">两列频率相同的横波相遇（实线波峰、虚线波谷），M 是波峰与波峰相遇处。M 会怎样运动？</div>
<div class="half-grid wi-row">
<div class="figure"><InterferenceCirclesSvg :step="2" /></div>
<div class="stack">
<div v-click="1">M 是加强点：两列波引起的位移总是同向，振幅为两者之和。</div>
<div v-click="2">加强讲的是<span class="wi-key">振幅</span>，不是位置：M 仍在平衡位置附近上下振动。</div>
<div class="tip-hint" v-click="3">经过四分之一周期，M 回到平衡位置；再过四分之一周期，到负的最大位移。</div>
</div>
</div>
</div>

---
title: 波峰在移动，质点在迁移吗
clicks: 3
---

# 波峰在移动，质点也在迁移吗？

<div class="page-grow">
<div class="ask">加强点上，凸起的位置向哪移动？质点本身是否迁移？</div>
<div class="wi-steps">
<div v-click="1"><span class="wi-step-tag">凸起</span>凸起（波峰）沿波的传播方向移动，经过半个周期，凸起变成凹下。</div>
<div v-click="2"><span class="wi-step-tag">质点</span>质点只在平衡位置附近振动，不随波迁移；M 点的运动方向由两列波在该处的位移变化决定。</div>
<div v-click="3"><span class="wi-step-tag">位移</span>经过 <Latex tex="\dfrac{T}{4}" />，M 点的位移为零——加强点也在振动，只是振幅最大。</div>
</div>
<div class="tip-hint" v-click="3">加强区、减弱区的位置不变，振动本身一刻不停。</div>
</div>

---
title: 消声器
clicks: 2
---

# 习题：消声器

<div class="page-grow">
<div class="problem">波长 <Latex tex="\lambda" /> 的声波在 a 处分上下两束，在 b 处相遇。说明消声原理与良好消声的条件。</div>
<div class="figure wi-fig-muffler"><SoundMufflerSvg /></div>
<div v-click="1">两束声波来自同一波源，频率相同、相位差恒定，在 b 处发生干涉。</div>
<div class="tip-hint" v-click="2">若两路的路程差 <Latex tex="\Delta r = (2n+1)\dfrac{\lambda}{2}" />，两束声波在 b 处相位相反、互相抵消——两路长度差等于半波长的奇数倍，就是良好消声的条件。</div>
</div>

---
title: 做一做：声音的干涉
clicks: 2
---

# 做一做：听声音的干涉

<div class="page-grow">
<div class="ask">两个相同的扬声器接同一个信号源，站在不同位置听，声音会有区别吗？</div>
<div class="stack" v-click="1">
<div>两只扬声器距离几米，频率、相位都相同——相当于两个相干波源。</div>
<div>沿某个方向走动：有的位置声音明显变强，有的位置几乎听不见。</div>
<div>把听到最弱的位置标出来，它们连成的曲线，就是声波的干涉图样。</div>
</div>
<div class="tip-hint" v-click="2">声波也能发生干涉——干涉不是水波独有的现象。</div>
</div>

---
title: 主动降噪
clicks: 1
---

# STSE：主动降噪

<div class="page-grow">
<div class="ask">戴上降噪耳机，噪声为什么会变小？</div>
<div class="figure wi-fig-noise"><NoiseCancelSvg /></div>
<div v-click="1">麦克风拾取噪声，电路生成一列振幅、频率相同、相位相反的声波，与噪声叠加后互相抵消——这仍是干涉：相位差恒定，两列波在耳朵处总是减弱。</div>
</div>

---
title: 干涉是波特有的现象
clicks: 2
---

# 一切波都能干涉

<div class="page-grow">
<div class="wi-list">
<div v-click="1"><span class="wi-step-tag">水波</span>水槽里两个同频波源，出现稳定的加强区与减弱区。</div>
<div v-click="1"><span class="wi-step-tag">声波</span>两只扬声器，走动时听到强弱相间的效果。</div>
<div v-click="1"><span class="wi-step-tag">光波</span>杨氏双缝实验中，屏上出现明暗相间的条纹——光也是波。</div>
</div>
<div class="tip-hint" v-click="2">干涉和衍射一样，是波特有的现象；只有频率相同、相位差恒定、振动方向相同的两列波，才能形成稳定的干涉图样。</div>
</div>

---
title: 小结
clicks: 4
---

# 小结

<div class="page-grow wi-summary">
<div v-click="1"><span class="wi-num">1</span>几列波相遇时，保持各自的运动特征继续传播；重叠区域内质点的位移等于各列波单独引起的位移的<span class="wi-key">矢量和</span>。</div>
<div v-click="2"><span class="wi-num">2</span>频率相同、相位差恒定、振动方向相同的两列波叠加，某些区域总是加强、某些区域总是减弱，形成稳定的<span class="wi-key">干涉图样</span>。</div>
<div v-click="3"><span class="wi-num">3</span>加强点与减弱点由路程差决定：<Latex tex="\Delta r = n\lambda" /> 加强，<Latex tex="\Delta r = (2n+1)\dfrac{\lambda}{2}" /> 减弱（两波源同相）。</div>
<div v-click="4"><span class="wi-num">4</span>干涉是波特有的现象：水波、声波、光波都能形成干涉图样。</div>
</div>
