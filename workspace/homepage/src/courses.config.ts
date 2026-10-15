/**
 * 课件注册表的薄壳：数据本体在仓库根目录的 `courses.json`（唯一数据源）， 字段说明与校验规则见根目录的 `courses.schema.json`。
 *
 * 新增一门课请改 `courses.json`（或用 `pnpm create:course --textbook <分册>` 自动登记）， 也可以直接跑 `pnpm check:courses`
 * 校验数据。本文件只做「导入 + 类型标注」，不必再改。
 */

import courses from "../../../courses.json";
import type { TextbookGroup } from "./courses.types";

export type { CourseMeta, TextbookGroup } from "./courses.types";

export const textbooks: TextbookGroup[] = courses.textbooks;
