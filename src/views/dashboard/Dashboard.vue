<template>
     <div class="p-6 space-y-8">

          <!-- Encabezado -->
          <DashboardHeader userName="Felipe" role="Admin" />

          <!-- Estadísticas rápidas -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               <StatCard label="Total de Tickets" :value="stats.total || 0">🗂</StatCard>
               <StatCard label="Abiertos" :value="stats.open || 0">📂</StatCard>
               <StatCard label="Cerrados" :value="stats.closed || 0">✅</StatCard>
               <StatCard label="En Revisión" :value="stats.inProgress || 0">🔎</StatCard>
          </div>

          <!-- Actividad reciente + Acciones rápidas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <RecentActivity :activities="recent" />
               <QuickActions :showSettings="true" @create-ticket="goToCreateTicket" @view-tickets="goToTicketList"
                    @open-settings="goToSettings" />
          </div>

          <!-- Proyectos activos -->
          <div>
               <h3 class="text-lg font-semibold text-gray-800 mb-4">Proyectos activos</h3>
               <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <ProjectSummaryCard v-for="proj in projects" :key="proj.id" :project="proj"
                         @open-project="goToProject" />
               </div>
          </div>

          <!-- Notas del sistema -->
          <DashboardNotes :notes="systemNotes" />

     </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import DashboardHeader from '../../components/dashboard/DashboardHeader.vue'
import StatCard from '../../components/dashboard/StatCard.vue'
import DashboardNotes from '../../components/dashboard/DashboardNotes.vue'
import ProjectSummaryCard from '../../components/dashboard/ProjectSummaryCard.vue'
import QuickActions from '../../components/dashboard/QuickActions.vue'
import RecentActivity from '../../components/dashboard/RecentActivity.vue'
import { getInformation } from '../../services/dashboardService'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useLoadingStore } from '../../store/loadingStore'

const router = useRouter()
const stats = ref({})
const recent = ref([])
const projects = ref([])
const toast = useToast()
const loading = useLoadingStore()
const systemNotes = [
     'Recuerda revisar los tickets urgentes antes del mediodía.',
     'El módulo de usuarios estará en mantenimiento el viernes.',
     'Verifica que los tickets cerrados estén correctamente documentados.'
]

const goToCreateTicket = () => router.push('/tickets/create')
const goToTicketList = () => router.push('/tickets')
const goToSettings = () => router.push('/admin/settings')
const goToProject = (projectId) => router.push(`/projects/${projectId}`)

onMounted(async () => {
     try {
          loading.show('Cargando información...')
          const { data } = await getInformation()

          stats.value = data.data.ticket_summary
          recent.value = data.data.recent_tickets.map(ticket => ({
               message: `Ticket #${ticket.id} ${ticket.status === 'closed' ? 'cerrado' : 'actualizado'} por ${ticket.user.name}`,
               timestamp: ticket.updated_at
          }))
          projects.value = data.data.active_projects.map(p => ({
               ...p,
               ticketCount: p.tickets_count
          }))
     } catch (error) {
          toast.error(error.message || 'Error cargando el dashboard.')
     } finally {
          loading.hide()
     }
})
</script>
