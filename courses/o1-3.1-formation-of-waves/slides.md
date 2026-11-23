---
theme: default
title: "波的形成"
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
chapter-no: "3.1"
chapter: "第三章 机械波"
---

<CoverDecorationSvg />

---
title: 彩带上的波浪
clicks: 1
---

<div class="page-grow">
<div class="wv-quote">水波离开了它产生的地方，而那里的水并不离开，就像风在田野里掀起的麦浪。我们看到，麦浪滚滚地在田野里奔去，但是麦子却仍旧留在原来的地方。</div>
<div class="wv-quote-src">——达·芬奇</div>
<div class="ask-lead">艺术体操的彩带波浪向前传播时，彩带上的每个点也在向前运动吗？</div>
<div class="info-hint" v-click="1">彩带上的波浪翻卷，是振动在彩带上传播的结果——振动的传播称为波动，简称波。</div>
</div>

---
clicks: 2
---

# 绳波的产生与传播

<div class="page-grow">
<div class="ask">手握绳的一端向上抖一下，绳上会出现什么？</div>
<div class="figure" style="max-width: 780px; margin-inline: auto;"><RopeWaveSvg :step="$clicks" /></div>
<div class="info-hint" v-click="2">红标记只在平衡位置附近上下振动，并没有随波向前移动。</div>
</div>

---
clicks: 4
---

# 波是怎样形成的

<div class="page-grow">
<div class="ask">绳端的振动，是怎样传到绳的另一端的？</div>
<div class="figure" style="max-width: 800px; margin-inline: auto;"><WavePointsSvg :step="$clicks" /></div>
<div class="stack-tight">
<div v-click="1">绳端带动相邻的质点，相邻质点又带动更远的质点——后面的质点总比前面的质点迟一些开始振动。</div>
<div class="tip-hint" v-click="4">各质点只在各自的平衡位置附近振动，振动这种形式却沿绳传了出去。</div>
</div>
</div>

---
clicks: 1
---

# 振动的传播

<div class="page-grow">
<DefinitionBox term="波（波动）" tone="blue">
<div>振动的传播称为<span class="def-term">波动</span>，简称<span class="def-term">波</span>（wave）。</div>
</DefinitionBox>
<div class="info-hint" v-click="1">一组同学手挽手排成一行，从第一位开始依次下蹲、起立：凹凸相间的波沿着队伍传播，而每个同学的位置并没有移动。</div>
</div>

---
clicks: 2
---

# 横波：波峰与波谷

<div class="page-grow">
<div class="ask">绳上的质点上下振动，波却向右传播——这两个方向是什么关系？</div>
<div class="figure" style="max-width: 810px; margin-inline: auto;"><TransverseWaveSvg /></div>
<div class="stack-tight">
<div v-click="1">质点的振动方向与波的传播方向相互垂直，这样的波叫作<span class="wv-key">横波</span>。</div>
<div v-click="2">横波中，凸起的最高处叫作<span class="wv-key">波峰</span>，凹下的最低处叫作<span class="wv-key">波谷</span>。</div>
</div>
</div>

---
clicks: 2
---

# 纵波：密部与疏部

<div class="page-grow">
<div class="ask">沿弹簧的轴线方向推、拉弹簧，弹簧上会形成什么样的波？</div>
<div class="figure"><SpringWaveSvg /></div>
<div class="stack-tight">
<div v-click="1">质点左右振动，波却向右传播——振动方向与传播方向在同一直线上，这样的波叫作<span class="wv-key">纵波</span>。</div>
<div v-click="2">纵波中，质点分布最密的位置叫作<span class="wv-key">密部</span>，最疏的位置叫作<span class="wv-key">疏部</span>。</div>
</div>
</div>

---
clicks: 2
---

# 声波是纵波

<div class="page-grow">
<div class="ask">音叉振动时，它周围的空气会发生什么？</div>
<div class="figure" style="max-width: 880px; margin-inline: auto;"><SoundWaveSvg /></div>
<div class="stack-tight">
<div v-click="1">叉股压缩邻近的空气，又使它变稀——疏密相间的状态向外传播，形成声波。</div>
<div class="tip-hint" v-click="2">声波传入人耳使鼓膜振动；它在空气、液体、固体中都能传播。</div>
</div>
</div>

---
clicks: 1
---

# 横波与纵波

<div class="page-grow">
<table class="wv-table">
<thead>
<tr><th></th><th>横波</th><th>纵波</th></tr>
</thead>
<tbody>
<tr><td>振动方向与传播方向</td><td>相互垂直</td><td>在同一直线上</td></tr>
<tr><td>波形特征</td><td>波峰、波谷</td><td>密部、疏部</td></tr>
<tr><td>典型实例</td><td>绳上的波</td><td>弹簧上的波、声波</td></tr>
</tbody>
</table>
<div class="info-hint" v-click="1">绳波、弹簧波、声波都要靠介质传播——它们都是机械波。</div>
</div>

---
clicks: 2
---

# 机械波与介质

<div class="page-grow">
<div class="ask">绳、弹簧、水、空气——波靠什么传播？</div>
<DefinitionBox term="介质" tone="gold" v-click="1">
<div>波借以传播的物质叫作<span class="def-term">介质</span>。组成介质的质点之间有相互作用，一个质点的振动会引起相邻质点的振动。</div>
</DefinitionBox>
<div class="info-hint" v-click="2">机械振动在介质中传播，形成<span class="wv-key">机械波</span>。绳波、弹簧波、水波、声波都是机械波。</div>
</div>

---
clicks: 2
---

# 质点随波迁移吗？

<div class="page-grow">
<div class="ask">绳上的红标记、水面上的纸屑，会跟着波一起向前跑吗？</div>
<div v-click="1">绳波传播时，绳上的质点只在平衡位置附近振动，并不随波向前迁移——传播出去的只是振动这种运动形式。</div>
<div class="info-hint" v-click="2">平静的水面上漂着一片纸屑，用笔尖周期性地轻点水面：水波向外传开，纸屑只在原处上下浮动。</div>
</div>

---
clicks: 2
---

# 波传递能量

<div class="page-grow">
<div class="ask">介质中本来静止的质点，为什么波一传来就开始振动？</div>
<div v-click="1">它获得了能量。这个能量从波源出发，通过前面的质点依次传来——波是传递能量的一种方式。</div>
<div class="tip-hint" v-click="2">波源不停振动，能量就随着波不断向外传递；而质点本身并不迁移。</div>
</div>

---
clicks: 2
---

# 波传递信息

<div class="page-grow">
<div class="ask">除了能量，波还能带给我们什么？</div>
<div v-click="1">波可以传递信息。我们用语言交流，就是利用声波传递信息。</div>
<div class="info-hint" v-click="2">声呐用声波探测海底地形，医生用 B 超诊断疾病，地震波带来地球内部的信息。</div>
</div>

---
title: 某一时刻的波形
clicks: 2
---

# 波的图像

<div class="page-grow">
<div class="ask">怎样把某一时刻各质点的位移一起画出来？</div>
<div class="figure"><WaveSnapshotAxes :step="$clicks" /></div>
<div class="stack-tight">
<div v-click="1">横坐标 <Latex tex="x" /> 表示各质点的平衡位置，纵坐标 <Latex tex="y" /> 表示某一时刻各质点偏离平衡位置的位移；把这些点连起来，就得到这一时刻波的图像，也叫波形图。</div>
<div class="info-hint" v-click="2">波形图记录的是各个质点在某一时刻的位移。</div>
</div>
</div>

---
title: 波形图与振动图像
clicks: 2
---

# 波形图与振动图像

<div class="page-grow">
<WaveVsVibrationAxes />
<div class="stack-tight">
<div v-click="1">波形图：横坐标是各质点的平衡位置，记录某一时刻各个质点的位移。</div>
<div class="tip-hint" v-click="2">振动图像：横坐标是时间，记录某一个质点在各个时刻的位移。两条曲线形状可能相同，含义完全不同。</div>
</div>
</div>

---
title: 例题：绳波上的质点
clicks: 1
---

<div class="page-grow">
<div class="ask">质点 <Latex tex="1" /> 是波源，从 <Latex tex="t=0" /> 开始向上振动，<Latex tex="t=T/4" /> 时振动传到质点 <Latex tex="5" />。<Latex tex="t=T/2" />、<Latex tex="3T/4" />、<Latex tex="T" /> 时，质点 <Latex tex="8" />、<Latex tex="12" />、<Latex tex="16" /> 分别在做什么运动？</div>
<div class="figure" style="max-width: 960px; margin-inline: auto;"><WavePointsSvg :step="1" :count="16" :start-index="1" :lambda="16" /></div>
<div class="info-hint" v-click="1">波传到各质点所需的时间不同：质点 <Latex tex="8" /> 要等到 <Latex tex="t=7T/16" /> 才起振。</div>
</div>

---
title: 例题：绳波上的质点
clicks: 1
---

# 三个时刻的运动状态

<div class="page-grow">
<div class="wv-lead">质点 <Latex tex="8" /> 在 <Latex tex="t=T/2" /> 时已振动了 <Latex tex="T/16" />，即八分之一个周期：位移为 <Latex tex="0.38A" />，正在向上运动。</div>
<table class="wv-table wv-table-compact">
<thead>
<tr><th>时刻</th><th>质点 8</th><th>质点 12</th><th>质点 16</th></tr>
</thead>
<tbody>
<tr><td><Latex tex="T/2" /></td><td>平衡位置上方，向上</td><td>静止</td><td>静止</td></tr>
<tr><td><Latex tex="3T/4" /></td><td>接近最高点，向下</td><td>平衡位置上方，向上</td><td>静止</td></tr>
<tr><td><Latex tex="T" /></td><td>平衡位置下方，向下</td><td>接近最高点，向下</td><td>平衡位置上方，向上</td></tr>
</tbody>
</table>
</div>

---
title: 举出生活中的例子
clicks: 3
---

# 举出生活中的例子

<div class="page-grow">
<div class="ask">举几个例子，说明波传递的是振动这种运动形式，质点本身并不迁移。</div>
<div class="wv-lead" v-click="1">声波：空气分子只在原来的位置附近振动，声音却传到了耳朵里。</div>
<div class="wv-lead" v-click="2">水波：水面上的纸屑只在原处上下浮动，不会随波漂向岸边。</div>
<div class="tip-hint" v-click="3">人浪：每个同学都在自己的座位上起立、蹲下，波浪却从看台的一头传到了另一头。</div>
</div>

---
title: 波的类型与起振方向
clicks: 2
---

<div class="page-grow">
<div class="ask">图中的机械波以质点 <Latex tex="P" /> 为波源，沿绳向右传播，此时刚好传到质点 <Latex tex="Q" />。（1）这列波是横波还是纵波？（2）质点 <Latex tex="P" /> 刚开始振动时，朝哪个方向运动？</div>
<div class="figure" style="max-width: 940px; margin-inline: auto;"><RopeWaveFrontSvg :step="$clicks" /></div>
<div class="stack-tight">
<div v-click="1">（1）绳上的质点上下振动，波沿绳向右传播，振动方向与传播方向垂直，所以这是横波。</div>
<div class="info-hint" v-click="2">（2）波刚传到 <Latex tex="Q" /> 时，<Latex tex="Q" /> 向下运动；介质中每个质点的起振方向都与波源相同，所以 <Latex tex="P" /> 刚开始振动时也向下运动。</div>
</div>
</div>

---
title: 小结
clicks: 4
---

# 小结

<div class="page-grow">
<div class="wv-lead" v-click="1"><span class="wv-num">1</span>波是振动在介质中的传播：后面的质点依次被带动，比前面的质点晚一些开始振动。</div>
<div class="wv-lead" v-click="2"><span class="wv-num">2</span>横波：振动方向与传播方向垂直，有波峰和波谷；纵波：振动方向与传播方向在同一直线上，有密部和疏部。</div>
<div class="wv-lead" v-click="3"><span class="wv-num">3</span>机械波靠介质传播，传播的是振动这种运动形式和能量，质点并不随波迁移。</div>
<div class="wv-lead" v-click="4"><span class="wv-num">4</span>波形图记录各个质点在某一时刻的位移；振动图像记录某一个质点在各个时刻的位移。</div>
</div>
