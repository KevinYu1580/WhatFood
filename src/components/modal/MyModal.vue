<template>
  <v-dialog
    @afterLeave="afterLeave(nowHandleType)"
    v-model="appStore.showModal"
    v-bind="defaultDialogProps"
  >
    <template #default>
      <!-- 跳窗本體 -->
      <v-card class="py-12 flex-column align-center px-6">
        <!--icon 容器-->
        <v-card-item v-if="hasIcon" class="d-flex justify-center align-center iconWrapper pa-0">
          <ModalICon :name="appStore.currentModal.icon" />
        </v-card-item>

        <!-- 跳窗文字區 -->
        <v-card-item class="d-flex justify-center align-center pa-0 mt-5" v-if="!isEmptyContent">
          <!-- 標題 -->
          <v-card-title v-if="appStore.currentModal.title" class="text-center pa-0 modal__title">{{
            appStore.currentModal.title
          }}</v-card-title>
          <!-- 內文 -->
          <v-card-text v-if="appStore.currentModal.text" class="pa-0 text-center modal__text mt-2">
            <p v-html="appStore.currentModal.text"></p>
          </v-card-text>
        </v-card-item>

        <!-- 按鈕 -->
        <v-card-actions v-if="hasButton" class="pa-0 mt-5 ga-4">
          <!-- 取消按鈕 -->
          <MyButton
            v-if="appStore.currentModal.cancelText"
            :color="appStore.currentModal.cancelColor"
            :variant="appStore.currentModal.cancelType"
            size="default"
            @click.prevent="handleClick('cancel')"
          >
            <template #default>{{ appStore.currentModal.cancelText }}</template>

            <template #append v-if="appStore.currentModal.cancelIcon">
              <MyIcon
                :name="appStore.currentModal.cancelIcon"
                :class="appStore.currentModal.cancelIconColor"
              />
            </template>
          </MyButton>

          <!-- 確認按鈕 -->
          <MyButton
            v-if="appStore.currentModal.confirmText"
            :color="appStore.currentModal.confirmColor"
            :variant="appStore.currentModal.confirmType"
            size="default"
            @click.prevent="handleClick('confirm')"
          >
            <template #default>{{ appStore.currentModal.confirmText }}</template>

            <template #append v-if="appStore.currentModal.confirmIcon">
              <MyIcon
                :name="appStore.currentModal.confirmIcon"
                :class="appStore.currentModal.confirmIconColor"
              />
            </template>
          </MyButton>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { computed, watch, ref } from 'vue'

const appStore = useAppStore()

const defaultDialogProps = computed(() => ({
  // 最大寬度
  'max-width': '360',
  // 遮罩背景色
  scrim: 'rgba(0, 0, 0, 0.5)',

  // 禁止點擊跳窗背景關閉
  persistent: true,

  // 禁止點擊跳窗背景關閉
  'no-click-animation': true,

  // 是否teleport到body (false: 預設teleport到body)
  attach: false
}))

// 防呆用，判斷是否有標題或內文
const isEmptyContent = computed(() => {
  return appStore.currentModal.title || appStore.currentModal.text ? false : true
})

// 防呆用，判斷是否有icon
const hasIcon = computed(() => {
  return appStore.currentModal.icon ? true : false
})

// 使用 appStore中 btnText 判斷是否有按鈕
const hasButton = computed(() => {
  return appStore.currentModal?.cancelText || appStore.currentModal?.confirmText ? true : false
})

// 使用 appStore中 btnText 判斷是否有跳窗文字
const hasText = computed(() => {
  return appStore.currentModal?.text ? true : false
})

// 目前跳窗處理function的類型
const nowHandleType = ref('')

const handleClick = (type) => {
  const clickFunctionMapping = {
    cancel: appStore.currentModal.cancelHandler,
    confirm: appStore.currentModal.funcHandler
  }

  // 依照不同情境執行不同動作
  if (typeof clickFunctionMapping[type] === 'function') {
    nowHandleType.value = type
  } else if (clickFunctionMapping[type]) {
    // 如果有傳入值，但不是function console提示，如無傳入值不提示，直接關閉跳窗
    console.error('funcHandler或cancelHandler請傳入function')
  }

  // 預設關閉跳窗
  appStore.closeModal()
}

// 跳窗關閉後執行
function afterLeave(nowHandleType) {
  // 依照不同情境執行不同動作
  switch (nowHandleType) {
    // 確認按鈕
    case 'confirm':
      if (appStore.currentModal.funcHandler) appStore.currentModal.funcHandler()
      break
    case 'cancel':
      if (appStore.currentModal.cancelHandler) appStore.currentModal.cancelHandler()
      break
    case 'autoClose':
      if (appStore.currentModal.funcHandler) appStore.currentModal.funcHandler()
      break

    default:
      break
  }

  // 關閉跳窗後清空跳窗資料
  appStore.clearModal()
}

// 判斷是否自動關閉跳窗
watch(
  () => appStore.showModal,
  (showModal) => {
    // 有按鈕跳窗，不執行任何動作
    if (!showModal || hasButton.value) return

    // 用於儲存按鈕後的成功、失敗
    const shortTimer = 1500
    // 用於有詳細說明的跳窗
    const longTimer = 3000

    // 只有標題，沒有文字跳窗，1.5秒後自動關閉
    // 有標題，有文字跳窗，3秒後自動關閉
    setTimeout(
      () => {
        nowHandleType.value = 'autoClose'
        appStore.closeModal()
      },
      hasText.value ? longTimer : shortTimer
    )
  }
)
</script>

<style lang="scss" scoped>
// icon容器大小
$icon-wrap-size: 120px;

// 標題顏色
$title-color: rgb(var(--v-theme-black-tone-10));

// 內文顏色
$text-color: rgb(var(--v-theme-black-tone-30));

// Vuetify 預設樣式
.v-card-actions .v-btn ~ .v-btn:not(.v-btn-toggle .v-btn) {
  margin-inline-start: 0;
}

.v-card-actions {
  min-height: unset;
}

.v-dialog > .v-overlay__content > .v-card {
  border-radius: var(--v-corner-radius-md);
  box-shadow: var(--v-elevation-level-3);
}

// 跳窗中圖標大小
:deep(.v-card) {
  .v-card-item.iconWrapper {
    .v-card-item__content {
      width: $icon-wrap-size !important;
      height: $icon-wrap-size !important;
    }
  }
}

// 跳窗標題
.modal__title {
  @include dialogTitle;
  color: $title-color;
}

// 跳窗內文
.modal__text {
  @include dialogContent;
  color: $text-color;
  line-height: 150% !important;
}
</style>
