# 课件风格统一 · 进度交接（新 Agent 从这里接手）

> 什么时候读：**要继续推进"全仓 34 门课件风格统一"这项工作时**。
> 执行标准看 [`style-guide.md`](style-guide.md)（原子词汇表 / token 铁律 / 框的纪律 / 命名规范 / 验收命令）。
> 本文件只记**进度与批次编排**，不重复指南内容。

## 0. 一句话现状（2026-10-14 19:15）

**8 / 34 门课已完成风格统一并通过 e2e（溢出=0）**，其中第 2 批 3 门已过**全仓 build**。
剩 **26 门**待做（`o2-1.3` 除外，教师亲手收尾）。
**开工前必须先确认没有残留 dev server**（见 §5 的幽灵改动教训——这是最容易踩的新坑）。

## 1. 已完成（8 门，验收过）

**第 1 批（5 ��，已过全仓 build）**

| 课件                                  | e2e 溢出 | 硬编码                           | 自造类                 | style.css       | 备注                                      |
| ------------------------------------- | -------- | -------------------------------- | ---------------------- | --------------- | ----------------------------------------- |
| `3.4-force-composition-decomposition` | 0 ✅     | 色值 4→0 / 字号 8→0 / 圆角 1→0   | —                      | 196→186         | 前缀统一（`dc-`/`tr-`/`te-`/`pe-`/`in-`） |
| `10.4-capacitor`                      | 0 ✅     | 组件内等值换 token               | 0                      | 一行未动        | 卡片滥用重灾区，已收敛                    |
| `2.4-free-fall`                       | 0 ✅     | 字号 7→0                         | 21→11（并成 3 组前缀） | 有精简          | 见 §6 待拍板项                            |
| `1.4-acceleration`                    | 0 ✅     | 色值 11→0 / 字号 21→0 / 圆角 4→0 | 42→17                  | 446→198（−56%） | 见 §6 待拍板项                            |
| `12.4-energy-sustainability`          | 0 ✅     | 0                                | 0                      | 10 行           | 见 §5 幽灵改动（非派发，server 自走的）   |

**第 2 批（3 门，已过全仓 build；第 4 门 `1.3-velocity` 仍在跑）**

| 课件                           | e2e 溢出 | 硬编码                          | 自造类                           | style.css       | 备注                                                                                 |
| ------------------------------ | -------- | ------------------------------- | -------------------------------- | --------------- | ------------------------------------------------------------------------------------ |
| `2.2-2.3-uniform-acceleration` | 0 ✅     | 色值 3→0 / 字号 13→0 / 圆角 1→0 | 裸词 `.law`/`.sheet`/`.step` 3→0 | 229→145（−37%） | 前缀 7+ 套 → 1 套 `ua-`                                                              |
| `2.1-speed-time-experiment`    | 0 ✅     | 色值 8→0 / 字号 27→0 / 圆角 2→0 | 本地类名 38→17                   | 406→163（−60%） | `.op-*` 步骤条→共享 `.step-list`；SVG 属性 61 处等值换 token                         |
| `3.5-force-equilibrium`        | 0 ✅     | 色值 6→0 / 字号 12→0 / 圆角 1→0 | style.css 私有类 22→11           | 230→115（−50%） | **越权已还原**（`.slidev-layout.base-flex` padding + `h1`）；`.problem` 题干竖线 4→0 |
| `1.3-velocity`                 | 0 ✅     | 色值 7→0 / 字号 13→0 / 圆角 4→0 | 自造类（含 scoped）42→33         | 232→171（−26%） | 前缀 `nav-*`+`route-calc*`→`route-*`、`cmp4-*`+`tape-table`→`tbl-*`；`.problem` 8→0  |

**本批修的一个共享正本 bug（影响全部 34 门课）**：`common.css` 原来只给 `p, li` 钉 `font-size:1rem`，
而 Slidev 主题让 `.slidev-layout` 里的**裸 `div` 继承 1.1rem**。第 1 批我把题干从 `.problem`(1.02rem) 改成裸 div 时，
实际变成 1.1rem（比正文大 10%）——1.3 agent 用实测抓到（第 37 页题干 2 行→3 行、顶出 `.page-grow` 17.3px）。
已在 `common.css` 的正文规则里补 `.slidev-layout > div { font-size: 1rem }`，全仓 build + e2e 复验通过。
**后续 agent 不必再给题干补 `class="text-base"`**（正本已统一）。

- **物理不变量全部逐门复验过**：把 diff 里含公式/数值/单位的行捞出来看，改动只碰 `class`/`style` 属性，
  `24\ \text{N}`、`F=\sqrt{F_1^2+F_2^2+2F_1F_2\cos\theta}`、`g=9.8`、`H=4.05\ \text{m}`、`T=0.1\ \text{s}`、
  `\mu=0.4`、`G=40\ \text{N}`、`b=6\ \text{m}` 等逐字节未动（已按"剥掉 `class=`/`style=` 后 diff"逐门核对）。
- `courses/o2-1.3-charged-particle-motion` 的改动是**教师自己的例 5 迭代**（物理内容），与风格统一无关，别动它。

## 2. 待做（26 门，按权重分批）

基线数据（style.css 行数 / slides.md 里 `class=` 出现次数），按工作量从大到小。
（第 1 批 5 门 + 第 2 批已完工 3 门已从下表移除；`1.3-velocity` 第 2 批已派、可能仍在跑，动手前先 `git status` 确认没被别人改。）

**重（style.css 大 或 class 密集，每门一个 agent）**
`3.3-newtons-third-law`(185/135) · `4.1-newtons-first-law`(183/82) · `4.4-unit-system`(170/129) ·
`3.2-friction`(135/180) · `4.3-newtons-second-law`(132/177) · `3.1-gravity-elastic-force`(121/259) ·
`1.x-vectors`(119/171)

**中（每门一个 agent，可与重批并行）**
`5.4-projectile-motion`(108/196) · `4.2-acceleration-force-mass`(98/157) ·
`5.2-composition-decomposition-of-motion`(96/195) · `5.3-projectile-motion-experiment`(90/93) ·
`6.1-circular-motion`(84/66) · `1.2-time-displacement`(77/284) · `2.x-motion-exercises`(74/94) ·
`12.1-energy-conversion-in-circuits`(72/114) · `4.6-weightlessness`(66/96) · `6.2-centripetal-force`(65/104) ·
`5.1-curvilinear-motion`(57/64) · `1.1-motion-description`(55/246) · `6.4-circular-motion-in-life`(115/125)

**轻（几乎没毛病，可 2–4 门并给一个 agent）**
`6.3-centripetal-acceleration`(24/38) · `12.3-emf-internal-resistance`(21/115) · `o2-1.2-lorentz-force`(12/105)

> ⛔ **`o2-1.3-charged-particle-motion` 不在自动批次里**：教师要求 Leader（本人）亲手收尾，
> 任何 agent 都**不要碰这门课**。它有教师未提交的例 5 迭代，派工必然冲突。
> 本批次实际待做 = **28 门**（原 29 门减去 o2-1.3）。

## 2.5 子代理配置（本仓库会话实测）

- 模型路由：`provider="opencode-go"` + `model="deepseek-v4.1-flash"`（DeepSeek V4.1 Flash），
  思考档位 `reasoning_effort="high"`。三者必须**同时**给，缺 provider/model 会退回默认路线。
- ⚠️ id 是**全小写** `deepseek-v4.1-flash`——写成 `DeepSeekV4.1` 会被拒
  （`child LLM route ... is not allowed for this Session`）。本会话只注册了 `opencode-go` 一个 provider。

## 3. 每批怎么派（照抄，别改写范围）

每门课的写范围**只有它自己的 `courses/<slug>/`**，多门并行天然无冲突。给 agent 的任务说明要点：

1. 先读 `.agents/notes/style-guide.md`，按 §3（token）/ §4（框纪律）/ §6（命名）执行。
2. **五个动作**：① 硬编码色值/字号/圆角 → `var(--c-*)` / `.text-*` 阶梯 / `var(--radius-*)`；
   ② 卡片超 15 处 → 提问 `.ask`、结论 `.key`、对比 `.half-grid + .divider-l`；
   ③ 裸类名 → 补定义或删掉改 UnoCSS 工具类；④ 同课内前缀统一成**概念前缀**（不是课号前缀）；
   ⑤ 题干/解析去掉 `.problem` 竖线（边框只留给弱提示文字）。
3. **硬门槛**：`E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts` 溢出必须 = 0。
4. **物理不变量绝对优先**：公式/数值/单位/受力分析一个字都不许改；拿不准就不改那处。
5. 回报格式：改了哪些文件、各指标前后数、e2e 溢出数、判断"不该改"的地方及理由、需 Leader 复核的点。

**验收由 Leader 做**（不看截图）：`git diff` 只捞**非 class 行**确认物理内容未动 + 独立复跑 e2e 确认溢出=0 + `pnpm build` 全仓过。

## 4. 工具（已修好，可直接用）

```bash
pnpm style:audit <slug>        # 一键体检：卡片 / 图标 / 硬编码色值·字号·圆角 / 裸类名 / 越权覆盖 / 自造类名
pnpm build                     # 全仓构建（改完一批必跑）
E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts   # 版面四表，溢出=0 是门槛
```

`scripts/style-audit.ts` 本轮修过四个 bug，**新 agent 不要再改这个文件**（写范围外）：

- TDZ 崩溃：`read` 已改成 function 声明（会被提升），别改回 `const` 箭头函数。
- `SHARED_ATOMS` 现在**从 `workspace/shared/styles/{common,layout,atoms}.css` 现读**，不再手工维护。
- `--cols` 误报已修：只查 `:root` 块内的非密度变量，类作用域的自定义属性（`.fig-wide { --cols: … }`）是官方旋钮、放行。
- ⚠️ **`m` 标志丢失（第 2 批两个 agent 独立发现）**：`CLASS_DEF = /^\s*\.…/mu` 用 `new RegExp(CLASS_DEF.source, "gu")` 重建时
  **丢了 `m`**，`^` 只锚文件首行 → `defined` 集合恒空 → **"自造类"永远打印 0、裸类名检查整体失效**。已全部补成 `"gmu"`。
  **教训**：从带标志的正则重建新正则时，必须把原标志全带上（`source` 只带模式、不带标志）。
  第 1 批验收时这个 bug 还在，所以那时的"自造类 0"不可信——但第 1 批的 e2e 溢出=0 与物理不变量是独立验证的，结论仍成立。

**验收 agent 回报时别只信自报**：让它给"剥掉 `class=`/`style=` 后与 HEAD 逐字节 diff"的结论，但你要自己再跑一遍同样的核对
（第 2 批 3 门我都独立复验过，含公式 `$T=0.1\ \text{s}$`、`$\mu=0.4$`、`$G=40\ \text{N}$` 等逐字未动）。

## 5. 幽灵改动教训（最容易踩的新坑）

- **症状**：某门课被改了，但**从没给它派过 agent**。12.4 就是这样——它的课件 dev server 从未关闭，
  文件一变动 server 就收到通知、自己又跑了一轮风格处理。
- **根因**：`pnpm dev` / `slidev` 长驻进程监听文件；agent 改文件 → server 重处理 → 覆盖或叠加改动。
- **处置**：**每批开工前先清 dev server**：
  ```bash
  lsof -iTCP -sTCP:LISTEN -P 2>/dev/null | grep -i node   # 找到 slidev/vite 监听进程
  kill <pid>                                                # 清掉（教师确认过可全杀）
  ```
  收工后也别留着 server。教师本机若自己开着某个课件的 server，开工前问一句哪些不能杀。

## 6. 已完成课件的待拍板项（教师未决，别自作主张改）

- **2.4 第 24 页**残留 18px `.page-grow` 警告：展开态版面正常、仍在 552px 画布内（溢出=0）。
  备选方案要让示意图缩 16% 才能清零，违反"图必须占满"——**当前判保留**。
- **1.4 第 16 页**高亮格从"金色底"改成 `.card-highlight`（金边柔光），底色不再发金；要更突出需加 `--c-accent-soft` 底。
- **1.4 第 7 页** `<Latex tex="m/s²" />` 单位没走 `\text{}`（违反符号规范），样式任务范围外未改，**建议改**。
- **`#60a5fa` 的处理已定口径**（原"4 处"表述不准，已核）：1.4 换掉的是 **`style.css` 里的 CSS 声明**；
  **SVG 表现属性里的 `#60a5fa`（全仓 216 个源文件）一律保持字面值**——UnoCSS attributify + SVG 对 `var()` 支持不一致，
  换了可能整块图形不显示。已写进 [`style-guide.md`](style-guide.md) §3，2.1 agent 未换是**正确**的，不算分歧。

**第 2 批新增的待拍板项**

- **2.1 第 5 页**对/错小节标题改成 `<span class="bad-line"><mdi-… class="text-3xl"/></span>`
  （绕过 `.mini-title > svg` 的蓝色，让色值走共享原子）。截图确认红⊗/绿✓正常，但**这是 agent 加的 DOM 结构**，请过目。
- **2.1 第 7 页**记录表不再本地收紧字号（删 0.72rem，用共享 `.data-table` 0.85rem）：10 列不溢出，
  但**确实比原来大一号**，上课前扫一眼。
- **3.5 第 27 / 31 页各有 2 处 `.key`**（"一页最多一处"的规则）：27 页是绿/红对错双栏、31 页是两个问+答。
  **基线即如此、agent 未动**；改成 `.half-grid+.divider-l` 会破坏对错对称与双问答的教学设计，请定夺。
- **3.5 第 23 页**为容纳还原后的 padding，把 `.half-grid` 换成 `.split-wide p23-split`（图 15rem 像素级未变、
  右栏 420→518px、推导 10 行→7 行）。我已截图核过：动滑轮、$\alpha$/$\beta$ 角、A/B/C 支点均无变形。

**第 3 批（1.3-velocity）新增的待拍板项**

- **1.3 第 2 页**导航面板底色 `rgb(15 23 42/72%)` → `var(--c-surface)`（更亮的玻璃态）、底图 → `var(--c-bg)`；「推荐」
  小标签由私有 `.nav-tag`(0.68rem) 换共享 `.tag text-accent`(0.7rem、内边距更大)。
- **1.3 `.fun-note` 气泡**：底 6% → `--c-accent-soft`(14%，更明显)、圆角 → `--radius-md`、字号 → `.mini-note`(0.85)。
- **1.3 第 2 页路线蓝点/蓝条** `#60a5fa` → `var(--c-accent-2)`（暗一档）——与 1.4 同类，见上方 §3 口径说明。
- **`.key` 密度是全仓系统性问题**：1.3 有 **61 处**（第 14 页 4 处、第 18 页 6 处），与"一页最多一处"冲突；
  但第 1 批的 1.4=24、2.4=22、3.4=21 同样保留。**这不是本次新引入的**，建议单独开一轮收敛（改 `.half-grid+.divider-l`），
  否则"一页一处"这条规则形同虚设——要么改课件、要么把规则放宽到"结论类才限一处"。
- **1.3 第 9 / 23 页**三栏并列条目按 §5 应配扫读图标，本次未加（改观感、不在五个动作内）。

## 7. 本会话新增的共享资产（已完成，新 agent 直接用，别重造）

- `workspace/shared/styles/atoms.css`：`.ok`/`.bad`（对错语义色，收敛 6 课双轨绿）· `.step-list`/`.step-item`/`.step-no`
  （编号步骤条，≥9 课自建过）· `.figure`/`.fig-cap`（图占满栏宽、**零背景边框**）· `.data-table`/`.hl` ·
  `.split-wide`/`.fig-narrow`（左图右文比例栅格，`--cols` 可调）。
- `workspace/shared/components/`：`CircuitBattery` / `CircuitResistor`（3:1 圆角 2px）/ `CircuitSwitch` /
  `CircuitBulb` / `CircuitMeter` / `FieldDots`（磁场平铺**裸 ×/· 不加圈**）/ `FieldMark`（单个带圈 ⊙/⊗）。
  规范见 [`electronic-symbols.md`](electronic-symbols.md)。
- `workspace/shared/layouts/`：`exercise-split`（题目页：题干+窄图+解析）· `focus-question`（思考页：一个大问题占满整页）。
  用法见 [`exercise-layouts.md`](exercise-layouts.md)（⚠️ 具名 slot 不能写 `<template #stem>`）。
- `workspace/shared/styles/common.css`：新增 `.icon-md/lg/xl/2xl` 图标尺寸阶梯（治"图标被 svg 16px 基准钉死"）。

## 8. 交接检查单（新 Agent 第一步）

1. `git status --short` 看工作区（有教师未提交的 `o2-1.3` 例 5 迭代，**别动**）。
2. 确认无残留 dev server（§5）。
3. 读 `.agents/notes/style-guide.md` 全文 + 本文件 §2 批次表。
4. 从 §2 重批里挑 N 门（建议 4 门并行），按 §3 派 agent。
5. 收工验收：非 class 行 diff + e2e 溢出=0 + `pnpm build`。
6. 更新本文件 §1（移入已完成）与 §2（移出已做），保持进度可追溯。
