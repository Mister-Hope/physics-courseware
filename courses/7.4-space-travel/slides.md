---
theme: default
title: "宇宙航行"
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
chapter-no: "7.4"
chapter: "第七章 万有引力与宇宙航行"
subtitle: 宇宙速度 · 人造地球卫星 · 载人航天与太空探索
---

<CoverDecorationSvg />

---
clicks: 2
---

<div class="page-grow">
<div class="split-wide">
<div class="stack">
<div class="ask ask-lead">牛顿设想：把物体从高山上水平抛出，速度一次比一次大，落地点就一次比一次远……抛出速度足够大时，物体还会落回地面吗？</div>
<div class="key key-lead" v-click="2">速度足够大，物体就不再落回地面，成为绕地球运动的人造卫星。<b>这个速度究竟有多大？</b></div>
</div>
<div class="figure" v-click="1"><NewtonCannonVisionSvg /></div>
</div>
</div>

---
clicks: 3
---

# 第一宇宙速度

<div class="page-grow">
<div class="ask ask-lead">卫星为什么不会掉下来？是什么力让它在圆轨道上一直转？</div>
<div class="text-xl" v-click="1">物体在地球附近绕地球运动时，太阳的作用可以忽略——它只受到指向地心的引力，运动可以看作匀速圆周运动。</div>
<div class="text-xl" v-click="2">万有引力提供向心力：<Latex tex="G\dfrac{m m_{\text{地}}}{r^2} = m\dfrac{v^2}{r}" />，由此解出 <Latex tex="v = \sqrt{\dfrac{G m_{\text{地}}}{r}}" />。</div>
<div class="key" v-click="3">近地卫星取 <Latex tex="r \approx R = 6.40\times10^{6}\ \text{m}" />、<Latex tex="m_{\text{地}} = 5.98\times10^{24}\ \text{kg}" />，代入上式：<Latex tex="v = \sqrt{\dfrac{6.67\times10^{-11}\times5.98\times10^{24}}{6.40\times10^{6}}}\ \text{m/s} = 7.9\ \text{km/s}" />，这就是<b>第一宇宙速度</b>。</div>
</div>

---
clicks: 3
---

# 用重力算第一宇宙速度

<div class="page-grow">
<div class="ask ask-lead">有人说，第一宇宙速度也可以用 <Latex tex="v = \sqrt{gR}" /> 算出，你认为正确吗？</div>
<div class="text-xl" v-click="1">近地卫星离地面很近，可以认为向心力就是重力：<Latex tex="mg = m\dfrac{v^2}{R}" />，同样解出 <Latex tex="v = \sqrt{gR}" />。</div>
<div class="text-xl" v-click="2">代入 <Latex tex="g = 9.8\ \text{m/s}^2" />、<Latex tex="R = 6.40\times10^{6}\ \text{m}" />：<Latex tex="v = \sqrt{9.8\times6.40\times10^{6}}\ \text{m/s} = 7.9\ \text{km/s}" />——与用万有引力算出的结果一致。</div>
<div class="key" v-click="3">两条路都对：近地卫星受到的引力就近似等于重力。所以 <Latex tex="7.9\ \text{km/s}" /> 既是近地卫星的环绕速度，也是发射人造地球卫星的<b>最小发射速度</b>。</div>
</div>

---
clicks: 1
---

# 抛出速度与轨道

<div class="page-grow">
<div class="ask">把抛出速度从 <Latex tex="4\ \text{km/s}" /> 一路加到 <Latex tex="12\ \text{km/s}" />，轨迹会怎样变化？</div>
<NewtonCannonLab />
<div class="key" v-click="1">发射速度决定轨道形状——速度足够大，物体就不再落回地面，成为人造地球卫星。</div>
</div>

---
clicks: 2
---

# 三个宇宙速度

<div class="page-grow">
<div class="ask">发射速度继续增大，飞行器的去向会有什么不同？</div>
<CosmicVelocityScale />
<div class="three-col" v-click="1">
<div class="stack-tight">
<div class="mini-title"><mdi-orbit />第一宇宙速度</div>
<div class="text-xl"><Latex tex="v_1 = 7.9\ \text{km/s}" /></div>
<div class="mini-note">环绕地球做圆周运动</div>
</div>
<div class="stack-tight">
<div class="mini-title"><mdi-rocket-launch-outline />第二宇宙速度</div>
<div class="text-xl"><Latex tex="v_2 = 11.2\ \text{km/s}" /></div>
<div class="mini-note">克服地球引力，离开地球</div>
</div>
<div class="stack-tight">
<div class="mini-title"><mdi-star-shooting-outline />第三宇宙速度</div>
<div class="text-xl"><Latex tex="v_3 = 16.7\ \text{km/s}" /></div>
<div class="mini-note">挣脱太阳引力，飞出太阳系</div>
</div>
</div>
<div class="key" v-click="2"><Latex tex="7.9 \sim 11.2\ \text{km/s}" />：绕地球的椭圆；<Latex tex="11.2\ \text{km/s}" />：脱离地球；<Latex tex="16.7\ \text{km/s}" />：飞出太阳系。</div>
</div>

---
clicks: 1
---

# 人造地球卫星

<div class="page-grow">
<div class="ask">卫星的轨道半径越大，它的线速度和周期会怎样变化？</div>
<SatelliteOrbitLab />
<div class="key" v-click="1">轨道半径越大，线速度越小、周期越长。地球同步卫星的轨道平面与赤道平面重合、转动方向与地球自转相同，离地约 <Latex tex="3.6\times10^{4}\ \text{km}" />、<Latex tex="T = 24\ \text{h}" />，相对地面静止。</div>
</div>

---
clicks: 2
---

# 载人航天与太空探索

<div class="page-grow">
<div class="ask">人类第一次进入太空、第一次登上月球、我国的第一次载人飞行，分别在什么时候？</div>
<div v-click="1"><SpaceTimelineAxis /></div>
<div v-click="2"><b>世界</b>：1957-10-04 第一颗人造地球卫星升空；1961-04-12 加加林乘东方一号绕地球飞行一圈后返回；1969-07-20 阿姆斯特朗踏上月球。</div>
<div v-click="2"><b>中国</b>：1970-04-24 “东方红一号”发射成功；2003-10-15 神舟五号把杨利伟送入太空，中国成为能够独立开展载人航天活动的国家；2022-12-02 中国空间站开启长期有人驻留。</div>
</div>

---
clicks: 3
---

# 探月与深空探测

<div class="page-grow">
<div class="ask">月球背面、月球采样、火星着陆——我国分别是用什么任务实现的？</div>
<div class="split-wide">
<div class="stack">
<div class="step-item" v-click="2"><span class="step-no">1</span><span><mdi-moon-waning-crescent /> 嫦娥四号（2019-01-03）实现人类航天器首次月球背面软着陆与巡视探测。</span></div>
<div class="step-item" v-click="2"><span class="step-no">2</span><span><mdi-test-tube /> 嫦娥五号（2020-12-01）着陆月球并采样返回，带回月球样品 1731 g。</span></div>
<div class="step-item" v-click="2"><span class="step-no">3</span><span><mdi-robot-outline /> 天问一号（2021-05-15）着陆火星，祝融号火星车开展巡视探测。</span></div>
</div>
<div class="figure" v-click="1"><LunarMarsSvg /></div>
</div>
<div class="key" v-click="3">我国探月工程完成了“绕、落、回”三步走；首次火星探测就一次实现了“绕、着、巡”。</div>
</div>

---
# 课堂小结

<div class="page-grow">
<div class="summary-line"><mdi-orbit /> 第一宇宙速度 <Latex tex="7.9\ \text{km/s}" />：近地圆轨道的环绕速度，也是最小的发射速度；第二宇宙速度 <Latex tex="11.2\ \text{km/s}" />：脱离地球；第三宇宙速度 <Latex tex="16.7\ \text{km/s}" />：飞出太阳系。</div>
<div class="summary-line"><mdi-satellite-variant /> 轨道半径越大，线速度越小、周期越长：近地卫星 <Latex tex="T \approx 85\ \text{min}" />，同步卫星离地约 <Latex tex="3.6\times10^{4}\ \text{km}" />、<Latex tex="T = 24\ \text{h}" /> 且相对地面静止。</div>
<div class="summary-line"><mdi-rocket-launch-outline /> 发射速度决定轨道：等于 <Latex tex="7.9\ \text{km/s}" /> 是圆，<Latex tex="7.9 \sim 11.2\ \text{km/s}" /> 是椭圆，达到 <Latex tex="11.2\ \text{km/s}" /> 就永远离开地球。</div>
<div class="key">万有引力提供向心力 <Latex tex="G\dfrac{m m_{\text{地}}}{r^2} = m\dfrac{v^2}{r}" />——这是“天上”和“地上”共用的规律。</div>
<div class="mini-note">“地球是人类的摇篮，但是人类不会永远生活在摇篮里。”</div>
</div>
