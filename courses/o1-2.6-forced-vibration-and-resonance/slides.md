---
theme: default
title: "受迫振动 共振"
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
chapter-no: "2.6"
chapter: "第二章 机械振动"
subtitle: "固有频率 · 受迫振动 · 共振"
---

<CoverDecorationSvg />

---
title: "洗盆里的水花"
---

<div class="page-grow fw-intro">
  <div class="fw-intro-q">用手掌摩擦盆耳，为什么盆会发出嗡嗡声，水花还会溅起来？</div>
  <div class="fw-intro-figure"><WashBasinSvg /></div>
  <div class="fw-intro-grid">
    <div class="fw-intro-item"><mdi-autorenew class="icon-lg" /><div>振动为什么会停？</div></div>
    <div class="fw-intro-item"><mdi-hand-back-right class="icon-lg" /><div>怎样让振动持续？</div></div>
    <div class="fw-intro-item"><mdi-chart-bell-curve class="icon-lg" /><div>为什么某种节奏下水花最大？</div></div>
  </div>
</div>

---
clicks: 1
clickAnimation: none
---

# 固有振动与固有频率

<div class="page-grow">
  <div class="ask">没有外力时，振动的快慢由什么决定？</div>
  <div class="half-grid">
    <div class="fw-figure"><SpringOscillatorSvg :show-labels="false" /></div>
    <div class="stack">
      <div><b>固有振动</b>：弹簧振子或单摆在没有外力干预时的振动。</div>
      <div><b>固有频率</b>：固有振动的频率，只由系统自身的性质决定。</div>
      <div class="mini-note">单摆：<Latex tex="f_0=\frac{1}{2\pi}\sqrt{\frac{g}{L}}" />，摆长越长，<Latex tex="f_0" /> 越小。</div>
      <div class="mini-note">弹簧振子：<Latex tex="f_0=\frac{1}{2\pi}\sqrt{\frac{k}{m}}" />，质量越大、弹簧越软，<Latex tex="f_0" /> 越小。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">固有频率只由系统自身性质决定，与振幅无关。</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 阻尼振动

<div class="page-grow">
  <div class="ask">为什么秋千会慢慢停下来？</div>
  <div class="half-grid">
    <div class="fw-chart"><DampedVibrationGraph :step="$clicks" /></div>
    <div class="stack">
      <div><b>阻尼振动</b>：实际振动受到摩擦、黏滞力等阻力，振幅随时间逐渐减小。</div>
      <div>振动系统的机械能不断减少。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">阻力使机械能转化为内能，振幅越来越小，振动最终会停下来。</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 振动中的能量损失

<div class="page-grow">
  <div class="ask">振动系统的能量到哪里去了？</div>
  <div class="half-grid">
    <div class="stack">
      <div class="mini-title">摩擦阻力</div>
      <div>阻力使机械能转化为内能。单摆在空气中振动，振幅越来越小。</div>
    </div>
    <div class="divider-l stack">
      <div class="mini-title">能量辐射</div>
      <div>系统引起周围介质振动，能量以波的形式向四周辐射。音叉发声时，一部分能量变成声波。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">摩擦生热和能量辐射，都会让振动系统的机械能减少。</div>
  <div class="summary-line" v-click="2">能量并没有消失，只是转化成了内能或辐射到周围空间。</div>
</div>

---
clicks: 1
clickAnimation: none
zoom: 0.95
---

# 受迫振动

<div class="page-grow page-grow-tight">
  <div class="ask">阻尼振动最终会停下，怎样让振动持续？</div>
  <div class="fw-figure-wide"><DrivenOscillatorSvg /></div>
  <div class="half-grid">
    <div><b>驱动力</b>：作用在振动系统上的周期性外力。</div>
    <div><b>受迫振动</b>：系统在驱动力作用下的振动。</div>
  </div>
  <div class="tip-hint" v-click="1">驱动力做功能补偿阻力消耗的能量，振动就能持续下去。</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 受迫振动的频率

<div class="page-grow">
  <div class="ask">稳定后，振动的频率由什么决定？</div>
  <ForcedFrequency />
  <div class="tip-hint" v-click="1">稳定后，物体振动的频率等于驱动力的频率，与物体的固有频率无关。</div>
</div>
