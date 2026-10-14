---
theme: default
title: "万有引力理论的成就"
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
chapter-no: "7.3"
chapter: "第七章 万有引力与宇宙航行"
subtitle: "称量天体 · 解释已知 · 预言未知"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 1
---

<div class="page-grow">
<div class="ask ask-lead">在地面上，物体的质量用天平、台秤就能称出来。地球的质量，又该怎么"称"？</div>

<div class="ask" v-click="1">反过来想：地面上质量为 <Latex tex="m" /> 的物体受到的重力 <Latex tex="mg" /> 是从哪儿来的？它跟地球的质量有什么关系？</div>
</div>

---
layout: base-flex
clicks: 3
---

# "称量"地球的质量

<div class="page-grow pg-tight">
<div class="ask">不计地球自转时，重力 <Latex tex="mg" /> 与地球的万有引力是什么关系？</div>

<div v-click="1">
<Latex tex="mg = G\frac{m m_{\text{地}}}{R^2}\;\xrightarrow{\ \text{约去}\ m\ }\;m_{\text{地}} = \frac{gR^2}{G}" display />
</div>

<div v-click="2">
<EarthMassLab />
</div>

<div class="key" v-click="3">测出 <Latex tex="G" />，地球的质量就能算出来——卡文迪什把自己的实验说成"称量地球的重量"。</div>
</div>

---
layout: base-flex
clicks: 3
---

# 计算天体的质量

<div class="page-grow pg-tight">
<div class="ask">能用"称量"地球质量的办法"称量"太阳吗？太阳的质量怎么得到？</div>

<div v-click="1">
<div class="summary-line">行星的向心力由太阳的万有引力提供，把 <Latex tex="\omega = \frac{2\pi}{T}" /> 代入：</div>
<Latex tex="G\frac{m m_{\text{太}}}{r^2} = m\omega^2 r = m\frac{4\pi^2 r}{T^2}" display />
</div>

<div v-click="2">
<div class="summary-line">行星自己的质量 <Latex tex="m" /> 被约掉，剩下中心天体的质量：</div>
<Latex tex="m_{\text{太}} = \frac{4\pi^2 r^3}{G T^2}" display />
<div class="mini-note">测出卫星的周期和它的轨道半径，也能算出行星的质量。</div>
</div>

<div class="key" v-click="3">根据开普勒第三定律，不同行星的 <Latex tex="r^3/T^2" /> 相同——算出的太阳质量都一样。</div>
</div>

---
layout: base-flex
clicks: 2
---

# 计算天体的质量

<div class="page-grow pg-tight">
<div class="ask">换一颗行星、换一颗卫星，同样测出 <Latex tex="r" /> 和 <Latex tex="T" />——算出来的又是谁的质量？</div>

<div v-click="1">
<CelestialMassLab />
</div>

<div class="key" v-click="2">环绕天体的质量 <Latex tex="m" /> 总会被约掉——测出 <Latex tex="r" />、<Latex tex="T" />，只能算出<b>中心天体</b>的质量。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 发现未知天体

<div class="page-grow pg-tight">
<div class="ask">1781 年发现天王星后，算出的轨道总与观测位置差一点——为什么？</div>

<div class="half-grid">
<div class="stack-dense" v-click="1">
<div class="summary-line">是天文观测的数据不够准？</div>
<div class="summary-line">是万有引力定律本身有问题？</div>
<div class="summary-line">还是轨道外面还有一颗行星？</div>
</div>
<div class="stack divider-l" v-click="2">
<div class="figure">
<NeptuneDiscoverySvg :step="$clicks - 2" />
</div>
</div>
</div>

<div class="summary-line" v-click="3">亚当斯和勒维耶相信这颗未知行星存在，各自独立地用万有引力定律算出了它的轨道。</div>

<div class="key" v-click="4">1846 年 9 月 23 日晚，伽勒在勒维耶<b>预言的位置</b>附近发现了它——海王星，人们称它为"<b>笔尖下发现的行星</b>"。</div>
</div>

---
layout: base-flex
clicks: 4
---

# 预言哈雷彗星回归

<div class="page-grow pg-tight">
<div class="ask">彗星来无影、去无踪，能预言它什么时候再回来吗？</div>

<div class="half-grid">
<div class="stack" v-click="1">
<div class="summary-line">哈雷从 1337—1698 年的彗星记录里挑出 24 颗，依据万有引力定律，用一年时间算出了它们的轨道。</div>
</div>
<div class="stack divider-l" v-click="2">
<div class="figure">
<HalleyOrbitSvg :step="$clicks - 2" />
</div>
</div>
</div>

<div class="summary-line" v-click="3">1531、1607、1682 三次的轨道如出一辙——同一颗彗星，周期约 76 年。</div>

<div class="key" v-click="4">哈雷预言它将在 1758 年底或 1759 年初回归；1759 年 3 月，这颗彗星如期通过近日点。它最近一次回归是 1986 年，下次回归在 2061 年前后。</div>
</div>

---
layout: base-flex
clicks: 1
---

# 课堂小结

<div class="page-grow">
<div class="three-col">
<div class="stack">
<div class="mini-title"><mdi-earth />"称量"地球的质量</div>
<Latex tex="m_{\text{地}} = \frac{gR^2}{G}" display />
<div class="mini-note">不计自转时，重力等于地球的万有引力</div>
</div>
<div class="stack">
<div class="mini-title"><mdi-orbit />计算天体的质量</div>
<Latex tex="M = \frac{4\pi^2 r^3}{G T^2}" display />
<div class="mini-note">测环绕天体的 <Latex tex="r" />、<Latex tex="T" />，只算得出中心天体</div>
</div>
<div class="stack">
<div class="mini-title"><mdi-telescope />预言未知天体</div>
<div class="summary-line">海王星（1846 年）</div>
<div class="summary-line">哈雷彗星按时回归</div>
</div>
</div>

<div class="key key-lead" v-click="1">万有引力定律的成就在于：<b>解释已知</b>——把从未上过秤的地球"称"了出来；<b>预言未知</b>——先算出位置，再找到海王星、等到彗星按时回家。</div>
</div>
