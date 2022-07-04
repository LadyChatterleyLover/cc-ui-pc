<template>
  <div ref="inputRef" class="cc-input cursor-pointer inline-flex flex-grow items-center justify-center">
    <div class="cc-input-wrpper inline-flex flex-grow justify-center items-center px-3 rounded-sm bg-white">
      <span
        v-if="$slots.prefix || prefixIcon"
        style="color: #a8abb2"
        class="inline-flex whitespace-nowrap flex-shrink-0 h-full text-center"
      >
        <span class="inline-flex justify-center items-center">
          <cc-icon size="12" v-if="prefixIcon">
            <component :is="prefixIcon"></component>
          </cc-icon>
          <slot name="prefix" v-else></slot>
        </span>
      </span>
      <input
        v-if="type === 'text'"
        :type="`${isPassword ? type : 'password'}`"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="Number(maxlength)"
        class="cc-input-input rounded-sm outline-0 w-full border-none h-8 leading-8 cursor-pointer"
        :class="[`${disabled ? 'bg-disabledBg text-disabledColor cursor-not-allowed' : ''}`]"
        v-model="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <span
        v-if="$slots.suffix || suffixIcon"
        style="color: #a8abb2"
        class="inline-flex whitespace-nowrap flex-shrink-0 h-full text-center"
      >
        <span class="inline-flex justify-center items-center">
          <cc-icon size="12" v-if="suffixIcon">
            <component :is="suffixIcon"></component>
          </cc-icon>
          <slot name="suffix" v-else></slot>
        </span>
      </span>
      <span
        v-if="clearable && modelValue.length"
        style="color: #a8abb2"
        class="inline-flex whitespace-nowrap flex-shrink-0 h-full text-center ml-1"
        @click="clear"
      >
        <span class="inline-flex justify-center items-center z-50">
          <cc-icon size="12">
            <CloseCircleOutlined />
          </cc-icon>
        </span>
      </span>
      <span
        v-if="showPassword && modelValue.length"
        style="color: #a8abb2"
        class="inline-flex whitespace-nowrap flex-shrink-0 h-full text-center ml-1"
        @click="isPassword = !isPassword"
      >
        <span class="inline-flex justify-center items-center z-50">
          <cc-icon size="14">
            <EyeOutlined v-if="isPassword" />
            <EyeInvisibleOutlined v-else />
          </cc-icon>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, type Component } from 'vue'
import { CloseCircleOutlined, EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'

const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: 'text' | 'textarea' | string
    placeholder?: string
    maxlength?: string | number
    minlength?: string | number
    clearable?: boolean
    disabled?: boolean
    readonly?: boolean
    showPassword?: boolean
    prefixIcon?: Component
    suffixIcon?: Component
  }>(),
  {
    type: 'text',
    placeholder: '',
    maxlength: Infinity,
    minlength: Infinity,
    clearable: false,
    disabled: false,
    readonly: false,
    showPassword: false,
  }
)

const emits = defineEmits(['update:modelValue', 'input', 'blur', 'focus', 'clear'])

const setValidateChangeFlag = inject<((n: number) => void) | undefined>('setValidateChangeFlag', undefined)
const setValidateBlurFlag = inject<((n: number) => void) | undefined>('setValidateBlurFlag', undefined)

const inputFlag = ref(0)
const blurFlag = ref(0)
const inputRef = ref<HTMLDivElement>()
const isPassword = ref<boolean>(false)


const handleInput = (e: Event) => {
  if (props.disabled) {
    return
  }
  emits('update:modelValue', (e as any).target.value)
  emits('input', (e as any).target.value)
  inputFlag.value++
  setValidateChangeFlag?.(inputFlag.value)
}

const handleBlur = (e: Event) => {
  if (props.disabled) {
    return
  }
  emits('blur', e)
  blurFlag.value++
  setValidateBlurFlag?.(blurFlag.value)
}

const handleFocus = (e: Event) => {
  if (props.disabled) {
    return
  }
  setValidateChangeFlag?.(0)
  setValidateBlurFlag?.(0)
  emits('focus', e)
}

const clear = (e: Event) => {
  emits('update:modelValue', '')
  emits('clear', e)
}

const getBoundingClientRect = () => {
  return inputRef.value?.getBoundingClientRect()
}

defineExpose({
  getBoundingClientRect,
})
</script>

<style lang="scss" scoped>
.cc-input {
  &-wrpper {
    border: 1px solid #dcdfe6;
  }
  &-input {
    &:focus {
      border-color: #0081ff;
    }
  }
}
</style>
