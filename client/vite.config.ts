import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // React plugin for Vite
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // root: 'src', // This is optional, it should default to 'src'
  build: {
    outDir: 'dist', // Ensure the build output is directed to 'dist' folder
  },
  server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    }});