import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { qrcode } from 'vite-plugin-qrcode'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), qrcode()],
  server: { host: '0.0.0.0' }
})
