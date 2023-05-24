import { createApp } from 'vue'
import App from './the-app.vue'
import router from './router'

import './assets/main.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
