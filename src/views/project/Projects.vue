<template>
     <div class="p-6 bg-gray-50 min-h-screen">
          <!-- Encabezado -->
          <div class="mb-6">
               <h1 class="text-3xl font-bold text-blue-700">📁 Sistema de Soporte Técnico</h1>
               <p class="text-gray-600 text-sm mt-1">
                    Este panel centraliza y gestiona todos los tickets de soporte técnico generados por los usuarios.
               </p>
          </div>

          <!-- Tarjeta de Resumen -->
          <div class="bg-white rounded-xl shadow p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6" v-if="project">
               <div>
                    <p class="text-sm text-gray-500">📄 Proyecto</p>
                    <p class="text-base font-semibold text-gray-700">{{ project.name }}</p>
               </div>
               <div>
                    <p class="text-sm text-gray-500">📅 Fecha de creación</p>
                    <p class="text-base font-semibold text-gray-700">{{ formatDate(project.created_at) }}</p>
               </div>
               <div>
                    <p class="text-sm text-gray-500">📌 Estado</p>
                    <span
                         class="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                         🟢 Activo
                    </span>
               </div>
          </div>

          <!-- Descripción -->
          <div class="bg-white rounded-xl shadow p-6 mb-6" v-if="project">
               <h2 class="text-lg font-bold text-blue-600 mb-2">📝 Descripción</h2>
               <p class="text-sm text-gray-700">
                    {{ project.description }}
               </p>
          </div>

          <!-- Tickets del Proyecto -->
          <div class="bg-white rounded-xl shadow p-6">
               <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold text-blue-600">🎟️ Tickets Asociados</h2>
                    <button @click="goToCreate"
                         class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow">
                         + Crear nuevo ticket
                    </button>
               </div>

               <table class="min-w-full text-sm text-left border-collapse">
                    <thead class="bg-blue-100 text-blue-900 uppercase text-xs font-bold">
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
                              :class="priorityColor(ticket.priority) + ' border-b hover:bg-gray-50 transition'">
                              <td class="px-4 py-3">{{ ticket.id }}</td>
                              <td class="px-4 py-3">{{ ticket.title }}</td>
                              <td class="px-4 py-3 capitalize font-semibold text-gray-700">
                                   {{ formatPriority(ticket.priority) }}
                              </td>
                              <td class="px-4 py-3">
                                   <span :class="statusBadge(ticket.status)">
                                        {{ formatStatus(ticket.status) }}
                                   </span>
                              </td>
                              <td class="px-4 py-3 text-center">
                                   <div class="flex justify-center gap-2">
                                        <button @click="viewTicket(ticket.id)"
                                             class="px-2 py-1 text-xs rounded-full border border-blue-600 text-blue-600 hover:bg-blue-100 transition">
                                             Ver
                                        </button>
                                        <button @click="editTicket(ticket.id)"
                                             class="px-2 py-1 text-xs rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-100 transition">
                                             Editar
                                        </button>
                                   </div>
                              </td>
                         </tr>
                    </tbody>
               </table>
          </div>
     </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getInformation } from '../../services/projectService'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const projectId = route.params.id

const project = ref(null)
const tickets = ref([])

onMounted(async () => {
     try {
          const response = await getInformation(projectId)
          project.value = response.data.data.project
          tickets.value = response.data.data.tickets
     } catch (error) {
          console.error('Error al obtener datos del proyecto:', error)
     }
})

const formatDate = (dateStr) => {
     if (!dateStr) return 'Sin fecha'
     const date = new Date(dateStr)
     return new Intl.DateTimeFormat('es-CO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
     }).format(date)
}

const formatPriority = (p) =>
     p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja'

const formatStatus = (s) => {
     if (s === 'open') return '🟢 Abierto'
     if (s === 'in_progress') return '🟡 En Progreso'
     return '🔴 Cerrado'
}

const priorityColor = (p) => {
     return {
          high: 'bg-red-50',
          medium: 'bg-yellow-50',
          low: 'bg-green-50',
     }[p] || ''
}

const statusBadge = (s) => {
     return {
          open:
               'bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full font-semibold inline-flex items-center gap-1',
          in_progress:
               'bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full font-semibold inline-flex items-center gap-1',
          closed:
               'bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-full font-semibold inline-flex items-center gap-1',
     }[s]
}

const editTicket = (id) => router.push(`/tickets/${id}/edit`)
const goToCreate = () => router.push('/tickets/create')
const viewTicket = (id) => router.push(`/tickets/${id}`)
</script>
