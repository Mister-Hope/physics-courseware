import { mkdirSync } from "node:fs";
import path from "node:path";

import { test } from "@playwright/test";

import { shotsDir } from "./artifacts";
import { listCourses } from "./courses";
import {
  captureSlide,
  gotoSlideStep,
  openDeck,
  readClicksTotal,
  readDeckSlides,
} from "./slidev-driver";

/**
 * 批量截图助手（`pnpm shots` 背后就是它）——给 agent 用 `read_image` 自查页面用。
 *
 * 环境变量：
 *
 * - E2E_COURSE 课件 slug（必填，缺省取列表第一个）
 * - E2E_SHOT_PAGES 页号，如 "15,18-20"；留空 = 全部页
 * - E2E_SHOT_CLICKS "0"（默认，未点击）｜"all"（0 与全部展开）｜"each"（每一步都截）｜具体数字
 * - E2E_ARTIFACT_DIR 显式指定产物目录（默认规则见 e2e/artifacts.ts）
 *
 * 产出：`courses/<课件>/.temp/shots/p<页号>-c<点击数>.png`（一次跑多个课件时退回 `e2e/reports/shots/`）， 并在控制台打印 `SHOT
 * <绝对路径>`。
 */
const slug = (process.env.E2E_COURSE ?? "").split(",")[0]!.trim();
const course = listCourses().find((item) => item.slug === slug) ?? listCourses()[0]!;

const pagesSpec = (process.env.E2E_SHOT_PAGES ?? "").trim();
const clicksSpec = (process.env.E2E_SHOT_CLICKS ?? "0").trim();
const OUT_DIR = shotsDir([course.slug]);

const parsePages = (spec: string): number[] => {
  const result: number[] = [];

  for (const part of spec.split(",")) {
    const trimmed = part.trim();
    const range = trimmed.match(/^(\d+)-(\d+)$/);

    if (range) {
      for (let no = Number(range[1]); no <= Number(range[2]); no += 1) result.push(no);
      continue;
    }

    if (/^\d+$/.test(trimmed)) result.push(Number(trimmed));
  }

  return [...new Set(result)].sort((a, b) => a - b);
};

test(`截图「${course.slug}」`, async ({ page }) => {
  mkdirSync(OUT_DIR, { recursive: true });
  await openDeck(page, course.baseURL);

  const slides = await readDeckSlides(page);
  const numbers = pagesSpec === "" ? slides.map((slide) => slide.no) : parsePages(pagesSpec);

  if (numbers.length === 0) throw new Error("E2E_SHOT_PAGES 没解析出任何页号");

  for (const no of numbers) {
    await gotoSlideStep(page, no, 0);
    const total = await readClicksTotal(page);

    const steps =
      clicksSpec === "each"
        ? Array.from({ length: total + 1 }, (_, index) => index)
        : clicksSpec === "all"
          ? [...new Set([0, total])]
          : [Number(clicksSpec) || 0];

    for (const clicks of steps) {
      if (clicks > total) continue;

      await gotoSlideStep(page, no, clicks);

      const file = path.join(OUT_DIR, `p${String(no).padStart(2, "0")}-c${clicks}.png`);

      await captureSlide(page, file);
      console.log(`SHOT ${file}`);
    }
  }
});
