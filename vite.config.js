import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// When deploying to GitHub Pages under /BruceApp, we need to set the base path
export default defineConfig({
  plugins: [react()],
  base: '/BruceApp/',
})
