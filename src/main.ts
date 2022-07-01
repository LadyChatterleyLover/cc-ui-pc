import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CcUI from './components'

const app = createApp(App)

app.use(router)
app.use(CcUI)

app.mount('#app')
