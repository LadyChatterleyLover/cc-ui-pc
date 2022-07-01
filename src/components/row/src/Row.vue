<template>
  <component
    :is="tag"
    class="flex w-full"
    :style="{
      'margin-left': margin,
      'margin-right': margin,
      'justify-content': justifyValue
    }"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import type { JustifyProps } from '@/types'

const props = withDefaults(
  defineProps<{
    gutter?: number | string
    tag?: string
    justify?: JustifyProps
  }>(),
  {
    gutter: 0,
    tag: 'div',
    justify: 'start'
  }
)

const margin = computed(() => {
  if (props.gutter) {
    return '-' + (props.gutter as number) / 2 + 'px'
  }
  return 0
})
const justifyValue = computed(() => {
  if (props.justify === 'start') return 'flex-start'
  else if (props.justify === 'end') return 'flex-end'
  else return props.justify
})

provide(
  'gutter',
  computed(() => props.gutter)
)
</script>

<style scoped lang="scss"></style>
