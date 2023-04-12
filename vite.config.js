import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import dotenv from 'dotenv'

const env = dotenv.config({ path: './.env' }).parsed

export default defineConfig({
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    laravel({
      input: ['resources/scss/app.scss', 'resources/js/app.js'],
      refresh: true,
    }),
  ],
  server: {
    proxy: {
      '/': 'http://localhost:' + env.APACHE2_PORT
    }
  }
})
