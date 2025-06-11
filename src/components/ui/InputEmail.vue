<template>
     <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
          <div class="relative">
               <span class="absolute inset-y-3 left-0 flex pl-3">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                              :stroke="errorMessage ? '#fb2c36' : '#b5b8bd'" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" />
                         <rect x="3" y="5" width="18" height="14" rx="2" :stroke="errorMessage ? '#fb2c36' : '#b5b8bd'"
                              stroke-width="2" stroke-linecap="round" />
                    </svg>
               </span>
               <input :type="type" v-model="inputValue" :placeholder="placeholder" :class="[
                    'w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
                    errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
               ]" />
               <p v-if="showErrors && errorMessage" class="mt-1 text-sm text-red-500">{{ errorMessage }}</p>
          </div>
     </div>
</template>

<script setup>
     import { ref, computed, watch } from 'vue'

     const errorMessage = ref('')

     const props = defineProps({
          modelValue: String,
          label: String,
          placeholder: String,
          type: {
               type: String,
               default: 'text'
          },
          showErrors: Boolean
     })

     const emit = defineEmits(['update:modelValue', 'update:isValid'])

     const inputValue = computed({
          get: () => props.modelValue,
          set: (val) => {
               emit('update:modelValue', val)
               validate(val)
          }
     })

     function validate(val) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const isValid = regex.test(val)
          errorMessage.value = isValid ? '' : 'Correo electrónico inválido.'
          emit('update:isValid', isValid)
     }

     watch(() => props.modelValue, validate, { immediate: true })
     watch(() => props.showErrors, (val) => val && validate(inputValue.value))
</script>