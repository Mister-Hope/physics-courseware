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

---
title: 哪一侧响得更密？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask">监控拍下了水面上振动片移动时的波前图：它向哪边移动？</div>
<div class="figure dp-fig-ripple"><WaterRippleQuizSvg :step="$clicks" /></div>
<div class="info-hint" v-click="1">波前密集的一侧就是振动片前进的方向——它正向左移动。</div>
<div class="tip-hint" v-click="2">左侧单位时间内接收到的完整波更多，波的频率变高了。</div>
</div>

---
title: 接收频率的变化规律
clicks: 2
clickAnimation: none
---

# 接收频率的变化规律

<div class="page-grow">
<div class="ask">三种情形放在一起：观察者听到的频率，比波源发出的频率偏高还是偏低？</div>
<div class="dp-table" v-click="1">
<div class="dp-tr dp-th"><span>情形</span><span>波长</span><span>每秒通过的波峰数</span><span>接收频率与音调</span></div>
<div class="dp-tr"><span>相互靠近</span><span>沿运动方向变短</span><span>变多</span><span>频率升高，音调变高</span></div>
<div class="dp-tr"><span>相对静止</span><span>与波源发出的相同</span><span>不变</span><span>频率不变，音调不变</span></div>
<div class="dp-tr"><span>相互远离</span><span>沿运动方向变长</span><span>变少</span><span>频率降低，音调变低</span></div>
</div>
<div class="tip-hint" v-click="2">相互靠近时频率升高、相互远离时频率降低，这就是多普勒效应。</div>
</div>

---
title: 波源动，还是观察者在动？
clicks: 2
clickAnimation: none
---

# 波源动，还是观察者在动？

<div class="page-grow">
<div class="ask">如果波源不动、观察者向着波源走，也会有多普勒效应吗？</div>
<div class="half-grid dp-row" v-click="1">
<div class="dp-case">
<div class="dp-case-title">波源运动</div>
<div>前方波前挤密、波长变短，后方波长变长，观察者接收到的频率随之改变。</div>
</div>
<div class="dp-case">
<div class="dp-case-title">观察者运动</div>
<div>波长不变，但观察者迎着波走，1 s 内遇到的波峰变多，接收频率同样改变。</div>
</div>
</div>
<div class="tip-hint" v-click="2">不论谁在动，只要两者相互靠近，接收频率就升高；相互远离，频率就降低。</div>
</div>

---
title: 波源速度的影响
clicks: 0
clickAnimation: none
---

# 波源速度的影响

<div class="page-grow">
<div class="ask">拖动滑块：前方、后方的波前和每秒波峰数怎样变化？</div>
<WaveFrontExplorer />
</div>

---
title: 应用：测速
clicks: 2
clickAnimation: none
---

# 应用：测速

<div class="page-grow">
<div class="ask">交警的测速仪并不接触车辆，它怎么知道车有多快？</div>
<div class="half-grid dp-row" v-click="1">
<div class="dp-case">
<div class="dp-case-title">向车辆发射超声波</div>
<div>测出反射波频率变化的多少，就能算出车辆靠近或远离的速度。</div>
</div>
<div class="dp-case">
<div class="dp-case-title">装在公路上方</div>
<div>测速同时拍下车牌，把速度打印在照片上；同样的办法还能测海底水流的速度。</div>
</div>
</div>
<div class="tip-hint" v-click="2">测速、测流用的都是同一个量：接收频率比发射频率变了多少。</div>
</div>

---
title: 应用：彩超
clicks: 2
clickAnimation: none
---

# 应用：彩超

<div class="page-grow">
<div class="ask">医生不打开血管，怎样“看见”血流的速度？</div>
<div class="dp-lead" v-click="1">向人体发射频率已知的超声波，超声波被血管中的血流反射后又被仪器接收；测出反射波的频率变化，就能知道血流的速度。</div>
<div class="info-hint" v-click="2">这种方法俗称“彩超”，可以检查心脏、大脑和眼底血管的病变。</div>
</div>

---
title: 应用：星星在靠近还是远离？
clicks: 1
clickAnimation: none
---

# 应用：星星在靠近还是远离？

<div class="page-grow">
<div class="ask">我们无法飞到恒星身边，怎么知道它是在靠近还是远离？</div>
<div class="figure dp-fig-spectrum"><SpectrumShiftSvg /></div>
<div class="info-hint" v-click="1">把星球上元素发光的频率，与地球上这些元素静止时对照：谱线向红端移动，说明在远离；向蓝端移动，说明在靠近。</div>
</div>

---
title: 哪种情况音调更低？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="problem">火车上有一个声源，发出频率一定的乐音。<br>哪种情况，观察者听到的音调比两者都静止时<strong>更低</strong>？</div>
<div class="dp-options">
<div>A. 观察者静止，火车向他驶来</div>
<div>B. 观察者静止，火车离他驶去</div>
<div>C. 火车静止，观察者乘车向火车运动</div>
<div>D. 火车静止，观察者乘车远离火车</div>
</div>
<div class="dp-answer" v-click="1">B、D</div>
<div class="info-hint" v-click="2">音调高低只取决于两者是靠近还是远离：靠近就升高（A、C），远离就降低（B、D）。</div>
</div>

---
title: 例题：抛球游戏
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="problem">甲每隔 1 s 向乙抛一个球。甲站着不动，乙以一定速度向甲运动：乙接球的时间间隔还是 1 s 吗？乙的速度增大，间隔怎样变化？</div>
<div class="dp-lead" v-click="1">不是 1 s。乙迎着球走，每次都比上一次更早接到球，间隔小于 1 s。</div>
<div class="dp-lead" v-click="2">乙的速度越大，接球的间隔越短——正像观察者迎着波走，每秒遇到的波峰变多，接收频率升高。</div>
</div>

---
title: 演示：转动的蜂鸣器
clicks: 2
clickAnimation: none
---

# 演示：转动的蜂鸣器

<div class="page-grow">
<div class="ask">把蜂鸣器固定在长竹竿一端，举过头顶快速转动，几米外听到的声音有什么变化？</div>
<div class="dp-lead" v-click="1">蜂鸣器转过来时朝向你运动，音调变高；转过去时远离你，音调变低。转一圈，音调高低变化一次。</div>
<div class="tip-hint" v-click="2">转动时速度方向不断改变，靠近与远离交替出现——这是多普勒效应最直观的演示。</div>
</div>

---
title: 经过身旁的一瞬间
clicks: 3
clickAnimation: none
---

# 经过身旁的一瞬间

<div class="page-grow">
<div class="ask">急救车驶近时音调一直偏高，经过身旁后偏低。为什么不是慢慢变低，而是“突然”降下去？</div>
<div class="dp-lead" v-click="1">驶近时车速不变，每秒向你传来同样多的波峰，音调一直偏高且稳定。</div>
<div class="dp-lead" v-click="2">驶过的一瞬间，由“靠近”变成“远离”，接收频率从偏高跳到偏低。</div>
<div class="tip-hint" v-click="3">变化发生在相对运动方向改变的那一刻。</div>
</div>

---
title: 小结
clicks: 3
clickAnimation: none
---

# 小结

<div class="page-grow">
<div class="dp-lead">1. 多普勒效应：波源与观察者相互靠近或相互远离时，观察者接收到的频率发生变化。</div>
<div class="dp-lead" v-click="1">2. 相互靠近：波长变短（波源运动时）、每秒通过的波峰变多，接收频率升高，音调变高。</div>
<div class="dp-lead" v-click="2">3. 相互远离：波长变长、每秒通过的波峰变少，接收频率降低，音调变低。</div>
<div class="dp-lead" v-click="3">4. 应用：测车速、测血流、判断星球的运动；声波、光波和电磁波都有多普勒效应。</div>
</div>

---
title: 课后：找一找多普勒效应
clicks: 1
clickAnimation: none
---

# 课后：找一找多普勒效应

<div class="page-grow">
<div class="dp-lead">在搜索引擎中检索“多普勒效应”，写一篇介绍文章，和同学交流。</div>
<div class="dp-lead" v-click="1">提示：警笛、赛车引擎声、超声检查、公路测速牌、医院里的彩超报告单，都可以成为素材。</div>
</div>
