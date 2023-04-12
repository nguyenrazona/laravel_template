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

// Disable generating xxx.LICENSE.txt file
mix.options({
  terser: {
    extractComments: false,
  },
})

// Disable OS notification
mix.disableNotifications()

// Compile JS and CSS
mix
  .js('resources/js/app.js', `public/js`)
  .sass('resources/scss/app.scss', `public/css`, [])
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.config.js')],
  })
  // Generate manifest file to clear browser cache on updating js, css files
  .version()

// Autoreload browser on updating files
mix.browserSync({
  proxy: 'http://localhost:' + env.APACHE2_PORT,
  port: env.BROWSERSYNC_PORT,
  notify: false,
  startPath: '/',
})
