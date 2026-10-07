# 笔记：AI 技能（`.agents/skills/`）的入库与更新

> 什么时候读：要装/更新/恢复技能时，或怀疑 DSH 读不到技能时。

## 结论先说：技能正本要入库

`.agents/skills/`（正本）与 `skills-lock.json`（版本清单）**都提交进仓库**，别加回 `.gitignore`。

理由（都有实证）：

1. **不入库会直接卡住 CI 与部署**：`ci.yml` 三个 job 和 `deploy.yml` 第一步都是 `pnpm ci`（清理 + 冻结 lockfile 安装）→ 触发 postinstall → `scripts/check-skills.ts`；
   该脚本**只做离线存在性检查**（`.agents/skills/<name>/SKILL.md` 在不在），缺了直接 `exit 1`——**它不会自己下载安装**。
2. **入库才可复现**：`skills-lock.json` 只记 `source`（GitHub 仓库）+ `skillPath` + `computedHash`，**没有 commit / tag / 版本号**；`pnpm dlx skills@latest` 里的 CLI 版本也是浮动的。
   不入库时克隆后拿到的是**上游当前内容**，技能行为可能悄悄变；入库的这份明文才是"审过、CI 跑过的那一份"，升级会在 git 里留 diff，可 review 可回滚。
3. **成本极低、离线可用**：55 个 markdown 文件、约 67 KB；DSH 的技能扫描表直接读 `<项目根>/.agents/skills`（rank 200），克隆下来立刻能用。
4. **官方也这么建议**：CLI 是 [vercel-labs/skills](https://github.com/vercel-labs/skills)（`skills` v1.7.0），它的项目级安装目录 `./<agent>/skills/` 对
   `opencode`、`codex`、`cursor`、`zed`、`gemini-cli` 等**一律指向 `.agents/skills/`**，官方对项目级安装的定位就是 "committed with your project, shared with team"。
   `.claude/skills` 只服务 Claude Code，本仓库没有也不需要它。

## 更新方式（唯一入口，不要手改技能正本）

```bash
pnpm skills:check                                 # 离线自检：lock 列出的技能正本是否都在（postinstall 也会跑）
pnpm skills:update                                # ★ 更新：skills update -p -y（项目范围、非交互，改写正本 + lock）
pnpm skills:list                                  # 看装了哪些技能、装在哪
pnpm skills:add <owner/repo> --skill <名字> -y     # 新增技能，例：pnpm skills:add slidevjs/slidev --skill slidev -y
pnpm skills:restore                               # 误删恢复：git checkout -- .agents skills-lock.json（纯离线）
```

**更新后固定三步**：

1. `git diff --stat .agents skills-lock.json` —— 看改了哪些文件、`computedHash` 是否变化；
2. `pnpm skills:check` —— 复验正本完整；
3. 技能若涉及本项目用法（如 `slidev`）→ 再跑一次 `pnpm test:e2e`。

技能更新属于**仓库级变更，单独提交**（如 `更新技能：slidev`），别和课件改动混在一起。

## 坑

- 联网更新要能访问 GitHub（本机按用户级 `AGENTS.md` 走代理）；`pnpm dlx` 还要写 `~/Library/Caches/pnpm/dlx`，
  受限沙箱里会报 `ERR_PNPM_CLI_DLX_CACHE`，必要时在普通终端执行。
- `skills:restore` 是 `git checkout`，会**丢弃对技能正本的本地改动**（这正是"恢复出厂"的语义）；要升级请用 `skills:update`。
- 旧文档里的 `experimental_install` 在 CLI 1.7.0 里**已不存在**，别再用。
- **本仓库脚本没有"按页读源码"这类能力**：`slidev` 技能只讲 Slidev 用法；读某一页用 `pnpm slide`（见 `AGENTS.md` 第五节）。
