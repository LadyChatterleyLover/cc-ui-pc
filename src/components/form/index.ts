import type { App } from 'vue'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

export default {
  install(app: App) {
    app.component('cc-form', Form)
    app.component('cc-form-item', FormItem)
  }
}
