import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dns from 'dns'

// @ts-ignore
dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 8081
  },
  plugins: [vue()],
})
