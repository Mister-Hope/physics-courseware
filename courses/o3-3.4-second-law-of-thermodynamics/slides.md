---
theme: default
title: "热力学第二定律"
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
chapter: "第三章 热力学定律"
subtitle: 方向性 · 两种表述 · 熵
---

<CoverDecorationSvg />

---
title: 红墨水为什么不会自己聚回去
---

<div class="page-grow sl-intro">
  <div class="sl-intro-q">一滴红墨水扩散到整杯水后，能自发地聚回一滴吗？</div>
  <div class="sl-intro-grid">
    <div class="sl-intro-item">
      <mdi-water class="icon-lg sl-intro-icon" />
      <div class="sl-intro-text">扩散的墨水能自发聚回吗？</div>
    </div>
    <div class="sl-intro-item">
      <mdi-fire class="icon-lg sl-intro-icon" />
      <div class="sl-intro-text">热量能自发从低温传到高温吗？</div>
    </div>
    <div class="sl-intro-item">
      <mdi-engine class="icon-lg sl-intro-icon" />
      <div class="sl-intro-text">内能能全部变成功吗？</div>
    </div>
  </div>
</div>

---
clicks: 1
clickAnimation: none
---

# 宏观过程的方向性

<div class="page-grow">
  <div class="ask">这些过程能自发地反向进行吗？</div>
  <div class="sl-direction-grid">
    <div class="sl-process">
      <mdi-thermometer class="icon-lg sl-process-icon" />
      <b>热传导</b>
      <span>热量从高温物体传到低温物体</span>
      <span class="sl-reverse" v-click="1">反向：从未自发发生</span>
    </div>
    <div class="sl-process">
      <mdi-arrow-expand class="icon-lg sl-process-icon" />
      <b>气体膨胀</b>
      <span>气体从 A 扩散到真空的 B</span>
      <span class="sl-reverse" v-click="1">反向：从未自发发生</span>
    </div>
    <div class="sl-process">
      <mdi-water class="icon-lg sl-process-icon" />
      <b>扩散</b>
      <span>红墨水扩散到整杯水中</span>
      <span class="sl-reverse" v-click="1">反向：从未自发发生</span>
    </div>
    <div class="sl-process">
      <mdi-fire class="icon-lg sl-process-icon" />
      <b>摩擦生热</b>
      <span>机械能转化成内能</span>
      <span class="sl-reverse" v-click="1">反向：从未自发发生</span>
    </div>
  </div>
  <div class="tip-hint" v-click="1">一切与热现象有关的宏观自然过程都是不可逆的。</div>
</div>

---
title: 克劳修斯表述
clicks: 2
clickAnimation: none
zoom: 0.88
---

<div class="page-grow">
  <div class="ask">热量能自发地从低温物体传到高温物体吗？</div>
  <DefinitionBox term="热力学第二定律（克劳修斯表述）">热量不能自发地从低温物体传到高温物体。</DefinitionBox>
  <div class="sl-figure"><HeatFlowSvg :step="$clicks" /></div>
  <div class="tip-hint" v-click="2">这里的关键是“自发”：不需要第三者的介入，也不对第三者产生任何影响。</div>
</div>

---
clicks: 2
clickAnimation: none
zoom: 0.9
---

# 电冰箱违背热力学第二定律吗？

<div class="page-grow">
  <div class="ask">冰箱把热量从低温的箱内送到高温的箱外，这算“自发”吗？</div>
  <div class="sl-figure"><HeatFlowSvg mode="fridge" :step="$clicks" /></div>
  <div class="tip-hint" v-click="1">不是自发的：压缩机消耗电能、对系统做功，热量才从低温处被“搬”到高温处。</div>
  <div class="summary-line" v-click="2"><Latex tex="Q_h = Q_c + W" />：房间净得热量 <Latex tex="W" />，所以冰箱不违背热力学第二定律。</div>
</div>

---
title: 开尔文表述
clicks: 2
clickAnimation: none
zoom: 0.84
---

<div class="page-grow">
  <div class="ask">热机能把从高温热库吸收的热量全部变成功吗？</div>
  <DefinitionBox term="热力学第二定律（开尔文表述）">不可能从单一热库吸收热量，使之完全变成功，而不产生其他影响。</DefinitionBox>
  <div class="sl-figure"><HeatEngineSvg :step="$clicks" /></div>
  <div class="tip-hint" v-click="2">热机必然向低温热库放热，<Latex tex="W < Q" />；要持续做功，就必须有低温热库。</div>
</div>

---
clicks: 1
clickAnimation: none
---

# 机械能与内能转化的方向性

<div class="page-grow">
  <div class="ask">摩擦生热可以自发进行，反过来呢？</div>
  <div class="sl-kind-grid">
    <div class="sl-kind-card sl-kind-yes">
      <b>机械能 → 内能</b>
      <span>可以全部转化：摩擦、碰撞都会使机械能变成内能。</span>
    </div>
    <div class="sl-kind-card sl-kind-no">
      <b>内能 → 机械能</b>
      <span>不能全部转化而不产生其他影响。</span>
    </div>
  </div>
  <div class="sl-lede">滚动的足球停下来，机械能全部转化成内能；反过来，足球、地面和周围的空气自发降温，把内能全部变成足球的动能——可能吗？</div>
  <div class="tip-hint" v-click="1">不可能。机械能可以全部变成内能，但这个过程不可逆。</div>
</div>

---
title: 两种表述的关系
clicks: 2
clickAnimation: none
zoom: 0.9
---

# 两种表述的关系

<div class="page-grow">
  <div class="ask">如果其中一种表述不成立，另一种还成立吗？</div>
  <div class="sl-proof-labels">
    <span class="sl-proof-label">克劳修斯表述</span>
    <span class="sl-proof-arrow">⇄</span>
    <span class="sl-proof-label">开尔文表述</span>
  </div>
  <div class="sl-proof-grid">
    <div class="sl-proof-col" v-click="1">
      <div class="sl-proof-title">假设克劳修斯表述不成立</div>
      <div class="sl-proof-step">热量能自发地从低温物体传到高温物体。</div>
      <div class="sl-proof-step">用热机从高温热库吸热 <Latex tex="Q" />、做功 <Latex tex="W" />，向低温热库放热 <Latex tex="Q-W" />；再把这部分热量自发地“搬”回高温热库。</div>
      <div class="sl-proof-step">净效果：高温热库净减少 <Latex tex="W" />，低温热库不变化——相当于从单一热库吸热全部变成功，开尔文表述也不成立。</div>
    </div>
    <div class="sl-proof-col" v-click="2">
      <div class="sl-proof-title">假设开尔文表述不成立</div>
      <div class="sl-proof-step">可以从单一热库吸热 <Latex tex="Q" />，全部变成功 <Latex tex="W=Q" />。</div>
      <div class="sl-proof-step">用这份功驱动制冷机：从低温热库吸热 <Latex tex="Q_c" />，向高温热库放热 <Latex tex="Q_c+W" />。</div>
      <div class="sl-proof-step">净效果：热量 <Latex tex="Q_c" /> 从低温传到高温，没有外界做功——克劳修斯表述也不成立。</div>
    </div>
  </div>
  <div class="tip-hint" v-click="2">两种表述等价：任意一种不成立，另一种也不成立。</div>
</div>

---
title: 第二类永动机
clicks: 2
clickAnimation: none
zoom: 0.85
---

<div class="page-grow">
  <div class="ask">有没有一种热机，效率可以达到 100%？</div>
  <div class="sl-figure"><HeatEngineSvg mode="perpetual" :step="$clicks" /></div>
  <div class="tip-hint" v-click="2">第二类永动机不可能制成：它不违反能量守恒，却违反热力学第二定律。</div>
</div>

---
title: 能量耗散与能源
clicks: 2
clickAnimation: none
---

# 能量耗散与能源

<div class="page-grow">
  <div class="ask">能量守恒，为什么还要节约能源？</div>
  <div class="sl-flow">
    <div class="sl-flow-node">机械能、电能、化学能……</div>
    <div class="sl-flow-arrow">→</div>
    <div class="sl-flow-node">内能</div>
    <div class="sl-flow-arrow">→</div>
    <div class="sl-flow-node">流散到环境中</div>
  </div>
  <div class="sl-lede">能量在数量上守恒，但转移和转化有方向性。各种形式的能最终都变成内能，流散到周围环境中；环境中的内能很难再聚集起来做功，这种现象叫能量耗散。</div>
  <div class="tip-hint" v-click="1">机械能、电能、化学能的品质高；内能品质低，很难再利用。</div>
  <div class="summary-line" v-click="2">能源是有限的：节约能源，本质上是在节约高品质的能量。</div>
</div>

---
title: 熵：从微观态看方向性
clicks: 2
clickAnimation: none
zoom: 0.92
---

<div class="page-grow">
  <div class="ask">气体自由膨胀后，为什么不会自动回到原来的状态？</div>
  <div class="sl-figure sl-figure-sm"><MicrostatesSvg :step="$clicks" /></div>
  <div class="sl-lede">4 个分子，每个分子在 A 或 B，共有 <Latex tex="2^4=16" /> 种微观态。膨胀前只有 1 种（4 个都在 A）；膨胀后 16 种都可能，回到初始状态的概率只有 <Latex tex="1/16" />。</div>
  <div class="tip-hint" v-click="2"><Latex tex="N" /> 个分子回到原状态的概率是 <Latex tex="1/2^N" />，实际上不可能；系统总是自发向无序度更大的方向发展。</div>
</div>

---
title: 熵增加原理
clicks: 1
clickAnimation: none
---

# 熵增加原理

<div class="page-grow">
  <div class="ask">孤立系统的熵会怎样变化？</div>
  <div class="sl-kind-grid sl-kind-grid-3">
    <div class="sl-kind-card">
      <b>有序与无序</b>
      <span>有序、无序是相对的；自发过程使系统向无序度更大的状态发展。</span>
    </div>
    <div class="sl-kind-card">
      <b>熵</b>
      <span>1850 年克劳修斯提出，熵用来表达系统的无序程度。</span>
    </div>
    <div class="sl-kind-card">
      <b>熵增加原理</b>
      <span>孤立系统的熵值总不减少。</span>
    </div>
  </div>
  <div class="sl-lede">从微观上看，热力学第二定律是统计规律：自发宏观过程总是向无序度更大的方向发展。</div>
  <div class="tip-hint" v-click="1">熵的概念已用于信息学、天体物理学、生命科学、社会科学等领域。</div>
</div>

---
title: 练习：这些过程能发生吗
clicks: 4
clickAnimation: none
zoom: 0.95
---

# 练习：这些过程能发生吗

<div class="page-grow">
  <div class="ask">判断下列过程能否发生，是否违背热力学第二定律。</div>
  <div class="sl-judge-grid">
    <div class="sl-judge-card">
      <b>①</b>
      <div class="sl-judge-text">一杯热茶自然放置，会自动变得更热。</div>
      <div class="sl-judge-answer sl-judge-no" v-click="1">不能发生；违背克劳修斯表述。</div>
    </div>
    <div class="sl-judge-card">
      <b>②</b>
      <div class="sl-judge-text">蒸汽机把蒸汽的内能全部转化成机械能。</div>
      <div class="sl-judge-answer sl-judge-no" v-click="2">不能发生；违背开尔文表述。</div>
    </div>
    <div class="sl-judge-card">
      <b>③</b>
      <div class="sl-judge-text">桶中混浊的泥水静置后，泥沙下沉、水变清。</div>
      <div class="sl-judge-answer sl-judge-yes" v-click="3">能发生；泥沙下沉是自发过程。</div>
    </div>
    <div class="sl-judge-card">
      <b>④</b>
      <div class="sl-judge-text">电冰箱通电后，把箱内低温物体的热量传到箱外高温物体。</div>
      <div class="sl-judge-answer sl-judge-yes" v-click="4">能发生；消耗了电能，不是自发的。</div>
    </div>
  </div>
</div>

---
title: 例题：汽车的能量去向
clicks: 3
clickAnimation: none
layout: exercise-split
zoom: 0.95
---

<template v-slot:stem>

汽车行驶时消耗汽油。<br />汽油燃烧释放的化学能，最终通过哪些途径转化为周围环境的内能？

</template>

燃料燃烧，化学能转化为内能；其中一部分通过热机做功，转化为机械能。

<div v-click="1">行驶中，机械能通过摩擦、空气阻力、刹车等转化为内能。</div>

<div v-click="2">排气带走的内能、散热损失的内能，也进入环境。</div>

<div class="tip-hint" v-click="3">所有途径最终都使环境的内能增加；这些内能很难再自动聚集起来做功——能量耗散。</div>

---
title: 例题：冰箱能让房间变冷吗
clicks: 3
clickAnimation: none
layout: exercise-split
zoom: 0.95
---

<template v-slot:stem>

在一个密闭房间里放一台电冰箱。把冰箱接通电源，打开冰箱门，房间会变冷吗？说明道理。

</template>

冰箱工作时，把箱内的热量 <Latex tex="Q_c" /> 搬到箱外，同时消耗电能 <Latex tex="W" />。

<div v-click="1">向箱外放出的热量 <Latex tex="Q_h=Q_c+W" />，大于从箱内搬走的热量。</div>

<div v-click="2">房间与外界没有热交换，净得热量 <Latex tex="W" />。</div>

<div class="tip-hint" v-click="3">所以房间会变热，不会变冷。</div>

---
title: 小结
---

<div class="page-grow">
  <div class="sl-summary-main">热力学第二定律</div>
  <div class="sl-summary-grid">
    <div class="sl-summary-card">
      <b>方向性</b>
      <span>与热现象有关的宏观自然过程都有方向性，都是不可逆的。</span>
    </div>
    <div class="sl-summary-card">
      <b>克劳修斯表述</b>
      <span>热量不能自发地从低温物体传到高温物体。</span>
    </div>
    <div class="sl-summary-card">
      <b>开尔文表述</b>
      <span>不可能从单一热库吸热，全部变成功而不产生其他影响。</span>
    </div>
    <div class="sl-summary-card">
      <b>第二类永动机</b>
      <span>不违背能量守恒，但违背热力学第二定律，不可能制成。</span>
    </div>
    <div class="sl-summary-card">
      <b>熵与熵增加</b>
      <span>孤立系统的熵值总不减少；热力学第二定律是统计规律。</span>
    </div>
    <div class="sl-summary-card">
      <b>能量耗散</b>
      <span>能量最终流散为环境的内能；要节约高品质的能源。</span>
    </div>
  </div>
  <div class="summary-line">两种表述等价；它们从不同侧面揭示了热现象的方向性。</div>
</div>
