<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 霍尔元件（P26 原理图 / P27 交互演示 / P28 例 6 题目图）
 *
 * 三维薄片：前面＝长 c（电流方向）× 宽 a（两个带电侧面间距），厚 d 沿磁场方向（垂直纸面向里）。
 *
 * 画法（两轮迭代的落点）：
 *
 * 1. 载流子**从被剥离的那一面起笔**：3 条轨迹的起点落在下表面带电层（剥离色带上沿）上、紧贴着那一层，出发时约 45°
 *    向上飞出（电子向左上、空穴向右上），再被洛伦兹力压弯、末段与上表面平行地贴进堆积带；整组轨迹仍用 `<clipPath>` 裁到薄片轮廓（前面 ∪
 *    顶面），任何线条都不会穿出元件表面；小球用 CSS `offset-path` 沿**同一条三次 贝塞尔曲线**移动，永不脱轨。
 * 2. 两侧面电性：上侧面是可见的顶面 —— 整面淡色"堆积"带 + 一排密集的载流子（实心球）；下侧面被前面遮住 —— 贴着下边的 淡色"剥离"带 + 一排**不可动离子**（空心圈 +
 *    异号），语义是"载流子被剥离走了、这一面因此带上相反电性"。两句物理标注 （`载流子堆积` / `载流子剥离→留下正离子`）随 N / P
 *    型同步改写：光画一面带电，学生只会以为"另一面凭空带正电"。
 * 3. 电场 → 平衡：`step ≥ 2` 在两条带电面之间画出横向电场箭头（方向由带正电的面指向带负电的面），`step ≥ 3` 把它们画到 最醒目；`step ≥ 3`
 *    再在一颗载流子的几何中心画等大反向的 `qE` 与 `qvB`，旁边给一句结论 ——"电场力与洛伦兹力平衡 ⟹
 *    载流子不再偏转、电压不再增大"。这就是"电压为什么不再增大"的那句话。切换载流子类型时两侧电性、电场方向、两句标注 整体翻转。
 *
 * 物理：v = I/(nqS)、S = a·d、U = aBv = IB/(nqd)；取 a = 2.0e-3 m、d = 5.0e-4 m、n = 1e22 m^-3、q = 1.6e-19
 * C，默认 I = 1.6 mA、B = 0.5 T ⟹ v = 1.00 m/s、U = 1.00 mV。
 *
 * 版式：**左图右面板**（`mode="figure"` 时不渲染面板；`mode="figure" show-carriers` ＝ P26 原理页的静态过程图，只画
 * 载流子过程、不渲染面板与读数），面板定宽 320px：类型两个胶囊按钮同排、两条滑块并排（名 + 读数一行、滑杆一行）、U 与 v 两块读数并排。分步显隐一律只切 `visibility`
 * 占位（元素始终留在 DOM 里，真删真插会把已可见元素顶跑）。
 *
 * 高度：viewBox 未改（0 36 720 430）⟹ 700px 容器下图栏 217.8px、三个 step 完全一致；第 3 步全部画在 SVG 内部，不占 额外高度（上限 272px）。
 */
const {
  mode = "lab",
  step = 0,
  showCarriers = false,
} = defineProps<{
  /** `"lab"` 原理演示（含控件）；`"figure"` 干净题目图（只有薄片 / 尺寸 / 电流 / 磁场） */
  mode?: "figure" | "lab";
  /** 翻页步：≥1 载流子被剥离 + 两侧面堆积/剥离电荷 + 两句标注；≥2 两侧面电势高低与横向电场；≥3 电场力与洛伦兹力平衡 */
  step?: number;
  /** `"figure"` 时是否画出载流子过程（P26 原理页用；默认 `false` ＝ 干净的题目图） */
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
/** `figure` + `show-carriers`：P26 原理页的静态过程图（相当于 step ≥ 2 的画面，但没有面板与读数） */
const figureCarriers = computed(() => mode === "figure" && showCarriers);
/** 载流子偏转与两侧面堆积 / 剥离电荷 + 两句物理标注 */
const showCharges = computed(() => figureCarriers.value || (isLab.value && stepNow.value >= 1));
/** 两条带电面之间的横向电场：step ≥ 2 建立（figure 原理图取 step 2 的画面） */
const showField = computed(() => figureCarriers.value || (isLab.value && stepNow.value >= 2));
/** 平衡态：电场足够强，把电场箭头画到最醒目 */
const fieldStrong = computed(() => isLab.value && stepNow.value >= 3);
/** 平衡态：一颗载流子上的 qE 与 qvB 等大反向 + 一句结论标注 */
const showBalance = computed(() => isLab.value && stepNow.value >= 3);
/** 两侧面电势高低与 U 读数（figure 原理图取 step ≥ 2 的静态画面） */
const showResult = computed(() => figureCarriers.value || (isLab.value && stepNow.value >= 2));
/** 轨迹组：lab 全程都在（step 0 是还没偏转的水平直线）；figure 只有 show-carriers 才画 */
const showFlow = computed(() => isLab.value || figureCarriers.value);
/** Figure 布局整体右移 42 抵消右侧留白（没有面板）；但画了载流子过程时右侧还有 U 尺寸线与两侧电势标注， 若不还原位移、最后一个字会越过 720 视框右边界被裁掉。 */
const figShift = computed(() =>
  isLab.value || figureCarriers.value ? "translate(0 0)" : "translate(42 0)",
);

/** 分步显隐：只切 visibility，元素始终留在 DOM 里（真删真插会把已可见元素顶跑） */
const fade = (on: boolean): { visibility: "visible" | "hidden" } => ({
  visibility: on ? "visible" : "hidden",
});

/** N 型：载流子为自由电子（带负电、运动方向与电流相反）；P 型：载流子为空穴（带正电、与电流同向） */
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

/** 两句物理标注：贴着两条带电带，随 N / P 型同步改写（内容，不是操作提示） */
const topNote = computed(() => (isN.value ? "载流子堆积" : "空穴堆积"));
const bottomNote = computed(() => (isN.value ? "载流子剥离→留下正离子" : "空穴剥离→留下负离子"));

/** 元件在画布中的几何（viewBox 用户单位）：前面 c × a，厚度 d 沿 (+60, −48) 方向（斜二测） */
const PLATE_X0 = 165;
const PLATE_X1 = 495;
const PLATE_Y0 = 150;
const PLATE_Y1 = 350;
/** 前面水平中线（轨迹左右镜像的对称轴） */
const PLATE_CX = (PLATE_X0 + PLATE_X1) / 2;
/** 顶面（＝上侧面，可见）与右侧面的轮廓 */
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
 * ── 载流子轨迹 ── 起点在**被剥离的下表面**：落在剥离色带上沿上方 2 个单位（紧贴带电层、又不压住离子圈），出发时约 45° 向上飞出，末段与上表面平行地贴进堆积带 ——
 * 三次贝塞尔（起点切线抬起、终点切线水平）。
 */
/** 起点纵坐标：下表面剥离带上沿（326）上方 2 个单位 */
const FLOW_START_Y = 324;
/** 终点纵坐标：上表面（顶面）内部，落进堆积带 */
const FLOW_LAND_Y = 144;
/** 3 条轨迹的起点横坐标（P 型＝载流子向右走；N 型关于薄片中线镜像 ⟹ 电子向左上方飞出） */
const FLOW_START_X = [195, 285, 375];
/** 3 条轨迹在上表面的落点横坐标 */
const FLOW_LAND_X = [330, 415, 475];
/** 起点控制点：沿流向走 FLOW_CTRL_RUN、同时抬起 FLOW_CTRL_RISE ⟹ 出发时约 45° */
const FLOW_CTRL_RUN = 0.42;
const FLOW_CTRL_RISE = 0.32;
/** 终点控制点：与终点同高 ⟹ 贴上表面时方向与该面平行 */
const FLOW_LAND_RUN = 0.45;
/** Step 0（还没偏转）的直线轨迹：3 条水平线走在薄片中部 */
const DRIFT_ENTRY_X = 185;
const DRIFT_EXIT_X = 475;
const DRIFT_YS = [296, 254, 212];
/** 每颗小球沿轨迹走一遍的周期（秒）——**必须与样式表里 `he-flow-travel` 的时长一致** */
const FLOW_PERIOD = 2.4;
const FLOW_BALLS_PER_PATH = 3;
/** 流向小三角所在的贝塞尔参数（起飞段上） */
const FLOW_HEAD_T = 0.16;

/** 流向：+1 ＝ 向右（空穴，与电流同向）；−1 ＝ 向左（电子，与电流反向） */
const flowDir = computed(() => (isN.value ? -1 : 1));

interface FlowPath {
  key: string;
  d: string;
  /** 起点 / 两个控制点 / 终点：三次贝塞尔（直线段取三等分共线控制点，退化成"匀速直线"） */
  p0: Point;
  c1: Point;
  c2: Point;
  p1: Point;
}

/** 偏转前为水平直线（step 0），step ≥ 1 换成"从下表面起飞 → 贴到上表面"的三次贝塞尔 */
const flowPaths = computed<FlowPath[]>(() => {
  const dir = flowDir.value;
  const driftFrom = dir > 0 ? DRIFT_ENTRY_X : DRIFT_EXIT_X;
  const driftTo = dir > 0 ? DRIFT_EXIT_X : DRIFT_ENTRY_X;

  return FLOW_START_X.map((startX, index) => {
    const key = `he-flow-${index}`;

    if (!showCharges.value) {
      const from: Point = { x: driftFrom, y: DRIFT_YS[index] };
      const to: Point = { x: driftTo, y: DRIFT_YS[index] };
      const third = (to.x - from.x) / 3;

      return {
        key,
        d: `M ${from.x} ${from.y} L ${to.x} ${to.y}`,
        p0: from,
        c1: { x: from.x + third, y: from.y },
        c2: { x: from.x + 2 * third, y: from.y },
        p1: to,
      };
    }

    const sx = dir > 0 ? startX : 2 * PLATE_CX - startX;
    const lx = dir > 0 ? FLOW_LAND_X[index] : 2 * PLATE_CX - FLOW_LAND_X[index];
    const run = Math.abs(lx - sx);
    const rise = FLOW_START_Y - FLOW_LAND_Y;
    const p0: Point = { x: sx, y: FLOW_START_Y };
    const c1: Point = {
      x: sx + dir * run * FLOW_CTRL_RUN,
      y: FLOW_START_Y - rise * FLOW_CTRL_RISE,
    };
    const c2: Point = { x: lx - dir * run * FLOW_LAND_RUN, y: FLOW_LAND_Y };
    const p1: Point = { x: lx, y: FLOW_LAND_Y };
    const d =
      `M ${sx.toFixed(1)} ${p0.y} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ` +
      `${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p1.x.toFixed(1)} ${p1.y}`;

    return { key, d, p0, c1, c2, p1 };
  });
});

/** 三次贝塞尔上参数 t 处的点（小球静止兜底姿势 + 流向三角都取它） */
const cubicAt = (p: FlowPath, t: number): Point => {
  const u = 1 - t;

  return {
    x: u ** 3 * p.p0.x + 3 * u * u * t * p.c1.x + 3 * u * t * t * p.c2.x + t ** 3 * p.p1.x,
    y: u ** 3 * p.p0.y + 3 * u * u * t * p.c1.y + 3 * u * t * t * p.c2.y + t ** 3 * p.p1.y,
  };
};

/** 流向小三角：画在轨迹的起飞段上、沿该点切线取向，静止帧里也看得出电子是"逆着电流走" */
const flowHeads = computed(() =>
  flowPaths.value.map((p, index) => {
    const tip = cubicAt(p, FLOW_HEAD_T);
    const back = cubicAt(p, FLOW_HEAD_T - 0.06);
    const dx = tip.x - back.x;
    const dy = tip.y - back.y;
    const len = Math.hypot(dx, dy) || 1;

    return { key: `he-head-${index}`, points: arrowHead(tip, { x: dx / len, y: dy / len }, 13, 6) };
  }),
);

interface FlowBall {
  key: string;
  /** 与轨迹同一条曲线：offset-path 让小球永不脱轨 */
  path: string;
  /** 负延时把同一条轨迹上的 3 颗球错开成"一串" */
  delay: string;
  /** 兜底静止位置（轨迹的三等分点）：不支持 offset-path 的浏览器里小球仍然落在轨迹上 */
  fx: number;
  fy: number;
}

const flowBalls = computed<FlowBall[]>(() =>
  flowPaths.value.flatMap((p, index) =>
    Array.from({ length: FLOW_BALLS_PER_PATH }, (_, k) => {
      const t = k / FLOW_BALLS_PER_PATH;
      const at = cubicAt(p, t);

      return {
        key: `he-ball-${index}-${k}`,
        path: p.d,
        delay: `${-(k * FLOW_PERIOD) / FLOW_BALLS_PER_PATH}s`,
        fx: at.x,
        fy: at.y,
      };
    }),
  ),
);

/** ── 两侧面的电荷 ── 上侧面＝可见顶面：一排密集的载流子（实心球）； 下侧面被前面遮住：贴着下边的淡色带 + 一排不可动离子（空心圈，区别于会跑动的载流子）。 */
const TOP_ROW_X = [224, 281, 338, 395, 452, 509];
const TOP_ROW_Y = 128;
const BOTTOM_ROW_X = [197, 254, 311, 368, 425, 482];
const BOTTOM_ROW_Y = 337;
/** 下侧面"剥离"色带的顶边（一直铺到下边） */
const BOTTOM_BAND_Y = 326;
/** 图内标注字号（viewBox 720 宽在 700px 容器里缩到约一半 ⟹ 字号要给足，还不带单位） */
const NOTE_FONT = 28;
/** 上表面堆积带标注 / 下表面剥离带标注的锚点（都贴在带电带外侧的空白处，不压住电荷） */
const TOP_NOTE_AT: Point = { x: 300, y: 82 };
const BOTTOM_NOTE_AT: Point = { x: 330, y: 366 };

/**
 * ── 横向电场（step ≥ 2，step ≥ 3 最醒目）── 两条带电面之间、薄片内部；方向恒由带正电的面指向带负电的面： N 型下表面为正 ⟹ 电场向上；P 型上表面为正 ⟹ 电场向下。4
 * 条的横坐标刻意让开薄片中央那条"受力走廊"。
 */
const E_ARROW_XS = [216, 274, 388, 446];
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
 * 中心起笔、等大反向：洛伦兹力指向堆积面（向上），电场力指向剥离面（向下）。
 */
const FORCE_CENTER: Point = { x: 330, y: 250 };
const FORCE_LEN = 58;
const B_FORCE_TIP: Point = { x: FORCE_CENTER.x, y: FORCE_CENTER.y - FORCE_LEN };
const E_FORCE_TIP: Point = { x: FORCE_CENTER.x, y: FORCE_CENTER.y + FORCE_LEN };
const FORCE_FONT = 24;
/** 两个力的标注（画在箭头旁侧，锚点左对齐 ⟹ 不压箭头） */
const B_FORCE_LABEL: Point = { x: FORCE_CENTER.x + 12, y: B_FORCE_TIP.y + 10 };
const E_FORCE_LABEL: Point = { x: FORCE_CENTER.x + 12, y: E_FORCE_TIP.y - 4 };
/** 平衡结论：一句话，画在薄片下方、剥离带标注的再下一行（都在 C_DIM_Y = 415 之上） */
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
        aria-label="霍尔元件：电流沿长度方向通过半导体薄片，磁场垂直纸面向里；载流子从下表面被剥离、弯向上表面堆积，下表面留下不可动离子，两表面间形成横向电场并不断增强，直到电场力与洛伦兹力平衡"
      >
        <defs>
          <!-- 载流子只许待在薄片里：前面 ∪ 顶面（上侧面） -->
          <clipPath id="he-plate-clip">
            <rect
              :x="PLATE_X0"
              :y="PLATE_Y0"
              :width="PLATE_X1 - PLATE_X0"
              :height="PLATE_Y1 - PLATE_Y0"
            />
            <path :d="TOP_FACE" />
          </clipPath>
        </defs>
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
          <!-- step ≥ 1：上侧面堆积色带（整张可见顶面）＋ 下侧面剥离色带（贴下边：那一面被载流子抛弃了） -->
          <g :style="fade(showCharges)">
            <path :d="TOP_FACE" :fill="topColor" opacity="0.3" />
            <rect
              :x="PLATE_X0"
              :y="BOTTOM_BAND_Y"
              :width="PLATE_X1 - PLATE_X0"
              :height="PLATE_Y1 - BOTTOM_BAND_Y"
              :fill="bottomColor"
              opacity="0.26"
            />
            <line
              :x1="PLATE_X0"
              :y1="PLATE_Y1 - 3"
              :x2="PLATE_X1"
              :y2="PLATE_Y1 - 3"
              :stroke="bottomColor"
              stroke-width="3"
              opacity="0.55"
            />
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
          <!-- step ≥ 2：薄片内部的横向电场（由带正电的面指向带负电的面）；step ≥ 3 平衡时最醒目 -->
          <g :style="fade(showField)">
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
          <!-- 载流子：电子向左（与电流反向）／空穴向右，都从下表面起飞、弯向上表面；整组裁到薄片轮廓内 -->
          <g :style="fade(showFlow)" clip-path="url(#he-plate-clip)">
            <path
              v-for="p in flowPaths"
              :key="p.key"
              :d="p.d"
              fill="none"
              :stroke="carrierColor"
              stroke-width="2"
              stroke-opacity="0.45"
              stroke-linecap="round"
            />
            <polygon v-for="h in flowHeads" :key="h.key" :points="h.points" :fill="carrierColor" />
            <g
              v-for="b in flowBalls"
              :key="b.key"
              class="he-flow-ball"
              :style="{
                offsetPath: `path('${b.path}')`,
                animationDelay: b.delay,
                '--he-fx': `${b.fx}px`,
                '--he-fy': `${b.fy}px`,
              }"
            >
              <circle r="9" :fill="carrierColor" />
              <text
                y="0"
                font-size="16"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--c-bg)"
                font-family="KaTeX_Main"
              >
                {{ carrierSign }}
              </text>
            </g>
          </g>
          <!-- step ≥ 1：上侧面（贴住载流子的一面）一排密集的载流子 -->
          <g :style="fade(showCharges)">
            <g
              v-for="(x, index) in TOP_ROW_X"
              :key="`he-top-${index}`"
              :transform="`translate(${x} ${TOP_ROW_Y})`"
            >
              <circle r="8" :fill="topColor" />
              <text
                y="0"
                font-size="14"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--c-bg)"
                font-family="KaTeX_Main"
              >
                {{ topSign }}
              </text>
            </g>
            <!-- step ≥ 1：下侧面（载流子被剥离走的一面）一排不可动离子：空心圈表示"不动" -->
            <g
              v-for="(x, index) in BOTTOM_ROW_X"
              :key="`he-ion-${index}`"
              :transform="`translate(${x} ${BOTTOM_ROW_Y})`"
            >
              <circle r="8.5" fill="none" :stroke="bottomColor" stroke-width="1.8" />
              <text
                y="0"
                font-size="14"
                text-anchor="middle"
                dominant-baseline="central"
                :fill="bottomColor"
                font-family="KaTeX_Main"
              >
                {{ bottomSign }}
              </text>
            </g>
          </g>
          <!-- step ≥ 1：两句物理标注 —— 说清"这一面为什么是这个电性"（载流子被剥离 ⇒ 留下异号离子） -->
          <g :style="fade(showCharges)">
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
          <!-- step ≥ 3：平衡 —— 一颗载流子上 qE 与 qvB 等大反向 ⟹ 不再偏转、电压不再增大 -->
          <g :style="fade(showBalance)">
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
              text-anchor="start"
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
              text-anchor="start"
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
          <!-- 电流方向（沿长度方向通过元件） -->
          <CourseArrow
            :from="{ x: 205, y: 316 }"
            :to="{ x: 455, y: 316 }"
            stroke="var(--c-accent)"
            :stroke-width="4"
          />
          <text
            x="330"
            y="296"
            font-size="26"
            text-anchor="middle"
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
          电子（N 型）
        </button>
        <button
          type="button"
          class="he-type"
          :class="{ 'he-type-on': !isN }"
          @click="carrier = 'p'"
        >
          空穴（P 型）
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
   `mode="figure"`（P26 原理图 / P28 题目图）不受影响，仍按页面上限 300px 渲染。 */
.he-wrap-lab .he-svg {
  max-height: 272px;
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

  font-size: 0.8rem;
  font-weight: 700;
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

  font-size: 0.85rem;
  font-weight: 800;
  white-space: nowrap;
}

.he-range {
  width: 100%;
  min-width: 0;
  height: 1rem;
  /* UA 给 range 留了 margin，会在窄栏里顶出 2px（实测） */
  margin: 0;

  accent-color: var(--c-accent);
  cursor: pointer;
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

/* 载流子小球：沿**与轨迹完全相同**的贝塞尔曲线移动（offset-path 不会脱轨），
   两头淡入淡出 ⟹ 小球从下表面的剥离带里浮现、贴到上表面后融进堆积里。
   时长必须与脚本里的 FLOW_PERIOD（2.4s）一致，负延时把同一条轨迹上的球错开成一串。 */
.he-flow-ball {
  animation:
    he-flow-travel 2.4s linear infinite,
    he-flow-fade 2.4s linear infinite;
  offset-rotate: 0deg;
}

/* 兜底（与共享 addon 里 SVG font-size 的 attr() 兜底同一套路）：老浏览器不支持 CSS 运动路径时，
   小球不走曲线但静止在轨迹的三等分点上，不会挤到画布原点。 */
@supports not (offset-path: path("M 0 0 L 1 1")) {
  .he-flow-ball {
    transform: translate(var(--he-fx), var(--he-fy));
    animation: none;
  }
}

@keyframes he-flow-travel {
  from {
    offset-distance: 0%;
  }

  to {
    offset-distance: 100%;
  }
}

@keyframes he-flow-fade {
  0% {
    opacity: 0;
  }

  8% {
    opacity: 1;
  }

  88% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
