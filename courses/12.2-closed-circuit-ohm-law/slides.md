---
theme: default
title: "闭合电路的欧姆定律"
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
chapter-no: "12.2"
chapter: "第十二章 电能 能量守恒定律"
subtitle: "电动势 · 闭合电路的欧姆定律 · 路端电压"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 1
title: 引入：并联的灯为什么变暗
---

<div class="page-grow">

<div class="ask ask-lead">两个电路的电池相同，小灯泡的规格也相同。为什么乙中每盏灯都比甲中暗？</div>

<div class="figure" style="max-width: 760px; margin: 0 auto"><TwoLampCircuits /></div>

<div v-click="1" class="info-hint">灯的亮度由实际功率 <Latex tex="P = UI" /> 决定——甲、乙中电池两端的电压相同吗？</div>

</div>

---
layout: base-flex
clicks: 1
title: 闭合电路：外电路与内电路
---

<div class="page-grow" style="--page-gap: .5rem">

<div class="ask">电流从正极流出，经过外电路，再从哪里回到电源？整个回路由哪几部分组成？</div>

<div class="figure" style="max-width: 540px; margin: 0 auto"><ClosedCircuitSvg :show-zones="$clicks >= 1" /></div>

<div v-click="1"><DefinitionBox term="闭合电路" tone="gold"><div>由导线、电源和用电器连成的电路叫作<span class="def-term">闭合电路</span>：用电器和导线组成<span class="def-term">外电路</span>，电源内部是<span class="def-term">内电路</span>。</div></DefinitionBox></div>

</div>

---
layout: base-flex
clicks: 3
title: 电源内部的非静电力
---

<div class="page-grow">

<div class="ask">电路中只存在静电力，电流能维持吗？</div>

<div class="split-wide" style="--cols: minmax(0, 1.2fr) minmax(0, 1fr)">

<div class="figure"><NonElectricForceSvg :show-non-electric="$clicks >= 2" /></div>

<div class="stack">

<div v-click="1">电源内部：电场由正极指向负极，静电力阻碍正电荷向正极移动。</div>

<div v-click="2">只有静电力时，正、负极的电荷很快中和，电流不能维持；非静电力与静电力方向相反，把正电荷从负极搬到正极，电势能增加。</div>

<div v-click="3" class="tip-hint">电源是通过非静电力做功，把其他形式的能转化为电势能的装置。</div>

</div>

</div>

</div>

---
layout: base-flex
clicks: 4
title: 电动势
---

<div class="page-grow" style="--page-gap: .5rem">

<div class="ask">不同电源把其他形式的能转化为电势能的本领相同吗？怎样定量描述这种本领？</div>

<div class="flex items-center justify-center gap-8 text-lg" style="max-width: 720px; margin: 0 auto">
<span><mdi-battery class="icon-lg text-accent" /> 干电池</span>
<span><mdi-car-battery class="icon-lg text-accent-2" /> 蓄电池</span>
<span><mdi-engine class="icon-lg text-physics" /> 发电机</span>
</div>

<div v-click="1"><DefinitionBox term="电动势" tone="gold"><div>非静电力所做的功 <Latex tex="W" /> 与所移动的电荷量 <Latex tex="q" /> 之比，叫作<span class="def-term">电动势</span>：<Latex tex="E = \dfrac{W}{q}" />。</div></DefinitionBox></div>

<div class="half-grid">

<div v-click="2" class="stack-tight">
<div class="mini-title"><mdi-lightning-bolt class="icon-md" />数值意义</div>
<div>电动势在数值上等于非静电力把 <Latex tex="1\ \text{C}" /> 的正电荷在电源内从负极移送到正极所做的功。</div>
</div>

<div v-click="3" class="stack-tight divider-l">
<div class="mini-title"><mdi-battery class="icon-md" />决定因素</div>
<div>由电源中非静电力的特性决定，跟外电路无关；单位与电压相同，是 <Latex tex="\text{V}" />。</div>
</div>

</div>

<div v-click="4" class="info-hint">化学电池中，非静电力是化学作用；发电机中，非静电力是电磁作用——不同电源的电动势一般不同。</div>

</div>

---
layout: base-flex
clicks: 3
title: 电源的内阻
---

<div class="page-grow" style="--page-gap: .7rem">

<div class="ask">电源内部也有电阻吗？它对电路有什么影响？</div>

<div class="figure" style="max-width: 480px; margin: 0 auto"><InternalResistanceSvg /></div>

<div class="stack-tight">

<div v-click="1">通常电源内部也存在电阻，内电路的电阻叫内电阻，简称<strong>内阻</strong> <Latex tex="r" />。</div>

<div v-click="2">可以把电源看作一个没有电阻的理想电源与内阻 <Latex tex="r" /> 的串联。</div>

<div v-click="3" class="tip-hint">沿电流方向，内电路的电势也会降低：<Latex tex="U_{\text{内}} = Ir" />。</div>

</div>

</div>

---
layout: base-flex
clicks: 3
title: 闭合电路中的能量转化
---

<div class="page-grow" style="--page-gap: .5rem">

<div class="ask">电源转化的电能，与外电路、内电路产生的内能之间有什么关系？</div>

<div><Latex tex="t" /> 时间内，非静电力做功 <Latex tex="W = Eq = EIt" />，把其他形式的能转化为电能。</div>

<div>外电路中，电流做功，电能转化为内能：<Latex tex="Q_{\text{外}} = I^2Rt" />；内电路中同样有 <Latex tex="Q_{\text{内}} = I^2rt" />。</div>

<div v-click="1">根据能量守恒定律：<Latex tex="W = Q_{\text{外}} + Q_{\text{内}}" />，即 <Latex tex="EIt = I^2Rt + I^2rt" />。</div>

<div v-click="2" class="tip-hint">两边除以 <Latex tex="It" />，得到 <Latex tex="E = IR + Ir" />。</div>

<div v-click="3" class="info-hint"><Latex tex="EI" /> 是电源把其他形式的能转化为电能的功率，单位是 <Latex tex="\text{W}" />。</div>

</div>

---
layout: base-flex
clicks: 3
title: 闭合电路的欧姆定律
---

<div class="page-grow" style="--page-gap: .6rem">

<div class="ask">把 <Latex tex="E = IR + Ir" /> 改写成电流的形式，闭合电路的电流由什么决定？</div>

<div class="text-2xl text-center"><Latex tex="E = IR + Ir" /></div>

<div v-click="1"><DefinitionBox term="闭合电路的欧姆定律" tone="gold"><div><Latex tex="I = \dfrac{E}{R + r}" />：闭合电路的电流跟电源的电动势成正比，跟内、外电路的电阻之和成反比。</div></DefinitionBox></div>

<div v-click="2" class="stack-tight">
<div class="mini-title">内外电路的电势降落</div>
<div><Latex tex="E = U_{\text{外}} + U_{\text{内}}" />，其中 <Latex tex="U_{\text{外}} = IR" />、<Latex tex="U_{\text{内}} = Ir" />——电源的电动势等于内、外电路电势降落之和。</div>
</div>

<div v-click="3" class="stack-tight">
<div class="mini-title">与部分电路欧姆定律的区别</div>
<div><Latex tex="I = \dfrac{U}{R}" /> 中 <Latex tex="U" /> 是这段电路两端的电压；<Latex tex="I = \dfrac{E}{R + r}" /> 中 <Latex tex="E" /> 是电动势，<Latex tex="R + r" /> 是内外电路的总电阻。</div>
</div>

</div>

---
layout: base-flex
clicks: 4
title: 路端电压与负载
---

# 路端电压与负载

<div class="page-grow">

<div class="ask">外电阻减小时，路端电压怎样变化？</div>

<div class="half-grid">

<div class="stack-tight">
<div class="mini-title">路端电压</div>
<div>外电路中的用电器叫作<strong>负载</strong>，外电路的电势降落叫作<strong>路端电压</strong> <Latex tex="U" />。</div>
<div v-click="1">由 <Latex tex="E = U_{\text{外}} + U_{\text{内}}" />、<Latex tex="U_{\text{内}} = Ir" />，得 <span style="white-space: nowrap"><Latex tex="U = E - Ir" /></span>。</div>
</div>

<div class="stack-tight divider-l">
<div class="mini-title">外电阻减小时</div>
<div v-click="2"><Latex tex="R" /> 减小 → <Latex tex="I = \dfrac{E}{R + r}" /> 增大</div>
<div v-click="3"><Latex tex="Ir" /> 增大 → <Latex tex="U = E - Ir" /> 减小</div>
</div>

</div>

<div v-click="4" class="tip-hint">乙中并联的灯越多，外电阻越小，路端电压越低，每盏灯分得的电压也越小，所以每盏灯都比甲中暗。</div>

</div>

---
layout: base-flex
clicks: 1
title: 改变外电阻，路端电压怎样变
---

<div class="page-grow">

<div class="ask">调节外电阻 <Latex tex="R" />：电流表、电压表的读数怎样变化？它们与电动势 <Latex tex="E" /> 有什么关系？</div>

<ExternalResistanceDemo />

<div v-click="1" class="tip-hint"><Latex tex="E" /> 不变：<Latex tex="R" /> 越小，<Latex tex="I" /> 越大，内电压 <Latex tex="Ir" /> 越大，路端电压 <Latex tex="U = E - Ir" /> 越小。</div>

</div>

---
layout: base-flex
clicks: 4
title: 路端电压与电流的关系图像
---

<div class="page-grow" style="--page-gap: .6rem">

<div class="ask">闭合电路中 <Latex tex="U" /> 与 <Latex tex="I" /> 的关系是一条直线。图线的纵截距、斜率、横截距分别表示什么？</div>

<div class="half-grid">

<div class="stack">
<div><Latex tex="U = E - Ir" /> 即 <Latex tex="U = -rI + E" />，图线是一条直线。</div>
<div v-click="1"><b>纵截距</b>：<Latex tex="I = 0" />（断路）时 <Latex tex="U = E" />。</div>
<div v-click="2"><b>斜率</b>：<Latex tex="k = -r" />，<Latex tex="|k| = r" />。</div>
<div v-click="3"><b>横截距</b>：<Latex tex="U = 0" />（短路）时 <Latex tex="I_{\text{短}} = \dfrac{E}{r}" />。</div>
</div>

<div>
<CoordAxes :x-range="[0, 3.3]" :y-range="[0, 1.7]" :x-axis="{ quantity: 'I', unit: 'A' }" :y-axis="{ quantity: 'U', unit: 'V' }" :ticks="{ x: [1, 2, 3], y: [0.5, 1, 1.5] }" :view="{ width: 640, height: 420 }" :curves="[{ points: [{ x: 0, y: 1.5 }, { x: 3, y: 0 }], stroke: 'var(--c-accent-2)', width: 3 }]" :labels="[{ x: 0, y: 1.5, tex: 'E', anchor: 'top-right', size: 19, halo: true, dot: 5, dx: 10, dy: 20, showAt: 1 }, { x: 1.5, y: 0.75, tex: 'k = -r', anchor: 'top-right', size: 18, halo: true, showAt: 2 }, { x: 3, y: 0, tex: 'I_{\\text{短}}', anchor: 'top-left', size: 19, halo: true, dot: 5, showAt: 3 }]" :step="$clicks" />
</div>

</div>

<div v-click="4" class="tip-hint">由 <Latex tex="U-I" /> 图线的纵截距和斜率的绝对值，可以求出电源的电动势和内阻。</div>

</div>

---
layout: base-flex
clicks: 4
title: 断路与短路
---

<div class="page-grow" style="--page-gap: .5rem">

<div class="ask">外电路断开时，路端电压是多少？电源两端短路时，电流会是无穷大吗？</div>

<div class="half-grid">

<div class="stack">
<div class="mini-title"><mdi-vector-polyline class="icon-md" />断路</div>
<div>外电路断开，电路中没有电流</div>
<div v-click="1"><Latex tex="I = 0" />，<Latex tex="Ir = 0" />，所以 <Latex tex="U = E" />——断路时的路端电压等于电动势，常用这个道理测量电动势。</div>
</div>

<div class="stack divider-l">
<div class="mini-title"><mdi-flash class="icon-md" />短路</div>
<div>电源两端用导线直接连接，<Latex tex="R = 0" /></div>
<div v-click="2"><Latex tex="I = \dfrac{E}{r}" />。内阻一般很小（铅蓄电池约 <Latex tex="0.005 \sim 0.1\ \Omega" />，干电池不到 <Latex tex="1\ \Omega" />），短路电流很大。</div>
<div v-click="3">例如 <Latex tex="E = 3.85\ \text{V}" />、<Latex tex="r = 0.23\ \Omega" /> 的锂电池，<Latex tex="I = \frac{3.85\ \text{V}}{0.23\ \Omega} \approx 16.7\ \text{A}" /></div>
</div>

</div>

<div v-click="4" class="danger-hint">短路电流过大会烧坏电源，甚至引起火灾——绝对不允许把电源两端用导线直接连接在一起。</div>

</div>

---
layout: base-flex
clicks: 3
title: 电动势与路端电压的区别
---

<div class="page-grow">

<div class="ask">电动势 <Latex tex="E" /> 与路端电压 <Latex tex="U" /> 的单位相同，它们有什么区别？</div>

<div class="half-grid">

<div class="stack-tight">
<div class="mini-title"><mdi-battery class="icon-md" />电动势 <Latex tex="E" /></div>
<div v-click="1">物理意义：非静电力做功，把其他形式的能转化为电势能的本领</div>
<div v-click="1">定义式：<Latex tex="E = \dfrac{W}{q}" /></div>
<div v-click="1">由电源本身决定，与外电路无关</div>
</div>

<div class="stack-tight divider-l">
<div class="mini-title"><mdi-vector-polyline class="icon-md" />路端电压 <Latex tex="U" /></div>
<div v-click="2">物理意义：外电路两端的电压，即外电路的电势降落</div>
<div v-click="2">关系式：<Latex tex="U = IR" />，<Latex tex="U = E - Ir" /></div>
<div v-click="2">随负载变化：断路时 <Latex tex="U = E" />，短路时 <Latex tex="U = 0" /></div>
</div>

</div>

<div v-click="3" class="tip-hint">电动势是电源自身的特性量，路端电压是外电路两端的电压；闭合电路中 <span style="white-space: nowrap"><Latex tex="E = U_{\text{外}} + U_{\text{内}}" /></span>。</div>

</div>

---
layout: base-flex
clicks: 4
title: 练习：路端电压的计算
---

<div class="page-grow" style="--page-gap: .55rem">

<div><b class="ex-no">练习</b>　电源的电动势为 <Latex tex="4.5\ \text{V}" />、外电阻为 <Latex tex="4.0\ \Omega" /> 时，路端电压为 <Latex tex="4.0\ \text{V}" />。如果在外电路并联一个 <Latex tex="6.0\ \Omega" /> 的电阻，路端电压是多少？如果 <Latex tex="6.0\ \Omega" /> 的电阻串联在外电路中，路端电压又是多少？</div>

<div v-click="1">先求内阻：<Latex tex="I = \dfrac{U}{R} = \dfrac{4.0}{4.0}\ \text{A} = 1.0\ \text{A}" />，<Latex tex="r = \dfrac{E - U}{I} = \dfrac{4.5 - 4.0}{1.0}\ \Omega = 0.5\ \Omega" />。</div>

<div v-click="2">并联 <Latex tex="6.0\ \Omega" />：<Latex tex="R_{\text{并}} = \dfrac{4.0 \times 6.0}{4.0 + 6.0}\ \Omega = 2.4\ \Omega" />，<Latex tex="I = \dfrac{4.5}{2.4 + 0.5}\ \text{A} \approx 1.55\ \text{A}" />，<Latex tex="U = IR_{\text{并}} \approx 3.7\ \text{V}" />。</div>

<div v-click="3">串联 <Latex tex="6.0\ \Omega" />：<Latex tex="R_{\text{串}} = 10.0\ \Omega" />，<Latex tex="I = \dfrac{4.5}{10.0 + 0.5}\ \text{A} \approx 0.43\ \text{A}" />，<Latex tex="U = IR_{\text{串}} \approx 4.3\ \text{V}" />。</div>

<div v-click="4" class="tip-hint">并联电阻使外电阻减小，路端电压降低；串联电阻使外电阻增大，路端电压升高。</div>

</div>

---
layout: base-flex
clicks: 3
title: 练习：每节干电池的内阻
---

<div class="page-grow" style="--page-gap: .55rem">

<div><b class="ex-no">练习</b>　小张买了一只袖珍手电筒，里面有两节干电池。他取出手电筒中的小灯泡，看到上面标有「<Latex tex="2.2\ \text{V}\ 0.25\ \text{A}" />」的字样。小张认为，产品设计人员的意图是使小灯泡在这两节干电池的供电下正常发光。由此，他推算出了每节干电池的内阻。如果小张的判断是正确的，那么内阻是多少？</div>

<div class="mini-note">提示：串联电池组的电动势等于各个电池的电动势之和，内阻等于各个电池的内阻之和。</div>

<div v-click="1">两节干电池串联：每节电动势 <Latex tex="1.5\ \text{V}" />，<Latex tex="E = 2 \times 1.5\ \text{V} = 3.0\ \text{V}" />，内阻 <Latex tex="r_{\text{总}} = 2r" />。</div>

<div v-click="2">灯泡正常发光：<Latex tex="U = 2.2\ \text{V}" />，<Latex tex="I = 0.25\ \text{A}" />。由 <Latex tex="E = U + Ir_{\text{总}}" /> 得</div>

<div v-click="2" class="text-center"><Latex tex="r_{\text{总}} = \dfrac{E - U}{I} = \dfrac{3.0 - 2.2}{0.25}\ \Omega = 3.2\ \Omega" /></div>

<div v-click="3" class="tip-hint">每节干电池的内阻 <Latex tex="r = \dfrac{r_{\text{总}}}{2} = 1.6\ \Omega" />。</div>

</div>

---
layout: base-flex
title: 课堂小结
---

<div class="page-grow">

<div class="summary-line"><span class="text-accent font-bold">电动势</span>：<Latex tex="E = \dfrac{W}{q}" />，由电源本身决定，与外电路无关</div>

<div class="summary-line"><span class="text-accent font-bold">闭合电路欧姆定律</span>：<Latex tex="I = \dfrac{E}{R + r}" />；<Latex tex="E = IR + Ir = U_{\text{外}} + U_{\text{内}}" /></div>

<div class="summary-line"><span class="text-accent font-bold">路端电压</span>：<Latex tex="U = E - Ir" />；外电阻减小，路端电压减小；断路时 <Latex tex="U = E" />，短路时 <Latex tex="I = \dfrac{E}{r}" /></div>

<div class="summary-line"><span class="text-accent font-bold"><Latex tex="U-I" /> 图像</span>：纵截距为 <Latex tex="E" />，斜率的绝对值为 <Latex tex="r" />，横截距为 <Latex tex="I_{\text{短}} = \dfrac{E}{r}" /></div>

<div class="tip-hint">闭合电路的欧姆定律，是能量守恒定律在电路中的体现。</div>

</div>

---
layout: base-flex
title: 课后作业
---

<div class="page-grow">

<div class="stack">

<div class="mini-title"><mdi-book-open-variant class="text-3xl" />教材 12.2 练习与应用</div>

<div><strong>第 1 题</strong>：<Latex tex="EI" /> 的单位是什么？从电动势的意义来考虑，<Latex tex="EI" /> 表示什么？</div>

<div><strong>第 3 题</strong>：某锂电池的内阻是 <Latex tex="0.23\ \Omega" />，不接负载时的电压是 <Latex tex="3.85\ \text{V}" />，短路时电流是多少？</div>

<div><strong>第 5 题</strong>：电动势为 <Latex tex="1.5\ \text{V}" />、内阻为 <Latex tex="1.0\ \Omega" /> 的电池多节串联，对一个工作电压为 <Latex tex="6.0\ \text{V}" />、工作电流为 <Latex tex="0.1\ \text{A}" /> 的用电器供电。最少需要几节这种电池？电路还需要一个定值电阻来分压，请计算这个电阻的阻值。</div>

<div><strong>第 6 题</strong>：汽车启动时，启动开关闭合，电动机工作，车灯会变暗；启动之后，电动机停止工作，车灯恢复正常亮度。请分析以上现象发生的原因。</div>

</div>

</div>
