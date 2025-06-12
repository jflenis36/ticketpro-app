<template>
     <div class="p-6 max-w-2xl mx-auto">
          <h1 class="text-2xl font-semibold mb-4 text-gray-800">Editar Ticket</h1>

          <div v-if="loading" class="text-gray-500">Cargando ticket...</div>
          <div v-else>
               <TicketForm :modelValue="ticket" @submit="handleSubmit" />
          </div>
     </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TicketForm from '../../components/tickets/TicketForm.vue'
import { getTicketById, updateTicket } from '../../services/ticketService'

const route = useRoute()
const router = useRouter()

const ticketId = route.params.id
const ticket = ref(null)
const loading = ref(true)

onMounted(async () => {
     try {
          const response = await getTicketById(ticketId)
          ticket.value = response.data
     } catch (error) {
          alert('Error al cargar el ticket')
          console.error(error)
     } finally {
          loading.value = false
     }
})

const handleSubmit = async (updatedData) => {
     try {
          await updateTicket(ticketId, updatedData)
          alert('Ticket actualizado correctamente')
          router.push('/tickets')
     } catch (error) {
          alert('Error al actualizar el ticket')
          console.error(error)
     }
}
</script>
