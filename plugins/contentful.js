import Vue from 'vue'
import * as contentful from 'contentful'

const client = contentful.createClient({
  space: process.env.contenfulSpaceId,
  accessToken: process.env.contenfulApiKey,
  host: 'https://cdn.contentful.com',
  environment: 'master'
})

const Content = {
  install (Vue) {
    Vue.prototype.$contentful = client
    Vue.$contentful = client
  }
}

Vue.use(Content)

export default ({ app }) => {
  app.$contentful = client
}
