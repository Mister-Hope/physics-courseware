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
