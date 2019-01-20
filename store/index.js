export const state = () => ({
  pages: []
})

export const getters = {
  getLinks (state) {
    const links = state.pages.map(page => {
      return {
        slug: page.fields.slug,
        text: page.fields.title
      }
    })
    return links
  },
  getFooterLinks (state) {
    const links = state.pages.map(page => {
      return {
        title: page.fields.title,
        slug: page.fields.slug,
        sections: page.fields.sections.map(section => {
          return {
            title: section.fields.title,
            slug: section.fields.slug
          }
        })
      }
    })

    return links
  },
  getPage (state) {
    return slug => {
      return state.pages.find(p => {
        return p.fields.slug === slug
      })
    }
  }
}

export const mutations = {
  setPages (state, value) {
    state.pages = value
  },
  cleanFirstPageSlug (state) {
    state.pages[0].fields.slug = '/'
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('fetchPages')
  },
  fetchPages ({ commit }) {
    return this.app.$contentful
      .getEntries({
        content_type: 'master',
        include: 2
      })
      .then(res => {
        commit('setPages', res.items[0].fields.pages)
        commit('cleanFirstPageSlug')
      })
  }
}
