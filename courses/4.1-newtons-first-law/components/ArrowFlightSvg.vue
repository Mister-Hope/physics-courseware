<script setup lang="ts">
import { ref } from "vue";

const flying = ref(false);

/** 点击画面：第一次把箭射出去；再点一次把箭放回弦上，看清弓被拉满的样子 */
const toggle = (): void => {
  flying.value = !flying.value;
};
</script>

<template>
  <!-- 第 3 页：亚里士多德的困境——箭已离弦、弓不再推箭，箭却继续向前飞 -->
  <svg class="fig-arrow" viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" @click="toggle">
    <!-- ==================== 1. 离弦后的飞行轨迹线与破空尾迹 ==================== -->
    <g class="trail" :class="{ on: flying }">
      <!-- 主轨迹虚线 -->
      <line x1="236" y1="122" x2="430" y2="122" stroke="rgba(226,168,70,0.45)" stroke-width="2.6" stroke-dasharray="9 7" stroke-linecap="round" />
      <!-- 上下两侧轻盈气流线 -->
      <line x1="310" y1="106" x2="418" y2="106" stroke="rgba(56,189,248,0.28)" stroke-width="1.6" stroke-dasharray="14 10" stroke-linecap="round" />
      <line x1="330" y1="138" x2="418" y2="138" stroke="rgba(56,189,248,0.28)" stroke-width="1.6" stroke-dasharray="14 10" stroke-linecap="round" />
    </g>

    <!-- ==================== 2. 反曲弓与弓弦（分“拉满蓄力”与“离弦回弹”两态） ==================== -->
    <!-- 状态 A：拉满待发（!flying）——弓臂向后深弯蓄力，弓弦呈 V 形绷紧扣住箭筈 -->
    <g class="bow-state" :class="{ 'state-hidden': flying }" stroke-linecap="round" stroke-linejoin="round">
      <!-- 绷紧的 V 形弓弦（连接上弦槽 156,34 → 搭箭点 102,122 → 下弦槽 156,210） -->
      <polyline points="156,34 102,122 156,210" fill="none" stroke="#cbd5e1" stroke-width="2.6" />
      <!-- 弓弦中心红色护弦缠线（搭箭点） -->
      <line x1="104.5" y1="118" x2="102" y2="122" stroke="#f87171" stroke-width="3.4" />
      <line x1="102" y1="122" x2="104.5" y2="126" stroke="#f87171" stroke-width="3.4" />

      <!-- 上反曲弓臂（从弓把上端 206,98 向左弯曲至 152,44，再向外反曲至上弓梢 160,28） -->
      <path
        d="M 206 100 C 202 72, 174 52, 154 40 C 150 37, 152 31, 160 27 L 163 31 C 157 35, 158 39, 162 42 C 182 54, 210 74, 213 100 Z"
        fill="rgba(148,163,184,0.25)"
        stroke="#94a3b8"
        stroke-width="2.2"
      />
      <!-- 下反曲弓臂（对称向下弯曲并向外反曲至下弓梢 160,217） -->
      <path
        d="M 206 144 C 202 172, 174 192, 154 204 C 150 207, 152 213, 160 217 L 163 213 C 157 209, 158 205, 162 202 C 182 190, 210 170, 213 144 Z"
        fill="rgba(148,163,184,0.25)"
        stroke="#94a3b8"
        stroke-width="2.2"
      />
      <!-- 上下弓梢弦枕圆点 -->
      <circle cx="156" cy="34" r="2.8" fill="#e2a846" />
      <circle cx="156" cy="210" r="2.8" fill="#e2a846" />
    </g>

    <!-- 状态 B：离弦释放（flying）——弓臂向前舒展回弹，弓弦恢复竖直绷紧 -->
    <g class="bow-state" :class="{ 'state-hidden': !flying }" stroke-linecap="round" stroke-linejoin="round">
      <!-- 回弹竖直弓弦（连接上弦槽 176,28 → 下弦槽 176,216） -->
      <line x1="176" y1="28" x2="176" y2="216" stroke="#cbd5e1" stroke-width="2.6" />
      <!-- 弓弦中心护弦缠线 -->
      <line x1="176" y1="117" x2="176" y2="127" stroke="#f87171" stroke-width="3.6" />

      <!-- 舒展后的上反曲弓臂 -->
      <path
        d="M 206 100 C 206 72, 190 50, 173 34 C 170 31, 173 25, 181 22 L 184 26 C 178 29, 178 33, 181 36 C 198 52, 213 74, 213 100 Z"
        fill="rgba(148,163,184,0.25)"
        stroke="#94a3b8"
        stroke-width="2.2"
      />
      <!-- 舒展后的下反曲弓臂 -->
      <path
        d="M 206 144 C 206 172, 190 194, 173 210 C 170 213, 173 219, 181 222 L 184 218 C 178 215, 178 211, 181 208 C 198 192, 213 170, 213 144 Z"
        fill="rgba(148,163,184,0.25)"
        stroke="#94a3b8"
        stroke-width="2.2"
      />
      <!-- 上下弓梢弦枕圆点 -->
      <circle cx="176" cy="28" r="2.8" fill="#e2a846" />
      <circle cx="176" cy="216" r="2.8" fill="#e2a846" />
    </g>

    <!-- 弓把中心握把（固定在 x=205..215, y=98..146，带琥珀金护手箍与搭箭台） -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- 握把主体 -->
      <path
        d="M 205 98 L 214 98 C 216 110, 217 116, 215 122 C 217 128, 216 134, 214 146 L 205 146 C 207 134, 208 128, 206 122 C 208 116, 207 110, 205 98 Z"
        fill="#1e293b"
        stroke="#cbd5e1"
        stroke-width="2"
      />
      <!-- 握把皮质防滑缠带纹理 -->
      <line x1="206.5" y1="110" x2="215.5" y2="110" stroke="#e2a846" stroke-width="1.6" opacity="0.85" />
      <line x1="206.5" y1="118" x2="215.5" y2="118" stroke="#e2a846" stroke-width="1.6" opacity="0.85" />
      <line x1="206.5" y1="126" x2="215.5" y2="126" stroke="#e2a846" stroke-width="1.6" opacity="0.85" />
      <line x1="206.5" y1="134" x2="215.5" y2="134" stroke="#e2a846" stroke-width="1.6" opacity="0.85" />
      <!-- 上下金属 декора 护圈 -->
      <rect x="204" y="96" width="11" height="4" rx="1.5" fill="#e2a846" />
      <rect x="204" y="144" width="11" height="4" rx="1.5" fill="#e2a846" />
    </g>

    <!-- ==================== 3. 羽箭（流线型箭羽 + 箭筈 + 箭杆 + 破甲金属箭簇） ==================== -->
    <g class="arrow" :class="{ fly: flying }" stroke-linecap="round" stroke-linejoin="round">
      <!-- ① 箭羽（上下对称流线型尾羽 + 内部斜向羽翎纹理，x: 108..148） -->
      <!-- 上片尾羽 -->
      <path d="M 108 120.2 L 116 109.5 Q 132 108.5 146 120.2 Z" fill="rgba(248,113,113,0.26)" stroke="#f87171" stroke-width="1.7" />
      <line x1="116" y1="120" x2="120" y2="110.5" stroke="#f87171" stroke-width="1.1" opacity="0.7" />
      <line x1="124" y1="120" x2="128" y2="111.5" stroke="#f87171" stroke-width="1.1" opacity="0.7" />
      <line x1="132" y1="120" x2="135.5" y2="113.5" stroke="#f87171" stroke-width="1.1" opacity="0.7" />

      <!-- 下片尾羽 -->
      <path d="M 108 123.8 L 116 134.5 Q 132 135.5 146 123.8 Z" fill="rgba(248,113,113,0.26)" stroke="#f87171" stroke-width="1.7" />
      <line x1="116" y1="124" x2="120" y2="133.5" stroke="#f87171" stroke-width="1.1" opacity="0.7" />
      <line x1="124" y1="124" x2="128" y2="132.5" stroke="#f87171" stroke-width="1.1" opacity="0.7" />
      <line x1="132" y1="124" x2="135.5" y2="130.5" stroke="#f87171" stroke-width="1.1" opacity="0.7" />

      <!-- ② 箭筈（尾部扣弦凹槽，x: 100..107） -->
      <path d="M 107 119.6 L 101 119.6 L 103.5 122 L 101 124.4 L 107 124.4 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.2" />

      <!-- ③ 箭杆（修长木质/碳素箭杆，x: 106..286, y: 120.2..123.8） -->
      <rect x="106" y="120.2" width="180" height="3.6" rx="1.2" fill="rgba(226,168,70,0.32)" stroke="#e2a846" stroke-width="1.6" />
      <!-- 箭羽前端扎线金箍（x: 147..152） -->
      <line x1="148" y1="119.8" x2="148" y2="124.2" stroke="#f8fafc" stroke-width="1.5" />
      <line x1="152" y1="119.8" x2="152" y2="124.2" stroke="#f87171" stroke-width="1.5" />

      <!-- ④ 棱面金属箭簇（双翼倒刺破甲箭头 + 中脊线，x: 282..316） -->
      <!-- 箭簇套筒 -->
      <rect x="282" y="119.5" width="6" height="5" rx="1" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1.2" />
      <!-- 箭簇上半亮面与下半暗面（立体棱线感） -->
      <polygon points="316,122 283,113 289,122" fill="rgba(248,250,252,0.38)" />
      <polygon points="316,122 289,122 283,131" fill="rgba(148,163,184,0.22)" />
      <!-- 箭簇外轮廓与中心脊线 -->
      <polygon points="316,122 283,113 289,122 283,131" fill="none" stroke="#f8fafc" stroke-width="1.9" />
      <line x1="288" y1="122" x2="315" y2="122" stroke="#cbd5e1" stroke-width="1.2" />
    </g>
  </svg>
</template>

<style scoped>
.fig-arrow {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
}

/* 箭与弓弦状态均走平滑过渡：射出去、再点回来，两个方向都能看清 */
.arrow {
  transition: transform 1.3s cubic-bezier(0.15, 0.6, 0.35, 1);
  transform: translateX(0);
}

.arrow.fly {
  transform: translateX(332px);
}

.bow-state {
  transition: opacity 0.25s ease;
}

.state-hidden {
  opacity: 0;
}

.trail {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.trail.on {
  opacity: 1;
  transition: opacity 0.4s ease 0.25s;
}
</style>
