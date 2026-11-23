---
theme: default
title: "利用传感器制作简单的自动控制装置"
titleTemplate: '%s'
layout: course-cover
subtitle: 两个实验：门窗防盗报警 · 光控开关
chapter-no: "5.3"
chapter: "第五章 传感器"
highlighter: shiki
transition: fade
mdc: true
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
---

<CoverDecorationSvg />

---
title: 自动控制装置由哪三部分组成？
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask">路灯天黑自动亮、门一开就报警 —— 它们都由哪几部分组成？</div>
<ControlChain :step="$clicks" />
<div class="tip-hint" v-click="3">传感器输出的电信号通常很弱，带不动蜂鸣器、灯泡，所以中间必须有控制电路来放大、比较。</div>
</div>

---
title: 干簧管
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask">它平时断开，怎样才能接通？</div>
<div class="split-wide">
<div class="figure">
<ReedSwitchStage :step="$clicks" />
</div>
<div class="stack">
<div class="state-row">
<span class="state-tag">磁体远离</span>
<div>簧片不磁化，靠自身弹力分开，电路断开</div>
</div>
<div class="state-row is-near" v-click="1">
<span class="state-tag">磁体靠近</span>
<div>两片簧片被磁化、互相吸引，触点接通</div>
</div>
<div class="tip-hint" v-click="2">干簧管把“磁体远近”这个非电学量，转换成了“电路的通与断”。</div>
</div>
</div>
</div>

---
title: 门窗防盗报警：谁感知？谁执行？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask">在这张电路里，谁负责“感知”？谁负责“动作”？</div>
<div class="figure fig-wide">
<AlarmCircuitSvg :state="'idle'" :highlight="$clicks >= 2 ? 'both' : $clicks >= 1 ? 'sensor' : ''" />
</div>
<div class="stack-tight">
<div class="flow-line is-gold" v-click="1">
<span class="flow-dot"></span>
<div><strong>传感器：</strong>干簧管 SA —— 感知磁体远近，输出“通 / 断”</div>
</div>
<div class="flow-line is-gold" v-click="2">
<span class="flow-dot"></span>
<div><strong>执行装置：</strong>继电器 —— 线圈通电才吸合，再用触点控制蜂鸣器和 LED</div>
</div>
</div>
</div>

---
title: 门关着：线圈通电，灯亮
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask">门关着时，为什么指示灯亮、蜂鸣器不响？</div>
<div class="figure fig-wide">
<AlarmCircuitSvg state="closed" />
</div>
<div class="stack-tight">
<div class="flow-line is-gold" v-click="1">
<span class="flow-dot"></span>
<div>① 磁体靠近 SA → 簧片吸合 → 线圈 K 通电，衔铁吸合</div>
</div>
<div class="flow-line is-blue" v-click="2">
<span class="flow-dot"></span>
<div>② 动触点 c 倒向常开 a → LED 支路接通 → 指示灯亮（R 限流）</div>
</div>
<div class="flow-line" v-click="3">
<span class="flow-dot"></span>
<div>③ 常闭触点 b 断开 → 蜂鸣器支路断电，不响</div>
</div>
</div>
</div>

---
title: 门一开：线圈断电，蜂鸣器响
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask">门一开，为什么蜂鸣器立刻响、灯反而灭了？</div>
<div class="figure fig-wide">
<AlarmCircuitSvg state="open" />
</div>
<div class="stack-tight">
<div class="flow-line is-gold" v-click="1">
<span class="flow-dot"></span>
<div>① 磁体离开 → SA 失磁断开 → 线圈 K 断电，衔铁弹回</div>
</div>
<div class="flow-line is-gold" v-click="2">
<span class="flow-dot"></span>
<div>② 动触点 c 落回常闭 b → 蜂鸣器支路接通 → 报警</div>
</div>
<div class="flow-line" v-click="3">
<span class="flow-dot"></span>
<div>③ c 离开 a → LED 支路断电，灯灭</div>
</div>
</div>
</div>

---
title: 报警为什么接在常闭触点上？
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="ask">报警为什么接在常闭触点 b 上，而不是常开触点 a 上？</div>
<div class="half-grid">
<div class="stack">
<div class="mini-title">如果接常开 a</div>
<div class="bad-line">门关着：线圈通电，a 接通 → 报警器一直响</div>
<div class="bad-line">平时就吵，门被打开时反而分不出变化</div>
</div>
<div class="stack divider-l">
<div class="mini-title">接常闭 b（教材做法）</div>
<div class="ok-line">门关着：线圈通电，b 断开 → 安静</div>
<div class="ok-line">门一开：线圈失电，b 自动闭合 → 报警</div>
</div>
</div>
<div class="tip-hint" v-click="1">常闭触点让“线圈失电”本身成为报警信号：门一打开，报警回路就自动接通。</div>
<div class="mini-note">继电器用很小的线圈电流控制触点，触点再去通断负载电流；一只继电器还可以带多组触点。</div>
</div>

---
title: 光照强弱，怎样变成一个电学量？
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="ask">照一照、遮一遮，它的阻值会怎么变？</div>
<div class="figure fig-mid">
<PhotoresistorSvg />
</div>
<div class="tip-hint" v-click="1">光敏电阻把“光照强弱”变成了“电阻大小”这个电学量。</div>
</div>

---
title: 阻值变了，怎样变成电压？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask"><Latex tex="R_G" /> 一变，<Latex tex="b" /> 点的电压怎么跟着变？</div>
<div class="split-wide">
<div class="figure">
<VoltageDividerSvg />
</div>
<div class="stack">
<div class="eq-line"><Latex tex="U_b = \dfrac{R_G}{R_1+R_G}\,E" /></div>
<div class="state-row">
<span class="state-tag">光照强</span>
<div><Latex tex="R_G" /> 变小 → <Latex tex="U_b" /> 变小</div>
</div>
<div class="state-row" v-click="1">
<span class="state-tag">光照弱</span>
<div><Latex tex="R_G" /> 变大 → <Latex tex="U_b" /> 变大</div>
</div>
<div class="tip-hint" v-click="2">分压电路把“电阻变化”翻译成了“电压变化”。</div>
</div>
</div>
</div>

---
title: 三极管怎样当开关？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask">基极上的电压，能控制什么？</div>
<div class="split-wide">
<div class="figure">
<TransistorSvg />
</div>
<div class="stack">
<div class="state-row">
<span class="state-tag">电压低</span>
<div>基极几乎没有电流，<Latex tex="c" />、<Latex tex="e" /> 之间不通，灯灭</div>
</div>
<div class="state-row" v-click="1">
<span class="state-tag">电压够高</span>
<div>基极有很小的电流，<Latex tex="c" />、<Latex tex="e" /> 之间导通，集电极有较大电流，灯亮</div>
</div>
<div class="tip-hint" v-click="2">基极很小的电流，控制着集电极较大的电流——三极管在这里当电子开关用。</div>
</div>
</div>
</div>

---
title: 光控开关是怎么接起来的？
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="ask">光敏电阻的信号，要经过哪几级才点亮 LED？</div>
<div class="figure fig-wide">
<LightControlBoard :step="$clicks" />
</div>
</div>

---
title: 什么时候灯才会亮？
clicks: 0
clickAnimation: none
---

<div class="page-grow">
<div class="ask">光照和 <Latex tex="R_1" /> 一起变，灯什么时候亮？</div>
<LightControlLab />
</div>

---
title: 为什么要用继电器带小灯泡？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask">小灯泡为什么不能直接接在三极管上？</div>
<div class="figure fig-sm">
<RelayDriverSvg :show-diode="false" :step="0" />
</div>
<div class="stack-tight">
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>线圈 K 只需要很小的电流，三极管就带得动</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div>触点却能通断大电流——继电器的“小电流控制、大电流通断”</div></div>
</div>
</div>

---
title: 线圈断电的那一瞬间，发生了什么？
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="ask">三极管一关断，线圈里的电流会立刻消失吗？</div>
<div class="figure fig-sm">
<RelayDriverSvg show-diode :step="$clicks" />
</div>
<div class="stack-tight">
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>线圈电流突变，产生很高的自感电动势，可能击穿三极管</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div>二极管 D 给自感电流提供释放通路，把它挡在三极管之外</div></div>
</div>
</div>

---
title: 两个实验，骨子里是同一件事
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<h1>两个实验，骨子里是同一件事</h1>
<table class="data-table">
<thead><tr><th></th><th>门窗防盗报警</th><th>光控开关</th></tr></thead>
<tbody>
<tr><td>被测量</td><td>门与门框的相对位置</td><td>光照强弱</td></tr>
<tr><td>传感器</td><td>干簧管 SA：通 / 断</td><td>光敏电阻 <Latex tex="R_G" />：阻值变化</td></tr>
<tr><td>控制电路</td><td>干簧管直接通断继电器线圈</td><td>分压 + 三极管：把电压变化变成通断</td></tr>
<tr><td>执行装置</td><td>蜂鸣器、LED</td><td>LED、小灯泡（经继电器）</td></tr>
<tr><td>共同点</td><td class="hl" colspan="2">非电学量 → 电学量 → 通断 → 动作</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="1">器件可以换，三环链不变。</div>
</div>

---
title: 设计一个自动控制装置，分几步？
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<h1>设计一个自动控制装置，分几步？</h1>
<div class="step-list">
<div class="step-item"><div class="step-no">1</div><div><strong>选传感器</strong>：把被测量变成电学量——门的位置用干簧管，光照用光敏电阻，温度用双金属片。</div></div>
<div class="step-item" v-click="1"><div class="step-no">2</div><div><strong>搭控制电路</strong>：把传感器的输出放大、比较，变成“通 / 断”——分压加三极管，或直接驱动继电器线圈。</div></div>
<div class="step-item" v-click="2"><div class="step-no">3</div><div><strong>接执行装置</strong>：用触点带动蜂鸣器、灯、电动机等负载，注意触点该接常开还是常闭。</div></div>
<div class="step-item" v-click="3"><div class="step-no">4</div><div><strong>调参数、加保护</strong>：<Latex tex="R_1" /> 决定什么条件下动作，二极管 D 释放线圈的自感电流、保护三极管。</div></div>
</div>
</div>

---
title: 温度传感器也能这样用吗？
clicks: 3
clickAnimation: none
---

<div class="page-grow">
<div class="problem">双金属温度传感器在 <Latex tex="60\,^\circ\text{C}" /> 时接通、低于 <Latex tex="60\,^\circ\text{C}" /> 时断开。用它和一个电磁继电器，设计电热水器的自动加热电路：水温低时通电加热，达到 <Latex tex="60\,^\circ\text{C}" /> 时断电。</div>
<div class="stack-tight">
<div class="flow-line" v-click="1"><span class="flow-dot"></span><div>传感器串在线圈回路里：水温低 → 断开 → 线圈失电；到 <Latex tex="60\,^\circ\text{C}" /> → 接通 → 线圈通电</div></div>
<div class="flow-line" v-click="2"><span class="flow-dot"></span><div>加热器接在<strong>常闭触点</strong>上：线圈失电 → 触点闭合 → 加热</div></div>
<div class="flow-line" v-click="3"><span class="flow-dot"></span><div>到 <Latex tex="60\,^\circ\text{C}" />，线圈通电 → 常闭触点断开 → 停止加热</div></div>
</div>
</div>

---
layout: focus-question
title: 思考
---

<div class="stack" style="gap: 1.6rem">
<div class="ask-lead">换一种被测量、换一个执行装置，先感知、再放大的思路还成立吗？</div>
<div class="ask">报警器接在常闭触点上：传感器坏了、线路断了，它反而会响。这样设计有什么好处？</div>
<div class="ask">要让路灯天黑才亮、天亮就灭，可调电阻 <Latex tex="R_1" /> 该调大还是调小？</div>
</div>
