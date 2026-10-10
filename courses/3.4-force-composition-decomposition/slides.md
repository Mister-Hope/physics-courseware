---
theme: default
title: "力的合成和分解"
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
chapter-no: "3.4"
chapter: 第三章 相互作用——力
---

<CoverDecorationSvg />

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">一个静止的物体同时受到 5 个力作用，你能判断它将向哪个方向运动吗？</div>

<div class="eq-row" v-click="1">
<div class="eq-figure">
<ForceComponentsSvg />
<ChartLabel :x-percent="44" :y-percent="57" :parts="[{ tex: 'F_1' }]" anchor="left" :dx="-6" color="var(--c-accent)"/>
<ChartLabel :x-percent="56" :y-percent="57" :parts="[{ tex: 'F_2' }]" anchor="right" :dx="6" color="var(--c-accent-2)"/>
</div>
<div class="eq-equal">=</div>
<div class="eq-figure">
<ForceResultantSvg />
<ChartLabel :x-percent="50" :y-percent="44" :parts="[{ tex: 'F' }]" anchor="left" :dx="12" color="var(--c-physics)"/>
</div>
</div>

<div class="key" v-click="2">几个力共同作用的效果，如果跟一个力单独作用的效果相同，就可以用这一个力替代那几个力——这就是<b>等效替代</b>。</div>
</div>

---
clicks: 2
---

# 合力与分力

<div class="page-grow">
<div class="ask">提水桶的 <Latex tex="F" /> 与 <Latex tex="F_1" />、<Latex tex="F_2" /> 之间是什么关系？</div>

<div class="card" v-click="1">
<div><b>合力</b>（resultant force）：一个力单独作用的效果，跟某几个力共同作用的效果相同，这个力就叫作那几个力的合力。</div>
<div><b>分力</b>（component force）：几个力共同作用的效果，跟某个力单独作用的效果相同，这几个力就叫作那个力的分力。</div>
</div>

<div class="key" v-click="2">等效替代：<Latex tex="F" /> 单独作用 <b>＝</b> <Latex tex="F_1" />、<Latex tex="F_2" /> 共同作用。合力与分力不是物体同时受到的力。</div>
</div>

---
clicks: 3
---

# 力的合成和分解

<div class="page-grow">
<div class="ask">把几个力"合起来"、把一个力"分下去"，分别叫什么？</div>

<div class="half-grid" v-click="1">
<div class="stack">
<div class="mini-title">力的合成</div>
<div>求几个力的合力的过程</div>
</div>
<div class="stack divider-l">
<div class="mini-title">力的分解</div>
<div>求一个力的分力的过程</div>
</div>
</div>

<div class="card" v-click="2"><b>共点力</b>：几个力都作用在物体的同一点，或者它们的作用线相交于一点。</div>

<div class="key" v-click="3">合成与分解都建立在"等效替代"上；它们遵从什么法则？用实验来探究。</div>
</div>

---
clicks: 5
---

# 实验：探究两个互成角度的力的合成规律

<div class="page-grow page-grow-tight">
<div class="ask">两次实验，为什么必须把圆环拉到同一个位置 <Latex tex="O" />？</div>

<div class="p5-grid">
<div class="p5-figure">
<PullEquivalence :start-at="3" />
</div>

<div class="stack">
<div class="key" v-click="1">位置相同 ⟹ 橡皮条伸长相同、对结点的拉力相同；结点都静止 ⟹ 绳的拉力"合起来"与它平衡 ⟹ 两个力共同作用的效果 = 一个力单独作用的效果（<b>等效替代</b>）。</div>

<div class="stack-dense" v-click="2">
<div class="mini-title">实验怎么做</div>
<div>① 两个测力计把结点拉到 <Latex tex="O" />，描出 <Latex tex="F_1" />、<Latex tex="F_2" /> 两个力</div>
<div>② 一个测力计还是拉到 <Latex tex="O" />，描出这唯一的一个力 <Latex tex="F" /></div>
<div>③ 作平行四边形，看对角线是不是 <Latex tex="F" /></div>
</div>
</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">三只弹簧测力计也能做这个实验，为什么不用？</div>

<div class="stack" v-click="1">
<div class="mini-title"><mdi-close-circle-outline class="ico-bad" /> 三只测力计：稳不住</div>
<div>三只测力计要同时把结点拉到同一点、还要都保持静止，可人只有两只手，很难同时稳住三只；只要有一只晃一下，"共点、静止"就不成立，读数跟着变。</div>

<div class="mini-title"><mdi-check-circle-outline class="ico-good" /> 橡皮条 + 两只测力计：稳</div>
<div>橡皮条一端固定在木板上，结点只需两只手各拉一只测力计；两次实验分别达到同一位置，稳定、可重复。</div>
</div>

<div class="key" v-click="2">装置先要稳，读数才可信。</div>
</div>

---
clicks: 4
---

# 实验注意事项

<div class="page-grow">
<div class="ask">哪些操作一旦做错，实验就得不到正确结论？</div>

<div class="stack-dense" v-click="1">
<div class="mini-title"><mdi-numeric-1-circle-outline /> 同一组数据里，两次都要把圆环拉到同一位置 <Latex tex="O" /></div>
<div class="mini-note">注意：不是说"这一个力就是那两个力的合力"，而是用<b>一个力等效替代两个力</b>。位置差一点，橡皮条的伸长量就不同，等效关系就不成立了；每组数据都要重新记录结点位置。</div>
</div>

<div class="stack-dense" v-click="2">
<div class="mini-title"><mdi-numeric-2-circle-outline /> 弹簧测力计使用前校零</div>
<div class="mini-note">读数时视线正对刻度，不要斜视。</div>
</div>

<div class="stack-dense" v-click="3">
<div class="mini-title"><mdi-numeric-3-circle-outline /> 两个拉力的夹角不要过大或过小</div>
<div class="mini-note">以 <Latex tex="60^\circ" />–<Latex tex="120^\circ" /> 为宜，过大或过小都会影响验证结果。</div>
</div>

<div class="key" v-click="4">这三条都关系到"等效"是否成立——实验结论完全建立在等效控制上。</div>
</div>

---
clicks: 3
---

# 弹簧测力计的调零与校验

<div class="page-grow">
<div class="stack" v-click="1">
<div class="mini-title">为什么必须调零</div>
<div>测力计的"零"是弹簧自己定的：<b>弹簧和挂钩有自重</b>——竖直提起时它沿弹簧方向把弹簧拉长一点，水平放置时又不沿弹簧方向，<b>不调零，指针不可能在两种方向下同时指零</b>。换方向就要重新调零，读数时视线正对刻度。</div>
</div>

<div class="stack" v-click="2">
<div class="mini-title">使用前还要互相校验</div>
<div>两只测力计对拉，或者挂同一个重物，看示数是否相同——示数不一样的两只，实验里不能配对使用。</div>
</div>

<div class="key" v-click="3">调零管"起点"，校验管"两只测力计是不是同一把尺子"。</div>
</div>

---
clicks: 4
---

# 误差分析

<div class="page-grow">
<div class="ask">以下几种情况会对实验结果产生误差吗？</div>

<div class="stack" v-click="1">
<div class="mini-title">① 测力计外壳与纸面摩擦<span class="verdict verdict-good" v-click="2"><mdi-check-circle-outline /> 没有影响</span></div>
<div class="mini-note" v-click="2">它不改变弹簧的伸长量，读数照样是真实的。</div>
</div>

<div class="stack" v-click="1">
<div class="mini-title">② 测力计外壳与内部弹簧摩擦<span class="verdict verdict-bad" v-click="3"><mdi-close-circle-outline /> 有影响</span></div>
<div class="mini-note" v-click="3">摩擦"吃掉"一部分拉力，弹簧伸长偏小、读数偏小，两个力的比值就失真了。</div>
</div>

<div class="stack" v-click="1">
<div class="mini-title">③ 不系绳结、细线直接穿过橡皮条<span class="verdict verdict-bad" v-click="4"><mdi-close-circle-outline /> 有影响</span></div>
<div class="mini-note" v-click="4">同一根细线两端的拉力必然相等，每次只能得到 <Latex tex="F_1 = F_2" /> 这一种情形；系上绳结，结处的摩擦才允许 <Latex tex="F_1 \ne F_2" />。</div>
</div>
</div>

---
clicks: 2
---

# 夹角的大小对实验的影响

<div class="page-grow page-grow-tight">
<div class="ask">两个力的夹角为什么不能太小，也不能太大？</div>

<div v-click="1">
<AngleErrorDemo />
</div>

<div class="key" v-click="2">夹角太小，平行四边形与"直接相加"的差别被读数误差淹没；夹角太大，合力很小、同样的误差被放大——所以以 <Latex tex="60^\circ" />–<Latex tex="120^\circ" /> 为宜。</div>
</div>

---
clicks: 4
---

# 平行四边形定则

<div class="page-grow">
<div class="ask">两个分力 <Latex tex="F_1" />、<Latex tex="F_2" /> 与它们的合力 <Latex tex="F" />，在图上是什么关系？</div>

<ForceParallelogram />
</div>

---
clicks: 2
---

# 三角形定则

<div class="page-grow">
<div class="half-grid" v-click="1">
<div class="sv-figure">
<TriangleRuleSvg />
<ChartLabel :x-percent="31" :y-percent="83" :parts="[{ tex: 'F_1' }]" anchor="bottom-right" color="var(--c-accent)"/>
<ChartLabel :x-percent="57" :y-percent="61" :parts="[{ tex: 'F_2' }]" anchor="left" :dx="8" color="var(--c-accent-2)"/>
<ChartLabel :x-percent="41" :y-percent="60" :parts="[{ tex: 'F' }]" anchor="bottom-left" :dy="12" color="var(--c-physics)" halo/>
</div>
<div class="sv-figure divider-l">
<ForcePolygonSvg />
<ChartLabel :x-percent="25" :y-percent="85" :parts="[{ tex: 'F_1' }]" anchor="bottom-left" color="var(--c-accent)"/>
<ChartLabel :x-percent="43" :y-percent="67" :parts="[{ tex: 'F_2' }]" anchor="top-left" :dx="-4" color="var(--c-accent-2)"/>
<ChartLabel :x-percent="64" :y-percent="41" :parts="[{ tex: 'F_3' }]" anchor="bottom-right" :dy="14" color="var(--c-accent)"/>
<ChartLabel :x-percent="46" :y-percent="59" :parts="[{ tex: 'F' }]" anchor="bottom-left" :dy="12" color="var(--c-physics)" halo/>
</div>
</div>

<div class="key" v-click="2">把力首尾相接：合力从第一个力的起点指向最后一个力的终点；两个力时，它与平行四边形定则的结果完全一致。</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">两个分力的大小不变，只改变夹角 <Latex tex="\theta" />，合力会怎样变化？</div>

<div v-click="1">
<TriangleRuleRotate />
</div>

<div class="key" v-click="2">把第二个力接在第一个力的末端、绕着它转动：两个力<b>同向</b>时合力最大，等于 <Latex tex="F_1 + F_2" />；<b>反向</b>时合力最小，等于 <Latex tex="|F_1 - F_2|" />。夹角越大，合力越小。</div>
</div>

---
clicks: 3
---

# 例题：用三角形法则求合力

<div class="page-grow">
<div class="problem">某物体受到一个大小为 <Latex tex="24\ \text{N}" />、方向水平向右的力，还受到另一个大小为 <Latex tex="7\ \text{N}" />、方向竖直向上的力。求这两个力的合力的大小和方向。</div>

<div class="ex-grid">
<div class="ex-figure" v-click="1">
<TriangleExampleSvg />
</div>
<div class="stack-dense" v-click="2">
<div class="mini-title">三角形法则</div>
<div>两个力首尾相接：把 <Latex tex="7\ \text{N}" /> 的力接在 <Latex tex="24\ \text{N}" /> 的力的末端</div>
<div>合力 <Latex tex="F" /> 从 <Latex tex="24\ \text{N}" /> 的力的起点指向 <Latex tex="7\ \text{N}" /> 的力的终点</div>
<div>两力互相垂直，得到一个直角三角形——两条直角边分别是 <Latex tex="24\ \text{N}" />、<Latex tex="7\ \text{N}" /></div>
</div>
</div>

<div class="key" v-click="3">直角三角形用勾股定理：<Latex tex="F = \sqrt{24^2 + 7^2}\ \text{N} = 25\ \text{N}" />；方向用正切值表示：<Latex tex="\tan\alpha = \dfrac{7}{24}" />（<Latex tex="\alpha" /> 是合力与 <Latex tex="24\ \text{N}" /> 的力之间的夹角）。</div>
</div>

---
clicks: 2
---

# 矢量和标量

<div class="page-grow">
<div class="ask">力、位移能直接相加吗？质量、路程呢？</div>

<div class="half-grid" v-click="1">
<div class="stack">
<div class="mini-title">矢量</div>
<div>既有大小又有方向，相加时遵从平行四边形定则</div>
<div class="text-accent">力、位移、速度、加速度</div>
</div>
<div class="stack divider-l">
<div class="mini-title">标量</div>
<div>只有大小，没有方向，相加时遵从算术法则</div>
<div class="text-accent-2">质量、路程、功、电流</div>
</div>
</div>

<div class="key" v-click="2">位移的合成也遵从平行四边形定则——从 <Latex tex="A" /> 到 <Latex tex="B" /> 再到 <Latex tex="C" />，合位移 <Latex tex="AC" /> 正是那个平行四边形的对角线。</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">合力和分力一定都是抽象出来的力吗？</div>

<div class="ic-grid" v-click="1">
<div><InclineContactForce /></div>

<div class="stack">
<div class="mini-title">真实的合力</div>
<div>斜面对物体的作用力，按性质分成支持力 <Latex tex="F_N" /> 与摩擦力 <Latex tex="F_f" />，按效果合成就是斜向的 <Latex tex="F" />。</div>

<div class="mini-title">抽象的分力</div>
<div>把重力 <Latex tex="G" /> 沿斜面、垂直斜面分解出的 <Latex tex="G_\parallel" />、<Latex tex="G_\perp" /> 却是抽象的：物体并没有受到它们。</div>
</div>
</div>

<div class="key" v-click="2">合力、分力既可以是抽象的力，也可以是真实的力——看它有没有落到物体实际受到的那个力上。</div>
</div>

---
clicks: 3
---

# 力的分解

<div class="page-grow">
<div class="ask">同一个力 <Latex tex="F" />，只能分解成唯一的一对吗？</div>

<div class="decomp-figure">
<ManyDecompositionsSvg />
<ChartLabel :x-percent="30" :y-percent="52" :parts="[{ tex: 'F' }]" anchor="top-left" :dx="-8" :dy="-6" color="var(--c-physics)" halo/>
<ChartLabel v-click="1" :x-percent="25" :y-percent="82" :parts="[{ tex: 'F_1' }]" anchor="bottom-right" :dy="-6" color="var(--c-accent)"/>
<ChartLabel v-click="1" :x-percent="13" :y-percent="48" :parts="[{ tex: 'F_2' }]" anchor="left" :dx="-8" color="var(--c-accent)"/>
<ChartLabel v-click="2" :x-percent="26" :y-percent="43" :parts="[{ tex: 'F_1^{\\prime}' }]" anchor="top-left" :dx="-6" color="var(--c-accent-2)"/>
<ChartLabel v-click="2" :x-percent="12" :y-percent="88" :parts="[{ tex: 'F_2^{\\prime}' }]" anchor="bottom-left" :dy="6" color="var(--c-accent-2)"/>
</div>

<div class="key" v-click="3">没有限制时，同一条对角线可以作出无数个平行四边形——<Latex tex="F" /> 可以分解成无数对大小、方向不同的分力，具体怎么分由要研究的问题决定。</div>
</div>

---
clicks: 2
---

# 斜面上的方向

<div class="page-grow page-grow-tight">
<div class="ask">斜面上的力，可以沿哪些方向分解？</div>

<div class="sd-grid">
<div v-click="1">
<SlopeDirectionsSvg />
</div>

<div class="stack">
<div class="key" v-click="2">两对互相垂直的方向：<b>水平—竖直</b>、<b>沿斜面—垂直斜面</b>，一共 8 个方向。重力就要沿"沿斜面向下"和"垂直斜面向下"分解。</div>

<div class="stack-dense" v-click="2">
<div><span class="sd-tag sd-tag-blue">水平—竖直</span>水平向右、水平向左、竖直向上、竖直向下</div>
<div><span class="sd-tag sd-tag-gold">沿斜面—垂直斜面</span>沿斜面向上、沿斜面向下、垂直斜面向上、垂直斜面向下</div>
</div>
</div>
</div>
</div>

---
clicks: 2
---

# 按效果分解重力

<div class="page-grow">
<div class="ask">斜面上的物体，重力 <Latex tex="G" /> 产生了哪两个效果？</div>

<div v-click="1">
<InclineDecomposition />
</div>

<div class="key" v-click="2">沿斜面向下的 <Latex tex="G_\parallel = G\sin\theta" /> 使物体下滑，垂直斜面的 <Latex tex="G_\perp = G\cos\theta" /> 压紧斜面——分力仍然作用在物体上。</div>
</div>

---
clicks: 2
---

# 分力作用在谁身上

<div class="page-grow">
<div class="ask"><Latex tex="G_\perp" /> 的效果是"压紧斜面"，那它是不是"物体压斜面的力"？</div>

<div class="stack" v-click="1">
<div class="mini-title"><mdi-check-circle-outline class="ico-good" /> 对：<Latex tex="G_\parallel" />、<Latex tex="G_\perp" /> 都作用在物块上</div>
<div><Latex tex="G_\parallel" />、<Latex tex="G_\perp" /> 是重力分解出的分力，受力物体还是物块。</div>

<div class="mini-title"><mdi-close-circle-outline class="ico-bad" /> 错：把 <Latex tex="G_\perp" /> 说成"物体压斜面的力"</div>
<div>"物体压斜面的力"作用在<b>斜面</b>上，施力物体才是物块，它是斜面对物块支持力的反作用力——受力、施力对象都换了，和重力的分力不是同一个力。</div>
</div>

<div class="key" v-click="2">分解只是同一个力换一种说法：受力物体始终是原来那个物块，分力不能被"搬"到别的物体上。</div>
</div>

---
clicks: 2
---

# 正交分解法

<div class="page-grow">
<div class="ask">力不在坐标轴上时，怎么求它沿两个方向的作用？</div>

<div v-click="1">
<OrthogonalForce />
</div>

<div class="key" v-click="2">把力分解到互相垂直的两条坐标轴上：<Latex tex="F_x = F\cos\alpha" />、<Latex tex="F_y = F\sin\alpha" />；建系时让尽量多的力落在坐标轴上。</div>
</div>

---
clicks: 2
---

# 一般夹角：合力有多大

<div class="page-grow">
<div class="problem">两个力 <Latex tex="F_1" />、<Latex tex="F_2" /> 的夹角为 <Latex tex="\theta" />，它们的合力 <Latex tex="F" /> 有多大？</div>

<div class="gr-grid" v-click="1">
<div><GeneralResultantSvg /></div>

<div class="stack-dense">
<div>① 以 <Latex tex="F_1" /> 的方向为 x 轴，把 <Latex tex="F_2" /> 正交分解：<Latex tex="F_{2x} = F_2\cos\theta" />、<Latex tex="F_{2y} = F_2\sin\theta" /></div>
<div>② 沿 x、y 分别合成：<Latex tex="F_x = F_1 + F_2\cos\theta" />、<Latex tex="F_y = F_2\sin\theta" /></div>
<div>③ 这两个分量互相垂直，再用勾股合成：<Latex tex="F = \sqrt{F_x^2 + F_y^2}" /></div>
</div>
</div>

<div class="key" v-click="2">把平方展开：<Latex tex="F^2 = F_1^2 + 2F_1F_2\cos\theta + F_2^2(\cos^2\theta + \sin^2\theta)" />，就得到 <Latex tex="F = \sqrt{F_1^2 + F_2^2 + 2F_1F_2\cos\theta}" />。</div>
</div>

---
clicks: 6
---

# 力的分解有几种可能

<div class="page-grow page-grow-tight">
<div class="ask">已知条件不同，同一个合力 <Latex tex="F" /> 的分解结果还唯一吗？</div>

<DecompositionCases />

<div class="key" v-click="6">已知条件越少，解越多——不是每一种分解都能唯一确定。</div>
</div>

---
clicks: 2
---

# 已知一个分力的方向和另一个分力的大小

<div class="page-grow">
<div class="ask">已知 <Latex tex="F_1" /> 的方向和 <Latex tex="F_2" /> 的大小，一定能作出平行四边形吗？</div>

<div v-click="1">
<DecompositionCircle />
</div>

<div class="key" v-click="2"><Latex tex="F_2" /> 有最小值：<Latex tex="F_2 = F\sin\theta" />，此时它垂直于 <Latex tex="F_1" /> 的已知方向。</div>
</div>

---
clicks: 3
---

# 练习与应用

<div class="page-grow">
<div class="problem">两个力 <Latex tex="F_1" />、<Latex tex="F_2" /> 之间的夹角为 <Latex tex="\theta" />，合力为 <Latex tex="F" />。判断以下说法是否正确，并简述理由。</div>

<div class="qa-list">
<div class="qa-item">
<div class="qa-q">（1）合力 <Latex tex="F" /> 总比 <Latex tex="F_1" />、<Latex tex="F_2" /> 中的任何一个都大。</div>
<div class="qa-a" v-click="1">答：错。两个力反向时 <Latex tex="F = |F_1 - F_2|" />，可比任何一个分力都小。</div>
</div>

<div class="qa-item">
<div class="qa-q">（2）若 <Latex tex="F_1" />、<Latex tex="F_2" /> 的大小不变，<Latex tex="\theta" /> 角越小，合力 <Latex tex="F" /> 就越大。</div>
<div class="qa-a" v-click="2">答：对。夹角越小合力越大，两个力同向时最大。</div>
</div>

<div class="qa-item">
<div class="qa-q">（3）若夹角 <Latex tex="\theta" /> 不变、<Latex tex="F_1" /> 不变，<Latex tex="F_2" /> 增大，合力 <Latex tex="F" /> 一定增大。</div>
<div class="qa-a" v-click="3">答：错。<Latex tex="\theta" /> 为钝角且 <Latex tex="F_2" /> 较小时，<Latex tex="F_2" /> 增大合力反而减小。</div>
</div>
</div>
</div>

---

# 课堂小结

<div class="page-grow">
<div class="stack">
<div class="summary-line"><b>等效替代</b>：合力与分力的效果相同，二者不是物体同时受到的力。</div>
<div class="summary-line"><b>平行四边形定则</b>：以两力为邻边作平行四边形，对角线就是合力；三角形定则与它等价。</div>
<div class="summary-line"><b>计算</b>：互相垂直时 <Latex tex="F = \sqrt{F_1^2 + F_2^2}" />；一般情形 <Latex tex="F = \sqrt{F_1^2 + F_2^2 + 2F_1F_2\cos\theta}" />，范围 <Latex tex="|F_1 - F_2| \le F \le F_1 + F_2" />。</div>
<div class="summary-line"><b>正交分解</b>：<Latex tex="F_x = F\cos\alpha" />、<Latex tex="F_y = F\sin\alpha" />，建系时让尽量多的力落在坐标轴上。</div>
<div class="summary-line"><b>分解的多解性</b>：已知条件不同，解的个数不同；<Latex tex="F_2" /> 的最小值为 <Latex tex="F\sin\theta" />。</div>
</div>
</div>
