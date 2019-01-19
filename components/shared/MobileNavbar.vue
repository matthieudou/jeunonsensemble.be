<template>
  <nav class="px-8 py-4">
    <div class="flex justify-between items-center text-blue-lightest h-full">
      <base-logo class="w-10 h-10 fill-current"/>

      <button
        class="text-blue-lightest"
        @click="navOpen = !navOpen"
      >
        <svg
          class="w-10 h-10 fill-current"
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M2 2C2 0.89543 2.89543 0 4 0H29C30.1046 0 31 0.89543 31 2C31 3.10457 30.1046 4 29 4H4C2.89543 4 2 3.10457 2 2ZM0 12C0 10.8954 0.89543 10 2 10H31.5C32.6046 10 33.5 10.8954 33.5 12C33.5 13.1046 32.6046 14 31.5 14H2C0.89543 14 0 13.1046 0 12ZM2 22C2 20.8954 2.89543 20 4 20H29C30.1046 20 31 20.8954 31 22C31 23.1046 30.1046 24 29 24H4C2.89543 24 2 23.1046 2 22Z"
          />
        </svg>
      </button>
    </div>

    <transition name="zoomInOut">
      <div
        class="fixed pin bg-grey-lightest px-8 py-4 border-t-8 border-blue"
        v-if="navOpen">

        <div class="flex justify-between items-center text-grey-darkest">
          <base-logo class="w-10 h-10 fill-current"/>

          <button
            class="text-grey-darkest"
            @click="navOpen = !navOpen"
          >
            <svg
              class="stroke-current"
              width="31"
              height="24"
              viewBox="0 0 31 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 22L29 2M2 2L29 22"
                stroke-width="4"
                stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="mt-16">
          <nuxt-link
            class="block mt-12 no-underline text-grey-darkest uppercase font-bold"
            @click.native="navOpen = false"
            v-for="link in links"
            :key="link.slug"
            :to="link.slug"
          >
            {{ link.text }}
          </nuxt-link>
        </div>
      </div>
    </transition>
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

    data () {
      return {
        navOpen: false
      }
    },

    components: {
      BaseLogo
    }
  }
</script>

<style lang="scss" scoped>
.zoomInOut-enter-active {
  transition: opacity .2s, transform .2s;
}

.zoomInOut-leave-active {
  transition: opacity .2s, transform .5s;
}

.zoomInOut-enter, .zoomInOut-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
