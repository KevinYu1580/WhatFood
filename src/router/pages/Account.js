import { menuOrder } from '@/router/order.js'

// showInSidebar:true 需要顯示在側邊欄
export default {
  path: '/Account',
  name: 'Account',
  component: () => import('@/views/Account/Account.vue'),
  meta: {
    order: menuOrder.Account,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: 'account',
      title: 'Account'
    }
  },

  children: [
    {
      path: '/Account/:action',
      name: 'AccountEdit',
      component: () => import('@/views/Account/AccountEdit/AccountEdit.vue'),
      meta: {
        requireAuth: false,
        sidebar: {
          show: false
        }
      },
      children: [
        {
          path: '/Account/:action/info',
          name: 'AccountEditSecondlayer',
          meta: {
            requireAuth: false,
            sidebar: {
              show: false
            }
          },
          component: () => import('@/views/Account/AccountEdit/AccountEditInfo/AccountEditInfo.vue')
        }
      ]
    }
  ]
}
