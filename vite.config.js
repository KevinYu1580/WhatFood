import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vuetify from 'vite-plugin-vuetify' //於自動引入套件引入 vuetify (每頁無須再重複引入 vuetify元件即可於template使用)
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      styles: {
        configFile: 'src/styles/vuetify/setting.scss'
      },
      autoImport: true
    }),

    svgLoader({
      defaultImport: 'component',
      svgo: false
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/base/mixin.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  // 如果為正式環境，設定為 /，否則設定為 ./
  base: process.env.NODE_ENV === 'production' ? '/WhatFood/' : './',

  // 混淆器設定
  esbuild: {
    /** 打包時移除 console.log */
    pure: ['console.log'],
    /** 打包時移除 debugger */
    drop: ['debugger'],
    /** 打包時移除所有注释 */
    legalComments: 'none'
  },
  // 打包設定
  build: {
    rollupOptions: {
      output: {
        // 將所有 css 和 js 打包到一個檔案
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames(chunkInfo) {
          if (chunkInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }

          // 將所有圖片類型檔案打包到 images 資料夾
          const imgExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico']
          if (imgExts.some((ext) => chunkInfo.name.endsWith(ext))) {
            return 'images/[name]-[hash][extname]'
          }

          // 將其他檔案打包到 assets 資料夾
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
