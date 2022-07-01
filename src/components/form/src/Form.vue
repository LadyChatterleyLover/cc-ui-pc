<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from "vue"
import type { RuleItem, Callback } from "../types"

export interface Rules {
  [key: string]: RuleItem[]
}

const props = withDefaults(
  defineProps<{
    model: Record<string, any>
    rules?: Rules
    labelWidth?: number | string
  }>(),
  {
    labelWidth: "",
  }
)

const filedList = ref<any[]>([])

const addFiled = (filed: any) => {
  filedList.value.push(filed)
}

// 验证方法
const validate = (callback: Callback) => {
  // 所有需要验证表单项的结果
  if (filedList.value && filedList.value.length) {
    const tasks = filedList.value.map((item: any) => item.validate())
    Promise.all(tasks)
      .then((res) => {
        const result = res.every((item) => item === true)
        callback(result)
      })
      .catch(() => callback(false))
  }
}
// 重置表单值
const resetFields = () => {
  if (filedList.value && filedList.value.length) {
    filedList.value.map((item: any) => {
      item.resetField()
    })
  }
}
defineExpose({
  validate,
  resetFields,
})

provide(
  "labelWidth",
  computed(() => props.labelWidth)
)
provide(
  "model",
  computed(() => props.model)
)
provide(
  "rules",
  computed(() => props.rules)
)
provide("addFiled", addFiled)
</script>

<style lang="scss" scoped></style>
