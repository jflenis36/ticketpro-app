<template>
     <div class="bg-white shadow rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">Notas del sistema</h3>

          <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
               <li v-for="(note, index) in notes" :key="index">
                    {{ note }}
               </li>
          </ul>

          <p v-if="notes.length === 0" class="text-sm text-gray-500">
               No hay notas disponibles.
          </p>
     </div>
</template>

<script setup>
defineProps({
     notes: {
          type: Array,
          default: () => []
     }
})
</script>
