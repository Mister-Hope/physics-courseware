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

---
layout: base-flex
title: 回复力和加速度怎样随位移变化？
clicks: 1
---

<div class="page-grow em-lab-page">
  <div class="ask">回复力和加速度怎样随位移变化？</div>
  <ForceAccelerationLab />
  <div class="em-reserve">
    <div class="tip-hint" v-click="1"><Latex tex="F" /> 与 <Latex tex="x" /> 方向相反，<Latex tex="a" /> 与 <Latex tex="F" /> 同向，二者都指向平衡位置。</div>
  </div>
</div>

---
layout: base-flex
title: 各位置的位移、速度、加速度和回复力
clicks: 1
---

<div class="page-grow em-state-page">
  <div class="ask">小球从 <Latex tex="Q" /> 运动到 <Latex tex="P" />，<Latex tex="x" />、<Latex tex="v" />、<Latex tex="a" />、<Latex tex="F" /> 怎样变化？</div>
  <ShmStateTable />
  <div class="em-reserve">
    <div class="tip-hint" v-click="1">在平衡位置 <Latex tex="O" />，<Latex tex="a=0" />、<Latex tex="F=0" />，速度最大。</div>
  </div>
</div>

---
layout: base-flex
title: 简谐运动的位移—时间图像
clicks: 1
---

<div class="page-grow em-xt-page">
  <div class="ask">弹簧振子的位移—时间图像是什么形状？</div>
  <XtGraph />
  <div class="em-reserve">
    <div class="tip-hint" v-click="1">图像是正弦曲线；经过一个周期 <Latex tex="T" />，振子回到原来的状态。</div>
  </div>
</div>

---
layout: base-flex
title: 动能和弹性势能怎样转化？
clicks: 1
---

<div class="page-grow em-energy-page">
  <div class="ask">振子从 <Latex tex="Q" /> 运动到 <Latex tex="P" />，动能和弹性势能怎样变化？</div>
  <EnergyStateTable />
  <div class="em-reserve">
    <div class="tip-hint" v-click="1">只有弹力做功，机械能守恒；动能和弹性势能相互转化。</div>
  </div>
</div>

---
layout: base-flex
title: 能量的定量表示
clicks: 2
---

<div class="page-grow em-energy-eq-page">
  <div class="ask">弹簧振子的能量怎样定量表示？</div>
  <div class="em-eq-grid">
    <div class="em-eq-card">
      <div class="em-eq-label">弹性势能</div>
      <Latex tex="E_p=\frac{1}{2}kx^2" display />
    </div>
    <div class="em-eq-card">
      <div class="em-eq-label">动能</div>
      <Latex tex="E_k=\frac{1}{2}mv^2" display />
    </div>
    <div class="em-eq-card">
      <div class="em-eq-label">机械能</div>
      <Latex tex="E=E_k+E_p" display />
    </div>
  </div>
  <div class="em-eq-derive" v-click="1">
    <Latex tex="E=\frac{1}{2}kA^2" display />
    <span>在最大位移处 <Latex tex="v=0" />，<Latex tex="E=E_p" />。</span>
  </div>
  <div class="em-reserve">
    <div class="tip-hint" v-click="2">振幅越大，机械能越大。</div>
  </div>
</div>

---
layout: base-flex
title: 动能和弹性势能怎样随位移变化？
clicks: 1
---

<div class="page-grow em-energy-lab-page">
  <div class="ask">振子的动能和弹性势能怎样随位移变化？</div>
  <EnergyBars />
  <div class="em-reserve">
    <div class="tip-hint" v-click="1"><Latex tex="E_p+E_k" /> 保持不变，总量等于 <Latex tex="\frac{1}{2}kA^2" />。</div>
  </div>
</div>

---
layout: base-flex
title: 证明斜面上的小球做简谐运动
clicks: 4
---

<div class="page-grow em-incline-page">
  <div class="em-incline-left">
    <div class="em-exercise-stem">一根轻弹簧固定在斜面顶端，下端与小球相连。把小球沿斜面向下拉开一段距离后由静止释放。证明小球的运动是简谐运动。</div>
    <div class="em-proof">
      <div class="em-proof-step" v-click="1"><span class="em-proof-no">1</span><div>设平衡位置为 <Latex tex="O" />，此时弹簧伸长 <Latex tex="x_0" />。在 <Latex tex="O" /> 点：<Latex tex="mg\sin\theta=kx_0" />。</div></div>
      <div class="em-proof-step" v-click="2"><span class="em-proof-no">2</span><div><div>从 <Latex tex="O" /> 沿斜面向下移动 <Latex tex="x" />，弹簧伸长 <Latex tex="x_0+x" />。</div><div>合力：<Latex tex="F=mg\sin\theta-k(x_0+x)" />。</div></div></div>
      <div class="em-proof-step" v-click="3"><span class="em-proof-no">3</span><div>代入 <Latex tex="mg\sin\theta=kx_0" />，得 <Latex tex="F=-kx" />。</div></div>
      <div class="em-proof-step" v-click="4"><span class="em-proof-no">4</span><div>小球所受合力与位移大小成正比、方向相反，所以小球做简谐运动。</div></div>
    </div>
  </div>
  <div class="em-incline-figure">
    <InclineSpringSvg :show-forces="$clicks >= 1" :show-displacement="$clicks >= 2" />
  </div>
</div>
