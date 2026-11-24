---
theme: default
title: "“基本”粒子"
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
chapter-no: "5.5"
chapter: "第五章 原子核"
subtitle: 从新粒子到标准模型
---

<CoverDecorationSvg />

---
layout: focus-question
title: 质子、中子、电子就是“基本粒子”吗？
clicks: 2
clickAnimation: none
---

<template v-slot:icon>
<mdi-atom />
</template>
20 世纪初，人们把质子、中子和电子叫作“基本粒子”。后来的发现，为什么让这个称呼被放弃了？
<template v-slot:hint>
到 20 世纪后半期，人们已经发现了数以百计的新粒子，它们不能看作由质子、中子和电子组成。
</template>
<template v-slot:answer>
质子、中子本身也有复杂的结构。于是人们去掉“基本”二字，把这些粒子统称为<strong>粒子</strong>。
</template>

---
layout: base-flex
title: 新粒子从哪里来？
clicks: 3
clickAnimation: none
---

# 新粒子从哪里来？

<div class="page-grow">
<div class="ask">20 世纪 30 年代以来，人们靠什么办法发现了这么多新粒子？</div>
<div class="step-list">
<div class="step-item" v-click="1"><span class="step-no">1</span><span>观测<strong>宇宙线</strong>：1932 年发现正电子，1937 年发现 <Latex tex="\mu" /> 子，1947 年发现 <Latex tex="\text{K}" /> 介子和 <Latex tex="\pi" /> 介子；还有质量比质子大很多的<strong>超子</strong>。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span>用<strong>加速器</strong>把带电粒子加速到很高的能量，再让它们彼此<strong>对撞</strong>，碰撞中就能产生新的粒子。粒子加速器是 1932 年发明的。</span></div>
<div class="step-item" v-click="3"><span class="step-no">3</span><span>今天最大的对撞机是<strong>大型强子对撞机</strong>（LHC）：它建在周长 <Latex tex="27\ \text{km}" /> 的圆形地下隧道里，85 个国家的大学与研究机构、8 000 多位物理学家合作建成。</span></div>
</div>
</div>

---
layout: base-flex
title: 新粒子的发现年代
clicks: 2
clickAnimation: none
---

# 新粒子是什么时候被发现的？

<div class="page-grow page-grow-tight">
<table class="data-table ep-table-fix" v-click="1">
<thead>
<tr><th>年代</th><th>发现的新粒子</th><th>年代</th><th>发现的新粒子</th></tr>
</thead>
<tbody>
<tr><td>1931～1940</td><td>正电子、<Latex tex="\mu" /> 子</td><td>1971～1980</td><td><Latex tex="\tau" /> 子、胶子、<Latex tex="\text{J/}\psi" /> 介子</td></tr>
<tr><td>1941～1950</td><td><Latex tex="\text{K}" /> 介子和 <Latex tex="\pi" /> 介子</td><td>1981～1990</td><td><Latex tex="\text{W}" /> 和 <Latex tex="\text{Z}" /> 玻色子</td></tr>
<tr><td>1951～1960</td><td>反质子、电子中微子</td><td>1991～2000</td><td><Latex tex="\tau" /> 子中微子</td></tr>
<tr><td>1961～1970</td><td><Latex tex="\mu" /> 子中微子</td><td>2001 年至今</td><td>希格斯玻色子</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="2">到今天，已发现的粒子有 <strong>400 多种</strong>。</div>
</div>

---
layout: base-flex
title: 反粒子
clicks: 3
clickAnimation: none
---

# 反粒子：性质相同、电荷相反

<div class="page-grow">
<div class="ask">正电子和电子、反质子和质子，哪里一样、哪里相反？</div>
<DefinitionBox term="反粒子" v-click="1">
实验中发现，还存在这样一类粒子：它们的<strong>质量、寿命、自旋</strong>等物理性质与已知粒子相同，而<strong>电荷等其他性质相反</strong>，这类粒子叫作已知粒子的<span class="def-term">反粒子</span>。
</DefinitionBox>
<div class="half-grid" v-click="2">
<div class="stack-tight">
<div class="mini-title">电子与正电子</div>
<div>正电子的电荷量与电子相同，但带正电。</div>
</div>
<div class="stack-tight divider-l">
<div class="mini-title">质子与反质子</div>
<div>反质子的电荷量与质子相同，但带负电。</div>
</div>
</div>
<div class="tip-hint" v-click="3">1932 年，人们在宇宙线中发现了正电子——这是人类发现的第一个反粒子。</div>
</div>

---
layout: base-flex
title: 粒子分为哪几类？
clicks: 4
clickAnimation: none
---

# 粒子分为哪几类？

<div class="page-grow page-grow-tight">
<div class="ask">400 多种粒子，按“参与哪种相互作用”“有没有内部结构”，可以分成哪几类？</div>
<ParticleClassTree :step="$clicks" />
</div>

---
layout: base-flex
title: 强子与轻子
clicks: 3
clickAnimation: none
---

# 强子与轻子

<div class="page-grow">
<div class="ask">质子、中子和电子，为什么被分到两类里？</div>
<div class="half-grid">
<div class="stack" v-click="1">
<div class="mini-title">强子</div>
<div><strong>参与</strong>强相互作用的粒子：质子、中子、<Latex tex="\pi" /> 介子、<Latex tex="\text{K}" /> 介子、超子。</div>
<div class="mini-note">许多实验事实表明，强子有内部结构。</div>
</div>
<div class="stack divider-l" v-click="2">
<div class="mini-title">轻子</div>
<div><strong>不参与</strong>强相互作用的粒子：电子、电子中微子、<Latex tex="\mu" /> 子、<Latex tex="\mu" /> 子中微子、<Latex tex="\tau" /> 子、<Latex tex="\tau" /> 子中微子。</div>
<div class="mini-note">共 6 种，每种都有反粒子；现代实验还没有发现轻子的内部结构。</div>
</div>
</div>
<div class="tip-hint" v-click="3"><Latex tex="\tau" /> 子的质量比核子还大，但它不参与强相互作用，仍属于轻子。</div>
</div>

---
layout: base-flex
title: 规范玻色子
clicks: 3
clickAnimation: none
---

# 规范玻色子：传递相互作用

<div class="page-grow">
<div class="ask">粒子之间的相互作用，是靠什么传递的？</div>
<div class="step-item" v-click="1"><span class="step-no">1</span><span>规范玻色子是<strong>传递各种相互作用</strong>的粒子。</span></div>
<table class="data-table" v-click="2">
<thead>
<tr><th>相互作用</th><th>传递它的规范玻色子</th></tr>
</thead>
<tbody>
<tr><td>电磁相互作用</td><td>光子</td></tr>
<tr><td>弱相互作用</td><td>中间玻色子（<Latex tex="\text{W}" /> 和 <Latex tex="\text{Z}" /> 玻色子）</td></tr>
<tr><td>强相互作用</td><td>胶子</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="3">核子之间的核力就是强相互作用的表现，它由胶子传递。</div>
</div>

---
layout: base-flex
title: 希格斯玻色子
clicks: 3
clickAnimation: none
---

# 希格斯玻色子：质量从哪里来？

<div class="page-grow page-around">
<div class="ask">基本粒子为什么会有质量？</div>
<div class="step-item" v-click="1"><span class="step-no">1</span><span>希格斯玻色子是<strong>希格斯场的量子激发</strong>。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span>基本粒子因为与<strong>希格斯场</strong>耦合而获得质量。</span></div>
<div class="tip-hint" v-click="3">2012 年，大型强子对撞机发现了希格斯玻色子。在强子、轻子、规范玻色子、希格斯玻色子这几类中，它是<strong>最后一个</strong>被发现的。</div>
</div>

---
layout: base-flex
title: 夸克模型
clicks: 3
clickAnimation: none
---

# 强子的内部是什么？

<div class="page-grow page-around">
<div class="ask">如果强子有内部结构，组成它的又是什么？</div>
<div class="step-item" v-click="1"><span class="step-no">1</span><span>1964 年，美国科学家盖尔曼等人提出<strong>夸克模型</strong>：强子由更基本的成分——<strong>夸克</strong>组成。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span>夸克有 6 种：上夸克、下夸克、奇异夸克、粲夸克、底夸克、顶夸克。它们带的电荷是元电荷的 <Latex tex="+\frac{2}{3}" /> 或 <Latex tex="-\frac{1}{3}" />；每种夸克都有对应的反夸克。</span></div>
<div class="tip-hint" v-click="3">6 种夸克及其反夸克存在的证据，都已经从实验中找到。盖尔曼因此获得 1969 年诺贝尔物理学奖。</div>
</div>

---
layout: base-flex
title: 三个夸克怎样组成质子和中子？
clicks: 3
clickAnimation: none
---

# 三个夸克怎样组成质子和中子？

<div class="page-grow page-grow-tight">
<div class="ask">质子带正电、中子不带电，这与它们的夸克组成有什么关系？</div>
<QuarkAssembly :step="$clicks" />
<div class="tip-hint" v-click="3">质子、中子由夸克组成——这就是“强子有内部结构”的含义。</div>
</div>

---
layout: base-flex
title: 分数电荷与夸克禁闭
clicks: 3
clickAnimation: none
---

# 为什么找不到单个夸克？

<div class="page-grow page-around">
<div class="ask">既然质子由三个夸克组成，为什么从来没有抓到过一个自由的夸克？</div>
<div class="step-item" v-click="1"><span class="step-no">1</span><span>夸克的电荷是元电荷的 <Latex tex="+\frac{2}{3}" /> 或 <Latex tex="-\frac{1}{3}" />——<strong>电子的电荷不再是电荷的最小单元</strong>。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span>科学家直到今天还从未捕捉到自由的夸克：夸克不能以自由的状态单个出现。</span></div>
<div class="tip-hint" v-click="3">这种性质叫作夸克的<strong>“禁闭”</strong>。</div>
</div>

---
layout: base-flex
title: 粒子物理标准模型
clicks: 4
clickAnimation: none
---

# 粒子物理标准模型

<div class="page-grow page-grow-tight">
<div class="ask">把夸克、轻子、规范玻色子和希格斯玻色子摆在一起，会看到什么？</div>
<StandardModelGrid :step="$clicks" />
<div class="mini-note">以量子色动力学与电弱统一理论为核心的这套理论，就是<strong>粒子物理标准模型</strong>；它与大量实验吻合。</div>
</div>

---
layout: base-flex
title: 四种基本相互作用
clicks: 1
clickAnimation: none
---

# 四种基本相互作用与标准模型

<div class="page-grow page-grow-tight">
<div class="ask">自然界有四种基本相互作用，标准模型把它们统一到了什么程度？</div>
<table class="data-table">
<thead>
<tr><th>基本相互作用</th><th>作用范围</th><th>传递它的规范玻色子</th></tr>
</thead>
<tbody>
<tr><td>引力</td><td>无限远</td><td>—</td></tr>
<tr><td>电磁相互作用</td><td>无限远</td><td>光子</td></tr>
<tr><td>强相互作用</td><td>约 <Latex tex="10^{-15}\ \text{m}" /></td><td>胶子</td></tr>
<tr><td>弱相互作用</td><td>约 <Latex tex="10^{-18}\ \text{m}" /></td><td><Latex tex="\text{W}" /> 和 <Latex tex="\text{Z}" /> 玻色子</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="1">量子色动力学描述强相互作用，电弱统一理论描述电磁相互作用与弱相互作用，两者构成标准模型的核心；引力还没有被统一进来。</div>
</div>

---
layout: base-flex
title: 练习一：设计表格概括粒子的分类
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask"><span class="ex-no">练习一</span>设计并绘制一个合理的表格，全面概括你对粒子分类的了解。</div>
<table class="data-table ep-table-fix ep-class-table" v-click="1">
<thead>
<tr><th>类别</th><th>特点</th><th>典型粒子</th></tr>
</thead>
<tbody>
<tr><td>强子</td><td>参与强相互作用，有内部结构</td><td>质子、中子、<Latex tex="\pi" /> 介子、<Latex tex="\text{K}" /> 介子、超子</td></tr>
<tr><td>轻子</td><td>不参与强相互作用，未发现内部结构</td><td>电子、电子中微子、<Latex tex="\mu" /> 子、<Latex tex="\mu" /> 子中微子、<Latex tex="\tau" /> 子、<Latex tex="\tau" /> 子中微子</td></tr>
<tr><td>规范玻色子</td><td>传递各种相互作用</td><td>光子、<Latex tex="\text{W}" /> 和 <Latex tex="\text{Z}" /> 玻色子、胶子</td></tr>
<tr><td>希格斯玻色子</td><td>使基本粒子获得质量</td><td>希格斯玻色子</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="2">表格可以按“是否参与强相互作用”分类，也可以按“是不是基本粒子”分类——只要分类标准写清楚、各类之间不重不漏。</div>
</div>

---
layout: base-flex
title: 科学漫步：华人科学家的贡献
clicks: 2
clickAnimation: none
---

# 华人科学家在粒子物理领域的贡献

<div class="page-grow page-grow-tight">
<table class="data-table ep-table-fix" v-click="1">
<thead>
<tr><th>年代</th><th>科学家</th><th>工作</th></tr>
</thead>
<tbody>
<tr><td>1930</td><td>赵忠尧</td><td>发现硬 <Latex tex="\gamma" /> 射线的反常吸收与额外散射，促成正电子的发现</td></tr>
<tr><td>1933</td><td>谢玉铭</td><td>与豪斯顿精确测量氢原子光谱，推动量子电动力学的发展</td></tr>
<tr><td>1942</td><td>王淦昌</td><td>提出证实中微子存在的实验方案</td></tr>
<tr><td>1954</td><td>杨振宁、米尔斯</td><td>提出规范场理论，为粒子物理标准模型奠定基础</td></tr>
<tr><td>1956</td><td>李政道、杨振宁</td><td>提出弱相互作用中宇称不守恒，获 1957 年诺贝尔物理学奖</td></tr>
<tr><td>1957</td><td>吴健雄</td><td>用钴 60 的 <Latex tex="\beta" /> 衰变实验证实了宇称不守恒</td></tr>
<tr><td>1974</td><td>丁肇中</td><td>发现 <Latex tex="\text{J/}\psi" /> 介子，证实粲夸克的预言，获 1976 年诺贝尔物理学奖</td></tr>
</tbody>
</table>
<div class="mini-note" v-click="2">练习二：从上面选一位科学家，查阅他的事迹与成果，写一篇短文与同学交流。</div>
</div>

---
layout: base-flex
title: 第五章小结：从原子核到基本粒子
clicks: 2
clickAnimation: none
---

# 第五章：从原子核到基本粒子

<div class="page-grow page-grow-tight">
<table class="data-table ep-table-fix" v-click="1">
<thead>
<tr><th>节</th><th>主要内容</th></tr>
</thead>
<tbody>
<tr><td>5.1 原子核的组成</td><td>天然放射现象与三种射线、质子与中子、核素</td></tr>
<tr><td>5.2 放射性元素的衰变</td><td><Latex tex="\alpha" /> 衰变与 <Latex tex="\beta" /> 衰变、半衰期、放射性同位素的应用</td></tr>
<tr><td>5.3 核力与结合能</td><td>核力与四种基本相互作用、结合能、质量亏损 <Latex tex="\Delta E=\Delta mc^{2}" /></td></tr>
<tr><td>5.4 核裂变与核聚变</td><td>重核裂变与链式反应、反应堆、轻核聚变</td></tr>
<tr class="hl"><td>5.5 “基本”粒子</td><td>强子与轻子、规范玻色子、希格斯玻色子、夸克与标准模型</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="2">从原子核到夸克，认识物质结构的每一步，都靠更高能量的对撞和更精密的观测。</div>
</div>
