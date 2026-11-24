---
theme: default
title: "分子运动速率分布规律"
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
defaults:
  layout: base-flex
  transition: fade
chapter-no: "1.3"
chapter: "第一章 分子动理论"
---

<CoverDecorationSvg />

---
title: 小球落进哪个狭槽？
clicks: 1
---

<div class="page-grow">
<div class="ask">从顶部投入一个小球，它会落进哪个狭槽？</div>
<div class="figure sm-fig-galton"><GaltonBoardSvg :step="$clicks" /></div>
<div class="tip-hint" v-click="1">投入大量小球，狭槽里的分布不再偶然：中间多，两头少。</div>
</div>

---
# 统计规律

<div class="page-grow">
<div class="sm-events">
<div class="sm-event"><span class="sm-event-tag">必然事件</span>在一定条件下，必然出现的事件。</div>
<div class="sm-event"><span class="sm-event-tag">不可能事件</span>在一定条件下，不可能出现的事件。</div>
<div class="sm-event"><span class="sm-event-tag">随机事件</span>在一定条件下，可能出现也可能不出现的事件。</div>
</div>
<DefinitionBox term="统计规律" tone="gold" v-click="1">
<div>大量随机事件的整体，往往会表现出一定的规律性，这种规律叫作统计规律。</div>
</DefinitionBox>
</div>

---
# 气体分子运动的特点

<div class="page-grow">
<div class="sm-facts">
<div class="sm-fact"><span class="sm-fact-no">1</span><div>分子间距离大约是分子直径的 <Latex tex="10" /> 倍，分子大小可忽略，可看作质点。</div></div>
<div class="sm-fact"><span class="sm-fact-no">2</span><div>分子间作用力很弱，除碰撞外不受力，做匀速直线运动，气体充满整个空间。</div></div>
<div class="sm-fact"><span class="sm-fact-no">3</span><div>分子频繁碰撞，速度的大小和方向不断改变，向各个方向运动的分子数目几乎相等。</div></div>
</div>
<div class="info-hint" v-click="1">单个分子的运动杂乱无章；大量分子才显出统计规律。</div>
</div>

---
# 氧气分子的速率分布

<div class="page-grow">
<div class="ask">同样温度下，氧气分子的速率有规律吗？</div>
<table class="sm-table sm-table-dist">
<thead>
<tr><th>速率区间 <Latex tex="(\text{m}\cdot\text{s}^{-1})" /></th><th><Latex tex="0\ \text{℃}" /> 的占比 / <Latex tex="\%" /></th><th><Latex tex="100\ \text{℃}" /> 的占比 / <Latex tex="\%" /></th></tr>
</thead>
<tbody>
<tr><td>100 以下</td><td>1.4</td><td>0.7</td></tr>
<tr><td>100～200</td><td>8.1</td><td>5.4</td></tr>
<tr><td>200～300</td><td>17.0</td><td>11.9</td></tr>
<tr><td>300～400</td><td>21.4</td><td>17.4</td></tr>
<tr><td>400～500</td><td>20.4</td><td>18.6</td></tr>
<tr><td>500～600</td><td>15.1</td><td>16.7</td></tr>
<tr><td>600～700</td><td>9.2</td><td>12.9</td></tr>
<tr><td>700～800</td><td>4.5</td><td>7.9</td></tr>
<tr><td>800～900</td><td>2.0</td><td>4.6</td></tr>
<tr><td>900 以上</td><td>0.9</td><td>3.9</td></tr>
</tbody>
</table>
<div class="tip-hint" v-click="1">两个温度下都是中间多、两头少；温度升高，速率大的分子变多。</div>
</div>

---
# 速率分布图像

<div class="page-grow">
<div class="ask">把表里的数据画成图像，会是什么形状？</div>
<div class="sm-legend"><span class="sm-dot sm-dot-cool"></span><Latex tex="0\ \text{℃}" /><span class="sm-dot sm-dot-hot"></span><Latex tex="100\ \text{℃}" /></div>

```comp CoordAxes
x-range: [0, 1000]
y-range: [0, 24]
x-axis: { quantity: v, unit: '(m/s)' }
y-axis: { quantity: p, unit: '%' }
view: { width: 880, height: 268 }
ticks: { x: [200, 400, 600, 800], y: [] }
curves:
  - points: [{ x: 50, y: 1.4 }, { x: 150, y: 8.1 }, { x: 250, y: 17.0 }, { x: 350, y: 21.4 }, { x: 450, y: 20.4 }, { x: 550, y: 15.1 }, { x: 650, y: 9.2 }, { x: 750, y: 4.5 }, { x: 850, y: 2.0 }, { x: 950, y: 0.9 }]
    stroke: var(--c-physics)
    width: 3
  - points: [{ x: 50, y: 0.7 }, { x: 150, y: 5.4 }, { x: 250, y: 11.9 }, { x: 350, y: 17.4 }, { x: 450, y: 18.6 }, { x: 550, y: 16.7 }, { x: 650, y: 12.9 }, { x: 750, y: 7.9 }, { x: 850, y: 4.6 }, { x: 950, y: 3.9 }]
    stroke: var(--c-accent)
    width: 3
```

<div class="tip-hint" v-click="1">曲线都是中间高、两头低；温度升高，峰向右移动。</div>
</div>

---
# 温度越高，峰越靠右

<div class="page-grow">
<div class="ask">拖动滑块升高温度，曲线怎样变化？</div>
<TemperatureExplorer />
<div class="tip-hint" v-click="1">峰值向速率大的方向移动，曲线变平缓；分子的平均速率变大，热运动更剧烈。</div>
</div>

---
# 气体压强是怎样产生的

<div class="page-grow">
<div class="ask">分子对器壁的撞击是间断的，为什么压强却是持续、均匀的？</div>
<div class="figure sm-fig-wall"><WallCollisionSvg :step="$clicks" /></div>
<div class="info-hint" v-click="1">一次碰撞的冲量很小，大量分子频繁撞击，就形成了持续、均匀的压力。</div>
</div>

---
# 一次碰撞给器壁多大的力

<div class="page-grow sm-derive">
<div class="ask">选一个与器壁正碰的分子：碰前动量 <Latex tex="mv" />，碰后 <Latex tex="-mv" />。</div>
<div v-click="1">分子受到的冲量 <Latex tex="F\Delta t = -mv - mv = -2mv" /></div>
<div v-click="2">由牛顿第三定律，器壁受到的力 <Latex tex="F' = \dfrac{2mv}{\Delta t}" /></div>
<div class="tip-hint" v-click="3">速率越大，一次碰撞的冲量越大；单位时间内撞击的分子数越多，压强也越大。</div>
</div>

---
# 为什么压强是持续、均匀的

<div class="page-grow">
<div class="sm-demo">
<div class="sm-demo-row"><span class="sm-demo-no">1</span><div>一颗豆粒落下，秤盘指针只是短暂地摆一下。</div></div>
<div class="sm-demo-row" v-click="1"><span class="sm-demo-no">2</span><div>大量豆粒连续倒在秤盘上，指针稳定地偏转。</div></div>
<div class="sm-demo-row" v-click="2"><span class="sm-demo-no">3</span><div>从更高处倒豆粒，指针偏转更大。</div></div>
</div>
<div class="tip-hint" v-click="3">单个分子的撞击是间断的，大量分子的频繁碰撞就表现为持续、均匀的压力。</div>
</div>

---
# 压强由什么决定

<div class="page-grow">
<div class="half-grid">
<div class="sm-card"><div class="sm-card-title">分子平均速率</div><div>平均速率越大，每次碰撞的冲量越大，单位时间内碰撞次数也越多。</div></div>
<div class="sm-card"><div class="sm-card-title">分子数密度</div><div>数密度越大，单位时间内撞击单位面积器壁的分子数越多。</div></div>
</div>
<div class="tip-hint" v-click="1">宏观上：温度升高、体积减小，都会使压强增大。</div>
</div>

---
title: 两种增大压强的方式
clicks: 2
---

<div class="page-grow">
<div class="sm-stem">一定质量的气体，体积不变时温度升高，或温度不变时体积减小，压强都会增大。从微观上看，这两种情况有区别吗？</div>
<div v-click="1"><span class="sm-key">温度升高</span>：分子平均速率变大，每次撞击器壁的冲量更大，单位时间内撞击次数也更多。</div>
<div v-click="2"><span class="sm-key">体积减小</span>：分子数密度变大，单位时间内撞击器壁的分子数更多。</div>
</div>

---
title: 0 ℃ 与 100 ℃ 的氧气
clicks: 2
---

<div class="page-grow">
<div class="sm-stem">两个体积都是 <Latex tex="1\ \text{L}" /> 的容器，装着质量相等的氧气，温度分别是 <Latex tex="0\ \text{℃}" /> 和 <Latex tex="100\ \text{℃}" />。分子速率分布有哪些相同、哪些不同？</div>
<div v-click="1"><span class="sm-key">相同</span>：分布都是中间多、两头少；分子都在做无规则运动。</div>
<div v-click="2"><span class="sm-key">不同</span>：<Latex tex="100\ \text{℃}" /> 时峰值向速率大的一侧移动，曲线更平缓；速率大的分子比例更大，平均速率更大。</div>
</div>

---
title: 四瓶氢气的压强比较
clicks: 2
---

<div class="page-grow">
<div class="sm-stem">甲：体积 <Latex tex="V" />、质量 <Latex tex="m" />、温度 <Latex tex="t" />、压强 <Latex tex="p" />。比较乙、丙、丁与甲的压强。</div>
<table class="sm-table sm-table-compare">
<thead>
<tr><th>瓶</th><th>与甲相比</th><th>数密度</th><th>平均速率</th><th>压强</th></tr>
</thead>
<tbody>
<tr><td>乙</td><td>体积更大</td><td>更小</td><td>相同</td><td><span v-click="1">小于 <Latex tex="p" /></span></td></tr>
<tr><td>丙</td><td>温度更高</td><td>相同</td><td>更大</td><td><span v-click="1">大于 <Latex tex="p" /></span></td></tr>
<tr><td>丁</td><td>质量更大、温度更高</td><td>更大</td><td>更大</td><td><span v-click="2">大于 <Latex tex="p" /></span></td></tr>
</tbody>
</table>
</div>

---
# 统计规律的应用

<div class="page-grow">
<div class="ask">共享单车的使用数据，能为公交线路规划提供什么？</div>
<div class="sm-facts">
<div class="sm-fact"><span class="sm-fact-no">1</span><div>统计各时段、各道路的骑行人数，找出需求集中的路线。</div></div>
<div class="sm-fact"><span class="sm-fact-no">2</span><div>统计骑行距离的分布，判断哪些路段适合设站。</div></div>
<div class="sm-fact"><span class="sm-fact-no">3</span><div>统计起止点的分布，为线路走向提供依据。</div></div>
</div>
<div class="tip-hint" v-click="1">单个用户的出行是随机的，大量用户的统计结果却显示出稳定的规律。</div>
</div>

---
# 小结

<div class="page-grow sm-summary">
<div class="sm-sum-item">大量分子的速率分布是中间多、两头少；温度升高，峰向速率大的方向移动。</div>
<div class="sm-sum-item" v-click="1">气体压强是大量分子频繁撞击器壁产生的，由分子平均速率和数密度决定。</div>
<div class="sm-sum-item" v-click="2">大量随机事件的整体表现出的规律性，叫作统计规律。</div>
</div>
