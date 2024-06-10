import { menuOrder } from '@/router/order.js'

const { WhatFood } = menuOrder

export default {
  path: '/WhatFood',
  name: 'WhatFood',
  component: () => import('@/views/WhatFood/WhatFood.vue'),

  meta: {
    order: WhatFood,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: 'setting',
      title: '今天吃什麼'
    },
    breadcrumbs: {
      Text: '今天吃什麼'
    }
  }
}
