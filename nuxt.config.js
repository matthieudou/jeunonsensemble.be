import * as contentful from 'contentful'
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
    htmlAttrs: {
      lang: 'fr'
    },
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

  modules: [
    '@nuxtjs/sitemap'
  ],

  plugins: [
    '~/plugins/contentful',
    '~/plugins/sentry',
    '~/plugins/mixins',
    { src: '~/plugins/ga', ssr: false }
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#a2f5bf' },

  router: {
    scrollBehavior (to, from, savedPosition) {
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      let position = false

      // if no children detected
      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = { x: 0, y: 0 }
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 }
      }

      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        position = savedPosition
      }

      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.getElementById(to.hash)) {
            // scroll to anchor by returning the selector
            position = {
              selector: to.hash
            }
          }
          resolve(position)
        })
      })
    }
  },

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
    routes () {
      return paths
    }
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://jeunonsensemble.be',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true, // Enable me when using nuxt generate
    exclude: [],
    routes () {
      return paths
    }
  }
}

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY,
  host: 'https://cdn.contentful.com',
  environment: 'master'
})

const paths = client
  .getEntries({
    content_type: 'master',
    include: 2
  })
  .then(res => {
    return [
      ...res.items[0].fields.pages.map(page => page.fields.slug),
      '/'
    ]
  })
