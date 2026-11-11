import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // react()       -> lets Vite understand JSX and enables fast refresh
  // tailwindcss() -> scans our files for Tailwind classes and generates the CSS
  plugins: [react(), tailwindcss()],
})
