<script setup lang="ts">
type Properties = {
  isActive: boolean
  menuName: string
  navigateFunction: () => void
}

const properties = defineProps<Properties>()
</script>

<template>
  <div
    class="header-menu"
    :class="{ active: properties.isActive }"
    @click="properties.navigateFunction"
  >
    <span>{{ properties.menuName }}</span>
  </div>
</template>

<style scoped lang="scss">
.header-menu {
  display: flex;
  height: 100%;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 0.25rem;

  color: rgb(156 163 175);
  cursor: pointer;

  &:hover {
    background-color: #30363d;
  }

  > span {
    margin: auto;
  }
}

.active {
  color: white;
  font-weight: 600;
}
</style>
