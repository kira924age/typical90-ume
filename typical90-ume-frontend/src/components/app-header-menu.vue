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
    class="h-full flex px-5 text-gray-400 rounded bg-primary-700 hover:bg-[#30363d] lg:bg-transparent lg:text-primary-700 cursor-pointer"
    :class="{ 'text-white font-semibold': isActive }"
    @click="properties.navigateFunction"
  >
    <span class="m-auto">
      {{ properties.menuName }}
    </span>
  </div>
</template>
