<template>
     <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div class="w-full max-w-2xl">
               <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">✏️ Editar ticket</h1>

               <div v-if="loading"
                    class="text-center text-gray-500 bg-white p-6 rounded-lg shadow border border-gray-200">
                    Cargando ticket...
               </div>

               <div v-else class="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                    <TicketForm :modelValue="ticket" @submit="handleSubmit" />
               </div>
          </div>
     </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TicketForm from '../../components/tickets/TicketForm.vue'
import { getTicketById, updateTicket } from '../../services/ticketService'
import { useToast } from 'vue-toast-notification'
import { useLoadingStore } from '../../store/loadingStore'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const loading2 = useLoadingStore()

const ticketId = route.params.id
const ticket = ref(null)
const loading = ref(true)

function validateFormData( formData ) {
     if( formData.priority === 'high' ) return 'alta'
     else if( formData.priority === 'medium' ) return 'media'
     else return 'baja'
}


function validateFormData2( formData ) {
     if( formData.priority === 'alta' ) return 'high'
     else if( formData.priority === 'media' ) return 'medium'
     else return 'low'
}

onMounted(async () => {
     try {
          loading2.show('Cargando información del ticket...')
          const response = await getTicketById(ticketId)
          response.data.data.priority = validateFormData( response.data.data )
          ticket.value = response.data.data
     } catch (error) {
          toast.error(error.message || 'Credenciales incorrectas o error de red.')
     } finally {
          loading.value = false
          loading2.hide()
     }
})

const handleSubmit = async (updatedData) => {
     try {
          loading2.show('Actualizando ticket...')
          updatedData.priority =  validateFormData2(updatedData)
          await updateTicket(ticketId, updatedData)
          toast.success('Ticket actualizado correctamente')
          router.push('/tickets')
     } catch (error) {
          toast.error(error.message || 'Error al actualizar el ticket')
     } finally {
          loading.value = false
          loading2.hide()
     }
}
</script>
