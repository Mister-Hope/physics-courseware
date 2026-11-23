---
theme: default
title: 无线电波的发射和接收
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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "4.3"
chapter: 第四章 电磁振荡与电磁波
---

<CoverDecorationSvg />

---
title: 收音机里的声音从哪里来
---

<div class="page-grow rw-intro">
<div class="ask rw-intro-q">收音机里的声音，怎样从几十千米外的电台传来？</div>
<div class="rw-intro-grid">
<div class="rw-intro-item">
<mdi-radio-tower class="icon-md" />
<div class="rw-intro-text">怎样把电磁波送向远方？</div>
</div>
<div class="rw-intro-item">
<mdi-sine-wave class="icon-md" />
<div class="rw-intro-text">声音怎样搭到电磁波上？</div>
</div>
<div class="rw-intro-item">
<mdi-radio class="icon-md" />
<div class="rw-intro-text">怎样只取出一个电台？</div>
</div>
</div>
</div>

---
title: 有效发射的第一个条件
clicks: 2
clickAnimation: none
---

# 有效发射的第一个条件

<div class="page-grow">
<div class="ask">普通的 LC 振荡电路，能把电磁波有效地送向远方吗？</div>
<div class="stack" v-click="1">
<div class="summary-line">电场集中在电容器极板间，磁场集中在线圈内，辐射出去的电磁波很少。</div>
</div>
<div class="tip-hint" v-click="2">
<div>频率越高，振荡电路发射电磁波的本领越大。用振荡器产生很高频率的电磁振荡，才能有效地发射。</div>
<div class="rw-formula-line"><Latex tex="f=\dfrac{1}{2\pi\sqrt{LC}}" />，减小 <Latex tex="L" />、<Latex tex="C" /> 可以提高振荡频率。</div>
</div>
</div>

---
title: 开放电路
clicks: 2
clickAnimation: none
---

# 有效发射的第二个条件

<div class="page-grow">
<div class="ask">电场和磁场集中在电路内部，怎样让它们分散到尽可能大的空间？</div>
<OpenCircuitEvolve :step="$clicks" />
</div>

---
title: 实际的天线
clicks: 1
clickAnimation: none
---

# 实际的天线

<div class="page-grow">
<div class="ask">实际的发射装置中，线圈、地线和天线怎样连接？</div>
<AntennaRadiation :step="$clicks" />
</div>

---
title: 载波与调制
---

# 载波与调制

<div class="page-grow">
<div class="ask">声音信号不能直接有效地发射，怎样让高频电磁波带上声音？</div>
<DefinitionBox term="载波">用来携带信号的高频电磁波。</DefinitionBox>
<DefinitionBox term="调制">使载波随各种信号改变的技术。</DefinitionBox>
<div class="summary-line">调制让高频电磁波随信号改变，信息就随电磁波传向远方。</div>
</div>

---
title: 调幅与调频
clicks: 3
clickAnimation: none
---

# 调幅与调频

<div class="page-grow">
<div class="ask">同样是调制，调幅和调频改变的是载波的什么？</div>
<ModulationWaves :step="$clicks" />
</div>

---
title: 发射装置
clicks: 3
clickAnimation: none
---

# 发射装置

<div class="page-grow">
<div class="ask">发射装置由哪几部分组成？信号经过怎样的路径？</div>
<TransmitterChainSvg :step="$clicks" />
<div class="summary-line" v-click="3">振荡器产生高频载波，调制器把信号加到载波上，天线把已调波辐射出去。</div>
</div>

---
title: 接收天线与各种频率的电磁波
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="ask">空中有许多电台的电磁波，接收天线中的感应电流是什么样？</div>
<ReceivingSignalsSvg />
<div class="tip-hint" v-click="1">各种频率的感应电流混在一起，无法直接还原一个电台的声音。</div>
</div>

---
title: 电谐振与调谐
clicks: 1
clickAnimation: none
---

# 电谐振与调谐

<div class="page-grow">
<div class="ask">接收电路的固有频率与电磁波频率相同时，会发生什么？</div>
<div class="rw-figure-720"><TuningCircuitSvg /></div>
<div class="tip-hint" v-click="1">电谐振：接收电路中的振荡电流最强。改变电容 <Latex tex="C" />，使电路的固有频率与要接收的电磁波频率相同，这个过程叫调谐。</div>
</div>

---
title: 调谐选台
---

# 调谐选台

<div class="page-grow">
<TuningSelector />
</div>

---
title: 解调与检波
clicks: 2
clickAnimation: none
---

# 解调与检波

<div class="page-grow">
<div class="ask">怎样从已调波中把声音信号还原出来？</div>
<DemodulationWaves :step="$clicks" />
<div class="summary-line" v-click="2">解调是调制的逆过程；调幅波的解调也叫检波。</div>
</div>

---
title: 接收装置
clicks: 5
clickAnimation: none
---

# 接收装置

<div class="page-grow">
<div class="ask">接收装置由哪几部分组成？信号经过怎样的路径？</div>
<ReceiverChainSvg :step="$clicks" />
<div class="summary-line" v-click="5">天线接收电磁波，调谐选出所需频率，解调还原信号，放大后由扬声器发声。</div>
</div>

---
layout: exercise-split
title: 例题：卫星信号的波长
clicks: 3
clickAnimation: none
---

<template v-slot:stem>

<div>我国第一颗人造卫星用 <Latex tex="20.009\ \text{MHz}" /> 和 <Latex tex="19.995\ \text{MHz}" /> 的电磁波发送信号。<br />求这两种电磁波的波长。</div>

</template>

<div v-click="1">由 <Latex tex="c=\lambda f" /> 得 <Latex tex="\lambda=\dfrac{c}{f}" />。</div>

<div v-click="2"><Latex tex="\lambda_1=\dfrac{3.00\times10^8}{20.009\times10^6}\ \text{m}\approx14.99\ \text{m}" />，<Latex tex="\lambda_2=\dfrac{3.00\times10^8}{19.995\times10^6}\ \text{m}\approx15.00\ \text{m}" />。</div>

<div v-click="3" class="tip-hint">两种电磁波的波长都约为 <Latex tex="15\ \text{m}" />；频率越高，波长越短。</div>

---
layout: exercise-split
title: 例题：调谐电路选台
clicks: 3
zoom: 0.95
clickAnimation: none
---

<template v-slot:stem>

<div>有波长分别为 <Latex tex="290\ \text{m}" />、<Latex tex="397\ \text{m}" />、<Latex tex="566\ \text{m}" /> 的无线电波同时传向收音机接收天线。当把调谐电路频率调到 <Latex tex="756\ \text{kHz}" /> 时：(1) 哪种波长的无线电波在收音机中产生振荡电流最强？(2) 如果想接收 <Latex tex="290\ \text{m}" /> 的无线电波，应把调谐电路中可调电容器的电容调大一些还是调小一些？</div>

</template>

<div v-click="1">
<div class="rw-table rw-table-wide">
<div class="rw-table-row"><span>波长</span><span><Latex tex="290\ \text{m}" /></span><span><Latex tex="397\ \text{m}" /></span><span><Latex tex="566\ \text{m}" /></span></div>
<div class="rw-table-row"><span>频率</span><span><Latex tex="1034.5\ \text{kHz}" /></span><span><Latex tex="755.7\ \text{kHz}" /></span><span><Latex tex="530.0\ \text{kHz}" /></span></div>
</div>
</div>

<div v-click="2">(1) <Latex tex="397\ \text{m}" /> 的无线电波在收音机中产生振荡电流最强。</div>

<div v-click="3">(2) 要接收 <Latex tex="290\ \text{m}" /> 的电磁波，需提高调谐电路的固有频率。</div>
<div v-click="3">由 <Latex tex="f=\dfrac{1}{2\pi\sqrt{LC}}" />，应把电容 <Latex tex="C" /> 调小。</div>

---
layout: exercise-split
title: 例题：自制收音机的线圈
clicks: 2
clickAnimation: none
---

<template v-slot:stem>

<div>某同学自己绕制天线线圈，制作一个最简单的收音机，用来收听中波的无线电广播。他发现有一个频率最高的中波电台收不到，但可以接收其他中波电台。为了收到这个电台，他应该增加还是减少线圈的匝数？说明理由。</div>

</template>

<div v-click="1">频率最高的电台，对应的调谐频率也最高。</div>
<div v-click="1">由 <Latex tex="f=\dfrac{1}{2\pi\sqrt{LC}}" />，要接收它，必须减小调谐电路的 <Latex tex="L" /> 或 <Latex tex="C" />。</div>

<div v-click="2" class="tip-hint">线圈匝数越少，自感系数 <Latex tex="L" /> 越小，固有频率越高。因此应减少匝数。</div>

---
title: 电视广播
---

# 电视广播

<div class="page-grow">
<div class="ask">电视信号也是无线电信号，它怎样从摄像机走到家里的屏幕和扬声器？</div>
<div class="rw-tv-flow">
<div class="rw-tv-node"><mdi-video class="icon-md" /><b>摄像机</b><span>光信号 → 电信号</span></div>
<div class="rw-tv-arrow">→</div>
<div class="rw-tv-node"><mdi-sine-wave class="icon-md" /><b>调制</b><span>加载到高频载波上</span></div>
<div class="rw-tv-arrow">→</div>
<div class="rw-tv-node rw-tv-wide"><mdi-broadcast class="icon-md" /><b>传输</b><span>地面无线电 / 有线网络 / 卫星</span></div>
<div class="rw-tv-arrow">→</div>
<div class="rw-tv-node"><mdi-waveform class="icon-md" /><b>解调</b><span>还原图像和伴音信号</span></div>
<div class="rw-tv-arrow">→</div>
<div class="rw-tv-node"><mdi-monitor class="icon-md" /><b>显示设备</b><span>电信号 → 图像</span></div>
</div>
<div class="rw-tv-sound"><mdi-speaker class="icon-md" /><span>伴音信号经解调后送扬声器</span></div>
</div>

---
title: 无线电波的应用
---

# 无线电波的应用

<div class="page-grow">
<div class="ask">无线电波在生活和科技中有哪些应用？</div>
<div class="rw-app-grid">
<div class="rw-app-card"><mdi-radio class="icon-md" /><div><b>无线电广播</b><span>声音信号调制到高频载波上发射；收音机调谐、解调后发声。</span></div></div>
<div class="rw-app-card"><mdi-television class="icon-md" /><div><b>电视</b><span>图像和伴音信号调制后传输，接收端解调后显示和发声。</span></div></div>
<div class="rw-app-card"><mdi-radar class="icon-md" /><div><b>雷达</b><span>利用微波遇障碍物反射，测定物体位置；波长短，方向性好。</span></div></div>
<div class="rw-app-card"><mdi-cellphone class="icon-md" /><div><b>移动通信</b><span>手机把信息变成高频电信号发射，同时接收空中的电磁波。</span></div></div>
</div>
</div>

---
title: 调制、调幅、调频与解调
clicks: 3
clickAnimation: none
---

# 调制、调幅、调频与解调

<div class="page-grow">
<div class="ask">调制、调幅、调频、解调之间是什么关系？</div>
<div class="rw-concept">
<div class="rw-concept-main">调制</div>
<div class="rw-concept-split" v-click="1">→</div>
<div class="rw-concept-branches">
<div class="rw-concept-card" v-click="1"><b>调幅（AM）</b><span>载波的振幅随信号改变</span></div>
<div class="rw-concept-card" v-click="2"><b>调频（FM）</b><span>载波的频率随信号改变</span></div>
</div>
<div class="rw-concept-arrow" v-click="3">逆过程 →</div>
<div class="rw-concept-demod" v-click="3"><b>解调</b><span>从已调波中还原信号；调幅波的解调叫检波</span></div>
</div>
</div>

---
title: 发射与接收：一条完整的链路
---

# 发射与接收：一条完整的链路

<div class="page-grow">
<SystemOverviewSvg />
<div class="summary-line">发射端把信息调制到高频载波上，接收端调谐选出信号，再解调还原。</div>
</div>
