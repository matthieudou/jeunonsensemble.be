export default function ({ store, route, redirect }) {
  if (route.path === '/') redirect(store.getters['getLinks'][0].slug)
}
