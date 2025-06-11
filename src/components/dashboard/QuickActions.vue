<template>
     <div class="bg-white shadow rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">Acciones rápidas</h3>

          <div class="flex flex-col sm:flex-row gap-3">
               <button @click="$emit('create-ticket')"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto">
                    + Crear Ticket
               </button>

               <button @click="$emit('view-tickets')"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded w-full sm:w-auto">
                    Ver todos
               </button>

               <button v-if="showSettings" @click="$emit('open-settings')"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded w-full sm:w-auto">
                    ⚙️ Configuración
               </button>
          </div>
     </div>
</template>

<script setup>
defineProps({
     showSettings: {
          type: Boolean,
          default: false
     }
})

defineEmits(['create-ticket', 'view-tickets', 'open-settings'])
</script>
