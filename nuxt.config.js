require('dotenv').config()

export default {
  env: {
    contenfulApiKey: process.env.CONTENTFUL_API_KEY,
    contenfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    sentryDsn: process.env.SENTRY_DSN
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'jeunonsensemble.be',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#f0f4f8' },
      { name: 'theme-color', content: '#2680C2' },
      { hid: 'description', name: 'description', content: 'Celui qui est affamé ne jeûne pas et celui qui jeûne n’est pas affamé' },
      { hid: 'og:description', property: 'og:description', content: 'Celui qui est affamé ne jeûne pas et celui qui jeûne n’est pas affamé' },
      { hid: 'og:image:width', property: 'og:image:width', content: '1145' },
      { hid: 'og:image:height', property: 'og:image:height', content: '599' },
      { hid: 'og:title', property: 'og:title', content: 'Jeûnons ensemble' },
      { hid: 'og:url', property: 'og:url', content: 'https://jeunonsensemble.be' },
      { hid: 'og:image', property: 'og:image', content: 'https://jeunonsensemble.be/og-image.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#2680C2' },
      { href: 'https://fonts.googleapis.com/css?family=Rubik', rel: 'stylesheet' }
    ]
  },

  css: [
    '~/assets/styles/main.scss'
  ],

  plugins: [
    '~/plugins/contentful',
    '~/plugins/sentry',
    { src: '~/plugins/ga', ssr: false }
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
