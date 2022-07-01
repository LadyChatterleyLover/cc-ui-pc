import type { App } from 'vue'
import Icon from './src/Icon.vue'

export default {
  install(app: App) {
    app.component('cc-icon', Icon)
  }
}
