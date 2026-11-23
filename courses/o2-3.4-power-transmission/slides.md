---
theme: default
title: "电能的输送"
titleTemplate: '%s'
subtitle: "从输电线的损耗到高压输电"
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
chapter: "第三章 交变电流"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 远距离输电的问题
---

<div class="page-grow p2">
  <div class="ask ask-lead p2-ask">我国很多发电厂建在能源聚集的西部，<br />用电量大的城市多在东部沿海。<br />把电能送到远方，怎样才能减少损耗？</div>
  <div class="p2-route">
    <div class="p2-end"><mdi-factory class="icon-lg" /><span>西部发电厂</span></div>
    <div class="p2-wire"><span>远距离</span></div>
    <div class="p2-end"><mdi-city-variant-outline class="icon-lg" /><span>东部用电城市</span></div>
  </div>
</div>

---
layout: base-flex
title: 输送电能的基本要求
---

# 输送电能的基本要求

<div class="page-grow p3">
  <div class="three-col p3-reqs">
    <div class="p3-req">
      <mdi-shield-check-outline class="icon-xl p3-icon" />
      <div class="p3-word">可靠</div>
      <div class="p3-note">故障少<br />持续供电</div>
    </div>
    <div class="p3-req">
      <mdi-check-circle-outline class="icon-xl p3-icon" />
      <div class="p3-word">保质</div>
      <div class="p3-note">电压、频率稳定<br />用电器正常工作</div>
    </div>
    <div class="p3-req">
      <mdi-currency-cny class="icon-xl p3-icon" />
      <div class="p3-word">经济</div>
      <div class="p3-note">建造、运行费用低<br />电能损耗少</div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 输电线上的损耗
---

# 输电线上的损耗

<div class="page-grow">
  <div class="half-grid p4">
    <div class="p4-fig"><LossDiagramSvg /></div>
    <div class="divider-l p4-side">
      <div class="ask">电流通过输电线，会损失什么？</div>
      <div class="p4-formula" v-click="1">
        <div class="p4-tag">功率损失</div>
        <div class="p4-math"><Latex tex="P_{\text{损}} = I^2 r" /></div>
      </div>
      <div class="p4-formula" v-click="2">
        <div class="p4-tag">电压损失</div>
        <div class="p4-math"><Latex tex="U_{\text{损}} = Ir" /></div>
      </div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 两条途径的比较
clicks: 1
---

# 两条途径的比较

<div class="page-grow p5">
  <div class="ask">输送功率不变，电阻减半和电流减半，哪种办法把损耗降得更多？</div>
  <div class="half-grid p5-grid">
    <div class="p5-card">
      <div class="p5-head">电阻减半</div>
      <div class="p5-eq"><Latex tex="P_{\text{损}}' = I^2 \cdot \dfrac{r}{2} = \dfrac{1}{2}P_{\text{损}}" /></div>
    </div>
    <div class="p5-card divider-l">
      <div class="p5-head">电流减半</div>
      <div class="p5-eq"><Latex tex="P_{\text{损}}' = \left(\dfrac{I}{2}\right)^2 r = \dfrac{1}{4}P_{\text{损}}" /></div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">电流减半，损耗降为 <Latex tex="\dfrac{1}{4}" />；电阻减半只降为 <Latex tex="\dfrac{1}{2}" />。减小电流更有效。</div>
</div>

---
layout: base-flex
title: 途径一：减小输电线的电阻
---

# 途径一：减小输电线的电阻

<div class="page-grow p6">
  <div class="p6-formula"><Latex tex="r = \rho \frac{L}{S}" display /></div>
  <div class="half-grid">
    <div>
      <div class="mini-title">可行的做法</div>
      <div class="p6-item"><mdi-check-circle-outline class="icon-md" />选电阻率 <Latex tex="\rho" /> 小的铜、铝</div>
      <div class="p6-item"><mdi-check-circle-outline class="icon-md" />尽可能增大横截面积 <Latex tex="S" /></div>
    </div>
    <div class="divider-l">
      <div class="mini-title">限制</div>
      <div class="warn-hint">导线过粗，耗费大量金属材料；又重又粗，给架线施工带来困难。</div>
      <div class="mini-note">只靠减小电阻，降低损耗的作用有限。</div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 途径二：减小输电电流
clicks: 3
---

# 途径二：减小输电电流

<div class="page-grow p7">
  <div class="ask">输送功率不变，怎样让输电线里的电流小下来？</div>
  <div class="p7-flow">
    <div class="p7-row"><span class="p7-tag">功率与电压</span><Latex tex="P = UI \;\Longrightarrow\; I = \dfrac{P}{U}" /></div>
    <div class="p7-row" v-click="1"><span class="p7-tag">电压升高 <Latex tex="n" /> 倍</span><Latex tex="U \to nU \;\Longrightarrow\; I \to \dfrac{I}{n}" /></div>
    <div class="p7-row" v-click="2"><span class="p7-tag">线路损耗</span><Latex tex="P_{\text{损}} = I^2 r \;\Longrightarrow\; P_{\text{损}} \to \dfrac{P_{\text{损}}}{n^2}" /></div>
  </div>
  <div class="tip-hint" v-click="3">所以远距离输电采用高压：电压升高 <Latex tex="n" /> 倍，线路损耗降为 <Latex tex="\dfrac{1}{n^2}" />。</div>
</div>
