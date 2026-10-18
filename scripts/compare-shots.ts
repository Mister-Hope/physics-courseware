import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { chromium } from "@playwright/test";

// 本脚本的产物目录（`courses/<课件>/.temp/compare/` 等）由操作名自动派生，见 e2e/artifacts.ts
process.env.E2E_OPERATION ??= "compare";

/**
 * `pnpm compare:shots` —— 把「改动前（HEAD）」与「改动后（工作区）」的每一页拼成左右对比大图。
 *
 * 做法（逐门课）：
 *
 * 1. `git stash push -u -- courses/<slug>` 把该课的改动挪走（工作区回到 HEAD）；
 * 2. `pnpm shots` 全页截「旧图」→ `<课>/.temp/compare/<slug>/old/`；
 * 3. `git stash pop` 还原改动；4. 再截一次「新图」；
 * 4. 用 Playwright 把 旧|新 逐页拼成一张大图 → `<课>/.temp/compare/<slug>/compare*.png`。
 *
 * 用法： pnpm compare:shots # 自动取"工作区相对 HEAD 有改动"的所有课件 pnpm compare:shots 4.4-unit-system # 指定课件（可写多门）
 * pnpm compare:shots --keep # 保留逐页小图（默认保留，--clean 才删）
 *
 * ⚠️ 会临时 stash 指定课件；**不要在子代理正在写这些课件时跑**。跑完会校验工作区已还原。
 */

const ROOT = path.resolve(import.meta.dirname, "..");
/** 每张对比图最多放多少页（Chromium 全页截图上限约 16384px） */
const MAX_ROWS_PER_IMAGE = 30;
const PANE_WIDTH = 700;
const GAP = 12;

const args = process.argv.slice(2);
const flag = (name: string): string | undefined =>
  args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
const hasFlag = (name: string): boolean => args.includes(`--${name}`);

const explicit = args.filter((arg) => !arg.startsWith("-"));

const git = (gitArgs: string[]): string =>
  execFileSync("git", gitArgs, { cwd: ROOT, encoding: "utf8" });

// 截图文件 → `data:image/png;base64,…`（拼对比 HTML 用）
const encode = (file: string): string =>
  `data:image/png;base64,${readFileSync(file).toString("base64")}`;

/**
 * 工作区（含暂存区）相对 HEAD 有改动的课件
 *
 * @returns 有改动的课件目录名（去重后按字典序）
 */
const changedCourses = (): string[] => {
  const output = git(["status", "--porcelain", "--", "courses"]);
  const slugs = output
    .split("\n")
    .map((line) => line.slice(3).trim())
    .filter(Boolean)
    .map((file) => file.split("/")[1] ?? "")
    .filter(Boolean);

  return [...new Set(slugs)].sort();
};

interface PagePair {
  no: number;
  oldFile: string;
  newFile: string;
}

/** 总览图里挑出来的一页：属于哪门课、旧/新截图、差异比例 */
interface OverviewPick {
  slug: string;
  pair: PagePair;
  ratio: number;
}

const parsePageNo = (file: string): number => {
  const base = path.basename(file);

  return Number(
    /^p(?<no>\d+)/u.exec(base)?.groups?.no ?? /^(?<no>\d+)\.png$/u.exec(base)?.groups?.no ?? 0,
  );
};
const parseClicks = (file: string): number =>
  Number(/-c(?<clicks>\d+)\.png$/u.exec(path.basename(file))?.groups?.clicks ?? 0);

/**
 * 每页取**点击数最大**的那张（= 全部展开）；同一页拍了多步时不会被 c0 覆盖
 *
 * @param directory 一页一个 PNG 的目录
 * @returns 页码 → 该页"点击数最大"的那张图的路径
 */
const readPages = (directory: string): Map<number, string> => {
  const result = new Map<number, string>();
  const clickCounts = new Map<number, number>();

  if (!existsSync(directory)) return result;

  for (const name of readdirSync(directory).filter((item) => item.endsWith(".png"))) {
    const no = parsePageNo(name);
    const step = parseClicks(name);

    if ((clickCounts.get(no) ?? -1) > step) continue;

    clickCounts.set(no, step);
    result.set(no, path.join(directory, name));
  }

  return result;
};

// 同一页的旧 / 新截图配对（以旧图为准，新图缺页的跳过），按页号排序
const pairPages = (oldPages: Map<number, string>, newPages: Map<number, string>): PagePair[] =>
  [...oldPages.entries()]
    .flatMap(([no, oldFile]) => {
      const newFile = newPages.get(no);

      return newFile ? [{ no, oldFile, newFile }] : [];
    })
    .sort((a, b) => a.no - b.no);

/**
 * 用 **Slidev 官方导出**跑一次全页 PNG。
 *
 * 官方导出的默认行为正是我们要的：**每页导出"点击到最后一步"的最终状态**（只有加 `--with-clicks` 才是每步一页）， 落地文件名为 `1.png` / `2.png`…，分辨率
 * 1960×1104（2 倍）。不再自己驱动浏览器截图。
 *
 * @param slug 课件目录名
 * @param artifactDir 导出落地的目录（会被清空重建）
 */
const shoot = (slug: string, artifactDir: string): void => {
  rmSync(artifactDir, { recursive: true, force: true });
  mkdirSync(artifactDir, { recursive: true });

  const pkg = JSON.parse(
    readFileSync(path.join(ROOT, "courses", slug, "package.json"), "utf8"),
  ) as { name: string };

  const run = (): void => {
    execFileSync(
      "pnpm",
      [
        "--filter",
        pkg.name,
        "exec",
        "slidev",
        "export",
        "--format",
        "png",
        "--wait",
        "500",
        "--timeout",
        "240000",
        "--output",
        artifactDir,
      ],
      { cwd: ROOT, stdio: "inherit" },
    );
  };

  console.log(`\n📸 导出 ${slug} → ${path.relative(ROOT, artifactDir)}`);

  try {
    run();
  } catch (err) {
    // 机器忙的时候单页渲染偶发超时：清掉半成品重试一次，仍失败才抛
    console.warn(`⚠️  ${slug}：导出失败，10 秒后重试一次`);
    execFileSync("sleep", ["10"], { cwd: ROOT });
    rmSync(artifactDir, { recursive: true, force: true });
    mkdirSync(artifactDir, { recursive: true });

    try {
      run();
    } catch {
      throw err;
    }
  }
};

const rowHtml = ({ no, oldFile, newFile }: PagePair): string => `<section class="row">
  <div class="page-no">第 ${no} 页</div>
  <div class="panes">
    <figure><figcaption class="old">旧 · HEAD</figcaption><img src="${encode(oldFile)}" /></figure>
    <figure><figcaption class="new">新 · 工作区</figcaption><img src="${encode(newFile)}" /></figure>
  </div>
</section>`;

// 总览图里的一行：课名 + 页号 + 差异比例 + 旧 / 新截图
const overviewRow = ({ slug, pair, ratio }: OverviewPick): string => `<section class="row">
  <div class="page-no">${slug} · 第 ${pair.no} 页 <span class="ratio">差异 ${(ratio * 100).toFixed(1)}%</span></div>
  <div class="panes">
    <figure><figcaption class="old">旧 · HEAD</figcaption><img src="${encode(pair.oldFile)}" /></figure>
    <figure><figcaption class="new">新 · 工作区</figcaption><img src="${encode(pair.newFile)}" /></figure>
  </div>
</section>`;

const pageHtml = (slug: string, pairs: PagePair[], index: number, total: number): string => {
  const title = total > 1 ? `${slug}（第 ${index + 1}/${total} 张）` : slug;

  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8" /><title>${title}</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: ${GAP}px; background: #0b1020; color: #e2e8f0;
    font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; }
  h1 { margin: 0 0 4px; font-size: 26px; }
  .hint { margin: 0 0 ${GAP}px; font-size: 15px; color: #94a3b8; }
  .row { margin-bottom: ${GAP}px; }
  .page-no { font-size: 17px; font-weight: 700; color: #e2a846; margin: 0 0 4px; }
  .panes { display: grid; grid-template-columns: ${PANE_WIDTH}px ${PANE_WIDTH}px; gap: ${GAP}px; }
  figure { margin: 0; }
  figcaption { font-size: 14px; padding: 2px 6px; border-radius: 6px 6px 0 0; }
  figcaption.old { background: #334155; color: #cbd5e1; }
  figcaption.new { background: #1d4ed8; color: #e0e7ff; }
  img { display: block; width: ${PANE_WIDTH}px; height: auto; border: 1px solid #1e293b; }
</style></head>
<body>
<h1>${title}</h1>
${pairs.map((pair) => rowHtml(pair)).join("\n")}
</body></html>`;
};

const writeComparison = async (
  slug: string,
  outDir: string,
  pairs: PagePair[],
): Promise<string[]> => {
  const chunks: PagePair[][] = [];

  for (let index = 0; index < pairs.length; index += MAX_ROWS_PER_IMAGE)
    chunks.push(pairs.slice(index, index + MAX_ROWS_PER_IMAGE));

  const browser = await chromium.launch();
  const outputs: string[] = [];

  try {
    for (const [index, chunk] of chunks.entries()) {
      const page = await browser.newPage({
        viewport: { width: PANE_WIDTH * 2 + GAP * 3, height: 800 },
        deviceScaleFactor: 1,
      });

      await page.setContent(pageHtml(slug, chunk, index, chunks.length), { waitUntil: "load" });

      const height = await page.evaluate(() => document.body.scrollHeight);
      const file = path.join(
        outDir,
        chunks.length > 1 ? `compare-${index + 1}.png` : "compare.png",
      );

      await page.screenshot({ path: file, fullPage: true });
      await page.close();
      outputs.push(file);
      console.log(`🖼️  ${path.relative(ROOT, file)}（${PANE_WIDTH * 2 + GAP * 3} × ${height}）`);
    }
  } finally {
    await browser.close();
  }

  return outputs;
};

/**
 * 逐页算"旧/新差异比例"（缩到 320×180 用 canvas 比，避免整页逐像素太重）
 *
 * @param browser 已启动的 Chromium 实例（全页复用，不逐页开进程）
 * @param pairs 同一页的旧 / 新截图
 * @returns 页码 → 变化像素占比
 */
const diffRatios = async (
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  pairs: PagePair[],
): Promise<Map<number, number>> => {
  const page = await browser.newPage({ viewport: { width: 320, height: 180 } });
  const result = new Map<number, number>();

  try {
    for (const pair of pairs) {
      const ratio = await page.evaluate(
        async ([oldSrc, newSrc]) => {
          // 图片加载必须写在 evaluate 回调内部：整个回调会被序列化到浏览器里执行，引用不到 Node 侧的函数
          const [oldImage, newImage] = await Promise.all([
            new Promise<HTMLImageElement>((resolve) => {
              const image = new Image();

              image.addEventListener("load", () => {
                resolve(image);
              });
              image.src = oldSrc ?? "";
            }),
            new Promise<HTMLImageElement>((resolve) => {
              const image = new Image();

              image.addEventListener("load", () => {
                resolve(image);
              });
              image.src = newSrc ?? "";
            }),
          ]);
          const width = 320;
          const height = 180;
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");

          if (!context) throw new Error("拿不到 canvas 2d 上下文");
          const grab = (image: HTMLImageElement): Uint8ClampedArray => {
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            return context.getImageData(0, 0, width, height).data;
          };
          const oldData = grab(oldImage);
          const newData = grab(newImage);
          let changed = 0;

          for (let index = 0; index < oldData.length; index += 4) {
            if (
              Math.abs(oldData[index] - newData[index]) +
                Math.abs(oldData[index + 1] - newData[index + 1]) +
                Math.abs(oldData[index + 2] - newData[index + 2]) >
              24
            )
              changed += 1;
          }

          return changed / (width * height);
        },
        [encode(pair.oldFile), encode(pair.newFile)],
      );

      result.set(pair.no, ratio);
    }
  } finally {
    await page.close();
  }

  return result;
};

/**
 * 总览图：每门课取"变化最大"的几页，全部课程合成一张大图
 *
 * @param slugs 要汇总的课件目录名
 */
const buildOverview = async (slugs: string[]): Promise<void> => {
  const perCourse = Number(flag("pages") ?? 3);
  const paneWidth = 480;
  const browser = await chromium.launch();
  const picks: OverviewPick[] = [];

  try {
    for (const slug of slugs) {
      const outDir = path.join(ROOT, "courses", slug, ".temp", "compare");
      const oldPages = readPages(path.join(outDir, "old"));
      const newPages = readPages(path.join(outDir, "new"));
      const pairs = pairPages(oldPages, newPages);

      if (pairs.length === 0) {
        console.warn(`⚠️  ${slug}：没有旧/新截图，先跑一次不带 --overview 的对比`);
        continue;
      }

      const ratios = await diffRatios(browser, pairs);
      const top = [...pairs]
        .sort((a, b) => (ratios.get(b.no) ?? 0) - (ratios.get(a.no) ?? 0))
        .slice(0, perCourse)
        .sort((a, b) => a.no - b.no);

      for (const pair of top) picks.push({ slug, pair, ratio: ratios.get(pair.no) ?? 0 });

      console.log(
        `📊 ${slug}：${top.map((pair) => `p${pair.no}(${((ratios.get(pair.no) ?? 0) * 100).toFixed(1)}%)`).join(" ")}`,
      );
    }
  } finally {
    await browser.close();
  }

  if (picks.length === 0) return;

  const chunks: (typeof picks)[] = [];

  for (let index = 0; index < picks.length; index += 40)
    chunks.push(picks.slice(index, index + 40));

  const outDir = path.join(ROOT, ".e2e", "compare-overview");

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const stitcher = await chromium.launch();

  try {
    for (const [index, chunk] of chunks.entries()) {
      const page = await stitcher.newPage({
        viewport: { width: paneWidth * 2 + GAP * 3, height: 800 },
        deviceScaleFactor: 1,
      });

      const body = chunk.map((pick) => overviewRow(pick)).join("\n");

      const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8" /><title>风格统一对比总览</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: ${GAP}px; background: #0b1020; color: #e2e8f0;
    font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; }
  h1 { margin: 0 0 4px; font-size: 26px; }
  .hint { margin: 0 0 ${GAP}px; font-size: 15px; color: #94a3b8; }
  .row { margin-bottom: ${GAP}px; }
  .page-no { font-size: 16px; font-weight: 700; color: #e2a846; margin: 0 0 3px; }
  .ratio { color: #64748b; font-weight: 400; }
  .panes { display: grid; grid-template-columns: ${paneWidth}px ${paneWidth}px; gap: ${GAP}px; }
  figure { margin: 0; }
  figcaption { font-size: 13px; padding: 2px 6px; border-radius: 6px 6px 0 0; }
  figcaption.old { background: #334155; color: #cbd5e1; }
  figcaption.new { background: #1d4ed8; color: #e0e7ff; }
  img { display: block; width: ${paneWidth}px; height: auto; border: 1px solid #1e293b; }
</style></head>
<body>
<h1>风格统一 · 旧/新对比总览${chunks.length > 1 ? `（第 ${index + 1}/${chunks.length} 张）` : ""}</h1>
<p class="hint">每门课取变化最大的 ${perCourse} 页（全部展开态）</p>
${body}
</body></html>`;

      await page.setContent(html, { waitUntil: "load" });
      const height = await page.evaluate(() => document.body.scrollHeight);
      const file = path.join(
        outDir,
        chunks.length > 1 ? `overview-${index + 1}.png` : "overview.png",
      );

      await page.screenshot({ path: file, fullPage: true });
      await page.close();
      console.log(`🖼️  ${path.relative(ROOT, file)}（${paneWidth * 2 + GAP * 3} × ${height}）`);
    }
  } finally {
    await stitcher.close();
  }
};

const main = async (): Promise<void> => {
  const slugs = explicit.length > 0 ? explicit : changedCourses();

  if (slugs.length === 0) {
    console.log("没有需要对比的课件（工作区相对 HEAD 无改动）。");
    return;
  }

  if (hasFlag("overview")) {
    await buildOverview(slugs);
    return;
  }

  console.log(`对比课件（${slugs.length}）：${slugs.join("、")}`);

  const allOutputs: string[] = [];
  const failed: string[] = [];

  for (const slug of slugs) {
    try {
      const coursePrefix = `courses/${slug}`;
      const outDir = path.join(ROOT, coursePrefix, ".temp", "compare");
      const patchFile = path.join(outDir, "worktree.patch");
      const stagedBefore = git(["diff", "--cached", "--name-only", "--", coursePrefix])
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      rmSync(outDir, { recursive: true, force: true });
      mkdirSync(outDir, { recursive: true });

      // ── 旧图：不使用 `git stash`（曾因并发的 `git add` 导致 pop 失败），改成"打补丁 → 回退 → 打回来"。
      // 1) 全部暂存（新文件也进 patch），2) 取出 worktree 相对 HEAD 的完整 patch，3) 回退到 HEAD。
      git(["add", "-A", "--", coursePrefix]);
      const patch = git(["diff", "--cached", "--binary", "--", coursePrefix]);
      const addedFiles = git([
        "diff",
        "--cached",
        "--name-only",
        "--diff-filter=A",
        "--",
        coursePrefix,
      ])
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      writeFileSync(patchFile, patch);

      /** 回退到 HEAD —— **旧图必须渲染 HEAD 的内容**。 （曾漏掉这一步：旧图直接用当前工作区导出，结果旧图 = 新图。） */
      const reverted = (): void => {
        execFileSync("git", ["checkout", "HEAD", "--", coursePrefix], { cwd: ROOT });

        for (const file of addedFiles) rmSync(path.join(ROOT, file), { force: true });

        // 断言：此刻该课相对 HEAD 必须零差异，否则旧图必然失真
        const dirty = git(["status", "--porcelain", "--", coursePrefix]).trim();

        if (dirty !== "")
          throw new Error(`✗ ${slug}：回退到 HEAD 后仍有改动，旧图会失真：\n${dirty}`);
      };

      const restored = (): void => {
        execFileSync("git", ["checkout", "HEAD", "--", coursePrefix], { cwd: ROOT });

        for (const file of addedFiles) rmSync(path.join(ROOT, file), { force: true });

        execFileSync("git", ["apply", "--whitespace=nowarn", patchFile], { cwd: ROOT });
        execFileSync("git", ["add", "-A", "--", coursePrefix], { cwd: ROOT });

        // 自检：打回来的内容必须与 patch 逐字节一致，否则立刻报错并保留 patch 文件
        const after = git(["diff", "--cached", "--binary", "--", coursePrefix]);
        const before = readFileSync(patchFile, "utf8");

        if (after !== before) {
          throw new Error(
            `✗ ${slug}：还原后与 patch 不一致！改动**没有**丢——patch 在 ${patchFile}，` +
              `用 \`git apply ${path.relative(ROOT, patchFile)}\` 手工恢复。`,
          );
        }
      };

      try {
        reverted();
        shoot(slug, path.join(outDir, "old"));
      } finally {
        restored();
      }

      if (stagedBefore.length === 0)
        execFileSync("git", ["reset", "--quiet", "--", coursePrefix], { cwd: ROOT });

      // 新图：工作区当前状态
      shoot(slug, path.join(outDir, "new"));

      const oldPages = readPages(path.join(outDir, "old"));
      const newPages = readPages(path.join(outDir, "new"));
      const pairs = pairPages(oldPages, newPages);

      if (pairs.length === 0) {
        console.error(`✗ ${slug}：没配到任何页（旧 ${oldPages.size} 张 / 新 ${newPages.size} 张）`);
        continue;
      }

      const missing = [...newPages.keys()].filter((no) => !oldPages.has(no));

      if (missing.length > 0) console.warn(`⚠️  ${slug}：新图多出页 ${missing.join("、")}`);

      allOutputs.push(...(await writeComparison(slug, outDir, pairs)));
    } catch (err) {
      // 单门失败（导出超时等）不中断整批：记下来，最后统一汇报
      failed.push(slug);
      console.error(`✗ ${slug}：${(err as Error).message.split("\n")[0]}`);
    }
  }

  if (failed.length > 0) console.error(`\n⚠️ 这些课件没出图（可单独重跑）：${failed.join("、")}`);

  console.log("\n=== 对比图 ===");

  for (const file of allOutputs) console.log(file);

  const indexPath = path.join(ROOT, ".e2e", "compare-shots.json");

  mkdirSync(path.dirname(indexPath), { recursive: true });
  writeFileSync(
    indexPath,
    `${JSON.stringify(
      allOutputs.map((file) => path.relative(ROOT, file)),
      null,
      2,
    )}\n`,
  );
};

await main();
