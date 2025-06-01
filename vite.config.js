import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  server: {
    allowedHosts: [
      '1b91eacd-f513-46f0-a936-8555a2dd14a5-00-18tvnpwtg30ga.pike.replit.dev'
    ]
  }
})
