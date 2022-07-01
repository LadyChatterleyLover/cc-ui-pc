<template>
  <div
    style="color: #606206"
    class="cc-option relative whitespace-nowrap overflow-hidden text-ellipsis h-9 leading-9 cursor-pointer pr-8 pl-5"
    @click="handleClick"
  >
    <div>{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue"

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number | boolean | object
    disabled?: boolean
  }>(),
  {
    disabled: false,
  }
)

const setValue = inject<(value: string | number | boolean | object) => void>("setValue")
const setVisible = inject<(v: boolean) => void>("setVisible")

const handleClick = () => {
  setValue?.(props.value)
  setVisible?.(false)
}
</script>

<style lang="scss" scoped>
.cc-option {
  &:hover {
    background: #f5f7fa;
  }
}
</style>
