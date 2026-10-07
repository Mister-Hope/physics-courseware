import type { Page } from "@playwright/test";

import { measureLayout, type LayoutMeasureResult, type OverflowViolation } from "./overflow-scan";

/** 与投影仪一致的 16:9 视口 */
export const VIEWPORT = { width: 1280, height: 720 };

/** 判定阈值（逻辑像素）：小于它的偏差视为亚像素误差。 不同平台的中文字体回退会让行高有几像素差异，CI 上可用 `E2E_OVERFLOW_TOLERANCE` 放宽。 */
const configuredTolerance = process.env.E2E_OVERFLOW_TOLERANCE;

export const TOLERANCE =
  configuredTolerance === undefined || configuredTolerance.trim() === ""
    ? 2
    : Number(configuredTolerance);

/**
 * 「页面底部留白过大」的判定阈值（逻辑像素），默认 150px。
 *
 * 留白 = 552 − 内容底部（内容底部 = 该页最靠下的可见内容元素的 bottom），留白超过它说明内容 挤在页面上方、字号 / 行距 / 间距本可以更大。可用
 * `E2E_WHITESPACE_TOLERANCE` 调整。
 */
const configuredWhitespaceTolerance = process.env.E2E_WHITESPACE_TOLERANCE;

export const WHITESPACE_TOLERANCE =
  configuredWhitespaceTolerance === undefined || configuredWhitespaceTolerance.trim() === ""
    ? 150
    : Number(configuredWhitespaceTolerance);

/**
 * `E2E_STRICT_WHITESPACE=1` 时，留白超过 `WHITESPACE_TOLERANCE` 的页面会让测试失败 （失败信息里列出具体是哪几页）。
 *
 * 默认**只报告不失败**：仓库里其它课件本来就可能有大留白，直接 fail 会把 CI 弄红；想拿它当门禁 （例如某节课专门清完留白后防回归）再打开这个开关。
 */
const strictWhitespace = (process.env.E2E_STRICT_WHITESPACE ?? "").trim().toLowerCase();

export const STRICT_WHITESPACE = ["1", "true", "yes", "on"].includes(strictWhitespace);

/**
 * 「点击过程中已可见元素被顶跑」的位移容差（逻辑像素），默认 1px。
 *
 * 相邻两次点击之间，上一步已可见的元素只要位置差超过它就算一次位移。可用 `E2E_STABILITY_TOLERANCE` 调整 （不同平台中文字体行高有差异时放宽到
 * 2~3px，但**不要**为了掩盖问题随意放大）。
 */
const configuredStabilityTolerance = process.env.E2E_STABILITY_TOLERANCE;

export const STABILITY_TOLERANCE =
  configuredStabilityTolerance === undefined || configuredStabilityTolerance.trim() === ""
    ? 1
    : Number(configuredStabilityTolerance);

/**
 * `E2E_STRICT_STABILITY=1` 时，出现超过容差的位移就让测试失败。
 *
 * 默认**只报告不失败**（仓库里其它课件本来就可能还在用 `v-if` 分步，直接 fail 会把门禁弄红）。
 */
const strictStability = (process.env.E2E_STRICT_STABILITY ?? "").trim().toLowerCase();

export const STRICT_STABILITY = ["1", "true", "yes", "on"].includes(strictStability);

/**
 * 稳定性白名单：命中这些 CSS 选择器的元素天然会动（例如有意做成手风琴式展开/收起的段落）， 位移仍会记录在报告里，但不计入违例。`E2E_STABILITY_IGNORE`
 * 用英文逗号分隔选择器。
 */
export const STABILITY_IGNORE = (process.env.E2E_STABILITY_IGNORE ?? "")
  .split(",")
  .map((selector) => selector.trim())
  .filter(Boolean);

/**
 * 「正文越出 `.page-grow` 可用区域」的判定容差（逻辑像素），默认 1px。
 *
 * `.page-grow` 是 `flex:1` + `justify-content:center` 的正文容器：正文总高超过它的可用高度时，内容会同时顶出上边界 （首行叠到页面大标题 `h1`
 * 上）与超出下边界（被裁掉）。顶出 / 超出超过这个容差才算违例。可用 `E2E_BLOCK_TOLERANCE` 调整 （不同平台中文字体行高有差异时可放宽到 2~3px）。
 */
const configuredBlockTolerance = process.env.E2E_BLOCK_TOLERANCE;

export const BLOCK_TOLERANCE =
  configuredBlockTolerance === undefined || configuredBlockTolerance.trim() === ""
    ? 1
    : Number(configuredBlockTolerance);

/**
 * `E2E_STRICT_BLOCK_FIT=1` 时，正文越出 `.page-grow` 可用区域会让测试失败。
 *
 * 默认**只警告**：`justify-content:center` 的容器里内容偏多时很容易轻微越界，先以报告的形式暴露出来， 等清完再打开这个开关当门禁。
 */
const strictBlockFit = (process.env.E2E_STRICT_BLOCK_FIT ?? "").trim().toLowerCase();

export const STRICT_BLOCK_FIT = ["1", "true", "yes", "on"].includes(strictBlockFit);

/**
 * 正文越界白名单：命中这些 CSS 选择器的元素即使顶出 / 超出 `.page-grow` 也只记录、不计违例
 * （例如有意做出血效果、允许压到标题区的装饰性段落）。`E2E_BLOCK_IGNORE` 用英文逗号分隔选择器。
 */
export const BLOCK_IGNORE = (process.env.E2E_BLOCK_IGNORE ?? "")
  .split(",")
  .map((selector) => selector.trim())
  .filter(Boolean);

export interface SlideRef {
  no: number;
  title: string;
}

/** 打开课件首页，等 Slidev 应用就绪 */
export async function openDeck(page: Page, baseURL: string): Promise<void> {
  await page.setViewportSize(VIEWPORT);
  await page.goto(`${baseURL}1`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => Boolean(window.__slidev__?.nav?.total), undefined, {
    timeout: 90_000,
  });
  await page.waitForSelector(".slidev-page", { state: "attached", timeout: 60_000 });
  await settle(page);
}

/** 总页数 + 每页标题（用 tocTree，DOM 里的标题作为兜底） */
export async function readDeckSlides(page: Page): Promise<SlideRef[]> {
  const slides = await page.evaluate(() => {
    const nav = window.__slidev__?.nav;
    const titles = new Map<number, string>();

    const walk = (nodes: SlidevTocNode[] | undefined) => {
      for (const node of nodes ?? []) {
        if (typeof node.no === "number" && node.title) titles.set(node.no, node.title);
        walk(node.children);
      }
    };

    walk(nav?.tocTree);

    return {
      total: nav?.total ?? 0,
      titles: [...titles.entries()] as [number, string][],
    };
  });

  const titleMap = new Map(slides.titles);

  return Array.from({ length: slides.total }, (_, index) => ({
    no: index + 1,
    title: titleMap.get(index + 1) ?? "",
  }));
}

/**
 * 跳到第 no 页并展开到指定点击数，然后等页面完全稳定。
 *
 * `clicks` 传一个很大的数即可展开全部逐条呈现（Slidev 会自动夹到该页的总点击数）。
 */
export async function gotoSlide(page: Page, no: number, clicks: number): Promise<void> {
  await page.evaluate(([target, count]) => window.__slidev__?.nav?.go(target, count), [
    no,
    clicks,
  ] as [number, number]);

  await page.waitForFunction(
    ([target, count]) => {
      const nav = window.__slidev__?.nav;

      if (!nav || nav.currentPage !== target) return false;

      return count === 0 ? nav.clicks === 0 : nav.clicks === nav.clicksTotal;
    },
    [no, clicks] as [number, number],
    { timeout: 30_000 },
  );

  await settle(page);
}

/**
 * 跳到第 no 页并停在第 clicks 步（**支持中间步**）。
 *
 * `gotoSlide` 只能表达"未点击 / 全部展开"两种状态（它的等待条件是 `nav.clicks === clicksTotal`）， 中间步必须直接调
 * `nav.go`，否则会一直等"全部展开"而超时。这里照抄实测可用的写法。
 */
export async function gotoSlideStep(page: Page, no: number, clicks: number): Promise<void> {
  await page.evaluate(([target, count]) => window.__slidev__?.nav?.go(target, count), [
    no,
    clicks,
  ] as [number, number]);

  await page.waitForFunction(
    ([target, count]) => {
      const nav = window.__slidev__?.nav;

      if (!nav || nav.currentPage !== target) return false;

      return nav.clicks === count;
    },
    [no, clicks] as [number, number],
    { timeout: 20_000 },
  );

  // v-click 动画 0.5s；之后再做几何稳定等待，避免量到入场中途
  await page.waitForTimeout(600);
  await settle(page);
}

/** 读当前页的总点击数（`window.__slidev__.nav.clicksTotal`） */
export async function readClicksTotal(page: Page): Promise<number> {
  return page.evaluate(() => window.__slidev__?.nav?.clicksTotal ?? 0);
}

/**
 * 等页面彻底稳定，避免量到过渡/动画中途的位置。
 *
 * Slidev v52 用 View Transitions 换页，整页会先平移再归位（实测可达数百像素）； 如果只在 `nav.go()` 之后立刻量，很容易量到"正在入场"的位置而误报溢出。
 * 因此这里做四件事：等过渡类消失 → 等有限动画跑完 → 等字体/图片 → 等几何连续多帧不变。
 */
export async function settle(page: Page): Promise<void> {
  // 先让过渡/动画真正启动，否则"检查时动画还没开始"会直接通过
  await page.waitForTimeout(250);

  await page
    .waitForFunction(
      () => !document.querySelector("#slideshow .fade-enter-active, #slideshow .fade-leave-active"),
      undefined,
      { timeout: 15_000 },
    )
    .catch(() => undefined);

  await page
    .waitForFunction(
      () =>
        (document.getAnimations?.() ?? []).every((animation) => {
          const timing = animation.effect?.getComputedTiming?.();

          // 呼吸动画这类无限循环动画永远处于 running，不参与等待
          if (timing && timing.iterations === Number.POSITIVE_INFINITY) return true;

          return animation.playState !== "running";
        }),
      undefined,
      { timeout: 10_000 },
    )
    .catch(() => undefined);

  await page.evaluate(() =>
    Promise.all([
      document.fonts.ready,
      ...[...document.images]
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            }),
        ),
    ]).then(() => undefined),
  );

  // 把无限循环动画钉到相位 0 并暂停：`cover-float` 这类动画会平移装饰元素，
  // 不钉住的话测量结果会随动画相位抖动（近边缘的元素可能时有时无地"溢出"）
  await page.evaluate(() => {
    for (const animation of document.getAnimations?.() ?? []) {
      const timing = animation.effect?.getComputedTiming?.();

      if (timing && timing.iterations === Number.POSITIVE_INFINITY) {
        animation.currentTime = 0;
        animation.pause();
      }
    }
  });

  // 兜底：所有已渲染页面的几何连续 3 次采样（约 360ms）完全一致才算稳定
  await page.waitForFunction(
    () => {
      const signature = [...document.querySelectorAll("#slideshow .slidev-page")]
        .filter((element) => getComputedStyle(element).display !== "none")
        .map((element) => {
          const rect = element.getBoundingClientRect();

          return `${element.getAttribute("data-slidev-no")}:${Math.round(rect.left)},${Math.round(rect.top)},${Math.round(rect.width)},${Math.round(rect.height)}`;
        })
        .join("|");
      const holder = window as Window & { __e2eStableState?: { signature: string; same: number } };
      const state = holder.__e2eStableState ?? { signature: "", same: 0 };

      state.same = signature === state.signature ? state.same + 1 : 0;
      state.signature = signature;
      holder.__e2eStableState = state;

      return state.same >= 3;
    },
    undefined,
    { timeout: 15_000, polling: 120 },
  );
}

/** 量一页（或全局层）的溢出情况 */
export async function measureSlide(
  page: Page,
  options: {
    no: number;
    title: string;
    state: string;
    clicks: number;
    tolerance?: number;
    /** 额外返回本步可见元素快照（点击稳定性检查用） */
    collectElements?: boolean;
    ignoreSelectors?: string[];
    /** 正文越界白名单（命中只记录不计违例） */
    blockIgnoreSelectors?: string[];
  },
): Promise<LayoutMeasureResult> {
  return page.evaluate(measureLayout, {
    rootSelector: `.slidev-page[data-slidev-no="${options.no}"]`,
    tolerance: options.tolerance ?? TOLERANCE,
    slide: options.no,
    title: options.title,
    state: options.state,
    clicks: options.clicks,
    collectElements: options.collectElements ?? false,
    ignoreSelectors: options.ignoreSelectors ?? [],
    // 正文越界与稳定性各用各的白名单：稳定性白名单不该影响正文越界判定
    blockTolerance: BLOCK_TOLERANCE,
    blockIgnoreSelectors: options.blockIgnoreSelectors ?? [],
  });
}

/** 取某一页某一步的可见元素快照（复用 `measureLayout`，与溢出/留白同一套可见性口径） */
export async function snapshotSlide(
  page: Page,
  options: { no: number; title: string; clicks: number; ignoreSelectors?: string[] },
): Promise<LayoutMeasureResult> {
  return measureSlide(page, {
    ...options,
    state: `点击第 ${options.clicks} 步`,
    collectElements: true,
    blockIgnoreSelectors: BLOCK_IGNORE,
  });
}

/** 量顶栏 / 底栏这类跨页固定层（它们不在 .slidev-page 里） */
export async function measureGlobalLayers(
  page: Page,
  tolerance = TOLERANCE,
): Promise<LayoutMeasureResult[]> {
  const layers = [
    { selector: ".global-top", title: "顶栏（global-top）" },
    { selector: ".global-bottom", title: "底栏（global-bottom）" },
  ];
  const results: LayoutMeasureResult[] = [];

  for (const layer of layers) {
    results.push(
      await page.evaluate(measureLayout, {
        rootSelector: layer.selector,
        tolerance,
        title: layer.title,
        state: "跨页固定层",
        clicks: 0,
      }),
    );
  }

  return results;
}

const ANNOTATION_ID = "__e2e-overflow-annotation__";

/** 把溢出元素用红框标出来（截图用），不改动真实 DOM */
export async function annotateViolations(
  page: Page,
  rootSelector: string,
  items: (OverflowViolation & { label: string })[],
): Promise<void> {
  await page.evaluate(
    ({ selector, annotations, annotationId }) => {
      const root = document.querySelector(selector);

      if (!root) return;

      document.getElementById(annotationId)?.remove();

      const layer = document.createElement("div");

      layer.id = annotationId;
      layer.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none";

      annotations.forEach((item, index) => {
        // 按 indexPath 逐级下钻：`querySelector` 会在任意深度匹配，可能框到同 tag 的别的元素
        let target: Element | null = root;

        for (const childIndex of item.indexPath ?? []) {
          target = target?.children[childIndex] ?? null;
        }

        if (!target) return;

        const rect = target.getBoundingClientRect();
        const box = document.createElement("div");

        box.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;border:2px dashed #f43f5e;background:rgba(244,63,94,0.14);box-sizing:border-box`;

        const badge = document.createElement("span");

        badge.textContent = `${index + 1}. ${item.label}`;
        badge.style.cssText =
          "position:absolute;left:-2px;top:-20px;background:#f43f5e;color:#fff;font:12px/16px system-ui,sans-serif;padding:1px 6px;border-radius:4px;white-space:nowrap";
        box.append(badge);
        layer.append(box);
      });

      document.body.append(layer);
    },
    { selector: rootSelector, annotations: items, annotationId: ANNOTATION_ID },
  );
}

export async function clearAnnotations(page: Page): Promise<void> {
  await page.evaluate((id) => document.getElementById(id)?.remove(), ANNOTATION_ID);
}

/** 截取画布区域 */
export async function captureSlide(page: Page, filePath: string): Promise<void> {
  const box = await page.locator("#slide-container").boundingBox();

  await page.screenshot({ path: filePath, clip: box ?? undefined });
}
