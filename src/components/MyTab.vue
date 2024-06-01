<template>
  <v-tab class="MyTab" v-bind="componentProps">
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
  </v-tab>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'

// 定義預設 Vuetify 提供的props
const defaultProps = ref({
  rounded: 't-lg',
  'base-color': 'white',
  'slider-color': 'primary-color',
  width: '128',
  variant: 'elevated',
  'selected-class': 'activeTab',
  'hide-slider': false,
  elevation: 2
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
.MyTab {
  background-color: rgb(var(--v-theme-white)) !important;
  color: rgb(var(--v-theme-tab-default)) !important;
  border-bottom: 2px solid rgb(var(--v-theme-tab-default));

  & + .v-btn--disabled {
    border-color: rgb(var(--v-theme-tab-disable)) !important;
    color: rgb(var(--v-theme-tab-disable)) !important;
    background-color: rgb(var(--v-theme-tab-disable-bg)) !important;
    pointer-events: unset;
    cursor: not-allowed;
  }
}

.activeTab {
  background-color: rgb(var(--v-theme-tab-active-bg)) !important;
  color: rgb(var(--v-theme-tab-active)) !important;
  border-bottom: 2px solid rgb(var(--v-theme-tab-active));
}
</style>
