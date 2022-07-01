<template>
  <cc-overlay v-model="visible" :closeOnClickOverlay="true">
    <div class="flex items-center justify-center h-screen">
      <transition name="cc-message-box" v-show="visible">
        <div
          style="border-color: #ebeef5; width: 420px"
          class="px-3 pb-3 align-middle bg-white rounded-md border border-solid text-lg overflow-hidden"
        >
          <div class="p-4 relative flex items-center justify-between">
            <div>{{ title }}</div>
            <div v-if="showClose" class="cursor-pointer" @click="cancel">
              <cc-icon color="#909399" size="16">
                <CloseOutlined />
              </cc-icon>
            </div>
          </div>
          <div class="py-3 px-4 text-sm" style="color: #606266">
            <template v-if="typeof message === 'string'">
              <div v-html="message" v-if="dangerouslyUseHTMLString"></div>
              <div v-else>{{message}}</div>
            </template>
            <component v-else :is="message"></component>
          </div>
          <div v-if="componentType === 'prompt'" class="py-4">
            <input style="border: 1px solid #eee;" class="outline-0 w-full border-none h-8 leading-8" v-model="value" />
          </div>
          <div class="flex justify-end items-center py-1 pr-4">
            <cc-button v-if="showCancelButton" class="mr-4" size="small" @click="cancel">{{
              cancelButtonText
            }}</cc-button>
            <cc-button v-if="showConfirmButton" type="primary" size="small" @click="confirm">{{
              confirmButtonText
            }}</cc-button>
          </div>
        </div>
      </transition>
    </div>
  </cc-overlay>
</template>

<script lang="ts" setup>
import { ref, type VNode } from "vue"
import type { MessageBoxType } from "../types"
import { CloseOutlined } from "@vicons/antd"

const props = withDefaults(
  defineProps<{
    title?: string
    message?: string | object,
    type?: MessageBoxType
    showClose?: boolean
    dangerouslyUseHTMLString?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    showConfirmButton?: boolean
    showCancelButton?: boolean
    callback?: (action: "confirm" | "cancel") => void
  }>(),
  {
    title: "",
    message: "",
    type: "",
    showClose: true,
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: true,
    showCancelButton: false,
    dangerouslyUseHTMLString: false,
  }
)

const visible = ref<boolean>(false)
const value = ref<string>('')
const state = ref<"" | "confirm" | "cancel">("")
const componentType = ref<"" | "alert" | "confirm" | "prompt">("")

const setVisible = (v: boolean) => {
  visible.value = v
}
const setComponentType = (type: "" | "alert" | "confirm" | "prompt") => {
  componentType.value = type
}

const confirm = () => {
  state.value = "confirm"
  if (props.callback) {
    props.callback(state.value)
  }
  visible.value = false
}
const cancel = () => {
  state.value = "cancel"
  if (props.callback) {
    props.callback(state.value)
  }
  visible.value = false
}

defineExpose({
  setVisible,
  state,
  visible,
  value,
  componentType,
  setComponentType
})
</script>

<style lang="scss" scoped>
.cc-message-box-enter-from,
.cc-message-box-leave-to {
  transform: translateY(-20px);
}
.cc-message-box-enter-active,
.cc-message-box-leave-active {
  transition: all 0.3s linear;
}
</style>
