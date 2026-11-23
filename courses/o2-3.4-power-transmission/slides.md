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

<div class="page-grow pt2">
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

<div class="page-grow pt3">
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
  <div class="half-grid pt4">
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

<div class="page-grow pt5">
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

<div class="page-grow pt6">
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

<div class="page-grow pt7">
  <div class="ask">输送功率不变，怎样让输电线里的电流小下来？</div>
  <div class="p7-flow">
    <div class="p7-row"><span class="p7-tag">功率与电压</span><Latex tex="P = UI \;\Longrightarrow\; I = \dfrac{P}{U}" /></div>
    <div class="p7-row" v-click="1"><span class="p7-tag">电压升高 <Latex tex="n" /> 倍</span><Latex tex="U \to nU \;\Longrightarrow\; I \to \dfrac{I}{n}" /></div>
    <div class="p7-row" v-click="2"><span class="p7-tag">线路损耗</span><Latex tex="P_{\text{损}} = I^2 r \;\Longrightarrow\; P_{\text{损}} \to \dfrac{P_{\text{损}}}{n^2}" /></div>
  </div>
  <div class="tip-hint" v-click="3">所以远距离输电采用高压：电压升高 <Latex tex="n" /> 倍，线路损耗降为 <Latex tex="\dfrac{1}{n^2}" />。</div>
</div>

---
layout: base-flex
title: 我国的输电电压
clicks: 1
---

# 我国的输电电压

<div class="page-grow pt8">
  <div class="p8-levels">
    <div class="p8-item">
      <div class="p8-kv"><Latex tex="110 / 220 / 330\ \text{kV}" /></div>
      <div class="p8-cap">远距离输电常用电压</div>
    </div>
    <div class="p8-item">
      <div class="p8-kv"><Latex tex="500 / 750\ \text{kV}" /></div>
      <div class="p8-cap">超高压 · 输电干线</div>
    </div>
    <div class="p8-item">
      <div class="p8-kv"><Latex tex="1\,100\ \text{kV}" /></div>
      <div class="p8-cap">特高压 · 西北电网</div>
    </div>
  </div>
  <div class="ask p8-ask">输电电压是不是越高越好？</div>
  <div class="warn-hint" v-click="1">电压越高，对绝缘的要求越高，线路修建费用越多，对变压器的要求也越高。要综合输送功率、距离和技术经济条件来选择。</div>
</div>

---
layout: base-flex
title: 电压与线路损耗
clicks: 1
---

# 电压与线路损耗

<div class="page-grow pt9">
  <div class="ask">输送功率 <Latex tex="P" /> 和输电线电阻 <Latex tex="r" /> 不变，提高输电电压 <Latex tex="U" />，损耗怎样变？</div>
  <PowerLossDemo />
  <div class="tip-hint" v-click="1">电压升高 <Latex tex="n" /> 倍，电流变为 <Latex tex="\dfrac{1}{n}" />，功率损失变为 <Latex tex="\dfrac{1}{n^2}" />。</div>
</div>

---
layout: base-flex
title: 远距离输电的系统
clicks: 1
---

# 远距离输电的系统

<div class="page-grow pt10">
  <div class="ask">发电站发出的 <Latex tex="10\ \text{kV}" /> 电压，为什么要先升高、再逐级降低？</div>
  <PowerChainSvg :step="$clicks" />
  <div class="tip-hint" v-click="1">升压是为了减小输电线电流，降压是为了让用户安全用电。</div>
</div>

---
layout: base-flex
title: 输电链路中的功率与电压
---

# 输电链路中的功率与电压

<div class="page-grow pt11">
  <div class="mini-note p11-legend">升压变压器原、副线圈电压为 <Latex tex="U_1" />、<Latex tex="U_2" />，降压变压器为 <Latex tex="U_3" />、<Latex tex="U_4" />；输电线中的电流为 <Latex tex="I_{\text{线}}" />。</div>
  <div class="p11-grid">
    <div class="p11-card">
      <div class="mini-title">升压变压器</div>
      <div class="p11-eq"><Latex tex="\dfrac{U_1}{U_2} = \dfrac{n_1}{n_2}" /></div>
      <div class="p11-eq"><Latex tex="P_1 = P_2" /></div>
    </div>
    <div class="p11-card">
      <div class="mini-title">输电线</div>
      <div class="p11-eq"><Latex tex="I_{\text{线}} = I_2 = I_3" /></div>
      <div class="p11-eq"><Latex tex="U_{\text{损}} = I_{\text{线}} r" />，<Latex tex="P_{\text{损}} = I_{\text{线}}^2 r" /></div>
    </div>
    <div class="p11-card">
      <div class="mini-title">降压变压器</div>
      <div class="p11-eq"><Latex tex="\dfrac{U_3}{U_4} = \dfrac{n_3}{n_4}" /></div>
      <div class="p11-eq"><Latex tex="P_3 = P_4" /></div>
    </div>
    <div class="p11-card p11-result">
      <div class="mini-title">线路前后</div>
      <div class="p11-eq"><Latex tex="U_3 = U_2 - U_{\text{损}}" /></div>
      <div class="p11-eq"><Latex tex="P_4 = P_1 - P_{\text{损}}" /></div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 电网
---

# 电网

<div class="page-grow pt12">
  <div class="p12-def"><span class="p12-key">电网</span>由网状的输电线、变电站连接许多电厂和用户。</div>
  <div class="p12-grid">
    <div class="p12-benefit">
      <mdi-factory class="icon-lg" />
      <div><b>大容量机组</b><span>降低一次能源的运输成本</span></div>
    </div>
    <div class="p12-benefit">
      <mdi-shield-check-outline class="icon-lg" />
      <div><b>减小断电风险</b><span>电网互连，一处故障仍可供电</span></div>
    </div>
    <div class="p12-benefit">
      <mdi-chart-line class="icon-lg" />
      <div><b>调剂供需平衡</b><span>合理调度，充分利用发电能力</span></div>
    </div>
    <div class="p12-benefit">
      <mdi-flash class="icon-lg" />
      <div><b>供电更可靠</b><span>电压、频率稳定，电能质量高</span></div>
    </div>
  </div>
</div>
