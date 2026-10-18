import { execFileSync } from "node:child_process";
import { createServer } from "node:net";

/**
 * 端口自动避让。
 *
 * **为什么要自己找**：Playwright 的 `webServer` 只认死端口（`url`/`port`），端口被占就直接报错、
 * **没有**"占用就 +1"这种开关（[官方文档](https://playwright.dev/docs/test-webserver)）；
 * 真正绑端口的 Vite 本来会"占用就 +1"，但 Slidev 开了 `strictPort` 把它关掉了。
 * 我们又是自己分批起 server 的（见 `scripts/e2e.ts`），所以在这一层按"从基址往上找第一个真能绑上的端口"处理。
 *
 * 这样才能容忍**教师本机开着的 dev server**占住某个课件的默认端口：不撞、也不用改基址。
 */

/** 在 `host` 上真的试着绑一下（比"看看端口有没有人听"更准） */
export const isPortFree = (port: number, host = "localhost"): Promise<boolean> =>
  new Promise((resolve) => {
    const probe = createServer();

    probe.once("error", () => resolve(false));
    probe.once("listening", () => probe.close(() => resolve(true)));
    probe.listen(port, host);
  });

/**
 * 从 `start` 起往上找第一个空闲端口。
 *
 * @param start 首选端口（`E2E_BASE_PORT` + 课件序号）
 * @param options `maxTries` 连续尝试个数、`host` 绑定地址
 * @returns 可用端口
 * @throws 连续 `maxTries` 个端口都被占用时抛错（提示换 `E2E_BASE_PORT`）
 */
export const findFreePort = async (
  start: number,
  { maxTries = 50, host = "localhost" }: { maxTries?: number; host?: string } = {},
): Promise<number> => {
  for (let port = start; port < start + maxTries; port++) {
    if (await isPortFree(port, host)) return port;
  }

  throw new Error(`从 ${start} 起连续 ${maxTries} 个端口都被占用，请用 E2E_BASE_PORT=<别的基址> 换一段`);
};

/**
 * 端口上正在监听的是谁（best-effort，用来把"90s 超时"翻译成人话）。
 *
 * @param port 端口号
 * @returns `pid 进程名` 列表；取不到就返回说明文字
 */
export const describePortOwner = (port: number): string => {
  try {
    const output = execFileSync("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN"], { encoding: "utf8" });
    const owners = output
      .trim()
      .split("\n")
      .slice(1)
      .map((line) => line.split(/\s+/).slice(0, 2).join(" "));

    return owners.length > 0 ? owners.join("、") : "（lsof 没列出进程）";
  } catch {
    return "（本机没有 lsof，跳过）";
  }
};
