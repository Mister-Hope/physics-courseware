---
theme: default
title: "能源与可持续发展"
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
chapter-no: "12.4"
chapter: "第十二章 电能 能量守恒定律"
---

<CoverDecorationSvg />

---
layout: base-flex
---

<div class="page-grow">

<div class="ask ask-lead">

能量既不会凭空产生，也不会凭空消失，那我们为什么还要节约能源？

</div>

<v-click>

<div class="figure">

<EnergyChainSvg />

</div>

</v-click>

<v-click>

<div>电源把其他形式的能转化为电能，负载又把电能转化为内能、光能和机械能——每一步都遵守能量守恒定律。</div>

</v-click>

</div>

---
layout: base-flex
---

# 能量守恒定律

<div class="page-grow">

<div class="ask">

九年级学过——能量守恒定律讲了什么？

</div>

<v-click>

<div class="card card-highlight">

能量既不会凭空产生，也不会凭空消失，它只能从一种形式<span class="text-accent">转化</span>为其他形式，或者从一个物体<span class="text-accent">转移</span>到别的物体；在转化或转移的过程中，能量的总量保持不变。

</div>

</v-click>

<v-click>

<div class="half-grid">

<div class="stack">

<div class="mini-title"><mdi-swap-horizontal class="text-xl" /> 转化</div>

<div>一种形式的能变成另一种形式：燃料的化学能 → 内能 → 机械能 → 电能。</div>

</div>

<div class="stack divider-l">

<div class="mini-title"><mdi-transfer-right class="text-xl" /> 转移</div>

<div>能量从一个物体到另一个物体：热量从高温物体传给低温物体。</div>

</div>

</div>

</v-click>

</div>

---
layout: base-flex
clicks: 1
---

<div class="page-grow">

<div class="ask ask-lead">

刚煮好的热鸡蛋放进冷水里，最后水和鸡蛋温度相同。相反的过程可能发生吗——水自发地降温、鸡蛋重新变热？

</div>

<div class="figure">

<HeatEggSvg :show-reverse="$clicks >= 1" />

</div>

<div v-click="1" class="key key-lead">

这个过程并不违反能量守恒定律——它只是不会自发发生。

</div>

</div>

---
layout: base-flex
---

# 能量转移或转化的方向性

<div class="page-grow">

<v-click>

<div class="key key-lead">一切与热现象有关的宏观自然过程都是不可逆的。</div>

</v-click>

<v-click>

<div class="stack">

<div><span class="text-accent">热传递</span>：热量只能自发地从高温物体传到低温物体，不会自发地反向传递。</div>

<div><span class="text-accent">燃料燃烧</span>：热量一旦释放出去，就不会再次自动聚集起来供人类重新利用。</div>

<div><span class="text-accent">灯泡发光</span>：光被周围物质吸收后变成环境的内能，不会自动变回电能。</div>

</div>

</v-click>

</div>

---
layout: base-flex
clicks: 3
---

# 能量的耗散

<div class="page-grow">

<div class="figure">

<DissipateSvg :step="$clicks" />

</div>

<div v-click="3">

<div class="card">

电池中的化学能转化为电能，电能又通过灯泡转化为内能和光能；热和光被其他物质吸收后变成周围环境的内能，很难再收集起来重新利用。这种现象叫作<span class="text-accent">能量的耗散</span>。

</div>

</div>

</div>

---
layout: base-flex
---

<div class="page-grow" style="--page-gap: 1.8rem">

<div class="ask ask-lead">

能量一个也没少，那我们节约的到底是什么？

</div>

<v-click>

<div class="text-lg">

在能源的利用过程中，能量在数量上虽未减少，但在可利用的<span class="text-accent">品质</span>上降低了——从便于利用的能源变成不便于利用的能源。

</div>

</v-click>

<v-click>

<div class="key key-lead">这就是自然界的能量虽然守恒、我们却仍要节约能源的根本原因。</div>

</v-click>

</div>

---
layout: base-flex
---

# 熵增：能量耗散的方向

<div class="page-grow" style="--page-gap: 0.75rem">

<div class="flex"><div class="tag-icon"><mdi-flask-outline /> 扩展内容 · 不作考点</div></div>

<div><span class="text-accent">熵</span> <Latex tex="S" />：描述一个系统无序（混乱）程度的物理量。</div>

<v-click>

<div>

在孤立系统中，一切自然发生的宏观过程总是朝着<span class="text-accent">熵增加</span>的方向进行——这就是熵增原理。

</div>

</v-click>

<v-click>

<div>

能量的耗散就是一种熵增过程：能量还在，却变得越来越分散、越来越无序，也就越来越难被利用。

</div>

</v-click>

<v-click>

<div class="key">房间不打扫会越来越乱，乱了的房间不会自己变整齐——自然过程总是朝着无序程度更大的方向走。</div>

</v-click>

</div>

---
layout: base-flex
---

# 能源的分类

<div class="page-grow">

<div class="half-grid">

<div class="stack">

<div class="mini-title"><mdi-fire class="text-xl" /> 不可再生能源</div>

<div>煤炭、石油和天然气是目前人类生产、生活中使用的主要能源，也叫作<span class="text-accent">化石能源</span>；它们无法在短时间内再生。</div>

</div>

<div class="stack divider-l">

<div class="mini-title"><mdi-weather-windy class="text-xl" /> 可再生能源</div>

<div>水能和风能等能源，归根结底来源于太阳能，在自然界可以再生。</div>

</div>

</div>

<v-click>

<div class="key">分类的依据：能不能在短时间内从自然界得到补充。</div>

</v-click>

</div>

---
layout: base-flex
---

# 清洁能源与非清洁能源

<div class="page-grow">

<div class="mini-title"><mdi-recycle class="text-xl" /> 清洁能源</div>

<div>在生产及消费过程中对生态环境的污染程度低的能源，叫作清洁能源。</div>

<div class="half-grid">

<div class="stack">

<div>属于清洁能源：水能、风能、太阳能，以及天然气、清洁煤、核能</div>

</div>

<div class="stack divider-l">

<div>不属于清洁能源：煤炭、石油，燃烧产生 <Latex tex="\text{CO}_2" />、<Latex tex="\text{SO}_2" />、氮的氧化物和浮尘</div>

</div>

</div>

<v-click>

<div class="key key-danger">

核能：铀矿无法在短时间内再生，属于<span class="text-accent">不可再生能源</span>；发电过程对生态环境的污染程度低，又是<span class="text-accent">清洁能源</span>。

</div>

</v-click>

</div>

---
layout: base-flex
---

# 我国的能源成就

<div class="page-grow">

<div class="half-grid">

<div class="stack">

<div class="mini-title"><mdi-white-balance-sunny class="text-xl" /> 太阳能发电</div>

<div>我国是最大的光伏产品制造国；2015 年底太阳能光伏发电累计并网容量达 <Latex tex="4.158\times10^{7}\ \text{kW}" />。</div>

</div>

<div class="stack">

<div class="mini-title"><mdi-water class="text-xl" /> 水力发电</div>

<div>水电装机总量突破 <Latex tex="3\times10^{8}\ \text{kW}" />，约占全球的 <Latex tex="\frac{1}{4}" />，居世界第一。</div>

</div>

<div class="stack">

<div class="mini-title"><mdi-weather-windy class="text-xl" /> 风能发电</div>

<div>风车田遍布西北、华北、华东、西南地区，装机容量居全球第一。</div>

</div>

<div class="stack">

<div class="mini-title"><mdi-atom class="text-xl" /> 核能发电</div>

<div>“华龙一号”具有完全自主知识产权，安全指标达到国际第三代核电技术水平。</div>

</div>

</div>

</div>

---
layout: base-flex
---

# 能源与社会发展

<div class="page-grow">

<div class="ask">

人类对能源的利用，经历了哪几个时期？

</div>

<v-click>

<div class="figure">

<HistoryTimelineSvg />

</div>

</v-click>

<v-click>

<div class="key">能源科技的每一次突破，都带来了生产力的巨大飞跃和社会的进步。</div>

</v-click>

</div>

---
layout: base-flex
---

# 化石能源的困境

<div class="page-grow">

<v-click>

<div>煤炭和石油资源是<span class="text-accent">有限</span>的：化石能源无法在短时间内再生，人类的消耗速度远远超过它的形成速度。</div>

</v-click>

<v-click>

<div class="three-col">

<div class="stack">

<div class="mini-title"><mdi-thermometer class="text-xl" /> 温室效应</div>

<div>燃烧增加大气中 <Latex tex="\text{CO}_2" /> 的含量，加剧温室效应，使两极冰雪融化、海平面上升。</div>

</div>

<div class="stack">

<div class="mini-title"><mdi-water class="text-xl" /> 酸雨</div>

<div>石油和煤炭中常含硫，燃烧生成的 <Latex tex="\text{SO}_2" /> 使雨水酸度升高，腐蚀建筑物、酸化土壤。</div>

</div>

<div class="stack">

<div class="mini-title"><mdi-smog class="text-xl" /> 光化学烟雾</div>

<div>氮的氧化物和碳氢化合物受紫外线照射产生二次污染物，有毒、会引发多种疾病。</div>

</div>

</div>

</v-click>

<v-click>

<div class="key">能源短缺和过度使用化石能源带来的环境恶化，已成为关系到人类社会能否持续发展的大问题。</div>

</v-click>

</div>

---
layout: base-flex
---

# 可持续发展

<div class="page-grow">

<v-click>

<div class="key key-lead">核心是追求发展与资源、环境的平衡：既满足当代人的需求，又不损害子孙后代的需求。</div>

</v-click>

<v-click>

<div class="half-grid">

<div class="stack">

<div class="mini-title"><mdi-lightbulb-on-outline class="text-xl" /> 大力提倡节能</div>

<div>提高能源的利用率，减少不必要的消耗。</div>

</div>

<div class="stack divider-l">

<div class="mini-title"><mdi-leaf class="text-xl" /> 发展清洁能源</div>

<div>可再生能源，以及天然气、清洁煤和核能等清洁能源。</div>

</div>

</div>

</v-click>

<v-click>

<div>新能源多为<span class="text-accent">可再生能源</span>，且污染较小。</div>

</v-click>

<v-click>

<div>使用氢能源等新能源，努力实现<span class="text-accent">碳中和</span>，减少 <Latex tex="\text{CO}_2" /> 排放，避免全球气候变暖带来的灾难性升温。</div>

</v-click>

</div>

---
layout: base-flex
---

# 提高能源利用率

<div class="page-grow">

<div class="figure">

<CarEnergySvg />

</div>

<v-click>

<div class="key key-lead">提高能源利用率，就是在不增加消耗的前提下，得到更多真正可用的能量。</div>

</v-click>

</div>

---
layout: base-flex
clicks: 3
---

<div class="page-grow">

<div class="ask ask-lead">

多用核能、太阳能，就没有问题了吗？

</div>

<div v-click="1">

<div class="figure">

<HeatBalanceSvg :step="$clicks >= 2 ? 1 : 0" />

</div>

</div>

<div v-click="3">

<div class="key">

能源消耗产生的热最终都要靠地球向太空散掉；消耗过大、超出地球的散热能力，同样会使全球气温上升。所以任何能源都不能无限使用，<span class="text-accent">节能始终是第一位的</span>。

</div>

</div>

</div>

---
layout: base-flex
---

# 课堂小结

<div class="page-grow">

<v-clicks>

<div class="summary-line"><span class="text-accent">能量守恒</span>：能量在转化或转移的过程中，总量保持不变。</div>

<div class="summary-line"><span class="text-accent">方向性</span>：与热现象有关的宏观自然过程都是不可逆的；能量耗散使能量的品质降低，这是要节约能源的根本原因。</div>

<div class="summary-line"><span class="text-accent">能源分类</span>：可再生 / 不可再生、清洁 / 非清洁；核能既是不可再生能源，又是清洁能源。</div>

<div class="summary-line"><span class="text-accent">可持续发展</span>：提倡节能、发展清洁能源、提高能源利用率。</div>

</v-clicks>

</div>
