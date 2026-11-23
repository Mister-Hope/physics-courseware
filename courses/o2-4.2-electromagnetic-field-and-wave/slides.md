---
theme: default
title: "电磁场与电磁波"
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
chapter-no: "4.2"
chapter: "第四章 电磁振荡与电磁波"
---

<!-- 封面装饰：E 在竖直平面内振动、B 在水平面内振动，二者都与传播方向垂直 -->
<CoverDecorationSvg />

---
title: 电磁波是怎样产生的？
clicks: 2
---

<div class="page-grow">
<div class="em-hook">电磁振荡电路中的能量，有一部分以电磁波的形式辐射到周围空间。这些电磁波是怎样产生的？</div>
<div class="em-hook" v-click="1">振荡电路中，电容器极板间的电场、线圈中的磁场都在周期性变化——这些变化只发生在电路内部吗？</div>
<div class="info-hint" v-click="2">麦克斯韦从“场”的观点出发：电磁场可以脱离导线，在空间中传播出去。</div>
</div>

---
title: 变化的磁场产生电场
clicks: 3
---

# 变化的磁场产生电场

<div class="page-grow">
<div class="ask">闭合电路中的感应电流，是什么力推动自由电荷定向移动的？</div>
<div class="half-grid em-row-fig">
<div class="figure"><EmFieldInductionSvg :step="$clicks" /></div>
<div class="stack">
<div v-click="1">麦克斯韦从场的观点看：<span class="em-b">变化的磁场</span>在空间产生了<span class="em-e">电场</span>，正是这个电场推动自由电荷，形成感应电流。</div>
<div v-click="2">把这一结论推广到<span class="em-b">不存在闭合电路</span>的情形：即使没有导线，变化磁场周围的电场同样存在。</div>
<div v-click="3" class="tip-hint">变化的磁场产生电场——这是普遍规律，与闭合电路是否存在无关。</div>
</div>
</div>
</div>

---
title: 变化的电场产生磁场
clicks: 3
---

# 变化的电场产生磁场

<div class="page-grow">
<div class="ask">电容器充电、放电时，两极板之间没有导线。极板间变化的电场也会产生磁场吗？</div>
<div class="half-grid">
<div class="figure"><ChargingCapacitorFieldSvg :step="$clicks" /></div>
<div class="stack">
<div v-click="1">麦克斯韦假设：<span class="em-e">变化的电场</span>就像运动的电荷，也会在空间产生<span class="em-b">磁场</span>。</div>
<div v-click="2">电容器充、放电时，不仅导线中的电流产生磁场，极板间周期性变化的电场也在产生磁场。</div>
<div v-click="3" class="warn-hint">这个假设当时没有直接的实验基础，却更具创造性——正是这两条观点，使麦克斯韦预见了电磁波。</div>
</div>
</div>
</div>

---
title: 电磁场
clicks: 1
---

# 电磁场

<div class="page-grow">
<div class="em-laws">
<div class="em-law-row"><span class="em-b">变化的磁场</span><span class="em-produce">产生</span><span class="em-e">电场</span></div>
<div class="em-law-row"><span class="em-e">变化的电场</span><span class="em-produce">产生</span><span class="em-b">磁场</span></div>
</div>
<DefinitionBox term="电磁场" v-click="1">
<div>变化的电场和磁场总是<span class="def-term">相互联系</span>的，形成一个不可分割的、<span class="def-term">统一的电磁场</span>。</div>
<div>如果在空间某区域有周期性变化的电场，就会在周围引起变化的磁场；变化的电场和磁场又会在较远的空间引起新的变化的电场和磁场。</div>
</DefinitionBox>
</div>
