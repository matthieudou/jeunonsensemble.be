<template>
  <div>
    <a
      class="text-grey-darkest mt-12 block"
      :href="computeSlug"
    >
      <h2 class="text-sm text-secondary uppercase font-bold">{{ sectionObject.title }}</h2>
    </a>

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
        return '#' + slugify(this.sectionObject.title, { replacement: '-', lower: true })
      },
      document () {
        return this.sectionObject.content
      },
      renderedHtml () {
        return documentToHtmlString(this.document, options)
      }
    }
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => `<span class="font-bold">${text}<span>`,
      [MARKS.UNDERLINE]: text => `<span class="underline">${text}<span>`
    },

    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => `
        <div class="my-4">
          <img class="h-48 w-64 max-w-full object-contain rounded-lg shadow-lg" src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}">
          <div class="text-xs text-grey-dark">${node.data.target.fields.title}</div>
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
