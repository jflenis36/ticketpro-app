<template>
     <div class="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
               <h3 class="text-gray-500 text-sm font-medium">{{ label }}</h3>
               <p class="text-2xl font-semibold text-gray-800">{{ value }}</p>
          </div>
          <div class="text-3xl">
               <slot /> <!-- Puedes pasar un ícono aquí -->
          </div>
     </div>
</template>

<script setup>
defineProps({
     label: String,
     value: [String, Number]
})
</script>
