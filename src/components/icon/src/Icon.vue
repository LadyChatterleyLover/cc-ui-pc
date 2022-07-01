<template>
  <Icon :size="size" :color="color">
    <slot></slot>
  </Icon>
</template>

<script setup lang="ts">
import { Icon } from '@vicons/utils'

defineProps<{
  size?: number | string
  color?: string
}>()
</script>

<style scoped></style>
