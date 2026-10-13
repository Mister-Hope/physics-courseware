---
theme: default
title: "向心力"
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
chapter-no: "6.2"
chapter: "第六章 圆周运动"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div>上节课把合力沿<b>速度方向</b>与<b>垂直速度方向</b>分解：沿速度方向的分力改变速度的<b>大小</b>，垂直速度方向的分力改变速度的<b>方向</b>。</div>
<div class="ask ask-lead" v-click="1">做匀速圆周运动的物体，速率一直不变 —— 它的合力应该朝哪个方向？</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">空中飞椅与人一起做匀速圆周运动，它们受到哪些力？这些力的合力指向哪里？</div>
<div class="half-grid">
<div class="figure-cell"><FlyingChairSvg :show-forces="$clicks >= 1" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 2 }">
<div v-click="2">绳子斜向上的拉力 <Latex tex="F" /> 与重力 <Latex tex="G" /> 的合力，指向圆周运动的<b>圆心</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask">小球在细线的牵引下绕光滑桌面上的图钉做匀速圆周运动。剪断细线，小球会怎样运动？</div>
<div class="half-grid">
<div class="figure-cell"><StringBallTableSvg :step="$clicks" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">剪断后小球不再受绳的拉力，沿<b>切线方向</b>做直线运动 —— 一直是绳的拉力迫使它转弯。</div>
<div class="key" v-click="2">使小球做圆周运动的力，总指向<b>圆心</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
---

<div class="page-grow">
<div class="hero-tag"><mdi-book-open-page-variant-outline /> 定义</div>
<div class="card card-hero">大量实例表明：做匀速圆周运动的物体所受的合力<b>总指向圆心</b>。这个指向圆心的力叫作<b>向心力</b>（centripetal force）。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 向心力的作用效果

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><EffectOnlyDirectionSvg /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">向心力<b>始终垂直</b>于速度方向，沿速度方向的分量为 0。</div>
<div class="key" v-click="2">它<b>只改变速度的方向，不改变速度的大小</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 向心力是按作用效果命名的

<div class="page-grow">
<div class="ask">重力、弹力、摩擦力都是按<b>性质</b>命名的 —— 向心力也属于其中一类吗？</div>
<div class="half-grid">
<div class="figure-cell"><NamedByEffectSvg /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">不是。它<b>不是某种性质的力</b>，而是按力的<b>作用效果</b>命名的。</div>
<div v-click="2">所以向心力必须由别的力（或几个力的合力）来<b>充当</b>：绳的拉力、引力、静摩擦力，都可以是向心力。</div>
<div class="key" v-click="3">任何力或几个力的合力，只要它指向圆心、使物体能做圆周运动，它就是向心力。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 向心力的方向

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><CentripetalDirectionSvg /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">向心力<b>指向圆心</b>、与速度<b>垂直</b>；<br />物体在不同位置，方向随之改变。</div>
<div class="key" v-click="2">向心力<b>一定是个变力</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">是“做圆周运动所以有力”，还是“有力所以做圆周运动”？</div>
<div v-click="1">物体做圆周运动，速度方向时刻在改变 ⇒ 它一定有加速度，所受的合力一定与速度不共线。</div>
<div class="key" v-click="2">正是这个方向时刻改变、始终与速度垂直的合力，迫使物体不断改变运动方向 —— 物体才做圆周运动。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 实验：探究向心力大小的表达式

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><CentripetalApparatusSvg :step="$clicks" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">匀速转动手柄，两槽内的小球随塔轮做匀速圆周运动；向心力由横臂<b>挡板对球的压力</b>提供。</div>
<div v-click="2">挡板受到的反作用力使弹簧测力套筒下降、露出标尺 —— 由标尺露出的格数可算出两球所受向心力的<b>比值</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">研究 <Latex tex="F_n" /> 与 <Latex tex="m" />、<Latex tex="\omega" />、<Latex tex="r" /> 的关系时，怎样才能在改变一个量时保持其他量不变？</div>
<div class="stack">
<div v-click="1">保持 <Latex tex="m" />、<Latex tex="r" /> 不变，改变转速 → <Latex tex="F_n" /> 与 <Latex tex="\omega^2" /> 成正比</div>
<div v-click="2">保持 <Latex tex="m" />、<Latex tex="\omega" /> 不变，改变小球所在半径 → <Latex tex="F_n" /> 与 <Latex tex="r" /> 成正比</div>
<div v-click="3">保持 <Latex tex="r" />、<Latex tex="\omega" /> 不变，换用不同质量的小球 → <Latex tex="F_n" /> 与 <Latex tex="m" /> 成正比</div>
</div>
</div>

---
layout: base-flex
---

# 误差分析与操作要点

<div class="page-grow">
<div class="half-grid">
<div class="stack">
<div class="mini-title">误差来源</div>
<div>转轴与槽之间存在<b>摩擦力</b>，实测受力偏大</div>
<div>弹簧测力套筒的弹簧长期使用后<b>老化</b>，读数不准</div>
<div>皮带太松会出现<b>打滑</b>，两球的实际转速与预期不符</div>
</div>
<div class="stack divider-l">
<div class="mini-title">操作要点</div>
<div>摇动手柄时<b>缓慢加速</b>，让小球平稳地进入圆周运动</div>
<div>观察标尺露出的<b>格数</b>，达到预定格数后保持转速<b>均匀恒定</b></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 向心力的大小

<div class="page-grow">
<div class="ask ask-lead">实验表明，<Latex tex="F_n" /> 与 <Latex tex="m" />、<Latex tex="\omega" />、<Latex tex="r" /> 各是什么关系？</div>
<div v-click="1">与质量成正比，与角速度的平方成正比，与半径成正比：</div>
<div class="big-formula" v-click="2"><Latex tex="F_n = m\omega^2 r" /></div>
<div v-click="2">由 <Latex tex="v = \omega r" /> 可得另一种写法：<Latex tex="F_n = m\frac{v^2}{r}" /></div>
</div>

---
layout: base-flex
clicks: 2
---

# 例题

<div class="page-grow">
<div class="problem">一个圆盘在水平面内匀速转动，角速度 <Latex tex="\omega = 4\ \text{rad/s}" />。盘面上距圆盘中心 <Latex tex="r = 0.10\ \text{m}" /> 处有一个质量 <Latex tex="m = 0.10\ \text{kg}" /> 的小物体，随圆盘一起做匀速圆周运动。求小物体所受向心力的大小。</div>
<div class="half-grid">
<div class="figure-cell"><DiscFrictionSvg :show-forces="$clicks >= 1" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1"><Latex display tex="\begin{aligned} F_n &= m\omega^2 r \\ &= 0.10 \times 4^2 \times 0.10\ \text{N} \\ &= 0.16\ \text{N} \end{aligned}" /></div>
<div v-click="2">小物体在水平方向只受圆盘给的<b>静摩擦力</b>，它指向圆心，就是这里的向心力。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 辨析：静摩擦力能提供向心力吗

<div class="page-grow">
<div class="ask">甲：静摩擦力指向圆心，它就是向心力。乙：静摩擦力的方向与相对运动趋势相反，不可能与运动方向垂直，所以不能提供向心力。</div>
<div v-click="1">小物体相对圆盘静止，但它的运动方向时刻在变 —— 必须有一个指向圆心的合力。</div>
<div v-click="2">若接触面突然变光滑，小物体将沿切线飞出、离圆心越来越远；可见它相对圆盘有<b>沿半径向外</b>滑动的趋势，静摩擦力正沿半径指向圆心。</div>
<div class="key" v-click="3">判断谁提供向心力，只看<b>作用效果</b>：能把物体拉向圆心的力，就是向心力。</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div>定义：做匀速圆周运动的物体所受的合力指向圆心，这个力叫向心力</div>
<div>作用效果：只改变速度的<b>方向</b>，不改变速度的<b>大小</b></div>
<div>命名：不是性质力，是按<b>作用效果</b>命名的 —— 要由别的力来充当</div>
<div>方向：指向圆心、与线速度垂直、时刻改变 → 向心力是<b>变力</b></div>
<div>大小：<Latex tex="F_n = m\omega^2 r = m\frac{v^2}{r}" /></div>
</div>
</div>

---
layout: course-cover
chapter-no: "6.2"
chapter: 第六章 圆周运动
lesson: 第二课时
title: 变速圆周运动
subtitle: 一般曲线运动与曲率半径
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask">匀速圆周运动的合力指向圆心 —— 如果让沙袋转得越来越快，绳的拉力还指向圆心吗？</div>
<div class="half-grid">
<div class="figure-cell"><SpinBallSvg :show-force="$clicks >= 1" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">绳的拉力<b>不再与速度垂直</b>，它斜向运动的前方 —— 拉力并不指向圆心。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 变速圆周运动的受力

<div class="page-grow">
<div>加速转动时，绳的拉力 <Latex tex="F" /> 并不指向圆心 —— 把它分解为两个互相垂直的分力：</div>
<div class="half-grid">
<div class="figure-cell"><SpinBallDecomposeSvg :step="$clicks" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">跟圆周<b>相切</b>的分力 <Latex tex="F_t" />：与速度同向时使速度<b>越来越大</b></div>
<div class="key" v-click="2">指向圆心的分力 <Latex tex="F_n" />：改变速度的<b>方向</b>，提供向心力</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 夹角决定加速还是减速

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><SpinBallAngleSvg :step="$clicks" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1"><Latex tex="\theta < 90^\circ" />：<Latex tex="F_t" /> 与 <Latex tex="v" /> 同向 → 速率变大，做<b>加速的圆周运动</b></div>
<div class="key" v-click="2"><Latex tex="\theta > 90^\circ" />：<Latex tex="F_t" /> 与 <Latex tex="v" /> 反向 → 速率变小，做<b>减速的圆周运动</b></div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
---

# 例题

<div class="page-grow">
<div class="problem">一辆汽车在水平公路上转弯，沿曲线由 M 向 N 行驶，速度逐渐减小。图中已经画出一种可能的合力方向 <Latex tex="F" />（它与 <Latex tex="v" /> 垂直）—— 这个方向对吗？</div>
<div class="half-grid">
<div class="figure-cell"><CarTurnDecelSvg :show-correct="$clicks >= 3" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">速度逐渐减小 → 合力沿速度方向的分量必须与 <Latex tex="v" /> <b>反向</b>。</div>
<div v-click="2">图中方向与 <Latex tex="v" /> 垂直，沿 <Latex tex="v" /> 方向的分量为零 —— 那样速率将保持不变，与题设矛盾。</div>
<div class="key" v-click="3">所以合力应指向曲线内侧的<b>偏后方</b>，与 <Latex tex="v" /> 的夹角大于 <Latex tex="90^\circ" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
---

# 一般的曲线运动

<div class="page-grow">
<div>轨迹既不是直线、也不是圆周的曲线运动，叫作<b>一般曲线运动</b>，例如平抛、斜抛。</div>
<div class="figure-cell"><GeneralCurveSegmentsSvg :step="$clicks" /></div>
<div v-click="1">把曲线分割成许多很短的小段，每一小段都可以看作<b>圆周运动的一部分</b>。</div>
<div class="key" v-click="2">这样就可以用圆周运动的方法，分析质点在曲线上任一位置的运动。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 曲率与曲率半径

<div class="page-grow">
<div class="half-grid">
<div class="figure-cell"><CurvatureRadiusSvg :step="$clicks" /></div>
<div class="stack divider-l" :class="{ 'divider-off': $clicks < 1 }">
<div v-click="1">每一小段圆弧的半径，叫作曲线在该处的<b>曲率半径</b>，用 <Latex tex="\rho" /> 表示；它的倒数 <Latex tex="k = 1/\rho" /> 叫作曲率，表示曲线弯曲的程度。</div>
<div class="key" v-click="2">把 <Latex tex="F_n = m\frac{v^2}{r}" /> 中的 <Latex tex="r" /> 换成曲率半径 <Latex tex="\rho" />，就能求一般曲线运动中某处的向心力。</div>
</div>
</div>
</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div>匀速圆周运动：合力指向圆心，只改变速度方向，<Latex tex="F_n = m\omega^2 r = m\frac{v^2}{r}" /></div>
<div>变速圆周运动：合力不再指向圆心，分解为切向分力 <Latex tex="F_t" />（改变速率）与法向分力 <Latex tex="F_n" />（改变方向）</div>
<div><Latex tex="\theta < 90^\circ" /> 加速的圆周运动；<Latex tex="\theta > 90^\circ" /> 减速的圆周运动</div>
<div>一般曲线运动：看成一段段的圆周运动，用<b>曲率半径</b> <Latex tex="\rho" /> 按圆周运动的规律处理</div>
</div>
</div>
