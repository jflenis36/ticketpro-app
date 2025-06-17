<template>
     <div class="p-6 min-h-screen bg-gray-50">
          <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">

               <!-- Encabezado -->
               <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                         <h1 class="text-2xl font-bold text-blue-600">🎟️ Lista de Tickets</h1>
                         <p class="text-sm text-gray-500">Filtra por prioridad, estado, categoría, fecha o texto</p>
                    </div>
                    <button @click="goToCreate"
                         class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow mt-3 md:mt-0">
                         + Crear Ticket
                    </button>
               </div>

               <!-- Contenedor de filtros -->
               <div class="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                         <!-- Buscar -->
                         <div>
                              <label class="block text-xs text-gray-500 mb-1">Buscar</label>
                              <input v-model="filters.q" type="text" placeholder="🔍 Título o descripción"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-100"
                                   @input="fetchTickets" />
                         </div>

                         <!-- Estado -->
                         <div>
                              <label class="block text-xs text-gray-500 mb-1">Estado</label>
                              <select v-model="filters.status"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-100"
                                   @change="fetchTickets">
                                   <option value="">📄 Todos</option>
                                   <option value="open">Abierto</option>
                                   <option value="in_progress">En progreso</option>
                                   <option value="closed">Cerrado</option>
                              </select>
                         </div>

                         <!-- Prioridad -->
                         <div>
                              <label class="block text-xs text-gray-500 mb-1">Prioridad</label>
                              <select v-model="filters.priority"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-100"
                                   @change="fetchTickets">
                                   <option value="">⚡ Todas</option>
                                   <option value="high">Alta</option>
                                   <option value="medium">Media</option>
                                   <option value="low">Baja</option>
                              </select>
                         </div>

                         <!-- Categoría -->
                         <!-- <div>
                              <label class="block text-xs text-gray-500 mb-1">Categoría</label>
                              <select v-model="filters.category_id"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-100"
                                   @change="fetchTickets">
                                   <option value="">🏷️ Todas</option>
                                   <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                        {{ cat.name }}
                                   </option>
                              </select>
                         </div> -->

                         <!-- Fecha desde -->
                         <div>
                              <label class="block text-xs text-gray-500 mb-1">Desde</label>
                              <input type="date" v-model="filters.from"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-100"
                                   @change="fetchTickets" />
                         </div>

                         <!-- Fecha hasta -->
                         <div>
                              <label class="block text-xs text-gray-500 mb-1">Hasta</label>
                              <input type="date" v-model="filters.to"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-100"
                                   @change="fetchTickets" />
                         </div>
                    </div>
               </div>


               <!-- Tabla -->
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
                                             'text-red-600 font-semibold': ticket.priority === 'high',
                                             'text-yellow-600 font-semibold': ticket.priority === 'medium',
                                             'text-green-600 font-semibold': ticket.priority === 'low'
                                        }" class="capitalize">
                                             {{ ticket.priority === 'high' ? 'Alta' : (ticket.priority === 'low' ?
                                                  'Baja' : 'Media') }}
                                        </span>
                                   </td>
                                   <td class="px-4 py-3 capitalize font-medium text-gray-700">
                                        <span :class="{
                                             'text-green-400': ticket.status === 'open',
                                             'text-black-400': ticket.status === 'closed',
                                             'text-orange-400': ticket.status === 'in_progress'
                                        }">
                                             {{ ticket.status === 'closed' ? 'Cerrado' : (ticket.status ===
                                                  'in_progress' ? 'En progreso' : 'Abierto') }}
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

                    <Pagination :pagination="paginate" :onPageChange="handlePageChange" />

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
import Pagination from '../../components/shared/Pagination.vue'

const router = useRouter()
const tickets = ref([])
const paginate = ref({
  total: 0,
  per_page: 10,
  links: [],
  current_page: 1,
})
const toast = useToast()
const loading = useLoadingStore()

const filters = ref({
     q: '',
     status: '',
     priority: '',
     category_id: null,
     from: '',
     to: '',
     sort_by: '',
     sort_order: '',
     per_page: '',
     page: 1
})

function cleanedFilters() {
     const cleanedFilters = {};

     for (const key in filters.value) {
          const value = filters.value[key];
          if (value !== '' && value !== null && value !== undefined) {
               cleanedFilters[key] = value;
          }
     }

     return cleanedFilters;
}

const handlePageChange = async (page) => {
     filters.value.page = page
     await fetchTickets()
}

const fetchTickets = async () => {
     try {
          loading.show('Cargando tickets...')
          const response = await getAllTickets(cleanedFilters())
          const { data, ...pagination } = response.data.data
          tickets.value = data
          paginate.value = pagination
     } catch (error) {
          toast.error(error.message || 'Error al cargar los tickets.')
     } finally {
          loading.hide()
     }
}

const editTicket = (id) => router.push(`/tickets/${id}/edit`)
const goToCreate = () => router.push('/tickets/create')
const viewTicket = (id) => router.push(`/tickets/${id}`)

onMounted(fetchTickets)
</script>
