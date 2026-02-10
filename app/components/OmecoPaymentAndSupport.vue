<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import omecoLogo from '~/assets/omeco-logo.png'

defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <section class="bg-white">
    <!-- Payment Instruction -->
    <div class="border-t-2 border-gray-300 pt-6 mb-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Payment Instruction</h2>

      <div class="flex gap-8">
        <!-- Left: QR Code Section -->
        <div class="flex items-start gap-4">
          <!-- QR Code Placeholder -->
          <div class="flex-shrink-0">
            <div class="w-24 h-24 bg-gray-900 rounded flex items-center justify-center">
              <div class="text-white text-xs text-center leading-tight">
                QR<br>CODE
              </div>
            </div>
            <p class="text-[9px] text-gray-600 text-center mt-1 leading-tight">
              QR code contains<br>your CAN.
            </p>
          </div>

          <!-- Barcode -->
          <div class="flex flex-col">
            <div class="mb-2">
              <p class="text-xs text-gray-700 leading-relaxed max-w-sm">
                Please pay at any OMECO Business Center or through any accredited payment partner before the due date.
              </p>
            </div>
            
            <!-- Barcode placeholder -->
            <div class="flex flex-col items-start">
              <div class="h-16 bg-gray-900 rounded flex items-center px-4 mb-1" style="width: 400px;">
                <div class="flex gap-px h-full items-center">
                  <div v-for="i in 80" :key="i" 
                       class="bg-white h-full"
                       :style="{ width: i % 3 === 0 ? '2px' : '3px' }"
                  />
                </div>
              </div>
              
              <div class="text-[10px] text-gray-600 space-y-0.5">
                <p>Payment made after {{ bill.dueDate }} will be reflected on your next bill.</p>
                <p class="font-medium">Permit No.: 0305-00036-BAJAR dtd: March 21, 2005</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-6 border-t border-gray-300">
        <div class="flex justify-between items-end">
          <!-- Left: Contact Info -->
          <div>
            <p class="text-xs text-gray-700 mb-3">
              For more information, you may reach us<br>
              through any of our channels
            </p>
            
            <div class="flex items-center gap-3 text-xs text-gray-600 flex-wrap">
              <a href="https://www.facebook.com/omecofyi/" class="hover:text-amber-600 transition-colors flex items-center gap-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>OMECO - IEC</span>
              </a>
              
              <span class="text-gray-400">|</span>
              
              
              <span class="text-gray-400">|</span>
              
              <a href="tel:16211" class="hover:text-amber-600 transition-colors flex items-center gap-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>Hotline 16211</span>
              </a>
              
              <span class="text-gray-400">|</span>
              
              <a href="mailto:customercare@omeco.com.ph" class="hover:text-amber-600 transition-colors flex items-center gap-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>customercare@omeco.com.ph</span>
              </a>
              
              <span class="text-gray-400">|</span>
              
              <a href="https://www.omeco.com.ph" class="hover:text-amber-600 transition-colors">
                www.omeco.com.ph
              </a>
            </div>
          </div>

          <!-- Right: Payment Summary -->
          <div class="text-right bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div class="text-left">
                <p class="text-xs text-gray-600 mb-1">Customer Account No. (CAN)</p>
                <p class="font-bold text-gray-900 text-lg">{{ bill.accountNumber }}</p>
              </div>
              
              <div class="text-right">
                <p class="text-xs text-gray-600 mb-1">Please pay</p>
                <p class="font-bold text-gray-900 text-lg">
                  ₱ {{ bill.totalAmountDue.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
                </p>
              </div>
            </div>
            
            <div class="mt-3 pt-3 border-t border-gray-300 flex justify-end">
              <img
                :src="omecoLogo"
                alt="OMECO"
                class="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Notice -->
      <div class="mt-6 text-xs text-gray-500 text-center">
        <p>Please be informed that OMECO may conduct a routine maintenance inspection of our customer metering facilities within your area this quarter.</p>
      </div>
    </div>

    <!-- Bill Concerns Section -->
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-lg p-6 mt-6">
      <div class="flex items-center gap-6">
        <!-- Illustration -->
        <div class="flex-shrink-0">
          <div class="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
            <svg class="w-24 h-24 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Bill Concerns?</h2>
          
          <p class="text-sm text-gray-700 mb-4">
            Connect with us through our <span class="font-bold">24/7</span> channels:
          </p>

          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <a href="https://www.facebook.com/omecofyi/"></a>
              <span class="font-medium text-gray-900">OMECO-IEC</span>
            </div> 
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <span class="font-medium text-gray-900">Hotline 16211</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span class="font-medium text-gray-900">customercare@omeco.com.ph</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>