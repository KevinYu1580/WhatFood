import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

import { customLightTheme as light } from '@/styles/vuetify/lightThemeVar.js'
import { customDarkTheme as dark } from '@/styles/vuetify/darkThemeVar.js'

import { useI18n } from 'vue-i18n'

import i18n from '@/plugins/i18n.js'
import { VListItem } from 'vuetify/lib/components/index.mjs'

// Vuetify 元件內部的翻譯
// console.log(en, zhHant)

// 使用自定義主題創建 Vuetify 實例
export default createVuetify({
  display: {
    mobileBreakpoint: 'md', // 設置斷點
    thresholds: {
      // 設置斷點閾值
      xs: 0,
      sm: 320,
      md: 561,
      lg: 1023,
      xl: 1200
    }
  },
  theme: {
    themes: {
      //註冊主題
      // 自定義亮色主題
      light,
      dark //(請依照設計稿更改案色主題物件內變數)
    }
  },
  defaults: {
    global: {
      ripple: false //預設關閉所有元件的ripple效果
    }
  },
  icons: {
    defaultSet: 'mdi' // 預設使用的icon set
  },

  // （可選）多語系
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
})
