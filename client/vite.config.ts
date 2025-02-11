import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No need to manually configure Tailwind CSS in Vite config anymore
export default defineConfig({
  plugins: [react()],
  css: {
    // Vite will automatically use Tailwind CSS when it's installed
  },
});