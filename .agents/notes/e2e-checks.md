# 笔记：E2E 检查（四张表 + 怎么跑）

> 什么时候读：改完课件要验证版面/交互时；或 e2e 报红要定位原因时。

```bash
E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts   # 只测一个课件（约 1.5–2 分钟）
pnpm test:e2e                                                             # 全部课件，**限流跑**（默认同时 4 个，见下）
E2E_CONCURRENCY=2 pnpm test:e2e                                           # 换并发上限（本机内存小就调小）
E2E_STRICT_STABILITY=1 E2E_STRICT_BLOCK_FIT=1 E2E_STRICT_WHITESPACE=1 …    # 严格模式：把"警告"变成失败
E2E_PAGES="14,15-17" E2E_COURSE=<slug> …                                   # 只检查指定页（支持 3 或 14,15-17）
E2E_BASE_PORT=30701 …                                                      # 只有"同一个课件"被两个进程同时跑时才需要（端口按课件固定分配，不同课件不冲突）
```

`pnpm test:e2e` 走 `scripts/e2e.ts` 这个**限流调度器**：同时最多 `E2E_CONCURRENCY` 个课件（默认 **4**），
哪个课件跑完就立刻补下一个（滑动窗口）。**本地和 CI 都走它**——因为 Playwright 的 `webServer` 会在跑任何用例之前
把**所有**课件的 dev server 一次性启动，而单个 Slidev dev server 实测 **≈550MB**：25 个课件一起起 ≈13.6GB，
本地 / CI（4 核 16GB）都会被撑爆（CI 上表现为跑到一半 `SIGTERM`、exit 143）。
调度器自己按窗口起/停 server，再带 `E2E_NO_WEBSERVER=1` 调 Playwright（配置见 `playwright.config.ts`）；
课件列表自动发现，**新增课件不用登记、也不用改分片名单**。

自动为每个课件起 Slidev 服务，在 **1280×720（16:9）** 视口下逐页检查（画布 = 980×552 逻辑像素）。
产出（**按课件分家，多个 AI 进程同时跑不同课件不会互相覆盖/删除**，规则见 `e2e/artifacts.ts`）：

| 运行方式                                    | 报告落在                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 单课件（`E2E_COURSE=<slug>`）               | `courses/<slug>/.temp/layout-overflow/`：`layout-overflow.md` + `.json` + `screenshots/`（红框标出问题元素） |
| `pnpm test:e2e`（限流调度器，逐课件跑）     | 同上：每个课件一个独立的 Playwright 进程，报告跟着课件落在各自的 `courses/<slug>/.temp/`                     |
| 旧行为：`pnpm exec playwright test`（全起） | `e2e/reports/layout-overflow/`（只在内存够的机器上用；`pnpm shots` 等单课件命令不受影响）                    |
| `pnpm shots <slug> …`                       | `courses/<slug>/.temp/shots/p<页号>-c<点击数>.png`（控制台打印绝对路径）                                     |

- 这些目录都已 gitignore，不用清理；**注意版面检查开跑会清空自己的报告目录**（所以它和 `shots/` 分开、单课件时也只清自己课件下的）；
- 同一个课件被两个进程同时跑时，用 `E2E_ARTIFACT_DIR=<别的路径>` 岔开产物。

## 四张表（报告里就是这四节）

| 检查                        | 口径                                                                                                                                                     | 阈值 / 开关                                                                                                   | 备注                                                                                                                                                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **① 溢出画布**              | 元素"被祖先 overflow 裁剪后的可见矩形"是否越出 980×552；全透明（v-click 未展开）与零尺寸不计；顶栏/底栏单独查                                            | 容差 `E2E_OVERFLOW_TOLERANCE`（默认 2px，CI 用 6px 抵消 Linux 中文字体行高差异）                              | **硬失败**，不是警告                                                                                                                                                                                                          |
| **② 底部留白**              | 留白 = 552 −「最靠下的可见内容元素 bottom」；排除页面容器、铺满画布的元素、全局层、`aria-hidden` 装饰、全透明元素                                        | `E2E_WHITESPACE_TOLERANCE`（默认 150px），**默认只警告**，`E2E_STRICT_WHITESPACE=1` 才失败                    | 看"全部展开"那一列；`先问后答`页初始态留白 300–400px 是设计使然                                                                                                                                                               |
| **③ 点击稳定性**            | 每页从第 0 步走到 `clicksTotal`，相邻两步**都可见**的元素按稳定标识（祖先结构路径 + 语义 class/id/文本，**不含 DOM 下标**）配对，位置差 > 容差记一次位移 | `E2E_STABILITY_TOLERANCE`（默认 1px）；`E2E_STRICT_STABILITY=1` 才失败；白名单 `E2E_STABILITY_IGNORE=".a,.b"` | 报 `outermost` 根因，改它一处即可连带解决被牵连的子元素；手风琴式有意位移请加白名单                                                                                                                                           |
| **④ 正文越出 `.page-grow`** | 可见内容元素的可见矩形 ∩ `.page-grow` padding box，**顶出上边界 / 超出下边界**超容差即记（这才能抓到"正文顶到标题上"，①抓不到）                          | `E2E_BLOCK_TOLERANCE`（默认 1px）；`E2E_STRICT_BLOCK_FIT=1` 才失败；白名单 `E2E_BLOCK_IGNORE=".a,.b"`         | 只对**用了 `.page-grow` 的课件**生效（1.4-acceleration / 2.4-free-fall / 2.1-speed-time-experiment / 2.2-2.3-uniform-acceleration / 1.x-vectors / 1.3-velocity 六个；其余课件的 0 处自动跳过）；有意出血/负 margin 请加白名单 |

排除项（③④ 共用）：`.page-grow` 自身、跨页固定层（顶栏/底栏）、`aria-hidden` 纯装饰、`position:fixed`、
SVG 内部与 KaTeX 内部节点（固定画布内部换内容属正当，但 `<svg>` 根被顶跑仍会报）。

## 其它必须知道的坑

- **"整页渲染失败"要单独识别**：Slidev 加载失败只渲染一个错误占位页（页面上只有 1 个元素），不识别就会当成"没溢出"。报错页会以 `⛔ 第 N 页渲染失败` 单列并让测试失败
- **组件没解析到会伪装成图标报错**：`<Latex />` 这类组件若不存在，Slidev 会把 `Latex` 当图标名拆成 `~icons/la/tex`，报 `Icon la/tex not found` → 该页 500 + 整页渲染失败（曾一次挂掉 12 页）
- **不要复用已开着的 dev server**（配置里 `reuseExistingServer: false`）：Slidev 启动时解析 addon 组件，复用旧进程会拿到过期组件表，改了文件却测到旧状态
- **View Transitions**：Slidev v52 换页时整页会先平移再归位（实测可达数百像素），测完必须等几何连续多帧稳定（`e2e/slidev-driver.ts` 的 `settle()`），否则把"正在入场"当溢出误报
- **`oxlint --fix` 会写坏测试文件**（vitest 插件会把 Playwright 的 `test`/`expect` 当 vitest 全局并自动插 import），所以 `e2e/` 已在 `oxlint.config.ts` 的 `ignore` 里（风格仍由 oxfmt 管）
- 新增课件目录自动纳入，无需登记；首次运行先 `pnpm test:e2e:install` 装 Chromium
- 代价：每个"页×步"约 1.3s（`nav.go` + 600ms + `settle`）——本地迭代用 `E2E_COURSE=<slug>` 只跑一个
