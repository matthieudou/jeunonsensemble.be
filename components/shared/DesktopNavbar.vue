<template>
  <nav>
    <div class="flex justify-between items-center flex-wrap text-blue-lightest h-full px-8 py-4">
      <nuxt-link
        to="/accueil"
        class="flex items-center text-blue-lightest no-underline"
      >
        <base-logo class="fill-current"/>
        <div class="ml-4 text-lg">Jeûnons Ensemble</div>
      </nuxt-link>

      <div>
        <nuxt-link
          class="text-blue-lightest no-underline mx-2"
          v-for="link in links"
          :key="link.slug"
          :to="link.slug"
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

    components: {
      BaseLogo
    }
  }
</script>
