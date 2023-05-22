import { createApp } from 'vue'
import App from './the-app.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
