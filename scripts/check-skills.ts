// 自检 AI 技能：确保 `skills-lock.json` 列出的技能正本都在本地（`pnpm install` 的 postinstall 会跑）。
//
// 行为（`pnpm skills:check` / postinstall 共用）：
// 1) **CI 上静默跳过**：`process.env.CI` 为真时直接返回，不打印、不联网、不安装。
//    CI（`.github/workflows/ci.yml`、`deploy.yml` 的 `pnpm ci` 会触发 postinstall）本来不跑任何技能相关能力，
//    技能装不装都不该影响 lint / build / deploy，也不该往 CI 日志里塞噪音。
// 2) **本地缺失或损坏时自动修复**：`.agents/skills/` 整个不存在（新克隆、没装过），或目录在但 lock 列出的
//    技能缺 `SKILL.md`（安装中断、本地误删），都**自动跑 `skills experimental_install` 拉回正本**。
//    postinstall 场景下失败**只警告不报错**——离线/受限沙箱里不该拦住 `pnpm install`。
// 3) 显式调用（`pnpm skills:check`，带 `--strict`）时自动修复失败才返回非 0，便于手动排查。
//
// 为什么技能正本**不入库**（见 .agents/notes/skills.md）：
// `.agents/skills/` 里是上游内容（`slidev` 来自 slidevjs/slidev，MIT），而 `skills` CLI 拉技能时
// **不会把上游的许可声明一起拉下来**；缺了那份声明的明文一旦提交进本仓库，就等于把它们置于
// 本项目主协议（CC BY-NC-SA 4.0）之下，会违背 MIT 的许可保留要求。所以仓库只提交
// `skills-lock.json`（清单：source + skillPath + computedHash），`.agents/skills/` 一直走 .gitignore。
//
// 注意 lock 里只记 source + skillPath、**没有 ref/commit**，所以恢复拿到的是上游默认分支的当前内容，
// 不等于"当初那一版"；要精确固定版本得给 lock 条目补 `ref`（CLI 支持 `owner/repo#ref`）再用同一命令恢复。
//
// 并发：`pnpm install` 会连带触发本脚本，多个 install 同时跑会争抢同一份 `.agents/skills/`（CLI 可能报 409 /
// 装出半份）。这里不做额外加锁（判断"另一个进程在装"本身很容易误判），失败路径只警告、退出 0，
// 重跑一次 `pnpm install` / `pnpm skills:check` 即可收敛。
//
// DSH 的技能扫描表：<项目根>/.dsh/skills（rank 100）→ <项目根>/.agents/skills（rank 200）→ 用户级目录；
// 不读 `.claude/skills`（`.claude/skills/<name>` 只是软链，正本不在时两边都用不了）。

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/** 仓库根目录（本文件在 scripts/ 下） */
const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const LOCK_PATH = path.join(ROOT_DIR, "skills-lock.json");
const SKILLS_DIR = path.join(ROOT_DIR, ".agents", "skills");
/** 恢复命令：skills CLI 从 skills-lock.json 拉回 `.agents/skills/`（需联网） */
const RESTORE_ARGS = ["dlx", "skills@latest", "experimental_install"];
/** 自动修复的超时：卡住时尽快放过 `pnpm install`，而不是干等 */
const RESTORE_TIMEOUT_MS = 5 * 60 * 1000;

/** `--strict`：显式调用（`pnpm skills:check`）时对"修复失败"返回非 0；postinstall 调用不带此参数 */
const isStrict = process.argv.includes("--strict");
/** CI（GitHub Actions 等）不跑技能相关能力：**静默跳过**，不打印、不联网、不安装 */
const isCi = Boolean(process.env.CI);

/**
 * 人类可读的恢复命令："pnpm dlx skills@latest experimental_install" → "pnpm dlx skills experimental_install"
 * （dlx 的包名不用重复打出来）。
 *
 * @returns 可读命令
 */
const formatCommand = (): string =>
  `pnpm ${RESTORE_ARGS.map((arg) => (arg === "skills@latest" ? "skills" : arg)).join(" ")}`;

/**
 * 跑 skills CLI，把 lock 里的技能正本拉回 `.agents/skills/`。
 *
 * @returns 是否执行成功（退出码 0）
 */
const restoreSkills = (): boolean => {
  console.log("[skills] installing from skills-lock.json (network required)...");

  const result = spawnSync("pnpm", RESTORE_ARGS, {
    cwd: ROOT_DIR,
    stdio: "inherit",
    timeout: RESTORE_TIMEOUT_MS,
  });

  return result.status === 0;
};

/** 自动修复失败的收尾：postinstall 只警告（离线不该拦住 `pnpm install`），`--strict` 才返回非 0 */
const reportFailure = (): void => {
  console.warn(
    `[skills] auto-install failed (tried: ${formatCommand()}). Missing skills do not affect lint / build / e2e.`,
  );
  console.warn(
    "[skills] GitHub must be reachable; a restricted sandbox reports ERR_PNPM_CLI_DLX_CACHE, run it in a normal terminal.",
  );

  if (isStrict) process.exitCode = 1;
};

/**
 * 自检 + 按需自动安装技能正本。
 *
 * CI 上直接返回（静默）；本地缺技能时尝试恢复，失败只警告（`--strict` 下返回非 0）。
 */
const main = (): void => {
  if (isCi) return;

  /** 技能正本目录是否存在（不存在＝没装技能，需要自动安装） */
  const skillsDirExists = existsSync(SKILLS_DIR);

  /**
   * 应有技能清单：以 skills-lock.json 为准；没有清单时退回扫描 .agents/skills。
   *
   * @returns 技能名字列表（可能为空）
   */
  const readExpectedSkills = (): string[] => {
    if (existsSync(LOCK_PATH)) {
      try {
        const lock = JSON.parse(readFileSync(LOCK_PATH, "utf8")) as {
          skills?: Record<string, unknown>;
        };

        return Object.keys(lock.skills ?? {});
      } catch (err) {
        console.warn(
          `[skills] failed to parse skills-lock.json, falling back to directory scan: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    }

    if (!skillsDirExists) return [];

    return readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  };

  /**
   * 某个技能的正本（`SKILL.md`）是否就位。
   *
   * @param name 技能名（对应 `.agents/skills/<name>/SKILL.md`）
   * @returns 正本是否存在
   */
  const isSkillInstalled = (name: string): boolean =>
    existsSync(path.join(SKILLS_DIR, name, "SKILL.md"));

  const expectedSkills = readExpectedSkills();
  // 只有"目录存在"时才判定缺失：目录整个不存在＝没装技能，同样交给下面自动安装
  const missingSkills = skillsDirExists
    ? expectedSkills.filter((name) => !isSkillInstalled(name))
    : [];

  if (missingSkills.length > 0) {
    console.log(
      `[skills] incomplete: ${missingSkills.join(", ")} (expected .agents/skills/<name>/SKILL.md), repairing...`,
    );

    if (restoreSkills() && missingSkills.every((name) => isSkillInstalled(name))) {
      console.log(`[skills] repaired: ${expectedSkills.join(", ")} (.agents/skills/)`);
    } else {
      // 复验失败有两种：CLI 直接报错，或 CLI 退出 0 但技能仍旧不全
      reportFailure();
    }
  } else if (!skillsDirExists) {
    if (expectedSkills.length === 0) {
      console.log("[skills] no skill registered in skills-lock.json, skipping install");
    } else {
      console.log(
        "[skills] not installed (.agents/skills/ missing), installing from skills-lock.json...",
      );

      if (restoreSkills() && existsSync(SKILLS_DIR))
        console.log(`[skills] installed: ${expectedSkills.join(", ")} (.agents/skills/)`);
      else reportFailure();
    }
  } else if (expectedSkills.length === 0) {
    console.log("[skills] no skill registered in skills-lock.json, skipping check");
  } else {
    console.log(`[skills] ready: ${expectedSkills.join(", ")} (.agents/skills/)`);
  }
};

main();
