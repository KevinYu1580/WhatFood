import { createRouter, createWebHashHistory } from 'vue-router'
import { lastMenuOrder } from '@/router/order.js'

// 尚未進行權限判斷時 可以訪問的路由
// 以公司的架構來說，尚未登入就會至登入頁面，登入後才能訪問其他頁面
export const constantRoutes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requireAuth: false
    }
  },
  // 重設密碼
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',

    component: () => import('../views/404NotFound.vue'),
    meta: {
      requireAuth: false
    }
  }
]

// 用途：取得每一個頁面定義的 Route
// import.meta.glob => 要以目前的資歷夾為相對位置

const RoutesModules = import.meta.glob('@/router/pages/*.js', {
  eager: true,
  import: 'default'
})

// 將取得的路由模組放入陣列
export const originalRoutes = []

Object.keys(RoutesModules).forEach((key) => {
  const module = RoutesModules[key] //映射每個模組

  originalRoutes.push(module)
})
// console.log('originalRoutes', originalRoutes)

// 依照路由的 order 排序 (沒有給定 order 的會排在最後面)
function ascendingRoutes(routes) {
  let lastOrder = lastMenuOrder
  console.log('routes', routes)
  return routes

    .map((route) => {
      // 若無設置meta 必須補上meta 避免在後續新增排序時出錯
      if (!route.meta) {
        route.meta = {}
      }

      // 若無設定 order 預設排在最後面 會使用 lastMenuOrder + 1
      if (!route.meta?.order && route.meta?.order !== 0) {
        console.error(
          `雖然會自動幫你補上順序，為了防止錯誤，還是請在 src/router/order.js中，為${route.name}.vue設定順序`
        )
        route.meta.order = ++lastOrder
      }
      return route
    })
    .sort((a, b) => {
      return a.meta.order > b.meta.order ? 1 : -1
    })
}

// 遞迴並於router的meta.breadChrumb加入麵包屑資訊(類似於vue-router的matched功能return的資訊，可於麵包屑組件中使用)
function buildRoutesTree(routes, ancestors = []) {
  // 映射每個路由，構建新的路由對象而不直接修改原始對象
  return routes.map((route) => {
    // 為當前路由構建包含所有祖先名稱的陣列(href: 跳轉頁面用的路由名稱, text: 顯示於畫面的名稱)
    let currentAncestors = []
    route.component
      ? (currentAncestors = [...ancestors, { href: route.name, text: route.name }])
      : (currentAncestors = [...ancestors])

    // 創建一個新的路由對象，更新 meta 屬性來包含麵包屑資訊
    const newRoute = {
      ...route,
      meta: {
        ...route.meta,
        breadcrumb: currentAncestors
      }
    }

    // 如果有子路由，遞迴處理子路由，並更新當前路由對象的 children 屬性
    if (route.children) {
      newRoute.children = buildRoutesTree(route.children, currentAncestors)
    }

    return newRoute
  })
}

// 攤平路由(將多層的路由都轉為一層)
function flattenRoute(routes) {
  let flatRoute = []

  if (routes.length === 0) return flatRoute

  routes.forEach((route) => {
    if (!route.meta) {
      route.meta = {}
    }

    // 路由有 children  : 遞迴攤平路由
    if (route.children && route.children.length) {
      const childRoute = flattenRoute(route.children)

      flatRoute = flatRoute.concat(childRoute)
    }

    // 路由沒有 children : 直接放入 flatRoute
    flatRoute.push({
      ...route,
      children: []
    })
  })

  return flatRoute
}

// 將頁面路由全部放在目標頁面的路由底下 預設將路由方在 '/'(首頁)底下
function putRouteInRoot(routes) {
  // 定義根目錄資訊
  const layoutRoute = [
    {
      path: '/',
      name: 'Layout',
      redirect: { name: 'Home' }, //重新導向至首頁(歡迎頁)
      children: [],
      component: () => import('@/views/Layout.vue')
    }
  ]

  routes.forEach((route) => {
    if (route.path !== '/') {
      layoutRoute[0].children.push(route)
    }
  })

  return layoutRoute
}

// 菜單需要使用的路由
export const menuData = buildRoutesTree(ascendingRoutes(originalRoutes))
console.log('menuData', menuData)

// 最終要顯示的路由
const dynamicRoutes = constantRoutes.concat(putRouteInRoot(flattenRoute(menuData)))

console.log('dynamicRoutes', dynamicRoutes[2].children)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: dynamicRoutes
})

// // ------ 路由守衛 ------
// 路由守衛執行順序
// 1. beforeRouteLeave 離開目前路由 (元件)
// 2. beforeEach 開始進入新路由之前 (全域)
// 3. beforeEnter 開始進入新路由之前 (路由)
// 4. beforeRouteEnter 路由尚未進入該元件時 (元件)
// 5. beforeResolve 路由與所搭配的元件已被解析 (全域)
// 6. afterEach 當路由跳轉結束後 (全域)
// 7. beforeCreate 元件實體建立前 (Vue Hook)
// 8. created 元件實體已建立 (Vue Hook)
// 9. beforeMount 元件實體掛載前 (Vue Hook)
// 10. mounted 元件實體掛載完成 (Vue Hook)
// 11. beforeRouteEnter 內的 next() 回呼函式
// 12. 當路由更新時 (僅限同屬一個元件的情況，也可能完全不會發生)

// 設定網頁title
function setDocumentTitle(title) {
  document.title = title
}

// 如果是在編輯頁面，跳轉頁面前會跳出是否放棄編輯的跳窗
router.beforeEach((to, from, next) => {
  // const popupStore = usePopupStore()
  // const productStore = useProductStore()

  // // 如果為登入頁面，直接跳轉
  if (to.name === 'Login') {
    next()
    return false
  }

  // 如果是在編輯頁面，跳轉頁面前會跳出是否放棄編輯的跳窗
  if (from.params.action === 'edit' && from.params.action === 'add') {
    // 插入您的跳窗功能
  } else {
    next()
  }
})

// 檢查頁面權限及token & 設定網頁title
router.beforeResolve((to) => {
  // 設定網頁title
  setDocumentTitle(to.meta.title || '預設標題')

  // **打api取得權限字串
  const roleCont = 'DeviceMG%V#InspectionMG%V#Role%V#Account%V#ParameterMG%VE#SystemLog%P#'

  // 解析權限字串，router內各route.name必須與權限字串內的key相同，否則無法驗證
  function parseRoleCont(list) {
    const roleAuthorityList = {}
    list.split('#').forEach((item) => {
      const [key, value] = item.split('%')
      roleAuthorityList[key] = value
    })
    return roleAuthorityList
  }

  // 經解析過的權限物件
  let authObj = parseRoleCont(roleCont)

  // 測試用資料
  authObj = {
    SettingsSystem: 'VE',
    SettingsParameter: 'VE',

    SettingsSystem2: 'VE',
    SettingsParameter2: 'VE',
    Account: 'VE',
    Role: 'P',
    SystemLog: 'VE',
    TestPage: 'VE'
  }

  /**
   * 使用遞迴將權限字串放入route.meta.auth
   * @param {array} routes
   */

  function putAuthInMeta(routes) {
    routes.forEach((route) => {
      if (authObj[route.name]) {
        //如果該router沒有meta屬性，則新增meta屬性(防呆)
        if (!route.meta) {
          route.meta = {}
        }

        route.meta.auth = authObj[route.name]
      }
    })
  }

  putAuthInMeta(router.getRoutes())

  // 依據每個route的meta.requireAuth判斷是否需要驗證

  // 1. 先判斷meta.requireAuth型別是否為布林值(防呆)
  // if (typeof to.meta.requireAuth === 'boolean') {
  //   // 2.如果需要驗證(requireAuth == true)，且沒有權限，則返回false不跳轉頁面
  //   if (to.meta.requireAuth && !checkAuth(authObj[to.name])) {
  //     // 請在此處執行無權限時的操作
  //     alert('無權限')
  //     return false
  //   }
  // } else {
  //   console.error('路由名稱或meta.requireAuth未設定')
  //   return false
  // }

  /**
   * 檢查權限，如果有權限回傳true，沒有權限回傳false
   * @param {string} item :要檢查的權限字串
   * @returns boolean
   */
  // function checkAuth(item) {
  //   const authPassed = ['VE', 'V'] // 可以通過的權限，可以自行增加

  //   // 如果權限字串不包含此路由名稱/權限名稱
  //   if (!item) {
  //     console.error('權限字串不包含此路由名稱/權限名稱')
  //     return false
  //   }

  //   // 如果頁面權限為authPassed內的值，則返回true代表該頁面有訪問權限，反之返回false
  //   if (authPassed.includes(item)) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
})

export default router
