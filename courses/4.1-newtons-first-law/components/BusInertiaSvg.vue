<script setup lang="ts">
import { computed, ref } from "vue";

type BusMode = "cruise" | "start" | "brake";

/** 默认状态：车正常行驶（匀速直线运动，人竖直站立） */
const mode = ref<BusMode>("cruise");
const isBrake = computed(() => mode.value === "brake");

/** 车辆本体在画布中的左右边界（x < 140 为车后方，140..700 为车辆本体，x > 700 为车前方） */
const BUS_LEFT = 140;
const BUS_RIGHT = 700;

/** 乘客与车内吊环的惯性倾角（度）：正常行驶 0°，突然启动向后倾 (-15°)，紧急刹车向前倾 (+15°) */
const lean = computed(() => {
  if (mode.value === "start") return -15;
  if (mode.value === "brake") return 15;
  return 0;
});

/** 加速度 a 矢量：正常行驶无加速度箭头，启动时向右加速，刹车时向左减速 */
const accel = computed(() => {
  if (mode.value === "start") return { from: { x: 730, y: 144 }, to: { x: 854, y: 144 } };

  if (mode.value === "brake") return { from: { x: 854, y: 144 }, to: { x: 730, y: 144 } };

  return null;
});

/** 顶部状态标题 */
const title = computed(() => {
  if (mode.value === "start") return "车突然启动";
  if (mode.value === "brake") return "紧急刹车";
  return "车正常行驶";
});

/** 车内顶部三个吊环的悬挂点位移属性（提前在 script 中算好，避免模板绑定出现数字触发 UnoCSS 误判） */
const STRAP_TRANSFORMS: string[] = [266, 344, 486].map((x) => `translate(${x}, 88)`);

/**
 * 点击车前方启动，点击车后方刹车，点击车辆本体恢复正常行驶
 *
 * @param event 鼠标点击事件
 */
const onClick = (event: MouseEvent): void => {
  const svg = event.currentTarget as SVGSVGElement | null;
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  if (rect.width === 0) return;
  const x = ((event.clientX - rect.left) / rect.width) * 900;

  if (x < BUS_LEFT) mode.value = "brake";
  else if (x > BUS_RIGHT) mode.value = "start";
  else mode.value = "cruise";
};
</script>

<template>
  <!-- 第 10 页：同车，车人改变——默认车正常行驶，点击车前方启动（人向后倾），点击车后方刹车（人向前倾），点击车体恢复正常行驶 -->
  <svg class="fig-bus" viewBox="0 0 900 268" xmlns="http://www.w3.org/2000/svg" @click="onClick">
    <!-- ==================== 1. 公路路面 ==================== -->
    <line x1="20" y1="262" x2="880" y2="262" stroke="rgba(148,163,184,0.5)" stroke-width="3" stroke-linecap="round" />

    <!-- ==================== 2. 现代城市新能源公交车（x: 140..700） ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- ① 车顶空调导流罩与散热格栅（x: 240..530, y: 51..64） -->
      <path d="M 240 64 L 256 51 L 514 51 L 532 64 Z" fill="rgba(30,41,59,0.85)" stroke="#94a3b8" stroke-width="2" />
      <line x1="280" y1="57" x2="350" y2="57" stroke="#64748b" stroke-width="1.6" stroke-dasharray="6 5" />
      <line x1="420" y1="57" x2="490" y2="57" stroke="#64748b" stroke-width="1.6" stroke-dasharray="6 5" />

      <!-- ② 公交车流线型主壳体（x: 140..700, y: 64..226，前脸微倾弧度） -->
      <path
        d="M 156 64 L 670 64 Q 688 64 693 82 L 700 146 L 700 216 Q 700 226 688 226 L 152 226 Q 140 226 140 214 L 140 80 Q 140 64 156 64 Z"
        fill="rgba(30,41,59,0.72)"
        stroke="#94a3b8"
        stroke-width="2.6"
      />

      <!-- 车身下沿城市公交青蓝涂装腰线 -->
      <path d="M 142 206 L 698 206 L 698 218 L 142 218 Z" fill="rgba(45,212,191,0.2)" />
      <line x1="142" y1="206" x2="698" y2="206" stroke="#2dd4bf" stroke-width="1.6" opacity="0.65" />

      <!-- ③ 车厢透视大观察窗（x: 162..580, y: 76..202，让车内乘客全身、座椅与扶手一目了然） -->
      <rect x="162" y="76" width="418" height="126" rx="10" fill="rgba(15,23,42,0.78)" stroke="rgba(148,163,184,0.55)" stroke-width="2" />
      <!-- 远景车窗立柱分格暗线 -->
      <line x1="298" y1="76" x2="298" y2="202" stroke="rgba(148,163,184,0.18)" stroke-width="2" />
      <line x1="444" y1="76" x2="444" y2="202" stroke="rgba(148,163,184,0.18)" stroke-width="2" />

      <!-- 车厢内部顶棚水平扶手横杆（y = 88）与竖向立柱扶手 -->
      <line x1="164" y1="88" x2="578" y2="88" stroke="#94a3b8" stroke-width="2.4" />
      <line x1="298" y1="88" x2="298" y2="200" stroke="#64748b" stroke-width="2.2" />
      <line x1="514" y1="88" x2="514" y2="200" stroke="#64748b" stroke-width="2.2" />

      <!-- 车厢左侧两排侧视乘客座椅与前排座椅 -->
      <g fill="rgba(59,130,246,0.22)" stroke="#60a5fa" stroke-width="1.8">
        <!-- 后排座椅 1 -->
        <path d="M 180 152 L 186 182 L 212 182 L 212 175 L 192 175 L 187 152 Z" />
        <line x1="198" y1="182" x2="198" y2="200" stroke="#64748b" stroke-width="2.2" />
        <!-- 后排座椅 2 -->
        <path d="M 230 152 L 236 182 L 262 182 L 262 175 L 242 175 L 237 152 Z" />
        <line x1="248" y1="182" x2="248" y2="200" stroke="#64748b" stroke-width="2.2" />
        <!-- 前排座椅 3 -->
        <path d="M 528 152 L 534 182 L 560 182 L 560 175 L 540 175 L 535 152 Z" />
        <line x1="546" y1="182" x2="546" y2="200" stroke="#64748b" stroke-width="2.2" />
      </g>

      <!-- 车顶悬挂的公交车吊环（随正常行驶/启动/刹车与乘客同步保持竖直或向后/向前摆动） -->
      <g v-for="strapTf in STRAP_TRANSFORMS" :key="strapTf" :transform="strapTf">
        <g class="strap" :style="{ transform: `rotate(${lean}deg)` }">
          <line x1="0" y1="0" x2="0" y2="16" stroke="#cbd5e1" stroke-width="1.8" />
          <polygon points="0,15 -5.5,25 5.5,25" fill="rgba(226,168,70,0.2)" stroke="#e2a846" stroke-width="1.6" />
        </g>
      </g>

      <!-- ④ 右侧驾驶室前窗、方向盘与兔耳外后视镜 -->
      <path d="M 594 76 L 676 76 Q 686 76 689 88 L 695 146 L 594 146 Z" fill="rgba(56,189,248,0.18)" stroke="rgba(148,163,184,0.6)" stroke-width="2" />
      <!-- 驾驶室方向盘与仪表台 -->
      <line x1="670" y1="146" x2="656" y2="128" stroke="#94a3b8" stroke-width="2.4" />
      <line x1="648" y1="133" x2="664" y2="123" stroke="#cbd5e1" stroke-width="2.8" />
      <!-- 车头兔耳公交后视镜 -->
      <path d="M 688 82 L 708 78 L 708 106" fill="none" stroke="#cbd5e1" stroke-width="2" />
      <rect x="704" y="92" width="6" height="18" rx="2" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.4" />

      <!-- 车头大灯（右侧 x=692）与车尾刹车灯（左侧 x=136） -->
      <rect x="692" y="184" width="9" height="14" rx="2" fill="#fef08a" stroke="#facc15" stroke-width="1.4" />
      <polygon points="701,186 726,178 726,204 701,198" fill="rgba(250,204,21,0.14)" />
      <!-- 车尾刹车红灯（紧急刹车时高亮放射红光） -->
      <rect x="136" y="180" width="6" height="16" rx="2" :fill="isBrake ? '#ef4444' : '#7f1d1d'" :stroke="isBrake ? '#fca5a5' : '#991b1b'" stroke-width="1.4" />
      <g v-if="isBrake" stroke="#f87171" stroke-width="2.2">
        <line x1="130" y1="182" x2="116" y2="174" />
        <line x1="128" y1="188" x2="112" y2="188" />
        <line x1="130" y1="194" x2="116" y2="202" />
      </g>
    </g>

    <!-- ==================== 3. 车内站立的乘客（双脚踏在地板 y=200，正常行驶竖直，启动后仰，刹车前倾） ==================== -->
    <g class="person" :style="{ transform: `rotate(${lean}deg)` }" stroke-linecap="round" stroke-linejoin="round">
      <!-- 双腿与球鞋（脚底踩在车厢地板 (388, 200)） -->
      <path d="M 383 160 L 376 198 L 369 199" fill="none" stroke="#cbd5e1" stroke-width="4.6" />
      <path d="M 393 160 L 400 198 L 408 199" fill="none" stroke="#cbd5e1" stroke-width="4.6" />

      <!-- 背部小书包 -->
      <path d="M 377 124 Q 366 125 366 136 L 366 150 Q 366 156 377 156 Z" fill="rgba(226,168,70,0.28)" stroke="#e2a846" stroke-width="1.8" />

      <!-- 乘客圆润夹克上衣躯干 -->
      <rect x="377" y="118" width="22" height="43" rx="9" fill="rgba(96,165,250,0.32)" stroke="#60a5fa" stroke-width="2.4" />

      <!-- 双臂自然张开平衡姿态 -->
      <path d="M 380 128 Q 366 140 360 152" fill="none" stroke="#e2e8f0" stroke-width="4" />
      <path d="M 396 128 Q 410 140 416 152" fill="none" stroke="#e2e8f0" stroke-width="4" />

      <!-- 乘客头部与神态（正常行驶从容微笑，启动/刹车惊讶） -->
      <circle cx="388" cy="100" r="13.5" fill="rgba(226,168,70,0.24)" stroke="#e2a846" stroke-width="2.8" />
      <circle cx="384" cy="98" r="1.7" fill="#f8fafc" />
      <circle cx="393" cy="98" r="1.7" fill="#f8fafc" />
      <path v-if="mode === 'cruise'" d="M 385 104 Q 388.5 107 392 104" fill="none" stroke="#f8fafc" stroke-width="1.6" />
      <circle v-else cx="389" cy="105" r="2.4" fill="none" stroke="#f8fafc" stroke-width="1.5" />
    </g>

    <!-- ==================== 4. 前后公交车轮与轮毂（底部贴合路面 y=262） ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- 后轮（x = 250） -->
      <path d="M 218 228 A 32 32 0 0 1 282 228" fill="#0f1425" stroke="#64748b" stroke-width="2.2" />
      <circle cx="250" cy="234" r="26" fill="#0f1425" stroke="#94a3b8" stroke-width="3.2" />
      <circle cx="250" cy="234" r="13" fill="#1e293b" stroke="#cbd5e1" stroke-width="2.2" />
      <circle cx="250" cy="234" r="4.5" fill="#2dd4bf" />

      <!-- 前轮（x = 602） -->
      <path d="M 570 228 A 32 32 0 0 1 634 228" fill="#0f1425" stroke="#64748b" stroke-width="2.2" />
      <circle cx="602" cy="234" r="26" fill="#0f1425" stroke="#94a3b8" stroke-width="3.2" />
      <circle cx="602" cy="234" r="13" fill="#1e293b" stroke="#cbd5e1" stroke-width="2.2" />
      <circle cx="602" cy="234" r="4.5" fill="#2dd4bf" />

      <!-- 紧急刹车时轮胎底部的摩擦火星与制动线 -->
      <g v-if="isBrake" stroke="#facc15" stroke-width="2">
        <line x1="242" y1="260" x2="222" y2="252" />
        <line x1="236" y1="261" x2="210" y2="258" />
        <line x1="594" y1="260" x2="574" y2="252" />
        <line x1="588" y1="261" x2="562" y2="258" />
      </g>
    </g>

    <!-- ==================== 5. 加速度 a 矢量与顶部状态标题 ==================== -->
    <CourseArrow v-if="accel" :from="accel.from" :to="accel.to" :stroke="isBrake ? '#f87171' : '#e2a846'" stroke-width="4" label="a" />

    <text x="420" y="38" text-anchor="middle" font-size="25" font-weight="600" fill="#f1f5f9">
      {{ title }}
    </text>
  </svg>
</template>

<style scoped>
.fig-bus {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
}

.person {
  transition: transform 0.45s cubic-bezier(0.22, 0.8, 0.32, 1);
  transform-origin: 388px 200px;
  transform-box: view-box;
}

.strap {
  transition: transform 0.45s cubic-bezier(0.22, 0.8, 0.32, 1);
  transform-origin: 0 0;
  transform-box: fill-box;
}
</style>
