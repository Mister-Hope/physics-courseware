import path from "node:path";

import { defineConfig } from "@playwright/test";

import { playwrightRunDir } from "./e2e/artifacts";
import { listCourses } from "./e2e/courses";

const courses = listCourses();
/** Playwright 自己的中间产物（每次运行会被清空）——按课件/端口分开，多个进程同时跑不互相删 */
const RUN_DIR = playwrightRunDir();

/**
 * 端到端测试：真实浏览器里逐页渲染课件，检查布局问题。
 *
 * 每个课件由 `e2e/courses.ts` 自动发现，用独立的 slidev dev server（端口 30401 起）承载；
 * 已在本机跑着同端口服务时（`reuseExistingServer`）会直接复用。
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  // 课件之间共用报告文件与端口规划，串行跑最稳
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  // 布局判定是确定性的，失败就是真失败，不做重试掩盖
  retries: 0,
  timeout: 20 * 60_000,
  outputDir: path.join(RUN_DIR, "test-results"),
  reporter: [
    ["list"],
    ["html", { outputFolder: path.join(RUN_DIR, "html-report"), open: "never" }],
  ],
  use: {
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  webServer: courses.map((course) => ({
    command: `pnpm --filter ${course.packageName} exec slidev --base /${course.slug}/ --port ${course.port}`,
    url: course.baseURL,
    // 刻意不复用已有服务：Slidev 在启动时解析 addon 组件，复用旧进程会拿到过期的组件表，
    // 结果是"改了文件但测的是旧状态"（曾因此把 12 个已修好的页面报成渲染失败）。
    // 端口被占用时 Playwright 会直接报错，比静默复用安全。
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: "ignore" as const,
    stderr: "pipe" as const,
  })),
});
