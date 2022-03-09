import ApexCharts from 'apexcharts'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import en from './locales/en.json'
import zh from './locales/zh.json'
import router from './router'
import './style/main.scss'
import './style/tailwind.scss'
import { createPinia } from 'pinia'

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

app.use(createPinia())
app.use(i18n)
app.use(ElementPlus)
app.use(router)
app.use(VueApexCharts)

app.config.globalProperties.$apexcharts = ApexCharts

app.mount('#app')
