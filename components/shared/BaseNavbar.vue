<template>
  <div class="bg-blue sticky pin-t z-10">
    <desktop-navbar
      class="hidden md:block"
      :links="links"
    />

    <mobile-navbar
      class="block md:hidden"
      :links="links"
    />
  </div>
</template>

<script>
  import DesktopNavbar from '~/components/shared/DesktopNavbar'
  import MobileNavbar from '~/components/shared/MobileNavbar'

  export default {
    computed: {
      links () {
        return this.$store.getters['getLinks']
      }
    },

    components: {
      DesktopNavbar,
      MobileNavbar
    }
  }
</script>
