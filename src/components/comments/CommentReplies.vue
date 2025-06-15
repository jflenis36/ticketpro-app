<template>
     <div class="space-y-4">
          <div v-for="reply in replies" :key="reply.id" class="mb-4 pl-6 border-l-2 border-blue-100">
               <div class="flex items-start gap-3">
                    <div class="pt-1 text-purple-500">↪️</div>
                    <div class="w-full">
                         <p class="font-semibold text-gray-800">Usuario {{ reply.user_id }}</p>
                         <p class="text-gray-700 text-sm">{{ reply.content }}</p>
                         <p class="text-xs text-gray-500 mt-1">{{ formatDate(reply.created_at) }}</p>
                    </div>
               </div>
          </div>

          <div v-if="replies.length === 0" class="text-gray-500 text-sm">
               No hay respuestas aún.
          </div>
     </div>
</template>

<script setup>
const props = defineProps({ replies: Array }) // ✅ SOLO esto

const formatDate = (d) =>
     new Date(d).toLocaleString('es-CO', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
     })
</script>
