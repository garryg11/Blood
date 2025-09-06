import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5000,
    allowedHosts: true,
    hmr: { clientPort: 443 },
    proxy: {
      "/extract": "http://localhost:8000",
      "/explain": "http://localhost:8000",
      "/export":  "http://localhost:8000"
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})