<template>
  <!-- 如果屬性為所有按鈕通用，直接放template上即可 -->
  <v-btn v-bind="componentProps">
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
  }

  // 請依照設計規範的原件樣式名稱傳入以下
  // filled
  // outline
  // fab
  // text
  // variant: {
  //   type: String,
  //   default: 'filled'
  // },
  // 請依照設計規範的原件樣式名稱傳入以下
  // 1.  x-small*目前設計稿無此尺寸
  // 2.  small 對應設計搞小按鈕
  // 3.  default 對應設計搞中按鈕
  // 4.  large 對應設計搞大按鈕
  // 5.  x-large *目前設計稿無此尺寸
  // size: {
  //   type: String,
  //   default: 'large'
  // }
})

// 因設計稿對於button名稱與vuetify官方定義不同，故使用以下對照物件映射到模板上的attrs
// const variantMapping = {
//   filled: 'elevated',
//   outline: 'outlined',
//   fab: 'text',
//   text: 'text'
// }

// const defaultProps = ref({
//   'min-width': 'fit-content'
// })

// // 綁到模板上的attrs
const componentProps = computed(() => {
  return { ...props }
})
</script>
