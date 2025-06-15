<template>
     <div class="p-6 min-h-screen bg-gray-50">
          <div class="max-w-4xl mx-auto space-y-8">

               <!-- Loading -->
               <div v-if="loading" class="text-gray-500 text-center bg-white p-6 rounded shadow border">
                    Cargando ticket...
               </div>

               <!-- Detalles -->
               <div v-if="ticket" class="bg-white p-6 rounded-xl shadow border border-gray-200">
                    <div class="flex justify-between items-start mb-6">
                         <div>
                              <h1 class="text-3xl font-bold text-blue-600 mb-1">{{ ticket.title }}</h1>
                              <p class="text-sm text-gray-500">ID: {{ ticket.id }}</p>
                         </div>
                         <button @click="editTicket(ticket.id)"
                              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                              Editar
                         </button>
                    </div>

                    <div class="space-y-4">
                         <div>
                              <h2 class="font-semibold text-gray-700">📝 Descripción</h2>
                              <p class="text-gray-800 mt-1">{{ ticket.description }}</p>
                         </div>

                         <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                   <h3 class="text-sm font-medium text-gray-500">📌 Prioridad</h3>
                                   <p :class="{
                                        'text-red-600 font-semibold': ticket.priority === 'High',
                                        'text-yellow-600 font-semibold': ticket.priority === 'Medium',
                                        'text-green-600 font-semibold': ticket.priority === 'Low'
                                   }" class="capitalize">
                                        {{ ticket.priority }}
                                   </p>
                              </div>

                              <div>
                                   <h3 class="text-sm font-medium text-gray-500">📂 Estado</h3>
                                   <p class="text-gray-700 capitalize">{{ ticket.status || 'pendiente' }}</p>
                              </div>

                              <div>
                                   <h3 class="text-sm font-medium text-gray-500">🕒 Creado</h3>
                                   <p class="text-gray-700">{{ formatDate(ticket.created_at) }}</p>
                              </div>

                              <div>
                                   <h3 class="text-sm font-medium text-gray-500">🔁 Última actualización</h3>
                                   <p class="text-gray-700">{{ formatDate(ticket.updated_at) }}</p>
                              </div>
                         </div>
                    </div>
               </div>

               <!-- Comentarios -->
               <div v-if="!loading">
                    <CommentList :comments="ticket.comments || []" />
                    <CommentForm @posted="handleNewComment" />
               </div>

               <p v-else class="text-sm text-red-600">No se pudo encontrar el ticket.</p>
          </div>
     </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTicketById } from '../../services/ticketService'
import CommentList from '../../components/comments/CommentList.vue'
import CommentForm from '../../components/comments/CommentForm.vue'
import { addComment } from '../../services/commentService'
import { useToast } from 'vue-toast-notification'
import { useLoadingStore } from '../../store/loadingStore'

const route = useRoute()
const router = useRouter()

const ticket = ref(null)
const loading = ref(true)
const toast = useToast()
const loading2 = useLoadingStore()

const fetchTicket = async () => {
     try {
          loading2.show('Cargando información de ticket...')
          const response = await getTicketById(route.params.id)
          ticket.value = response.data.data
     } catch (error) {
          ticket.value = null
          toast.error( 'Error al cargar el ticket.' )
     } finally {
          loading.value = false
          loading2.hide()
     }
}

const handleNewComment = async (text) => {
     try {
          loading2.show('Almacenando mensaje...')
          await addComment(route.params.id, { content: text })
          await fetchTicket()  // vuelve a cargar con el nuevo comentario
     } catch (error) {
          toast.error( 'Error al guardar mensaje.' )
     } finally {
          loading2.hide()
     }
}

const editTicket = (id) => {
     router.push(`/tickets/${id}/edit`)
}

const formatDate = (value) => {
     if (!value) return '-'
     return new Date(value).toLocaleString('es-CO', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
     })
}

onMounted(fetchTicket)
</script>
