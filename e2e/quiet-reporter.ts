import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

// `--warnings-only` 专用的最小 reporter。
//
// 默认的 `list` reporter 每个课件都要刷 `Running 2 tests using 1 worker`、`✓ 1 e2e/…`、`2 passed (1.7m)`：
// 全量 70 门就是 200 多行进度，还会把真正的 ⚠️ 顶出屏幕。这里通过的用例一个字都不打印，只保留：
//
// - 用例自己的输出：⚠️ 警告与 ❌ 报错都从 `onStdOut` / `onStdErr` 来。必须显式转发——
//   Playwright 只通过 reporter 输出测试里的 `console.log`，换成自定义 reporter 后不转发，
//   spec 打印的警告会被整个吞掉（实测过）。
// - 失败用例的标题与 Playwright 错误信息（`result.error`）：渲染失败、越出画布等硬失败。
//
// 只在 `E2E_WARNINGS_ONLY` 下由 `playwright.config.ts` 启用；默认仍是 `list` + `html`。
// 环境变量的判断在配置侧（`e2e/report.ts` 的 `isWarningsOnly`），本文件保持无副作用。
class QuietReporter implements Reporter {
  /** 按行缓冲：Playwright 给的 chunk 不保证在行边界断开，直接 write 会把警告切成半行 */
  private readonly pending = new Map<"stdout" | "stderr", string>();

  private forward(kind: "stdout" | "stderr", chunk: string | Buffer): void {
    const buffered = (this.pending.get(kind) ?? "") + chunk.toString();
    const lines = buffered.split("\n");

    this.pending.set(kind, lines.pop() ?? "");

    for (const line of lines)
      (kind === "stdout" ? process.stdout : process.stderr).write(`${line}\n`);
  }

  onStdOut(chunk: string | Buffer): void {
    this.forward("stdout", chunk);
  }

  onStdErr(chunk: string | Buffer): void {
    this.forward("stderr", chunk);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === test.expectedStatus) return;

    // `titlePath()` 会带上空的 describe 层（匿名套件），过滤掉再拼，否则标题里出现「› ›」
    const title = test
      .titlePath()
      .filter((part) => part.trim().length > 0)
      .join(" › ");
    const message = result.error?.message?.trim();

    process.stdout.write(`\n✗ ${title}\n${message ? `${message}\n` : ""}`);
  }

  onEnd(): void {
    for (const [kind, rest] of this.pending) {
      if (rest.length === 0) continue;

      (kind === "stdout" ? process.stdout : process.stderr).write(`${rest}\n`);
    }

    this.pending.clear();
  }
}

export default QuietReporter;
