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
.text-secondary {
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    background-color: config('colors.blue-lighter');
    bottom: 0;
    left: 0;
    height: 50%;
    width: 100%;
    transform: translateX(-5%);
    position: absolute;
    z-index: -1;
  }
}
</style>
