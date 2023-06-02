<script setup lang="ts">
import AppHeader from './components/app-header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <main class="max-w-screen-xl mx-auto">
    <div class="py-12 mx-4">
      <RouterView />
    </div>
  </main>
</template>
