import type { App } from 'vue'
import Col from './src/Col.vue'

export default {
  install(app: App) {
    app.component('cc-col', Col)
  }
}
