/**
 * 课件注册表的类型定义（数据结构与字段说明见仓库根目录的 `courses.json` / `courses.schema.json`）。
 *
 * 这里只放类型：数据本身在 `courses.json`，运行时由 `courses.config.ts` 导入。
 */

/** 一门课件的元数据 */
export interface CourseMeta {
  /** 课件文件夹名（对应 `courses/` 下的目录） */
  slug: string;
  /** 课程标题 */
  title: string;
  /** 章节号（如 "§10.4"），页面卡片展示用 */
  chapter: string;
  /** 简短描述（建议 ≤80 字） */
  description: string;
  /** 标签（知识点 / 课型关键词，如 电容、习题课） */
  tags: string[];
}

/** 一个教材分册及其课件列表 */
export interface TextbookGroup {
  /** 完整书名 */
  name: string;
  /** Tab 上的简短名称 */
  shortName: string;
  /** URL 路径 slug（bx1/bx2/bx3/xx1/xx2/xx3） */
  slug: string;
  /** 该分册下的课件列表 */
  courses: CourseMeta[];
}
