<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()

const formatPeso = (value: number) =>
  `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
</script>

<template>
  <section class="border border-gray-300 rounded p-2 bg-white break-inside-avoid text-[9px] leading-tight">
    <!-- SECTION TITLE -->
    <h3 class="font-bold text-[10px] text-gray-900 mb-1.5">
      How your bill was computed
    </h3>

    <!-- SERVICE INFORMATION -->
    <div class="space-y-0.5 mb-2 pb-1.5 border-b border-gray-200 text-[8px]">
      <p><span class="font-semibold">Service ID Number:</span> {{ bill.serviceId }}</p>
      <p><span class="font-semibold">Contract Holder:</span> {{ bill.consumerName }}</p>
      <p><span class="font-semibold">Service Address:</span> {{ bill.address }}</p>
    </div>

    <!-- METERING INFORMATION -->
    <div class="mb-2">
      <p class="font-bold text-[9px] mb-1">Metering Information</p>
      
      <table class="w-full text-[8px] border-collapse">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="text-left pb-0.5 font-semibold">Meter No</th>
            <th class="text-right pb-0.5 font-semibold">Prev.</th>
            <th class="text-right pb-0.5 font-semibold">Curr.</th>
            <th class="text-right pb-0.5 font-semibold">Multi</th>
            <th class="text-right pb-0.5 font-semibold">Reg.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-0.5">{{ bill.meterNumber }}</td>
            <td class="text-right">{{ bill.meter.previous }}</td>
            <td class="text-right">{{ bill.meter.current }}</td>
            <td class="text-right">{{ bill.meter.multiplier || 1.0 }}</td>
            <td class="text-right font-semibold">{{ bill.meter.consumption }} kWh</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- RATE COMPONENTS -->
    <div>
      <p class="font-bold text-[9px] mb-1">Rate Components</p>
      
      <table class="w-full text-[8px] border-collapse">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="text-left pb-0.5 font-semibold">Component</th>
            <th class="text-right pb-0.5 font-semibold">Base</th>
            <th class="text-right pb-0.5 font-semibold">Price</th>
            <th class="text-right pb-0.5 font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="charge in bill.charges" 
            :key="charge.key"
            class="border-b border-gray-100"
          >
            <td class="py-0.5 truncate">{{ charge.label }}</td>
            <td class="text-right">{{ charge.base ?? '-' }}</td>
            <td class="text-right">{{ charge.price ?? '-' }}</td>
            <td class="text-right font-semibold">{{ formatPeso(charge.amount) }}</td>
          </tr>
          
          <!-- Total -->
          <tr class="border-t-2 border-gray-400">
            <td colspan="3" class="pt-1 font-bold text-[9px]">Total Energy Amount</td>
            <td class="pt-1 text-right font-bold text-[9px]">{{ formatPeso(bill.totalChargesThisPeriod) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>