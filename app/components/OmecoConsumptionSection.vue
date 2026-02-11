<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { ApexOptions } from 'apexcharts'

const props = defineProps<{ bill: OmecoBill }>()

const chartContainer = ref<HTMLDivElement | null>(null)
let chart: any = null // runtime-safe

const monthlyData = computed(() => {
  if (props.bill.consumptionHistory?.length) {
    const map = new Map<string, { kwh2024: number | null; kwh2025: number | null }>()
    for (const item of props.bill.consumptionHistory) {
      const entry = map.get(item.month) ?? { kwh2024: null, kwh2025: null }
      if (item.year === 2024) entry.kwh2024 = item.consumption
      if (item.year === 2025) entry.kwh2025 = item.consumption
      map.set(item.month, entry)
    }
    return Array.from(map.entries()).map(([month, v]) => ({ month, ...v }))
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
    chart: {
      type: 'bar',
      height: 180,
      toolbar: { show: false },
      animations: { enabled: false },
      fontFamily: 'inherit',
    },
    series: [
      { name: '2024', data: monthlyData.value.map(d => d.kwh2024 ?? 0) },
      { name: '2025', data: monthlyData.value.map(d => d.kwh2025 ?? 0) },
    ],
    plotOptions: { bar: { columnWidth: '80%' } },
    colors: ['#9CA3AF', '#374151'],
    xaxis: { categories: monthlyData.value.map(d => d.month) },
    yaxis: { min: 0, tickAmount: 6 },
    dataLabels: { enabled: false },
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
  <section class="bg-white border-t-2 border-gray-300 pt-4 print:pt-3">
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-base font-bold text-gray-800">
        Your monthly consumption
      </h2>
      <div class="text-right">
        <p class="text-2xl font-bold text-gray-900">
          {{ bill.meter.consumption }}
          <span class="text-sm">°C▼</span>
        </p>
        <p class="text-xs text-gray-600 leading-tight">
          Ave. temp this month:<br>0.7 deg. lower than prev.
        </p>
      </div>
    </div>

    <!-- Chart Legend -->
    <div class="flex items-center gap-4 mb-2 text-xs">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-gray-400" />
        <span class="text-gray-600">2024</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-gray-700" />
        <span class="text-gray-600">2025</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-gray-900" />
        <span class="text-gray-600">2026</span>
      </div>
    </div>

    <!-- ApexCharts Container -->
    <div ref="chartContainer" class="mb-3" />

    <!-- kWh values below chart -->
    <div class="flex gap-1 mb-4">
      <div class="w-8 text-xs text-gray-600 text-right pr-1">kWh</div>
      <div class="flex-1 grid grid-cols-12 text-xs text-center">
        <div v-for="data in monthlyData" :key="data.month" class="space-y-0.5">
          <div class="font-semibold text-gray-900">{{ data.kwh2025 || '-' }}</div>
          <div class="text-gray-400 text-[10px]">{{ data.kwh2024 || '-' }}</div>
        </div>
      </div>
    </div>

    <!-- Consumption Explanation -->
    <div class="grid grid-cols-2 gap-3 text-xs mb-3">
      <!-- Left: Your consumption explained -->
      <div class="space-y-2">
        <h3 class="font-bold text-gray-900 mb-2 text-sm">Your consumption explained</h3>
        
        <div v-if="bill.comparisonToPreviousPeriod" class="flex items-start gap-2">
          <span class="text-lg">{{ bill.comparisonToPreviousPeriod.direction === 'lower' ? '▼' : '▲' }}</span>
          <div class="leading-tight">
            <p class="font-medium text-gray-900">
              This bill is {{ bill.comparisonToPreviousPeriod.percentage }}% {{ bill.comparisonToPreviousPeriod.direction }} 
              ({{ bill.comparisonToPreviousPeriod.direction === 'lower' ? '-' : '+' }}{{ bill.comparisonToPreviousPeriod.difference }}kWh)
            </p>
            <p class="text-gray-600 text-xs">vs previous billing period</p>
          </div>
        </div>

        <div v-if="bill.comparisonToLastYear" class="flex items-start gap-2">
          <span class="text-lg">{{ bill.comparisonToLastYear.direction === 'lower' ? '▼' : '▲' }}</span>
          <div class="leading-tight">
            <p class="font-medium text-gray-900">
              This bill is {{ bill.comparisonToLastYear.percentage }}% {{ bill.comparisonToLastYear.direction }} 
              ({{ bill.comparisonToLastYear.direction === 'lower' ? '-' : '+' }}{{ bill.comparisonToLastYear.difference }}kWh)
            </p>
            <p class="text-gray-600 text-xs">vs same period last year</p>
          </div>
        </div>
      </div>

      <!-- Right: Your typical consumption -->
      <div class="border border-gray-300 rounded-lg p-3">
        <h3 class="font-bold text-gray-900 mb-3 text-sm">Your typical consumption</h3>
        
        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <p class="text-lg font-bold text-gray-900">{{ bill.averageMonthlyConsumption || bill.meter.consumption }}</p>
            <p class="text-[10px] text-gray-600 leading-tight">
              kWh<br>Ave. monthly<br>consumption<br>(last 12<br>months)
            </p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">{{ bill.averageDailyConsumption || Math.round(bill.meter.consumption / 30) }}</p>
            <p class="text-[10px] text-gray-600 leading-tight">
              kWh<br>Ave. daily<br>consumption<br>this bill<br>period
            </p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">₱{{ bill.averageDailyCost?.toFixed(1) || bill.ratePerKwh.toFixed(1) }}</p>
            <p class="text-[10px] text-gray-600 leading-tight">
              Ave. daily<br>cost this bill<br>period
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>