<script setup lang="ts">
import { computed, ref } from 'vue'
import { VTextField, VIcon, VTooltip, VSwitch } from 'vuetify/components'
import { mdiSync, mdiYoutube, mdiTwitter, mdiArrowDown, mdiArrowUp } from '@mdi/js'

import useSWRV from 'swrv'

import problems from '../../assets/problems.json'
import submission from './submission.json'
import { problemTableCache, setHasClicked } from './cache'
import { useLocalStorage } from '@/composables/use-local-storage'

const [isHideAC] = useLocalStorage('isHideAC', false)
const [sortState, setSortState] = useLocalStorage('sortState', 0)
const [isShowEditorialLink] = useLocalStorage('isShowEditorialLink', false)

const sortProblems = () => {
  setSortState((sortState.value + 1) % 3)
}

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
  if (sortState.value === 0) {
    return (
      isHideAC.value ? problems.filter((problem) => !mp?.value?.get(problem.id)) ?? [] : problems
    ).sort((a, b) => {
      return Number(a.problem_index) - Number(b.problem_index)
    })
  }
  if (sortState.value === 1) {
    return (
      isHideAC.value ? problems.filter((problem) => !mp?.value?.get(problem.id)) ?? [] : problems
    ).sort((a, b) => {
      return Number(a.star) - Number(b.star)
    })
  }
  return (
    isHideAC.value ? problems.filter((problem) => !mp?.value?.get(problem.id)) ?? [] : problems
  ).sort((a, b) => {
    return Number(b.star) - Number(a.star)
  })
})

const isAC = (problemId: string) => {
  return mp.value?.get(problemId) ? 'ac' : 'no'
}

const BASE_URL = 'https://atcoder.jp/contests/typical90/tasks/'

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
      density="compact"
    ></v-switch>
  </div>
  <div class="show-editorials-switch">
    <v-switch
      v-model="isShowEditorialLink"
      label="Show Editorial Links"
      color="indigo"
      hide-details
      density="compact"
    ></v-switch>
  </div>

  <div class="problem-table-wrapper">
    <table class="problem-table">
      <thead>
        <tr>
          <th @click="sortProblems">
            <div>
              <span>星</span>
              <v-icon v-if="sortState === 1">
                {{ mdiArrowUp }}
              </v-icon>
              <v-icon v-if="sortState === 2">
                {{ mdiArrowDown }}
              </v-icon>
            </div>
          </th>
          <th>問題名</th>
          <th v-show="isShowEditorialLink">解説</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="problem in displayProblems" :key="problem.id" :class="isAC(problem.id)">
          <td :class="getStarClass(problem.star)">{{ problem.star }}</td>
          <td>
            <a :href="getLink(problem.id)" target="_blank" rel="noopener noreferrer">{{
              problem.title
            }}</a>
          </td>
          <td v-show="isShowEditorialLink">
            <a :href="getTwitterLink(problem.id)" target="_blank" rel="noopener noreferrer">
              <v-icon size="large" class="twitter-icon">
                {{ mdiTwitter }}
              </v-icon>
            </a>
            <a :href="getYouTubeLink(problem.id)" target="_blank" rel="noopener noreferrer">
              <v-icon size="large" class="youtube-icon">
                {{ mdiYoutube }}
              </v-icon>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.problem-table-wrapper {
  padding-top: 16px;
}

.problem-table {
  width: 100%;

  .dark & {
    background: #212121;
    & td:nth-child(1) {
      opacity: 0.8;
    }
  }

  th:nth-child(1) div {
    cursor: pointer;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  td,
  th {
    height: 42px;
  }

  table,
  td,
  th {
    border: 1px solid gray;
    text-align: center;
  }

  & td:nth-child(1) {
    color: black;
    width: 72px;
  }
  & td:nth-child(2) {
    text-align: left;
    padding-left: 16px;
    a:hover {
      color: #2f81f7;
      text-decoration: underline;
    }
  }
  & td:nth-child(3) {
    width: 68px;
  }

  & .ac td:nth-child(n + 2) {
    background: #c3e6bd;
  }
  .dark & .ac td:nth-child(n + 2) {
    background: #004e06;
  }
}

// end here
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

.fetch-icon {
  cursor: pointer;
}

.atcoder-input-field {
  display: flex;
  padding-bottom: 16px;
}

.form-label {
  line-height: 40px;
  padding-right: 8px;
}

.hide-ac-switch {
  display: inline-flex;
  min-width: 275px;
  padding-left: 16px;
}
.show-editorials-switch {
  display: inline-flex;
  min-width: 245px;
  padding-left: 16px;
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

.youtube-icon {
  color: #ff0000;
  cursor: pointer;
}
.twitter-icon {
  color: #1da1f2;
  cursor: pointer;
}
</style>
