import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/JobApp/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://job-app-snowy.vercel.app'
    }
  }
})