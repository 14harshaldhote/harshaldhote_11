import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Change this to '/' for Vercel deployment
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'] 
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-icons': ['lucide-react']
        }
      }
    }
  }
})