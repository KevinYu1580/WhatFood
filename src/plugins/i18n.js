import { createI18n } from 'vue-i18n'
// import { en as VuetifyEn, zhHant as VuetifyZhHant } from 'vuetify/locale'
import en from '@/i18N/en.json'
import zhTw from '@/i18N/zh-Tw.json'
import VuetifyEn from '@/i18N/vuetify/en.json'
import VuetifyZhHant from '@/i18N/vuetify/zh-Tw.json'

export default createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n

  // 目前的語言
  locale: 'zhHant',

  // 備用語言 （找不到對應的翻譯）
  fallbackLocale: 'en',

  // 要新增語言在這邊新增：
  messages: {
    en: {
      $vuetify: VuetifyEn,
      ...en
    },
    zhHant: {
      $vuetify: VuetifyZhHant,
      ...zhTw
    }
  }
})
