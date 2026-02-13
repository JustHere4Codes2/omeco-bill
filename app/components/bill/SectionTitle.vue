<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle?: string
  thin?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'w-full',
      props.thin ? 'mb-2' : 'mb-3'
    ]"
  >
    <h2
      :class="[
        'font-semibold text-gray-900 tracking-wide',
        props.thin ? 'text-sm' : 'text-base'
      ]"
    >
      {{ props.title }}
    </h2>

    <p
      v-if="props.subtitle"
      class="text-xs text-gray-600 mt-0.5"
    >
      {{ props.subtitle }}
    </p>

    <div class="border-b border-gray-300 mt-1"></div>
  </div>
</template>