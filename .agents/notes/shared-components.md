# 共享组件总览：29 个全局组件（干什么 + props 正本）

> 什么时候读：**页面上要用任何共享组件时**——先看这一篇 §1 的总表选组件，再看对应小节拿 props。
> 这些组件由共享 addon（`workspace/shared/`）**全局注册**：直接写标签，**不用 import、不要重画**；
> **props 全在这份笔记与下面的专篇里，不用去读 `.vue` 源码**（源码注释只是实现说明）。
> 三个大组件各有专篇，本篇只给指路：坐标轴三件套 → [`coordinate-axes.md`](./coordinate-axes.md)；弹簧测力计 → [`spring-scale.md`](./spring-scale.md)；手部 → [`grip-hand.md`](./grip-hand.md)。

> 本文件 **§8** 是"图元一律用共享组件 / SVG 属性颜色（带不带空格都行）/ 截图验收归 Lead"三条的**正本**，其它笔记只留一句指向这里。

## 1. 总表（选组件用）

| 组件              | 干什么                                                                          | 写在哪                                                  | props                                                       |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| `SimpleAxis`      | 讲台演示图：只第一象限 + 一两条曲线 + 标一个点                                  | markdown 顶层（自己带 `<svg>`）                         | 见坐标轴专篇                                                |
| `NumberAxis`      | 一维数轴（时间轴 / 位置轴 / 纸带打点）                                          | 同上                                                    | 见坐标轴专篇                                                |
| `CoordAxes`       | 完整坐标图：多曲线 / 多标注 / 网格 / 区域填充 / 分步                            | 同上                                                    | 见坐标轴专篇                                                |
| `SpringScale`     | 弹簧测力计（悬挂测力、两台对拉、装置示数）                                      | **只能在 `<svg>` 里**                                   | [`spring-scale.md`](./spring-scale.md)                      |
| `GripHand`        | 侧视图里"手捏住拉环 / 吊环 / 细绳往外拉"                                        | **只能在 `<svg>` 里**                                   | [`grip-hand.md`](./grip-hand.md)                            |
| `CourseArrow`     | 矢量箭头（自带三角形 marker + 自动回退线段，尖端必落在终点上）                  | **只能在 `<svg>` 里**                                   | 本篇 §4                                                     |
| `SurfaceHatch`    | 接触面：地面 / 桌面 / 墙面 / 斜面 / 天花板 + 单侧斜线阴影                       | **只能在 `<svg>` 里**                                   | 本篇 §5                                                     |
| `Ruler`           | 刻度尺（精确毫米刻度，或只画个尺子形状的示意图）                                | 任意：可嵌在别的 `<svg>` 里，也可单独当 HTML 用         | 本篇 §6                                                     |
| `CelestialSun`    | 天体：太阳（光球 + 日冕光晕 + 8 束光芒）                                        | **只能在 `<svg>` 里**                                   | 本篇 §9                                                     |
| `CelestialEarth`  | 天体：地球（海洋 + 大陆 + 云系 + 晨昏线 + 大气层辉光）                          | **只能在 `<svg>` 里**                                   | 本篇 §9                                                     |
| `CelestialMoon`   | 天体：月球（灰色球体 + 环形山 + 暗面）                                          | **只能在 `<svg>` 里**                                   | 本篇 §9                                                     |
| `CelestialPlanet` | 天体：一般星球（5 套配色 + 可选气态条纹 / 行星环）                              | **只能在 `<svg>` 里**                                   | 本篇 §9                                                     |
| `CircuitBattery`  | 电路：电池（可选 `flip` 换正负极，极性画在 `v>0` 一侧）                         | **只能在 `<svg>` 里**                                   | [`electronic-symbols.md`](./electronic-symbols.md)          |
| `CircuitResistor` | 电路：电阻（长宽比 3:1、`rx=2`）                                                | **只能在 `<svg>` 里**                                   | 同上                                                        |
| `CircuitSwitch`   | 电路：开关（断开 / 闭合；闭合时刀闸与导线重合）                                 | **只能在 `<svg>` 里**                                   | 同上                                                        |
| `CircuitBulb`     | 电路：灯泡                                                                      | **只能在 `<svg>` 里**                                   | 同上                                                        |
| `CircuitMeter`    | 电路：电表（电压表 / 电流表）                                                   | **只能在 `<svg>` 里**                                   | 同上                                                        |
| `Galvanometer`    | 灵敏电流计表盘（G、零点居中、指针可左右偏；接线柱在左右两侧）                   | **只能在 `<svg>` 里**                                   | [`electronic-symbols.md`](./electronic-symbols.md) §3.6.1   |
| `BarMagnet`       | 条形磁体（S 蓝 / N 红，横放 / 竖放，由 `nSide` 决定）                           | **只能在 `<svg>` 里**                                   | 本篇 §10                                                    |
| `Solenoid`        | 螺线管（**连续螺旋线**，不是一叠椭圆；可设从右端看顺时针/逆时针两种绕向）       | **只能在 `<svg>` 里**                                   | 本篇 §11                                                    |
| `FieldDots`       | 磁场**平铺阵列**：裸 `×` / 裸 `·` 铺满区域（不带圈）                            | **只能在 `<svg>` 里**                                   | 同上                                                        |
| `FieldMark`       | 磁场**单个带圈**记号 ⊙/⊗：图例 / 方向标注（不同图并用阵列）                     | **只能在 `<svg>` 里**                                   | 同上                                                        |
| `Latex`           | HTML 里的 KaTeX 公式（Markdown 段落里的 `$…$` 仍照用）                          | markdown / HTML 层                                      | 本篇 §3                                                     |
| `ChartLabel`      | 图内标注（画在 SVG 上层的 HTML，**能渲染真 KaTeX 与分式**）                     | HTML 层，盖在 SVG 上                                    | 本篇 §3                                                     |
| `CourseSlider`    | 滑块（原生渲染 + `accent-color`；标签 + 滑块 + 读数一行）                       | markdown / HTML 层                                      | 本篇 §7                                                     |
| `DefinitionBox`   | 定义气泡（`term` 定义名 + 正文；浮动标题 + 玻璃底）                             | markdown / HTML 层                                      | [`courseware-style-pass.md`](./courseware-style-pass.md) §4 |
| `CourseTopBar`    | 顶栏：封面显示章节名、内页显示课题名，右侧校徽（参数可省略，自动读 headmatter） | 共享 addon `global-top.vue` 已默认挂载，单课无需自建    | 本篇 §2                                                     |
| `CourseBottomBar` | 底栏两侧渐隐装饰线（**不显示页码**）                                            | 共享 addon `global-bottom.vue` 已默认挂载，单课无需自建 | 本篇 §2                                                     |

## 2. 页面外壳：`CourseTopBar` / `CourseBottomBar`

顶底栏**不要自己写**（`GlobalTop` / `GlobalBottom` 是 Slidev 保留名，重名会栈溢出）。`workspace/shared/` 根目录已提供默认的 `global-top.vue` / `global-bottom.vue`，由共享 addon **全局默认挂载**：

- **单课目录下不需要再建 `global-*.vue`**（新课生成脚本也不再生成）；
- `CourseTopBar` 自动读 `slides.md` headmatter 的 `chapter` 与 `title`，`CourseBottomBar` 零参数；
- 只有某门课**确需特殊定制**顶底栏时，才在 `courses/<slug>/` 下放一个同名 `global-*.vue` 覆盖。

```vue
<!-- 仅特殊定制时用：courses/<slug>/global-top.vue -->
<template>
  <CourseTopBar chapter="第十章 静电场" section="电容器的电容" />
</template>
```

`CourseTopBar` 的 `chapter` / `section` **都可省略**：缺省时自动读 `slides.md` headmatter —— `chapter` 取自定义字段 `chapter`（如「第十章 静电场」），`section` 取 `title`（课题名）。改标题只改 headmatter（以及登记表 `courses.json`），不用再同步顶栏。需要显式写法时 `<CourseTopBar chapter="…" section="…" />` 继续有效，显式 prop 优先。

> 读的是 `@slidev/client` 导出的全局 `configs`（= headmatter 解析结果）。顶栏挂在 `global-top` 全局层，位于每个单页 `SlideContext` 的**外层**，那里**不能**用 `useSlideContext()` 取 `$slidev.configs`。
> 共享默认层与课件自己的 `global-top.vue` / `global-bottom.vue` 会被 Slidev **同时**渲染，所以默认层挂载后发现同一父节点下已有课件自己的顶底栏就不渲染（`v-if` 置假），不会叠出两条。

| 组件              | prop      | 必填 | 默认                    | 说明                                             |
| ----------------- | --------- | ---- | ----------------------- | ------------------------------------------------ |
| `CourseTopBar`    | `chapter` |      | headmatter 的 `chapter` | 封面（第 1 页）显示的章节名，如「第十章 静电场」 |
|                   | `section` |      | headmatter 的 `title`   | 内页显示的课题名，如「电容器的电容」             |
|                   | `logoAlt` |      | `东北育才学校`          | 顶栏 logo 的 alt 文本                            |
| `CourseBottomBar` | —         | —    | —                       | 无 props；只有装饰线                             |

**URL 授课参数**（主页「我要上课」生成；Slidev 翻页原样保留 query，整节课有效；解析见 `workspace/shared/utils/lesson-params.ts`）：

- `?teacher=<姓名>` → 封面「授课教师」行用它替代默认张伯望（页面 frontmatter 不用动）；
- `?logo=` 校徽三态：缺省 → 东北育才；`hide` → 隐藏；`<姓名>` → 本机 `courseware.logo:<姓名>` 存过的自定义图，**本机没有则隐藏**（不回退校徽、不打扰课堂）。

> 为什么图片不进 URL：base64 图片 URL 几十 KB 起步，生产 nginx 请求行默认约 32KB 上限会 414；姓名只有几十字节，走 URL 让换机 / 分享 / 同机多教师都成立。图片按姓名存 localStorage（主页上传时写入），换机时优雅降级为隐藏。

## 3. HTML 层的公式与标注：`Latex` / `ChartLabel`

**什么时候用哪个**：整段公式、行内公式 → `Latex`；图上一个点旁边的小标注（`v_0`、`\frac{1}{2}at^2`、点名"小明"）→ `ChartLabel`（或直接写坐标组件的 `labels`，内部就是它）。

```html
<Latex tex="\vec{a} + \vec{b} = (x_1 + x_2,\ y_1 + y_2)" />
<Latex tex="\vec{s} = (6,\ 0)" display />
```

| `Latex`   | 类型      | 必填 | 默认    | 说明                                         |
| --------- | --------- | ---- | ------- | -------------------------------------------- |
| `tex`     | `string`  | ✅   | —       | KaTeX 源码，如 `v_0`、`\Delta x = x_2 - x_1` |
| `display` | `boolean` |      | `false` | 块级公式（居中、独立成行）                   |

`ChartLabel` 把标注**按容器百分比**定位、画在 SVG 上层——因为 SVG 的 `<text>` 里嵌不了 KaTeX，`\frac{1}{2}` 这类分式只能靠它。用法：外层容器 `position: relative`，SVG 与标注都放进去，组件按 `xPercent = 标注点屏幕 x ÷ 容器宽 × 100` 摆放（`CoordAxes` 内部就是这么做的）。

| `ChartLabel` | 类型               | 必填 | 默认            | 说明                                                                                                      |
| ------------ | ------------------ | ---- | --------------- | --------------------------------------------------------------------------------------------------------- |
| `xPercent`   | `number`           | ✅   | —               | 标注点横向位置（相对容器的百分比，0–100）                                                                 |
| `yPercent`   | `number`           | ✅   | —               | 标注点纵向位置（相对容器的百分比，0–100）                                                                 |
| `parts`      | `ChartLabelPart[]` | ✅   | —               | 内容片段，`{ tex: "v_0" }` 与 `{ text: "小明" }` 可任意顺序混排                                           |
| `anchor`     | `ChartLabelAnchor` |      | `center`        | 文字在点的哪一侧：`center` / `left` / `right` / `top-left` / `top-right` / `bottom-left` / `bottom-right` |
| `dx` / `dy`  | `number`           |      | `0` / `0`       | 方位之外再偏移（屏幕 px 口径）                                                                            |
| `size`       | `number`           |      | `17`            | 字号（屏幕 px 口径，不受 viewBox 缩放影响）                                                               |
| `color`      | `string`           |      | `var(--c-text)` | 文字色                                                                                                    |
| `halo`       | `boolean`          |      | `false`         | 加深色描边光晕（标注压在曲线上也读得清）                                                                  |
| `visible`    | `boolean`          |      | `true`          | 分步用：`false` 只隐藏、不删不插（不会顶跑已可见元素）                                                    |

> 组件里的 `$…$` 不生效、HTML 块内的 `$…$` 会显示成字面 `$x$`——**一律改用 `<Latex>`**；轴标签与 `labels` 的简写字段（`math` / `sub` / `unit` / `sup`）见 [`coordinate-axes-api.md`](./coordinate-axes-api.md)。

## 4. `CourseArrow`（矢量箭头，只能在 `<svg>` 里）

它替你守住两条内建规矩：**三角形 marker 自动生成**（不会出现"三角形后面挂个长方形"）、**线段自动回退半个箭头长**（尖端正好落在 `to` 上，别再自己算 `shaftEnd`）。

```html
<CourseArrow :from="{ x: OX, y: OY }" :to="tip" stroke="#e2a846" stroke-width="3.2" label="a" />
<CourseArrow
  :from="A"
  :to="B"
  stroke="#60a5fa"
  stroke-width="2.6"
  stroke-dasharray="8 5"
  :label-dx="10"
  :label-dy="-8"
/>
```

| prop                  | 类型     | 必填 | 默认        | 说明                                                                  |
| --------------------- | -------- | ---- | ----------- | --------------------------------------------------------------------- |
| `from` / `to`         | `Point`  | ✅   | —           | 起点 / 终点（**viewBox 用户单位**）；尖端落在 `to`                    |
| `headSize`            | `number` |      | `0`         | 箭头三角形长度；`0` = 按线宽自动（≤2 → 9、≤4 → 12、更粗 → 3×线宽）    |
| `label`               | `string` |      | `""`        | 标签，画在两点中点附近，自带深色描边光晕（数学标记用斜体 KaTeX 字体） |
| `labelDx` / `labelDy` | `number` |      | `8` / `-10` | 标签相对中点的横向 / 纵向偏移                                         |

- 其余属性**原样透传给内部 `<line>`**：`stroke`（不写则跟随 `currentColor`）、`stroke-width`（默认 3）、`stroke-dasharray`、`opacity`、`stroke-linecap`、`class`…；
- 只会画单头直线箭头；**曲线（`<path>` 贝塞尔）与双头箭头仍要手写**，手写时照 [slidev-svg.md](./slidev-svg.md) 的两条画法（尖端**必须**落在目标点上，那是会画错的地方）。

## 5. `SurfaceHatch`（接触面阴影，只能在 `<svg>` 里）

**推荐写法：给起点和终点 + 用 `side` 说清阴影在线的哪一侧**（屏幕方向）：

```html
<!-- 地面：阴影在线的下方 -->
<SurfaceHatch :from="{ x: 20, y: 180 }" :to="{ x: 320, y: 180 }" side="below" />
<!-- 天花板：阴影在线的上方 -->
<SurfaceHatch :from="{ x: 20, y: 40 }" :to="{ x: 320, y: 40 }" side="above" />
<!-- 左墙：阴影在线的左边 -->
<SurfaceHatch :from="{ x: 24, y: 24 }" :to="{ x: 24, y: 200 }" side="left" />
<!-- 斜面：从 (250,170) 到 (410,106)，阴影在线的下方 -->
<SurfaceHatch :from="{ x: 250, y: 170 }" :to="{ x: 410, y: 106 }" side="below" />
```

| prop          | 类型                                      | 必填 | 默认                | 说明                                      |
| ------------- | ----------------------------------------- | ---- | ------------------- | ----------------------------------------- |
| `from` / `to` | `{x, y}`                                  | 推荐 | `null`              | 表面线两端点（viewBox 用户单位）          |
| `side`        | `"below" \| "above" \| "left" \| "right"` |      | `below`             | 斜线阴影在**屏幕上**哪一侧（地面= below） |
| `thickness`   | `number`                                  |      | `16`                | 阴影带深度（垂直表面方向）                |
| `gap`         | `number`                                  |      | `24`                | 相邻斜线间距（越小越密）                  |
| `color`       | `string`                                  |      | `var(--c-text-dim)` | 表面线与斜线颜色                          |
| `lineWidth`   | `number`                                  |      | `2.4`               | 表面线线宽                                |
| `hatchWidth`  | `number`                                  |      | `1.2`               | 斜线线宽                                  |

- 斜线统一朝"表面方向的反方向"倾斜，没有额外旋钮；
- 只给 `x` / `y` / `length` / `orientation`（`horizontal` = 地面、`vertical` = 墙面）时按简写规则画；两种写法都支持。

## 6. `Ruler`（刻度尺）

横着量线段、竖着量弹簧伸长都行；既可直接当 HTML 元素用，也可嵌进别的 `<svg>`（传 `x` / `y` / `width` / `height`）。

```html
<Ruler :length="200" orientation="vertical" />
<Ruler :length="120" orientation="horizontal" :show-millimeter="true" />
<!-- 示意图模式：只画个尺子形状，不标数值 -->
<Ruler :length="150" schematic />
```

| prop               | 类型                         | 默认         | 说明                                                               |
| ------------------ | ---------------------------- | ------------ | ------------------------------------------------------------------ |
| `length`           | `number`                     | `200`        | 量程，**单位 mm**（`200` = 20 cm）                                 |
| `showNumbers`      | `boolean`                    | `true`       | 每 10 mm 标一个数值                                                |
| `showMillimeter`   | `boolean`                    | `false`      | 是否画 1 mm 细刻度                                                 |
| `unit`             | `"cm" \| "mm"`               | `"cm"`       | 数值单位                                                           |
| `orientation`      | `"vertical" \| "horizontal"` | `"vertical"` | 朝向                                                               |
| `schematic`        | `boolean`                    | `false`      | 示意图模式：只画尺子形状与稀疏刻度、**不标数值**（不给出精确读数） |
| `color`            | `string`                     | `#cbd5e1`    | 刻度与文字颜色                                                     |
| `thickness`        | `number`                     | `26`         | 尺身厚度（用户单位）；字号与刻度随它缩放                           |
| `x` / `y`          | `number`                     | `0` / `0`    | 嵌进父级 SVG 时的位置（用户单位）                                  |
| `width` / `height` | `number`                     | `0` / `0`    | 画出来的宽高；`0` = 用组件自己的 viewBox 尺寸                      |

## 7. `CourseSlider`（滑块：全库统一；🟡 建议别自己画轨道与滑块）

滑块是全库最常用的交互件（十几门课、每门 1～7 个）。**统一用它**：过去各课自己写
`::-webkit-slider-thumb` / `::-moz-range-thumb` / `::-*-slider-runnable-track`，滑块头 13 / 14 / 18 / 24px 配 4～10px 的轨道，
于是"滑块头比轨道高出一大截""深色页面上一条亮轨道"这类失调反复出现，还要维护 Chromium / Firefox 两份伪元素。

组件**不自己画轨道与滑块**：交给浏览器原生渲染，只用 `accent-color` 上主题色 —— 比例天然协调，键盘 / 触摸 / 无障碍也是原生的；
组件负责的是**行版式**（标签 + 滑块 + 读数）与**主题色档位**。

```html
<CourseSlider
  v-model="kx"
  :min="-1.5"
  :max="2.5"
  :step="0.05"
  label="向右分量"
  label-tex="v_x"
  sign
/>
```

| prop                     | 类型                                  | 默认             | 说明                                                                                                |
| ------------------------ | ------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| `modelValue`             | `number`                              | ✅               | 配合 `v-model`；组件抛出的就是数字，**不用写 `.number`**                                            |
| `min` / `max` / `step`   | `number`                              | `0`/`100`/`1`    | 与原生 `input[type=range]` 一致                                                                     |
| `label`                  | `string`                              | `""`             | 纯文本标签（中文）                                                                                  |
| `labelTex`               | `string`                              | `""`             | LaTeX 量符号（`v_x`、`\dfrac{r}{R}`）；与 `label` 同给 = 先中文后公式                               |
| `labelWidth`             | `string`                              | `8.8rem`         | 标签列宽（CSS 长度；窄标签如 `r/R` 可给 `3.4rem`）                                                  |
| `accent`                 | `"gold" \| "blue" \| "teal" \| "red"` | `gold`           | 主题色档位（`--c-accent` / `--c-accent-2` / `--c-physics` / `--c-danger`）                          |
| `layout`                 | `"row" \| "tight" \| "bare"`          | `row`            | `tight` = 单元格窄（2×2 网格）时三格列宽与行高各收一档；`bare` = 只画滑块（标签与读数由课程自己摆） |
| `sign`                   | `boolean`                             | `false`          | 非负值读数补 `+`（速度分量这类有符号量）；读数默认按 `step` 推小数位                                |
| `disabled` / `ariaLabel` | `boolean` / `string`                  | `false` / 取标签 | 禁用 / 无障碍名称（`layout="bare"` 时尤其建议给）                                                   |
| `#label` / `#value`      | slot                                  | —                | 标签、读数要完全自定义时用（单位 / 区间 / 分式）                                                    |

> 写 `sign` 这种**不带值的布尔属性**就行（Vue 会按 `true` 处理）；要改颜色用 `accent`、改标签列宽用 `labelWidth`，
> **不要**回到自己写伪元素样式的老路——`pnpm style:audit` 已加一条 `warn` 级检查点名手写滑块，
>
> **课程保留自己的版式时**（读数在滑块上方一行、说明文字在滑块上方、外面还套了带边框的盒子……）：
> 只把 `<input type="range">` 换成 `<CourseSlider layout="bare" />` —— 轨道与滑块统一了，课程自己的排版一行都不用改；
> 🟡 也**不要**用课内 `:deep(.cs-*)` 去改共享组件的列宽/行高：窄面板请用 `layout="tight"` + `labelWidth`。

**触屏上拖滑块不会翻页（组件已内置，课件侧不用写任何东西）**：Slidev 的左右滑动翻页手势
（`useSwipeControls` → `usePointerSwipe`）监听在 `#page-root` 的**冒泡**阶段，滑块一拖就是几十像素水平位移，
松手会被判成"左/右滑"直接翻页。组件已在 `pointerdown` 上 `stopPropagation` 把这段手势截住；
滑块照常能拖（原生控件不靠 JS 监听）、在别处滑动照常翻页。

⛔ **反过来：自己画的拖拽组件不受保护**——SVG 拖拽手柄、原生 `<input type="range">` 的 `pointerdown`
会冒泡到 `#page-root`，触屏上拖完一松手就翻页。这类组件要在自己的 `pointerdown` 里
`event.stopPropagation()`（**不要** `preventDefault`，会把原生拖动一起废掉）；
参考 `courses/o2-1.2-lorentz-force/components/BeamDeflect3D.vue` 的写法。

## 8. 所有组件共同的规则

> ⛔ **改完共享组件必须先"真实渲染一次"再交出去**（自身的纪律，真踩过）：`oxlint` / 类型检查**抓不到**运行期的
> `undefined` 属性访问与 `NaN` 坐标——`CircuitRheostat` 曾因"模板引用了计算属性里不存在的键 + 漏 `.value`"导致
> **整页渲染失败**，而 lint 全绿、交付方照常改课件、直到 e2e 才炸。
> 做法：在任意一页真实渲染一次（`pnpm shots <课件> <页号>` 或该课的单门 e2e）确认出图后再交给别人用；
> **改文件用脚本替换时，每处替换都要断言命中**（静默跳过一次替换＝留下半改状态）。

1. **全局注册**：直接写标签，不 import；共享代码改动（`workspace/shared/`）会影响**全部课件**，改前评估影响面。
2. 🔴 **`只能在 <svg> 里` 的组件（正本）**：`CourseArrow`、`SurfaceHatch`、`SpringScale`、`GripHand`、`CelestialSun`、`CelestialEarth`、`CelestialMoon`、`CelestialPlanet`、`CircuitBattery`、`CircuitResistor`、`CircuitSwitch`、`CircuitBulb`、`CircuitMeter`、`Galvanometer`、`BarMagnet`、`Solenoid`、`FieldDots`、`FieldMark`——它们画出来的根节点是 `<g>`，写成 HTML 元素页面上什么都不显示；也不能放进 ` ```comp ` 代码块（围栏只能出现在 markdown 顶层，进不了 `<svg>`）。`Ruler` 例外（自带 `<svg>`，嵌进别的 `<svg>` 或当 HTML 用都行）。**各专篇只留一句指向这里。**
   🔴 **这些组件覆盖的图元一律别手画**（教师点名统一，手画＝各课画法不一致）：表身 / 刻度 / 挂钩（`SpringScale`）、手掌 / 手指（`GripHand`）、电源 / 电阻 / 开关 / 电表 / 灯泡（`Circuit*`）、磁场叉点阵（`FieldDots` / `FieldMark`）、太阳 / 地球 / 月球 / 星球（`Celestial*`）、坐标轴（`SimpleAxis` / `NumberAxis` / `CoordAxes`，见 [coordinate-axes.md](./coordinate-axes.md)）。`Circuit*` / `Field*` 的 props 与用法见 [electronic-symbols.md](./electronic-symbols.md)。
3. **`v-click` 写在组件里照样生效**（Slidev 的 `v-click` 是全局指令，跨组件仍绑当前页）；也可以由页面传 `:step="$clicks"`。
4. 🔴 **SVG 属性的颜色（正本）**：带空格的 `rgb(148 163 184 / 16%)` 原先会被 attributify 把分量当工具类、撑坏图形（**只有 `pnpm build` 产物中招，dev server 与截图看不出来**），**现已在 `workspace/shared/uno.config.ts` 用 `blocklist` 从源头屏蔽 ⇒ 带不带空格都行**；⛔ 别改回 `presetAttributify({ignoreAttributes})`，新增会落到 DOM 的数值属性 / prop 要补进 `NUMERIC_ATTRS`；
   `<style>` / CSS 里的 `rgb(a b c / d)` 不要动——机制与诊断脚本见 [svg-attributify-trap.md](./svg-attributify-trap.md)，**各专篇只留一句指向这里**。
5. **props 一多就用 ` ```comp ` 代码块**（围栏前必须留空行），写法见 [`coordinate-axes-comp-block.md`](./coordinate-axes-comp-block.md)。
6. 分步显示用 `visible` / `v-if` 时记住：**真删真插会把已可见元素顶跑**，优先用组件提供的 `visible` 这类"只隐藏不删除"的开关。
7. **验证分工**：执行者**不必**自己截图验收——视觉 / 截图验收由 **Lead** 做（各专篇里"改完必须截图确认"一律按这条理解）。执行者按需自查即可（`pnpm slide` 读页源码、`pnpm exec oxlint workspace/shared` 之类）；不必为一次小改跑一整轮截图。

## 9. 天体组件：`CelestialSun` / `CelestialEarth` / `CelestialMoon` / `CelestialPlanet`

四个组件都渲染一个已定位好的 `<g>`（画在**父级 `<svg>` 的坐标系里**，只传 `x` / `y` / `r`，不用自己包 `<g transform>`）；
半径 `r` 变则细节（大陆、环形山、条纹、行星环、线宽）等比缩放，`label` 字号不随 `r` 变。
内部渐变 / 滤镜 / 剪裁 id 已按组件实例自动去重，**同一页画多个天体不会互相串色**。

```html
<svg viewBox="0 0 900 300" width="100%" xmlns="http://www.w3.org/2000/svg">
  <CelestialSun :x="110" :y="150" :r="34" label="太阳" />
  <CelestialEarth :x="380" :y="150" :r="52" label="地球" />
  <CelestialMoon :x="580" :y="150" :r="20" label="月球" />
  <CelestialPlanet :x="760" :y="150" :r="30" variant="red" label="火星" />
  <CelestialPlanet
    :x="860"
    :y="96"
    :r="16"
    variant="amber"
    :bands="true"
    :ring="true"
    label="土星"
  />
</svg>
```

**四个组件共有的 props**：

| prop         | 类型     | 默认   | 说明                                                                                |
| ------------ | -------- | ------ | ----------------------------------------------------------------------------------- |
| `x` / `y`    | `number` | `0`    | 球心（`CelestialSun` 即圆心）在父级 SVG 用户坐标里的位置                            |
| `r`          | `number` | 各不同 | 半径（Sun 30 / Earth 48 / Moon 20 / Planet 20）                                     |
| `label`      | `string` | `""`   | 球体下方标注；空字符串则不画                                                        |
| `labelDy`    | `number` | `0`    | 标注纵向偏移；`0` = 自动（约 `r + 20~44`）                                          |
| `labelSize`  | `number` | `18`   | 标注字号（屏幕近似 px，**不随 `r` 缩放**）；默认 18，最后一排看不清就调大，按图判断 |
| `labelColor` | `string` | 各不同 | 标注色；Planet 的空字符串 = 跟随该配色亮色                                          |
| `opacity`    | `number` | `1`    | 整体不透明度                                                                        |

**各自专有 props**：

| 组件              | prop          | 类型                                               | 默认     | 说明                                   |
| ----------------- | ------------- | -------------------------------------------------- | -------- | -------------------------------------- |
| `CelestialSun`    | `showGlow`    | `boolean`                                          | `true`   | 是否画日冕光晕                         |
|                   | `showRays`    | `boolean`                                          | `true`   | 是否画几何光芒                         |
|                   | `rayCount`    | `number`                                           | `8`      | 光芒条数（均匀分布）                   |
| `CelestialEarth`  | `showHalo`    | `boolean`                                          | `true`   | 是否画大气层辉光环                     |
|                   | `showLabel`   | `boolean`                                          | `true`   | 是否画标注（配合 `label`）             |
| `CelestialMoon`   | `showCraters` | `boolean`                                          | `true`   | 是否画环形山                           |
| `CelestialPlanet` | `variant`     | `"blue" \| "red" \| "amber" \| "teal" \| "violet"` | `"blue"` | 配色：地球类 / 火星类 / 气态 / 青 / 紫 |
|                   | `bands`       | `boolean`                                          | `false`  | 气态行星条纹（木星、土星用）           |
|                   | `ring`        | `boolean`                                          | `false`  | 行星环（土星用；环有前后遮挡关系）     |

- 天体只是"图元"，**轨道 / 连线 / 力 / 速度箭头照旧用 `CourseArrow`、`<path>` 自己画**；
- 需要"行星跑到轨道上某处"时，把轨道参数算出来再喂给 `x` / `y` 即可（例如椭圆轨道用 `x = a·cosE - c`、`y = b·sinE`）。

## 10. 条形磁体：`BarMagnet`

**S 蓝 / N 红、整块磁体只有最外端两个角是圆角**（S/N 分界处是直角）——各课封面、对照图里的磁体一律用它，
⛔ 不要再手画"S/N 两个矩形"（教师点名统一：各课磁体要长一个样）。**只能在 `<svg>` 里写**（根节点是 `<g>`）。

| prop         | 类型                                     | 默认                | 说明                                               |
| ------------ | ---------------------------------------- | ------------------- | -------------------------------------------------- |
| `x` / `y`    | `number`                                 | `0` / `0`           | 磁体**几何中心**（viewBox 用户单位）               |
| `length`     | `number`                                 | `96`                | 沿磁轴（N–S 方向）的长度                           |
| `width`      | `number`                                 | `30`                | 垂直磁轴的宽度                                     |
| `nSide`      | `"right" \| "left" \| "top" \| "bottom"` | `"right"`           | N 极朝向：`right`/`left` 横放、`top`/`bottom` 竖放 |
| `nColor`     | `string`                                 | `var(--c-danger)`   | N 极颜色（正电红）                                 |
| `sColor`     | `string`                                 | `var(--c-velocity)` | S 极颜色（负电蓝）                                 |
| `showLabels` | `boolean`                                | `true`              | 是否画 N / S 字母（磁体太小、纯示意时可关）        |
| `labelSize`  | `number`                                 | `0`                 | 字母字号；`0` = 自动（`width × 0.62`）             |
| `labelColor` | `string`                                 | `var(--c-bg-soft)`  | 字母颜色（深底，压在彩色磁体上）                   |
| `corner`     | `number`                                 | `3`                 | 最外端圆角半径                                     |

```html
<!-- 横放：S 在左、N 在右（13.3 封面 / P3 对照图） -->
<BarMagnet :x="74" :y="250" :length="92" :width="28" n-side="right" />
<!-- 竖放：S 在上、N 在下 -->
<BarMagnet :x="120" :y="34" :length="52" :width="26" n-side="bottom" />
```

- 磁体只画"磁体本身"：**磁感线、小磁针、线圈、引线都由页面自己画**（磁感线用 `CourseArrow` 或各课现有场模型）。
- 磁体方向由 `nSide` 决定，**不要再用 `transform` 旋转**（旋转会把 S/N 字母一起转倒）。
- **蹄形磁体不在组件内**：装置图（切割磁感线、法拉第圆盘）里的蹄形磁体是装置专用画法，仍按各课现有画法画。

## 11. 螺线管：`Solenoid`

教师点名：**线圈必须画成一条连续螺旋线，不是一叠独立椭圆 / 圆环**。共封面、对照图、实验装置里的直螺线管一律用它，
⛔ 不要再各课画 `v-for` 的 `<ellipse>` 叠堆。**只能在 `<svg>` 里写**（根节点是 `<g>`）。

画法：斜投影的螺旋线参数方程（沿轴 `s` + 截面角 `θ`：屏幕 `X = 轴坐标 + 0.34·radius·sin θ`、`Y = −radius·cos θ`），
按 `sin θ` 的符号把**一条**螺旋拆成两段——**正面半圈实线、背面半圈虚淡**（`backOpacity`，打开 `backDash` 则画虚线），
所以看得出导线绕到管后面去了。

🔴 **`direction` 的语义（本组件最要紧的一条）**：`cw` / `ccw` 说的是
**从 +x 端（右端）沿轴看回去**，电流沿导线绕行的方向（`cw` = 顺时针、`ccw` = 逆时针）。
等价说法：把导线从 −x 端（左端）走到 +x 端（右端）当作电流方向时，从右端看到的是顺时针还是逆时针。
同一条绕线从两端看方向相反；`orientation="vertical"` 相当于把横放图**顺时针转 90°**，参考端因此变成**下端**
（要从上端看，把 `direction` 反过来传）。

**接线端位置**（页面画引线用；导线就止在这两点上）：`phase` 决定导线在截面上的起止角
（`0` = 截面上端、`180` = 下端；`phase = 0 / 180` 处螺旋切线**水平**，引线横着接出去最自然）：

| 朝向         | 起端（`u = 0`）                                        | 末端（`u = 1`）                                                        |
| ------------ | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `horizontal` | `(x − length/2 + 0.34·radius·sin φ, y − radius·cos φ)` | 同式，`−length/2` 换成 `+length/2`、`φ` 换成 `phase + 绕向·turns·360°` |
| `vertical`   | 横放图整体顺时针转 90°（`s` 沿屏幕 +y）                | 同上                                                                   |

⚠️ `turns` 取**整数**时首尾在**同一个**截面位置（两端都在上端 / 都在下端，引线好接）；取**半整数**时一端在上、一端在下——"两条引线都往下走"的图（如封面）必须用整数匝。13.3 封面曾误用 4.5 匝，右引线差 50 用户单位，已修正。

| prop          | 类型                         | 默认              | 说明                                                                      |
| ------------- | ---------------------------- | ----------------- | ------------------------------------------------------------------------- |
| `x` / `y`     | `number`                     | `0` / `0`         | 螺线管包围盒中心（viewBox 用户单位）                                      |
| `length`      | `number`                     | `120`             | 沿轴长度（含两端螺旋的轴向跨度）                                          |
| `radius`      | `number`                     | `26`              | 螺线管半径（截面圆半径）                                                  |
| `turns`       | `number`                     | `4.5`             | 匝数，可带小数（如 `4.5`）                                                |
| `direction`   | `"cw" \| "ccw"`              | `"cw"`            | 绕向：**从 +x 端（右端）沿轴看**，电流顺时针 / 逆时针（见上）             |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"`    | 轴线左右 / 上下（竖放 = 横放图顺时针转 90°，参考端变下端）                |
| `color`       | `string`                     | `var(--c-accent)` | 导线颜色                                                                  |
| `lineWidth`   | `number`                     | `2.4`             | 导线线宽                                                                  |
| `backOpacity` | `number`                     | `0.32`            | 背面半圈不透明度（正面恒为实线）                                          |
| `backDash`    | `boolean`                    | `false`           | 背面半圈画成虚线（要更强调"绕到后面"时打开；封面用了它）                  |
| `phase`       | `number`                     | `0`               | 导线起止点在截面上的角度（度，`0` = 上端 / `180` = 下端；决定接线端位置） |

```html
<!-- 横放 4 匝（整数），从右端看顺时针；phase 180 ⇒ 两端都在下端 (146,89) / (226,89)，引线从这里接出 -->
<Solenoid
  :x="186"
  :y="64"
  :length="80"
  :radius="25"
  :turns="4"
  direction="cw"
  :phase="180"
  back-dash
/>
<!-- 横放 4.5 匝，从右端看逆时针；左端在上 (190,220)、右端在下 (262,280)，引线一上一下接 -->
<Solenoid
  :x="226"
  :y="250"
  :length="72"
  :radius="30"
  :turns="4.5"
  direction="ccw"
  :line-width="2.2"
/>
<!-- 竖放：相当于把横放图顺时针转 90°，参考端是下端 -->
<Solenoid :x="120" :y="90" :length="100" :radius="22" :turns="3" orientation="vertical" />
```

- **截面椭圆的压扁比例写死 0.34**（`0.34·radius` = 椭圆短半轴）：要更"侧"或更"正对管口"时，目前只能改组件里的 `DEPTH_RATIO` 常量。
- **组件只画导线**：引线、灵敏电流计、N/S 极标注、名字都由页面自己写（引线用 `<path>`，止于上面的"接线端"两点）；
  要标电流方向，由页面用 `<CourseArrow>` 沿导线另画。
- **两条线圈共轴嵌套**（13.3 P9「线圈 A 套在 B 里」）：同一个 `x` / `y`、不同 `radius` / `length`、相同 `phase` / `direction`，
  先画内圈再画外圈（外圈盖在上面，读起来才是"A 套在 B 里"）；两圈给不同 `lineWidth` / `backOpacity`，别糊成一团。
- **饼状（平放）螺旋盘**（电磁炉盘形线圈、无线充电的两只线圈）也用连续阿基米德螺旋画：目前是课内组件 —— `o2-2.3` 的 `FlatSpiralCoil.vue`、`o2-2.4` 的 `FlatCoil.vue`（斜投影压扁 + 连续螺旋，不要一叠同心椭圆）。
- **环形线圈不在这里**：绕在铁环上的连续绕组是 13.3 课内组件 `courses/13.3-electromagnetic-induction-phenomenon/components/RingCoil.vue`
  （参数：环心 / 环中心圆半径 / 带宽 / 绕组中心角与跨度 / 匝数 / 方向 / 导线色与线宽），没有进共享层——
  它只服务「同一铁环上左右各绕一组」那一张图，等第二次用到再抽上来。
