<script setup lang="ts">
// 第 5 页：实验装置。tilted=false 时木板放平，true 时抬起并在底下出现垫高块。
const { tilted = true } = defineProps<{ tilted?: boolean }>();
</script>

<template>
  <!-- 完整实验装置：打点计时器端垫高的长木板，配小车、纸带、定滑轮与悬挂槽码 -->
  <svg viewBox="0 0 440 212" width="100%" style="max-width: 500px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 暖色原木长木板纹理渐变 -->
      <linearGradient id="afmBoardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(245,158,11,0.44)" />
        <stop offset="45%" stop-color="rgba(217,119,6,0.36)" />
        <stop offset="100%" stop-color="rgba(146,64,14,0.48)" />
      </linearGradient>
      <!-- 垫高木块深木色渐变 -->
      <linearGradient id="afmWedgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(217,119,6,0.38)" />
        <stop offset="100%" stop-color="rgba(120,53,15,0.46)" />
      </linearGradient>
      <!-- 电火花打点计时器外壳渐变 -->
      <linearGradient id="afmTimerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(226,168,70,0.22)" />
        <stop offset="100%" stop-color="rgba(226,168,70,0.08)" />
      </linearGradient>
      <!-- 墨粉纸盘立体渐变 -->
      <linearGradient id="afmInkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(226,168,70,0.75)" />
        <stop offset="50%" stop-color="rgba(251,191,36,0.92)" />
        <stop offset="100%" stop-color="rgba(217,119,6,0.75)" />
      </linearGradient>
      <!-- 实验小车金属蓝车身渐变 -->
      <linearGradient id="afmCartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(96,165,250,0.42)" />
        <stop offset="60%" stop-color="rgba(59,130,246,0.24)" />
        <stop offset="100%" stop-color="rgba(29,78,216,0.4)" />
      </linearGradient>
      <!-- 槽码黄铜金属渐变 -->
      <linearGradient id="afmWeightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(226,168,70,0.38)" />
        <stop offset="45%" stop-color="rgba(251,191,36,0.56)" />
        <stop offset="100%" stop-color="rgba(180,83,9,0.42)" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 实验桌面接触面（复用 SurfaceHatch 组件）与右端桌沿 ==================== -->
    <SurfaceHatch :from="{ x: 6, y: 152 }" :to="{ x: 360, y: 152 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <line x1="360" y1="152" x2="360" y2="196" stroke="#64748b" stroke-width="1.8" opacity="0.6" />

    <!-- ==================== 2. 垫高木块（顶面严格贴合 9.2° 倾斜木板底面 y(x)=152-(350-x)tan9.2°，零重叠！） ==================== -->
    <g class="setup-block" :class="{ 'is-shown': tilted }">
      <!-- 在 x=36..70 区间，木板底面从 y=101.2 斜降至 y=106.7，垫高块顶面与之完全严丝合缝 -->
      <path d="M 36 101.4 L 70 106.9 L 70 152 L 36 152 Z" fill="url(#afmWedgeGrad)" stroke="#d97706" stroke-width="1.3" stroke-linejoin="round" />
      <!-- 木块内部木纹细节 -->
      <line x1="42" y1="118" x2="64" y2="121" stroke="rgba(251,191,36,0.28)" stroke-width="1" />
      <line x1="42" y1="136" x2="64" y2="138" stroke="rgba(251,191,36,0.28)" stroke-width="1" />
      <text x="53" y="176" font-size="11" fill="#fbbf24" text-anchor="middle">垫高木块</text>
    </g>

    <!-- ==================== 3. 长木板、固定在木板上的打点计时器、穿过限位孔的纸带、小车与木板末端滑轮支架 ==================== -->
    <g class="setup-board" :style="{ transform: tilted ? 'rotate(9.2deg)' : 'rotate(0deg)' }">
      <!-- ① 原木色长木板主体（x: 28..350, y: 140..152，底面右端 (350, 152) 为旋转支点） -->
      <rect x="28" y="140" width="322" height="12" rx="2" fill="url(#afmBoardGrad)" stroke="#f59e0b" stroke-width="1.3" />
      <!-- 木板上表面亮边与木纹 -->
      <line x1="29" y1="140.7" x2="349" y2="140.7" stroke="rgba(254,243,199,0.5)" stroke-width="1" />
      <line x1="80" y1="146" x2="165" y2="146" stroke="rgba(251,191,36,0.25)" stroke-width="1" />
      <line x1="210" y1="146" x2="310" y2="146" stroke="rgba(251,191,36,0.25)" stroke-width="1" />

      <!-- ② 固定在木板左端的电火花打点计时器（带锁紧夹座与固定螺栓） -->
      <!-- 夹紧在木板上的金属固定底座（y: 134..143，两侧螺栓锁入木板） -->
      <rect x="38" y="134" width="62" height="6" rx="1.2" fill="rgba(226,168,70,0.35)" stroke="#e2a846" stroke-width="1.2" />
      <!-- 底座左端 L 形包角夹具与两个锁紧螺栓（体现计时器牢固固定在木板上） -->
      <path d="M 38 134 L 33 134 L 33 149 L 39 149" fill="none" stroke="#e2a846" stroke-width="1.8" stroke-linejoin="round" />
      <circle cx="44" cy="137" r="1.4" fill="#fef08a" />
      <circle cx="94" cy="137" r="1.4" fill="#fef08a" />

      <!-- 计时器主壳体（x: 41..97, y: 92..134） -->
      <rect x="41" y="92" width="56" height="42" rx="4" fill="url(#afmTimerGrad)" stroke="#e2a846" stroke-width="1.4" />
      <!-- 内部放电承纸底板（位于纸带正下方 y = 117.5..120.5） -->
      <rect x="47" y="117.5" width="44" height="3" rx="1" fill="rgba(148,163,184,0.38)" />
      <text x="69" y="85" font-size="11" font-weight="600" fill="#e2a846" text-anchor="middle">打点计时器</text>

      <!-- ③ 贯穿左右限位孔、压在墨盘下并牢固夹在小车尾部的纸带 -->
      <path
        d="M 16 116.5 Q 26 114 38 114 L 224 114 L 224 117.5 L 38 117.5 Q 26 117.5 16 120 Z"
        fill="rgba(248,250,252,0.9)"
        stroke="rgba(203,213,225,0.95)"
        stroke-width="0.8"
      />
      <!-- 纸带上打出的点迹（从计时器右限位孔到小车尾部均匀/加速分布） -->
      <g fill="#0f172a">
        <circle cx="104" cy="115.7" r="1.05" />
        <circle cx="122" cy="115.7" r="1.05" />
        <circle cx="141" cy="115.7" r="1.05" />
        <circle cx="159" cy="115.7" r="1.05" />
        <circle cx="176" cy="115.7" r="1.05" />
        <circle cx="191" cy="115.7" r="1.05" />
        <circle cx="204" cy="115.7" r="1.05" />
        <circle cx="215" cy="115.7" r="1.05" />
      </g>
      <text x="160" y="106" font-size="11" fill="#cbd5e1" text-anchor="middle">纸带</text>

      <!-- ④ 压在纸带正上方的墨粉纸盘与放电针 + 左右限位孔（图层位于纸带之上，严密体现穿行关系） -->
      <line x1="69" y1="96" x2="69" y2="107" stroke="#e2a846" stroke-width="1.8" stroke-linecap="round" />
      <rect x="52" y="107" width="34" height="7" rx="1.8" fill="url(#afmInkGrad)" stroke="#f59e0b" stroke-width="1" />
      <line x1="52.5" y1="114" x2="85.5" y2="114" stroke="#78350f" stroke-width="1.2" />
      <line x1="78" y1="99" x2="74" y2="107" stroke="#cbd5e1" stroke-width="1.3" stroke-linecap="round" />
      <circle cx="74" cy="113.8" r="1.5" fill="#38bdf8" />

      <!-- 左限位孔（进纸端 x=41）与右限位孔（出纸端 x=97）上下夹耳 -->
      <rect x="38.5" y="109.5" width="5" height="4.2" rx="1" fill="#cbd5e1" stroke="#0f172a" stroke-width="0.7" />
      <rect x="38.5" y="117.8" width="5" height="4.2" rx="1" fill="#cbd5e1" stroke="#0f172a" stroke-width="0.7" />
      <rect x="94.5" y="109.5" width="5" height="4.2" rx="1" fill="#e2e8f0" stroke="#0f172a" stroke-width="0.7" />
      <rect x="94.5" y="117.8" width="5" height="4.2" rx="1" fill="#e2e8f0" stroke="#0f172a" stroke-width="0.7" />

      <!-- ⑤ 实验小车（尾部带专用纸带压紧夹具，车轮底部严格贴合木板上表面 y=140） -->
      <!-- 小车尾部纸带夹具与锁紧螺钉（将纸带右端牢固夹持在车尾） -->
      <rect x="220" y="111.5" width="6.5" height="8.5" rx="1.2" fill="#94a3b8" stroke="#e2e8f0" stroke-width="1" />
      <line x1="223" y1="108.5" x2="223" y2="111.5" stroke="#cbd5e1" stroke-width="1.5" />
      <rect x="220.5" y="107" width="5" height="2" rx="0.8" fill="#e2a846" />

      <!-- 小车车体 -->
      <path
        d="M 226 104 L 236 104 L 238 108 L 292 108 L 294 104 L 298 104 A 4 4 0 0 1 302 108 L 302 128 A 3.5 3.5 0 0 1 298.5 131.5 L 229.5 131.5 A 3.5 3.5 0 0 1 226 128 Z"
        fill="url(#afmCartGrad)"
        stroke="#60a5fa"
        stroke-width="1.5"
      />
      <!-- 小车前后车轮（cy = 132.5, r = 7.5 ⇒ 底部 140 刚好贴合木板上表面） -->
      <circle cx="241" cy="132.5" r="7.5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.8" />
      <circle cx="241" cy="132.5" r="2.5" fill="#93c5fd" />
      <circle cx="286" cy="132.5" r="7.5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.8" />
      <circle cx="286" cy="132.5" r="2.5" fill="#93c5fd" />
      <text x="264" y="96" font-size="12" font-weight="600" fill="#60a5fa" text-anchor="middle">小车</text>

      <!-- 小车前端挂环与平行于木板的牵引细绳（y = 117，切入滑轮最高点 373, 117） -->
      <circle cx="304.5" cy="117" r="2.4" fill="none" stroke="#93c5fd" stroke-width="1.5" />
      <line x1="307" y1="117" x2="373" y2="117" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" />

      <!-- ⑥ 固定在长木板右端的定滑轮金属夹具与双杆支架（彻底解决原版滑轮悬空问题） -->
      <path d="M 342 139.5 L 351 139.5 L 351 152.5 L 342 152.5" fill="rgba(148,163,184,0.35)" stroke="#cbd5e1" stroke-width="1.4" stroke-linejoin="round" />
      <circle cx="346.5" cy="146" r="1.4" fill="#e2e8f0" />
      <line x1="350" y1="142" x2="373" y2="128" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
      <line x1="350" y1="149" x2="373" y2="128" stroke="#64748b" stroke-width="2" stroke-linecap="round" />
    </g>

    <!-- ==================== 4. 定滑轮轮体与竖直垂挂的槽码（随木板末端精确平移，且保持槽码竖直下垂） ==================== -->
    <g class="setup-rig" :style="{ transform: tilted ? 'translate(3.5px, 4px)' : 'translate(0px, 0px)' }">
      <!-- 绕过滑轮右上象限并竖直垂下的细绳 -->
      <path d="M 373 117 A 11 11 0 0 1 384 128 L 384 176" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" />

      <!-- 定滑轮（圆心 373, 128，半径 11，与木板末端支架尖端严格重合） -->
      <circle cx="373" cy="128" r="11" fill="rgba(15,23,42,0.85)" stroke="#cbd5e1" stroke-width="1.8" />
      <circle cx="373" cy="128" r="7.2" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="1" stroke-dasharray="2.5 2" />
      <circle cx="373" cy="128" r="2.5" fill="#e2a846" />
      <text x="360" y="110" font-size="11" fill="#94a3b8" text-anchor="end">定滑轮</text>

      <!-- 槽码挂钩与多层槽码 -->
      <path d="M 384 176 L 384 180" stroke="#e2a846" stroke-width="1.6" stroke-linecap="round" />
      <rect x="373" y="180" width="22" height="20" rx="3" fill="url(#afmWeightGrad)" stroke="#e2a846" stroke-width="1.4" />
      <line x1="374" y1="186.7" x2="394" y2="186.7" stroke="rgba(226,168,70,0.7)" stroke-width="1" />
      <line x1="374" y1="193.4" x2="394" y2="193.4" stroke="rgba(226,168,70,0.7)" stroke-width="1" />
      <text x="384" y="210" font-size="11" font-weight="500" fill="#e2a846" text-anchor="middle">槽码</text>
    </g>
  </svg>
</template>

<style scoped>
/* 木板绕右端底部 (350, 152) 抬起；滑轮与槽码组做精确刚体平移，既锁死在木板末端支架上又保持槽码竖直下垂 */
.setup-board,
.setup-rig {
  transition: transform 0.75s ease;
  transform-box: view-box;
}

.setup-board {
  transform-origin: 350px 152px;
}

/* 垫高块在木板抬起之后出现 */
.setup-block {
  opacity: 0;
  transition: opacity 0.45s ease 0.25s;
}

.setup-block.is-shown {
  opacity: 1;
}
</style>
