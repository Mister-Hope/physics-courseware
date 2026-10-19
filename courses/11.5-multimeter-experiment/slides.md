---
theme: default
title: "实验：练习使用多用电表"
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
chapter-no: "11.5"
chapter: "第十一章 电路及其应用"
---

<CoverDecorationSvg />

---
clicks: 2
---

<div class="page-grow">
<div class="ask">桌上有一只阻值未知的电阻、一个不知好坏的灯泡、一节快没电的电池。<br />只带一只表进实验室，能把它们都摸清吗？</div>

<div v-click="1" class="stack">
<div>多用电表：一只表就能测<b>直流电流、直流电压、交流电压、电阻</b>。</div>
<div v-click="2">可是它凭什么既能量电压、又能量电流，还能量电阻？（想想 11.4 表头的改装）</div>
</div>
</div>

---
clicks: 2
---

# 认识多用电表

<div class="page-grow">
<div class="half-grid">
<div>
<MultimeterDial :deflection="0.34" gear-id="dcv_10" :screw-on="$clicks === 1" />
</div>
<div class="stack-tight">
<div>上半部分是<b>表盘</b>：三排刻度线叠在一起，最上一排是欧姆刻度 —— 不均匀，左边 <Latex tex="\infty" />、右边 0。</div>
<div v-click="1">表盘正下方那颗螺丝是<b>指针定位螺丝</b>，用前旋它做<b>机械调零</b>，让指针指到零刻度。</div>
<div v-click="2">机械调零整节课<b>只做一次</b>：开始前调好，后面无论怎么换挡都不用再动它。</div>
</div>
</div>
</div>

---
clicks: 3
---

# 选择开关与插孔

<div class="page-grow">
<div class="half-grid">
<div>
<GearSelector :gear-id="$clicks >= 2 ? 'ohm_100' : 'dcv_10'" :clickable="false" :highlight="$clicks >= 3 ? 'terminals' : $clicks === 2 ? 'ohmAdj' : $clicks === 1 ? 'knob' : null" />
</div>
<div class="stack-tight">
<div v-click="1">中间的大旋钮就是<b>选择开关</b>：18 个挡位分成 <Latex tex="\Omega" />、<Latex tex="\text{V}\sim" />、<Latex tex="\text{V}-" />、<Latex tex="\text{mA}-" /> 四个功能区，每个区里再分量程。</div>
<div v-click="2">右上 <b>0 <Latex tex="\Omega" /> ADJ</b> 是<b>欧姆调零旋钮</b> —— 和机械调零不是一回事，每换一次欧姆挡倍率都要重调它。</div>
<div v-click="3">右下两个插孔：<b>红表笔插 <Latex tex="+" />、黑表笔插 <Latex tex="-" /></b>。</div>
</div>
</div>
</div>

---
clicks: 6
---

# 使用多用电表

<div class="page-grow">
<div class="ask">拿到一只多用电表，第一件事是什么？整节课的流程又是怎样的？</div>

<div class="stack">
<div v-click="1"><b>① 机械调零</b>　调指针定位螺丝，让指针指到零刻度（<b>用前调一次</b>）。</div>
<div v-click="2"><b>② 选挡</b>　选择开关旋到与被测物理量对应的位置，并选合适的量程。</div>
<div v-click="3"><b>③ 测量</b>　电压挡并联、电流挡串联、欧姆挡接在电阻两端。</div>
<div v-click="4"><b>④ 读数</b>　按该挡对应的那一排刻度线读；欧姆挡还要把刻度值乘上倍率。</div>
<div v-click="5"><b>⑤ 换挡重调零</b>　欧姆挡每换一次倍率，都要重新短接调零。</div>
<div v-click="6"><b>⑥ 用完拨 OFF</b>　没有 OFF 挡的表，拨到交流电压最高挡。</div>
</div>
</div>

---
clicks: 3
---

# 测量小灯泡的电压

<div class="page-grow">
<div class="ask">电压挡该怎么接？红表笔碰哪一边？量程又怎么选？</div>

<div class="wire-fig">
<MultimeterVoltageSvg :show-meter="$clicks >= 1" :show-probes="$clicks >= 2" />
</div>

<div class="stack-tight">
<div v-click="1">把多用电表<b>并联</b>在小灯泡两端 —— 电压挡内阻很大，并上去几乎不影响电路。</div>
<div v-click="2">红表笔接<b>电势高</b>的那一端，黑表笔接电势低的那一端。</div>
<div v-click="3">量程要<b>大于</b>估计值（估 <Latex tex="2\ \text{V}" /> 就先用 <Latex tex="2.5\ \text{V}" /> 挡），不确定时先拿大量程试一下。</div>
</div>
</div>

---
clicks: 1
---

# 直流电压挡的读数

<div class="page-grow">
<div class="ask">同一根指针，换一个量程，读数会怎么变？该读哪一排刻度线？</div>

<MultimeterLab kind="dcv" :reveal="$clicks >= 1" />
</div>

---
clicks: 3
---

# 测量通过小灯泡的电流

<div class="page-grow">
<div class="ask">电流挡的接法，和电压挡有什么不同？</div>

<div class="wire-fig">
<MultimeterCurrentSvg :show-break="$clicks >= 1" :show-meter="$clicks >= 2" :show-probes="$clicks >= 3" />
</div>

<div class="stack-tight">
<div v-click="1">断开开关，把小灯泡一个接线柱上的导线<b>卸开</b>，让电路留出一个断口。</div>
<div v-click="2">把多用电表<b>串联</b>进这个断口 —— 电流挡内阻很小，只能串在电路里。</div>
<div v-click="3">电流必须<b>从红表笔流入</b>多用电表；量程同样要大于估计值。</div>
</div>
</div>

---
clicks: 1
---

# 电压挡与电流挡

<div class="page-grow">
<div class="ask">测量直流电压、直流电流时，红表笔和黑表笔哪个电势高？</div>

<div class="half-grid">
<div class="card">
<div class="mini-title">直流电压挡</div>
<div class="stack-tight">
<div><b>并联</b>在被测元件两端</div>
<div>红表笔接<b>高电势</b>一侧</div>
<div>量程大于估计值</div>
</div>
</div>
<div class="card">
<div class="mini-title">直流电流挡</div>
<div class="stack-tight">
<div><b>串联</b>在电路断口处</div>
<div>电流从<b>红表笔流入</b></div>
<div>量程大于估计值</div>
</div>
</div>
</div>

<div v-click="1" class="important-hint">两问的答案都是<b>红表笔</b>：电压挡里红表笔接电势高的一端，电流挡里电流从红表笔流进表内。一句话记 —— <b>红进黑出</b>。</div>
</div>

---
clicks: 2
---

# 电阻挡

<div class="page-grow">
<div class="ask">量电阻的时候，多用电表自己要不要通电？</div>

<div v-click="1" class="stack">
<div>要。电阻挡<b>表内有电源</b> —— 表笔上带电，才有电流流过被测电阻，指针才会偏转。</div>
<div>所以欧姆挡的刻度是<b>不均匀</b>的，而且是<b>左 <Latex tex="\infty" /> 右 0</b>：两支表笔短接时被测电阻为 0，电流最大，指针打到最右。</div>
</div>

<div v-click="2" class="warn-hint">用欧姆挡时被测电阻<b>不能带电</b>，也不要用两只手同时捏住两支表笔的金属杆 —— 那等于把人体电阻并了进去。</div>
</div>

---
clicks: 2
---

# 欧姆调零

<div class="page-grow">
<div class="ask">把两支表笔直接接触，指针应该指到哪里？为什么？</div>

<div class="half-grid">
<div>
<MultimeterDial :deflection="$clicks >= 1 ? 1 : 0.62" gear-id="ohm_1" view-box="8 8 684 430" />
</div>
<div>
<div class="stack">
<div v-click="1">短接时被测电阻为 0，流过表头的电流最大，指针应指到最右端的<b>欧姆零点</b>。如果没指到 0，就旋<b>欧姆调零旋钮</b>把它调过去。</div>
<div v-click="2" class="important-hint"><b>每换一次倍率，都必须重新短接调零。</b>教材旁注的原话是"改变不同倍率的电阻挡后必须重复这项操作"。</div>
</div>
</div>
</div>
</div>

---
clicks: 1
---

# 欧姆挡的读数

<div class="page-grow">
<div class="ask">表盘上读到 15，倍率是 <Latex tex="\times 100" />，这个电阻到底多大？</div>

<MultimeterLab kind="ohm" :reveal="$clicks >= 1" />
</div>

---
clicks: 3
---

# 红进黑出与二极管

<div class="page-grow">
<div class="ask">欧姆挡内部有电源。那么黑表笔接的是表内电源的正极还是负极？</div>

<div class="stack">
<div v-click="1">整个多用电表只有一条规矩：电流<b>从红表笔流入</b>、<b>从黑表笔流出</b>。欧姆挡里表自己就是电源，所以电流从<b>黑表笔流出表外</b>，经过被测电阻，再从红表笔流回表内。</div>
<div v-click="2">也就是说，<b>欧姆挡里黑表笔接的是表内电源的正极</b> —— 黑表笔那一端的电势反而更高。</div>
</div>

<div v-click="3" class="stack">
<div>所以测二极管时，把<b>黑表笔接二极管正极</b>、红表笔接负极，二极管正向导通，电阻<b>很小</b>。</div>
<div>两支表笔对调，二极管反向截止，电阻<b>很大</b>。两次读数差这么多，正说明二极管<b>具有单向导电性</b>；反过来也能用它判断二极管的正负极 —— 阻值小的那一次，黑表笔接的就是正极。</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask">用多用电表正确测量了一个 <Latex tex="13.0\ \Omega" /> 的电阻后，要接着测一个约 <Latex tex="2\ \text{k}\Omega" /> 的电阻。<br />在把红、黑表笔接到这个电阻两端之前，下面哪些操作是必需的？请按顺序写出来。</div>

<div class="stack-tight">
<div>A．用螺丝刀调节表盘下中间部位的指针定位螺丝，使表针指向"0"。</div>
<div>B．将红表笔和黑表笔接触。</div>
<div>C．把选择开关旋转到"<Latex tex="\times 1\ \text{k}" />"位置。</div>
<div>D．把选择开关旋转到"<Latex tex="\times 100" />"位置。</div>
<div>E．调节欧姆调零旋钮使表针指向欧姆零点。</div>
</div>

<div v-click="1" class="important-hint">必需且正确的顺序：<b>D → B → E</b>。先换挡（<Latex tex="\times 100" />），再短接，最后欧姆调零。</div>

<div v-click="2"><b>为什么不是 <Latex tex="\times 1\ \text{k}" />：</b>这台表欧姆挡的中值刻度是 15。<Latex tex="2\ \text{k}\Omega" /> 用 <Latex tex="\times 100" /> 挡读数是 20，正落在刻度盘的中间区域；用 <Latex tex="\times 1\ \text{k}" /> 挡读数只有 2，挤在 0 <Latex tex="\Omega" /> 那一头最密的地方。A 也不用做 —— 机械调零是实验开始前调一次的事。</div>
</div>

---
clicks: 2
---

# 用完以后

<div class="page-grow">
<div class="ask">测量结束，选择开关应该放在哪个位置？如果这只表根本没有 OFF 挡呢？</div>

<div v-click="1" class="stack">
<div>有 OFF 挡：旋到 <b>OFF</b>，表内电路断开，防止表笔短接耗电，也防止下次被别人误用。</div>
<div>没有 OFF 挡：旋到<b>交流电压最高挡</b>（这台表是 <Latex tex="250\ \text{V}\sim" />）。</div>
</div>

<div v-click="2" class="warn-hint">随手停在欧姆挡或小量程电流挡，下一次别人拿起来量电压，轻则打表、重则烧表。</div>
</div>

---
clicks: 1
---

# 实验：测量任务

<div class="page-grow">
<div class="ask">按刚才的流程把三个测量各做一遍，每次要记下什么？</div>

| 测量项目 | 所选挡位 / 倍率 | 表盘读数 | 测量结果 |
| --- | --- | --- | --- |
| 小灯泡两端电压 <Latex tex="U" /> | 直流电压 <Latex tex="\text{V}-" /> 挡 |  |  |
| 通过小灯泡的电流 <Latex tex="I" /> | 直流电流 <Latex tex="\text{mA}-" /> 挡 |  |  |
| 定值电阻 <Latex tex="R" /> | 欧姆挡 <Latex tex="\times" /> ____ |  |  |

<div v-click="1">欧姆挡那一行要分开记两栏：<b>表盘刻度值</b>和<b>倍率</b>，最后再乘起来；读数时让指针落在刻度盘的中间区域。</div>
</div>

---
clicks: 2
---

# 小结

<div class="page-grow">
<div class="stack">
<div v-click="1"><b>流程</b>　机械调零 → 选挡（功能 + 量程）→ 测量 → 读数 → 换挡重调零 → 用完拨 OFF（无 OFF 挡就拨交流最高挡）。</div>
<div v-click="1"><b>接法</b>　电压挡并联、红表笔接高电势；电流挡串联、电流从红表笔流入。合起来就一句：<b>红进黑出</b>。</div>
<div v-click="1"><b>欧姆挡两条硬规矩</b>　① 每换一次倍率都要重新短接调零；② 电阻值 = 刻度值 × 倍率，倍率按"指针落在中间区域"来选。</div>
<div v-click="1"><b>欧姆挡的极性</b>　表内电源正极接的是<b>黑表笔</b>，所以测二极管时黑表笔接二极管正极 —— 这时测出的电阻很小。</div>
</div>

<div v-click="2" class="tip-hint">量程永远先粗估再选，宁可先大后小；打完表再后悔就晚了。</div>
</div>
