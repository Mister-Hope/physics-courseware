// 离线自检 AI 技能：确认 `skills-lock.json` 列出的技能正本都在本地（`pnpm install` 的 postinstall 会跑）。
//
// 为什么技能正本**不入库**（见 .agents/notes/skills.md）：
// `.agents/skills/` 里是上游内容（`slidev` 来自 slidevjs/slidev，MIT），而 `skills` CLI 拉技能时
// **不会把上游的许可声明一起拉下来**；缺了那份声明的明文一旦提交进本仓库，就等于把它们置于
// 本项目主协议（CC BY-NC-SA 4.0）之下，会违背 MIT 的许可保留要求。所以仓库只提交
// `skills-lock.json`（清单：source + skillPath + computedHash），`.agents/skills/` 一直走 .gitignore。
//
// 因此本脚本分三种情形：
// 1) `.agents/skills/` 不存在（CI、新克隆、没装过技能）→ **正常状态**，只提示怎么装，退出 0。
//    CI 里本来就不跑任何技能相关能力，技能装不装都不该让 `pnpm ci` / 部署失败。
// 2) 目录在、但 lock 列出的技能缺 `SKILL.md`（装了一半、本地误删）→ 报错退出 1。
// 3) 全部齐 → 打印就绪。
//
// 恢复：`pnpm skills:restore`（= `skills experimental_install`，按 skills-lock.json 拉回
// `.agents/skills/`，需联网）。注意 lock 里只记 source + skillPath、**没有 ref/commit**，
// 所以恢复拿到的是上游默认分支的当前内容，不等于"当初那一版"；要精确固定版本得给 lock 条目补
// `ref`（commit / tag，CLI 支持 `owner/repo#ref` 这种源写法）再用同一命令恢复。
//
// DSH 的技能扫描表：<项目根>/.dsh/skills（rank 100）→ <项目根>/.agents/skills（rank 200）→ 用户级目录；
// 不读 `.claude/skills`（`.claude/skills/<name>` 只是软链，正本不在时两边都用不了）。

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/** 仓库根目录（本文件在 scripts/ 下） */
const ROOT_DIR = path.join(import.meta.dirname, "..");
const LOCK_PATH = path.join(ROOT_DIR, "skills-lock.json");
const SKILLS_DIR = path.join(ROOT_DIR, ".agents", "skills");
/** CI（GitHub Actions 等）不跑技能相关能力，技能缺失不算问题 */
const isCi = Boolean(process.env.CI);

/** 技能正本目录是否存在（不存在＝没装技能，不是错误） */
const skillsDirExists = existsSync(SKILLS_DIR);
// 应有技能清单：以 skills-lock.json 为准；没有清单时退回扫描 .agents/skills
const readExpectedSkills = (): string[] => {
  if (existsSync(LOCK_PATH)) {
    try {
      const lock = JSON.parse(readFileSync(LOCK_PATH, "utf8")) as {
        skills?: Record<string, unknown>;
      };

      return Object.keys(lock.skills ?? {});
    } catch (err) {
      console.warn(
        `⚠️  skills-lock.json 解析失败，改为扫描目录：${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  if (!skillsDirExists) return [];

  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
};

const expectedSkills = readExpectedSkills();
// 只有"目录存在"时才判定缺失：目录整个不存在＝没装技能，属正常状态
const missingSkills = skillsDirExists
  ? expectedSkills.filter((name) => !existsSync(path.join(SKILLS_DIR, name, "SKILL.md")))
  : [];

if (!skillsDirExists) {
  console.log(
    "ℹ️  未安装 AI 技能（.agents/skills/ 不存在）——技能正本不入库，这是正常状态，跳过自检。",
  );
  console.log(
    isCi
      ? "   CI 不跑技能相关能力，无需安装。"
      : "   需要时装：pnpm skills:restore（需联网，按 skills-lock.json 从上游恢复）",
  );
} else if (missingSkills.length > 0) {
  console.error(
    `❌ AI 技能不完整：${missingSkills.join("、")}（应存在 .agents/skills/<name>/SKILL.md）`,
  );
  console.error("   .agents/skills/ 存在但技能正本缺失，多半是安装中断或本地误删。");
  console.error("   修复：pnpm skills:restore（需联网，按 skills-lock.json 从上游恢复）");
  process.exitCode = 1;
} else if (expectedSkills.length === 0) {
  console.warn(
    "⚠️  未发现任何 AI 技能（skills-lock.json 为空且 .agents/skills 里没有技能），跳过自检",
  );
} else {
  console.log(`✅ AI 技能就绪：${expectedSkills.join("、")}（.agents/skills/）`);
}
