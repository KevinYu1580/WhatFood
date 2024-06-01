<template>
  <v-app-bar height="55" class="myHeader elevation-3">
    <!-- 控制左側菜單收合按鈕 -->
    <v-app-bar-nav-icon variant="text" @click="openSidebar()" v-if="showHamburger">
      <template #default>
        <MyIcon name="hamburger"></MyIcon>
      </template>
    </v-app-bar-nav-icon>
    <v-toolbar-title class="font-weight-black">{{ t('header.systemName') }}</v-toolbar-title>
    <template #append>
      <div v-show="!mobile" class="myHeader__append">
        <div>{{ t('header.time', countdown) }}</div>

        <div class="append__divider"></div>
        <div>{{ t('header.userName') }}</div>
        <div>{{ t('header.position') }}</div>
        <div class="append__divider"></div>

        <!-- 切換語言下拉選單 -->
        <mySelect
          density="compact"
          v-model="current"
          :items="languageItems"
          hide-details
        ></mySelect>

        <!-- 切換主題色 -->
        <MySwitch
          v-model="darkMode"
          :value="true"
          :label="`夜間模式: ${darkMode ? 'on' : 'off'}`"
        />

        <!-- 登出按鈕 -->
        <div class="cursor-pointer" @click="userStore.logout()">
          <MyIcon name="logout" size="32"></MyIcon>
        </div>
      </div>
    </template>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useDisplay, useLocale } from 'vuetify/lib/framework.mjs'
import { set } from 'date-fns'

const userStore = useUserStore() // 使用者功能
const appStore = useAppStore() // 系統功能

const darkMode = ref(false) //true為夜間模式，false為日間模式
watch(darkMode, (val) => {
  val ? appStore.switchTheme('dark') : appStore.switchTheme('light')
})

const { current, t } = useLocale()

// 是否為開發環境
const isDev = import.meta.env.DEV // 是否為開發模式

const { mobile } = useDisplay()

// --- 菜單控制 ---
// const { sidebarSetting } = storeToRefs(appStore)

function openSidebar() {
  console.log('openSidebar')
  appStore.setSidebarWidth(appStore.sidebarSetting.openWidth)
  appStore.setSidebar(true)
}

// 是否顯示漢堡
const showHamburger = computed(() => {
  return appStore.sidebarSetting.enableToggle
})

// --- 倒數計時 ---
// timer
let idleTimer = null

function clearTimer() {
  clearTimeout(idleTimer)
}

// 倒數計時
const countdown = ref('')

// 閒置15分鐘自動登出
const setTimer = (type) => {
  let count = 0
  let minute = isDev ? 60 : 15 // 開發模式60秒，正式環境15分鐘
  // 15分鐘等於 900000 毫秒
  let totalMinute = minute * 10 * 6000

  // 重置時間
  if (type == 'resetTimer') {
    clearTimer()
    count = 0
  }

  function plusTimer() {
    // 每次加一秒
    count = count + 1000

    // 毫秒轉成秒
    let seconds = parseInt(totalMinute - count) / 1000
    let days = Math.floor(seconds / (3600 * 24))
    seconds -= days * 3600 * 24
    let hrs = Math.floor(seconds / 3600)
    seconds -= hrs * 3600
    let mins = Math.floor(seconds / 60)
    seconds -= mins * 60

    // 秒數小於10補0
    countdown.value = `${mins}:${seconds < 10 ? `0${seconds}` : seconds}`

    // 15分鐘到自動登出
    if (count == totalMinute) {
      // 歸零

      // 登出
      userStore.logout()
    } else {
      idleTimer = setTimeout(plusTimer, 1000)
    }
  }
  plusTimer()
}

const restartTimer = () => {
  setTimeout(() => {
    setTimer('resetTimer')
  }, 1000)
}

// 設置和清理
onMounted(() => {
  /** 重置計時器 */
  setTimer()
  window.addEventListener('click', restartTimer)
})

onUnmounted(() => {
  window.removeEventListener('click', restartTimer)
  clearTimer()
})
//---倒數計時 end---

const languageItems = computed(() => {
  switch (current.value) {
    case 'en':
      return [
        { title: 'Chinese', value: 'zhHant', props: { subtitle: 'Chinese desc' } },
        { title: 'English', value: 'en', props: { subtitle: 'English desc' } },
        { title: 'Japanese', value: 'js', props: { subtitle: 'Japanese desc' } },
        { title: 'Korean', value: 'ko', props: { subtitle: 'Korean desc' } }
      ]
    case 'zhHant':
      return [
        { title: '中文', value: 'zhHant', props: { subtitle: '中文描述' } },
        { title: '英文', value: 'en', props: { subtitle: '英文描述' } },
        { title: '日文', value: 'js', props: { subtitle: '日文描述（無作用）' } },
        { title: '韓文', value: 'ko', props: { subtitle: '韓文描述（無作用）' } }
      ]

    default:
      return [
        { title: '中文', value: 'zhHant', props: { subtitle: '中文描述' } },
        { title: '英文', value: 'en', props: { subtitle: '英文描述' } },
        { title: '日文', value: 'js', props: { subtitle: '日文描述（無作用）' } },
        { title: '韓文', value: 'ko', props: { subtitle: '韓文描述（無作用）' } }
      ]
  }
})
</script>

<style lang="scss" scoped>
.myHeader {
  :deep(.v-toolbar__append) {
    margin-right: 16px;
    .myHeader__append {
      display: flex;
      align-items: center;
      height: 100%;
      gap: 16px;
      .append__divider {
        width: 1px;
        height: 24px;
        background-color: #9e9e9e;
      }
    }
  }
}
</style>
