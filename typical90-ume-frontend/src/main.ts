import { createApp } from 'vue'
import App from '@/the-app.vue'
import router from '@/router'

// Vuetify
import 'vuetify/styles'
import VueApexCharts from 'vue3-apexcharts'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(VueApexCharts)

app.mount('#app')
