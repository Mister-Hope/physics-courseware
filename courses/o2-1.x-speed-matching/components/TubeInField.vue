<!--
  选必2 1.x《复合场中的配速法与摆线运动》"玻璃管载小球进入磁场"一页的题目示意图。
  下端封闭、上端开口的竖直玻璃管以速度 v 水平向右垂直进入匀强磁场（磁场垂直纸面向里）；
  管底一个带正电小球随管一起平动，管的速度因外力保持不变，最终小球从上端管口飞出。
  · 常显（题目图）：玻璃管与封闭的管底、小球、管长标注 h、装置速度 v、磁场左边界虚线 + 向里的 × 阵列；
  · showAnalysis 打开后（点击）才画：小球速度的正交分解（水平 v、竖直 v_y，蓝色 + 虚线补成的矩形）、
    两个洛伦兹力（由水平速度产生的 qvB 竖直向上、由竖直速度产生的 qv_yB 水平向左，暖金），以及小球在地面参考系里的抛物线轨迹。
  小球上升按真实规律走（竖直方向恒力 ⟹ v_y ∝ t、位移 ∝ t²；水平方向匀速 ⟹ v 恒定），
  requestAnimationFrame 无限循环演示，水平分速度 v 的长度始终不变。
  管整体随 v 向右匀速平移（两壁、管底、管长尺寸线、装置速度箭头都跟着走，磁场边界虚线不动）；
  球心的水平坐标就是管中心 x —— 球同一时间既随管右移、又在管内竖直匀加速上升，
  于是在屏幕上描出一条抛物线样的上升轨迹（一眼看出这是类平抛），而不是原地竖着升。
  几何全部取自脚本里的常量与 computed，模板里不散落坐标。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const { showAnalysis = false } = defineProps<{
  /** 点击步到了才画运动的小球 + 速度分解 + 洛伦兹力，并启动循环动画；干净题目图时传 false */
  showAnalysis?: boolean;
}>();

/* ═══════════ 版面坐标（viewBox 640×440，y 轴向下） ═══════════ */
const VB_W = 640;
const VB_H = 440;

/* 玻璃管：左右两条竖线 + 底部封闭，顶部开口。
   下面是管的基座坐标（干净题目图里管的静止位置）；分析层里整根管再沿 +x 平移 tubeShift */
const TUBE_LEFT = 196;
const TUBE_RIGHT = 250;
const TUBE_CX = (TUBE_LEFT + TUBE_RIGHT) / 2;
const TUBE_TOP = 110;
const TUBE_BOTTOM = 356;
/* 管整体随 v 向右匀速平移的最大位移（基准位置 → 终点）：
   起点管右壁 250 还在磁场左边界 392 左边（还没进磁场），终点管左壁 196+240 = 436、球心 463
   —— 球升到管口时整根管已明显进到磁场里，且管壁、球、各条箭头都没出 640 宽的画布 */
const TUBE_SHIFT_MAX = 240;

/* 管长标注：左侧一条竖直尺寸线，两端加短横线，线的右侧标 h（尺寸线随管一起平移）
   （量线让到管壁最左边，给水平向左的 qv_yB 留出随球一起变长的空间） */
const DIM_X = 104;
const DIM_MID_Y = (TUBE_TOP + TUBE_BOTTOM) / 2;
/* 尺寸线两端的短横线长度：随图内字号一起放大 1.8 倍，坐标不动 */
const DIM_TICK = 13;

/* 小球：静止时贴在封闭的管底；上升的终点是管口（球心刚好抬到管口） */
const BALL_R = 25;
const BALL_REST_Y = TUBE_BOTTOM - BALL_R - 2;
const BALL_EXIT_Y = TUBE_TOP + BALL_R;
const BALL_RISE = BALL_REST_Y - BALL_EXIT_Y;

/* 装置整体水平向右进入磁场的速度 v：画在管口右上方（小球上升时那条横向分速度箭头
   会扫过管子右半边，装置箭头放在这里才不会跟它撞在一起）；它随管一起平移（这是装置的速度） */
const DEVICE_Y = 88;
const DEVICE_FROM = { x: 272, y: DEVICE_Y };
const DEVICE_TO = { x: 356, y: DEVICE_Y };

/* 磁场：左边界虚线（装置穿越它才算"进入磁场"）+ 向里的 × 阵列 */
const FIELD_EDGE_X = 392;
const FIELD_EDGE_TOP = 84;
const FIELD_EDGE_BOTTOM = 438;

/* ═══════════ 分析层：速度分解（蓝）与两个洛伦兹力（金），都从球心附近起笔 ═══════════ */
/** 到管口时 v_y : v 的比（题设没给具体数值，取 1.2，让两条分速度都完整看得见） */
const Y_OVER_X = 1.2;
/* 速度：v 随管匀速 ⟹ 长度恒定；v_y = a t ∝ t ⟹ 从 0 线性长到最大 */
const V_LEN = 112;
const VY_MAX = V_LEN * Y_OVER_X;
/* 洛伦兹力：qvB 由恒定的 v 产生 ⟹ 长度恒定；qv_yB = q·v_y·B ⟹ 与 v_y/v 同比例变化 */
const F_X_LEN = 96;
const F_Y_MAX = F_X_LEN * Y_OVER_X;

/** 分解整体相对球心右移一点：竖直向上的分速度与竖直向上的洛伦兹力同向， 完全重叠会糊成一团，错开一点两条箭头都看得清（力仍严格从球心起笔） */
const DECO_DX = 18;

/* ═══════════ 动画：requestAnimationFrame 无限循环 ═══════════
   竖直方向是恒力 ⟹ 匀加速：球心位移 ∝ t²、v_y ∝ t；水平方向匀速 ⟹ v 长度恒定。
   一个循环 3.5 s（前 3.2 s 从管底升到管口，末尾在管口停 0.3 s 再回到管底）。 */
const CYCLE = 3.5;
const MOVE = 3.2;
const clock = ref(0);
let frame = 0;
let t0 = 0;

const step = (now: number): void => {
  if (t0 === 0) t0 = now;
  clock.value = ((now - t0) / 1000) % CYCLE;
  frame = requestAnimationFrame(step);
};
const startMotion = (): void => {
  if (frame !== 0) return;
  t0 = 0;
  frame = requestAnimationFrame(step);
};
const stopMotion = (): void => {
  if (frame !== 0) cancelAnimationFrame(frame);
  frame = 0;
};

onMounted(() => {
  if (showAnalysis) startMotion();
});
onBeforeUnmount(stopMotion);
watch(
  () => showAnalysis,
  (on) => (on ? startMotion() : stopMotion()),
);

/** 循环内归一化时间 p ∈ [0,1]；竖直恒力 ⟹ 位移 ∝ t²、速度 ∝ t */
const p = computed(() => Math.min(1, clock.value / MOVE));
/** 管整体随 v 向右匀速平移：水平匀速 ⟹ 位移 ∝ t，即随 p 线性增大；干净题目图停在起点不动 */
const tubeShift = computed(() => (showAnalysis ? TUBE_SHIFT_MAX * p.value : 0));
/** 管中心 x —— 球心水平坐标、速度分解起点、洛伦兹力起笔点都跟着它走（地面参考系里球随管匀速右移） */
const tubeCx = computed(() => TUBE_CX + tubeShift.value);
/** 管两壁的 x（随管一起平移） */
const tubeLeft = computed(() => TUBE_LEFT + tubeShift.value);
const tubeRight = computed(() => TUBE_RIGHT + tubeShift.value);
/** 管长尺寸线的 x（随管一起平移） */
const dimX = computed(() => DIM_X + tubeShift.value);
/** 分解箭头起点相对管中心的横向偏移固定，所以也随管一起平移 */
const decoX = computed(() => tubeCx.value + DECO_DX);
/** 球心：干净题目图里静止贴在管底；分析层沿管壁匀加速升到管口 */
const ballY = computed(() => BALL_REST_Y - (showAnalysis ? BALL_RISE * p.value ** 2 : 0));
/** 分速度长度：v 恒定，v_y = a t ∝ t 线性变长 */
const vyLen = computed(() => VY_MAX * p.value);
/** 洛伦兹力长度：qvB 恒定，qv_yB = q·v_y·B ∝ v_y 线性变长 */
const fyLen = computed(() => F_Y_MAX * p.value);
const showVy = computed(() => vyLen.value > 6);
const showFy = computed(() => fyLen.value > 8);

/** 小球在地面参考系里的轨迹：水平随管匀速（x ∝ q）、竖直匀加速（y ∝ q²）⟹ 抛物线；只画已经走过的一段 */
const TRAIL_SEGMENTS = 24;
const trailPoints = computed(() => {
  const pts: string[] = [];
  for (let i = 0; i <= TRAIL_SEGMENTS; i += 1) {
    const q = (p.value * i) / TRAIL_SEGMENTS;
    pts.push(`${TUBE_CX + TUBE_SHIFT_MAX * q},${BALL_REST_Y - BALL_RISE * q * q}`);
  }
  return pts.join(" ");
});

/** 速度分解：起点随球心一起走（右移一点避开竖直的洛伦兹力箭头），虚线补成矩形 */
const decoFrom = computed(() => ({ x: decoX.value, y: ballY.value }));
const vTip = computed(() => ({ x: decoX.value + V_LEN, y: ballY.value }));
const vyTip = computed(() => ({ x: decoX.value, y: ballY.value - vyLen.value }));
const boxCorner = computed(() => ({ x: vTip.value.x, y: vyTip.value.y }));
/** 两个洛伦兹力：由分速度与 B 叉乘定方向（v 向右 → qvB 向上；v_y 向上 → qv_yB 向左），起点严格在球心 */
const fxUpTip = computed(() => ({ x: tubeCx.value, y: ballY.value - F_X_LEN }));
const fyLeftTip = computed(() => ({ x: tubeCx.value - fyLen.value, y: ballY.value }));

/* 标注位置：随管一起平移的两处（管长尺寸线、装置速度）＋ 跟着球走的四处（分速度、洛伦兹力） */
const hLabel = computed(() => ({ x: dimX.value + 8, y: DIM_MID_Y + 12 }));
const deviceFrom = computed(() => ({ x: DEVICE_FROM.x + tubeShift.value, y: DEVICE_Y }));
const deviceTo = computed(() => ({ x: DEVICE_TO.x + tubeShift.value, y: DEVICE_Y }));
const deviceLabel = computed(() => ({
  x: (deviceFrom.value.x + deviceTo.value.x) / 2,
  y: DEVICE_Y - 20,
}));
const vLabel = computed(() => ({ x: vTip.value.x + 8, y: ballY.value + 10 }));
const vyLabel = computed(() => ({ x: decoX.value + 14, y: vyTip.value.y + 10 }));
const fxLabel = computed(() => ({ x: tubeCx.value - 12, y: fxUpTip.value.y + 10 }));
const fyLabel = computed(() => ({ x: fyLeftTip.value.x, y: ballY.value + 30 }));
/** Qv_yB 的说明：管壁弹力与它等大反向（摆在图左下方空白处、不随管动，免得这行字跟着跑） */
const FY_NOTE = { x: DIM_X - 12, y: 408 };

/* 字号与线宽：图内字号会随缩放缩水，主标注给足 32；速度箭头一律比力箭头细一号 */
const FONT_MAIN = 32;
const FONT_LABEL = 31;
const FONT_SUB = 22;
const FONT_NOTE = 20;
const GLOW_MAIN = 6;
const GLOW_LABEL = 2.4;
const TUBE_W = 4;
const VEL_W = 4;
const VEL_HEAD = 16;
const FORCE_W = 5;
const FORCE_HEAD = 20;
const DASH_W = 3;
/** 小球轨迹虚线：比速度箭头再细一点、更淡，只做"看得出是抛物线"的底纹 */
const TRAIL_W = 3;
const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";
</script>

<template>
  <div class="tube-field">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="tube-field-svg">
      <!-- 磁场：左边界虚线 + 铺满右侧的向里裸 × 阵列（单个 ⊗ 图例已去掉） -->
      <line
        :x1="FIELD_EDGE_X"
        :y1="FIELD_EDGE_TOP"
        :x2="FIELD_EDGE_X"
        :y2="FIELD_EDGE_BOTTOM"
        stroke="var(--c-text-dim)"
        :stroke-width="DASH_W"
        stroke-dasharray="14 11"
      />
      <FieldDots
        :x="412"
        :y="91"
        :cols="3"
        :rows="4"
        :spacing="100"
        :size="12"
        :line-width="3.1"
        :opacity="0.9"
        dir="in"
      />
      <!-- 玻璃管：左壁、右壁、封闭的管底（顶部开口）——整根管随 v 向右匀速平移 -->
      <line
        :x1="tubeLeft"
        :y1="TUBE_TOP"
        :x2="tubeLeft"
        :y2="TUBE_BOTTOM"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
      />
      <line
        :x1="tubeRight"
        :y1="TUBE_TOP"
        :x2="tubeRight"
        :y2="TUBE_BOTTOM"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
      />
      <line
        :x1="tubeLeft"
        :y1="TUBE_BOTTOM"
        :x2="tubeRight"
        :y2="TUBE_BOTTOM"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
      />
      <!-- 管长 h 的尺寸线（随管一起平移） -->
      <CourseArrow
        :from="{ x: dimX, y: DIM_MID_Y }"
        :to="{ x: dimX, y: TUBE_TOP }"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
        :head-size="16"
      />
      <CourseArrow
        :from="{ x: dimX, y: DIM_MID_Y }"
        :to="{ x: dimX, y: TUBE_BOTTOM }"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
        :head-size="16"
      />
      <line
        :x1="dimX - DIM_TICK"
        :y1="TUBE_TOP"
        :x2="dimX + DIM_TICK"
        :y2="TUBE_TOP"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
      />
      <line
        :x1="dimX - DIM_TICK"
        :y1="TUBE_BOTTOM"
        :x2="dimX + DIM_TICK"
        :y2="TUBE_BOTTOM"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
      />
      <!-- 小球在地面参考系里的轨迹：水平随管匀速、竖直匀加速 ⟹ 抛物线（只画已经走过的一段） -->
      <polyline
        v-if="showAnalysis"
        :points="trailPoints"
        fill="none"
        stroke="var(--c-velocity)"
        :stroke-width="TRAIL_W"
        stroke-dasharray="10 10"
        opacity="0.45"
      />
      <!-- 小球：题目图里静止贴在管底，分析层里随管右移、同时沿管壁匀加速升到管口 -->
      <circle :cx="tubeCx" :cy="ballY" :r="BALL_R" fill="var(--c-text-dim)" opacity="0.75" />
      <circle
        :cx="tubeCx"
        :cy="ballY"
        :r="BALL_R"
        fill="none"
        stroke="var(--c-text)"
        :stroke-width="TUBE_W"
      />
      <!-- 装置（管）水平进入磁场的速度 v：随管一起平移 -->
      <CourseArrow
        :from="deviceFrom"
        :to="deviceTo"
        stroke="var(--c-text)"
        :stroke-width="VEL_W"
        :head-size="VEL_HEAD"
      />
      <!-- 题目图上的两个字母：管长 h、装置速度 v -->
      <g
        :font-size="FONT_MAIN"
        :style="{ stroke: 'var(--c-bg)', 'stroke-width': GLOW_MAIN, 'paint-order': 'stroke' }"
      >
        <text
          :x="hLabel.x"
          :y="hLabel.y"
          fill="var(--c-text)"
          :font-family="MATH_FONT"
          font-style="italic"
        >
          h
        </text>
        <text
          :x="deviceLabel.x"
          :y="deviceLabel.y"
          fill="var(--c-text)"
          :font-family="MATH_FONT"
          font-style="italic"
          text-anchor="middle"
        >
          v
        </text>
      </g>
      <g v-if="showAnalysis">
        <!-- 水平 v 与竖直 v_y 补成矩形（虚线只是辅助，不参与受力） -->
        <line
          :x1="vTip.x"
          :y1="vTip.y"
          :x2="boxCorner.x"
          :y2="boxCorner.y"
          stroke="var(--c-velocity)"
          :stroke-width="DASH_W"
          stroke-dasharray="9 9"
          opacity="0.5"
        />
        <line
          :x1="boxCorner.x"
          :y1="boxCorner.y"
          :x2="vyTip.x"
          :y2="vyTip.y"
          stroke="var(--c-velocity)"
          :stroke-width="DASH_W"
          stroke-dasharray="9 9"
          opacity="0.5"
        />
        <!-- 速度分解：水平 v 长度恒定（随管匀速），竖直 v_y 越接近管口越长 -->
        <CourseArrow
          :from="decoFrom"
          :to="vTip"
          stroke="var(--c-velocity)"
          :stroke-width="VEL_W"
          :head-size="VEL_HEAD"
        />
        <CourseArrow
          v-if="showVy"
          :from="decoFrom"
          :to="vyTip"
          stroke="var(--c-velocity)"
          :stroke-width="VEL_W"
          :head-size="VEL_HEAD"
        />
        <!-- 洛伦兹力：qvB 恒定竖直向上推球上升，qv_yB 随时间变长、水平向左、被管壁弹力平衡（都从球心起笔） -->
        <CourseArrow
          :from="{ x: tubeCx, y: ballY }"
          :to="fxUpTip"
          stroke="var(--c-force)"
          :stroke-width="FORCE_W"
          :head-size="FORCE_HEAD"
        />
        <CourseArrow
          v-if="showFy"
          :from="{ x: tubeCx, y: ballY }"
          :to="fyLeftTip"
          stroke="var(--c-force)"
          :stroke-width="FORCE_W"
          :head-size="FORCE_HEAD"
        />
        <!-- 带下标的文字光晕要比正文细：放大后的下标只有 22，光晕再按 1.8 倍给会被涂成实心块 -->
        <g
          :font-size="FONT_LABEL"
          :style="{ stroke: 'var(--c-bg)', 'stroke-width': GLOW_LABEL, 'paint-order': 'stroke' }"
        >
          <text
            :x="vLabel.x"
            :y="vLabel.y"
            fill="var(--c-velocity)"
            :font-family="MATH_FONT"
            font-style="italic"
          >
            v
          </text>
          <text
            v-if="showVy"
            :x="vyLabel.x"
            :y="vyLabel.y"
            fill="var(--c-velocity)"
            :font-family="MATH_FONT"
            font-style="italic"
          >
            v
            <tspan :font-size="FONT_SUB" dy="7">y</tspan>
          </text>
          <text
            :x="fxLabel.x"
            :y="fxLabel.y"
            fill="var(--c-force)"
            :font-family="MATH_FONT"
            font-style="italic"
            text-anchor="end"
          >
            qvB
          </text>
          <text
            v-if="showFy"
            :x="fyLabel.x"
            :y="fyLabel.y"
            fill="var(--c-force)"
            :font-family="MATH_FONT"
            font-style="italic"
            text-anchor="middle"
          >
            qv
            <tspan :font-size="FONT_SUB" dy="7">y</tspan>
            B
          </text>
        </g>
        <text
          :x="FY_NOTE.x"
          :y="FY_NOTE.y"
          fill="var(--c-text-dim)"
          :font-size="FONT_NOTE"
          :style="{ stroke: 'var(--c-bg)', 'stroke-width': 2, 'paint-order': 'stroke' }"
        >
          <tspan :font-family="MATH_FONT" font-style="italic">qv</tspan>
          <tspan :font-size="15" dy="5" :font-family="MATH_FONT" font-style="italic">y</tspan>
          <tspan dy="-5" :font-family="MATH_FONT" font-style="italic">B</tspan>
          由管壁弹力平衡
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tube-field {
  width: 100%;
}

/* 图占满所在栏能给出的最大尺寸：第 11/12 页右栏约 383px 宽，但第 12 页图下面还有三句分析，
   图再高就会把正文顶出 980×552 画布 —— 330px（占整屏宽 33.7%，≥ 教师要求的 1/3）是"图够大"与"页面不出画布"的平衡点。
   ⚠️ 这个上限必须写在这里：scoped 规则权重高于 style.css 的 .q-fig-aside svg，写在那边压不住。 */
.tube-field-svg {
  display: block;
  width: 100%;
  max-width: 330px;
  height: auto;
}
</style>
