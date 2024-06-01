<template>
  <!-- 如果屬性為所有按鈕通用，直接放template上即可 -->
  <v-btn v-bind="componentProps" :class="['myButton', styleClass, sizeClass, typeClass]">
    <!-- 將父層所有的slot傳入v-btn -->
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
  </v-btn>
</template>

<script setup>
import { useAttrs, computed, ref } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  // 請依照設計規範的原件樣式名稱傳入以下:
  // primary-color
  // secondary-color
  color: {
    type: String,
    default: 'primary-color'
  },

  // 請依照設計規範的原件樣式名稱傳入以下
  // filled
  // outline
  // fab
  // text
  variant: {
    type: String,
    default: 'filled'
  },
  // 請依照設計規範的原件樣式名稱傳入以下
  // 1.  x-small*目前設計稿無此尺寸
  // 2.  small 對應設計搞小按鈕
  // 3.  default 對應設計搞中按鈕
  // 4.  large 對應設計搞大按鈕
  // 5.  x-large *目前設計稿無此尺寸
  size: {
    type: String,
    default: 'large'
  }
})

// 因設計稿對於button名稱與vuetify官方定義不同，故使用以下對照物件映射到模板上的attrs
const variantMapping = {
  filled: 'elevated',
  outline: 'outlined',
  fab: 'text',
  text: 'text'
}

const defaultProps = ref({
  'min-width': 'fit-content'
})

// 綁到模板上的attrs
const componentProps = computed(() => {
  return { ...defaultProps.value, ...attrs, ...props, variant: variantMapping[props.variant] }
})

// 渲染到模板上的按鈕class
const styleClass = computed(() => {
  return `myButton--${props.color}`
})

const sizeClass = computed(() => {
  return `myButton--${props.size}`
})

const typeClass = computed(() => {
  return `myButton--${props.variant}`
})
</script>

<style lang="scss" scoped>
// disable樣式
$disabledBackground: rgb(var(--v-theme-button-disable));

// outline & fab的背景色
$outline_Fab_BG: rgb(var(--v-theme-white));

// append & prepend slot間距
$appendPrependGap: 8px;

.myButton {
  width: fit-content;
  text-transform: none; //預防v-btn的文字自動轉大寫;
  transition: 0.3s;
}
:deep(.v-btn__content) {
  gap: 8px;
}

:deep(.v-btn__append) {
  padding-left: $appendPrependGap;
  margin-inline: unset;
}
:deep(.v-btn__prepend) {
  padding-right: $appendPrependGap;
  margin-inline: unset;
}

// color(針對專案顏色個別設定)
.myButton--primary-color {
  // 強制將v-icon的顏色改為primary顏色
  :deep(svg) {
    color: rgb(var(--v-theme-primary-button-default)) !important;
  }
  &:hover,
  &:focus,
  &:active {
    color: rgb(var(--v-theme-primary-button-hover)) !important;
    background: rgb(var(--v-theme-primary-button-hover)) !important;
    :deep(svg) {
      color: rgb(var(--v-theme-primary-button-hover)) !important;
    }
  }
}
.myButton--secondary-color {
  // 強制將v-icon的顏色改為secondary顏色
  :deep(svg) {
    color: rgb(var(--v-theme-secondary-button-default)) !important;
  }
  &:hover,
  &:focus,
  &:active {
    color: rgb(var(--v-theme-secondary-button-hover)) !important;
    background: rgb(var(--v-theme-secondary-button-hover)) !important;
    :deep(svg) {
      color: rgb(var(--v-theme-secondary-button-hover)) !important;
    }
  }
}

// variant(針對按鈕樣式個別設定)
.myButton--filled {
  :deep(svg) {
    color: rgb(var(--v-theme-white)) !important;
  }
  &:hover,
  &:focus,
  &:active {
    box-shadow: var(--v-elevation-level-1) !important;
    color: rgb(var(--v-theme-white)) !important;
    :deep(svg) {
      color: rgb(var(--v-theme-white)) !important;
    }
  }
  &:disabled {
    box-shadow: unset !important;
  }
}
.myButton--outline {
  background: $outline_Fab_BG !important;

  &:hover {
    box-shadow: var(--v-elevation-level-1) !important;
    background: $outline_Fab_BG !important;
  }
  &:focus {
    box-shadow: unset !important;
    background: $outline_Fab_BG !important;
  }
  &:disabled {
    box-shadow: unset !important;
  }
}
.myButton--fab {
  background: $outline_Fab_BG !important;
  box-shadow: var(--v-elevation-level-3) !important;
  &:hover {
    box-shadow: var(--v-elevation-level-4) !important;
    background: $outline_Fab_BG !important;
  }
  &:focus {
    box-shadow: var(--v-elevation-level-3) !important;
    background: $outline_Fab_BG !important;
  }
  &:disabled {
    box-shadow: var(--v-elevation-level-3) !important;
  }
}

// size(針對按鈕大小個別設定)
.myButton--small {
  padding: 0 8px;
  font-size: 12px;
}
.myButton--default {
  padding: 0 8px;
}
.myButton--large {
  padding: 0 12px;
  font-size: 16px;
}

// 按鈕通用disabled樣式
.myButton {
  &:disabled {
    pointer-events: unset !important;
    cursor: not-allowed !important;
    background-color: $disabledBackground !important;
    color: rgb(var(--v-theme-button-disable-text)) !important;
    opacity: 1 !important;
    // box-shadow: unset !important;
    // 強制將v-icon的顏色改為disable顏色
    :deep(svg) {
      color: rgb(var(--v-theme-button-disable-text)) !important;
    }
  }
}

.myButton--text {
  &:hover,
  &:focus,
  &:active {
    text-decoration: underline !important;
    background-color: transparent !important;
  }
  &:disabled {
    background-color: transparent !important;

    text-decoration: underline !important;
  }
}
</style>
