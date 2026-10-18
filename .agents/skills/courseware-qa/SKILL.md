---
name: courseware-qa
description: 本仓课件的版面与风格验收流程：跑哪些命令、报告落在哪、四张表怎么读、什么才算硬失败（越出画布/渲染失败/SVG 契约，其余只报告）、留白与点击位移的口径、量版面的假阳性陷阱、以及验收结论怎么写。Use when 改完课件要验证版面、e2e 报红要定位、或要判断"这算不算违规"。
---

# 版面与风格验收

**先记住门禁的边界**：CI 只跑 `pnpm lint` + `pnpm build` + `pnpm test:e2e`。
e2e 的**硬失败只有三类**：① 整页渲染失败；② 元素越出 980×552 画布；③ SVG 16px 契约。
**留白 200px、点击位移 1px、正文越出 `.page-grow` 1px 默认只报告**（`E2E_STRICT_*=1` 才让它们失败）。
`pnpm style:audit`（默认 exit 0）与 `pnpm check:courses` **不进 CI**，只作建议 —— **warn 不是 error，建议不是门禁**。

## 一、跑

```bash
E2E_COURSE=<slug> pnpm exec playwright test e2e/layout-overflow.spec.ts   # 单课件（约 1.5–2 分钟）
pnpm test:e2e                                                             # 全部课件（限流调度，默认并发 4）
E2E_PAGES="14,15-17" E2E_COURSE=<slug> …                                  # 只查指定页
E2E_CONCURRENCY=2 pnpm test:e2e                                           # 内存小就调小
pnpm style:audit                                                          # 风格审计（仅建议）
```

报告落在 `courses/<slug>/.temp/layout-overflow/`：`layout-overflow.md` + `.json` + `screenshots/`（红框标出问题元素）；
`pnpm shots <slug> <页号>` 的截图在 `courses/<slug>/.temp/shots/`。细节见 [e2e-checks.md](../../notes/e2e-checks.md)。

## 二、读报告（四张表）

1. **渲染失败页**：优先修，通常是 markdown/HTML 结构写错（4 空格缩进成代码块、`<v-click="N">` 当包裹标签、组件名/图标名写错）。
2. **越界元素**：真问题，必须清零。看它是"整页溢出"还是"个别元素出界"。
3. **留白**：报告级。**只看边缘空白带**，中间的空隙不看；元素少但分散排布是合格的。
4. **点击位移 / 正文越出 `.page-grow`**：报告级，多半是点击节奏或空间不足导致的顶跑。

## 三、量版面别踩假阳性（血泪）

- **必须等动画结束**：`clickAnimation: card` 的进入变换会让元素尺寸在动画中偏小（400ms 时读 11.5px，≥900ms 才 24.2px）→ `await page.waitForTimeout(1500)` + `document.fonts.ready`，**同一页跑两次**取稳定值。
- **被祖先 / SVG viewBox 裁掉的元素不算溢出**：那是"假溢出"（有意让光晕出血、装饰越界都会这样）。
- **布局基准**：画布 980×552（16:9 / 1280×720 视口）；`layout: base-flex` 的底部 padding 是 1.1rem ⇒ **底部最多只有 ~24.2px 头部余量**，"满格"不等于"超标"。
- **e2e 的盲区**（别把"e2e 绿了"当全对）：元素重叠、被滚动裁掉、动画中途、非 16:9、构建产物、`E2E_COURSE` 写了不存在的 slug（会 exit 0）。
- ⛔ 别复用已开着的 dev server（addon 组件表是启动时解析的）。

## 四、定结论（按分级写）

- **🔴 客观错误 / 坏页面 / 物理错 / 教师点名 / 流程闸门** → 必须改，列出来给 Lead。
- **🟡 观感与经验值**（密度、留白、字号、装饰）→ **不作"违规"判定**；写明"某页某处难看"的**具体位置和样子**，
  别拿 🟡 去要求别人改回默认值，也别把教师有意做的版式改回去。拿不准 → 在汇报里问。

## 五、汇报格式

一句话结论先给：**越界 N 处（0 最好）/ 渲染失败 N 页 / 留白与位移的报告项**；再给逐条定位（课件 + 页码 + 元素 + 建议动作）；
最后写清改动了哪些文件、跑了哪些命令、命令的 exit code。**不要把"没跑"说成"没问题"。**
