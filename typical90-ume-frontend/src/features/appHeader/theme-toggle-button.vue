<script setup lang="ts">
import { computed } from 'vue'
import useMyTheme from '@/composables/theme'

const { theme, toggleTheme } = useMyTheme()
const isDark = computed(() => {
  return theme.global.current.value.dark
})
const isLight = computed(() => {
  return !theme.global.current.value.dark
})
</script>

<template>
  <button type="button" class="theme-toggle-button" @click="toggleTheme">
    <svg v-show="isLight" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
    <svg v-show="isDark" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>

<style scoped lang="scss">
.theme-toggle-button {
  align-items: center;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(156 163 175);
  width: 40px;
  height: 40px;
  padding: 0.625rem;

  &:hover {
    background-color: #30363d;
  }

  > svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
