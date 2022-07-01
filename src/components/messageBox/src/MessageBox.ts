import type { MessageBoxProps } from "../types"
import MessageBoxVue from "./MessageBox.vue"
import { createApp, type App, watch } from "vue"
import CcUI from "@/components"

const MessageBox = (options: MessageBoxProps) => {
  const app = createApp(MessageBoxVue, options as any)
  return new Promise((resolve, reject) => {
    showMessageBox(app, { resolve, reject }, options)
  })
}

const showMessageBox = (
  app: App,
  { resolve, reject }: { resolve: (res: any) => void; reject: (reason?: any) => void },
  options: MessageBoxProps
) => {
  const fragment = document.createDocumentFragment()
  app.use(CcUI)
  const vm: any = app.mount(fragment)
  document.body.appendChild(fragment)
  vm.setVisible(true)
  vm.setComponentType(options.componentType)
  watch(
    () => vm.state,
    (val) => {
      if (val === "confirm") {
        if (vm.componentType === "prompt") {
          resolve({ value: vm.value })
        } else {
          resolve({})
        }
      } else {
        reject()
      }
    }
  )
  watch(
    () => vm.visible,
    (val) => {
      if (!val) {
        vm.timer = setTimeout(() => {
          hideMessage(app)
          vm.timer = null
          clearTimeout(vm.timer)
        }, 300)
      }
    }
  )
}

const hideMessage = (app: App) => {
  app.unmount()
}

MessageBox.alert = (message: string, title: string, options: MessageBoxProps) => {
  return MessageBox({
    componentType: "alert",
    callback: (action) => {
      options.callback?.(action)
    },
    title,
    message,
    ...options,
  })
}

MessageBox.confirm = (message: string, title: string, options: MessageBoxProps) => {
  return MessageBox({
    componentType: "confirm",
    title,
    message,
    ...options,
  })
}

MessageBox.prompt = (message: string, title: string, options: MessageBoxProps) => {
  return MessageBox({
    componentType: "prompt",
    title,
    message,
    ...options,
  })
}

export default MessageBox
