import { menuOrder } from '@/router/order.js'

const { TestPage } = menuOrder

const isDev = process.env.NODE_ENV === 'development'

export default {
  path: '/TestPage',
  name: 'TestPage',
  meta: {
    order: TestPage,
    requireAuth: true,
    sidebar: {
      show: isDev,
      icon: 'setting',
      title: 'TestPage'
    },
    breadcrumbs: {
      Text: '測試頁面'
    }
  },
  component: () => import('@/views/TestPage/TestPage.vue')
}
