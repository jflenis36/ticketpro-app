<template>
     <div class="p-6">
          <div class="flex justify-between items-center mb-4">
               <h1 class="text-2xl font-semibold text-gray-800">Lista de Tickets</h1>
               <button @click="goToCreate" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                    + Crear Ticket
               </button>
          </div>

          <table class="min-w-full bg-white shadow-md rounded overflow-hidden">
               <thead class="bg-gray-100 text-left">
                    <tr>
                         <th class="px-4 py-2">ID</th>
                         <th class="px-4 py-2">Título</th>
                         <th class="px-4 py-2">Prioridad</th>
                         <th class="px-4 py-2">Estado</th>
                         <th class="px-4 py-2">Acciones</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="ticket in tickets" :key="ticket.id" class="border-t hover:bg-gray-50">
                         <td class="px-4 py-2">{{ ticket.id }}</td>
                         <td class="px-4 py-2">{{ ticket.title }}</td>
                         <td class="px-4 py-2 capitalize">{{ ticket.priority }}</td>
                         <td class="px-4 py-2 capitalize">{{ ticket.status || 'pendiente' }}</td>
                         <td class="px-4 py-2">
                              <button @click="editTicket(ticket.id)" class="text-blue-600 hover:underline text-sm">
                                   Editar
                              </button>
                              <button @click="viewTicket(ticket.id)" class="text-blue-500 hover:underline text-sm mr-2">
                                   Ver
                              </button>
                         </td>
                    </tr>
               </tbody>
          </table>

          <p v-if="tickets.length === 0" class="text-sm text-gray-500 mt-4">
               No hay tickets disponibles.
          </p>
     </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAllTickets } from '../../services/ticketService'
import { useRouter } from 'vue-router'

const router = useRouter()
const tickets = ref([])

const fetchTickets = async () => {
     console.log("inciamos")
     try {
          const response = await getAllTickets()
          console.log(response.data.data)
          tickets.value = response.data.data
     } catch (error) {
          alert('Error al cargar los tickets')
          console.error(error)
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
