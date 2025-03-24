import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/14harshaldhote/harshaldhote_11/', // Updated base path to match the GitHub repo name
  plugins: [react()],
})
