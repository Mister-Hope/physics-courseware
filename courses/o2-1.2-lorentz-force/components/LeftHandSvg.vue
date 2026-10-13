<!--
  左手定则演示手（LeftHandRule.vue 右侧图，画成 `<g>`，只能用在 <svg> 里）
  —— 掌面朝观察者；四指沿等效电流方向平伸、拇指沿 F_洛 方向竖起（拇指与四指严格垂直）。
  画法（关键）：手先按**自然姿态**画——掌心朝观察者、四指竖直向上、拇指水平指向左侧，
      再用内置 `rotate(90 197 186)` 转成"四指朝右、拇指朝上"的基准姿态。
      旋转中心就是掌心，所以父组件的磁场记号 / 四种刚体变换都仍然绕掌心进行。
  手性自检：左手指向 = 拇指为四指逆时针 90°（掌心朝观察者时）。掌心朝外、四指向上 ⇒ 拇指朝左；
      转过 90° 后 ⇒ 四指朝右、拇指朝上，正好是左手定则的要求。
  画风：写实手绘（与 3.2-friction 的手同一套肤色体系），不写任何文字。
  关键：手掌 + 四指 + 拇指是**一条闭合轮廓**（拇指与掌根天然相连，没有贴上去的接缝）；
       step ≥ 3 的拇指强调，用一条沿拇指轮廓的 teal 描边叠在上面（不改变手的形状）。
  手掌几何中心 = (197, 186)。
-->
<script setup>
const { palm = true, highlightThumb = false } = defineProps({
  /** 掌面朝观察者（true 画掌纹）还是看到手背（false 画指根横纹与指甲） */
  palm: { type: Boolean, default: true },
  /** Step ≥ 3 时给拇指描一道高亮（与 F_洛 同色），强调"拇指即力" */
  highlightThumb: { type: Boolean, default: false },
});
</script>

<template>
  <g transform="rotate(90 197 186)">
    <!-- ── 手腕（小臂残段，向下，建立"掌面朝外"的朝向参照） ── -->
    <path
      d="M 230 240 C 234 280, 234 330, 236 392 L 164 392 C 166 330, 166 280, 168 242 Z"
      fill="#eebd94"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />
    <!-- 袖口线：让它读成"手臂"而不是第二根手指 -->
    <path d="M 165 320 C 190 328, 212 328, 235 320" fill="none" stroke="#b98a63" stroke-width="2" opacity="0.5" />

    <!-- ── 手（掌 + 四指 + 拇指一体轮廓，手指朝上） ── -->
    <path
      d="M 96 146
         C 116 140, 134 140, 148 142
         C 150 138, 151 132, 152 128
         C 150 96, 150 62, 152 46
         C 152 39, 158 34, 163 34
         C 168 34, 174 39, 174 46
         C 176 66, 176 100, 176 128
         C 176 132, 177 134, 180 134
         C 178 108, 178 62, 180 32
         C 180 25, 184 22, 187 22
         C 191 22, 194 25, 194 32
         C 196 62, 196 108, 198 130
         C 198 134, 199 136, 202 136
         C 200 108, 200 62, 202 40
         C 202 33, 205 30, 211 30
         C 217 30, 220 33, 220 40
         C 222 66, 222 112, 222 132
         C 222 136, 223 138, 226 138
         C 224 116, 224 76, 226 56
         C 226 50, 229 46, 233 46
         C 237 46, 241 50, 241 56
         C 243 80, 243 112, 244 132
         C 248 150, 250 192, 244 218
         C 240 232, 232 242, 220 246
         C 200 250, 176 250, 162 244
         C 152 238, 146 218, 144 198
         C 145 192, 146 191, 148 190
         C 126 192, 108 190, 96 186
         C 84 180, 84 152, 96 146 Z"
      fill="#f2c9a2"
      stroke="#8c5a40"
      stroke-width="3.2"
      stroke-linejoin="round"
    />

    <!-- 指根阴影（掌面看是四指根部，手背看是掌骨隆起） -->
    <path d="M 160 136 C 170 142, 200 144, 240 142" fill="none" stroke="#d99c6f" stroke-width="7" stroke-linecap="round" opacity="0.2" />
    <!-- 大鱼际高光 -->
    <ellipse cx="162" cy="205" rx="14" ry="28" fill="#fbe3c8" opacity="0.38" />
    <!-- 小鱼际高光 -->
    <ellipse cx="234" cy="200" rx="14" ry="24" fill="#fbe3c8" opacity="0.3" />

    <!-- ── 表面细节：掌面（掌纹） vs 手背（指根横纹 + 伸肌腱） ── -->
    <g v-if="palm" fill="none" stroke="#c98f62" stroke-linecap="round">
      <!-- 生命线：虎口弯入大鱼际 -->
      <path d="M 166 152 C 152 178, 152 212, 162 240" stroke-width="2.6" opacity="0.6" />
      <!-- 智慧线：横贯掌心 -->
      <path d="M 168 172 C 190 190, 212 200, 232 202" stroke-width="2.4" opacity="0.6" />
      <!-- 感情线：小指侧弯向食指根 -->
      <path d="M 234 156 C 216 162, 200 168, 184 170" stroke-width="2.4" opacity="0.6" />
      <!-- 虎口褶 -->
      <path d="M 154 146 C 158 156, 164 162, 172 164" stroke-width="2.2" opacity="0.65" />
      <!-- 腕纹 -->
      <path d="M 168 240 C 184 246, 202 246, 216 240" stroke-width="2.2" opacity="0.55" />
      <!-- 四指指节纹（掌面一侧，每指两道） -->
      <path d="M 153 62 Q 163 66 173 62" stroke-width="2" opacity="0.55" />
      <path d="M 153 86 Q 163 90 173 86" stroke-width="2" opacity="0.55" />
      <path d="M 179 48 Q 188 52 197 48" stroke-width="2" opacity="0.55" />
      <path d="M 179 74 Q 188 78 197 74" stroke-width="2" opacity="0.55" />
      <path d="M 203 58 Q 211 62 219 58" stroke-width="2" opacity="0.55" />
      <path d="M 203 84 Q 211 88 219 84" stroke-width="2" opacity="0.55" />
      <path d="M 227 72 Q 233 76 239 72" stroke-width="2" opacity="0.55" />
      <path d="M 227 96 Q 233 100 239 96" stroke-width="2" opacity="0.55" />
      <!-- 拇指指节纹 -->
      <path d="M 114 146 Q 118 166 116 188" stroke-width="2" opacity="0.55" />
    </g>
    <g v-else fill="none" stroke="#c98f62" stroke-linecap="round">
      <!-- 指根横纹（手背看到的关节褶） -->
      <path d="M 154 130 Q 163 136 172 130" stroke-width="2.4" opacity="0.8" />
      <path d="M 180 124 Q 188 130 197 124" stroke-width="2.4" opacity="0.8" />
      <path d="M 204 126 Q 211 132 219 126" stroke-width="2.4" opacity="0.8" />
      <path d="M 228 136 Q 234 142 241 136" stroke-width="2.4" opacity="0.8" />
      <!-- 拇指根横纹 -->
      <path d="M 146 150 Q 138 166 146 182" stroke-width="2.2" opacity="0.75" />
      <!-- 手背伸肌腱 -->
      <path d="M 163 142 C 163 172, 166 202, 172 228" stroke-width="2" opacity="0.5" />
      <path d="M 187 142 C 187 174, 190 204, 196 230" stroke-width="2" opacity="0.5" />
      <path d="M 211 142 C 211 172, 214 202, 220 228" stroke-width="2" opacity="0.45" />
      <path d="M 233 144 C 233 172, 236 200, 241 224" stroke-width="2" opacity="0.45" />
    </g>

    <!-- 手背（非掌面）时的指甲：顺着手指、正面朝外（四指各一枚 + 拇指一枚） -->
    <g v-if="!palm">
      <!-- 食指 -->
      <rect x="155" y="44" width="16" height="22" rx="8" fill="#f9e6dc" stroke="#8c5a40" stroke-width="1.6" />
      <!-- 中指 -->
      <rect x="179" y="30" width="16" height="24" rx="8" fill="#f9e6dc" stroke="#8c5a40" stroke-width="1.6" />
      <!-- 无名指 -->
      <rect x="203" y="38" width="16" height="22" rx="8" fill="#f9e6dc" stroke="#8c5a40" stroke-width="1.6" />
      <!-- 小指 -->
      <rect x="225" y="56" width="16" height="20" rx="8" fill="#f9e6dc" stroke="#8c5a40" stroke-width="1.6" />
      <!-- 拇指 -->
      <rect x="102" y="152" width="20" height="20" rx="9" fill="#f9e6dc" stroke="#8c5a40" stroke-width="1.6" />
    </g>

    <!-- step ≥ 3：沿拇指轮廓描一道高亮（不改变手的形状，所以不会有贴上去的接缝） -->
    <path
      v-if="highlightThumb"
      d="M 148 142 C 134 140, 116 140, 96 146 C 84 152, 84 180, 96 186 C 108 190, 126 192, 148 190"
      fill="none"
      stroke="#2dd4bf"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
</template>
