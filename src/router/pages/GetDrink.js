import { menuOrder } from '@/router/order.js'
const { GetDrink } = menuOrder

export default {
  path: '/GetDrink',
  name: 'GetDrink',
  component: () => import('@/views/GetDrink/GetDrink.vue'),
  meta: {
    order: GetDrink,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: null,
      title: 'GetDrink'
    }
  }
}
