---
theme: default
title: "复合场与配速法"
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
chapter-no: "1.x"
chapter: "第一章 安培力与洛伦兹力"
lesson: "习题课"
---

<CoverDecor />

---
clicks: 2
---

<div class="ask text-xl">在方向垂直纸面向里的匀强磁场中，一个质量为 <Latex tex="m" />、电荷量为 <Latex tex="+q" /> 的微粒从静止释放，它会怎样运动？</div>

<div class="qp-page">

<ReleaseInField :reveal="$clicks >= 1" />

<div v-click="2">

静止释放时只有重力、竖直下落；一旦有了速度，洛伦兹力就把轨迹向右侧拉弯；速度方向一变，洛伦兹力的方向又跟着变。

<div class="tip-hint">速度决定力、力又反过来改变速度，方程<b>自相耦合</b>，高中手段解不动。</div>

</div>

</div>

---
clicks: 3
---

# 把速度分解成匀速直线分量与匀速圆周分量

<div class="page-grow">

<ForceSplitDemo :step="$clicks" />

</div>

---
clicks: 2
---

# 用一个恒定分速度抵消重力

<div class="qp-page" style="--page-gap:.5rem;--hint-pad-y:.5rem">

<div>只要取 <Latex tex="f_{\text{平}} = mg" />，也就是 <Latex tex="qv_{\text{平}}B = mg" />：</div>

<Latex tex="v_{\text{平}} = \dfrac{mg}{qB} \quad (\text{方向水平向右})" display />

<div v-click="1">这个速度是<b>恒定</b>的，所以由它产生的洛伦兹力 <Latex tex="f_{\text{平}}" /> 也恒定：<b>永远竖直向上、大小恰好等于 <Latex tex="mg" /></b>。于是</div>

<div v-click="1">

<Latex tex="F_{\text{合}} = \underbrace{mg\downarrow + f_{\text{平}}\uparrow}_{=0} + f_{\text{圆}} = f_{\text{圆}}" display />

</div>

<div v-click="2" class="tip-hint">重力被 <Latex tex="f_{\text{平}}" /> 一分一秒地抵消掉，剩下的合力 <Latex tex="f_{\text{圆}}" /> 永远垂直于 <Latex tex="v_{\text{圆}}" />、大小恒定 ⟹ 这一部分必定是<b>匀速圆周运动</b>。</div>

</div>

---
clicks: 2
---

# 初态怎么匹配

<div class="qp-page">

<div>释放瞬间真实速度为 <Latex tex="0" />，而 <Latex tex="v_{\text{实}} = v_{\text{平}} + v_{\text{圆}0}" />：取一个向右的 <Latex tex="v_{\text{平}}" />，就必须同时取一个<b>等大、水平向左</b>的 <Latex tex="v_{\text{圆}0}" />。</div>

<div v-click="1" class="half-grid">

<div>

<div class="mini-title"><mdi-arrow-right-bold /> 匀速直线分运动</div>

<Latex tex="v_{\text{平}} = \dfrac{mg}{qB}" display />

方向水平向右，决定整体的漂移。

</div>

<div class="divider-l">

<div class="mini-title"><mdi-sync /> 匀速圆周分运动</div>

<Latex tex="v_{\text{圆}0} = v_{\text{平}} = \dfrac{mg}{qB}" display />

初速度水平向左，逆时针转动。

</div>

</div>

<div v-click="2">
半径 <Latex tex="R = \dfrac{mv_{\text{圆}0}}{qB} = \dfrac{m^2 g}{q^2 B^2}" />，周期 <Latex tex="T = \dfrac{2\pi m}{qB}" />（与速度无关）。
</div>

</div>

---
clicks: 3
---

# 两个分运动合成：摆线

<div class="qp-page">

<!-- 教师口径：点一下画面即暂停/继续（组件内置，不占页面点击节奏） -->
<CycloidRolling :show-initial="$clicks >= 1" :show-extremes="$clicks >= 3" />

<div v-click="1">一边以 <Latex tex="v_{\text{平}}" /> 匀速向右漂移，一边绕圆心以 <Latex tex="v_{\text{圆}}" /> 匀速转圈 —— 两者叠加才是真实速度。</div>

<div v-click="3" class="tip-hint">尖点处两分速度反向 ⟹ <Latex tex="v = 0" />、合力只剩 <Latex tex="mg" />；最低点同向 ⟹ <Latex tex="v_{\max} = 2v_{\text{平}}" />。</div>

</div>

---
clicks: 2
---

# 极值与能量验证

<div class="qp-page">

<div class="half-grid">

<div>

<div class="mini-title"><mdi-arrow-collapse-down /> 下落的最大深度</div>

<Latex tex="h_{\max} = 2R = \dfrac{2m^2 g}{q^2 B^2}" display />

就是圆周运动的<b>直径</b>。

</div>

<div class="divider-l">

<div class="mini-title"><mdi-chart-timeline-variant /> 最低点的最大速度</div>

<Latex tex="v_{\max} = 2v_{\text{平}} = \dfrac{2mg}{qB}" display />

两个分速度在这里<b>同向叠加</b>。

</div>

</div>

<div v-click="1">用动能定理复核一遍：<Latex tex="\Delta E_k = \dfrac{1}{2}m v_{\max}^2 = \dfrac{1}{2}m (2v_{\text{平}})^2 = 2mv_{\text{平}}^2" />；重力做功 <Latex tex="W_G = mgh_{\max} = mg\cdot 2R = 2mv_{\text{平}}^2" />，两者自洽。</div>

<div v-click="2" class="tip-hint">全过程只需 <Latex tex="v_{\text{平}} = \dfrac{mg}{qB}" /> 一个量，深度、最大速度、周期全都由它和 <Latex tex="R" /> 直接读出，不必解方程。</div>

</div>

---
clicks: 1
---

# 什么时候能用，什么时候不能用

<div class="qp-page" style="--page-gap:.5rem;--hint-pad-y:.5rem">

<div class="stack">

<div class="mini-title"><mdi-target /> 判据只有一条</div>

<div>用一个<b>恒定的分速度</b>去抵消外力 —— 只看一件事：<b><Latex tex="F_{\text{外}}" /> 与 <Latex tex="qB" /> 的比值是否恒定</b>。</div>

<Latex tex="v_{\text{平}} = \dfrac{F_{\text{外}}}{qB}" display />

</div>

<div class="stack">

<div>常见模型里 <Latex tex="q" /> 不变 —— 重力 <Latex tex="mg" /> 配匀强磁场 <Latex tex="B" /> 是最典型的一例。</div>

<div class="mini-note">磁场不再匀强时，这个比值随位置改变，无法保持恒定。</div>

</div>

<div v-click="1" class="warn-hint">两分速率各自不变，但夹角在变 ⟹ <b>总动能 ≠ 两分动能之和</b>（差交叉项 <Latex tex="m\,v_{\text{平}}\cdot v_{\text{圆}}" />）。</div>

</div>

---

<!-- 方法小结页：内容少 ⟹ 按设计系统放大字号、把版面铺满（原先只占上半页） -->
<div class="qp-page" style="--page-gap:1.4rem;justify-content:center">

<div class="page-grow flex flex-col justify-center" style="gap:1.5rem;font-size:1.35em;line-height:1.7">

<div class="flex items-start gap-4">
<mdi-numeric-1-circle class="icon-xl text-accent shrink-0" />
<div>恒定磁场 <Latex tex="B" /> ＋ 恒定外力 <Latex tex="F_{\text{外}}" />：用一个<b>恒定的分速度</b>造出一个恒定的洛伦兹力去抵消它 —— 能不能抵消，只看 <Latex tex="F_{\text{外}}/qB" /> 是否恒定。</div>
</div>

<div class="flex items-start gap-4">
<mdi-numeric-2-circle class="icon-xl text-accent shrink-0" />
<div>抵消掉之后，把剩下的那一部分<b>单独拿出来</b>，看它自己怎么演化（这里就是匀速圆周）。</div>
</div>

<div class="tip-hint" style="font-size:1em">处理这类问题的出发点：<b>先把恒力"消掉"，再看剩下的运动</b>。</div>

</div>

</div>

---
layout: focus-question
---

<template v-slot:icon>

<mdi-help-circle-outline class="icon-xl" />

</template>

<div class="text-5xl leading-normal">如果给小球一个初速度，接下来该怎么算？</div>

<template v-slot:hint>

初速度可以是<b>任意方向</b> —— 不只是水平向右或向左，也可能斜向右上、竖直向上……

</template>

---
clicks: 1
---

<div class="page-grow">

<InitialSpeedVariants />

</div>

---
layout: base-flex
zoom: 0.9
---

<div class="qp-page" style="font-size: .84em">

<div>

**例 6** 如图，水平地面上有一辆小车，车上固定一根竖直光滑绝缘细管，管长 <Latex tex="L=\dfrac{2v_0^2}{9g}" />。管底有一个质量为 <Latex tex="m" />、电荷量为 <Latex tex="+q" /> 的绝缘小球 <Latex tex="A" />（直径略小于细管）。管口所在水平面 <Latex tex="MN" /> 的<b>下方</b>有垂直纸面向里的匀强磁场。小车始终以速度 <Latex tex="v_0" /> 向右匀速运动；以小球刚经过磁场的竖直边界为计时起点，以此时刻管口处为坐标原点 <Latex tex="O" /> 建立 <Latex tex="xOy" /> 坐标系（<Latex tex="y" /> 轴与磁场边界重合）。小球刚离开管口时竖直向上的分速度 <Latex tex="v_y=\dfrac{2}{3}v_0" />。求：

</div>

<div class="half-grid items-center">

<div class="stack stack-tight">

<div>(1) 匀强磁场的磁感应强度大小和绝缘管对小球做的总功；</div>

<div>(2) 小球经过 <Latex tex="x" /> 轴时的坐标；</div>

<div>(3) 若第一象限存在与第四象限大小和方向都相同的匀强磁场，同时绝缘管内均匀紧密排满了大量相对绝缘管静止、与小球 <Latex tex="A" /> 完全相同的绝缘小球（不考虑小球之间的相互静电力），求能达到纵坐标 <Latex tex="y=\dfrac{9v_0^2}{16g}" /> 的小球个数与总小球个数的比值。</div>

</div>

<div class="divider-l qp-fig">

<CartTubeField />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.25fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 6（1）</b>　管内的匀加速：求 <Latex tex="B" /> 与管做的功</div>

<div v-click="1">竖直方向受力恒定 ⟹ 球在管内<b>匀加速</b>上升：<Latex tex="qv_0B-mg=ma" />。由 <Latex tex="v_y^2=2aL" /> 得 <Latex tex="a=g" />，于是 <Latex tex="qv_0B=2mg" />，<Latex tex="B=\dfrac{2mg}{qv_0}" />。</div>

<div v-click="2">洛伦兹力不做功，用<b>动能定理</b>：<Latex tex="W-mgL=\dfrac{1}{2}mv_y^2" />，得 <Latex tex="W=mgL+\dfrac{1}{2}mv_y^2=\dfrac{4}{9}mv_0^2" /> —— 这正是管壁弹力随管前进做的功 <Latex tex="qv_0B\,L" />。</div>

</div>

<div class="qp-fig qp-fig-center">

<CartTubeField :step="$clicks" />

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.25fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 6（2）</b>　小球经过 <Latex tex="x" /> 轴时的坐标</div>

<div v-click="1">在管内：<Latex tex="t_1=\dfrac{v_y}{g}=\dfrac{2v_0}{3g}" />，出管口时 <Latex tex="x_1=v_0t_1=\dfrac{2v_0^2}{3g}" /> —— 这是第一次经过 <Latex tex="x" /> 轴。</div>

<div v-click="2">管口以上<b>没有磁场</b>，只受重力：球以 <Latex tex="(v_0,\ \tfrac{2}{3}v_0)" /> 斜抛，空中时间 <Latex tex="t_2=\dfrac{2v_y}{g}=\dfrac{4v_0}{3g}" />，再次经过 <Latex tex="x" /> 轴时 <Latex tex="x=x_1+v_0t_2=\dfrac{2v_0^2}{g}" />，坐标为 <Latex tex="\left(\dfrac{2v_0^2}{g},\ 0\right)" />。</div>

</div>

<div class="qp-fig qp-fig-center">

<CartTubeField :step="$clicks + 1" />

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.25fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.6rem;font-size:.92em">

<div><b>例 6（3）</b>　管内排满小球：谁能到 <Latex tex="y=9v_0^2/(16g)" />？</div>

<div v-click="1">管内每个球的受力都与 <Latex tex="A" /> 相同（<Latex tex="qv_0B=2mg" /> 向上、<Latex tex="mg" /> 向下）⟹ 每个球都以 <Latex tex="a=g" /> 上升、彼此不挤压。离管口深度 <Latex tex="h" /> 的球出管口时 <Latex tex="v_y^2=2gh" />。</div>

<div v-click="2">出管口后用<b>配速法</b>：分出一个水平向右的分速度 <Latex tex="v_0/2" />，它的洛伦兹力 <Latex tex="qv_0B/2=mg" /> 恰好抵消重力；剩下的部分做匀速圆周（半径 <Latex tex="\rho=uv_0/(2g)" />），圆心恒在 <Latex tex="y=v_0^2/(4g)" />，最高点就是圆顶。</div>

</div>

<div class="qp-fig qp-fig-center">

<TubeBallsReach :step="$clicks" />

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.25fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.6rem;font-size:.92em">

<div><b>例 6（3）</b>　临界深度与比值</div>

<div v-click="1">圆顶要够到 <Latex tex="y=9v_0^2/(16g)" />：<Latex tex="v_0^2/(4g)+\rho\geqslant 9v_0^2/(16g)" /> ⟹ <Latex tex="\rho\geqslant 5v_0^2/(16g)" /> ⟹ <Latex tex="v_y\geqslant 3v_0/8" />。由 <Latex tex="v_y^2=2gh" /> 得 <Latex tex="h\geqslant 9v_0^2/(128g)=81L/256" />。</div>

<div v-click="2">小球在管内均匀排布 ⟹ 够得着的是<b>下面那一段</b>，比值 <Latex tex="(L-h_{\min})/L=175/256" />。</div>

<div v-click="2" class="tip-hint" style="font-size:.88em">另一条路：把洛伦兹力的水平冲量<b>微元累加</b>（<Latex tex="\Delta p_x=-qB\,\Delta y" />），得 <Latex tex="v_x=v_0-(2g/v_0)y" />，再配合动能定理，最高点公式与配速法一致。</div>

</div>

<div class="qp-fig qp-fig-center">

<TubeBallsReach :step="$clicks + 2" />

</div>

</div>


---
layout: base-flex
---

<div class="qp-page">

<div class="split-wide" style="--cols: minmax(0, 1fr) minmax(0, 1.18fr);align-items:center;flex:1 1 auto;min-height:0">

<div class="stack stack-tight" style="gap:.75rem;font-size:.95em">

<div><b>例 7</b>　如图，平面直角坐标系 <Latex tex="xOy" /> 中，第 I 象限内存在沿 <Latex tex="y" /> 轴负方向的匀强电场，场强大小为 <Latex tex="E" />；第 II、III、IV 象限内均存在垂直纸面向外的匀强磁场，磁感应强度大小为 <Latex tex="B" />。一质量为 <Latex tex="m" />、电荷量为 <Latex tex="+q" /> 的粒子（不计重力）从 <Latex tex="y" /> 轴正半轴上的 <Latex tex="P(0, b)" /> 点以水平向右的初速度 <Latex tex="v_0" /> 射入第一象限，经 <Latex tex="x" /> 轴上的 <Latex tex="Q(a, 0)" /> 点进入第四象限。</div>

<div>(1) 求电场强度 <Latex tex="E" /> 的大小；</div>

<div>(2) 粒子在磁场中运动，最后回到 <Latex tex="y" /> 轴正半轴时，速度方向与 <Latex tex="y" /> 轴正半轴的夹角小于 <Latex tex="90^\circ" />，求磁感应强度 <Latex tex="B" /> 的取值范围。</div>

</div>

<div class="qp-fig qp-fig-center">

<QuadrantFieldDeflect />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 7（1）</b>　第一象限内是类平抛</div>

<div v-click="1">水平方向匀速：<Latex tex="v_0 t_1 = a" />，得 <Latex tex="t_1 = \dfrac{a}{v_0}" />；竖直方向初速度为零、受力恒为 <Latex tex="qE" />，于是 <Latex tex="b = \dfrac{1}{2}\cdot\dfrac{qE}{m}\,t_1^2" />。</div>

<div v-click="2">代入 <Latex tex="t_1" /> 解得 <Latex tex="E = \dfrac{2mb v_0^2}{q a^2}" />。</div>

<div v-click="2" class="tip-hint" style="font-size:.9em">类平抛就是“水平跑完 <Latex tex="a" />、竖直落下 <Latex tex="b" />”：水平匀速定时间，竖直匀加速定场强。</div>

</div>

<div class="qp-fig qp-fig-center">

<QuadrantFieldDeflect :step="1" />

</div>

</div>

---
clicks: 3
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 7（2）</b>　到 <Latex tex="Q" /> 点的速度与圆周半径</div>

<div v-click="1">过 <Latex tex="Q" /> 时：<Latex tex="v_x = v_0" />，<Latex tex="v_y = \dfrac{qE}{m}t_1 = \dfrac{2b v_0}{a}" />，故 <Latex tex="v = \dfrac{v_0}{a}\sqrt{a^2+4b^2}" />，<Latex tex="\sin\theta = \dfrac{2b}{\sqrt{a^2+4b^2}}" />。</div>

<div v-click="2">正电荷、<Latex tex="B" /> 垂直纸面向外 ⟹ 洛伦兹力指向速度右侧 ⟹ <b>顺时针</b>圆周运动，<Latex tex="R = \dfrac{mv}{qB}" />，圆心 <Latex tex="C(a - R\sin\theta,\ -R\cos\theta)" />。</div>

<div v-click="3">要能绕到第 II、III 象限再回到 <Latex tex="y" /> 轴，圆与 <Latex tex="x" /> 轴的另一个交点必须落在 <Latex tex="x" /> 轴负半轴：<Latex tex="x_2 = a - 2R\sin\theta < 0" /> ⟹ <Latex tex="R > \dfrac{a}{2\sin\theta}" />，即 <Latex tex="B < \dfrac{4mb v_0}{q a^2}" />。</div>

</div>

<div class="qp-fig qp-fig-center">

<QuadrantFieldDeflect :step="$clicks === 0 ? 1 : 2" />

</div>

</div>

---
clicks: 3
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.6rem;font-size:.92em">

<div><b>例 7（2）</b>　回到 <Latex tex="y" /> 轴时的速度方向</div>

<div v-click="1">回到 <Latex tex="+y" /> 轴处，速度是顺时针轨迹的切线：<b>水平分量向右</b>。要与 <Latex tex="+y" /> 轴夹角小于 <Latex tex="90^\circ" />，竖直分量必须<b>向上</b>，即圆心横坐标 <Latex tex="x_C = a - R\sin\theta > 0" />。</div>

<div v-click="2">于是 <Latex tex="R < \dfrac{a}{\sin\theta}" />，即 <Latex tex="B > \dfrac{2mb v_0}{q a^2}" />。</div>

<div v-click="3" class="tip-hint" style="font-size:.9em">综合两条：<Latex tex="\dfrac{2mb v_0}{q a^2} < B < \dfrac{4mb v_0}{q a^2}" />，即 <Latex tex="\dfrac{E}{v_0} < B < \dfrac{2E}{v_0}" />。两端都取不到：一个回到原点，一个夹角恰为 <Latex tex="90^\circ" />。</div>

</div>

<div class="qp-fig qp-fig-center">

<QuadrantFieldDeflect :step="$clicks === 0 ? 2 : 3" />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div class="split-wide" style="--cols: minmax(0, 1.1fr) minmax(0, 0.9fr);align-items:center;flex:1 1 auto;min-height:0">

<div class="stack stack-tight" style="gap:1.1rem;font-size:.95em">

<div><b class="ex-no">例 8</b>（多选）如图所示，左、右边界分别为 <Latex tex="PP'" />、<Latex tex="QQ'" /> 的匀强磁场的宽度为 <Latex tex="d" />，磁感应强度大小为 <Latex tex="B" />，方向垂直于纸面向里。一个质量为 <Latex tex="m" />、电荷量为 <Latex tex="q" /> 的粒子从 <Latex tex="PP'" /> 边界上的某处沿图示方向以速度 <Latex tex="v_0" /> 垂直于磁场方向射入磁场。欲使粒子不能从边界 <Latex tex="QQ'" /> 射出，粒子入射速度 <Latex tex="v_0" /> 的最大值可能是（　　）</div>

<div class="ex-options">

<div><b>A.</b> <Latex tex="\dfrac{Bqd}{m}" /></div>
<div><b>B.</b> <Latex tex="\dfrac{(2+\sqrt2)Bqd}{m}" /></div>
<div><b>C.</b> <Latex tex="\dfrac{(2-\sqrt2)Bqd}{m}" /></div>
<div><b>D.</b> <Latex tex="\dfrac{\sqrt2qBd}{2m}" /></div>

</div>

</div>

<div class="qp-fig qp-fig-center">

<BoundaryFieldTangency />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.25fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.6rem;font-size:.92em">

<div><b>例 8（一）</b>　若粒子带正电：圆心在 <Latex tex="PP'" /> 左侧</div>

<div v-click="1">速度斜向右上，洛伦兹力指向左上方，轨迹向左上方弯曲；<Latex tex="v_0" /> 越大、半径越大，轨迹向右伸得越远。轨迹恰与 <Latex tex="QQ'" /> 相切时，<Latex tex="v_0" /> 最大。</div>

<div v-click="2">设轨迹半径为 <Latex tex="R_1" />，相切时圆心到 <Latex tex="QQ'" /> 的距离等于半径：<Latex tex="R_1\sin45^\circ + d = R_1" />，得 <Latex tex="R_1 = (2+\sqrt2)d" />。由 <Latex tex="R_1 = \dfrac{mv_0}{qB}" /> 得 <Latex tex="v_0 = \dfrac{(2+\sqrt2)Bqd}{m}" />，对应 B。</div>

</div>

<div class="qp-fig qp-fig-center">

<BoundaryFieldTangency mode="positive" :step="$clicks" />

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.25fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.6rem;font-size:.92em">

<div><b>例 8（二）</b>　若粒子带负电：圆心在 <Latex tex="PP'" /> 右侧</div>

<div v-click="1">洛伦兹力指向右下方，轨迹向右下方弯曲，圆心 <Latex tex="O'" /> 落在磁场内。同样是轨迹右端与 <Latex tex="QQ'" /> 相切时 <Latex tex="v_0" /> 最大。</div>

<div v-click="2">设半径为 <Latex tex="R_2" />，相切时仍有 <Latex tex="R_2 + R_2\cos45^\circ = d" />，得 <Latex tex="R_2 = (2-\sqrt2)d" />，故 <Latex tex="v_0 = \dfrac{(2-\sqrt2)Bqd}{m}" />，对应 C。答案选 <b class="text-accent">BC</b>。</div>

</div>

<div class="qp-fig qp-fig-center">

<BoundaryFieldTangency mode="negative" :step="$clicks" />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div class="split-wide" style="--cols: minmax(0, 1.18fr) minmax(0, 0.82fr);align-items:center;flex:1 1 auto;min-height:0">

<div class="stack stack-tight" style="gap:1.1rem;font-size:.92em">

<div><b class="ex-no">例 9</b>　如图所示，在 <Latex tex="xOy" /> 平面的第 I、IV 象限内有一圆心为 <Latex tex="O" />、半径为 <Latex tex="R" /> 的半圆形匀强磁场（边界无磁场），线状粒子源从 <Latex tex="y" /> 轴左侧平行于 <Latex tex="x" /> 轴正方向不断射出质量为 <Latex tex="m" />、电荷量为 <Latex tex="q" />、速度大小为 <Latex tex="v_0" /> 的带正电的粒子。磁场的磁感应强度大小为 <Latex tex="\dfrac{mv_0}{2qR}" />、方向垂直于平面 <Latex tex="xOy" /> 向里。不考虑粒子间的相互作用，不计粒子受到的重力。所有从不同位置进入磁场的粒子中，在磁场中运动的时间最长为（　　）</div>

<div class="ex-options">

<div><b>A.</b> <Latex tex="\dfrac{\pi R}{6v_0}" /></div>
<div><b>B.</b> <Latex tex="\dfrac{\pi R}{4v_0}" /></div>
<div><b>C.</b> <Latex tex="\dfrac{\pi R}{3v_0}" /></div>
<div><b>D.</b> <Latex tex="\dfrac{\pi R}{2v_0}" /></div>

</div>

</div>

<div class="qp-fig qp-fig-center">

<SemicircleFieldTime />

</div>

</div>

</div>

---
clicks: 3
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1.05fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 9</b>　圆心角越大，运动时间越长</div>

<div v-click="1">由 <Latex tex="qv_0B = m\dfrac{v_0^2}{r}" /> 和 <Latex tex="B = \dfrac{mv_0}{2qR}" /> 得 <Latex tex="r = 2R" />。周期 <Latex tex="T = \dfrac{2\pi r}{v_0}" /> 与速度无关，运动时间只由轨迹对应的圆心角 <Latex tex="\alpha" /> 决定：<Latex tex="t = \dfrac{\alpha}{2\pi}T" />。</div>

<div v-click="2">入射速度水平，轨迹圆心 <Latex tex="O'" /> 必在 <Latex tex="y" /> 轴上。设出射点的横坐标为 <Latex tex="x_E" />，则 <Latex tex="\sin\alpha = \dfrac{x_E}{r}" />；出射点在半径为 <Latex tex="R" /> 的边界圆上，<Latex tex="x_E \leqslant R" />，故 <Latex tex="\sin\alpha \leqslant \dfrac{R}{2R} = \dfrac12" />。</div>

<div v-click="3">等号在出射点落在 <Latex tex="x" /> 轴上时取到：<Latex tex="\alpha_{\max} = \dfrac{\pi}{6}" />，于是 <Latex tex="t_{\max} = \dfrac{T}{12} = \dfrac{\pi R}{3v_0}" />，选 C。</div>

</div>

<div class="qp-fig qp-fig-center">

<SemicircleFieldTime :step="$clicks" />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div class="split-wide" style="--cols: minmax(0, 1.08fr) minmax(0, 0.92fr);align-items:center;flex:1 1 auto;min-height:0">

<div class="stack stack-tight" style="gap:1.1rem;font-size:.95em">

<div><b class="ex-no">例 10</b>　如图所示，以直角三角形 <Latex tex="AOC" /> 为边界的匀强磁场区域中，磁感应强度为 <Latex tex="B" />，<Latex tex="CO = 2L" />，<Latex tex="AO = L" />。在 <Latex tex="O" /> 点放置一个粒子源，同时向磁场内各个方向均匀发射某种带正电的粒子（不计重力和粒子间的相互作用），粒子的比荷为 <Latex tex="\dfrac{q}{m}" />，发射速度大小都为 <Latex tex="v_0" />。</div>

<div>(1) 若 <Latex tex="v_0 = \dfrac{2qBL}{m}" />，沿 <Latex tex="OA" /> 方向射入的带电粒子经磁场偏转后从 <Latex tex="D" /> 点射出 <Latex tex="AC" /> 边界，求 <Latex tex="AD" /> 的长度；</div>

<div>(2) 若带电粒子能够经过 <Latex tex="C" /> 点，求 <Latex tex="v_0" /> 的取值范围。</div>

</div>

<div class="qp-fig qp-fig-center">

<TriangleFieldPass />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.6rem;font-size:.92em">

<div><b>例 10（1）</b>　沿 <Latex tex="OA" /> 射入：圆心恰是 <Latex tex="C" /></div>

<div v-click="1"><Latex tex="v_0 = \dfrac{2qBL}{m}" /> 时，<Latex tex="r = \dfrac{mv_0}{qB} = 2L" />。沿 <Latex tex="OA" /> 射入时洛伦兹力指向 <Latex tex="CO" /> 方向，圆心在 <Latex tex="CO" /> 上；而 <Latex tex="CO = 2L = r" />，所以 <Latex tex="C" /> 就是轨迹圆心。</div>

<div v-click="2"><Latex tex="CD" /> 为半径，<Latex tex="CD = 2L" />；又 <Latex tex="AC = \sqrt{AO^2 + CO^2} = \sqrt5 L" />，故 <Latex tex="AD = AC - CD = (\sqrt5 - 2)L" />。</div>

</div>

<div class="qp-fig qp-fig-center">

<TriangleFieldPass mode="part1" :step="$clicks" />

</div>

</div>

---
clicks: 3
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1fr) minmax(0, 1.18fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.5rem;font-size:.92em">

<div><b>例 10（2）</b>　要经过 <Latex tex="C" />：轨迹与 <Latex tex="AC" /> 相切于 <Latex tex="C" /></div>

<div v-click="1">轨迹要同时过 <Latex tex="O" />、<Latex tex="C" />，又不能先穿出 <Latex tex="AC" />。临界情形：轨迹与 <Latex tex="AC" /> 相切于 <Latex tex="C" />，粒子恰好从 <Latex tex="C" /> 射出。</div>

<div v-click="2">圆心 <Latex tex="X" /> 在 <Latex tex="OC" /> 的中垂线上，且 <Latex tex="CX \perp AC" />。设 <Latex tex="M" /> 为 <Latex tex="OC" /> 中点，<Latex tex="CM = L" />，则 <Latex tex="\angle XCM = 90^\circ - \angle C" />，在 Rt <Latex tex="\triangle XMC" /> 中 <Latex tex="\sin\angle C = \dfrac{CM}{CX} = \dfrac{L}{r}" />。</div>

<div v-click="3">而 <Latex tex="\sin\angle C = \dfrac{AO}{AC} = \dfrac{1}{\sqrt5}" />，得 <Latex tex="r = \sqrt5 L" />，<Latex tex="v_0 = \dfrac{\sqrt5 qBL}{m}" />。半径再大，轨迹更平缓、仍能到 <Latex tex="C" />，故 <Latex tex="v_0 \geqslant \dfrac{\sqrt5 qBL}{m}" />。</div>

</div>

<div class="qp-fig qp-fig-center">

<TriangleFieldPass mode="part2" :step="$clicks" />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div class="split-wide" style="--cols: minmax(0, 1.16fr) minmax(0, 0.84fr);align-items:center;flex:1 1 auto;min-height:0">

<div class="stack stack-tight" style="gap:1.1rem;font-size:.92em">

<div><b class="ex-no">例 11</b>　如图所示，在水平面内存在半径为 <Latex tex="2R" /> 和半径为 <Latex tex="R" /> 的两个同心圆，半径为 <Latex tex="R" /> 的小圆和半径为 <Latex tex="2R" /> 的大圆之间形成一环形区域。小圆和环形区域内分别存在垂直于水平面、方向相反的匀强磁场，小圆内匀强磁场的磁感应强度大小为 <Latex tex="B" />。位于圆心处的粒子源 <Latex tex="S" /> 沿水平面向各个方向发射速率为 <Latex tex="\dfrac{qBR}{m}" /> 的带正电的粒子，粒子的电荷量为 <Latex tex="q" />、质量为 <Latex tex="m" />。为了将所有粒子束缚在半径为 <Latex tex="2R" /> 的圆内，环形区域的磁感应强度大小至少为（　　）</div>

<div class="ex-options">

<div><b>A.</b> <Latex tex="B" /></div>
<div><b>B.</b> <Latex tex="\dfrac45B" /></div>
<div><b>C.</b> <Latex tex="\dfrac53B" /></div>
<div><b>D.</b> <Latex tex="\dfrac43B" /></div>

</div>

</div>

<div class="qp-fig qp-fig-center">

<ConcentricFieldConfine />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 0.95fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.6rem;font-size:.92em">

<div><b>例 11（一）</b>　小圆内：出射方向与半径成 <Latex tex="30^\circ" /></div>

<div v-click="1">小圆内轨迹半径 <Latex tex="r_0 = \dfrac{mv}{qB} = R" />。轨迹圆过 <Latex tex="S" />，与边界圆交于出射点 <Latex tex="A" />。</div>

<div v-click="2">设轨迹圆心为 <Latex tex="S_1" />，则 <Latex tex="SS_1 = S_1A = SA = R" />，<Latex tex="\triangle SS_1A" /> 是等边三角形，<Latex tex="\angle S_1AS = 60^\circ" />。出射速度垂直于 <Latex tex="S_1A" />，故与半径 <Latex tex="SA" /> 成 <Latex tex="30^\circ" />：所有粒子都如此。</div>

</div>

<div class="qp-fig qp-fig-center">

<ConcentricFieldConfine mode="inner" :step="$clicks" />

</div>

</div>

---
clicks: 3
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1fr) minmax(0, 1.18fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.5rem;font-size:.92em">

<div><b>例 11（二）</b>　环形区域内：轨迹圆恰与大圆相切</div>

<div v-click="1">环形区域内磁场反向，轨迹反向弯曲、向外凸出。所有粒子进入环形区域时都与半径成 <Latex tex="30^\circ" />，各条轨迹只是彼此旋转的复制，所以"轨迹圆与大圆相切"就是最强的约束。</div>

<div v-click="2">设环内轨迹半径为 <Latex tex="r" />、圆心为 <Latex tex="O_2" />。相切时 <Latex tex="OO_2 = 2R - r" />；在 <Latex tex="\triangle OAO_2" /> 中，<Latex tex="OA = R" />，<Latex tex="AO_2 = r" />，<Latex tex="\angle OAO_2 = 90^\circ + 30^\circ = 120^\circ" />。</div>

<div v-click="3">由余弦定理 <Latex tex="(2R - r)^2 = R^2 + r^2 - 2Rr\cos120^\circ" />，得 <Latex tex="3R^2 = 5Rr" />，即 <Latex tex="r = \dfrac{3R}{5}" />。由 <Latex tex="r = \dfrac{mv}{qB'}" /> 得 <Latex tex="B' = \dfrac{5mv}{3qR} = \dfrac53 B" />，选 C。</div>

</div>

<div class="qp-fig qp-fig-center">

<ConcentricFieldConfine mode="annulus" :step="$clicks" />

</div>

</div>

---
layout: base-flex
---

<div class="qp-page">

<div><b class="ex-no">例 12</b>（多选）如图所示，匀强磁场的磁感应强度大小为 <Latex tex="B" />，方向垂直于 <Latex tex="xOy" /> 平面向外。某时刻一个质子从点 <Latex tex="(L_0, 0)" /> 处沿 <Latex tex="y" /> 轴负方向进入磁场；一个 <Latex tex="\alpha" /> 粒子同时从点 <Latex tex="(-L_0, 0)" /> 进入磁场，速度方向在 <Latex tex="xOy" /> 平面内。设质子的质量为 <Latex tex="m" />、电荷量为 <Latex tex="e" />，不计质子和 <Latex tex="\alpha" /> 粒子的重力以及它们之间的相互作用。若 <Latex tex="\alpha" /> 粒子第一次到达原点时恰能与质子相遇，已知质子和 <Latex tex="\alpha" /> 粒子都带正电，且 <Latex tex="\alpha" /> 粒子的质量是质子质量的 4 倍、<Latex tex="\alpha" /> 粒子带的电荷量是质子的 2 倍，则（　　）</div>

<div class="half-grid items-center">

<div class="ex-options">

<div><b>A.</b> 质子的速度大小为 <Latex tex="\dfrac{2eBL_0}{m}" /></div>
<div><b>B.</b> 质子的速度大小为 <Latex tex="\dfrac{eBL_0}{2m}" /></div>
<div><b>C.</b> 两粒子相遇时，<Latex tex="\alpha" /> 粒子运动的时间可能是 <Latex tex="\dfrac{3\pi m}{eB}" /></div>
<div><b>D.</b> 两粒子相遇时，<Latex tex="\alpha" /> 粒子运动的时间可能是 <Latex tex="\dfrac{5\pi m}{2eB}" /></div>

</div>

<div class="divider-l qp-fig">

<DualParticleMeet />

</div>

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 12（一）</b>　质子过原点：半径只能是 <Latex tex="L_0/2" /></div>

<div v-click="1">质子带正电、<Latex tex="B" /> 垂直纸面向外 ⟹ 沿<b>顺时针</b>做圆周运动，圆心在 <Latex tex="(L_0 - r_p,\ 0)" />。要与 <Latex tex="\alpha" /> 粒子在原点相遇，原点必须在质子轨迹上：<Latex tex="|L_0 - r_p| = r_p" />，得 <Latex tex="r_p = \dfrac{L_0}{2}" />。</div>

<div v-click="2">由 <Latex tex="r_p = \dfrac{mv_p}{eB}" /> 得 <Latex tex="v_p = \dfrac{eBL_0}{2m}" />，B 对、A 错。质子每转一圈经过原点一次，时刻为 <Latex tex="t_p = (2n+1)\dfrac{\pi m}{eB}" />（<Latex tex="n = 0, 1, 2, \cdots" />）。</div>

</div>

<div class="qp-fig qp-fig-center">

<DualParticleMeet mode="proton" :step="$clicks" />

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 12（二）</b>　<Latex tex="\alpha" /> 粒子：两条镜像路径</div>

<div v-click="1"><Latex tex="\alpha" /> 粒子带正电、<Latex tex="B" /> 向外 ⟹ 也顺时针转；从 <Latex tex="(-L_0, 0)" /> 出发又经过原点的圆有两个（圆心在弦 <Latex tex="(-L_0,0)O" /> 的中垂线两侧），对应「先向右上」和「先向左上」两种入射方向。</div>

<div v-click="2">设轨迹圆心角为 <Latex tex="\theta" />、半径为 <Latex tex="r_\alpha" />，则弦长 <Latex tex="L_0 = 2r_\alpha\sin\dfrac{\theta}{2}" />。两条路径的圆心角一个小于 <Latex tex="\pi" />、一个大于 <Latex tex="\pi" />；具体数值由「与质子相遇」的时间条件定。</div>

</div>

<div class="qp-fig qp-fig-center">

<DualParticleMeet mode="alpha" :step="$clicks" />

</div>

</div>

---
clicks: 2
---

<div class="split-wide qp-solve" style="--cols: minmax(0, 1fr) minmax(0, 1.2fr);--hint-pad-y:.5rem">

<div class="stack stack-tight" style="gap:.55rem;font-size:.92em">

<div><b>例 12（三）</b>　用「同时到达」定出 <Latex tex="\theta" /> 与 <Latex tex="r_\alpha" /></div>

<div v-click="1"><Latex tex="\alpha" /> 粒子的周期 <Latex tex="T_\alpha = \dfrac{2\pi\cdot 4m}{2eB} = \dfrac{4\pi m}{eB}" />，运动时间 <Latex tex="t_\alpha = \dfrac{\theta}{2\pi}T_\alpha = \dfrac{2\theta m}{eB}" />。相遇要求 <Latex tex="t_\alpha = t_p" />，即 <Latex tex="2\theta = (2n+1)\pi" />；又 <Latex tex="0 < \theta < 2\pi" />，故 <Latex tex="\theta = \dfrac{\pi}{2}" /> 或 <Latex tex="\dfrac{3\pi}{2}" />。</div>

<div v-click="2">代回弦长关系得 <Latex tex="r_\alpha = \dfrac{L_0}{2\sin(\theta/2)} = \dfrac{L_0}{\sqrt2}" />；于是 <Latex tex="t_\alpha = \dfrac{\pi m}{eB}" /> 或 <Latex tex="\dfrac{3\pi m}{eB}" />（后者对应质子第二次经过原点）。所以 C 对、D 错，答案选 <b class="text-accent">BC</b>。</div>

</div>

<div class="qp-fig qp-fig-center">

<DualParticleMeet mode="alpha" :step="$clicks + 2" />

</div>

</div>
