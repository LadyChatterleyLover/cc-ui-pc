import { inject } from 'vue';
<template>
  <div class="pr-3 inline-flex rounded-sm flex-grow items-center justify-center">
    <input
      style="border: 1px solid #eee"
      class="outline-0 w-full border-none h-8 leading-8"
      v-model="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue"

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: "",
  }
)

const emits = defineEmits(["update:modelValue", "input", "blur", "focus"])

const setValidateChangeFlag = inject<(n: number) => void>("setValidateChangeFlag")
const setValidateBlurFlag = inject<(n: number) => void>("setValidateBlurFlag")

const inputFlag = ref(0)
const blurFlag = ref(0)

const handleInput = (e: Event) => {
  emits("update:modelValue", (e as any).target.value)
  emits("input", (e as any).target.value)
  inputFlag.value ++
  setValidateChangeFlag?.(inputFlag.value)
}

const handleBlur = (e: Event) => {
  emits('blur', e)
  blurFlag.value ++
  setValidateBlurFlag?.(blurFlag.value)
}

const handleFocus = (e: Event) => {
  setValidateChangeFlag?.(0)
  setValidateBlurFlag?.(0)
  emits('focus', e)
}
</script>

<style lang="scss" scoped></style>
