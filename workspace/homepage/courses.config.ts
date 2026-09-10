/**
 * 课件配置文件
 *
 * 按人教版高中物理教材分册组织。 添加新课：在对应分册的 courses 数组里加一项即可。
 */

export interface CourseMeta {
  /** 课件文件夹名（对应 courses/ 下的目录） */
  slug: string;
  /** 课程标题 */
  title: string;
  /** 章节号（如 "§10.4"），页面卡片展示用 */
  chapter: string;
  /** 简短描述（≤80 字） */
  description: string;
  /** 标签（实验/概念/计算…） */
  tags: string[];
}

export interface TextbookGroup {
  /** 完整书名 */
  name: string;
  /** Tab 上的简短名称 */
  shortName: string;
  /** URL 路径 slug */
  slug: string;
  /** 该分册下的课件列表 */
  courses: CourseMeta[];
}

export const textbooks: TextbookGroup[] = [
  {
    name: "必修第一册",
    shortName: "必修1",
    slug: "bx1",
    courses: [],
  },
  {
    name: "必修第二册",
    shortName: "必修2",
    slug: "bx2",
    courses: [],
  },
  {
    name: "必修第三册",
    shortName: "必修3",
    slug: "bx3",
    courses: [
      {
        slug: "capacitor",
        title: "电容器的电容",
        chapter: "§10.4",
        description:
          "电容器充放电实验、平行板电容器的电容公式、电荷共享实验——通过交互式电路模拟和水桶类比，理解电容的物理本质。",
        tags: ["电容", "电容器"],
      },
    ],
  },
  {
    name: "选择性必修第一册",
    shortName: "选必1",
    slug: "xx1",
    courses: [],
  },
  {
    name: "选择性必修第二册",
    shortName: "选必2",
    slug: "xx2",
    courses: [],
  },
  {
    name: "选择性必修第三册",
    shortName: "选必3",
    slug: "xx3",
    courses: [],
  },
];
