<template>
  <v-btn v-bind="componentProps">
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
  </v-btn>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'

// 定義預設 Vuetify 提供的props
const defaultProps = ref({
  width: '140',
  color: 'primary-color',
  rounded: 'lg',
  size: 'small',
  mandatory: true
})

const attrs = useAttrs()

const props = defineProps({})

const componentProps = computed(() => {
  return {
    ...defaultProps.value, //預設 Vuetify 提供的props
    ...attrs, //外部傳入的props
    ...props
  }
})
</script>

<style lang="scss" scoped>
.v-btn--active {
  // background-color: rgb(var(--v-theme-tab-active-bg)) !important;
  // color: rgb(var(--v-theme-tab-default)) !important;
}
.v-btn--disabled.v-btn {
  background-color: rgb(var(--v-theme-tab-disable-bg)) !important;
  color: rgb(var(--v-theme-tab-disable)) !important;
  pointer-events: unset;
  cursor: not-allowed;
}
</style>
