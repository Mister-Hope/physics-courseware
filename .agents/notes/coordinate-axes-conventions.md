# 坐标轴组件 · 共同约定与反例（写之前扫一眼）

> 这一篇是**踩坑清单**：三个组件共同遵守的约定（§1）、硬约束（§2）、常见错误与反例（§3）。
> 写坐标图之前花两分钟扫一遍，比写完再改便宜得多。用法与 props 见
> [`coordinate-axes.md`](./coordinate-axes.md) 与 [`coordinate-axes-api.md`](./coordinate-axes-api.md)。

## 1. 三个组件共同的约定（必读，写错都在这几条）

1. **两种单位口径**
   - **数据坐标**：`x` / `y` / `points` / `xRange` / `yRange` / `range` / 刻度值 / `callouts[].value` —— 写物理量数值，组件内部换算到屏幕；
   - **屏幕 px 口径**：`width`（线宽）/ `dot`（圆点半径）/ `dx` / `dy` / `size`（字号）—— 写"屏幕上多大"，组件按实测容器宽反算 viewBox 单位。**别在这几个字段里写数据坐标。**
2. **字号自动适配容器**：组件用 `ResizeObserver` 量容器渲染宽度，按"屏幕上目标字号"反算 viewBox 字号——
   **轴量与单位 21px、刻度数字 15px、图内标注 17px、线宽 3px**，`fontScale`（默认 1）是整体倍率。
   公式：`viewBox 字号 = 目标 px × (viewBox 宽 ÷ 容器渲染宽)`。
   → **换栏位不用重算字号**（半栏、整宽都自动合适）；SSR / 首帧拿不到宽度时按 **884px** 标定（挂载后立刻按实测值修正）。
3. **`view` 只决定比例与坐标系**：`view: { width, height }`（默认：SimpleAxis 640×340、CoordAxes 640×380、NumberAxis 640×140）。字号已经自适应，所以**不要为了换栏位去改 viewBox 宽**。
4. **高度预算（防溢出画布）**：渲染高 ≈ `容器宽 × view.height ÷ view.width`。画布逻辑尺寸 980×552，一页通常只有 ~460px 给图：
   - 整宽（≈884px）→ `height/width ≤ 0.5`（例：640×320 → 442px）；
   - 半栏（≈412px）→ `height/width ≤ 1.1`（640×380 → 245px）。
     图偏扁＝浪费后排可见面积；**内容少时优先加大字号/把图放整宽，而不是把 view 高度调大**。
5. **数学字体的两条口径**（写错必被教师挑）：
   - **轴量与刻度**（画在 SVG 里的）：量用 `KaTeX_Math` 斜体、单位用 `KaTeX_Main`——组件内部已写好，你只要把物理量放 `math`（如 `math: "v"`）、单位放 `unit`（如 `unit: "m/s"`）、下标放 `sub`、上标放 `sup`；中文/点名（A/B）/刻度数字用 `text`。
   - **图内点标注**（`CoordAxes.labels`、`ChartLabel`）：走 **HTML + 真 KaTeX**，直接写 LaTeX 源码（`tex: "v_0"`、`tex: "\\frac{1}{2}at^2"`），分式/上下标/中文混排都行——见 §1.11。
   - ⛔ **两边都禁止 Unicode 符号**：`v₀`、`θ`、`½`、`m/s²`、`m·s⁻¹` 一个都不许写；`m/s²` 写成 `unit: "m/s", sup: "2"` 或 `tex: '\\text{m/s}^2'`。
6. **排版细节（组件内部已处理，不用你调）**：
   - 单位与前面的文字之间自动留一小段间隙（不会再出现「剪掉m」贴死）；
   - 纵轴量与单位标签会自动避开顶端刻度数字（必要时整条上移），不用手改 `dy`。
7. **颜色**：默认已经用设计系统变量（`--c-accent` / `--c-accent-2` / `--c-physics` / `--c-danger` / `--c-text` / `--c-text-dim` / `--c-border` / `--c-bg-soft`）；想换色直接传 CSS 颜色或变量字符串。
8. **分步只有 `CoordAxes` 有**：传 `:step="$clicks"` + 元素 `showAt`；内部用 `visibility: hidden` 占位，元素不删不插、几何不动。`SimpleAxis` / `NumberAxis` 刻意没有分步（要给它们分步就用 `CoordAxes`，或整图包 `v-click`）。
9. **组件自适应栏宽、不溢出**：外层 `width: 100%`、`svg { width: 100%; height: auto }`。放在栅格里给父项 `min-width: 0`。
10. **`slides.md` 的 HTML 块里可以直接写内联数组/对象字面量 props（已实测 ✅，Lead 浏览器验证通过）**——不必为了传数据再包一层业务组件：

    ```html
    <CoordAxes
      :x-range="[0, 8]"
      :y-range="[0, 12]"
      :x-axis="{ quantity: 't', unit: 's' }"
      :y-axis="{ quantity: 'v', unit: 'm/s' }"
      :labels="[{ x: 6, y: 9, text: '剪掉', unit: 'm', anchor: 'top-right', halo: true }]"
    />
    ```

    - 属性值用**双引号**包住，内部字符串一律用**单引号**（`'t'`、`'m/s'`、`'top-right'`）；数字、布尔、数组、对象都能直接写；
    - 💡 props 多（曲线/填充/标注一大堆）时，**建议改用下面的代码块写法**（` ```comp 组件名 `，见 [`coordinate-axes-comp-block.md`](./coordinate-axes-comp-block.md)），可读性好很多；
    - ✅ **箭头函数写在属性里也已实测可用**（`2.2-2.3-uniform-acceleration` 第 6 页就是 `:curves="[{ formula: (t) => 0.5 + 0.35 * t * t }]"`，浏览器渲染正常）——函数曲线可以放心直接写；
    - HTML 块的两条老规矩照旧：**块内不能有空行**、**缩进不能到 4 空格**（见 `.agents/notes/slidev-layout.md`）。

11. **范围要比"最大刻度"大一点：末端箭头才好看**。轴线一直画到范围端点、箭头尖就顶在端点上；
    如果范围端点正好是个刻度（`yRange: [0, 15]` 且刻度含 15），刻度短线就糊在箭头上了。
    统一口径（与横轴 `xRange: [0, 6.4]` + 刻度到 6 一致）：**范围端点比最大刻度多留 5–10%**，
    例如 `yRange: [0, 16.5]` 配刻度 `[5, 10, 15]`、`xRange: [0, 6.4]` 配刻度 `[2, 4, 6]`。
    组件兜底：**贴到箭头上的刻度短线会自动不画**（数字保留），所以不会再出现"箭头尖上挂个刻度"的画面，
    但"箭头比最后一个刻度多出一截"这个观感要靠上面的余量来给。

12. **图内标注能用真 LaTeX（`ChartLabel`）**：`CoordAxes.labels` 的文字**不是 SVG `<text>`**，而是画在 SVG 上层的 HTML，所以能渲染真 KaTeX——**分式、上下标、中英混排都没问题**：

    ```html
    <CoordAxes
      :labels="[
        { x: 0, y: 2, tex: 'v_0', anchor: 'bottom-right', color: 'var(--c-accent)' },
        { x: 4, y: 5, tex: '\\frac{1}{2}at^2', anchor: 'center' },
        { x: 3.4, y: 7.3, parts: [{ text: '剪掉' }, { tex: '32\\text{ m}' }], halo: true },
      ]"
    />
    ```

    - `tex` = 整段 KaTeX 源码（**首选**）；`parts` = `{ tex }` 与 `{ text }` 按任意顺序混排（中文 + 公式 + 单位），**相邻片段之间自动留一点缝**（0.25em，`剪掉` + `32 m` 不会挤成「剪掉32 m」）；
    - `math` / `sub` / `unit` / `sup` 是**老写法**（组件会翻译成等价的 `tex`），新代码一律用 `tex`；
    - ⛔ **图内标注不许写 `½`**：KaTeX 的分式是 `\\frac{1}{2}`。组件会把 `½`、`−`、`×`、`°` 这类手写符号自动转成 LaTeX 兜底，但别指望它；
    - `anchor` 还是"文字画在点的哪个方位"（多了 `left`/`right` 两个正侧方位，标竖直的测量线时好用），`dx`/`dy` 是**屏幕 px**；`size`(17) 也是屏幕 px，**不随 viewBox 缩放**（与 §1.2 一致）；
    - 手写 SVG 的业务组件也能用：放进 `position: relative` 的容器，按 `xPercent`/`yPercent`（容器百分比）定位即可，见 `components/ChartLabel.vue`。

---

## 2. 硬约束速查（改组件或写课件都要守）

| 约束                                                 | 怎么做                                                                                                                        | 组件里是否已守住               |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| 量走数学字体、单位走 KaTeX_Main                      | 轴量与刻度用 `math`/`unit`（渲染成 `<tspan font-family="KaTeX_Math">`/`KaTeX_Main`）；点标注走 HTML + 真 KaTeX（`tex`）       | ✅                             |
| 禁止 Unicode 下标/上标/分式（`₀`、`½`、`θ`、`m/s²`） | 轴标签用 `sub`/`sup`；**图内标注用 LaTeX 源码**：`tex: "v_0"`、`tex: "\\frac{1}{2}at^2"`；手写符号由 `label-text.ts` 兜底转换 | ✅                             |
| SVG 内不能有空行                                     | 模板 `<svg>` 内部无空行（只有注释分隔）                                                                                       | ✅（已脚本断言）               |
| SVG 内不用 `rem`、`font-size` 不带单位               | 字号全部走 `font-size="N"` 属性绑定                                                                                           | ✅（已脚本断言）               |
| 自适应栏宽、不溢出 980×552                           | `width: 100%` + `height: auto`；再按 §1.4 高度预算选 `view`                                                                   | ✅（SSR 断言坐标不出 viewBox） |
| 分步只能 `visibility: hidden`                        | 只有 `CoordAxes` 有 `showAt`，内部用 `style.visibility`；非定尺寸场景不用 `v-if`                                              | ✅                             |
| 轴外装饰走 `#overlay` 插槽                           | 曲线/填充被 clipPath 裁剪；轴外尺寸线、轴上线段、拖拽映射都用插槽（不裁剪）；三个组件都有                                     | ✅                             |
| props 数 ≤ 12（`vue/max-props`）                     | SimpleAxis 10 / CoordAxes 11 / NumberAxis 6                                                                                   | ✅                             |
| 颜色用设计系统变量                                   | 默认色全部取自 `--c-*`；调用方也可传任意色                                                                                    | ✅                             |

---

## 3. 常见错误与反例（照着对一遍再交）

| ❌ 错误写法                                                                | 后果                                                    | ✅ 正确写法                                                                                                     |
| -------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `unit: "m/s²"` / `unit: "m·s⁻¹"` / `sub: "₀"`                              | 教师逐页挑的硬伤（Unicode 符号）                        | `unit: "m/s", sup: "2"` / `unit: "m/s", sup: "-1"` / `math: "v", sub: "0"`                                      |
| 把 `dx`/`dy`/`width`/`dot`/`size` 当数据坐标写（如 `dx: 2` 想挪 2 个单位） | 实际只挪 2px，标注几乎没动                              | 这几个字段是**屏幕 px**；要按数据挪就在数据坐标上改，或换算后写                                                 |
| 图里内容少，把 `view.height` 调得很大让它"占满"                            | 整图渲染高 = 容器宽 × 高 ÷ 宽，很可能顶出画布           | 先放大字号/线宽（`fontScale`），或把图放整宽，按 §1.4 卡住比例                                                  |
| 用 `SimpleAxis` 画 v-t 面积（要填充、要 4 个标注、要网格）                 | 塞不进去，只能改组件——违反"别做万能组件"                | 换 `CoordAxes`；SimpleAxis 只干"演示一两条线 + 一个点"                                                          |
| 用 `CoordAxes` 画时间轴（y 范围写 `[0, 1]` 假装没有纵轴）                  | 多出一根纵轴与刻度，版面浪费                            | 换 `NumberAxis`                                                                                                 |
| 在 `CoordAxes` 里想要"1+3 对角象限"                                        | 可见区域只能是矩形，画不出来                            | 拆两张图，或用 `areas` 自己表达遮挡                                                                             |
| 要分步却用 `SimpleAxis` / `NumberAxis`                                     | 没有 `step`/`showAt`                                    | 换 `CoordAxes`（`:step="$clicks"`），或整图包 `v-click`                                                         |
| 图内标注写 `math: '½at'`（Unicode `½`）                                    | 渲染成字体里的怪字形，不是 LaTeX 分式（教师挑过）       | `tex: '\\frac{1}{2}at^2'`（要更省事就写 `math: '\\frac{1}{2}at', sup: '2'`）                                    |
| 图内标注压在曲线上（只改 `dy` 硬顶）                                       | 标注与白线叠在一起，后排看不清                          | 挪到**空白处**（如三角形重心 `(2T/3, (2v₀+v)/3)`）或加 `halo: true`；`½at²` 这类长公式尤其要避线                |
| 范围端点正好压在最大刻度上（`yRange: [0, 15]` + 刻度 15）                  | 刻度短线跟末端箭头糊成一团（教师一眼挑出）              | 范围多留 5–10%：`yRange: [0, 16.5]` + 刻度 `[5, 10, 15]`（见 §1 第 11 条）                                      |
| 想画轴外的尺寸线/括号，用 `curves` 硬画                                    | 曲线/填充**被裁剪在绘图区内**，画到轴外会被无声切掉     | 用 `#overlay` 插槽（三个组件都有、不裁剪，见 [`coordinate-axes-api.md`](./coordinate-axes-api.md)「轴外装饰」） |
| 新课件忘记 addon                                                           | 组件解析不到（表现为 `Icon la/tex not found` 之类 500） | `slides.md` headmatter 写 `addons: [../workspace/shared]`（基准是 `courses/`）                                  |
| 把图放进栅格但父项没写 `min-width: 0`                                      | 图被撑爆、整页右溢出                                    | 栅格用 `minmax(0, 1fr)`，子项 `min-width: 0`                                                                    |

---
