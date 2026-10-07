# 弹簧测力计组件：怎么用（读这一篇就能上手，不用看组件源码）

> 什么时候读：课件里要出现**弹簧测力计**（悬挂测力、两台对拉、拉木块测摩擦力、实验装置里的示数）时。
> 一律用共享 addon 的 `<SpringScale>`，**不要手画表身 / 刻度 / 挂钩**——3.2 摩擦力、3.3 牛顿第三定律、3.4 力的合成这几课都有测力计要画，一律用它。
> props 全表、几何常量、暴露坐标的完整说明见本篇第 4 节（不用读组件源码）；这一篇只讲"怎么用、怎么摆、怎么不踩坑"。

## 1. 先记住三件事

1. **只能在 `<svg>` 里用**：组件画出来的是 `<g>`，写成 HTML 元素什么都不显示；也**不能写成 ` ```comp ` 代码块**（代码块只能出现在 markdown 顶层，进不了 `<svg>`）。写法：`slides.md` 的静态 SVG 里直接写标签，或写进课件自己的 `components/*.vue`。
2. **示数一变，整机占位就变**：挂钩与拉杆随指针 1:1 外伸（零位约 1.26 倍外壳长，满量程约 2.07 倍）。`viewBox` 要按页面上出现的**最大示数**留高，否则挂钩被裁掉。
3. **`mirror` 时 `x` 不是左边缘**：镜像后图形会沿轴**反向**再伸出 `extension`。两台对拉别手算位置，用组件暴露的实时坐标算（见配方 2）。

## 2. 最短写法

```html
<svg viewBox="0 0 104 520" style="height: 430px; width: auto">
  <SpringScale :x="40" :y="12" :length="300" :force="2.4" label="2.4" />
</svg>
```

- `x` / `y` = **外壳靠吊环那一端的外角**（竖直 = 左上角，水平 = 左端上角）；
- `length` = 外壳长度（默认 `300`），外壳宽自动 = `length / 5.5`；
- 有 `label`（读数框）时，读数框所在的**那一侧还要再留 `0.61 × 外壳宽`**（上例 `x=40` 就是给左侧读数框留的位置）；
- 竖直单台请用 `height: …; width: auto`（见第 5 节，别用 `width: 100%`）。

## 3. 三个配方（参数都是实测可用的）

### 配方 1：竖直悬挂（挂物测力）

```html
<svg viewBox="0 0 104 520" style="height: 430px; width: auto">
  <SpringScale :x="40" :y="12" :length="300" :force="2.4" label="2.4" />
</svg>
```

- 示数 2.4 N 对应 `force="2.4"`；量程默认 5 N、分度 0.2 N；
- 想看**超量程变红**：把 `force` 给到大于量程（如 `:force="6"`），指针停在满量程并变红，读数框同步变红，`viewBox` 高度要按满量程留（`0 0 104 645`）。

### 配方 2：两台水平对拉（牛顿第三定律，示数一定相等）

要点：**B 加 `mirror`**（吊环/挂钩换端、挂钩朝向反转），**B 的 `x` 由 A 暴露的 `hookEnd` / `extension` 实时算出**——两钩的 `hookEnd` 重合时两个钩圆恰好外切，看起来互相挂住。

```vue
<script setup lang="ts">
import { computed, ref } from "vue";

const a = ref<{ hookEnd: { x: number }; extension: number } | null>(null);
/** B 的 hookEnd 与 A 的 hookEnd 重合 → 两钩咬合 */
const bX = computed(() => (a.value ? a.value.hookEnd.x + a.value.extension : 0));
</script>

<template>
  <svg viewBox="0 0 1070 135" style="width: 100%; height: auto" xmlns="http://www.w3.org/2000/svg">
    <SpringScale
      ref="a"
      :x="10"
      :y="40"
      :length="300"
      orientation="horizontal"
      :force="3"
      label="3"
    />
    <SpringScale
      :x="bX"
      :y="40"
      :length="300"
      orientation="horizontal"
      :force="3"
      mirror
      label="3"
      number-side="right"
    />
  </svg>
</template>
```

- 两台 `force` 给**同一个值**（这就是"示数相等"）；B 的刻度数字会自然反序（5 4 3 2 1 0），是镜像的正常结果；
- 水平时 `number-side` 是**上 / 下**列：默认 `left` 标在表身上侧、`right` 标在下侧——两台各标一侧才不打架；
- 想让两钩咬得更深：在 `bX` 基础上再沿轴靠近约 `0.5 × hookRadius`（`hookRadius` 也由组件暴露），改完**必须截图确认**；
- 竖直方向对拉同理，把 `hookEnd.x` / `extension` 换成 `y`。

### 配方 3：只画表身，自己接绳子 / 只在装置里露出一段

```html
<svg viewBox="0 0 104 305" style="height: 430px; width: auto">
  <SpringScale :x="40" :y="2" :length="300" :ring="false" :hook="false" :force="1.6" label="1.6" />
</svg>
```

`ring` / `hook` 关掉后，沿轴占位只剩外壳长（不再有 0.8S + 0.64S 的吊环与挂钩），viewBox 可以收得很紧，刻度数字也明显更大。

## 4. props 一览（长度类都是 viewBox 用户单位）

| prop                          | 默认            | 说明                                                                                    |
| ----------------------------- | --------------- | --------------------------------------------------------------------------------------- |
| `x` / `y`                     | `0` / `0`       | 外壳靠吊环那一端的外角位置                                                              |
| `length`                      | `300`           | 外壳长度（不含吊环与挂钩）；外壳宽自动 = `length / 5.5`                                 |
| `force` / `maxForce`          | `0` / `5`       | 示数（N）/ 量程（N）；指针位置 = `clamp(force / maxForce, 0, 1)`，挂钩外伸同步          |
| `division`                    | `0.2`           | 分度值（N）；主刻度数字步长由量程自动取（保证数字 ≤ 6 个）                              |
| `orientation`                 | `vertical`      | `vertical` 挂钩朝下 / `horizontal` 挂钩朝右                                             |
| `mirror`                      | `false`         | 沿轴整体镜像（对拉场景用，见配方 2）                                                    |
| `label`                       | `""`            | 读数框文本，**只给数值或符号**（`"2.4"`、`"F"`），单位 `N` 由组件补；数字正体、符号斜体 |
| `numberSide`                  | `left`          | 数字与读数框在哪一侧；竖直 = 左/右，水平 = 上/下                                        |
| `ring` / `hook`               | `true` / `true` | 是否画顶部吊环 / 底部挂钩                                                               |
| `scale`                       | `1`             | 整体缩放（长宽、刻度、字号一起缩；`x` / `y` 不受影响）                                  |
| `thickness`                   | `0`             | 外壳宽度；`0` = 自动；给大了夹回 `length / 5.5`（只能更窄）                             |
| `showNumbers` / `showPointer` | `true` / `true` | 是否画刻度数字与单位 `N` / 是否画指针                                                   |
| `color` / `accent`            | 设计系统变量    | 金属件颜色 / 指针与读数框强调色                                                         |

暴露坐标（父级 `<svg>` 坐标系，响应式）：`hookCenter`、`hookEnd`、`hookNeck`、`ringCenter`、`ringEnd`、`pointerPos`、`extension`、`hookRadius`。

## 5. 尺寸与字号（决定后排看不看得清）

- 组件内字号按外壳宽 `S` 定：**刻度数字 = 0.17S、单位 `N` = 0.175S、读数框 = 0.26S**；渲染后还要乘 `渲染宽 ÷ viewBox 宽`；
- 整机轴线长约 `6.9S`（零位）→ `9.2S`（半量程）→ `11.4S`（满量程），所以**竖直挂一整台、给到 430px 高时刻度数字只有约 8px**——这是 1 : 5.5 细长比例的必然结果，别指望学生读刻度；
- 三条实用规则：
  1. **`viewBox` 紧贴图形包围盒**（竖直整机约 `1.6S × 6.9~11.4S`），留大边 = 白送字号；
  2. **竖直单台用 `style="height: …px; width: auto"`**，不要 `width: 100%`（1 : 5.5 的图会按宽度撑高、顶破画布，552px 逻辑画布下必然溢出）；
  3. 讲"读数"就用 `label` 读数框（比刻度数字大 1.5 倍），并把整机给到能占满页高的尺寸；只做示意（如装置里一台小测力计）可关掉 `showNumbers`。
- 参考尺寸（实测）：竖挂整机 `length=300` → 零位约 379、示数 2.4 N 约 495、满量程约 621（用户单位）。

## 6. 坑速查

| 坑                                             | 记住                                                                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 写进 HTML（不在 `<svg>` 里）                   | 组件是 `<g>`，页面上什么都没有；也别用 ` ```comp ` 代码块                                                 |
| 挂钩被裁掉                                     | 示数越大挂钩伸得越长，`viewBox` 要按最大示数留                                                            |
| `mirror` 的位置算错                            | 图形会反向多伸出 `extension`；用 `hookEnd` / `extension` 算，别按"`x` 就是左边缘"                         |
| 竖直用 `width:100%`                            | 细长图按宽度撑高 → 溢出画布；用 `height` 定尺寸                                                           |
| 刻度数字太小                                   | 见第 5 节；要读数就用 `label` 读数框、并把整机放大                                                        |
| SVG 属性里的颜色写了带空格的 `rgba(1 2 3 / 4)` | UnoCSS attributify 会把分量当工具类，撑坏图形；SVG 属性里一律写无空格 `rgba(1,2,3,0.4)`（组件内部已守好） |

## 7. 自查

```bash
pnpm shots <课件> <页号>              # 截图看挂钩/咬合/读数框是否被裁
E2E_COURSE=<课件> pnpm exec playwright test e2e/layout-overflow.spec.ts
pnpm exec oxlint workspace/shared     # 组件侧静态检查
```
