<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { ApexOptions } from 'apexcharts'

const props = defineProps<{ bill: OmecoBill }>()

const chartContainer = ref<HTMLDivElement | null>(null)
let chart: any = null

const monthlyData = computed(() => {
  if (props.bill.consumptionHistory?.length) {
    const grouped = props.bill.consumptionHistory.reduce((acc, item) => {
      const existing = acc.find(i => i.month === item.month)
      if (existing) {
        if (item.year === 2024) existing.kwh2024 = item.consumption
        if (item.year === 2025) existing.kwh2025 = item.consumption
      } else {
        acc.push({
          month: item.month,
          kwh2024: item.year === 2024 ? item.consumption : null,
          kwh2025: item.year === 2025 ? item.consumption : null,
        })
      }
      return acc
    }, [] as Array<{ month: string; kwh2024: number | null; kwh2025: number | null }>)
    return grouped
  }

  return [
    { month: 'Jan', kwh2024: 155, kwh2025: 120 },
    { month: 'Feb', kwh2024: 140, kwh2025: 116 },
    { month: 'Mar', kwh2024: 215, kwh2025: 220 },
    { month: 'Apr', kwh2024: 282, kwh2025: 274 },
    { month: 'May', kwh2024: 287, kwh2025: 272 },
    { month: 'Jun', kwh2024: 264, kwh2025: 258 },
    { month: 'Jul', kwh2024: 240, kwh2025: 228 },
    { month: 'Aug', kwh2024: 223, kwh2025: 224 },
    { month: 'Sep', kwh2024: 210, kwh2025: 196 },
    { month: 'Oct', kwh2024: 200, kwh2025: 192 },
    { month: 'Nov', kwh2024: null, kwh2025: 166 },
    { month: 'Dec', kwh2024: null, kwh2025: 193 },
  ]
})

onMounted(async () => {
  if (!process.client || !chartContainer.value) return
  const { default: ApexCharts } = await import('apexcharts')

  const options: ApexOptions = {
    series: [
      { name: '2024', data: monthlyData.value.map(d => d.kwh2024 ?? 0) },
      { name: '2025', data: monthlyData.value.map(d => d.kwh2025 ?? 0) },
    ],
    chart: {
      type: 'bar',
      height: 150, // reduced for A4 fit
      toolbar: { show: false },
      animations: { enabled: false },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        columnWidth: '75%',
        borderRadius: 0,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    colors: ['#9CA3AF', '#374151'],
    xaxis: {
      categories: monthlyData.value.map(d => d.month),
      labels: {
        style: {
          fontSize: '9px',
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      labels: {
        style: { fontSize: '9px' },
      },
    },
    legend: { show: false },
  }

  chart = new ApexCharts(chartContainer.value, options)
  chart.render()
})

onBeforeUnmount(() => {
  chart?.destroy()
  chart = null
})
</script>

<template>
  <section class="bg-white border-t-2 border-gray-300 pt-3 print:pt-2">

    <!-- Header -->
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-sm font-bold text-gray-800">
        Your monthly consumption
      </h2>
      <div class="text-right">
        <p class="text-xl font-bold text-gray-900">
          {{ bill.meter.consumption }}
          <span class="text-xs">KWh</span>
        </p>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center gap-4 mb-2 text-[10px]">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-gray-400" />
        <span>2024</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-gray-700" />
        <span>2025</span>
      </div>
    </div>

    <!-- Chart -->
    <div ref="chartContainer" class="mb-3" />

    <!-- Values -->
    <div class="flex gap-1 mb-3">
      <div class="w-8 text-[10px] text-right pr-1">KWh</div>
      <div class="flex-1 grid grid-cols-12 text-[9px] text-center">
        <div v-for="data in monthlyData" :key="data.month">
          <div class="font-semibold">{{ data.kwh2025 ?? '-' }}</div>
          <div class="text-gray-400 text-[8px]">{{ data.kwh2024 ?? '-' }}</div>
        </div>
      </div>
    </div>

    <!-- Consumption Explanation -->
    <div class="grid grid-cols-2 gap-3 text-[10px] mb-2">
      <div class="space-y-1">
        <h3 class="font-bold text-sm mb-1">Your consumption explained</h3>

        <div v-if="bill.comparisonToPreviousPeriod" class="flex gap-1">
          <span>{{ bill.comparisonToPreviousPeriod.direction === 'lower' ? '▼' : '▲' }}</span>
          <p>
            {{ bill.comparisonToPreviousPeriod.percentage }}%
            {{ bill.comparisonToPreviousPeriod.direction }}
            ({{ bill.comparisonToPreviousPeriod.difference }}kWh)
          </p>
        </div>

        <div v-if="bill.comparisonToLastYear" class="flex gap-1">
          <span>{{ bill.comparisonToLastYear.direction === 'lower' ? '▼' : '▲' }}</span>
          <p>
            {{ bill.comparisonToLastYear.percentage }}%
            {{ bill.comparisonToLastYear.direction }}
            ({{ bill.comparisonToLastYear.difference }}kWh)
          </p>
        </div>
      </div>

      <!-- Typical Consumption -->
      <div class="border border-gray-300 rounded p-2">
        <h3 class="font-bold text-sm mb-2">Your typical consumption</h3>

        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <p class="text-base font-bold">
              {{ bill.averageMonthlyConsumption || bill.meter.consumption }}
            </p>
            <p class="text-[8px]">Ave. monthly</p>
          </div>
          <div>
            <p class="text-base font-bold">
              {{ bill.averageDailyConsumption || Math.round(bill.meter.consumption / 30) }}
            </p>
            <p class="text-[8px]">Ave. daily</p>
          </div>
          <div>
            <p class="text-base font-bold">
              ₱{{ bill.averageDailyCost?.toFixed(1) || bill.ratePerKwh.toFixed(1) }}
            </p>
            <p class="text-[8px]">Ave. daily cost</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>