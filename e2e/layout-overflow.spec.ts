import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

import { layoutReportDir } from "./artifacts";
import { listCourses } from "./courses";
import {
  buildJsonReport,
  buildMarkdownReport,
  collectBlockFitSlides,
  collectBlockFitViolations,
  collectWhitespaceHotspots,
  formatDirections,
  renderBlockFitFailureMessage,
  renderConsoleSummary,
  renderFailureMessage,
  renderStabilityFailureMessage,
  renderWhitespaceFailureMessage,
  type BlockFitStepResult,
  type CheckResult,
  type CourseResult,
  type ReportMeta,
} from "./report";
import {
  BLOCK_IGNORE,
  BLOCK_TOLERANCE,
  STABILITY_TOLERANCE,
  STRICT_BLOCK_FIT,
  STRICT_STABILITY,
  STRICT_WHITESPACE,
  STABILITY_IGNORE,
  TOLERANCE,
  VIEWPORT,
  WHITESPACE_TOLERANCE,
  annotateViolations,
  captureSlide,
  clearAnnotations,
  gotoSlide,
  gotoSlideStep,
  measureGlobalLayers,
  measureSlide,
  openDeck,
  readClicksTotal,
  readDeckSlides,
  settle,
  snapshotSlide,
} from "./slidev-driver";
import {
  collectStabilitySlides,
  collectStabilityViolations,
  compareStepSnapshots,
  maxStabilityShift,
  type StabilityStepResult,
} from "./stability-scan";

const REPORT_DIR = layoutReportDir();
const SCREENSHOT_DIR = join(REPORT_DIR, "screenshots");
/** 传一个大于任何一页总点击数的值即可展开全部逐条呈现 */
const ALL_CLICKS = 999;

/** 只检查指定页（迭代时省时间）：`E2E_PAGES="14,15-17"`。 不设置时检查全部页面；支持逗号分隔的单页与 `起-止` 区间。 */
function parsePageFilter(raw: string | undefined): Set<number> | null {
  if (!raw) return null;

  const pages = new Set<number>();

  for (const part of raw.split(",")) {
    const token = part.trim();
    if (!token) continue;

    const range = /^(\d+)\s*[-~]\s*(\d+)$/.exec(token);

    if (range) {
      const from = Number(range[1]);
      const to = Number(range[2]);

      for (let page = from; page <= to; page += 1) pages.add(page);
    } else if (/^\d+$/.test(token)) {
      pages.add(Number(token));
    }
  }

  return pages.size > 0 ? pages : null;
}

const PAGE_FILTER = parsePageFilter(process.env.E2E_PAGES);

const STATES = [
  { label: "初始态", clicks: 0, suffix: "rest" },
  { label: "全部展开", clicks: ALL_CLICKS, suffix: "all" },
] as const;

/** 汇总给合并报告用（同文件、单 worker，因此顺序收集是安全的） */
const collected: CourseResult[] = [];

const META: ReportMeta = {
  generatedAt: new Date().toISOString(),
  viewport: VIEWPORT,
  tolerance: TOLERANCE,
  whitespaceTolerance: WHITESPACE_TOLERANCE,
  stabilityTolerance: STABILITY_TOLERANCE,
  blockTolerance: BLOCK_TOLERANCE,
};

/**
 * 每一页幻灯片都在 16:9 画面内。
 *
 * 判定：元素「被祖先 overflow 裁剪后的可见矩形」超出 `#slide-content`（980×552 逻辑画布）即算溢出。 每页检查两个状态（未点击 / 全部展开），因为
 * v-click 展开后布局会变化。
 *
 * 同时测量**页面底部留白**（留白 = 552 − 内容底部）：全绿只说明"没溢出"，但内容全挤在上半页、 下半页一片空白同样是教学问题（字号 /
 * 行距本可以更大）。留白只报告、默认不让测试失败， 相关环境变量：
 *
 * - `E2E_WHITESPACE_TOLERANCE`：留白阈值（逻辑像素），默认 **150**；超过就在报告里列为"留白偏大"
 * - `E2E_STRICT_WHITESPACE=1`：打开后留白超阈值会让测试失败（失败信息里列出具体页面）。 默认关闭，因为其它课件本来可能就有大留白，直接 fail 会把 CI 弄红
 *
 * 还检查**点击过程的布局稳定性**：从第 0 步逐步点到 `clicksTotal`，相邻两步之间取"两步都可见"的元素按 稳定标识配对，位置差超过容差即算"已可见元素被顶跑"（元素出现 /
 * 消失不算违例）。相关环境变量：
 *
 * - `E2E_STABILITY_TOLERANCE`：位移阈值（逻辑像素），默认 **1**
 * - `E2E_STRICT_STABILITY=1`：打开后出现位移会让测试失败。默认只警告（别的课件可能还在用 `v-if` 分步）
 * - `E2E_STABILITY_IGNORE`：逗号分隔的 CSS 选择器白名单（手风琴式有意位移的段落），命中只记录不判违例
 *
 * 同一个步进循环里还检查**正文是否越出 `.page-grow` 的可用区域**：每页正文包在 `.page-grow`（`flex:1` +
 * `justify-content:center`）里，正文总高超过它的可用高度时，内容会**上顶出容器叠到页面标题上、下超出下边界被裁掉**。 这既不是越出 980×552
 * 画布（溢出检查不报），也不是点击位移（稳定性检查不报），底部留白反而很小（留白检查也不报）， 所以单独量一次：可见内容元素的可见矩形与 `.page-grow` 的 padding box
 * 求交，顶出 / 超出超过容差记一次越界。相关环境变量：
 *
 * - `E2E_BLOCK_TOLERANCE`：越界阈值（逻辑像素），默认 **1**
 * - `E2E_STRICT_BLOCK_FIT=1`：打开后正文越界会让测试失败。默认只警告
 * - `E2E_BLOCK_IGNORE`：逗号分隔的 CSS 选择器白名单（有意做出血效果的元素），命中只记录不判违例
 *
 * 迭代时只检查某几页：`E2E_PAGES="14,15-17" E2E_COURSE=<slug> pnpm exec playwright test
 * e2e/layout-overflow.spec.ts` （不设置则检查全部页面；报告只包含被检查的页）。迭代阶段别每次跑全量，收尾验收时再跑完整一遍。
 *
 * 产出物（给 agent 定位布局问题）——单课件运行时写在 `courses/<课件>/.temp/layout-overflow/`， 一次跑多个课件时退回
 * `e2e/reports/layout-overflow/`（规则见 `e2e/artifacts.ts`）：
 *
 * - `<课件>.md` / `layout-overflow.md`：逐页列出溢出元素、方向、像素、文案、选择器， 「留白偏大的页面」「点击过程中位移的元素」「正文越出可用区域」三节
 * - `*.json`：机器可读的完整测量数据（每个「页面 × 状态」带 `whitespace`，每个「页 × 步」带 `stability` 与 `blockFit`）
 * - `screenshots/*.png`：溢出页截图，红框标出溢出元素
 */
// 报告目录与 `collected` 是文件级共享状态，必须串行执行（也防止 `--workers=2` 覆盖配置后并发写坏报告）
test.describe.configure({ mode: "serial" });

/** 每轮从干净的报告目录开始：既避免旧截图残留，也避免 E2E_COURSE 过滤跑后读到别的课件的过期报告 */
test.beforeAll(() => {
  rmSync(REPORT_DIR, { recursive: true, force: true });
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

for (const course of listCourses()) {
  test(`课件「${course.slug}」每一页都不超出 16:9 画面`, async ({ context }, testInfo) => {
    const page = await context.newPage();

    try {
      await openDeck(page, course.baseURL);

      const slides = await readDeckSlides(page);

      expect(slides.length, `${course.slug} 未读到任何幻灯片`).toBeGreaterThan(0);

      const checks: CheckResult[] = [];

      const targetSlides = PAGE_FILTER
        ? slides.filter((slide) => PAGE_FILTER.has(slide.no))
        : slides;

      for (const slide of targetSlides) {
        for (const state of STATES) {
          await gotoSlide(page, slide.no, state.clicks);

          const measured = await measureSlide(page, {
            no: slide.no,
            title: slide.title,
            state: state.label,
            clicks: state.clicks,
            // 正文越界白名单（与步进测量同一套，避免"初始态/全部展开"与中间步口径不一致）
            blockIgnoreSelectors: BLOCK_IGNORE,
          });

          // 页面根本没渲染出来（或整页 display:none）时不能当"没有溢出"放过
          expect(
            measured.canvas.width,
            `第 ${slide.no} 页（${state.label}）没有渲染出幻灯片根节点`,
          ).toBeGreaterThan(0);
          expect(
            measured.scanned,
            `第 ${slide.no} 页（${state.label}）没有任何元素参与测量，页面可能没渲染出来`,
          ).toBeGreaterThan(0);

          const check: CheckResult = {
            slide: slide.no,
            title: measured.title || slide.title || `第 ${slide.no} 页`,
            state: state.label,
            clicks: measured.clicks,
            scanned: measured.scanned,
            renderError: measured.renderError,
            violations: measured.violations,
            whitespace: measured.whitespace,
            blockFit: measured.blockFit,
          };

          if (measured.violations.length > 0) {
            check.screenshot = `screenshots/${course.slug}-p${slide.no}-${state.suffix}.png`;

            // 截图前把「根因」元素红框标出来，一眼能看出是哪个块越界
            await annotateViolations(
              page,
              `.slidev-page[data-slidev-no="${slide.no}"]`,
              measured.violations
                .filter((violation) => violation.outermost)
                .map((violation) => ({
                  ...violation,
                  label: `超出 ${formatDirections(violation)}`,
                })),
            );
            await captureSlide(page, join(REPORT_DIR, check.screenshot));
            await clearAnnotations(page);
          }

          checks.push(check);
        }
      }

      // ── 点击稳定性：从第 0 步逐步点到 clicksTotal，量"上一步已可见的元素是否被顶跑" ──
      // 同一轮步进里顺带收集**正文越界**（正文是否顶出 / 超出 `.page-grow` 的可用区域），不额外多跑一遍页面
      // 渲染失败的页面（Slidev 错误占位页）不参与：它已经单独让测试失败了，量出来的位移没有意义
      const brokenSlides = new Set(
        checks.filter((check) => check.renderError).map((check) => check.slide),
      );
      const stability: StabilityStepResult[] = [];
      const blockFitSteps: BlockFitStepResult[] = [];

      for (const slide of targetSlides) {
        if (brokenSlides.has(slide.no)) continue;

        // 中间步不能用 gotoSlide（它会一直等"全部展开"），必须用 gotoSlideStep
        await gotoSlideStep(page, slide.no, 0);

        const clicksTotal = await readClicksTotal(page);
        let previous = await snapshotSlide(page, {
          no: slide.no,
          title: slide.title,
          clicks: 0,
          ignoreSelectors: STABILITY_IGNORE,
        });

        blockFitSteps.push({
          slide: slide.no,
          title: slide.title,
          step: 0,
          blockFit: previous.blockFit,
        });

        for (let step = 1; step <= clicksTotal; step += 1) {
          await gotoSlideStep(page, slide.no, step);

          const current = await snapshotSlide(page, {
            no: slide.no,
            title: slide.title,
            clicks: step,
            ignoreSelectors: STABILITY_IGNORE,
          });

          stability.push(
            compareStepSnapshots(previous.elements ?? [], current.elements ?? [], {
              slide: slide.no,
              title: slide.title,
              from: step - 1,
              to: step,
              tolerance: STABILITY_TOLERANCE,
            }),
          );

          blockFitSteps.push({
            slide: slide.no,
            title: slide.title,
            step,
            blockFit: current.blockFit,
          });

          previous = current;
        }
      }

      await gotoSlide(page, 1, 0);
      await settle(page);

      const result: CourseResult = {
        slug: course.slug,
        baseURL: course.baseURL,
        totalSlides: slides.length,
        checks,
        globals: await measureGlobalLayers(page),
        stability,
        blockFitSteps,
      };

      collected.push(result);

      const courseMarkdown = buildMarkdownReport([result], META);
      const courseJson = buildJsonReport([result], META);

      writeFileSync(join(REPORT_DIR, `${course.slug}.md`), courseMarkdown);
      writeFileSync(join(REPORT_DIR, `${course.slug}.json`), courseJson);
      await testInfo.attach(`${course.slug}.md`, {
        body: courseMarkdown,
        contentType: "text/markdown",
      });
      await testInfo.attach(`${course.slug}.json`, {
        body: courseJson,
        contentType: "application/json",
      });

      console.log(
        renderConsoleSummary(result, WHITESPACE_TOLERANCE, STABILITY_TOLERANCE, BLOCK_TOLERANCE),
      );

      const violationCount =
        checks.reduce((sum, check) => sum + check.violations.length, 0) +
        result.globals.reduce((sum, layer) => sum + layer.violations.length, 0);
      const renderErrorCount = checks.filter((check) => check.renderError).length;

      // 渲染失败比溢出更严重：内容根本没渲染出来，"没有溢出"不作数
      expect(renderErrorCount, renderFailureMessage([result])).toBe(0);
      expect(violationCount, renderFailureMessage([result])).toBe(0);

      // 底部留白默认只报告（其它课件本来可能就有大留白），只有显式打开严格开关才让它失败
      if (STRICT_WHITESPACE) {
        const hotspots = collectWhitespaceHotspots([result], WHITESPACE_TOLERANCE);

        expect(
          hotspots.length,
          renderWhitespaceFailureMessage([result], WHITESPACE_TOLERANCE),
        ).toBe(0);
      }

      // 点击位移同理：默认只警告（其它课件可能还在用 v-if 分步），打开严格开关才失败
      const stabilityOffenders = collectStabilityViolations(stability);
      const shiftedSlides = collectStabilitySlides(stability);

      if (stabilityOffenders.length > 0) {
        const summary = `${course.slug}：${shiftedSlides.length} 页（第 ${shiftedSlides.join("、")} 页）共 ${stabilityOffenders.length} 步存在点击位移，最大 ${maxStabilityShift(stability)}px`;

        // 报告里标出来（Playwright 的 HTML / list 报告都能看到），终端也提示一句
        testInfo.annotations.push({ type: "点击位移", description: summary });

        if (!STRICT_STABILITY) console.warn(`   ⚠️ 点击时已可见元素被顶跑（仅警告）—— ${summary}`);
      }

      if (STRICT_STABILITY)
        expect(
          stabilityOffenders.length,
          renderStabilityFailureMessage([result], STABILITY_TOLERANCE),
        ).toBe(0);

      // 正文越出 `.page-grow` 可用区域：默认只警告（其它课件的内容容器口径未统一），打开严格开关才失败
      const blockOffenders = collectBlockFitViolations([result]);
      const blockSlides = collectBlockFitSlides(result);
      const blockIgnoredCount = result.blockFitSteps.reduce(
        (sum, step) => sum + step.blockFit.ignoredCount,
        0,
      );

      if (blockOffenders.length > 0) {
        const summary = `${course.slug}：${blockSlides.length} 页（第 ${blockSlides.join("、")} 页）共 ${blockOffenders.length} 步正文越出 .page-grow 可用区域（共检查 ${result.blockFitSteps.length} 个「页 × 步」${blockIgnoredCount ? `，另有 ${blockIgnoredCount} 个元素命中白名单已忽略` : ""}）`;

        // 报告里标出来（Playwright 的 HTML / list 报告都能看到），终端也提示一句
        testInfo.annotations.push({ type: "正文越界", description: summary });

        if (!STRICT_BLOCK_FIT)
          console.warn(`   ⚠️ 正文越出 .page-grow 可用区域（仅警告）—— ${summary}`);
      }

      if (STRICT_BLOCK_FIT)
        expect(blockOffenders.length, renderBlockFitFailureMessage([result], BLOCK_TOLERANCE)).toBe(
          0,
        );
    } finally {
      await page.close();
    }
  });
}

/** 全部课件跑完后落一份合并报告，方便一次性看到整个仓库的布局状况 */
test.afterAll(() => {
  if (collected.length === 0) return;

  writeFileSync(join(REPORT_DIR, "layout-overflow.md"), buildMarkdownReport(collected, META));
  writeFileSync(join(REPORT_DIR, "layout-overflow.json"), buildJsonReport(collected, META));
});
