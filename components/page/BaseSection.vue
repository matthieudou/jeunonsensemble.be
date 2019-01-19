<template>
  <div>
    <nuxt-link
      :to="{query: {ref: computeSlug}}"
      class="text-grey-darkest mt-12 block"
      @click.native="scrollTo(computeSlug)"
    >
      <h2
        :id="computeSlug"
        class="text-sm text-secondary uppercase font-bold"
      >
        {{ sectionObject.title }}
      </h2>
    </nuxt-link>

    <div
      class="mt-6 tracking-wide leading-normal"
      v-html="renderedHtml"/>
  </div>
</template>

<script>
  import * as slugify from 'slugify'
  import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

  export default {
    props: {
      section: {
        type: Object,
        default: () => ({})
      }
    },

    data () {
      return {
        sectionObject: this.section.fields
      }
    },

    computed: {
      computeSlug () {
        return slugify(this.sectionObject.title, {
          replacement: '-',
          lower: true,
          remove: /[*+~.()'"!:@]/g
        })
      },
      document () {
        return this.sectionObject.content
      },
      renderedHtml () {
        return documentToHtmlString(this.document, options)
      }
    },

    methods: {
      scrollTo (slug) {
        this.$scrollTo('#' + slug)
      }
    }
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => `<span class="font-bold">${text}<span>`,
      [MARKS.UNDERLINE]: text => `<span class="underline">${text}<span>`,
      [MARKS.ITALIC]: text => `<span class="italic">${text}<span>`
    },

    renderNode: {
      [BLOCKS.HEADING_5]: (node, next) => `
        <h5>${next(node.content)}</h5>
      `,
      [BLOCKS.HEADING_6]: (node, next) => `
        <h6>${next(node.content)}</h6>
      `,
      [BLOCKS.QUOTE]: (node, next) => `
        <blockquote class="border-l-4 border-blue-lighter p-2 pl-4 text-grey-dark -ml-6">${next(node.content)}</blockquote>
      `,
      [BLOCKS.HR]: () => `
        <div class="my-6 border-b-2 border-blue w-24 h-0"></div>
      `,
      [BLOCKS.EMBEDDED_ASSET]: (node) => `
        <div class="my-4">
          <img class="h-48 w-64 max-w-full object-cover rounded-lg shadow-lg" src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}">
        </div>
      `,
      [INLINES.HYPERLINK]: (node, next) => `
        <a class="text-blue underline" href="${node.data.uri}">
          ${next(node.content)}
        </a>
      `,
      [INLINES.ASSET_HYPERLINK]: (node, next) => `
        <a class="text-blue underline" href="${node.data.target.fields.file.url}" target="_blank">
          ${next(node.content)}
        </a>
      `
    }
  }
</script>
