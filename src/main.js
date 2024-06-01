// import '@/styles/tailwind/output.css'

import { createApp } from 'vue'
import App from './App.vue'

// 掛載app
const app = createApp(App)

// **引入plugins**

// 引入pinia及其設定檔
import createPinia from '@/plugins/pinia.js'

// 引入router及其設定檔
import router from '@/router/router.js'

// 引入vuetify及其設定檔
import createVuetify from '@/plugins/vuetify.js'

import i18n from '@/plugins/i18n'

const metaPlugins = {
  createPinia,
  router,
  i18n,
  createVuetify
}

Object.keys(metaPlugins).forEach((name) => {
  app.use(metaPlugins[name])
})

// **引入components**
// 全局註冊常用的src/component內所有.vue組件並註冊，以便於開發使用
const metaComponents = import.meta.glob('@/components/**/*.vue', {
  eager: true,
  import: 'default'
})

Object.entries(metaComponents).forEach(([path, component]) => {
  app.component(path.split('/').pop().replace('.vue', ''), component)
})

app.mount('#app')
