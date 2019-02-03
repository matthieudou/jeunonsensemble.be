<template>
  <nav>
    <div class="flex justify-between items-center text-blue-lightest h-full px-8 py-4">
      <nuxt-link
        :to="'/' + $store.getters['getLinks'][0].slug"
        class="flex items-center text-blue-lightest no-underline flex-no-shrink mr-4"
      >
        <base-logo class="fill-current"/>
        <div class="ml-4 text-lg">{{ informations.websiteName }}</div>
      </nuxt-link>

      <div class="flex justify-end flex-wrap">
        <nuxt-link
          class="text-blue-lightest no-underline p-2"
          v-for="link in links"
          :key="link.slug"
          :to="'/' + link.slug"
        >
          {{ link.text }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
  import BaseLogo from '~/components/shared/BaseLogo'

  export default {
    props: {
      links: {
        type: Array,
        default: () => ([])
      }
    },

    computed: {
      informations () {
        return this.$store.getters['getInformations']
      }
    },

    components: {
      BaseLogo
    }
  }
</script>
