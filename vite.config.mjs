import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import { VitePluginRadar } from 'vite-plugin-radar'
import vueDevTools from 'vite-plugin-vue-devtools'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import VueRouter from 'vue-router/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    VueRouter({ dts: 'src/typed-router.d.ts' }),
    Vue({
      template: { transformAssetUrls },
    }), // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),
    vueDevTools(),
    checker({
      eslint: {
        lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
        useFlatConfig: true,
      },
    }),
    VitePWA({
      // 設定 npm run dev 也能測試 PWA
      devOptions: {
        enabled: true,
      },
      // 設定自動更新快取
      registerType: 'autoupdate',
      // 使用 workbox 套件產生網站檔案快取的 service worker
      // 調整 workbox 的設定
      workbox: {
        // 清除過期的快取
        cleanupOutdatedCaches: true,
        // 要快取哪些檔案
        // 設定成所有資料夾的所有檔案
        globPatterns: ['**/*'],
        // 是否要忽略網址參數，這兩個路徑網址參數不同，會被當成是不同檔案
        // a.jpg?fbclid=123
        // a.jpg?fbclid=456
        // 修改設定成忽略所有網址參數，當成相同檔案
        ignoreURLParametersMatching: [/.*/],
      },
      // Android 的 PWA 設定
      // 自動產生 site.webmanifest 檔
      manifest: {
        name: '番茄鐘',
        short_name: '番茄鐘',
        icons: [
          {
            src: './web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',

          },
          {
            src: './web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',

          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        // 顯示模式
        // https://web.dev/articles/add-manifest?hl=zh-tw#display
        display: 'standalone',
        // 開始網址
        start_url: './',
        // 應用程式範圍
        scope: './',
      },
    }),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-X3VMDR1PW9',
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
