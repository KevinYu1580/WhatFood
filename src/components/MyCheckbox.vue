<template>
  <v-checkbox v-bind="componentProps" class="myCheckBox">
    <!-- 將外部slot傳遞 -->
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
    <!-- input欄位 -->
    <template #input="{ props, model }">
      <!--
          1. v-model: @object 雙向綁定的值
          2. v-bind="props": @object 額外的props(id, blur(), focus(), etc.，請參考vuetify官網)
          3. :value: @string checkbox的值(將傳遞給v-model的值)
         -->

      <div class="myCheckBox__inputWrapper">
        <input
          class="inputWrapper__instance"
          :checked="model.value"
          type="checkbox"
          v-model="myModel"
          v-bind="props"
          :value="attrs.value"
          :disabled="attrs.disabled"
          :indeterminate="indeterminate"
        />
        <label class="inputWrapper__labelBox" :for="props.id">
          <!-- 橫槓icon(indeterminate狀態) -->
          <MyIcon v-if="indeterminate" name="dash" size="24" class="white" />
          <!-- 打勾icon -->
          <MyIcon v-else-if="model.value" name="check" size="24" class="white" />
        </label>
      </div>
    </template>
    <!-- 提示訊息 -->
    <template #message="{ message }">
      <div class="d-flex justify-start align-center">
        <MyIcon name="warn" size="16" class="error" /> {{ message }}
      </div>
    </template>
  </v-checkbox>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  indeterminate: Boolean
})

const defaultProps = ref({
  density: 'default',

  ripple: true,
  'hide-details': 'auto'
})

const componentProps = computed(() => {
  return { ...defaultProps.value, ...attrs, ...props }
})

const myModel = defineModel()
</script>

<style lang="scss" scoped>
//label顏色
$labelColor: rgb(var(--v-theme-label-color));

// 寬度高度
$checkboxSize: 24px;

$checkboxBGColor: rgb(var(--v-theme-primary-color)); // checkbox背景顏色
$checkboxBorderColor: rgb(var(--v-theme-primary-color)); // checkbox邊框顏色

$checkboxBGColorHover: rgb(var(--v-theme-primary-color-dark)); //hover時的背景顏色
$checkboxBorderColorHover: rgb(var(--v-theme-primary-color-dark)); //hover時的邊框顏色

$checkboxBGColorDisabled: rgb(var(--v-theme-black-tone-90)); // disabled時的背景顏色
$checkboxBorderColorDisabled: rgb(var(--v-theme-black-tone-80)); // disabled時的邊框顏色

// 圓角
$checkboxBorderRadius: var(--v-corner-radius-sm);

.myCheckBox {
  width: fit-content;
  height: fit-content;
  display: block;
  :deep(.v-input__control) {
    .v-selection-control--disabled,
    .v-label {
      opacity: 1; //將disabled的預設透明度調整為1
      color: $labelColor;
    }
    .v-selection-control {
      min-height: unset;
    }
  }
  :deep(.v-input__details) {
    min-height: 16px;
    padding-top: 0;
  }
}

.myCheckBox__inputWrapper {
  .inputWrapper__labelBox {
    width: $checkboxSize;
    height: $checkboxSize;
    border: 2px solid $checkboxBorderColor;
    border-radius: $checkboxBorderRadius;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: rgb(var(--v-theme-white));
  }
  // input本體
  .inputWrapper__instance {
    display: none;
    // 已打勾
    &:checked,
    &:indeterminate {
      + .inputWrapper__labelBox {
        background: $checkboxBGColor;
        border-color: $checkboxBorderColor;
        &:hover {
          background: $checkboxBGColorHover;
          border-color: $checkboxBorderColorHover;
        }
      }
    }
  }
}
// disabled樣式
.v-input--disabled {
  pointer-events: unset;
  cursor: not-allowed !important;
  :deep(.inputWrapper__instance) {
    + .inputWrapper__labelBox {
      background: $checkboxBGColorDisabled;
      border-color: $checkboxBorderColorDisabled;
    }
    &:checked,
    &:indeterminate {
      + .inputWrapper__labelBox {
        background: $checkboxBorderColorDisabled;
        border-color: $checkboxBorderColorDisabled;
      }
    }
  }
}
</style>
