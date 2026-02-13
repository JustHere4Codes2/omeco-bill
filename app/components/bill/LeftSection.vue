<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <div class="flex flex-col gap-3 print:gap-2">
    <PaymentsHistory :bill="bill" />
    <UnpaidSection :bill="bill" />
    <TipsSection :bill="bill" />
  </div>
</template>