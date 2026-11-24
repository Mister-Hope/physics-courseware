---
theme: default
title: "核裂变与核聚变"
subtitle: "从铀核分裂到太阳聚变"
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
chapter-no: "5.4"
chapter: "第五章 原子核"
---

<CoverDecorationSvg />

---
title: "核能从哪里来"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask-lead">核电站和太阳，为什么都能源源不断地放出能量？</div>
<div class="step-list">
<div class="step-item mb-5" v-click="1">
<span class="step-no">1</span>
<div><span class="font-semibold text-accent">核裂变</span>：重核分裂成中等质量的核，放出能量。核电站利用的就是这种能量。</div>
</div>
<div class="step-item mb-5" v-click="2">
<span class="step-no">2</span>
<div><span class="font-semibold text-accent-2">核聚变</span>：轻核结合成较重的核，放出能量。太阳内部就在发生核聚变。</div>
</div>
</div>
<div class="tip-hint mt-5" v-click="3">核能来自原子核结构变化时释放的能量。</div>
</div>

---
title: "核裂变的发现"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">1938 年，哈恩和斯特拉斯曼用中子轰击铀核，为什么在产物中发现了钡？</div>
<div v-click="1" class="text-lg leading-normal">他们在产物中发现了原子序数为 <span class="font-semibold text-accent">56</span> 的钡。</div>
<div v-click="2" class="text-lg leading-normal">迈特纳和弗里施由此解释：铀核分裂成两块质量相近的碎块。弗里施借用细胞分裂的说法，把这种现象命名为<span class="font-semibold text-accent">核裂变</span>（nuclear fission）。</div>
<DefinitionBox v-click="3" term="核裂变" tone="gold">
<div>重核分裂成<span class="def-term">中等质量的核</span>，并释放能量的过程。</div>
</DefinitionBox>
</div>

---
title: "裂变方程"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">铀核裂变后，变成了哪些新核？</div>
<div v-click="1" class="text-center text-3xl py-2"><Latex tex="{}^{235}_{92}\text{U}+{}^{1}_{0}\text{n}\rightarrow{}^{144}_{56}\text{Ba}+{}^{89}_{36}\text{Kr}+3{}^{1}_{0}\text{n}" /></div>
<div v-click="2" class="info-hint">
<div>质量数：<Latex tex="235+1=144+89+3\times1=236" /></div>
<div>电荷数：<Latex tex="92=56+36" /></div>
</div>
<div v-click="3" class="text-xl leading-normal">铀核先吸收中子，形成不稳定的铀 236，再分裂成两块碎片。裂变产物并不唯一，铀 235 裂变时一般还会放出两或三个中子。</div>
</div>

---
title: "裂变释放的能量"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">一个铀核裂变，究竟能放出多少能量？</div>
<div v-click="1" class="text-lg leading-normal">裂变前后，原子核的总质量变小了，减少的质量叫<span class="font-semibold text-accent">质量亏损</span> <Latex tex="\Delta m" />。由 <Latex tex="\Delta E=\Delta mc^{2}" /> 可知，这部分质量转化为释放的能量。</div>
<div v-click="2" class="tip-hint">一个铀 235 核裂变放出的能量约为 <Latex tex="200\ \text{MeV}" />。</div>
<div v-click="3" class="info-hint">
<div><Latex tex="1\ \text{kg}" /> 铀 235 约含 <Latex tex="2.56\times10^{24}" /> 个核。</div>
<div>全部裂变放出的能量约 <Latex tex="2.56\times10^{24}\times200\ \text{MeV}\approx8.2\times10^{13}\ \text{J}" />。</div>
<div class="mini-note">换算关系：<Latex tex="1\ \text{MeV}=1.6\times10^{-13}\ \text{J}" /></div>
<div>这相当于 <Latex tex="2800\ \text{t}" /> 标准煤完全燃烧放出的能量。</div>
</div>
</div>

---
title: "链式反应"
clicks: 4
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">一个中子击中铀核后，为什么可能引发更多铀核裂变？</div>
<div class="figure" style="max-width: 680px; margin: 0 auto;"><ChainReactionSvg :step="$clicks" /></div>
<DefinitionBox v-click="4" term="链式反应" tone="gold">
<div>由重核裂变产生的<span class="def-term">中子</span>使核裂变反应一代接一代继续下去的过程。</div>
</DefinitionBox>
<div v-click="4" class="mini-note text-center">图中按每次裂变放出 2 个中子示意。</div>
</div>

---
title: "临界体积与临界质量"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">为什么铀块太小，链式反应就难以持续？</div>
<div class="figure" style="max-width: 700px; margin: 0 auto;"><CriticalSizeSvg :step="$clicks" /></div>
<div class="def-row" v-click="3">
<DefinitionBox term="临界体积" tone="gold">
<div>核裂变物质能够发生<span class="def-term">链式反应</span>的最小体积。</div>
</DefinitionBox>
<DefinitionBox term="临界质量" tone="blue">
<div>与临界体积对应的质量。</div>
</DefinitionBox>
</div>
</div>

---
title: "反应堆与核电站"
clicks: 4
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">反应堆怎样让裂变持续，又不会失控？</div>
<div class="figure" style="max-width: 740px; margin: 0 auto;"><ReactorSvg :step="$clicks" /></div>
<div v-click="3" class="mini-note text-center">控制棒插入越深，吸收的中子越多，裂变反应越慢。</div>
</div>

---
title: "核电站的能量转化"
clicks: 5
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">核电站里，核能是怎样变成电能的？</div>
<div class="step-list">
<div class="step-item" v-click="1">
<span class="step-no">1</span>
<div><span class="font-semibold">核能 → 内能</span>：裂变放出的能量使堆芯温度升高。</div>
</div>
<div class="step-item" v-click="2">
<span class="step-no">2</span>
<div><span class="font-semibold">内能 → 机械能</span>：高温高压水蒸气推动汽轮机转动。</div>
</div>
<div class="step-item" v-click="3">
<span class="step-no">3</span>
<div><span class="font-semibold">机械能 → 电能</span>：汽轮机带动发电机发电。</div>
</div>
<div class="step-item" v-click="4">
<span class="step-no">4</span>
<div><span class="font-semibold">整条转化链</span>：核能 → 内能 → 机械能 → 电能。</div>
</div>
</div>
<div v-click="5" class="info-hint">百万千瓦级核电站每年约消耗 <Latex tex="30\ \text{t}" /> 浓缩铀；同样功率的火电站每年要烧 <Latex tex="2.5\times10^{6}\ \text{t}" /> 煤。</div>
</div>

---
title: "核聚变"
clicks: 3
---

# 核聚变

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">如果让两个轻核靠近，会发生什么？</div>
<DefinitionBox v-click="1" term="核聚变" tone="blue">
<div>两个轻核结合成<span class="def-term">质量较大的核</span>，并释放能量。</div>
</DefinitionBox>
<div v-click="2" class="text-center text-2xl py-2"><Latex tex="{}^{2}_{1}\text{H}+{}^{3}_{1}\text{H}\rightarrow{}^{4}_{2}\text{He}+{}^{1}_{0}\text{n}+17.6\ \text{MeV}" /></div>
<div v-click="3" class="tip-hint">平均每个核子放出的能量在 <Latex tex="3\ \text{MeV}" /> 以上，约为裂变的 <Latex tex="3\sim4" /> 倍。</div>
</div>

---
title: "聚变需要极高温度"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">为什么核聚变需要几百万摄氏度的高温？</div>
<div class="split-wide" style="align-items: start">
<div class="figure"><FusionBarrierSvg :step="$clicks" /></div>
<div class="stack">
<div v-click="1" class="text-lg leading-normal">两个核都带正电，靠近时受到很强的<span class="font-semibold text-danger">库仑斥力</span>。</div>
<div v-click="2" class="text-lg leading-normal">只有距离小到 <Latex tex="10^{-15}\ \text{m}" /> 以内，核力才能起作用。</div>
<div v-click="3" class="text-lg leading-normal">加热到几百万开尔文，部分核才有足够动能克服斥力。</div>
<div v-click="3" class="tip-hint">核聚变需要在极高温度下进行，因此又叫热核反应。</div>
</div>
</div>
</div>

---
title: "太阳中的核聚变"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">太阳为什么能持续发光发热？</div>
<div v-click="1" class="text-lg leading-normal">太阳中心温度约 <Latex tex="1.6\times10^{7}\ \text{K}" />，氢核聚变成氦核，释放出巨大的能量。</div>
<div v-click="2">
<table class="data-table">
<tbody>
<tr><td>每秒辐射的能量</td><td><Latex tex="3.8\times10^{26}\ \text{J}" /></td></tr>
<tr><td>相当于完全燃烧的标准煤</td><td><Latex tex="1.3\times10^{16}\ \text{t}" /></td></tr>
<tr><td>每秒参与反应的原子核</td><td>约 <Latex tex="7\times10^{8}\ \text{t}" /></td></tr>
</tbody>
</table>
</div>
<div v-click="3" class="tip-hint">地球只接收到太阳辐射能量的不到 20 亿分之一，但地球上的能量绝大部分来自太阳的核聚变。</div>
</div>

---
title: "可控核聚变"
clicks: 4
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">人类能像太阳那样，可控地释放聚变能吗？</div>
<div class="half-grid" style="align-items: start">
<div v-click="1">
<div class="mini-title">磁约束</div>
<div class="text-lg leading-normal">带电粒子在磁场中受洛伦兹力，不会飞散。托卡马克（tokamak）目前性能最好，中国的 EAST「人造太阳」多次创世界纪录。</div>
</div>
<div class="divider-l" v-click="2">
<div class="mini-title">惯性约束</div>
<div class="text-lg leading-normal">用激光或 X 射线从各个方向照射燃料靶丸，反应时间极短，靠惯性约束。中国的「神光Ⅲ」装置。</div>
</div>
</div>
<div v-click="3" class="warn-hint">困难：聚变需要极高的温度，地球上没有任何容器能承受。</div>
<div v-click="4" class="info-hint">优点：产能效率高；氘储量丰富，氚可由锂制取；安全清洁。实现受控核聚变还有很长的路要走。</div>
</div>

---
title: "裂变与聚变的比较"
clicks: 2
---

<div class="page-grow" style="justify-content: flex-start">
<div class="ask">核裂变与核聚变，有哪些相同点和不同点？</div>
<div v-click="1">
<table class="data-table">
<thead>
<tr><th>比较项</th><th>核裂变</th><th>核聚变</th></tr>
</thead>
<tbody>
<tr><td>反应</td><td>重核分裂成中等质量的核</td><td>轻核结合成较重的核</td></tr>
<tr><td>条件</td><td>中子轰击；达到临界体积</td><td>极高温度（热核反应）</td></tr>
<tr><td>放能</td><td>一个铀 235 核约 <Latex tex="200\ \text{MeV}" /></td><td>每个核子 <Latex tex="3\ \text{MeV}" /> 以上，约为裂变的 <Latex tex="3\sim4" /> 倍</td></tr>
<tr><td>燃料</td><td>铀 235（天然铀中仅约 0.7%）</td><td>氘、氚（氘储量丰富）</td></tr>
<tr><td>现状</td><td>已建成核电站</td><td>受控聚变仍在研究</td></tr>
</tbody>
</table>
</div>
<div v-click="2" class="tip-hint">相同点：都发生质量亏损，都释放巨大能量。不同点：裂变需要中子引发，聚变需要极高温度。</div>
</div>

---
title: "练习：核电站的燃料消耗"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="text-lg leading-normal">秦山核电站一期装机容量为 <Latex tex="3\times10^{8}\ \text{W}" />。已知 <Latex tex="1\ \text{g}" /> 铀 235 完全裂变可产生 <Latex tex="8.2\times10^{10}\ \text{J}" /> 的能量，假定这些能量全部转化为电能，求该核电站每年消耗多少铀 235。</div>
<div v-click="1" class="text-xl mb-4"><Latex tex="E=Pt=3\times10^{8}\times365\times24\times3600\ \text{J}\approx9.5\times10^{15}\ \text{J}" /></div>
<div v-click="2" class="text-xl mb-4"><Latex tex="m=\frac{E}{8.2\times10^{10}\ \text{J/g}}\approx1.15\times10^{5}\ \text{g}" /></div>
<div v-click="3" class="tip-hint">约 <Latex tex="1.2\times10^{2}\ \text{kg}" />，即约 <Latex tex="115\ \text{kg}" /> 铀 235。</div>
</div>

---
title: "练习：太阳每秒失去的质量"
clicks: 3
---

<div class="page-grow" style="justify-content: flex-start">
<div class="text-lg leading-normal">太阳辐射的总功率约为 <Latex tex="3.8\times10^{26}\ \text{W}" />。太阳内部不断发生氢核聚变为氦核的反应，求太阳每秒失去的质量。</div>
<div v-click="1" class="text-xl mb-4"><Latex tex="E=Pt=3.8\times10^{26}\times1\ \text{J}=3.8\times10^{26}\ \text{J}" /></div>
<div v-click="2" class="text-xl mb-4"><Latex tex="\Delta m=\frac{E}{c^{2}}=\frac{3.8\times10^{26}}{(3.0\times10^{8})^{2}}\ \text{kg}\approx4.2\times10^{9}\ \text{kg}" /></div>
<div v-click="3" class="tip-hint">约 <Latex tex="4.2\times10^{9}\ \text{kg}" />，即约 420 万吨。</div>
</div>

---
title: "课堂小结"
clicks: 5
---

# 课堂小结

<v-clicks>

<div class="summary-line mb-5"><span class="text-accent">核裂变</span>：重核分裂成中等质量的核，放出能量；一个铀 235 核约放出 <Latex tex="200\ \text{MeV}" />。</div>

<div class="summary-line mb-5"><span class="text-accent">链式反应</span>：裂变产生的中子使裂变一代代继续；达到临界体积才能持续。</div>

<div class="summary-line mb-5"><span class="text-accent">反应堆</span>：用慢化剂减速中子，用控制棒调节反应速度，冷却剂带出热量。</div>

<div class="summary-line mb-5"><span class="text-accent">核聚变</span>：轻核结合成较重的核；需要极高温度，属于热核反应。</div>

<div class="summary-line mb-5"><span class="text-accent">质量亏损</span>：<Latex tex="\Delta E=\Delta mc^{2}" />；核能来自原子核结构变化时释放的能量。</div>

</v-clicks>
