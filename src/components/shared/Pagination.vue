<template>
     <nav class="flex justify-center mt-6" v-if="pagination?.links?.length">
          <ul class="inline-flex items-center space-x-1 text-sm">
               <li>
                    <button :disabled="!pagination.prev_page_url" @click="changePage(pagination.current_page - 1)"
                         class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                         « Anterior
                    </button>
               </li>

               <li v-for="link in visibleLinks" :key="link.label">
                    <button v-if="link.url" :class="[
                         'px-3 py-1 rounded border border-gray-300',
                         link.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                    ]" @click="changePage(getPageFromUrl(link.url))" v-html="link.label" />
               </li>

               <li>
                    <button :disabled="!pagination.next_page_url" @click="changePage(pagination.current_page + 1)"
                         class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                         Siguiente »
                    </button>
               </li>
          </ul>
     </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
     pagination: Object,
     onPageChange: Function
})

const changePage = (page) => {
     if (page && page !== props.pagination.current_page) {
          props.onPageChange(page)
     }
}

const getPageFromUrl = (url) => {
     const params = new URLSearchParams(url.split('?')[1])
     return parseInt(params.get('page'))
}

const visibleLinks = computed(() => {
     return props.pagination.links.filter(
          (l) => l.label !== "&laquo; Previous" && l.label !== "Next &raquo;"
     )
})
</script>
