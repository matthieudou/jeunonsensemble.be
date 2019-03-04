<template>
  <div class="px-8 md:px-12 py-8 bg-grey-lighter z-10">

    <!-- LINKS -->
    <div class="flex flex-wrap">
      <div
        class="mb-8 px-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        v-for="object in footerLinksObjects"
        :key="object.slug">

        <!-- PAGE LINK -->
        <nuxt-link
          class="text-lg text-blue-dark font-bold no-underline text-grey-darkest z-0"
          :to="'/' + object.slug"
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
            class="no-underline text-grey-darkest"
            @click.native="$scrollTo(link.slug)"
            :to="{
              path: '/' + object.slug,
              hash: link.slug
            }"
          >
            {{ link.title }}
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- COPYRIGHT -->
    <div class="border-t flex flex-wrap items-center justify-between pt-6 text-sm">
      <div class="mt-2">
        {{ informations.copyright }} -
        <a
          class="text-grey-darkest no-underline"
          href="https://app.contentful.com/spaces/v9fs1t81g1do/entries?contentTypeId=pages"
        >
          Administration
        </a>
      </div>
      <a
        class="text-grey-darkest no-underline mt-2"
        :href="'mailto:' + informations.email"
      >
        {{ informations.email }}
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
      },

      informations () {
        return this.$store.getters['getInformations']
      }
    }
  }
</script>
