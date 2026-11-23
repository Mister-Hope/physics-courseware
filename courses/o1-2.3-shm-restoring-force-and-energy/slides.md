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

---
layout: base-flex
title: 平衡位置在哪里？
clicks: 4
---

<div class="page-grow em-ab-page">
  <div class="em-incline-left">
    <div class="em-exercise-stem">一质点做简谐运动，经过 <Latex tex="A" /> 点时<span class="em-nowrap">加速度大小为</span> <Latex tex="2\,\text{m/s}^2" />，方向指向 <Latex tex="B" />；经过 <Latex tex="B" /> 点时<span class="em-nowrap">加速度大小为</span> <Latex tex="3\,\text{m/s}^2" />，方向指向 <Latex tex="A" />。<Latex tex="A" />、<Latex tex="B" /> <span class="em-nowrap">相距</span> <Latex tex="10\,\text{cm}" />。求平衡位置 <Latex tex="O" /> 的位置。</div>
    <div class="em-proof">
      <div class="em-proof-step" v-click="1"><span class="em-proof-no">1</span><div>简谐运动的加速度总指向平衡位置。<Latex tex="A" /> 点加速度指向 <Latex tex="B" />，<Latex tex="B" /> 点加速度指向 <Latex tex="A" />，所以 <Latex tex="O" /> 在 <Latex tex="A" />、<Latex tex="B" /> 之间。</div></div>
      <div class="em-proof-step" v-click="2"><span class="em-proof-no">2</span><div><div>由 <Latex tex="a=-\omega^2x" /> 知，加速度大小与到 <Latex tex="O" /> 的距离<span class="em-nowrap">成正比</span>。</div><div>所以 <Latex tex="\frac{a_A}{a_B}=\frac{x_A}{x_B}=\frac{2}{3}" />。</div></div></div>
      <div class="em-proof-step" v-click="3"><span class="em-proof-no">3</span><div>又 <Latex tex="x_A+x_B=AB=10\,\text{cm}" />，解得 <Latex tex="x_A=4\,\text{cm}" />，<Latex tex="x_B=6\,\text{cm}" />。</div></div>
      <div class="em-proof-step" v-click="4"><span class="em-proof-no">4</span><div>所以 <Latex tex="O" /> 距 <Latex tex="A" /> <Latex tex="4\,\text{cm}" />、距 <Latex tex="B" /> <Latex tex="6\,\text{cm}" />。</div></div>
    </div>
  </div>
  <div class="em-ab-figure">
    <AbAccelerationSvg :show-o="$clicks >= 3" />
  </div>
</div>

---
layout: base-flex
title: 弹簧振子的能量计算
clicks: 4
---

<div class="page-grow em-example-page">
  <div class="em-exercise-stem">一弹簧振子，弹簧的劲度系数 <Latex tex="k=20\,\text{N/m}" />，振子的质量 <Latex tex="m=0.2\,\text{kg}" />，振幅 <Latex tex="A=0.1\,\text{m}" />。求：</div>
  <div class="em-example-asks">
    <div class="em-ask-item"><span class="em-ask-no">（1）</span><Latex tex="\omega" /> 与 <Latex tex="T" /></div>
    <div class="em-ask-item"><span class="em-ask-no">（2）</span><Latex tex="v_{\max}" /> 与 <Latex tex="a_{\max}" /></div>
    <div class="em-ask-item"><span class="em-ask-no">（3）</span><Latex tex="E" /></div>
    <div class="em-ask-item"><span class="em-ask-no">（4）</span><Latex tex="x=0.05\,\text{m}" /> 时的 <Latex tex="E_p" />、<Latex tex="E_k" />、<Latex tex="v" /></div>
  </div>
  <div class="em-example-list">
    <div class="em-example-item" v-click="1"><div class="em-example-label">（1）</div><div class="em-example-formulas"><Latex tex="\omega=\sqrt{\frac{k}{m}}=10\,\text{rad/s}" /><Latex tex="T=\frac{2\pi}{\omega}=0.2\pi\,\text{s}\approx0.63\,\text{s}" /></div></div>
    <div class="em-example-item" v-click="2"><div class="em-example-label">（2）</div><div class="em-example-formulas"><Latex tex="v_{\max}=\omega A=1.0\,\text{m/s}" /><Latex tex="a_{\max}=\omega^2A=10\,\text{m/s}^2" /></div></div>
    <div class="em-example-item" v-click="3"><div class="em-example-label">（3）</div><div class="em-example-formulas"><Latex tex="E=\frac{1}{2}kA^2=0.10\,\text{J}" /></div></div>
    <div class="em-example-item" v-click="4"><div class="em-example-label">（4）</div><div class="em-example-formulas"><Latex tex="E_p=\frac{1}{2}kx^2=0.025\,\text{J}" /><Latex tex="E_k=E-E_p=0.075\,\text{J}" /><Latex tex="v=\sqrt{\frac{2E_k}{m}}\approx0.87\,\text{m/s}" /></div></div>
  </div>
</div>

---
layout: base-flex
title: 这两个振动是简谐运动吗？
clicks: 4
---

<div class="page-grow em-qual-page">
  <div class="ask">怎样判断这两种振动是不是简谐运动？</div>
  <div class="em-qual-grid">
    <div class="em-qual-col">
      <div class="em-qual-head"><span class="em-qual-no">（1）</span>木筷竖直浮在水中</div>
      <div class="em-qual-figure"><BuoyantStickSvg :show-forces="$clicks >= 1" /></div>
      <div class="em-qual-analysis">
        <div v-click="1">设木筷的横截面积为 <Latex tex="S" />，水的密度为 <Latex tex="\rho" />。上提 <Latex tex="x" /> 后，浮力减小 <Latex tex="\rho gSx" />，合力向下、大小 <Latex tex="\rho gSx" />，与位移方向相反。</div>
        <div v-click="2">所以 <Latex tex="F=-\rho gSx" />，木筷做简谐运动。</div>
      </div>
    </div>
    <div class="em-qual-col">
      <div class="em-qual-head"><span class="em-qual-no">（2）</span>小球在光滑圆弧面上</div>
      <div class="em-qual-figure"><ArcBallSvg :show-forces="$clicks >= 3" /></div>
      <div class="em-qual-analysis">
        <div v-click="3">设圆弧半径为 <Latex tex="R" />，小球偏离最低点的弧长为 <span class="em-nowrap"><Latex tex="s" />。</span>切向回复力 <Latex tex="F=mg\sin\theta" />，指向最低点；小角度下 <Latex tex="\sin\theta\approx s/R" />，所以 <Latex tex="F\approx-\frac{mg}{R}s" />。</div>
        <div v-click="4">回复力与位移成正比、方向相反，小球做简谐运动。</div>
      </div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 方向与大小，怎样判断？
clicks: 5
---

<div class="page-grow em-dir-page">
  <div class="ask">小球在 <Latex tex="O" /> 与 <Latex tex="P" />（或 <Latex tex="Q" />）之间运动时，<Latex tex="x" />、<Latex tex="v" />、<Latex tex="a" />、<Latex tex="F" /> 的方向和大小怎样变化？</div>
  <div class="em-dir-wrap"><ShmDirectionTable /></div>
  <div class="em-dir-hint" v-click="5">
    <div class="tip-hint">加速度和回复力总指向平衡位置；速度与加速度同向时加速，反向时减速。</div>
  </div>
</div>

---
layout: base-flex
title: 振幅变为 2 倍，能量变几倍？
clicks: 4
---

<div class="page-grow em-amp-page">
  <div class="ask">振幅变为 2 倍，最大速度、最大加速度、总机械能各变为几倍？</div>
  <div class="em-amp-list">
    <div class="em-amp-row">
      <span class="em-amp-label">最大速度</span>
      <span class="em-amp-formula"><Latex tex="v_{\max}=\omega A" /></span>
      <span class="em-amp-arrow" v-click="1">→</span>
      <span class="em-amp-value" v-click="1">2 倍</span>
    </div>
    <div class="em-amp-row">
      <span class="em-amp-label">最大加速度</span>
      <span class="em-amp-formula"><Latex tex="a_{\max}=\omega^2 A" /></span>
      <span class="em-amp-arrow" v-click="2">→</span>
      <span class="em-amp-value" v-click="2">2 倍</span>
    </div>
    <div class="em-amp-row">
      <span class="em-amp-label">总机械能</span>
      <span class="em-amp-formula"><Latex tex="E=\frac{1}{2}kA^2" /></span>
      <span class="em-amp-arrow" v-click="3">→</span>
      <span class="em-amp-value" v-click="3">4 倍</span>
    </div>
  </div>
  <div class="em-amp-hint" v-click="4">
    <div class="tip-hint">振幅越大，机械能越大；总机械能与振幅的平方成正比。</div>
  </div>
</div>

---
layout: base-flex
title: 四条线索，串起简谐运动
---

<div class="page-grow em-structure-page">
  <div class="em-structure-banner">简谐运动</div>
  <div class="em-structure-grid">
    <div class="em-structure-card">
      <div class="em-structure-head">回复力</div>
      <div class="em-structure-formula"><Latex tex="F=-kx" /></div>
      <div class="em-structure-note">总指向平衡位置；合力与位移成正比且反向，就是简谐运动。</div>
    </div>
    <div class="em-structure-card">
      <div class="em-structure-head">加速度</div>
      <div class="em-structure-formula"><Latex tex="a=-\omega^2 x" /></div>
      <div class="em-structure-note">由牛顿第二定律得到，方向与位移始终相反。</div>
    </div>
    <div class="em-structure-card">
      <div class="em-structure-head">运动</div>
      <div class="em-structure-formula"><Latex tex="x=A\sin(\omega t+\varphi)" /></div>
      <div class="em-structure-note">位移随时间按正弦规律变化，<Latex tex="T=\frac{2\pi}{\omega}" />。</div>
    </div>
    <div class="em-structure-card">
      <div class="em-structure-head">能量</div>
      <div class="em-structure-formula"><Latex tex="E=\frac{1}{2}kA^2" /></div>
      <div class="em-structure-note">只有弹力做功，<Latex tex="E_k+E_p" /> 守恒；振幅越大，机械能越大。</div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 课堂小结
clicks: 5
---

# 课堂小结

<div class="page-grow">
  <div class="step-list em-summary">
    <div class="step-item" v-click="1">
      <span class="step-no">1</span>
      <div class="em-summary-text">回复力 <Latex tex="F=-kx" />，总指向平衡位置。</div>
    </div>
    <div class="step-item" v-click="2">
      <span class="step-no">2</span>
      <div class="em-summary-text">由牛顿第二定律得 <Latex tex="a=-\omega^2x" />，加速度与位移始终反向。</div>
    </div>
    <div class="step-item" v-click="3">
      <span class="step-no">3</span>
      <div class="em-summary-text">平衡位置 <Latex tex="O" />：<Latex tex="a=0" />、<Latex tex="F=0" />，速度最大；端点：速度为零，加速度、回复力最大。</div>
    </div>
    <div class="step-item" v-click="4">
      <span class="step-no">4</span>
      <div class="em-summary-text">只有弹力做功，机械能守恒；<Latex tex="E=\frac{1}{2}kA^2" />，振幅越大，机械能越大。</div>
    </div>
    <div class="step-item" v-click="5">
      <span class="step-no">5</span>
      <div class="em-summary-text">判断简谐运动：找出回复力，看它是否与位移成正比、方向相反。</div>
    </div>
  </div>
</div>
