<script setup lang="ts">
import { ref, computed } from 'vue'
import { VPagination } from 'vuetify/components'
import type Submission from '@/types/submission'
import { formatFullDate } from '@/utils/format-date'
import problems from '@/assets/problems.json'

const properties = defineProps<{
  submissions?: Submission[] | undefined
}>()

const problemTitle = computed(() => {
  return (problemId: string) => {
    const problem = problems.find((p) => p.id === problemId)
    return problem ? problem.title : problemId
  }
})
const problemLink = computed(() => {
  return (problemId: string) => {
    return `https://atcoder.jp/contests/typical90/tasks/${problemId}`
  }
})
const userLink = computed(() => {
  return (userId: string) => {
    return `https://atcoder.jp/users/${userId}`
  }
})
const submissionLink = computed(() => {
  return (submissionId: number) => {
    return `https://atcoder.jp/contests/typical90/submissions/${String(submissionId)}`
  }
})
const paginationLength = computed(() => {
  if (!properties.submissions) return 0
  return (properties.submissions.length + 19) / 20
})

const page = ref(1)
const displaySubmissions = computed(() => {
  if (!properties.submissions) return []
  const head = (page.value - 1) * 20
  const tail = page.value * 20
  return properties.submissions.slice(head, tail)
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Problem</th>
        <th>User</th>
        <th>Status</th>
        <th>Language</th>
        <th>Detail</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="submission in displaySubmissions" :key="submission.id">
        <td>{{ formatFullDate(submission.epoch_second) }}</td>
        <td>
          <a :href="problemLink(submission.problem_id)" target="_blank" rel="noopener noreferrer">{{
            problemTitle(submission.problem_id)
          }}</a>
        </td>
        <td>
          <a :href="userLink(submission.user_id)" target="_blank" rel="noopener noreferrer">{{
            submission.user_id
          }}</a>
        </td>
        <td>{{ submission.result }}</td>
        <td>{{ submission.language }}</td>
        <td>
          <a :href="submissionLink(submission.id)" target="_blank" rel="noopener noreferrer">
            Detail
          </a>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="pagination-wrapper">
    <v-pagination
      v-model="page"
      active-color="indigo"
      :border="true"
      :length="paginationLength"
      :total-visible="6"
      density="compact"
    ></v-pagination>
  </div>
</template>

<style scoped lang="scss">
table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  word-break: break-all;

  .dark & {
    background: #212121;
  }

  td,
  th {
    height: 42px;
  }

  table,
  td,
  th {
    border: 1px solid gray;
    text-align: left;
    padding: 12px;
  }

  tbody > tr {
    td:nth-child(4) {
      text-align: center;
    }
  }
  thead > tr {
    th:nth-child(4) {
      text-align: center;
    }
  }

  a {
    text-decoration: none;
    color: black;
    .dark & {
      color: white;
    }
    &:hover {
      color: #2f81f7;
      text-decoration: underline;
    }
  }
}
.pagination-wrapper {
  padding-top: 12px;
}
</style>
