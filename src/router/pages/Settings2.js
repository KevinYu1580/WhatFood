import { menuOrder } from '@/router/order.js'

export default {
  path: '/Settings2',
  name: 'Settings2',
  redirect: { name: 'Home' },
  meta: {
    order: menuOrder.Settings2,

    sidebar: {
      show: true,
      icon: 'setting',
      title: 'Settings2'
    }
  },

  children: [
    {
      path: '/Settings2/System',
      name: 'SettingsSystem2',
      component: () => import('@/views/Settings2/SettingsSystem/SettingsSystem.vue'),
      meta: {
        requireAuth: true,
        sidebar: {
          show: true,
          icon: null, //如不顯示icon請設為null
          title: 'System2'
        }
      }
    },
    {
      path: '/Settings2/Parameter',
      name: 'SettingsParameter2',
      component: () => import('@/views/Settings2/SettingsParameter/SettingsParameter.vue'),
      meta: {
        requireAuth: true,
        sidebar: {
          show: true,
          icon: null, //如不顯示icon請設為null
          title: 'Parameter2'
        }
      }
    }
  ]
}
