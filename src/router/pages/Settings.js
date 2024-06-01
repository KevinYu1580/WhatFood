import { menuOrder } from '@/router/order.js'

export default {
  path: '/Settings',
  name: 'Settings',
  redirect: { name: 'Home' },
  meta: {
    order: menuOrder.Settings,

    sidebar: {
      show: true,
      icon: 'setting',
      title: 'Settings'
    }
  },

  children: [
    {
      path: '/Settings/System',
      name: 'SettingsSystem',
      component: () => import('@/views/Settings/SettingsSystem/SettingsSystem.vue'),
      meta: {
        requireAuth: true,
        sidebar: {
          show: true,
          icon: null, //如不顯示icon請設為null
          title: 'System'
        }
      }
    },
    {
      path: '/Settings/Parameter',
      name: 'SettingsParameter',
      component: () => import('@/views/Settings/SettingsParameter/SettingsParameter.vue'),
      meta: {
        requireAuth: true,
        sidebar: {
          show: true,
          icon: null, //如不顯示icon請設為null
          title: 'Parameter'
        }
      }
    }
  ]
}
