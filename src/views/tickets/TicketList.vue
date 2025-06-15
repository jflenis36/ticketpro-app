<template>
     <div class="p-6 min-h-screen bg-gray-50">
          <div class="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
               <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-blue-600">🎟️ Lista de Tickets</h1>
                    <button @click="goToCreate"
                         class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow">
                         + Crear Ticket
                    </button>
               </div>

               <div class="overflow-x-auto">
                    <table class="min-w-full text-sm text-left border-collapse">
                         <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
                              <tr>
                                   <th class="px-4 py-3">ID</th>
                                   <th class="px-4 py-3">Título</th>
                                   <th class="px-4 py-3">Prioridad</th>
                                   <th class="px-4 py-3">Estado</th>
                                   <th class="px-4 py-3 text-center">Acciones</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr v-for="ticket in tickets" :key="ticket.id"
                                   class="border-b hover:bg-gray-50 transition">
                                   <td class="px-4 py-3 font-medium text-gray-700">{{ ticket.id }}</td>
                                   <td class="px-4 py-3 text-gray-800">{{ ticket.title }}</td>
                                   <td class="px-4 py-3">
                                        <span :class="{
                                             'text-red-600 font-semibold': ticket.priority === 'High',
                                             'text-yellow-600 font-semibold': ticket.priority === 'Medium',
                                             'text-green-600 font-semibold': ticket.priority === 'Low'
                                        }" class="capitalize">
                                             {{ ticket.priority || '---' }}
                                        </span>
                                   </td>
                                   <td class="px-4 py-3 capitalize font-medium text-gray-700">
                                        <span :class="{
                                             'text-green-600': ticket.status === 'Open',
                                             'text-gray-500': ticket.status === 'Closed',
                                             'text-orange-500': !ticket.status
                                        }">
                                             {{ ticket.status || 'pendiente' }}
                                        </span>
                                   </td>
                                   <td class="px-4 py-3 text-center space-x-2">
                                        <button @click="editTicket(ticket.id)"
                                             class="text-blue-600 hover:underline font-medium">
                                             Editar
                                        </button>
                                        <button @click="viewTicket(ticket.id)"
                                             class="text-indigo-600 hover:underline font-medium">
                                             Ver
                                        </button>
                                   </td>
                              </tr>
                         </tbody>
                    </table>
               </div>

               <p v-if="tickets.length === 0" class="text-center text-sm text-gray-500 mt-6">
                    No hay tickets disponibles.
               </p>
          </div>
     </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { getAllTickets } from '../../services/ticketService'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useLoadingStore } from '../../store/loadingStore'

const router = useRouter()
const tickets = ref([])
const toast = useToast()
const loading = useLoadingStore()

const fetchTickets = async () => {
     try {
          loading.show('Cargamdo tickets...')
          const response = await getAllTickets()
          tickets.value = response.data.data
     } catch (error) {
          toast.error(error.message || 'Error al cargar los tickets.')
     } finally {
          loading.hide()
     }
}

const editTicket = (id) => {
     router.push(`/tickets/${id}/edit`)
}

const goToCreate = () => {
     router.push('/tickets/create')
}

const viewTicket = (id) => {
     router.push(`/tickets/${id}`)
}

// 👇 Esto es lo que faltaba
onMounted(() => {
     fetchTickets()
})
</script>
