<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 判方向：物块轻放到向右匀速运动的传送带上，它刚放上去时受到的摩擦力朝哪边？
 *
 * 物块初速度为零、传送带向右运动 → 物块相对传送带向左运动 → 滑动摩擦力与相对运动方向相反 → 物块受到向右的摩擦力。 该摩擦力与物块的运动方向相同，所以摩擦力可以是动力（结论在页面上的
 * `.key` 里给出）。
 */

type Pick = "right" | "left";

const ANSWER: Pick = "right";

const picked = ref<Pick | null>(null);

const correct = computed<boolean>(() => picked.value === ANSWER);
const revealed = computed<boolean>(() => picked.value != null);
</script>

<template>
  <div class="fdj-wrap">
    <div class="fdj-figure">
      <svg viewBox="0 0 560 240" width="100%" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="30"
          y="120"
          width="500"
          height="58"
          rx="29"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="2.2"
          opacity="0.8"
        />
        <circle
          cx="59"
          cy="149"
          r="29"
          fill="rgba(148,163,184,0.1)"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
          opacity="0.8"
        />
        <circle
          cx="501"
          cy="149"
          r="29"
          fill="rgba(148,163,184,0.1)"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
          opacity="0.8"
        />
        <rect
          x="118"
          y="72"
          width="74"
          height="48"
          rx="7"
          fill="rgba(226,168,70,0.18)"
          stroke="var(--c-accent)"
          stroke-width="2.2"
        />
        <text
          x="155"
          y="102"
          text-anchor="middle"
          font-size="20"
          fill="var(--c-accent)"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          A
        </text>
        <text x="155" y="58" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
          <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
          <tspan dy="4" font-size="11">0</tspan>
          <tspan dy="-4">= 0</tspan>
        </text>
        <CourseArrow
          :from="{ x: 340, y: 104 }"
          :to="{ x: 430, y: 104 }"
          stroke="var(--c-physics)"
          stroke-width="3"
        />
        <text
          x="442"
          y="110"
          font-size="16"
          fill="var(--c-physics)"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          v
        </text>
        <g v-if="revealed">
          <CourseArrow
            :from="{ x: 160, y: 40 }"
            :to="{ x: 70, y: 40 }"
            stroke="var(--c-text-dim)"
            stroke-width="2.6"
            stroke-dasharray="8 5"
          />
          <text x="196" y="38" font-size="15" fill="var(--c-text-dim)">相对传送带向左运动</text>
          <CourseArrow
            :from="{ x: 155, y: 120 }"
            :to="{ x: 250, y: 120 }"
            stroke="var(--c-accent)"
            stroke-width="3.4"
          />
          <text x="258" y="114" font-size="16" fill="var(--c-accent)">
            <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
            <tspan dy="4" font-size="11">f</tspan>
          </text>
        </g>
      </svg>
    </div>

    <div class="fdj-side">
      <div class="fdj-ask">物块受到的摩擦力朝哪边？</div>
      <div class="fdj-options">
        <button
          type="button"
          class="fdj-btn"
          :class="{
            'fdj-btn-right': picked === 'right',
            'fdj-btn-wrong': picked === 'right' && !correct,
          }"
          @click="picked = 'right'"
        >
          向右
        </button>
        <button
          type="button"
          class="fdj-btn"
          :class="{
            'fdj-btn-left': picked === 'left',
            'fdj-btn-wrong': picked === 'left' && !correct,
          }"
          @click="picked = 'left'"
        >
          向左
        </button>
      </div>
      <div class="fdj-feedback">
        <template v-if="revealed">
          <div v-if="correct" class="fdj-verdict fdj-ok"><mdi-check-circle /> 判断正确</div>
          <div v-else class="fdj-verdict fdj-no"><mdi-close-circle /> 再想想</div>
          <div class="fdj-why">
            物块初速度为零、传送带向右运动，物块<b class="text-accent-2">相对传送带向左</b
            >运动；滑动摩擦力的方向与 <b class="text-accent-2">相对运动</b>方向相反，所以物块受到<b
              class="text-accent"
              >向右</b
            >的摩擦力。
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fdj-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  min-width: 0;
}

.fdj-figure {
  display: flex;
  flex: 1 1 58%;
  align-items: center;

  min-width: 0;
  max-width: 32rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 45%);
}

.fdj-side {
  display: flex;
  flex: 1 1 42%;
  flex-direction: column;
  gap: 0.6rem;

  min-width: 0;
}

.fdj-ask {
  font-weight: 700;
  font-size: 1.05rem;
}

.fdj-options {
  display: flex;
  gap: 0.7rem;
}

.fdj-btn {
  flex: 1;

  min-width: 0;
  padding: 0.42rem 1.1rem;
  border: 1px solid rgb(148 163 184 / 35%);
  border-radius: 0.75rem;

  background: rgb(148 163 184 / 8%);
  color: var(--c-text);

  font-size: 0.98rem;

  cursor: pointer;

  transition: all 0.18s ease;
}

.fdj-btn:hover {
  border-color: var(--c-accent);
  background: rgb(226 168 70 / 12%);
}

.fdj-btn-right {
  border-color: var(--c-accent);
  background: rgb(226 168 70 / 18%);
}

.fdj-btn-left {
  border-color: var(--c-accent-2);
  background: rgb(96 165 250 / 16%);
}

.fdj-btn-wrong {
  border-color: var(--c-danger);
  background: rgb(248 113 113 / 16%);
}

.fdj-feedback {
  min-height: 6.2rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.fdj-verdict {
  display: flex;
  gap: 0.35rem;
  align-items: center;

  margin-bottom: 0.3rem;

  font-weight: 700;
}

.fdj-ok {
  color: var(--c-accent-2);
}

.fdj-no {
  color: var(--c-danger);
}

.fdj-why {
  color: var(--c-text-dim);
}
</style>
