import type { App } from 'vue'
import Overlay from './src/Overlay.vue'

export default {
  install(app: App) {
    app.component('cc-overlay', Overlay)
  }
}