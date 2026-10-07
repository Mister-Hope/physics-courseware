# 笔记：公式（KaTeX）与图标（Iconify）

> 什么时候读：页面上要写公式、要放图标时。两条都属于"写错就整页 500 / 变成字面 `$x$`"的高频坑。

## 1. 公式：Markdown 里能用，HTML 块里必须用组件

- **Markdown 段落、标题里的 `$...$` 正常渲染** ✓
- **HTML 块内（`<div>` / `<span>` / `<td>` 等）的 `$...$` 不会被渲染**，会显示成字面 `$x_1$`——即使公式所在段落前后加空行也没用。
  **一律改用共享组件**：
  ```html
  <Latex tex="\vec{a} + \vec{b} = (x_1 + x_2,\ y_1 + y_2)" />
  <Latex tex="\vec{s} = (6,\ 0)" display />
  ```
- **Vue 组件模板里的 `$...$` 同样不生效**，同上用 `<Latex :tex="…" />`（KaTeX 渲染，`display` 可切块级）；**`Latex` 与图内标注 `ChartLabel` 的 props 表见 [`shared-components.md` §3](./shared-components.md)**
- `\text{m}` 里写单位、`\overrightarrow{OA}` 写矢量、`\pm` / `\sqrt3` 都正常；行内混排时把组件与文字写在同一行即可
- **KaTeX 字体全局可用**：`shared/styles/index.css` 已全局 `@import "katex/dist/katex.min.css"`（物理课件公式多，一次性加载，不做按需，避免上课等待），所以**封面 SVG 里也能用**
- **SVG 的 `<text>` 内不能嵌 `<Latex>`**，但可声明 `font-family="KaTeX_Math" font-style="italic"` 得到书本上的数学斜体（`x`、`t`、原点 `O`、`\vec` 标签等）

> 预览时若正文出现**字面 `$`**，八成是"HTML 块内写 `$...$`"——换成 `<Latex />` 即可。

## 2. 图标：一个语义一个，别用烂

- Slidev 支持完整 Iconify，本仓库已装 `@iconify-json/mdi`，写 `<mdi-xxx />`；**禁用 emoji**
- **提问、结论、连续叙述处能不用就不用**：`.ask` 曾经每页都挂 `mdi-head-question-outline`，两三页之后又吵又敷衍；提问靠加粗 + 问号立住即可
- 图标只在**真有信息量**时出现，而且**各不相同、各自表意**：具象物件 `mdi-ruler`（尺子）/ `mdi-sword`（宝剑）；
  概念 `mdi-swap-horizontal`（交换律）/ `mdi-set-merge`（结合律）/ `mdi-vector-polyline`（首尾相接的链）；
  环节标记 `mdi-history`（回顾）等。**同一页不要出现两个相同图标**
- ⚠️ **先确认名字存在再写**：在 `node_modules/@iconify-json/mdi/icons.json` 里查一下（`icons` 或 `aliases`）。
  写错名字会让该页 **500 + 整页渲染失败**，e2e 报 `⛔ 渲染失败`
- 需要"对比/危险/回忆"这类语义时，先想清楚要表达什么再挑名字，别随手抓一个顺眼的
