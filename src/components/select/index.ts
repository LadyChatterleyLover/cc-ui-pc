import type { App } from 'vue'
import Select from './src/Select.vue'
import Option from './src/Option.vue'

export default {
  install(app: App) {
    app.component('cc-select', Select)
    app.component('cc-option', Option)
  }
}
