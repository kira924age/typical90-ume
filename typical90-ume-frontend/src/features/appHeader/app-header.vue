<script setup lang="ts">
import AppHeaderMenu from '@/features/appHeader/app-header-menu.vue'
import ThemeToggleButton from '@/features/appHeader/theme-toggle-button.vue'
import HamburgerMenu from '@/features/appHeader/hamburger-menu.vue'
import useNavigationItem from '@/features/appHeader/composables/use-navigation-item'
import useOpen from '@/features/appHeader/composables/use-open'

const { isHome, isUser, isAbout, isAds, goToHome, goToUser, goToAbout, goToAds } =
  useNavigationItem()
const { isOpen, toggleIsOpen, setIsOpen } = useOpen()
</script>

<template>
  <header>
    <nav class="navigation-bar">
      <div class="navigation-item-container">
        <div class="navbar-brand" @click="goToHome">
          <span>Typical90 Ume</span>
        </div>
        <div class="navigation-items">
          <ul>
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
        <div class="navigation-buttons">
          <ThemeToggleButton />
          <HamburgerMenu :open="isOpen" :toggle-is-open="toggleIsOpen" @blur="setIsOpen(false)" />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.navigation-bar {
  position: fixed;
  width: 100%;
  background: #242526;
  border-color: #e5e7eb;
  height: 3.5rem;
  z-index: 999;
}

.navigation-item-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  max-width: 1280px;
  height: 100%;
}

.navbar-brand {
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;

  > span {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
    white-space: nowrap;
    color: white;
  }
}

.navigation-items {
  justify-content: space-between;
  align-items: center;
  height: 100%;
  display: flex;
  width: auto;
  order: 1;

  @media (max-width: 639px) {
    display: none;
  }

  > ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: 500;
  }
}

.navigation-buttons {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  order: 2;
}
</style>
