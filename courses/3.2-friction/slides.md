---
theme: default
title: "摩擦力"
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
chapter-no: "3.2"
chapter: 第三章 相互作用——力
---

<CoverFrictionSvg />

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">手压在桌面上向前推，压得越重越难推——这个"阻碍"是从哪里来的？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2" class="key">手相对桌面滑动时，接触面上产生了阻碍<b class="text-accent">相对运动</b>的力——<b>滑动摩擦力</b></div>
</div>

<div v-click="1" class="divider-l">
  <HandOnTableSvg />
</div>
</div>
</div>


---
clicks: 3
---

# 滑动摩擦力

<div class="page-grow page-grow-tight">
<div class="ask">两个物体接触并发生相对滑动，就一定有滑动摩擦力吗？</div>

<div class="half-grid">
<div class="stack stack-dense">
<div v-click="1" class="card">物体相对滑动时，接触面上产生阻碍<b class="text-accent">相对运动</b>的力，叫作<b>滑动摩擦力</b></div>

<div v-click="2">① 两物体<b>直接接触且相互挤压</b>（有弹力）</div>

<div v-click="2">② 接触面<b>粗糙</b>——光滑则无摩擦力</div>

<div v-click="2">③ 两物体间发生<b>相对滑动</b></div>

<div v-click="3" class="key">三个条件同时满足，才会有滑动摩擦力</div>
</div>

<div v-click="1" class="divider-l">
  <EraserOnBoardSvg />
</div>
</div>
</div>

---
clicks: 4
---

# 滑动摩擦力的方向

<div class="page-grow">
<div class="ask">摩擦力阻碍的到底是"哪个运动"？</div>

<div class="half-grid">
<div v-click="1" class="divider-l">
  <BlockSlideSvg />
</div>

<div class="stack divider-l">
<div v-click="2"><b class="text-accent-2">把桌面当作参考系</b>：在桌面的"眼里"，木块一直朝右运动——这就是木块的<b>相对运动方向</b></div>

<div v-click="3">滑动摩擦力与这个方向相反 → 沿接触面<b class="text-accent">向左</b></div>

<div v-click="4" class="key">判断方法：以<b>跟它接触的另一个物体</b>为参考系，看它相对这个物体朝哪运动，摩擦力就与这个方向<b class="text-accent">相反</b></div>
</div>
</div>
</div>

---
clicks: 2
---

<div class="page-grow">
<div class="ask ask-lead">物块静止轻放到向右运动的传送带上——它受到的摩擦力朝哪边？</div>

<div v-click="1">
<FrictionDirectionJudge />
</div>

<div v-click="2" class="key">以<b class="text-accent-2">传送带</b>为参考系，物块向左运动 → 摩擦力<b class="text-accent">向右</b>：它与物块的运动方向相同，可以是<b class="text-accent">动力</b></div>
</div>

---
clicks: 3
---

# 判断摩擦力的方向：A 对 B

<div class="page-grow">
<div class="ask">小车 B 以 <Latex tex="v_1 = 4 \text{ m/s}" /> 沿水平面向右运动，它上面的物块 A 以 <Latex tex="v_2 = 2 \text{ m/s}" /> 向右运动。A 对 B 的摩擦力方向如何？</div>

<div class="half-grid">
<div v-click="1">
  <CartBlockSvg />
</div>

<div class="stack divider-l">
<div v-click="2">以 <b class="text-accent">A</b> 为参考系：<Latex tex="v_1 > v_2" />，B 相对 A <b class="text-accent-2">向右</b>运动</div>

<div v-click="3" class="key">A 对 B 的摩擦力，与 B 相对 A 的运动方向相反 → <b class="text-accent">水平向左</b></div>
</div>
</div>
</div>

---
clicks: 4
---

# 怎样测出滑动摩擦力

<div class="page-grow page-grow-tight">
<div class="ask">用弹簧测力计拉着物体匀速运动，拉力就等于摩擦力——这样能测准吗？</div>

<div class="half-grid">
<div v-click="1" class="stack">
<SpringScaleTrialSvg />
<div class="mini-note">方案一：匀速拉动，拉力大小等于摩擦力</div>
<div v-click="2" class="tag-icon tag-icon-danger"><mdi-close-circle /> 测力计一直在运动，读数很难读准</div>
</div>

<div v-click="3" class="stack">
<PulleyPullBoardSvg />
<div class="mini-note">方案二：细线绕过定滑轮，把测力计固定住</div>
</div>
</div>

<div v-click="4" class="key">由动转静：物体静止、测力计不动，它的示数就是滑动摩擦力</div>
</div>

---
clicks: 3
---

# 滑动摩擦力的大小

<div class="page-grow">
<div class="ask">换不同物体、不同接触面反复做，摩擦力跟压力到底什么关系？</div>

<div class="stack">
<div v-click="1" class="problem">用上面这套装置，换不同质量的物体、不同材料的接触面，各测多组：压力越大，摩擦力越大</div>

<div v-click="2">每组数据里 <Latex tex="F_f" /> 与 <Latex tex="F_N" /> 的比值都保持不变——<Latex tex="F_f" /> 与 <Latex tex="F_N" /> 成正比</div>

<div v-click="3" class="key key-lead">对任意物体、任意接触面，滑动摩擦力都跟接触面上的压力成正比：<Latex tex="F_f = \mu F_N" /></div>
</div>
</div>

---
clicks: 3
---

# 动摩擦因数

<div class="page-grow">
<div class="ask">式中的 <Latex tex="\mu" /> 是什么？它由什么决定？</div>

<div class="stack">
<div v-click="1" class="card"><Latex tex="\mu = \frac{F_f}{F_N}" display /> 叫作<b>动摩擦因数</b>：它是两个力的比值，<b class="text-accent">没有单位</b></div>

<div v-click="2">同一个接触面，改变压力测多次，<Latex tex="F_f / F_N" /> 的比值基本相同——说明 <Latex tex="\mu" /> 由接触面本身决定</div>

<div v-click="3" class="key">动摩擦因数只由接触面的<b class="text-accent-2">材料和粗糙程度</b>决定</div>
</div>
</div>

---
clicks: 3
---

# 几种材料间的动摩擦因数

<div class="page-grow page-grow-tight">
<div v-click="1" class="mf-table-host">
<table class="mf-table">
<thead>
<tr><th>材料</th><th><Latex tex="\mu" /></th><th>材料</th><th><Latex tex="\mu" /></th></tr>
</thead>
<tbody>
<tr><td>钢—钢</td><td>0.25</td><td>钢—冰</td><td>0.02</td></tr>
<tr><td>木—木</td><td>0.30</td><td>木—冰</td><td>0.03</td></tr>
<tr><td>木—金属</td><td>0.20</td><td>橡胶轮胎—路面（干）</td><td>0.71</td></tr>
<tr><td>皮革—铸铁</td><td>0.28</td><td>木—皮带</td><td>0.40</td></tr>
<tr class="mf-table-hi"><td>铝—铝（干燥、洁净）</td><td>1.4</td><td>铅—钢（干燥、洁净）</td><td>1.4</td></tr>
</tbody>
</table>
</div>

<div v-click="2" class="ask"><Latex tex="\mu" /> 大于 1 意味着什么？</div>

<div v-click="3" class="key">意味着摩擦力可以比压力还大</div>
</div>

---
clicks: 4
---

<div class="page-grow">
<div class="ask ask-lead">滑动摩擦力的大小，还跟什么有关？</div>

<div class="stack">
<div class="qa-line"><span v-click="1" class="qa-q">接触面积的大小？</span><span v-click="3" class="qa-a">无关</span></div>

<div class="qa-line"><span v-click="2" class="qa-q">相对运动的速度？</span><span v-click="4" class="qa-a">无关</span></div>
</div>
</div>

---
clicks: 5
---

# 例题：拉着雪橇匀速前进

<div class="page-grow">
<div class="problem">钢制滑板的雪橇连同木料总质量 <Latex tex="4.9 \times 10^3 \text{ kg}" />，在水平冰道上匀速前进。<Latex tex="g" /> 取 <Latex tex="10 \text{ N/kg}" />，查表得 <Latex tex="\mu = 0.02" />。马在水平方向的拉力要多大？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2">匀速前进 → 拉力与滑动摩擦力平衡：<Latex tex="F = F_f" /></div>

<div v-click="3">竖直方向平衡：<Latex tex="F_N = mg = 4.9 \times 10^4 \text{ N}" /></div>

<div v-click="4">由 <Latex tex="F_f = \mu F_N" /> 得 <Latex tex="F_f = 0.02 \times 4.9 \times 10^4 \text{ N} = 980 \text{ N}" /></div>

<div v-click="5" class="key">马要在水平方向用 <b class="text-accent"><Latex tex="980\text{ N}" /></b> 的力，才能拉着雪橇匀速前进</div>
</div>

<div v-click="1" class="divider-l">
  <SledOnIceSvg />
</div>
</div>
</div>

---
clicks: 1
---

# 第一课时小结：滑动摩擦力

<div class="page-grow">
<div class="mf-compare">
<div class="mf-head">环节</div>
<div class="mf-head">要点</div>
<div class="mf-head">一页记住</div>
<div class="mf-cell">产生条件</div>
<div class="mf-cell">接触且相互挤压、接触面粗糙、发生相对滑动</div>
<div class="mf-cell">三个条件缺一不可</div>
<div class="mf-cell">方向</div>
<div class="mf-cell">以接触的另一个物体为参考系看相对运动</div>
<div class="mf-cell">与<b class="text-accent">相对运动</b>方向相反</div>
<div class="mf-cell">大小</div>
<div class="mf-cell">与压力成正比，与接触面积、相对速度无关</div>
<div class="mf-cell"><Latex tex="F_f = \mu F_N" />，<Latex tex="\mu" /> 可以大于 1</div>
</div>

<div v-click="1" class="key key-lead">摩擦力阻碍的是<b>相对运动</b>，不一定是物体的运动——它可以是动力</div>
</div>

---
layout: course-cover
chapter-no: "3.2"
chapter: 第三章 相互作用——力
lesson: 第二课时
title: 静摩擦力
---

<CoverStaticFrictionSvg />

---
clicks: 3
---

<div class="page-grow">
<div class="ask ask-lead">用力推沙发，沙发没有动——接触面上有摩擦力吗？</div>

<div class="half-grid">
<div class="stack">
<div v-click="2">沙发水平方向不动 → 初中就学过的<b class="text-accent-2">二力平衡</b>：水平方向一定有一个力与推力大小相等、方向相反</div>

<div v-click="3" class="key">两个物体相对静止时，接触面上也可能有摩擦力——这就是<b>静摩擦力</b></div>
</div>

<div v-click="1" class="divider-l">
  <SofaPushSvg />
</div>
</div>
</div>

---
clicks: 4
---

# 静摩擦力

<div class="page-grow page-grow-tight">
<div class="ask">相对静止的两个物体之间，什么时候有静摩擦力、什么时候没有？</div>

<div class="stack">
<div v-click="1" class="card">相互接触的两个物体之间只有<b class="text-accent-2">相对运动趋势</b>、没有相对运动时，接触面上的摩擦力叫作<b>静摩擦力</b></div>

<div v-click="2">产生条件：接触且相互挤压、接触面粗糙、有<b class="text-accent-2">相对运动趋势</b></div>

<div v-click="3">判断有无的关键就在最后一条：<b class="text-accent">有相对运动趋势才有静摩擦力</b>——水平桌面上静止的书，水平方向没有运动趋势，就没有静摩擦力</div>

<div v-click="4" class="key">只要还没有发生相对滑动，静摩擦力的大小就随推力增大而增大，并与推力大小相等</div>
</div>
</div>

---
clicks: 3
---

# 静摩擦力的方向

<div class="page-grow">
<div class="ask">这两种情况下，静摩擦力各朝哪个方向？</div>

<div class="half-grid">
<div v-click="1" class="stack">
<BlockOnInclineSvg />
<div>有<b class="text-accent-2">下滑</b>趋势 → 静摩擦力沿斜面<b class="text-accent">向上</b></div>
</div>

<div v-click="2" class="stack">
<HandHoldingBottleSvg />
<div>有<b class="text-accent-2">下落</b>趋势 → 静摩擦力<b class="text-accent">竖直向上</b></div>
</div>
</div>

<div v-click="3" class="key">静摩擦力的方向总是跟物体<b class="text-accent-2">相对运动趋势</b>的方向相反</div>
</div>

---
clicks: 4
---

# 静摩擦力的大小随拉力的变化

<div class="page-grow page-grow-tight">
<div class="ask">慢慢增大拉力，静摩擦力怎么变？</div>

<StaticFrictionGraph />

<div v-click="4" class="key">木块一经滑动，摩擦力<b class="text-accent">突然变小</b>，此后保持在滑动摩擦力上不再变</div>
</div>

---
clicks: 4
---

# 最大静摩擦力

<div class="page-grow">
<div class="ask">静摩擦力能随着拉力一直增大下去吗？</div>

<div class="stack">
<div v-click="1">不能。拉力增大到某个值，木块就会被拉动——这个值就是静摩擦力的限度</div>

<div v-click="2">最大静摩擦力 <Latex tex="F_{\max}" /> 在数值上等于物体<b class="text-accent">即将开始运动</b>时的拉力</div>

<div v-click="3" class="mini-note">最大静摩擦力略大于滑动摩擦力；<b>在习题中为了简化模型，通常假设两者相同</b></div>

<div v-click="4" class="key">静摩擦力的大小总在 0 与 <Latex tex="F_{\max}" /> 之间：达到 <Latex tex="F_{\max}" /> 时物体即将开始滑动</div>
</div>
</div>

---
clicks: 5
---

# 静摩擦力的大小怎么算

<div class="page-grow page-grow-tight">
<div class="problem">重 <Latex tex="100 \text{ N}" /> 的木箱放在水平地板上：至少用 <Latex tex="35 \text{ N}" /> 的水平推力才能使它开始运动；移动以后，用 <Latex tex="30 \text{ N}" /> 的推力就能使它匀速前进。</div>

<div class="half-grid">
<div class="stack">
<div v-click="2">刚要动时静摩擦力达到最大：<Latex tex="F_{\max} = 35 \text{ N}" /></div>

<div v-click="3">匀速前进时拉力与滑动摩擦力平衡：<Latex tex="F_f = 30 \text{ N}" /></div>

<div v-click="4">由 <Latex tex="F_f = \mu F_N" /> 得 <Latex tex="\mu = \frac{30}{100} = 0.30" /></div>

<div v-click="5" class="key">用 <Latex tex="20 \text{ N}" /> 推静止的木箱：没推动，<Latex tex="F_{\text{静}} = 20 \text{ N}" />，由二力平衡求得，不能用 <Latex tex="\mu F_N" /> 算</div>
</div>

<div v-click="1" class="divider-l">
  <CrateForcesSvg />
</div>
</div>
</div>

---
clicks: 4
---

# 判断摩擦力的方向：自行车

<div class="page-grow page-grow-tight">
<div class="ask">正常骑行时，地面对前轮、后轮有摩擦力吗？各朝哪边？</div>

<div class="half-grid">
<div v-click="1">
  <BicycleSvg />
</div>

<div class="stack divider-l">
<div v-click="2">后轮是<b class="text-accent">驱动轮</b>：轮子相对地面有<b class="text-accent-2">向后</b>的运动趋势 → 地面对后轮的静摩擦力<b class="text-accent">向前</b></div>

<div v-click="3">前轮是<b class="text-accent">从动轮</b>：被车架推着前进，相对地面有<b class="text-accent-2">向前</b>的运动趋势 → 地面对前轮的静摩擦力<b class="text-accent">向后</b></div>

<div v-click="4" class="key">两轮受到的都是静摩擦力：后轮向前（动力），前轮向后（阻力）</div>
</div>
</div>
</div>

---
clicks: 4
---

# 判断摩擦力的方向：皮带传动

<div class="page-grow page-grow-tight">
<div class="ask">M 是主动轮、N 是从动轮。皮带受到的摩擦力朝哪边？</div>

<BeltPulleyFriction />

<div v-click="4" class="key">皮带在 <Latex tex="M" /> 处被向前拉、在 <Latex tex="N" /> 处被向后拖——两端受到的摩擦力方向相反</div>
</div>

---
clicks: 4
---

<div class="page-grow page-grow-tight">
<div class="ask ask-lead">两种皮带传动布局，哪一种更不容易打滑？</div>

<div class="half-grid">
<div v-click="1" class="stack">
<BeltDriveLayoutASvg />
<div class="mini-note">方式一：上方张紧<span v-click="3"> · 包角小于 180°</span></div>
</div>

<div v-click="1" class="stack">
<BeltDriveLayoutBSvg />
<div class="mini-note">方式二：下方张紧<span v-click="3"> · 包角大于 180°</span></div>
</div>
</div>

<div v-click="2">两种布局的<b>包角</b>不一样：包角是皮带包住皮带轮的那段圆弧所对的圆心角</div>

<div v-click="4" class="key">皮带靠轮与皮带之间的摩擦力带动：包角越大，皮带接触的圆弧越长、能产生的摩擦力越大——越不容易打滑、传动效率越高，所以<b>第二种布局更好</b></div>
</div>

---
clicks: 1
---

# 第二课时小结：静摩擦力

<div class="page-grow">
<div class="mf-compare">
<div class="mf-head">比较项</div>
<div class="mf-head">静摩擦力</div>
<div class="mf-head">滑动摩擦力</div>
<div class="mf-cell">产生条件</div>
<div class="mf-cell">粗糙、接触挤压、有<b class="text-accent-2">相对运动趋势</b></div>
<div class="mf-cell">粗糙、接触挤压、有<b class="text-accent">相对滑动</b></div>
<div class="mf-cell">方向</div>
<div class="mf-cell">跟<b class="text-accent-2">相对运动趋势</b>的方向相反</div>
<div class="mf-cell">跟<b class="text-accent">相对运动</b>的方向相反</div>
<div class="mf-cell">大小</div>
<div class="mf-cell">0 与 <Latex tex="F_{\max}" /> 之间，由二力平衡求</div>
<div class="mf-cell"><Latex tex="F_f = \mu F_N" />，由 <Latex tex="\mu" /> 和 <Latex tex="F_N" /> 决定</div>
</div>

<div v-click="1" class="key key-lead">两者都是摩擦力：方向都跟<b>相对运动（趋势）</b>相反，但大小的算法完全不同</div>
</div>
