<template>
  <v-app>
    <!--
      DESCRIPTION:側欄選單
      1. groupingConfig: 如有傳入此參數，則會依照此參數將menuItems分組，反之則不分組並依照route順序排列
     -->

    <!-- 排版一 -->
    <MySidebar />
    <!-- 排版二 -->
    <!-- <MySidebar /> -->

    <!-- DESCRIPTION: header導覽列 -->
    <MyHeader />

    <v-main>
      <!-- DESCRIPTION: 頁面主要視口
      1. fluid: @boolean 是否取消vuetify v-container自帶的padding, max-width, margin
      2. tag: @string 自訂v-container的tag
    -->
      <v-container fluid tag="div">
        <!-- DESCRIPTION: 麵包屑 -->
        <MyBreadcrumbs v-if="$route.name != 'Home'" />
        <!-- DESCRIPTION: 渲染頁面 -->
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

// sideBar設定分組 & 依照pageName歸類(排版2)
// const groupingConfig = ref([
//   {
//     groupTitle: '設定',
//     groupChildren: ['Settings', 'Settings2']
//   },
//   {
//     groupTitle: '系統管理',
//     groupChildren: ['Account', 'Role', 'SystemLog', 'TestPage', 'GetDrink']
//   }
// ])
</script>
