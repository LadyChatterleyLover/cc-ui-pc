import type { App } from 'vue'
import Button from './src/Button.vue'

export default {
  install(app: App) {
    app.component('cc-button', Button)
  }
}
