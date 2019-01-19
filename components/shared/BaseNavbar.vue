<template>
  <div class="bg-blue h-16 sticky pin-t z-10">
    <desktop-navbar
      class="hidden md:block"
      :links="links"
    />
  </div>
</template>

<script>
  import DesktopNavbar from '~/components/shared/DesktopNavbar'

  export default {
    computed: {
      links () {
        return this.$store.getters['getLinks']
      }
    },

    components: {
      DesktopNavbar
    }
  }
</script>
