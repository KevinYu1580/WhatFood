<template>
  <!--
    1.attrs: 父層所有的props
    2.color: 顏色
    3.hide-details="auto": 是否顯示詳細資訊(如hint, error-message有值時才會顯示)
    4.density="compact": 垂直高度
    5.inset: 是否內縮
    6.ripple: 是否有波紋效果
    7.@update:modelValue: 當modelValue改變時觸發
   -->
  <!-- <v-switch
    v-bind="attrs"
    hide-details="auto"
    class="mySwitch"
    :class="{ 'mySwitch--off': !checkModel, [styleClass]: true }"
    :color="color"
    :ripple="true"
    density="default"
    inset
    @update:modelValue="onUpdateModelValue($event)"
  > -->
  <v-switch
    v-bind="attrs"
    hide-details="auto"
    class="mySwitch"
    :class="{ 'mySwitch--off': !checkModel, [styleClass]: true }"
    :color="color"
    :ripple="true"
    density="default"
    inset
    v-model="model"
  >
    <!-- 將父層所有的slot傳入v-btn -->
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
    <!-- 圓圈 -->
    <template #thumb>
      <div v-if="withIcon">
        <MyIcon v-show="checkModel" size="20" name="check" class="primary"></MyIcon>
        <MyIcon v-show="!checkModel" size="20" name="cross" class="white"></MyIcon>
      </div>
    </template>
    <!-- 提示訊息 -->
    <template #message="{ message }">
      <div class="d-flex justify-start align-center">
        <MyIcon name="warn" size="16" class="error" /> {{ message }}
      </div>
    </template>
  </v-switch>
</template>

<script setup>
import { ref, useAttrs, onMounted, computed } from 'vue'
const attrs = useAttrs()

const props = defineProps({
  color: {
    type: String,
    default: 'primary-color'
  },
  // 圓圈內是否顯示icon
  withIcon: {
    type: Boolean,
    default: false
  }
})

const styleClass = computed(() => {
  return `mySwitch--${props.color}`
})

//檢查該switch當前是否被打開(檢查modelValue是否等於value，如果是則為true，否則為false)

const model = defineModel() //與外部的modelValue雙向綁定

//檢查modelValue是否為打開狀態
const checkModel = computed(() => {
  if (Array.isArray(model.value)) {
    return Object.values(model.value).some((item) => item == attrs['value'])
  } else {
    return model.value == attrs['true-value'] || model.value == attrs['value']
  }
})
</script>

<style lang="scss" scoped>
//label顏色
$labelColor: rgb(var(--v-theme-label-color));

// switch外層高度(swithc本體高度請至style/vuetify/setting.scss中設定)
$switchWrapperHeight: fit-content;
$switchWidth: 64px;

// border顏色
$borderColorOn--primary: rgb(var(--v-theme-primary-color));
$borderColorOn--secondary: rgb(var(--v-theme-secondary-color));
$borderColorOff: #757575;

// 圈圈樣式
// (圈圈大小請至style/vuetify/setting.scss設定)
$thumbColorOff: #757575;
$thumbColorOn: #fff;

// switch通用樣式
.mySwitch {
  width: fit-content;
  height: $switchWrapperHeight;

  :deep(.v-label) {
    opacity: 1;
    color: $labelColor !important;
  }
  // thumb樣式
  :deep(.v-input__control) {
    height: $switchWrapperHeight;

    .v-selection-control {
      min-height: auto;
    }
    // 基底
    .v-switch__track {
      background-color: rgb(var(--v-theme-white));
      // width: $switchWidth;
    }
    .v-switch__thumb {
      background-color: $thumbColorOn;
    }
  }
}
.v-input--disabled {
  pointer-events: unset !important;
  cursor: not-allowed !important;
}

// primary樣式
.mySwitch--primary-color {
  :deep(.v-input__control) {
    // 基底
    .v-switch__track {
      border: 2px solid $borderColorOn--primary;
    }
  }
}

// secondary樣式
.mySwitch--secondary-color {
  :deep(.v-input__control) {
    // 基底
    .v-switch__track {
      border: 2px solid $borderColorOn--secondary;
    }
  }
}

// 停用狀態
.mySwitch--off {
  :deep(.v-input__control) {
    .v-switch__track {
      background-color: rgb(var(--v-theme-white));
      border: 2px solid $borderColorOff;
    }
    .v-switch__thumb {
      background-color: $thumbColorOff;
    }
  }
}

// 軌道上的文字(啟用狀態)
// .mySwitch__trackText--on {
//   color: $thumbColorOn;
//   text-align: left;
// }

// // 軌道上的文字(停用狀態)
// .mySwitch__trackText--off {
//   color: $thumbColorOff;
//   text-align: right;
// }
</style>
