import { createApp, ref, watch } from "vue"
import type { App } from "vue"
import MessageComponent from "./index.vue"
import type { MessageOptions } from "../types"

const margin = 60
const height = 28

const messageArr = ref<any[]>([])

const Message = (options: MessageOptions) => {
  if (typeof options === "string") {
    options = {
      message: options,
      duration: 3000,
    }
  }
  const messageApp = createApp(MessageComponent, options as any)
  showMessage(messageApp, options.duration as number)
}

const showMessage = (app: App, duration = 3000) => {
  const fragment = document.createDocumentFragment()
  const vm: any = app.mount(fragment)
  messageArr.value.push(vm)
  setTop(vm)
  vm.setVisible(true)
  watch(
    () => messageArr.value,
    () => setTop(vm)
  )
  document.body.appendChild(fragment)
  hideMessage(app, vm, duration)
}

const hideMessage = (app: App, vm: any, duration = 3000) => {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false)
    app.unmount()
    messageArr.value = messageArr.value.filter((item) => item !== vm)
    clearTimeout(vm.timer)
    vm.timer = null
  }, duration)
}

const setTop = (vm: any) => {
  const currentIndex = messageArr.value.findIndex((item) => item === vm)
  vm.setTop(margin * currentIndex + height)
}

Message.success = (options: MessageOptions | string) => {
  Message({
    type: "success",
    message: typeof options === "string" ? options : options.message,
  })
}
Message.info = (options: MessageOptions | string) => {
  Message({
    type: "info",
    message: typeof options === "string" ? options : options.message,
  })
}
Message.warning = (options: MessageOptions | string) => {
  Message({
    type: "warning",
    message: typeof options === "string" ? options : options.message,
  })
}
Message.error = (options: MessageOptions | string) => {
  Message({
    type: "error",
    message: typeof options === "string" ? options : options.message,
  })
}

export default Message
