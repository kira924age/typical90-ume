<script setup lang="ts">
import { VTextField, VIcon } from 'vuetify/components'
import { mdiSync } from '@mdi/js'

import DifficultyPieChart from '@/features/userStatus/components/difficulty-pie-chart.vue'
import ClimbingChart from '@/features/userStatus/components/climbing-chart.vue'
import { useSubmissions } from '@/composables/use-submissions'

const { handleSubmissionFetchButtonClick, getAcCount, submissions } = useSubmissions()
</script>

<template>
  <v-text-field
    class="atcoder-id-input"
    density="compact"
    variant="solo-filled"
    label="AtCoder ID"
    single-line
    hide-details
    flat
  >
    <template #append-inner>
      <v-icon @click="handleSubmissionFetchButtonClick">
        {{ mdiSync }}
      </v-icon>
    </template>
  </v-text-field>

  <div class="user-heading-wrapper">
    <div class="user-heading">Pie Charts</div>
  </div>

  <div class="status-pie-charts-container">
    <div v-for="n in 6" :key="n">
      <DifficultyPieChart :star="n + 1" class="status-pie-chart" :ac="getAcCount(n + 1)" />
    </div>
  </div>

  <div class="user-heading-wrapper">
    <div class="user-heading">Climbing</div>
  </div>

  <div class="climbing-chart-container">
    <ClimbingChart :submissions="submissions" />
  </div>
</template>

<style scoped lang="scss">
.user-heading-wrapper {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.user-heading {
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.2;
}

.atcoder-id-input {
  margin-bottom: 1.5rem;
}

.status-pie-chart {
  margin-bottom: 2.5rem;
}

.status-pie-charts-container {
  padding-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.climbing-chart-container {
  padding-top: 2rem;
}
</style>
