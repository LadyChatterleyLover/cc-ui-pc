<template>
  <div
    @click="handleClick"
    class="flex"
    :class="[
      `${direction === 'vertical' ? 'flex-col' : ''}`,
      `${wrap && direction === 'horizontal' ? 'flex-wrap' : ''}`
    ]"
    :style="{
      justifyContent: justify,
      alignItems: align
    }"
  >
    <div
      v-for="(item, index) in slots"
      :key="index"
      class="flex items-center"
      :style="{
        marginRight: direction === 'horizontal' && index !== slots.length! - 1 ? (gap +'px') : 0,
        marginBottom: direction === 'vertical' && index !== slots.length! - 1 ? (gap +'px') : 0,
        paddingBottom: direction === 'horizontal' && wrap ? (gap + 'px') : 0,
   }"
    >
      <component :is="item"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import type { JustifyProps, AlignProps, Direction } from '@/types'

const props = withDefaults(
  defineProps<{
    gap?: string | number
    // 主轴对齐方式
    justify?: JustifyProps
    // 交叉轴对齐方式
    align?: AlignProps
    // 间距方向
    direction?: Direction
    // 是否自动换行，仅在 horizontal 时有效
    wrap?: boolean
  }>(),
  {
    gap: 8,
    justify: 'start',
    align: 'start',
    direction: 'horizontal',
    wrap: false
  }
)
const emits = defineEmits(['click'])

const slots: any = useSlots().default?.()

const handleClick = (e: MouseEvent) => {
  emits('click', e)
}
</script>

<style scoped></style>
