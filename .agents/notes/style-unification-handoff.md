# 交接总结（2026-10-14 20:10 · 换模型继续跑）

> 这是**当前任务状态快照**，供下一个模型接手。先读本文，再按需读
> [`style-guide.md`](style-guide.md)（执行标准）与 [`style-unification-progress.md`](style-unification-progress.md)（批次明细）。

## 0. 一句话现状

- **风格统一**：34 门课里 **8 门已验收**（第 1 批 5 门 + 第 2 批 3 门，全部 e2e 溢出=0、物理不变量逐字节复验过）。
- **本轮共享正本修了 4 个 bug + 1 个隐患**，全部影响全仓，已 build + 抽验。
- **发现 3 门课存在"基线就溢出"的存量缺陷**（与本轮改动无关，已用 stash/pop + 单独复跑证实），**尚未修复**——这是下一步要做的事。

## 1. 本轮我改了什么（可直接 `git diff` 复核）

### 共享正本（`workspace/shared/styles/`，影响全部 34 门课）

| 文件         | 改动                                                                                     | 原因                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `common.css` | 正文规则补 `.slidev-layout > div { font-size: 1rem }`                                    | Slidev 主题让裸 div 继承 1.1rem，比 p/li 大 10%；1.3 agent 实测抓到第 37 页顶出 17.3px |
| `common.css` | 新增 `.icon-md/lg/xl/2xl` 图标尺寸阶梯                                                   | 治"图标被 svg 16px 基准钉死"（10.4 两处 `text-6xl` 失效）                              |
| `atoms.css`  | `.ok`/`.bad`/`.step-list`/`.figure`/`.fig-cap`/`.data-table`/`.split-wide`/`.fig-narrow` | 从 6–9 门课的重复发明提炼                                                              |

### 文档

- **新增** [`style-guide.md`](style-guide.md)：原子词汇表 / 视觉 token 铁律 / 框的纪律 / 命名规范 / `pnpm style:audit` 验收
- **新增** [`style-unification-progress.md`](style-unification-progress.md)：已完成 8 门 + 待做批次表 + 派工模板 + 幽灵 dev server 教训
- **新增** [`electronic-symbols.md`](electronic-symbols.md) / [`exercise-layouts.md`](exercise-layouts.md)
- **修正** `exercise-layouts.md` L41/52/73/157：原来写"题干沿用 `.problem` 蓝竖线"，与 `style-guide §4`（题干是主体、不用竖线）矛盾 → 已改为"普通段落、不套竖线"
- **AGENTS.md**：读表加"继续推进风格统一"行；坑速查表加"批量改课件前先清 dev server"

### 工具（`scripts/style-audit.ts`）

修了 4 个 bug（都由子代理独立发现）：TDZ 崩溃（`read` 改 function 声明）、`SHARED_ATOMS` 改从 CSS 现读、`--cols` 误报（只查 `:root`）、**`m` 标志丢失**（`new RegExp(CLASS_DEF.source,"gu")` → `"gmu"`，导致"自造类"恒 0、裸类名检查失效）。

## 2. ⚠️ 未完成：3 门课的基线溢出缺陷（下一步做这个）

**这 3 门课从未被派过 agent、工作区零改动**，但 e2e 溢出 ≠ 0。已用 `git stash pop` + 单独复跑证实**与本轮 `common.css` 改动无关**（基线就失败）。

| 课件                                 | 溢出量                                | 根因                                                                                           | 判断                                                                                      |
| ------------------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `2.x-motion-exercises`               | 上 **3.4px**                          | 第 5 页 `<MeetCountModel />` 内 `CoordAxes`（共享组件，`view={width:520,height:450}`）顶出画布 | **贴边问题**，微调即可：把 `view.height` 从 450 降到 ~430，或给该页 `max-height` 收一点   |
| `12.1-energy-conversion-in-circuits` | 上 **12.9px**（内部 latex 9.9px）     | 第 13 页 `.ask` + `span.latex`（10000 mAh / 3.7 V）总高超出 `.page-grow`                       | 内容略多，**可能拆页或让 `.ask` 字号降一档**（非"严重溢出"，不用大改）                    |
| `1.1-motion-description`             | 上 **16px**（全量跑时报，单独跑通过） | 第 16 页                                                                                       | ⚠️ **可能是全量并发时的状态污染**（单独跑 `1 passed`）；修前 2 门后**单独复跑确认**再定性 |

**按你的要求**：这 3 处都**不属于"内容严重溢出、需要拆页或大幅缩字号"**（最大也就 16px，其余 3.4/12.9px），所以**可以一起修**——2.x 调 `CoordAxes` 的 viewBox 高度、12.1 让 `.ask` 收一档或微调间距、1.1 先复跑确认是否真存在。

**注意**：`2.x` / `12.1` / `1.1` 都还在 `style-unification-progress.md §2` 的"待做"列表里（各属中批）。建议**修溢出 + 风格统一一起派给同一个 agent**（写范围同为 `courses/<slug>/`），省一轮验收。

## 3. 已验收的 8 门（e2e 溢出 = 0）

第 1 批：`3.4-force-composition-decomposition` · `10.4-capacitor` · `2.4-free-fall` · `1.4-acceleration` · `12.4-energy-sustainability`
第 2 批：`2.2-2.3-uniform-acceleration` · `2.1-speed-time-experiment` · `3.5-force-equilibrium` · `1.3-velocity`

每门都做了：硬编码色值/字号/圆角 → token/阶梯；卡片纪律；前缀统一；题干去 `.problem` 竖线；`E2E_COURSE=<slug> … layout-overflow` 溢出=0；**物理不变量剥掉 `class=`/`style=` 后与 HEAD 逐字节 diff 为 0**。

## 4. ⛔ 别碰

- **`courses/o2-1.3-charged-particle-motion`**：教师要求本人亲手收尾（含未提交的例 5 迭代），任何 agent 禁止碰。
- **`scripts/style-audit.ts`**：已修好 4 个 bug，别再改（写范围外）。
- **`workspace/shared/`**：改动要评估全仓影响；本轮已改的三处不要回退。

## 5. 教师未拍板的视觉取舍（已记入 progress §6，别自作主张改）

- 2.1 第 5 页对/错标题加了 `<span class="bad-line">` DOM 结构；第 7 页记录表字号变大一号
- 3.5 第 27/31 页各有 2 处 `.key`（"一页一处"规则）；第 23 页 `.half-grid`→`.split-wide`
- 1.3 第 2 页导航面板底色/底图换 token（更亮）；`.fun-note` 透明度 6%→14%
- **`#60a5fa`**：SVG 属性里保持字面值（已写进 style-guide §3，216 个源文件一致）；`style.css` 里换 `--c-accent-2`（暗一档）
- **`.key` 密度**：1.3 有 61 处、1.4=24、2.4=22、3.4=21，与"一页最多一处"冲突 → 建议单独开一轮收敛

## 6. 子代理派工（已验证可用）

```text
provider="opencode-go"  model="deepseek-v4.1-flash"  reasoning_effort="high"
```

⚠️ id 全小写；写成 `DeepSeekV4.1` 会被拒。每批 4 门课并行、写范围各自 `courses/<slug>/`；每门 prompt 里必须钉死：物理正确性绝对优先、别碰 o2-1.3、别把组件 scoped 样本抄进 style.css、e2e 溢出=0 是硬门槛。

## 7. 下一步建议顺序

1. **修 3 门基线溢出**（§2，连同这 3 门的风格统一一起派，写范围不重叠）
2. **继续第 3 批**（progress §2 的"中"批：`6.1` `1.2` `2.x` `12.1` `4.6` `6.2` `5.1` `1.1` `6.4`）
3. 每批收尾：`pnpm build` + 已验收课复跑（确认共享正本改动没连坐）
4. 全部完成后：`pnpm test:e2e` 全仓过 → 教师逐门目测 §5 的视觉取舍
