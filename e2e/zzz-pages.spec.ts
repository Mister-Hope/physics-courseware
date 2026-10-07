import { mkdirSync } from "node:fs";
import { join } from "node:path";

import { test } from "@playwright/test";

import { shotsDir } from "./artifacts";
import { listCourses } from "./courses";
import { gotoSlide, openDeck } from "./slidev-driver";

const course = listCourses().find((c) => c.slug === "1.x-vectors");

// E2E_COURSE 过滤掉了 1.x-vectors 时 find 返回 undefined：直接跳过本 spec，
// 不要在模块加载期读它的属性把整套测试打崩
test.skip(!course, "zzz-pages 只针对 1.x-vectors；本次 E2E_COURSE 过滤未包含它");

test("pages", async ({ page }) => {
  if (!course) return;

  const outDir = shotsDir([course.slug]);

  mkdirSync(outDir, { recursive: true });
  await openDeck(page, course.baseURL);

  for (const no of [15, 18, 19, 20]) {
    await gotoSlide(page, no, 0);
    await page.screenshot({ path: join(outDir, `pg${no}.png`) });
  }

  console.log("OK");
});
