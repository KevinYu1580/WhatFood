<template>
  <v-combobox v-bind="componentProps" v-model:menu="menuIsOpen" class="mySelect">
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
    <template #append-inner>
      <div class="mySelect__dropArrow" :class="{ 'mySelect__dropArrow--flip': menuIsOpen }">
        <MyIcon name="dropDownArrow" size="24"></MyIcon>
      </div>
    </template>
    <!-- 提示訊息 -->
    <template #message="{ message }" v-if="hasMessage">
      <div class="d-flex justify-start align-center">
        <MyIcon name="warn" size="16" /> {{ message }}
      </div>
    </template>
    <!-- 下拉選單 -->
    <template #item="{ props }">
      <MyListItem v-bind="props" />
    </template>
    <template #no-data> <div class="ml-4">無資料</div> </template>
  </v-combobox>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'

const attrs = useAttrs()

const menuIsOpen = ref(false) // 是否開啟下拉選單

// Vuetify 提供的props
const props = defineProps({
  // type 請傳入以下
  // search
  // password
  // text
  type: {
    type: String
  },
  items: {
    type: Array,
    required: true
  },

  'error-messages': {
    type: [String, Array]
  }
})

// 定義預設 Vuetify 提供的props
const defaultProps = ref({
  // 'comfortable'高度為40px，需要利用css覆寫
  density: 'comfortable',
  // 'outlined'為預設樣式
  variant: 'outlined',
  // 'validate-on' 驗證時機預設blur
  'validate-on': 'blur',

  'hide-details': 'auto',

  // 'base-color': 'primary',

  clearable: false

  // color: 'primary-dark'
})

const componentProps = computed(() => {
  return {
    ...defaultProps.value, //預設 Vuetify 提供的props
    ...attrs, //外部傳入的props
    ...props
  }
})

const hasMessage = computed(() => {
  return !!props.errorMessages
})
</script>

<style lang="scss" scoped>
// input高度
$inputHeight: 44px;

// input左右padding
$inputPadding: 12px;

// hover時的border寬度
$hoverBorderWidth: 2px;

// **input 一般狀態:
// *字體顏色
$color: rgb(var(--v-theme-black-tone-30));
// *border & icon顏色
$iconBorder_color: rgb(var(--v-theme-primary-color));
// 背景色
$bgColor: rgb(var(--v-theme-white));

// *input disable狀態:
// 字體 & border & icon 顏色
$disabledColor: rgb(var(--v-theme-black-tone-60));
$disabledBgColor: rgb(var(--v-theme-black-tone-90));

// *input error狀態:
// 字體 & border & icon 顏色
$errorColor: rgb(var(--v-theme-alert-color-default));
$errorBgColor: rgb(var(--v-theme-white));

/** 下拉模糊搜尋組件請注意：
  1. input本身的文字跟按下下拉選單的選項後(v-combobox__selection-text)是不同的
  2. 因為牽扯到icon字體要變色等等需求，一致主要使用css控制樣式，避免邏輯混亂，不使用vuetify本身提供的props做修改

*/

.v-input {
  position: relative;
  border-radius: 20px;

  // 改input 外的outline
  :deep(.v-field__outline) {
    // vuetify 內置的變數，會將輸入框的顏色變淺，設置為1即可保持原色
    --v-field-border-opacity: 1;
    color: $iconBorder_color;
  }

  :deep(.v-field__append-inner) {
    color: $iconBorder_color;
  }

  :deep(.v-input__control) {
    * {
      opacity: 1 !important;
      // color: $iconBorder_color;
    }

    .v-combobox__selection-text {
      opacity: 0 !important;
    }

    // input高度
    .v-field__input {
      padding-left: $inputPadding;
      min-height: $inputHeight !important;
      height: $inputHeight !important;
    }
    .v-field {
      background-color: $bgColor;
    }

    input {
      // opacity: 1 !important;
      @include input;
      color: $color;
    }

    // 右側
    .v-field--appended {
      padding-right: $inputPadding;
    }

    // 將vuetify預設的icon隱藏
    .mdi-menu-down {
      display: none;
    }
  }
  :deep(.v-input__details) {
    min-height: 16px;
    padding-top: 0;
  }

  &:hover:not(.v-input--disabled) {
    :deep(.v-input__control) {
      .v-field__outline__end,
      .v-field__outline__start {
        border-width: $hoverBorderWidth;
      }
      .v-field__outline__end {
        border-inline-start-width: 0;
      }
      .v-field__outline__start {
        border-inline-end-width: 0;
      }
    }
  }
}
// disabled樣式
.v-input--disabled {
  pointer-events: unset !important;

  :deep(.v-input__control) {
    cursor: not-allowed !important;
  }
  :deep(*) {
    color: $disabledColor !important;

    .v-field {
      background-color: $disabledBgColor !important;
    }

    .v-field__outline__end,
    .v-field__outline__start {
      border-width: 1;
    }
  }
}
.v-input--error {
  :deep(*) {
    color: $errorColor !important;

    .v-field {
      background-color: $errorBgColor !important;
    }

    .v-field__outline__end,
    .v-field__outline__start {
      border-width: $hoverBorderWidth;
    }
    .v-field__outline__end {
      border-inline-start-width: 0;
    }
    .v-field__outline__start {
      border-inline-end-width: 0;
    }
  }
}

.mySelect {
  :deep(*) {
    .mySelect__dropArrow {
      transform: rotate(0deg);
      transition: transform 0.15s ease-in-out;
    }
    .mySelect__dropArrow--flip {
      transform: rotate(180deg);
    }
  }
}
</style>
