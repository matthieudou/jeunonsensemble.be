export default function ({ store, route, redirect }) {
  if (route.fullPath === '/') {
    if (store.getters['getLinks'].length <= 0) {
      return redirect('/accueil')
    }
    return redirect(store.getters['getLinks'][0].slug)
  }
}
