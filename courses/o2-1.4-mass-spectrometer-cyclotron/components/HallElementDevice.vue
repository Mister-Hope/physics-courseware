<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 霍尔元件（P28 原理图 / P29 交互演示 / P31 例 6 题目图）
 *
 * 三维薄片：前面＝长 c（电流方向）× 宽 a（两个带电侧面间距），厚 d 沿磁场方向（垂直纸面向里）。 两块带电的侧面＝上表面（顶面，可见）与下表面（被前面遮住，只留贴底的一条），两者相距 a。
 *
 * 视觉主线（第 6 版，按教师意见：各落各位 + 恒流不断档 + 电场必须均匀）——**载流子一颗颗飞上来，然后匀速直穿**：
 *
 * 1. 载流子在薄片**内部的体相里**沿中线（y = 250）穿行：从一端的端面进来、另一端的端面出去。动效是一条**一次性播放的时间线** （点一下元件本身、翻一步、换类型、拖滑块都从头重播）： ①
 *    一开始两侧**一点电都没有**（堆积侧空着、另一侧也看不见任何电荷）； ② 前 6
 *    颗被洛伦兹力压弯、各自**直接贴到堆积层属于自己的那一格**上落定（不是都飞到同一个点再"闪现"成圆盘）—— 每落下 1 颗，另一侧正下方**同时 "感应"出 1
 *    个固定离子**，两侧一个一个同步填满； ③ 第 7 颗起不再偏转，沿中线匀速直穿整片（循环）—— **不等前 6 颗落定**：入口处始终是等时间间隔进来的，才看得出是恒定电流。 ⛔
 *    不要画成"从下表面起飞、斜穿整片落到上表面"：那读起来是把电荷从一侧搬到另一侧；堆积侧的电荷是**体相里的载流子被偏转过来**的。 实现：CSS `offset-path` +
 *    `animation-delay`（时间轴常量在 `<script>` 的 `ENTER_*` / `BEND_DUR` / `PASS_*`）；点元件时 `replay` 自增 ⟹
 *    `animKey` 变 ⟹ 带 key 的元素重挂 ⟹ 动画从第 0 秒重新播。
 * 2. 两侧电性：上表面（可见顶面）＝**堆积侧**——整面淡色电荷层 + 一排载流子（6 颗圆盘，载流子流送上来的）；
 *    另一侧（下表面，被前面遮住，只留贴底一条电荷边）＝一排**固定离子**（小方框＝钉在晶格上的位置，不会移动），与堆积侧的载流子**一一对应、数量相等**。 机制：载流子被洛伦兹力推到对面
 *    ⟹ 这一侧少了等量载流子 ⟹ 原先被它们中和掉的**电离施主**（N 型，正电中心）／**电离受主**（P 型，负电中心） 露了出来，于是这一侧显等量异号电。 ⛔
 *    不要写成"载流子被剥离、被搬走"：整块薄片仍旧到处是载流子、仍旧通着电流， 只是极小一部分（约 10⁻¹¹
 *    量级）在两表面之间重新分布；两侧电荷**等量**是必然的（体内电场必须终止在两个面电荷上，σ = εE）。
 * 3. 电场 → 平衡：`step ≥ 2` 在两带电面之间画横向电场箭头（由带正电的面指向带负电的面），`step ≥ 3` 画到最醒目；`step ≥ 3`
 *    再在薄片中央一颗载流子的几何中心画等大反向的 `qE` 与 `qvB`，旁边给一句结论 ——"电场力与洛伦兹力平衡 ⟹
 *    载流子不再偏转、电压不再增大"。切换载流子类型时两侧电性、电场方向、轨迹、标注整体镜像翻转。
 *
 * 物理：v = I/(nqS)、S = a·d、U = aBv = IB/(nqd)；取 a = 2.0e-3 m、d = 5.0e-4 m、n = 1e22 m^-3、q = 1.6e-19
 * C，默认 I = 1.6 mA、B = 0.5 T ⟹ v = 1.00 m/s、U = 1.00 mV。
 *
 * 版式：**左图右面板**（`mode="figure"` 时不渲染面板；`mode="figure" show-carriers` ＝ P28 原理页的静态过程图，只画
 * 载流子过程、不渲染面板与读数），面板定宽 320px：类型两个胶囊按钮同排、两条滑块并排（名 + 读数一行、滑杆一行）、U 与 v 两块读数并排。分步显隐一律只切 `visibility`
 * 占位（元素始终留在 DOM 里，真删真插会把已可见元素顶跑）。
 *
 * 高度：viewBox（0 36 720 430）未改 ⟹ 700px 容器下图栏 217.8px、三个 step 完全一致；第 3 步全部画在 SVG 内部，不占额外高度（上限 272px）。
 */
const {
  mode = "lab",
  step = 0,
  showCarriers = false,
} = defineProps<{
  /** `"lab"` 原理演示（含控件）；`"figure"` 干净题目图（只有薄片 / 尺寸 / 电流 / 磁场） */
  mode?: "figure" | "lab";
  /** 翻页步：≥1 一颗载流子偏转到堆积侧 + 两侧面异号电荷 + 两句标注；≥2 两侧面电势高低与横向电场；≥3 电场力与洛伦兹力平衡 */
  step?: number;
  /** `"figure"` 时是否画出载流子过程（P28 原理页用；默认 `false` ＝ 干净的题目图） */
  showCarriers?: boolean;
}>();

/** 元件参数（国际单位） */
const A_M = 2e-3;
const D_M = 5e-4;
const N_DENSITY = 1e22;
const Q_CHARGE = 1.6e-19;
/** 垂直于电流的横截面积 S = a·d */
const S_AREA = A_M * D_M;

const carrier = ref<"n" | "p">("n");
const bField = ref(0.5);
const currentMa = ref(1.6);

/** 载流子定向移动速率 v = I/(nqS)（m/s） */
const driftSpeed = computed(() => (currentMa.value * 1e-3) / (N_DENSITY * Q_CHARGE * S_AREA));
/** 霍尔电压 U = aBv = IB/(nqd)（V） */
const hallVoltage = computed(
  () => (currentMa.value * 1e-3 * bField.value) / (N_DENSITY * Q_CHARGE * D_M),
);

const uTex = computed(() => `U = ${(hallVoltage.value * 1e3).toFixed(2)}\\ \\text{mV}`);
const vTex = computed(() => `v = ${driftSpeed.value.toFixed(2)}\\ \\text{m/s}`);
const bTex = computed(() => `${bField.value.toFixed(2)}\\ \\text{T}`);
const iTex = computed(() => `${currentMa.value.toFixed(1)}\\ \\text{mA}`);

const isLab = computed(() => mode === "lab");
const stepNow = computed(() => Math.max(0, Math.min(step, 3)));
/** `figure` + `show-carriers`：P28 原理页的静态过程图（相当于 step ≥ 2 的画面，但没有面板与读数） */
const figureCarriers = computed(() => mode === "figure" && showCarriers);
/** 载流子偏转、堆积侧的电荷层，以及另一侧的等量异号电荷 + 两句物理标注 */
const showCharges = computed(() => figureCarriers.value || (isLab.value && stepNow.value >= 1));
/** 两条带电面之间的横向电场：step ≥ 2 建立（figure 原理图取 step 2 的画面） */
const showField = computed(() => figureCarriers.value || (isLab.value && stepNow.value >= 2));
/** 平衡态：电场足够强，把电场箭头画到最醒目 */
const fieldStrong = computed(() => isLab.value && stepNow.value >= 3);
/** 平衡态：一颗载流子上的 qE 与 qvB 等大反向 + 一句结论标注 */
const showBalance = computed(() => isLab.value && stepNow.value >= 3);
/** 两侧面电势高低与 U 读数（figure 原理图取 step ≥ 2 的静态画面） */
const showResult = computed(() => figureCarriers.value || (isLab.value && stepNow.value >= 2));
/** Figure 布局整体右移 42 抵消右侧留白（没有面板）；但画了载流子过程时右侧还有 U 尺寸线与两侧电势标注， 若不还原位移、最后一个字会越过 720 视框右边界被裁掉。 */
const figShift = computed(() =>
  isLab.value || figureCarriers.value ? "translate(0 0)" : "translate(42 0)",
);

/** 分步显隐：只切 visibility，元素始终留在 DOM 里（真删真插会把已可见元素顶跑） */
const fade = (on: boolean): { visibility: "visible" | "hidden" } => ({
  visibility: on ? "visible" : "hidden",
});

/** 载流子带负电（运动方向与电流相反）或带正电（与电流同向） */
const isN = computed(() => carrier.value === "n");
const carrierSign = computed(() => (isN.value ? "−" : "+"));
const carrierColor = computed(() => (isN.value ? "var(--c-velocity)" : "var(--c-danger)"));
/** 两种载流子都向上偏 ⟹ 上侧面堆积的电荷异号，电势高低随之翻转 */
const topSign = computed(() => (isN.value ? "−" : "+"));
const topColor = computed(() => (isN.value ? "var(--c-velocity)" : "var(--c-danger)"));
const bottomSign = computed(() => (isN.value ? "+" : "−"));
const bottomColor = computed(() => (isN.value ? "var(--c-danger)" : "var(--c-velocity)"));
const topPotential = computed(() => (isN.value ? "电势低" : "电势高"));
const bottomPotential = computed(() => (isN.value ? "电势高" : "电势低"));
/** 两句物理标注：贴着两条带电带，随载流子正负同步改写（内容，不是操作提示） */
const topNote = "载流子堆积";
const bottomNote = "另一侧等量异号电荷";

/** 元件在画布中的几何（viewBox 用户单位）：前面 c × a，厚度 d 沿 (+60, −48) 方向（斜二测） */
const PLATE_X0 = 165;
const PLATE_X1 = 495;
const PLATE_Y0 = 150;
const PLATE_Y1 = 350;
/** 顶面（＝上表面，可见，堆积侧）与右侧面的轮廓 */
const TOP_FACE = "M 165 150 L 225 102 H 555 L 495 150 Z";
const RIGHT_FACE = "M 495 150 L 555 102 V 302 L 495 350 Z";

interface Point {
  x: number;
  y: number;
}

/** 尺寸线与流向小三角箭头：尖端严格落在 tip，dir 为单位方向 */
const arrowHead = (tip: Point, dir: Point, len = 13, half = 5.5): string => {
  const bx = tip.x - dir.x * len;
  const by = tip.y - dir.y * len;

  return `${tip.x},${tip.y} ${bx - dir.y * half},${by + dir.x * half} ${bx + dir.y * half},${by - dir.x * half}`;
};

/**
 * ── 载流子流：一条一次性播放的时间线 ── 载流子在薄片**内部的体相里**沿电流方向穿行（走中线 y=250，离上下两个带电面等距），从一端的端面进来、另一端的端面出去。
 * 点一下元件（或翻到下一步）就从头放一遍，故事按顺序走完：
 *
 * ① **一开始两侧一点电荷都没有**：堆积侧空着，另一侧也空着（那些固定离子还都被载流子中和着，看不见）。 ② **一颗一颗飞上来**：前 6
 * 颗走到体相中央被洛伦兹力压弯，末段几乎竖直地贴上表面（堆积侧）； 落下 1 颗 ⟹ 堆积层多 1 颗载流子、它的正下方同时"感应"出 1 个固定离子（显异号电）…… 6 颗走完，两侧同步填满。
 * ③ **从第 7 颗起匀速直穿**：偏转的 6 颗一落定、电荷层建立，后面的载流子就不再偏转，沿中线匀速穿过整片（循环）。 ⚠️ 进场节奏从头到尾**恒定** `ENTER_GAP`（0.55
 * s 一颗）：第 7 颗不等 6 颗落定就进场（它进场时第 6 颗还在飞）， 否则入口会断档一阵、再"集体出发"，看起来就不像恒定电流。
 *
 * ⛔ 起点必须落在体相里（中线），不能贴在另一侧的表面上：那读起来就是"把电荷从一侧搬到另一侧"。
 */
/** 堆积层（上表面）上电荷所在的纵坐标 */
const PILE_Y = 126;
/** 堆积层 6 个位置：两端各离顶面斜边约 50 */
const PILE_SLOTS = [242, 288, 334, 380, 426, 472];
/** 载流子穿行的纵坐标：薄片中线（受力分析也画在这一带，所以载流子流必须画在那些箭头下面） */
const FLOW_Y = 250;
/** 入口 / 出口离端面的距离（端面＝电流进出的那条边） */
const FLOW_INSET = 10;
/** 入口横坐标：N 型电子向左漂（从右端进），P 型空穴向右漂（从左端进） */
const flowStartX = computed(() => (isN.value ? PLATE_X1 - FLOW_INSET : PLATE_X0 + FLOW_INSET));
/** 出口横坐标：与入口相对的那一端 */
const flowEndX = computed(() => (isN.value ? PLATE_X0 + FLOW_INSET : PLATE_X1 - FLOW_INSET));
/** Figure 静态帧（P28）拿堆积排的哪一格当代表轨迹（中间那格） */
const BEND_FIGURE_SLOT = 2;
/**
 * 6 颗被压上来的载流子**各落各位**：不再都飞到同一个点、再"闪现"成一个圆盘。次序是**先入口侧、后远端**—— 越早进入的载流子，体内电场还越弱（`qE` 小 ⟹ 合力大）⟹
 * 偏得越陡、越早贴到面上，所以从入口那一端往远端依次填满。 ⚠️ 入口在右还是在左取决于载流子种类：N 型电子向左漂、从右端进（`flowStartX = 485`）⟹ 先填最右那一格；P 型空穴
 * 向右漂、从左端进 ⟹ 顺序整个镜像过来（否则最陡的那颗会落到远端、最平的那颗落到入口侧）。
 */
const bendSlotOrder = computed(() => (isN.value ? [5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5]));

interface CubicPath {
  /** 起点 / 两个控制点 / 终点：三次贝塞尔 */
  p0: Point;
  c1: Point;
  c2: Point;
  p1: Point;
}

const cubicD = (p: CubicPath): string =>
  `M ${p.p0.x} ${p.p0.y} C ${p.c1.x} ${p.c1.y} ${p.c2.x} ${p.c2.y} ${p.p1.x} ${p.p1.y}`;

/**
 * 偏转轨迹：水平匀速 + 竖直匀加速 ⟹ 抛物线，y ∝ (Δx)²（起点切线水平、终点切线沿运动方向陡升）。 抛物线的两条切线交在两端的中点，等价的二次贝塞尔转成三次即可（起始斜率
 * 0、末段不再画成斜穿）。`endX` ＝ 这一颗最终贴在堆积层的哪一格 ⟹ 6 颗各有各的轨迹，末端切线越来越陡。
 */
const bendCurveTo = (endX: number): CubicPath => {
  const p0: Point = { x: flowStartX.value, y: FLOW_Y };
  const p1: Point = { x: endX, y: PILE_Y };
  const qx = (p0.x + p1.x) / 2;

  return {
    p0,
    c1: { x: p0.x + ((qx - p0.x) * 2) / 3, y: p0.y },
    c2: { x: p1.x + ((qx - p1.x) * 2) / 3, y: p1.y + ((p0.y - p1.y) * 2) / 3 },
    p1,
  };
};
const bendD = computed(() => cubicD(bendCurveTo(PILE_SLOTS[BEND_FIGURE_SLOT])));
/** 平衡后的路线：一条水平直线，从入口直穿到出口 */
const passD = computed(() => `M ${flowStartX.value} ${FLOW_Y} H ${flowEndX.value}`);

/** 三次贝塞尔上参数 t 处的点（figure 静态帧里把几颗载流子摆在轨迹上） */
const cubicAt = (p: CubicPath, t: number): Point => {
  const u = 1 - t;

  return {
    x: u ** 3 * p.p0.x + 3 * u * u * t * p.c1.x + 3 * u * t * t * p.c2.x + t ** 3 * p.p1.x,
    y: u ** 3 * p.p0.y + 3 * u * u * t * p.c1.y + 3 * u * t * t * p.c2.y + t ** 3 * p.p1.y,
  };
};

/** Figure 静态帧（P28 原理页）：轨迹上摆 4 颗，摆成"正在被压弯"的一刻 */
const FIG_DOT_TS = [0.16, 0.36, 0.56, 0.76];
const figDots = computed(() =>
  FIG_DOT_TS.map((t, index) => {
    const point = cubicAt(bendCurveTo(PILE_SLOTS[BEND_FIGURE_SLOT]), t);

    return { key: `he-dot-${index}`, x: point.x, y: point.y };
  }),
);

/**
 * ── 时间轴（秒）：恒流就该是**等时间间隔** ── 每 `ENTER_GAP` 秒有一颗载流子从端面进入，从第 1 颗起一直不断： · 前 6
 * 颗被压到上表面、各落各位（一次性动画），落定那一刻同位置的圆盘淡进来 —— 不跳、不闪； · 第 7 颗起不再偏转、沿中线匀速直穿，并且**不等前 6 颗落定**（第 7 颗进入时第 6
 * 颗还在飞）⟹ 入口处永远是 `k × ENTER_GAP` 的间距，看着才是恒定电流； · 直穿这一股用 `PASS_COUNT` 颗循环，每颗走完整片的时间正好是 `PASS_COUNT ×
 * ENTER_GAP` ⟹ 首尾相接，循环处没有接缝。
 */
const ENTER_FIRST = 0.3;
const ENTER_GAP = 0.55;
/** 一颗从入口被压到上表面所花的时间：6 颗都用 1.7 s 走完（竖直方向都上升 124，速度一样；陡的那颗只是水平跨距短、总路程短） */
const BEND_DUR = 1.7;
const PASS_COUNT = 4;
const PASS_DUR = PASS_COUNT * ENTER_GAP;
/**
 * 第 1 颗落定的时刻（＝堆积侧、另一侧第一颗电荷出现的时刻）：提前 0.14 s，也就是这颗载流子走到 92% 的时候。 圆盘用 0.34 s 淡入，所以载流子在 98%→100%
 * 淡出时圆盘已经有一半可见 ⟹ 交接处不会瞬间变暗；两者的中心严格重合，看不出"跳"。
 */

const FIRST_CHARGE_AT = ENTER_FIRST + BEND_DUR - 0.14;

/** 一次播放里的全部载流子：前 6 颗各走各的偏转轨迹（一次性），之后是循环直穿的 4 颗（紧接着第 6 颗进入的时刻出场） */
const flowDots = computed(() => {
  const firstPass = ENTER_FIRST + PILE_SLOTS.length * ENTER_GAP;

  return [
    ...bendSlotOrder.value.map((slot, index) => ({
      key: `he-bend-${index}`,
      path: cubicD(bendCurveTo(PILE_SLOTS[slot])),
      delay: `${(ENTER_FIRST + index * ENTER_GAP).toFixed(2)}s`,
      kind: "bend",
    })),
    ...Array.from({ length: PASS_COUNT }, (_, index) => ({
      key: `he-pass-${index}`,
      path: passD.value,
      delay: `${(firstPass + index * ENTER_GAP).toFixed(2)}s`,
      kind: "pass",
    })),
  ];
});
/** 第 index 个堆积位上的载流子（以及它正下方那颗固定离子）出现的时刻；figure 是静止的原理图，一律立刻出现 */
const chargeDelay = computed(() => {
  const delays: string[] = PILE_SLOTS.map(() => "0s");
  if (!isLab.value) return delays;
  bendSlotOrder.value.forEach((slot, order) => {
    delays[slot] = `${(FIRST_CHARGE_AT + order * ENTER_GAP).toFixed(2)}s`;
  });

  return delays;
});
/** 电荷层开始建立的时刻：薄片两面的着色也等到这一刻才淡进来（一开始两侧一点电都没有） */
const firstChargeDelay = computed(() => (isLab.value ? `${FIRST_CHARGE_AT.toFixed(2)}s` : "0s"));

/** 点元件本身（或翻步、换类型、调电流/磁场）就从头重播：key 一变，带 key 的元素重挂 ⟹ CSS 动画重新开始 */
const replay = ref(0);
const animKey = computed(() =>
  isLab.value
    ? `${replay.value}-${stepNow.value}-${carrier.value}-${currentMa.value.toFixed(1)}-${bField.value.toFixed(2)}`
    : "figure",
);
const replayAnimation = (): void => {
  replay.value += 1;
};

/**
 * ── 两侧面的电荷 ── 上表面（可见顶面）：一排载流子（实心圆盘＝可动的载流子，由载流子流一颗颗送上来的）。
 * 下表面（被前面遮住）：一排**固定离子**（方框＝钉在晶格上的位置，不会移动）——载流子被洛伦兹力推到对面以后， 这一侧少了等量的载流子，本来被中和的施主/受主离子就露了出来，于是显等量异号电。
 * ⛔ 不要写"载流子被剥离"：被推走的只是极小一部分载流子，另一侧也从来不是"空掉"，而是留下了离子。
 */
const BOTTOM_MARK_X = PILE_SLOTS;
/** 另一侧固定离子的高度：贴在下边之上，与电流箭头留出空隙 */
const BOTTOM_MARK_Y = 334;
/** 另一侧电荷边的高度：薄薄一条贴在下边上（这一面被前面遮住，只看得到一条边） */
const BOTTOM_EDGE_Y = 345;
/** 图内标注字号（viewBox 720 宽在 700px 容器里缩到约一半 ⟹ 字号要给足，还不带单位） */
const NOTE_FONT = 28;
/** 上表面堆积带标注 / 另一侧电荷标注的锚点（都贴在带电带外侧的空白处，不压住电荷） */
const TOP_NOTE_AT: Point = { x: 300, y: 82 };
const BOTTOM_NOTE_AT: Point = { x: 330, y: 366 };

/**
 * ── 横向电场（step ≥ 2，step ≥ 3 最醒目）── 两条带电面之间、薄片内部；方向恒由带正电的面指向带负电的面： N 型下表面为正 ⟹ 电场向上；P 型上表面为正 ⟹ 电场向下。
 * **匀强电场 ⟹ 箭头必须等间距**（6 条、间距 46，左右各离薄片内沿 50，关于中线 330 严格对称）：中间两格之间那道 46 的缝留给 qvB / qE
 * 的受力分析，两条力箭头就画在这道缝里 —— 不许为了给受力分析腾地方而把某两条箭头挤到一起（那就不是匀强电场了）。
 */
const E_ARROW_XS = [215, 261, 307, 353, 399, 445];
const E_ARROW_TOP_Y = 166;
const E_ARROW_BOTTOM_Y = 330;
/** 平衡（step ≥ 3）时电场箭头画到最醒目：更粗、更亮 */
const E_ARROW_WIDTH = computed(() => (fieldStrong.value ? 3.8 : 2.4));
const E_ARROW_OPACITY = computed(() => (fieldStrong.value ? 1 : 0.4));
const eField = computed(() =>
  E_ARROW_XS.map((x, index) => ({
    key: `he-e-${index}`,
    from: { x, y: isN.value ? E_ARROW_BOTTOM_Y : E_ARROW_TOP_Y },
    to: { x, y: isN.value ? E_ARROW_TOP_Y : E_ARROW_BOTTOM_Y },
  })),
);

/**
 * ── 平衡（step ≥ 3）── 取一颗载流子：几何中心落在薄片中心，正好压在中间那条轨迹上（两种类型都经过这里）。两个力都从这个
 * 中心起笔、等大反向：洛伦兹力指向堆积面（向上），电场力指向另一侧（向下）。
 */
const FORCE_CENTER: Point = { x: 330, y: 250 };
/** 力箭头的长度：两侧电场箭头间距只有 46、`qvB`/`qE` 的标注还要塞进这道缝，58 会顶到下面的电流箭头 */
const FORCE_LEN = 44;
const B_FORCE_TIP: Point = { x: FORCE_CENTER.x, y: FORCE_CENTER.y - FORCE_LEN };
const E_FORCE_TIP: Point = { x: FORCE_CENTER.x, y: FORCE_CENTER.y + FORCE_LEN };
const FORCE_FONT = 16;
/** 两个力的标注：居中压在箭头正上 / 正下（两侧只隔 46，放不下侧标；居中 + 深色描边才不会和电场箭头糊在一起） */
const B_FORCE_LABEL: Point = { x: FORCE_CENTER.x, y: B_FORCE_TIP.y - 10 };
const E_FORCE_LABEL: Point = { x: FORCE_CENTER.x, y: E_FORCE_TIP.y + 13 };
/** 平衡结论：一句话，画在薄片下方、另一侧标注的再下一行（都在 C_DIM_Y = 415 之上） */
const BALANCE_NOTE = "电场力与洛伦兹力平衡 ⟹ 载流子不再偏转、电压不再增大";
const BALANCE_AT: Point = { x: 330, y: 395 };
const BALANCE_FONT = 21;

/** 尺寸线（杆线 + 两端箭头，箭头尖端严格落在端点） */
const A_DIM_X = 112;
const C_DIM_Y = 415;
const D_DIM: [Point, Point] = [
  { x: 150, y: 130 },
  { x: 210, y: 82 },
];
const U_DIM_X = 612;

const A_HEADS = [
  arrowHead({ x: A_DIM_X, y: PLATE_Y0 }, { x: 0, y: -1 }),
  arrowHead({ x: A_DIM_X, y: PLATE_Y1 }, { x: 0, y: 1 }),
];
const C_HEADS = [
  arrowHead({ x: PLATE_X0, y: C_DIM_Y }, { x: -1, y: 0 }),
  arrowHead({ x: PLATE_X1, y: C_DIM_Y }, { x: 1, y: 0 }),
];
const D_HEADS = [
  arrowHead(D_DIM[0], { x: -0.781, y: 0.625 }),
  arrowHead(D_DIM[1], { x: 0.781, y: -0.625 }),
];
const U_HEADS = [
  arrowHead({ x: U_DIM_X, y: PLATE_Y0 }, { x: 0, y: -1 }),
  arrowHead({ x: U_DIM_X, y: PLATE_Y1 }, { x: 0, y: 1 }),
];
</script>

<template>
  <div class="he-wrap" :class="{ 'he-wrap-lab': isLab }">
    <div class="he-fig">
      <svg
        class="he-svg"
        viewBox="0 36 720 430"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        :style="{ '--he-arrive': `${BEND_DUR}s`, '--he-pass': `${PASS_DUR}s` }"
        @click="replayAnimation"
        aria-label="霍尔元件：电流沿长度方向通过薄片，磁场垂直纸面向里；薄片内部的载流子沿电流方向穿行，未平衡时被洛伦兹力压弯、一颗颗贴到上表面堆积，平衡后不再偏转、直接匀速穿过；另一侧同样多的固定离子因此露出，显出等量异号电荷，两表面间形成横向电场并不断增强，直到电场力与洛伦兹力平衡"
      >
        <!-- 题目图模式：内容整体右移，抵消右侧留白 -->
        <g :transform="figShift">
          <!-- 薄片：前面（长 c × 宽 a） -->
          <rect
            :x="PLATE_X0"
            :y="PLATE_Y0"
            :width="PLATE_X1 - PLATE_X0"
            :height="PLATE_Y1 - PLATE_Y0"
            fill="var(--c-surface)"
            stroke="var(--c-neutral-300)"
            stroke-width="2.4"
          />
          <!-- 薄片：顶面（＝上侧面，长 c × 厚 d），载流子就贴在这一面上 -->
          <path
            :d="TOP_FACE"
            fill="var(--c-neutral-700)"
            stroke="var(--c-neutral-300)"
            stroke-width="2.4"
          />
          <!-- 薄片：右侧面（厚 d × 宽 a） -->
          <path
            :d="RIGHT_FACE"
            fill="var(--c-neutral-900)"
            stroke="var(--c-neutral-300)"
            stroke-width="2.4"
          />
          <!-- step ≥ 1：上侧面（堆积侧）整面带电；另一侧被前面遮住，只在下边上留一条薄薄的电荷边（那层是固定离子，不是载流子） -->
          <g :style="fade(showCharges)">
            <g
              :key="`he-tint-${animKey}`"
              class="he-charge-in"
              :style="{ animationDelay: firstChargeDelay }"
            >
              <path :d="TOP_FACE" :fill="topColor" opacity="0.3" />
              <line
                :x1="PLATE_X0 + 4"
                :y1="BOTTOM_EDGE_Y"
                :x2="PLATE_X1 - 4"
                :y2="BOTTOM_EDGE_Y"
                :stroke="bottomColor"
                stroke-width="4"
                stroke-linecap="round"
                opacity="0.6"
              />
            </g>
          </g>
          <!-- 轮廓重描：色带不盖住薄片的边 -->
          <rect
            :x="PLATE_X0"
            :y="PLATE_Y0"
            :width="PLATE_X1 - PLATE_X0"
            :height="PLATE_Y1 - PLATE_Y0"
            fill="none"
            stroke="var(--c-neutral-300)"
            stroke-width="2.4"
          />
          <path :d="TOP_FACE" fill="none" stroke="var(--c-neutral-300)" stroke-width="2.4" />
          <!--
            step ≥ 1：载流子流 —— 从一端的端面进来、在薄片体相里沿中线穿行。点一下元件就从头放一遍：
            前 6 颗被洛伦兹力压弯、末段贴上表面（堆积侧）落定，6 颗走完以后剩下的匀速直穿整片。
            画在电场箭头**下面**：箭头是背景场，别被载流子打断。
          -->
          <g :style="fade(showCharges)">
            <!-- figure（P28 原理页）：静态帧 —— 轨迹 + 4 颗"正在偏转"的载流子 -->
            <template v-if="!isLab">
              <path
                :d="bendD"
                fill="none"
                :stroke="carrierColor"
                stroke-width="2.2"
                stroke-opacity="0.4"
                stroke-linecap="round"
              />
              <g v-for="dot in figDots" :key="dot.key" :transform="`translate(${dot.x} ${dot.y})`">
                <circle r="9.5" :fill="carrierColor" stroke="var(--c-bg)" stroke-width="1.6" />
                <text
                  y="0"
                  font-size="13"
                  text-anchor="middle"
                  dominant-baseline="central"
                  fill="var(--c-bg)"
                  font-family="KaTeX_Main"
                >
                  {{ carrierSign }}
                </text>
              </g>
            </template>
            <!-- lab（P29 交互页）：一条时间线 —— 点元件、翻步、换类型、调 I/B 都从头重播 -->
            <template v-else>
              <g
                v-for="dot in flowDots"
                :key="`${dot.key}-${animKey}`"
                class="he-flow"
                :class="dot.kind === 'bend' ? 'he-flow-bend' : 'he-flow-pass'"
                :style="{ offsetPath: `path('${dot.path}')`, animationDelay: dot.delay }"
              >
                <circle r="9.5" :fill="carrierColor" stroke="var(--c-bg)" stroke-width="1.6" />
                <text
                  y="0"
                  font-size="13"
                  text-anchor="middle"
                  dominant-baseline="central"
                  fill="var(--c-bg)"
                  font-family="KaTeX_Main"
                >
                  {{ carrierSign }}
                </text>
              </g>
            </template>
          </g>
          <!-- step ≥ 2：薄片内部的横向电场（由带正电的面指向带负电的面）；step ≥ 3 平衡时最醒目 -->
          <g :style="fade(showField)">
            <g
              :key="`he-field-${animKey}`"
              class="he-charge-in"
              :style="{ animationDelay: firstChargeDelay }"
            >
              <CourseArrow
                v-for="arrow in eField"
                :key="arrow.key"
                :from="arrow.from"
                :to="arrow.to"
                stroke="var(--c-physics)"
                :stroke-width="E_ARROW_WIDTH"
                :opacity="E_ARROW_OPACITY"
              />
              <text
                x="198"
                y="200"
                font-size="24"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--c-physics)"
                font-family="KaTeX_Math"
                font-style="italic"
                stroke="var(--c-bg)"
                stroke-width="4"
                paint-order="stroke"
              >
                E
              </text>
            </g>
          </g>
          <!-- step ≥ 1：上表面（堆积侧）的电荷层 —— 一排堆上去的载流子（载流子流送上来的一颗颗） -->
          <g :style="fade(showCharges)">
            <g
              v-for="(x, index) in PILE_SLOTS"
              :key="`he-top-${index}-${animKey}`"
              class="he-charge-in"
              :style="{ animationDelay: chargeDelay[index] }"
              :transform="`translate(${x} ${PILE_Y})`"
            >
              <circle r="9" :fill="topColor" />
              <text
                y="0"
                font-size="13"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--c-bg)"
                font-family="KaTeX_Main"
              >
                {{ topSign }}
              </text>
            </g>
            <!--
              step ≥ 1：另一侧的电荷 —— 不是载流子，而是载流子被推到对面以后**没被中和的固定离子**：
              N 型是电离的施主（正电中心），P 型是电离的受主（负电中心）。
              方框＝钉在晶格上的位置、不会移动（粒子的圆盘＝可以动的载流子）；
              x 与堆积层一一对应（一颗载流子挪上去，正下方露出一个离子），所以两侧数量天然相等。
            -->
            <g
              v-for="(x, index) in BOTTOM_MARK_X"
              :key="`he-bface-${index}-${animKey}`"
              class="he-charge-in"
              :style="{ animationDelay: chargeDelay[index] }"
              :transform="`translate(${x} ${BOTTOM_MARK_Y})`"
            >
              <rect
                x="-8"
                y="-8"
                width="16"
                height="16"
                rx="2.5"
                :fill="bottomColor"
                fill-opacity="0.16"
                :stroke="bottomColor"
                stroke-width="1.2"
                stroke-opacity="0.7"
              />
              <text
                y="0"
                font-size="11.5"
                text-anchor="middle"
                dominant-baseline="central"
                :fill="bottomColor"
                font-family="KaTeX_Main"
              >
                {{ bottomSign }}
              </text>
            </g>
          </g>
          <!-- step ≥ 1：两句物理标注 —— 一句说堆积侧，一句说另一侧显的是等量异号电荷；跟第一颗电荷一起淡进来 -->
          <g :style="fade(showCharges)">
            <g
              :key="`he-note-${animKey}`"
              class="he-charge-in"
              :style="{ animationDelay: firstChargeDelay }"
            >
              <text
                :x="TOP_NOTE_AT.x"
                :y="TOP_NOTE_AT.y"
                :font-size="NOTE_FONT"
                text-anchor="middle"
                dominant-baseline="central"
                :fill="topColor"
                stroke="var(--c-bg)"
                stroke-width="6"
                paint-order="stroke"
                font-weight="700"
              >
                {{ topNote }}
              </text>
              <text
                :x="BOTTOM_NOTE_AT.x"
                :y="BOTTOM_NOTE_AT.y"
                :font-size="NOTE_FONT"
                text-anchor="middle"
                dominant-baseline="central"
                :fill="bottomColor"
                stroke="var(--c-bg)"
                stroke-width="6"
                paint-order="stroke"
                font-weight="700"
              >
                {{ bottomNote }}
              </text>
            </g>
          </g>
          <!-- step ≥ 3：平衡 —— 一颗载流子上 qE 与 qvB 等大反向 ⟹ 不再偏转、电压不再增大 -->
          <g :style="fade(showBalance)">
            <g
              :key="`he-force-${animKey}`"
              class="he-charge-in"
              :style="{ animationDelay: firstChargeDelay }"
            >
              <circle
                :cx="FORCE_CENTER.x"
                :cy="FORCE_CENTER.y"
                r="9"
                :fill="carrierColor"
                stroke="var(--c-bg)"
                stroke-width="1.6"
              />
              <text
                :x="FORCE_CENTER.x"
                :y="FORCE_CENTER.y"
                font-size="16"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--c-bg)"
                font-family="KaTeX_Main"
              >
                {{ carrierSign }}
              </text>
              <CourseArrow
                :from="FORCE_CENTER"
                :to="B_FORCE_TIP"
                stroke="var(--c-force)"
                :stroke-width="4"
              />
              <CourseArrow
                :from="FORCE_CENTER"
                :to="E_FORCE_TIP"
                stroke="var(--c-force)"
                :stroke-width="4"
              />
              <text
                :x="B_FORCE_LABEL.x"
                :y="B_FORCE_LABEL.y"
                :font-size="FORCE_FONT"
                text-anchor="middle"
                fill="var(--c-force)"
                font-family="KaTeX_Math"
                font-style="italic"
                stroke="var(--c-bg)"
                stroke-width="5"
                paint-order="stroke"
              >
                qvB
              </text>
              <text
                :x="E_FORCE_LABEL.x"
                :y="E_FORCE_LABEL.y"
                :font-size="FORCE_FONT"
                text-anchor="middle"
                fill="var(--c-force)"
                font-family="KaTeX_Math"
                font-style="italic"
                stroke="var(--c-bg)"
                stroke-width="5"
                paint-order="stroke"
              >
                qE
              </text>
              <text
                :x="BALANCE_AT.x"
                :y="BALANCE_AT.y"
                :font-size="BALANCE_FONT"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--c-text)"
                stroke="var(--c-bg)"
                stroke-width="6"
                paint-order="stroke"
              >
                {{ BALANCE_NOTE }}
              </text>
            </g>
          </g>
          <!-- 电流方向（沿长度方向通过元件）；标注放在箭头靠近头部处：中央那条"受力走廊"整条留给 qvB / qE -->
          <CourseArrow
            :from="{ x: 205, y: 316 }"
            :to="{ x: 455, y: 316 }"
            stroke="var(--c-accent)"
            :stroke-width="4"
          />
          <text
            x="470"
            y="316"
            font-size="26"
            text-anchor="middle"
            dominant-baseline="central"
            fill="var(--c-accent)"
            font-family="KaTeX_Math"
            font-style="italic"
            stroke="var(--c-bg)"
            stroke-width="4"
            paint-order="stroke"
          >
            I
          </text>
          <!-- 磁场方向：单个 ⊗（垂直纸面向里，即沿厚度 d） -->
          <FieldMark :x="400" :y="58" dir="in" label="B" :label-size="24" />
          <!-- 尺寸线：宽 a（两带电侧面间距） -->
          <g fill="none" stroke="var(--c-text-dim)" stroke-width="1.6">
            <line :x1="PLATE_X0" :y1="PLATE_Y0" :x2="A_DIM_X" :y2="PLATE_Y0" />
            <line :x1="PLATE_X0" :y1="PLATE_Y1" :x2="A_DIM_X" :y2="PLATE_Y1" />
            <line :x1="A_DIM_X" :y1="PLATE_Y0" :x2="A_DIM_X" :y2="PLATE_Y1" />
          </g>
          <polygon :points="A_HEADS[0]" fill="var(--c-text-dim)" />
          <polygon :points="A_HEADS[1]" fill="var(--c-text-dim)" />
          <text
            :x="A_DIM_X - 14"
            :y="(PLATE_Y0 + PLATE_Y1) / 2"
            font-size="26"
            text-anchor="end"
            dominant-baseline="central"
            fill="var(--c-text-dim)"
            font-family="KaTeX_Math"
            font-style="italic"
          >
            a
          </text>
          <!-- 尺寸线：长 c（电流方向） -->
          <g fill="none" stroke="var(--c-text-dim)" stroke-width="1.6">
            <line :x1="PLATE_X0" :y1="PLATE_Y1" :x2="PLATE_X0" :y2="C_DIM_Y" />
            <line :x1="PLATE_X1" :y1="PLATE_Y1" :x2="PLATE_X1" :y2="C_DIM_Y" />
            <line :x1="PLATE_X0" :y1="C_DIM_Y" :x2="PLATE_X1" :y2="C_DIM_Y" />
          </g>
          <polygon :points="C_HEADS[0]" fill="var(--c-text-dim)" />
          <polygon :points="C_HEADS[1]" fill="var(--c-text-dim)" />
          <text
            :x="(PLATE_X0 + PLATE_X1) / 2"
            :y="C_DIM_Y + 30"
            font-size="26"
            text-anchor="middle"
            dominant-baseline="central"
            fill="var(--c-text-dim)"
            font-family="KaTeX_Math"
            font-style="italic"
          >
            c
          </text>
          <!-- 尺寸线：厚 d（沿磁场方向） -->
          <g fill="none" stroke="var(--c-text-dim)" stroke-width="1.6">
            <line :x1="PLATE_X0" :y1="PLATE_Y0" :x2="D_DIM[0].x" :y2="D_DIM[0].y" />
            <line x1="225" y1="102" :x2="D_DIM[1].x" :y2="D_DIM[1].y" />
            <line :x1="D_DIM[0].x" :y1="D_DIM[0].y" :x2="D_DIM[1].x" :y2="D_DIM[1].y" />
          </g>
          <polygon :points="D_HEADS[0]" fill="var(--c-text-dim)" />
          <polygon :points="D_HEADS[1]" fill="var(--c-text-dim)" />
          <text
            x="166"
            y="89"
            font-size="26"
            text-anchor="middle"
            dominant-baseline="central"
            fill="var(--c-text-dim)"
            font-family="KaTeX_Math"
            font-style="italic"
          >
            d
          </text>
          <!-- 霍尔电压：两侧面电势高低与 U -->
          <g :style="fade(showResult)">
            <line
              :x1="U_DIM_X"
              :y1="PLATE_Y0"
              :x2="U_DIM_X"
              :y2="PLATE_Y1"
              stroke="var(--c-accent)"
              stroke-width="2"
            />
            <polygon :points="U_HEADS[0]" fill="var(--c-accent)" />
            <polygon :points="U_HEADS[1]" fill="var(--c-accent)" />
            <text
              :x="U_DIM_X + 18"
              :y="(PLATE_Y0 + PLATE_Y1) / 2"
              font-size="26"
              text-anchor="start"
              dominant-baseline="central"
              fill="var(--c-accent)"
              font-family="KaTeX_Math"
              font-style="italic"
            >
              U
            </text>
            <text
              :x="U_DIM_X + 18"
              :y="PLATE_Y0 + 22"
              font-size="23"
              text-anchor="start"
              dominant-baseline="central"
              :fill="topColor"
            >
              {{ topPotential }}
            </text>
            <text
              :x="U_DIM_X + 18"
              :y="PLATE_Y1 - 22"
              font-size="23"
              text-anchor="start"
              dominant-baseline="central"
              :fill="bottomColor"
            >
              {{ bottomPotential }}
            </text>
          </g>
        </g>
      </svg>
    </div>

    <div v-if="isLab" class="he-panel">
      <div class="he-types">
        <button type="button" class="he-type" :class="{ 'he-type-on': isN }" @click="carrier = 'n'">
          带负电载流子
        </button>
        <button
          type="button"
          class="he-type"
          :class="{ 'he-type-on': !isN }"
          @click="carrier = 'p'"
        >
          带正电载流子
        </button>
      </div>

      <div class="he-sliders">
        <label class="he-slider">
          <span class="he-slider-head">
            <span class="he-slider-name"><Latex tex="B" /></span>
            <span class="he-slider-val"><Latex :tex="bTex" /></span>
          </span>
          <input
            v-model.number="bField"
            class="he-range"
            type="range"
            min="0.1"
            max="1"
            step="0.05"
          />
        </label>
        <label class="he-slider">
          <span class="he-slider-head">
            <span class="he-slider-name"><Latex tex="I" /></span>
            <span class="he-slider-val"><Latex :tex="iTex" /></span>
          </span>
          <input
            v-model.number="currentMa"
            class="he-range"
            type="range"
            min="0.5"
            max="5"
            step="0.1"
          />
        </label>
      </div>

      <div class="he-readouts" :class="{ 'he-hidden': !showResult }">
        <span class="he-u"><Latex :tex="uTex" /></span>
        <span class="he-v"><Latex :tex="vTex" /></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.he-wrap {
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

.he-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.he-svg {
  display: block;
  width: 100%;
  height: auto;
}

/* 保险：容器比 700px 宽时，页面 .fig-h-lg 的 300px 上限会把组件顶到 300px（> 290px 预算），
   这里给 lab（带面板）单独压到 272px；700px 容器下图栏只有 217.8px，这条永远不生效。
   `mode="figure"`（P28 原理图 / P31 题目图）不受影响，仍按页面上限 300px 渲染。 */
.he-wrap-lab .he-svg {
  max-height: 272px;

  /* 点一下元件就从头重播一遍（教师上课会反复点），给个可点的光标 */
  cursor: pointer;
}

/* 面板：固定窄栏（不参与纵向撑高 —— 组件总高由图栏决定），内部每一行都紧凑不折行 */
.he-panel {
  display: flex;
  flex: 0 0 320px;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;
}

.he-types {
  display: flex;
  gap: 0.4rem;
}

.he-type {
  flex: 1 1 0;

  padding: 0.22rem 0.3rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-weight: 700;
  font-size: 0.8rem;
  white-space: nowrap;

  cursor: pointer;
}

.he-type-on {
  border-color: var(--c-accent);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.he-sliders {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.he-slider {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.he-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;
}

.he-slider-name {
  font-weight: 700;
}

.he-slider-val {
  color: var(--c-text);
  font-weight: 800;
  font-size: 0.85rem;
  white-space: nowrap;
}

.he-range {
  width: 100%;
  min-width: 0;
  height: 1rem;

  /* UA 给 range 留了 margin，会在窄栏里顶出 2px（实测） */
  margin: 0;

  cursor: pointer;

  accent-color: var(--c-accent);
}

.he-readouts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem;
}

.he-u,
.he-v {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  padding: 0.22rem 0.4rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);

  font-size: 0.85rem;
  line-height: 1.4;
  white-space: nowrap;
}

.he-u {
  border-color: var(--c-accent);
  color: var(--c-accent);
  font-weight: 800;
}

.he-v {
  color: var(--c-text-dim);
}

.he-hidden {
  visibility: hidden;
}

/* 载流子流：沿 offset-path 走（偏转阶段走抛物线、平衡之后走直线）。为什么用 offset-path：
   轨迹是曲线，靠 transform 逐帧算会脱轨。时间轴见 <script> 里的 ENTER_* / BEND_DUR / PASS_*。 */
.he-flow {
  opacity: 0;
  offset-distance: 0%;
  offset-rotate: 0deg;
}

/* 前 6 颗：一次性 —— 从入口一路压弯、贴上表面（堆积侧），落到堆积层就淡出（并进那一排） */
.he-flow-bend {
  animation: he-flow-bend var(--he-arrive, 1.7s) cubic-bezier(0.4, 0, 0.6, 1) 1 both;
}

/* 剩下 4 颗：电荷层一建立就匀速直穿、循环 —— 但**不等**前 6 颗落定，第 7 颗该进场时就进场
   （延迟在 <script> 里算，间距与前面完全一样 ⟹ 看着才是恒定电流） */
.he-flow-pass {
  animation: he-flow-pass var(--he-pass, 2.2s) linear infinite both;
}

/* 电荷层：一颗载流子落定 ⟹ 堆积侧多一颗、另一侧同时"感应"出一颗固定离子。
   一开始两侧一点电都没有，所以整组从 opacity 0 起、按各自的延迟一个个淡进来。 */
.he-charge-in {
  animation: he-charge-in 0.34s ease-out 1 both;
}

/* 兜底：老浏览器不支持 CSS 运动路径时就别画了（静止的载流子会全堆在入口），
   画面只剩堆积层与两侧电荷，语义仍然成立。 */
@supports not (offset-path: path("M 0 0 L 1 1")) {
  .he-flow {
    display: none;
  }
}

/* 两端淡入淡出：载流子从端面"进入"薄片、到达堆积层"并入"那一排，都不该突兀地蹦出来/消失 */
@keyframes he-flow-bend {
  0% {
    opacity: 0;
    offset-distance: 0%;
  }

  9% {
    opacity: 1;
  }

  98% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    offset-distance: 100%;
  }
}

@keyframes he-flow-pass {
  0% {
    opacity: 0;
    offset-distance: 0%;
  }

  7% {
    opacity: 1;
  }

  93% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    offset-distance: 100%;
  }
}

@keyframes he-charge-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
