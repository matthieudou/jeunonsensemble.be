<template>
  <div class="font-sans text-grey-darkest">
    <nuxt/>
    <base-footer/>
  </div>
</template>

<script>
  import BaseFooter from '~/components/shared/BaseFooter'

  export default {
    head () {
      return {
        bodyAttrs: {
          class: 'bg-grey-lightest'
        }
      }
    },

    components: {
      BaseFooter
    }
  }
</script>

<style lang="scss">
.anchor::before {
  content: '';
  display: block;
  position: relative;
  width: 0;
  height: 120px;
  margin-top: -120px;
}
</style>
