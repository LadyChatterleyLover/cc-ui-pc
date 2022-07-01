<template>
  <div class="pr-3" :class="[`${block ? 'w-full' : ''}`]">
    <button
      class="text-base flex justify-center items-center cursor-pointer select-none leading-normal h-auto"
      :class="[
        `${disabled ? 'cursor-not-allowed opacity-40' : ''}
       ${useSizeClass(size)}
       ${useTypeClass(type, plain)}
       ${round ? 'rounded-full' : 'rounded'}
       ${block ? 'w-full' : ''}
       `,
      ]"
      :type="nativeType"
      :style="{ ...style }"
      @click="handleClick"
    >
      <cc-loading v-if="loading" :type="loadingType"></cc-loading>
      <div class="flex items-center">
        <div class="mr-2 relative top-0.5" v-if="$slots.icon">
          <cc-icon>
            <slot name="icon"></slot>
          </cc-icon>
        </div>
        <div><slot></slot></div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { TypeProps, SizeProps } from "@/types"
import { useSizeClass, useTypeClass } from "@/hooks/useClass"

const props = withDefaults(
  defineProps<{
    // 样式
    style?: CSSProperties
    // 按钮类型
    type?: TypeProps
    // 按钮尺寸
    size?: SizeProps
    // 块级按钮
    block?: boolean
    // 朴素按钮
    plain?: boolean
    // 禁用状态
    disabled?: boolean
    // 圆角按钮
    round?: boolean
    // 加载状态
    loading?: boolean
    // 加载类型
    loadingType?: "circle" | "spinner"
    // 按钮原生类型
    nativeType?: "submit" | "reset" | "button"
  }>(),
  {
    type: "",
    size: "middle",
    block: false,
    disabled: false,
    round: false,
    plain: false,
    loading: false,
    loadingType: "circle",
    nativeType: "button",
  }
)

const emits = defineEmits(["click"])

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return
  emits("click", e)
}
</script>

<style scoped></style>
