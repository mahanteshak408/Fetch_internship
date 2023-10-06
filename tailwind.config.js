/** @type {import('tailwindcss').Config} */
export default {
  content: [

    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './server/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    'node_modules/tailvue/dist/tailvue.es.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

