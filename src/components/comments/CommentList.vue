<template>
     <div>
          <h3 class="font-semibold mb-4 text-lg">Comentarios</h3>
          <div v-if="comments.length === 0" class="text-gray-500">No hay comentarios aún.</div>

          <CommentItem v-for="c in comments" :key="c.id" :comment="c" />
     </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
     comments: {
          type: Array,
          default: () => []
     }
})
</script>
