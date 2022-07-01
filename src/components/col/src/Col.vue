<template>
  <component
    class="w-full"
    :is="tag"
    :style="{
      width,
      'margin-left': offset,
      'padding-left': padding,
      'padding-right': padding
    }"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

const gutter = inject('gutter')

const props = withDefaults(
  defineProps<{
    span?: number | string
    offset?: number | string
    tag?: string
  }>(),
  {
    span: '',
    offset: '',
    tag: 'div'
  }
)

const width = computed(() => {
  return ((props.span as number) / 24) * 100 === 0
    ? '100%'
    : ((props.span as number) / 24) * 100 + '%'
})
// 计算传了gutter的padding值
const padding = computed(() => {
  if (gutter) {
    return (gutter as number) / 2 + 'px'
  }
  return 0
})
// 计算偏移量
const offset = computed(() => {
  if (props.offset) {
    return ((props.offset as number) / 24) * 100 + '%'
  }
  return 0
})
</script>

<style scoped></style>
