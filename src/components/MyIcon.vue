<template>
  <div :style="wrapperDivStyle">
    <component
      v-if="reRenderComponent"
      :is="svgName"
      :width="`${size}`"
      :height="`${size}`"
      :class="props.class"
    />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watch, nextTick, shallowRef } from 'vue'

// 關閉繼承屬性
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  // 對應svg檔名
  name: {
    type: String,
    required: true
  },
  // 使用class更改icon顏色 (css 的 color屬性即可改動icon顏色)
  class: {
    type: String,
    default: 'primary'
  },
  // icon大小
  size: {
    type: [Number, String],
    default: 24
  }
})

const reRenderComponent = ref(true)
const svgName = shallowRef(null)

// 強制重新渲染icon
const forceRerender = async (name) => {
  importIcon(name)
  reRenderComponent.value = false

  await nextTick()
  reRenderComponent.value = true
}

// 動態引入svg 根據此路徑去設定名稱
function importIcon(name) {
  svgName.value = defineAsyncComponent(() => import(`../assets/images/icon/${name}.svg`))
}

// 監聽props.name，當props.name改變時，重新渲染icon
watch(
  () => props.name,
  () => forceRerender(props.name),
  { immediate: true }
)

const wrapperDivStyle = ref({
  width: `${props.size}px`,
  height: `${props.size}px`,
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'inherit'
})
</script>

<style lang="scss" scoped>
// 預設icon顏色
.primary {
  color: rgb(var(--v-theme-primary-color));
}

// 提供可以繼承父層的color
.inherit {
  color: inherit;
}

// 錯誤icon顏色
.error {
  color: rgb(var(--v-theme-alert-color-default));
}

// disabled icon顏色
.disabled {
  color: rgb(var(--v-theme-black-tone-60));
}

// 成功icon顏色
.success {
  color: rgb(var(--v-theme-security-color-default));
}

// 白色icon顏色
.white {
  color: rgb(var(--v-theme-white));
}
</style>
