import type { App } from 'vue'
import Row from './src/Row.vue'

export default {
  install(app: App) {
    app.component('cc-row', Row)
  }
}
