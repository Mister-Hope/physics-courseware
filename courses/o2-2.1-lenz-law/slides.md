---
theme: default
title: "楞次定律"
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
chapter-no: "2.1"
chapter: "第二章 电磁感应"
---

<CoverDecorationSvg />

---
layout: focus-question
title: 引课（感应电流的方向）
---

<template v-slot:icon>

<mdi-compass-outline />

</template>

把 N 极插入线圈，指针向右偏；把 N 极抽出，指针向左偏。同样在改变磁通量，为什么感应电流的方向相反？

<template v-slot:hint>

此前学过：穿过闭合回路的磁通量发生变化，回路中就有感应电流。它只说清了有没有，没说朝哪边。

</template>

<template v-slot:answer>

要给方向找到判据，得先把磁极和磁通量的增减分开来看。

</template>

---
title: 实验设计（两个变量）
clicks: 2
---

# 实验：把四种情况分开

<div class="page-grow">
<div class="ask">同样在改变磁通量，感应电流的方向却不同。要找出规律，应该改变什么、控制什么？</div>
<div v-click="1">两个变量：磁极（N / S）、磁通量在增大还是减小（插入 / 抽出）。线圈、磁体、电流表都不变。</div>
<div v-click="2" class="split-wide" style="--cols: minmax(0, 1.15fr) minmax(0, 0.85fr)">
<div class="stack">
<div>两种磁极 × 两种变化，共四种情况。</div>
<div>每种情况记两件事：磁体磁场的方向、感应电流的方向。</div>
</div>
<div>
<table class="data-table lt-table">
<thead>
<tr><th>磁极</th><th>N 极</th><th>S 极</th></tr>
</thead>
<tbody>
<tr><th>插入（<Latex tex="\Phi" /> 增大）</th><td>甲</td><td>乙</td></tr>
<tr><th>抽出（<Latex tex="\Phi" /> 减小）</th><td>丙</td><td>丁</td></tr>
</tbody>
</table>
</div>
</div>
</div>

---
title: 回放（磁体运动时的电流表）
clicks: 2
---

# 回放：四种情况各一遍

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.55fr) minmax(0, 1fr)">
<div><CoilMagnetReplay /></div>
<div class="stack">
<div class="ask">磁体运动的过程中，指针什么时候偏？</div>
<div v-click="1">磁体一动，指针就偏；磁体一停，指针立刻回到零。</div>
<div v-click="2">四种情况的偏向两两不同：N 极与 S 极相反，插入与抽出也相反。</div>
</div>
</div>
</div>

---
title: 实验记录（四格）
clicks: 4
---

# 记录：磁体磁场与感应电流

<div class="page-grow">
<div class="case-grid">
<div class="case case-jia">
<div class="case-cap">甲　N 极插入</div>
<CoilMagnetSvg pole="N" motion="in" :b0="$clicks >= 1 ? 'down' : 'none'" :current="$clicks >= 1 ? 'ccw' : 'none'" />
</div>
<div class="case case-yi">
<div class="case-cap">乙　S 极插入</div>
<CoilMagnetSvg pole="S" motion="in" :b0="$clicks >= 2 ? 'up' : 'none'" :current="$clicks >= 2 ? 'cw' : 'none'" />
</div>
<div class="case case-bing">
<div class="case-cap">丙　N 极抽出</div>
<CoilMagnetSvg pole="N" motion="out" :b0="$clicks >= 3 ? 'down' : 'none'" :current="$clicks >= 3 ? 'cw' : 'none'" />
</div>
<div class="case case-ding">
<div class="case-cap">丁　S 极抽出</div>
<CoilMagnetSvg pole="S" motion="out" :b0="$clicks >= 4 ? 'up' : 'none'" :current="$clicks >= 4 ? 'ccw' : 'none'" />
</div>
</div>
</div>

---
title: 换视角（感应电流的磁场）
clicks: 3
---

# 换一个角度：看感应电流自己的磁场

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 0.95fr) minmax(0, 1.05fr)">
<div class="fig-lg"><CoilMagnetSvg pole="N" motion="in" b0="down" bi="up" current="ccw" /></div>
<div class="stack">
<div class="ask">以甲为例：磁体磁场向下、感应电流逆时针，两个方向对不上——中间缺了什么？</div>
<div v-click="1">磁体在空间里产生磁场；感应电流也在空间里产生磁场。</div>
<div v-click="2">右手握住线圈，四指顺着电流的方向，拇指就指向线圈内部的磁场方向，由此定出 <Latex tex="B_\text{i}" />。</div>
<div v-click="3">甲：<Latex tex="B_0" /> 向下、<Latex tex="B_\text{i}" /> 向上，两者反向。</div>
</div>
</div>
</div>

---
title: 四种情况的比较
clicks: 5
---

# 四种情况放在一起

<div class="page-grow">
<table class="data-table lt-table">
<thead>
<tr><th>情况</th><th><Latex tex="B_0" /></th><th><Latex tex="\Phi" /></th><th><Latex tex="I" />（俯视）</th><th><Latex tex="B_\text{i}" /></th><th><Latex tex="B_\text{i}" /> 与 <Latex tex="B_0" /></th></tr>
</thead>
<tbody>
<tr><td>甲　N 极插入</td><td>向下</td><td>增大</td><td>逆时针</td><td><span v-click="1">向上</span></td><td><span v-click="1">相反</span></td></tr>
<tr><td>乙　S 极插入</td><td>向上</td><td>增大</td><td>顺时针</td><td><span v-click="2">向下</span></td><td><span v-click="2">相反</span></td></tr>
<tr><td>丙　N 极抽出</td><td>向下</td><td>减小</td><td>顺时针</td><td><span v-click="3">向下</span></td><td><span v-click="3">相同</span></td></tr>
<tr><td>丁　S 极抽出</td><td>向上</td><td>减小</td><td>逆时针</td><td><span v-click="4">向上</span></td><td><span v-click="4">相同</span></td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="5">磁通量增大时，<Latex tex="B_\text{i}" /> 与 <Latex tex="B_0" /> 反向；减小时两者同向。</div>
</div>

---
title: 楞次定律
clicks: 2
---

<div class="page-grow">
<DefinitionBox term="楞次定律">

<div>感应电流具有这样的方向，即感应电流的磁场总要<span class="def-term">阻碍引起感应电流的磁通量的变化</span>。</div>

<div class="mini-note mt-2">1834 年，俄国物理学家楞次在分析大量实验事实后得到这一规律。</div>

</DefinitionBox>
<div v-click="1"><b>阻碍的是变化</b>：<Latex tex="\Phi" /> 增大时 <Latex tex="B_\text{i}" /> 与 <Latex tex="B_0" /> 反向，削弱这个增加；<Latex tex="\Phi" /> 减小时两者同向，补偿这个减少。</div>
<div v-click="2"><b>阻碍不是阻止</b>：磁通量照样在变，只是变化过程中要克服 <Latex tex="B_\text{i}" />——正因为要克服，才有能量的转化。</div>
</div>

---
title: 楞次定律与能量守恒
clicks: 3
---

# 楞次定律与能量守恒

<div class="page-grow">
<div class="ask">感应电流的磁场为什么一定要阻碍变化？如果它帮忙，会怎样？</div>
<div v-click="1">插入时线圈把磁体往外推，抽出时往回拉——两种情况下，外力都要做正功。</div>
<div v-click="2">外力做的功转化为感应电流的电能，在导线电阻上发热。能量守恒，方向只能是阻碍。</div>
<div v-click="3" class="danger-hint">假如它帮助变化：插入时线圈自己把磁体吸进来，磁体越跑越快，导线还在发热——能量凭空增加。</div>
</div>

---
title: 用铝环检验
clicks: 3
---

# 用铝环检验楞次定律

<div class="page-grow">
<div class="ask">把磁体的 N 极靠近吊起的铝环，再移开——两次铝环各往哪边动？</div>
<div class="ring-row">
<div>
<AluminumRingSvg mode="approach" />
<div class="case-cap">磁体靠近</div>
</div>
<div>
<AluminumRingSvg mode="away" />
<div class="case-cap">磁体移开</div>
</div>
</div>
<div v-click="1">靠近：穿过铝环的磁通量增大，感应电流的磁场与 <Latex tex="B_0" /> 反向，铝环被推开。</div>
<div v-click="2">移开：磁通量减小，感应电流的磁场与 <Latex tex="B_0" /> 同向，铝环被吸回。</div>
<div v-click="3">把铝环剪开一个缺口再做：没有闭合回路，没有感应电流，铝环不动。</div>
</div>

---
title: 判定步骤
clicks: 5
---

# 用楞次定律判定感应电流的方向

<div class="page-grow">
<div class="step-list">
<div class="step-row"><span class="step-no">1</span><div>明确研究对象：哪一个是产生感应电流的闭合回路。</div></div>
<div class="step-row" v-click="1"><span class="step-no">2</span><div>画出穿过回路的原磁场 <Latex tex="B_0" /> 的方向。</div></div>
<div class="step-row" v-click="2"><span class="step-no">3</span><div>判断穿过回路的磁通量在增大还是减小。</div></div>
<div class="step-row" v-click="3"><span class="step-no">4</span><div>由增反减同，定出感应电流的磁场 <Latex tex="B_\text{i}" /> 的方向。</div></div>
<div class="step-row" v-click="4"><span class="step-no">5</span><div>由右手螺旋定则，从 <Latex tex="B_\text{i}" /> 定出感应电流 <Latex tex="I" /> 的方向。</div></div>
</div>
<div class="warn-hint" v-click="5">第 3 步最容易错：判断的是磁通量在增大还是减小，不是原磁场朝哪个方向。</div>
</div>

---
title: 右手定则
clicks: 3
---

# 右手定则：导体切割磁感线

<div class="page-grow">
<div class="split-wide" style="--cols: minmax(0, 1.1fr) minmax(0, 0.9fr)">
<div>
<RightHandRuleSvg />
<div class="mini-note text-center">磁感线垂直纸面向里</div>
</div>
<div class="stack">
<div class="ask">导体棒向右运动，回路中的感应电流沿哪个方向？</div>
<div v-click="1">用楞次定律：回路面积增大，<Latex tex="\Phi" /> 增大，<Latex tex="B_\text{i}" /> 向外，电流逆时针——棒中向上。</div>
<div v-click="2"><b>右手定则</b>：伸开右手，让拇指与其余四指垂直且都在手掌平面内；磁感线从掌心进入，拇指指向导体运动的方向，四指所指的方向就是感应电流的方向。</div>
<div v-click="3">它只适用于导体切割磁感线；线圈、磁体运动等一般情况仍用楞次定律。</div>
</div>
</div>
</div>

---
title: 三个定则
clicks: 3
---

# 三个定则各管什么

<div class="page-grow">
<table class="data-table lt-table">
<thead>
<tr><th>定则</th><th>已知</th><th>判断</th></tr>
</thead>
<tbody>
<tr><td>安培定则（右手螺旋）</td><td>电流方向</td><td>磁感线方向</td></tr>
<tr v-click="1"><td>左手定则</td><td>电流方向、磁场方向</td><td>安培力、洛伦兹力的方向</td></tr>
<tr v-click="2"><td>右手定则</td><td>磁场方向、导体运动方向</td><td>感应电流方向</td></tr>
</tbody>
</table>
<div class="info-hint" v-click="3">先想清楚要判断什么，再挑定则；拿不准时，先用楞次定律把电流方向定下来。</div>
</div>

---
title: 课堂小结
clicks: 5
---

# 课堂小结

<div class="page-grow">
<div class="sum-chain">
<div class="sum-step">四种情况<br />电流方向不同</div>
<div class="sum-arrow"><mdi-arrow-right-bold class="icon-md" /></div>
<div class="sum-step" v-click="1">改看感应电流<br />自己的磁场 <Latex tex="B_\text{i}" /></div>
<div class="sum-arrow" v-click="1"><mdi-arrow-right-bold class="icon-md" /></div>
<div class="sum-step" v-click="2">增反减同<br />楞次定律</div>
<div class="sum-arrow" v-click="2"><mdi-arrow-right-bold class="icon-md" /></div>
<div class="sum-step" v-click="3">阻碍变化<br />是能量守恒</div>
</div>
<div class="warn-hint" v-click="4">阻碍的是磁通量的变化，不是磁通量本身；阻碍也不是阻止。</div>
<div class="info-hint" v-click="5">右手定则只管导体切割磁感线；其他情形回到楞次定律的五步。</div>
</div>
