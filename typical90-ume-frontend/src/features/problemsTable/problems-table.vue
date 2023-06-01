<script setup lang="ts">
import { computed, ref } from 'vue'
import { VTextField, VIcon, VTooltip } from 'vuetify/components'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { mdiSync } from '@mdi/js'
import useSWRV from 'swrv'

import problems from '../../assets/problems.json'
import submission from './submission.json'
import { hasClicked, setHasClicked } from './cache'

// const loading = ref(false)
const hasClicked2 = ref(hasClicked)

const sleep = (waitSeconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, waitSeconds * 1000)
  })
}
const FakeAPI = async () => {
  const result = await sleep(0.1).then(() => {
    return submission
  })
  return result
}
const { data } = useSWRV(() => (hasClicked2.value ? '/api/data' : undefined), FakeAPI)

const onClick = () => {
  hasClicked2.value = true
  setHasClicked(true)
}

// const loaded = ref(false)
const mp = computed(() => {
  const result = new Map()
  if (!data.value) {
    return
  }
  for (const submission of data.value) {
    const problemId = submission.problem_id
    if (submission.result === 'AC') {
      result.set(problemId, true)
    }
  }
  return result
})

const isAC = (problemId: string) => {
  return mp.value?.get(problemId) ? 'ac' : 'no'
}

const BASE_URL = 'https://atcoder.jp/contests/typical90/tasks/'
const headers = [
  {
    title: '星',
    align: 'center',
    key: 'star',
    width: '68px'
  },
  {
    title: '問題名',
    key: 'title',
    sortable: false
  }
]

const getLink = computed(() => {
  return (id: string) => `${BASE_URL}${id}`
})

const getStarClass = computed(() => {
  return (star: string) => `star-${star}`
})
</script>

<template>
  <div class="atcoder-input-field">
    <div class="form-label">AtCoder ID:</div>
    <v-text-field density="compact" variant="solo" label="AtCoder ID" single-line hide-details>
      <template #append-inner>
        <v-tooltip location="bottom" text="Fetch submissions">
          <template #activator="{ props }">
            <v-icon v-bind="props" class="fetch-icon" @click="onClick">
              {{ mdiSync }}
            </v-icon>
          </template>
        </v-tooltip>
      </template>
    </v-text-field>
  </div>

  <v-data-table :headers="headers" :items="problems" :items-per-page="-1" class="elevation-1">
    <template #[`item.star`]="{ item }">
      <div class="parent-of-star-cell" :class="getStarClass(item.columns.star)">
        <div class="star-cell">
          {{ item.columns.star }}
        </div>
      </div>
    </template>
    <template #[`item.title`]="{ item }">
      <div class="problem-link" :class="isAC(item.value)">
        <a :href="getLink(item.value)" target="_blank" rel="noopener noreferrer">
          {{ item.columns.title }}
        </a>
      </div>
    </template>
  </v-data-table>
  <!--
  <v-data-table :headers="headers" :items="problems" :items-per-page="-1" class="elevation-1">
    <template #[`item.star`]="{ item }">
      <div class="parent-of-star-cell" :class="getStarClass(item.columns.star)">
        <div class="star-cell">
          {{ item.columns.star }}
        </div>
      </div>
    </template>
    <template #[`item.title`]="{ item }">
      <div class="problem-link" :class="f(item.value)">
        <a :href="getLink(item.value)" target="_blank" rel="noopener noreferrer">
          {{ item.columns.title }}
        </a>
      </div>
    </template>
  </v-data-table>
  -->
</template>

<style lang="scss" scoped>
::v-deep(.v-data-table-footer) {
  display: none;
}

.problem-link {
  height: 100%;
  width: 100%;

  line-height: 42px;

  padding-left: 16px;
  padding-right: 16px;
  &.ac {
    background: #c3e6bd !important;
  }
}

.dark .problem-link.ac {
  background: #004e06 !important;
}

.problem-link a:hover {
  color: #2f81f7;
  text-decoration: underline;
}

::v-deep(.v-data-table__tr td) {
  padding: 0 !important;
  height: 42px !important;
}

.parent-of-star-cell {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.star-cell {
  text-align: center;
  justify-content: center;
}

.star-2 {
  background: silver;
}

.star-3 {
  background: #b08c56;
}

.star-4 {
  background: #3faf3f;
}

.star-5 {
  background: #00c0c0;
}

.star-6 {
  background: #88f;
}

.star-7 {
  background: rgb(192, 192, 0);
}

.dark .parent-of-star-cell {
  opacity: 0.8;
}

::v-deep(.v-data-table-header__content) {
  user-select: text;
  font-weight: 500;
}

.fetch-icon {
  cursor: pointer;
}

.atcoder-input-field {
  display: flex;
}

.form-label {
  line-height: 40px;
  padding-right: 8px;
}
</style>
