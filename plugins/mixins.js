import Vue from 'vue'

Vue.mixin({
  methods: {
    $scrollTo (anchor) {
      if (process.client && document.getElementById(anchor)) {
        document.getElementById(anchor).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
})
