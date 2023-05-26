<script setup lang="ts">
import AppHeaderMenu from '@/components/app-header-menu.vue'
import ThemeToggleButton from '@/components/theme-toggle-button.vue'
import HamburgerMenu from '@/components/hamburger-menu.vue'

import useNavigationItem from '@/composables/use-navigation-item'
import useOpen from '@/composables/use-open'
const { isHome, isUser, isAbout, isAds, goToHome, goToUser, goToAbout, goToAds } =
  useNavigationItem()
const { isOpen, toggleIsOpen, setIsOpen } = useOpen()
</script>

<template>
  <header>
    <nav class="bg-[#242526] border-gray-200 h-14">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl h-full">
        <div class="flex items-center cursor-pointer ml-4" @click="goToHome">
          <span class="self-center text-xl font-semibold whitespace-nowrap text-white"
            >Typical90 Ume</span
          >
        </div>
        <div class="hidden justify-between items-center w-full h-full sm:flex sm:w-auto sm:order-1">
          <ul class="h-full flex flex-row my-auto font-medium">
            <li>
              <AppHeaderMenu :is-active="isHome" menu-name="Home" :navigate-function="goToHome" />
            </li>
            <li>
              <AppHeaderMenu :is-active="isUser" menu-name="User" :navigate-function="goToUser" />
            </li>
            <li>
              <AppHeaderMenu
                :is-active="isAbout"
                menu-name="About"
                :navigate-function="goToAbout"
              />
            </li>
            <li>
              <AppHeaderMenu :is-active="isAds" menu-name="Ads" :navigate-function="goToAds" />
            </li>
          </ul>
        </div>
        <div class="flex items-center mr-4 sm:order-2">
          <ThemeToggleButton />
          <HamburgerMenu :open="isOpen" :toggle-is-open="toggleIsOpen" @blur="setIsOpen(false)" />
        </div>
      </div>
    </nav>
  </header>
</template>
