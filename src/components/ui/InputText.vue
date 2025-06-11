<template>
     <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
          <input :type="type" v-model="inputValue"
               class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
     </div>
</template>

<script setup>
     import { computed } from 'vue'

     const props = defineProps({
          modelValue: String,
          label: String,
          type: {
               type: String,
               default: 'text'
          }
     })

     const emit = defineEmits(['update:modelValue'])

     const inputValue = computed({
          get: () => props.modelValue,
          set: (val) => emit('update:modelValue', val)
     })
</script>
