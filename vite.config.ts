import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [],
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-is'],
  },
  optimizeDeps: {
    include: ['react-is'],
  },
})

