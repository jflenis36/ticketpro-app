<template>
     <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
          <div class="relative">
               <span @click="toggleVisibility" class="absolute inset-y-3 left-0 flex pl-3 text-gray-400 cursor-pointer">
                    <svg v-if="showPassword" width="19" height="19" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                              :stroke="errorMessage ? '#fb2c36' : '#b5b8bd'" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" />
                         <path d="M12 5c-4.478 0-8.268 2.943-9.543 7C3.732 16.057 7.522 19 12 19s8.268-2.943 9.543-7C20.268 7.943 16.478 5 12 5z"
                              :stroke="errorMessage ? '#fb2c36' : '#b5b8bd'" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" />
                    </svg>
                    <svg v-else width="19" height="19" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M3 3l18 18M10.999 5.049C11.328 5.017 11.662 5 12 5c4.478 0 8.268 2.943 9.543 7-.28.894-.683 1.734-1.189 2.5M6.5 6.647C4.6 7.9 3.153 9.784 2.457 12c1.274 4.057 5.064 7 9.542 7 1.989 0 3.842-.581 5.4-1.582M9.843 9.914C9.321 10.454 9 11.189 9 12c0 1.657 1.343 3 3 3 .822 0 1.567-.331 2.109-.867"
                              :stroke="errorMessage ? '#fb2c36' : '#b5b8bd'" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" />
                    </svg>
               </span>
               <input :type="showPassword ? 'text' : 'password'" v-model="inputValue" :placeholder="placeholder" :class="[
                    'w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
                    errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
               ]" />
               <p v-if="showErrors && errorMessage" class="mt-1 text-sm text-red-500">{{ errorMessage }}</p>
          </div>
     </div>
</template>

<script setup>
     import { ref, computed, watch } from 'vue'

     const showPassword = ref(false)
     const errorMessage = ref('')

     const props = defineProps({
          modelValue: String,
          label: String,
          placeholder: String,
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
          let isValid = true

          if (val.length < 5) {
               errorMessage.value = 'Debe tener al menos 5 caracteres.'
               isValid = false
          }
          //  else if (!/[A-Z]/.test(val)) {
          //      errorMessage.value = 'Debe contener una letra mayúscula.'
          //      isValid = false
          // } 
          else if (!/[a-z]/.test(val)) {
               errorMessage.value = 'Debe contener una letra minúscula.'
               isValid = false
          } 
          // else if (!/\d/.test(val)) {
          //      errorMessage.value = 'Debe contener al menos un número.'
          //      isValid = false
          // } 
          else {
               errorMessage.value = ''
          }

          emit('update:isValid', isValid)
     }

     watch(() => props.modelValue, validate, { immediate: true })
     watch(() => props.showErrors, (val) => val && validate(inputValue.value))

     const toggleVisibility = () => showPassword.value = !showPassword.value
</script>