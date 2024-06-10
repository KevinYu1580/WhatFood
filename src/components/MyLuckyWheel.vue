<template>
  <div class="d-flex flex-column ga-4 align-center">
    <div class="checkBtn mb-4">
      <transition>
        <MyButton
          color="secondary-color"
          v-show="drawedPrize != null"
          @click="activatePrizeDialog()"
        >
          查看

          <ConfettiExplosion
            :style="{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999
            }"
            v-if="ConfettiVisible"
          />
        </MyButton>
      </transition>
    </div>

    <LuckyWheel
      v-bind="attrs"
      ref="myLucky"
      :prizes="wheelList"
      :blocks="blocks"
      :buttons="buttons"
      :default-config="defaultConfig"
      :default-style="defaultStyle"
      @start="startCallback"
      @end="endCallback"
    />

    <v-dialog
      scrim="rgba(0,0,0,0.2)"
      v-model="prizeDialogActivator"
      @afterLeave="afterLeave()"
      max-width="700"
    >
      <template v-slot:default="{ isActive }">
        <v-card>
          <template #title>
            <div class="d-flex justify-lg-space-between align-center">
              <span class="text-truncate text-black-tone-20 font-weight-black">{{
                drawedPrize.name
              }}</span>

              <v-chip
                v-if="drawedPrize.takeout"
                :color="drawedPrize.takeout ? 'theme-color-green-dark' : 'theme-color-red'"
                min-width="fit-content"
                class="ml-auto"
                :style="{
                  'min-width': 'fit-content'
                }"
                >{{ drawedPrize.takeout ? '有外送服務' : '無外送服務' }}</v-chip
              >
            </div>
          </template>
          <div class="ml-4 mb-2"></div>

          <v-card-subtitle class="pt-2 pl-6 d-flex align-center">
            評價:
            <div class="d-flex flex-nowrap ml-3" v-if="drawedPrize.rating">
              <MyIcon
                v-for="item in 5"
                :key="item"
                :name="`star_${item < drawedPrize.rating ? 'filled' : 'outlined'}`"
                size="20"
              />
              <!-- <MyIcon
                v-for="item in 5 - drawedPrize.rating"
                :key="item"
                name="star_outlined"
                size="20"
              /> -->
            </div>
            ({{ drawedPrize.user_ratings_total }} 則評價)
          </v-card-subtitle>

          <v-card-text class="d-flex flex-column ga-3">
            <p v-if="drawedPrize.formatted_phone_number">
              <span class="text-secondary-color-dark font-weight-medium mr-2 text-no-wrap"
                >電話:</span
              >{{ drawedPrize.formatted_phone_number }}
            </p>
            <p class="d-flex" v-if="drawedPrize.formatted_address">
              <span class="text-secondary-color-dark font-weight-medium mr-2 text-no-wrap">
                <p v-if="drawedPrize.formatted_address">地址:</p>
              </span>
              <a
                target="_blank"
                class="text-primary-color-dark font-weight-medium text-break"
                :href="drawedPrize.url"
              >
                {{ drawedPrize.formatted_address }}
              </a>
            </p>

            <p class="d-flex" v-if="drawedPrize.website">
              <span class="text-secondary-color-dark font-weight-medium mr-2 text-no-wrap">
                <p v-if="drawedPrize.website">網站:</p>
              </span>
              <a
                target="_blank"
                class="text-primary-color-dark font-weight-medium text-break"
                :href="drawedPrize.website"
              >
                {{ drawedPrize.website }}
              </a>
            </p>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, useAttrs, defineProps, computed, nextTick } from 'vue'
import { useAppStore } from '@/stores/appStore'

// proxy port
import { proxyPort } from '@@/proxy-server/config.mjs'

import axios from 'axios'

import ConfettiExplosion from 'vue-confetti-explosion'

const appStore = useAppStore()

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
    // const displayText = prize.name.length > 5 ? prize.name.substring(0, 5) + '...' : prize.name

    const displayText = prize.name

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
      radius: '20%',
      background: '#8a9bf3',
      pointer: !prizeIsEmpty.value,
      fonts: [{ text: prizeIsEmpty.value ? '無資料' : '抽一個!', top: '-10px', fontSize: '20px' }]
    }
  ]
})

// defaultConfig
const defaultConfig = ref({
  speed: 13,
  gutter: 2,
  accelerationTime: 1000,
  decelerationTime: 6000,

  // 隨機停止範圍(-0.9 ~ 0.9)
  stopRange: Number((Math.random() * 0.9).toFixed(1))
})

// defaultStyle
const defaultStyle = ref({
  fontColor: '#000',
  fontSize: '16px',
  lineHeight: '18',
  wordWrap: true,
  lineClamp: 3,
  fontWeight: 600
})

// 開始轉盤
function startCallback() {
  // 清空上次抽出的獎項
  drawedPrize.value = null

  myLucky.value.play()
  setTimeout(() => {
    // 隨機停止
    const index = Math.floor(Math.random() * (props.prizes.length ? props.prizes.length : 20))

    myLucky.value.stop(index)
  }, 1000)
}

// 抽出的獎項
const drawedPrize = ref(null)

// 結束轉盤
async function endCallback(prize) {
  drawedPrize.value = prize
  console.log('抽出項目: ', drawedPrize.value)

  await getTextSearchAPI()
  // drawedPrize.value = {
  //   address_components: [
  //     {
  //       long_name: '347號',
  //       short_name: '347號',
  //       types: ['street_number']
  //     },
  //     {
  //       long_name: '南崁路',
  //       short_name: '南崁路',
  //       types: ['route']
  //     },
  //     {
  //       long_name: '錦中里',
  //       short_name: '錦中里',
  //       types: ['administrative_area_level_3', 'political']
  //     },
  //     {
  //       long_name: '蘆竹區',
  //       short_name: '蘆竹區',
  //       types: ['administrative_area_level_2', 'political']
  //     },
  //     {
  //       long_name: '桃園市',
  //       short_name: '桃園市',
  //       types: ['administrative_area_level_1', 'political']
  //     },
  //     {
  //       long_name: '台灣',
  //       short_name: 'TW',
  //       types: ['country', 'political']
  //     },
  //     {
  //       long_name: '338',
  //       short_name: '338',
  //       types: ['postal_code']
  //     }
  //   ],
  //   adr_address:
  //     '<span class="postal-code">338</span><span class="country-name">台灣</span><span class="region">桃園市</span><span class="locality">蘆竹區</span><span class="street-address">錦中里南崁路347號</span>',
  //   business_status: 'OPERATIONAL',
  //   current_opening_hours: {
  //     open_now: true,
  //     periods: [
  //       {
  //         close: {
  //           date: '2024-06-16',
  //           day: 0,
  //           time: '2230'
  //         },
  //         open: {
  //           date: '2024-06-16',
  //           day: 0,
  //           time: '0900'
  //         }
  //       },
  //       {
  //         close: {
  //           date: '2024-06-10',
  //           day: 1,
  //           time: '2200'
  //         },
  //         open: {
  //           date: '2024-06-10',
  //           day: 1,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           date: '2024-06-11',
  //           day: 2,
  //           time: '2200'
  //         },
  //         open: {
  //           date: '2024-06-11',
  //           day: 2,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           date: '2024-06-12',
  //           day: 3,
  //           time: '2200'
  //         },
  //         open: {
  //           date: '2024-06-12',
  //           day: 3,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           date: '2024-06-13',
  //           day: 4,
  //           time: '2200'
  //         },
  //         open: {
  //           date: '2024-06-13',
  //           day: 4,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           date: '2024-06-14',
  //           day: 5,
  //           time: '2230'
  //         },
  //         open: {
  //           date: '2024-06-14',
  //           day: 5,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           date: '2024-06-15',
  //           day: 6,
  //           time: '2230'
  //         },
  //         open: {
  //           date: '2024-06-15',
  //           day: 6,
  //           time: '1000'
  //         }
  //       }
  //     ],
  //     weekday_text: [
  //       '星期一: 10:00 – 22:00',
  //       '星期二: 10:00 – 22:00',
  //       '星期三: 10:00 – 22:00',
  //       '星期四: 10:00 – 22:00',
  //       '星期五: 10:00 – 22:30',
  //       '星期六: 10:00 – 22:30',
  //       '星期日: 09:00 – 22:30'
  //     ]
  //   },
  //   delivery: true,
  //   dine_in: false,
  //   formatted_address: '338台灣桃園市蘆竹區南崁路347號',
  //   formatted_phone_number: '03 322 5956',
  //   geometry: {
  //     location: {
  //       lat: 25.0502296,
  //       lng: 121.2910441
  //     },
  //     viewport: {
  //       northeast: {
  //         lat: 25.0516313302915,
  //         lng: 121.2924158302915
  //       },
  //       southwest: {
  //         lat: 25.0489333697085,
  //         lng: 121.2897178697085
  //       }
  //     }
  //   },
  //   icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //   icon_background_color: '#7B9EB0',
  //   icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //   international_phone_number: '+886 3 322 5956',
  //   name: 'CoCo都可 南崁3店',
  //   opening_hours: {
  //     open_now: true,
  //     periods: [
  //       {
  //         close: {
  //           day: 0,
  //           time: '2230'
  //         },
  //         open: {
  //           day: 0,
  //           time: '0900'
  //         }
  //       },
  //       {
  //         close: {
  //           day: 1,
  //           time: '2200'
  //         },
  //         open: {
  //           day: 1,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           day: 2,
  //           time: '2200'
  //         },
  //         open: {
  //           day: 2,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           day: 3,
  //           time: '2200'
  //         },
  //         open: {
  //           day: 3,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           day: 4,
  //           time: '2200'
  //         },
  //         open: {
  //           day: 4,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           day: 5,
  //           time: '2230'
  //         },
  //         open: {
  //           day: 5,
  //           time: '1000'
  //         }
  //       },
  //       {
  //         close: {
  //           day: 6,
  //           time: '2230'
  //         },
  //         open: {
  //           day: 6,
  //           time: '1000'
  //         }
  //       }
  //     ],
  //     weekday_text: [
  //       '星期一: 10:00 – 22:00',
  //       '星期二: 10:00 – 22:00',
  //       '星期三: 10:00 – 22:00',
  //       '星期四: 10:00 – 22:00',
  //       '星期五: 10:00 – 22:30',
  //       '星期六: 10:00 – 22:30',
  //       '星期日: 09:00 – 22:30'
  //     ]
  //   },
  //   photos: [
  //     {
  //       height: 3024,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/111421578351476344567">CoCo都可 南崁3店</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXXlelSrkISyK4g_eLZxYCF9MuHY0aCKKX-TJqDSJ08XtRA-JJ8k7b40zwc8yeIu68OHsTZ7GJtHUrTw4l4DcJv6vwgyfIOC1QCqOFEh5_mY55eCGAz4I0aUMnMB8tSc847dvfA3kh-LjC5iucPMf79q-BaAOXmdaFN6-J3XW4Pa8d13',
  //       width: 4032
  //     },
  //     {
  //       height: 610,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/111421578351476344567">CoCo都可 南崁3店</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXWBqX6V5LTRx_JzQrGTqxladEvdCFF1DhRj6-MeAlDKPLU20J8otg5-f3o7I5bYZSEysiqmTcUudAPIuNHDT5ehK60ULq2AUD4q6EW9XrFkeo9ekbzs22v7lwOu5txSWmzubHqaAwVZZWm4MaJF7HSh33LqcP4S0DKfG1knhca7v7zY',
  //       width: 1083
  //     },
  //     {
  //       height: 609,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/111421578351476344567">CoCo都可 南崁3店</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXWBeVLGmRi0h3usz92IoibjH_1guuiS8zz11ZOxsUh1tIp53T3-o6QIRW9wBcQgQme2lFxoE2iYiRzeucOnlStuP_94djav2D2yUi76pSbdlRn63ktOZB-u1UvDnpCPPjvg19q1yqzJhN-jZ5AXwGluKwtgw02XzjKVGvATxM57bLBo',
  //       width: 1080
  //     },
  //     {
  //       height: 1523,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/113338382715620426397">qoo C.</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXUecl1pqffOI9r8aSPCODaJiA6j7kDPRuCEZCT2x3jQPOlMRfg9QiLw8uRjQSIa7TwGy1VUBY80Isxom9km6x9nPmiIQDpMjIhP3s-MWVZvyUqwUm0nOzKwqCLTPnDJPP4FW1X6B6gSlOu5du3ywPfQuJd0kq294BcVv0eAEXk6_t_g',
  //       width: 1436
  //     },
  //     {
  //       height: 3000,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/103334995534855976918">阿萬</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXU_8dZn8bDL_ziK2qXye9NUD-FHhIo3MrN9n_tKD7TJvG8KkV8EWo9WAAP9st6ocLJYPqznaLIPxiFerVhP49YOBR_fHeZ9YMb6-HlrUWsuErEqbocuRISyXux08j9DIglNukpJyoS1QR8wMGkwcCYWEkNqgjdj2znMHkgQw56vV3j0',
  //       width: 4000
  //     },
  //     {
  //       height: 3468,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/103334995534855976918">阿萬</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXVr-LIXYKc1qMjTYPilNKDUCkKh50vyY7epeFLvs1T5yTMObMhu3dztYBLDysfVA9lzS11SZKVUOOd8bDBtlXsygNBEleE3nToJt_Rkk0NPCK1jOAZN1rfkxMXQtq_g9sragwIdQFMVMBw9wQKxRsRFiFELqy4jLqIW4h3A9DcVwYtH',
  //       width: 4624
  //     },
  //     {
  //       height: 3024,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/104806463077558030515">0207 Chen</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXWW9Ih3hdtP7cd-kQSK2ey4jbqX8iXuk0WRqTT7z2lIFKYPCSpuXa3E2rqaR5K51mzzQTQ4uWMd_xei2E_sLnBWe0GBSUS2xbvyuTs8bY-vwD9DwpzwnV5wif8skGndwkUS0hIV1KkIIyrXDZHD7F7GwUfO0LRNb_9d4rWKMR7RbR2X',
  //       width: 4032
  //     },
  //     {
  //       height: 4000,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/103134415492062711145">李裕敏</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXX0VzJTLg1LUif0WEKbVTxblqZPW55YXrD5AW5q3drrab0d0PU5kuS15aJMa6kUpxosGRFNyoJw1OuKrBN69FQwRaTgJUc3AXDKLsNQ-n2ABw8m1kVB46JUT7bZ1xTqwmfFl9R_v3XznQxdSoOy1GGxwNeWzpX8Rd2kLI24W-viukzM',
  //       width: 3000
  //     },
  //     {
  //       height: 1920,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/106183823298095007123">江小國</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXXaX2kTJtUf1theqi-HqlkwZWfhFdAhFHFzX2C5HFWWF99DXnKOfuM-z7cqy7cwxcGVaaAGn9b39hnPv4iG557wBDo9e-kzNRqWRI9paK4meSvxinQSO-kdTHeWe4F980ugr7lYrQAgCsaPhqNeJLQ91BZWR3OPedtGj3qNgDhr7uru',
  //       width: 1080
  //     },
  //     {
  //       height: 1397,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/111421578351476344567">CoCo都可 南崁3店</a>'
  //       ],
  //       photo_reference:
  //         'AUc7tXUq7d1ZKgBWXMvgaC8Xc3lFS450mHG8ueBqGVosfqy1qMbIVeW5kKgxmnz2dWGIHWybUZK-VZtfEVWC5ajwZwc8pbzmgClvVzd6mCZqNuhmhSA38rB-EmRHQLdvzH6Oq5IqSsZdjQWpom6P5lcU07usiAyQbgpYWBrEwp52hkyK3aPp',
  //       width: 2481
  //     }
  //   ],
  //   place_id: 'ChIJF3kZYXagQjQRkY4CIbS_4FQ',
  //   plus_code: {
  //     compound_code: '372R+3C 台灣桃園市蘆竹區錦中里',
  //     global_code: '7QQ3372R+3C'
  //   },
  //   price_level: 1,
  //   rating: 4,
  //   reference: 'ChIJF3kZYXagQjQRkY4CIbS_4FQ',
  //   reviews: [
  //     {
  //       author_name: '蔡貽如',
  //       author_url: 'https://www.google.com/maps/contrib/117713872404145486800/reviews',
  //       language: 'zh-Hant',
  //       original_language: 'zh-Hant',
  //       profile_photo_url:
  //         'https://lh3.googleusercontent.com/a-/ALV-UjUJecXGM7J3fzG1kDlBpilF1iDojjmjmz6RqjERzmH57y-Nx8-G=s128-c0x00000000-cc-rp-mo-ba3',
  //       rating: 4,
  //       relative_time_description: '2 個月前',
  //       text: '請不要讓國外的服務人員點餐，因為我是常客，我其他人都可以',
  //       time: 1710299914,
  //       translated: false
  //     },
  //     {
  //       author_name: 'Yui wu',
  //       author_url: 'https://www.google.com/maps/contrib/114671980652222676272/reviews',
  //       language: 'zh-Hant',
  //       original_language: 'zh-Hant',
  //       profile_photo_url:
  //         'https://lh3.googleusercontent.com/a/ACg8ocL6wQpllBGb9-Zyun2YTDgNcA7ug_O6qPKJUM8-fXPuagAnNw=s128-c0x00000000-cc-rp-mo',
  //       rating: 2,
  //       relative_time_description: '4 個月前',
  //       text: '之前被算錯錢\n今天聽錯飲料名稱\n應該多加強一下訓練......',
  //       time: 1705224462,
  //       translated: false
  //     },
  //     {
  //       author_name: 'Aleven Chang',
  //       author_url: 'https://www.google.com/maps/contrib/104079617410660397367/reviews',
  //       language: 'zh-Hant',
  //       original_language: 'zh-Hant',
  //       profile_photo_url:
  //         'https://lh3.googleusercontent.com/a/ACg8ocJ9TaiDEqyS2p3H082345BS0li4NwIaAZ93kTjmq8BW-38EgQ=s128-c0x00000000-cc-rp-mo',
  //       rating: 5,
  //       relative_time_description: '6 個月前',
  //       text: '服務員親切\n飲料超好喝',
  //       time: 1701314772,
  //       translated: false
  //     },
  //     {
  //       author_name: '徐子睿',
  //       author_url: 'https://www.google.com/maps/contrib/111158401156473502789/reviews',
  //       language: 'zh-Hant',
  //       original_language: 'zh-Hant',
  //       profile_photo_url:
  //         'https://lh3.googleusercontent.com/a-/ALV-UjV4qsciivuwEtWdyoHp6RcW0tn5aJXGbbr_qOuVs12k9F-qcDtb=s128-c0x00000000-cc-rp-mo',
  //       rating: 1,
  //       relative_time_description: '1 年前',
  //       text: '昨天至貴店使用你訂\n分別用了兩個電話訂兩張單\n結果到現場說只有看到一張單有夠傻眼\n我都刷卡了還懷疑我是不是點錯店？？\n搞了半天是店員誤把其中一張訂單丟掉！？\n被質疑的感覺真的很差也謝謝貴店讓我有空留下1星負評\n也沒道歉什麼都沒有處理態度真的不可以欸！\n謝謝你們給我這麼差的體驗',
  //       time: 1670461584,
  //       translated: false
  //     },
  //     {
  //       author_name: '孫壬天',
  //       author_url: 'https://www.google.com/maps/contrib/113235424897634232406/reviews',
  //       language: 'zh-Hant',
  //       original_language: 'zh-Hant',
  //       profile_photo_url:
  //         'https://lh3.googleusercontent.com/a-/ALV-UjVTwasq86tOBbDRCvNwnQz1EmECX4xNkhWOldnwHwthcLrE1i_fmA=s128-c0x00000000-cc-rp-mo',
  //       rating: 1,
  //       relative_time_description: '1 年前',
  //       text: '價目表上面就寫中杯70\n刷卡金額卻是$90\n詢問之下才知道做成大杯\n問題是價目表就只有「中杯」\n請問價目表是塑膠做的嗎？？？\n這家👎店給一顆星都嫌多～～～',
  //       time: 1674042680,
  //       translated: false
  //     }
  //   ],
  //   takeout: true,
  //   types: ['point_of_interest', 'establishment'],
  //   url: 'https://maps.google.com/?cid=6116099074337967761',
  //   user_ratings_total: 94,
  //   utc_offset: 480,
  //   vicinity: '蘆竹區南崁路347號',
  //   website: 'https://order.nidin.shop/menu/6260'
  // }

  activatePrizeDialog()
}

// 獎項跳窗model
const prizeDialogActivator = ref(false)

// 開啟獎項跳窗
function activatePrizeDialog() {
  // 開啟跳窗
  nextTick(() => {
    prizeDialogActivator.value = true
    ConfettiVisible.value = true
  })
}

const getTextSearchAPI = async () => {
  await appStore.openLoader()

  return axios
    .post(`${proxyPort}/api/places_detail`, {
      key: appStore.apiKey, // API金鑰
      place_id: drawedPrize.value.place_id, // 地點ID
      language: 'zh-TW' // 語言
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        drawedPrize.value = response.data.result

        console.log(' drawedPrize.value', drawedPrize.value)
      } else {
        throw new Error(response.data.status)
      }
    })
    .catch((error) => {
      console.log('client error', error)
      appStore.openModal({ name: 'error', text: `${error}<br>請聯絡開發者` })
    })
    .finally(() => {
      appStore.closeLoader()
    })
}

// 拉炮彩帶效果
const ConfettiVisible = ref(false)

function afterLeave() {
  ConfettiVisible.value = false
}
</script>

<style scoped>
.checkBtn {
  height: 20px;
}
</style>
