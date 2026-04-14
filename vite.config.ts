import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    base: "/",
    plugins: [react()],
    server: {
      proxy: {
        '/apim': {
          target: 'https://localhost:32769',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/apim/, ''),
        },
        '/quotes': {
          target: 'https://zenquotes.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/quotes/, ''),
        },
      },
    },
  })
}