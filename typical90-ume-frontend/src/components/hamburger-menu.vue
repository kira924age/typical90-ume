<script setup lang="ts">
import { defineProps } from 'vue'
import { VMenu, VList, VListItem, VListItemTitle } from 'vuetify/components'
import { useRouter } from 'vue-router'
import { mdiHome, mdiAccount, mdiInformationOutline, mdiBook } from '@mdi/js'

type Properties = {
  open: boolean
  toggleIsOpen: () => void
}

defineProps<Properties>()

const router = useRouter()
const items = [
  {
    title: 'Home',
    link: () => {
      router.push('/')
    },
    prependIcon: mdiHome
  },
  {
    title: 'User',
    link: () => {
      router.push('/user')
    },
    prependIcon: mdiAccount
  },
  {
    title: 'About',
    link: () => {
      router.push('/about')
    },
    prependIcon: mdiInformationOutline
  },
  {
    title: 'Ads',
    link: () => {
      router.push('/ads')
    },
    prependIcon: mdiBook
  }
]
</script>

<template>
  <button
    class="text-gray-500 w-14 h-14 relative focus:outline-none bg-transparent hover:bg-[#30363d] rounded-box sm:hidden"
    @click.stop="toggleIsOpen"
  >
    <span class="sr-only">Open main menu</span>
    <div class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span
        aria-hidden="true"
        class="block absolute h-0.5 w-5 bg-white transform transition duration-100 ease-in-out"
        :class="{ 'rotate-45': open, ' -translate-y-1.5': !open }"
      />
      <span
        aria-hidden="true"
        class="block absolute h-0.5 w-5 bg-white transform transition duration-100 ease-in-out"
        :class="{ 'opacity-0': open }"
      />
      <span
        aria-hidden="true"
        class="block absolute h-0.5 w-5 bg-white transform transition duration-100 ease-in-out"
        :class="{ '-rotate-45': open, ' translate-y-1.5': !open }"
      />
    </div>
    <v-menu activator="parent">
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          :prepend-icon="item.prependIcon"
          @click="item.link"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </button>
</template>
