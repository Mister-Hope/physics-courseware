---
theme: default
title: "多普勒效应"
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
chapter-no: "3.5"
chapter: "第三章 机械波"
---

<!-- 封面装饰：波源向右运动，前方波前挤密、后方拉疏 -->
<CoverDecorationSvg />

---
title: 急救车的笛声为什么变了？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask-lead">急救车闪着灯疾驰而过：<br>驶近时笛声尖而高，驶过身边之后，音调一下子变低。</div>
<div class="ask" v-click="1">同一个声源发出的声音，音调为什么会变？</div>
<div class="info-hint" v-click="2">音调由声音的频率决定。听到的音调变了，说明<strong>接收到的频率</strong>变了——而声源振动的频率并没有变。</div>
</div>

---
title: 多普勒效应
clicks: 1
clickAnimation: none
---

# 多普勒效应

<div class="page-grow">
<div class="dp-lead">1842 年，奥地利物理学家多普勒带着女儿在铁道旁散步，注意到火车驶近时汽笛声尖、驶过之后变低沉。</div>
<DefinitionBox term="多普勒效应" tone="gold" v-click="1">
<div>波源与观察者相互靠近或者相互远离时，观察者接收到的<strong>频率</strong>会发生变化，这种现象叫作多普勒效应。</div>
</DefinitionBox>
</div>

---
title: 模拟实验：数一数“频率”
clicks: 3
clickAnimation: none
---

# 模拟实验：数一数“频率”

<div class="page-grow">
<div class="ask">一队人沿路行走，每分钟有 30 人从你身边通过。你站着不动、逆着队伍走、顺着队伍走，每分钟与你相遇的人数一样吗？</div>
<div class="figure dp-fig-crowd"><CrowdWalkSvg :step="$clicks" /></div>
<div class="tip-hint" v-click="3">逆着队伍走，相遇的人变多，“过人频率”升高；顺着走则变少、频率降低。</div>
</div>

---
title: 接收频率为什么会变？
clicks: 1
clickAnimation: none
---

# 接收频率为什么会变？

<div class="page-grow">
<div class="ask">把声波看成“波峰”一个接一个传来：1 s 内通过观察者的波峰数，就是接收到的频率。</div>
<div class="figure dp-fig-wave"><WavefrontCountSvg /></div>
<div class="tip-hint" v-click="1">靠近时 1 s 内通过的波峰变多，频率升高；远离时变少，频率降低。</div>
</div>

---
title: 向前运动的波源
clicks: 1
clickAnimation: none
---

# 向前运动的波源

<div class="page-grow">
<div class="ask">波源向前运动时，波峰在前方、后方一样密吗？</div>
<div class="figure dp-fig-move"><MovingSourceSvg :step="$clicks" /></div>
<div class="tip-hint" v-click="1">波源每个周期向前走一段，后发出的波峰离前面的更近：前方波长变短，后方变长。</div>
</div>
