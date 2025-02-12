import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: './', // מציין את ספריית השורש שבה נמצא קובץ index.html
  plugins: [react()],
  build: {
    outDir: './dist', // מציין את תיקיית הפלט של הבנייה
  },
  base: './', // אם אתה מפרסם בנתיב משנה, שנה את זה לנתיב המתאים
})
