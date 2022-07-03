import type { App } from 'vue'
import Popper from './src/Popper.vue'

export default {
  install(app: App) {
    app.component('cc-popper', Popper)
  }
}