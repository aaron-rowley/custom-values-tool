import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set base to '/<repo-name>/' for GitHub Pages
// If your repo is aaron-rowley/custom-values-tool, base should be '/custom-values-tool/'
export default defineConfig({
  plugins: [react()],
  base: '/custom-values-tool/',
})
