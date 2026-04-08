import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-three/drei')) {
            return 'drei';
          }

          if (id.includes('@react-three/fiber')) {
            return 'react-three-fiber';
          }

          if (id.includes('three/examples/jsm')) {
            return 'three-extras';
          }

          if (id.includes('/node_modules/three/')) {
            return 'three-core';
          }
        },
      },
    },
  },
});
