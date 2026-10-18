<template>
  <!--
    第 10、11 页共用：线圈在磁场中转动（俯视）
    —— B 沿水平方向向右（平行磁感线阵列）；线圈平面侧视成一条可转动的窄条，绕中心转过 θ；
       θ = B 与线圈平面法线 n 的夹角；线圈在垂直 B 方向上的投影长度 = 2R·cosθ（金色虚线带），
       带内被穿过的磁感线条数实时可数 —— 磁通量"穿过面的净条数"示意。
    —— 物理量全部真实计算：Φ = B·S·cosθ（B = 0.5 T、S = 0.06 m² 固定），条数按投影带几何统计。
    —— 拖动线圈端点或用滑块都能改 θ（interactive）；showFlux 控制读数面板（第 10 页只讲投影，不给 Φ）。
  -->
  <div class="fc-wrap">
    <div class="fc-stage">
      <svg viewBox="0 0 520 330" width="520" height="330" xmlns="http://www.w3.org/2000/svg">
        <rect
          :x="C.x - 40"
          :y="C.y - projHalf"
          width="80"
          :height="2 * projHalf"
          fill="rgba(226,168,70,0.1)"
          stroke="var(--c-accent)"
          stroke-width="1.4"
          stroke-dasharray="7 5"
        />
        <g v-for="y in FIELD_Y" :key="y">
          <CourseArrow
            :from="{ x: 30, y }"
            :to="{ x: 492, y }"
            stroke="var(--c-accent)"
            :stroke-width="showFlux && crossing(y) ? 3.2 : 2"
            :opacity="showFlux && !crossing(y) ? 0.28 : 0.8"
          />
        </g>
        <line
          :x1="E1.x"
          :y1="E1.y"
          :x2="C.x"
          :y2="E1.y"
          stroke="var(--c-accent)"
          stroke-width="1.3"
          stroke-dasharray="5 4"
          opacity="0.8"
        />
        <line
          :x1="E2.x"
          :y1="E2.y"
          :x2="C.x"
          :y2="E2.y"
          stroke="var(--c-accent)"
          stroke-width="1.3"
          stroke-dasharray="5 4"
          opacity="0.8"
        />
        <path :d="arc" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
        <CourseArrow
          :from="C"
          :to="nTip"
          stroke="var(--c-accent-2)"
          stroke-width="2.4"
          label="n"
          :label-dx="10"
          :label-dy="6"
        />
        <polygon
          :points="coilPts"
          fill="var(--c-physics)"
          stroke="var(--c-physics)"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <g v-if="interactive">
          <circle
            :cx="E1.x"
            :cy="E1.y"
            r="21"
            fill="transparent"
            class="fc-grab"
            @pointerdown="startDrag('end1', $event)"
            @pointermove="onMove($event)"
            @pointerup="endDrag"
            @pointercancel="endDrag"
          />
          <circle
            :cx="E2.x"
            :cy="E2.y"
            r="21"
            fill="transparent"
            class="fc-grab"
            @pointerdown="startDrag('end2', $event)"
            @pointermove="onMove($event)"
            @pointerup="endDrag"
            @pointercancel="endDrag"
          />
        </g>
      </svg>
      <ChartLabel
        :x-percent="labS.x"
        :y-percent="labS.y"
        :parts="[{ tex: 'S' }]"
        :size="19"
        color="var(--c-physics)"
      />
      <ChartLabel
        :x-percent="labSp.x"
        :y-percent="labSp.y"
        :parts="[{ tex: `S'` }]"
        :size="18"
        color="var(--c-accent)"
      />
      <ChartLabel
        :x-percent="labTheta.x"
        :y-percent="labTheta.y"
        :parts="[{ tex: '\\theta' }]"
        :size="19"
        color="var(--c-text)"
      />
    </div>
    <div v-if="interactive || showFlux" class="fc-panel">
      <CourseSlider
        v-if="interactive"
        v-model="thetaDeg"
        :min="0"
        :max="90"
        :step="1"
        label="夹角"
        label-tex="\theta"
      >
        <template #value><Latex :tex="thetaTex" /></template>
      </CourseSlider>
      <div v-if="showFlux" class="fc-row">
        穿过线圈的磁感线 <b class="text-accent">{{ count }}</b> 条
      </div>
      <div v-if="showFlux" class="fc-row"><Latex :tex="fluxTex" /></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const {
  theta = 0,
  interactive = true,
  showFlux = true,
} = defineProps({
  /** 初始夹角 θ（第 10 页静态讲投影时传 60） */
  theta: { type: Number, default: 0 },
  /** 是否显示滑块与拖拽热区（第 10 页传 false，只作静态图） */
  interactive: { type: Boolean, default: true },
  /** 是否显示 Φ 读数与磁感线高亮（第 10 页只讲 S 与 S′，传 false） */
  showFlux: { type: Boolean, default: true },
});

/** 这页给定的磁场与线圈：B = 0.5 T、S = 0.06 m²，Φ = BS cosθ 真实计算 */
const B_T = 0.5;
const S_M2 = 0.06;

/** 视图与几何（viewBox 用户单位）：线圈中心、半长、半厚度 */
const C = { x: 258, y: 152 };
const R = 92;
const HALF_T = 7;
/** 磁感线阵列（水平向右，等间距 44） */
const FIELD_Y = [34, 78, 122, 166, 210, 254, 298];

const thetaDeg = ref(theta);
const dragging = ref("");

const thRad = computed(() => (thetaDeg.value * Math.PI) / 180);
const cosT = computed(() => Math.cos(thRad.value));
const sinT = computed(() => Math.sin(thRad.value));

/** 线圈方向（沿线圈平面）与法线方向（屏幕坐标，y 向下） */
const d = computed(() => ({ x: sinT.value, y: -cosT.value }));
const n = computed(() => ({ x: cosT.value, y: sinT.value }));
const E1 = computed(() => ({ x: C.x + R * d.value.x, y: C.y + R * d.value.y }));
const E2 = computed(() => ({ x: C.x - R * d.value.x, y: C.y - R * d.value.y }));
const nTip = computed(() => ({ x: C.x + 78 * n.value.x, y: C.y + 78 * n.value.y }));

/** 线圈（俯视的窄条）四个顶点：C ± R·d ± t·n */
const coilPts = computed(() => {
  const pts = [
    { x: C.x + R * d.value.x + HALF_T * n.value.x, y: C.y + R * d.value.y + HALF_T * n.value.y },
    { x: C.x + R * d.value.x - HALF_T * n.value.x, y: C.y + R * d.value.y - HALF_T * n.value.y },
    { x: C.x - R * d.value.x - HALF_T * n.value.x, y: C.y - R * d.value.y - HALF_T * n.value.y },
    { x: C.x - R * d.value.x + HALF_T * n.value.x, y: C.y - R * d.value.y + HALF_T * n.value.y },
  ];

  return pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
});

/** 线圈在垂直 B 方向上的投影半长 = R·cosθ */
const projHalf = computed(() => R * cosT.value);

/** θ 角弧：从 B 方向（水平向右）转到法线 n，半径 46 */
const arc = computed(() => {
  const r = 46;
  const ex = C.x + r * cosT.value;
  const ey = C.y + r * sinT.value;

  return `M ${C.x + r} ${C.y} A ${r} ${r} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`;
});

/** 一条磁感线是否被投影带（即线圈的投影面积）穿过 */
const crossing = (y) => Math.abs(y - C.y) <= projHalf.value + 0.01;

/** 被穿过的磁感线条数：净条数随 cosθ 真实变化 */
const count = computed(() => FIELD_Y.filter((y) => crossing(y)).length);

/** 标注位置（ChartLabel 按容器百分比定位） */
const toPct = (x, y) => ({ x: (x / 520) * 100, y: (y / 330) * 100 });
const labS = computed(() => toPct(C.x - 26 * n.value.x, C.y - 26 * n.value.y));
const labSp = computed(() => toPct(C.x + 52, C.y - projHalf.value - 10));
const labTheta = computed(() =>
  toPct(C.x + 64 * Math.cos(thRad.value / 2), C.y + 64 * Math.sin(thRad.value / 2)),
);

const thetaTex = computed(() => `\\theta = ${thetaDeg.value}^\\circ`);
const fluxTex = computed(
  () =>
    `\\Phi = BS\\cos\\theta = 0.5\\times 0.06\\times\\cos${thetaDeg.value}^\\circ = ${(B_T * S_M2 * cosT.value).toFixed(3)}\\,\\text{Wb}`,
);

/**
 * 拖拽：把指针相对线圈中心的方位角换算成 θ（两端点各自反算，钳制在 0~90°）
 *
 * @param end 被拖的端点（end1 / end2）
 * @param event 指针事件
 */
const onDrag = (end, event) => {
  const svg = event.currentTarget.ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0) return;

  const px = ((event.clientX - rect.left) / rect.width) * 520;
  const py = ((event.clientY - rect.top) / rect.height) * 330;
  /** 指针的数学角（y 向上为正）：end1 的方位角 = 90° − θ，end2 = 270° − θ */
  const a = (Math.atan2(-(py - C.y), px - C.x) * 180) / Math.PI;
  const raw = end === "end1" ? 90 - a : 270 - a;

  thetaDeg.value = Math.min(90, Math.max(0, Math.round(raw)));
};

const startDrag = (end, event) => {
  dragging.value = end;
  event.target.setPointerCapture(event.pointerId);
};

const onMove = (event) => {
  if (dragging.value) onDrag(dragging.value, event);
};

const endDrag = () => {
  dragging.value = "";
};
</script>

<style scoped>
.fc-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  min-width: 0;
}

.fc-stage {
  position: relative;

  min-width: 0;
}

.fc-stage svg {
  display: block;
  width: 100%;
  height: auto;

  touch-action: none;
}

.fc-grab {
  cursor: grab;
}

.fc-grab:active {
  cursor: grabbing;
}

.fc-panel {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  font-size: 1rem;
  line-height: 1.6;
}

.fc-row {
  text-align: center;
}
</style>
