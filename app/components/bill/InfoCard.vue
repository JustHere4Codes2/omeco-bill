<script setup lang="ts">
defineProps<{
  label: string
  value?: string | number
  bold?: boolean
  align?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <div class="border border-gray-400 px-2 py-1 text-[11px] leading-tight">
    <div class="text-gray-600 uppercase tracking-wide">
      {{ label }}
    </div>

    <div
      class="mt-[2px]"
      :class="[
        bold ? 'font-semibold text-[12px]' : '',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right'
      ]"
    >
      {{ value ?? '-' }}
    </div>
  </div>
</template>