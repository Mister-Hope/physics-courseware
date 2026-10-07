# 高中物理交互式课件

> **原创：张伯望（东北育才学校）** ｜ 人教版高中物理
>
> 🌐 **查看全部课件：<https://courseware.mister-hope.com/>**

浏览器里就能放的物理课件：不是 PPT 导出，而是**能点击、能拖动、能实时算数**的网页；
每节课一个独立目录，课件、教学思路、教案、逐字稿都放在一起，拿走就能直接上课。

---

## 一、这个仓库里有什么

| 内容                         | 说明                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| **交互式网页课件**           | 一课时一个课件，必修第一册已成套；点开网址就能放，手机/平板/电脑都行                                    |
| **可动手的交互组件**         | 弹簧测力计、打点计时器纸带、$v$-$t$ 图像动效、荡秋千、平行板电容器…… 学生点一下、拖一下，结果实时重算   |
| **教学思路 / 教案 / 逐字稿** | 每课 `content/` 目录下：教师最初的授课思路、教案、逐页讲稿                                              |
| **人教版教材库**             | [`resources/textbooks/`](resources/textbooks/) 教材正文与习题的 Markdown 录入，备课时检索、比对         |
| **给零代码老师的生成工具**   | [`resources/init-slidev-courseware/`](resources/init-slidev-courseware/) 不写代码也能生成自己的同类课件 |

### 课件覆盖范围

- **必修第一册：20 课时已全部完成**，按教材章序成套；
- **必修第三册**：已上线《电容器的电容》一课；
- **必修第二册、选择性必修第一至三册**：正在准备中。

具体有哪些课，打开在线站点按分册浏览即可；所有课件也都在仓库的 `courses/` 目录里，一课时一个文件夹。
每节课的页目表、用到的交互组件、授课提醒，看那一课的 `courses/<目录名>/README.md`。

### 每个课件目录里有什么

```text
courses/<分册-章节-英文名>/         # 如 1.4-acceleration（必修一 §1.4）
├── slides.md                       # 课件正文（网页课件的源文件）
├── components/                     # 这节课专用的交互式组件
├── images/                         # 实物照片等素材
├── style.css                       # 这节课特有的样式
├── README.md                       # 本课页目表 / 交互组件 / 授课提醒
└── content/
    ├── 思路.md                     # 教师最初的授课思路
    ├── 教案.md
    └── 逐字稿.md                   # 逐页讲稿
```

---

## 二、授权：可以自由拿来上课，但不能商用

本项目（含全部课件、组件与素材）采用
**[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans)**
（署名—非商业性使用—相同方式共享 4.0 国际）：

- ✅ **可以用来上课**：直接放给学生看、拷进自己的备课盘、印发给学生、在教研活动上展示，都欢迎；
- ✅ **可以改成自己的版本**：改题目、改例题、改动画都可以；
- ⚠️ **必须保留署名**：使用、传播或改编时，请保留「张伯望（东北育才学校）」与项目地址；
- ⚠️ **不得商用**：不得售卖课件、用于收费课程或付费培训、打包进商业产品、以广告分成等方式变现；
- ⚠️ **改后也要开源**：改编后的课件必须以同一协议公开完整源文件，不能只提供网页或 PDF。

[`LICENSE`](LICENSE) 是官方协议全文（英文法律文本，逐字未改）；中文要点与第三方内容版权说明
（教材录入、上游 AI 技能）见 [`NOTICE.md`](NOTICE.md)。

---

## 三、教师怎么用

1. **直接上课**：打开 <https://courseware.mister-hope.com/>，选分册、点课件，浏览器全屏（F11）即可投影。
   翻页用键盘 `←` `→`、空格或翻页笔；点击页面中央不翻页是 Slidev 的有意设计，不是故障。
2. **备课与教研**：每课的 `content/思路.md`（设计思路）、`教案.md`、`逐字稿.md` 可以直接读或打印。
3. **改成自己的课**：见下一节；也可以从
   [`resources/init-slidev-courseware/`](resources/init-slidev-courseware/) 起步——那是给**完全不懂代码的老师**准备的工具，
   从环境配置到生成课件有全流程指引，不需要看懂本仓库的工程结构。

> 想提建议、报错题、说自己想要哪一节，欢迎在 GitHub 提 Issue：<https://github.com/Mister-Hope/physics-courseware/issues>。

---

## 四、自己运行 / 改课件

需要电脑上装好 [Node.js](https://nodejs.org/) 24+ 与 [pnpm](https://pnpm.io/)：

```bash
pnpm install        # 装依赖（根目录 + 各课件）

# 启动入口网站或某个课件（http://localhost:3030，交互选择：🌐 入口网站 / 对应课件）
pnpm dev
```

改某一节课，只需改 `courses/<目录名>/slides.md`（文字、页面、公式都在里面）；
交互式动画放在该课的 `components/` 里。常用辅助命令：

```bash
pnpm slide 1.4-acceleration            # 看这节课的页目表（页号 / 标题 / 行号）
pnpm slide 1.4-acceleration 15         # 打印第 15 页源码
pnpm slide 1.4-acceleration --grep 斜率 # 哪个词在哪一页哪一行
pnpm shots 1.4-acceleration 15 18-20   # 批量截页图，自查版面
```

**新建一节课**：一条命令生成课件骨架，并自动登记进首页课件清单：

```bash
# 目录名自动推导 = 章节前缀 + 英文名（本示例即 o1-4.1-optics），无需手写
pnpm create:course --name optics --chapter-name "光的折射" \
  --chapter "4.1" --chapter-label "第四章 光" --textbook xx1

pnpm install        # 新课件是 workspace 包，必须先装依赖
pnpm dev optics     # 预览
```

参数说明见 `pnpm create:course --help`（`--textbook` 可写 `必修第三册` / `必修3` / `bx3`；
不想动任何共享文件加 `--no-register`，只预览不写盘加 `--dry-run`）。

### 测试与构建

```bash
pnpm test:e2e:install      # 首次运行先装 Chromium
pnpm test:e2e              # 逐页检查所有课件的元素是否超出 16:9 画面
E2E_COURSE=1.4-acceleration pnpm test:e2e   # 只测某个课件

pnpm build    # 构建入口网站 + 全部课件 → dist/
pnpm lint         # oxlint --fix + oxfmt + stylelint（slides.md 不参与格式化）
```

测试会为每个课件自动起一个 Slidev 服务，逐页在 1280×720 视口下测量每个元素的可见矩形是否越出
980×552 的画布（`v-click` 的「未展开」与「全部展开」两种状态都查），指出是哪一页、哪个元素、
超出多少像素。报告与截图输出到 `e2e/reports/`。

---

## 五、工程结构

```text
├── workspace/                  # 工程代码
│   ├── homepage/               # 入口网站（课程卡片 + 分册 Tab）
│   │   ├── index.html
│   │   ├── main.ts             # 课程卡片渲染 + tab 切换
│   │   ├── style.css           # 设计系统
│   │   └── courses.config.ts   # 课件配置（按分册组织，课件清单唯一来源）
│   └── shared/                 # 共享 addon（顶栏/底栏/设计系统/logo，跨课件复用）
├── .agents/                    # AI 技能正本与工程笔记（离线可用）
├── courses/                    # 课件目录（一课一课时）
├── resources/                  # 教学资源（教材库 + 零代码生成工具）
├── scripts/                    # build-all / check-skills / create-course / slide / shots
├── e2e/                        # 端到端测试（逐页检查元素是否超出 16:9 画面）
├── deploy/nginx.conf           # 站点 nginx 配置（多 SPA 回退 + 站内 404）
└── .github/workflows/          # CI（lint + build + e2e）与部署分支推送
```

工程约定、设计系统、已知的坑都写在 [AGENTS.md](AGENTS.md)，动手改之前先读。

### 技术栈

- [Slidev](https://sli.dev/) — 课件框架
- Vue 3 — 交互组件
- Vite 8 — 入口网站构建
- KaTeX — 数学公式
- pnpm — monorepo 管理
