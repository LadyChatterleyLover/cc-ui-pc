import type { App } from 'vue'
import Input from './src/Input.vue'

export default {
  install(app: App) {
    app.component('cc-input', Input)
  }
}
