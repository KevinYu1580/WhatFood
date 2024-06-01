import { menuOrder } from '@/router/order.js'
const { Role } = menuOrder

export default {
  path: '/Role',
  name: 'Role',
  component: () => import('@/views/Role/Role.vue'),
  meta: {
    order: Role,
    requireAuth: true,
    sidebar: {
      show: true,
      icon: 'permission',
      title: 'Role'
    }
  },

  children: [
    {
      path: '/Role/:action/:id',
      name: 'RoleEdit',
      component: () => import('@/views/Role/RoleEdit/RoleEdit.vue'),
      meta: {
        requireAuth: false,
        sidebar: {
          show: false
        }
      }
    }
  ]
}
