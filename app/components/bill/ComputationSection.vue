<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import SectionTitle from './SectionTitle.vue'

const props = defineProps<{
  bill: OmecoBill
}>()

const formatPeso = (value: number) =>
  `₱ ${value.toFixed(2)}`
</script>

<template>
  <section class="space-y-3 text-[9px] leading-tight">

    <!-- SECTION TITLE -->
    <SectionTitle title="How your bill was computed" />

    <!-- SERVICE INFORMATION -->
    <div class="space-y-0.5">
      <p><span class="font-semibold">Service ID:</span> {{ bill.serviceId }}</p>
      <p><span class="font-semibold">Contract Holder:</span> {{ bill.consumerName }}</p>
      <p><span class="font-semibold">Service Address:</span> {{ bill.address }}</p>
    </div>

    <!-- METERING INFORMATION -->
    <div class="border border-gray-300 rounded p-2 space-y-1">
      <p class="font-semibold">Metering Information</p>

      <div class="grid grid-cols-5 text-center font-semibold border-b pb-1">
        <div>Meter No</div>
        <div>Previous</div>
        <div>Current</div>
        <div>Multiplier</div>
        <div>kWh</div>
      </div>

      <div class="grid grid-cols-5 text-center pt-1">
        <div>{{ bill.meterNumber }}</div>
        <div>{{ bill.meter.previous }}</div>
        <div>{{ bill.meter.current }}</div>
        <div>{{ bill.meter.multiplier }}</div>
        <div class="font-semibold">{{ bill.meter.consumption }}</div>
      </div>
    </div>

    <!-- RATE COMPONENTS -->
    <div class="space-y-1">
      <p class="font-semibold">Rate Components</p>

      <!-- TABLE HEADER -->
      <div class="grid grid-cols-4 font-semibold border-b pb-1">
        <div>Description</div>
        <div class="text-right">Base</div>
        <div class="text-right">Price</div>
        <div class="text-right">Amount</div>
      </div>

      <!-- CHARGES -->
      <div
        v-for="charge in bill.charges"
        :key="charge.key"
        class="grid grid-cols-4 py-0.5"
      >
        <div class="truncate">{{ charge.label }}</div>
        <div class="text-right">
          {{ charge.base ?? '-' }}
        </div>
        <div class="text-right">
          {{ charge.price ?? '-' }}
        </div>
        <div class="text-right font-medium">
          {{ formatPeso(charge.amount) }}
        </div>
      </div>
    </div>

  </section>
</template>