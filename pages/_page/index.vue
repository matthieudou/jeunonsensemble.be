<template>
  <div>
    <!-- POTENTIAL BANNER IMAGE -->

    <!-- NAVIGATION -->
    <base-navbar/>

    <!-- REST OF THE PAGE -->
    <section class="container p-8">
      <div class="max-w-md">
        <h1 class="text-4xl">{{ title }}</h1>

        <article
          v-for="section in sections"
          :key="section.sys.id"
        >
          <base-section :section="section"/>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
  import BaseSection from '~/components/page/BaseSection'
  import BaseNavbar from '~/components/shared/BaseNavbar'

  export default {
    fetch ({ store }) {
      return store.dispatch('fetchPages')
    },

    computed: {
      getPage () {
        return this.$store.getters['getPage'](this.$route.params.page)
      },
      title () {
        return this.getPage.fields.title
      },
      sections () {
        return this.getPage.fields.sections
      }
    },

    components: {
      BaseSection,
      BaseNavbar
    }
  }
</script>
