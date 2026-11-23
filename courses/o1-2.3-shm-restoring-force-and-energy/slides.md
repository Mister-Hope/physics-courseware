---
theme: default
title: "简谐运动的回复力和能量"
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
chapter-no: "2.3"
chapter: "第二章 机械振动"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 这些运动有什么共同点？
clicks: 2
---

<div class="page-grow em-intro">
  <div class="em-intro-row">
    <div class="em-intro-item">
      <mdi-seesaw class="icon-xl em-intro-icon" />
      <div class="em-intro-label">跷跷板</div>
    </div>
    <div class="em-intro-item">
      <mdi-lifebuoy class="icon-xl em-intro-icon" />
      <div class="em-intro-label">水中的浮标</div>
    </div>
    <div class="em-intro-item">
      <mdi-sine-wave class="icon-xl em-intro-icon" />
      <div class="em-intro-label">弹簧振子</div>
    </div>
  </div>
  <div class="ask em-intro-ask">这些运动有什么共同点？</div>
  <div class="em-reserve">
    <div class="tip-hint" v-click="1">它们都在平衡位置附近往复运动，都受到一个指向平衡位置的力。</div>
  </div>
  <div class="em-reserve">
    <div class="info-hint" v-click="2">这个力叫作回复力。</div>
  </div>
</div>

---
layout: base-flex
title: 小球为什么总回到平衡位置？
clicks: 2
---

<div class="page-grow em-definition">
  <div class="em-def-grid">
    <div class="em-def-copy">
      <div class="ask">小球被拉离平衡位置后，为什么总回到 <Latex tex="O" />？</div>
      <div class="em-def-slot" v-click="1">
        <DefinitionBox term="回复力" tone="gold">使物体回到平衡位置的力。</DefinitionBox>
      </div>
    </div>
    <div class="em-def-figure">
      <SpringOscillatorSvg :show-force="$clicks >= 1" show-x />
      <div class="em-reserve">
        <div class="info-hint" v-click="2">回复力是按效果命名的力，不是一种新的性质力。</div>
      </div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 弹簧振子的回复力
clicks: 2
---

<div class="page-grow em-force-page">
  <div class="ask">小球在 <Latex tex="P" /> 点或 <Latex tex="Q" /> 点时，回复力指向哪里？</div>
  <div class="em-two-osc">
    <div class="em-osc-cell">
      <SpringOscillatorSvg side="right" :show-force="$clicks >= 1" show-x />
      <div class="em-osc-cap"><Latex tex="P" /> 点：<Latex tex="F" /> 指向 <Latex tex="O" /></div>
    </div>
    <div class="em-osc-cell">
      <SpringOscillatorSvg side="left" :show-force="$clicks >= 1" show-x />
      <div class="em-osc-cap"><Latex tex="Q" /> 点：<Latex tex="F" /> 指向 <Latex tex="O" /></div>
    </div>
  </div>
  <div class="em-force-result">
    <div class="em-formula" v-click="2"><Latex tex="F=-kx" display /></div>
    <div class="em-reserve em-force-hint">
      <div class="info-hint" v-click="2">“<Latex tex="-" />”表示 <Latex tex="F" /> 与位移 <Latex tex="x" /> 的方向相反。</div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 从受力到加速度
clicks: 2
---

<div class="page-grow em-derive-page">
  <div class="ask">已知 <Latex tex="F=-kx" />，小球的加速度怎样随位移变化？</div>
  <div class="em-derive" v-click="1">
    <div class="em-derive-step">
      <div class="em-derive-label">由牛顿第二定律</div>
      <Latex tex="a=\frac{F}{m}=-\frac{k}{m}x" display />
    </div>
    <div class="em-derive-step">
      <div class="em-derive-label">令 <Latex tex="\omega=\sqrt{k/m}" /></div>
      <Latex tex="\omega=\sqrt{\frac{k}{m}}" display />
    </div>
    <div class="em-derive-step em-derive-final">
      <div class="em-derive-label">得</div>
      <Latex tex="a=-\omega^2x" display />
    </div>
  </div>
  <div class="em-reserve">
    <div class="tip-hint" v-click="2">加速度与位移大小成正比、方向相反。物体所受合力具有这个特点，就做简谐运动。</div>
  </div>
</div>
