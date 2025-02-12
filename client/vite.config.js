import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'client'),
  build: {
    rollupOptions: {
      input: 'index.html',  // ודא שהנתיב הזה נכון
    }
  }
});
