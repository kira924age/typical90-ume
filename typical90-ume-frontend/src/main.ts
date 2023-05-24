import { createApp } from 'vue'
import App from './the-app.vue'
import router from './router'

import './assets/main.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  components,
  directives
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
