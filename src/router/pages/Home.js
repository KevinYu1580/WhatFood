import { menuOrder } from '@/router/order.js'
const { Home } = menuOrder

export default {
  path: '/Home',
  name: 'Home',
  meta: {
    requireAuth: false,
    order: Home
  },
  component: () => import('@/views/Home/Home.vue')
}
