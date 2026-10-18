# 笔记：公式（KaTeX）与图标（Iconify）

> 什么时候读：页面上要写公式、要放图标时。这两件事都属于"写错就整页 500 / 公式变成字面 `$x$`"的高频坑。

> 本篇兼一件事：**符号与单位怎么写**的正本在 §3，其它笔记遇到符号问题都指向那里，不各写一套。

## 1. 🔴 公式：Markdown 里能用，HTML 块里必须用组件

- **Markdown 段落、标题里的 `$...$` 正常渲染** ✓
- **HTML 块内（`<div>` / `<span>` / `<td>` 等）的 `$...$` 不会被渲染**，会显示成字面 `$x_1$`——即使公式所在段落前后加空行也没用。
  **改用共享组件**：
  ```html
  <Latex tex="\vec{a} + \vec{b} = (x_1 + x_2,\ y_1 + y_2)" />
  <Latex tex="\vec{s} = (6,\ 0)" display />
  ```
- **Vue 组件模板里的 `$...$` 同样不生效**，同上用 `<Latex :tex="…" />`（KaTeX 渲染，`display` 可切块级）；**`Latex` 与图内标注 `ChartLabel` 的 props 表见 [`shared-components.md` §3](./shared-components.md)**
- `\text{m}` 里写单位、`\overrightarrow{OA}` 写矢量、`\pm` / `\sqrt3` 都正常；行内混排时把组件与文字写在同一行即可
- **KaTeX 字体全局可用**：`shared/styles/index.css` 已全局 `@import "katex/dist/katex.min.css"`（物理课件公式多，一次性加载，不做按需，避免上课等待），所以**封面 SVG 里也能用**
- **SVG 的 `<text>` 内不能嵌 `<Latex>`**，但可声明 `font-family="KaTeX_Math" font-style="italic"` 得到书本上的数学斜体（`x`、`t`、原点 `O`、`\vec` 标签等）

> 预览时若正文出现**字面 `$`**，八成是"HTML 块内写 `$...$`"——换成 `<Latex />` 即可。

## 2. 图标：够用就好，别堆

- Slidev 支持完整 Iconify，本仓库各课件已装 `@iconify-json/mdi`，写 `<mdi-xxx />`
- 🟡 **少用**：提问、结论、连续叙述处能不用就不用。
- 🟡 不用 emoji 代替图标：同一套图标里混进彩色 emoji 会显得随手（这条只是观感，不是错误）。
- 🟡 图标只在**真有信息量**时出现、且**各自表意**：具象物件 `mdi-ruler`（尺子）/ `mdi-sword`（宝剑）；
  概念 `mdi-swap-horizontal`（交换律）/ `mdi-set-merge`（结合律）/ `mdi-vector-polyline`（首尾相接的链）；
  环节标记 `mdi-history`（回顾）等。🟡 同一页出现两个相同图标通常没必要（会显得是复制粘贴），但并不是"违规"。
- 🔴 **先确认名字存在再写**。图标包是**各课件自己的依赖**，仓库根目录没有，别在根上找：
  ```bash
  # 任取一门课（或正在改的那门）的依赖目录：
  ls courses/<slug>/node_modules/@iconify-json/mdi/icons.json
  node -p "Object.hasOwn(require('./courses/<slug>/node_modules/@iconify-json/mdi/icons.json').icons, 'ruler')"
  # 别名在 aliases 里，同样算数
  node -p "Object.hasOwn(require('./courses/<slug>/node_modules/@iconify-json/mdi/icons.json').aliases ?? {}, '名字')"
  ```
  或者直接在 [Iconify 图标站](https://icon-sets.iconify.design/mdi/) 搜名字。写错名字会让该页 **500 + 整页渲染失败**，e2e 报 `⛔ 渲染失败`。
- 🔴 **放大图标只能走共享字号阶梯**：`.text-3xl…5xl` 或图标专用 `.icon-md/lg/xl/2xl`（都带 `!important`）。
  **别用 UnoCSS 的 `text-6xl`**——`common.css` 给所有 svg 钉了 `font-size:16px` 基准，非 `!important` 的字号压不过它，图标会被钉死在 16px。
- 🟡 需要"对比/危险/回忆"这类语义时，先想清楚要表达什么再挑名字，别随手抓一个顺眼的。

## 3. 🔴 符号与单位：一律走 LaTeX（本篇是正本）

**物理量的符号与单位，一律用 `<Latex>` / KaTeX 写，不要写纯文本或 Unicode 字符**：

| 不要写                 | 写                                                            |
| ---------------------- | ------------------------------------------------------------- |
| `v₀`、`v0`             | `<Latex tex="v_0" />`                                         |
| `θ`、`α`               | `<Latex tex="\theta" />`                                      |
| `m/s²`、`m·s⁻¹`        | `<Latex tex="\text{m/s}^2" />`                                |
| `Δx`、`½at²`           | `<Latex tex="\Delta x" />`、`<Latex tex="\frac{1}{2}at^2" />` |
| "与 t 无关" 里的单个 t | `<Latex tex="t" />`                                           |

- **量用斜体、单位用 `\text{}`**：`<Latex tex="v_0 = 4\,\text{m/s}" />`
- **SVG 里嵌不了 `<Latex>`**：量用 `font-family="KaTeX_Math" font-style="italic"`，单位用 `font-family="KaTeX_Main"`
- 🟡 `ChartLabel` 的标注优先用 `tex`；`math` / `sub` / `unit` / `sup` 与 `tex` 等价（组件会翻译），
  细节见 [`coordinate-axes-conventions.md`](coordinate-axes-conventions.md)
- 其它笔记（`coordinate-axes-*` / `courseware-style-pass` 等）提到这条时，**一句话指向本节**即可，不必各自再展开一遍措辞
