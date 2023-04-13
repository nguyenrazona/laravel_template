const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')
const env = require('dotenv').config({ path: './.env' }).parsed

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// Compile JS and CSS
mix
  .js('resources/js/app.js', `public/js`)
  // Extract vendor modules
  .extract()
  .sass('resources/scss/app.scss', `public/css`)
  .options({
    // Disable generating xxx.LICENSE.txt file
    terser: {
      extractComments: false,
    },
    autoprefixer: {
      options: {
        // Enable CSS grid layout
        grid: true,
      },
    },
    processCssUrls: false,
    postCss: [tailwindcss],
  })
  // Generate manifest file to clear browser cache on updating js, css files
  .version()
  // Disable OS notification
  .disableNotifications()
  // Autoreload browser on updating files
  .browserSync({
    proxy: 'http://localhost:' + env.APACHE2_PORT,
    port: env.BROWSERSYNC_PORT,
    ui: false,
    notify: false,
    open: false,
    startPath: '/',
  })
