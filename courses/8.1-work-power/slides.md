---
theme: default
title: "功与功率"
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
chapter-no: "8.1"
chapter: "第八章 机械能守恒定律"
lesson: "第一课时"
subtitle: 功
---

<CoverDecorationSvg />

---
layout: base-flex
clicks: 1
title: 力与位移成角度时，功怎么算
---

<div class="page-grow">
<div class="ask-lead">起重机竖直提升重物：力与位移同向，功等于力的大小与移动距离的乘积。</div>

<div class="ask">马拉雪橇时，拉力的方向与雪橇运动的方向有一个角度——这时应当怎样计算功？</div>

<div class="figure" v-click="1">
<WorkIntroSvg />
</div>
</div>

---
layout: base-flex
clicks: 3
title: 力与位移成角时，功怎么算
---

<div class="page-grow page-grow-tight">
<div class="split-wide">
<div class="figure"><ForceAngleSvg :show-decomp="$clicks >= 1" /></div>
<div class="stack">
<div class="ask">把 <Latex tex="F" /> 分解成沿位移和垂直位移的两个分力——各做多少功？</div>

<div class="summary-line" v-click="2">沿位移的分力 <Latex tex="F_1 = F\cos\alpha" /> 做功 <Latex tex="F_1 x" />；垂直位移的 <Latex tex="F_2" /> 方向上没有位移，做功为 <Latex tex="0" />。</div>

<div class="tip-hint" v-click="3">所以 <Latex tex="W = Fx\cos\alpha" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 功的定义与表达式
---

# 功

<div class="page-grow">
<div class="ask">力做了多少功，到底怎么算？</div>

<div v-click="1">
<DefinitionBox term="功" tone="gold">

<div>力对物体所做的功，等于力的大小、位移的大小、力与位移夹角的余弦这三者的乘积。</div>

</DefinitionBox>
</div>

<div v-click="2">
<Latex tex="W = Fx\cos\alpha" display />

<div class="summary-line">一句话概括：<b>力在位移上的累积</b>。式中 <Latex tex="\alpha" /> 是力 <Latex tex="F" /> 与位移 <Latex tex="x" /> 的夹角。</div>

<div class="mini-note">教材用 <Latex tex="l" /> 表示位移的大小，这里按课堂习惯写作 <Latex tex="x" />。</div>
</div>

<div class="info-hint" v-click="3">计算功时，位移 <Latex tex="x" /> 通常以<b>地面参考系</b>衡量。</div>
</div>

---
layout: base-flex
clicks: 1
title: 功的标量与单位
---

# 功的标量与单位

<div class="page-grow">
<div class="ask">功是矢量还是标量？它的正负表示什么？单位又是怎么来的？</div>

<div v-click="1">
<DefinitionBox term="标量与单位" tone="gold">

<div>功是<b>标量</b>——只有正负，没有方向。</div>

<Latex tex="1\ \text{J} = 1\ \text{N}\cdot\text{m} = 1\ \text{kg}\cdot\text{m}^2/\text{s}^2" display />

<div>在国际单位制中，功的单位是<b>焦耳</b>，符号 <Latex tex="\text{J}" />。</div>

</DefinitionBox>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 转动夹角，看功的正负
---

<div class="page-grow">
<div class="ask">夹角 <Latex tex="\alpha" /> 在什么范围内，力做正功、不做功、做负功？</div>

<div v-click="1">
<WorkAngleLab />
</div>
</div>

---
layout: base-flex
clicks: 3
title: 正功和负功
---

# 正功和负功

<div class="page-grow page-grow-tight">
<div class="figure"><WorkSignSvg /></div>

<div class="summary-line" v-click="1"><Latex tex="\alpha = \frac{\pi}{2}" />：<Latex tex="\cos\alpha = 0" />、<Latex tex="W = 0" />——力与位移垂直，不做功。</div>

<div class="summary-line" v-click="2"><Latex tex="0 \le \alpha < \frac{\pi}{2}" />：<Latex tex="W > 0" />——做正功。</div>

<div class="summary-line" v-click="3"><Latex tex="\frac{\pi}{2} < \alpha \le \pi" />：<Latex tex="W < 0" />——做负功，也叫<b>物体克服外力做功</b>。</div>
</div>

---
layout: base-flex
clicks: 3
title: 功的大小与能量流向
---

# 功的大小与能量流向

<div class="page-grow">
<div class="ask"><Latex tex="+3\ \text{J}" /> 的功和 <Latex tex="-5\ \text{J}" /> 的功，哪个大？功的正负到底在说什么？</div>

<div class="warn-hint" v-click="1">先想清楚：功的正负<b>不是</b>方向——那它表示什么？</div>

<div class="tip-hint" v-click="2"><Latex tex="W > 0" />：<b>施力物体把能量提供给受力物体</b>；<Latex tex="W < 0" />：<b>受力物体把能量提供给施力物体</b>。正负表示的是<b>能量传递的方向</b>。</div>

<div class="tip-hint" v-click="3">比较功的大小要<b>比较绝对值</b>：<Latex tex="|-5\ \text{J}| > |+3\ \text{J}|" />——所以 <Latex tex="-5\ \text{J}" /> 的功比 <Latex tex="+3\ \text{J}" /> 的功大。</div>
</div>

---
layout: base-flex
clicks: 2
title: 手对车做了功，人对车没做功
---

<div class="page-grow">
<div class="ask">车以 <Latex tex="4\ \text{m/s}" /> 匀速前进，人用 <Latex tex="100\ \text{N}" /> 推栏杆。前 <Latex tex="2\ \text{s}" />：手、人各对车做了多少功？</div>

<BusWorkLab mode="uniform" :step="$clicks" />

<div class="tip-hint" v-click="2">人对车做的功是<b>零</b>：手受栏杆向左、脚受地板向右的 <Latex tex="100\ \text{N}" /> 正好抵消。觉得没做功，是用自己的参考系判断。</div>
</div>

---
layout: base-flex
clicks: 2
title: 车在加速时，人对车做了什么功
---

<div class="page-grow">
<div class="ask">改成<b>从静止起以 <Latex tex="4\ \text{m/s}^2" /> 匀加速</b>，前 <Latex tex="2\ \text{s}" /> 内<b>人对车</b>做的功是多少？</div>

<BusWorkLab mode="accelerate" :step="$clicks" />


<div class="tip-hint" v-click="2">脚受地板的摩擦力 <Latex tex="F_f = 300\ \text{N}" /> 与手的推力不等：脚对车 <Latex tex="-2400\ \text{J}" /> ⇒ <Latex tex="W_{\text{人}} = -1600\ \text{J}" />，即车对人做 <Latex tex="1600\ \text{J}" /> 正功。人的速度在增大，后面专门讲。</div>
</div>

---
layout: base-flex
clicks: 2
title: 合力做的功
---

# 合力做的功

<div class="page-grow">
<div class="ask">一个物体受几个力，各个力都做了功——合力做的功和各分力做的功是什么关系？</div>

<div class="tip-hint" v-click="1">一个物体所受<b>合力做的功，等于各分力做功的代数和</b>。</div>

<div class="warn-hint" v-click="2">也可以先求合力、再算合力做的功，两种做法等价；但<b>功是标量</b>——相加就是<b>代数相加</b>，<b>不能用平行四边形法则</b>（平行四边形法则是给力这种矢量用的）。</div>
</div>

---
layout: exercise-split
clicks: 3
title: 例题 各力对雪橇做的总功
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　一个质量为 <Latex tex="150\ \text{kg}" /> 的雪橇，受到与水平方向成 <Latex tex="37^\circ" /> 角斜向上方的拉力，大小为 <Latex tex="500\ \text{N}" />，在水平地面上移动的距离为 <Latex tex="5\ \text{m}" />。地面对雪橇的阻力为 <Latex tex="100\ \text{N}" />，<Latex tex="\cos 37^\circ = 0.8" />。求各力对雪橇做的总功。</div>

</template>

<template v-slot:fig>

<SledExampleSvg :show-forces="$clicks >= 1" />

</template>

<div v-click="1">只有 <Latex tex="F_x" /> 与阻力做功——<Latex tex="F_y" />、<Latex tex="F_N" />、<Latex tex="G" /> 都垂直于运动方向。</div>

<div v-click="2"><Latex tex="W_1 = Fx\cos 37^\circ = 2000\ \text{J}" />，<Latex tex="W_2 = -F_{\text{阻}}x = -500\ \text{J}" />。</div>

<div class="tip-hint" v-click="3"><Latex tex="W = W_1 + W_2 = 1500\ \text{J}" />（代数和）。</div>

---
layout: base-flex
clicks: 3
title: 这三个例子里，力做功了吗
---

<div class="page-grow">
<div class="ask">甲 加速跑、乙 蹲下后站起来、丙 绕椭圆形操场缓慢拉动行李箱一圈——这些力做功了吗？</div>

<div class="split-wide">
<div class="figure"><NoWorkCasesSvg :step="$clicks" /></div>
<div class="stack">
<div class="summary-line" v-click="2">甲、乙：<b>不做功</b>——力的作用点（脚与地面的接触点）在力的方向上没有位移。</div>
<div class="tip-hint" v-click="3">丙：<b>正功</b>——一圈分成很多小段，每小段里 <Latex tex="F" /> 与 <Latex tex="\Delta s" /> 的夹角都小于 <Latex tex="90^\circ" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 压缩弹簧时，手做了多少功
---

# 压缩弹簧时，手做了多少功

<div class="page-grow page-grow-tight">
<div class="ask">把弹簧从原长压缩 <Latex tex="L" />，手的推力越来越大——功怎么算？</div>

<div class="split-wide">
<div class="figure"><SpringWorkGraph :step="$clicks" /></div>
<div class="stack">
<div class="summary-line" v-click="1">推力 <Latex tex="F = kx" /> 线性增大。分成很多小段，每段里 <Latex tex="F" /> 可看作恒力——<b>小条面积</b>就是这一小段的功。</div>
<div class="tip-hint" v-click="2">小条加起来＝图线与横轴围成的<b>三角形面积</b>：<Latex tex="W = \frac{1}{2}kL^2" />（手做的<b>正功</b>）；弹力做的功是 <Latex tex="-\frac{1}{2}kL^2" />，弹簧把能量存起来。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 判断做不做功，看哪里
---

<div class="page-grow">
<div class="ask">判断一个人做没做功，要看头、看心，还是看脚？</div>

<div class="tip-hint" v-click="1">都不看——看<b>力的作用点</b>：作用点在力的方向上有投影，就有功；没有投影，就不做功。</div>

<div class="summary-line" v-click="2">平板支撑、扎马步：身体没有位移，肌肉不做功，可是人很累——为了维持姿势，肌肉要时刻紧绷，紧绷就要消耗糖原，实际上是<b>化学能转化为内能</b>。</div>
</div>

---
layout: base-flex
clicks: 2
title: 秋千上的功
---

# 秋千上的功

<div class="page-grow">
<div class="half-grid">
<div class="flex justify-center"><PendulumSvg :show-analysis="$clicks >= 1" /></div>
<div class="stack divider-l">
<div class="ask">荡秋千时，绳的拉力做功吗？</div>

<div class="summary-line" v-click="1">秋千可以看成粗略的单摆：绳的拉力时刻沿绳指向悬点，摆球的速度沿圆弧的切线方向——两者时刻垂直。</div>

<div class="tip-hint" v-click="2"><Latex tex="F_T \perp v" />，拉力的方向上没有位移，所以<b>拉力不做功</b>；秋千上只有重力做功。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 一度电做的功有多大
---

# 一度电做的功有多大

<div class="page-grow">
<div class="ask">常说人体很省电——一度电究竟能做多少功？</div>

<div v-click="1">
<Latex tex="1\ \text{kW}\cdot\text{h} = 1000\ \text{W}\times 3600\ \text{s} = 3.6\times 10^6\ \text{J}" display />

<div class="summary-line">这些功可以供一个人跑十来公里。</div>
</div>

<div class="tip-hint" v-click="2">换成把人举高：<Latex tex="mgh = 3.6\times 10^6\ \text{J}" />，取 <Latex tex="m = 50\ \text{kg}" />、<Latex tex="g = 10\ \text{m/s}^2" />，得 <Latex tex="h = \frac{W}{mg} = \frac{3.6\times 10^6}{50\times 10} = 7.2\times 10^3\ \text{m}" />，也就是 <Latex tex="7.2\ \text{km}" />（不计能量损耗）。</div>
</div>

---
layout: base-flex
clicks: 3
title: 作用力和反作用力做的功有关系吗
---

<div class="page-grow page-grow-tight">
<div class="ask">作用力做正功、不做功或做负功时，反作用力做的功是哪一种？</div>

<div class="figure"><InteractPairWorkSvg :step="$clicks" /></div>

<div class="summary-line" v-click="1">绿＝正功，红＝负功，灰＝不做功。</div>

<div class="tip-hint" v-click="3">结论：<b>作用力与反作用力做的功没有必然关系</b>——正功、不做功、负功的任意组合都可能。</div>
</div>

---
layout: base-flex
clicks: 3
title: 例题 物体前进 L，拉力做了多少功
---

<div class="page-grow page-grow-tight">
<div><b class="ex-no">例题</b>　绳的一端系在物体运动方向<b>前面</b>的墙上，绕过物体右侧的滑轮，另一端用手以力 <Latex tex="F" /> 拉着。物体前进 <Latex tex="L" /> 时，手做的功是多少？</div>

<div class="split-wide">
<div class="figure"><PulleyWorkSvg :step="$clicks" /></div>
<div class="stack">
<div class="summary-line" v-click="1">看<b>力的作用点</b>：物体进 <Latex tex="L" />、绳头进 <Latex tex="2L" />。</div>
<div class="tip-hint" v-click="2">物体进 <Latex tex="L" />、绳头进 <Latex tex="2L" />，所以 <Latex tex="W = F\times 2L = 2FL" />。</div>
<div class="info-hint" v-click="3">和地面摩擦<b>没有关系</b>。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 例题 斜向上拉，两种算法
---

<div class="page-grow page-grow-tight">
<div><b class="ex-no">例题</b>　还是这个装置，但手拉的方向与水平面成 <Latex tex="\alpha" /> 角斜向上。物体前进 <Latex tex="L" /> 时，手做的功是多少？</div>

<div class="split-wide">
<div class="figure"><PulleyWorkSvg slanted :step="$clicks" /></div>
<div class="stack">
<div class="summary-line" v-click="1">解法一（合成力）：两段绳拉力都是 <Latex tex="F" />、夹角 <Latex tex="\alpha" /> ⇒ <Latex tex="F_{\text{合}} = 2F\cos\frac{\alpha}{2}" />、方向偏 <Latex tex="\frac{\alpha}{2}" /> ⇒ <Latex tex="W = 2FL\cos^2\frac{\alpha}{2}" />。</div>
<div class="summary-line" v-click="2">解法二（绳头位移）：<Latex tex="L" /> 与 <Latex tex="L" /> 组成的平行四边形对角线长 <Latex tex="2L\cos\frac{\alpha}{2}" />、与 <Latex tex="F" /> 成 <Latex tex="\frac{\alpha}{2}" /> 角 ⇒ <Latex tex="W = 2FL\cos^2\frac{\alpha}{2}" />。</div>
<div class="tip-hint" v-click="3">两法同解：<Latex tex="2FL\cos^2\frac{\alpha}{2} = FL(1 + \cos\alpha)" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 课堂小结
---

# 课堂小结

<div class="page-grow page-grow-tight">
<div class="half-grid">
<div class="stack">
<div class="mini-title"><mdi-book-open-variant />功</div>
<Latex tex="W = Fx\cos\alpha" display />
<div class="mini-note">力在位移上的累积；标量，单位 <Latex tex="\text{J}" /></div>
</div>
<div class="stack divider-l">
<div class="mini-title"><mdi-swap-horizontal />正功和负功</div>
<Latex tex="\cos\alpha \gtrless 0 \;\Longrightarrow\; W \gtrless 0" display />
<div class="mini-note">正负表示能量流向；比大小比绝对值</div>
</div>
</div>

<div class="half-grid">
<div class="stack">
<div class="mini-title"><mdi-crosshairs />判断做功看哪里</div>
<div class="mini-note">看力的作用点：作用点在力的方向上有投影，就有功</div>
</div>
<div class="stack divider-l">
<div class="mini-title"><mdi-scale-balance />合力与分力</div>
<div class="mini-note">合力做的功＝各分力做功的代数和；代数相加，不用平行四边形</div>
</div>
</div>

<div class="important-hint" v-click="1" style="--hint-pad-y: 0.4rem"><b>功是能量变化的量度</b>——力做了多少功，就有多少能量发生转移或转化。功是标量，正负只说能量流向；计算功的位移一般以<b>地面参考系</b>衡量。</div>
</div>

---
layout: course-cover
title: "功与功率"
lesson: "第二课时"
chapter-no: "8.1"
chapter: "第八章 机械能守恒定律"
subtitle: "功率的定义 · 机车启动"
---

<CoverDecoration2Svg />

---
layout: base-flex
clicks: 5
title: 钉钉子
---

<div class="page-grow page-grow-tight">
<div class="ask">把一枚钉子钉进木板，钉子受到的阻力与钉入的深度成正比。假设<b>每次锤击做的功相同</b>，每次敲击使钉子前进的距离之比是多少？</div>

<div class="figure"><NailHammerLab :step="$clicks" /></div>

<div class="tip-hint" v-click="5">一锤比一锤进得少——为什么？下一页用 <Latex tex="F\text{-}x" /> 图的面积算给你看。</div>
</div>

---
layout: base-flex
clicks: 2
title: 钉钉子
---

<div class="page-grow page-grow-tight">
<div class="split-wide">
<div class="figure"><NailWorkGraph :step="$clicks" /></div>
<div class="stack">
<div class="summary-line" v-click="1">阻力 <Latex tex="F = kx" />，每一锤做的功是 <Latex tex="F\text{-}x" /> 图上的<b>梯形面积</b>；每锤做功相同 ⇒ 各块面积相等 ⇒ 第 <Latex tex="n" /> 锤后深度 <Latex tex="x_n = \sqrt{n}\,x_1" />。</div>

<div class="tip-hint" v-click="2">所以每次前进的距离之比：<Latex tex="1 : (\sqrt{2}-1) : (\sqrt{3}-\sqrt{2}) : \dots : (\sqrt{N}-\sqrt{N-1})" />——越往后越钉不动。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 功率
---

<div class="page-grow">
<div class="ask">做同样多的功，有的用时长、有的用时短——做功的快慢怎样定量表示？</div>

<div v-click="1">
<DefinitionBox term="功率" tone="gold">

<div>做功的快慢用功率表示。功 <Latex tex="W" /> 与完成这些功所用时间 <Latex tex="t" /> 之比叫作<b>功率</b>（power），用 <Latex tex="P" /> 表示：</div>

<Latex tex="P = \frac{W}{t}" display />

<div>功率的单位是<b>瓦特</b>（watt），简称<b>瓦</b>，符号为 <Latex tex="\text{W}" />：<Latex tex="1\ \text{W} = 1\ \text{J/s}" />。技术上常用<b>千瓦</b>：<Latex tex="1\ \text{kW} = 1000\ \text{W}" />。</div>

</DefinitionBox>
</div>
</div>

---
layout: base-flex
clicks: 3
title: 功率与速度的关系
---

<div class="page-grow page-grow-tight">
<div class="ask">功率用 <Latex tex="W" /> 和 <Latex tex="t" /> 表示，而这段时间内的 <Latex tex="\frac{x}{t}" /> 正是速度——功率可以写成什么？</div>

<div v-click="1">
<div class="summary-line">力与位移成 <Latex tex="\alpha" /> 角时 <Latex tex="W = Fx\cos\alpha" />，而 <Latex tex="\frac{x}{t} = v" /> 是这段时间内的平均速度：</div>
<Latex tex="P = \frac{W}{t} = \frac{Fx\cos\alpha}{t} = Fv\cos\alpha" display />
</div>

<div class="tip-hint" v-click="2">力与位移成 <Latex tex="\alpha" /> 角时，功率等于力、速度、夹角余弦三者的乘积；<Latex tex="F" /> 沿位移方向（<Latex tex="\alpha = 0" />）时就是 <Latex tex="P = Fv" />。</div>

<div class="info-hint" v-click="3"><Latex tex="v" /> 是恒力作用下的平均速度时，<Latex tex="P = Fv\cos\alpha" /> 给出的是<b>平均功率</b>；时间间隔非常小、<Latex tex="v" /> 看作瞬时速度时，它也反映瞬时功率。</div>
</div>

---
layout: base-flex
clicks: 2
title: 平均功率与瞬时功率
---

<div class="page-grow page-grow-tight">
<div class="ask">同一个力，什么时候算出来的是平均功率、什么时候是瞬时功率？</div>

<div class="summary-line" v-click="1"><b>平均功率</b>：<Latex tex="P = \frac{W}{t}" />，对应一段时间；恒力时也等于 <Latex tex="F \bar{v} \cos\alpha" />（力乘平均速度）。</div>

<div class="summary-line" v-click="2"><b>瞬时功率</b>：<Latex tex="P = Fv\cos\alpha" /> 中的 <Latex tex="v" /> 取瞬时速度，对应某一时刻。</div>

<div class="tip-hint" v-click="2">力与速度垂直（<Latex tex="\alpha = \frac{\pi}{2}" />）时 <Latex tex="P = 0" />——这个力不做功。功率也是<b>标量</b>，有正负：正负只说能量流向，比大小时比绝对值。</div>
</div>

---
layout: base-flex
clicks: 2
title: 牵引力与速度
---

<div class="page-grow page-grow-tight">
<div class="ask">从 <Latex tex="P = Fv" /> 看，功率一定时牵引力与速度成反比——怎样增大牵引力？</div>

<div v-click="1">
<PowerForceLab />
</div>

<div class="tip-hint" v-click="2">上坡阻力大、需要更大牵引力：换挡减小速度，牵引力就增大；但效果有限——要同时提高速度和增大牵引力，必须提高发动机的<b>额定功率</b>。</div>
</div>

---
layout: exercise-split
clicks: 3
title: 例题 额定功率下汽车的速度与实际功率
---

<template v-slot:stem>

<div><b class="ex-no">例题</b>　某型号汽车发动机的额定功率为 <Latex tex="60\ \text{kW}" />，在水平路面上行驶时受到的阻力是 <Latex tex="1800\ \text{N}" />。求发动机在额定功率下汽车匀速行驶的速度。假定汽车行驶速度为 <Latex tex="54\ \text{km/h}" /> 时受到的阻力不变，此时发动机输出的实际功率是多少？</div>

</template>

<template v-slot:fig>

<CarPowerSvg :show-analysis="$clicks >= 1" />

</template>

<div v-click="1">匀速行驶：牵引力与阻力平衡，<Latex tex="F = F_{\text{阻}} = 1800\ \text{N}" />。</div>

<div v-click="2">额定功率下 <Latex tex="v = \frac{P}{F} = \frac{60\,000}{1800}\ \text{m/s} = 120\ \text{km/h}" />。</div>

<div class="tip-hint" v-click="3"><Latex tex="v_{\text{实}} = 54\ \text{km/h} = 15\ \text{m/s}" /> 时 <Latex tex="P_{\text{实}} = Fv_{\text{实}} = 27\ \text{kW}" />。</div>

---
layout: base-flex
clicks: 2
title: 真实车辆为什么有最高速度
---

<div class="page-grow page-grow-tight">
<div class="ask">真实的车，除了地面摩擦还有风阻——为什么每辆车都有最高速度？</div>

<div class="figure"><RealCarResistanceGraph /></div>

<div class="tip-hint" v-click="2">速度越大<b>风阻</b>越大，而牵引力 <Latex tex="F = \frac{P}{v}" /> 越小；两者相等时车不再加速，这就是最高速度。</div>
</div>

---
layout: base-flex
title: 恒定功率启动
---

<div class="page-grow page-grow-tight">
<div class="ask">汽车以<b>额定功率</b>启动，阻力恒为 <Latex tex="f_0" />。<Latex tex="P\text{-}t" />、<Latex tex="F\text{-}v" />、<Latex tex="F\text{-}\frac{1}{v}" />、<Latex tex="a\text{-}t" />、<Latex tex="v\text{-}t" />、<Latex tex="a\text{-}\frac{1}{v}" /> 六幅图像各是什么样？</div>
</div>

---
layout: base-flex
clicks: 1
title: 恒定功率启动
---

<div class="page-grow page-grow-tight">
<div class="split-wide" style="--cols: minmax(0, 1.62fr) minmax(0, 1fr)">
<div class="figure"><CarStartGraphs kind="P-t" /></div>
<div class="stack">
<div class="tip-hint" v-click="1"><b>功率从一开始就保持额定值</b>：启动即以额定功率工作，功率不随时间变化——一条水平线。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 恒定功率启动
---

<div class="page-grow page-grow-tight">
<div class="split-wide" style="--cols: minmax(0, 1.62fr) minmax(0, 1fr)">
<div class="figure"><CarStartGraphs kind="F-v" /></div>
<div class="stack">
<div class="tip-hint" v-click="1"><b>牵引力随速度增大而减小</b>：由 <Latex tex="P = Fv" /> 得 <Latex tex="F = \frac{P}{v}" />，是双曲线；速度增大到 <Latex tex="v_{\max}" /> 时牵引力降到等于阻力 <Latex tex="f_0" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 恒定功率启动
---

<div class="page-grow page-grow-tight">
<div class="split-wide" style="--cols: minmax(0, 1.62fr) minmax(0, 1fr)">
<div class="figure"><CarStartGraphs kind="F-inv-v" /></div>
<div class="stack">
<div class="tip-hint" v-click="1"><b>牵引力与速度的倒数成正比</b>：<Latex tex="F = P \cdot \frac{1}{v}" />——过原点的<b>直线</b>，斜率就是额定功率。这个关系与阻力无关。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 恒定功率启动
---

<div class="page-grow page-grow-tight">
<div class="split-wide" style="--cols: minmax(0, 1.62fr) minmax(0, 1fr)">
<div class="figure"><CarStartGraphs kind="a-t" /></div>
<div class="stack">
<div class="tip-hint" v-click="1"><b>加速度越来越小</b>：速度增大 ⇒ 牵引力减小 ⇒ <Latex tex="a = \frac{F - f_0}{m}" /> 减小；牵引力降到 <Latex tex="f_0" /> 时加速度为零。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 恒定功率启动
---

<div class="page-grow page-grow-tight">
<div class="split-wide" style="--cols: minmax(0, 1.62fr) minmax(0, 1fr)">
<div class="figure"><CarStartGraphs kind="v-t" /></div>
<div class="stack">
<div class="tip-hint" v-click="1"><b>速度增加得越来越慢</b>：斜率就是加速度，逐渐变小；曲线渐近于 <Latex tex="v_{\max} = \frac{P}{f_0}" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 1
title: 恒定功率启动
---

<div class="page-grow page-grow-tight">
<div class="split-wide" style="--cols: minmax(0, 1.62fr) minmax(0, 1fr)">
<div class="figure"><CarStartGraphs kind="a-inv-v" /></div>
<div class="stack">
<div class="tip-hint" v-click="1"><b>加速度与速度的倒数成线性关系</b>：<Latex tex="a = \frac{P}{m}\cdot\frac{1}{v} - \frac{f_0}{m}" />——<b>直线</b>；反向延长与纵轴交于负截距 <Latex tex="-\frac{f_0}{m}" />，横截距处 <Latex tex="a = 0" />。</div>
</div>
</div>
</div>

---
layout: base-flex
clicks: 2
title: 恒定加速度启动
---

<div class="page-grow page-grow-tight">
<div class="ask">还是阻力恒为 <Latex tex="f_0" />。这次以<b>恒定加速度</b> <Latex tex="a" /> 启动，匀加速阶段能达到的最大速度是多少？</div>

<div class="summary-line" v-click="1">匀加速时牵引力恒定：<Latex tex="F = f_0 + ma" />；功率 <Latex tex="P = Fv" /> 随速度增大，涨到额定值 <Latex tex="P_0" /> 时速度达到 <Latex tex="v_1 = \frac{P_0}{f_0 + ma}" />。</div>

<div class="tip-hint" v-click="2"><Latex tex="v_1 = \frac{P_0}{f_0 + ma} < \frac{P_0}{f_0} = v_{\max}" />——匀加速能达到的最大速度，<b>小于</b>恒定功率启动的最大速度。</div>
</div>

---
layout: base-flex
clicks: 2
title: 匀加速之后怎样继续加速
---

<div class="page-grow page-grow-tight">
<div class="ask">恒定加速度不能维持之后，如果就保持最大功率，<Latex tex="v\text{-}t" /> 与 <Latex tex="F\text{-}\frac{1}{v}" /> 图像各是什么样？</div>

<div class="figure"><PhaseGraphs /></div>

<div class="summary-line" v-click="1"><Latex tex="v\text{-}t" />：先是一段<b>直线</b>（匀加速），到 <Latex tex="v_1" /> 后转为斜率渐小的曲线，渐近于 <Latex tex="v_{\max}" />。</div>

<div class="tip-hint" v-click="2"><Latex tex="F\text{-}\frac{1}{v}" />：先是一段<b>水平线</b>（牵引力恒定 <Latex tex="f_0 + ma" />），到 <Latex tex="\frac{1}{v_1}" /> 之后转为过原点的<b>直线</b>（<Latex tex="F = P_0 \cdot \frac{1}{v}" />）。</div>
</div>

---
layout: base-flex
clicks: 2
title: 练习 三种情形下力做的功
---

<div class="page-grow page-grow-tight">
<div><b class="ex-no">练习</b>　物体在力 <Latex tex="F" /> 的作用下水平发生一段位移 <Latex tex="x" />，三种情形下 <Latex tex="F = 10\ \text{N}" />、<Latex tex="x = 2\ \text{m}" />，夹角 <Latex tex="\alpha" /> 如图。分别计算力 <Latex tex="F" /> 对物体做的功。</div>

<div class="figure"><WorkCasesExerciseSvg /></div>

<div v-click="1">三种情形都用 <Latex tex="W = Fx\cos\alpha" />，夹角分别是 <Latex tex="150^\circ" />、<Latex tex="30^\circ" />、<Latex tex="30^\circ" />。</div>

<div class="tip-hint" v-click="2">甲：<Latex tex="W = -10\sqrt{3}\ \text{J} \approx -17\ \text{J}" />；乙、丙：<Latex tex="W = 10\sqrt{3}\ \text{J} \approx 17\ \text{J}" />。</div>
</div>

---
layout: base-flex
clicks: 3
title: 练习 起重机提升重物
---

<div class="page-grow">
<div><b class="ex-no">练习</b>　用起重机把质量为 <Latex tex="2.0\times 10^3\ \text{kg}" /> 的物体匀速地提高了 <Latex tex="5\ \text{m}" />。钢绳的拉力做了多少功？重力做了多少功？这些力做的总功是多少？（<Latex tex="g" /> 取 <Latex tex="10\ \text{m/s}^2" />）</div>

<div v-click="1"><div class="summary-line">匀速上升：拉力与重力平衡，<Latex tex="F_{\text{拉}} = mg = 2.0\times 10^4\ \text{N}" />，方向与位移同向。</div></div>

<div v-click="2"><Latex tex="W_{\text{拉}} = F_{\text{拉}} x = 1.0\times 10^5\ \text{J}" />，<Latex tex="W_G = -mgx = -1.0\times 10^5\ \text{J}" /></div>

<div class="tip-hint" v-click="3">总功 <Latex tex="W = W_{\text{拉}} + W_G = 0" />——匀速提升时，拉力做的功全部用来克服重力。</div>
</div>

---
layout: base-flex
clicks: 2
title: 练习 P = Fv 的推导错在哪
---

<div class="page-grow">
<div><b class="ex-no">练习</b>　有一个力 <Latex tex="F" />，它在不断增大。某人以此为条件，应用 <Latex tex="P = Fv" /> 进行了如下推导：根据 <Latex tex="P = Fv" />，<Latex tex="F" /> 增大则 <Latex tex="P" /> 增大；又根据 <Latex tex="v = \frac{P}{F}" />，<Latex tex="P" /> 增大则 <Latex tex="v" /> 增大；再根据 <Latex tex="F = \frac{P}{v}" />，<Latex tex="v" /> 增大则 <Latex tex="F" /> 减小。此人推导的结果与已知条件相矛盾。错在哪里？</div>

<div class="warn-hint" v-click="1">逐条检查：每一步推导里，另外两个量是不是都被当成了不变的量？</div>

<div class="tip-hint" v-click="2">比例关系只在"另一个量保持不变"时才成立。推导中一会儿让 <Latex tex="P" /> 随 <Latex tex="F" /> 一起增大，一会儿又把 <Latex tex="P" /> 当成定值去讨论 <Latex tex="v" /> 和 <Latex tex="F" /> 的变化——<Latex tex="P" /> 不能既变又不变。</div>
</div>

---
layout: base-flex
clicks: 1
title: 课堂小结
---

<div class="page-grow page-grow-tight">
<div class="half-grid">
<div class="stack stack-tight">
<div class="mini-title"><mdi-clock-outline />功率</div>
<Latex tex="P = \frac{W}{t}" display />
<div class="mini-note">做功的快慢；标量，单位 <Latex tex="\text{W}" /></div>
</div>
<div class="stack stack-tight divider-l">
<div class="mini-title"><mdi-speedometer />功率与速度</div>
<Latex tex="P = Fv\cos\alpha" display />
<div class="mini-note">瞬时功率取瞬时速度；<Latex tex="\alpha = \frac{\pi}{2}" /> 时 <Latex tex="P = 0" /></div>
</div>
</div>

<div class="half-grid">
<div class="stack stack-tight">
<div class="mini-title"><mdi-arrow-expand-horizontal />恒定功率启动</div>
<Latex tex="F = \frac{P}{v}" display />
<div class="mini-note"><Latex tex="F\text{-}\frac{1}{v}" /> 是过原点的直线；<Latex tex="v_{\max} = \frac{P}{f_0}" /></div>
</div>
<div class="stack stack-tight divider-l">
<div class="mini-title"><mdi-car-side />恒定加速度启动</div>
<Latex tex="F = f_0 + ma" display />
<div class="mini-note">匀加速的最大速度 <Latex tex="v_1 = \frac{P_0}{f_0 + ma} < v_{\max}" /></div>
</div>
</div>

<div class="tip-hint" v-click="1">功率一定时牵引力与速度成反比；真实车辆的最高速度由牵引力与阻力相等决定。</div>
</div>

