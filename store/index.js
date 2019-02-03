export const state = () => ({
  pages: [],
  informations: {}
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
  },

  getInformations (state) {
    return state.informations
  }
}

export const mutations = {
  setPages (state, value) {
    state.pages = value
  },

  cleanFirstPageSlug (state) {
    state.pages[0].fields.slug = ''
  },

  setInformations (state, value) {
    state.informations = value
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
        const { pages, ...otherOptions } = res.items[0].fields
        commit('setPages', pages)
        commit('cleanFirstPageSlug')
        commit('setInformations', otherOptions)
      })
  }
}
