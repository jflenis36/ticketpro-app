<template>
     <div class="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
          <form @submit.prevent="submit" class="space-y-5">

               <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Título</label>
                    <input v-model="form.title" type="text" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                         placeholder="Escribe el título del ticket" />
               </div>

               <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
                    <textarea v-model="form.description" rows="4" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                         placeholder="Describe el problema o solicitud"></textarea>
               </div>

               <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Prioridad</label>
                    <select v-model="form.priority" required
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                         <option value="">Selecciona una opción</option>
                         <option value="alta">🔴 Alta</option>
                         <option value="media">🟠 Media</option>
                         <option value="baja">🟢 Baja</option>
                    </select>
               </div>

               <div class="pt-2">
                    <button type="submit"
                         class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                         ALmacenar Información
                    </button>
               </div>
          </form>
     </div>
</template>


<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
     modelValue: {
          type: Object,
          default: () => ({
               title: '',
               description: '',
               priority: ''
          })
     }
})

const form = reactive({ ...props.modelValue })

const submit = () => {
     emit('submit', { ...form })
}
</script>
