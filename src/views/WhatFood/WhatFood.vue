<template>
  <MySheet class="mx-auto my-auto" max-width="600">
    <v-row no-gutters align="center" justify="start" class="mb-4 ga-3">
      <span>方圓</span>
      <MySelect v-model="maxDistance" :items="maxDistanceItems" />
      <span>公里以內</span>
    </v-row>
    <v-row no-gutters align="center" justify="start" class="mb-4 ga-3" v-if="isFood">
      <span>價格預算</span>
      <MySelect v-model="budget" item-title="text" item-value="value" :items="budgetList" />
    </v-row>
    <v-row no-gutters align="center" justify="center" class="mt-16">
      <MyButton class="w-50" @click="getTextSearchAPI">產生轉盤內容</MyButton>
    </v-row>
  </MySheet>

  <div class="d-flex justify-center mt-8">
    <MyLuckyWheel :prizes="drinkList" :width="wheelSize" :height="wheelSize" :wordWrap="true" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()

import { hostPath } from '@/utils/hostPath.js'

console.log('hostPath', hostPath)

import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()

// proxy port
import { proxyPort } from '@@/proxy-server/config.mjs'

// ****判斷為吃什麼/喝什麼****
const isWhat = ref(route.name === 'WhatFood' ? 'food' : 'drink')
const isDrink = ref(route.name === 'WhatDrink')
const isFood = ref(route.name === 'WhatFood')

// ****place API****
const lat = ref(0)
const lng = ref(0)

const drinkList = ref([])
console.log('route', route.name)

// 取得經緯度
onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude
    lng.value = position.coords.longitude
  })
})

// 最大搜尋半徑
const maxDistance = ref(1)
const maxDistanceItems = [1, 2, 4, 6, 8, 10, 15, 20]

// 價格預算
const budget = ref(0)
const budgetList = ref([
  { text: '吃土', value: 0 },
  { text: '月底', value: 1 },
  { text: '還有些錢', value: 2 },
  { text: '剛發薪', value: 3 },
  { text: '土豪', value: 4 },
  { text: '隨便 (不進行價格篩選)', value: 5 }
])

// 取得搜索資料
const getTextSearchAPI = async () => {
  await appStore.openLoader()

  // drinkList.value = [
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南竹路二段37號',
  //     geometry: {
  //       location: {
  //         lat: 25.0423987,
  //         lng: 121.2863659
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04376787989272,
  //           lng: 121.2876998298927
  //         },
  //         southwest: {
  //           lat: 25.04106822010727,
  //           lng: 121.2850001701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
  //     icon_background_color: '#FF9E67',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
  //     name: '清心福全 蘆竹南竹店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 4032,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/110655182476344490224">謝孟融</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXXNyWbealCxDq0H_Px1zqg-VCF_QQKuqGjxeBWULBDP4PYiVYuwhDZPIQZJCp5tQYfVf1rnhAN8HN1Wqqxtm94zUR_AdA5ODVAvfvycKSH21dMO8GdaehEoG1CObjDUi8vHo8RpStseSTYm6W2fCEu8My2H4sy748FbTGb26GK5nOo8',
  //         width: 3024
  //       }
  //     ],
  //     place_id: 'ChIJ02qOkt0faDQRKSPJ1AqD6RE',
  //     plus_code: {
  //       compound_code: '27RP+XH 南興里 桃園市蘆竹區',
  //       global_code: '7QQ327RP+XH'
  //     },
  //     price_level: 1,
  //     rating: 3,
  //     reference: 'ChIJ02qOkt0faDQRKSPJ1AqD6RE',
  //     types: ['cafe', 'food', 'point_of_interest', 'establishment'],
  //     user_ratings_total: 73
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區忠孝西路185號一樓',
  //     geometry: {
  //       location: {
  //         lat: 25.0398776,
  //         lng: 121.2893546
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04126377989272,
  //           lng: 121.2906303798927
  //         },
  //         southwest: {
  //           lat: 25.03856412010727,
  //           lng: 121.2879307201073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '鮮Q茶飲',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 4032,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/110446265832708939448">chloe mo</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXXIbd25X9TigIJAz-qKaE3IBAgHHvJ0J4Ll13e0DX8tjV487fpDzakq1gJtd9HdSPkkXRobuKoyVuiixXl7HYjMfDfOCHXXosMMjNsufnc4rJzrI4Z4pgYrERAn2JMWzNfchRgdNtEcRYU2aZVTgRE_HysWb7H19V5XTBh3oIsAnH7R',
  //         width: 3024
  //       }
  //     ],
  //     place_id: 'ChIJ-YVV8NwfaDQRI91uOx7UDwk',
  //     plus_code: {
  //       compound_code: '27QQ+XP 南興里 桃園市蘆竹區',
  //       global_code: '7QQ327QQ+XP'
  //     },
  //     rating: 4,
  //     reference: 'ChIJ-YVV8NwfaDQRI91uOx7UDwk',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 154
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南竹路一段139號',
  //     geometry: {
  //       location: {
  //         lat: 25.0452291,
  //         lng: 121.2888038
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04657922989272,
  //           lng: 121.2901540298927
  //         },
  //         southwest: {
  //           lat: 25.04387957010728,
  //           lng: 121.2874543701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '緹莫莫茶飲店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 4032,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/110528822619395730210">陳麗卿</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXUQx0h8TNNpXGWRk-6ygbENbCXtHj12G71s8Akup6QM8DP85fFfiDlN-B9sIVSmaEwgiOljEWAJieG2yr3BFraT6cnh1PtpGUKYQS3o1ITgRUl4kNX3PvEJ5lKnkn9lDNCG6KQk75PD51lj-ix5as8EQJ70ZGZWc-wTZmAERr1RXKG6',
  //         width: 3024
  //       }
  //     ],
  //     place_id: 'ChIJo8tH-t4faDQRBzoDsMYX_5I',
  //     plus_code: {
  //       compound_code: '27WQ+3G 南榮里 桃園市蘆竹區',
  //       global_code: '7QQ327WQ+3G'
  //     },
  //     rating: 4.8,
  //     reference: 'ChIJo8tH-t4faDQRBzoDsMYX_5I',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 29
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區忠孝西路189號',
  //     geometry: {
  //       location: {
  //         lat: 25.039795,
  //         lng: 121.289247
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04117017989272,
  //           lng: 121.2905452798927
  //         },
  //         southwest: {
  //           lat: 25.03847052010727,
  //           lng: 121.2878456201073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: 'CoCo都可 南崁2店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 3000,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/118331028857804022496">MAVIS CHIU</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXUnsMHPtTJ1pN6ibht00axo07SVbHDP8WHkoxdxs_PJmYUqQJrByAHssaJyO6FPQ_efBY3_EEp2wjoN_oEBvNItx2sVR38syOfUa2OnpHUmGD6DRbITIjAGteQsldUnRkhB6_dck3Lbrvcj_-AZIp5NCZuxt25BllHXdQ9SWEe8hoTy',
  //         width: 3000
  //       }
  //     ],
  //     place_id: 'ChIJd0o28NwfaDQREFuo02x5CkY',
  //     plus_code: {
  //       compound_code: '27QQ+WM 南興里 桃園市蘆竹區',
  //       global_code: '7QQ327QQ+WM'
  //     },
  //     price_level: 1,
  //     rating: 4.3,
  //     reference: 'ChIJd0o28NwfaDQREFuo02x5CkY',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 351
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '33848台灣桃園市蘆竹區南竹路一段105號1樓',
  //     geometry: {
  //       location: {
  //         lat: 25.0460193,
  //         lng: 121.2893347
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04738932989272,
  //           lng: 121.2906569798927
  //         },
  //         southwest: {
  //           lat: 25.04468967010727,
  //           lng: 121.2879573201073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '曼士茶-桃園南崁店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 960,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/101783820885410472078">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXWZ81UAaeMJwpxoTi2MHAmJ09G6KWLZqM_knQA8fA9gKGle3ycXFnapBY_xJrmRBRUaBeEa9GZLfCD0RKrG0sy08Yok7ScbukJ9rBnwHwjKImg4fRLy8QOD5V0EE3gCEJPeOBLiIIx2IVViU2cQ9FgWAy3mykVjZHMGADc-sftZYdqv',
  //         width: 720
  //       }
  //     ],
  //     place_id: 'ChIJAU4Fc8YfaDQRXkx8PWgpO2o',
  //     plus_code: {
  //       compound_code: '27WQ+CP 南榮里 桃園市蘆竹區',
  //       global_code: '7QQ327WQ+CP'
  //     },
  //     rating: 4.3,
  //     reference: 'ChIJAU4Fc8YfaDQRXkx8PWgpO2o',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 59
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區忠孝西路170號',
  //     geometry: {
  //       location: {
  //         lat: 25.0406234,
  //         lng: 121.2894633
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04193707989272,
  //           lng: 121.2908831298927
  //         },
  //         southwest: {
  //           lat: 25.03923742010728,
  //           lng: 121.2881834701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '50嵐 南崁忠孝西店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 2880,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/109817321828121564621">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXWUsfTmHoOT2N2U7EcOkrvIFhJgYbYsu4t6rVRl9NGtRNJifcpeTUGe2VZKoE9xWBEcH0UxmAcInrtskkkHARVFZI8kqGJM9FPK60F_yJsi7jsitFok_F167BZem1QpISn6Zy8og2GaQei8PnK3NIqzHqDhjPLeyG7cFy061eiTPzgZ',
  //         width: 2160
  //       }
  //     ],
  //     place_id: 'ChIJv3zqXtwfaDQROmKHPoFxZoQ',
  //     plus_code: {
  //       compound_code: '27RQ+6Q 南興里 桃園市蘆竹區',
  //       global_code: '7QQ327RQ+6Q'
  //     },
  //     price_level: 1,
  //     rating: 2.7,
  //     reference: 'ChIJv3zqXtwfaDQROmKHPoFxZoQ',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 316
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '33861台灣桃園市蘆竹區忠孝西路39號',
  //     geometry: {
  //       location: {
  //         lat: 25.0438199,
  //         lng: 121.2922367
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04525147989272,
  //           lng: 121.2935402298927
  //         },
  //         southwest: {
  //           lat: 25.04255182010728,
  //           lng: 121.2908405701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '沐荼寺南崁店-臺灣精品茶飲專門-蘆竹必喝飲料|飲料推薦|外送飲料|人氣茶飲|奶蓋首選|推薦手搖|熱門飲料|在地推薦飲料',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 2880,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/111375797868256872639">HSIN JU HO</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXU1XrJHFCcnMTgLY2C0qfTeorqnMnMTZVc8eEWoesAAx0-BcCafyP-gBlXZlxbbFQDLM5R4yOulRwLvNMZyFl2Mp30BauqeNAvQEMsHpQdTRN-rCK91iqWRGx4sGe4WS-KE3qysLmdypFjvUAXYHoi8iLxElwPOHciy9GJxCZHZ8RKm',
  //         width: 2160
  //       }
  //     ],
  //     place_id: 'ChIJeZzq418faDQRvHoNc4B8rjQ',
  //     plus_code: {
  //       compound_code: '27VR+GV 南榮里 桃園市蘆竹區',
  //       global_code: '7QQ327VR+GV'
  //     },
  //     rating: 4.1,
  //     reference: 'ChIJeZzq418faDQRvHoNc4B8rjQ',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 127
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區忠孝西路168號',
  //     geometry: {
  //       location: {
  //         lat: 25.0406485,
  //         lng: 121.2894863
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04196462989272,
  //           lng: 121.2909020298927
  //         },
  //         southwest: {
  //           lat: 25.03926497010728,
  //           lng: 121.2882023701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '清原芋圓(蘆竹忠孝西路店)',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 4032,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/112935079711936707017">Emily Huang</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXXi8fQCIfG8wV7A4DLUfSdvG69D-vJAqzPW4nO4RTPHA5Bg30fEld8SCgv3zqtBO671Z2EjPPaRYMLuEE5uYwHEm_BSikAxk3AnuJtQEhywYWonhZrjSvFivkXbdLxKDAmPiXH7jLK70FoKILUIN9Ti4k9QX8DkegUgVWQwD4AOG5fY',
  //         width: 3024
  //       }
  //     ],
  //     place_id: 'ChIJS3arCewfaDQRyMs89aeQfvE',
  //     plus_code: {
  //       compound_code: '27RQ+7Q 南興里 桃園市蘆竹區',
  //       global_code: '7QQ327RQ+7Q'
  //     },
  //     rating: 4.7,
  //     reference: 'ChIJS3arCewfaDQRyMs89aeQfvE',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 492
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338201台灣桃園市蘆竹區南順七街55號1樓',
  //     geometry: {
  //       location: {
  //         lat: 25.0400666,
  //         lng: 121.2912743
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04139212989272,
  //           lng: 121.2926710298927
  //         },
  //         southwest: {
  //           lat: 25.03869247010728,
  //           lng: 121.2899713701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '無飲南崁店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 2282,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/106351405753278732017">楊志駿</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXWMCnq6jKuRpfEDLMHl0oPwx9kBoKBdel-ABD94p43qQ1eUmxPtAUHKhgj46mHo9sSHNkD5tGsjNWQd0s_rtAnMPxbSTSvgGLE8c68oyg6LE539hcDnrtaX1h1ucBGN9rJiYLdDSSV0K5T0uk_ntOGOmrjzEO-AZDR8QMFGztNmUy4',
  //         width: 1284
  //       }
  //     ],
  //     place_id: 'ChIJ0XuDX2AfaDQRz073Y3RJ0Bc',
  //     plus_code: {
  //       compound_code: '27RR+2G 蘆竹區 桃園市',
  //       global_code: '7QQ327RR+2G'
  //     },
  //     rating: 4.5,
  //     reference: 'ChIJ0XuDX2AfaDQRz073Y3RJ0Bc',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 120
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路314號',
  //     geometry: {
  //       location: {
  //         lat: 25.050079,
  //         lng: 121.2921107
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.05138352989272,
  //           lng: 121.2934433298927
  //         },
  //         southwest: {
  //           lat: 25.04868387010728,
  //           lng: 121.2907436701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '錨起來喝(桃園南崁店)',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 1754,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/115557353689019743526">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXViEWiziSZSfLzzAeM0ArQyZ0QTCNEDFez_cQFZNlzjtmZUX3vPvPwyFHdlcXlqZr2CwIKklIkMIseztJVpZKut1mt05kEZyHjKb18pppYjR0Oh88vaBf4rs-2QN3ciPZPza7wcqbs-91L7-UCdy5Vcy4WV30n-XKEesMj9K9DtdUfV',
  //         width: 3544
  //       }
  //     ],
  //     place_id: 'ChIJ9bhzY3agQjQRqNIEZ3czFGQ',
  //     plus_code: {
  //       compound_code: '372R+2R 錦中里 桃園市蘆竹區',
  //       global_code: '7QQ3372R+2R'
  //     },
  //     rating: 4,
  //     reference: 'ChIJ9bhzY3agQjQRqNIEZ3czFGQ',
  //     types: ['cafe', 'food', 'point_of_interest', 'establishment'],
  //     user_ratings_total: 299
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南福街98號',
  //     geometry: {
  //       location: {
  //         lat: 25.0401563,
  //         lng: 121.2928339
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04151312989272,
  //           lng: 121.2942374798927
  //         },
  //         southwest: {
  //           lat: 25.03881347010728,
  //           lng: 121.2915378201073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '軍茶-蘆竹南福店-蘆竹打卡飲料|平價飲料|特色茶飲|必喝茶飲|手搖飲推薦|熱門飲料',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 4032,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/103997018034798633004">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXVzgt2oMst9pZ2bALveTsEzHyc4D2CBRLdUNp4iAsY6nP8akcotN0wjbR_GzOp27Q87QywOSLkl_fP1tmMUsTiRmqeZuLgKndkNsw2o4HjJJwuAMvmexFSiurC9OnGMYzRSgUo013qn_xyJN_FnLi5Zkm6x6VU0b8VQcnduvSxZXemq',
  //         width: 3024
  //       }
  //     ],
  //     place_id: 'ChIJ1yYTvZYfaDQR3ctsuXrDm4g',
  //     plus_code: {
  //       compound_code: '27RV+34 南興里 桃園市蘆竹區',
  //       global_code: '7QQ327RV+34'
  //     },
  //     rating: 3.9,
  //     reference: 'ChIJ1yYTvZYfaDQR3ctsuXrDm4g',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 100
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路345號',
  //     geometry: {
  //       location: {
  //         lat: 25.0502107,
  //         lng: 121.2911235
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.05160927989272,
  //           lng: 121.2924943798928
  //         },
  //         southwest: {
  //           lat: 25.04890962010728,
  //           lng: 121.2897947201073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '花路手作飲-桃園南崁形象店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 2552,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/105888582629667470084">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXWLsKWcsfOqQdPMPnfFKKS4Fbl8UrvpYfsXjDVtyBipIhu3G9XRSrD44eh17ac5vIrA6gVm8YTBl_jGq_GJwp7a_CzVFaIfL3JdvBnYaPb1ybhLK6tXYvaT3BcV9oHkV-XJhEbDWF2Wd__ji5X0t1rUmtf-uJHxZDgNqIlCLRTVPtBp',
  //         width: 1701
  //       }
  //     ],
  //     place_id: 'ChIJgWkoni2hQjQRvVYsEuYIj90',
  //     plus_code: {
  //       compound_code: '372R+3C 錦中里 桃園市蘆竹區',
  //       global_code: '7QQ3372R+3C'
  //     },
  //     rating: 4.3,
  //     reference: 'ChIJgWkoni2hQjQRvVYsEuYIj90',
  //     types: ['cafe', 'food', 'point_of_interest', 'establishment'],
  //     user_ratings_total: 55
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南山路一段6號',
  //     geometry: {
  //       location: {
  //         lat: 25.0503772,
  //         lng: 121.2921421
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.05173587989272,
  //           lng: 121.2934642798927
  //         },
  //         southwest: {
  //           lat: 25.04903622010728,
  //           lng: 121.2907646201073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '滿月茶作 桃園南崁店-蘆竹珍珠奶茶|紅茶|線上點餐|青茶|手搖飲料|冷榨果汁',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 4032,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/106417410206679893193">強固桃園-蕭棣文</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXXFtQcLMrerhov9HV6M0MjXSQchh7LVN9bohTY2W9bVjIb7QL8YvB15bNRLyMoy-yELynthqgcDRnZJuu6ixPXC2x6rSqP78JV_IPyuHCYIx9qDDhSe8TT0pvru87RvlFjgiPhbKVa1gjEJDGyLQ035yzSzL3X_rfc47WHa13NEdO9M',
  //         width: 3024
  //       }
  //     ],
  //     place_id: 'ChIJV_BtZoShQjQR5KZ4My5_Nu8',
  //     plus_code: {
  //       compound_code: '372R+5V 蘆竹區 桃園市',
  //       global_code: '7QQ3372R+5V'
  //     },
  //     rating: 4.9,
  //     reference: 'ChIJV_BtZoShQjQR5KZ4My5_Nu8',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 85
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路347號',
  //     geometry: {
  //       location: {
  //         lat: 25.0502296,
  //         lng: 121.2910441
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.05163217989272,
  //           lng: 121.2924166798927
  //         },
  //         southwest: {
  //           lat: 25.04893252010728,
  //           lng: 121.2897170201072
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: 'CoCo都可 南崁3店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 610,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/111421578351476344567">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXWdiWzjU-BNv13Ci59LGVbny8tcEQglfVYpNkZFmgoyCGNtJG49NdtjIcuL2V4TnRWaO_sD9AGC_vnZmUgc10AI1JSrO8UDDVq1lBNFw_H6kHrDkav0o4ZagJeEgtedUGFu-FZs_kZmmFVbUJ9HM8eFjqVIeTKunTJA_rJXhCiV9ATU',
  //         width: 1083
  //       }
  //     ],
  //     place_id: 'ChIJF3kZYXagQjQRkY4CIbS_4FQ',
  //     plus_code: {
  //       compound_code: '372R+3C 錦中里 桃園市蘆竹區',
  //       global_code: '7QQ3372R+3C'
  //     },
  //     price_level: 1,
  //     rating: 4,
  //     reference: 'ChIJF3kZYXagQjQRkY4CIbS_4FQ',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 94
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路一段66號',
  //     geometry: {
  //       location: {
  //         lat: 25.0514512,
  //         lng: 121.288912
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.05275742989272,
  //           lng: 121.2902319298928
  //         },
  //         southwest: {
  //           lat: 25.05005777010728,
  //           lng: 121.2875322701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '（6/8.6/9公休）萬波島嶼紅茶 Wanpo Tea Shop 桃園南崁店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 687,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/107319382437008604098">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXUHRsF2Mhn7BZU4eqciHh_8mxt8VfW4FbfevMnz1AvaEFrbzyFkvgH71xM7uXEmFEJ0lkAyFuZKPibTDu9h0ru4pm2hk7UQ1Aybndl4X1BX4mFUHU9Ve2KuM063UOr24c_EMpnFKlQ_ot3QHbNuQrWPbw9Y8alfxh3VK622hs--QIhN',
  //         width: 561
  //       }
  //     ],
  //     place_id: 'ChIJnfsMoeyhQjQRzHRV-1V8oV8',
  //     plus_code: {
  //       compound_code: '372Q+HH 錦中里 桃園市蘆竹區',
  //       global_code: '7QQ3372Q+HH'
  //     },
  //     price_level: 1,
  //     rating: 3.7,
  //     reference: 'ChIJnfsMoeyhQjQRzHRV-1V8oV8',
  //     types: ['cafe', 'food', 'point_of_interest', 'establishment'],
  //     user_ratings_total: 197
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路272號',
  //     geometry: {
  //       location: {
  //         lat: 25.0496706,
  //         lng: 121.2930003
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.05098847989272,
  //           lng: 121.2943100298927
  //         },
  //         southwest: {
  //           lat: 25.04828882010728,
  //           lng: 121.2916103701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '小佐お茶作-桃園南崁',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 750,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/115855240892635089048">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXV6Xg9iXRrzY8g4Ri6NkbtBZSidTTsjP1boXthN_7Wyy3N1eV2fQ27MFcGs1F0TFfwMAs9HNvNZ-H8ApOkQkOGBg_nokkKyN26JoyPmlGX4p-yGRwJlniWPMRqFz5XSqm2Mxu1W62DdbHuVs8RZ6xwk8P3W_cpG0hZRP8eEwf_6_RZf',
  //         width: 750
  //       }
  //     ],
  //     place_id: 'ChIJ129JbsahQjQRr7t8QqHHJD0',
  //     plus_code: {
  //       compound_code: '27XV+V6 錦中里 桃園市蘆竹區',
  //       global_code: '7QQ327XV+V6'
  //     },
  //     rating: 4.7,
  //     reference: 'ChIJ129JbsahQjQRr7t8QqHHJD0',
  //     types: ['cafe', 'food', 'point_of_interest', 'establishment'],
  //     user_ratings_total: 302
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路286號',
  //     geometry: {
  //       location: {
  //         lat: 25.0498347,
  //         lng: 121.2927638
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.05114872989272,
  //           lng: 121.2940885298927
  //         },
  //         southwest: {
  //           lat: 25.04844907010728,
  //           lng: 121.2913888701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: 'COMEBUY_桃園南崁店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 4032,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/112035926172364152676">李慧雯</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXVysizDilbNWMxdqngSnpurUjMQQmLlplCyNo6VW4p47LWpBOrpi5GRync5kx_0fa75c2n0L3oLh0Yj-dNcOdlBIYF_VsSQHslpFo9L7sx_TX-sd-oBaPn73onQdCXutbAc_LRjwJaSitCSZ_u1QN4fV5l1l02q2cllDf0-QKXMxMnr',
  //         width: 3024
  //       }
  //     ],
  //     place_id: 'ChIJwZ2ZKhahQjQRJ-BNpIlcTYg',
  //     plus_code: {
  //       compound_code: '27XV+W4 錦中里 桃園市蘆竹區',
  //       global_code: '7QQ327XV+W4'
  //     },
  //     price_level: 1,
  //     rating: 4.8,
  //     reference: 'ChIJwZ2ZKhahQjQRJ-BNpIlcTYg',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 330
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區新南路一段25號',
  //     geometry: {
  //       location: {
  //         lat: 25.0462223,
  //         lng: 121.2944315
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04756432989273,
  //           lng: 121.2957369298928
  //         },
  //         southwest: {
  //           lat: 25.04486467010728,
  //           lng: 121.2930372701073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '春芳號桃園南崁店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 769,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/100611695235661044316">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXUlYRlV4R9ANWTN-DyNH1n9sKvjYAQMFFiPgsrpHYN1tucj-3Gll5zfAFAIDk0GIXwq4rb6c8B7-O_8AgKK5X-qgTojfpkjq44ox2QVwbW5TKzanIGnGsZWqI-w8AQ6LxO7Q0nDppWmV--zZ7OvkC0UitDyKEi_0VLoc5psVqUUD69w',
  //         width: 1025
  //       }
  //     ],
  //     place_id: 'ChIJ2faGMosfaDQRo1JdedbLrX4',
  //     plus_code: {
  //       compound_code: '27WV+FQ 南崁里 桃園市蘆竹區',
  //       global_code: '7QQ327WV+FQ'
  //     },
  //     price_level: 1,
  //     rating: 4.8,
  //     reference: 'ChIJ2faGMosfaDQRo1JdedbLrX4',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 109
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路189號',
  //     geometry: {
  //       location: {
  //         lat: 25.0477376,
  //         lng: 121.2937185
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04909742989272,
  //           lng: 121.2951363798927
  //         },
  //         southwest: {
  //           lat: 25.04639777010728,
  //           lng: 121.2924367201073
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '林三茶研所 南崁店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 960,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/105310610689256253444">A Google User</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXW4OTiCG4WW7rK1homSaLu1C7_2_4tma1ZS9hLfdfF54vRGRIOWJIeT5NmwjWhJb66DldTYPKxTF_lQLbW2yBNh4cz-mPqDMfB6-2TcQVkuIDIwZ0_K5F1gAoNaINBf0hIA1xUk7nzf__0YWMEglCSHnx-npdblmqlOWHYlQG3VLgNt',
  //         width: 720
  //       }
  //     ],
  //     place_id: 'ChIJU9ui7yyhQjQRDTf1EOGBVDA',
  //     plus_code: {
  //       compound_code: '27XV+3F 南崁里 桃園市蘆竹區',
  //       global_code: '7QQ327XV+3F'
  //     },
  //     price_level: 1,
  //     rating: 4.4,
  //     reference: 'ChIJU9ui7yyhQjQRDTf1EOGBVDA',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 376
  //   },
  //   {
  //     business_status: 'OPERATIONAL',
  //     formatted_address: '338台灣桃園市蘆竹區南崁路227號',
  //     geometry: {
  //       location: {
  //         lat: 25.0485992,
  //         lng: 121.2933627
  //       },
  //       viewport: {
  //         northeast: {
  //           lat: 25.04999037989272,
  //           lng: 121.2947994798927
  //         },
  //         southwest: {
  //           lat: 25.04729072010728,
  //           lng: 121.2920998201072
  //         }
  //       }
  //     },
  //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  //     icon_background_color: '#7B9EB0',
  //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  //     name: '珍煮丹桃園南崁店',
  //     opening_hours: {
  //       open_now: true
  //     },
  //     photos: [
  //       {
  //         height: 3024,
  //         html_attributions: [
  //           '<a href="https://maps.google.com/maps/contrib/103941947581766527161">CH B Chen</a>'
  //         ],
  //         photo_reference:
  //           'AUc7tXVDCUDy2CL-VBic1X1eiwcxqa9g_rJs3bVxAl0swxSEucJ3K7yYLy-FI3garkFQPslWgWOJ-lRANhoTx8hb6dG8cDn36XN-I22w1nwGo8VBm7Ku-9nINFI0LncVET9M8Ur_ljyJs1YZbD5lOZQT35iqUMRtKXzGjTBfmhaiHrm1UDGJ',
  //         width: 4032
  //       }
  //     ],
  //     place_id: 'ChIJUS0mOHagQjQRWqCfZ5e97Mg',
  //     plus_code: {
  //       compound_code: '27XV+C8 錦中里 桃園市蘆竹區',
  //       global_code: '7QQ327XV+C8'
  //     },
  //     rating: 4.1,
  //     reference: 'ChIJUS0mOHagQjQRWqCfZ5e97Mg',
  //     types: ['point_of_interest', 'establishment'],
  //     user_ratings_total: 462
  //   }
  // ]

  const drinkRequest = {
    key: appStore.apiKey, // API金鑰
    query: '飲料', // 搜尋關鍵字
    location: `${lat.value},${lng.value}`, // 經緯度
    radius: maxDistance.value * 1000, // 搜尋半徑:(最大50000，單位: 公尺)
    language: 'zh-TW', // 語言
    opennow: true // 營業中
  }

  const foodRequest = {
    key: appStore.apiKey, // API金鑰
    query: '美食', // 搜尋關鍵字
    location: `${lat.value},${lng.value}`, // 經緯度
    radius: maxDistance.value * 1000, // 搜尋半徑:(最大50000，單位: 公尺)
    language: 'zh-TW', // 語言
    opennow: true, // 營業中
    ...(budget.value !== 5 && { maxprice: budget.value }) // 如果預算不是5，則加入最高價格
  }

  axios
    .post(`${proxyPort}/api/places_nearbysearch`, isFood.value ? foodRequest : drinkRequest)
    .then((response) => {
      if (response.data.status === 'OK' || response.data.status === 'ZERO_RESULTS') {
        console.log(response.data.results)
        // const nextPageToken = response.data.next_page_token

        drinkList.value = response.data.results
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

// ****輪盤****
const wheelSize = ref(600)
</script>

<style lang="scss" scoped>
.distance {
  max-width: 100px;
}
</style>
