<template>
     <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">
               Hola, {{ userName }} 👋
          </h1>
          <p class="text-gray-500 text-sm">
               Hoy es {{ currentDate }} | Rol: {{ role }}
          </p>
     </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
     userName: { type: String, default: 'Usuario' },
     role: { type: String, default: 'Admin' }
})

const currentDate = computed(() => {
     const fecha = new Date()
     return fecha.toLocaleDateString('es-CO', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
     })
})
</script>
