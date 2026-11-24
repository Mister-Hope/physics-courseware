---
theme: default
title: "核力与结合能"
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
chapter-no: "5.3"
chapter: "第五章 原子核"
subtitle: 核力 · 结合能 · 质量亏损
---

<CoverDecorationSvg />

---
layout: focus-question
title: 原子核里的质子，为什么没有互相推开？
clicks: 2
clickAnimation: none
---

<template v-slot:icon>

<mdi-atom />

</template>

原子核的直径不到 <Latex tex="10^{-14}\ \text{m}" />，里面却挤着带正电的质子。它们之间的电磁斥力，为什么没能把原子核撕开？

<template v-slot:hint>

如果核里只有电磁斥力，质子早就互相推开了。

</template>

<template v-slot:answer>

核子之间还存在一种更强的<strong>吸引力</strong>——<strong>核力</strong>，它属于<strong>强相互作用</strong>。

</template>

---
layout: base-flex
title: 把质子留在核里的是哪种力？
clicks: 3
clickAnimation: none
---

# 把质子留在核里的是哪种力？

<div class="page-grow page-grow-tight">
<div class="ask">原子核里的质子都带正电，是什么力把它们聚在一起？</div>
<table class="data-table" v-click="1">
<thead>
<tr><th>基本相互作用</th><th>作用范围</th><th>在原子核里</th></tr>
</thead>
<tbody>
<tr><td>引力</td><td>无限远</td><td>质子之间的万有引力，比电磁斥力小得多</td></tr>
<tr><td>电磁相互作用</td><td>无限远</td><td>质子之间的斥力，把核子推开</td></tr>
<tr class="hl"><td>强相互作用</td><td>约 <Latex tex="10^{-15}\ \text{m}" /></td><td><strong>核力</strong>：把核子拉在一起</td></tr>
<tr><td>弱相互作用</td><td>约 <Latex tex="10^{-18}\ \text{m}" /></td><td>引起原子核的 <Latex tex="\beta" /> 衰变</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="2">核子之间的这种很强的作用就是<strong>核力</strong>，它属于<strong>强相互作用</strong>——比电磁力强得多。</div>
<div class="nb-point" v-click="3">万有引力、电磁力和强相互作用分别在不同的尺度上发挥作用：天体靠引力，原子和分子靠电磁力，原子核靠核力。</div>
</div>

---
layout: base-flex
title: 核力为什么能拉住核子？
clicks: 3
clickAnimation: none
---

# 核力为什么能拉住核子？

<div class="page-grow">
<div class="split-wide">
<div class="figure">
<TwoNucleonForcesSvg />
</div>
<div class="stack">
<div class="tip-hint" v-click="1">核力比电磁力强得多：在约 <Latex tex="10^{-15}\ \text{m}" /> 的范围内，足以克服质子间的斥力。</div>
<div class="warn-hint" v-click="2">核力是<strong>短程力</strong>：距离增大时急剧减小，超过原子核大小的范围就不存在了。</div>
</div>
</div>
<div class="info-hint" v-click="3">所以，核子只与它附近的核子有核力作用——原子核再大，一个核子也只和周围几个核子结合。</div>
</div>

---
layout: base-flex
title: 把原子核完全拆开，需要能量吗？
clicks: 4
clickAnimation: none
---

# 把原子核完全拆开，需要能量吗？

<div class="page-grow">
<div class="ask">4 个核子结合成氦核放出的能量，与把氦核拆开所需的能量有什么关系？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><span>把原子核完全分开成单个核子，要克服核力做功，必须<strong>吸收能量</strong>。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span>反过来，分散的核子结合成原子核，会<strong>放出能量</strong>；吸收与放出的能量大小相等。</span></div>
</div>
<DefinitionBox term="结合能" v-click="3">

原子核是核子凭借<strong>核力</strong>结合成的。把原子核完全分开成单个核子所需要的能量，叫做原子核的<strong>结合能</strong>；它也是核子结合成原子核时放出的能量。

</DefinitionBox>
<div class="tip-hint" v-click="4">核子数越多，结合能越大——但核子越多，原子核并不一定越稳定。</div>
</div>

---
layout: base-flex
title: 结合能越大，原子核就越稳定吗？
clicks: 3
clickAnimation: none
---

# 结合能越大，原子核就越稳定吗？

<div class="page-grow page-grow-tight">
<div class="ask">铁核的结合能约是氦核的 17 倍。能说铁核比氦核稳定 17 倍吗？</div>
<table class="data-table" v-click="1">
<thead>
<tr><th>原子核</th><th>核子数</th><th>结合能</th><th>比结合能</th></tr>
</thead>
<tbody>
<tr><td><Latex tex="{}^{4}\text{He}" /></td><td>4</td><td>约 <Latex tex="28\ \text{MeV}" /></td><td>约 <Latex tex="7.07\ \text{MeV}" /></td></tr>
<tr><td><Latex tex="{}^{56}\text{Fe}" /></td><td>56</td><td>约 <Latex tex="492\ \text{MeV}" /></td><td>约 <Latex tex="8.79\ \text{MeV}" /></td></tr>
</tbody>
</table>
<DefinitionBox term="比结合能" tone="blue" v-click="2">

原子核的结合能与核子数之比，叫做<strong>比结合能</strong>（也叫平均结合能）：<Latex tex="\frac{\text{结合能}}{\text{核子数}}" />。

</DefinitionBox>
<div class="tip-hint" v-click="3">比结合能越大，核子结合得越牢固，原子核越稳定。</div>
</div>

---
layout: base-flex
title: 结合能从哪里来？
clicks: 3
clickAnimation: none
---

# 结合能从哪里来？

<div class="page-grow">
<div class="ask">核子结合成原子核放出了能量。这些能量从哪里来？</div>
<div v-click="1">
<div class="nb-formula"><Latex tex="E=mc^{2}" display /></div>
<div class="nb-point">物体的能量与质量成正比：能量变了，质量也跟着变。</div>
</div>
<div v-click="2">
<DefinitionBox term="质量亏损">

原子核的质量，比组成它的核子质量之和<strong>小</strong>。两者的差值叫做原子核的<strong>质量亏损</strong>。

</DefinitionBox>
</div>
<div v-click="3">
<div class="nb-formula"><Latex tex="\Delta E=\Delta mc^{2}" display /></div>
<div class="nb-point">测出质量亏损 <Latex tex="\Delta m" />，就能算出结合能。</div>
</div>
</div>

---
layout: base-flex
title: 算一算：氘核的结合能有多大？
clicks: 6
clickAnimation: none
---

# 算一算：氘核的结合能有多大？

<div class="page-grow page-grow-tight">
<div class="ask">一个质子与一个中子结合成氘核，放出多少能量？</div>
<div class="mini-note">已知 <Latex tex="m_\text{p}=1.6726\times10^{-27}\ \text{kg}" />，<Latex tex="m_\text{n}=1.6749\times10^{-27}\ \text{kg}" />，氘核 <Latex tex="m_\text{D}=3.3436\times10^{-27}\ \text{kg}" />。</div>
<DeuteronBindingCalc :step="$clicks" />
<div class="tip-hint" v-click="6">氘核的比结合能只有约 <Latex tex="1.10\ \text{MeV}" />，比铁核小得多——结合得并不牢固。</div>
</div>

---
layout: base-flex
title: 哪种原子核最稳定？
clicks: 2
clickAnimation: none
---

# 哪种原子核最稳定？

<div class="page-grow page-grow-tight">
<div class="ask">把每种原子核的比结合能画在同一张图上，会看到什么规律？</div>
<BindingEnergyCurve :step="$clicks" />
<div class="tip-hint" v-click="2">中等质量的核（<Latex tex="A" /> 在 56 附近）比结合能最大，约 <Latex tex="8.8\ \text{MeV}" />；比结合能越大，核子结合得越牢固，原子核越稳定——所以中等质量的核最稳定。</div>
</div>

---
layout: base-flex
title: 为什么裂变和聚变都能放出能量？
clicks: 3
clickAnimation: none
---

# 为什么裂变和聚变都能放出能量？

<div class="page-grow page-grow-tight">
<div class="ask">既然中等质量的核最稳定，重核裂开、轻核聚合时，比结合能怎样变化？</div>
<BindingEnergyCurve :step="$clicks" mode="trend" />
<div class="half-grid">
<div class="tip-hint" v-click="2"><strong>重核裂变</strong>：铀核分成两个中等质量的核，比结合能升高，放出能量。</div>
<div class="info-hint" v-click="3"><strong>轻核聚变</strong>：轻核结合成较重的核，比结合能同样升高，也放出能量。</div>
</div>
</div>

---
layout: exercise-split
title: 例题：铀核衰变时释放多少能量？
clicks: 3
clickAnimation: none
analysisLabel: 解答
---

<template v-slot:stem>

一个铀核衰变为钍核时释放一个 <Latex tex="\alpha" /> 粒子。已知铀核的质量为 <Latex tex="3.853\,13\times10^{-25}\ \text{kg}" />，钍核的质量为 <Latex tex="3.786\,57\times10^{-25}\ \text{kg}" />，<Latex tex="\alpha" /> 粒子的质量为 <Latex tex="6.646\,72\times10^{-27}\ \text{kg}" />。这个衰变过程中释放的能量是多少焦耳？

</template>

<div class="step-item" v-click="1"><span class="step-no">1</span><span>衰变前后质量守恒：铀核的质量 = 钍核质量 + <Latex tex="\alpha" /> 粒子质量 + 亏损的质量 <Latex tex="\Delta m" />。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span><Latex tex="\Delta m=m_\text{U}-m_\text{Th}-m_{\alpha}=\left(3.853\,13-3.786\,57-0.066\,467\,2\right)\times10^{-25}\ \text{kg}=9.28\times10^{-30}\ \text{kg}" />。</span></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><span><Latex tex="\Delta E=\Delta mc^{2}=9.28\times10^{-30}\times\left(3.00\times10^{8}\right)^{2}\ \text{J}\approx8.3\times10^{-13}\ \text{J}" />，约合 <Latex tex="5.2\ \text{MeV}" />。</span></div>

---
layout: base-flex
title: 一个原子质量单位对应多少能量？
clicks: 3
clickAnimation: none
---

# 一个原子质量单位对应多少能量？

<div class="page-grow">
<div class="ask">核物理中的原子质量单位 <Latex tex="\text{u}" />（<Latex tex="1\ \text{u}=1.660\,5\times10^{-27}\ \text{kg}" />）。<Latex tex="1\ \text{u}" /> 的质量对应多少能量？</div>
<div class="step-item" v-click="1"><span class="step-no">1</span><span>由 <Latex tex="E=mc^{2}" />：<Latex tex="E=1.660\,5\times10^{-27}\times\left(2.997\,9\times10^{8}\right)^{2}\ \text{J}=1.492\times10^{-10}\ \text{J}" />。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span>换算成电子伏：<Latex tex="\frac{1.492\times10^{-10}}{1.602\,2\times10^{-19}}\ \text{eV}=9.31\times10^{8}\ \text{eV}=931.5\ \text{MeV}" />。</span></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><span>所以 <Latex tex="1\ \text{u}" /> 的质量相当于 <Latex tex="931.5\ \text{MeV}" /> 的能量——核物理里用 <Latex tex="\text{u}" /> 和 <Latex tex="\text{MeV}" /> 作单位很方便。</span></div>
</div>

---
layout: base-flex
title: 核反应和化学反应，改变的东西一样吗？
clicks: 3
clickAnimation: none
---

# 核反应和化学反应，改变的东西一样吗？

<div class="page-grow">
<div class="ask">燃烧、化合这类化学反应，与原子核的衰变、裂变，改变的东西一样吗？</div>
<div class="half-grid">
<div class="stack" v-click="1">
<div class="mini-title">化学反应</div>
<div class="nb-point">涉及<strong>电磁相互作用</strong>。</div>
<div class="nb-point">原子核<strong>不变</strong>，只是原子重新组合：电子转移或共享，分子种类改变。</div>
</div>
<div class="stack" v-click="2">
<div class="mini-title">核反应</div>
<div class="nb-point">涉及<strong>强相互作用</strong>或<strong>弱相互作用</strong>。</div>
<div class="nb-point">原子核<strong>本身改变</strong>，变成另一种原子核，元素种类改变。</div>
</div>
</div>
<div class="tip-hint" v-click="3">化学反应只重排原子，核反应改变核本身——这是两者最根本的区别。</div>
</div>

---
layout: base-flex
title: 为什么觉察不到物体的质量变化？
clicks: 3
clickAnimation: none
---

# 为什么觉察不到物体的质量变化？

<div class="page-grow">
<div class="ask">结合时放出能量、质量随之减少，为什么日常生活中觉察不到这种变化？</div>
<div class="nb-point" v-click="1">质量亏损对应的能量通常很小，而 <Latex tex="\Delta m=\frac{\Delta E}{c^{2}}" /> 中 <Latex tex="c^{2}=9\times10^{16}\ \text{m}^{2}/\text{s}^{2}" /> 极大，所以 <Latex tex="\Delta m" /> 极小。</div>
<div class="nb-point" v-click="2">例如放出 <Latex tex="1\ \text{eV}" /> 的能量，对应的质量只有约 <Latex tex="1.8\times10^{-36}\ \text{kg}" />；日常物体的质量以千克计，这样的变化测不出来。</div>
<div class="tip-hint" v-click="3">质量亏损不是质量消失了，而是<strong>质量与能量相联系</strong>：能量以其他形式放出，系统的质量相应减少。</div>
</div>

---
layout: base-flex
title: 这一节：核能从哪里来？
clicks: 3
clickAnimation: none
---

# 这一节：核能从哪里来？

<div class="page-grow">
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><span>核子之间有<strong>核力</strong>：属于强相互作用，短程（约 <Latex tex="10^{-15}\ \text{m}" />），能克服质子间的电磁斥力。</span></div>
<div class="step-item" v-click="1"><span class="step-no">2</span><span>把原子核分开需要能量，这就是<strong>结合能</strong>；核子结合成核时放出同样多的能量。</span></div>
<div class="step-item" v-click="2"><span class="step-no">3</span><span>结合能与核子数之比叫<strong>比结合能</strong>：越大越稳定，中等质量的核最大。</span></div>
<div class="step-item" v-click="2"><span class="step-no">4</span><span>原子核的质量小于核子质量之和，差值叫<strong>质量亏损</strong>。</span></div>
<div class="step-item" v-click="3"><span class="step-no">5</span><span>质量亏损对应放出的能量：<Latex tex="\Delta E=\Delta mc^{2}" />——这就是核能的来源。</span></div>
</div>
<div class="tip-hint" v-click="3">判断放出还是吸收能量，就看比结合能是否变大：变大就放出能量。</div>
</div>

---
layout: base-flex
title: 课堂检测：核力、结合能与质量亏损
clicks: 3
clickAnimation: none
---

<div class="page-grow page-grow-tight">
<div class="ask">判断下列说法是否正确，并说明理由。</div>
<div class="step-item"><span class="step-no">1</span><span>核力是短程力，只在约 <Latex tex="10^{-15}\ \text{m}" /> 的范围内起作用。</span></div>
<div class="tip-hint" v-click="1">正确。核力属于强相互作用，距离增大时急剧减小。</div>
<div class="step-item"><span class="step-no">2</span><span>结合能越大，原子核一定越稳定。</span></div>
<div class="warn-hint" v-click="2">错误。结合能大可能只是核子多，比较稳定性应看<strong>比结合能</strong>。</div>
<div class="step-item"><span class="step-no">3</span><span>质量亏损说明质量消灭了。</span></div>
<div class="danger-hint" v-click="3">错误。亏损的质量以能量形式放出，系统的质量相应减少，并不是质量消失。</div>
</div>
