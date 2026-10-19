<!--
  引课图：功的概念（精修美化版）
  起重机竖直提升重物（力与位移同向） vs 马拉雪橇（力与位移成一定角度）
  
  物理逻辑与视觉规约：
    1. 真实生动健硕的牵引骏马（完整绘制马身、四肢、关节与马蹄）：
       - 告别抽象几何线框，完整刻画具有真实解剖特征的骏马全身；
       - 前肢（前小腿、腕关节/膝关节、管骨、球节与前蹄）；
       - 后肢（强健大腿/臀肌、飞节 hock、后管骨、球节与后蹄）；
       - 四蹄稳踏地表（y=200），前踏后蹬，富有生动前进拉力动势；
       - 包含马头、马鬃、额毛、警觉双耳、下颚、马尾、以及胸部挽具（Harness）与挽环；
    2. 真实雪橇与受力点：
       - 前端圆翘滑板、双层实木车身；
       - 力的作用点严格位于雪橇几何中心 O；
       - 斜向拉力 F 沿牵引线向上倾斜（约 31°）；
       - 水平位移 x 标在雪橇身上，标注文本置于箭头远端上方，与夹角 α 保持充足安全间距，绝不重叠；
    3. 左侧工业起重机：
       - 工字钢吊梁、行车滑轮组、钢丝绳与起重吊钩，拉力 F 沿绳竖直向上；
       - 旁侧标出竖直位移 x，清爽对齐；
    4. 纯图形物理示意，保持 viewBox="0 0 700 250"，移除任何硬编码 width 属性，完美自适应 Slidev 容器。
-->
<script setup lang="ts">
// 文字光晕
const HALO = {
  stroke: "var(--c-bg, #0f1425)",
  "stroke-width": 3.6,
  "paint-order": "stroke",
} as const;

// ══════════════ 左侧：起重机提升重物 ══════════════
const CRANE_O = { x: 160, y: 174 }; // 重物中心
const craneFTip = { x: 160, y: 98 }; // 拉力 F 向上
const craneXFrom = { x: 215, y: 196 }; // 位移旁侧起点
const craneXTo = { x: 215, y: 114 }; // 位移旁侧终点

// ══════════════ 右侧：马拉雪橇 ══════════════
// 雪橇几何中心 O
const SLED_O = { x: 440, y: 184 };

// 拉力 F：沿挽绳斜向上（倾角 31°，长 76 px）
const SLED_ANG = (31 * Math.PI) / 180;
const SLED_F_LEN = 76;
const sledFTip = {
  x: SLED_O.x + SLED_F_LEN * Math.cos(SLED_ANG), // ~505.1
  y: SLED_O.y - SLED_F_LEN * Math.sin(SLED_ANG), // ~144.8
};

// 水平位移 x：从雪橇中心水平向右，长 96 px
const SLED_X_LEN = 96;
const sledXTip = { x: SLED_O.x + SLED_X_LEN, y: SLED_O.y }; // (536, 184)

// 夹角 α 弧线（半径 36 px）
const SLED_R = 36;
const sledArcFrom = { x: SLED_O.x + SLED_R, y: SLED_O.y }; // (476, 184)
const sledArcTo = {
  x: SLED_O.x + SLED_R * Math.cos(SLED_ANG), // ~470.9
  y: SLED_O.y - SLED_R * Math.sin(SLED_ANG), // ~165.4
};
const sledArcPath = `M ${sledArcFrom.x.toFixed(1)} ${sledArcFrom.y.toFixed(1)} A ${SLED_R} ${SLED_R} 0 0 0 ${sledArcTo.x.toFixed(1)} ${sledArcTo.y.toFixed(1)}`;

// 夹角文字 α 锚点：紧贴弧线内侧（平分角约 15.5°），完全避开位移文字
const sledAlphaPos = {
  x: SLED_O.x + (SLED_R - 12) * Math.cos(SLED_ANG / 2), // ~463.1
  y: SLED_O.y - (SLED_R - 12) * Math.sin(SLED_ANG / 2) + 2, // ~179.6
};
</script>

<template>
  <svg
    viewBox="0 0 700 250"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="起重机竖直提升重物与马拉雪橇两种情形"
    class="select-none overflow-visible"
    style="display: block; margin: 0 auto"
  >
    <defs>
      <!-- 重物金属箱渐变 -->
      <linearGradient id="crane-box-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--c-surface-solid, #1e293b)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95" />
      </linearGradient>

      <!-- 雪橇木质车厢渐变 -->
      <linearGradient id="sled-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--c-surface-solid, #1e293b)" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#0b1329" stop-opacity="0.9" />
      </linearGradient>

      <!-- 骏马优雅微光剪影渐变 -->
      <linearGradient id="horse-body-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--c-text-dim, #94a3b8)" stop-opacity="0.14" />
        <stop offset="100%" stop-color="var(--c-text-dim, #94a3b8)" stop-opacity="0.25" />
      </linearGradient>
    </defs>

    <!-- 中间虚线隔离轴 -->
    <line x1="350" y1="18" x2="350" y2="216" stroke="var(--c-text-dim, #64748b)" stroke-width="1.2" stroke-dasharray="4 6" opacity="0.45" />

    <!-- ════════════════════ 左侧：起重机竖直提升 ════════════════════ -->
    <!-- 地面 -->
    <SurfaceHatch
      :from="{ x: 30, y: 200 }"
      :to="{ x: 320, y: 200 }"
      side="below"
      :thickness="12"
      :gap="20"
      color="rgba(148, 163, 184, 0.45)"
      :line-width="2.2"
      :hatch-width="1.2"
    />

    <!-- 起重机顶部吊臂横梁 (工字钢结构) -->
    <g>
      <!-- 横梁主槽钢 -->
      <rect x="96" y="36" width="128" height="12" rx="2" fill="#1e293b" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2" />
      <!-- 滑轮行车小车 -->
      <rect x="146" y="48" width="28" height="8" rx="2" fill="#334155" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.4" />
      <circle cx="153" cy="56" r="3.5" fill="#0f172a" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.2" />
      <circle cx="167" cy="56" r="3.5" fill="#0f172a" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.2" />

      <!-- 悬吊钢丝绳 -->
      <line x1="160" y1="56" x2="160" y2="134" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2.2" />

      <!-- 吊钩 -->
      <path
        d="M 158 134 L 162 134 L 162 140 Q 166 142 163 147 Q 158 150 155 145"
        fill="none"
        stroke="var(--c-accent, #e2a846)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </g>

    <!-- 提升重物 (长 70, 高 52) -->
    <g>
      <!-- 阴影 -->
      <rect x="128" y="198" width="64" height="3" rx="1.5" fill="rgba(0,0,0,0.4)" />
      <!-- 货物主体 -->
      <rect x="125" y="148" width="70" height="52" rx="6" fill="url(#crane-box-grad)" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2.4" />
      <!-- 吊环 -->
      <circle cx="160" cy="148" r="4.5" fill="none" stroke="var(--c-accent, #e2a846)" stroke-width="2" />

      <!-- 加强筋边框饰条 -->
      <line x1="131" y1="149" x2="189" y2="149" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
      <line x1="125" y1="174" x2="195" y2="174" stroke="rgba(148,163,184,0.3)" stroke-width="1.2" stroke-dasharray="3 3" />

      <!-- 质量标注 m -->
      <text x="138" y="194" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text, #f8fafc)" :style="HALO">m</text>

      <!-- 重心受力点 -->
      <circle cx="160" cy="174" r="3" fill="#0f172a" stroke="var(--c-accent, #e2a846)" stroke-width="1.4" />
      <circle cx="160" cy="174" r="1.2" fill="var(--c-accent, #e2a846)" />
    </g>

    <!-- 竖直拉力 F 矢量 (从重物中心向上) -->
    <CourseArrow
      :from="CRANE_O"
      :to="craneFTip"
      stroke="var(--c-accent, #e2a846)"
      :stroke-width="3.4"
      label="F"
      :label-dx="14"
      :label-dy="-4"
      :head-size="10"
    />

    <!-- 竖直位移 x 矢量 (在右旁侧标注) -->
    <g>
      <!-- 位移初末水平参考线 -->
      <line x1="195" y1="196" x2="228" y2="196" stroke="rgba(56,189,248,0.35)" stroke-width="1" stroke-dasharray="2 3" />
      <line x1="195" y1="114" x2="228" y2="114" stroke="rgba(56,189,248,0.35)" stroke-width="1" stroke-dasharray="2 3" />
      <CourseArrow
        :from="craneXFrom"
        :to="craneXTo"
        stroke="var(--c-velocity, #38bdf8)"
        :stroke-width="2.8"
        stroke-dasharray="8 6"
        label="x"
        :label-dx="14"
        :label-dy="-4"
        :head-size="8.5"
      />
    </g>

    <!-- 左侧底部结论 -->
    <text x="175" y="234" text-anchor="middle" font-size="15" font-weight="bold" fill="var(--c-text-dim, #cbd5e1)">力与位移同向</text>

    <!-- ════════════════════ 右侧：马拉雪橇 ════════════════════ -->
    <!-- 地面 -->
    <SurfaceHatch
      :from="{ x: 370, y: 200 }"
      :to="{ x: 680, y: 200 }"
      side="below"
      :thickness="12"
      :gap="20"
      color="rgba(148, 163, 184, 0.45)"
      :line-width="2.2"
      :hatch-width="1.2"
    />

    <!-- 1. 雪橇主体 (Sled) -->
    <g>
      <!-- 雪橇滑雪板 (底面平直，前部圆弧翻卷) -->
      <path
        d="M 395 200 L 468 200 Q 484 200 487 182 Q 488 174 482 173"
        fill="none"
        stroke="var(--c-text-dim, #94a3b8)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <!-- 滑板前部加固横梁 -->
      <line x1="466" y1="184" x2="484" y2="183" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.6" />

      <!-- 垂直支撑木桩 -->
      <line x1="412" y1="200" x2="412" y2="186" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2.2" />
      <line x1="436" y1="200" x2="436" y2="186" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2.2" />
      <line x1="460" y1="200" x2="460" y2="186" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2.2" />

      <!-- 雪橇货斗底座 -->
      <rect x="405" y="172" width="68" height="14" rx="3" fill="url(#sled-body-grad)" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2.2" />
      <!-- 雪橇后靠背 -->
      <path d="M 405 174 L 401 160" fill="none" stroke="var(--c-text-dim, #94a3b8)" stroke-width="2.4" stroke-linecap="round" />

      <!-- 几何中心作用点 -->
      <circle :cx="SLED_O.x" :cy="SLED_O.y" r="3.2" fill="#0f172a" stroke="var(--c-accent, #e2a846)" stroke-width="1.4" />
      <circle :cx="SLED_O.x" :cy="SLED_O.y" r="1.2" fill="var(--c-accent, #e2a846)" />
    </g>

    <!-- 2. 真实矫健生动的牵引骏马 (完整四肢腿部骨骼结构、马身、马头与挽具) -->
    <g class="horse-group">
      <!-- 2.1 内侧远端后腿（左后腿：大腿、飞节 hock、管骨、球节与后蹄） -->
      <path
        d="
          M 540 138
          C 534 148, 528 158, 526 165
          L 529 186
          C 528 190, 527 194, 529 196
          L 527 200
          L 537 200
          L 536 195
          L 534 188
          L 531 172
          L 536 164
          C 540 156, 546 148, 552 140
          Z
        "
        fill="rgba(148, 163, 184, 0.16)"
        stroke="var(--c-text-dim, #94a3b8)"
        stroke-width="1.8"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <!-- 左后蹄角质加深 -->
      <polygon points="527,200 537,200 536,195 529,196" fill="#0f172a" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1" />

      <!-- 2.2 内侧远端前腿（左前腿：前臂、腕关节/膝关节、前管骨、球节与前蹄） -->
      <path
        d="
          M 607 142
          L 609 156
          L 610 168
          L 612 186
          C 611 190, 611 193, 613 196
          L 611 200
          L 620 200
          L 619 195
          L 616 188
          L 614 170
          L 612 154
          L 609 142
          Z
        "
        fill="rgba(148, 163, 184, 0.16)"
        stroke="var(--c-text-dim, #94a3b8)"
        stroke-width="1.8"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <!-- 左前蹄角质加深 -->
      <polygon points="611,200 620,200 619,195 613,196" fill="#0f172a" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1" />

      <!-- 2.3 外侧主体：马头、警觉双耳、弓起颈项、鬐甲背脊、强健后臀、近端后腿与近端前腿完整轮廓 -->
      <path
        d="
          M 600 104
          C 586 108, 572 109, 560 106
          C 546 104, 536 109, 532 118
          C 528 126, 528 138, 532 148
          C 536 156, 540 162, 542 166
          L 545 186
          C 544 190, 545 193, 546 195
          L 548 197
          L 547 200
          L 558 200
          L 556 195
          L 553 190
          L 550 172
          L 549 164
          C 552 156, 556 150, 562 144
          C 572 142, 588 145, 600 144
          C 606 144, 612 146, 614 150
          L 617 166
          L 618 172
          L 620 188
          C 619 191, 620 194, 621 195
          L 623 197
          L 622 200
          L 634 200
          L 632 195
          L 628 190
          L 626 172
          L 625 166
          C 625 156, 626 146, 624 136
          C 624 130, 628 124, 626 118
          C 624 110, 632 100, 642 94
          C 648 92, 654 94, 658 93
          L 664 91
          C 668 90, 670 88, 668 86
          C 670 84, 666 80, 662 78
          C 656 74, 650 70, 646 64
          L 642 62
          L 646 48
          L 640 62
          L 636 51
          L 632 64
          C 624 72, 614 84, 606 94
          Z
        "
        fill="url(#horse-body-grad)"
        stroke="var(--c-text-dim, #94a3b8)"
        stroke-width="2.2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <!-- 右后蹄角质 -->
      <polygon points="547,200 558,200 556,195 548,197" fill="#0f172a" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.2" />
      <!-- 右前蹄角质 -->
      <polygon points="622,200 634,200 632,195 623,197" fill="#0f172a" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.2" />

      <!-- 2.4 飘逸潇洒马尾 -->
      <path
        d="M 532 118 C 520 124, 512 138, 510 156 C 508 172, 514 184, 520 188 C 518 178, 520 162, 524 148 C 527 136, 531 126, 532 118 Z"
        fill="rgba(148, 163, 184, 0.22)"
        stroke="var(--c-text-dim, #94a3b8)"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
      <path d="M 524 130 C 516 142, 516 160, 522 176" fill="none" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.4" stroke-linecap="round" />

      <!-- 2.5 颈背鬃毛与额毛 -->
      <path
        d="
          M 640 62 Q 634 70 630 78
          M 630 78 Q 622 86 618 94
          M 618 94 Q 610 102 604 108
        "
        fill="none"
        stroke="var(--c-text-dim, #94a3b8)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path d="M 642 62 Q 646 68 648 74" fill="none" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.8" stroke-linecap="round" />

      <!-- 2.6 头部五官（眼睛、鼻孔、嘴唇缝） -->
      <ellipse cx="650" cy="74" rx="2.4" ry="1.6" fill="#0f172a" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.2" />
      <circle cx="650.8" cy="73.6" r="0.6" fill="#f8fafc" />
      <path d="M 664 84 Q 667 84 666 87" fill="none" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.3" stroke-linecap="round" />
      <path d="M 664 90 L 668 89" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.2" stroke-linecap="round" />

      <!-- 2.7 肌肉立体感解剖线（肩胛骨肌肉轮廓与膝关节结构） -->
      <path d="M 602 108 C 612 116, 618 126, 616 142" fill="none" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1.2" stroke-linecap="round" />
      <path d="M 556 120 C 554 130, 556 140, 560 146" fill="none" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1.2" stroke-linecap="round" />

      <!-- 2.8 马身专业牵引挽具（Breastplate Harness 挽具带与金属挽环） -->
      <!-- 环绕马肩的强力胸带 -->
      <path d="M 626 122 C 618 128, 610 134, 602 136" fill="none" stroke="var(--c-accent, #e2a846)" stroke-width="2.6" stroke-linecap="round" />
      <!-- 颈部悬吊支带 -->
      <line x1="602" y1="136" x2="604" y2="108" stroke="var(--c-accent, #e2a846)" stroke-width="1.6" stroke-linecap="round" opacity="0.85" />
      <!-- 马背鞍带 -->
      <line x1="584" y1="110" x2="586" y2="145" stroke="var(--c-text-dim, #94a3b8)" stroke-width="1.4" opacity="0.5" />
      <!-- 金属挽扣环 -->
      <circle cx="602" cy="136" r="3.2" fill="#0f172a" stroke="var(--c-accent, #e2a846)" stroke-width="1.8" />
    </g>

    <!-- 3. 牵引绳索（从雪橇中心引向马身挽扣环） -->
    <line :x1="SLED_O.x" :y1="SLED_O.y" x2="602" y2="136" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.8" stroke-dasharray="4 3" />

    <!-- 4. 水平位移 x 矢量 (实线箭头，标注置于右上方，与 α 横向错开，绝不重叠) -->
    <CourseArrow
      :from="SLED_O"
      :to="sledXTip"
      stroke="var(--c-velocity, #38bdf8)"
      :stroke-width="2.8"
      label="x"
      :label-dx="32"
      :label-dy="-10"
      :head-size="8.5"
    />

    <!-- 5. 夹角 α 弧线与标注 (紧贴雪橇中心弧线内侧，与 x 文字横向错开 65px 以上) -->
    <path :d="sledArcPath" fill="none" stroke="var(--c-accent, #e2a846)" stroke-width="1.6" stroke-linecap="round" />
    <text :x="sledAlphaPos.x" :y="sledAlphaPos.y" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent, #e2a846)" :style="HALO">
      α
    </text>

    <!-- 6. 斜向拉力 F 矢量 (起笔于雪橇几何中心) -->
    <CourseArrow :from="SLED_O" :to="sledFTip" stroke="var(--c-accent, #e2a846)" :stroke-width="3.4" label="F" :label-dx="10" :label-dy="-12" :head-size="10" />

    <!-- 右侧底部结论 -->
    <text x="525" y="234" text-anchor="middle" font-size="15" font-weight="bold" fill="var(--c-text-dim, #cbd5e1)">力与位移成一定角度</text>
  </svg>
</template>

<style scoped>
svg {
  display: block;
}
</style>
