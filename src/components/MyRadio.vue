<template>
  <v-radio v-bind="componentProps">
    <!-- 將外部slot傳遞 -->
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
    <!-- 提示訊息 -->
    <template #message="{ message }">
      <div class="d-flex justify-start align-center">
        <MyIcon name="warn" size="16" class="error" /> {{ message }}
      </div>
    </template>
  </v-radio>
</template>

<script setup>
import { useAttrs, ref, computed } from 'vue'

const attrs = useAttrs()

// 定義預設 Vuetify 提供的props
const defaultProps = ref({
  color: 'primary-color',
  ripple: true
})

const componentProps = computed(() => {
  return {
    ...defaultProps.value, //預設 Vuetify 提供的props
    ...attrs //外部傳入的props
  }
})
</script>

<style lang="scss" scoped>
//label顏色
$labelColor: rgb(var(--v-theme-label-color));

//radio顏色
$radioColor: rgb(var(--v-theme-primary-color));

//radio顏色--disabled
$radioColorDisabled: rgb(var(--v-theme-black-tone-80));

.v-radio {
  opacity: 1;
  width: fit-content;
  height: fit-content;

  :deep(.v-label) {
    opacity: 1;
    color: $labelColor !important;
  }
  :deep(.v-selection-control__wrapper) {
    color: $radioColor;
    .v-icon {
      opacity: 1;
    }
  }
}

.v-selection-control--disabled {
  pointer-events: unset;
  cursor: not-allowed !important;
  :deep(*) {
    cursor: not-allowed !important;
  }
  :deep(.v-selection-control__wrapper) {
    color: $radioColorDisabled;
  }
}
</style>
