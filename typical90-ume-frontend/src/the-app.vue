<script setup lang="ts">
import AppHeader from './components/app-header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.container {
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
