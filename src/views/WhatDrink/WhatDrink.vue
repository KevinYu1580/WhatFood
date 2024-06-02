<template>
  <div class="d-flex flex-column ga-2">
    <MyButton @click="sendAPI">找尋地點</MyButton>
  </div>

  <div class="d-flex flex-wrap">
    <v-card width="400" v-for="item in drinkList" :text="item.name" :key="item.place_id">
      <template #default> 評價: {{ item.rating }} ({{ item.user_ratings_total }}) </template>
    </v-card>
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

const sendAPI = async () => {
  axios
    .get(`http://localhost:${proxyPort}/api/places_nearbysearch`, {
      params: {
        key: apiKey, // API金鑰

        query: '飲料', // 搜尋關鍵字
        location: `${lat.value},${lng.value}`, // 經緯度
        radius: 2000, // 搜尋半徑:(最大50000，單位: 公尺)
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
}
</script>

<style lang="scss" scoped></style>
