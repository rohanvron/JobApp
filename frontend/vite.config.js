import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/JobApp/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://jobapp.adaptable.app'
    }
  }
})