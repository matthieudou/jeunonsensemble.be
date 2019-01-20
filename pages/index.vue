<template>
  <div>
    <!-- POTENTIAL BANNER IMAGE -->
    <div
      v-if="image"
      class="h-48 bg-cover bg-center"
      :style="`background-image: url(${image.fields.file.url})`"
    />

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
    computed: {
      getRootLink () {
        return this.$store.getters['getLinks'][0].slug
      },
      getPage () {
        return this.$store.getters['getPage'](this.getRootLink)
      },
      title () {
        return this.getPage.fields.title
      },
      sections () {
        return this.getPage.fields.sections
      },
      image () {
        return this.getPage.fields.banner
      }
    },

    mounted () {
      if (this.$route.query.ref) {
        this.$scrollTo('#' + this.$route.query.ref)
      }
    },

    components: {
      BaseSection,
      BaseNavbar
    }
  }
</script>
