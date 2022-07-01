<template>
  <div
    class="flex items-center w-fit"
    :style="{ flexDirection: vertical ? 'column' : 'row' }"
  >
    <cc-icon :size="size" :color="color" v-if="type === 'circle'">
      <Loading3QuartersOutlined class="cc-loading-icon-circle" />
    </cc-icon>
    <cc-icon :size="size" :color="color" v-else>
      <Spinner class="cc-loading-icon-spinner" />
    </cc-icon>
    <div
      :style="{ color: textColor, fontSize: textSize + 'px' }"
      class="h-full"
      :class="[`${!vertical ? 'cc-loading-icon-left' : 'cc-loading-icon-top'}`]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading3QuartersOutlined } from '@vicons/antd'
import { Spinner } from '@vicons/fa'

withDefaults(
  defineProps<{
    type?: 'circle' | 'spinner'
    color?: string
    size?: string | number
    textSize?: string | number
    textColor?: string
    vertical?: boolean
  }>(),
  {
    type: 'circle',
    color: '#c8c9cc',
    size: '22',
    textSize: '14',
    textColor: '#c9c9c9',
    vertical: false
  }
)
</script>

<style scoped lang="scss">
.cc-loading {
  &-icon {
    &-circle {
      animation: loading 1s ease-in-out infinite;
    }

    &-spinner {
      animation: loading 1s linear infinite;
    }

    &-left {
      margin-left: 8px;
      display: flex;
      align-items: center;
    }

    &-top {
      margin-top: 8px;
    }
  }
}

@keyframes loading {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
