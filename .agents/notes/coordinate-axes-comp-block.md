# 坐标轴组件 · 用代码块写（`comp`）

> 坐标组件的 props 常是嵌套数组/对象，写在 HTML 属性里又长又难读，还容易踩两个坑：
> **属性里的 `"` 要转义**、**LaTeX 反斜杠要写两个 `\\`**。共享 addon 注册了一个代码块转换器，
> 可以直接用 YAML 子集写：
>
> ⛔ **围栏前必须留一个空行**（紧跟 `<div …>` 时会整块被 markdown-it 的 HTML 块吞掉，**渲染成纯文本还不报错**）。
> 已踩过：`courses/1.4-acceleration` 等 6 个块当时全渲染成了文字。
>
> 写法与限制见下；想先知道选哪个组件 → [`coordinate-axes.md`](./coordinate-axes.md)。

## 写法

````markdown
```comp CoordAxes
x-range: [0, 6.2]
y-range: [0, 13]
x-axis: { quantity: t }
y-axis: { quantity: v }
view: { width: 400, height: 300 }
ticks: { x: [], y: [] }
curves:
  - points: [{ x: 0, y: 5 }, { x: 5.5, y: 5 }]
    stroke: var(--c-accent)
    width: 3.5
  - formula: t => 0.5 + 0.35 * t * t
    samples: 40
    stroke: var(--c-physics)
    width: 3.5
```
````

转换器会把它变成 `<CoordAxes v-bind="{...}" />`，**和手写属性完全等价**（`2.2-2.3-uniform-acceleration` 第 6 页就是这么写的）。

**写法约定**

| 想要                      | 怎么写                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| 组件名                    | 代码块 info 写 `comp <组件名>`（`comp CoordAxes`、`comp VtAreaRect`）                              |
| 数字 / 布尔 / 数组 / 对象 | 直接写 YAML：`width: 3.5`、`labels: false`、`[0, 6.2]`、`{ quantity: t }`                          |
| 字符串                    | 裸写或加引号都行；**LaTeX 用单引号**：`tex: '\frac{1}{2}at^2'`（一个反斜杠，不用像属性那样写两个） |
| 函数（函数曲线）          | `formula: t => 0.5 + 0.35 * t * t`（识别到 `=>` 就原样输出成箭头函数）                             |
| 图上的点                  | **必须是 `{ x, y }` 对象**：`points: [{ x: 0, y: 5 }, { x: 5.5, y: 5 }]`（不是 `[[0, 5]]`）        |
| 外层包一个容器 / 分步     | 写 `class: vt-host` 与 `click: 1` 两个特殊键（分别变成外层 `<div class="…">` 与 `v-click="1"`）    |
| 注释                      | `# 行尾注释`（`var(--c-accent)` 里的 `#` 不受影响）                                                |

**支持范围（YAML 子集）**：缩进映射、`- ` 列表、行内 `[...]` / `{...}`、单双引号字符串、裸字符串、
数字、`true/false/null`、`#` 注释。**不支持**锚点、多行标量、`|`/`>` 折叠块；JSON 也能直接贴（它是这个子集的子集）。
写错时构建会直接报错（信息里带组件名），不会静默画错。

⚠️ 转换器在 `workspace/shared/setup/transformers.ts`（属 `FILES_CHANGE_RESTART`）：**改了它必须重启 dev server**；
`pnpm shots` 与 E2E 每次都会起新进程，不受影响。
