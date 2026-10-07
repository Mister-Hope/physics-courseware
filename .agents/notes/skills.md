# 笔记：AI 技能（`.agents/skills/`）的安装与更新

> 什么时候读：要装/更新/恢复技能时，或怀疑 DSH 读不到技能时。

## 结论先说：技能正本**不入库**，只提交锁文件

仓库里提交 `skills-lock.json`（清单：`source` + `skillPath` + `computedHash`），
`.agents/skills/`（技能正本）**一直走 `.gitignore`**，谁也别把它加回仓库。

**为什么**：技能是上游内容（`slidev` 来自 [slidevjs/slidev](https://github.com/slidevjs/slidev)，MIT）。
`skills` CLI 只拉技能文件，**不会把上游的许可声明一起拉下来**；把这份缺了 MIT 声明的明文提交进本仓库，
等于把它们置于本项目主协议（CC BY-NC-SA 4.0）之下，会违背 MIT 的许可保留要求。
不入库、本地按需安装，两边协议就不混。

**代价（都可接受）**：

1. **锁文件不能精确复现版本**：条目里只有 `source` + `skillPath` + `computedHash`，**没有 `ref` / commit**，
   所以 `pnpm skills:restore` 拿到的是上游默认分支的**当前**内容，不等于"当初那一版"。
   CLI 的锁结构其实支持 `ref`——用 `owner/repo#<commit-or-tag>` 这种源安装就会记下来，
   届时 `restore` 会固定到该 ref；真要精确复现时补 `ref` 再恢复即可。
2. **CI 里没有技能正本**：CI 本来就不跑任何技能相关能力，`scripts/check-skills.ts`（postinstall 会跑）
   对"整目录不存在"**直接放行**，只对"目录在、但 lock 列出的技能缺 `SKILL.md`"报错，
   所以 `pnpm ci` / 部署不会被技能影响。
3. **DSH 的技能扫描表**读 `<项目根>/.agents/skills`（rank 200）→ 技能必须装在本仓库根目录才能用；
   `.claude/skills/<name>` 只是软链，正本不在时两边都用不了。

## 安装 / 更新 / 恢复（唯一入口，不要手改技能正本）

```bash
pnpm skills:check                                 # 离线自检：lock 列出的技能正本是否都在（postinstall 也会跑）
pnpm skills:restore                               # 从 skills-lock.json 恢复正本到 .agents/skills/（需联网）
pnpm skills:update                                # 更新到上游最新：skills update -p -y（改写正本 + lock；需联网）
pnpm skills:list                                  # 看装了哪些技能、装在哪
pnpm skills:add <owner/repo> --skill <名字> -y     # 新增技能，例：pnpm skills:add slidevjs/slidev --skill slidev -y
```

装完/更新后：先用 `pnpm skills:check` 复验正本完整；技能若涉及本项目用法（如 `slidev`）→ 再跑一次 `pnpm test:e2e`。
`skills-lock.json` 变化时单独提交（如 `更新技能锁：slidev`），别和课件改动混在一起。

## 坑

- 联网安装/恢复要能访问 GitHub（本机按用户级 `AGENTS.md` 走代理）；`pnpm dlx` 还要写 `~/Library/Caches/pnpm/dlx`，
  受限沙箱里会报 `ERR_PNPM_CLI_DLX_CACHE`，必要时在普通终端执行。
- `skills:restore` 走的是 CLI 的 `experimental_install`（"Restore skills from skills-lock.json"）；名字带 experimental，
  升级 CLI 前先 `pnpm skills:list` / `skills --help` 确认子命令还在。恢复失败时它只报错、不会自己降级。
- **本仓库脚本没有"按页读源码"这类能力**：`slidev` 技能只讲 Slidev 用法；读某一页用 `pnpm slide`（见 `AGENTS.md` 第五节）。
