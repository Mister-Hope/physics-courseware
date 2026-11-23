<script setup lang="ts">
// 第 11 页：某次实验数据表（n = 30 次全振动）
// step：1 揭示 T 列，2 揭示 T² 列，3 揭示 g 列与平均值
const { step = 0 } = defineProps<{ step?: number }>();

const rows = [
  { no: 1, l: "0.600", t: "46.72", T: "1.557", T2: "2.425", g: "9.77" },
  { no: 2, l: "0.750", t: "52.08", T: "1.736", T2: "3.014", g: "9.82" },
  { no: 3, l: "0.900", t: "57.25", T: "1.908", T2: "3.641", g: "9.76" },
  { no: 4, l: "1.050", t: "61.62", T: "2.054", T2: "4.219", g: "9.83" },
  { no: 5, l: "1.200", t: "66.03", T: "2.201", T2: "4.844", g: "9.78" },
];
</script>

<template>
  <table class="data-table pdt">
    <thead>
      <tr>
        <th>序号</th>
        <th><Latex tex="l/\text{m}" /></th>
        <th><Latex tex="n" /></th>
        <th><Latex tex="t/\text{s}" /></th>
        <th><Latex tex="T/\text{s}" /></th>
        <th><Latex tex="T^2/\text{s}^2" /></th>
        <th><Latex tex="g/(\text{m}\cdot\text{s}^{-2})" /></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.no">
        <td>{{ row.no }}</td>
        <td>{{ row.l }}</td>
        <td>30</td>
        <td>{{ row.t }}</td>
        <td><span :class="{ 'is-hidden': step < 1 }">{{ row.T }}</span></td>
        <td><span :class="{ 'is-hidden': step < 2 }">{{ row.T2 }}</span></td>
        <td><span :class="{ 'is-hidden': step < 3 }">{{ row.g }}</span></td>
      </tr>
      <tr>
        <td>平均</td>
        <td>—</td>
        <td>—</td>
        <td>—</td>
        <td>—</td>
        <td>—</td>
        <td><span :class="{ 'is-hidden': step < 3 }">9.79</span></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.pdt :deep(th),
.pdt :deep(td) {
  padding-block: 0.2rem;
}
</style>
