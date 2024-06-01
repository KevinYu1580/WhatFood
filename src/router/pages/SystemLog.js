import { menuOrder } from '@/router/order.js'

export default {
  path: '/SystemLog',
  name: 'SystemLog',
  meta: {
    order: menuOrder.SystemLog,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: 'log',
      title: 'SystemLog'
    }
  },
  component: () => import('@/views/SystemLog/SystemLog.vue')
}
