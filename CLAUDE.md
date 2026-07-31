# 高中物理交互式课件 — Monorepo 项目指南

> **给 AI 的项目知识库。** 用户是转行成为高中物理教师的开发者，AI 是教学辅助工具：在本仓库中为一个新课 `courses/xxx/` 创建项目，并根据用户提供的（或初始化后提供的）语音转文字授课思路 + 对应教材，自动生成整套课件（幻灯片 + 教案 + 逐字稿）。
>
> 技术栈：Slidev + Vue 3，`pnpm` monorepo，人教版本高中物理（必修三册 + 选择性必修三册）。

---

## 一、项目结构

```text
shared/                  ← 共享 addon（slidev-addon-courseware），跨课件复用
  components/
    CourseTopBar.vue         ← 顶栏组件（chapter / section props）
    CourseBottomBar.vue      ← 底栏组件（纯装饰线，无页码）
  styles/
    index.css                ← addon 样式入口（自动注入）
    common.css               ← 通用设计系统（玻璃态、聊天气泡、动效、封面样式）
  assets/logo.png            ← 学校 logo
textbooks/               ← 📚 教材库（人教版 Markdown 版，见下"教材先行"）
  必修第一册/ … 必修第三册/      ← 必修按全书连续编号（1–13）
  选择性必修第一册/ … 第三册/    ← 选必各自从第 1 章开始；每册内 N-text.md / N-question.md
courses/*/               ← 课件（一课一目录，英文 slug）
  slides.md                  ← 主课件（headmatter 声明 addons: [../shared]）
  global-top.vue             ← 顶栏薄壳：<CourseTopBar chapter="…" section="…" />
  global-bottom.vue          ← 底栏薄壳：<CourseBottomBar />
  style.css                  ← 仅本课特有样式（通用样式由 addon 提供）
  components/                ← 交互式 Vue 组件（自动注册）
  images/                    ← 实物照片素材
  content/
    思路.md                   ← 课程设计思路（用户口述，AI 整理）
    教案.md                   ← 公开课教案（AI 生成）
    逐字稿.md                 ← 逐句台词（AI 生成，与幻灯片页码对应）
src/                     ← 入口网站（课程卡片 + 分册 Tab）
  courses.config.ts          ← 课件注册表（按分册组织，新增课必须登记）
scripts/
  build-all.ts               ← 统一构建：入口网站 + 全部课件 → dist/
init-slidev-courseware/  ← 给"不懂代码的老教师"的独立课件生成工具（一个课件 = 一个独立项目）
```

### 共享 addon 接入（新课只需两步）

1. `slides.md` headmatter 添加：
   ```yaml
   addons:
     - ../shared
   ```
2. `global-top.vue`：
   ```vue
   <template>
     <CourseTopBar chapter="第十章 静电场" section="电容器的电容" />
   </template>
   ```
   `global-bottom.vue` 同理 `<CourseBottomBar />`。

> - addon 相对路径从 `courses/` 上级解析：课件 `courses/capacitor/` 指向根 `shared/` 用 `../shared`
> - ⚠️ 共享组件命名用 `CourseTopBar` / `CourseBottomBar`，**禁用** `GlobalTop` / `GlobalBottom`——后者是 Slidev 保留的全局层组件名，重名会导致循环引用栈溢出
> - 课件自己的 `style.css` 在 addon 样式之后加载，可覆盖

### 教材库（textbooks/）

- 人教版全文 Markdown 化，按分册分子目录（`必修第一册/`…`选择性必修第三册/`）；每册内 `N-text.md`（正文）+ `N-question.md`（习题）
- 编号忠实教材：必修三册全书连续（1–13），选必三册各自从第 1 章开始（目录名已区分分册，不冲突）
- 收录进度与分册映射见 `textbooks/README.md`（必修三缺 12/13 章，选必待录入）
- **生成课程必须教材先行**（见下方工作流第 1 步）；发现缺失章节先补录

---

## 二、新课创建流程（核心工作流）

> 用户给了课题 + 授课思路（语音转文字或文字稿）后，按此流程执行。**先问后答、教材先行**贯穿始终。

1. **教材先行**：读 `textbooks/` 对应章节正文 + 习题，确认知识点顺序、公式写法、物理术语。**一切物理内容以教材为准，禁止凭记忆编造。**
2. **整理思路**：把用户提供的语音转文字稿整理为结构化的 `content/思路.md`（引入 → 环节 → 实验 → 总结，保留细节如实物传看、类比动效）。**整理后向用户复述确认**，用户认可后再动手。
3. **设计课件结构**：按"先问后答"设计页序（每页先抛问题、再点击呈现答案），规划交互式组件（需要演示/模拟处）。
4. **创建骨架**：`courses/<slug>/` 建目录，接入 shared addon（见上），建 `components/`、`images/`、`content/`。
5. **编写 `slides.md`**：遵守设计系统与已知坑（见下）。交互处做成 Vue 组件（真实学科公式计算）。
6. **生成配套文档**：`content/教案.md`（公开课教案提纲）+ `content/逐字稿.md`（逐页逐句台词，页码对应）。
7. **登记注册**：在 `src/courses.config.ts` 对应分册的 `courses` 数组添加元数据（slug / 标题 / 章节号 / 描述 / 标签），并同步根 `README.md` 的"课件列表"表格，入口网站自动展示。
8. **预览验证 + 构建**：`pnpm dev` 逐页检查 → 修改 → `pnpm build:all` 确认无报错。

**迭代**：不追求一版定稿。每版先自审（视觉/逻辑/物理准确性），再给用户预览并主动邀请反馈，循环到满意。迭代中踩过的坑同步写回本文件。

---

## 三、设计系统

### 视觉规范

- **玻璃态**：卡片 `backdrop-filter: blur(16px)` + 半透明背景
- **大圆角**：`border-radius: 1.25rem ~ 1.75rem`
- **字号**：基础 22px，封面标题 ~57px（3.5rem），大教室后排清晰可读；最小字号 ≥0.65rem
- **配色**：
  - 背景：深蓝渐变 `#090d1a → #0c1122 → #0f1425`
  - 卡片：半透明 `rgba(30, 41, 59, 0.65)` + backdrop-blur
  - 强调：暖金 `#e2a846`、深蓝 `#3b82f6`
  - 正电/危险红 `#f87171`，负电蓝 `#60a5fa`（交互组件内）
- **字体**：仅系统字体（PingFang SC / Microsoft YaHei 等），**禁止 Google Fonts**（中国大陆不可用）
- **封面标题**：渐变文字 + 微弱亮度呼吸动画

### 动画与布局

- 页面过渡 `transition: fade`（0.5s）；顶栏文字封面"章节名"→内页"课题名"用 Vue `<Transition>` 上下平移 + 缩放
- 内容逐条呈现用 `v-click` / `v-clicks`；卡片 hover 微上浮 + 边框增亮
- 顶栏：封面左显示章节名，内页左显示课题名，右侧恒显学校 logo
- 页脚：仅两侧渐隐装饰线，**不显示页码**（公开课不需要）
- 图标：`@iconify-json/mdi`，`<mdi-xxx />`，**禁用 emoji**

---

## 四、技术约定与已知坑

- 包管理 `pnpm`；组件放 `components/`（自动注册）；全局样式 `style.css`
- **LaTeX / KaTeX**：Markdown 段落直接 `$...$`；**HTML 块内公式所在段落前后必须加空行**，否则 KaTeX 不渲染（最常见坑）
- **SVG 字号被 UnoCSS 劫持**：UnoCSS 属性选择器 `[font-size~="11"]` 会误匹配 SVG 的 `font-size="11"`。`style.css` 已有修复，新组件不要移除：

  ```css
  svg {
    font-size: 16px;
  }
  svg [font-size] {
    font-size: unset !important;
  }
  ```

- **导航**：键盘 ← → / 翻页笔。**点击页面中央不翻页是 Slidev 有意设计，绝不要 hack**（内容区留给交互组件）
- **物理表述必须准确**：如"与正极相连的极板失去电子 → 带正电"，不说"电源正极吸引电子"；拿不准查教材
- **先问后答**：每页先抛问题制造悬念，再点击呈现答案——授课视角，不是知识罗列
- 交互组件用**真实学科公式**计算（computed 中实现），数值随参数真实变化，不拍脑袋

---

## 五、构建与部署

```bash
pnpm install        # 装依赖（根 + 各课件）
pnpm dev            # 入口网站（localhost:3030）
pnpm dev:capacitor  # 开发某课件（--filter）
pnpm build:all      # 构建入口网站 + 全部课件 → dist/
```

- 课件 `package.json` 的 build/dev 带 `--base /<slug>/`（子路径部署，资源不 404）
- 部署站点：<https://courseware.mister-hope.com/>
- 新增课件记得同步登记 `src/courses.config.ts`

---

## 六、init-slidev-courseware/（给不懂代码教师的独立课件生成工具）

- 定位：给"零代码经验的老教师"**生成独立的完整 Slidev 课件项目**（一个课件 = 一个独立项目，自带全部设计系统与资源）。教师只拷走本文件夹，AI 按 spec.md 从环境配置开始，现场 `pnpm create slidev` 生成课件项目；git 仅作本地兜底（AI 每次提交、改坏了能回退），教师不用 GitHub
- `README.md` = 教师入口（人话版，含开始话术与 FAQ）；`spec.md` = AI 执行剧本（环境配置 → 建独立项目 → 写入设计系统 → 教材先行 → 收集思路 → 写课件 → 迭代 → 交付，含安全围栏）
- **与本仓库是平行工具**：本仓库是你自己维护的 monorepo 课件集（复用 `shared/`、教材库 `textbooks/`）；init 工具独立运行，**不读取本仓库资源**，其教材由教师现场提供（拍照/复制/拖文件），不依赖 `shared/` 与 `textbooks/`
- 与本文件的分工：`spec.md` 负责流程、沟通、围栏，并内嵌独立项目的设计系统模板（因为独立项目不带 shared）；本文件负责本仓库的项目知识、设计系统、技术坑
- 两边设计系统需保持一致认知（spec.md 内嵌的模板源自本仓库 `common.css` 的设计语言）

---

## 七、维护约定

- **共享代码改动需谨慎**：`shared/` 影响所有课件，改前评估影响面
- **新增交互组件**：登记到对应课件 README 与本文件（名称 + 用途），供后续复用
- **教材补录**：新增章节写入 `textbooks/`，更新 `textbooks/README.md` 索引
- **git 提交**：中文信息，按逻辑阶段（如 `创建课程骨架：xxx`、`完善课件：第 X 页调整`）
- 格式化用 `oxfmt`（`slides.md` 除外）

---

## 八、当前进度

### ✅ 已完成课件

- `courses/capacitor/`《电容器的电容》（必修三 §10.4，24 页）——完整交付，含 `content/` 三件套（思路/教案/逐字稿）与 Word 教案导出
- 每课的页目、交互组件、特殊环节等详细内容见对应 `courses/<slug>/README.md`
- **全部课件清单以根 `README.md` 的"课件列表"为准**，新增课件记得同步更新该表与 `src/courses.config.ts`

### 已固化的经验（写回本节，避免新会话踩坑）

- KaTeX 在 HTML 块内需空行；SVG font-size 需 `!important` 覆盖（见"四"）
- 水桶类比动效、先问后答节奏、实物传看环节位置等设计决策见 `courses/capacitor/content/思路.md`
