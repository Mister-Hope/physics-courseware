import { execSync } from "node:child_process";
import { existsSync, cpSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");
const DIST = path.join(ROOT, "dist");
/* ── 1. 构建入口网站 ── */
console.log("\n📦 构建入口网站 ...");
execSync("pnpm build", { cwd: ROOT, stdio: "inherit" });

/* ── 2. 遍历 courses/，逐个构建 ── */
const entries = readdirSync(COURSES_DIR, { withFileTypes: true });
const courseDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

if (courseDirs.length === 0) {
  console.log("⚠️  未找到任何课件目录");
} else {
  for (const name of courseDirs) {
    const coursePath = path.join(COURSES_DIR, name);
    const pkgJsonPath = path.join(coursePath, "package.json");

    if (!existsSync(pkgJsonPath)) {
      console.log(`⏭️  跳过 ${name}：无 package.json`);
      continue;
    }

    console.log(`\n📦 构建课件: ${name} ...`);
    execSync("pnpm build", { cwd: coursePath, stdio: "inherit" });

    const srcDist = path.join(coursePath, "dist");
    const destDist = path.join(DIST, name);

    if (existsSync(srcDist)) {
      if (existsSync(destDist)) rmSync(destDist, { recursive: true });
      cpSync(srcDist, destDist, { recursive: true });
      console.log(`   ✅ 已复制到 dist/${name}/`);
    } else {
      console.log(`   ⚠️  未找到构建产物 ${srcDist}`);
    }
  }
}

console.log(`\n✨ 全部完成！输出目录: ${DIST}\n`);
