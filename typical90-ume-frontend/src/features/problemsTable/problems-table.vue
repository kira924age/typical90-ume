<script setup lang="ts">
import { computed, ref } from 'vue'
import { VTextField, VIcon, VTooltip, VSwitch } from 'vuetify/components'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { mdiSync, mdiYoutube, mdiTwitter } from '@mdi/js'

import useSWRV from 'swrv'

import problems from '../../assets/problems.json'
import submission from './submission.json'
import { problemTableCache, setHasClicked } from './cache'
import { useLocalStorage } from '@/composables/use-local-storage'

const [isHideAC] = useLocalStorage('isHideAC', false)

// const loading = ref(false)
const hasClicked2 = ref(problemTableCache.hasClicked)

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

const displayProblems = computed(() => {
  return isHideAC.value ? problems.filter((problem) => !mp?.value?.get(problem.id)) ?? [] : problems
})
const isAC = (problemId: string) => {
  return mp.value?.get(problemId) ? 'ac' : 'no'
}

const BASE_URL = 'https://atcoder.jp/contests/typical90/tasks/'

// type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }
const sortBy = ref([{ key: 'star', order: 'asc' }])
const headers = [
  {
    title: '星',
    align: 'center',
    key: 'star',
    width: '72px'
  },
  {
    title: '問題名',
    key: 'title',
    sortable: false
  },
  {
    title: '解説',
    align: 'center',
    key: 'editorial',
    sortable: false,
    width: '68px'
  }
]

const getLink = computed(() => {
  return (id: string) => `${BASE_URL}${id}`
})
const getStarClass = computed(() => {
  return (star: string) => `star-${star}`
})

// TODO: O(n^2) -> O(n)
const getTwitterLink = computed(() => {
  return (id: string) => problems.find((problem) => problem.id === id)?.twitter ?? ''
})
const getYouTubeLink = computed(() => {
  return (id: string) => problems.find((problem) => problem.id === id)?.youtube ?? ''
})
</script>

<template>
  <div class="atcoder-input-field">
    <div class="form-label">AtCoder ID:</div>
    <v-text-field
      density="compact"
      variant="solo-filled"
      label="AtCoder ID"
      single-line
      hide-details
    >
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
  <div class="hide-ac-switch">
    <v-switch
      v-model="isHideAC"
      label="Hide Completed Problems"
      color="indigo"
      hide-details
    ></v-switch>
  </div>

  <v-data-table
    v-model:sort-by="sortBy"
    :headers="headers"
    :items="displayProblems"
    :items-per-page="-1"
    class="elevation-1"
  >
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

    <template #[`item.editorial`]="{ item }">
      <div class="editorial-cell" :class="isAC(item.value)">
        <a :href="getTwitterLink(item.value)" target="_blank" rel="noopener noreferrer">
          <v-icon size="large" class="twitter-icon">
            {{ mdiTwitter }}
          </v-icon>
        </a>
        <a :href="getYouTubeLink(item.value)" target="_blank" rel="noopener noreferrer">
          <v-icon size="large" class="youtube-icon">
            {{ mdiYoutube }}
          </v-icon>
        </a>
      </div>
    </template>
  </v-data-table>
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
  // padding-right: 16px;
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

::v-deep(tr) {
  height: 42px !important;
}
::v-deep(th) {
  height: 42px !important;
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

.hide-ac-switch {
  display: inline-flex;
}

.editorial-cell {
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  &.ac {
    background: #c3e6bd !important;
  }
}
.dark .editorial-cell.ac {
  background: #004e06 !important;
}

.youtube-icon {
  color: #ff0000;
  cursor: pointer;
}
.twitter-icon {
  color: #1da1f2;
  cursor: pointer;
}
</style>
