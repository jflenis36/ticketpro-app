<template>
     <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div class="w-full max-w-2xl">
               <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">📄 Crear nuevo ticket</h1>
               <TicketForm @submit="handleSubmit" />
          </div>
     </div>
</template>

<script setup>
import TicketForm from '../../components/tickets/TicketForm.vue'
import { createTicket } from '../../services/ticketService'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useLoadingStore } from '../../store/loadingStore'

const router = useRouter()
const toast = useToast()
const loading = useLoadingStore()

function validateFormData( formData ) {
     if( formData.priority === 'alta' ) return 'high'
     else if( formData.priority === 'media' ) return 'medium'
     else return 'low'
}

const handleSubmit = async (formData) => {
     try {
          loading.show('Creando ticket...')
          formData.priority = validateFormData(formData)
          formData.category_id = 5
          await createTicket(formData)
          toast.success('Ticket creado exitosamente')
          router.push('/tickets')
     } catch (error) {
          toast.error(error.message || 'Hubo un error al crear el ticket')
          console.error(error)
     } finally {
          loading.hide()
     }
}
</script>
