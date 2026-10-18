# SVG 属性被 UnoCSS attributify 吃掉（数值型属性）

> **一句话**：Slidev 内置的 `presetAttributify` 会把 SVG 的**表现属性**（`opacity` / `font-size` / `stroke-width` …）
> 当成工具类，按「百分数 / 间距比例 / 栅格」去翻译，生成 `[opacity~="0.9"]{opacity:0.009}` 这种**鬼规则**；
> 属性选择器的权重高于表现属性，于是**作者写的属性值被一个数值被重算过的 CSS 规则盖掉**。
>
> **正本修复**：`workspace/shared/uno.config.ts` 用 `blocklist` 屏蔽数值型属性（已生效，见「三」「四」）。
>
> 症状轻则「图元几乎隐形」（`opacity`），重则「线宽被撑到 163px、图形变形」（`stroke-width`）。
> **这是全网第一坑，`磁场符号看不见` / `平抛轨迹没显示` / `轴箭头没出来` 都可能是它，先查这个再查别的。**

---

## 一、机制（为什么会这样）

### 1. attributify 的本事与盲区

`@slidev/client/uno.config.ts`（`node_modules/@slidev/client/uno.config.ts`）里：

```ts
presets: [
  presetWind3(),
  presetAttributify(),
  presetTypography() /* presetIcons 由 setupUnocss 追加 */,
];
```

`presetAttributify` 的提取器把源码里**任何** `name="value"` 属性都当成候选工具类
（`extractorAttributify` 里的 `valuedAttributeRE`），它**不认识「哪些属性是 SVG 表现属性」**。
它的默认放行名单 `defaultIgnoreAttributes` 只有 `class` / `style` / `id` 等寥寥几个，
**SVG 的 `opacity`、`font-size`、`stroke-width` 全都不在里面**。

于是 `<circle opacity="0.9" />`、`<text font-size="16">`、`<FieldDots :size="10" />`
（`:size` 会以 `size="10"` 落到 DOM）统统变成候选工具类。

### 2. presetWind3 把它们翻译成什么

`presetWind3` 收到裸数字时的语义是「间距 / 百分数 / 栅格」，与 SVG 属性语义**完全无关**：

| 源码属性             | 生成的鬼规则                                                           | 后果                               |
| -------------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| `opacity="0.9"`      | `[opacity~="0.9"] { opacity: 0.009; }`                                 | 0.9 被当成 0.9% ⇒ **整层图形隐形** |
| `opacity="1"`        | `[opacity~="1"] { opacity: 0.01; }`                                    | 同上                               |
| `font-size="16"`     | `[font-size~="16"] { font-size: 4rem; }`                               | 4rem × 22px 根字号 = **88px**      |
| `stroke-width="2.8"` | `[stroke-width~="2.8"] { stroke-width: 2.8px; }`                       | 数值巧合正确，但已不受作者控制     |
| `gap="40"`           | `[gap~="40"] { gap: 10rem; }`                                          |                                    |
| `size="10"`          | `[size~="10"] { width: 2.5rem; height: 2.5rem; }`                      | 组件 props 也被吃                  |
| `cols="16"`          | `[cols~="16"] { grid-template-columns: repeat(16, minmax(0px,1fr)); }` |                                    |

### 3. 为什么「属性直接作用上去不生效」

**不是不生效，是权重被压住了。**

- SVG 表现属性在 CSS 层叠里等同于「作者样式表里权重 `(0,0,0)` 的声明」；
- 属性选择器 `[attr~="v"]` 的权重是 **`(0,1,0)`**；
- `(0,1,0) > (0,0,0)` ⇒ **鬼规则赢**，属性值被覆盖。

想让它输，只有三条路：① 内联 `style`（`(1,0,0)`）；② 加 `!important`；
③ **根本不让这条规则被生成**——就是我们的正本修复。

> 这就是它最坑的地方：DevTools 里元素的 computed 值看起来「很小 / 很怪」，
> 但你盯着 `opacity="0.9"` 这个属性看一辈子也看不出问题，得去看**样式面板里那条 `[opacity~="0.9"]`**。

### 4. 🔴 同源的另一半：SVG 属性里的颜色**不能带空格**（本节是正本）

`rgb(148 163 184 / 16%)` → `[stroke~="163"]{stroke-width:163px}` 是**同一个坑的另一种触发方式**：
颜色值里的空格让它被拆成 `163`、`184`、`16%` 等 token，撞上了 `stroke-width` 这类工具类名。

**规则（源码里就这么写）**：

- ✅ `stroke="rgba(148,163,184,0.16)"` / `fill="rgba(226,168,70,0.25)"`——**SVG 属性里的颜色一律写成无空格形式**（逗号或直接 hex）；
- ❌ `stroke="rgb(148 163 184 / 16%)"`——空格会被 attributify 拆成数字工具类；
- 例外：`<style>` / CSS 声明里的 `rgb(a b c / d)` 是合法现代 CSS，**不要改**（那里不经过 attributify 提取）。

**两者根因同一，但表现与触发条件不同**：

- 数值型（`opacity` / `font-size` / `stroke-width`）**dev 与 build 都会中招**（本次已实测，见「五」）；
- 颜色型（含空格的 `rgb(...)`）按既有记录**只在 `pnpm build` 产物里**中招，
  dev server / `pnpm shots` 看不出来。**「dev 看着没问题」不能作为验收通过的依据。**
  （机制尚未逐条复现确认，先按经验事实对待：**改完必须跑一次 `pnpm build` 再 grep 编译产物**。）

> 这条的其它地方（`AGENTS.md` 坑表、SVG 相关笔记等）提到时，**一句指向本节**即可，不必各写一套措辞。

---

## 二、为什么不能用「再加一个 presetAttributify」

直觉上会想：

```ts
// ❌ 无效
import { presetAttributify } from "unocss";

export default {
  presets: [presetAttributify({ ignoreAttributes: ["opacity", "font-size" /* … */] })],
};
```

**这不会生效**，因为 `@unocss/core` 的 `resolveConfig` 里：

```js
const rawPresets = uniqueBy(/* …展开后的 presets… */, (a, b) => a.name === b.name);
```

`uniqueBy` **只保留第一个**同名 preset，而 `presetAttributify()` 返回的 preset `name` 恒为
`"@unocss/preset-attributify"`；Slidev 的 client 配置（`clientRoot/uno.config.ts`）在 addon 配置**之前**加载，
所以**我们这份会被直接丢掉**。

同理也改不到 `@slidev/client` 自身（`createUnocssPlugin` 用 `configFile: false` + 内部 `mergeConfigs`）。
🔴 **不要改 `node_modules` 里的任何东西**：改动不入库、下次 `pnpm install` 就被覆盖，别人拉下来也没这一行——修复只能落在 `workspace/shared/uno.config.ts`。

---

## 三、🔴 正本修复：`blocklist` 屏蔽数值型属性

`workspace/shared/uno.config.ts`（**共享 addon 根目录**——Slidev 会扫描 addon root 的 `uno.config.ts`
并通过 `mergeConfigs` 合并，这条路径已实测生效：加文件后 Slidev 控制台打印 `uno.config.ts added, restarting...`）。

```ts
const SVG_NUMERIC_ATTRIBUTIFY = new RegExp(
  `^\\[(?:${NUMERIC_ATTRS.join("|")})(?:~=|=)"-?\\d+(?:\\.\\d+)?"\\]$`,
);

export default { blocklist: [SVG_NUMERIC_ATTRIBUTIFY] };
```

### 为什么 `blocklist` 恰好能治

`@unocss/core` 的 `TokenProcessor.parse` 里，**在生成规则之前**先查 blocklist：

```js
if (generator.isBlocked(current)) {
  this.blocked.add(raw);
  return;
} // 原始 token：[opacity~="0.9"]
// …matchVariants…
if (variantResults.every((i) => !i || generator.isBlocked(i[1]))) return; // variant 展开后的 token
```

命中即**直接丢弃候选**，规则不会生成 ⇒ 属性选择器消失 ⇒ 表现属性按原义生效。
而 `mergeConfigs` 对 `blocklist` 是**数组拼接**（`mergeDeep(a, b, true)`），所以 Slidev 自己的 blocklist 不受影响。

### 只屏蔽「值恰好是数字」的写法（关键设计）

正则是 `^\[(attr)(~=|=)"-?\d+(\.\d+)?"\]$` —— **属性名在白名单里 + 值必须是纯数字**。
于是 Slidev 自己 UI 依赖的 attributify 写法一律放过：

- `stroke="currentColor"` / `fill="currentColor"`（Slidev 的 Arrow、DrawingControls 都在用）；
- `flex="~"` / `grid="~ cols-2"` / `b="x"` / `bg="red-500"` / `border="~ rounded"`。

（Slidev client 里搜到的 attributify 用法只有 `size="none"`、`fill="currentColor"`、`stroke="currentColor"`，
所以白名单「只挡数字」是安全的；真要扩大范围，先重跑一遍已验证的 CSS 产物扫描。）

### 白名单（`NUMERIC_ATTRS`）

- SVG 表现属性：`opacity` `fill-opacity` `stroke-opacity` `stop-opacity` `font-size` `font-weight`
  `stroke-width` `stroke-dasharray` `stroke-dashoffset` `stroke-miterlimit` `r` `rx` `ry` `cx` `cy`
  `x` `y` `x1` `y1` `x2` `y2` `width` `height` `offset`
- 共享组件 props（会原样落到 DOM 属性）：`size` `cols` `rows` `gap` `thickness` `head-size`
  `label-size` `line-width`

**新增共享组件时**：只要某个 prop 会直接落到 DOM 属性上、且值可能是数字，就把它加进 `NUMERIC_ATTRS`（🔴 漏了就等于给下一个组件埋坑，症状是"`opacity` 又变成 0.9%"）。

---

## 四、实测验证

第 3 页（`SwingInField`，16×9 的磁场阵列）在浏览器里读 computed style：

| 指标                  | 修复前     | 修复后（`blocklist`） |
| --------------------- | ---------- | --------------------- |
| `.field-dots` opacity | `0.009` ❌ | `0.9` ✅              |
| `stroke`              | 暖金（对） | `rgb(226,168,70)` ✅  |
| 生成的鬼规则          | 5 条       | **0 条** ✅           |
| 磁叉 `<line>` 数量    | 288        | 288（16×9×2）✅       |

修复后整个样式表里 `[attr~=]` 只剩这些**合法**的（Slidev 自己的 UI）：

```
[flex~="row"]  [b~="x"] [b~="y"] [b~="2"] [b~="100%"] [b~="50%"]
[border~="0"] [border~="r"] [border~="transparent"]
[bg~="black"] [bg~="opacity-80"] [hover~="op100"]:hover
[stroke~="#0f1425"] [stroke~="#60a5fa"] [stroke~="#e2a846"] [stroke~="#f87171"] [stroke~="none"]
```

其中 `[stroke~="#…"]` 一类是**无害的**：它把 `stroke: rgb(226 168 70)` 写成了 CSS，
与属性值语义相同（值里没有空格，不会被拆成数字工具类）。

---

## 五、🟡 诊断脚本（以后怀疑这个坑，先跑它——顺序是经验，省时间用）

粘进浏览器 DevTools Console（在课件任意页）：

```js
// 列出所有 attributify 生成的属性选择器规则，并标出「属性值被改写成别的数值」的
const SVG_ATTRS = [
  "opacity",
  "fill-opacity",
  "stroke-opacity",
  "font-size",
  "stroke-width",
  "size",
  "cols",
  "rows",
  "gap",
  "r",
  "cx",
  "cy",
  "width",
  "height",
];
const out = [];
for (const sheet of document.styleSheets) {
  let rules;
  try {
    rules = sheet.cssRules;
  } catch {
    continue;
  } // 跨域表读不到，正常
  for (const r of rules) {
    const sel = r.selectorText || "";
    const m = sel.match(/^\[([a-z-]+)~="([^"]+)"\]$/i);
    if (!m) continue;
    const [, attr, value] = m;
    const css = r.style?.cssText ?? "";
    const declared = css.match(/(-?[\d.]+)/);
    const dv = declared ? Number(declared[1]) : NaN;
    const suspicious =
      SVG_ATTRS.includes(attr) &&
      Number.isFinite(Number(value)) &&
      Math.abs(dv - Number(value)) > 1e-9;
    out.push({ sel, css, suspicious });
  }
}
console.table(out);
console.log("可疑鬼规则条数：", out.filter((r) => r.suspicious).length);
```

**判读**：`suspicious: true` 的每一条都是坑；`opacity` / `font-size` / `stroke-width` / `size` / `cols` / `rows` / `gap`
这 7 个属性名出现在结果里（不管数值对不对）本身就说明 blocklist 没生效 ⇒ **`uno.config.ts` 没被加载，重启 dev server**。

### 🔴 验收（两条 grep 都要过；改完 `pnpm build` 是必须的一步）

```bash
# 1) 源码层：不该新增内联 style 兜底；也不该出现带空格的颜色属性
grep -rn 'style="opacity:' courses/*/components/*.vue workspace/shared/components/*.vue
# 验收标准：**不新增** `style="opacity: …"` 这类兜底写法；
# 正本修复后不再需要，新写的图别照抄它。检查重点是「没有新增」，不是「必须归零」。

grep -rnE '(stroke|fill)="rgba?\([0-9]+ [0-9]+' courses/*/components/*.vue workspace/shared/components/*.vue
# 期望：无输出（带空格的颜色一律要改掉）

# 2) 编译产物层：这才是唯一能抓住「颜色含空格」变体的地方
pnpm build
grep -rnoE '\[(opacity|font-size|stroke-width|fill|stroke)~="[0-9]+"\]' dist/ | head
# 期望：无输出（或只剩 [stroke~="#…"] 这类合法项）
```

只跑源码 grep 不算验完：**颜色含空格这一半在 dev server 里根本看不出来，必须 `pnpm build` 后 grep `dist/`**。

---

## 六、`font-size` 的既有兜底（保留，但现在只是 belt-and-braces）

`workspace/shared/styles/common.css` 里有一段：

```css
@supports (font-size: attr(font-size px, 16px)) {
  svg [font-size] {
    font-size: attr(font-size px, 16px) !important;
  } /* 读回属性原值 */
}
@supports not (font-size: attr(font-size px, 16px)) {
  svg [font-size] {
    font-size: unset !important;
  } /* 退回继承的 16px */
}
```

它当初就是**为了在消费侧硬扛这个坑**而写的（注释里也点名了 attributify）。
现在 `blocklist` 从源头切断了鬼规则，这段属于多余但无害的双保险 —— **保留**，因为：

- `attr()` 的**类型化**取值浏览器支持很窄（Chrome 133+ / Safari 18.4+），老浏览器走 `unset` 分支；
- `svg:not(.katex svg) { font-size: 16px }`（16px 体系）本身仍然必要，与这个坑无关。

> ⚠️ **别把这两个问题混为一谈**：AGENTS.md「图标」那行说的
> 「要放大图标只能用 `.icon-md/lg/…`，别用 UnoCSS 的 `text-6xl`」
> 是 `common.css` 给所有 svg 钉了 `font-size:16px` + 非 `!important` 压不过 ⇒ 另一个独立问题。
> 但注意 `[font-size~="20"]{font-size:5rem}` 这条鬼规则**也会打到 `<mdi-xxx font-size="20">` 上**，
> 所以这个坑修掉之后，图标放大问题也顺带少了一个诱因。

---

## 七、速查

| 现象                                     | 先怀疑                      | 处理                                                |
| ---------------------------------------- | --------------------------- | --------------------------------------------------- |
| 磁场叉点阵 / 网格 / 虚线「完全看不见」   | `opacity` 被压成 `x%`       | 跑「五」的诊断脚本 → 查 dev server 是否加载了新配置 |
| 坐标轴箭头、辅助线不见了                 | `opacity="0.72"` → `0.0072` | 同上                                                |
| 图形变形 / 中央一个黑块 / 描边特别粗     | `stroke-width` 被撑大       | 查 `[stroke~="163"]` 之类；跑 `pnpm build` + grep   |
| 图内文字大得离谱（或极小）               | `font-size` 被换成正文字号  | `common.css` 的 `attr()` 兜底 + blocklist           |
| 组件的 `:size` / `:cols` / `:gap` 不生效 | 组件 props 被吃             | 把 prop 名补进 `uno.config.ts` 的 `NUMERIC_ATTRS`   |
