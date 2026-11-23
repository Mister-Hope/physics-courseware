---
theme: default
title: "反冲现象 火箭"
subtitle: "从反冲现象到火箭"
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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "1.6"
chapter: "第一章 动量守恒定律"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 章鱼和乌贼怎样游动
---

<div class="page-grow pt2">
  <div class="ask-lead p2-ask">章鱼、乌贼先把水吸入体腔，再用力把水喷出。<br>它们为什么要喷水？</div>
  <div class="p2-fig"><SquidJetSvg /></div>
  <div class="tip-hint" v-click="1">喷水方向与身体运动方向相反。</div>
</div>

---
---

# 反冲现象

<div class="page-grow pt3">
  <div class="ask p3-ask">发射炮弹、步枪射击时，为什么炮身或枪身会向后退？</div>
  <div class="half-grid p3-grid">
    <div class="p3-case">
      <mdi-fire class="icon-xl p3-icon" />
      <div class="p3-title">发射炮弹</div>
      <div class="p3-text">炮弹向前飞出，炮身向后退。</div>
    </div>
    <div class="p3-case">
      <mdi-pistol class="icon-xl p3-icon" />
      <div class="p3-title">步枪射击</div>
      <div class="p3-text">子弹向前飞出，枪身向后运动。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">一个物体分成两部分，一部分向前运动，另一部分向相反方向运动。</div>
</div>

---
---

# 反冲的动量解释

<div class="page-grow pt4">
  <div class="half-grid p4-grid">
    <div class="p4-fig"><RecoilCannonSvg :show-arrows="$clicks >= 2" /></div>
    <div class="divider-l p4-side">
      <div class="ask p4-ask">炮弹射出后，炮身为什么向后退？</div>
      <div class="p4-line" v-click="1">射击前，炮弹和炮身都静止，总动量为 0。</div>
      <div class="p4-line" v-click="2">射击时，内力远大于外力，系统动量守恒。</div>
      <div class="p4-line" v-click="3">炮弹向前，炮身向后，总动量仍为 0。</div>
    </div>
  </div>
</div>

---
---

# 反冲速度

<div class="page-grow pt5">
  <div class="ask p5-ask">炮弹和炮身的速度大小有什么关系？</div>
  <div class="p5-grid">
    <div class="p5-derive">
      <div class="p5-line"><Latex tex="m v + M V = 0" display /></div>
      <div class="p5-line" v-click="1"><Latex tex="V = -\frac{m}{M}v" display /></div>
      <div class="p5-line" v-click="2"><Latex tex="\frac{v}{V} = \frac{M}{m}" display /></div>
    </div>
    <div class="divider-l p5-example">
      <div class="p5-ex-title" v-click="3">炮身 <Latex tex="M=1000\ \text{kg}" />，炮弹 <Latex tex="m=10\ \text{kg}" />。<br>炮弹速度 <Latex tex="v=800\ \text{m/s}" />。</div>
      <div class="p5-ex-line" v-click="3"><Latex tex="V=\frac{m}{M}v=8\ \text{m/s}" /></div>
      <div class="p5-note" v-click="3">方向与炮弹相反。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="4">质量越大，反冲速度越小；速度大小与质量成反比。</div>
</div>

---
---

# 反冲速度与质量

<div class="page-grow pt6">
  <div class="ask p6-ask">炮弹速度不变，改变炮弹和炮身的质量，反冲速度怎样变？</div>
  <RecoilDemo />
  <div class="tip-hint" v-click="1"><Latex tex="V=\frac{m}{M}v" />：炮弹质量越大、炮身质量越小，反冲速度越大。</div>
</div>

---
---

# 做一做：气球与旋转容器

<div class="page-grow pt7">
  <div class="ask p7-ask">放开气球口、让水从弯管流出，会发生什么？</div>
  <div class="half-grid p7-grid">
    <div class="p7-case">
      <mdi-balloon class="icon-xl p7-icon" />
      <div class="p7-title">气球</div>
      <div class="p7-text">松开通气口，气体喷出，气球向相反方向运动。</div>
    </div>
    <div class="p7-case">
      <mdi-rotate-right class="icon-xl p7-icon" />
      <div class="p7-title">旋转容器</div>
      <div class="p7-text">水从弯管流出，容器向水流喷出的反方向旋转。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">它们都靠反冲：喷出气体或水，容器获得相反方向的动量。</div>
</div>

---
---

# 反冲的利用与防止

<div class="page-grow pt8">
  <div class="ask p8-ask">反冲有哪些应用？又要注意什么？</div>
  <div class="half-grid p8-grid">
    <div class="p8-col">
      <div class="mini-title p8-heading"><mdi-check-circle-outline class="p8-icon" />利用</div>
      <div class="p8-item"><mdi-sprinkler class="p8-item-icon" /><div><b>喷灌装置</b><span>喷口偏斜，喷管因反冲自动旋转。</span></div></div>
      <div class="p8-item"><mdi-rocket-launch class="p8-item-icon" /><div><b>火箭</b><span>燃气向后喷出，箭体向前飞行。</span></div></div>
    </div>
    <div class="divider-l p8-col">
      <div class="mini-title p8-heading"><mdi-alert-outline class="p8-icon p8-warn" />防止</div>
      <div class="p8-item"><mdi-pistol class="p8-item-icon" /><div><b>步枪后坐</b><span>枪身反冲影响瞄准，射击时抵肩。</span></div></div>
      <div class="p8-note">反冲既可以利用，也要注意减小它的影响。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">利用反冲时，让喷出物获得动量；防止反冲时，设法减小反冲速度或吸收冲击。</div>
</div>

---
---

# 火箭为什么能在太空飞行

<div class="page-grow pt9">
  <div class="ask p9-ask">太空中没有空气，火箭靠什么前进？</div>
  <div class="half-grid p9-grid">
    <div class="p9-fig"><RocketJetSvg /></div>
    <div class="divider-l p9-side">
      <div class="p9-points" v-click="1">
        <div class="p9-point"><mdi-check-circle-outline class="p9-icon" /><div>火箭自带燃料和氧化剂，不依赖空气。</div></div>
        <div class="p9-point"><mdi-check-circle-outline class="p9-icon" /><div>燃气向后喷出，火箭获得向前的动量。</div></div>
      </div>
    </div>
  </div>
</div>

---
---

# 思考与讨论：太空中的抛体

<div class="page-grow pt10">
  <div class="ask p10-ask">质量 <Latex tex="m" /> 的人与飞船相对静止，以相对飞船速度 <Latex tex="u" /> 抛出质量 <Latex tex="\Delta m" /> 的物体。三者的动量怎样变？</div>
  <div class="p10-questions">
    <div class="p10-q">
      <span class="p10-no">1</span>
      <div class="p10-text">小物体的动量改变量？</div>
      <div class="p10-ans" v-click="1"><Latex tex="\Delta p_{\text{物}}=\Delta m\,u" /></div>
    </div>
    <div class="p10-q">
      <span class="p10-no">2</span>
      <div class="p10-text">人的动量改变量？</div>
      <div class="p10-ans" v-click="2"><Latex tex="\Delta p_{\text{人}}=-\Delta m\,u" /></div>
    </div>
    <div class="p10-q">
      <span class="p10-no">3</span>
      <div class="p10-text">人的速度改变量？</div>
      <div class="p10-ans" v-click="3"><Latex tex="\Delta v=-\frac{\Delta m}{m}u" /></div>
    </div>
  </div>
  <div class="tip-hint" v-click="3">两者的动量变化大小相等、方向相反。</div>
</div>

---
---

# 火箭一次喷气

<div class="page-grow pt11">
  <div class="ask p11-ask">喷出质量为 <Latex tex="\Delta m" /> 的燃气，火箭的速度改变多少？</div>
  <div class="p11-steps">
    <div class="p11-step" v-click="1"><span class="p11-no">1</span><div>以喷气前的火箭为参考系，喷气前总动量为 0。</div></div>
    <div class="p11-step" v-click="2"><span class="p11-no">2</span><div>喷气后，火箭动量 <Latex tex="m\Delta v" />，燃气动量 <Latex tex="\Delta m\,u" />。</div></div>
    <div class="p11-step" v-click="3"><span class="p11-no">3</span><div>由动量守恒：<Latex tex="m\Delta v+\Delta m\,u=0" />。</div></div>
  </div>
  <div class="p11-eq" v-click="3"><Latex tex="\Delta v=-\frac{\Delta m}{m}u" display /></div>
  <div class="tip-hint" v-click="4"><Latex tex="u" /> 越大、<Latex tex="\Delta m/m" /> 越大，火箭获得的速度改变越大；负号表示与燃气喷出方向相反。</div>
</div>

---
---

# 喷气速度与质量比

<div class="page-grow pt12">
  <div class="ask p12-ask">怎样让火箭获得更大的速度？</div>
  <div class="p12-data">
    <div class="p12-card">
      <div class="p12-k">喷气速度</div>
      <div class="p12-v"><Latex tex="u=2000\sim5000\ \text{m/s}" /></div>
      <div class="p12-n">近期很难大幅提高</div>
    </div>
    <div class="p12-card">
      <div class="p12-k">质量比</div>
      <div class="p12-v"><span>起飞质量 / 箭体质量</span> <Latex tex="\lt 10" /></div>
      <div class="p12-n">受结构强度限制</div>
    </div>
  </div>
  <div class="p12-ways">
    <div class="p12-way" v-click="1">提高喷气速度 <Latex tex="u" /></div>
    <div class="p12-way" v-click="2">提高质量比：减轻箭体结构</div>
    <div class="p12-way" v-click="3">单级火箭仍达不到 <Latex tex="7.9\ \text{km/s}" />，需要多级</div>
  </div>
</div>

---
---

# 多级火箭

<div class="page-grow pt13">
  <div class="ask p13-ask">为什么要把火箭做成多级？</div>
  <div class="p13-steps">
    <div class="p13-step" v-click="1"><span class="p13-no">1</span><div>一级燃料用完，抛掉空箭体，继续飞行时质量更小。</div></div>
    <div class="p13-step" v-click="2"><span class="p13-no">2</span><div>级数越多，连接和控制机构越多，可靠性降低；一般不超过四级。</div></div>
    <div class="p13-step" v-click="3"><span class="p13-no">3</span><div>我国航天：2022 年底发射次数突破 450 次，完成卫星、载人、探月探火。</div></div>
  </div>
  <div class="mini-note p13-note" v-click="3">多级火箭通过逐级抛掉箭体来提高质量比。</div>
</div>

---
layout: exercise-split
title: 例题：航天员返回
analysisLabel: 解析
---

<template v-slot:stem>
航天员与装备总质量 <Latex tex="100\ \text{kg}" />，与飞船相距 <Latex tex="45\ \text{m}" />，相对飞船静止。高压气源能以 <Latex tex="50\ \text{m/s}" /> 喷气。要在 <Latex tex="10\ \text{min}" /> 内返回，开始瞬间一次性向后喷出多少气体？
</template>

<div class="p14-analysis">
  <div class="p14-line" v-click="1">返回速度 <Latex tex="v=\frac{45}{600}=0.075\ \text{m/s}" />。</div>
  <div class="p14-line" v-click="2">取返回方向为正，喷气前后总动量为 0：<Latex tex="(100-\Delta m)v-\Delta m\cdot 50=0" />。</div>
  <div class="p14-line" v-click="3"><Latex tex="\Delta m=\frac{100v}{50+v}\approx 0.15\ \text{kg}" />。</div>
</div>

---
layout: exercise-split
title: 例题：卫星与末级火箭分离
analysisLabel: 解析
---

<template v-slot:stem>
末级火箭壳体与卫星一起以 <Latex tex="7.0\times10^3\ \text{m/s}" /> 绕地球做匀速圆周运动。卫星质量 <Latex tex="500\ \text{kg}" />，壳体质量 <Latex tex="100\ \text{kg}" />。分离时，卫星与壳体沿轨道切线方向的相对速度为 <Latex tex="1.8\times10^3\ \text{m/s}" />。求分离后卫星和壳体的速度，并说明它们如何运动。
</template>

<div class="p15-analysis">
  <div class="p15-line" v-click="1">取分离前速度方向为正，总动量 <Latex tex="(500+100)\times7.0\times10^3=4.2\times10^6\ \text{kg}\cdot\text{m/s}" />。</div>
  <div class="p15-line" v-click="2">设卫星速度 <Latex tex="v_s" />、壳体速度 <Latex tex="v_c" />：<Latex tex="v_s-v_c=1.8\times10^3" />，<Latex tex="500v_s+100v_c=4.2\times10^6" />。</div>
  <div class="p15-line" v-click="3">解得 <Latex tex="v_s=7.3\times10^3\ \text{m/s}" />，<Latex tex="v_c=5.5\times10^3\ \text{m/s}" />。</div>
  <div class="p15-line" v-click="3">卫星速度大于圆周速度，做离心运动；壳体速度小于圆周速度，做向心运动。</div>
</div>

---
layout: exercise-split
title: 练习：喷气与火箭速度
analysisLabel: 解析
---

<template v-slot:stem>
长征五号火箭的速度达到 <Latex tex="8000\ \text{m/s}" /> 时，喷出气体相对火箭的速度小于 <Latex tex="8000\ \text{m/s}" />。此时在地面参考系中，气体的速度方向与火箭相同。继续喷气，火箭的速度还会增加吗？为什么？
</template>

<div class="p16-analysis">
  <div class="p16-line" v-click="1">会。判断火箭是否加速，要看燃气相对火箭的速度 <Latex tex="u" />，而不是地面参考系中燃气的方向。</div>
  <div class="p16-line" v-click="2">取火箭前进方向为正，燃气相对火箭的速度为 <Latex tex="-u" />：<Latex tex="m\Delta v+\Delta m(-u)=0" />，所以 <Latex tex="\Delta v=\frac{\Delta m}{m}u>0" />。</div>
  <div class="p16-line" v-click="3">只要燃气相对火箭向后喷出，火箭就获得向前的动量，速度继续增加。</div>
</div>

---
layout: exercise-split
title: 练习：步枪与皮划艇
analysisLabel: 解析
---

<template v-slot:stem>
士兵、装备和皮划艇总质量 <Latex tex="120\ \text{kg}" />。士兵在 <Latex tex="2\ \text{s}" /> 内水平连射 10 发子弹，每发子弹质量 <Latex tex="10\ \text{g}" />，相对步枪的速度为 <Latex tex="800\ \text{m/s}" />。射击前皮划艇静止，不计水的阻力。求：(1) 每发子弹射出后艇的速度改变量；(2) 连续射击后艇的速度；(3) 枪受到的平均反冲力。
</template>

<div class="p17-analysis">
  <div class="p17-line" v-click="1">每发子弹的动量 <Latex tex="p=0.010\times800=8\ \text{kg}\cdot\text{m/s}" />，艇的速度改变 <Latex tex="\Delta v=\frac{8}{120}\approx0.067\ \text{m/s}" />。</div>
  <div class="p17-line" v-click="2">10 发子弹总动量 <Latex tex="80\ \text{kg}\cdot\text{m/s}" />，艇的速度 <Latex tex="V=\frac{80}{120}\approx0.67\ \text{m/s}" />。</div>
  <div class="p17-line" v-click="3">平均反冲力 <Latex tex="F=\frac{80}{2}=40\ \text{N}" />，方向与子弹射出方向相反。</div>
</div>

---

# 课堂小结

<div class="page-grow pt18">
  <div class="step-list p18-list">
    <div class="step-item p18-item" v-click="1"><span class="step-no">1</span><div>反冲：系统内力远大于外力，动量守恒；两部分向相反方向运动。</div></div>
    <div class="step-item p18-item" v-click="2"><span class="step-no">2</span><div>反冲速度：<Latex tex="mv+MV=0" />，<Latex tex="V=-\frac{m}{M}v" />；质量越大，反冲速度越小。</div></div>
    <div class="step-item p18-item" v-click="3"><span class="step-no">3</span><div>火箭：<Latex tex="\Delta v=-\frac{\Delta m}{m}u" />；提高喷气速度、提高质量比，采用多级火箭。</div></div>
    <div class="step-item p18-item" v-click="4"><span class="step-no">4</span><div>应用与防止：喷灌、火箭；步枪后坐、缓冲。</div></div>
  </div>
</div>
