# 高中物理交互式课件

> 基于 Slidev + Vue 3 的交互式公开课课件集合 | 东北育才学校
>
> 入口网站：**[https://courseware.mister-hope.com/](https://courseware.mister-hope.com/)**

---

## 项目简介

人教版高中物理全套交互式课件，覆盖必修三册 + 选择性必修三册。以 Web 技术构建，用玻璃态设计、物理模拟组件和平滑动效替代传统 PowerPoint。

## 快速开始

```bash
pnpm install

# 启动入口网站（http://localhost:3030）
pnpm dev

# 启动电容器课件
pnpm dev:capacitor
```

## 项目结构

```text
├── workspace/                  # 工程代码
│   ├── homepage/               # 入口网站（课程卡片 + 分册 Tab）
│   │   ├── index.html
│   │   ├── main.ts             # 课程卡片渲染 + tab 切换
│   │   ├── style.css           # 设计系统
│   │   └── courses.config.ts   # 课件配置（按分册组织）
│   └── shared/                 # 共享 addon（顶栏/底栏/设计系统/logo，跨课件复用）
├── courses/                    # 课件目录
│   └── capacitor/              # §10.4 电容器的电容
│       ├── slides.md           # 主课件（24 页）
│       ├── components/         # 4 个交互式 Vue 组件
│       └── content/            # 教案 / 思路 / 逐字稿
├── resources/                  # 教学资源
│   ├── textbooks/              # 📚 教材库（人教版 Markdown 版，生成课件前必读）
│   └── init-slidev-courseware/ # 给零代码教师的初始化工具（环境配置 + 全流程指引）
├── scripts/
│   └── build-all.ts            # 统一构建脚本
└── .github/workflows/          # CI（lint + build）
```

## 课件列表

> 📋 **全部课件清单以本表为准。** 每课详细内容（页目/交互组件/特殊环节）见对应 `courses/<slug>/README.md`。

| 分册   | 课件                                       |
| ------ | ------------------------------------------ |
| 必修三 | [§10.4 电容器的电容](./courses/capacitor/) |

## 构建

```bash
pnpm build        # 仅构建入口网站
pnpm build:all    # 构建入口网站 + 全部课件 → dist/
```

## 技术栈

- [Slidev](https://sli.dev/) — 课件框架
- Vue 3 — 交互组件
- Vite 8 — 入口网站构建
- KaTeX — 数学公式
- pnpm — monorepo 管理

## 许可

MIT
