import type { App } from 'vue'
import Tabs from './src/Tabs.vue'
import TabPane from './src/TabPane.vue'

export default {
  install(app: App) {
    app.component('cc-tabs', Tabs)
    app.component('cc-tab-pane', TabPane)
  }
}
