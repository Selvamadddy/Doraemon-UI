import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/llmapi': {
        target: 'https://openrouter.ai/api/v1/chat', // Replace with your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/llmapi/, ''),
      },
      '/selfhostllm' :{
        target: 'url', // Replace with your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/selfhostllm/, ''),
      }
    },
  },
})
