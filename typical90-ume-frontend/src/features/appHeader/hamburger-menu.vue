<script setup lang="ts">
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
  <button class="hamburger-button" @click.stop="toggleIsOpen">
    <div class="hamburger-button-container" :class="{ open: open, 'not-open': !open }">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
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

<style scoped lang="scss">
.hamburger-button {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  background: transparent;
  color: rgb(107 114 128);
  border-radius: 0.375rem;

  &:hover {
    background: #30363d;
  }

  @media (min-width: 640px) {
    display: none;
  }
}

.hamburger-button-container {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1.25rem;
  transform: translateX(-50%) translateY(-50%) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);

  > span {
    display: block;
    position: absolute;
    height: 0.125rem;
    width: 1.25rem;
    background-color: white;
    transition-property: all;
    transition-timing-function: ease-in-out;
    transition-duration: 100ms;
  }

  &.open {
    > span:nth-child(1) {
      transform: rotate(45deg);
    }
    > span:nth-child(2) {
      background: silver;
      opacity: 0;
    }
    > span:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
  &.not-open {
    > span:nth-child(1) {
      transform: translateY(-0.375rem);
    }
    > span:nth-child(3) {
      transform: rotate(-45deg);
      transform: translateY(0.375rem);
    }
  }
}
</style>
