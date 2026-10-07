// 新课件骨架的文件模板。
//
// 单独成文件的原因：模板本身很长，混在 create-course.ts 里会把主流程淹没。
// 风格与现有课件（courses/10.4-capacitor、courses/1.1-motion-description）保持一致，
// 生成后即可 `pnpm dev <课件标识>` 直接预览。

export interface CourseTemplateContext {
  /** 目录名（章节前缀 + 英文名）：URL 前缀与首页 slug */
  slug: string;
  /** 英文名（kebab-case）：包名 = `<英文名>-courseware` */
  name: string;
  /** 中文课题名，如「电容器的电容」 */
  chapterName: string;
  /** 封面章节号，如「10.4」 */
  chapter: string;
  /** 顶栏封面显示的章节名，如「第十章 静电场」 */
  chapterLabel: string;
  /** 共享 addon 相对路径（相对课件目录的父目录，Slidev 的解析基准） */
  addonPath: string;
  /** 分册全名，如「必修第三册」；未提供时为空 */
  textbookName?: string;
}

const TEACHER = "张伯望";
const SCHOOL = "东北育才学校";

// 标题里可能有引号 / 冒号 / 尖括号，分别按 YAML、HTML 属性、HTML 文本转义，避免生成坏文件
const escapeAttribute = (value: string): string =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

const escapeText = (value: string): string =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// 骨架里不写死任何物理内容：只给结构、注释和待办，避免 AI 顺着占位内容编造。
export const renderPackageJson = (context: CourseTemplateContext): string =>
  `${JSON.stringify(
    {
      name: `${context.name}-courseware`,
      private: true,
      type: "module",
      scripts: {
        build: `slidev build --base /${context.slug}/`,
        dev: `slidev --base /${context.slug}/`,
        export: "slidev export",
      },
      dependencies: {
        "@iconify-json/mdi": "catalog:",
        "@iconify/vue": "catalog:",
        "@slidev/cli": "catalog:",
        "@slidev/client": "catalog:",
        "@slidev/theme-default": "catalog:",
        vue: "catalog:",
      },
    },
    null,
    2,
  )}\n`;

export const renderSlides = (context: CourseTemplateContext): string => `---
theme: default
title: ${JSON.stringify(context.chapterName)}
titleTemplate: '%s'
highlighter: shiki
transition: fade
mdc: true
layout: cover
colorSchema: dark
clickAnimation: card
addons:
  - ${context.addonPath}
fonts:
  sans: Nunito Sans
  mono: Fira Code
  provider: none
# 页面外壳用共享 addon 的 base-flex 布局（flex 列；正文 .page-grow 靠它撑满）
defaults:
  layout: base-flex
  transition: fade
---

<div class="cover-chapter"><span class="cover-section">§</span> ${escapeText(context.chapter)}</div>

<h1 class="cover-title">${escapeText(context.chapterName)}</h1>

<div class="cover-subtitle">
  <span>原创：${SCHOOL} ${TEACHER}</span>
</div>

<!-- 封面装饰：占位图形，请按本课主题替换（坐标轴 / 标签规范见 AGENTS.md「四、技术约定与已知坑」） -->
<div class="cover-decoration abs-br m-8" aria-hidden="true">
  <svg viewBox="0 0 200 140" width="300" xmlns="http://www.w3.org/2000/svg">
    <path d="M 18 112 C 62 112 74 32 118 32 C 152 32 166 78 186 78" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity="0.7"/>
    <line x1="18" y1="112" x2="186" y2="112" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.4"/>
    <circle cx="118" cy="32" r="5" fill="#e2a846"/>
    <circle cx="186" cy="78" r="5" fill="#60a5fa"/>
  </svg>
</div>

---
layout: base-flex
---

## 待补充：第 1 页内容

<div class="card">

本页是骨架占位。先把 content/思路.md 的授课思路整理成页序，再逐页替换这里的内容。

</div>

<!--
  新增页面：在下方用 --- 分隔，每页先抛问题、再 v-click 呈现答案。
  公式写在 Markdown 段落里可用 $...$；HTML 块（card 内的 div）里必须改用 <Latex tex="..." />。
  图标用 <mdi-xxx />，不要用 emoji。
-->
`;

export const renderGlobalTop = (context: CourseTemplateContext): string => `<template>
  <CourseTopBar chapter="${escapeAttribute(context.chapterLabel)}" section="${escapeAttribute(context.chapterName)}" />
</template>
`;

export const renderGlobalBottom = (): string => `<template>
  <CourseBottomBar />
</template>
`;

export const renderStyle = (
  context: CourseTemplateContext,
): string => `/* ═══════════════════════════════════════════════
   ${context.chapterName} — 课程特有样式
   通用设计系统已提取到 workspace/shared/styles/common.css，
   由共享 addon（${context.addonPath}）自动注入，此处仅放本课特有样式
   ═══════════════════════════════════════════════ */
`;

export const renderIdeaDoc = (
  context: CourseTemplateContext,
): string => `# ${context.chapterName} — 授课思路

> 把老师口述的思路整理到这里（保留细节：实物传看、类比动效、时间分配、先问后答的节奏）。
> **整理完先向老师复述确认，确认后才动手写幻灯片。**

## 一、引入（约 3 分钟）

- 情境：
- 提问：

## 二、新课环节

### 环节 1

- 先问：
- 后答：
- 板书 / 公式：

### 环节 2

- 先问：
- 后答：

## 三、实验 / 演示

- 器材：
- 操作：
- 现象：
- 结论：

## 四、课堂小结

-

## 五、作业

-
`;

export const renderReadme = (context: CourseTemplateContext): string => {
  const textbook = context.textbookName ? `人教版${context.textbookName} ` : "人教版 ";

  return `# ${context.chapterName} — 公开课交互式课件

> 原创：${TEACHER}（${SCHOOL}） ｜ ${textbook}${context.chapter} ｜ 在线地址：**[https://courseware.mister-hope.com/${context.slug}/](https://courseware.mister-hope.com/${context.slug}/)**

## 待办

- [ ] 整理 \`content/思路.md\`（只放老师最初的授课思路原文），并向老师复述确认
- [ ] 按确认后的思路逐页写 \`slides.md\`（先问后答）
- [ ] 跑 \`pnpm test:e2e\` 检查每页是否超出 16:9 画面
- [ ] 设计定稿后再写 \`content/教案.md\` 与 \`content/逐字稿.md\`
- [ ] 更新本文件下方的「课件结构」与「交互式组件」表

> 本文件只写**本课特有**的内容：页目表、组件表、授课提醒、本课特有的工程约定。
> **不要**写通用的开发命令 / 设计系统 / 技术栈 / 项目文件清单 / addon 说明 / 许可——这些对每个课件都一样（见项目根 \`AGENTS.md\`）。

## 课件结构（N 页）

| 页码 | 内容   | 类型                |
| ---- | ------ | ------------------- |
| 1    | 封面   | 渐变标题 + 呼吸动画 |
| 2    | 待补充 |                     |

## 交互式组件

| 组件   | 功能 |
| ------ | ---- |
| 待补充 |      |
`;
};
