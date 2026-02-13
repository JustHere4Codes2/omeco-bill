<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()

// Calculate effective rate per kWh
const effectiveRate = computed(() => {
  if (props.bill.meter.consumption === 0) return 0
  return (props.bill.totalChargesThisPeriod / props.bill.meter.consumption).toFixed(4)
})

// Determine voltage level class
const voltageClass = computed(() => {
  return props.bill.customerType === 'industrial' ? 'Primary' : 'Secondary'
})
</script>

<template>
  <section class="border border-gray-300 rounded p-3 bg-gray-50 break-inside-avoid">
    <h3 class="font-bold text-[11px] text-gray-900 mb-2">
      Additional Bill Information
    </h3>
    
    <div class="space-y-2 text-[10px]">
      <!-- Load Factor -->
      <div class="flex justify-between items-center">
        <span class="text-gray-700">Load Factor:</span>
        <span class="font-semibold text-gray-900">0.00%</span>
      </div>
      
      <!-- Voltage Level Class -->
      <div class="flex justify-between items-center">
        <span class="text-gray-700">Voltage Level Class:</span>
        <span class="font-semibold text-gray-900">{{ voltageClass }}</span>
      </div>

      <!-- Meter Type -->
      <div class="flex justify-between items-center">
        <span class="text-gray-700">Meter Type:</span>
        <span class="font-semibold text-gray-900 capitalize">{{ bill.meterType || 'Digital' }}</span>
      </div>

      <!-- Effective Rate -->
      <div class="flex justify-between items-center pt-2 border-t border-gray-300">
        <span class="text-gray-700">Effective Rate:</span>
        <span class="font-bold text-gray-900">₱{{ effectiveRate }}/kWh</span>
      </div>
    </div>

    <!-- Formula Explanation -->
    <div class="mt-3 pt-3 border-t border-gray-300">
      <p class="text-[9px] text-gray-600 leading-tight">
        Your rate this month (price per kWh) is computed as <span class="font-semibold">Total Energy Amount</span> divided by the <span class="font-semibold">Actual Consumption</span> (in kWh).
      </p>
    </div>
  </section>
</template>