<template>
     <form @submit.prevent="submit">
          <textarea v-model="text" required class="w-full border rounded p-2"></textarea>
          <button type="submit" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Agregar comentario</button>
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
