<template>
  <div>
    <pre>緯度: {{ currentPosition.coords.latitude }}</pre>
    <pre>經度: {{ currentPosition.coords.longitude }}</pre>
  </div>

  <MyButton @click="getUberAccess()">取得uber eat權限</MyButton>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { hostPath } from '@/utils/hostPath'

const currentPosition = ref({
  coords: {
    latitude: null,
    longitude: null
  }
})

// 取得定位
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, getPositionError)
  } else {
    console.log('您的瀏覽器不支援定位功能')
  }
}

function showPosition(position) {
  currentPosition.value = position
}

function getPositionError(error) {
  currentPosition.value = `無法取得您的位置: ${error}`
}

onMounted(() => {
  getLocation()
})

// 取得uber eat權限
const getUberAccess = () => {
  const redirectURL = `https://www.youtube.com/`

  const clientID = 'jRPIFgcFM6q3Ip2vACjHvGQnZq_nME5p'

  window.open(
    `https://auth.uber.com/oauth/v2/authorize?client_id=${clientID}&response_type=code
`,
    '_blank'
  )
}
</script>

<style lang="scss" scoped></style>
