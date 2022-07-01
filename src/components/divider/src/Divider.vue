<template>
  <div
    class="flex items-center py-4 border-solid text-sm leading-6 cc-divider"
    :class="[
      ` ${contentPosition === 'left' ? 'cc-divider-left' : ''}`,
      `${contentPosition === 'right' ? 'cc-divider-right' : ''}`
    ]"
    :style="{
      ...style,
      borderStyle: dashed ? 'dashed' : 'solid',
      borderWidth: 0
    }"
  >
    <div class="flex-none px-4" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

withDefaults(
  defineProps<{
    contentPosition?: 'center' | 'left' | 'right'
    hairline?: boolean
    dashed?: boolean
    vertical?: boolean
    style?: CSSProperties
  }>(),
  {}
)
</script>

<style scoped lang="scss">
.cc-divider {
  color: '#969799';
  border-color: '#ebedf0';
  &::after,
  &::before {
    flex: auto;
    display: block;
    content: '';
    border-style: inherit;
    border-color: inherit;
    border-width: 1px 0 0;
  }
  &-left {
    &.cc-divider {
      &::before {
        max-width: 10%;
      }
    }
  }
  &-right {
    &.cc-divider {
      &::after {
        max-width: 10%;
      }
    }
  }
}
</style>
