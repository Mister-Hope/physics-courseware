---
theme: default
title: "动能和动能定理"
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
chapter-no: "8.3"
chapter: "第八章 机械能守恒定律"
subtitle: "研究动能与力做功的关系"
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 2
title: 引课
---

<div class="page-grow page-around">
<div class="ask ask-lead">炮弹在炮筒内推力的作用下速度越来越大、动能增加——这一过程中推力对炮弹做了功。你还能举出哪些例子，说明动能和力做的功有关？</div>

<div class="ask" v-click="1">这些例子对<b>定量</b>研究动能有什么启发？</div>

<div class="tip-hint" v-click="2">物体动能的变化和力对物体做的功密切相关——研究动能，离不开对力做功的分析，这与上一节研究重力势能的思路一致。</div>
</div>

---
layout: base-flex
clicks: 1
title: 动能跟什么有关
---

<div class="page-grow page-around">
<div class="ask ask-lead">质量相同的两个小球，一个以 <Latex tex="v" /> 运动，另一个以 <Latex tex="2v" /> 运动——它们的动能相差多少倍？</div>

<div class="figure">〔示意站位：两个小球，速度箭头分别为 <Latex tex="v" /> 与 <Latex tex="2v" />〕</div>

<div class="tip-hint" v-click="1">先猜一个数，记在心里——这节课就把它算出来。</div>
</div>

---
layout: base-flex
clicks: 2
title: 动能的表达式（情境）
---

# 动能的表达式

<div class="page-grow">
<div>质量为 <Latex tex="m" /> 的物体在光滑水平面上运动，在与运动方向相同的恒力 <Latex tex="F" /> 的作用下发生一段位移 <Latex tex="l" />，速度由 <Latex tex="v_1" /> 增加到 <Latex tex="v_2" />。这一过程中恒力 <Latex tex="F" /> 做的功是多少？</div>

<div class="figure" v-click="1">〔示意站位：光滑水平面上的物块，标注 <Latex tex="m" />、<Latex tex="F" />、<Latex tex="l" />、<Latex tex="v_1" />、<Latex tex="v_2" />〕</div>

<div v-click="2">
<Latex tex="W = Fl" display />
</div>
</div>

---
layout: base-flex
clicks: 3
title: 动能的表达式（推导）
---

# 动能的表达式

<div class="page-grow">
<div class="step-list">
<div class="step-item">
<div class="step-no">1</div>
<div>恒力做的功：<Latex tex="W = Fl" /></div>
</div>
<div class="step-item" v-click="1">
<div class="step-no">2</div>
<div>根据牛顿第二定律：<Latex tex="F = ma" /></div>
</div>
<div class="step-item" v-click="2">
<div class="step-no">3</div>
<div>再根据匀变速直线运动的速度与位移的关系式：<Latex tex="l = \dfrac{v_2^2 - v_1^2}{2a}" /></div>
</div>
</div>

<div v-click="3">
<div>把 <Latex tex="F" />、<Latex tex="l" /> 的表达式代入 <Latex tex="W = Fl" /> 中：</div>
<Latex tex="W = \frac{1}{2}mv_2^2 - \frac{1}{2}mv_1^2" display />
</div>
</div>

---
layout: base-flex
clicks: 2
title: 动能（定义）
---

# 动能的表达式

<div class="page-grow">
<div>等式右边只出现 <Latex tex="m" /> 和 <Latex tex="v" />——<Latex tex="\frac{1}{2}mv^2" /> 是不是一个具有确定意义的物理量？</div>

<div class="ask" v-click="1">这个量在过程<b>终了</b>与过程<b>开始</b>时的差，正好等于力对物体做的功。</div>

<DefinitionBox v-click="2" term="动能" tone="gold">

<div>在物理学中就用 <Latex tex="\frac{1}{2}mv^2" /> 这个量表示物体的<span class="def-term">动能</span>（kinetic energy），用符号 <Latex tex="E_k" /> 表示。质量为 <Latex tex="m" /> 的物体，以速度 <Latex tex="v" /> 运动时的动能是：</div>

<Latex tex="E_k = \frac{1}{2}mv^2" display />

</DefinitionBox>
</div>

---
layout: base-flex
clicks: 2
title: 动能的单位与标量性
---

# 动能的表达式

<div class="page-grow">
<div class="ask">动能跟 <Latex tex="v" /> 成正比，还是跟 <Latex tex="v^2" /> 成正比？</div>

<div v-click="1">
<div>动能是<b>标量</b>，它的单位与功的单位相同，在国际单位制中都是焦耳：</div>
<Latex tex="1\ \text{kg}\cdot(\text{m/s})^2 = 1\ \text{N}\cdot\text{m} = 1\ \text{J}" display />
</div>

<div class="tip-hint" v-click="2">汽车的动能：速度从 <Latex tex="30\ \text{km/h}" /> 增大到 <Latex tex="60\ \text{km/h}" />，速度变为 2 倍，动能变为 <b>4 倍</b>。</div>
</div>

---
layout: base-flex
clicks: 3
title: 思考与讨论：墨子号的动能
---

<div class="page-grow">
<div class="ask">我国首颗量子科学实验卫星“墨子号”的质量 <Latex tex="m = 631\ \text{kg}" />，某时刻它的速度大小 <Latex tex="v = 7.6\ \text{km/s}" />，此时它的动能是多少？</div>

<div v-click="1">
<div>先把速度换算成国际单位：<Latex tex="v = 7.6\ \text{km/s} = 7.6\times10^3\ \text{m/s}" /></div>
</div>

<div v-click="2">
<Latex tex="E_k = \frac{1}{2}mv^2 = \frac{1}{2}\times631\times(7.6\times10^3)^2\ \text{J} \approx 1.8\times10^{10}\ \text{J}" display />
</div>

<div class="tip-hint" v-click="3">速度翻倍，动能变为 4 倍——这就是 <Latex tex="E_k \propto v^2" />。</div>
</div>

---
layout: base-flex
clicks: 3
title: 动能定理（表达式）
---

# 动能定理

<div class="page-grow">
<div class="ask">把 <Latex tex="W = \frac{1}{2}mv_2^2 - \frac{1}{2}mv_1^2" /> 改写成用 <Latex tex="E_k" /> 表达的形式，力做的功等于什么？</div>

<div v-click="1">
<Latex tex="W = E_{k2} - E_{k1}" display />
</div>

<div v-click="2">
<div><Latex tex="E_{k2}" /> 表示一个过程的<b>末动能</b>，<Latex tex="E_{k1}" /> 表示这个过程的<b>初动能</b>。</div>
</div>

<DefinitionBox v-click="3" term="动能定理" tone="blue">

<div>力在一个过程中对物体做的功，等于物体在这个过程中<span class="def-term">动能的变化</span>（theorem of kinetic energy）。</div>

</DefinitionBox>
</div>

---
layout: base-flex
clicks: 2
title: 动能定理（合力做的功）
---

# 动能定理

<div class="page-grow">
<div class="ask">物体同时受到几个力时，动能定理里的 <Latex tex="W" /> 是什么？</div>

<div class="tip-hint" v-click="1">如果物体受到几个力的共同作用，<Latex tex="W" /> 即为<b>合力做的功</b>，它等于各个力做功的<b>代数和</b>。</div>

<div v-click="2">
<div>合力做正功时，物体的动能增加；合力做负功时，物体的动能减少：</div>
<Latex tex="W > 0 \Rightarrow E_k \text{ 增大},\qquad W < 0 \Rightarrow E_k \text{ 减小}" display />
</div>
</div>

---
layout: base-flex
clicks: 3
title: 动能定理的适用范围
---

<div class="page-grow page-around">
<div class="ask ask-lead">上面的推导用到了“恒力”和“直线运动”——受变力作用、做曲线运动时，动能定理还成立吗？</div>

<div v-click="1">
<div>把整个过程分成许多<b>小段</b>：每一小段里物体受到的力可以看作恒力，运动的轨迹可以看作直线。</div>
</div>

<div v-click="2">
<div>分别算出各小段中力做的功，再把这些功<b>相加</b>——同样能得到 <Latex tex="W = E_{k2} - E_{k1}" />。</div>
</div>

<div class="tip-hint" v-click="3">动能定理适用于<b>变力做功</b>和<b>曲线运动</b>的情况，因此在解决实际力学问题时得到了广泛的应用。</div>
</div>

---
layout: base-flex
clicks: 2
title: 用动能定理解题
---

# 用动能定理解题

<div class="page-grow">
<div class="step-list">
<div class="step-item">
<div class="step-no">1</div>
<div>确定<b>研究对象</b>与<b>研究过程</b>，选定正方向。</div>
</div>
<div class="step-item">
<div class="step-no">2</div>
<div>分析受力，求出<b>合力做的功</b>（各个力做功的代数和）。</div>
</div>
<div class="step-item">
<div class="step-no">3</div>
<div>写出过程的<b>初动能</b> <Latex tex="E_{k1}" /> 与<b>末动能</b> <Latex tex="E_{k2}" />。</div>
</div>
<div class="step-item">
<div class="step-no">4</div>
<div>列方程 <Latex tex="W = E_{k2} - E_{k1}" />，解出待求量。</div>
</div>
</div>

<div class="tip-hint" v-click="1">动能定理<b>不涉及加速度和时间</b>，只看过程始末两个状态，用它处理问题常常比较方便。</div>

<div v-click="2">〔例题站位：本节教材例题——喷气式飞机滑跑，求平均牵引力〕</div>
</div>

---
layout: base-flex
clicks: 2
title: 例题 打夯（1）落地速度
---

<div class="page-grow">
<div class="ask">两人同时通过绳子对重物各施加 <Latex tex="360\ \text{N}" /> 的力，方向都与竖直方向成 <Latex tex="37^\circ" />；重物离开地面 <Latex tex="25\ \text{cm}" /> 后人停止施力，最后重物自由下落把地面砸深 <Latex tex="2\ \text{cm}" />。重物的质量 <Latex tex="50\ \text{kg}" />，<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />，<Latex tex="\cos 37^\circ = 0.8" />。求重物刚落地时的速度和重物对地面的平均冲击力。</div>

<div class="figure">〔示意站位：打夯装置——两根绳斜向上拉重物、重物离开地面 <Latex tex="l" />、自由下落砸入地面 <Latex tex="l'" />〕</div>

<div v-click="1">
<div>两根绳对重物的合力竖直向上：<Latex tex="F_{\text{合}} = 2F\cos 37^\circ = 2\times360\times0.8\ \text{N} = 576\ \text{N}" /></div>
</div>

<div v-click="2">
<div>（1）由重物离地到落地：重力做功为零，绳的拉力做功 <Latex tex="F_{\text{合}}l" /></div>
<Latex tex="F_{\text{合}}l = \frac{1}{2}mv^2 \quad\Rightarrow\quad v = \sqrt{\frac{2F_{\text{合}}l}{m}} = \sqrt{\frac{2\times576\times0.25}{50}}\ \text{m/s} = 2.4\ \text{m/s}" display />
</div>
</div>

---
layout: base-flex
clicks: 2
title: 例题 打夯（2）平均冲击力
---

<div class="page-grow">
<div>重物刚落地时的速度 <Latex tex="v = 2.4\ \text{m/s}" />，把地面砸深 <Latex tex="l' = 2\ \text{cm}" /> 后静止。重物对地面的平均冲击力是多大？</div>

<div v-click="1">
<div>（2）由重物刚落地到停在地面下 <Latex tex="l'" /> 处，取向下为正：重力做正功 <Latex tex="mgl'" />，地面阻力做负功，末动能为零：</div>
<Latex tex="mgl' - F_{\text{阻}}l' = 0 - \frac{1}{2}mv^2" display />
</div>

<div v-click="2">
<Latex tex="F_{\text{阻}} = mg + \frac{mv^2}{2l'} = \left(50\times10 + \frac{50\times2.4^2}{2\times0.02}\right)\ \text{N} = 7.7\times10^3\ \text{N}" display />
</div>

<div class="tip-hint" v-click="2">重物对地面的平均冲击力与它受到的平均阻力大小相等，也是 <Latex tex="7.7\times10^3\ \text{N}" />（牛顿第三定律）。</div>
</div>

---
layout: base-flex
clicks: 1
title: 练习 动能是原来的几倍
---

<div class="page-grow">
<div><b class="ex-no">练习</b>　改变汽车的质量和速度，都可能使汽车的动能发生改变。在下列几种情况下，汽车的动能各是原来的几倍？</div>

<div class="ex-options">
<div><b>A.</b> 质量不变，速度增大到原来的 2 倍</div>
<div><b>B.</b> 速度不变，质量增大到原来的 2 倍</div>
<div><b>C.</b> 质量减半，速度增大到原来的 4 倍</div>
<div><b>D.</b> 速度减半，质量增大到原来的 4 倍</div>
</div>

<div class="tip-hint" v-click="1">动能按质量的一次方、速度的<b>二次方</b>变化：A 是 <Latex tex="4" /> 倍、B 是 <Latex tex="2" /> 倍、C 是 <Latex tex="8" /> 倍、D 是 <Latex tex="1" /> 倍。</div>
</div>

---
layout: base-flex
clicks: 2
title: 课堂小结
---

<div class="page-grow">
<div class="ask">这节课的两个式子，各自回答什么问题？</div>

<div class="grid grid-cols-2 gap-6" v-click="1">
<div class="stack">
<div class="mini-title">动能</div>
<Latex tex="E_k = \frac{1}{2}mv^2" display />
<div class="mini-note">标量，单位与功相同：<Latex tex="\text{J}" />；<Latex tex="E_k \propto v^2" /></div>
</div>
<div class="stack">
<div class="mini-title">动能定理</div>
<Latex tex="W = E_{k2} - E_{k1}" display />
<div class="mini-note"><Latex tex="W" /> 是合力做的功＝各力做功的代数和</div>
</div>
</div>

<div class="tip-hint" v-click="2">动能定理把<b>力做的功</b>与<b>动能的变化</b>联系起来，<b>不涉及加速度和时间</b>，变力做功、曲线运动同样适用。</div>
</div>

---
layout: base-flex
title: 作业
---

<div class="page-grow page-around">
<div>教材第八章第 3 节“练习与应用”：</div>
<div class="step-list">
<div class="step-item">
<div class="step-no">1</div>
<div>改变汽车的质量和速度，动能各是原来的几倍。</div>
</div>
<div class="step-item">
<div class="step-no">2</div>
<div>把汽车从 <Latex tex="10\ \text{km/h}" /> 加速到 <Latex tex="20\ \text{km/h}" />，与从 <Latex tex="50\ \text{km/h}" /> 加速到 <Latex tex="60\ \text{km/h}" />，哪种情况做的功比较多？通过计算说明。</div>
</div>
<div class="step-item">
<div class="step-no">3</div>
<div>质量为 <Latex tex="8\ \text{g}" /> 的子弹，以 <Latex tex="300\ \text{m/s}" /> 的速度射入厚度为 <Latex tex="5\ \text{cm}" /> 的固定木板，射穿后的速度是 <Latex tex="100\ \text{m/s}" />。子弹射穿木板的过程中受到的平均阻力是多大？</div>
</div>
</div>
</div>
