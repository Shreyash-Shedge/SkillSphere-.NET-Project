import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port for the Vite development server
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // URL of your .NET Core backend
        changeOrigin: true,
        secure: false, // Set to true if you're using HTTPS with a self-signed certificate
      },
    },
  },
});
