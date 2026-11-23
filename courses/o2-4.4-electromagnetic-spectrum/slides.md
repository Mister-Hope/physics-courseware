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
