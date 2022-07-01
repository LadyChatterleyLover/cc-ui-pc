import type { App } from 'vue'
import Divider from './src/Divider.vue'

export default {
  install(app: App) {
    app.component('cc-divider', Divider)
  }
}
