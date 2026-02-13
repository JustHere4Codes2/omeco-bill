<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <section class="border border-gray-400 rounded p-3">
    <h3 class="font-bold mb-2 text-[10px]">Tips for hassle free payment</h3>
    <div class="space-y-1.5 text-[9px]">
      <div class="flex gap-2">
        <div class="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
          1
        </div>
        <p>Use your 10-digit Customer Account Number (CAN)</p>
      </div>
      <div class="flex gap-2">
        <div class="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
          2
        </div>
        <p>Check payment should be payable to "OMECO" or "Occidental Mindoro Electric Cooperative". At the back of check, write your Customer Account Number (CAN), Contact Person Name and Contact Number.</p>
      </div>
      <div class="flex gap-2">
        <div class="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
          3
        </div>
        <p>Pay on or before due date</p>
      </div>
    </div>
    
    <div class="mt-3 pt-3 border-t border-gray-300 flex items-start gap-3">
      <div class="w-16 h-16 bg-black flex-shrink-0 rounded">
        <div class="w-full h-full flex items-center justify-center text-white text-[8px] text-center leading-tight">
          QR<br>CODE
        </div>
      </div>
      <p class="text-[8px] text-gray-600 leading-tight">
        Learn about OMECO's authorized payment partners, energy savings, and safety. Visit our website or any of our social media channels.
      </p>
    </div>
  </section>
</template>