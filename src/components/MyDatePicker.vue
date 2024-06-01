<template>
  <!-- DESCRIPTION: 日曆選擇器
    1. @open: @function 開啟日曆時觸發
    2. :locale: @string 語系
    3. :day-names: @array 星期幾(datepicker的header)
  -->
  <VueDatePicker v-bind="componentProps" @open="open()">
    <!-- format 參考文件：
     https://vue3datepicker.com/props/formatting/
    -->

    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
    <!-- trigger 觸發的目標 -->
    <template #dp-input="{ onInput, value }">
      <MyInput
        type="date"
        :value="value"
        @update:modelValue="onInput(val)"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :error-messages="props.errorMessages"
        :rules="props.rules"
        validate-on="input"
      />
    </template>

    <template #calendar-icon>
      <MyButton width="200px" size="small">返回</MyButton>
    </template>

    <template #clock-icon>
      <MyButton width="200px" size="small">挑選日期</MyButton>
    </template>

    <!-- 日期選單 -->
    <template #month-year="{ month, year, months, years, updateMonthYear, handleMonthYearChange }">
      <div class="dateRangePicker__header d-flex w-100 align-center">
        <button type="button" @click="handleMonthYearChange(false)">
          <MyIcon name="prev" class="primary cursor-pointer" v-ripple></MyIcon>
        </button>

        <div class="d-flex ga-2 w-100">
          <MySelect
            :items="years"
            :model-value="year"
            item-title="text"
            item-value="value"
            bg-color="#f5f5f5"
            hide-details
            @update:modelValue="updateYear($event, updateMonthYear, month)"
          ></MySelect>

          <MySelect
            :items="months"
            :model-value="month"
            item-title="text"
            item-value="value"
            bg-color="#f5f5f5"
            hide-details
            @update:modelValue="updateMonth($event, updateMonthYear, year)"
          ></MySelect>
        </div>

        <button type="button" @click="handleMonthYearChange(true)">
          <MyIcon name="next" class="primary cursor-pointer" v-ripple></MyIcon>
        </button>
      </div>
    </template>

    <template #action-row="{ selectDate, closePicker, disabled }">
      <div class="d-flex ga-4 justify-end w-100">
        <MyButton variant="outline" size="default" @click="closePicker">
          <template #default>取消</template>
          <template #append>
            <MyIcon name="cross"></MyIcon>
          </template>
        </MyButton>
        <MyButton :disabled="disabled" variant="filled" size="default" @click="selectDate">
          <template #default>確認</template>
          <template #append>
            <MyIcon name="check"></MyIcon>
          </template>
        </MyButton>
      </div>
    </template>
  </VueDatePicker>
</template>

<script setup>
import { computed, useAttrs, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import MySelect from './MySelect.vue'
import { zhTW, ja, enUS, ko } from 'date-fns/locale'

import { useLocale } from 'vuetify/lib/framework.mjs'
import { locale } from 'dayjs'
const { current, t } = useLocale()

// 日期header
const weekNames = computed(() => {
  const datsKey = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return datsKey.map((item) => {
    return t(`datePicker.${item}`)
  })
})

const attrs = useAttrs()

const props = defineProps({
  // 是否可以選擇時間
  enableTimePicker: {
    type: Boolean,
    default: false
  },

  // 是否可以選擇時間的秒數
  enableSeconds: {
    type: Boolean,
    default: false
  },

  // 是否為兩個日曆
  multiCalendars: {
    type: Boolean
  },

  placeholder: {
    type: String,
    default: '請輸入'
  },

  disabled: {
    type: Boolean
  },

  errorMessages: {
    type: [String, Array]
  },
  rules: {
    type: Array
  }
})

const defaultProps = ref({
  //位置
  position: 'right',

  // 是否要顯示清除按鈕
  clearable: false,

  // 設定
  config: {
    // 當使用下拉選單時，因為 vuetify會在body層，對於日曆來說會點擊到外部，增加這個設定使日曆不會再下拉選擇時被關閉 (暫時解法)
    onClickOutside: () => true
  },

  // 日曆始終保持六週
  'six-weeks': true,

  // 讓一週從星期日開始
  'week-start': '0',

  // 使用滾輪切換月份
  'month-change-on-scroll': false,

  // 不顯示選擇的日期
  'no-today': true,

  // 設定v-model的值格式與props.format相同
  'model-type': 'format',

  // 日期header
  'day-names': weekNames.value,

  // teleport至body
  teleport: true,

  // 是否可以只選起始日期
  partialRange: false
})

// 語系對應(將vuetify的語系名稱轉換成datepicker的語系名稱或date-fns的語系)
// 1. datepicker採用iso標準，請參考: https://hoohoo.top/blog/national-language-code-table-zh-tw-zh-cn-en-us-json-format/)
// 2. date-fns採用簡寫，請參考: https://date-fns.org/v2.21.3/docs/Locale
const localeMapping = {
  zhHant: {
    datePicker: 'zh-TW',
    dateFns: zhTW
  },
  en: {
    datePicker: 'en-US',
    dateFns: enUS
  },
  js: {
    datePicker: 'ja-JP',
    dateFns: ja
  },
  ko: {
    datePicker: 'ko-KR',
    dateFns: ko
  }
}

const dynamicLocales = computed(() => {
  return {
    locale: localeMapping[current].datePicker, // 語系
    'format-locale': localeMapping[current].dateFns // 日期格式
  }
})

const componentProps = computed(() => {
  return { ...defaultProps.value, ...attrs, ...props, ...dynamicLocales }
})

function open() {
  // 預防位置錯誤
  window.scrollBy(0, -1)
  window.scrollBy(0, 1)
}

// 更新月份
const updateMonth = (event, updateMonthYear, year) => {
  updateMonthYear(event, year)
}
// 更新年份
const updateYear = (event, updateMonthYear, month) => {
  updateMonthYear(month, event)
}

// 做出時間選項 （分鐘and秒）
function createMinuteSecondOptions() {
  const arr = []
  for (let i = 0; i < 60; i++) {
    arr.push({ text: i < 10 ? `0${i}` : i, value: i })
  }
  return arr
}

const hoursArray = computed(() => {
  const arr = []
  for (let i = 0; i < 24; i++) {
    arr.push({ text: i < 10 ? `0${i}` : i, value: i })
  }
  return arr
})
const minuteSelections = computed(() => createMinuteSecondOptions())
const secondSelections = computed(() => createMinuteSecondOptions())

// 是否有時間選項
const hasTimeSelect = computed(() => (props.enableTimePicker ? true : false))

// 是否有秒數選項
const hasSecondSelect = computed(() =>
  props.enableTimePicker && props.enableSeconds ? true : false
)

// 是否為兩個日曆
const isMulti = computed(() => {
  return props.multiCalendars ? true : false
})
</script>

<style lang="scss">
// 以下為套件提供的class & css 變數，如尾端有加上 "(客製)"，代表有依照設計稿修改過的部分

// 主題色文件： https://vue3datepicker.com/customization/theming/
// 套件提供的組件修改變數
:root {
  /*General*/
  // --dp-font-family: -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, oxygen, ubuntu, cantarell,
  //   'Open Sans', 'Helvetica Neue', sans-serif;
  --dp-border-radius: 8px; /*Configurable border-radius （客製）*/
  --dp-cell-border-radius: 8px; /*Specific border radius for the calendar cell*/
  --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

  /*Sizing*/
  --dp-button-height: fit-content; /*Size for buttons in overlays (客製)*/
  --dp-month-year-row-height: 40px; /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
  --dp-cell-size: 32px; /*Width and height of calendar cell （客製）*/
  --dp-cell-padding: 10px; /*Padding in the cell （客製）*/
  --dp-common-padding: 0px; /*Common padding used (客製)*/
  --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
  --dp-menu-min-width: fit-content; /*Adjust the min width of the menu （客製）*/
  --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
  --dp-row-margin: 5px 0; /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 0.5rem; /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 10px; /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px; /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px; /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 16px; /*Menu padding (客製)*/

  /*Font sizes*/
  --dp-font-size: 12px; /*Default font-size (客製) */
  --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
  --dp-time-font-size: 0.8rem; /*Font size in the time picker*/

  /*Transitions*/
  --dp-animation-duration: 0.1s; /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(
    0.4,
    0,
    1,
    1
  ); /*Timing on menu appear animation*/
  --dp-transition-timing: ease-out; /*Timing on slide animations*/

  // 日曆的間距
  --dp-row-margin: 12px 0;

  // footer padding
  --dp-action-row-padding: 12px 16px;
}

// 主題色 (預設套用 .dp__theme_light)
.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: rgb(var(--v-theme-black-tone-30)); // （客製）
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: rgb(var(--v-theme-primary-color)); // (客製)
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
  --dp-loader: 5px solid #1976d2;
}

.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>

<!-- 自定義樣式 -->
<style lang="scss">
// 日曆header（星期）顏色
$headerColor: rgb(var(--v-theme-primary-color));

// 非當月日期格子的文字顏色
$notDateOfCurrentMonth: rgb(var(--v-theme-black-tone-30));

// 起始/結束日期的文字色
$rangeDateTextColor: rgb(var(--v-theme-white));

.dp__main {
  height: fit-content;
  .v-field__input {
    padding: 0;
  }
}

.dp--tp-wrap {
  margin: auto;
}
.dp__btn {
  width: fit-content;
  margin: auto;
  &:hover {
    background-color: transparent;
  }
}

.dateRangePicker__header {
  gap: 3px;
}

.dp__outer_menu_wrap.dp--menu-wrapper {
  // 因為原本預設的z-index 是9999，會遮住vuetify的下拉選單。
  z-index: 1000 !important;

  .dp__menu {
    box-shadow:
      0px 2px 6px 2px #00000026,
      0px 1px 2px 0px #0000004d;
  }

  .dp__calendar_header {
    margin-top: 12px;
  }

  .dp__calendar_header_item {
    // 設計稿 因guideLine caption字型與設定的不同，請依照個別專案進行調整
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    // 設計稿 caption 字體
    color: $headerColor;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dp__cell_inner {
    width: 40px;
  }

  // header下方的分隔線
  .dp__calendar_header_separator {
    display: none;
  }

  .dp__calendar_row {
    // 最後一列的日期 margin
    margin-bottom: 0;
  }

  // 選取其他日期時，當天不要顯示border
  .dp__today {
    border: none;
  }

  // 不是當月份的日期
  .dp__cell_offset {
    color: $notDateOfCurrentMonth;
  }

  // 起始/結束日期文字顏色
  .dp__range_start,
  .dp__range_end {
    color: $rangeDateTextColor;
  }

  // 月曆缺角
  .dp__arrow_bottom,
  .dp__arrow_top {
    display: none;
  }
  .dp__calendar_next {
    margin-inline-start: 0;
  }

  // 兩個日曆間距
  .dp__menu_inner:has(.dp__calendar_next) {
    gap: 24px;
  }
}
</style>
