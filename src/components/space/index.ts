import type { App } from 'vue'
import Space from './src/Space.vue'

export default {
  install(app: App) {
    app.component('cc-space', Space)
  }
}
