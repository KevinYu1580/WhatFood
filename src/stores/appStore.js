import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { findModalSetting } from '@/utils/findModalSetting.js'

export const useAppStore = defineStore('app', () => {
  // --- 專案主題 ---
  // 預設主題
  const theme = ref('light')

  // 切換主題
  const switchTheme = (val) => {
    theme.value = val
  }

  // ---- loader----
  const showLoader = ref(false)

  const closeLoader = () => {
    showLoader.value = false

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loader closed')
      }, 300)
    })
  }

  const openLoader = () => {
    showLoader.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('loader opened')
      }, 300)
    })
  }

  // ---- sidebar----
  const showSidebar = ref(true)

  const setSidebar = (status) => {
    showSidebar.value = status
  }
  // (預設桌機版)sidebar寬度
  const sidebarWidth = ref(200)

  const setSidebarWidth = (number) => {
    sidebarWidth.value = number
  }

  const { thresholds, width } = useDisplay()

  function getSidebarSetting(width) {
    // 參數說明：
    // {
    //   default 網頁初始時預設要使用的側欄寬度 or 收合狀態 'openWidth' | 'closeWidth' | undefined (收起)
    // TODO: enabled
    //   enableToggle  是否可以收合
    //   openWidth  展開或（開啟）的寬度
    //   closeWidth  收合或（關閉）的寬度
    // }

    // 手機版本 561以下  側欄佔寬度 100% 且可收合 預設收起
    if (width < thresholds.value.md) {
      return { default: undefined, enableToggle: true, openWidth: width, closeWidth: 0 }
    }

    // 平板 561-1023 側欄寬佔 300px 且可收合 預設收起
    if (width >= thresholds.value.md && width <= thresholds.value.lg) {
      return { default: undefined, enableToggle: true, openWidth: 300, closeWidth: 0 }
    }

    // 平板 1024-1199 側欄寬佔 300px 不收合 僅改變寬度
    if (width > thresholds.value.lg && width < thresholds.value.xl) {
      return { default: undefined, enableToggle: true, openWidth: 300, closeWidth: 64 }
    }

    // 桌機 1200up  側欄寬佔 200px 不收合 僅改變寬度
    if (width >= thresholds.value.xl) {
      return { default: 'openWidth', enableToggle: false, openWidth: 200, closeWidth: 64 }
    }
  }

  const sidebarSetting = computed(() => getSidebarSetting(width.value))

  //監聽sideBar是否打開(桌機版適用)
  const sidebarExpand = computed(() => {
    return sidebarWidth.value === sidebarSetting.value.openWidth
  })

  // ---- modal ----
  // 跳窗是否顯示
  const showModal = ref(false)

  /**
   * @name 關閉跳窗
   * @description 關閉跳窗並清空目前跳窗資訊
   */
  const closeModal = () => {
    showModal.value = false
  }

  // 清空跳窗內容
  const clearModal = () => {
    currentModal.value = {}
  }

  /**
   * @name 顯示跳窗
   * @param {Object{}} options 帶入跳窗參數
   */
  const openModal = async (options = {}) => {
    const { name } = options

    if (!name) throw new Error('請至 modalSettings 設定跳窗名稱')

    // 取得跳窗資訊
    const modalSetting = findModalSetting(name)

    if (!modalSetting) throw new Error('modalSetting 找不到對應的跳窗設定')

    // TODO:merge options
    currentModal.value = {
      ...modalSetting,
      ...options
    }

    showModal.value = true
    return
  }

  // 記錄目前跳窗的資訊
  const currentModal = ref({})
  // ---- modal ----

  // Google API

  const apiKey = ref('AIzaSyAJrX9RSNt_66ttj29_ycuG6F1WCMjLuz8')

  return {
    theme, //目前主題
    switchTheme, //切換主題

    showLoader, //loader是否打開
    closeLoader, //關閉loader
    openLoader, //打開loader

    showSidebar, //sidebar是否打開
    setSidebar, //設定sidebar是否打開
    sidebarSetting, //sidebar設定(動態)
    sidebarWidth, //sidebar寬度
    setSidebarWidth, //設定sidebar寬度
    sidebarExpand, //sidebar是否打開(桌機版適用)

    showModal, //跳窗是否顯示
    closeModal, //關閉跳窗
    openModal, //顯示跳窗
    currentModal, //目前跳窗資訊
    clearModal, //清空跳窗內容

    apiKey //Google API Key
  }
})
