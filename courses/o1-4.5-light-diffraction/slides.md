---
theme: default
title: "光的衍射"
subtitle: "从单缝到光栅"
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
chapter-no: "4.5"
chapter: "第四章 光"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 为什么看不到光的衍射
clicks: 1
---

<div class="page-grow pt2">
  <div class="ask ask-lead p2-ask">声音能绕过墙，传到墙后；<br>光却看起来总是沿直线传播。<br>光也是一种波，为什么？</div>
  <div class="p2-grid">
    <div class="p2-card">
      <mdi-volume-high class="icon-lg p2-icon" />
      <div class="p2-title">声波</div>
      <div class="p2-text">波长较长，容易绕过障碍物。</div>
    </div>
    <div class="p2-card">
      <mdi-lightbulb-on-outline class="icon-lg p2-icon" />
      <div class="p2-title">可见光</div>
      <div class="p2-text">波长不到 <Latex tex="1\ \mu\text{m}" />，日常障碍物远大于它。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">障碍物或孔的尺寸与波长相差不多时，衍射才明显。</div>
</div>

---
layout: base-flex
title: 单缝衍射
clicks: 2
---

# 单缝衍射

<div class="page-grow pt3">
  <div class="p3-grid">
    <div class="p3-case">
      <div class="p3-tag">宽缝</div>
      <SingleSlitSvg variant="wide" />
      <div class="p3-note">光沿直线通过，亮纹与缝宽相当</div>
    </div>
    <div class="p3-case">
      <div class="p3-tag">窄缝</div>
      <SingleSlitSvg variant="narrow" />
      <div class="p3-note">亮纹变宽变暗，并出现明暗相间的条纹</div>
    </div>
  </div>
  <div class="tip-hint" v-click="1">光没有沿直线传播，它绕过了缝的边缘。</div>
  <div class="p3-conclusion" v-click="2">这就是光的衍射现象。</div>
</div>

---
layout: base-flex
title: 单缝衍射条纹
clicks: 2
---

# 单缝衍射条纹

<div class="page-grow pt4">
  <div class="ask">中央亮纹和两侧条纹有什么不同？</div>
  <div class="p4-pattern"><DiffractionPatternSvg mode="single" /></div>
  <div class="p4-notes">
    <div class="p4-note" v-click="1">中央亮纹宽而亮。</div>
    <div class="p4-note" v-click="2">两侧条纹窄而暗，离中央越远越暗。</div>
  </div>
</div>

---
layout: base-flex
title: 圆孔与障碍物的衍射
clicks: 2
---

# 圆孔与障碍物的衍射

<div class="page-grow pt5">
  <div class="ask">圆孔和不透明圆盘后的屏上，分别是什么图样？</div>
  <div class="p5-grid">
    <div class="p5-card">
      <CircularDiffractionSvg mode="aperture" />
      <div class="p5-note" v-click="1">屏上是明暗相间的同心圆环。</div>
    </div>
    <div class="p5-card">
      <CircularDiffractionSvg mode="obstacle" />
      <div class="p5-note" v-click="2">影的轮廓模糊不清，出现明暗相间的条纹。</div>
    </div>
  </div>
</div>

---
layout: base-flex
title: 明显衍射的条件
clicks: 3
---

# 明显衍射的条件

<div class="page-grow pt6">
  <div class="ask">为什么日常生活中看不到光的衍射？</div>
  <div class="p6-rows">
    <div class="p6-row">
      <span class="p6-size">障碍物或孔 <Latex tex="\gg \lambda" /></span>
      <span class="p6-text">衍射不明显，光近似沿直线传播。</span>
    </div>
    <div class="p6-row p6-strong" v-click="1">
      <span class="p6-size">尺寸与 <Latex tex="\lambda" /> 相差不多或更小</span>
      <span class="p6-text">衍射明显。</span>
    </div>
    <div class="p6-row" v-click="2">
      <span class="p6-size">可见光 <Latex tex="\lambda \approx 0.4\text{–}0.7\ \mu\text{m}" /></span>
      <span class="p6-text">日常缝宽和障碍物都远大于这个尺度。</span>
    </div>
  </div>
  <div class="tip-hint" v-click="3">障碍物或孔的尺寸与波长相差不多或更小时，衍射才明显。</div>
</div>

---
layout: base-flex
title: 缝宽与条纹
clicks: 1
---

# 缝宽与条纹

<div class="page-grow pt7">
  <div class="ask">减小缝宽，中央亮纹怎样变化？</div>
  <div class="p7-demo"><SlitWidthDemo /></div>
  <div class="tip-hint" v-click="1">缝越窄，中央亮纹越宽、越暗；两侧条纹也变宽。</div>
</div>

---
layout: base-flex
title: 白光的衍射
clicks: 1
---

# 白光的衍射

<div class="page-grow pt8">
  <div class="ask">用白光照射单缝，屏上的条纹是什么颜色？</div>
  <div class="p8-pattern"><DiffractionPatternSvg mode="white" /></div>
  <div class="p8-note" v-click="1">不同色光的波长不同，亮纹的位置不同，于是出现彩色条纹。</div>
</div>

---
layout: base-flex
title: 干涉与衍射
clicks: 3
---

# 干涉与衍射

<div class="page-grow pt9">
  <div class="p9-grid">
    <div class="p9-case">
      <div class="p9-label">双缝干涉</div>
      <DiffractionPatternSvg mode="double" />
      <div class="p9-note" v-click="1">亮纹等间距，宽度相同。</div>
    </div>
    <div class="p9-case">
      <div class="p9-label">单缝衍射</div>
      <DiffractionPatternSvg mode="single" />
      <div class="p9-note" v-click="2">中央亮纹宽而亮，两侧窄而暗。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="3">双缝是两束光叠加；单缝是同一缝上不同位置的光叠加。</div>
</div>

---
layout: base-flex
title: 衍射光栅
clicks: 3
---

# 衍射光栅

<div class="page-grow pt10">
  <div class="ask">单缝条纹太宽、较暗，怎样改进？</div>
  <div class="p10-fig"><GratingSvg /></div>
  <div class="p10-notes">
    <div class="p10-note" v-click="1">增加狭缝的数目，条纹变窄、变亮。</div>
    <div class="p10-note" v-click="2">光栅：许多等宽、等距的狭缝。</div>
    <div class="p10-note" v-click="3">透射光栅和反射光栅可用于更精确的测量。</div>
  </div>
</div>

---
layout: base-flex
title: 泊松亮斑
clicks: 2
---

# 泊松亮斑

<div class="page-grow pt11">
  <div class="half-grid p11-grid">
    <div class="p11-fig"><PoissonSpotSvg /></div>
    <div class="divider-l p11-side">
      <div class="ask">不透明圆盘的影中心，会不会是亮的？</div>
      <div class="p11-line" v-click="1">菲涅耳按波动说计算：影中心应出现亮斑。</div>
      <div class="p11-line" v-click="2">泊松认为荒谬；阿拉果却在实验中看到了亮斑。</div>
      <div class="tip-hint" v-click="2">泊松亮斑反而支持了光的波动说。</div>
    </div>
  </div>
</div>

---
layout: base-flex
title: X射线衍射
---

# X射线衍射

<div class="page-grow pt12">
  <div class="ask">为什么 X 射线能探测晶体结构？</div>
  <div class="p12-grid">
    <div class="p12-card">
      <mdi-radar class="icon-lg p12-icon" />
      <div class="p12-title">波长匹配</div>
      <div class="p12-text">晶体中原子的间距与 X 射线波长接近，能发生明显的衍射。</div>
    </div>
    <div class="p12-card">
      <mdi-check-circle-outline class="icon-lg p12-icon" />
      <div class="p12-title">探测结构</div>
      <div class="p12-text">衍射图样携带晶体结构的信息；劳厄在 1912 年观察到这一现象，后来用于研究 DNA 双螺旋。</div>
    </div>
  </div>
</div>

---
layout: exercise-split
title: 例题：三角形孔
analysisLabel: 解析
clicks: 3
---

<template v-slot:stem>
太阳光照射一块遮光板，板上有一个大的三角形孔，屏上出现一个三角形光斑。当孔的尺寸不断减小时，屏上的图形将怎样变化？说明理由。
</template>

<template v-slot:fig>
<div class="p13-fig"><TriangleHoleSvg /></div>
</template>

<div class="p13-analysis">
  <div class="p13-line" v-click="1">孔较大时，光沿直线传播，屏上是三角形光斑。</div>
  <div class="p13-line" v-click="2">孔小到与波长相差不多时，光绕过孔边缘，衍射明显，边缘变模糊，并出现明暗条纹。</div>
  <div class="p13-line" v-click="3">孔继续减小时，光斑形状由衍射决定，不能再按孔的几何形状判断。</div>
</div>

---
layout: exercise-split
title: 例题：单缝变窄
analysisLabel: 解析
clicks: 2
---

<template v-slot:stem>
在挡板上安装一个宽度可以调节的狭缝，缝后放一个光屏。用平行单色光照射狭缝，当缝的宽度较小时，屏上出现衍射条纹。如果进一步调小狭缝的宽度，条纹会怎样变化？
</template>

<div class="p14-analysis">
  <div class="p14-line" v-click="1">条纹变宽，亮度降低。</div>
  <div class="p14-line" v-click="2">中央亮纹变宽更明显；缝越窄，衍射越明显。</div>
</div>

---
layout: exercise-split
title: 练习：两支铅笔
analysisLabel: 解析
clicks: 2
---

<template v-slot:stem>
用两支铅笔夹成一条狭缝，将眼睛紧贴着狭缝，并让狭缝与日光灯管平行。你会观察到什么现象？试解释。
</template>

<div class="p15-analysis">
  <div class="p15-line" v-click="1">透过狭缝看到明暗相间（彩色）的条纹，这是光的衍射。</div>
  <div class="p15-line" v-click="2">缝越窄，条纹越宽；用线状光源更容易观察。</div>
</div>

---
layout: exercise-split
title: 练习：微型瞳孔
analysisLabel: 解析
clicks: 2
---

<template v-slot:stem>
可见光的波长是微米数量级的，人眼的瞳孔直径是毫米数量级的。假想有一种眼睛的瞳孔直径是微米数量级的，视网膜非常灵敏，这时看到的外部世界将是什么景象？
</template>

<div class="p16-analysis">
  <div class="p16-line" v-click="1">瞳孔尺寸与可见光波长可比，衍射会非常明显。</div>
  <div class="p16-line" v-click="2">物体边缘出现条纹、像变模糊，分辨率下降；日常瞳孔是毫米级，衍射可忽略。</div>
</div>

---
layout: exercise-split
title: 练习：判断衍射与干涉
analysisLabel: 解析
clicks: 3
---

<template v-slot:stem>
判断下列说法是否正确，并说明理由：<br>
（1）单缝变窄，中央亮纹变宽。<br>
（2）双缝干涉条纹中央宽、两侧窄。<br>
（3）障碍物尺寸远大于波长时，光近似沿直线传播。
</template>

<div class="p17-analysis">
  <div class="p17-line" v-click="1">（1）正确。缝越窄，衍射越明显，中央亮纹越宽。</div>
  <div class="p17-line" v-click="2">（2）错误。中央宽、两侧窄是单缝衍射的特点；双缝干涉条纹等间距。</div>
  <div class="p17-line" v-click="3">（3）正确。衍射不明显时，可以近似认为光沿直线传播。</div>
</div>

---
layout: base-flex
title: 课堂小结
clicks: 3
---

# 课堂小结

<div class="page-grow pt18">
  <div class="step-list p18-list">
    <div class="step-item p18-item"><span class="step-no">1</span><div>光绕过障碍物或孔的边缘继续传播，叫光的衍射；一切波都能衍射。</div></div>
    <div class="step-item p18-item" v-click="1"><span class="step-no">2</span><div>明显衍射的条件：障碍物或孔的尺寸与波长相差不多或更小。</div></div>
    <div class="step-item p18-item" v-click="2"><span class="step-no">3</span><div>单缝条纹中央宽而亮、两侧窄而暗；双缝干涉条纹等间距。</div></div>
    <div class="step-item p18-item" v-click="3"><span class="step-no">4</span><div>光栅用多缝使条纹更窄更亮；泊松亮斑和 X 射线衍射是波动说的证据与应用。</div></div>
  </div>
</div>
