<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 伽利略反驳亚里士多德：分步逻辑归谬演示。
 *
 * 用 $clicks 驱动（页面 frontmatter 里必须写 `clicks: 4`）： 0 → 大石"落得快"、小石"落得慢"，问：捆在一起会怎样？ 1 →
 * 两块石头保持各自形状上下拼接（8 在上、4 在下），一根绳子绕过上石、穿过中间、绕过下石并打结，整体更重（标 12） 2 → 推论一：小石"拖慢"大石 ⇒ 整体速度介于两者之间（4 < v <
 * 8） 3 → 推论二：整体更重(12) ⇒ 按同一前提，整体速度应比 8 还大（v > 8） 4 → 两个相反结论撞在一起 ⇒ 前提"重的物体下落得快"错了
 *
 * 每一步只切 visibility、不增删节点：Slidev 的点击不许顶跑已经可见的元素， 所以隐藏态用 `visibility: hidden` 占位（不能用 v-if）。
 */
const { $clicks } = useSlideContext();
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 4)));
/**
 * 第 from 步起可见；不到就占着位置但不可见
 *
 * @param from 起始步号，$clicks 达到该值时这一块才显示
 * @returns 可见时返回空对象；未到该步时返回带 ar-hidden 的对象，占位但不可见
 */
const show = (from: number): Record<string, boolean> =>
  step.value >= from ? {} : { "ar-hidden": true };
</script>

<template>
  <div class="ar">
    <svg class="ar-stones" viewBox="0 0 660 190" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ar-rock-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#475569" stop-opacity="0.32" />
        </linearGradient>
        <linearGradient id="ar-rock-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#475569" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="ar-rock-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e2a846" stop-opacity="0.26" />
          <stop offset="100%" stop-color="#b45309" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M 42 54 L 66 30 L 104 34 L 126 60 L 110 88 L 66 92 L 40 74 Z"
        fill="url(#ar-rock-a)"
        stroke="#94a3b8"
        stroke-width="1.6"
      />
      <text x="84" y="72" text-anchor="middle" font-size="28" font-weight="700" fill="#e2a846">
        8
      </text>
      <line
        x1="84"
        y1="102"
        x2="84"
        y2="134"
        stroke="#e2a846"
        stroke-width="3"
        stroke-linecap="round"
      />
      <polygon points="84,148 75,132 93,132" fill="#e2a846" />
      <text x="84" y="172" text-anchor="middle" font-size="22" fill="#94a3b8">落得快</text>
      <path
        d="M 222 68 L 244 50 L 272 54 L 286 74 L 272 92 L 240 94 L 220 82 Z"
        fill="url(#ar-rock-b)"
        stroke="#94a3b8"
        stroke-width="1.6"
      />
      <text x="253" y="80" text-anchor="middle" font-size="24" font-weight="700" fill="#e2a846">
        4
      </text>
      <line
        x1="253"
        y1="104"
        x2="253"
        y2="126"
        stroke="#94a3b8"
        stroke-width="3"
        stroke-linecap="round"
      />
      <polygon points="253,138 245,124 261,124" fill="#94a3b8" />
      <text x="253" y="168" text-anchor="middle" font-size="22" fill="#94a3b8">落得慢</text>
      <text x="358" y="86" text-anchor="middle" font-size="40" font-weight="700" fill="#475569">
        ?
      </text>
      <g :class="show(1)">
        <path
          d="M 484.9 34.4 L 500.8 18.5 L 525.9 21.2 L 540.4 38.3 L 529.8 56.8 L 500.8 59.5 L 483.6 47.6 Z"
          fill="url(#ar-rock-c)"
          stroke="#e2a846"
          stroke-width="1.8"
        />
        <text x="512" y="47" text-anchor="middle" font-size="22" font-weight="700" fill="#e2a846">
          8
        </text>
        <path
          d="M 488.8 81 L 505.3 67.5 L 526.3 70.5 L 536.8 85.5 L 526.3 99 L 502.3 100.5 L 487.3 91.5 Z"
          fill="url(#ar-rock-c)"
          stroke="#e2a846"
          stroke-width="1.8"
        />
        <text x="512" y="91" text-anchor="middle" font-size="20" font-weight="700" fill="#e2a846">
          4
        </text>
        <path
          d="M 460 63.4 H 538 Q 546 63.4 546 71.4 V 97 Q 546 105 538 105 H 486 Q 478 105 478 97 V 22 Q 478 14 486 14 H 538 Q 546 14 546 22 V 55.4 Q 546 63.4 538 63.4 H 460"
          fill="none"
          stroke="#e2a846"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <circle cx="455" cy="63.4" r="5.5" fill="none" stroke="#e2a846" stroke-width="2.4" />
        <circle cx="455" cy="63.4" r="1.8" fill="#e2a846" />
        <text x="590" y="70" text-anchor="middle" font-size="28" font-weight="700" fill="#e2a846">
          12
        </text>
        <line
          x1="512"
          y1="112"
          x2="512"
          y2="134"
          stroke="#e2a846"
          stroke-width="3"
          stroke-linecap="round"
        />
        <polygon points="512,148 503,132 521,132" fill="#e2a846" />
        <text x="512" y="172" text-anchor="middle" font-size="22" fill="#e2a846">捆在一起</text>
      </g>
    </svg>
    <div class="ar-infer">
      <div class="ar-row" :class="show(2)">
        <div class="ar-row-title">推论一 · 小石"拖慢"大石</div>
        <div class="ar-row-body">
          整体速度应<strong class="text-accent-2">介于两者之间</strong>：<Latex tex="4 < v < 8" />
        </div>
      </div>
      <div class="ar-row" :class="show(3)">
        <div class="ar-row-title">推论二 · 整体比大石更重</div>
        <div class="ar-row-body">
          按同一前提，整体速度应<strong class="ar-red">比 8 还大</strong>：<Latex tex="v > 8" />
        </div>
      </div>
    </div>
    <div class="ar-clash" :class="show(4)">
      <div>
        <span class="ar-clash-tag">同一前提</span>
        推出<strong class="ar-red">两个相反的结论</strong>——前提「重的物体下落得快」<strong
          class="text-accent"
          >不成立</strong
        >。
      </div>
      <div>唯一的可能是：<strong class="text-accent">轻重物体下落得同样快</strong>。</div>
    </div>
  </div>
</template>

<style scoped>
.ar {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;

  min-width: 0;
}

.ar-stones {
  display: block;
  width: 100%;
  max-width: 560px;
  height: auto;
}

.ar-infer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.2rem;
  width: 100%;
}

/* 推论行是普通行：不用彩竖线（一页只留底部那条撞车结论作强调），
   靠标题加粗 + 正文浅色区分 */
.ar-row {
  min-width: 0;
}

.ar-row-title {
  margin-bottom: 0.1rem;
  color: var(--c-text);
  font-weight: 700;
  font-size: 0.88rem;
}

.ar-row-body {
  color: var(--c-text-dim);
  font-size: 0.86rem;
  line-height: 1.5;
}

.ar-red {
  color: #f87171;
}

.ar-clash {
  width: 100%;
  padding: 0.4rem 0.8rem;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);

  background: rgb(226 168 70 / 6%);
  color: var(--c-text);

  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
}

.ar-clash-tag {
  display: inline-block;

  margin-right: 0.5rem;
  padding: 0.05rem 0.55rem;
  border: 1px solid rgb(226 168 70 / 35%);
  border-radius: 2rem;

  color: var(--c-accent);

  font-size: 0.72rem;
}

/* 隐藏态：占位但不可见——点出来时不许顶跑已有元素 */
.ar-hidden {
  visibility: hidden;
}
</style>
