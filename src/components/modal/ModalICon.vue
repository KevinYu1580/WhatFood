<template>
  <component :is="svgName" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

// 動態引入svg 根據此路徑去設定名稱
const svgName = defineAsyncComponent(() => import(`@/assets/images/modalIcon/${props.name}.svg`))
</script>

<style lang="scss" scoped></style>
