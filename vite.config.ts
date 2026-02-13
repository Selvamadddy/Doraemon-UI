import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/llmapi': {
        target: 'https://openrouter.ai/api/v1/chat',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/llmapi/, ''),
      },
      '/selfhostllm' :{
        target: 'foraemon',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/selfhostllm/, ''),
      }
    },
  },
})
