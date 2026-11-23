---
theme: default
title: "光的偏振 激光"
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
chapter-no: "4.6"
chapter: "第四章 光"
---

<div class="pz-cover">
<CoverDecorationSvg />
</div>

---
title: 立体电影的眼镜
clicks: 1
---

<div class="page-grow pz-intro">
<div class="ask-lead">看立体电影，为什么一定要戴特制的眼镜？<br>不戴，银幕上的画面就是模糊的。</div>
<div class="info-hint" v-click="1">左右两片镜片，是<b>透振方向互相垂直</b>的两块偏振片。</div>
</div>

---
clicks: 2
clickAnimation: none
---

# 横波的偏振

<div class="ask">沿同一方向传播的横波，振动方向都一样吗？</div>
<div class="figure pz-fig-slit">
<PolarizationSlitSvg :step="$clicks" />
</div>
<div class="tip-hint" v-click="2">横波的振动方向是有选择的：缝与振动方向垂直，波就过不去。这种现象叫作<b>偏振</b>；纵波没有偏振。</div>

---
clicks: 2
---

# 光是一种横波

<div class="page-grow">
<div class="ask">光波是横波吗？用什么检验？</div>
<div class="figure pz-fig-polar">
<PolarizerSvg />
</div>
<div class="pz-lead" v-click="1">偏振片只让沿<b>透振方向</b>振动的光通过，就像狭缝对绳波的作用。</div>
<div class="tip-hint" v-click="2">光能发生偏振，说明光是一种横波。</div></div>

---
clicks: 1
clickAnimation: none
---

# 两片偏振片

<div class="page-grow">
<div class="ask">在 P 后面再加一片 Q，转动 Q，透射光会怎样变化？</div>
<div class="figure pz-fig-pair">
<PolarizerPairSvg :step="$clicks" />
</div>
<div class="tip-hint" v-click="1">透振方向平行时，透射光最强；把 Q 转过 <Latex tex="90^\circ" /> 让两片垂直，就几乎没有光透过。</div></div>

---
clicks: 1
---

# 自然光与偏振光

<div class="page-grow">
<DefinitionBox term="自然光">
<div>太阳、日光灯等发出的光，包含沿垂直于传播方向的<b>一切方向</b>振动的光，各方向的强度相同。</div>
</DefinitionBox>
<DefinitionBox term="偏振光" tone="blue" v-click="1">
<div>只沿<b>某一个方向</b>振动的光。自然光通过偏振片后，就成了偏振光。</div>
</DefinitionBox>
</div>

---
clicks: 2
---

# 反射光也是偏振光

<div class="page-grow">
<div class="ask">只有偏振片才能产生偏振光吗？</div>
<div class="figure pz-fig-reflect">
<ReflectionPolarSvg />
</div>
<div class="pz-lead" v-click="1">自然光在玻璃、水面、木质桌面等表面反射时，<b>反射光和折射光都是偏振光</b>。</div>
<div class="info-hint" v-click="2">入射角不同，偏振的程度也不同——所以很多光都是不同程度的偏振光。</div></div>

---
clicks: 2
---

# 偏振的应用：摄影

<div class="page-grow pz-apps">
<div class="pz-lead" v-click="1">在镜头前加一片偏振滤光片，转到合适的方向，就能减弱水面、玻璃表面反射的光。</div>
<div class="pz-lead" v-click="2">水下的鱼、玻璃后面的景物，也就看得清楚了。</div>
</div>

---
clicks: 2
---

# 立体电影和偏振光

<div class="page-grow pz-apps">
<div class="pz-lead" v-click="1">两台摄影机从左右两个角度同时拍摄，模拟人的双眼；放映时，两束光的偏振方向互相垂直。</div>
<div class="tip-hint" v-click="2">观众戴上透振方向互相垂直的眼镜，每只眼睛只看到一幅画面，就有了立体感。</div>
</div>

---
clicks: 2
---

# 偏振的应用：太阳镜与液晶

<div class="page-grow pz-apps">
<div class="pz-lead" v-click="1">偏振太阳镜能滤掉水面、路面上反射的偏振光，减弱刺眼的光；它的透振方向通常沿竖直方向。</div>
<div class="pz-lead" v-click="2">液晶显示屏发出的光也是偏振光——透过偏振片看屏幕，转动镜片，会看到明暗变化。</div>
</div>

---
clicks: 2
---

# 激光的诞生

<div class="page-grow">
<div class="ask">普通光源的光，为什么不能做干涉实验？</div>
<div class="pz-lead" v-click="1">原子发光是随机的：频率、相位、振动方向各不相同，所以两个普通光源发出的光不能产生稳定的干涉。</div>
<div class="tip-hint" v-click="2">1960 年，美国物理学家梅曼造出第一台激光器：频率相同、相位差恒定、振动方向一致的光，叫作<b>激光</b>。</div>
</div>
---
clicks: 2
---

# 激光的三个特点

<div class="page-grow pz-feats">
<div class="pz-feat"><span class="pz-feat-no">1</span><span><b>相干性好</b>　频率相同、相位差恒定、振动方向一致，很容易观察到干涉、衍射现象。</span></div>
<div class="pz-feat" v-click="1"><span class="pz-feat-no">2</span><span><b>平行度好</b>　传播很远仍保持强度，几乎是一束平行光。</span></div>
<div class="pz-feat" v-click="2"><span class="pz-feat-no">3</span><span><b>亮度高</b>　能在很小的空间、很短的时间内集中很大的能量。</span></div>
</div>

---
clicks: 2
---

# 激光的应用

<div class="page-grow pz-feats">
<div class="pz-feat"><span class="pz-feat-no">1</span><span>相干性好：做双缝干涉、衍射实验，也用于全息照相。</span></div>
<div class="pz-feat" v-click="1"><span class="pz-feat-no">2</span><span>平行度好：激光测距——测出地月距离约 38 万千米，准确到厘米级。</span></div>
<div class="pz-feat" v-click="2"><span class="pz-feat-no">3</span><span>亮度高：切割、焊接、打孔；医学上用“光刀”做手术。</span></div>
</div>

---
title: 例题：光盘上的轨道为什么能做得很密
clicks: 2
---

<div class="page-grow">
<div class="pz-stem">光盘上记录信息的轨道可以做得很密，<Latex tex="1\ \text{mm}" /> 的宽度至少可以容纳 650 条轨道。这是应用了激光的什么特性？</div>
<div class="pz-lead" v-click="1">激光的<b>平行度好</b>：它可以会聚成很小的光斑，所以轨道能做得很密。</div>
<div class="tip-hint" v-click="2">读取时，这个光斑只覆盖很少的轨道，信息就能一条一条地读出来。</div>
</div>

---
title: 例题：为什么用偏振片做太阳镜
clicks: 2
---

<div class="page-grow">
<div class="pz-stem">市场上的太阳镜，镜片是偏振片。为什么不用普通的带色玻璃？镜片的透振方向应沿什么方向？</div>
<div class="pz-lead" v-click="1">偏振片能滤掉反射光中的偏振成分，比单纯降低亮度更能减弱水面、路面的眩光。</div>
<div class="tip-hint" v-click="2">透振方向应沿<b>竖直方向</b>——水面、路面反射的光，主要是水平方向振动的偏振光。</div>
</div>
---
clicks: 2
---

# 激光的能量有多集中

<div class="page-grow">
<div class="ask">一台红宝石巨脉冲激光器，发散角只有 <Latex tex="10^{-3}\ \text{rad}" />，每平方厘米的功率可达 <Latex tex="10^{9}\ \text{W}" />。这说明什么？</div>
<div class="pz-lead" v-click="1">激光的<b>亮度高</b>：把能量集中在极小的空间和极短的时间里，会聚处能产生几千万度的高温。</div>
<div class="tip-hint" v-click="2">因此可以用来切割、焊接最难熔的金属，也可以在医学上做“光刀”。</div>
</div>

---
title: 习题：激光是相干光源
clicks: 2
---

<div class="page-grow">
<div class="pz-stem">激光是相干光源。根据这个特点，可以利用激光做哪些事情？</div>
<div class="pz-lead" v-click="1">频率相同、相位差恒定、振动方向一致，才能产生稳定的干涉图样——所以激光能做双缝干涉、衍射实验。</div>
<div class="tip-hint" v-click="2">全息照相也利用激光的相干性：两束激光叠加，把物体的全部信息记录下来。</div>
</div>

---
clicks: 2
---

# 小结

<div class="page-grow pz-summary">
<div class="pz-sum-item"><b>偏振</b>　横波的振动方向有选择，纵波没有。光的偏振说明光是横波。</div>
<div class="pz-sum-item" v-click="1"><b>偏振光</b>　只沿一个方向振动。自然光通过偏振片、在表面反射后，都会变成偏振光。</div>
<div class="pz-sum-item" v-click="2"><b>激光</b>　相干性好、平行度好、亮度高——这三点决定了它的用途。</div>
</div>
