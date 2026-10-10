---
theme: default
title: "运动学综合应用"
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
chapter: 第二章 匀变速直线运动的研究
lesson: 习题课
---

<CoverDecorationSvg />

---
clicks: 0
---

# 相遇追击问题

<div class="page-grow">
<div class="half-grid">
<div class="stack-tight">
<div class="problem">平直公路上，乙车在甲车正前方 <Latex tex="d" /> 处。某时刻甲车以初速度 <Latex tex="v_0" />、加速度 <Latex tex="a_1" /> 向右做匀变速直线运动；同时乙车由静止开始以加速度 <Latex tex="a_2" /> 向右做匀加速直线运动。</div>

<div class="qitem"><b>?</b><span>运动过程中两车可能相遇 0 次、1 次、2 次——分别对应 <Latex tex="a_1" /> 的什么条件？</span></div>
</div>

<div class="fig fig-car">
<TwoCarsMeetingSvg />
</div>
</div>
</div>

---
clicks: 4
---

# 位移相等就是一个二次方程

<div class="page-grow">
<div class="ask">"相遇"用位移写出来是什么方程？什么时候"解不出来"，什么时候"解出两个"？</div>

<div class="step" v-click="1"><b>①</b><span>位移相等：<Latex tex="v_0t + \tfrac{1}{2}a_1t^2 = d + \tfrac{1}{2}a_2t^2" /></span></div>

<div class="step" v-click="2"><b>②</b><span>整理成关于 <Latex tex="t" /> 的一元二次方程：<Latex tex="\tfrac{1}{2}(a_2 - a_1)t^2 - v_0t + d = 0" /></span></div>

<div class="step" v-click="3"><b>③</b><span>判别式 <Latex tex="\Delta = v_0^2 - 2(a_2 - a_1)d" /></span></div>

<div class="key" v-click="4">判别式只看"有几个根"，还要看"根是不是正的"——只有 <Latex tex="t>0" /> 的根才真的追上过。</div>
</div>

---
clicks: 4
---

# 三种情况

<div class="page-grow">
<div class="ask">把 <Latex tex="\Delta" /> 与两根的正负讨论完，得到三条判据——先自己写写看。</div>

<div class="step" v-click="1"><b>2 次</b><span><Latex tex="\Delta > 0" /> 且两根都为正 ⇔ <Latex tex="a_2 - \dfrac{v_0^2}{2d} < a_1 < a_2" />（追上一次、再被反超一次）</span></div>

<div class="step" v-click="2"><b>1 次</b><span><Latex tex="a_1 \ge a_2" />（方程退化为一次，只有一个正根）或 <Latex tex="a_1 = a_2 - \dfrac{v_0^2}{2d}" />（判别式为 0，恰好相切）</span></div>

<div class="step" v-click="3"><b>0 次</b><span><Latex tex="a_1 < a_2 - \dfrac{v_0^2}{2d}" />（<Latex tex="\Delta < 0" />，还没追上就被重新拉开）</span></div>

<div class="key" v-click="4">分界线只有两条：相切线 <Latex tex="a_1 = a_2 - \dfrac{v_0^2}{2d}" /> 与退化线 <Latex tex="a_1 = a_2" />。</div>
</div>

---
clicks: 0
---

# 调甲的加速度，数交点

<div class="page-grow">
<MeetCountModel />
</div>

---
---

# 三车同时刹车

<div class="page-grow">
<div class="problem">在同一直线的平直车道上，甲、乙、丙三车依次同向行驶（<b>丙在最前、乙在中间、甲在最后</b>），相邻两车的间距均为 <Latex tex="d = 5\ \text{m}" />。某时刻三车的速度分别为 <Latex tex="v_\text{丙} = 6\ \text{m/s}" />（最前）、<Latex tex="v_\text{乙} = 8\ \text{m/s}" />（中间）、<Latex tex="v_\text{甲} = 9\ \text{m/s}" />（最后）。此时甲车以 <Latex tex="a_\text{甲} = 1\ \text{m/s}^2" /> 制动；为避免追尾，乙、丙两车同时开始制动，且汽车停止后不会倒车。</div>

<div class="qitem"><b>?</b><span>求乙车、丙车制动加速度大小<b>应该满足的条件</b>——"恰好不追尾"的两条界线各在哪里？</span></div>
</div>

---

<div class="page-grow">
<div class="ask">拖两个滑块：乙、丙各刹多狠，车距才能始终为正？</div>

<BrakeAvoidModel />
</div>

---
clicks: 4
---

# 刹车陷阱

<div class="page-grow">
<div class="ask">套公式解出"两车相遇"的时刻，这个时刻一定有意义吗？</div>

<div class="step" v-click="1"><b>陷阱</b><span>匀减速公式只在"还没停下"的这段时间成立；车停下后停在原地，不会反向加速。把解出的 <Latex tex="t" /> 代回去得到<b>负速度</b>，说明公式被用过了头。</span></div>

<div class="step" v-click="2"><b>本题</b><span>照"速度相等时恰好接触"算甲–乙的临界：<Latex tex="a_\text{乙} = 1 - \dfrac{1^2}{2 \times 5} = 0.9\ \text{m/s}^2" />，对应的接触时刻是 <Latex tex="t = \dfrac{\Delta v}{\Delta a} = \dfrac{1}{0.1} = 10.0\ \text{s}" />——可甲车 <Latex tex="9.0\ \text{s}" /> 就停了（代回去 <Latex tex="v_\text{甲} = -1.0\ \text{m/s}" />），这是个假解。</span></div>

<div class="step" v-click="3"><b>正确做法</b><span>先算每辆车的刹停时间 <Latex tex="t_\text{停} = v_0/a" />；解出的 <Latex tex="t > t_\text{停}" /> 就改用<b>停下来的位置</b>判断：甲停在 <Latex tex="x = \dfrac{9^2}{2 \times 1} = 40.5\ \text{m}" />，乙必须停在它后面 ⇒ <Latex tex="5 + \dfrac{8^2}{2a_\text{乙}} \ge 40.5" /> ⇒ <Latex tex="a_\text{乙} \le \dfrac{32}{35.5} \approx 0.901\ \text{m/s}^2" />（与 0.9 只差一点，但意义完全不同）。</span></div>

<div class="key" v-click="4">刹车问题的第一句话永远是：这段时间里，它停了吗？</div>
</div>

---
clicks: 5
---

# 乙、丙的制动：两条界线

<div class="page-grow">
<div class="step" v-click="1"><b>①</b><span>乙不能追尾丙：乙要比丙多刹 <Latex tex="\dfrac{(8-6)^2}{2 \times 5} = 0.4\ \text{m/s}^2" /> ⇒ <Latex tex="a_\text{乙} \ge a_\text{丙} + 0.4" />（<b>下限</b>）。</span></div>

<div class="step" v-click="2"><b>②</b><span>甲也不能追尾乙：甲要比乙多刹 <Latex tex="\dfrac{(9-8)^2}{2 \times 5} = 0.1\ \text{m/s}^2" />，而甲给定 1 ⇒ <Latex tex="a_\text{乙} \le 1 - 0.1 = 0.9\ \text{m/s}^2" />（<b>上限</b>）。</span></div>

<div class="step" v-click="3"><b>③</b><span>两条合起来：<Latex tex="a_\text{丙} + 0.4 \le a_\text{乙} \le 0.9" />，于是 <Latex tex="a_\text{丙} \le 0.5\ \text{m/s}^2" />。</span></div>

<div class="step" v-click="4"><b>④</b><span>最小值：最前的丙可以不制动（<Latex tex="a_\text{丙} = 0" />），此时乙最少 <Latex tex="0.4\ \text{m/s}^2" />；最大值（恰好不撞）：乙 <Latex tex="0.9" />、丙 <Latex tex="0.5\ \text{m/s}^2" />。</span></div>

<div class="key" v-click="5">后车必须比前车<b>多刹</b> <Latex tex="\dfrac{(\Delta v)^2}{2d}" />——但多刹也有上限：<b>两头都是界线</b>。</div>
</div>

---
clicks: 1
---

# 四道题的精髓

<div class="page-grow">
<div class="stack-tight">
<div class="step"><b>①</b><span><b>长杆穿筒</b>：两者加速度相同 ⇒ 换到杆上，筒以 <Latex tex="v_0" /> 匀速上升，<Latex tex="X = v_0t" /> 一步出结果。</span></div>

<div class="step"><b>②</b><span><b>先后上抛</b>：相遇必须发生在两球都还在空中的时候——两端正是"在地面相逢"和"B 的最高点"。</span></div>

<div class="step"><b>③</b><span><b>追及相遇</b>：位移相等写成一元二次方程，判别式数交点，再检查根是不是正的（<Latex tex="t > 0" />）。</span></div>

<div class="step"><b>④</b><span><b>三车避碰</b>：速度相等是临界；但匀减速公式只到停下为止——先问一句"它停了吗"。</span></div>
</div>

<div class="key" v-click="1">四道题、两把钥匙：<b>把相对运动看清</b>，<b>把临界条件写对</b>。</div>
</div>


---
---

# 长杆穿筒

<div class="page-grow">
<div class="half-grid">
<div class="stack-tight">
<div class="problem">一根长 <Latex tex="L" /> 的竖直长直杆悬挂在空中，其下端到一个两端开口的薄壁圆筒上端的高度为 <Latex tex="H" />，筒身长 <Latex tex="l" />。重力加速度为 <Latex tex="g" />，不计空气阻力。</div>

<div class="qitem"><b>①</b><span>圆筒固定不动，长杆由静止释放做自由落体——直杆完全穿过圆筒要经历多少时间？</span></div>

<div class="qitem"><b>②</b><span>释放长杆的同时，圆筒以初速度 <Latex tex="v_0" /> 竖直向上抛出——从开始释放到直杆完全穿出圆筒要经历多少时间？</span></div>
</div>

<div class="fig fig-rod">
<RodThroughCylinderSvg />
</div>
</div>
</div>

---
clicks: 3
---

# 筒不动：两个时刻

<div class="page-grow">
<div class="ask">杆"完全穿过"筒——这件事从哪一刻开始、到哪一刻结束？起止各对应杆的哪一端？</div>

<div class="step" v-click="1"><b>①</b><span>开始进入：杆的<b>下端</b>到达筒的上端，这段位移是 <Latex tex="H" /> ⇒ <Latex tex="t_1 = \sqrt{\dfrac{2H}{g}}" /></span></div>

<div class="step" v-click="2"><b>②</b><span>完全穿出：杆的<b>上端</b>离开筒的<b>下端</b>，杆的位移是 <Latex tex="H + L + l" /> ⇒ <Latex tex="t_2 = \sqrt{\dfrac{2(H+L+l)}{g}}" /></span></div>

<div class="step" v-click="3"><b>③</b><span>穿筒时间 <Latex tex="\Delta t = t_2 - t_1 = \sqrt{\dfrac{2(H+L+l)}{g}} - \sqrt{\dfrac{2H}{g}}" /></span></div>

</div>

---

# 筒也上抛

<div class="page-grow">
<div class="ask">点"释放"看一遍：杆下落、筒上升，相对位移 <Latex tex="X" /> 由什么决定？</div>

<LongRodCylinder />
</div>

---

# 换到杆上

<div class="page-grow">
<div class="ask">在杆"看来"，筒在做什么运动？换成这个参考系，"完全穿出"要多久？</div>

<LongRodCylinder initial-mode="rod" />
</div>

---
clicks: 2
---

# 两种解法对照

<div class="page-grow">
<div class="half-grid">
<div class="stack-tight">
<div class="mini-title">地面系：各算各的</div>

<div class="step"><b>·</b><span>杆下落 <Latex tex="h_1 = \tfrac{1}{2}gt^2" /></span></div>

<div class="step"><b>·</b><span>筒上升 <Latex tex="h_2 = v_0t - \tfrac{1}{2}gt^2" /></span></div>

<div class="step"><b>·</b><span>穿出条件 <Latex tex="h_1 + h_2 = H+L+l" /></span></div>

<div class="step"><b>·</b><span>代入后 <Latex tex="t^2" /> 项全部消掉</span></div>
</div>

<div class="stack-tight divider-l">
<div class="mini-title">杆系：一步</div>

<div class="step"><b>·</b><span>两物体加速度相同，相对加速度为 <Latex tex="0" /></span></div>

<div class="step"><b>·</b><span>筒相对杆以 <Latex tex="v_0" /> 匀速上升</span></div>

<div class="step"><b>·</b><span><Latex tex="X = v_0t = H+L+l" /></span></div>

<div class="step"><b>·</b><span><Latex tex="t = \dfrac{H+L+l}{v_0}" /></span></div>
</div>
</div>

<div class="step" v-click="1"><b>⚠</b><span>成立条件：筒不能落回抛出点以下，<Latex tex="t \le \dfrac{2v_0}{g}" />，即 <Latex tex="v_0 \ge \sqrt{\dfrac{g(H+L+l)}{2}}" />。</span></div>

<div class="key" v-click="2">加速度相同的两个物体，相对运动<b>一定是匀速的</b>——这就是换参考系能省力的原因；但要检查筒在这段时间里有没有落回桌面。</div>
</div>

---
---

# 先后上抛：两球能在空中相遇吗

<div class="page-grow">
<div class="problem">在同一竖直线上，A 球先以 <Latex tex="2v_0" /> 的初速度竖直向上抛出；间隔 <Latex tex="\Delta t" /> 后，B 球以 <Latex tex="v_0" /> 的初速度也从同一点竖直向上抛出。不计空气阻力，重力加速度为 <Latex tex="g" />。</div>

<div class="qitem"><b>①</b><span>要使两球能在<b>空中相遇</b>，抛出时间间隔 <Latex tex="\Delta t" /> 的取值范围是什么？</span></div>

<div class="qitem"><b>②</b><span>若要求两球<b>在 B 下降的过程中相遇</b>，<Latex tex="\Delta t" /> 满足什么条件？最大时间间隔 <Latex tex="t_{\max}" /> 是多少？</span></div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="ask">问①：把滑块拖到两个极端——<Latex tex="\Delta t" /> 小到多少就再也追不上？大到多少就错过？</div>

<AirMeetModel :initial-dt="2" />

<div class="key" v-click="1">两个界就是两球各自落地的时刻（A 飞 <Latex tex="4v_0/g" />、B 飞 <Latex tex="2v_0/g" />）：<Latex tex="\dfrac{2v_0}{g} < \Delta t < \dfrac{4v_0}{g}" />。</div>
</div>

---
clicks: 1
---

<div class="page-grow">
<div class="ask">问②：相遇点落在 B 的哪一段才算"B 正在下降"？<Latex tex="\Delta t" /> 最大能到多少？</div>

<AirMeetModel :initial-dt="2.73" />

<div class="key" v-click="1">相遇点恰好落在 B 的最高点（<Latex tex="\tau = v_0/g" />）时 <Latex tex="\Delta t" /> 最大：<Latex tex="\Delta t < \dfrac{(1+\sqrt{3})v_0}{g} \approx 2.73\dfrac{v_0}{g}" />。</div>
</div>

---
---

<div class="page-grow">
<div class="ask">自己拖 <Latex tex="\Delta t" />：相遇点落在 B 的上升段、最高点，还是下降段？</div>

<AirMeetModel />
</div>

---
clicks: 1
---

# 课堂小结：四个易错点

<div class="page-grow">
<div class="stack-tight">
<div class="step"><b>！</b><span>"完全穿出"的位移是 <Latex tex="H+L+l" />，别忘了 <Latex tex="H" />。</span></div>

<div class="step"><b>！</b><span>方程有根 ≠ 真的相遇：还要 <Latex tex="t > 0" />，还要落在各自的运动时间内。</span></div>

<div class="step"><b>！</b><span>临界条件（速度相等）只在"相对速度能减到 0"的过程中适用。</span></div>

<div class="step"><b>！</b><span><b>刹车陷阱</b>：匀减速公式只到停下为止；先算刹停时间，解出的 <Latex tex="t" /> 比它大，就改用"停下来的位置"重算。</span></div>
</div>

<div class="key" v-click="1">审题先问三句话：谁相对谁？临界在哪一刻？它停了吗？</div>
</div>
