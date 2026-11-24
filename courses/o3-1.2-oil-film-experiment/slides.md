---
theme: default
title: "实验：用油膜法估测油酸分子的大小"
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
chapter-no: "1.2"
chapter: "第一章 分子动理论"
subtitle: "用宏观的体积和面积，估测微观的分子大小"
---

<CoverDecorationSvg />

---
layout: base-flex
title: "分子很小，怎样测出它的大小？"
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="intro-grid">
<div class="intro-figure"><MoleculeScaleSvg /></div>
<div class="intro-ask">
<div class="ask ask-lead">分子很小，怎样测出它的大小？</div>
<div class="ask-sub">一滴水的直径约 <Latex tex="10^{-3}\ \text{mm}" />，而分子比它小得多。用尺子量不到，还能怎样测量？</div>
<div class="tip-hint" v-click="1">油膜法：把一滴纯油酸在水面上铺成单分子层，用宏观的 <Latex tex="V" /> 和 <Latex tex="S" /> 算出微观的 <Latex tex="d" />。</div>
</div>
</div>
</div>

---
clickAnimation: none
---

# 把分子的大小变成可测的量

<div class="page-grow">
<div class="exp-split">
<div class="exp-figure"><OilFilmModelSvg /></div>
<div class="exp-text">
<div class="body-def">把一滴油酸滴在水面上，它会向外散开，形成一层很薄的油膜。油酸分子一个挨一个排列，膜的厚度就等于分子的直径。</div>
<div class="formula"><Latex tex="d = \dfrac{V}{S}" display /></div>
<div class="exp-facts">
<div class="exp-fact"><Latex tex="V" /> 是油膜的体积，也就是一滴纯油酸的体积</div>
<div class="exp-fact"><Latex tex="S" /> 是油膜的面积</div>
</div>
</div>
</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 单分子油膜

<div class="page-grow">
<div class="exp-split">
<div class="exp-figure"><OleicMoleculeSvg /></div>
<div class="exp-text">
<div class="body-def">油酸分子 <Latex tex="\text{C}_{17}\text{H}_{33}\text{COOH}" /> 一头是亲水的羧基 <Latex tex="-\text{COOH}" />，另一头是疏水的烃基 <Latex tex="\text{C}_{17}\text{H}_{33}-" />。</div>
<div class="body-def">滴到水面上后，亲水头插入水中，疏水尾朝上，分子直立起来，只排成一层。</div>
<div class="exp-facts">
<div class="exp-fact">这层膜的厚度就是油酸分子的长度</div>
<div class="exp-fact">油膜由单层分子组成，所以叫单分子油膜</div>
</div>
<div class="tip-hint" v-click="1">把分子看成小球并紧密排列，单分子层的厚度 <Latex tex="d" /> 就是分子直径。</div>
</div>
</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 油酸酒精溶液

<div class="page-grow">
<div class="ask">为什么要把油酸稀释？</div>
<div class="step-list">
<div class="step-item">
<div class="step-no">1</div>
<div class="step-text">纯油酸较黏，直接滴在水面上不易充分展开，油膜可能不是单分子层。</div>
</div>
<div class="step-item" v-click="1">
<div class="step-no">2</div>
<div class="step-text">用酒精稀释油酸。酒精易溶于水，又会很快挥发，留下的只有油酸。</div>
</div>
<div class="step-item" v-click="2">
<div class="step-no">3</div>
<div class="step-text">配成浓度约 <Latex tex="\dfrac{1}{500}" /> 的油酸酒精溶液，一滴溶液中只含很少的纯油酸。</div>
</div>
</div>
<div class="info-hint">本课采用：<Latex tex="1.0\ \text{mL}" /> 油酸加酒精至 <Latex tex="500\ \text{mL}" />。</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 测量一滴纯油酸的体积

<div class="page-grow">
<div class="exp-split">
<div class="exp-figure"><SyringeSvg /></div>
<div class="exp-text">
<div class="formula" v-click="1"><Latex tex="V = \dfrac{V_0}{N}\,c" display /></div>
<div class="body-def" v-click="2">代入 <Latex tex="V_0 = 1.0\ \text{mL}" />、<Latex tex="N = 100" />、<Latex tex="c = \dfrac{1}{500}" />，得 <Latex tex="V = 2.0\times10^{-5}\ \text{mL} = 2.0\times10^{-11}\ \text{m}^3" />。</div>
<div class="tip-hint" v-click="2">这也体现了用宏观量测微观量的思路：把很小的体积“放大”成可以读数的总体积，再按比例缩小。</div>
</div>
</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 测量油膜面积

<div class="page-grow">
<div class="exp-split">
<div class="powder-grid">
<div class="powder-figure"><PowderTraySvg /></div>
<div class="powder-figure"><FilmGridSvg /></div>
</div>
<div class="exp-text">
<div class="exp-facts">
<div class="exp-fact">浅盘盛水，用布袋把爽身粉均匀地撒在水面上</div>
<div class="exp-fact">滴入 1 滴溶液，油酸向外散开，把粉末推开，形成清晰的油膜轮廓</div>
<div class="exp-fact">待油膜稳定后，把带方格的玻璃板平放在浅盘上，描出轮廓</div>
</div>
<div class="warn-hint" v-click="1">数格规则：不足半格舍去，多于半格算一格。</div>
<div class="body-def" v-click="2">这里数得约 <Latex tex="2000" /> 格，每格面积 <Latex tex="1.0\ \text{cm}^2" />，所以 <Latex tex="S = 2000\times1.0\ \text{cm}^2 = 2.0\times10^{-1}\ \text{m}^2" />。</div>
</div>
</div>
</div>

---
clickAnimation: none
---

# 实验步骤

<div class="page-grow">
<div class="exp-split">
<div class="exp-figure"><ApparatusSvg /></div>
<div class="exp-text">
<div class="step-list">
<div class="step-item">
<div class="step-no">1</div>
<div class="step-text">配制油酸酒精溶液，浓度约 <Latex tex="\dfrac{1}{500}" />。</div>
</div>
<div class="step-item">
<div class="step-no">2</div>
<div class="step-text">浅盘盛水，爽身粉均匀撒在水面。</div>
</div>
<div class="step-item">
<div class="step-no">3</div>
<div class="step-text">用注射器滴入 1 滴溶液，等油膜散开、稳定。</div>
</div>
<div class="step-item">
<div class="step-no">4</div>
<div class="step-text">用带方格的玻璃板描出油膜轮廓，数格求 <Latex tex="S" />。</div>
</div>
<div class="step-item">
<div class="step-no">5</div>
<div class="step-text">用 <Latex tex="d = \dfrac{V}{S}" /> 算出分子直径。</div>
</div>
</div>
<div class="tip-hint">先测 <Latex tex="V" /> 再测 <Latex tex="S" />，最后算 <Latex tex="d" />。</div>
</div>
</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 记录数据

<div class="page-grow">
<div class="data-table">
<div class="data-row data-head"><span>测量量</span><span>某次实验数据</span></div>
<div class="data-row"><span>溶液浓度（纯油酸 / 溶液）</span><span><Latex tex="\dfrac{1}{500}" /></span></div>
<div class="data-row"><span><Latex tex="1.0\ \text{mL}" /> 溶液的滴数 <Latex tex="N" /></span><span><Latex tex="100" /></span></div>
<div class="data-row"><span>一滴溶液体积</span><span><Latex tex="1.0\times10^{-2}\ \text{mL}" /></span></div>
<div class="data-row"><span>一滴纯油酸体积 <Latex tex="V" /></span><span><Latex tex="2.0\times10^{-11}\ \text{m}^3" /></span></div>
<div class="data-row" v-click="1"><span>方格边长</span><span><Latex tex="1.0\ \text{cm}" /></span></div>
<div class="data-row" v-click="1"><span>数得方格数</span><span><Latex tex="2000" /></span></div>
<div class="data-row" v-click="1"><span>油膜面积 <Latex tex="S" /></span><span><Latex tex="2.0\times10^{-1}\ \text{m}^2" /></span></div>
</div>
<div class="info-hint" v-click="2">不同小组的测量值会略有不同，但算出的分子直径应在同一数量级。</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 数据处理

<div class="page-grow">
<div class="body-def">把测得的数据代入 <Latex tex="d = \dfrac{V}{S}" />：</div>
<div class="formula"><Latex tex="d = \dfrac{2.0\times10^{-11}\ \text{m}^3}{2.0\times10^{-1}\ \text{m}^2} = 1.0\times10^{-10}\ \text{m}" display /></div>
<div class="exp-facts">
<div class="exp-fact" v-click="1">油酸分子的直径约为 <Latex tex="1.0\times10^{-10}\ \text{m}" />，即 <Latex tex="0.1\ \text{nm}" />。</div>
<div class="exp-fact" v-click="2">大量实验表明，多数分子大小的数量级是 <Latex tex="10^{-10}\ \text{m}" />。</div>
</div>
<div class="tip-hint" v-click="2">油膜法把“测分子”变成了“测体积和面积”，这是用宏观量估测微观量的典型方法。</div>
</div>

---
title: "油膜面积变了，d 会怎样？"
clickAnimation: none
---

<div class="page-grow">
<div class="mini-title">油膜面积变了，<Latex tex="d" /> 会怎样？</div>
<AreaDemo />
<div class="tip-hint">在 <Latex tex="V" /> 一定的条件下，<Latex tex="S" /> 越大，<Latex tex="d" /> 越小；<Latex tex="S" /> 越小，<Latex tex="d" /> 越大。</div>
</div>

---
clickAnimation: none
---

# 分子有多大

<div class="page-grow">
<div class="note-grid note-grid-3">
<div class="note-card"><span class="note-icon icon-lg"><mdi-molecule /></span><div class="note-text"><strong>数量级</strong><br />多数分子的直径约 <Latex tex="10^{-10}\ \text{m}" />，即 <Latex tex="0.1\ \text{nm}" />。</div></div>
<div class="note-card"><span class="note-icon icon-lg"><mdi-water /></span><div class="note-text"><strong>有多小</strong><br /><Latex tex="1\ \text{cm}^3" /> 水中约有 <Latex tex="3.3\times10^{22}" /> 个分子。</div></div>
<div class="note-card"><span class="note-icon icon-lg"><mdi-ruler /></span><div class="note-text"><strong>对比</strong><br />把分子直径放大到 <Latex tex="1\ \text{mm}" />，相当于把 <Latex tex="1\ \text{cm}" /> 放大到 <Latex tex="100\ \text{km}" />。</div></div>
</div>
<div class="info-hint">油酸是长链分子，长度可达 <Latex tex="10^{-9}\ \text{m}" /> 量级；本实验估测的是单分子层的厚度。</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 误差分析

<div class="page-grow">
<div class="body-def">下列情况会使算出的 <Latex tex="d" /> 偏大还是偏小？</div>
<div class="err-table">
<div class="err-row err-head"><span>情况</span><span>对 <Latex tex="S" /> 或 <Latex tex="V" /> 的影响</span><span>对 <Latex tex="d" /> 的影响</span></div>
<div class="err-row"><span>油膜没有完全展开</span><span><Latex tex="S" /> 偏小</span><span><Latex tex="d" /> 偏大</span></div>
<div class="err-row"><span>轮廓描得偏大</span><span><Latex tex="S" /> 偏大</span><span><Latex tex="d" /> 偏小</span></div>
<div class="err-row"><span>爽身粉撒得太厚</span><span><Latex tex="S" /> 偏小</span><span><Latex tex="d" /> 偏大</span></div>
<div class="err-row"><span>滴数数少了</span><span><Latex tex="V" /> 偏大</span><span><Latex tex="d" /> 偏大</span></div>
<div class="err-row"><span>酒精挥发，溶液浓度变大</span><span><Latex tex="V" /> 偏大</span><span><Latex tex="d" /> 偏大</span></div>
</div>
<div class="tip-hint" v-click="1">判断依据：<Latex tex="d = \dfrac{V}{S}" />。<Latex tex="V" /> 偏大或 <Latex tex="S" /> 偏小，<Latex tex="d" /> 偏大；<Latex tex="V" /> 偏小或 <Latex tex="S" /> 偏大，<Latex tex="d" /> 偏小。</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 实验注意事项

<div class="page-grow">
<div class="note-grid">
<div class="note-card"><span class="note-icon"><mdi-flask-outline /></span><div class="note-text">溶液现配现用，滴前摇匀。</div></div>
<div class="note-card"><span class="note-icon"><mdi-water-outline /></span><div class="note-text">浅盘放水平，水面平静。</div></div>
<div class="note-card"><span class="note-icon"><mdi-spray /></span><div class="note-text">爽身粉薄而均匀。</div></div>
<div class="note-card"><span class="note-icon"><mdi-eyedropper /></span><div class="note-text">只滴 1 滴，不重复滴。</div></div>
<div class="note-card"><span class="note-icon"><mdi-grid /></span><div class="note-text">玻璃板平放，不压水面；轮廓描准。</div></div>
<div class="note-card"><span class="note-icon"><mdi-format-list-bulleted /></span><div class="note-text">数格按规则，油膜不超出浅盘。</div></div>
</div>
<div class="warn-hint" v-click="1">油膜面积过大（超出浅盘）或过小（没有充分展开），都会使测量误差变大。</div>
</div>

---
clicks: 3
clickAnimation: none
---

# 例题：估测油酸分子的大小

<div class="page-grow">
<div class="ex-grid">
<div class="ex-figure"><ExerciseGridSvg /></div>
<div class="ex-side">
<div class="ex-stem">每 <Latex tex="1000\ \text{mL}" /> 溶液含纯油酸 <Latex tex="1\ \text{mL}" />，<Latex tex="58" /> 滴溶液为 <Latex tex="1\ \text{mL}" />。滴入浅盘后，油膜轮廓如图，方格边长 <Latex tex="1\ \text{cm}" />，数得约 <Latex tex="100" /> 格。求：(1) 一滴纯油酸的体积；(2) 油膜面积；(3) 分子直径。</div>
<div class="ex-steps">
<div class="ex-step" v-click="1"><div class="ex-step-no">1</div><div><Latex tex="V = \dfrac{1}{58}\times\dfrac{1}{1000}\ \text{mL} = 1.7\times10^{-11}\ \text{m}^3" /></div></div>
<div class="ex-step" v-click="2"><div class="ex-step-no">2</div><div><Latex tex="S = 100\times1.0\ \text{cm}^2 = 1.0\times10^{-2}\ \text{m}^2" /></div></div>
<div class="ex-step" v-click="3"><div class="ex-step-no">3</div><div><Latex tex="d = \dfrac{V}{S} = 1.7\times10^{-9}\ \text{m}" /></div></div>
</div>
</div>
</div>
</div>

---
clicks: 3
clickAnimation: none
---

# 练习：测薄膜的厚度

<div class="page-grow">
<div class="ex-stem">一块 <Latex tex="10\ \text{cm}\times20\ \text{cm}" /> 的塑料薄膜，质量 <Latex tex="36\ \text{g}" />，悬浮在密度 <Latex tex="1.2\times10^3\ \text{kg/m}^3" /> 的盐水中。求薄膜的厚度。</div>
<div class="ex-steps">
<div class="ex-step" v-click="1"><div class="ex-step-no">1</div><div>薄膜悬浮，密度等于盐水密度，体积 <Latex tex="V = \dfrac{m}{\rho} = \dfrac{36\times10^{-3}}{1.2\times10^3} = 3.0\times10^{-5}\ \text{m}^3" /></div></div>
<div class="ex-step" v-click="2"><div class="ex-step-no">2</div><div>薄膜面积 <Latex tex="S = 0.10\times0.20 = 2.0\times10^{-2}\ \text{m}^2" /></div></div>
<div class="ex-step" v-click="3"><div class="ex-step-no">3</div><div>厚度 <Latex tex="d = \dfrac{V}{S} = 1.5\times10^{-3}\ \text{m} = 1.5\ \text{mm}" /></div></div>
</div>
<div class="tip-hint" v-click="3">这和油膜法用的是同一个关系：<Latex tex="d = \dfrac{V}{S}" />。</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 练习：把测量“放大”

<div class="page-grow">
<div class="ex-stem">借鉴本实验的思路，设计下面的测量方案。</div>
<div class="note-grid">
<div class="note-card" v-click="1"><span class="note-icon icon-lg"><mdi-scale-balance /></span><div class="note-text"><strong>(1) 称出 0.01 g 食盐</strong><br />用电子秤称 1.00 g 食盐，溶于水配成 100 mL 溶液；取 1.00 mL 溶液，其中含食盐 0.010 g。</div></div>
<div class="note-card" v-click="2"><span class="note-icon icon-lg"><mdi-ruler /></span><div class="note-text"><strong>(2) 测细铁丝的横截面积</strong><br />量出铁丝长度 l、质量 m，查密度 ρ，则 A = m/(ρl)。</div></div>
</div>
<div class="tip-hint" v-click="2">共同思路：把太小、太难直接测量的量，转化为可以成倍放大的宏观量。</div>
</div>

---
clickAnimation: none
---

<div class="page-grow">
<div class="mini-title">用油膜法估测分子大小</div>
<div class="sum-chain">
<div class="sum-node">单分子油膜</div>
<div class="sum-arrow">→</div>
<div class="sum-node">测 <Latex tex="V" />、<Latex tex="S" /></div>
<div class="sum-arrow">→</div>
<div class="sum-node sum-node-main"><Latex tex="d = \dfrac{V}{S}" /></div>
<div class="sum-arrow">→</div>
<div class="sum-node"><Latex tex="10^{-10}\ \text{m}" /></div>
</div>
<div class="sum-list">
<div class="sum-row"><span class="sum-key">模型</span><span>把分子看成小球，紧密排列成单层</span></div>
<div class="sum-row"><span class="sum-key">测量</span><span>一滴纯油酸的体积 <Latex tex="V" />、油膜面积 <Latex tex="S" /></span></div>
<div class="sum-row"><span class="sum-key">方法</span><span>用宏观量估测微观量，<Latex tex="d = \dfrac{V}{S}" /></span></div>
</div>
</div>

---
clickAnimation: none
---

<div class="page-grow">
<div class="next-kicker">下一节 · 1.3</div>
<div class="next-title">分子运动速率分布规律</div>
<div class="next-grid">
<div class="next-card"><span class="next-icon icon-lg"><mdi-chart-bell-curve /></span><div class="next-name">统计规律</div><div class="next-text">大量分子的运动遵循统计规律</div></div>
<div class="next-card"><span class="next-icon icon-lg"><mdi-chart-line /></span><div class="next-name">速率分布</div><div class="next-text">分子速率按一定规律分布</div></div>
<div class="next-card"><span class="next-icon icon-lg"><mdi-thermometer /></span><div class="next-name">温度</div><div class="next-text">温度越高，分子热运动越剧烈</div></div>
</div>
</div>
