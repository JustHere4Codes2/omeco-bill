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
  <section class="bg-white">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800">
        Your monthly consumption
      </h2>
      <div class="text-right">
        <p class="text-2xl font-bold text-gray-900">{{ bill.meter.consumption }}</p>
        <p class="text-xs text-gray-600">
          Ave. temp this month:<br>
          0.7 deg. lower than prev.
        </p>
      </div>
    </div>

    <!-- Chart Legend -->
    <div class="flex items-center gap-4 mb-3 text-xs">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-gray-400" />
        <span class="text-gray-600">2020</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-gray-700" />
        <span class="text-gray-600">2021</span>
      </div>
    </div>

    <!-- Chart -->
    <div class="mb-4">
      <!-- Y-axis labels -->
      <div class="flex gap-1">
        <div class="w-8 flex flex-col justify-between text-right text-[10px] text-gray-500 pr-1" style="height: 180px;">
          <span>300</span>
          <span>250</span>
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        <!-- Bars -->
        <div class="flex-1 flex items-end gap-0.5 border-l border-b border-gray-300" style="height: 180px;">
          <div 
            v-for="data in monthlyData" 
            :key="data.month"
            class="flex-1 flex items-end gap-0.5"
          >
            <div 
              v-if="data.kwh2020"
              class="flex-1 bg-gray-400 transition-all"
              :style="{ height: `${getBarHeight(data.kwh2020)}%` }"
            />
            <div 
              v-if="data.kwh2021"
              class="flex-1 bg-gray-700 transition-all"
              :style="{ height: `${getBarHeight(data.kwh2021)}%` }"
            />
          </div>
        </div>
      </div>

      <!-- X-axis labels -->
      <div class="flex gap-1 mt-1">
        <div class="w-8" />
        <div class="flex-1 flex text-[10px] text-gray-600 text-center">
          <span v-for="data in monthlyData" :key="data.month" class="flex-1">
            {{ data.month }}
          </span>
        </div>
      </div>

      <!-- kWh values -->
      <div class="flex gap-1 mt-2">
        <div class="w-8 text-[10px] text-gray-600 text-right pr-1">kWh</div>
        <div class="flex-1 grid grid-cols-12 text-[10px] text-center">
          <div v-for="data in monthlyData" :key="data.month" class="space-y-0.5">
            <div class="font-semibold text-gray-900">{{ data.kwh2021 || '-' }}</div>
            <div class="text-gray-400">{{ data.kwh2020 || '-' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Consumption Explanation -->
    <div class="grid grid-cols-2 gap-4 text-xs">
      <!-- Left: Your consumption explained -->
      <div class="space-y-2">
        <h3 class="font-bold text-gray-900 mb-2">Your consumption explained</h3>
        
        <div class="flex items-start gap-2">
          <span class="text-lg">▼</span>
          <div>
            <p class="font-medium text-gray-900">This bill is 4.8% lower (-10kWh)</p>
            <p class="text-gray-600">vs previous billing period</p>
          </div>
        </div>

        <div class="flex items-start gap-2">
          <span class="text-lg">▲</span>
          <div>
            <p class="font-medium text-gray-900">This bill is 4.2% higher (+8kWh)</p>
            <p class="text-gray-600">vs same period last year</p>
          </div>
        </div>
      </div>

      <!-- Right: Your typical consumption -->
      <div class="border border-gray-300 rounded p-3">
        <h3 class="font-bold text-gray-900 mb-3">Your typical consumption</h3>
        
        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <p class="text-lg font-bold text-gray-900">{{ bill.meter.consumption }}</p>
            <p class="text-[10px] text-gray-600 leading-tight">
              kWh<br>Ave. monthly<br>consumption<br>(last 12<br>months)
            </p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">{{ Math.round(bill.meter.consumption / 30) }}</p>
            <p class="text-[10px] text-gray-600 leading-tight">
              kWh<br>Ave. daily<br>consumption<br>this bill<br>period
            </p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">₱{{ bill.ratePerKwh.toFixed(1) }}</p>
            <p class="text-[10px] text-gray-600 leading-tight">
              Ave. daily<br>cost this bill<br>period
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Environmental Impact -->
    <div class="mt-6 border-t border-gray-300 pt-4">
      <h3 class="font-bold text-gray-900 mb-3 text-sm">Environmental Impact</h3>
      <p class="text-xs text-gray-600 mb-3">Be energy efficient. Save and help take care of our environment</p>
      
      <div class="flex items-center gap-8 text-xs">
        <div class="flex items-center gap-2">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <div>
            <p class="font-bold text-gray-900">{{ bill.meter.consumption }} kWh</p>
            <p class="text-gray-600">Electricity Used</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path stroke-width="2" d="M12 6v6l4 2"/>
          </svg>
          <div>
            <p class="font-bold text-gray-900">0.1424 tCO₂e*</p>
            <p class="text-gray-600 text-[10px]">Equiv. GHG Emissions</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path stroke-width="2" d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <div>
            <p class="font-bold text-gray-900">7 trees**</p>
            <p class="text-gray-600 text-[10px]">Offset Emissions</p>
          </div>
        </div>
      </div>

      <p class="text-[9px] text-gray-500 mt-2 leading-tight">
        *Using DOE's 2015-2017 National Emission Grid Factor of 0.0009129 tCO2/kWh<br>
        **Per Arbor Day Foundation, 1 mature tree can absorb 48 pounds (0.02178 tonnes) of CO2/year
      </p>
    </div>
  </section>
</template>