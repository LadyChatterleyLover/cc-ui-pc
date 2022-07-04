<template>
  <div
    class="reference"
    ref="referenceRef"
    @click.stop.prevent="togglePopperShow"
    @mouseenter.stop.prevent="mouseenterTogglePopperShow"
    @mouseleave="mouseleave"
    @contextmenu="contextmenuTogglePopperShow"
  >
    <slot></slot>
  </div>
  <teleport to="body">
    <transition name="cc-popper" v-show="modelValue">
      <div ref="popperRef" @click.stop.prevent="" @mouseleave.stop.prevent="" @contextmenu.stop.prevent="">
        <div id="cc-popper-arrow" data-popper-arrow v-show="showArrow && modelValue"></div>
        <slot name="content" v-if="$slots.content"></slot>
        <div v-else>{{ content }}</div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, type Ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Placement } from '@/types'
import { useClickOutside } from '@/hooks/useClickOutside'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    effect?: 'dark' | 'light'
    placement?: Placement
    content?: ''
    showArrow?: boolean
    trigger?: 'click' | 'hover' | 'contextmenu' | string[]
  }>(),
  {
    effect: 'dark',
    content: '',
    placement: 'bottom',
    showArrow: true,
    trigger: 'click',
  }
)

const emits = defineEmits(['update:modelValue', 'hide', 'show'])

const referenceRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const popperInstance = ref<any>(null)

useClickOutside({
  target: referenceRef as Ref<HTMLElement>,
  callback: () => {
    emits('update:modelValue', false)
  },
  eventName: props.trigger as keyof DocumentEventMap,
})

// 创建 popper 实例
const createPopperInstance = () => {
  const arrow = document.getElementById('cc-popper-arrow')
  popperInstance.value = createPopper(referenceRef.value!, popperRef.value!, {
    placement: props.placement,
    modifiers: [
      {
        // 偏移值 左右，上下
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
      {
        name: 'arrow',
        options: {
          enabled: true,
          element: arrow,
        },
      },
      {
        // 禁用计算样式，使用 transition 动画
        name: 'computeStyles',
        options: {
          gpuAcceleration: false,
          adaptive: false,
        },
      },
    ],
  })
  nextTick(() => {
    // 异步更新
    popperInstance.value.update()
  })
}

// 销毁 popper 实例
const destroyPopperInstance = () => {
  popperInstance.value?.destroy?.()
  popperInstance.value = null
}

const togglePopperShow = () => {
  if (props.trigger === 'click' || (props.trigger as string[]).includes('trigger')) {
    emits('update:modelValue', !props.modelValue)
  } else {
    return
  }
}

const mouseenterTogglePopperShow = () => {
  if (props.trigger === 'hover' || (props.trigger as string[]).includes('hover')) {
    emits('update:modelValue', !props.modelValue)
  } else {
    return
  }
}

const contextmenuTogglePopperShow = () => {
  if (props.trigger === 'contextmenu' || (props.trigger as string[]).includes('contextmenu')) {
    emits('update:modelValue', !props.modelValue)
  } else {
    return
  }
}

const mouseleave = () => {
  if (props.trigger === 'hover' || (props.trigger as string[]).includes('hover')) {
    emits('update:modelValue', !props.modelValue)
  }
}

// 监听 visible 属性
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      createPopperInstance()
      emits('show')
    } else {
      emits('hide')
    }
  }
)

onMounted(() => {
  createPopperInstance()
})

onUnmounted(() => {
  destroyPopperInstance()
})
</script>

<style scoped lang="scss">
.reference {
  display: inline-block;
}

.cc-popper-enter-active,
.cc-popper-leave-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  opacity: 1;
  transform: scaleY(1);
  transform-origin: center top;
}

.cc-popper-enter-from,
.cc-popper-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

#cc-popper-arrow {
  position: absolute;
  width: 0px;
  height: 0px;
  background: inherit;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff;
}
</style>
