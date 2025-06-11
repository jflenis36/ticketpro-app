<template>
     <div class="bg-white shadow rounded-lg p-4 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
          @click="$emit('open-project', project.id)">
          <h4 class="text-lg font-semibold text-gray-800 truncate">
               {{ project.name }}
          </h4>

          <p class="text-sm text-gray-500 mt-1">
               {{ project.description }}
          </p>

          <div class="mt-3 text-sm text-gray-600">
               Tickets: <span class="font-medium">{{ project.ticketCount }}</span>
          </div>
     </div>
</template>

<script setup>
defineProps({
     project: {
          type: Object,
          required: true
     }
})

defineEmits(['open-project'])
</script>
