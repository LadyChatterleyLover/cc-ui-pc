<template>
  <div>
    <teleport :to="container">
      <transition name="cc-overlay">
        <div
          v-show="visible"
          class="fixed top-0 bottom-0 left-0 right-0"
          :style="{
            zIndex: Number(zIndex),
            background,
            transitionDuration,
          }"
          @click="handleClick"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type CSSProperties } from "vue"
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    style?: CSSProperties
    zIndex?: number | string
    duration?: number | string
    closeOnClickOverlay?: boolean
    getContainer?: HTMLElement | (() => HTMLElement | null)
    background?: string
  }>(),
  {
    modelValue: false,
    closeOnClickOverlay: false,
    zIndex: 999,
    duration: 300,
    background: "rgba(0,0,0,.5)",
  }
)
const emits = defineEmits(["click", "update:modelValue"])
const visible = ref<boolean>(false)
const container = computed(() => {
  if (props.getContainer) {
    if (typeof props.getContainer === "function") {
      return props.getContainer()
    } else {
      return props.getContainer
    }
  } else {
    return document.body
  }
})
const transitionDuration = computed(() => Number(props.duration) / 1000 + "s")
const handleClick = (e: MouseEvent) => {
  if (props.closeOnClickOverlay) {
    return
  }
  emits("update:modelValue", !props.modelValue)
  emits("click", e)
}
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.cc-overlay-enter-active,
.cc-overlay-leave-active {
  transition: all linear;
}
.cc-overlay-enter-from,
.cc-overlay-leave-to {
  opacity: 0;
}
</style>
