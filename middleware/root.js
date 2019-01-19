export default function ({ store, route, redirect }) {
  if (route.fullPath === '/') {
    return redirect('/accueil')
  }
}
