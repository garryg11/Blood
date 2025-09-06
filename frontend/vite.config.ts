
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '7e5450c6-fa88-47c5-89e8-53f6d57c55ec-00-26u1wqr91hnqx.janeway.replit.dev',
      '.replit.dev',
      '.janeway.replit.dev'
    ],
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
