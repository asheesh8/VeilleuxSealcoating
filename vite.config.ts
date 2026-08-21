import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: { transformer: 'lightningcss' },
  build: { cssMinify: 'lightningcss', target: 'es2022' },
  server: { port: Number(loadEnv(mode, '.', '').PORT) || 5173 },
}))
