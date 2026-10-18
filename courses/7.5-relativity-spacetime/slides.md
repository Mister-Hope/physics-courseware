---
theme: default
title: "相对论时空观与牛顿力学的局限性"
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
chapter-no: "7.5"
chapter: "第七章 万有引力与宇宙航行"
subtitle: "光速不变 · 同时性的相对性 · 时间延缓与长度收缩"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask">飞船以 <Latex tex="0.2c" /> 的速度飞行，向正前方的星球发射一束激光——星球上的观察者测到的光速是多少？</div>

<div v-click="1">按牛顿力学的速度叠加，答案似乎是 <Latex tex="v_{\text{光星}} = v_{\text{光船}} + v_{\text{船星}} = c + 0.2c = 1.2c" />。</div>

<div v-click="2">河水中的船就是这样叠加的：<Latex tex="v_{\text{船岸}} = v_{\text{船水}} + v_{\text{水岸}}" />。</div>

<div class="tip-hint" v-click="3">可是对光来说，事实并非如此——这个叠加不成立。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 光的传播速度

<div class="page-grow">
<div class="ask">麦克斯韦的电磁场理论证明电磁波的速度等于光速 <Latex tex="c" />——这个速度是相对哪个参考系而言的？</div>

<div v-click="1">1887 年的<b>迈克耳孙—莫雷实验</b>以及其他一些实验都表明：在不同的参考系中，光的传播速度都是一样的。</div>

<div class="half-grid" v-click="2">

<DefinitionBox term="假设一" tone="blue">

<div>在不同的<b>惯性参考系</b>中，物理规律的形式都是相同的。</div>

</DefinitionBox>

<DefinitionBox term="假设二" tone="gold">

<div>真空中的光速在不同的惯性参考系中大小都是相同的。</div>

</DefinitionBox>

</div>

<div class="tip-hint" v-click="3">光速 <Latex tex="c" /> 与光源、观察者的运动都无关，所以它不能和别的速度相加。</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow" style="--page-gap:.4rem">
<div class="ask">车厢中央的光源闪一下光——车上的观察者和地面上的观察者，看到光到达前、后壁的先后一样吗？</div>

<TrainFlashDemo />

<div v-click="1">车上：光向前、后传播的速率相同，光源又在车厢中央 ⇒ 同时到达前、后壁。</div>

<div v-click="2">地面：光对地的速率也相同，但车厢在光传播的时间里向前走了一段 ⇒ <b class="text-accent">先到后壁、后到前壁</b>。</div>

<div class="tip-hint" style="--hint-pad-y:.45rem" v-click="3">在一个参考系中同时发生的两个事件，在另一个参考系中可能不同时。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 时间延缓

<div class="page-grow">
<div class="ask">运动的钟和静止的钟，走的快慢一样吗？</div>

<div class="half-grid" v-click="1">
<div class="stack stack-tight">
<div class="text-xl"><Latex tex="\Delta t = \dfrac{\Delta\tau}{\sqrt{1-(v/c)^2}}" /></div>
<div><Latex tex="\Delta\tau" />：与物体一起运动的钟测得的固有时间</div>
<div><Latex tex="\Delta t" />：地面上的钟测得的时间间隔</div>
</div>
<TimeDilationLab />
</div>

<div class="tip-hint" v-click="2">因为 <Latex tex="1-(v/c)^2 < 1" />，所以总有 <Latex tex="\Delta t > \Delta\tau" />——运动的钟走得慢，这就是<b class="text-accent">时间延缓</b>。</div>

<div v-click="3"><Latex tex="v" /> 越接近 <Latex tex="c" />，延缓越显著；日常速度下几乎察觉不到。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 长度收缩

<div class="page-grow">
<div class="ask">以 <Latex tex="v" /> 高速运动的杆，测出来的长度还是 <Latex tex="l_0" /> 吗？</div>

<div class="half-grid" v-click="1">
<div class="stack stack-tight">
<Latex tex="l = l_0\sqrt{1-(v/c)^2}" display />
<div><Latex tex="l_0" />：与杆相对静止时测得的长度</div>
<div><Latex tex="l" />：沿杆的方向以 <Latex tex="v" /> 运动时测得的长度</div>
</div>
<LengthContractionLab />
</div>

<div class="tip-hint" v-click="2">因为 <Latex tex="\sqrt{1-(v/c)^2} < 1" />，所以总有 <Latex tex="l < l_0" />——这就是<b class="text-accent">长度收缩</b>；收缩只发生在沿运动方向的那个长度上。</div>

<div v-click="3">时间进程和空间长度都跟物体的运动状态有关——这样的时空观叫作<b class="text-accent-2">相对论时空观</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 长度收缩的方向

<div class="page-grow">
<div class="ask">正方形速度大小都是 <Latex tex="0.6c" />，方向分别向右、向上、斜向右上——被压扁的方式一样吗？</div>

<SquareContractionDemo :show-result="$clicks >= 1" />

<div class="tip-hint" v-click="2">只有<b>沿运动方向</b>的长度收缩为 <Latex tex="\sqrt{1-(v/c)^2}" /> 倍，垂直于运动方向的长度不变——所以斜向运动时，正方形只沿斜向被压扁、变成菱形，<b class="text-accent">而不是整体缩小</b>。</div>
</div>

---
layout: base-flex
clicks: 2
---

# $\mu$ 子为什么能到达地面

<div class="page-grow">
<div class="ask"><Latex tex="\mu" /> 子以 <Latex tex="0.99c" /> 飞行也只能飞 <Latex tex="650\ \text{m}" /> 左右——地面附近为什么还能观测到大量 <Latex tex="\mu" /> 子？</div>

<MuonLifetimeLab />

<div v-click="1">选 <Latex tex="\mu" /> 子为参考系：它的平均寿命仍是 <Latex tex="2.2\ \mu\text{s}" />。</div>

<div class="tip-hint" v-click="2">选地面为参考系：算得它的寿命约 <Latex tex="15.6\ \mu\text{s}" />、平均飞约 <Latex tex="4.6\ \text{km}" /> ⇒ 到达地面的 <Latex tex="\mu" /> 子数远多于经典预言——这是相对论时空观最早的证据。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 牛顿力学的成就

<div class="page-grow">
<div class="ask">从地面上的物体到天体的运动，从拦河筑坝到卫星飞船——牛顿力学凭什么这么好用？</div>

<div class="three-col" v-click="1">
<div class="text-center">
<mdi-earth class="icon-lg" />
<div><b class="text-accent-2">天上的运动</b></div>
<div>行星绕太阳、卫星绕地球：万有引力定律给出轨道与周期。</div>
</div>
<div class="text-center">
<mdi-car-side class="icon-lg" />
<div><b class="text-accent-2">地面上的运动</b></div>
<div>从抛出的篮球到行驶的汽车、火车、飞机，都服从牛顿运动定律。</div>
</div>
<div class="text-center">
<mdi-bridge class="icon-lg" />
<div><b class="text-accent-2">工程与技术</b></div>
<div>筑坝、修桥、设计机械，都建立在牛顿力学的基础之上。</div>
</div>
</div>

<div class="mini-note" v-click="1">"如果一定要举出某个人、某一天作为近代科学诞生的标志，我选牛顿《自然哲学的数学原理》在 1687 年出版的那一天。"——杨振宁</div>

<div class="tip-hint" v-click="2">在这些广阔的领域里，牛顿运动定律都与实际相符合。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 牛顿力学的适用范围

<div class="page-grow">
<div class="ask">牛顿力学在这么大的范围里都对——它有没有够不着的地方？</div>

<div class="step-list" v-click="1">
<div class="step-item">
<div class="step-no"><mdi-speedometer /></div>
<div><b class="text-accent">接近光速的运动</b>：时间延缓、长度收缩，绝对时空观不再成立，要用<b>相对论</b>。</div>
</div>
<div class="step-item">
<div class="step-no"><mdi-microscope /></div>
<div><b class="text-accent">微观世界</b>：电子、质子、中子不仅具有粒子性，还有波动性，它们的运动规律在很多情况下不能用牛顿力学说明，要用<b>量子力学</b>。</div>
</div>
</div>

<div class="tip-hint" v-click="2">牛顿力学没有被否定，而是作为<b>一定条件下的特殊情形</b>被包含在新理论之中：当 <Latex tex="v \ll c" /> 时，相对论与牛顿力学的结论没有区别；当普朗克常量 <Latex tex="h" /> 可以忽略不计时，量子力学与牛顿力学的结论没有区别。</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack stack-dense">
<div><b class="text-accent">两条假设</b>：不同惯性参考系中物理规律的形式相同；真空中的光速在不同惯性参考系中大小相同。</div>

<div><b class="text-accent-2">相对论时空观</b>：同时性、时间进程、空间长度都跟物体的运动状态有关——时间延缓 <Latex tex="\Delta t = \dfrac{\Delta\tau}{\sqrt{1-(v/c)^2}}" />、长度收缩 <Latex tex="l = l_0\sqrt{1-(v/c)^2}" />。</div>

<div><b class="text-accent">实验证据</b>：<Latex tex="\mu" /> 子到达地面的数量与相对论预言相符；1971 年铯原子钟环球飞行，实验与理论符合得很好。</div>

<div><b class="text-accent-2">牛顿力学的地位</b>：低速、宏观范围内极准；接近光速归相对论，微观世界归量子力学——旧的科学是新理论在一定条件下的特殊情形。</div>
</div>
</div>
