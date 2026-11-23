<script setup lang="ts">
// 第 12 页：某次气垫导轨实验的数据记录表（计算列逐击显示，用 visibility 占位不顶跑版面）
// 数据为教学示意：m1=0.200 kg、m2=0.300 kg、v1=0.400 m/s、v2=0、v1′=−0.082 m/s、v2′=0.320 m/s
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <table class="data-table mdt">
    <thead>
      <tr>
        <th>物体</th>
        <th><Latex tex="m/\text{kg}" /></th>
        <th><Latex tex="v/(\text{m}\cdot\text{s}^{-1})" /></th>
        <th><Latex tex="v'/(\text{m}\cdot\text{s}^{-1})" /></th>
        <th><Latex tex="mv/(\text{kg}\cdot\text{m}\cdot\text{s}^{-1})" /></th>
        <th><Latex tex="mv'/(\text{kg}\cdot\text{m}\cdot\text{s}^{-1})" /></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>碰前 A</td>
        <td>0.200</td>
        <td>0.400</td>
        <td>—</td>
        <td :class="{ 'is-hidden': step < 1 }">0.0800</td>
        <td>—</td>
      </tr>
      <tr>
        <td>碰前 B</td>
        <td>0.300</td>
        <td>0</td>
        <td>—</td>
        <td :class="{ 'is-hidden': step < 1 }">0</td>
        <td>—</td>
      </tr>
      <tr class="mdt-sum">
        <td>碰后 A</td>
        <td>0.200</td>
        <td>—</td>
        <td>−0.082</td>
        <td>—</td>
        <td :class="{ 'is-hidden': step < 2 }">−0.0164</td>
      </tr>
      <tr>
        <td>碰后 B</td>
        <td>0.300</td>
        <td>—</td>
        <td>0.320</td>
        <td>—</td>
        <td :class="{ 'is-hidden': step < 2 }">0.0960</td>
      </tr>
      <tr class="mdt-sum">
        <td>总动量</td>
        <td>—</td>
        <td>—</td>
        <td>—</td>
        <td :class="{ 'is-hidden': step < 1 }">0.0800</td>
        <td :class="{ 'is-hidden': step < 2 }">0.0796</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.mdt {
  width: 100%;
  margin-inline: auto;
}
.mdt th,
.mdt td {
  padding-block: 0.22rem;
}
.mdt td {
  font-variant-numeric: tabular-nums;
}
.mdt-sum td {
  color: var(--c-text);
  font-weight: 700;
}
.is-hidden {
  visibility: hidden;
}
</style>
