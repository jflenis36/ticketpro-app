<template>
     <div class="mb-6">
          <div class="flex items-start gap-3">
               <div class="pt-1 text-purple-600">👤</div>
               <div class="w-full">
                    <p class="font-semibold text-gray-800">Usuario {{ comment.user_id }}</p>
                    <p class="text-gray-700 text-sm">{{ comment.content }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ formatDate(comment.created_at) }}</p>

                    <div class="mt-2 flex gap-4 text-sm">
                         <button class="text-blue-600 hover:underline" @click="toggleReplyForm">
                              {{ showReplyForm ? 'Cancelar' : 'Responder' }}
                         </button>
                         <button class="text-blue-600 hover:underline" @click="toggleReplies">
                              {{ showReplies ? 'Ocultar respuestas' : 'Ver respuestas' }}
                         </button>
                    </div>

                    <div v-if="showReplyForm" class="mt-3">
                         <CommentForm @posted="handleReply" />
                    </div>

                    <div v-if="showReplies" class="mt-4 pl-4 border-l-2 border-gray-200">
                         <CommentReplies :replies="replies" />
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentForm from './CommentForm.vue'
import CommentReplies from './CommentReplies.vue'
import { getReplies, postReply } from '../../services/commentService'
import { useLoadingStore } from '../../store/loadingStore'
import { useToast } from 'vue-toast-notification'

const props = defineProps({ comment: Object })
const showReplies = ref(false)
const showReplyForm = ref(false)
const replies = ref([])
const loading = useLoadingStore()
const toast = useToast()

const toggleReplies = async () => {
     showReplies.value = !showReplies.value
     if (showReplies.value && replies.value.length === 0) {
          try {
               loading.show('Cargando respuestas...')
               const res = await getReplies(props.comment.id)
               replies.value = res.data.data.replies
          } catch (err) {
               toast.error(error.message || 'Error al obtener respuestas:')
          } finally {
               loading.hide()
          }
     }
}

const toggleReplyForm = () => {
     showReplyForm.value = !showReplyForm.value
}

const handleReply = async (text) => {
     try {
          loading.show('Creando mensaje...')
          await postReply(props.comment.id, { content: text })
          toggleReplyForm()
          replies.value = []
          showReplies.value = false
          await toggleReplies()
     } catch {
          toast.error(error.message || 'Error al crear mensaje.')
     } finally {
          loading.hide()
     }
}

const formatDate = (d) =>
     new Date(d).toLocaleString('es-CO', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
     })
</script>
