<template>
  <div class="relative">
    <div class="flex items-center mb-4" >
      <div 
      v-for="item in tabPaneList" 
      :key="item.name" 
      class="flex-shrink px-3 py-4 h-8 leading-8 cursor-pointer"
      :class="[`${currentName === item.name ? 'text-primary' : ''}`]"
      @click="handleClick(item)"
      >
        {{item.label}}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import { provide, ref, computed, watch } from 'vue'

export interface TabPaneContext {
  name: string | number,
  label: string
}

const props = withDefaults(defineProps<{
  modelValue: string | number,
  type?: '' | 'card' | 'border-card'
  closable?: boolean,
  addable?: boolean,
  editable?: boolean,
  beforeLeave?: (activeName?: string, oldName?: string) => boolean | Promise<boolean>
}>(), {
  type: '',
  closable: false,
  addable: false,
  editable: false,
})

const emits = defineEmits(['update:modelValue'])

const tabPaneList = ref<TabPaneContext[]>([])
const currentName = ref<string | number>(props.modelValue)

const handleClick = (item: TabPaneContext) => {
  currentName.value = item.name
}

const addTabPane = (tabPane: TabPaneContext) => {
  tabPaneList.value.push(tabPane)
}
const removeTabPane = (name: string | number) => {
  if (tabPaneList.value.length) {
    const currentIndex = tabPaneList.value.findIndex(item => item.name === name)
    if (currentIndex > -1) {
      tabPaneList.value.splice(currentIndex, 1)
    }
  }
}

const setCurrentName = (name: string | number, e: Event) => {
  console.log(name)
  currentName.value = name
  emits('update:modelValue', name, e)
}

watch(() => props.modelValue, val => {
  currentName.value = val
})


provide('addTabPane', addTabPane)
provide('removeTabPane', removeTabPane)
provide('setCurrentName', setCurrentName)
provide('currentName', computed(() => currentName.value))
</script>

<style lang='scss' scoped>
</style>
