import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  // 登出功能
  const logout = () => {
    router.push({ name: 'Login' })
  }
  return {
    logout
  }
})
