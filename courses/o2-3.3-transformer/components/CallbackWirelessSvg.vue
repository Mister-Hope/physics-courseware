<script setup lang="ts">
/**
 * 第 14 页（P14）：结尾回扣——Apple Watch 到底怎么充上电（2 击，M11 & §7 P14）
 *
 * 严格按 07-给Gemini4的执行指令.md §7 P14 & §9：
 *
 * - 0 击：并排回看“手表无线充电（空气磁路）”与“闭合铁芯变压器”，提问“手表的无线充电能当成理想变压器吗？”
 * - 第 1 击（step >= 1）：完整走一遍充电链路： 插座 220 V 交流 -> 适配器里的变压器降压 + 整流 -> 5 V 直流 -> 充电盘内 DC-AC 逆变 -> 发射线圈 -> 空气磁路互感 -> 手表接收线圈 -> 手表内整流/稳压 -> 电池
 * - 第 2 击（step >= 2）：回扣本课两层答案： ① 真正把 220 V 降到 5 V 的是**适配器里的变压器**；无线充电的两个线圈只负责“5 V 直流 -> 高频交流 -> 互感”； ②
 *   “无线充电是不是变压器？”两层结论：不能当**理想**变压器（漏磁大、耦合松，还有整流/逆变）；但它仍是变压器（两个线圈、交变电流、互感），只是两个线圈耦合较松。
 */
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const showChain = computed(() => step >= 1);
const showAnswers = computed(() => step >= 2);
</script>

<template>
  <div class="cb-wrap">
    <div class="ask text-center">Apple Watch 到底是如何充上电的？无线充电能当成理想变压器吗？</div>

    <!-- 第 1 击：完整充电链路 -->
    <div class="cb-chain-box" :class="{ 'is-hidden': !showChain }">
      <div class="cb-chain-title">完整供电与能量传输链路</div>
      <div class="cb-chain-flow">
        <span class="cb-node cb-node-ac">插座 <Latex tex="220\ \text{V}" /> 交流</span>
        <span class="cb-arrow">→</span>
        <span class="cb-node cb-node-key">适配器内变压器降压 + 整流</span>
        <span class="cb-arrow">→</span>
        <span class="cb-node"><Latex tex="5\ \text{V}" /> 直流</span>
        <span class="cb-arrow">→</span>
        <span class="cb-node">充电盘内 DC-AC 逆变</span>
        <span class="cb-arrow">→</span>
        <span class="cb-node cb-node-mutual">发射线圈 ⇌ 空气磁路互感 ⇌ 接收线圈</span>
        <span class="cb-arrow">→</span>
        <span class="cb-node">手表内整流/稳压 → 电池</span>
      </div>
    </div>

    <!-- 第 2 击：左右对照 + 两层答案 -->
    <div class="cb-grid" :class="{ 'is-hidden': !showAnswers }">
      <div class="cb-card cb-card-gold">
        <div class="cb-card-head">① 谁完成了 <Latex tex="220\ \text{V} \rightarrow 5\ \text{V}" /> 降压？</div>
        <div class="cb-card-body">
          <div>真正把 <Latex tex="220\ \text{V}" /> 降到 <Latex tex="5\ \text{V}" /> 的是<b>电源适配器（充电头）里的变压器</b>；</div>
          <div>无线充电的两个线圈只负责“<Latex tex="5\ \text{V}" /> 直流 → 高频交变电流 → 互感传输电能”。</div>
        </div>
      </div>

      <div class="cb-card cb-card-teal">
        <div class="cb-card-head">② 无线充电是不是变压器？（两层结论）</div>
        <div class="cb-card-body">
          <div>• <b>不能当理想变压器</b>：空气磁路漏磁大、无闭合铁芯，且含逆变与整流（<Latex tex="\tfrac{U_1}{U_2} \neq \tfrac{n_1}{n_2}" />）。</div>
          <div>• <b>本质上仍是变压器</b>：依靠两个线圈、交变电流与<b>互感</b>工作，只是<b>两个线圈耦合较松</b>。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cb-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;
  min-width: 0;
}

.cb-chain-box {
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--c-accent-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);

  transition: opacity 0.3s ease;
}

.cb-chain-title {
  margin-bottom: 0.35rem;

  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.88rem;
  text-align: center;
}

.cb-chain-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.32rem;
  align-items: center;
  justify-content: center;

  font-size: 0.82rem;
}

.cb-node {
  padding: 0.18rem 0.55rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-bg-soft);
  color: var(--c-text);

  font-weight: 600;
}

.cb-node-ac {
  border-color: var(--c-accent-2-border);
  color: var(--c-accent-2);
}

.cb-node-key {
  border-color: var(--c-accent-border);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.cb-node-mutual {
  border-color: color-mix(in srgb, var(--c-physics) 38%, transparent);
  color: var(--c-physics);
}

.cb-arrow {
  color: var(--c-text-dim);
  font-weight: 700;
}

.cb-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 1.1rem;
  align-items: stretch;

  transition: opacity 0.3s ease;
}

.cb-card {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  background: var(--c-surface);
}

.cb-card-gold {
  border-color: var(--c-accent-border);
}

.cb-card-teal {
  border-color: color-mix(in srgb, var(--c-physics) 38%, transparent);
}

.cb-card-head {
  margin-bottom: 0.3rem;
  color: var(--c-accent);
  font-weight: 700;
  font-size: 0.92rem;
}

.cb-card-teal .cb-card-head {
  color: var(--c-physics);
}

.cb-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;

  color: var(--c-text);

  font-size: 0.84rem;
  line-height: 1.42;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
