<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

defineProps<{
  bill: OmecoBill
}>()

// Sample monthly data
const monthlyData = [
  { month: 'Jan', kwh2020: 155, kwh2021: 120 },
  { month: 'Feb', kwh2020: 140, kwh2021: 116 },
  { month: 'Mar', kwh2020: 215, kwh2021: 220 },
  { month: 'Apr', kwh2020: 282, kwh2021: 274 },
  { month: 'May', kwh2020: 287, kwh2021: 272 },
  { month: 'Jun', kwh2020: 264, kwh2021: 258 },
  { month: 'Jul', kwh2020: 240, kwh2021: 228 },
  { month: 'Aug', kwh2020: 223, kwh2021: 224 },
  { month: 'Sep', kwh2020: 210, kwh2021: 196 },
  { month: 'Oct', kwh2020: 200, kwh2021: 192 },
  { month: 'Nov', kwh2020: null, kwh2021: 166 },
  { month: 'Dec', kwh2020: null, kwh2021: 193 },
]

const maxValue = 300
const getBarHeight = (value: number | null) => value ? (value / maxValue * 100) : 0
</script>

<template>
  <section class="bg-white text-gray-900 text-base leading-relaxed">

  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
    <h2 class="text-2xl font-bold">
      Monthly Electricity Consumption
    </h2>

    <div class="text-left md:text-right">
      <p class="text-3xl font-bold">
        {{ bill.meter.consumption }} kWh
      </p>
      <p class="text-base text-gray-700">
        Average temperature this month:
        0.7° lower than previous
      </p>
    </div>
  </div>

  <!-- Legend -->
  <div class="flex items-center gap-6 mb-4 text-base font-medium">
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 bg-gray-400"></div>
      <span>2020</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 bg-gray-800"></div>
      <span>2021</span>
    </div>
  </div>

  <!-- Chart -->
  <div class="mb-8">
    <div class="flex gap-2">
      <!-- Y Axis -->
      <div class="w-12 flex flex-col justify-between text-right text-base pr-2"
           style="height: 220px;">
        <span>300</span>
        <span>250</span>
        <span>200</span>
        <span>150</span>
        <span>100</span>
        <span>50</span>
        <span>0</span>
      </div>

      <!-- Bars -->
      <div class="flex-1 flex items-end gap-2 border-l-2 border-b-2 border-gray-400"
           style="height: 220px;">
        <div 
          v-for="data in monthlyData" 
          :key="data.month"
          class="flex-1 flex items-end gap-1"
        >
          <div 
            v-if="data.kwh2020"
            class="flex-1 bg-gray-400"
            :style="{ height: `${getBarHeight(data.kwh2020)}%` }"
          />
          <div 
            v-if="data.kwh2021"
            class="flex-1 bg-gray-800"
            :style="{ height: `${getBarHeight(data.kwh2021)}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Month Labels -->
    <div class="flex mt-3">
      <div class="w-12" />
      <div class="flex-1 flex text-base text-center font-medium">
        <span v-for="data in monthlyData" :key="data.month" class="flex-1">
          {{ data.month }}
        </span>
      </div>
    </div>
  </div>

  <!-- Consumption Explanation -->
  <div class="grid md:grid-cols-2 gap-8 mb-8">

    <div>
      <h3 class="text-xl font-bold mb-4">
        Consumption Summary
      </h3>

      <div class="space-y-4 text-base">
        <p>
          ▼ This bill is 
          <span class="font-bold">4.8% lower (-10 kWh)</span>
          compared to your previous billing period.
        </p>

        <p>
          ▲ This bill is 
          <span class="font-bold">4.2% higher (+8 kWh)</span>
          compared to the same period last year.
        </p>
      </div>
    </div>

    <div class="border-2 border-gray-400 rounded p-6">
      <h3 class="text-xl font-bold mb-6">
        Typical Usage
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

        <div>
          <p class="text-2xl font-bold">
            {{ bill.meter.consumption }} kWh
          </p>
          <p>Average Monthly Consumption (Last 12 Months)</p>
        </div>

        <div>
          <p class="text-2xl font-bold">
            {{ Math.round(bill.meter.consumption / 30) }} kWh
          </p>
          <p>Average Daily Consumption This Period</p>
        </div>

        <div>
          <p class="text-2xl font-bold">
            ₱{{ bill.ratePerKwh.toFixed(1) }}
          </p>
          <p>Average Daily Cost This Period</p>
        </div>

      </div>
    </div>
  </div>

  <!-- Environmental Impact -->
  <div class="border-t-2 border-gray-400 pt-6">
    <h3 class="text-xl font-bold mb-4">
      Environmental Impact
    </h3>

    <p class="text-base mb-6">
      Saving electricity helps protect the environment.
    </p>

    <div class="grid md:grid-cols-3 gap-8 text-base">

      <div class="flex items-center gap-4">
        <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <div>
          <p class="font-bold">{{ bill.meter.consumption }} kWh</p>
          <p>Electricity Used</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path stroke-width="2" d="M12 6v6l4 2"/>
        </svg>
        <div>
          <p class="font-bold">0.1424 tCO₂e</p>
          <p>Equivalent Greenhouse Gas Emissions</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path stroke-width="2" d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <div>
          <p class="font-bold">7 Trees</p>
          <p>Estimated Carbon Offset</p>
        </div>
      </div>

    </div>

    <p class="text-sm text-gray-700 mt-6">
      Emission estimates are based on national grid emission factors.
    </p>
  </div>

</section>

</template>