<template>
  <!--
    1. rounded: @boolean 是否要圓角
    2. validate-on: @string 驗證時機(詳細請參考uetify官網)，預設為blur
   -->
  <v-text-field ref="inputRef" v-bind="componentProps" :type="inputType">
    <!-- 將外部slot傳遞 -->
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
    <template #prepend-inner="{ isFocused }">
      <div class="mr-2" v-if="setting.prependInnerIcon">
        <MyIcon :name="setting.prependInnerIcon" size="24" />
      </div>
    </template>
    <template #append-inner="{ isFocused }">
      <div @click.prevent="passwordClick" class="ml-2" v-if="setting.appendInnerIcon">
        <MyIcon
          :name="setting.appendInnerIcon"
          size="24"
          :class="[{ 'cursor-pointer': type === 'password' }]"
        />
      </div>
    </template>
    <!-- 提示訊息 -->
    <template #message="{ message }">
      <div class="d-flex justify-start align-center">
        <MyIcon name="warn" size="16" class="error" /> {{ message }}
      </div>
    </template>
  </v-text-field>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'

const attrs = useAttrs()

const inputRef = ref(null) //input instance

// Vuetify 提供的props
const props = defineProps({
  // type 請傳入以下
  // search
  // password
  // text
  // date
  type: {
    type: String,
    validator: (value) => ['search', 'password', 'text', 'date'].includes(value)
  }
})

// 決定input的type，因為傳入的type為date會有預設的樣式，所以在這邊轉為text
const inputType = computed(() => {
  return props.type === 'date' ? 'text' : props.type
})

// 依照prop.type產生不同的icon
const iconTypeGenerator = (type) => {
  switch (type) {
    case 'search':
      return {
        appendInnerIcon: null,
        prependInnerIcon: 'magnifier'
      }
    case 'password':
      return {
        appendInnerIcon: 'eyeClose',
        prependInnerIcon: null
      }

    case 'text':
      return {
        appendInnerIcon: null,
        prependInnerIcon: null
      }

    case 'date':
      return {
        appendInnerIcon: 'calendar',
        prependInnerIcon: null
      }

    default:
      return {
        appendInnerIcon: null,
        prependInnerIcon: null
      }
  }
}
const setting = ref(iconTypeGenerator(props.type))

// 針對password icon的點擊事件
const passwordClick = () => {
  // 只能給password icon做點擊
  if (props.type !== 'password') return

  setting.value.appendInnerIcon =
    setting.value.appendInnerIcon === 'eyeOpen' ? 'eyeClose' : 'eyeOpen'

  inputRef.value.type = inputRef.value.type === 'text' ? 'password' : 'text'
}

// 定義預設 Vuetify 提供的props
const defaultProps = ref({
  // 'comfortable'高度為40px，需要利用css覆寫
  density: 'comfortable',
  // 'outlined'為預設樣式
  variant: 'outlined',
  // 'validate-on' 驗證時機預設blur
  'validate-on': 'blur',
  'hide-details': 'auto'
})

const componentProps = computed(() => {
  return {
    ...defaultProps.value, //預設 Vuetify 提供的props
    ...attrs, //外部傳入的props
    ...props
  }
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

.v-input {
  position: relative;
  border-radius: 20px;
  :deep(.v-input__control) {
    * {
      opacity: 1 !important;
      color: $iconBorder_color;
    }

    // input高度
    .v-field__input {
      min-height: $inputHeight !important;
      height: $inputHeight !important;
    }
    .v-field {
      background-color: $bgColor;
    }

    // input padding 此處的padding是控制 '真正'input的padding 頁面上呈現的outline padding 是透過v-field--appended v-field--prepended 內的padding 控制
    input {
      padding-inline: 0px 0px;
      color: $color;
      @include input; //src: style/base/mixin
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
</style>
