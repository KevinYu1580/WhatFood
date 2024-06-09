import { menuOrder } from '@/router/order.js'

const { TestPage } = menuOrder
export default {
  path: '/TestPage',
  name: 'TestPage',
  meta: {
    order: TestPage,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: 'setting',
      title: 'TestPage'
    },
    breadcrumbs: {
      Text: '測試頁面'
    }
  },
  component: () => import('@/views/TestPage/TestPage.vue')
}
