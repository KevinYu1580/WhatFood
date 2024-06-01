<template>
  <v-radio-group class="MyRadioGroup" v-bind="componentProps">
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
  </v-radio-group>
</template>

<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()

const defaultProps = {
  'hide-details': 'auto'
}

const componentProps = {
  ...defaultProps,
  ...attrs
}
</script>

<style lang="scss" scoped>
.v-input {
  width: fit-content;
  :deep(.v-input__details) {
    min-height: 16px;
    padding: 0;
  }
}
</style>
