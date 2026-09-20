import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // или @vitejs/plugin-react

export default defineConfig({
  plugins: [react()],
  base: '/weather-app/', // 👈 ВАЖНО: Добавь эту строчку (слэши с двух сторон!)
})
