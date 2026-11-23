<script setup lang="ts">
/** 第 3 页（实验数据里的动能）：第一章第 1 节两小车碰撞的三组数据， 直接由测量值计算碰撞前后的总动能，看动能是否守恒。 */
import { computed } from "vue";

const rows = [
  { m1: 0.519, m2: 0.519, v: 0.628, vp: 0.307 },
  { m1: 0.519, m2: 0.718, v: 0.656, vp: 0.265 },
  { m1: 0.718, m2: 0.519, v: 0.572, vp: 0.321 },
];

const data = computed(() =>
  rows.map((row, index) => {
    const before = 0.5 * row.m1 * row.v ** 2;
    const after = 0.5 * (row.m1 + row.m2) * row.vp ** 2;
    return {
      m1: row.m1,
      m2: row.m2,
      v: row.v,
      vp: row.vp,
      index: index + 1,
      before,
      after,
      loss: before - after,
    };
  }),
);

const fd = (value: number): string => value.toFixed(3);
</script>

<template>
  <table class="col-table">
    <thead>
      <tr>
        <th>次数</th>
        <th><Latex tex="m_1" /><span class="col-unit">/kg</span></th>
        <th><Latex tex="m_2" /><span class="col-unit">/kg</span></th>
        <th>
          <Latex tex="v" /><span class="col-unit"
            >/(<Latex tex="\text{m}\cdot\text{s}^{-1}" />)</span
          >
        </th>
        <th>
          <Latex tex="v'" /><span class="col-unit"
            >/(<Latex tex="\text{m}\cdot\text{s}^{-1}" />)</span
          >
        </th>
        <th><Latex tex="E_{\text{k}}" /><span class="col-unit">/J</span></th>
        <th><Latex tex="E_{\text{k}}'" /><span class="col-unit">/J</span></th>
        <th><Latex tex="\Delta E_{\text{k}}" /><span class="col-unit">/J</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.index">
        <td>{{ row.index }}</td>
        <td>{{ row.m1.toFixed(3) }}</td>
        <td>{{ row.m2.toFixed(3) }}</td>
        <td>{{ row.v.toFixed(3) }}</td>
        <td>{{ row.vp.toFixed(3) }}</td>
        <td>{{ fd(row.before) }}</td>
        <td>{{ fd(row.after) }}</td>
        <td class="col-accent">{{ fd(row.loss) }}</td>
      </tr>
    </tbody>
  </table>
</template>
