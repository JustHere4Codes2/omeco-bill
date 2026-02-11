<template>
  <section class="border border-gray-300 rounded p-1.5 bg-gray-50 break-inside-avoid">
    <div class="border-t border-gray-300 pt-1.5">
      <h3 class="font-bold text-gray-900 mb-1 text-[10px]">
        Environmental Impact
      </h3>

      <p class="text-[9px] text-gray-600 mb-1.5">
        Be energy efficient. Save and help take care of our environment
      </p>

      <div class="flex items-center justify-between text-[9px]">
        <!-- Electricity Used -->
        <div class="flex items-center gap-1">
          <svg
            class="w-5 h-5 text-gray-600 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2" />
          </svg>
          <div>
            <p class="font-bold text-gray-900 text-[10px] leading-tight">
              {{ bill.meter.consumption }} kWh
            </p>
            <p class="text-gray-600 text-[8px] leading-tight">
              Electricity
            </p>
          </div>
        </div>

        <!-- GHG -->
        <div class="flex items-center gap-1">
          <svg
            class="w-5 h-5 text-gray-600 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke-width="2" />
            <path d="M12 6v6l4 2" stroke-width="2" />
          </svg>
          <div>
            <p class="font-bold text-gray-900 text-[10px] leading-tight">
              {{ ghgEmission }} tCO₂e*
            </p>
            <p class="text-gray-600 text-[8px] leading-tight">
              GHG Emissions
            </p>
          </div>
        </div>

        <!-- Trees -->
        <div class="flex items-center gap-1">
          <svg
            class="w-5 h-5 text-gray-600 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-width="2" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" />
          </svg>
          <div>
            <p class="font-bold text-gray-900 text-[10px] leading-tight">
              {{ treeOffset }} trees**
            </p>
            <p class="text-gray-600 text-[8px] leading-tight">
              Offset
            </p>
          </div>
        </div>
      </div>

      <p class="text-[8px] text-gray-500 mt-1.5 leading-tight">
        *DOE 2015–2017: 0.0009129 tCO₂/kWh | **1 tree absorbs 0.02178 t CO₂/yr
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Bill {
  meter: {
    consumption: number
  }
}

const props = defineProps<{
  bill: Bill
}>()

const ghgEmission = computed(() =>
  (props.bill.meter.consumption * 0.0009129).toFixed(4)
)

const treeOffset = computed(() =>
  Math.ceil((props.bill.meter.consumption * 0.0009129) / 0.02178)
)
</script>