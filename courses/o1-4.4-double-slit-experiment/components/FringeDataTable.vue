<!-- 第 11 页：某次实验数据表（d = 0.30 mm，l = 1.20 m，n = 6），按击逐步揭示 -->
<template>
  <table class="ds-table">
    <thead>
      <tr>
        <th>次数</th>
        <th class="num">第 1 条 <Latex tex="x_1" />/mm</th>
        <th class="num">第 6 条 <Latex tex="x_2" />/mm</th>
        <th class="num"><Latex tex="a" />/mm</th>
        <th class="num"><Latex tex="\Delta x" />/mm</th>
        <th class="num"><Latex tex="\lambda" />/nm</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in rows"
        :key="row.id"
        :class="{ 'is-hidden': index === 0 ? step < 1 : step < 2 }"
      >
        <td>{{ index + 1 }}</td>
        <td class="num">{{ row.x1 }}</td>
        <td class="num">{{ row.x2 }}</td>
        <td class="num">{{ row.spacing }}</td>
        <td class="num">{{ row.dx }}</td>
        <td class="num hl">{{ row.lambda }}</td>
      </tr>
      <tr :class="{ 'is-hidden': step < 3 }">
        <td colspan="5">平均值</td>
        <td class="num hl">{{ average }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface Props {
  step?: number;
}

const { step = 0 } = defineProps<Props>();

const d = 0.3e-3;
const l = 1.2;
const readings = [
  { id: "t1", x1: 12.6, x2: 23.5 },
  { id: "t2", x1: 15.1, x2: 26.05 },
  { id: "t3", x1: 18.42, x2: 29.3 },
];

const rows = readings.map((item) => {
  const spacing = item.x2 - item.x1;
  const dx = spacing / 5;
  const lambda = (d * dx * 1e-3 * 1e9) / l;
  return {
    id: item.id,
    x1: item.x1.toFixed(2),
    x2: item.x2.toFixed(2),
    spacing: spacing.toFixed(2),
    dx: dx.toFixed(3),
    lambda: lambda.toFixed(1),
  };
});

const average = (rows.reduce((sum, row) => sum + Number(row.lambda), 0) / rows.length).toFixed(1);
</script>
