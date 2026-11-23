---
theme: default
title: "电磁波谱"
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
chapter-no: "4.4"
chapter: "第四章 电磁振荡与电磁波"
---

<CoverDecorationSvg />

---
clicks: 2
clickAnimation: none
title: 生活里的电磁波
---

<div class="page-grow em-intro">
<div class="ask ask-lead text-3xl leading-normal">这些设备有什么共同点？</div>
<div class="em-devices">
<div class="em-device">
<mdi-radio class="icon-xl em-device-icon" />
<span class="em-device-name">收音机</span>
<span class="em-device-band" v-click="1">无线电波</span>
</div>
<div class="em-device">
<mdi-remote class="icon-xl em-device-icon" />
<span class="em-device-name">遥控器</span>
<span class="em-device-band" v-click="1">红外线</span>
</div>
<div class="em-device">
<mdi-cellphone class="icon-xl em-device-icon" />
<span class="em-device-name">手机</span>
<span class="em-device-band" v-click="1">无线电波</span>
</div>
<div class="em-device">
<mdi-microwave class="icon-xl em-device-icon" />
<span class="em-device-name">微波炉</span>
<span class="em-device-band" v-click="1">微波</span>
</div>
<div class="em-device">
<mdi-radiology-box class="icon-xl em-device-icon" />
<span class="em-device-name">拍 X 光片</span>
<span class="em-device-band" v-click="1">X 射线</span>
</div>
</div>
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="2">它们利用的都是电磁波，区别在于波长（频率）不同。</div>
</div>
</div>

---
title: 太阳只发出可见光吗？
---

<div class="page-grow em-sun">
<div class="ask ask-lead text-3xl leading-normal">太阳发出的电磁波只有可见光吗？</div>
<div class="em-sun-fact">
<mdi-weather-sunny class="icon-2xl em-sun-icon" />
<div class="em-sun-copy">
<div class="em-sun-main">SDO 拍摄的 <Latex tex="21.1\ \text{nm}" /> 紫外线太阳图像，与可见光图像大不相同。</div>
<div class="em-sun-sub">被可见光模糊或遮挡的日冕，在紫外线波段清晰可见。</div>
</div>
</div>
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">太阳辐射包含波长不同的各种电磁波。</div>
</div>
<div class="em-reserve em-reserve-bands">
<div class="em-sun-bands" v-click="2">无线电波　红外线　可见光　紫外线　X 射线　<Latex tex="\gamma" /> 射线</div>
</div>
</div>

---
clicks: 6
clickAnimation: none
title: 电磁波谱
---


<div class="page-grow em-spectrum-page">
<div class="ask">把这些电磁波按波长排成一列，会得到什么？</div>
<DefinitionBox term="电磁波谱" tone="gold">
<div>按电磁波的<span class="def-term">波长大小或频率高低</span>的顺序排列成的谱。</div>
</DefinitionBox>
<SpectrumBar :step="$clicks" />
</div>

---
title: 无线电波
---

<div class="page-grow em-radio-page">
<DefinitionBox term="无线电波" tone="blue">
<div>技术上把波长大于 <Latex tex="0.1\ \text{mm}" />（频率低于 <Latex tex="3\,000\ \text{GHz}" />）的电磁波称作无线电波，并按波长（频率）划分为若干波段。</div>
</DefinitionBox>
<RadioBandTable />
<div class="mini-note">雷达利用电磁波反射定位。波长短的电磁波衍射不明显、方向性好，所以雷达用微波。</div>
</div>

---
clicks: 1
clickAnimation: none
title: 红外线
---

<div class="page-grow em-ir-page">
<div class="ask">红外线看不见，为什么能用来夜视和测温？</div>
<DefinitionBox term="红外线" tone="gold">
<div>波长比无线电波短、比可见光长。</div>
</DefinitionBox>
<div class="em-tile-grid">
<div class="em-tile">
<mdi-binoculars class="icon-lg em-tile-icon" />
<div class="em-tile-name">夜视仪、热像仪</div>
<div class="em-tile-desc">在较冷背景上探测较热物体</div>
</div>
<div class="em-tile">
<mdi-satellite-variant class="icon-lg em-tile-icon" />
<div class="em-tile-name">红外遥感</div>
<div class="em-tile-desc">勘测地热、寻找水源、监视森林火情</div>
</div>
<div class="em-tile">
<mdi-thermometer class="icon-lg em-tile-icon" />
<div class="em-tile-name">红外体温计</div>
<div class="em-tile-desc">不接触人体测体温</div>
</div>
</div>
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">所有物体都发射红外线，热物体的红外辐射比冷物体强。</div>
</div>
</div>

---
title: 可见光
---

<div class="page-grow em-visible-page">
<DefinitionBox term="可见光" tone="gold">
<div>能使眼睛产生视觉效应的电磁波，波长范围 <Latex tex="400 \sim 760\ \text{nm}" />。</div>
</DefinitionBox>
<VisibleLightTable />
<div class="tip-hint">不同波长的单色光组合，能产生各种颜色；阳光由各种色光组成。</div>
</div>

---
clicks: 1
clickAnimation: none
title: 紫外线
---

<div class="page-grow em-uv-page">
<div class="ask">紫外线为什么能灭菌，又可能伤害皮肤？</div>
<div class="em-tile-grid em-tile-grid-2">
<div class="em-tile">
<mdi-hospital class="icon-md em-tile-icon" />
<div class="em-tile-name">灭菌消毒</div>
<div class="em-tile-desc">医院、食堂用紫外线灯灭菌</div>
</div>
<div class="em-tile">
<mdi-weather-sunny class="icon-md em-tile-icon" />
<div class="em-tile-name">适量照射</div>
<div class="em-tile-desc">促进钙吸收，改善健康</div>
</div>
<div class="em-tile">
<mdi-sunglasses class="icon-md em-tile-icon" />
<div class="em-tile-name">过强照射</div>
<div class="em-tile-desc">伤害眼睛和皮肤</div>
</div>
<div class="em-tile">
<mdi-magnify class="icon-md em-tile-icon" />
<div class="em-tile-name">荧光防伪</div>
<div class="em-tile-desc">许多物质受紫外线照射会发出荧光</div>
</div>
</div>
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">紫外线具有较高能量，足以破坏细胞核中的物质。</div>
</div>
</div>

---
title: X 射线和 γ 射线
---

<div class="page-grow em-x-page">
<div class="em-x-grid">
<div class="em-x-col">
<div class="em-x-head"><mdi-radiology class="icon-lg em-x-icon" />X 射线</div>
<div class="em-x-row"><span class="em-x-label">产生</span><span>用 X 射线管产生</span></div>
<div class="em-x-row"><span class="em-x-label">特性</span><span>穿透本领很强；对生命物质有较强作用，过量会引起病变</span></div>
<div class="em-x-row"><span class="em-x-label">应用</span><span>检查人体内部器官；工业检查金属构件内部缺陷；机场安检</span></div>
</div>
<div class="em-x-col">
<div class="em-x-head"><mdi-radioactive class="icon-lg em-x-icon" /><Latex tex="\gamma" /> 射线</div>
<div class="em-x-row"><span class="em-x-label">产生</span><span>放射性原子核衰变</span></div>
<div class="em-x-row"><span class="em-x-label">特性</span><span>波长最短、能量很高；能破坏生命物质；穿透能力很强</span></div>
<div class="em-x-row"><span class="em-x-label">应用</span><span>医学上摧毁病变细胞，治疗某些癌症；探测金属构件内部缺陷</span></div>
</div>
</div>
<div class="tip-hint">X 射线和 <Latex tex="\gamma" /> 射线的波长都比紫外线短；<Latex tex="\gamma" /> 射线是波长最短的电磁波。</div>
</div>

---
title: 产生机理
clicks: 5
clickAnimation: none
---

<div class="page-grow em-mech-page">
<div class="ask">这些产生机理，分别对应哪些波段？</div>
<MechanismDiagram />
</div>

---
title: 波速、波长与频率
clicks: 1
clickAnimation: none
---

<div class="page-grow em-wave-page">
<div class="ask">不同电磁波在真空中的速度相同吗？</div>
<div class="em-wave-eq"><Latex tex="c = \lambda f \qquad \lambda = \frac{c}{f}" display /></div>
<div class="em-wave-facts">
<div class="em-wave-fact"><span class="em-wave-key">真空中</span><span>所有电磁波的速度都等于 <Latex tex="c = 3.0 \times 10^8\ \text{m/s}" /></span></div>
<div class="em-wave-fact"><span class="em-wave-key">例</span><span><Latex tex="f = 1\ \text{MHz}" /> 时，<Latex tex="\lambda = 300\ \text{m}" /></span></div>
<div class="em-wave-fact"><span class="em-wave-key">例</span><span><Latex tex="f = 10^{14}\ \text{Hz}" /> 时，<Latex tex="\lambda = 3\ \mu\text{m}" /></span></div>
</div>
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">频率越高，波长越短。</div>
</div>
</div>

---
title: 波长与频率的关系
clicks: 1
clickAnimation: none
---

<div class="page-grow em-calc-page">
<div class="ask">频率改变时，波长怎样变化？</div>
<SpectrumCalculator />
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">频率越高，波长越短。</div>
</div>
</div>

---
title: 特性与作用
clicks: 5
clickAnimation: none
---

<div class="page-grow em-trait-page">
<div class="ask">这些特性，分别对应哪些波段？</div>
<TraitGrid />
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="5">应用电磁波时，要避免过强或过量的照射。</div>
</div>
</div>

---
title: 可见光只占极窄一段
clicks: 1
clickAnimation: none
---

<div class="page-grow em-narrow-page">
<div class="ask ask-lead">可见光只占极窄一段，又正好是太阳辐射最强的范围，这是巧合吗？</div>
<NarrowVisibleBar />
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">从生物进化的角度想一想。</div>
</div>
</div>

---
title: 利用与防护
clicks: 1
clickAnimation: none
---

<div class="page-grow em-safety-page">
<div class="ask">怎样利用电磁波，又避免它的危害？</div>
<table class="em-safety-table">
<thead>
<tr><th>波段</th><th>有益应用</th><th>过量或过强的危害</th></tr>
</thead>
<tbody>
<tr><td class="em-safety-band em-safety-uv">紫外线</td><td>灭菌消毒；适量照射促进钙吸收；荧光防伪</td><td>过强照射伤害眼睛和皮肤</td></tr>
<tr><td class="em-safety-band em-safety-x">X 射线</td><td>检查人体内部器官；工业检查金属构件内部缺陷；机场安检</td><td>过量辐射会引起生物体病变</td></tr>
<tr><td class="em-safety-band em-safety-gamma"><Latex tex="\gamma" /> 射线</td><td>医学上摧毁病变细胞，治疗某些癌症；探测金属构件内部缺陷</td><td>能破坏生命物质</td></tr>
</tbody>
</table>
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">控制强度、时间和照射范围。</div>
</div>
</div>

---
title: 寻找地外文明
clicks: 1
clickAnimation: none
---

# 寻找地外文明

<div class="page-grow em-seti-page">
<div class="em-seti-list">
<div class="em-seti-row">
<div class="em-seti-year">1960</div>
<div class="em-seti-dot"></div>
<div class="em-seti-text">美国国立射电天文台用 <b>26 m</b> 射电望远镜，接收 <b>21 cm</b> 波长（氢原子辐射）的无线电信号，同年 4 月 8 日开始搜索，没有发现什么有价值的信息。</div>
</div>
<div class="em-seti-row">
<div class="em-seti-year">1972–1975</div>
<div class="em-seti-dot"></div>
<div class="em-seti-text">两台更大的射电望远镜在同一波段监听 <b>660 颗</b>类太阳恒星，仍没有新的发现。</div>
</div>
<div class="em-seti-row">
<div class="em-seti-year">1974</div>
<div class="em-seti-dot"></div>
<div class="em-seti-text">11 月 16 日，波多黎各天文台用 <b>12.6 cm</b> 波长的调频电磁波，第一次向银河系发送人类对外星人的问候。</div>
</div>
<div class="em-seti-row">
<div class="em-seti-year">现在</div>
<div class="em-seti-dot"></div>
<div class="em-seti-text">我国贵州 <b>FAST</b> 是世界最大球面射电望远镜，正在开展对地外文明的探索。</div>
</div>
</div>
<div class="em-reserve em-reserve-hint">
<div class="tip-hint" v-click="1">目前已知的文明星球只有地球，应该爱护地球。</div>
</div>
</div>

---
layout: exercise-split
title: 例题：红光的传播时间
clicks: 2
clickAnimation: none
---

<template v-slot:stem>
<div>波长为 <Latex tex="0.6\ \mu\text{m}" /> 的红光，从 <Latex tex="10\ \text{m}" /> 外传到你的眼睛需要多长时间？在这段时间内，红光传播的<span class="em-nowrap">距离</span>是波长的多少倍？</div>
<div class="em-ex-known">已知 <Latex tex="\lambda=0.6\ \mu\text{m}" />，<Latex tex="s=10\ \text{m}" />，<Latex tex="c=3.0\times10^8\ \text{m/s}" />。</div>
</template>

<div v-click="1">光在空气中的速度近似等于真空中的光速 <Latex tex="c=3.0\times10^8\ \text{m/s}" />。</div>
<div v-click="1"><Latex tex="t=\dfrac{s}{c}=\dfrac{10}{3.0\times10^8}\ \text{s}\approx3.3\times10^{-8}\ \text{s}" /></div>
<div v-click="2">传播距离是波长的 <Latex tex="\dfrac{s}{\lambda}=\dfrac{10}{0.6\times10^{-6}}\approx1.7\times10^7" /> 倍。</div>

---
layout: exercise-split
title: 例题：雷达测速
clicks: 3
clickAnimation: none
---

<template v-slot:stem>
<div>某雷达站正在跟踪一架飞机。某一时刻雷达发出一段电磁波脉冲，经过 <Latex tex="200\ \mu\text{s}" /> 收到反射波；<span class="em-nowrap">隔 <Latex tex="0.8\ \text{s}" /></span> 再发出一个脉冲，经过 <Latex tex="198\ \mu\text{s}" /> 收到反射波。求飞机飞行的速度。</div>
<div class="em-ex-known">已知 <Latex tex="t_1=200\ \mu\text{s}" />，<Latex tex="t_2=198\ \mu\text{s}" />，<Latex tex="\Delta t=0.8\ \text{s}" />，<Latex tex="c=3.0\times10^8\ \text{m/s}" />。</div>
</template>

<div v-click="1">脉冲往返一次，单程距离为 <Latex tex="\dfrac{ct}{2}" />。</div>
<div v-click="1"><Latex tex="x_1=\dfrac{c t_1}{2}=\dfrac{3.0\times10^8\times200\times10^{-6}}{2}\ \text{m}=3.0\times10^4\ \text{m}" /></div>
<div v-click="2"><Latex tex="x_2=\dfrac{c t_2}{2}=\dfrac{3.0\times10^8\times198\times10^{-6}}{2}\ \text{m}=2.97\times10^4\ \text{m}" /></div>
<div v-click="3">飞机在这段时间内靠近雷达 <Latex tex="\Delta x=x_1-x_2=300\ \text{m}" />，所以 <Latex tex="v=\dfrac{\Delta x}{\Delta t}=\dfrac{300}{0.8}\ \text{m/s}=375\ \text{m/s}" />。</div>

---
title: 课堂练习：不可见电磁波
clicks: 5
clickAnimation: none
---

<div class="page-grow em-practice-page">
<div class="ask">无线电波、红外线、紫外线、X 射线和 <Latex tex="\gamma" /> 射线各有什么用途？各举一例，并按波长<span class="em-nowrap">由长到短</span>的顺序排列。</div>
<div class="step-list em-practice-list">
<div class="step-item" v-click="1"><div class="step-no">1</div><div class="em-practice-text"><b>无线电波</b>：广播</div></div>
<div class="step-item" v-click="2"><div class="step-no">2</div><div class="em-practice-text"><b>红外线</b>：红外遥感</div></div>
<div class="step-item" v-click="3"><div class="step-no">3</div><div class="em-practice-text"><b>紫外线</b>：灭菌消毒</div></div>
<div class="step-item" v-click="4"><div class="step-no">4</div><div class="em-practice-text"><b>X 射线</b>：医学透视</div></div>
<div class="step-item" v-click="5"><div class="step-no">5</div><div class="em-practice-text"><b><Latex tex="\gamma" /> 射线</b>：治疗癌症</div></div>
</div>
</div>

---
title: 课堂小结
clicks: 5
clickAnimation: none
---

# 课堂小结

<div class="page-grow em-summary-page">
<div class="step-list em-summary-list">
<div class="step-item" v-click="1"><div class="step-no">1</div><div class="em-summary-text">电磁波谱按波长（或频率）排列：无线电波、红外线、可见光、紫外线、<span class="em-nowrap">X 射线、<Latex tex="\gamma" /> 射线</span>。</div></div>
<div class="step-item" v-click="2"><div class="step-no">2</div><div class="em-summary-text">可见光只占极窄的一段，波长范围为 <Latex tex="400\sim760\ \text{nm}" />。</div></div>
<div class="step-item" v-click="3"><div class="step-no">3</div><div class="em-summary-text">真空中所有电磁波的速度相同：<Latex tex="c=3.0\times10^8\ \text{m/s}" />，<Latex tex="c=\lambda f" />。</div></div>
<div class="step-item" v-click="4"><div class="step-no">4</div><div class="em-summary-text">不同波段有不同特性：热效应、荧光效应、穿透本领、破坏作用；应用时要防护。</div></div>
<div class="step-item" v-click="5"><div class="step-no">5</div><div class="em-summary-text">产生机理的尺度越小，波长越短。</div></div>
</div>
</div>
