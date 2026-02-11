<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import omecoLogo from '~/assets/omeco-logo.png'

defineProps<{
  bill: OmecoBill
}>()
</script>
<template>
  <section class="bg-white border-t border-gray-300 py-2 text-[11px] break-inside-avoid">

    <!-- MAIN ROW -->
    <div class="flex justify-between items-center gap-4">

      <!-- LEFT SIDE -->
      <div class="flex items-center gap-4 flex-1">

        <!-- QR -->
        <div class="flex-shrink-0 text-center">
          <div class="w-14 h-14 bg-gray-900 rounded flex items-center justify-center text-white text-[9px]">
            QR
          </div>
        </div>

        <!-- Payment + Barcode -->
        <div class="flex-1">
          <p class="text-xs text-gray-700 mb-1">
            Pay before <span class="font-medium">{{ bill.dueDate }}</span>
          </p>

          <div class="h-8 bg-gray-900 rounded flex items-center px-2 w-full max-w-[260px]">
            <div class="flex gap-px h-full items-center">
              <div
                v-for="i in 55"
                :key="i"
                class="bg-white h-full"
                :style="{ width: i % 3 === 0 ? '2px' : '3px' }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE SUMMARY -->
      <div class="flex items-center gap-6 bg-gray-50 border border-gray-300 rounded-md px-4 py-2">

        <div>
          <p class="text-[9px] text-gray-600">CAN</p>
          <p class="font-bold text-sm">
            {{ bill.accountNumber }}
          </p>
        </div>

        <div>
          <p class="text-[9px] text-gray-600">Amount Due</p>
          <p class="font-bold text-base">
            ₱ {{ bill.totalAmountDue.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>
        </div>

        <img
          :src="omecoLogo"
          alt="OMECO"
          class="h-6 w-auto object-contain"
        />
      </div>
    </div>

    <!-- BOTTOM STRIP -->
    <div class="mt-2 pt-1 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-600">

      <div class="flex items-center gap-3">
        <span>FB: OMECO - IEC</span>
        <span>|</span>
        <span>16211</span>
        <span>|</span>
        <span>customercare@omeco.com.ph</span>
        <span>|</span>
        <span>omeco.com.ph</span>
      </div>

      <span class="text-[9px] text-gray-500">
        Routine meter inspection may be conducted.
      </span>
    </div>

  </section>
</template>
<style scoped>
@media print {
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>