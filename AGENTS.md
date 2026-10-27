# 高中物理交互式课件 — Monorepo 项目指南

> # ⛔ 最高准则
>
> **1. 任何命令因权限 / 沙箱 / 网络跑不动时：停手，不要重试、不要想办法绕过。**
> 绕过包括但不限于：把 `PNPM_HOME` / `HOME` / cache / store 指到工作区、在仓库里 `npx` / `pnpm dlx` / `pnpm install`、造假 home、换 registry、写脚本兜底。
> **2. 向 Lead 报三件事：原命令 + 原始报错 + 卡在哪一步，然后等 Lead 处理。**
> **3. 工作区里只允许有项目文件**（工具缓存必须在用户级目录，写不进去就停手报）；Lead 派活时必须把这三行带上。

> 本仓库是"一课一目录"的课件集（Slidev + Vue 3，pnpm monorepo）。
> 开发者是转行成为高中物理教师的前端开发者。
> 为每节课产出：**课件（slides.md + 交互组件）**，以及（**教师确认定稿后**才写的）教案与逐字稿。
>
> **规则分级（先看这个）**：
> 🔴 **必须** ＝ 违反会出客观错误 / 物理错误 / 教师明确点名 / 流程闸门 —— 本文件才会写"必须、不得、禁止"。
> 🟡 **建议** ＝ 只影响观感的审美与经验值（密度、对齐、字号、装饰、留白）—— 一律写"建议 / 通常 / 经验值 / 按页面判断"。
> **🟡 不作为"违规"判定**：agent 不得据此把教师或其他 agent 有意的版式改回去；拿不准就在汇报里问。
> ⛔ **软化只针对"假门禁"，别把话说含糊**：**能力边界、使用方法、组件契约、会坏页面的技术约束照原样写清楚**——
> `不要用它做多标注——那用 CoordAxes`、`SimpleAxis 不支持填充/网格`、`只能写在 <svg> 里`、`不能放进 ...comp` 这类句子**保持原样**，
> 不许改写成"它不含…（能力边界，不是写错）""一般…也完全可以"这种又长又虚的说法。软化后**信息量不能减少、句子不能变含糊**；读起来更绕就是改错了。
>
> 本文件只放置核心内容，细节拆成了下面十几篇笔记（**共享组件一览在「三」末尾**）——**用到再去读，不要凭直觉写**：

| 什么时候用                                                        | 读哪篇                                                                                                                                                                     |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **图元莫名其妙「看不见 / 变形 / 字号爆炸」（SVG 属性被吃掉）**    | [`.agents/notes/svg-attributify-trap.md`](.agents/notes/svg-attributify-trap.md) ⭐⭐ **先查这个再查别的：`opacity` 被压成 0.9%、`stroke-width` 被撑大都是它；含诊断脚本** |
| **要用任何共享组件（查它是干嘛的、props 怎么填）**                | [`.agents/notes/shared-components.md`](.agents/notes/shared-components.md) ⭐ **27 个全局组件总表 + 简单组件的 props 正本**                                                |
| 要画 SVG（矢量箭头、SVG 字号体系、非坐标示意图）                  | [`.agents/notes/slidev-svg.md`](.agents/notes/slidev-svg.md)                                                                                                               |
| **要画坐标图**（v-t / x-t / h-t、时间轴、位置轴、纸带打点）       | [`.agents/notes/coordinate-axes.md`](.agents/notes/coordinate-axes.md) ⭐ **必读：禁止手写坐标轴 SVG**                                                                     |
| **要画弹簧测力计**（悬挂测力、两台对拉、实验装置示数）            | [`.agents/notes/spring-scale.md`](.agents/notes/spring-scale.md) ⭐ **必读：禁止手画表身 / 刻度 / 挂钩**                                                                   |
| **要画"手捏住拉环/吊环/细绳往外拉"**（拉弹簧、拉测力计、拉绳）    | [`.agents/notes/grip-hand.md`](.agents/notes/grip-hand.md) ⭐ **必读：禁止手画手掌 / 手指**                                                                                |
| **画电路图 / 磁场图 / 带电粒子运动图**                            | [`.agents/notes/electronic-symbols.md`](.agents/notes/electronic-symbols.md) ⭐ **必读：禁止手画电源/电阻/开关/电表/灯泡与磁场叉点阵**                                     |
| 页面排版                                                          | [`.agents/notes/slidev-layout.md`](.agents/notes/slidev-layout.md)                                                                                                         |
| **写"一道题占一页"的题目页 / 一个大问题的思考页**                 | [`.agents/notes/exercise-layouts.md`](.agents/notes/exercise-layouts.md) ⭐ **必读：`layout: exercise-split` / `focus-question`，具名 slot 不能写 `<template #stem>`**     |
| **风格统一 / 新建课件 / 审课件风格**                              | [`.agents/notes/style-guide.md`](.agents/notes/style-guide.md) ⭐ **原子词汇表 + 视觉 token 约定 + `pnpm style:audit` 自查（仅建议）**                                     |
| 要设计点击节奏、写交互式组件                                      | [`.agents/notes/slidev-interactions.md`](.agents/notes/slidev-interactions.md)                                                                                             |
| 公式与图表                                                        | [`.agents/notes/katex-fonts-icons.md`](.agents/notes/katex-fonts-icons.md)                                                                                                 |
| 端到端检查                                                        | [`.agents/notes/e2e-checks.md`](.agents/notes/e2e-checks.md)                                                                                                               |
| 安装/更新/恢复 AI 技能                                            | [`.agents/notes/skills.md`](.agents/notes/skills.md)                                                                                                                       |
| **要给一个知识点做滑块 / 拖动类交互（先判断这个交互有没有必要）** | [`.agents/notes/interactive-necessity.md`](.agents/notes/interactive-necessity.md) ⭐ **动手前先回答"这个交互有没有必要"**                                                 |

---

## 一、项目结构

```text
workspace/                 ← 工程代码
  homepage/src/courses.config.ts ← 薄壳：读根目录 courses.json 并导出类型（新增课件不用改它）
  shared/                      ← 共享 addon（顶栏/底栏组件、layouts/（base-flex、course-cover）、styles/、logo）
courses.json                   ← **课件注册表正本**（按分册组织；带 $schema，编辑器可自动补全）
courses.schema.json            ← 注册表的 JSON Schema（字段说明 / 必填 / 分册 slug 枚举）
resources/textbooks/           ← 人教版教材 Markdown（必修 1–13 章齐全；选必待录入）
  init-slidev-courseware/      ← 给"不懂代码的老教师"的独立课件生成工具（平行工具，不读本仓库资源）
courses/<slug>/                ← 一课一目录、一节课（40 分钟）
  slides.md                    ← 主课件；headmatter 里 addons: [../workspace/shared]
  global-top.vue / global-bottom.vue  ← 顶栏 / 底栏薄壳
  style.css                    ← 仅本课特有样式（addon 样式之后加载，可覆盖）
  README.md                    ← 课件说明：页目表 / 组件表（⛔ 定稿后再生成，见"二"第 8 步）
  components/ · images/        ← 按需存在（用到才建；不建不报错，也别放 .gitkeep）
  content/思路.md              ← **教师最初的授课思路原文**（只在思路被明确调整时就地改写，不写迭代记录）
  content/教案.md · 逐字稿.md   ← ⛔ 教师确认课件定稿后才生成（同上）
.agents/notes/                 ← 按需再读的笔记（入库）
.agents/skills/                ← AI 技能：**上游技能不入库**（只提交 skills-lock.json）、**自研技能入库**（4 个，见"七"）
scripts/                       ← build-all / create-course / check-skills / course-pages / slide / shots
e2e/                           ← 端到端检查（见笔记 e2e-checks）
```

- **addon 路径由 `pnpm create:course` 自动写入**（`../workspace/shared`，基准是 `courses/`）；改课件时不用管它
- 共享组件名固定 `CourseTopBar` / `CourseBottomBar`；**禁用 `GlobalTop` / `GlobalBottom`**（Slidev 保留名，会栈溢出）

---

## 二、新课创建流程（核心工作流）

> **先问后答、教材先行**贯穿始终。顺序记牢：**思路 → 课件 → 改到教师点头 → 最后一次性写课件 README 页目 / 教案 / 逐字稿**。

1. **教材先行**：读 `resources/textbooks/` 对应章节正文 + 习题，确认知识点顺序、公式写法、术语。**一切物理内容以教材为准，禁止凭记忆编造**；缺章节先补录。
2. **整理思路**：把教师的语音转写稿整理成 `content/思路.md`（引入 → 环节 → 实验 → 总结，保留实物传看、类比等细节）。**整理后向教师复述确认**再动手。
3. **设计课件结构**：按"先问后答"排页序（每页先抛问题、点击出答案），规划交互组件。
4. **创建骨架**：
   ```bash
   pnpm create:course --name <英文slug> --chapter-name "<课题名>" \
     --chapter "<章节号>" --chapter-label "<章节名>" --textbook <分册，如 bx3>
   pnpm install        # 新课件是 workspace 包，必须先装依赖
   ```
   生成 `slides.md` / `README.md` / `global-*.vue` / `style.css` / `content/思路.md` / `components/` / `images/`；`--name` 只给英文名，**目录名自动 = 章节前缀 + 英文名**（前缀由 `--textbook` + `--chapter` 推导，如必修 `3.5-force-equilibrium`、跨节 `2.2-2.3-uniform-acceleration`、非教材小节 `1.x-vectors`、选必 `o1-1.3-refraction`），并自动登记**根目录 `courses.json`**（详见 `pnpm create:course --help`）。
5. **编写 `slides.md`**：遵守设计系统（"三"）与对应笔记；交互处做成 Vue 组件、用真实学科公式计算。
6. **把初版课件交给教师预览，然后停下来等意见**：`pnpm dev`（交互选择）或 `pnpm dev <课件标识>`，或部署链接，并说清"第几版、哪些地方是刻意这样设计的"。**交付后必须停下等反馈**，不要自己脑补"差不多了"继续做。
7. **按意见改课件**：迭代期**只动 `slides.md`**（含组件/样式）。
   `content/思路.md` 里**只放教师最初的授课思路原文**——**不写迭代记录**（不写"第 N 轮修订""被否掉的设计""待确认点清单"这类内容，要留痕靠 git）。
   只有教师的纠正**明确调整了先前的思路**时，才**就地改写**那段原文文字（例："先启动打点计时器，后放手"→"先接通电源，等振针打点稳定后再释放小车"），**不要另外追加一段说明**。
8. **⛔ 闸门**：`content/教案.md`、`content/逐字稿.md`、以及 `courses/<slug>/README.md` 的页目表/组件表，**只在教师明确说"课件定了 / 可以开始写教案和逐字稿了"之后才生成**。
   - 在此之前**一律不写**（连草稿、连"顺手补两页说明"都不行）：课件一定还会改，这些文档同时迭代＝每轮同步好几处，token 成倍浪费，写完就作废。
   - **"明确"＝教师说出口的指令**；不要用"改动越来越小了"自己判断闸门已开。
9. **登记与元数据**：**根目录 `courses.json`**（分册 / 标题 / 章节 / 描述 / 标签；`courses.schema.json` 是它的校验正本）由第 4 步脚本自动登记；没带 `--textbook` 时手动补，改完用 `pnpm check:courses` 验一遍。
10. **工程收尾**：`E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts` → `pnpm build` 确认无报错。

**迭代**：不追求一版定稿。每版先自审（视觉 / 逻辑 / 物理准确性），再交给教师预览、主动邀请反馈，循环到教师明确说"可以了"。
踩过的**通用**坑写回本文件"八"或对应笔记；**迭代过程中的取舍不写进任何文档**（`思路.md` 只放教师原文，要留痕靠 git 提交历史）。

---

## 三、设计系统（要点）

- **玻璃态**卡片（`backdrop-filter: blur(16px)` + 半透明）、大圆角 `1.25–1.75rem`；配色：深蓝渐变背景 `#090d1a → #0c1122 → #0f1425`，强调暖金 `#e2a846`、深蓝 `#3b82f6`，正电红 `#f87171`、负电蓝 `#60a5fa`
- **字号（经验值，按页面判断）**：正文基准约 22px，封面标题 ~3.5rem，正文通常不小于 0.65rem；小节标题通常比正文大一档（`.mini-title` 1.28rem，不是硬指标）
- **字体**：只用系统字体，**禁止 Google Fonts**（大陆不可用）
- **封面统一用共享布局 `course-cover`**（`workspace/shared/layouts/course-cover.vue`，⛔ **不要再手写封面 HTML**）：headmatter 写 `layout: course-cover`，再给 `chapter-no`（章节编号，如 `1.1`）/ `chapter`（章名称，如 `第一章 运动的描述`）/ `lesson`（课时，如 `第二课时`，可省）/ `subtitle`（本课时讲什么，可省）/ `classroom`（授课教室，可省）/ `teacher`（授课教师，默认张伯望）；**课题名取本页 `title`**（第一页就是 headmatter 的 `title`，第二课时封面在该页 frontmatter 里另写 `title`）；装饰 SVG 作为页面内容传进去（默认插槽，如 `<CoverDecorationSvg />`）。渲染出来是：章节行 → 课题名 →（副标题行）→「**授课教师：<姓名>**」行 → 最底部居中一行 **14px 的「原创：东北育才学校 张伯望」**。校徽 logo 由共享顶栏带上（`shared/assets/logo.png`，新课件不要问）
- **授课身份走 URL（主页「我要上课」生成，共享组件已支持，课件页不用动）**：`?teacher=<姓名>` 覆盖封面授课教师行；`?logo=hide` 隐藏校徽、`?logo=<姓名>` 显示本机按该姓名存过的自定义图（无则隐藏，本地存储 key：`courseware.logo:<姓名>`）；Slidev 翻页会原样保留 query。约定详见 [`notes/shared-components.md`](.agents/notes/shared-components.md#2-页面外壳coursetopbar--coursebottombar)
- **顶栏**：封面左显示章节名、内页左显示课题名，右侧恒显校徽；**页脚只有两侧渐隐装饰线，不显示页码**
- **转场** `transition: fade`；内容呈现用 `v-click`（**点击节奏与交互组件的规则见 interactions 笔记**）
- **页面外壳固定 `layout: base-flex`**（共享 addon 注册的通用布局：flex 列 + 收紧内边距）：headmatter 里写 `defaults: { layout: base-flex }`（封面声明 `course-cover`、居中页等单独声明 `center`）；**只有它能让 `.page-grow` 撑满**。
- **卡片克制（建议）**：原则上只有**定义**才用 `.card`，经验上一份课件 15 个以内；提问用 `.ask`、结论用 **hint 气泡**（`tip-hint` 等）、双栏用 `.divider-l`、习题一般不用卡片。**这些通用原子已在共享 addon 的 `workspace/shared/styles/layout.css`，本课 `style.css` 不要再复制**；只有密度要微调时改 `:root` 的 `--page-gap` / `--stack-gap`。
- **一页一课时**：一个 `courses/<slug>` = 一节课（40 分钟）；题量大就做成"一个课件、两课时"（第二课时另起 `layout: course-cover` 封面，页码接续，并在该页 frontmatter 里写自己的 `title` / `lesson`）
- **一个标题可跨多页**：同一环节连续多页用同一个标题，不要写"（续）"
- **版面尽量"占满"（建议）**：正文包 `.page-grow`，内容少时通常先放大字号/图，内容多就拆页——但**不要溢出画布、不要把正文顶到大标题上**（这两条是真会坏页面，见 e2e 检查；详见 layout 笔记）
- **图通常应"占满"、字号尽量给足（经验值）**：坐标图/示意图一般把所在栏的宽高用满——内容少时先放大图、别留大片空白；图偏扁会浪费后排的可见面积，但留白多少按页面判断。图内字号按"最后一排看得清"给足（SVG 里字号是用户单位、会随缩放缩水：渲染后 ≈ `字号 × 渲染宽 ÷ viewBox 宽`），坐标轴字母（x、t）与图内标注尤其别太小。
- **手绘 SVG 超过 5 行就抽成组件（教师要求）**：`slides.md` 只留**内容与结构**，图放进 `components/<名字>.vue`，页面里写 `<XxxSvg />`；组件模板里直接写 `<svg …>…</svg>`，顶部配一行注释说明"这是哪一页、画的是什么"。
  - **门槛是"超过 5 行"**：只要 SVG 自身超过 5 行就抽（缩略到 5 行以内的微型示意可以留在页面里）；**`v-click` 写在组件里照样生效**（Slidev 的 `v-click` 是全局指令，跨组件仍绑到当前页），需要按步显示的图内元素可以直接在组件里写 `v-click`，也可以由页面传 `:step="$clicks"`；组件里可以直接用共享组件。
  - 抽查是否漏网：`grep -c "<svg" courses/<slug>/slides.md` 期望是 **0**；这是评审提醒、不是硬规则（现存 `4.1-newtons-first-law`、`o2-1.4-mass-spectrometer-cyclotron` 两门课仍有残留，且没有机器检查兜底，不单凭这条判"违规"）；收益：页面可读、图可复用、改图不碰正文。
- **标题要么承担信息，要么不写**：`# 标题` 只点主题、不提前给答案（写"长度的测量方式"，不写"一次量到底"）；**引课、向学生提问、纯叙述类页面整页不写标题**（问题本身就是内容，写在 `.ask` 里；去标题还顺带腾出约 90px 竖向空间）；**绝不写与封面重复的标题**（"这节课：<课题名>"这类），也不写只复述阶段名的空标题。
- **上屏的每一行都要有信息量（教师反复强调）**：课件只放"需要学生**看着想、需要看清**"的东西——① 提出问题（让学生对着问题思考）；② 亮出核心结论；③ 把复杂推导的**中间步骤**摆出来；④ 需要演示的**动态交互**。
  凡是**教师口头一句话就能带过的过渡句、注释性小字、对图/对表的赘述解释**，一律不要上屏：写成小字摆在那里只会分散注意力、把页面变成废话（"纸带记录了不同时刻的位置"这类就是典型）。
- **导航**：键盘 ← → / 翻页笔。**点击页面中央不翻页是 Slidev 有意设计，绝不要 hack**

### 题目图与受力分析（物理与教学正确性，教师反复强调）

- **题目页的呈现顺序：干净题干 + 干净题目图（常显）→ 点击之后才出讲解标注**。判据只有一条：
  **试卷上本来就有的东西第一眼全给；试卷上没有的东西（受力分析、辅助线、答案）一律点击后才给。**
  - **题目原图**（试卷/课本上本来就有的图）：**常显**，图上不许出现受力分析、速度/加速度箭头、分力虚线等任何"分析类"标注；
    这些标注点击后才叠上去（图组件加 `showForces?: boolean`，分解图可用 `showDecomp` 之类，标注包进 `<g v-if="showForces">`；
    `slides.md` 里写 `:show-forces="$clicks >= 1"`）。
  - **题干只有文字、图是我们自己画的"解析图"**（整张图就是分析）：**整张图也要点击后才出现**（`<div v-click="1">`）——
    它属于"试卷上没有的东西"，不能第一眼就给。
  - **题干类元素常显**：物体、斜面/地面/天花板、绳与弹簧、倾角 $\theta$、物体标签、题目已给的速度 $v$、
    以及"剪断/撤去""$F_T=?\ $" 这类设问标注。
- **受力一律画在物体的几何中心**：高中除静态受力分析外不研究转动，**所有力都从重心/几何中心出发**——
  重力、支持力、摩擦力、分力箭头都不能从边角、接触点或凭空的位置起笔。
- **速度、加速度画在物体旁侧**：不必落在物体上，用**略小一号**的箭头放在物体旁边、指向正确方向即可；
  绝不能为了"放在中心"让速度/加速度箭头与力箭头重叠成一团（图会糊到看不清）。
- **力的符号只用 $F$ + 角标**（新课标口径）：写 $F_{\text{合}}$、$F_N$、$F_f$、$F_T$，
  **禁止**裸写 `N`、`f`、`T`（重力仍按教材写 $G$ 或 $mg$）。
- **"以后再讲"这层意思不上屏**：初次提及但本轮不深入的内容，讲到该讲的深度即可，
  不要写"先不急着定它""下一节再说"这类过渡话 —— 那是老师口头带过的，写在屏幕上只是噪音。
- **高一不引入微积分**：需要"面积/累积"类结论时（如 $a\text{-}x$ 图面积的含义），必须用**微元法**讲：
  把位移分成很多小段 → 每段内看作不变 → 求和 → 取极限，最终落到"图线与横轴围成的面积"。
  屏幕上**禁止**出现 $\mathrm{d}x$、$\mathrm{d}v$、积分号这类大学符号。
- **定性分析页不出现数值**：只作定性判断的图（v-t 形状、a-x 形状）轴上一律不标刻度数字，
  该用符号的地方就用符号（如纵轴标 $g$）；关键点用**虚线向坐标轴作垂线**、用**「半透明气泡 + 虚线指引」**标注，
  而不是把数字堆在图上。课堂演示组件里的实时读数同理，改成定性描述（"合力向下但在减小"）。
- **讲"运动在先、受力在后"**：例题的推导顺序是 ①先看运动（物体会不会飞起/嵌入/脱离？只能往哪动？）
  → ②该方向上没有速度也没有加速度 ⇒ 这个方向合力为零 → ③得到 $F_N = mg\cos\theta$ 这类关系
  → ④再对运动方向列 $F = ma$。学生刚学牛二时这一步必须慢、必须点出来。

### 共享组件（`workspace/shared/components/`，全局注册：**直接用、不用 import、不要重画**）

27 个组件的用途与 props 都写在笔记里（**不用读 `.vue` 源码**）；选组件与查 props 的正门是
[`.agents/notes/shared-components.md`](.agents/notes/shared-components.md)。

**坐标图（⛔ 禁止手写坐标轴 SVG）· 写在 markdown 顶层**

- `SimpleAxis` — 讲台演示图：只第一象限 + 一两条曲线 + 标一个点 · [坐标轴笔记](.agents/notes/coordinate-axes.md)
- `NumberAxis` — 一维数轴（时间轴 / 位置轴 / 纸带打点） · [props 全表](.agents/notes/coordinate-axes-api.md)
- `CoordAxes` — 完整坐标图：多曲线 / 多标注 / 网格 / 区域填充 / 分步（props 一多就用 ` ```comp ` 代码块）

**只能在 `<svg>` 里写**（写成 HTML 什么都不显示，也不能用 ` ```comp `；`v-click` 写在里面照样生效）

- `CourseArrow` — 矢量箭头：自动 marker、尖端必落在终点（别手写 `<marker>`）· [总览 §4](.agents/notes/shared-components.md)
- `SurfaceHatch` — 接触面：地面 / 桌面 / 墙 / 斜面 + 单侧斜线阴影 · [总览 §5](.agents/notes/shared-components.md)
- `SpringScale` — 弹簧测力计，⛔ 禁止手画表身 / 刻度 / 挂钩 · [笔记](.agents/notes/spring-scale.md)
- `GripHand` — "手捏住拉环 / 吊环 / 细绳往外拉"，⛔ 禁止手画手掌 / 手指 · [笔记](.agents/notes/grip-hand.md)
- `Ruler` — 刻度尺（精确毫米刻度 / 示意图模式），可内嵌也可独立用 · [总览 §6](.agents/notes/shared-components.md)

**天体图元（⛔ 禁止手画太阳 / 地球 / 月球 / 星球）· 只能在 `<svg>` 里写**

- `CelestialSun` — 太阳：光球 + 日冕光晕 + 光芒 · [总览 §9](.agents/notes/shared-components.md)
- `CelestialEarth` — 地球：海洋 + 大陆 + 云系 + 晨昏线 + 大气辉光 · [总览 §9](.agents/notes/shared-components.md)
- `CelestialMoon` — 月球：灰色球体 + 环形山 + 暗面 · [总览 §9](.agents/notes/shared-components.md)
- `CelestialPlanet` — 一般星球：5 套配色 + 可选气态条纹 / 行星环 · [总览 §9](.agents/notes/shared-components.md)

**HTML 层**

- `Latex` — HTML 里的 KaTeX 公式（SVG 里用不了，改 `KaTeX_Math` 字体）· [总览 §3](.agents/notes/shared-components.md)
- `ChartLabel` — 图内标注，盖在 SVG 上，能渲染真 KaTeX 与分式 · [总览 §3](.agents/notes/shared-components.md)
- `CourseSlider` — 全库统一的滑块（原生渲染 + `accent-color`）；建议各课统一用它、别自己写 `::-webkit-slider-thumb` / `::-moz-range-*`（`pnpm style:audit` 会以 warn 提醒，属建议、不阻塞） · [总览 §7](.agents/notes/shared-components.md)

**页面外壳（只写进 `global-*.vue` 薄壳）**

- `CourseTopBar` — 顶栏：封面章节名 ↔ 内页课题名 + 校徽 · [总览 §2](.agents/notes/shared-components.md)
- `CourseBottomBar` — 底栏两侧渐隐装饰线（无页码）· 同上（无 props）

坐标图 / 弹簧测力计 / 手部各有一篇专篇，**读一篇就够**。

---

## 四、技术约定（速查）

| 主题          | 一句话                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 详见                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| 公式          | Markdown 里的 `$...$` 能用；**HTML 块内必须换成 `<Latex tex="…" />`**（组件内同理）                                                                                                                                                                                                                                                                                                                                                                                                 | `notes/katex-fonts-icons.md`   |
| **符号/单位** | ⛔ **物理量的符号与单位一律走 LaTeX，禁止写成纯文本或 Unicode 字符**（教师反复强调）：写 `<Latex tex="v_0" />` 不写 `v₀`；写 `<Latex tex="\theta" />` 不写 `θ`；写 `<Latex tex="\text{m/s}^2" />` 不写 `m/s²`；连"与 `<Latex tex="t" />` 无关"里的单个 `t` 也要走 LaTeX。**量用斜体、单位用 `\text{}`**。SVG 内嵌不了 `<Latex>` → 用 `font-family="KaTeX_Math" font-style="italic"`（量）＋ `font-family="KaTeX_Main"`（单位）                                                      | `notes/katex-fonts-icons.md`   |
| 图标          | Iconify `<mdi-xxx />`，建议一个语义一个、别堆；**名字要先验证**（写错＝整页 500）：查 `courses/<slug>/node_modules/@iconify-json/mdi/icons.json` 的 `icons` / `aliases` 键，或 [Iconify 图标站](https://icon-sets.iconify.design/mdi/)。**要放大图标只能用共享字号阶梯 `.text-3xl…5xl` 或图标专用 `.icon-md/lg/xl/2xl`**（都带 `!important`）；**别用 UnoCSS 的 `text-6xl`**——`common.css` 给所有 svg 钉了 `font-size:16px` 基准，非 `!important` 的字号压不过它，图标会被钉死 16px | 同上                           |
| SVG           | 按 **16px 体系**画、`font-size="11"` 不带单位、不要用 `rem`；坐标轴与箭头的规范（含"尖端必须落在目标点"）                                                                                                                                                                                                                                                                                                                                                                           | `notes/slidev-svg.md`          |
| 版面坑        | HTML 块内**缩进 4 空格＝代码块**；SVG 内**不能有空行**；栅格用 `minmax(0, 1fr)` + `min-width: 0`                                                                                                                                                                                                                                                                                                                                                                                    | `notes/slidev-layout.md`       |
| 点击/组件     | 顺序＝问题→演示→结论；**只许出现新元素、不许顶跑已有元素**                                                                                                                                                                                                                                                                                                                                                                                                                          | `notes/slidev-interactions.md` |
| 端到端检查    | `pnpm test:e2e` 查四张表；**硬失败只有三类**：整页渲染失败、元素越出 980×552、SVG 16px 契约。留白 200px / 点击位移 1px / 正文越出 `.page-grow` 1px **默认只报告**（`E2E_STRICT_*=1` 才失败）；CI 只跑 `lint`+`build`+`test:e2e`                                                                                                                                                                                                                                                     | `notes/e2e-checks.md`          |
| 物理表述      | 与教材为准（如"失去电子→带正电"，不说"正极吸引电子"）；拿不准查教材                                                                                                                                                                                                                                                                                                                                                                                                                 | —                              |

- 组件放 `components/`（自动注册）；本课样式写 `style.css`；**共享代码（`workspace/shared/`）改动要评估所有课件的影响**
- **交互组件必须用真实学科公式计算**（`computed` 里算，数值随参数真实变化）
- **动手做交互之前，先按 [`notes/interactive-necessity.md`](.agents/notes/interactive-necessity.md) 判断"这个交互有没有必要"**：
  只有当"参数变化、结果随之变化"**本身是教学对象**时才上滑块；结论是"一个动作 / 过程"、或只对**离散**情形成立 → 用**点击分步的动画**；
  只要看形态变化（张合、方向、疏密）→ 用**示意图 + 定性**，别硬塞数值

---

## 五、常用命令

```bash
pnpm install        # 装依赖（根 + 各课件）
pnpm dev            # 交互选择：入口网站 / 某个课件（localhost:3030）
pnpm create:course  # 生成新课件骨架（--help 看参数）
pnpm check:courses  # 校验根目录 courses.json（字段 / slug 唯一 / 目录存在）——**不进 CI**
pnpm style:audit    # 样式审计：仅建议（warn 不是 error），默认 exit 0，**不进 CI**
pnpm slide          # 🔎 查/读某一页源码（省 token）
pnpm shots          # 📸 批量截页图（自查视觉）
pnpm test:e2e       # 端到端检查（四张表；CI 里唯一的版面门禁）
pnpm build      # 构建入口网站 + 全部课件 → dist/
pnpm lint           # oxlint --fix + oxfmt（slides.md 不参与格式化）
pnpm clean          # 清 dist/ 与端到端缓存（--dry-run 先看清单）
```

**两个省 token 的小工具**（`slides.md` 动辄上千行，**别为了看一页 read 整个文件**，也别手写临时截图脚本）：

```bash
pnpm slide 1.x-vectors                 # 页目表：页号 / 标题 / 行号范围 / 点击数
pnpm slide 1.x-vectors 15              # 打印第 15 页源码（带行号，照着改）
pnpm slide 1.x-vectors 15-17 19        # 区间 + 多页
pnpm slide 1.x-vectors --grep 正交分解 # 哪一页哪一行有这个词（先定位再读）
pnpm slide 1.x-vectors 15 --raw        # 不带行号（整段复制）

pnpm shots 1.x-vectors 15 18-20        # 截图（未点击状态），控制台打印绝对路径
pnpm shots 1.x-vectors 4 --clicks=each # 每一步点击各截一张
pnpm shots 1.x-vectors 4 --clicks=each --after=400 # 点击后再等 400ms 才截（抓 rAF / transition 的**中间帧**，文件名带 -t400）
```

> `--after` 是给"动画到底在不在演"留证据用的：默认抓的是每击之后的**稳定帧**，两个稳定帧都"看起来对"、
> 中间也可能是一步跳过去的；补一张中间帧就能区分"逐帧过渡"与"瞬变"。
> 用时长按动画本身取：**0.3–0.5s 的 CSS transition 用 `--after=150`/`200`**（400 已经到位，会被误读成"没有过渡"）；
> **1.5s 级的 rAF 才用 `--after=400`/`800`**。
> 实现上会**先回退一击落定、再重放这一击**（`gotoSlideStep` 自带 600ms + `settle()` 会等有限动画跑完，
> 直接在那之后再等就只能截到终态——真踩过：9.1 有 17/19 对中间帧与稳定帧 sha256 完全相同）。

典型迭代循环：`--grep` 定位 → 读那一页 → 改 → `shots` 看效果 → `E2E_COURSE=<课> … layout-overflow` 复验。
（`slidev` 技能里没有"按页读源码"这类工具，用这两个。）

---

## 六、`resources/init-slidev-courseware/`（平行工具）

给**零代码经验的教师**生成**独立**的 Slidev 课件项目（自带设计系统，不读本仓库的 shared 与教材库）。
`README.md` = 教师入口（含开始话术与 FAQ）；`spec.md` = AI 执行剧本（环境配置 → 建独立项目 → 写入设计系统 → 教材先行 → 收集思路 → 写课件 → 迭代 → 交付）。
本文件负责本仓库的项目知识与坑；`spec.md` 负责流程与独立项目的模板，两边设计语言保持一致。

---

## 七、维护约定

- **教师主要用语音输入**：术语的同音字/断句错误要**按上下文纠错后再执行**，别按错字理解（例子：「组织稿」→「逐字稿」；同类还有「展存区」→「暂存区」）。
  拿不准的名词，先去 `courses/<slug>/content/` 与本文件里找对应的既有概念；确实有歧义时用一句话确认。
- **共享代码**（`workspace/shared/`）影响所有课件，改前评估影响面
- **新增交互组件**：先实现先用（组件文件直接放 `components/`）；**等该课课件定稿后**再登记到该课 `README.md`（见"二"第 8 步闸门）——迭代期不往任何文档里记清单
- **课件 README（`courses/<slug>/README.md`）只写本课特有的内容**：页目表 / 组件表 / 授课提醒 / 本课特有的工程约定。
  **不要**再写通用段落——开发命令、设计系统、技术栈、项目文件清单、共享 addon 说明、许可声明、
  以及"基于 Slidev + Vue 3 构建的交互式公开课课件……课题《…》"这种与文件标题重复的句子，一律不写
  （`scripts/course-templates.ts` 里的 `renderReadme` 已按此生成骨架，新课件不会再带这些段落）。
- **教材补录**：写入 `resources/textbooks/`，并更新其 `README.md` 索引
- **AI 技能**（`.agents/skills/`）分两种，规则不同：**上游技能 ⛔ 不入库**（只提交 `skills-lock.json`——上游是 MIT、
  CLI 不会把许可声明一起拉下来，入库会与主协议冲突；CI 没有技能也照常跑）；**本仓自研技能 ✅ 入库**
  （现 4 个：`physics-figure` / `courseware-page` / `courseware-qa` / `exam-image-to-slide`，`.gitignore` 里逐个开例外）。
  **该写 skill 还是该写笔记**："我要做一件事" → skill（触发条件 → 步骤 → 自检 → 汇报口径）；"我要查一个事实" → 笔记；
  **skill 只链接笔记、不抄内容**。细节与新增技能的做法见 [`notes/skills.md`](.agents/notes/skills.md) §1/§4；
  安装/更新/恢复用 `pnpm skills:restore` / `pnpm skills:update`。
- **协议**：整个项目（含全部课件）采用 **CC BY-NC-SA 4.0**（署名—非商业性使用—相同方式共享，全文见根 `LICENSE`）：
  必须保留「张伯望（东北育才学校）」署名与本协议、**不得商用**、修改后必须以同一协议公开完整源文件。
  新增文件**不要**再写别的许可声明；第三方内容（`resources/textbooks/` 教材、`.agents/skills/` 上游技能）的版权与许可见根 `LICENSE` 的「第三方内容」一节。
- **git 提交**：中文信息，按逻辑阶段（`创建课程骨架：xxx`、`完善课件：第 X 页调整`）；格式化用 `oxfmt`

---

## 八、坑速查（每条都踩过）

| 坑                                                                       | 一句话记住                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 详见                                                                      |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **`<v-click="N">` 不能当包裹标签**                                       | 带属性的 `<v-click="1">` 会被 markdown-it 转义成文字、留下悬空闭合标签 → 该页 `Invalid end tag`，整个 build/e2e 挂掉；**写成属性形式** `<div class="xxx" v-click="1">`                                                                                                                                                                                                                                                                                                                                                                                         | `notes/slidev-interactions.md`                                            |
| **HTML 块内缩进 4 空格**                                                 | 被当成缩进代码块 → `<pre><code>` → 报"渲染失败"，还会伪装成"整页向右溢出 1000+px"；`v-clicks`/`v-click` 及子块**一律顶到第 0 列**                                                                                                                                                                                                                                                                                                                                                                                                                              | `notes/slidev-layout.md`                                                  |
| **Markdown 中 HTML/SVG 不要有空行**                                      | 空行之后两层以上会被当成代码块                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 同上                                                                      |
| **栅格被不可断行内容撑爆**                                               | 用 `minmax(0, 1fr)`，子项加 `min-width: 0; overflow-wrap: anywhere;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 同上                                                                      |
| **正文顶到大标题上**                                                     | `.page-grow` 装不下时不会自动缩，会向上顶出；有专项检查（1px 容差），但**默认只报告**，`E2E_STRICT_BLOCK_FIT=1` 才让测试失败                                                                                                                                                                                                                                                                                                                                                                                                                                   | `notes/e2e-checks.md`                                                     |
| **组件分步用 `v-if`**                                                    | 真删真插会把已可见元素顶跑（第 4 页踩过）→ 改 `visibility: hidden` 占位                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `notes/slidev-interactions.md`                                            |
| **箭头尖端没落在点上**                                                   | `refX` 在三角形中心 ⇒ 尖端 = 线段终点 + 半个箭头长；线段要回退半个箭头（`shaftEnd`）                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `notes/slidev-svg.md`                                                     |
| **箭头后面挂了个长方形**                                                 | `refX` 别放尖端，放三角形中心；三角形底边宽 ≥ 2×线宽                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 同上                                                                      |
| **别复用已开着的 dev server**                                            | Slidev 启动时解析 addon，复用旧进程会拿到过期组件表                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 同上                                                                      |
| **批量改课件前先清 dev server**                                          | 长驻的 `slidev`/`pnpm dev` 监听文件：agent 一改 `slides.md`/`style.css`，server 就收到变动通知、**自己又跑一轮**（真踩过：12.4 从没派过 agent，却因它的 server 未关而被改了一轮）。批量改造开工与收工前都 `lsof -iTCP -sTCP:LISTEN -P \| grep node` 找到并 `kill`，教师本机自己开着的先问哪些不能杀                                                                                                                                                                                                                                                            | 本文件（原笔记已不存在，要点已并入本条）                                  |
| **` ```comp ` 围栏被当纯文本**                                           | 围栏前**必须留一个空行**：紧跟 `<div …>` 时整块会被 markdown-it 的 HTML 块吞掉 → **渲染成纯文本、不报错**                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `notes/coordinate-axes-comp-block.md`                                     |
| **坐标轴末端箭头顶在刻度上**                                             | 轴范围端点要比最大刻度**多留 5–10%**（`x-range [0, 6.4]` 配刻度 6、`y-range [0, 16.5]` 配刻度 15）；组件另有兜底会压掉贴箭头的那个刻度                                                                                                                                                                                                                                                                                                                                                                                                                         | `notes/coordinate-axes-conventions.md`                                    |
| **长课题名封面折行**                                                     | 课题名 >11 字时通常把 `.cover-title` 压到 2.7rem 左右以保持一行（经验值，按课题名长短判断）                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `notes/slidev-layout.md`                                                  |
| **屏幕上出现给 AI 的备注**                                               | "（热区已放大）"这类是教学事故；备注写进 `content/`、课件 README 或代码注释                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `notes/slidev-interactions.md`                                            |
| **拖拽提示不上屏**                                                       | "拖动××试试"这类操作提示**不写**；拖拽点做成**很透明的灰圆**、画在**箭头层级之下**，别用实心圆盖住箭头。**动机**：这是给**教师**的**弱提示**（他自己上课前会试哪些组件能互动），所以要不显眼                                                                                                                                                                                                                                                                                                                                                                   | `notes/slidev-interactions.md`                                            |
| **文档"两活三定"**                                                       | 迭代期只动 `slides.md`（`content/思路.md` **只放教师最初的思路原文、不写迭代记录**）；课件 README 页目/组件表、教案、逐字稿等**定稿后一次性生成**                                                                                                                                                                                                                                                                                                                                                                                                              | 本文件"二"第 7–8 步                                                       |
| **上屏废话 / 空标题 / AI 腔**                                            | 标题三选一：**不写**（原话进 frontmatter `title:`，保住目录）/ **小档**主题名 / **大档** `class: title-ask`（整页在答这个问题）——提问页、引课页、练习页整页不写标题。上屏只留"要学生**看着想或看清**"的（提问、核心结论、推导中间步、演示）；**过渡句、注释小字、口诀腔不上屏**；**不打比方、不用引号做强调**                                                                                                                                                                                                                                                  | 本文件"三" + `notes/slidev-layout.md`、`courseware-style-pass.md` §1/§5.5 |
| **符号/单位写成纯文本**                                                  | `v₀`、`θ`、`t`、`m/s²`、"秒""米"这类**一律禁止**：HTML 里用 `<Latex tex="v_0" />` / `<Latex tex="\theta" />` / `<Latex tex="\text{m/s}^2" />`；SVG 里用 `KaTeX_Math`（量）＋ `KaTeX_Main`（单位）字体。                                                                                                                                                                                                                                                                                                                                                        | 本文件"四" + `notes/katex-fonts-icons.md`                                 |
| **习题页一上来就展示"试卷上没有的东西"**                                 | **默认只展示试卷上本来就有的**：题干、题目图、已知量、设问。**受力分析、分速度/分加速度、辅助线、答案等一切"分析类"标注都必须点击之后才出现**——实现：组件加 `showForces` / `showDecomp` 属性 + `<g v-if>`，页面写 `:show-forces="$clicks >= 1"`。受力从**几何中心**出发、速度/加速度画**旁侧**、力只用 `F`+角标                                                                                                                                                                                                                                                | 本文件"三·题目图与受力分析"                                               |
| **`text-*` 阶梯会把行高也改掉**                                          | UnoCSS 自带的 `.text-Nxl` 是 `font-size` + `line-height` 两个声明，而 `common.css` 的字号阶梯只 `!important` 覆盖 `font-size`、**不覆盖 `line-height`**；UnoCSS 工具类在产物里排在 addon 样式之后 ⇒ 把它用在**文本块**（不只是图标）上时，行距按 UnoCSS 那份走。**阶梯越大越明显**（`text-5xl` 的 `line-height` 是 `1`，会"行贴行"；`text-lg` 的 1.75rem 与继承值接近，基本无事）。要在文本块上放大字号，就**同时显式给 `leading-normal` / `leading-tight`**（4.1 第 2 页 `ask text-5xl leading-normal` 实测：div 高 171.6→257.4px、页留白才回到 152.8/141.8） | `notes/style-guide.md` §2                                                 |
| **版面跟视口宽度绑定（`vw`/`vh`/`@media (width…)`/`innerWidth`）**       | 幻灯片是**固定 980×552 画布 + 整体缩放**，视口单位跟的是**浏览器窗口**而不是画布 ⇒ 换个窗口尺寸版面就变，窄窗口会把整页撑爆（1.1 第 4 页 `@media (width <= 768px)` 把三栏堆成一列直接炸）。要"跟着容器自适应"就用 `%`/`1fr`/`ResizeObserver` 观察**自己的元素**。`pnpm style:audit` 会以 **error** 级报出来；`E2E_VIEWPORT=700x394 pnpm shots <课> <页>` 可手动验窄窗口                                                                                                                                                                                        | `notes/slidev-layout.md` §3.6                                             |
| **未定义的 CSS token 用在 SVG 表现属性上**                               | `fill="var(--x)"` / `stroke: var(--x)` 而 `--x` **从未定义** ⇒ 该属性变成 “invalid at computed-value time”：`fill` 继承成**黑**、`stroke` 继承成 `none` ⇒ **器件渲染成纯黑块、描边整体消失**，e2e查不出来。**新组件只用正本 token，别发明别名，也别写 `var(--x, 兜底)` 把问题遮住**                                                                                                                                                                                                                                                                            | `workspace/shared/styles/common.css`                                      |
| **点击时已有元素被顶跑（位移）**                                         | 根因几乎总是**块宽/块高随内容变化**：flex 行里新增一项会把前面的读数挤走（第九章程实测 83.4px）、数值位数变多会把单位推走（7.7px）、分式换等值式会改行高（24.7px）。`tabular-nums` 只管**单字符等宽**、管不了整串变长。三种根因修法：① 读数改**固定列 grid**、后续列从第 0 步就预留；② 会变的行用**常驻占位**（`visibility: hidden`）+ `min-height`；③ 数值所在盒**定宽**（`min-width` 或 grid 定列）。⛔ 别用 `v-if` 真删真插。e2e 的"位移"默认只报告，但它违反"点击只新增、不顶跑"                                                                           | `notes/slidev-interactions.md`                                            |
| **"图区高度" ≠ "组件高度"**                                              | `图 \| 右栏读数` 这种 flex 行的行高由**更高的一侧**决定：只压图区的高度没用（第九章程 P10 就这么顶出去 13px、P11 那张图还被 `w-full h-full` 撑到约 500px 一次牵连 182 个元素）。压高度必须同时看两侧：右栏删重复读数行、收行距（`.stack-tight`），画布比例也要与可用空间匹配（否则被 letterbox 成"小图居中"）                                                                                                                                                                                                                                                  | 本文件"三·版面尽量占满"                                                   |
| **正文越界：压住标题＝必须修**                                           | e2e 的"正文越界（相对 `.page-grow`）"默认只报告，判据是：**压住大标题（字叠字）＝🔴 必须修**；只是紧贴/被上下内边距吸收、可见矩形仍在 980×552 内＝不追（为亚像素反复改只会让版面更紧、后排更差）。典型成因：KaTeX 默认 `font-size:1.21em` 会撑高 `.ask` 行盒（第九章程 P12 因此上溢 34px）→ `.ask .katex{font-size:1em}` + `display:inline-block;line-height:1`                                                                                                                                                                                                | `notes/e2e-checks.md`                                                     |
| **`html{font-size:22px}` ⇒ `1rem` 是 22px（不是 16px）**                 | `workspace/shared/styles/common.css` 把根字号设成 **22px**，所以 `1rem = 22px`：`.ask` 23.76px、`.ask-lead` **27.28px**、`.mini-title` 28.16px。**估版面时建议按 22px 折 rem**——按 16px 算会把字号低估 37%、把 `2.2rem` 的内边距低估 27px（这些值随样式改动会变，用前值得再看一眼 `common.css`）。经验值：正文可用宽 ≈**883px**、无 `#` 标题页正文可用高 ≈**492.6px**；每行字数 正文 40／`.ask` 37／`.ask-lead` 32／`.mini-title` 31。                                                                                                                         | `notes/slidev-layout.md`                                                  |
| **正文块之间留空行会被 markdown 包成 `<p>`，每块多约 44px 外边距**       | `<p>` 自带 1em 上下外边距（22×2 = **44px**），一页四五块就 ≈**200px 纯外边距**，容易把 `.page-grow` 顶穿；e2e 只把问题指到最外层元素（`.ask` 上顶、气泡下顶），很容易被误判成"图太高"。**建议**块内不留空行、或写成显式 `<div>`；裸 div 的字号会继承主题 1.1rem（比 `<p>` 大 10%），需要时可在本课 `style.css` 用 `.page-grow > div:not([class]) { font-size: 1rem }` 钉回。属经验值——页面密度够用就行，不必强求统一写法。                                                                                                                                     | `notes/slidev-layout.md`                                                  |
| **在 `:root` 覆盖 `--hint-pad-y`/`--hint-pad-x` 会让气泡图标与文字错位** | 气泡（`.tip-hint` 等五种）的图标是 `::before` **绝对定位**，`top` 由 `calc(var(--hint-pad-y) + …)` 算出——在 `:root` 覆盖这两个 token 后，文字跟着内边距走、图标按另一套基准算，两者会立刻错开（8.4 的 P3/P4 踩过）。**通常只覆盖 `--page-gap`／`--stack-gap` 这类块间距**（它们不参与气泡内部版式）；确实要压某一页的气泡内边距，可以只对那页内联 `style="--hint-pad-y: …"`，顺手截一张图确认图标没跑偏。                                                                                                                                                      | `courseware-style-pass.md` §5                                             |
