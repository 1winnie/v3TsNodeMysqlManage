import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
  server:{
    proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin:true,
          rewrite:(path) => path.replace(/^\/api/,"")
        },
        '/my': {
          target: 'http://localhost:8080',
          changeOrigin:true,
          rewrite:(path) => path.replace(/^\/my/,"")
        },
      }
    
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname , "src"),
    }
  }
})