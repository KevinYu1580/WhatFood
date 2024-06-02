import { menuOrder } from '@/router/order.js'

const { WhatDrink } = menuOrder

export default {
  path: '/WhatDrink',
  name: 'WhatDrink',
  component: () => import('@/views/WhatDrink/WhatDrink.vue'),
  meta: {
    order: WhatDrink,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: 'setting',
      title: '今天喝什麼'
    }
  }
}
