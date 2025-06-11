<template>
     <div class="p-6 space-y-8">

          <!-- Encabezado -->
          <DashboardHeader userName="Felipe" role="Admin" />

          <!-- Estadísticas rápidas -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               <StatCard label="Total de Tickets" :value="42">🗂</StatCard>
               <StatCard label="Abiertos" :value="12">📂</StatCard>
               <StatCard label="Cerrados" :value="20">✅</StatCard>
               <StatCard label="En Revisión" :value="10">🔎</StatCard>
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

const router = useRouter()

const recent = [
     { message: 'Ticket #123 actualizado por Camila', timestamp: '2025-06-10T18:30:00' },
     { message: 'Ticket #122 creado por Andrés', timestamp: '2025-06-09T10:45:00' }
]

const projects = [
     { id: 1, name: 'Proyecto A', description: 'Sistema de tickets para soporte', ticketCount: 12 },
     { id: 2, name: 'Proyecto B', description: 'Módulo de gestión de usuarios', ticketCount: 5 }
]

const systemNotes = [
     'Recuerda revisar los tickets urgentes antes del mediodía.',
     'El módulo de usuarios estará en mantenimiento el viernes.',
     'Verifica que los tickets cerrados estén correctamente documentados.'
]

const goToCreateTicket = () => router.push('/tickets/create')
const goToTicketList = () => router.push('/tickets')
const goToSettings = () => router.push('/admin/settings')
const goToProject = (projectId) => router.push(`/projects/${projectId}`)
</script>
