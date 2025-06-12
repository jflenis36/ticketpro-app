<template>
     <div class="p-6 max-w-3xl mx-auto">
          <div v-if="loading" class="text-gray-500">Cargando ticket...</div>

          <div v-else-if="ticket" class="bg-white shadow rounded-lg p-6 space-y-4">
               <div class="flex justify-between items-start">
                    <div>
                         <h1 class="text-2xl font-semibold text-gray-800 mb-1">{{ ticket.title }}</h1>
                         <p class="text-sm text-gray-500">ID: {{ ticket.id }}</p>
                    </div>
                    <button @click="editTicket(ticket.id)"
                         class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                         Editar
                    </button>
               </div>

               <div>
                    <h2 class="font-medium text-gray-700">Descripción</h2>
                    <p class="text-gray-800 mt-1">{{ ticket.description }}</p>
               </div>

               <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                         <h3 class="text-sm font-medium text-gray-500">Prioridad</h3>
                         <p class="text-gray-800 capitalize">{{ ticket.priority }}</p>
                    </div>

                    <div>
                         <h3 class="text-sm font-medium text-gray-500">Estado</h3>
                         <p class="text-gray-800 capitalize">{{ ticket.status || 'pendiente' }}</p>
                    </div>

                    <div>
                         <h3 class="text-sm font-medium text-gray-500">Creado</h3>
                         <p class="text-gray-800">{{ formatDate(ticket.created_at) }}</p>
                    </div>

                    <div>
                         <h3 class="text-sm font-medium text-gray-500">Última actualización</h3>
                         <p class="text-gray-800">{{ formatDate(ticket.updated_at) }}</p>
                    </div>
               </div>
          </div>

          <p v-else class="text-sm text-red-600">No se pudo encontrar el ticket.</p>

          <div v-if="loading">Cargando ticket…</div>
          <div v-else>
               <CommentList :comments="ticket.comments || []" />
               <CommentForm @posted="handleNewComment" />
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

const route = useRoute()
const router = useRouter()

const ticket = ref(null)
const loading = ref(true)

const fetchTicket = async () => {
     try {
          const response = await getTicketById(route.params.id)
          console.log(response)
          ticket.value = response.data.data
     } catch (error) {
          ticket.value = null
     } finally {
          loading.value = false
     }
}

const handleNewComment = async (text) => {
  await addComment(route.params.id, { content: text })
  await fetchTicket()  // vuelve a cargar con el nuevo comentario
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
