<template>
  <!--
    DESCRIPTION: 菜單選項
    1. 如權限auth為P & children route底下沒有任何可查看頁面，則不渲染

   -->
  <div
    class="sidebarListItem"
    :class="{ 'sidebarListItem--closed': !appStore.sidebarExpand }"
    v-if="menuItem.meta.auth !== 'P' && oneOfChildrenPermitted"
  >
    <!-- tooltip -->
    <v-tooltip v-if="showTooltip" activator="parent" location="end">{{
      menuItem.meta.sidebar.title
    }}</v-tooltip>
    <!--
      DESCRIPTION:側欄選單項目

      1. click.prevent.stop: 如果route有component元件，則導航，反之為控制收合
      2. link: 控制點擊後是否導航
      3. to: 導航路徑
     -->

    <div
      @click.prevent.stop="menuItem.component ? null : appStore.sidebarExpand ? toggleOpen() : null"
    >
      <v-list-item
        v-if="menuItem.meta.sidebar.show"
        :active="isActive"
        :link="!!menuItem.component"
        :to="{ name: menuItem.name }"
        class="sidebarListItem__item"
        :class="{ 'cursor-auto': !menuItem.component && !appStore.sidebarExpand }"
      >
        <!-- 頁面icon -->
        <!-- <template #prepend>
          <div class="item__icon" :class="{ 'bg-black-tone-95': menuItem.meta.sidebar.icon }">
            <MyIcon v-if="menuItem.meta.sidebar.icon" :name="menuItem.meta.sidebar.icon"></MyIcon>
          </div>
        </template> -->
        <!-- 頁面名稱標題 -->
        <template #title>
          <!-- 標題 -->
          <div class="ml-2" v-show="appStore.sidebarExpand">
            {{ menuItem.meta.sidebar.title }}
          </div>
        </template>
        <!-- 下拉icon -->
        <template #append>
          <div
            v-if="!menuItem.component"
            v-show="appStore.sidebarExpand"
            class="item__selectIcon ml-auto"
            :class="{ 'rotate-180': !isOpen }"
          >
            <MyIcon name="dropDownArrow"></MyIcon>
          </div>
        </template>
      </v-list-item>
    </div>

    <Transition name="sideBarItem">
      <div
        v-if="menuItem.children"
        v-show="isOpen && appStore.sidebarExpand"
        class="sidebarListItem__childrenWrapper"
      >
        <SidebarListItem
          v-for="childItem in menuItem.children"
          :menuItem="childItem"
          :key="childItem.name"
          :sidebarOpened="sidebarOpened"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { useAppStore } from '@/stores/appStore'
import { storeToRefs } from 'pinia'

import { useDisplay } from 'vuetify/lib/framework.mjs'

import { useRoute } from 'vue-router/dist/vue-router'

const route = useRoute()

// vuetify RWD functions
const { mobile } = useDisplay()

const appStore = useAppStore()

// --- 菜單控制 ---
const { sidebarSetting } = storeToRefs(appStore)

const props = defineProps(['menuItem', 'sidebarOpened'])

// menuItem是否為active狀態
const isActive = computed(() => {
  if (props.menuItem.meta.breadcrumb.length === 0) return false

  return props.menuItem.meta.breadcrumb[0].href === route.meta.breadcrumb[0].href
})

// 監聽子選單內是否有可查看頁面
const oneOfChildrenPermitted = computed(() => {
  // 如果沒有子選項，則返回true
  if (!props.menuItem.children) {
    return true
  }

  // 如果有子選項，則檢查每個子選項，只要有一個子選項的auth為不是P，則返回true
  return props.menuItem.children.some((child) => child.meta.auth !== 'P')
})

//預設不展開
const isOpen = ref(false)

// 打開子選單
function toggleOpen() {
  isOpen.value = !isOpen.value
}

// 是否顯示tooltip
const showTooltip = computed(() => {
  // 未展開且不可收合才顯示tooltip
  return !appStore.sidebarExpand && !sidebarSetting.value.enableToggle
})
</script>
<script>
export default {
  name: 'SidebarListItem'
}
</script>

<style lang="scss" scoped>
.sidebarListItem {
  .sidebarListItem__item {
    position: relative;
    min-height: unset;
    padding: 16px 8px 16px 20px;
    cursor: pointer;
    color: rgb(var(--v-theme-label-color));
    @mixin itemIcon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.15s ease-in-out;
      border-radius: 6px;
      // icon 繼承顏色
      color: rgb(var(--v-theme-black-tone-30));
    }
    .item__icon {
      @include itemIcon;
    }
    .item__selectIcon {
      @include itemIcon;
      background: transparent;
    }
    .item__icon--flip {
      transform: rotate(180deg);
    }
  }

  // hover
  .sidebarListItem__item:not(.v-list-item--active):hover {
    background: rgb(var(--v-theme-black-tone-95));
    color: rgb(var(--v-theme-primary-color-dark));
    .item__icon {
      background: rgb(var(--v-theme-black-tone-95));
    }
  }

  // active
  .sidebarListItem__item.v-list-item--active {
    background: rgb(var(--v-theme-secondary-color));
    color: rgb(var(--v-theme-black-tone-95));

    &:before {
      content: '';
      display: block;
      position: absolute;
      border-radius: 100px 0px 0px 100px;
      background-color: rgb(var(--v-theme-primary-color));
      width: 4px;
      height: 32px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    .item__icon {
      background: rgb(var(--v-theme-primary-color-tint));
      color: rgb(var(--v-theme-primary-color-dark));
    }
  }

  .sidebarListItem__childrenWrapper {
    overflow: hidden;
  }
}

.sidebarListItem--closed {
  .sidebarListItem__item {
    padding: 8px 12px;
  }
}

// v transition
.sideBarItem-enter-active,
.sideBarItem-leave-active {
  overflow: hidden;
  transition:
    max-height 0.4s ease-in-out,
    opacity 0.2s ease-in-out;
}

.sideBarItem-enter-from,
.sideBarItem-leave-to {
  max-height: 0;
  opacity: 0;
}

.sideBarItem-leave-from,
.sideBarItem-enter-to {
  max-height: 500px;
  opacity: 1;
}
</style>
