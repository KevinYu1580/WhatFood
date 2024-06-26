import { menuOrder } from '@/router/order.js'

const { WhatDrink } = menuOrder

export default {
  path: '/WhatDrink',
  name: 'WhatDrink',
  component: () => import('@/views/WhatFood/WhatFood.vue'),

  meta: {
    order: WhatDrink,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: 'setting',
      title: '今天喝什麼'
    },
    breadcrumbs: {
      Text: '今天喝什麼'
    }
  }
}
