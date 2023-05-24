<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

import problems from '../../assets/problems.json'

const headers = [
  {
    title: '難易度',
    key: 'star'
  },
  {
    title: '問題名',
    key: 'name'
  }
]
</script>

<template>
  <v-data-table :headers="headers" :items="problems" class="elevation-1" />
</template>
