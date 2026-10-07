// 离线自检 AI 技能：确认 .agents/skills/ 里的技能正本还在（`pnpm install` 的 postinstall 会跑）。
//
// 为什么需要：`.agents/skills/` 是本仓库唯一入库的技能目录（见 AGENTS.md「维护约定」）。
// - DSH 的技能扫描表：<项目根>/.dsh/skills（rank 100）→ <项目根>/.agents/skills（rank 200）
//   → 用户级目录；**不读 `.claude/skills`**。
// - `.claude/skills/<name>` 只是给 Claude Code 的软链、指向 `.agents/skills/<name>`；
//   正本不在时它就是断链，两边都用不了（这正是 slidev 技能一度失效的根因）。
//
// 正本入库后本该永远存在，缺了多半是本地误删 / 被重新加回 .gitignore；这里直接拦住并给出恢复命令。

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/** 仓库根目录（本文件在 scripts/ 下） */
const ROOT_DIR = path.join(import.meta.dirname, "..");
const LOCK_PATH = path.join(ROOT_DIR, "skills-lock.json");
const SKILLS_DIR = path.join(ROOT_DIR, ".agents", "skills");

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

  if (!existsSync(SKILLS_DIR)) return [];

  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
};

const expectedSkills = readExpectedSkills();
const missingSkills = expectedSkills.filter(
  (name) => !existsSync(path.join(SKILLS_DIR, name, "SKILL.md")),
);

if (missingSkills.length > 0) {
  console.error(
    `❌ AI 技能缺失：${missingSkills.join("、")}（应存在 .agents/skills/<name>/SKILL.md）`,
  );
  console.error(
    "   .agents/skills/ 与 skills-lock.json 已入库，通常是本地误删或误加回 .gitignore。",
  );
  console.error(
    "   恢复：pnpm skills:restore（需联网），或 git checkout -- .agents skills-lock.json",
  );
  process.exitCode = 1;
} else if (expectedSkills.length === 0) {
  console.warn("⚠️  未发现任何 AI 技能（skills-lock.json 为空且 .agents/skills 不存在），跳过自检");
} else {
  console.log(`✅ AI 技能就绪：${expectedSkills.join("、")}（.agents/skills/）`);
}
