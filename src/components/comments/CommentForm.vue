<template>
     <form @submit.prevent="submit" class="mt-6 bg-white rounded-xl p-4 shadow-md border border-gray-200">
          <textarea v-model="text" required rows="3" placeholder="Escribe tu comentario..."
               class="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button type="submit"
               class="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
               Agregar comentario
          </button>
     </form>
</template>


<script setup>
import { ref } from 'vue'
const emit = defineEmits(['posted'])
const text = ref('')

const submit = () => {
     if (!text.value.trim()) return
     emit('posted', text.value)
     text.value = ''
}
</script>
