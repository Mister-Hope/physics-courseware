<script setup lang="ts">
import { ref } from 'vue'

interface ExperimentRow {
  id: number
  n1: number
  n2: number
  u1: number | null
  u2: number | null
}

const rows = ref<ExperimentRow[]>([
  { id: 1, n1: 1400, n2: 100, u1: 12, u2: null },
  { id: 2, n1: 1400, n2: 400, u1: 12, u2: null },
])

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function voltageRatio(row: ExperimentRow): number | null {
  if (!isFiniteNumber(row.u1) || !isFiniteNumber(row.u2) || row.u2 === 0) return null
  return row.u1 / row.u2
}

function turnsRatio(row: ExperimentRow): number {
  return row.n1 / row.n2
}

function relativeError(row: ExperimentRow): number | null {
  const measured = voltageRatio(row)
  if (measured === null) return null
  const expected = turnsRatio(row)
  return Math.abs((measured - expected) / expected) * 100
}

function formatNumber(value: number | null, digits = 2): string {
  return value === null ? 'N/A' : value.toFixed(digits)
}
</script>

<template>
  <table class="data-table p8-table">
    <thead>
      <tr>
        <th style="width: 9%"><Latex tex="n_1" /></th>
        <th style="width: 9%"><Latex tex="n_2" /></th>
        <th style="width: 17%"><Latex tex="U_1" />（交流，V）</th>
        <th style="width: 17%"><Latex tex="U_2" />（交流，V）</th>
        <th style="width: 14%"><Latex tex="\dfrac{U_1}{U_2}" /></th>
        <th style="width: 14%"><Latex tex="\dfrac{n_1}{n_2}" /></th>
        <th style="width: 20%">相对误差</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td><Latex :tex="String(row.n1)" /></td>
        <td><Latex :tex="String(row.n2)" /></td>
        <td>
          <input
            v-model.number="row.u1"
            class="p8-input"
            type="number"
            min="0"
            step="0.1"
            inputmode="decimal"
          />
        </td>
        <td>
          <input
            v-model.number="row.u2"
            class="p8-input"
            type="number"
            min="0"
            step="0.1"
            inputmode="decimal"
            placeholder="实测"
          />
        </td>
        <td :class="{ 'text-dim': voltageRatio(row) === null }">
          {{ formatNumber(voltageRatio(row)) }}
        </td>
        <td>{{ formatNumber(turnsRatio(row)) }}</td>
        <td :class="{ 'text-dim': relativeError(row) === null }">
          {{ relativeError(row) === null ? 'N/A' : `${relativeError(row)?.toFixed(2)}%` }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
