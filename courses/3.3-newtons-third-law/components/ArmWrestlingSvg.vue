<template>
  <!-- 第 2 页：大人与小孩掰手腕（自然人体比例火柴人：左侧高大成人 vs 右侧踩木箱的小孩） -->
  <svg class="fig w-full h-auto" viewBox="0 60 520 180" style="max-width: 32rem" xmlns="http://www.w3.org/2000/svg">
    <!-- 地面与斜剖线 -->
    <SurfaceHatch :from="{ x: 24, y: 224 }" :to="{ x: 496, y: 224 }" side="below" :thickness="10" :gap="32" color="#cbd5e1" :line-width="3.6" />
    <line x1="24" y1="224" x2="496" y2="224" stroke="#cbd5e1" stroke-width="2.2" />

    <!-- ==================== 1. 桌子、大人坐凳与小孩垫脚木箱 ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- 左侧大人坐的低矮圆凳 -->
      <line x1="126" y1="186" x2="158" y2="186" stroke="#94a3b8" stroke-width="4" />
      <line x1="134" y1="186" x2="128" y2="224" stroke="#64748b" stroke-width="2.6" />
      <line x1="150" y1="186" x2="156" y2="224" stroke="#64748b" stroke-width="2.6" />

      <!-- 右侧小孩脚下垫高的木箱（凸显身高差） -->
      <rect x="336" y="196" width="56" height="28" rx="3" fill="rgba(148,163,184,0.14)" stroke="#94a3b8" stroke-width="2" />
      <line x1="336" y1="210" x2="392" y2="210" stroke="rgba(148,163,184,0.3)" stroke-width="1.4" />

      <!-- 中央掰手腕方桌（桌面 y=156，桌高 68px 符合真实人体坐姿比例） -->
      <rect x="198" y="154" width="124" height="6" rx="3" fill="rgba(203,213,225,0.25)" stroke="#cbd5e1" stroke-width="2" />
      <line x1="212" y1="160" x2="212" y2="224" stroke="#94a3b8" stroke-width="3" />
      <line x1="308" y1="160" x2="308" y2="224" stroke="#94a3b8" stroke-width="3" />
    </g>

    <!-- ==================== 2. 左侧：大人（高大火柴人，头大、躯干修长、四肢舒展） ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 远端后侧左腿与左扶手 -->
      <path d="M 144 182 L 176 188 L 174 223" stroke="#64748b" stroke-width="3.8" />
      <path d="M 178 112 L 172 138 L 204 153" stroke="#64748b" stroke-width="3.4" />

      <!-- 大人头部（r=15.5，金色主题） -->
      <circle cx="178" cy="86" r="15.5" fill="rgba(226,168,70,0.2)" stroke="#e2a846" stroke-width="3" />

      <!-- 大人修长躯干（肩 176,108 -> 胯 144,182，长 80px） -->
      <line x1="176" y1="108" x2="144" y2="182" stroke="#e2e8f0" stroke-width="4.8" />

      <!-- 大人前侧支撑右腿（胯 144,182 -> 膝 184,186 -> 脚 192,223） -->
      <path d="M 144 182 L 184 186 L 192 223" stroke="#e2e8f0" stroke-width="4.2" />

      <!-- 大人掰手腕主力右臂（肩 176,112 -> 肘抵桌面 228,153 -> 前臂升至交握点 258,116） -->
      <path d="M 176 112 L 228 153 L 258 116" stroke="#e2a846" stroke-width="4.4" />
    </g>

    <!-- ==================== 3. 右侧：小孩（小号火柴人，站在木箱上全身前倾使劲） ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 远端后侧蹬箱腿与扶桌小手 -->
      <path d="M 362 170 L 376 182 L 382 195" stroke="#64748b" stroke-width="2.8" />
      <path d="M 336 128 L 326 144 L 314 153" stroke="#64748b" stroke-width="2.6" />

      <!-- 小孩头部（r=11，比大人明显小一圈，蓝色主题） -->
      <circle cx="338" cy="108" r="11" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" stroke-width="2.6" />
      <!-- 小孩使劲的动感短线 -->
      <path d="M 353 96 L 359 91 M 356 104 L 363 102" stroke="#60a5fa" stroke-width="1.8" opacity="0.85" />

      <!-- 小孩短小躯干（肩 336,125 -> 胯 362,170，长 52px，大幅前倾） -->
      <line x1="336" y1="125" x2="362" y2="170" stroke="#e2e8f0" stroke-width="3.5" />

      <!-- 小孩前侧蹬箱腿（胯 362,170 -> 膝 348,181 -> 脚蹬木箱顶面 346,195） -->
      <path d="M 362 170 L 348 181 L 346 195" stroke="#e2e8f0" stroke-width="3.2" />

      <!-- 小孩掰手腕主力右臂（肩 336,128 -> 肘抵桌面 292,153 -> 前臂升至交握点 262,116） -->
      <path d="M 336 128 L 292 153 L 262 116" stroke="#60a5fa" stroke-width="3.2" />
    </g>

    <!-- ==================== 4. 两手交握点 ==================== -->
    <circle cx="258" cy="116" r="4.5" fill="#e2a846" stroke="#0f1425" stroke-width="1.2" />
    <circle cx="263" cy="116" r="3.4" fill="#60a5fa" stroke="#0f1425" stroke-width="1.2" />
  </svg>
</template>
