export default function ({ store, route, redirect }) {
  if (route.fullPath === '/') {
    return redirect(store.getters['getLinks'][0].slug)
  }
}
