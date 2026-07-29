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

```
├── src/                    # 入口网站
│   ├── index.html
│   ├── main.ts             # 课程卡片渲染 + tab 切换
│   ├── style.css           # 设计系统
│   └── courses.config.ts   # 课件配置（按分册组织）
├── courses/                # 课件目录
│   └── capacitor/          # §10.4 电容器的电容
│       ├── slides.md       # 主课件（24 页）
│       ├── components/     # 4 个交互式 Vue 组件
│       └── content/        # 教案 / 思路 / 逐字稿
├── scripts/
│   └── build-all.ts        # 统一构建脚本
├── init-slidev-courseware/ # 课件创建工具
└── .github/workflows/      # CI（lint + build）
```

## 课件列表

| 分册   | 课件                                       |
| ------ | ------------------------------------------ |
| 必修三 | [§10.4 电容器的电容](./courses/capacitor/) |

## 添加新课

1. 在 `courses/` 下创建新目录
2. 在 `src/courses.config.ts` 对应分册的 `courses` 数组中添加一项
3. 入口网站自动展示

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
