<template>
  <section class="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
    <!-- Environmental Impact -->
    <div class="border-t-2 border-gray-300 pt-4">
      <h3 class="font-bold text-gray-900 mb-2 text-sm">
        Environmental Impact
      </h3>

      <p class="text-xs text-gray-600 mb-3">
        Be energy efficient. Save and help take care of our environment
      </p>

      <div class="flex items-center gap-6 text-xs">
        <!-- Electricity Used -->
        <div class="flex items-center gap-2.5">
          <svg
            class="w-10 h-10 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M13 10V3L4 14h7v7l9-11h-7z"
              stroke-width="2"
            />
          </svg>
          <div>
            <p class="font-bold text-gray-900 text-base">
              {{ bill.meter.consumption }} kWh
            </p>
            <p class="text-gray-600 text-xs">Electricity Used</p>
          </div>
        </div>

        <!-- GHG -->
        <div class="flex items-center gap-2.5">
          <svg
            class="w-10 h-10 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke-width="2" />
            <path d="M12 6v6l4 2" stroke-width="2" />
          </svg>
          <div>
            <p class="font-bold text-gray-900 text-base">
              {{ ghgEmission }} tCO₂e*
            </p>
            <p class="text-gray-600 text-xs">Equiv. GHG Emissions</p>
          </div>
        </div>

        <!-- Trees -->
        <div class="flex items-center gap-2.5">
          <svg
            class="w-10 h-10 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5z"
              stroke-width="2"
            />
            <path
              d="M2 17l10 5 10-5M2 12l10 5 10-5"
              stroke-width="2"
            />
          </svg>
          <div>
            <p class="font-bold text-gray-900 text-base">
              {{ treeOffset }} trees**
            </p>
            <p class="text-gray-600 text-xs">Offset Emissions</p>
          </div>
        </div>
      </div>

      <p class="text-[10px] text-gray-500 mt-3 leading-relaxed">
        *Using DOE's 2015–2017 National Emission Grid Factor of
        0.0009129 tCO₂/kWh
        <br />
        **Per Arbor Day Foundation, 1 mature tree absorbs
        48 pounds (0.02178 tonnes) of CO₂/year
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
  Math.ceil(
    (props.bill.meter.consumption * 0.0009129) / 0.02178
  )
)
</script>