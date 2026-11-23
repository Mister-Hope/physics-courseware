---
theme: default
title: "光的干涉"
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
chapter-no: "4.3"
chapter: "第四章 光"
---

<CoverDecorationSvg />

---
title: 肥皂膜上的彩色条纹
clicks: 1
clickAnimation: none
---

<div class="page-grow">
<div class="ask-lead">肥皂膜上、雨后路面的油膜上，常常出现彩色的条纹。<br>这些条纹是怎样形成的？</div>
<div class="figure li-fig-film"><SoapFilmSvg /></div>
<div class="info-hint" v-click="1">薄膜前后两个表面反射的光叠加在一起——这正是一种光的干涉。</div>
</div>

---
title: 光也能发生干涉
clicks: 2
clickAnimation: none
---

# 光也能发生干涉

<div class="page-grow">
<div class="ask">机械波发生干涉，需要满足哪三个条件？</div>
<div class="li-conds" v-click="1">
<div class="li-cond"><span class="li-cond-tag">频率</span>两列波的频率相同</div>
<div class="li-cond"><span class="li-cond-tag">相位差</span>相位差保持恒定</div>
<div class="li-cond"><span class="li-cond-tag">振动方向</span>振动方向相同</div>
</div>
<div class="tip-hint" v-click="2">光是一种电磁波。满足这三个条件时，光也应该能发生干涉。</div>
</div>

---
title: 相干光源
clicks: 2
clickAnimation: none
---

# 相干光源

<div class="page-grow">
<div class="ask">两只相同的灯泡同时照亮屏幕，为什么看不到稳定的明暗条纹？</div>
<div class="li-lead" v-click="1">普通光源由大量原子各自独立发光，相位随时在变，不满足“相位差恒定”。</div>
<DefinitionBox term="相干光源" tone="gold" v-click="2">
<div>频率相同、相位差恒定、振动方向相同的两个光源。</div>
</DefinitionBox>
<div class="info-hint" v-click="2">把同一束光分成两束，它们来自同一列波，相位差始终恒定。</div>
</div>

---
title: 杨氏双缝干涉实验
clicks: 2
clickAnimation: none
---

# 杨氏双缝干涉实验

<div class="page-grow">
<div class="li-lead">1801 年，英国物理学家托马斯·杨用双缝观察到了光的干涉。</div>
<div class="figure li-fig-slit"><DoubleSlitSvg /></div>
<div class="info-hint" v-click="1">两条狭缝由同一列光照射，相当于两个频率、相位、振动方向都相同的波源。</div>
<div class="tip-hint" v-click="2">屏上明暗相间的条纹说明光发生了干涉——这有力地证明了光是一种波。</div>
</div>

---
title: 屏上为什么出现明暗条纹
clicks: 2
clickAnimation: none
---

# 屏上为什么出现明暗条纹

<div class="page-grow">
<div class="ask">两缝到屏上同一点的路程可能不同，路程差会带来什么？</div>
<div class="half-grid li-row li-row-wide">
<div class="figure li-fig-path"><PathDiffSvg :step="$clicks" /></div>
<div class="stack">
<div class="li-lead">P₀ 到两缝等距，波峰同时到达、相互加强——亮条纹。</div>
<div class="li-lead" v-click="1">P₁ 的路程差是半个波长：波峰遇到波谷，相互抵消——暗条纹。</div>
<div class="li-lead" v-click="2">P₂ 的路程差是一个波长：又相互加强——亮条纹。</div>
</div>
</div>
</div>

---
title: 明暗条纹的条件
clicks: 2
clickAnimation: none
---

# 明暗条纹的条件

<div class="page-grow">
<div class="ask">把两缝到屏上某点的距离之差，与波长比较，可以得到什么规律？</div>
<div class="half-grid li-row">
<div class="li-rule li-rule-bright" v-click="1">
<div class="li-rule-title">亮条纹</div>
<div class="li-rule-formula"><Latex tex="\Delta r = n\lambda" /></div>
<div class="li-rule-note">路程差是半波长的偶数倍</div>
</div>
<div class="li-rule li-rule-dark" v-click="2">
<div class="li-rule-title">暗条纹</div>
<div class="li-rule-formula"><Latex tex="\Delta r = (2n+1)\dfrac{\lambda}{2}" /></div>
<div class="li-rule-note">路程差是半波长的奇数倍</div>
</div>
</div>
<div class="tip-hint" v-click="2"><Latex tex="n = 0, \pm 1, \pm 2, \cdots" />；路程差为 0 时，屏中央也是亮条纹。</div>
</div>

---
title: 条纹间距与波长
clicks: 3
clickAnimation: none
---

# 条纹间距与波长

<div class="page-grow">
<div class="half-grid li-row li-row-wide">
<div class="figure li-fig-geom"><FringeGeometrySvg /></div>
<div class="li-derive">
<div>两缝间距 <Latex tex="d" />，缝到屏的距离 <Latex tex="l" />，屏上一点离中心 <Latex tex="x" />。</div>
<div v-click="1">路程差 <Latex tex="r_2 - r_1 = d\sin\theta" />；又 <Latex tex="x = l\tan\theta \approx l\sin\theta" />。</div>
<div v-click="2">消去 <Latex tex="\sin\theta" />：<Latex tex="r_2 - r_1 = \dfrac{d}{l}x" />。</div>
<div v-click="3">亮条纹位置 <Latex tex="x = n\dfrac{l}{d}\lambda" />，相邻条纹间距 <Latex tex="\Delta x = \dfrac{l}{d}\lambda" />。</div>
</div>
</div>
</div>

---
title: 不同色光的条纹
clicks: 2
clickAnimation: none
---

# 不同色光的条纹

<div class="page-grow">
<div class="ask">其他条件不变，换用不同颜色的光，条纹会怎样变化？</div>
<div class="figure li-fig-color"><ColorFringesSvg /></div>
<div class="li-lead" v-click="1">条纹间距与波长成正比：红光波长最长，条纹间距最大；黄光较小，蓝光更小。</div>
<div class="info-hint" v-click="2">用白光照射，各色光的亮条纹位置不同、相互交错，屏上就出现彩色条纹。</div>
</div>

---
title: 算一算：条纹间距
clicks: 1
clickAnimation: none
---

# 算一算：条纹间距

<div class="page-grow">
<div class="ask">调一调波长和双缝间距，条纹间距怎样变化？</div>
<FringeSpacingExplorer />
<div class="tip-hint" v-click="1">条纹间距与波长成正比、与双缝间距成反比——这正是 <Latex tex="\Delta x = \dfrac{l}{d}\lambda" />。</div>
</div>

---
title: 例题：亮条纹还是暗条纹
clicks: 2
clickAnimation: none
---

<div class="page-grow">
<div class="problem">在双缝干涉实验中，屏上某点 P 到双缝 S₁、S₂ 的路程差为 <Latex tex="7.5 \times 10^{-7}\ \text{m}" />。用频率为 <Latex tex="6.0 \times 10^{14}\ \text{Hz}" /> 的光照射双缝，P 点出现的是亮条纹还是暗条纹？</div>
<div class="li-lead" v-click="1">先求波长：<Latex tex="\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{6.0 \times 10^{14}}\ \text{m} = 5.0 \times 10^{-7}\ \text{m}" />。</div>
<div class="li-lead" v-click="2">路程差 <Latex tex="7.5 \times 10^{-7}\ \text{m} = 1.5\lambda" />，是半波长的奇数倍，所以出现暗条纹。</div>
</div>

---
title: 例题：声波的干涉
clicks: 2
clickAnimation: none
---

# 例题：声波的干涉

<div class="page-grow">
<div class="problem">两个振动完全相同的声源发出波长 <Latex tex="0.6\ \text{m}" /> 的声波。观察者 A 到两声源的距离分别为 <Latex tex="4.5\ \text{m}" /> 和 <Latex tex="5.4\ \text{m}" />；观察者 B 分别为 <Latex tex="4.3\ \text{m}" /> 和 <Latex tex="5.5\ \text{m}" />。两人听到的声音大小有什么区别？</div>
<div class="li-table" v-click="1">
<div class="li-tr li-th"><div>观察者</div><div>路程差</div><div>与波长的关系</div></div>
<div class="li-tr"><div>A</div><div><Latex tex="0.9\ \text{m}" /></div><div><Latex tex="1.5\lambda" />，声音较弱</div></div>
<div class="li-tr"><div>B</div><div><Latex tex="1.2\ \text{m}" /></div><div><Latex tex="2\lambda" />，声音较强</div></div>
</div>
<div class="tip-hint" v-click="2">光和声都是波：路程差是波长整数倍时相互加强，是半波长奇数倍时相互削弱。</div>
</div>

---
title: 薄膜干涉
clicks: 2
clickAnimation: none
---

# 薄膜干涉

<div class="page-grow">
<div class="ask">肥皂膜前后两个表面都能反射光，这两束反射光叠加会发生什么？</div>
<div class="half-grid li-row li-row-wide">
<div class="figure li-fig-film2"><ThinFilmSvg /></div>
<div class="stack">
<div class="li-lead" v-click="1">同一束光在液膜前、后两个表面反射，两束反射光叠加——这就是薄膜干涉。</div>
<div class="li-lead" v-click="2">液膜不同位置厚度不同，两束反射光的路程差就不同：有的地方加强，有的地方削弱。</div>
</div>
</div>
</div>

---
title: 肥皂膜上的彩色条纹
clicks: 2
clickAnimation: none
---

# 肥皂膜上的彩色条纹

<div class="page-grow">
<div class="li-lead">不同颜色的光波长不同，由 <Latex tex="\Delta x = \dfrac{l}{d}\lambda" /> 的形式可知：加强的位置随波长而变。</div>
<div class="li-lead" v-click="1">同一处液膜，对红光加强的位置，对蓝光可能正好削弱；各色光的亮纹相互交错。</div>
<div class="tip-hint" v-click="2">所以，白光照射下的肥皂膜、油膜上，会出现彩色的条纹。</div>
</div>

---
title: 薄膜干涉的应用
clicks: 2
clickAnimation: none
---

# 薄膜干涉的应用

<div class="page-grow">
<div class="figure li-fig-coat"><CoatingSvg /></div>
<div class="li-lead" v-click="1">在光学元件表面镀一层特定厚度的薄膜：使反射光相互削弱，就能增加透射（增透膜）；使反射光相互加强，就能增加反射（增反膜）。</div>
<div class="info-hint" v-click="2">利用薄膜干涉，还可以检测镜面、光学平面的平滑度。</div>
</div>

---
title: 例题：劈尖干涉
clicks: 2
clickAnimation: none
---

# 例题：劈尖干涉

<div class="page-grow">
<div class="problem">两块平板玻璃之间夹入两张纸片，形成一个劈形空气薄膜。抽去一张纸片后，从上往下看到的干涉条纹会怎样变化？</div>
<div class="half-grid li-row li-row-wide">
<div class="figure li-fig-wedge"><WedgeSvg :step="$clicks" /></div>
<div class="stack">
<div class="li-lead" v-click="1">相邻明（暗）条纹对应的薄膜厚度差恒定；抽去一张纸片，劈角变小。</div>
<div class="li-lead" v-click="2">厚度变化得更慢，相邻条纹的水平间距变大——条纹变疏。</div>
</div>
</div>
</div>

---
title: 科学漫步：光的本性
clicks: 3
clickAnimation: none
---

# 科学漫步：光的本性

<div class="page-grow">
<div class="li-lead">17 世纪：牛顿支持微粒说，惠更斯提出波动说，两种学说都能解释部分现象。</div>
<div class="li-lead" v-click="1">19 世纪初：观察到光的干涉、衍射现象，波动说取得胜利。</div>
<div class="li-lead" v-click="2">19 世纪 60 年代：麦克斯韦预言光是电磁波，赫兹用实验证实。</div>
<div class="li-lead" v-click="3">20 世纪初：光电效应无法用波动说解释，爱因斯坦提出光子说。现在人们认识到，光具有波粒二象性。</div>
</div>

---
title: 小结
clicks: 3
clickAnimation: none
---

# 小结

<div class="page-grow">
<div class="li-lead">1. 相干光源：频率相同、相位差恒定、振动方向相同。把同一束光分成两束，就能得到相干光源。</div>
<div class="li-lead" v-click="1">2. 明暗条纹的条件：<Latex tex="\Delta r = n\lambda" /> 出现亮条纹；<Latex tex="\Delta r = (2n+1)\dfrac{\lambda}{2}" /> 出现暗条纹。</div>
<div class="li-lead" v-click="2">3. 条纹间距 <Latex tex="\Delta x = \dfrac{l}{d}\lambda" />：与波长成正比，与双缝间距成反比。</div>
<div class="li-lead" v-click="3">4. 薄膜干涉：薄膜前后两个表面反射的光叠加，形成明暗（彩色）条纹；可用于增透、增反和检测平面。</div>
</div>
