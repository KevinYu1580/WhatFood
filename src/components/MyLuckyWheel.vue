<template>
  <div class="d-flex flex-column ga-4 align-center">
    <div class="checkBtn">
      <button
        v-show="drawedPrize != null"
        @click="activatePrizeDialog()"
        class="text-decoration-underline text-primary-color-dark w-fit"
      >
        查看
      </button>
    </div>

    <LuckyWheel
      v-bind="attrs"
      ref="myLucky"
      :prizes="wheelList"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    />
  </div>
</template>

<script setup>
import { ref, useAttrs, defineProps, computed } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  // 請依照設計規範的原件樣式名稱傳入以下:
  // primary-color
  // secondary-color
  prizes: {
    type: Array,
    required: true
  }
})

// 轉盤實體
const myLucky = ref(null)

// 轉盤是否為空
const prizeIsEmpty = computed(() => {
  return props.prizes.length == 0
})

// 轉盤列表
const wheelList = computed(() => {
  if (prizeIsEmpty.value) return []

  return props.prizes.map((prize, index) => {
    const displayText = prize.name.length > 5 ? prize.name.substring(0, 5) + '...' : prize.name

    return {
      fonts: [{ text: displayText, top: '10%' }],
      background: index % 2 ? '#e9e8fe' : '#b8c5f2',
      ...prize
    }
  })
})

// 轉盤區塊
const blocks = ref([{ padding: '13px', background: '#617df2' }])

// 轉盤按鈕
const buttons = computed(() => {
  return [
    {
      radius: '25%',
      background: '#8a9bf3',
      pointer: !prizeIsEmpty.value,
      fonts: [{ text: prizeIsEmpty.value ? '無資料' : '抽一個!', top: '-10px' }]
    }
  ]
})

// 開始轉盤
function startCallback() {
  myLucky.value.play()
  setTimeout(() => {
    const index = 0
    myLucky.value.stop(index)
  }, 3000)
}

// 抽出的獎項
const drawedPrize = ref(null)

// 結束轉盤
function endCallback(prize) {
  console.log(prize)

  drawedPrize.value = prize
  console.log('抽出項目: ', drawedPrize.value)
}

function activatePrizeDialog() {
  console.log('抽出項目: ', drawedPrize.value)
}
</script>

<style scoped>
.checkBtn {
  height: 20px;
}
</style>
