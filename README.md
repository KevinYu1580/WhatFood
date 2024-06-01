## 專案說明
該專案為鎰威前端共用模組，該專案框架基於 Vite & Vuetify，且對於資料夾層級或檔案命名方式也有特定規則，如專案需求符合，可直接使用專案內模組

## 專案起始&下載模組

```bash
yarn install
```

or

```bash
yarn -i
```

## 運行指令

```bash
yarn dev
```

## 如何打包

```bash
yarn build
```

## 專案建置工具 & 前端框架

[Vite](https://cn.vitejs.dev/guide/) + [Vue](https://cn.vuejs.org/guide/introduction.html)

## 包管理器

[Yarn](https://yarnpkg.com/)

## UI框架

[Vuetify3](https://vuetifyjs.com/en/)

## 依賴套件 (package.json內的dependencies)
- [@vuepic/vue-datepicker](https://vue3datepicker.com/): ^8.5.0 日期選擇器
- [axios](https://axios-http.com/): ^1.6.8 HTTP 客戶端
- [date-fns](https://date-fns.org/): ^3.6.0 日期處理工具
- [dayjs](https://day.js.org/): ^1.11.10 日期時間函式庫
- [pinia](https://pinia.vuejs.org/zh/introduction.html): ^2.1.7 狀態管理器
- [vite-plugin-vuetify](https://github.com/vuetifyjs/vite-plugin-vuetify): ^2.0.3 Vuetify Vite 插件
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader): ^5.1.0 SVG 載入器
- [vue](https://cn.vuejs.org/guide/introduction.html): ^3.4.21 前端框架
- [vue-i18n](https://vue-i18n.intlify.dev/): 9 Vue 多語系插件
- [vue-router](https://router.vuejs.org/zh/introduction.html): ^4.3.0 路由管理器
- [vuetify](https://vuetifyjs.com/en/): ^3.6.3 UI框架


## 開發工具 (package.json內的devDependencies)

- [@mdi/font](https://materialdesignicons.com/): ^7.4.47 vuetify原生icon
- [@rushstack/eslint-patch](https://www.npmjs.com/package/@rushstack/eslint-patch): ^1.3.3 eslint規則包
- [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue): ^5.0.4
- [@vue/eslint-config-prettier](https://github.com/vuejs/eslint-config-prettier): ^8.0.0 eslint-prettier規則包
- [eslint](https://eslint.org/): ^8.49.0 js語法偵錯
- [eslint-plugin-vue](https://eslint.vuejs.org/): ^9.17.0
- [prettier](https://prettier.io/): ^3.0.3 檔案格式化套件
- [sass](https://sass-lang.com/): ^1.75.0 sass套件
- [sass-loader](https://github.com/webpack-contrib/sass-loader): ^14.1.1 sass編譯器
- [vite](https://vitejs.dev/): ^5.1.6 建構工具
- [vite-plugin-vue-devtools](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-devtools): ^7.0.18 devtools


## 資料夾架構圖

資料夾架構圖由[mddir](https://www.npmjs.com/package/mddir)產生 (生成檔案: /directoryList.md)

```

    |-- .editorconfig       #推薦的VScode套件
    |-- .eslintrc.cjs       #設定eslint規則
    |-- .gitignore      #設定gitignore
    |-- .prettierrc.json        #prettier設定檔
    |-- index.html      #專案入口html
    |-- jsconfig.json       #js編輯設定
    |-- package.json        #模組管理json
    |-- README.md
    |-- vite.config.js       #vite設定檔
    |-- yarn.lock
    |-- .vscode     
    |   |-- extensions.json     #推薦的VScode套件
    |   |-- settings.json
    |-- public
    |   |-- favicon.ico     #favicon
    |-- src
        |-- App.vue     #主要vue檔
        |-- main.js     #js掛載
        |-- assets
        |   |-- font        #字體檔案
        |   |   |-- NotoSansTC-Bold.ttf
        |   |   |-- NotoSansTC-Medium.ttf
        |   |   |-- NotoSansTC-Regular.ttf
        |   |-- images      #圖片及svg
        |       |-- icon        #所有icon svg
        |       |   |-- account.svg
        |       |   |-- calendar.svg
        |       |   |-- check.svg
        |       |   |-- ...
        |       |-- modalIcon       #跳窗的icon
        |           |-- bell.svg
        |           |-- error.svg
        |           |-- lock.svg
        |           |-- ...
        |-- components      #存放所有vue元件(可依照組件類別再分類)
        |   |-- ModalICon.vue
        |   |-- MyBreadcrumbs.vue
        |   |-- MyButton.vue
        |   |-- ...
        |   |-- layoutCore      #布局架構元件
        |   |   |-- MyHeader.vue
        |   |   |-- MySidebar.vue
        |   |   |-- SidebarListItem.vue
        |   |-- modal       #跳窗元件
        |       |-- modalSettings.js
        |       |-- MyModal.vue
        |-- i18N        #存放i18N翻譯文本
        |   |-- en.json
        |   |-- zh-Tw.json
        |   |-- ...
        |   |-- vuetify     #用於vuetify元件的翻譯文本
        |       |-- en.json
        |       |-- zh-Tw.json
        |       |-- ...  
        |-- plugins      #各種套件設定檔
        |   |-- i18n.js
        |   |-- pinia.js
        |   |-- vuetify.js
        |-- router      #router相關檔案
        |   |-- order.js        #route排序設定
        |   |-- readme.html
        |   |-- readme.md       #router邏輯說明
        |   |-- router.js       #router設定檔
        |   |-- pages
        |       |-- Account.js
        |       |-- Home.js
        |       |-- Role.js
        |       |-- ...
        |-- stores       #piani存放處
        |   |-- appStore.js       #系統操作相關
        |   |-- userStore.js        #使用者資訊相關
        |-- styles       #樣式及樣式變數
        |   |-- base     #全域套用樣式
        |   |   |-- _mixin.scss     #mixin存放處(只能放mixin)
        |   |   |-- _utilities.scss     #自定義utility class以補足vuetify缺少的utiliy class
        |   |-- vuetify     #提供給vuetify的檔案
        |       |-- darkThemeVar.js     #深色模式變數
        |       |-- lightThemeVar.js     #亮色模式變數(預設)
        |       |-- setting.scss        #設定vuetify元件全域變數
        |-- utils       #通用的js
        |   |-- deepCopy.js
        |   |-- findModalSetting.js
        |   |-- ...
        |-- views       #頁面
            |-- 404NotFound.vue
            |-- Layout.vue
            |-- Login.vue
            |-- ...
    

```



## component map

待補
