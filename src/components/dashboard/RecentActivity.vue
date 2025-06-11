<template>
     <div class="bg-white shadow rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">Actividad reciente</h3>

          <ul class="divide-y divide-gray-200">
               <li v-for="(item, index) in activities" :key="index" class="py-3">
                    <p class="text-gray-700 text-sm">
                         {{ item.message }}
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                         {{ formatDate(item.timestamp) }}
                    </p>
               </li>
          </ul>

          <p v-if="activities.length === 0" class="text-sm text-gray-500">No hay actividad reciente.</p>
     </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
     activities: {
          type: Array,
          default: () => []
     }
})

function formatDate(dateString) {
     const date = new Date(dateString)
     return date.toLocaleString('es-CO', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
     })
}
</script>
