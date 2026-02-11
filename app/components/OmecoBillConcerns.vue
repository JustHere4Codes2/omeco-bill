<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
defineProps<{
  bill: OmecoBill
}>()
</script>
<template>
  <div class="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 mt-4">
    <div class="flex items-center gap-4">

      <!-- Smaller Illustration -->
      <div class="flex-shrink-0">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <h2 class="text-lg font-bold text-gray-900 mb-2">
          Bill Concerns?
        </h2>

        <p class="text-xs text-gray-700 mb-2">
          Contact our <span class="font-semibold">24/7</span> support:
        </p>

        <!-- Horizontal Contact Row -->
        <div class="flex flex-wrap items-center gap-4 text-xs text-gray-800">

          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="font-medium">OMECO-IEC</span>
          </div>

          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span class="font-medium">16211</span>
          </div>

          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span class="font-medium">customercare@omeco.com.ph</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>