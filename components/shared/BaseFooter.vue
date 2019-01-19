<template>
  <div class="p-8 bg-grey-lighter z-10">

    <!-- LINKS -->
    <div class="flex justify-around flex-wrap">
      <div
        class="mb-8"
        v-for="object in footerLinksObjects"
        :key="object.slug">

        <!-- PAGE LINK -->
        <nuxt-link
          class="text-sm text-secondary uppercase font-bold no-underline text-grey-darkest z-0"
          :to="object.slug"
        >
          {{ object.title }}
        </nuxt-link>

        <!-- SECTIONS LINKS -->
        <div
          class="mt-4"
          v-for="link in object.sections"
          :key="`${object.slug}-${link.slug}`"
        >
          <nuxt-link
            class="no-underline text-grey-darker"
            :to="{
              path: `${object.slug}`,
              query: {
                ref: link.slug
              }
            }"
          >
            {{ link.title }}
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- COPYRIGHT -->
    <div class="border-t flex items-center justify-between pt-6 text-sm">
      <div>
        Copyright 2019 - Jeûnons Ensemble -
        <a
          class="text-grey-darkest no-underline"
          href="https://app.contentful.com/spaces/v9fs1t81g1do/entries"
        >
          Administration
        </a>
      </div>
      <a
        class="text-grey-darkest no-underline"
        href="mailto:info.jeunonsensemble@gmail.com"
      >
        info.jeunonsensemble@gmail.com
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      footerLinksObjects () {
        const footerLinks = this.$store.getters['getFooterLinks']
        return footerLinks
      }
    }
  }
</script>
