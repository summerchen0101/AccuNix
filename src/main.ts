import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import VueApexCharts from 'vue3-apexcharts'
import ApexCharts from 'apexcharts'
import 'element-plus/lib/theme-chalk/index.css'
import './style/tailwind.scss'
import './style/main.scss'

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts
  }
}

const i18n = createI18n({
  legacy: false,
  // globalInjection: true,
  locale: 'zh', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    zh,
  }, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

const app = createApp(App)
app.use(i18n)
app.use(ElementPlus)
app.use(router)
app.use(VueApexCharts)

app.config.globalProperties.$apexcharts = ApexCharts

app.mount('#app')
