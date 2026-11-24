---
theme: default
title: "液体"
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: course-cover
colorSchema: dark
clickAnimation: card
subtitle: "表面为什么像一层绷紧的膜"
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
chapter-no: "2.5"
chapter: "第二章 气体、固体和液体"
---

<CoverDecorationSvg />

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">在装满水的杯子里一枚一枚放入曲别针，水面鼓起却不溢出；<br />水黾能停在水面上，叶面上的露珠总是接近球形。</div>
<div v-click="1" class="mini-title">这些现象说明：液体的表面具有与内部不同的性质。</div>
<div v-click="2" class="ask">液体表面为什么会有“绷紧”的效果？</div>
</div>

---
clicks: 3
---

# 液体的表面具有收缩的趋势

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0,1.15fr) minmax(0,1fr); align-items: center">
<div style="width:100%"><MembraneSvg :stage="$clicks" /></div>
<div class="stack">
<div class="step-line" v-click="1">刺破棉线一侧的薄膜，另一侧的膜立刻收缩，把棉线拉向自己一侧。</div>
<div class="step-line" v-click="2">把棉线圈系在铁丝环上，膜上的线圈仍是松弛的。</div>
<div class="step-line" v-click="3">刺破线圈内的薄膜，线圈外的膜收缩，把线圈拉成一个圆。</div>
</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">为什么液体的表面有收缩的趋势？</div>
<div class="half-grid" style="grid-template-columns: minmax(0,1.15fr) minmax(0,1fr); align-items: center">
<div style="width:100%"><SurfaceLayerSvg :show-r="$clicks >= 1" /></div>
<div class="stack">
<div class="step-line" v-click="1">液体内部：分子间平均距离略小于 <Latex tex="r_0" />，作用力表现为斥力。</div>
<div class="step-line" v-click="2">表面层：分子比较稀疏，分子间距离略大于 <Latex tex="r_0" />，作用力表现为引力。</div>
<div class="step-line" v-click="3">表面层分子间的引力使液面像一张绷紧的膜。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 表面张力

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0,1.1fr) minmax(0,1fr); align-items: center">
<div style="width:100%"><SurfaceLayerSvg mode="tension" /></div>
<div class="stack">
<div class="step-line" v-click="1">沿液面画一条分界线 <Latex tex="MN" />，两侧液体之间存在一对与 <Latex tex="MN" /> 垂直、大小相等、方向相反的作用力。</div>
<div class="step-line" v-click="2"><Latex tex="MN" /> 是任意画的，所以液面内各个方向都存在这种力：方向总跟液面相切，且与分界线垂直。</div>
<div class="step-line" v-click="3">这种使液体表面绷紧的力，叫液体的<strong>表面张力</strong>。</div>
</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">用表面张力解释这三个现象。</div>
<div class="three-col" style="align-items: start">
<div class="stack-tight" v-click="1">
<div class="mini-title">曲别针停在水面</div>
<div class="step-line">水面像一层绷紧的膜，托住了曲别针。</div>
</div>
<div class="stack-tight" v-click="2">
<div class="mini-title">玻璃管裂口烧熔</div>
<div class="step-line">玻璃熔化成液体，表面张力使液面收缩，尖端变钝、变圆。</div>
</div>
<div class="stack-tight" v-click="3">
<div class="mini-title">水黾停在水面</div>
<div class="step-line">水黾的腿把水面压出小凹坑，液面有收缩趋势，把它托住。</div>
</div>
</div>
<div v-click="3" class="tip-hint">表面张力总是使液体的表面积趋于最小。</div>
</div>

---
clicks: 3
---

# 浸润和不浸润

<div class="page-grow">
<div class="half-grid" style="grid-template-columns: minmax(0,1.25fr) minmax(0,1fr); align-items: center">
<div style="width:100%"><WettingSvg /></div>
<div class="stack">
<div class="step-line" v-click="1">水在洁净玻璃板上散开并附着在玻璃上——水<strong>浸润</strong>玻璃。</div>
<div class="step-line" v-click="2">水在涂蜡玻璃板上滚来滚去、不能附着——水<strong>不浸润</strong>蜡。</div>
<div class="step-line" v-click="3">一种液体是否浸润某种固体，与这两种物质的性质都有关系：水银不浸润玻璃，却浸润铅。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 哪种作用更强

<div class="page-grow">
<div class="ask">液体和固体接触时，为什么有时浸润、有时不浸润？</div>
<div class="stack">
<div class="step-line" v-click="1">液体与固体接触的薄层里，液体分子同时受到两种作用：<strong>附着力</strong>——固体分子对液体分子的引力；<strong>内聚力</strong>——液体分子之间的引力。</div>
<div class="step-line" v-click="2" style="font-size:1.24rem; font-weight:700">附着力 &gt; 内聚力：液体能够浸润固体。</div>
<div class="step-line" v-click="3" style="font-size:1.24rem; font-weight:700">附着力 &lt; 内聚力：液体不浸润固体。</div>
</div>
<div v-click="3" class="warn-hint">同一种液体，对不同的固体可能浸润，也可能不浸润。</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">浸润的液体和不浸润的液体，放在玻璃管中，液面形状一样吗？</div>
<div class="half-grid" style="grid-template-columns: minmax(0,1.15fr) minmax(0,1fr); align-items: center">
<div style="width:100%"><WettingSvg mode="meniscus" /></div>
<div class="stack">
<div class="step-line" v-click="1">浸润：液面与管壁接触处向上弯，沿管壁上升。</div>
<div class="step-line" v-click="2">不浸润：液面与管壁接触处向下弯，沿管壁下降。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 毛细现象

<div class="page-grow">
<div class="ask">把内径不同的细管插入水中，管内液面会怎样变化？</div>
<div class="half-grid" style="grid-template-columns: minmax(0,1.25fr) minmax(0,1fr); align-items: center">
<div style="width:100%"><CapillarySvg /></div>
<div class="stack-tight">
<div class="step-line" v-click="1">洁净细玻璃管插入水中：管内液面比水面高，而且上升得更高。</div>
<div class="step-line" v-click="2">塑料笔芯插入水中：管内液面比水面低，下降得更明显。</div>
<div class="step-line" v-click="3">浸润液体在细管中上升、不浸润液体在细管中下降的现象，叫<strong>毛细现象</strong>。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 毛细现象的原因

<div class="page-grow">
<div class="ask">液面为什么会上升，又为什么停在一定高度？</div>
<div class="stack">
<div class="step-line" v-click="1">液体浸润管壁，管内液面弯曲；表面张力沿管壁方向形成向上的拉力。</div>
<div class="step-line" v-click="2">这个拉力使管中的液体向上运动，液体所受重力随上升高度增大。</div>
<div class="step-line" v-click="3">当向上的表面张力与重力平衡时，液面稳定在一定的高度。</div>
</div>
<div v-click="3" class="tip-hint">管的内径越小，液面弯曲得越厉害，上升（下降）得越明显。</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">土壤里有许多细小的孔道，它们能起什么作用？</div>
<div class="stack">
<div class="step-line" v-click="1">这些孔道相当于毛细管，地下的水分能沿着它们上升到地面。</div>
<div class="step-line" v-click="2">要把地下的水分锄松土壤——破坏土壤里的毛细管，减少水分跑掉；想把地下的水分引上来，就用磙子压紧土壤，使毛细管变细。</div>
</div>
</div>

---
clicks: 3
---

# 液晶

<div class="page-grow">
<div class="ask">“液体”和“晶体”为什么能联系在一起？</div>
<div class="stack">
<div class="step-line" v-click="1">构成液晶的分子大多为棒状，棒长是棒直径的 5 倍以上。</div>
<div class="step-line" v-click="2">这种长棒状分子在没有外界干扰时，趋向于相互平行排列。</div>
<div class="step-line" v-click="3">液晶是介于固态和液态之间的一种物质状态：既具有液体的流动性，又在一定程度上具有晶体分子的规则排列。</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">温度变化时，液晶分子的排列怎样变化？</div>
<div class="half-grid" style="grid-template-columns: minmax(0,1.35fr) minmax(0,1fr); align-items: center">
<div style="width:100%"><LiquidCrystalSvg /></div>
<div class="stack-tight">
<div class="step-line" v-click="1">低温时凝固成结晶态：分子取向有序，分子重心位置也有序。</div>
<div class="step-line" v-click="2">温度升高，分子热运动增强：重心位置的有序性消失，转为液晶态，取向有序程度下降。</div>
<div class="step-line" v-click="3">温度再升高，取向的有序性也消失，完全进入无序状态，变成液态。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 液晶的光学各向异性

<div class="page-grow">
<div class="stack">
<div class="step-line" v-click="1">分子取向排列的液晶具有光学各向异性：沿分子长轴方向的折射率，不同于沿短轴方向的折射率。</div>
<div class="step-line" v-click="2">入射光的偏振方向与液晶分子长轴成不同夹角时，液晶对光的折射率不同。</div>
<div class="step-line" v-click="3">一束非偏振光射入液晶层再射出，会产生两束光程不同的光；两束光叠加，在显微镜下可以观察到某种色光。</div>
</div>
<div v-click="3" class="info-hint">液晶的这一性质，是液晶显示器的物理基础。</div>
</div>

---
clicks: 3
---

# 液晶显示与应用

<div class="page-grow">
<div class="stack">
<div class="step-line" v-click="1">TN 模式：液晶分子连续扭曲排列，具有旋光性——光的偏振方向沿液晶排列方向旋转。</div>
<div class="step-line" v-click="2">不加电场：光通过液晶后偏振方向转过 90°，与下方偏振片的透光轴平行，呈亮态；加电场：分子竖起、旋光消失，光被截止，呈暗态。</div>
<div class="step-line" v-click="3">液晶显示器轻便、节能，只需低于 <Latex tex="5\ \text{V}" /> 的低压驱动，广泛用于手机、平板电视等设备。</div>
<div class="step-line" v-click="3">液晶研究也用于生命科学：生物膜、脑与视网膜等组织中都能找到液晶结构。</div>
</div>
</div>

---
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">用这节课的规律，解释两个生活问题。</div>
<div class="half-grid" style="grid-template-columns: minmax(0,1fr) minmax(0,1fr); align-items: start">
<div class="stack-tight">
<div class="mini-title">沾在衣料上的蜡迹</div>
<div class="step-line" v-click="1">把棉纸放在蜡迹上方和下方，用热熨斗烫熨：蜡受热熔化，液态蜡浸润棉纸并被吸收，蜡迹从衣料转移到棉纸上。</div>
</div>
<div class="stack-tight">
<div class="mini-title">酱油瓶口总留下痕迹</div>
<div class="step-line" v-click="2">选一种酱油不浸润的材料做瓶口：酱油不附着在瓶口上，倒完就流回去，不会渗入瓶口材料。</div>
</div>
</div>
<div v-click="3" class="tip-hint">浸润与不浸润，决定液体能不能附着在固体上。</div>
</div>

---

<div class="page-grow">
<div class="mini-title">本节的规律</div>
<div class="stack">
<div class="summary-line"><span class="key-lead">表面张力</span>　使液体表面绷紧、表面积趋于最小。</div>
<div class="summary-line"><span class="key-lead">浸润与不浸润</span>　由附着力与内聚力的强弱决定，液面出现向上或向下的弯曲。</div>
<div class="summary-line"><span class="key-lead">毛细现象</span>　浸润液体在细管中上升、不浸润液体在细管中下降，管径越小越明显。</div>
<div class="summary-line"><span class="key-lead">液晶</span>　兼有液体的流动性和晶体分子的规则排列，具有光学各向异性。</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">表面张力、浸润和毛细现象，本质上都是分子间作用力的宏观表现。</div>
<div v-click="1" class="mini-title">改变物体的内能有哪些方式？</div>
<div v-click="2" class="tip-hint">第三章 热力学定律</div>
</div>
