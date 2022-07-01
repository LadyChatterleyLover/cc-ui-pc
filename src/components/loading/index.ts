import type { App } from 'vue'
import Loading from './src/Loading.vue'

export default {
  install(app: App) {
    app.component('cc-loading', Loading)
  }
}
