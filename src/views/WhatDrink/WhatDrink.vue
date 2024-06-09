<template>
  <MySheet class="mx-auto my-auto" max-width="600">
    <v-row no-gutters align="center" justify="center" class="mb-2 ga-3">
      <span>方圓</span>
      <MySelect
        :style="{
          maxWidth: '100px'
        }"
        v-model="maxDistance"
        :items="maxDistanceItems"
      />
      <span>公里以內</span>
    </v-row>
    <v-row no-gutters align="center" justify="center" class="mt-16">
      <MyButton class="w-50" @click="sendAPI">隨便來一個!</MyButton>
    </v-row>
  </MySheet>

  <div>
    <MyLuckyWheel />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()

// proxy port
import { proxyPort } from '@@/proxy-server/config.mjs'

const apiKey = 'AIzaSyAJrX9RSNt_66ttj29_ycuG6F1WCMjLuz8'

const lat = ref(0)
const lng = ref(0)

const drinkList = ref([])

// 取得經緯度
onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude
    lng.value = position.coords.longitude
  })
})

// 最大搜尋半徑
const maxDistance = ref(1)
const maxDistanceItems = [1, 2.5, 5, 10, 20, 50]

const sendAPI = async () => {
  await appStore.openLoader()

  axios
    .get(`http://localhost:${proxyPort}/api/places_nearbysearch`, {
      params: {
        key: apiKey, // API金鑰
        query: '飲料', // 搜尋關鍵字
        location: `${lat.value},${lng.value}`, // 經緯度
        radius: maxDistance.value * 1000, // 搜尋半徑:(最大50000，單位: 公尺)
        // type: 'cafe', // 搜尋類型
        language: 'zh-TW', // 語言
        opennow: true // 營業中
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        console.log(response.data.results)

        drinkList.value = response.data.results
      } else {
        throw new Error(response.data.status)
      }
    })
    .catch((error) => {
      appStore.openModal({ name: 'error', text: `${error}<br>請聯絡開發者` })
    })
    .finally(() => {
      appStore.closeLoader()
    })
}
</script>

<style lang="scss" scoped></style>
