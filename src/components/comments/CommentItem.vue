<template>
     <div class="border-b pb-4 mb-4">
          <!-- Comentario principal -->
          <p><strong>👤 Usuario {{ comment.user_id }}</strong>: {{ comment.content }}</p>
          <p class="text-xs text-gray-500">{{ formatDate(comment.created_at) }}</p>

          <!-- Acciones -->
          <div class="mt-2 space-x-4">
               <button class="text-blue-500 text-sm" @click="toggleReplyForm">
                    {{ showReplyForm ? 'Cancelar' : 'Responder' }}
               </button>
               <button class="text-blue-500 text-sm" @click="toggleReplies">
                    {{ showReplies ? 'Ocultar respuestas' : 'Ver respuestas' }}
               </button>
          </div>

          <!-- Formulario de respuesta -->
          <CommentForm v-if="showReplyForm" @posted="handleReply" />

          <!-- Respuestas -->
          <CommentReplies v-if="showReplies" :commentId="comment.id" />

     </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentForm from './CommentForm.vue'
import CommentReplies from './CommentReplies.vue'
import { getReplies, postReply } from '../../services/commentService'

const props = defineProps({ comment: Object })

const showReplies = ref(false)
const showReplyForm = ref(false)
const replies = ref([])
const loading = ref(false)

const toggleReplies = async () => {
     showReplies.value = !showReplies.value
     if (showReplies.value && replies.value.length === 0) {
          loading.value = true
          try {
               const res = await getReplies(props.comment.id)
               replies.value = res.data.data.replies
          } catch (err) {
               console.error('Error al obtener respuestas:', err)
          } finally {
               loading.value = false
          }
     }
}

const toggleReplyForm = () => {
     showReplyForm.value = !showReplyForm.value
}

const handleReply = async (text) => {
     await postReply(props.comment.id, { content: text })
     toggleReplyForm()
     replies.value = [] // limpia para volver a cargar
     showReplies.value = false
     await toggleReplies() // vuelve a cargar
}

const formatDate = (d) =>
     new Date(d).toLocaleString('es-CO', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
     })
</script>
