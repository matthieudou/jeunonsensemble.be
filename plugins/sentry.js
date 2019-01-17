import * as Sentry from '@sentry/browser'
import Vue from 'vue'

// INITIALIZE SENTRY
if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.sentryDsn,
    integrations: [new Sentry.Integrations.Vue({ Vue })],
    environment: process.env.NODE_ENV
  })
}

// MAKE SENTRY AVAILABLE WITHIN THE 'THIS' CONTEXT
const installSentry = {
  install () {
    Vue.prototype.$sentry = Sentry
    Vue.$sentry = Sentry
  }
}

Vue.use(installSentry)

// MAKE SENTRY AVAILABLE WITHIN THE 'APP' CONTEXT
export default ({ app }) => {
  app.$sentry = Sentry
}
