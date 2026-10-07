# 手部组件 GripHand：怎么用（读这一篇就能上手，不用看组件源码）

> 什么时候读：课件里要出现**一只手捏住拉环 / 吊环 / 细绳并沿某个方向拉**（拉弹簧、拉测力计、拉绳、两物对拉）的**侧视图**时。
> 一律用共享 addon 的 `<GripHand>`，**不要手画手掌 / 手指 / 拇指**。
> props 全表见本篇第 4 节（不用读组件源码）；这一篇只讲"怎么用、怎么摆、怎么不踩坑"。

## 1. 先记住四件事

1. **只能在 `<svg>` 里用**：组件画出来的是 `<g>`，写成 HTML 元素页面上什么都没有；也**不能写成 ` ```comp ` 代码块**（代码块进不了 `<svg>`）。写法：`slides.md` 的静态 SVG 里直接写标签，或写进课件自己的 `components/*.vue`。
2. **`(x, y)` 就是捏合点**：传入的坐标 = **拇指与食指尖夹住拉环 / 细绳的那一点**，不用自己推算手掌偏移；环类物体请把坐标给在**拉环外缘**（不是环心），手朝外伸。
3. **手朝 `side` 方向伸出去**：`side="right"` 手在锚点右边、`left` 左边、`above` 上边、`below` 下边。空出来的那一侧几乎不占位（约 4 个用户单位）。
4. **手很小**：`scale=1` 时全长（指尖到袖口外缘）约 45 个**用户单位**（viewBox 单位）。在几百宽的 viewBox 里会缩成一小团，**该放大就放大**（见第 5 节）。

## 2. 最短写法

```html
<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  <!-- 手在右侧，捏住 (66, 65) 处的拉环向右拉 -->
  <GripHand :x="66" :y="65" side="right" />
</svg>
```

- 先画**被捏的物体**（环、绳、测力计），再写 `<GripHand>`——写在后面才会盖在上层，手指才"捏得住"；
- 锚点写死数字没问题；锚点依赖别的组件（如测力计吊环）时，用那个组件暴露的实时坐标（配方 1）。

## 3. 三个配方（都是课件里实测过的写法）

### 配方 1：捏住测力计吊环向右拉（水平）

要点：**锚点 = 吊环最外缘**（`SpringScale` 暴露的 `ringEnd.x`），手朝外；这样手不会盖住表身。测力计的用法见 [spring-scale.md](./spring-scale.md)。

```vue
<script setup lang="ts">
import { computed, ref } from "vue";

const HOOK_X = 82; // 挂钩端落在细线上
const AXIS_Y = 115; // 测力计轴线高度
const CASE_Y = AXIS_Y - 10; // 外壳宽 20 → 上沿 = 轴线 − 10

const scale = ref<{ extension: number; ringEnd: { x: number } } | null>(null);
/** mirror 时外壳位置 = 挂钩端 + extension（别按"x 就是左边缘"算） */
const scaleX = computed(() => HOOK_X + (scale.value?.extension ?? 0));
/** 吊环最右缘——手捏在这里 */
const ringEndX = computed(() => scale.value?.ringEnd.x ?? 0);
</script>

<template>
  <svg viewBox="0 70 336 186" xmlns="http://www.w3.org/2000/svg">
    <SpringScale
      ref="scale"
      :x="scaleX"
      :y="CASE_Y"
      :length="110"
      :force="2.4"
      orientation="horizontal"
      mirror
      label="2.4"
    />
    <GripHand :x="ringEndX" :y="AXIS_Y" side="right" />
  </svg>
</template>
```

（出处：`courses/3.2-friction/components/PulleyPullBoardSvg.vue` 第 7 页。）

### 配方 2：捏住弹簧左端拉环向左拉（水平，另一只手）

锚点 = 圆环的**左外缘**（环心 `(71, 65)`、半径 `5` → 锚点 `(66, 65)`），手朝左；换成蓝色以区别于另一侧的手。

```html
<circle cx="71" cy="65" r="5" stroke="#e2a846" stroke-width="2.2" fill="rgba(226,168,70,0.15)" />
<GripHand :x="66" :y="65" side="left" color="#60a5fa" fill="rgba(96,165,250,0.22)" />
```

（出处：`courses/3.3-newtons-third-law/components/SpringPullSvg.vue` 第 3 页。）

### 配方 3：竖直方向（向上提 / 向下拉）

`side` 换 `above` / `below`，锚点仍是绳 / 环上的捏合点：

```html
<!-- 手在细绳 (120, 40) 处向上提 -->
<GripHand :x="120" :y="40" side="above" />
<!-- 手在细绳 (120, 40) 处向下拉 -->
<GripHand :x="120" :y="40" side="below" flip />
```

- `above` / `below` 时手是**竖直**的（手臂朝上 / 朝下），`viewBox` 要按竖直方向留够（约 45 × `scale`）；
- `flip` 是**拇指与食指的上下朝向镜像**：需要换只手（手心朝另一侧）、或两台手对拉时用，改完**必须截图确认**朝向自然。

## 4. props 一览（长度类都是 viewBox 用户单位）

| prop                     | 默认                   | 说明                                                    |
| ------------------------ | ---------------------- | ------------------------------------------------------- |
| `x` / `y`                | `0` / `0`              | **捏合点**（拇指与食指尖夹住拉环 / 细绳的位置）         |
| `side`                   | `right`                | 手在锚点的哪一侧：`right` / `left` / `above` / `below`  |
| `scale`                  | `1`                    | 整体缩放（手形与线宽一起缩；`x` / `y` 不受影响）        |
| `color` / `fill`         | `#e2a846` / 同色半透明 | 手部轮廓线 / 填充色（暖金＝设计系统主色，另一只手换蓝） |
| `cuffColor` / `cuffFill` | `#94a3b8` / 同色半透明 | 手腕袖口轮廓 / 填充色                                   |
| `flip`                   | `false`                | 镜像拇指与食指的上下朝向（见配方 3）                    |

## 5. 尺寸与占位（决定后排看不看得清）

组件以锚点为原点、**只向 `side` 一侧延伸**，铺开范围约为（`s = scale`）：

| `side`  | 横向占位            | 纵向占位            |
| ------- | ------------------- | ------------------- |
| `right` | `x − 4s … x + 45s`  | `y − 11s … y + 11s` |
| `left`  | `x − 45s … x + 4s`  | `y − 11s … y + 11s` |
| `above` | `x − 11s … x + 11s` | `y − 45s … y + 4s`  |
| `below` | `x − 11s … x + 11s` | `y − 4s … y + 45s`  |

- 渲染后的大小还要乘"**渲染宽 ÷ viewBox 宽**"：`viewBox` 宽 `200`、图渲染成 `500px` 时，`scale=1` 的手约 110px（够清楚）；`viewBox` 宽 `700` 的整幅装置图里只有约 30px，**必须把 `scale` 提到 2～3** 才看得见手指；
- 同一幅图里两只手的 `scale` 要一致（否则大小不一，很扎眼）；
- 手**不要挤出 viewBox**：按上表给 `side` 方向留位置（这也是"手朝外、锚点给外缘"的另一个好处——延伸方向是空白区）。

## 6. 什么时候**不要**用

`GripHand` 只画一种手势：**侧视图里捏住环 / 绳往外拉**。下面这些手势各有专门画法，**不要硬套**：

- 手掌**按压 / 推**（手压在桌面上滑动、推沙发、推桌子）；
- 手**握**住立体物体（如手握水瓶）；
- 拔河、掰腕等需要**整个人物 / 手臂**的画面。

这些场景照旧在课件 `components/*.vue` 里画（例如 `courses/3.2-friction/components/HandOnTableSvg.vue`、`HandHoldingBottleSvg.vue`）。

## 7. 坑速查

| 坑                                       | 记住                                                                                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 写进 HTML（不在 `<svg>` 里）             | 组件是 `<g>`，页面上什么都没有；也别用 ` ```comp ` 代码块                                                                                |
| 又手画了一只手掌 / 手指                  | 教师要求用共享组件；"捏住往外拉"一律 `<GripHand>`                                                                                        |
| 锚点给了**环心**                         | 手会盖住拉环 / 挂钩：锚点给**外缘**，手朝外伸                                                                                            |
| 手画在物体**前面**（先写 `<GripHand>`）  | 手指被物体盖住、像浮在旁边：`<GripHand>` 写在被捏物体**之后**                                                                            |
| 手叠在浅色卡片 / 亮色物体上              | 手是**不透明**的（内部有固定深色打底 `#0f1425`，用来遮内部重叠线），压在亮底上会露出深色块；让手落在页面深色背景或物体之上，改完截图确认 |
| 手太小看不见                             | 手只有约 45 个用户单位，大 `viewBox` 里要调 `scale`（第 5 节）；两只手 `scale` 保持一致                                                  |
| 颜色 prop 写成带空格的 `rgba(1 2 3 / 4)` | UnoCSS attributify 会把分量当工具类、撑坏图形；**一律写无空格** `rgba(96,165,250,0.22)`（组件内部已守好）                                |
| 用 `side="left"` 却写 `flip`             | `flip` 只翻上下朝向，不改变手在哪一侧；换边用 `side`                                                                                     |
| 屏幕上出现给 AI 的备注                   | "手部已放大"这类说明写进代码注释，绝不上屏                                                                                               |

## 8. 自查

```bash
grep -rn "GripHand" courses/<课件>/components        # 手势场景是否都走了共享组件
pnpm shots <课件> <页号>                            # 截图看：手指是否捏在环上、朝向自然、没被裁
E2E_COURSE=<课件> pnpm exec playwright test e2e/layout-overflow.spec.ts
```
