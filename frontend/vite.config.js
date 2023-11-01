import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@layouts': path.resolve(__dirname, 'src/components/layouts'),
      '@store': path.resolve(__dirname, 'src/store'),
      
    }
  }
})
