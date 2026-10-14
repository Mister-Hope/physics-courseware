# 笔记：课件风格统一指南（跨课件一致性）

> 什么时候读：**新建课件**、给已有课件加页面、review 一份课件的风格时。
> 分工：本篇管"**跨课件长得一样**"；单页怎么排版 → [`slidev-layout.md`](slidev-layout.md)；
> 公式 / 图标怎么写、图标名怎么验证 → [`katex-fonts-icons.md`](katex-fonts-icons.md)；
> E2E 量版面 → [`e2e-checks.md`](e2e-checks.md)。**视觉正本在 `workspace/shared/styles/`**（`common.css` 设计系统 + `layout.css` 版式原子）。

## 0. 为什么有这份指南（2026-10 全仓实测）

每门课是**不同时刻的 AI 读着 AGENTS.md 现写**的，于是：

| 现象                     | 实测数据                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 各写各的类名             | 34 门课 `style.css` 自造类名 **349** 个，其中 **302 个只在 1 门课出现**                                                                                                                            |
| 同一概念多套写法         | 编号步骤条 **≥9 课**自建（`q-num` / `op-num` / `step-no` / `fe-step-no` / `p13-num` / `sf-step`…）；图外壳 **8/10 课**；数据表 **≥8 课**（各自整套覆盖共享 `table/th/td`）；"对/错"语义色 **6 课** |
| **同名不同义**（最危险） | `.step`＝1.3 居中 0.95rem ↔ 2.2 带序号 0.98rem；`.data-table`＝1.4 的 0.92rem ↔ 2.1 的 0.72rem；`.graph-grid`＝1.35fr ↔ 1.9fr；`.qa-a`＝灰字 ↔ 金字                                                |
| 视觉参数漂移             | `style.css` 里 `font-size` 字面值 **≥110 处**，而共享字号阶梯 `.text-lg…text-5xl` 全 10 课只用了 **9 次**；金色/蓝色 alpha 共 24 处没有 token 可用；"正确绿"双轨 `#34d399` ↔ `#4ade80`             |
| 图标没人用               | **11/34 门课一次图标都没用**，用的那 23 门从 1 次到 44 次不等                                                                                                                                      |
| 卡片滥用                 | `10.4-capacitor` 一门 **54 处** `.card`（规范是"一份课件 ≤15"，第二名才 12）                                                                                                                       |
| 越权覆盖共享选择器       | 3.5 直接改 `.slidev-layout.base-flex` 的 padding 与 `h1` 字号；1.1 / 1.2 重写 `.ask`；12.1 重写 `.problem`                                                                                         |

> 正本**不是**没人用：`.key` / `.page-grow` / `.ask` / `.stack` / `.half-grid` 在 10 门大课里合计 850+ 次引用。
> 分裂集中在**原子没覆盖到的那几类细节**（步骤条、图外壳、数据表、对错色、比例栅格），见 §7。

## 1. 三步决策：一个样式该放哪

1. **先查正本**：`workspace/shared/styles/`（§2 的词汇表）里有 → 直接用，不写新的；
   只是间距 / 对齐这类一次性微调 → 用 UnoCSS 工具类（`gap-4`、`mt-2`、`grid-cols-2`）。
2. **只有"这一课这一处"**才写进本课 `style.css`，并按 §6 命名（带前缀）。
3. **超过一门课会用到的概念** → 按 §7 的规范统一写法，然后提升到共享 addon：
   在 `workspace/shared/styles/layout.css` 里加原子 → 各课删掉自己的私有版本 → `pnpm build` 复验所有课件。

## 2. 原子词汇表（正本；用这些，别自造近义词）

| 想表达                             | 用什么                                                                                                                                                   | 出处                                           |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 页面骨架（正文撑满剩余高度）       | `.page-grow`（内容多加 `.page-grow-tight`）                                                                                                              | `layout.css`                                   |
| 纵向堆叠                           | `.stack` / `.stack-dense` / `.stack-tight`                                                                                                               | `layout.css`                                   |
| 两栏 / 三栏                        | `.half-grid` / `.three-col`（已带 `minmax(0,1fr)` 防撑爆）                                                                                               | `layout.css`                                   |
| 双栏对比的分隔线                   | `.divider-l`（右栏加一条竖线，代替第二张卡片）                                                                                                           | `layout.css`                                   |
| 提问（先问）                       | `.ask` / 放大版 `.ask-lead`                                                                                                                              | `layout.css`                                   |
| 结论 / 落点（后答）                | `.key` / `.key-blue` / `.key-danger` / 放大版 `.key-lead`                                                                                                | `layout.css`                                   |
| 习题题干                           | `.problem`（蓝色竖线，整题不用卡片）                                                                                                                     | `layout.css`                                   |
| 小节标题 / 小字注释                | `.mini-title`（**自带 `> svg` 图标位**） / `.mini-note`                                                                                                  | `layout.css`                                   |
| 小结行                             | `.summary-line`                                                                                                                                          | `layout.css`                                   |
| 卡片（**只有定义能用**，见 §4）    | `.card` / `.card-highlight`                                                                                                                              | `common.css`                                   |
| 圆角标签 / 封面图标胶囊            | `.tag` / `.tag-icon`                                                                                                                                     | `common.css`                                   |
| 文字强调色                         | `.text-accent`（金） / `.text-accent-2`（蓝）                                                                                                            | `common.css`                                   |
| 字号阶梯                           | `.text-lg` 1.1 → `.text-xl` 1.25 → `.text-2xl` 1.4 → `.text-3xl` 1.7 → `.text-4xl` 2.1 → `.text-5xl` 2.6                                                 | `common.css`                                   |
| 图标尺寸（**放大图标只能用这个**） | `.icon-md` 1.5 → `.icon-lg` 2.2 → `.icon-xl` 3 → `.icon-2xl` 4（都带 `!important`，压得过 svg 的 16px 基准）                                             | `common.css`                                   |
| 对 / 错语义色                      | `.ok` / `.bad`（软底标签） · `.ok-line` / `.bad-line`（只上色不上底）；色值 `--c-ok` / `--c-danger`                                                      | `atoms.css`                                    |
| 编号步骤条                         | `.step-list` > `.step-item`（左圆徽 `.step-no` + 右正文）                                                                                                | `atoms.css`                                    |
| 图占满栏宽（**不加背景/边框**）    | `.figure`（只 `width:100%`；交互组件与示意图要无缝嵌入，不要圆角矩形托底）+ `.fig-cap` 图注                                                              | `atoms.css`                                    |
| 紧凑数据表                         | `.data-table`（+ `.hl` 高亮行）                                                                                                                          | `atoms.css`                                    |
| 左图右文比例栅格                   | `.split-wide`（`--cols` 可调）+ `.fig-narrow`（图窄文宽变体）                                                                                            | `atoms.css`                                    |
| 电路 / 磁场符号                    | `<CircuitBattery>` `<CircuitResistor>` `<CircuitSwitch>` `<CircuitBulb>` `<CircuitMeter>` `<FieldDots>` `<FieldMark>`（⛔ 禁止手画元件符号与磁场叉点阵） | [electronic-symbols.md](electronic-symbols.md) |
| 封面                               | `layout: course-cover` + `cover-*`（⛔ 禁止手写封面 HTML）                                                                                               | 共享 addon                                     |

## 3. 视觉参数：一律走 token，禁止硬编码

`:root` 里已有：`--c-bg` `--c-bg-soft` `--c-surface` `--c-surface-solid` `--c-border` `--c-border-glow`
`--c-text` `--c-text-dim` `--c-accent`（金 `#e2a846`）`--c-accent-2`（蓝 `#3b82f6`）`--c-physics`（青 `#2dd4bf`）
`--c-danger`（红 `#f87171`）`--radius-xl/lg/md/sm`（1.75 / 1.25 / 0.75 / 0.5rem）。

- **色值 100% 走 `var(--…)`**。`style.css` 里出现 `#hex` / `rgb(` 就是待修项（`grep -nE '#[0-9a-f]{3,8}|rgb\(' courses/<slug>/style.css | grep -v 'var(--'`）。
- **缺 token 就补 token，不许写死**。当前 3 个系统性缺口（谁先用谁在 `common.css` 补，别再各自写死）：

  | 缺口                | 现状（各课写死值）                                                      | 建议 token                                          |
  | ------------------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
  | 金色/蓝色半透明     | `rgb(226 168 70 / 8%~35%)` 16 处、`rgb(59 130 246 / 14%~55%)` 8 处      | `--c-accent-soft` / `--c-accent-2-soft`（含 alpha） |
  | "正确 / 错误"语义色 | `#34d399`（1.2 / 2.1 / 3.4）↔ `#4ade80`（3.5 / 4.4）双轨                | `--c-ok` / `--c-danger`（后者已有）                 |
  | 面板深底            | `rgb(15 20 37 / …)` 与 `rgb(15 23 42 / …)` 两套，都不等于 `--c-surface` | 用 `--c-surface`，确实要更暗再补 `--c-surface-deep` |

- **字号只走阶梯**：正文 1rem；强调用 `.text-*`；小字注释用 `.mini-note`（0.85rem），下限 **0.65rem**。
  ⛔ 禁止 `0.92rem` / `0.95rem` / `0.88rem` 这类私调值——它们正是"各课字不一样大"的来源。
- **圆角走 `var(--radius-*)`**；只有胶囊（`999px`）和正圆（`50%`）允许字面值。
- **间距只许覆盖 `--page-gap` / `--stack-gap`**（`layout.css` 明确留的唯一出口，12–14 门课在用，合法）。

## 4. 框的纪律（`10.4-capacitor` 是反面教材：54 处）

**左侧竖线（`.problem` / `.key` / `.divider-l` 这类）只给"弱提示性文字"用**——
讨论提示、易错警示、旁注、双栏之间的分隔。**主体内容一律不套**（教师明确要求）。

| 内容                     | 用什么                      | 不要用                                  |
| ------------------------ | --------------------------- | --------------------------------------- |
| 定义（要"立住"的一句话） | `.card`                     | —                                       |
| 提问                     | `.ask`                      | 卡片、竖线                              |
| 结论 / 落点              | `.key`（一页最多一处）      | 卡片、多处竖线                          |
| 双栏对比                 | `.half-grid` + `.divider-l` | 两张卡片并排                            |
| 习题题干 / 题目页题干    | 普通段落（置顶整宽即可）    | ⛔ 竖线、卡片（题干是主体，不是弱提示） |
| 解析 / 推导正文          | 普通段落                    | ⛔ 竖线、卡片                           |
| 讨论提示 / 警示 / 旁注   | `.mini-note`（或竖线提示）  | 卡片                                    |
| 连续叙述 / 过渡          | 不加任何框                  | 任何框                                  |

自查：`for d in courses/*/; do n=$(grep -oh 'class="[^"]*"' "$d"slides.md "$d"components/*.vue 2>/dev/null | grep -oE '\bcard[a-z0-9-]*\b' | wc -l | tr -d ' '); echo "$n $(basename "$d")"; done | sort -rn | head`

## 5. 图标：该用的地方**必须**用（现在 11/34 门课一个都没用）

已有规则见 [`katex-fonts-icons.md`](katex-fonts-icons.md) §2（一个语义一个、禁 emoji、**先验证名字存在**）。
本节补的是**正向清单**——不是"少用"，而是"**该用的地方要用**"：

- ✅ **必须配图标**：并列可扫读的结构——概念三栏 / 要素列举 / 步骤条 / 图注前的标记 / 对错判定。
  它们是学生一眼扫过的东西，图标就是那层"扫读锚点"（反例：`3.1-gravity-elastic-force` 第 2 页"大小 / 方向 / 作用点"三栏一个图标都没有）。
- ❌ **仍然不用**：提问行 `.ask`、结论行 `.key`、连续叙述——图标在那里只会吵（这是老师明确否过的用法）。
- 放置：`.mini-title` 里直接写（共享原子已给 `> svg` 留了金色/蓝色位）；条目里用 `text-xl` 级图标 + 文字同行。
- 常用语义映射（**名字已逐个在 `node_modules/@iconify-json/mdi/icons.json` 验证存在**）：

  | 语义          | 写法                                                             | 语义          | 写法                                                               |
  | ------------- | ---------------------------------------------------------------- | ------------- | ------------------------------------------------------------------ |
  | 测量 / 尺度   | `<mdi-ruler />`、`<mdi-ruler-square />`                          | 数据 / 表格   | `<mdi-table />`、`<mdi-chart-scatter-plot />`                      |
  | 方向 / 矢量   | `<mdi-arrow-right-bold />`、`<mdi-vector-point />`               | 图解 / 图线   | `<mdi-vector-polyline />`、`<mdi-chart-timeline-variant />`        |
  | 位置 / 作用点 | `<mdi-crosshairs />`、`<mdi-map-marker />`                       | 步骤 / 顺序   | `<mdi-format-list-numbered />`、`<mdi-numeric-1-circle />`         |
  | 实验器材      | `<mdi-flask-outline />`、`<mdi-test-tube />`                     | 结论 / 要点   | `<mdi-lightbulb-on-outline />`、`<mdi-star-four-points-outline />` |
  | 生活实例      | `<mdi-home-city-outline />`、`<mdi-car-side />`、`<mdi-earth />` | 易错 / 警示   | `<mdi-alert-circle-outline />`、`<mdi-information-outline />`      |
  | 公式 / 推导   | `<mdi-equal />`、`<mdi-sigma-lower />`                           | 对 / 错       | `<mdi-check-decagram />`、`<mdi-close-circle-outline />`           |
  | 定义 / 概念   | `<mdi-book-open-variant />`                                      | 对比 / 交换   | `<mdi-swap-horizontal />`、`<mdi-scale-balance />`                 |
  | 时间 / 时刻   | `<mdi-clock-outline />`、`<mdi-timer-sand />`                    | 力 / 矢量箭头 | `<mdi-arrow-up-bold-outline />`、`<mdi-vector-link />`             |

  表外的名字**写之前先查** `icons.json`（写错＝整页 500）；同一页不要出现两个相同图标。

## 6. 命名规范（"同名不同义"已经发生过 4 次）

- ⛔ **禁裸词**：`.step`、`.map`、`.chain`、`.note` 这种没有命名空间的类在 monorepo 里必然跨课碰撞。
- ✅ **用"话题前缀"做命名空间**：一份课件内部按小节/图型分组是**好事**（3.4 用 `ae-`（力的分解）、
  `dc-`（临界案例）、`fp-`（分力）就是对的写法）。前缀取**概念**，别取课号——`fe-` / `ac-18` 这种
  只有写的人看得懂，等于"一课一套原子"。
- ⚠️ **同一课内部前缀要统一**：3.4 一边用 `ae-`/`dc-`/`fp-`，`style.css` 里又定义 `sd-`/`gr-`/`p5-`/`sv-`，
  同类概念两套名字——改一处想不到另一处。一门课定 3–5 个前缀，小节内固定用。
- **"已定义" = 本课 `style.css` ∪ 任一组件的 `<style>`（含 `<style scoped>`）**。本仓库大量课件把类写成
  组件局部样式（3.4 的 `ae-`/`dc-`/`fp-*` 全在 `<style scoped>` 里），这**是合规写法、不是裸类名**。
  `pnpm style:audit <slug>` 已按此口径统计；别再把组件里的 scoped 类当成"没定义"去 style.css 里补副本。
- ⚠️ **别为了"消裸类名"把组件 scoped 样本抄进 `style.css`**：scoped 特异性更高、永远赢，抄出来的副本全是死代码，
  还造出两套真相（改一处不知道另一处）——这正是本次统一要治的病。
- 页面专属样式可用 `p<页号>-`（如 `p13-`）：自文档化、不会外溢；但**只给"这一处"用**，别把跨页概念塞进页码前缀。

## 7. 已提升的共享原子（`workspace/shared/styles/atoms.css`；直接用，别再各课自建）

下面 5 类**已被 6–9 门课重复发明**，是当前风格分裂的主体。**已全部提升到 `atoms.css`**（经 `pnpm build` 全仓复验，
且 CSS 加载顺序保证课件本地同名定义优先覆盖，存量课件零回归）。新课件**直接用这些原子**，不要再写第 9 套步骤条、第 8 套数据表：

| 原子           | 干什么                             | 关键取值 / 用法                                                                              |
| -------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `.step-list`   | 编号步骤条：左序号徽章 + 右正文    | `.step-list` > `.step-item`（`.step-no` 圆徽 + 正文）；≥9 课自建过                           |
| `.figure`      | 图占满栏宽（**零背景/边框/圆角**） | 交互组件与示意图**无缝嵌入**页面（教师明确要求，不要圆角矩形托底）；配 `.fig-cap` 图注       |
| `.data-table`  | 紧凑数据表                         | `font-size:0.85rem` + `tabular-nums`；`.hl` 高亮行                                           |
| `.ok` / `.bad` | 对 / 错语义色（唯一出口）          | `--c-ok: #34d399`（收敛 6 课的 `#34d399`↔`#4ade80` 双轨）；`.ok-line` / `.bad-line` 行内变体 |
| `.split-wide`  | 左图右文比例栅格                   | `--cols` 可调；`.fig-narrow` = 图窄文宽（`0.85fr / 1.8fr`）；替代 7 课 29 个一次性 grid      |

## 8. 越权覆盖（禁止；发现就收敛）

- `:root` 里**只能**覆盖 `--page-gap` / `--stack-gap`。
  ✅ **例外：类作用域里的自定义属性是官方旋钮，随便写**。`.split-wide` 的 `--cols` 就是这么用的——
  课件要变体就在自己 `style.css` 里给一个**新类名**（正本 `.fig-narrow` 自己就是 `--cols: 0.85fr / 1.8fr`）：
  ```css
  .fig-wide {
    --cols: minmax(0, 2.2fr) minmax(0, 1fr);
  } /* ✅ 图宽文窄变体，合法 */
  ```
  判据是**改的是不是全局默认值**：`:root { --c-accent: … }` 改全局 ❌；`.my-variant { --cols: … }` 只影响挂了这个类的元素 ✅。
  ⛔ 但变体类只能**新增**，不能重写 `.split-wide` / `.figure` / `.data-table` 这些共享选择器本体。
- ⛔ 不得重写共享选择器：`.slidev-layout.base-flex`、`h1`、`table/th/td`、`.mini-title`、`.ask`、`.problem`、`.key`。
  长课题名封面压字号是唯一被认可的例外（`.cover-title` → 2.7rem，见 [`slidev-layout.md`](slidev-layout.md) §4）。
- 现存越权，改到相关课件时顺手收敛：3.5 改了 `base-flex` padding 与 `h1`；1.1 / 1.2 重写 `.ask`
  （1.2 的例外是**合法**的：提问行"大图标 + 一段话"两段式必须 flex，纯文本行反而会碎——写进本课 README 说明即可）；12.1 重写 `.problem`。

## 9. 风格验收（新课件必跑，review 别人课件也跑）

```bash
pnpm style:audit <slug>        # 一键体检：卡片数 / 图标数 / 硬编码色值·字号·圆角 / 裸类名 / 越权覆盖 / 自造类名数
pnpm shots <slug> <页号>        # 目测：图标是否到位、卡片是否克制
E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts   # 版面四表
pnpm build                     # 收尾
```

存量课件按"**谁改谁收敛**"逐步统一，不要求一次性大改；新建课件必须从第一版就守本篇。

### 批量改造时的协作铁律（真踩过：两个写入方同写一份文件）

- ⛔ **`subagent` 是"发射后不管"，不能用来"回话"**：每次调用都**新开**一个独立执行者，
  它不在 `list_agents` 队列里、也收不到 `send_message`。想给一个已在跑的执行者补指令 = 又开了一个**并发写入方**。
  （本次教训：想给 3.4 的执行者回一句"别做 X"，结果同写 `style.css` + `slides.md`，对方只能靠 mtime 抓到我。）
- ✅ 要能中途对话/纠偏，就用 **teammate**（`send_message` 可寻址、有 durable mailbox）；
  只派一次性活儿才用 `subagent`，且**派出去就别再碰同一份文件**——包括 leader 自己。
- ✅ 一个执行者 = 一份**互不重叠**的写范围（一门课的 `courses/<slug>/` 天然隔离），多门课并行安全。
- ✅ 验收别只信自报：自己 `git diff` 过一遍**非 class 行**（公式/数值/单位必须逐字节未动），
  并独立复跑 `E2E_COURSE=<slug> … layout-overflow` 确认溢出=0。**物理内容零改动是硬门槛。**

## 10. 违规实例对号入座（真实数据，用来校准判断）

- `10.4-capacitor`：54 处 `.card`——其中绝大多数本该是 `.key` / `.divider-l` / 普通行。
- `3.1-gravity-elastic-force` 第 2 页：`.three-col` 三栏"大小 / 方向 / 作用点"，`.mini-title` 空着没放图标。
- `3.5-force-equilibrium`：`fe-step-no` / `fe-cap` / `fe-fig` / `fe-method` 一套私有原子，且改了 `base-flex` 外壳。
- `#34d399`（1.2 / 2.1 / 3.4）与 `#4ade80`（3.5 / 4.4）表达同一个"正确"语义——两个绿。
