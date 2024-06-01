- [運作方式](#運作方式)
- [如何為頁面添加路由](#如何為頁面添加路由)

# 路由模組

## 運作方式

- ### 前言

  - 此專案採用扁平化路由的方式製作，原因是因為這樣可以不用寫很多層的 routerView，也比較好控制同一個父層底下的子路由要顯示的頁面，不過缺點是會喪失路由的層級關係，導致無法使用 **route.matched** 直接做出麵包屑。

- ### 建立初始路由

  - **constantRoutes** 定義**尚未登入**可以訪問的路由，以公司的架構來說，尚未登入就會至登入頁面，登入後才能訪問其他頁面。（eg. 重設密碼頁面）

- ### 引入全部路由資訊

  - 使用vite提供的函數 [import.meta.glob](https://cn.vitejs.dev/guide/features) 引入全部路由資訊 (此專案的路由資訊在 **'src/router/pages'** 底下)
  - 全部引入後再透過映射，放入 **originalRoutes** 中

- ### 排序路由

  - 因為路由使用動態引入的方式，引入的順序會與設計要求的菜單順序不同，所以需要手動去定義菜單的順序。
  - 透過 **ascendingRoutes** 函數實現
  - 此函數透過 **route.meta.order**的數字大小排序

- ### 建立路由關係

  - 因為將路由扁平化後，會喪失路由的層級關係，需要把路由關係重新建立。
  - 透過 **buildRoutesTree** 去遞迴實現，並在**route.meta.breadCrumb**中寫入麵包屑的資訊

- ### 扁平化路由

  - 將所有層級的路由攤平成一層
  - 透過 **flattenRoute** 遞迴實現

- ### 權限字串攤平路由

  - 尚未製作
  - 將後端給的權限字串，添加進入 **route.meta.key(尚未確定)** 中保存
  - 當使用者點擊自己無法訪問的頁面時，才會可以顯示無權限跳窗後導至登入頁面

- ### 放入根目錄
  - 透過 **putRouteInRoot** 函數實現
- ### 將過濾後的路由與初始路由混合

  ```javascript
  // 菜單用
  export const menuData = buildRoutesTree(ascendingRoutes(originalRoutes))

  // 最終要顯示的路由
  const dynamicRoutes = constantRoutes.concat(putRouteInTarget(flattenRoute(menuData)))

  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: dynamicRoutes
  })
  ```

## 如何為頁面添加路由

#### 先前我們在使用路由時必須要有的東西是：**頁面Route** , **頁面view** 這兩個，在此專案中除了這兩個地方要做設定，還需要設定一個東西為左側側欄順序(meta.order)，若未在路由定義會自動將此路由在菜單中的順序排至最後。

1.  ### 如何設定路由

- #### 找到 src/router/pages 再添加你要新增的路由資訊，資料結構就只會有這一層 src/router/pages/TestPage.js ，不需要因為TestPage底下要有其他頁面就裡面又新增一個資料夾。

- #### 程式碼範例：

  ```javascript
  // 決定菜單順序
  import { menuOrder } from '@/router/order.js'
  const { Account } = menuOrder

  // route
  export default {
    path: '/Account',
    // 注意：為了避免出錯，這裡規範 route內的name請跟後端給的頁面權限名稱一樣
    name: 'Account',
    component: () => import('@/views/Account/Account.vue'),
    meta: {
      // order [type:Number] 會決定此路由在側欄菜單的順序，未指定會排在最後
      order: Account
      // sidebar [type:Object, required:true] 菜單要顯示的標題、icon、是否要顯示在菜單中
      sidebar:{title:'Account',icon:'account',show:true}
    },

    // 多層也可以直接寫
    children: [
      {
        path: '/Account/:action',
        name: 'AccountEdit',
        component: () => import('@/views/Account/AccountEdit/AccountEdit.vue'),
        meta: {
          // 子層控制是否顯示於側欄菜單中，因有些頁面是不需要出現在側欄，ex:帳號頁面底下的新增帳號頁面，但這個頁面是確實存在的路由，就可以透過此屬性進行設定。
          // [type:Object , required:true]
          sidebar:{show:false}
        },
        children: [
          {
            path: '/Account/:action/info',
            name: 'AccountEditInfo',
            meta: {
              sidebar:{show:false}
            },
            component: () =>
              import('@/views/Account/AccountEdit/AccountEditInfo/AccountEditInfo.vue')
          }
        ]
      }
    ]
  }
  ```

2.  ### 如何新增頁面view

- #### 找到 src/views 添加頁面，請依照上述定義的路由層級新增資料夾(根據children)，裡面附屬的資料(帳號管理的帳號編輯)也一併寫在裡面，並且.vue檔名稱與定義的路由name相同。
- #### 層級範例
  - views **(資料夾)**
    - Account **(資料夾)**
      - Account.vue
      - AccountEdit **(資料夾)**
        - AccountEdit.vue
        - AccountEditInfo **(資料夾)**
          - AccountEditInfo.vue

1.  ### 如何修改菜單順序

- #### 找到 src/router/order.js，把**頁面名稱**放在menuOrder物件中，以數字的型別撰寫。
- #### 範例程式碼

```javascript
export const menuOrder = {
  Home: 0,
  Account: 1,
  Role: 2,
  SystemLog: 3,

  // 指定頁面的順序
  TestPage: 4
}
```
