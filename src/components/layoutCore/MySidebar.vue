<template>
  <!--
      DESCRIPTION:側欄選單
      1. rail: @boolean 是否套用rail-width寬度
      2. v-model: @boolean 是否顯示側欄
      3. floating: @boolean 是否浮動
      4. temporary: @boolean 是否暫時性出現選單(手機板出現)
      5. permanent: @boolean 是否永久性出現選單(桌機板出現)
      6. rail-width: @number 側欄寬度
      7. scrim: @string 遮罩層顏色
     -->
  <v-navigation-drawer
    class="mySidebar"
    order="0"
    :rail="appStore.showSidebar"
    v-model="appStore.showSidebar"
    :floating="appStore.sidebarSetting.enableToggle"
    :permanent="!showHamburger"
    :rail-width="appStore.sidebarWidth"
    :temporary="appStore.sidebarSetting.enableToggle"
    :scrim="'black'"
  >
    <template #prepend>
      <!-- 關閉的icon -->
      <div
        @click="closeSidebar()"
        v-if="showHamburger"
        class="cursor-pointer w_fit ml-auto mr-4 mb-4"
      >
        <MyIcon name="cross" />
      </div>
    </template>

    <!--
      DESCRIPTION:遞迴SidebarListItem元件產生側邊欄選單
      1. 排版1: 無群組標題
      2. 排版2: 有群組標題
     -->

    <!-- 排版1 -->
    <div v-if="!groupingConfig">
      <SidebarListItem
        v-for="item in menuItems"
        :menuItem="item"
        :key="item.name"
        :sidebarOpened="appStore.showSidebar"
      />
    </div>

    <!-- 排版2 -->
    <div v-else v-for="(groupItem, index) in groupItems" :key="groupItem.groupTitle">
      <div>
        <!-- 群組標題 -->
        <v-list-subheader
          v-show="appStore.sidebarExpand"
          v-if="groupItem.groupChildren.length != 0"
          class="mySidebar__groupTitle"
          >{{ groupItem.groupTitle }}
        </v-list-subheader>
        <!-- 分隔線 -->
        <div class="w-25 my-2 mx-auto" v-show="!appStore.sidebarExpand && index != 0">
          <v-divider length="24"></v-divider>
        </div>
      </div>

      <!-- 選單 -->
      <SidebarListItem
        v-for="item in groupItem.groupChildren"
        :menuItem="item"
        :key="item.name"
        :sidebarOpened="appStore.showSidebar"
      />
    </div>

    <template #append>
      <v-divider :length="appStore.sidebarExpand ? '100%' : '24'" inset></v-divider>
      <div
        class="mySidebar__botContainer"
        :class="{
          'px-10px': !appStore.sidebarExpand,
          'px-28px': appStore.sidebarExpand
        }"
      >
        <div class="bot">
          <span
            v-show="appStore.sidebarWidth === appStore.sidebarSetting.openWidth"
            class="bot__version"
          >
            Ver 0.1
          </span>

          <!-- 收合sideBar按鈕 -->
          <!-- <MyButton
            @click="toggleSetWidth(appStore.sidebarWidth)"
            v-show="!showHamburger"
            variant="outline"
            size="large"
          >
            <MyIcon
              :class="{ 'rotate-180': !appStore.sidebarExpand }"
              name="doubleArrow_left"
              size="20"
            ></MyIcon
          ></MyButton> -->
          <!-- 登出按鈕 -->
          <div v-show="mobile" class="cursor-pointer" @click="userStore.logout()">
            <MyIcon name="logout" size="32"></MyIcon>
          </div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

import { useDisplay } from 'vuetify/lib/framework.mjs'

//從router.js引入菜單物件
import { menuData } from '@/router/router.js'
import MyIcon from '../MyIcon.vue'

// uility function
import deepCopy from '@/utils/deepCopy.js'

// vuetify RWD functions
const { mobile } = useDisplay()

// 使用者功能
const userStore = useUserStore()

const appStore = useAppStore()

const props = defineProps({
  // 是否要分組
  groupingConfig: {
    type: Array,
    required: false
  }
})

// --- 菜單控制 ---
// const { sidebarWidth } = storeToRefs(appStore)

/**
 * @name 切換側欄寬度
 * @description 用sidebarWidth 跟 appStore.sidebarSetting的值來控制側欄
 * @param {Number} 側欄寬度
 */
const toggleSetWidth = (sidebarWidth) => {
  sidebarWidth === appStore.sidebarSetting.openWidth
    ? appStore.setSidebarWidth(appStore.sidebarSetting.closeWidth)
    : appStore.setSidebarWidth(appStore.sidebarSetting.openWidth)
}

// 關閉側欄
const closeSidebar = () => {
  appStore.setSidebar(false)
}

watch(
  () => appStore.sidebarSetting.openWidth,
  () => {
    // 當視窗改變時，側欄寬也要隨之變化，透過appStore.sidebarSetting 設定好的openWidth來改變
    appStore.setSidebarWidth(appStore.sidebarSetting.openWidth)
  }
)

// 是否顯示漢堡
const showHamburger = computed(() => {
  return appStore.sidebarSetting.enableToggle
})

onMounted(() => {
  // default 若是 undefined 預設關閉側欄
  if (!appStore.sidebarSetting.default) {
    appStore.setSidebar(false)
  }
  // // 跟據 default 決定預設得寬度要使用 openWidth 或 closeWidth
  appStore.sidebarSetting.default === 'openWidth'
    ? appStore.setSidebarWidth(appStore.sidebarSetting.openWidth)
    : appStore.setSidebarWidth(appStore.sidebarSetting.closeWidth)
})

// --- 菜單控制 ---

//菜單項目原始資料(排版1)
const menuItems = ref(deepCopy(menuData))

// 不渲染歡迎頁
menuItems.value = menuItems.value.filter((item) => item.name !== 'Home')

// 如果有groupingConfig，則將menuItems分組至groupItems
const groupItems = ref([])
if (props.groupingConfig) {
  groupItems.value = groupMenuItems(props.groupingConfig, menuItems.value)
}

// 依照props.groupingConfig將menuItems分組至groupItems
function groupMenuItems(config, originMenuItems) {
  const groupItems = []
  config.forEach((element) => {
    groupItems.push({
      groupTitle: element.groupTitle,
      groupChildren: [
        ...originMenuItems.filter((item) => {
          // 如果oneOfGroupChildrenPermitted為true，代表自身route或只要有一個子選單meta.auth不為P，則不顯示整個群組
          return element.groupChildren.includes(item.name) && checkChildIsPermitted(item)
        })
      ]
    })
  })
  return groupItems.filter((v) => v.groupChildren.length > 0)
}

//遞迴檢查自身及子選單的meta.auth是否為P，如果為P則返回false
function checkChildIsPermitted(item) {
  if (item.meta.auth !== undefined && item.meta.auth === 'VE') {
    return true
  }

  if (item.children) {
    return item.children.some((child) => checkChildIsPermitted(child))
  }
  return false
}
</script>

<style lang="scss" scoped>
.w_fit {
  width: fit-content;
}

.mySidebar {
  padding: 16px 0 8px;

  .mySidebar__groupTitle {
    padding: 11px 24px 0;
    min-height: 36px;
  }

  .v-divider--inset:not(.v-divider--vertical) {
    // divider 置中
    margin-inline-start: 20px;
    margin-inline-end: 20px;
  }

  // 底部
  .bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding: 16px 0 0 0;

    .bot__version {
      font-size: 14px;
      color: #424242;
      margin-right: auto;
      width: fit-content;
    }
  }
}
.px-10px {
  padding-left: 10px;
  padding-right: 10px;
}

.px-28px {
  padding-right: 28px;
  padding-left: 28px;
}
</style>
