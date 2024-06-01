<template>
  <div class="contentWrapper">
    <h1 class="text-3xl font-bold">testPage</h1>
    <!-- Loader區塊 -->
    <MyButton color="secondary-color" @click="appStore.openLoader"> 開啟loader </MyButton>

    <!-- 按鈕區塊 -->
    <MyButton @click="showBtns = !showBtns" variant="filled" size="default">
      {{ showBtns ? '隱藏' : '顯示' }}按鈕區塊
    </MyButton>

    <div v-show="showBtns" v-for="style in styles" :key="style" class="btnDemoWrapper">
      <div v-for="size in sizes" :key="size" class="mb-4">
        <h3>
          {{ style }}
          <span>({{ size }})</span>
        </h3>

        <MyButton
          v-for="item in types"
          :key="item"
          :size="size"
          :color="style"
          :variant="item"
          class="mr-4"
        >
          <template #default> {{ item }} </template>
          <template #append>
            <MyIcon name="setting" size="20" />
          </template>
        </MyButton>
        <br />
        <br />
        <MyButton
          v-for="item in types"
          :size="size"
          :key="item"
          :color="style"
          :variant="item"
          disabled
          class="mr-4"
        >
          <template #default> {{ item }} </template>
          <template #append>
            <MyIcon v-if="size != 'small'" name="setting" :size="20" />
          </template>
        </MyButton>
      </div>
    </div>

    <v-divider />

    <!-- tab區塊 -->
    <MyButton @click="showTabs = !showTabs" variant="filled" size="default">
      {{ showTabs ? '隱藏' : '顯示' }}tab區塊
    </MyButton>
    <div v-show="showTabs">
      <!-- 大標籤 -->
      <v-tabs class="ml-2" v-model="tabValue" bg-color="rgba(0, 0, 0, 0)">
        <MyTab value="tab1" class="mr-2">大頁籤1</MyTab>
        <MyTab value="tab2" class="mr-2">大頁籤2</MyTab>
        <MyTab disabled value="tab3">頁籤3</MyTab>
      </v-tabs>

      <br />

      <!-- 中標籤 -->
      <MyBtnToggle v-model="btnToggleValue">
        <MyBtnToggleItem value="btnToggle1"> 中頁籤1 </MyBtnToggleItem>
        <MyBtnToggleItem value="btnToggle2"> 中頁籤2 </MyBtnToggleItem>

        <MyBtnToggleItem disabled value="btnToggle3"> 中頁籤3 </MyBtnToggleItem>
      </MyBtnToggle>
    </div>
    <v-divider />

    <!-- 跳窗區塊 -->
    <MyButton @click="showModal = !showModal" variant="filled" size="default">
      {{ showModal ? '隱藏' : '顯示' }}跳窗區塊
    </MyButton>
    <div v-show="showModal">
      <div class="d-flex ga-2">
        <MyButton
          color="secondary-color"
          type="filled"
          size="default"
          @click="openModal_withoutBtn()"
        >
          <template #default>跳窗測試(無按鈕)</template>
        </MyButton>

        <MyButton color="secondary-color" type="filled" size="default" @click="openModal_withBtn()">
          <template #default>跳窗測試(有確認/取消按鈕)</template>
        </MyButton>
      </div>
    </div>

    <v-divider />

    <!-- switch區塊 -->
    <MyButton @click="showSwitches = !showSwitches" variant="filled" size="default">
      {{ showSwitches ? '隱藏' : '顯示' }}switch區塊
    </MyButton>

    <div v-show="showSwitches">
      <p>圈圈大小請至style/vuetify/setting.scss設定</p>
      <pre> {{ switchValue }}</pre>
      <br />

      <MySwitch v-model="switchValue" value="test1" label="我是label" withIcon />

      <br />

      <MySwitch v-model="switchValue" value="test2" color="secondary-color" />

      <br />

      <MySwitch disabled v-model="switchValue" value="test3" label="我是label" withIcon />
    </div>
    <v-divider></v-divider>

    <!-- input區塊 -->
    <MyButton @click="showInputs = !showInputs" variant="filled" size="default">
      {{ showInputs ? '隱藏' : '顯示' }}input區塊
    </MyButton>
    <div v-show="showInputs">
      <div class="d-flex flex-column justify-center ga-4">
        {{ inputVal }}

        <MyInput v-model="inputVal" type="text" placeholder="test" />
        <MyInput type="search" placeholder="test" />
        <MyInput type="password" placeholder="test" />

        <MyInput type="search" class="w-100" disabled value="test"></MyInput>

        <MyInput type="password" error-messages="test"></MyInput>
        <v-divider></v-divider>

        <h3>兩個日曆無時間</h3>
        model value: {{ date.twoCalender_noTime }}
        <MyDatePicker
          v-model="date.twoCalender_noTime"
          :enable-time-picker="false"
          :enable-seconds="false"
          :multi-calendars="!mobile"
          range
          placeholder="請選擇日期"
          format="yyyy/MM/dd"
        >
        </MyDatePicker>

        <h3>兩個日曆有時間</h3>
        model value: {{ date.twoCalender_hasTime }}
        <MyDatePicker
          v-model="date.twoCalender_hasTime"
          :enable-time-picker="true"
          :enable-seconds="true"
          :multi-calendars="!mobile"
          range
          placeholder="請選擇日期"
          format="yyyy/MM/dd HH:mm:ss(E)"
        >
        </MyDatePicker>

        <h3>日曆無時間</h3>
        model value: {{ date.singleCalender_noTime }}
        <MyDatePicker
          v-model="date.singleCalender_noTime"
          :enable-time-picker="false"
          placeholder="請選擇日期"
          format="yyyy/MM/dd"
        >
        </MyDatePicker>

        <h3>日曆有時間</h3>
        model value: {{ date.singleCalender_hasTime }}
        <MyDatePicker
          v-model="date.singleCalender_hasTime"
          :enable-time-picker="true"
          :enable-seconds="true"
          placeholder="請選擇日期"
          format="yyyy/MM/dd HH:mm:ss"
        >
        </MyDatePicker>
      </div>
    </div>

    <v-divider></v-divider>

    <!-- textArea區塊 -->
    <MyButton @click="showTextarea = !showTextarea" variant="filled" size="default">
      {{ showTextarea ? '隱藏' : '顯示' }}textArea區塊
    </MyButton>

    <div v-show="showTextarea">
      {{ textareaValue }}
      <br />
      <!-- DESCRIPTION: textarea
      1. rows: @number textarea的行數
      2. placeholder: @string textarea的placeholder
      3. auto-grow: @boolean 是否自動增加高度
      4. clearable: @boolean 是否顯示一鍵清除按鈕
      -->
      <MyTextarea v-model="textareaValue" auto-grow rows="3" placeholder="test" />
      <br />
      <MyTextarea v-model="textareaValue" rows="2" placeholder="test" auto-grow clearable />
      <br />
      <MyTextarea disabled rows="2" placeholder="test" value="textareaValue" />
    </div>

    <v-divider></v-divider>

    <MyButton @click="showSelect = !showSelect" variant="filled" size="default">
      {{ showSelect ? '隱藏' : '顯示' }}下拉選單
    </MyButton>

    <div v-show="showSelect">
      <div class="d-flex flex-column justify-center">
        <!-- DESCRIPTION:
      1. item-title: @string 下拉選單顯示的文字
      2. item-value: @string 下拉選單的值
      3. items: @array 下拉選單的選項
      -->

        {{ mySelectValue }}
        <MySelect
          v-model="mySelectValue"
          :items="selectMenuItems"
          item-title="Name"
          item-value="Code"
        ></MySelect>
      </div>
    </div>
    <v-divider></v-divider>

    <!-- checkbox區塊 -->
    <MyButton @click="showCheckbox = !showCheckbox" variant="filled" size="default">
      {{ showCheckbox ? '隱藏' : '顯示' }}checkbox區塊
    </MyButton>
    <div v-show="showCheckbox">
      {{ checkboxVal }}
      <MyCheckbox v-model="checkboxVal" value="value1" label="value1"> </MyCheckbox>

      <MyCheckbox indeterminate v-model="checkboxVal" value="value2" label="value2"> </MyCheckbox>
      <MyCheckbox disabled v-model="checkboxVal" value="value3" label="value3"> </MyCheckbox>
    </div>

    <v-divider></v-divider>
    <MyButton @click="showRadio = !showRadio" variant="filled" size="default">
      {{ showRadio ? '隱藏' : '顯示' }}radio區塊
    </MyButton>
    <div v-show="showRadio">
      <!-- DESCRIPTION: radio區塊，必須使用v-radio-group包覆，不然無法達成單一選取
        1. inline: @boolean 是否橫向排列(請參考vuetify官網)
      -->
      <MyRadioGroup v-model="radioVal">
        <MyRadio disabled label="Radio1" value="1"></MyRadio>
        <MyRadio label="Radio2" value="2"></MyRadio>
        <MyRadio label="Radio3" value="3"></MyRadio>
      </MyRadioGroup>
    </div>

    <v-divider></v-divider>
    <MyButton variant="filled" size="default" @click="showDatalist = !showDatalist">
      {{ showDatalist ? '隱藏' : '顯示' }}
      DataList
    </MyButton>

    <div v-show="showDatalist">
      <MyDatalist
        v-model="datalistValue"
        :items="datalistOptions"
        item-title="title"
        item-value="value"
      ></MyDatalist>

      <MyDatalist
        disabled
        v-model="datalistValue"
        :items="datalistOptions"
        item-title="title"
        item-value="value"
      ></MyDatalist>

      <MyDatalist
        v-show="showDatalist"
        v-model="datalistValue"
        :items="datalistOptions"
        item-title="title"
        item-value="value"
        :error-messages="valueComparator(datalistValue, datalistOptions)"
      ></MyDatalist>
    </div>

    <v-divider></v-divider>
    <!-- 表單驗證區塊 -->
    <MyButton @click="showFormValidation = !showFormValidation" variant="filled" size="default">
      {{ showFormValidation ? '隱藏' : '顯示' }}表單驗證區塊
    </MyButton>
    <div v-show="showFormValidation">
      表單驗證結果: {{ typeof formValidated }}
      <pre>{{ formValidated }}</pre>
      <MySheet>
        <!-- DESCRIPTION: 表單驗證(建議使用vurtify原生提供的v-form 及 textfield.rules)
      1. rules: @array 表單驗證規則
      2. validate-on: @string 驗證時機(詳細請參考uetify官網)，預設為blur
      3. update:modelValue: @function 表單驗證狀態(使用v-from自動更新驗證狀態，當表單驗證通過時，modelValue會變為true，否則為false，如果modelValue為null，則會觸發表單驗證)
      4. disabled: @boolean 是否禁用表單(使表單內所有input禁用)
      -->
        <div class="d-flex ga-4 align-center">
          <div>模擬api =></div>
          <MyButton :loading="formDataLoading" @click="reload()">reload</MyButton>
        </div>

        <br />
        <v-form
          ref="form"
          @submit.prevent="onSubmit()"
          @update:modelValue="(val) => (val == null ? form.validate() : (formValidated = val))"
          class="d-flex flex-column justify-center ga-4"
        >
          <MyInput :rules="formRules.name" v-model="formData.name" placeholder="姓名" />

          <MyInput :rules="formRules.phone" v-model="formData.phone" placeholder="電話" />
          <MyInput :rules="formRules.email" v-model="formData.email" placeholder="Email" />

          <!-- 因為MyDatePicker內的vuetify.textField在slot內，無法進行雙向綁定，無法觸發v-form.rules的驗證機制，故MyDataPicker的驗證需額外處理 -->
          <MyDatePicker
            v-model="formData.time"
            :multi-calendars="!mobile"
            range
            placeholder="請選擇日期"
            format="yyyy/MM/dd"
            :error-messages="
              formRules.time.map((rule) => rule(formData.time)).filter((msg) => msg !== true)
            "
          />

          <MySelect
            v-model="formData.role"
            :items="selectMenuItems"
            item-title="Name"
            item-value="Code"
            :rules="formRules.role"
          ></MySelect>

          <!-- 因為dataList驗證時機為該頁面初始時就要驗證，故不套用:rules，另外處理 -->
          <MyDatalist
            v-model="formData.language"
            :items="datalistOptions"
            item-title="title"
            item-value="value"
            :error-messages="languageError"
          ></MyDatalist>

          <MyDatalist
            v-model="formData.letter"
            :items="datalistOptions2"
            :error-messages="letterError"
          ></MyDatalist>

          <MyTextarea
            v-model="formData.feedback"
            :rules="formRules.feedback"
            rows="3"
            placeholder="test"
          />

          <MyCheckbox
            :rules="formRules.food"
            v-for="item in foodOptions"
            v-model="formData.food"
            :value="item.Code"
            :label="item.Name"
            :key="item.Code"
          >
          </MyCheckbox>

          <!--
            DESCRIPTION: radio區塊，必須使用v-radio-group包覆，不然無法達成單一選取
            1. inline: @boolean 是否橫向排列(請參考vuetify官網)
            2. rules: @array 針對綁定的v-model做表單驗證規則
           -->
          <MyRadioGroup class="mb-4" v-model="formData.size" :rules="formRules.size">
            <MyRadio label="尺寸: S" value="S"></MyRadio>
            <MyRadio label="尺寸: M" value="M"></MyRadio>
            <MyRadio label="尺寸: L" value="L"></MyRadio>
          </MyRadioGroup>

          <MySwitch
            v-model="formData.enable"
            :value="'1'"
            label="請勿關閉"
            :rules="formRules.enable"
            withIcon
          />

          <!-- DESCRIPTION: 表單按鈕
          1. type: @string 如要觸發submit事件必須加上 type="submit"
        -->
          <MyButton
            :disabled="!!!formValidated"
            class="ml-auto"
            color="secondary-color"
            type="submit"
            :loading="formDataSending"
          >
            <template #default> 儲存 </template>
            <template #append>
              <MyIcon name="save" size="20" />
            </template>
          </MyButton>
        </v-form>
      </MySheet>
      <pre>{{ formData }}</pre>
    </div>

    <v-divider></v-divider>
    <!-- 表單驗證區塊 -->
    <MyButton @click="showTable = !showTable" variant="filled" size="default">
      {{ showTable ? '隱藏' : '顯示' }}dataTable區塊
    </MyButton>
    <div v-show="showTable">
      <!-- DESCRIPTION: dataTable
      1. headers: @array 表格標題
      2. items: @array 表格資料
      3. show-select: @boolean 是否顯示checkbox
      4. v-model: @array 選取的資料
      5. item-value: @string 選取的資料的key(整個表格資料內該key的值絕不能重複，不然渲染時會出錯)
      6. show-top: @boolean 是否顯示#top slot
      7. show-bottom: @boolean 是否顯示#bottom slot
      8. show-expand: @boolean 是否顯示展開按鈕
    -->
      {{ selected }}
      <MySheet>
        <MyDataTable
          :headers="headers"
          :items="tableData"
          show-select
          v-model="selected"
          item-value="serno"
          :show-top="true"
          :show-bottom="true"
          show-expand
        >
          <!-- 內層table -->
          <template #[`expanded-row`]="{ item, columns }">
            <tr>
              <td :colspan="columns.length" class="pa-0">
                <!-- DESCRIPTION:
              1. inner: @boolean 是否為內部表格(用於樣式區分)
              -->
                <MyDataTable
                  :headers="innerHeaders"
                  :items="item.Data"
                  :show-top="false"
                  :show-bottom="false"
                  inner
                />
              </td>
            </tr>
          </template>

          <!-- 模糊搜尋 & 按鈕 -->
          <template #tableTop>
            <div class="tableTop__title">帳號管理</div>
            <MyButton class="ml-auto">新增帳號</MyButton>
            <MyButton color="secondary-color">匯出</MyButton>
          </template>

          <!-- DESCRIPTION: body內容的渲染
        1. 以header物件的key做自定義個別欄位的渲染(詳細請參考vuetify官網)
         -->
          <template #[`item.Enable`]="{ item }">
            <span class="font-weight-medium" :class="item.Enable ? 'success' : 'error'">{{
              item.Enable ? '啟用' : '停用'
            }}</span>
          </template>
          <template #[`item.Action`]="{ item }">
            <div class="d-flex ga-1">
              <!-- 編輯按鈕 -->
              <MyButton
                @click="() => console.log('Edit')"
                v-if="item.Edit"
                size="small"
                color="primary-color"
                variant="text"
              >
                <template #append>
                  <MyIcon name="edit" size="20"></MyIcon>
                </template>
              </MyButton>
              <!-- 唯獨按鈕 -->
              <MyButton
                @click="() => console.log('View')"
                v-if="item.Read"
                size="small"
                color="primary-color"
                variant="text"
              >
                <template #append>
                  <MyIcon name="eyeOpen" size="20"></MyIcon>
                </template>
              </MyButton>
              <!-- 刪除按鈕 -->
              <MyButton
                @click="() => console.log('Delete')"
                v-if="item.Delete"
                size="small"
                color="primary-color"
                variant="text"
              >
                <template #append>
                  <MyIcon name="delete" size="20"></MyIcon>
                </template>
              </MyButton>
            </div>
          </template>
        </MyDataTable>
      </MySheet>
    </div>

    <v-divider></v-divider>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import dayjs from 'dayjs'

import axios from 'axios'

import { useDisplay } from 'vuetify/lib/framework.mjs'

// vuetify RWD functions
const { width, thresholds, mobile } = useDisplay()

const appStore = useAppStore()

// **顯示按鈕區塊
const showBtns = ref(false)
// 按鈕樣式
const types = ref(['filled', 'outline', 'fab', 'text'])
const styles = ref(['primary-color', 'secondary-color'])
const sizes = ref(['small', 'default', 'large'])

// **顯示tab區塊
const showTabs = ref(false)

const tabValue = ref('tab1')

const btnToggleValue = ref('btnToggle1')

// **顯示跳窗區塊
const showModal = ref(false)

// 跳出無按鈕跳窗
function openModal_withoutBtn() {
  appStore.openModal({ name: 'success', funcHandler: () => console.log('confirm') })
}

// 跳出有按鈕跳窗
function openModal_withBtn() {
  appStore.openModal({
    name: 'discardChanges',
    title: '標題',
    text: '內文',
    // 傳入點擊確認按鈕執行的函數(不傳入則關閉跳窗)
    funcHandler: () => {
      console.log('confirm')
    },
    // 傳入點擊取消按鈕執行的函數(不傳入則關閉跳窗)
    cancelHandler: () => {
      console.log('cancel')
    }
  })
}

// **顯示switch區塊
const showSwitches = ref(false)
const switchValue = ref(['test2'])

// **顯示input區塊
const showInputs = ref(true)
const inputVal = ref('')

// **日期

const date = ref({
  // 兩個日曆無時間
  twoCalender_noTime: ['2024/04/19', '2024/05/22'],
  // 兩個日曆有時間
  twoCalender_hasTime: ['2024/04/10 10:21:00(週三)', '2024/05/25 10:21:00(週六)'],
  // 日曆無時間
  singleCalender_noTime: '2024/04/19',
  // 日曆有時間
  singleCalender_hasTime: '2024/04/19 12:00:00'
})

// **顯示textarea區塊
const showTextarea = ref(false)

const textareaValue = ref('')

// **顯示下拉選單區塊
const showSelect = ref(false)

// mySelect值
const mySelectValue = ref('1')
const selectMenuItems = ref([
  {
    Code: '0',
    Name: 'Admin'
  },
  {
    Code: '1',
    Name: 'Member'
  },
  {
    Code: '2',
    Name: 'Member2'
  },
  {
    Code: '3',
    Name: 'Member3'
  },
  {
    Code: '4',
    Name: 'Member4'
  },
  {
    Code: '5',
    Name: 'Member5'
  }
])

// ** 顯示myCheckbox區塊
const showCheckbox = ref(false)
// *myCheckbox值
const checkboxVal = ref([])

// **radio區塊
const showRadio = ref(false)
const radioVal = ref('1')

// **顯示datalist區塊
const showDatalist = ref(false)

// datalist值
const datalistValue = ref('')

// 用於有限制選項的下拉模糊搜尋比對 (顯示與實際值不同時)
const valueComparator = (currentSelection, selectOptions) => {
  return selectOptions.some((option) => option.title === currentSelection.title)
    ? ''
    : '查無此項目，請重新輸入或選擇！'
}

// 用於有限制選項的下拉模糊搜尋比對 (顯示與實際值相同時)
const valueComparator2 = (current, selections) => {
  return selections.some((option) => option === current) ? '' : '查無此項目，請重新輸入或選擇！'
}

// datalist選項
const datalistOptions = [
  { title: 'Chinese', value: 'zhHant', props: { subtitle: 'Chinese desc' } },
  { title: 'English', value: 'en', props: { subtitle: 'English desc' } },
  { title: 'Japanese', value: 'js', props: { subtitle: 'Japanese desc' } },
  { title: 'Korean', value: 'ko', props: { subtitle: 'Korean desc' } }
]

// datalist2 選項
const datalistOptions2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']

const languageError = computed(() => valueComparator(formData.value.language, datalistOptions))

const letterError = computed(() => valueComparator2(formData.value.letter, datalistOptions2))

// **顯示表單驗證區塊
const showFormValidation = ref(false)

// 表單資料
const formData = ref({
  name: '',
  phone: '',
  email: '',
  time: [],
  role: '',
  language: {
    title: '',
    value: '',
    props: {
      subtitle: ''
    }
  },
  letter: '',
  feedback: '',
  food: [],
  size: '',
  enable: '0'
})

// 表單資料載入中
const formDataLoading = ref(false)

const reload = () => {
  formDataLoading.value = true

  formData.value = {
    name: '',
    phone: '',
    email: '',
    time: [],
    role: '',
    language: {
      title: '',
      value: '',
      props: {
        subtitle: ''
      }
    },
    letter: '',
    feedback: '',
    food: [],
    size: '',
    enable: '0'
  }
  // 模擬api
  setTimeout(() => {
    formData.value = {
      name: 'Kevin',
      phone: '123',
      email: 'kevin1234@gmail.com',
      time: ['2024/04/26', '2024/04/28'],
      role: '1',
      language: {
        title: 'Chinese',
        value: 'zhHant',
        props: {
          subtitle: 'Chinese desc'
        }
      },
      letter: 'a',
      feedback: '我是textarea',
      food: ['0'],
      size: 'S',
      enable: '1'
    }
    // 拿到資料後，務必再次進行表單驗證
    nextTick(() => {
      form.value.validate()
    })

    formDataLoading.value = false
  }, 3000)
}

/**
 * 表單驗證規則
 *
 * 1. 請將表單驗證規則寫在此處，並綁定表單做使用。 相關請參考文件：https://vuetifyjs.com/en/components/forms/#exposed-properties
 * 2. 下拉模糊搜尋的錯誤狀態需要另外製作，因為在form表單 mounted的時候，不會進行驗證，但是有可能後端回來的下拉選單值，已經不在選項內了，所以下拉模糊搜尋需要先判斷有沒有錯誤。如果在mounted時就直接進行驗證，使用者尚未填寫的輸入框也會變成錯誤的型態，為了避免這種問題，請將下拉模糊搜尋的錯誤進行單獨的處理。
 * 3. 單獨處理下拉模糊搜尋的選單錯誤資訊，vuetify的表單也會自動連動錯誤狀態 綁定到按鈕
 * 4. 下拉模糊搜尋驗證為自定義的函數，因使用情境不同，可以參考valueComparator,valueComparator2
 *
 */
const formRules = ref({
  name: [(v) => !!v || '姓名必填', (v) => (v && v.length <= 10) || '姓名長度不可大於10字'],
  phone: [(v) => !!v || '電話必填', (v) => (v && v.length <= 10) || '電話長度不可小於10字'],
  email: [(v) => !!v || 'E-mail必填', (v) => /.+@.+\..+/.test(v) || '格式不符'],
  time: [(v) => !!v || '請選擇日期', (v) => v != '2024/04/25' || '無法選擇此日期'],
  role: [(v) => v != '0' || '無法套用此權限'],
  feedback: [(v) => !!v || '請填寫意見', (v) => v.length <= 50 || '意見長度不可大於50字'],
  food: [(v) => v.length > 0 || '請至少選擇一項'],
  size: [(v) => !!v || '請選擇', (v) => v == 'S' || '無此尺寸'],
  enable: [(v) => v == '1' || '請勿關閉']
})

// 表單checkbox選項
const foodOptions = ref([
  {
    Code: '0',
    Name: 'apple'
  },
  {
    Code: '1',
    Name: 'watermelon'
  },
  {
    Code: '2',
    Name: 'grape'
  },
  {
    Code: '3',
    Name: 'banana'
  }
])

const form = ref(null)

// 表單驗證狀態
const formValidated = ref(false)

//表單資料接收狀態(可用於loading or skeleton)
const formDataSending = ref(false)

// 表單提交觸發事件
const onSubmit = () => {
  console.log('submit')
  formDataSending.value = true
  setTimeout(() => {
    formDataSending.value = false
    alert(`表單資料以送出`)
  }, 2000)
}

// **顯示表格table區塊
const showTable = ref(false)

// 已選擇的item
const selected = ref([])

// thead設定
const headers = ref([
  {
    title: '登入帳號',
    key: 'Account',
    sortable: true,
    width: '20%'
  },
  { title: '人員名稱', sortable: true, key: 'Name', width: '20%' },
  { title: '套用權限', sortable: true, key: 'Role', Name: 'Role', width: '10%' },
  { title: '啟用狀態', sortable: true, key: 'Enable', width: '10%' },
  {
    title: '最後編輯時間',
    sortable: true,
    key: 'LastEditTime',

    width: '20%'
  },
  { title: '操作', sortable: false, key: 'Action', width: '20%' }
])

const innerHeaders = ref([
  {
    title: '食物',
    key: 'Location',
    sortable: false,
    width: '30%'
  },
  { title: '地點', sortable: false, key: 'Food', width: '30%' },
  { title: '顏色', sortable: false, key: 'Color', width: '40%' }
])

// 表格資料
const orgTableData = ref([
  {
    Account: 'user1',
    Name: 'John Doe',
    Role: 'Admin',
    Enable: true,
    LastEditTime: '2023/05/15 10:30:45',
    Edit: true,
    Delete: false,
    Read: true,
    Data: [
      { Location: 'taoyuan', Food: 'grape', Color: 'black' },
      {
        Location: 'taipei',
        Food: 'apple',
        Color: 'red'
      },
      {
        Location: 'hsinchu',
        Food: 'watermelon',
        Color: 'green'
      }
    ]
  },
  {
    Account: 'user2',
    Name: 'Jane Smith',
    Role: 'Editor',
    Enable: true,
    LastEditTime: '2023/05/16 14:20:18',
    Edit: false,
    Delete: true,
    Read: true,
    Data: [
      { Location: 'taiChung', Food: 'wine', Color: 'yellow' },
      {
        Location: 'pinDong',
        Food: 'banana',
        Color: 'grey'
      },
      {
        Location: 'tainam',
        Food: 'steak',
        Color: 'purple'
      }
    ]
  },
  {
    Account: 'user3',
    Name: 'Bob Johnson',
    Role: 'Viewer',
    Enable: true,
    LastEditTime: '2023/05/17 12:15:30',
    Edit: true,
    Delete: false,
    Read: false
  },
  {
    Account: 'user4',
    Name: 'Alice Miller',
    Role: 'Admin',
    Enable: false,
    LastEditTime: '2023/05/18 09:45:55',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user5',
    Name: 'Charlie Brown',
    Role: 'Editor',
    Enable: true,
    LastEditTime: '2023/05/19 16:10:27',
    Edit: true,
    Delete: false,
    Read: false
  },
  {
    Account: 'user6',
    Name: 'Eva Davis',
    Role: 'Viewer',
    Enable: true,
    LastEditTime: '2023/05/20 11:55:42',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user7',
    Name: 'Frank White',
    Role: 'Admin',
    Enable: true,
    LastEditTime: '2023/05/21 10:30:45',
    Edit: true,
    Delete: false,
    Read: true
  },
  {
    Account: 'user8',
    Name: 'Grace Lee',
    Role: 'Editor',
    Enable: true,
    LastEditTime: '2023/05/22 14:20:18',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user9',
    Name: 'Henry Wang',
    Role: 'Viewer',
    Enable: true,
    LastEditTime: '2023/05/23 12:15:30',
    Edit: true,
    Delete: false,
    Read: false
  },
  {
    Account: 'user10',
    Name: 'Ivy Chen',
    Role: 'Admin',
    Enable: false,
    LastEditTime: '2023/05/24 09:45:55',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user11',
    Name: 'Jackie Liu',
    Role: 'Editor',
    Enable: true,
    LastEditTime: '2023/05/25 16:10:27',
    Edit: true,
    Delete: false,
    Read: false
  },
  {
    Account: 'user12',
    Name: 'Kevin Yang',
    Role: 'Viewer',
    Enable: true,
    LastEditTime: '2023/05/26 11:55:42',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user13',
    Name: 'Lucy Wang',
    Role: 'Admin',
    Enable: true,
    LastEditTime: '2023/05/27 10:30:45',
    Edit: true,
    Delete: false,
    Read: true
  },
  {
    Account: 'user14',
    Name: 'Mike Wu',
    Role: 'Editor',
    Enable: true,
    LastEditTime: '2023/05/28 14:20:18',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user15',
    Name: 'Nancy Chen',
    Role: 'Viewer',
    Enable: true,
    LastEditTime: '2023/05/29 12:15:30',
    Edit: true,
    Delete: false,
    Read: false
  },
  {
    Account: 'user16',
    Name: 'Oliver Lin',
    Role: 'Admin',
    Enable: false,
    LastEditTime: '2023/05/30 09:45:55',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user17',
    Name: 'Peter Huang',
    Role: 'Editor',
    Enable: true,
    LastEditTime: '2023/06/01 16:10:27',
    Edit: true,
    Delete: false,
    Read: false
  },
  {
    Account: 'user18',
    Name: 'Queenie Lin',
    Role: 'Viewer',
    Enable: true,
    LastEditTime: '2023/06/02 11:55:42',
    Edit: false,
    Delete: true,
    Read: true
  },
  {
    Account: 'user19',
    Name: 'Robert Chang',
    Role: 'Admin',
    Enable: true,
    LastEditTime: '2023/06/03 10:30:45',
    Edit: true,
    Delete: false,
    Read: true
  },
  {
    Account: 'user20',
    Name: 'Sara Wu',
    Role: 'Editor',
    Enable: true,
    LastEditTime: '2023/06/04 14:20:18',
    Edit: false,
    Delete: true,
    Read: true
  }
])

// 複製多個表格資料
const tableData = ref([
  ...JSON.parse(JSON.stringify(orgTableData.value)),
  ...JSON.parse(JSON.stringify(orgTableData.value)),
  ...JSON.parse(JSON.stringify(orgTableData.value)),
  ...JSON.parse(JSON.stringify(orgTableData.value)),
  ...JSON.parse(JSON.stringify(orgTableData.value)),
  ...JSON.parse(JSON.stringify(orgTableData.value))
])

// 新增唯一值
tableData.value.forEach((item, index) => {
  //  新增key: serno
  item.serno = index
})
</script>

<style lang="scss" scoped>
.contentWrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.btnDemoWrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  flex-direction: column;
}
</style>
