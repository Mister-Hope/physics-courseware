<!-- 第 4–6 页：碰撞实验数据表。mode=raw 原始数据；mv 加 mv 两列；ek 加动能两列。step>=1 显示计算列。 -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'raw' },
  step: { type: Number, default: 0 },
})

const rows = [
  { no: 1, m1: 0.519, m2: 0.519, v: 0.628, vp: 0.307, mv1: 0.326, mv2: 0.319, ek1: 0.102, ek2: 0.049 },
  { no: 2, m1: 0.519, m2: 0.718, v: 0.656, vp: 0.265, mv1: 0.341, mv2: 0.328, ek1: 0.112, ek2: 0.043 },
  { no: 3, m1: 0.718, m2: 0.519, v: 0.572, vp: 0.321, mv1: 0.411, mv2: 0.397, ek1: 0.118, ek2: 0.064 },
]

const showMv = computed(() => props.mode === 'mv')
const showEk = computed(() => props.mode === 'ek')
</script>

<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>次数</th>
        <th><Latex tex="m_1/\text{kg}" /></th>
        <th><Latex tex="m_2/\text{kg}" /></th>
        <th><Latex tex="v/(\text{m·s}^{-1})" /></th>
        <th><Latex tex="v'/(\text{m·s}^{-1})" /></th>
        <th v-if="showMv"><Latex tex="m_1v" /></th>
        <th v-if="showMv"><Latex tex="(m_1+m_2)v'" /></th>
        <th v-if="showEk"><Latex tex="\tfrac12 m_1v^2" /></th>
        <th v-if="showEk"><Latex tex="\tfrac12(m_1+m_2)v'^2" /></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.no">
        <td>{{ row.no }}</td>
        <td>{{ row.m1.toFixed(3) }}</td>
        <td>{{ row.m2.toFixed(3) }}</td>
        <td>{{ row.v.toFixed(3) }}</td>
        <td>{{ row.vp.toFixed(3) }}</td>
        <td v-if="showMv" v-show="step >= 1">{{ row.mv1.toFixed(3) }}</td>
        <td v-if="showMv" v-show="step >= 1">{{ row.mv2.toFixed(3) }}</td>
        <td v-if="showEk" v-show="step >= 1">{{ row.ek1.toFixed(3) }}</td>
        <td v-if="showEk" v-show="step >= 1">{{ row.ek2.toFixed(3) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
}
.data-table th {
  padding: 0.32rem 0.35rem;
  border-bottom: 1px solid var(--c-border-glow);
  color: var(--c-text-dim);
  font-weight: 500;
}
.data-table td {
  padding: 0.3rem 0.35rem;
  border-bottom: 1px solid var(--c-border);
  text-align: center;
}
.data-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
