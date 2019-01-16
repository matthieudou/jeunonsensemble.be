<template>
  <div class="font-sans">
    <nuxt/>
  </div>
</template>

<script>
  export default {
    middleware: ['root'],
    head () {
      return {
        bodyAttrs: {
          class: 'bg-grey-lightest'
        }
      }
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
