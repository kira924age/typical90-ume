<script setup lang="ts">
import { VTextField, VIcon, VSwitch } from 'vuetify/components'
import { mdiSync, mdiArrowDown, mdiArrowUp } from '@mdi/js'

import { useLocalStorage } from '@/composables/use-local-storage'
import { useSubmissions } from '@/composables/use-submissions'
import { useProblems } from '@/composables/use-problems'
import { useDisplayProblems } from '@/features/problemsTable/composables/use-display-problems'
import { useSortProblems } from '@/features/problemsTable/composables/use-sort-problems'

const [isHideAC] = useLocalStorage('isHideAC', false)
const [isShowEditorialLink] = useLocalStorage('isShowEditorialLink', false)

const { getProblemLink, getStarClass, getGitHubLink, getYouTubeLink } = useProblems()

const [userId] = useLocalStorage('userId', '')
const [hasClicked, setHasClicked] = useLocalStorage('hasClicked', false)
const { getSubmissionStatusClass, submissionStatusMap } = useSubmissions(userId, hasClicked)

const { sortState, sortProblems } = useSortProblems()
const { displayProblems } = useDisplayProblems(isHideAC, sortState, submissionStatusMap)

const handleInput = () => {
  setHasClicked(false)
}
const handleSubmissionFetchButtonClick = () => {
  if (userId.value !== '') {
    setHasClicked(true)
  }
}
</script>

<template>
  <div class="atcoder-input-field">
    <v-text-field
      v-model="userId"
      density="compact"
      variant="solo-filled"
      label="AtCoder ID"
      single-line
      hide-details
      flat
      @keyup.enter="handleSubmissionFetchButtonClick"
      @input="handleInput"
    >
      <template #append-inner>
        <v-icon @click="handleSubmissionFetchButtonClick">
          {{ mdiSync }}
        </v-icon>
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
    <table>
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
        <tr
          v-for="problem in displayProblems"
          :key="problem.id"
          :class="getSubmissionStatusClass(problem.id)"
        >
          <td :class="getStarClass(problem.star)">{{ problem.star }}</td>
          <td :class="`title-${getStarClass(problem.star)}`">
            <a :href="getProblemLink(problem.id)" target="_blank" rel="noopener noreferrer">{{
              problem.title
            }}</a>
          </td>
          <td v-show="isShowEditorialLink">
            <div class="editorial-icons">
              <a :href="getGitHubLink(problem.id)" target="_blank" rel="noopener noreferrer">
                <img src="@/assets/github-icon.png" width="24" height="24" />
              </a>
              <a :href="getYouTubeLink(problem.id)" target="_blank" rel="noopener noreferrer">
                <img src="@/assets/youtube-icon.png" width="24" height="24" />
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
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

a {
  text-decoration: none;
  color: black;
  .dark & {
    color: white;
  }
}

.problem-table-wrapper {
  padding-top: 16px;
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
  background: #c0c000;
}

.atcoder-input-field {
  display: flex;
  padding-bottom: 16px;
}

.hide-ac-switch {
  display: inline-flex;
  min-width: 275px;
}
.show-editorials-switch {
  display: inline-flex;
  min-width: 245px;
}

.editorial-icons {
  display: flex;
  height: 24px;
  justify-content: space-evenly;
}
</style>
