import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use relative base so it works on GitHub Pages without knowing repo name
export default defineConfig({
  plugins: [react()],
  base: './'
})
