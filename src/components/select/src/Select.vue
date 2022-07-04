<template>
  <cc-popper v-model="visible" placement="bottom">
    <cc-input
    ref="selectInputRef"
    class="cursor-pointer"
     placeholder="请选择"
    v-model="value" ></cc-input>
    <template #content>
      <div :style="{minWidth: width + 'px'}" class="cc-select-content relative mt-2 bg-white rounded-sm">
          <slot></slot>
        </div>
    </template>
  </cc-popper>
</template>

<script lang="ts" setup>
import { provide, ref, watch, onMounted,nextTick } from "vue"

const props = withDefaults(
  defineProps<{
    modelValue: string | number | boolean | object
    placeholder?: string
  }>(),
  {
    placeholder: "",
  }
)


const value = ref<string | number | boolean | object>("")
const visible = ref<boolean>(false)
const width = ref<number>(0)
const selectInputRef = ref<HTMLDivElement>()


const emits = defineEmits(["update:modelValue"])

const setValue = (v: string | number | boolean | object) => {
  value.value = v
}
const setVisible = (v: boolean) => {
  visible.value = v
}

provide("setValue", setValue)
provide("setVisible", setVisible)

watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  },
  { immediate: true, deep: true }
)

watch(
  () => value.value,
  (val) => {
    emits("update:modelValue", val)
  }
)

onMounted(() => {
  nextTick(() => {
    const rect = selectInputRef.value?.getBoundingClientRect()
    width.value = Number(rect?.width)
  })
})

</script>

<style lang="scss" scoped>
</style>
