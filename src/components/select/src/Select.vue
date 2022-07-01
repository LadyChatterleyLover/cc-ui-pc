<template>
  <div ref="selectRef" class="w-fit h-fit">
    <cc-input class="cursor-pointer" :placeholder="placeholder" v-model="value" @focus="visible = true"></cc-input>
    <div
      :style="{ display }"
      class="cc-select-content relative mt-2 bg-white rounded-sm"
      :class="[`${visible ? 'cc-select-content-show' : 'cc-select-content-hide'}`]"
    >
      <div class="cc-select-arrow"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from "vue"
import { useClickOutside } from "../../../hooks/useClickOutside/index"

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
const selectRef = ref<any>()
const display = ref<"none" | "block">("none")

useClickOutside({
  target: selectRef,
  callback: () => {
    visible.value = false
  },
})

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

watch(
  () => visible.value,
  (val) => {
    if (val) {
      display.value = "block"
    } else {
      setTimeout(() => {
        display.value = "none"
      }, 300)
    }
  }
)
</script>

<style lang="scss" scoped>
.cc-select {
  &-content {
    opacity: 0;
    border: 1px solid #e4e7ed;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    &-show {
      animation: show 0.3s linear forwards;
    }
    &-hide {
      animation: hide 0.3s linear forwards;
    }
  }
  &-arrow {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -6px;
    z-index: 9999;
  }
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
