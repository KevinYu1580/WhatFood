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
})

const defaultAttrs = {
  elevation: 2
}

// // 綁到模板上的attrs
const componentProps = computed(() => {
  return { ...defaultAttrs, ...props }
})
</script>
