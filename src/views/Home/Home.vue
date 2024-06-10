<template>
  <div class="h-100 align-content-center">
    <h2 class="text-center">今天要吃/喝什麼?</h2>
    <p class="text-center mb-10">
      中午要吃什麼? 下午茶我該喝什麼? 晚餐又該吃什麼?
      <br />
      這些難題成為了上班族的每日難題，趕緊使用WhatEat，從今不再煩惱!
    </p>
    <p class="text-center">使用google地圖功能，找出附近的餐廳、飲料店，並隨機推薦給您!</p>
    <div class="w-25 mx-auto mt-16">
      <img class="w-100" :src="pigImg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { useDisplay } from 'vuetify/lib/framework.mjs'
const { xs, sm, md, lg, xl, xxl, thresholds } = useDisplay()

const appStore = useAppStore()

const pigImg = new URL('@/assets/images/page/Home/pig.png', import.meta.url).href
</script>
