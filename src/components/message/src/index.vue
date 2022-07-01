<template>
  <div>
    <transition name="cc-message">
      <div
        style="margin-left: -120px"
        :style="{ top: top + 'px' }"
        class="flex justify-center items-center text-white fixed rounded-md h-7 left-1/2 w-64 px-3 py-5"
        :class="[computedTypeClass]"
        v-show="visible"
      >
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import type { MessageType } from "../types"

const props = withDefaults(
  defineProps<{
    message?: string
    type?: MessageType
  }>(),
  {
    message: "",
    type: "info",
  }
)

const visible = ref<boolean>(false)
const top = ref<number>(0)

const setVisible = (v: boolean) => {
  return new Promise((resolve) => {
    visible.value = v
    setTimeout(() => {
      resolve("")
    }, 300)
  })
}

const setTop = (t: number) => {
  top.value = t
}

defineExpose({
  setVisible,
  setTop,
})

const computedTypeClass = computed(() => {
  if (props.type === "success") {
    return "bg-success"
  }
  if (props.type === "info") {
    return "bg-info"
  }
  if (props.type === "error") {
    return "bg-danger"
  }
  if (props.type === "warning") {
    return "bg-warning"
  }
})
</script>

<style lang="scss" scoped>
.cc-message-enter-from,.cc-message-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.cc-message-enter-active {
  transition: all .3s ease-in;
}
.cc-message-leave-active {
  transition: all .3s ease-out;
}
</style>
