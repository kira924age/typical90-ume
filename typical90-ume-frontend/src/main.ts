import { createApp } from 'vue'
import TheApp from './the-app.vue'
import router from './router'

import './assets/main.css'

const app = createApp(TheApp)

app.use(router)

app.mount('#app')
