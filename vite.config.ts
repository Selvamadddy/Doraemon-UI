import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    base: "/",
    plugins: [react()],
    build: {
      outDir: "dist"
    },
    server: {
      proxy: {
        '/apim': {
          target: env.VITE_API_URL,
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