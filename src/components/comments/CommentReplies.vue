<template>
     <div class="mt-3 pl-4 border-l">
          <p v-if="loading" class="text-sm text-gray-400">Cargando respuestas...</p>
          <ul v-else>
               <li v-for="r in replies" :key="r.id" class="mb-2">
                    <p><strong>↪ Usuario {{ r.user_id }}</strong>: {{ r.content }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(r.created_at) }}</p>
               </li>
               <p v-if="replies.length === 0" class="text-sm text-gray-400">No hay respuestas aún.</p>
          </ul>
     </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getReplies } from '../../services/commentService'

const props = defineProps({ commentId: Number })
const replies = ref([])
const loading = ref(false)

const formatDate = (d) =>
     new Date(d).toLocaleString('es-CO', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
     })

onMounted(async () => {
     loading.value = true
     try {
          const res = await getReplies(props.commentId)
          replies.value = res.data.data.replies
     } catch (err) {
          console.error('Error al cargar respuestas:', err)
     } finally {
          loading.value = false
     }
})
</script>
