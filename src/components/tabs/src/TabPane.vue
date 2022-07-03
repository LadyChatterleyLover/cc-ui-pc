<template>
  <div class=""  v-show="currentName === name">
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import { type ComputedRef, inject, onUnmounted, onMounted, nextTick } from 'vue'
import type { TabPaneContext } from "./Tabs.vue"


const props = withDefaults(defineProps<{
  label: string,
  name: number | string,
  disabled?: boolean,
  closable?: boolean,
}>(), {
  disabled: false,
  closable: false,
})

const currentName = inject<ComputedRef<string | number>>('currentName')!
const addTabPane = inject<(tabPane: TabPaneContext) => void>('addTabPane')!
const removeTabPane = inject<(name: string | number) => void>('removeTabPane')!


onMounted(() => {
  nextTick(() => {
    addTabPane({
      name: props.name,
      label: props.label
    })
  })
})

onUnmounted(() => {
  removeTabPane(props.name)
})
</script>

<style lang='scss' scoped>
</style>
