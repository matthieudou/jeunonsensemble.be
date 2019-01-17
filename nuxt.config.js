require('dotenv').config()

export default {
  env: {
    contenfulApiKey: process.env.CONTENTFUL_API_KEY,
    contenfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    sentryDsn: process.env.SENTRY_DSN,
    routesOrder: [
      'accueil',
      'pourquoi-jeuner',
      'comment-jeuner',
      'agenda',
      'plus-dinformations'
    ]
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'jeunonsensemble.be',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Site web de jêunons ensemble' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css?family=Rubik', rel: 'stylesheet' }
    ]
  },

  css: [
    '~/assets/styles/main.scss'
  ],

  plugins: [
    '~/plugins/contentful',
    '~/plugins/sentry'
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  generate: {
    routes: [
      '/accueil',
      '/plus-dinformations',
      '/agenda',
      '/comment-jeuner',
      '/pourquoi-jeuner'
    ]
  }
}
