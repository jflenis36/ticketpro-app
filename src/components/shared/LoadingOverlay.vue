<template>
  <div v-if="isLoading" class="fixed inset-0 bg-black flex items-center justify-center z-50 opacity-loading">
    <span class="text-white text-xl font-semibold animate-pulse">{{ message }}</span>
  </div>
</template>

<style >
     .opacity-loading {
          opacity: 0.7;
     }
</style>

<script setup>
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '../../store/loadingStore'

const loadingStore = useLoadingStore()
const { isLoading, message } = storeToRefs(loadingStore)
</script>
