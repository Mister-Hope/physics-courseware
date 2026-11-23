---
theme: default
title: "波的反射、折射和衍射"
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
subtitle: "波遇到界面和障碍物时"
# 页面外壳用共享 addon 的 base-flex 布局（flex 列；正文 .page-grow 靠它撑满）
defaults:
  layout: base-flex
  transition: fade
chapter-no: "3.3"
chapter: "第三章 机械波"
---

<CoverDecorationSvg />

---
layout: base-flex
title: 回声与水波
clicks: 1
---

<div class="page-grow pt2">
<div class="ask ask-lead p2-ask">
<div>对着远处的峭壁喊一声，会听到回声。</div>
<div>水波遇到挡板，传播方向也会改变。</div>
<div>波遇到障碍物或界面，会怎样传播？</div>
</div>
<div class="p2-cases">
<div class="p2-case">
<mdi-bullhorn class="icon-xl p2-icon" />
<div class="p2-case-title">声波的反射</div>
<div class="p2-case-text">声音碰到峭壁反射回来，形成回声。</div>
</div>
<div class="p2-case">
<mdi-waves class="icon-xl p2-icon" />
<div class="p2-case-title">水波的反射</div>
<div class="p2-case-text">水波遇到挡板，传播方向发生改变。</div>
</div>
</div>
<div class="tip-hint" v-click="1">波遇到障碍物或界面时，传播方向会发生改变。</div>
</div>

---
layout: base-flex
title: 波的反射
clicks: 3
---

# 波的反射

<div class="page-grow pt3">
<div class="ask">水波遇到挡板后，反射线与入射线有什么关系？</div>
<div class="p3-fig"><ReflectionWavefrontSvg /></div>
<div class="p3-laws">
<div class="p3-law" v-click="1"><span class="p3-no">1</span><span>反射线、法线与入射线在同一平面内。</span></div>
<div class="p3-law" v-click="2"><span class="p3-no">2</span><span>反射线与入射线分居法线两侧。</span></div>
<div class="p3-law" v-click="3"><span class="p3-no">3</span><span>反射角等于入射角。</span></div>
</div>
<div class="tip-hint" v-click="3">这就是波的反射定律，与光的反射规律相同。</div>
</div>

---
layout: base-flex
title: 回声与反射应用
clicks: 1
---

# 回声与反射

<div class="page-grow pt4">
<div class="ask">为什么在空旷的山谷里能听到回声？</div>
<div class="half-grid p4-grid">
<div class="p4-card">
<mdi-bullhorn class="icon-xl p4-icon" />
<div class="p4-title">回声</div>
<div class="p4-text" v-click="1">声波遇到峭壁等障碍物反射回来，形成回声。</div>
</div>
<div class="p4-card">
<mdi-bat class="icon-xl p4-icon" />
<div class="p4-title">回声定位</div>
<div class="p4-text" v-click="1">蝙蝠发出超声波，靠反射波判断前方障碍物。</div>
</div>
</div>
<div class="tip-hint" v-click="1">反射是波遇到障碍物时改变传播方向的现象。</div>
</div>

---
layout: base-flex
title: 波的折射
clicks: 2
---

# 波的折射

<div class="page-grow pt5">
<div class="ask">水波从深水区进入浅水区，传播方向为什么会改变？</div>
<div class="p5-fig"><RefractionWavefrontSvg /></div>
<div class="p5-notes">
<div class="p5-item" v-click="1"><span class="p5-no">1</span><div>波线在两种介质的分界面处发生偏折。</div></div>
<div class="p5-item" v-click="2"><span class="p5-no">2</span><div>深水区波速大，浅水区波速小。</div></div>
</div>
<div class="info-hint">一切波都会发生折射。</div>
</div>

---
layout: base-flex
title: 折射中什么变、什么不变
clicks: 3
---

# 折射中什么变、什么不变

<div class="page-grow pt6">
<div class="ask">波从一种介质进入另一种介质，频率、波速、波长中哪些会改变？</div>
<div class="three-col p6-cards">
<div class="p6-card">
<div class="p6-tag">频率</div>
<div class="p6-prompt">判断：</div>
<div class="p6-value" v-click="1">不变</div>
<div class="p6-text" v-click="1">由波源决定，进入另一种介质后频率不变。</div>
</div>
<div class="p6-card">
<div class="p6-tag">波速</div>
<div class="p6-prompt">判断：</div>
<div class="p6-value" v-click="2">改变</div>
<div class="p6-text" v-click="2">波速由介质本身的性质决定。</div>
</div>
<div class="p6-card">
<div class="p6-tag">波长</div>
<div class="p6-prompt">判断：</div>
<div class="p6-value" v-click="3">改变</div>
<div class="p6-text" v-click="3">由 <Latex tex="v=\lambda f" /> 得 <Latex tex="\lambda=v/f" />。</div>
</div>
</div>
<div class="summary-line" v-click="3">频率不变，波速改变，所以波长一定改变。</div>
</div>

---
layout: base-flex
title: 折射的定性规律
clicks: 2
---

# 折射的定性规律

<div class="page-grow pt7">
<div class="ask">图中入射角 <Latex tex="\theta_1" /> 和折射角 <Latex tex="\theta_2" />，哪个大？为什么？</div>
<div class="p7-fig"><RefractionWavefrontSvg /></div>
<div class="p7-rules">
<div class="p7-rule"><span class="p7-no">1</span><span>从深水进入浅水，波速变小，折射角变小，即 <Latex tex="\theta_2<\theta_1" />。</span></div>
<div class="p7-rule" v-click="1"><span class="p7-no">2</span><span>从浅水进入深水，波速变大，折射角变大，即 <Latex tex="\theta_2>\theta_1" />。</span></div>
<div class="p7-rule" v-click="2"><span class="p7-no">3</span><span>垂直界面入射时，传播方向不变。</span></div>
</div>
<div class="tip-hint" v-click="2">折射角的大小由两种介质的波速和入射角共同决定。</div>
</div>

---
layout: base-flex
title: 波的衍射
clicks: 2
---

# 波的衍射

<div class="page-grow pt8">
<div class="ask">波遇到障碍物或小孔后，会怎样传播？</div>
<div class="p8-fig"><DiffractionSvg /></div>
<div class="p8-notes">
<div class="p8-note" v-click="1"><span class="p8-no">1</span><span>波绕过障碍物继续传播，叫波的衍射。</span></div>
<div class="p8-note" v-click="2"><span class="p8-no">2</span><span>波通过小孔后，会向各个方向传播。</span></div>
</div>
<div class="info-hint">衍射是波特有的现象，一切波都能发生衍射。</div>
</div>
