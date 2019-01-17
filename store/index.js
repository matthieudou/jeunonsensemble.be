export const state = () => ({
  links: [
    { slug: 'accueil', text: 'Accueil' },
    { slug: 'pourquoi-jeuner', text: 'Pourquoi jêuner ?' },
    { slug: 'comment-jeuner', text: 'Comment jêuner ?' },
    { slug: 'agenda', text: 'Agenda' },
    { slug: 'plus-dinformations', text: 'Plus d’informations' }
  ],
  pages: []
})

export const getters = {
  getPage (state) {
    return page => {
      return state.pages.find(p => {
        return p.fields.slug === page
      })
    }
  }
}

export const mutations = {
  setPages (state, value) {
    state.pages = value
  }
}

export const actions = {
  fetchPages ({ commit }) {
    return this.app.$contentful
      .getEntries({
        content_type: 'pages'
      })
      .then(res => {
        commit('setPages', res.items)
      })
  }
}
