<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

defineProps<{
  bill: OmecoBill
}>()

// Sample monthly data
const monthlyData = [
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

const maxValue = 300
const getBarHeight = (value: number | null) => value ? (value / maxValue * 100) : 0
</script>

<template>
  <section class="bg-white text-xs">
    <!-- Header -->
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-sm font-bold text-gray-800">
        Your monthly consumption
      </h2>
      <div class="text-right">
        <p class="text-lg font-bold text-gray-900">{{ bill.meter.consumption }}</p>
        <p class="text-[9px] text-gray-600 leading-tight">
          Ave. temp this month:<br>0.7° lower than prev.
        </p>
      </div>
    </div>

    <!-- Chart Legend -->
    <div class="flex items-center gap-3 mb-1.5 text-[10px]">
      <div class="flex items-center gap-1">
        <div class="w-2.5 h-2.5 bg-gray-400" />
        <span class="text-gray-600">2024</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-2.5 h-2.5 bg-gray-700" />
        <span class="text-gray-600">2025</span>
      </div>
    </div>

    <!-- Chart -->
    <div class="mb-2">
      <!-- Y-axis labels and Bars -->
      <div class="flex gap-0.5">
        <div class="w-6 flex flex-col justify-between text-right text-[9px] text-gray-500 pr-0.5" style="height: 100px;">
          <span>300</span>
          <span>250</span>
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        <!-- Bars -->
        <div class="flex-1 flex items-end gap-px border-l border-b border-gray-300" style="height: 100px;">
          <div 
            v-for="data in monthlyData" 
            :key="data.month"
            class="flex-1 flex items-end gap-px"
          >
            <div 
              v-if="data.kwh2024"
              class="flex-1 bg-gray-400"
              :style="{ height: `${getBarHeight(data.kwh2024)}%` }"
            />
            <div 
              v-if="data.kwh2025"
              class="flex-1 bg-gray-700"
              :style="{ height: `${getBarHeight(data.kwh2025)}%` }"
            />
          </div>
        </div>
      </div>

      <!-- X-axis labels -->
      <div class="flex gap-0.5 mt-0.5">
        <div class="w-6" />
        <div class="flex-1 flex text-[9px] text-gray-600 text-center">
          <span v-for="data in monthlyData" :key="data.month" class="flex-1">
            {{ data.month }}
          </span>
        </div>
      </div>

      <!-- kWh values -->
      <div class="flex gap-0.5 mt-1">
        <div class="w-6 text-[9px] text-gray-600 text-right pr-0.5">kWh</div>
        <div class="flex-1 grid grid-cols-12 text-[9px] text-center">
          <div v-for="data in monthlyData" :key="data.month">
            <div class="font-semibold text-gray-900">{{ data.kwh2025 || '-' }}</div>
            <div class="text-gray-400 text-[8px]">{{ data.kwh2024 || '-' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Consumption Explanation -->
    <div class="grid grid-cols-2 gap-2 text-[10px] mb-2">
      <!-- Left: Your consumption explained -->
      <div class="space-y-1">
        <h3 class="font-bold text-gray-900 mb-1 text-[10px]">Your consumption explained</h3>
        
        <div class="flex items-start gap-1">
          <span class="text-sm">▼</span>
          <div class="leading-tight">
            <p class="font-medium text-gray-900">This bill is 4.8% lower (-10kWh)</p>
            <p class="text-gray-600 text-[9px]">vs previous billing period</p>
          </div>
        </div>

        <div class="flex items-start gap-1">
          <span class="text-sm">▲</span>
          <div class="leading-tight">
            <p class="font-medium text-gray-900">This bill is 4.2% higher (+8kWh)</p>
            <p class="text-gray-600 text-[9px]">vs same period last year</p>
          </div>
        </div>
      </div>

      <!-- Right: Your typical consumption -->
      <div class="border border-gray-300 rounded p-2">
        <h3 class="font-bold text-gray-900 mb-1.5 text-[10px]">Your typical consumption</h3>
        
        <div class="grid grid-cols-3 gap-1 text-center text-[9px]">
          <div>
            <p class="text-sm font-bold text-gray-900">{{ bill.meter.consumption }}</p>
            <p class="text-gray-600 leading-tight">
              kWh<br>Ave.<br>monthly
            </p>
          </div>
          <div>
            <p class="text-sm font-bold text-gray-900">{{ Math.round(bill.meter.consumption / 30) }}</p>
            <p class="text-gray-600 leading-tight">
              kWh<br>Ave.<br>daily
            </p>
          </div>
          <div>
            <p class="text-sm font-bold text-gray-900">₱{{ bill.ratePerKwh.toFixed(1) }}</p>
            <p class="text-gray-600 leading-tight">
              Ave.<br>daily<br>cost
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>