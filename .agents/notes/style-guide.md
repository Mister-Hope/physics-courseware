# 笔记：课件风格统一指南（跨课件一致性）

> 什么时候读：**新建课件**、给已有课件加页面、review 一份课件的风格时。
> 分工：本篇管"**跨课件长得一样**"；单页怎么排版 → [`slidev-layout.md`](slidev-layout.md)；
> 公式 / 图标怎么写、图标名怎么验证 → [`katex-fonts-icons.md`](katex-fonts-icons.md)；
> E2E 量版面 → [`e2e-checks.md`](e2e-checks.md)。
> 视觉正本：`workspace/shared/styles/`（`common.css` 设计系统 + `layout.css` 版式原子 + `atoms.css` 补齐原子）。

## 1. 一个样式该放哪：三步决策

1. **正本里有** → 直接用 §2 的原子，不写新的；纯间距 / 对齐的一次性微调 → UnoCSS 工具类（`gap-4`、`mt-2`）。
2. **只有"这一课这一处"** → 写进本课 `style.css`，按 §6 命名。
3. **超过一门课会用到的概念** → 提升到共享 addon（`layout.css` / `atoms.css`）→ 各课删掉私有版本 → `pnpm build` 复验全仓。

## 2. 原子词汇表（正本：用这些，别自造近义词）

> 一条一句：**类名 — 用途**。带 ⛔ 的是硬约束。

**版面骨架**

- `.page-grow` — 正文撑满剩余高度；内容多时加 `.page-grow-tight`
- `.stack` / `.stack-dense` / `.stack-tight` — 纵向堆叠
- `.half-grid` / `.three-col` — 两栏 / 三栏（自带 `minmax(0,1fr)`，防不可断行内容撑爆）
- `.split-wide` — 左图右文比例栅格，`--cols` 可调；`.fig-narrow` = 图窄文宽变体
- `.divider-l` — 双栏之间的竖线（代替第二张卡片）

**提问与结论**

- `.ask` / `.ask-lead` — 提问（先问）
- `.key` / `.key-blue` / `.key-danger` / `.key-lead` — 结论 / 落点（**一页最多一处**）
- `.summary-line` — 小结行
- `.mini-title` — 小节标题（**自带 `> svg` 图标位**）
- `.mini-note` — 小字注释（0.85rem）

**框与卡片（纪律见 §4）**

- `.card` / `.card-highlight` — 只有**定义**能用，一份课件 ≤15 个
- `.tag` / `.tag-icon` — 圆角标签 / 封面图标胶囊
- `.problem` — 习题题干的**存量写法**；题干是主体，一律普通段落、不套竖线（见 §4）

**文字与语义色**

- `.text-accent`（金）/ `.text-accent-2`（蓝）— 文字强调色
- `.ok` / `.bad` — 对 / 错语义色（软底标签）；`.ok-line` / `.bad-line` — 只上色不上底
- `--c-ok` / `--c-danger` — 语义色 token，对错的唯一出口，别再各课定义第二套绿/红

**图表与数据**

- `.figure` — 图占满栏宽，**零背景 / 边框 / 圆角**（交互组件与示意图要无缝嵌入）；图注配 `.fig-cap`
- `.data-table` — 紧凑数据表（0.85rem + `tabular-nums`）；`.hl` 高亮行
- `.step-list` > `.step-item` — 编号步骤条（`.step-no` 圆徽 + 右正文）

**尺寸阶梯（放大只能用这两个阶梯）**

| 用途 | 档位                                                                                                       |
| ---- | ---------------------------------------------------------------------------------------------------------- |
| 字号 | `.text-lg` 1.1 · `.text-xl` 1.25 · `.text-2xl` 1.4 · `.text-3xl` 1.7 · `.text-4xl` 2.1 · `.text-5xl` 2.6   |
| 图标 | `.icon-md` 1.5 · `.icon-lg` 2.2 · `.icon-xl` 3 · `.icon-2xl` 4（带 `!important`，压得过 svg 的 16px 基准） |

**专用组件（⛔ 禁止手画）**

- 电路 / 磁场符号 → `<CircuitBattery>` `<CircuitResistor>` `<CircuitSwitch>` `<CircuitBulb>` `<CircuitMeter>` `<FieldDots>` `<FieldMark>`，见 [`electronic-symbols.md`](electronic-symbols.md)
- 封面 → `layout: course-cover` + `cover-*`，⛔ 不手写封面 HTML

**常见组合（照抄）**

- 先问后答：`<div class="ask">…</div>` → `<div class="key">…</div>`
- 左图右文：`<div class="split-wide"><div class="figure"><XxxSvg /></div><div class="stack">…</div></div>`
- 双栏对比：`<div class="half-grid"><div>…</div><div class="divider-l">…</div></div>`

出处：前四组多在 `layout.css` / `common.css`；`.ok` `.bad` `.step-list` `.figure` `.data-table` `.split-wide` 在 `atoms.css`。

## 3. 视觉参数：一律走 token，禁止硬编码

**可用 token**（`common.css` / `atoms.css` 的 `:root`）

- 颜色：`--c-bg` `--c-bg-soft` `--c-surface` `--c-surface-solid` `--c-border`（10%）`--c-border-glow` `--c-text` `--c-text-dim` `--c-accent`（金）`--c-accent-2`（蓝）`--c-physics`（青）`--c-danger` `--c-ok`
- 半透明语义底 / 描边：`--c-ok-soft` `--c-danger-soft` `--c-accent-soft` `--c-accent-2-soft`
- 圆角：`--radius-xl` 1.75 · `--radius-lg` 1.25 · `--radius-md` 0.75 · `--radius-sm` 0.5rem

**五条铁律**

1. **色值 100% 走 `var(--…)`**：`style.css` 与组件 `<style>` 里出现 `#hex` / `rgb(` 即待修
   （`grep -nE '#[0-9a-f]{3,8}|rgb\(' courses/<slug>/style.css | grep -v 'var(--'`）。
   没有现成 token 就用 `color-mix(in srgb, var(--token) N%, transparent)`，或**补一个 token**，不许写死。
2. **SVG 表现属性里的色值也走 `var(--c-*)`**：`fill="var(--c-velocity)"` / `stroke="var(--c-accent)"` 是**合法写法**——
   SVG 2 §6.6 规定表现属性的值**按 CSS 值解析**（不是声明），CSS Variables §3 规定 `var()` 可替换任何 CSS 值中的任意部分，
   两条规范合起来就是这个结论（Chromium 实测 `getComputedStyle().fill === "rgb(226, 168, 70)"` 同样证实）。
   ⇒ `<svg>` 里的 `fill=` / `stroke=` / `stop-color=` 一律 token 化，**不再保留字面值**；存量字面值（`#60a5fa` / `#94a3b8` / `#2dd4bf`…）
   与 token 同值，属历史写法，**谁改谁收敛**（本轮之后的批次按此执行）。
   （`fill` / `stroke` / `opacity` 会被 attributify 当工具类抓走——坑与正本修复见 [`svg-attributify-trap.md`](svg-attributify-trap.md)，本指南不重复。）
3. **字号只走阶梯**：正文 1rem；强调用 `.text-*`；小字注释 `.mini-note`（0.85rem）；下限 **0.65rem**。
   ⛔ `style.css` 里禁止 `0.92rem` / `0.95rem` / `0.88rem` 这类私调值。
   阶梯在 0.65–1.1rem 之间只有 `.mini-note` 一档，**组件 `<style scoped>` 内部**的固定版式微字号允许保留（不算违规）。
4. **圆角走 `var(--radius-*)`**；只有胶囊（`999px`）与正圆（`50%`）允许字面值。
5. **间距只许覆盖 `--page-gap` / `--stack-gap`**（`layout.css` 留的唯一出口）。

**已知缺口**（谁先用谁在 `common.css` 补，别再各自写死）：金色/蓝色半透明 → `--c-accent-soft` / `--c-accent-2-soft`；
"正确"语义双轨 `#34d399` ↔ `#4ade80` → 统一走 `--c-ok`；面板深底两套 `rgb(15 20 37/…)`、`rgb(15 23 42/…)` → 用 `--c-surface`。

## 4. 框的纪律

**左侧竖线（`.problem` / `.key` / `.divider-l`）只给"弱提示性文字"用**——讨论提示、易错警示、旁注、双栏分隔；
**主体内容一律不套**（教师明确要求：给公式、叙述套装饰框线没有任何信息量）。

| 内容                     | 怎么写                      | ⛔ 不要                  |
| ------------------------ | --------------------------- | ------------------------ |
| 定义（要"立住"的一句话） | `.card`                     | —                        |
| 提问                     | `.ask`                      | 卡片、竖线               |
| 结论 / 落点              | `.key`（一页最多一处）      | 卡片、多处竖线           |
| 双栏对比                 | `.half-grid` + `.divider-l` | 两张卡片并排             |
| 习题题干 / 题目页题干    | 普通段落，置顶整宽          | 竖线、卡片（题干是主体） |
| 解析 / 推导正文          | 普通段落                    | 竖线、卡片               |
| 讨论提示 / 警示 / 旁注   | `.mini-note`（或竖线提示）  | 卡片                     |
| 连续叙述 / 过渡          | 不加任何框                  | 任何框                   |

数卡片：`grep -oh 'class="[^"]*"' courses/<slug>/slides.md courses/<slug>/components/*.vue | grep -oE '\bcard[a-z0-9-]*\b' | wc -l`（≤15）

**一页的"竖线预算"（机器可查：`pnpm style:audit` ⑥）**

| 原子         | 每页上限                  | 谁来判断                                                                                                                       |
| ------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `.key`       | **1**（只给这一页的落点） | ✅ **机器查**（audit ⑥）：**2 处＝警告**（第二处若确是旁注 / 易错，可保留）；**≥3 处＝错误**（几乎必然把每一步解析都套了竖线） |
| `.problem`   | 1                         | ⚠️ 半机器：audit 只报"疑似套了题干"的启发式提示，其余人工判断                                                                  |
| `.divider-l` | 1                         | ❌ 人工判断（它本来就是给双栏用的，两栏一边一条也正常）                                                                        |
| `.ask`       | 1                         | ❌ 人工判断（**同一页两个并列提问是合法的**，如 1.4 第 13 页两问对照；写机器规则会误伤）                                       |

**只机器查"客观上能判定错的"那几条**：`.ask` / `.divider-l` 这类"多一处也可能是有意设计"的，**不进机器规则**，留给人工与教师判断。

**门禁要分级，别把创作捆死。**

- `error`：**客观上就是错的**（物理内容被动过、越权改共享样式、同页 ≥3 条竖线）→ 必须清零才能交。
- `warn`：**通常是坏味道，但可能是有意为之**（同页 2 条竖线、留白偏大、卡片偏多……）→ **执行者自己判断，并在报告里写一句理由**，不阻塞验收。

新增一条纪律前先问自己："这是客观错误，还是通常不好？"——前者进 `error`，后者进 `warn`。
看不准的一律先做成 `warn`，攒了几门课的实例再决定要不要升级：**门禁的目的是让 34 门课长得一样，不是让写课件变成走雷区。**

**纪律必须落成审计条款。** §4 这条"一页最多一处"在 CSS 注释里写了很久，仍被各批次各写各的（"颗粒度不齐"就出在这里）。
所以：**凡是新增一条"只许这样、不许那样"的口头纪律，同一次改动里就要在 `scripts/style-audit.ts` 加一条对应检查**——
没有机器门禁的纪律，等于每个 agent 各自凭主张。

## 5. 图标：该用的地方必须用

细则见 [`katex-fonts-icons.md`](katex-fonts-icons.md) §2（**一个语义一个、禁 emoji、名字先验证存在**）。本节是正向清单：

- ✅ **必须配**：并列可扫读的结构——概念三栏 / 要素列举 / 步骤条 / 图注前的标记 / 对错判定。
- ❌ **不要加**：`.ask` 提问行、`.key` 结论行、连续叙述（只会吵，教师明确否过）。
- 位置：`.mini-title` 里直接写（共享原子已给 `> svg` 留了金 / 蓝位）；条目里用 `.text-xl` 级图标 + 与文字同行。
- ⚠️ **紧页要把图标改小**（2.4 实测）：行内图标会撑高行盒——用 `.icon-md`（1.5rem＝**33px**）时，**下留白 <35px 的紧页**（该课第 6/24/28 页）7 个步进全部报"正文越界 13.1px"。
  安全的做法是 **`.text-lg`（1.1rem＝24.2px）+ `align-middle`**：盒子落在行距 strut 内，不再撑行。**别在紧页用 `.icon-md`/`.icon-lg`**；要用就得先把该栏 gap 收一档腾地方。

**语义映射（名字已逐个在 `node_modules/@iconify-json/mdi/icons.json` 验证）**

| 语义          | 图标                                                               |
| ------------- | ------------------------------------------------------------------ |
| 测量 / 尺度   | `<mdi-ruler />`、`<mdi-ruler-square />`                            |
| 方向 / 矢量   | `<mdi-arrow-right-bold />`、`<mdi-vector-point />`                 |
| 位置 / 作用点 | `<mdi-crosshairs />`、`<mdi-map-marker />`                         |
| 实验器材      | `<mdi-flask-outline />`、`<mdi-test-tube />`                       |
| 生活实例      | `<mdi-home-city-outline />`、`<mdi-car-side />`、`<mdi-earth />`   |
| 公式 / 推导   | `<mdi-equal />`、`<mdi-sigma-lower />`                             |
| 定义 / 概念   | `<mdi-book-open-variant />`                                        |
| 时间 / 时刻   | `<mdi-clock-outline />`、`<mdi-timer-sand />`                      |
| 数据 / 表格   | `<mdi-table />`、`<mdi-chart-scatter-plot />`                      |
| 图解 / 图线   | `<mdi-vector-polyline />`、`<mdi-chart-timeline-variant />`        |
| 步骤 / 顺序   | `<mdi-format-list-numbered />`、`<mdi-numeric-1-circle />`         |
| 结论 / 要点   | `<mdi-lightbulb-on-outline />`、`<mdi-star-four-points-outline />` |
| 易错 / 警示   | `<mdi-alert-circle-outline />`、`<mdi-information-outline />`      |
| 对 / 错       | `<mdi-check-decagram />`、`<mdi-close-circle-outline />`           |
| 对比 / 交换   | `<mdi-swap-horizontal />`、`<mdi-scale-balance />`                 |
| 力 / 箭头     | `<mdi-arrow-up-bold-outline />`、`<mdi-vector-link />`             |

表外的名字**写之前先查** `icons.json`（写错＝整页 500）；同一页不要出现两个相同图标。

## 6. 命名规范

- ⛔ **禁裸词**：`.step` / `.map` / `.chain` / `.note` 这类没有命名空间的类在 monorepo 里必然跨课碰撞。
- ✅ **用概念前缀做命名空间**：课内按小节 / 图型分组是好写法（如 `ae-` 力的分解、`dc-` 临界案例）。
  前缀取**概念**、别取课号（`fe-` / `ac-18` 等于"一课一套原子"）；一门课 3–5 个前缀。
- ⚠️ **同一课内部前缀要统一**：同类概念别用两套名字，否则改一处想不到另一处。
- **"已定义" = 本课 `style.css` ∪ 任一组件的 `<style>`（含 `<style scoped>`）**——组件局部样式是**合规写法**，不是裸类名；
  `pnpm style:audit <slug>` 已按此口径统计。
- ⛔ **别为了"消裸类名"把组件 scoped 样本抄进 `style.css`**：scoped 特异性更高、永远赢，抄出来的是死代码 + 两套真相。
- 页面专属样式用 `p<页号>-`（如 `p13-`），**只给"这一处"用**，别把跨页概念塞进页码前缀。

## 7. 已提升的共享原子（`atoms.css`）

§2 里出自 `atoms.css` 的那几个（`.step-list` / `.figure` / `.data-table` / `.ok`·`.bad` / `.split-wide`）是从 6–9 门课的重复发明里提升出来的：
**直接用，别再各课自建第 N 套**。课件本地同名定义优先级更高，存量课件不会因此回归。

## 8. 越权覆盖（禁止）

- `:root` 里**只能**覆盖 `--page-gap` / `--stack-gap`。
- ✅ **类作用域里的自定义属性是官方旋钮**，随便写——判据是"改的是不是全局默认值"：
  `:root { --c-accent: … }` ❌ 改全局；`.my-variant { --cols: … }` ✅ 只影响挂了这个类的元素。
  变体只能**新增类名**，不能重写共享选择器本体：

  ```css
  .fig-wide {
    --cols: minmax(0, 2.2fr) minmax(0, 1fr);
  } /* ✅ 图宽文窄变体 */
  ```

- ⛔ 不得重写：`.slidev-layout.base-flex`、`h1`、`table/th/td`、`.mini-title`、`.ask`、`.problem`、`.key`。
  唯一被认可的例外：长课题名封面压字号 `.cover-title` → 2.7rem（见 [`slidev-layout.md`](slidev-layout.md) §4）。
- 存量越权"谁改谁收敛"：3.5 改过 `base-flex` padding 与 `h1`；12.1 重写过 `.problem`（都按"谁改谁收敛"处理）。
- **要写"两段式提问行"（大图标 + 一段话，需要 flex）怎么办**：⛔ 不要重写 `.ask` 本体，
  写成**变体类** `.ask.ask-row { display: flex; gap: … }`（1.1 / 1.2 现在都是这个写法，audit 不报）。
  判据同上：**变体只能新增类名，不能重写共享选择器本体**。
- ⚠️ 旧版本本篇写过"1.2 重写 `.ask` 属合法例外"——**已作废**：例外一旦开口子，各批次就会各写各的（这正是 1.3 竖线被滥用的同一类问题）。

## 9. 验收

```bash
pnpm style:audit <slug>      # 卡片 / 图标 / 硬编码色值·字号·圆角 / 裸类名 / 越权覆盖 / 自造类名 / ⑥ 同页 .key 竖线 ≤1 处
pnpm shots <slug> <页号>      # 目测：图标是否到位、卡片是否克制
E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts   # 版面四表，溢出必须 = 0
pnpm build                   # 收尾（同时检查产物里有没有 attributify 鬼规则）
```

存量课件"**谁改谁收敛**"，不要求一次性大改；新建课件从第一版就守本篇。

**基线上就溢出的课件：门槛改成"相对基线零回归"**（别为了凑 0 做版面临时手术）

- 先 `git checkout HEAD -- courses/<slug>` 单独跑一次基线 e2e，把"**溢出状态 / 溢出元素 / 正文越界步数**"逐页记下来（跑完还原改动，并核对 md5）。
- 改完之后**逐项比对**：相同页、相同步数＝可接受；**不得更差**；variance 变小（如某页 9.5→6.1px）也算合格。
- 报告里必须写"仍有溢出"的页与数量，并进"待教师拍板"清单——**不要为了把表刷绿而擅自收密度 / 缩图**（那是教师级的视觉取舍）。
- 已知基线溢出：`o2-1.x-speed-matching`（4 状态 / 52 元素 + 15 步，最重；handoff §2 的清单漏了它）、`3.4`（6 页 30 步）、`o2-1.2`（2 页 5 步）等。

### 审计分级：门禁的尺度（Leader 定，别各写各的）

| 级别            | 什么算这一级                                                                                                                                                         | 怎么处置                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `error`（✗）    | **客观上就是错的**：色值写成了某个 token 的字面值；课内重写共享选择器；在 `:root` 改非密度 token；同页 ≥3 条 `.key` 竖线                                             | **必须逐条复查、清零**才能交                     |
| `warn`（!）     | **通常是坏味道，但可能是有意为之**：同页 2 条竖线；卡片超预算；私调字号 / 非 token 圆角；裸类名；某个色相只是加了透明度；整课出现 ≥5 个非 token 颜色（配色可能跑偏） | **执行者自己判断**，报告里写一句理由；**不阻塞** |
| `info`（·建议） | 只是把"我们的思路"说给你听：全课 0 图标；自造类偏多                                                                                                                  | 看过即可，不用回话                               |

**两种文案必须能分辨（这是给下一个 agent 看的，不是给人看的）：**

- `error` = **行号 + 依据 + 复查指令**：说清"这行写的是什么、为什么客观错了、请你去复查哪里"——
  目的是逼出一次真正的复盘，而不是让人照着改字面。
- `warn` = **先讲我们的思路，再问"你看是否符合"**：如"我们的思路是色相取 token、透明度用 `color-mix`，你看这样写是否更贴合"。
  ⛔ 不要用命令式。

**新增一条规则的准入**：先问自己"这是客观错误，还是通常不好？"——客观错误进 `error`，通常不好进 `warn`；
拿不准一律先做 `warn`，攒够实例再升级。**门禁的目的是让 34 门课长得一样，不是让写课件变成走雷区。**

### 批量改造协作铁律

- ⛔ `subagent` 是"发射后不管"：**派出去就别再碰同一份文件**（包括 Leader 自己——补一句"别做 X"＝又开一个并发写入方）。
  要能中途对话 / 纠偏就用 **teammate**（`send_message` 可寻址）。
- ✅ 一个执行者 = 一份**互不重叠**的写范围（`courses/<slug>/` 天然隔离）。
- ✅ 验收别只信自报：自己 `git diff` 过一遍**非 class 行**（公式 / 数值 / 单位必须逐字节未动）+ 独立复跑 e2e。
  **物理内容零改动是硬门槛。**
