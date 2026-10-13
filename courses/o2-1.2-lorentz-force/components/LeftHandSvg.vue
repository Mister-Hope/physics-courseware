<!--
  左手定则演示手（LeftHandRule.vue 右侧图，画成 `<g>`，只能用在 <svg> 里）
  —— 掌面朝观察者、四指沿等效电流方向平伸、拇指沿 F_洛 方向竖起；本身是一只"左手"。
     四种朝向（恒等 / 旋转 180° / 水平镜像 / 垂直镜像）由父组件绕"掌心血点"做刚体变换，
     组件只负责把手画出来，并按 palm 切换掌纹（掌面）与指节 + 指甲（手背）。
  画风：写实手绘（与 3.2-friction 的手保持同一套肤色体系），不写任何文字。
  手掌几何中心 = (190, 168)，父组件的磁场记号叠在该点上。
-->
<script setup>
const { palm = true, highlightThumb = false } = defineProps({
  /** 掌面朝观察者（true 画掌纹）还是看到手背（false 画指节与指甲） */
  palm: { type: Boolean, default: true },
  /** Step ≥ 3 时点亮拇指描边（与 F_洛 同色），强调"拇指即力" */
  highlightThumb: { type: Boolean, default: false },
});
</script>

<template>
  <g>
    <!-- ── 手腕（小臂残段，底左方向，建立"掌面朝外"的朝向参照） ── -->
    <path
      d="M 176 232 C 168 252, 152 268, 132 282 C 118 292, 108 294, 102 288 C 96 282, 100 272, 110 262 C 126 246, 138 234, 146 224 Z"
      fill="#eebd94"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />

    <!-- ── 手掌主体 ── -->
    <path
      d="M 252 96 C 268 120, 272 156, 264 190 C 260 212, 246 228, 224 236 C 202 241, 178 240, 158 232 C 142 226, 130 218, 122 208 C 112 194, 108 174, 108 156 C 108 136, 116 120, 132 112 C 148 104, 168 100, 196 98 C 224 96, 240 96, 252 96 Z"
      fill="#f2c9a2"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />

    <!-- 手掌高光（大鱼际 / 小鱼际的柔和亮面，只提亮度不做脏色） -->
    <path d="M 148 118 C 132 136, 128 164, 136 190 C 132 168, 134 142, 148 118 Z" fill="#fbe3c8" opacity="0.5" />
    <path d="M 262 132 C 258 158, 246 182, 228 200 C 240 186, 254 162, 262 132 Z" fill="#fbe3c8" opacity="0.45" />

    <!-- ── 拇指（独立路径：父组件高亮它＝强调拇指＝F 方向） ── -->
    <path
      d="M 158 116 C 174 96, 160 64, 136 46 C 128 40, 116 40, 110 46 C 100 56, 100 72, 104 92 C 108 112, 116 132, 128 146 C 142 156, 154 138, 158 116 Z"
      fill="#f5cfa9"
      :stroke="highlightThumb ? '#2dd4bf' : '#8c5a40'"
      :stroke-width="highlightThumb ? 4 : 3.2"
      stroke-linejoin="round"
    />

    <!-- ── 四指（食 / 中 / 无 / 小，各自独立、自然长短差与指缝） ── -->
    <!-- 食指 -->
    <path
      d="M 246 101 C 282 101, 310 103, 328 105 C 338 107, 344 111, 344 116 C 344 122, 338 126, 328 128 C 306 130, 276 131, 248 131 Q 242 116 246 101 Z"
      fill="#f2c9a2"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />
    <!-- 中指（最长） -->
    <path
      d="M 246 134 C 284 134, 312 135, 330 137 C 340 139, 348 143, 348 150 C 348 157, 341 161, 330 163 C 308 165, 278 166, 248 166 Q 242 150 246 134 Z"
      fill="#f2c9a2"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />
    <!-- 无名指 -->
    <path
      d="M 246 169 C 282 169, 310 170, 328 172 C 338 174, 342 178, 342 184 C 342 190, 337 194, 328 196 C 306 198, 276 199, 248 199 Q 242 184 246 169 Z"
      fill="#f2c9a2"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />
    <!-- 小指（最短最细） -->
    <path
      d="M 244 203 C 274 203, 300 204, 316 206 C 325 208, 328 211, 328 216 C 328 222, 323 226, 314 228 C 294 229, 270 229, 246 229 Q 240 216 244 203 Z"
      fill="#f2c9a2"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />

    <!-- ── 表面细节：掌面（掌纹） vs 手背（指节横纹 + 指甲） ── -->
    <g v-if="palm" fill="none" stroke="#c98f62" stroke-linecap="round">
      <!-- 生命线：虎口弯入大鱼际 -->
      <path d="M 150 132 C 138 158, 132 186, 132 214" stroke-width="2.6" opacity="0.8" />
      <!-- 智慧线：横贯掌心 -->
      <path d="M 158 148 C 178 158, 204 162, 230 156" stroke-width="2.4" opacity="0.75" />
      <!-- 感情线：小指侧弯向食指根 -->
      <path d="M 238 126 C 222 138, 202 146, 184 148" stroke-width="2.4" opacity="0.75" />
      <!-- 虎口褶 -->
      <path d="M 128 120 C 138 128, 150 130, 160 126" stroke-width="2.2" opacity="0.7" />
      <!-- 腕纹 -->
      <path d="M 148 220 C 160 226, 172 226, 184 220" stroke-width="2.2" opacity="0.6" />
    </g>
    <g v-else fill="none" stroke="#c98f62" stroke-linecap="round">
      <!-- 指根横纹（手背的关节褶） -->
      <path d="M 252 110 Q 264 116 276 110" stroke-width="2.4" opacity="0.85" />
      <path d="M 252 144 Q 264 150 278 144" stroke-width="2.4" opacity="0.85" />
      <path d="M 252 178 Q 264 184 278 178" stroke-width="2.4" opacity="0.85" />
      <path d="M 250 212 Q 262 218 276 212" stroke-width="2.4" opacity="0.85" />
      <!-- 拇指根褶 -->
      <path d="M 132 122 Q 148 130 166 124" stroke-width="2.2" opacity="0.8" />
      <!-- 手背上的中节指褶（每指一道） -->
      <path d="M 300 112 Q 312 118 326 116" stroke-width="2" opacity="0.6" />
      <path d="M 304 146 Q 316 152 330 150" stroke-width="2" opacity="0.6" />
      <path d="M 300 180 Q 312 186 324 184" stroke-width="2" opacity="0.6" />
      <path d="M 290 214 Q 300 219 312 217" stroke-width="2" opacity="0.6" />
    </g>

    <!-- 手背（非掌面）时的指甲 -->
    <g v-if="!palm" fill="#f9e6dc" stroke="#8c5a40" stroke-width="1.8" stroke-linejoin="round">
      <path d="M 322 109 C 328 104, 336 105, 340 111 C 338 116, 328 117, 323 115 Z" />
      <path d="M 326 143 C 332 138, 340 139, 344 145 C 342 150, 332 151, 327 149 Z" />
      <path d="M 320 177 C 326 172, 333 173, 337 179 C 335 184, 327 185, 322 183 Z" />
      <path d="M 304 209 C 309 205, 315 206, 318 211 C 316 215, 310 216, 305 214 Z" />
    </g>
  </g>
</template>
