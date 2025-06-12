<template>
     <div class="p-6 max-w-2xl mx-auto">
          <h1 class="text-2xl font-semibold mb-4 text-gray-800">Crear nuevo ticket</h1>
          <TicketForm @submit="handleSubmit" />
     </div>
</template>

<script setup>
import TicketForm from '../../components/tickets/TicketForm.vue'
import { createTicket } from '../../services/ticketService'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSubmit = async (formData) => {
     try {
          await createTicket(formData)
          alert('Ticket creado exitosamente')
          router.push('/tickets')
     } catch (error) {
          alert('Hubo un error al crear el ticket')
          console.error(error)
     }
}
</script>
