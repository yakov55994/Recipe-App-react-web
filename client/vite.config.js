import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './client',  // מציין שהתיקייה שבה נמצא קובץ ה-index.html היא תיקיית client
  plugins: [react()],
  build: {
    outDir: '../dist',  // תיקיית הפלט תהיה מחוץ לתיקיית client
  },
  base: './',
})
