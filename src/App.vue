<template>
  <!-- v-theme-provider: 為專案提供主題 -->
  <v-theme-provider :theme="appStore.theme">
    <MyModal />
    <MyLoader />
    <router-view />
  </v-theme-provider>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

// 網頁標題
document.title = '前端Vuetify專案模板'
</script>

<style lang="scss">
@font-face {
  font-family: 'NotoSansTC';
  font-style: normal;
  font-weight: 400;
  src: url('@/assets/font/NotoSansTC-Regular.ttf');
}

@font-face {
  font-family: 'NotoSansTC';
  font-style: medium;
  font-weight: 500;
  src: url('@/assets/font/NotoSansTC-Medium.ttf');
}
@font-face {
  font-family: 'NotoSansTC';
  font-style: bold;
  font-weight: 700;
  src: url('@/assets/font/NotoSansTC-Bold.ttf');
}

// 預設transition樣式
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

*,
html,
body {
  font-family: 'NotoSansTC', sans-serif !important;

  &::-webkit-scrollbar {
    width: 8px;
    position: absolute;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    padding-right: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b6b6b6;
    transform: rotate(20deg);
    border-radius: 20px;
  }
}

main {
  overflow: hidden; //防止爆版
}

// 引入自訂義utility class (補足vuetify utility class缺少的class)
@import '@/styles/base/_utilities.scss';
</style>
