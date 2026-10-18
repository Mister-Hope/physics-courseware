# 笔记：AI 技能（`.agents/skills/`）的安装与更新

> 什么时候读：要装/更新/恢复技能时，或怀疑 DSH 读不到技能时。

## 1. 🔴 两种技能、两套入库规则

| 技能                            | 目录                     | 入库                                     | 为什么                                                                                                                          |
| ------------------------------- | ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **上游技能**（现只有 `slidev`） | `.agents/skills/<name>/` | ⛔ **不入库**，只提交 `skills-lock.json` | 上游是 MIT；`skills` CLI 不会把上游许可声明一起拉下来，入库会把它置于本仓主协议（CC BY-NC-SA 4.0）之下，违背 MIT 的许可保留要求 |
| **本仓自研技能**                | `.agents/skills/<name>/` | ✅ **入库**                              | 原创内容，本就在本仓协议之下（见 §4）                                                                                           |

`skills-lock.json` = 上游技能清单（`source` + `skillPath` + `computedHash`）。
`.agents/skills/*` 在 `.gitignore` 里默认全忽略，**只对 §4 列出的自研技能目录逐个开例外**。

**上游技能不入库的代价（都可接受）**：

1. **锁文件不能精确复现版本**：条目里只有 `source` + `skillPath` + `computedHash`，**没有 `ref` / commit**，
   所以 `pnpm skills:restore` 拿到的是上游默认分支的**当前**内容，不等于"当初那一版"。
   CLI 的锁结构其实支持 `ref`——用 `owner/repo#<commit-or-tag>` 这种源安装就会记下来，
   届时 `restore` 会固定到该 ref；真要精确复现时补 `ref` 再恢复即可。
2. **CI 里没有技能正本也照常跑**：CI 本来就不跑任何技能相关能力，`scripts/check-skills.ts`（postinstall 会跑）
   在 `CI` 环境变量存在时**静默跳过**（不打印、不联网、不安装）；本地缺技能时则**自动跑
   `skills experimental_install` 拉回正本**——postinstall 场景修复失败只警告、不会拦住 `pnpm install`，
   显式 `pnpm skills:check --strict` 才会报错退出，所以 `pnpm ci` / 部署永远不会被技能影响。
3. 🔴 **DSH 的技能扫描表**读 `<项目根>/.agents/skills`（rank 200）→ **技能装在本仓库根目录才能用**；
   `.claude/skills/<name>` 只是软链，正本不在时两边都用不了。

## 2. 安装 / 更新 / 恢复（唯一入口）

```bash
pnpm skills:check                                 # 自检 + 自动修复：本地缺技能时自动按 skills-lock.json 恢复（postinstall 也会跑；CI 静默跳过）
pnpm skills:restore                               # 从 skills-lock.json 恢复正本到 .agents/skills/（需联网）
pnpm skills:update                                # 更新到上游最新：skills update -p -y（改写正本 + lock；需联网）
pnpm skills:list                                  # 看装了哪些技能、装在哪
pnpm skills:add <owner/repo> --skill <名字> -y     # 新增技能，例：pnpm skills:add slidevjs/slidev --skill slidev -y
```

🔴 **不要手改上游技能的正本**（`.agents/skills/slidev/` 等）：它不入库，`skills:update` / `skills:restore` 一跑就被覆盖，改动等于丢。
要改上游技能的行为，改的是本仓自己的笔记或脚本。**自研技能正相反**：它就是我们的正本，改它、提交它都是对的。

🟡 **装完/更新后**：先 `pnpm skills:check` 复验正本完整；技能若涉及本项目用法（如 `slidev`）→ 顺手再跑一次 `pnpm test:e2e`。
🟡 `skills-lock.json` 变化时单独提交（如 `更新技能锁：slidev`），别和课件改动混在一个提交里。

## 3. 自研技能：什么该写成 skill、什么该留笔记

**分界线**：

| 内容                                                                   | 放哪                        | 判据                 |
| ---------------------------------------------------------------------- | --------------------------- | -------------------- |
| **参考手册**：props 全表、"禁止手画"速查、token 色值、坑清单、门禁事实 | **笔记** `.agents/notes/`   | "我要**查一个事实**" |
| **可重复跑的动作**：触发条件 → 步骤 → 自检命令 → 失败怎么办 → 汇报口径 | **skill** `.agents/skills/` | "我要**做一件事**"   |

**skill 只指向笔记，不抄笔记内容**（抄一遍＝又多一处要同步的重复）。

现有 4 个自研技能（都在 `.agents/skills/`，`git` 里跟踪）：

| 技能                  | 什么时候用                                | 依赖的笔记                                                                        |
| --------------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| `physics-figure`      | 要画/改物理图，或图看不见、变形、位置不对 | `svg-attributify-trap`、`shared-components`、各图元专篇                           |
| `courseware-page`     | 要新增/改写一页 `slides.md`               | `exercise-layouts`、`style-guide`、`courseware-style-pass`、`slidev-interactions` |
| `courseware-qa`       | 改完要验收版面 / e2e 报红定位             | `e2e-checks`                                                                      |
| `exam-image-to-slide` | 老师给题目照片要做成课件页                | `read-images`、`exercise-layouts`                                                 |

**新增一个自研技能**：建 `.agents/skills/<kebab-name>/SKILL.md`，开头必须是

```yaml
---
name: <kebab-name>
description: 干什么 + 什么时候用（agent 靠这句判断要不要自动加载，所以要写触发场景）
---
```

然后在 `.gitignore` 里加 `!.agents/skills/<kebab-name>/`，并在 AGENTS.md「七、维护约定 → AI 技能」补一行。
改完跑 `pnpm skills:check`（应为 exit 0；它只管上游技能，不会误删自研的）。
