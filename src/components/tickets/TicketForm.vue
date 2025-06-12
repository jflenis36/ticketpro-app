<template>
     <form @submit.prevent="submit">
          <div class="mb-4">
               <label class="block mb-1 text-sm font-medium">Título</label>
               <input v-model="form.title" type="text" required class="w-full px-3 py-2 border rounded" />
          </div>

          <div class="mb-4">
               <label class="block mb-1 text-sm font-medium">Descripción</label>
               <textarea v-model="form.description" rows="4" required
                    class="w-full px-3 py-2 border rounded"></textarea>
          </div>

          <div class="mb-4">
               <label class="block mb-1 text-sm font-medium">Prioridad</label>
               <select v-model="form.priority" required class="w-full px-3 py-2 border rounded">
                    <option value="">Selecciona una</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
               </select>
          </div>

          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
               Crear Ticket
          </button>
     </form>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

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
