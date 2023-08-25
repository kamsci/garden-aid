import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: "http://localhost:5173",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: path => path.replace('/api', ''),
    //   }
    // }
    // origin: '*'
    // origin: 'http://127.0.0.1:5173',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5173',
    //   }
    // }
  },
})
