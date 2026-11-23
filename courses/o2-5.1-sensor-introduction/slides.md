---
theme: default
title: "认识传感器"
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
chapter-no: "5.1"
chapter: "第五章 传感器"
---

<CoverDecorationSvg />

---
title: 祝融号如何在火星上感知环境？
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="intro-grid">
<div class="intro-figure">
<MarsRoverSvg />
</div>
<div class="intro-qs">
<div class="intro-q"><span class="intro-q-no">01</span><span>面对陌生的环境，火星车是如何观察的？</span></div>
<div class="intro-q"><span class="intro-q-no">02</span><span>行走时，它是如何感知障碍和调整自身姿态的？</span></div>
<div class="intro-q"><span class="intro-q-no">03</span><span>遇到感兴趣的目标时，它又是如何开展探测的？</span></div>
</div>
</div>
<div class="tip-hint" v-click="1">祝融号火星车在火星上的工作离不开各式各样的传感器。</div>
</div>

---
title: 盒子里有什么样的装置？
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="puzzle-stem">小盒子 A 的侧面露出一个小灯泡，盒外没有开关。</div>
<div class="puzzle-grid">
<div class="puzzle-figure">
<ReedSwitchBoxSvg :step="$clicks" />
</div>
<div class="puzzle-question">
<div class="ask ask-lead">
<mdi-head-question-outline /> 盒子里有什么样的装置，才能出现这样的现象？
</div>
</div>
</div>
</div>

---
title: 干簧管
clicks: 3
clickAnimation: none
---

# 干簧管

<div class="page-grow">
<div class="reed-grid">
<div class="reed-figure">
<ReedSwitchSvg :step="$clicks" />
</div>
<div class="reed-text">
<div class="reed-fact">玻璃管内封入两个软磁性材料制成的簧片。</div>
<div class="reed-fact" v-click="1">磁体靠近时，两个簧片被磁化。</div>
<div class="reed-fact" v-click="2">两簧片接通，干簧管起开关的作用。</div>
<div class="tip-hint" v-click="3">干簧管是一种能够感知磁场的传感器。</div>
</div>
</div>
</div>

---
title: 生活中，传感器就在我们身边
clicks: 4
clickAnimation: none
---

# 生活中的传感器

<div class="page-grow">
<div class="life-grid">
<div class="life-card">
<mdi-motion-sensor class="icon-lg life-icon" />
<div class="life-name">声控—光控开关</div>
<div class="life-text">环境亮度低于某一数值、同时声强高于某一数值时，楼道灯才接通。</div>
<div class="life-tag" v-click="1">光传感器 + 声传感器</div>
</div>
<div class="life-card">
<mdi-door-open class="icon-lg life-icon" />
<div class="life-name">自动门</div>
<div class="life-text">检测到人体向外辐射的红外线，门自动打开。</div>
<div class="life-tag" v-click="2">红外线传感器</div>
</div>
<div class="life-card">
<mdi-flask-outline class="icon-lg life-icon" />
<div class="life-name">酒精检测仪</div>
<div class="life-text">感知呼出气体中的乙醇浓度，浓度超标时报警。</div>
<div class="life-tag" v-click="3">乙醇传感器</div>
</div>
</div>
<div class="tip-hint" v-click="4">它们感受的是非电学量，输出的却是电学量。</div>
</div>

---
title: 从人的感官到传感器
clicks: 1
clickAnimation: none
---

# 从人的感官到传感器

<div class="page-grow">
<div class="chain-wrap">
<div class="chain-row">
<div class="chain-label">人</div>
<div class="chain-node chain-node-human">感觉器官</div>
<div class="chain-arrow">→</div>
<div class="chain-node chain-node-human">大脑</div>
<div class="chain-arrow">→</div>
<div class="chain-node chain-node-human">肌体完成动作</div>
</div>
<div class="chain-row">
<div class="chain-label">机器</div>
<div class="chain-node chain-node-machine">传感器</div>
<div class="chain-arrow">→</div>
<div class="chain-node chain-node-machine">计算机</div>
<div class="chain-arrow">→</div>
<div class="chain-node chain-node-machine">执行机构</div>
</div>
</div>
<div class="tip-hint" v-click="1">在机器中，传感器执行的是人的感觉器官的功能。</div>
</div>

---
title: 传感器与人的感官
clicks: 5
clickAnimation: none
---

# 传感器与人的感官

<div class="page-grow">
<div class="sense-table">
<div class="sense-row sense-row-head">
<div>人的感官</div>
<div>获取的信息</div>
<div>机器用什么感知</div>
</div>
<div class="sense-row">
<div class="sense-human"><mdi-eye-outline class="sense-ico" /> 眼（视觉）</div>
<div class="sense-signal">光</div>
<div class="sense-sensor" v-click="1"><mdi-video class="sense-ico" /> 光传感器、摄像头</div>
</div>
<div class="sense-row">
<div class="sense-human"><mdi-ear-hearing class="sense-ico" /> 耳（听觉）</div>
<div class="sense-signal">声音</div>
<div class="sense-sensor" v-click="2"><mdi-microphone class="sense-ico" /> 声传感器、麦克风</div>
</div>
<div class="sense-row">
<div class="sense-human"><mdi-hand-back-right-outline class="sense-ico" /> 皮肤（触觉）</div>
<div class="sense-signal">温度、压力</div>
<div class="sense-sensor" v-click="3"><mdi-thermometer-lines class="sense-ico" /> 温度传感器、压力传感器</div>
</div>
<div class="sense-row">
<div class="sense-human"><mdi-smell class="sense-ico" /> 鼻（嗅觉）</div>
<div class="sense-signal">气体</div>
<div class="sense-sensor" v-click="4"><mdi-gas-cylinder class="sense-ico" /> 气体传感器</div>
</div>
</div>
<div class="tip-hint" v-click="5">传感器把外界信息转换成电信号，就像感官把外界刺激传给大脑。</div>
</div>

---
title: 什么是传感器？
clickAnimation: none
---

<div class="page-grow">
<div class="ask ask-lead def-ask">
<mdi-help-circle-outline /> 小盒子里的干簧管、楼道里的声光控开关，它们有什么共同点？
</div>
</div>

---
title: 传感器的定义
clicks: 2
clickAnimation: none
---

# 传感器的定义

<div class="page-grow">
<DefinitionBox term="传感器" tone="gold">
传感器（sensor）是指这样一类<span class="def-term">器件或装置</span>：它能够感受诸如力、温度、光、声、化学成分等<span class="def-term">被测量</span>，并能把它们按照一定的规律转换为便于传送和处理的<span class="def-term">可用信号</span>输出。通常转换成的可用信号是电压、电流等电学量，或转换为电路的通断。
</DefinitionBox>
<div class="conv-chain" v-click="1">
<div class="conv-box">被测量（非电学量）</div>
<div class="conv-arrow">→</div>
<div class="conv-box conv-box-sensor">传感器</div>
<div class="conv-arrow">→</div>
<div class="conv-box conv-box-out">电学量（电压、电流等）或电路的通断</div>
</div>
<div class="tip-hint" v-click="2">把非电学量转换为电学量，可以很方便地进行测量、传输、处理和控制。</div>
</div>

---
title: 传感器的本领
clickAnimation: none
---

# 传感器的本领

<div class="page-grow">
<div class="super-grid">
<div class="super-card">
<mdi-fire-alert class="icon-lg super-icon" />
<div class="super-name">恶劣环境</div>
<div class="super-text">可以在高温、高压、辐射等环境中工作。</div>
</div>
<div class="super-card">
<mdi-radar class="icon-lg super-icon" />
<div class="super-name">超越感官</div>
<div class="super-text">可以感受人的五官不能感知的信息，如微弱的磁、电、离子和射线。</div>
</div>
<div class="super-card">
<mdi-robot-outline class="icon-lg super-icon" />
<div class="super-name">制成机器人</div>
<div class="super-text">机器人装有多种传感器，能够感知外界环境。</div>
</div>
</div>
</div>

---
title: 传感器由哪两部分组成？
class: title-ask
clicks: 3
clickAnimation: none
---

# 传感器由哪两部分组成？

<div class="page-grow">
<div class="comp-flow">
<div class="comp-node comp-node-in">被测量</div>
<div class="comp-arrow" :style="{ opacity: $clicks >= 1 ? 1 : 0.25, color: $clicks >= 1 ? 'var(--c-accent)' : 'var(--c-text-dim)' }">→</div>
<div class="comp-box" :style="{ opacity: $clicks >= 1 ? 1 : 0.6, borderColor: $clicks >= 1 ? 'var(--c-accent-border)' : 'var(--c-border)', background: $clicks >= 1 ? 'var(--c-accent-soft)' : 'var(--c-surface)' }">
<mdi-eye-outline class="icon-lg comp-icon" />
<div class="comp-name">敏感元件</div>
<div class="comp-fn">直接感受被测量</div>
</div>
<div class="comp-arrow" :style="{ opacity: $clicks >= 2 ? 1 : 0.25, color: $clicks >= 2 ? 'var(--c-accent)' : 'var(--c-text-dim)' }">→</div>
<div class="comp-box" :style="{ opacity: $clicks >= 2 ? 1 : 0.6, borderColor: $clicks >= 2 ? 'var(--c-accent-border)' : 'var(--c-border)', background: $clicks >= 2 ? 'var(--c-accent-soft)' : 'var(--c-surface)' }">
<mdi-swap-horizontal class="icon-lg comp-icon" />
<div class="comp-name">转换元件</div>
<div class="comp-fn">转换成电信号</div>
</div>
<div class="comp-arrow" :style="{ opacity: $clicks >= 3 ? 1 : 0.25, color: $clicks >= 3 ? 'var(--c-accent)' : 'var(--c-text-dim)' }">→</div>
<div class="comp-node comp-node-out" :style="{ opacity: $clicks >= 3 ? 1 : 0.35, borderColor: $clicks >= 3 ? 'var(--c-accent-border)' : 'var(--c-border)', color: $clicks >= 3 ? 'var(--c-accent)' : 'var(--c-text-dim)' }">电学量</div>
</div>
<div class="tip-hint">传感器一般由敏感元件和转换元件组成。</div>
</div>

---
title: 敏感元件与转换元件何时合一？
clicks: 2
clickAnimation: none
---

# 敏感元件与转换元件何时合一？

<div class="page-grow">
<div class="merge-grid">
<div class="merge-card">
<mdi-thermometer class="icon-lg merge-icon" />
<div class="merge-name">热电偶</div>
<div class="merge-text">温度变化时直接产生电压，敏感元件同时兼为转换元件。</div>
</div>
<div class="merge-card">
<mdi-gesture-tap class="icon-lg merge-icon" />
<div class="merge-name">压电晶体</div>
<div class="merge-text">受力时表面直接产生电荷，压力变化直接转换为电信号。</div>
</div>
</div>
<div class="tip-hint" v-click="1">敏感元件直接输出电学量时，它同时兼为转换元件。</div>
<div class="info-hint" v-click="2">传感器的输出还要经过转换电路，才能用于测量、传输和控制。</div>
</div>

---
title: 微弱的电信号怎么办？
class: title-ask
clicks: 3
clickAnimation: none
---

# 微弱的电信号怎么办？

<div class="page-grow">
<div class="weak-flow">
<div class="weak-box">传感器输出的电信号很微弱</div>
<div class="weak-arrow">→</div>
<div class="weak-box weak-box-circuit">转换电路<br /><span class="weak-sub">放大、调整</span></div>
<div class="weak-arrow">→</div>
<div class="weak-box weak-box-out">显示、驱动或计算</div>
</div>
<div class="use-grid">
<div class="use-card">
<mdi-monitor-dashboard class="icon-lg use-icon" />
<div class="use-name">显示</div>
<div class="use-text" v-click="1">指针式电表、数字屏</div>
</div>
<div class="use-card">
<mdi-cog-outline class="icon-lg use-icon" />
<div class="use-name">驱动</div>
<div class="use-text" v-click="2">继电器、管道阀门、电动机</div>
</div>
<div class="use-card">
<mdi-chip class="icon-lg use-icon" />
<div class="use-name">计算</div>
<div class="use-text" v-click="3">计算机处理，发出更复杂的指令</div>
</div>
</div>
</div>

---
title: 电容式话筒怎样把声音变成电信号？
clicks: 3
clickAnimation: none
---

# 电容式话筒怎样把声音变成电信号？

<div class="page-grow">
<div class="mic-grid">
<div class="mic-figure">
<CapacitorMicSvg :step="$clicks" />
</div>
<div class="mic-steps">
<div class="mic-step" :class="{ 'is-on': $clicks >= 0 }">
<span class="mic-no">1</span>
<div>
<div class="mic-title">膜片与固定电极构成电容器</div>
<div class="mic-text">振动膜片表面涂有薄金属层，与后面的固定电极相距几十微米。</div>
</div>
</div>
<div class="mic-step" :class="{ 'is-on': $clicks >= 1 }">
<span class="mic-no">2</span>
<div>
<div class="mic-title">声波使膜片振动</div>
<div class="mic-text">膜片与固定电极之间的距离随声音的强弱变化。</div>
</div>
</div>
<div class="mic-step" :class="{ 'is-on': $clicks >= 2 }">
<span class="mic-no">3</span>
<div>
<div class="mic-title">电容随之变化</div>
<div class="mic-text">膜片是敏感元件，电容器是转换元件，把声音的强弱转换为电容的变化。</div>
</div>
</div>
<div class="mic-step" :class="{ 'is-on': $clicks >= 3 }">
<span class="mic-no">4</span>
<div>
<div class="mic-title">转换电路输出电压信号</div>
<div class="mic-text">电容不断变化，电路中产生充放电电流，电阻 <Latex tex="R" /> 两端电压随之变化。</div>
</div>
</div>
</div>
</div>
</div>

---
title: 传感器可以分为哪几类？
clicks: 3
clickAnimation: none
---

# 传感器可以分为哪几类？

<div class="page-grow">
<div class="class-grid">
<div class="class-card class-phys">
<mdi-magnet-on class="icon-lg class-icon" />
<div class="class-name">物理传感器</div>
<div class="class-def">利用物质的物理特性或物理效应制作而成。</div>
<div class="class-examples" v-click="1"><span class="class-label">例</span>力传感器、磁传感器、声传感器</div>
</div>
<div class="class-card class-chem">
<mdi-flask-outline class="icon-lg class-icon" />
<div class="class-name">化学传感器</div>
<div class="class-def">利用电化学反应原理，把无机或有机化学物质的成分、浓度转换为电信号。</div>
<div class="class-examples" v-click="2"><span class="class-label">例</span>离子传感器、气体传感器</div>
</div>
<div class="class-card class-bio">
<mdi-molecule class="icon-lg class-icon" />
<div class="class-name">生物传感器</div>
<div class="class-def">利用生物活性物质的选择性识别和测定生物化学物质。</div>
<div class="class-examples" v-click="3"><span class="class-label">例</span>酶传感器、微生物传感器、细胞传感器</div>
</div>
</div>
<div class="tip-hint">大多数传感器以物理原理为基础。</div>
</div>

---
title: 这些器件属于哪一类？
clicks: 6
clickAnimation: none
---

# 这些器件属于哪一类？

<div class="page-grow">
<div class="quiz-grid">
<div class="quiz-card">
<mdi-magnet-on class="icon-lg quiz-icon" />
<div class="quiz-name">干簧管</div>
<div class="quiz-cat quiz-phys" v-click="1">物理传感器</div>
</div>
<div class="quiz-card">
<mdi-door-open class="icon-lg quiz-icon" />
<div class="quiz-name">自动门</div>
<div class="quiz-cat quiz-phys" v-click="2">物理传感器</div>
</div>
<div class="quiz-card">
<mdi-flask-outline class="icon-lg quiz-icon" />
<div class="quiz-name">酒精检测仪</div>
<div class="quiz-cat quiz-chem" v-click="3">化学传感器</div>
</div>
<div class="quiz-card">
<mdi-motion-sensor class="icon-lg quiz-icon" />
<div class="quiz-name">声光控开关</div>
<div class="quiz-cat quiz-phys" v-click="4">物理传感器</div>
</div>
<div class="quiz-card">
<mdi-rice class="icon-lg quiz-icon" />
<div class="quiz-name">电饭煲温控</div>
<div class="quiz-cat quiz-phys" v-click="5">物理传感器</div>
</div>
<div class="quiz-card">
<mdi-molecule class="icon-lg quiz-icon" />
<div class="quiz-name">酶传感器</div>
<div class="quiz-cat quiz-bio" v-click="6">生物传感器</div>
</div>
</div>
</div>

---
title: 传感器还可以怎样分类？
clickAnimation: none
---

# 传感器还可以怎样分类？

<div class="page-grow">
<div class="sensor-modes">
<div class="phone-side">
<div class="side-title">手机里的传感器</div>
<div class="phone-list">
<div class="phone-item"><mdi-microphone class="icon-md phone-item-icon" /><div class="phone-item-name">麦克风</div><div class="phone-item-qty">声音</div></div>
<div class="phone-item"><mdi-camera class="icon-md phone-item-icon" /><div class="phone-item-name">摄像头</div><div class="phone-item-qty">图像</div></div>
<div class="phone-item"><mdi-gesture-tap class="icon-md phone-item-icon" /><div class="phone-item-name">触控</div><div class="phone-item-qty">压力</div></div>
<div class="phone-item"><mdi-compass-outline class="icon-md phone-item-icon" /><div class="phone-item-name">指南针</div><div class="phone-item-qty">磁场</div></div>
<div class="phone-item"><mdi-walk class="icon-md phone-item-icon" /><div class="phone-item-name">计步</div><div class="phone-item-qty">加速度</div></div>
</div>
</div>
<div class="mode-side">
<div class="mode-block">
<div class="mode-title">按被测量分</div>
<div class="mode-tags"><span>声</span><span>光</span><span>压力</span><span>位移</span><span>加速度</span><span>温度</span></div>
</div>
<div class="mode-block">
<div class="mode-title">按工作原理分</div>
<div class="mode-tags"><span>电阻式</span><span>电容式</span><span>电感式</span><span>光电式</span><span>热电式</span><span>压电式</span><span>磁电式</span></div>
</div>
</div>
</div>
<div class="tip-hint">智能手机安装十几种传感器，能感受声音、图像、压力、磁场、加速度等。</div>
</div>

---
title: 课堂练习：选择传感器
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask ask-lead">在下列情境中，应该用什么传感器？</div>
<div class="ex-list">
<div class="ex-row">
<div class="ex-scene"><mdi-egg-outline class="icon-md ex-icon" /><span>孵化器保持恒温</span></div>
<div class="ex-answer" v-click="1">温度传感器</div>
</div>
<div class="ex-row">
<div class="ex-scene"><mdi-elevator class="icon-md ex-icon" /><span>电梯超负载报警</span></div>
<div class="ex-answer" v-click="2">压力传感器</div>
</div>
<div class="ex-row">
<div class="ex-scene"><mdi-car class="icon-md ex-icon" /><span>汽车尾气达标检测</span></div>
<div class="ex-answer" v-click="3">气体传感器</div>
</div>
</div>
</div>

---
title: 如果让你来安装传感器
clickAnimation: none
---

# 如果让你来安装传感器

<div class="page-grow">
<div class="ask ask-lead">在家里、学校和社区，什么地方应该安装传感器？它们要起什么作用？</div>
<div class="disc-grid">
<div class="disc-card">
<mdi-home-outline class="icon-lg disc-icon" />
<div class="disc-name">家里</div>
<div class="disc-text">感知什么？自动做什么？</div>
</div>
<div class="disc-card">
<mdi-school-outline class="icon-lg disc-icon" />
<div class="disc-name">学校</div>
<div class="disc-text">哪里需要感知环境？</div>
</div>
<div class="disc-card">
<mdi-city-variant-outline class="icon-lg disc-icon" />
<div class="disc-name">社区</div>
<div class="disc-text">哪些设施能自动作出反应？</div>
</div>
</div>
<div class="info-hint">先想清楚要感知什么，再选择能把它转换成电学量的传感器。</div>
</div>

---
title: 小结
clickAnimation: none
---

<div class="page-grow">
<div class="sum-chain">
<div class="sum-node">非电学量</div>
<div class="sum-arrow">→</div>
<div class="sum-node sum-node-main">传感器</div>
<div class="sum-arrow">→</div>
<div class="sum-node">电学量或电路通断</div>
</div>
<div class="sum-list">
<div class="sum-row"><span class="sum-key">组成</span><span>敏感元件 + 转换元件</span></div>
<div class="sum-row"><span class="sum-key">分类</span><span>物理传感器、化学传感器、生物传感器</span></div>
<div class="sum-row"><span class="sum-key">应用</span><span>显示、驱动继电器、交给计算机处理</span></div>
</div>
</div>

---
title: 下一节：常见传感器的工作原理及应用
clickAnimation: none
---

<div class="page-grow">
<div class="next-kicker">下一节 · 5.2</div>
<div class="next-title">常见传感器的工作原理及应用</div>
<div class="next-grid">
<div class="next-card"><mdi-weather-sunny class="icon-lg next-icon" /><div class="next-name">光敏电阻</div></div>
<div class="next-card"><mdi-thermometer class="icon-lg next-icon" /><div class="next-name">金属热电阻和热敏电阻</div></div>
<div class="next-card"><mdi-gauge class="icon-lg next-icon" /><div class="next-name">电阻应变片</div></div>
</div>
</div>
