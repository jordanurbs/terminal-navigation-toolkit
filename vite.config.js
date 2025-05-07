import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: true,
    proxy: {
      '/webhook-proxy': {
        target: 'https://n8n.spirals.me/webhook-test',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webhook-proxy/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})